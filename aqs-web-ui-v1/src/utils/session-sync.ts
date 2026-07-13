/**
 * @file session-sync.ts
 * @description Session storage synchronization utilities for navigation context
 *
 * **Purpose**: Sync navigation context to sessionStorage as backup for:
 * 1. Page reload recovery (restore context after F5)
 * 2. New window initialization (URL params + storage for complete session)
 *
 * **Pattern**: Matches legacy VBScript where session values are read from:
 * - Primary: URL querystring parameters (source of truth)
 * - Backup: DOM attributes, global variables (for page reload)
 *
 * **Critical**: sessionStorage is window-scoped. Each browser window/tab has
 * its own isolated storage. New windows must initialize from URL params and
 * write to their own storage.
 *
 * @example
 * ```typescript
 * // After executeAction updates context
 * syncContextToStorage(updatedContext);
 *
 * // On page reload, restore from storage
 * const stored = readContextFromStorage();
 * if (stored) {
 *   context.set(navigationContext, mergedContext);
 * }
 * ```
 */

import type { NavigationContextValue } from '@/context';
import { createFeatureLogger } from '@utils/logger-builder';
import { toLegacyXmlDetailString } from '@utils/legacy-xml-detail';

const logger = createFeatureLogger('navigation', 'session-sync');

const SESSION_CONTEXT_KEY = 'aqs:navigation:context';
const SESSION_SYNC_VERSION = '1.0';

/**
 * Serializable subset of NavigationContextValue for storage
 * Excludes functions, large objects, and runtime-only state
 *
 * **Type notes**: Uses `| null` (not `| undefined`) to match NavigationContextValue.
 * JSON.stringify converts null to "null" string, which is parseable.
 */
export interface StoredSessionContext {
  /** Version for schema evolution */
  version: string;

  /** Current action (CRITICAL - updated by cycling) */
  action: string | null;

  /** Policy ID */
  policyId: string | null;

  /** Node key (tree position) */
  nodeKey: string | null;

  /** User ID */
  userId: string | null;

  /** Company location code */
  compLoc: string | null;

  /** XML detail (session state) */
  xmlDetail: string | unknown | null;

  /** Tab index */
  tab: number | null;

  /** Last ASP filename */
  fileName: string | null;

  /** Last page XML filename/path */
  xmlFileName: string | null;
  xmlFilePath: string | null;

  /** Last tab file metadata */
  tabFileName: string | null;
  tabFilePath: string | null;

  /** Last XML list file metadata */
  xmlListFileName: string | null;
  xmlListFilePath: string | null;

  /** Last React route */
  reactRoute: string | null;

  /** Timestamp for expiration */
  timestamp: number;
}

/**
 * Write navigation context to sessionStorage
 *
 * Called after every successful executeAction to persist state for:
 * - Page reload (user hits F5)
 * - Browser back/forward navigation
 *
 * **Note**: sessionStorage is window-scoped. Each window has its own storage.
 * New windows must be initialized via URL parameters, not parent's storage.
 *
 * @param context - Current navigation context
 * @returns Whether storage succeeded
 *
 * @example
 * ```typescript
 * const result = await executeAction({ ... });
 * if (result.success) {
 *   syncContextToStorage(result.updatedContext);
 *   context.set(navigationContext, result.updatedContext);
 * }
 * ```
 */
export function syncContextToStorage(context: NavigationContextValue): boolean {
  try {
    const stored: StoredSessionContext = {
      version: SESSION_SYNC_VERSION,
      action: context.action,
      policyId: context.policyId,
      nodeKey: context.nodeKey,
      userId: context.userId,
      compLoc: context.compLoc,
      xmlDetail: toLegacyXmlDetailString(context.xmlDetail, '') || null,
      tab: context.tab,
      fileName: context.fileName ?? null,
      xmlFileName: context.xmlFileName ?? null,
      xmlFilePath: context.xmlFilePath ?? null,
      tabFileName: context.tabFileName ?? null,
      tabFilePath: context.tabFilePath ?? null,
      xmlListFileName: context.xmlListFileName ?? null,
      xmlListFilePath: context.xmlListFilePath ?? null,
      reactRoute: context.reactRoute ?? null,
      timestamp: Date.now(),
    };

    sessionStorage.setItem(SESSION_CONTEXT_KEY, JSON.stringify(stored));

    logger.debug('Context synced to sessionStorage (new system)', {
      action: stored.action,
      policyId: stored.policyId,
    });

    // BACKWARD COMPATIBILITY: Also update old localStorage.sessionInformation format
    // This ensures browser-commands-provider.tsx and other legacy code reads correct values
    // TODO: Remove this after all code migrated to new session-sync system
    try {
      const oldFormat = {
        compLoc: context.compLoc ?? '',
        userId: context.userId ?? '',
        policyId: context.policyId ?? '0',
        nodeKey: context.nodeKey ?? '',
        action: context.action ?? '',
        diagnosticMode: '0',
        sessionXml: toLegacyXmlDetailString(context.xmlDetail, ''),
      };

      localStorage.setItem('sessionInformation', JSON.stringify(oldFormat));

      logger.debug('Context synced to localStorage (backward compatibility)', {
        action: oldFormat.action,
        policyId: oldFormat.policyId,
        note: 'Remove this after migration complete',
      });
    } catch (legacyError) {
      // localStorage write failed - not critical, log and continue
      logger.warn('Failed to sync to legacy localStorage (non-critical)', {
        error: legacyError instanceof Error ? legacyError.message : 'Unknown error',
      });
    }

    return true;
  } catch (error) {
    // Storage quota exceeded or other error
    logger.error('Failed to sync context to sessionStorage', error as Error);
    return false;
  }
}

