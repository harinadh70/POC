/**
 * Permission Store - Global Permission Cache
 *
 * Equivalent to legacy AQS `mxmlSecurity` global variable.
 * Stores the permission map once on login/app load and provides
 * access throughout the application lifecycle.
 *
 * Usage:
 *   - Call initializePermissions() in root loader after fetching user data
 *   - Call getPermissionMap() anywhere permissions are needed
 *   - Call clearPermissions() on logout
 */

import { buildPermissionMapFromApi, type PermissionMap } from './user-permissions';

// ----------------------------------------
// Module-level state (singleton pattern)
// ----------------------------------------

let permissionMap: PermissionMap | null = null;
let isInitialized = false;

// ----------------------------------------
// Public API
// ----------------------------------------

/**
 * Initialize the global permission store from the API response.
 * Should be called once after fetching user data (e.g., in root loader).
 *
 * @param apiResponse - The raw API response containing xdiSecurity
 */
export function initializePermissions(apiResponse: any): void {
    if (!apiResponse?.xdiSecurity) {
        console.warn('[PermissionStore] No xdiSecurity found in API response');
        permissionMap = null;
        isInitialized = false;
        return;
    }

    permissionMap = buildPermissionMapFromApi(apiResponse);
    isInitialized = true;

    console.log('[PermissionStore] Permissions initialized', {
        lobCount: Object.keys(permissionMap).length,
        lobs: Object.keys(permissionMap),
    });
}

/**
 * Get the current permission map.
 * Returns null if not initialized.
 */
export function getPermissionMap(): PermissionMap | null {
    return permissionMap;
}

/**
 * Check if permissions have been initialized.
 */
export function isPermissionsInitialized(): boolean {
    return isInitialized && permissionMap !== null;
}

/**
 * Clear the permission store.
 * Should be called on logout to clean up.
 */
export function clearPermissions(): void {
    permissionMap = null;
    isInitialized = false;
    console.log('[PermissionStore] Permissions cleared');
}

/**
 * Get permission stats for debugging.
 */
export function getPermissionStats(): {
    initialized: boolean;
    lobCount: number;
    lobs: string[];
    totalPages: number;
    totalObjects: number;
} {
    if (!permissionMap) {
        return {
            initialized: false,
            lobCount: 0,
            lobs: [],
            totalPages: 0,
            totalObjects: 0,
        };
    }

    let totalPages = 0;
    let totalObjects = 0;

    for (const lob of Object.values(permissionMap)) {
        totalPages += Object.keys(lob).length;
        for (const page of Object.values(lob)) {
            totalObjects += Object.keys(page).length;
        }
    }

    return {
        initialized: isInitialized,
        lobCount: Object.keys(permissionMap).length,
        lobs: Object.keys(permissionMap),
        totalPages,
        totalObjects,
    };
}
