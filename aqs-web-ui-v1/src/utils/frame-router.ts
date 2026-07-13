/**
 * @file frame-router.ts
 * @description Frame-based routing utility for ExecuteAction pattern
 *
 * Maps legacy frame types (MODAL, NEWWINDOW, MAIN, HIDDEN, LOB) to React Router actions.
 * This replicates the frame-based routing logic from legacy ExecuteAction.
 *
 * @example
 * ```tsx
 * // In dataStrategy:
 * const action = routeByFrame({
 *   frame: 'MODAL',
 *   url: '/policy-details',
 *   width: '800',
 *   height: '600',
 *   queryString: '?policyId=123',
 * });
 *
 * if (action.type === 'redirect') {
 *   return redirect(action.url);
 * }
 * ```
 */

import { isSameRoute } from '@utils/url-helpers';
import { createFeatureLogger } from '@utils/logger-builder';
import type { FrameType } from '@/types';


// Create logger for frame routing
const logger = createFeatureLogger('routing', 'frame-router');

// ------------------------------------

/**
 * Frame routing action types
 */
export type FrameActionType =
    | 'redirect'   // Navigate to a new route
    | 'modal'      // Open as modal dialog
    | 'newwindow'  // Open in new browser window
    | 'hidden'     // Execute commands only, no navigation
    | 'continue'   // Continue to loaders normally
    | 'inline';    // Render inline (same page)

/**
 * Frame routing action result
 */
export interface FrameAction {
    /** Action type to perform */
    type: FrameActionType;

    /** Target URL (for redirect, modal, newwindow) */
    url?: string;

    /** Window/modal dimensions */
    width?: string;
    height?: string;

    /** Query parameters */
    queryString?: string;

    /** Whether navigation is to same route (triggers refresh vs reload) */
    shouldRefresh?: boolean;

    /** Additional metadata */
    metadata?: Record<string, unknown>;
}

/**
 * Parameters for frame-based routing
 */
export interface FrameRouteParams {
    /** Frame type from server response */
    frame?: string | FrameType | null;

    /** Target URL */
    url?: string;

    /** Current URL (for same-route detection) */
    currentUrl?: string;

    /** Window width */
    width?: string;

    /** Window height */
    height?: string;

    /** Query string */
    queryString?: string;

    /** Whether navigation is deferred (for modal chains) */
    deferred?: boolean;

    /** Additional routing metadata */
    metadata?: Record<string, unknown>;
}

/**
 * Map frame type to routing action
 *
 * Replicates legacy ExecuteAction frame routing logic:
 * - MODAL → Open in modal dialog (redirect to /modal-renderer)
 * - NEWWINDOW → Open in new browser window
 * - MAIN → Navigate normally
 * - HIDDEN → Execute commands only, no navigation
 * - LOB → Line of business frame (inline)
 * - INLINE → Render in current page
 *
 * @param params - Frame routing parameters
 * @returns Frame action to perform
 *
 * @example
 * ```tsx
 * const action = routeByFrame({
 *   frame: 'MODAL',
 *   url: '/policy-details',
 *   width: '800',
 *   height: '600',
 * });
 *
 * if (action.type === 'modal') {
 *   return redirect(`/modal-renderer?url=${encodeURIComponent(action.url!)}`);
 * }
 * ...
 */
export function routeByFrame(params: FrameRouteParams): FrameAction {
    const { frame, url, currentUrl, width, height, queryString, deferred, metadata } = params;

    logger.debug('Routing by frame', { frame, url, currentUrl, deferred });

    // Frame convention: normalize to uppercase ('MAIN', 'MODAL', 'NEWWINDOW', etc.)
    // because legacy ExecuteAction/frame-switch logic and backend responses use
    // uppercase frame tokens; this keeps routing deterministic across mixed casing.
    const frameUpper = frame?.toString().toUpperCase();

    // Check if navigating to same route (for refresh vs reload logic)
    const shouldRefresh = currentUrl && url ? isSameRoute(currentUrl, url) : false;

    // Default action if no frame specified
    if (!frameUpper) {
        logger.debug('No frame specified, continuing to loaders');
        return {
            type: 'continue',
            url,
            queryString,
            shouldRefresh,
            metadata,
        };
    }

    // Handle each frame type
    switch (frameUpper) {
        case 'MODAL': {
            // Modal dialogs - redirect to modal renderer
            const action: FrameAction = {
                type: 'modal',
                url: url ?? '',
                width: width ?? '600',
                height: height ?? '400',
                queryString,
                shouldRefresh,
                metadata: {
                    ...metadata,
                    deferred,
                },
            };
            logger.info('Routing to modal', {
                url: action.url,
                width: action.width,
                height: action.height,
            });
            return action;
        }

        case 'NEWWINDOW':
        case 'NEW_WINDOW': {
            // New browser window
            const action: FrameAction = {
                type: 'newwindow',
                url: url ?? '',
                width: width ?? '800',
                height: height ?? '600',
                queryString,
                shouldRefresh,
                metadata,
            };
            logger.info('Routing to new window', {
                url: action.url,
                width: action.width,
                height: action.height,
            });
            return action;
        }

        case 'HIDDEN': {
            // Hidden frame - execute commands only
            logger.info('Hidden frame - commands only, no navigation');
            return {
                type: 'hidden',
                metadata,
            };
        }

        case 'MAIN':
        case 'MAINFRAME': {
            // Main frame - normal navigation
            logger.info('Routing to main frame', { url, shouldRefresh });
            return {
                type: 'redirect',
                url: url ?? '',
                queryString,
                shouldRefresh,
                metadata,
            };
        }
        case 'LOB':
        case 'LINE_OF_BUSINESS': {
            // Line of business frame - render inline
            logger.info('Routing to LOB frame (inline)', { url });
            return {
                type: 'inline',
                url: url ?? '',
                queryString,
                shouldRefresh,
                metadata,
            };
        }

        case 'INLINE': {
            // Inline rendering
            logger.info('Routing to inline frame', { url });
            return {
                type: 'inline',
                url: url ?? '',
                queryString,
                shouldRefresh,
                metadata,
            };
        }

        default:
            // Unknown frame type - log warning and continue
            logger.warn('Unknown frame type, continuing to loaders', { frameType: frameUpper });
            return {
                type: 'continue',
                url,
                queryString,
                shouldRefresh,
                metadata: {
                    ...metadata,
                    unknownFrame: frameUpper,
                },
            };
    }
}

