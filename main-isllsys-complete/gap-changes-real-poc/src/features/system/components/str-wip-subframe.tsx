// GAP #37 — RefreshSearchPageLists (Main_ISLLSYS.vbs lines 2842-2919)
// MODIFIED — src/features/system/components/str-wip-subframe.tsx
// Full copy of the original placeholder, extended: renders the WIP grid
// area (grid-store rows for WIPQUEUE) and wires the refetch trigger — a
// local wipRefreshToken counter bumped by module-level store
// subscriptions after SAVE / DELETE / SUBMIT / RATE actions.

import { Box } from '@mui/material';

// >>> GAP #37: RefreshSearchPageLists — imports
import { useEffect } from 'react';
import { create } from 'zustand';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

// stores
import { SessionStoreApi } from '@stores/session-store';
import { TreeStoreApi } from '@stores/tree-store';
import { GridStoreApi, useGridRows } from '@stores/grid-store';

// services
import { pageData } from '@services/page-data';

// types
import type { GridRow } from '@stores/grid-store';
// <<< GAP #37

// ---------------------------------------------

// >>> GAP #37: RefreshSearchPageLists — refetch trigger wiring
// Neither session-store nor navigation-store exposes a wipRefreshToken,
// so this module owns the counter and derives the signal itself via the
// module-level subscriptions below (same ModalStoreApi.subscribe pattern
// used in components/modal/modal.tsx and use-deferred-navigation.ts).

/** WIP grid matchcode from the search-page schema (WIPQueue). */
const WIP_GRID_MATCHCODE = 'WIPQUEUE';

/** Session actions that mutate WIP contents — legacy RefreshSearchPageLists triggers. */
const WIP_MUTATING_ACTIONS = ['SAVE', 'DELETE', 'SUBMIT', 'RATE'];

interface WipRefreshState {
    /** Monotonic counter — every bump means "WIP data may be stale, refetch". */
    token: number;
    actions: {
        bump: () => void;
    };
}

const useWipRefreshStore = create<WipRefreshState>()((set) => ({
    token: 0,
    actions: {
        bump: () => {
            set((state) => ({ token: state.token + 1 }));
        },
    },
}));

export const WipRefreshStoreApi = useWipRefreshStore;

// Signal 1: session action transitions into a mutating verb
// (updateSessionFromArray writes the verb back after the server call).
SessionStoreApi.subscribe((state, prev) => {
    if (state.action === prev.action) return;
    if (WIP_MUTATING_ACTIONS.includes(String(state.action).toUpperCase())) {
        WipRefreshStoreApi.getState().actions.bump();
    }
});

// Signal 2: tree invalidation — the refreshTree common handler sets
// isTreeLoaded=false after a successful save that changes policy
// structure (see handlers/common/shared.ts), which is exactly when the
// legacy code refreshed the WIP/search lists too.
TreeStoreApi.subscribe((state, prev) => {
    if (prev.isTreeLoaded && !state.isTreeLoaded) {
        WipRefreshStoreApi.getState().actions.bump();
    }
});

/**
 * Refetch the WIP queue rows into grid-store.
 * eeData mirrors handlerForListButtonOnClick(matchcode, 'REFRESH', ...).
 * Rows come back via results.aqs.listItems.value as JSON — parsed
 * defensively like parseGridRows in handlers/common/command.ts.
 */
async function fetchWipRows(): Promise<void> {
    const session = SessionStoreApi.getState();

    const result = await pageData({
        object: 'ZENTEDTCTL',
        ...session.actions.toPayload(),
        callType: 'GET',
        eeData: {
            xmlFileName: session.xmlFileName ?? '',
            controlMatchcode: WIP_GRID_MATCHCODE,
            controlText: 'REFRESH',
            controlIndex: '',
            selectedNodesXml: '',
            postProcessAction: 'REFRESH',
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

    if (!result.status || !result.data) {
        if (import.meta.env.DEV) {
            console.warn('[Str_WIP_Subframe] WIP refetch failed:', result.error);
        }
        return;
    }

    const rawValue = result.data.response.results.aqs.listItems?.value ?? '';
    const rawJson = Array.isArray(rawValue) ? rawValue.join('') : rawValue;

    let rows: GridRow[] = [];
    if (rawJson) {
        try {
            const parsed = JSON.parse(rawJson) as unknown;
            if (Array.isArray(parsed)) {
                rows = parsed.map((row, i) => {
                    const r = row as Record<string, unknown>;
                    return { id: (r['id'] as string | number) ?? String(i), ...r };
                });
            }
        } catch {
            if (import.meta.env.DEV) {
                console.warn('[Str_WIP_Subframe] Could not parse WIP rows:', rawJson);
            }
        }
    }

    GridStoreApi.getState().actions.setRows(WIP_GRID_MATCHCODE, rows);
}
// <<< GAP #37

// ---------------------------------------------

function Str_WIP_Subframe() {
    // >>> GAP #37: RefreshSearchPageLists — refetch on mount + token bump
    const wipRefreshToken = useWipRefreshStore((state) => state.token);
    const rows = useGridRows()[WIP_GRID_MATCHCODE] ?? [];

    useEffect(() => {
        void fetchWipRows();
    }, [wipRefreshToken]);

    // Placeholder column set derived from the row shape (the full grid
    // engine — data-grid.tsx — needs a FormRenderer context, so the WIP
    // subframe keeps a plain table until it is schema-driven).
    const columns = rows.length > 0 ? Object.keys(rows[0]).filter((key) => key !== 'id') : [];
    // <<< GAP #37

    return (
        <Box className="flex max-h-full">
            {/* >>> GAP #37: RefreshSearchPageLists — WIP grid area
                (original placeholder <p>Str_WIP_Subframe</p> replaced) */}
            <Box className="flex flex-col grow p-4 overflow-y-auto" data-testid="wip-subframe">
                <Typography variant="h6" component="h1" className="mb-3!">
                    Work In Process
                </Typography>

                {rows.length === 0 ? (
                    <Typography variant="body2" data-testid="wip-empty-state">
                        No work-in-process items.
                    </Typography>
                ) : (
                    <TableContainer>
                        <Table size="small" aria-label="Work in process items" data-testid="wip-table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column}>{column}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id} hover>
                                        {columns.map((column) => (
                                            <TableCell key={column}>{String(row[column] ?? '')}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
            {/* <<< GAP #37 */}
        </Box>
    );
}

// ---------------------------------------------

export { Str_WIP_Subframe };
