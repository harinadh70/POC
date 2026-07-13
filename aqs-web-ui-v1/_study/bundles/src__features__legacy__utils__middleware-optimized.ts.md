# BUNDLE for src/features/legacy/utils/middleware-optimized.ts
# 6 photo fragment(s), ascending start-line order.


========== IMG_2411.md ==========
---
photo: IMG_2411.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware-optimized.ts
lines: 1-33
orientation: 180
confidence: high
notes: Clean/sharp photo, new file (top of file, no sticky-scroll header needed). Tab bar shows "date.tsx 9+" and active tab "middleware-optimized.ts 6,U". Breadcrumb: aqs-web-ui > src > features > legacy > utils > middleware-optimized.ts > ... Status bar: branch "hitanshu/experimental*", "31 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar (aqs-web-ui/src/features) expanded: auth > middleware.ts; dashboard\utils > loader.ts, middleware.ts; form\utils > dynamic-form-loader.ts; legacy > components (collapsed), utils > loader-optimized.ts (U), loader.ts (U), middleware-optimi...ts (6,U, selected/highlighted, cursor/hand icon on it), middleware.ts (U); then collapsed folders policy, prp, root, hooks, lib, pages, providers, services, types.
---
1:     import { navigationContext, mergeNavigationContext } from '@/context';
2:     import { getItem } from '@utils/local-storage';
3:     import { aspToReactRoute, extractAspFileName, isAspUrl } from '@utils/asp-route-mapper';
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
14:     * Optimized middleware for legacy catch-all route
15:     *
16:     * Handles multiple navigation scenarios with performance optimizations:
17:     * 1. Direct ASP URL redirects (server-side 302)
18:     * 2. Query param preservation
19:     * 3. Enhanced logging for debugging
20:     * 4. Early returns for performance
21:     */
22:    export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
23:        const url = new URL(request.url);
24:        const splatParam = params['*'];
25:
26:        logger.debug('Legacy middleware processing', {
27:            pathname: url.pathname,
28:            splatParam,
29:            hasSearchParams: url.searchParams.toString().length > 0,
30:        });
31:
32:        const sessionInfo = getItem<SessionInfo>('sessionInformation');
33:        const currentNavContext = context.get(navigationContext);


