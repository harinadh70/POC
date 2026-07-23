// ============================================================================
// GAP #25: UpdateToolBar (VBS lines 2091-2177) — NEW FILE
// Target: src/components/ui/action-toolbar.tsx
// Assembles the page-level action button row from the layout tree's button
// nodes. VBS rebuilt the toolbar imperatively after every navigation; here the
// toolbar subscribes to runtime-override-store, so security (GAP #45 resolver)
// and server SET_VISIBLE/SET_DISABLED commands re-render it automatically.
// ============================================================================

import { Box } from '@mui/material';

// components
import { ActionButton } from '@components/ui/action-button';

// stores
import { RuntimeOverrideStoreApi } from '@stores/runtime-override-store';

// types
import type { ControlNode } from '@/types/layout';

// ----------------------------------------------
// ActionToolbar
// Renders the page action buttons (SAVE, OK, NEXT, CANCEL, DELETE, PRINT...)
// for the current page. `buttons` are the action-button ControlNodes the
// layout builder collected for the page (same nodes form-renderer feeds to
// ActionButton individually today).
//
// Per-button behavior stays inside ActionButton:
//   - required-field gate disable            (GAP #48, use-required-gate)
//   - EE onClick bindings                    (form-action-executor)
// The toolbar layer only decides WHICH buttons render:
//   - runtime override visible === false     → button is hidden
//     (written by applySecurityPolicy (GAP #45) and SET_VISIBLE commands)
// ----------------------------------------------

interface ActionToolbarProps {
    buttons: ControlNode[];
}

function ActionToolbar({ buttons }: ActionToolbarProps) {
    /** Subscribe to the whole overrides map so security / server commands
     *  (SET_VISIBLE, SET_DISABLED) rebuild the toolbar — the VBS UpdateToolBar
     *  re-run is replaced by this reactive subscription. */
    const overrides = RuntimeOverrideStoreApi((state) => state.overrides);

    const visibleButtons = buttons.filter(
        (node) => overrides[node.field.matchcode]?.visible !== false,
    );

    if (visibleButtons.length === 0) {
        return null;
    }

    return (
        <Box
            component="div"
            role="toolbar"
            sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: 2,
                py: 1,
            }}
        >
            {visibleButtons.map((node) => (
                <ActionButton key={node.field.matchcode} node={node} />
            ))}
        </Box>
    );
}

export { ActionToolbar };
