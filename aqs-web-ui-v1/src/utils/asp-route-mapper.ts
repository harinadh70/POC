/**
 * @file asp-route-mapper.ts
 * @description Utilities for mapping ASP routes to React routes
 *
 * Handles conversion between legacy ASP filenames and modern React Router paths.
 * Integrates with ASP_Route_Map constant for custom mappings.
 *
 * @example
 * ```tsx
 * // Convert ASP filename to React route
 * const route = aspToReactRoute('Main_ISLLSYS_20010101.asp');
 * // Returns: '/Main_ISLLSYS_20010101'
 *
 * // Get component name
 * const component = getComponentNameFromAsp('Main_ISLLSYS_20010101.asp');
 * // Returns: 'Main_ISLLSYS_20010101'
 * ```
 */

import { ASP_Route_Map } from '@constants/asp-route-map';

/**
 * Match a filename against a pattern with wildcards
 *
 * @param filename - Filename to test
 * @param pattern - Pattern with * wildcards
 * @returns True if filename matches pattern
 *
 * @example
 * matchPattern('Pol_PIPHPOL_20160403.asp', 'Pol_PIPHPOL_*.asp') // true
 * matchPattern('ActMnu_ISLLPOL_Lob_20010101.asp', 'ActMnu_*_Lob_*.asp') // true
 */
function matchPattern(filename: string, pattern: string): boolean {
    // Escape special regex characters except *
    const escapedPattern = pattern
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*');

    const regex = new RegExp(`^${escapedPattern}$`, 'i');
    return regex.test(filename);
}

function findCustomRoute(aspFile: string): string | undefined {
    // 1. Try exact match first (case-insensitive)
    const direct = ASP_Route_Map[aspFile];
    if (direct) {
        return direct;
    }

    const lower = aspFile.toLowerCase();
    for (const [key, value] of Object.entries(ASP_Route_Map)) {
        if (key.toLowerCase() === lower) {
            return value;
        }
    }

    // 2. Try pattern matching (keys with wildcards)
    for (const [pattern, route] of Object.entries(ASP_Route_Map)) {
        if (pattern.includes('*') && matchPattern(aspFile, pattern)) {
            console.log('[ASP Route Mapper] Pattern match:', {
                fileName: aspFile,
                pattern,
                route,
            });
            return route;
        }
    }

    return undefined;
}

// ------------------------------------------

/**
 * Convert ASP filename to React route path
 *
 * Removes .asp extension and adds leading slash.
 * Checks ASP_Route_Map for custom mappings first.
 *
 * @param aspFile - ASP filename (e.g., 'Main_ISLLSYS_20010101.asp')
 * @returns React route path (e.g., '/Main_ISLLSYS_20010101')
 *
 * @example
 * ```tsx
 * aspToReactRoute('Main_ISLLSYS_20010101.asp')
 * // → '/Main_ISLLSYS_20010101'
 *
 * aspToReactRoute('Modal_ISLLSYS_20010101.asp')
 * // → '/Modal_ISLLSYS_20010101' (or custom mapped route)
 * ```
 */
export function aspToReactRoute(aspFile: string): string {
    const normalized = normalizeAspFileName(aspFile);
    // Remove .asp/.aspx extension
    const baseName = normalized.replace(/\.aspx?$/i, '');

    // Check if there's a custom mapping (includes pattern matching)
    const customRoute = findCustomRoute(normalized);
    if (customRoute) {
        // Custom mapping exists - use the mapped name
        console.log('[ASP Route Mapper] Mapped route:', {
            aspFile: normalized,
            reactRoute: `/${customRoute}`,
        });
        return `/${customRoute}`;
    }

    // Fallback: use the base name as route (convention-based)
    console.warn('[ASP Route Mapper] No mapping found, using convention-based route:', {
        aspFile: normalized,
        reactRoute: `/${baseName}`,
        hint: 'Add entry to ASP_Route_Map if this is incorrect',
    });
    return `/${baseName}`;
}

