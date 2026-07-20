import { postEECall } from '@/services/ee-call';

// VBS: Main_ISLLSYS #65 InfoButtonOnClick (lines 6472-6549)
// Info/lookup button: posts a calltype-driven request for its related
// field; the response's browser commands render the result (typically
// DISPLAY_MESSAGE or OPEN_MODAL).
//
// Register in the shared handler catalog (auto-discovered handlers folder)
// or bind directly to info-button controls.

type RunCommands = (commands: unknown[]) => void | Promise<void>;

export async function handlerForInfoButton(args: {
    /** The info button's related field matchcode (legacy: related control). */
    matchcode: string;
    /** Current value of the related field. */
    value: string;
    /** calltype from the button's schema binding (default INFO). */
    callType?: string;
    schema?: unknown;
    context?: unknown;
    runCommands?: RunCommands;
}): Promise<void> {
    const response = await postEECall({
        matchcode: args.matchcode,
        value: args.value,
        schema: args.schema,
        context: args.context,
        callType: args.callType ?? 'INFO',
    });
    if (response === null) return; // ee-call not configured

    const commands = (response as { commands?: unknown[] })?.commands;
    if (Array.isArray(commands) && args.runCommands) {
        await args.runCommands(commands);
    }
}

export default handlerForInfoButton;
