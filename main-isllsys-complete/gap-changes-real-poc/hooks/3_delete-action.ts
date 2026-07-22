// ============================================================================
// GAP #19: DeleteAction (VBS lines 1655-1770)
// ============================================================================
// VBS FLOW:
//   1. User clicks Delete in tree context menu or toolbar
//   2. VBS displays confirm dialog: "Are you sure you want to delete <label>?"
//   3. On confirm: stamps Session with action=DELETE, nodeKey=<target>
//   4. Posts to server via xmlServerCall (sends full Session payload)
//   5. Server returns success + commands (REMOVE_NODE, SELECT_NODE, etc.)
//   6. VBS removes the node from TreeView, refreshes dependent branches
//      (per-LOB lookup table: e.g., deleting a vehicle also refreshes
//       drivers and coverages under CAU)
//   7. VBS navigates to parent node
//
// REAL POC ALREADY HAS:
//   - navigation-store: `pendingDelete` state (set when delete intent starts)
//   - tree-store: `removeNode(key)` action removes a node from the flat map
//   - ACTION_CONFIG: DELETE entry with `deferNavigation: true`
//   - data-strategy.ts: DELETE preflight that checks `pendingDelete` but
//     currently STOPS there (no server call, no tree removal, no navigation)
//   - pageDataService.postPageData(): the Axios wrapper for server calls
//   - handlerForBrowserCommands(): dispatches commands from server response
//
// WHAT THIS CODE ADDS:
//   - useDeleteAction hook that orchestrates the COMPLETE flow:
//     confirm dialog -> server POST -> process commands -> remove from tree
//     -> refresh dependent branches -> navigate to parent
//   - Integration points showing exactly where to wire into data-strategy.ts
//   - BRANCH_REFRESH table for per-LOB dependent branch refreshing
//
// WHERE TO ADD: src/hooks/use-delete-action.ts
// WIRE INTO:    data-strategy.ts DELETE preflight + tree resource
// ============================================================================

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

// ---------------------------------------------------------------------------
// Store imports — use the Real POC's Zustand store hooks.
// The Real POC pattern: stores export both a hook (useXxxStore) and a
// static API (XxxStoreApi) created via createStoreWithSelectors.
// ---------------------------------------------------------------------------
import { useNavigationStore } from '@/stores/navigation-store';
import { useTreeStore } from '@/stores/tree-store';
// Static API for imperative access outside React render cycle
import { TreeStoreApi } from '@/stores/tree-store';
import { NavigationStoreApi } from '@/stores/navigation-store';

// ---------------------------------------------------------------------------
// Service imports — the Real POC uses pageDataService (Axios httpInstance
// wrapper) for all server calls. The postPageData method sends the full
// page payload to the server.
// ---------------------------------------------------------------------------
import { pageDataService } from '@/services/page-data-service';

// ---------------------------------------------------------------------------
// Command handler — server responses contain browser commands that must
// be dispatched (e.g., REMOVE_NODE, SELECT_NODE, DISPLAY_MESSAGE).
// ---------------------------------------------------------------------------
import { handlerForBrowserCommands } from '@/handlers/commands';


// ---------------------------------------------------------------------------
// BRANCH_REFRESH: Per-LOB table of branches to refresh after a delete.
//
// VBS kept this hardcoded per LOB. When deleting a node under a LOB prefix,
// these sibling branches are refetched from the server so the tree stays
// consistent. Example: deleting a CAU vehicle also refreshes drivers and
// coverages because they may reference the deleted vehicle.
//
// Fill these in as each LOB page comes online. The keys are nodeKey prefixes
// (the part before the first '|'), and the values are branch keys to refetch.
// ---------------------------------------------------------------------------
const BRANCH_REFRESH: Record<string, string[]> = {
    // Uncomment and populate as LOB pages come online:
    // 'CAU': ['CAU|VEH', 'CAU|DRV', 'CAU|CVG'],
    // 'BOP': ['BOP|LOC', 'BOP|BLD'],
    // 'WRM': ['WRM|CLS'],
};


// ============================================================================
// Types
// ============================================================================

/** Shape of the pending delete intent stored in navigation-store. */
export interface PendingDelete {
    /** The tree node key to delete (e.g., "CAU|VEH|001"). */
    nodeKey: string;
    /** Display label for the confirm dialog. Falls back to nodeKey. */
    label?: string;
    /** Optional: the parent node key to navigate to after deletion. */
    parentNodeKey?: string;
}

