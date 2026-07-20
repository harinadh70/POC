# Team Commit 885a1365 Analysis — Impact on Our Change Set

**Commit:** `885a1365` by hitanshu, committed Friday 2026-07-18
**Branch:** `hitanshu/experimental`
**Title:** "UPDATE: Enhance form handling with new combo options and focus management features"
**Files changed:** 11 (2 new, 9 modified)

---

## What the Team Built (11 files)

### NEW files (2)

| File | What it does |
|------|-------------|
| `src/stores/combo-options-store.ts` | Zustand store for runtime combo box options. Actions: `setOptions`, `addOption`, `clearOptions`. Selector: `useComboOptions(matchcode)`. Drives LOAD_COMBO/ADD_LISTITEM/CLEAR_COMBO commands. |
| `src/stores/focus-store.ts` | Zustand store for programmatic focus. State: `pendingFocus: string|null`. Actions: `requestFocus(matchcode)`, `clearFocus()`. Used by field-renderer to focus a specific input via SET_FOCUS command. **NOTE: simpler than our v2 — has NO `pendingTab` for tab-switch-before-focus.** |

### MODIFIED files (9)

| File | Lines | What changed |
|------|-------|-------------|
| `src/components/modal/modal.tsx` | -3+1 | MUI 7 migration: `PaperProps` → `slotProps.paper`. Removed unused `DialogActions`/`Button` imports. |
| `src/components/ui/data-grid.tsx` | +51 | Added `handleRowClick`: stamps `mstrSelectedRow` in session xmlDetail, runs `executeFormActionBindings(onClickBindings)`. Wires `onRowClick` to MUI DataGrid. |
| `src/components/ui/field-renderer.tsx` | +61 | Major: added focus management effect (pendingFocus → getElementById → focus → clearFocus). Added `runtimeComboOptions` from combo-options-store. Added `handleFocus` with combo lazy-load guard + schema onFocus bindings. `required` now reads `isRequired` from runtime-override. `disabled` now includes `isReadOnly` from runtime-override. |
| `src/features/frame/components/static-renderer.tsx` | +10 | Added `isFirstRender = useRef(true)`. onUpdate lifecycle now skips on initial mount (onMount handles that), only fires on subsequent schema/context changes (e.g. tab navigation). |
| `src/handlers/common/command.ts` | +83 | Added `GlobalVarsStoreApi` import + `GridRow` from grid-store. New verbs: `SET_READONLY`, `SET_REQUIRED`, `SET_FOCUS`, `LOAD_GRID`, `CLEAR_GRID`. Enhanced `SET_VARIABLE` with typed GlobalVarsStore dispatch map (mblndatachanged, mblnpolicyrated, etc.) — unknown variables fall through to xmlDetail. Added `parseGridRows()` function (JSON with pipe-delimited fallback). |
| `src/stores/runtime-override-store.ts` | +2 | Added `readOnly?: boolean` and `required?: boolean` to `RuntimeFieldOverride` interface. |
| `src/types/common.ts` | +6 | Added to `BrowserVerb` union: `SET_READONLY`, `SET_REQUIRED`, `SET_FOCUS`, `LOAD_GRID`, `CLEAR_GRID`. |
| `src/types/frame.ts` | -1+1 | `ActionEventType`: removed `onMount`, added `onFocus` and `onKeyUp`. |
| `src/utils/form-action-executor.ts` | +57 | Added `ComboOptionsStoreApi`, `GridStoreApi`, `FocusStoreApi` imports. `onComboUpdate` now uses ComboOptionsStoreApi (was TODO). `onSetAttribute` handles `readonly` + `required`. New handlers: `onLoadGrid` → GridStoreApi.setRows, `onClearGrid` → GridStoreApi.clearRows, `onSetFocus` → FocusStoreApi.requestFocus. Added `mstrCurrentButton`/`mstrCurrentField` stamping before server call. |

---

## Key Discoveries

