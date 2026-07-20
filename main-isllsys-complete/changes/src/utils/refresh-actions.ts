// VBS: Main_ISLLSYS #4  ClearActionMenus       (lines 456-490)
//    + #37 RefreshSearchPageLists (lines 2818-2873)
// Invalidation triggers: force the LOB action menu to reload after a
// rate-level change, and refresh the search page's WIP queue grid after an
// action completes.
//
// DEPENDS ON client branch stores: menu-store, grid-store. If either is
// missing on the branch (like focus-store was), ask for the paste-ready
// file and it will be provided.

import { MenuStoreApi } from '@/stores/menu-store';
import { GridStoreApi } from '@/stores/grid-store';

type MenuActionsShape = {
    invalidate?: () => void;
    clearMenu?: () => void;
    setMenuLoaded?: (loaded: boolean) => void;
};

type GridActionsShape = {
    invalidate?: (gridId: string) => void;
    clearGrid?: (gridId: string) => void;
};

/** #4: drop cached action menus so the next render refetches them. */
export function clearActionMenus(): void {
    const actions = MenuStoreApi.getState()?.actions as MenuActionsShape | undefined;
    if (actions?.invalidate) actions.invalidate();
    else if (actions?.clearMenu) actions.clearMenu();
    else actions?.setMenuLoaded?.(false);
}

/** #37: refresh the WIP queue (search page grid) after an action. */
export function refreshSearchPageLists(gridId = 'wipQueue'): void {
    const actions = GridStoreApi.getState()?.actions as GridActionsShape | undefined;
    if (actions?.invalidate) actions.invalidate(gridId);
    else actions?.clearGrid?.(gridId);
}

export default { clearActionMenus, refreshSearchPageLists };
