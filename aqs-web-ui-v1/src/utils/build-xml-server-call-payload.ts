/**
 * @file build-xml-server-call-payload.ts
 * @description Utility to build XMLServerCall API payload from React form data
 *
 * Transforms React form state and session info into the legacy API format
 * expected by XMLServerCall (SessionInformation array, EEData array).
 *
 * @see apis.instructions.md lines 410-580 for payload format
 */

import { createFeatureLogger } from '@/utils/logger-builder';
import { buildEEDataArray } from '@utils/build-eedata-array';
import { buildSessionXml } from '@services/page-build';
import type { SessionInfo } from '@features/auth/services/auth';
import type { XMLServerCallPayload, Call } from '@/services/xml-server-call';

const logger = createFeatureLogger('util', 'BuildXMLServerCallPayload');

// ================================================
// Types
// ================================================

export interface BuildPayloadParams {
    /** XML file name identifier (e.g., "NewRnl_ISLLSYS_20010101.xml") */
    xmlFileName: string;

    /** Form data as key-value pairs (matchcode → value) */
    formData: Record<string, unknown>;

    /** Session information from localStorage */
    sessionInfo: SessionInfo;

    /** Array of COM object calls to execute */
    calls: Call[];

    /** Call phase/type (e.g. pre, post, yes) */
    callType?: string;

    /** Include calls.mode in payload (default true for backward compatibility) */
    includeCallMode?: boolean;

    /** calls.mode value when included */
    callMode?: string;

    /** Button/control matchcode used to submit (OK, CANCEL, NEXT, etc.) */
    buttonMatchcode?: string;

    /** Field order as controls appear in PageBuild */
    fieldOrder?: string[];

    /** Backend positional order from PageBuild utp.data */
    utpOrder?: string[];

    /** Session XML items (existing session state) */
    sessionXml?: Array<{ name: string; value: string }>;

    /**
     * Send SessionInformation[6] as raw XML string (<items>...</items>) instead of object format.
     * Default remains false for backward compatibility.
     */
    sessionXmlAsString?: boolean;

    /** Control object identifier (default: "ZENTEDTCTL") */
    mstrObject?: string;

    /** Pre-built EEData array (optional) - if provided, uses this instead of building */
    eeData?: unknown[];

    /** EEData process indicator override (legacy: 0/1 or branch token such as yes/no) */
    processIndicator?: string;
}

export type CallsByType = Record<string, Call[]>;

// ==========================================
// Utility Functions
// ==========================================

/**
 * Build XMLServerCall API payload from form data and session info
 *
 * @param params - Parameters for building the payload
 * @returns XMLServerCall API payload ready to send
 *
 * @example
 * ```typescript
 * const payload = buildXMLServerCallPayload({
 *   xmlFileName: "NewRnl_ISLLSYS_20010101.xml",
 *   formData: { PolicyType: "NEW" },
 *   sessionInfo: { compLoc: "PIPH", userId: "PGURJAR", ... },
 *   calls: [
 *     { project: "pZStart", class: "cZStart", subroutine: "Policy_SetBeginType" },
 *     { project: "pZStart", class: "cZStart", subroutine: "Modal_Close" },
 *   ],
 * });
 *
 * const response = await xmlServerCall(payload);
 * ```
 */
