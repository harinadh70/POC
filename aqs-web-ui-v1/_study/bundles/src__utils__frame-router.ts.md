# BUNDLE for src/utils/frame-router.ts
# 35 photo fragment(s), ascending start-line order.


========== IMG_3709.md ==========
---
photo: IMG_3709.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 1-27
orientation: 180
confidence: high
notes: Clear/sharp photo, no motion blur. frame-router.ts is the newly active/highlighted tab in Explorer sidebar (utils folder), replacing form.ts from prior photo. Sidebar file list unchanged otherwise: apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractors.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts (active). Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*. Line 27 cut off at very bottom of frame (only partially visible, appears blank/empty).
---
1   /**
2    * @file frame-router.ts
3    * @description Frame-based routing utility for ExecuteAction pattern
4    *
5    * Maps legacy frame types (MODAL, NEWWINDOW, MAIN, HIDDEN, LOB) to React Router actions.
6    * This replicates the frame-based routing logic from legacy ExecuteAction.
7    *
8    * @example
9    * ```tsx
10   * // In dataStrategy:
11   * const action = routeByFrame({
12   *   frame: 'MODAL',
13   *   url: '/policy-details',
14   *   width: '800',
15   *   height: '600',
16   *   queryString: '?policyId=123',
17   * });
18   *
19   * if (action.type === 'redirect') {
20   *   return redirect(action.url);
21   * }
22   * ```
23   */
24
25  import { isSameRoute } from '@utils/url-helpers';
26  import { createFeatureLogger } from '@utils/logger-builder';
27  ⟪?⟫ (cut off at bottom of frame)


========== IMG_3710.md ==========
---
photo: IMG_3710.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 1-27
orientation: 180
confidence: high
notes: DUPLICATE/retake of IMG_3709 — identical scroll position, identical visible content (lines 1-27 of frame-router.ts, JSDoc header + first two imports). Clear/sharp photo, no motion blur. frame-router.ts active tab in Explorer sidebar (utils folder). Sidebar file list same as IMG_3709. Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*. Line 27 cut off at very bottom of frame.
---
1   /**
2    * @file frame-router.ts
3    * @description Frame-based routing utility for ExecuteAction pattern
4    *
5    * Maps legacy frame types (MODAL, NEWWINDOW, MAIN, HIDDEN, LOB) to React Router actions.
6    * This replicates the frame-based routing logic from legacy ExecuteAction.
7    *
8    * @example
9    * ```tsx
10   * // In dataStrategy:
11   * const action = routeByFrame({
12   *   frame: 'MODAL',
13   *   url: '/policy-details',
14   *   width: '800',
15   *   height: '600',
16   *   queryString: '?policyId=123',
17   * });
18   *
19   * if (action.type === 'redirect') {
20   *   return redirect(action.url);
21   * }
22   * ```
23   */
24
25  import { isSameRoute } from '@utils/url-helpers';
26  import { createFeatureLogger } from '@utils/logger-builder';
27  ⟪?⟫ (cut off at bottom of frame)


