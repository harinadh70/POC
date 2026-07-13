/**
 * @file execute-action.ts
 * @description Core ExecuteAction utility for React Router v7 dataStrategy pattern
 *
 * This module handles:
 * 1. Calling the navigation service (cycling API)
 * 2. Parsing response and extracting FileName
 * 3. Converting ASP filenames to React routes
 * 4. Building updated navigation context
 * 5. Determining frame-based routing action
 *
 * **CRITICAL**: This implementation mirrors the legacy VBScript ExecuteAction
 * (Main_ISLLSYS_20010101.vbs lines 1389-1827), particularly the FileName extraction
 * logic which was missing in the original dataStrategy implementation.
 *
 * @example
 * ```tsx
 * // In dataStrategy:
 * const result = await executeAction({
 *   navigationContext: navContext,
 *   sessionInfo: userInfo,
 *   navigationDepth: 0,
 * });
 *
 * if (result.success) {
 *   context.set(navigationContext, result.updatedContext);
 *
// TODO ⟪missing lines 28-29 — not captured in photos⟫
 *   }
 *   if (result.frameAction.type === 'redirect') {
 *     return redirect(result.frameAction.url);
 *   }
 */
import { navigation } from '@/services/navigation';
import {
    extractAspFileName,
    buildReactRouteUrl,
    isAspUrl,
    aspToReactRoute,
    extractCanonicalParams,
} from '@utils/asp-route-mapper';
import { routeByFrame } from '@utils/frame-router';
import { setMenuData } from '@utils/menu-persistence';
import { mergeNavigationContext } from '@/context';
import { createFeatureLogger } from '@utils/logger-builder';
import { getActionConfig } from '@/config/action-config';
import { parseQueryStringParams, mergeParamsToContext } from '@utils/parse-querystring-params';
import { syncContextToStorage } from '@utils/session-sync';
import { toLegacyXmlDetailString } from '@utils/legacy-xml-detail';
import type { NavigationContextValue, FollowupActionConfig } from '@/context';
import type { SessionInfo } from '@features/auth/services/auth';
import type { FrameAction } from '@utils/frame-router';
import type { PageNavigationResponse } from '@/services/navigation';
import type { FrameType, BrowserCommand } from '@/types';

// Create logger for execute-action
const logger = createFeatureLogger('navigation', 'execute-action');

const NEW_WINDOW_GUARD_STORAGE_KEY = 'aqs:newwindow:guard';
const NEW_WINDOW_GUARD_TTL_MS = 60_000;

interface NewWindowGuardState {
    targetUrl: string;
    createdAt: number;
}

function readNewWindowGuardState(): NewWindowGuardState | null {
    if (typeof window === 'undefined') return null;

    try {
        const rawState = window.sessionStorage.getItem(NEW_WINDOW_GUARD_STORAGE_KEY);
        if (!rawState) return null;

        const parsed = JSON.parse(rawState) as Partial<NewWindowGuardState>;
        if (typeof parsed.targetUrl !== 'string' || typeof parsed.createdAt !== 'number') {
            return null;
        }

        return {
            targetUrl: parsed.targetUrl,
            createdAt: parsed.createdAt,
        };
    } catch {
        return null;
    }
}

function writeNewWindowGuardState(targetUrl: string): void {
    if (typeof window === 'undefined') return;

    const state: NewWindowGuardState = {
        targetUrl,
        createdAt: Date.now(),
    };

    try {
        window.sessionStorage.setItem(NEW_WINDOW_GUARD_STORAGE_KEY, JSON.stringify(state));
    } catch {
        // Best effort guard only
    }
}
}

function isPopupWindowContext(): boolean {
    if (typeof window === 'undefined') return false;
    try {
        return Boolean(window.opener && window.opener !== window);
    } catch {
        // Cross-origin opener access can throw in some browsers; treat as popup context
        return true;
    }
}
}

function getPolicyIdFromQueryString(queryString?: string): string | null {
    if (!queryString) {
        return null;
    }
    const queryOnly = queryString.includes('?') ? queryString.split('?')[1] : queryString;
    const params = new URLSearchParams(queryOnly);

    for (const [key, value] of params.entries()) {
        if (key.toLowerCase() === 'policyid') {
            return value;
        }
    }

    return null;
}

