import { useCallback, useEffect, useRef, type Dispatch } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useActionGuard } from '@hooks/use-action-guard';
import { useGlobalVariableStore } from '@/providers/global-variable-provider';

import { xmlServerCall } from '@services/xml-server-call';
import type { CommitEventType, ControlType } from '@/types';
import type { SessionInfo } from '@features/auth/services/auth';
import type { ModalAction, ModalState } from '@components/modal-dialog/use-modal-state';
import { getItem } from '@utils/local-storage';
import { createFeatureLogger } from '@utils/logger-builder';
import {
    parseBrowserCommandsFromXMLServerCall,
    type BrowserCommand,
} from '@utils/apply-server-commands';
import {
    buildXMLServerCallPayload,
    extractCallsFromPageBuild,
} from '@utils/build-xml-server-call-payload';
import type { PageBuildButton } from '@utils/transform-pagebuild-response';
import { parseComboItems } from '@utils/parse-combo-items';

const logger = createFeatureLogger('modal', 'ModalActions');

const FIELD_COMMIT_DEDUPE_WINDOW_MS = 450;
const GUARDED_MODAL_ACTIONS = new Set(['DELETE', 'SUBMIT', 'ISSUE', 'APPROVE', 'CANCEL']);

type CommitSignature = {
    eventType: CommitEventType;
    value: string;
    timestamp: number;
};

const normalizeCommitValue = (value: string | number | boolean): string => {
    if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
    }
    return String(value ?? '');
};

const isCommitEventAllowed = (controlType: ControlType, eventType: CommitEventType): boolean => {
    if (controlType === 'textbox' || controlType === 'textarea') {
        return eventType === 'blur' || eventType === 'enter';
    }

    if (
        controlType === 'select' ||
        controlType === 'checkbox' ||
        controlType === 'radio' ||
        controlType === 'date' ||
        controlType === 'calendar'
    ) {
        return eventType === 'change';
    }

    return false;
};

const isDuplicateCommit = (
    lastCommit: CommitSignature | undefined,
    nextEventType: CommitEventType,
    nextValue: string,
    now: number,
): boolean => {
    if (!lastCommit) {
        return false;
    }

    if (nextValue !== lastCommit.value) {
        return false;
    }

    if (now - lastCommit.timestamp > FIELD_COMMIT_DEDUPE_WINDOW_MS) {
        return false;
    }

    if (lastCommit.eventType === nextEventType) {
        return true;
    }

    if (
        nextEventType === 'blur' &&
        (lastCommit.eventType === 'enter' || lastCommit.eventType === 'change')
    ) {
        return true;
    }

    return false;
};

interface UseModalActionsParams {
    open: boolean;
    xmlDetail: unknown;
    xmlFileName?: string;
    state: ModalState;
    dispatch: Dispatch<ModalAction>;
    formMethods: UseFormReturn<Record<string, unknown>>;
    onClose: (deferredNavigation?: { action: string; nodeKey?: string }) => void;
    onBrowserCommands?: (commands: BrowserCommand[]) => void;
}

