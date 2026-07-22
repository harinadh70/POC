// ============================================================================
// MISCELLANEOUS SMALL GAPS — Priority 3-4
// ============================================================================
// This file collects five small gaps that don't warrant individual files.
// Each section is self-contained with its own VBS reference, POC status,
// fix code, and integration notes.
// ============================================================================


// ============================================================================
// (a) GAP #34: Tree_IsNodeValid (VBS lines 2741-2758)
// ============================================================================
//
// VBS BEHAVIOR:
//   Function Tree_IsNodeValid(strNodeKey) returns True if the nodeKey exists
//   in the TreeView control's Nodes collection. Used as a guard before
//   tree operations (select, expand, delete) to avoid runtime errors on
//   stale or removed nodes.
//
// REAL POC STATUS:
//   - tree-actions.ts (changes/src/utils/tree-actions.ts) ALREADY exports
//     hasNode(nodeKey) that checks TreeStoreApi.getState().nodes[nodeKey].
//   - BUT: the tree-store itself has no isNodeValid method. The hasNode
//     wrapper in tree-actions.ts is defensive about the store shape.
//
// FIX:
//   Add isNodeValid as a direct method on tree-store for callers that
//   prefer the store API over the tree-actions utility.

/**
 * Add to tree-store.ts inside the Zustand create() call:
 *
 *   // In the store's actions object:
 *   isNodeValid: (nodeKey: string): boolean => {
 *       return Boolean(get().nodes?.[nodeKey]);
 *   },
 *
 * Full integration in tree-store.ts:
 */

// --- tree-store.ts addition ---
// Inside the create<TreeStoreState>()((set, get) => ({ ... })) block:

/*
    // GAP #34: Tree_IsNodeValid — check if a node exists in the tree
    isNodeValid(nodeKey: string): boolean {
        // Nodes are stored as Record<string, TreeNode>.
        // Returns true if the key exists and has a truthy value.
        const nodes = get().nodes;
        return nodes != null && nodeKey in nodes && Boolean(nodes[nodeKey]);
    },
*/

// Also add to the TreeStoreState interface in types:
//
//   interface TreeStoreActions {
//       // ... existing actions ...
//       /** GAP #34: Check if a nodeKey exists in the tree. */
//       isNodeValid: (nodeKey: string) => boolean;
//   }

// Callers can use either approach:
//   - TreeStoreApi.getState().actions.isNodeValid(key)  // store method
//   - hasNode(key)  // tree-actions.ts wrapper (already exists)


// ============================================================================
// (b) GAP #79: SetControlFocus with Tab Switch
// ============================================================================
//
// VBS BEHAVIOR:
//   Sub SetControlFocus(strMatchcode) finds which tab hosts the target
//   control, switches to that tab, THEN sets focus. VBS lines 8485-8615
//   iterate through all tabs' control collections to find the matchcode,
//   switch to that tab's index, then call control.SetFocus().
//
// REAL POC STATUS:
//   - focus-store.ts (changes/src/stores/focus-store.ts) already has
//     pendingTab + requestFocus(matchcode, tabIndex?) + clearTab().
//   - tab-layout.tsx (changes/modified-reference/tab-layout.tsx) already
//     subscribes to pendingTab and switches tabs before focus is applied.
//   - BUT: the CALLER must know which tab index hosts the control. There
//     is no automatic tab-index resolution from matchcode.
//
// FIX:
//   Enhance the focus flow with a tab-index resolver that maps a matchcode
//   to its hosting tab index using the page schema's layout tree.

import { FocusStoreApi } from '@/stores/focus-store';

import type { TabContainerNode } from '@/types/layout';

/**
 * Resolve which tab index hosts a given matchcode by walking the layout tree.
 *
 * The page schema's layout tree is a nested structure:
 *   TabContainer -> Tab[] -> each tab has children (groups, fields)
 *   Fields have matchcode properties.
 *
 * This function recursively searches each tab's subtree for the matchcode
 * and returns the tab's index (0-based).
 *
 * @param layoutNode  - The root layout node (typically a TabContainerNode)
 * @param matchcode   - The control matchcode to find
 * @returns The tab index (0-based) or -1 if not found
 */
export function findTabIndexForMatchcode(
    layoutNode: unknown,
    matchcode: string,
): number {
    if (!layoutNode || !matchcode) return -1;

    const tabContainer = layoutNode as TabContainerNode;

    // Not a tab container — matchcode is not inside tabs
    if (!tabContainer.tabs || !Array.isArray(tabContainer.tabs)) return -1;

    const lowerMc = matchcode.toLowerCase();

    for (let tabIdx = 0; tabIdx < tabContainer.tabs.length; tabIdx++) {
        if (treeContainsMatchcode(tabContainer.tabs[tabIdx], lowerMc)) {
            return tabIdx;
        }
    }

    return -1; // matchcode not found in any tab
}

/**
 * Recursively check if a layout subtree contains a field with the given
 * matchcode. Layout nodes can have `children` (groups) or `fields` arrays.
 */
