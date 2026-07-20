import { create } from 'zustand';

// VBS: Main_ISLLSYS #43 SetNextAction (lines 3148-3166)
// Stash the next navigation's params while a modal is open; when the modal
// closes, drain the stash and perform the deferred navigation.
//
// Self-contained micro-store (R4): independent of the client branch's
// navigation-store shape. Merge point: command.ts CLOSE_MODAL handler calls
// drainNextAction(execute).

export interface NextAction {
    action: string;
    nodeKey: string;
    qs?: string;
}

interface DeferredNavState {
    next: NextAction | null;
    actions: {
        setNextAction: (next: NextAction) => void;
        clearNextAction: () => void;
        /** Returns and clears the stash; runs `execute` when present. */
        drainNextAction: (execute?: (next: NextAction) => void) => NextAction | null;
    };
}

const useDeferredNavStore = create<DeferredNavState>()((set, get) => ({
    next: null,
    actions: {
        setNextAction: (next) => set({ next }),
        clearNextAction: () => set({ next: null }),
        drainNextAction: (execute) => {
            const next = get().next;
            if (next) {
                set({ next: null });
                execute?.(next);
            }
            return next;
        },
    },
}));

export const DeferredNavStoreApi = useDeferredNavStore;
export const setNextAction = (next: NextAction) =>
    useDeferredNavStore.getState().actions.setNextAction(next);
export const drainNextAction = (execute?: (next: NextAction) => void) =>
    useDeferredNavStore.getState().actions.drainNextAction(execute);
export default useDeferredNavStore;
