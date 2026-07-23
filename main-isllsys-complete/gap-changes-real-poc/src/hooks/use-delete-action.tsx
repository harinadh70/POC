/**
 * GAP #19 — DeleteAction (Main_ISLLSYS_20010101.vbs lines 1655-1770)
 * NEW FILE: src/hooks/use-delete-action.tsx
 * Purpose: watch navigation-store pendingDelete, confirm with the user, POST
 * the DELETE via the pageData service, prune the node from tree-store, then
 * navigate to the parent node.
 */
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { usePathnameRef } from '@hooks/use-pathname-ref';
import {
    Dialog as MuiDialog,
    DialogTitle as MuiDialogTitle,
    DialogActions as MuiDialogActions,
    DialogContent as MuiDialogContent,
    Typography,
    Button,
} from '@mui/material';

// services
import { pageData } from '@services/page-data';

// stores
import { NavigationStoreApi } from '@stores/navigation-store';
import { SessionStoreApi } from '@stores/session-store';
import { TreeStoreApi } from '@stores/tree-store';

// types
import type { PageDataPayload } from '@services/page-data';

// ----------------------------------------------

/** Legacy confirm text from DeleteAction (MsgBox vbYesNo). */
const DELETE_CONFIRM_MESSAGE = 'Are you sure you want to delete this item?';

/** EEData is required by the /ui/page/data contract — DELETE posts it empty. */
const EEDATA_EMPTY: Readonly<PageDataPayload['eeData']> = Object.freeze({
    xmlFileName: '',
    controlMatchcode: '',
    controlText: '',
    controlIndex: '',
    selectedNodesXml: '',
    postProcessAction: '',
    dateString: '',
    comboListIndex: '',
    ruleAttribute: '',
    initialLValue: '',
    initialXValue: '',
    alternateNodeKey: '',
    searchControl: '',
});

// ----------------------------------------------

/**
 * Confirms and executes a pending DELETE action.
 *
 * Legacy equivalent: DeleteAction showed a vbYesNo MsgBox, then on Yes ran
 * the DELETE XMLServerCall, removed the tree node, and navigated the MAIN
 * frame to the parent node via ExecuteAction.
 *
 * React equivalent: ActionButton/command handlers stage the delete on
 * NavigationStore.pendingDelete ({ action, nodeKey, tab }) instead of
 * executing it. This hook watches pendingDelete, renders the confirm
 * dialog, and on OK: POST via pageData -> removeNode -> replay navigation
 * to the parent node through the session/cycling pipeline.
 *
 * Mount { DeleteConfirmDialog } once in RootLayout.
 */
export function useDeleteAction() {
    const navigate = useNavigate();
    const pathnameRef = usePathnameRef();

    // Reactive subscription — dialog opens the moment pendingDelete is staged
    const pendingDelete = NavigationStoreApi((state) => state.pendingDelete);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = useCallback(async () => {
        const pending = NavigationStoreApi.getState().pendingDelete;
        // js-early-exit: ignore double-clicks while the POST is in flight
        if (!pending || isDeleting) return;

        setIsDeleting(true);
        try {
            const session = SessionStoreApi.getState();

            // POST the delete — session payload with the staged DELETE
            // action/nodeKey overriding the current session values
            const result = await pageData({
                object: 'ZENTEDTCTL',
                ...session.actions.toPayload(),
                action: pending.action.toUpperCase(),
                nodeKey: pending.nodeKey,
                callType: 'POST',
                eeData: EEDATA_EMPTY,
                calls: { type: 'delete', call: [] },
            });

            if (!result.status) {
                // Legacy surfaced the server error via ProcessErrors — POC logs it
                console.error('[useDeleteAction] DELETE failed:', result.error);
                return;
            }

            // Resolve the parent BEFORE pruning (removeNode drops the entry)
            const parentKey = TreeStoreApi.getState().nodes[pending.nodeKey]?.parentKey ?? null;
            TreeStoreApi.getState().actions.removeNode(pending.nodeKey);

            if (parentKey) {
                // Navigate to the parent node — same session/cycling replay
                // pattern as use-command-handlers (tab preselect rides the
                // cycling call; pending.tab is informational here)
                SessionStoreApi.getState().actions.setSession({
                    action: 'MENU',
                    nodeKey: parentKey,
                });
                NavigationStoreApi.getState().actions.setCyclingCalled(false);
                NavigationStoreApi.getState().actions.setForceCycling(true);
                void navigate(pathnameRef.current, { replace: true });
            }
        } finally {
            setIsDeleting(false);
            NavigationStoreApi.getState().actions.clearPendingDelete();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, isDeleting]); // pathnameRef is stable - not needed in deps

    const handleCancel = useCallback(() => {
        // No = clear the staged delete, nothing else happens
        NavigationStoreApi.getState().actions.clearPendingDelete();
    }, []);

    const DeleteConfirmDialog = useCallback(
        () => (
            <MuiDialog id="delete-confirm-dialog" open={pendingDelete !== null}>
                <MuiDialogTitle component="div" className="flex items-center justify-between">
                    <Typography className="grow m-0!" variant="h6">
                        Confirm Delete
                    </Typography>
                </MuiDialogTitle>
                <MuiDialogContent className="p-4!">
                    <Typography variant="body1">{DELETE_CONFIRM_MESSAGE}</Typography>
                </MuiDialogContent>
                <MuiDialogActions className="flex items-center justify-end gap-2 p-4">
                    <Button
                        variant="contained"
                        disabled={isDeleting}
                        onClick={() => {
                            void handleConfirm();
                        }}
                    >
                        Ok
                    </Button>
                    <Button variant="outlined" disabled={isDeleting} onClick={handleCancel}>
                        Cancel
                    </Button>
                </MuiDialogActions>
            </MuiDialog>
        ),
        [pendingDelete, isDeleting, handleConfirm, handleCancel],
    );

    return { DeleteConfirmDialog };
}
