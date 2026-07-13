import { data, redirect } from 'react-router';
import { loginUser, logoutUser } from '../services/auth';

// utils
import { removeItem, setItem } from '@utils/local-storage';
import { clearMenuData } from '@utils/menu-persistence';
import { clearSessionStorage } from '@utils/session-storage';
import { clearPermissions } from '@utils/permission-store';

// types
import type { ActionFunctionArgs } from 'react-router';

// ----------------------------------------

export async function clientLoginAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // 1. Validate the user / Call your Backend API here
    const result = await loginUser(username as string, password as string);
    if (!result.status) {
        // We return 'data' so the component can access it via useActionData
        return data({ error: 'Login Failed. Please try again.' }, { status: 401 });
    }

    // Store sessionInformation in localStorage for client-side access
    if (result.sessionInformation) {
        setItem('sessionInformation', result.sessionInformation);

        // Clear skipSSOCheck flag now that user has successfully logged in
        // This allows SSO check to run again on next page load (in case user gets AD session later)
        removeItem('skipSSOCheck');

        console.log('[clientLoginAction] Login successful, redirecting to root', {
            userId: result.sessionInformation.userId,
            compLoc: result.sessionInformation.compLoc,
            policyId: result.sessionInformation.policyId,
        });

        // NOTE: Redirect to root route first to trigger MENU loading
        // Flow: root → rootMenuMiddleware sets action='MENU' → dataStrategy calls API
        // Then Root useEffect cascades to dashboard → action='MAIN'
        // This matches legacy ExecuteAction serial initialization pattern
        return redirect('/');
    }

    return data({ error: 'Failed to login due to missing session information.' }, { status: 401 });
}

export async function clientLogoutAction() {
    const result = await logoutUser();

    if (!result) {
        return data({ error: 'Logout failed.' });
    }

    const sessionInfo = localStorage.getItem('sessionInformation');
    if (sessionInfo) {
        try {
            const parsed = JSON.parse(sessionInfo) as { userId?: string; compLoc?: string };
            if (parsed.userId && parsed.compLoc) {
                clearMenuData(parsed.userId, parsed.compLoc);
            }
        } catch (error) {
            console.error('[clientLogoutAction] Failed to parse session information', error);
        }
    }

    // Remove sessionInformation and cached permissions from localStorage on logout
    removeItem('sessionInformation');
    removeItem('permissionSnapshot');

    // Clear in-memory permission cache to prevent stale data
    clearPermissions();

    // Clear ALL sessionStorage keys so global variables and cached per-session values do not leak across use
    clearSessionStorage();

    // Set flag to skip SSO check after logout
    // Prevents immediate Windows AD re-authentication when user explicitly logged out
    setItem('skipSSOCheck', true);

    // Redirect to login page
    return redirect('/login');
}
