/**
 * GAPS #77+#55 — SetInitialValueData (Main_ISLLSYS_20010101.vbs lines
 * 7886-7981, 5350-5418)
 * NEW FILE: src/hooks/use-pristine-snapshot.ts
 * Purpose: capture the pristine form baseline (mvntInitialValue) on mount and
 * expose per-field / whole-form dirty checks that drive mblnDataChanged.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

// stores
import { GlobalVarsStoreApi } from '@stores/global-vars-store';

// utils
import { toSafeString } from '@utils/to-safe-string';

// ----------------------------------------------

export interface PristineSnapshotApi {
    /** True when the field's current value differs from its pristine baseline */
    isDirty: (matchcode: string, currentValue: unknown) => boolean;
    /** True when ANY field differs from the pristine baseline */
    isFormDirty: () => boolean;
    /** Compare and raise mblnDataChanged (global-vars-store) on a difference */
    syncDataChanged: (matchcode: string, currentValue: unknown) => void;
    /** Server-driven baseline update for a single field (SET_VALUE et al.) */
    setPristineValue: (matchcode: string, value: unknown) => void;
    /** Re-baseline the whole form (after a successful save) */
    recaptureSnapshot: () => void;
}

/**
 * Tracks the pristine (initial) value of every form field.
 *
 * Legacy equivalent: SetInitialValueData stored each control's load-time
 * lValue in mvntInitialValue; on every commit the current value was compared
 * against it and mblnDataChanged raised on the first difference.
 *
 * React equivalent: getValues() is captured into a ref on mount as the
 * baseline. Values are compared as safe strings (toSafeString) to mirror
 * the legacy lValue string compare. recaptureSnapshot() re-baselines after
 * save — clearing mblnDataChanged stays the saver's responsibility
 * (GlobalVarsStore clearDataChanged), matching the legacy split.
 *
 * Must be used inside FormProvider. Provide the returned api through
 * PristineSnapshotContext so FieldRenderer can call syncDataChanged on blur.
 */
export function usePristineSnapshot(): PristineSnapshotApi {
    const { getValues } = useFormContext<Record<string, unknown>>();

    /** mvntInitialValue -- pristine baseline captured at page load */
    const snapshotRef = useRef<Record<string, unknown> | null>(null);

    // Capture once on mount — defaultValues are already applied by then
    useEffect(() => {
        if (snapshotRef.current === null) {
            snapshotRef.current = { ...getValues() };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // getValues is stable per RHF docs

    const isDirty = useCallback((matchcode: string, currentValue: unknown): boolean => {
        const baseline = snapshotRef.current?.[matchcode];
        // Legacy compared trimmed lValues as strings — mirror that here
        return toSafeString(baseline) !== toSafeString(currentValue);
    }, []);

    const isFormDirty = useCallback((): boolean => {
        const snapshot = snapshotRef.current;
        // js-early-exit: nothing captured yet means nothing can be dirty
        if (!snapshot) return false;

        const values = getValues();
        // Union of keys: fields registered after mount count when non-empty
        const matchcodes = new Set([...Object.keys(snapshot), ...Object.keys(values)]);
        for (const matchcode of matchcodes) {
            if (toSafeString(snapshot[matchcode]) !== toSafeString(values[matchcode])) {
                return true;
            }
        }
        return false;
    }, [getValues]);

    const syncDataChanged = useCallback(
        (matchcode: string, currentValue: unknown): void => {
            // Legacy semantics: mblnDataChanged only ever RAISES here — it is
            // cleared by save/discard, never by a value reverting to baseline
            if (isDirty(matchcode, currentValue)) {
                GlobalVarsStoreApi.getState().actions.setDataChanged(true);
            }
        },
        [isDirty],
    );

    const setPristineValue = useCallback((matchcode: string, value: unknown): void => {
        snapshotRef.current = { ...(snapshotRef.current ?? {}), [matchcode]: value };
    }, []);

    const recaptureSnapshot = useCallback((): void => {
        snapshotRef.current = { ...getValues() };
    }, [getValues]);

    return useMemo(
        () => ({ isDirty, isFormDirty, syncDataChanged, setPristineValue, recaptureSnapshot }),
        [isDirty, isFormDirty, syncDataChanged, setPristineValue, recaptureSnapshot],
    );
}

// ----------------------------------------------

/**
 * Context so FieldRenderer (and action handlers) can reach the snapshot api
 * without prop-drilling. FormRenderer wraps its children with
 * <PristineSnapshotContext.Provider value={usePristineSnapshot()}>.
 */
export const PristineSnapshotContext = createContext<PristineSnapshotApi | null>(null);

export function usePristineSnapshotContext(): PristineSnapshotApi {
    const ctx = useContext(PristineSnapshotContext);
    if (!ctx)
        throw new Error(
            'usePristineSnapshotContext must be used within PristineSnapshotContext.Provider',
        );
    return ctx;
}
