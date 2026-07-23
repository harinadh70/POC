// GAP #10 — ShowBatchEdits (Main_ISLLSYS.vbs lines 891-972)
// NEW FILE — src/features/batch-edits/batch-edits-modal.tsx
// Batch-edits dialog: checkbox list of policy-level tree nodes. "Start
// Batch Edit" builds selectedNodesXml from checked nodeKeys, POSTs a
// BATCHEDIT action via pageData, then closes and navigates (force
// cycling). Open with openBatchEditsModal() from sidebar/header menu.

import { useMemo } from 'react';
import { create } from 'zustand';
import {
    Alert,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// hooks
import { useShallow } from 'zustand/react/shallow';

// stores
import { TreeStoreApi } from '@stores/tree-store';
import { SessionStoreApi } from '@stores/session-store';
import { NavigationStoreApi } from '@stores/navigation-store';

// services
import { pageData } from '@services/page-data';

// types
import type { TreeNode } from '@/types/tree';

// ---------------------------------------------
// Local store.
// ModalStore's pendingParams/open flow is coupled to the /modal resource
// route (loaderFetcher cycling) — it cannot host a bespoke feature dialog,
// so this feature keeps its own tiny store, same create() conventions.
// ---------------------------------------------

interface BatchEditsActions {
    open: () => void;
    close: () => void;
    toggleNode: (nodekey: string) => void;
    setSubmitting: (submitting: boolean) => void;
    setError: (error: string | null) => void;
}

interface BatchEditsState {
    isOpen: boolean;
    /** nodeKeys the user has checked for batch editing */
    checkedKeys: string[];
    isSubmitting: boolean;
    error: string | null;
    actions: BatchEditsActions;
}

const useBatchEditsStore = create<BatchEditsState>()((set) => ({
    isOpen: false,
    checkedKeys: [],
    isSubmitting: false,
    error: null,
    actions: {
        open: () => {
            set({ isOpen: true, checkedKeys: [], isSubmitting: false, error: null });
        },
        close: () => {
            set({ isOpen: false, checkedKeys: [], isSubmitting: false, error: null });
        },
        toggleNode: (nodekey: string) => {
            set((state) => ({
                checkedKeys: state.checkedKeys.includes(nodekey)
                    ? state.checkedKeys.filter((key) => key !== nodekey)
                    : [...state.checkedKeys, nodekey],
            }));
        },
        setSubmitting: (submitting: boolean) => {
            set({ isSubmitting: submitting });
        },
        setError: (error: string | null) => {
            set({ error });
        },
    },
}));

export const BatchEditsStoreApi = useBatchEditsStore;

/** Imperative opener — call from sidebar / header-menu handlers. */
export function openBatchEditsModal(): void {
    BatchEditsStoreApi.getState().actions.open();
}

// ---------------------------------------------
// Submit — mirrors ShowBatchEdits: build XML payload from the selected
// nodeKeys, POST with BATCHEDIT action, navigate on success.
// ---------------------------------------------

function buildSelectedNodesXml(checkedKeys: string[]): string {
    const nodes = checkedKeys
        .map((key) => `<node nodekey="${key.replace(/"/g, '&quot;')}" />`)
        .join('');
    return `<nodes>${nodes}</nodes>`;
}

async function startBatchEdit(): Promise<void> {
    const { checkedKeys, actions } = BatchEditsStoreApi.getState();
    if (checkedKeys.length === 0 || BatchEditsStoreApi.getState().isSubmitting) {
        return;
    }

    actions.setSubmitting(true);
    actions.setError(null);

    const session = SessionStoreApi.getState();

    const result = await pageData({
        object: 'ZENTEDTCTL',
        ...session.actions.toPayload(),
        action: 'BATCHEDIT',
        callType: 'POST',
        eeData: {
            xmlFileName: session.xmlFileName ?? '',
            controlMatchcode: 'dtaBATCHEDIT', // legacy matchcode from ShowBatchEdits
            controlText: 'BATCHEDIT',
            controlIndex: String(checkedKeys.length),
            selectedNodesXml: buildSelectedNodesXml(checkedKeys),
            postProcessAction: '1',
            dateString: '',
            comboListIndex: '',
            ruleAttribute: '',
            initialLValue: '',
            initialXValue: '',
            alternateNodeKey: '',
            searchControl: '',
        },
        calls: {
            type: 'post',
            call: [],
        },
    });

    if (!result.status) {
        actions.setSubmitting(false);
        actions.setError(result.error ?? 'Batch edit request failed.');
        return;
    }

    // Success: close, then navigate to the batch-edit page via the same
    // force-cycling mechanism the common handlers use (navigateBack/navigatePrev).
    actions.close();
    NavigationStoreApi.getState().actions.setNextAction({
        action: 'BATCHEDIT',
        nodeKey: session.nodeKey,
        tab: 0,
        xmlDetail: '',
    });
    NavigationStoreApi.getState().actions.setForceCycling(true);
}

// ---------------------------------------------
// Component
// ---------------------------------------------

function BatchEditsModal() {
    const { isOpen, checkedKeys, isSubmitting, error } = useBatchEditsStore(
        useShallow((state) => ({
            isOpen: state.isOpen,
            checkedKeys: state.checkedKeys,
            isSubmitting: state.isSubmitting,
            error: state.error,
        })),
    );

    // Policy-level candidates: tree roots carry policy metadata
    // (policynumber / primaryinsured — see types/tree.ts). Fall back to
    // any node flagged with a policynumber when roots are absent.
    const { nodes, rootKeys } = TreeStoreApi(
        useShallow((state) => ({ nodes: state.nodes, rootKeys: state.rootKeys })),
    );

    const policyNodes = useMemo<TreeNode[]>(() => {
        const fromRoots = rootKeys
            .map((key) => nodes[key])
            .filter((node): node is TreeNode => node !== undefined);
        if (fromRoots.length > 0) {
            return fromRoots;
        }
        return Object.values(nodes).filter(
            (node): node is TreeNode => node !== undefined && node.policynumber !== undefined,
        );
    }, [nodes, rootKeys]);

    const handleClose = () => {
        if (isSubmitting) return;
        BatchEditsStoreApi.getState().actions.close();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Dialog
            open={isOpen}
            maxWidth={false}
            onClose={handleClose}
            aria-labelledby="batch-edits-dialog-title"
            slotProps={{ paper: { style: { width: 600, minHeight: 400 } } }}
            data-testid="batch-edits-dialog"
        >
            <DialogTitle
                id="batch-edits-dialog-title"
                component="div"
                className="flex items-center justify-between gap-2 px-4 py-3"
            >
                <Typography variant="h6" component="span" className="grow truncate">
                    Batch Edits
                </Typography>
                <IconButton
                    size="small"
                    onClick={handleClose}
                    aria-label="Close batch edits"
                    disabled={isSubmitting}
                >
                    <CloseRoundedIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers className="p-4! overflow-y-auto relative">
                {error && (
                    <Alert
                        severity="error"
                        onClose={() => BatchEditsStoreApi.getState().actions.setError(null)}
                        className="mb-3"
                    >
                        {error}
                    </Alert>
                )}

                {policyNodes.length === 0 ? (
                    <Alert severity="info">No policy records available for batch editing.</Alert>
                ) : (
                    <List dense data-testid="batch-edits-node-list">
                        {policyNodes.map((node) => {
                            const isChecked = checkedKeys.includes(node.nodekey);
                            const secondary = [node.policynumber, node.primaryinsured]
                                .filter(Boolean)
                                .join(' — ');
                            return (
                                <ListItem key={node.nodekey} disablePadding>
                                    <ListItemButton
                                        dense
                                        onClick={() =>
                                            BatchEditsStoreApi.getState().actions.toggleNode(
                                                node.nodekey,
                                            )
                                        }
                                        disabled={isSubmitting}
                                        data-testid={`batch-edits-node-${node.nodekey}`}
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={isChecked}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{
                                                    'aria-label': `Select ${node.text} for batch edit`,
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={node.text}
                                            secondary={secondary || undefined}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </DialogContent>

            <DialogActions className="px-4! py-3!">
                <Button onClick={handleClose} disabled={isSubmitting} data-testid="batch-edits-cancel">
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => void startBatchEdit()}
                    disabled={checkedKeys.length === 0 || isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={16} /> : null}
                    data-testid="batch-edits-start"
                >
                    Start Batch Edit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// ---------------------------------------------

export { BatchEditsModal };
