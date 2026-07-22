// ============================================================================
// GAPS #66 + #67 + #68: ListButtonClick + XMLListonItemSelected + ListButtonOnClick
// (VBS lines 6553-6708)
// ============================================================================
//
// VBS FLOW:
//
//   #66 ListButtonClick (lines 6553-6590):
//     - Grid toolbar button clicked (Add, Edit, Delete, Refresh)
//     - Stamps mstrCurrentButton = button matchcode
//     - If action is DELETE, shows confirm dialog first
//     - Stamps mstrSelectedRow with the currently selected row's key value
//     - Falls through to ListButtonOnClick
//
//   #67 XMLListonItemSelected (lines 6591-6608):
//     - Row clicked in the grid → stamps mstrSelectedRow
//     - Fires onItemSelected event → can trigger server call
//     - Team commit 885a1365 already handles this in data-grid.tsx
//
//   #68 ListButtonOnClick (lines 6609-6708):
//     - Builds EEData via handlerForListButtonOnClick:
//       lValue = action (SELECT/DELETE/REFRESH/ADD)
//       xValue = selected row key (or emptyListNodeKey if no rows)
//       data3 = selected row key
//       postProcessAction = action
//     - Posts to server via xmlServerCall
//     - Processes browser commands from response
//     - NEXT loop: if action is NEXT, iterates over ALL selected rows,
//       posting for each one sequentially until no more rows
//
// REAL POC ALREADY HAS:
//   - grid-store: rows keyed by matchcode via setRows/clearRows
//     State shape: { rows: Partial<Record<string, GridRow[]>> }
//     GridRow: { id: string | number; [key: string]: unknown }
//   - data-grid.tsx (v2): accepts GridNode from layout tree, rows from
//     useGridRows()[node.matchcode], handleRowClick stamps mstrSelectedRow
//     in SessionStore, NO toolbar currently
//   - handlerForListButtonOnClick in payload.ts: builds EEData for list
//     SELECT/DELETE/REFRESH with lValue=action, postProcessAction=action
//   - handlerForBrowserCommands in command.ts: dispatches server response
//     commands (LOAD_GRID, CLEAR_GRID, SET_TEXT, etc.)
//   - executeFormActionBindings: the main action executor chain
//   - SessionStoreApi: stamps mstrSelectedRow, mstrCurrentButton
//   - ACTION_CONFIG: DELETE entry with deferNavigation: true
//
// WHAT THIS CODE ADDS:
//   - GridToolbar component with Add/Edit/Delete/Refresh buttons
//   - Row selection staging: selected row data stored for server call
//   - handleListAction: confirm for DELETE → build EEData → post → process
//     commands → NEXT-loop (sequential iteration over selected rows)
//   - Integration guide showing how to wire toolbar into data-grid.tsx
//
// WHERE TO ADD: src/components/ui/grid-toolbar.tsx (new) +
//               modify src/components/ui/data-grid.tsx
// ============================================================================

