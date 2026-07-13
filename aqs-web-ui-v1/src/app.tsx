import { createBrowserRouter, RouterContextProvider, redirect } from 'react-router';
import { RouterProvider } from 'react-router/dom';

// context
import {
    navigationContext,
    createInitialNavigationContext,
    mergeNavigationContext,
} from '@/context';

// utils
import { executeAction, shouldExecuteAction } from '@utils/execute-action';
import { createFeatureLogger } from '@utils/logger-builder';
import { getItem } from '@utils/local-storage';
import { getMenuData } from '@utils/menu-persistence';

// routes
import { routes } from '@/routes';
import { GlobalVariableProvider } from '@providers/global-variable-provider';

import type { SessionInfo } from '@features/auth/services/auth';
import type { DOMRouterOpts } from 'react-router';

// ---------------------------------------

// Create logger for dataStrategy
const logger = createFeatureLogger('routing', 'dataStrategy');

const getContext: DOMRouterOpts['getContext'] = () => {
    const context = new RouterContextProvider();
    const sessionInfo = getItem<SessionInfo>('sessionInformation');

    const initialContext = createInitialNavigationContext();

    if (sessionInfo?.userId && sessionInfo.compLoc) {
        const persistedMenu = getMenuData(sessionInfo.userId, sessionInfo.compLoc);

        if (persistedMenu?.menuInfo) {
            context.set(
                navigationContext,
                mergeNavigationContext(initialContext, {
                    menuData: persistedMenu.menuInfo,
                    menuLoaded: true,
                }),
            );

            logger.info('Seeded navigation context with persisted menu data', {
                userId: sessionInfo.userId,
                compLoc: sessionInfo.compLoc,
                timestamp: persistedMenu.timestamp,
            });

            return context;
        }

        logger.info('No persisted menu data found during context initialization', {
            userId: sessionInfo.userId,
            compLoc: sessionInfo.compLoc,
        });
    }

    context.set(navigationContext, initialContext);

    return context;
};

interface DataStrategyResult {
    type: 'data' | 'error';
    result: unknown; // data, Error, Response, data()
}

/**
 * Enhanced dataStrategy for ExecuteAction pattern
 *
 * Intercepts navigation to:
 * 1. Call cycling API before loaders execute
 * 2. Update navigation context with response (url, frame, browserCommands)
 * 3. Handle NAVIGATE_CYCLING commands (recursive navigation)
 * 4. Handle frame-based routing (modals, redirects)
 * 5. Support deferred navigation chains
 *
 * This mimics legacy ExecuteAction routing logic in React Router v7.
 *
 * NOTE: Navigation state (action, sessionInfo, etc.) should be set in
 * navigationContext by middleware before reaching dataStrategy.
 */
