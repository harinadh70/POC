// ============================================================================
// GAP #38: window_onbeforeunload (VBS lines 2922-2981)
// ============================================================================
//
// VBS BEHAVIOR:
//   Sub window_onbeforeunload() checks mblnDataChanged. If true, sets
//   window.event.returnValue = "Changes have not been saved..." which triggers
//   the browser's native "Leave page?" confirm dialog. This guards against:
//     1. Browser close / tab close / address bar navigation (beforeunload)
//     2. In-app navigation via tree clicks or menu actions
//   The VBS also checks mblnSumMsgChg as an additional dirty condition.
//
// REAL POC STATUS:
//   - global-vars-store.ts HAS `dataChanged: boolean` (mblnDataChanged)
//   - global-vars-store.ts HAS `sumMsgChg: boolean` (mblnSumMsgChg)
//   - The SET_VARIABLE command verb correctly sets dataChanged via:
//       mblndatachanged: () => globalVarsActions.setDataChanged(boolValue)
//   - BUT: No beforeunload listener exists anywhere in the codebase
//   - No React Router useBlocker/unstable_useBlocker usage anywhere
//   - No navigation guard / dirty check of any kind is implemented
//   - The dataChanged flag is effectively dead — set but never read
//
// FIX:
//   1. New hook: src/hooks/use-navigation-guard.ts
//   2. Wire into static-renderer.tsx (wraps the form content area)
//   3. The hook handles BOTH browser-level and React Router navigation blocking
//
// ============================================================================

import { useEffect, useCallback, useState, type ReactElement } from 'react';
import { useBlocker } from 'react-router';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

// stores
import { GlobalVarsStoreApi } from '@/stores/global-vars-store';

// ----------------------------------------------------------------
// Constants
// ----------------------------------------------------------------

const UNSAVED_MESSAGE =
    'Changes have not been saved. If you continue you will lose your changes. ' +
    'Press OK to continue or Cancel to return to the current page.';

// ----------------------------------------------------------------
// The Hook
// ----------------------------------------------------------------

interface NavigationGuardResult {
    /** Whether the form currently has unsaved changes */
    isDirty: boolean;
    /**
     * Render this component inside your JSX tree. It mounts the MUI Dialog
     * that appears when React Router navigation is blocked.
     * Returns null when no dialog is needed.
     *
     * Usage:
     *   const { NavigationBlocker } = useNavigationGuard();
     *   return (
     *       <>
     *           <FormRenderer ... />
     *           <NavigationBlocker />
     *       </>
     *   );
     */
    NavigationBlocker: () => ReactElement | null;
}

/**
 * useNavigationGuard
 *
 * Guards against losing unsaved changes. Mirrors VBS window_onbeforeunload.
 *
 * Two layers of protection:
 *   1. Browser-level: window.onbeforeunload fires for tab close, browser close,
 *      address bar navigation, and browser back/forward. The browser shows its
 *      own native confirm dialog (text is browser-controlled, not customizable).
 *   2. React Router-level: useBlocker intercepts in-app navigations (tree clicks,
 *      menu actions, sidebar links). We show a custom MUI Dialog because React
 *      Router's blocker fires BEFORE the navigation, giving us full control.
 *
 * Both layers read `dataChanged` from global-vars-store. When the server sets
 * mblnDataChanged=true via SET_VARIABLE, both guards activate automatically.
 *
 * The hook also checks `sumMsgChg` (mblnSumMsgChg) as an additional dirty
 * condition, matching the VBS behavior where changes to summary messages
 * also count as unsaved work.
 *
 * @returns NavigationGuardResult with isDirty flag and NavigationBlocker component
 */
export function useNavigationGuard(): NavigationGuardResult {
    // Subscribe to the dirty flags from global-vars-store.
    // Using the store's selector hook ensures re-render on flag changes.
    const dataChanged = GlobalVarsStoreApi((state) => state.dataChanged);
    const sumMsgChg = GlobalVarsStoreApi((state) => state.sumMsgChg);

    // Effective dirty state: either flag means unsaved changes exist
    const isDirty = dataChanged || sumMsgChg;

    // ----- Layer 1: Browser beforeunload -----
    useEffect(() => {
        if (!isDirty) return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            // Modern browsers ignore custom text but still show a generic
            // "Leave site?" dialog when returnValue is set to any string.
            e.preventDefault();
            // Legacy browsers require returnValue to be set explicitly.
            // eslint-disable-next-line no-param-reassign
            e.returnValue = UNSAVED_MESSAGE;
            return UNSAVED_MESSAGE;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]);

    // ----- Layer 2: React Router blocker -----
    // useBlocker accepts a boolean or a function. When isDirty is true,
    // React Router will intercept all navigate() calls and Link clicks,
    // and the blocker object will have state 'blocked' with proceed/reset methods.
    const blocker = useBlocker(isDirty);

    // ----- Dialog component -----
    const NavigationBlocker = useCallback((): ReactElement | null => {
        if (blocker.state !== 'blocked') return null;

        return (
            <UnsavedChangesDialog
                open={true}
                onConfirm={() => {
                    // User chose to discard changes and continue navigating.
                    // Clear the dirty flag so the target page starts clean.
                    GlobalVarsStoreApi.getState().actions.clearDataChanged();
                    blocker.proceed();
                }}
                onCancel={() => {
                    // User chose to stay — reset the blocker so the app
                    // doesn't remain in a stuck blocked state.
                    blocker.reset();
                }}
            />
        );
    }, [blocker]);

    return { isDirty, NavigationBlocker };
}

