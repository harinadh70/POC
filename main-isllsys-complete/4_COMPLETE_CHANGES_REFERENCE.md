# Complete Changes Reference — Single File

Everything you need to implement, in one place.
Each row tells you: what the legacy VBS does, what React file to create/modify, and what it should do.

**Source:** Main_ISLLSYS_20010101.vbs (~9,090 lines, 85 routines)
**Target:** aqs-web-ui (hitanshu/experimental branch)
**Team commit 885a1365 already covers:** combo-options-store, focus-store (basic), SET_READONLY/SET_REQUIRED/SET_FOCUS/LOAD_GRID/CLEAR_GRID verbs, grid row-click, onFocus bindings in field-renderer

---

## STEP 1 — NEW FILES (copy as-is from `changes/src/` into client repo `src/`)

### Priority 1 — Core Edit Loop

| # | React File to Create | VBS Routine | What the VBS Does | What the React File Does |
|---|---------------------|-------------|-------------------|-------------------------|
| 1 | `stores/pristine-store.ts` | #77 SetInitialValueData (line 8292) + #55 SelectControlFocus (line 4903) | Captures every control's value at page load as a "pristine baseline". On focus, re-captures the field's baseline. Compares current vs baseline to detect dirty. | Zustand store with `captureAll(values)` at page load, `capture(matchcode, value)` on focus, `isDirty(matchcode, value)` comparator, `dirtyFields()` getter, `clear()` reset. |
| 2 | `utils/required-gate.ts` | #48 SetRequiredControl (line 4217) + #49 CheckAllRequiredControls (line 4261) | Loops all controls with `required=true`, checks if their value is empty. If ANY required field is empty, disables the OK and NEXT buttons. | `evaluateRequiredGate(fields, getValues)` returns true/false. `applyRequiredGate(fields, getValues)` sets `disabled` on dtaOK/dtaNEXT via RuntimeOverrideStoreApi. `runRequiredGate()` combines both. |
| 3 | `hooks/use-edit-loop.ts` | #71 ControlInputCheck (line 7197) + #72 ControlInputChange (line 7267) | On every keystroke/change: if a required field flips between empty↔non-empty, re-evaluates the required gate. If any field changes, latches `mblnDataChanged = true`. | Hook using react-hook-form `useWatch` to watch all field values. On empty↔non-empty flip of a required field, calls `runRequiredGate()`. On any value change, calls `GlobalVarsStoreApi.setDataChanged(true)`. Exports `<EditLoopBridge fields={mergedFields} />` component for 1-line mount inside FormProvider. |
| 4 | `hooks/use-dirty-guard.ts` | #38 window_onbeforeunload (line 2876) | When user tries to close/navigate away while `mblnDataChanged` is true, shows "You have unsaved changes" confirm dialog. If they cancel, blocks navigation. | `beforeunload` event listener + React Router `useBlocker()`. Reads `dataChanged` from GlobalVarsStore. Shows `window.confirm()` dialog. Clears `dataChanged` if user confirms leave. Mount in root layout. |
| 5 | `hooks/use-focus-roundtrip.ts` | #70 SelectControlFocus (line 7085) + #74 SelectControlExit (line 7477) | On field FOCUS: captures baseline value, runs pre-process server call if configured. On field BLUR: if value changed from baseline AND field has a server call configured, posts to server, runs returned commands, updates baseline. This is the heart of the edit loop. | Hook returning `{ onFieldFocus, onFieldBlur }`. `onFieldFocus(matchcode, value)`: captures pristine baseline via PristineStoreApi, runs pre-process binding if schema declares one. `onFieldBlur(matchcode, value)`: if dirty vs baseline AND field has postProcessAction, calls `postEECall()`, runs returned commands via `handlerForBrowserCommands`. Wire onto input's onFocus/onBlur in field-renderer. |
| 6 | `services/ee-call.ts` | (infrastructure) | Legacy `xmlServerCall` / `handlerForEEData` pattern — all server posts go through these two functions. | Configurable bridge: `configureEECall({ post, buildPayload })` — wired once at app startup with the repo's real xmlServerCall + payload builder. `postEECall(args)` and `postRaw(payload)` — warn and no-op until configured. Zero coupling to client branch internals. |

### Priority 2 — Features

