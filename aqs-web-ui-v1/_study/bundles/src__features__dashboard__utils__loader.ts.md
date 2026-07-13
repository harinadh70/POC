# BUNDLE for src/features/dashboard/utils/loader.ts
# 8 photo fragment(s), ascending start-line order.


========== IMG_2349.md ==========
---
photo: IMG_2349.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/loader.ts
lines: 1-34
orientation: 180
confidence: high
notes: New file (different from middleware.ts series in IMG_2340-2348). Editor tab "loader.ts 2" (2 problems). Breadcrumb: aqs-web-ui > src > features > dashboard > utils > loader.ts > .... Explorer sidebar expanded further down showing full features tree: auth (services > auth.ts, check-sso.ts; utils > action.ts, loader.ts, middleware.ts), middleware.ts, dashboard\utils (loader.ts [selected, highlighted blue], middleware.ts), form, legacy, policy, prp, root, hooks, lib, pages, providers (partially visible at bottom, cut off). Status bar: branch "hitanshu/experimental*", 27 errors / 0 warnings (down from 32 in the middleware.ts photos), "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Squiggly underline under 'react-router' on line 1 (import resolution warning). Text cursor visible near line 24/1000 area, does not obscure code.
---
1   import { data } from 'react-router';
2   
3   // context
4   import { userContext, navigationContext, permissionsContext } from '@/context';
5   
6   // services
7   import { fetchUserData } from '@services/user-data';
8   
9   // utils
10  import { safeAwait } from '@utils/common';
11  import { setItem } from '@utils/local-storage';
12  
13  // types
14  import type { LoaderFunctionArgs } from 'react-router';
15  import type { BrowserCommand, PermissionSnapshot } from '@/types';
16  import type { SessionInfo } from '@features/auth/services/auth';
17  
18  // ---------------------------------------
19  
20  export interface DashboardLoaderData {
21      userInfo: SessionInfo;
22      permissionInfo: Record<string, unknown> | null;
23      permissions: PermissionSnapshot | null;
24      browserCommands: BrowserCommand[];
25  }
26  
27  // ---------------------------------------
28  
29  /**
30   * Dashboard loader for MAIN and follow-up dashboard actions.
31   *
32   * @remarks
33   * Permissions are exposed via loader data so route consumers can read them with
34   * `useRouteLoaderData('dashboard')`, avoiding a separate React provider layer.


========== IMG_2350.md ==========
---
photo: IMG_2350.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/loader.ts
lines: 17-49 (line 50 fragment occluded by status bar)
orientation: 180
confidence: high
notes: Continuation of IMG_2349 (same file, scrolled down). No sticky-scroll header. Explorer sidebar shows fuller tree: aqs-web-ui/src/constants (theme.ts), features > auth (services > auth.ts, check-sso.ts; utils > action.ts, loader.ts, middleware.ts), middleware.ts, dashboard\utils (loader.ts [selected], middleware.ts), form, legacy, policy, prp, root, hooks, lib, pages, providers (cut off at bottom). Tab "loader.ts 2" active. Breadcrumb: aqs-web-ui > src > features > dashboard > utils > loader.ts > .... Status bar: branch "hitanshu/experimental*", 27 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. A faint additional line of text (line 50) is visible just above/behind the status bar but not legible.
---
17  
18  // ---------------------------------------
19  
20  export interface DashboardLoaderData {
21      userInfo: SessionInfo;
22      permissionInfo: Record<string, unknown> | null;
23      permissions: PermissionSnapshot | null;
24      browserCommands: BrowserCommand[];
25  }
26  
27  // ---------------------------------------
28  
29  /**
30   * Dashboard loader for MAIN and follow-up dashboard actions.
31   *
32   * @remarks
33   * Permissions are exposed via loader data so route consumers can read them with
34   * `useRouteLoaderData('dashboard')`, avoiding a separate React provider layer.
35   */
36  export async function clientDashboardLoader({ context }: LoaderFunctionArgs) {
37      const userInfo = context.get(userContext);
38  
39      // Get browser commands and action from navigationContext (set by dataStrategy)
40      // These were extracted from the cycling API response
41      const navContext = context.get(navigationContext);
42      const browserCommands = navContext?.browserCommands || [];
43      const action = navContext?.action;
44  
45      console.log('[DASHBOARD_LOADER]', {
46          action,
47      });
48  
49      if (!userInfo) {
50  ⟪?⟫


========== IMG_2351.md ==========
---
photo: IMG_2351.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/loader.ts
lines: 30-63
orientation: 180
confidence: high
notes: Continuation of IMG_2350 (same file, scrolled down). No sticky-scroll header. Explorer sidebar: aqs-web-ui/src/constants (theme.ts), features > auth (services > auth.ts, check-sso.ts; utils > action.ts, loader.ts, middleware.ts), middleware.ts, dashboard\utils (loader.ts [selected], middleware.ts), form, legacy, policy, prp, root, hooks, lib, pages, providers (cut off). Tab "loader.ts 2" active. Breadcrumb: aqs-web-ui > src > features > dashboard > utils > loader.ts > .... Status bar: branch "hitanshu/experimental*", 27 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 63 is partly occluded by the status bar at the bottom edge of frame but legible with high confidence from visible glyph shapes plus context (fetchUserData imported at top of file, userInfo declared on line 37): "const [result, error] = await safeAwait(fetchUserData(userInfo));". Lines 55-56 are commented-out code (part of a larger commented-out block starting "// return {" continuing "// userInfo,").
---
30   * Dashboard loader for MAIN and follow-up dashboard actions.
31   *
32   * @remarks
33   * Permissions are exposed via loader data so route consumers can read them with
34   * `useRouteLoaderData('dashboard')`, avoiding a separate React provider layer.
35   */
36  export async function clientDashboardLoader({ context }: LoaderFunctionArgs) {
37      const userInfo = context.get(userContext);
38  
39      // Get browser commands and action from navigationContext (set by dataStrategy)
40      // These were extracted from the cycling API response
41      const navContext = context.get(navigationContext);
42      const browserCommands = navContext?.browserCommands || [];
43      const action = navContext?.action;
44  
45      console.log('[DASHBOARD_LOADER]', {
46          action,
47      });
48  
49      if (!userInfo) {
50          return data({ error: 'No user session found' }, { status: 401 });
51      }
52  
53      // permissionInfo is now fetched in root loader and available via useRouteLoaderData('root')
54      // For non-MAIN actions, dataStrategy already called executeAction and populated browserCommands
55      // return {
56      //  userInfo,
57      // Keep GetUserData in the first authenticated feature loader.
58      // Root loader can run before auth/session context is fully established.
59      // GetUserData requires authenticated session data (compLoc, userId, nodeKey).
60      // Only fetch user data on initial dashboard load (action=MAIN)
61      // For other actions (e.g., STARTOPTIONS), dataStrategy handles the API call
62      if (action === 'MAIN') {
63          const [result, error] = await safeAwait(fetchUserData(userInfo));


========== IMG_2352.md ==========
---
photo: IMG_2352.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/loader.ts
lines: 36, 41-73
orientation: 180
confidence: high
notes: Line 36 is sticky-scroll header (function signature). Line 41 partially obscured/overlapped by the sticky header band but legible on close zoom: "const navContext = context.get(navigationContext);". Breadcrumb: aqs-web-ui > src > features > dashboard > utils > loader.ts > .... Tabs open: "date.tsx 9+" and active "loader.ts 2" (2 = problem count badge). Explorer sidebar (expanded): AQS_WORKSPACE > aqs-web-ui > src > constants (theme.ts) > features > auth > services (auth.ts, check-sso.ts) > utils (action.ts, loader.ts, middleware.ts) > middleware.ts > dashboard\utils (highlighted, loader.ts selected/open, middleware.ts) > form, legacy, policy, prp, root, hooks, lib, pages, providers (collapsed, dots indicate unsaved/modified). Status bar: aqs-web-ui, branch hitanshu/experimental*, 27 problems / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 4:46 PM 7/10/2026. Lines 55-56 appear to be a leftover commented-out return block ("// return {" / "//   userInfo,") sitting oddly between two different comment threads (54 and 57) — transcribed verbatim as shown.
---
```
36  export async function clientDashboardLoader({ context }: LoaderFunctionArgs) {
41      const navContext = context.get(navigationContext);
42      const browserCommands = navContext?.browserCommands || [];
43      const action = navContext?.action;
44
45      console.log('[DASHBOARD_LOADER]', {
46          action,
47      });
48
49      if (!userInfo) {
50          return data({ error: 'No user session found' }, { status: 401 });
51      }
52
53      // permissionInfo is now fetched in root loader and available via useRouteLoaderData('root')
54      // For non-MAIN actions, dataStrategy already called executeAction and populated browserCommands
55      // return {
56      //   userInfo,
57      // Keep GetUserData in the first authenticated feature loader.
58      // Root loader can run before auth/session context is fully established.
59      // GetUserData requires authenticated session data (compLoc, userId, nodeKey).
60      // Only fetch user data on initial dashboard load (action=MAIN)
61      // For other actions (e.g., STARTOPTIONS), dataStrategy handles the API call
62      if (action === 'MAIN') {
63          const [result, error] = await safeAwait(fetchUserData(userInfo));
64
65          if (!result?.status || error) {
66              context.set(permissionsContext, null);
67              return data({ error }, { status: 500 });
68          }
69
70          const permissions = result.permissions ?? null;
71
72          if (!permissions) {
73              console.warn('[DASHBOARD_LOADER] Permissions missing from GetUserData response');
```


========== IMG_2353.md ==========
---
photo: IMG_2353.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/loader.ts
lines: 36, 52-84
orientation: 180
confidence: high
notes: Line 36 is sticky-scroll header (function signature), same as IMG_2352. Overlaps IMG_2352 at lines 52-73 — consistent content. Line 84 was cut off at the very bottom edge by the status bar/taskbar in this photo; confirmed via IMG_2354 (same line, fully visible) to read "allowActions: permissions.actions.allow.length," with a trailing comma. Breadcrumb: aqs-web-ui > src > features > dashboard > utils > loader.ts > .... Tabs: "date.tsx 9+" and active "loader.ts 2". Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > constants (theme.ts) > features > auth > services (auth.ts, check-sso.ts) > utils (action.ts, loader.ts, middleware.ts) > middleware.ts > dashboard\utils (highlighted, loader.ts selected, middleware.ts) > form, legacy, policy, prp, root, hooks, lib, pages, providers. Status bar: aqs-web-ui, branch hitanshu/experimental*, 27 problems / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 4:46 PM 7/10/2026.
---
```
36  export async function clientDashboardLoader({ context }: LoaderFunctionArgs) {
52
53      // permissionInfo is now fetched in root loader and available via useRouteLoaderData('root')
54      // For non-MAIN actions, dataStrategy already called executeAction and populated browserCommands
55      // return {
56      //   userInfo,
57      // Keep GetUserData in the first authenticated feature loader.
58      // Root loader can run before auth/session context is fully established.
59      // GetUserData requires authenticated session data (compLoc, userId, nodeKey).
60      // Only fetch user data on initial dashboard load (action=MAIN)
61      // For other actions (e.g., STARTOPTIONS), dataStrategy handles the API call
62      if (action === 'MAIN') {
63          const [result, error] = await safeAwait(fetchUserData(userInfo));
64
65          if (!result?.status || error) {
66              context.set(permissionsContext, null);
67              return data({ error }, { status: 500 });
68          }
69
70          const permissions = result.permissions ?? null;
71
72          if (!permissions) {
73              console.warn('[DASHBOARD_LOADER] Permissions missing from GetUserData response');
74              context.set(permissionsContext, null);
75          } else {
76              context.set(permissionsContext, permissions);
77
78              // Persist to localStorage so permissionsMiddleware can enforce
79              // page-level access on subsequent navigations without re-fetching.
80              setItem('permissionSnapshot', permissions);
81
82              console.log('[DASHBOARD_LOADER] Permissions stored in router context + localStorage', {
83                  allowedPages: permissions.page.allowedAspFiles.length,
84                  allowActions: permissions.actions.allow.length,
```


========== IMG_2354.md ==========
---
photo: IMG_2354.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/loader.ts
lines: 36, 65-97
orientation: 180
confidence: high
notes: Line 36 is sticky-scroll header. Overlaps IMG_2353 at lines 65-84 — consistent, and confirms line 84 ends with a trailing comma ("allowActions: permissions.actions.allow.length,") which was uncertain/cut-off in IMG_2353. New content beyond IMG_2353: lines 85-97 (end of function, loaderData object, return). Breadcrumb: aqs-web-ui > src > features > dashboard > utils > loader.ts > .... Tabs: "date.tsx 9+" and active "loader.ts 2". Explorer sidebar same as prior two photos: AQS_WORKSPACE > aqs-web-ui > src > constants (theme.ts) > features > auth > services (auth.ts, check-sso.ts) > utils (action.ts, loader.ts, middleware.ts) > middleware.ts > dashboard\utils (highlighted, loader.ts selected, middleware.ts) > form, legacy, policy, prp, root, hooks, lib, pages, providers. Status bar: aqs-web-ui, branch hitanshu/experimental*, 27 problems / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 4:46 PM 7/10/2026.
---
```
36  export async function clientDashboardLoader({ context }: LoaderFunctionArgs) {
65          if (!result?.status || error) {
66              context.set(permissionsContext, null);
67              return data({ error }, { status: 500 });
68          }
69
70          const permissions = result.permissions ?? null;
71
72          if (!permissions) {
73              console.warn('[DASHBOARD_LOADER] Permissions missing from GetUserData response');
74              context.set(permissionsContext, null);
75          } else {
76              context.set(permissionsContext, permissions);
77
78              // Persist to localStorage so permissionsMiddleware can enforce
79              // page-level access on subsequent navigations without re-fetching.
80              setItem('permissionSnapshot', permissions);
81
82              console.log('[DASHBOARD_LOADER] Permissions stored in router context + localStorage', {
83                  allowedPages: permissions.page.allowedAspFiles.length,
84                  allowActions: permissions.actions.allow.length,
85              });
86          }
87
88          const loaderData: DashboardLoaderData = {
89              userInfo,
90              permissionInfo: result.data ?? null,
91              permissions,
92              browserCommands,
93          };
94
95          return loaderData;
96      }
97  }
```


========== IMG_2355.md ==========
---
photo: IMG_2355.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/loader.ts
lines: 36, 78-110
orientation: 180
confidence: high
notes: Line 36 is sticky-scroll header. Overlaps IMG_2354 at lines 78-97 — consistent (confirms end of clientDashboardLoader at line 96-97). New content beyond IMG_2354: lines 98-110, a second block starting "const permissions = context.get(permissionsContext) ?? null;" (likely the non-MAIN branch / a second exported loader function) building its own DashboardLoaderData with permissionInfo: null and returning it at line 109, closing brace at line 110. Breadcrumb: aqs-web-ui > src > features > dashboard > utils > loader.ts > .... Tabs: "date.tsx 9+" and active "loader.ts 2". Explorer sidebar unchanged from prior photos in this sequence. Status bar: aqs-web-ui, branch hitanshu/experimental*, 27 problems / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 4:46 PM 7/10/2026.
---
```
36  export async function clientDashboardLoader({ context }: LoaderFunctionArgs) {
78          // Persist to localStorage so permissionsMiddleware can enforce
79          // page-level access on subsequent navigations without re-fetching.
80          setItem('permissionSnapshot', permissions);
81
82          console.log('[DASHBOARD_LOADER] Permissions stored in router context + localStorage', {
83              allowedPages: permissions.page.allowedAspFiles.length,
84              allowActions: permissions.actions.allow.length,
85          });
86      }
87
88      const loaderData: DashboardLoaderData = {
89          userInfo,
90          permissionInfo: result.data ?? null,
91          permissions,
92          browserCommands,
93      };
94
95      return loaderData;
96  }
97
98      const permissions = context.get(permissionsContext) ?? null;
99
100     // For non-MAIN actions, reuse permissions from context and return dashboard data.
101     // (dataStrategy already called executeAction and populated browserCommands)
102     const loaderData: DashboardLoaderData = {
103         userInfo,
104         permissionInfo: null,
105         permissions,
106         browserCommands,
107     };
108
109     return loaderData;
110 }
```


========== IMG_2356.md ==========
---
photo: IMG_2356.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/loader.ts
lines: 36, 86-111
orientation: 180
confidence: high
notes: Line 36 is sticky-scroll header. Near-duplicate of IMG_2355, scrolled slightly further down; confirms file ends at line 110 ("}") with a trailing blank line 111 — file is 111 lines total (loader.ts). No new content beyond IMG_2355. Breadcrumb: aqs-web-ui > src > features > dashboard > utils > loader.ts > .... Tabs: "date.tsx 9+" and active "loader.ts 2". Explorer sidebar unchanged from prior photos in this sequence. Status bar: aqs-web-ui, branch hitanshu/experimental*, 27 problems / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 4:46 PM 7/10/2026.
---
```
36  export async function clientDashboardLoader({ context }: LoaderFunctionArgs) {
86      }
87
88      const loaderData: DashboardLoaderData = {
89          userInfo,
90          permissionInfo: result.data ?? null,
91          permissions,
92          browserCommands,
93      };
94
95      return loaderData;
96  }
97
98      const permissions = context.get(permissionsContext) ?? null;
99
100     // For non-MAIN actions, reuse permissions from context and return dashboard data.
101     // (dataStrategy already called executeAction and populated browserCommands)
102     const loaderData: DashboardLoaderData = {
103         userInfo,
104         permissionInfo: null,
105         permissions,
106         browserCommands,
107     };
108
109     return loaderData;
110 }
111
```
