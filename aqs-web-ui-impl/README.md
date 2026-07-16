# aqs-web-ui-impl — Window OnLoad Gap Implementation

Files in this folder implement the 8 gaps identified in the window_onload analysis
(7 from Eebrowser + 1 from Main_ISLLSYS). Drop these into the actual POC to close
all window_onload gaps without modifying any existing logic.

## Files

### New files (copy into actual POC as-is)

| File | Gap(s) | What it does |
|------|--------|-------------|
| `src/utils/page-init-rules.ts` | GAP 1, GAP 2 | `initDataChangedFlag()` — sets dataChanged/ratingDataChanged based on action mode (exact equality check against EDIT/INQUIRY/SELECT). `applyNextButtonRules()` — disables ("T") or hides ("F") dtaNEXT; any other value is a no-op. Re-add detection via xmlDetail. |
| `src/hooks/use-page-init.ts` | GAP 1, GAP 2 | Hook that runs both init rules per page. Takes a `pageKey` (the schema object) so re-init fires on every navigation, even when the renderer stays mounted. |
| `src/components/breadcrumb.tsx` | GAP 3 | Breadcrumb trail from tree ancestry using pathstart/pathend. Subscribes to session/tree stores with selector hooks so the trail appears when the async tree load lands. Segments render as Typography (labels, not links). |
| `src/services/umbrella-status.ts` | Main_ISLLSYS GAP | `fetchUmbrellaMappingStatus()` — stub for umbrella mapping check, guarded by the VBS rule `policyId <> "0"`. Wire to actual API when endpoint is confirmed. |
| `src/hooks/use-page-load-timing.ts` | GAP 7 | Measures navigation start-to-idle duration via React Router's `useNavigation()`. startTime kept in a ref to avoid a re-render loop. |

### Modified files (replace corresponding files in actual POC)

| File | Gap(s) | Changes from original |
|------|--------|-----------------------|
| `src/features/frame/components/static-renderer.tsx` | GAP 1-3 | Added `usePageInit(showNextOnEdit, schema)` in `SchemaRenderer`. Added `Breadcrumb` above the form when schema defines pathstart/pathend. |
| `src/features/frame/components/dynamic-renderer.tsx` | GAP 1-2 | Added `usePageInit(showNextOnEdit, schema)`. No breadcrumb (dynamic pages don't use path labels). |
| `src/layouts/tab-layout.tsx` | GAP 4-6 | Added optional `initialTab` and `onTabClick` props (backward compatible — omitting them preserves original behavior). Cancel focus on non-first tab selection. Fires `onTabClick` after programmatic tab switch. Tab/panel ARIA wiring (`aria-controls`/`aria-labelledby`). |
| `src/components/header.tsx` | GAP 7 | Added timing display (ms) next to logout button using `usePageLoadTiming`. |

## Gap Summary

| # | VBS Source | Lines | Description | Status |
|---|-----------|-------|-------------|--------|
| 1 | Eebrowser window_onload | 172-187 | Init dataChanged flag based on action mode | DONE |
| 2 | Eebrowser window_onload | 224-280 | ShowNextOnEdit — disable/hide Next button | DONE |
| 3 | Eebrowser window_onload | 287-333 | Path label / breadcrumb from tree nodes | DONE |
| 4 | Eebrowser window_onload | 347-358 | Tab selection from session (mqsTab) | DONE |
| 5 | Eebrowser window_onload | 349 | Cancel button focus on tab switch | DONE |
| 6 | Eebrowser window_onload | 351 | Fire OnTabClickHandler after programmatic selection | DONE |
| 7 | Eebrowser window_onload | 374-379 | Menu timing update (UpdateInfo) | DONE |
| M1 | Main_ISLLSYS LoadFirstPage | 438-452 | Umbrella mapping status check | DONE (stub) |

## React Standards Notes

Decisions made to keep the code idiomatic React 19 / Zustand 5:

- **Subscribe in components, `getState()` in event/init code.** Breadcrumb uses
  selector hooks (`SessionStoreApi((s) => s.xmlDetail)`, `TreeStoreApi((s) => s.nodes)`)
  because it must re-render when the async tree load completes. The init rules in
  `page-init-rules.ts` use `getState()` because they run inside an effect at a
  point in time — the standard Zustand split.
- **Effects keyed on page identity, not prop value.** `usePageInit` takes the
  schema object as `pageKey`; React Router reuses the renderer element across
  same-route navigations, so a value-only dependency would skip re-init when two
  pages share the same `showNextOnEdit`.
- **Idempotent init effects.** Both rules write deterministic values, so
  StrictMode's double effect invocation is harmless.
- **Refs for non-render state.** `use-page-load-timing` keeps startTime in a ref
  (state would re-trigger the effect); `tab-layout` uses a ref guard for its
  one-time init.
- **Lazy state initializers.** `useState(() => new Set([initialTab]))` avoids
  allocating on every render.
- **A11y.** Tabs/panels get `aria-controls`/`aria-labelledby` pairs; breadcrumb
  segments are Typography, not anchor-less `<Link>` elements.

## Store APIs Used

All imports reference existing actual POC stores — no new stores created:

| Store | Import | Usage |
|-------|--------|-------|
| `session-store` | `SessionStoreApi` | selector hooks (`xmlDetail`, `nodeKey`) in Breadcrumb; `.getState().action` / `.actions.getXmlDetailItem()` in init rules |
| `global-vars-store` | `GlobalVarsStoreApi` | `.getState().actions.setDataChanged()`, `.setRatingDataChanged()` |
| `runtime-override-store` | `RuntimeOverrideStoreApi` | `.getState().actions.setOverride()`, `.clearAll()` |
| `tree-store` | `TreeStoreApi` | selector hook for `nodes` (flat `Record<string, TreeNode>` map) |
| `focus-store` | `FocusStoreApi` | `.getState().actions.requestFocus()` |

## Integration Steps

1. Copy the 5 new files into their respective paths in `aqs-web-ui-actual/`
2. Replace the 4 modified files (diff first to check for any actual-POC changes since this was written)
3. For tab-layout: pass `initialTab` from session store's tab value where `TabLayout` is used
4. For umbrella status: call `fetchUmbrellaMappingStatus()` in the navigation flow after first page load when policyId ≠ "0"
5. No new dependencies — all imports reference existing stores, types, and utilities

Note: this folder has no package.json — files are verified by inspection against
the reconstructed actual-POC types and stores. Final type-check happens when they
are dropped into the actual POC and `tsc`/Vite build runs there.
