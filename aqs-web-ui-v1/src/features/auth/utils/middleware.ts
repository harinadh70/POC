import { redirect } from 'react-router';
import { userContext } from '@/context';

// utils
import { getItem } from '@utils/local-storage';

// types
import type { MiddlewareFunction } from 'react-router';
import type { SessionInfo } from '@features/auth/services/auth';

// ----------------------------------------

// Client-side Authentication Middleware
export const authMiddleware: MiddlewareFunction = async ({ request, context }, next) => {
    // Check if user was already fetched and stored in context
    let userInfo = context.get(userContext);

    if (!userInfo || !userInfo.userId) {
        // Try to get sessionInformation from localStorage using typed utility
        try {
            const sessionInfo = getItem<SessionInfo>('sessionInformation');
            if (sessionInfo && sessionInfo.userId) {
                userInfo = sessionInfo;
                // Store in context for further use
                context.set(userContext, sessionInfo);
            }
        } catch (error) {
            console.error('Error getting sessionInformation from localStorage', error);
        }
    }

    const url = new URL(request.url);

    // ❌ if invalid userInfo kick out
    if (!userInfo || !userInfo.userId) {
        if (url.pathname !== '/') {
            console.log('No valid user, redirecting to login');
            throw redirect('/');
        }
    }

    // ✔️ go ahead
    await next();
};
