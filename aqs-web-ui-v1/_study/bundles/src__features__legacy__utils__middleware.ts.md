# BUNDLE for src/features/legacy/utils/middleware.ts
# 6 photo fragment(s), ascending start-line order.


========== IMG_2417.md ==========
---
photo: IMG_2417.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware.ts
lines: 1-34
orientation: 180
confidence: high
notes: Clean/sharp photo, new file (top of file). This is the original (non-optimized) middleware.ts, a sibling of middleware-optimized.ts seen in IMG_2411-2416; content differs (simpler, no ASP-redirect/OPTIMIZATION blocks). Tab bar shows "date.tsx 9+" and active tab "middleware.ts 6,U". Breadcrumb: aqs-web-ui > src > features > legacy > utils > middleware.ts > ... Status bar: branch "hitanshu/experimental*", "31 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar (aqs-web-ui/src/features) expanded: auth > middleware.ts; dashboard\utils > loader.ts, middleware.ts; form\utils > dynamic-form-loader.ts; legacy > components (collapsed), utils > loader-optimized.ts (U), loader.ts (U), middleware-optimize...ts (U), middleware.ts (6,U, selected/highlighted); then collapsed folders policy, prp, root, hooks, lib, pages, providers, services, types. Line 34 ("const hasNavigationParams =") is cut off at the very bottom edge, only partially legible.
---
1:     import { navigationContext, mergeNavigationContext } from '@/context';
2:     import { getItem } from '@utils/local-storage';
3:     import { aspToReactRoute } from '@utils/asp-route-mapper';
4:     import { createFeatureLogger } from '@utils/logger-builder';
5:     import { getXmlDetailFromSessionStorage } from '@utils/session-storage-helpers';
6:
7:     import type { MiddlewareFunction } from 'react-router';
8:     import type { SessionInfo } from '@features/auth/services/auth';
9:
10:    // Create logger for legacy middleware
11:    const logger = createFeatureLogger('legacy', 'middleware');
12:
13:    /**
14:     * Middleware for legacy catch-all route
15:     *
16:     * Ensures navigation context is set correctly for generic legacy pages.
17:     * Extracts ASP filename from URL params and sets appropriate action/nodeKey.
18:     */
19:    export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
20:        const url = new URL(request.url);
21:        const aspFileName = params['*']; // For legacy/* route, * contains the ASP filename
22:
23:        logger.info('Legacy middleware called', {
24:            pathname: url.pathname,
25:            aspFileName,
26:            searchParams: Object.fromEntries(url.searchParams),
27:        });
28:
29:        const sessionInfo = getItem<SessionInfo>('sessionInformation');
30:        const currentNavContext = context.get(navigationContext);
31:
32:        // If URL has action/nodeKey params, let hydrateNavigationContextMiddleware handle it
33:        // (assuming it's already run in the root)
34:        const hasNavigationParams =