export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {
    const {
        xmlFileName,
        formData,
        sessionInfo,
        calls,
        callType = 'post',
        includeCallMode = true,
        callMode = 'async',
        buttonMatchcode = 'OK',
        fieldOrder,
        utpOrder,
        sessionXml = [],
        sessionXmlAsString = false,
        mstrObject = 'ZENTEDTCTL',
        eeData: providedEEData,
        processIndicator,
    } = params;

    const normalizedCallType =
        String(callType || 'post')
            .trim()
            .toLowerCase() || 'post';
    const resolvedProcessIndicator =
        processIndicator ??
        (normalizedCallType === 'pre'
            ? '0'
            : normalizedCallType === 'post'
                ? '1'
                : normalizedCallType);

    logger.debug('Building XMLServerCall payload', {
        xmlFileName,
        formDataKeys: Object.keys(formData),
        callCount: calls.length,
        sessionXmlItemCount: sessionXml.length,
        hasProvidedEEData: !!providedEEData,
    });

    // Use provided EEData if available, otherwise build it
    const eeDataValue =
        providedEEData ||
        buildEEDataArray({
            xmlFileName,
            buttonMatchcode,
            formData,
            fieldOrder,
            utpOrder,
            sessionXml,
            processIndicator: resolvedProcessIndicator,
        });

    // Build SessionInformation value array
    // Format: [compLoc, userId, policyID, nodeKey, action, diagnosticMode, sessionXml]
    // Note: compLoc is empty string for field commit calls
    const sessionXmlValue = sessionXmlAsString
        ? buildSessionXml({
              items: {
                  item: sessionXml.map((item) => ({
                      '@name': item.name,
                      '@value': item.value,
                  })),
              },
          })
        : {
              items: sessionXml,
          };

    const sessionInfoValue: [
        string,
        string,
        string,
        string,
        string,
        string,
        { items: Array<{ name: string; value: string }> } | string,
    ] = [
        '', // compLoc is empty string for XMLServerCall
        sessionInfo.userId || '',
        sessionInfo.policyId || '0',
        sessionInfo.nodeKey || 'POL|POL|0',
        sessionInfo.action || '',
        sessionInfo.diagnosticMode || '0',
        sessionXmlValue,
    ];

    // Build payload
    const callsPayload: { type: string; mode?: string; call: Call | Call[] } = {
        type: normalizedCallType,
        call: calls.length === 1 ? calls[0] : calls,
    };

    if (includeCallMode) {
        callsPayload.mode = callMode;
    }

    const payload: XMLServerCallPayload = {
        aqs: {
            mstrObject,
            calls: callsPayload,
            SessionInformation: {
                value: sessionInfoValue,
            },
            EEData: {
                value: eeDataValue,
            },
        },
    };

    logger.info('XMLServerCall payload built', {
        mstrObject,
        callType: normalizedCallType,
        callCount: calls.length,
        buttonMatchcode,
        eeDataLength: eeDataValue.length,
        sessionXmlItemCount: sessionXml.length,
    });

    return payload;
}

/**
 * Extract calls array from PageBuild response
 *
 * PageBuild returns button controls with `calls` property containing
 * the COM object calls to execute when button is clicked.
 *
 * @param xmlDetail - PageBuild response XML detail
 * @param buttonMatchcode - Matchcode of the button clicked (e.g., "OK", "SUBMIT")
 * @returns Array of calls to execute
 *
 * @example
 * ```typescript
 * const calls = extractCallsFromPageBuild(xmlDetail, "OK");
 * // Returns: [{ project: "pZStart", class: "cZStart", subroutine: "Policy_SetBeginType" }, ...]
 * ```
 */
function mapCallRecord(callItem: Record<string, unknown>): Call {
    return {
        project: String(callItem['@project'] || callItem.project || ''),
        class: String(callItem['@class'] || callItem.class || ''),
        subroutine: String(callItem['@subroutine'] || callItem.subroutine || ''),
        componenttype: String(callItem['@componenttype'] || callItem.componenttype || ''),
    };
}

function normalizeCallList(call: unknown): Call[] {
    if (Array.isArray(call)) {
        return call
            .map((entry) => mapCallRecord((entry || {}) as Record<string, unknown>))
            .filter((entry) => Boolean(entry.project || entry.class || entry.subroutine || entry.componenttype));
    }

    if (call && typeof call === 'object') {
        const mapped = mapCallRecord(call as Record<string, unknown>);
        if (mapped.project || mapped.class || mapped.subroutine || mapped.componenttype) {
            return [mapped];
        }
    }

    return [];
}

