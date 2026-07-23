// GAP #64 — NoteButtonOnClick (eebrowser.vbs lines 6365-6468)
// NEW FILE — target: src/handlers/common/notes.ts
// Purpose: note/attachment button — collects selected grid row IDs (falls back to
// the session nodeKey), posts a 'dtaNOTES' EE call, then routes response browser
// commands (OPEN_MODAL shows the note modal). Auto-discovered via import.meta.glob.

// handlers
import { handlerForListButtonOnClick } from '@/handlers/common/payload';
import { handlerForBrowserCommands } from '@/handlers/common/command';

// services
import { pageData } from '@services/page-data';

// stores
import { SessionStoreApi } from '@stores/session-store';
import { GridStoreApi } from '@stores/grid-store';
import { ModalStoreApi } from '@stores/modal-store';

// types
import type { BrowserCommand } from '@/types/common';
import type { GridRow } from '@stores/grid-store';
import type { PageDataPayload } from '@services/page-data';
import type { HandlerFunction, HandlerModuleSchema } from '@/types/handler';

// ------------------------------------------------------

/** Matchcode the legacy note engine listens for (VBS: NoteButtonOnClick). */
const NOTE_MATCHCODE = 'dtaNOTES';

/** True when a grid row is flagged as selected by the DataGrid wiring. */
const isRowSelected = (row: GridRow): boolean => {
    const flag = row['selected'];
    return flag === true || flag === 'T' || flag === 'true' || flag === '1';
};

/**
 * Collects the selected row IDs for a grid matchcode.
 * When no matchcode is provided, scans every registered grid.
 */
const collectSelectedRowIds = (gridMatchcode: string): string[] => {
    const { rows } = GridStoreApi.getState();
    const gridRows: GridRow[] =
        gridMatchcode.length > 0
            ? (rows[gridMatchcode] ?? [])
            : Object.values(rows).flatMap((gridRowSet) => gridRowSet ?? []);
    return gridRows.filter(isRowSelected).map((row) => String(row.id));
};

/**
 * NoteButtonOnClick equivalent (VBS 6365-6468).
 * 1. Collect the selected row IDs from grid-store (session nodeKey when none —
 *    the note then attaches to the current tree node).
 * 2. Build the note EEData ('dtaNOTES') via the payload.ts list-button helper.
 * 3. POST through the EE server-call path (/ui/page/data).
 * 4. Route the response commands — the server answers with OPEN_MODAL, which
 *    shows the note modal via the standard Modal pending-params flow.
 *
 * Args: { gridMatchcode?: string } — the xmllist control hosting the selection.
 */
const handleNoteButtonClick: HandlerFunction = async (schema) => {
    const session = SessionStoreApi.getState();
    const xmlFileName = schema.context.xmlFileName || session.xmlFileName;

    const gridMatchcode = (schema.args?.gridMatchcode as string) ?? '';
    const selectedIds = collectSelectedRowIds(gridMatchcode);

    // EEData: xValue = pipe-joined selected row IDs; with no grid selection the
    // helper falls back to emptyListNodeKey (the current session nodeKey).
    const eeData = handlerForListButtonOnClick(
        NOTE_MATCHCODE,
        schema.context.action,
        xmlFileName,
        {
            selectedKey: selectedIds.join('|'),
            rowCount: selectedIds.length,
            emptyListNodeKey: session.nodeKey,
        },
    );

    const payload: PageDataPayload = {
        object: 'ZENTEDTCTL',
        compLoc: session.compLoc,
        userId: session.userId,
        policyId: session.policyId,
        nodeKey: session.nodeKey,
        action: session.action.toUpperCase(),
        diagnosticMode: session.diagnosticMode,
        xmlFile: xmlFileName,
        xmlDetail: session.xmlDetail,
        eeData,
        calls: { type: 'post', call: [] },
    };

    const result = await pageData(payload);

    if (!result.status || !result.data) {
        console.warn('[Handler:onNoteButtonClick] Note server call failed:', result.error);
        return;
    }

    const commands = (result.data.response.results.aqs.browserCtl?.call ??
        []) as BrowserCommand[];

    // OPEN_MODAL from the server shows the note modal; DISPLAY_* map to inline alerts.
    handlerForBrowserCommands(commands, {
        onOpenModal: (action, nodeKey, height, width) => {
            ModalStoreApi.getState().actions.setPendingParams({ action, nodeKey, height, width });
        },
        onDisplayMessage: (message, type) => {
            const variant = type === 'error' ? 'error' : type === 'info' ? 'info' : 'warning';
            ModalStoreApi.getState().actions.setVariant(variant, message);
        },
    });
};

// ----------------------------------------------------------------
// Export catalog
// handlerResolver loads all files in src/handlers/common/*.ts via import.meta.glob
// and merges their `handlers` exports. This file is auto-discovered.
// ----------------------------------------------------------------

export const handlers: HandlerModuleSchema['handlers'] = {
    onNoteButtonClick: handleNoteButtonClick,
};
