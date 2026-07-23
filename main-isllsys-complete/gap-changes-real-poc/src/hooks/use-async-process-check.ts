/**
 * GAP #20 — CheckForAsynchProcess (Main_ISLLSYS_20010101.vbs lines 1835-1876)
 * NEW FILE: src/hooks/use-async-process-check.ts
 * Purpose: probe the backend CHECKASYNCH endpoint and poll (2s x 30 max)
 * until the async process (e.g. rating) finishes for the current policy.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { z } from 'zod';

// utils
import { baseQuery } from '@utils/http-instance';

// types
import type { SessionPayload } from '@/types/common';

// ----------------------------------------------

/** Legacy polled via window.setTimeout re-entry — 2s cadence, bounded */
const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 30;

/**
 * POC contract for POST /ui/page/check-async (legacy CHECKASYNCH probe).
 * The wire flag follows the codebase's booleanLike convention ('T'/'F').
 */
const CheckAsyncResponseSchema = z.object({
    response: z.object({
        callstatus: z.string().catch(''),
        results: z.object({
            aqs: z.object({
                /** 'T' while an asynchronous process is still running */
                asynchInProcess: z
                    .union([z.string(), z.boolean()])
                    .transform((val) => {
                        if (typeof val === 'boolean') return val;
                        const normalized = val.trim().toLowerCase();
                        return normalized === 't' || normalized === 'true' || normalized === '1';
                    })
                    .catch(false),
            }),
        }),
    }),
});

/**
 * Single probe: is an async process still running for this session?
 * Fail-open like the legacy On Error Resume Next — a probe failure must
 * never block the page.
 */
export async function checkAsyncProcess(sessionInfo: SessionPayload): Promise<boolean> {
    try {
        const response = await baseQuery<unknown>({
            url: '/ui/page/check-async',
            method: 'POST',
            data: sessionInfo,
        });

        const parsed = CheckAsyncResponseSchema.safeParse(response);
        if (!parsed.success) return false;

        return parsed.data.response.results.aqs.asynchInProcess;
    } catch {
        return false;
    }
}

// ----------------------------------------------

export interface AsyncProcessCheckResult {
    /** A check/poll loop is currently in flight */
    isChecking: boolean;
    /** Resolves true when clear to proceed, false when timed out/cancelled */
    startCheck: (sessionInfo: SessionPayload) => Promise<boolean>;
}

/**
 * Polls the CHECKASYNCH probe until the async process finishes.
 *
 * Legacy equivalent: CheckForAsynchProcess called pZLOB to ask whether an
 * asynchronous process (rating) was still running and kept the user on a
 * wait message, re-checking on a timer before allowing navigation.
 *
 * React equivalent: startCheck(sessionInfo) probes immediately, then polls
 * every POLL_INTERVAL_MS up to MAX_POLL_ATTEMPTS. isChecking is local state
 * (no loading-store exists in @stores) — render a Spinner from it. All
 * pending timers are cancelled on unmount.
 */
export function useAsyncProcessCheck(): AsyncProcessCheckResult {
    const [isChecking, setIsChecking] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const cancelledRef = useRef(false);

    // Cleanup on unmount — stop the loop and drop the pending timer
    useEffect(() => {
        cancelledRef.current = false;
        return () => {
            cancelledRef.current = true;
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, []);

    const waitForNextPoll = useCallback(
        () =>
            new Promise<void>((resolve) => {
                timeoutRef.current = window.setTimeout(() => {
                    timeoutRef.current = null;
                    resolve();
                }, POLL_INTERVAL_MS);
            }),
        [],
    );

    const startCheck = useCallback(
        async (sessionInfo: SessionPayload): Promise<boolean> => {
            setIsChecking(true);
            try {
                let attempt = 0;
                while (attempt < MAX_POLL_ATTEMPTS) {
                    // js-early-exit: component unmounted — abandon the loop
                    if (cancelledRef.current) return false;

                    const running = await checkAsyncProcess(sessionInfo);
                    if (!running) return true; // process finished (or never ran)

                    attempt++;
                    await waitForNextPoll();
                }
                // Still running after the bounded wait — caller decides next step
                console.warn('[useAsyncProcessCheck] async process still running after max attempts');
                return false;
            } finally {
                if (!cancelledRef.current) setIsChecking(false);
            }
        },
        [waitForNextPoll],
    );

    return { isChecking, startCheck };
}
