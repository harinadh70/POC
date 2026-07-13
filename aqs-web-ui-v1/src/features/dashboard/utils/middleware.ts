import { navigationContext, mergeNavigationContext } from '@/context';
import { getItem } from '@utils/local-storage';
import type { SessionInfo } from '@features/auth/services/auth';
import type { MiddlewareFunction } from 'react-router';

// ----------------------------------------

/**
 * Dashboard initialization middleware
 * Sets navigation context with action='MAIN' before dataStrategy runs
 *
 * This ensures the cycling API is called when the dashboard route is accessed
 * after login or SSO authentication.
 */
export const dashboardInitMiddleware: MiddlewareFunction = async ({ context, request }, next) => {
    const requestUrl = new URL(request.url);
    const hasActionInQuery = requestUrl.searchParams.has('action');

    const sessionInfo = getItem<SessionInfo>('sessionInformation');

    if (sessionInfo && sessionInfo.userId) {
        const currentNavContext = context.get(navigationContext);

        // Only set if not already set (to avoid overwriting)
        if (!currentNavContext?.cyclingCalled && !hasActionInQuery) {
            console.log('[dashboardInitMiddleware] Setting navigation context with action=MAIN', {
                userId: sessionInfo.userId,
                compLoc: sessionInfo.compLoc,
                policyId: sessionInfo.policyId,
            });

            context.set(
                navigationContext,
                mergeNavigationContext(currentNavContext, {
                    action: 'MAIN',
                    nodeKey: sessionInfo.nodeKey || null,
                    xmlDetail: '',
                    tab: null,
                    userId: sessionInfo.userId,
                    compLoc: sessionInfo.compLoc,
                    policyId: sessionInfo.policyId || '0',
                    cyclingCalled: false,
                }),
            );
        } else {
            console.log(
                '[dashboardInitMiddleware] Navigation context already set or action provided in URL, skipping',
                {
                    currentAction: currentNavContext?.action,
                    cyclingCalled: currentNavContext?.cyclingCalled,
                    hasActionInQuery,
                },
            );
        }
    } else {
        console.warn('[dashboardInitMiddleware] No session information found in localStorage');
    }

    await next();
};