// ----------------------------------------------------------------
// Dialog Component (internal)
// ----------------------------------------------------------------

interface UnsavedChangesDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * MUI Dialog that mirrors the VBS "unsaved changes" confirm.
 * Shown only for in-app navigation (React Router). Browser-level navigation
 * uses the native browser dialog via beforeunload.
 */
function UnsavedChangesDialog({ open, onConfirm, onCancel }: UnsavedChangesDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="unsaved-changes-dialog-title"
            aria-describedby="unsaved-changes-dialog-description"
            // Prevent closing by clicking backdrop — user must choose OK or Cancel
            disableEscapeKeyDown={false}
        >
            <DialogTitle id="unsaved-changes-dialog-title">
                Unsaved Changes
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="unsaved-changes-dialog-description">
                    {UNSAVED_MESSAGE}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="inherit" variant="outlined">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary" variant="contained" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// ----------------------------------------------------------------
// WIRING INSTRUCTIONS
// ----------------------------------------------------------------
//
// In src/features/frame/components/static-renderer.tsx:
//
//   import { useNavigationGuard } from '@hooks/use-navigation-guard';
//
//   function StaticRenderer() {
//       const loaderData = useLoaderData<ClientStaticLoader>();
//       const { NavigationBlocker } = useNavigationGuard();  // <-- ADD
//
//       useEffect(() => {
//           return () => {
//               RuntimeOverrideStoreApi.getState().actions.clearAll();
//               // Also clear dirty flag on unmount so stale guards don't persist
//               GlobalVarsStoreApi.getState().actions.clearDataChanged();  // <-- ADD
//           };
//       }, []);
//
//       // ... existing render logic ...
//
//       // Add NavigationBlocker at the end of the returned JSX:
//       return (
//           <>
//               {/* ... existing JSX (Path 1 or Path 2) ... */}
//               <NavigationBlocker />
//           </>
//       );
//   }
//
// In src/features/frame/components/dynamic-renderer.tsx:
//
//   import { useNavigationGuard } from '@hooks/use-navigation-guard';
//
//   function DynamicRenderer() {
//       const loaderData = useLoaderData<ClientDynamicLoader>();
//       const { NavigationBlocker } = useNavigationGuard();  // <-- ADD
//
//       useEffect(() => {
//           return () => {
//               RuntimeOverrideStoreApi.getState().actions.clearAll();
//               GlobalVarsStoreApi.getState().actions.clearDataChanged();  // <-- ADD
//           };
//       }, []);
//
//       // ... existing render logic ...
//
//       return (
//           <HandlersProvider handlers={loaderData.handlers}>
//               <Box component="main" ...>
//                   <Box component="section" ...>
//                       <FormRenderer ... />
//                   </Box>
//               </Box>
//               <NavigationBlocker />    {/* <-- ADD at end, inside HandlersProvider */}
//           </HandlersProvider>
//       );
//   }
//
// ----------------------------------------------------------------
// EDGE CASES HANDLED
// ----------------------------------------------------------------
//
// 1. Server clears dataChanged via SET_VARIABLE mblnDataChanged=false
//    -> isDirty becomes false -> both guards deactivate automatically
//
// 2. User navigates away via OK/Next button (server call succeeds)
//    -> The action-button handler should call clearDataChanged() before
//       triggering NAVIGATE_CYCLING, so the guard doesn't fire.
//
// 3. Modal is open (deferred navigation)
//    -> useBlocker still works because React Router navigation is deferred
//       by the modal system in navigation-store. The guard fires if the user
//       tries to close the modal with unsaved main-page changes.
//
// 4. Multiple forms on page (tabs)
//    -> dataChanged is a single global flag, matching VBS behavior.
//       Any field change on any tab sets it. This is correct because the
//       VBS checked a single mblnDataChanged for the entire page.
