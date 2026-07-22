// ============================================================================
// GAPS #71 + #72: OnKeyPressHandler + OnKeyUpHandler (VBS lines 7277-7414)
// ============================================================================
//
// VBS FLOW:
//
//   #71 OnKeyPressHandler (lines 7277-7345):
//     - Fired on every keystroke in any text field
//     - Primary purpose: detect when a required field transitions from
//       empty to non-empty (or vice versa) and recompute the required
//       gate accordingly
//     - VBS checked: If the field is required AND visible AND enabled:
//       - If the field WAS empty and now has a character → it transitioned
//         from empty to non-empty → recompute required gate (might enable
//         OK/NEXT buttons)
//       - If the field WAS non-empty and is now empty (last char deleted) →
//         it transitioned from non-empty to empty → recompute required gate
//         (might disable OK/NEXT buttons)
//     - Also handled: Tab key (force commit), Escape key (revert to initial)
//     - The recompute was OPTIMIZED: only runs when a transition happens,
//       NOT on every keystroke (would be too slow for the legacy COM controls)
//
//   #72 OnKeyUpHandler (lines 7348-7414):
//     - Fired on keyup for every text field
//     - Secondary check: catches cases where keypress didn't fire
//       (e.g., paste via Ctrl+V, or browser autofill)
//     - Same transition detection logic as #71
//     - Also updated the "dirty" indicator if field value changed from initial
//
// REAL POC ALREADY HAS:
//   - react-hook-form tracks field validity per-field via buildControllerRules
//   - FieldRenderer v2 (src/components/ui/field-renderer.tsx) has:
//     - onChangeWithBindings: executes schema onChange bindings, then calls
//       rhfField.onChange(value)
//     - onBlurWithValue: builds FieldCommitState, executes EE bindings
//   - runtime-override-store: setOverride(matchcode, { disabled }) can
//     disable/enable buttons
//   - evaluateRequiredGate + applyRequiredGate (from the changes/ directory,
//     gap-changes-real-poc/required-gate.ts): evaluate all required fields
//     and set disabled on OK/NEXT buttons
//   - NO integration between onChange and the required gate — the gate is
//     only evaluated on page init, not on every keystroke
//
// WHAT THIS CODE ADDS:
//   - Keystroke-driven required gate recompute on value change
//   - Transition detection: only recomputes when empty/non-empty flips
//   - Code changes to field-renderer.tsx's onChangeWithBindings handler
//   - Efficient: tracks previous empty state per field to avoid unnecessary
//     gate evaluations on every keystroke
//
// WHERE TO MODIFY: src/components/ui/field-renderer.tsx (handleChange flow)
// NOTE: In React, #71 and #72 collapse into a single onChange handler.
//       React's synthetic onChange fires on every value change, including
//       paste and autofill — so we don't need separate keypress/keyup handlers.
// ============================================================================

// ---------------------------------------------------------------------------
// Import: required gate utilities
// These are from the changes/ directory (see required-gate.ts which provides
// evaluateRequiredGate, applyRequiredGate, and runRequiredGate).
// In the final integration, these live at src/utils/required-gate.ts.
// ---------------------------------------------------------------------------
import { runRequiredGate } from '@/utils/required-gate';
import type { GateResult } from '@/utils/required-gate';
import { RuntimeOverrideStoreApi } from '@/stores/runtime-override-store';


// ============================================================================
// Transition Tracker
// ============================================================================
//
// VBS optimization: The required gate recompute is expensive (iterates all
// required fields). VBS only ran it when a field TRANSITIONED between empty
// and non-empty (or vice versa). We replicate this optimization.
//
// In React, we use a module-level Map to track the previous "empty" state
// of each field. This avoids putting it in component state (which would
// trigger re-renders) and avoids putting it in a store (which would be
// overkill for this ephemeral tracking data).
// ============================================================================

/**
 * Tracks the previous "is empty" state of each field by matchcode.
 * Used to detect empty→non-empty and non-empty→empty transitions.
 * Cleared on page navigation (see clearTransitionTracker below).
 */
const fieldEmptyState = new Map<string, boolean>();

/**
 * Check if a field value is "empty" for required gate purposes.
 *
 * VBS: Checked .Text.Length = 0 for text fields, .Value for checkboxes.
 * Real POC: We check for empty string after trim, plus handle booleans
 * for checkboxes (false = empty, true = filled).
 */
function isFieldEmpty(value: unknown): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'boolean') return !value;
    if (typeof value === 'string') return value.trim().length === 0;
    if (typeof value === 'number') return false; // any number is "filled"
    return true;
}

/**
 * Detect if a field's empty/non-empty state has transitioned.
 *
 * @param matchcode  The field's matchcode
 * @param newValue   The new value after the keystroke
 * @returns          true if the field transitioned (empty→filled or filled→empty)
 */