function getMenuQueryString(menuData: unknown): string | undefined {
    if (!menuData || typeof menuData !== 'object') {
        return undefined;
    }

    if ('queryString' in menuData && typeof menuData.queryString === 'string') {
        return menuData.queryString;
    }

    if (
        'menuInfo' in menuData &&
        typeof menuData.menuInfo === 'object' &&
        menuData.menuInfo !== null &&
        'queryString' in menuData.menuInfo &&
        typeof menuData.menuInfo.queryString === 'string'
    ) {
        return menuData.menuInfo.queryString;
    }

    return undefined;
}

function extractMenus(menuSource: unknown): unknown[] {
    if (!menuSource || typeof menuSource !== 'object') {
        return [];
    }

    if (
        'xmlDetail' in menuSource &&
        typeof menuSource.xmlDetail === 'object' &&
        menuSource.xmlDetail !== null &&
        'mxmlPageData' in menuSource.xmlDetail &&
        typeof menuSource.xmlDetail.mxmlPageData === 'object' &&
        menuSource.xmlDetail.mxmlPageData !== null &&
        'menus' in menuSource.xmlDetail.mxmlPageData &&
        typeof menuSource.xmlDetail.mxmlPageData.menus === 'object' &&
        menuSource.xmlDetail.mxmlPageData.menus !== null &&
        'menu' in menuSource.xmlDetail.mxmlPageData.menus &&
        Array.isArray(menuSource.xmlDetail.mxmlPageData.menus.menu)
    ) {
        return menuSource.xmlDetail.mxmlPageData.menus.menu;
    }
    return [];
}


// ------------------------------------------------------------
// Types
// ------------------------------------------------------------

/**
 * Parameters for executeAction
 */
export interface ExecuteActionParams {
  /** Current navigation context from React Router context */
  navigationContext: NavigationContextValue;

  /** Session information for API calls */
  sessionInfo: SessionInfo;

  /** Current navigation depth for infinite loop prevention */
  navigationDepth: number;

  /** Optional: Current URL for same-route detection */
  currentUrl?: string;
}

/**
 * High-level action types for dataStrategy routing decisions
 */
export type ActionType =
  | 'STORE_MODAL_CMD' // Store modal command in context (changed from REDIRECT_MODAL)
  | 'STORE_WINDOW_CMD' // Store new window command in context
  | 'COMMANDS_ONLY' // No navigation, just apply commands
  | 'CONTINUE_TO_LOADER' // Normal loader flow
  | 'EXTERNAL_REDIRECT'; // Redirect to external URL

/**
 * Result from executeAction
 */
export interface ExecuteActionResult {
  /** Whether the execution was successful */
  success: boolean;

  /** Updated navigation context with response data */
  updatedContext: NavigationContextValue;

  /** Frame-based routing action to perform */
  frameAction: FrameAction;

  /** Raw response data from cycling API */
  responseData?: PageNavigationResponse;

  /** Error message if execution failed */
  error?: string;

  /** Extracted ASP filename from response */
  fileName?: string;

  /** Converted React route from ASP filename */
  reactRoute?: string;

  /** Whether this is a recursive navigation (NAVIGATE_CYCLING) */
  hasRecursiveNavigation: boolean;

  /** Browser commands returned by cycling API */
  browserCommands: BrowserCommand[];

  /**
   * High-level action type for dataStrategy to interpret
   * Centralizes frame routing logic inside executeAction (matches legacy pattern)
   */
  actionType: ActionType;

  /**
   * Pre-built modal URL for REDIRECT_MODAL actionType
   * Includes dimensions and query string
   */
  modalUrl?: string;
}

// ------------------------------------------------------------
// Core Function
// ------------------------------------------------------------
/**
 * Execute navigation action using cycling API
 *
 * This function:
 * 1. Calls the cycling API with current navigation context
 * 2. Parses response and extracts FileName (CRITICAL - was missing!)
 * 3. Converts ASP filename to React route using asp-route-mapper
 * 4. Builds updated navigation context
 * 5. Uses frame-router to determine navigation action
 *
 * @param params - Execution parameters
 * @returns Execution result with updated context and frame action
 */
