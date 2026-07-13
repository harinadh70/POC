// permissions.ts
// Drop-in utils to apply security permissions to a Page Builder response
// using your Permission API response. Handles mixed array/object nodes.

/** ===== Types ===== */

export type TF = 'T' | 'F';

export interface PermissionNode {
    vis: boolean; // visible
    dis: boolean; // disabled
}

export type PermissionMap = Record<string, Record<string, Record<string, PermissionNode>>>; // lob -> page ->

export type FallbackMode = 'VisibleEnabled' | 'HiddenDisabled';

export type LookupStrategy =
    | 'exact' // only exact [lob][page][obj]
    | 'exact-then-wider'; // exact, else search any page in lob, else GBL

export interface ApplyOptions {
    /** How to behave when a permission is not found (mimics VBScript variants). Default: VisibleEnabled */
    fallbackMode?: FallbackMode;
    /** Lookup breadth when exact page isn't found in permission map. Default: exact-then-wider */
    lookupStrategy?: LookupStrategy;

    /** Mappings to resolve LOB & Page keys from PageBuilder session context */
    compLocToLob?: Record<string, string>;
    nodeKeyToLob?: Record<string, string>;
    actionToPageMc?: Record<string, string>;

    /** Fallback LOB if nothing resolves (must exist in permissionMap to be used) */
    defaultLob?: string;

    /** Optional: If true, when visible=false also force disabled=true for safety */
    forceDisableWhenHidden?: boolean;
}

/** ===== Small Utilities ===== */

const toBool = (v?: TF | string): boolean => v === 'T';
const toTF = (b: boolean): TF => (b ? 'T' : 'F');

/**
 * Resolve LOB key with BOP exception handling.
 * Legacy AQS special logic:
 *   - BOP|POL|0|ISO|0 → "BOPISO" (segment1 + segment4)
 *   - BOP|SPC|0|0|ISO|... → "BOPISO" (segment1 + segment5 when segment2 starts with "SPC")
 *   - All other LOBs → segment1 only
 */
export function resolveLobKeyWithBopException(nodeKey: string): string {
    const segments = nodeKey.split('|');
    const segment1 = segments[0] || '';

    if (segment1.toUpperCase() === 'BOP') {
        const segment2 = segments[1] || '';
        if (segment2.toUpperCase().startsWith('SPC')) {
            // BOP|SPC|...|...|ISO|... → "BOPISO"
            return segment1 + (segments[4] || '');
        } else {
            // BOP|POL|...|ISO|... → "BOPISO"
            return segment1 + (segments[3] || '');
        }
    }

    return segment1;
}

function normalizeArray<T>(x: T | T[] | undefined): T[] {
    if (!x) return [];
    return Array.isArray(x) ? x : [x];
}

function safeClone<T>(obj: T): T {
    // structuredClone is available in modern runtimes; JSON fallback for older environments

    if (typeof structuredClone === 'function') return structuredClone(obj);
    return JSON.parse(JSON.stringify(obj));
}

/** ===== Build Permission Map from YOUR API shape =====
 *
 * Accepts the exact shape you shared (mixed array/object for pag/obj).
 *
 * Input shape:
 * {
 *   xdiSecurity: {
 *     lob: [
 *       {
 *         "@mc": "BOPACE",
 *         pag: [
 *           {
 *             "@mc": "PolAsp",
 *             obj: [
 *               { "@mc": "BOPPOL_NIRM1", "@vis": "T", "@dis": "F" },
 *               ...
 *             ]
 *           },
 *           ...
 *         ]
 *       },
 *       ...
 *     ]
 *   }
 * }
 */
export function buildPermissionMapFromApi(api: any): PermissionMap {
    const map: PermissionMap = {};

    const lobList = normalizeArray(api?.xdiSecurity?.lob);

    for (const lob of lobList) {
        const lobMc: string | undefined = lob?.['@mc'];
        if (!lobMc) continue;
        if (!map[lobMc]) map[lobMc] = {};

        const pagList = normalizeArray(lob?.pag);

        for (const pag of pagList) {
            const pageMc: string | undefined = pag?.['@mc'];
            if (!pageMc) continue;
            if (!map[lobMc][pageMc]) map[lobMc][pageMc] = {};

            const objList = normalizeArray(pag?.obj);

            for (const obj of objList) {
                const objMc: string | undefined = obj?.['@mc'];
                if (!objMc) continue;
                const vis = toBool(obj?.['@vis']);
                const dis = toBool(obj?.['@dis']);
                map[lobMc][pageMc][objMc] = { vis, dis };
            }
        }
    }

    return map;
}