function hasEmptyStateTransitioned(matchcode: string, newValue: unknown): boolean {
    const wasEmpty = fieldEmptyState.get(matchcode);
    const isEmpty = isFieldEmpty(newValue);

    // First time seeing this field — record state but don't trigger
    if (wasEmpty === undefined) {
        fieldEmptyState.set(matchcode, isEmpty);
        return false;
    }

    // No transition — state is the same
    if (wasEmpty === isEmpty) return false;

    // Transition detected: empty→filled or filled→empty
    fieldEmptyState.set(matchcode, isEmpty);
    return true;
}

/**
 * Clear the transition tracker. Call on page navigation so stale field
 * states from the previous page don't interfere.
 *
 * Wire into the navigation lifecycle:
 *   - In usePageInit: call clearTransitionTracker() during cleanup
 *   - Or in the route's loader: call before loading new page data
 */
export function clearTransitionTracker(): void {
    fieldEmptyState.clear();
}

/**
 * Initialize the transition tracker for a set of fields.
 * Call after form defaults are loaded so the tracker knows the initial
 * empty/non-empty state of every field.
 *
 * @param values  Record of matchcode → field value (from react-hook-form getValues)
 */
export function initTransitionTracker(values: Record<string, unknown>): void {
    fieldEmptyState.clear();
    for (const [matchcode, value] of Object.entries(values)) {
        fieldEmptyState.set(matchcode, isFieldEmpty(value));
    }
}


// ============================================================================
// Required gate integration function
// ============================================================================

/**
 * Trigger a required gate recompute if the field's empty state transitioned.
 *
 * This is the key function that bridges the keystroke handler and the
 * required gate. It checks for a transition, and if one occurred,
 * runs the full gate evaluation to update OK/NEXT button state.
 *
 * @param matchcode  The field that changed
 * @param newValue   The field's new value
 * @param allFields  All fields on the page (for gate evaluation)
 * @param getValues  react-hook-form's getValues (to read all current values)
 * @returns          The gate result if evaluated, or null if no transition
 */
export function triggerRequiredGateOnChange(
    matchcode: string,
    newValue: unknown,
    allFields: Array<{ matchcode: string; required?: boolean }>,
    getValues: () => Record<string, string>,
): GateResult | null {
    // Only recompute if the empty state transitioned
    if (!hasEmptyStateTransitioned(matchcode, newValue)) {
        return null;
    }

    // Get current values for ALL fields (not just this one)
    // The gate needs to check all required fields, not just the one that changed
    const currentValues = getValues();

    // Update the changed field's value in the values map
    // (react-hook-form's getValues may not reflect the very latest onChange yet)
    currentValues[matchcode] = String(newValue ?? '');

    // Run the full gate evaluation + apply to OK/NEXT buttons
    return runRequiredGate(allFields, currentValues);
}


