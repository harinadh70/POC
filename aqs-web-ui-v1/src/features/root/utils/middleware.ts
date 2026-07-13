import { navigationContext, mergeNavigationContext } from '@/context';
import { getItem } from '@utils/local-storage';
import { getPendingXmlDetail } from '@utils/xml-detail-persistence';
import type { ActionType, FrameType } from '@/types';
import type { SessionInfo } from '@features/auth/services/auth';
import type { MiddlewareFunction } from 'react-router';

interface NavigationLocationState {
    xmlDetail?: string;
}

interface MiddlewareRequestWithState extends Request {
    request?: {
        state?: unknown;
    };
    state?: unknown;
}

const getSessionXmlDetail = (sessionInfo: SessionInfo | null): string | null => {
    if (!sessionInfo || typeof sessionInfo !== 'object') {
        return null;
    }

    const sessionRecord = sessionInfo as Record<string, unknown>;
    const sessionXml = sessionRecord.sessionXml;

    if (typeof sessionXml !== 'string' || sessionXml.trim() === '') {
        return null;
    }

    return sessionXml;
};

const normalizeCurrentXmlDetail = (xmlDetail: unknown): string | null => {
    if (typeof xmlDetail !== 'string' || !xmlDetail) {
        return null;
    }

    if (xmlDetail.trim() === '' || xmlDetail.trim() === '<items />') {
        return null;
    }

    return xmlDetail;
};

const isNavigationLocationState = (value: unknown): value is NavigationLocationState => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const state = value as Record<string, unknown>;
    return state.xmlDetail === undefined || typeof state.xmlDetail === 'string';
};

const getXmlDetailFromLocationState = (request: Request): string | null => {
    const requestWithState = request as MiddlewareRequestWithState;

    const nestedRequestState = requestWithState.request?.state;
    if (isNavigationLocationState(nestedRequestState) && nestedRequestState.xmlDetail) {
        return nestedRequestState.xmlDetail;
    }

    const directRequestState = requestWithState.state;
    if (isNavigationLocationState(directRequestState) && directRequestState.xmlDetail) {
        return directRequestState.xmlDetail;
    }

    if (typeof window !== 'undefined') {
        const historyState = (window.history.state as { usr?: unknown } | null)?.usr;
        if (isNavigationLocationState(historyState) && historyState.xmlDetail) {
            return historyState.xmlDetail;
        }
    }

    return null;
};

// ----------------------------------------------

/**
 * Hydrates navigation context from URL query params.
 *
 * This enables same-route actions like ?action=STARTOPTIONS to re-trigger
 * cycling API calls by resetting cyclingCalled=false.
 */
export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (
    { context, request },
    next,
) => {
    const url = new URL(request.url);
    const xmlDetailFromPending = getPendingXmlDetail(request.url);
    const xmlDetailFromState = getXmlDetailFromLocationState(request);
    const resolvedXmlDetail = xmlDetailFromPending ?? xmlDetailFromState;

    const parsedNavigation = {
        action: url.searchParams.get('action') as ActionType | null,
        frame: url.searchParams.get('frame') as FrameType | null,
        policyId: url.searchParams.get('policyId'),
        nodeKey: url.searchParams.get('nodeKey'),
    };

    const sessionInfo = getItem<SessionInfo>('sessionInformation');
    const sessionXmlDetail = getSessionXmlDetail(sessionInfo);
    const userId = sessionInfo?.userId ?? null;
    const compLoc = sessionInfo?.compLoc ?? null;
    const currentNavContext = context.get(navigationContext);
    const currentXmlDetail = normalizeCurrentXmlDetail(currentNavContext?.xmlDetail);
    const xmlDetailForContext =
        resolvedXmlDetail ?? sessionXmlDetail ?? currentXmlDetail ?? '';

    const hasNavigationParams =
        url.searchParams.has('action') ||
        url.searchParams.has('nodeKey') ||
        url.searchParams.has('frame') ||
        url.searchParams.has('policyId');

    if (hasNavigationParams) {
        console.log('[HYDRATE_MIDDLEWARE] URL params detected', {
            action: parsedNavigation.action,
            frame: parsedNavigation.frame,
            hasPendingXmlDetail: !!xmlDetailFromPending,
            hasXmlDetailState: !!xmlDetailFromState,
        });

        // TODO ⟪missing lines 125-127 — not captured in photos⟫
        context.set(
            navigationContext,
            mergeNavigationContext(currentNavContext, {
                action: parsedNavigation.action ?? currentNavContext?.action ?? null,
                nodeKey:
                    parsedNavigation.nodeKey ?? currentNavContext?.nodeKey ?? null,
                frame: parsedNavigation.frame ?? currentNavContext?.frame ?? null,
                userId,
                tab: null,
                compLoc,
                xmlDetail: xmlDetailForContext,
                policyId:
                    parsedNavigation.policyId ??
                    currentNavContext?.policyId ??
                    sessionInfo?.policyId ??
                    '0',
                cyclingCalled: false,
                error: undefined,
                modalCommand: undefined,
                windowCommand: undefined,
                navigationDepth: 0,
                // Preserve menu data across navigations
                menuData: currentNavContext?.menuData,
                menuLoaded: currentNavContext?.menuLoaded,
            }),
        );
    }

    await next();
};

