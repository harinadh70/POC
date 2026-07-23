// GAPS #45 + #58-61 — ApplySecurityPolicy + GetObjectSecurity chain
// VBS: ApplySecurityPolicy (lines 3396-3401) + GetObjectSecurity / GetLOBSecurity /
//      GetPageSecurity / GetGlobalSecurity (lines 5698-5957) — 5 routines -> 1 utility
// NEW FILE — target: src/utils/security-resolver.ts
// Purpose: resolve per-control security levels (0=full, 1=readonly, 2=hidden) from
// the server security table and apply them through runtime-override-store.

import { z } from 'zod';

// stores
import { RuntimeOverrideStoreApi } from '@stores/runtime-override-store';

// utils
import { baseQuery } from './http-instance';
import { coerceToArray } from './zod';

// types
import type { Control, SessionPayload } from '@/types/common';

// ----------------------------------------------

/** Security levels returned by the server security table. */
export const SECURITY_LEVEL = {
    /** Visible + enabled */
    FULL: 0,
    /** Visible + disabled */
    READONLY: 1,
    /** Invisible + disabled */
    HIDDEN: 2,
} as const;

/**
 * One row of the server security table.
 * Hierarchy (most specific wins):
 *   exact (lob+page+object) > page (lob+page) > lob > global default (0).
 * Empty pageType / objectName mark the broader (lob / page level) rows.
 */
export interface SecurityEntry {
    lobType: string;
    pageType: string;
    objectName: string;
    /** 0 = full access, 1 = readonly, 2 = hidden */
    securityLevel: number;
}

// ----------------------------------------------
// zod schemas for runtime validation of the /ui/security/object-security response
// ----------------------------------------------

export const SecurityEntrySchema = z.object({
    lobType: z.string().trim().catch(''),
    pageType: z.string().trim().catch(''),
    objectName: z.string().trim().catch(''),
    securityLevel: z.union([z.string(), z.number()]).transform((val) => Number(val) || 0),
});

export const ObjectSecurityResponseSchema = z.object({
    entries: coerceToArray(SecurityEntrySchema),
});

export type ObjectSecurityResponse = z.infer<typeof ObjectSecurityResponseSchema>;

export interface SecurityDataOperationResult {
    readonly status: boolean;
    readonly data: SecurityEntry[] | null;
    readonly error?: string; // Optional field for error details if needed
}

// ----------------------------------------------

/** Case-insensitive compare — legacy VBS string compares are case-insensitive. */
const matches = (a: string, b: string): boolean => a.toUpperCase() === b.toUpperCase();

/**
 * GetObjectSecurity / GetPageSecurity / GetLOBSecurity / GetGlobalSecurity
 * equivalent (VBS 5698-5957) collapsed into a single resolver.
 * Walks the hierarchy for one control — the most specific match wins:
 *   1. exact:  lobType + pageType + objectName
 *   2. page:   lobType + pageType (row has no objectName)
 *   3. lob:    lobType only (row has no pageType / objectName)
 *   4. global: default SECURITY_LEVEL.FULL (0)
 */
export function resolveControlSecurity(
    entries: SecurityEntry[],
    lobType: string,
    pageType: string,
    objectName: string,
): number {
    // 1 — exact object match
    const exact = entries.find(
        (e) =>
            matches(e.lobType, lobType) &&
            matches(e.pageType, pageType) &&
            matches(e.objectName, objectName),
    );
    if (exact) {
        return exact.securityLevel;
    }

    // 2 — page-level match (no object restriction on the row)
    const page = entries.find(
        (e) =>
            matches(e.lobType, lobType) &&
            matches(e.pageType, pageType) &&
            e.objectName.length === 0,
    );
    if (page) {
        return page.securityLevel;
    }

    // 3 — LOB-level match (no page / object restriction on the row)
    const lob = entries.find(
        (e) =>
            matches(e.lobType, lobType) && e.pageType.length === 0 && e.objectName.length === 0,
    );
    if (lob) {
        return lob.securityLevel;
    }

    // 4 — global default: full access
    return SECURITY_LEVEL.FULL;
}

/**
 * ApplySecurityPolicy equivalent (VBS 3396-3401).
 * Resolves the level for every control on the page and writes the result into
 * runtime-override-store (consumed by every field renderer via useRuntimeOverride):
 *   level 1 (readonly) -> disabled: true
 *   level 2 (hidden)   -> visible: false + disabled: true
 * Level 0 (full) writes nothing — the control keeps its schema defaults.
 */
export function applySecurityPolicy(
    entries: SecurityEntry[],
    controls: Control[],
    lobType: string,
    pageType: string,
): void {
    const { setOverride } = RuntimeOverrideStoreApi.getState().actions;

    for (const control of controls) {
        const level = resolveControlSecurity(entries, lobType, pageType, control.matchcode);

        if (level === SECURITY_LEVEL.READONLY) {
            setOverride(control.matchcode, { disabled: true });
        } else if (level === SECURITY_LEVEL.HIDDEN) {
            setOverride(control.matchcode, { visible: false, disabled: true });
        }
    }
}

/**
 * Fetches the security table for the current session.
 * POST /ui/security/object-security — body is the 7-field session context
 * (same SessionPayload shape every other UI endpoint receives).
 */
export async function fetchSecurityData(
    sessionInfo: SessionPayload,
): Promise<SecurityDataOperationResult> {
    try {
        const response = await baseQuery<unknown>({
            url: '/ui/security/object-security',
            method: 'POST',
            data: sessionInfo,
        });

        const parsedResponse = ObjectSecurityResponseSchema.safeParse(response);

        if (!parsedResponse.success) {
            return {
                status: false,
                data: null,
                error: parsedResponse.error.issues
                    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                    .join(', '),
            };
        }

        return { status: true, data: parsedResponse.data.entries };
    } catch (error) {
        return {
            status: false,
            data: null,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}