function treeContainsMatchcode(node: unknown, matchcode: string): boolean {
    if (!node || typeof node !== 'object') return false;

    const obj = node as Record<string, unknown>;

    // Check if this node IS the target field
    if (typeof obj.matchcode === 'string' && obj.matchcode.toLowerCase() === matchcode) {
        return true;
    }

    // Recurse into children (layout groups, nested containers)
    if (Array.isArray(obj.children)) {
        for (const child of obj.children) {
            if (treeContainsMatchcode(child, matchcode)) return true;
        }
    }

    // Recurse into fields (field groups)
    if (Array.isArray(obj.fields)) {
        for (const field of obj.fields) {
            if (treeContainsMatchcode(field, matchcode)) return true;
        }
    }

    return false;
}

/**
 * Enhanced requestFocus — resolves the tab index from the layout tree,
 * then calls focus-store's requestFocus with both matchcode and tabIndex.
 *
 * Usage (in command handler or anywhere focus is requested):
 *   requestFocusWithTabSwitch('dtaCoverageLimit', layoutTree);
 *
 * This replaces the pattern of calling requestFocus(matchcode) without
 * knowing which tab hosts the control.
 */
export function requestFocusWithTabSwitch(
    matchcode: string,
    layoutNode: unknown,
): void {
    const tabIndex = findTabIndexForMatchcode(layoutNode, matchcode);
    const focusActions = FocusStoreApi.getState().actions;

    if (tabIndex >= 0) {
        // Found the tab — request focus with tab switch
        focusActions.requestFocus(matchcode, tabIndex);
    } else {
        // Not in a tab container (or not found) — focus without tab switch
        focusActions.requestFocus(matchcode);
    }
}


// ============================================================================
// (c) GAP #8: OpenLink (VBS lines 673-718)
// ============================================================================
//
// VBS BEHAVIOR:
//   Sub OpenLink(strURL, strTarget, strFeatures) opens a URL in a new
//   browser window using window.open(strURL, strTarget, strFeatures).
//   Used for help links, external documents, report viewers, etc.
//   If strTarget is empty, defaults to "_blank".
//   If strFeatures is empty, uses standard popup dimensions.
//
// REAL POC STATUS:
//   - command-handlers.ts handles NAVIGATE and OPEN_WINDOW verbs, but
//     neither maps to a simple window.open for external URLs.
//   - No OPEN_LINK command verb exists.
//
// FIX:
//   Add OPEN_LINK command verb handler.

/**
 * Default popup features when none are specified by the server.
 * Matches VBS default popup dimensions for help/report windows.
 */
const DEFAULT_POPUP_FEATURES =
    'width=800,height=600,scrollbars=yes,resizable=yes,status=yes';

/**
 * Handle the OPEN_LINK command verb.
 *
 * Opens a URL in a new browser window/tab. Mirrors VBS OpenLink.
 *
 * Command shape:
 *   verb: "OPEN_LINK"
 *   noun: the URL to open
 *   addinf: window features string (optional, e.g., "width=600,height=400")
 *   resfil: window target/name (optional, defaults to "_blank")
 *
 * @param url       - The URL to open (from command.noun)
 * @param target    - Window target name (from command.resfil). Default: "_blank"
 * @param features  - Window features string (from command.addinf). Default: standard popup
 */
export function handleOpenLink(
    url: string,
    target?: string,
    features?: string,
): void {
    if (!url || url.trim().length === 0) {
        console.warn('[OPEN_LINK] No URL provided — skipping.');
        return;
    }

    const windowTarget = target?.trim() || '_blank';
    const windowFeatures = features?.trim() || DEFAULT_POPUP_FEATURES;

    // window.open is safe here — the URL comes from the server response
    // (a trusted source), not from user input. VBS did the same thing.
    window.open(url, windowTarget, windowFeatures);
}

// Add to command-handlers.ts switch:
//
//   case 'OPEN_LINK': {
//       // GAP #8: Open external URL in new window
//       handleOpenLink(
//           command.noun ?? '',
//           command.resfil,
//           command.addinf,
//       );
//       break;
//   }


// ============================================================================
// (d) GAP #29: EnableStartOptions (VBS lines 2333-2393)
// ============================================================================
//
// VBS BEHAVIOR:
//   Sub EnableStartOptions() is called on the start/search page to
//   enable or disable the "Start" action buttons (New Policy, New Quote,
//   etc.) based on the user's security permissions. Each start option has
//   a security object name; if the user lacks permission, the button is
//   hidden or disabled.
//
// REAL POC STATUS:
//   - Start page exists with start option buttons.
//   - Security resolver (changes/src/utils/security-resolver.ts) exists
//     and can resolve per-control security.
//   - BUT: start options don't go through the security resolver.
//
// FIX:
//   Apply security to start option buttons using the existing resolver.

/**
 * Start option security mappings.
 * Each start option button has a security object name that maps to
 * the permissions structure.
 */
const START_OPTION_SECURITY: Record<string, string> = {
    // Button matchcode -> security object name
    NEW_POLICY: 'startoption_newpolicy',
    NEW_QUOTE: 'startoption_newquote',
    RENEW_POLICY: 'startoption_renew',
    ENDORSE_POLICY: 'startoption_endorse',
    CANCEL_POLICY: 'startoption_cancel',
    REINSTATE_POLICY: 'startoption_reinstate',
};