| # | React File to Create | VBS Routine | What the VBS Does | What the React File Does |
|---|---------------------|-------------|-------------------|-------------------------|
| 7 | `utils/security-resolver.ts` | #45 SetControlAttributes (line 3830) + #58-61 GetSecurity* (line 5250+) | At page load, walks the permission tree for the current LOB/page. For each control, resolves visible/disabled/readonly from the permission node. Two modes: "allow" (missing = allowed) and "deny" (missing = hidden+disabled). | `resolveControlSecurity(permissions, lob, page, object, mode)` returns `{ visible, disabled, readOnly }`. `applySecurityPolicy(permissions, lob, page, fields)` loops all fields and sets RuntimeOverrideStore overrides. Handles both flat-array and nested-object permission shapes. |
| 8 | `features/tree/delete-action.ts` | #19 tree_onDelete (line 1114) | User clicks Delete on tree node: confirm dialog → server DELETE call → remove node from tree store → refresh parent branch → navigate to parent. | `executeDeleteAction(nodeKey, { navigate })`: shows `confirmDialog()` → posts DELETE via `postEECall` → `TreeStoreApi.removeNode(nodeKey)` → refetches parent branch → `navigate()` to parent route. |
| 9 | `features/grid/grid-actions.ts` | #66 ListButtonClick (line 6553) + #68 ListButtonOnClick (line 6609) | Grid toolbar actions: DELETE confirms first, then posts. NEXT loops over every selected row posting each one. | **REVISED** (team already handles row-click + LOAD/CLEAR_GRID). This file only has `executeGridAction(gridId, action, rows, opts)`: DELETE → confirm → post each row; NEXT → post each selected row in sequence; runs returned commands after each. |
| 10 | `handlers/common/info-button.ts` | #65 InfoButtonClick (line 6510) | Info/lookup button click: reads calltype from the button's schema, posts to server with the calltype, runs returned commands. | `handlerForInfoButton(calltype, context)`: posts via `postEECall({ callType: calltype })`, runs returned commands via `handlerForBrowserCommands`. |
| 11 | `utils/deferred-navigation.ts` | #43 SetNextAction (line 3392) | When a modal is about to open, stashes the "next action" (navigation target) so it can be executed AFTER the modal closes. | Self-contained micro-store: `setNextAction(action, nodeKey)` stashes, `drainNextAction()` returns and clears. Called from CLOSE_MODAL handler after modal closes. |
| 12 | `features/modals/batch-edits-modal.tsx` | #10 BatchEdits (line 574) | Shows batch edit dialog: table of batch edit rows with checkboxes. | MUI Dialog with DataGrid showing batch edit rows. Reads data from session xmlDetail. |
| 13 | `features/modals/conversion-report-modal.tsx` | #11 ConversionReport (line 618) | Shows conversion report on first navigation to a converted policy. Show-once per session. | MUI Dialog. Uses session xmlDetail flag to prevent re-showing. |
| 14 | `features/notes/notes-modal.tsx` | #64 NotesButton (line 6445) | Notes button: opens notes list dialog, allows adding new notes. | MUI Dialog with notes list + add form. STUB level — needs NOTES calltype shape confirmed. |

### Priority 3 — Polish

