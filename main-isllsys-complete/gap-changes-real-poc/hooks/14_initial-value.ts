// ============================================================================
// GAPS #77 + #55: SetInitialValueData + SelectControlFocus baseline
// (VBS lines 7886-7981, 5350-5418)
// ============================================================================
//
// VBS BEHAVIOR:
//
//   Sub SetInitialValueData(controlObj):
//     Captures the "pristine" value of a control at focus-in time. Stored in
//     marrEEData(9) = initialLValue and marrEEData(10) = initialXValue.
//     When the field is later blurred and an EE server call fires, the server
//     compares initialLValue/initialXValue against the current values to
//     determine if the field actually changed.
//
//   This is DIFFERENT from the page-level dirty detection (mblnDataChanged).
//   The per-field initial values are for the SERVER's change detection, while
//   mblnDataChanged is for the CLIENT's navigation guard.
//
//   Sub SelectControlFocus (lines 5350-5418):
//     On page load, after all controls are populated, captures the initial
//     value of every control into a parallel data structure. This serves as
//     the "pristine snapshot" — the baseline against which changes are measured.
//     VBS used marrInitialValues() array indexed by control position.
//
//   The flow:
//     1. Page loads -> all fields populated with server data
//     2. SelectControlFocus walks ALL controls, captures their values
//     3. User edits a field -> value differs from pristine -> dataChanged = true
//     4. User undoes edit (restores original value) -> matches pristine -> dataChanged = false
//     5. On blur, EE call includes initialLValue/initialXValue from focus-time capture
//
// REAL POC STATUS:
//   - EEData type HAS initialLValue and initialXValue (common.ts lines 155-156)
//   - handlerForInitialValue() EXISTS in payload.ts (lines 169-210) — captures
//     per-field initial values at focus-in time for EEData[9],[10]
//   - BUT: No page-level pristine snapshot mechanism exists
//   - dataChanged flag in global-vars-store is set by SET_VARIABLE command from
//     the server, but is NOT derived from actual value comparison
//   - If the user edits a field then undoes the edit, dataChanged stays true
//     (VBS would have detected the field matches pristine and cleared the flag)
//   - form-renderer.tsx creates useForm({ defaultValues }) which react-hook-form
//     uses as its OWN pristine baseline for formState.isDirty — but this is
//     react-hook-form's concept, not the VBS concept. RHF's isDirty is not
//     connected to global-vars-store.dataChanged.
//   - No SET_INITIALVALUE command verb handler exists in command.ts
//
// FIX:
//   1. New hook: src/hooks/use-pristine-snapshot.ts
//   2. Wire into form-renderer.tsx to capture snapshot on mount
//   3. Wire into field-renderer.tsx to compare on blur
//   4. Add SET_INITIALVALUE command verb to command.ts
//   5. Connect to global-vars-store.dataChanged for smart dirty derivation
//
// ============================================================================

