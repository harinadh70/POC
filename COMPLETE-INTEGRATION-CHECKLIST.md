# COMPLETE Integration Checklist — window_onload + Main_ISLLSYS shell gaps

Everything to apply to the client repo (`aqs-web-ui`), in order, from zero.
Nothing from earlier attempts is required — this list is self-sufficient.

---

## STEP 0 — Clean start

```bash
git stash list          # your earlier attempt is stashed — LEAVE it as backup, do not pop
git checkout -b window-onload-and-shell-gaps
```

---

## STEP 1 — Copy NEW files (32 files, zero risk — nothing existing is touched)

### 1a. ALL new files live in ONE place now:
### `POC/main-isllsys-complete/changes/src/` → client repo `src/`

Copy the WHOLE `src/` tree — 32 files (window_onload set + shell set):
`stores/` (focus-store v2, pristine-store), `hooks/` (use-page-init,
use-page-load-timing, use-edit-loop, use-dirty-guard, use-focus-roundtrip,
use-document-title, use-unload-cancel), `utils/` (page-init-rules,
required-gate, confirm, security-resolver, node-key, tree-actions,
refresh-actions, app-logout, deferred-navigation, show-zero-text),
`services/` (ee-call, async-check, umbrella-status), `components/`
(breadcrumb, action-toolbar, ui/dual-list), `handlers/common/` (info-button,
isllsys-handlers), `features/` (tree/delete-action, grid/grid-actions,
modals/×2, notes/).

Notes:
- `stores/focus-store.ts` (v2) — this CREATES the focus store the repo lacks
  (it also supersedes the v1 pasted during the earlier session, if present).
- `utils/refresh-actions.ts` imports `@/stores/menu-store` and `@/stores/grid-store`.
  CHECK FIRST that both exist under `src/stores/` — if either is missing, HOLD this
  one file back and ask for paste-ready stores (like focus-store was provided).

### 1b. The 4 replaceable existing files — complete versions available

`POC/main-isllsys-complete/changes/modified-reference/` holds COMPLETE ready
versions of `static-renderer.tsx`, `dynamic-renderer.tsx`, `tab-layout.tsx`,
`header.tsx` with every change marked `>>> GAP`. Either:
- **replace** your branch's file with the reference version (dual exports +
  defensive access are built in), or
- **lift only the `>>> GAP` blocks** into your file if yours has extra logic.