| # | React File to Create | VBS Routine | What the VBS Does | What the React File Does |
|---|---------------------|-------------|-------------------|-------------------------|
| 15 | `hooks/use-document-title.ts` | #17 SetFrameTitle (line 992) | Sets `document.title` to `windowtitle - policyNumber - primaryInsured`. | `useEffect` reading `windowTitle`, `policyNumber`, `primaryInsured` from SessionStoreApi. Sets `document.title`. Mount in root layout. |
| 16 | `utils/node-key.ts` | #36 ReplaceExpiredNumber (line 2594) + #23 (lobFromNodeKey) | Replaces "EXPIRED" in nodeKey with actual policy number. Extracts LOB code from nodeKey (BOP uses 4th/5th element, others use 3rd). | `replaceExpiredNumber(nodeKey, policyNumber)` string replace. `lobFromNodeKey(nodeKey)` splits by `\|` and returns element 2 (or 3+4 for BOP). |
| 17 | `utils/tree-actions.ts` | #18 tree_onExpand (line 1041) + #34 SelectTreeNode (line 2301) + #35 XMLBrowser_SelectTreeNode (line 2505) + #84 RefreshSearchPageList (line 8847) | Tree operations: check if node exists, select + navigate, update node icon, refresh a branch. | `hasNode(nodeKey)`, `selectNodeAndNavigate(nodeKey, navigate)`, `updateNodeIcon(nodeKey, icon)`, `refetchBranch(parentKey)`. Uses `configureTreeFetch()` for the branch fetcher. |
| 18 | `utils/refresh-actions.ts` | #4 ClearActionMenus (line 389) + #37 RefreshSearchPageLists (line 2828) | Clears action menu items, refreshes search page grid/list data. | `clearActionMenus()` → MenuStoreApi.clearItems(). `refreshSearchPageLists()` → GridStoreApi.refreshAll(). **Note:** depends on menu-store (unconfirmed on branch). |
| 19 | `utils/app-logout.ts` | #7 Application_OnClose (line 455) + #8 Unload (line 504) | On logout/close: clears all global state, resets stores. | `resetAllStores()`: clears session, global-vars, runtime-override, pristine, tree stores. Call after the repo's own auth logout. |
| 20 | `services/async-check.ts` | #20 CheckForAsyncProcess (line 1153) | Before certain operations, checks if a background async process is running on the server. | `checkForAsyncProcess(sessionInfo)`: posts pre-flight check, returns boolean. |
| 21 | `utils/show-zero-text.ts` | #83 ShowZeroLabel (line 8838) | Determines the display text for a combo box's "zero" (empty) option. "F"/undefined → null (no zero option), "T" → "" (blank option), anything else → that string as the label. | `showZeroLabel(flag)`: "F"/undefined → null, "T" → "", else → the string. Used by combo field rendering. |
| 22 | `utils/confirm.ts` | #42 (reused) | Legacy `MsgBox` with Yes/No buttons. | `confirmDialog(message)`: returns `Promise<boolean>` via `window.confirm()`. Can be swapped to modal-store dialog later. |
| 23 | `components/action-toolbar.tsx` | #25 EnableDisableControls (line 1659) + #41 toolbar logic | Toolbar buttons (OK, Next, Cancel, etc.) that reactively enable/disable based on runtime overrides. | MUI ButtonGroup subscribing to `useRuntimeOverride` per button matchcode. Buttons hidden/disabled reactively. |
| 24 | `components/ui/dual-list.tsx` | #53 SelectionListFunctions (line 4843) | Two-panel transfer list: Available items ↔ Selected items, with Add/Remove buttons and optional max-selected limit. | MUI List-based transfer component with `maxSelected` prop. |
| 25 | `handlers/common/isllsys-handlers.ts` | #15 NavigateBackToSearch (line 851) + #75 RunXmlBrowserProcedures (line 7759) + #43 drain | Navigate back to search page, run procedures by calltype, execute deferred navigation after modal close. | `navigateBackToSearch(navigate)`, `runXmlBrowserProcedures(callType, context)`, `onModalClosed(execute)` — calls `drainNextAction()` and runs the deferred navigation. |
| 26 | `hooks/use-unload-cancel.ts` | #39 CancelChanges (line 3007) | When dirty page is abandoned (pagehide/visibilitychange), sends a CANCEL beacon to the server so it can discard the pending transaction. | `sendBeacon` on `pagehide` event when `dataChanged` is true. Configurable endpoint via `configureUnloadCancel(url)`. Mount in root layout. |

### Window_onload Set (Eebrowser Gaps)

| # | React File to Create | VBS Routine | What the VBS Does | What the React File Does |
|---|---------------------|-------------|-------------------|-------------------------|
| 27 | `utils/page-init-rules.ts` | Eebrowser GAP 1+2 | On every page load: (1) sets `mblnDataChanged` based on action mode (ADD=true, EDIT/INQUIRY=false); (2) if `ShowNextOnEdit="T"` disables dtaNEXT, if `"F"` hides it. | `initDataChangedFlag(action)` sets GlobalVarsStore. `applyNextButtonRules(showNextOnEdit)` sets RuntimeOverrideStore on dtaNEXT. Only acts on explicit "T"/"F". |
| 28 | `hooks/use-page-init.ts` | Eebrowser GAP 1+2 | Runs both init rules when a page loads/navigates. | Hook taking `showNextOnEdit` + `pageKey` (schema object identity). Calls both rule functions. Re-fires on navigation even if renderer stays mounted. |
| 29 | `components/breadcrumb.tsx` | Eebrowser GAP 3 + #30 PathDescription | Builds a breadcrumb from tree ancestry: Root > Branch > ... > Current. Uses pathstart/pathend from schema to determine which levels to show. | Component subscribing to TreeStoreApi with selector hooks. `toLevel()` normalizes string/number. Shows `Typography` segments (not Links). Renders above FormRenderer in static-renderer. |
| 30 | `hooks/use-page-load-timing.ts` | Eebrowser GAP 7 | Measures how long the page took to load (navigation start → idle). Displays "123ms" next to Logout. | Hook using `useNavigation()` from react-router. Captures start time on navigation state change, calculates duration when idle. Returns `number | null`. |
| 31 | `services/umbrella-status.ts` | Main window_onload sub-gap | Checks umbrella mapping status for the policy. | `fetchUmbrellaMappingStatus(policyId)`: stub that returns early if policyId is "0". |

