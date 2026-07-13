# BUNDLE for src/utils/asp-route-mapper.ts
# 37 photo fragment(s), ascending start-line order.


========== IMG_3290.md ==========
---
photo: IMG_3290.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 1-33
orientation: 180
confidence: high
notes: Photo taken upside down, rotated 180 to read. NEW file/tab compared to IMG_3280-3289: asp-route-mapper.ts, breadcrumb aqs-web-ui > src > utils > asp-route-mapper.ts > ... (no active editor tab bar visible at very top of crop, tab shown as "asp-route-mapper.ts" selected/highlighted in Explorer sidebar under aqs-web-ui/src/utils, replacing the earlier apply-server-commands.ts selection). No sticky-scroll header visible - viewport starts at line 1 (top of file) and is clean/sharp throughout, no tearing/doubling artifact in this photo. File header JSDoc block (lines 1-18) documents the module: converts legacy ASP filenames to React routes, integrates with an ASP_Route_Map constant for custom mappings; includes @example usage snippets for aspToReactRoute() and getComponentNameFromAsp(). Line 20 imports { ASP_Route_Map } from '@constants/asp-route-map'. Lines 22-33 begin a matchPattern() JSDoc block and function signature for matching a filename against a wildcard pattern, with @param/@returns/@example tags and two matchPattern() usage examples. Explorer sidebar shows apply-server-commands.ts (now unselected, dot indicator) and asp-route-mapper.ts (selected, blue highlight) among sibling files: build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payload..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts. "No Solution" / 2 errors, 0 warnings in status bar. Timestamp bottom right 6:16 PM 7/10/2026. Branch hitanshu/experimental.
---
1  /**
2   * @file asp-route-mapper.ts
3   * @description Utilities for mapping ASP routes to React routes
4   *
5   * Handles conversion between legacy ASP filenames and modern React Router paths.
6   * Integrates with ASP_Route_Map constant for custom mappings.
7   *
8   * @example
9   * ```tsx
10  * // Convert ASP filename to React route
11  * const route = aspToReactRoute('Main_ISLLSYS_20010101.asp');
12  * // Returns: '/Main_ISLLSYS_20010101'
13  *
14  * // Get component name
15  * const component = getComponentNameFromAsp('Main_ISLLSYS_20010101.asp');
16  * // Returns: 'Main_ISLLSYS_20010101'
17  * ```
18  */
19
20 import { ASP_Route_Map } from '@constants/asp-route-map';
21
22 /**
23  * Match a filename against a pattern with wildcards
24  *
25  * @param filename - Filename to test
26  * @param pattern - Pattern with * wildcards
27  * @returns True if filename matches pattern
28  *
29  * @example
30  * matchPattern('Pol_PIPHPOL_20160403.asp', 'Pol_PIPHPOL_*.asp') // true
31  * matchPattern('ActMnu_ISLLPOL_Lob_20010101.asp', 'ActMnu_*_Lob_*.asp') // true
32  */
33 function matchPattern(filename: string, pattern: string): boolean {


========== IMG_3292.md ==========
---
photo: IMG_3292.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 17-49
orientation: 180
confidence: high
notes: Explorer sidebar shows src/providers (theme-provider.tsx), src/services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), src/types (grid-response.ts), src/utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts [selected/highlighted], build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa... [truncated], button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Tab bar shows only "asp-route-mapper.ts" open. Breadcrumb: aqs-web-ui > src > utils > asp-route-mapper.ts > ... Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 49 is cut off at bottom of screen (only top of text visible, appears blank/start of next function). Lines 1-16 not visible (scrolled below top of file / docblock start).
---
17	 * ```
18	 */
19	
20	import { ASP_Route_Map } from '@constants/asp-route-map';
21	
22	/**
23	 * Match a filename against a pattern with wildcards
24	 *
25	 * @param filename - Filename to test
26	 * @param pattern - Pattern with * wildcards
27	 * @returns True if filename matches pattern
28	 *
29	 * @example
30	 * matchPattern('Pol_PIPHPOL_20160403.asp', 'Pol_PIPHPOL_*.asp') // true
31	 * matchPattern('ActMnu_ISLLPOL_Lob_20010101.asp', 'ActMnu_*_Lob_*.asp') // true
32	 */
33	function matchPattern(filename: string, pattern: string): boolean {
34	    // Escape special regex characters except *
35	    const escapedPattern = pattern
36	        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
37	        .replace(/\*/g, '.*');
38	
39	    const regex = new RegExp(`^${escapedPattern}$`, 'i');
40	    return regex.test(filename);
41	}
42	
43	function findCustomRoute(aspFile: string): string | undefined {
44	    // 1. Try exact match first (case-insensitive)
45	    const direct = ASP_Route_Map[aspFile];
46	    if (direct) {
47	        return direct;
48	    }
49	⟪?⟫


========== IMG_3291.md ==========
---
photo: IMG_3291.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 33,34-39
orientation: 180
confidence: medium
notes: Photo taken upside down, rotated 180 to read. Same file/tab as IMG_3290 (asp-route-mapper.ts), breadcrumb aqs-web-ui > src > utils > asp-route-mapper.ts > ... Frame shows the same screen-tearing/double-exposure artifact seen in IMG_3285/3288/3289 (two overlapping, vertically-offset copies of the scrolling content from a rolling-shutter capture mid smooth-scroll), affecting most of the visible viewport (roughly lines 6-38 are doubled/misaligned). Lines 1-33 duplicate content already transcribed cleanly at high confidence in IMG_3290 (not re-transcribed here). New content beyond IMG_3290: lines 34-39, the body of matchPattern() escaping special regex characters in the pattern then building a case-insensitive RegExp anchored with ^...$; these lines are legible with medium confidence given the tearing - line 38 in particular is ambiguous (visually shows what looks like a duplicate/ghost of line 35's "const escapedPattern = pattern" bleeding through) and is presumed to actually be a blank separator line between the escapedPattern construction and the regex line, based on standard formatting and the confirmed line 39 content; flagged with ⟪?⟫ rather than guessed as code. "No Solution" / 2 errors, 0 warnings in status bar. Timestamp bottom right 6:16 PM 7/10/2026. Branch hitanshu/experimental.
---
33 function matchPattern(filename: string, pattern: string): boolean {
34     // Escape special regex characters except *
35     const escapedPattern = pattern
36         .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
37         .replace(/\*/g, '.*');
38     ⟪?⟫ (likely blank line - ghosted/ambiguous due to tearing artifact)
39     const regex = new RegExp(`^${escapedPattern}$`, 'i');


========== IMG_3293.md ==========
---
photo: IMG_3293.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 33-68
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3292 (asp-route-mapper.ts), scrolled down. IMPORTANT ARTIFACT — this photo shows a ghosting/double-exposure effect across the code text area (two overlapping renders of the editor content, offset by roughly 2-3 line-heights vertically); the line-number gutter itself stays crisp/sequential (33,35,37,38,39,40,41,42,43...68) and was used to anchor each line's sharp (higher-contrast, in-focus) text layer while the fainter offset duplicate layer was ignored. Lines 34 and 36 are obscured by the ghosting overlap in this photo but were transcribed cleanly from IMG_3292 (34: "// Escape special regex characters except *", 36: ".replace(/[.+?^${}()|[\\]\\\\]/g, '\\\\$&')") — cross-referenced here, not re-guessed. CORRECTION (post IMG_3294 review): line 68 was initially misread as "return route;" — a later, clearer photo (IMG_3294) of this same function's tail shows the real structure is line 65 "return route;", 66 "}", 67 "}", 68 blank, 69 "return undefined;", 70 closing "}" of the function. The "return route;" apparition at line 68 in this photo was the ghosting artifact (line 65's text bleeding down ~3 rows), not real code — corrected below to blank. Explorer sidebar same file list as IMG_3292 (asp-route-mapper.ts highlighted). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript, CRLF.
---
33	function matchPattern(filename: string, pattern: string): boolean {
34	    // Escape special regex characters except *  ⟪cross-ref IMG_3292, obscured by ghosting here⟫
35	    const escapedPattern = pattern
36	        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')  ⟪cross-ref IMG_3292, obscured by ghosting here⟫
37	        .replace(/\*/g, '.*');
38	
39	    const regex = new RegExp(`^${escapedPattern}$`, 'i');
40	    return regex.test(filename);
41	}
42	
43	function findCustomRoute(aspFile: string): string | undefined {
44	    // 1. Try exact match first (case-insensitive)
45	    const direct = ASP_Route_Map[aspFile];
46	    if (direct) {
47	        return direct;
48	    }
49	
50	    const lower = aspFile.toLowerCase();
51	    for (const [key, value] of Object.entries(ASP_Route_Map)) {
52	        if (key.toLowerCase() === lower) {
53	            return value;
54	        }
55	    }
56	
57	    // 2. Try pattern matching (keys with wildcards)
58	    for (const [pattern, route] of Object.entries(ASP_Route_Map)) {
59	        if (pattern.includes('*') && matchPattern(aspFile, pattern)) {
60	            console.log('[ASP Route Mapper] Pattern match:', {
61	                fileName: aspFile,
62	                pattern,
63	                route,
64	            });
65	            return route;
66	        }
67	    }
68	⟪corrected: blank line — see notes; originally misread as "return route;" due to ghosting artifact⟫


========== IMG_3294.md ==========
---
photo: IMG_3294.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 43-76
orientation: 180
confidence: high
notes: Same file/tab as IMG_3292/IMG_3293 (asp-route-mapper.ts), scrolled further down. Same ghosting/double-exposure artifact as IMG_3293 affects the upper part of the visible code (lines ~43-64, offset ~3 line-heights) but the lower part (lines ~65-76) is crisp/settled with a single clean text layer, which let me confirm and CORRECT the tail of findCustomRoute: it is return route; / } / } / (blank) / return undefined; / } — not a duplicate "return route;" as misread at line 68 of IMG_3293 (fixed there). Line 72 "// ------------------------------------------" is a plain dashed-comment separator (VS Code renders it with a horizontal rule-like appearance); the faint text "Convert ASP filename to React route path" visible overlapping it is the ghost of line 75 bleeding up ~3 rows, not real content of line 72. New JSDoc block begins at line 74 for the next function (name not yet visible — cut off at line 76 by bottom of screen / "No Solution" status bar). Explorer sidebar same file list as prior two photos, asp-route-mapper.ts highlighted. Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript, CRLF.
---
43	function findCustomRoute(aspFile: string): string | undefined {
44	    // 1. Try exact match first (case-insensitive)
45	    const direct = ASP_Route_Map[aspFile];
46	    if (direct) {
47	        return direct;
48	    }
49	
50	    const lower = aspFile.toLowerCase();
51	    for (const [key, value] of Object.entries(ASP_Route_Map)) {
52	        if (key.toLowerCase() === lower) {
53	            return value;
54	        }
55	    }
56	
57	    // 2. Try pattern matching (keys with wildcards)
58	    for (const [pattern, route] of Object.entries(ASP_Route_Map)) {
59	        if (pattern.includes('*') && matchPattern(aspFile, pattern)) {
60	            console.log('[ASP Route Mapper] Pattern match:', {
61	                fileName: aspFile,
62	                pattern,
63	                route,
64	            });
65	            return route;
66	        }
67	    }
68	
69	    return undefined;
70	}
71	
72	// ------------------------------------------
73	
74	/**
75	 * Convert ASP filename to React route path
76	 *


========== IMG_3295.md ==========
---
photo: IMG_3295.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 43, 57-89
orientation: 180
confidence: high
notes: Same file/tab as prior three photos (asp-route-mapper.ts), scrolled further down. No ghosting artifact in this photo — clean single frame, which CONFIRMS the correction made to IMG_3293/IMG_3294: findCustomRoute ends with return route; / } / } / (blank line 68) / return undefined; / } (line 70) — line 68 is blank, matching the IMG_3294-based correction. Line 43 "function findCustomRoute(aspFile: string): string | undefined {" is a VS Code sticky-scroll header (repeats the enclosing function signature; not part of the contiguous scroll position, which starts at line 57). New JSDoc block starting at line 74 documents a function whose name appears at line 85/88 example calls as `aspToReactRoute` (declaration itself not yet visible past line 89 — cut off at bottom of screen). Explorer sidebar same file list as prior photos, asp-route-mapper.ts highlighted. Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript, CRLF.
---
43	function findCustomRoute(aspFile: string): string | undefined {   [sticky-scroll header]
57	    // 2. Try pattern matching (keys with wildcards)
58	    for (const [pattern, route] of Object.entries(ASP_Route_Map)) {
59	        if (pattern.includes('*') && matchPattern(aspFile, pattern)) {
60	            console.log('[ASP Route Mapper] Pattern match:', {
61	                fileName: aspFile,
62	                pattern,
63	                route,
64	            });
65	            return route;
66	        }
67	    }
68	
69	    return undefined;
70	}
71	
72	// ------------------------------------------
73	
74	/**
75	 * Convert ASP filename to React route path
76	 *
77	 * Removes .asp extension and adds leading slash.
78	 * Checks ASP_Route_Map for custom mappings first.
79	 *
80	 * @param aspFile - ASP filename (e.g., 'Main_ISLLSYS_20010101.asp')
81	 * @returns React route path (e.g., '/Main_ISLLSYS_20010101')
82	 *
83	 * @example
84	 * ```tsx
85	 * aspToReactRoute('Main_ISLLSYS_20010101.asp')
86	 * // → '/Main_ISLLSYS_20010101'
87	 *
88	 * aspToReactRoute('Modal_ISLLSYS_20010101.asp')
89	 * // → '/Modal_ISLLSYS_20010101' (or custom mapped route)