export async function executeAction(params: ExecuteActionParams): Promise<ExecuteActionResult> {
  const { navigationContext: navContext, navigationDepth, currentUrl } = params;

  logger.info('ExecuteAction called', {
    action: navContext.action,
    nodeKey: navContext.nodeKey,
    depth: navigationDepth,
    tab: navContext.tab,
  });
  try {
    // Step 1: Call cycling API
    // Convert xmlDetail to legacy XML string expected by PageNavigation.
    const xmlDetailString = toLegacyXmlDetailString(navContext.xmlDetail, '');

    const cyclingResult = await navigation({
      compLoc: navContext.compLoc ?? '',
      userId: navContext.userId ?? '',
      policyID: navContext.policyId ?? 0,
      nodeKey: navContext.nodeKey ?? '',
      action: navContext.action ?? '',
      xmlDetail: xmlDetailString,
      tab: navContext.tab?.toString() ?? '',
    });
    if (!cyclingResult.status || !cyclingResult.data) {
      logger.error('Cycling API failed', undefined, {
        error: cyclingResult.error,
        action: navContext.action,
      });
      return {
        success: false,
        updatedContext: navContext,
        frameAction: { type: 'continue' },
        error: cyclingResult.error ?? 'Cycling API call failed',
        hasRecursiveNavigation: false,
        browserCommands: [],
        actionType: 'CONTINUE_TO_LOADER',
      };
    }

    const { data, browserCommands } = cyclingResult;

    logger.debug('Cycling API success', {
      url: data.url,
      frame: data.frame,
      fileName: data.FileName,
      statusCode: data.statusCode,
      commandCount: browserCommands?.length ?? 0,
      hasXmlFileName: !!(data.xmlFileName && data.xmlFileName.trim()),
      hasXmlFilePath: !!(data.xmlFilePath && data.xmlFilePath.trim()),
    });
    // Step 2: Extract FileName with priority fallback
    // CRITICAL: This is the missing piece from the original implementation!
    // Priority 1: Use data.FileName directly (most reliable)
    // Priority 2: Extract from data.url if FileName is empty
    // Priority 3: null if neither available
    let fileName: string | undefined;
    let reactRoute: string | undefined;
    if (data.FileName && data.FileName.trim() !== '') {
      // Priority 1: Use FileName field directly
      fileName = data.FileName.trim();
      logger.info('FileName extracted from response.FileName', { fileName });
    } else if (data.url && isAspUrl(data.url)) {
      // Priority 2: Extract from URL
      fileName = extractAspFileName(data.url);
      logger.info('FileName extracted from response.url', {
        url: data.url,
        fileName,
      });
    } else {
      logger.warn('No FileName found in response', {
        url: data.url,
        hasFileName: !!data.FileName,
        hasUrl: !!data.url,
      });
    }
    // Step 3: Convert ASP filename to React route
    if (fileName) {
      reactRoute = aspToReactRoute(fileName);
      logger.info('ASP filename converted to React route', {
        fileName,
        reactRoute,
      });
    }
    // Build full route URL with canonical query params
    // CRITICAL: data.queryString may be a full ASP URL (e.g., "../../system/asp/File.asp?A=1&B=2")
    // extractCanonicalParams safely strips the path prefix and extracts only known params
    const canonicalParams = extractCanonicalParams(data.queryString, data.frame);
    if (Object.keys(canonicalParams).length > 0) {
      reactRoute = buildReactRouteUrl(fileName, data.frame, canonicalParams);
      logger.debug('Route URL built with canonical params', {
        fileName,
        reactRoute,
        rawQueryString: data.queryString,
        canonicalParams,
      });
    } else if (data.frame) {
      // Even without query params, include frame in route
      reactRoute = buildReactRouteUrl(fileName, data.frame);
    }

    // Step 4: Check for NAVIGATE_CYCLING command (recursive navigation)
    const navigateCyclingCommand = browserCommands?.find(
      (cmd) => cmd.verb === 'NAVIGATE_CYCLING',
    );
    const commandsFromResponse = browserCommands ?? [];

    if (navigateCyclingCommand) {
      logger.info('NAVIGATE_CYCLING command detected - will trigger recursive navigation', {
        noun: navigateCyclingCommand.noun,
        currentDepth: navigationDepth,
      });
      // CRITICAL: Do not filter NAVIGATE_CYCLING here.
      // BrowserCommandsProvider must receive and execute it via handleNavigateCycling().
    }
    // Step 5: Extract xmlDetail from queryString (source of truth)
    // CRITICAL: Backend team confirmed XMLDETAIL parameter always contains correct data
    // data.xmlDetail can be stale (menu-shaped from previous action)
    // Legacy VBScript updates mstrXMLDetail from queryString after every ExecuteAction
    let extractedXmlDetail: string | unknown | null = data.xmlDetail; // Default fallback

    if (data.queryString) {
      try {
        // Parse queryString to extract XMLDETAIL parameter
        const queryParams = new URLSearchParams(
          data.queryString.split('?')[1] || data.queryString,
        );
        const xmlDetailParam = queryParams.get('XMLDETAIL');

        if (xmlDetailParam) {
          // Decode the XML string
          const decodedXml = decodeURIComponent(xmlDetailParam);

          // Parse XML string to object structure expected by PageBuild
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(decodedXml, 'text/xml');
          const items = xmlDoc.getElementsByTagName('item');

          if (items.length > 0) {
            const itemArray: Array<{ '@name': string; '@value': string }> = [];
            for (let i = 0; i < items.length; i++) {
              const item = items[i];
              const name = item.getAttribute('name') || '';
              const value = item.getAttribute('value') || '';
              itemArray.push({ '@name': name, '@value': value });
            }

            // Build xmlDetail object with items.item[] structure
            extractedXmlDetail = {
              items: {
                item: itemArray,
              },
            };
            logger.debug('xmlDetail extracted from queryString', {
              itemCount: itemArray.length,
            });
          }
        }
      } catch (error) {
        logger.error('Failed to extract xmlDetail from queryString', error as Error);
        // Fall back to data.xmlDetail
      }
    }
    // Step 5.5: Extract ALL canonical parameters from queryString
    // CRITICAL: Server cycling component modifies session values (especially action)
    // and returns them in querystring. This is the SOURCE OF TRUTH for next action.
    // Legacy pattern: Each page reads Request.QueryString("Action") on load

    const extractedParams = parseQueryStringParams(data.queryString);

    logger.debug('Extracted parameters from cycling queryString', {
      queryString: data.queryString,
      extractedParams,
      originalAction: navContext.action,
      updatedAction: extractedParams.action,
    });

    // Merge extracted params into context (queryString params override current context)
    // This ensures action, policyId, nodeKey etc. are updated from server response
    const contextWithUpdatedParams = mergeParamsToContext(navContext, extractedParams);

    // Step 6: Build updated navigation context
    const isMenuAction = navContext.action === 'MENU';
    const menuQueryString = getMenuQueryString(navContext.menuData);
    const menuPolicyId = getPolicyIdFromQueryString(menuQueryString);
    const currentPolicyId = contextWithUpdatedParams.policyId;

    const shouldRefreshMenuForPolicyChange =
      !isMenuAction &&
      !!currentPolicyId &&
      !!contextWithUpdatedParams.userId &&
      !!contextWithUpdatedParams.compLoc &&
      !!contextWithUpdatedParams.nodeKey &&
      navContext.menuLoaded === true &&
      (!menuPolicyId || menuPolicyId !== currentPolicyId);

    let refreshedMenuData: PageNavigationResponse | undefined;

    if (shouldRefreshMenuForPolicyChange) {
      logger.info('Policy changed, refreshing MENU before final context merge', {
        policyId: currentPolicyId,
        previousMenuPolicyId: menuPolicyId,
        previousMenuQueryString: menuQueryString,
      });

      const menuRefreshResult = await navigation({
        compLoc: contextWithUpdatedParams.compLoc ?? '',
        userId: contextWithUpdatedParams.userId ?? '',
        policyID: currentPolicyId,
        nodeKey: contextWithUpdatedParams.nodeKey ?? '',
        action: 'MENU',
        xmlDetail: '<items />',
        tab: contextWithUpdatedParams.tab?.toString() ?? '',
      });

      if (menuRefreshResult.status && menuRefreshResult.data) {
        refreshedMenuData = menuRefreshResult.data;
        logger.info('MENU refreshed for updated policy', {
          policyId: currentPolicyId,
          menuCount: extractMenus(menuRefreshResult.data).length,
          queryString: menuRefreshResult.data.queryString,
        });
      } else {
        logger.warn('MENU refresh failed for updated policy', {
          policyId: currentPolicyId,
          error: menuRefreshResult.error,
        });
      }
    }
    // Use contextWithUpdatedParams (includes action, policyId, etc. from queryString)
    // instead of navContext, so server-updated values are preserved
    const updatedContext = mergeNavigationContext(contextWithUpdatedParams, {
      url: data.url,
      frame: data.frame as FrameType | null,
      queryString: data.queryString,
      // CRITICAL: Use fileName as fallback if xmlFileName is missing
      // Some routes (e.g., LOB action menus) may not return xmlFileName in cycling response
      // but we can derive it from the extracted FileName field
      xmlFileName: data.xmlFileName || fileName || undefined,
      xmlFilePath: data.xmlFilePath || (fileName ? `⟪?⟫/${fileName}` : undefined),
      tabFileName: data.tabFileName ?? data.TabFileName,
      tabFilePath: data.tabFilePath ?? data.TabFilePath,
      xmlListFileName: data.xmlListFileName ?? data.XMLListFileName,
      xmlListFilePath: data.xmlListFilePath ?? data.XMLListFilePath ?? data.XMLListFile⟪?⟫,
      statusCode: data.statusCode,
      browserCommands: commandsFromResponse,
      cyclingCalled: true,
      navigationDepth,
      reactRoute,
// TODO ⟪missing lines 532-536 — not captured in photos⟫
      fileName,
      // CRITICAL: Preserve menu state across non-MENU actions so header menus remain available
      menuData: isMenuAction ? data : (refreshedMenuData ?? navContext.menuData),
      menuLoaded: isMenuAction || !!refreshedMenuData ? true : navContext.menuLoaded,
    });

    // Log xmlFileName resolution for debugging LOB action menu issues
    if (!data.xmlFileName && fileName) {
      logger.info('xmlFileName not in response - using fileName as fallback', {
        fileName,
        derivedXmlFilePath: `.../${fileName}`,
      });
    }
    const menuDataToPersist = isMenuAction ? data : refreshedMenuData;

    if (menuDataToPersist && updatedContext.userId && updatedContext.compLoc) {
      setMenuData(updatedContext.userId, updatedContext.compLoc, {
        menus: extractMenus(menuDataToPersist),
        queryString: menuDataToPersist.queryString || '',
      });

      logger.info('Menu data stored in context', {
        hasMenuData: !!updatedContext.menuData,
        menuLoaded: updatedContext.menuLoaded,
        menuCount: extractMenus(menuDataToPersist).length,
        queryString: menuDataToPersist.queryString,
      });
    }
    logger.info('Navigation context updated', {
      fileName,
      reactRoute,
      url: data.url,
      frame: data.frame,
      action: navContext.action,
      commandCount: commandsFromResponse.length,
      hasNavigateCycling: !!navigateCyclingCommand,
      navigationDepth,
      menuStored: isMenuAction || !!refreshedMenuData,
    });
    // Step 6.5: Sync updated context to sessionStorage
    // Provides backup for page reload and new window initialization
    // sessionStorage is window-scoped, so each window maintains its own storage
    // ALSO syncs to localStorage.sessionInformation for backward compatibility
    syncContextToStorage(updatedContext);

    logger.debug('✅ Context synced to storage (both new and legacy keys)', {
      action: updatedContext.action,
      policyId: updatedContext.policyId,
      sessionStorageKey: 'aqs:navigation:context',
      localStorageKey: 'sessionInformation',
    });

    // Step 7: Determine frame-based routing action
    const frameAction = routeByFrame({
      frame: data.frame,
      url: data.url,
      width: data.width,
      height: data.height,
      queryString: data.queryString,
      deferred: updatedContext.deferred,
      currentUrl,
    });

    logger.debug('Frame action determined', {
      type: frameAction.type,
      url: frameAction.url,
      shouldRefresh: frameAction.shouldRefresh,
    });

    // Override frame action URL with React route if available
    // This ensures we navigate to React routes, not ASP URLs
    if (reactRoute && frameAction.url) {
      const originalUrl = frameAction.url;
      frameAction.url = reactRoute;
      logger.info('Frame action URL overridden with React route', {
        originalUrl,
        reactRoute,
      });
    }

    // Step 8: Determine high-level action type based on frame
    // This centralizes frame routing logic (matches legacy VBScript ExecuteAction pattern)
    // See Main_ISLLSYS_20010101.vbs line 1633 for legacy switch statement
    let actionType: ActionType = 'CONTINUE_TO_LOADER';
    let modalUrl: string | undefined;

    const frameUpper = data.frame?.toUpperCase();

    switch (frameUpper) {
      case 'MODAL': {
        actionType = 'STORE_MODAL_CMD';

        // Store modal command in context (like NEWWINDOW)
        // xmlDetail already extracted from queryString above (Step 5)
        updatedContext.modalCommand = {
          url: frameAction.url!,
          frame: 'modal',
          width: frameAction.width || '600',
          height: frameAction.height || '500',
          queryString: frameAction.queryString,
          xmlDetail: extractedXmlDetail, // Use extracted xmlDetail from Step 5
          xmlFileName: data.xmlFileName,
          xmlFilePath: data.xmlFilePath,
          browserCommands: commandsFromResponse,
        };

        logger.info('Frame routing: MODAL detected', {
          actionType,
          url: frameAction.url,
// TODO ⟪missing lines 647-648 — not captured in photos⟫
        });
        break;
      }
      case 'NEWWINDOW': {
        const targetUrl = frameAction.url;
        const popupContext = isPopupWindowContext();
        const guardState = readNewWindowGuardState();
        const isGuardFresh =
          !!guardState && Date.now() - guardState.createdAt <= NEW_WINDOW_GUARD_TTL_MS;
        const currentPathAndSearch =
          typeof window !== 'undefined'
            ? `${window.location.pathname}${window.location.search}`
            : '';
        const sessionGuardMatched =
          !!targetUrl &&
          isGuardFresh &&
          !!guardState &&
          (guardState.targetUrl === targetUrl ||
            guardState.targetUrl === currentPathAndSearch);

        if (popupContext || sessionGuardMatched) {
          actionType = 'CONTINUE_TO_LOADER';
          updatedContext.windowCommand = undefined;
          logger.warn('Frame routing: NEWWINDOW prevented to avoid popup loop', {
            targetUrl,
            popupContext,
            sessionGuardMatched,
            currentPathAndSearch,
            guardTargetUrl: guardState?.targetUrl,
            guardAgeMs: guardState ? Date.now() - guardState.createdAt : undefined,
          });
          break;
        }

        // NEWWINDOW frame - store command in context for component to handle
        actionType = 'STORE_WINDOW_CMD';

        // DON'T write guard state here yet - targetUrl has OLD action values at this point
        // Will write guard state AFTER followupAction is determined with correct values

        // CRITICAL: Use updatedContext.action (extracted from querystring) not navContext.action
        // The cycling API updates the action in querystring (e.g., STARTOPTIONS|OK -> RATELEVEL)
        // and that's what should be passed to the new window
        const currentActionFromServer = updatedContext.action || '';

        logger.debug('[NEWWINDOW] Determining followup action', {
          originalAction: navContext.action,
          serverUpdatedAction: currentActionFromServer,
          note: 'Using server-updated action from querystring',
        });

        // CRITICAL FIX: Extract BASE action for postWindowAction lookup - need to lookup config using base "STARTOPTIONS"
        // Compound actions like "STARTOPTIONS|OK" need to lookup config using base action, not the compound action
        // because postWindowAction is configured on the base action, not the compound action
        let baseAction = currentActionFromServer;
        if (currentActionFromServer.includes('|')) {
          const parts = currentActionFromServer.split('|');
          baseAction = parts[0]; // Extract "STARTOPTIONS" from "STARTOPTIONS|OK"
          logger.debug(
            '[NEWWINDOW] Compound action detected, using base for config lookup',
            {
              compoundAction: currentActionFromServer,
              baseAction,
            },
          );
        }

        // Check if BASE action has postWindowAction configured
        const actionConfig = getActionConfig(baseAction);
        const postWindowConfig = actionConfig.postWindowAction;

        logger.debug('[NEWWINDOW] Checking for postWindowAction', {
          currentAction: currentActionFromServer,
          baseAction,
          hasPostWindowConfig: !!postWindowConfig,
          postWindowActionName: postWindowConfig?.action,
        });
        let followupAction: FollowupActionConfig | undefined;

        if (postWindowConfig) {
          // Use current session xmlDetail from navigation context
          // This is dynamically updated by cycling API responses and contains
          // current session state (datachanged, policystatus, transactionid, etc.)
          const xmlDetail =
            postWindowConfig.useSessionXmlDetail !== false
              ? updatedContext.xmlDetail || '<items />'
              : '<items />';

          const xmlDetailString = toLegacyXmlDetailString(xmlDetail, '<items />');

          followupAction = {
            action: postWindowConfig.action,
            nodeKey: updatedContext.nodeKey || 'POL|POL|0',
            policyId: '{{DYNAMIC}}', // Placeholder - resolved at runtime from GlobalVariableStore
            xmlDetail: xmlDetailString,
            delay: postWindowConfig.delay,
          };
          logger.info('[NEWWINDOW] Post-window action configured from action-config', {
            sourceAction: currentActionFromServer,
            followupAction: postWindowConfig.action,
            usesSessionXmlDetail: postWindowConfig.useSessionXmlDetail !== false,
            xmlDetailType: typeof xmlDetail,
            xmlDetailLength:
              typeof xmlDetailString === 'string' ? xmlDetailString.length : 0,
            delay: postWindowConfig.delay,
          });
        } else {
          // NO postWindowAction config - use the server-updated action directly
          // This is the default behavior: pass through whatever action the server returned
          const xmlDetail = updatedContext.xmlDetail || '<items />';
          const xmlDetailString = toLegacyXmlDetailString(xmlDetail, '<items />');
          followupAction = {
            action: currentActionFromServer,
            nodeKey: updatedContext.nodeKey || 'POL|POL|0',
            policyId: updatedContext.policyId || '0',
            xmlDetail: xmlDetailString,
          };
          logger.info(
            '[NEWWINDOW] Using server-updated action (no postWindowAction config)',
            {
              serverUpdatedAction: currentActionFromServer,
              originalAction: navContext.action,
              note: 'Passing through action from cycling API querystring',
            },
          );
        }
        // Update context with window command
        // CRITICAL: Do NOT forward raw frameAction.queryString — the reactRoute
        // (frameAction.url after override) already contains all canonical params.
        // Leaking the raw server queryString here caused malformed popup URLs.

        // Build correct guard URL using followupAction parameters (not old targetUrl)
        // This ensures guard state matches the actual URL that will be opened
        let guardUrl = targetUrl!; // Fallback to original
        if (followupAction && targetUrl) {
          try {
            // Extract ASP filename from targetUrl
            let aspFileName = '';
            const urlParts = targetUrl.split('?')[0].split('/').filter(Boolean);
            if (urlParts[0] === 'form' && urlParts[1]) {
              aspFileName = urlParts[1];
            } else {
              aspFileName = urlParts[urlParts.length - 1] || '';
            }
          } else {
            // Build query params using followupAction values (has correct action from server)
            const guardQueryParams = new URLSearchParams();
            guardQueryParams.set('action', followupAction.action);
            guardQueryParams.set('nodeKey', followupAction.nodeKey || 'POL|POL|0');
            guardQueryParams.set('policyId', followupAction.policyId || '0');

            // Build correct URL with updated action
            guardUrl = aspFileName
              ? `/form/${aspFileName}/${followupAction.policyId || '0'}?${guardQueryParams.toString()}`
              : targetUrl;
            logger.debug('[NEWWINDOW] Built guard URL with followupAction', {
              originalTargetUrl: targetUrl,
              guardUrl,
              followupActionValues: {
                action: followupAction.action,
                policyId: followupAction.policyId,
                nodeKey: followupAction.nodeKey,
              },
            });
          } catch (err) {
            logger.warn('[NEWWINDOW] Failed to build guard URL, using original', {
              error: err,
              fallbackUrl: targetUrl,
            });
          }
        }
        // Write guard state with CORRECT URL (has updated action from followupAction)
        if (guardUrl) {
          writeNewWindowGuardState(guardUrl);
          logger.debug('[NEWWINDOW] Guard state written', { guardUrl });
        }
        updatedContext.windowCommand = {
          url: targetUrl!,
          frame: 'newwindow',
          width: frameAction.width,
          height: frameAction.height,
          // queryString intentionally omitted — params are already in url
          followupAction, // NEW: Include followup configuration
        };

        logger.info('Frame routing: NEWWINDOW detected', {
          actionType,
          url: targetUrl,
          width: frameAction.width,
          height: frameAction.height,
          hasFollowup: !!followupAction,
          followupActionDetails: followupAction
            ? {
                action: followupAction.action,
                nodeKey: followupAction.nodeKey,
                policyId: followupAction.policyId,
              }
            : null,
        });
        break;
      }
      case 'HIDDEN': {
        // HIDDEN frame - no navigation, just execute commands
        actionType = 'COMMANDS_ONLY';
        logger.info('Frame routing: HIDDEN detected', {
          actionType,
          commandCount: commandsFromResponse.length,
        });
        break;
      }
      case 'MAIN':
      default: {
        // MAIN or unspecified frame - continue to loaders normally
        actionType = 'CONTINUE_TO_LOADER';

        logger.debug('Frame routing: MAIN/default detected', {
          actionType,
          frame: data.frame,
          reactRoute,
        });
        break;
      }
    }

    return {
      success: true,
      updatedContext,
      frameAction,
      responseData: data,
      fileName,
      reactRoute,
      hasRecursiveNavigation: !!navigateCyclingCommand,
      browserCommands: commandsFromResponse,
      actionType,
      modalUrl,
    };
  } catch (error) {
    logger.error('ExecuteAction failed with exception', error as Error, {
      action: navContext.action,
      nodeKey: navContext.nodeKey,
      depth: navigationDepth,
    });
    return {
      success: false,
      updatedContext: navContext,
      frameAction: { type: 'continue' },
      error: error instanceof Error ? error.message : 'Unknown error',
      hasRecursiveNavigation: false,
      browserCommands: [],
      actionType: 'CONTINUE_TO_LOADER',
    };
  }
}

/**
 * Helper: Validate ExecuteAction parameters
 *
 * Ensures required context values are present before calling cycling API.
 *
 * @param context - Navigation context to validate
 * @returns Validation result
 */
export function validateExecuteActionParams(context: NavigationContextValue): {
  valid: boolean;
  error?: string;
} {
  if (!context.action) {
    return { valid: false, error: 'Action is required' };
  }
  if (!context.userId) {
    return { valid: false, error: 'UserId is required' };
  }

  if (!context.compLoc) {
    return { valid: false, error: 'CompLoc is required' };
  }

  return { valid: true };
}

/**
 * Helper: Check if ExecuteAction should be called
 *
 * Determines if cycling API call is needed based on context state.
 * Prevents duplicate calls and handles edge cases.
 *
 * @param context - Navigation context
 * @returns Whether to call executeAction
 */
export function shouldExecuteAction(context: NavigationContextValue): boolean {
  // Don't call if already called
  if (context.cyclingCalled) {
    return false;
  }

  // Don't call if no action specified
  if (!context.action) {
    return false;
  }

  // Don't call if deferred (modal chain)
  if (context.deferred) {
    return false;
  }

  return true;
}
