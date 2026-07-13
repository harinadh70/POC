import type { BrowserCommand } from '@/types';
import { usePageStore } from '@/stores/page-store';
import { useBrowserCommandStore } from '@/stores/browser-command-store';

/**
 * Command dispatcher — the React equivalent of legacy command-handlers.ts.
 * The backend returns a list of BrowserCommands; this routes each to the right
 * place: control mutations → page store, user-facing effects → browser-command
 * store, navigation → returned to the caller.
 *
 * Returns a navigation target if any command requests one.
 */
const CONTROL_COMMANDS = new Set([
  'SET_VISIBLE',
  'SET_DISABLED',
  'SET_READONLY',
  'SET_REQUIRED',
  'SET_TEXT',
  'SET_VARIABLE',
  'LOAD_COMBO',
  'CLEAR_COMBO',
]);

export function dispatchCommands(commands: BrowserCommand[]): { navigateTo?: string } {
  if (!commands.length) return {};

  const controlCmds = commands.filter((c) => CONTROL_COMMANDS.has(c.type));
  if (controlCmds.length) usePageStore.getState().applyCommands(controlCmds);

  const bc = useBrowserCommandStore.getState();
  let navigateTo: string | undefined;

  for (const cmd of commands) {
    switch (cmd.type) {
      case 'DISPLAY_ERROR':
        bc.notify('error', cmd.message ?? 'Error');
        break;
      case 'DISPLAY_WARNING':
        bc.notify('warning', cmd.message ?? 'Warning');
        break;
      case 'DISPLAY_MESSAGE':
      case 'DISPLAY_QUESTION':
        bc.notify('success', cmd.message ?? '');
        break;
      case 'DISPLAY_INFORMATION':
        bc.notify('info', cmd.message ?? '');
        break;
      case 'OPEN_WINDOW':
        bc.openModal(cmd);
        break;
      case 'NAVIGATE':
      case 'NAVIGATE_CYCLING':
        navigateTo = cmd.pageId;
        break;
      case 'CLOSE_MODAL':
        bc.clearModal();
        break;
      default:
        break;
    }
  }

  return { navigateTo };
}
