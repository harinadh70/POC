/**
 * GAP #17 — SetFrameTitle (Main_ISLLSYS_20010101.vbs lines 1440-1519)
 * NEW FILE: src/hooks/use-frame-title.ts
 * Purpose: mirror the legacy frame title (window title + " - " + tree path
 * label) into document.title whenever the session-store display fields change.
 */
import { useEffect } from 'react';

// hooks
import { useShallow } from 'zustand/react/shallow';

// stores
import { SessionStoreApi } from '@stores/session-store';

// ----------------------------------------------

/** Fallback when neither title part is available yet (pre-navigation). */
const DEFAULT_FRAME_TITLE = 'AQS Advantage';

/**
 * Sets document.title from session display fields.
 *
 * Legacy equivalent: SetFrameTitle concatenated the application window
 * title (windowtitle user option) with the current tree path label and
 * pushed it to top.document.title on every page cycle.
 *
 * React equivalent: windowTitle / pathLabel live on SessionStore (windowTitle
 * arrives on the navigation response, pathLabel is derived from the selected
 * tree node). This hook subscribes to both and syncs document.title.
 *
 * Mount once in RootLayout.
 */
export function useFrameTitle(): void {
    // rerender: subscribe only to the two display fields (same useShallow
    // pattern the session-store's own useSession selector uses)
    const { windowTitle, pathLabel } = SessionStoreApi(
        useShallow((state) => ({
            /** mstrWindowTitle -- application window title user option */
            windowTitle: state.windowTitle,
            /** path label of the currently selected tree node */
            pathLabel: state.pathLabel,
        })),
    );

    useEffect(() => {
        if (windowTitle && pathLabel) {
            document.title = windowTitle + ' - ' + pathLabel;
        } else if (windowTitle || pathLabel) {
            // js-early-exit: skip the " - " separator when one part is empty
            document.title = windowTitle || pathLabel;
        } else {
            document.title = DEFAULT_FRAME_TITLE;
        }
    }, [windowTitle, pathLabel]);
}
