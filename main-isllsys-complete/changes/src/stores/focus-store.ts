import { create } from 'zustand';

// VBS: Main_ISLLSYS #79 SetControlFocus (lines 8485-8615)
// v2 of focus-store: adds the legacy "switch tab BEFORE focusing" step —
// requestFocus can carry the tab index that hosts the control, and
// tab-layout subscribes to pendingTab to switch first.
//
// DROP-IN REPLACEMENT for the v1 focus-store (same exports plus new ones)
// — safe to overwrite the file created during the window_onload session.

interface FocusStoreActions {
    /** Request focus; tabIndex switches the hosting tab first (#79). */
    requestFocus: (matchcode: string, tabIndex?: number) => void;
    clearFocus: () => void;
    clearTab: () => void;
}

interface FocusStoreState {
    pendingFocus: string | null;
    pendingTab: number | null;
    actions: FocusStoreActions;
}

const useFocusStore = create<FocusStoreState>()((set) => ({
    pendingFocus: null,
    pendingTab: null,
    actions: {
        requestFocus: (matchcode, tabIndex) =>
            set({ pendingFocus: matchcode, pendingTab: tabIndex ?? null }),
        clearFocus: () => set({ pendingFocus: null }),
        clearTab: () => set({ pendingTab: null }),
    },
}));

export const FocusStoreApi = useFocusStore;

export const usePendingFocus = () => useFocusStore((s) => s.pendingFocus);
export const usePendingTab = () => useFocusStore((s) => s.pendingTab);
export const useFocusActions = () => useFocusStore((s) => s.actions);
export default useFocusStore;
