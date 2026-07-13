# BUNDLE for src/utils/build-xml-server-call-payload.ts
# 31 photo fragment(s), ascending start-line order.


========== IMG_3387.md ==========
---
photo: IMG_3387.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 1-34
orientation: 180
confidence: high
notes: Different file from IMG_3376-3386 (which were all build-eedata-array.ts) — this is a fresh, top-of-file view of build-xml-server-call-payload.ts, opened as a new (non-italic/non-preview) tab. Photo is sharp with only minor ghosting, easy to read. File-level JSDoc explains this utility builds the XMLServerCall API payload from React form data, transforming form state + session info into the legacy API format expected by XMLServerCall (SessionInformation array, EEData array), and references "apis.instructions.md lines 410-580" for the payload format spec. Imports buildEEDataArray from '@utils/build-eedata-array' (the file transcribed in IMG_3376-3386) and buildSessionXml from '@services/page-build'. Defines BuildPayloadParams interface with xmlFileName, formData, sessionInfo, and calls fields; content cuts off mid-declaration after "calls: Call[];" at line 34, right at the status bar. Explorer sidebar: same aqs-web-ui/src tree as before, but build-xml-server-call-payload.ts is now the highlighted/selected file (blue highlight) under utils/, and its tab is a solid (not italic) tab, unlike the "preview tab" style seen for build-eedata-array.ts in earlier photos — suggesting it was deliberately opened/pinned rather than just clicked-through. The Activity Bar on the far left now shows an extra icon with a small badge (looks like a Source Control icon with a "1" badge), and detect-modal-type.ts at the bottom of the file list also shows a small "1" badge, hinting at a pending/staged change count not visible in earlier photos. Status bar: branch "hitanshu/experimental*", "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:18 PM 7/10/2026 (same session as IMG_3376-3386).
---
1	/**
2	 * @file build-xml-server-call-payload.ts
3	 * @description Utility to build XMLServerCall API payload from React form data
4	 *
5	 * Transforms React form state and session info into the legacy API format
6	 * expected by XMLServerCall (SessionInformation array, EEData array).
7	 *
8	 * @see apis.instructions.md lines 410-580 for payload format
9	 */
10	
11	import { createFeatureLogger } from '@/utils/logger-builder';
12	import { buildEEDataArray } from '@utils/build-eedata-array';
13	import { buildSessionXml } from '@services/page-build';
14	import type { SessionInfo } from '@features/auth/services/auth';
15	import type { XMLServerCallPayload, Call } from '@/services/xml-server-call';
16	
17	const logger = createFeatureLogger('util', 'BuildXMLServerCallPayload');
18	
19	// ================================================
20	// Types
21	// ================================================
22	
23	export interface BuildPayloadParams {
24	    /** XML file name identifier (e.g., "NewRnl_ISLLSYS_20010101.xml") */
25	    xmlFileName: string;
26	
27	    /** Form data as key-value pairs (matchcode → value) */
28	    formData: Record<string, unknown>;
29	
30	    /** Session information from localStorage */
31	    sessionInfo: SessionInfo;
32	
33	    /** Array of COM object calls to execute */
34	    calls: Call[];


========== IMG_3388.md ==========
---
photo: IMG_3388.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 3-36
orientation: 180
confidence: medium
notes: Photo has a motion/scroll ghosting artifact — content appears double-exposed, offset by ~3 lines (VS Code was mid smooth-scroll when shutter fired). Transcription below uses the sharp/bright text layer aligned to the gutter line numbers; the fainter offset duplicate layer was discarded as a repeat of the same content. Lines 1-2 are scrolled above the visible viewport; line 3 is a sliver occluded by the breadcrumb bar (aqs-web-ui > src > utils > build-xml-server-call-payload.ts > ...) — transcribed at reduced confidence. Explorer sidebar (left, visible): aqs-web-ui > src > providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts, modified marker "U"), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payload.ts [selected/open], button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Right-side minimap visible. Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Only one tab open: build-xml-server-call-payload.ts. Timestamp 6:18 PM 7/10/2026.
---

```
1   ⟪not visible — scrolled above viewport⟫
2   ⟪not visible — scrolled above viewport⟫
3   * @description Utility to build XMLServerCall XML payload from React form data  ⟪partially occluded by breadcrumb bar, low confidence⟫
4   *
5   * Transforms React form state and session info into the legacy API format
6   * expected by XMLServerCall (SessionInformation array, EEData array).
7   *
8   * @see apis.instructions.md lines 410-580 for payload format
9   */
10
11  import { createFeatureLogger } from '@/utils/logger-builder';
12  import { buildEEDataArray } from '@utils/build-eedata-array';
13  import { buildSessionXml } from '@services/page-build';
14  import type { SessionInfo } from '@features/auth/services/auth';
15  import type { XMLServerCallPayload, Call } from '@/services/xml-server-call';
16  // ==========================================
17  const logger = createFeatureLogger('util', 'BuildXMLServerCallPayload');
18  // ==========================================
19  // ==========================================
20  // Types
21  // ==========================================
22
23  export interface BuildPayloadParams {
24    /** XML file name identifier (e.g., "NewRnl_ISLLSYS_20010101.xml") */
25    xmlFileName: string;
26
27    /** Form data as key-value pairs (matchcode → value) */
28    formData: Record<string, unknown>;
29
30    /** Session information from localStorage */
31    sessionInfo: SessionInfo;
32
33    /** Array of COM object calls to execute */
34    calls: Call[];
35
36    /** Call phase/type (e.g. pre, post, yes) */
```


========== IMG_3389.md ==========
---
photo: IMG_3389.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 23-63
orientation: 180
confidence: high
notes: Slight scroll/motion ghosting (faint duplicate text offset ~2 lines below some lines, e.g. around 39-41, 57-61) but the sharp foreground layer aligned to gutter numbers is clearly legible throughout. Same file as IMG_3388, scrolled further down (continuation of BuildPayloadParams interface). Sticky-scroll/breadcrumb shows "export interface BuildPayloadParams {" pinned at line 23 (declaration itself, not a sticky duplicate). Explorer sidebar unchanged from IMG_3388 (build-xml-server-call-payload.ts selected under src/utils; types/grid-response.ts shows "U" modified marker; src has red/green dots indicating changes). Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Single tab open: build-xml-server-call-payload.ts. Line 63 partially cut off at bottom screen edge but legible. Timestamp 6:18 PM 7/10/2026.
---

```
23  export interface BuildPayloadParams {
...
31    sessionInfo: SessionInfo;
32
33    /** Array of COM object calls to execute */
34    calls: Call[];
35
36    /** Call phase/type (e.g. pre, post, yes) */
37    callType?: string;
38
39    /** Include calls.mode in payload (default true for backward compatibility) */
40    includeCallMode?: boolean;
41
42    /** calls.mode value when included */
43    callMode?: string;
44
45    /** Button/control matchcode used to submit (OK, CANCEL, NEXT, etc.) */
46    buttonMatchcode?: string;
47
48    /** Field order as controls appear in PageBuild */
49    fieldOrder?: string[];
50
51    /** Backend positional order from PageBuild utp.data */
52    utpOrder?: string[];
53
54    /** Session XML items (existing session state) */
55    sessionXml?: Array<{ name: string; value: string }>;
56
57    /**
58     * Send SessionInformation[6] as raw XML string (<items>...</items>) instead of object format.
59     * Default remains false for backward compatibility.
60     */
61    sessionXmlAsString?: boolean;
62
63    /** Control object identifier (default: "ZENTEDTCTL") */
```


========== IMG_3390.md ==========
---
photo: IMG_3390.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 23,36-73
orientation: 180
confidence: medium
notes: Strong motion/scroll double-exposure ghosting throughout (VS Code mid smooth-scroll when shutter fired) — every row shows a sharp/bold foreground text layer aligned to the gutter numbers plus a fainter, vertically-offset (~5-6 lines) duplicate trail of nearby content. Transcription uses only the sharp foreground layer. Line 23 "export interface BuildPayloadParams {" is a sticky-scroll pinned header (the interface declaration), not a normally-scrolled line — content resumes at line 36. Lines 36-63 duplicate/overlap the range already captured cleanly in IMG_3389 (cross-checked against that transcript, consistent). Lines 64-73 are new content not seen in IMG_3389. Ambiguity at lines 62 and 72: sharp text shows these as blank with only faint ghost trails from lines 57 and 67 respectively bleeding through — interpreted as blank lines based on the file's consistent blank-line-before-JSDoc-comment / blank-line-after-declaration pattern seen elsewhere; flagged medium confidence for 62-73. Explorer sidebar unchanged (build-xml-server-call-payload.ts selected, src/utils file list same as IMG_3388/3389). Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Single tab open. Timestamp 6:18 PM 7/10/2026.
---