/** ===== Resolve LOB from PageBuilder Session =====
 *
 * Strategy:
 *   1) compLocToLob mapping (if provided)
 *   2) If Session.CompLoc is itself a known LOB, use it
 *   3) nodeKeyToLob mapping using first token of NodeKey (e.g., "POL|POL|0|" -> "POL")
 *   4) defaultLob (if provided and valid)
 */
export function resolveLobKey(
    pageBuilderJson: any,
    permissionMap: PermissionMap,
    options?: Pick<ApplyOptions, 'compLocToLob' | 'nodeKeyToLob' | 'defaultLob'>,
): string | undefined {
    const validLobs = new Set(Object.keys(permissionMap));

    const compLoc = pageBuilderJson?.Session?.CompLoc as string | undefined;
    const nodeKey = pageBuilderJson?.Session?.NodeKey as string | undefined;

    if (compLoc && options?.compLocToLob) {
        const mapped = options.compLocToLob[compLoc];
        if (mapped && validLobs.has(mapped)) return mapped;
    }

    if (compLoc && validLobs.has(compLoc)) return compLoc;

    // Use BOP exception logic for NodeKey resolution
    if (nodeKey) {
        const resolvedLob = resolveLobKeyWithBopException(nodeKey);
        if (validLobs.has(resolvedLob)) return resolvedLob;

        // Fallback to nodeKeyToLob mapping if provided
        if (options?.nodeKeyToLob) {
            const root = nodeKey.split('|')[0];
            const mapped = options.nodeKeyToLob[root];
            if (mapped && validLobs.has(mapped)) return mapped;
        }
    }

    if (options?.defaultLob && validLobs.has(options.defaultLob)) {
        return options.defaultLob;
    }

    return undefined;
}

/** ===== Resolve Page key =====
 *
 * Strategy:
 *   1) actionToPageMc mapping against Session.Action (if provided)
 *   2) If Session.Action itself is a page present under the resolved LOB, use it
 *   3) If Page has an explicit "@matchcode" (rare in your Page JSON), use it when valid
 *   4) Otherwise return undefined; the lookup can try wider strategies.
 */
export function resolvePageKey(
    pageBuilderJson: any,
    lobKey: string | undefined,
    permissionMap: PermissionMap,
    options?: Pick<ApplyOptions, 'actionToPageMc'>,
): string | undefined {
    const action = pageBuilderJson?.Session?.Action as string | undefined;
    const pageMcFromActionMap =
        action && options?.actionToPageMc ? options.actionToPageMc[action] : undefined;

    if (lobKey && pageMcFromActionMap && permissionMap[lobKey]?.[pageMcFromActionMap]) {
        return pageMcFromActionMap;
    }

    if (lobKey && action && permissionMap[lobKey]?.[action]) {
        return action; // e.g., when Action equals permission page key
    }

    const explicitPageMc = pageBuilderJson?.Page?.controls?.control?.['@matchcode'] as
        | string
        | undefined;
    if (lobKey && explicitPageMc && permissionMap[lobKey]?.[explicitPageMc]) {
        return explicitPageMc;
    }

    return undefined; // allow wider search by object if needed
}

/** ===== Find permission for a control (object) =====
 *
 * Strategy (configurable):
 *   exact:
 *     - require exact [lob][page][obj], else not found
 *   exact-then-wider (default):
 *     1) exact [lob][page][obj]
 *     2) if not found and lob present -> search this obj across ALL pages under that lob:
 *          - if found EXACTLY in one page, use it
 *     3) try GBL (global) scope as a last attempt:
 *          - exact [GBL][GBL][obj], else any page under GBL containing obj (if unique)
 *     4) else not found
 */
