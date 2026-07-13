/**
 * @file parse-querystring-params.ts
 * @description Extract canonical session parameters from cycling API querystring responses
 *
 * **CRITICAL PATTERN**: In legacy VBScript, each page reads session values from its own
 * URL querystring parameters, NOT from parent window variables. ExecuteAction calls
 * XmlCycling.aspx which returns updated session values in querystring format.
 *
 * Legacy Reference:
 * - Main_ISLLSYS_20010101.asp lines 23-30: ASP reads Request.QueryString("Action")
 * - XmlCycling.aspx lines 376-410: Server builds querystring with updated values
 * - ExecuteAction lines 1569-1575: Updates mstrXMLDetail from response querystring
 *
 * @example
 * ```typescript
 * // Cycling response includes:
 * // queryString: "../../pol/xml/Rlv.aspx?action=RATELEVEL&policyid=487672&nodekey=POL|POL|0|"
 *
 * const params = parseQueryStringParams(response.queryString);
 * // Returns: { action: "RATELEVEL", policyId: "487672", nodeKey: "POL|POL|0|" }
 * ```
 */

import type { NavigationContextValue } from '@/context';
import { createFeatureLogger } from '@utils/logger-builder';

const logger = createFeatureLogger('navigation', 'parse-querystring-params');

/**
 * Canonical parameters that must be extracted from cycling queryString
 * Matches legacy marrSessionInformation array structure:
 * - [0]: compLoc (from Application)
 * - [1]: userId
 * - [2]: policyId
 * - [3]: nodeKey
 * - [4]: action ← CRITICAL: Updated by server
 * - [5]: diagnosticMode
 * - [6]: xmlDetail ← CRITICAL: Updated by server
 */
export interface CanonicalParams {
    action?: string;
    policyId?: string;
    nodeKey?: string;
    userId?: string;
    compLoc?: string;
    diagnosticMode?: string;
    xmlDetail?: string;
    tab?: string;
}

const EFFECTIVE_COMBINED_ACTIONS = new Set(['RLVUPDATE']);

function resolveEffectiveAction(rawAction: string): string {
    const normalized = rawAction.trim().toUpperCase();
    if (!normalized.includes('|')) {
        return normalized;
    }

    const tokens = normalized
        .split('|')
        .map((token) => token.trim())
        .filter((token) => token.length > 0);

    if (tokens.length < 2) {
        return normalized;
    }

    const trailingToken = tokens[tokens.length - 1];
    if (EFFECTIVE_COMBINED_ACTIONS.has(trailingToken)) {
        return trailingToken;
    }

    // Default legacy behavior for button combines, e.g. RATELEVEL|NEXT => RATELEVEL
    return tokens[0];
}

/**
 * Extract canonical session parameters from cycling API queryString
 *
 * **Pattern**: Matches legacy where each page reads from Request.QueryString
 * Server-side cycling component modifies marrSessionInformation and returns
 * updated values in querystring. This is the SOURCE OF TRUTH for next action.
 *
 * @param queryString - Full queryString from cycling response (may include ASP path prefix)
 * @returns Extracted parameters with decoded values
 *
 * @example
 * ```typescript
 * const params = parseQueryStringParams(
 *   "../../system/asp/File.asp?action=RATELEVEL&policyid=487672&nodekey=POL|POL|0|&xmldetail=%3Cdetails%3E"
 * );
 * // Returns: { action: "RATELEVEL", policyId: "487672", nodeKey: "POL|POL|0|", xmlDetail: "<details>" }
 * ```
 *
 * @remarks
 * Legacy ExecuteAction NEVER updates parent window's mstrAction variable.
 * Instead, each page reads action from its own querystring on load.
 * This function extracts those querystring values from cycling response.
 */
