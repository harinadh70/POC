# BUNDLE for src/utils/build-eedata-array.ts
# 49 photo fragment(s), ascending start-line order.


========== IMG_3338.md ==========
---
photo: IMG_3338.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 1-34
orientation: 180
confidence: high
notes: New file (previous photos in this range were build-cycling-url.ts). Very sharp photo, no ghosting/blur. Explorer sidebar (aqs-web-ui/src/utils) shows build-eedata-array.ts selected/highlighted, tab bar shows only this one tab open (no "2" problems badge visible, unlike the previous file). Problems indicator: "2 errors, 0 warnings", "No Solution". Breadcrumb: aqs-web-ui > src > utils > build-eedata-array.ts. Status bar: branch "hitanshu/experimental*", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026.
---
1: import { createFeatureLogger } from '@utils/logger-builder';
2: import type { OptionItem } from '@/types';
3: import type { Call } from '@/services/xml-server-call';
4:
5: const logger = createFeatureLogger('util', 'BuildEEDataArray');
6:
7: /**
8:  * Enhanced EEData Array Builder
9:  * ================================
10:  *
11:  * Implements legacy VBScript SetArrayData behavior for XMLServerCall
12:  * Supports control-type-specific data population
13:  *
14:  * EEData Structure (13 elements: indices 0-12):
15:  *   0 - XML file path
16:  *   1 - Field matchcode
17:  *   2 - Data1 (control-specific: display label for combo/select)
18:  *   3 - Data2 (control-specific: selected value)
19:  *   4 - Data3 (control-specific: selected value duplicate)
20:  *   5 - Process indicator (0=pre, 1=post)
21:  *   6 - Date string (MM/DD/YYYY) or empty
22:  *   7 - Combo adjusted list index or empty
23:  *   8 - Rule attribute from XML
24:  *   9 - Previous label (combo/select only) or empty
25:  *   10 - Previous value (combo/select only) or empty
26:  *   11 - Alternate NodeKey (for XMLList)
27:  *   12 - Control XML element
28:  */
29:
30: /**
31:  * Control Metadata for EEData context
32:  */
33: export interface ControlMetadata {
34:   matchcode: string;


========== IMG_3340.md ==========
---
photo: IMG_3340.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 17-50
orientation: 180
confidence: high
notes: Tab "build-eedata-array.ts" (italic, unsaved/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts. Explorer sidebar fully visible: AQS_WORKSPACE root, aqs-web-ui > src > providers (theme-provider.tsx) > services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts) > types (grid-response.ts, marked "U") > utils (expanded, build-eedata-array.ts highlighted/selected: api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payload...ts, button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026. Line 50 is cut off/occluded at the very bottom of the visible editor area near the taskbar — illegible, likely the closing of the controlType union type (e.g. a string[] or trailing union member) followed by `;`.
---
17:  *  2  - Data1 (control-specific: display label for combo/select)
18:  *  3  - Data2 (control-specific: selected value)
19:  *  4  - Data3 (control-specific: selected value duplicate)
20:  *  5  - Process indicator (0=pre, 1=post)
21:  *  6  - Date string (MM/DD/YYYY) or empty
22:  *  7  - Combo adjusted list index or empty
23:  *  8  - Rule attribute from XML
24:  *  9  - Previous label (combo/select only) or empty
25:  *  10 - Previous value (combo/select only) or empty
26:  *  11 - Alternate NodeKey (for XMLList)
27:  *  12 - Control XML element
28:  */
29:
30: /**
31:  * Control Metadata for EEData context
32:  */
33: export interface ControlMetadata {
34:     matchcode: string;
35:     label?: string;
36:     controlType:
37:         | 'textbox'
38:         | 'textarea'
39:         | 'select'
40:         | 'date'
41:         | 'calendar'
42:         | 'checkbox'
43:         | 'icheckbox'
44:         | 'radio'
45:         | 'radiobutton'
46:         | 'combo'
47:         | 'kpcombo'
48:         | 'numeric'
49:         | string;
50: ⟪?⟫ (illegible — occluded near bottom edge of screen/taskbar)


========== IMG_3339.md ==========
---
photo: IMG_3339.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 21-49
orientation: 180
confidence: medium
notes: Same file as IMG_3338 (build-eedata-array.ts), scrolled down. Overlaps lines 21-32 already captured in IMG_3338 (not repeated in full) and adds new content for lines 33-49: the ControlMetadata interface body with a controlType union type listing ~13 control-type string literals. Moderate double-exposure ghosting (~2-line offset between two overlapping copies) made the exact leading punctuation (union "|" pipe characters, which sit at the far left of each continuation line) uncertain — they were cropped near the left edge and not fully confirmed, so included based on standard TypeScript multi-line union formatting; the string literal content itself (textbox, textarea, select, date, calendar, checkbox, icheckbox, radio, radiobutton, combo, kpcombo, numeric, string) is high confidence. Tab: build-eedata-array.ts, Problems "2 errors, 0 warnings", "No Solution". Explorer sidebar unchanged from IMG_3338 (utils folder, build-eedata-array.ts selected). Status bar: branch "hitanshu/experimental*". Timestamp 6:17 PM 7/10/2026.
---
21:  *   6 - Date string (MM/DD/YYYY) or empty
22:  *   7 - Combo adjusted list index or empty
23:  *   8 - Rule attribute from XML
24:  *   9 - Previous label (combo/select only) or empty
25:  *   10 - Previous value (combo/select only) or empty
26:  *   11 - Alternate NodeKey (for XMLList)
27:  *   12 - Control XML element
28:  */
29:
30: /**
31:  * Control Metadata for EEData context
32:  */
33: export interface ControlMetadata {
34:   matchcode: string;
35:   label?: string;
36:   controlType:
37:     ⟪?⟫'textbox'
38:     ⟪?⟫'textarea'
39:     ⟪?⟫'select'
40:     ⟪?⟫'date'
41:     ⟪?⟫'calendar'
42:     ⟪?⟫'checkbox'
43:     ⟪?⟫'icheckbox'
44:     ⟪?⟫'radio'
45:     ⟪?⟫'radiobutton'
46:     ⟪?⟫'combo'
47:     ⟪?⟫'kpcombo'
48:     ⟪?⟫'numeric'
49:     ⟪?⟫'string';


========== IMG_3341.md ==========
---
photo: IMG_3341.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 30-63
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3340 ("build-eedata-array.ts", italic/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts, scrolled down slightly (now showing 30-63 vs 17-50). Photo has motion-blur double-exposure ghosting: a fainter second exposure of the same viewport appears offset ~3 lines below/behind the sharp text (confirmed by zoomed crop of the gutter showing sharp numbers 45-54 each with a fainter ghost number +3 below it, e.g. sharp "46" with faint "49" ghost beneath). Transcription below uses only the sharp/bright text aligned to each sharp gutter number; faint ghost text ignored as duplicate artifact. Explorer sidebar same as IMG_3340 (utils expanded, build-eedata-array.ts highlighted; also build-cycling-url.ts appears selected/highlighted in this frame's sidebar screenshot - likely just a rendering artifact, build-eedata-array.ts remains the active tab). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same session as IMG_3340). Line 63 partially cut off at the very bottom edge near the "No Solution" status bar but legible in a tight crop.
---
30: /**
31:  * Control Metadata for EEData context
32:  */
33: export interface ControlMetadata {
34:     matchcode: string;
35:     label?: string;
36:     controlType:
37:         | 'textbox'
38:         | 'textarea'
39:         | 'select'
40:         | 'date'
41:         | 'calendar'
42:         | 'checkbox'
43:         | 'icheckbox'
44:         | 'radio'
45:         | 'radiobutton'
46:         | 'combo'
47:         | 'kpcombo'
48:         | 'numeric'
49:         | string;
50:     options?: OptionItem[];
51:     showZero?: boolean; // For combos: default true (offset=0), false (offset=1)
52:     rule?: string;
53:     value?: unknown; // Current value
54: }
55:
56: /**
57:  * Enhanced EEData Array Parameters
58:  */
59: export interface BuildEEDataArrayParams {
60:     xmlFileName: string;
61:     buttonMatchcode: string;
62:     formData: Record<string, unknown>;
63:     fieldOrder?: string[];


========== IMG_3342.md ==========
---
photo: IMG_3342.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 33 (sticky header), 52-84
orientation: 180
confidence: high
notes: Same file/tab as IMG_3340/3341 ("build-eedata-array.ts", italic/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts. Scrolled further down; sticky-scroll header pins line 33 "export interface ControlMetadata {" at the top of the editor (below tabs/breadcrumb), confirming the ControlMetadata interface begun in IMG_3340/3341 continues to close at line 54 here. Explorer sidebar unchanged (utils expanded, build-eedata-array.ts highlighted). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same session). Line 84 is cut off at the very bottom edge near the status bar; only "processIndicator: '0' | '1';" confirmed legible via tight crop, remainder of line (if any) not visible.
---
33: export interface ControlMetadata { [sticky-scroll pinned header line]
52:     rule?: string;
53:     value?: unknown; // Current value
54: }
55:
56: /**
57:  * Enhanced EEData Array Parameters
58:  */
59: export interface BuildEEDataArrayParams {
60:     xmlFileName: string;
61:     buttonMatchcode: string;
62:     formData: Record<string, unknown>;
63:     fieldOrder?: string[];
64:     utpOrder?: string[];
65:     sessionXml?: Array<{ name: string; value: string }>;
66:     processIndicator?: string;
67:     controlMetadata?: ControlMetadata;
68:     primaryFieldValue?: unknown; // For buttons: the field value to populate at index 2
69:     previousValue?: unknown; // For combo/select: the previous selected value (for indices 9-10)
70:     previousLabel?: string; // For combo/select: the previous selected label (to avoid re-lookup)
71: }
72:
73: export interface LegacyPrePostPlanParams {
74:     matchcode: string;
75:     control?: Record<string, unknown>;
76:     callsByType: Record<string, Call[]>;
77:     runtimeOptionsCount?: number;
78:     baseFormData: Record<string, unknown>;
79: }
80:
81: export interface LegacyPrePostPlanResult {
82:     selectedCallType: string;
83:     runtimeCalls: Call[];
84:     processIndicator: '0' | '1'; ⟪cut off at bottom edge — remainder not visible⟫


========== IMG_3343.md ==========
---
photo: IMG_3343.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 59 (sticky header), 68-99
orientation: 180
confidence: high
notes: Same file/tab as IMG_3340-3342 ("build-eedata-array.ts", italic/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts. Sticky-scroll header pins line 59 "export interface BuildEEDataArrayParams {" at the top of the editor. Explorer sidebar unchanged (utils expanded, build-eedata-array.ts highlighted). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same session). Line 99 "control," visible at very bottom edge (confirmed via crop); line 100 begins immediately below but is entirely cut off by the taskbar/status bar, not legible (only a red squiggle underline fragment visible).
---
59: export interface BuildEEDataArrayParams { [sticky-scroll pinned header line]
68:     primaryFieldValue?: unknown; // For buttons: the field value to populate at index 2
69:     previousValue?: unknown; // For combo/select: the previous selected value (for indices 9-10)
70:     previousLabel?: string; // For combo/select: the previous selected label (to avoid re-lookup)
71: }
72:
73: export interface LegacyPrePostPlanParams {
74:     matchcode: string;
75:     control?: Record<string, unknown>;
76:     callsByType: Record<string, Call[]>;
77:     runtimeOptionsCount?: number;
78:     baseFormData: Record<string, unknown>;
79: }
80:
81: export interface LegacyPrePostPlanResult {
82:     selectedCallType: string;
83:     runtimeCalls: Call[];
84:     processIndicator: '0' | '1';
85:     payloadFormData: Record<string, unknown>;
86: }
87:
88: /**
89:  * Resolve pre/post commit call plan using legacy dropdown semantics.
90:  *
91:  * Rules:
92:  * - Default to post calls.
93:  * - For dropdown-like controls with no available list items, use pre calls when present.
94:  * - If post calls are missing but pre exists, fallback to pre.
95:  * - For pre calls, blank the committed field in payload formData.
96:  */
97: export function resolveLegacyPrePostPlan({
98:     matchcode,
99:     control,
100: ⟪?⟫ (cut off entirely by taskbar/status bar — not visible)


========== IMG_3344.md ==========
---
photo: IMG_3344.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 96-128
orientation: 180
confidence: low
notes: Same file/tab as IMG_3340-3343 ("build-eedata-array.ts", italic/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts. Continuation of resolveLegacyPrePostPlan() begun in IMG_3343 (lines 96-99 overlap/confirm that photo). SEVERE motion blur: the photo appears to have been taken while the editor was mid-scroll, so the gutter/text is sharp for lines 96-109 and again for lines 113-128, but lines 110-112 are smeared into an unreadable blur band between the two sharp zones (numbers and text both illegible there). Additionally a fainter double-exposure ghost (offset ~+3 lines, same artifact seen in IMG_3341) overlaps much of the sharp text throughout, e.g. line 106's "const rawControlType = String(control?.['@controltype'] ?? control?.controltype ?? '')" ghosts through strongly at the line-109 position, obscuring line 109's actual content. Line 109 is almost certainly a `const someBoolean =` declaration whose boolean expression continues into the `||`-chained lines 113-116 (rawControlType.includes('select') / .includes('list') / Object.prototype.hasOwnProperty.call(...,'listitems') / (...,'@limittolist')), but the exact variable name/text could not be confirmed and is NOT guessed here. Line 128 is cut off at the very bottom edge near the status bar and also ghost-obscured; a closing "})();" is visible but may be a ghost repeat of line 127's closing rather than line 128's real (different) content — not confirmed. A faint ghost fragment further right/below (not assigned to any confirmed line number) reads roughly "...= runtimeOptionsCount.length > 0 || hasServerListItems;" suggesting the function continues with a variable built from runtimeOptionsCount and hasServerListItems shortly after line 128, but this is speculative and out of frame/confidence. Explorer sidebar unchanged (utils expanded, build-eedata-array.ts highlighted). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same session).
---
96: */
97: export function resolveLegacyPrePostPlan({
98:     matchcode,
99:     control,
100:     callsByType,
101:     runtimeOptionsCount = 0,
102:     baseFormData,
103: }: LegacyPrePostPlanParams): LegacyPrePostPlanResult | null {
104:     const postCalls = callsByType.post ?? [];
105:     const preCalls = callsByType.pre ?? [];
106:     const rawControlType = String(control?.['@controltype'] ?? control?.controltype ?? '')
107:         .trim()
108:         .toLowerCase();
109: ⟪?⟫ (obscured by strong ghost overlap of line 106's text; likely a `const ... =` declaration opening the boolean expression continued at 113, but exact text not confirmed)
110: ⟪?⟫ (illegible — motion-blur transition band)
111: ⟪?⟫ (illegible — motion-blur transition band)
112: ⟪?⟫ (illegible — motion-blur transition band)
113:         rawControlType.includes('select') ||
114:         rawControlType.includes('list') ||
115:         Object.prototype.hasOwnProperty.call(control ?? {}, 'listitems') ||
116:         Object.prototype.hasOwnProperty.call(control ?? {}, '@limittolist');
117:     const rawListItems = control?.listitems as unknown;
118:     const hasServerListItems = (() => {
119:         if (!rawListItems) return false;
120:         if (Array.isArray(rawListItems)) return rawListItems.length > 0;
121:         if (typeof rawListItems !== 'object') return false;
122:         const obj = rawListItems as Record<string, unknown>;
123:         const item = obj.item;
124:         if (Array.isArray(item)) return item.length > 0;
125:         if (item && typeof item === 'object') return true;
126:         return false;
127:     })();
128: ⟪?⟫ (cut off at bottom edge and ghost-obscured — a "})();" is visible but may be a ghost repeat of line 127, not confirmed as line 128's actual distinct content)


========== IMG_3345.md ==========
---
photo: IMG_3345.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 97 (sticky header), 102-133
orientation: 180
confidence: low
notes: Same file/tab as IMG_3340-3344 ("build-eedata-array.ts", italic/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts. Sticky-scroll header pins line 97 "export function resolveLegacyPrePostPlan({" at the top. Continuation of resolveLegacyPrePostPlan() also photographed in IMG_3343/3344. Persistent double-exposure ghosting throughout (same artifact as IMG_3341/3344): a fainter duplicate of each line's text reappears ~3 lines below its true position, occasionally rendering nearly as sharp as the real text, making bold-vs-ghost discrimination difficult in several spots. IMPORTANT DISCREPANCY: this photo's gutter clearly and consistently prints "106" next to the text "}: LegacyPrePostPlanParams): LegacyPrePostPlanResult | null {" (verified via dedicated high-zoom gutter-only crop showing an unbroken sequential run 105,106,107,108,109,110,111,112,113,114,115,116,117,118 with no gaps), but IMG_3343 — a clean, unambiguous, non-ghosted photo of this same file — established that exact same text at line 103. This is a 3-line conflict I could not resolve with confidence; it may be that the ghost artifact caused a misattribution of text to gutter number in one or both photos despite careful zoomed inspection. Line numbers below are transcribed as literally printed in this photo's gutter; readers reconciling multiple photos of this function should treat the 100-133 range here as offset by a possible ±3 lines relative to IMG_3343/IMG_3344's numbering. Lines 110, 128, 130, 131 showed no distinct new bold text over the ghost/background and are transcribed as blank — could instead be additional illegible content. UPDATE after cross-checking IMG_3346 (which pins "const hasServerListItems = (() => {" as a sticky-scroll header at the unambiguous line 119): this photo's numbering from ~110 onward is likely off by roughly +1 relative to the true file (i.e. what is labeled 118 here is probably really 119, etc.), and IMG_3346 shows only ONE blank line between "const hasListItems = ..." and "let selectedCallType = 'post';" (not two as tentatively read here at 130-131) — treat lines 128-133 below as lower-confidence than the rest of this transcript; IMG_3346 is the more reliable source for that specific span. Explorer sidebar unchanged (utils expanded, build-eedata-array.ts highlighted). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same session).
---
97: export function resolveLegacyPrePostPlan({ [sticky-scroll pinned header line]
102:     baseFormData,
103: }: LegacyPrePostPlanParams): LegacyPrePostPlanResult | null {
104:     const postCalls = callsByType.post ?? [];
105:     const preCalls = callsByType.pre ?? [];
106: ⟪uncertain — gutter reads "106" here but text visually matches "}: LegacyPrePostPlanParams): LegacyPrePostPlanResult | null {" already assigned to 103 above; likely ghost/misattribution, see notes⟫
107:     const rawControlType = String(control?.['@controltype'] ?? control?.controltype ?? '')
108:         .trim()
109:         .toLowerCase();
110: ⟪blank line, or content obscured by strong ghost of line 107⟫
111:     const isDropdownControl =
112:         rawControlType.includes('combo') ||
113:         rawControlType.includes('select') ||
114:         rawControlType.includes('list') ||
115:         Object.prototype.hasOwnProperty.call(control ?? {}, 'listitems') ||
116:         Object.prototype.hasOwnProperty.call(control ?? {}, '@limittolist');
117:     const rawListItems = control?.listitems as unknown;
118:     const hasServerListItems = (() => {
119:         if (!rawListItems) return false;
120:         if (Array.isArray(rawListItems)) return rawListItems.length > 0;
121:         if (typeof rawListItems !== 'object') return false;
122:         const obj = rawListItems as Record<string, unknown>;
123:         const item = obj.item;
124:         if (Array.isArray(item)) return item.length > 0;
125:         if (item && typeof item === 'object') return true;
126:         return false;
127:     })();
128: ⟪blank line⟫
129:     const hasListItems = runtimeOptionsCount > 0 || hasServerListItems;
130: ⟪blank line⟫
131: ⟪blank line⟫
132:     let selectedCallType = 'post';
133:     let runtimeCalls = postCalls;


========== IMG_3346.md ==========
---
photo: IMG_3346.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 97 (sticky header), 119 (sticky header), 124-155
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3340-3345 ("build-eedata-array.ts", italic/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts. TWO stacked sticky-scroll headers pinned at top: line 97 "export function resolveLegacyPrePostPlan({" and line 119 "const hasServerListItems = (() => {" — this definitively confirms hasServerListItems is declared at line 119, NOT 118 as tentatively read in IMG_3345 (that photo's numbering for lines ~110-133 should likely be read as +1 relative to the true numbers; see also apparent conflict with IMG_3343/IMG_3344's clean reading of line 103 for "}: LegacyPrePostPlanParams): LegacyPrePostPlanResult | null {" — an exact reconciliation of lines 104-118 across photos was not achieved, but the CONTENT/order of statements in that span is corroborated across IMG_3344 and IMG_3345: rawControlType assignment+.trim()+.toLowerCase(), then const isDropdownControl = rawControlType.includes('combo')||.includes('select')||.includes('list')||Object.prototype.hasOwnProperty.call(...,'listitems')||Object.prototype.hasOwnProperty.call(...,'@limittolist'), then const rawListItems = control?.listitems as unknown, then the hasServerListItems IIFE). Lines 120-123 fall directly underneath the two pinned sticky headers and are NOT visible in this photo (jumps straight from the line-119 sticky header to line 124 as the first actual scrolled row) — not transcribed here. Rest of the photo (124-155) still has the same recurring double-exposure ghost (offset ~+2 to +3 lines, fainter) overlapping the sharp text, but cross-checking bold vs. faint plus semantic coherence (e.g. line 153's "baseFormData;" closing a ternary whose 'pre' branch blanks out `[matchcode]` at line 151, matching the JSDoc comment "For pre calls, blank the committed field in payload formData." seen in IMG_3343/3344) gives medium-high confidence for 124-153. Line 155 "return {" is the last line visible, cut off at the very bottom edge near the status bar. Explorer sidebar unchanged (utils expanded, build-eedata-array.ts highlighted). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same session).
---
97: export function resolveLegacyPrePostPlan({ [sticky-scroll pinned header line]
119: const hasServerListItems = (() => { [sticky-scroll pinned header line]
124:         const item = obj.item;
125:         if (Array.isArray(item)) return item.length > 0;
126:         if (item && typeof item === 'object') return true;
127:         return false;
128:     })();
129: ⟪blank line⟫
130:     const hasListItems = runtimeOptionsCount > 0 || hasServerListItems;
131: ⟪blank line⟫
132:     let selectedCallType = 'post';
133:     let runtimeCalls = postCalls;
134: ⟪blank line⟫
135:     if (isDropdownControl && !hasListItems && preCalls.length > 0) {
136:         selectedCallType = 'pre';
137:         runtimeCalls = preCalls;
138:     } else if (runtimeCalls.length === 0 && preCalls.length > 0) {
139:         selectedCallType = 'pre';
140:         runtimeCalls = preCalls;
141:     }
142: ⟪blank line⟫
143:     if (runtimeCalls.length === 0) {
144:         return null;
145:     }
146: ⟪blank line⟫
147:     const payloadFormData =
148:         selectedCallType === 'pre'
149:             ? {
150:                   ...baseFormData,
151:                   [matchcode]: '',
152:               }
153:             : baseFormData;
154: ⟪blank line⟫
155: return { ⟪cut off at bottom edge — remainder not visible⟫


========== IMG_3347.md ==========
---
photo: IMG_3347.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 97 (sticky header), 136-168
orientation: 180
confidence: medium-high
notes: Same file/tab as IMG_3340-3346 ("build-eedata-array.ts", italic/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts. Sticky-scroll header pins line 97 "export function resolveLegacyPrePostPlan({" only (no second sticky header this time, since the scroll position is now past the hasServerListItems IIFE closure). Lines 136-155 in this photo exactly cross-validate IMG_3346's independent reading of the same lines (identical text at identical line numbers), which gives strong confidence in this numbering and by extension in IMG_3346's chain back to line 119. New content beyond IMG_3346: lines 156-168 close out resolveLegacyPrePostPlan's return statement (selectedCallType, runtimeCalls, processIndicator, payloadFormData — matching the LegacyPrePostPlanResult interface fields seen in IMG_3343) and begin a new JSDoc block "Textbox/Textarea Handler". Usual double-exposure ghost (offset ~+3 lines, fainter) overlaps throughout but bold/faint discrimination was reasonably clear via zoomed crop. Line 168 "* data3-7 = empty" is the last visible line, near the bottom edge; content beyond it not visible. Explorer sidebar unchanged (utils expanded, build-eedata-array.ts highlighted). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same session).
---
97: export function resolveLegacyPrePostPlan({ [sticky-scroll pinned header line]
136:         selectedCallType = 'pre';
137:         runtimeCalls = preCalls;
138:     } else if (runtimeCalls.length === 0 && preCalls.length > 0) {
139:         selectedCallType = 'pre';
140:         runtimeCalls = preCalls;
141:     }
142: ⟪blank line⟫
143:     if (runtimeCalls.length === 0) {
144:         return null;
145:     }
146: ⟪blank line⟫
147:     const payloadFormData =
148:         selectedCallType === 'pre'
149:             ? {
150:                   ...baseFormData,
151:                   [matchcode]: '',
152:               }
153:             : baseFormData;
154: ⟪blank line⟫
155:     return {
156:         selectedCallType,
157:         runtimeCalls,
158:         processIndicator: selectedCallType === 'pre' ? '0' : '1',
159:         payloadFormData,
160:     };
161: }
162: ⟪blank line⟫
163: /**
164:  * Textbox/Textarea Handler
165:  *
166:  * Populates:
167:  * data2 = value
168:  * data3-7 = empty


========== IMG_3348.md ==========
---
photo: IMG_3348.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 97 (sticky header), 147-181
orientation: 180
confidence: medium-high
notes: Same file/tab as IMG_3340-3347 ("build-eedata-array.ts", italic/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts. Sticky-scroll header pins line 97 "export function resolveLegacyPrePostPlan({". Lines 147-168 overlap and exactly cross-validate IMG_3347's independent reading (identical text/numbers), reinforcing confidence in that numbering. New content beyond IMG_3347: lines 169-181 finish the JSDoc for buildTextboxEEData (Example: Policy Number "12345"POLPOLEXT_NyxClsTyp_StringValue -> ["12345","","","",""]) then the function signature `function buildTextboxEEData(value: unknown, buttonMatchcode?: string): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {` and its first body statements (a console.log and an if-branch for buttonMatchcode 'POLPOLEXT_Nyx_BooleanValue_INFO'). Usual double-exposure ghost (offset ~+3 to +5 lines depending on region, fainter) overlaps throughout but bold/faint discrimination was reasonably clear via zoomed crops, and the 173-181 function-signature block matched cleanly against the original overview image with no remaining ambiguity. Explorer sidebar unchanged (utils expanded, build-eedata-array.ts highlighted). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same session).
---
97: export function resolveLegacyPrePostPlan({ [sticky-scroll pinned header line]
147:     const payloadFormData =
148:         selectedCallType === 'pre'
149:             ? {
150:                   ...baseFormData,
151:                   [matchcode]: '',
152:               }
153:             : baseFormData;
154: ⟪blank line⟫
155:     return {
156:         selectedCallType,
157:         runtimeCalls,
158:         processIndicator: selectedCallType === 'pre' ? '0' : '1',
159:         payloadFormData,
160:     };
161: }
162: ⟪blank line⟫
163: /**
164:  * Textbox/Textarea Handler
165:  *
166:  * Populates:
167:  * data2 = value
168:  * data3-7 = empty
169:  *
170:  * Example:
171:  * Policy Number, "12345"POLPOLEXT_NyxClsTyp_StringValue
172:  *   -> ["12345", "", "", "", ""]
173:  */
174: function buildTextboxEEData(
175:     value: unknown,
176:     buttonMatchcode?: string,
177: ): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
178:     console.log('in POLPOLEXT_NyxClsTyp_StringValue', buttonMatchcode);
179:     if ((buttonMatchcode === 'POLPOLEXT_Nyx_BooleanValue_INFO')) {
180:         return [String(value || ''), 'POL|POL|0', '', '', ''];
181:     }


========== IMG_3349.md ==========
---
photo: IMG_3349.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 164-197
orientation: 180
confidence: high
notes: Same file/tab as IMG_3340-3348 ("build-eedata-array.ts", italic/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts. No sticky-scroll header visible this time. Lines 164-182 overlap and exactly cross-validate IMG_3347/IMG_3348's independent readings of the same lines. New content: lines 181-183 close out buildTextboxEEData (final fallback `return [String(value || ''), '', '', '', ''];` then closing brace), followed by a new JSDoc block for a "Select Handler (HTML SELECT)" function documenting data2 (display text/label), data3 (selected value), data4 (selected value duplicate), data7 (empty, not set for SELECT), data9-10 (previous selection label/value if provided), with a worked example. Usual double-exposure ghost (offset ~+3 lines, fainter) overlaps the top portion (164-183) but the bottom portion (185-196, the new Select Handler JSDoc) is much sharper/cleaner with minimal ghosting, giving high confidence there. Line 197 (presumably the JSDoc's closing "*/") is cut off at the very bottom edge near the status bar, only a small fragment visible, not confidently legible. Explorer sidebar unchanged (utils expanded, build-eedata-array.ts highlighted). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same session).
---
164:  * Textbox/Textarea Handler
165:  *
166:  * Populates:
167:  *   data2 = value
168:  *   data3-7 = empty
169:  *
170:  * Example:
171:  *   Policy Number, "12345"POLPOLEXT_NyxClsTyp_StringValue
172:  *   -> ["12345", "", "", "", ""]
173:  */
174: function buildTextboxEEData(
175:     value: unknown,
176:     buttonMatchcode?: string,
177: ): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
178:     console.log('in POLPOLEXT_NyxClsTyp_StringValue', buttonMatchcode);
179:     if ((buttonMatchcode === 'POLPOLEXT_Nyx_BooleanValue_INFO')) {
180:         return [String(value || ''), 'POL|POL|0', '', '', ''];
181:     }
182:     return [String(value || ''), '', '', '', ''];
183: }
184: ⟪blank line⟫
185: /**
186:  * Select Handler (HTML SELECT)
187:  *
188:  * Matches VBS SELECT control:
189:  *   data2 = display text (label)
190:  *   data3 = selected value
191:  *   data4 = selected value (duplicate)
192:  *   data7 = empty (NOT set for SELECT)
193:  *   data9-10 = previous selection (label, value) if provided
194:  *
195:  * Example (selected label="Apartment Package", value="AK", previous="Condo", "CD"):
196:  *   -> [["Apartment Package", "AK", "AK", "", ""], ["Condo", "CD"]]
197: ⟪?⟫ (cut off at bottom edge — likely "*/", not confidently legible)


========== IMG_3350.md ==========
---
photo: IMG_3350.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 174 (sticky header), 181-213
orientation: 180
confidence: high
notes: Same file/tab as IMG_3340-3349 ("build-eedata-array.ts", italic/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts. Sticky-scroll header pins line 174 "function buildTextboxEEData(". Lines 181-197 overlap and exactly cross-validate IMG_3349's reading (identical text/numbers, and this photo is much sharper with negligible ghosting, confirming line 197 is "*/" — resolving that uncertainty from IMG_3349). New content: lines 198-213 begin a new function buildSelectEEData(value, options, previousValue?, previousLabel?) with a tuple return type [data:[...], previous:[data9,data10]], computing selectedIndex/selectedOption/displayText/selectedValue from the options array, then starting a "Find previous selection" section. This is by far the cleanest/sharpest photo of this file seen so far — almost no double-exposure ghosting. Line 213 is cut off at the very bottom edge near the status bar; only "// Use previousLabel if provided (from session storage), otherwise look it up in" is legible before the cutoff, remainder not visible. Explorer sidebar unchanged (utils expanded, build-eedata-array.ts highlighted). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same session).
---
174: function buildTextboxEEData( [sticky-scroll pinned header line]
181:     }
182:     return [String(value || ''), '', '', '', ''];
183: }
184: ⟪blank line⟫
185: /**
186:  * Select Handler (HTML SELECT)
187:  *
188:  * Matches VBS SELECT control:
189:  *   data2 = display text (label)
190:  *   data3 = selected value
191:  *   data4 = selected value (duplicate)
192:  *   data7 = empty (NOT set for SELECT)
193:  *   data9-10 = previous selection (label, value) if provided
194:  *
195:  * Example (selected label="Apartment Package", value="AK", previous="Condo", "CD"):
196:  *   -> [["Apartment Package", "AK", "AK", "", ""], ["Condo", "CD"]]
197:  */
198: function buildSelectEEData(
199:     value: unknown,
200:     options: OptionItem[] = [],
201:     previousValue?: unknown,
202:     previousLabel?: string,
203: ): [
204:     data: [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown],
205:     previous: [data9: unknown, data10: unknown],
206: ] {
207:     const selectedIndex = options.findIndex((opt) => opt.value === value);
208:     const selectedOption = options[selectedIndex];
209:     const displayText = selectedOption?.label || String(value || '');
210:     const selectedValue = selectedOption?.value || String(value || '');
211: ⟪blank line⟫
212:     // Find previous selection
213:     // Use previousLabel if provided (from session storage), otherwise look it up in ⟪cut off at bottom edge — remainder not visible⟫


========== IMG_3351.md ==========
---
photo: IMG_3351.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 196-228
orientation: 180
confidence: high
notes: Same file/tab as IMG_3340-3350 ("build-eedata-array.ts", italic/preview tab), breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts. No sticky-scroll header visible. Lines 196-213 overlap and exactly cross-validate IMG_3350's reading (identical text/numbers). New content: lines 214-223 resolve the previous selection's label/value (checking previousValue against the options list via findIndex when no previousLabel was supplied, otherwise falling back to String(previousValue)), then lines 224-228 begin a `logger.debug('[EEData] Select data built', { displayText, selectedValue, value, ...` call (continues past the visible area). Usual double-exposure ghost (offset ~+3 lines, fainter) overlaps throughout but bold/faint discrimination was clear via zoomed crops. Line 228 "value," is the last fully visible line, near the bottom edge; content beyond it not visible. Explorer sidebar unchanged (utils expanded, build-eedata-array.ts highlighted). Status bar: "aqs-web-ui", git branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same session).
---
196:  *   -> [["Apartment Package", "AK", "AK", "", ""], ["Condo", "CD"]]
197:  */
198: function buildSelectEEData(
199:     value: unknown,
200:     options: OptionItem[] = [],
201:     previousValue?: unknown,
202:     previousLabel?: string,
203: ): [
204:     data: [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown],
205:     previous: [data9: unknown, data10: unknown],
206: ] {
207:     const selectedIndex = options.findIndex((opt) => opt.value === value);
208:     const selectedOption = options[selectedIndex];
209:     const displayText = selectedOption?.label || String(value || '');
210:     const selectedValue = selectedOption?.value || String(value || '');
211: ⟪blank line⟫
212:     // Find previous selection
213:     // Use previousLabel if provided (from session storage), otherwise look it up
214:     let resolvedPreviousLabel = previousLabel || '';
215:     let previousValueStr = '';
216:     if (previousValue !== undefined && !previousLabel) {
217:         const previousIndex = options.findIndex((opt) => opt.value === previousValue);
218:         const previousOption = options[previousIndex];
219:         resolvedPreviousLabel = previousOption?.label || String(previousValue || '');
220:         previousValueStr = previousOption?.value || String(previousValue || '');
221:     } else {
222:         previousValueStr = String(previousValue || '');
223:     }
224: ⟪blank line⟫
225:     logger.debug('[EEData] Select data built', {
226:         displayText,
227:         selectedValue,
228:         value,


========== IMG_3352.md ==========
---
photo: IMG_3352.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 198-234
orientation: 180
confidence: low
notes: Severe double-exposure/motion-ghosting artifact across the whole photo — every line of text appears duplicated, offset ~2-3 rows up and slightly left, making exact line-to-text mapping unreliable in the 219-234 range. Line 198 is a VS Code sticky-scroll header (function buildSelectEEData( pinned at top); actual scrolled view starts at 202, confirming params/destructure on 199-201 aren't visible. Explorer sidebar (visible, non-ghosted) shows utils/ folder siblings: api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts (selected/highlighted), build-xml-server-call-payload.ts (truncated name), button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts. Also src/ has providers/theme-provider.tsx, services/{lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts}, types/grid-response.ts. Tab bar: only build-eedata-array.ts open. "No Solution", 2 errors / 0 warnings. Branch hitanshu/experimental*, workspace AQS_workspace. Bottom edge of screen cuts off a "retu..." (return) statement fragment before it becomes visible — appears to begin a separate return {...} object literal after the logger.debug(...) call closes, reusing field names previousLabel/previousValue.
---
198: function buildSelectEEData(
    ⟪sticky-scroll header; params 199-201 not visible in frame⟫
202:     previousLabel?: string,
203: ): [
204:     data: [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown],
205:     previous: [data9: unknown, data10: unknown],
206: ] {
207:     const selectedIndex = options.findIndex((opt) => opt.value === value);
208:     const selectedOption = options[selectedIndex];
209:     const displayText = selectedOption?.label || String(value || '');
210:     const selectedValue = selectedOption?.value || String(value || '');
211:     ⟪?⟫
212:     // Find previous selection
213:     // Use previousLabel if provided (from session storage), otherwise look it up
214:     let resolvedPreviousLabel = previousLabel || '';
215:     let previousValueStr = '';
216:     if (previousValue !== undefined && !previousLabel) {
217:         const previousIndex = options.findIndex((opt) => opt.value === previousValue);
218:         const previousOption = options[previousIndex];
219:         resolvedPreviousLabel = previousOption?.label || String(previousValue || '');
220:         previousValueStr = previousOption?.value || String(previousValue || '');
221:     } else {
222:         previousValueStr = String(previousValue || '');
223:     }
224:     ⟪?⟫
225:     logger.debug('[EEData] Select data built', {
226:         displayText,
227:         selectedValue,
228:         selectedIndex,
229:         previousLabel: resolvedPreviousLabel,
230:         previousValue,
231:         selectedIndex ⟪? duplicate/uncertain, may be "previousIndex"⟫,
232:     });
233:     return {
    ⟪fields visible below cut off by bottom of frame:⟫
        previousLabel: resolvedPreviousLabel,
        previousValue,
    ⟪⟫ ... (statement continues beyond visible frame; "retu..." partially visible at bottom edge)


========== IMG_3353.md ==========
---
photo: IMG_3353.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 220-252
orientation: 180
confidence: medium
notes: Same severe double-exposure/motion-ghosting artifact as IMG_3352 (next photo in the same handheld sequence, scrolled further down the same function/file). Overlapping duplicate text offset a few rows apart throughout, so exact line-to-text mapping in the 220-233 range is best-effort. Lines 234-252 (return statement + new JSDoc block) cross-checked and corrected against the sharper IMG_3354 (same content, slightly different scroll/exposure) — confidence for that portion is higher. Confirms IMG_3352 line 221 is plain "} else {" (not "else if"). Explorer sidebar / tab bar / status bar identical to IMG_3352 (build-eedata-array.ts selected, "No Solution", 2 errors/0 warnings, branch hitanshu/experimental*).
---
220:         previousValueStr = previousOption?.value || String(previousValue || '');
221:     } else {
222:         previousValueStr = String(previousValue || '');
223:     }
224:     ⟪?⟫
225:     logger.debug('[EEData] Select data built', {
226:         displayText,
227:         selectedValue,
228:         selectedIndex,
229:         previousLabel: resolvedPreviousLabel,
230:         previousValue,
231:         selectedIndex ⟪? possibly "previousIndex"⟫,
232:     });
233:
233:
234:     return [
235:         [
236:             displayText, // data2: Display text (label)
237:             selectedValue, // data3: Selected value
238:             selectedValue, // data4: Selected value (duplicate)
239:             '', // data6: Not a date
240:             '', // data7: EMPTY for SELECT (not combo)
241:         ],
242:         [resolvedPreviousLabel, previousValueStr], // data9-10: Previous selection (label, value)
243:     ];
244: }
245:
246: /**
247:  * Combo Handler (COMBO, KPCOMBO)
248:  *
249:  * Matches VBS SetArrayData logic for COMBO/KPCOMBO:
250:  *   data2 = display text (label)
251:  *   data3 = selected value
252:  *   data4 = selected value


========== IMG_3354.md ==========
---
photo: IMG_3354.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 231-265
orientation: 180
confidence: medium
notes: Continues the same handheld photo sequence as IMG_3352/IMG_3353 (same file, scrolled further down), with the same double-exposure/motion-ghosting artifact but noticeably sharper/more legible than the two prior photos, especially lines 231-244 which resolve cleanly. Confirms and corrects IMG_3353's reading of the return statement — it's a nested tuple `[[...5 elems], [prev label/value]]`, not a flat array. Sticky-scroll header still shows line 198 "function buildSelectEEData(" pinned at top even though buildSelectEEData ends at line 244 and a new function buildComboEEData begins at 263 (VS Code hasn't updated the sticky header past the outer editor viewport in this frame, or it's showing the enclosing scope from the top of the visible range). Lines 246-248 (JSDoc opening for buildComboEEData: "/**", "* Combo Handler (COMBO, KPCOMBO)", blank "*") are legible but fainter/ghosted, medium confidence. Explorer sidebar / tab bar / status bar same as IMG_3352/3353 (build-eedata-array.ts selected, No Solution, 2 errors/0 warnings, branch hitanshu/experimental*).
---
198: function buildSelectEEData(
    ⟪sticky-scroll header⟫
231:     previousValue,
232: });
233:
234:     return [
235:         [
236:             displayText, // data2: Display text (label)
237:             selectedValue, // data3: Selected value
238:             selectedValue, // data4: Selected value (duplicate)
239:             '', // data6: Not a date
240:             '', // data7: EMPTY for SELECT (not combo)
241:         ],
242:         [resolvedPreviousLabel, previousValueStr], // data9-10: Previous selection (label, value)
243:     ];
244: }
245:
246: /**
247:  * Combo Handler (COMBO, KPCOMBO)
248:  *
249:  * Matches VBS SetArrayData logic for COMBO/KPCOMBO:
250:  *   data2 = display text (label)
251:  *   data3 = selected value
252:  *   data4 = selected value
253:  *   data7 = adjusted list index (with ShowZero offset)
254:  *   data9-10 = previous selection (label, value) if provided
255:  *
256:  * ShowZero behavior:
257:  *   ShowZero=T (default): offset = 0 → index 0 becomes 0
258:  *   ShowZero=F: offset = 1 → index 0 becomes 1 (shows "---" option)
259:  *
260:  * Example (ShowZero=F, selected index 5, label="Apartment Package", value="AK", previous="Condo", "CD"):
261:  *   → [["Apartment Package", "AK", "AK", "", 6], ["Condo", "CD"]]
262:  */
263: function buildComboEEData(
264:     value: unknown,
265:     options: OptionItem[] = [],
    ⟪line 266 cut off at bottom edge, illegible⟫


========== IMG_3355.md ==========
---
photo: IMG_3355.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 254-286
orientation: 180
confidence: medium
notes: Continues the same handheld sequence (same file, scrolled further down into buildComboEEData). Same double-exposure/ghosting artifact as prior photos in this run but text is largely disentangleable; comment lines 254-261 are a repeat/continuation of the JSDoc already captured in IMG_3354 (kept here only for context, not re-logged as new). Confirms buildComboEEData full parameter list and return tuple type, and that its body mirrors buildSelectEEData's structure (findIndex/selectedOption/displayText pattern) but adds a ShowZero-based offset calculation (adjustedIndex) not present in buildSelectEEData. Sidebar/tab bar/status bar unchanged (build-eedata-array.ts selected, No Solution, 2 errors/0 warnings, branch hitanshu/experimental*).
---
254:  *   data9-10 = previous selection (label, value) if provided
255:  *
256:  * ShowZero behavior:
257:  *   ShowZero=T (default): offset = 0 → index 0 becomes 0
258:  *   ShowZero=F: offset = 1 → index 0 becomes 1 (shows "---" option)
259:  *
260:  * Example (ShowZero=F, selected index 5, label="Apartment Package", value="AK", previous="Condo", "CD"):
261:  *   → [["Apartment Package", "AK", "AK", "", 6], ["Condo", "CD"]]
262:  */
263: function buildComboEEData(
264:     value: unknown,
265:     options: OptionItem[] = [],
266:     showZero: boolean = true,
267:     previousValue?: unknown,
268:     previousLabel?: string,
269: ): [
270:     data: [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown],
271:     previous: [data9: unknown, data10: unknown],
272: ] {
273:     const listIndex = options.findIndex((opt) => opt.value === value);
274:     const selectedOption = options[listIndex];
275:     const displayText = selectedOption?.label || String(value || '');
276:     const selectedValue = selectedOption?.value || String(value || '');
277:     // Calculate offset: ShowZero=F → 1, ShowZero=T → 0
278:     const offset = showZero ? 0 : 1;
279:     const adjustedIndex = listIndex >= 0 ? listIndex + offset : offset - 1;
280:     // Find previous selection
281:     // Use previousLabel if provided (from session storage), otherwise look it up
282:     let resolvedPreviousLabel = previousLabel || '';
283:     let previousValueStr = '';
284:     if (previousValue !== undefined && !previousLabel) {
285:         const previousIndex = options.findIndex((opt) => opt.value === previousValue);
286:         const previousOption = options[previousIndex];
    ⟪continues below frame; next line partially visible: "if (previousValue !== undefined && !previousLabel) resolvedPreviousLabel = previousOption?.label || String(previousValue || '');" — cut off at bottom edge⟫


========== IMG_3356.md ==========
---
photo: IMG_3356.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 263-297
orientation: 180
confidence: low
notes: Continues the same handheld sequence, same double-exposure/ghosting artifact. Lines 263-276 repeat content already captured (higher confidence) in IMG_3355 — not re-logged. Lines 277-289 have a ±1 line ambiguity versus IMG_3355's numbering for the same statements (this photo's gutter reads them one row later); IMG_3355's numbering was kept as the canonical version since its crop was cleaner. Lines 290-297 (else-branch fallback, logger.debug('[EEData] Combo data built', {...}) mirror buildSelectEEData's ending pattern but with listIndex/adjustedIndex substituted for selectedIndex. Content past line 297 is cut off at the bottom edge of frame. Sidebar/tab bar/status bar unchanged.
---
277: (blank)
278:     // Calculate offset: ShowZero=F → 1, ShowZero=T → 0
279:     const offset = showZero ? 0 : 1;
280:     const adjustedIndex = listIndex >= 0 ? listIndex + offset : offset - 1;
281:     // Find previous selection
282:     // Use previousLabel if provided (from session storage), otherwise look it up
283:     let resolvedPreviousLabel = previousLabel || '';
284:     let previousValueStr = '';
285:     if (previousValue !== undefined && !previousLabel) {
286:         const previousIndex = options.findIndex((opt) => opt.value === previousValue);
287:         const previousOption = options[previousIndex];
288:         resolvedPreviousLabel = previousOption?.label || String(previousValue || '');
289:         previousValueStr = previousOption?.value || String(previousValue || '');
290:     } else {
291:         previousValueStr = String(previousValue || '');
292:     }
293:     logger.debug('[EEData] Combo data built', {
294:         displayText,
295:         selectedValue,
296:         listIndex,
297:         selectedValue ⟪? possibly "adjustedIndex"⟫,
    ⟪cut off at bottom edge of frame⟫


========== IMG_3357.md ==========
---
photo: IMG_3357.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 286-315
orientation: 180
confidence: low
notes: Continues the same handheld sequence to the end of buildComboEEData (line 315 appears to be the last line in view / possibly end of file — no closing brace visible past it, cut off). Same severe ghosting artifact; the logger.debug field list and closing return statement are reconstructed by anchoring to line 315 (consistently read as "];" across crops) and counting backward, so absolute line numbers for 296-306 carry ±1 uncertainty. Confirms the buildComboEEData return statement is a nested tuple identical in shape to buildSelectEEData's: [[displayText, selectedValue, selectedValue, '', adjustedIndex], [resolvedPreviousLabel, previousValueStr]], with data7 slot using adjustedIndex (list index) instead of a plain empty string like buildSelectEEData's data7. Sidebar/tab bar/status bar unchanged (build-eedata-array.ts selected, No Solution, 2 errors/0 warnings, branch hitanshu/experimental*).
---
296: ⟪?⟫ logger.debug('[EEData] Combo data built', {
297:     value,
298:     displayText,
299:     listIndex,
300:     selectedValue,
301:     offset,
302:     adjustedIndex,
303:     previousLabel: resolvedPreviousLabel,
304:     previousValue,
305: });
306:
307: return [
308:     [
309:         displayText, // data2: Display text (label)
310:         selectedValue, // data3: Selected value
311:         selectedValue, // data4: Selected value (duplicate)
312:         '', // data6: Not a date
313:         adjustedIndex, // data7: Adjusted list index for COMBO
314:     ],
315:     [resolvedPreviousLabel, previousValueStr], // data9-10: Previous selection (label, value)
    ⟪closing "];" and possible "}" cut off past bottom of frame⟫


========== IMG_3358.md ==========
---
photo: IMG_3358.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 300-326
orientation: 180
confidence: low
notes: Continues the same handheld sequence; same severe ghosting. Confirms buildComboEEData ends with "}" and a new JSDoc block for a "Date Handler" (likely buildDateEEData) begins right after. There is a persistent ±1 line-number jitter between this photo's bold-text gutter reading and IMG_3357's for the same statements (offset/adjustedIndex/previousLabel/previousValue/return[/inner-array lines) — both are recorded as read; the true absolute line numbers for 296-315 should be treated as approximate given the ghosting. A faint ghost of what may be an "Example:" line with a sample date "03/11/2026" is visible around lines 322-323 but not confidently placed. Sidebar/tab bar/status bar unchanged (build-eedata-array.ts selected, No Solution, 2 errors/0 warnings, branch hitanshu/experimental*).
---
300:     offset,
301:     adjustedIndex,
302:     previousLabel: resolvedPreviousLabel,
303:     previousValue,
304: });
305:
306: return [
307:     [
308:         displayText, // data2: Display text (label)
309:         selectedValue, // data3: Selected value
310:         selectedValue, // data4: Selected value (duplicate)
311:         '', // data6: Not a date
312:         adjustedIndex, // data7: Adjusted list index for COMBO
313:     ],
314:     [resolvedPreviousLabel, previousValueStr], // data9-10: Previous selection (label, value)
315: ];
316: }
317:
318: /**
319:  * Date Handler
320:  *
321:  * Populates (from MM/DD/YYYY format):
322:  *   data2 = month (MM with leading zero)
323:  *   data3 = day (DD with leading zero)
324:  *   data4 = year (YYYY)
325:  *   data6 = full date string (MM/DD/YYYY with leading zeros)
326: ⟪?⟫ function buildDateEEData(
    ⟪cut off at bottom edge; possible "Example:" line with sample date "03/11/2026" glimpsed faintly but not confidently placed⟫


========== IMG_3359.md ==========
---
photo: IMG_3359.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 315-341
orientation: 180
confidence: low
notes: Continues the same handheld sequence into a new "Date Handler" JSDoc block and the start of function buildDateEEData, then into a date-parsing branch handling "/"-delimited dates. Same severe ghosting artifact throughout; line numbers for 339-344 are a best-effort reconstruction (the guard-clause pattern — validate parts.length, warn+return early, then declare month/day — is inferred from standard code shape in this file, not directly disambiguated from the overlapping ghost text). Sidebar/tab bar/status bar unchanged (build-eedata-array.ts selected, No Solution, 2 errors/0 warnings, branch hitanshu/experimental*).
---
327:  * Example:
328:  *   "3/11/2026" or "03/11/2026"
329:  *   → ["03", "11", "2026", "03/11/2026"]
330:  */
331: function buildDateEEData(
332:     value: unknown,
333: ): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
334:     if (!value || typeof value !== 'string') {
335:         logger.warn('[EEData] Date: Invalid value', { value });
336:         return ['', '', '', '', undefined];
337:     }
338:     // Parse date (MM/DD/YYYY or M/D/YYYY or YYYY-MM-DD)
339:     if (value.includes('/')) {
340:         const parts = value.split('/');
341:         if (parts.length !== 3) ⟪?⟫ {
    ⟪continues below frame; faint fragments visible: "logger.warn('[EEData] Date: Invalid format (expected MM/DD/YYYY)', { value });", "return ['', '', '', '', undefined];", "}", "let month;", "let day;" — cut off / ghosted, exact line numbers uncertain⟫


========== IMG_3360.md ==========
---
photo: IMG_3360.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 331-357
orientation: 180
confidence: high
notes: Continues the same handheld sequence. Same ghosting artifact but this photo is sharper than IMG_3359 for the same region. Line numbers 339-357 cross-confirmed and corrected against the much clearer IMG_3361 (near zero ghosting for lines 331-370) — now high confidence. buildDateEEData's early-return on invalid value returns ['', '', '', '', ''] (all empty strings), not undefined as tentatively guessed in IMG_3359. Confirms three date-format branches: "/"-delimited (MM/DD/YYYY or M/D/YYYY) and "-"-delimited (YYYY-MM-DD, ISO). Sidebar/tab bar/status bar unchanged (build-eedata-array.ts selected, No Solution, 2 errors/0 warnings, branch hitanshu/experimental*).
---
331: function buildDateEEData(
332:     value: unknown,
333: ): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
334:     if (!value || typeof value !== 'string') {
335:         logger.warn('[EEData] Date: Invalid value', { value });
336:         return ['', '', '', '', ''];
337:     }
338:     // Parse date format (MM/DD/YYYY or M/D/YYYY or YYYY-MM-DD)
339:     let month = '';
340:     let day = '';
341:     let year = '';
342:
343:     // Handle MM/DD/YYYY or M/D/YYYY format
344:     if (value.includes('/')) {
345:         const parts = value.split('/');
346:         if (parts.length !== 3) {
347:             logger.warn('[EEData] Date: Invalid format (expected MM/DD/YYYY)', { value });
348:             return ['', '', '', '', ''];
349:         }
350:         month = parts[0].padStart(2, '0'); // Pad month to 2 digits
351:         day = parts[1].padStart(2, '0'); // Pad day to 2 digits
352:         year = parts[2];
353:     }
354:     // Handle YYYY-MM-DD format (ISO)
355:     else if (value.includes('-')) {
356:         const parts = value.split('-');
    ⟪cut off at bottom edge of frame⟫


========== IMG_3361.md ==========
---
photo: IMG_3361.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 331-370
orientation: 180
confidence: high
notes: Much clearer than the preceding photos in this sequence — little to no visible ghosting/motion-blur artifact, high-confidence transcription throughout. Completes buildDateEEData's date-parsing logic: "/"-delimited (MM/DD/YYYY or M/D/YYYY), "-"-delimited (YYYY-MM-DD ISO), and an else branch for unknown format (all returning ['', '', '', '', ''] with a logger.warn on failure). Used to correct line numbers in IMG_3360's transcript for the same region. Sidebar/tab bar/status bar unchanged (build-eedata-array.ts selected, No Solution, 2 errors/0 warnings, branch hitanshu/experimental*).
---
331: function buildDateEEData(
    ⟪sticky-scroll header⟫
339:     // Parse date format (MM/DD/YYYY or M/D/YYYY or YYYY-MM-DD)
340:     let month = '';
341:     let day = '';
342:     let year = '';
343:
344:     // Handle MM/DD/YYYY or M/D/YYYY format
345:     if (value.includes('/')) {
346:         const parts = value.split('/');
347:         if (parts.length !== 3) {
348:             logger.warn('[EEData] Date: Invalid format (expected MM/DD/YYYY)', { value });
349:             return ['', '', '', '', ''];
350:         }
351:         month = parts[0].padStart(2, '0'); // Pad month to 2 digits
352:         day = parts[1].padStart(2, '0'); // Pad day to 2 digits
353:         year = parts[2];
354:     }
355:     // Handle YYYY-MM-DD format (ISO)
356:     else if (value.includes('-')) {
357:         const parts = value.split('-');
358:         if (parts.length !== 3) {
359:             logger.warn('[EEData] Date: Invalid format (expected YYYY-MM-DD)', { value });
360:             return ['', '', '', '', ''];
361:         }
362:         year = parts[0];
363:         month = parts[1].padStart(2, '0');
364:         day = parts[2].padStart(2, '0');
365:     } else {
366:         logger.warn('[EEData] Date: Unknown format', { value });
367:         return ['', '', '', '', ''];
368:     }
369:
370:     // Build full date string with padded zeros (MM/DD/YYYY)
    ⟪next line cut off at bottom edge of frame — likely a template-string construction of fullDateStr from month/day/year⟫


========== IMG_3362.md ==========
---
photo: IMG_3362.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 360-386
orientation: 180
confidence: high
notes: Clear photo, minimal ghosting (like IMG_3361). Completes buildDateEEData: builds fullDateString via template literal, logs the parsed date data, then returns [month, day, year, fullDateString, ''] with comments mapping each to its data2/data3/data4/data6/data7 slot. Sidebar/tab bar/status bar unchanged (build-eedata-array.ts selected, No Solution, 2 errors/0 warnings, branch hitanshu/experimental*).
---
360:             return ['', '', '', '', ''];
361:         }
362:         year = parts[0];
363:         month = parts[1].padStart(2, '0');
364:         day = parts[2].padStart(2, '0');
365:     } else {
366:         logger.warn('[EEData] Date: Unknown format', { value });
367:         return ['', '', '', '', ''];
368:     }
369:
370:     // Build full date string with padded zeros (MM/DD/YYYY)
371:     const fullDateString = `${month}/${day}/${year}`;
372:
373:     logger.debug('[EEData] Date data built', {
374:         value,
375:         month,
376:         day,
377:         year,
378:         fullDateString,
379:     });
380:
381:     return [
382:         month, // data2: Month (MM with leading zero)
383:         day, // data3: Day (DD with leading zero)
384:         year, // data4: Year (YYYY)
385:         fullDateString, // data6: Full date string (MM/DD/YYYY)
386:         '', // data7: Empty (not combo)
    ⟪closing "];" and "}" cut off at bottom edge of frame⟫


========== IMG_3363.md ==========
---
photo: IMG_3363.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 381-415
orientation: 180
confidence: low
notes: Continues the same handheld sequence; buildDateEEData's final return array (repeated here, already captured at higher confidence in IMG_3362) followed by a new JSDoc block for "Checkbox Handler" and the start of function buildCheckboxEEData. Same severe ghosting artifact as most photos in this run — lines 402-415 (function body) have duplicate/overlapping text making exact line assignment for individual return-array elements uncertain; the JSDoc block (390-401) is comparatively clear and high confidence. This is the last photo in the assigned chunk (3352-3363); the function's remaining lines and any further functions in this file are not covered by these photos. Sidebar/tab bar/status bar unchanged (build-eedata-array.ts selected, No Solution, 2 errors/0 warnings, branch hitanshu/experimental*).
---
387: }
388:
389: /**
390:  * Checkbox Handler
391:  *
392:  * Populates:
393:  *   data2 = "YES" (checked) or "NO" (unchecked)
394:  *   data3 = 1 (checked) or 0 (unchecked)
395:  *   data4-7 = empty
396:  *
397:  * Example:
398:  *   true → ["YES", 1, "", "", ""]
399:  *   false → ["NO", 0, "", "", ""]
400: */
401: function buildCheckboxEEData(
402:     value: unknown,
403: ): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
404:     const isChecked = Boolean(value);
405:     logger.debug('[EEData] Checkbox data built', {
406:         value,
407:         isChecked,
408:     });
409:     return [
410:         isChecked ? 'YES' : 'NO', // data2: Display text
411:         isChecked ? 1 : 0, // data3: Checked state
    ⟪continues below frame; expected remaining elements '', '', '' for data4/data6/data7 (empty per JSDoc) not clearly legible — cut off / ghosted⟫


========== IMG_3364.md ==========
---
photo: IMG_3364.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 393-424
orientation: 180
confidence: medium
notes: Photo has a ghosting/double-exposure artifact (two overlapping slightly-offset copies of the screen content, one dimmer) throughout, making some glyphs ambiguous; transcription taken from the sharper/brighter layer, cross-checked across multiple crops. Explorer sidebar (aqs-web-ui > src) shows folders/files: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Tab bar shows only build-eedata-array.ts open. Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock shows 6:17 PM 7/10/2026. Lines 425-426 (start of next doc-comment block, "*" and "Populates:") are faintly visible at the very bottom edge, cut off.
---
393	 * Populates:
394	 *   data2 = "YES" (checked) or "NO" (unchecked)
395	 *   data3 = 1 (checked) or 0 (unchecked)
396	 *   data4-7 = empty
397	 *
398	 * Example:
399	 *   true  -> ["YES", 1, "", ""]
400	 *   false -> ["NO", 0, "", ""]
401	 */
402	function buildCheckboxEEData(
403	    value: unknown,
404	): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
405	    const isChecked = Boolean(value);
406	
407	    logger.debug('[EEData] Checkbox data built', {
408	        value,
409	        isChecked,
410	        data2: isChecked ? 'YES' : 'NO',
411	        data3: isChecked ? 1 : 0,
412	    });
413	
414	    return [
415	        isChecked ? 'YES' : 'NO', // data2: Display text
416	        isChecked ? 1 : 0, // data3: Index (1=checked, 0=unchecked)
417	        '', // data4: Empty
418	        '', // data6: Empty
419	        '', // data7: Empty
420	    ];
421	}
422	
423	/**
424	 * Radio Button Handler


========== IMG_3365.md ==========
---
photo: IMG_3365.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 402-441
orientation: 180
confidence: high
notes: Sticky-scroll header at top of editor repeats enclosing function context (faint overlapping ghost text visible behind lines 402-419, duplicating "function buildCheckboxEEData(" body / return block — same content as already transcribed in IMG_3364, not re-transcribed here). Explorer sidebar (aqs-web-ui > src) shows folders/files: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Tab bar shows only build-eedata-array.ts open. Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:17 PM 7/10/2026. Line 442 "selectedIndex" is cut off at the very bottom edge of the screen, illegible/not transcribed.
---
402	function buildCheckboxEEData(
410	        data2: isChecked ? 'YES' : 'NO',
411	        data3: isChecked ? 1 : 0,
412	    });
413	
414	    return [
415	        isChecked ? 'YES' : 'NO', // data2: Display text
416	        isChecked ? 1 : 0, // data3: Index (1=checked, 0=unchecked)
417	        '', // data4: Empty
418	        '', // data6: Empty
419	        '', // data7: Empty
420	    ];
421	}
422	
423	/**
424	 * Radio Button Handler
425	 *
426	 * Populates:
427	 *   data2 = selected value
428	 *   data3 = selected index
429	 *   data4-7 = empty
430	 *
431	 * Example (selected "NEW" at index 0):
432	 *   -> ["NEW", 0, "", ""]
433	 */
434	function buildRadioEEData(
435	    value: unknown,
436	    options: OptionItem[] = [],
437	): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
438	    const selectedIndex = options.findIndex((opt) => opt.value === value);
439	
440	    logger.debug('[EEData] Radio data built', {
441	        value,


========== IMG_3366.md ==========
---
photo: IMG_3366.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 425-456
orientation: 180
confidence: high
notes: Photo has a ghosting/double-exposure artifact (a second, slightly offset/scrolled overlapping copy of the same file's text bleeds through, appears the editor was scrolling during capture); transcription taken from the sharper/brighter foreground layer, cross-checked against the fainter ghost layer which shows the same content shifted ~13 lines. Explorer sidebar (aqs-web-ui > src) unchanged from prior photos: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Tab bar shows only build-eedata-array.ts open. Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:17 PM 7/10/2026. Line 457 "/**" (start of next doc comment) barely visible at very bottom edge, cut off.
---
425	 *
426	 * Populates:
427	 *   data2 = selected value
428	 *   data3 = selected index
429	 *   data4-7 = empty
430	 *
431	 * Example (selected "NEW" at index 0):
432	 *   -> ["NEW", 0, "", ""]
433	 */
434	function buildRadioEEData(
435	    value: unknown,
436	    options: OptionItem[] = [],
437	): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
438	    const selectedIndex = options.findIndex((opt) => opt.value === value);
439	
440	    logger.debug('[EEData] Radio data built', {
441	        value,
442	        selectedIndex,
443	        options: options.length,
444	    });
445	
446	    return [
447	        String(value || ''), // data2: Selected value
448	        selectedIndex >= 0 ? selectedIndex : -1, // data3: Selected index
449	        '', // data4: Empty
450	        '', // data6: Empty
451	        '', // data7: Empty
452	    ];
453	}
454	
455	/**
456	 * Date Format Detection


========== IMG_3367.md ==========
---
photo: IMG_3367.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 433-465
orientation: 180
confidence: high
notes: Photo has a ghosting/double-exposure artifact (a second, slightly offset/scrolled overlapping copy of the same file's text bleeds through); transcription taken from the sharper/brighter foreground layer. Explorer sidebar (aqs-web-ui > src) unchanged: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Tab bar shows only build-eedata-array.ts open. Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:17 PM 7/10/2026. Line 466 (start of "export function isDateFormat(...)" body, implied by the doc comment) is at the very bottom edge, obscured by ghosting/cut off — not transcribed.
---
433	 */
434	function buildRadioEEData(
435	    value: unknown,
436	    options: OptionItem[] = [],
437	): [data2: unknown, data3: unknown, data4: unknown, data6: string, data7: unknown] {
438	    const selectedIndex = options.findIndex((opt) => opt.value === value);
439	
440	    logger.debug('[EEData] Radio data built', {
441	        value,
442	        selectedIndex,
443	        options: options.length,
444	    });
445	
446	    return [
447	        String(value || ''), // data2: Selected value
448	        selectedIndex >= 0 ? selectedIndex : -1, // data3: Selected index
449	        '', // data4: Empty
450	        '', // data6: Empty
451	        '', // data7: Empty
452	    ];
453	}
454	
455	/**
456	 * Date Format Detection
457	 *
458	 * Detects if a value matches common date formats:
459	 *   - M/D/YYYY (e.g., 3/12/2025)
460	 *   - MM/DD/YYYY (e.g., 03/12/2025)
461	 *   - YYYY-MM-DD (e.g., 2025-03-12)
462	 *
463	 * @param value - Value to check
464	 * @returns true if value matches date pattern, false otherwise
465	 */


========== IMG_3368.md ==========
---
photo: IMG_3368.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 434-476
orientation: 180
confidence: high
notes: Clean/sharp photo, no ghosting artifact (unlike IMG_3364-3367). Sticky-scroll header at top shows "434  function buildRadioEEData(" (enclosing scope), then gutter jumps straight to 444 (lines 435-443 scrolled out of view under the sticky header). Explorer sidebar (aqs-web-ui > src) unchanged: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Tab bar shows only build-eedata-array.ts open. Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:17 PM 7/10/2026. Line 476 is blank/cut off at the very bottom edge of the editor.
---
434	function buildRadioEEData(
444	    });
445	
446	    return [
447	        String(value || ''), // data2: Selected value
448	        selectedIndex >= 0 ? selectedIndex : -1, // data3: Selected index
449	        '', // data4: Empty
450	        '', // data6: Empty
451	        '', // data7: Empty
452	    ];
453	}
454	
455	/**
456	 * Date Format Detection
457	 *
458	 * Detects if a value matches common date formats:
459	 *   - M/D/YYYY (e.g., 3/12/2025)
460	 *   - MM/DD/YYYY (e.g., 03/12/2025)
461	 *   - YYYY-MM-DD (e.g., 2025-03-12)
462	 *
463	 * @param value - Value to check
464	 * @returns true if value matches date pattern, false otherwise
465	 */
466	function isDateFormat(value: unknown): boolean {
467	    if (!value || typeof value !== 'string') {
468	        return false;
469	    }
470	
471	    // Match M/D/YYYY, MM/DD/YYYY (numeric month, day, year with /)
472	    // Match YYYY-MM-DD (ISO format with -)
473	    const dateRegex = /^(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})$/;
474	    return dateRegex.test(value.trim());
475	}
476	


========== IMG_3369.md ==========
---
photo: IMG_3369.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 461-494
orientation: 180
confidence: high
notes: Photo has a ghosting/double-exposure artifact (a second, slightly offset/scrolled overlapping copy of the same file's text bleeds through); transcription taken from the sharper/brighter foreground layer, cross-checked with PIL crops. Sticky-scroll header duplicates "function isDateFormat(...)" at top. Explorer sidebar (aqs-web-ui > src) unchanged: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:17 PM 7/10/2026. Line 494's trailing comment is cut off/obscured by the status bar at the very bottom of the editor — only "// 6: Not date" is legible, rest illegible.
---
461	 *   - YYYY-MM-DD (e.g., 2025-03-12)
462	 *
463	 * @param value - Value to check
464	 * @returns true if value matches date pattern, false otherwise
465	 */
466	function isDateFormat(value: unknown): boolean {
467	    if (!value || typeof value !== 'string') {
468	        return false;
469	    }
470	
471	    // Match M/D/YYYY, MM/DD/YYYY (numeric month, day, year with /)
472	    // Match YYYY-MM-DD (ISO format with -)
473	    const dateRegex = /^(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})$/;
474	    return dateRegex.test(value.trim());
475	}
476	
477	/**
478	 * Build EEData Array
479	 *
480	 * Creates 13-element array matching legacy VBScript marrEEData(0-12)
481	 * Handles all control types with appropriate data population
482	 *
483	 * @param params - BuildEEDataArrayParams
484	 * @returns 13-element EEData array for XMLServerCall
485	 *
486	 * Example output for combo selection change from "Mobile Home Park" (MP, index 99) to "Non Profit" (NP, inde⟪?⟫
487	 * [
488	 *   "../../pol/xml/Rlv_PIPHPOL_20010101.xml",  // 0: XML path
489	 *   "POLPOLV3X_LPRDCDE",                       // 1: Matchcode
490	 *   "Non Profit",                              // 2: Current selected label
491	 *   "NP",                                      // 3: Current selected value
492	 *   "NP",                                      // 4: Current selected value (duplicate)
493	 *   "1",                                       // 5: Post-process
494	 *   ""                                         // 6: Not date⟪?⟫


========== IMG_3370.md ==========
---
photo: IMG_3370.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 477-510
orientation: 180
confidence: high
notes: Photo has a ghosting/double-exposure artifact (a second, slightly offset/scrolled overlapping copy of the same file's text bleeds through); transcription taken from the sharper/brighter foreground layer, cross-checked with tight PIL crops of the gutter and both halves of the wide comment block. Sticky-scroll header duplicates the doc-comment lines (478-486) at top. Line 486's doc comment text is wider than the editor viewport and is cut off at the right edge ("...(NP, inde⟪?⟫"). Explorer sidebar (aqs-web-ui > src) unchanged: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:17 PM 7/10/2026.
---
477	/**
478	 * Build EEData Array
479	 *
480	 * Creates 13-element array matching legacy VBScript marrEEData(0-12)
481	 * Handles all control types with appropriate data population
482	 *
483	 * @param params - BuildEEDataArrayParams
484	 * @returns 13-element EEData array for XMLServerCall
485	 *
486	 * Example output for combo selection change from "Mobile Home Park" (MP, index 99) to "Non Profit" (NP, inde⟪?⟫
487	 * [
488	 *   "../../pol/xml/Rlv_PIPHPOL_20010101.xml", // 0: XML path
489	 *   "POLPOLV3X_LPRDCDE", // 1: Matchcode
490	 *   "Non Profit", // 2: Current selected label
491	 *   "NP", // 3: Current selected value
492	 *   "NP", // 4: Current selected value (duplicate)
493	 *   "1", // 5: Post-process
494	 *   "", // 6: Not date
495	 *   "6", // 7: Current adjusted index (with ShowZero offset)
496	 *   "", // 8: Rule
497	 *   "Mobile Home Park", // 9: Previous selected label
498	 *   "MP", // 10: Previous selected value
499	 *   "", // 11: Alt nodekey
500	 *   "", // 12: Control XML
501	 * ]
502	 */
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
504	    const {
505	        xmlFileName,
506	        buttonMatchcode,
507	        formData,
508	        processIndicator = '1',
509	        controlMetadata,
510	        primaryFieldValue,


========== IMG_3371.md ==========
---
photo: IMG_3371.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 496-528
orientation: 180
confidence: high
notes: Photo has a mild ghosting/double-exposure artifact (faint second overlapping copy, offset by scroll) but primary text is sharp and fully legible. Sticky-scroll header duplicates "export function buildEEDataArray(...)" and the destructured const block at top. Explorer sidebar (aqs-web-ui > src) unchanged: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:17 PM 7/10/2026.
---
496	 *   "", // 8: Rule
497	 *   "Mobile Home Park", // 9: Previous selected label
498	 *   "MP", // 10: Previous selected value
499	 *   "", // 11: Alt nodekey
500	 *   "", // 12: Control XML
501	 * ]
502	 */
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
504	    const {
505	        xmlFileName,
506	        buttonMatchcode,
507	        formData,
508	        processIndicator = '1',
509	        controlMetadata,
510	        primaryFieldValue,
511	        previousValue,
512	        previousLabel,
513	        sessionXml,
514	    } = params;
515	
516	    // Get current field value from form data
517	    // For buttons: use primaryFieldValue (the actual field value like policy number)
518	    // For fields: use formData[buttonMatchcode] (the field's own value)
519	    const fieldValue =
520	        primaryFieldValue !== undefined ? primaryFieldValue : formData[buttonMatchcode];
521	
522	    // Process indicator:
523	    // - '0' = pre-process
524	    // - '1' = post-process
525	    // - legacy branch tokens can also be passed through (e.g., 'yes'/'no')
526	
527	    // Build control-specific data
528	    let data2: unknown = '';


========== IMG_3372.md ==========
---
photo: IMG_3372.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 503-547
orientation: 180
confidence: high
notes: Clean/sharp photo, no ghosting artifact. Sticky-scroll header at top shows "503  export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {" (enclosing scope), then gutter jumps straight to 515 (lines 504-514, the destructured const block, scrolled out of view under the sticky header — already captured verbatim in IMG_3371). Explorer sidebar (aqs-web-ui > src) unchanged: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:17 PM 7/10/2026.
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
515	
516	    // Get current field value from form data
517	    // For buttons: use primaryFieldValue (the actual field value like policy number)
518	    // For fields: use formData[buttonMatchcode] (the field's own value)
519	    const fieldValue =
520	        primaryFieldValue !== undefined ? primaryFieldValue : formData[buttonMatchcode];
521	
522	    // Process indicator:
523	    // - '0' = pre-process
524	    // - '1' = post-process
525	    // - legacy branch tokens can also be passed through (e.g., 'yes'/'no')
526	
527	    // Build control-specific data
528	    let data2: unknown = '';
529	    let data3: unknown = '';
530	    let data4: unknown = '';
531	    let data6: string = '';
532	    let data7: unknown = '';
533	    let data9: unknown = '';
534	    let data10: unknown = '';
535	
536	    // Field-specific override for POLPOL_NRLVDAT to match legacy EEData structure
537	    if (buttonMatchcode === 'POLPOL_NRLVDAT') {
538	        // Robust nodeKey extraction: check all case variants in formData, then sessionXml, then fallback
539	        let nodeKey = '';
540	        const nodeKeyCandidates = ['nodeKey', 'NodeKey', 'NODEKEY'];
541	        // 1. Direct key match (common cases)
542	        for (const key of nodeKeyCandidates) {
543	            if (typeof formData[key] === 'string' && formData[key]) {
544	                nodeKey = formData[key];
545	                break;
546	            }
547	        }


========== IMG_3376.md ==========
---
photo: IMG_3376.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 503, 576-607
orientation: 180
confidence: medium
notes: Photo has significant camera motion/scroll ghosting throughout the code pane — nearly every line shows a faint duplicate of nearby text overlapping it (looks like the editor was mid-scroll or the phone moved during the exposure), roughly a 2-3 line vertical smear. Gutter line numbers themselves are sharp and unambiguous; used them as anchors and picked the boldest/sharpest overlapping text at each row. Line 583 could not be confidently resolved (bold ghost text there duplicates line 586's "matchcode: buttonMatchcode," which is almost certainly a bleed artifact, not real duplicate code) — marked ⟪?⟫, likely a blank line. Line 607 is cut off by the status bar (illegible past "controlMetadata.options,"). Sticky-scroll header shows line 503 (function signature) while the visible/scrolled body is 576-607; lines 504-575 are not visible in this photo. Tab bar: only "build-eedata-array.ts" tab open (italicized = preview tab). Breadcrumb: aqs-web-ui > src > utils > build-eedata-array.ts > (buildEEDataArray, truncated). Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): providers/theme-provider.tsx; services/ (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts); types/grid-response.ts (shows "U" unsaved-changes marker); utils/ (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [selected/highlighted], build-xml-server-call-payloa[d].ts, button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: branch "hitanshu/experimental*" (asterisk = uncommitted changes), "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026.
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
[... lines 504-575 not visible, scrolled out of view ...]
576	        data7 = '';
577	        data9 = dateValue;
578	        data10 = '';
579	    } else if (controlMetadata) {
580	        // Auto-detect date format from value before switch
581	        // If value matches date pattern, override controlType to 'date'
582	        let controlType = controlMetadata.controlType.toLowerCase().trim();
583	        ⟪?⟫
584	        if (isDateFormat(fieldValue)) {
585	            logger.debug('[EEData] Auto-detected date format, overriding controlType to date', {
586	                matchcode: buttonMatchcode,
587	                originalControlType: controlMetadata.controlType,
588	                fieldValue,
589	            });
590	            controlType = 'date';
591	        }
592	
593	        console.log('Determined control type for EEData:', controlType);
594	
595	        switch (controlType) {
596	            // TEXT-BASED CONTROLS
597	            case 'textbox':
598	            case 'textarea':
599	            case 'numeric':
600	                [data2, data3, data4, data6, data7] = buildTextboxEEData(fieldValue, buttonMatchcode);
601	                break;
602	            // HTML SELECT CONTROLS (separate from COMBO)
603	            case 'select': {
604	                const [currentData, previousData] = buildSelectEEData(
605	                    fieldValue,
606	                    controlMetadata.options,
607	                    ⟪?⟫ (line cut off by status bar / cursor overlay)


========== IMG_3377.md ==========
---
photo: IMG_3377.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 503, 589-620
orientation: 180
confidence: medium
notes: Same file/editor session as IMG_3376, scrolled down slightly (overlaps IMG_3376's 589-607, extends new content through 620). Photo has the same camera motion/scroll ghosting as IMG_3376 (faint duplicate text overlapping, offset ~5-6 lines) — used gutter line numbers as anchors and cross-checked against IMG_3376's independently-verified reading of the overlapping lines (589-607), which matches. Lines 592 and 594 are blank (confirmed in IMG_3376 with a cleaner crop of the same lines). Line 620 is the last line visible before being cut off by the status bar; "controlMetadata.options," is a faint/ghosted guess for it based on the buildComboEEData param pattern mirroring buildSelectEEData above — marked uncertain. Sticky-scroll header shows line 503 (function signature). Tab bar: only "build-eedata-array.ts" open (italic preview tab). Breadcrumb: aqs-web-ui > src > utils > build-eedata-array.ts > ... Explorer sidebar identical to IMG_3376 (build-eedata-array.ts highlighted under utils/). Status bar: branch "hitanshu/experimental*", "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026 (same minute as IMG_3376).
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
[... lines 504-588 not visible, scrolled out of view — see IMG_3376 for 576-588 ...]
589	            });
590	            controlType = 'date';
591	        }
592	
593	        console.log('Determined control type for EEData:', controlType);
594	
595	        switch (controlType) {
596	            // TEXT-BASED CONTROLS
597	            case 'textbox':
598	            case 'textarea':
599	            case 'numeric':
600	                [data2, data3, data4, data6, data7] = buildTextboxEEData(fieldValue, buttonMatchcode);
601	                break;
602	            // HTML SELECT CONTROLS (separate from COMBO)
603	            case 'select': {
604	                const [currentData, previousData] = buildSelectEEData(
605	                    fieldValue,
606	                    controlMetadata.options,
607	                    previousValue,
608	                    previousLabel,
609	                );
610	                [data2, data3, data4, data6, data7] = currentData;
611	                [data9, data10] = previousData;
612	                break;
613	            }
614	
615	            // COMBO AND KPCOMBO CONTROLS
616	            case 'combo':
617	            case 'kpcombo': {
618	                const [currentData, previousData] = buildComboEEData(
619	                    fieldValue,
620	                    ⟪controlMetadata.options,⟫ (cut off by status bar, low-confidence guess)


========== IMG_3378.md ==========
---
photo: IMG_3378.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 503, 610-639
orientation: 180
confidence: medium
notes: Same file/editor session as IMG_3376/IMG_3377, scrolled further down (overlaps IMG_3377's 610-620, extends new content through 639). Same camera motion/scroll ghosting artifact as the other two photos in this sequence (faint duplicate text bleeding across rows). Cross-checked overlapping rows 610-620 against IMG_3377 — consistent. For rows 631-639 the ghosting was severe enough that multiple crops gave conflicting line-number alignments; final reading was reconciled by anchoring on the sharpest/least-blurred gutter digits (637-639, confirmed unambiguous) and counting backward, checking that the resulting content matches the repeating "blank line / // <GROUP> CONTROLS comment / case labels / array-destructure assignment / break;" pattern already established by the COMBO and SELECT case blocks earlier in this same switch. Confidence on exact line numbers for 631-639 is medium rather than high because of this reconstruction. Content cuts off after line 639 (case 'icheckbox':) at the bottom of the visible editor area, right above the taskbar — the buildCheckboxEEData(...) assignment line is not visible in this photo. Sticky-scroll header shows only line 503 (function signature); breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts > ... Tab bar: only "build-eedata-array.ts" open. Explorer sidebar unchanged from IMG_3376/3377 (build-eedata-array.ts highlighted under utils/). Status bar: branch "hitanshu/experimental*", "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026.
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
[... lines 504-609 not visible, scrolled out of view — see IMG_3376/IMG_3377 for 576-609 ...]
610	                );
611	                [data2, data3, data4, data6, data7] = currentData;
612	                [data9, data10] = previousData;
613	                break;
614	            }
615	
616	            // COMBO AND KPCOMBO CONTROLS
617	            case 'combo':
618	            case 'kpcombo': {
619	                const [currentData, previousData] = buildComboEEData(
620	                    fieldValue,
621	                    controlMetadata.options,
622	                    controlMetadata.showZero,
623	                    previousValue,
624	                    previousLabel,
625	                );
626	                [data2, data3, data4, data6, data7] = currentData;
627	                [data9, data10] = previousData;
628	                break;
629	            }
630	
631	            // DATE CONTROLS
632	            case 'date':
633	            case 'calendar':
634	                [data2, data3, data4, data6, data7] = buildDateEEData(fieldValue);
635	                break;
636	
637	            // BOOLEAN CONTROLS
638	            case 'checkbox':
639	            case 'icheckbox':


========== IMG_3379.md ==========
---
photo: IMG_3379.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 503, 615-647
orientation: 180
confidence: high
notes: Same file/editor session as IMG_3376-3378, scrolled down slightly further. This photo is noticeably sharper/less motion-blurred than IMG_3378 (larger text, ghosting still present but text is easily disambiguated), and independently confirms IMG_3378's reconstruction of lines 631-639 (blank/comment/case/case/assign/break pattern) was correct. Cross-checked overlapping rows 615-639 against IMG_3378 — fully consistent. Line 642 could not be confidently read in this photo (marked ⟪?⟫); its line-number alignment for the surrounding RADIO CONTROLS block (643-647) was corrected against IMG_3380, which shows the same block more sharply and unambiguously. Content is not transcribed past line 647 ("fieldValue,") since that's this photo's visible edge. Sticky-scroll header shows only line 503 (function signature); breadcrumb aqs-web-ui > src > utils > build-eedata-array.ts > ... Tab bar: only "build-eedata-array.ts" open. Explorer sidebar: same as prior photos in this sequence, build-eedata-array.ts highlighted under utils/ (also notice build-cycling-url.ts appears selected/highlighted blue in the sidebar in this shot, likely just a stale hover/selection state, not the open file — the open/active tab and breadcrumb both clearly say build-eedata-array.ts). Status bar: branch "hitanshu/experimental*", "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026.
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
[... lines 504-614 not visible, scrolled out of view — see IMG_3376/3377/3378 for 576-614 ...]
615	
616	            // COMBO AND KPCOMBO CONTROLS
617	            case 'combo':
618	            case 'kpcombo': {
619	                const [currentData, previousData] = buildComboEEData(
620	                    fieldValue,
621	                    controlMetadata.options,
622	                    controlMetadata.showZero,
623	                    previousValue,
624	                    previousLabel,
625	                );
626	                [data2, data3, data4, data6, data7] = currentData;
627	                [data9, data10] = previousData;
628	                break;
629	            }
630	
631	            // DATE CONTROLS
632	            case 'date':
633	            case 'calendar':
634	                [data2, data3, data4, data6, data7] = buildDateEEData(fieldValue);
635	                break;
636	
637	            // BOOLEAN CONTROLS
638	            case 'checkbox':
639	            case 'icheckbox':
640	                [data2, data3, data4, data6, data7] = buildCheckboxEEData(fieldValue);
641	                break;
642	                ⟪?⟫ (line not clearly resolved in this photo; see IMG_3380 which shows line 643 as "// RADIO CONTROLS" — line-number alignment for 642 corrected using that clearer photo)
643	            // RADIO CONTROLS
644	            case 'radio':
645	            case 'radiobutton':
646	                [data2, data3, data4, data6, data7] = buildRadioEEData(
647	                    fieldValue,


========== IMG_3380.md ==========
---
photo: IMG_3380.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 503, 642-673
orientation: 180
confidence: medium
notes: CAVEAT (added after cross-checking against IMG_3382/IMG_3383, which independently confirm a downstream anchor two photos later): the line numbers in this transcript for the 651-673 range may be off by one low (e.g. the closing "}" transcribed here as line 673 is more likely line 674) — the surrounding code/content itself is believed accurate, but somewhere in that stretch this photo's gutter-to-text alignment likely drifted by one row due to the same camera-motion ghosting affecting the whole series. Treat line numbers here as approximate; content text is higher-confidence than the numbers. Same file/editor session as IMG_3376-3379, scrolled to the end of the function. This photo is sharp with only light ghosting, easily disambiguated. This is the tail end of the big if/else-if/switch chain in buildEEDataArray — closes out the switch's "default" case (unknown control type -> textbox), then the outer "} else {" branch (no controlMetadata at all: auto-detect date vs. plain textbox). Line 673's "}" closes that outer else branch; the function itself likely continues past this (e.g. a return statement) but that is not visible/cut off by the status bar in this photo. Line 642 sits right under the sticky-scroll header bar (which shows line 503) and is not clearly legible/occluded in this photo; the RADIO CONTROLS block starting at 643 is sharp and used to correct a one-line misalignment in IMG_3379's transcript of the same block. Sticky-scroll header shows only line 503 (function signature). Tab bar: only "build-eedata-array.ts" open. Explorer sidebar unchanged from prior photos in this sequence (build-eedata-array.ts highlighted under utils/). Status bar: branch "hitanshu/experimental*", "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:17 PM 7/10/2026.
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
[... lines 504-641 not visible, scrolled out of view — see IMG_3376/3377/3378/3379 for 576-641 ...]
642	                ⟪?⟫ (occluded by sticky-scroll header bar)
643	            // RADIO CONTROLS
644	            case 'radio':
645	            case 'radiobutton':
646	                [data2, data3, data4, data6, data7] = buildRadioEEData(
647	                    fieldValue,
648	                    controlMetadata.options,
649	                );
650	                break;
651	
652	            // UNKNOWN: Default to textbox
653	            default:
654	                logger.warn('[EEData] Unknown control type, using textbox handler', {
655	                    matchcode: buttonMatchcode,
656	                    controlType: controlMetadata.controlType,
657	                });
658	                [data2, data3, data4, data6, data7] = buildTextboxEEData(fieldValue);
659	        }
660	    } else {
661	        // No metadata provided: check if value is date format, else use textbox (safest default)
662	        if (isDateFormat(fieldValue)) {
663	            logger.debug('[EEData] Auto-detected date format, using date handler', {
664	                matchcode: buttonMatchcode,
665	            });
666	            [data2, data3, data4, data6, data7] = buildDateEEData(fieldValue);
667	        } else {
668	            logger.debug('[EEData] No control metadata, using textbox handler', {
669	                matchcode: buttonMatchcode,
670	            });
671	            [data2, data3, data4, data6, data7] = buildTextboxEEData(fieldValue);
672	        }
673	    }


========== IMG_3381.md ==========
---
photo: IMG_3381.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 503, 644-648, ~673-675
orientation: 180
confidence: medium
notes: Same file/editor session as IMG_3376-3380 (build-eedata-array.ts), but timestamp has advanced to 6:18 PM (one minute after the others), suggesting the developer scrolled a bit further right after IMG_3380. Top of the visible code (644-648, RADIO CONTROLS block) duplicates IMG_3380/IMG_3379 exactly, confirming no edits happened in between. The blurred comment at the bottom of this photo was illegible here but is now confirmed via IMG_3382 (same scroll region, much sharper photo taken moments later): it reads "// If relative: ../../pol/xml/Rlv_PIPHPOL_20010101.xml" followed by a line of actual code building fullXmlPath — see IMG_3382.md for the verbatim, high-confidence transcription of lines 674-686. Sticky-scroll header shows only line 503 (function signature). Tab bar: only "build-eedata-array.ts" open. Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:18 PM 7/10/2026.
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
[... lines 504-643 not visible, scrolled out of view — see IMG_3376/3377/3378/3379 for 576-643 ...]
644	            case 'radio':
645	            case 'radiobutton':
646	                [data2, data3, data4, data6, data7] = buildRadioEEData(
647	                    fieldValue,
648	                    controlMetadata.options,
[... lines 649-672 not visible in this crop, already covered by IMG_3380 ...]
673	    }
674	    // Construct full XML file path
675	    // If relative: ../../pol/xml/Rlv_PIPHPOL_20010101.xml (illegible in this photo; confirmed via IMG_3382)


========== IMG_3382.md ==========
---
photo: IMG_3382.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 503, 658-674, 675-686
orientation: 180
confidence: high
notes: Same file/editor session as IMG_3376-3381, scrolled slightly further down from IMG_3381 (same 6:18 PM timestamp). Top portion duplicates content already covered by IMG_3380 (there is a one-line numbering discrepancy vs. IMG_3380 for this overlapping stretch — this photo's line numbers for 675-686 are independently corroborated by IMG_3383's sharp, unambiguous gutter, so they are treated as authoritative here; see note in IMG_3380.md about the possible one-line drift in its 651-673 range). New content below the closing "}" at 674 is clear and legible: builds fullXmlPath from an optional xmlFileName, extracts an optional rule attribute, an "alternate nodekey" placeholder, and a controlXml placeholder — several stubbed out with TODO comments ("implement when needed"), suggesting in-progress/WIP code. Sticky-scroll header shows only line 503 (function signature). Tab bar: only "build-eedata-array.ts" open. Explorer sidebar unchanged from prior photos (build-eedata-array.ts highlighted under utils/). Status bar: branch "hitanshu/experimental*", "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:18 PM 7/10/2026.
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
[... lines 504-657 not visible, scrolled out of view — see IMG_3376-3380 for 576-657 ...]
658	                });
659	                [data2, data3, data4, data6, data7] = buildTextboxEEData(fieldValue);
660	        }
661	    } else {
662	        // No metadata provided: check if value is date format, else use textbox (safest default)
663	        if (isDateFormat(fieldValue)) {
664	            logger.debug('[EEData] Auto-detected date format, using date handler', {
665	                matchcode: buttonMatchcode,
666	            });
667	            [data2, data3, data4, data6, data7] = buildDateEEData(fieldValue);
668	        } else {
669	            logger.debug('[EEData] No control metadata, using textbox handler', {
670	                matchcode: buttonMatchcode,
671	            });
672	            [data2, data3, data4, data6, data7] = buildTextboxEEData(fieldValue);
673	        }
674	    }
675	    // Construct full XML file path
676	    // If relative: ../../pol/xml/Rlv_PIPHPOL_20010101.xml
677	    const fullXmlPath = xmlFileName?.includes('../../') ? xmlFileName : `../../${xmlFileName}`;
678	
679	    // Extract optional rule attribute from control
680	    const ruleAttribute = controlMetadata?.rule || '';
681	
682	    // Alternate nodekey for XMList controls (TODO: implement when needed)
683	    const alternateNodeKey = '';
684	
685	    // Control XML serialization (TODO: implement when needed)
686	    const controlXml = '';


========== IMG_3383.md ==========
---
photo: IMG_3383.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 503, 686-718
orientation: 180
confidence: high
notes: Same file/editor session as IMG_3376-3382, scrolled further down (same 6:18 PM timestamp). This photo is clear/legible with the usual light ghosting, and its gutter numbers for "const controlXml = '';" (686) independently corroborate IMG_3382's corrected line numbers (a one-line discrepancy vs. IMG_3380 was resolved using this photo — see IMG_3380.md notes). Shows the construction of the final 13-element `payload` array (indices 0-12, annotated inline with comments — explicitly said to match a "legacy marrEEData(0 to 12)" structure) followed by a logger.debug call summarizing the built array. Notably the payload never uses variables named data1, data5, or data8 — those "slots" are filled by named values (buttonMatchcode, processIndicator, ruleAttribute, etc.) instead, consistent with every case handler earlier in the function only ever assigning to data2/data3/data4/data6/data7/data9/data10. Content cuts off after line 718 ("data10,") at the bottom edge of the editor, right above the status bar. Sticky-scroll header shows only line 503 (function signature). Tab bar: only "build-eedata-array.ts" open. Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:18 PM 7/10/2026.
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
[... lines 504-685 not visible, scrolled out of view — see IMG_3376-3382 for 576-685 ...]
686	    const controlXml = '';
687	
688	    // Build final 13-element EEData array (indices 0-12)
689	    // This matches legacy marrEEData(0 to 12)
690	    const payload: unknown[] = [
691	        fullXmlPath, // 0: XML file path
692	        buttonMatchcode, // 1: Field matchcode
693	        data2, // 2: Data1 (control-specific)
694	        data3, // 3: Data2 (control-specific)
695	        data4, // 4: Data3 (control-specific)
696	        processIndicator, // 5: Process indicator ("0"=pre, "1"=post)
697	        data6, // 6: Date string (MM/DD/YYYY) or empty
698	        data7, // 7: Combo adjusted list index or empty
699	        ruleAttribute, // 8: Rule attribute from XML
700	        data9, // 9: Previous label (for combo/select) or empty
701	        data10, // 10: Previous value (for combo/select) or empty
702	        alternateNodeKey, // 11: Alternate NodeKey
703	        controlXml, // 12: Control XML
704	    ];
705	    logger.debug('[EEData] Array built successfully', {
706	        xmlFileName: fullXmlPath,
707	        buttonMatchcode,
708	        controlType: controlMetadata?.controlType,
709	        fieldValue,
710	        payloadLength: payload.length,
711	        data2,
712	        data3,
713	        data4,
714	        data6,
715	        data7,
716	        data9,
717	        data10,
718	        ⟪?⟫ (cut off by status bar; likely closes the debug object and/or a return statement, not visible)


========== IMG_3384.md ==========
---
photo: IMG_3384.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 503, 690, 718-723
orientation: 180
confidence: medium
notes: CAVEAT: IMG_3385/IMG_3386 (same comment block, clearer photos) place the "}" / "/**" boundary one line later (722/723 there vs 721/722... actually 723/724 there vs this photo's 722/723) — treat the line numbers in the 719-723 range here as approximate by ±1; content text is accurate. Same file/editor session as IMG_3376-3383, scrolled down slightly further (same 6:18 PM timestamp). Sticky-scroll header now shows two lines: 503 (function signature) and 690 ("const payload: unknown[] = ["), confirming IMG_3383's line numbering (690=start of payload array) is accurate. New content past IMG_3383's cutoff: the logger.debug call closes at 719, the function returns payload at 721, the function closes at 722, and a new JSDoc-style comment block begins at 723 ("/** Legacy Implementation Notes for Reference") — this looks like the start of a large reference/documentation comment following the function, likely with a "====...====" decorative border line beneath it that is cut off by the status bar in this photo. Tab bar: only "build-eedata-array.ts" open. Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:18 PM 7/10/2026.
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
690	    const payload: unknown[] = [
[... lines 504-689 and 691-717 not visible in this crop, already covered by IMG_3376-3383 ...]
718	        data10,
719	    });
720	
721	    return payload;
722	}
723	/** Legacy Implementation Notes for Reference


========== IMG_3373.md ==========
---
photo: IMG_3373.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 529-560
orientation: 180
confidence: medium
notes: Heavy motion-blur/double-exposure ghosting throughout (VS Code appears to have been mid-smooth-scroll when the photo was taken) — every line has a fainter duplicate of the text from 5 lines earlier overlapping it. Transcription was reconstructed by deconvolving the two overlapping layers line-by-line (identifying, for each row, which of the two overlapping strings matched the already-known content from 5 lines above, and treating the other string as the true line at that gutter number); cross-checked for logical/syntactic consistency (indentation, matching braces) which lines up cleanly as a three-tier fallback (direct key match, case-insensitive formData key search, sessionXml search). Sticky-scroll header shows "503  export function buildEEDataArray(...)" at top. Lines 529-534 duplicate content already captured in IMG_3372 (534→547 overlap with prior photo) since this photo is a small scroll further. Explorer sidebar (aqs-web-ui > src) unchanged: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:17 PM 7/10/2026. Given the reconstruction method, treat this transcript as lower confidence than usual for a "high"-rated photo; recommend cross-checking against source if precision matters.
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
529	    let data3: unknown = '';
530	    let data4: unknown = '';
531	    let data6: string = '';
532	    let data7: unknown = '';
533	    let data9: unknown = '';
534	    let data10: unknown = '';
535	
536	    // Field-specific override for POLPOL_NRLVDAT to match legacy EEData structure
537	    if (buttonMatchcode === 'POLPOL_NRLVDAT') {
538	        // Robust nodeKey extraction: check all case variants in formData, then sessionXml, then fallback
539	        let nodeKey = '';
540	        const nodeKeyCandidates = ['nodeKey', 'NodeKey', 'NODEKEY'];
541	        // 1. Direct key match (common cases)
542	        for (const key of nodeKeyCandidates) {
543	            if (typeof formData[key] === 'string' && formData[key]) {
544	                nodeKey = formData[key];
545	                break;
546	            }
547	        }
548	        // 2. Fallback: search all formData keys case-insensitively
549	        if (!nodeKey) {
550	            const foundKey = Object.keys(formData).find(
551	                (k) => typeof k === 'string' && k.toLowerCase() === 'nodekey',
552	            );
553	            if (foundKey && typeof formData[foundKey] === 'string') {
554	                nodeKey = formData[foundKey];
555	            }
556	        }
557	        // 3. If not found in formData, try sessionXml (case-insensitive)
558	        if (!nodeKey && sessionXml && Array.isArray(sessionXml)) {
559	            const found = sessionXml.find((x) => x.name && x.name.toLowerCase() === 'nodekey');
560	            if (found && typeof found.value === 'string') {


========== IMG_3374.md ==========
---
photo: IMG_3374.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 536-568
orientation: 180
confidence: medium
notes: Heavy motion-blur/double-exposure ghosting throughout (same scrolling-during-shutter artifact as IMG_3373, here with a 2-line offset instead of 5). Transcription reconstructed by deconvolving the two overlapping layers line-by-line (matching the fainter of each pair of overlapping strings against already-known content from 2 lines above, treating the other as the true line at that gutter number); cross-checked for logical/syntactic consistency (brace nesting closes cleanly: outer if at 558, inner if at 560-562, outer close at 563, followed by a logger.debug(...) call). Sticky-scroll header shows "503  export function buildEEDataArray(...)" at top. Lines 536-560 duplicate/overlap content already captured in IMG_3373; only 561-568 is new. Explorer sidebar (aqs-web-ui > src) unchanged: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:17 PM 7/10/2026. logger.debug(...) call starting at 564 continues past the visible bottom edge of the screen (line 568 "sessionXml," is the last visible line, likely cut off mid-object).
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
536	    // Field-specific override for POLPOL_NRLVDAT to match legacy EEData structure
537	    if (buttonMatchcode === 'POLPOL_NRLVDAT') {
538	        // Robust nodeKey extraction: check all case variants in formData, then sessionXml, then fallback
539	        let nodeKey = '';
540	        const nodeKeyCandidates = ['nodeKey', 'NodeKey', 'NODEKEY'];
541	        // 1. Direct key match (common cases)
542	        for (const key of nodeKeyCandidates) {
543	            if (typeof formData[key] === 'string' && formData[key]) {
544	                nodeKey = formData[key];
545	                break;
546	            }
547	        }
548	        // 2. Fallback: search all formData keys case-insensitively
549	        if (!nodeKey) {
550	            const foundKey = Object.keys(formData).find(
551	                (k) => typeof k === 'string' && k.toLowerCase() === 'nodekey',
552	            );
553	            if (foundKey && typeof formData[foundKey] === 'string') {
554	                nodeKey = formData[foundKey];
555	            }
556	        }
557	        // 3. If not found in formData, try sessionXml (case-insensitive)
558	        if (!nodeKey && sessionXml && Array.isArray(sessionXml)) {
559	            const found = sessionXml.find((x) => x.name && x.name.toLowerCase() === 'nodekey');
560	            if (found && typeof found.value === 'string') {
561	                nodeKey = found.value;
562	            }
563	        }
564	        logger.debug('[EEData] POLPOL_NRLVDAT nodeKey resolved', {
565	            nodeKey,
566	            formDataKeys: Object.keys(formData),
567	            formDataValues: Object.entries(formData),
568	            sessionXml,


========== IMG_3375.md ==========
---
photo: IMG_3375.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 555-586
orientation: 180
confidence: high
notes: Upper portion (555-569) has motion-blur/double-exposure ghosting (same scrolling-during-shutter artifact as IMG_3373/3374, offset ~3 lines, trailing upward this time); those lines were cross-validated against the independently-reconstructed chains in IMG_3373 and IMG_3374, and confirmed self-consistent by back-counting from the cleanly-legible lower portion (570-586, which lines up exactly: 7 data-variable assignments at 572-578 match the 7 "let dataN" declarations from lines 528-534 seen in IMG_3372/3373). Lower portion (569-586) is sharp/clean with minimal ghosting. Sticky-scroll header shows "503  export function buildEEDataArray(...)" at top. Explorer sidebar (aqs-web-ui > src) unchanged: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts [highlighted/open], build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: aqs-web-ui, branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 6:17 PM 7/10/2026. Line 586's object literal ("matchcode: buttonMatchcode,") is the last visible line, cut off at the bottom edge of the editor — logger.debug call continues past what's visible.
---
503	export function buildEEDataArray(params: BuildEEDataArrayParams): unknown[] {
555	        }
556	    }
557	        // 3. If not found in formData, try sessionXml (case-insensitive)
558	        if (!nodeKey && sessionXml && Array.isArray(sessionXml)) {
559	            const found = sessionXml.find((x) => x.name && x.name.toLowerCase() === 'nodekey');
560	            if (found && typeof found.value === 'string') {
561	                nodeKey = found.value;
562	            }
563	        }
564	        logger.debug('[EEData] POLPOL_NRLVDAT nodeKey resolved', {
565	            nodeKey,
566	            formDataKeys: Object.keys(formData),
567	            formDataValues: Object.entries(formData),
568	            sessionXml,
569	        });
570	        const dateValue = typeof fieldValue === 'string' ? fieldValue : '';
571	
572	        data2 = '';
573	        data3 = 'POL|POL|0|';
574	        data4 = '';
575	        data6 = '';
576	        data7 = '';
577	        data9 = dateValue;
578	        data10 = '';
579	    } else if (controlMetadata) {
580	        // Auto-detect date format from value before switch
581	        // If value matches date pattern, override controlType to 'date'
582	        let controlType = controlMetadata.controlType.toLowerCase().trim();
583	
584	        if (isDateFormat(fieldValue)) {
585	            logger.debug('[EEData] Auto-detected date format, overriding controlType to date', {
586	                matchcode: buttonMatchcode,


========== IMG_3385.md ==========
---
photo: IMG_3385.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 723-752
orientation: 180
confidence: medium
notes: Same file/editor session as IMG_3376-3384, scrolled down further (same 6:18 PM timestamp). This is a large JSDoc-style reference comment block ("Legacy Implementation Notes for Reference") documenting the original VBScript this TS file was ported from (Main_ISLLSYS_20010101.vbs, lines 7465-7700, function SetArrayData), listing per-control-type field mappings (TEXTBOX, COMBO/KPCOMBO, DATE, CHECKBOX so far). There is a one-line numbering discrepancy vs. IMG_3384 (which had this same "}" / "/**" boundary one line earlier, at 722/723) — same camera-motion ghosting issue affecting the whole series; this photo's own internal numbering (723-752) is self-consistent across three separate crops of it and is used as given. Exact attachment of the inline VBScript comments (' Display text / ' Always value / ' Adjusted index) to their code lines is medium confidence — reconstructed using both visual alignment and semantic logic (e.g. "Always value" logically describes the unconditional `.marrEEData(4) = objControl.value` line rather than the `OR listIndex` line above it). Content cuts off after line 752 at the bottom of the editor, right above the status bar. No sticky-scroll header content was captured in the crops used (not verified in this photo). Tab bar: only "build-eedata-array.ts" open. Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:18 PM 7/10/2026.
---
723	}
724	/**
725	 * Legacy Implementation Notes for Reference
726	 * ================================================
727	 *
728	 * This implementation mirrors the VBScript SetArrayData function from:
729	 * Main_ISLLSYS_20010101.vbs (lines 7465-7700)
730	 *
731	 * Key Behaviors:
732	 *
733	 * 1. TEXTBOX (INPUT type="text")
734	 *    .marrEEData(2) = objControl.value
735	 *    .marrEEData(3-4) = ""
736	 *
737	 * 2. COMBO (COMBO, KPCOMBO)
738	 *    .marrEEData(2) = objControl.text            ' Display text
739	 *    .marrEEData(3) = objControl.value OR listIndex
740	 *    .marrEEData(4) = objControl.value            ' Always value
741	 *    .marrEEData(7) = listIndex + intOffset        ' Adjusted index
742	 *    where intOffset = 1 if ShowZero=F, else 0
743	 *
744	 * 3. DATE (INPUT iscalendar="T")
745	 *    .marrEEData(2) = month (MM)
746	 *    .marrEEData(3) = day (DD)
747	 *    .marrEEData(4) = year (YYYY)
748	 *    .marrEEData(6) = "MM/DD/YYYY"
749	 *
750	 * 4. CHECKBOX (ICHECKBOX, INPUT type="checkbox")
751	 *    .marrEEData(2) = "YES" or "NO"
752	 *    .marrEEData(3) = 1 or 0


========== IMG_3386.md ==========
---
photo: IMG_3386.JPG
type: vscode-code
file: aqs-web-ui/src/utils/build-eedata-array.ts
lines: 735-766
orientation: 180
confidence: high
notes: Same file/editor session as IMG_3376-3385, scrolled down slightly further (same 6:18 PM timestamp). Continues and finishes the "Legacy Implementation Notes for Reference" JSDoc comment block. Overlapping lines 735-752 match IMG_3385's transcript exactly, confirming that photo's line numbers (and resolving the earlier IMG_3384 vs IMG_3385 one-line discrepancy in favor of IMG_3385/3386's numbering). New content: RADIO control field mapping, the Process Indicator (index 5) semantics (0=pre-process/before field change, 1=post-process/after field change, "always from UI"), and a closing note that FillCallArray2 reads <calls type="pre"> or <calls type="post"> XML nodes based on marrEEData(5)'s value. The comment block closes with "*/" at line 765; line 766 is blank and is the last line visible before the status bar — this may or may not be the actual end of the file (not confirmed). No line-503 sticky header is shown in this photo (scrolled past the function body into the trailing comment, so VS Code no longer shows the function-signature sticky context). Tab bar: only "build-eedata-array.ts" open. Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", "2 errors 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:18 PM 7/10/2026.
---
735	 *    .marrEEData(3-4) = ""
736	 *
737	 * 2. COMBO (COMBO, KPCOMBO)
738	 *    .marrEEData(2) = objControl.text            ' Display text
739	 *    .marrEEData(3) = objControl.value OR listIndex
740	 *    .marrEEData(4) = objControl.value            ' Always value
741	 *    .marrEEData(7) = listIndex + intOffset        ' Adjusted index
742	 *    where intOffset = 1 if ShowZero=F, else 0
743	 *
744	 * 3. DATE (INPUT iscalendar="T")
745	 *    .marrEEData(2) = month (MM)
746	 *    .marrEEData(3) = day (DD)
747	 *    .marrEEData(4) = year (YYYY)
748	 *    .marrEEData(6) = "MM/DD/YYYY"
749	 *
750	 * 4. CHECKBOX (ICHECKBOX, INPUT type="checkbox")
751	 *    .marrEEData(2) = "YES" or "NO"
752	 *    .marrEEData(3) = 1 or 0
753	 *
754	 * 5. RADIO (RADIOBUTTON)
755	 *    .marrEEData(2) = objControl.value
756	 *    .marrEEData(3) = objControl.selectedIndex
757	 *
758	 * Process Indicator (Index 5):
759	 *    0 = Pre-process calls (before field change)
760	 *    1 = Post-process calls (after field change) ← Always from UI
761	 *
762	 * FillCallArray2 reads calls from:
763	 *    <calls type="pre"> or <calls type="post">
764	 *    based on marrEEData(5) value
765	 */
766	