```
23  export interface BuildPayloadParams {   ⟪sticky-scroll pinned header⟫
...
36    /** Call phase/type (e.g. pre, post, yes) */
37    callType?: string;
38
39    /** Include calls.mode in payload (default true for backward compatibility) */
40    includeCallMode?: boolean;
41
42    /** calls.mode value when included */
43    callMode?: string;
44
45    /** Button/control matchcode used to submit (OK, CANCEL, NEXT, etc.) */
46    buttonMatchcode?: string;
47
48    /** Field order as controls appear in PageBuild */
49    fieldOrder?: string[];
50
51    /** Backend positional order from PageBuild utp.data */
52    utpOrder?: string[];
53
54    /** Session XML items (existing session state) */
55    sessionXml?: Array<{ name: string; value: string }>;
56
57    /**
58     * Send SessionInformation[6] as raw XML string (<items>...</items>) instead of object format.
59     * Default remains false for backward compatibility.
60     */
61    sessionXmlAsString?: boolean;
62
63    /** Control object identifier (default: "ZENTEDTCTL") */
64    mstrObject?: string;
65
66    /** Pre-built EEData array (optional) - if provided, uses this instead of building */
67    eeData?: unknown[];
68
69    /** EEData process indicator override (legacy: 0/1 or branch token such as yes/no) */
70    processIndicator?: string;
71  }
72
73  export type CallsByType = Record<string, Call[]>;
```


========== IMG_3391.md ==========
---
photo: IMG_3391.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 23,47-77
orientation: 180
confidence: high
notes: Same motion/scroll double-exposure ghosting as IMG_3388-3390 (sharp foreground layer aligned to gutter numbers used; fainter ~5-line-offset duplicate trail ignored). Line 23 "export interface BuildPayloadParams {" is a sticky-scroll pinned header; content resumes at line 47. Lines 47-71 duplicate/cross-validate IMG_3390's content (interface BuildPayloadParams closes at line 71) — confirms IMG_3390's inferred blank lines at 62 and 72 were correct. CORRECTION (verified against the clean, non-ghosted IMG_3392 which shows lines 71-77 identically): lines 74/75/76 were originally mis-read from the blurred ghost layer as "// ====" x2 + "// Utility Functions"; the true content is line 74 blank, line 75 "// ====", line 76 "// Utility Functions", line 77 "// ====" (a divider-title-divider block, not double-divider-then-title). Corrected below. Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Single tab open: build-xml-server-call-payload.ts. Timestamp 6:18 PM 7/10/2026.
---

```
23  export interface BuildPayloadParams {   ⟪sticky-scroll pinned header⟫
...
47
48    /** Field order as controls appear in PageBuild */
49    fieldOrder?: string[];
50
51    /** Backend positional order from PageBuild utp.data */
52    utpOrder?: string[];
53
54    /** Session XML items (existing session state) */
55    sessionXml?: Array<{ name: string; value: string }>;
56
57    /**
58     * Send SessionInformation[6] as raw XML string (<items>...</items>) instead of object format.
59     * Default remains false for backward compatibility.
60     */
61    sessionXmlAsString?: boolean;
62
63    /** Control object identifier (default: "ZENTEDTCTL") */
64    mstrObject?: string;
65
66    /** Pre-built EEData array (optional) - if provided, uses this instead of building */
67    eeData?: unknown[];
68
69    /** EEData process indicator override (legacy: 0/1 or branch token such as yes/no) */
70    processIndicator?: string;
71  }
72
73  export type CallsByType = Record<string, Call[]>;
74
75  // ==========================================
76  // Utility Functions
77  // ==========================================
```


