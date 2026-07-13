import { redirect } from 'react-router';
import type { MiddlewareFunction } from 'react-router';

import { navigationContext, permissionsContext } from '@/context';
import { normalizeAspFileName } from '@/utils/asp-route-mapper';
import { getItem } from '@utils/local-storage';
import type { PermissionSnapshot } from '@/types';

import { authMiddleware } from './utils/middleware';

const PUBLIC_PATHS = new Set(['/login', '/logout']);

interface PermissionCheckLog {
    path: string;
    targetAspFile: string | null;
    hasPermissions: boolean;
    reason?: string;
}

/**
 * Returns true when a route should bypass permission checks.
 */
function isPublicPath(pathname: string): boolean {
    return PUBLIC_PATHS.has(pathname);
}

/**
 * Derives target ASP filename for permission checks.
 *
 * Priority:
 * 1) `navigationContext.fileName` (from cycling response)
 * 2) URL pathname fallback (React route path → ASP filename)
 */
function resolveTargetAspFile(pathname: string, navFileName: string | undefined): string | null {
    if (navFileName && navFileName.trim().length > 0) {
        return normalizeAspFileName(navFileName);
    }

    const segment = pathname.split('/').filter(Boolean).at(-1);
    if (!segment) {
        return null;
    }

    if (PUBLIC_PATHS.has(`/${segment}`)) {
        return null;
    }

    return normalizeAspFileName(segment);
}

/**
 * Writes normalized permission check telemetry for debugging/audit purposes.
 */
function logPermissionCheck(details: PermissionCheckLog): void {
    const base = '[PERMISSIONS_MIDDLEWARE]';

    if (details.reason) {
        console.warn(`${base} DENY`, {
            path: details.path,
            targetAspFile: details.targetAspFile,
            hasPermissions: details.hasPermissions,
            reason: details.reason,
        });
        return;
    }

    console.log(`${base} ALLOW`, {
        path: details.path,
        targetAspFile: details.targetAspFile,
        hasPermissions: details.hasPermissions,
    });
}

/**
 * Route middleware that enforces page-level permissions for ASP-backed pages.
 *
 * Behavior:
 * - Public paths (`/login`, `/logout`) always pass through.
 * - Missing permission snapshot on protected routes redirects to `/login`.
 * - Explicitly denied ASP files redirect to `/login?reason=forbidden`.
 * - If an allow-list is present, only files in the allow-list are permitted (fail closed).
 */
const permissionsMiddleware: MiddlewareFunction = async ({ request, context }, next) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (isPublicPath(pathname)) {
        await next();
        return;
    }

    let permissions = context.get(permissionsContext);

    if (!permissions) {
        permissions = getItem<PermissionSnapshot>('permissionSnapshot');
        if (permissions) {
            context.set(permissionsContext, permissions);
        }
    }

    // If permissions haven't been loaded yet, allow through.
    // authMiddleware (which runs first) already guarantees the user is authenticated.
    // The dashboard loader will fetch permissions on the initial action=MAIN call
    // and persist them to localStorage for subsequent navigations.
    if (!permissions) {
        logPermissionCheck({
            path: pathname,
            targetAspFile: null,
            hasPermissions: false,
            reason: 'permissions-not-loaded-yet-allowing-through',
        });
        await next();
        return;
    }

    const navContext = context.get(navigationContext);
    const targetAspFile = resolveTargetAspFile(pathname, navContext?.fileName);

    if (!targetAspFile) {
        logPermissionCheck({
            path: pathname,
            targetAspFile,
            hasPermissions: true,
            reason: 'missing-target-asp-file',
        });
        throw redirect('/login?reason=forbidden');
    }

    const allowedSet = new Set(permissions.page.allowedAspFiles.map((file) => file.toLowerCase()));
    const deniedSet = new Set(permissions.page.deniedAspFiles.map((file) => file.toLowerCase()));
    const target = targetAspFile.toLowerCase();

    if (deniedSet.has(target)) {
        logPermissionCheck({
            path: pathname,
            targetAspFile,
            hasPermissions: true,
            reason: 'explicitly-denied',
        });
        throw redirect('/login?reason=forbidden');
    }

    if (allowedSet.size > 0 && !allowedSet.has(target)) {
        logPermissionCheck({
            path: pathname,
            targetAspFile,
            hasPermissions: true,
            reason: 'not-in-allow-list',
        });
        throw redirect('/login?reason=forbidden');
    }

    logPermissionCheck({
        path: pathname,
        targetAspFile,
        hasPermissions: true,
    });

    await next();
};

export { authMiddleware, permissionsMiddleware };