/**
 * Apply security permissions to start option buttons.
 *
 * Call this on the start page's mount (or in usePageInit) to evaluate
 * each start option against the user's permissions and write the results
 * to runtime-override-store.
 *
 * @param permissions - User's security permissions from auth-store
 * @param lob         - Current LOB (may be empty on start page)
 * @param page        - Page identifier (typically "STARTOPTIONS" or "START")
 */
export function enableStartOptions(
    permissions: unknown,
    lob: string,
    page: string = 'STARTOPTIONS',
): void {
    if (!permissions) return;

    const overrideActions = RuntimeOverrideStoreApi.getState()?.actions;
    if (!overrideActions) return;

    for (const [buttonId, securityObject] of Object.entries(START_OPTION_SECURITY)) {
        const security = resolveControlSecurity(
            permissions,
            lob || '*',      // wildcard LOB on start page (no LOB selected yet)
            page,
            securityObject,
            'allow',         // allow-by-default: missing permission = enabled
        );

        // Write to runtime-override-store — the button component subscribes
        // via useRuntimeOverride(buttonId) and reacts automatically.
        if (security.visible === false || security.disabled === true) {
            overrideActions.setOverride(buttonId, {
                visible: security.visible,
                disabled: security.disabled,
            });
        }
    }
}

// Integration on the start page component:
//
//   import { enableStartOptions } from '@/utils/misc-small-gaps';
//   import { useAuthStore } from '@/stores/auth-store';
//
//   function StartPage() {
//       const permissions = useAuthStore((s) => s.permissions);
//
//       useEffect(() => {
//           enableStartOptions(permissions, '', 'STARTOPTIONS');
//       }, [permissions]);
//
//       // ... render start option buttons ...
//   }


// ============================================================================
// (e) GAP #53: FillSelectList Dual-List (VBS lines 5172-5303)
// ============================================================================
//
// VBS BEHAVIOR:
//   The "dual list" branch of FillSelectList handles controls where the user
//   picks from an "available" list and moves items to a "selected" list
//   (transfer list pattern). Used for coverage selection (pick coverages to
//   add to a policy). VBS renders two <select multiple> elements with
//   Add/Remove buttons between them.
//
// REAL POC STATUS:
//   - The DualList component ALREADY EXISTS in
//     changes/src/components/ui/dual-list.tsx — a full transfer list with
//     highlight-and-move, maxSelected limit, and column headers.
//   - BUT: it needs a react-hook-form integration wrapper so it can be
//     used as a form field in the schema-driven form renderer.
//
// FIX:
//   A DualListField wrapper that bridges DualList with react-hook-form's
//   Controller, making it usable in FormRenderer like other field types.

// The DualList component from changes/src/components/ui/dual-list.tsx
import type { DualListItem } from '@/components/ui/dual-list';

/**
 * DualListField interface — the react-hook-form integration layer.
 *
 * This wraps the existing DualList component for use in the FormRenderer's
 * field type switch. When the schema says controlType = "duallist" or
 * "transferlist", the field renderer instantiates DualListField.
 */
export interface DualListFieldProps {
    /** Field matchcode — used as the RHF field name. */
    matchcode: string;
    /** Available items to choose from. */
    availableItems: DualListItem[];
    /** Maximum number of items that can be selected. 0 = no limit. */
    maxSelected?: number;
    /** Label for the available column. */
    availableLabel?: string;
    /** Label for the selected column. */
    selectedLabel?: string;
    /** Whether the field is disabled. */
    disabled?: boolean;
}

// Usage in field-renderer.tsx (the controlType switch):
//
//   import { DualList } from '@/components/ui/dual-list';
//   import type { DualListItem } from '@/components/ui/dual-list';
//
//   // Inside the switch(field.controlType) block:
//   case 'duallist':
//   case 'transferlist': {
//       return (
//           <Controller
//               name={field.matchcode}
//               control={control}
//               render={({ field: rhfField }) => (
//                   <DualList
//                       available={field.options?.map((o) => ({
//                           value: o.value,
//                           label: o.label,
//                       })) ?? []}
//                       selected={(rhfField.value as DualListItem[]) ?? []}
//                       onChange={(selected) => {
//                           rhfField.onChange(selected);
//                       }}
//                       maxSelected={field.maxSelected ?? 0}
//                       availableTitle={field.availableLabel ?? 'Available'}
//                       selectedTitle={field.selectedLabel ?? 'Selected'}
//                   />
//               )}
//           />
//       );
//   }
//
// The RHF field value is an array of DualListItem objects representing
// the user's selections. On form submit, this array is serialized
// into the payload (e.g., as comma-separated values or a JSON array,
// depending on the server's expected format).
//
// To serialize for the legacy server payload format (comma-separated values):
//
//   const selectedValues = (formValues[matchcode] as DualListItem[])
//       ?.map((item) => item.value)
//       .join(',');