export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
    if (!queryString || queryString.trim() === '') {
        logger.debug('Empty queryString, returning empty params');
        return {};
    }

    // Strip ASP path prefix if present (e.g., "../../system/asp/File.asp?...")
    // Legacy querystrings often include relative path before '?'
    const queryStartIndex = queryString.indexOf('?');
    const cleanQueryString =
        queryStartIndex >= 0 ? queryString.substring(queryStartIndex + 1) : queryString;

    const params: CanonicalParams = {};

    try {
        // Extract action (CRITICAL - server updates this)
        // Legacy: marrSessionInformation(4) = UCase(.QueryString("Action"))
        // CRITICAL: Strip button code for legacy compatibility
        // Legacy URLs show base action only (e.g., "RATELEVEL" not "RATELEVEL|NEXT")
        const actionMatch = cleanQueryString.match(/action=([^&]*)/i);
        if (actionMatch?.[1]) {
            const rawAction = decodeURIComponent(actionMatch[1]);
            params.action = resolveEffectiveAction(rawAction);
            logger.debug('Extracted action from queryString', {
                rawAction,
                resolvedAction: params.action,
                hadButton: rawAction.includes('|'),
            });
        }

        // Extract policyId (check both "policyid" and "policyID")
        // Legacy: marrSessionInformation(2) = UCase(.QueryString("PolicyID"))
        const policyIdMatch = cleanQueryString.match(/policyid=([^&]*)/i);
        if (policyIdMatch?.[1]) {
            params.policyId = decodeURIComponent(policyIdMatch[1]);
        }

        // Extract nodeKey (check both "nodekey" and "nodeKey")
        // Legacy: marrSessionInformation(3) = UCase(.QueryString("NodeKey"))
        const nodeKeyMatch = cleanQueryString.match(/nodekey=([^&]*)/i);
        if (nodeKeyMatch?.[1]) {
            params.nodeKey = decodeURIComponent(nodeKeyMatch[1]);
        }

        // Extract userId (check both "userid" and "userId")
        // Legacy: marrSessionInformation(1) = UCase(.QueryString("UserID"))
        const userIdMatch = cleanQueryString.match(/userid=([^&]*)/i);
        if (userIdMatch?.[1]) {
            params.userId = decodeURIComponent(userIdMatch[1]);
        }

        // Extract compLoc (check both "comploc" and "compLoc")
        // Legacy: marrSessionInformation(0) = Application("CompLoc")
        const compLocMatch = cleanQueryString.match(/comploc=([^&]*)/i);
        if (compLocMatch?.[1]) {
            params.compLoc = decodeURIComponent(compLocMatch[1]);
        }

        // Extract diagnosticMode
        // Legacy: marrSessionInformation(5) = UCase(.QueryString("DiagnosticMode"))
        const diagnosticModeMatch = cleanQueryString.match(/diagnosticmode=([^&]*)/i);
        if (diagnosticModeMatch?.[1]) {
            params.diagnosticMode = decodeURIComponent(diagnosticModeMatch[1]);
        }

        // Extract xmlDetail (CRITICAL - server updates this)
        // Legacy: marrSessionInformation(6) = Decompress(.QueryString("XMLDetail"))
        // NOTE: execute-action.ts already has complex XML parsing logic for this
        // We extract the raw parameter here; execute-action will parse the XML structure
        const xmlDetailMatch = cleanQueryString.match(/xmldetail=([^&]*)/i);
        if (xmlDetailMatch?.[1]) {
            params.xmlDetail = decodeURIComponent(xmlDetailMatch[1]);
        }

        // Extract tab (optional)
        const tabMatch = cleanQueryString.match(/tab=([^&]*)/i);
        if (tabMatch?.[1]) {
            params.tab = decodeURIComponent(tabMatch[1]);
        }

        logger.debug('Parsed queryString parameters', {
            foundParams: Object.keys(params),
            action: params.action,
            policyId: params.policyId,
        });
    } catch (error) {
        logger.error('Failed to parse queryString', error as Error, {
            queryString: cleanQueryString,
        });
        // Return partial results on error (best effort)
    }

    return params;
}

/**
 * Merge extracted parameters into existing navigation context
 *
 * **Priority**: Extracted params from queryString OVERRIDE existing context
 * This matches legacy pattern where cycling response is authoritative source.
 *
 * @param context - Current navigation context
 * @param extractedParams - Parameters extracted from cycling queryString
 * @returns Merged context with updated values
 *
 * @remarks
 * Legacy pattern: After ExecuteAction completes, mstrXMLDetail is ALWAYS
 * updated from queryString (line 1569-1575). We extend this to action,
 * policyId, and other canonical params.
 */
export function mergeParamsToContext(
    context: NavigationContextValue,
    extractedParams: CanonicalParams,
): NavigationContextValue {
    // Build merged context with queryString params taking priority
    const merged: NavigationContextValue = {
        ...context,
        // Override with extracted params if present (queryString is source of truth)
        action: (extractedParams.action ?? context.action) as NavigationContextValue['action'],
        policyId: extractedParams.policyId ?? context.policyId,
        nodeKey: extractedParams.nodeKey ?? context.nodeKey,
        userId: extractedParams.userId ?? context.userId,
        compLoc: extractedParams.compLoc ?? context.compLoc,
        // Note: xmlDetail is handled separately in execute-action.ts due to complex XML parsing
        // We preserve existing xmlDetail unless execute-action.ts provides parsed version
        tab: extractedParams.tab ? parseInt(extractedParams.tab, 10) : context.tab,
    };

    // Log significant changes (action is most critical)
    if (extractedParams.action && extractedParams.action !== context.action) {
        logger.info('🔄 Action updated from queryString (SERVER is source of truth)', {
            oldAction: context.action,
            newAction: extractedParams.action,
            source: 'cycling API querystring',
            pattern: 'Legacy: marrSessionInformation(4) = QueryString("Action")',
        });

        // Extra logging for debugging new window issues
        console.log('[DEBUG] ================================================');
        console.log('[DEBUG] 🎯 ACTION CHANGE DETECTED');
        console.log('[DEBUG] ================================================');
        console.log('[DEBUG] Before:', context.action);
        console.log('[DEBUG] After: ', extractedParams.action);
        console.log('[DEBUG] Source: Cycling API querystring');
        console.log('[DEBUG] ================================================');
    }

    if (extractedParams.policyId && extractedParams.policyId !== context.policyId) {
        logger.info('PolicyId updated from queryString', {
            oldPolicyId: context.policyId,
            newPolicyId: extractedParams.policyId,
        });
    }

    return merged;
}

/**
 * Validate that required canonical parameters are present
 *
 * Used by execute-action.ts to ensure cycling response included
 * minimum required session parameters.
 *
 * @param params - Extracted parameters to validate
 * @returns Validation result with error message if invalid
 */
export function validateCanonicalParams(params: CanonicalParams): {
    valid: boolean;
    error?: string;
} {
    // Action is required in most cases (except initial page load)
    if (!params.action || params.action.trim() === '') {
        return {
            valid: false,
            error: 'action parameter is required in cycling queryString',
        };
    }

    // At minimum, should have action
    return { valid: true };
}