1. **`grid-store.ts` EXISTS** on the branch — confirmed by the `import { GridRow } from '@stores/grid-store'` in command.ts. Has `setRows(matchcode, rows)` and `clearRows(matchcode)` actions.

2. **`combo-options-store.ts` did NOT exist before** — was a TODO comment. Team just created it.

3. **Focus-store is NEW and SIMPLER** than our v2. No `pendingTab` — just `pendingFocus` for field-level focus requests via SET_FOCUS command.

4. **`onFocus` is now a schema event type** (replaced `onMount`). field-renderer fires onFocus bindings. This validates our `use-focus-roundtrip.ts` approach but means the onFocus wiring in field-renderer already partially exists.

5. **`onKeyUp` added as event type** — not something we covered.

6. **SET_VARIABLE now routes typed flags to GlobalVarsStore** — exactly what we had planned. `mblndatachanged` → `setDataChanged(boolValue)`, etc.

---

## Cross-Reference: Our 32 Files vs. Team's Commit

### FULLY COVERED by team (can DROP from our set): 0 files

None of our files are fully superseded. The team's work is complementary infrastructure.

### PARTIALLY OVERLAPPING (need REVISION): 3 files

| Our file | Overlap | What to change |
|----------|---------|----------------|
| `src/stores/focus-store.ts` (our v2) | Team created a simpler focus-store. | **ADD `pendingTab` to team's version** instead of replacing wholesale. Their base shape + our `pendingTab`/`requestTab`/`clearTab` additions. |
| `src/features/grid/grid-actions.ts` | Team now has `handleRowClick` in data-grid + LOAD_GRID/CLEAR_GRID in commands. | **TRIM** our file: remove row-click logic (team has it), keep only `executeGridAction` DELETE confirm + NEXT loop. |
| `modified-reference/static-renderer.tsx` | Team added `isFirstRender` guard for onUpdate. | **REBASE**: take team's new `isFirstRender` + our `usePageInit` + `Breadcrumb` + `pristine captureAll`. |

### STILL FULLY NEEDED (no overlap): 29 files

**Priority 1 — Core edit loop (6 files, ~250-300 lines):**
All still needed. Team's commit adds infrastructure (commands, stores) but does NOT implement the edit loop itself.

| # | File | Why still needed |
|---|------|-----------------|
| 1 | `src/stores/pristine-store.ts` | Baseline value capture — team has nothing for this |
| 2 | `src/utils/required-gate.ts` | Aggregate required-field check → disable OK/Next — team's SET_REQUIRED is per-field from server, not aggregate evaluation |
| 3 | `src/hooks/use-edit-loop.ts` | Form value watching + dirty latch + required gate recompute — not in team's commit |
| 4 | `src/hooks/use-dirty-guard.ts` | beforeunload + Router blocker — not touched |
| 5 | `src/hooks/use-focus-roundtrip.ts` | onBlur → server call → run commands → update baseline — team's handleFocus only fires onFocus bindings, not the blur side |
| 6 | `src/services/ee-call.ts` | Configurable bridge — team uses direct handlerForEEData import, but our bridge pattern adds zero-coupling |

**Priority 2 — Features (8 files):**

| # | File | Why still needed |
|---|------|-----------------|
| 7 | `src/utils/security-resolver.ts` | Page-load permission resolution — team only has command-driven per-field SET_READONLY/SET_REQUIRED |
| 8 | `src/features/tree/delete-action.ts` | DELETE with confirm + tree ops — not in team's commit |
| 9 | `src/handlers/common/info-button.ts` | Info/lookup button handler |
| 10 | `src/utils/deferred-navigation.ts` | Next-action stash for modal close |
| 11 | `src/features/modals/batch-edits-modal.tsx` | Batch edits dialog |
| 12 | `src/features/modals/conversion-report-modal.tsx` | Conversion report dialog |
| 13 | `src/features/notes/notes-modal.tsx` | Notes modal |
| 14 | `src/features/grid/grid-actions.ts` | **REVISED** — only DELETE confirm + NEXT loop (row-click removed) |