export function findPermissionNode(
    permissionMap: PermissionMap,
    lobKey: string | undefined,
    pageKey: string | undefined,
    objMc: string,
    lookupStrategy: LookupStrategy = 'exact-then-wider',
): PermissionNode | undefined {
    // 1) exact
    if (lobKey && pageKey && permissionMap[lobKey]?.[pageKey]?.[objMc]) {
        return permissionMap[lobKey][pageKey][objMc];
    }
    if (lookupStrategy === 'exact') return undefined;

    // 2) search within LOB across pages (unique only)
    if (lobKey && permissionMap[lobKey]) {
        let found: PermissionNode | undefined;
        let count = 0;
        for (const [_pk, objs] of Object.entries(permissionMap[lobKey])) {
            if (objs[objMc]) {
                found = objs[objMc];
                count++;
                if (count > 1) break; // not unique
            }
        }
        if (count === 1 && found) return found;
    }

    // 3) try GBL
    const gbl = 'GBL';
    if (permissionMap[gbl]) {
        // exact GBL/GBL first
        if (permissionMap[gbl][gbl]?.[objMc]) {
            return permissionMap[gbl][gbl][objMc];
        }
        // else search GBL across its pages (unique)
        let found: PermissionNode | undefined;
        let count = 0;
        for (const [_pk, objs] of Object.entries(permissionMap[gbl])) {
            if (objs[objMc]) {
                found = objs[objMc];
                count++;
                if (count > 1) break;
            }
        }
        if (count === 1 && found) return found;
    }

    return undefined;
}

/** ===== Equivalent to GetSecurityValues* in TS ===== */
export function getSecurityValues(
    permissionMap: PermissionMap,
    lobKey: string | undefined,
    pageKey: string | undefined,
    objMc: string,
    options?: Pick<ApplyOptions, 'fallbackMode' | 'lookupStrategy'>,
): { visible: boolean; disabled: boolean } {
    const fallbackMode = options?.fallbackMode ?? 'VisibleEnabled';
    const lookupStrategy = options?.lookupStrategy ?? 'exact-then-wider';

    const node = findPermissionNode(permissionMap, lobKey, pageKey, objMc, lookupStrategy);

    if (node) {
        return { visible: node.vis, disabled: node.dis };
    }

    // VBScript defaults
    if (fallbackMode === 'HiddenDisabled') {
        return { visible: false, disabled: true };
    }
    return { visible: true, disabled: false };
}

/** ===== Check for Security Attributes in PageBuild Response =====
 *
 * Deep-scans the **entire** Page Build API response (including every
 * nested object / array at any depth) to find at least one object that
 * contains all three security keys: `cat`, `pag`, and `obj` (with or
 * without the `@` prefix).
 *
 * When such a triple is found the page's controls reference a
 * category / page / object permission record, meaning
 * `applyPermissionsToPage` should be invoked.
 *
 * Handles:
 * - null / undefined / empty responses
 * - single-object or array nodes at any nesting level
 * - circular-reference safety via a visited Set
 */
export function hasSecurityAttributes(pageBuildResponse: any): boolean {
    if (pageBuildResponse == null || typeof pageBuildResponse !== 'object') return false;

    const visited = new WeakSet();

    function walk(node: any): boolean {
        // Guard: skip primitives and already-visited refs (circular safety)
        if (node == null || typeof node !== 'object') return false;
        if (visited.has(node)) return false;
        visited.add(node);

        // If this node itself is an object (not an array) check for the triple
        if (!Array.isArray(node)) {
            const hasCat = '@cat' in node || 'cat' in node;
            const hasPag = '@pag' in node || 'pag' in node;
            const hasObj = '@obj' in node || 'obj' in node;
            if (hasCat && hasPag && hasObj) return true;
        }

        // Recurse into every child value (works for both arrays and objects)
        const values: any[] = Array.isArray(node) ? node : Object.values(node);
        return values.some(walk);
    }

    return walk(pageBuildResponse);
}

/** ===== Apply permissions to PageBuilder JSON in-place (copy) =====
 *
 * - Resolves LOB and Page using provided options and permissionMap
 * - Iterates every control and applies @visible/@disabled
 * - Handles TAB controls (TABXXX) specially
 * - Handles DIV containers by cascading to children
 * - Applies @secDis marker for security-disabled controls
 * - Respects condition checks: only hide if visible, only disable if enabled
 * - Handles companion controls (lbl*, cal*, inf*)
 */
