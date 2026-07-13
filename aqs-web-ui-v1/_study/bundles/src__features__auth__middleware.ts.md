# BUNDLE for src/features/auth/middleware.ts
# 11 photo fragment(s), ascending start-line order.


========== IMG_2338.md ==========
---
photo: IMG_2338.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/middleware.ts
lines: 1-34
orientation: 180
confidence: high
notes: New tab opened "middleware.ts 7" (7 = problem count badge), distinct from the utils/middleware.ts seen in IMG_2336/2337 — this one is directly under features/auth (breadcrumb aqs-web-ui > src > features > auth > middleware.ts). Explorer sidebar: this middleware.ts (features/auth level, badge "7") highlighted/selected, listed below utils folder containing action.ts, loader.ts, middleware.ts. Status bar: aqs-web-ui, hitanshu/experimental*, 32 errors / 0 warnings (up from 30), No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Time overlay 4:46 PM 7/10/2026. Line 34 (function signature start) is cut off/occluded by the status bar at the very bottom edge but legible via zoom.
---
1: import { redirect } from 'react-router';
2: import type { MiddlewareFunction } from 'react-router';
3:
4: import { navigationContext, permissionsContext } from '@/context';
5: import { normalizeAspFileName } from '@/utils/asp-route-mapper';
6: import { getItem } from '@utils/local-storage';
7: import type { PermissionSnapshot } from '@/types';
8:
9: import { authMiddleware } from './utils/middleware';
10:
11: const PUBLIC_PATHS = new Set(['/login', '/logout']);
12:
13: interface PermissionCheckLog {
14:     path: string;
15:     targetAspFile: string | null;
16:     hasPermissions: boolean;
17:     reason?: string;
18: }
19:
20: /**
21:  * Returns true when a route should bypass permission checks.
22:  */
23: function isPublicPath(pathname: string): boolean {
24:     return PUBLIC_PATHS.has(pathname);
25: }
26:
27: /**
28:  * Derives target ASP filename for permission checks.
29:  *
30:  * Priority:
31:  * 1) `navigationContext.fileName` (from cycling response)
32:  * 2) URL pathname fallback (React route path → ASP filename)
33:  */
34: function resolveTargetAspFile(pathname: string, navFileName: string | undefined): string | null {


========== IMG_2339.md ==========
---
photo: IMG_2339.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/middleware.ts
lines: 13-49
orientation: 180
confidence: high
notes: Same file/tab as IMG_2338 (features/auth/middleware.ts), scrolled down slightly. No sticky-scroll header visible this time (top line is 13, not repeated). Explorer sidebar: this middleware.ts (features/auth level, badge "7") highlighted, listed below utils folder (action.ts, loader.ts, middleware.ts). Status bar: aqs-web-ui, hitanshu/experimental*, 32 errors / 0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Time overlay 4:46 PM 7/10/2026. Line 49 ("}") is the last fully visible line at the bottom edge; line 50 not visible.
---
13: interface PermissionCheckLog {
   [lines 14-17 not visible in this photo, see IMG_2338 for path/targetAspFile/hasPermissions/reason fields]
18: }
19:
20: /**
21:  * Returns true when a route should bypass permission checks.
22:  */
23: function isPublicPath(pathname: string): boolean {
24:     return PUBLIC_PATHS.has(pathname);
25: }
26:
27: /**
28:  * Derives target ASP filename for permission checks.
29:  *
30:  * Priority:
31:  * 1) `navigationContext.fileName` (from cycling response)
32:  * 2) URL pathname fallback (React route path → ASP filename)
33:  */
34: function resolveTargetAspFile(pathname: string, navFileName: string | undefined): string | null {
35:     if (navFileName && navFileName.trim().length > 0) {
36:         return normalizeAspFileName(navFileName);
37:     }
38:
39:     const segment = pathname.split('/').filter(Boolean).at(-1);
40:     if (!segment) {
41:         return null;
42:     }
43:
44:     if (PUBLIC_PATHS.has(`/${segment}`)) {
45:         return null;
46:     }
47:
48:     return normalizeAspFileName(segment);
49: }


========== IMG_2340.md ==========
---
photo: IMG_2340.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/middleware.ts
lines: 30-63
orientation: 180
confidence: high
notes: Explorer sidebar shows aqs-web-ui/src tree expanded - components (subheader.tsx?, text.tsx, textarea.tsx, XmlList.tsx [U]), config (action-config.ts, db.json), constants (asp-route-map.ts, button-matchcodes.ts, theme.ts), features > auth (services > auth.ts, check-sso.ts; utils > actions.ts, loader.ts, middleware.ts, middleware.ts [selected, "7" badge = 7 problems in file]), dashboard, form, legacy (partially visible). Tab bar: "date.tsx 9+" and "middleware.ts 7" (active, unsaved dot not shown but has problem count badge). Breadcrumb: aqs-web-ui > src > features > auth > middleware.ts > .... Status bar: branch "hitanshu/experimental*", 32 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 63 is occluded/cut off by the status bar overlay at the very bottom of the visible editor area - only a small yellow-highlighted fragment is visible, likely "});" closing the console.warn call and if-block, but not legible enough to transcribe with confidence.
---
30    * Priority:
31    * 1) `navigationContext.fileName` (from cycling response)
32    * 2) URL pathname fallback (React route path → ASP filename)
33    */
34  function resolveTargetAspFile(pathname: string, navFileName: string | undefined): string | null {
35      if (navFileName && navFileName.trim().length > 0) {
36          return normalizeAspFileName(navFileName);
37      }
38  
39      const segment = pathname.split('/').filter(Boolean).at(-1);
40      if (!segment) {
41          return null;
42      }
43  
44      if (PUBLIC_PATHS.has(`/${segment}`)) {
45          return null;
46      }
47  
48      return normalizeAspFileName(segment);
49  }
50  
51  /**
52   * Writes normalized permission check telemetry for debugging/audit purposes.
53   */
54  function logPermissionCheck(details: PermissionCheckLog): void {
55      const base = '[PERMISSIONS_MIDDLEWARE]';
56  
57      if (details.reason) {
58          console.warn(`${base} DENY`, {
59              path: details.path,
60              targetAspFile: details.targetAspFile,
61              hasPermissions: details.hasPermissions,
62              reason: details.reason,
63          ⟪?⟫


========== IMG_2341.md ==========
---
photo: IMG_2341.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/middleware.ts
lines: 34, 47-78 (sticky header 34; line 79 occluded by status bar)
orientation: 180
confidence: high
notes: Continuation of IMG_2340 (same file, scrolled down). Sticky-scroll header at top pins line 34 "function resolveTargetAspFile(...)" while body shows lines 47-79. This resolves the illegible line 63 from IMG_2340 - it is "});". Explorer sidebar same as IMG_2340; middleware.ts (in utils/) highlighted/selected, tab "middleware.ts 7" active. Breadcrumb: aqs-web-ui > src > features > auth > middleware.ts > .... Status bar: branch "hitanshu/experimental*", 32 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 79 is present but occluded by the status bar at the very bottom of the frame - not legible.
---
34  function resolveTargetAspFile(pathname: string, navFileName: string | undefined): string | null {
    ⟦sticky scroll header — body resumes at line 47⟧
47  
48      return normalizeAspFileName(segment);
49  }
50  
51  /**
52   * Writes normalized permission check telemetry for debugging/audit purposes.
53   */
54  function logPermissionCheck(details: PermissionCheckLog): void {
55      const base = '[PERMISSIONS_MIDDLEWARE]';
56  
57      if (details.reason) {
58          console.warn(`${base} DENY`, {
59              path: details.path,
60              targetAspFile: details.targetAspFile,
61              hasPermissions: details.hasPermissions,
62              reason: details.reason,
63          });
64          return;
65      }
66  
67      console.log(`${base} ALLOW`, {
68          path: details.path,
69          targetAspFile: details.targetAspFile,
70          hasPermissions: details.hasPermissions,
71      });
72  }
73  
74  /**
75   * Route middleware that enforces page-level permissions for ASP-backed pages.
76   *
77   * Behavior:
78   * - Public paths ('/login', '/logout') always pass through.
79  ⟪?⟫


========== IMG_2342.md ==========
---
photo: IMG_2342.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/middleware.ts
lines: 54 (sticky), 63-94
orientation: 180
confidence: high
notes: Continuation of IMG_2340/2341 (same file, scrolled further down). Sticky-scroll header pins line 54 "function logPermissionCheck(...)" while body shows lines 63-94. This resolves the occluded line 79 from IMG_2341 - it is "- Missing permission snapshot on protected routes redirects to `/login`.". Explorer sidebar unchanged from prior two photos; middleware.ts (utils/) selected. Breadcrumb: aqs-web-ui > src > features > auth > middleware.ts > .... Status bar: branch "hitanshu/experimental*", 32 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Text cursor visible between "permitted" and "(fail" on line 81 (no space rendered oddly due to cursor overlay - transcribed as "permitted (fail closed)").
---
54  function logPermissionCheck(details: PermissionCheckLog): void {
    ⟦sticky scroll header — body resumes at line 63⟧
63              });
64          return;
65      }
66  
67      console.log(`${base} ALLOW`, {
68          path: details.path,
69          targetAspFile: details.targetAspFile,
70          hasPermissions: details.hasPermissions,
71      });
72  }
73  
74  /**
75   * Route middleware that enforces page-level permissions for ASP-backed pages.
76   *
77   * Behavior:
78   * - Public paths (`/login`, `/logout`) always pass through.
79   * - Missing permission snapshot on protected routes redirects to `/login`.
80   * - Explicitly denied ASP files redirect to `/login?reason=forbidden`.
81   * - If an allow-list is present, only files in the allow-list are permitted (fail closed).
82   */
83  const permissionsMiddleware: MiddlewareFunction = async ({ request, context }, next) => {
84      const url = new URL(request.url);
85      const pathname = url.pathname;
86  
87      if (isPublicPath(pathname)) {
88          await next();
89          return;
90      }
91  
92      let permissions = context.get(permissionsContext);
93  
94      if (!permissions) {


========== IMG_2343.md ==========
---
photo: IMG_2343.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/middleware.ts
lines: 75-107
orientation: 180
confidence: high
notes: Continuation of IMG_2340-2342 (same file, scrolled further down). No sticky-scroll header visible this time (top of view aligns with a comment block). Explorer sidebar unchanged; middleware.ts (utils/) selected, tab "middleware.ts 7". Breadcrumb: aqs-web-ui > src > features > auth > middleware.ts > .... Status bar: branch "hitanshu/experimental*", 32 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Text cursor visible to the right of line 92/94 area (does not obscure code).
---
75   * Route middleware that enforces page-level permissions for ASP-backed pages.
76   *
77   * Behavior:
78   * - Public paths (`/login`, `/logout`) always pass through.
79   * - Missing permission snapshot on protected routes redirects to `/login`.
80   * - Explicitly denied ASP files redirect to `/login?reason=forbidden`.
81   * - If an allow-list is present, only files in the allow-list are permitted (fail closed).
82   */
83  const permissionsMiddleware: MiddlewareFunction = async ({ request, context }, next) => {
84      const url = new URL(request.url);
85      const pathname = url.pathname;
86  
87      if (isPublicPath(pathname)) {
88          await next();
89          return;
90      }
91  
92      let permissions = context.get(permissionsContext);
93  
94      if (!permissions) {
95          permissions = getItem<PermissionSnapshot>('permissionSnapshot');
96          if (permissions) {
97              context.set(permissionsContext, permissions);
98          }
99      }
100  
101      // If permissions haven't been loaded yet, allow through.
102      // authMiddleware (which runs first) already guarantees the user is authenticated.
103      // The dashboard loader will fetch permissions on the initial action=MAIN call
104      // and persist them to localStorage for subsequent navigations.
105      if (!permissions) {
106          logPermissionCheck({
107              path: pathname,


========== IMG_2344.md ==========
---
photo: IMG_2344.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/middleware.ts
lines: 83 (sticky), 89-121 (line 121 occluded by status bar)
orientation: 180
confidence: high
notes: Continuation of IMG_2343 (same file, scrolled further down). Sticky-scroll header pins line 83 "const permissionsMiddleware: MiddlewareFunction = async ({ request, context }, next) => {" while body shows lines 89-121. Explorer sidebar unchanged; middleware.ts (utils/) selected, tab "middleware.ts 7". Breadcrumb: aqs-web-ui > src > features > auth > middleware.ts > .... Status bar: branch "hitanshu/experimental*", 32 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 121 is occluded by the status bar at the very bottom of the frame - only a faint fragment visible, likely "path: pathname," continuing the logPermissionCheck call pattern seen earlier, but not legible enough to transcribe with confidence.
---
83  const permissionsMiddleware: MiddlewareFunction = async ({ request, context }, next) => {
    ⟦sticky scroll header — body resumes at line 89⟧
89          return;
90      }
91  
92      let permissions = context.get(permissionsContext);
93  
94      if (!permissions) {
95          permissions = getItem<PermissionSnapshot>('permissionSnapshot');
96          if (permissions) {
97              context.set(permissionsContext, permissions);
98          }
99      }
100 
101     // If permissions haven't been loaded yet, allow through.
102     // authMiddleware (which runs first) already guarantees the user is authenticated.
103     // The dashboard loader will fetch permissions on the initial action=MAIN call
104     // and persist them to localStorage for subsequent navigations.
105     if (!permissions) {
106         logPermissionCheck({
107             path: pathname,
108             targetAspFile: null,
109             hasPermissions: false,
110             reason: 'permissions-not-loaded-yet-allowing-through',
111         });
112         await next();
113         return;
114     }
115 
116     const navContext = context.get(navigationContext);
117     const targetAspFile = resolveTargetAspFile(pathname, navContext?.fileName);
118 
119     if (!targetAspFile) {
120         logPermissionCheck({
121  ⟪?⟫


========== IMG_2345.md ==========
---
photo: IMG_2345.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/middleware.ts
lines: 83 (sticky), 99-131
orientation: 180
confidence: high
notes: Continuation of IMG_2344 (same file, scrolled further down). Sticky-scroll header pins line 83 "const permissionsMiddleware: MiddlewareFunction = async ({ request, context }, next) => {" while body shows lines 99-131 (line 99 only shows a closing brace at top edge, partly cut). This resolves line 121 from IMG_2344 (occluded there) - it is "path: pathname,". Explorer sidebar unchanged; middleware.ts (utils/) selected, tab "middleware.ts 7". Breadcrumb: aqs-web-ui > src > features > auth > middleware.ts > .... Status bar: branch "hitanshu/experimental*", 32 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. squiggly underlines (yellow/orange) visible under "file" in the .map((file) => file.toLowerCase()) calls on lines 129-130, likely implicit-any lint warnings.
---
83  const permissionsMiddleware: MiddlewareFunction = async ({ request, context }, next) => {
    ⟦sticky scroll header — body resumes at line 99⟧
99      }
100 
101     // If permissions haven't been loaded yet, allow through.
102     // authMiddleware (which runs first) already guarantees the user is authenticated.
103     // The dashboard loader will fetch permissions on the initial action=MAIN call
104     // and persist them to localStorage for subsequent navigations.
105     if (!permissions) {
106         logPermissionCheck({
107             path: pathname,
108             targetAspFile: null,
109             hasPermissions: false,
110             reason: 'permissions-not-loaded-yet-allowing-through',
111         });
112         await next();
113         return;
114     }
115 
116     const navContext = context.get(navigationContext);
117     const targetAspFile = resolveTargetAspFile(pathname, navContext?.fileName);
118 
119     if (!targetAspFile) {
120         logPermissionCheck({
121             path: pathname,
122             targetAspFile,
123             hasPermissions: true,
124             reason: 'missing-target-asp-file',
125         });
126         throw redirect('/login?reason=forbidden');
127     }
128 
129     const allowedSet = new Set(permissions.page.allowedAspFiles.map((file) => file.toLowerCase()));
130     const deniedSet = new Set(permissions.page.deniedAspFiles.map((file) => file.toLowerCase()));
131     const target = targetAspFile.toLowerCase();


========== IMG_2346.md ==========
---
photo: IMG_2346.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/middleware.ts
lines: 83 (sticky), 110-141
orientation: 180
confidence: high
notes: Continuation of IMG_2345 (same file, scrolled further down). Sticky-scroll header pins line 83 "const permissionsMiddleware: MiddlewareFunction = async ({ request, context }, next) => {" while body shows lines 110-141. A transient VS Code notification toast "Network connection is unstable." with a "Dismiss" button is overlapping the breadcrumb bar (does not obscure code lines). Explorer sidebar unchanged; middleware.ts (utils/) selected, tab "middleware.ts 7". Status bar: branch "hitanshu/experimental*", 32 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 142 (just below 141's closing brace) is cut off at the very bottom edge, not visible.
---
83  const permissionsMiddleware: MiddlewareFunction = async ({ request, context }, next) => {
    ⟦sticky scroll header — body resumes at line 110⟧
110             reason: 'permissions-not-loaded-yet-allowing-through',
111         });
112         await next();
113         return;
114     }
115 
116     const navContext = context.get(navigationContext);
117     const targetAspFile = resolveTargetAspFile(pathname, navContext?.fileName);
118 
119     if (!targetAspFile) {
120         logPermissionCheck({
121             path: pathname,
122             targetAspFile,
123             hasPermissions: true,
124             reason: 'missing-target-asp-file',
125         });
126         throw redirect('/login?reason=forbidden');
127     }
128 
129     const allowedSet = new Set(permissions.page.allowedAspFiles.map((file) => file.toLowerCase()));
130     const deniedSet = new Set(permissions.page.deniedAspFiles.map((file) => file.toLowerCase()));
131     const target = targetAspFile.toLowerCase();
132 
133     if (deniedSet.has(target)) {
134         logPermissionCheck({
135             path: pathname,
136             targetAspFile,
137             hasPermissions: true,
138             reason: 'explicitly-denied',
139         });
140         throw redirect('/login?reason=forbidden');
141     }


========== IMG_2347.md ==========
---
photo: IMG_2347.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/middleware.ts
lines: 83 (sticky), 120-152
orientation: 180
confidence: high
notes: Continuation of IMG_2346 (same file, scrolled further down by one line - overlaps almost entirely with 2346, new content is lines 142-152). Sticky-scroll header pins line 83. Line 120 "logPermissionCheck({" is partially obscured by the "Network connection is unstable." toast notification but is legible/inferable from IMG_2346. Explorer sidebar unchanged; middleware.ts (utils/) selected, tab "middleware.ts 7". Status bar: branch "hitanshu/experimental*", 32 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 152 visible only as line-number stub at bottom edge, no code content visible for it.
---
83  const permissionsMiddleware: MiddlewareFunction = async ({ request, context }, next) => {
    ⟦sticky scroll header — body resumes at line 120⟧
120         logPermissionCheck({
121             path: pathname,
122             targetAspFile,
123             hasPermissions: true,
124             reason: 'missing-target-asp-file',
125         });
126         throw redirect('/login?reason=forbidden');
127     }
128 
129     const allowedSet = new Set(permissions.page.allowedAspFiles.map((file) => file.toLowerCase()));
130     const deniedSet = new Set(permissions.page.deniedAspFiles.map((file) => file.toLowerCase()));
131     const target = targetAspFile.toLowerCase();
132 
133     if (deniedSet.has(target)) {
134         logPermissionCheck({
135             path: pathname,
136             targetAspFile,
137             hasPermissions: true,
138             reason: 'explicitly-denied',
139         });
140         throw redirect('/login?reason=forbidden');
141     }
142 
143     if (allowedSet.size > 0 && !allowedSet.has(target)) {
144         logPermissionCheck({
145             path: pathname,
146             targetAspFile,
147             hasPermissions: true,
148             reason: 'not-in-allow-list',
149         });
150         throw redirect('/login?reason=forbidden');
151     }
152 ⟪?⟫


========== IMG_2348.md ==========
---
photo: IMG_2348.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/middleware.ts
lines: 83 (sticky), 133-163 (line 133 header row obscured by toast, 134-163 fully legible; 163 is EOF)
orientation: 180
confidence: high
notes: Continuation of IMG_2347 (same file, scrolled further down). Sticky-scroll header pins line 83. Reaches end of file at line 163 - this is the final export statement, confirming full extent of middleware.ts. Explorer sidebar unchanged; middleware.ts (utils/) selected, tab "middleware.ts 7". "Network connection is unstable." toast still showing near breadcrumb (does not obscure code body). Status bar: branch "hitanshu/experimental*", 32 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
83  const permissionsMiddleware: MiddlewareFunction = async ({ request, context }, next) => {
    ⟦sticky scroll header — body resumes around line 133⟧
    ⟪row above 134 partially visible behind toast, likely "if (deniedSet.has(target)) {" from line 133⟫
134         logPermissionCheck({
135             path: pathname,
136             targetAspFile,
137             hasPermissions: true,
138             reason: 'explicitly-denied',
139         });
140         throw redirect('/login?reason=forbidden');
141     }
142 
143     if (allowedSet.size > 0 && !allowedSet.has(target)) {
144         logPermissionCheck({
145             path: pathname,
146             targetAspFile,
147             hasPermissions: true,
148             reason: 'not-in-allow-list',
149         });
150         throw redirect('/login?reason=forbidden');
151     }
152 
153     logPermissionCheck({
154         path: pathname,
155         targetAspFile,
156         hasPermissions: true,
157     });
158 
159     await next();
160 };
161 
162 export { authMiddleware, permissionsMiddleware };
163 
