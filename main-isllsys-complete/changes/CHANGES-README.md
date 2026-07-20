# Main_ISLLSYS Changes — Actual Code Files

These are the implementation files for the 41 GAP/PARTIAL routines from the
analysis. Written for the client repo (`aqs-web-ui`) with the lessons from the
window_onload integration built in: **all imports use `@/stores/...`**, every
module exports **both named and default**, store access is **defensive**
(optional chaining), and everything is **additive** — existing files get only
tiny marked merge points.

Folder layout:
- `src/` — 32 NEW files (copy as-is, nothing existing is touched):
  the window_onload set (Eebrowser GAPs) + the Main_ISLLSYS shell set
- `modified-reference/` — COMPLETE versions of the 4 safely-replaceable
  existing files (static-renderer, dynamic-renderer, tab-layout, header),
  change blocks marked `>>> GAP`. See its README for the 4 files that must
  stay merge-only and why.

This folder is THE single location for all changes — the old
`aqs-web-ui-impl/` folder has been merged in here and removed.

## File map — window_onload set (5 files → Eebrowser gaps)

| File | Gap | What it does |
|---|---|---|
| `src/utils/page-init-rules.ts` | E-GAP 1, 2 | dataChanged init by action mode; ShowNextOnEdit disable/hide dtaNEXT |
| `src/hooks/use-page-init.ts` | E-GAP 1, 2 | Hook running both rules per page (schema identity as pageKey) |
| `src/components/breadcrumb.tsx` | E-GAP 3, shell #30 | Tree-ancestry breadcrumb; store-subscribed so it appears when the async tree lands |
| `src/hooks/use-page-load-timing.ts` | E-GAP 7 | Navigation start→idle timing for the header display |
| `src/services/umbrella-status.ts` | Main w_onload | Umbrella mapping check stub (policyId ≠ "0") |

## File map — shell set (27 new files → routines)

### Priority 1 — Core edit loop

| File | Routines | What it does |
|---|---|---|
| `src/stores/pristine-store.ts` | #77, #55 | Baseline value capture + isDirty/dirtyFields |
| `src/utils/required-gate.ts` | #48, #49 | Aggregate required-field check → disables dtaOK/dtaNEXT via overrides |
| `src/hooks/use-edit-loop.ts` | #71, #72 | Watches form values: gate recompute on empty↔non-empty flips, dirty latch. Exports `<EditLoopBridge/>` for a 1-line mount |
| `src/hooks/use-dirty-guard.ts` | #38 | beforeunload + React Router useBlocker + confirm; clears flag on leave |
| `src/hooks/use-focus-roundtrip.ts` | #70, #74 | onFieldBlur → post-process server call + run commands; onFieldFocus → baseline + pre-process |
| `src/services/ee-call.ts` | (bridge) | `configureEECall({post, buildPayload})` — wires the repo's real xmlServerCall/payload builder; warns and no-ops until configured |

### Priority 2 — Features

| File | Routines | What it does |
|---|---|---|
| `src/utils/security-resolver.ts` | #45, #58-61 | Per-control visible/disabled from permissions (allow/deny modes, both JSON shapes) |
| `src/features/tree/delete-action.ts` | #19 | Confirm → server DELETE → tree removeNode → branch refresh table → navigate |
| `src/features/grid/grid-actions.ts` | #66, #67, #68 | Row staging + toolbar actions + DELETE confirm + NEXT loop |
| `src/handlers/common/info-button.ts` | #65 | Calltype-driven info/lookup post + command run |
| `src/utils/deferred-navigation.ts` | #43 | Self-contained next-action stash + `drainNextAction` for modal close |
| `src/features/modals/batch-edits-modal.tsx` | #10 | Batch edits dialog |
| `src/features/modals/conversion-report-modal.tsx` | #11 | Conversion report dialog with show-once session flag |
| `src/features/notes/notes-modal.tsx` | #64 | Notes list + add (STUB — confirm NOTES calltype shape) |

### Priority 3 — Polish

