# BUNDLE for src/utils/url-helpers.ts
# 20 photo fragment(s), ascending start-line order.


========== IMG_4177.md ==========
---
photo: IMG_4177.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 1-27
orientation: 180
confidence: high
notes: Clean/sharp photo, no motion blur. New file compared to IMG_4170-4176 (which were all transform-pagebuild-response.ts) — timestamp has advanced to 7:49 PM (vs 7:34 PM earlier), status bar now shows 2 errors / 0 warnings (was 11/0 earlier), and only one tab is open: url-helpers.ts (transform-pagebuild-response.ts is no longer open, just visible unselected in the Explorer list). Breadcrumb: aqs-web-ui > src > utils > url-helpers.ts. Explorer sidebar (src/utils expanded) file list unchanged from earlier photos: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-response.ts, url-helpers.ts (selected), user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts, then app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts, and a cut-off entry below. Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", TypeScript, UTF-8, CRLF, Tab Size 4.
---
1	/**
2	 * @file url-helpers.ts
3	 * @description URL utility functions for route comparison and normalization
4	 *
5	 * Provides utilities to:
6	 * - Strip query strings from URLs
7	 * - Normalize URLs for consistent comparison
8	 * - Compare routes to detect same-page navigation
9	 * - Parse URL components for smart navigation decisions
10	 *
11	 * These utilities are critical for the refresh vs reload logic,
12	 * enabling the application to detect when a navigation is to the
13	 * same route (triggering revalidation) vs a different route
14	 * (triggering full navigation).
15	 */
16	
17	// ----------------------------------------
18	
19	/**
20	 * Removes query string and hash from a URL
21	 *
22	 * @param url - The URL to process (absolute, relative, or pathname)
23	 * @returns The URL without query string or hash
24	 *
25	 * @example
26	 * ```ts
27	 * removeQueryString('/policy?id=123#section') // '/policy'


========== IMG_4178.md ==========
---
photo: IMG_4178.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 17-43
orientation: 180
confidence: high
notes: Mild motion-blur double-exposure ghosting present (faint duplicate text offset ~2-3 lines below the sharp text) but the sharp/bold layer is clearly distinguishable and was cross-checked at high zoom for lines 35-43. Breadcrumb: aqs-web-ui > src > utils > url-helpers.ts. Explorer sidebar (src/utils expanded) unchanged: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-response.ts, url-helpers.ts (selected), user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts, then app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts. Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", TypeScript, UTF-8, CRLF, Tab Size 4. Single open tab: url-helpers.ts. Line 28's URL string 'https://example.com/page?foo=bar' / 'https://example.com/page' is underlined (auto-linkified by VS Code, not a code error).
---
17	// ----------------------------------------
18	
19	/**
20	 * Removes query string and hash from a URL
21	 *
22	 * @param url - The URL to process (absolute, relative, or pathname)
23	 * @returns The URL without query string or hash
24	 *
25	 * @example
26	 * ```ts
27	 * removeQueryString('/policy?id=123#section') // '/policy'
28	 * removeQueryString('https://example.com/page?foo=bar') // 'https://example.com/page'
29	 * removeQueryString('/path/to/page') // '/path/to/page'
30	 * ```
31	 */
32	export function removeQueryString(url: string): string {
33	    if (!url) return '';
34	
35	    // Handle relative URLs and pathnames
36	    const questionMarkIndex = url.indexOf('?');
37	    const hashIndex = url.indexOf('#');
38	
39	    let endIndex = url.length;
40	
41	    // Find the earliest of ? or # (if they exist)
42	    if (questionMarkIndex !== -1) {
43	        endIndex = questionMarkIndex;


========== IMG_4179.md ==========
---
photo: IMG_4179.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 42-50
orientation: 180
confidence: medium
notes: Photo has motion-blur double-exposure ghosting (same static frame overlapping itself). Overlaps with IMG_4178 for lines 42-43 (consistent). New content here is lines 44-49, the end of the removeQueryString function: closes the questionMarkIndex if-block, then a second if-block for hashIndex, then returns the substring, then closes the function. CORRECTION (post-hoc, via IMG_4180 which shows this same region cleanly/unambiguously): there IS a blank line between the hashIndex if-block's closing brace and the return statement, so the true numbering is 44 "}", 45-47 the hashIndex if-block, 48 blank, 49 "return url.substring(0, endIndex);", 50 "}". The line map below has been corrected to match IMG_4180. Explorer sidebar (src/utils expanded) unchanged: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-response.ts, url-helpers.ts (selected), user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts, then app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts. Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", TypeScript, UTF-8, CRLF, Tab Size 4. Single open tab: url-helpers.ts.
---
42	    if (questionMarkIndex !== -1) {
43	        endIndex = questionMarkIndex;
44	    }
45	    if (hashIndex !== -1 && hashIndex < endIndex) {
46	        endIndex = hashIndex;
47	    }
48	
49	    return url.substring(0, endIndex);
50	}


========== IMG_4180.md ==========
---
photo: IMG_4180.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 44-59
orientation: 180
confidence: high
notes: Mild motion-blur double-exposure ghosting present but the sharp/bold text layer is clearly distinguishable and cross-checked. This photo cleanly resolves the exact line numbering for the end of removeQueryString() that was ambiguous in IMG_4179 (confirms a blank line at 48 between the closing brace and the return statement — see correction note added to IMG_4179's transcript). Lines 51-59 begin the JSDoc comment for the next function (normalizeUrl, based on the doc text — name not yet visible, continues in a later photo). Breadcrumb: aqs-web-ui > src > utils > url-helpers.ts. Explorer sidebar (src/utils expanded) unchanged: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-response.ts, url-helpers.ts (selected), user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts, then app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts. Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", TypeScript, UTF-8, CRLF, Tab Size 4. Single open tab: url-helpers.ts.
---
44	    }
45	    if (hashIndex !== -1 && hashIndex < endIndex) {
46	        endIndex = hashIndex;
47	    }
48	
49	    return url.substring(0, endIndex);
50	}
51	
52	/**
53	 * Normalizes a URL for consistent comparison
54	 *
55	 * - Removes query strings and hash fragments
56	 * - Strips trailing slashes
57	 * - Converts to lowercase (case-insensitive comparison)
58	 * - Handles both absolute URLs and pathnames
59	 *


========== IMG_4182.md ==========
---
photo: IMG_4182.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 58-85
orientation: 180
confidence: low
notes: >
  Photo shows severe double-exposure/ghosting: two captures of the same
  static viewport (scrolled ~2-3 lines apart) appear blended into one frame,
  so most rows show two overlapping copies of text and gutter numbers are
  partly ambiguous. Lines 70-85 (function body) were legible with reasonable
  confidence by cross-referencing multiple crops; the JSDoc block (~58-69)
  content is legible in fragments but exact line-number assignment is
  inferred/best-effort, not directly read. Two fragments show yellow
  underline highlighting (looks like search-match highlighting) under
  '/policy-details' and the 'https://example.com/page' example strings.
  Tab bar: single tab "url-helpers.ts" (no unsaved dot). Breadcrumb:
  aqs-web-ui > src > utils > url-helpers.ts > ... (scope name truncated).
  Explorer sidebar (src/utils, expanded): performance-monitor.ts,
  permission-store.ts, pub-sub.ts, required-field-validation.ts,
  session-storage.ts, session-sync.ts, transform-pagebuild-respon...
  (truncated, likely transform-pagebuild-response.ts), url-helpers.ts
  (selected/highlighted), user-permissions.ts, xml-detail-persistence.ts,
  zod-error-formatter.ts; then under src: app.css, app.tsx, context.ts,
  main.tsx, routes.tsx, store.ts, types.ts (cut off at bottom). Below src:
  collapsed OUTLINE, TIMELINE, "C# PROJECT DETAILS" panels. Status bar:
  aqs-web-ui, branch hitanshu/experimental*, 2 errors / 0 warnings,
  "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
(Lines 58-64: JSDoc opening/description — legible in fragments only,
line-number assignment inferred, exact wording of description uncertain)

58   /**
59    * Normalizes a URL for case-insensitive comparison
60    * Removes trailing slashes, query strings, and hash fragments; lowercases pathnames
61    *
62    * @param url - The URL to normalize
63    * @returns Normalized URL string
64    *

(Lines 65-69: JSDoc @example block — legible)

65   * @example
66   * ```ts
67   * normalizeUrl('/Policy-Details/') // '/policy-details'
68   * normalizeUrl('/POLICY?id=123') // '/policy'
69   * normalizeUrl('https://example.com/Page#anchor') // 'https://example.com/page'

(closing of example fence and comment, line numbers uncertain, likely ~70-71)

⟪?⟫  * ```
⟪?⟫  */

