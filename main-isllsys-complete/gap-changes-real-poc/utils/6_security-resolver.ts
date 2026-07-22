// ============================================================================
// GAPS #45 + #58-61: ApplySecurityPolicy + GetObjectSecurity chain
// (VBS lines 3396-3401, 5698-5957)
// ============================================================================
//
// VBS FLOW (5 routines that collapse into 1 parameterized resolver):
//
//   #45 ApplySecurityPolicy (lines 3396-3401):
//     - Entry point called on page load
//     - Iterates every control on the page
//     - For each control, calls GetObjectSecurity to resolve visibility/disabled
//     - Applies the result by setting .Visible and .Enabled on the COM object
//
//   #58 GetSecurityValues (lines 5698-5729):
//     - "Allow by default" mode: walks security array for LOB -> page -> object
//     - If no matching entry found, control is FULLY VISIBLE + ENABLED
//     - If entry found, applies its visibility/disabled flags
//
//   #59 GetSecurityValuesWithExistCheck (lines 5732-5789):
//     - "Deny by default" mode: same walk, but if no entry found,
//       control is HIDDEN + DISABLED
//
//   #60 GetSecurityValues_DefaultDisabled (lines 5792-5849):
//     - Duplicate of #59 with slightly different defaults (disabled only, not hidden)
//     - We unify this with a `defaultDisabledOnly` option
//
//   #61 SecurityValues_Read (lines 5852-5957):
//     - Core reader: given a security array, LOB type, page type, and object name,
//       walks the hierarchy (LOB level -> page level -> object level) to find
//       the most specific match
//     - Security level interpretation:
//       0 = full access (visible + enabled)
//       1 = read-only (visible + disabled)
//       2 = hidden (not visible + disabled)
//
// REAL POC ALREADY HAS:
//   - user-info endpoint that returns user data (but NOT per-control security)
//   - runtime-override-store: setOverride(matchcode, { disabled, visible })
//     already works for individual control overrides
//   - No security data fetch, no security resolver, no page-load integration
//
// WHAT THIS CODE ADDS:
//   - SecurityEntry type modeling the server's security data shape
//   - resolveControlSecurity(): walks the LOB -> page -> object hierarchy
//     with security level interpretation (0/1/2)
//   - applySecurityPolicy(): bulk-applies security to all controls on a page
//     via runtime-override-store
//   - fetchSecurityData(): integration point for the loader to fetch from server
//   - Integration guide showing where to call in loader.ts and form-renderer.tsx
//
// WHERE TO ADD: src/utils/security-resolver.ts
// WIRE INTO:    loader.ts (fetch security data) + form-renderer.tsx (apply on mount)
// ============================================================================

// ---------------------------------------------------------------------------
// Store import — runtime-override-store controls per-field disabled/visible
// state. The Real POC creates this via createStoreWithSelectors and exports
// both useRuntimeOverrideStore (hook) and RuntimeOverrideStoreApi (static).
// ---------------------------------------------------------------------------
import { RuntimeOverrideStoreApi } from '@/stores/runtime-override-store';

// ---------------------------------------------------------------------------
// Service import — httpInstance is the Axios wrapper used for all API calls.
// Security data comes from the server as part of the user/page context.
// ---------------------------------------------------------------------------
import { httpInstance } from '@/services/http-instance';


// ============================================================================
// Types
// ============================================================================

/**
 * Security level values, matching the VBS constants:
 *   0 = Full access  — visible + enabled
 *   1 = Read-only    — visible + disabled
 *   2 = Hidden       — not visible + disabled
 */
export type SecurityLevel = 0 | 1 | 2;

/**
 * A single security entry from the server's security data.
 *
 * The server returns a flat array of these entries. Each entry specifies
 * the security level for a specific LOB type + page type + object name
 * combination.
 *
 * VBS: The security array was populated from the server response during
 * the initial page load (GetSecurityValues called from ApplySecurityPolicy).
 */