/**
 * Convert React route path to ASP filename
 *
 * Adds .asp extension to route path.
 * Handles both with and without leading slash.
 *
 * @param reactRoute - React route path (e.g., '/Main_ISLLSYS_20010101')
 * @returns ASP filename (e.g., 'Main_ISLLSYS_20010101.asp')
 *
 * @example
 * ```tsx
 * reactToAspRoute('/Main_ISLLSYS_20010101')
 * // → 'Main_ISLLSYS_20010101.asp'
 *
 * reactToAspRoute('Main_ISLLSYS_20010101')
 * // → 'Main_ISLLSYS_20010101.asp'
 * ```
 */
export function reactToAspRoute(reactRoute: string): string {
    // Remove leading slash if present
    const baseName = reactRoute.replace(/^\//, '');

    // Add .asp extension
    return `${baseName}.asp`;
}

/**
 * Get component name from ASP filename
 *
 * Uses ASP_Route_Map to get the mapped component name.
 * Falls back to ASP filename without extension if no mapping exists.
 *
 * @param aspFile - ASP filename
 * @returns Component name for dynamic import
 *
 * @example
 * ```tsx
 * getComponentNameFromAsp('Main_ISLLSYS_20010101.asp')
 * // → 'Main_ISLLSYS_20010101'
 *
 * getComponentNameFromAsp('Unknown_Page.asp')
 * // → 'Unknown_Page' (no mapping, uses filename)
 * ```
 */
export function getComponentNameFromAsp(aspFile: string): string {
    const normalized = normalizeAspFileName(aspFile);
    // Check custom mapping first
    const mappedName = findCustomRoute(normalized);
    if (mappedName) {
        return mappedName;
    }

    // Default: use ASP filename without extension
    return normalized.replace(/\.aspx?$/i, '');
}

/**
 * Check if ASP route has a custom mapping
 *
 * @param aspFile - ASP filename
 * @returns True if custom mapping exists
 */
export function hasCustomMapping(aspFile: string): boolean {
    return !!findCustomRoute(normalizeAspFileName(aspFile));
}

/**
 * Parse ASP URL to extract filename and query params
 *
 * Handles various URL formats:
 * - Full URL: http://server/path/file.asp?param=value
 * - Relative: ../../system/file.asp?param=value
 * - Just filename: file.asp
 *
 * @param url - ASP URL
 * @returns Parsed components
 *
 * @example
 * ```tsx
 * parseAspUrl('../../system/Main_ISLLSYS_20010101.asp?nodeKey=123')
 * // → {
 * //   fileName: 'Main_ISLLSYS_20010101.asp',
 * //   path: '../../system/',
 * //   queryString: '?nodeKey=123',
 * //   params: { nodeKey: '123' }
 * // }
 * ```
 */
export function parseAspUrl(url: string): {
    fileName: string;
    path: string;
    queryString: string;
    params: Record<string, string>;
} {
    let decodedUrl = url;
    try {
        decodedUrl = decodeURIComponent(url);
    } catch {
        decodedUrl = url;
    }

    // Split URL into path and query
    const [pathPart, queryPart] = decodedUrl.split('?');

    // Extract filename from path
    const pathSegments = pathPart.split('/');
    const fileName = pathSegments[pathSegments.length - 1];
    const path = pathSegments.slice(0, -1).join('/');

    // Parse query parameters
    const params: Record<string, string> = {};
    if (queryPart) {
        const searchParams = new URLSearchParams(queryPart);
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
    }

    return {
        fileName,
        path: path ? `${path}/` : '',
        queryString: queryPart ? `?${queryPart}` : '',
        params,
    };
}

/**
 * Map of accepted key casings → canonical lowercase key.
 * Backend may use uppercase; the app uses lowercase.
 */
type CanonicalRouteParamKey = 'frame' | 'nodeKey' | 'action' | 'policyId';

const SAFE_PARAM_ORDER: CanonicalRouteParamKey[] = ['frame', 'nodeKey', 'action', 'policyId'];

const PARAM_KEY_MAP: Record<string, CanonicalRouteParamKey> = {
    action: 'action',
    nodekey: 'nodeKey',
    policyid: 'policyId',
    frame: 'frame',
};

function toCanonicalParamKey(rawKey: string): CanonicalRouteParamKey | undefined {
    return PARAM_KEY_MAP[rawKey.toLowerCase()];
}

function extractParamString(rawQueryString: string): string {
    const trimmed = rawQueryString.trim();
    if (!trimmed) return '';

    const qIndex = trimmed.indexOf('?');
    if (qIndex >= 0) {
        return trimmed.substring(qIndex + 1);
    }

    return trimmed.startsWith('?') ? trimmed.substring(1) : trimmed;
}

/**
 * Extract clean query parameters from a server queryString value.
 *
 * The cycling API can return `queryString` in multiple formats:
 * - Pure query: `"?A=1&B=2"` or `"A=1&B=2"`
 * - Full ASP URL with params: `"../../system/asp/File.asp?A=1&B=2"`
 *
 * This helper strips the path prefix (if any) and returns only
 * the canonical navigation params (action, nodeKey, policyId, frame).
 *
 * @param rawQueryString - The raw `queryString` value from the cycling API response
 * @param frame - Optional frame value to inject (used when API supplies it separately)
 * @returns Canonical param record with only safe, lowercase keys
 *
 * @example
 * ```ts
 * extractCanonicalParams('../../system/asp/Main.asp?USERID=x&POLICYID=123&ACTION=MAIN&NODEKEY=POL|0|')
 * // → { action: 'MAIN', nodeKey: 'POL|0|', policyId: '123' }
 *
 * extractCanonicalParams('?ACTION=MAIN&NODEKEY=POL|0|')
 * // → { action: 'MAIN', nodeKey: 'POL|0|' }
 * ```
 */
export function extractCanonicalParams(
    rawQueryString: string | undefined | null,
    frame?: string | null,
): Record<string, string> {
    const result: Record<string, string> = {};

    if (rawQueryString && rawQueryString.trim() !== '') {
        const paramString = extractParamString(rawQueryString);

        try {
            const searchParams = new URLSearchParams(paramString);
            searchParams.forEach((value, key) => {
                const canonicalKey = toCanonicalParamKey(key);
                if (canonicalKey && value) {
                    let finalValue = value;

                    // CRITICAL: Strip button code from action parameter for legacy URL compatibility
                    // Legacy VBScript URLs show base action only (e.g., "RATELEVEL" not "RATELEVEL|NEXT")
                    // Server may echo back compound actions (e.g., "STARTOPTIONS|OK"), but URLs should show
                    // This matches parseQueryStringParams() behavior for consistency
                    if (canonicalKey === 'action' && value.includes('|')) {
                        const [baseAction] = value.split('|');
                        finalValue = baseAction;
                    }

                    result[canonicalKey] = finalValue;
                }
            });
        } catch {
            // Malformed query string — return empty
        }
    }

    // Inject frame if supplied and not already present
    if (frame && !result['frame']) {
        result['frame'] = frame.toLowerCase();
    }

    return result;
}

/**
 * Build React route URL from ASP components
 *
 * Converts ASP filename and canonical query params to a React route URL.
 * Only includes known safe parameters (action, nodeKey, policyId, frame).
 *
 * @param aspFile - ASP filename
 * @param frame - Frame type (e.g., 'MAIN', 'MODAL') to include as query param
 * @param queryParams - Query parameters (accepts any casing; mapped to canonical keys)
 * @returns React route URL
 *
 * @example
 * ```tsx
 * buildReactRouteUrl('Main_ISLLSYS_20010101.asp', 'newwindow', { nodeKey: '123', action: 'MAIN' })
 * // → '/Main_ISLLSYS_20010101?action=MAIN&nodeKey=123&frame=newwindow'
 * ```
 */
export function buildReactRouteUrl(
    aspFile: string,
    frame: string | undefined,
    queryParams?: Record<string, string | number>,
): string {
    const basePath = aspToReactRoute(aspFile);
    const canonicalParams: Partial<Record<CanonicalRouteParamKey, string>> = {};

    if (queryParams) {
        const queryStringValue =
            queryParams['queryString'] ?? queryParams['QUERYSTRING'] ?? queryParams['QueryString'];

        if (typeof queryStringValue === 'string' && queryStringValue.trim() !== '') {
            const extracted = extractCanonicalParams(queryStringValue);
            Object.assign(canonicalParams, extracted);
        }

        Object.entries(queryParams).forEach(([key, value]) => {
            const canonicalKey = toCanonicalParamKey(key);
            if (!canonicalKey || value == null) return;
            let stringValue = String(value);
            if (stringValue === '') return;

            // CRITICAL: Strip button code from action parameters for legacy URL compatibility
            // This handles cases where action is passed directly in queryParams (not in queryString)
            if (canonicalKey === 'action' && stringValue.includes('|')) {
                const [baseAction] = stringValue.split('|');
                stringValue = baseAction;
            }

            canonicalParams[canonicalKey] = stringValue;
        });
    }


    if (frame && !canonicalParams.frame) {
        canonicalParams.frame = frame.toLowerCase();
    }

    const params = new URLSearchParams();
    SAFE_PARAM_ORDER.forEach((key) => {
        const value = canonicalParams[key];
        if (value) {
            params.set(key, value);
        }
    });

    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
}

/**
 * Extract ASP filename from cycling API response URL
 *
 * Handles various URL formats returned by the server.
 *
 * @param responseUrl - URL from cycling API response
 * @returns ASP filename
 *
 * @example
 * ```tsx
 * extractAspFileName('../../system/asp/Main_ISLLSYS_20010101.asp')
 * // → 'Main_ISLLSYS_20010101.asp'
 *
 * extractAspFileName('/AQS.Advantage/Main_ISLLSYS_20010101.asp?id=123')
 * // → 'Main_ISLLSYS_20010101.asp'
 * ```
 */
export function extractAspFileName(responseUrl: string): string {
    const parsed = parseAspUrl(responseUrl);
    return parsed.fileName;
}

/**
 * Convert cycling API response URL to React route
 *
 * Parses the response URL, extracts ASP filename, converts to React route.
 * Preserves query parameters.
 *
 * @param responseUrl - URL from cycling API
 * @returns React route URL
 *
 * @example
 * ```tsx
 * convertCyclingUrlToReactRoute('../../system/Main_ISLLSYS_20010101.asp?nodeKey=123')
 * // → '/Main_ISLLSYS_20010101?nodeKey=123'
 * ```
 */
export function convertCyclingUrlToReactRoute(responseUrl: string): string {
    const parsed = parseAspUrl(responseUrl);
    const reactRoute = aspToReactRoute(parsed.fileName);

    // Append query string if present
    return parsed.queryString ? `${reactRoute}${parsed.queryString}` : reactRoute;
}

/**
 * Check if URL is an ASP file
 *
 * @param url - URL to check
 * @returns True if URL points to ASP file
 */
export function isAspUrl(url: string): boolean {
    return /\.aspx?(\?|$)/i.test(url);
}

/**
 * Normalize ASP filename
 *
 * Ensures consistent format:
 * - Removes path
 * - Keeps .asp extension
 * - Removes query string
 *
 * @param aspFile - ASP filename or URL
 * @returns Normalized filename
 *
 * @example
 * ```tsx
 * normalizeAspFileName('../../system/Main_ISLLSYS_20010101.asp?id=123')
 * // → 'Main_ISLLSYS_20010101.asp'
 *
 * normalizeAspFileName('Main_ISLLSYS_20010101')
 * // → 'Main_ISLLSYS_20010101.asp'
 * ```
 */
export function normalizeAspFileName(aspFile: string): string {
    // Extract filename from URL
    const parsed = parseAspUrl(aspFile);
    let fileName = parsed.fileName;

    // Add .asp extension if missing
    if (!/\.aspx?$/i.test(fileName)) {
        fileName = `${fileName}.asp`;
    }

    return fileName;
}

/**
 * Get all ASP routes from map
 *
 * @returns Array of ASP filenames with custom mappings
 */
export function getCustomAspRoutes(): string[] {
    return Object.keys(ASP_Route_Map);
}

/**
 * Get all React routes from map
 *
 * @returns Array of React route paths
 */
export function getCustomReactRoutes(): string[] {
    return Object.values(ASP_Route_Map).map((name) => `/${name}`);
}
