// ============================================================================
// GAP #10: ShowBatchEdits (VBS lines 891-972)
// ============================================================================
// VBS: Opens batch-edits modal — collects selected tree nodes from checkbox
//      state, builds XML payload, calls server with BATCHEDIT action,
//      navigates to batch edit page
// REAL POC: No batch edits feature. Modal system exists (modal.tsx) and could
//           be reused. Tree-store has node selection capability.
// FIX: BatchEditsModal component + handler
// WHERE TO ADD: src/features/batch-edits/batch-edits-modal.tsx
// WIRE INTO: sidebar.tsx or header.tsx menu item
// ============================================================================
//
// IMPLEMENTATION NOTES
// --------------------------------------------------------------------------
// The VBS ShowBatchEdits routine (lines 891-972 of Main_ISLLSYS_20010101.vbs)
// does the following sequence:
//   1. Reads the tree control's checkbox state to find which nodes the user
//      selected for batch editing.
//   2. Builds an XML payload containing the selected nodeKeys, the current
//      session info (compLoc, userId, policyId), and an action = "BATCHEDIT".
//   3. Posts the XML to the server via xmlServerCall.
//   4. On success, navigates to the batch-edit page (a separate VBS page that
//      loads the batch editor for the selected nodes).
//
// The Real POC equivalent:
//   - Tree-store (Zustand) already tracks node selection state — each node
//     has a `checked` or `selected` boolean. We read that instead of walking
//     a COM tree control.
//   - The existing modal system in src/resources/modal.tsx provides
//     clientModalLoader (opens a modal via store), clientModalAction (server
//     call from within a modal), and a fetcher pattern. We use the same
//     modal-store pattern for open/close.
//   - XML payload building follows the same pattern as ee-call.ts and
//     grid-actions.ts: build a typed object, let the configured post
//     function handle serialisation.
//   - React Router's useNavigate handles the post-success navigation.
//
// DEPENDENCIES (all confirmed present in the Real POC):
//   - @mui/material: Dialog, DialogTitle, DialogContent, DialogActions,
//     Button, Checkbox, List, ListItem, ListItemText, ListItemIcon,
//     CircularProgress
//   - zustand: create (for the batch-edits modal store)
//   - react-router-dom: useNavigate
//   - @/stores/session-store: SessionStoreApi (session info for payload)
//   - @/stores/tree-store: TreeStoreApi (read checked/selected nodes)
//   - @/services/ee-call: postRaw (send payload to server)
//   - @/stores/browser-command-store: useBrowserCommandStore (notifications)
// ============================================================================

import { useState, useCallback, useMemo } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    CircularProgress,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import { postRaw } from '@/services/ee-call';
import { SessionStoreApi } from '@/stores/session-store';
import { TreeStoreApi } from '@/stores/tree-store';
import { useBrowserCommandStore } from '@/stores/browser-command-store';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A tree node eligible for batch editing. Mirrors the shape the tree-store
 *  exposes for each node — we only need the key and display label. */
export interface BatchEditNode {
    /** The nodeKey string, e.g. "POL|POL|0|" — unique identifier. */
    nodeKey: string;
    /** Human-readable label shown in the checkbox list. */
    label: string;
    /** Whether this node was pre-checked in the tree (user's prior selection). */
    checked: boolean;
}

/** Payload shape sent to the server for the BATCHEDIT action.
 *  Mirrors the legacy XML payload structure as a typed object — the
 *  configured post function (ee-call) handles actual serialisation. */
interface BatchEditPayload {
    action: 'BATCHEDIT';
    userId: string;
    compLoc: string;
    policyId: string;
    /** Array of nodeKeys the user selected for batch editing. */
    selectedNodes: string[];
}

/** Server response shape — the server returns the target pageId (the batch
 *  edit page to navigate to) and optional commands to run. */
interface BatchEditResponse {
    pageId?: string;
    commands?: unknown[];
    error?: string;
}

// ---------------------------------------------------------------------------
// Modal store — controls open/close state
// ---------------------------------------------------------------------------
// Pattern: same as the Real POC's modal-store approach. A lightweight Zustand
// store dedicated to this modal so it can be triggered from anywhere (sidebar
// menu, header toolbar, keyboard shortcut) without prop-drilling.