========== IMG_2412.md ==========
---
photo: IMG_2412.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware-optimized.ts
lines: 17-47
orientation: 180
confidence: medium
notes: Photo has a strong motion/double-exposure ghost (screen content duplicated, offset by ~3 lines, throughout). Transcription below was reconstructed by isolating each gutter line's sharp/bold text from the fainter offset ghost (verified via tight per-line crops); lines 17-33 duplicate content already confirmed clean in IMG_2411 (same file) and match exactly. New content vs IMG_2411 is lines 34-47. Tab bar shows "date.tsx 9+" and active tab "middleware-optimized.ts 6,U". Breadcrumb: aqs-web-ui > src > features > legacy > utils > middleware-optimized.ts > ... Status bar: branch "hitanshu/experimental*", "31 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar identical to IMG_2411 (middleware-optimized.ts selected/highlighted under legacy/utils, loader-optimized.ts and loader.ts shown without "U" now, middleware.ts still shows "U"). Lines 31, 34, 39, 45 are blank.
---
17:     * 1. Direct ASP URL redirects (server-side 302)
18:     * 2. Query param preservation
19:     * 3. Enhanced logging for debugging
20:     * 4. Early returns for performance
21:     */
22:    export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
23:        const url = new URL(request.url);
24:        const splatParam = params['*'];
25:
26:        logger.debug('Legacy middleware processing', {
27:            pathname: url.pathname,
28:            splatParam,
29:            hasSearchParams: url.searchParams.toString().length > 0,
30:        });
31:
32:        const sessionInfo = getItem<SessionInfo>('sessionInformation');
33:        const currentNavContext = context.get(navigationContext);
34:
35:        // OPTIMIZATION 1: Direct ASP URL handling with server redirect
36:        if (isAspUrl(url.pathname) || url.searchParams.has('XMLDETAIL')) {
37:            const aspFileName = extractAspFileName(url.pathname + url.search);
38:            const canonicalRoute = aspToReactRoute(aspFileName);
39:
40:            logger.info('Redirecting ASP URL to canonical route', {
41:                from: url.pathname + url.search,
42:                to: canonicalRoute,
43:                aspFileName,
44:            });
45:
46:            // Preserve all query params in redirect
47:            const redirectUrl = new URL(canonicalRoute, url.origin);


========== IMG_2413.md ==========
---
photo: IMG_2413.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware-optimized.ts
lines: 22-60
orientation: 180
confidence: high
notes: Photo has heavy motion/rolling-shutter double-exposure ghosting, worse than IMG_2412. Lines 22-43 are clean/unambiguous and match IMG_2411/IMG_2412 exactly. Lines 44-60 were affected by a ~3-line-offset double image (two overlapping, similarly-crisp gutter number sequences, e.g. paired numbers like "49/52", "50/53" etc); reconstructed via partial visual confirmation plus logical code-flow inference, and subsequently CONFIRMED verbatim (including exact line numbers and blank-line placement) by the clean/unghosted IMG_2414, which shows the same lines 44-60 with no ambiguity. Tab bar shows "date.tsx 9+" and active tab "middleware-optimized.ts 6,U". Breadcrumb: aqs-web-ui > src > features > legacy > utils > middleware-optimized.ts > ... Status bar: branch "hitanshu/experimental*", "31 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Sticky-scroll header pins line 22 (function signature). Explorer sidebar same as IMG_2412 (middleware-optimized.ts selected, loader-optimized.ts/loader.ts no longer show "U", middleware.ts still shows "U").
---
22:    export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
28:            splatParam,
29:            hasSearchParams: url.searchParams.toString().length > 0,
30:        });
31:
32:        const sessionInfo = getItem<SessionInfo>('sessionInformation');
33:        const currentNavContext = context.get(navigationContext);
34:
35:        // OPTIMIZATION 1: Direct ASP URL handling with server redirect
36:        if (isAspUrl(url.pathname) || url.searchParams.has('XMLDETAIL')) {
37:            const aspFileName = extractAspFileName(url.pathname + url.search);
38:            const canonicalRoute = aspToReactRoute(aspFileName);
39:
40:            logger.info('Redirecting ASP URL to canonical route', {
41:                from: url.pathname + url.search,
42:                to: canonicalRoute,
43:                aspFileName,
44:            });
45:
46:            // Preserve all query params in redirect
47:            const redirectUrl = new URL(canonicalRoute, url.origin);
48:            url.searchParams.forEach((value, key) => {
49:                redirectUrl.searchParams.set(key, value);
50:            });
51:
52:            throw new Response(null, {
53:                status: 302,
54:                headers: { Location: redirectUrl.pathname + redirectUrl.search },
55:            });
56:        }
57:
58:        // OPTIMIZATION 2: Early return for explicit navigation params
59:        const hasNavigationParams =
60:            url.searchParams.has('action') ||


