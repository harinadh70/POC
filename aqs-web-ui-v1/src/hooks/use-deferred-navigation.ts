/**
 * @file use-deferred-navigation.ts
 * @description Hook for handling deferred navigation chains
 *
 * Supports modal chains where multiple actions are queued.
 * After a modal closes, the next action in the chain is executed.
 *
 * This replicates the legacy ExecuteAction deferred navigation pattern
 * where modal dialogs could trigger additional navigation after closing.
 *
 * @example
 * ```tsx
 * function MyModal() {
 *   const { executeNextAction, hasDeferredAction } = useDeferredNavigation();
 *
 *   const handleClose = () => {
 *     if (hasDeferredAction) {
 *       executeNextAction();
 *     } else {
 *       navigate(-1);
 *     }
 *   };
 *
 *   return <Dialog onClose={handleClose}>...</Dialog>;
 * }
 * ```
 */

import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// context
import type { NavigationContextValue } from '@/context';
import type { ActionType } from '@/types';
// utils
import { getItem, setItem } from '@utils/local-storage';

// NOTE: This hook uses localStorage to persist deferred navigation state
// since React Router v7 doesn't expose context access in hooks.
// In production, this should be managed through dataStrategy context.

const DEFERRED_NAV_KEY = 'aqs:deferredNavigation';


// ------------------------------
/**
 * Deferred navigation hook return type
 */
export interface UseDeferredNavigationReturn {
  /** Whether there is a deferred action to execute */
  hasDeferredAction: boolean;

  /** Next action to execute */
  nextAction?: NavigationContextValue['nextAction'];
  /** Execute the next deferred action */
  executeNextAction: () => void;

  /** Cancel deferred navigation and go back */
  cancelNavigation: () => void;

  /** Update the deferred action */
  setNextAction: (action: NavigationContextValue['nextAction']) => void;

  /** Clear the deferred action */
  clearNextAction: () => void;

}

/**
 * Hook for managing deferred navigation chains
 *
 * Handles scenarios where:
 * - Modal opens another modal
 * - Modal triggers navigation after close
 * - Multiple actions queued in sequence
 *
 * @returns Deferred navigation utilities
 *
 * @example
 * ```tsx
 * function PolicyDetailsModal() {
 *   const { hasDeferredAction, executeNextAction } = useDeferredNavigation();
 *
 *   const handleSave = async () => {
 *     await savePolicy();
 *
 *     if (hasDeferredAction) {
 *       // Execute next action in chain
 *       executeNextAction();
 *     } else {
 *       // Just close modal
 *       navigate(-1);
 *     }
 *   };
 *
 *   return (
 *     <Dialog>
 *       <Button onClick={handleSave}>Save</Button>
 *     </Dialog>
 *   );
 * }
 * ```
 */
export function useDeferredNavigation(): UseDeferredNavigationReturn {
  const navigate = useNavigate();

  // Load deferred state from localStorage
  const [deferredState, setDeferredState] = useState<{
    deferred: boolean;
    nextAction?: NavigationContextValue['nextAction'];
  }>(() => {
    const stored = getItem<{
      deferred: boolean;
      nextAction?: NavigationContextValue['nextAction'];
    }>(DEFERRED_NAV_KEY, { deferred: false });
    return stored ?? { deferred: false };
  });

  // Sync state to localStorage
  useEffect(() => {
    const success = setItem(DEFERRED_NAV_KEY, deferredState);
    if (!success) {
      console.error('[useDeferredNavigation] Failed to persist state');
    }
  }, [deferredState]);

  // Check if there's a deferred action
  const hasDeferredAction = Boolean(deferredState.deferred && deferredState.nextAction);
  const nextAction = deferredState.nextAction;

  /**
   * Execute the next deferred action
   *
   * Triggers navigation which will be picked up by dataStrategy.
   */
  const executeNextAction = useCallback(() => {
    if (!hasDeferredAction || !nextAction) {
      console.warn('[useDeferredNavigation] No deferred action to execute');
      return;
    }

    console.log('[useDeferredNavigation] Executing next action:', nextAction);

    // Clear deferred state
    setDeferredState({ deferred: false });

    // Navigate back - dataStrategy will pick up the next action from context
    navigate(-1);
  }, [hasDeferredAction, nextAction, navigate]);

  /**
   * Cancel deferred navigation and go back normally
   */
  const cancelDeferredNavigation = useCallback(() => {
    console.log('[useDeferredNavigation] Canceling deferred navigation');
    setDeferredState({ deferred: false });
    navigate(-1);
  }, [navigate]);

  /**
   * Update the next action in the chain
   */
  const setNextAction = useCallback((action: NavigationContextValue['nextAction']) => {
    console.log('[useDeferredNavigation] Setting next action:', action);
    setDeferredState({
      deferred: Boolean(action),
      nextAction: action,
    });
  }, []);

  /**
   * Clear the deferred action
   */
  const clearNextAction = useCallback(() => {
    console.log('[useDeferredNavigation] Clearing next action');

    setDeferredState({ deferred: false });
  }, []);

  return {
    hasDeferredAction,
    nextAction,
    executeNextAction,
    cancelDeferredNavigation,
    setNextAction,
    clearNextAction,
  };
}

/**
 * Create a deferred navigation action
 *
 * Helper to construct a nextAction object.
 *
 * @param action - Action type (e.g., 'MAIN', 'MENU')
 * @param nodeKey - Optional node key
 * @param tab - Optional tab number
 * @returns Next action object
 *
 * @example
 * ```tsx
 * const nextAction = createDeferredAction('MENU', 'policy-list', 1);
 * setNextAction(nextAction);
 * ```
 */
export function createDeferredAction(
  action: ActionType,
  nodeKey?: string,
  tab?: number,
): NavigationContextValue['nextAction'] {
  return {
    action,
    nodeKey,
    tab,
  };
}

/**
 * Check if navigation context has deferred action
 *
 * Utility function to check deferred state from navigation context.
 *
 * @param navContext - Navigation context value
 * @returns True if deferred action exists
 */
export function hasDeferredAction(navContext: NavigationContextValue | null): boolean {
  return Boolean(navContext?.deferred && navContext?.nextAction);
}
