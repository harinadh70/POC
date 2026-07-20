import { useEffect } from 'react';
import { useBlocker } from 'react-router';

import { GlobalVarsStoreApi } from '@/stores/global-vars-store';
import { confirmDialog } from '@utils/confirm';

// VBS: Main_ISLLSYS #38 window_onbeforeunload (lines 2876-2997)
// Warn before leaving when there is unsaved data:
//  1. browser-level (tab close / hard refresh) via beforeunload
//  2. in-app navigation via React Router useBlocker + confirm dialog
// Legacy also cleared mblnDataChanged when the user chose to leave.

const MESSAGE =
    'You have unsaved changes. Do you want to leave without saving?';

export function useDirtyGuard(): void {
    const dirty = GlobalVarsStoreApi((s) => s.dataChanged);

    // 1. Tab close / hard navigation
    useEffect(() => {
        if (!dirty) return;
        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = MESSAGE; // required by Chromium to show the prompt
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [dirty]);

    // 2. In-app route change
    const blocker = useBlocker(dirty);

    useEffect(() => {
        if (blocker.state !== 'blocked') return;
        let cancelled = false;

        void confirmDialog(MESSAGE).then((leave) => {
            if (cancelled) return;
            if (leave) {
                // legacy: leaving discards — clear the flag, then continue
                GlobalVarsStoreApi.getState()?.actions?.setDataChanged?.(false);
                blocker.proceed?.();
            } else {
                blocker.reset?.();
            }
        });

        return () => {
            cancelled = true;
        };
    }, [blocker]);
}

export default useDirtyGuard;
