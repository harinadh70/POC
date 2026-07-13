/**
 * @file url-helpers.ts
 * @description URL utility functions for route comparison and normalization
 *
 * Provides utilities to:
 * - Strip query strings from URLs
 * - Normalize URLs for consistent comparison
 * - Compare routes to detect same-page navigation
 * - Parse URL components for smart navigation decisions
 *
 * These utilities are critical for the refresh vs reload logic,
 * enabling the application to detect when a navigation is to the
 * same route (triggering revalidation) vs a different route
 * (triggering full navigation).
 */

// ----------------------------------------

/**
 * Removes query string and hash from a URL
 *
 * @param url - The URL to process (absolute, relative, or pathname)
 * @returns The URL without query string or hash
 *
 * @example
 * ```ts
 * removeQueryString('/policy?id=123#section') // '/policy'
 * removeQueryString('https://example.com/page?foo=bar') // 'https://example.com/page'
 * removeQueryString('/path/to/page') // '/path/to/page'
 * ```
 */
export function removeQueryString(url: string): string {
    if (!url) return '';

    // Handle relative URLs and pathnames
    const questionMarkIndex = url.indexOf('?');
    const hashIndex = url.indexOf('#');

    let endIndex = url.length;

    // Find the earliest of ? or # (if they exist)
    if (questionMarkIndex !== -1) {
        endIndex = questionMarkIndex;
    }
    if (hashIndex !== -1 && hashIndex < endIndex) {
        endIndex = hashIndex;
    }

    return url.substring(0, endIndex);
}

/**
 * Normalizes a URL for consistent comparison
 *
 * - Removes query strings and hash fragments
 * - Strips trailing slashes
 * - Converts to lowercase (case-insensitive comparison)
 * - Handles both absolute URLs and pathnames
 *
 * @param url - The URL to normalize
 * @returns Normalized URL string
 *
 * @example
 * ```ts
 * normalizeUrl('/Policy-Details/') // '/policy-details'
 * normalizeUrl('/POLICY?id=123') // '/policy'
 * normalizeUrl('https://example.com/Page#anchor') // 'https://example.com/page'
 * ```
 */
export function normalizeUrl(url: string): string {
    if (!url) return '';

    // Remove query string and hash
    let normalized = removeQueryString(url);

    // Remove trailing slashes (but keep single '/')
    if (normalized.length > 1 && normalized.endsWith('/')) {
        normalized = normalized.replace(/\/+$/, '');
    }

    // Lowercase for case-insensitive comparison
    normalized = normalized.toLowerCase();

    return normalized;
}

/**
 * Compares two URLs to determine if they represent the same route
 *
 * This function:
 * - Ignores query parameters and hash fragments
 * - Ignores trailing slashes
 * - Performs case-insensitive comparison
 * - Handles both absolute URLs and pathnames
 *
 * @param url1 - First URL to compare
 * @param url2 - Second URL to compare
 * @returns true if both URLs represent the same route
 *
 * @example
 * ```ts
 * isSameRoute('/policy?id=123', '/policy?id=456') // true (same route, different params)
 * isSameRoute('/Policy/', '/policy') // true (case insensitive, trailing slash)
 * isSameRoute('/dashboard', '/policy') // false (different routes)
 * isSameRoute('https://example.com/page', '/page') // false (different origins)
 * ```
 */
export function isSameRoute(url1: string, url2: string): boolean {
    if (!url1 || !url2) return false;

    const normalized1 = normalizeUrl(url1);
    const normalized2 = normalizeUrl(url2);

    return normalized1 === normalized2;
}

/**
 * Parsed URL information
 */
export interface RouteInfo {
    /** Full pathname (e.g., '/policy-details') */
    pathname: string;
    /** Query string without '?' (e.g., 'id=123&tab=2') */
    queryString: string;
    /** Hash fragment without '#' (e.g., 'section-1') */
    hash: string;
    /** Parsed query parameters as key-value object */
    params: Record<string, string>;
    /** Normalized pathname for comparison (lowercase, no trailing slash) */
    normalizedPath: string;
}

/**
 * Extracts and parses URL components for smart navigation logic
 *
 * Parses a URL into its constituent parts and provides:
 * - Pathname
 * - Query string and parsed parameters
 * - Hash fragment
 * - Normalized path for comparison
 *
 * Handles both absolute URLs and relative pathnames.
 *
 * @param url - The URL to parse (absolute, relative, or pathname)
 * @returns Parsed route information
 *
 * @example
 * ```ts
 * const info = extractRouteInfo('/policy-details?id=123&tab=2#summary');
 * // {
 * //   pathname: '/policy-details',
 * //   queryString: 'id=123&tab=2',
 * //   hash: 'summary',
 * //   params: { id: '123', tab: '2' },
 * //   normalizedPath: '/policy-details'
 * // }
 * ```
 */
export function extractRouteInfo(url: string): RouteInfo {
    if (!url) {
        return {
            pathname: '',
            queryString: '',
            hash: '',
            params: {},
            normalizedPath: '',
        };
    }

    let pathname = '';
    let queryString = '';
    let hash = '';
    const params: Record<string, string> = {};

    try {
        // Try parsing as absolute URL first
        const urlObj = new URL(url, 'http://dummy.com');
        pathname = urlObj.pathname;
        queryString = urlObj.search ? urlObj.search.substring(1) : ''; // Remove leading '?'
        hash = urlObj.hash ? urlObj.hash.substring(1) : ''; // Remove leading '#'

        // Parse query parameters
        urlObj.searchParams.forEach((value, key) => {
            params[key] = value;
        });
    } catch {
        // If URL parsing fails, treat as pathname and manually parse
        const questionMarkIndex = url.indexOf('?');
        const hashIndex = url.indexOf('#');

        // Extract pathname
        if (questionMarkIndex !== -1) {
            pathname = url.substring(0, questionMarkIndex);
        } else if (hashIndex !== -1) {
            pathname = url.substring(0, hashIndex);
        } else {
            pathname = url;
        }

        // Extract query string
        if (questionMarkIndex !== -1) {
            const queryEnd = hashIndex !== -1 ? hashIndex : url.length;
            queryString = url.substring(questionMarkIndex + 1, queryEnd);

            // Parse query parameters manually
            queryString.split('&').forEach((pair) => {
                const [key, value] = pair.split('=');
                if (key) {
                    params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
                }
            });
        }

        // Extract hash
        if (hashIndex !== -1) {
            hash = url.substring(hashIndex + 1);
        }
    }

    return {
        pathname,
        queryString,
        hash,
        params,
        normalizedPath: normalizeUrl(pathname),
    };
}
