// ============================================================================
// GAP #20: CheckForAsynchProcess (VBS lines 1835-1876)
// ============================================================================
//
// VBS BEHAVIOR:
//   Sub CheckForAsynchProcess() is called after certain navigations (RATE,
//   SUBMIT) to check if the server started a background job (e.g., rating
//   engine running asynchronously). It:
//     1. Calls CHECKASYNCH endpoint with the session payload
//     2. If response.status = "RUNNING": shows message ("Rating in progress,
//        please wait..."), starts a timer that polls every 2 seconds
//     3. Each poll re-calls CHECKASYNCH
//     4. When status != "RUNNING": stops the timer, hides the message,
//        continues with the original navigation completion
//     5. If max attempts exceeded: shows error, stops polling
//
// REAL POC STATUS:
//   - The service function checkForAsyncProcess() ALREADY EXISTS in
//     changes/src/services/async-check.ts — it calls the CHECKASYNCH endpoint
//     via postRaw and returns { running: boolean, message?: string }.
//   - BUT there is no React hook for polling, no loading UI, and no
//     integration with the navigation flow.
//
// FIX:
//   A useAsyncProcessCheck hook that wraps the existing service with:
//   - Polling at 2-second intervals when running
//   - Max attempts safeguard (30 = 60 seconds)
//   - Loading state for UI display
//   - Automatic cleanup on unmount
//   - Callback on completion for navigation continuation
//
// WHERE TO ADD: src/hooks/use-async-process-check.ts
// WIRE INTO: data-strategy.ts after RATE/SUBMIT navigation completes
// ============================================================================

import { useCallback, useEffect, useRef, useState } from 'react';

import { checkForAsyncProcess } from '@/services/async-check';

import type { AsyncCheckResult } from '@/services/async-check';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Poll interval in milliseconds — VBS used 2000ms. */
const POLL_INTERVAL_MS = 2000;

/** Max poll attempts before giving up — prevents infinite polling. */
const MAX_POLL_ATTEMPTS = 30; // 30 * 2s = 60 seconds max wait

// ---------------------------------------------------------------------------
// Hook State
// ---------------------------------------------------------------------------

interface AsyncProcessState {
    /** Whether an async process check is in progress (polling). */
    isChecking: boolean;
    /** Server-provided message (e.g. "Rating in progress, please wait..."). */
    message: string | null;
    /** Whether the async process completed successfully. */
    completed: boolean;
    /** Whether polling was aborted due to max attempts exceeded. */
    timedOut: boolean;
}

// ---------------------------------------------------------------------------
// useAsyncProcessCheck
// ---------------------------------------------------------------------------

/**
 * useAsyncProcessCheck
 *
 * React hook that manages the async process polling lifecycle.
 * Mirrors VBS CheckForAsynchProcess with timer-based polling.
 *
 * Usage:
 *   const { isChecking, message, triggerCheck } = useAsyncProcessCheck({
 *       onComplete: () => {
 *           // Async process finished — continue with navigation
 *           executeAction(pendingAction);
 *       },
 *       onTimeout: () => {
 *           showError('Background process timed out. Please try again.');
 *       },
 *   });
 *
 *   // After a RATE or SUBMIT action:
 *   triggerCheck();
 *
 *   // Show loading indicator while polling:
 *   {isChecking && <LoadingOverlay message={message} />}
 *
 * @param onComplete - Called when the async process finishes (running=false).
 * @param onTimeout  - Called when max poll attempts are exceeded.
 */
