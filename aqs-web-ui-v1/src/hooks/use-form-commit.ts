import { useCallback, useMemo, useState, useEffect, useRef } from 'react';

import type { SessionInfo } from '@features/auth/services/auth';
import { xmlServerCall } from '@/services/xml-server-call';
import {
    buildXMLServerCallPayload,
    extractCallsFromPageBuild,
    extractCallsByTypeFromPageBuild,
} from '@utils/build-xml-server-call-payload';
import { parseBrowserCommandsFromXMLServerCall } from '@utils/apply-server-commands';
import { createFeatureLogger } from '@utils/logger-builder';
import { buildEEDataArray } from '@utils/build-eedata-array';
import {
    extractControlMetadata,
    findControlElement,
    extractAllControlsMetadata,
} from '@utils/control-metadata-extractor';
import type { ControlMetadata } from '@utils/build-eedata-array';

import type { BrowserCommand, CommitEventType } from '@/types';
import type { PageBuildResponse } from '@services/page-build';
import type { UseFormReturn } from 'react-hook-form';
import { navigation } from '@services/navigation';
import { useSubmit } from 'react-router';
import { getItem as getSessionStorageItem } from '@utils/session-storage';
import type { Call, XMLServerCallResponse } from '@/services/xml-server-call';
import { pubSub } from '@utils/pub-sub';
import { getItem as getLocalStorageItem, setItem as setLocalStorageItem } from '@utils/local-storage';
const logger = createFeatureLogger('forms', 'UseFormCommit');

interface SessionSnapshot {
    compLoc: string;
    userId: string;
    policyId: string;
    nodeKey: string;
    action: string;
    diagnosticMode: string;
    sessionXml: string;
}

function extractSessionSnapshot(
    response: XMLServerCallResponse,
    fallbackSessionInfo: SessionInfo,
): SessionSnapshot {
    const rawValues = response.results?.aqs?.SessionInformation?.value;
    const values = Array.isArray(rawValues) ? rawValues.map((item) => String(item ?? '')) : [];

    return {
        compLoc: values[0] ?? fallbackSessionInfo.compLoc ?? '',
        userId: values[1] ?? fallbackSessionInfo.userId ?? '',
        policyId: values[2] ?? fallbackSessionInfo.policyId ?? '0',
        nodeKey: values[3] ?? fallbackSessionInfo.nodeKey ?? 'POL|POL|0|',
        action: values[4] ?? fallbackSessionInfo.action ?? '',
        diagnosticMode: values[5] ?? fallbackSessionInfo.diagnosticMode ?? '0',
        sessionXml: values[6] ?? '',
    };
}

function persistSessionSnapshot(snapshot: SessionSnapshot): void {
    const current = getLocalStorageItem<Record<string, unknown>>('sessionInformation') || {};
    setLocalStorageItem('sessionInformation', {
        ...current,
        compLoc: snapshot.compLoc,
        userId: snapshot.userId,
        policyId: snapshot.policyId,
        nodeKey: snapshot.nodeKey,
        action: snapshot.action,
        diagnosticMode: snapshot.diagnosticMode,
        sessionXml: snapshot.sessionXml,
    });
}

function buildContextSyncCommands(
    commands: BrowserCommand[],
    response: XMLServerCallResponse,
    snapshot: SessionSnapshot,
): BrowserCommand[] {
    const contextCommands: BrowserCommand[] = [
        { verb: 'SET_VARIABLE', noun: 'mstrCompLoc', addinf: `"${snapshot.compLoc}"` },
        { verb: 'SET_VARIABLE', noun: 'mstrUserID', addinf: `"${snapshot.userId}"` },
        { verb: 'SET_VARIABLE', noun: 'mstrPolicyID', addinf: `"${snapshot.policyId}"` },
        { verb: 'SET_VARIABLE', noun: 'mstrNodeKey', addinf: `"${snapshot.nodeKey}"` },
        { verb: 'SET_VARIABLE', noun: 'mstrAction', addinf: `"${snapshot.action}"` },
        { verb: 'SET_VARIABLE', noun: 'mstrDiagnosticMode', addinf: `"${snapshot.diagnosticMode}"` },
        { verb: 'SET_VARIABLE', noun: 'mstrXMLDetail', addinf: `"${snapshot.sessionXml}"` },
    ];

    const hasNavigateCycling = commands.some(
        (command) => command.verb.trim().toUpperCase() === 'NAVIGATE_CYCLING',
    );

    if (hasNavigateCycling) {
        const eeDataValues = response.results?.aqs?.EEData?.value;
        const navigationButton = Array.isArray(eeDataValues)
            ? String(eeDataValues[1] ?? '').trim()
            : '';

        if (navigationButton) {
            contextCommands.push({
                verb: 'SET_VARIABLE',
                noun: 'mstrCurrentButton',
                addinf: `"${navigationButton}"`,
            });
        }
    }

    return [...contextCommands, ...commands];
}

