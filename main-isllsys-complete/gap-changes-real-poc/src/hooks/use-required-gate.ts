/**
 * GAPS #48+#49 — CheckRequiredIndicators (Main_ISLLSYS_20010101.vbs lines 3536-3821)
 * NEW FILE: src/hooks/use-required-gate.ts
 * Purpose: gate OK/NEXT/SAVE/SUBMIT navigation on required-field completion,
 * combining react-hook-form validation state with server-driven SET_REQUIRED
 * runtime overrides.
 */
import { useMemo } from 'react';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';

// stores
import { RuntimeOverrideStoreApi } from '@stores/runtime-override-store';

// ----------------------------------------------

/**
 * Nav buttons whose click is gated on required completion.
 * Legacy: CheckRequiredIndicators only ran for the OK/NEXT/SAVE/SUBMIT
 * matchcodes (subset of DEFAULT_ACTION_BUTTONS in @constants/common).
 */
const GATED_BUTTON_MATCHCODES = ['OK', 'NEXT', 'SAVE', 'SUBMIT'];

/** True when a nav button's click must pass the required gate first. */
export function isGatedButton(matchcode: string): boolean {
    return GATED_BUTTON_MATCHCODES.includes(matchcode.toUpperCase());
}

/**
 * Empty check mirroring the legacy indicator test (trimmed lValue = "").
 * Booleans are never "empty" — a checkbox always carries a value.
 */
function isValueEmpty(value: unknown): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'boolean') return false;
    return String(value).trim() === '';
}

export interface RequiredGateResult {
    /** All required fields are filled — the gated button may proceed */
    isFormComplete: boolean;
    /** Matchcodes currently failing a required rule */
    incompleteFields: string[];
    /** Any react-hook-form validation error is present (required or not) */
    hasErrors: boolean;
}

/**
 * Computes the required-field gate for the current form.
 *
 * Legacy equivalent: CheckRequiredIndicators walked every control with a
 * required indicator (*) and blocked OK/NEXT/SAVE/SUBMIT until all were
 * filled, building the list of incomplete field names for the alert.
 *
 * React equivalent: schema-authored required rules surface as RHF errors
 * (buildControllerRules); server-driven SET_REQUIRED lands in
 * runtime-override-store and may not be re-registered with RHF yet, so
 * overrides are checked against the live values directly. An override of
 * required=false un-gates a field even if RHF still flags it.
 *
 * Must be used inside FormProvider (same constraint as use-derived-fields).
 */
export function useRequiredGate(): RequiredGateResult {
    const { control } = useFormContext<Record<string, unknown>>();
    const { isValid, errors } = useFormState({ control });

    // rerender: value changes must re-run the override checks below
    const values = useWatch({ control }) as Record<string, unknown>;

    // SET_REQUIRED runtime overrides (server-driven) — reactive subscription
    const overrides = RuntimeOverrideStoreApi((state) => state.overrides);

    return useMemo(() => {
        const incomplete = new Set<string>();

        // 1. RHF required failures (schema-authored validation rules)
        for (const [matchcode, error] of Object.entries(errors)) {
            if (error?.type === 'required') incomplete.add(matchcode);
        }

        // 2. Server-driven SET_REQUIRED overrides checked against live values
        for (const [matchcode, override] of Object.entries(overrides)) {
            if (override.required === true && isValueEmpty(values[matchcode])) {
                incomplete.add(matchcode);
            } else if (override.required === false) {
                // Server dropped the requirement — un-gate the field
                incomplete.delete(matchcode);
            }
        }

        const incompleteFields = [...incomplete];

        return {
            isFormComplete: incompleteFields.length === 0,
            incompleteFields,
            hasErrors: !isValid,
        };
    }, [errors, isValid, values, overrides]);
}
