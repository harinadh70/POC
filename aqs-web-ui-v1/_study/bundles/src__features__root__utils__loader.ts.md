# BUNDLE for src/features/root/utils/loader.ts
# 17 photo fragment(s), ascending start-line order.


========== IMG_2709.md ==========
---
photo: IMG_2709.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 1-34
orientation: 180
confidence: high
notes: >
  Clear, sharp photo, no ghosting. Tab bar shows only "loader.ts" open (with "4" —
  likely 4 problems/references badge, or unsaved-group indicator). Breadcrumb:
  aqs-web-ui > src > features > root > utils > loader.ts > ...
  Explorer sidebar (aqs-web-ui/src/features), expanded: policy > utils
  (ultimateCoverLoader.ts, FieldRenderer.tsx, index.ts, policy-information-fields.ts,
  types.ts, ultimate-cover-fields.ts); prp > components (MlcSumList.tsx, "U"=modified),
  services (prp.ts, "U"), utils (loader.ts, "U"); root > services (user-data.ts),
  utils (loader.ts — highlighted/open, middleware.ts visible below it). Collapsed
  below: hooks, lib (with unsaved-change dot), OUTLINE, TIMELINE, C# PROJECT DETAILS.
  Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Bottom-left: workspace
  "aqs-web-ui", branch "hitanshu/experimental*" (dirty), Problems 6 errors / 0 warnings,
  "No Solution". Clock 5:17 PM 7/10/2026 (client machine clock).
  Line 34 is cut off at the very bottom edge of the editor viewport (only top of
  glyphs visible) — recovered via zoom crop.
---
 1: import { redirect } from 'react-router';
 2:
 3: // context
 4: import { navigationContext, permissionsContext } from '@/context';
 5:
 6: // services
 7: import { type SessionInfo } from '@features/auth/services/auth';
 8: import { fetchUserData } from '@features/root/services/user-data';
 9:
