// MODIFIED — original: src/stores/focus-store.ts
// GAP #79 — SetControlFocus with tab switch (eebrowser.vbs lines 8485-8615):
// adds pendingTabSwitch state + requestFocusWithTabSwitch() so the tab layout can
// activate the hosting tab before the pending focus fires. See GAP markers.

import { create } from 'zustand';

// ---------------------------------------------

interface FocusStoreActions {
    requestFocus: (matchcode: string) => void;
    clearFocus: () => void;
    // >>> GAP #79: SetControlFocus tab-switch (VBS 8485-8615)
    /**
     * Focus a control that may live on another tab: when tabIndex is not null,
     * stores it as pendingTabSwitch (consumed by the tab layout BEFORE the focus
     * fires), then delegates to requestFocus.
     */
    requestFocusWithTabSwitch: (matchcode: string, tabIndex: number | null) => void;
    /** Called by the tab layout once the pending tab switch has been applied. */
    clearTabSwitch: () => void;
    // <<< GAP #79
}

interface FocusStoreState {
    pendingFocus: string | null;
    // >>> GAP #79: tab index the layout must activate before the focus fires
    pendingTabSwitch: number | null;
    // <<< GAP #79
    actions: FocusStoreActions;
}

// >>> GAP #79: create receives `get` so requestFocusWithTabSwitch can delegate
const useFocusStore = create<FocusStoreState>()((set, get) => ({
// <<< GAP #79
    pendingFocus: null,
    // >>> GAP #79
    pendingTabSwitch: null,
    // <<< GAP #79
    actions: {
        requestFocus: (matchcode) => set({ pendingFocus: matchcode }),
        clearFocus: () => set({ pendingFocus: null }),
        // >>> GAP #79: SetControlFocus tab-switch (VBS 8485-8615)
        requestFocusWithTabSwitch: (matchcode, tabIndex) => {
            if (tabIndex !== null) {
                // Stored first — the tab layout consumes the switch, renders the
                // hosting tab, and only then does the pending focus find its control.
                set({ pendingTabSwitch: tabIndex });
            }
            get().actions.requestFocus(matchcode);
        },
        clearTabSwitch: () => set({ pendingTabSwitch: null }),
        // <<< GAP #79
    },
}));

export const FocusStoreApi = useFocusStore;

export const usePendingFocus = () => useFocusStore((s) => s.pendingFocus);
export const useFocusActions = () => useFocusStore((s) => s.actions);
// >>> GAP #79: selector for the tab layout
export const usePendingTabSwitch = () => useFocusStore((s) => s.pendingTabSwitch);
// <<< GAP #79
