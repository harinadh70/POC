// ============================================================================
// GAP #25: UpdateToolBar (VBS lines 2091-2177)
// ============================================================================
//
// VBS BEHAVIOR:
//   Sub UpdateToolBar() is called after every navigation to rebuild the
//   toolbar. It:
//     1. Reads the current page's action list from the session/navigation
//     2. Creates toolbar buttons for each allowed action (SAVE, DELETE,
//        RATE, SUBMIT, PRINT, etc.)
//     3. Enables/disables buttons based on security permissions and form state
//     4. Listens for form dirty state to enable SAVE
//     5. Listens for security policy to hide restricted actions
//
// REAL POC STATUS:
//   - action-button.tsx (src/components/action-buttons.tsx) renders action
//     buttons from raw API controls. It handles 17+ matchcodes with proper
//     ordering, variant mapping, and runtime overrides (buttonOverrides prop).
//   - ACTION_CONFIG (constants) defines known action types.
//   - The changes/src/components/action-toolbar.tsx has a simple reactive
//     toolbar that subscribes to runtime-override-store for enable/disable.
//   - BUT: there is no CONTAINER component that:
//     a) Assembles the right set of toolbar items per page context
//     b) Bridges security permissions to runtime overrides
//     c) Integrates with form dirty state for SAVE button enabling
//
// FIX:
//   A PageActionToolbar component that:
//   - Reads allowed actions from navigation response or page schema
//   - Applies security policy (from auth-store permissions)
//   - Integrates with form dirty state (from pristine-store)
//   - Delegates rendering to ActionToolbar / ActionButtons
//
// WHERE TO ADD: src/components/page-action-toolbar.tsx
// WIRE INTO: static-renderer.tsx or layout wrapper
// ============================================================================

import { useMemo, useCallback } from 'react';
import { Box, Button, Divider } from '@mui/material';

import { SessionStoreApi } from '@/stores/session-store';
import { useRuntimeOverride, RuntimeOverrideStoreApi } from '@/stores/runtime-override-store';
import { resolveControlSecurity } from '@/utils/security-resolver';

import type { SecurityMode } from '@/utils/security-resolver';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Shape of an action item from the navigation/page response. */
export interface PageAction {
    /** Action identifier — matches ACTION_CONFIG keys (SAVE, DELETE, etc.). */
    id: string;
    /** Display label (may be overridden by schema or server). */
    label: string;
    /** Whether this action requires security check. Default: true. */
    secured?: boolean;
    /** Security mode for this action. Default: 'allow'. */
    securityMode?: SecurityMode;
    /** Whether this action is only enabled when the form is dirty. */
    requiresDirty?: boolean;
}

interface PageActionToolbarProps {
    /**
     * List of actions available for the current page. Typically from the
     * navigation response or page schema's action list.
     *
     * If not provided, falls back to a default toolbar set based on
     * the current page type (detail page vs search page).
     */
    actions?: PageAction[];

    /**
     * Security permissions from auth-store. Passed down so the toolbar
     * can resolve per-action security without importing auth-store directly.
     */
    permissions?: unknown;

    /** Current LOB identifier for security resolution. */
    lob?: string;

    /** Current page identifier for security resolution. */
    page?: string;

    /** Whether the form has unsaved changes (from pristine-store). */
    isDirty?: boolean;

    /** Called when any toolbar action is clicked. */
    onAction: (actionId: string) => void;
}

// ---------------------------------------------------------------------------
// Default Action Sets
// ---------------------------------------------------------------------------
// VBS UpdateToolBar assembled different button sets depending on page context.
// These defaults match the most common configurations.

const DETAIL_PAGE_ACTIONS: PageAction[] = [
    { id: 'SAVE', label: 'Save', requiresDirty: true },
    { id: 'DELETE', label: 'Delete', secured: true },
    { id: 'RATE', label: 'Rate', secured: true },
    { id: 'SUBMIT', label: 'Submit', secured: true },
];

const SEARCH_PAGE_ACTIONS: PageAction[] = [
    { id: 'SEARCH', label: 'Search' },
    { id: 'ADD', label: 'Add New', secured: true },
    { id: 'CLEAR', label: 'Clear' },
];

// ---------------------------------------------------------------------------
// ToolbarButton — individual action button with security + state awareness
// ---------------------------------------------------------------------------

interface ToolbarButtonProps {
    action: PageAction;
    permissions?: unknown;
    lob?: string;
    page?: string;
    isDirty?: boolean;
    onAction: (actionId: string) => void;
}

