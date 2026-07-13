import type {
  ExecuteActionResult,
  NavigationResponse,
  PageBuildResponse,
  SessionInfo,
} from '@/types';
import { mockBackend } from '@/mock/mock-backend';

/**
 * The backend contract the engine depends on (SDD §5.3, §5.6).
 * Three wrapper-API calls; no business logic lives on the client.
 *
 * The POC ships a mock implementation so it runs standalone. Swap `api` for an
 * HTTP implementation pointed at the real .NET 4.8 wrapper APIs with no engine
 * changes — that is the point of coding to this interface.
 */
export interface AqsApi {
  /** Navigation API — "which page/window loads next". */
  navigate(session: SessionInfo, target: string): Promise<NavigationResponse>;
  /** PageBuild API — controls + actions + initial commands for a page. */
  pageBuild(session: SessionInfo, pageId: string): Promise<PageBuildResponse>;
  /** Page Layout API — run a user action, get back the next commands. */
  pageLayout(
    session: SessionInfo,
    req: { matchcode: string; action?: string; value?: unknown; formData: Record<string, unknown> },
  ): Promise<ExecuteActionResult>;
}

/**
 * Active API implementation. Reads an env flag so a real backend can be wired
 * later: VITE_API_MODE=http → build an HttpAqsApi(baseUrl). Default: mock.
 */
export const api: AqsApi = mockBackend;