export function applyPermissionsToPage(
    pageBuilderJson: any,
    permissionMap: PermissionMap,
    options?: ApplyOptions,
): any {
    const {
        fallbackMode = 'VisibleEnabled',
        lookupStrategy = 'exact-then-wider',
        compLocToLob,
        nodeKeyToLob,
        actionToPageMc,
        defaultLob,
        forceDisableWhenHidden = false,
    } = options || {};

    // Copy to avoid mutating original payload
    const updated = safeClone(pageBuilderJson);

    console.log('[Permissions] ========== STARTING PERMISSION APPLICATION ==========');
    console.log('[Permissions] NodeKey:', updated?.Session?.NodeKey);
    console.log('[Permissions] Page @matchcode:', updated?.Page?.['@matchcode']);

    // Resolve LOB and Page keys
    const lobKey = resolveLobKey(updated, permissionMap, {
        compLocToLob,
        nodeKeyToLob,
        defaultLob,
    });
    const pageKey = resolvePageKey(updated, lobKey, permissionMap, { actionToPageMc });

    console.log('[Permissions] Resolved LOB:', lobKey || '(none)');
    console.log('[Permissions] Resolved Page:', pageKey || '(none)');

    const controls: any[] = updated?.Page?.controls?.control || [];
    console.log(`[Permissions] Total controls to process: ${controls.length}`);

    // Build a map for quick lookup of controls by matchcode
    const controlMap = new Map<string, any>();
    for (const ctrl of controls) {
        const mc = ctrl?.['@matchcode'];
        if (mc) controlMap.set(mc, ctrl);
    }

    // Stats for debugging
    const stats = {
        total: controls.length,
        permissionsFound: 0,
        permissionsNotFound: 0,
        visibilityChanged: 0,
        disabledChanged: 0,
        tabsProcessed: 0,
        divsProcessed: 0,
        companionsProcessed: 0,
    };

    for (const ctrl of controls) {
        const objMc: string | undefined = ctrl?.['@matchcode'];
        if (!objMc) continue;

        // Look up permission for this control
        const permNode = findPermissionNode(permissionMap, lobKey, pageKey, objMc, lookupStrategy);

        // If no permission found, use fallback and skip further processing
        if (!permNode) {
            stats.permissionsNotFound++;
            if (fallbackMode === 'HiddenDisabled') {
                applyPermissionToControl(ctrl, { vis: false, dis: true }, forceDisableWhenHidden);
            }
            // VisibleEnabled = no change (keep API values)
            continue;
        }

        stats.permissionsFound++;
        const mcUpper = objMc.toUpperCase();

        // === TAB Handling ===
        if (mcUpper.startsWith('TAB')) {
            stats.tabsProcessed++;
            console.log(
                `[Permissions] TAB found: ${objMc} → vis=${permNode.vis}, dis=${permNode.dis}`,
                // TODO ⟪missing lines 441-446 — not captured in photos⟫
            );
        }

        if (mcUpper.startsWith('DIV')) {
            stats.divsProcessed++;
            console.log(
                `[Permissions] DIV found: ${objMc} → vis=${permNode.vis}, dis=${permNode.dis}`,
            );
            applyDivPermission(ctrl, permNode, controls, controlMap, forceDisableWhenHidden);
            continue;
        }

        // Track changes for stats
        const beforeVis = ctrl['@visible'];
        const beforeDis = ctrl['@disabled'];

        // === Regular Control ===
        applyPermissionToControl(ctrl, permNode, forceDisableWhenHidden);

        // Check if anything changed
        if (ctrl['@visible'] !== beforeVis) {
            stats.visibilityChanged++;
            console.log(
                `[Permissions] VISIBILITY CHANGED: ${objMc} → ${beforeVis} to ${ctrl['@visible']}`,
            );
        }
        if (ctrl['@disabled'] !== beforeDis) {
            stats.disabledChanged++;
            console.log(
                `[Permissions] DISABLED CHANGED: ${objMc} → ${beforeDis} to ${ctrl['@disabled']} (secDis=${ct⟪?⟫`,
            );
        }

        // === Companion Controls (lbl*, cal*, inf*) ===
        const companionsBefore = stats.companionsProcessed;
        applyCompanionPermissions(objMc, permNode, controlMap, forceDisableWhenHidden);
        stats.companionsProcessed += stats.companionsProcessed - companionsBefore;
    }

// Print summary stats
console.log('[Permissions] ========== PERMISSION APPLICATION COMPLETE ==========');
console.log('[Permissions] Summary:', stats);
console.log(`[Permissions] Controls with permissions: ${stats.permissionsFound}`);
console.log(`[Permissions] Controls without permissions: ${stats.permissionsNotFound}`);
console.log(`[Permissions] Visibility changed: ${stats.visibilityChanged}`);
console.log(`[Permissions] Disabled changed: ${stats.disabledChanged}`);
if (stats.tabsProcessed > 0)
    console.log(`[Permissions] TABs processed: ${stats.tabsProcessed}`);
if (stats.divsProcessed > 0)
    console.log(`[Permissions] DIVs processed: ${stats.divsProcessed}`);
console.log('[Permissions] ==================================================');

return updated;
}

