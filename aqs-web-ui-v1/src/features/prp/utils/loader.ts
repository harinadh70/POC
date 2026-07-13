import { data } from 'react-router';
import { fetchMlcSumList } from '../services/prp';

// Types
export interface PrpLoaderData {
  mlcSumRows: Awaited<ReturnType<typeof fetchMlcSumList>>;
}

/**
 * Loader for PRP MLC Sum page
 * Fetches the MLC summary list data
 */
export async function prpMlcSumLoader(): Promise<PrpLoaderData> {
  try {
    const mlcSumRows = await fetchMlcSumList();

    return data({ mlcSumRows }, { status: 200 });
  } catch (error) {
    console.error('[PRP Loader] Failed to load MLC sum data:', error);
    // Return empty array on error to prevent page crash
    return data({ mlcSumRows: [] }, { status: 200 });
  }
}