const dataStrategy: DOMRouterOpts['dataStrategy'] = async ({
    matches,
    request,
    context,
    runClientMiddleware,
}) => {
    const results: Record<string, DataStrategyResult> = {};

    // Wrap entire execution in middleware so navigation context is hydrated first
    return await runClientMiddleware(async () => {
        const url = new URL(request.url);
        const navContext = context.get(navigationContext);
        const requestedAction = (url.searchParams.get('action') || '').trim().toUpperCase();

        // After frame-based redirect, the action is cleaned (pipe removed)
        // This prevents re-triggering cycling API on the redirected page
        const isPolicyInfoCombinedAction =
            url.pathname.startsWith('/policyinfo') &&
            requestedAction.includes('|');

        // LOB Action Menu: Skip cycling on initial load, but ALLOW for button actions
        // Button actions: ADD, ACTION (Edit), DELETE, ISSUE
        const isLobButtonAction =
            url.pathname.startsWith('/lob-action-menu') &&
            (requestedAction === 'ADD' ||
              requestedAction === 'ACTION' ||
              requestedAction === 'DELETE' ||
              requestedAction === 'ISSUE');

        // Check if we should call cycling API (MAIN action)
        // Skip for:
        // - Static assets
        // - Already called (cyclingCalled flag)
        // - Modal renderer routes (handles own cycling)
        // - Auth routes (/login, /logout)
        // - Policy info page (unless combined action like RATELEVEL|NEXT)
        // - LOB action menu page (unless button action like ADD/DELETE)
        const shouldCallCycling =
            !navContext?.cyclingCalled &&
            !url.pathname.startsWith('/assets') &&
            !url.pathname.startsWith('/login') &&
            !url.pathname.startsWith('/logout') &&
            (!url.pathname.startsWith('/policyinfo') || isPolicyInfoCombinedAction) &&
            (!url.pathname.startsWith('/lob-action-menu') || isLobButtonAction) &&
            navContext?.action != null &&
            shouldExecuteAction(navContext);

        if (shouldCallCycling && navContext) {
            // Check navigation depth to prevent infinite loops
            const navigationDepth = (navContext.navigationDepth || 0) + 1;

            logger.info('Calling cycling API via executeAction', {
                action: navContext.action,
                nodeKey: navContext.nodeKey,
                policyId: navContext.policyId,
                navigationDepth,
            });

            if (navigationDepth > 5) {
                logger.error('Navigation depth exceeded 5 - infinite loop detected', {
                    action: navContext.action,
                    nodeKey: navContext.nodeKey,
                });

                // Update context with error
                context.set(
                    navigationContext,
                    mergeNavigationContext(navContext, {
                        error: 'Navigation depth exceeded - infinite loop detected',
                        cyclingCalled: true,
                        navigationDepth,
                    }),
                );

                // Continue to loaders with error state
            } else {
                try {
                    // Call executeAction utility with current navigation context
                    const sessionInfo = getItem<SessionInfo>('sessionInformation');

                    if (!sessionInfo) {
                        logger.error('Session information not found in localStorage');
                        context.set(
                            navigationContext,
                            mergeNavigationContext(navContext, {
                                error: 'Session information not found',
                                cyclingCalled: true,
                                navigationDepth,
                            }),
                        );
                        return results;
                    }

                    const result = await executeAction({
                        navigationContext: navContext,
                        sessionInfo,
                        navigationDepth,
                        currentUrl: url.pathname,
                    });

                    if (result.success) {
                        // Update context with the result from executeAction
                        context.set(navigationContext, result.updatedContext);

                        logger.info('ExecuteAction success', {
                            url: result.updatedContext.url,
                            frame: result.updatedContext.frame,
                            fileName: result.fileName,
                            reactRoute: result.reactRoute,
                            action: navContext.action,
                            commandCount: result.browserCommands.length,
                            hasNavigateCycling: result.hasRecursiveNavigation,
                            navigationDepth,
                            menuStored: navContext.action === 'MENU',
                            actionType: result.actionType,
                        });

                        const frameUpper = String(result.updatedContext.frame ?? '').toUpperCase();
                        const routeTarget = result.reactRoute?.split('?')[0];

                        // Handle frame-based redirects
                        // 1. LOB frame: Always redirect (legacy LOB action menu flow)
                        // 2. MAIN frame: Only redirect when navigating FROM lob-action-menu
                        //    (LOB Add/Edit/Delete returns frame=main but needs redirect)
                        const isFromLobMenu = url.pathname.startsWith('/lob-action-menu');
                        const shouldRedirect =
                            typeof routeTarget === 'string' &&
                            routeTarget !== '' &&
                            routeTarget !== url.pathname &&
                            (frameUpper === 'LOB' || (frameUpper === 'MAIN' && isFromLobMenu));

                        if (shouldRedirect) {
                            // Build redirect URL with essential params
                            const redirectParams = new URLSearchParams();
                            if (result.updatedContext.action) {
                                redirectParams.set('action', result.updatedContext.action);
                            }
                            if (result.updatedContext.policyId) {
                                redirectParams.set('policyId', result.updatedContext.policyId);
                            }
                            if (result.updatedContext.nodeKey) {
                                redirectParams.set('nodeKey', result.updatedContext.nodeKey);
                            }

                            const redirectUrl = redirectParams.toString()
                                ? `${routeTarget}?${redirectParams.toString()}`
                                : routeTarget;

                            logger.info('Redirecting to React route from cycling response', {
                                frame: frameUpper,
                                currentPath: url.pathname,
                                targetPath: redirectUrl,
                                fileName: result.fileName,
                                isFromLobMenu,
                                preservedParams: Object.fromEntries(redirectParams.entries()),
                            });

                            throw redirect(redirectUrl);
                        }

                        // Interpret high-level action type from executeAction
                        // Frame routing logic is now centralized in execute-action.ts (matches legacy patter⟪?⟫
                        switch (result.actionType) {
                            case 'STORE_MODAL_CMD': {
                                // Modal command stored in context - no redirect
                                // BrowserCommandsProvider will handle opening dialog
                                logger.info('Modal command stored in context', {
                                    url: result.updatedContext.modalCommand?.url,
                                    width: result.updatedContext.modalCommand?.width,
                                    height: result.updatedContext.modalCommand?.height,
                                });

                                // Continue to loaders normally (parent page stays mounted)
                                break; // falls through to default loader execution
                            }

                            case 'STORE_WINDOW_CMD': {
                                // Window command already stored in context by executeAction
                                logger.info('New window command stored in context', {
                                    url: result.updatedContext.windowCommand?.url,
                                });
                                // Continue to loaders
                                break;
                            }

                            case 'COMMANDS_ONLY': {
                                // HIDDEN frame - no navigation, just commands
                                logger.info('Hidden frame - commands only, no navigation');
                                // Commands will be applied in components via useBrowserCommands
                                break;
                            }

                            case 'CONTINUE_TO_LOADER':
                            case 'EXTERNAL_REDIRECT':
                            default: {
                                // Continue to loaders normally
                                logger.debug('Continuing to loaders', {
                                    actionType: result.actionType,
                                });
                                break;
                            }
                        }
                    } else {
                        // ExecuteAction failed - update context with error
                        logger.error('ExecuteAction failed', undefined, {
                            error: result.error,
                            action: navContext.action,
                            nodeKey: navContext.nodeKey,
                        });

                        context.set(
                            navigationContext,
                            mergeNavigationContext(navContext, {
                                error: result.error,
                                cyclingCalled: true,
                                navigationDepth,
                            }),
                        );
                    }
                } catch (error) {
                    if (error instanceof Response) {
                        // Preserve React Router redirect/error responses thrown in dataStrategy.
                        throw error;
                    }

                    logger.error('ExecuteAction exception', error as Error, {
                        action: navContext?.action,
                        nodeKey: navContext?.nodeKey,
                    });

                    // Update context with error
                    context.set(
                        navigationContext,
                        mergeNavigationContext(navContext, {
                            error: error instanceof Error ? error.message : 'Unknown error',
                            cyclingCalled: true,
                            navigationDepth,
                        }),
                    );
                }
            }
        }

        // Execute loaders with proper React Router v7 patterns
        // Reget navContext in case it was updated
        const currentNavContext = context.get(navigationContext);
        const needsSequential = currentNavContext?.deferred === true;

        if (needsSequential) {
            logger.info('Sequential loader execution for deferred navigation');
        } else {
            logger.debug('Parallel loader execution for normal navigation');
        }

        if (needsSequential) {
            // Execute loaders one by one using match.resolve()
            for (const match of matches) {
                if (match.shouldCallHandler()) {
                    logger.debug('Executing loader for route', { routeId: match.route.id });

                    results[match.route.id] = await match.resolve();

                    logger.debug('Loader result', {
                        routeId: match.route.id,
                        hasResult: !!results[match.route.id],
                    });

                    // Short-circuit immediately on Response (redirect/error)
                    if (results[match.route.id].result instanceof Response) {
                        logger.warn('Loader returned Response, stopping sequential execution', {
                            routeId: match.route.id,
                        });
                        break;
                    }
                }
            }
        } else {
            // Parallel execution - filter and resolve
            const matchesToLoad = matches.filter((m) => m.shouldCallHandler());

            logger.debug('Parallel execution for matches', {
                matchCount: matchesToLoad.length,
                routeIds: matchesToLoad.map((m) => m.route.id),
            });

            await Promise.all(
                matchesToLoad.map(async (match) => {
                    logger.debug('Calling loader', { routeId: match.route.id });
                    results[match.route.id] = await match.resolve();
                    logger.debug('Loader completed', {
                        routeId: match.route.id,
                        resultType: results[match.route.id].type,
                    });
                }),
            );
        }

        return results;
    });
};

// --------------------------------------

function App() {
    // router actions
    const options: DOMRouterOpts = {
        getContext,
        dataStrategy,
        basename: import.meta.env.VITE_BASE_NAME || '/',
    };
    // routes and router
    const router = createBrowserRouter(routes, options);

    // GlobalVariableProvider is app-wide and wraps the router.
    // Remaining providers are in Root layout inside RouterProvider.
    // This ensures useNavigate and other Router hooks work properly
    return (
        <GlobalVariableProvider>
            <RouterProvider router={router} />
        </GlobalVariableProvider>
    );
}

// --------------------------------------

export default App;