function ToolbarButton({
    action,
    permissions,
    lob,
    page,
    isDirty,
    onAction,
}: ToolbarButtonProps) {
    // Subscribe to runtime overrides — security resolver and required gate
    // write into this store, making the button reactive.
    const override = useRuntimeOverride(action.id);

    // Compute effective disabled/visible state from multiple sources
    const effectiveState = useMemo(() => {
        let visible = true;
        let disabled = false;

        // Source 1: Security permissions
        if (action.secured !== false && permissions && lob && page) {
            const security = resolveControlSecurity(
                permissions,
                lob,
                page,
                action.id,
                action.securityMode ?? 'allow',
            );
            if (security.visible === false) visible = false;
            if (security.disabled === true) disabled = true;
        }

        // Source 2: Runtime overrides (from required gate, browser commands)
        if (override?.visible === false) visible = false;
        if (override?.disabled === true) disabled = true;

        // Source 3: Dirty-state gating (SAVE only enabled when form is dirty)
        if (action.requiresDirty && !isDirty) {
            disabled = true;
        }

        return { visible, disabled };
    }, [action, permissions, lob, page, override, isDirty]);

    // Don't render hidden actions
    if (!effectiveState.visible) return null;

    return (
        <Button
            size="small"
            variant={action.id === 'SAVE' ? 'contained' : 'outlined'}
            disabled={effectiveState.disabled}
            onClick={() => onAction(action.id)}
        >
            {action.label}
        </Button>
    );
}

// ---------------------------------------------------------------------------
// PageActionToolbar — the assembled toolbar
// ---------------------------------------------------------------------------

/**
 * PageActionToolbar
 *
 * Full toolbar component that mirrors VBS UpdateToolBar. Assembles action
 * buttons for the current page, applies security and form-state gating,
 * and delegates click handling to the parent.
 *
 * Usage:
 *   <PageActionToolbar
 *       actions={schema.actions}       // from page schema
 *       permissions={authStore.permissions}
 *       lob={session.lob}
 *       page={session.currentPage}
 *       isDirty={pristineStore.isDirty}
 *       onAction={handleToolbarAction}
 *   />
 *
 * The onAction callback receives the action ID (e.g., "SAVE", "DELETE")
 * and should dispatch to executeAction or the appropriate handler.
 */
export function PageActionToolbar({
    actions,
    permissions,
    lob,
    page,
    isDirty = false,
    onAction,
}: PageActionToolbarProps) {
    // Use provided actions or fall back to defaults
    const actionList = actions ?? DETAIL_PAGE_ACTIONS;

    const handleAction = useCallback(
        (actionId: string) => {
            onAction(actionId);
        },
        [onAction],
    );

    // No actions to show — render nothing
    if (actionList.length === 0) return null;

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                px: 2,
                py: 0.5,
                alignItems: 'center',
                borderBottom: 1,
                borderColor: 'divider',
            }}
        >
            {actionList.map((action, idx) => (
                <ToolbarButton
                    key={action.id}
                    action={action}
                    permissions={permissions}
                    lob={lob}
                    page={page}
                    isDirty={isDirty}
                    onAction={handleAction}
                />
            ))}
        </Box>
    );
}

export { DETAIL_PAGE_ACTIONS, SEARCH_PAGE_ACTIONS };
export default PageActionToolbar;

// ---------------------------------------------------------------------------
// INTEGRATION: Wire into static-renderer.tsx
// ---------------------------------------------------------------------------
//
// In src/features/frame/components/static-renderer.tsx, add the toolbar
// between the breadcrumb and the form content:
//
//   import { PageActionToolbar } from '@/components/page-action-toolbar';
//   import { PristineStoreApi } from '@/stores/pristine-store';
//   // auth-store import for permissions:
//   import { useAuthStore } from '@/stores/auth-store';
//
//   function SchemaRenderer() {
//       const loaderData = useLoaderData<ClientStaticLoader>();
//       const permissions = useAuthStore((s) => s.permissions);
//       const isDirty = PristineStoreApi((s) => s.isDirty);
//       const session = SessionStoreApi.getState();
//
//       // ... existing schema processing ...
//
//       return (
//           <Box component="main" ...>
//               <Breadcrumb ... />
//
//               {/* >>> GAP #25: Page action toolbar */}
//               <PageActionToolbar
//                   actions={schema?.actions as PageAction[] | undefined}
//                   permissions={permissions}
//                   lob={session.lob}
//                   page={schema?.pageHeader?.pageName as string}
//                   isDirty={isDirty}
//                   onAction={(actionId) => {
//                       // Dispatch to executeAction or the action handler
//                       void executeAction(actionId);
//                   }}
//               />
//               {/* <<< GAP */}
//
//               <Box component="section" ...>
//                   <FormRenderer ... />
//               </Box>
//           </Box>
//       );
//   }
//
// The toolbar is fully reactive:
//   - Security changes (login/logout) -> permissions prop changes -> re-evaluate
//   - Form edits -> isDirty changes -> SAVE button enables/disables
//   - Browser commands -> runtime-override-store -> buttons react individually
