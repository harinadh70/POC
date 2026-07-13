# BUNDLE for src/features/legacy/utils/loader-optimized.ts
# 11 photo fragment(s), ascending start-line order.


========== IMG_2394.md ==========
---
photo: IMG_2394.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader-optimized.ts
lines: 1-34
orientation: 180
confidence: high
notes: New file — loader-optimized.ts, top of file, no sticky-scroll header (file start visible). Line 34 cut off at bottom (only "navReactRoute: navContext?.reactRoute" partially visible). Explorer sidebar: aqs-web-ui/src/features tree expanded — auth (middleware.ts), dashboard/utils (loader.ts, middleware.ts), form/utils (dynamic-form-loader.ts), legacy > components, legacy > utils (highlighted; loader-optimized.ts selected "5,U" unsaved+untracked, loader.ts "U", middleware-optimize...ts "U", middleware.ts "U"), policy, prp, root, hooks, lib, pages, providers, services, types. Tab bar: "date.tsx" (9+ unsaved), "loader-optimized.ts" (5,U — 5 unsaved changes, untracked, active). Breadcrumb: aqs-web-ui > src > features > legacy > utils > loader-optimized.ts. Branch hitanshu/experimental*, No Solution, 30 errors/0 warnings (error count increased from 27 seen in earlier photos of this session).
---
1	import { redirect } from 'react-router';
2	import { navigationContext } from '@/context';
3	import { createFeatureLogger } from '@utils/logger-builder';
4	import { fetchPageBuild } from '@features/dashboard/services/page-build';
5	import { normalizeServiceConfig } from '@utils/normalize-service-config';
6	import { getItem } from '@utils/local-storage';
7	
8	// OPTIMIZATION: Simple in-memory cache for PageBuild responses
9	const pageBuildCache = new Map<string, { data: any; timestamp: number }>();
10	const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
11	
12	import type { LoaderFunctionArgs } from 'react-router';
13	import type { SessionInfo } from '@features/auth/services/auth';
14	
15	// Create logger for legacy loader
16	const logger = createFeatureLogger('legacy', 'loader');
17	
18	/**
19	 * Optimized loader for legacy catch-all route
20	 *
21	 * Performance optimizations:
22	 * - PageBuild response caching
23	 * - Early returns for cached data
24	 * - Better error handling
25	 * - Conditional fetching based on context changes
26	 */
27	export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
28		const navContext = context.get(navigationContext);
29		const url = new URL(request.url);
30		const currentPathname = url.pathname;
31	
32		logger.debug('Legacy loader called', {
33			currentPathname,
34		navReactRoute: navContext?.reactRoute


========== IMG_2395.md ==========
---
photo: IMG_2395.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader-optimized.ts
lines: 14-47 (overlaps IMG_2394; no sticky-scroll header shown)
orientation: 180
confidence: high
notes: Continuation/re-scroll of IMG_2394, scrolled down slightly. No sticky scroll header visible (still near top of file). Lines 14-34 repeat content already captured in IMG_2394; new content is lines 35-47, all fully visible (line 47 is closing brace, no cutoff). Explorer sidebar: same as IMG_2394 — legacy/utils highlighted, loader-optimized.ts selected (5,U), loader.ts (U), middleware-optimize...ts (U), middleware.ts (U). Tab bar: "date.tsx" (9+ unsaved), "loader-optimized.ts" (5,U, active). Branch hitanshu/experimental*, No Solution, 30 errors/0 warnings.
---
14	
15	// Create logger for legacy loader
16	const logger = createFeatureLogger('legacy', 'loader');
17	
18	/**
19	 * Optimized loader for legacy catch-all route
20	 *
21	 * Performance optimizations:
22	 * - PageBuild response caching
23	 * - Early returns for cached data
24	 * - Better error handling
25	 * - Conditional fetching based on context changes
26	 */
27	export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
28		const navContext = context.get(navigationContext);
29		const url = new URL(request.url);
30		const currentPathname = url.pathname;
31	
32		logger.debug('Legacy loader called', {
33			currentPathname,
34			navReactRoute: navContext?.reactRoute,
35			action: navContext?.action,
36			nodeKey: navContext?.nodeKey,
37		});
38	
39		// OPTIMIZATION 1: Redirect logic (unchanged but with better logging)
40		if (navContext?.reactRoute && navContext.reactRoute !== currentPathname) {
41			logger.info('Redirecting to computed reactRoute', {
42				from: currentPathname,
43				to: navContext.reactRoute,
44			});
45			throw redirect(navContext.reactRoute);
46		}
47	


========== IMG_2396.md ==========
---
photo: IMG_2396.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader-optimized.ts
lines: 22-55 (motion-blur double-exposure; lines 22-47 duplicate/ghosted, already covered by IMG_2394/IMG_2395; new clear content 48-55)
orientation: 180
confidence: medium
notes: Motion-blur / double-exposure photo — the editor appears to have scrolled during the camera shutter, producing two overlapping offset copies of the same scroll position (visible as doubled/ghosted line-number gutter and doubled text for lines ~22-47). That upper ghosted region duplicates content already transcribed cleanly in IMG_2394 and IMG_2395, so it is not re-transcribed here. The lower portion (lines 48-55) is comparatively sharp/legible and is new content, transcribed below. Line 49 is cut off at the right edge (screen/photo frame boundary, not a wrapped line) reading "...${navContext.nodeKey}` : nu" — completion inferred as "null;" by symmetry with line 50's ternary pattern but not directly visible, marked ⟪?⟫. Line 55 cut off at bottom ("return {" only). Explorer sidebar same as IMG_2394/2395: legacy/utils highlighted, loader-optimized.ts selected (5,U). Tab bar: "date.tsx" (9+ unsaved), "loader-optimized.ts" (5,U, active). Branch hitanshu/experimental*, No Solution, 30 errors/0 warnings.
---
(Lines 22-47 omitted — ghosted duplicate of content already transcribed in IMG_2394/IMG_2395)

48	// OPTIMIZATION 2: Cache key based on context fingerprint
49	const cacheKey = navContext ? `${navContext.xmlFileName}-${navContext.action}-${navContext.nodeKey}` : nu⟪?⟫ [likely "null;", cut off at screen/frame edge]
50	const cached = cacheKey ? pageBuildCache.get(cacheKey) : null;
51	const isCacheValid = cached && (Date.now() - cached.timestamp) < CACHE_TTL_MS;
52	
53	if (isCacheValid) {
54		logger.debug('Using cached PageBuild data', { cacheKey });
55		return {


========== IMG_2397.md ==========
---
photo: IMG_2397.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader-optimized.ts
lines: 27, 36-68
orientation: 180
confidence: high
notes: Tab reads "loader-optimized.ts 5, U" (git-untracked). Line 27 is a sticky-scroll header line; body starts at 36. Explorer shows sibling untracked files loader.ts (U), middleware-optimize....ts (U), middleware.ts (U) under features/legacy/utils, plus dashboard\utils and form\utils loaders. Branch hitanshu/experimental*. Status bar "30 problems / No Solution". Line 49 end runs off-screen under minimap (starts ": nu…", almost certainly ": null"). Line 68 partially covered by horizontal scrollbar.
---
```
27  export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
36          nodeKey: navContext?.nodeKey,
37      });
38
39      // OPTIMIZATION 1: Redirect logic (unchanged but with better logging)
40      if (navContext?.reactRoute && navContext.reactRoute !== currentPathname) {
41          logger.info('Redirecting to computed reactRoute', {
42              from: currentPathname,
43              to: navContext.reactRoute,
44          });
45          throw redirect(navContext.reactRoute);
46      }
47
48      // OPTIMIZATION 2: Cache key based on context fingerprint
49      const cacheKey = navContext ? `${navContext.xmlFileName}-${navContext.action}-${navContext.nodeKey}` : nu⟪?⟫
50      const cached = cacheKey ? pageBuildCache.get(cacheKey) : null;
51      const isCacheValid = cached && (Date.now() - cached.timestamp) < CACHE_TTL_MS;
52
53      if (isCacheValid) {
54          logger.debug('Using cached PageBuild data', { cacheKey });
55          return {
56              browserCommands: navContext?.browserCommands || [],
57              fileName: navContext?.fileName,
58              reactRoute: navContext?.reactRoute,
59              xmlFileName: navContext?.xmlFileName,
60              xmlDetail: navContext?.xmlDetail,
61              frame: navContext?.frame,
62              normalizedFields: normalizeServiceConfig(cached.data),
63              pageBuildData: cached.data,
64              fromCache: true,
65          };
66      }
67
68      // OPTIMIZATION 3: Conditional PageBuild ⟪?⟫
```


========== IMG_2398.md ==========
---
photo: IMG_2398.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader-optimized.ts
lines: 27, 50-81
orientation: 180
confidence: medium
notes: Photo caught mid-scroll — double-exposure ghosting of a second (offset) frame overlays the whole editor. Transcription follows the bright/crisp frame, which aligns with the line numbers and matches the overlap with IMG_2397 (lines 50-66). Line 27 is the sticky-scroll function header. "normalizedFields" on line 69 has a squiggle underline. Same tab/branch/status as IMG_2397 (loader-optimized.ts 5, U; hitanshu/experimental*; No Solution).
---
```
27  export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
50  const cached = cacheKey ? pageBuildCache.get(cacheKey) : null;
51  const isCacheValid = cached && (Date.now() - cached.timestamp) < CACHE_TTL_MS;
52
53  if (isCacheValid) {
54      logger.debug('Using cached PageBuild data', { cacheKey });
55      return {
56          browserCommands: navContext?.browserCommands || [],
57          fileName: navContext?.fileName,
58          reactRoute: navContext?.reactRoute,
59          xmlFileName: navContext?.xmlFileName,
60          xmlDetail: navContext?.xmlDetail,
61          frame: navContext?.frame,
62          normalizedFields: normalizeServiceConfig(cached.data),
63          pageBuildData: cached.data,
64          fromCache: true,
65      };
66  }
67
68  // OPTIMIZATION 3: Conditional PageBuild fetching
69  let normalizedFields = [];
70  let pageBuildData = null;
71
72  if (navContext?.xmlFileName && navContext?.xmlDetail) {
73      try {
74          const sessionInfo = getItem<SessionInfo>('sessionInformation');
75          if (!sessionInfo) {
76              logger.error('Session information not found for PageBuild');
77              return createErrorResponse(navContext, 'Session information not found');
78          }
79
80          logger.debug('Fetching PageBuild data', {
81              xmlFileName: navContext.xmlFileName,
```


========== IMG_2399.md ==========
---
photo: IMG_2399.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader-optimized.ts
lines: 27, 55-86
orientation: 180
confidence: high
notes: Clean shot (no ghosting); confirms the blurrier IMG_2398 content. Line 27 is sticky-scroll header. Squiggle under "normalizedFields" on line 69. Line 55 top is partially covered by the sticky header. Line 86 partially covered by horizontal scrollbar. Tab loader-optimized.ts 5, U; branch hitanshu/experimental*.
---
```
27  export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
55      return {
56          browserCommands: navContext?.browserCommands || [],
57          fileName: navContext?.fileName,
58          reactRoute: navContext?.reactRoute,
59          xmlFileName: navContext?.xmlFileName,
60          xmlDetail: navContext?.xmlDetail,
61          frame: navContext?.frame,
62          normalizedFields: normalizeServiceConfig(cached.data),
63          pageBuildData: cached.data,
64          fromCache: true,
65      };
66  }
67
68  // OPTIMIZATION 3: Conditional PageBuild fetching
69  let normalizedFields = [];
70  let pageBuildData = null;
71
72  if (navContext?.xmlFileName && navContext?.xmlDetail) {
73      try {
74          const sessionInfo = getItem<SessionInfo>('sessionInformation');
75          if (!sessionInfo) {
76              logger.error('Session information not found for PageBuild');
77              return createErrorResponse(navContext, 'Session information not found');
78          }
79
80          logger.debug('Fetching PageBuild data', {
81              xmlFileName: navContext.xmlFileName,
82              action: navContext.action,
83              nodeKey: navContext.nodeKey,
84          });
85
86          pageBuildData = await fetchPageBuild({⟪?⟫
```


========== IMG_2400.md ==========
---
photo: IMG_2400.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader-optimized.ts
lines: 27, 68-99
orientation: 180
confidence: high
notes: Clean shot. Line 27 is sticky-scroll header. Squiggle under "normalizedFields" on line 69. Line 99 mostly hidden by horizontal scrollbar (only "}" visible). Overlaps IMG_2399 at 68-86 — consistent. Tab loader-optimized.ts 5, U; branch hitanshu/experimental*; "No Solution" in status bar.
---
```
27  export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
68  // OPTIMIZATION 3: Conditional PageBuild fetching
69  let normalizedFields = [];
70  let pageBuildData = null;
71
72  if (navContext?.xmlFileName && navContext?.xmlDetail) {
73      try {
74          const sessionInfo = getItem<SessionInfo>('sessionInformation');
75          if (!sessionInfo) {
76              logger.error('Session information not found for PageBuild');
77              return createErrorResponse(navContext, 'Session information not found');
78          }
79
80          logger.debug('Fetching PageBuild data', {
81              xmlFileName: navContext.xmlFileName,
82              action: navContext.action,
83              nodeKey: navContext.nodeKey,
84          });
85
86          pageBuildData = await fetchPageBuild({
87              sessionInfo,
88              action: navContext.action || 'MAIN',
89              nodeKey: navContext.nodeKey || '',
90              xmlFileName: navContext.xmlFileName,
91          });
92
93          normalizedFields = normalizeServiceConfig(pageBuildData);
94
95          // Cache successful responses
96          if (pageBuildData && cacheKey) {
97              pageBuildCache.set(cacheKey, { data: pageBuildData, timestamp: Date.now() });
98              logger.debug('Cached PageBuild response', { cacheKey });
99          }
```


========== IMG_2401.md ==========
---
photo: IMG_2401.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader-optimized.ts
lines: 27, 81-113
orientation: 180
confidence: high
notes: Clean shot. Line 27 is sticky-scroll header. Overlaps IMG_2400 at 81-99 — consistent. Line 113 hidden under horizontal scrollbar except faint "return {" ghost at very bottom (marked uncertain). Tab loader-optimized.ts 5, U; branch hitanshu/experimental*.
---
```
27  export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
81              xmlFileName: navContext.xmlFileName,
82              action: navContext.action,
83              nodeKey: navContext.nodeKey,
84          });
85
86          pageBuildData = await fetchPageBuild({
87              sessionInfo,
88              action: navContext.action || 'MAIN',
89              nodeKey: navContext.nodeKey || '',
90              xmlFileName: navContext.xmlFileName,
91          });
92
93          normalizedFields = normalizeServiceConfig(pageBuildData);
94
95          // Cache successful responses
96          if (pageBuildData && cacheKey) {
97              pageBuildCache.set(cacheKey, { data: pageBuildData, timestamp: Date.now() });
98              logger.debug('Cached PageBuild response', { cacheKey });
99          }
100
101         logger.info('PageBuild fetched and normalized', {
102             fieldCount: normalizedFields.length,
103             xmlFileName: navContext.xmlFileName,
104         });
105     } catch (error) {
106         logger.error('Failed to fetch PageBuild', error as Error, {
107             xmlFileName: navContext.xmlFileName,
108         });
109         // Continue with empty fields for graceful degradation
110     }
111 }
112
113 ⟪return {?⟫
```


========== IMG_2402.md ==========
---
photo: IMG_2402.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader-optimized.ts
lines: 27, 89-121
orientation: 180
confidence: high
notes: Clean shot. Line 27 is sticky-scroll header. Overlaps IMG_2401 at 89-111 — consistent. Squiggle under "normalizedFields" on line 120. Line 121 hidden under horizontal scrollbar; faint fragment looks like "pageBuildData," (marked uncertain). Tab loader-optimized.ts 5, U; branch hitanshu/experimental*.
---
```
27  export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
89              nodeKey: navContext.nodeKey || '',
90              xmlFileName: navContext.xmlFileName,
91          });
92
93          normalizedFields = normalizeServiceConfig(pageBuildData);
94
95          // Cache successful responses
96          if (pageBuildData && cacheKey) {
97              pageBuildCache.set(cacheKey, { data: pageBuildData, timestamp: Date.now() });
98              logger.debug('Cached PageBuild response', { cacheKey });
99          }
100
101         logger.info('PageBuild fetched and normalized', {
102             fieldCount: normalizedFields.length,
103             xmlFileName: navContext.xmlFileName,
104         });
105     } catch (error) {
106         logger.error('Failed to fetch PageBuild', error as Error, {
107             xmlFileName: navContext.xmlFileName,
108         });
109         // Continue with empty fields for graceful degradation
110     }
111 }
112
113 return {
114     browserCommands: navContext?.browserCommands || [],
115     fileName: navContext?.fileName,
116     reactRoute: navContext?.reactRoute,
117     xmlFileName: navContext?.xmlFileName,
118     xmlDetail: navContext?.xmlDetail,
119     frame: navContext?.frame,
120     normalizedFields,
121     ⟪pageBuildData,?⟫
```


========== IMG_2403.md ==========
---
photo: IMG_2403.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader-optimized.ts
lines: 27, 102-134
orientation: 180
confidence: high
notes: Clean shot. Line 27 is sticky-scroll header. Overlaps IMG_2402 at 102-121 — consistent (confirms 121 = "pageBuildData,"). Squiggle under "normalizedFields" on line 120. Line 134 mostly under horizontal scrollbar; faint text reads "normalizedFields: []" (marked uncertain). Tab loader-optimized.ts 5, U; branch hitanshu/experimental*.
---
```
27  export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
102             fieldCount: normalizedFields.length,
103             xmlFileName: navContext.xmlFileName,
104         });
105     } catch (error) {
106         logger.error('Failed to fetch PageBuild', error as Error, {
107             xmlFileName: navContext.xmlFileName,
108         });
109         // Continue with empty fields for graceful degradation
110     }
111 }
112
113 return {
114     browserCommands: navContext?.browserCommands || [],
115     fileName: navContext?.fileName,
116     reactRoute: navContext?.reactRoute,
117     xmlFileName: navContext?.xmlFileName,
118     xmlDetail: navContext?.xmlDetail,
119     frame: navContext?.frame,
120     normalizedFields,
121     pageBuildData,
122     fromCache: false,
123 };
124 }
125
126 function createErrorResponse(navContext: any, error: string) {
127     return {
128         browserCommands: navContext?.browserCommands || [],
129         fileName: navContext?.fileName,
130         reactRoute: navContext?.reactRoute,
131         xmlFileName: navContext?.xmlFileName,
132         xmlDetail: navContext?.xmlDetail,
133         frame: navContext?.frame,
134         ⟪normalizedFields: [],?⟫
```


========== IMG_2404.md ==========
---
photo: IMG_2404.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader-optimized.ts
lines: 27, 115-137
orientation: 180
confidence: high
notes: End of file (137 = last line, editor empty below). Line 27 is sticky-scroll header. Overlaps IMG_2403 at 115-134 — consistent (confirms 134 = "normalizedFields: [],"). Squiggle under "normalizedFields" on line 120. Tab loader-optimized.ts 5, U; branch hitanshu/experimental*; "No Solution" and 30 problems in status bar.
---
```
27  export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
115     fileName: navContext?.fileName,
116     reactRoute: navContext?.reactRoute,
117     xmlFileName: navContext?.xmlFileName,
118     xmlDetail: navContext?.xmlDetail,
119     frame: navContext?.frame,
120     normalizedFields,
121     pageBuildData,
122     fromCache: false,
123 };
124 }
125
126 function createErrorResponse(navContext: any, error: string) {
127     return {
128         browserCommands: navContext?.browserCommands || [],
129         fileName: navContext?.fileName,
130         reactRoute: navContext?.reactRoute,
131         xmlFileName: navContext?.xmlFileName,
132         xmlDetail: navContext?.xmlDetail,
133         frame: navContext?.frame,
134         normalizedFields: [],
135         error,
136     };
137 }
```
