/**
 * @file use-smart-navigation.ts
 * @description Smart navigation hook that optimizes same-route navigation
 *
 * Provides an intelligent wrapper around React Router's useNavigate that:
 * - Detects when navigating to the same route (different query params)
 * - Uses revalidation instead of full navigation for same-route cases
 * - Integrates with navigationContext for state management
 * - Preserves query parameters and navigation state
 *
 * This is critical for the "refresh vs reload" pattern where:
 * - Same route with different params = Revalidate (refresh data)
 * - Different route = Navigate (full page transition)
 *
 * @example
 * ```tsx
 * function PolicyList() {
 *   const smartNavigate = useSmartNavigation();
 *
 *   const viewPolicy = (policyId: string) => {
 *     // If already on /policy-details, this triggers revalidation
 *     // If on a different route, this navigates normally
 *     smartNavigate('/policy-details', {
 *       action: 'VIEW',
 *       nodeKey: policyId,
 *       frame: 'inline'
 *     });
 *   };
 * }
 * ```
 */

import { useCallback } from 'react';
import { useNavigate, useRevalidator, useLocation } from 'react-router';

// context
import type { NavigationContextValue } from '@/context';
import type { ActionType, FrameType } from '@/types';

// utils
import { isSameRoute, extractRouteInfo } from '@utils/url-helpers';
import { setPendingXmlDetail } from '@utils/xml-detail-persistence';
import { getItem, setItem } from '@utils/local-storage';

// ----------------------------------------

/**
 * Navigation options for smartNavigate
 */
export interface SmartNavigateOptions {
  /** Action type (MAIN, START, MENU, etc.) */
  action?: ActionType | null;

  /** Node key for tree navigation */
  nodeKey?: string | null;

  /** Frame type (modal, newwindow, inline) */
  frame?: FrameType | Uppercase<FrameType> | null;

  /** Tab index */
  tab?: number | null;

  /** XML detail string */
  xmlDetail?: string | null;

  /** User ID */
  userId?: string | null;

  /** Company location */
  compLoc?: string | null;

  /** Policy ID */
  policyId?: string | null;

  /** Additional query parameters to append */
  queryParams?: Record<string, string>;

  /** Force navigation even if on same route (default: false) */
  forceNavigate?: boolean;

  /** Replace current history entry instead of push (default: false) */
  replace?: boolean;

  /** React Router state object */
  state?: unknown;
}

type LocationStateRecord = Record<string, unknown>;

const isLocationStateRecord = (value: unknown): value is LocationStateRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const mergeLocationState = (
  currentState: unknown,
  nextState: unknown,
  xmlDetail: string | null | undefined
): unknown => {
  const current = isLocationStateRecord(currentState) ? currentState : {};
  const next = isLocationStateRecord(nextState) ? nextState : {};

  const merged: LocationStateRecord = {
    ...current,
    ...next,
  };

  if (typeof xmlDetail === 'string') {
    merged.xmlDetail = xmlDetail;
  }

  if (Object.keys(merged).length > 0) {
    return merged;
  }
  return nextState ?? currentState;
};

/**
 * Smart navigate function signature
 */
export type SmartNavigateFunction = (to: string | number, options?: SmartNavigateOptions) => void;

/**
 * Hook return type
 */
export interface UseSmartNavigationReturn {
  /** Smart navigate function that chooses between navigate and revalidate */
  smartNavigate: SmartNavigateFunction;

  /** Whether currently on the same route as the last navigation */
  isSameRoute: boolean;

  /** Revalidate current route (useful for manual refresh) */
  revalidate: () => void;
}

/**
 * Smart navigation hook that optimizes same-route navigation
 *
 * Wraps React Router's useNavigate with intelligent logic:
 * - If navigating to same route (different params): revalidates loaders
 * - If navigating to different route: performs normal navigation
 * - If forceNavigate=true: always navigates regardless of route
 *
 * Query parameters are automatically constructed from navigation options
 * (action, nodeKey, frame, etc.) following the legacy ExecuteAction pattern.
 *
 * @returns Smart navigation utilities
 *
 * @example
 * ```tsx
 * function Dashboard() {
 *   const { smartNavigate, revalidate } = useSmartNavigation();
 *
 *   const openPolicy = (id: string) => {
 *     smartNavigate('/policy-details', {
 *       action: 'MAIN',
 *       nodeKey: id,
 *       frame: 'inline'
 *     });
 *   };
 *
 *   const refresh = () => {
 *     revalidate(); // Manually trigger revalidation
 *   };
 *
 *   return (
 *     <>
 *       <button onClick={() => openPolicy('POL123')}>View Policy</button>
 *       <button onClick={refresh}>Refresh</button>
 *     </>
 *   );
 * }
 * ```
 */