interface SessionXmlItem {
    name: string;
    value: string;
}

export interface UseFormCommitParams {
    pageBuildData?: PageBuildResponse;
    sessionInfo: SessionInfo;
    formMethods: UseFormReturn;
    xmlFileName?: string;
    onCommands?: (commands: BrowserCommand[]) => Promise<void> | void;
    resolveCommitPlan?: (context: CommitPlanContext) => CommitPlanResult | null;
    adaptResponseCommands?: (context: ResponseCommandAdapterContext) => BrowserCommand[];
}

export interface CommitPlanContext {
    matchcode: string;
    value: string | boolean;
    eventType: CommitEventType;
    previousValue?: unknown;
    previousLabel?: string;
    pageBuildData: PageBuildResponse;
    currentFormValues: Record<string, unknown>;
    baseFormData: Record<string, unknown>;
    controlMetadata?: ControlMetadata;
    xmlFileName: string;
    sessionInfo: SessionInfo;
    fieldOrder: string[];
    utpOrder: string[];
    sessionXml: SessionXmlItem[];
}

export interface CommitPlanResult {
    calls: Call[];
    callType?: string;
    processIndicator?: '0' | '1';
    payloadFormData?: Record<string, unknown>;
    includeCallMode?: boolean;
    callMode?: string;
    sessionXmlAsString?: boolean;
}

export interface ResponseCommandAdapterContext {
    commands: BrowserCommand[];
    response: XMLServerCallResponse;
    matchcode: string;
}

export interface UseFormCommitResult {
    commitField: (matchcode: string, value: string | boolean, eventType: CommitEventType) => Promise<void>;
    isCommitting: boolean;
    committingField: string | null;
    error: string | null;
    validationErrors: Record<string, string>;
    clearValidationError: (matchcode: string) => void;
}

const parseSessionXmlItems = (sessionXml: string | undefined): SessionXmlItem[] => {
    if (!sessionXml || !sessionXml.trim()) {
        return [];
    }

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(sessionXml, 'application/xml');
        const parseError = doc.querySelector('parsererror');

        if (parseError) {
            logger.warn('Failed to parse SessionXml from PageBuild response', {
                error: parseError.textContent,
            });
            return [];
        }

        return Array.from(doc.querySelectorAll('item'))
            .map((item) => ({
                name: item.getAttribute('name')?.trim() ?? '',
                value: item.getAttribute('value')?.trim() ?? '',
            }))
            .filter((item) => item.name !== '');
    } catch (error) {
        logger.error('Unexpected SessionXml parse failure', error as Error);
        return [];
    }
};

/**
 * Session Storage Key Management for Previous Field Values
 * Stores previous selected values ONLY for combo/select controls with matchcode-based keys
 * Key format: `AQS_PREVIOUS_VALUE_<MATCHCODE>`
 * Value format: { label: string, value: unknown }
 */

const PREVIOUS_VALUE_PREFIX = 'AQS_PREVIOUS_VALUE_';

interface PreviousFieldState {
    label: string;
    value: unknown;
}

/**
 * Get the previous value state (label + value) of a field from session storage
 * @param matchcode - Field matchcode
 * @returns { label, value } or undefined if not found
 */
function getPreviousFieldValue(matchcode: string): PreviousFieldState | undefined {
    const key = `${PREVIOUS_VALUE_PREFIX}${matchcode}`;
    const stored = sessionStorage.getItem(key);
    try {
        if (stored) {
            return JSON.parse(stored) as PreviousFieldState;
        }
    } catch (error) {
        logger.warn('Failed to retrieve previous field value from session storage', {
            matchcode,
            error: error instanceof Error ? error.message : String(error),
        });
    }
    return undefined;
}