/**
 * Read navigation context from sessionStorage
 *
 * Used for page reload and new window initialization fallback.
 * Validates version and checks expiration.
 *
 * **Priority**: URL parameters > sessionStorage > defaults
 * Always prefer URL params when available (new window, navigation).
 *
 * @returns Stored context or null if not found/expired
 *
 * @example
 * ```typescript
 * // In rootLoader
 * const storedContext = readContextFromStorage();
 * if (storedContext && !navContext) {
 *   context.set(navigationContext, {
 *     action: storedContext.action,
 *     policyId: storedContext.policyId,
 *     // ...
 *   });
 * }
 * ```
 */
export function readContextFromStorage(): StoredSessionContext | null {
  try {
    const raw = sessionStorage.getItem(SESSION_CONTEXT_KEY);
    if (!raw) {
      logger.debug('No stored session context found');
      return null;
    }

    const stored = JSON.parse(raw) as StoredSessionContext;

    // Check version for schema evolution
    if (stored.version !== SESSION_SYNC_VERSION) {
      logger.warn('Stored session version mismatch, ignoring', {
        storedVersion: stored.version,
        currentVersion: SESSION_SYNC_VERSION,
      });
      return null;
    }

    // Check if expired (older than 24 hours)
    const age = Date.now() - stored.timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    if (age > maxAge) {
      logger.warn('Stored session expired, ignoring', {
        ageHours: (age / (60 * 60 * 1000)).toFixed(1),
      });
      return null;
    }

    logger.debug('Read context from sessionStorage', {
      action: stored.action,
      policyId: stored.policyId,
      ageMinutes: (age / (60 * 1000)).toFixed(1),
    });

    return stored;
  } catch (error) {
    logger.error('Failed to read context from sessionStorage', error as Error);
    return null;
  }
}

/**
 * Clear stored session context
 *
 * Called on:
 * - User logout
 * - Session timeout
 * - Explicit clear action
 *
 * @example
 * ```typescript
 * // On logout
 * clearStoredContext();
 * clearSessionStorage(); // from session-storage.ts
 * ```
 */
export function clearStoredContext(): void {
    try {
        sessionStorage.removeItem(SESSION_CONTEXT_KEY);
        logger.debug('Stored session context cleared');
    } catch (error) {
        logger.error('Failed to clear stored context', error as Error);
    }
}

/**
 * Merge stored context with current context
 *
 * **Priority**: current context > stored context (stored is fallback)
 * Use this when you have partial context from URL params and want
 * to fill in missing values from storage.
 *
 * @param current - Current navigation context (may be partial)
 * @param stored - Context from sessionStorage
 * @returns Merged context with fallbacks
 *
 * @example
 * ```typescript
 * // New window with URL params
 * const urlContext = { action: 'RATELEVEL', policyId: '487672' };
 *
 * // Storage has xmlDetail from parent
 * const storedContext = readContextFromStorage();
 *
 * // Merge: URL params take priority, fill in xmlDetail from storage
 * const merged = mergeStoredContext(urlContext, storedContext);
 * ```
 */
export function mergeStoredContext(
    current: Partial<NavigationContextValue>,
    stored: StoredSessionContext | null,
): Partial<NavigationContextValue> {
    if (!stored) {
        return current;
    }

    // Use stored as fallback (current overrides stored)
    const merged: Partial<NavigationContextValue> = {
        action: (current.action ?? stored.action) as NavigationContextValue['action'],
        policyId: current.policyId ?? stored.policyId,
        nodeKey: current.nodeKey ?? stored.nodeKey,
        userId: current.userId ?? stored.userId,
        compLoc: current.compLoc ?? stored.compLoc,
        xmlDetail: current.xmlDetail ?? stored.xmlDetail,
        tab: current.tab ?? stored.tab,
        fileName: current.fileName ?? stored.fileName ?? undefined,
        reactRoute: current.reactRoute ?? stored.reactRoute ?? undefined,
        // Preserve any other fields from current
        ...current,
    };

    logger.debug('Merged stored context with current', {
        currentAction: current.action,
        storedAction: stored.action,
        mergedAction: merged.action,
    });

    return merged;
}

/**
 * Check if stored context is still valid (not expired)
 *
 * Use this to determine if storage should be trusted before
 * attempting to read and merge.
 *
 * @returns Whether stored context exists and is valid
 */
export function hasValidStoredContext(): boolean {
    const stored = readContextFromStorage();
    return stored !== null;
}

/**
 * Get age of stored context in milliseconds
 *
 * Useful for debugging and metrics.
 *
 * @returns Age in milliseconds or null if no stored context
 */
export function getStoredContextAge(): number | null {
    try {
        const raw = sessionStorage.getItem(SESSION_CONTEXT_KEY);
        if (!raw) {
            return null;
        }

        const stored = JSON.parse(raw) as StoredSessionContext;
        return Date.now() - stored.timestamp;
    } catch {
        return null;
    }
}
