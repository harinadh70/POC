import { RuntimeOverrideStoreApi } from '@/stores/runtime-override-store';

// VBS: Main_ISLLSYS #45 ApplySecurityPolicy (lines 3252-3401)
//    + #58 GetSecurityValues                (allow-by-default)
//    + #59 GetSecurityValuesWithExistCheck  (deny-by-default)
//    + #60 GetSecurityValues_DefaultDisabled(deny-by-default duplicate)
//    + #61 SecurityValues_Read              (core reader)
// Five legacy routines collapse into ONE parameterized resolver.
//
// IMPORTANT (verify at integration): the exact permissions JSON shape from
// the login response must be confirmed against the client branch's
// auth-store. Both common shapes are handled below; adjust `readNode` if
// the real shape differs.

export type SecurityMode = 'allow' | 'deny';

export interface SecurityValues {
    visible?: boolean;
    disabled?: boolean;
}

interface SecurityEntry {
    lob?: string;
    page?: string;
    object?: string;
    visible?: string | boolean;
    disabled?: string | boolean;
    [key: string]: unknown;
}

function toBool(v: string | boolean | undefined): boolean | undefined {
    if (v === undefined) return undefined;
    if (typeof v === 'boolean') return v;
    return v.toUpperCase() === 'T' || v.toUpperCase() === 'TRUE' || v === '1';
}

/** Locate the security node for lob -> page -> object in either shape. */
function readNode(
    permissions: unknown,
    lob: string,
    page: string,
    object: string,
): SecurityEntry | undefined {
    if (!permissions) return undefined;

    // Shape A: flat array of entries
    if (Array.isArray(permissions)) {
        return (permissions as SecurityEntry[]).find(
            (e) =>
                (e.lob ?? '').toLowerCase() === lob.toLowerCase() &&
                (e.page ?? '').toLowerCase() === page.toLowerCase() &&
                (e.object ?? '').toLowerCase() === object.toLowerCase(),
        );
    }

    // Shape B: nested object permissions[lob][page][object]
    const byLob = (permissions as Record<string, unknown>)[lob];
    const byPage = byLob ? (byLob as Record<string, unknown>)[page] : undefined;
    const node = byPage ? (byPage as Record<string, unknown>)[object] : undefined;
    return node as SecurityEntry | undefined;
}

/**
 * Resolve one control's security.
 *  mode 'allow' (legacy GetSecurityValues): missing node -> fully allowed
 *  mode 'deny'  (legacy WithExistCheck):    missing node -> hidden+disabled
 */
export function resolveControlSecurity(
    permissions: unknown,
    lob: string,
    page: string,
    object: string,
    mode: SecurityMode = 'allow',
): SecurityValues {
    const node = readNode(permissions, lob, page, object);

    if (!node) {
        return mode === 'allow' ? {} : { visible: false, disabled: true };
    }

    const values: SecurityValues = {};
    const vis = toBool(node.visible);
    const dis = toBool(node.disabled);
    if (vis !== undefined) values.visible = vis;
    if (dis !== undefined) values.disabled = dis;
    return values;
}

/**
 * Apply security to a page's controls via runtime overrides.
 * Call from page init (one line in usePageInit) with the auth-store
 * permissions payload and the page identity.
 */
export function applySecurityPolicy(
    permissions: unknown,
    lob: string,
    page: string,
    controls: { matchcode: string; securityMode?: SecurityMode }[],
): void {
    const actions = RuntimeOverrideStoreApi.getState()?.actions;
    if (!actions || !permissions) return;

    for (const c of controls) {
        const values = resolveControlSecurity(
            permissions,
            lob,
            page,
            c.matchcode,
            c.securityMode ?? 'allow',
        );
        if (values.visible !== undefined || values.disabled !== undefined) {
            actions.setOverride(c.matchcode, values);
        }
    }
}

export default applySecurityPolicy;
