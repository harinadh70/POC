import { z } from 'zod';

import { baseQuery } from '@utils/http-instance';

const LobActionMenuResponseSchema = z.object({}).passthrough();

export interface LobActionMenuPayload {
    Session: {
        CompLoc: string;
        UserId: string;
        PolicyId: string;
        NodeKey: string;
        Action: string;
        DiagnosticMode: string;
        SessionXml: string;
    };
    PageCode: string;
    TabFile: string;
    XMLListFile: string;
}

export type LobActionMenuResponse = z.infer<typeof LobActionMenuResponseSchema>;

export async function fetchLobActionMenu(
    payload: LobActionMenuPayload,
): Promise<{ status: boolean; data: LobActionMenuResponse | null; error?: string }> {
    try {
        const response = await baseQuery<unknown>({
            url: '/LobActionMenu',
            method: 'POST',
            data: payload,
        });

        const parsed = LobActionMenuResponseSchema.safeParse(response);
        if (!parsed.success) {
            return {
                status: false,
                data: null,
                error: 'Invalid LobActionMenu response format',
            };
        }

        return {
            status: true,
            data: parsed.data,
        };
    } catch (error) {
        return {
            status: false,
            data: null,
            error: error instanceof Error ? error.message : 'LobActionMenu request failed',
        };
    }
}
