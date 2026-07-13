import { data } from 'react-router';

// context
import { userContext, navigationContext, permissionsContext } from '@/context';

// services
import { fetchUserData } from '@services/user-data';

// utils
import { safeAwait } from '@utils/common';
import { setItem } from '@utils/local-storage';

// types
import type { LoaderFunctionArgs } from 'react-router';
import type { BrowserCommand, PermissionSnapshot } from '@/types';
import type { SessionInfo } from '@features/auth/services/auth';

// ---------------------------------------

export interface DashboardLoaderData {
    userInfo: SessionInfo;
    permissionInfo: Record<string, unknown> | null;
    permissions: PermissionSnapshot | null;
    browserCommands: BrowserCommand[];
}

// ---------------------------------------

/**
 * Dashboard loader for MAIN and follow-up dashboard actions.
 *
 * @remarks
 * Permissions are exposed via loader data so route consumers can read them with
 * `useRouteLoaderData('dashboard')`, avoiding a separate React provider layer.
 */
export async function clientDashboardLoader({ context }: LoaderFunctionArgs) {
    const userInfo = context.get(userContext);

    // Get browser commands and action from navigationContext (set by dataStrategy)
    // These were extracted from the cycling API response
    const navContext = context.get(navigationContext);
    const browserCommands = navContext?.browserCommands || [];
    const action = navContext?.action;

    console.log('[DASHBOARD_LOADER]', {
        action,
    });

    if (!userInfo) {
        return data({ error: 'No user session found' }, { status: 401 });
    }

    // permissionInfo is now fetched in root loader and available via useRouteLoaderData('root')
    // For non-MAIN actions, dataStrategy already called executeAction and populated browserCommands
    // return {
    //   userInfo,
    // Keep GetUserData in the first authenticated feature loader.
    // Root loader can run before auth/session context is fully established.
    // GetUserData requires authenticated session data (compLoc, userId, nodeKey).
    // Only fetch user data on initial dashboard load (action=MAIN)
    // For other actions (e.g., STARTOPTIONS), dataStrategy handles the API call
    if (action === 'MAIN') {
        const [result, error] = await safeAwait(fetchUserData(userInfo));

        if (!result?.status || error) {
            context.set(permissionsContext, null);
            return data({ error }, { status: 500 });
        }

        const permissions = result.permissions ?? null;

        if (!permissions) {
            console.warn('[DASHBOARD_LOADER] Permissions missing from GetUserData response');
            context.set(permissionsContext, null);
        } else {
            context.set(permissionsContext, permissions);

            // Persist to localStorage so permissionsMiddleware can enforce
            // page-level access on subsequent navigations without re-fetching.
            setItem('permissionSnapshot', permissions);

            console.log('[DASHBOARD_LOADER] Permissions stored in router context + localStorage', {
                allowedPages: permissions.page.allowedAspFiles.length,
                allowActions: permissions.actions.allow.length,
            });
        }

        const loaderData: DashboardLoaderData = {
            userInfo,
            permissionInfo: result.data ?? null,
            permissions,
            browserCommands,
        };

        return loaderData;
    }

    const permissions = context.get(permissionsContext) ?? null;

    // For non-MAIN actions, reuse permissions from context and return dashboard data.
    // (dataStrategy already called executeAction and populated browserCommands)
    const loaderData: DashboardLoaderData = {
        userInfo,
        permissionInfo: null,
        permissions,
        browserCommands,
    };

    return loaderData;
}