// ============================================================================
// CODE CHANGES: field-renderer.tsx onChangeWithBindings
// ============================================================================
//
// LOCATION: src/components/ui/field-renderer.tsx
//
// The FieldRenderer v2 currently has an onChangeWithBindings callback that
// executes schema onChange bindings and then calls rhfField.onChange(value).
// We add the required gate transition check AFTER the value is updated.
//
// ---------------------------------------------------------------------------
// BEFORE (current code in field-renderer.tsx):
// ---------------------------------------------------------------------------
//
//   const onChangeWithBindings = useCallback(
//       (value: string | boolean, rhfOnChange: (...event: any[]) => void) => {
//           // Execute schema onChange bindings (if any)
//           if (controlNode.field.schemaEvents?.onChange) {
//               const bindings = controlNode.field.schemaEvents.onChange;
//               void executeFormActionBindings(bindings, formActionContext);
//           }
//           // Update react-hook-form field value
//           rhfOnChange(value);
//       },
//       [controlNode, formActionContext],
//   );
//
// ---------------------------------------------------------------------------
// AFTER (with required gate integration):
// ---------------------------------------------------------------------------
//
//   import { triggerRequiredGateOnChange } from '@/utils/keystroke-indicators';
//   // At the component level, get allFields from form context:
//   const { schema } = useFormRendererContext();
//   const { getValues } = useFormContext(); // react-hook-form
//
//   const onChangeWithBindings = useCallback(
//       (value: string | boolean, rhfOnChange: (...event: any[]) => void) => {
//           // Execute schema onChange bindings (if any)
//           if (controlNode.field.schemaEvents?.onChange) {
//               const bindings = controlNode.field.schemaEvents.onChange;
//               void executeFormActionBindings(bindings, formActionContext);
//           }
//
//           // Update react-hook-form field value
//           rhfOnChange(value);
//
//           // --- NEW: Required gate recompute on empty/non-empty transition ---
//           // VBS #71/#72: On keystroke, if a required field transitions from
//           // empty to non-empty (or vice versa), recompute whether OK/NEXT
//           // buttons should be enabled or disabled.
//           //
//           // This replaces both OnKeyPressHandler and OnKeyUpHandler from VBS.
//           // React's onChange fires on every value change including paste and
//           // autofill, so we don't need separate keypress/keyup handlers.
//           //
//           // Performance: triggerRequiredGateOnChange only runs the full gate
//           // evaluation when a transition is detected (empty→filled or
//           // filled→empty). On normal keystrokes within a non-empty field,
//           // it returns null immediately (O(1) Map lookup).
//           const isRequired =
//               runtimeOverride?.required ?? controlNode.field.required;
//           if (isRequired) {
//               triggerRequiredGateOnChange(
//                   controlNode.matchcode,
//                   value,
//                   allFormFields,   // from schema — all fields with their required flag
//                   getValues,       // react-hook-form getValues
//               );
//           }
//           // --- END NEW ---
//       },
//       [controlNode, formActionContext, runtimeOverride, allFormFields, getValues],
//   );
//
// ---------------------------------------------------------------------------
// ADDITIONAL CHANGES NEEDED:
// ---------------------------------------------------------------------------
//
// 1. In form-renderer.tsx — collect allFormFields for the gate:
//
//   // In FormRenderer or DerivedFieldsProvider, build the allFormFields list
//   // from the layout tree's control nodes:
//   const allFormFields = useMemo(() => {
//       const fields: Array<{ matchcode: string; required?: boolean }> = [];
//       function walk(node: LayoutNode) {
//           if (node.type === 'control' && node.field) {
//               fields.push({
//                   matchcode: node.matchcode,
//                   required: node.field.required,
//               });
//           }
//           node.children?.forEach(walk);
//       }
//       walk(layoutNode);
//       return fields;
//   }, [layoutNode]);
//
//   // Pass allFormFields via context or props to FieldRenderer
//
// 2. In usePageInit or the page loader — initialize the tracker:
//
//   import { initTransitionTracker, clearTransitionTracker } from '@/utils/keystroke-indicators';
//
//   useEffect(() => {
//       // After form defaults are loaded, initialize the tracker
//       const values = getValues();
//       initTransitionTracker(values);
//
//       // Also run the initial gate evaluation
//       runRequiredGate(allFormFields, values);
//
//       return () => {
//           // Cleanup on page navigation
//           clearTransitionTracker();
//       };
//   }, [allFormFields]);
//
// 3. In route navigation — clear the tracker:
//
//   // In data-strategy.ts or the navigation handler:
//   import { clearTransitionTracker } from '@/utils/keystroke-indicators';
//
//   // Before navigating to a new page:
//   clearTransitionTracker();
//
// ============================================================================


// ============================================================================
// DESIGN NOTES
// ============================================================================
//
// WHY A MODULE-LEVEL MAP INSTEAD OF STATE/STORE:
//
// The transition tracker uses a module-level Map (fieldEmptyState) instead
// of React state or Zustand store for these reasons:
//
// 1. Performance: Module-level Map access is O(1) with zero React overhead.
//    No re-renders triggered by tracking changes. This matters because the
//    check runs on EVERY keystroke in EVERY text field.
//
// 2. No render dependency: The tracker only needs to know "was this field
//    empty before?" — it doesn't need to trigger any UI update itself.
//    The UI update comes from the required gate (which updates the
//    runtime-override-store, which does trigger re-renders for the
//    OK/NEXT buttons).
//
// 3. Lifecycle alignment: The Map is cleared on page navigation
//    (clearTransitionTracker) and initialized when form defaults load
//    (initTransitionTracker), which exactly matches the page lifecycle.
//
// WHY NOT USE REACT-HOOK-FORM VALIDATION ALONE:
//
// react-hook-form's validation (via buildControllerRules) validates each
// field independently and shows per-field error messages. But the VBS
// required gate is an AGGREGATE gate: ALL required fields must be filled
// for the OK/NEXT buttons to be enabled. react-hook-form doesn't have a
// built-in "disable a button unless all required fields are filled" feature
// that works efficiently on every keystroke.
//
// The formState.isValid property exists, but:
//   - It requires mode: 'all' or 'onChange' validation mode
//   - It re-validates ALL fields on every change (not just the one that changed)
//   - It doesn't integrate with the runtime-override-store for button state
//
// Our approach: only run the full gate evaluation when a transition is
// detected, which is much cheaper than re-validating all fields on every
// keystroke.
//
// ============================================================================

export default triggerRequiredGateOnChange;
