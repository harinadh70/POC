import { postRaw } from '@/services/ee-call';
import { SessionStoreApi } from '@/stores/session-store';
import { confirmDialog } from '@utils/confirm';

// VBS: Main_ISLLSYS #66 ListButtonClick        (lines 6553-6590)
//    + #67 XMLListonItemSelected (lines 6594-6605)
//    + #68 ListButtonOnClick     (lines 6609-6708)
// Grid action flow: row selection stages the row's key value; a toolbar
// action posts it (confirm first for DELETE); NEXT loops over every
// selected row.
//
// Module-local staging keeps this independent of the client branch's
// grid-store shape (R4). If the branch's grid-store exposes selection,
// wire it in at the merge point instead.

export type GridAction = 'ADD' | 'EDIT' | 'DELETE' | 'NEXT';

export interface StagedRow {
    id: string;
    /** Value posted to the server (legacy: the row's key column value). */
    keyValue: string;
    label?: string;
}

const staged = new Map<string, StagedRow[]>(); // gridId -> selected rows

/** Row (de)selection — call from the grid's onRowSelectionChange. */
export function stageRowSelection(gridId: string, rows: StagedRow[]): void {
    staged.set(gridId, rows);
}

export function getStagedRows(gridId: string): StagedRow[] {
    return staged.get(gridId) ?? [];
}

export function clearStagedRows(gridId: string): void {
    staged.delete(gridId);
}

type RunCommands = (commands: unknown[]) => void | Promise<void>;

/**
 * Toolbar action processor. DELETE confirms first; NEXT posts each staged
 * row in sequence (the legacy NEXT loop).
 */
export async function executeGridAction(
    gridId: string,
    action: GridAction,
    opts: { listName?: string; runCommands?: RunCommands } = {},
): Promise<void> {
    const rows = getStagedRows(gridId);

    if (action === 'DELETE') {
        const count = rows.length;
        if (count === 0) return;
        const ok = await confirmDialog(
            count === 1
                ? `Delete the selected row?`
                : `Delete ${count} selected rows?`,
        );
        if (!ok) return;
    }

    const targets: (StagedRow | null)[] =
        action === 'NEXT' ? rows : [rows[0] ?? null];

    for (const row of targets) {
        const session = SessionStoreApi.getState();
        const payload = {
            ...((session?.actions?.toPayload?.() as object) ?? {}),
            listAction: action,
            listName: opts.listName ?? gridId,
            listValue: row?.keyValue ?? '',
        };
        const response = await postRaw(payload);
        if (response === null) return; // ee-call not configured

        const commands = (response as { commands?: unknown[] })?.commands;
        if (Array.isArray(commands) && opts.runCommands) {
            await opts.runCommands(commands);
        }
    }

    if (action === 'DELETE') clearStagedRows(gridId);
}

export default executeGridAction;
