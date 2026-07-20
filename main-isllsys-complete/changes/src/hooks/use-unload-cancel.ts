import { useEffect } from 'react';

import { GlobalVarsStoreApi } from '@/stores/global-vars-store';
import { SessionStoreApi } from '@/stores/session-store';

// VBS: Main_ISLLSYS #39 window_onunload CANCEL branch (lines 3000-3095)
// When the user leaves an EE page mid-edit (tab close), the legacy shell
// fired a CANCEL server call so locks/temp data were released.
// SPA equivalent: navigator.sendBeacon on pagehide when dirty.
//
// Configure once at startup with the repo's endpoint:
//   configureUnloadCancel('/api/v1/ui/data');

let cancelEndpoint: string | null = null;

export function configureUnloadCancel(endpoint: string): void {
    cancelEndpoint = endpoint;
}

export function useUnloadCancel(): void {
    useEffect(() => {
        const handler = () => {
            if (!cancelEndpoint) return;
            const dirty = GlobalVarsStoreApi.getState()?.dataChanged;
            if (!dirty) return;

            const session = SessionStoreApi.getState();
            const payload = {
                ...((session?.actions?.toPayload?.() as object) ?? {}),
                action: 'CANCEL',
            };
            navigator.sendBeacon(
                cancelEndpoint,
                new Blob([JSON.stringify(payload)], { type: 'application/json' }),
            );
        };

        window.addEventListener('pagehide', handler);
        return () => window.removeEventListener('pagehide', handler);
    }, []);
}

export default useUnloadCancel;