export function useAsyncProcessCheck(options: {
    onComplete?: () => void;
    onTimeout?: () => void;
} = {}) {
    const { onComplete, onTimeout } = options;

    const [state, setState] = useState<AsyncProcessState>({
        isChecking: false,
        message: null,
        completed: false,
        timedOut: false,
    });

    // Refs for cleanup — avoid stale closures and leaked intervals
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const attemptRef = useRef(0);
    const mountedRef = useRef(true);

    // Stable callback refs so interval closure always sees latest callbacks
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;
    const onTimeoutRef = useRef(onTimeout);
    onTimeoutRef.current = onTimeout;

    /** Stop the polling interval and clean up. */
    const stopPolling = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        attemptRef.current = 0;
    }, []);

    /** Single poll iteration — called by the interval timer. */
    const poll = useCallback(async () => {
        attemptRef.current += 1;

        // Max attempts exceeded — stop and notify
        if (attemptRef.current > MAX_POLL_ATTEMPTS) {
            stopPolling();
            if (mountedRef.current) {
                setState({
                    isChecking: false,
                    message: null,
                    completed: false,
                    timedOut: true,
                });
            }
            onTimeoutRef.current?.();
            return;
        }

        try {
            const result: AsyncCheckResult = await checkForAsyncProcess();

            if (!mountedRef.current) return; // unmounted during await

            if (!result.running) {
                // Process finished — stop polling, signal completion
                stopPolling();
                setState({
                    isChecking: false,
                    message: null,
                    completed: true,
                    timedOut: false,
                });
                onCompleteRef.current?.();
            } else {
                // Still running — update message (server may change it)
                setState((prev) => ({
                    ...prev,
                    message: result.message ?? prev.message,
                }));
            }
        } catch (error) {
            // Network error during poll — log but keep polling (VBS did the
            // same: timer kept running even if one check failed)
            console.warn('[useAsyncProcessCheck] Poll error:', error);
        }
    }, [stopPolling]);

    /**
     * triggerCheck — call this after a RATE/SUBMIT action to start the
     * async process check cycle.
     *
     * Flow:
     *   1. Immediately call CHECKASYNCH
     *   2. If running=true, start polling every 2 seconds
     *   3. If running=false on first check, call onComplete immediately
     */
    const triggerCheck = useCallback(async () => {
        // Reset state
        stopPolling();
        setState({
            isChecking: true,
            message: null,
            completed: false,
            timedOut: false,
        });

        try {
            const result = await checkForAsyncProcess();

            if (!mountedRef.current) return;

            if (!result.running) {
                // No async process — immediately complete
                setState({
                    isChecking: false,
                    message: null,
                    completed: true,
                    timedOut: false,
                });
                onCompleteRef.current?.();
            } else {
                // Async process is running — start polling
                setState({
                    isChecking: true,
                    message: result.message ?? 'Processing, please wait...',
                    completed: false,
                    timedOut: false,
                });
                attemptRef.current = 0;
                intervalRef.current = setInterval(poll, POLL_INTERVAL_MS);
            }
        } catch (error) {
            console.error('[useAsyncProcessCheck] Initial check failed:', error);
            if (mountedRef.current) {
                setState({
                    isChecking: false,
                    message: null,
                    completed: false,
                    timedOut: false,
                });
            }
            // On initial check failure, proceed as if no async process
            onCompleteRef.current?.();
        }
    }, [poll, stopPolling]);

    // Cleanup on unmount — stop any active polling
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            stopPolling();
        };
    }, [stopPolling]);

    return {
        /** Whether polling is actively running. */
        isChecking: state.isChecking,
        /** Server-provided status message during polling. */
        message: state.message,
        /** Whether the async process completed (running became false). */
        completed: state.completed,
        /** Whether polling was stopped due to exceeding max attempts. */
        timedOut: state.timedOut,
        /** Call to initiate the async process check + polling cycle. */
        triggerCheck,
        /** Call to manually stop polling (e.g., user cancels). */
        cancelCheck: stopPolling,
    };
}

export default useAsyncProcessCheck;

// ---------------------------------------------------------------------------
// INTEGRATION: Wire into data-strategy.ts
// ---------------------------------------------------------------------------
//
// In data-strategy.ts (or execute-action.ts), after a RATE or SUBMIT action
// completes and returns a response:
//
//   // Inside the component that calls executeAction:
//   const { isChecking, message, triggerCheck } = useAsyncProcessCheck({
//       onComplete: () => {
//           // Async process done — proceed with the navigation response
//           handleNavigationResponse(pendingResponse);
//       },
//       onTimeout: () => {
//           dialogStore.onOpenDialog({
//               message: 'The background process is taking longer than expected. '
//                      + 'Please check back shortly.',
//               messageType: 'warning',
//               dialogType: 'ok',
//           });
//       },
//   });
//
//   // After executeAction returns for RATE/SUBMIT:
//   async function handleAction(action: string) {
//       const response = await executeAction(action);
//
//       // VBS: certain actions required an async check before proceeding
//       if (action === 'RATE' || action === 'SUBMIT') {
//           setPendingResponse(response);
//           triggerCheck();   // <-- starts the polling cycle
//           return;           // onComplete will handle the response
//       }
//
//       // All other actions proceed immediately
//       handleNavigationResponse(response);
//   }
//
// Loading UI (in the component's JSX):
//
//   {isChecking && (
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2 }}>
//           <CircularProgress size={20} />
//           <Typography variant="body2">{message}</Typography>
//       </Box>
//   )}
