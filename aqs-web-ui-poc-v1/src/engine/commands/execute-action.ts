import type { ControlDef, ExecuteActionResult, SessionInfo } from '@/types';
import { api } from '@/engine/api/client';
import { dispatchCommands } from './dispatch';
import { usePageStore } from '@/stores/page-store';
import { useBrowserCommandStore } from '@/stores/browser-command-store';

/**
 * executeAction — the React port of the legacy Data Strategy / Execute Action
 * (SDD §2.3.1) and the VBS frame switch (Main_ISLLSYS_20010101.vbs).
 *
 * A control event (change / button click) → call the Page Layout API → take the
 * result's frame + commands and route them. This is the single choke-point for
 * "user did something", so behaviour stays consistent across every LOB.
 */
export interface ActionRequest {
  session: SessionInfo;
  matchcode: string;
  action?: string;
  value?: unknown;
}

export async function executeAction(
  req: ActionRequest,
  navigate: (pageId: string) => void,
): Promise<ExecuteActionResult> {
  const { controls } = usePageStore.getState();
  const formData = Object.fromEntries(
    Object.values(controls).map((c: ControlDef) => [c.matchcode, c.value]),
  );

  const result = await api.pageLayout(req.session, {
    matchcode: req.matchcode,
    action: req.action,
    value: req.value,
    formData,
  });

  // Apply whatever the server told us to do.
  const { navigateTo } = dispatchCommands(result.commands);

  // Frame decides the shell-level effect (MODAL/NEWWINDOW/HIDDEN/MAIN).
  switch (result.frame) {
    case 'MODAL':
      useBrowserCommandStore
        .getState()
        .openModal({ type: 'OPEN_WINDOW', pageId: result.navigateTo });
      break;
    case 'MAIN':
      if (result.navigateTo ?? navigateTo) navigate((result.navigateTo ?? navigateTo)!);
      break;
    case 'NEWWINDOW':
    case 'HIDDEN':
    default:
      break;
  }

  return result;
}
