import { data, redirect } from 'react-router';

// services
import { checkSSOSession } from '../services/check-sso';
import { type SessionInfo } from '../services/auth';

// utils
import { setItem, getItem } from '@utils/local-storage';

// ----------------------------------------

/**
 * Loader function for the login route.
 *
 * Checks if the user is already authenticated via SSO before rendering the login form.
 * If SSO authentication is successful, stores the session information and redirects
 * to the appropriate dashboard page. If SSO fails or is skipped, allows the login
 * form to render.
 *
 * @param {LoaderFunctionArgs} args - React Router loader arguments
 * @returns Either a redirect to the dashboard or data(null) to render login
 *
 * @example
 * // In route configuration:
 * {
 *   path: '/login',
 *   loader: clientLoginLoader,
 *   element: <LoginPage />
 * }
 */
export async function clientLoginLoader() {
    try {
        // Check if there's already a valid session in localStorage
        const existingSession = getItem<SessionInfo>('sessionInformation');
        if (existingSession && existingSession.userId) {
            // User already has a session, redirect to root to trigger MENU load
            // rootMenuMiddleware will set action='MENU' → then cascade to dashboard
            console.log('[clientLoginLoader] Existing session found, redirecting to root');
            return redirect('/');
        }

        // Check if skipSSOCheck flag is set (from 401 interceptor or manual logout)
        const skipSSO = getItem<boolean>('skipSSOCheck');
        if (skipSSO === true) {
            // Don't remove flag yet - keep it for manual login attempt
            console.log('[clientLoginLoader] skipSSOCheck flag detected, rendering login form');
            return data(null);
        }

        // No session and no skip flag - attempt SSO authentication
        const ssoResult = await checkSSOSession();

        // If SSO authentication was successful
        if (ssoResult.status === true && ssoResult.sessionInformation) {
            // Store session information in localStorage for subsequent requests
            const stored = setItem('sessionInformation', ssoResult.sessionInformation);

            if (!stored) {
                console.error(
                    '[clientLoginLoader] Failed to store session information in localStorage',
                );
                return data(null);
            }

            // SSO successful - redirect to root to trigger MENU load first
            console.log('[clientLoginLoader] SSO successful, redirecting to root', {
                userId: ssoResult.sessionInformation.userId,
                compLoc: ssoResult.sessionInformation.compLoc,
                policyId: ssoResult.sessionInformation.policyId,
            });

            // NOTE: Redirect to root route first to trigger MENU loading
            // Flow: root → rootMenuMiddleware sets action='MENU' → dataStrategy calls API
            // Then Root useEffect cascades to dashboard → action='MAIN'
            return redirect('/');
        }

        // SSO failed or skipSSOCheck was set - allow login form to render
        console.log('[clientLoginLoader] SSO not available or skipped, rendering login form');
        return data(null);
    } catch (error) {
        // Log error and allow login form to render as fallback
        console.error('[clientLoginLoader] Error during SSO check:', error);
        return data(null);
    }
}