export interface SecurityEntry {
    /** LOB type code (e.g., "CAU", "BOP", "WRM"). Empty string = all LOBs. */
    lobType: string;
    /** Page type identifier (e.g., "POLICY", "VEHICLE"). Empty string = all pages. */
    pageType: string;
    /** Control/object name (matchcode). Empty string = all objects on page. */
    objectName: string;
    /**
     * Security level:
     *   0 = full access (visible + enabled)
     *   1 = read-only   (visible + disabled)
     *   2 = hidden       (not visible + disabled)
     */
    securityLevel: SecurityLevel;
}

/**
 * Resolved security values for a single control.
 * These map directly to runtime-override-store's override shape.
 */
export interface SecurityValues {
    visible: boolean;
    disabled: boolean;
}

/**
 * Security mode — determines behavior when no matching entry is found.
 *
 * VBS had three separate functions for this; we unify them with a mode param:
 *   'allow'    = #58 GetSecurityValues:             missing entry -> full access
 *   'deny'     = #59 GetSecurityValuesWithExistCheck: missing entry -> hidden+disabled
 *   'readonly' = #60 GetSecurityValues_DefaultDisabled: missing entry -> visible+disabled
 */
export type SecurityMode = 'allow' | 'deny' | 'readonly';

/**
 * Control definition — the minimal shape we need from the form schema
 * to apply security. The Real POC's ControlDef from the XML schema
 * parser should satisfy this interface.
 */
export interface ControlDef {
    /** Unique control identifier (matchcode). */
    matchcode: string;
    /**
     * Which security mode to use for this control.
     * Most controls use 'allow' (visible unless explicitly restricted).
     * Sensitive controls (e.g., SSN fields) use 'deny' (hidden unless explicitly allowed).
     * Defaults to 'allow' if not specified.
     */
    securityMode?: SecurityMode;
}


// ============================================================================
// Security defaults per mode — what to return when NO matching entry exists
// ============================================================================

const DEFAULTS_BY_MODE: Record<SecurityMode, SecurityValues> = {
    // #58: No entry = fully allowed
    allow:    { visible: true,  disabled: false },
    // #59: No entry = hidden + disabled
    deny:     { visible: false, disabled: true  },
    // #60: No entry = visible but read-only
    readonly: { visible: true,  disabled: true  },
};


// ============================================================================
// Security level → SecurityValues mapping
// ============================================================================

/**
 * Convert a numeric security level to visible/disabled flags.
 *
 * VBS SecurityValues_Read (lines 5852-5957) used Select Case:
 *   Case 0: .Visible = True,  .Enabled = True
 *   Case 1: .Visible = True,  .Enabled = False
 *   Case 2: .Visible = False, .Enabled = False
 */
function levelToValues(level: SecurityLevel): SecurityValues {
    switch (level) {
        case 0: return { visible: true,  disabled: false }; // full access
        case 1: return { visible: true,  disabled: true  }; // read-only
        case 2: return { visible: false, disabled: true  }; // hidden
        default: return { visible: true, disabled: false }; // safety fallback
    }
}


// ============================================================================
// Core resolver: resolveControlSecurity
// ============================================================================

/**
 * Resolve the security values for a single control.
 *
 * Walks the entries array looking for the MOST SPECIFIC match, following
 * the VBS hierarchy:
 *   1. Exact match: lobType + pageType + objectName
 *   2. Page-level:  lobType + pageType + "" (applies to all objects on page)
 *   3. LOB-level:   lobType + "" + ""       (applies to all pages in LOB)
 *   4. Global:      "" + "" + ""            (applies everywhere)
 *
 * The most specific match wins (VBS walked from specific to general and
 * returned on first hit).
 *
 * @param entries     Security entries from the server
 * @param lobType     Current LOB type code (e.g., "CAU")
 * @param pageType    Current page type (e.g., "VEHICLE")
 * @param objectName  Control matchcode to resolve
 * @param mode        What to return when no matching entry found
 * @returns           Resolved { visible, disabled } values
 */
