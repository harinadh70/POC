// GAP #65 — InfoButtonOnClick (eebrowser.vbs lines 6472-6549)
// NEW FILE — target: src/handlers/common/info-lookup.ts
// Purpose: info/lookup button — reads the control's calltype ('info' | 'lookup' |
// 'search'), posts an EE call carrying it, then dispatches the response commands
// (info -> DISPLAY_MESSAGE, lookup/search -> OPEN_MODAL). Auto-discovered via glob.

// handlers
import { handlerForButtonOnClick } from '@/handlers/common/payload';
import { handlerForBrowserCommands } from '@/handlers/common/command';

// services
import { pageData } from '@services/page-data';

// stores
import { SessionStoreApi } from '@stores/session-store';
import { ModalStoreApi } from '@stores/modal-store';

// types
import type { BrowserCommand } from '@/types/common';
import type { PageDataPayload } from '@services/page-data';
import type { HandlerFunction, HandlerModuleSchema } from '@/types/handler';

// ------------------------------------------------------

/**
 * InfoButtonOnClick equivalent (VBS 6472-6549).
 * Reads the control's @calltype and posts an EE call carrying it; the server
 * decides the response verb, which the command dispatcher below routes:
 *   - 'info'   -> server answers DISPLAY_MESSAGE — read-only info text, shown
 *                 as an inline modal alert (no navigation).
 *   - 'lookup' -> server answers OPEN_MODAL — selection-grid modal; the picked
 *                 row flows back through the normal modal return-value path.
 *   - 'search' -> server answers OPEN_MODAL — same as lookup but the modal
 *                 hosts a search form in front of the selection grid.
 *
 * ControlSchema (src/types/common.ts) has no dedicated calltype field, so the
 * value arrives via the schema binding attrs:
 * Args: { matchcode: string; calltype?: 'info' | 'lookup' | 'search' }
 */
const handleInfoButtonClick: HandlerFunction = async (schema) => {
    const session = SessionStoreApi.getState();
    const xmlFileName = schema.context.xmlFileName || session.xmlFileName;

    const matchcode = (schema.args?.matchcode as string) ?? '';
    const calltype = ((schema.args?.calltype as string) ?? 'info').toLowerCase();

    if (!matchcode) {
        console.warn('[Handler:onInfoButtonClick] No matchcode arg provided — cannot call server');
        return;
    }

    // lValue carries the calltype so the server branches exactly like the VBS did
    const eeData = handlerForButtonOnClick(matchcode, xmlFileName, calltype);

    const payload: PageDataPayload = {
        object: 'ZENTEDTCTL',
        compLoc: session.compLoc,
        userId: session.userId,
        policyId: session.policyId,
        nodeKey: session.nodeKey,
        action: session.action.toUpperCase(),
        diagnosticMode: session.diagnosticMode,
        xmlFile: xmlFileName,
        callType: calltype,
        xmlDetail: session.xmlDetail,
        eeData,
        calls: { type: 'inquiry', call: [] },
    };

    const result = await pageData(payload);

    if (!result.status || !result.data) {
        console.warn('[Handler:onInfoButtonClick] Info server call failed:', result.error);
        return;
    }

    const commands = (result.data.response.results.aqs.browserCtl?.call ??
        []) as BrowserCommand[];

    // calltype 'info' arrives here as DISPLAY_MESSAGE; 'lookup' / 'search' as OPEN_MODAL
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
    onInfoButtonClick: handleInfoButtonClick,
};
