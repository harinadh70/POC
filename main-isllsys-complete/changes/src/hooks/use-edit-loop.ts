import { useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { PristineStoreApi } from '@/stores/pristine-store';
import { GlobalVarsStoreApi } from '@/stores/global-vars-store';
import { runRequiredGate } from '@utils/required-gate';

// VBS: Main_ISLLSYS #71 OnKeyPressHandler (lines 7277-7349)
//    + #72 OnKeyUpHandler   (lines 7352-7414)
// On every change: recompute the required gate ONLY when a field flips
// between empty and non-empty (legacy perf guard), latch dataChanged when a
// value differs from its pristine baseline, and dispatch the page's
// additional key handler if one is registered.

interface EditLoopField {
    matchcode: string;
    required?: boolean;
}

/**
 * Must run INSIDE the react-hook-form provider (FormRenderer's tree).
 * Prefer mounting <EditLoopBridge/> (below) — a one-line merge point.
 */
export function useEditLoop(fields: EditLoopField[]): void {
    const { control } = useFormContext();
    const values = useWatch({ control }) as Record<string, string>;
    const emptyMapRef = useRef<Record<string, boolean> | null>(null);

    useEffect(() => {
        if (!values) return;

        // dirty latch (one-way, like legacy mblnDataChanged)
        const pristine = PristineStoreApi.getState().actions;
        const dirty = pristine.dirtyFields(values);
        if (dirty.length > 0) {
            GlobalVarsStoreApi.getState()?.actions?.setDataChanged?.(true);
        }

        // empty <-> non-empty flip guard, then gate recompute
        const nextEmpty: Record<string, boolean> = {};
        let flipped = emptyMapRef.current === null; // first run: always evaluate
        for (const f of fields) {
            const isEmpty = ((values[f.matchcode] ?? '') as string).trim() === '';
            nextEmpty[f.matchcode] = isEmpty;
            if (!flipped && emptyMapRef.current?.[f.matchcode] !== isEmpty) {
                flipped = true;
            }
        }
        emptyMapRef.current = nextEmpty;

        if (flipped) {
            runRequiredGate(fields, values);
        }

        // page-specific additional handler (legacy additionalKeyHandler)
        const registry = (window as unknown as {
            frameHandlerRegistry?: { call?: (name: string, arg: unknown) => unknown };
        }).frameHandlerRegistry;
        void registry?.call?.('onFieldChange', { values, dirty });
    }, [values, fields]);
}

/** One-line merge point: render inside FormRenderer's provider. */
export function EditLoopBridge({ fields }: { fields: EditLoopField[] }) {
    useEditLoop(fields);
    return null;
}

export default useEditLoop;
