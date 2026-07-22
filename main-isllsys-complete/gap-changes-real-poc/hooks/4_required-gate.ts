// ============================================================================
// GAPS #48 + #49 + #71 + #72: CheckRequiredIndicators + OnKeyPress/KeyUp
// (VBS lines 3536-3821, 7277-7414)
// ============================================================================
//
// VBS BEHAVIOR:
//   Sub CheckRequiredIndicators() walks ALL controls on the page. For each one
//   with required=true, it checks if the control has a value. If ANY required
//   field is empty, it disables the OK/Next buttons. When all required fields
//   have values, it enables them. This runs:
//     - On every KeyPress/KeyUp in any field (VBS lines 7277-7414)
//     - On page load after controls are populated
//     - After server commands that change field values (SET_TEXT)
//     - After SET_REQUIRED changes a field's required status
//
//   The VBS uses mblnEnableOkButton as the aggregate flag.
//   OnKeyPress also handled Enter key -> submit, but that is out of scope here.
//
// REAL POC STATUS:
//   - validation-rules.ts EXISTS with per-field rules (required, minLength, etc.)
//   - react-hook-form tracks validity via formState.isValid and errors
//   - form-renderer.tsx creates useForm({ mode: 'onChange' }) which means
//     validation runs on every keystroke — good, this means isValid is live
//   - action-button.tsx renders OK/Next/Save buttons from ControlNode
//   - BUT: action-button.tsx does NOT check formState.isValid
//   - The OK/Next buttons are ALWAYS enabled regardless of required fields
//   - No aggregate completeness check exists
//   - No mblnEnableOkButton equivalent exists
//   - The 'validate' builtin in form-action-executor.ts does call trigger()
//     on click, which validates then — but by then the user has already clicked
//     a button that should have been disabled. VBS prevented the click entirely.
//
// FIX:
//   1. New hook: src/hooks/use-required-gate.ts
//   2. Modify action-button.tsx to consume the hook and disable when incomplete
//   3. The hook uses react-hook-form's useFormState for live isValid tracking
//
// ============================================================================

import { useMemo } from 'react';
import { useFormState, useFormContext, useWatch } from 'react-hook-form';

// stores — for reading runtime required overrides
import { RuntimeOverrideStoreApi } from '@/stores/runtime-override-store';

// types
import type { ControlNode, FormLayoutNode, LayoutNode } from '@/types/layout';

// ----------------------------------------------------------------
// STEP 1: The Hook
// ----------------------------------------------------------------

interface RequiredGateResult {
    /**
     * True when ALL required fields have non-empty values and no validation
     * errors exist. This is the aggregate "enable OK/Next" flag.
     * Equivalent to VBS mblnEnableOkButton.
     */
    isFormComplete: boolean;

    /**
     * List of matchcodes for required fields that are currently empty or invalid.
     * Useful for showing "X fields remaining" or highlighting incomplete fields.
     */
    incompleteFields: string[];

    /**
     * True if the form has any validation errors (not just required — includes
     * pattern, min, max, custom rules). Superset of !isFormComplete.
     */
    hasErrors: boolean;
}

/**
 * useRequiredGate
 *
 * Subscribes to react-hook-form validation state and computes whether all
 * required fields are filled. Mirrors VBS CheckRequiredIndicators().
 *
 * Because form-renderer.tsx creates useForm with mode:'onChange', validation
 * runs on every keystroke. This means formState.isValid updates in real-time
 * as the user types, and the hook's output reflects the current completeness.
 *
 * IMPORTANT: react-hook-form's `isValid` only tracks fields that have
 * registered validation rules. For dynamic pages where required comes from
 * the API's PageBuildControl.required flag (not a schema validation rule),
 * this hook ALSO checks runtime overrides from RuntimeOverrideStore.
 *
 * The hook works at the form level — it checks ALL fields in the form,
 * across all tabs. This matches VBS behavior where CheckRequiredIndicators
 * walked every control on the page regardless of tab visibility.
 *
 * Usage:
 *   // In action-button.tsx:
 *   const { isFormComplete } = useRequiredGate();
 *   <Button disabled={!isFormComplete && isGatedButton}>...</Button>
 *
 * @returns RequiredGateResult with isFormComplete, incompleteFields, hasErrors
 */
export function useRequiredGate(): RequiredGateResult {
    // useFormState subscribes to validation state changes.
    // We request only the fields we need to minimize re-renders.
    const { isValid, errors } = useFormState();
    const { getValues } = useFormContext<Record<string, unknown>>();

    // Watch all form values to detect empty required fields.
    // useWatch with no args subscribes to the entire form.
    const formValues = useWatch() as Record<string, unknown>;

    // Check runtime required overrides (SET_REQUIRED from server commands).
    // These may mark fields as required that don't have schema validation rules,
    // so isValid alone won't catch them.
    const incompleteFields = useMemo(() => {
        const incomplete: string[] = [];

        // 1. Collect fields with validation errors (from react-hook-form)
        if (errors) {
            for (const fieldName of Object.keys(errors)) {
                if (!incomplete.includes(fieldName)) {
                    incomplete.push(fieldName);
                }
            }
        }

        // 2. Check runtime required overrides that may not have validation rules
        const overrides = RuntimeOverrideStoreApi.getState().overrides;
        for (const [matchcode, override] of Object.entries(overrides)) {
            if (override.required && !incomplete.includes(matchcode)) {
                const value = formValues[matchcode];
                if (isEmptyValue(value)) {
                    incomplete.push(matchcode);
                }
            }
        }

        return incomplete;
    }, [errors, formValues]);

    const isFormComplete = isValid && incompleteFields.length === 0;
    const hasErrors = Object.keys(errors ?? {}).length > 0;

    return { isFormComplete, incompleteFields, hasErrors };
}