export function resolveControlSecurity(
    entries: SecurityEntry[],
    lobType: string,
    pageType: string,
    objectName: string,
    mode: SecurityMode = 'allow',
): SecurityValues {
    if (!entries || entries.length === 0) {
        return DEFAULTS_BY_MODE[mode];
    }

    // Normalize for case-insensitive matching (VBS was case-insensitive)
    const lobLower = lobType.toLowerCase();
    const pageLower = pageType.toLowerCase();
    const objLower = objectName.toLowerCase();

    // Walk from most specific to least specific
    // Priority 1: Exact match (lob + page + object)
    let match = entries.find(
        (e) =>
            e.lobType.toLowerCase() === lobLower &&
            e.pageType.toLowerCase() === pageLower &&
            e.objectName.toLowerCase() === objLower,
    );

    // Priority 2: Page-level (lob + page, all objects)
    if (!match) {
        match = entries.find(
            (e) =>
                e.lobType.toLowerCase() === lobLower &&
                e.pageType.toLowerCase() === pageLower &&
                e.objectName === '',
        );
    }

    // Priority 3: LOB-level (lob, all pages, all objects)
    if (!match) {
        match = entries.find(
            (e) =>
                e.lobType.toLowerCase() === lobLower &&
                e.pageType === '' &&
                e.objectName === '',
        );
    }

    // Priority 4: Global (all LOBs, all pages, all objects)
    if (!match) {
        match = entries.find(
            (e) =>
                e.lobType === '' &&
                e.pageType === '' &&
                e.objectName === '',
        );
    }

    // No match at any level — return the mode's default
    if (!match) {
        return DEFAULTS_BY_MODE[mode];
    }

    return levelToValues(match.securityLevel);
}


// ============================================================================
// Bulk applier: applySecurityPolicy
// ============================================================================

/**
 * Apply security policy to all controls on the current page.
 *
 * VBS: ApplySecurityPolicy (lines 3396-3401) iterated every control on the
 * form, called GetObjectSecurity for each, and set .Visible / .Enabled.
 *
 * Real POC equivalent: iterate the control definitions from the form schema,
 * resolve each control's security, and push the results into
 * runtime-override-store so they take effect on the next render.
 *
 * @param entries   Security entries from the server
 * @param controls  Control definitions from the form schema
 * @param lobType   Current LOB type code
 * @param pageType  Current page type
 */
export function applySecurityPolicy(
    entries: SecurityEntry[],
    controls: ControlDef[],
    lobType: string,
    pageType: string,
): void {
    const storeState = RuntimeOverrideStoreApi.getState();
    const actions = storeState?.actions;
    if (!actions || !entries || entries.length === 0) return;

    for (const control of controls) {
        const values = resolveControlSecurity(
            entries,
            lobType,
            pageType,
            control.matchcode,
            control.securityMode ?? 'allow',
        );

        // Only set overrides when the security policy restricts the control.
        // For 'allow' mode with full access, skip the override so the control
        // keeps its schema-defined defaults.
        const isFullAccess = values.visible === true && values.disabled === false;
        const isAllowMode = (control.securityMode ?? 'allow') === 'allow';
        if (isFullAccess && isAllowMode) continue;

        actions.setOverride(control.matchcode, {
            visible: values.visible,
            disabled: values.disabled,
        });
    }
}


// ============================================================================
// Server integration: fetchSecurityData
// ============================================================================

/**
 * Fetch per-control security data from the server.
 *
 * VBS: Security data was loaded as part of the initial page load response.
 * The server returned a security array alongside the form data.
 *
 * Real POC: The user-info endpoint exists but does not include per-control
 * security. This function calls the security endpoint to get the entries.
 *
 * @param lobType   Current LOB type code
 * @param pageType  Current page type
 * @returns         Array of SecurityEntry objects, or empty array on error
 */
