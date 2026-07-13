import type { PermissionSnapshot } from '@/types';

/**
 * Check if an action is allowed based on permissions
 * Fail-closed: returns false if permissions missing or action denied
 */
export function isActionAllowed(action: string, permissions: PermissionSnapshot | null): boolean {
    if (!permissions) {
        console.warn('[Security] No permissions loaded, denying action:', action);
        return false;
    }

    // Check deny list first
    if (permissions.actions.deny.includes(action)) {
        console.warn('[Security] Action explicitly denied:', action);
        return false;
    }

    // If allow list exists and is non-empty, action must be in it
    if (permissions.actions.allow.length > 0 && !permissions.actions.allow.includes(action)) {
        console.warn('[Security] Action not in allow list:', action);
        return false;
    }

    return true;
}