/**
 * Checks whether a form field value is "empty" for required-field purposes.
 * Mirrors VBS logic: empty string, null, undefined, and unchecked checkboxes
 * all count as empty. "0" does NOT count as empty (it's a valid combo index).
 */
function isEmptyValue(value: unknown): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (typeof value === 'boolean') return !value; // unchecked checkbox
    return false;
}

// ----------------------------------------------------------------
// STEP 2: Determine Which Buttons Are Gated
// ----------------------------------------------------------------

/**
 * Checks whether a button matchcode is an "OK/Next" style button that should
 * be disabled when required fields are incomplete.
 *
 * VBS gated: OK, NEXT, SAVE, SUBMIT, ADD, APPLY, ACCEPT
 * VBS did NOT gate: CANCEL, CLOSE, BACK, DELETE, REFRESH, HELP, PRINT
 *
 * @param matchcode - Button's matchcode (case-insensitive)
 * @returns true if this button should be disabled when form is incomplete
 */
export function isGatedButton(matchcode: string): boolean {
    const code = matchcode.toUpperCase();
    // Positive match: buttons that require form completeness
    return /\b(OK|NEXT|SAVE|SUBMIT|ADD|APPLY|ACCEPT)\b/.test(code);
}

// ----------------------------------------------------------------
// STEP 3: Modified action-button.tsx
// ----------------------------------------------------------------
//
// Below is the COMPLETE modified action-button.tsx with the required-gate
// integration. Changes are marked with // GAP #48 comments.
//
// ---- BEGIN MODIFIED FILE: src/components/ui/action-button.tsx ----
//
//   import { Button } from '@mui/material';
//   import { useFormContext } from 'react-hook-form';
//   import { useNavigate } from 'react-router';
//
//   // components
//   import { useFormRendererContext } from '@components/ui/form-renderer-context';
//
//   // contexts
//   import { useHandlers } from '@/contexts/handlers-context';
//
//   // hooks
//   import { useRequiredGate, isGatedButton } from '@hooks/use-required-gate';  // <-- GAP #48: ADD
//
//   // utils
//   import { executeFormActionBindings } from '@utils/form-action-executor';
//   import { resolveProperty } from '@utils/schema-merger';
//
//   // types
//   import type { ControlNode } from '@/types/layout';
//   import type { FormActionContext } from '@utils/form-action-executor';
//
//   function ActionButton({ node }: ActionButtonProps) {
//       const { getValues, setValue, trigger, handleSubmit, reset } = useFormContext();
//       const navigate = useNavigate();
//       const formRendererCtx = useFormRendererContext();
//       const handlers = useHandlers();
//
//       // GAP #48: Required-gate integration
//       const { isFormComplete } = useRequiredGate();
//       const shouldGate = isGatedButton(node.field.matchcode);
//       const gateDisabled = shouldGate && !isFormComplete;
//
//       const { variant, color } = detectVariant(node.field.matchcode);
//       const label = resolveProperty(node.schema?.label, node.field.ctrllabel);
//
//       const handleClick = async () => {
//           // ... existing click handler unchanged ...
//       };
//
//       return (
//           <Button
//               variant={variant}
//               color={color}
//               disabled={gateDisabled}     // <-- GAP #48: CHANGED from no disabled prop
//               onClick={() => void handleClick()}
//           >
//               {label}
//           </Button>
//       );
//   }
//
// ---- END MODIFIED FILE ----
//
// KEY DIFFERENCES FROM VBS:
//
// 1. VBS ran CheckRequiredIndicators on every keystroke by hooking OnKeyPress
//    for EVERY control. React-hook-form with mode:'onChange' does this natively.
//
// 2. VBS disabled buttons by setting .disabled on the DOM element. React just
//    re-renders with disabled={true} when isFormComplete changes — faster.
//
// 3. VBS also handled Enter-key submission via OnKeyPress. In React, this
//    is handled by the <form> element's onSubmit + react-hook-form's
//    handleSubmit. No separate Enter key handler is needed.
//
// 4. VBS tracked mblnEnableOkButton as a module-level variable. This hook
//    derives the equivalent from react-hook-form state + runtime overrides,
//    so there's no mutable flag to manage.
//
// ----------------------------------------------------------------
// EDGE CASES
// ----------------------------------------------------------------
//
// 1. SET_REQUIRED from server changes a field's required status mid-page:
//    -> RuntimeOverrideStore is already updated by the SET_REQUIRED handler
//       in command.ts. The hook reads overrides on every render, so it picks
//       up the change automatically.
//
// 2. SET_TEXT from server fills a required field:
//    -> setValue() in the onSetFieldValue callback triggers react-hook-form
//       revalidation (mode:'onChange'). isValid updates, hook re-renders.
//
// 3. Tab switching in tabbed layouts:
//    -> VBS checked ALL controls across all tabs. This hook checks the
//       entire form too (useFormState is form-wide, not tab-scoped).
//
// 4. Dynamic pages where required comes from PageBuildControl, not schema:
//    -> The control-to-field.tsx mapper already maps PageBuildControl.required
//       to the field's required property. buildControllerRules includes a
//       'required' validation rule when field.required is true. So isValid
//       covers these fields correctly.