**Priority 3 — Polish (12 files):**

| # | File | Why still needed |
|---|------|-----------------|
| 15 | `src/hooks/use-document-title.ts` | document.title management |
| 16 | `src/utils/node-key.ts` | replaceExpiredNumber + lobFromNodeKey |
| 17 | `src/utils/tree-actions.ts` | Tree utility functions |
| 18 | `src/utils/refresh-actions.ts` | Menu/grid refresh |
| 19 | `src/utils/app-logout.ts` | Store reset on logout |
| 20 | `src/services/async-check.ts` | CHECKASYNCH pre-flight |
| 21 | `src/utils/show-zero-text.ts` | Combo empty-option label |
| 22 | `src/utils/confirm.ts` | Awaitable confirm dialog |
| 23 | `src/components/action-toolbar.tsx` | Reactive toolbar |
| 24 | `src/components/ui/dual-list.tsx` | Transfer list |
| 25 | `src/handlers/common/isllsys-handlers.ts` | back-to-search, run procedures, onModalClosed |
| 26 | `src/hooks/use-unload-cancel.ts` | sendBeacon CANCEL on pagehide |

**Window_onload set (5 files):**

| # | File | Why still needed |
|---|------|-----------------|
| 27 | `src/utils/page-init-rules.ts` | dataChanged init + ShowNextOnEdit |
| 28 | `src/hooks/use-page-init.ts` | Per-page init hook |
| 29 | `src/components/breadcrumb.tsx` | Tree-ancestry breadcrumb |
| 30 | `src/hooks/use-page-load-timing.ts` | Navigation timing for header |
| 31 | `src/services/umbrella-status.ts` | Umbrella mapping check stub |

**Modified reference files (3 still needed, 1 needs rebase):**

| # | File | Status |
|---|------|--------|
| 32 | `modified-reference/static-renderer.tsx` | **NEEDS REBASE** — merge team's `isFirstRender` + our additions |
| 33 | `modified-reference/dynamic-renderer.tsx` | Still needed as-is |
| 34 | `modified-reference/tab-layout.tsx` | Still needed as-is |
| 35 | `modified-reference/header.tsx` | Still needed as-is |

---

## Updated Merge Points for command.ts (step 2h)

The team already added SET_READONLY / SET_REQUIRED / SET_FOCUS / LOAD_GRID / CLEAR_GRID verb cases.
Our 2 merge points for command.ts are STILL needed and go right after the team's new cases:

```ts
// In the CLOSE_MODAL branch, after modal closes:
onModalClosed((next) => { /* deferred navigation */ });

// New DELETE verb case (ADD after CLEAR_GRID):
case 'DELETE': {
    void executeDeleteAction(cmd.addinf ?? '', { navigate: handlers.onNavigate });
    break;
}
```

---

## Integration Order (Updated)

1. Copy all 29 unchanged files from `changes/src/` into client repo
2. Apply the 3 REVISED files (focus-store v2 additive, grid-actions trimmed, static-renderer rebased)
3. Apply remaining modified-reference files (dynamic-renderer, tab-layout, header)
4. Configure bridges (ee-call, tree-fetch, unload-cancel) in main.tsx
5. Add remaining merge points (FormRenderer, root layout, field-renderer blur, command.ts)
6. `npx tsc --noEmit` → fix drift → `npm run dev`

---

## Store Dependencies — Updated Status

| Store | Status after team commit |
|-------|------------------------|
| session-store | Confirmed |
| tree-store | Confirmed |
| global-vars-store | Confirmed (team now dispatches typed flags to it) |
| runtime-override-store | Confirmed (team added readOnly/required fields) |
| focus-store | **NOW EXISTS** on branch (team created it — simpler than our v2) |
| combo-options-store | **NOW EXISTS** on branch (team created it) |
| grid-store | **CONFIRMED EXISTS** (team imports GridRow from it) |
| menu-store | Still unconfirmed |
| browser-cmd-store | Confirmed |
| modal-store | Confirmed |
| navigation-store | Confirmed |