(Lines 70-85: function body — legible with reasonable confidence)

70   export function normalizeUrl(url: string): string {
71     if (!url) return '';
72
73     // Remove query string and hash
74     let normalized = removeQueryString(url);
75
76     // Remove trailing slashes (but keep single '/')
77     if (normalized.length > 1 && normalized.endsWith('/')) {
78       normalized = normalized.replace(/\/+$/, '');
79     }
80
81     // Lowercase for case-insensitive comparison
82     normalized = normalized.toLowerCase();
83
84     return normalized;
85   }

(Note: the alternate/ghost overlapping exposure in the photo also shows the
same "let normalized = removeQueryString(url);" line, the same
"if (normalized.length > 1 && normalized.endsWith('/')) { normalized =
normalized.replace(/\/+$/, ''); }" block, and the same "// Lowercase for
case-insensitive comparison" / "normalized = normalized.toLowerCase();" /
"return normalized;" / "}" lines repeated ~2-3 rows lower on screen — this
is the same code re-exposed at a different scroll position, not duplicated
source code. Gutter numbers 70, 74, 81, 82, 85 were the clearest/sharpest
reads and anchor this numbering; 72-73, 75-80, 83-84 are inferred from
standard spacing/code-style around those anchors.)


========== IMG_4181.md ==========
---
photo: IMG_4181.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 60-77
orientation: 180
confidence: high
notes: Photo has motion-blur double-exposure ghosting (same static frame overlapping itself) but the sharp/bold text layer was cross-checked at high zoom across several overlapping crops and is consistent/high-confidence. Overlaps with IMG_4180 for lines 54-59 (JSDoc bullet list for normalizeUrl), not repeated here. This is the JSDoc block and start of the normalizeUrl() function body. The @example URL strings on lines 65/67 are underlined (VS Code auto-linkification, not an error). Explorer sidebar (src/utils expanded) unchanged: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-response.ts, url-helpers.ts (selected), user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts, then app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts. Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", TypeScript, UTF-8, CRLF, Tab Size 4. Single open tab: url-helpers.ts.
---
60	 * @param url - The URL to normalize
61	 * @returns Normalized URL string
62	 *
63	 * @example
64	 * ```ts
65	 * normalizeUrl('/Policy-Details/') // '/policy-details'
66	 * normalizeUrl('/POLICY?id=123') // '/policy'
67	 * normalizeUrl('https://example.com/Page#anchor') // 'https://example.com/page'
68	 * ```
69	 */
70	export function normalizeUrl(url: string): string {
71	    if (!url) return '';
72	
73	    // Remove query string and hash
74	    let normalized = removeQueryString(url);
75	
76	    // Remove trailing slashes (but keep single '/')
77	    if (normalized.length > 1 && normalized.endsWith('/')) {


========== IMG_4183.md ==========
---
photo: IMG_4183.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 64-91
orientation: 180
confidence: medium
notes: >
  Same file/tab as IMG_4182 (url-helpers.ts), viewport scrolled down a
  little further, same double-exposure/ghosting artifact affecting lines
  ~64-85 (two blended captures of the same static code ~2-3 lines apart).
  Content for lines 70-85 cross-validates exactly against IMG_4182's
  transcript (function body of normalizeUrl), which increases confidence
  in that portion. Lines 64-69 (JSDoc @example block) are legible in
  fragments but the photo shows the three example lines in an order that
  visually conflicts with IMG_4182's ghost layering, so exact line-number
  assignment for 64-69 is still uncertain (content of the three example
  calls - '/Policy-Details/', '/POLICY?id=123', 'https://example.com/Page#anchor'
  - is confirmed, order/line numbers are not). Lines 86-90 are NEW content
  not visible in IMG_4182, and are sharp/unambiguous (no ghosting) - start
  of a new JSDoc block for a second exported function comparing two URLs.
  Line 91 is present but occluded by the status bar ("No Solution" red
  badge) at the bottom edge of the screen and too thin/blurred to read
  reliably. Two fragments show yellow underline (search-match?) highlighting
  under '/policy-details' and the 'https://example.com/page' example
  strings, same as IMG_4182. Explorer sidebar (src/utils, continuing into
  src): pub-sub.ts, required-field-validation.ts, session-storage.ts,
  session-sync.ts, transform-pagebuild-respon... (truncated), url-helpers.ts
  (selected/highlighted), user-permissions.ts, xml-detail-persistence.ts,
  zod-error-formatter.ts, app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts (cut), then collapsed OUTLINE, TIMELINE,
  "C# PROJECT DETAILS" panels. Status bar: aqs-web-ui, branch
  hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1,
  Tab Size 4, UTF-8, CRLF, TypeScript. Single tab "url-helpers.ts" open.
---
(Lines 64-69: JSDoc @example block, content confirmed, order/exact line
numbers uncertain due to ghosting - see notes)

64   ⟪?⟫ (one of the three @example lines below, exact line unclear)
65   ⟪?⟫
66   ⟪?⟫
       * normalizeUrl('/Policy-Details/') // '/policy-details'
       * normalizeUrl('/POLICY?id=123') // '/policy'
       * normalizeUrl('https://example.com/Page#anchor') // 'https://example.com/page'

(Lines 70-85: function body — cross-validated against IMG_4182, high
confidence within this photo)

70   export function normalizeUrl(url: string): string {
71     if (!url) return '';
72
73     // Remove query string and hash
74     let normalized = removeQueryString(url);
75
76     // Remove trailing slashes (but keep single '/')
77     if (normalized.length > 1 && normalized.endsWith('/')) {
78       normalized = normalized.replace(/\/+$/, '');
79     }
80
81     // Lowercase for case-insensitive comparison
82     normalized = normalized.toLowerCase();
83
84     return normalized;
85   }

(Lines 86-91: NEW content, start of next function's JSDoc — sharp/legible)

86
87   /**
88    * Compares two URLs to determine if they represent the same route
89    *
90    * This function:
91   ⟪?⟫ (occluded by status bar / too blurred to read reliably)


========== IMG_4184.md ==========
---
photo: IMG_4184.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 85-112
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_4182/IMG_4183 (url-helpers.ts), scrolled further
  down. This photo is sharp with no double-exposure/ghosting (unlike
  IMG_4182/IMG_4183) — clean, high-confidence read. Confirms and clarifies
  the JSDoc block that was only partially visible/occluded in IMG_4183
  (lines 87-90 match; line 91 "Ignores query parameters and hash fragments"
  now fully legible, resolving that photo's ⟪?⟫). Shows the full JSDoc for
  a new exported function `isSameRoute` plus its signature and first two
  body lines. Line 112 is partially cut off by the red "No Solution" status
  bar badge at the very bottom edge of the screen but is still legible.
  Explorer sidebar (src/utils, then src): performance-monitor.ts,
  permission-store.ts, pub-sub.ts, required-field-validation.ts,
  session-storage.ts, session-sync.ts, transform-pagebuild-respon...
  (truncated), url-helpers.ts (selected/highlighted), user-permissions.ts,
  xml-detail-persistence.ts, zod-error-formatter.ts, app.css, app.tsx,
  context.ts, main.tsx, routes.tsx, store.ts, types.ts (cut off at very
  bottom, only "TS t...s" visible). Below src: collapsed OUTLINE, TIMELINE,
  "C# PROJECT DETAILS" panels. Tab bar: single tab "url-helpers.ts" (no
  unsaved dot). Breadcrumb: aqs-web-ui > src > utils > url-helpers.ts > ...
  Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors /
  0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript. URL 'https://example.com/page' in the JSDoc example (line
  105) is underlined (looks like a clickable-link decoration, not a search
  highlight, since it's not yellow-boxed here unlike IMG_4182/4183).
---
85   }
86
87   /**
88    * Compares two URLs to determine if they represent the same route
89    *
90    * This function:
91    * - Ignores query parameters and hash fragments
92    * - Ignores trailing slashes
93    * - Performs case-insensitive comparison
94    * - Handles both absolute URLs and pathnames
95    *
96    * @param url1 - First URL to compare
97    * @param url2 - Second URL to compare
98    * @returns true if both URLs represent the same route
99    *
100   * @example
101   * ```ts
102   * isSameRoute('/policy?id=123', '/policy?id=456') // true (same route, different params)
103   * isSameRoute('/Policy/', '/policy') // true (case insensitive, trailing slash)
104   * isSameRoute('/dashboard', '/policy') // false (different routes)
105   * isSameRoute('https://example.com/page', '/page') // false (different origins)
106   * ```
107   */
108  export function isSameRoute(url1: string, url2: string): boolean {
109    if (!url1 || !url2) return false;
110
111    const normalized1 = normalizeUrl(url1);
112    const normalized2 = normalizeUrl(url2);


========== IMG_4185.md ==========
---
photo: IMG_4185.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 93-119
orientation: 180
confidence: high
notes: >
  Same file/tab as prior photos in this sequence (url-helpers.ts), scrolled
  further down. Mostly sharp; lines 93-99 have a faint ghost overlay
  (light double-exposure, content still legible) while lines 100-119 are
  fully crisp. Cross-validates cleanly against IMG_4184 for the overlapping
  lines 93-108 (identical content) and resolves IMG_4184's partially-cut
  line 112 ("const normalized2 = normalizeUrl(url2);" now fully confirmed
  clean). Shows the complete body of isSameRoute (108-115) and the opening
  of a new JSDoc block "Parsed URL information" (117-119) for what is
  presumably a parseUrl function/type starting at line ~120 (not yet
  visible - cut off at the very bottom of the screen). Explorer sidebar
  (src/utils, then src): performance-monitor.ts, permission-store.ts,
  pub-sub.ts, required-field-validation.ts, session-storage.ts,
  session-sync.ts, transform-pagebuild-respon... (truncated),
  url-helpers.ts (selected/highlighted), user-permissions.ts,
  xml-detail-persistence.ts, zod-error-formatter.ts, app.css, app.tsx,
  context.ts, main.tsx, routes.tsx, store.ts, then collapsed OUTLINE,
  TIMELINE, "C# PROJECT DETAILS" panels. Tab bar: single tab
  "url-helpers.ts" (no unsaved dot). Breadcrumb: aqs-web-ui > src > utils >
  url-helpers.ts > ... Status bar: aqs-web-ui, branch
  hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1,
  Tab Size 4, UTF-8, CRLF, TypeScript. URL 'https://example.com/page' in
  the JSDoc example (line 105) is underlined (link decoration).
---
93    * - Performs case-insensitive comparison
94    * - Handles both absolute URLs and pathnames
95    *
96    * @param url1 - First URL to compare
97    * @param url2 - Second URL to compare
98    * @returns true if both URLs represent the same route
99    *
100   * @example
101   * ```ts
102   * isSameRoute('/policy?id=123', '/policy?id=456') // true (same route, different params)
103   * isSameRoute('/Policy/', '/policy') // true (case insensitive, trailing slash)
104   * isSameRoute('/dashboard', '/policy') // false (different routes)
105   * isSameRoute('https://example.com/page', '/page') // false (different origins)
106   * ```
107   */
108  export function isSameRoute(url1: string, url2: string): boolean {
109    if (!url1 || !url2) return false;
110
111    const normalized1 = normalizeUrl(url1);
112    const normalized2 = normalizeUrl(url2);
113
114    return normalized1 === normalized2;
115  }
116
117  /**
118   * Parsed URL information
119   */


========== IMG_4186.md ==========
---
photo: IMG_4186.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 104-130
orientation: 180
confidence: high
notes: >
  Same file/tab as prior photos (url-helpers.ts), scrolled further down.
  Sharp/legible; a faint ghost of the isSameRoute body is visible behind
  lines 108-115 (same double-exposure pattern as earlier photos) but does
  not obscure the primary text. Cross-validates exactly against
  IMG_4184/IMG_4185 for the overlapping isSameRoute lines. New content:
  the full `RouteInfo` interface declaration (120-130+, continues past
  bottom of visible area). Explorer sidebar (src/utils, then src):
  performance-monitor.ts, permission-store.ts, pub-sub.ts,
  required-field-validation.ts, session-storage.ts, session-sync.ts,
  transform-pagebuild-respon... (truncated), url-helpers.ts
  (selected/highlighted), user-permissions.ts, xml-detail-persistence.ts,
  zod-error-formatter.ts, app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, then collapsed OUTLINE, TIMELINE,
  "C# PROJECT DETAILS" panels. Tab bar: single tab "url-helpers.ts" (no
  unsaved dot). Breadcrumb: aqs-web-ui > src > utils > url-helpers.ts > ...
  Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors /
  0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript. URL 'https://example.com/page' in JSDoc example (line 105)
  underlined (link decoration).
---
104   * isSameRoute('/dashboard', '/policy') // false (different routes)
105   * isSameRoute('https://example.com/page', '/page') // false (different origins)
106   * ```
107   */
108  export function isSameRoute(url1: string, url2: string): boolean {
109    if (!url1 || !url2) return false;
110
111    const normalized1 = normalizeUrl(url1);
112    const normalized2 = normalizeUrl(url2);
113
114    return normalized1 === normalized2;
115  }
116
117  /**
118   * Parsed URL information
119   */
120  export interface RouteInfo {
121    /** Full pathname (e.g., '/policy-details') */
122    pathname: string;
123    /** Query string without '?' (e.g., 'id=123&tab=2') */
124    queryString: string;
125    /** Hash fragment without '#' (e.g., 'section-1') */
126    hash: string;
127    /** Parsed query parameters as key-value object */
128    params: Record<string, string>;
129    /** Normalized pathname for comparison (lowercase, no trailing slash) */
130    normalizedPath: string;


========== IMG_4187.md ==========
---
photo: IMG_4187.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 117-143
orientation: 180
confidence: high
notes: >
  Same file/tab as prior photos (url-helpers.ts), scrolled further down.
  Sharp/legible throughout (faint ghost near 128-131 does not obscure
  text). Cross-validates exactly against IMG_4186 for the overlapping
  RouteInfo interface (117-130). New content: closing brace of RouteInfo
  (131) and the opening of a new JSDoc block (133-143) describing a
  function that "Extracts and parses URL components for smart navigation
  logic" - likely a parseUrl() function whose signature appears below the
  visible area. Explorer sidebar (src/utils, then src): performance-
  monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts,
  session-storage.ts, session-sync.ts, transform-pagebuild-respon...
  (truncated), url-helpers.ts (selected/highlighted), user-permissions.ts,
  xml-detail-persistence.ts, zod-error-formatter.ts, app.css, app.tsx,
  context.ts, main.tsx, routes.tsx, store.ts, then collapsed OUTLINE,
  TIMELINE, "C# PROJECT DETAILS" panels. Tab bar: single tab
  "url-helpers.ts" (no unsaved dot). Breadcrumb: aqs-web-ui > src > utils >
  url-helpers.ts > ... Status bar: aqs-web-ui, branch
  hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1,
  Tab Size 4, UTF-8, CRLF, TypeScript.
---
117  /**
118   * Parsed URL information
119   */
120  export interface RouteInfo {
121    /** Full pathname (e.g., '/policy-details') */
122    pathname: string;
123    /** Query string without '?' (e.g., 'id=123&tab=2') */
124    queryString: string;
125    /** Hash fragment without '#' (e.g., 'section-1') */
126    hash: string;
127    /** Parsed query parameters as key-value object */
128    params: Record<string, string>;
129    /** Normalized pathname for comparison (lowercase, no trailing slash) */
130    normalizedPath: string;
131  }
132
133  /**
134   * Extracts and parses URL components for smart navigation logic
135   *
136   * Parses a URL into its constituent parts and provides:
137   * - Pathname
138   * - Query string and parsed parameters
139   * - Hash fragment
140   * - Normalized path for comparison
141   *
142   * Handles both absolute URLs and relative pathnames.
143   *


========== IMG_4188.md ==========
---
photo: IMG_4188.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 120-146
orientation: 180
confidence: high
notes: >
  Same file/tab as prior photos (url-helpers.ts), scrolled slightly further
  than IMG_4187. Double-exposure ghosting present (two overlapping captures
  offset by ~13 rows/lines), but the primary (bold/high-contrast) text
  layer is legible and cross-validates exactly against IMG_4186/IMG_4187
  for the overlapping RouteInfo interface and parseUrl JSDoc content
  (120-143). New confirmed content: JSDoc continues with @param and
  @returns tags (144-146); line 146 ("*") is the last line visible before
  the screen is cut off by the status bar. Explorer sidebar (src/utils,
  then src): performance-monitor.ts, permission-store.ts, pub-sub.ts,
  required-field-validation.ts, session-storage.ts, session-sync.ts,
  transform-pagebuild-respon... (truncated), url-helpers.ts
  (selected/highlighted), user-permissions.ts, xml-detail-persistence.ts,
  zod-error-formatter.ts, app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, then collapsed OUTLINE, TIMELINE,
  "C# PROJECT DETAILS" panels. Tab bar: single tab "url-helpers.ts" (no
  unsaved dot). Breadcrumb: aqs-web-ui > src > utils > url-helpers.ts > ...
  Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors /
  0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript.
---
120  export interface RouteInfo {
121    /** Full pathname (e.g., '/policy-details') */
122    pathname: string;
123    /** Query string without '?' (e.g., 'id=123&tab=2') */
124    queryString: string;
125    /** Hash fragment without '#' (e.g., 'section-1') */
126    hash: string;
127    /** Parsed query parameters as key-value object */
128    params: Record<string, string>;
129    /** Normalized pathname for comparison (lowercase, no trailing slash) */
130    normalizedPath: string;
131  }
132
133  /**
134   * Extracts and parses URL components for smart navigation logic
135   *
136   * Parses a URL into its constituent parts and provides:
137   * - Pathname
138   * - Query string and parsed parameters
139   * - Hash fragment
140   * - Normalized path for comparison
141   *
142   * Handles both absolute URLs and relative pathnames.
143   *
144   * @param url - The URL to parse (absolute, relative, or pathname)
145   * @returns Parsed route information
146   *


========== IMG_4189.md ==========
---
photo: IMG_4189.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 135-162
orientation: 180
confidence: high
notes: >
  Same file/tab as prior photos (url-helpers.ts), scrolled further down.
  Sharp/legible throughout lines 135-161 (only very faint ghosting at the
  bottom edge for 162). Cross-validates exactly against IMG_4187/IMG_4188
  for the overlapping JSDoc lines 135-146. New content: full @example
  block with an inline sample call and its "return value" shown as
  commented-out object literal (149-156), end of JSDoc (157-158), and the
  `extractRouteInfo` function signature plus opening of an `if (!url)`
  guard clause (159-161). Line 162 was only faintly legible through
  ghosting in this photo, but is confirmed by IMG_4190 (same function,
  sharp/clean) as "pathname: '',' - the start of an empty RouteInfo
  object literal returned by the !url guard clause. Explorer sidebar
  (src/utils, then src):
  performance-monitor.ts, permission-store.ts, pub-sub.ts,
  required-field-validation.ts, session-storage.ts, session-sync.ts,
  transform-pagebuild-respon... (truncated), url-helpers.ts
  (selected/highlighted), user-permissions.ts, xml-detail-persistence.ts,
  zod-error-formatter.ts, app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, then collapsed OUTLINE, TIMELINE,
  "C# PROJECT DETAILS" panels. Tab bar: single tab "url-helpers.ts" (no
  unsaved dot). Breadcrumb: aqs-web-ui > src > utils > url-helpers.ts > ...
  Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors /
  0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript.
---
135   *
136   * Parses a URL into its constituent parts and provides:
137   * - Pathname
138   * - Query string and parsed parameters
139   * - Hash fragment
140   * - Normalized path for comparison
141   *
142   * Handles both absolute URLs and relative pathnames.
143   *
144   * @param url - The URL to parse (absolute, relative, or pathname)
145   * @returns Parsed route information
146   *
147   * @example
148   * ```ts
149   * const info = extractRouteInfo('/policy-details?id=123&tab=2#summary');
150   * // {
151   * //   pathname: '/policy-details',
152   * //   queryString: 'id=123&tab=2',
153   * //   hash: 'summary',
154   * //   params: { id: '123', tab: '2' },
155   * //   normalizedPath: '/policy-details'
156   * // }
157   * ```
158   */
159  export function extractRouteInfo(url: string): RouteInfo {
160    if (!url) {
161      return {
162      pathname: '',


========== IMG_4190.md ==========
---
photo: IMG_4190.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 140-167
orientation: 180
confidence: high
notes: >
  Same file/tab as prior photos (url-helpers.ts), scrolled slightly further
  than IMG_4189. Double-exposure ghosting affects roughly lines 135-158
  (two overlapping captures ~13 lines apart, same pattern as IMG_4188), but
  the primary/bold text layer cross-validates exactly against
  IMG_4187-IMG_4189 for that range. Lines 159-167 are sharp/clean with no
  ghosting. New confirmed content: the full body of the `if (!url)` guard
  clause in extractRouteInfo, returning a default/empty RouteInfo object
  literal (162-167) - this resolves the faint line 162 in IMG_4189
  ("pathname: '',"). Explorer sidebar (src/utils, then src): performance-
  monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts,
  session-storage.ts, session-sync.ts, transform-pagebuild-respon...
  (truncated), url-helpers.ts (selected/highlighted), user-permissions.ts,
  xml-detail-persistence.ts, zod-error-formatter.ts, app.css, app.tsx,
  context.ts, main.tsx, routes.tsx, store.ts, then collapsed OUTLINE,
  TIMELINE, "C# PROJECT DETAILS" panels. Tab bar: single tab
  "url-helpers.ts" (no unsaved dot). Breadcrumb: aqs-web-ui > src > utils >
  url-helpers.ts > ... Status bar: aqs-web-ui, branch
  hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1,
  Tab Size 4, UTF-8, CRLF, TypeScript.
---
(Lines 140-158: JSDoc for extractRouteInfo — cross-validated against
IMG_4187/IMG_4188/IMG_4189, faint ghosting present but content matches;
line numbers taken from IMG_4189's higher-confidence read of the same
content since this photo's gutter digits are less reliable in the
ghosted region)

140   * - Normalized path for comparison
141   *
142   * Handles both absolute URLs and relative pathnames.
143   *
144   * @param url - The URL to parse (absolute, relative, or pathname)
145   * @returns Parsed route information
146   *
147   * @example
148   * ```ts
149   * const info = extractRouteInfo('/policy-details?id=123&tab=2#summary');
150   * // {
151   * //   pathname: '/policy-details',
152   * //   queryString: 'id=123&tab=2',
153   * //   hash: 'summary',
154   * //   params: { id: '123', tab: '2' },
155   * //   normalizedPath: '/policy-details'
156   * // }
157   * ```
158   */

(Lines 159-167: sharp, high confidence)

159  export function extractRouteInfo(url: string): RouteInfo {
160    if (!url) {
161      return {
162        pathname: '',
163        queryString: '',
164        hash: '',
165        params: {},
166        normalizedPath: '',
167      };


========== IMG_4191.md ==========
---
photo: IMG_4191.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 159-185
orientation: 180
confidence: high
notes: >
  Same file/tab as prior photos (url-helpers.ts), scrolled further down.
  Lines 159-169 are sharp/clean and cross-validate exactly against
  IMG_4190 (the `if (!url)` guard clause of extractRouteInfo). Lines
  170-185 have double-exposure ghosting (~2-3 line offset) but the primary
  bold text layer is legible and internally consistent - reconstructed
  with confidence by cross-referencing multiple crops. Shows local
  variable declarations (pathname, queryString, hash, params) and the
  start of a try block that parses the URL as absolute first using
  `new URL(url, 'http://dummy.com')`, extracting pathname/query/hash, then
  iterating urlObj.searchParams into the params record. The try block is
  not yet closed/caught in this photo (continues below, cut off by status
  bar). 'http://dummy.com' string is underlined (link decoration).
  Explorer sidebar (src/utils, then src): performance-monitor.ts,
  permission-store.ts, pub-sub.ts, required-field-validation.ts,
  session-storage.ts, session-sync.ts, transform-pagebuild-respon...
  (truncated), url-helpers.ts (selected/highlighted), user-permissions.ts,
  xml-detail-persistence.ts, zod-error-formatter.ts, app.css, app.tsx,
  context.ts, main.tsx, routes.tsx, store.ts, then collapsed OUTLINE,
  TIMELINE, "C# PROJECT DETAILS" panels. Tab bar: single tab
  "url-helpers.ts" (no unsaved dot). Breadcrumb: aqs-web-ui > src > utils >
  url-helpers.ts > ... Status bar: aqs-web-ui, branch
  hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1,
  Tab Size 4, UTF-8, CRLF, TypeScript.
---
159  export function extractRouteInfo(url: string): RouteInfo {
160    if (!url) {
161      return {
162        pathname: '',
163        queryString: '',
164        hash: '',
165        params: {},
166        normalizedPath: '',
167      };
168    }
169
170    let pathname = '';
171    let queryString = '';
172    let hash = '';
173    const params: Record<string, string> = {};
174
175    try {
176      // Try parsing as absolute URL first
177      const urlObj = new URL(url, 'http://dummy.com');
178      pathname = urlObj.pathname;
179      queryString = urlObj.search ? urlObj.search.substring(1) : ''; // Remove leading '?'
180      hash = urlObj.hash ? urlObj.hash.substring(1) : ''; // Remove leading '#'
181
182      // Parse query parameters
183      urlObj.searchParams.forEach((value, key) => {
184        params[key] = value;
185      });


========== IMG_4194.md ==========
---
photo: IMG_4194.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 159, 191-217
orientation: 180
confidence: medium
notes: Sticky-scroll header at top shows line 159 (function declaration) while viewport shows lines ~191-217. Photo has a double-exposure/motion-blur ghosting artifact overlapping the text (looks like two slightly offset copies of the same code), but line numbers and text are still legible. Breadcrumb: aqs-web-ui > src > utils > url-helpers.ts > extractRouteInfo. Only tab open: url-helpers.ts. Explorer sidebar (utils folder expanded) shows: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...(truncated, likely transform-pagebuild-response).ts, url-helpers.ts (selected/highlighted), user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts. Root of src also shows: app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts, and a cut-off types.ts. Status bar: branch hitanshu/experimental (dirty, asterisk), 2 errors / 0 warnings, "No Solution". Cursor at Ln 1, Col 1 (editor not focused on visible code). Workspace: AQS_WORKSPACE (aqs-web-ui).
---
159   export function extractRouteInfo(url: string): RouteInfo {
191   // Extract pathname
192       if (questionMarkIndex !== -1) {
193         pathname = url.substring(0, questionMarkIndex);
194       } else if (hashIndex !== -1) {
195         pathname = url.substring(0, hashIndex);
196       } else {
197         pathname = url;
198       }
199
200       // Extract query string
201       if (questionMarkIndex !== -1) {
202         const queryEnd = hashIndex !== -1 ? hashIndex : url.length;
203         queryString = url.substring(questionMarkIndex + 1, queryEnd);
204
205         // Parse query parameters manually
206         queryString.split('&').forEach((pair) => {
207           const [key, value] = pair.split('=');
208           if (key) {
209             params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
210           }
211         });
212       }
213
214       // Extract hash
215       if (hashIndex !== -1) {
216         hash = url.substring(hashIndex + 1);
217       }


========== IMG_4195.md ==========
---
photo: IMG_4195.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 159, 194-219
orientation: 180
confidence: medium
notes: Same file/tab as IMG_4194 (url-helpers.ts), scrolled down a few lines. Sticky-scroll header still shows line 159 (function extractRouteInfo). Photo again shows a double-exposure/motion-blur ghosting artifact (each line appears to have a faint duplicate offset slightly below/right), consistent with the screen having been mid-scroll when photographed. Lines 194-217 match the content already seen clearly in IMG_4194 (lines 191-217), confirming the reading. Line 218 shows a bold "}" in a distinct (magenta) bracket color, which most likely closes the extractRouteInfo function opened at line 159. Line 219's visible text "hash = url.substring(hashIndex + 1);" is identical to line 216 and is suspected to be a ghosting/motion-blur artifact rather than genuine distinct source code (it would be out of scope after the function-closing brace); recorded as seen but flagged low-confidence. Breadcrumb: aqs-web-ui > src > utils > url-helpers.ts > extractRouteInfo. Explorer sidebar (utils folder) shows same file list as IMG_4194: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...ts, url-helpers.ts (selected), user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts. Root of src also shows app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts. Status bar: branch hitanshu/experimental (dirty, asterisk), 2 errors / 0 warnings, "No Solution". Cursor at Ln 1, Col 1.
---
159   export function extractRouteInfo(url: string): RouteInfo {
194       } else if (hashIndex !== -1) {
195         pathname = url.substring(0, hashIndex);
196       } else {
197         pathname = url;
198       }
199
200       // Extract query string
201       if (questionMarkIndex !== -1) {
202         const queryEnd = hashIndex !== -1 ? hashIndex : url.length;
203         queryString = url.substring(questionMarkIndex + 1, queryEnd);
204
205         // Parse query parameters manually
206         queryString.split('&').forEach((pair) => {
207           const [key, value] = pair.split('=');
208           if (key) {
209             params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
210           }
211         });
212       }
213
214       // Extract hash
215       if (hashIndex !== -1) {
216         hash = url.substring(hashIndex + 1);
217       }
218   }
219   hash = url.substring(hashIndex + 1);  ⟪? — likely ghosting artifact, see notes⟫


========== IMG_4196.md ==========
---
photo: IMG_4196.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 159, 206-228
orientation: 180
confidence: medium
notes: Same file/tab as IMG_4194/IMG_4195 (url-helpers.ts), scrolled further down to reveal the end of extractRouteInfo. Sticky-scroll header still shows line 159. Lines 206-217 repeat content already confirmed in IMG_4194/IMG_4195 (query-string parsing loop and hash extraction) and are consistent here. New content revealed: line 218 is a bare "}" in a distinct bracket color — likely closes an earlier wrapping block (e.g. a guard "if (url) {" opened above the visible range, around where pathname/query/hash extraction begins), NOT the function itself, since the function's return statement follows at line 220 and the function's own closing brace appears at line 227. Lines 220-226 are a return statement building a RouteInfo object: { pathname, queryString, hash, params, normalizedPath: normalizeUrl(pathname) }. Photo again shows the double-exposure/motion-blur ghosting artifact seen in the prior two photos in this sequence (faint duplicate of lines 208-227 offset down/right, and gutter numbers 227/228 appear a second time, fainter, near the bottom edge) — treated as camera artifact, not real duplicate code. Breadcrumb: aqs-web-ui > src > utils > url-helpers.ts. Explorer sidebar (utils folder) unchanged: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...ts, url-helpers.ts (selected), user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts. Status bar: branch hitanshu/experimental (dirty, asterisk), 2 errors / 0 warnings, "No Solution". Cursor at Ln 1, Col 1.
---
159   export function extractRouteInfo(url: string): RouteInfo {
206       queryString.split('&').forEach((pair) => {
207         const [key, value] = pair.split('=');
208         if (key) {
209           params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
210         }
211       });
212       }
213
214       // Extract hash
215       if (hashIndex !== -1) {
216         hash = url.substring(hashIndex + 1);
217       }
218   }
219
220       return {
221         pathname,
222         queryString,
223         hash,
224         params,
225         normalizedPath: normalizeUrl(pathname),
226       };
227   }
228


========== IMG_4192.md ==========
---
photo: IMG_4192.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 170-196
orientation: 180
confidence: high
notes: >
  Same file/tab as prior photos (url-helpers.ts), scrolled further down.
  Sharp/clean throughout (only very faint ghosting near 181-186, does not
  obscure text). Sticky-scroll header at top shows enclosing scope:
  "159  export function extractRouteInfo(url: string): RouteInfo {".
  Cross-validates exactly against IMG_4191 for lines 170-185. New content:
  the `catch` block of the try/catch in extractRouteInfo - when URL
  parsing fails (e.g. a bare pathname without an origin), it falls back to
  manually locating '?' and '#' in the raw url string via indexOf, then
  derives pathname accordingly via an if/else-if/else chain (186-196).
  Line 196 was cut off / only faintly visible at the very bottom edge of
  the screen here, but is confirmed by IMG_4193 (same function, sharp) as
  "} else {" - closing the else-if and opening a final else branch.
  Explorer sidebar
  (src/utils, then src): performance-monitor.ts, permission-store.ts,
  pub-sub.ts, required-field-validation.ts, session-storage.ts,
  session-sync.ts, transform-pagebuild-respon... (truncated),
  url-helpers.ts (selected/highlighted), user-permissions.ts,
  xml-detail-persistence.ts, zod-error-formatter.ts, app.css, app.tsx,
  context.ts, main.tsx, routes.tsx, store.ts, then collapsed OUTLINE,
  TIMELINE, "C# PROJECT DETAILS" panels. Tab bar: single tab
  "url-helpers.ts" (no unsaved dot). Breadcrumb: aqs-web-ui > src > utils >
  url-helpers.ts > ... Status bar: aqs-web-ui, branch
  hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1,
  Tab Size 4, UTF-8, CRLF, TypeScript. 'http://dummy.com' string
  underlined (link decoration).
---
(sticky scroll header: "159  export function extractRouteInfo(url: string): RouteInfo {")

170    let pathname = '';
171    let queryString = '';
172    let hash = '';
173    const params: Record<string, string> = {};
174
175    try {
176      // Try parsing as absolute URL first
177      const urlObj = new URL(url, 'http://dummy.com');
178      pathname = urlObj.pathname;
179      queryString = urlObj.search ? urlObj.search.substring(1) : ''; // Remove leading '?'
180      hash = urlObj.hash ? urlObj.hash.substring(1) : ''; // Remove leading '#'
181
182      // Parse query parameters
183      urlObj.searchParams.forEach((value, key) => {
184        params[key] = value;
185      });
186    } catch {
187      // If URL parsing fails, treat as pathname and manually parse
188      const questionMarkIndex = url.indexOf('?');
189      const hashIndex = url.indexOf('#');
190
191      // Extract pathname
192      if (questionMarkIndex !== -1) {
193        pathname = url.substring(0, questionMarkIndex);
194      } else if (hashIndex !== -1) {
195        pathname = url.substring(0, hashIndex);
196    } else {


========== IMG_4193.md ==========
---
photo: IMG_4193.JPG
type: vscode-code
file: aqs-web-ui/src/utils/url-helpers.ts
lines: 176-201
orientation: 180
confidence: high
notes: >
  Same file/tab as prior photos (url-helpers.ts), scrolled slightly
  further than IMG_4192. Sharp/clean throughout (faint ghost overlay
  visible behind 181-198 from a slight double-exposure, but does not
  obscure the primary text). Sticky-scroll header at top shows enclosing
  scope: "159  export function extractRouteInfo(url: string): RouteInfo {".
  Cross-validates exactly against IMG_4191/IMG_4192 for the overlapping
  lines 176-192, and resolves IMG_4192's cut-off line 196 ("} else {").
  New content: completes the else-if/else chain for pathname extraction
  (194-198) and starts a second if-block for extracting the query string
  (200-201), which continues below the visible area (last photo in this
  sequence). Explorer sidebar (src/utils, then src): performance-
  monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts,
  session-storage.ts, session-sync.ts, transform-pagebuild-respon...
  (truncated), url-helpers.ts (selected/highlighted), user-permissions.ts,
  xml-detail-persistence.ts, zod-error-formatter.ts, app.css, app.tsx,
  context.ts, main.tsx, routes.tsx, store.ts, then collapsed OUTLINE,
  TIMELINE, "C# PROJECT DETAILS" panels. Tab bar: single tab
  "url-helpers.ts" (no unsaved dot). Breadcrumb: aqs-web-ui > src > utils >
  url-helpers.ts > ... Status bar: aqs-web-ui, branch
  hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1,
  Tab Size 4, UTF-8, CRLF, TypeScript. 'http://dummy.com' string
  underlined (link decoration).
---
(sticky scroll header: "159  export function extractRouteInfo(url: string): RouteInfo {")

176      // Try parsing as absolute URL first
177      const urlObj = new URL(url, 'http://dummy.com');
178      pathname = urlObj.pathname;
179      queryString = urlObj.search ? urlObj.search.substring(1) : ''; // Remove leading '?'
180      hash = urlObj.hash ? urlObj.hash.substring(1) : ''; // Remove leading '#'
181
182      // Parse query parameters
183      urlObj.searchParams.forEach((value, key) => {
184        params[key] = value;
185      });
186    } catch {
187      // If URL parsing fails, treat as pathname and manually parse
188      const questionMarkIndex = url.indexOf('?');
189      const hashIndex = url.indexOf('#');
190
191      // Extract pathname
192      if (questionMarkIndex !== -1) {
193        pathname = url.substring(0, questionMarkIndex);
194      } else if (hashIndex !== -1) {
195        pathname = url.substring(0, hashIndex);
196      } else {
197        pathname = url;
198      }
199
200      // Extract query string
201      if (questionMarkIndex !== -1) {