========== IMG_2414.md ==========
---
photo: IMG_2414.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware-optimized.ts
lines: 22,44-76
orientation: 180
confidence: high
notes: Clean/sharp photo (no ghosting), continues from IMG_2413 in same file and confirms that photo's reconstructed lines 44-60 exactly. Tab bar shows "date.tsx 9+" and active tab "middleware-optimized.ts 6,U". Breadcrumb: aqs-web-ui > src > features > legacy > utils > middleware-optimized.ts > ... Sticky-scroll header pins line 22 (function signature). Status bar: branch "hitanshu/experimental*", "31 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar same as IMG_2412/2413 (middleware-optimized.ts selected/highlighted under legacy/utils; loader-optimized.ts, loader.ts, middleware.ts all show "U"). Lines 45, 51, 57, 64, 70 are blank. Line 76 ("return;") is cut off at the very bottom edge of the visible viewport but legible.
---
22:    export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
44:        });
45:
46:        // Preserve all query params in redirect
47:        const redirectUrl = new URL(canonicalRoute, url.origin);
48:        url.searchParams.forEach((value, key) => {
49:            redirectUrl.searchParams.set(key, value);
50:        });
51:
52:        throw new Response(null, {
53:            status: 302,
54:            headers: { Location: redirectUrl.pathname + redirectUrl.search },
55:        });
56:    }
57:
58:    // OPTIMIZATION 2: Early return for explicit navigation params
59:    const hasNavigationParams =
60:        url.searchParams.has('action') ||
61:        url.searchParams.has('nodeKey') ||
62:        url.searchParams.has('frame') ||
63:        url.searchParams.has('policyId');
64:
65:    if (hasNavigationParams) {
66:        logger.debug('Navigation params detected, deferring to hydrate middleware');
67:        await next();
68:        return;
69:    }
70:
71:    // OPTIMIZATION 3: Default context setup with validation
72:    const aspFileName = splatParam;
73:    if (!aspFileName) {
74:        logger.warn('No ASP filename in route params');
75:        await next();
76:        return;


========== IMG_2415.md ==========
---
photo: IMG_2415.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware-optimized.ts
lines: 22,57-89
orientation: 180
confidence: high
notes: Clean/sharp photo (no ghosting), continues from IMG_2414 in same file. Tab bar shows "date.tsx 9+" and active tab "middleware-optimized.ts 6,U". Breadcrumb: aqs-web-ui > src > features > legacy > utils > middleware-optimized.ts > ... Sticky-scroll header pins line 22 (function signature). Status bar: branch "hitanshu/experimental*", "31 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar same as prior photos (middleware-optimized.ts selected; loader-optimized.ts, loader.ts, middleware.ts all show "U"). Lines 64, 70, 78, 81 are blank. Line 89 ("cyclingCalled: false,") is cut off at the very bottom edge but legible.
---
22:    export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
57:
58:    // OPTIMIZATION 2: Early return for explicit navigation params
59:    const hasNavigationParams =
60:        url.searchParams.has('action') ||
61:        url.searchParams.has('nodeKey') ||
62:        url.searchParams.has('frame') ||
63:        url.searchParams.has('policyId');
64:
65:    if (hasNavigationParams) {
66:        logger.debug('Navigation params detected, deferring to hydrate middleware');
67:        await next();
68:        return;
69:    }
70:
71:    // OPTIMIZATION 3: Default context setup with validation
72:    const aspFileName = splatParam;
73:    if (!aspFileName) {
74:        logger.warn('No ASP filename in route params');
75:        await next();
76:        return;
77:    }
78:
79:    const defaultAction = 'MAIN';
80:    const defaultNodeKey = sessionInfo?.nodeKey || 'POL|POL|0|';
81:
82:    const nextContext = mergeNavigationContext(currentNavContext, {
83:        action: defaultAction,
84:        nodeKey: defaultNodeKey,
85:        xmlDetail: currentNavContext?.xmlDetail ?? getXmlDetailFromSessionStorage() ?? '',
86:        userId: sessionInfo?.userId ?? null,
87:        compLoc: sessionInfo?.compLoc ?? null,
88:        policyId: currentNavContext?.policyId ?? sessionInfo?.policyId ?? '0',
89:        cyclingCalled: false,


========== IMG_2416.md ==========
---
photo: IMG_2416.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/middleware-optimized.ts
lines: 22,71-100
orientation: 180
confidence: high
notes: Clean/sharp photo (no ghosting), continues from IMG_2415 and reaches the end of the legacyMiddleware function (closing brace at line 100 = end of file for this const, matches "6,U" problem count in tab). Tab bar shows "date.tsx 9+" and active tab "middleware-optimized.ts 6,U". Breadcrumb: aqs-web-ui > src > features > legacy > utils > middleware-optimized.ts > ... Sticky-scroll header pins line 22 (function signature). Status bar: branch "hitanshu/experimental*", "31 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar same as prior photos (middleware-optimized.ts selected; loader-optimized.ts, loader.ts, middleware.ts all show "U"). Lines 78, 81, 97 are blank.
---
22:    export const legacyMiddleware: MiddlewareFunction = async ({ context, request, params }, next) => {
71:    // OPTIMIZATION 3: Default context setup with validation
72:    const aspFileName = splatParam;
73:    if (!aspFileName) {
74:        logger.warn('No ASP filename in route params');
75:        await next();
76:        return;
77:    }
78:
79:    const defaultAction = 'MAIN';
80:    const defaultNodeKey = sessionInfo?.nodeKey || 'POL|POL|0|';
81:
82:    const nextContext = mergeNavigationContext(currentNavContext, {
83:        action: defaultAction,
84:        nodeKey: defaultNodeKey,
85:        xmlDetail: currentNavContext?.xmlDetail ?? getXmlDetailFromSessionStorage() ?? '',
86:        userId: sessionInfo?.userId ?? null,
87:        compLoc: sessionInfo?.compLoc ?? null,
88:        policyId: currentNavContext?.policyId ?? sessionInfo?.policyId ?? '0',
89:        cyclingCalled: false,
90:        fileName: aspFileName,
91:        reactRoute: aspToReactRoute(aspFileName),
92:        error: undefined,
93:        navigationDepth: 0,
94:        menuData: currentNavContext?.menuData,
95:        menuLoaded: currentNavContext?.menuLoaded,
96:    });
97:
98:    context.set(navigationContext, nextContext);
99:    await next();
100:   };
