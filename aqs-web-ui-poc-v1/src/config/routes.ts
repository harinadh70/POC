import type { ControlDef, PageBuildResponse, PageConfig } from '@/types';

/** Map a backend pageId to a client route. Generic across every LOB. */
export function pageIdToPath(pageId: string, lob: string): string {
  if (pageId === 'dashboard') return '/dashboard';
  return `/lob/${lob}/${pageId}`;
}

/**
 * mergeControlsWithPageBuild (SDD §10.2.2) — for static/hybrid pages, the
 * static schema is the source of truth and live PageBuild values are merged in.
 * For dynamic pages there is no static schema, so PageBuild controls pass
 * through unchanged.
 */
export function mergeControlsWithPageBuild(
  pageConfig: PageConfig | undefined,
  pageBuild: PageBuildResponse,
): ControlDef[] {
  if (!pageConfig || pageConfig.strategy === 'dynamic' || !pageConfig.controls?.length) {
    return pageBuild.controls;
  }
  const liveByCode = new Map(pageBuild.controls.map((c) => [c.matchcode, c]));
  return pageConfig.controls.map((schemaControl) => {
    const live = liveByCode.get(schemaControl.matchcode);
    // Static schema defines the control; live PageBuild supplies value/options.
    return live ? { ...schemaControl, value: live.value, options: live.options ?? schemaControl.options } : schemaControl;
  });
}
