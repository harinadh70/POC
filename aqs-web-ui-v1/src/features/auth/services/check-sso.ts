import { loginUser, type SessionInfo } from './auth';
import { getItem, setItem } from '@utils/local-storage';

// ----------------------------------------
// SSO Check Flag Lifecycle
// ----------------------------------------
/**
 * Why SSO Check Doesn't Happen on Every Page Refresh:
 *
 * The skipSSOCheck flag (stored in localStorage) controls when Windows AD SSO checks occur.
 * This prevents unnecessary API calls on every page load.
 *
 * Flow:
 * 1. First Load (no flag):
 *    - User lands on /login
 *    - checkSSOSession() calls Windows AD API
 *    - API returns 401 (no AD session)
 *    - Sets skipSSOCheck = true in localStorage
 *    - Shows login form
 *
 * 2. On Refresh (flag exists):
 *    - skipSSOCheck = true found in localStorage
 *    - Skips SSO check completely (0 API calls)
 *    - Shows login form immediately
 *    - Performance: instant render, no wait for API
 *
 * 3. After Manual Login:
 *    - User enters credentials successfully
 *    - clientLoginAction clears skipSSOCheck flag
 *    - Next page load will attempt SSO again
 *
 * 4. After Logout:
 *    - clientLogoutAction sets skipSSOCheck = true
 *    - Prevents immediate SSO re-check after logout
 *
 * Why This Design?
 * - Avoids repeated 401 calls to Windows AD on every refresh
 * - Respects user's decision to use manual login
 * - Only re-checks SSO when user successfully authenticates
 * - Optimal for production: 1 SSO check per user session
 */

// ----------------------------------------

/**
 * Result type for SSO session check operation.
 *
 * - When status is true, sessionInformation object is provided
 * - When status is false, shouldShowLogin flag indicates user should see login UI
 */
export type SSOCheckResult =
    | { status: true; sessionInformation: SessionInfo }
    | { status: false; shouldShowLogin: true };

/**
 * Checks for an existing SSO (Single Sign-On) session.
 *
 * This function performs the following operations:
 * 1. Checks if the 'skipSSOCheck' flag exists in localStorage
 * 2. If the flag is present and true, removes it and returns a failure state
 * 3. Otherwise, attempts to authenticate via SSO by calling loginUser() without credentials
 * 4. Returns success with session information if SSO authentication succeeds
 * 5. Returns failure state if SSO authentication fails or has no session information
 *
 * The skipSSOCheck flag is used when the user explicitly logs out or when SSO
 * should be bypassed (e.g., after a manual logout to prevent immediate re-login).
 *
 * @returns {Promise<SSOCheckResult>} A promise that resolves to either:
 *   - Success state with sessionInformation object if SSO session is valid
 *   - Failure state with shouldShowLogin flag if SSO check fails or is skipped
 *
 * @example
 * const result = await checkSSOSession();
 * if (result.status) {
 *   // SSO session found, use result.sessionInformation
 *   console.log('SSO session active:', result.sessionInformation);
 * } else {
 *   // Show login form
 *   console.log('SSO check failed, showing login');
 * }
 */
export async function checkSSOSession(): Promise<SSOCheckResult> {
    // Check if we already attempted SSO and it failed
    // This flag persists across page refreshes to avoid unnecessary API calls
    // Only cleared when: 1) User logs in successfully, or 2) After explicit logout
    const skipSSO = getItem<boolean>('skipSSOCheck');
    if (skipSSO === true) {
        console.log('[SSO Check] skipSSOCheck flag set, skipping Windows AD check');
        return { status: false, shouldShowLogin: true };
    }

    try {
        // Attempt Windows AD SSO authentication
        console.log('[SSO Check] Attempting Windows AD SSO authentication');
        const loginResult = await loginUser();

        // Check if login succeeded and has session information
        if (loginResult.status && loginResult.sessionInformation) {
            console.log('[SSO Check] Windows AD SSO successful');
            return {
                status: true,
                sessionInformation: loginResult.sessionInformation,
            };
        }

        // SSO authentication failed - set flag to prevent retries
        // This flag persists in localStorage so subsequent page loads skip the SSO check
        // Result: No API calls on refresh, instant login form render
        console.log('[SSO Check] Windows AD SSO not available, setting skipSSOCheck flag');
        setItem('skipSSOCheck', true);
        return { status: false, shouldShowLogin: true };
    } catch (error) {
        // Log error and set flag to prevent retries
        console.error('[SSO Check] Failed to check SSO session:', error);
        setItem('skipSSOCheck', true);
        return { status: false, shouldShowLogin: true };
    }
}
