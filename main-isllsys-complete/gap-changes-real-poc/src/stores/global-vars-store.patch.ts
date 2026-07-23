// ============================================================================
// FIX — GAP #79 (SetControlFocus tab-switch) + BROKEN IMPORT in team commit 81e0b7ea
// Target: src/stores/global-vars-store.ts   (the unified store, -21 +228 in 81e0b7ea)
// ============================================================================
//
// WHAT THE TEAM DID (commit 81e0b7ea, "Merge branch 'experimental'", PR !30196):
//   Unified global-vars-store now absorbs combo-options-store, focus-store, and
//   browser-cmd-store (all three deleted). The old focus-store had a tab-switch
//   mechanism — `pendingTab` state + `setPendingTab`/`clearPendingTab` actions +
//   `usePendingTab` selector (see deleted focus-store.ts, IMG_5958–5959):
//       pendingTab: number | null;
//       setPendingTab: (tabIndex: number | null) => void;
//       clearPendingTab: () => void;
//       export const usePendingTab = () => useFocusStore((s) => s.pendingTab);
//
//   During the merge these were DROPPED — the unified store's FocusActions,
//   state shape, defaults, and selectors (IMG_5960–5995, verified on IMG_5995
//   file tail lines 312–333) contain NO pendingTab / setPendingTab /
//   clearPendingTab / usePendingTab.
//
// THE BUG:
//   layouts/tab.tsx (changed -1/+1 in the SAME commit, IMG_5944) still does:
//       import { usePendingTab, useFocusActions } from '@stores/global-vars-store';
//   but `@stores/global-vars-store` no longer exports `usePendingTab`.
//   → TypeScript error TS2305 "Module has no exported member 'usePendingTab'".
//   → The tab-switch-before-focus behavior (legacy SetControlFocus: switch to the
//     tab that hosts a control, THEN focus it) is broken.
//
// THE FIX (this patch): re-add the dropped tab-switch API to the unified store,
//   placed in the same focus sections the team already created. This restores
//   the pre-refactor behavior with the API surface tab.tsx already imports.
//   Nothing else in the store changes.
//
// Apply the four fenced blocks below into src/stores/global-vars-store.ts at the
// indicated anchors (line numbers are the NEW-file numbers from the 81e0b7ea diff).
// ============================================================================


// ─── BLOCK 1 ──────────────────────────────────────────────────────────────
// In `interface FocusActions { ... }` (new-file lines 47–59), add the two
// tab-switch actions. Anchor: right after `setPreviousMatchcode(...)` (line 58),
// before the closing brace (line 59).

interface FocusActions_PATCH {
    requestFocus: (matchcode: string) => void;
    clearFocus: () => void;
    registerFocusImpl: (fn: (matchcode: string) => void) => void;
    registerSelectImpl: (fn: (matchcode: string) => void) => void;
    setPreviousMatchcode: (matchcode: string) => void;

    // >>> FIX #79: tab-switch-before-focus (restored from deleted focus-store)
    /** Stage the tab index that hosts the next focus target, so TabLayout can
     *  switch to it before the control is focused (legacy SetControlFocus). */
    setPendingTab: (tabIndex: number | null) => void;
    /** Clear the staged tab index once TabLayout has activated it. */
    clearPendingTab: () => void;
    // <<< FIX #79
}


// ─── BLOCK 2 ──────────────────────────────────────────────────────────────
// In `interface GlobalVarsState { ... }` focus-state section (new-file lines
// 98–113), add the `pendingTab` field. Anchor: right after `pendingFocus`
// (line 100), alongside the other focus fields.

interface GlobalVarsState_PATCH {
    // ...existing focus state...
    pendingFocus: string | null;

    // >>> FIX #79: tab index staged for the next programmatic focus (legacy pendingTab)
    /** Tab index to activate before applying pendingFocus. null = no switch. */
    pendingTab: number | null;
    // <<< FIX #79

    focusTarget: string | null;
    isFocusProgrammatic: boolean;
    previousMatchcode: string | null;
    __focusImpl: ((matchcode: string) => void) | null;
    __selectImpl: ((matchcode: string) => void) | null;
}


// ─── BLOCK 3 ──────────────────────────────────────────────────────────────
// (a) In `defaultGlobalVars` (new-file lines 126–143), add the default.
//     Anchor: right after `pendingFocus: null,` (line 135).
//
//        pendingFocus: null,
//        // >>> FIX #79
//        pendingTab: null,
//        // <<< FIX #79
//        focusTarget: null,
//
// (b) In the Focus action implementations (new-file lines 221–248), add the two
//     setters. Anchor: right after `setPreviousMatchcode` (lines 246–248),
//     before the Browser-cmd section (line 250).

const focusActionImpls_PATCH = {
    setPreviousMatchcode: (matchcode: string) => {
        // set({ previousMatchcode: matchcode });  // existing
    },

    // >>> FIX #79: tab-switch setters (restored from deleted focus-store)
    setPendingTab: (/* tabIndex */) => {
        // set({ pendingTab: tabIndex });
    },
    clearPendingTab: () => {
        // set({ pendingTab: null });
    },
    // <<< FIX #79
};


// ─── BLOCK 4 ──────────────────────────────────────────────────────────────
// In the "Focus selectors" export section (new-file lines 312–328), add the
// `usePendingTab` selector that tab.tsx imports. Anchor: right after the
// `usePendingFocus` export (line 315), before `useFocusState` (line 317).
//
//   export const usePendingFocus = () => useGlobalVarsStore((s) => s.pendingFocus);
//
//   // >>> FIX #79: selector tab.tsx imports (was on the deleted focus-store)
//   /** Subscribe to the staged tab index for tab-switch-before-focus. */
//   export const usePendingTab = () => useGlobalVarsStore((s) => s.pendingTab);
//   // <<< FIX #79
//
//   export const useFocusState = () => ...

export const usePendingTab_PATCH =
    '() => useGlobalVarsStore((s) => s.pendingTab)';


// ============================================================================
// RESULT AFTER APPLYING:
//   - `@stores/global-vars-store` again exports `usePendingTab` → tab.tsx compiles.
//   - `useFocusActions()` now exposes `setPendingTab`/`clearPendingTab` so a
//     SET_FOCUS command that targets a control on another tab can stage the tab
//     (setPendingTab(idx)) and TabLayout's pendingTab consumer activates it
//     before requestFocus lands (legacy SetControlFocus tab-switch behavior).
//
// WIRING NOTE (already present in team code — no change needed here):
//   tab.tsx (IMG_5944) imports usePendingTab + useFocusActions and its comment
//   reads "initial tab index (e.g. from SET_FOCUS / pendingTab)", so the consumer
//   side already expects this API; only the store side was missing.
// ============================================================================