10: // utils
11: import isEmpty from 'lodash-es/isEmpty';
12: import { getItem } from '@utils/local-storage';
13: import { getMenuData } from '@utils/menu-persistence';
14: import { readContextFromStorage, mergeStoredContext } from '@utils/session-sync';
15: import { safeAwait } from '@utils/common';
16: import { initializePermissions, isPermissionsInitialized } from '@utils/permission-store';
17:
18: // types
19: import type { LoaderFunctionArgs } from 'react-router';
20:
21: // ----------------------------------------
22:
23: export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
24:     const emptyMenuInfo = {
25:         menus: [],
26:         queryString: '',
27:     };
28:
29:     const parseMenuInfo = (source: unknown): { menus: unknown[]; queryString: string } => {
30:         if (!source || typeof source !== 'object') {
31:             return emptyMenuInfo;
32:         }
33:
34:         if ('menus' in source && Array.isArray(source.menus)) {


========== IMG_2710.md ==========
---
photo: IMG_2710.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 14-47
orientation: 180
confidence: high
notes: >
  Slight motion-blur double-exposure ghosting (fainter duplicate offset down/right by
  a few lines), but the primary/bold text layer is legible throughout. This photo is
  a scroll-down continuation of IMG_2709 (same file, loader.ts) — confirms line 34
  reads "if ('menus' in source && Array.isArray(source.menus)) {" with NO leading "!"
  negation (corrected IMG_2709.md, which had misread it as negated due to lower
  confidence at the cut-off bottom edge of that photo).
  Explorer sidebar identical to IMG_2709 (aqs-web-ui/src/features expanded: policy >
  utils [...]; prp > components/services/utils [...]; root > services [user-data.ts],
  utils [loader.ts highlighted/open, middleware.ts]). Tab bar: only "loader.ts" open.
  Breadcrumb: aqs-web-ui > src > features > root > utils > loader.ts > ...
  Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Bottom-left: workspace
  "aqs-web-ui", branch "hitanshu/experimental*" (dirty), Problems 6 errors / 0 warnings,
  "No Solution". Clock 5:17 PM 7/10/2026.
---
14:     import { readContextFromStorage, mergeStoredContext } from '@utils/session-sync';
15:     import { safeAwait } from '@utils/common';
16:     import { initializePermissions, isPermissionsInitialized } from '@utils/permission-store';
17:
18:     // types
19:     import type { LoaderFunctionArgs } from 'react-router';
20:
21:     // ----------------------------------------
22:
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
24:         const emptyMenuInfo = {
25:             menus: [],
26:             queryString: '',
27:         };
28:
29:         const parseMenuInfo = (source: unknown): { menus: unknown[]; queryString: string } => {
30:             if (!source || typeof source !== 'object') {
31:                 return emptyMenuInfo;
32:             }
33:
34:             if ('menus' in source && Array.isArray(source.menus)) {
35:                 return {
36:                     menus: source.menus,
37:                     queryString:
38:                         'queryString' in source && typeof source.queryString === 'string'
39:                             ? source.queryString
40:                             : emptyMenuInfo.queryString,
41:                 };
42:             }
43:
44:             if (
45:                 'xmlDetail' in source &&
46:                 typeof source.xmlDetail === 'object' &&
47:                 source.xmlDetail !== null


========== IMG_2711.md ==========
---
photo: IMG_2711.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 23-68 (sticky headers 23, 29; body 37-68)
orientation: 180
confidence: high
notes: >
  Clear, sharp photo, minimal ghosting. VS Code sticky-scroll shows two pinned
  enclosing-scope headers at top: line 23 "export async function clientRootLoader(...)"
  and line 29 "const parseMenuInfo = (source: unknown): {...} => {". Below the sticky
  divider, the visible body is lines 37-68, which overlaps the tail of IMG_2710 (lines
  37-47, confirming that transcript) and extends further into a second if-block parsing
  legacy xmlDetail.mxmlPageData.menus.menu structure. Same file as IMG_2709/IMG_2710
  (loader.ts, clientRootLoader/parseMenuInfo). Explorer sidebar identical to prior two
  photos. Tab bar: only "loader.ts" open. Breadcrumb: aqs-web-ui > src > features > root
  > utils > loader.ts > ... Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Bottom-left: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), Problems
  6 errors / 0 warnings, "No Solution". Clock 5:17 PM 7/10/2026.
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
   (sticky-scroll header)
29:         const parseMenuInfo = (source: unknown): { menus: unknown[]; queryString: string } => {
   (sticky-scroll header)
37:                     queryString:
38:                         'queryString' in source && typeof source.queryString === 'string'
39:                             ? source.queryString
40:                             : emptyMenuInfo.queryString,
41:                 };
42:             }
43:
44:             if (
45:                 'xmlDetail' in source &&
46:                 typeof source.xmlDetail === 'object' &&
47:                 source.xmlDetail !== null
48:             ) {
49:                 const xmlDetail = source.xmlDetail;
50:                 const menus =
51:                     'mxmlPageData' in xmlDetail &&
52:                     typeof xmlDetail.mxmlPageData === 'object' &&
53:                     xmlDetail.mxmlPageData !== null &&
54:                     'menus' in xmlDetail.mxmlPageData &&
55:                     typeof xmlDetail.mxmlPageData.menus === 'object' &&
56:                     xmlDetail.mxmlPageData.menus !== null &&
57:                     'menu' in xmlDetail.mxmlPageData.menus &&
58:                     Array.isArray(xmlDetail.mxmlPageData.menus.menu)
59:                         ? xmlDetail.mxmlPageData.menus.menu
60:                         : [];
61:
62:                 return {
63:                     menus,
64:                     queryString:
65:                         'queryString' in source && typeof source.queryString === 'string'
66:                             ? source.queryString
67:                             : emptyMenuInfo.queryString,
68:                 };


========== IMG_2712.md ==========
---
photo: IMG_2712.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 23-78 (sticky headers 23, 29; body 48-78)
orientation: 180
confidence: high
notes: >
  Clear, sharp photo. Sticky-scroll headers pinned: line 23
  "export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {"
  and line 29 "const parseMenuInfo = (source: unknown): { menus: unknown[]; queryString: string } => {".
  Body visible 48-78, continuing directly from IMG_2711 (confirms lines 48-68 match,
  extends further: closes parseMenuInfo function at 69-72, then clientRootLoader
  continues at 74 with `const url = new URL(request.url);` and a login-page early
  return at 77-78. Same file as IMG_2709/2710/2711 (loader.ts). Explorer sidebar
  identical to prior photos in this group. Tab bar: only "loader.ts" open.
  Breadcrumb: aqs-web-ui > src > features > root > utils > loader.ts > ...
  Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Bottom-left: workspace
  "aqs-web-ui", branch "hitanshu/experimental*" (dirty), Problems 6 errors / 0 warnings,
  "No Solution". Clock 5:17 PM 7/10/2026. Line 78 is cut off at the very bottom edge
  of the viewport (glyphs visible but partial) — read from the sharp legible pixels.
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
   (sticky-scroll header)
29:         const parseMenuInfo = (source: unknown): { menus: unknown[]; queryString: string } => {
   (sticky-scroll header)
48:             ) {
49:                 const xmlDetail = source.xmlDetail;
50:                 const menus =
51:                     'mxmlPageData' in xmlDetail &&
52:                     typeof xmlDetail.mxmlPageData === 'object' &&
53:                     xmlDetail.mxmlPageData !== null &&
54:                     'menus' in xmlDetail.mxmlPageData &&
55:                     typeof xmlDetail.mxmlPageData.menus === 'object' &&
56:                     xmlDetail.mxmlPageData.menus !== null &&
57:                     'menu' in xmlDetail.mxmlPageData.menus &&
58:                     Array.isArray(xmlDetail.mxmlPageData.menus.menu)
59:                         ? xmlDetail.mxmlPageData.menus.menu
60:                         : [];
61:
62:                 return {
63:                     menus,
64:                     queryString:
65:                         'queryString' in source && typeof source.queryString === 'string'
66:                             ? source.queryString
67:                             : emptyMenuInfo.queryString,
68:                 };
69:             }
70:
71:             return emptyMenuInfo;
72:         };
73:
74:         const url = new URL(request.url);
75:
76:         // Skip MENU API call on login page
77:         if (url.pathname === '/login') {
78:             return { userInfo: undefined, menuInfo: undefined, permissionInfo: null };


========== IMG_2713.md ==========
---
photo: IMG_2713.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 23-86 (sticky headers 23, 29; body 50-86)
orientation: 180
confidence: high
notes: >
  Moderate motion-blur double-exposure ghosting (fainter duplicate offset down by
  several rows), but primary/bold text layer is legible throughout, cross-checked
  against IMG_2712 for the overlapping lines 50-72 (all consistent). Sticky-scroll
  headers pinned: line 23 "export async function clientRootLoader(...)" and line 29
  "const parseMenuInfo = (source: unknown): {...} => {". New content beyond IMG_2712
  starts at line 73 (blank), then clientRootLoader body resumes: const url, early
  return for /login pathname, and start of "Step 1: Extract canonical parameters from
  URL" block building urlParams from action/policyid/nodekey search params. Same file
  as IMG_2709-2712 (loader.ts). Explorer sidebar identical to prior photos. Tab bar:
  only "loader.ts" open. Breadcrumb: aqs-web-ui > src > features > root > utils >
  loader.ts > ... Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Bottom-left: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty),
  Problems 6 errors / 0 warnings, "No Solution". Clock 5:17 PM 7/10/2026. Line 86 cut
  off at very bottom edge of viewport, recovered via zoom crop.
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
   (sticky-scroll header)
29:         const parseMenuInfo = (source: unknown): { menus: unknown[]; queryString: string } => {
   (sticky-scroll header)
50:                 const menus =
   (partially re-shown under sticky divider before real body resumes at 57)
57:                     'menu' in xmlDetail.mxmlPageData.menus &&
58:                     Array.isArray(xmlDetail.mxmlPageData.menus.menu)
59:                         ? xmlDetail.mxmlPageData.menus.menu
60:                         : [];
61:
62:                 return {
63:                     menus,
64:                     queryString:
65:                         'queryString' in source && typeof source.queryString === 'string'
66:                             ? source.queryString
67:                             : emptyMenuInfo.queryString,
68:                 };
69:             }
70:
71:             return emptyMenuInfo;
72:         };
73:
74:         const url = new URL(request.url);
75:
76:         // Skip MENU API call on login page
77:         if (url.pathname === '/login') {
78:             return { userInfo: undefined, menuInfo: undefined, permissionInfo: null };
79:         }
80:
81:         // Step 1: Extract canonical parameters from URL (for new window or page reload with params)
82:         // URL params have PRIORITY over stored context (server is source of truth)
83:         const urlParams = {
84:             action: url.searchParams.get('action') || undefined,
85:             policyId: url.searchParams.get('policyid') || undefined,
86:             nodeKey: url.searchParams.get('nodekey') || undefined,


========== IMG_2714.md ==========
---
photo: IMG_2714.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 23-95 (sticky headers 23, 29; body 64-92, plus console.log block ~94-96)
orientation: 180
confidence: medium
notes: >
  Motion-blur double-exposure ghosting present throughout (fainter duplicate offset
  ~1 row), heaviest in the bottom console.log block. Cross-checked against IMG_2713
  for the overlapping lines 64-86 (all consistent). Sticky-scroll headers pinned:
  line 23 "export async function clientRootLoader(...)" and line 29
  "const parseMenuInfo = (source: unknown): {...} => {". New content beyond IMG_2713:
  urlParams object gains more fields (userId, compLoc, diagnosticMode, xmlDetail, tab)
  then closes at line 92, followed by a block of console.log('[DEBUG] ...') calls: a
  rocket-emoji "ROOT LOADER - Window Initialization" banner line, a "====" separator
  line, and a "URL Path:" logging line.
  CORRECTION (after cross-referencing the much clearer IMG_2716, which unambiguously
  shows line 94 = the ROOT LOADER banner): this transcript's original line numbers for
  the console.log block were off by one (had banner at 93). Corrected below to line 94
  = ROOT LOADER banner, 95 = "====" separator, with an inferred blank line at 93
  between the urlParams closing brace (92) and the banner (94). The banner/separator/
  URL-Path log text itself was always read correctly; only the line-number mapping
  changed. See IMG_2716.md for the authoritative, high-confidence numbering of this
  whole console.log block (lines 94-126). Same file as IMG_2709-2713 (loader.ts).
  Explorer sidebar identical to prior photos (note: prp folder now shows a plain dot
  instead of "U" on some rows — same set of files). Tab bar: only "loader.ts" open.
  Breadcrumb: aqs-web-ui > src > features > root > utils > loader.ts > ... Status bar:
  Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Bottom-left: workspace "aqs-web-ui",
  branch "hitanshu/experimental*" (dirty), Problems 6 errors / 0 warnings, "No
  Solution". Clock 5:17 PM 7/10/2026.
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
   (sticky-scroll header)
29:         const parseMenuInfo = (source: unknown): { menus: unknown[]; queryString: string } => {
   (sticky-scroll header)
64:                     queryString:
65:                         'queryString' in source && typeof source.queryString === 'string'
66:                             ? source.queryString
67:                             : emptyMenuInfo.queryString,
68:                 };
69:             }
70:
71:             return emptyMenuInfo;
72:         };
73:
74:         const url = new URL(request.url);
75:
76:         // Skip MENU API call on login page
77:         if (url.pathname === '/login') {
78:             return { userInfo: undefined, menuInfo: undefined, permissionInfo: null };
79:         }
80:
81:         // Step 1: Extract canonical parameters from URL (for new window or page reload with params)
82:         // URL params have PRIORITY over stored context (server is source of truth)
83:         const urlParams = {
84:             action: url.searchParams.get('action') || undefined,
85:             policyId: url.searchParams.get('policyid') || undefined,
86:             nodeKey: url.searchParams.get('nodekey') || undefined,
87:             userId: url.searchParams.get('userid') || undefined,
88:             compLoc: url.searchParams.get('comploc') || undefined,
89:             diagnosticMode: url.searchParams.get('diagnosticmode') || undefined,
90:             xmlDetail: url.searchParams.get('xmldetail') || undefined,
91:             tab: url.searchParams.get('tab') || undefined,
92:         };
93:
94:         console.log('[DEBUG] 🚀 ROOT LOADER - Window Initialization');
95:         console.log('[DEBUG] ==========================================');
   (line 96 "console.log('[DEBUG] URL Path:', url.pathname);" begins but is cut off
   at the bottom edge of this photo's viewport — see IMG_2716.md for confirmed text)


========== IMG_2715.md ==========
---
photo: IMG_2715.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 23-107 (sticky header 23; body ~92-107)
orientation: 180
confidence: medium
notes: >
  CORRECTED after cross-referencing the much clearer IMG_2716 (which unambiguously
  anchors line 94 = the ROOT LOADER banner and line 100 = the "Step 2" comment). This
  photo has severe motion-blur / multi-exposure ghosting, which had caused an earlier
  version of this transcript to misalign line numbers by several rows (a duplicate-
  looking echo of the banner/URL-Path/URL-Params logs around rows 96-100 turned out to
  be ghosting, not real duplicated code). Numbering below now matches IMG_2716.md.
  Top portion of this photo (roughly lines 73-91, sticky header at line 23 only —
  parseMenuInfo's line-29 sticky header is gone, confirming scroll has passed it)
  duplicates content already transcribed cleanly in IMG_2713/IMG_2714 and was not
  re-transcribed here. Same file as IMG_2709-2714 (loader.ts). Explorer sidebar same
  as prior photos. Tab bar: only "loader.ts" open. Breadcrumb: aqs-web-ui > src >
  features > root > utils > loader.ts > ... Status bar: Ln 1, Col 1, Tab Size 4,
  UTF-8, CRLF, TypeScript. Bottom-left: workspace "aqs-web-ui", branch
  "hitanshu/experimental*" (dirty), Problems 6 errors / 0 warnings, "No Solution".
  Clock 5:17 PM 7/10/2026.
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
   (sticky-scroll header; only one header now, parseMenuInfo scrolled out of scope)
92:         };
93:
94:         console.log('[DEBUG] 🚀 ROOT LOADER - Window Initialization');
95:         console.log('[DEBUG] ==========================================');
96:         console.log('[DEBUG] URL Path:', url.pathname);
97:         console.log('[DEBUG] URL Params:', urlParams);
98:         console.log('[DEBUG] ==========================================');
99:
100:        // Step 2: Read stored context from sessionStorage (window-scoped backup)
101:        const storedContext = readContextFromStorage();
102:
103:        console.log('[DEBUG] Stored Context (sessionStorage):', storedContext);
104:        console.log('[DEBUG] ==========================================');
105:
106:        // Step 3: Merge URL params (priority) with stored context (fallback)
107:        // If neither exists, currentContext will be empty and runtime will initialize from sessionInformation


========== IMG_2716.md ==========
---
photo: IMG_2716.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 23-126 (sticky header 23; body 94-126)
orientation: 180
confidence: high
notes: >
  Sharpest/clearest photo of this loader.ts console.log block in the batch — used to
  correct line-number ambiguity in IMG_2714 and IMG_2715 (see those files' notes).
  Sticky-scroll header: line 23 "export async function clientRootLoader(...)" only
  (parseMenuInfo scrolled out of scope). Body starts at line 94 (ROOT LOADER banner),
  confirming lines 92-93 (urlParams closing brace + blank) are scrolled just above the
  visible viewport. Content: a heavily "[DEBUG]"-instrumented section that logs URL
  params, reads stored context from sessionStorage, merges URL params with stored
  context via mergeStoredContext(), and logs a "Session initialization check" object,
  followed by the start of a "Step 4: Update context with merged values" block. Minor
  ghosting remains (fainter duplicate ~3 rows offset) — line 121's exact content is
  uncertain (a "hasCurrentContext: !!currentContext," ghost appears there, likely
  bled from line 118; true content of 121 could not be confidently resolved, marked
  below). Explorer sidebar identical to prior photos. Tab bar: only "loader.ts" open.
  Breadcrumb: aqs-web-ui > src > features > root > utils > loader.ts > ... Status bar:
  Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Bottom-left: workspace "aqs-web-ui",
  branch "hitanshu/experimental*" (dirty), Problems 6 errors / 0 warnings, "No
  Solution". Clock 5:17 PM 7/10/2026.
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
   (sticky-scroll header)
94:         console.log('[DEBUG] 🚀 ROOT LOADER - Window Initialization');
95:         console.log('[DEBUG] ==========================================');
96:         console.log('[DEBUG] URL Path:', url.pathname);
97:         console.log('[DEBUG] URL Params:', urlParams);
98:         console.log('[DEBUG] ==========================================');
99:
100:        // Step 2: Read stored context from sessionStorage (window-scoped backup)
101:        const storedContext = readContextFromStorage();
102:
103:        console.log('[DEBUG] Stored Context (sessionStorage):', storedContext);
104:        console.log('[DEBUG] ==========================================');
105:
106:        // Step 3: Merge URL params (priority) with stored context (fallback)
107:        // If neither exists, currentContext will be empty and runtime will initialize from sessionInformation
108:        const currentContext = context.get(navigationContext);
109:        const mergedContext = mergeStoredContext(urlParams, storedContext);
110:
111:        console.log('[DEBUG] Current Context (React Router):', currentContext);
112:        console.log('[DEBUG] Merged Context (URL + Storage):', mergedContext);
113:        console.log('[DEBUG] ==========================================');
114:
115:        console.log('[clientRootLoader] Session initialization check', {
116:            hasUrlParams: Object.values(urlParams).some((v) => v !== undefined),
117:            hasStoredContext: !!storedContext,
118:            hasCurrentContext: !!currentContext,
119:            mergedAction: mergedContext.action,
120:            mergedPolicyId: mergedContext.policyId,
121: ⟪?⟫ (uncertain — ghosting; may be blank/no extra property before the closing brace)
122:        });
123:
124:        // Step 4: Update context with merged values if we have any
125:        // This ensures new windows and page reloads get initialized correctly
126:        if (mergedContext.action || mergedContext.policyId) {


========== IMG_2717.md ==========
---
photo: IMG_2717.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 23-136 (sticky header 23; body 105-136, new content 127-136)
orientation: 180
confidence: high
notes: >
  Clear photo, moderate ghosting (fainter duplicate offset a few rows), but text is
  legible throughout and line numbers cross-verified against the very clean IMG_2716
  for the overlapping range 105-126 (all consistent — used to double-confirm IMG_2716's
  numbering, resolving its one uncertain line: 121 is confirmed BLANK, not an extra
  property, before the "});" at 122). New content beyond IMG_2716: after the Step 4
  "if (mergedContext.action || mergedContext.policyId)" block opens at 126, it builds
  updatedContext by spreading currentContext and mergedContext, calls
  context.set(navigationContext, updatedContext), then logs a
  "[clientRootLoader] Context initialized from URL/storage" object with action/
  policyId fields (continues past visible viewport at line 136). Same file as
  IMG_2709-2716 (loader.ts). Explorer sidebar identical to prior photos. Tab bar:
  only "loader.ts" open. Breadcrumb: aqs-web-ui > src > features > root > utils >
  loader.ts > ... Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Bottom-left: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty),
  Problems 6 errors / 0 warnings, "No Solution". Clock 5:17 PM 7/10/2026.
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
   (sticky-scroll header)
105:
106:        // Step 3: Merge URL params (priority) with stored context (fallback)
107:        // If neither exists, currentContext will be empty and runtime will initialize from sessionInformation
108:        const currentContext = context.get(navigationContext);
109:        const mergedContext = mergeStoredContext(urlParams, storedContext);
110:
111:        console.log('[DEBUG] Current Context (React Router):', currentContext);
112:        console.log('[DEBUG] Merged Context (URL + Storage):', mergedContext);
113:        console.log('[DEBUG] ==========================================');
114:
115:        console.log('[clientRootLoader] Session initialization check', {
116:            hasUrlParams: Object.values(urlParams).some((v) => v !== undefined),
117:            hasStoredContext: !!storedContext,
118:            hasCurrentContext: !!currentContext,
119:            mergedAction: mergedContext.action,
120:            mergedPolicyId: mergedContext.policyId,
121:
122:        });
123:
124:        // Step 4: Update context with merged values if we have any
125:        // This ensures new windows and page reloads get initialized correctly
126:        if (mergedContext.action || mergedContext.policyId) {
127:            const updatedContext = {
128:                ...currentContext,
129:                ...mergedContext,
130:            };
131:
132:            context.set(navigationContext, updatedContext);
133:
134:            console.log('[clientRootLoader] Context initialized from URL/storage', {
135:                action: updatedContext.action,
136:                policyId: updatedContext.policyId,


========== IMG_2718.md ==========
---
photo: IMG_2718.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 23-155 (sticky header 23; body 123-155)
orientation: 180
confidence: high
notes: >
  Very clear, sharp photo, minimal/no ghosting — all gutter numbers directly verified
  via zoom crops, high confidence throughout. Sticky-scroll header: line 23
  "export async function clientRootLoader(...)". IMPORTANT: this photo's line numbers
  for the "Step 4" block are offset by -1 versus IMG_2716/IMG_2717 (e.g. the
  "if (mergedContext.action || mergedContext.policyId) {" line reads as 125 here vs
  126 in IMG_2716/2717, and everything through the end of that block shifts
  accordingly). Both readings were independently zoom-verified and are internally
  self-consistent, so this is most likely a real 1-line edit (e.g. a blank line
  added/removed) made to the file between those photos being taken — plausible given
  the branch is dirty ("hitanshu/experimental*") and the developer was actively
  iterating. Treat IMG_2718's numbering as authoritative for this photo; do not
  assume it reconciles exactly with IMG_2716/2717's numbers for the same statements.
  Content: closes out the Step 4 merged-context-update block (spreads currentContext
  then mergedContext into updatedContext, calls context.set, logs the result with
  action/policyId/nodeKey), then starts a new section: "Try to get sessionInformation
  from localStorage" — declares userInfo/menuInfo/permissionInfo, reads sessionInfo via
  getItem<SessionInfo>('sessionInformation') and navContext via context.get(...), and
  if sessionInfo has a userId, sets userInfo and begins a comment block explaining why
  GetUserData is intentionally NOT called in the root loader (pre-auth/login pages
  don't have authenticated session values yet; GetUserData runs in the first
  authenticated feature loader instead). Explorer sidebar identical to prior photos.
  Tab bar: only "loader.ts" open. Breadcrumb: aqs-web-ui > src > features > root >
  utils > loader.ts > ... Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Bottom-left: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty),
  Problems 6 errors / 0 warnings, "No Solution". Clock 5:17 PM 7/10/2026. Line 155 is
  cut off at the very bottom edge of the viewport (partially legible).
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
   (sticky-scroll header)
123:        // Step 4: Update context with merged values if we have any
124:        // This ensures new windows and page reloads get initialized correctly
125:        if (mergedContext.action || mergedContext.policyId) {
126:            const updatedContext = {
127:                ...currentContext,
128:                ...mergedContext,
129:            };
130:
131:            context.set(navigationContext, updatedContext);
132:
133:            console.log('[clientRootLoader] Context initialized from URL/storage', {
134:                action: updatedContext.action,
135:                policyId: updatedContext.policyId,
136:                nodeKey: updatedContext.nodeKey,
137:            });
138:        }
139:    }
140:
141:    // Try to get sessionInformation from localStorage
142:    let userInfo = undefined;
143:    let menuInfo = undefined;
144:    let permissionInfo: Record<string, unknown> | null = null;
145:
146:    const sessionInfo = getItem<SessionInfo>('sessionInformation');
147:    const navContext = context.get(navigationContext);
148:
149:    if (sessionInfo && sessionInfo.userId) {
150:        userInfo = sessionInfo;
151:
152:        // Intentionally do not call GetUserData here.
153:        // Root loader also serves pre-auth/login navigation, while GetUserData
154:        // depends on authenticated session values and should run in the first
155:        // authenticated feature loader (dashboard MAIN action)


========== IMG_2719.md ==========
---
photo: IMG_2719.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 23-166 (sticky header 23; body 136-166, confirmed clean via zoom crop)
orientation: 180
confidence: high
notes: >
  Clear, sharp photo, light ghosting only (faint duplicate offset a few rows, doesn't
  obscure primary text). Sticky-scroll header: line 23 "export async function
  clientRootLoader(...)". Line numbers 136-155 directly cross-verified against
  IMG_2718 and match exactly (both photos agree — IMG_2718's numbering is confirmed
  correct/current for this part of the file). New content beyond IMG_2718: closes the
  "Session found, reading menu from context" debug log (userId field), then a comment
  block explaining permission-data fetching ("Fetch user data (permissions) for all
  authenticated users" / "This makes permissionInfo available globally via
  useRouteLoaderData('root')" / "CRITICAL: Only fetch if not already initialized to
  prevent infinite loops"), followed by
  `if (!isPermissionsInitialized()) { console.log(...); const [result, error] =
  await safeAwait(fetchUserData(sessionInfo)); }`. The very last line (continuing
  past 166/167) is cut off by the status bar at the bottom of the viewport and not
  reliably legible — not transcribed. Explorer sidebar identical to prior photos.
  Tab bar: only "loader.ts" open. Breadcrumb: aqs-web-ui > src > features > root >
  utils > loader.ts > ... Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript. Bottom-left: workspace "aqs-web-ui", branch "hitanshu/experimental*"
  (dirty), Problems 6 errors / 0 warnings, "No Solution". Clock 5:17 PM 7/10/2026.
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
   (sticky-scroll header)
136:            policyId: updatedContext.policyId,
137:            nodeKey: updatedContext.nodeKey,
138:        });
139:    }
140:
141:    // Try to get sessionInformation from localStorage
142:    let userInfo = undefined;
143:    let menuInfo = undefined;
144:    let permissionInfo: Record<string, unknown> | null = null;
145:
146:    const sessionInfo = getItem<SessionInfo>('sessionInformation');
147:    const navContext = context.get(navigationContext);
148:
149:    if (sessionInfo && sessionInfo.userId) {
150:        userInfo = sessionInfo;
151:
152:        // Intentionally do not call GetUserData here.
153:        // Root loader also serves pre-auth/login navigation, while GetUserData
154:        // depends on authenticated session values and should run in the first
155:        // authenticated feature loader (dashboard MAIN action).
156:
156:        console.log('[clientRootLoader] Session found, reading menu from context', {
157:            userId: sessionInfo.userId,
158:        });
159:
160:        // Fetch user data (permissions) for all authenticated users
161:        // This makes permissionInfo available globally via useRouteLoaderData('root')
162:        // CRITICAL: Only fetch if not already initialized to prevent infinite loops
163:        if (!isPermissionsInitialized()) {
164:            console.log('[clientRootLoader] Permissions not initialized, fetching user data...');
165:
166:            const [result, error] = await safeAwait(fetchUserData(sessionInfo));


========== IMG_2720.md ==========
---
photo: IMG_2720.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 149-181
orientation: 180
confidence: medium
notes: Photo has heavy motion-blur/double-exposure ghosting (camera shake) over the whole frame; every line has a faint duplicate offset by a few rows, but content matches so transcription below uses the brighter/foreground layer. Sticky-scroll shows two pinned headers at top: line 23 "export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {" (clear), and a second, badly garbled pinned line beneath it reading approximately "if (sessionInfo && sessionInfo.userId) {" with a fragment "...context.get(navigationContext));" bleeding through — its real line number is not legible. Line 149 itself is likewise obscured by this sticky overlay/ghosting; best-effort guess given below, low confidence. Line 181 is cut off by the Windows taskbar overlapping the bottom of the editor; only ghost fragments visible. Explorer sidebar (aqs-web-ui > src > features > root > utils, and policy/utils, prp/components, prp/services, root/services, root/utils) shows files: ultimateCoverLoader.ts, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts, MlcSumList.tsx, prp.ts, loader.ts, middleware.ts, user-data.ts (under root/services), loaders.ts, middlewares.ts (under root/utils, both showing modified indicators). Tab bar shows only "loader.ts" tab open (single tab, unsaved dot). Breadcrumb: aqs-web-ui > src > features > root > utils > loader.ts > ... Status bar: branch "hitanshu/experimental*", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:17 PM 7/10/2026.
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
        ⟪sticky header, line # illegible⟫ if (sessionInfo && sessionInfo.userId) {  ⟪?⟫ (garbled, low confidence)
149:    if (sessionInfo && sessionInfo.userId) {  ⟪?⟫ (low confidence, obscured by ghosting/sticky overlay)
150:        userInfo = sessionInfo;
151:
152:        // Intentionally do not call GetUserData here.
153:        // Root loader also serves pre-auth/login navigation, while GetUserData
154:        // depends on authenticated session values and should run in the first
155:        // authenticated feature loader (dashboard MAIN action).
156:
157:        console.log('[clientRootLoader] Session found, reading menu from context', {
158:            userId: sessionInfo.userId,
159:        });
160:
161:        // Fetch user data (permissions) for all authenticated users
162:        // This makes permissionInfo available globally via useRouteLoaderData('root')
163:        // CRITICAL: Only fetch if not already initialized to prevent infinite loops
164:        if (!isPermissionsInitialized()) {
165:            console.log('[clientRootLoader] Permissions not initialized, fetching user data...');
166:            const [result, error] = await safeAwait(fetchUserData(sessionInfo));
167:
168:            if (result?.status && !error) {
169:                permissionInfo = result.data ?? null;
170:
171:                // Initialize global permission store for use throughout the app
172:                if (permissionInfo) {
173:                    initializePermissions(permissionInfo);
174:                }
175:
176:                console.log('[clientRootLoader] Permission data loaded', {
177:                    hasXdiSecurity: !!permissionInfo?.xdiSecurity,
178:                    hasXdiOptions: !!permissionInfo?.xdiOptions,
179:                });
180:            } else {
181:                ⟪?⟫ (obscured by Windows taskbar overlapping bottom of editor; content not legible)


========== IMG_2721.md ==========
---
photo: IMG_2721.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 166-197
orientation: 180
confidence: low
notes: Extremely heavy motion-blur/double-exposure ghosting across the ENTIRE frame (worse than IMG_2720) — nearly every row shows two or three overlapping/offset copies of adjacent lines, and even the gutter line-number digits are doubled/blurred in most rows, making exact line-number-to-content mapping unreliable in the middle of the range. Content itself was cross-checked across multiple zoomed crops and is believed accurate; line numbers for rows ~172-192 are best-effort reconstructions from logical code structure (brace/indent matching) rather than confidently read digits — treat as approximate. Anchors that WERE read clearly: sticky header "23" (function decl), and gutter "166","167","168" near top, and gutter "193"-"197" near bottom (Navigation context object) both read consistently in dedicated tight zoom crops. This appears to be the same loader.ts as IMG_2720 but at a later edit state (line numbers ~5 higher for equivalent code), suggesting lines were inserted between the two photos. Sticky scroll shows line 23 "export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {" and what appears to be a second pinned line showing the "console.log('[clientRootLoader] Permissions not initialized, fetching user data...');" statement (nested scope), though this may instead be actual line 170 bleeding into the sticky region — not fully distinguishable. Explorer sidebar same tree as IMG_2720 (aqs-web-ui/src/features/policy/utils, prp/components, prp/services, root/services, root/utils) with loader.ts highlighted/modified (U). Status bar: branch "hitanshu/experimental*", "No Solution", 6 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:17 PM 7/10/2026 (same minute as IMG_2720 — photos taken in quick succession).
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
        ⟪sticky/nested, uncertain⟫ console.log('[clientRootLoader] Permissions not initialized, fetching user data...');
166:    // Fetch user data (permissions) for all authenticated users
167:    // This makes permissionInfo available globally via useRouteLoaderData('root')
168:    // CRITICAL: Only fetch if not already initialized to prevent infinite loops
169:    if (!isPermissionsInitialized()) {  ⟪line# approximate⟫
170:        console.log('[clientRootLoader] Permissions not initialized, fetching user data...');
171:        const [result, error] = await safeAwait(fetchUserData(sessionInfo));
172:
173:        if (result?.status && !error) {  ⟪line# approximate⟫
174:            permissionInfo = result.data ?? null;
175:
176:            // Initialize global permission store for use throughout the app
177:            if (permissionInfo) {
178:                initializePermissions(permissionInfo);
179:            }
180:
181:            console.log('[clientRootLoader] Permission data loaded', {
182:                hasXdiSecurity: !!permissionInfo?.xdiSecurity,
183:                hasXdiOptions: !!permissionInfo?.xdiOptions,
184:            });
185:        } else {
186:            console.warn('[clientRootLoader] Failed to fetch permission data', { error });
187:        }
188:    } else {
189:        console.warn('[clientRootLoader] Permissions already initialized, skipping fetchUserData');
190:        // Permissions already loaded, no need to fetch again
191:        // Prevents infinite loops on repeated root loader calls
192:    }
        ⟪?⟫ (blank line(s) / possible extra comment, not clearly resolved amid ghosting)
        // Get menu data from navigationContext (set by dataStrategy after MENU API call)
        ⟪?⟫ console.log('[clientRootLoader] ==== MENU DATA CHECK ====' ...) (fragment, garbled by ghosting, low confidence)
193:    console.log('[clientRootLoader] Navigation context:', {
194:        exists: !!navContext,
195:        hasMenuData: !!navContext?.menuData,
196:        menuLoaded: navContext?.menuLoaded,
197:        action: navContext?.action,  (line cut off at bottom edge by scrollbar/status bar; rest of object body not visible)


========== IMG_2722.md ==========
---
photo: IMG_2722.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 179-210
orientation: 180
confidence: medium
notes: Same heavy motion-blur/double-exposure ghosting as IMG_2720/IMG_2721 throughout the frame; gutter line-number digits are doubled/blurred for much of the range making exact numbering for lines ~179-193 approximate (content is solid, cross-validated against the near-identical, less-blurred block in IMG_2720/IMG_2721 which show the same message strings at slightly different line numbers from an earlier edit state). Numbers for lines 194/195-210 (Navigation-context object and menu-data if/else) were read from a sharper crop and are higher confidence. This is a later scroll position of the same loader.ts / clientRootLoader function as IMG_2720 and IMG_2721 (sticky line 23 unchanged). Explorer sidebar same tree as prior two photos, loader.ts highlighted/modified (U) under root/utils. Status bar: branch "hitanshu/experimental*", "No Solution", 6 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:17 PM 7/10/2026 (same minute as IMG_2720/2721 — all three taken in quick succession while scrolling through the same file).
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
179:    console.log('[clientRootLoader] Permission data loaded', {  ⟪line# approximate⟫
180:        hasXdiSecurity: !!permissionInfo?.xdiSecurity,
181:        hasXdiOptions: !!permissionInfo?.xdiOptions,
182:    });
183:    } else {
184:        console.warn('[clientRootLoader] Failed to fetch permission data', { error });
185:    }
186:    } else {
187:        console.warn('[clientRootLoader] Permissions already initialized, skipping fetchUserData');
188:        // Permissions already loaded, no need to fetch again
189:        // This prevents infinite loops on repeated root loader calls
190:    }
        ⟪?⟫ (blank line, not clearly resolved amid ghosting)
        // Get menu data from navigationContext (set by dataStrategy after MENU API call)
191:    console.log('[clientRootLoader] ===== MENU DATA CHECK =====');
192:    console.log('[clientRootLoader] Navigation context:', {
193:        exists: !!navContext,
194:        hasMenuData: !!navContext?.menuData,
195:        menuLoaded: navContext?.menuLoaded,
196:        action: navContext?.action,
197:        keys: navContext ? Object.keys(navContext) : [],
198:    });
199:
200:    if (navContext?.menuData) {
201:        menuInfo = parseMenuInfo(navContext.menuData);
202:
203:        console.log('[clientRootLoader] Menu data found in context', {
204:            menuCount: Array.isArray(menuInfo.menus) ? menuInfo.menus.length : 0,
205:            queryString: menuInfo.queryString,
206:        });
207:    } else {  ⟪line# approximate⟫
208:        const persistedMenu = getMenuData(sessionInfo.userId, sessionInfo.compLoc);
209:    });  ⟪?⟫ (closing paren/brace visible at bottom edge of editor viewport; what it closes is not visible — content continues below the visible area)
210:


========== IMG_2723.md ==========
---
photo: IMG_2723.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 186-220
orientation: 180
confidence: medium
notes: Same recurring heavy motion-blur/double-exposure ghosting as IMG_2720-2722, worst in the upper part of this frame (lines ~186-203) where gutter digits are ambiguous/doubled and could not be reconciled precisely against the surrounding photos' numbering (off by up to ~5 in cross-checks) — treat line numbers for that upper stretch as approximate; content itself is legible and consistent with the equivalent block seen starting in IMG_2722. Lines 204-220 (menu-data-found / localStorage-fallback / no-data-warning branches) were read from a very sharp, minimally-ghosted crop and are high confidence, including an if(persistedMenu?.menuInfo) nested check not fully resolved in earlier photos. This is the same clientRootLoader in loader.ts, scrolled further down from IMG_2722 (sticky line 23 unchanged). Explorer sidebar same tree as prior photos, loader.ts highlighted/modified (U). Status bar: branch "hitanshu/experimental*", "No Solution", 6 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:17 PM 7/10/2026 (same minute as IMG_2720-2722).
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
186:    // Permissions already loaded, no need to fetch again  ⟪line# approximate⟫
187:    // This prevents infinite loops on repeated root loader calls
        // Get menu data from navigationContext (set by dataStrategy after MENU API call)
188:    }
189:    console.log('[clientRootLoader] ===== MENU DATA CHECK =====');
190:    console.log('[clientRootLoader] Navigation context:', {
191:        exists: !!navContext,
        hasMenuData: !!navContext?.menuData,
        menuLoaded: navContext?.menuLoaded,
        action: navContext?.action,
        keys: navContext ? Object.keys(navContext) : [],
        });
        (blank)
203:    if (navContext?.menuData) {  ⟪anchor for lines below, higher confidence⟫
204:        console.log('[clientRootLoader] Menu data found in context', {
205:            menuCount: Array.isArray(menuInfo.menus) ? menuInfo.menus.length : 0,
206:            queryString: menuInfo.queryString,
207:        });
208:    } else {
209:        const persistedMenu = getMenuData(sessionInfo.userId, sessionInfo.compLoc);
210:        if (persistedMenu?.menuInfo) {
211:            menuInfo = parseMenuInfo(persistedMenu.menuInfo);
212:
213:            console.log('[clientRootLoader] Loaded menu data from localStorage fallback', {
214:                menuCount: Array.isArray(menuInfo.menus) ? menuInfo.menus.length : 0,
215:                queryString: menuInfo.queryString,
216:                timestamp: persistedMenu.timestamp,
217:            });
218:        } else {
219:            console.warn(
220:                '[clientRootLoader] No menu data in navigation context or localStorage',
        ⟪?⟫ (line cut off at bottom edge of visible editor area; likely continues with closing `);` and further `}` braces below)


========== IMG_2724.md ==========
---
photo: IMG_2724.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 205-237
orientation: 180
confidence: high
notes: Much less motion-blur ghosting than IMG_2720-2723 — most of this frame is sharp and unambiguous, especially lines 219-237 which are essentially artifact-free. Confirms and refines the structure guessed in IMG_2723 (nested `if (persistedMenu?.menuInfo)` check, no blank line between `const persistedMenu = ...` and the nested if, none between `menuInfo = parseMenuInfo(...)` and the following console.log). Line numbers for 218-237 were corrected by +1 after cross-checking against the crystal-clear (near-zero-ghosting) IMG_2725, which shows this exact same tail block unambiguously at 219-237. This is the same clientRootLoader in loader.ts, scrolled further down from IMG_2723 (sticky line 23 unchanged) and slightly less far than IMG_2725. Explorer sidebar same tree as prior photos, loader.ts highlighted/modified (U) under root/utils. Status bar: branch "hitanshu/experimental*", "No Solution", 6 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:17 PM 7/10/2026 (same minute as IMG_2720-2723,2725 — all taken in one quick scroll-through).
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
205:        menuCount: Array.isArray(menuInfo.menus) ? menuInfo.menus.length : 0,
206:        queryString: menuInfo.queryString,
207:    });
208:    } else {
209:        const persistedMenu = getMenuData(sessionInfo.userId, sessionInfo.compLoc);
210:        if (persistedMenu?.menuInfo) {
211:            menuInfo = parseMenuInfo(persistedMenu.menuInfo);
212:            console.log('[clientRootLoader] Loaded menu data from localStorage fallback', {
213:                menuCount: Array.isArray(menuInfo.menus) ? menuInfo.menus.length : 0,
214:                queryString: menuInfo.queryString,
215:                timestamp: persistedMenu.timestamp,
216:            });
218:        } else {
219:            console.warn(
220:                '[clientRootLoader] No menu data in navigation context or localStorage',
221:            );
222:            menuInfo = emptyMenuInfo;
223:        }
224:    }
225:    }
226:
227:    // If userInfo is logged in and trying to hit login page, send to root (not dashboard)
228:    // Root useEffect will handle cascading to dashboard after MENU loads
229:    if (!isEmpty(userInfo) && url.pathname === '/login') {
230:        throw redirect('/');
231:    }
232:
233:    // If no userInfo and trying to hit root, redirect to login
234:    // But if already on login page, don't redirect - let the login page render
235:    if (isEmpty(userInfo) && url.pathname === '/') {
236:        throw redirect('/login');
237:    }


========== IMG_2725.md ==========
---
photo: IMG_2725.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/loader.ts
lines: 220-246
orientation: 180
confidence: high
notes: Near-zero motion-blur ghosting — the clearest of the loader.ts sequence (IMG_2720-2725) and used to cross-check/correct line numbers in IMG_2724. Shows the end of the clientRootLoader function body (closing braces for the menu-data if/else-if/else chain, the two post-auth redirect checks, and the final permissions/return block) — line 245 `}` closes clientRootLoader itself. Explorer sidebar same tree as prior photos, loader.ts highlighted/modified (U) under root/utils. Status bar: branch "hitanshu/experimental*", "No Solution", 6 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:17 PM 7/10/2026 (same minute as IMG_2720-2724).
---
23:     export async function clientRootLoader({ request, context }: LoaderFunctionArgs) {
221:            );
222:            menuInfo = emptyMenuInfo;
223:        }
224:    }
225:    }
226:
227:    // If userInfo is logged in and trying to hit login page, send to root (not dashboard)
228:    // Root useEffect will handle cascading to dashboard after MENU loads
229:    if (!isEmpty(userInfo) && url.pathname === '/login') {
230:        throw redirect('/');
231:    }
232:
233:    // If no userInfo and trying to hit root, redirect to login
234:    // But if already on login page, don't redirect - let the login page render
235:    if (isEmpty(userInfo) && url.pathname === '/') {
236:        throw redirect('/login');
237:    }
238:
239:    // Get navigation context to pass to components (for windowCommand handling)
240:    //const navContext = context.get(navigationContext);
241:    const permissions = context.get(permissionsContext);
242:
243:    // Presence (The "Identity") - we need this for root layout components - header, sidebar, footer
244:    return { userInfo, menuInfo, navigationContext: navContext, permissions: permissions ?? null };
245:    }
246:
