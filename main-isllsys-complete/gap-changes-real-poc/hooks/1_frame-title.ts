// ============================================================================
// GAP #17: SetFrameTitle (VBS lines 1440-1519)
// ============================================================================
//
// VBS BEHAVIOR:
//   Sub SetFrameTitle() reads mstrWindowTitle (from useroptions>uservalues>
//   group(name=application)>uservalue(name=windowtitle)) and mstrPathLabel
//   (set by cycling API response's pathDescription field). It concatenates:
//     document.title = mstrWindowTitle & " - " & mstrPathLabel
//   If mstrPathLabel is empty, just mstrWindowTitle.
//   If mstrWindowTitle is empty, falls back to "AQS Advantage".
//
// REAL POC STATUS:
//   - Session store (src/stores/session-store.ts) has NO windowTitle field.
//   - Navigation store (src/stores/navigation-store.ts) has NO pathLabel field.
//   - The cycling API response DOES return `pathLabel` and `title` — confirmed in
//     ResponseDisplaySchema (src/services/page-navigation.ts line 78-79):
//       pathLabel: z.string().trim().nullable(),
//       title: z.string().trim().nullable(),
//     But neither value is consumed or stored anywhere in the UI.
//   - document.title is never set anywhere in the codebase.
//   - No SetFrameTitle or SET_FRAMETITLE command verb exists in command.ts.
//
// FIX:
//   1. Add windowTitle + pathLabel to session-store.ts
//   2. New hook: src/hooks/use-frame-title.ts
//   3. Wire into static-renderer.tsx and dynamic-renderer.tsx
//   4. Add SET_FRAMETITLE verb to command.ts for server-driven title overrides
//
// ============================================================================

import { useEffect } from 'react';

// stores
import { SessionStoreApi } from '@/stores/session-store';

// ----------------------------------------------------------------
// STEP 1: Session Store Additions
// ----------------------------------------------------------------
// ADD these fields to the Session interface in src/types/common.ts:
//
//   export interface Session {
//       // ... existing fields ...
//       /** Window title from useroptions — set once at login, rarely changes. */
//       windowTitle: string;      // mstrWindowTitle
//       /** Path description from cycling API — changes on every navigation. */
//       pathLabel: string;        // mstrPathLabel / mstrPathDescription
//   }
//
// ADD defaults to session-store.ts defaultSession:
//
//   const defaultSession: Omit<Session, never> = {
//       // ... existing defaults ...
//       windowTitle: '',
//       pathLabel: '',
//   };
//
// The existing setSession action already handles Partial<Session> updates,
// so no new actions are needed — callers use:
//   SessionStoreApi.getState().actions.setSession({ windowTitle: '...', pathLabel: '...' });

// ----------------------------------------------------------------
// STEP 2: Consume pathLabel from Cycling API Response
// ----------------------------------------------------------------
// In src/utils/execute-action.ts (or wherever the cycling response is handled),
// after parsing PageNavigationResponseSchema, store the pathLabel:
//
//   const cyclingResult = PageNavigationResponseSchema.safeParse(response);
//   if (cyclingResult.success) {
//       const { pathLabel, title } = cyclingResult.data;
//       SessionStoreApi.getState().actions.setSession({
//           pathLabel: pathLabel ?? '',
//           // `title` from cycling could also be used as a frame-level override
//       });
//   }
//
// NOTE: windowTitle is set ONCE at login from the user-permissions / user-info
// API response. When the navigation API enrichment gap (Fulcrum MEMORY.md) is
// implemented, windowTitle will come from the Navigation API's GetValue call.
// Until then, extract it from the user-info service response at login time.

// ----------------------------------------------------------------
// STEP 3: The Hook
// ----------------------------------------------------------------

const DEFAULT_TITLE = 'AQS Advantage';

