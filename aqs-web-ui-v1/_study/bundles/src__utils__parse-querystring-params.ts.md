# BUNDLE for src/utils/parse-querystring-params.ts
# 26 photo fragment(s), ascending start-line order.


========== IMG_3978.md ==========
---
photo: IMG_3978.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 1-27
orientation: 180
confidence: high
notes: Breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts > .... Explorer sidebar (src/utils, parse-querystring-params.ts selected) shows siblings: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, "normalize-service-config cop..." (copy file), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts (highlighted), performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", 2 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. File starts at line 1 (top of file, full JSDoc header visible).
---
1    /**
2     * @file parse-querystring-params.ts
3     * @description Extract canonical session parameters from cycling API querystring responses
4     *
5     * **CRITICAL PATTERN**: In legacy VBScript, each page reads session values from its own
6     * URL querystring parameters, NOT from parent window variables. ExecuteAction calls
7     * XmlCycling.aspx which returns updated session values in querystring format.
8     *
9     * Legacy Reference:
10    * - Main_ISLLSYS_20010101.asp lines 23-30: ASP reads Request.QueryString("Action")
11    * - XmlCycling.aspx lines 376-410: Server builds querystring with updated values
12    * - ExecuteAction lines 1569-1575: Updates mstrXMLDetail from response querystring
13    *
14    * @example
15    * ```typescript
16    * // Cycling response includes:
17    * // queryString: "../../pol/xml/Rlv.aspx?action=RATELEVEL&policyid=487672&nodekey=POL|POL|0|"
18    *
19    * const params = parseQueryStringParams(response.queryString);
20    * // Returns: { action: "RATELEVEL", policyId: "487672", nodeKey: "POL|POL|0|" }
21    * ```
22    */
23
24   import type { NavigationContextValue } from '@/context';
25   import { createFeatureLogger } from '@utils/logger-builder';
26
27   const logger = createFeatureLogger('navigation', 'parse-querystring-params');


========== IMG_3979.md ==========
---
photo: IMG_3979.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 1-33
orientation: 180
confidence: low
notes: Motion-blur / double-exposure photo — camera captured mid-scroll so two slightly offset scroll positions of the SAME file are superimposed (ghosting), making most of the frame doubled/hard to read. Content and file match IMG_3978 (parse-querystring-params.ts) almost exactly for lines 1-27; this photo additionally reveals lines 28-33 at the bottom of one exposure layer, confirmed via cropped zoom. Line 33 is cut off/occluded by the Windows taskbar at the very bottom edge. Breadcrumb: aqs-web-ui > src > utils > parse-querystring-params.ts > .... Explorer sidebar identical file list to IMG_3978 (utils folder), parse-querystring-params.ts selected. Status bar: branch "hitanshu/experimental*", 2 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8.
---
(Lines 1-27 duplicate IMG_3978 content — see that transcript for the full JSDoc header, imports, and `const logger = createFeatureLogger('navigation', 'parse-querystring-params');`)