---

## STEP 2 — MERGE into EXISTING FILES (small marked additions)

### Focus-store (ADDITIVE — add pendingTab to team's existing file)

| File to Modify | What to Add | Why |
|---------------|------------|-----|
| `stores/focus-store.ts` (team's) | Add `pendingTab: number \| null` to state, `clearTab()` action, `requestFocus` takes optional `tabIndex` param, export `usePendingTab` selector | VBS #79: SET_FOCUS sometimes targets a control on a different tab — must switch tab first, then focus |

### Modified Reference Files (4 existing files — use `>>> GAP` blocks)

| File to Modify | Reference in `modified-reference/` | Changes to Merge |
|---------------|-----------------------------------|-----------------|
| `features/frame/components/static-renderer.tsx` | `static-renderer.tsx` | Add `usePageInit(showNextOnEdit, schema)` + `<Breadcrumb />` + `PristineStoreApi.captureAll(defaultValues)`. **NOTE:** team already added `isFirstRender` guard (885a1365) — keep it, add ours alongside. |
| `features/frame/components/dynamic-renderer.tsx` | `dynamic-renderer.tsx` | Add `usePageInit(showNextOnEdit, schema)` + `PristineStoreApi.captureAll(defaultValues)` (same as static minus Breadcrumb). |
| `layouts/tab-layout.tsx` | `tab-layout.tsx` | Add `initialTab`/`onTabClick` props + init effect (preselect tab + focus Cancel) + `usePendingTab()` subscriber to switch tab before focus. |
| `components/header.tsx` | `header.tsx` | Add `usePageLoadTiming()` hook + timing display (`{timing}ms`) next to Logout button. |

### Other Existing File Merge Points

| File to Modify | What to Add | Code |
|---------------|------------|------|
| `components/ui/form-renderer.tsx` | Mount the edit loop bridge inside FormProvider | `import { EditLoopBridge } from '@/hooks/use-edit-loop';` then `<EditLoopBridge fields={mergedFields} />` inside the form tree |
| Root layout (wraps all routes) | Mount 3 global hooks | `useDirtyGuard(); useDocumentTitle(); useUnloadCancel();` as first lines of component |
| `components/ui/field-renderer.tsx` | Wire focus roundtrip onto inputs | `const { onFieldFocus, onFieldBlur } = useFocusRoundtrip(schema, context, runCommands);` then `onFocus={e => onFieldFocus(matchcode, e.target.value)}` and `onBlur={e => void onFieldBlur(matchcode, e.target.value)}` on the input |
| `handlers/common/command.ts` | Add CLOSE_MODAL drain + DELETE verb | In CLOSE_MODAL branch: `onModalClosed((next) => { /* deferred nav */ });` In/add DELETE case: `void executeDeleteAction(cmd.addinf, { navigate });` |

---

## STEP 3 — ONE-TIME STARTUP CONFIG (main.tsx or root loader)

```ts
import { configureEECall } from '@/services/ee-call';

configureEECall({
    post: (payload) => xmlServerCall(payload),       // repo's real function
    buildPayload: (args) => handlerForEEData(args),  // repo's real function
});

// Optional (when those features are exercised):
// configureTreeFetch((branchKey) => treeService.fetchBranch(branchKey));
// configureUnloadCancel('/api/v1/ui/data');
```

---

## STEP 4 — VERIFY

```bash
npx tsc --noEmit     # fix any type drift
npm run dev           # run and test
```

**Test checklist:**
1. ADD-mode page → dirty flag set; EDIT/INQUIRY → clean
2. EDIT + ShowNextOnEdit "T" → Next disabled; "F" → Next hidden
3. Page with pathstart/pathend → breadcrumb appears
4. Required field empty → OK/Next greyed; fill → enabled
5. Change a field → tab out → server call fires (after Step 3 config)
6. Dirty page → navigate away → confirm dialog
7. Navigate between pages → ms timing next to Logout
8. document.title shows windowtitle + policy + insured

---

## Quick Count

| Category | Files | Status |
|----------|-------|--------|
| New files to copy | 31 | Copy from `changes/src/` |
| Existing files to merge into | 8 | Small `>>> GAP` additions |
| Startup config | 1 | `configureEECall` in main.tsx |
| **Total files touched** | **40** | |