========== IMG_2418.md ==========
---
photo: IMG_2418.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware.ts
lines: 11-44
orientation: 180
confidence: high
notes: Photo has mild motion/double-exposure ghosting (fainter duplicate text bleeding through, offset roughly 1 line) but gutter numbers and primary text remain legible/unambiguous throughout. Lines 11-34 duplicate content already confirmed clean in IMG_2417 (same file) and match exactly. New content vs IMG_2417 is lines 35-44, confirmed via a tight zoomed crop. Tab bar shows "date.tsx 9+" and active tab "middleware.ts 6,U". Breadcrumb: aqs-web-ui > src > features > legacy > utils > middleware.ts > ... Status bar: branch "hitanshu/experimental*", "31 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar same as IMG_2417 (middleware.ts selected/highlighted; loader-optimized.ts, loader.ts, middleware-optimize...ts all show "U"). Line 39 is blank.
---
11:    const logger = createFeatureLogger('legacy', 'middleware');
12:
13:    /**
14:     * Middleware for legacy catch-all route
15:     *
16:     * Ensures navigation context is set correctly for generic legacy pages.
17:     * Extracts ASP filename from URL params and sets appropriate action/nodeKey.
18:     */
19:    export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
20:        const url = new URL(request.url);
21:        const aspFileName = params['*']; // For legacy/* route, * contains the ASP filename
22:
23:        logger.info('Legacy middleware called', {
24:            pathname: url.pathname,
25:            aspFileName,
26:            searchParams: Object.fromEntries(url.searchParams),
27:        });
28:
29:        const sessionInfo = getItem<SessionInfo>('sessionInformation');
30:        const currentNavContext = context.get(navigationContext);
31:
32:        // If URL has action/nodeKey params, let hydrateNavigationContextMiddleware handle it
33:        // (assuming it's already run in the root)
34:        const hasNavigationParams =
35:            url.searchParams.has('action') ||
36:            url.searchParams.has('nodeKey') ||
37:            url.searchParams.has('frame') ||
38:            url.searchParams.has('policyId');
39:
40:        if (hasNavigationParams) {
41:            logger.info('Navigation params present in URL, using existing context', {
42:                action: url.searchParams.get('action'),
43:                nodeKey: url.searchParams.get('nodeKey'),
44:            });


========== IMG_2419.md ==========
---
photo: IMG_2419.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware.ts
lines: 19,26-57
orientation: 180
confidence: high
notes: Clean/sharp photo (no ghosting), continues from IMG_2418 in same file. Tab bar shows "date.tsx 9+" and active tab "middleware.ts 6,U". Breadcrumb: aqs-web-ui > src > features > legacy > utils > middleware.ts > ... Sticky-scroll header pins line 19 (function signature). Status bar: branch "hitanshu/experimental*", "31 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar same as IMG_2417/2418 (middleware.ts selected/highlighted; loader-optimized.ts, loader.ts, middleware-optimize...ts all show "U"). Lines 28, 31, 39, 48, 52 are blank. Line 57 ("});") is the last visible line, not cut off.
---
19:    export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
26:            searchParams: Object.fromEntries(url.searchParams),
27:        });
28:
29:        const sessionInfo = getItem<SessionInfo>('sessionInformation');
30:        const currentNavContext = context.get(navigationContext);
31:
32:        // If URL has action/nodeKey params, let hydrateNavigationContextMiddleware handle it
33:        // (assuming it's already run in the root)
34:        const hasNavigationParams =
35:            url.searchParams.has('action') ||
36:            url.searchParams.has('nodeKey') ||
37:            url.searchParams.has('frame') ||
38:            url.searchParams.has('policyId');
39:
40:        if (hasNavigationParams) {
41:            logger.info('Navigation params present in URL, using existing context', {
42:                action: url.searchParams.get('action'),
43:                nodeKey: url.searchParams.get('nodeKey'),
44:            });
45:            await next();
46:            return;
47:        }
48:
49:        // No navigation params - default to MAIN action with nodeKey from session
50:        const defaultAction = 'MAIN';
51:        const defaultNodeKey = sessionInfo?.nodeKey || 'POL|POL|0|'; // Legacy default
52:
53:        logger.info('No navigation params, setting defaults', {
54:            defaultAction,
55:            defaultNodeKey,
56:            aspFileName,
57:        });


========== IMG_2420.md ==========
---
photo: IMG_2420.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware.ts
lines: 19-68
orientation: 180
confidence: high
notes: >
  Sticky-scroll headers pinned at top: line 19 (function signature) and line 34
  (start of `const hasNavigationParams =` statement); lines 35-36 exist in the
  file but are hidden behind the sticky header divider, not visible in this
  photo. Real scrolled content starts at line 37. Explorer sidebar shows
  aqs-web-ui/src/features tree: auth/middleware.ts, dashboard/utils
  (loader.ts, middleware.ts), form/utils/dynamic-form-loader.ts,
  legacy/components, legacy/utils (loader-optimized.ts U, loader.ts U,
  middleware-optimize...ts U [name truncated], middleware.ts 6,U - selected),
  policy, prp, root, hooks, lib, pages, providers, services, types. Tab bar:
  "date.tsx 9+" and "middleware.ts 6,U" (active). Status bar: aqs-web-ui repo,
  branch hitanshu/experimental*, 31 errors, 0 warnings, "No Solution". Ln 1
  Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
