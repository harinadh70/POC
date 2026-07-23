/**
 * GAP #38 — window_onbeforeunload (Main_ISLLSYS_20010101.vbs lines 2922-2981)
 * NEW FILE: src/hooks/use-navigation-guard.tsx
 * Purpose: warn before losing unsaved changes (mblnDataChanged). Layer 1 is a
 * beforeunload listener for browser close/refresh; layer 2 blocks in-app
 * React Router navigation and renders a confirm dialog (NavigationBlocker).
 */
import { useEffect } from 'react';
import { useBlocker } from 'react-router';
import {
    Dialog as MuiDialog,
    DialogTitle as MuiDialogTitle,
    DialogActions as MuiDialogActions,
    DialogContent as MuiDialogContent,
    Typography,
    Button,
} from '@mui/material';

// stores
import { GlobalVarsStoreApi, useGlobalVars } from '@stores/global-vars-store';

// types
import type { Blocker } from 'react-router';

// ----------------------------------------------

/** Legacy prompt text returned by window_onbeforeunload when mblnDataChanged = True. */
const UNSAVED_CHANGES_MESSAGE =
    'Changes have not been saved. If you continue you will lose your changes.';

/**
 * Guards against losing unsaved changes.
 *
 * Legacy equivalent: window_onbeforeunload set event.returnValue to the
 * warning string when mblnDataChanged was True, which made IE show the
 * native "leave this page?" prompt.
 *
 * React equivalent:
 * - Layer 1: a `beforeunload` listener (registered only while dirty) covers
 *   tab close, refresh, and external URL changes. Browsers show their own
 *   generic prompt — the custom string is ignored by modern browsers.
 * - Layer 2: React Router useBlocker covers in-app route changes, which
 *   never fire `beforeunload`. Render <NavigationBlocker /> once (RootLayout)
 *   to surface the confirm dialog when a navigation gets blocked.
 *
 * Returns the blocker for callers that want custom UI around it.
 */
export function useNavigationGuard(): Blocker {
    /** mblnDataChanged -- page-level dirty flag */
    const { dataChanged } = useGlobalVars();

    // — Layer 1: browser unload (close / refresh / external navigation) —
    useEffect(() => {
        // js-early-exit: no listener at all while the page is clean
        if (!dataChanged) return;

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            // Legacy window.event.returnValue — kept for older browser support
            event.returnValue = UNSAVED_CHANGES_MESSAGE;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dataChanged]);

    // — Layer 2: in-app React Router navigation —
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            dataChanged && currentLocation.pathname !== nextLocation.pathname,
    );

    return blocker;
}

// ----------------------------------------------

/**
 * Confirm dialog shown when useNavigationGuard blocks an in-app navigation.
 * OK = proceed with the navigation and reset the dirty flag (the page being
 * abandoned can no longer save). Cancel = stay on the page, keep the flag.
 *
 * Mount once inside RootLayout (needs router context for useBlocker).
 */
export function NavigationBlocker() {
    const blocker = useNavigationGuard();

    const handleProceed = () => {
        // Reset mblnDataChanged BEFORE proceeding so the target page starts clean
        GlobalVarsStoreApi.getState().actions.clearDataChanged();
        blocker.proceed?.();
    };

    const handleCancel = () => {
        blocker.reset?.();
    };

    return (
        <MuiDialog id="navigation-blocker-dialog" open={blocker.state === 'blocked'}>
            <MuiDialogTitle component="div" className="flex items-center justify-between">
                <Typography className="grow m-0!" variant="h6">
                    Unsaved Changes
                </Typography>
            </MuiDialogTitle>
            <MuiDialogContent className="p-4!">
                <Typography variant="body1">{UNSAVED_CHANGES_MESSAGE}</Typography>
            </MuiDialogContent>
            <MuiDialogActions className="flex items-center justify-end gap-2 p-4">
                <Button variant="contained" onClick={handleProceed}>
                    Ok
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                </Button>
            </MuiDialogActions>
        </MuiDialog>
    );
}