export function useModalActions({
    open,
    xmlDetail,
    xmlFileName,
    state,
    dispatch,
    formMethods,
    onClose,
    onBrowserCommands,
}: UseModalActionsParams) {
    const { isActionAllowed } = useActionGuard();
    const globalVariableStore = useGlobalVariableStore();
    const recentCommitsRef = useRef<Map<string, CommitSignature>>(new Map());
    const fieldCommitSequenceRef = useRef<Map<string, number>>(new Map());
    const modalLifetimeRef = useRef(0);
    const unmountedRef = useRef(false);

    /**
     * Enforce action-level authorization for high-risk modal buttons.
     *
     * @example
     * if (!isButtonActionAllowed('DELETE')) {
     *   console.warn('[Security] DELETE action denied by permissions');
     *   return;
     * }
     */
    const isButtonActionAllowed = useCallback(
        (matchcode: string): boolean => {
            const action = matchcode.toUpperCase();
            if (!GUARDED_MODAL_ACTIONS.has(action)) {
                return true;
            }

            return isActionAllowed(action);
        },
        [isActionAllowed],
    );

    useEffect(() => {
        return () => {
            unmountedRef.current = true;
        };
    }, []);

    useEffect(() => {
        if (!open) {
            modalLifetimeRef.current += 1;
            recentCommitsRef.current.clear();
            fieldCommitSequenceRef.current.clear();
        }
    }, [open]);

    const handleClose = useCallback(() => {
        modalLifetimeRef.current += 1;

        const navigateCyclingCommand = state.browserCommands.find(
            (cmd) => cmd.verb === 'NAVIGATE_CYCLING',
        );

        if (navigateCyclingCommand) {
            onClose({
                action: navigateCyclingCommand.noun,
                nodeKey: navigateCyclingCommand.addinf,
            });
            return;
        }

        onClose(undefined);
    }, [onClose, state.browserCommands]);

    const handleCommitField = useCallback(
        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
            const field = state.fields.find((item) => item.matchcode === matchcode);
            if (!field) {
                logger.debug('Skipping field commit: field not found in modal state', {
                    matchcode,
                    eventType,
                });
                return;
            }

            if (!isCommitEventAllowed(field.controlType, eventType)) {
                return;
            }

            const normalizedValue = normalizeCommitValue(value);
            const now = Date.now();
            const previousCommit = recentCommitsRef.current.get(matchcode);
            if (isDuplicateCommit(previousCommit, eventType, normalizedValue, now)) {
                logger.debug('Skipping duplicate field commit', {
                    matchcode,
                    eventType,
                });
                return;
            }

            recentCommitsRef.current.set(matchcode, {
                eventType,
                value: normalizedValue,
                timestamp: now,
            });

            const calls = extractCallsFromPageBuild(xmlDetail, matchcode);
            if (calls.length === 0) {
                logger.debug('No commit calls found for field; skipping XMLServerCall', {
                    matchcode,
                });
                return;
            }

            const sessionInfo = getItem<SessionInfo>('sessionInformation');
            if (!sessionInfo) {
                logger.warn('Skipping field commit: session information not found', { matchcode });
                return;
            }

            const currentSeq = (fieldCommitSequenceRef.current.get(matchcode) ?? 0) + 1;
            fieldCommitSequenceRef.current.set(matchcode, currentSeq);
            const modalSnapshot = modalLifetimeRef.current;

            try {
                const formData = formMethods.getValues();

                const payload = buildXMLServerCallPayload({
                    xmlFileName: xmlFileName || '',
                    formData,
                    sessionInfo,
                    calls,
                    buttonMatchcode: matchcode,
                    fieldOrder: state.fieldOrder,
                    utpOrder: state.utpOrder,
                    sessionXml: state.sessionXml,
                });

                const response = await xmlServerCall(payload);

                if (
                    unmountedRef.current ||
                    modalSnapshot !== modalLifetimeRef.current ||
                    currentSeq !== fieldCommitSequenceRef.current.get(matchcode)
                ) {
                    logger.debug('Ignoring stale field commit response', {
                        matchcode,
                        seq: currentSeq,
                    });
                    return;
                }

                if (response.errors) {
                    logger.warn('Field commit response returned non-fatal errors', {
                        matchcode,
                        errors: response.errors,
                    });
                    return;
                }

                const commands = parseBrowserCommandsFromXMLServerCall(response);
                if (commands.length === 0) {
                    return;
                }

                dispatch({ type: 'SET_COMMANDS', commands });
                onBrowserCommands?.(commands);

                for (const command of commands) {
                    const verb = command.verb.toUpperCase();

                    if (verb === 'SET_TEXT') {
                        formMethods.setValue(command.noun, command.addinf, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: false,
                        });
                        continue;
                    }

                    if (verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS') {
                        const listItems = response.results?.aqs?.ListItems?.value;
                        const options = parseComboItems(listItems);
                        if (options.length > 0) {
                            dispatch({
                                type: 'PATCH_FIELD_OPTIONS',
                                matchcode: command.noun,
                                options,
                            });
                        }
                    }
                }
            } catch (error) {
                logger.error('Non-fatal modal field commit failed', error as Error, {
                    matchcode,
                    eventType,
                });
            }
        },
        [
            xmlDetail,
            xmlFileName,
            state.fields,
            state.fieldOrder,
            state.utpOrder,
            state.sessionXml,
            formMethods,
            dispatch,
            onBrowserCommands,
        ],
    );

    const executeButtonAction = useCallback(
        async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {
            dispatch({ type: 'SUBMITTING', submitting: true });
            dispatch({ type: 'ERROR', error: '' });

            try {
                const sessionInfo = getItem<SessionInfo>('sessionInformation');
                if (!sessionInfo) {
                    throw new Error('Session information not found');
                }

                // Defensive: accept button.calls possibly undefined and fall back to extract from xmlDetail
                const calls =
                    Array.isArray(button.calls) && button.calls.length > 0
                        ? button.calls
                        : extractCallsFromPageBuild(xmlDetail, button.matchcode);

                const isCancel = button.matchcode.toUpperCase() === 'CANCEL';
                if (calls.length === 0) {
                    if (isCancel) {
                        handleClose();
                    }
                    dispatch({ type: 'SUBMITTING', submitting: false });
                    return;
                }

                const payload = buildXMLServerCallPayload({
                    xmlFileName: xmlFileName || '',
                    formData: submitFormData,
                    sessionInfo,
                    calls,
                    buttonMatchcode: button.matchcode,
                    fieldOrder: state.fieldOrder,
                    utpOrder: state.utpOrder,
                    sessionXml: state.sessionXml,
                });

                const response = await xmlServerCall(payload);
                if (response.errors) {
                    dispatch({ type: 'ERROR', error: response.errors });
                    dispatch({ type: 'SUBMITTING', submitting: false });
                    return;
                }

                const commands = parseBrowserCommandsFromXMLServerCall(response);
                dispatch({ type: 'SET_COMMANDS', commands });
                onBrowserCommands?.(commands);

                const closeCommand = commands.find((cmd) => cmd.verb === 'CLOSE_MODAL');
                if (closeCommand || isCancel) {
                    handleClose();
                }
            } catch (err) {
                logger.error('Modal button action failed', err as Error, {
                    button: button.matchcode,
                });
                dispatch({
                    type: 'ERROR',
                    error: err instanceof Error ? err.message : 'Failed to process modal action',
                });
            } finally {
                dispatch({ type: 'SUBMITTING', submitting: false });
            }
        },
        [
            xmlDetail,
            xmlFileName,
            state.fieldOrder,
            state.utpOrder,
            state.sessionXml,
            dispatch,
            onBrowserCommands,
            handleClose,
        ],
    );

    const handleButtonClick = useCallback(
        (button: PageBuildButton) => {
            const action = button.matchcode.toUpperCase();
            globalVariableStore.setVariable('mstrCurrentButton', action);
            logger.debug('Stored current button matchcode for cycling navigation', {
                matchcode: action,
            });

            if (!isButtonActionAllowed(action)) {
                // Permission check before executing server-side action.
                console.warn(`[Security] ${action} action denied by permissions`);
                return;
            }

            void formMethods.handleSubmit(async (formData) => {
                await executeButtonAction(button, formData);
            })();
        },
        [formMethods, executeButtonAction, globalVariableStore, isButtonActionAllowed],
    );

    return {
        handleClose,
        handleCommitField,
        handleButtonClick,
        isButtonActionAllowed,
    };
}