/**
 * Store the current value + label as the previous state for a field in session storage
 * Only stores for combo/select control types
 * @param matchcode - Field matchcode
 * @param label - Display label
 * @param value - Current value to store as previous
 */
function setPreviousFieldValue(matchcode: string, label: string, value: unknown): void {
    try {
        const key = `${PREVIOUS_VALUE_PREFIX}${matchcode}`;
        const state: PreviousFieldState = { label, value };
        sessionStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
        logger.warn('Failed to store previous field value in session storage', {
            matchcode,
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

/**
 * Clear all previous field values from session storage
 * Call this when page changes or form is destroyed
 */
function clearAllPreviousFieldValues(): void {
    try {
        const keysToDelete: string[] = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key?.startsWith(PREVIOUS_VALUE_PREFIX)) {
                keysToDelete.push(key);
            }
        }
        keysToDelete.forEach((key) => sessionStorage.removeItem(key));
        logger.debug('Previous field values cleared from session storage', {
            clearedCount: keysToDelete.length,
        });
    } catch (error) {
        logger.warn('Failed to clear previous field values from session storage', {
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

/**
 * Initialize previous values in session storage ONLY for combo/select controls
 * @param formValues - Current form values (from RHF getValues())
 * @param controlMetadata - Map of control metadata indexed by matchcode
 */
function initializeFieldPreviousValues(
    formValues: Record<string, unknown>,
    controlMetadata: Map<string, ControlMetadata>,
): void {
    try {
        let initializedCount = 0;

        // Only initialize combo/select controls
        controlMetadata.forEach((metadata, matchcode) => {
            const controlType = metadata.controlType.toLowerCase().trim();
            // Only store combo/select controls
            if (controlType === 'combo' || controlType === 'kpcombo' || controlType === 'select') {
                const currentValue = formValues[matchcode];

                // Find the label for this value from options
                let label = '';
                if (metadata.options && currentValue !== undefined && currentValue !== null) {
                    const option = metadata.options.find((opt) => opt.value === currentValue);
                    label = option?.label || String(currentValue);
                }

                setPreviousFieldValue(matchcode, label, currentValue);
                initializedCount++;
            }
        });

        logger.debug('Combo/Select control previous values initialized in session storage', {
            initializedCount,
        });
    } catch (error) {
        logger.warn('Failed to initialize field previous values', {
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

export function useFormCommit({
    pageBuildData,
    sessionInfo,
    formMethods,
    xmlFileName = '',
    onCommands,
    resolveCommitPlan,
    adaptResponseCommands,
}: UseFormCommitParams): UseFormCommitResult {
    const submit = useSubmit();
    const [isCommitting, setIsCommitting] = useState(false);
    const [committingField, setCommittingField] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const recentDropdownCommitRef = useRef<Map<string, { value: string; timestamp: number }>>(
        new Map(),
    );

    const fieldOrder = useMemo(() => {
        const controls = pageBuildData?.Page?.controls?.control;
        const controlArray = Array.isArray(controls) ? controls : controls ? [controls] : [];
        if (controlArray.length === 0) {
            return [] as string[];
        }

        return controlArray
            .map((control: { '@matchcode'?: string }) => control['@matchcode']?.trim() ?? '')
            .filter((matchcode) => matchcode !== '');
    }, [pageBuildData]);

    const utpOrder = useMemo(() => {
        const utpData = pageBuildData?.Page?.utp?.data;
        const utpArray = Array.isArray(utpData) ? utpData : utpData ? [utpData] : [];
        if (utpArray.length === 0) {
            return [] as string[];
        }
        return utpArray
            .map((item: { '@matchcode'?: string }) => item['@matchcode']?.trim() ?? '')
            .filter((matchcode) => matchcode !== '');
    }, [pageBuildData]);

    const sessionXml = useMemo(() => {
        return parseSessionXmlItems(pageBuildData?.Session?.SessionXml);
    }, [pageBuildData]);

    // Cache control metadata for performance
    const controlMetadataCache = useMemo(() => {
        if (!pageBuildData) return new Map();
        return extractAllControlsMetadata(pageBuildData);
    }, [pageBuildData]);

    // Initialize previous values in session storage when form loads (only for combo/select)
    // Clear on page change or unmount
    useEffect(() => {
        const formValues = formMethods.getValues();
        initializeFieldPreviousValues(formValues, controlMetadataCache);

        // Cleanup: clear previous values when navigating away
        return () => {
            clearAllPreviousFieldValues();
        };
    }, [formMethods, controlMetadataCache]);

    const commitField = useCallback(
        async (matchcode: string, value: string | boolean, eventType: CommitEventType) => {
            if (!pageBuildData) {
                return;
            }

            // PathID field: only commit on blur event (tab/leave field)
            if (matchcode === 'POLPOLV3X_LEXLIDX' && eventType !== 'blur') {
                return;
            }

            // Client-side validation for PathID field
            if (matchcode === 'POLPOLV3X_LEXLIDX') {
                const pathID = String(value).trim();
                // Validate numeric and max 10 digits
                if (pathID && !/^\d{1,10}$/.test(pathID)) {
                    setValidationErrors((prev) => ({
                        ...prev,
                        [matchcode]: 'Path ID must be a numeric value (max 10 digits)',
                    }));
                    return;
                }

                // Clear previous validation error
                setValidationErrors((prev) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { [matchcode]: _unused, ...rest } = prev;
                    return rest;
                });
            }

            setIsCommitting(true);
            setCommittingField(matchcode);
            setError(null);

            try {
                // Get current form values from RHF (includes browser command updates)
                const currentFormValues = formMethods.getValues();
                const baseFormData = {
                    ...currentFormValues,
                    [matchcode]: value,
                };

                // Extract control metadata for EEData
                const controlMetadata =
                    controlMetadataCache.get(matchcode) ||
                    extractControlMetadata(findControlElement(pageBuildData, matchcode), matchcode);

                // For buttons, find the primary field value (e.g., policy number)
                // Look for POLPOLV3X_LEXLIDX (pathID) or use the first field value
                let primaryFieldValue: unknown = undefined;
                if (matchcode === 'NEXT' || matchcode === 'PREVIOUS') {
                    // For navigation buttons, use pathID field if available
                    primaryFieldValue =
                        currentFormValues['POLPOLV3X_LEXLIDX'] ||
                        Object.values(currentFormValues)[0] ||
                        '';
                }

                // Get previous value before change (for combo/select to track selection history)
                // Retrieved from session storage with matchcode as key
                // Returns { label, value } object for combo/select controls
                const previousFieldState = getPreviousFieldValue(matchcode);
                const previousValue = previousFieldState?.value;
                const previousLabel = previousFieldState?.label;

                const normalizedControlType = String(controlMetadata?.controlType || '')
                    .trim()
                    .toLowerCase();
                const isDropdownControl =
                    normalizedControlType === 'select' ||
                    normalizedControlType === 'combo' ||
                    normalizedControlType === 'kpcombo';
                const normalizedIncomingValue = String(value ?? '').trim();
                const normalizedPreviousValue = String(previousValue ?? '').trim();

                if (isDropdownControl && eventType === 'blur' && normalizedIncomingValue === normalizedPreviousValue) {
                    logger.debug('Skipping duplicate dropdown blur commit', {
                        matchcode,
                        value: normalizedIncomingValue,
                    });
                    return;
                }

                if (isDropdownControl) {
                    const dedupeKey = matchcode.trim().toUpperCase();
                    const now = Date.now();
                    const lastCommit = recentDropdownCommitRef.current.get(dedupeKey);

                    if (
                        lastCommit &&
                        lastCommit.value === normalizedIncomingValue &&
                        now - lastCommit.timestamp < 500
                    ) {
                        logger.debug('Skipping rapid duplicate dropdown commit', {
                            matchcode,
                            eventType,
                            value: normalizedIncomingValue,
                            deltaMs: now - lastCommit.timestamp,
                        });
                        return;
                    }

                    recentDropdownCommitRef.current.set(dedupeKey, {
                        value: normalizedIncomingValue,
                        timestamp: now,
                    });
                }

                let calls = extractCallsFromPageBuild(pageBuildData, matchcode);
                let callType = 'post';
                let processIndicator: '0' | '1' = '1';
                let payloadFormData = baseFormData;
                let includeCallMode = true;
                let callMode = 'async';
                let sessionXmlAsString = false;

                if (resolveCommitPlan) {
                    const plan = resolveCommitPlan({
                        matchcode,
                        value,
                        eventType,
                        pageBuildData,
                        currentFormValues,
                        baseFormData,
                        controlMetadata,
                        xmlFileName,
                        sessionInfo,
                        fieldOrder,
                        utpOrder,
                        sessionXml,
                    });
                    if (plan === null) {
                        logger.debug('Commit plan returned null, skipping XMLServerCall', {
                            matchcode,
                            eventType,
                        });
                        return;
                    }

                    calls = plan.calls;
                    callType = String(plan.callType || 'post')
                        .trim()
                        .toLowerCase();
                    processIndicator = plan.processIndicator || (callType === 'pre' ? '0' : '1');
                    payloadFormData = plan.payloadFormData || baseFormData;
                    includeCallMode = plan.includeCallMode ?? true;
                    callMode = plan.callMode ?? 'async';
                    sessionXmlAsString = plan.sessionXmlAsString ?? false;
                }

                if (calls.length === 0) {
                    logger.debug('No commit calls configured for field, skipping XMLServerCall', {
                        matchcode,
                        eventType,
                    });
                    return;
                }

                // Build EEData array with all current form values
                const eeDataArray = buildEEDataArray({
                    xmlFileName,
                    buttonMatchcode: matchcode,
                    formData: payloadFormData,
                    sessionXml,
                    processIndicator,
                    controlMetadata,
                    primaryFieldValue,
                    previousValue,
                    previousLabel,
                });

                console.log('[EEData] Built for button/field:', {
                    matchcode,
                    eeDataArray,
                    currentFormValues: { ...currentFormValues, [matchcode]: value },
                });

                if (matchcode === "POLPOLEXT_Nyx_BooleanValue_INFO") {
                    sessionInfo.action = 'RLVUPDATE';
                    calls = [
                        {
                            project: 'pRRE4',
                            class: 'cRRE4',
                            subroutine: 'POLPOLEOL_Create',
                        },
                        {
                            project: 'pRRE4',
                            class: 'cRRE4',
                            subroutine: 'POLPOL_Read',
                        },
                        {
                            project: 'PolEntEdtPI',
                            class: 'PolExtNyxPpc',
                            componenttype: 'VB6',
                            subroutine: ''
                        },
                    ];
                }

                const payload = buildXMLServerCallPayload({
                    xmlFileName,
                    formData: payloadFormData,
                    sessionInfo,
                    calls,
                    callType,
                    includeCallMode,
                    callMode,
                    processIndicator,
                    buttonMatchcode: matchcode,
                    fieldOrder,
                    sessionXmlAsString,
                    eeData: eeDataArray,
                    sessionXml,
                });

                console.log('[XMLServerCall] Payload being sent:', {
                    matchcode,
                    payload: JSON.stringify(payload, null, 2),
                });

                const response = await xmlServerCall(payload);
                if (response.errors) {
                    throw new Error(response.errors);
                }

                const commands = parseBrowserCommandsFromXMLServerCall(response);
                const normalizedCommands = adaptResponseCommands
                    ? adaptResponseCommands({ commands, response, matchcode })
                    : commands;
                let commandsToExecute = normalizedCommands;

                const sessionSnapshot = extractSessionSnapshot(response, sessionInfo);
                persistSessionSnapshot(sessionSnapshot);
                commandsToExecute = buildContextSyncCommands(
                    commandsToExecute,
                    response,
                    sessionSnapshot,
                );
                logger.info('Command pipeline prepared', {
                    matchcode,
                    commandCount: commandsToExecute.length,
                    commands: commandsToExecute.map((c) => `${c.verb}:${c.noun}`),
                });
                const controlType = controlMetadata?.controlType.toLowerCase().trim();
                if (controlType === 'select') {
                    // Find the label for the committed value
                    let committedLabel = '';
                    if (controlMetadata?.options) {
                        const option = controlMetadata.options.find(
                            (opt: { value: string; label: string }) => opt.value === value,
                        );
                        committedLabel = option?.label || String(value || '');
                    }
                    setPreviousFieldValue(matchcode, committedLabel, value);
                }
                logger.debug('Previous field value updated in session storage', {
                    matchcode,
                    value,
                    controlType,
                });

                // PageNavigation call hardcoded to open in new window; fetch landing PageBuild and apply its ⟪?⟫
                console.log('CURRENT_VALUES', matchcode);
                if (matchcode === 'NEXT' || matchcode === 'PREVIOUS') {
                    console.log('NEXT Navigation call triggered');
                    const persistedNavigationContext =
                        getSessionStorageItem<Record<string, unknown>>('aqs:navigation:context');
                    const xmlDetails =
                        typeof persistedNavigationContext?.xmlDetail === 'string'
                            ? persistedNavigationContext.xmlDetail
                            : '';
                    const navResult = await navigation({
                        nodeKey:
                            (typeof persistedNavigationContext?.nodeKey === 'string'
                                ? persistedNavigationContext.nodeKey
                                : undefined) ?? sessionInfo.nodeKey,
                        action: `${sessionInfo.action}|${matchcode}`,
                        userId: sessionInfo.userId,
                        policyID: sessionInfo.policyId,
                        diagnosticMode: sessionInfo.diagnosticMode,
                        compLoc: sessionInfo.compLoc,
                        debug: false,
                        tab: 0,
                        xmlDetail: xmlDetails,
                    });
                    if (!navResult.status || !navResult.data) {
                        logger.error('Navigation API did not return usable data for policy handoff', matchcode, undefined, {
                            error: navResult.error,
                        });
                    } else {
                        console.log('NAV_DATA', navResult.data);
                        const formData = new FormData();
                        formData.set(
                            'navigationPayload',
                            JSON.stringify({
                                navData: navResult.data,
                                sourceContext: {
                                    action: sessionInfo.action,
                                    policyId: sessionInfo.policyId,
                                    nodeKey: sessionInfo.nodeKey,
                                    userId: sessionInfo.userId,
                                    compLoc: sessionInfo.compLoc,
                                    xmlDetail: xmlDetails,
                                    xmlFileName:
                                        typeof persistedNavigationContext?.xmlFileName === 'string'
                                            ? persistedNavigationContext.xmlFileName
                                            : undefined,
                                    xmlFilePath:
                                        typeof persistedNavigationContext?.xmlFilePath === 'string'
                                            ? persistedNavigationContext.xmlFilePath
                                            : undefined,
                                    tabFileName:
                                        typeof persistedNavigationContext?.tabFileName === 'string'
                                            ? persistedNavigationContext.tabFileName
                                            : undefined,
                                    tabFilePath:
                                        typeof persistedNavigationContext?.tabFilePath === 'string'
                                            ? persistedNavigationContext.tabFilePath
                                            : undefined,
                                    xmlListFileName:
                                        typeof persistedNavigationContext?.xmlListFileName === 'string'
                                            ? persistedNavigationContext.xmlListFileName
                                            : undefined,
                                    xmlListFilePath:
                                        typeof persistedNavigationContext?.xmlListFilePath === 'string'
                                            ? persistedNavigationContext.xmlListFilePath
                                            : undefined,
                                },
                            }),
                        );

                        try {
                            submit(formData, { method: 'post', action: '/policyinfo' });
                            commandsToExecute = commands.filter((cmd) => {
                                const verb = cmd.verb.toUpperCase();
                                return (
                                    verb !== 'NAVIGATE' &&
                                    verb !== 'NAVIGATE_CYCLING' &&
                                    verb !== 'OPEN_WINDOW' &&
                                    verb !== 'REFRESH_PAGE'
                                );
                            });
                            console.log(
                                '[useFormCommit] submitted navigation payload to /policyinfo action',
                            );
                        } catch (submitError) {
                            logger.error(
                                'Failed to submit policy navigation action',
                                submitError as Error,
                            );
                        }
                    }
                }

                if (commandsToExecute.length > 0) {
                    if (onCommands) {
                        logger.info('Calling onCommands with', {
                            commandCount: commandsToExecute.length,
                        });

                        let callServerDepth = 0;
                        const maxCallServerDepth = 3;

                        const unsubscribeCallServer = pubSub.subscribe(
                            'command:call-server-requested',
                            async ({ callType }) => {
                                if (!pageBuildData) {
                                    return;
                                }

                                if (callServerDepth >= maxCallServerDepth) {
                                    logger.warn('Skipping CALL_SERVER follow-up due to depth guard', {
                                        callType,
                                        matchcode,
                                        callServerDepth,
                                    });
                                    return;
                                }

                                callServerDepth += 1;
                                const normalizedCallType = String(callType || 'post')
                                    .trim()
                                    .toLowerCase();
                                const followupProcessIndicator =
                                    normalizedCallType === 'pre'
                                        ? '0'
                                        : normalizedCallType === 'post'
                                            ? '1'
                                            : normalizedCallType;

                                const callsByType = extractCallsByTypeFromPageBuild(
                                    pageBuildData,
                                    matchcode,
                                );
                                const followupCalls = callsByType[normalizedCallType] || [];

                                if (followupCalls.length === 0) {
                                    logger.warn('No follow-up calls found for requested CALL_SERVER ⟪?⟫', {
                                        matchcode,
                                        callType: normalizedCallType,
                                        availableTypes: Object.keys(callsByType),
                                    });
                                    return;
                                }

                                try {
                                    const followupFormData = {
                                        ...formMethods.getValues(),
                                        [matchcode]: value,
                                    };

                                    const followupEeData = buildEEDataArray({
                                        xmlFileName,
                                        buttonMatchcode: matchcode,
                                        formData: followupFormData,
                                        sessionXml,
                                    });

                                    const followupPayload = buildXMLServerCallPayload({
                                        xmlFileName,
                                        formData: followupFormData,
                                        sessionInfo,
                                        calls: followupCalls,
                                        callType: normalizedCallType,
                                        includeCallMode: true,
                                        callMode: 'async',
                                        processIndicator: followupProcessIndicator,
                                        buttonMatchcode: matchcode,
                                        fieldOrder,
                                        utpOrder,
                                        sessionXml,
                                        eeData: followupEeData,
                                    });

                                    const followupResponse = await xmlServerCall(followupPayload);
                                    if (followupResponse.errors) {
                                        throw new Error(followupResponse.errors);
                                    }
                                    const followupCommands = parseBrowserCommandsFromXMLServerCall(
                                        followupResponse,
                                    );

                                    const normalizedFollowupCommands = adaptResponseCommands
                                        ? adaptResponseCommands({
                                            commands: followupCommands,
                                            response: followupResponse,
                                            matchcode,
                                        })
                                        : followupCommands;

                                    const followupSessionSnapshot = extractSessionSnapshot(
                                        followupResponse,
                                        sessionInfo,
                                    );
                                    persistSessionSnapshot(followupSessionSnapshot);
                                    const enrichedFollowupCommands = buildContextSyncCommands(
                                        normalizedFollowupCommands,
                                        followupResponse,
                                        followupSessionSnapshot,
                                    );

                                    if (enrichedFollowupCommands.length > 0) {
                                        await onCommands(enrichedFollowupCommands);
                                    }
                                } catch (followupError) {
                                    logger.error('CALL_SERVER follow-up execution failed', {
                                        matchcode,
                                        callType: normalizedCallType,
                                    });
                                }
                            },
                        );

                        try {
                            await onCommands(commandsToExecute);
                        } finally {
                            logger.info('onCommands completed');
                            unsubscribeCallServer();
                        }
                    } else {
                        logger.warn('onCommands callback is not defined', {
                            commandCount: commandsToExecute.length,
                        });
                    }
                } else {
                    logger.info('No additional commands to execute (besides navigation)', {
                        matchcode,
                    });
                }

                // Check for server-side validation errors (DISPLAY_ERROR, BUSINESS_ERROR)
                const errorCommand = commands.find(
                    (cmd) => cmd.verb === 'DISPLAY_ERROR' || cmd.verb === 'BUSINESS_ERROR',
                );
                if (errorCommand) {
                    setValidationErrors((prev) => ({
                        ...prev,
                        [matchcode]: errorCommand.addinf || 'Validation failed',
                    }));
                }
            } catch (commitError) {
                const message =
                    commitError instanceof Error
                        ? commitError.message
                        : 'Failed to commit field changes.';
                setError(message);
                setValidationErrors((prev) => ({
                    ...prev,
                    [matchcode]: message,
                }));
                logger.error('Field commit failed', commitError as Error, {
                    matchcode,
                    eventType,
                });
            }
            setIsCommitting(false);
            setCommittingField(null);
        },
        [
            fieldOrder,
            formMethods,
            onCommands,
            pageBuildData,
            utpOrder,
            xmlFileName,
            controlMetadataCache,
            resolveCommitPlan,
            adaptResponseCommands,
            sessionXml,
            sessionInfo,
        ],
    );

    return {
        commitField,
        isCommitting,
        committingField,
        error,
        validationErrors,
        clearValidationError: useCallback((matchcode: string) => {
            setValidationErrors((prev) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [matchcode]: _unused, ...rest } = prev;
                return rest;
            });
        }, [setValidationErrors]),
    };
}
