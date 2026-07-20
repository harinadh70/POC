// VBS: Main_ISLLSYS #7 LogoutMain (lines 530-587) + #8 Logout (lines 590-650)
// SPA logout = clear auth + reset EVERY store + route to /login.
// (Legacy closed all child windows; the SPA equivalent is store resets.)

import { SessionStoreApi } from '@/stores/session-store';
import { GlobalVarsStoreApi } from '@/stores/global-vars-store';
import { RuntimeOverrideStoreApi } from '@/stores/runtime-override-store';
import { TreeStoreApi } from '@/stores/tree-store';
import { PristineStoreApi } from '@/stores/pristine-store';

/**
 * Reset all client state. Auth clearing stays with the repo's existing
 * logout action (auth-store) — call this right after it:
 *
 *   authLogout();          // repo's existing action / route
 *   resetAllStores();      // this
 *   navigate('/login');
 */
export function resetAllStores(): void {
    const tryReset = (fn: (() => void) | undefined) => {
        try {
            fn?.();
        } catch (err) {
            console.warn('[app-logout] store reset failed:', err);
        }
    };

    tryReset(SessionStoreApi.getState()?.actions?.clearSession);
    tryReset(GlobalVarsStoreApi.getState()?.actions?.reset);
    tryReset(RuntimeOverrideStoreApi.getState()?.actions?.clearAll);
    tryReset(PristineStoreApi.getState()?.actions?.clear);
    tryReset(
        (TreeStoreApi.getState()?.actions as { resetTree?: () => void } | undefined)
            ?.resetTree,
    );
}

export default resetAllStores;