========== IMG_3711.md ==========
---
photo: IMG_3711.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 14-40
orientation: 180
confidence: high
notes: Mostly clear/sharp photo; light double-exposure ghosting around lines 27-37 (resolved via two zoomed crops, content confirmed legible/unambiguous — line 33 "// ----" is a plain section-divider comment, separate from the JSDoc block at 35-37). frame-router.ts active tab in Explorer sidebar (utils folder), same file list as IMG_3709/3710. Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*. Bottom of frame cuts off after line 40 (a third union member, likely "newwindow", partially visible but illegible).
---
14      *   width: '800',
15      *   height: '600',
16      *   queryString: '?policyId=123',
17      * });
18      *
19      * if (action.type === 'redirect') {
20      *   return redirect(action.url);
21      * }
22      * ```
23      */
24
25  import { isSameRoute } from '@utils/url-helpers';
26  import { createFeatureLogger } from '@utils/logger-builder';
27  import type { FrameType } from '@/types';
28
29  // Create logger for frame routing
30  const logger = createFeatureLogger('routing', 'frame-router');
31
32
33  // ------------------------------------
34
35  /**
36   * Frame routing action types
37   */
38  export type FrameActionType =
39      | 'redirect'   // Navigate to a new route
40      | 'modal'      // Open as modal dialog

    [Line 40's continuation confirmed via IMG_3712, a clear follow-up photo of the same file/scroll region: 41 | 'newwindow' // Open in new browser window, 42 | 'hidden' // Execute commands only, no navigation, 43 | 'continue' // Continue to loaders normally, 44 | 'inline'; // Render inline (same page). See IMG_3712.md for the authoritative transcript of lines 30-56.]


========== IMG_3712.md ==========
---
photo: IMG_3712.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 30-56
orientation: 180
confidence: high
notes: Clear/sharp photo, no motion blur/ghosting at all. Confirms and extends IMG_3711's content (lines 30-38 overlap exactly, validating the correction made there regarding the "// ----" divider comment at line 33 being separate from the JSDoc block at 35-37). frame-router.ts active tab in Explorer sidebar (utils folder), same file list as IMG_3709/3710/3711. Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*. Bottom of frame cuts off after line 56.
---
30  // Create logger for frame routing
31  const logger = createFeatureLogger('routing', 'frame-router');
32
33  // ------------------------------------
34
35  /**
36   * Frame routing action types
37   */
38  export type FrameActionType =
39      | 'redirect'   // Navigate to a new route
40      | 'modal'      // Open as modal dialog
41      | 'newwindow'  // Open in new browser window
42      | 'hidden'     // Execute commands only, no navigation
43      | 'continue'   // Continue to loaders normally
44      | 'inline';    // Render inline (same page)
45
46  /**
47   * Frame routing action result
48   */
49  export interface FrameAction {
50      /** Action type to perform */
51      type: FrameActionType;
52
53      /** Target URL (for redirect, modal, newwindow) */
54      url?: string;
55
56      /** Window/modal dimensions */


========== IMG_3713.md ==========
---
photo: IMG_3713.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 46-72
orientation: 180
confidence: high
notes: Explorer sidebar shows utils/ folder expanded with many files visible (apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa... [truncated], button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts [highlighted/selected]). Breadcrumb: aqs-web-ui > src > utils > frame-router.ts > ... Tab bar shows only frame-router.ts open (italicized, likely preview mode). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Cursor at Ln 1, Col 1 despite view scrolled to lines 46-72.
---
46	/**
47	 * Frame routing action result
48	 */
49	export interface FrameAction {
50	    /** Action type to perform */
51	    type: FrameActionType;
52	
53	    /** Target URL (for redirect, modal, newwindow) */
54	    url?: string;
55	
56	    /** Window/modal dimensions */
57	    width?: string;
58	    height?: string;
59	
60	    /** Query parameters */
61	    queryString?: string;
62	
63	    /** Whether navigation is to same route (triggers refresh vs reload) */
64	    shouldRefresh?: boolean;
65	
66	    /** Additional metadata */
67	    metadata?: Record<string, unknown>;
68	}
69	
70	/**
71	 * Parameters for frame-based routing
72	 */


========== IMG_3714.md ==========
---
photo: IMG_3714.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 65-87
orientation: 180
confidence: medium
notes: SEVERE motion blur / double-exposure ghosting throughout most of the frame — the gutter shows two overlapping line-number sequences (a settling/final one and a fading pre-motion ghost ~3 lines off), and code text is correspondingly overlaid in the middle section. This is a continuation/edit of the same frame-router.ts seen in IMG_3713 (FrameAction interface, lines 46-72 there), now with a new `FrameRouteParams` interface being added below it. Line 49 "export interface FrameAction {" is a VS Code sticky-scroll header (pinned enclosing scope). Numbering below was reconstructed by anchoring on two directly-legible clean reads (line 65 "Whether navigation..." at top, and lines 83-87 "Window width/height" block at bottom, both unambiguous single-exposure text) plus cross-validation against IMG_3715 — a sharp, non-blurred follow-up photo of this same file that independently confirms line 73 = "export interface FrameRouteParams {" (as a sticky-scroll header there) and lines 76-87 verbatim. Lines 66-72 (shouldRefresh/Additional-metadata/closing-brace/JSDoc-for-FrameRouteParams) are filled in by structural inference (standard comment-then-property-then-blank pattern, fitted to the exactly-7-line gap between the two confirmed anchors at 65 and 73) rather than a fully unambiguous pixel read — treat those specific lines as lower confidence than the rest. Explorer sidebar unchanged from IMG_3713 (utils/ folder, frame-router.ts highlighted). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
49	export interface FrameAction {          [sticky-scroll header, enclosing scope]
65	/** Whether navigation is to same route (triggers refresh vs reload) */
66	shouldRefresh?: boolean;                [structurally inferred — fused/blurred in source photo]
67	
68	/** Additional metadata */              [structurally inferred — fused/blurred in source photo]
69	metadata?: Record<string, unknown>;     [structurally inferred — fused/blurred in source photo]
70	}                                        [structurally inferred — fused/blurred in source photo]
71	
72	/** Parameters for frame-based routing */  [structurally inferred, possibly still split across /** * */ — fused/blurred in source photo]
73	export interface FrameRouteParams {     [confirmed via IMG_3715 sticky-scroll header]
74	/** Frame type from server response */
75	frame?: string | FrameType | null;
76	
77	/** Target URL */
78	url?: string;
79	
80	/** Current URL (for same-route detection) */
81	currentUrl?: string;
82	
83	/** Window width */
84	width?: string;
85	
86	/** Window height */
87	height?: string;


========== IMG_3715.md ==========
---
photo: IMG_3715.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 73-101
orientation: 180
confidence: high
notes: Clean, sharp photo (no blur), directly follows on from IMG_3714 (same edit session, FrameRouteParams interface). Line 73 "export interface FrameRouteParams {" is a VS Code sticky-scroll header (pinned enclosing scope) — the scrolled body then jumps straight to line 76 (lines 74-75 are scrolled out of view, hidden under the sticky header; their content was reconstructed in IMG_3714's transcript). Explorer sidebar unchanged (utils/ folder, frame-router.ts highlighted). Tab bar shows only frame-router.ts open (italic, preview mode). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Cursor Ln 1, Col 1.
---
73	export interface FrameRouteParams {     [sticky-scroll header]
76	
77	    /** Target URL */
78	    url?: string;
79	
80	    /** Current URL (for same-route detection) */
81	    currentUrl?: string;
82	
83	    /** Window width */
84	    width?: string;
85	
86	    /** Window height */
87	    height?: string;
88	
89	    /** Query string */
90	    queryString?: string;
91	
92	    /** Whether navigation is deferred (for modal chains) */
93	    deferred?: boolean;
94	
95	    /** Additional routing metadata */
96	    metadata?: Record<string, unknown>;
97	}
98	
99	/**
100	 * Map frame type to routing action
101	 *


========== IMG_3716.md ==========
---
photo: IMG_3716.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 89-114
orientation: 180
confidence: high
notes: Clean, sharp photo (no blur). Direct continuation of IMG_3715 (lines 89-97 overlap/confirm IMG_3715's 89-97 exactly). Line 73 "export interface FrameRouteParams {" is a VS Code sticky-scroll header (pinned enclosing scope); scrolled body starts at 89. This is the start of a large JSDoc block (lines 99-114+) documenting a function that maps frame type to routing action, replicating legacy ExecuteAction frame routing logic, listing MODAL/NEWWINDOW/MAIN/HIDDEN/LOB/INLINE frame-type behaviors, with @param, @returns, and an @example starting a ```tsx code fence at line 114 (cut off — continues in next photo). Explorer sidebar unchanged (utils/ folder, frame-router.ts highlighted). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Cursor Ln 1, Col 1.
---
73	export interface FrameRouteParams {     [sticky-scroll header]
89	    /** Query string */
90	    queryString?: string;
91	
92	    /** Whether navigation is deferred (for modal chains) */
93	    deferred?: boolean;
94	
95	    /** Additional routing metadata */
96	    metadata?: Record<string, unknown>;
97	}
98	
99	/**
100	 * Map frame type to routing action
101	 *
102	 * Replicates legacy ExecuteAction frame routing logic:
103	 * - MODAL → Open in modal dialog (redirect to /modal-renderer)
104	 * - NEWWINDOW → Open in new browser window
105	 * - MAIN → Navigate normally
106	 * - HIDDEN → Execute commands only, no navigation
107	 * - LOB → Line of business frame (inline)
108	 * - INLINE → Render in current page
109	 *
110	 * @param params - Frame routing parameters
111	 * @returns Frame action to perform
112	 *
113	 * @example
114	 * ```tsx


========== IMG_3717.md ==========
---
photo: IMG_3717.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 98-125
orientation: 180
confidence: high
notes: Clean, sharp photo (no blur). Direct continuation of IMG_3716 (lines 99-114 overlap/confirm IMG_3716's 99-114 exactly, no sticky-scroll header visible this time — top of viewport shows line 98 directly, not pinned). Continues the JSDoc block with the @example's ```tsx code fence body (routeByFrame call with frame/url/width/height, then an `if (action.type === 'modal')` example showing redirect construction), cut off mid-block at line 125 "...". Explorer sidebar unchanged (utils/ folder, frame-router.ts highlighted). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Cursor Ln 1, Col 1.
---
98	
99	/**
100	 * Map frame type to routing action
101	 *
102	 * Replicates legacy ExecuteAction frame routing logic:
103	 * - MODAL → Open in modal dialog (redirect to /modal-renderer)
104	 * - NEWWINDOW → Open in new browser window
105	 * - MAIN → Navigate normally
106	 * - HIDDEN → Execute commands only, no navigation
107	 * - LOB → Line of business frame (inline)
108	 * - INLINE → Render in current page
109	 *
110	 * @param params - Frame routing parameters
111	 * @returns Frame action to perform
112	 *
113	 * @example
114	 * ```tsx
115	 * const action = routeByFrame({
116	 *   frame: 'MODAL',
117	 *   url: '/policy-details',
118	 *   width: '800',
119	 *   height: '600',
120	 * });
121	 *
122	 * if (action.type === 'modal') {
123	 *   return redirect(`/modal-renderer?url=${encodeURIComponent(action.url!)}`);
124	 * }
125	 * ...


========== IMG_3718.md ==========
---
photo: IMG_3718.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 117-143
orientation: 180
confidence: high
notes: Motion blur / double-exposure ghosting throughout (gutter shows two overlapping line-number sequences ~3 apart, persisting the whole frame). Lines 117-125 are a re-photograph of content already confirmed cleanly in IMG_3717 (const action = routeByFrame({...}) example block, if/return redirect example) — matches exactly. Lines 126-143 (start of the routeByFrame function implementation) were initially reconstructed from the blur with medium confidence, then CORRECTED and CONFIRMED against the clean, sharp follow-up photo IMG_3719 (same file, no blur), which shows this exact range verbatim at lines 127-154 — numbering/content below now matches that ground truth exactly. Explorer sidebar unchanged (utils/ folder, frame-router.ts highlighted). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
117	 *   url: '/policy-details',
118	 *   width: '800',
119	 *   height: '600',
120	 * });
121	 *
122	 * if (action.type === 'modal') {
123	 *   return redirect(`/modal-renderer?url=${encodeURIComponent(action.url!)}`);
124	 * }
125	 * ...
126	 */
127	export function routeByFrame(params: FrameRouteParams): FrameAction {
128	    const { frame, url, currentUrl, width, height, queryString, deferred, metadata } = params;
129	
130	    logger.debug('Routing by frame', { frame, url, currentUrl, deferred });
131	
132	    // Frame convention: normalize to uppercase ('MAIN', 'MODAL', 'NEWWINDOW', etc.)
133	    // because legacy ExecuteAction/frame-switch logic and backend responses use
134	    // uppercase frame tokens; this keeps routing deterministic across mixed casing.
135	    const frameUpper = frame?.toString().toUpperCase();
136	
137	    // Check if navigating to same route (for refresh vs reload logic)
138	    const shouldRefresh = currentUrl && url ? isSameRoute(currentUrl, url) : false;
139	
140	    // Default action if no frame specified
141	    if (!frameUpper) {
142	        logger.debug('No frame specified, continuing to loaders');
143	        return {


========== IMG_3719.md ==========
---
photo: IMG_3719.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 127-154
orientation: 180
confidence: high
notes: Clean, sharp photo (no blur). Line 127 "export function routeByFrame(params: FrameRouteParams): FrameAction {" is a VS Code sticky-scroll header (pinned enclosing scope) — its row visually overlaps the top of the scrolled body (line 128), which is why the params-destructure text appears faintly doubled right under the sticky line; the real line 128 content is clearly readable beneath it. This photo corrects/confirms the reconstruction attempted from the blurry IMG_3718 for lines 128-143 (order was: destructure first, then blank, then the short-form logger.debug — not the long-form logger.debug guessed initially). New content beyond IMG_3718: the returned "continue" FrameAction object (144-149), function close (150), and the start of the "// Handle each frame type" switch(frameUpper) block (152-154), cut off at "case 'MODAL': {". Explorer sidebar unchanged (utils/ folder, frame-router.ts highlighted). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Cursor Ln 1, Col 1.
---
127	export function routeByFrame(params: FrameRouteParams): FrameAction {   [sticky-scroll header]
128	    const { frame, url, currentUrl, width, height, queryString, deferred, metadata } = params;
129	
130	    logger.debug('Routing by frame', { frame, url, currentUrl, deferred });
131	
132	    // Frame convention: normalize to uppercase ('MAIN', 'MODAL', 'NEWWINDOW', etc.)
133	    // because legacy ExecuteAction/frame-switch logic and backend responses use
134	    // uppercase frame tokens; this keeps routing deterministic across mixed casing.
135	    const frameUpper = frame?.toString().toUpperCase();
136	
137	    // Check if navigating to same route (for refresh vs reload logic)
138	    const shouldRefresh = currentUrl && url ? isSameRoute(currentUrl, url) : false;
139	
140	    // Default action if no frame specified
141	    if (!frameUpper) {
142	        logger.debug('No frame specified, continuing to loaders');
143	        return {
144	            type: 'continue',
145	            url,
146	            queryString,
147	            shouldRefresh,
148	            metadata,
149	        };
150	    }
151	
152	    // Handle each frame type
153	    switch (frameUpper) {
154	        case 'MODAL': {


========== IMG_3720.md ==========
---
photo: IMG_3720.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 141-167
orientation: 180
confidence: high
notes: Clean, sharp photo (no blur). Line 127 "export function routeByFrame(params: FrameRouteParams): FrameAction {" is a VS Code sticky-scroll header (pinned enclosing scope); a fragment of line 141 ("if (!frameUpper) {") peeks out just above line 142, partly obscured by the sticky bar boundary. Lines 141-150 re-confirm IMG_3719's 141-150 exactly. New content: the "MODAL" case body of the switch(frameUpper) block — builds a `const action: FrameAction` object with type 'modal', url/width/height defaults via ?? nullish-coalescing, queryString, shouldRefresh, and a metadata object spreading ...metadata plus deferred, cut off at line 167 "};" (continues in next photo). Explorer sidebar unchanged (utils/ folder, frame-router.ts highlighted). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Cursor Ln 1, Col 1.
---
127	export function routeByFrame(params: FrameRouteParams): FrameAction {   [sticky-scroll header]
141	if (!frameUpper) {                       [partially visible, top edge]
142	    logger.debug('No frame specified, continuing to loaders');
143	    return {
144	        type: 'continue',
145	        url,
146	        queryString,
147	        shouldRefresh,
148	        metadata,
149	    };
150	}
151	
152	// Handle each frame type
153	switch (frameUpper) {
154	    case 'MODAL': {
155	        // Modal dialogs - redirect to modal renderer
156	        const action: FrameAction = {
157	            type: 'modal',
158	            url: url ?? '',
159	            width: width ?? '600',
160	            height: height ?? '400',
161	            queryString,
162	            shouldRefresh,
163	            metadata: {
164	                ...metadata,
165	                deferred,
166	            },
167	        };


========== IMG_3721.md ==========
---
photo: IMG_3721.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 152-177
orientation: 180
confidence: high
notes: Clean, sharp photo (no blur). Line 127 "export function routeByFrame(params: FrameRouteParams): FrameAction {" is a VS Code sticky-scroll header (pinned enclosing scope). Lines 152-167 re-confirm IMG_3720's 152-167 exactly (MODAL case body). New content: logger.info call logging the modal routing (url/width/height from action), return action;, closing brace of the MODAL case block (174), then case 'NEWWINDOW': falling through to case 'NEW_WINDOW': { (cut off, continues in next photo). Explorer sidebar unchanged (utils/ folder, frame-router.ts highlighted). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Cursor Ln 1, Col 1.
---
127	export function routeByFrame(params: FrameRouteParams): FrameAction {   [sticky-scroll header]
152	// Handle each frame type
153	switch (frameUpper) {
154	    case 'MODAL': {
155	        // Modal dialogs - redirect to modal renderer
156	        const action: FrameAction = {
157	            type: 'modal',
158	            url: url ?? '',
159	            width: width ?? '600',
160	            height: height ?? '400',
161	            queryString,
162	            shouldRefresh,
163	            metadata: {
164	                ...metadata,
165	                deferred,
166	            },
167	        };
168	        logger.info('Routing to modal', {
169	            url: action.url,
170	            width: action.width,
171	            height: action.height,
172	        });
173	        return action;
174	    }
175	
176	    case 'NEWWINDOW':
177	    case 'NEW_WINDOW': {


========== IMG_3722.md ==========
---
photo: IMG_3722.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 166-190
orientation: 180
confidence: high
notes: Clean, sharp photo (no blur). TWO VS Code sticky-scroll header rows pinned at top: line 127 "export function routeByFrame(params: FrameRouteParams): FrameAction {" and, oddly, line 156 "const action: FrameAction = {" (from the earlier MODAL case, already closed by line 174 in this same file per IMG_3721/3722 body) — likely a stale/lagging sticky-scroll render rather than actual current scope; transcribed as-observed. Lines 166-174 re-confirm IMG_3721's 166-174 exactly (end of MODAL case). New content: case 'NEWWINDOW' falling through to case 'NEW_WINDOW': { block — builds a `const action: FrameAction` with type 'newwindow', url/width/height defaults (800/600), queryString, shouldRefresh, metadata, then a logger.info('Routing to new window', ...) call beginning at 187, cut off at line 190 (partial "height: action.height" visible at very bottom edge, illegible). Explorer sidebar unchanged (utils/ folder, frame-router.ts highlighted). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Cursor Ln 1, Col 1.
---
127	export function routeByFrame(params: FrameRouteParams): FrameAction {   [sticky-scroll header]
156	    const action: FrameAction = {                                       [sticky-scroll header, appears stale/lagging]
166	            },
167	        };
168	        logger.info('Routing to modal', {
169	            url: action.url,
170	            width: action.width,
171	            height: action.height,
172	        });
173	        return action;
174	    }
175	
176	    case 'NEWWINDOW':
177	    case 'NEW_WINDOW': {
178	        // New browser window
179	        const action: FrameAction = {
180	            type: 'newwindow',
181	            url: url ?? '',
182	            width: width ?? '800',
183	            height: height ?? '600',
184	            queryString,
185	            shouldRefresh,
186	            metadata,
187	        };
188	        logger.info('Routing to new window', {
189	            url: action.url,
190	            width: action.width,


========== IMG_3723.md ==========
---
photo: IMG_3723.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 176-201
orientation: 180
confidence: high
notes: Clean, sharp photo (no blur). Only one sticky-scroll header this time: line 127 "export function routeByFrame(params: FrameRouteParams): FrameAction {" (the earlier stray "156" sticky seen in IMG_3722 is gone). Lines 176-193 re-confirm IMG_3722's 176-190 range and extend it (194 closing brace of NEW_WINDOW case). New content: case 'HIDDEN': { block — comment "Hidden frame - execute commands only", logger.info call, and start of a returned object with type: 'hidden', metadata, (cut off at 201, continues in next photo). Explorer sidebar unchanged (utils/ folder, frame-router.ts highlighted). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Cursor Ln 1, Col 1.
---
127	export function routeByFrame(params: FrameRouteParams): FrameAction {   [sticky-scroll header]
176	    case 'NEWWINDOW':
177	    case 'NEW_WINDOW': {
178	        // New browser window
179	        const action: FrameAction = {
180	            type: 'newwindow',
181	            url: url ?? '',
182	            width: width ?? '800',
183	            height: height ?? '600',
184	            queryString,
185	            shouldRefresh,
186	            metadata,
187	        };
188	        logger.info('Routing to new window', {
189	            url: action.url,
190	            width: action.width,
191	            height: action.height,
192	        });
193	        return action;
194	    }
195	
196	    case 'HIDDEN': {
197	        // Hidden frame - execute commands only
198	        logger.info('Hidden frame - commands only, no navigation');
199	        return {
200	            type: 'hidden',
201	            metadata,


========== IMG_3725.md ==========
---
photo: IMG_3725.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 187-224
orientation: 180
confidence: medium
notes: Photo exhibits a scroll-motion double-exposure artifact — two overlapping scroll positions of the same file are superimposed, making exact line-to-text alignment approximate. Sticky-scroll header pinned at top shows "127 export function routeByFrame(params: FrameRouteParams): FrameAction {". Tab bar shows only frame-router.ts open (italic = preview tab). Explorer: aqs-web-ui > src > utils expanded, frame-router.ts highlighted; sibling files visible include apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payload.ts, button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts. "No Solution" / 2 errors, 0 warnings shown in status bar. Branch hitanshu/experimental*. Content reconstructed from the legible overlapping text (HIDDEN case, MAIN/MAINFRAME case, LOB/LINE_OF_BUSINESS case start) — verified consistent with clearer photos later in this scroll sequence (IMG_3727).
---
case 'HIDDEN': {
    // Hidden frame - execute commands only
    logger.info('Hidden frame - commands only, no navigation');
    return {
        type: 'hidden',
        metadata,
    };
}

case 'MAIN':
case 'MAINFRAME': {
    // Main frame - normal navigation
    logger.info('Routing to main frame', { url, shouldRefresh });
    return {
        type: 'redirect',
        url: url ?? '',
        queryString,
        shouldRefresh,
        metadata,
    };
}

case 'LOB':
case 'LINE_OF_BUSINESS': {
    // Line of business frame - render inline
    logger.info('Routing to LOB frame (inline)', { url });
    return {
        type: 'inline',
        url: url ?? '',
        queryString,
⟪?⟫ (remaining lines obscured by overlapping second exposure)


========== IMG_3724.md ==========
---
photo: IMG_3724.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 192-214
orientation: 180
confidence: high
notes: Motion blur / double-exposure ghosting throughout (gutter shows two overlapping line-number sequences ~2-3 apart). Lines 192-203 are a re-photograph of content already confirmed cleanly in IMG_3722/IMG_3723 (end of NEW_WINDOW case, HIDDEN case) — cross-checked and match exactly. Lines 204-214 are new content reconstructed from the overlapping/blurred text by identifying the larger/sharper (foreground) digit and text in each fused row and cross-checking internal consistency (each line's content reappears a second time, shifted, in an adjacent row's ghost, and the two readings agree) — high confidence despite the blur. Covers case 'MAIN' falling through to case 'MAINFRAME': { — comment "Main frame - normal navigation", logger.info call, and start of a returned redirect object (type: 'redirect', url ?? '', queryString, shouldRefresh, metadata), cut off at line 214 "metadata," (continues in a later, unphotographed part of the file). Explorer sidebar unchanged (utils/ folder, frame-router.ts highlighted). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Cursor Ln 1, Col 1.
---
127	export function routeByFrame(params: FrameRouteParams): FrameAction {   [sticky-scroll header]
192	        });
193	        return action;
194	    }
195	
196	    case 'HIDDEN': {
197	        // Hidden frame - execute commands only
198	        logger.info('Hidden frame - commands only, no navigation');
199	        return {
200	            type: 'hidden',
201	            metadata,
202	        };
203	    }
204	
205	    case 'MAIN':
206	    case 'MAINFRAME': {
207	        // Main frame - normal navigation
208	        logger.info('Routing to main frame', { url, shouldRefresh });
209	        return {
210	            type: 'redirect',
211	            url: url ?? '',
212	            queryString,
213	            shouldRefresh,
214	            metadata,


========== IMG_3726.md ==========
---
photo: IMG_3726.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 213-244
orientation: 180
confidence: medium
notes: Same scroll-motion double-exposure artifact as IMG_3725 (two overlapping scroll positions superimposed). Sticky-scroll header pinned at top shows "127 export function routeByFrame(params: FrameRouteParams): FrameAction {". Explorer/tab state identical to IMG_3725. Content covers tail of LOB/LINE_OF_BUSINESS case, INLINE case, and start of default case.
---
        shouldRefresh,
        metadata,
    };
}

case 'INLINE': {
    // Inline rendering
    logger.info('Routing to inline frame', { url });
    return {
        type: 'inline',
        url: url ?? '',
        queryString,
        shouldRefresh,
        metadata,
    };
}

default:
    // Unknown frame type - log warning and continue
    logger.warn('Unknown frame type, continuing to loaders', { frameType: frameUpper });
⟪?⟫ (remaining lines obscured by overlapping second exposure)


========== IMG_3727.md ==========
---
photo: IMG_3727.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 219-246
orientation: 180
confidence: high
notes: Clean (non-ghosted) read, no motion-blur overlap. Sticky-scroll header pinned at top shows "127 export function routeByFrame(params: FrameRouteParams): FrameAction {". Tab bar shows only frame-router.ts open (italic = preview tab). Explorer: aqs-web-ui > src > utils expanded, frame-router.ts highlighted. "No Solution" / 2 errors, 0 warnings. Branch hitanshu/experimental*. Line 246 cut off at bottom edge of visible editor area.
---
219      // Line of business frame - render inline
220      logger.info('Routing to LOB frame (inline)', { url });
221      return {
222          type: 'inline',
223          url: url ?? '',
224          queryString,
225          shouldRefresh,
226          metadata,
227      };
228  }
229
230  case 'INLINE': {
231      // Inline rendering
232      logger.info('Routing to inline frame', { url });
233      return {
234          type: 'inline',
235          url: url ?? '',
236          queryString,
237          shouldRefresh,
238          metadata,
239      };
240  }
241
242  default:
243      // Unknown frame type - log warning and continue
244      logger.warn('Unknown frame type, continuing to loaders', { frameType: frameUpper });
245      return {
246  ⟪?⟫ (line cut off at bottom edge)


========== IMG_3728.md ==========
---
photo: IMG_3728.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 239-264
orientation: 180
confidence: medium
notes: Scroll-motion double-exposure artifact (two overlapping scroll positions superimposed), same as IMG_3725/3726. Sticky-scroll header pinned at top. Content covers tail of INLINE case, default case body, and start of buildModalUrl JSDoc block.
---
        shouldRefresh,
        metadata,
    };
}

default:
    // Unknown frame type - log warning and continue
    logger.warn('Unknown frame type, continuing to loaders', { frameType: frameUpper });
    return {
        type: 'continue',
        url,
        queryString,
        shouldRefresh,
        metadata: {
            ...metadata,
            unknownFrame: frameUpper,
        },
    };
}
}

/**
 * Build modal renderer URL
 *
 * Creates the URL for the modal renderer route with proper encoding.
 *
 * @param url - Target URL to render in modal
⟪?⟫ (remaining lines obscured by overlapping second exposure)


========== IMG_3729.md ==========
---
photo: IMG_3729.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 244-269
orientation: 180
confidence: medium
notes: Mild scroll-motion double-exposure artifact (lighter overlap than IMG_3725/3726/3728 but still two superimposed scroll positions visible). Sticky-scroll header pinned at top. Content covers default case body and buildModalUrl JSDoc block (params for url/width/height/queryString, @returns).
---
default:
    // Unknown frame type - log warning and continue
    logger.warn('Unknown frame type, continuing to loaders', { frameType: frameUpper });
    return {
        type: 'continue',
        url,
        queryString,
        shouldRefresh,
        metadata: {
            ...metadata,
            unknownFrame: frameUpper,
        },
    };
}
}

/**
 * Build modal renderer URL
 *
 * Creates the URL for the modal renderer route with proper encoding.
 *
 * @param url - Target URL to render in modal
 * @param width - Modal width (default: 600)
 * @param height - Modal height (default: 400)
 * @param queryString - Additional query parameters
 * @returns Encoded modal renderer URL


========== IMG_3730.md ==========
---
photo: IMG_3730.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 269-296
orientation: 180
confidence: medium
notes: Scroll-motion double-exposure artifact (two overlapping scroll positions superimposed). Sticky-scroll header pinned at top. Content covers tail of buildModalUrl JSDoc (@example block with sample call and return value comment) and the buildModalUrl function body (URLSearchParams construction, width/height/query params.set calls, template-literal return).
---
 * @returns Encoded modal renderer URL
 *
 * @example
 * ```tsx
 * const modalUrl = buildModalUrl('/policy-details', '800', '600', '?policyId=123');
 * // Returns: /modal-renderer?url=%2Fpolicy-details&width=800&height=600&query=%3FpolicyId%3D123
 * ```
 */
export function buildModalUrl(
    url: string,
    width: string = '600',
    height: string = '400',
    queryString?: string,
): string {
    const params = new URLSearchParams();
    params.set('url', url);
    params.set('width', width);
    params.set('height', height);

    if (queryString) {
        params.set('query', queryString);
    }

    return `/modal-renderer?${params.toString()}`;
}


========== IMG_3731.md ==========
---
photo: IMG_3731.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 272-296
orientation: 180
confidence: medium
notes: Scroll-motion double-exposure artifact (two overlapping scroll positions superimposed). Sticky-scroll header pinned at top. Content covers the @example block of buildModalUrl JSDoc, the buildModalUrl function body, and the closing brace.
---
 * const modalUrl = buildModalUrl('/policy-details', '800', '600', '?policyId=123');
 * // Returns: /modal-renderer?url=%2Fpolicy-details&width=800&height=600&query=%3FpolicyId%3D123
 * ```
 */
export function buildModalUrl(
    url: string,
    width: string = '600',
    height: string = '400',
    queryString?: string,
): string {
    const params = new URLSearchParams();
    params.set('url', url);
    params.set('width', width);
    params.set('height', height);

    if (queryString) {
        params.set('query', queryString);
    }

    return `/modal-renderer?${params.toString()}`;
}


========== IMG_3732.md ==========
---
photo: IMG_3732.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 272-298
orientation: 180
confidence: medium
notes: Scroll-motion double-exposure artifact (two overlapping scroll positions superimposed). Sticky-scroll header pinned at top. Content covers the buildModalUrl @example JSDoc block, the buildModalUrl function body, and the start of the buildWindowUrl JSDoc block (param url/queryString, @returns).
---
 * const modalUrl = buildModalUrl('/policy-details', '800', '600', '?policyId=123');
 * // Returns: /modal-renderer?url=%2Fpolicy-details&width=800&height=600&query=%3FpolicyId%3D123
 * ```
 */
export function buildModalUrl(
    url: string,
    width: string = '600',
    height: string = '400',
    queryString?: string,
): string {
    const params = new URLSearchParams();
    params.set('url', url);
    params.set('width', width);
    params.set('height', height);

    if (queryString) {
        params.set('query', queryString);
    }

    return `/modal-renderer?${params.toString()}`;
}

/**
 * Build new window URL with query parameters
 *
 * @param url - Target URL
 * @param queryString - Query parameters to append
 * @returns Full URL with query string


========== IMG_3733.md ==========
---
photo: IMG_3733.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 276-309
orientation: 180
confidence: medium
notes: Mild scroll-motion double-exposure artifact in the upper portion (buildModalUrl body); lower portion (buildWindowUrl JSDoc + function, lines ~294-309) reads cleanly as a single layer. Sticky-scroll header pinned at top. Content covers buildModalUrl function body/close, buildWindowUrl JSDoc block (with @example showing buildWindowUrl('/policy-details', '?policyId=123') returning /policy-details?policyId=123), and start of buildWindowUrl function body.
---
export function buildModalUrl(
    url: string,
    width: string = '600',
    height: string = '400',
    queryString?: string,
): string {
    const params = new URLSearchParams();
    params.set('url', url);
    params.set('width', width);
    params.set('height', height);

    if (queryString) {
        params.set('query', queryString);
    }

    return `/modal-renderer?${params.toString()}`;
}

/**
 * Build new window URL with query parameters
 *
 * @param url - Target URL
 * @param queryString - Query parameters to append
 * @returns Full URL with query string
 *
 * @example
 * ```tsx
 * const fullUrl = buildWindowUrl('/policy-details', '?policyId=123');
 * // Returns: /policy-details?policyId=123
 * ```
 */
export function buildWindowUrl(url: string, queryString?: string): string {
    if (!queryString) {
        return url;


========== IMG_3734.md ==========
---
photo: IMG_3734.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 301-327
orientation: 180
confidence: medium
notes: Scroll-motion double-exposure artifact (two overlapping scroll positions superimposed). Sticky-scroll header pinned at top. Content covers tail of buildWindowUrl JSDoc/@example, the buildWindowUrl function body (leading-? stripping, separator logic, template-literal return), and start of openNewWindow JSDoc block.
---
 * @example
 * ```tsx
 * const fullUrl = buildWindowUrl('/policy-details', '?policyId=123');
 * // Returns: /policy-details?policyId=123
 * ```
 */
export function buildWindowUrl(url: string, queryString?: string): string {
    if (!queryString) {
        return url;
    }

    // Remove leading ? if present
    const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;

    // Check if URL already has query params
    const separator = url.includes('?') ? '&' : '?';

    return `${url}${separator}${query}`;
}

/**
 * Open URL in new window with specified dimensions
 *
 * @param url - Target URL
 * @param width - Window width (default: 800)
 * @param height - Window height (default: 600)
 * @param name - Window name (default: '_blank')


========== IMG_3735.md ==========
---
photo: IMG_3735.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 307-338
orientation: 180
confidence: medium
notes: Scroll-motion double-exposure artifact (two overlapping scroll positions superimposed). Sticky-scroll header pinned at top. Content covers buildWindowUrl function body/close, full openNewWindow JSDoc block (params url/width/height/name, @returns, @example showing openNewWindow('/policy-details?id=123', '1024', '768')), and start of openNewWindow function signature.
---
    const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;

    // Check if URL already has query params
    const separator = url.includes('?') ? '&' : '?';

    return `${url}${separator}${query}`;
}

/**
 * Open URL in new window with specified dimensions
 *
 * @param url - Target URL
 * @param width - Window width (default: 800)
 * @param height - Window height (default: 600)
 * @param name - Window name (default: '_blank')
 * @returns Window reference or null if blocked
 *
 * @example
 * ```tsx
 * openNewWindow('/policy-details?id=123', '1024', '768');
 * ```
 */
export function openNewWindow(
    url: string,
    width: string = '800',
    height: string = '600',


========== IMG_3736.md ==========
---
photo: IMG_3736.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 325-351
orientation: 180
confidence: high
notes: Clean (non-ghosted) read, no motion-blur overlap. Sticky-scroll header not visible in this crop (tab bar shows frame-router.ts). Content covers tail of openNewWindow JSDoc, full function signature (url/width/height/name params, returns Window | null), and start of function body (center-position calculation and window-features array: width, height, left, top, resizable=yes, scrollbars=yes, ...). Array construction cut off at bottom edge.
---
    * @param width - Window width (default: 800)
 * @param height - Window height (default: 600)
 * @param name - Window name (default: '_blank')
 * @returns Window reference or null if blocked
 *
 * @example
 * ```tsx
 * openNewWindow('/policy-details?id=123', '1024', '768');
 * ```
 */
export function openNewWindow(
    url: string,
    width: string = '800',
    height: string = '600',
    name: string = '_blank',
): Window | null {
    // Calculate center position
    const left = (window.screen.width - parseInt(width, 10)) / 2;
    const top = (window.screen.height - parseInt(height, 10)) / 2;

    const features = [
        `width=${width}`,
        `height=${height}`,
        `left=${left}`,
        `top=${top}`,
        'resizable=yes',
        'scrollbars=yes',
⟪?⟫ (line cut off at bottom edge)


========== IMG_3737.md ==========
---
photo: IMG_3737.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 335-361
orientation: 180
confidence: medium
notes: Double-exposure/ghosting throughout the body (two slightly offset scroll positions of the same static content overlaid, ~2 lines apart) — same pattern as IMG_3701. Breadcrumb aqs-web-ui > src > utils > frame-router.ts. Explorer sidebar identical file list to IMG_3738: apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts (highlighted). Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*. Content below is IDENTICAL to and cross-confirmed against IMG_3738 (sharp, non-ghosted photo of the same file/range, taken moments later/earlier in the same session) — line numbers and text reconstructed using that clean photo since the ghosting alone made row/number alignment ambiguous.
---
335	export function openNewWindow(
336	    url: string,
337	    width: string = '800',
338	    height: string = '600',
339	    name: string = '_blank',
340	): Window | null {
341	    // Calculate center position
342	    const left = (window.screen.width - parseInt(width, 10)) / 2;
343	    const top = (window.screen.height - parseInt(height, 10)) / 2;
344	
345	    const features = [
346	        `width=${width}`,
347	        `height=${height}`,
348	        `left=${left}`,
349	        `top=${top}`,
350	        'resizable=yes',
351	        'scrollbars=yes',
352	        'status=yes',
353	        'toolbar=no',
354	        'menubar=no',
355	        'location=no',
356	    ].join(',');
357	
358	    try {
359	        const newWindow = window.open(url, name, features);
360	
361	        if (!newWindow) {

    [Confirmed against IMG_3738, taken of the same file/range without ghosting. This photo (IMG_3737) independently shows the same content doubled at a ~2-line scroll offset, which corroborates rather than contradicts the above.]


========== IMG_3738.md ==========
---
photo: IMG_3738.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 335-362
orientation: 180
confidence: high
notes: Sharp, clean single exposure (not ghosted). Breadcrumb aqs-web-ui > src > utils > frame-router.ts. Single tab open (frame-router.ts, active/highlighted in Explorer). Explorer sidebar (utils folder): apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts (highlighted). Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*. Line 362 is cut off/obscured at the bottom by the taskbar and "No Solution" indicator — only a blurred fragment is visible, transcribed best-effort with ⟪?⟫. Weather widget shows 27°C Mostly cloudy; taskbar clock area not clearly legible in this shot.
---
335	export function openNewWindow(
336	    url: string,
337	    width: string = '800',
338	    height: string = '600',
339	    name: string = '_blank',
340	): Window | null {
341	    // Calculate center position
342	    const left = (window.screen.width - parseInt(width, 10)) / 2;
343	    const top = (window.screen.height - parseInt(height, 10)) / 2;
344	
345	    const features = [
346	        `width=${width}`,
347	        `height=${height}`,
348	        `left=${left}`,
349	        `top=${top}`,
350	        'resizable=yes',
351	        'scrollbars=yes',
352	        'status=yes',
353	        'toolbar=no',
354	        'menubar=no',
355	        'location=no',
356	    ].join(',');
357	
358	    try {
359	        const newWindow = window.open(url, name, features);
360	
361	        if (!newWindow) {
362	            logger.warn('Popup blocked by browser⟪?⟫', { url, name ⟪?⟫ }); ⟪?⟫


========== IMG_3739.md ==========
---
photo: IMG_3739.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 335-362
orientation: 180
confidence: high
notes: Sharp, clean single exposure. Same exact scroll position/content as IMG_3738 (appears to be a repeat/duplicate shot of the same view). Breadcrumb aqs-web-ui > src > utils > frame-router.ts. Single tab open (frame-router.ts, active/highlighted in Explorer). Explorer sidebar (utils folder): apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts (highlighted). Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*. Line 362 cut off/obscured at bottom by taskbar and "No Solution" indicator, same as IMG_3738. Weather widget 27°C Mostly cloudy.
---
335	export function openNewWindow(
336	    url: string,
337	    width: string = '800',
338	    height: string = '600',
339	    name: string = '_blank',
340	): Window | null {
341	    // Calculate center position
342	    const left = (window.screen.width - parseInt(width, 10)) / 2;
343	    const top = (window.screen.height - parseInt(height, 10)) / 2;
344	
345	    const features = [
346	        `width=${width}`,
347	        `height=${height}`,
348	        `left=${left}`,
349	        `top=${top}`,
350	        'resizable=yes',
351	        'scrollbars=yes',
352	        'status=yes',
353	        'toolbar=no',
354	        'menubar=no',
355	        'location=no',
356	    ].join(',');
357	
358	    try {
359	        const newWindow = window.open(url, name, features);
360	
361	        if (!newWindow) {
362	            logger.warn('Popup blocked by browser⟪?⟫', { url, name ⟪?⟫ }); ⟪?⟫


========== IMG_3740.md ==========
---
photo: IMG_3740.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 335 (sticky header) / 341-367 (body)
orientation: 180
confidence: high
notes: Sharp, clean single exposure. Sticky-scroll header at top shows line 335 "export function openNewWindow(". Body starts at line 341 (top edge, partially cut off by the sticky header bar but legible/consistent with prior photos) through 367. Breadcrumb aqs-web-ui > src > utils > frame-router.ts. Single tab open (frame-router.ts, active/highlighted in Explorer). Explorer sidebar (utils folder): apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts (highlighted). Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*. This photo resolves the line 362 content that was obscured/cut off in IMG_3738/IMG_3739.
---
335	export function openNewWindow(
341	    // Calculate center position
342	    const left = (window.screen.width - parseInt(width, 10)) / 2;
343	    const top = (window.screen.height - parseInt(height, 10)) / 2;
344	
345	    const features = [
346	        `width=${width}`,
347	        `height=${height}`,
348	        `left=${left}`,
349	        `top=${top}`,
350	        'resizable=yes',
351	        'scrollbars=yes',
352	        'status=yes',
353	        'toolbar=no',
354	        'menubar=no',
355	        'location=no',
356	    ].join(',');
357	
358	    try {
359	        const newWindow = window.open(url, name, features);
360	
361	        if (!newWindow) {
362	            logger.warn('Popup blocked by browser', { url, name });
363	            return null;
364	        }
365	
366	        // Focus the new window
367	        newWindow.focus();


========== IMG_3741.md ==========
---
photo: IMG_3741.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 335 (sticky header) / 360-383 (body)
orientation: 180
confidence: medium
notes: Heavy double/triple-exposure ghosting throughout the body (camera moved/scrolled during shutter, blending ~2-3 slightly different scroll positions of the same static file content, same pattern as IMG_3701/IMG_3737). Sticky-scroll header at top shows line 335 "export function openNewWindow(". Lines 360-367 are corroborated at high confidence against the sharp, non-ghosted IMG_3740 (same file/range, clear photo). Lines 368-383 are NEW content not covered by earlier clear photos; reconstructed by cross-referencing the overlapping duplicate exposures within this photo and standard code/JSDoc structure (blank-line separators consistent with the rest of this function) — best-effort, marked medium confidence. Breadcrumb aqs-web-ui > src > utils > frame-router.ts. Single tab open (frame-router.ts, active/highlighted). Explorer sidebar (utils folder): apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts (highlighted). Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*. Line 383 partially obscured at bottom by "No Solution"/taskbar overlay but legible.
---
335	export function openNewWindow(
360	
361	    if (!newWindow) {
362	        logger.warn('Popup blocked by browser', { url, name });
363	        return null;
364	    }
365	
366	    // Focus the new window
367	    newWindow.focus();
368	
369	        return newWindow;
370	    } catch (error) {
371	        logger.error('Failed to open new window', error as Error, { url, name });
372	        return null;
373	    }
374	}
375	
376	/**
377	 * Check if frame type requires modal rendering
378	 *
379	 * @param frame - Frame type to check
380	 * @returns True if frame should open as modal
381	 */
382	export function isModalFrame(frame?: string | FrameType | null): boolean {
383	    return frame?.toString().toUpperCase() === 'MODAL';


========== IMG_3742.md ==========
---
photo: IMG_3742.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 335 (sticky header) / 373-398 (body)
orientation: 180
confidence: high
notes: Sharp, clean single exposure. Sticky-scroll header at top shows line 335 "export function openNewWindow(". Body 373-398 (398 is the last visible line, cut off at the very bottom by the taskbar/"No Solution" indicator). This photo independently confirms the lines 373-383 reconstruction made from the heavily-ghosted IMG_3741 — content matches exactly. Breadcrumb aqs-web-ui > src > utils > frame-router.ts. Single tab open (frame-router.ts, active/highlighted). Explorer sidebar (utils folder): apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts (highlighted). Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*.
---
335	export function openNewWindow(
373	    }
374	}
375	
376	/**
377	 * Check if frame type requires modal rendering
378	 *
379	 * @param frame - Frame type to check
380	 * @returns True if frame should open as modal
381	 */
382	export function isModalFrame(frame?: string | FrameType | null): boolean {
383	    return frame?.toString().toUpperCase() === 'MODAL';
384	}
385	
386	/**
387	 * Check if frame type requires new window
388	 *
389	 * @param frame - Frame type to check
390	 * @returns True if frame should open in new window
391	 */
392	export function isNewWindowFrame(frame?: string | FrameType | null): boolean {
393	    const frameUpper = frame?.toString().toUpperCase();
394	    return frameUpper === 'NEWWINDOW' || frameUpper === 'NEW_WINDOW';
395	}
396	
397	/**
398	 * Check if frame type is hidden (commands only)


========== IMG_3743.md ==========
---
photo: IMG_3743.JPG
type: vscode-code
file: aqs-web-ui/src/utils/frame-router.ts
lines: 396-406
orientation: 180
confidence: high
notes: Sharp, clean single exposure. No sticky-scroll header visible (scrolled such that no enclosing function header is pinned). Line 406 appears to be the last line of the file (blank, nothing further below it in the editor). Breadcrumb aqs-web-ui > src > utils > frame-router.ts. Single tab open (frame-router.ts, active/highlighted). Explorer sidebar (utils folder): apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts (highlighted). Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*. This resolves/confirms the end of the isHiddenFrame function whose start (397-398) was already captured in IMG_3742.
---
396	
397	/**
398	 * Check if frame type is hidden (commands only)
399	 *
400	 * @param frame - Frame type to check
401	 * @returns True if frame is hidden
402	 */
403	export function isHiddenFrame(frame?: string | FrameType | null): boolean {
404	    return frame?.toString().toUpperCase() === 'HIDDEN';
405	}
406	