/**
 * Build modal renderer URL
 *
 * Creates the URL for the modal renderer route with proper encoding.
 *
 * @param url - Target URL to render in modal
 * @param width - Modal width (default: 600)
 * @param height - Modal height (default: 400)
 * @param queryString - Additional query parameters
 * @returns Encoded modal renderer URL
 *
 * @example
 * ```tsx
 * const modalUrl = buildModalUrl('/policy-details', '800', '600', '?policyId=123');
 * // Returns: /modal-renderer?url=%2Fpolicy-details&width=800&height=600&query=%3FpolicyId%3D123
 * ```
 */
export function buildModalUrl(
    url: string,
    width: string = '600',
    height: string = '400',
    queryString?: string,
): string {
    const params = new URLSearchParams();
    params.set('url', url);
    params.set('width', width);
    params.set('height', height);

    if (queryString) {
        params.set('query', queryString);
    }

    return `/modal-renderer?${params.toString()}`;
}

/**
 * Build new window URL with query parameters
 *
 * @param url - Target URL
 * @param queryString - Query parameters to append
 * @returns Full URL with query string
 *
 * @example
 * ```tsx
 * const fullUrl = buildWindowUrl('/policy-details', '?policyId=123');
 * // Returns: /policy-details?policyId=123
 * ```
 */
export function buildWindowUrl(url: string, queryString?: string): string {
    if (!queryString) {
        return url;
    }

    // Remove leading ? if present
    const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;

    // Check if URL already has query params
    const separator = url.includes('?') ? '&' : '?';

    return `${url}${separator}${query}`;
}

/**
 * Open URL in new window with specified dimensions
 *
 * @param url - Target URL
 * @param width - Window width (default: 800)
 * @param height - Window height (default: 600)
 * @param name - Window name (default: '_blank')
 * @returns Window reference or null if blocked
 *
 * @example
 * ```tsx
 * openNewWindow('/policy-details?id=123', '1024', '768');
 * ```
 */
export function openNewWindow(
    url: string,
    width: string = '800',
    height: string = '600',
    name: string = '_blank',
): Window | null {
    // Calculate center position
    const left = (window.screen.width - parseInt(width, 10)) / 2;
    const top = (window.screen.height - parseInt(height, 10)) / 2;

    const features = [
        `width=${width}`,
        `height=${height}`,
        `left=${left}`,
        `top=${top}`,
        'resizable=yes',
        'scrollbars=yes',
        'status=yes',
        'toolbar=no',
        'menubar=no',
        'location=no',
    ].join(',');

    try {
        const newWindow = window.open(url, name, features);

        if (!newWindow) {
            logger.warn('Popup blocked by browser', { url, name });
            return null;
        }

        // Focus the new window
        newWindow.focus();

        return newWindow;
    } catch (error) {
        logger.error('Failed to open new window', error as Error, { url, name });
        return null;
    }
}

/**
 * Check if frame type requires modal rendering
 *
 * @param frame - Frame type to check
 * @returns True if frame should open as modal
 */
export function isModalFrame(frame?: string | FrameType | null): boolean {
    return frame?.toString().toUpperCase() === 'MODAL';
}

/**
 * Check if frame type requires new window
 *
 * @param frame - Frame type to check
 * @returns True if frame should open in new window
 */
export function isNewWindowFrame(frame?: string | FrameType | null): boolean {
    const frameUpper = frame?.toString().toUpperCase();
    return frameUpper === 'NEWWINDOW' || frameUpper === 'NEW_WINDOW';
}

/**
 * Check if frame type is hidden (commands only)
 *
 * @param frame - Frame type to check
 * @returns True if frame is hidden
 */
export function isHiddenFrame(frame?: string | FrameType | null): boolean {
    return frame?.toString().toUpperCase() === 'HIDDEN';
}
