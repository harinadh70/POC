import { useEffect } from 'react';
import type { SessionInfo } from '@/types';
import { useAppStore } from '@/stores/app-store';

/**
 * shell-load — the TypeScript conversion of the FRAMESET bootstrap
 * `Main_ISLLSYS_20010101.vbs` → `Sub window_onload` (stitched lines 216–410),
 * plus its serial-load chain `LoadNextPage` (414) and `LoadFirstPage` (438).
 *
 * IMPORTANT — this is a DIFFERENT window_onload from the one in `window-load.ts`:
 *
 *   window-load.ts   ← Eebrowser.vbs window_onload   → initializes ONE page
 *   shell-load.ts    ← Main_ISLLSYS window_onload    → boots the whole SHELL
 *
 * The legacy routine's job (its own PURPOSE comment, line 219): "Initial set up
 * of the frames. Starts the serial load of the frames according to what is
 * required. Search page, policy, admin, etc." It runs once when the top-level
 * browser window opens, sizes the frameset, loads the security island, then
 * kicks off a chained load: menu frame → (its onload) → tree frame → (its
 * onload) → first content page.
 *
 * In React it splits into the same two phases as window-load.ts:
 *
 *   Phase A `shellLoad()`     — the root/shell route loader (before render).
 *   Phase B `useShellLoad()`  — an effect in AppLayout (after first render).
 *
 * The menu→tree→page CHAIN is not re-implemented imperatively: it becomes the
 * router's own parent→child loader nesting (shell loader → lobPageLoader). See
 * the note on LoadNextPage / LoadFirstPage at the bottom.
 */

/* ────────────────────────────────────────────────────────────────────────────
 * Shell mode — the "Configure the frames and borders" decision (VBS 335–374)
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * [VBS 352–372] The legacy `If CLng(mstrPolicyID) > 0 … ElseIf = 0 … Else`
 * ladder chose the frameset row/col sizes: a policy shows menu+tree frames, a
 * search page shows neither, a utility shows only the dropdown. In the SPA the
 * three "framesets" are three shell layouts, so the decision survives as an
 * enum the shell reads instead of frame pixel sizes.
 */
export type ShellMode = 'policy' | 'search' | 'utility';

export interface ShellLoadResult {
  mode: ShellMode;
  /** [VBS 250] window.opener existed → this is a spawned child (policy) window. */
  isChildWindow: boolean;
  /** [VBS 424–431] The nodeKey the serial load starts from, e.g. "POL|POL|0|". */
  nodeKey: string;
  /** [VBS 378–383] Initial action; Case -3 → "LIB", else carried from session. */
  action: string;
}

/**
 * [VBS 335–372] Reproduce the frame-configuration branch without the frames.
 * CLng(mstrPolicyID): > 0 = an open policy (menu+tree), = 0 = the search page,
 * anything else (e.g. -3 utilities) = utility.
 */
export function resolveShellMode(policyId: string | undefined): ShellMode {
  const id = Number.parseInt(policyId ?? '', 10);
  if (Number.isNaN(id)) return 'utility';
  if (id > 0) return 'policy';
  if (id === 0) return 'search';
  return 'utility';
}

/**
 * [VBS 377–385] `Select Case CLng(mstrPolicyID) … Case -3: mstrAction = "LIB"`.
 * The library/utilities entry point overrides the action; every other case
 * keeps whatever action the session arrived with.
 */
export function resolveInitialAction(session: SessionInfo): string {
  if (Number.parseInt(session.policyId ?? '', 10) === -3) return 'LIB';
  return session.action ?? 'INQUIRY';
}

/* ────────────────────────────────────────────────────────────────────────────
 * Phase A — shell route loader (before render)  [VBS 216–402]
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * The loader half of Main_ISLLSYS window_onload. Attached to the shell ("/")
 * route, it runs once before the shell renders and resolves everything the
 * frameset bootstrap derived up-front.
 */
export function shellLoad(session: SessionInfo | null): ShellLoadResult {
  // [VBS 223] `On Error Resume Next` — the loader's try/catch boundary; a
  // missing session degrades to the search shell instead of throwing (the
  // AppLayout auth guard then redirects to /login).
  performance.mark('shell-load:start');

  if (!session) {
    return { mode: 'search', isChildWindow: false, nodeKey: 'POL|POL|0|', action: 'INQUIRY' };
  }

  // [VBS 237–241] Resize window if screen < 1024×768 — ELIMINATED. Fixed-size
  // frameset windows are replaced by a responsive MUI layout.

  // [VBS 244] `Set GlobalVars = New globalVarsClass` — the shared state object
  // is the Zustand appStore; seeding happens in the effect phase below.

  // [VBS 247] `Set mobjAQSMain = window` — self-reference for cross-frame code.
  // ELIMINATED: one component tree, no frames to reach back through.

  // [VBS 250] `Set mobjParentWindow = window.opener`.
  const isChildWindow = typeof window !== 'undefined' && window.opener != null;

  // [VBS 252–320] REPLACEMENT SEARCH PAGE re-parenting — ELIMINATED here.
  // Re-parenting child windows when a search window reopens is owned by
  // engine/window-manager.ts (the window registry), not the load routine.

  // [VBS 335–372] Configure the frameset → choose the shell layout.
  const mode = resolveShellMode(session.policyId);

  // [VBS 377–385] Specify the initial action (Case -3 → LIB).
  const action = resolveInitialAction(session);

  // [VBS 388–395] Load the security data island. The legacy page parsed an
  // embedded <xml id="xdiSecurity"> island with MSXML; permissions now arrive
  // as JSON at login and live in authStore — no per-boot parse.

  // [VBS 424–431] The nodeKey the serial load starts from.
  const nodeKey = session.nodeKey ?? 'POL|POL|0|';

  return { mode, isChildWindow, nodeKey, action };
}

/* ────────────────────────────────────────────────────────────────────────────
 * Phase B — post-render shell effect  [VBS 398–410]
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * The effect half of Main_ISLLSYS window_onload. Runs once when the shell has
 * rendered — the moment the legacy frameset finished bootstrapping.
 */
export function useShellLoad(result: ShellLoadResult): void {
  const { mode, nodeKey, action } = result;

  useEffect(() => {
    const app = useAppStore.getState();

    // [VBS 235] `AddWindowToCollection window` — register this window so a
    // logout can close every window. Self-registration is handled by
    // engine/window-manager.ts; here we just seed the shared globals.

    // [VBS 244] `Set GlobalVars = New globalVarsClass` — seed the app-wide
    // variables the rest of the app reads (the marrSessionInformation home).
    app.setVariable('shellMode', mode);
    app.setVariable('nodeKey', nodeKey);
    app.setVariable('action', action);

    // [VBS 406–407] `Call SessionXML_ClearItem("ratingdatachanged")` — clear
    // the stale rating-changed flag left by a previous transaction.
    app.setVariable('ratingdatachanged', undefined);

    // [VBS 398–402] `ExecuteAction("menu", …)` then the LoadNextPage/
    // LoadFirstPage chain (menu → tree → first page) — NOT re-implemented as an
    // imperative sequence. React Router loads the shell route (menu/nav) then
    // the nested lob/:lob/:pageId route (the page) parent-first, in order. The
    // legacy "load one frame at a time to avoid timing problems" workaround is
    // therefore eliminated by construction.

    performance.mark('shell-load:end');
    performance.measure('shell-load', 'shell-load:start', 'shell-load:end');
  }, [mode, nodeKey, action]);
}
