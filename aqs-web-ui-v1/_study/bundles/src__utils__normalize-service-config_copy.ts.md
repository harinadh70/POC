# BUNDLE for src/utils/normalize-service-config copy.ts
# 41 photo fragment(s), ascending start-line order.


========== IMG_3841.md ==========
---
photo: IMG_3841.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 1-27
orientation: 180
confidence: high
notes: New file (previously seen only as a truncated sidebar entry "normalize-service-config cop..." in menu-persistence.ts photos). Tab title shows "normalize-service-config copy.ts 1" — the trailing "1" is VS Code's disambiguation suffix (another file with the same basename is open elsewhere, i.e. sibling normalize-service-config.ts, also visible in Explorer). Explorer sidebar (utils folder) now visible with menu-persistence.ts, normalize-service-config... 1 (selected/highlighted), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, plus earlier entries (dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts). Imported "Calls" type (line 1) has a red squiggle underline (looks unused). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 3 errors / 0 warnings (error count increased from 2 to 3 vs prior photos of other files). No ghosting/blur artifact in this photo — clean single exposure.
---
1   import type { OptionItem, Calls } from '@/types';
2
3   const flag = (v: unknown, defaultFalse = false): boolean => {
4       if (v === undefined || v === null || v === '') return defaultFalse;
5       if (typeof v === 'boolean') return v;
6       const s = String(v).trim().toUpperCase();
7       return s === 'T' || s === 'TRUE' || s === '1' || s === 'Y';
8   };
9
10  const randomKey = () => 'fld_' + Math.random().toString(36).slice(2, 10);
11
12  export type ServiceField = {
13      // Standard properties
14      matchcode?: string;
15      id?: string;
16      label?: string;
17      ctrllabel?: string;
18
19      // Important for your backend:
20      controltype?: string; // 'textbox' | 'calendar' | 'combo' | 'radio' | 'button' | 'numeric' etc.
21      type?: string;
22
23      text?: string;
24      value?: string;
25      checked?: boolean;
26
27      tabindex?: string | number;


========== IMG_3842.md ==========
---
photo: IMG_3842.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 12-38
orientation: 180
confidence: high
notes: Continuation of ServiceField type from IMG_3841 (lines 12-27 repeat, cross-checked and consistent); new content is lines 28-38 (more optional properties, then a block of '@'-prefixed properties mirroring the plain ones, for raw XML/JSON backend field names). Mild ghosting artifact (faint duplicate text layer) present but sharp layer fully legible. Explorer sidebar unchanged (normalize-service-config... 1 selected, sibling normalize-service-config.ts visible). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 3 errors / 0 warnings.
---
12  export type ServiceField = {
13      // Standard properties
14      matchcode?: string;
15      id?: string;
16      label?: string;
17      ctrllabel?: string;
18
19      // Important for your backend:
20      controltype?: string; // 'textbox' | 'calendar' | 'combo' | 'radio' | 'button' | 'numeric' etc.
21      type?: string;
22
23      text?: string;
24      value?: string;
25      checked?: boolean;
26
27      tabindex?: string | number;
28      ctrlwidth?: string | number;
29      default?: string | boolean;
30      required?: string | boolean | number;
31      disabled?: string | boolean;
32      visible?: string | boolean;
33      maxlength?: string | number;
34
35      // @-prefixed properties from XML/JSON backend
36      '@matchcode'?: string;
37      '@controltype'?: string;
38      '@ctrllabel'?: string;


========== IMG_3843.md ==========
---
photo: IMG_3843.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 12-48 (23-38 repeat of IMG_3842; 39-48 new)
orientation: 180
confidence: high
notes: Sharp, essentially unghosted capture. Continuation of the @-prefixed property block from IMG_3842 (lines 36-38 repeat, cross-checked and consistent) through line 48; note '@left' appears as a new property not seen among the plain (non-@) properties in IMG_3841/3842, suggesting the @-prefixed block has extra backend-only fields beyond a 1:1 mirror of the plain properties. Sticky header shows "12 export type ServiceField = {" pinned. Explorer sidebar unchanged (normalize-service-config... 1 selected, sibling normalize-service-config.ts visible). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 3 errors / 0 warnings.
---
12  export type ServiceField = {
23      text?: string;
24      value?: string;
25      checked?: boolean;
26
27      tabindex?: string | number;
28      ctrlwidth?: string | number;
29      default?: string | boolean;
30      required?: string | boolean | number;
31      disabled?: string | boolean;
32      visible?: string | boolean;
33      maxlength?: string | number;
34
35      // @-prefixed properties from XML/JSON backend
36      '@matchcode'?: string;
37      '@controltype'?: string;
38      '@ctrllabel'?: string;
39      '@ctrlwidth'?: string | number;
40      '@default'?: string | boolean;
41      '@disabled'?: string;
42      '@required'?: string | boolean | number;
43      '@visible'?: string;
44      '@tabindex'?: string | number;
45      '@text'?: string;
46      '@maxlength'?: string | number;
47      '@type'?: string;
48      '@left'?: string | number;


========== IMG_3844.md ==========
---
photo: IMG_3844.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 12-48
orientation: 180
confidence: high
notes: Duplicate/retake of IMG_3843 — identical scroll position and content (ServiceField type, lines 12-48, sticky header "12 export type ServiceField = {"), no new lines revealed. Explorer sidebar and status bar identical to IMG_3843 (normalize-service-config... 1 selected, branch "hitanshu/experimental*" dirty, "No Solution", 3 errors / 0 warnings). See IMG_3843.md for the full transcription of this range.
---
(Identical to IMG_3843 — lines 12, 23-48 of ServiceField type. See transcripts/IMG_3843.md for verbatim content; not re-transcribed here to avoid duplication.)


========== IMG_3845.md ==========
---
photo: IMG_3845.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 12-61
orientation: 180
confidence: high
notes: Tab title "normalize-service-config copy.ts 1" (sticky-scroll shows line 12 as enclosing scope). Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts > ... Explorer sidebar (src/utils) visible: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (active/highlighted), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Only one tab open. Bottom bar: branch "hitanshu/experimental*" (dirty), "No Solution", Problems 3 errors / 0 warnings, Ln 1 Col 1 (cursor not at code shown). Right-edge minimap shows heavy content below.
---
12:     export type ServiceField = {
(gap: lines 13-35 not visible, scrolled)
36:         '@matchcode'?: string;
37:         '@controltype'?: string;
38:         '@ctrllabel'?: string;
39:         '@ctrlwidth'?: string | number;
40:         '@default'?: string | boolean;
41:         '@disabled'?: string;
42:         '@required'?: string | boolean | number;
43:         '@visible'?: string;
44:         '@tabindex'?: string | number;
45:         '@text'?: string;
46:         '@maxlength'?: string | number;
47:         '@type'?: string;
48:         '@left'?: string | number;
49:         '@top'?: string | number;
50:         '@utporder'?: string | number;
51:         '@firstcontrol'?: string;
52:         '@tab'?: string;
53: (blank)
54:         // options sources
55:         options?: Array<unknown>;
56:         items?: Array<unknown>;
57:         list?: Array<unknown>;
58:         datasource?: Array<unknown>;
59:         listitems?: Array<{ key: string; label: string }>;
60: (blank)
61:         // highlight (optional)
(line 62 cut off at bottom edge, illegible: ⟪?⟫)


========== IMG_3846.md ==========
---
photo: IMG_3846.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 12, 50-73 (approximate, see notes)
orientation: 180
confidence: low
notes: SEVERE motion blur / double-exposure ghosting throughout the code pane — every line of text and every gutter line-number is overlaid with a second, fainter copy offset by roughly 1-2 lines (visible clearly in the line-number gutter: e.g. "50" has a faint "49" ghost behind it). This is the same file/tab as IMG_3845 ("normalize-service-config copy.ts", tab "...copy.ts 1"), continuing the same scroll region and a bit further down. Line numbers 50-61 corroborated against the sharp IMG_3845 photo (which showed this same range unambiguously); line numbers 62-73 are this photo's best-effort reading of the sharper/higher-contrast text layer, filtering out the fainter ghost duplicate — treat as approximate, could be off by 1-2 lines. Explorer sidebar (src/utils) unchanged from IMG_3845: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (active/highlighted), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Only one tab open ("normalize-service-config copy.ts 1", unsaved dot). Bottom bar: branch "hitanshu/experimental*" (dirty), "No Solution", Problems 3 errors / 0 warnings, cursor Ln 1 Col 1 (not at visible code). Right-edge minimap shows heavy content continuing below.
---
12:     export type ServiceField = {
(gap: lines 13-49 not visible, scrolled)
50:         '@utporder'?: string | number;
51:         '@firstcontrol'?: string;
52:         '@tab'?: string;
53: (blank)
54:         // options sources
55:         options?: Array<unknown>;
56:         items?: Array<unknown>;
57:         list?: Array<unknown>;
58:         datasource?: Array<unknown>;
59:         listitems?: Array<{ key: string; label: string }>;
60: (blank)
61:         // highlight (optional)
62:         highlight?: string | boolean;   ⟪approx line#⟫
63:         highlightColor?: string;   ⟪approx line#⟫
64:         highlightBorderColor?: string;   ⟪approx line#⟫
65: (blank)   ⟪approx line#⟫
66:         // LimitToList attribute from legacy AQS   ⟪approx line#⟫
67:         '@limittolist'?: string;   ⟪approx line#⟫
68:         limittolist?: string;   ⟪approx line#⟫
69: (blank)   ⟪approx line#⟫
70:         // date specifics (optional)   ⟪approx line#⟫
71:         dateFormat?: string;   ⟪approx line#⟫
72:         minDate?: string;   ⟪approx line#⟫
73:         maxDate?: string;   ⟪approx line#⟫


========== IMG_3847.md ==========
---
photo: IMG_3847.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 12, 57-80 (approximate, see notes)
orientation: 180
confidence: low
notes: Same heavy motion-blur/double-exposure ghosting as IMG_3846 (every gutter number and text line has a fainter duplicate offset ~2 lines) — same tab "normalize-service-config copy.ts 1", scrolled slightly further down than IMG_3846, with the tail end (ServiceField closing brace, "// calls" field, and the start of "export type NormalizedField") visible and reconstructed by TypeScript-syntax validity (a "calls?: Calls[];" optional-field line must sit inside a type body, which fixes the ordering: blank, comment, field, closing brace). Lines 74-80 pattern cross-checked against IMG_3845's original (pre-rotation) view of this same NormalizedField block. Sidebar/tab bar/bottom bar identical to IMG_3846 (utils folder open, normalize-service-config copy.ts active, branch hitanshu/experimental* dirty, No Solution, 3 errors/0 warnings). Treat exact line numbers as approximate (+/-1-2) given the blur.
---
12:     export type ServiceField = {
(gap: lines 13-56 not visible, scrolled)
57:         list?: Array<unknown>;
58:         datasource?: Array<unknown>;
59:         listitems?: Array<{ key: string; label: string }>;
60: (blank)
61:         // highlight (optional)
62:         highlight?: string | boolean;
63:         highlightColor?: string;
64:         highlightBorderColor?: string;
65: (blank)
66:         // LimitToList attribute from legacy AQS
67:         '@limittolist'?: string;
68:         limittolist?: string;
69: (blank)
70:         // date specifics (optional)
71:         dateFormat?: string;
72:         minDate?: string;
73:         maxDate?: string;
74: (blank)
75:         // calls
76:         calls?: Calls[];
77:     };
78: (blank)
79:     export type NormalizedField = {
80:         utporder: number;
(cut off at bottom edge: "matchcode: string;" and "label: string;" partially visible, next lines not captured)


========== IMG_3848.md ==========
---
photo: IMG_3848.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 12, 65-90 (approximate, see notes)
orientation: 180
confidence: low
notes: Same tab/file as IMG_3846/IMG_3847 ("normalize-service-config copy.ts 1"), scrolled further down; same heavy motion-blur double-exposure (every gutter number and text row shows a fainter duplicate offset ~2 lines, most likely from a slow shutter/low indoor light at 7:27PM). Lines 65-80 overlap IMG_3847's content (reconstructed there via TypeScript-syntax validity) and are not re-verified pixel-by-pixel here. Lines 81-90 are new: this is the start of the "export type NormalizedField = {" object type — utporder/matchcode/label/controlType fields, with controlType typed as a string-literal union whose members were legible in a comparatively sharper (less blurred) region of the photo: 'textbox' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'numeric' | ⟪?⟫ (union continues past the bottom edge of the frame, next value cut off/illegible). Sidebar/tab bar/bottom bar identical to prior photos in this run (utils folder, branch hitanshu/experimental* dirty, No Solution, 3 errors/0 warnings).
---
12:     export type ServiceField = {
(gap: lines 13-64 not visible, scrolled; see IMG_3846/IMG_3847 for lines 50-80 in this range)
65: (blank)
66:         // LimitToList attribute from legacy AQS
67:         '@limittolist'?: string;
68:         limittolist?: string;
69: (blank)
70:         // date specifics (optional)
71:         dateFormat?: string;
72:         minDate?: string;
73:         maxDate?: string;
74: (blank)
75:         // calls
76:         calls?: Calls[];
77:     };
78: (blank)
79:     export type NormalizedField = {
80:         utporder: number;
81:         matchcode: string;
82:         label: string;
83:         controlType:
84:             | 'textbox'
85:             | 'textarea'
86:             | 'select'
87:             | 'radio'
88:             | 'checkbox'
89:             | 'date'
90:             | 'numeric'
(cut off at bottom edge, next union member illegible: ⟪?⟫)


========== IMG_3849.md ==========
---
photo: IMG_3849.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 79, 84-109
orientation: 180
confidence: high
notes: Sharp photo, minimal blur (unlike IMG_3846-3848 immediately prior in this run, which were badly motion-blurred/double-exposed). Sticky-scroll header shows line 79 "export type NormalizedField = {" pinned at top. Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts > ... Tab bar: only "normalize-service-config copy.ts 1" open (unsaved dot). Explorer sidebar (src/utils) same list as prior photos in this run: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (active/highlighted), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Bottom bar: branch "hitanshu/experimental*" (dirty), "No Solution", Problems 3 errors / 0 warnings, cursor Ln 1 Col 1 (not at visible code). Line 100 and 101 have trailing inline comments with a green checkmark emoji/icon "✅ mixed type supported" (rendered as a checkbox icon in the gutter-adjacent decoration, transcribed as ✅). This confirms/corroborates the controlType union members already inferred in IMG_3848's notes (textbox/textarea/select/radio/checkbox/date/numeric) and extends it with 'radioField' and 'button'. Right-edge minimap shows more content continuing below (scrollbar not at bottom).
---
79:     export type NormalizedField = {
(gap: lines 80-83 not visible, scrolled — see IMG_3848 for a low-confidence reading of 80-83: utporder/matchcode/label/controlType:)
84:             | 'textbox'
85:             | 'textarea'
86:             | 'select'
87:             | 'radio'
88:             | 'checkbox'
89:             | 'date'
90:             | 'numeric'
91:             | 'radioField'
92:             | 'button';
93:         required: boolean;
94:         disabled: boolean;
95:         visible: boolean;
96:         tabIndex: number;
97:         width: number;
98:         placeholder?: string;
99:         options: OptionItem[];
100:         defaultValue: string | boolean; // ✅ mixed type supported
101:         maxLength?: number;
102: (blank)
103:         // Optional UI helpers
104:         highlight?: boolean;
105:         highlightColor?: string;
106:         highlightBorderColor?: string;
107: (blank)
108:         // LimitToList - when false on a select/combo, field gets yellow highlight
109:         limitToList?: boolean;


========== IMG_3850.md ==========
---
photo: IMG_3850.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 79, 92-117
orientation: 180
confidence: high
notes: Sharp photo, no blur. Sticky-scroll header shows line 79 "export type NormalizedField = {" pinned at top; line 91 ("| 'radioField'") barely peeks out from under the sticky header at the very top edge. Directly continues from IMG_3849 (which ended at line 92 "| 'button';" — confirmed matching here). Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts > ... Tab bar: only "normalize-service-config copy.ts 1" open. Explorer sidebar (src/utils) unchanged: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (active/highlighted), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Bottom bar: branch "hitanshu/experimental*" (dirty), "No Solution", Problems 3 errors / 0 warnings, cursor Ln 1 Col 1. Line 100 has trailing comment with green checkmark icon "✅ mixed type supported" (same decoration as IMG_3849). Right-edge minimap shows more content below (scrollbar not at bottom) — file continues past line 117.
---
79:     export type NormalizedField = {
(gap: line 91 "| 'radioField'" mostly hidden under sticky header)
92:             | 'button';
93:         required: boolean;
94:         disabled: boolean;
95:         visible: boolean;
96:         tabIndex: number;
97:         width: number;
98:         placeholder?: string;
99:         options: OptionItem[];
100:         defaultValue: string | boolean; // ✅ mixed type supported
101:         maxLength?: number;
102: (blank)
103:         // Optional UI helpers
104:         highlight?: boolean;
105:         highlightColor?: string;
106:         highlightBorderColor?: string;
107: (blank)
108:         // LimitToList - when false on a select/combo, field gets yellow highlight
109:         limitToList?: boolean;
110: (blank)
111:         // Date helpers
112:         dateFormat?: string;
113:         minDate?: string;
114:         maxDate?: string;
115:         iscalendar?: boolean; // for backward compatibility with 'calendar' controltype
116:         isNumeric?: boolean; // if true, only allow numbers
117: (blank / cut off at bottom edge)


========== IMG_3851.md ==========
---
photo: IMG_3851.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 79, 92-117
orientation: 180
confidence: high
notes: DUPLICATE of IMG_3850 — identical scroll position, identical visible content (lines 79 sticky + 92-117), same timestamp (7:27 PM 7/10/2026) in the taskbar. Sharp photo, no blur. Sticky-scroll header shows line 79 "export type NormalizedField = {". Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts > ... Tab bar: only "normalize-service-config copy.ts 1" open. Explorer sidebar (src/utils) unchanged: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (active/highlighted), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Bottom bar: branch "hitanshu/experimental*" (dirty), "No Solution", Problems 3 errors / 0 warnings, cursor Ln 1 Col 1. Line 100 has trailing comment with green checkmark icon "✅ mixed type supported".
---
79:     export type NormalizedField = {
(gap: line 91 "| 'radioField'" mostly hidden under sticky header)
92:             | 'button';
93:         required: boolean;
94:         disabled: boolean;
95:         visible: boolean;
96:         tabIndex: number;
97:         width: number;
98:         placeholder?: string;
99:         options: OptionItem[];
100:         defaultValue: string | boolean; // ✅ mixed type supported
101:         maxLength?: number;
102: (blank)
103:         // Optional UI helpers
104:         highlight?: boolean;
105:         highlightColor?: string;
106:         highlightBorderColor?: string;
107: (blank)
108:         // LimitToList - when false on a select/combo, field gets yellow highlight
109:         limitToList?: boolean;
110: (blank)
111:         // Date helpers
112:         dateFormat?: string;
113:         minDate?: string;
114:         maxDate?: string;
115:         iscalendar?: boolean; // for backward compatibility with 'calendar' controltype
116:         isNumeric?: boolean; // if true, only allow numbers
117: (blank / cut off at bottom edge)


========== IMG_3852.md ==========
---
photo: IMG_3852.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 79, 110-135
orientation: 180
confidence: high
notes: Sharp photo, no blur. Sticky-scroll header shows line 79 "export type NormalizedField = {". Directly continues from IMG_3850/3851 (lines 110-117 repeat/confirm that content, then new content 118-135). This is where NormalizedField closes (125) and the exported normalizeServiceConfig function begins (127), with helper functions normalizeKey and getProp. Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts > ... Tab bar: only "normalize-service-config copy.ts 1" open. Explorer sidebar (src/utils) unchanged: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (active/highlighted), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Bottom bar: branch "hitanshu/experimental*" (dirty), "No Solution", Problems 3 errors / 0 warnings, cursor Ln 1 Col 1. Right-edge minimap shows more content below (scrollbar not at bottom).
---
79:     export type NormalizedField = {
(gap: lines 80-109 not fully re-verified here, see IMG_3849/IMG_3850)
110: (blank)
111:         // Date helpers
112:         dateFormat?: string;
113:         minDate?: string;
114:         maxDate?: string;
115:         iscalendar?: boolean; // for backward compatibility with 'calendar' controltype
116:         isNumeric?: boolean; // if true, only allow numbers
117: (blank)
118:         // positioning (top/left from API - px or % values)
119:         top?: string | number;
120:         left?: string | number;
121:         ctrlwidth?: string | number;
122: (blank)
123:         // calls
124:         calls?: Calls[];
125:     };
126: (blank)
127:     export const normalizeServiceConfig = (
128:         serviceArray: readonly ServiceField[] = [],
129:     ): NormalizedField[] => {
130:         const normalizeKey = (s?: string) => (s || '').toString().trim().toLowerCase();
131: (blank)
132:         // Helper to get property with or without @ prefix
133:         const getProp = <T>(obj: ServiceField, key: string): T | undefined => {
134:             const atKey = `@${key}` as keyof ServiceField;
135:             return ((obj[atKey] as T) ?? (obj[key as keyof ServiceField] as T)) as T | undefined;


========== IMG_3853.md ==========
---
photo: IMG_3853.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 79, 133-145 (approximate, see notes)
orientation: 180
confidence: low
notes: Same tab as prior photos ("normalize-service-config copy.ts 1"); moderate motion-blur double-exposure again (gutter numbers and text each show a fainter duplicate offset ~2 lines, less severe than IMG_3846-3848 but still present). Lines 133-137 (getProp helper) repeat/confirm IMG_3852's tail content. Lines 138-145 are new: blank line, then a new helper "const toControlType = (...) : NormalizedField['controlType'] | undefined => {" with params rawControlType/rawType/checkCalender, and its first branch "if (checkCalender === true) { return 'date'; }". Line numbers reconstructed from the sharper text layer plus TypeScript-syntax validity (parameter list must close before the arrow/return-type); treat as approximate, +/-1-2. Sticky-scroll header shows line 79 "export type NormalizedField = {". Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts > ... Tab bar: only "normalize-service-config copy.ts 1" open. Explorer sidebar (src/utils) unchanged. Bottom bar: branch "hitanshu/experimental*" (dirty), "No Solution", Problems 3 errors / 0 warnings.
---
79:     export type NormalizedField = {
(gap: lines 80-132 not re-verified here, see IMG_3849/IMG_3850/IMG_3852)
133:         // Helper to get property with or without @ prefix
134:         const getProp = <T>(obj: ServiceField, key: string): T | undefined => {
135:             const atKey = `@${key}` as keyof ServiceField;
136:             return ((obj[atKey] as T) ?? (obj[key as keyof ServiceField] as T)) as T | undefined;
137:         };
138: (blank)
139:         const toControlType = (
140:             rawControlType?: string,
141:             rawType?: string,
142:             checkCalender?: boolean | number,
143:         ): NormalizedField['controlType'] | undefined => {
144:             if (checkCalender === true) {
145:                 return 'date';
(cut off at bottom edge, next lines not captured — likely closing "}" of the if-block)


========== IMG_3854.md ==========
---
photo: IMG_3854.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 125-148 (approximate for 143-149, see notes)
orientation: 180
confidence: medium
notes: Same tab as prior photos ("normalize-service-config copy.ts 1"); moderate motion-blur double-exposure (gutter numbers/text each show a fainter duplicate offset ~2 lines) through most of the frame, but the sticky-scroll header area (top, showing lines 125-129) and the very bottom rows (143-148, the toControlType function body) are comparatively sharp and were cross-checked directly. Lines 125-142 repeat content already captured cleanly in IMG_3852/IMG_3853 (NormalizedField close, normalizeServiceConfig start, getProp helper, toControlType signature) and are not re-transcribed in full detail here. New content: toControlType's first two branches — checkCalender true returns 'date'; then a fallback const key = normalizeKey(rawControlType) || normalizeKey(rawType) with an if(!key) guard. Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts > ... Tab bar: only "normalize-service-config copy.ts 1" open. Bottom bar: branch "hitanshu/experimental*" (dirty), "No Solution", Problems 3 errors / 0 warnings.
---
125:     };
126: (blank)
127:     export const normalizeServiceConfig = (
128:         serviceArray: readonly ServiceField[] = [],
129:     ): NormalizedField[] => {
(gap: lines 130-142 not re-verified here, see IMG_3852/IMG_3853 — getProp helper and toControlType signature with rawControlType/rawType/checkCalender params)
143:         ): NormalizedField['controlType'] | undefined => {
144:             if (checkCalender === true) {
145:                 return 'date';
146:             }
147:             const key = normalizeKey(rawControlType) || normalizeKey(rawType);
148:             if (!key) {
(cut off at bottom edge; a faint "return undefined;" is visible past the frame edge, likely line 149, not fully legible: ⟪?⟫)


========== IMG_3855.md ==========
---
photo: IMG_3855.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127, 131-156
orientation: 180
confidence: high
notes: Sharp photo, no blur — this cleanly resolves/confirms the line numbering that was only reconstructed at low/medium confidence from the blurry IMG_3853/IMG_3854 (ground truth here: toControlType starts at line 138, not 139 as guessed earlier; the checkCalender/'date' branch is 143-145; the key-fallback/guard is 147-152; switch(key) starts at 154). Sticky-scroll header shows line 127 "export const normalizeServiceConfig = (" pinned at top; lines 128-130 (serviceArray param, closing paren/return type, normalizeKey helper) are hidden under the sticky header, already captured in IMG_3852. Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts > ... Tab bar: only "normalize-service-config copy.ts 1" open. Explorer sidebar (src/utils) unchanged. Bottom bar: branch "hitanshu/experimental*" (dirty), "No Solution", Problems 3 errors / 0 warnings, cursor Ln 1 Col 1. Right-edge minimap shows more content below (scrollbar not at bottom) — a switch statement on controltype values begins at 154, continuing past the visible frame.
---
127:     export const normalizeServiceConfig = (
(gap: lines 128-130 hidden under sticky header — see IMG_3852: serviceArray param, return type, normalizeKey helper)
131: (blank)
132:         // Helper to get property with or without @ prefix
133:         const getProp = <T>(obj: ServiceField, key: string): T | undefined => {
134:             const atKey = `@${key}` as keyof ServiceField;
135:             return ((obj[atKey] as T) ?? (obj[key as keyof ServiceField] as T)) as T | undefined;
136:         };
137: (blank)
138:         const toControlType = (
139:             rawControlType?: string,
140:             rawType?: string,
141:             checkCalender?: boolean | number,
142:         ): NormalizedField['controlType'] | undefined => {
143:             if (checkCalender === true) {
144:                 return 'date';
145:             }
146: (blank)
147:             const key = normalizeKey(rawControlType) || normalizeKey(rawType);
148: (blank)
149:             if (!key) {
150:                 // No controltype/type present and no calendar flag -> do NOT assume
151:                 return undefined;
152:             }
153: (blank)
154:             switch (key) {
155:                 case 'textbox':
156:                 case 'text':


========== IMG_3856.md ==========
---
photo: IMG_3856.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127, 138, 145-167
orientation: 180
confidence: medium
notes: Same tab as prior photos ("normalize-service-config copy.ts 1"); mild motion-blur double-exposure (gutter numbers/text show a faint duplicate offset ~1 line) in the upper part of the frame, but rows ~160-167 near the bottom are sharper and were used to anchor the case-label sequence. Lines 145-153 repeat content already confirmed at high confidence in IMG_3855 (checkCalender/'date' branch, key fallback/guard) and are only summarized here. New content: the switch(key) statement mapping raw controltype/type strings to normalized NormalizedField['controlType'] values — textbox/text->'textbox', textarea->'textarea', select/dropdown/combo->'select', radio/radiobutton->'radio', checkbox->(cut off, next case value not visible). Sticky-scroll headers show lines 127 "export const normalizeServiceConfig = (" and 138 "const toControlType = (" pinned at top. Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts > ... Tab bar: only "normalize-service-config copy.ts 1" open. Bottom bar: branch "hitanshu/experimental*" (dirty), "No Solution", Problems 3 errors / 0 warnings.
---
127:     export const normalizeServiceConfig = (
138:         const toControlType = (
(gap: lines 139-144 not re-verified here, see IMG_3855: params + checkCalender===true check)
145:                 return 'date';
146:             }
147:             const key = normalizeKey(rawControlType) || normalizeKey(rawType);
148: (blank)
149:             if (!key) {
150:                 // No controltype/type present and no calendar flag -> do NOT assume
151:                 return undefined;
152:             }
153: (blank)
154:             switch (key) {
155:                 case 'textbox':
156:                 case 'text':
157:                     return 'textbox';
158:                 case 'textarea':
159:                     return 'textarea';
160:                 case 'select':
161:                 case 'dropdown':
162:                 case 'combo':
163:                     return 'select';
164:                 case 'radio':
165:                 case 'radiobutton':
166:                     return 'radio';
167:                 case 'checkbox':
(cut off at bottom edge, next line — likely "return 'checkbox';" — not fully legible: ⟪?⟫)


========== IMG_3857.md ==========
---
photo: IMG_3857.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,138,153-177
orientation: 180
confidence: high
notes: Sticky scroll shows enclosing scope lines 127 (export const normalizeServiceConfig = () and 138 (const toControlType = (). Explorer sidebar (utils folder, expanded) shows files: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (highlighted/selected, active tab), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts (partially visible). Tab bar shows only "normalize-service-config copy.ts" tab open. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution". Workspace AQS_workspace. Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts > ... (function name in breadcrumb truncated/not shown further). Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
138      const toControlType = (
153
154      switch (key) {
155          case 'textbox':
156          case 'text':
157              return 'textbox';
158          case 'textarea':
159              return 'textarea';
160          case 'select':
161          case 'dropdown':
162          case 'combo':
163              return 'select';
164          case 'radio':
165          case 'radiobutton':
166              return 'radio';
167          case 'checkbox':
168          case 'bool':
169              return 'checkbox';
170          case 'date':
171          case 'datepicker':
172          case 'datetime':
173          case 'calendar':
174              return 'date';
175          case 'numeric':
176          case 'number':
177          case 'integer':


========== IMG_3858.md ==========
---
photo: IMG_3858.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,138,172-196
orientation: 180
confidence: high
notes: Sticky scroll headers show lines 127 (export const normalizeServiceConfig = () and 138 (const toControlType = (), which occlude the real line 171 beneath them. Photo has a visible ghosting/double-exposure artifact (camera caught mid-scroll) duplicating lines ~187-196 fainter beneath the sharp text; content is identical in both layers so transcription is unaffected. Explorer sidebar same file list as prior photo (utils folder): dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (selected/active tab), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Only one tab open. Status bar: branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution". Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
138      const toControlType = (
171  ⟪occluded by sticky-scroll header⟫
172      case 'datepicker':
173      case 'datetime':
174      case 'calendar':
175          return 'date';
176      case 'numeric':
177      case 'number':
178      case 'integer':
179          return 'textbox';
180      // case 'button':
181      // case 'btn':
182      //   return 'button';
183      default:
184          return 'textbox'; // default to textbox if unknown
185      }
186  };
187
188  const coerceOptions = (it: ServiceField): OptionItem[] => {
189      const rawOptions = it.options ?? it.list ?? it.datasource ?? it.items ?? it.listitems;
190      if (!Array.isArray(rawOptions)) return [];
191
192      return rawOptions.map((o): OptionItem => {
193          if (o && typeof o === 'object') {
194              const obj = o as Record<string, unknown>;
195              const label =
196                  (obj.label as string) ??


========== IMG_3859.md ==========
---
photo: IMG_3859.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,138,179-204
orientation: 180
confidence: medium
notes: Photo has strong motion-blur/double-exposure ghosting throughout (screen was mid-scroll when captured) — every code line and gutter number appears with a fainter duplicate offset by a few lines, and the line-number gutter itself shows interleaved bright/dim digits. Lines 179-194 overlap with, and were cross-checked against, the sharper IMG_3858 photo (same content, high confidence). Lines 195-204 are this photo's extension past IMG_3858's visible range; line 195-196 also cross-checked against IMG_3858. Lines 197-204 reconstructed by reading the coherent code sequence out of the blended layers (filtered ghost duplicates) — logically consistent (fallback-chain pattern continues: label from obj.label/text/name/value/id/key, then value from obj.value/id/key/label) and the line count matches the visible gutter span exactly, but treat as approximate given the blur. Sticky-scroll headers again show lines 127 (export const normalizeServiceConfig = () and 138 (const toControlType = (), which occlude line 179's real content (known from IMG_3858: "return 'textbox';"). Explorer sidebar/tab bar/status bar unchanged from prior two photos (utils folder expanded, same file list, single tab "normalize-service-config copy.ts", branch hitanshu/experimental*, 3 errors/0 warnings, No Solution). Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
138      const toControlType = (
179  ⟪occluded by sticky-scroll header; per IMG_3858 = return 'textbox';⟫
180      // case 'button':
181      // case 'btn':
182      //   return 'button';
183      default:
184          return 'textbox'; // default to textbox if unknown
185      }
186  };
187
188  const coerceOptions = (it: ServiceField): OptionItem[] => {
189      const rawOptions = it.options ?? it.list ?? it.datasource ?? it.items ?? it.listitems;
190      if (!Array.isArray(rawOptions)) return [];
191
192      return rawOptions.map((o): OptionItem => {
193          if (o && typeof o === 'object') {
194              const obj = o as Record<string, unknown>;
195              const label =
196                  (obj.label as string) ??
197                  (obj.text as string) ??
198                  (obj.name as string) ??
199                  String(
200                      (obj.value as string) ?? (obj.id as string) ?? (obj.key as string) ?? '',
201                  );
202              const value = String(
203                  (obj.value as string) ?? (obj.id as string) ?? (obj.key as string) ?? label,
204              );


========== IMG_3860.md ==========
---
photo: IMG_3860.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,138,185-209
orientation: 180
confidence: high
notes: Same motion-blur double-exposure ghosting as prior two photos (fainter duplicate of lines offset by a few rows behind the sharp text), but the sharp/foreground layer is clearly legible throughout and confirms/extends the reconstruction from IMG_3859. Sticky-scroll headers again show lines 127 (export const normalizeServiceConfig = () and 138 (const toControlType = (). Lines 185-204 corroborate IMG_3858/IMG_3859 exactly. New content: lines 205-209 close out the coerceOptions function (fallback return, closing braces, final return for primitive o, closing map callback and function). Explorer sidebar/tab bar/status bar unchanged (utils folder, same file list, single tab, branch hitanshu/experimental*, 3 errors/0 warnings, No Solution). Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
138      const toControlType = (
185      }
186  };
187
188  const coerceOptions = (it: ServiceField): OptionItem[] => {
189      const rawOptions = it.options ?? it.list ?? it.datasource ?? it.items ?? it.listitems;
190      if (!Array.isArray(rawOptions)) return [];
191
192      return rawOptions.map((o): OptionItem => {
193          if (o && typeof o === 'object') {
194              const obj = o as Record<string, unknown>;
195              const label =
196                  (obj.label as string) ??
197                  (obj.text as string) ??
198                  (obj.name as string) ??
199                  String(
200                      (obj.value as string) ?? (obj.id as string) ?? (obj.key as string) ?? '',
201                  );
202              const value = String(
203                  (obj.value as string) ?? (obj.id as string) ?? (obj.key as string) ?? label,
204              );
205              return { label, value };
206          }
207          return { label: String(o), value: String(o) };
208      });
209  };


========== IMG_3861.md ==========
---
photo: IMG_3861.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,187,191,194-218
orientation: 180
confidence: high
notes: Clean/sharp capture, no motion blur this time. Sticky-scroll headers show lines 127 (export const normalizeServiceConfig = (), 187 (const coerceOptions = (it: ServiceField): OptionItem[] => {), 191 (return rawOptions.map((o): OptionItem => {). Line 194 top edge partly cut behind sticky header (obscured, matches known content "const obj = o as Record<string, unknown>;" from prior photos). Lines 195-209 corroborate IMG_3859/IMG_3860 exactly. New content starts at 210: JSDoc comment block for extractIndexedOptions, then the start of that function's body including a for loop up to i<=100. Explorer sidebar/tab bar/status bar unchanged (utils folder, same file list, single tab, branch hitanshu/experimental*, 3 errors/0 warnings, No Solution). Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
187      const coerceOptions = (it: ServiceField): OptionItem[] => {
191          return rawOptions.map((o): OptionItem => {
194  ⟪partly occluded by sticky header; = const obj = o as Record<string, unknown>;⟫
195              const label =
196                  (obj.label as string) ??
197                  (obj.text as string) ??
198                  (obj.name as string) ??
199                  String(
200                      (obj.value as string) ?? (obj.id as string) ?? (obj.key as string) ?? '',
201                  );
202              const value = String(
203                  (obj.value as string) ?? (obj.id as string) ?? (obj.key as string) ?? label,
204              );
205              return { label, value };
206          }
207          return { label: String(o), value: String(o) };
208      });
209  };
210
211  /**
212   * Extract options from indexed properties (@text1/@value1, @text2/@value2, etc.)
213   * Used by radio, select, combo controls with dynamic option lists
214   */
215  const extractIndexedOptions = (it: ServiceField): OptionItem[] => {
216      const options: OptionItem[] = [];
217
218      for (let i = 1; i <= 100; i += 1) {


========== IMG_3862.md ==========
---
photo: IMG_3862.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,187,209-233
orientation: 180
confidence: medium
notes: Clean/sharp capture, no motion blur. Sticky-scroll headers show lines 127 (export const normalizeServiceConfig = () and 187 (const coerceOptions = (it: ServiceField): OptionItem[] => {). Content is the start of extractIndexedOptions function body (JSDoc + for loop reading @value{i}/@text{i} indexed properties off ServiceField). Line numbering in this photo was ambiguous on close re-inspection (perspective skew in the photo made the gutter column drift slightly relative to code text); reconciled against IMG_3860 and IMG_3861's clearer/cross-checked numbering (which agree the coerceOptions closing "};" is line 209, not 208) — downgraded confidence to medium for the exact line numbers even though the code content itself is clearly legible. Explorer sidebar/tab bar/status bar unchanged (utils folder, same file list, single tab, branch hitanshu/experimental*, 3 errors/0 warnings, No Solution). Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
187      const coerceOptions = (it: ServiceField): OptionItem[] => {
209      };
210
211      /**
212       * Extract options from indexed properties (@text1/@value1, @text2/@value2, etc.)
213       * Used by radio, select, combo controls with dynamic option lists
214       */
215      const extractIndexedOptions = (it: ServiceField): OptionItem[] => {
216          const options: OptionItem[] = [];
217
218          for (let i = 1; i <= 100; i += 1) {
219              const valueKey = `@value${i}` as keyof ServiceField;
220              const textKey = `@text${i}` as keyof ServiceField;
221
222              const optionValue = it[valueKey] ?? (it[`value${i}` as keyof ServiceField] as unknown);
223              const optionLabel = it[textKey] ?? (it[`text${i}` as keyof ServiceField] as unknown);
224
225              // Stop iteration if both are missing
226              if (!optionValue && !optionLabel) {
227                  break;
228              }
229
230              options.push({
231                  value: String(optionValue ?? ''),
232                  label: String(optionLabel ?? optionValue ?? ''),
233              });


========== IMG_3863.md ==========
---
photo: IMG_3863.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,215-235 (approximate, see notes)
orientation: 180
confidence: low
notes: SEVERE motion-blur/double-exposure ghosting throughout — screen was mid-scroll when captured, every line doubled with a second copy offset by several rows, gutter numbers also doubled/overlapping and hard to align precisely to text (similar issue as IMG_3846/IMG_3859). Content for lines up to 233 duplicates IMG_3861/IMG_3862 (cross-checked, high confidence for that portion via those clearer photos). New content beyond IMG_3862 is lines 234-235, closing out the for-loop and returning options — reconstructed from the coherent code sequence in the blended layers; logically unambiguous (for-loop close, then return statement) and line count is consistent with corrected IMG_3862 numbering, but treat exact line numbers as approximate given the blur. The function's own closing "};" (expected ~line 236) is not clearly visible in this photo (cut off near bottom status bar / Problems indicator). Sticky header shows only line 127 (export const normalizeServiceConfig = (). Explorer sidebar/tab bar/status bar unchanged (utils folder, same file list, single tab, branch hitanshu/experimental*, 3 errors/0 warnings, No Solution). Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
215      const extractIndexedOptions = (it: ServiceField): OptionItem[] => {
216          const options: OptionItem[] = [];
217
218          for (let i = 1; i <= 100; i += 1) {
219              const valueKey = `@value${i}` as keyof ServiceField;
220              const textKey = `@text${i}` as keyof ServiceField;
221
222              const optionValue = it[valueKey] ?? (it[`value${i}` as keyof ServiceField] as unknown);
223              const optionLabel = it[textKey] ?? (it[`text${i}` as keyof ServiceField] as unknown);
224
225              // Stop iteration if both are missing
226              if (!optionValue && !optionLabel) {
227                  break;
228              }
229
230              options.push({
231                  value: String(optionValue ?? ''),
232                  label: String(optionLabel ?? optionValue ?? ''),
233              });
234          }
235          return options;


========== IMG_3864.md ==========
---
photo: IMG_3864.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,214,219-243 (approximate, see notes)
orientation: 180
confidence: low
notes: SEVERE motion-blur/double-exposure ghosting throughout (same as IMG_3859/3863) — every line/gutter number doubled. Sticky headers show line 127 (export const normalizeServiceConfig = () and a second sticky (const extractIndexedOptions = (it: ServiceField): OptionItem[] => {) whose digits were ambiguous in this photo but confirmed as line 214 via the sharp, unambiguous sticky header in IMG_3865. Absolute line numbers in the body of this photo carry +/-1 uncertainty (see IMG_3861/3862/3863 notes for the cross-validation conflict) — IMG_3865 (clean, no ghosting) shows this function's "return options;" at line 235 and closing "};" at 236, one higher than a naive statement-count from 214 would predict, implying one extra line (unresolved) somewhere in the 215-234 span not pinned down by any single clean photo. Content for lines up to ~233 duplicates IMG_3862/IMG_3863 (cross-checked). New confirmed content: the function closes (return options; then closing brace), then normalizeServiceConfig's final return statement begins — return (serviceArray.filter((it) => {...}).map(toControlType-based normalization)). Explorer sidebar/tab bar/status bar unchanged (utils folder, same file list, single tab, branch hitanshu/experimental*, 3 errors/0 warnings, No Solution). Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
214      const extractIndexedOptions = (it: ServiceField): OptionItem[] => {
219              const valueKey = `@value${i}` as keyof ServiceField;
220              const textKey = `@text${i}` as keyof ServiceField;
221
222              const optionValue = it[valueKey] ?? (it[`value${i}` as keyof ServiceField] as unknown);
223              const optionLabel = it[textKey] ?? (it[`text${i}` as keyof ServiceField] as unknown);
224
225              // Stop iteration if both are missing
226              if (!optionValue && !optionLabel) {
227                  break;
228              }
229
230              options.push({
231                  value: String(optionValue ?? ''),
232                  label: String(optionLabel ?? optionValue ?? ''),
233              });
234          }
235          return options;
236      };
237
238      return (
239          serviceArray
240              // Filter out fields without control types
241              .filter((it) => {
242                  const ctrlType = getProp<string>(it, 'controltype');
243                  const normalized = toControlType(⟪continues off-screen⟫


========== IMG_3865.md ==========
---
photo: IMG_3865.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,214,235-259 (+/-1, see notes)
orientation: 180
confidence: medium
notes: Mostly sharp capture with light ghosting (faint duplicate text offset by ~1-2 rows in places, less severe than IMG_3863/3864). Sticky headers show line 127 (export const normalizeServiceConfig = () and line 214 (const extractIndexedOptions = (it: ServiceField): OptionItem[] => {) — this second sticky number is clearly legible here (high confidence), and is the best anchor available across this whole photo run. Absolute line numbers for the body content below carry +/-1 uncertainty: a targeted zoom on lines "ctrlType,/getProp.../flag(...)" suggested those rows could be one number higher (245-247) than the holistic read used here (244-246) — this kind of +/-1 drift recurred across IMG_3861/3862/3863/3864 in this same file/session, likely camera-perspective skew between the gutter and indented code text; the CODE CONTENT itself is legible and not in doubt, only exact line numbers. Content: end of extractIndexedOptions (return + close), then normalizeServiceConfig's final return — serviceArray.filter(...).map((it): NormalizedField => {...}) doing control-type normalization, with indexed-options-first / coerceOptions-fallback logic beginning. Explorer sidebar/tab bar/status bar unchanged (utils folder, same file list, single tab, branch hitanshu/experimental*, 3 errors/0 warnings, No Solution). Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
214      const extractIndexedOptions = (it: ServiceField): OptionItem[] => {
235          return options;
236      };
237
238      return (
239          serviceArray
240              // Filter out fields without control types
241              .filter((it) => {
242                  const ctrlType = getProp<string>(it, 'controltype');
243                  const normalized = toControlType(
244                      ctrlType,
245                      getProp<string>(it, 'type'),
246                      flag(getProp<string | number>(it, 'iscalendar')),
247                  );
248                  return normalized !== undefined;
249              })
250              .map((it): NormalizedField => {
251                  const rawControlType = getProp<string>(it, 'controltype');
252                  const rawType = getProp<string>(it, 'type');
253                  const checkCalender = flag(getProp<string | number>(it, 'iscalendar'));
254                  const controlType =
255                      toControlType(rawControlType, rawType, checkCalender) ?? 'textbox';
256
257                  // Try indexed options first (for radio/select with @text1/@value1 format)
258                  let options = extractIndexedOptions(it);
259                  // Fall back to coerceOptions if indexed options not found


========== IMG_3866.md ==========
---
photo: IMG_3866.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,239-263 (approximate, see notes)
orientation: 180
confidence: low
notes: SEVERE motion-blur/double-exposure ghosting throughout (same as IMG_3863/3864) — every line doubled/overlapping, gutter numbers hard to align precisely. Sticky header shows only line 127 (export const normalizeServiceConfig = (); the second sticky ("filter((it) => {") is illegible/garbled by the blur. Content for lines up to ~259 duplicates IMG_3865 (cross-checked, that photo is the higher-confidence source for that range). New content beyond IMG_3865: the coerceOptions fallback block (if options.length === 0, reassign via coerceOptions(it)) and the start of a rawWidth extraction (getProp for 'ctrlwidth') — this if-block appeared duplicated in the blended layers (twice in a row) which is a ghosting artifact, not real duplicate code; transcribed once here. Explorer sidebar/tab bar/status bar unchanged (utils folder, same file list, single tab, branch hitanshu/experimental*, 3 errors/0 warnings, No Solution). Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
239          serviceArray
240              // Filter out fields without control types
241              .filter((it) => {
242                  const ctrlType = getProp<string>(it, 'controltype');
243                  const normalized = toControlType(
244                      ctrlType,
245                      getProp<string>(it, 'type'),
246                      flag(getProp<string | number>(it, 'iscalendar')),
247                  );
248                  return normalized !== undefined;
249              })
250              .map((it): NormalizedField => {
251                  const rawControlType = getProp<string>(it, 'controltype');
252                  const rawType = getProp<string>(it, 'type');
253                  const checkCalender = flag(getProp<string | number>(it, 'iscalendar'));
254                  const controlType =
255                      toControlType(rawControlType, rawType, checkCalender) ?? 'textbox';
256
257                  // Try indexed options first (for radio/select with @text1/@value1 format)
258                  let options = extractIndexedOptions(it);
259                  // Fall back to coerceOptions if indexed options not found
260                  if (options.length === 0) {
261                      options = coerceOptions(it);
262                  }
263                  const rawWidth = getProp<string | number>(it, 'ctrlwidth');


========== IMG_3867.md ==========
---
photo: IMG_3867.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250-275 (approximate, see notes)
orientation: 180
confidence: medium
notes: Upper portion (250-257ish) has light ghosting/double-exposure (faint offset duplicate), lower portion (258-275) is clean and sharp. Sticky header shows only line 127 (export const normalizeServiceConfig = (); a second sticky area is present but garbled/illegible (ghosted ".map((it): NormalizedField => {" text bleeding into the sticky region). Line numbers here are off by roughly 1 from IMG_3866's reading for the same statements (e.g. "Fall back to coerceOptions" comment read as 259 in IMG_3866 vs 260 here) — consistent with the recurring +/-1 camera-skew ambiguity noted throughout this photo run; code content is clear regardless. New content beyond IMG_3866: control-type normalization continues into width parsing (ctrlwidth -> widthNum) and default-value resolution setup (rawDefault, rawValue, and the start of a default-value-by-type branch). Explorer sidebar/tab bar/status bar unchanged (utils folder, same file list, single tab, branch hitanshu/experimental*, 3 errors/0 warnings, No Solution). Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
250              .map((it): NormalizedField => {
251                  const rawControlType = getProp<string>(it, 'controltype');
252                  const rawType = getProp<string>(it, 'type');
253                  const checkCalender = flag(getProp<string | number>(it, 'iscalendar'));
254                  const controlType =
255                      toControlType(rawControlType, rawType, checkCalender) ?? 'textbox';
256
257                  // Try indexed options first (for radio/select with @text1/@value1 format)
258                  let options = extractIndexedOptions(it);
259                  // Fall back to coerceOptions if indexed options not found
260                  if (options.length === 0) {
261                      options = coerceOptions(it);
262                  }
263
264                  const rawWidth = getProp<string | number>(it, 'ctrlwidth');
265                  const widthNum =
266                      rawWidth !== undefined && rawWidth !== null ? Number(rawWidth) : undefined;
267
268                  const rawDefault = getProp<string | boolean>(it, 'default');
269                  const rawValue = it.value;
270
271                  // Determine default value with priority: @default > @value > empty
272                  // Important: Respect explicit @default even if empty (don't fall back to @text)
273                  let defaultValueForType: string | boolean;
274                  if (controlType === 'checkbox') {


========== IMG_3868.md ==========
---
photo: IMG_3868.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250,273-283 (approximate, see notes)
orientation: 180
confidence: low
notes: SEVERE motion-blur/double-exposure ghosting throughout (same as IMG_3863/3864/3866) — every line doubled with an offset duplicate, gutter numbers hard to pin precisely (this photo's numbering runs ~2 lower than IMG_3867's for the same statements, consistent with the recurring +/-1-2 camera-skew drift noted throughout this run; code content is clear and not in doubt). Sticky headers show line 127 (export const normalizeServiceConfig = () and line 250 (.map((it): NormalizedField => {). Content is default-value resolution logic inside the map callback: checkbox branch (Boolean(it.checked)), then start of the select/combo branch which treats purely-numeric @default strings as "no selection" (list index) rather than an actual value. Last line is cut off at the very bottom edge of the editor pane / Problems bar. Explorer sidebar/tab bar/status bar unchanged (utils folder, same file list, single tab, branch hitanshu/experimental*, 3 errors/0 warnings, No Solution). Taskbar clock 19:27, date 10-07-2026.
---
127  export const normalizeServiceConfig = (
250          .map((it): NormalizedField => {
273              // Important: Respect explicit @default even if empty (don't fall back to @text)
274              let defaultValueForType: string | boolean;
275              if (controlType === 'checkbox') {
276                  defaultValueForType = Boolean(it.checked ?? flag(rawDefault));
277              } else if (controlType === 'select') {
278                  // For SELECT/COMBO fields: treat numeric defaults as "no selection"
279                  // (they're typically list indices like "1", not actual values)
280                  if (typeof rawDefault === 'string' && rawDefault.trim() !== '') {
281                      // Check if it's purely numeric
282                      if (/^\d+$/.test(rawDefault.trim())) {
283                          // Numeric default (list index) -> treat as no selection ⟪cut off at bottom edge⟫


========== IMG_3869.md ==========
---
photo: IMG_3869.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/266-291
orientation: 180
confidence: medium
notes: Photo has a strong ghosting/double-exposure artifact (looks like the editor was mid smooth-scroll when captured) affecting lines ~266-274 — a faint duplicate of adjacent-line text is overlaid on the crisp text throughout that span, making exact reconstruction of line 266 uncertain (marked with ⟪?⟫). Lines 276-291 are clean/high confidence AND were cross-checked/corrected against IMG_3870 (same file, same region, no ghosting, taken moments later) which confirmed the true line numbers run one higher than the ghosting first suggested and clarified line ordering around 272-274. Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {". Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified, unsaved — orange tab text, dot indicator). Explorer sidebar (utils folder) shows: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (highlighted/selected), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026.
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

266   const ⟪?⟫ = rawWidth !== undefined && rawWidth !== null ? Number(rawWidth) : undefined;
267   (obscured by ghosting overlap — possibly blank)
268   (blank)
269   const rawDefault = getProp<string | boolean>(it, 'default');
270   const rawValue = it.value;
271   
272   // Determine default value with priority: @default > @value > empty
273   // Important: Respect explicit @default even if empty (don't fall back to @text)
274   let defaultValueForType: string | boolean;
275   
276   if (controlType === 'checkbox') {
277       defaultValueForType = Boolean(it.checked ?? flag(rawDefault));
278   } else if (controlType === 'select') {
279       // For SELECT/COMBO fields: treat numeric defaults as "no selection"
280       // (they're typically list indices like "1", not actual values)
281       if (typeof rawDefault === 'string' && rawDefault.trim() !== '') {
282           // Check if it's purely numeric
283           if (/^\d+$/.test(rawDefault.trim())) {
284               // Numeric default (list index) → treat as no selection
285               defaultValueForType = '';
286           } else {
287               // Non-numeric text → use as-is
288               defaultValueForType = rawDefault;
289           }
290       } else if (rawValue !== undefined) {
291           defaultValueForType = String(rawValue);


========== IMG_3870.md ==========
---
photo: IMG_3870.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/271-297
orientation: 180
confidence: high
notes: Clean photo, no ghosting/motion blur (unlike IMG_3869 of the same file/region). Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {"; these occlude the top edge of line 271, whose content could not be confidently read. This photo's clean gutter numbers were used to correct the line numbering in IMG_3869's transcript (which had a ghosting artifact). Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified/unsaved, orange tab text + dot indicator). Explorer sidebar (utils folder) shows: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (highlighted/selected), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026 (one minute after IMG_3869).
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

271   (obscured by sticky header overlay — not confidently legible, possibly blank)
272       // Determine default value with priority: @default > @value > empty
273       // Important: Respect explicit @default even if empty (don't fall back to @text)
274       let defaultValueForType: string | boolean;
275   
276       if (controlType === 'checkbox') {
277           defaultValueForType = Boolean(it.checked ?? flag(rawDefault));
278       } else if (controlType === 'select') {
279           // For SELECT/COMBO fields: treat numeric defaults as "no selection"
280           // (they're typically list indices like "1", not actual values)
281           if (typeof rawDefault === 'string' && rawDefault.trim() !== '') {
282               // Check if it's purely numeric
283               if (/^\d+$/.test(rawDefault.trim())) {
284                   // Numeric default (list index) → treat as no selection
285                   defaultValueForType = '';
286               } else {
287                   // Non-numeric text → use as-is
288                   defaultValueForType = rawDefault;
289               }
290           } else if (rawValue !== undefined) {
291               defaultValueForType = String(rawValue);
292           } else {
293               defaultValueForType = '';
294           }
295       } else {
296           // For other controls, prioritize @default if explicitly set
297           if (typeof rawDefault === 'string') {


========== IMG_3871.md ==========
---
photo: IMG_3871.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/279-305
orientation: 180
confidence: high
notes: Clean photo, no ghosting. Continues scrolling down from IMG_3870 (same file/tab; the 296/297 lines overlap and match exactly between the two photos, confirming numbering). Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {"; line 279 itself is fully obscured by the sticky header overlay (not transcribed — per IMG_3870 it is almost certainly "// For SELECT/COMBO fields: treat numeric defaults as "no selection""). Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified/unsaved). Explorer sidebar (utils folder) unchanged from prior photos: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (highlighted/selected), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026.
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

279   (obscured by sticky header overlay — not legible)
280       // (they're typically list indices like "1", not actual values)
281       if (typeof rawDefault === 'string' && rawDefault.trim() !== '') {
282           // Check if it's purely numeric
283           if (/^\d+$/.test(rawDefault.trim())) {
284               // Numeric default (list index) → treat as no selection
285               defaultValueForType = '';
286           } else {
287               // Non-numeric text → use as-is
288               defaultValueForType = rawDefault;
289           }
290       } else if (rawValue !== undefined) {
291           defaultValueForType = String(rawValue);
292       } else {
293           defaultValueForType = '';
294       }
295   } else {
296       // For other controls, prioritize @default if explicitly set
297       if (typeof rawDefault === 'string') {
298           // @default is explicitly set (even if empty string)
299           defaultValueForType = rawDefault;
300       } else if (rawValue !== undefined) {
301           // If no @default, use @value if available
302           defaultValueForType = String(rawValue);
303       } else {
304           // Otherwise default to empty string
305           defaultValueForType = '';


========== IMG_3872.md ==========
---
photo: IMG_3872.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/295-324 (approx; see notes)
orientation: 180
confidence: medium
notes: Photo has a strong ghosting/double-exposure artifact — two scroll positions offset by ~3 lines are blended throughout the frame (both the code text and the gutter numbers show doubled/overlapping glyphs). Lines ~295-305 duplicate content already captured cleanly in IMG_3871 (kept here only for continuity, not re-verified independently). Lines 306-324 line numbers below are taken from IMG_3874, a fully clean/unambiguous photo of this same declaration block taken moments later, which is the reliable ground truth (content itself was already legible here despite the ghosting; only exact line numbers were corrected — twice, since an intermediate cross-check against IMG_3873 undershot by one line). Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {". Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified/unsaved). Explorer sidebar (utils folder) unchanged: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (highlighted/selected), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026.
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

295   (see IMG_3871 for reliable transcription of lines 295-305: "} else {" ... "defaultValueForType = '';")
303       } else {
304           // Otherwise default to empty string
305           defaultValueForType = '';
306       }
307   
308       (obscured by ghosting — likely "}" closing the outer else block; see IMG_3874/IMG_3873 notes)
309       const rawMatchcode = getProp<string>(it, 'matchcode');
310       const rawLabel = getProp<string>(it, 'ctrllabel');
311       const rawRequired = getProp<string | boolean | number>(it, 'required');
312       const rawDisabled = getProp<string>(it, 'disabled');
313       const rawVisible = getProp<string>(it, 'visible');
314       const rawTabIndex = getProp<string | number>(it, 'tabindex');
315       const rawMaxLength = getProp<string | number>(it, 'maxlength');
316       const rawUtpOrder = getProp<string | number>(it, 'utporder');
317       const rawLeft = getProp<string | number>(it, 'left');
318       const rawTop = getProp<string | number>(it, 'top');
319       const isCalendar = getProp<string | number>(it, 'iscalendar');
320       const rawLimitToList = getProp<string>(it, 'limittolist');
321   
322       // Check if original controlType was numeric
323       const originalControlType = normalizeKey(rawControlType);


========== IMG_3873.md ==========
---
photo: IMG_3873.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/304-323
orientation: 180
confidence: medium
notes: Ghosting/double-exposure artifact affects the upper part of the visible range (roughly 296-310) — content of the getProp declarations is clearly legible but exact line numbers in that band were initially miscounted and were corrected using IMG_3874 (a fully clean/unambiguous photo of this same declaration block) as ground truth. Lines 311-323 are completely clean/high confidence (read directly, no ghosting). Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {". Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified/unsaved). Explorer sidebar (utils folder) unchanged. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026.
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

304-308   (ghosted/overlapping — closing braces for the preceding if/else-if/else chain and its enclosing else block; exact per-line placement not confidently legible, content is "}" x2 plus possibly a blank line)
309       const rawMatchcode = getProp<string>(it, 'matchcode');
310       const rawLabel = getProp<string>(it, 'ctrllabel');
311       const rawRequired = getProp<string | boolean | number>(it, 'required');
312       const rawDisabled = getProp<string>(it, 'disabled');
313       const rawVisible = getProp<string>(it, 'visible');
314       const rawTabIndex = getProp<string | number>(it, 'tabindex');
315       const rawMaxLength = getProp<string | number>(it, 'maxlength');
316       const rawUtpOrder = getProp<string | number>(it, 'utporder');
317       const rawLeft = getProp<string | number>(it, 'left');
318       const rawTop = getProp<string | number>(it, 'top');
319       const isCalendar = getProp<string | number>(it, 'iscalendar');
320       const rawLimitToList = getProp<string>(it, 'limittolist');
321   
322       // Check if original controlType was numeric
323       const originalControlType = normalizeKey(rawControlType);


========== IMG_3874.md ==========
---
photo: IMG_3874.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/309-334
orientation: 180
confidence: high
notes: Clean photo, no ghosting. This is the reliable ground-truth photo used to correct line numbering in IMG_3872 and IMG_3873 (same declaration block, photographed moments apart). Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {"; a stray "308" gutter number is visible cut off at the very top edge (obscured by sticky header), not transcribed. Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified/unsaved). Explorer sidebar (utils folder) unchanged from prior photos. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026.
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

309       const rawMatchcode = getProp<string>(it, 'matchcode');
310       const rawLabel = getProp<string>(it, 'ctrllabel');
311       const rawRequired = getProp<string | boolean | number>(it, 'required');
312       const rawDisabled = getProp<string>(it, 'disabled');
313       const rawVisible = getProp<string>(it, 'visible');
314       const rawTabIndex = getProp<string | number>(it, 'tabindex');
315       const rawMaxLength = getProp<string | number>(it, 'maxlength');
316       const rawUtpOrder = getProp<string | number>(it, 'utporder');
317       const rawLeft = getProp<string | number>(it, 'left');
318       const rawTop = getProp<string | number>(it, 'top');
319       const isCalendar = getProp<string | number>(it, 'iscalendar');
320       const rawLimitToList = getProp<string>(it, 'limittolist');
321   
322       // Check if original controlType was numeric
323       const originalControlType = normalizeKey(rawControlType);
324       const isNumericType = ['numeric', 'number', 'integer'].includes(
325           originalControlType,
326       );
327   
328       // For SELECT fields with numeric defaults, don't use placeholder
329       // (numeric defaults are list indices, not field values)
330       let placeholder = '';
331       if (
332           typeof rawDefault === 'string' &&
333           !(controlType === 'select' && /^\d+$/.test(rawDefault.trim()))
334       ) {


========== IMG_3875.md ==========
---
photo: IMG_3875.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/317-341
orientation: 180
confidence: medium
notes: Lines 317-334 are clean/high confidence and cross-validated exactly against IMG_3874 (same declarations, matching line numbers). A stray sticky-scroll bleed artifact makes ".map((it): NormalizedField => {" appear to repeat next to gutter "316" just above the real content (not transcribed as a separate line — it is the line-250 sticky header bleeding down). Lines 335-341 have a ghosting/double-exposure artifact (offset ~3 lines) reconstructed from the crisper glyph of each overlapping pair; a ghost echo of "utporder: Number(rawUtpOrder ?? 0)," reappears faintly right after line 341 (likely bleed-through of line 338, not real duplicate code) and was not transcribed as a new line. Return object properties continue past line 341 off the bottom of the frame (cut off by taskbar). Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {". Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified/unsaved). Explorer sidebar (utils folder) unchanged. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026.
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

317       const rawLeft = getProp<string | number>(it, 'left');
318       const rawTop = getProp<string | number>(it, 'top');
319       const isCalendar = getProp<string | number>(it, 'iscalendar');
320       const rawLimitToList = getProp<string>(it, 'limittolist');
321   
322       // Check if original controlType was numeric
323       const originalControlType = normalizeKey(rawControlType);
324       const isNumericType = ['numeric', 'number', 'integer'].includes(
325           originalControlType,
326       );
327   
328       // For SELECT fields with numeric defaults, don't use placeholder
329       // (numeric defaults are list indices, not field values)
330       let placeholder = '';
331       if (
332           typeof rawDefault === 'string' &&
333           !(controlType === 'select' && /^\d+$/.test(rawDefault.trim()))
334       ) {
335           placeholder = rawDefault;
336       }
337   
338       return {
339           utporder: Number(rawUtpOrder ?? 0),
340           matchcode: rawMatchcode || it.id || randomKey(),
341           label: rawLabel || it.label || 'Field',


========== IMG_3876.md ==========
---
photo: IMG_3876.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/322-347 (approx, effectively 338-347 new; see notes)
orientation: 180
confidence: medium
notes: Strong ghosting/double-exposure artifact (offset ~3 lines) throughout, same pattern as other photos in this set. Lines ~322-337 duplicate content already captured cleanly in IMG_3874/IMG_3875 (kept here only for continuity, not re-verified independently). Lines 338-347 are new content, reconstructed by taking the crisper glyph of each overlapping pair; cross-checked internally by identifying the consistent 3-line ghost offset (e.g. "disabled:" ghosting into the "width:" row). Return-object property order confirmed: utporder, matchcode, label, controlType, required, disabled, visible, tabIndex, width(cut off). Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {". Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified/unsaved). Explorer sidebar (utils folder) unchanged. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026.
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

322   (see IMG_3874/IMG_3875 for reliable transcription of lines 322-337, incl. line 336 "}" and line 338 "return {")
338       return {
339           utporder: Number(rawUtpOrder ?? 0),
340           matchcode: rawMatchcode || it.id || randomKey(),
341           label: rawLabel || it.label || 'Field',
342           controlType,
343           required: flag(rawRequired),
344           disabled: flag(rawDisabled),
345           visible: rawVisible !== undefined ? flag(rawVisible, true) : true,
346           tabIndex: Number(rawTabIndex ?? 0),
347           width: widthNum ?? 320,


========== IMG_3877.md ==========
---
photo: IMG_3877.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/331-356
orientation: 180
confidence: high
notes: Mostly clean photo; a faint ghosting/double-exposure echo (offset ~3 lines) is visible. Line numbers below were corrected (shifted -1 throughout) after cross-checking against IMG_3876, IMG_3875 and IMG_3878, which all agree with each other on this declaration block (e.g. "label: rawLabel || it.label || 'Field'," = line 341) — the original reading of this photo's own gutter was off by one, likely due to the ghosting. Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {". Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified/unsaved). Explorer sidebar (utils folder) unchanged. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026.
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

331       if (
332           typeof rawDefault === 'string' &&
333           !(controlType === 'select' && /^\d+$/.test(rawDefault.trim()))
334       ) {
335           placeholder = rawDefault;
336       }
337   
338       return {
339           utporder: Number(rawUtpOrder ?? 0),
340           matchcode: rawMatchcode || it.id || randomKey(),
341           label: rawLabel || it.label || 'Field',
342           controlType,
343           required: flag(rawRequired),
344           disabled: flag(rawDisabled),
345           visible: rawVisible !== undefined ? flag(rawVisible, true) : true,
346           tabIndex: Number(rawTabIndex ?? 0),
347           width: widthNum ?? 320,
348           placeholder,
349           options,
350           iscalendar: flag(isCalendar),
351           defaultValue: defaultValueForType,
352           maxLength: rawMaxLength !== undefined ? Number(rawMaxLength) : undefined,
353           // LimitToList: "T" means strict list, anything else (or absent) means free-text combo
354           limitToList: rawLimitToList !== undefined ? flag(rawLimitToList) : undefined,
355           // Yellow highlight for select/combo fields with LimitToList ≠ "T"
356           // Legacy AQS: combo + LTL=F → bright yellow ■ #FFFF00


========== IMG_3878.md ==========
---
photo: IMG_3878.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/341-364
orientation: 180
confidence: high
notes: Lines 341-356 are clean/high confidence and were used to correct an off-by-one error found in IMG_3877's transcript (cross-validated: "label: rawLabel || it.label || 'Field'," = line 341 here too). Lines 357-364 originally had a ghosting artifact and were reconstructed with an estimated (and, it turned out, off-by-one) numbering; they have since been corrected to match IMG_3880, a fully clean photo of the same declarations taken moments later, which is authoritative. Content revealed a "highlight"/"highlightColor"/"highlightBorderColor" object literal that flags SELECT/combo fields lacking a strict limitToList with a yellow highlight (#FFFF00), continuing the "legacy AQS yellow highlight" comment thread. Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {". Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified/unsaved). Explorer sidebar (utils folder) unchanged. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026.
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

341           label: rawLabel || it.label || 'Field',
342           controlType,
343           required: flag(rawRequired),
344           disabled: flag(rawDisabled),
345           visible: rawVisible !== undefined ? flag(rawVisible, true) : true,
346           tabIndex: Number(rawTabIndex ?? 0),
347           width: widthNum ?? 320,
348           placeholder,
349           options,
350           iscalendar: flag(isCalendar),
351           defaultValue: defaultValueForType,
352           maxLength: rawMaxLength !== undefined ? Number(rawMaxLength) : undefined,
353           // LimitToList: "T" means strict list, anything else (or absent) means free-text combo
354           limitToList: rawLimitToList !== undefined ? flag(rawLimitToList) : undefined,
355   
356           // Yellow highlight for select/combo fields with LimitToList ≠ "T"
357           // Legacy AQS: combo + LTL=F → bright yellow ■ #FFFF00
358           // When @limittolist is absent on a combo, it defaults to LTL=F → yellow
359           highlight:
360               flag(it.highlight) || (controlType === 'select' && !flag(rawLimitToList)),
361           highlightColor:
362               it.highlightColor ??
363               (controlType === 'select' && !flag(rawLimitToList) ? '#FFFF00' : undefined),
364           highlightBorderColor: it.highlightBorderColor,


========== IMG_3879.md ==========
---
photo: IMG_3879.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/345-370
orientation: 180
confidence: high
notes: Strong ghosting/double-exposure artifact (offset ~3 lines) throughout most of the frame made initial line numbering unreliable. Lines 345-363 duplicate content already captured in IMG_3876/IMG_3877/IMG_3878 (kept here only for continuity, not re-verified independently). Lines 364-370 content was legible directly from the crisp glyph layer but line numbers have now been corrected to match IMG_3880, a fully clean photo of the same declarations taken moments later, which is authoritative. Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {". Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified/unsaved). Explorer sidebar (utils folder) unchanged. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026.
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

345   (see IMG_3876/3877/3878 for reliable transcription of lines 345-363)
364           highlightBorderColor: it.highlightBorderColor,
365   
366           // date passthrough
367           dateFormat: it.dateFormat || 'MM/DD/YYYY',
368           minDate: it.minDate,
369           maxDate: it.maxDate,
370           isNumeric: isNumericType,


========== IMG_3880.md ==========
---
photo: IMG_3880.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 127,250 (sticky scroll)/349-373
orientation: 180
confidence: high
notes: Completely clean photo, no ghosting/motion blur anywhere in frame — the clearest of this whole run. Used as ground truth to correct off-by-one errors found in IMG_3878 (highlight/highlightColor block) and IMG_3879 (minDate/maxDate/dateFormat block). Line 373 "top: rawTop," is cut off by the taskbar at the very bottom edge (no gutter number visible, inferred from sequence). Sticky-scroll headers pinned at top: line 127 "export const normalizeServiceConfig = (" and line 250 ".map((it): NormalizedField => {". Breadcrumb: aqs-web-ui > src > utils > normalize-service-config copy.ts. Only one tab open: "normalize-service-config copy.ts" (modified/unsaved). Explorer sidebar (utils folder) unchanged: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (highlighted/selected), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Status bar: "web-ui", branch hitanshu/experimental*, 3 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 7:27 PM 7/10/2026. This is the last photo in the 3869-3880 batch.
---
127   export const normalizeServiceConfig = (
250       .map((it): NormalizedField => {

349           options,
350           iscalendar: flag(isCalendar),
351           defaultValue: defaultValueForType,
352           maxLength: rawMaxLength !== undefined ? Number(rawMaxLength) : undefined,
353           // LimitToList: "T" means strict list, anything else (or absent) means free-text combo
354           limitToList: rawLimitToList !== undefined ? flag(rawLimitToList) : undefined,
355   
356           // Yellow highlight for select/combo fields with LimitToList ≠ "T"
357           // Legacy AQS: combo + LTL=F → bright yellow ■ #FFFF00
358           // When @limittolist is absent on a combo, it defaults to LTL=F → yellow
359           highlight:
360               flag(it.highlight) || (controlType === 'select' && !flag(rawLimitToList)),
361           highlightColor:
362               it.highlightColor ??
363               (controlType === 'select' && !flag(rawLimitToList) ? '#FFFF00' : undefined),
364           highlightBorderColor: it.highlightBorderColor,
365   
366           // date passthrough
367           dateFormat: it.dateFormat || 'MM/DD/YYYY',
368           minDate: it.minDate,
369           maxDate: it.maxDate,
370           isNumeric: isNumericType,
371   
372           // positioning (top/left from API - px or % values)
373           top: rawTop,


========== IMG_3881.md ==========
---
photo: IMG_3881.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config copy.ts
lines: 358-380
orientation: 180
confidence: low
notes: >
  Photo exhibits heavy motion-blur/double-exposure: two overlapping scroll
  positions of the same file are visible, offset by roughly 5-6 lines
  (fainter ghost layer under the sharp/bold layer). Transcription below is
  the sharp/bold layer, which aligns with the gutter line numbers 358-380
  and forms coherent, syntactically valid TypeScript. Line 358 itself is
  obscured by the sticky-scroll header overlay and its content could not be
  read; left blank/marked. A fainter ghost comment overlapping lines
  ~359-367 partially reads "// when rawLimitToList is absent on a combo it
  defaults to CTL=F -> bright yellow" (low confidence, could not anchor to
  an exact line number, mark ⟪?⟫). Tab title (active): "normalize-service-config copy.ts"
  with a modified-dot indicator "1". Breadcrumb: aqs-web-ui > src > utils >
  normalize-service-config copy.ts. Sticky-scroll headers pinned at top show
  line 127 "export const normalizeServiceConfig = (" and line 250
  ".map((it): NormalizedField => {". Explorer sidebar (visible in this and
  most photos in this batch) lists utils/ folder contents: dynamic-form-actions.ts,
  error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts,
  frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts,
  logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts (1,
  highlighted/active here), normalize-service-config.ts, parse-combo-items.ts,
  parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Problems:
  3 errors, 0 warnings, "No Solution" indicator. Status bar: branch
  hitanshu/experimental*, TypeScript, UTF-8, CRLF, Tab Size 4.
---
127     export const normalizeServiceConfig = (
250         .map((it): NormalizedField => {
358     ⟪?⟫
359         highlight:
360             flag(it.highlight) || (controlType === 'select' && !flag(rawLimitToList)),
361         highlightColor:
362             it.highlightColor ??
363             (controlType === 'select' && !flag(rawLimitToList) ? '#FFFF00' : undefined),
364         highlightBorderColor:
365             it.highlightBorderColor ??
366             (controlType === 'select' && !flag(rawLimitToList) ? '#FFFF00' : undefined),
367         // date passthrough
368         dateFormat: it.dateFormat || 'MM/DD/YYYY',
369         minDate: it.minDate,
370         maxDate: it.maxDate,
371         isNumeric: isNumericType,
372         // positioning (top/left from API - px or % values)
373         top: rawTop,
374         left: rawLeft,
375         ctrlWidth: rawWidth,
376         // calls passthrough
377         calls: it.calls,
378     } satisfies NormalizedField;
379     });
380 };