import { useEffect, useRef, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

// stores
import { GlobalVarsStoreApi } from '@/stores/global-vars-store';

// utils
import { toSafeString } from '@/utils/to-safe-string';

// ----------------------------------------------------------------
// STEP 1: The Hook
// ----------------------------------------------------------------

interface PristineSnapshotResult {
    /**
     * Check whether a specific field's current value differs from its
     * pristine (page-load) value.
     *
     * @param matchcode - The field's matchcode
     * @param currentValue - The field's current value (from react-hook-form)
     * @returns true if the current value differs from the pristine snapshot
     */
    isDirty: (matchcode: string, currentValue: unknown) => boolean;

    /**
     * Check whether ANY field in the form has changed from its pristine value.
     * This is the aggregate dirty check — equivalent to walking all controls
     * and comparing each one, which is what VBS SelectControlFocus did.
     *
     * @returns true if any field has been modified from its page-load value
     */
    isFormDirty: () => boolean;

    /**
     * Manually update the pristine snapshot for a specific field.
     * Used when the server sends SET_INITIALVALUE to reset a field's baseline
     * (e.g., after a server-side save that changes the "new pristine" value).
     *
     * @param matchcode - The field's matchcode
     * @param value - The new pristine value
     */
    setPristineValue: (matchcode: string, value: unknown) => void;

    /**
     * Re-capture the entire form as pristine (reset baseline).
     * Called after a successful save or when the server confirms all changes
     * are committed. Equivalent to re-running SelectControlFocus.
     */
    recaptureSnapshot: () => void;
}

/**
 * usePristineSnapshot
 *
 * Captures a snapshot of all form values at mount time and provides methods
 * to compare current values against the snapshot. Mirrors VBS SelectControlFocus
 * (page-level pristine capture) and integrates with global-vars-store.dataChanged
 * for smart dirty derivation.
 *
 * KEY DESIGN DECISIONS:
 *
 * 1. Uses a ref (not state) to store the snapshot. The snapshot is read-only
 *    reference data — it never changes during normal form interaction, and
 *    components don't need to re-render when it's captured.
 *
 * 2. Compares values as strings (via toSafeString) to match VBS behavior.
 *    VBS compared .text properties, which are always strings. This avoids
 *    issues with type coercion (e.g., 0 vs "0", true vs "YES").
 *
 * 3. Does NOT replace react-hook-form's own isDirty. RHF's isDirty is based
 *    on defaultValues and is used for form validation. This hook's isDirty
 *    is based on the page-load snapshot and drives global-vars-store.dataChanged.
 *    They serve different purposes and can coexist.
 *
 * Usage:
 *   // In form-renderer.tsx:
 *   function FormRenderer({ layoutNode, defaultValues, ... }) {
 *       const formMethods = useForm({ defaultValues, mode: 'onChange' });
 *       return (
 *           <FormProvider {...formMethods}>
 *               <PristineSnapshotProvider>
 *                   {/* ... existing layout rendering ... *\/}
 *               </PristineSnapshotProvider>
 *           </FormProvider>
 *       );
 *   }
 *
 *   // In field-renderer.tsx (onBlur):
 *   const { isDirty } = usePristineSnapshot();
 *   // ... in onBlurWithValue:
 *   if (isDirty(matchcode, value)) {
 *       GlobalVarsStoreApi.getState().actions.setDataChanged(true);
 *   }
 */
export function usePristineSnapshot(): PristineSnapshotResult {
    const { getValues } = useFormContext<Record<string, unknown>>();

    // The pristine snapshot — captured on mount, stable for the page's lifetime.
    // Using a ref because:
    //   - It's reference data, not render state
    //   - Mutations (setPristineValue, recaptureSnapshot) don't need re-renders
    //   - Avoids stale-closure issues in callbacks
    const snapshotRef = useRef<Record<string, string>>({});
    const capturedRef = useRef(false);

    // ---- Capture snapshot on mount ----
    // useEffect runs after the first render, when defaultValues have been
    // applied to the form by useForm(). This is the equivalent of VBS
    // SelectControlFocus running after all controls are populated.
    useEffect(() => {
        if (capturedRef.current) return; // Already captured (StrictMode double-mount guard)

        const values = getValues();
        const snapshot: Record<string, string> = {};
        for (const [key, value] of Object.entries(values)) {
            snapshot[key] = normalizeForComparison(value);
        }
        snapshotRef.current = snapshot;
        capturedRef.current = true;
    }, [getValues]);

    // ---- Per-field dirty check ----
    const isDirty = useCallback(
        (matchcode: string, currentValue: unknown): boolean => {
            const pristine = snapshotRef.current[matchcode];
            // If the field wasn't in the snapshot (added dynamically), treat as dirty
            if (pristine === undefined) return true;
            const current = normalizeForComparison(currentValue);
            return current !== pristine;
        },
        [],
    );

    // ---- Aggregate dirty check ----
    const isFormDirty = useCallback((): boolean => {
        const currentValues = getValues();
        const snapshot = snapshotRef.current;

        for (const [key, pristineStr] of Object.entries(snapshot)) {
            const currentStr = normalizeForComparison(currentValues[key]);
            if (currentStr !== pristineStr) return true;
        }
        return false;
    }, [getValues]);

    // ---- Manual pristine value update (for SET_INITIALVALUE) ----
    const setPristineValue = useCallback(
        (matchcode: string, value: unknown): void => {
            snapshotRef.current[matchcode] = normalizeForComparison(value);
        },
        [],
    );

    // ---- Full snapshot recapture (after save) ----
    const recaptureSnapshot = useCallback((): void => {
        const values = getValues();
        const snapshot: Record<string, string> = {};
        for (const [key, value] of Object.entries(values)) {
            snapshot[key] = normalizeForComparison(value);
        }
        snapshotRef.current = snapshot;
        // After recapture, form matches pristine again
        GlobalVarsStoreApi.getState().actions.setDataChanged(false);
    }, [getValues]);

    return { isDirty, isFormDirty, setPristineValue, recaptureSnapshot };
}

// ----------------------------------------------------------------
// Helper: Normalize values for comparison
// ----------------------------------------------------------------

/**
 * Normalizes a form value to a string for pristine comparison.
 * VBS compared .text properties (always strings), so we do the same.
 *
 * Handles:
 *   - null/undefined -> ''
 *   - boolean -> 'YES'/'NO' (VBS checkbox convention)
 *   - number -> String(n)
 *   - string -> trimmed (VBS trimmed before comparing)
 */
function normalizeForComparison(value: unknown): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'boolean') return value ? 'YES' : 'NO';
    if (typeof value === 'number') return String(value);
    return toSafeString(value).trim();
}