interface BatchEditsModalState {
    /** Whether the modal is currently visible. */
    isOpen: boolean;
    /** Opens the modal — typically called from a menu item handler. */
    open: () => void;
    /** Closes the modal and resets internal state. */
    close: () => void;
}

export const useBatchEditsModalStore = create<BatchEditsModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

// ---------------------------------------------------------------------------
// Helper: collect eligible nodes from the tree-store
// ---------------------------------------------------------------------------
// VBS walked the tree control's Nodes collection checking .Checked on each.
// React equivalent: read the tree-store's nodes map and filter by those that
// have a `checked` or `selected` flag. The tree-store shape is defensive
// (optional chaining) because the exact property names may vary across
// branches — verify at integration.

function getEligibleNodes(): BatchEditNode[] {
    const treeState = TreeStoreApi.getState();
    const nodes = treeState?.nodes as
        | Record<string, { key?: string; nodeKey?: string; label?: string; text?: string; checked?: boolean; selected?: boolean }>
        | undefined;

    if (!nodes) return [];

    return Object.values(nodes)
        .filter((n) => n != null)
        .map((n) => ({
            nodeKey: n.nodeKey ?? n.key ?? '',
            label: n.label ?? n.text ?? n.nodeKey ?? n.key ?? '(unknown)',
            checked: n.checked ?? n.selected ?? false,
        }))
        .filter((n) => n.nodeKey !== '');
}

// ---------------------------------------------------------------------------
// Helper: build the BATCHEDIT payload
// ---------------------------------------------------------------------------
// VBS built an XML string:  <request action="BATCHEDIT"><nodes>...</nodes></request>
// React equivalent: a typed object. The configured post function (ee-call's
// postRaw) will serialise it as JSON or XML depending on the backend contract.

function buildBatchEditPayload(selectedNodeKeys: string[]): BatchEditPayload {
    const session = SessionStoreApi.getState();
    // Session-store shape: session.userId, session.compLoc, session.policyId
    // (defensive — falls back to empty strings if shape differs).
    const userId = (session as Record<string, unknown>)?.userId as string ?? '';
    const compLoc = (session as Record<string, unknown>)?.compLoc as string ?? 'PIHW';
    const policyId = (session as Record<string, unknown>)?.policyId as string ?? '';

    return {
        action: 'BATCHEDIT',
        userId,
        compLoc,
        policyId,
        selectedNodes: selectedNodeKeys,
    };
}

// ---------------------------------------------------------------------------
// Component: BatchEditsModal (~35 lines of JSX)
// ---------------------------------------------------------------------------
// MUI Dialog that:
//   1. Reads eligible tree nodes and shows them with checkboxes.
//   2. Lets the user toggle individual nodes on/off.
//   3. "Start Batch Edit" collects the checked nodeKeys, builds the payload,
//      calls the server, and navigates to the batch-edit page on success.
//
// The modal opens via useBatchEditsModalStore — no prop-drilling needed.
// Error handling uses the existing notification system (browser-command-store).

