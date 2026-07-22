// ============================================================================
// GAP #37: RefreshSearchPageLists (VBS lines 2842-2919)
// ============================================================================
//
// VBS BEHAVIOR:
//   Sub RefreshSearchPageLists() is called after save, delete, or submit
//   actions complete. It refreshes the WIP (Work In Progress) queue and
//   search result grids on the search page so they reflect the latest data:
//     1. If the search page window is still open:
//        a. Requery the WIP queue DataGrid (WIPQueue grid refetch)
//        b. Requery the policy search results grid (WIPPolicyList)
//     2. VBS used grid.Requery() which re-executed the grid's SQL source
//
// REAL POC STATUS:
//   - The WIP component (Str_WIP_Subframe) exists as a placeholder —
//     it renders the search/WIP layout but data fetching is stubbed.
//   - WIPQueue and WIPPolicyList exist in the schema as data grid matchcodes.
//   - The refresh-actions.ts (changes/src/utils/refresh-actions.ts) ALREADY
//     has refreshSearchPageLists(gridId) that calls GridStoreApi.invalidate.
//   - BUT: there is no trigger mechanism — nothing calls refreshSearchPageLists
//     after save/delete/submit navigation completes.
//
// FIX:
//   Wire the existing refreshSearchPageLists into the navigation completion
//   flow so WIP data auto-refreshes after save/delete/submit.
//
// WHERE TO MODIFY: data-strategy.ts or execute-action.ts (post-navigation)
//                  + Str_WIP_Subframe component (react to invalidation)
// ============================================================================

import { refreshSearchPageLists } from '@/utils/refresh-actions';

// ---------------------------------------------------------------------------
// STEP 1: Trigger refetch after save/delete/submit
// ---------------------------------------------------------------------------
// The key integration point is wherever the SAVE, DELETE, or SUBMIT action
// response is processed. After commands are applied and the tree is updated,
// call refreshSearchPageLists() to invalidate the WIP grid data.

/**
 * Actions that should trigger a WIP queue refresh.
 * VBS called RefreshSearchPageLists after these action types.
 */
const WIP_REFRESH_ACTIONS = new Set([
    'SAVE',
    'DELETE',
    'SUBMIT',
    'RATE',
    'ADD',
]);

/**
 * Call after an action's server response has been fully processed
 * (commands applied, tree updated, navigation complete).
 *
 * If the action type is one that modifies data visible in the WIP queue,
 * invalidate the grid so it refetches on next render.
 *
 * @param action - The action that just completed (e.g., "SAVE", "DELETE")
 */
export function triggerWipRefreshIfNeeded(action: string): void {
    const normalized = (action ?? '').trim().toUpperCase();

    if (WIP_REFRESH_ACTIONS.has(normalized)) {
        // Invalidate both WIP grids — the grid component will refetch
        // when it next renders (either immediately if mounted, or when
        // the user navigates back to the search page).
        refreshSearchPageLists('wipQueue');
        refreshSearchPageLists('wipPolicyList');
    }
}

// ---------------------------------------------------------------------------
// STEP 2: Integration in execute-action.ts / data-strategy.ts
// ---------------------------------------------------------------------------
//
// In the function that processes action responses (executeAction or the
// data-strategy handler), add the WIP refresh trigger:
//
//   import { triggerWipRefreshIfNeeded } from '@/utils/wip-refetch';
//
//   async function executeAction(action: string, ...args) {
//       // ... existing logic: build payload, call server, process commands ...
//
//       const response = await postAction(payload);
//       await processCommands(response.commands);
//
//       // >>> GAP #37: Refresh WIP grids after data-modifying actions
//       triggerWipRefreshIfNeeded(action);
//       // <<<
//
//       // ... continue with navigation ...
//   }

// ---------------------------------------------------------------------------
// STEP 3: WIP Grid Component — react to invalidation
// ---------------------------------------------------------------------------
//
// The Str_WIP_Subframe component (or whatever renders the WIP DataGrid)
// needs to refetch data when the grid store marks it as invalidated.
//
// Pattern using React Router v7 revalidation:
//
//   import { useRevalidator } from 'react-router';
//   import { GridStoreApi } from '@/stores/grid-store';
//
//   function WIPGrid({ gridId = 'wipQueue' }: { gridId?: string }) {
//       const revalidator = useRevalidator();
//       const isInvalid = GridStoreApi((s) => s.isInvalid?.(gridId) ?? false);
//
//       // When grid-store marks this grid as invalid, trigger revalidation
//       useEffect(() => {
//           if (isInvalid) {
//               revalidator.revalidate();
//           }
//       }, [isInvalid, revalidator]);
//
//       // ... render the data grid ...
//   }
//
// ALTERNATIVE pattern using manual refetch (no React Router dependency):
//
//   function WIPGrid({ gridId = 'wipQueue' }: { gridId?: string }) {
//       const [data, setData] = useState<GridRow[]>([]);
//       const isInvalid = GridStoreApi((s) => s.isInvalid?.(gridId) ?? false);
//
//       const fetchData = useCallback(async () => {
//           const result = await wipService.fetchQueue();
//           setData(result.rows);
//           GridStoreApi.getState().actions?.markValid?.(gridId);
//       }, [gridId]);
//
//       // Initial fetch + refetch when invalidated
//       useEffect(() => {
//           fetchData();
//       }, [fetchData, isInvalid]);
//
//       return <DataGrid rows={data} columns={wipColumns} />;
//   }

// ---------------------------------------------------------------------------
// STEP 4: React Router v7 loader-based approach (alternative)
// ---------------------------------------------------------------------------
//
// If WIP data is loaded via a React Router loader (the dataStrategy pattern
// used elsewhere in the POC), invalidation can use shouldRevalidate:
//
//   // In the route definition:
//   {
//       path: '/search',
//       loader: wipLoader,
//       shouldRevalidate: ({ actionResult }) => {
//           // Revalidate when returning from a data-modifying action
//           return WIP_REFRESH_ACTIONS.has(
//               actionResult?.action?.toUpperCase() ?? '',
//           );
//       },
//       Component: SearchPage,
//   }
//
// The wipLoader would call the WIP API endpoint and return the grid data.
// React Router automatically re-runs the loader when shouldRevalidate
// returns true, keeping the data fresh without manual refetch logic.

export default triggerWipRefreshIfNeeded;