// ----------------------------------------------------------------
// STEP 2: Context for Sharing Across Components
// ----------------------------------------------------------------
// The pristine snapshot needs to be accessible from both form-renderer.tsx
// (where it's captured) and field-renderer.tsx (where isDirty is called on blur).
// Since usePristineSnapshot uses useFormContext internally, it must be called
// inside a FormProvider. The simplest approach is to call it in each component
// that needs it — they'll share the same form context.
//
// Alternatively, create a React context to share the snapshot methods:
//
//   // src/contexts/pristine-snapshot-context.ts
//
//   import { createContext, useContext } from 'react';
//   import type { PristineSnapshotResult } from '@hooks/use-pristine-snapshot';
//
//   export const PristineSnapshotContext = createContext<PristineSnapshotResult | null>(null);
//
//   export function usePristineSnapshotContext(): PristineSnapshotResult {
//       const ctx = useContext(PristineSnapshotContext);
//       if (!ctx) {
//           throw new Error('usePristineSnapshotContext must be used within PristineSnapshotProvider');
//       }
//       return ctx;
//   }
//
// Then in form-renderer.tsx:
//
//   import { PristineSnapshotContext } from '@/contexts/pristine-snapshot-context';
//   import { usePristineSnapshot } from '@hooks/use-pristine-snapshot';
//
//   function FormRenderer({ layoutNode, defaultValues, ... }) {
//       const formMethods = useForm({ defaultValues, mode: 'onChange' });
//       return (
//           <FormProvider {...formMethods}>
//               <PristineSnapshotWrapper>
//                   <DerivedFieldsProvider ...>
//                       {/* ... existing layout rendering ... */}
//                   </DerivedFieldsProvider>
//               </PristineSnapshotWrapper>
//           </FormProvider>
//       );
//   }
//
//   function PristineSnapshotWrapper({ children }: { children: ReactNode }) {
//       const snapshot = usePristineSnapshot();
//       return (
//           <PristineSnapshotContext.Provider value={snapshot}>
//               {children}
//           </PristineSnapshotContext.Provider>
//       );
//   }

// ----------------------------------------------------------------
// STEP 3: Wire Into field-renderer.tsx (onBlur Dirty Check)
// ----------------------------------------------------------------
//
// In field-renderer.tsx, import the context and use it in onBlurWithValue:
//
//   import { usePristineSnapshotContext } from '@/contexts/pristine-snapshot-context';
//
//   function FieldRenderer({ controlNode }: FieldRendererProps) {
//       // ... existing hooks ...
//       const { isDirty: isFieldDirty } = usePristineSnapshotContext();
//
//       const onBlurWithValue = async (value: unknown) => {
//           const matchcode = controlNode.field.matchcode;
//
//           // GAP #77: Smart dirty detection — compare against pristine value
//           // instead of blindly setting dataChanged=true on every edit.
//           const fieldChanged = isFieldDirty(matchcode, value);
//           if (fieldChanged) {
//               GlobalVarsStoreApi.getState().actions.setDataChanged(true);
//           }
//           // Note: We do NOT set dataChanged=false here if fieldChanged is false,
//           // because OTHER fields may still be dirty. Only isFormDirty() can
//           // determine the aggregate state, and we don't want to call it on
//           // every blur (it walks all fields). Instead, dataChanged is only
//           // cleared explicitly:
//           //   - By the server via SET_VARIABLE mblnDataChanged=false
//           //   - By recaptureSnapshot() after a successful save
//           //   - By the navigation guard when the user confirms "discard changes"
//
//           // ... rest of existing onBlurWithValue (postprocessblanks check, EE call, etc.) ...
//       };
//   }

