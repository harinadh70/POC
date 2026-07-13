# BUNDLE for src/routes.tsx
# 12 photo fragment(s), ascending start-line order.


========== IMG_4329.md ==========
---
photo: IMG_4329.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 1-27
orientation: 180
confidence: high
notes: A hover tooltip box "module "@features/form/utils/dynamic-form-loader"" floats over the tail of line 14, obscuring its "from '...'" clause (marked illegible below). Explorer sidebar (src/utils) same file list as prior photos; under src/: app.css, app.tsx, context.ts, main.tsx, routes.tsx (selected/highlighted, tab "4"), store.ts, types.ts (cut off). Tab bar: only routes.tsx open (italic = preview tab). Status bar: aqs-web-ui, branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > routes.tsx > ...
---
1       import { lazy, Suspense } from 'react';
2       import { redirect } from 'react-router';
3       import { Loader } from '@components/loader';
4       import { GlobalErrorBoundary } from '@components/error-boundary';
5
6       // utils
7       import { clientRootLoader } from '@features/root/utils/loader';
8       import {
9           hydrateNavigationContextMiddleware,
10          rootMenuMiddleware,
11      } from '@features/root/utils/middleware';
12      import { clientLoginLoader } from '@features/auth/utils/loader';
13      import { clientLoginAction, clientLogoutAction } from '@features/auth/utils/action';
14      import { clientDashboardLoader } f⟪?⟫; (rest of line hidden behind a hover tooltip box)
15      import { dynamicFormLoader } from '@features/form/utils/dynamic-form-loader';
16      import { policyInformationLoader } from '@features/policy/utils/policyInformationLoader';
17      import { policyInformationAction } from '@features/policy/utils/action';
18      import { ultimateCoverLoader } from '@features/policy/utils/ultimateCoverLoader';
19      import { lobActionMenuLoader } from '@features/policy/utils/lobActionMenuLoader';
20      import { authMiddleware, permissionsMiddleware } from '@features/auth/middleware';
21      import { policyInfoSkipMiddleware } from '@features/policy/utils/middleware';
22      import { dashboardInitMiddleware } from '@features/dashboard/utils/middleware';
23
24      // pages
25      import Root from '@pages/root';
26
27      // types


========== IMG_4330.md ==========
---
photo: IMG_4330.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 11-38
orientation: 180
confidence: medium
notes: Photo has a motion-blur/double-exposure "ghosting" artifact (two overlapping scroll positions of the same editor, offset by ~5 lines), making rows below ~line 22 show two overlapping faint/crisp text layers. Lines 11-27 overlap content already confirmed clean in IMG_4329 (cross-checked, identical). Lines 28-38 initially reconstructed from this photo's ghosted crops but CORRECTED/confirmed against the clean, unghosted IMG_4331 (same file, view scrolled slightly further, lines 22-48 crisp): line 30 is actually a dashed divider comment "// ----...----" (not "// pages" as first guessed), and line 31 is blank. Explorer sidebar/status bar same as IMG_4329: routes.tsx selected, branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > routes.tsx > ...
---
11      } from '@features/root/utils/middleware';
12      import { clientLoginLoader } from '@features/auth/utils/loader';
13      import { clientLoginAction, clientLogoutAction } from '@features/auth/utils/action';
14      import { clientDashboardLoader } from '@features/dashboard/utils/loader';
15      import { dynamicFormLoader } from '@features/form/utils/dynamic-form-loader';
16      import { policyInformationLoader } from '@features/policy/utils/policyInformationLoader';
17      import { policyInformationAction } from '@features/policy/utils/action';
18      import { ultimateCoverLoader } from '@features/policy/utils/ultimateCoverLoader';
19      import { lobActionMenuLoader } from '@features/policy/utils/lobActionMenuLoader';
20      import { authMiddleware, permissionsMiddleware } from '@features/auth/middleware';
21      import { policyInfoSkipMiddleware } from '@features/policy/utils/middleware';
22      import { dashboardInitMiddleware } from '@features/dashboard/utils/middleware';
23
24      // pages
25      import Root from '@pages/root';
26
27      // types
28      import type { RouteObject } from 'react-router';
29
30      // ------------------------------------
31
32      const Login = lazy(() => import('@pages/login'));
33      const Dashboard = lazy(() => import('@pages/dashboard'));
34      const DynamicFormPage = lazy(() => import('@pages/dynamic-form-page'));
35      const PolicyInformationPage = lazy(() => import('@pages/PolicyInformationPage'));
36      const UltimateCoverPage = lazy(() => import('@pages/UltimateCoverPage'));
37      const LobActionMenuPage = lazy(() => import('@pages/lob-action-menu-page'));
38      const PageNotFound = lazy(() => import('@pages/page-not-found'));


========== IMG_4331.md ==========
---
photo: IMG_4331.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 22-48
orientation: 180
confidence: high
notes: Top portion (lines 22-38) is crisp/clean and confirms + corrects the reconstruction from IMG_4330 (line 30 is a dashed divider comment "// ----...----", not "// pages"; line 31 is blank). Bottom portion had a motion-blur/double-exposure ghosting artifact around lines 39-41; RESOLVED using the clean, unghosted IMG_4332 (same file, view scrolled slightly further, lines 25-51 crisp): line 39 is blank, line 40 is a second dashed divider comment "// ----...----", line 41 is blank. Lines 42-48 confirmed correct as originally transcribed. Explorer sidebar (src/utils file list) and status bar same as prior routes.tsx photos: routes.tsx selected (tab "4"), branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > routes.tsx > ...
---
22      import { dashboardInitMiddleware } from '@features/dashboard/utils/middleware';
23
24      // pages
25      import Root from '@pages/root';
26
27      // types
28      import type { RouteObject } from 'react-router';
29
30      // ------------------------------------
31
32      const Login = lazy(() => import('@pages/login'));
33      const Dashboard = lazy(() => import('@pages/dashboard'));
34      const DynamicFormPage = lazy(() => import('@pages/dynamic-form-page'));
35      const PolicyInformationPage = lazy(() => import('@pages/PolicyInformationPage'));
36      const UltimateCoverPage = lazy(() => import('@pages/UltimateCoverPage'));
37      const LobActionMenuPage = lazy(() => import('@pages/lob-action-menu-page'));
38      const PageNotFound = lazy(() => import('@pages/page-not-found'));
39
40      // ------------------------------------
41
42      const routes: RouteObject[] = [
43          {
44              id: 'root',
45              path: '/',
46              Component: Root,
47              HydrateFallback: Loader,
48              loader: clientRootLoader,


========== IMG_4332.md ==========
---
photo: IMG_4332.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 25-51
orientation: 180
confidence: high
notes: Clean, unghosted photo (unlike IMG_4330/4331 which had motion-blur double-exposure artifacts over this same region) — used to confirm/correct those two transcripts. Sticky-scroll/top-of-view cut off a partial "// pages" comment above line 25 (visible as a sliver at very top). Explorer sidebar (src/utils file list) same as prior routes.tsx photos; under src/: app.css, app.tsx, context.ts, main.tsx, routes.tsx (selected/highlighted, tab "4"), store.ts, types.ts (cut off). Status bar: aqs-web-ui, branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > routes.tsx > ...
---
25      import Root from '@pages/root';
26
27      // types
28      import type { RouteObject } from 'react-router';
29
30      // ------------------------------------
31
32      const Login = lazy(() => import('@pages/login'));
33      const Dashboard = lazy(() => import('@pages/dashboard'));
34      const DynamicFormPage = lazy(() => import('@pages/dynamic-form-page'));
35      const PolicyInformationPage = lazy(() => import('@pages/PolicyInformationPage'));
36      const UltimateCoverPage = lazy(() => import('@pages/UltimateCoverPage'));
37      const LobActionMenuPage = lazy(() => import('@pages/lob-action-menu-page'));
38      const PageNotFound = lazy(() => import('@pages/page-not-found'));
39
40      // ------------------------------------
41
42      const routes: RouteObject[] = [
43          {
44              id: 'root',
45              path: '/',
46              Component: Root,
47              HydrateFallback: Loader,
48              loader: clientRootLoader,
49              middleware: [hydrateNavigationContextMiddleware, rootMenuMiddleware],
50              ErrorBoundary: GlobalErrorBoundary,
51              children: [


========== IMG_4333.md ==========
---
photo: IMG_4333.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 42-69
orientation: 180
confidence: high
notes: Lines 42-51 duplicate content already confirmed clean in IMG_4332 (root route object head); this photo again has a motion-blur/double-exposure ghosting artifact over roughly lines 42-63 (faint duplicate text bleeding from an earlier scroll position), but the crisp foreground layer was isolated via multiple zoomed crops and is consistent/coherent, so overall confidence is high. Line 68's trailing comment text is cut off at the right edge of the visible laptop screen in the photo ("for authenticated r...") — the rest is outside the photographed frame, not just illegible, so left as truncated rather than guessed. Explorer sidebar (src/utils file list) same as prior; routes.tsx selected (tab "4"). Status bar: aqs-web-ui, branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > routes.tsx > ...
---
42      const routes: RouteObject[] = [
43          {
44              id: 'root',
45              path: '/',
46              Component: Root,
47              HydrateFallback: Loader,
48              loader: clientRootLoader,
49              middleware: [hydrateNavigationContextMiddleware, rootMenuMiddleware],
50              ErrorBoundary: GlobalErrorBoundary,
51              children: [
52                  {
53                      path: 'login',
54                      loader: clientLoginLoader,
55                      action: clientLoginAction,
56                      element: (
57                          <Suspense fallback={<Loader />}>
58                              <Login />
59                          </Suspense>
60                      ),
61                  },
62                  {
63                      id: 'dashboard',
64                      path: 'Main_ISLLSYS_20010101',
65                      loader: clientDashboardLoader,
66                      middleware: [
67                          authMiddleware, // Must run first: ensures authenticated user/session context.
68                          permissionsMiddleware, // Must run second: enforces page-level access for authenticated r⟪cut off at screen edge⟫
69                          dashboardInitMiddleware, // Feature-specific initialization after auth/permissions pass.


========== IMG_4334.md ==========
---
photo: IMG_4334.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 42-80
orientation: 180
confidence: high
notes: Sticky-scroll headers at top show enclosing scope lines 42 "const routes: RouteObject[] = [" and 51 "children: [" (lines 52-55 scrolled out of view above, not visible). Lines 62-69 (dashboard child route head) duplicate/confirm IMG_4333. Rows ~66-76 again show a faint motion-blur ghost duplicate of the same middleware/element block bleeding through, but the crisp foreground layer is clear and was cross-checked at high zoom. Line 68's comment is again cut off at the photographed screen edge ("for authenticated r..."), same as in IMG_4333. Explorer sidebar (src/utils file list) unchanged; routes.tsx selected (tab "4"). Status bar: aqs-web-ui, branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > routes.tsx > ...
---
42      const routes: RouteObject[] = [
   (sticky scroll header)
51          children: [
   (sticky scroll header)
56                  element: (
57                      <Suspense fallback={<Loader />}>
58                          <Login />
59                      </Suspense>
60                  ),
61              },
62              {
63                  id: 'dashboard',
64                  path: 'Main_ISLLSYS_20010101',
65                  loader: clientDashboardLoader,
66                  middleware: [
67                      authMiddleware, // Must run first: ensures authenticated user/session context.
68                      permissionsMiddleware, // Must run second: enforces page-level access for authenticated r⟪cut off at screen edge⟫
69                      dashboardInitMiddleware, // Feature-specific initialization after auth/permissions pass.
70                  ],
71                  element: (
72                      <Suspense fallback={<Loader />}>
73                          <Dashboard />
74                      </Suspense>
75                  ),
76              },
77              {
78                  id: 'dynamic-form',
79                  path: 'form/:aspFileName/:policyId?',
80                  loader: dynamicFormLoader,


========== IMG_4335.md ==========
---
photo: IMG_4335.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 42-83
orientation: 180
confidence: high
notes: Sticky-scroll headers show enclosing scope lines 42 "const routes: RouteObject[] = [" and 51 "children: [". Rows ~61-76 are heavily triple/quadruple-ghosted (motion blur from continued scrolling) but duplicate content already confirmed clean in IMG_4334 (dashboard child route: id/path/loader/middleware/element block), so not re-transcribed in detail here beyond a summary. Rows 77-82 (start of the "dynamic-form" child route object) were isolated via a tight zoom crop and are reliable/crisp. Row 83 is only a sliver visible at the very bottom edge of the editor, cut off by the status bar. Explorer sidebar (src/utils file list) unchanged; routes.tsx selected (tab "4"). Status bar: aqs-web-ui, branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > routes.tsx > ...
---
42      const routes: RouteObject[] = [
   (sticky scroll header)
51          children: [
   (sticky scroll header)
61              },  [-- duplicate of IMG_4334 lines 61-76 (dashboard child route object), heavily ghosted here, see IMG_4334 for clean transcription --]
...
76              },
77              {
78                  id: 'dynamic-form',
79                  path: 'form/:aspFileName/:policyId?',
80                  loader: dynamicFormLoader,
81                  middleware: [authMiddleware, permissionsMiddleware],
82                  element: (
83                      ⟪?⟫ (only a sliver visible, cut off by status bar; pattern from other entries suggests "<Suspense fallback={<Loader />}>")


========== IMG_4336.md ==========
---
photo: IMG_4336.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 71-101
orientation: 180
confidence: high
notes: Sticky-scroll headers show enclosing scope lines 42 "const routes: RouteObject[] = [" and 51 "children: [". Whole photo has a motion-blur/double-exposure ghosting artifact from continued scrolling; content isolated via multiple zoomed crops. Lines 71-82 (dynamic-form route head) duplicate/confirm IMG_4334/4335. Lines 86-88 ("),", "},", "{") were not independently legible in this photo but are a high-confidence inference from the exact same three-line transition pattern used at every other child-route boundary in this file (e.g. lines 75-77, 97-99, all confirmed directly); everything else on this photo was read directly from zoomed crops. Explorer sidebar (src/utils file list) unchanged; routes.tsx selected (tab "4"). Status bar: aqs-web-ui, branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > routes.tsx > ...
---
42      const routes: RouteObject[] = [
   (sticky scroll header)
51          children: [
   (sticky scroll header)
71                  element: (
72                      <Suspense fallback={<Loader />}>
73                          <Dashboard />
74                      </Suspense>
75                  ),
76              },
77              {
78                  id: 'dynamic-form',
79                  path: 'form/:aspFileName/:policyId?',
80                  loader: dynamicFormLoader,
81                  middleware: [authMiddleware, permissionsMiddleware],
82                  element: (
83                      <Suspense fallback={<Loader />}>
84                          <DynamicFormPage />
85                      </Suspense>
86                  ),
87              },
88              {
89                  path: 'policyinfo',
90                  loader: policyInformationLoader,
91                  action: policyInformationAction,
92                  middleware: [policyInfoSkipMiddleware, authMiddleware, permissionsMiddleware],
93                  element: (
94                      <Suspense fallback={<Loader />}>
95                          <PolicyInformationPage />
96                      </Suspense>
97                  ),
98              },
99              {
100                 path: 'ultimate-cover',
101                 loader: ultimateCoverLoader,


========== IMG_4337.md ==========
---
photo: IMG_4337.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 97-119
orientation: 180
confidence: high
notes: Sticky-scroll headers show enclosing scope lines 42 "const routes: RouteObject[] = [" and 51 "children: [" (a third sticky line is present but obscured/illegible). Whole photo has a motion-blur/double-exposure ghosting artifact from continued scrolling. Lines 97-101 duplicate/confirm IMG_4336 (end of policyinfo route, start of ultimate-cover route). Lines 103-105 ("element: (", "<Suspense fallback={<Loader />}>", "<UltimateCoverPage />") were not independently legible (gutter numbers 103-105 obscured by ghosting) but are a high-confidence inference from the identical element/Suspense pattern confirmed directly at every other child route in this file, and are bracketed by directly-read lines 102 and 106-108. Line 119 ("{") is the last content visible before the status bar cuts off the view. Explorer sidebar (src/utils file list) unchanged; routes.tsx selected (tab "4"). Status bar: aqs-web-ui, branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > routes.tsx > ...
---
42      const routes: RouteObject[] = [
   (sticky scroll header)
51          children: [
   (sticky scroll header)
97                  ),
98              },
99              {
100                 path: 'ultimate-cover',
101                 loader: ultimateCoverLoader,
102                 middleware: [authMiddleware, permissionsMiddleware],
103                 element: (
104                     <Suspense fallback={<Loader />}>
105                         <UltimateCoverPage />
106                     </Suspense>
107                 ),
108             },
109             {
110                 path: 'lob-action-menu',
111                 loader: lobActionMenuLoader,
112                 middleware: [authMiddleware, permissionsMiddleware],
113                 element: (
114                     <Suspense fallback={<Loader />}>
115                         <LobActionMenuPage />
116                     </Suspense>
117                 ),
118             },
119             {


========== IMG_4338.md ==========
---
photo: IMG_4338.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 100-125
orientation: 180
confidence: high
notes: Photo has a pronounced ghosting/motion-blur artifact (looks like the RDP/remote-desktop screen was mid-refresh) — every code line shows a faint duplicate of nearby content offset ~3 lines above its sharp/bold rendering. Line numbers in gutter (100-125) are unambiguous and sharp. Code content reconstructed by combining clearly-legible anchor lines (100-105, and the PageNotFound block near 119-125) with the file's evident repeating route-object pattern (path/loader/middleware/element+Suspense+Page), which is internally consistent and closes exactly on line count. Reconstruction of lines 118-125 independently corroborated by the clearer follow-up photo IMG_4339 (same file, scrolled slightly further), which read lines 118-125 identically — confidence upgraded from medium to high on that basis. Sticky-scroll headers at top show enclosing scope: line 42 "const routes: RouteObject[] = [" and line 51 "children: [". Explorer sidebar (visible, not the active view) shows src/utils/ files: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...(truncated), url-helpers.ts, user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts; and src/ files: app.css, app.tsx, context.ts, main.tsx, routes.tsx (active, badge "4"), store.ts, t...(cut off, likely types.ts). Status bar: branch "hitanshu/experimental*", "No Solution", problems "6 errors 0 warnings". Tab bar shows single tab "routes.tsx" with modified dot/count "4". Window titled "w00w11dev0067" (remote desktop session), taskbar clock 19:52 10-07-2026, weather widget "26°C Mostly cloudy".
---
```
42      const routes: RouteObject[] = [
51          children: [
100             path: 'ultimate-cover',
101             loader: ultimateCoverLoader,
102             middleware: [authMiddleware, permissionsMiddleware],
103             element: (
104                 <Suspense fallback={<Loader />}>
105                     <UltimateCoverPage />
106                 </Suspense>
107             ),
108         },
109         {
110             path: 'lob-action-menu',
111             loader: lobActionMenuLoader,
112             middleware: [authMiddleware, permissionsMiddleware],
113             element: (
114                 <Suspense fallback={<Loader />}>
115                     <LobActionMenuPage />
116                 </Suspense>
117             ),
118         },
119         {
120             path: 'PageNotFound',
121             element: (
122                 <Suspense fallback={<Loader />}>
123                     <PageNotFound />
124                 </Suspense>
125             ),
```
(view scrolled off-screen below line 125; closing `},` for this object and the array/function closers were not visible in this photo)


========== IMG_4339.md ==========
---
photo: IMG_4339.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 113-140
orientation: 180
confidence: high
notes: Same remote-desktop screen as IMG_4338 (routes.tsx), scrolled down slightly — this photo's lines 118-125 corroborate IMG_4338's reconstructed lines 118-125 exactly, cross-confirming both photos. Photo again has a mild ghosting/motion-blur artifact (faint duplicate of nearby lines offset 2-3 rows), but gutter line numbers and bold/sharp text were legible enough to transcribe directly with high confidence this time. Sticky-scroll headers at top: line 42 "const routes: RouteObject[] = [" and line 51 "children: [". Line 140 "]," closes the children array opened at line 51. A further fragment "),." is visible right below line 140 (partially into the next statement/route object) but is cut off at the editor viewport edge and not legible enough to transcribe. Explorer sidebar unchanged from IMG_4338 (same file tree, routes.tsx active with modified badge "4"). Status bar: branch "hitanshu/experimental*", "No Solution", 6 errors/0 warnings. Window "w00w11dev0067" remote desktop, taskbar clock 19:52 10-07-2026.
---
```
42      const routes: RouteObject[] = [
51          children: [
113             element: (
114                 <Suspense fallback={<Loader />}>
115                     <LobActionMenuPage />
116                 </Suspense>
117             ),
118         },
119         {
120             path: 'PageNotFound',
121             element: (
122                 <Suspense fallback={<Loader />}>
123                     <PageNotFound />
124                 </Suspense>
125             ),
126         },
127         {
128             path: 'logout',
129             loader: () => redirect('/login'),
130             action: clientLogoutAction,
131         },
132         {
133             path: '*',
134             element: (
135                 <Suspense fallback={<Loader />}>
136                     <PageNotFound />
137                 </Suspense>
138             ),
139         },
140     ],
```
(fragment "),." visible immediately below line 140, cut off at viewport edge — not legible)


========== IMG_4340.md ==========
---
photo: IMG_4340.JPG
type: vscode-code
file: aqs-web-ui/src/routes.tsx
lines: 134-147
orientation: 180
confidence: high
notes: Same remote-desktop VS Code session as IMG_4338/4339 (routes.tsx), scrolled to the end of the file — this is the tail end (file is 147 lines total, line 147 is a trailing blank line). No ghosting artifact in this photo, text is crisp. Sticky-scroll headers at top show line 42 "const routes: RouteObject[] = [" and line 51 "children: [". Line 134 "element: (" through 138 "),", 139 "}," matches/continues the wildcard '*' PageNotFound block transcribed in IMG_4339 (lines 132-139). Line 140 "]," closes the children array (opened line 51); line 141 "}," closes the enclosing route object; line 142 "];" closes the top-level routes array (opened line 42). Line 144 is a horizontal-rule style comment "// ---...---". Line 146 "export { routes };" is the file's default/named export. Tab title "routes.tsx" shown italicized (preview-mode tab) with modified-lines badge "4". Explorer sidebar unchanged (utils/ files, app.css, app.tsx, context.ts, main.tsx, routes.tsx active, store.ts). Status bar: branch "hitanshu/experimental*", "No Solution", 6 errors/0 warnings. Window "w00w11dev0067", taskbar clock 19:52 10-07-2026.
---
```
42      const routes: RouteObject[] = [
51          children: [
134             element: (
138             ),
139         },
140     ],
141     },
142 ];
143
144 // ------------------------------------
145
146 export { routes };
147
```