========== IMG_3392.md ==========
---
photo: IMG_3392.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 23,71-102
orientation: 180
confidence: high
notes: Clean, sharp capture — no motion/scroll ghosting (unlike IMG_3388-3391). Line 23 "export interface BuildPayloadParams {" is a sticky-scroll pinned header; content resumes at line 71. This photo confirmed lines 71-77 that had been misread from ghosted layers in IMG_3391 (see correction noted in that transcript). New content: JSDoc block for buildXMLServerCallPayload (lines 79-99) including an ```typescript example block, and start of the function itself (lines 100-102). Explorer sidebar unchanged (build-xml-server-call-payload.ts selected under src/utils). Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Single tab open. Timestamp 6:18 PM 7/10/2026.
---

```
23  export interface BuildPayloadParams {   ⟪sticky-scroll pinned header⟫
...
71  }
72
73  export type CallsByType = Record<string, Call[]>;
74
75  // ==========================================
76  // Utility Functions
77  // ==========================================
78
79  /**
80   * Build XMLServerCall API payload from form data and session info
81   *
82   * @param params - Parameters for building the payload
83   * @returns XMLServerCall API payload ready to send
84   *
85   * @example
86   * ```typescript
87   * const payload = buildXMLServerCallPayload({
88   *   xmlFileName: "NewRnl_ISLLSYS_20010101.xml",
89   *   formData: { PolicyType: "NEW" },
90   *   sessionInfo: { compLoc: "PIPH", userId: "PGURJAR", ... },
91   *   calls: [
92   *     { project: "pZStart", class: "cZStart", subroutine: "Policy_SetBeginType" },
93   *     { project: "pZStart", class: "cZStart", subroutine: "Modal_Close" },
94   *   ],
95   * });
96   *
97   * const response = await xmlServerCall(payload);
98   * ...
99   */
100 export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {
101   const {
102     xmlFileName,
```


========== IMG_3393.md ==========
---
photo: IMG_3393.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 77-110
orientation: 180
confidence: high
notes: Strong motion/scroll ghosting in the upper 2/3 of the visible code (lines ~77-99, offset ~11 lines) — that range duplicates content already captured cleanly in IMG_3392, used here only for continuity/context and not re-verified pixel-by-pixel. Lower portion (lines 99-110) is sharp/unghosted and is new content: start of the buildXMLServerCallPayload function body, destructuring params with defaults (callType='post', includeCallMode=true, callMode='async', buttonMatchcode='OK'). Explorer sidebar unchanged (build-xml-server-call-payload.ts selected). Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Single tab open. Timestamp 6:18 PM 7/10/2026.
---

```
77  // ==========================================
78  // Utility Functions
79  /**
80   * Build XMLServerCall API payload from form data and session info
81   *
82   * @param params - Parameters for building the payload
83   * @returns XMLServerCall API payload ready to send
84   *
85   * @example
86   * ```typescript
87   * const payload = buildXMLServerCallPayload({
88   *   xmlFileName: "NewRnl_ISLLSYS_20010101.xml",
89   *   formData: { PolicyType: "NEW" },
90   *   sessionInfo: { compLoc: "PIPH", userId: "PGURJAR", ... },
91   *   calls: [
92   *     { project: "pZStart", class: "cZStart", subroutine: "Policy_SetBeginType" },
93   *     { project: "pZStart", class: "cZStart", subroutine: "Modal_Close" },
94   *   ],
95   * });
96   *
97   * const response = await xmlServerCall(payload);
98   * ...
99   */
100 export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {
101   const {
102     xmlFileName,
103     formData,
104     sessionInfo,
105     calls,
106     callType = 'post',
107     includeCallMode = true,
108     callMode = 'async',
109     buttonMatchcode = 'OK',
110     fieldOrder,
```


========== IMG_3394.md ==========
---
photo: IMG_3394.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 85-118
orientation: 180
confidence: high
notes: Clean, sharp capture — no motion/scroll ghosting. Lines 85-110 duplicate content already captured in IMG_3392/3393 (cross-validated, consistent). New content: lines 111-118 complete the destructuring of params with defaults (utpOrder, sessionXml=[], sessionXmlAsString=false, mstrObject='ZENTEDTCTL', eeData: providedEEData, processIndicator), closing `} = params;` at line 118. Explorer sidebar unchanged (build-xml-server-call-payload.ts selected under src/utils). Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Single tab open. Timestamp 6:18 PM 7/10/2026.
---

```
85   * @example
86   * ```typescript
87   * const payload = buildXMLServerCallPayload({
88   *   xmlFileName: "NewRnl_ISLLSYS_20010101.xml",
89   *   formData: { PolicyType: "NEW" },
90   *   sessionInfo: { compLoc: "PIPH", userId: "PGURJAR", ... },
91   *   calls: [
92   *     { project: "pZStart", class: "cZStart", subroutine: "Policy_SetBeginType" },
93   *     { project: "pZStart", class: "cZStart", subroutine: "Modal_Close" },
94   *   ],
95   * });
96   *
97   * const response = await xmlServerCall(payload);
98   * ```
99   */
100  export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {
101    const {
102      xmlFileName,
103      formData,
104      sessionInfo,
105      calls,
106      callType = 'post',
107      includeCallMode = true,
108      callMode = 'async',
109      buttonMatchcode = 'OK',
110      fieldOrder,
111      utpOrder,
112      sessionXml = [],
113      sessionXmlAsString = false,
114      mstrObject = 'ZENTEDTCTL',
115      eeData: providedEEData,
116      processIndicator,
117    } = params;
118
```


========== IMG_3395.md ==========
---
photo: IMG_3395.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 100-134
orientation: 180
confidence: high
notes: Line 100 "export function buildXMLServerCallPayload(...)" is a sticky-scroll pinned header. Lines 102-117 duplicate content already captured cleanly in IMG_3394 (destructuring block), shown here with motion/scroll ghosting (offset ~8 lines, faint duplicate trail ignored, sharp foreground layer used). Lines 118-134 are new and sharp/legible: normalizedCallType computation (String(callType||'post').trim().toLowerCase()), resolvedProcessIndicator computation (nullish-coalescing + ternary chain mapping 'pre'->'0'/'post'->'1'/else raw value), and the start of a logger.debug(...) call. Line 134 "callCount: calls.length" is at the very bottom edge of the screen, likely continues off-frame (possible trailing comma not visible). Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Single tab open. Timestamp 6:18 PM 7/10/2026.
---

```
100 export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {   ⟪sticky-scroll pinned header⟫
    const {
102   xmlFileName,
103   formData,
104   sessionInfo,
105   calls,
106   callType = 'post',
107   includeCallMode = true,
108   callMode = 'async',
109   buttonMatchcode = 'OK',
110   fieldOrder,
111   utpOrder,
112   sessionXml = [],
113   sessionXmlAsString = false,
114   mstrObject = 'ZENTEDTCTL',
115   eeData: providedEEData,
116   processIndicator,
117 } = params;
118
119 const normalizedCallType =
120   String(callType || 'post')
121     .trim()
122     .toLowerCase() || 'post';
123 const resolvedProcessIndicator =
124   processIndicator ??
125   (normalizedCallType === 'pre'
126     ? '0'
127     : normalizedCallType === 'post'
128       ? '1'
129       : normalizedCallType);
130
131 logger.debug('Building XMLServerCall payload', {
132   xmlFileName,
133   formDataKeys: Object.keys(formData),
134   callCount: calls.length
```


========== IMG_3396.md ==========
---
photo: IMG_3396.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 100,115-147
orientation: 180
confidence: high
notes: Line 100 "export function buildXMLServerCallPayload(...)" is a sticky-scroll pinned header. Strong motion/scroll ghosting throughout (offset ~13 lines, faint duplicate trail ignored, sharp foreground layer used, cross-checked by de-interleaving two overlapping copies of the same content which agreed). Lines 115-134 duplicate/cross-validate IMG_3395's content. New content: rest of the logger.debug(...) object (sessionXmlItemCount, hasProvidedEEData, closing `});`), then a comment and the start of eeDataValue construction (`providedEEData || buildEEDataArray({...})`) with fields xmlFileName, buttonMatchcode, formData, fieldOrder, utpOrder passed through. Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Single tab open. Timestamp 6:18 PM 7/10/2026.
---

```
100 export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {   ⟪sticky-scroll pinned header⟫
...
115   eeData: providedEEData,
116   processIndicator,
117 } = params;
118
119 const normalizedCallType =
120   String(callType || 'post')
121     .trim()
122     .toLowerCase() || 'post';
123 const resolvedProcessIndicator =
124   processIndicator ??
125   (normalizedCallType === 'pre'
126     ? '0'
127     : normalizedCallType === 'post'
128       ? '1'
129       : normalizedCallType);
130
131 logger.debug('Building XMLServerCall payload', {
132   xmlFileName,
133   formDataKeys: Object.keys(formData),
134   callCount: calls.length,
135   sessionXmlItemCount: sessionXml.length,
136   hasProvidedEEData: !!providedEEData,
137 });
138
139 // Use provided EEData if available, otherwise build it
140 const eeDataValue =
141   providedEEData ||
142   buildEEDataArray({
143     xmlFileName,
144     buttonMatchcode,
145     formData,
146     fieldOrder,
147     utpOrder,
```


========== IMG_3397.md ==========
---
photo: IMG_3397.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 100,131-165
orientation: 180
confidence: high
notes: Line 100 sticky-scroll pinned header. Heavy motion/scroll ghosting throughout (multiple overlapping offsets, roughly 3-17 lines depending on region — likely camera caught more than one intermediate scroll frame). Lines 131-147 duplicate/cross-validate IMG_3396's content. CORRECTION (resolved against the clearer, less-ghosted IMG_3398 which shows the same lines 141-155 sharply): lines 148-151 were initially misread — the buildEEDataArray({...}) call actually includes a `sessionXml,` field at line 148, `processIndicator: resolvedProcessIndicator,` at 149, closes with `});` at 150, and line 151 is blank (not ambiguous). Corrected below; lines 156-165 (the buildSessionXml ternary branches) were already correct. Photo cuts off mid-object-literal at line 165 "items: sessionXml,". Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Single tab open. Timestamp 6:18 PM 7/10/2026.
---

```
100 export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {   ⟪sticky-scroll pinned header⟫
...
131 logger.debug('Building XMLServerCall payload', {
132   xmlFileName,
133   formDataKeys: Object.keys(formData),
134   callCount: calls.length,
135   sessionXmlItemCount: sessionXml.length,
136   hasProvidedEEData: !!providedEEData,
137 });
138
139 // Use provided EEData if available, otherwise build it
140 const eeDataValue =
141   providedEEData ||
142   buildEEDataArray({
143     xmlFileName,
144     buttonMatchcode,
145     formData,
146     fieldOrder,
147     utpOrder,
148     sessionXml,
149     processIndicator: resolvedProcessIndicator,
150   });
151
152 // Build SessionInformation value array
153 // Format: [compLoc, userId, policyID, nodeKey, action, diagnosticMode, sessionXml]
154 // Note: compLoc is empty string for field commit calls
155 const sessionXmlValue = sessionXmlAsString
156   ? buildSessionXml({
157       items: {
158         item: sessionXml.map((item) => ({
159           '@name': item.name,
160           '@value': item.value,
161         })),
162       },
163     })
164   : {
165       items: sessionXml,
```


========== IMG_3398.md ==========
---
photo: IMG_3398.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 100,139-170
orientation: 180
confidence: high
notes: Line 100 sticky-scroll pinned header (not shown in body, breadcrumb only). Motion/scroll ghosting throughout (sharp foreground layer used; offset ~2-3 lines). This photo's clearer capture of lines 141-155 corrected an ambiguity from IMG_3397 (see that transcript's correction note) — confirmed buildEEDataArray({...}) includes `sessionXml,` at line 148 before `processIndicator: resolvedProcessIndicator,` at 149, closing `});` at 150, blank at 151. Lines 152-165 duplicate/cross-validate IMG_3397. New content: lines 166-170 — closes the sessionXmlValue ternary's else-branch object (`};`), then starts `const sessionInfoValue: [` a tuple type annotation with `string, string,` elements (SessionInformation array shape, per the earlier comment "// Format: [compLoc, userId, policyID, nodeKey, action, diagnosticMode, sessionXml]"). Photo cuts off at line 170; more tuple elements likely continue off-screen. Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Single tab open. Timestamp 6:18 PM 7/10/2026.
---

```
100 export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {   ⟪sticky-scroll pinned header⟫
139 // Use provided EEData if available, otherwise build it
140 const eeDataValue =
141   providedEEData ||
142   buildEEDataArray({
143     xmlFileName,
144     buttonMatchcode,
145     formData,
146     fieldOrder,
147     utpOrder,
148     sessionXml,
149     processIndicator: resolvedProcessIndicator,
150   });
151
152 // Build SessionInformation value array
153 // Format: [compLoc, userId, policyID, nodeKey, action, diagnosticMode, sessionXml]
154 // Note: compLoc is empty string for field commit calls
155 const sessionXmlValue = sessionXmlAsString
156   ? buildSessionXml({
157       items: {
158         item: sessionXml.map((item) => ({
159           '@name': item.name,
160           '@value': item.value,
161         })),
162       },
163     })
164   : {
165       items: sessionXml,
166     };
167
168 const sessionInfoValue: [
169   string,
170   string,
```


========== IMG_3399.md ==========
---
photo: IMG_3399.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 100,140,150-181
orientation: 180
confidence: high
notes: Clean, sharp capture — minimal ghosting (only very faint on line 149/"const eeDataValue ="). Two sticky-scroll pinned headers at top: line 100 (function signature) and line ~140 "const eeDataValue =" (nested scope). Lines 150-166 duplicate/cross-validate IMG_3397/3398. New content: lines 167-181 — the sessionInfoValue tuple type annotation (6 strings plus a union-typed 7th element `{ items: Array<{name,value}> } | string`), then its value array literal starting with compLoc as empty string, sessionInfo.userId, sessionInfo.policyId (default '0'), sessionInfo.nodeKey (default 'POL|POL|0|'), sessionInfo.action. Photo cuts off mid-array at line 181. Explorer sidebar unchanged (build-xml-server-call-payload.ts selected under src/utils). Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Single tab open. Timestamp 6:18 PM 7/10/2026.
---

```
100 export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {   ⟪sticky-scroll pinned header⟫
140 const eeDataValue =   ⟪sticky-scroll pinned header, nested scope⟫
150   });
151
152 // Build SessionInformation value array
153 // Format: [compLoc, userId, policyID, nodeKey, action, diagnosticMode, sessionXml]
154 // Note: compLoc is empty string for field commit calls
155 const sessionXmlValue = sessionXmlAsString
156   ? buildSessionXml({
157       items: {
158         item: sessionXml.map((item) => ({
159           '@name': item.name,
160           '@value': item.value,
161         })),
162       },
163     })
164   : {
165       items: sessionXml,
166     };
167
168 const sessionInfoValue: [
169   string,
170   string,
171   string,
172   string,
173   string,
174   string,
175   { items: Array<{ name: string; value: string }> } | string,
176 ] = [
177   '', // compLoc is empty string for XMLServerCall
178   sessionInfo.userId || '',
179   sessionInfo.policyId || '0',
180   sessionInfo.nodeKey || 'POL|POL|0|',
181   sessionInfo.action || '',
```


========== IMG_3400.md ==========
---
photo: IMG_3400.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 100,152-183
orientation: 180
confidence: medium
notes: >
  Photo has a ghosting/double-exposure artifact (screen appears to have been
  mid-scroll-animation when captured) — every line shows a faint duplicate of
  nearby content offset by ~1-2 lines behind the sharp/bold text. Transcribed
  from the sharp foreground layer only, cross-checked against the ghost layer
  which showed matching text, so confident in content but marking medium
  confidence due to the artifact. Line 100 is a VS Code sticky-scroll header
  (enclosing function signature) pinned above the scrolled body starting at
  line 152 — gap between 100 and 152 not visible in this photo. Tab
  "build-xml-server-call-payload.ts" shown in italics (preview-mode tab).
  Breadcrumb: aqs-web-ui > src > utils > build-xml-server-call-payload.ts >
  (function name after this obscured by code text). Explorer sidebar visible:
  AQS_WORKSPACE > aqs-web-ui > src > providers (theme-provider.tsx) > services
  (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts,
  xml-server-call.ts) > types (grid-response.ts, marked "U") > utils
  (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts,
  build-cycling-url.ts, build-eedata-array.ts,
  build-xml-server-call-payload.ts [selected/highlighted],
  button-state-manager.ts, check-action-permission.ts, command-handlers.ts,
  common.ts, control-metadata-extractor.ts, create-store.tsx,
  detect-modal-type.ts). Status bar: workspace "aqs-web-ui", branch
  "hitanshu/experimental*" (dirty), 2 errors / 0 warnings, "No Solution",
  Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
100  export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {
     ⟪... sticky-scroll gap, lines 101-151 not visible in photo ...⟫
152      // Build SessionInformation value array
153      // Format: [compLoc, userId, policyID, nodeKey, action, diagnosticMode, sessionXml]
154      // Note: compLoc is empty string for field commit calls
155      const sessionXmlValue = sessionXmlAsString
156          ? buildSessionXml({
157                  items: {
158                      item: sessionXml.map((item) => ({
159                          '@name': item.name,
160                          '@value': item.value,
161                      })),
162              },
163          })
164          : {
165              items: sessionXml,
166          };
167
168      const sessionInfoValue: [
169          string,
170          string,
171          string,
172          string,
173          string,
174          string,
175          { items: Array<{ name: string; value: string }> } | string,
176      ] = [
177          '', // compLoc is empty string for XMLServerCall
178          sessionInfo.userId || '',
179          sessionInfo.policyId || '0',
180          sessionInfo.nodeKey || 'POL|POL|0',
181          sessionInfo.action || '',
182          sessionInfo.diagnosticMode || '0',
183          sessionXmlValue,


========== IMG_3401.md ==========
---
photo: IMG_3401.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 100,168,176-199
orientation: 180
confidence: medium
notes: >
  Same file/tab as IMG_3400, scrolled further down. Photo has a strong
  ghosting/double-exposure artifact (screen mid-scroll-animation during
  capture) — a second, fainter copy of the text appears offset by roughly
  5-6 lines below/through the sharp foreground layer. Transcribed from the
  sharp foreground layer, which forms an internally consistent, syntactically
  sensible sequence (verified against the ghost layer showing the same text
  ~5-6 lines later, i.e. the same content one scroll-moment later). Lines 100
  and 168 are VS Code sticky-scroll headers (enclosing function signature and
  the sessionInfoValue tuple-type opening bracket) pinned above the scrolled
  body which starts around line 176; lines 169-175 are not newly visible here
  (see IMG_3400 for that content) but are repeated faintly under the sticky
  headers. Lines 200-201 ("SessionInformation: {" / "value: sessionInfoValue,")
  were only visible in the blurred/ghost layer, not the sharp layer — read
  with lower confidence, marked below. Content below line 199 is cut off by
  the taskbar/status bar in this photo. Tab "build-xml-server-call-payload.ts"
  in italics (preview-mode tab). Explorer sidebar unchanged from IMG_3400
  (same file selected: build-xml-server-call-payload.ts under
  aqs-web-ui/src/utils). Status bar: workspace "aqs-web-ui", branch
  "hitanshu/experimental*" (dirty), 2 errors / 0 warnings, "No Solution",
  Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
100  export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {
     ⟪... sticky-scroll gap ...⟫
168      const sessionInfoValue: [
     ⟪... lines 169-175 repeated from IMG_3400, not re-transcribed ...⟫
176      ] = [
177          '', // compLoc is empty string for XMLServerCall
178          sessionInfo.userId || '',
179          sessionInfo.policyId || '0',
180          sessionInfo.nodeKey || 'POL|POL|0',
181          sessionInfo.action || '',
182          sessionInfo.diagnosticMode || '0',
183          sessionXmlValue,
184      ];
185
186      // Build payload
187      const callsPayload: { type: string; mode?: string; call: Call | Call[] } = {
188          type: normalizedCallType,
189          call: calls.length === 1 ? calls[0] : calls,
190      };
191
192      if (includeCallMode) {
193          callsPayload.mode = callMode;
194      }
195
196      const payload: XMLServerCallPayload = {
197          aqs: {
198              mstrObject,
199              calls: callsPayload,
200(?)          SessionInformation: {
201(?)              value: sessionInfoValue,


========== IMG_3402.md ==========
---
photo: IMG_3402.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 100,168,174-205
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3400/IMG_3401, scrolled slightly further. No
  ghosting/motion-blur artifact in this photo (unlike IMG_3400/3401) — sharp
  and clearly legible throughout, confirms the reconstructed reading of
  lines 177 and 200-201 from IMG_3401's blurred layers was correct. Lines 100
  and 168 are VS Code sticky-scroll headers (enclosing function signature and
  the sessionInfoValue tuple-type opening bracket) pinned above the scrolled
  body which starts at line 174. Line 205 (closing brace of EEData) is cut
  off at the very bottom edge by the taskbar/status bar — only a partial
  yellow bracket glyph visible, not transcribed. Tab
  "build-xml-server-call-payload.ts" still in italics (preview-mode tab).
  Explorer sidebar unchanged from IMG_3400/3401 (same file selected under
  aqs-web-ui/src/utils). Status bar: workspace "aqs-web-ui", branch
  "hitanshu/experimental*" (dirty), 2 errors / 0 warnings, "No Solution",
  Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
100  export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {
     ⟪... sticky-scroll gap ...⟫
168      const sessionInfoValue: [
     ⟪... lines 169-173 not visible in this photo, see IMG_3400 ...⟫
174          string,
175          { items: Array<{ name: string; value: string }> } | string,
176      ] = [
177          '', // compLoc is empty string for XMLServerCall
178          sessionInfo.userId || '',
179          sessionInfo.policyId || '0',
180          sessionInfo.nodeKey || 'POL|POL|0',
181          sessionInfo.action || '',
182          sessionInfo.diagnosticMode || '0',
183          sessionXmlValue,
184      ];
185
186      // Build payload
187      const callsPayload: { type: string; mode?: string; call: Call | Call[] } = {
188          type: normalizedCallType,
189          call: calls.length === 1 ? calls[0] : calls,
190      };
191
192      if (includeCallMode) {
193          callsPayload.mode = callMode;
194      }
195
196      const payload: XMLServerCallPayload = {
197          aqs: {
198              mstrObject,
199              calls: callsPayload,
200              SessionInformation: {
201                  value: sessionInfoValue,
202              },
203              EEData: {
204                  value: eeDataValue,
205              ⟪partial, cut off by taskbar⟫


========== IMG_3403.md ==========
---
photo: IMG_3403.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 100,187,192-219
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3400-3402, scrolled to the end of the
  buildXMLServerCallPayload function (closing brace at line 219). Photo has
  a moderate ghosting/double-exposure artifact (screen mid-scroll-animation
  during capture) but the sharp foreground layer was cleanly legible
  throughout and internally consistent (cross-checked indentation/bracket
  color of nested closing braces at 205/206/207 to disambiguate from the
  ghost layer). Lines 100 and 187 are VS Code sticky-scroll headers
  (enclosing function signature, and the callsPayload object-literal
  declaration) pinned above the scrolled body which starts at line 192; body
  lines 192-207 duplicate/confirm content already seen in IMG_3402 (which was
  a clean, non-ghosted photo) and lines 208-219 are new. Tab
  "build-xml-server-call-payload.ts" still in italics (preview-mode tab).
  Explorer sidebar unchanged from prior photos (same file selected under
  aqs-web-ui/src/utils). Status bar: workspace "aqs-web-ui", branch
  "hitanshu/experimental*" (dirty), 2 errors / 0 warnings, "No Solution",
  Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 220 shows only a
  faint ghost of "return payload;" with no legible new sharp content before
  being cut off by the taskbar.
---
100  export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {
     ⟪... sticky-scroll gap ...⟫
187      const callsPayload: { type: string; mode?: string; call: Call | Call[] } = {
     ⟪... lines 188-191 not newly visible here, see IMG_3402 ...⟫
192      if (includeCallMode) {
193          callsPayload.mode = callMode;
194      }
195
196      const payload: XMLServerCallPayload = {
197          aqs: {
198              mstrObject,
199              calls: callsPayload,
200              SessionInformation: {
201                  value: sessionInfoValue,
202              },
203              EEData: {
204                  value: eeDataValue,
205              },
206          },
207      };
208
209      logger.info('XMLServerCall payload built', {
210          mstrObject,
211          callType: normalizedCallType,
212          callCount: calls.length,
213          buttonMatchcode,
214          eeDataLength: eeDataValue.length,
215          sessionXmlItemCount: sessionXml.length,
216      });
217
218      return payload;
219  }


========== IMG_3404.md ==========
---
photo: IMG_3404.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 100,196,197,203,205-234
orientation: 180
confidence: medium
notes: >
  Same file/tab as IMG_3400-3403, scrolled further to show the end of
  buildXMLServerCallPayload and the start of a JSDoc comment for a new
  function extractCallsFromPageBuild (function signature itself not yet
  visible - comment is cut off by the taskbar at line 234). Photo has a
  ghosting/double-exposure artifact; the sharp foreground layer was legible
  and cross-checked against IMG_3403 for the overlapping lines 205-219 (all
  consistent). Lines 100, 196, 197, and 203 are stacked/nested VS Code
  sticky-scroll headers (function signature > payload object literal > aqs
  object literal > EEData object literal) pinned above the scrolled body
  which starts at line 205. Line 220 is a blank line (a "return payload;"
  ghost duplicate of line 218 appeared overlapping it but is not real content
  at 220). Line 234 ("* // Returns: [{ project: "p7Stant", class: ...")  is
  cut off by the taskbar/status bar - only partially legible, rest marked
  illegible. Tab "build-xml-server-call-payload.ts" still in italics
  (preview-mode tab). Explorer sidebar unchanged from prior photos. Status
  bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), 2
  errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript.
---
100  export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {
     ⟪... sticky-scroll gap ...⟫
196      const payload: XMLServerCallPayload = {
197          aqs: {
     ⟪... sticky-scroll gap ...⟫
203              EEData: {
     ⟪... sticky-scroll gap ...⟫
205              },
206          },
207      };
208
209      logger.info('XMLServerCall payload built', {
210          mstrObject,
211          callType: normalizedCallType,
212          callCount: calls.length,
213          buttonMatchcode,
214          eeDataLength: eeDataValue.length,
215          sessionXmlItemCount: sessionXml.length,
216      });
217
218      return payload;
219  }
220
221  /**
222   * Extract calls array from PageBuild response
223   *
224   * PageBuild returns button controls with `calls` property containing
225   * the COM object calls to execute when button is clicked.
226   *
227   * @param xmlDetail - PageBuild response XML detail
228   * @param buttonMatchcode - Matchcode of the button clicked (e.g., "OK", "SUBMIT")
229   * @returns Array of calls to execute
230   *
231   * @example
232   * ```typescript
233   * const calls = extractCallsFromPageBuild(xmlDetail, "OK");
234   * // Returns: [{ project: "pZStart", class: "cZStart", ⟪rest cut off by taskbar, confirmed/corrected against clearer IMG_3405: "subroutine: "Policy_SetBeginType" }, ...]"⟫


========== IMG_3405.md ==========
---
photo: IMG_3405.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 100,218-249
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3400-3404, scrolled to show the tail of
  buildXMLServerCallPayload, the full JSDoc for extractCallsFromPageBuild,
  and the start of two new helper functions: mapCallRecord and
  normalizeCallList. Mild ghosting artifact present but the sharp foreground
  layer is clearly legible throughout and lets me correct a misread from
  IMG_3404's line 234: the example return value is
  `{ project: "pZStart", class: "cZStart", ... }`, not "p7Stant"/"c7Stant" as
  guessed from that blurrier, taskbar-clipped photo. Line 100 remains the
  sole VS Code sticky-scroll header (function signature) pinned above the
  scrolled body starting at line 218. Content cuts off mid-statement at line
  249 (chained `.map(...)` call) at the taskbar/status bar. Tab
  "build-xml-server-call-payload.ts" still in italics (preview-mode tab).
  Explorer sidebar unchanged from prior photos. Status bar: workspace
  "aqs-web-ui", branch "hitanshu/experimental*" (dirty), 2 errors / 0
  warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
100  export function buildXMLServerCallPayload(params: BuildPayloadParams): XMLServerCallPayload {
     ⟪... sticky-scroll gap ...⟫
218      return payload;
219  }
220
221  /**
222   * Extract calls array from PageBuild response
223   *
224   * PageBuild returns button controls with `calls` property containing
225   * the COM object calls to execute when button is clicked.
226   *
227   * @param xmlDetail - PageBuild response XML detail
228   * @param buttonMatchcode - Matchcode of the button clicked (e.g., "OK", "SUBMIT")
229   * @returns Array of calls to execute
230   *
231   * @example
232   * ```typescript
233   * const calls = extractCallsFromPageBuild(xmlDetail, "OK");
234   * // Returns: [{ project: "pZStart", class: "cZStart", subroutine: "Policy_SetBeginType" }, ...]
235   * ```
236   */
237  function mapCallRecord(callItem: Record<string, unknown>): Call {
238      return {
239          project: String(callItem['@project'] || callItem.project || ''),
240          class: String(callItem['@class'] || callItem.class || ''),
241          subroutine: String(callItem['@subroutine'] || callItem.subroutine || ''),
242          componenttype: String(callItem['@componenttype'] || callItem.componenttype || ''),
243      };
244  }
245
246  function normalizeCallList(call: unknown): Call[] {
247      if (Array.isArray(call)) {
248          return call
249              .map((entry) => mapCallRecord((entry || {}) as Record<string, unknown>))


========== IMG_3406.md ==========
---
photo: IMG_3406.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 227-260
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3400-3405, scrolled further; continues mapCallRecord
  and normalizeCallList and shows the rest of normalizeCallList's body. Sharp,
  clearly legible, no ghosting artifact. No VS Code sticky-scroll header
  visible this time (scroll position is between top-level functions, not
  inside the buildXMLServerCallPayload function, so nothing pins). Lines
  227-236 duplicate content already captured in IMG_3405 with higher/equal
  confidence. Line 249's tail ("entry.componenttyp...") is cut off at the
  right edge of the editor pane by the minimap - likely continues
  ".componenttype)" to close the Boolean(...) call, but not fully visible so
  marked uncertain. Tab "build-xml-server-call-payload.ts" still in italics
  (preview-mode tab). Explorer sidebar unchanged from prior photos. Status
  bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), 2
  errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript.
---
227   * @param xmlDetail - PageBuild response XML detail
228   * @param buttonMatchcode - Matchcode of the button clicked (e.g., "OK", "SUBMIT")
229   * @returns Array of calls to execute
230   *
231   * @example
232   * ```typescript
233   * const calls = extractCallsFromPageBuild(xmlDetail, "OK");
234   * // Returns: [{ project: "pZStart", class: "cZStart", subroutine: "Policy_SetBeginType" }, ...]
235   * ```
236   */
237  function mapCallRecord(callItem: Record<string, unknown>): Call {
238      return {
239          project: String(callItem['@project'] || callItem.project || ''),
240          class: String(callItem['@class'] || callItem.class || ''),
241          subroutine: String(callItem['@subroutine'] || callItem.subroutine || ''),
242          componenttype: String(callItem['@componenttype'] || callItem.componenttype || ''),
243      };
244  }
245
246  function normalizeCallList(call: unknown): Call[] {
247      if (Array.isArray(call)) {
248          return call
249              .map((entry) => mapCallRecord((entry || {}) as Record<string, unknown>))
250              .filter((entry) => Boolean(entry.project || entry.class || entry.subroutine || entry.componenttype⟪cut off at editor edge, likely: )⟫
251      }
252
253      if (call && typeof call === 'object') {
254          const mapped = mapCallRecord(call as Record<string, unknown>);
255          if (mapped.project || mapped.class || mapped.subroutine || mapped.componenttype) {
256              return [mapped];
257          }
258      }
259
260      return [];


========== IMG_3407.md ==========
---
photo: IMG_3407.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 233-265
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3400-3406, scrolled slightly further; shows the tail
  of normalizeCallList and the start of a new function readButtonControl
  (multi-line parameter list). Mild ghosting artifact but sharp foreground
  layer clearly legible. No VS Code sticky-scroll header visible (between
  top-level functions). Lines 233-261 duplicate content already captured
  with equal/higher confidence in IMG_3405/IMG_3406; only 262-265 are newly
  visible content here. Line 249/250's tail ("entry.componenttyp...") is
  still cut off at the right edge of the editor pane by the minimap in this
  photo too - identical crop to IMG_3406, still not fully legible. Tab
  "build-xml-server-call-payload.ts" still in italics (preview-mode tab).
  Explorer sidebar unchanged from prior photos. Status bar: workspace
  "aqs-web-ui", branch "hitanshu/experimental*" (dirty), 2 errors / 0
  warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
233   * const calls = extractCallsFromPageBuild(xmlDetail, "OK");
234   * // Returns: [{ project: "pZStart", class: "cZStart", subroutine: "Policy_SetBeginType" }, ...]
235   * ```
236   */
237  function mapCallRecord(callItem: Record<string, unknown>): Call {
238      return {
239          project: String(callItem['@project'] || callItem.project || ''),
240          class: String(callItem['@class'] || callItem.class || ''),
241          subroutine: String(callItem['@subroutine'] || callItem.subroutine || ''),
242          componenttype: String(callItem['@componenttype'] || callItem.componenttype || ''),
243      };
244  }
245
246  function normalizeCallList(call: unknown): Call[] {
247      if (Array.isArray(call)) {
248          return call
249              .map((entry) => mapCallRecord((entry || {}) as Record<string, unknown>))
250              .filter((entry) => Boolean(entry.project || entry.class || entry.subroutine || entry.componenttype⟪cut off at editor edge⟫
251      }
252
253      if (call && typeof call === 'object') {
254          const mapped = mapCallRecord(call as Record<string, unknown>);
255          if (mapped.project || mapped.class || mapped.subroutine || mapped.componenttype) {
256              return [mapped];
257          }
258      }
259
260      return [];
261  }
262
263  function readButtonControl(
264      xmlDetail: unknown,
265      buttonMatchcode: string,


========== IMG_3408.md ==========
---
photo: IMG_3408.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 237,261-276
orientation: 180
confidence: medium
notes: >
  Same file/tab as IMG_3400-3407, scrolled further to show the end of
  normalizeCallList and the start of a new function readButtonControl.
  Photo has a noticeable ghosting/double-exposure artifact; reconstructed
  the sharp foreground layer's line-by-line content by cross-checking against
  IMG_3407 for lines 261-265 (unchanged) and using sensible/sequential code
  logic for the new lines 266-276 (each ghost offset was consistent with
  blank lines at 262, 270, and 274, which is typical style before a new
  function / after closing braces / between related const declarations).
  Line 237 ("function mapCallRecord(...)") is a VS Code sticky-scroll header
  pinned above the scrolled body starting at line 261. Tab
  "build-xml-server-call-payload.ts" still in italics (preview-mode tab).
  Explorer sidebar unchanged from prior photos. Status bar: workspace
  "aqs-web-ui", branch "hitanshu/experimental*" (dirty), 2 errors / 0
  warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
237  function mapCallRecord(callItem: Record<string, unknown>): Call {
     ⟪... sticky-scroll gap ...⟫
261  }
262
263  function readButtonControl(
264      xmlDetail: unknown,
265      buttonMatchcode: string,
266  ): Record<string, unknown> | undefined {
267      if (!xmlDetail || typeof xmlDetail !== 'object') {
268          return undefined;
269      }
270
271      const detail = xmlDetail as Record<string, unknown>;
272      const page = detail.Page as Record<string, unknown> | undefined;
273      if (!page) return undefined;
274
275      const controls = page.controls as Record<string, unknown> | undefined;
276      if (!controls) return undefined;


========== IMG_3409.md ==========
---
photo: IMG_3409.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 246,260-291
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3400-3408, scrolled further within readButtonControl.
  Photo has a ghosting/double-exposure artifact with a consistent 3-line
  vertical offset (verified directly on the line-number gutter glyphs, e.g.
  sharp "278" with faint ghost "275" behind it, sharp "284" with faint "281",
  etc.) — used this to reliably separate the sharp foreground layer from the
  ghost. Initially lines 280-283 looked like a suspicious near-duplicate
  ("? rawControls" / ": rawControls" then "? [rawControls]" / ": [];") but
  after close zoom this resolved as a real, valid nested/chained ternary
  (Array.isArray(rawControls) ? rawControls : rawControls ? [rawControls] :
  []), not a ghosting artifact - all four lines are genuine distinct code.
  Line 246 ("function normalizeCallList(...)") is a VS Code sticky-scroll
  header pinned above the scrolled body starting at line 260. Lines 260-269
  duplicate content already captured in IMG_3407/IMG_3408 with equal/higher
  confidence. Tab "build-xml-server-call-payload.ts" still in italics
  (preview-mode tab). Explorer sidebar unchanged from prior photos. Status
  bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), 2
  errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript.
---
246  function normalizeCallList(call: unknown): Call[] {
     ⟪... sticky-scroll gap ...⟫
260      return [];
261  }
262
263  function readButtonControl(
264      xmlDetail: unknown,
265      buttonMatchcode: string,
266  ): Record<string, unknown> | undefined {
267      if (!xmlDetail || typeof xmlDetail !== 'object') {
268          return undefined;
269      }
270
271      const detail = xmlDetail as Record<string, unknown>;
272      const page = detail.Page as Record<string, unknown> | undefined;
273      if (!page) return undefined;
274
275      const controls = page.controls as Record<string, unknown> | undefined;
276      if (!controls) return undefined;
277
278      const rawControls = controls.control as unknown;
279      const controlArray = Array.isArray(rawControls)
280          ? rawControls
281          : rawControls
282              ? [rawControls]
283              : [];
284      if (controlArray.length === 0) return undefined;
285
286      const targetMatchcode = String(buttonMatchcode || '')
287          .trim()
288          .toUpperCase();
289
290      return controlArray.find((ctrl) => {
291          const control = ctrl as Record<string, unknown>;


========== IMG_3410.md ==========
---
photo: IMG_3410.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 263,268-299
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3400-3409, scrolled to show the rest of
  readButtonControl through its closing brace. No ghosting artifact in this
  photo - sharp and clearly legible throughout. Confirms the nested/chained
  ternary at lines 279-283 read from IMG_3409 was correct exactly as
  transcribed. Line 263 ("function readButtonControl(") is a VS Code
  sticky-scroll header pinned above the scrolled body starting at line 268;
  lines 264-267 (the rest of the parameter list and return-type annotation,
  already captured in IMG_3408/3409) are not newly visible here. Tab
  "build-xml-server-call-payload.ts" still in italics (preview-mode tab).
  Explorer sidebar unchanged from prior photos. Status bar: workspace
  "aqs-web-ui", branch "hitanshu/experimental*" (dirty), 2 errors / 0
  warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
263  function readButtonControl(
     ⟪... sticky-scroll gap ...⟫
268      return undefined;
269  }
270
271      const detail = xmlDetail as Record<string, unknown>;
272      const page = detail.Page as Record<string, unknown> | undefined;
273      if (!page) return undefined;
274
275      const controls = page.controls as Record<string, unknown> | undefined;
276      if (!controls) return undefined;
277
278      const rawControls = controls.control as unknown;
279      const controlArray = Array.isArray(rawControls)
280          ? rawControls
281          : rawControls
282              ? [rawControls]
283              : [];
284      if (controlArray.length === 0) return undefined;
285
286      const targetMatchcode = String(buttonMatchcode || '')
287          .trim()
288          .toUpperCase();
289
290      return controlArray.find((ctrl) => {
291          const control = ctrl as Record<string, unknown>;
292          const rawMatchcode = control['@matchcode'] ?? control.matchcode;
293          return (
294              String(rawMatchcode || '')
295                  .trim()
296                  .toUpperCase() === targetMatchcode
297          );
298      }) as Record<string, unknown> | undefined;
299  }


========== IMG_3411.md ==========
---
photo: IMG_3411.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 263,299-315
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3400-3410, scrolled to show the closing brace of
  readButtonControl and the start of a new exported function
  extractCallsByTypeFromPageBuild (with a CallsByType return type and a
  default parameter buttonMatchcode = 'OK'). Moderate ghosting artifact but
  sharp foreground layer clearly legible and cross-checked against IMG_3410
  for the overlapping lines 299 (closing brace). Line 263
  ("function readButtonControl(") is a VS Code sticky-scroll header pinned
  above the scrolled body starting at line 299 (unrelated to the newly
  visible content, left over from the previous scroll position). Content
  cuts off after line 315 ("return {};") at the taskbar/status bar; a partial
  ghost of "if (!buttonControl) {" is visible below but not legible as new
  sharp content. Tab "build-xml-server-call-payload.ts" still in italics
  (preview-mode tab). Explorer sidebar unchanged from prior photos. Status
  bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), 2
  errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript.
---
263  function readButtonControl(
     ⟪... sticky-scroll gap ...⟫
299  }
300
301  export function extractCallsByTypeFromPageBuild(
302      xmlDetail: unknown,
303      buttonMatchcode = 'OK',
304  ): CallsByType {
305      if (!xmlDetail || typeof xmlDetail !== 'object') {
306          logger.warn('Invalid xmlDetail provided to extractCallsByTypeFromPageBuild');
307          return {};
308      }
309
310      try {
311          const buttonControl = readButtonControl(xmlDetail, buttonMatchcode);
312
313          if (!buttonControl) {
314              logger.warn('Button control not found', { buttonMatchcode });
315              return {};


========== IMG_3412.md ==========
---
photo: IMG_3412.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 263-320
orientation: 180
confidence: medium
notes: Photo has a motion-blur double-exposure ghosting artifact (two overlapping scroll positions ~4-6 lines apart) throughout the code area, making text partially doubled; transcription below follows the sharper/foreground text layer aligned to gutter line numbers. Large fold between line 263 and 289 (lines 264-288 hidden/collapsed, likely param list or JSDoc). Gutter shows git modified-line color bars (yellow/green) near lines 291-299 and others. Status bar: workspace aqs-web-ui, branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Only tab open: build-xml-server-call-payload.ts (italic = preview tab). Explorer sidebar (aqs-web-ui/src) shows: providers/theme-provider.tsx; services/lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts; types/grid-response.ts (modified marker "U"); utils/api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payload.ts (selected), button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts. CORRECTION (post-hoc, cross-checked against clearer IMG_3414 of same file): lines 317-320 were misaligned by one due to ghosting; correct mapping is 318=callsData, 319=grouped, 320=directCalls (line 320's trailing content below was cut off in this photo, not "if (Array.isArray...)" as originally guessed). Line numbers below corrected accordingly.
---
263  function readButtonControl(
     ⟪? — lines 264-288 folded/not visible ⟫
289      const targetMatchcode = String(buttonMatchcode || '')
290      return controlArray.find((ctrl) => {
291          const control = ctrl as Record<string, unknown>;
292          const rawMatchcode = control['@matchcode'] ?? control.matchcode;
293          return (
294              String(rawMatchcode || '')
295                  .trim()
296                  .toUpperCase() === targetMatchcode
297          );
298      }) as Record<string, unknown> | undefined;
299  }
300
301  export function extractCallsByTypeFromPageBuild(
302      xmlDetail: unknown,
303      buttonMatchcode = 'OK',
304  ): CallsByType {
305      if (!xmlDetail || typeof xmlDetail !== 'object') {
306          logger.warn('Invalid xmlDetail provided to extractCallsByTypeFromPageBuild');
307          return {};
308      }
309      try {
310          const buttonControl = readButtonControl(xmlDetail, buttonMatchcode);
311
312          if (!buttonControl) {
313              logger.warn('Button control not found', { buttonMatchcode });
314              return {};
315          }
317
318          const callsData = (buttonControl.calls ?? buttonControl['@calls']) as unknown;
319          const grouped: CallsByType = {};
320          const directCalls: Call[] = [];
     ⟪? — line partially cut off at bottom of frame ⟫


========== IMG_3413.md ==========
---
photo: IMG_3413.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 301-333
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3412, scrolled further down. Severe motion-blur double-exposure ghosting throughout (a fainter duplicate of the code appears offset by a few lines from the sharp/primary layer); gutter line numbers themselves are mostly single/sharp and were used as the alignment anchor, cross-checked at high zoom crop-by-crop. Lines 321-326 read with good confidence from calibrated per-line crops and confirmed against the much clearer IMG_3414 of the same file. Status bar: 2 errors, 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. CORRECTION (post-hoc, cross-checked against IMG_3414 which shows this same code much more sharply): lines 317-320 were off by one (correct: 318=callsData, 319=grouped, 320=directCalls); the "if('call' in obj)" block actually starts at line 328 (with a blank line 327), not 327/331 as originally guessed, and continues 329=callsForType, 330=if(length===0)continue, 331=blank, 332=targetType, 333=grouped[targetType]=... — the apparent "repeat" of the if('call'...) block noted below was a ghosting misread, not real duplicate code; see IMG_3414 transcript for the fully corrected, high-confidence version of lines 321-349 in this function.
---
301  export function extractCallsByTypeFromPageBuild(
302      xmlDetail: unknown,
303      buttonMatchcode = 'OK',
304  ): CallsByType {
305      if (!xmlDetail || typeof xmlDetail !== 'object') {
306          logger.warn('Invalid xmlDetail provided to extractCallsByTypeFromPageBuild');
307          return {};
308      }
309      try {
310          const buttonControl = readButtonControl(xmlDetail, buttonMatchcode);
311
312          if (!buttonControl) {
313              logger.warn('Button control not found', { buttonMatchcode });
314              return {};
315          }
316
318          const callsData = (buttonControl.calls ?? buttonControl['@calls']) as unknown;
319          const grouped: CallsByType = {};
320          const directCalls: Call[] = [];
321          if (Array.isArray(callsData)) {
322              for (const item of callsData) {
323                  const obj = (item || {}) as Record<string, unknown>;
324                  const callType = String(obj['@type'] || obj.type || '')
325                      .trim()
326                      .toLowerCase();
327
328              if ('call' in obj) {
329                  const callsForType = normalizeCallList(obj.call);
330                  if (callsForType.length === 0) continue;
331
332                  const targetType = callType || 'post';
333                  grouped[targetType] = [...(grouped[targetType] || []), ...callsForType];
     (see IMG_3414 for continuation — this transcript's coverage effectively duplicates/is superseded by that clearer photo for lines 321-333)


========== IMG_3414.md ==========
---
photo: IMG_3414.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 301-349
orientation: 180
confidence: high
notes: Same file/tab as IMG_3412/3413, scrolled further down; much sharper/less-blurred than 3412/3413 (only light ghosting), used to cross-check and correct line numbers from those two. Fold between line 301 and 318 (lines 302-317 hidden/collapsed - the validation/try block seen fully in IMG_3412/3413). This photo resolves the earlier ambiguity: callsData assignment is at line 318 (not 317 as tentatively transcribed in IMG_3412/3413 — those should be treated as off-by-one for lines 317-320 range; corrected copies noted there). Status bar: 2 errors, 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar unchanged from IMG_3412 (build-xml-server-call-payload.ts selected under utils).
---
301  export function extractCallsByTypeFromPageBuild(
     ⟪? — lines 302-317 folded/not visible (validation + try block, see IMG_3412/3413) ⟫
318      const callsData = (buttonControl.calls ?? buttonControl['@calls']) as unknown;
319      const grouped: CallsByType = {};
320      const directCalls: Call[] = [];
321      if (Array.isArray(callsData)) {
322          for (const item of callsData) {
323              const obj = (item || {}) as Record<string, unknown>;
324              const callType = String(obj['@type'] || obj.type || '')
325                  .trim()
326                  .toLowerCase();
327
328              if ('call' in obj) {
329                  const callsForType = normalizeCallList(obj.call);
330                  if (callsForType.length === 0) continue;
331
332                  const targetType = callType || 'post';
333                  grouped[targetType] = [...(grouped[targetType] || []), ...callsForType];
334                  continue;
335              }
336
337              const directCall = normalizeCallList(obj);
338              if (directCall.length > 0) {
339                  directCalls.push(...directCall);
340              }
341          }
342      } else if (callsData && typeof callsData === 'object') {
343          const obj = callsData as Record<string, unknown>;
344          const callType = String(obj['@type'] || obj.type || '')
345              .trim()
346              .toLowerCase();
347
348          if ('call' in obj) {
349  ⟪? — cut off at bottom edge of frame ⟫


========== IMG_3415.md ==========
---
photo: IMG_3415.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 301-357
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3412/3413/3414, scrolled further down (extends to end of visible file area at line 357, cut off by taskbar). Same double-exposure ghosting artifact as other photos in this sequence (~3-line-offset faint duplicate). Lines 301-347 duplicate content already captured with high confidence in IMG_3414 (fold hides 302-324 in this shot) - not fully re-transcribed here, see IMG_3414. SUPERSEDED: the line numbers below for the object-branch if/else (348-357) were revised after cross-checking against the clearer IMG_3416 of the same file, which shows this same block starting one line later (349-360). Trust IMG_3416's transcript for the authoritative line numbers of this block; the code content/statements below are correct, only the exact line numbers may be off by one.
---
301  export function extractCallsByTypeFromPageBuild(
     ⟪? — lines 302-347 folded/duplicate of IMG_3414, see that transcript ⟫
348              if ('call' in obj) {
349                  const callsForType = normalizeCallList(obj.call);
350                  if (callsForType.length > 0) {
351                      grouped[callType || 'post'] = callsForType;
352                  } else {
353                      const directCall = normalizeCallList(obj);
354                      if (directCall.length > 0) {
355                          directCalls.push(...directCall);
356                      }
357                  }
     ⟪? — remaining closing braces / rest of function cut off at bottom of frame (below taskbar) ⟫


========== IMG_3416.md ==========
---
photo: IMG_3416.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 342-373
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3412-3415, scrolled further down; fold hides lines 302-341 (already covered by IMG_3414/3415). Moderate ghosting (~3-line-offset faint duplicate) affects lines 349-364; lines 364-373 are notably sharper/high-confidence. This photo shows the function's ending: extractCallsByTypeFromPageBuild closes at line 372, and a new exported function extractCallsFromPageBuild begins at line 373 (signature cut off at bottom of frame). There is some redundancy/uncertainty around lines 360-364 (an "if (directCalls.length > 0) { grouped.post = ... }" pattern appears to read similarly at both ~362-363 and again clearly at 365-367) which may be a ghosting misread of the same block rather than genuinely duplicated code — treat exact line numbers in the 360-364 span as approximate. Status bar: 2 errors, 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
301  export function extractCallsByTypeFromPageBuild(
     ⟪? — lines 302-341 folded/not visible, see IMG_3414/3415 ⟫
342      } else if (callsData && typeof callsData === 'object') {
343          const obj = callsData as Record<string, unknown>;
344          const callType = String(obj['@type'] || obj.type || '')
345              .trim()
346              .toLowerCase();
347
348
349          if ('call' in obj) {
350              const callsForType = normalizeCallList(obj.call);
351              if (callsForType.length > 0) {
352                  grouped[callType || 'post'] = callsForType;
353              }
354          } else {
355              const directCall = normalizeCallList(obj);
356              if (directCall.length > 0) {
357                  directCalls.push(...directCall);
358              }
359          }
360      }
361  ⟪? — lines 362-364, approximate: blank line then possible early "if (directCalls.length > 0) { grouped.post = [...(grouped.post || []), ...directCalls]; }" (may be ghost duplicate of 365-367) ⟫
365      if (directCalls.length > 0) {
366          grouped.post = [...(grouped.post || []), ...directCalls];
367      }
368      return grouped;
369      } catch (error) {
370          logger.error('Error extracting calls by type from PageBuild response', error as Error);
371          return {};
372      }
373  export function extractCallsFromPageBuild(xmlDetail: unknown, buttonMatchcode = 'OK'): Call[] {


========== IMG_3417.md ==========
---
photo: IMG_3417.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-xml-server-call-payload.ts
lines: 357-389
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3412-3416, scrolled further down. Fold hides lines 302-356 (already covered by earlier photos in this sequence). Lines 357-372 substantially duplicate IMG_3416's content (the tail of extractCallsByTypeFromPageBuild) with heavier ghosting here — not re-transcribed, defer to IMG_3416 for that range. New content: lines 373-386, the new function extractCallsFromPageBuild, transcribed below with good confidence (relatively sharp for lines 379-386, lines 373-378 reconstructed from the initial (upside-down, unrotated) view of this same photo which was more legible for that portion). Status bar: 2 errors, 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Bottom of frame is taskbar — nothing past line ~389.
---
373  export function extractCallsFromPageBuild(xmlDetail: unknown, buttonMatchcode = 'OK'): Call[] {
374      const groupedCalls = extractCallsByTypeFromPageBuild(xmlDetail, buttonMatchcode);
375      if (groupedCalls.post && groupedCalls.post.length > 0) {
376          return groupedCalls.post;
377      }
378
379      const firstNonEmptyType = Object.keys(groupedCalls).find(
380          (callType) => groupedCalls[callType]?.length > 0
381      );
382      if (firstNonEmptyType) {
383          return groupedCalls[firstNonEmptyType];
384      }
385      return [];
386  }
     ⟪? — lines 387-389 blank or cut off at bottom of frame (taskbar) ⟫
