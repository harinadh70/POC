import { postRaw } from '@/services/ee-call';
import { SessionStoreApi } from '@/stores/session-store';

// VBS: Main_ISLLSYS #20 CheckForAsynchProcess (lines 1364-1424)
// Pre-flight before certain navigations: ask the server whether an async
// background job (e.g. rating) is still running for this policy; if so the
// caller shows a "please wait" message instead of navigating.

export interface AsyncCheckResult {
    running: boolean;
    message?: string;
}

export async function checkForAsyncProcess(): Promise<AsyncCheckResult> {
    const session = SessionStoreApi.getState();
    const payload = {
        ...((session?.actions?.toPayload?.() as object) ?? {}),
        action: 'CHECKASYNCH',
    };

    const response = await postRaw(payload);
    if (response === null) return { running: false }; // ee-call not configured

    const r = response as { running?: boolean; status?: string; message?: string };
    return {
        running: r.running === true || r.status === 'RUNNING',
        message: r.message,
    };
}

export default checkForAsyncProcess;