import React, { useCallback, useMemo, useState } from 'react';
import {
    Box,
    IconButton,
    Tooltip,
    Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

// ---------------------------------------------------------------------------
// Store imports — Zustand stores created via create<State>()((set) => ...)
// Static APIs (XxxStoreApi) provide imperative access outside React.
// ---------------------------------------------------------------------------
import { SessionStoreApi } from '@/stores/session-store';
import { GridStoreApi } from '@/stores/grid-store';
import type { GridRow } from '@/stores/grid-store';

// ---------------------------------------------------------------------------
// Service imports — EEData building + server call + command dispatch
// ---------------------------------------------------------------------------
import { handlerForListButtonOnClick } from '@/handlers/common/payload';
import { handlerForBrowserCommands } from '@/handlers/common/command';
import type { CommandHandlers } from '@/handlers/common/command';
import { baseQuery } from '@/utils/http-instance';


// ============================================================================
// Types
// ============================================================================

/** Grid toolbar button actions, matching VBS ListButtonClick action values. */
export type GridAction = 'ADD' | 'EDIT' | 'DELETE' | 'REFRESH' | 'NEXT';

/** Configuration for which buttons appear on the toolbar. */
export interface GridToolbarConfig {
    /** Show Add button. Default: true */
    showAdd?: boolean;
    /** Show Edit button. Default: true */
    showEdit?: boolean;
    /** Show Delete button. Default: true */
    showDelete?: boolean;
    /** Show Refresh button. Default: true */
    showRefresh?: boolean;
    /** Custom button labels (e.g., { ADD: 'New Vehicle' }). */
    buttonLabels?: Partial<Record<GridAction, string>>;
    /** Buttons to disable (e.g., when no row is selected). */
    disabledButtons?: GridAction[];
}

/** Props for the GridToolbar component. */
export interface GridToolbarProps {
    /** Grid matchcode — identifies which grid this toolbar controls. */
    gridMatchcode: string;
    /** Currently selected row, or null if no selection. */
    selectedRow: GridRow | null;
    /** All currently selected rows (for multi-select grids). */
    selectedRows?: GridRow[];
    /** Toolbar configuration — which buttons to show. */
    config?: GridToolbarConfig;
    /** Callback after a successful action (e.g., to refresh the view). */
    onActionComplete?: (action: GridAction) => void;
    /** Command handlers for processing server response. */
    commandHandlers?: CommandHandlers;
    /** XML file name for the current page context. */
    xmlFileName?: string;
}


// ============================================================================
// Default toolbar button config
// ============================================================================

const DEFAULT_BUTTON_LABELS: Record<GridAction, string> = {
    ADD: 'Add',
    EDIT: 'Edit',
    DELETE: 'Delete',
    REFRESH: 'Refresh',
    NEXT: 'Next',
};

const BUTTON_ICONS: Record<Exclude<GridAction, 'NEXT'>, React.ReactElement> = {
    ADD: <AddIcon fontSize="small" />,
    EDIT: <EditIcon fontSize="small" />,
    DELETE: <DeleteIcon fontSize="small" />,
    REFRESH: <RefreshIcon fontSize="small" />,
};


// ============================================================================
// handleListAction — core action handler
// ============================================================================

/**
 * Execute a grid list action: confirm (for DELETE) → build EEData →
 * post to server → process commands → NEXT-loop.
 *
 * VBS: ListButtonOnClick (lines 6609-6708) built EEData via
 * handlerForListButtonOnClick, posted via xmlServerCall, processed
 * browser commands, then looped for NEXT actions.
 *
 * Real POC: handlerForListButtonOnClick already builds the correct
 * EEData shape. We add the confirm dialog, server call, command
 * processing, and NEXT-loop orchestration.
 *
 * @param gridMatchcode  The grid's matchcode (list name for the server)
 * @param action         The toolbar action (ADD, EDIT, DELETE, REFRESH)
 * @param rows           Selected row(s) to act on
 * @param opts           Command handlers, XML file name, etc.
 * @returns              true if the action completed successfully
 */
export async function handleListAction(
    gridMatchcode: string,
    action: GridAction,
    rows: Array<{ id: string | number; keyValue?: string; [key: string]: unknown }>,
    opts: {
        listName?: string;
        xmlFileName?: string;
        commandHandlers?: CommandHandlers;
        runCommands?: (commands: unknown[]) => void | Promise<void>;
    } = {},
): Promise<boolean> {
    // -----------------------------------------------------------------------
    // 1. DELETE confirm dialog
    //    VBS: "Delete the selected row?" / "Delete N selected rows?"
    //    Shows confirm before any server call.
    // -----------------------------------------------------------------------
    if (action === 'DELETE') {
        const count = rows.length;
        if (count === 0) return false;
        const confirmed = window.confirm(
            count === 1
                ? 'Delete the selected row?'
                : `Delete ${count} selected rows?`,
        );
        if (!confirmed) return false;
    }

    // -----------------------------------------------------------------------
    // 2. Stamp session variables (VBS: mstrCurrentButton, mstrSelectedRow)
    //    VBS: Set mstrCurrentButton = button matchcode before the server call
    //    Real POC: SessionStoreApi.getState().actions.setSession({ key, value })
    // -----------------------------------------------------------------------
    const sessionActions = SessionStoreApi.getState()?.actions;
    sessionActions?.setSession?.({
        key: 'mstrCurrentButton',
        value: gridMatchcode,
    });

    // -----------------------------------------------------------------------
    // 3. Determine rows to iterate
    //    VBS NEXT-loop: for NEXT/DELETE, iterate ALL selected rows sequentially.
    //    For ADD/EDIT/REFRESH, process only the first (or current) row.
    // -----------------------------------------------------------------------
    const isMultiRowAction = action === 'DELETE' || action === 'NEXT';
    const targets = isMultiRowAction ? rows : [rows[0]].filter(Boolean);

    // For ADD, there may be no selected row — that's OK
    if (action !== 'ADD' && targets.length === 0) {
        return false;
    }

    // -----------------------------------------------------------------------
    // 4. Sequential server call loop (VBS NEXT-loop pattern)
    //    VBS: For each selected row, build EEData, post, process commands.
    //    The loop continues until all rows are processed or the server
    //    returns an error/stop command.
    // -----------------------------------------------------------------------
    const listName = opts.listName ?? gridMatchcode;

    for (const row of targets) {
        // Stamp the selected row key into session for the server
        const rowKey = String(row?.keyValue ?? row?.id ?? '');
        sessionActions?.setSession?.({
            key: 'mstrSelectedRow',
            value: rowKey,
        });

        // Build EEData using the existing payload builder
        // handlerForListButtonOnClick(listMatchcode, action, xmlFileName, opts?)
        // Returns: { lValue: action, xValue: rowKey, postProcessAction: action, ... }
        const eeData = handlerForListButtonOnClick(
            listName,
            action,
            opts.xmlFileName ?? '',
            { rowCount: rows.length, selectedKey: rowKey },
        );

        // Build the full server payload
        const session = SessionStoreApi.getState();
        const payload = {
            object: 'ZENTEDTCTL',
            ...(session?.toPayload?.() ?? {}),
            eeData,
            callType: 'POST',
        };

        // POST to server
        let response: unknown;
        try {
            response = await baseQuery({ method: 'POST', url: '/ui/page/data', data: payload });
        } catch (error) {
            console.error(`[grid-actions] Server call failed for ${action}:`, error);
            return false;
        }

        // ---------------------------------------------------------------
        // 5. Process browser commands from server response
        //    VBS: Looped through browserCtl.call array, dispatched each
        //    Real POC: handlerForBrowserCommands handles the full set
        //    (LOAD_GRID, CLEAR_GRID, SET_TEXT, NAVIGATE, etc.)
        // ---------------------------------------------------------------
        const responseData = response as {
            results?: { aqs?: { browserCtl?: { call?: unknown[] } } };
            commands?: unknown[];
        } | null;

        const commands =
            responseData?.results?.aqs?.browserCtl?.call ??
            responseData?.commands;

        if (Array.isArray(commands) && commands.length > 0) {
            if (opts.runCommands) {
                await opts.runCommands(commands);
            } else if (opts.commandHandlers) {
                handlerForBrowserCommands(commands as any[], opts.commandHandlers);
            }

            // Check if server sent a STOP or error command that should
            // halt the NEXT-loop
            const hasStop = commands.some(
                (cmd: any) =>
                    cmd?.verb?.toUpperCase() === 'STOP' ||
                    cmd?.verb?.toUpperCase() === 'DISPLAY_ERROR',
            );
            if (hasStop) break;
        }
    }

    return true;
}


// ============================================================================
// GridToolbar component
// ============================================================================

/**
 * Grid toolbar with Add/Edit/Delete/Refresh buttons.
 *
 * VBS: The grid toolbar was part of the COM grid control, with hardcoded
 * buttons that triggered ListButtonClick.
 *
 * Real POC: The data-grid.tsx currently has NO toolbar. This component
 * renders above the MUI DataGrid and dispatches actions via handleListAction.
 *
 * Usage:
 *   <GridToolbar
 *       gridMatchcode="lstVehicles"
 *       selectedRow={selectedRow}
 *       config={{ showAdd: true, showDelete: true }}
 *       onActionComplete={() => void refetch()}
 *   />
 */
export function GridToolbar({
    gridMatchcode,
    selectedRow,
    selectedRows = [],
    config = {},
    onActionComplete,
    commandHandlers,
    xmlFileName,
}: GridToolbarProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const {
        showAdd = true,
        showEdit = true,
        showDelete = true,
        showRefresh = true,
        buttonLabels = {},
        disabledButtons = [],
    } = config;

    // Rows to act on: multi-select if available, else single selected row
    const actionRows = useMemo(() => {
        if (selectedRows.length > 0) return selectedRows;
        if (selectedRow) return [selectedRow];
        return [];
    }, [selectedRow, selectedRows]);

    // Determine which buttons need a selection to be enabled
    const needsSelection = useCallback(
        (action: GridAction): boolean => {
            // ADD and REFRESH don't require a selected row
            return action !== 'ADD' && action !== 'REFRESH';
        },
        [],
    );

    const isButtonDisabled = useCallback(
        (action: GridAction): boolean => {
            if (isProcessing) return true;
            if (disabledButtons.includes(action)) return true;
            if (needsSelection(action) && actionRows.length === 0) return true;
            return false;
        },
        [isProcessing, disabledButtons, needsSelection, actionRows.length],
    );

    const handleAction = useCallback(
        async (action: GridAction) => {
            setIsProcessing(true);
            try {
                const success = await handleListAction(
                    gridMatchcode,
                    action,
                    actionRows as Array<{ id: string | number; keyValue?: string }>,
                    { xmlFileName, commandHandlers },
                );
                if (success) {
                    onActionComplete?.(action);
                }
            } finally {
                setIsProcessing(false);
            }
        },
        [gridMatchcode, actionRows, xmlFileName, commandHandlers, onActionComplete],
    );

    // Button definitions — order matches VBS toolbar layout
    const buttons: Array<{
        action: Exclude<GridAction, 'NEXT'>;
        show: boolean;
    }> = [
        { action: 'ADD', show: showAdd },
        { action: 'EDIT', show: showEdit },
        { action: 'DELETE', show: showDelete },
        { action: 'REFRESH', show: showRefresh },
    ];

    const visibleButtons = buttons.filter((b) => b.show);
    if (visibleButtons.length === 0) return null;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.5,
                borderBottom: 1,
                borderColor: 'divider',
            }}
        >
            {visibleButtons.map((btn, idx) => (
                <React.Fragment key={btn.action}>
                    {/* Divider between Delete and Refresh (visual grouping) */}
                    {idx > 0 &&
                        btn.action === 'REFRESH' &&
                        visibleButtons[idx - 1]?.action === 'DELETE' && (
                            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                        )}
                    <Tooltip
                        title={buttonLabels[btn.action] ?? DEFAULT_BUTTON_LABELS[btn.action]}
                    >
                        <span>
                            {/* span wrapper needed for Tooltip on disabled button */}
                            <IconButton
                                size="small"
                                disabled={isButtonDisabled(btn.action)}
                                onClick={() => void handleAction(btn.action)}
                                color={btn.action === 'DELETE' ? 'error' : 'default'}
                                aria-label={
                                    buttonLabels[btn.action] ??
                                    DEFAULT_BUTTON_LABELS[btn.action]
                                }
                            >
                                {BUTTON_ICONS[btn.action]}
                            </IconButton>
                        </span>
                    </Tooltip>
                </React.Fragment>
            ))}
        </Box>
    );
}