// ----------------------------------------

/**
 * Root initialization middleware
 * Sets navigation context with action='MENU' before dataStrategy runs
 *
 * This ensures the cycling API is called to load menu data when root layout loads
 * with an authenticated session.
 */
export const rootMenuMiddleware: MiddlewareFunction = async ({ context, request }, next) => {
    const url = new URL(request.url);
    const actionFromUrl = url.searchParams.get('action');
    // Skip MENU API call on login page
    if (url.pathname === '/login') {
        console.log('[rootMenuMiddleware] Skipping MENU action on login page');
        await next();
        return;
    }

    const sessionInfo = getItem<SessionInfo>('sessionInformation');
    const sessionXmlDetail = getSessionXmlDetail(sessionInfo);

    if (sessionInfo && sessionInfo.userId) {
        const currentNavContext = context.get(navigationContext);

        if (actionFromUrl) {
            console.log('[rootMenuMiddleware] Preserving action from URL', {
                action: actionFromUrl,
                userId: sessionInfo.userId,
                compLoc: sessionInfo.compLoc,
                policyId: sessionInfo.policyId,
            });

            context.set(
                navigationContext,
                mergeNavigationContext(currentNavContext, {
                    action: actionFromUrl as ActionType,
                    nodeKey: currentNavContext?.nodeKey ?? sessionInfo.nodeKey ?? null,
                    xmlDetail:
                        normalizeCurrentXmlDetail(currentNavContext?.xmlDetail) ??
                        sessionXmlDetail ??
                        '',
                    tab: null,
                    userId: sessionInfo.userId,
                    compLoc: sessionInfo.compLoc,
                    policyId: currentNavContext?.policyId ?? sessionInfo.policyId ?? '0',
                    cyclingCalled: false,

                }),
            );
        } else if (!currentNavContext?.action) {
            console.log('[rootMenuMiddleware] Setting navigation context with action=MENU', {
                userId: sessionInfo.userId,
                compLoc: sessionInfo.compLoc,
                policyId: sessionInfo.policyId,
            });
            context.set(
                navigationContext,
                mergeNavigationContext(currentNavContext, {
                    action: 'MENU',
                    nodeKey: sessionInfo.nodeKey || null,
                    xmlDetail: sessionXmlDetail ?? '',
                    tab: null,
                    userId: sessionInfo.userId,
                    compLoc: sessionInfo.compLoc,
                    policyId: sessionInfo.policyId || '0',
                    cyclingCalled: false,
                }),
            );
        } else {
            console.log('[rootMenuMiddleware] Navigation context already set, skipping', {
                actionFromUrl,
                action: currentNavContext?.action,
                cyclingCalled: currentNavContext?.cyclingCalled,
            });
        }
    } else {
        console.log('[rootMenuMiddleware] No session information found in localStorage');
    }

    await next();
};