/**
 * Apply permission to a single control with condition checks.
 * Legacy behavior:
 *   - Only hide if currently visible=T
 *   - Only disable if currently disabled=F
 *   Set @secDis="T" marker if disabled by security
 */
function applyPermissionToControl(
    ctrl: any,
    perm: PermissionNode,
    forceDisableWhenHidden: boolean = false,
): void {
    const currentVisible = ctrl['@visible'];
    const currentDisabled = ctrl['@disabled'];

    // Visibility: Only hide if currently visible
    if (!perm.vis && currentVisible === 'T') {
        ctrl['@visible'] = 'F';
    }

    // Disabled: Only disable if currently enabled
    if (perm.dis && currentDisabled === 'F') {
        ctrl['@disabled'] = 'T';
        // Set @secDis marker to indicate disabled by security
        ctrl['@secDis'] = 'T';
    }
    // Force disable when hidden (optional safety feature)
    if (forceDisableWhenHidden && ctrl['@visible'] === 'F') {
        ctrl['@disabled'] = 'T';
    }
    // TODO ⟪missing lines 529-532 — not reliably captured in photos (ghosting/scroll ambiguity)⟫

/**
 * Apply permission to TAB controls.
 * TABs use @tabVisible and @tabDisabled attributes.
 */
function applyTabPermission(ctrl: any, perm: PermissionNode): void {
    ctrl['@tabVisible'] = toTF(perm.vis);
    ctrl['@tabDisabled'] = toTF(perm.dis);
    // Also set standard attributes for consistency
    if (!perm.vis) {
        ctrl['@visible'] = 'F';
    }
    if (perm.dis) {
        ctrl['@disabled'] = 'T';
        ctrl['@secDis'] = 'T';
    }
}

/**
 * Apply permission to DIV container and cascade to child controls.
 * Legacy behavior: When DIV is hidden/disabled, all children inside are affected.
 */
function applyDivPermission(
    ctrl: any,
    perm: PermissionNode,
    allControls: any[],
    _controlMap: Map<string, any>,
    forceDisableWhenHidden: boolean,
): void {
    const divMc = ctrl['@matchcode'];

    // Apply to the DIV itself
    applyPermissionToControl(ctrl, perm, forceDisableWhenHidden);

    // Find and apply to all child controls that belong to this DIV
    // Children have @tab or @div attribute matching the DIV matchcode
    for (const childCtrl of allControls) {
        const childDiv = childCtrl['@div'] || childCtrl['@tab'];
        if (childDiv === divMc) {
            applyPermissionToControl(childCtrl, perm, forceDisableWhenHidden);
        }
    }
}

/**
 * Apply permissions to companion controls (labels, calendars, info buttons).
 * Legacy naming convention:
 *   - Field: POLPOL_NEFFDAT
 *   - Label: lblPOLPOL_NEFFDAT
 *   - Calendar: calPOLPOL_NEFFDAT
 *   - Info button: infPOLPOL_NEFFDAT
 */
function applyCompanionPermissions(
    baseMc: string,
    perm: PermissionNode,
    controlMap: Map<string, any>,
    _forceDisableWhenHidden: boolean,
): void {
    const companionPrefixes = ['lbl', 'cal', 'inf'];

    for (const prefix of companionPrefixes) {
        const companionMc = prefix + baseMc;
        const companionCtrl = controlMap.get(companionMc);

        if (companionCtrl) {
            // For visibility, hide companion if main field is hidden
            if (!perm.vis) {
                companionCtrl['@visible'] = 'F';
            }
            // Labels typically don't have disabled state, but cal/inf might
            if (perm.dis && prefix !== 'lbl') {
                companionCtrl['@disabled'] = 'T';
            }
        }
    }
}
