     import { navigationContext, mergeNavigationContext } from '@/context';
     import { getItem } from '@utils/local-storage';
     import { aspToReactRoute, extractAspFileName, isAspUrl } from '@utils/asp-route-mapper';
     import { createFeatureLogger } from '@utils/logger-builder';
     import { getXmlDetailFromSessionStorage } from '@utils/session-storage-helpers';

     import type { MiddlewareFunction } from 'react-router';
     import type { SessionInfo } from '@features/auth/services/auth';

    // Create logger for legacy middleware
    const logger = createFeatureLogger('legacy', 'middleware');

    /**
     * Optimized middleware for legacy catch-all route
     *
     * Handles multiple navigation scenarios with performance optimizations:
     * 1. Direct ASP URL redirects (server-side 302)
     * 2. Query param preservation
     * 3. Enhanced logging for debugging
     * 4. Early returns for performance
     */
    export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
        const url = new URL(request.url);
        const splatParam = params['*'];

        logger.debug('Legacy middleware processing', {
            pathname: url.pathname,
            splatParam,
            hasSearchParams: url.searchParams.toString().length > 0,
        });

        const sessionInfo = getItem<SessionInfo>('sessionInformation');
        const currentNavContext = context.get(navigationContext);

        // OPTIMIZATION 1: Direct ASP URL handling with server redirect
        if (isAspUrl(url.pathname) || url.searchParams.has('XMLDETAIL')) {
            const aspFileName = extractAspFileName(url.pathname + url.search);
            const canonicalRoute = aspToReactRoute(aspFileName);

            logger.info('Redirecting ASP URL to canonical route', {
                from: url.pathname + url.search,
                to: canonicalRoute,
                aspFileName,
        });

        // Preserve all query params in redirect
        const redirectUrl = new URL(canonicalRoute, url.origin);
        url.searchParams.forEach((value, key) => {
            redirectUrl.searchParams.set(key, value);
        });

        throw new Response(null, {
            status: 302,
            headers: { Location: redirectUrl.pathname + redirectUrl.search },
        });
    }

    // OPTIMIZATION 2: Early return for explicit navigation params
    const hasNavigationParams =
        url.searchParams.has('action') ||
        url.searchParams.has('nodeKey') ||
        url.searchParams.has('frame') ||
        url.searchParams.has('policyId');

    if (hasNavigationParams) {
        logger.debug('Navigation params detected, deferring to hydrate middleware');
        await next();
        return;
    }

    // OPTIMIZATION 3: Default context setup with validation
    const aspFileName = splatParam;
    if (!aspFileName) {
        logger.warn('No ASP filename in route params');
        await next();
        return;
    }

    const defaultAction = 'MAIN';
    const defaultNodeKey = sessionInfo?.nodeKey || 'POL|POL|0|';

    const nextContext = mergeNavigationContext(currentNavContext, {
        action: defaultAction,
        nodeKey: defaultNodeKey,
        xmlDetail: currentNavContext?.xmlDetail ?? getXmlDetailFromSessionStorage() ?? '',
        userId: sessionInfo?.userId ?? null,
        compLoc: sessionInfo?.compLoc ?? null,
        policyId: currentNavContext?.policyId ?? sessionInfo?.policyId ?? '0',
        cyclingCalled: false,
        fileName: aspFileName,
        reactRoute: aspToReactRoute(aspFileName),
        error: undefined,
        navigationDepth: 0,
        menuData: currentNavContext?.menuData,
        menuLoaded: currentNavContext?.menuLoaded,
    });

    context.set(navigationContext, nextContext);
    await next();
   };
