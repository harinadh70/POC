# Reconciliation — Team commit `81e0b7ea` vs. gap-change files

**Team commit:** `81e0b7ea408b1aaa0acccfa6547e0c5755c5b6c9` — "Merge branch 'experimental'"
**Author:** Solanki, Ravi · **Branch:** experimental · **PR:** !30196 · repo `dev.azure.com/TMNAServices/AQS/_git/aqs-web-ui`
**Source:** 94 Azure DevOps commit-diff photos (IMG_5916–6010) in `Downloads/Real POC/`.

The commit is a large **store-consolidation refactor** plus a **page-init data-threading** pass. Below is exactly what it changed, which of our gaps it closed, what it newly **broke**, and what remains.

---

## 1. What the team changed (20 files)

**Store unification (the headline):** three stores are **deleted** and folded into `global-vars-store.ts` (`-21 / +228`):
- ❌ `stores/browser-cmd-store.ts` → `commandsEnabled` + `isExecuting`
- ❌ `stores/combo-options-store.ts` → `comboOptions` + `setOptions`/`addOption`/`clearOptions`
- ❌ `stores/focus-store.ts` → `pendingFocus`/`focusTarget`/`isFocusProgrammatic`/`previousMatchcode`/`__focusImpl`/`__selectImpl` + `requestFocus`/`clearFocus`/`registerFocusImpl`/`registerSelectImpl`/`setPreviousMatchcode`

New unified action surface: `type AllActions = GlobalVarsActions & ComboOptionsActions & FocusActions & BrowserCmdActions`. Store factory now `create<GlobalVarsState>()((set, get) => …)`. New derived selectors `selectInquiryMode` / `selectReadOnly`.

**Consumers repointed to `GlobalVarsStoreApi`:** `command.ts`, `form-action-executor.ts` (imports + `onComboUpdate`/`onSetFocus` callbacks + `setCommandsEnabled(true)`), `field-renderer.tsx`, `tab.tsx`, both loaders.

**Page-init data threading (`tab` / `pathLabel` / `firstcontrol`):**
- `routes/context.ts` — `NavigationRouterContextValue` gains `tab?: number` and `pathLabel?: string | null`.
- `services/page-layout.ts` — Zod schema + transform gain `firstcontrol`.
- `features/frame/utils/loader.ts` — both loaders now: (a) **ADD-mode `dataChanged` auto-flag** (`isAddMode = !['EDIT','INQUIRY','SELECT'].includes(action)` → `setDataChanged`/`clearDataChanged`), comment says *"mirrors second_window_onload Step 5"*; (b) return `pathLabel`, `initialTab: ctx.tab ?? 0`, `firstcontrol`; (c) `tab: String(ctx.tab ?? 0)` in the pageLayout call.
- `dynamic-renderer.tsx` / `static-renderer.tsx` — render a **`pathLabel` header Box** and pass `initialTab` + `firstcontrol` to `SchemaRenderer`.
- `schema-renderer.tsx` — new `useEffect` calling `GlobalVarsStoreApi…requestFocus(firstcontrol)`; passes `initialTab` to `FormRenderer`; unmount clears `RuntimeOverrideStore` **and `PristineStoreApi`**.
- `form-renderer.tsx` — `initialTab` prop threaded into `renderLayout()` → `<TabLayout initialTab=… />`.
- `utils/execute-action.ts` — `ExecuteActionResult` + `setSession` + `updatedContext` + return gain `initialTab`/`tab`/`pathLabel`.
- `session-store.ts` (`pathLabel: ''`) and `types/common.ts` (`pathLabel: string | null`).

**Other:** `menu-store.ts` — `isMenuLoaded` removed; menu-loaded now owned by `NavigationStore` (`useIsMenuLoaded` reads `NavigationStoreApi`). `use-browser-commands.ts` — **new hook** (`setCommandsEnabled(true)` + `handlerForBrowserCommands`, dedupe by array ref). `modal.tsx` — import cleanup. `pol-piphpol-20150801.json` — `componentName` casing + verbose `gridColumns`.

---

## 2. Gaps the team CLOSED → our change files removed

