# BUNDLE for src/features/legacy/utils/loader.ts
# 6 photo fragment(s), ascending start-line order.


========== IMG_2405.md ==========
---
photo: IMG_2405.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader.ts
lines: 1-34
orientation: 180
confidence: high
notes: New file — loader.ts (the original/non-optimized legacy loader, sibling of loader-optimized.ts seen in IMG_2394-2396). Top of file, no sticky-scroll header. Line 34 cut off at very bottom (only "logger.info('Redirecting to computed reactRoute', {" partially visible). Explorer sidebar: legacy/utils expanded showing loader-optimized.ts (U), loader.ts (highlighted/selected, 5,U unsaved+untracked), middleware-optimize...ts (U), middleware.ts (U); also visible: features/auth (middleware.ts), dashboard/utils (loader.ts, middleware.ts), form/utils (dynamic-form-loader.ts), legacy > components, policy, prp, root, hooks, lib, pages, providers, services, types. Tab bar: "date.tsx" (9+ unsaved), "loader.ts" (5,U, active). Breadcrumb: aqs-web-ui > src > features > legacy > utils > loader.ts. Branch hitanshu/experimental*, No Solution, 30 errors/0 warnings.
---
1	import { redirect } from 'react-router';
2	import { navigationContext } from '@/context';
3	import { createFeatureLogger } from '@utils/logger-builder';
4	import { fetchPageBuild } from '@features/dashboard/services/page-build';
5	import { normalizeServiceConfig } from '@utils/normalize-service-config';
6	import { getItem } from '@utils/local-storage';
7	
8	import type { LoaderFunctionArgs } from 'react-router';
9	import type { SessionInfo } from '@features/auth/services/auth';
10	
11	// Create logger for legacy loader
12	const logger = createFeatureLogger('legacy', 'loader');
13	
14	/**
15	 * Loader for legacy catch-all route
16	 *
17	 * Handles dynamic rendering of legacy ASP pages via PageBuild + FormRenderer.
18	 * Includes redirect logic to ensure navigation to computed reactRoute.
19	 */
20	export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
21		const navContext = context.get(navigationContext);
22		const url = new URL(request.url);
23		const currentPathname = url.pathname;
24	
25		logger.info('Legacy loader called', {
26			currentPathname,
27			navReactRoute: navContext?.reactRoute,
28			action: navContext?.action,
29			nodeKey: navContext?.nodeKey,
30		});
31	
32		// Step 1: Check for redirect to computed reactRoute
33		if (navContext?.reactRoute && navContext.reactRoute !== currentPathname) {
34		logger.info('Redirecting to computed reactRoute', {


========== IMG_2406.md ==========
---
photo: IMG_2406.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader.ts
lines: 14-47 (overlaps IMG_2405; no sticky-scroll header shown)
orientation: 180
confidence: high
notes: Continuation/re-scroll of IMG_2405, scrolled down slightly. No sticky-scroll header visible (still near top of file). Lines 14-34 repeat content already captured in IMG_2405; new content is lines 35-47, with line 47 cut off at very bottom (only "const sessionInfo = getItem<SessionInfo>('sessionInformation');" visible, semicolon partially clipped by status bar). Explorer sidebar same as IMG_2405: legacy/utils highlighted, loader.ts selected (5,U), loader-optimized.ts (U), middleware-optimize...ts (U), middleware.ts (U). Tab bar: "date.tsx" (9+ unsaved), "loader.ts" (5,U, active). Branch hitanshu/experimental*, No Solution, 30 errors/0 warnings.
---
14	/**
15	 * Loader for legacy catch-all route
16	 *
17	 * Handles dynamic rendering of legacy ASP pages via PageBuild + FormRenderer.
18	 * Includes redirect logic to ensure navigation to computed reactRoute.
19	 */
20	export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
21		const navContext = context.get(navigationContext);
22		const url = new URL(request.url);
23		const currentPathname = url.pathname;
24	
25		logger.info('Legacy loader called', {
26			currentPathname,
27			navReactRoute: navContext?.reactRoute,
28			action: navContext?.action,
29			nodeKey: navContext?.nodeKey,
30		});
31	
32		// Step 1: Check for redirect to computed reactRoute
33		if (navContext?.reactRoute && navContext.reactRoute !== currentPathname) {
34			logger.info('Redirecting to computed reactRoute', {
35				from: currentPathname,
36				to: navContext.reactRoute,
37			});
38			throw redirect(navContext.reactRoute);
39		}
40	
41		// Step 2: Fetch PageBuild data if available
42		let normalizedFields = [];
43		let pageBuildData = null;
44	
45		if (navContext?.xmlFileName && navContext?.xmlDetail) {
46			try {
47			const sessionInfo = getItem<SessionInfo>('sessionInformation');


========== IMG_2407.md ==========
---
photo: IMG_2407.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader.ts
lines: 20-60 (sticky-scroll header 20; visible body 28-60; overlaps IMG_2406)
orientation: 180
confidence: high
notes: Continuation/re-scroll of IMG_2406, scrolled further down; sticky scroll now shows line 20 pinned at top. Lines 28-47 repeat content already captured in IMG_2406; new content is lines 48-60, all fully visible (line 60 is closing "}" of the return object literal). Explorer sidebar same as IMG_2405/2406: legacy/utils highlighted, loader.ts selected (5,U), loader-optimized.ts (U), middleware-optimize...ts (U), middleware.ts (U). Tab bar: "date.tsx" (9+ unsaved), "loader.ts" (5,U, active). Branch hitanshu/experimental*, No Solution, 30 errors/0 warnings.
---
Sticky scroll header:
20	export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {

Body:
28	action: navContext?.action,
29	nodeKey: navContext?.nodeKey,
30	});
31	
32	// Step 1: Check for redirect to computed reactRoute
33	if (navContext?.reactRoute && navContext.reactRoute !== currentPathname) {
34		logger.info('Redirecting to computed reactRoute', {
35			from: currentPathname,
36			to: navContext.reactRoute,
37		});
38		throw redirect(navContext.reactRoute);
39	}
40	
41	// Step 2: Fetch PageBuild data if available
42	let normalizedFields = [];
43	let pageBuildData = null;
44	
45	if (navContext?.xmlFileName && navContext?.xmlDetail) {
46		try {
47		const sessionInfo = getItem<SessionInfo>('sessionInformation');
48		if (!sessionInfo) {
49			logger.error('Session information not found for PageBuild');
50			return {
51				browserCommands: navContext.browserCommands || [],
52				fileName: navContext.fileName,
53				reactRoute: navContext.reactRoute,
54				xmlFileName: navContext.xmlFileName,
55				xmlDetail: navContext.xmlDetail,
56				frame: navContext.frame,
57				normalizedFields: [],
58				error: 'Session information not found',
59			};
60		}


========== IMG_2408.md ==========
---
photo: IMG_2408.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader.ts
lines: 20,42-72
orientation: 180
confidence: high
notes: Photo has a motion/double-exposure ghost (screen appears to have shifted mid-shot) — a fainter duplicate of nearby lines is offset ~2-3 lines below the sharp text; transcription below uses only the sharp/bold text aligned to the gutter numbers. Tab bar shows "date.tsx 9+" and active tab "loader.ts 5,U" (5 problems, unsaved). Breadcrumb: aqs-web-ui > src > features > legacy > utils > loader.ts > ... Sticky-scroll header shows enclosing line 20. Status bar: branch "hitanshu/experimental*", "30 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar (aqs-web-ui/src/features) expanded: auth > middleware.ts; dashboard\utils > loader.ts, middleware.ts; form\utils > dynamic-form-loader.ts; legacy > components (collapsed), utils > loader-optimized.ts (U), loader.ts (5,U, selected/highlighted), middleware-optimize...ts (U), middleware.ts (U); then collapsed folders policy, prp, root, hooks, lib, pages, providers, services, types. Line 73 was cut off/illegible in this photo but is confirmed blank from IMG_2409 (same file, overlapping line range).
---
20:    export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
42:    let normalizedFields = [];
43:    let pageBuildData = null;
44:    // Step 2: Fetch PageBuild data if available
45:    if (navContext?.xmlFileName && navContext?.xmlDetail) {
46:        try {
47:            const sessionInfo = getItem<SessionInfo>('sessionInformation');
48:            if (!sessionInfo) {
49:                logger.error('Session information not found for PageBuild');
50:                return {
51:                    browserCommands: navContext.browserCommands || [],
52:                    fileName: navContext.fileName,
53:                    reactRoute: navContext.reactRoute,
54:                    xmlFileName: navContext.xmlFileName,
55:                    xmlDetail: navContext.xmlDetail,
56:                    frame: navContext.frame,
57:                    normalizedFields: [],
58:                    error: 'Session information not found',
59:                };
60:            }
61:
62:            // Fetch PageBuild using current action/nodeKey from context
63:            pageBuildData = await fetchPageBuild({
64:                sessionInfo,
65:                action: navContext.action || 'MAIN',
66:                nodeKey: navContext.nodeKey || '',
67:                xmlFileName: navContext.xmlFileName,
68:                // xmlDetail: navContext.xmlDetail, // TODO: Parse XML string to object if needed
69:            });
70:
71:            // Normalize fields for FormRenderer
72:            normalizedFields = normalizeServiceConfig(pageBuildData);
73:    (blank line, confirmed via IMG_2409)


========== IMG_2409.md ==========
---
photo: IMG_2409.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader.ts
lines: 20,52-83
orientation: 180
confidence: high
notes: Clean/sharp photo (no ghosting), continues from IMG_2408 in same file. Tab bar shows "date.tsx 9+" and active tab "loader.ts 5,U". Breadcrumb: aqs-web-ui > src > features > legacy > utils > loader.ts > ... Sticky-scroll header shows enclosing line 20. Status bar: branch "hitanshu/experimental*", "30 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar identical to IMG_2408 (loader.ts selected/highlighted under legacy/utils). Line 73 is blank. Cursor sits at end of line 68 near "needed".
---
20:    export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
52:                fileName: navContext.fileName,
53:                reactRoute: navContext.reactRoute,
54:                xmlFileName: navContext.xmlFileName,
55:                xmlDetail: navContext.xmlDetail,
56:                frame: navContext.frame,
57:                normalizedFields: [],
58:                error: 'Session information not found',
59:            };
60:        }
61:
62:        // Fetch PageBuild using current action/nodeKey from context
63:        pageBuildData = await fetchPageBuild({
64:            sessionInfo,
65:            action: navContext.action || 'MAIN',
66:            nodeKey: navContext.nodeKey || '',
67:            xmlFileName: navContext.xmlFileName,
68:            // xmlDetail: navContext.xmlDetail, // TODO: Parse XML string to object if needed
69:        });
70:
71:        // Normalize fields for FormRenderer
72:        normalizedFields = normalizeServiceConfig(pageBuildData);
73:
74:        logger.info('PageBuild fetched and normalized', {
75:            fieldCount: normalizedFields.length,
76:            xmlFileName: navContext.xmlFileName,
77:        });
78:    } catch (error) {
79:        logger.error('Failed to fetch PageBuild', error as Error, {
80:            xmlFileName: navContext.xmlFileName,
81:        });
82:        // Continue with empty fields - page can still render with commands
83:    }


========== IMG_2410.md ==========
---
photo: IMG_2410.JPG
type: vscode-code
file: aqs-web-ui/src/features/legacy/utils/loader.ts
lines: 20,65-97
orientation: 180
confidence: high
notes: Clean/sharp photo, continues from IMG_2409 in same file (loader.ts), reaches end of clientLegacyLoader function. Tab bar shows "date.tsx 9+" and active tab "loader.ts 5,U". Breadcrumb: aqs-web-ui > src > features > legacy > utils > loader.ts > ... Sticky-scroll header shows enclosing line 20. Status bar: branch "hitanshu/experimental*", "30 errors / 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar identical to prior photos (loader.ts selected under legacy/utils). Line 97 shows a closing "}" with a yellow warning-triangle decoration in the gutter (function end) but is partially cut off at bottom edge by status bar. Lines 73 and 85 are blank.
---
20:    export async function clientLegacyLoader({ request, context }: LoaderFunctionArgs) {
65:            action: navContext.action || 'MAIN',
66:            nodeKey: navContext.nodeKey || '',
67:            xmlFileName: navContext.xmlFileName,
68:            // xmlDetail: navContext.xmlDetail, // TODO: Parse XML string to object if needed
69:        });
70:
71:        // Normalize fields for FormRenderer
72:        normalizedFields = normalizeServiceConfig(pageBuildData);
73:
74:        logger.info('PageBuild fetched and normalized', {
75:            fieldCount: normalizedFields.length,
76:            xmlFileName: navContext.xmlFileName,
77:        });
78:    } catch (error) {
79:        logger.error('Failed to fetch PageBuild', error as Error, {
80:            xmlFileName: navContext.xmlFileName,
81:        });
82:        // Continue with empty fields - page can still render with commands
83:    }
84:    }
85:
86:    // Step 3: Return loader data
87:    return {
88:        browserCommands: navContext?.browserCommands || [],
89:        fileName: navContext?.fileName,
90:        reactRoute: navContext?.reactRoute,
91:        xmlFileName: navContext?.xmlFileName,
92:        xmlDetail: navContext?.xmlDetail,
93:        frame: navContext?.frame,
94:        normalizedFields,
95:        pageBuildData,
96:    };
97:    }