========== IMG_3296.md ==========
---
photo: IMG_3296.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 43, 68-99
orientation: 180
confidence: high
notes: Same file/tab as prior photos (asp-route-mapper.ts), scrolled further down. Clean image, no ghosting. Line 43 is a VS Code sticky-scroll header (repeats the enclosing function signature findCustomRoute; not part of contiguous scroll, which starts at line 68). Reveals the new exported function aspToReactRoute (line 92) referenced by the JSDoc example seen in IMG_3295. Line 99 "if (customRoute) {" is cut off at the very bottom of the screen (only that much visible before status bar). Explorer sidebar same file list as prior photos, asp-route-mapper.ts highlighted. Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript, CRLF.
---
43	function findCustomRoute(aspFile: string): string | undefined {   [sticky-scroll header]
68	
69	    return undefined;
70	}
71	
72	// ------------------------------------------
73	
74	/**
75	 * Convert ASP filename to React route path
76	 *
77	 * Removes .asp extension and adds leading slash.
78	 * Checks ASP_Route_Map for custom mappings first.
79	 *
80	 * @param aspFile - ASP filename (e.g., 'Main_ISLLSYS_20010101.asp')
81	 * @returns React route path (e.g., '/Main_ISLLSYS_20010101')
82	 *
83	 * @example
84	 * ```tsx
85	 * aspToReactRoute('Main_ISLLSYS_20010101.asp')
86	 * // → '/Main_ISLLSYS_20010101'
87	 *
88	 * aspToReactRoute('Modal_ISLLSYS_20010101.asp')
89	 * // → '/Modal_ISLLSYS_20010101' (or custom mapped route)
90	 * ```
91	 */
92	export function aspToReactRoute(aspFile: string): string {
93	    const normalized = normalizeAspFileName(aspFile);
94	    // Remove .asp/.aspx extension
95	    const baseName = normalized.replace(/\.aspx?$/i, '');
96	
97	    // Check if there's a custom mapping (includes pattern matching)
98	    const customRoute = findCustomRoute(normalized);
99	    if (customRoute) {


========== IMG_3297.md ==========
---
photo: IMG_3297.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 83-115
orientation: 180
confidence: high
notes: Same file/tab as prior photos (asp-route-mapper.ts), scrolled further down. Clean image, no ghosting. Completes the aspToReactRoute function (starts line 92, closes line 115) — the last visible line in the file at this scroll position is 115 "}" (end of function), no further content below (cut off by status bar / bottom of window, appears to be the actual end of the visible/scrollable area shown). Lines 83-91 repeat the JSDoc example block already captured in IMG_3295/IMG_3296. Explorer sidebar same file list as prior photos, asp-route-mapper.ts highlighted. Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript, CRLF.
---
83	 * @example
84	 * ```tsx
85	 * aspToReactRoute('Main_ISLLSYS_20010101.asp')
86	 * // → '/Main_ISLLSYS_20010101'
87	 *
88	 * aspToReactRoute('Modal_ISLLSYS_20010101.asp')
89	 * // → '/Modal_ISLLSYS_20010101' (or custom mapped route)
90	 * ```
91	 */
92	export function aspToReactRoute(aspFile: string): string {
93	    const normalized = normalizeAspFileName(aspFile);
94	    // Remove .asp/.aspx extension
95	    const baseName = normalized.replace(/\.aspx?$/i, '');
96	
97	    // Check if there's a custom mapping (includes pattern matching)
98	    const customRoute = findCustomRoute(normalized);
99	    if (customRoute) {
100	        // Custom mapping exists - use the mapped name
101	        console.log('[ASP Route Mapper] Mapped route:', {
102	            aspFile: normalized,
103	            reactRoute: `/${customRoute}`,
104	        });
105	        return `/${customRoute}`;
106	    }
107	
108	    // Fallback: use the base name as route (convention-based)
109	    console.warn('[ASP Route Mapper] No mapping found, using convention-based route:', {
110	        aspFile: normalized,
111	        reactRoute: `/${baseName}`,
112	        hint: 'Add entry to ASP_Route_Map if this is incorrect',
113	    });
114	    return `/${baseName}`;
115	}


========== IMG_3298.md ==========
---
photo: IMG_3298.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 92, 99-131
orientation: 180
confidence: high
notes: Same file/tab as prior photos (asp-route-mapper.ts), scrolled further down. Clean image, minimal ghosting except line 99 is partly obscured by the sticky-scroll header for line 92 overlapping it — legible on close zoom as "if (customRoute) {". Line 92 "export function aspToReactRoute(aspFile: string): string {" is the sticky-scroll header. Reveals start of new JSDoc block (line 117) documenting the inverse function reactToAspRoute (referenced in @example at lines 128/131), matching aspToReactRoute already captured in IMG_3296/3297. Line 131 cut off at bottom of screen. Explorer sidebar same file list as prior photos, asp-route-mapper.ts highlighted. Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript, CRLF.
---
92	export function aspToReactRoute(aspFile: string): string {   [sticky-scroll header]
99	    if (customRoute) {
100	        // Custom mapping exists - use the mapped name
101	        console.log('[ASP Route Mapper] Mapped route:', {
102	            aspFile: normalized,
103	            reactRoute: `/${customRoute}`,
104	        });
105	        return `/${customRoute}`;
106	    }
107	
108	    // Fallback: use the base name as route (convention-based)
109	    console.warn('[ASP Route Mapper] No mapping found, using convention-based route:', {
110	        aspFile: normalized,
111	        reactRoute: `/${baseName}`,
112	        hint: 'Add entry to ASP_Route_Map if this is incorrect',
113	    });
114	    return `/${baseName}`;
115	}
116	
117	/**
118	 * Convert React route path to ASP filename
119	 *
120	 * Adds .asp extension to route path.
121	 * Handles both with and without leading slash.
122	 *
123	 * @param reactRoute - React route path (e.g., '/Main_ISLLSYS_20010101')
124	 * @returns ASP filename (e.g., 'Main_ISLLSYS_20010101.asp')
125	 *
126	 * @example
127	 * ```tsx
128	 * reactToAspRoute('/Main_ISLLSYS_20010101')
129	 * // → 'Main_ISLLSYS_20010101.asp'
130	 *
131	 * reactToAspRoute('Main_ISLLSYS_20010101')


========== IMG_3299.md ==========
---
photo: IMG_3299.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 92, 110-141
orientation: 180
confidence: high
notes: Same file/tab as prior photos (asp-route-mapper.ts), scrolled further down. Line 92 is the sticky-scroll header (aspToReactRoute signature). Lines 110-131 cross-confirmed cleanly against IMG_3298/IMG_3297 (matches exactly). GHOSTING ARTIFACT affects lines ~130-141 (double-exposure, offset ~2 line-heights, both gutter numbers and text visibly doubled) — lines 132-141 were reconstructed by forward-counting from the confirmed anchor at line 131 ("reactToAspRoute('Main_ISLLSYS_20010101')", established cleanly in IMG_3298). CONFIRMED CORRECT: IMG_3300 (clean, no ghosting, slightly further scrolled) shows lines 127-160 and matches this reconstruction of 127-141 exactly, including the closing "}" at line 141 and the next JSDoc block starting at line 143 ("* Get component name from ASP filename" is line 144, not 141 as a naive ghosted gutter read might have suggested). Confidence upgraded to high post-confirmation. Explorer sidebar same file list as prior photos, asp-route-mapper.ts highlighted. Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript, CRLF.
---
92	export function aspToReactRoute(aspFile: string): string {   [sticky-scroll header]
110	        aspFile: normalized,
111	        reactRoute: `/${baseName}`,
112	        hint: 'Add entry to ASP_Route_Map if this is incorrect',
113	    });
114	    return `/${baseName}`;
115	}
116	
117	/**
118	 * Convert React route path to ASP filename
119	 *
120	 * Adds .asp extension to route path.
121	 * Handles both with and without leading slash.
122	 *
123	 * @param reactRoute - React route path (e.g., '/Main_ISLLSYS_20010101')
124	 * @returns ASP filename (e.g., 'Main_ISLLSYS_20010101.asp')
125	 *
126	 * @example
127	 * ```tsx
128	 * reactToAspRoute('/Main_ISLLSYS_20010101')
129	 * // → 'Main_ISLLSYS_20010101.asp'
130	 *
131	 * reactToAspRoute('Main_ISLLSYS_20010101')
132	 * // → 'Main_ISLLSYS_20010101.asp'
133	 * ```
134	 */
135	export function reactToAspRoute(reactRoute: string): string {
136	    // Remove leading slash if present
137	    const baseName = reactRoute.replace(/^\//, '');
138	
139	    // Add .asp extension
140	    return `${baseName}.asp`;
141	}


========== IMG_3300.md ==========
---
photo: IMG_3300.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 127-160
orientation: 180
confidence: high
notes: Same file/tab as prior photos (asp-route-mapper.ts), scrolled slightly further down. Clean image, no ghosting. This photo CONFIRMS the IMG_3299 forward-count reconstruction of lines 127-141 exactly (reactToAspRoute function body and closing brace at line 141). Reveals new JSDoc block starting line 143 for getComponentNameFromAsp (name visible in @example calls at lines 154/157; declaration itself not yet visible, cut off at line 160 "*/" at bottom of screen). Explorer sidebar same file list as prior photos, asp-route-mapper.ts highlighted. Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript, CRLF.
---
127	 * ```tsx
128	 * reactToAspRoute('/Main_ISLLSYS_20010101')
129	 * // → 'Main_ISLLSYS_20010101.asp'
130	 *
131	 * reactToAspRoute('Main_ISLLSYS_20010101')
132	 * // → 'Main_ISLLSYS_20010101.asp'
133	 * ```
134	 */
135	export function reactToAspRoute(reactRoute: string): string {
136	    // Remove leading slash if present
137	    const baseName = reactRoute.replace(/^\//, '');
138	
139	    // Add .asp extension
140	    return `${baseName}.asp`;
141	}
142	
143	/**
144	 * Get component name from ASP filename
145	 *
146	 * Uses ASP_Route_Map to get the mapped component name.
147	 * Falls back to ASP filename without extension if no mapping exists.
148	 *
149	 * @param aspFile - ASP filename
150	 * @returns Component name for dynamic import
151	 *
152	 * @example
153	 * ```tsx
154	 * getComponentNameFromAsp('Main_ISLLSYS_20010101.asp')
155	 * // → 'Main_ISLLSYS_20010101'
156	 *
157	 * getComponentNameFromAsp('Unknown_Page.asp')
158	 * // → 'Unknown_Page' (no mapping, uses filename)
159	 * ```
160	 */


========== IMG_3301.md ==========
---
photo: IMG_3301.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 143-176
orientation: 180
confidence: high
notes: Same file/tab as prior photos (asp-route-mapper.ts), scrolled further down. A sticky-scroll header is visible at the very top edge (partially cut off by the window title bar) reading "export function reactToAspRoute(reactRoute: string): string {" — exact line number not legible/reliable, omitted. GHOSTING ARTIFACT (double-exposure, offset ~3 line-heights, gutter and text both doubled) affects the whole visible frame. Lines 143-160 cross-confirmed against the clean IMG_3300 (matches exactly, high confidence). Lines 161-176 (new content, the getComponentNameFromAsp function body and start of the next JSDoc block) were reconstructed by forward-counting from the confirmed clean anchor at line 160 ("*/", from IMG_3300) rather than trusting the ghosted gutter digits directly. CONFIRMED CORRECT: IMG_3302 (clean, no ghosting) shows lines 159-191 and matches this reconstruction of 161-176 exactly. Confidence upgraded to high post-confirmation. Explorer sidebar same file list as prior photos, asp-route-mapper.ts highlighted. Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript, CRLF.
---
143	/**
144	 * Get component name from ASP filename
145	 *
146	 * Uses ASP_Route_Map to get the mapped component name.
147	 * Falls back to ASP filename without extension if no mapping exists.
148	 *
149	 * @param aspFile - ASP filename
150	 * @returns Component name for dynamic import
151	 *
152	 * @example
153	 * ```tsx
154	 * getComponentNameFromAsp('Main_ISLLSYS_20010101.asp')
155	 * // → 'Main_ISLLSYS_20010101'
156	 *
157	 * getComponentNameFromAsp('Unknown_Page.asp')
158	 * // → 'Unknown_Page' (no mapping, uses filename)
159	 * ```
160	 */
161	export function getComponentNameFromAsp(aspFile: string): string {
162	    const normalized = normalizeAspFileName(aspFile);
163	    // Check custom mapping first
164	    const mappedName = findCustomRoute(normalized);
165	    if (mappedName) {
166	        return mappedName;
167	    }
168	
169	    // Default: use ASP filename without extension
170	    return normalized.replace(/\.aspx?$/i, '');
171	}
172	
173	/**
174	 * Check if ASP route has a custom mapping
175	 *
176	 * @param aspFile - ASP filename


========== IMG_3302.md ==========
---
photo: IMG_3302.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 159-191
orientation: 180
confidence: high
notes: Same file/tab as prior photos (asp-route-mapper.ts), scrolled further down. Clean image, no ghosting. CONFIRMS the IMG_3301 forward-count reconstruction of lines 159-176 exactly (getComponentNameFromAsp function body and closing brace at 171, next JSDoc block 173-178). Reveals new function hasCustomMapping (179-181) and start of a new JSDoc block (183-191) for a function that parses an ASP URL to extract filename and query params (declaration not yet visible, cut off at line 191/192). Line 187's URL example "http://server/path/file.asp?param=value" is rendered with underline styling (VS Code auto-linkification of URL-looking text in comments). Explorer sidebar same file list as prior photos, asp-route-mapper.ts highlighted. Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript, CRLF.
---
159	 * ```
160	 */
161	export function getComponentNameFromAsp(aspFile: string): string {
162	    const normalized = normalizeAspFileName(aspFile);
163	    // Check custom mapping first
164	    const mappedName = findCustomRoute(normalized);
165	    if (mappedName) {
166	        return mappedName;
167	    }
168	
169	    // Default: use ASP filename without extension
170	    return normalized.replace(/\.aspx?$/i, '');
171	}
172	
173	/**
174	 * Check if ASP route has a custom mapping
175	 *
176	 * @param aspFile - ASP filename
177	 * @returns True if custom mapping exists
178	 */
179	export function hasCustomMapping(aspFile: string): boolean {
180	    return !!findCustomRoute(normalizeAspFileName(aspFile));
181	}
182	
183	/**
184	 * Parse ASP URL to extract filename and query params
185	 *
186	 * Handles various URL formats:
187	 * - Full URL: http://server/path/file.asp?param=value
188	 * - Relative: ../../system/file.asp?param=value
189	 * - Just filename: file.asp
190	 *
191	 * @param url - ASP URL


========== IMG_3303.md ==========
---
photo: IMG_3303.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 172-205
orientation: 180
confidence: high
notes: Same file/tab as prior photos (asp-route-mapper.ts), scrolled further down. Photo was captured upside down; rotated 180° via sips before transcribing. Clean image, no ghosting, no sticky-scroll header visible (no enclosing function scope active at line 172, which is a blank line before a JSDoc block). CONFIRMS the IMG_3302 forward-count reconstruction of lines 172-191 (hasCustomMapping JSDoc/function at 173-181, and start of parseAspUrl JSDoc at 183-191) exactly. Reveals rest of the parseAspUrl JSDoc (192-204) including an @example fenced ```tsx block (195-203) showing sample input/output, and the start of the parseAspUrl function declaration at line 205 — only "export function parseAspUrl(url: string): {" is visible, return type object shape is cut off below the visible editor area (not captured in this photo). Line 187's URL example "http://server/path/file.asp?param=value" is underlined (VS Code auto-linkification of URL-looking text in comments). Explorer sidebar same file list as prior photos: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts highlighted/active, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:16 PM 7/10/2026.
---
172	
173	/**
174	 * Check if ASP route has a custom mapping
175	 *
176	 * @param aspFile - ASP filename
177	 * @returns True if custom mapping exists
178	 */
179	export function hasCustomMapping(aspFile: string): boolean {
180	    return !!findCustomRoute(normalizeAspFileName(aspFile));
181	}
182	
183	/**
184	 * Parse ASP URL to extract filename and query params
185	 *
186	 * Handles various URL formats:
187	 * - Full URL: http://server/path/file.asp?param=value
188	 * - Relative: ../../system/file.asp?param=value
189	 * - Just filename: file.asp
190	 *
191	 * @param url - ASP URL
192	 * @returns Parsed components
193	 *
194	 * @example
195	 * ```tsx
196	 * parseAspUrl('../../system/Main_ISLLSYS_20010101.asp?nodeKey=123')
197	 * // → {
198	 * //   fileName: 'Main_ISLLSYS_20010101.asp',
199	 * //   path: '../../system/',
200	 * //   queryString: '?nodeKey=123',
201	 * //   params: { nodeKey: '123' }
202	 * // }
203	 * ```
204	 */
205	export function parseAspUrl(url: string): {⟪?⟫


========== IMG_3304.md ==========
---
photo: IMG_3304.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 201-233
orientation: 180
confidence: medium
notes: Photo shows visible ghosting/double-exposure artifact (faint duplicate text offset slightly below/behind the sharp text, likely motion blur from screen scroll during shutter) — transcription follows the sharp, in-focus text. Explorer sidebar (utils folder) shows files: api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts (selected/highlighted), build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa... (truncated), button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts. Also under src: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts). Tab bar shows only "asp-route-mapper.ts" open. Breadcrumb: aqs-web-ui > src > utils > asp-route-mapper.ts. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 234 is barely a sliver at the very bottom edge (above status bar), not legible. Lines 201-204 are the tail end of a JSDoc comment block (example usage) preceding the function.
---
201	 * //    params: { nodeKey: '123' }
202	 * // }
203	 * ```
204	 */
205	export function parseAspUrl(url: string): {
206	    fileName: string;
207	    path: string;
208	    queryString: string;
209	    params: Record<string, string>;
210	} {
211	    let decodedUrl = url;
212	    try {
213	        decodedUrl = decodeURIComponent(url);
214	    } catch {
215	        decodedUrl = url;
216	    }
217	
218	    // Split URL into path and query
219	    const [pathPart, queryPart] = decodedUrl.split('?');
220	
221	    // Extract filename from path
222	    const pathSegments = pathPart.split('/');
223	    const fileName = pathSegments[pathSegments.length - 1];
224	    const path = pathSegments.slice(0, -1).join('/');
225	
226	    // Parse query parameters
227	    const params: Record<string, string> = {};
228	    if (queryPart) {
229	        const searchParams = new URLSearchParams(queryPart);
230	        searchParams.forEach((value, key) => {
231	            params[key] = value;
232	        });
233	    }


========== IMG_3305.md ==========
---
photo: IMG_3305.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 205-247
orientation: 180
confidence: medium
notes: Photo is a double-exposure/motion-blur blend of TWO scroll positions of the same file — one matching IMG_3304 (lines ~201-233, sharp) and a second, slightly further-scrolled position (lines ~215-247) blended on top, producing doubled gutter numbers and overlapping ghost text. Lines 205-233 reproduce (cross-verified against IMG_3304's clean transcript, consistent wherever legible) — see IMG_3304.md for that portion at higher confidence. Lines 234-247 are new content not seen in IMG_3304, read from a sharper/less-blurred region of the frame at high confidence. Explorer sidebar (utils folder) identical to IMG_3304: api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts (highlighted), build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa... (truncated), button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts. Tab bar: only "asp-route-mapper.ts" open. Breadcrumb: aqs-web-ui > src > utils > asp-route-mapper.ts. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
205	export function parseAspUrl(url: string): {
206	    fileName: string;
207	    path: string;
208	    queryString: string;
209	    params: Record<string, string>;
210	} {
211	    let decodedUrl = url;
212	    try {
213	        decodedUrl = decodeURIComponent(url);
214	    } catch {
215	        decodedUrl = url;
216	    }
217	
218	    // Split URL into path and query
219	    const [pathPart, queryPart] = decodedUrl.split('?');
220	
221	    // Extract filename from path
222	    const pathSegments = pathPart.split('/');
223	    const fileName = pathSegments[pathSegments.length - 1];
224	    const path = pathSegments.slice(0, -1).join('/');
225	
226	    // Parse query parameters
227	    const params: Record<string, string> = {};
228	    if (queryPart) {
229	        const searchParams = new URLSearchParams(queryPart);
230	        searchParams.forEach((value, key) => {
231	            params[key] = value;
232	        });
233	    }
234	
235	    return {
236	        fileName,
237	        path: path ? `${path}/` : '',
238	        queryString: queryPart ? `?${queryPart}` : '',
239	        params,
240	    };
241	}
242	
243	/**
244	 * Map of accepted key casings → canonical lowercase key.
245	 * Backend may use uppercase; the app uses lowercase.
246	 */
247	type CanonicalRouteParamKey = 'frame' | 'nodeKey' | 'action' | 'policyId';


========== IMG_3306.md ==========
---
photo: IMG_3306.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 205-249 (205 is sticky-scroll header; viewport body 218-249)
orientation: 180
confidence: high
notes: Line 205 is a VS Code sticky-scroll header (pinned enclosing function signature) — the actual scrolled viewport starts at line 218. Sharp/clean image, no ghosting (unlike IMG_3304/IMG_3305). Confirms and extends content seen in IMG_3304/IMG_3305 with new lines 234-249. Explorer sidebar (utils folder) same as prior photos in this file: api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts (highlighted), build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa... (truncated), button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts. Tab bar: only "asp-route-mapper.ts" open. Breadcrumb: aqs-web-ui > src > utils > asp-route-mapper.ts (partially cut off at top). Status bar: branch hitanshu/experimental*, "No Solution", 2 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
205	export function parseAspUrl(url: string): {    [sticky-scroll header]
218	    // Split URL into path and query
219	    const [pathPart, queryPart] = decodedUrl.split('?');
220	
221	    // Extract filename from path
222	    const pathSegments = pathPart.split('/');
223	    const fileName = pathSegments[pathSegments.length - 1];
224	    const path = pathSegments.slice(0, -1).join('/');
225	
226	    // Parse query parameters
227	    const params: Record<string, string> = {};
228	    if (queryPart) {
229	        const searchParams = new URLSearchParams(queryPart);
230	        searchParams.forEach((value, key) => {
231	            params[key] = value;
232	        });
233	    }
234	
235	    return {
236	        fileName,
237	        path: path ? `${path}/` : '',
238	        queryString: queryPart ? `?${queryPart}` : '',
239	        params,
240	    };
241	}
242	
243	/**
244	 * Map of accepted key casings → canonical lowercase key.
245	 * Backend may use uppercase; the app uses lowercase.
246	 */
247	type CanonicalRouteParamKey = 'frame' | 'nodeKey' | 'action' | 'policyId';
248	
249	const SAFE_PARAM_ORDER: CanonicalRouteParamKey[] = ['frame', 'nodeKey', 'action', 'policyId'];


========== IMG_3307.md ==========
---
photo: IMG_3307.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 205-265 (205 sticky-scroll header; body 234-264 legible, 265 cut off/illegible)
orientation: 180
confidence: medium
notes: Photo is a double-exposure/motion-blur blend of two adjacent scroll positions (same artifact as IMG_3304/3305), so most lines show faint doubled text. Lines 205 (sticky-scroll header), 234-249 overlap with IMG_3306 (cross-verified, consistent). New content not previously seen is lines 250-264, read from a comparatively sharper region at medium-high confidence. Line 265 sits right above the status bar and is only a ghost repeat of line 262's text — not legible as its own line, omitted. Explorer sidebar (utils folder) same as prior photos: api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts (highlighted), build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa... (truncated), button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts. Tab bar: only "asp-route-mapper.ts" open. Breadcrumb: aqs-web-ui > src > utils > asp-route-mapper.ts. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
205	export function parseAspUrl(url: string): {    [sticky-scroll header]
234	
235	    return {
236	        fileName,
237	        path: path ? `${path}/` : '',
238	        queryString: queryPart ? `?${queryPart}` : '',
239	        params,
240	    };
241	}
242	
243	/**
244	 * Map of accepted key casings → canonical lowercase key.
245	 * Backend may use uppercase; the app uses lowercase.
246	 */
247	type CanonicalRouteParamKey = 'frame' | 'nodeKey' | 'action' | 'policyId';
248	
249	const SAFE_PARAM_ORDER: CanonicalRouteParamKey[] = ['frame', 'nodeKey', 'action', 'policyId'];
250	
251	const PARAM_KEY_MAP: Record<string, CanonicalRouteParamKey> = {
252	    action: 'action',
253	    nodekey: 'nodeKey',
254	    policyid: 'policyId',
255	    frame: 'frame',
256	};
257	
258	function toCanonicalParamKey(rawKey: string): CanonicalRouteParamKey | undefined {
259	    return PARAM_KEY_MAP[rawKey.toLowerCase()];
260	}
261	
262	function extractParamString(rawQueryString: string): string {
263	    const trimmed = rawQueryString.trim();
264	    if (!trimmed) return '';


========== IMG_3308.md ==========
---
photo: IMG_3308.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 246-278
orientation: 180
confidence: high
notes: Photo is a double-exposure/motion-blur blend of two adjacent scroll positions (same recurring artifact as other photos of this file), producing doubled gutter numbers. No sticky-scroll header visible this time (breadcrumb directly precedes line 246). Lines 246-260 overlap with IMG_3306/3307 (cross-verified, consistent). Line numbers for 261-278 corrected/verified against the much sharper IMG_3309 (no ghosting there), which shows this exact same function unambiguously. Explorer sidebar (utils folder) unchanged: api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts (highlighted), build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa... (truncated), button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts. Tab bar: only "asp-route-mapper.ts" open. Breadcrumb: aqs-web-ui > src > utils > asp-route-mapper.ts. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
246	 */
247	type CanonicalRouteParamKey = 'frame' | 'nodeKey' | 'action' | 'policyId';
248	
249	const SAFE_PARAM_ORDER: CanonicalRouteParamKey[] = ['frame', 'nodeKey', 'action', 'policyId'];
250	
251	const PARAM_KEY_MAP: Record<string, CanonicalRouteParamKey> = {
252	    action: 'action',
253	    nodekey: 'nodeKey',
254	    policyid: 'policyId',
255	    frame: 'frame',
256	};
257	
258	function toCanonicalParamKey(rawKey: string): CanonicalRouteParamKey | undefined {
259	    return PARAM_KEY_MAP[rawKey.toLowerCase()];
260	}
261	
262	function extractParamString(rawQueryString: string): string {
263	    const trimmed = rawQueryString.trim();
264	    if (!trimmed) return '';
265	
266	    const qIndex = trimmed.indexOf('?');
267	    if (qIndex >= 0) {
268	        return trimmed.substring(qIndex + 1);
269	    }
270	
271	    return trimmed.startsWith('?') ? trimmed.substring(1) : trimmed;
272	}
273	
274	/**
275	 * Extract clean query parameters from a server queryString value.
276	 *
277	 * The cycling API can return `queryString` in multiple formats:
278	 * - Pure query: `"?A=1&B=2"` or `"A=1&B=2"`


========== IMG_3309.md ==========
---
photo: IMG_3309.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 261-294
orientation: 180
confidence: high
notes: Explorer sidebar expanded showing aqs-web-ui/src tree - providers/theme-provider.tsx; services/lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts; types/grid-response.ts (modified, "U" marker); utils/ (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts [selected/open], build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Tab bar shows only asp-route-mapper.ts open. Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Continues directly from IMG_3308 (which ended at line 278); overlapping content lines 261-278 repeat prior photo, new content extends to 294.
---
261	
262	function extractParamString(rawQueryString: string): string {
263	    const trimmed = rawQueryString.trim();
264	    if (!trimmed) return '';
265	
266	    const qIndex = trimmed.indexOf('?');
267	    if (qIndex >= 0) {
268	        return trimmed.substring(qIndex + 1);
269	    }
270	
271	    return trimmed.startsWith('?') ? trimmed.substring(1) : trimmed;
272	}
273	
274	/**
275	 * Extract clean query parameters from a server queryString value.
276	 *
277	 * The cycling API can return `queryString` in multiple formats:
278	 * - Pure query: `"?A=1&B=2"` or `"A=1&B=2"`
279	 * - Full ASP URL with params: `"../../system/asp/File.asp?A=1&B=2"`
280	 *
281	 * This helper strips the path prefix (if any) and returns only
282	 * the canonical navigation params (action, nodeKey, policyId, frame).
283	 *
284	 * @param rawQueryString - The raw `queryString` value from the cycling API response
285	 * @param frame - Optional frame value to inject (used when API supplies it separately)
286	 * @returns Canonical param record with only safe, lowercase keys
287	 *
288	 * @example
289	 * ```ts
290	 * extractCanonicalParams('../../system/asp/Main.asp?USERID=x&POLICYID=123&ACTION=MAIN&NODEKEY=POL|0|')
291	 * // → { action: 'MAIN', nodeKey: 'POL|0|', policyId: '123' }
292	 *
293	 * extractCanonicalParams('?ACTION=MAIN&NODEKEY=POL|0|')
294	 * // → { action: 'MAIN', nodeKey: 'POL|0|' }


========== IMG_3310.md ==========
---
photo: IMG_3310.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 275-307
orientation: 180
confidence: high
notes: Same file/view as IMG_3309, scrolled down slightly. Lines 275-296 repeat the JSDoc block seen in IMG_3309 (275-294) plus closing ``` and */ at 295-296. New code starts at 297: export function extractCanonicalParams signature and body through line 307. Explorer sidebar same as prior photo (asp-route-mapper.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
275	 * Extract clean query parameters from a server queryString value.
276	 *
277	 * The cycling API can return `queryString` in multiple formats:
278	 * - Pure query: `"?A=1&B=2"` or `"A=1&B=2"`
279	 * - Full ASP URL with params: `"../../system/asp/File.asp?A=1&B=2"`
280	 *
281	 * This helper strips the path prefix (if any) and returns only
282	 * the canonical navigation params (action, nodeKey, policyId, frame).
283	 *
284	 * @param rawQueryString - The raw `queryString` value from the cycling API response
285	 * @param frame - Optional frame value to inject (used when API supplies it separately)
286	 * @returns Canonical param record with only safe, lowercase keys
287	 *
288	 * @example
289	 * ```ts
290	 * extractCanonicalParams('../../system/asp/Main.asp?USERID=x&POLICYID=123&ACTION=MAIN&NODEKEY=POL|0|')
291	 * // → { action: 'MAIN', nodeKey: 'POL|0|', policyId: '123' }
292	 *
293	 * extractCanonicalParams('?ACTION=MAIN&NODEKEY=POL|0|')
294	 * // → { action: 'MAIN', nodeKey: 'POL|0|' }
295	 * ```
296	 */
297	export function extractCanonicalParams(
298	    rawQueryString: string | undefined | null,
299	    frame?: string | null,
300	): Record<string, string> {
301	    const result: Record<string, string> = {};
302	
303	    if (rawQueryString && rawQueryString.trim() !== '') {
304	        const paramString = extractParamString(rawQueryString);
305	
306	        try {
307	            const searchParams = new URLSearchParams(paramString);


========== IMG_3311.md ==========
---
photo: IMG_3311.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 285-318
orientation: 180
confidence: medium
notes: MOTION BLUR / DOUBLE EXPOSURE - the photo was taken while VS Code was mid smooth-scroll, so it shows two overlapping scroll positions offset by ~3 lines superimposed (ghosting visible on every line and in the gutter numbers, e.g. gutter shows overlapping "302/305", "303/306" etc. through to "315/318"). Lines 285-307 are a duplicate/overlap of content already captured sharply in IMG_3310 and were cross-verified against that transcript (high confidence for that portion). Lines 308-318 are NEW content not seen in prior photos, reconstructed from the blurred/superimposed text by isolating the two interleaved ghost layers (medium confidence - logically coherent and legible but exact line-to-text mapping relies on reconstruction, not a single clean frame). Explorer sidebar unchanged from IMG_3309/3310 (asp-route-mapper.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
285	 * @param frame - Optional frame value to inject (used when API supplies it separately)
286	 * @returns Canonical param record with only safe, lowercase keys
287	 *
288	 * @example
289	 * ```ts
290	 * extractCanonicalParams('../../system/asp/Main.asp?USERID=x&POLICYID=123&ACTION=MAIN&NODEKEY=POL|0|')
291	 * // → { action: 'MAIN', nodeKey: 'POL|0|', policyId: '123' }
292	 *
293	 * extractCanonicalParams('?ACTION=MAIN&NODEKEY=POL|0|')
294	 * // → { action: 'MAIN', nodeKey: 'POL|0|' }
295	 * ```
296	 */
297	export function extractCanonicalParams(
298	    rawQueryString: string | undefined | null,
299	    frame?: string | null,
300	): Record<string, string> {
301	    const result: Record<string, string> = {};
302	
303	    if (rawQueryString && rawQueryString.trim() !== '') {
304	        const paramString = extractParamString(rawQueryString);
305	
306	        try {
307	            const searchParams = new URLSearchParams(paramString);
308	            searchParams.forEach((value, key) => {
309	                const canonicalKey = toCanonicalParamKey(key);
310	                if (canonicalKey && value) {
311	                    let finalValue = value;
312	
313	                    // CRITICAL: Strip button code from action parameter for legacy URL compatibility
314	                    // Legacy VBScript URLs show base action only (e.g., "RATELEVEL" not "RATELEVEL|NEXT")
315	                    // Server may echo back compound actions (e.g., "STARTOPTIONS|OK"), but URLs should show
316	                    // This matches parseQueryStringParams() behavior for consistency
317	                    if (canonicalKey === 'action' && value.includes('|')) {
318	                        const [baseAction] = value.split('|');


========== IMG_3312.md ==========
---
photo: IMG_3312.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 297-328
orientation: 180
confidence: low
notes: MOTION BLUR / DOUBLE EXPOSURE throughout (same smooth-scroll artifact as IMG_3311, screen was mid-scroll when the photo was taken). Lines 297-318 duplicate content already transcribed cleanly in IMG_3310/IMG_3311 (high confidence, repeated here only for context). Lines 319-328 are new; reconstructed by cross-referencing the increasing max-line-number pattern across consecutive photos in this sequence (IMG_3309 max 294, IMG_3310 max 307, IMG_3311 max 318, this photo max ~328 - a consistent +10 to +13 line advance per photo) and by verifying TypeScript brace balance (the reconstructed try/catch closes cleanly and line 328's closing brace sits at minimal indentation, matching the outer `if (rawQueryString...)` block visible at the far left margin in the photo). A second, fainter overlapping ghost layer in the lower portion of the image contains additional text fragments that could not be reliably placed (possibly bleed from anticipated further-scrolled content); these are NOT included below since their line placement could not be confirmed - expect the next photo(s) to clarify what follows line 328. Explorer sidebar unchanged (asp-route-mapper.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
297	export function extractCanonicalParams(
298	    rawQueryString: string | undefined | null,
299	    frame?: string | null,
300	): Record<string, string> {
301	    const result: Record<string, string> = {};
302	
303	    if (rawQueryString && rawQueryString.trim() !== '') {
304	        const paramString = extractParamString(rawQueryString);
305	
306	        try {
307	            const searchParams = new URLSearchParams(paramString);
308	            searchParams.forEach((value, key) => {
309	                const canonicalKey = toCanonicalParamKey(key);
310	                if (canonicalKey && value) {
311	                    let finalValue = value;
312	
313	                    // CRITICAL: Strip button code from action parameter for legacy URL compatibility
314	                    // Legacy VBScript URLs show base action only (e.g., "RATELEVEL" not "RATELEVEL|NEXT")
315	                    // Server may echo back compound actions (e.g., "STARTOPTIONS|OK"), but URLs should show
316	                    // This matches parseQueryStringParams() behavior for consistency
317	                    if (canonicalKey === 'action' && value.includes('|')) {
318	                        const [baseAction] = value.split('|');
319	                        finalValue = baseAction;
320	                    }
321	
322	                    result[canonicalKey] = finalValue;
323	                }
324	            });
325	        } catch {
326	            // Malformed query string — return empty
327	        }
328	    }


========== IMG_3313.md ==========
---
photo: IMG_3313.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 297-341
orientation: 180
confidence: high
notes: Sharp/clean single frame (no motion blur, unlike IMG_3311/IMG_3312). Sticky-scroll headers at top show enclosing scope lines 297 ("export function extractCanonicalParams(") and 308 ("searchParams.forEach((value, key) => {") - these repeat real line numbers from earlier in the function, real editor content resumes at 311. This confirms the reconstructed content from IMG_3312 (lines 319-328, the try/catch closing block) was transcribed correctly verbatim. New content beyond IMG_3312: lines 329-341, including the "Inject frame if supplied and not already present" block, closing "return result; }" of extractCanonicalParams, and the start of a new JSDoc block for a "Build React route URL from ASP components" function (cut off at line 341/342, partially visible "Only includes known safe parameters..." at very bottom edge, mostly occluded by status bar). Explorer sidebar unchanged (asp-route-mapper.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
297	export function extractCanonicalParams(
308	    searchParams.forEach((value, key) => {
311	                    let finalValue = value;
312	
313	                    // CRITICAL: Strip button code from action parameter for legacy URL compatibility
314	                    // Legacy VBScript URLs show base action only (e.g., "RATELEVEL" not "RATELEVEL|NEXT")
315	                    // Server may echo back compound actions (e.g., "STARTOPTIONS|OK"), but URLs should show
316	                    // This matches parseQueryStringParams() behavior for consistency
317	                    if (canonicalKey === 'action' && value.includes('|')) {
318	                        const [baseAction] = value.split('|');
319	                        finalValue = baseAction;
320	                    }
321	
322	                    result[canonicalKey] = finalValue;
323	                }
324	            });
325	        } catch {
326	            // Malformed query string — return empty
327	        }
328	    }
329	
330	    // Inject frame if supplied and not already present
331	    if (frame && !result['frame']) {
332	        result['frame'] = frame.toLowerCase();
333	    }
334	
335	    return result;
336	}
337	
338	/**
339	 * Build React route URL from ASP components
340	 *
341	 * Converts ASP filename and canonical query params to a React route URL.


========== IMG_3314.md ==========
---
photo: IMG_3314.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 297-352
orientation: 180
confidence: high
notes: Sharp/clean single frame. Sticky-scroll headers at top show lines 297 ("export function extractCanonicalParams(") and 308 ("searchParams.forEach((value, key) => {"), real editor content resumes at 322. Confirms IMG_3313 content (322-336) exactly. New content beyond IMG_3313: JSDoc block for buildReactRouteUrl starting at 338, continuing through @param/@returns/@example tags to line 352. Line 351 ("* buildReactRouteUrl('Main_ISLLSYS_20010101.asp', 'newwindow', { nodeKey: '123', action: 'MAIN' })") and line 352 ("* // → '/Main_ISLLSYS_20010101?action=MAIN&nodeKey=123&frame=newwindow'") are partially occluded by the horizontal scrollbar / status bar at the very bottom edge of the visible editor area but legible. Explorer sidebar unchanged (asp-route-mapper.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
297	export function extractCanonicalParams(
308	    searchParams.forEach((value, key) => {
322	                    result[canonicalKey] = finalValue;
323	                }
324	            });
325	        } catch {
326	            // Malformed query string — return empty
327	        }
328	    }
329	
330	    // Inject frame if supplied and not already present
331	    if (frame && !result['frame']) {
332	        result['frame'] = frame.toLowerCase();
333	    }
334	
335	    return result;
336	}
337	
338	/**
339	 * Build React route URL from ASP components
340	 *
341	 * Converts ASP filename and canonical query params to a React route URL.
342	 * Only includes known safe parameters (action, nodeKey, policyId, frame).
343	 *
344	 * @param aspFile - ASP filename
345	 * @param frame - Frame type (e.g., 'MAIN', 'MODAL') to include as query param
346	 * @param queryParams - Query parameters (accepts any casing; mapped to canonical keys)
347	 * @returns React route URL
348	 *
349	 * @example
350	 * ```tsx
351	 * buildReactRouteUrl('Main_ISLLSYS_20010101.asp', 'newwindow', { nodeKey: '123', action: 'MAIN' })
352	 * // → '/Main_ISLLSYS_20010101?action=MAIN&nodeKey=123&frame=newwindow'


========== IMG_3315.md ==========
---
photo: IMG_3315.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 343-376
orientation: 180
confidence: medium
notes: Mostly sharp with mild motion-blur ghosting (offset ~1-2 lines) that intensifies toward the bottom of the visible editor area, worst right at the horizontal scrollbar which partially occludes lines 374-376. Continues directly from IMG_3314 (which ended at line 352); lines 343-352 repeat that photo's content (JSDoc for buildReactRouteUrl) and are included here only for context/overlap confirmation. New content: rest of the JSDoc (353-354), the buildReactRouteUrl function signature and body through line 373 (all clearly legible, high confidence). Lines 374-376: a blank line is assumed at 374 (standard code style before a new statement); "let stringValue = String(value);" is clearly legible but its exact line number (375 vs 376) could not be pinned down with certainty because that row sits directly behind/under the horizontal scrollbar overlay in the photo - transcribed here as 376 based on closest gutter-label alignment, but could be 375. Explorer sidebar unchanged (asp-route-mapper.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
343	 *
344	 * @param aspFile - ASP filename
345	 * @param frame - Frame type (e.g., 'MAIN', 'MODAL') to include as query param
346	 * @param queryParams - Query parameters (accepts any casing; mapped to canonical keys)
347	 * @returns React route URL
348	 *
349	 * @example
350	 * ```tsx
351	 * buildReactRouteUrl('Main_ISLLSYS_20010101.asp', 'newwindow', { nodeKey: '123', action: 'MAIN' })
352	 * // → '/Main_ISLLSYS_20010101?action=MAIN&nodeKey=123&frame=newwindow'
353	 * ```
354	 */
355	export function buildReactRouteUrl(
356	    aspFile: string,
357	    frame: string | undefined,
358	    queryParams?: Record<string, string | number>,
359	): string {
360	    const basePath = aspToReactRoute(aspFile);
361	    const canonicalParams: Partial<Record<CanonicalRouteParamKey, string>> = {};
362	
363	    if (queryParams) {
364	        const queryStringValue =
365	            queryParams['queryString'] ?? queryParams['QUERYSTRING'] ?? queryParams['QueryString'];
366	
367	        if (typeof queryStringValue === 'string' && queryStringValue.trim() !== '') {
368	            const extracted = extractCanonicalParams(queryStringValue);
369	            Object.assign(canonicalParams, extracted);
370	        }
371	        Object.entries(queryParams).forEach(([key, value]) => {
372	            const canonicalKey = toCanonicalParamKey(key);
373	            if (!canonicalKey || value == null) return;
374	
375	
376	            let stringValue = String(value);


========== IMG_3316.md ==========
---
photo: IMG_3316.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 351-384
orientation: 180
confidence: low
notes: Photo has severe double-exposure/motion-blur ghosting throughout the code pane (appears to be two overlapping exposures of the same viewport offset by ~2-3 lines vertically), making exact line-by-line mapping unreliable in places, especially lines 353-354, 362-372 and 385-386. Cross-referenced against IMG_3317 (same file, overlapping/adjacent scroll position, clearer sticky-scroll header confirming "export function buildReactRouteUrl(" = line 355) to correct line numbering here. Transcription below is best-effort reconstruction using the dominant/crisp text layer plus cross-referencing duplicate ghost text and IMG_3317; treat lines 353-354 and 362-372 as low confidence. Tab bar: "asp-route-mapper.ts" (only tab visible). Breadcrumb: aqs-web-ui > src > utils > asp-route-mapper.ts. Explorer sidebar (utils folder expanded, asp-route-mapper.ts highlighted) shows: api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payload....ts, button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts; also services folder: lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts; types folder: grid-response.ts; providers folder: theme-provider.tsx. Outline panel (right side, for asp-route-mapper.ts) lists a set of ts file names that mirror the Explorer tree, itself affected by the same double-exposure ghosting — read with caution. Status bar: git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:16 PM 7/10/2026.
---
351: * buildReactRouteUrl('Main_ISLLSYS_20010101.asp', 'newwindow', { nodeKey: '123', action: 'MAIN' })
352: * // -> '/Main_ISLLSYS_20010101?action=MAIN&nodeKey=123&frame=newwindow'
353: ⟪?⟫ (likely closing "*/" of JSDoc block, illegible)
354: ⟪?⟫ (illegible — heavy blur)
355: export function buildReactRouteUrl(
356: aspFile: string,
357: frame: string | undefined,
358: queryParams?: Record<string, string | number>,
359: ): string {
360: const basePath = aspToReactRoute(aspFile);
361: const canonicalParams: Partial<Record<CanonicalRouteParamKey, string>> = {};
362: const queryStringValue =
363: if (queryParams) { ⟪uncertain — order/content of 362-365 conflicts with ghost text, see IMG_3317 notes⟫
364: const queryStringValue =
365: queryParams['QUERYSTRING'] ?? queryParams['QueryString'];
366: if (typeof queryStringValue === 'string' && queryStringValue.trim() !== '') {
367: const extracted = extractCanonicalParams(queryStringValue);
368: Object.assign(canonicalParams, extracted);
369: } ⟪uncertain⟫
370: } ⟪uncertain — closes outer if (queryParams) block⟫
371: ⟪?⟫ (illegible)
372: Object.entries(queryParams).forEach(([key, value]) => {
373: const canonicalKey = toCanonicalParamKey(key);
374: if (!canonicalKey || value == null) return;
375: let stringValue = String(value);
376: if (stringValue === '') return; ⟪uncertain exact condition⟫
377: ⟪?⟫
378: // CRITICAL: strip button code from action parameters for legacy URL compatibility
379: // This handles cases where action is passed directly in queryParams (not in queryString)
380: if (canonicalKey === 'action' && stringValue.includes('|')) {
381: const [baseAction] = stringValue.split('|');
382: stringValue = baseAction;
383: }
384: canonicalParams[canonicalKey] = stringValue;


========== IMG_3317.md ==========
---
photo: IMG_3317.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 355-391
orientation: 180
confidence: low
notes: Same file/function as IMG_3316 (buildReactRouteUrl), scrolled slightly further down; sticky-scroll header pins line 355 "export function buildReactRouteUrl(" at the top of the editor (below the tab/breadcrumb bar), confirming/correcting the numbering used in IMG_3316. Photo again shows severe double-exposure/motion-blur ghosting with an apparent ~3-line vertical offset between two overlapping exposures of the same viewport, so several blocks appear to repeat (e.g. lines 387-389 "if (frame && !canonicalParams.frame) { canonicalParams.frame = frame.toLowerCase(); }" appears to repeat at 390-391 — likely a ghost artifact rather than genuine duplicate code, but could not be fully resolved). Gutter numbers 369-371 fall in a heavily blurred/illegible band. Tab bar: "asp-route-mapper.ts" only tab. Breadcrumb: aqs-web-ui > src > utils > asp-route-mapper.ts. Explorer sidebar (utils expanded, asp-route-mapper.ts highlighted) same file list as IMG_3316: api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payload....ts, button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts. Status bar: git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:16 PM 7/10/2026 (same moment as IMG_3316).
---
355: export function buildReactRouteUrl( [sticky-scroll pinned header line]
360: const basePath = aspToReactRoute(aspFile);
361: const canonicalParams: Partial<Record<CanonicalRouteParamKey, string>> = {};
362: const queryStringValue =
363: queryParams['QUERYSTRING'] ?? queryParams['QueryString']; ⟪uncertain — ghost text nearby also suggests "if (queryParams) {" and a repeated queryStringValue assignment overlapping this region; exact split across 362-365 not fully resolved⟫
364: ⟪?⟫ possibly duplicate/ghost of 362
365: ⟪?⟫ possibly duplicate/ghost of 363
366: if (typeof queryStringValue === 'string' && queryStringValue.trim() !== '') {
367: const extracted = extractCanonicalParams(queryStringValue);
368: Object.assign(canonicalParams, extracted);
369: ⟪?⟫ (illegible — heavy blur)
370: ⟪?⟫ (illegible — heavy blur)
371: ⟪?⟫ (illegible — heavy blur)
372: Object.entries(queryParams).forEach(([key, value]) => {
373: const canonicalKey = toCanonicalParamKey(key);
374: if (!canonicalKey || value == null) return;
375: let stringValue = String(value);
376: if (stringValue === '') return; ⟪uncertain exact condition⟫
377: ⟪?⟫
378: // CRITICAL: strip button code from action parameters for legacy URL compatibility
379: // This handles cases where action is passed directly in queryParams (not in queryString)
380: if (canonicalKey === 'action' && stringValue.includes('|')) {
381: const [baseAction] = stringValue.split('|');
382: stringValue = baseAction;
383: }
384: canonicalParams[canonicalKey] = stringValue;
385: });
386: }
387: if (frame && !canonicalParams.frame) {
388: canonicalParams.frame = frame.toLowerCase();
389: }
390: if (frame && !canonicalParams.frame) { ⟪uncertain — likely ghost repeat of 387⟫
391: canonicalParams.frame = frame.toLowerCase(); ⟪uncertain — likely ghost repeat of 388⟫


========== IMG_3318.md ==========
---
photo: IMG_3318.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 355-399
orientation: 180
confidence: medium
notes: >
  SEVERE MOTION BLUR / DOUBLE-EXPOSURE: the phone appears to have captured the
  editor mid-scroll-animation, so almost every code line is overlaid with a
  faint "ghost" of a nearby line (offset by roughly 1-3 gutter numbers,
  shifted a few px up/right). Gutter numbers 355, 368, 369, 370 near the top
  are sharp/unambiguous. Lines 385-399 below were CORRECTED using the sharp,
  non-blurred sticky-scroll photo IMG_3319 (same file, adjacent scroll
  position, confirms exact line numbers 385-415). Lines ~372-384 (the
  canonicalKey extraction / CRITICAL comment / action-split block) are NOT
  visible in IMG_3319 and remain a best-effort reconstruction from this
  blurred photo alone — treat those specific line numbers as approximate
  (content/order should still be correct). Function is
  buildReactRouteUrl in asp-route-mapper.ts. Explorer sidebar (from earlier
  unrotated read) shows aqs-web-ui/src tree: providers/theme-provider.tsx,
  services/ (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts,
  xml-server-call.ts), types/grid-response.ts, utils/ (api-cache.ts,
  apply-server-commands.ts, asp-route-mapper.ts [active/highlighted],
  build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa...,
  button-state-manager.ts, check-action-permission.ts, command-handlers.ts,
  common.ts, control-metadata-extractor.ts, create-store.tsx,
  detect-modal-type.ts). Tab bar shows only asp-route-mapper.ts open (single
  tab, unsaved dot). Status bar: workspace AQS_workspace, branch
  hitanshu/experimental*, "No Solution", 2 errors / 0 warnings, TypeScript,
  UTF-8, CRLF, Tab Size 4, Ln 1 Col 1 (cursor not in this function).
  Date/time overlay 7/10/2026 6:16 PM.
---
355:    export function buildReactRouteUrl(
⟪... lines 356-367 not visible (scrolled out of view above) ...⟫
368:        const extracted = extractCanonicalParams(queryStringValue);
369:        Object.assign(canonicalParams, extracted);
370:    }
371:    ⟪?⟫ (blurred; appears to be start of a forEach over queryParams, see below)
372:        Object.entries(queryParams).forEach(([key, value]) => {
373:            const canonicalKey = toCanonicalParamKey(key);
374:            if (!canonicalKey || value == null) return;
375:            let stringValue = String(value);
376:            if (stringValue === '') return;
377:
378:            // CRITICAL: Strip button code from action parameters for legacy URL compatibility
379:            // This handles cases where action is passed directly in queryParams (not in queryString)
380:            if (canonicalKey === 'action' && stringValue.includes('|')) {
381:                const [baseAction] = stringValue.split('|');
382:                stringValue = baseAction;
383:            }
384:
385:            canonicalParams[canonicalKey] = stringValue;
386:        });
387:    }
388:
389:
390:    if (frame && !canonicalParams.frame) {
391:        canonicalParams.frame = frame.toLowerCase();
392:    }
393:
394:    const params = new URLSearchParams();
395:    SAFE_PARAM_ORDER.forEach((key) => {
396:        const value = canonicalParams[key];
397:        if (value) {
398:            params.set(key, value);
399:        }
⟪continues to 400: });⟫ — see IMG_3319 for confirmed continuation (400-415)


========== IMG_3319.md ==========
---
photo: IMG_3319.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 355-415
orientation: 180
confidence: high
notes: >
  Sharp/clear photo (no motion blur, unlike IMG_3318 of the same file). VS
  Code sticky-scroll shows two pinned header lines at the very top of the
  editor (355 and 372) — these repeat enclosing scope lines, not literal
  adjacent content; the real visible body resumes at line 385. Explorer
  sidebar tree matches IMG_3318 (providers/theme-provider.tsx, services/
  {lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts,
  xml-server-call.ts}, types/grid-response.ts, utils/ {api-cache.ts,
  apply-server-commands.ts, asp-route-mapper.ts [highlighted/active],
  build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa...,
  button-state-manager.ts, check-action-permission.ts, command-handlers.ts,
  common.ts, control-metadata-extractor.ts, create-store.tsx,
  detect-modal-type.ts}). Single tab open: asp-route-mapper.ts (unsaved dot).
  Status bar: AQS_workspace, branch hitanshu/experimental*, "No Solution",
  2 errors / 0 warnings, TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1.
  Date/time overlay 7/10/2026 6:16 PM. New JSDoc block begins at line 405 for
  a function extracting ASP filename from a cycling API response URL
  (function name not yet visible — cut off at line 415 inside the @example
  code fence).
---
355:    export function buildReactRouteUrl(
    ⟪sticky-scroll header — enclosing line, not contiguous with 372⟫
372:        Object.entries(queryParams).forEach(([key, value]) => {
    ⟪sticky-scroll header — enclosing line, not contiguous with 385⟫
385:            canonicalParams[canonicalKey] = stringValue;
386:        });
387:    }
388:
389:
390:    if (frame && !canonicalParams.frame) {
391:        canonicalParams.frame = frame.toLowerCase();
392:    }
393:
394:    const params = new URLSearchParams();
395:    SAFE_PARAM_ORDER.forEach((key) => {
396:        const value = canonicalParams[key];
397:        if (value) {
398:            params.set(key, value);
399:        }
400:    });
401:
402:    const qs = params.toString();
403:    return qs ? `${basePath}?${qs}` : basePath;
404: }
405:
406: /**
407:  * Extract ASP filename from cycling API response URL
408:  *
409:  * Handles various URL formats returned by the server.
410:  *
411:  * @param responseUrl - URL from cycling API response
412:  * @returns ASP filename
413:  *
414:  * @example
415:  * ```tsx


========== IMG_3320.md ==========
---
photo: IMG_3320.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 355-428
orientation: 180
confidence: high
notes: >
  Mostly sharp; minor scroll-blur ghosting only in the 419-425 range (a faint
  overlapping copy offset by ~3 lines) but the bold/primary text is fully
  legible and was cross-checked via zoomed crop — content and line numbers
  below are reliable. VS Code sticky-scroll pins two header lines at the top
  (355 and 395) which are not contiguous with the line below them (398).
  Continues directly from IMG_3319 (which ended at line 415 mid-@example).
  Explorer sidebar identical to IMG_3318/3319 (asp-route-mapper.ts
  highlighted/active in utils/). Single tab open: asp-route-mapper.ts
  (unsaved dot). Status bar: AQS_workspace, branch hitanshu/experimental*,
  "No Solution", 2 errors / 0 warnings, TypeScript, UTF-8, CRLF, Tab Size 4,
  Ln 1 Col 1. Date/time overlay 7/10/2026 6:16 PM. New JSDoc block starts at
  428 (cut off at bottom edge, content not visible).
---
355:    export function buildReactRouteUrl(
    ⟪sticky-scroll header — enclosing line, not contiguous with 395⟫
395:        SAFE_PARAM_ORDER.forEach((key) => {
    ⟪sticky-scroll header — enclosing line, not contiguous with 398⟫
398:            params.set(key, value);
399:        }
400:    });
401:
402:    const qs = params.toString();
403:    return qs ? `${basePath}?${qs}` : basePath;
404: }
405:
406: /**
407:  * Extract ASP filename from cycling API response URL
408:  *
409:  * Handles various URL formats returned by the server.
410:  *
411:  * @param responseUrl - URL from cycling API response
412:  * @returns ASP filename
413:  *
414:  * @example
415:  * ```tsx
416:  * extractAspFileName('../../system/asp/Main_ISLLSYS_20010101.asp')
417:  * // → 'Main_ISLLSYS_20010101.asp'
418:  *
419:  * extractAspFileName('/AQS.Advantage/Main_ISLLSYS_20010101.asp?id=123')
420:  * // → 'Main_ISLLSYS_20010101.asp'
421:  *
422:  */
423: export function extractAspFileName(responseUrl: string): string {
424:     const parsed = parseAspUrl(responseUrl);
425:     return parsed.fileName;
426: }
427:
428: /**
    ⟪cut off at bottom edge of screen⟫


========== IMG_3321.md ==========
---
photo: IMG_3321.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 417-449
orientation: 180
confidence: high
notes: >
  Mild scroll-blur ghosting throughout (faint duplicate offset ~1 line) but
  primary/bold text fully legible. No sticky-scroll header this time — content
  starts directly at line 417, continuing from IMG_3320. Explorer sidebar
  identical to prior photos in this sequence (asp-route-mapper.ts
  highlighted/active in utils/). Single tab open: asp-route-mapper.ts
  (unsaved dot). Status bar: AQS_workspace, branch hitanshu/experimental*,
  "No Solution", 2 errors / 0 warnings, TypeScript, UTF-8, CRLF, Tab Size 4,
  Ln 1 Col 1. Date/time overlay 7/10/2026 6:17 PM (one minute after
  IMG_3318-3320's 6:16 PM). Function convertCyclingUrlToReactRoute begins at
  443, cut off after its closing brace at 449.
---
417:  * // → 'Main_ISLLSYS_20010101.asp'
418:  *
419:  * extractAspFileName('/AQS.Advantage/Main_ISLLSYS_20010101.asp?id=123')
420:  * // → 'Main_ISLLSYS_20010101.asp'
421:  * ```
422:  */
423: export function extractAspFileName(responseUrl: string): string {
424:     const parsed = parseAspUrl(responseUrl);
425:     return parsed.fileName;
426: }
427:
428: /**
429:  * Convert cycling API response URL to React route
430:  *
431:  * Parses the response URL, extracts ASP filename, converts to React route.
432:  * Preserves query parameters.
433:  *
434:  * @param responseUrl - URL from cycling API
435:  * @returns React route URL
436:  *
437:  * @example
438:  * ```tsx
439:  * convertCyclingUrlToReactRoute('../../system/Main_ISLLSYS_20010101.asp?nodeKey=123')
440:  * // → '/Main_ISLLSYS_20010101?nodeKey=123'
441:  * ```
442:  */
443: export function convertCyclingUrlToReactRoute(responseUrl: string): string {
444:     const parsed = parseAspUrl(responseUrl);
445:     const reactRoute = aspToReactRoute(parsed.fileName);
446:
447:     // Append query string if present
448:     return parsed.queryString ? `${reactRoute}${parsed.queryString}` : reactRoute;
449: }


========== IMG_3322.md ==========
---
photo: IMG_3322.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 423-455
orientation: 180
confidence: medium
notes: >
  Sticky-scroll pins line 423 ("export function extractAspFileName...") at
  the very top; content below duplicates what was already transcribed
  (high confidence) in IMG_3320/IMG_3321 for lines 423-449 — reproduced here
  for completeness, cross-checked against this photo and consistent. Genuinely
  NEW content is the tail (450-455), which is significantly blurred
  (scroll-blur ghosting, partially occluded by the horizontal scrollbar
  thumb) — that block's exact line-to-text mapping is a best-effort based on
  the JSDoc style established by the two preceding functions in this file
  (description, blank, @param, @returns, closing) and should be verified
  against a later photo of the same lines if one exists. Explorer sidebar /
  status bar identical to IMG_3320/3321 (asp-route-mapper.ts active in
  utils/, branch hitanshu/experimental*, 2 errors/0 warnings, No Solution).
  Date/time overlay 7/10/2026 6:17 PM.
---
    ⟪sticky-scroll header, repeats 423⟫
423: export function extractAspFileName(responseUrl: string): string {
424:     const parsed = parseAspUrl(responseUrl);
425:     return parsed.fileName;
426: }
427:
428: /**
429:  * Convert cycling API response URL to React route
430:  *
431:  * Parses the response URL, extracts ASP filename, converts to React route.
432:  * Preserves query parameters.
433:  *
434:  * @param responseUrl - URL from cycling API
435:  * @returns React route URL
436:  *
437:  * @example
438:  * ```tsx
439:  * convertCyclingUrlToReactRoute('../../system/Main_ISLLSYS_20010101.asp?nodeKey=123')
440:  * // → '/Main_ISLLSYS_20010101?nodeKey=123'
441:  * ```
442:  */
443: export function convertCyclingUrlToReactRoute(responseUrl: string): string {
444:     const parsed = parseAspUrl(responseUrl);
445:     const reactRoute = aspToReactRoute(parsed.fileName);
446:
447:     // Append query string if present
448:     return parsed.queryString ? `${reactRoute}${parsed.queryString}` : reactRoute;
449: }
450: ⟪?⟫
451: /**
452:  * Check if URL is an ASP file
453:  *
454:  * @param url - URL to check
455:  * @returns True if URL points to ASP file
⟪continues past bottom edge — likely "*/" then "export function isAspUrl(url: string): boolean {" — see later photo for confirmation⟫


========== IMG_3323.md ==========
---
photo: IMG_3323.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 443-473
orientation: 180
confidence: high
notes: >
  Scroll-blur ghosting throughout (faint duplicate offset ~3 lines,
  consistent with IMG_3318/3322) but disentangled successfully via zoomed
  crops cross-checking bold vs ghost text — high confidence on all line
  numbers below. Lines 443-449 repeat content already transcribed in
  IMG_3321/3322 (convertCyclingUrlToReactRoute tail); reproduced for
  completeness. NEW content: isAspUrl function body (454-460) and the start
  of a new JSDoc block for a "Normalize ASP filename" function (461-473,
  cut off mid @example at the bottom edge). Note: a ghost artifact makes
  "export function isAspUrl(url: string): boolean {" appear to repeat at
  line 460 — this is scroll-blur bleed from line 457, not real duplicate
  code; line 460 is blank. Explorer sidebar / status bar identical to prior
  photos in this sequence (asp-route-mapper.ts active in utils/, branch
  hitanshu/experimental*, 2 errors/0 warnings, No Solution). Date/time
  overlay 7/10/2026 6:17 PM.
---
443: export function convertCyclingUrlToReactRoute(responseUrl: string): string {
444:     const parsed = parseAspUrl(responseUrl);
445:     const reactRoute = aspToReactRoute(parsed.fileName);
446:
447:     // Append query string if present
448:     return parsed.queryString ? `${reactRoute}${parsed.queryString}` : reactRoute;
449: }
450:
451: /**
452:  * Check if URL is an ASP file
453:  *
454:  * @param url - URL to check
455:  * @returns True if URL points to ASP file
456:  */
457: export function isAspUrl(url: string): boolean {
458:     return /\.aspx?(\?|$)/i.test(url);
459: }
460:
461: /**
462:  * Normalize ASP filename
463:  *
464:  * Ensures consistent format:
465:  * - Removes path
466:  * - Keeps .asp extension
467:  * - Removes query string
468:  *
469:  * @param aspFile - ASP filename or URL
470:  * @returns Normalized filename
471:  *
472:  * @example
473:  * ```tsx
    ⟪cut off at bottom edge of screen⟫


========== IMG_3324.md ==========
---
photo: IMG_3324.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 459-491
orientation: 180
confidence: high
notes: >
  Sharp, no motion blur. Confirms/extends the normalizeAspFileName JSDoc
  block started in IMG_3323 (461-473) and shows its full body (480-491+).
  Explorer sidebar identical to prior photos in this sequence
  (asp-route-mapper.ts active in utils/). Single tab open: asp-route-mapper.ts
  (unsaved dot). Status bar: AQS_workspace, branch hitanshu/experimental*,
  "No Solution", 2 errors / 0 warnings, TypeScript, UTF-8, CRLF, Tab Size 4,
  Ln 1 Col 1. Date/time overlay 7/10/2026 6:17 PM. Function body cut off
  after "return fileName;" at bottom edge (closing brace not visible).
---
459: }
460:
461: /**
462:  * Normalize ASP filename
463:  *
464:  * Ensures consistent format:
465:  * - Removes path
466:  * - Keeps .asp extension
467:  * - Removes query string
468:  *
469:  * @param aspFile - ASP filename or URL
470:  * @returns Normalized filename
471:  *
472:  * @example
473:  * ```tsx
474:  * normalizeAspFileName('../../system/Main_ISLLSYS_20010101.asp?id=123')
475:  * // → 'Main_ISLLSYS_20010101.asp'
476:  *
477:  * normalizeAspFileName('Main_ISLLSYS_20010101')
478:  * // → 'Main_ISLLSYS_20010101.asp'
479:  * ```
480:  */
481: export function normalizeAspFileName(aspFile: string): string {
482:     // Extract filename from URL
483:     const parsed = parseAspUrl(aspFile);
484:     let fileName = parsed.fileName;
485:
486:     // Add .asp extension if missing
487:     if (!/\.aspx?$/i.test(fileName)) {
488:         fileName = `${fileName}.asp`;
489:     }
490:
491:     return fileName;
    ⟪cut off at bottom edge — closing brace not visible⟫


========== IMG_3325.md ==========
---
photo: IMG_3325.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 467-499
orientation: 180
confidence: high
notes: >
  Scroll-blur ghosting throughout (faint duplicate offset ~1-3 lines,
  consistent with other photos in this sequence) but disentangled via zoomed
  crop for the new tail content (492-499); high confidence there. Lines
  467-491 repeat content already transcribed at high confidence in IMG_3324
  (normalizeAspFileName JSDoc + body) — reproduced for completeness, content
  consistent between the two photos. NEW content: closing brace of
  normalizeAspFileName (492) and a new JSDoc + function signature for
  getCustomAspRoutes (494-499), cut off right after the opening brace at the
  bottom edge (function body not visible — a fragment "Object.keys(ASP_ROUTE_MAP)"
  is faintly visible bleeding through from line 500 but not confidently
  placed). Explorer sidebar / status bar identical to prior photos in this
  sequence (asp-route-mapper.ts active in utils/, branch
  hitanshu/experimental*, 2 errors/0 warnings, No Solution). Date/time
  overlay 7/10/2026 6:17 PM.
---
467:  * - Removes query string
468:  *
469:  * @param aspFile - ASP filename or URL
470:  * @returns Normalized filename
471:  *
472:  * @example
473:  * ```tsx
474:  * normalizeAspFileName('../../system/Main_ISLLSYS_20010101.asp?id=123')
475:  * // → 'Main_ISLLSYS_20010101.asp'
476:  *
477:  * normalizeAspFileName('Main_ISLLSYS_20010101')
478:  * // → 'Main_ISLLSYS_20010101.asp'
479:  * ```
480:  */
481: export function normalizeAspFileName(aspFile: string): string {
482:     // Extract filename from URL
483:     const parsed = parseAspUrl(aspFile);
484:     let fileName = parsed.fileName;
485:
486:     // Add .asp extension if missing
487:     if (!/\.aspx?$/i.test(fileName)) {
488:         fileName = `${fileName}.asp`;
489:     }
490:
491:     return fileName;
492: }
493:
494: /**
495:  * Get all ASP routes from map
496:  *
497:  * @returns Array of ASP filenames with custom mappings
498:  */
499: export function getCustomAspRoutes(): string[] {
    ⟪cut off at bottom edge — faint fragment "Object.keys(ASP_ROUTE_MAP)" visible but not confidently placed on a line number⟫


========== IMG_3326.md ==========
---
photo: IMG_3326.JPG
type: vscode-code
file: aqs-web-ui/src/utils/asp-route-mapper.ts
lines: 481-511
orientation: 180
confidence: high
notes: >
  Sticky-scroll pins line 481 ("export function normalizeAspFileName...") at
  the top. Scroll-blur ghosting throughout the body but disentangled via
  zoomed crops; high confidence. Lines 489-500 repeat/confirm content already
  transcribed in IMG_3324/3325 (normalizeAspFileName tail, getCustomAspRoutes
  body). NEW content: getCustomAspRoutes body (500) and a full new function
  getCustomReactRoutes (503-510), which closes the file's visible section at
  line 511 (blank/EOF-adjacent). Identifier is "ASP_Route_Map" (mixed case,
  colored as a type/const reference) — confirmed via zoomed crop, used
  consistently in both getCustomAspRoutes (Object.keys) and
  getCustomReactRoutes (Object.values). Explorer sidebar / status bar
  identical to prior photos in this sequence (asp-route-mapper.ts active in
  utils/, branch hitanshu/experimental*, 2 errors/0 warnings, No Solution).
  Date/time overlay 7/10/2026 6:17 PM.
---
481:    export function normalizeAspFileName(aspFile: string): string {
    ⟪sticky-scroll header — enclosing line, not contiguous with content below;
    lines 486-491 repeat IMG_3324's already-confirmed reading:
    486  // Add .asp extension if missing
    487  if (!/\.aspx?$/i.test(fileName)) {
    488      fileName = `${fileName}.asp`;
    489  }
    490
    491  return fileName;⟫
492: }
493:
494: /**
495:  * Get all ASP routes from map
496:  *
497:  * @returns Array of ASP filenames with custom mappings
498:  */
499: export function getCustomAspRoutes(): string[] {
500:     return Object.keys(ASP_Route_Map);
501: }
502:
503: /**
504:  * Get all React routes from map
505:  *
506:  * @returns Array of React route paths
507:  */
508: export function getCustomReactRoutes(): string[] {
509:     return Object.values(ASP_Route_Map).map((name) => `/${name}`);
510: }
511:
