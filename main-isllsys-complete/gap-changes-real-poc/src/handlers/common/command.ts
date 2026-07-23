// MODIFIED — original: src/handlers/common/command.ts
// GAP #84 SetIconImages (VBS 9025-9090): new SET_ICON verb -> tree-store updateNodeImage
// GAP #8  OpenLink      (VBS 731-826):   new OPEN_LINK verb -> window.open
// REBASED onto team commit 81e0b7ea: that commit swapped the command gate's store
// from BrowserCmdStoreApi to GlobalVarsStoreApi (browser-cmd-store was deleted).
// Changes are wrapped in GAP markers; everything outside them matches the original.

import { SessionStoreApi } from '@stores/session-store';
import { ModalStoreApi } from '@stores/modal-store';
import { GlobalVarsStoreApi } from '@stores/global-vars-store';
// >>> GAP #84: SetIconImages — tree icon updates need the tree store
import { TreeStoreApi } from '@stores/tree-store';
// <<< GAP #84

// types
import type { BrowserCommand, BrowserVerb, Session } from '@/types/common';
import type { GridRow } from '@stores/grid-store';

// ----------------------------------------

/**
 * handlerForBrowserCommands equivalent.
 * Processes the browser command queue and dispatches each verb.
 * Returns true if page navigation occurred (NAVIGATE / NAVIGATE_CYCLING).
 */
export interface CommandHandlers {
    /** Called for NAVIGATE verbs */
    onNavigate?: (xmlFile: string, frame: string) => void;
    /** Called for CLOSE_MODAL verb (in addition to modalStore.close) */
    onCloseModal?: () => void;
    /** Called for SET_TEXT / SET_VALUE / SET_LABELTEXT verbs — update a field value */
    onSetFieldValue?: (matchcode: string, value: string, type: 'text' | 'value' | 'label') => void;
    /** Called for SET_ATTRIBUTE verb */
    onSetAttribute?: (matchcode: string, attribute: string, value: string) => void;
    /** Called for LOAD_COMBO / ADD_LISTITEM / CLEAR_COMBO */
    onComboUpdate?: (matchcode: string, verb: string, items: string) => void;
    /** Called for DISPLAY_ERROR / DISPLAY_QUESTION / DISPLAY_INFORMATION / DISPLAY_MESSAGE */
    onDisplayMessage?: (message: string, type: 'error' | 'question' | 'info' | 'message') => void;
    /** Called for CALL_SERVER — triggers another server call */
    onCallServer?: (matchcode: string, addinf: string) => void;
    /** Called for REFRESH_TREE / REFRESH_MENU */
    onRefresh?: (target: 'tree' | 'menu') => void;
    /** Called for NAVIGATE_CYCLING — build compound action + navigate via React Router */
    onNavigateCycling?: (matchcode: string, nodeKey: string) => void;
    /** Called for OPEN_MODAL — load modal URL via /modal resource route */
    onOpenModal?: (action: string, nodeKey: string, height: number, width: number) => void;
    /** Called for SET_FOCUS — request focus on a control */
    onSetFocus?: (matchcode: string) => void;
    /** Called for LOAD_GRID — replace the rows of an xmllist/grid control */
    onLoadGrid?: (matchcode: string, rows: GridRow[]) => void;
    /** Called for CLEAR_GRID — clear the rows of an xmllist/grid control */
    onClearGrid?: (matchcode: string) => void;
}

