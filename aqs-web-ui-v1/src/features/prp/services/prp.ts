import { z } from 'zod';
import { baseQuery } from '@/utils/http-instance';

// Types
export interface MlcSumRow {
  id: string;
  selected?: boolean;
  year: string;
  losses: string;
  lossamount: string;
  eligibleamount: string;
  sortdate: string;
}

// Zod schemas for validation
export const MlcSumRowSchema = z.object({
  id: z.string(),
  selected: z.boolean().optional(),
  year: z.string(),
  losses: z.string(),
  lossamount: z.string(),
  eligibleamount: z.string(),
  sortdate: z.string(),
});

export const MlcSumListResponseSchema = z.object({
  list: z.array(MlcSumRowSchema),
});

export type MlcSumListResponse = z.infer<typeof MlcSumListResponseSchema>;

/**
 * Fetches MLC summary list data
 * In the legacy system, this would call XMLList.Get with session information ⟪?⟫
 * For now, returns mock data that matches the XSL structure
 */
export async function fetchMlcSumList(sessionInfo?: any): Promise<MlcSumRow[]> {
  try {
  // In production, this would be:
  // const response = await baseQuery<MlcSumListResponse>({
  //   url: '/api/prp/mlc-sum-list',
  //   method: 'POST',
  //   data: { sessionInfo }
  // });
  // return response.list;
⟪?⟫
  // Mock data for development
  const mockData: MlcSumRow[] = [
    {
      id: '1',
      selected: false,
      year: '2023',
      losses: '2',
      lossamount: '15000.00',
      eligibleamount: '50000.00',
      sortdate: '20230101',
    },
    {
      id: '2',
      selected: true,
      year: '2022',
      losses: '1',
      lossamount: '8000.00',
      eligibleamount: '45000.00',
      sortdate: '20220101',
    },
    {
      id: '3',
      selected: false,
      year: '2021',
      losses: '3',
      lossamount: '25000.00',
      eligibleamount: '55000.00',
      sortdate: '20210101',
    },
  ];
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  return mockData;
  } catch (error) {
    console.error('[PRP API] Failed to fetch MLC sum list:', error);
    throw error;
  }
}
}</content>
<parameter name="filePath">C:\Users\skudale\Documents\aqs-web-ui\src\features\prp\services\prp.ts ⟪?⟫
