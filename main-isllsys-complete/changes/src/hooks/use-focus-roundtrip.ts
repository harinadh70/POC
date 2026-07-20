import { useCallback } from 'react';

import { PristineStoreApi } from '@/stores/pristine-store';
import { postEECall } from '@/services/ee-call';

// VBS: Main_ISLLSYS #70 OnFocusHandler (lines 6878-7274, the edit-loop heart)
//    + #74 PreProcess     (lines 7432-7522)
//
// Legacy fired on every focus change:
//  POST-PROCESS the field being LEFT: if its value changed vs baseline and
//    it declares a server call, build payload, post, apply the returned
//    browser commands (which may set other fields, load combos, message).
//  PRE-PROCESS the field being ENTERED: capture baseline; run combo
//    pre-call for on-demand lists.
//
// Integration (merge point in field-renderer.tsx):
//   const { onFieldFocus, onFieldBlur } = useFocusRoundtrip(schema, context, runCommands);
//   <input onFocus={() => onFieldFocus(mc, value)} onBlur={() => onFieldBlur(mc, value)} ... />
//
// `runCommands` is the repo's existing handlerForBrowserCommands bound with
// its CommandHandlers — passed in so this hook has zero coupling to the
// repo's command module shape.

interface FieldSchemaLike {
    matchcode?: string;
    calls?: unknown[];
    serverEE?: boolean;
    preprocess?: boolean;
    [key: string]: unknown;
}

interface SchemaLike {
    fields?: FieldSchemaLike[];
    [key: string]: unknown;
}

type RunCommands = (commands: unknown[]) => void | Promise<void>;

function findField(schema: SchemaLike | undefined, matchcode: string): FieldSchemaLike | undefined {
    return schema?.fields?.find(
        (f) => (f.matchcode ?? '').toLowerCase() === matchcode.toLowerCase(),
    );
}

function hasServerCall(field: FieldSchemaLike | undefined): boolean {
    if (!field) return false;
    if (field.serverEE === true) return true;
    return Array.isArray(field.calls) && field.calls.length > 0;
}

export function useFocusRoundtrip(
    schema: SchemaLike | undefined,
    context: unknown,
    runCommands?: RunCommands,
) {
    // PRE-PROCESS (#74): baseline capture + optional combo pre-call
    const onFieldFocus = useCallback(
        (matchcode: string, value: string): void => {
            PristineStoreApi.getState().actions.capture(matchcode, value);

            const field = findField(schema, matchcode);
            if (field?.preprocess === true) {
                void postEECall({
                    matchcode,
                    value,
                    schema,
                    context,
                    callType: 'PREPROCESS',
                }).then((response) => applyResponse(response, runCommands));
            }
        },
        [schema, context, runCommands],
    );

    // POST-PROCESS (#70): changed + declares a call -> post + run commands
    const onFieldBlur = useCallback(
        async (matchcode: string, value: string): Promise<void> => {
            const pristine = PristineStoreApi.getState().actions;
            if (!pristine.isDirty(matchcode, value)) return;

            const field = findField(schema, matchcode);
            if (!hasServerCall(field)) return;

            const response = await postEECall({
                matchcode,
                value,
                schema,
                context,
                callType: 'POSTPROCESS',
            });
            applyResponse(response, runCommands);

            // the posted value becomes the new baseline (legacy behavior)
            pristine.capture(matchcode, value);
        },
        [schema, context, runCommands],
    );

    return { onFieldFocus, onFieldBlur };
}

function applyResponse(response: unknown, runCommands?: RunCommands): void {
    if (!response || !runCommands) return;
    const commands = (response as { commands?: unknown[] }).commands;
    if (Array.isArray(commands) && commands.length > 0) {
        void runCommands(commands);
    }
}

export default useFocusRoundtrip;