27   const logger = createFeatureLogger('navigation', 'parse-querystring-params');
28
29   /**
30    * Canonical parameters that must be extracted from cycling queryString
31    * Matches legacy marrSessionInformation array structure:
32    * - [0]: compLoc (from Application)
33    * - [1]: use⟪?⟫ (obscured by taskbar, likely "userId")


========== IMG_3980.md ==========
---
photo: IMG_3980.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 14-40
orientation: 180
confidence: high
notes: Breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts > .... Explorer sidebar (src/utils, parse-querystring-params.ts selected) shows same sibling files as IMG_3978/3979. Status bar: branch "hitanshu/experimental*", 2 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. This confirms/clarifies line 33 as "userId" (was uncertain/obscured in IMG_3979) and reveals full canonical-params JSDoc list (lines 30-39) plus start of `export interface CanonicalParams {` at line 40.
---
14   * @example
15   * ```typescript
16   * // Cycling response includes:
17   * // queryString: "../../pol/xml/Rlv.aspx?action=RATELEVEL&policyid=487672&nodekey=POL|POL|0|"
18   *
19   * const params = parseQueryStringParams(response.queryString);
20   * // Returns: { action: "RATELEVEL", policyId: "487672", nodeKey: "POL|POL|0|" }
21   * ```
22   */
23
24   import type { NavigationContextValue } from '@/context';
25   import { createFeatureLogger } from '@utils/logger-builder';
26
27   const logger = createFeatureLogger('navigation', 'parse-querystring-params');
28
29   /**
30    * Canonical parameters that must be extracted from cycling queryString
31    * Matches legacy marrSessionInformation array structure:
32    * - [0]: compLoc (from Application)
33    * - [1]: userId
34    * - [2]: policyId
35    * - [3]: nodeKey
36    * - [4]: action ← CRITICAL: Updated by server
37    * - [5]: diagnosticMode
38    * - [6]: xmlDetail ← CRITICAL: Updated by server
39    */
40   export interface CanonicalParams {


========== IMG_3981.md ==========
---
photo: IMG_3981.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 40-59
orientation: 180
confidence: medium
notes: Photo has slight motion-blur double-exposure (a fainter duplicate of the same text shifted ~2 lines down is visible behind the sharp/bold in-focus text); transcription below follows the sharp/bold layer, cross-checked via zoomed crops. Breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts > .... Explorer sidebar unchanged from prior photos in this file. Status bar: branch "hitanshu/experimental*", 2 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 59 is cut off at the bottom edge of the editor viewport (rest of statement not visible).
---
40   export interface CanonicalParams {
41       action?: string;
42       policyId?: string;
43       nodeKey?: string;
44       userId?: string;
45       compLoc?: string;
46       diagnosticMode?: string;
47       xmlDetail?: string;
48       tab?: string;
49   }
50
51   const EFFECTIVE_COMBINED_ACTIONS = new Set(['RLVUPDATE']);
52
53   function resolveEffectiveAction(rawAction: string): string {
54       const normalized = rawAction.trim().toUpperCase();
55       if (!normalized.includes('|')) {
56           return normalized;
57       }
58
59       const tokens = normalized ⟪?⟫ (line cut off at bottom edge of editor)


========== IMG_3982.md ==========
---
photo: IMG_3982.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 40-66
orientation: 180
confidence: medium
notes: Same motion-blur double-exposure artifact as IMG_3981 (fainter duplicate text shifted down a couple of lines behind the sharp/bold in-focus text); transcribed from the sharp/bold layer, cross-checked via zoomed crops. Lines 40-58 duplicate/confirm IMG_3981; new content is lines 59-66 (token splitting/filtering logic in resolveEffectiveAction). Breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts > .... Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", 2 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
40   export interface CanonicalParams {
41       action?: string;
42       policyId?: string;
43       nodeKey?: string;
44       userId?: string;
45       compLoc?: string;
46       diagnosticMode?: string;
47       xmlDetail?: string;
48       tab?: string;
49   }
50
51   const EFFECTIVE_COMBINED_ACTIONS = new Set(['RLVUPDATE']);
52
53   function resolveEffectiveAction(rawAction: string): string {
54       const normalized = rawAction.trim().toUpperCase();
55       if (!normalized.includes('|')) {
56           return normalized;
57       }
58
59       const tokens = normalized
60           .split('|')
61           .map((token) => token.trim())
62           .filter((token) => token.length > 0);
63
64       if (tokens.length < 2) {
65           return normalized;
66       }


========== IMG_3983.md ==========
---
photo: IMG_3983.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 51-77
orientation: 180
confidence: medium
notes: Same motion-blur double-exposure artifact as IMG_3981/3982 (fainter duplicate text shifted down behind sharp/bold in-focus text); transcribed from the sharp/bold layer, cross-checked via zoomed crops. Lines 51-65 duplicate/confirm IMG_3982; new content is lines 66-77 (end of resolveEffectiveAction: trailingToken logic, combined-actions check, default legacy behavior comment, and start of next JSDoc block at 77). Breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts > .... Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", 2 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
51   const EFFECTIVE_COMBINED_ACTIONS = new Set(['RLVUPDATE']);
52
53   function resolveEffectiveAction(rawAction: string): string {
54       const normalized = rawAction.trim().toUpperCase();
55       if (!normalized.includes('|')) {
56           return normalized;
57       }
58
59       const tokens = normalized
60           .split('|')
61           .map((token) => token.trim())
62           .filter((token) => token.length > 0);
63
64       if (tokens.length < 2) {
65           return normalized;
66       }
67
68       const trailingToken = tokens[tokens.length - 1];
69       if (EFFECTIVE_COMBINED_ACTIONS.has(trailingToken)) {
70           return trailingToken;
71       }
72
73       // Default legacy behavior for button combines, e.g. RATELEVEL|NEXT => RATELEVEL
74       return tokens[0];
75   }
76
77   /**


========== IMG_3984.md ==========
---
photo: IMG_3984.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 53-83
orientation: 180
confidence: high
notes: Sharp/clean photo, no ghosting. Sticky-scroll header shows "53  function resolveEffectiveAction(rawAction: string): string {". Lines 57-75 confirm/duplicate IMG_3982/3983 (end of resolveEffectiveAction). New content: lines 76-83, start of a new JSDoc block (likely for a parseQueryStringParams or similar function) describing the legacy Request.QueryString pattern. Breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts > .... Explorer sidebar unchanged (utils folder). Status bar: branch "hitanshu/experimental*", 2 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
53   function resolveEffectiveAction(rawAction: string): string {
     ⋮ (lines 54-56 not visible — scrolled above viewport, covered by sticky header)
57       }
58
59       const tokens = normalized
60           .split('|')
61           .map((token) => token.trim())
62           .filter((token) => token.length > 0);
63
64       if (tokens.length < 2) {
65           return normalized;
66       }
67
68       const trailingToken = tokens[tokens.length - 1];
69       if (EFFECTIVE_COMBINED_ACTIONS.has(trailingToken)) {
70           return trailingToken;
71       }
72
73       // Default legacy behavior for button combines, e.g. RATELEVEL|NEXT => RATELEVEL
74       return tokens[0];
75   }
76
77   /**
78    * Extract canonical session parameters from cycling API queryString
79    *
80    * **Pattern**: Matches legacy where each page reads from Request.QueryString
81    * Server-side cycling component modifies marrSessionInformation and returns
82    * updated values in querystring. This is the SOURCE OF TRUTH for next action.
83   ⟪?⟫ (line cut off at bottom edge of editor)


========== IMG_3985.md ==========
---
photo: IMG_3985.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 53-90
orientation: 180
confidence: medium
notes: Sticky-scroll header shows "53  function resolveEffectiveAction(rawAction: string): string {". Slight motion-blur double-exposure ghosting in the lines-79-90 region (fainter duplicate shifted ~3 lines behind sharp text); transcribed from the sharp/bold layer, cross-checked via zoomed crops. Lines 65-77 confirm/duplicate IMG_3984. New content: lines 78-90, JSDoc for the parseQueryStringParams function (@param queryString, @returns, @example with sample legacy URL). Breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts > .... Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", 2 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 90 cut off at bottom edge of editor viewport.
---
53   function resolveEffectiveAction(rawAction: string): string {
     ⋮ (lines 54-64 not visible — scrolled above viewport, covered by sticky header)
65       return normalized;
66       }
67
68       const trailingToken = tokens[tokens.length - 1];
69       if (EFFECTIVE_COMBINED_ACTIONS.has(trailingToken)) {
70           return trailingToken;
71       }
72
73       // Default legacy behavior for button combines, e.g. RATELEVEL|NEXT => RATELEVEL
74       return tokens[0];
75   }
76
77   /**
78    * Extract canonical session parameters from cycling API queryString
79    *
80    * **Pattern**: Matches legacy where each page reads from Request.QueryString
81    * Server-side cycling component modifies marrSessionInformation and returns
82    * updated values in querystring. This is the SOURCE OF TRUTH for next action.
83    *
84    * @param queryString - Full queryString from cycling response (may include ASP path prefix)
85    * @returns Extracted parameters with decoded values
86    *
87    * @example
88    * ```typescript
89    * const params = parseQueryStringParams(
90    *   "../../system/asp/File.asp?action=RATELEVEL&policyid=487672&nodekey=POL|POL|0|&xmldetail=%3Cdetails%3E"


========== IMG_3986.md ==========
---
photo: IMG_3986.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 80-106
orientation: 180
confidence: medium
notes: Significant motion-blur double-exposure ghosting throughout lines 80-98 (fainter duplicate text shifted ~2 lines above the sharp/bold in-focus text); transcribed from the sharp/bold layer via multiple tight zoomed crops comparing stroke weight/contrast. Lines 93-94 (closing "```" code fence and blank doc line) were obscured by the ghost overlay and are inferred from standard JSDoc formatting rather than directly legible — flagged low-confidence for those two lines specifically. Lines 100-106 are sharp/unambiguous (no ghosting) and confirm the end of the JSDoc and start of the parseQueryStringParams function body. Breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts > .... Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", 2 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
80    * **Pattern**: Matches legacy where each page reads from Request.QueryString
81    * Server-side cycling component modifies marrSessionInformation and returns
82    * updated values in querystring. This is the SOURCE OF TRUTH for next action.
83    *
84    * @param queryString - Full queryString from cycling response (may include ASP path prefix)
85    * @returns Extracted parameters with decoded values
86    *
87    * @example
88    * ```typescript
89    * const params = parseQueryStringParams(
90    *   "../../system/asp/File.asp?action=RATELEVEL&policyid=487672&nodekey=POL|POL|0|&xmldetail=%3Cdetails%3E"
91    * );
92    * // Returns: { action: "RATELEVEL", policyId: "487672", nodeKey: "POL|POL|0|", xmlDetail: "<details>" }
93    * ``` ⟪inferred — obscured by ghosting⟫
94    * ⟪inferred blank doc line — obscured by ghosting⟫
95    * @remarks
96    * Legacy ExecuteAction NEVER updates parent window's mstrAction variable.
97    * Instead, each page reads action from its own querystring on load.
98    * This function extracts those querystring values from cycling response.
99    */
100   export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
101       if (!queryString || queryString.trim() === '') {
102           logger.debug('Empty queryString, returning empty params');
103           return {};
104       }
105
106       // Strip ASP path prefix if present (e.g., "../../system/asp/File.asp?...")


========== IMG_3987.md ==========
---
photo: IMG_3987.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 91-117
orientation: 180
confidence: high
notes: Sharp/clean photo, no ghosting. Confirms/clarifies lines 91-99 (resolves the inferred lines 93-94 from IMG_3986 as "* ```" and a blank "*" doc line — now directly confirmed). New content: lines 100-117, body of parseQueryStringParams (empty-string guard, ASP path-prefix stripping, CanonicalParams init, start of try block with "Extract action" comment referencing legacy marrSessionInformation(4) = UCase(.QueryString("Action"))). Breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts > .... Explorer sidebar unchanged (utils folder), parse-querystring-params.ts selected. Status bar: branch "hitanshu/experimental*", 2 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Sticky-scroll/top line partially cut off shows tail of line 90's URL string.
---
90   ⟪continued from prior line⟫ "../../system/asp/File.asp?action=RATELEVEL&policyid=487672&nodekey=POL|POL|0|&xmldetail=%3Cdetails%3E"
91   * );
92   * // Returns: { action: "RATELEVEL", policyId: "487672", nodeKey: "POL|POL|0|", xmlDetail: "<details>" }
93   * ```
94   *
95   * @remarks
96   * Legacy ExecuteAction NEVER updates parent window's mstrAction variable.
97   * Instead, each page reads action from its own querystring on load.
98   * This function extracts those querystring values from cycling response.
99   */
100  export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
101      if (!queryString || queryString.trim() === '') {
102          logger.debug('Empty queryString, returning empty params');
103          return {};
104      }
105
106      // Strip ASP path prefix if present (e.g., "../../system/asp/File.asp?...")
107      // Legacy querystrings often include relative path before '?'
108      const queryStartIndex = queryString.indexOf('?');
109      const cleanQueryString =
110          queryStartIndex >= 0 ? queryString.substring(queryStartIndex + 1) : queryString;
111
112      const params: CanonicalParams = {};
113
114      try {
115          // Extract action (CRITICAL - server updates this)
116          // Legacy: marrSessionInformation(4) = UCase(.QueryString("Action"))
117          // CRITICAL: Strip button code for legacy compatibility


========== IMG_3988.md ==========
---
photo: IMG_3988.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 98-125
orientation: 180
confidence: medium
notes: Motion-blur double-exposure ghosting throughout (fainter duplicate text shifted ~3 lines above the sharp/bold in-focus text, gutter numbers themselves appear doubled/overlapping); transcribed from the sharp/bold layer via zoomed crops. Lines 98-117 confirm/duplicate IMG_3987. New content: lines 118-125 (action-extraction regex match, decodeURIComponent, resolveEffectiveAction call, start of logger.debug call). Breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts > .... Explorer sidebar unchanged (utils folder), parse-querystring-params.ts selected. Status bar: branch "hitanshu/experimental*", 2 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 125 cut off at bottom edge of editor viewport (obscured further by taskbar).
---
98    * This function extracts those querystring values from cycling response.
99    */
100   export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
101       if (!queryString || queryString.trim() === '') {
102           logger.debug('Empty queryString, returning empty params');
103           return {};
104       }
105
106       // Strip ASP path prefix if present (e.g., "../../system/asp/File.asp?...")
107       // Legacy querystrings often include relative path before '?'
108       const queryStartIndex = queryString.indexOf('?');
109       const cleanQueryString =
110           queryStartIndex >= 0 ? queryString.substring(queryStartIndex + 1) : queryString;
111
112       const params: CanonicalParams = {};
113
114       try {
115           // Extract action (CRITICAL - server updates this)
116           // Legacy: marrSessionInformation(4) = UCase(.QueryString("Action"))
117           // CRITICAL: Strip button code for legacy compatibility
118           // Legacy URLs show base action only (e.g., "RATELEVEL" not "RATELEVEL|NEXT")
119           const actionMatch = cleanQueryString.match(/action=([^&]*)/i);
120           if (actionMatch?.[1]) {
121               const rawAction = decodeURIComponent(actionMatch[1]);
122               params.action = resolveEffectiveAction(rawAction);
123               logger.debug('Extracted action from queryString', {
124                   rawAction,
125                   resolvedAction: params.action ⟪?⟫ (line cut off at bottom edge)


========== IMG_3989.md ==========
---
photo: IMG_3989.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 100-138
orientation: 180
confidence: medium
notes: Photo has a motion-blur "ghost" double-exposure effect — every line of code appears twice, a solid/crisp copy and a fainter copy offset ~3 line-heights below/behind it (editor was mid-scroll when photo taken). Transcription below is the solid/crisp text only. Line 100 is a VS Code sticky-scroll header (function signature, pinned at top). Lines 101-112 are not visible (scrolled under the sticky header); line 113 is legible but dim/ghosted (medium confidence). Tab shown in italics = preview mode, only one tab open: parse-querystring-params.ts. Breadcrumb: aqs-web-ui > src > utils > parse-querystring-params.ts. Explorer sidebar (src/utils folder, all visible, parse-querystring-params.ts highlighted/selected): form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, "normalize-service-config copy...ts", normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts. Git branch: hitanshu/experimental* (dirty). Problems indicator: 2 errors, 0 warnings, "No Solution" (C# extension). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:29 PM 7/10/2026.
---
100: export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
101-112: ⟪not visible — scrolled beneath sticky-scroll header⟫
113: queryStartIndex >= 0 ? queryString.substring(queryStartIndex + 1) : queryString;
114: try {
115:     // Extract action (CRITICAL - server updates this)
116:     // Legacy: marrSessionInformation(4) = UCase(.QueryString("Action"))
117:     // CRITICAL: Strip button code for legacy compatibility
118:     // Legacy URLs show base action only (e.g., "RATELEVEL" not "RATELEVEL|NEXT")
119:     const actionMatch = cleanQueryString.match(/action=([^&]*)/i);
120:     if (actionMatch?.[1]) {
121:         const rawAction = decodeURIComponent(actionMatch[1]);
122:         params.action = resolveEffectiveAction(rawAction);
123:         logger.debug('Extracted action from queryString', {
124:             rawAction,
125:             resolvedAction: params.action,
126:             hadButton: rawAction.includes('|'),
127:         });
128:     }
129:
130:     // Extract policyId (check both "policyid" and "policyID")
131:     // Legacy: marrSessionInformation(2) = UCase(.QueryString("PolicyID"))
132:     const policyIdMatch = cleanQueryString.match(/policyid=([^&]*)/i);
133:     if (policyIdMatch?.[1]) {
134:         params.policyId = decodeURIComponent(policyIdMatch[1]);
135:     }
136:
137:     // Extract nodeKey (check both "nodekey" and "nodeKey")
138:     // Legacy: marrSessionInformation(3) = UCase(.QueryString("NodeKey"))


========== IMG_3990.md ==========
---
photo: IMG_3990.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 120-146
orientation: 180
confidence: high
notes: Same motion-blur ghosting as IMG_3989 (editor mid-scroll during exposure) — a fainter duplicate of the text appears offset ~3 line-heights from the solid/crisp text, and the gutter line numbers ghost too, which made lines 137-139 initially hard to disambiguate (a ghost "136" overlapped the true line-139 row). Line numbers for 139-146 were inferred from the repeating 7-line block pattern (2 comments + const + if + assignment + closing brace + blank separator) that is identical for the policyId (130-136), nodeKey (137-143), and userId (144-...) extractions, and cross-checked against a clean crop. Transcription below is the solid text only, verified against IMG_3989 for the overlapping lines 120-138. Line 100 sticky-scroll header still pinned at top (export function parseQueryStringParams...). Same file/tab/sidebar/branch as IMG_3989: tab parse-querystring-params.ts (italic/preview), breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts, git branch hitanshu/experimental*, Problems 2 errors/0 warnings, No Solution, status bar Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:30 PM 7/10/2026.
---
100: export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
120: if (actionMatch?.[1]) {
121:     const rawAction = decodeURIComponent(actionMatch[1]);
122:     params.action = resolveEffectiveAction(rawAction);
123:     logger.debug('Extracted action from queryString', {
124:         rawAction,
125:         resolvedAction: params.action,
126:         hadButton: rawAction.includes('|'),
127:     });
128: }
129:
130:     // Extract policyId (check both "policyid" and "policyID")
131:     // Legacy: marrSessionInformation(2) = UCase(.QueryString("PolicyID"))
132:     const policyIdMatch = cleanQueryString.match(/policyid=([^&]*)/i);
133:     if (policyIdMatch?.[1]) {
134:         params.policyId = decodeURIComponent(policyIdMatch[1]);
135:     }
136:
137:     // Extract nodeKey (check both "nodekey" and "nodeKey")
138:     // Legacy: marrSessionInformation(3) = UCase(.QueryString("NodeKey"))
139:     const nodeKeyMatch = cleanQueryString.match(/nodekey=([^&]*)/i);
140:     if (nodeKeyMatch?.[1]) {
141:         params.nodeKey = decodeURIComponent(nodeKeyMatch[1]);
142:     }
143:
144:     // Extract userId (check both "userid" and "userId")
145:     // Legacy: marrSessionInformation(1) = UCase(.QueryString("UserID"))
146:     const userIdMatch = cleanQueryString.match(/userid=([^&]*)/i);



========== IMG_3991.md ==========
---
photo: IMG_3991.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 128-154
orientation: 180
confidence: high
notes: Same motion-blur ghosting as IMG_3989/3990 (editor mid-scroll during exposure) — a fainter duplicate of the text appears offset ~3 line-heights from the solid/crisp text; transcription below is the solid text only. This photo confirms the line numbering inferred in IMG_3990 (137-139 nodeKey comments/const were correctly placed, not at 136/136/136 as gutter ghosting first suggested) — gutter numbers 136-154 are all clearly legible and consistent here. New content beyond IMG_3990 is lines 147-154 (userId if-block completion, start of compLoc extraction). Line 100 sticky-scroll header still pinned at top (export function parseQueryStringParams...). Same file/tab/sidebar/branch as prior photos: tab parse-querystring-params.ts (italic/preview), breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts, git branch hitanshu/experimental*, Problems 2 errors/0 warnings, No Solution, status bar Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:30 PM 7/10/2026.
---
100: export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
128: }
129:
130:     // Extract policyId (check both "policyid" and "policyID")
131:     // Legacy: marrSessionInformation(2) = UCase(.QueryString("PolicyID"))
132:     const policyIdMatch = cleanQueryString.match(/policyid=([^&]*)/i);
133:     if (policyIdMatch?.[1]) {
134:         params.policyId = decodeURIComponent(policyIdMatch[1]);
135:     }
136:
137:     // Extract nodeKey (check both "nodekey" and "nodeKey")
138:     // Legacy: marrSessionInformation(3) = UCase(.QueryString("NodeKey"))
139:     const nodeKeyMatch = cleanQueryString.match(/nodekey=([^&]*)/i);
140:     if (nodeKeyMatch?.[1]) {
141:         params.nodeKey = decodeURIComponent(nodeKeyMatch[1]);
142:     }
143:
144:     // Extract userId (check both "userid" and "userId")
145:     // Legacy: marrSessionInformation(1) = UCase(.QueryString("UserID"))
146:     const userIdMatch = cleanQueryString.match(/userid=([^&]*)/i);
147:     if (userIdMatch?.[1]) {
148:         params.userId = decodeURIComponent(userIdMatch[1]);
149:     }
150:
151:     // Extract compLoc (check both "comploc" and "compLoc")
152:     // Legacy: marrSessionInformation(0) = Application("CompLoc")
153:     const compLocMatch = cleanQueryString.match(/comploc=([^&]*)/i);
154:     if (compLocMatch?.[1]) {


========== IMG_3992.md ==========
---
photo: IMG_3992.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 141-167
orientation: 180
confidence: high
notes: No motion-blur ghosting in this photo (crisp/still, unlike IMG_3989-3991). Line 100 sticky-scroll header still pinned at top (export function parseQueryStringParams...); line 141 partially obscured by the sticky header (only fragment "params.nodeKey = decodeURIComponent(nodeKeyMatch[1]);" visible/cut). New content beyond IMG_3991 is lines 155-167 (compLoc assignment, diagnosticMode extraction block, start of xmlDetail extraction). Same file/tab/sidebar/branch as prior photos: tab parse-querystring-params.ts (italic/preview), breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts, git branch hitanshu/experimental*, Problems 2 errors/0 warnings, No Solution, status bar Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:30 PM 7/10/2026.
---
100: export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
141:         params.nodeKey = decodeURIComponent(nodeKeyMatch[1]);
142:     }
143:
144:     // Extract userId (check both "userid" and "userId")
145:     // Legacy: marrSessionInformation(1) = UCase(.QueryString("UserID"))
146:     const userIdMatch = cleanQueryString.match(/userid=([^&]*)/i);
147:     if (userIdMatch?.[1]) {
148:         params.userId = decodeURIComponent(userIdMatch[1]);
149:     }
150:
151:     // Extract compLoc (check both "comploc" and "compLoc")
152:     // Legacy: marrSessionInformation(0) = Application("CompLoc")
153:     const compLocMatch = cleanQueryString.match(/comploc=([^&]*)/i);
154:     if (compLocMatch?.[1]) {
155:         params.compLoc = decodeURIComponent(compLocMatch[1]);
156:     }
157:
158:     // Extract diagnosticMode
159:     // Legacy: marrSessionInformation(5) = UCase(.QueryString("DiagnosticMode"))
160:     const diagnosticModeMatch = cleanQueryString.match(/diagnosticmode=([^&]*)/i);
161:     if (diagnosticModeMatch?.[1]) {
162:         params.diagnosticMode = decodeURIComponent(diagnosticModeMatch[1]);
163:     }
164:
165:     // Extract xmlDetail (CRITICAL - server updates this)
166:     // Legacy: marrSessionInformation(6) = Decompress(.QueryString("XMLDetail"))
167:     // NOTE: execute-action.ts already has complex XML parsing logic for this


========== IMG_3993.md ==========
---
photo: IMG_3993.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 152-177
orientation: 180
confidence: high
notes: Motion-blur ghosting present again (fainter duplicate text offset ~3 line-heights below the solid text); transcription below is the solid/crisp text only. Line 100 sticky-scroll header still pinned at top (export function parseQueryStringParams...). New content beyond IMG_3992 is lines 168-177 (xmlDetail extraction body + start of tab extraction). Same file/tab/sidebar/branch as prior photos: tab parse-querystring-params.ts (italic/preview), breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts, git branch hitanshu/experimental*, Problems 2 errors/0 warnings, No Solution, status bar Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:30 PM 7/10/2026.
---
100: export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
152:     // Legacy: marrSessionInformation(0) = Application("CompLoc")
153:     const compLocMatch = cleanQueryString.match(/comploc=([^&]*)/i);
154:     if (compLocMatch?.[1]) {
155:         params.compLoc = decodeURIComponent(compLocMatch[1]);
156:     }
157:
158:     // Extract diagnosticMode
159:     // Legacy: marrSessionInformation(5) = UCase(.QueryString("DiagnosticMode"))
160:     const diagnosticModeMatch = cleanQueryString.match(/diagnosticmode=([^&]*)/i);
161:     if (diagnosticModeMatch?.[1]) {
162:         params.diagnosticMode = decodeURIComponent(diagnosticModeMatch[1]);
163:     }
164:
165:     // Extract xmlDetail (CRITICAL - server updates this)
166:     // Legacy: marrSessionInformation(6) = Decompress(.QueryString("XMLDetail"))
167:     // NOTE: execute-action.ts already has complex XML parsing logic for this
168:     // We extract the raw parameter here; execute-action will parse the XML structure
169:     const xmlDetailMatch = cleanQueryString.match(/xmldetail=([^&]*)/i);
170:     if (xmlDetailMatch?.[1]) {
171:         params.xmlDetail = decodeURIComponent(xmlDetailMatch[1]);
172:     }
173:
174:     // Extract tab (optional)
175:     const tabMatch = cleanQueryString.match(/tab=([^&]*)/i);
176:     if (tabMatch?.[1]) {
177:         params.tab = decodeURIComponent(tabMatch[1]);


========== IMG_3994.md ==========
---
photo: IMG_3994.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 160-185
orientation: 180
confidence: high
notes: Motion-blur ghosting present again (fainter duplicate text offset ~3 line-heights below the solid text); transcription below is the solid/crisp text only. Line 100 sticky-scroll header still pinned at top (export function parseQueryStringParams...). New content beyond IMG_3993 is lines 178-185 (end of tab if-block, logger.debug call summarizing parsed params, start of catch block). Same file/tab/sidebar/branch as prior photos: tab parse-querystring-params.ts (italic/preview), breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts, git branch hitanshu/experimental*, Problems 2 errors/0 warnings, No Solution, status bar Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:30 PM 7/10/2026.
---
100: export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
160:     const diagnosticModeMatch = cleanQueryString.match(/diagnosticmode=([^&]*)/i);
161:     if (diagnosticModeMatch?.[1]) {
162:         params.diagnosticMode = decodeURIComponent(diagnosticModeMatch[1]);
163:     }
164:
165:     // Extract xmlDetail (CRITICAL - server updates this)
166:     // Legacy: marrSessionInformation(6) = Decompress(.QueryString("XMLDetail"))
167:     // NOTE: execute-action.ts already has complex XML parsing logic for this
168:     // We extract the raw parameter here; execute-action will parse the XML structure
169:     const xmlDetailMatch = cleanQueryString.match(/xmldetail=([^&]*)/i);
170:     if (xmlDetailMatch?.[1]) {
171:         params.xmlDetail = decodeURIComponent(xmlDetailMatch[1]);
172:     }
173:
174:     // Extract tab (optional)
175:     const tabMatch = cleanQueryString.match(/tab=([^&]*)/i);
176:     if (tabMatch?.[1]) {
177:         params.tab = decodeURIComponent(tabMatch[1]);
178:     }
179:
180:     logger.debug('Parsed queryString parameters', {
181:         foundParams: Object.keys(params),
182:         action: params.action,
183:         policyId: params.policyId,
184:     });
185: } catch (error) {


========== IMG_3995.md ==========
---
photo: IMG_3995.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 173-198
orientation: 180
confidence: high
notes: Crisp photo, no motion-blur ghosting (editor was still). Line 100 sticky-scroll header still pinned at top (export function parseQueryStringParams...). New content beyond IMG_3994 is lines 186-198 — end of catch block, closing brace of parseQueryStringParams function (190), and the start of a new exported function/block with a JSDoc comment beginning "Merge extracted parameters into existing navigation context" with a "**Priority**: Extracted params from queryString OVERRIDE existing context" note (line 198 cut off at bottom edge of visible area). Same file/tab/sidebar/branch as prior photos: tab parse-querystring-params.ts (italic/preview), breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts, git branch hitanshu/experimental*, Problems 2 errors/0 warnings, No Solution, status bar Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:30 PM 7/10/2026.
---
100: export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
173:
174:     // Extract tab (optional)
175:     const tabMatch = cleanQueryString.match(/tab=([^&]*)/i);
176:     if (tabMatch?.[1]) {
177:         params.tab = decodeURIComponent(tabMatch[1]);
178:     }
179:
180:     logger.debug('Parsed queryString parameters', {
181:         foundParams: Object.keys(params),
182:         action: params.action,
183:         policyId: params.policyId,
184:     });
185: } catch (error) {
186:     logger.error('Failed to parse queryString', error as Error, {
187:         queryString: cleanQueryString,
188:     });
189:     // Return partial results on error (best effort)
190: }
191:
192:     return params;
193: }
194:
195: /**
196:  * Merge extracted parameters into existing navigation context
197:  *
198:  * **Priority**: Extracted params from queryString OVERRIDE existing context


========== IMG_3996.md ==========
---
photo: IMG_3996.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 178-204
orientation: 180
confidence: high
notes: Crisp photo, no motion-blur ghosting. Line 100 sticky-scroll header still pinned at top (export function parseQueryStringParams...). This confirms/re-shows IMG_3995's content (178-198) and adds new lines 199-204 — continuation of the JSDoc comment for the next function (merge extracted params into navigation context): notes about legacy cycling-response pattern, @param context, @param extractedParams, @returns. Line 204 is just a bare "*" comment continuation line, cut off by the Problems panel at the bottom of the screen. Same file/tab/sidebar/branch as prior photos: tab parse-querystring-params.ts (italic/preview), breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts, git branch hitanshu/experimental*, Problems 2 errors/0 warnings, No Solution, status bar Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:30 PM 7/10/2026.
---
100: export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
178:     }
179:
180:     logger.debug('Parsed queryString parameters', {
181:         foundParams: Object.keys(params),
182:         action: params.action,
183:         policyId: params.policyId,
184:     });
185: } catch (error) {
186:     logger.error('Failed to parse queryString', error as Error, {
187:         queryString: cleanQueryString,
188:     });
189:     // Return partial results on error (best effort)
190: }
191:
192:     return params;
193: }
194:
195: /**
196:  * Merge extracted parameters into existing navigation context
197:  *
198:  * **Priority**: Extracted params from queryString OVERRIDE existing context
199:  * This matches legacy pattern where cycling response is authoritative source.
200:  *
201:  * @param context - Current navigation context
202:  * @param extractedParams - Parameters extracted from cycling queryString
203:  * @returns Merged context with updated values
204:  *


========== IMG_3997.md ==========
---
photo: IMG_3997.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 192-217
orientation: 180
confidence: high
notes: Crisp photo, no motion-blur ghosting. Line 100 sticky-scroll header still pinned at top (export function parseQueryStringParams...). New content beyond IMG_3996 is lines 205-217 — rest of the JSDoc @remarks block (legacy pattern reference to mstrXMLDetail, line 1569-1575 of legacy code), then the exported function signature `mergeParamsToContext(context: NavigationContextValue, extractedParams: CanonicalParams): NavigationContextValue`, and start of its body (merged object literal spreading ...context, with a comment "Override with extracted params if present (queryString is source of truth)"). Line 217 cut off at bottom edge. Same file/tab/sidebar/branch as prior photos: tab parse-querystring-params.ts (italic/preview), breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts, git branch hitanshu/experimental*, Problems 2 errors/0 warnings, No Solution, status bar Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:30 PM 7/10/2026.
---
100: export function parseQueryStringParams(queryString: string | undefined): CanonicalParams {
192:     return params;
193: }
194:
195: /**
196:  * Merge extracted parameters into existing navigation context
197:  *
198:  * **Priority**: Extracted params from queryString OVERRIDE existing context
199:  * This matches legacy pattern where cycling response is authoritative source.
200:  *
201:  * @param context - Current navigation context
202:  * @param extractedParams - Parameters extracted from cycling queryString
203:  * @returns Merged context with updated values
204:  *
205:  * @remarks
206:  * Legacy pattern: After ExecuteAction completes, mstrXMLDetail is ALWAYS
207:  * updated from queryString (line 1569-1575). We extend this to action,
208:  * policyId, and other canonical params.
209:  */
210: export function mergeParamsToContext(
211:     context: NavigationContextValue,
212:     extractedParams: CanonicalParams,
213: ): NavigationContextValue {
214:     // Build merged context with queryString params taking priority
215:     const merged: NavigationContextValue = {
216:         ...context,
217:         // Override with extracted params if present (queryString is source of truth)


========== IMG_3998.md ==========
---
photo: IMG_3998.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 201-226
orientation: 180
confidence: high
notes: Motion-blur ghosting present (fainter duplicate text offset ~2 line-heights below the solid text); transcription below is the solid/crisp text only. No function-signature sticky-scroll header pinned this time (viewport top is inside the JSDoc block, breadcrumb only). New content beyond IMG_3997 is lines 218-226 — the merged object literal fields (action, policyId, nodeKey, userId, compLoc, tab with parseInt) and closing brace, plus comments about xmlDetail being handled separately in execute-action.ts. Same file/tab/sidebar/branch as prior photos: tab parse-querystring-params.ts (italic/preview), breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts, git branch hitanshu/experimental*, Problems 2 errors/0 warnings, No Solution, status bar Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:30 PM 7/10/2026.
---
201:  * @param context - Current navigation context
202:  * @param extractedParams - Parameters extracted from cycling queryString
203:  * @returns Merged context with updated values
204:  *
205:  * @remarks
206:  * Legacy pattern: After ExecuteAction completes, mstrXMLDetail is ALWAYS
207:  * updated from queryString (line 1569-1575). We extend this to action,
208:  * policyId, and other canonical params.
209:  */
210: export function mergeParamsToContext(
211:     context: NavigationContextValue,
212:     extractedParams: CanonicalParams,
213: ): NavigationContextValue {
214:     // Build merged context with queryString params taking priority
215:     const merged: NavigationContextValue = {
216:         ...context,
217:         // Override with extracted params if present (queryString is source of truth)
218:         action: (extractedParams.action ?? context.action) as NavigationContextValue['action'],
219:         policyId: extractedParams.policyId ?? context.policyId,
220:         nodeKey: extractedParams.nodeKey ?? context.nodeKey,
221:         userId: extractedParams.userId ?? context.userId,
222:         compLoc: extractedParams.compLoc ?? context.compLoc,
223:         // Note: xmlDetail is handled separately in execute-action.ts due to complex XML parsing
224:         // We preserve existing xmlDetail unless execute-action.ts provides parsed version
225:         tab: extractedParams.tab ? parseInt(extractedParams.tab, 10) : context.tab,
226:     };


========== IMG_3999.md ==========
---
photo: IMG_3999.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 210-235
orientation: 180
confidence: medium
notes: Heavy motion-blur ghosting (fainter duplicate text offset ~3 line-heights, overlapping the solid text quite densely in the 226-235 range, making line-by-line disambiguation harder than in other photos in this set — resolved via careful high-zoom crop distinguishing crisp/solid glyph edges from blurred ghost edges, and cross-checked against logical code structure). Sticky-scroll header now shows "export function mergeParamsToContext(" pinned at line 210. logger.info call string contains an inline icon glyph (renders as a small blue circular-arrows icon, likely an emoji such as 🔄) before "Action updated from queryString...". New content beyond IMG_3998 is lines 227-235 — comment "Log significant changes", an if-block guarding on extractedParams.action, and a logger.info call with oldAction/newAction/source/pattern fields. Line 236 (console.log('[DEBUG]...) is visible only as a ghost fragment at the very bottom edge, not confirmed. Same file/tab/sidebar/branch as prior photos: tab parse-querystring-params.ts (italic/preview), breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts, git branch hitanshu/experimental*, Problems 2 errors/0 warnings, No Solution, status bar Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:30 PM 7/10/2026.
---
210: export function mergeParamsToContext(
213: ): NavigationContextValue {
214:     // Build merged context with queryString params taking priority
215:     const merged: NavigationContextValue = {
216:         ...context,
217:         // Override with extracted params if present (queryString is source of truth)
218:         action: (extractedParams.action ?? context.action) as NavigationContextValue['action'],
219:         policyId: extractedParams.policyId ?? context.policyId,
220:         nodeKey: extractedParams.nodeKey ?? context.nodeKey,
221:         userId: extractedParams.userId ?? context.userId,
222:         compLoc: extractedParams.compLoc ?? context.compLoc,
223:         // Note: xmlDetail is handled separately in execute-action.ts due to complex XML parsing
224:         // We preserve existing xmlDetail unless execute-action.ts provides parsed version
225:         tab: extractedParams.tab ? parseInt(extractedParams.tab, 10) : context.tab,
226:     };
227:
228:     // Log significant changes (action is most critical)
229:     if (extractedParams.action && extractedParams.action !== context.action) {
230:         logger.info('🔄 Action updated from queryString (SERVER is source of truth)', {
231:             oldAction: context.action,
232:             newAction: extractedParams.action,
233:             source: 'cycling API querystring',
234:             pattern: 'Legacy: marrSessionInformation(4) = QueryString("Action")',
235:         });


========== IMG_4001.md ==========
---
photo: IMG_4001.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 210-248
orientation: 180
confidence: medium
notes: Heavy motion-blur ghosting throughout (fainter duplicate text offset ~4-5 line-heights, especially dense in the console.log block 238-246); transcription below is the solid/crisp text, resolved via high-zoom crop distinguishing crisp glyph edges from ghost edges. Sticky-scroll shows two pinned header lines this time — line 210 "export function mergeParamsToContext(" and line 215 "const merged: NavigationContextValue = {" — both pinned since the viewport is deep inside that object literal's enclosing scope. Lines 238/240/244 are separator strings of repeated "=" characters inside '[DEBUG] ...' — the exact character count is not fully legible due to the underline-like solid rendering at this resolution; transcribed as a representative run of "=". Line 239's console.log contains an inline icon glyph (renders as a small pink/red circular target icon, likely an emoji such as 🎯) before "ACTION CHANGE DETECTED". New content beyond IMG_3999 is lines 236-248 (extra debug console.log block, then start of a policyId-changed logger.info block, mirroring the action-changed block above it). Same file/tab/sidebar/branch as prior photos: tab parse-querystring-params.ts (italic/preview), breadcrumb aqs-web-ui > src > utils > parse-querystring-params.ts, git branch hitanshu/experimental*, Problems 2 errors/0 warnings, No Solution, status bar Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:30 PM 7/10/2026.
---
210: export function mergeParamsToContext(
215:     const merged: NavigationContextValue = {
224:         // We preserve existing xmlDetail unless execute-action.ts provides parsed version
225:         tab: extractedParams.tab ? parseInt(extractedParams.tab, 10) : context.tab,
226:     };
227:
228:     // Log significant changes (action is most critical)
229:     if (extractedParams.action && extractedParams.action !== context.action) {
230:         logger.info('🔄 Action updated from queryString (SERVER is source of truth)', {
231:             oldAction: context.action,
232:             newAction: extractedParams.action,
233:             source: 'cycling API querystring',
234:             pattern: 'Legacy: marrSessionInformation(4) = QueryString("Action")',
235:         });
236:
237:         // Extra logging for debugging new window issues
238:         console.log('[DEBUG] ========================================');
239:         console.log('[DEBUG] 🎯 ACTION CHANGE DETECTED');
240:         console.log('[DEBUG] ========================================');
241:         console.log('[DEBUG] Before:', context.action);
242:         console.log('[DEBUG] After: ', extractedParams.action);
243:         console.log('[DEBUG] Source: Cycling API querystring');
244:         console.log('[DEBUG] ========================================');
245:     }
246:
247:     if (extractedParams.policyId && extractedParams.policyId !== context.policyId) {
248:         logger.info('PolicyId updated from queryString', {


========== IMG_4002.md ==========
---
photo: IMG_4002.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 210, 236-261
orientation: 180
confidence: high
notes: Sticky-scroll header shows enclosing function at line 210. Explorer sidebar (utils folder) fully visible and expanded, showing files in order: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, "normalize-service-config cop..." (truncated name, likely a copy/duplicate file), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts (highlighted/selected), performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts. Only one tab open: parse-querystring-params.ts. Status bar: branch "hitanshu/experimental*" (dirty), 2 errors / 0 warnings, "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. The console.log separator lines (238, 240, 244) contain a long run of literal "=" characters between quotes; exact character count is not precisely countable from the photo — transcribed with a representative run of "=" of approximate visual length. Photo taken of an external/laptop-mirrored display; taskbar shows date 10-07-2026, time 7:30 PM / 19:30, weather widget "26°C Mostly cloudy".
---
210    export function mergeParamsToContext(
236
237        // Extra logging for debugging new window issues
238        console.log('[DEBUG] ================================================');
239        console.log('[DEBUG] 🎯 ACTION CHANGE DETECTED');
240        console.log('[DEBUG] ================================================');
241        console.log('[DEBUG] Before:', context.action);
242        console.log('[DEBUG] After: ', extractedParams.action);
243        console.log('[DEBUG] Source: Cycling API querystring');
244        console.log('[DEBUG] ================================================');
245    }
246
247    if (extractedParams.policyId && extractedParams.policyId !== context.policyId) {
248        logger.info('PolicyId updated from queryString', {
249            oldPolicyId: context.policyId,
250            newPolicyId: extractedParams.policyId,
251        });
252    }
253
254    return merged;
255 }
256
257 /**
258  * Validate that required canonical parameters are present
259  *
260  * Used by execute-action.ts to ensure cycling response included
261  * minimum required session parameters.


========== IMG_4003.md ==========
---
photo: IMG_4003.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 210, 247-272
orientation: 180
confidence: high
notes: Same file/tab as IMG_4002, scrolled down slightly (sticky-scroll header still shows line 210 mergeParamsToContext). Lines 247-255 repeat what was captured in IMG_4002; new content is 256-272. Explorer sidebar utils folder listing identical to IMG_4002. Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Taskbar clock 19:30 10-07-2026, weather widget "26°C Mostly cloudy" (external mirrored display).
---
210    export function mergeParamsToContext(
247        if (extractedParams.policyId && extractedParams.policyId !== context.policyId) {
248            logger.info('PolicyId updated from queryString', {
249                oldPolicyId: context.policyId,
250                newPolicyId: extractedParams.policyId,
251            });
252        }
253
254        return merged;
255    }
256
257    /**
258     * Validate that required canonical parameters are present
259     *
260     * Used by execute-action.ts to ensure cycling response included
261     * minimum required session parameters.
262     *
263     * @param params - Extracted parameters to validate
264     * @returns Validation result with error message if invalid
265     */
266    export function validateCanonicalParams(params: CanonicalParams): {
267        valid: boolean;
268        error?: string;
269    } {
270        // Action is required in most cases (except initial page load)
271        if (!params.action || params.action.trim() === '') {
272            return {


========== IMG_4004.md ==========
---
photo: IMG_4004.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-querystring-params.ts
lines: 256-281
orientation: 180
confidence: high
notes: Continuation of same file/tab as IMG_4002/4003, scrolled further down. No sticky-scroll header visible (topmost line 256 is not nested). Lines 256-269 repeat content already captured in IMG_4003; new content is 270-281. Line 281 appears blank — possibly end of file (no further lines below, scrollbar near bottom). Explorer sidebar utils folder listing identical to prior photos in this set. Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Taskbar clock 19:30 10-07-2026.
---
256
257    /**
258     * Validate that required canonical parameters are present
259     *
260     * Used by execute-action.ts to ensure cycling response included
261     * minimum required session parameters.
262     *
263     * @param params - Extracted parameters to validate
264     * @returns Validation result with error message if invalid
265     */
266    export function validateCanonicalParams(params: CanonicalParams): {
267        valid: boolean;
268        error?: string;
269    } {
270        // Action is required in most cases (except initial page load)
271        if (!params.action || params.action.trim() === '') {
272            return {
273                valid: false,
274                error: 'action parameter is required in cycling queryString',
275            };
276        }
277
278        // At minimum, should have action
279        return { valid: true };
280    }
281