// ============================================================================
// INTEGRATION GUIDE: How to wire GridToolbar into data-grid.tsx
// ============================================================================
//
// The Real POC's data-grid.tsx (v2) at:
//   /src/components/ui/data-grid.tsx
//
// Currently accepts a GridNode and renders MUI DataGrid with rows from
// useGridRows()[node.matchcode]. handleRowClick stamps mstrSelectedRow.
// There is NO toolbar.
//
// === STEP 1: Add selected row state to the DataGrid component ===
//
//   // In data-grid.tsx, add state for the selected row:
//   const [selectedRow, setSelectedRow] = useState<GridRow | null>(null);
//   const [selectedRows, setSelectedRows] = useState<GridRow[]>([]);
//
//   // Update handleRowClick to also track the selected row object:
//   const handleRowClick = useCallback((params: GridRowParams) => {
//       // Existing: stamp mstrSelectedRow in SessionStore
//       SessionStoreApi.getState()?.actions?.setSession?.({
//           key: 'mstrSelectedRow',
//           value: String(params.row?.id ?? ''),
//       });
//       // NEW: track the selected row for toolbar actions
//       setSelectedRow(params.row as GridRow);
//       // ... existing schema event bindings ...
//   }, []);
//
//   // For multi-select grids, use onRowSelectionModelChange:
//   const handleSelectionChange = useCallback((selectionModel: GridRowSelectionModel) => {
//       const selected = selectionModel
//           .map((id) => rows?.find((r) => r.id === id))
//           .filter(Boolean) as GridRow[];
//       setSelectedRows(selected);
//   }, [rows]);
//
// === STEP 2: Render GridToolbar above the DataGrid ===
//
//   import { GridToolbar } from '@/components/ui/grid-toolbar';
//
//   // In the DataGrid component's return:
//   return (
//       <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//           {/* Show toolbar if the grid's schema has toolbar config */}
//           {node.field?.showToolbar !== false && (
//               <GridToolbar
//                   gridMatchcode={node.matchcode}
//                   selectedRow={selectedRow}
//                   selectedRows={selectedRows}
//                   config={{
//                       showAdd: node.field?.toolbarButtons?.includes('ADD') ?? true,
//                       showEdit: node.field?.toolbarButtons?.includes('EDIT') ?? true,
//                       showDelete: node.field?.toolbarButtons?.includes('DELETE') ?? true,
//                       showRefresh: node.field?.toolbarButtons?.includes('REFRESH') ?? true,
//                   }}
//                   xmlFileName={xmlFileName}
//                   commandHandlers={commandCallbacks}
//               />
//           )}
//           <MuiDataGrid
//               rows={rows ?? []}
//               columns={columns}
//               onRowClick={handleRowClick}
//               checkboxSelection={node.field?.multiSelect}
//               onRowSelectionModelChange={handleSelectionChange}
//               {...otherProps}
//           />
//       </Box>
//   );
//
// === STEP 3: Row selection staging ===
//
// The grid-store currently only has setRows/clearRows. To stage selected
// rows for the next server call, you have two options:
//
// Option A (RECOMMENDED): Keep selection state local to the DataGrid
//   component (as shown above). The handleListAction function receives
//   the selected rows directly as a parameter.
//
// Option B: Add selection tracking to grid-store if other components
//   need to read the selection:
//
//   // In grid-store.ts, add:
//   selectedRows: Partial<Record<string, GridRow[]>>,
//   actions: {
//       ...existingActions,
//       setSelectedRows: (matchcode: string, rows: GridRow[]) => void,
//       clearSelectedRows: (matchcode: string) => void,
//   }
//
// ============================================================================

export default GridToolbar;