// ----------------------------------------------------------------
// STEP 4: SET_INITIALVALUE Command Verb Handler
// ----------------------------------------------------------------
//
// The server may send a SET_INITIALVALUE browser command to reset a field's
// pristine baseline after a server-side value change. This tells the client
// "this is the new pristine value; don't count it as dirty."
//
// ADD to the switch in src/handlers/common/command.ts:
//
//   case 'SET_INITIALVALUE': {
//       // noun = matchcode of the field to update
//       // addinf = the new pristine value
//       // This updates the pristine snapshot so the field is no longer
//       // considered "dirty" relative to its baseline.
//       handlers.onSetInitialValue?.(cmd.noun, cmd.addinf);
//       break;
//   }
//
// ADD 'SET_INITIALVALUE' to the BrowserVerb union in src/types/common.ts:
//
//   export type BrowserVerb =
//       | 'SET_INITIALVALUE'
//       // ... existing verbs ...
//
// ADD to the CommandHandlers interface in src/handlers/common/command.ts:
//
//   export interface CommandHandlers {
//       // ... existing handlers ...
//       /** Called for SET_INITIALVALUE — update pristine snapshot for a field */
//       onSetInitialValue?: (matchcode: string, value: string) => void;
//   }
//
// ADD to buildCommandCallbacks in src/utils/form-action-executor.ts:
//
//   onSetInitialValue: (matchcode, value) => {
//       // The pristine snapshot is managed by PristineSnapshotContext.
//       // We need to access it from the command handler, which runs outside
//       // the React component tree. Two approaches:
//       //
//       // A. Store the setPristineValue function in a module-level ref
//       //    (set by the PristineSnapshotWrapper on mount):
//       //      if (pristineSnapshotRef.current) {
//       //          pristineSnapshotRef.current.setPristineValue(matchcode, value);
//       //      }
//       //
//       // B. Set the new pristine value in the form via setValue, then
//       //    recapture the snapshot. This is simpler but recaptures ALL fields.
//       //
//       // Approach A is recommended for surgical updates.
//       context.setValue(matchcode, value);
//   },

// ----------------------------------------------------------------
// STEP 5: Full Dirty Derivation Flow
// ----------------------------------------------------------------
//
// The complete flow for page-level dirty detection:
//
//   1. Page loads
//      -> form-renderer.tsx renders with defaultValues
//      -> PristineSnapshotWrapper captures snapshot via usePristineSnapshot
//      -> dataChanged starts as false
//
//   2. User edits a field
//      -> react-hook-form updates the field value
//      -> User tabs away (blur fires)
//      -> onBlurWithValue calls isFieldDirty(matchcode, newValue)
//      -> If different from pristine: setDataChanged(true)
//      -> useNavigationGuard detects isDirty and arms the guards
//
//   3. User undoes edit (restores original value)
//      -> onBlurWithValue calls isFieldDirty(matchcode, restoredValue)
//      -> isFieldDirty returns false (matches pristine)
//      -> dataChanged stays true (other fields may still be dirty)
//      -> To clear: could optionally call isFormDirty() here, but that's
//         expensive for large forms. VBS also left mblnDataChanged=true
//         in this case — clearing it required a full page re-check.
//
//   4. Server sends SET_VARIABLE mblnDataChanged=false (after save)
//      -> global-vars-store.dataChanged = false
//      -> Navigation guard deactivates
//
//   5. OK/Save button clicked, server confirms save
//      -> Server sends SET_VARIABLE mblnDataChanged=false
//      -> OR: the action handler calls recaptureSnapshot() to reset baselines
//      -> dataChanged = false
//
//   6. Server sends SET_INITIALVALUE (server-side value change)
//      -> Pristine snapshot updated for that field
//      -> Field no longer counts as dirty for that specific value
//
// ----------------------------------------------------------------
// PERFORMANCE NOTES
// ----------------------------------------------------------------
//
// - snapshotRef is a plain object with string keys and string values.
//   For a typical AQS page with 30-50 fields, this is negligible memory.
//
// - isDirty() is O(1) — single key lookup + string comparison.
//
// - isFormDirty() is O(n) where n = number of fields. Called rarely:
//   only when deciding whether to clear dataChanged (not on every blur).
//
// - normalizeForComparison uses toSafeString which is already imported
//   and used throughout field-renderer.tsx. No new dependencies.
//
// - The ref-based approach avoids re-renders. The snapshot is captured
//   once on mount and read via stable callbacks. No component re-renders
//   when the snapshot is read or updated.