| File | Routines | What it does |
|---|---|---|
| `src/hooks/use-document-title.ts` | #17 | document.title = windowtitle + policy + insured |
| `src/utils/node-key.ts` | #36, #23 | replaceExpiredNumber + lobFromNodeKey (BOP exception) |
| `src/utils/tree-actions.ts` | #18, #34, #35, #84 | hasNode / selectNodeAndNavigate / updateNodeIcon / refetchBranch |
| `src/utils/refresh-actions.ts` | #4, #37 | clearActionMenus + refreshSearchPageLists |
| `src/utils/app-logout.ts` | #7, #8 | resetAllStores after the repo's auth logout |
| `src/services/async-check.ts` | #20 | CHECKASYNCH pre-flight |
| `src/utils/show-zero-text.ts` | #83 | Combo empty-option label rule |
| `src/utils/confirm.ts` | #42 (reuse) | Awaitable confirm (window.confirm now; swap to modal-store later) |
| `src/components/action-toolbar.tsx` | #25, #41 | Reactive toolbar — buttons subscribe to runtime overrides |
| `src/components/ui/dual-list.tsx` | #53 | Available↔selected transfer list with limit |
| `src/stores/focus-store.ts` | #79 | **v2** focus-store: adds pendingTab (switch tab before focus). Drop-in replacement for the v1 pasted earlier |
| `src/handlers/common/isllsys-handlers.ts` | #15, #75, #43 | back-to-search, run procedures by calls-type, onModalClosed drain |
| `src/hooks/use-unload-cancel.ts` | #39 | sendBeacon CANCEL on pagehide when dirty |

## Integration steps (in order)

1. **Copy all `src/` files** into the client repo's `src/`, same relative paths.
   `focus-store.ts` intentionally REPLACES the v1 file from the window_onload session.
   Then apply the 4 complete files from `modified-reference/` (or lift their
   `>>> GAP` blocks into your branch's versions if yours differ).
2. **Configure the bridges once** (app startup, e.g. main.tsx or root loader):
   ```ts
   configureEECall({ post: xmlServerCall, buildPayload: handlerForEEData });  // repo's real fns
   configureTreeFetch((branchKey) => treeService.fetchBranch(branchKey));     // if tree refetch used
   configureUnloadCancel('/api/v1/ui/data');                                  // real endpoint
   ```
3. **Merge points in existing files** (the ONLY edits to existing code):
   | File | Edit |
   |---|---|
   | FormRenderer (inside its RHF provider) | `<EditLoopBridge fields={mergedFields} />` — 1 line |
   | static-renderer / dynamic-renderer | `PristineStoreApi.getState().actions.captureAll(defaultValues)` after defaults — 1 line each |
   | root layout | `useDirtyGuard(); useDocumentTitle(); useUnloadCancel();` — 3 lines |
   | field-renderer.tsx | wire `onFieldFocus`/`onFieldBlur` from `useFocusRoundtrip` into the input events — small marked block |
   | command.ts | CLOSE_MODAL branch → `onModalClosed(execute)`; DELETE verb → `executeDeleteAction` — 2 small blocks |
   | grid component | toolbar buttons → `executeGridAction`; row select → `stageRowSelection` |
   | tab-layout.tsx | subscribe `usePendingTab()` → switch tab, then clearTab() — small block |
4. `npx tsc --noEmit` → fix any drift → `npm run dev`.

## Store dependencies — Updated after team commit 885a1365

All confirmed present: session, tree, global-vars, runtime-override,
browser-cmd, modal, navigation.

**Newly created by team (885a1365):** focus-store, combo-options-store.
**Confirmed exists (team imports GridRow from it):** grid-store.
**Still unconfirmed:** menu-store (used only by `refresh-actions.ts`).

## Team commit 885a1365 impact

See `3_TEAM_COMMIT_ANALYSIS.md` for full details. Summary:
- focus-store, combo-options-store now exist on branch (created by team)
- grid-store confirmed to exist (team imports GridRow)
- runtime-override-store now has `readOnly` + `required` fields
- command.ts has SET_READONLY/SET_REQUIRED/SET_FOCUS/LOAD_GRID/CLEAR_GRID verbs
- form-action-executor.ts handles onComboUpdate, onSetAttribute (readonly/required), onLoadGrid/onClearGrid/onSetFocus
- field-renderer.tsx has focus management + combo options + onFocus bindings
- static-renderer.tsx has isFirstRender guard for onUpdate lifecycle
- Our `grid-actions.ts` REVISED: row-click removed (team has it), only DELETE confirm + NEXT loop remains
- Our `focus-store.ts` is now an ADDITIVE PATCH: adds pendingTab to team's version

## Verify-at-integration list (photo-reconstruction caveats)

- permissions JSON shape (security-resolver `readNode`)
- BOP nodeKey element positions (node-key `lobFromNodeKey`)
- NOTES calltype request/response (notes-modal)
- tree-store action names (`removeNode`, `addNodes`, `updateNodeImage`)
- the repo's real `xmlServerCall` + payload builder signatures (ee-call config)