export function useSmartNavigation(): UseSmartNavigationReturn {
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const location = useLocation();

  const currentPath = location.pathname;

  /**
   * Constructs query string from navigation options
   */
  const buildQueryString = useCallback((options: SmartNavigateOptions): string => {
    const params = new URLSearchParams();

    // Add standard navigation context parameters
    // CRITICAL: Strip button code from action for legacy URL compatibility
    // Legacy URLs show base action only (e.g., "RATELEVEL" not "RATELEVEL|NEXT")
    if (options.action) {
      const baseAction = options.action.includes('|')
        ? options.action.split('|')[0]
        : options.action;
      params.set('action', baseAction);
    }
    if (options.nodeKey) params.set('nodeKey', options.nodeKey);
    if (options.frame) params.set('frame', options.frame);
    if (options.policyId) params.set('policyId', options.policyId);

    // Add any additional query parameters
    if (options.queryParams) {
      Object.entries(options.queryParams).forEach(([key, value]) => {
        params.set(key, value);
      });
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  }, []);

  /**
   * Smart navigate function
   */
  const smartNavigate = useCallback<SmartNavigateFunction>(
    (to, options = {}) => {
      // Handle numeric navigation (go back/forward)
      if (typeof to === 'number') {
        navigate(to);
        return;
      }
      const { forceNavigate = false, replace = false, state, ...navOptions } = options;
      const mergedState = mergeLocationState(location.state, state, navOptions.xmlDetail);

      // Build full URL with query parameters
      const queryString = buildQueryString(navOptions);
      const targetUrl = `${to}${queryString}`;

      if (typeof navOptions.xmlDetail === 'string') {
        setPendingXmlDetail(navOptions.xmlDetail, targetUrl);
      }

      // Update sessionInformation in localStorage with new action/nodeKey
      const sessionInfo = getItem<Record<string, unknown>>('sessionInformation');
      if (sessionInfo) {
        const updated = { ...sessionInfo };

        // Update action if provided
        if (navOptions.action) {
          updated.action = navOptions.action;
        }

        // Update nodeKey if provided
        // TODO ⟪missing lines 244-250 — not captured in photos⟫
        ⟪?⟫

        setItem('sessionInformation', updated);
      }

      // Extract route info for comparison
      const targetRoute = extractRouteInfo(to);
      const currentRoute = extractRouteInfo(currentPath);

      // Determine if this is same-route navigation
      const isSameRouteNavigation = isSameRoute(targetRoute.pathname, currentRoute.pathname);

      console.log('[SMART_NAVIGATE]', {
        to,
        action: navOptions.action,
        frame: navOptions.frame,
        isSameRoute: isSameRouteNavigation,
      });

      // Decision logic:
      // 1. If forceNavigate=true: always navigate
      // 2. If different route: navigate
      // 3. If same route: revalidate (unless forceNavigate)
      if (forceNavigate || !isSameRouteNavigation) {
        // Full navigation to different route or forced navigation
        navigate(targetUrl, { replace, state: mergedState });
      } else {
        // Same route, different params: just update URL
        // React Router will automatically trigger middleware and loaders
        // when URL query params change
        navigate(targetUrl, { replace, state: mergedState });
      }
    },
    [navigate, location.state, currentPath, buildQueryString],
  );

  /**
   * Manual revalidation function
   */
  const revalidate = useCallback(() => {
    revalidator.revalidate();
  }, [revalidator]);

  return {
    smartNavigate,
    isSameRoute: false, // Could track this with state if needed
    revalidate,
  };
}

/**
 * Helper function to extract navigation context from URL search params
 *
 * Parses React Router search params into NavigationContextValue.
 * Useful in loaders/actions to extract navigation state from URL.
 *
 * @param searchParams - URLSearchParams from React Router
 * @returns Partial navigation context
 *
 * @example
 * ```tsx
 * // In a loader
 * export async function policyLoader({ request }: LoaderFunctionArgs) {
 *   const url = new URL(request.url);
 *   const navContext = extractNavigationContext(url.searchParams);
 *
 *   // Use navContext.action, navContext.nodeKey, etc.
 *   const data = await fetchPolicy(navContext.nodeKey);
 *   return data(data);
 * }
 * ```
 */
export function extractNavigationContext(
    searchParams: URLSearchParams,
): Partial<NavigationContextValue> {
    const context: Partial<NavigationContextValue> = {
        action: searchParams.get('action') as ActionType | null,
        nodeKey: searchParams.get('nodeKey'),
        frame: searchParams.get('frame') as FrameType | null,
        tab: searchParams.has('tab') ? Number(searchParams.get('tab')) : null,
        xmlDetail: searchParams.get('xmlDetail'),
        userId: searchParams.get('userId'),
        compLoc: searchParams.get('compLoc'),
        policyId: searchParams.get('policyId'),
    };

    return context;
}
