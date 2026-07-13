import { redirect } from 'react-router';

// context
import { navigationContext, permissionsContext } from '@/context';

// services
import { type SessionInfo } from '@features/auth/services/auth';
import { fetchUserData } from '@features/root/services/user-data';

// utils
import isEmpty from 'lodash-es/isEmpty';
import { getItem } from '@utils/local-storage';
import { getMenuData } from '@utils/menu-persistence';
import { readContextFromStorage, mergeStoredContext } from '@utils/session-sync';
import { safeAwait } from '@utils/common';
import { initializePermissions, isPermissionsInitialized } from '@utils/permission-store';

// types
import type { LoaderFunctionArgs } from 'react-router';

// ----------------------------------------

export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
    const emptyMenuInfo = {
        menus: [],
        queryString: '',
    };

    const parseMenuInfo = (source: unknown): { menus: unknown[]; queryString: string } => {
        if (!source || typeof source !== 'object') {
            return emptyMenuInfo;
        }

        if ('menus' in source && Array.isArray(source.menus)) {
            return {
                menus: source.menus,
                queryString:
                    'queryString' in source && typeof source.queryString === 'string'
                        ? source.queryString
                        : emptyMenuInfo.queryString,
            };
        }

        if (
            'xmlDetail' in source &&
            typeof source.xmlDetail === 'object' &&
            source.xmlDetail !== null
        ) {
            const xmlDetail = source.xmlDetail;
            const menus =
                'mxmlPageData' in xmlDetail &&
                typeof xmlDetail.mxmlPageData === 'object' &&
                xmlDetail.mxmlPageData !== null &&
                'menus' in xmlDetail.mxmlPageData &&
                typeof xmlDetail.mxmlPageData.menus === 'object' &&
                xmlDetail.mxmlPageData.menus !== null &&
                'menu' in xmlDetail.mxmlPageData.menus &&
                Array.isArray(xmlDetail.mxmlPageData.menus.menu)
                    ? xmlDetail.mxmlPageData.menus.menu
                    : [];

            return {
                menus,
                queryString:
                    'queryString' in source && typeof source.queryString === 'string'
                        ? source.queryString
                        : emptyMenuInfo.queryString,
            };
        }

        return emptyMenuInfo;
    };

    const url = new URL(request.url);

    // Skip MENU API call on login page
    if (url.pathname === '/login') {
        return { userInfo: undefined, menuInfo: undefined, permissionInfo: null };
    }

    // Step 1: Extract canonical parameters from URL (for new window or page reload with params)
    // URL params have PRIORITY over stored context (server is source of truth)
    const urlParams = {
        action: url.searchParams.get('action') || undefined,
        policyId: url.searchParams.get('policyid') || undefined,
        nodeKey: url.searchParams.get('nodekey') || undefined,
        userId: url.searchParams.get('userid') || undefined,
        compLoc: url.searchParams.get('comploc') || undefined,
        diagnosticMode: url.searchParams.get('diagnosticmode') || undefined,
        xmlDetail: url.searchParams.get('xmldetail') || undefined,
        tab: url.searchParams.get('tab') || undefined,
    };

    console.log('[DEBUG] 🚀 ROOT LOADER - Window Initialization');
    console.log('[DEBUG] ==========================================');
    console.log('[DEBUG] URL Path:', url.pathname);
    console.log('[DEBUG] URL Params:', urlParams);
    console.log('[DEBUG] ==========================================');

    // Step 2: Read stored context from sessionStorage (window-scoped backup)
    const storedContext = readContextFromStorage();

    console.log('[DEBUG] Stored Context (sessionStorage):', storedContext);
    console.log('[DEBUG] ==========================================');

    // Step 3: Merge URL params (priority) with stored context (fallback)
    // If neither exists, currentContext will be empty and runtime will initialize from sessionInformation
    const currentContext = context.get(navigationContext);
    const mergedContext = mergeStoredContext(urlParams, storedContext);

    console.log('[DEBUG] Current Context (React Router):', currentContext);
    console.log('[DEBUG] Merged Context (URL + Storage):', mergedContext);
    console.log('[DEBUG] ==========================================');

    console.log('[clientRootLoader] Session initialization check', {
        hasUrlParams: Object.values(urlParams).some((v) => v !== undefined),
        hasStoredContext: !!storedContext,
        hasCurrentContext: !!currentContext,
        mergedAction: mergedContext.action,
        mergedPolicyId: mergedContext.policyId,

    });

    // Step 4: Update context with merged values if we have any
    // This ensures new windows and page reloads get initialized correctly
    if (mergedContext.action || mergedContext.policyId) {
        const updatedContext = {
            ...currentContext,
            ...mergedContext,
        };

        context.set(navigationContext, updatedContext);

        console.log('[clientRootLoader] Context initialized from URL/storage', {
            action: updatedContext.action,
            policyId: updatedContext.policyId,
            nodeKey: updatedContext.nodeKey,
        });
    }

    // Try to get sessionInformation from localStorage
    let userInfo = undefined;
    let menuInfo = undefined;
    let permissionInfo: Record<string, unknown> | null = null;

    const sessionInfo = getItem<SessionInfo>('sessionInformation');
    const navContext = context.get(navigationContext);

    if (sessionInfo && sessionInfo.userId) {
        userInfo = sessionInfo;

        // Intentionally do not call GetUserData here.
        // Root loader also serves pre-auth/login navigation, while GetUserData
        // depends on authenticated session values and should run in the first
        // authenticated feature loader (dashboard MAIN action).

        console.log('[clientRootLoader] Session found, reading menu from context', {
            userId: sessionInfo.userId,
        });

        // Fetch user data (permissions) for all authenticated users
        // This makes permissionInfo available globally via useRouteLoaderData('root')
        // CRITICAL: Only fetch if not already initialized to prevent infinite loops
        if (!isPermissionsInitialized()) {
            console.log('[clientRootLoader] Permissions not initialized, fetching user data...');
            const [result, error] = await safeAwait(fetchUserData(sessionInfo));

            if (result?.status && !error) {
                permissionInfo = result.data ?? null;

                // Initialize global permission store for use throughout the app
                if (permissionInfo) {
                    initializePermissions(permissionInfo);
                }

                console.log('[clientRootLoader] Permission data loaded', {
                    hasXdiSecurity: !!permissionInfo?.xdiSecurity,
                    hasXdiOptions: !!permissionInfo?.xdiOptions,
                });
            } else {
                console.warn('[clientRootLoader] Failed to fetch permission data', { error });
            }
        } else {
            console.warn('[clientRootLoader] Permissions already initialized, skipping fetchUserData');
            // Permissions already loaded, no need to fetch again
            // This prevents infinite loops on repeated root loader calls
        }

        // Get menu data from navigationContext (set by dataStrategy after MENU API call)
        console.log('[clientRootLoader] ===== MENU DATA CHECK =====');
        console.log('[clientRootLoader] Navigation context:', {
            exists: !!navContext,
            hasMenuData: !!navContext?.menuData,
            menuLoaded: navContext?.menuLoaded,
            action: navContext?.action,
            keys: navContext ? Object.keys(navContext) : [],
        });

        if (navContext?.menuData) {
            menuInfo = parseMenuInfo(navContext.menuData);

            console.log('[clientRootLoader] Menu data found in context', {
                menuCount: Array.isArray(menuInfo.menus) ? menuInfo.menus.length : 0,
                queryString: menuInfo.queryString,
            });
        } else {
            const persistedMenu = getMenuData(sessionInfo.userId, sessionInfo.compLoc);
            if (persistedMenu?.menuInfo) {
                menuInfo = parseMenuInfo(persistedMenu.menuInfo);
                console.log('[clientRootLoader] Loaded menu data from localStorage fallback', {
                    menuCount: Array.isArray(menuInfo.menus) ? menuInfo.menus.length : 0,
                    queryString: menuInfo.queryString,
                    timestamp: persistedMenu.timestamp,
                });
            } else {
                console.warn(
                    '[clientRootLoader] No menu data in navigation context or localStorage',
                );
                menuInfo = emptyMenuInfo;
            }
        }
    }

    // If userInfo is logged in and trying to hit login page, send to root (not dashboard)
    // Root useEffect will handle cascading to dashboard after MENU loads
    if (!isEmpty(userInfo) && url.pathname === '/login') {
        throw redirect('/');
    }

    // If no userInfo and trying to hit root, redirect to login
    // But if already on login page, don't redirect - let the login page render
    if (isEmpty(userInfo) && url.pathname === '/') {
        throw redirect('/login');
    }

    // Get navigation context to pass to components (for windowCommand handling)
    //const navContext = context.get(navigationContext);
    const permissions = context.get(permissionsContext);

    // Presence (The "Identity") - we need this for root layout components - header, sidebar, footer
    return { userInfo, menuInfo, navigationContext: navContext, permissions: permissions ?? null };
}
