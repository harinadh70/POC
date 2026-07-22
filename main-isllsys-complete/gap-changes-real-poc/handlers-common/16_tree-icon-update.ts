// ============================================================================
// GAP #84: SetIconImages (VBS lines 9025-9090)
// ============================================================================
//
// VBS BEHAVIOR:
//   Sub SetIconImages(strNodeKey, strImage, strSelectedImage) is called when
//   the server response includes icon-update commands (e.g., after policy
//   status changes from "New" to "Quoted", the tree node icon changes from
//   a blank-page icon to a checkmark icon). It:
//     1. Finds the TreeView node by nodeKey
//     2. Sets node.Image = strImage (normal state icon)
//     3. Sets node.SelectedImage = strSelectedImage (selected state icon)
//   The server sends these as browser commands with verb SET_ICON.
//
// REAL POC STATUS:
//   - tree-item.tsx has a static ICON_MAP that maps icon names to MUI icons
//     or custom SVG icons. The icon is rendered based on node.image property.
//   - tree-store has updateNode() (or updateNodeImage() per our tree-actions.ts)
//     which can update any node property including the icon.
//   - tree-actions.ts (changes/src/utils/tree-actions.ts) already exports
//     updateNodeIcon(nodeKey, image) that calls tree-store's updateNodeImage.
//   - BUT: no SET_ICON command verb exists in the command handler. The server
//     sends it, but the command dispatcher ignores it.
//
// FIX:
//   1. Add SET_ICON case to the command handler switch
//   2. Wire it to tree-actions.updateNodeIcon
//
// WHERE TO MODIFY: src/utils/command-handlers.ts (CommandHandlerBuilder)
//                  or src/handlers/common/commands.ts (handler catalog)
// ============================================================================

import { updateNodeIcon } from '@/utils/tree-actions';

// ---------------------------------------------------------------------------
// STEP 1: SET_ICON Command Verb Handler
// ---------------------------------------------------------------------------
//
// The server sends SET_ICON as a BrowserCommand with:
//   verb: "SET_ICON"
//   noun: the nodeKey whose icon should change
//   addinf: the new icon name (maps to ICON_MAP in tree-item.tsx)
//   resfil: (optional) the selected-state icon name
//
// Example server response:
//   { verb: "SET_ICON", noun: "POL001", addinf: "policy_quoted", resfil: "" }

/**
 * Handle the SET_ICON command verb.
 *
 * Updates a tree node's icon via tree-store. The icon name must match
 * an entry in tree-item.tsx's ICON_MAP (e.g., "policy_new", "policy_quoted",
 * "vehicle", "driver", "coverage_active").
 *
 * @param nodeKey   - The tree node to update (from command.noun)
 * @param iconName  - The new icon name (from command.addinf)
 */
export function handleSetIcon(nodeKey: string, iconName: string): void {
    if (!nodeKey || !iconName) {
        console.warn('[SET_ICON] Missing nodeKey or iconName — skipping.', {
            nodeKey,
            iconName,
        });
        return;
    }

    // Delegate to tree-actions, which calls tree-store's updateNodeImage.
    // This triggers a reactive update — any tree-item component rendering
    // this nodeKey will re-render with the new icon.
    updateNodeIcon(nodeKey, iconName);
}

// ---------------------------------------------------------------------------
// STEP 2: Add to CommandHandlerBuilder switch
// ---------------------------------------------------------------------------
//
// In src/utils/command-handlers.ts, inside the execute() method's switch
// statement, add the SET_ICON case:
//
// EXISTING switch in CommandHandlerBuilder.build().execute():
//
//   switch (normalizedVerb) {
//       case 'SET_TEXT':
//           // ... existing handler ...
//           break;
//       case 'SET_DISABLED':
//           // ... existing handler ...
//           break;
//       // ... other cases ...
//
// +     case 'SET_ICON': {
// +         // GAP #84: Update tree node icon after status change
// +         // noun = nodeKey, addinf = icon name from ICON_MAP
// +         const nodeKey = command.noun ?? '';
// +         const iconName = command.addinf ?? '';
// +         handleSetIcon(nodeKey, iconName);
// +         break;
// +     }
//
//       default:
//           logger.debug('Unhandled command verb', { verb: normalizedVerb });
//   }
//
// ALSO add the import at the top of command-handlers.ts:
//   import { handleSetIcon } from '@/utils/tree-icon-update';
//   // OR inline the logic if you prefer to avoid the extra import

// ---------------------------------------------------------------------------
// STEP 3: Add SET_ICON to BrowserVerb union type
// ---------------------------------------------------------------------------
//
// In src/types.ts (or src/types/common.ts), add to the verb union:
//
//   export type BrowserVerb =
//       | 'SET_TEXT'
//       | 'SET_VARIABLE'
//       | 'SET_DISABLED'
//       | 'SET_REQUIRED'
//       | 'SET_VISIBLE'
//       | 'SET_READONLY'
//       | 'LOAD_COMBO'
//       | 'CLEAR_COMBO'
//       | 'NAVIGATE'
//       | 'SET_ICON'           // <-- ADD THIS
//       // ... other verbs ...

// ---------------------------------------------------------------------------
// ALTERNATIVE: Inline in the existing apply-server-commands.ts
// ---------------------------------------------------------------------------
//
// If the project uses apply-server-commands.ts instead of CommandHandlerBuilder
// for dispatching, add the handler there:
//
//   // In apply-server-commands.ts, inside the handler map:
//   const handlers: Record<string, (cmd: BrowserCommand) => void> = {
//       // ... existing handlers ...
//       SET_ICON: (cmd) => {
//           updateNodeIcon(cmd.noun ?? '', cmd.addinf ?? '');
//       },
//   };

export default handleSetIcon;
