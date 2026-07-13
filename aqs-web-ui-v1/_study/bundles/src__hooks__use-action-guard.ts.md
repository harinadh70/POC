# BUNDLE for src/hooks/use-action-guard.ts
# 1 photo fragment(s), ascending start-line order.


========== IMG_2742.md ==========
---
photo: IMG_2742.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-action-guard.ts
lines: 1-28
orientation: 180
confidence: high
notes: |
  Sharp, clear photo — no ghosting/blur. Entire file fits on screen (1 to 28, whole file, tab shows "1" meaning cursor at line 1 not an unsaved-change count as with middleware.ts's "7").
  Breadcrumb: aqs-web-ui > src > hooks > use-action-guard.ts > ...
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src):
    features/prp/utils (collapsed)
    features/root/services/user-data.ts, utils/loader.ts, utils/middleware.ts
    hooks/ (expanded, use-action-guard.ts selected): use-action-guard.ts, use-browser-commands.ts, use-deferred-navigation.ts, use-form-commit.ts, use-page-form.ts, use-required-field-validation....ts (name truncated), use-smart-navigation.ts
    lib/, pages/, providers/, services/, types/, utils/ (all collapsed)
    app.css
  Tab bar: only "use-action-guard.ts" tab open.
  Status bar: branch hitanshu/experimental*, "No Solution" (red), 3 errors / 0 warnings (fewer than the middleware.ts photos, which showed 9).
---
1: import { useRouteLoaderData } from 'react-router';
2: import { isActionAllowed as checkActionAllowed } from '@utils/check-action-permission';
3: import type { DashboardLoaderData } from '@features/dashboard/utils/loader';
4:
5: /**
6:  * React hook for checking action permissions in components.
7:  *
8:  * This hook reads permissions from the dashboard route loader via
9:  * `useRouteLoaderData('dashboard')`, using React Router's native data flow.
10:  *
11:  * @remarks
12:  * This removes the need for a dedicated permissions provider and keeps
13:  * authorization state co-located with route loader data.
14:  */
15: export function useActionGuard() {
16:   const loaderData = useRouteLoaderData<DashboardLoaderData>('dashboard');
17:   const permissions = loaderData?.permissions ?? null;
18:
19:   const isActionAllowed = (action: string): boolean => {
20:     return checkActionAllowed(action, permissions);
21:   };
22:
23:   return {
24:     isActionAllowed,
25:     permissions,
26:   };
27: }
28:
