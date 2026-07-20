// Server-call bridge for the edit loop.
//
// The client repo already owns payload building (handlers/common/payload.ts)
// and an HTTP layer (axios services). Rather than guessing endpoints, this
// module is CONFIGURED ONCE at integration with the repo's real functions —
// a single line in app startup:
//
//   configureEECall({
//       post: (payload) => xmlServerCall(payload),          // repo's service
//       buildPayload: (args) => handlerForEEData(args),     // repo's builder
//   });
//
// Until configured, calls warn once and no-op, so nothing crashes.

export interface EECallConfig {
    /** POST the payload to the server, resolve with the parsed response. */
    post?: (payload: unknown) => Promise<unknown>;
    /** Build the outbound payload for a single-field server-ee call. */
    buildPayload?: (args: {
        matchcode: string;
        value: string;
        schema?: unknown;
        context?: unknown;
        callType?: string;
    }) => unknown;
}

let config: EECallConfig = {};
let warned = false;

export function configureEECall(next: EECallConfig): void {
    config = { ...config, ...next };
}

function warnOnce(): void {
    if (!warned) {
        warned = true;
        console.warn(
            '[ee-call] not configured — call configureEECall({ post, buildPayload }) ' +
                'with the repo\'s xmlServerCall/payload builder at startup.',
        );
    }
}

/** Build + post a single field/action server call. Null when unconfigured. */
export async function postEECall(args: {
    matchcode: string;
    value: string;
    schema?: unknown;
    context?: unknown;
    callType?: string;
}): Promise<unknown | null> {
    if (!config.post) {
        warnOnce();
        return null;
    }
    const payload = config.buildPayload ? config.buildPayload(args) : args;
    return config.post(payload);
}

/** POST a raw, already-built payload (delete action, grid actions). */
export async function postRaw(payload: unknown): Promise<unknown | null> {
    if (!config.post) {
        warnOnce();
        return null;
    }
    return config.post(payload);
}

export function isEECallConfigured(): boolean {
    return typeof config.post === 'function';
}

export default postEECall;
