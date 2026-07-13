import { z } from 'zod';

// services
import { type SessionInfo } from '@features/auth/services/auth';

// types
import type { PermissionSnapshot } from '@/types';

// utils
import { baseQuery } from '@utils/http-instance';
import { parsePermissions } from '@utils/parse-permissions';

// ---------------------------------------

export const PageNavigationResponseSchema = z.object({
    result: z.union([z.string(), z.record(z.string(), z.any())]),
    xdiSecurity: z.record(z.string(), z.unknown()), // ""
    xdiOptions: z.record(z.string(), z.unknown()), // ""
    atAQS: z.string(), // "1"
    mnodValue: z.string(), // "start"
    statusMessage: z.string(), // "OK"
    statusCode: z.number().int(), // 200
});

export async function fetchUserData(sessionInfo: SessionInfo): Promise<{
    status: boolean;
    data?: Record<string, unknown> | null;
    permissions?: PermissionSnapshot;
}> {
    try {
        // 2. gather params for navigation
        const body = {
            compLoc: sessionInfo.compLoc,
            userId: sessionInfo.userId,
            policyID: '0',
            nodeKey: sessionInfo.nodeKey,
            action: 'Main',
            diagnosticMode: '0',
            xmlDetail: '<items />',
            XMLFile: '',
            tab: '',
            debug: 'false',
            returnType: '',
        };

        const response = await baseQuery<{
            StatusCode: number;
            StatusMessage: string;
            atAQS: string;
            mnodValue: string;
            xdiOptions?: Record<string, unknown> | null;
            xdiSecurity?: Record<string, unknown> | null;
        }>({
            url: '/userData/GetUserData',
            method: 'POST',
            data: body,
        });

        const { StatusCode, StatusMessage, ...restData } = response;

        if (StatusCode === 200) {
            console.log('User data fetched successfully:', StatusMessage);

            let permissions: PermissionSnapshot | undefined;
            try {
                permissions = parsePermissions(response.xdiSecurity, response.xdiOptions);
                console.log('[PERMISSIONS] Loaded successfully', {
                    allowedPages: permissions.page.allowedAspFiles.length,
                    deniedPages: permissions.page.deniedAspFiles.length,
                    allowActions: permissions.actions.allow.length,
                    denyActions: permissions.actions.deny.length,
                    fieldRules: Object.keys(permissions.fields).length,
                });
            } catch (permissionError) {
                console.error(
                    '[PERMISSIONS] Failed to parse GetUserData permissions',
                    permissionError,
                );
            }

            return { status: true, data: restData, permissions };
        }

        return { status: false, data: null };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { status: false, data: null };
    }
}
