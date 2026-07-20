import { postRaw } from '@/services/ee-call';
import { SessionStoreApi } from '@/stores/session-store';
import { confirmDialog } from '@/utils/confirm';

// VBS: Main_ISLLSYS #66 ListButtonClick        (lines 6553-6590)
//    + #68 ListButtonOnClick     (lines 6609-6708)
//
// REVISED after team commit 885a1365:
// - Row click handling + mstrSelectedRow stamping → now in data-grid.tsx
// - LOAD_GRID / CLEAR_GRID → now in command.ts + form-action-executor.ts
// - Row selection staging → team's grid-store.setRows/clearRows
//
// This file now ONLY contains: DELETE confirm + NEXT loop (toolbar actions
// that the team's commit does not yet cover).

export type GridAction = 'ADD' | 'EDIT' | 'DELETE' | 'NEXT';

type RunCommands = (commands: unknown[]) => void | Promise<void>;

export async function executeGridAction(
    gridId: string,
    action: GridAction,
    rows: Array<{ id: string; keyValue: string }>,
    opts: { listName?: string; runCommands?: RunCommands } = {},
): Promise<void> {
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

    const targets = action === 'NEXT' ? rows : [rows[0]].filter(Boolean);

    for (const row of targets) {
        const session = SessionStoreApi.getState();
        const payload = {
            ...((session?.actions?.toPayload?.() as object) ?? {}),
            listAction: action,
            listName: opts.listName ?? gridId,
            listValue: row?.keyValue ?? '',
        };
        const response = await postRaw(payload);
        if (response === null) return;

        const commands = (response as { commands?: unknown[] })?.commands;
        if (Array.isArray(commands) && opts.runCommands) {
            await opts.runCommands(commands);
        }
    }
}

export default executeGridAction;