| Gap | Team's implementation | Our file (removed) |
|-----|----------------------|--------------------|
| **#30** PathDescription / breadcrumb | `pathLabel` header Box in both renderers, threaded end-to-end (context → loader → renderer) | `components/ui/breadcrumb.tsx` |
| **#77 / #55** pristine snapshot / dirty baseline | `PristineStoreApi` (`@stores/pristine-store`) — cleared on unmount in schema-renderer | `hooks/use-pristine-snapshot.ts` |
| **#54** FocusFirstControl | `schema-renderer` `useEffect` → `requestFocus(firstcontrol)`; `firstcontrol` added to page-layout Zod + loader return | (was already noted DONE) |
| **Eebrowser ADD-mode dirty init** | loader.ts `isAddMode` → `setDataChanged`/`clearDataChanged` | (was an Eebrowser-side gap) |
| **Tab selection from cycling (`mqsTab`)** | `tab`/`initialTab` threaded context → loader → FormRenderer → TabLayout | (was already noted DONE) |
| **#70 / #74** focus round-trip (partial) | store `requestFocus`/`pendingFocus`/`registerFocusImpl`/`isFocusProgrammatic` + pre-existing `use-focus-roundtrip` hook | field-renderer focus parts now redundant (see §4) |

> **Verify:** `pristine-store` is referenced but its own file was not in these photos. Confirm it derives dirty state (compare-to-baseline) before treating #77 fully closed; otherwise re-introduce the snapshot hook.

---

## 3. Gap the team NEWLY BROKE → **necessary fix applied**

**#79 SetControlFocus tab-switch — compile-breaking.**
`tab.tsx` (changed in the same commit, IMG_5944) imports:
```ts
import { usePendingTab, useFocusActions } from '@stores/global-vars-store';
```
but the unification **dropped** `pendingTab` / `setPendingTab` / `clearPendingTab` / `usePendingTab` from the old focus-store and did **not** re-export them from `global-vars-store` (verified on the file tail, IMG_5995, lines 312–333: focus selectors are only `usePendingFocus` / `useFocusState` / `useFocusActions`).

➡️ **TypeScript TS2305 "Module has no exported member 'usePendingTab'"**, and the tab-switch-before-focus behavior is dead.

**Fix:** `src/stores/global-vars-store.patch.ts` — re-adds the four dropped pieces (state `pendingTab`, actions `setPendingTab`/`clearPendingTab`, selector `usePendingTab`) into the team's existing focus sections, with exact insertion anchors by line number. Restores compilation and the legacy SetControlFocus behavior with the API surface `tab.tsx` already imports.

---

## 4. Change files that must be REBASED onto the new store API

These stay valid gaps but their store touch-points moved from the deleted stores to `GlobalVarsStoreApi`:

| File | Rebase needed |
|------|---------------|
| `components/ui/field-renderer.tsx` | Team already repointed imports to `@stores/global-vars-store` and wired the focus round-trip. Our `postprocessblanks` / keystroke-recompute additions must layer onto the team's version; the focus-roundtrip parts are now redundant. |
| `handlers/common/command.ts` | Team changed `commandStore` source to `GlobalVarsStoreApi.getState()`. Our new `SET_ICON` / `OPEN_LINK` verbs rebase onto that file (verbs themselves untouched by the team). |
| `stores/session-store.ts` | Team added `pathLabel`. Our change added `pathLabel` **and** `windowTitle` — keep only `windowTitle` (for #17 frame title); drop the duplicate `pathLabel`. |

---

## 5. Gaps UNAFFECTED by this commit (change files still valid as-is)

`#38` use-navigation-guard (now more useful — `dataChanged` is actually set by the loaders) · `#48/#49` use-required-gate · `#17` use-frame-title (pathLabel now in session-store; still needs `document.title` + `windowTitle`) · `#20` use-async-process-check · `#19` use-delete-action · `#45` security-resolver · `#66/#68` grid-toolbar + data-grid · `#67` data-grid row staging · `#64` notes + note-modal · `#65` info-lookup · `#83` select showZero · `#10` batch-edits · `#11` conversion-report · `#25` action-toolbar · `#53` dual-list-select · `#37` str-wip-subframe · `#34` tree-store isNodeValid · `#29` str-piphsys EnableStartOptions.

---

## 6. Net effect on the gap count

- **Closed by team:** #30, #54, #77/#55, Eebrowser ADD-mode dirty, tab-from-cycling, and most of #70/#74 → **~5 gaps** off the list.
- **Newly broken → fixed here:** #79 (`global-vars-store.patch.ts`).
- **Rebase-only:** field-renderer, command.ts, session-store.
- **Remaining gaps unchanged:** the 18 listed in §5.

Bottom line: the team's refactor is a net improvement (unified store, real page-init threading, ADD-mode dirty, first-control focus, path label) that closes several of our gaps — but it shipped one compile-breaking regression (`usePendingTab`), which the patch here fixes.