function readButtonControl(
    xmlDetail: unknown,
    buttonMatchcode: string,
): Record<string, unknown> | undefined {
    if (!xmlDetail || typeof xmlDetail !== 'object') {
        return undefined;
    }

    const detail = xmlDetail as Record<string, unknown>;
    const page = detail.Page as Record<string, unknown> | undefined;
    if (!page) return undefined;

    const controls = page.controls as Record<string, unknown> | undefined;
    if (!controls) return undefined;

    const rawControls = controls.control as unknown;
    const controlArray = Array.isArray(rawControls)
        ? rawControls
        : rawControls
            ? [rawControls]
            : [];
    if (controlArray.length === 0) return undefined;

    const targetMatchcode = String(buttonMatchcode || '')
        .trim()
        .toUpperCase();

    return controlArray.find((ctrl) => {
        const control = ctrl as Record<string, unknown>;
        const rawMatchcode = control['@matchcode'] ?? control.matchcode;
        return (
            String(rawMatchcode || '')
                .trim()
                .toUpperCase() === targetMatchcode
        );
    }) as Record<string, unknown> | undefined;
}

export function extractCallsByTypeFromPageBuild(
    xmlDetail: unknown,
    buttonMatchcode = 'OK',
): CallsByType {
    if (!xmlDetail || typeof xmlDetail !== 'object') {
        logger.warn('Invalid xmlDetail provided to extractCallsByTypeFromPageBuild');
        return {};
    }

    try {
        const buttonControl = readButtonControl(xmlDetail, buttonMatchcode);

        if (!buttonControl) {
            logger.warn('Button control not found', { buttonMatchcode });
            return {};
        }

        const callsData = (buttonControl.calls ?? buttonControl['@calls']) as unknown;
        const grouped: CallsByType = {};
        const directCalls: Call[] = [];
        if (Array.isArray(callsData)) {
            for (const item of callsData) {
                const obj = (item || {}) as Record<string, unknown>;
                const callType = String(obj['@type'] || obj.type || '')
                    .trim()
                    .toLowerCase();

                if ('call' in obj) {
                    const callsForType = normalizeCallList(obj.call);
                    if (callsForType.length === 0) continue;

                    const targetType = callType || 'post';
                    grouped[targetType] = [...(grouped[targetType] || []), ...callsForType];
                    continue;
                }

                const directCall = normalizeCallList(obj);
                if (directCall.length > 0) {
                    directCalls.push(...directCall);
                }
            }
        } else if (callsData && typeof callsData === 'object') {
            const obj = callsData as Record<string, unknown>;
            const callType = String(obj['@type'] || obj.type || '')
                .trim()
                .toLowerCase();

            if ('call' in obj) {
                const callsForType = normalizeCallList(obj.call);
                if (callsForType.length > 0) {
                    grouped[callType || 'post'] = callsForType;
                }
            } else {
                const directCall = normalizeCallList(obj);
                if (directCall.length > 0) {
                    directCalls.push(...directCall);
                }
            }
        }

        if (directCalls.length > 0) {
            grouped.post = [...(grouped.post || []), ...directCalls];
        }
        return grouped;
    } catch (error) {
        logger.error('Error extracting calls by type from PageBuild response', error as Error);
        return {};
    }
}
export function extractCallsFromPageBuild(xmlDetail: unknown, buttonMatchcode = 'OK'): Call[] {
    const groupedCalls = extractCallsByTypeFromPageBuild(xmlDetail, buttonMatchcode);
    if (groupedCalls.post && groupedCalls.post.length > 0) {
        return groupedCalls.post;
    }

    const firstNonEmptyType = Object.keys(groupedCalls).find(
        (callType) => groupedCalls[callType]?.length > 0
    );
    if (firstNonEmptyType) {
        return groupedCalls[firstNonEmptyType];
    }
    return [];
}