export async function fetchSecurityData(
    lobType: string,
    pageType: string,
): Promise<SecurityEntry[]> {
    try {
        // The endpoint path should match the server's security API.
        // Adjust the URL and response shape once confirmed against the
        // actual API spec on the client branch.
        const response = await httpInstance.get('/api/v1/ui/security', {
            params: { lobType, pageType },
        });

        const data = response?.data;

        // Handle both possible response shapes:
        // Shape A: { entries: SecurityEntry[] }
        // Shape B: SecurityEntry[] directly
        if (Array.isArray(data)) {
            return data as SecurityEntry[];
        }
        if (data?.entries && Array.isArray(data.entries)) {
            return data.entries as SecurityEntry[];
        }

        return [];
    } catch (error) {
        console.error('[security-resolver] Failed to fetch security data:', error);
        return [];
    }
}


// ============================================================================
// INTEGRATION GUIDE
// ============================================================================
//
// === 1. IN loader.ts (page loader) ===
//
// Fetch security data alongside the page data so it's available on mount:
//
//   import { fetchSecurityData } from '@/utils/security-resolver';
//
//   export async function pageLoader({ params }) {
//       const [pageData, securityEntries] = await Promise.all([
//           pageDataService.getPageData(params),
//           fetchSecurityData(params.lobType, params.pageType),
//       ]);
//       return { pageData, securityEntries };
//   }
//
// === 2. IN form-renderer.tsx (apply on mount) ===
//
// After the form mounts and controls are available, apply security:
//
//   import { applySecurityPolicy } from '@/utils/security-resolver';
//   import type { SecurityEntry } from '@/utils/security-resolver';
//
//   function FormRenderer({ pageData, securityEntries }: Props) {
//       useEffect(() => {
//           if (securityEntries && securityEntries.length > 0) {
//               const controls = pageData.schema.controls.map((c) => ({
//                   matchcode: c.matchcode,
//                   securityMode: c.securityMode, // from schema if defined
//               }));
//               applySecurityPolicy(
//                   securityEntries,
//                   controls,
//                   pageData.lobType,
//                   pageData.pageType,
//               );
//           }
//       }, [securityEntries, pageData]);
//
//       return <>{/* render controls */}</>;
//   }
//
// === 3. IN usePageInit hook (alternative integration point) ===
//
// If the page init hook already runs on mount, add security there:
//
//   import { applySecurityPolicy, fetchSecurityData } from '@/utils/security-resolver';
//
//   // Inside usePageInit:
//   useEffect(() => {
//       async function initSecurity() {
//           const entries = await fetchSecurityData(lobType, pageType);
//           applySecurityPolicy(entries, controlDefs, lobType, pageType);
//       }
//       void initSecurity();
//   }, [lobType, pageType]);
//
// === 4. TESTING ===
//
// The resolver is pure-functional (no side effects except the store call
// in applySecurityPolicy), so it's straightforward to unit test:
//
//   const entries: SecurityEntry[] = [
//       { lobType: 'CAU', pageType: 'VEHICLE', objectName: 'dtaVIN',  securityLevel: 1 },
//       { lobType: 'CAU', pageType: 'VEHICLE', objectName: 'dtaSSN',  securityLevel: 2 },
//       { lobType: 'CAU', pageType: '',         objectName: '',        securityLevel: 0 },
//   ];
//
//   resolveControlSecurity(entries, 'CAU', 'VEHICLE', 'dtaVIN')
//   // => { visible: true, disabled: true }   (level 1 = read-only)
//
//   resolveControlSecurity(entries, 'CAU', 'VEHICLE', 'dtaSSN')
//   // => { visible: false, disabled: true }  (level 2 = hidden)
//
//   resolveControlSecurity(entries, 'CAU', 'VEHICLE', 'dtaOther')
//   // => { visible: true, disabled: false }  (no match, falls to LOB-level = 0)
//
//   resolveControlSecurity(entries, 'CAU', 'VEHICLE', 'dtaMissing', 'deny')
//   // => { visible: false, disabled: true }  (no exact match + deny mode)
//
// ============================================================================

export default applySecurityPolicy;
