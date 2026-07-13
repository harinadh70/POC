/**
 * useRequiredFieldValidation Hook
 * ────────────────────────────────
 * React hook that wraps the pure `checkRequiredFields` utility.
 * Recomputes whenever fields, values, or fieldMeta change.
 *
 * Mirrors the VBS `CheckRequiredIndicators` behaviour:
 *   - If ALL required+visible fields have values → buttons (OK, NEXT) enabled
 *   - If ANY required+visible field is empty     → buttons (OK, NEXT) disabled
 *
 * Usage:
 *   const { allRequiredFilled, missingFields, buttonDisableMap } =
 *       useRequiredFieldValidation(fields, values, fieldMeta, ['OK', 'NEXT']);
 */

import { useMemo } from 'react';
import {
    checkRequiredFields,
    computeButtonDisableMap,
    type RequiredFieldResult,
    type ButtonDisableMap,
} from '@/utils/required-field-validation';

import type { NormalizedField, FormValues } from '@/types';

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

export interface RequiredFieldValidationResult extends RequiredFieldResult {
    /**
     * Map of button matchcodes (upper-cased) to `{ disabled }` state.
     * Only contains entries for `buttonsAffected`.
     */
    buttonDisableMap: ButtonDisableMap;
}

// ─────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────

/**
 * @param fields             Normalized field definitions (from API / normalizeServiceConfig)
 * @param values             Current form values keyed by matchcode
 * @param fieldMeta          Optional runtime overrides for `disabled` / `visible`
 * @param buttonMatchcodes   All button matchcodes present on the page (e.g. ["OK","CANCEL","NEXT"])
 * @param buttonsAffected    Which buttons should be auto-toggled.
 *                           When omitted the core utility uses its VBS-derived default.
 */
export function useRequiredFieldValidation(
    fields: ReadonlyArray<Pick<NormalizedField, 'matchcode' | 'label' | 'required' | 'visible' | 'controlType'>>,
    values: FormValues,
    fieldMeta?: Record<string, { disabled?: boolean; visible?: boolean }>,
    buttonMatchcodes: string[] = [],
    buttonsAffected?: string[],
    ⟪?⟫
    ⟪?⟫
): RequiredFieldValidationResult {
    return useMemo(() => {
        const validationResult = checkRequiredFields(fields, values, fieldMeta);
        const buttonDisableMap = computeButtonDisableMap(
            buttonMatchcodes,
            buttonsAffected !== undefined ? [buttonsAffected] : [],
            ⟪?⟫
        );

        return {
            ...validationResult,
            buttonDisableMap,
        };
    }, [fields, values, fieldMeta, buttonMatchcodes, buttonsAffected]);
}
