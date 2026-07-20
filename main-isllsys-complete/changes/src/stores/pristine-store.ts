import { create } from 'zustand';

// VBS: Main_ISLLSYS #77 SetInitialValueData (lines 7886-7981)
//    + #55 SelectControlFocus baseline capture (lines 5350-5418)
// Captures every control's pristine value so change detection can compare
// current vs baseline (legacy mvntInitialValue) and drive mblnDataChanged.

interface PristineActions {
    /** Capture all field baselines at page hydration (call once per page). */
    captureAll: (values: Record<string, string>) => void;
    /** (Re)capture a single field's baseline — legacy did this on focus. */
    capture: (matchcode: string, value: string) => void;
    /** True when the value differs from the captured baseline. */
    isDirty: (matchcode: string, value: string) => boolean;
    /** All matchcodes whose current value differs from baseline. */
    dirtyFields: (values: Record<string, string>) => string[];
    clear: () => void;
}

interface PristineState {
    baseline: Record<string, string>;
    actions: PristineActions;
}

const usePristineStore = create<PristineState>()((set, get) => ({
    baseline: {},
    actions: {
        captureAll: (values) => set({ baseline: { ...values } }),
        capture: (matchcode, value) =>
            set((s) => ({ baseline: { ...s.baseline, [matchcode]: value } })),
        isDirty: (matchcode, value) => {
            const base = get().baseline[matchcode];
            return base !== undefined && base !== value;
        },
        dirtyFields: (values) => {
            const base = get().baseline;
            return Object.keys(values).filter(
                (m) => base[m] !== undefined && base[m] !== values[m],
            );
        },
        clear: () => set({ baseline: {} }),
    },
}));

export const PristineStoreApi = usePristineStore;
export const usePristineActions = () => usePristineStore((s) => s.actions);
export default usePristineStore;
