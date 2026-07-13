import { z } from 'zod';

// services
import { type SessionInfo } from '@features/auth/services/auth';

// utils
import { baseQuery } from '@utils/http-instance';

// ------------------------------------------

export const PageNavigationResponseSchema = z.object({
  result: z.union([z.string(), z.record(z.string(), z.any())]),
  xdiSecurity: z.object(), // ""
  xdiOptions: z.object(), // ""
  atAQS: z.string(), // "1"
  mnodValue: z.string(), // "start"
  statusMessage: z.string(), // "OK"
  statusCode: z.number().int(), // 200
});

export async function fetchUserData(
  sessionInfo: SessionInfo,
): Promise<{ status: boolean; data?: Record<string, unknown> | null }> {
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
      xdiOptions: Record<string, unknown>;
      xdiSecurity: Record<string, unknown>;
    }>({
      url: '/userData/GetUserData',
      method: 'POST',
      data: body,
    });

    const { StatusCode, StatusMessage, ...restData } = response;

    if (StatusCode === 200) {
      console.log('User data fetched successfully:', StatusMessage);
      return { status: true, data: restData };
    }

    return { status: false, data: null };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { status: false, data: null };
  }
}