export function BatchEditsModal() {
    const isOpen = useBatchEditsModalStore((s) => s.isOpen);
    const closeModal = useBatchEditsModalStore((s) => s.close);
    const navigate = useNavigate();
    const notify = useBrowserCommandStore((s) => s.notify);

    // --- Local state: the checkbox selections and loading flag ---
    // Initialise from the tree-store's current checked state each time
    // the modal opens. useMemo recalculates when isOpen flips to true.
    const eligibleNodes = useMemo(() => (isOpen ? getEligibleNodes() : []), [isOpen]);
    const [selections, setSelections] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(false);

    // On first render after open, seed selections from eligibleNodes' checked state.
    // We use a callback ref pattern: if selections is empty and nodes exist, seed it.
    const effectiveSelections = useMemo(() => {
        if (Object.keys(selections).length === 0 && eligibleNodes.length > 0) {
            const seed: Record<string, boolean> = {};
            for (const n of eligibleNodes) seed[n.nodeKey] = n.checked;
            return seed;
        }
        return selections;
    }, [selections, eligibleNodes]);

    // --- Toggle a single node's checkbox ---
    const toggleNode = useCallback((nodeKey: string) => {
        setSelections((prev) => {
            const current = { ...effectiveSelections, ...prev };
            return { ...current, [nodeKey]: !current[nodeKey] };
        });
    }, [effectiveSelections]);

    // --- Collect selected nodeKeys for the payload ---
    const selectedKeys = useMemo(
        () => eligibleNodes
            .filter((n) => effectiveSelections[n.nodeKey])
            .map((n) => n.nodeKey),
        [eligibleNodes, effectiveSelections],
    );

    // --- Handle "Start Batch Edit" button click ---
    // Builds XML payload from selected nodes, calls server via postRaw
    // (same pattern as grid-actions.ts), navigates on success.
    const handleStartBatchEdit = useCallback(async () => {
        if (selectedKeys.length === 0) {
            notify('warning', 'Select at least one item for batch editing.');
            return;
        }

        setLoading(true);
        try {
            const payload = buildBatchEditPayload(selectedKeys);
            const response = (await postRaw(payload)) as BatchEditResponse | null;

            if (response === null) {
                // postRaw returns null when ee-call is not configured — warn already logged.
                notify('error', 'Batch edit service not configured.');
                return;
            }

            if (response.error) {
                notify('error', response.error);
                return;
            }

            // Close modal before navigating (matches legacy VBS flow).
            closeModal();
            setSelections({});

            // Navigate to the batch-edit page returned by the server.
            // VBS navigated to a fixed batch-edit page; the server may return
            // a specific pageId. Fallback to a conventional route.
            const targetPage = response.pageId ?? 'batch-edit';
            navigate(`/lob/POL/${targetPage}`);
        } catch (err) {
            notify('error', `Batch edit failed: ${(err as Error).message}`);
        } finally {
            setLoading(false);
        }
    }, [selectedKeys, closeModal, navigate, notify]);

    // --- Handle close: reset local state ---
    const handleClose = useCallback(() => {
        if (loading) return; // Prevent closing while server call is in flight.
        setSelections({});
        closeModal();
    }, [loading, closeModal]);

    // --- Render ---
    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Batch Edits</DialogTitle>
            <DialogContent dividers>
                {eligibleNodes.length === 0 ? (
                    <Typography color="text.secondary">No nodes available for batch editing.</Typography>
                ) : (
                    <List dense>
                        {eligibleNodes.map((node) => (
                            <ListItem key={node.nodeKey} disableGutters disablePadding>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <Checkbox
                                        edge="start"
                                        checked={effectiveSelections[node.nodeKey] ?? false}
                                        onChange={() => toggleNode(node.nodeKey)}
                                        disabled={loading}
                                        size="small"
                                    />
                                </ListItemIcon>
                                <ListItemText primary={node.label} secondary={node.nodeKey} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={() => void handleStartBatchEdit()}
                    disabled={loading || selectedKeys.length === 0}
                    startIcon={loading ? <CircularProgress size={16} /> : undefined}
                >
                    {loading ? 'Processing...' : `Start Batch Edit (${selectedKeys.length})`}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// ---------------------------------------------------------------------------
// Handler: openBatchEditsModal
// ---------------------------------------------------------------------------
// Call this from sidebar.tsx menu item, header.tsx toolbar button, or any
// action handler that needs to trigger the batch-edits flow.
//
// WIRE INTO existing code (1 line each):
//
//   sidebar.tsx — add a menu item:
//     <MenuItem onClick={openBatchEditsModal}>Batch Edits</MenuItem>
//
//   header.tsx — add a toolbar button:
//     <Button onClick={openBatchEditsModal}>Batch Edits</Button>
//
//   App.tsx or layout — mount the modal once at the app level:
//     <BatchEditsModal />
//
// The modal reads tree-store state directly, so no props need to be passed.

export function openBatchEditsModal(): void {
    useBatchEditsModalStore.getState().open();
}

// ---------------------------------------------------------------------------
// Exports — both named and default (project convention from CHANGES-README)
// ---------------------------------------------------------------------------

export { BatchEditsModal as default };
