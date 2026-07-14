import { useEffect } from 'react';
import type { NavigationResponse, PageBuildResponse, PageConfig, SessionInfo } from '@/types';
import { api } from '@/engine/api/client';
import { usePageStore } from '@/stores/page-store';
import { useAppStore } from '@/stores/app-store';
import { dispatchCommands } from '@/engine/commands/dispatch';
import { mergeControlsWithPageBuild } from '@/config/routes';

/**
 * window-load — the TypeScript conversion of Eebrowser.vbs
 * `window_onload` / `second_window_onload` (lines 120–397).
 *
 * Sprint Task 5: "TS Conversion – Load: Windows_Load and supporting function".
 *
 * The legacy routine is one 277-line imperative sequence that runs AFTER the
 * HTML loads. In React it splits into two phases:
 *
 *   Phase A `windowLoad()`     — runs BEFORE render, inside the route loader.
 *                                Everything that fetches or derives data.
 *   Phase B `useWindowLoad()`  — runs AFTER first render, as an effect.
 *                                Everything that acts on the rendered page.
 *
 * Each step below carries the legacy line range it replaces. Steps with no
 * body are ELIMINATED — the comment explains what makes them unnecessary.
 */

export interface WindowLoadInput {
  session: SessionInfo;
  lob: string;
  /** The requested page — legacy equivalent of the URL the frame navigated to. */
  pageId: string;
}

export interface WindowLoadResult {
  nav: NavigationResponse;
  pageBuild: PageBuildResponse;
  pageConfig?: PageConfig;
  /** Pre-resolved action-mode dirty flag (VBS lines 175–195). */
  isDirty: boolean;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Phase A — route-loader phase (before render)
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * The loader half of window_onload. React Router runs this BEFORE the page
 * component renders, which is what eliminates the legacy `mblnPageLoaded`
 * flag: no user event can arrive while this is still running.
 */
export async function windowLoad(
  input: WindowLoadInput,
  resolvePageConfig: (pageId: string) => PageConfig | undefined,
): Promise<WindowLoadResult> {
  // [VBS 133–143] Modal sizing — ELIMINATED. showModalDialog needed manual
  // screen.availWidth/Height capping; MUI <Dialog> constrains itself via CSS.

  // [VBS 145–157] Frame references (mobjAQSMain / menu / tree) — ELIMINATED.
  // The SPA has one component tree; shell and page share Zustand stores.

  // [VBS 159–166] Timing milestone: cross-frame SetTimingMilestone call
  // becomes the browser-native Performance API.
  performance.mark(`window-load:start:${input.pageId}`);

  // [VBS 198–211] XML Data Island → the PageBuild API. The legacy page parsed
  // an embedded <xml id="xdiPageData"> island with MSXML; the backend now
  // sends the same definitions as JSON. Navigation first (which page), then
  // PageBuild (what's on it) — SDD §5.3 two-call flow.
  const nav = await api.navigate({ ...input.session, lob: input.lob }, input.pageId);
  const pageBuild = await api.pageBuild({ ...input.session, lob: input.lob }, nav.pageId);

  // [VBS 175–195] Action-mode dirty flag, resolved from the Navigation
  // response instead of the hidden field document.all("hddAction").
  const isDirty = resolveDirtyFlag(input.session.action);

  // Static/hybrid page config (SDD §10.2.2) — the render-strategy schema the
  // legacy system had no equivalent for; dynamic pages return undefined.
  const pageConfig = resolvePageConfig(nav.pageId);

  return { nav, pageBuild, pageConfig, isDirty };
}

/**
 * [VBS 175–195] The Select Case on the action string. EDIT and ADD mean the
 * page will mutate data, so the unsaved-changes flag starts raised; INQUIRY
 * and SELECT are read-only.
 */
export function resolveDirtyFlag(action: string | undefined): boolean {
  switch ((action ?? '').toUpperCase()) {
    case 'EDIT':
    case 'ADD':
      return true;
    case 'INQUIRY':
    case 'SELECT':
    default:
      return false;
  }
}

/* ────────────────────────────────────────────────────────────────────────────
 * Phase B — post-render phase (effect)
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * The effect half of window_onload. Runs once per loaded page, after the
 * first render — the same moment the legacy routine finished and set
 * `mblnPageLoaded = True`. Here that flag is implicit: rendered ⇒ loaded.
 */
export function useWindowLoad(result: WindowLoadResult): void {
  const { nav, pageBuild, pageConfig, isDirty } = result;

  useEffect(() => {
    // [VBS 198–211] Hydrate page state from the PageBuild response — the
    // React counterpart of holding the parsed Data Island in mxmlDoc.
    const merged = mergeControlsWithPageBuild(pageConfig, pageBuild);
    usePageStore.getState().loadPage(pageBuild, merged);

    // [VBS 175–195] Raise/clear the unsaved-changes flag for this page.
    useAppStore.getState().setDirty(isDirty);

    // [VBS 222–280] ShowNextOnEdit and friends — the server now owns button
    // visibility and sends SET_VISIBLE / SET_DISABLED commands with the
    // PageBuild; one dispatch call replaces ~60 lines of nested Ifs.
    // [VBS 282–285] Required indicators arrive as `required` on each control
    // and render declaratively — no separate init pass.
    if (pageBuild.commands?.length) dispatchCommands(pageBuild.commands);

    // [VBS 1136–1149 via 397] PageUniqueRoutine("local_window_onload") —
    // the per-page Execute hook becomes a typed, optional config callback.
    pageConfig?.onLoad?.();

    // [VBS 287–327] Path/page labels — ELIMINATED here: breadcrumbs read the
    // route from React Router; no cross-frame GetPathLabel string-building.
    // [VBS 335–358] Tab selection — owned by the page component as local
    // useState; the initial tab comes from pageBuild.tabs.
    // [VBS 362–384] First-control focus — declarative autoFocus on the first
    // editable field in FormRenderer.

    // [VBS 386–397] Closing milestones: timing end, HideLoading (React Router
    // hides the pending UI automatically when the loader resolves), and
    // mblnPageLoaded = True (implicit).
    performance.mark(`window-load:end:${nav.pageId}`);
    performance.measure(
      `window-load:${nav.pageId}`,
      `window-load:start:${nav.pageId}`,
      `window-load:end:${nav.pageId}`,
    );
  }, [nav.pageId, pageBuild, pageConfig, isDirty]);
}