/**
 * useFrameTitle
 *
 * Reads windowTitle and pathLabel from session-store and keeps
 * document.title in sync. Mirrors VBS SetFrameTitle().
 *
 * Format: "{windowTitle} - {pathLabel}"
 *   - If pathLabel is empty: just windowTitle
 *   - If windowTitle is empty: "AQS Advantage"
 *   - If both empty: "AQS Advantage"
 *
 * Usage:
 *   function StaticRenderer() {
 *       useFrameTitle();          // <-- just call it, no args needed
 *       const loaderData = ...
 *   }
 *
 * @param overridePathLabel - Optional path label override (e.g., from loader data).
 *   When provided, uses this instead of the store value. Useful when the cycling
 *   response is available in loader data before the store is updated.
 */
export function useFrameTitle(overridePathLabel?: string): void {
    // Subscribe to relevant session-store fields.
    // Using getState() + useEffect dependency on the values ensures we
    // re-run only when the title components actually change.
    const windowTitle = SessionStoreApi((state) => state.windowTitle);
    const storePathLabel = SessionStoreApi((state) => state.pathLabel);

    const pathLabel = overridePathLabel ?? storePathLabel;

    useEffect(() => {
        const base = windowTitle || DEFAULT_TITLE;
        const trimmedPath = (pathLabel ?? '').trim();

        if (trimmedPath.length > 0) {
            document.title = `${base} - ${trimmedPath}`;
        } else {
            document.title = base;
        }

        // Cleanup: restore default title on unmount so stale titles don't linger
        // during route transitions (the next route's useFrameTitle will set its own).
        return () => {
            document.title = DEFAULT_TITLE;
        };
    }, [windowTitle, pathLabel]);
}

// ----------------------------------------------------------------
// STEP 4: SetFrameTitle Command Verb Handler
// ----------------------------------------------------------------
// The server may push a SET_FRAMETITLE browser command to override the title.
// VBS handled this as a command verb in handlerForBrowserCommands.
//
// ADD this case to the switch in src/handlers/common/command.ts:
//
//   case 'SET_FRAMETITLE': {
//       // noun = new pathLabel text, addinf = '' (unused)
//       // Update the session store; useFrameTitle hook will react automatically.
//       sessionStore.actions.setSession({ pathLabel: cmd.noun });
//       break;
//   }
//
// AND add 'SET_FRAMETITLE' to the BrowserVerb union in src/types/common.ts:
//
//   export type BrowserVerb =
//       | 'SET_FRAMETITLE'
//       // ... existing verbs ...

// ----------------------------------------------------------------
// STEP 5: Wire Into Renderers
// ----------------------------------------------------------------
// In src/features/frame/components/static-renderer.tsx:
//
//   import { useFrameTitle } from '@hooks/use-frame-title';
//
//   function StaticRenderer() {
//       const loaderData = useLoaderData<ClientStaticLoader>();
//       useFrameTitle();  // <-- ADD THIS LINE after useLoaderData
//       // ... rest of component
//   }
//
// In src/features/frame/components/dynamic-renderer.tsx:
//
//   import { useFrameTitle } from '@hooks/use-frame-title';
//
//   function DynamicRenderer() {
//       const loaderData = useLoaderData<ClientDynamicLoader>();
//       useFrameTitle();  // <-- ADD THIS LINE after useLoaderData
//       // ... rest of component
//   }
//
// OPTIONAL: If the cycling response is available in loaderData.context:
//   useFrameTitle(loaderData.context.pathLabel);
// This sets the title immediately from loader data, before the store updates.

// ----------------------------------------------------------------
// STEP 6: Set windowTitle at Login
// ----------------------------------------------------------------
// In the login flow (src/features/auth/utils/action.ts or wherever user-info
// is fetched), after successfully loading user data:
//
//   // user-info API returns windowTitle in the response
//   const userInfo = await fetchUserInfo(credentials);
//   SessionStoreApi.getState().actions.setSession({
//       userId: userInfo.userId,
//       // ... other session fields ...
//       windowTitle: userInfo.windowTitle ?? 'AQS Advantage',
//   });
//
// If windowTitle comes from a separate configuration endpoint (matching the
// Fulcrum GetValue("application","windowtitle") pattern), call that at login
// and store the result the same way.
