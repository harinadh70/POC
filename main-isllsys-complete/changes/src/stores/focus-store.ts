import { create } from 'zustand';

// VBS: Main_ISLLSYS #79 SetControlFocus (lines 8485-8615)
//
// ADDITIVE PATCH on top of team's focus-store.ts (commit 885a1365).
// The team's version has: pendingFocus + requestFocus + clearFocus.
// This version ADDS pendingTab for the "switch tab BEFORE focusing" step:
// requestFocus can carry the tab index that hosts the control, and
// tab-layout subscribes to pendingTab to switch first.
//
// INTEGRATION: MERGE the pendingTab/requestTab/clearTab additions into
// the team's existing file — DO NOT replace wholesale.

interface FocusStoreActions {
    requestFocus: (matchcode: string, tabIndex?: number) => void;
    clearFocus: () => void;
    /** Clear pendingTab after tab-layout switched. */
    clearTab: () => void;
}

interface FocusStoreState {
    pendingFocus: string | null;
    /** Tab index to switch to before focusing — null means same tab. */
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