19  export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
34      const hasNavigationParams =
37          url.searchParams.has('frame') ||
38          url.searchParams.has('policyId');
39
40      if (hasNavigationParams) {
41          logger.info('Navigation params present in URL, using existing context', {
42              action: url.searchParams.get('action'),
43              nodeKey: url.searchParams.get('nodeKey'),
44          });
45          await next();
46          return;
47      }
48
49      // No navigation params - default to MAIN action with nodeKey from session
50      const defaultAction = 'MAIN';
51      const defaultNodeKey = sessionInfo?.nodeKey || 'POL|POL|0'; // Legacy default
52
53      logger.info('No navigation params, setting defaults', {
54          defaultAction,
55          defaultNodeKey,
56          aspFileName,
57      });
58
59      const nextContext = mergeNavigationContext(currentNavContext, {
60          action: defaultAction,
61          nodeKey: defaultNodeKey,
62          xmlDetail: currentNavContext?.xmlDetail ?? getXmlDetailFromSessionStorage() ?? '',
63          userId: sessionInfo?.userId ?? null,
64          compLoc: sessionInfo?.compLoc ?? null,
65          policyId: currentNavContext?.policyId ?? sessionInfo?.policyId ?? '0',
66          cyclingCalled: false, // Force cycling call
67          fileName: aspFileName,
68          reactRoute: aspFileName ? aspToReactRoute(aspFileName) : undefined,


========== IMG_2421.md ==========
---
photo: IMG_2421.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware.ts
lines: 19-86
orientation: 180
confidence: high
notes: >
  Sticky-scroll header pinned at top: line 19 (function signature). Real
  scrolled content visible 55-86 (end of file, closing brace at 86). Same
  file/tab/explorer/status-bar state as IMG_2420 (scrolled further down).
  Lines 59-68 overlap with IMG_2420 and are consistent between the two
  photos.
---
19  export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
55          defaultNodeKey,
56          aspFileName,
57      });
58
59      const nextContext = mergeNavigationContext(currentNavContext, {
60          action: defaultAction,
61          nodeKey: defaultNodeKey,
62          xmlDetail: currentNavContext?.xmlDetail ?? getXmlDetailFromSessionStorage() ?? '',
63          userId: sessionInfo?.userId ?? null,
64          compLoc: sessionInfo?.compLoc ?? null,
65          policyId: currentNavContext?.policyId ?? sessionInfo?.policyId ?? '0',
66          cyclingCalled: false, // Force cycling call
67          fileName: aspFileName,
68          reactRoute: aspFileName ? aspToReactRoute(aspFileName) : undefined,
69          error: undefined,
70          navigationDepth: 0,
71          // Preserve menu data
72          menuData: currentNavContext?.menuData,
73          menuLoaded: currentNavContext?.menuLoaded,
74      });
75
76      context.set(navigationContext, nextContext);
77
78      logger.info('Legacy navigation context set', {
79          action: nextContext.action,
80          nodeKey: nextContext.nodeKey,
81          fileName: nextContext.fileName,
82          reactRoute: nextContext.reactRoute,
83      });
84
85      await next();
86  };


========== IMG_2422.md ==========
---
photo: IMG_2422.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware.ts
lines: 19-86
orientation: 180
confidence: high
notes: >
  Sticky-scroll headers pinned at top: line 19 (function signature) and line
  59 (`const nextContext = mergeNavigationContext(currentNavContext, {`).
  Real scrolled content visible 69-86 (end of file). Same file/tab/status-bar
  state as IMG_2420/2421; Explorer sidebar now shows mouse hovering over
  "policy" folder row (cursor icon visible), otherwise identical tree. This
  is the most-scrolled-down of the three middleware.ts photos, confirms end
  of legacyMiddleware function at line 86 `};`.
---
19  export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
59      const nextContext = mergeNavigationContext(currentNavContext, {
69          error: undefined,
70          navigationDepth: 0,
71          // Preserve menu data
72          menuData: currentNavContext?.menuData,
73          menuLoaded: currentNavContext?.menuLoaded,
74      });
75
76      context.set(navigationContext, nextContext);
77
78      logger.info('Legacy navigation context set', {
79          action: nextContext.action,
80          nodeKey: nextContext.nodeKey,
81          fileName: nextContext.fileName,
82          reactRoute: nextContext.reactRoute,
83      });
84
85      await next();
86  };