If a wholesale replace throws (missing import your branch doesn't have),
fall back to lifting the GAP blocks — same content, zero risk.

---

## STEP 2 — Merge points in EXISTING files

2a/2b/2c/2g are ALREADY DONE if you used the complete files from
`modified-reference/` in STEP 1b — skip to 2d/2e/2f/2h in that case.
The snippets below remain for the lift-only-the-blocks route.

### 2a. `src/components/header.tsx` — 3 additions (GAP 7 timing)
```tsx
// with the imports:
import { usePageLoadTiming } from '@/hooks/use-page-load-timing';
// inside the Header component:
const timing = usePageLoadTiming();
// in the JSX, just BEFORE the Logout button (add Typography to the MUI import if missing):
{timing !== null && (
    <Typography variant="caption" sx={{ color: 'text.secondary', mr: 2, fontFamily: 'monospace' }}>
        {timing}ms
    </Typography>
)}
```

### 2b. `src/features/frame/components/static-renderer.tsx` (inside SchemaRenderer)
```tsx
// imports:
import { useEffect } from 'react'; // if not present
import { usePageInit } from '@/hooks/use-page-init';
import { Breadcrumb } from '@/components/breadcrumb';
import { PristineStoreApi } from '@/stores/pristine-store';

// after `schema` is available:
const showNextOnEdit = schema?.pageHeader?.showNextOnEdit as string | undefined;
usePageInit(showNextOnEdit, schema);

// after defaultValues is computed:
useEffect(() => {
    PristineStoreApi.getState().actions.captureAll(defaultValues);
}, [defaultValues]);

// breadcrumb inputs + element rendered ABOVE <FormRenderer>:
const pathStart = schema?.pageHeader?.pathstart as number | string | undefined;
const pathEnd = schema?.pageHeader?.pathend as number | string | undefined;
const hasPathLabelControl = mergedFields.some((f) => f.matchcode?.toLowerCase() === 'pathlabel');
// JSX:
<Breadcrumb pathStart={pathStart} pathEnd={pathEnd} hasPathLabelControl={hasPathLabelControl} />
```

### 2c. `src/features/frame/components/dynamic-renderer.tsx`
Same as 2b MINUS the Breadcrumb parts (dynamic pages have no path labels):
`usePageInit(showNextOnEdit, schema)` + the `captureAll` effect.

### 2d. FormRenderer (`src/components/ui/form-renderer.tsx`) — 1 line inside its RHF provider
```tsx
import { EditLoopBridge } from '@/hooks/use-edit-loop';
// inside the <FormProvider>/<form> tree:
<EditLoopBridge fields={mergedFields} />
```

### 2e. Root layout (the component that wraps all routes) — 3 lines
```tsx
import { useDirtyGuard } from '@/hooks/use-dirty-guard';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { useUnloadCancel } from '@/hooks/use-unload-cancel';
// first lines of the component:
useDirtyGuard();
useDocumentTitle();
useUnloadCancel();
```

### 2f. `src/components/ui/field-renderer.tsx` — focus round-trip wiring
```tsx
import { useFocusRoundtrip } from '@/hooks/use-focus-roundtrip';
// in the component (runCommands = the repo's bound handlerForBrowserCommands):
const { onFieldFocus, onFieldBlur } = useFocusRoundtrip(schema, context, runCommands);
// on the input element:
onFocus={(e) => onFieldFocus(matchcode, e.target.value)}
onBlur={(e) => void onFieldBlur(matchcode, e.target.value)}
```

### 2g. `src/layouts/tab-layout.tsx` — additive block
```tsx
import { useEffect, useRef } from 'react'; // merge into existing import
import { FocusStoreApi, usePendingTab, useFocusActions } from '@/stores/focus-store';

// add props: initialTab?: number; onTabClick?: (i: number) => void;

// one-time init (session tab preselect + Cancel focus + forced tab handler):
const didInitRef = useRef(false);
useEffect(() => {
    if (didInitRef.current || !initialTab) return;
    didInitRef.current = true;
    setActiveTab(initialTab);
    FocusStoreApi.getState().actions.requestFocus('dtaCancel');
    onTabClick?.(initialTab);
}, [initialTab, onTabClick]);

// switch tab BEFORE focusing when a focus request targets another tab (#79):
const pendingTab = usePendingTab();
const focusActions = useFocusActions();
useEffect(() => {
    if (pendingTab === null) return;
    setActiveTab(pendingTab);
    focusActions.clearTab();
}, [pendingTab, focusActions]);
```

### 2h. `src/handlers/common/command.ts` — 2 small blocks
```ts
import { onModalClosed } from '@/handlers/common/isllsys-handlers';
import { executeDeleteAction } from '@/features/tree/delete-action';

// in the CLOSE_MODAL branch, after the modal closes:
onModalClosed((next) => {
    // run the deferred navigation with the repo's own navigation mechanism:
    // e.g. handlers.onNavigateCycling?.(next.action, next.nodeKey)
});

// in (or add) the DELETE verb branch:
void executeDeleteAction(command.value ?? '', { navigate: handlers.onNavigate });
```

---

## STEP 3 — One-time startup configuration (e.g. main.tsx)

```ts
import { configureEECall } from '@/services/ee-call';
// wire the repo's REAL service + payload builder (names per your branch):
configureEECall({
    post: (payload) => xmlServerCall(payload),
    buildPayload: (args) => handlerForEEData(args),
});
// optional, when those features are exercised:
// configureTreeFetch((branchKey) => treeService.fetchBranch(branchKey));
// configureUnloadCancel('/api/v1/ui/data');
```
Until configured, all server-dependent features warn in console and no-op —
the app runs either way.

---

## STEP 4 — Verify

```bash
npx tsc --noEmit     # fix any type drift it reports
npm run dev
```

Error playbook (from last session's experience):
- "does not provide an export named X" → open the named file, add at the bottom:
  `export { X };` and `export default X;`
- "Failed to resolve import @/stores/menu-store (or grid-store)" → that store
  doesn't exist on your branch → remove/hold `refresh-actions.ts`, request the store file.
- Blank page → F12 → Console → photo the red error.

Feature tests once running:
1. ADD-mode page → dirty flag set; EDIT/INQUIRY → clean
2. EDIT + ShowNextOnEdit "T"/"F" → Next disabled/hidden
3. Page with pathstart/pathend → breadcrumb appears (also after hard reload)
4. Required field empty → OK/Next greyed; fill → enabled
5. Change a field → tab out → server call fires (after Step 3 config)
6. Dirty page → navigate away → confirm dialog
7. Navigate between pages → ms timing next to Logout
8. document.title shows windowtitle + policy + insured

## Minimum viable subset (if time-boxed)
The 5 window_onload files (page-init-rules, use-page-init, use-page-load-timing, breadcrumb, umbrella-status) + focus-store v2 from changes/src/ + merge points 2a/2b/2c → that alone
delivers the complete window_onload behavior. Everything else can land after.
