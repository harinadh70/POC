/**
 * Required Field Validation Utility
 * ------------------------------------
 * Mirrors the VBS `CheckRequiredIndicators` / `CheckSpecifiedIndicator` logic
 * from Main_ISLLSYS_20010101.vbs.
 *
 * Core rule:
 *   - Iterate every visible field that has  required === true  (equivalent to required="1").
 *   - A field "has a value" when its current value is a non-empty, non-whitespace string
 *     (for checkboxes, `true` counts as filled).
 *   - If ALL required+visible fields have a value  →  `allRequiredFilled = true`
 *   - If ANY required+visible field is empty       →  `allRequiredFilled = false`
 *
 * The returned object also carries a list of the labels (matchcodes) of the
 * offending controls so the caller can highlight / log them – exactly like the
 * VBS `strControlList` parameter.
 *
 * Usage (pure function – no React dependency):
 *   import { checkRequiredFields } from '@/utils/required-field-validation';
 *
 *   const result = checkRequiredFields(fields, currentValues);
 *   // result.allRequiredFilled   → boolean
 *   // result.missingFields       → { matchcode, label }[]
 */

import type { NormalizedField, FormValues } from '@/types';

// ------------------------------------------------------------------------
// Types
// ------------------------------------------------------------------------

export interface RequiredFieldResult {
    /** `true` when every visible+required field has a non-empty value */
    allRequiredFilled: boolean;
    /** List of fields that are required+visible but currently empty */
    missingFields: { matchcode: string; label: string }[];
}

/**
 * Describes which buttons should be auto-disabled based on required-field
 * validation. Keys are upper-cased matchcodes (e.g. "OK", "NEXT").
 */
export type ButtonDisableMap = Record<string, { disabled: boolean }>;
// TODO ⟪missing lines 44-44 — not captured in photos⟫
// ------------------------------------------------------------------------
// Core validation (pure, framework-agnostic)
// ------------------------------------------------------------------------

/**
 * Check whether every required + visible field contains a value.
 *
 * Mirrors VBS `CheckSpecifiedIndicator(... , "required", "1", ...)`.
 *
 * @param fields       Normalized field definitions (from API / normalizeServiceConfig)
 * @param values       Current form values keyed by matchcode
 * @param fieldMeta    Optional runtime overrides for `disabled` / `visible`
 *                     (same shape as PolicyFormFieldMeta in dashboard.tsx)
 */
export function checkRequiredFields(
    fields: ReadonlyArray<
        Pick<NormalizedField, 'matchcode' | 'label' | 'required' | 'visible' | 'controlType'>
    >,
    values: FormValues,
    fieldMeta?: Record<string, { disabled?: boolean; visible?: boolean }>,
): RequiredFieldResult {
    const missingFields: RequiredFieldResult['missingFields'] = [];
    for (const field of fields) {
        // Resolve runtime visibility override (if any)
        const isVisible = fieldMeta?.[field.matchcode]?.visible ?? field.visible ?? true;

        // Only validate visible + required fields (matches VBS: visible="T" AND required="1")
        if (!field.required || !isVisible) continue;
// TODO ⟪missing line 73 — not captured in photos (fragment content at this position duplicates line 72; true content unconfirmed)⟫

        const value = values[field.matchcode];

        const isFilled = isFieldFilled(value, field.controlType);

        if (!isFilled) {
            missingFields.push({ matchcode: field.matchcode, label: field.label });
        }
    }

    // ─ Debug: log required-field validation results ─────────
    const requiredFields = fields.filter((f) => {
        const vis = fieldMeta?.[f.matchcode]?.visible ?? f.visible ?? true;
        return f.required && vis;
    });
    console.group('%c[Required-Field Validation]', 'color: #1976d2; font-weight: bold');
    console.log(
        'Required fields found:',
        requiredFields.map((f) => f.matchcode),
    );
    if (missingFields.length > 0) {
        console.warn(
            'Missing (not yet filled):',
            missingFields.map((f) => `${f.matchcode} (${f.label})`),
        );
    } else {
        console.log('%cAll required fields are filled ✓', 'color: green');
    }
    console.groupEnd();
    // ─ End debug ─────────────────────────────

    return {
        allRequiredFilled: missingFields.length === 0,
        missingFields,
    };
}

// ---------------------------------------------------------------
// Button-state derivation
// ---------------------------------------------------------------

/**
 * Compute a map of button disabled states driven by required-field validation.
 *
 * Mirrors the VBS logic in `CheckRequiredIndicators`:
 *   - If `allRequiredFilled` → enable OK and NEXT
 *   - Otherwise            → disable OK and NEXT
 *   - CANCEL is never auto-disabled by required-field logic.
 *
 * The map is keyed by the button matchcode in UPPER CASE (OK, NEXT, CANCEL, …).
 * Only buttons whose disabled state is *affected* by required-field validation
 * appear in the result. Additional buttons remain untouched.
 *
 * @param validationResult  Output of `checkRequiredFields`
 * @param buttonMatchcodes  Array of button matchcodes present on the page
 *                          (e.g. ["OK", "CANCEL", "NEXT"])
 * @param buttonsAffected   Which buttons should be toggled by required validation.
 *
 *                          Defaults to `['OK', 'NEXT', 'OKSPECIAL']` — mirroring the VBS behaviour. (VBS: Case "DTAOK", "DTANEXT", "DTAOKSPECIAL")
 */
export function computeButtonDisableMap(
    validationResult: RequiredFieldResult,
    buttonMatchcodes: string[],
    buttonsAffected: string[] = ['OK', 'NEXT', 'OKSPECIAL'],
): ButtonDisableMap {
    const map: ButtonDisableMap = {};
    const affectedSet = new Set(buttonsAffected.map((b) => b.toUpperCase()));

    for (const mc of buttonMatchcodes) {
        const upper = mc.toUpperCase();
        if (affectedSet.has(upper)) {
            map[upper] = { disabled: !validationResult.allRequiredFilled };
        }
    }

    return map;
}

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------

/**
 * Determine whether a single field value counts as "filled".
 *
 * Mirrors the VBS per-tag-type checks inside `CheckSpecifiedIndicator`:
 *   - INPUT / TEXTAREA / COMBO / RADIOBUTTON  →  `Len(Trim(value)) > 0`
 *   - SELECT (dropdown)                       →  `selectedIndex <> -1`  (i.e. non-empty string)
 *   - CHECKBOX                                →  `true` counts as filled
 *   - DATE / CALENDAR                         →  valid non-empty date string
 */
function isFieldFilled(value: string | boolean | undefined | null, controlType?: string): boolean {
    if (value === undefined || value === null) return false;

    // Checkbox: boolean true is "filled"
    if (controlType === 'checkbox') {
        return value === true;
    }

    // Everything else: non-empty trimmed string
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }

    // Boolean true for non-checkbox controls still counts
    if (typeof value === 'boolean') {
        return value;
    }

    return false;
}