/** Dependencies that can be injected for testing or customization. */
export interface DeleteActionDeps {
    /** Override navigation — defaults to react-router navigate(-1). */
    navigate?: (to: string | number) => void;
    /** Refetch a tree branch from the server. */
    refetchBranch?: (branchKey: string) => Promise<void>;
    /** Run browser commands from server response. */
    runCommands?: (commands: unknown[]) => void | Promise<void>;
}


// ============================================================================
// Core delete execution function (imperative, usable outside React)
// ============================================================================

/**
 * Execute the complete delete flow for a tree node.
 *
 * This is the imperative version that can be called from data-strategy.ts
 * or any non-React context. For use inside components, prefer the
 * useDeleteAction hook below.
 *
 * @param nodeKey  The tree node key to delete
 * @param deps     Optional dependency overrides
 * @returns true when the node was deleted, false if cancelled or failed
 */
export async function executeDeleteAction(
    nodeKey: string,
    deps: DeleteActionDeps = {},
): Promise<boolean> {
    // -----------------------------------------------------------------------
    // 1. Resolve the node label from tree-store for the confirm dialog
    //    VBS: Used the TreeView's selected node text
    //    Real POC: tree-store.nodes is a flat map { [nodeKey]: TreeNode }
    // -----------------------------------------------------------------------
    const treeState = TreeStoreApi.getState();
    const node = treeState?.nodes?.[nodeKey];
    const label = (node as { text?: string } | undefined)?.text ?? nodeKey;

    // -----------------------------------------------------------------------
    // 2. Show confirm dialog
    //    VBS: "Are you sure you want to delete <label>?"
    //    We use window.confirm as a baseline; swap for a styled MUI confirm
    //    via the modal-store DISPLAY_QUESTION command if available.
    // -----------------------------------------------------------------------
    const confirmed = window.confirm(
        `Are you sure you want to delete "${label}"?`,
    );
    if (!confirmed) {
        // Clear the pendingDelete so the intent doesn't persist
        NavigationStoreApi.getState()?.actions?.clearPendingDelete?.();
        return false;
    }

    // -----------------------------------------------------------------------
    // 3. Server call — POST with DELETE action
    //    VBS: Stamped Session.Action = "DELETE", Session.NodeKey = nodeKey,
    //         then called xmlServerCall.
    //    Real POC: pageDataService.postPageData sends the full page payload.
    //    We build the payload shape the server expects.
    // -----------------------------------------------------------------------
    try {
        const response = await pageDataService.postPageData({
            action: 'DELETE',
            nodeKey,
            // The server expects the full session context; pageDataService
            // handles merging the current session/page state automatically.
        });

        // -------------------------------------------------------------------
        // 4. Process server response commands
        //    VBS: Checked for error responses, then processed browser commands
        //    Real POC: handlerForBrowserCommands dispatches each command
        //    (REMOVE_NODE, SELECT_NODE, DISPLAY_MESSAGE, etc.)
        // -------------------------------------------------------------------
        const commands = response?.data?.commands ?? response?.commands;
        if (Array.isArray(commands)) {
            const runner = deps.runCommands ?? handlerForBrowserCommands;
            await runner(commands);
        }
    } catch (error) {
        console.error('[delete-action] Server call failed:', error);
        NavigationStoreApi.getState()?.actions?.clearPendingDelete?.();
        return false;
    }

    // -----------------------------------------------------------------------
    // 5. Remove the node from tree-store
    //    VBS: Called TreeView.Nodes.Remove(nodeKey)
    //    Real POC: tree-store has removeNode(key) action
    //    NOTE: The server may also send a REMOVE_NODE command that does this;
    //    calling removeNode defensively here is safe (idempotent on missing key).
    // -----------------------------------------------------------------------
    const treeActions = TreeStoreApi.getState()?.actions;
    treeActions?.removeNode?.(nodeKey);

    // -----------------------------------------------------------------------
    // 6. Refresh dependent branches (per-LOB table)
    //    VBS: Had a Select Case on LOB prefix to determine which sibling
    //         branches to reload from the server after a delete.
    //    Real POC: tree-store has loadBranch or addNodes for server data.
    // -----------------------------------------------------------------------
    const lobPrefix = nodeKey.split('|')[0] ?? '';
    const branchesToRefresh = BRANCH_REFRESH[lobPrefix] ?? [];
    if (deps.refetchBranch && branchesToRefresh.length > 0) {
        await Promise.all(
            branchesToRefresh.map((branchKey) => deps.refetchBranch!(branchKey)),
        );
    }

    // -----------------------------------------------------------------------
    // 7. Navigate to parent
    //    VBS: Selected the parent node in the tree, which triggered navigation
    //    Real POC: Use react-router navigate. The parent key is the nodeKey
    //    with the last segment removed.
    // -----------------------------------------------------------------------
    const parentKey = nodeKey.split('|').slice(0, -1).join('|');
    if (deps.navigate && parentKey) {
        deps.navigate(-1); // Go back; or map parentKey to a route if available
    }

    // Clear the pendingDelete intent
    NavigationStoreApi.getState()?.actions?.clearPendingDelete?.();

    return true;
}


