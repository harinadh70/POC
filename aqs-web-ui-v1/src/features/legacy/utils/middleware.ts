import { navigationContext, mergeNavigationContext } from '@/context';
import { getItem } from '@utils/local-storage';
import { aspToReactRoute } from '@utils/asp-route-mapper';
import { createFeatureLogger } from '@utils/logger-builder';
import { getXmlDetailFromSessionStorage } from '@utils/session-storage-helpers';

import type { MiddlewareFunction } from 'react-router';
import type { SessionInfo } from '@features/auth/services/auth';

// Create logger for legacy middleware
const logger = createFeatureLogger('legacy', 'middleware');

/**
 * Middleware for legacy catch-all route
 *
 * Ensures navigation context is set correctly for generic legacy pages.
 * Extracts ASP filename from URL params and sets appropriate action/nodeKey.
 */
export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
    const url = new URL(request.url);
    const aspFileName = params['*']; // For legacy/* route, * contains the ASP filename

    logger.info('Legacy middleware called', {
        pathname: url.pathname,
        aspFileName,
        searchParams: Object.fromEntries(url.searchParams),
    });

    const sessionInfo = getItem<SessionInfo>('sessionInformation');
    const currentNavContext = context.get(navigationContext);

    // If URL has action/nodeKey params, let hydrateNavigationContextMiddleware handle it
    // (assuming it's already run in the root)
    const hasNavigationParams =
        url.searchParams.has('action') ||
        url.searchParams.has('nodeKey') ||
        url.searchParams.has('frame') ||
        url.searchParams.has('policyId');

    if (hasNavigationParams) {
        logger.info('Navigation params present in URL, using existing context', {
            action: url.searchParams.get('action'),
            nodeKey: url.searchParams.get('nodeKey'),
        });
        await next();
        return;
    }

    // No navigation params - default to MAIN action with nodeKey from session
    const defaultAction = 'MAIN';
    const defaultNodeKey = sessionInfo?.nodeKey || 'POL|POL|0|'; // Legacy default

    logger.info('No navigation params, setting defaults', {
        defaultAction,
        defaultNodeKey,
        aspFileName,
    });

    const nextContext = mergeNavigationContext(currentNavContext, {
        action: defaultAction,
        nodeKey: defaultNodeKey,
        xmlDetail: currentNavContext?.xmlDetail ?? getXmlDetailFromSessionStorage() ?? '',
        userId: sessionInfo?.userId ?? null,
        compLoc: sessionInfo?.compLoc ?? null,
        policyId: currentNavContext?.policyId ?? sessionInfo?.policyId ?? '0',
        cyclingCalled: false, // Force cycling call
        fileName: aspFileName,
        reactRoute: aspFileName ? aspToReactRoute(aspFileName) : undefined,
        error: undefined,
        navigationDepth: 0,
        // Preserve menu data
        menuData: currentNavContext?.menuData,
        menuLoaded: currentNavContext?.menuLoaded,
    });

    context.set(navigationContext, nextContext);

    logger.info('Legacy navigation context set', {
        action: nextContext.action,
        nodeKey: nextContext.nodeKey,
        fileName: nextContext.fileName,
        reactRoute: nextContext.reactRoute,
    });

    await next();
};
