// VBS: Main_ISLLSYS #15 ParentWindow_Navigate (lines 875-901)
//    + #75 RunXMLBrowserProcedures (lines 7525-7603)
// Handler-catalog additions. Files in the handlers/common folder are
// auto-discovered (import.meta.glob) and registered into
// window.frameHandlerRegistry — same mechanism as shared.ts.

import { drainNextAction } from '@utils/deferred-navigation';

/**
 * #15: "back to search" — legacy focused the parent search window,
 * reopening it if closed. SPA: navigate to the search route.
 * The navigate fn arrives via the handler context (registry call arg).
 */
export function navigateBackToSearch(args?: { navigate?: (to: string) => void }): void {
    args?.navigate?.('/');
}

/**
 * #75: run page-declared browser procedures by calls-type. Legacy executed
 * VBScript routines by name (browser_windowonload, "tab|<matchcode>").
 * SPA: forward each declared name to the handler registry — per-page
 * handler files export functions under these names.
 */
export async function runXmlBrowserProcedures(args: {
    callsType: string; // e.g. 'browser_windowonload' or 'tab|dtaVEH'
    context?: unknown;
    schema?: unknown;
}): Promise<void> {
    const registry = (window as unknown as {
        frameHandlerRegistry?: {
            has?: (name: string) => boolean;
            call?: (name: string, arg: unknown) => unknown;
        };
    }).frameHandlerRegistry;
    if (!registry?.call) return;

    const [kind, target] = args.callsType.split('|');
    const handlerName = target ? `${kind}_${target}` : kind;

    if (!registry.has || registry.has(handlerName)) {
        await registry.call(handlerName, { context: args.context, schema: args.schema });
    }
}

/**
 * Merge point for #43 (deferred navigation): call from the CLOSE_MODAL
 * branch in command.ts —
 *   onModalClosed((next) => executeAction(next.action, next.nodeKey));
 */
export function onModalClosed(execute: (next: { action: string; nodeKey: string; qs?: string }) => void): void {
    drainNextAction(execute);
}
