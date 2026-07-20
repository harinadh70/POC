import { RuntimeOverrideStoreApi } from '@/stores/runtime-override-store';

// VBS: Main_ISLLSYS #48 CheckRequiredIndicators (lines 3536-3638)
//    + #49 CheckSpecifiedIndicator (lines 3641-3821)
// Aggregate required-field gate: if any visible+enabled required field is
// empty, the OK/NEXT buttons are disabled; when all pass they re-enable.

interface GateField {
    matchcode: string;
    required?: boolean;
}

interface RuntimeFieldOverride {
    disabled?: boolean;
    visible?: boolean;
    readOnly?: boolean;
    required?: boolean;
}

export interface GateResult {
    pass: boolean;
    /** Matchcodes of required fields still empty (legacy returned labels). */
    missing: string[];
}

const GATE_BUTTONS = ['dtaOK', 'dtaNEXT'];

/**
 * Evaluate the gate. Runtime overrides win over schema:
 *  - override.required (when set) replaces schema required
 *  - fields hidden or disabled by override are skipped (legacy skipped them)
 */
export function evaluateRequiredGate(
    fields: GateField[],
    values: Record<string, string>,
    overrides?: Record<string, RuntimeFieldOverride>,
): GateResult {
    const ov = overrides ?? RuntimeOverrideStoreApi.getState()?.overrides ?? {};
    const missing: string[] = [];

    for (const f of fields) {
        const o = ov[f.matchcode] ?? {};
        if (o.visible === false || o.disabled === true) continue;

        const required = o.required !== undefined ? o.required : f.required === true;
        if (!required) continue;

        const value = (values[f.matchcode] ?? '').trim();
        if (value.length === 0) missing.push(f.matchcode);
    }

    return { pass: missing.length === 0, missing };
}

/**
 * Apply the result to the OK/NEXT buttons via runtime overrides.
 * Only touches `disabled` — never `visible` — so it composes with the
 * ShowNextOnEdit rules (aqs-web-ui-impl page-init-rules.ts).
 */
export function applyRequiredGate(result: GateResult): void {
    const actions = RuntimeOverrideStoreApi.getState()?.actions;
    if (!actions) return;

    for (const button of GATE_BUTTONS) {
        actions.setOverride(button, { disabled: !result.pass });
    }
}

/** Convenience: evaluate + apply in one call. */
export function runRequiredGate(
    fields: GateField[],
    values: Record<string, string>,
): GateResult {
    const result = evaluateRequiredGate(fields, values);
    applyRequiredGate(result);
    return result;
}

export default runRequiredGate;