export function handlerForBrowserCommands(
    commands: BrowserCommand[],
    handlers: CommandHandlers = {},
): boolean {
    const sessionStore = SessionStoreApi.getState();
    const modalStore = ModalStoreApi.getState();
    // REBASED (team 81e0b7ea): commandsEnabled now lives on the unified store
    const commandStore = GlobalVarsStoreApi.getState();

    if (!commandStore.commandsEnabled) {
        return false;
    }

    let navigated = false;

    for (const cmd of commands) {
        const verb = cmd.verb.toUpperCase() as BrowserVerb;

        switch (verb) {
            // — Navigation
            case 'NAVIGATE': {
                // Once navigate fires, stop processing further commands
                commandStore.actions.setCommandsEnabled(false);
                handlers.onNavigate?.(cmd.noun, cmd.addinf);
                navigated = true;
                break;
            }

            case 'NAVIGATE_CYCLING': {
                commandStore.actions.setCommandsEnabled(false);
                handlers.onNavigateCycling?.(cmd.noun, cmd.addinf);
                navigated = true;
                break;
            }

            // — Modal
            case 'OPEN_MODAL': {
                const [heightStr, widthStr] = cmd.addinf.split(',');
                const height = parseInt(heightStr, 10) || 400;
                const width = parseInt(widthStr, 10) || 600;
                handlers.onOpenModal?.(cmd.noun, cmd.resfil ?? '', height, width);
                break;
            }

            case 'CLOSE_MODAL': {
                modalStore.actions.close();
                handlers.onCloseModal?.();
                break;
            }

            // — Field value updates
            case 'SET_TEXT': {
                handlers.onSetFieldValue?.(cmd.noun, cmd.addinf, 'text');
                break;
            }

            case 'SET_VALUE': {
                handlers.onSetFieldValue?.(cmd.noun, cmd.addinf, 'value');
                break;
            }

            case 'SET_LABELTEXT': {
                handlers.onSetFieldValue?.(cmd.noun, cmd.addinf, 'label');
                break;
            }

            // — Attribute update (disabled, visible, required)
            case 'SET_ATTRIBUTE': {
                handlers.onSetAttribute?.(cmd.noun, cmd.resfil ?? '', cmd.addinf);
                break;
            }

            // — Shorthand disable/enable
            case 'SET_DISABLED': {
                // addinf = "T" (disable) or "F" (enable)
                handlers.onSetAttribute?.(cmd.noun, 'disabled', cmd.addinf);
                break;
            }

            // — Shorthand readonly / required
            case 'SET_READONLY': {
                handlers.onSetAttribute?.(cmd.noun, 'readonly', cmd.addinf);
                break;
            }

            case 'SET_REQUIRED': {
                handlers.onSetAttribute?.(cmd.noun, 'required', cmd.addinf);
                break;
            }

            // — Field focus
            case 'SET_FOCUS': {
                handlers.onSetFocus?.(cmd.noun);
                break;
            }

            // — Session variable update
            case 'SET_VARIABLE': {
                // noun = variable name, addinf = value (may be wrapped in quotes)
                const variableName = cmd.noun.toLowerCase();
                const variableValue = cmd.addinf.replace(/^"(.*)"$/, '$1');
                const boolValue = variableValue.toLowerCase() === 'true';
                const globalVarsActions = GlobalVarsStoreApi.getState().actions;

                // Dispatch known typed GlobalVarsStore flags first
                const globalVarsMap: Partial<Record<string, () => void>> = {
                    mblnpolicyrated: () => globalVarsActions.setPolicyRated(boolValue),
                    mblndocumentsselected: () => globalVarsActions.setDocumentsSelected(boolValue),
                    mblndocumentscomplete: () => globalVarsActions.setDocumentsComplete(boolValue),
                    mblnsummsgchg: () => globalVarsActions.setSumMsgChg(boolValue),
                    mblndatachanged: () => globalVarsActions.setDataChanged(boolValue),
                    mblnratingdatachanged: () => globalVarsActions.setRatingDataChanged(boolValue),
                };
                const globalAction = globalVarsMap[variableName];
                if (globalAction) {
                    globalAction();
                    break;
                }

                // Map known session fields
                const sessionMap: Partial<Record<string, keyof typeof sessionStore>> = {
                    mstrpolicyid: 'policyId',
                    mpolicynumber: 'policyNumber',
                    primaryinsured: 'primaryInsured',
                };
                const storeKey = sessionMap[variableName];
                if (storeKey) {
                    sessionStore.actions.setSession({ [storeKey]: variableValue } as Partial<
                        Omit<Session, 'actions'>
                    >);
                } else {
                    // Unknown variable: fall through to xmlDetail as safe escape hatch
                    sessionStore.actions.setXmlDetailItem(cmd.noun, variableValue);
                }
                break;
            }

            // — Combo list updates
            case 'LOAD_COMBO':
            case 'ADD_LISTITEM':
            case 'CLEAR_COMBO': {
                handlers.onComboUpdate?.(cmd.noun, verb, cmd.addinf);
                break;
            }

            // — Messages
            case 'DISPLAY_ERROR': {
                // Message is in addinf; noun is the field matchcode (may be empty)
                handlers.onDisplayMessage?.(cmd.addinf, 'error');
                break;
            }

            case 'BUSINESS_ERROR': {
                // Same as DISPLAY_ERROR — business-rule validation failure
                handlers.onDisplayMessage?.(cmd.addinf, 'error');
                break;
            }

            case 'DISPLAY_QUESTION': {
                handlers.onDisplayMessage?.(cmd.addinf, 'question');
                break;
            }

            case 'DISPLAY_INFORMATION': {
                handlers.onDisplayMessage?.(cmd.addinf, 'info');
                break;
            }

            case 'DISPLAY_MESSAGE': {
                handlers.onDisplayMessage?.(cmd.addinf, 'message');
                break;
            }

            // — Server re-call
            case 'CALL_SERVER': {
                handlers.onCallServer?.(cmd.noun, cmd.addinf);
                break;
            }

            // — Tree / Menu refresh
            case 'REFRESH_TREE': {
                handlers.onRefresh?.('tree');
                break;
            }

            case 'REFRESH_MENU': {
                handlers.onRefresh?.('menu');
                break;
            }

            case 'CLEAR_ACTIONMENU': {
                handlers.onRefresh?.('menu');
                break;
            }

            // — Session XML item clear
            case 'CLEAR_SESSIONXML_ITEM': {
                sessionStore.actions.clearXmlDetailItem(cmd.noun);
                break;
            }

            // — Grid population
            case 'LOAD_GRID': {
                const rows = parseGridRows(cmd.addinf);
                handlers.onLoadGrid?.(cmd.noun, rows);
                break;
            }

            case 'CLEAR_GRID': {
                handlers.onClearGrid?.(cmd.noun);
                break;
            }

            // >>> GAP #84: SetIconImages — SET_ICON verb (VBS 9025-9090)
            // NOTE: add 'SET_ICON' to the BrowserVerb union in src/types/common.ts
            // — Tree node icon update after server response (e.g. draft -> bound)
            case 'SET_ICON': {
                // noun = tree nodeKey (matchcode field), addinf = icon index / image name
                TreeStoreApi.getState().actions.updateNodeImage(cmd.noun, cmd.addinf);
                break;
            }
            // <<< GAP #84

            // >>> GAP #8: OpenLink — OPEN_LINK verb (VBS 731-826)
            // NOTE: add 'OPEN_LINK' to the BrowserVerb union in src/types/common.ts
            // — External URL in a new window with configurable features
            case 'OPEN_LINK': {
                // noun = url, addinf = target window name, resfil = window features
                const url = cmd.noun;
                const target = cmd.addinf || '_blank';
                const features = cmd.resfil ?? '';
                if (url) {
                    window.open(url, target, features.length > 0 ? features : undefined);
                }
                break;
            }
            // <<< GAP #8

            default: {
                if (import.meta.env.DEV) {
                    console.warn('[BrowserCommands] Unknown verb:', verb, cmd);
                }
            }
        }
    }

    return navigated;
}

/**
 * Parse LOAD_GRID addinf into GridRow[].
 * Server sends either:
 *   - JSON string: '[{"id":"1","col1":"val1",...},...]'
 *   - Pipe/newline delimited rows (legacy): handled defensively
 */
function parseGridRows(addinf: string): GridRow[] {
    if (!addinf) return [];
    try {
        const parsed = JSON.parse(addinf) as unknown;
        if (Array.isArray(parsed)) {
            return parsed.map((row, i) => {
                const r = row as Record<string, unknown>;
                return { id: r['id'] ?? r['Id'] ?? String(i), ...r };
            }) as GridRow[];
        }
    } catch {
        // Fallback: pipe-delimited format (legacy). Treat entire string as a single row.
        if (import.meta.env.DEV) {
            console.warn('[BrowserCommands] LOAD_GRID: could not parse JSON, raw addinf:', addinf);
        }
    }
    return [];
}
