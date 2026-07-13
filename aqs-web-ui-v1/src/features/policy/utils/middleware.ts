import type { MiddlewareFunction } from 'react-router';
import { navigationContext, mergeNavigationContext } from '@/context';

// Middleware to skip legacy cycling for the policyinfo route
export const policyInfoSkipMiddleware: MiddlewareFunction = async ({ request, context }, next) => {
    try {
        const url = new URL(request.url);
        if (url.pathname === '/policyinfo') {
            const action = (url.searchParams.get('action') || '').trim();
            const shouldSkipCycling = !action.includes('|');

            const navContext = context.get(navigationContext);
            if (navContext && shouldSkipCycling) {
                context.set(
                    navigationContext,
                    mergeNavigationContext(navContext, { cyclingCalled: true }),
                );
                console.log('[policyInfoSkipMiddleware] marked navigationContext.cyclingCalled for /policyinf⟪?⟫
            }
        }
    } catch (e) {
        // ignore
    }

    await next();
};