// ============================================================================
// useDeleteAction hook — React component integration
// ============================================================================

/**
 * React hook that watches navigation-store's pendingDelete and renders
 * an MUI confirm dialog. When confirmed, executes the full delete flow.
 *
 * Usage in a layout or page component:
 *
 *   function AppLayout() {
 *       const { DeleteConfirmDialog } = useDeleteAction();
 *       return (
 *           <>
 *               <Outlet />
 *               <DeleteConfirmDialog />
 *           </>
 *       );
 *   }
 */
export function useDeleteAction(deps: DeleteActionDeps = {}) {
    const navigate = useNavigate();
    const pendingDelete = useNavigationStore((s) => s.pendingDelete) as PendingDelete | null;
    const clearPendingDelete = useNavigationStore((s) => s.actions?.clearPendingDelete);
    const [isDeleting, setIsDeleting] = useState(false);

    // Resolve the label for the dialog
    const nodeKey = pendingDelete?.nodeKey ?? '';
    const treeNodes = useTreeStore((s) => s.nodes);
    const nodeLabel =
        pendingDelete?.label ??
        (treeNodes?.[nodeKey] as { text?: string } | undefined)?.text ??
        nodeKey;

    const handleConfirm = useCallback(async () => {
        if (!nodeKey) return;
        setIsDeleting(true);
        try {
            await executeDeleteAction(nodeKey, {
                navigate: deps.navigate ?? navigate,
                refetchBranch: deps.refetchBranch,
                runCommands: deps.runCommands,
            });
        } finally {
            setIsDeleting(false);
        }
    }, [nodeKey, navigate, deps]);

    const handleCancel = useCallback(() => {
        clearPendingDelete?.();
    }, [clearPendingDelete]);

    // -----------------------------------------------------------------------
    // DeleteConfirmDialog — styled MUI Dialog that replaces window.confirm
    // Render this in a layout component so it's always available.
    // -----------------------------------------------------------------------
    const DeleteConfirmDialog = useCallback(
        () => (
            <Dialog
                open={pendingDelete !== null}
                onClose={handleCancel}
                aria-labelledby="delete-confirm-title"
            >
                <DialogTitle id="delete-confirm-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete &quot;{nodeLabel}&quot;?
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => void handleConfirm()}
                        color="error"
                        variant="contained"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        ),
        [pendingDelete, nodeLabel, isDeleting, handleConfirm, handleCancel],
    );

    return {
        /** Render this component in your layout to show the confirm dialog. */
        DeleteConfirmDialog,
        /** Imperatively trigger a delete (skips dialog, calls executeDeleteAction directly). */
        executeDelete: handleConfirm,
        /** Whether a delete is currently in progress. */
        isDeleting,
        /** The current pending delete intent, or null. */
        pendingDelete,
    };
}


// ============================================================================
// INTEGRATION GUIDE: How to wire into data-strategy.ts
// ============================================================================
//
// The Real POC's data-strategy.ts has a DELETE preflight that currently stops
// short of executing the delete. Here's how to complete the wiring:
//
// IN data-strategy.ts, find the DELETE case (approximately):
//
//   case 'DELETE': {
//       // Current code sets pendingDelete in navigation-store and returns
//       const navStore = NavigationStoreApi.getState();
//       navStore.actions.setPendingDelete({ nodeKey, label });
//       // >>> CURRENTLY STOPS HERE — no server call, no tree removal <<<
//       return { deferNavigation: true };
//   }
//
// OPTION A: Let useDeleteAction hook handle everything (RECOMMENDED)
//   - Keep data-strategy.ts as-is (it sets pendingDelete)
//   - Add <DeleteConfirmDialog /> to the app layout
//   - The hook watches pendingDelete and handles the rest
//
// OPTION B: Execute inline in data-strategy.ts (for non-React contexts)
//   - Import { executeDeleteAction } from '@/hooks/use-delete-action'
//   - Replace the early return with:
//
//   case 'DELETE': {
//       const deleted = await executeDeleteAction(nodeKey, {
//           navigate: routerNavigate,
//           refetchBranch: treeService.fetchBranch,
//           runCommands: handlerForBrowserCommands,
//       });
//       return { deferNavigation: true, completed: deleted };
//   }
//
// ============================================================================

export default useDeleteAction;
