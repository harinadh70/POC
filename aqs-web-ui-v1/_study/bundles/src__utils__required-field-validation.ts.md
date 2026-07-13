# BUNDLE for src/utils/required-field-validation.ts
# 15 photo fragment(s), ascending start-line order.


========== IMG_4093.md ==========
---
photo: IMG_4093.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 1-27
orientation: 180
confidence: high
notes: Clean photo, no ghosting artifact. This is a NEW file (required-field-validation.ts) selected in Explorer sidebar, replacing pub-sub.ts as the open/highlighted file — first 27 lines shown, which is the whole visible viewport (top of file through the first import). Explorer sidebar (visible partially on left edge, cut off) shows same utils folder file list as IMG_4092. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings, TypeScript, Tab Size 4, UTF-8, CRLF.
---
1:  /**
2:   * Required Field Validation Utility
3:   * ------------------------------------
4:   * Mirrors the VBS `CheckRequiredIndicators` / `CheckSpecifiedIndicator` logic
5:   * from Main_ISLLSYS_20010101.vbs.
6:   *
7:   * Core rule:
8:   *   - Iterate every visible field that has  required === true  (equivalent to required="1").
9:   *   - A field "has a value" when its current value is a non-empty, non-whitespace string
10:  *     (for checkboxes, `true` counts as filled).
11:  *   - If ALL required+visible fields have a value  →  `allRequiredFilled = true`
12:  *   - If ANY required+visible field is empty       →  `allRequiredFilled = false`
13:  *
14:  * The returned object also carries a list of the labels (matchcodes) of the
15:  * offending controls so the caller can highlight / log them – exactly like the
16:  * VBS `strControlList` parameter.
17:  *
18:  * Usage (pure function – no React dependency):
19:  *   import { checkRequiredFields } from '@/utils/required-field-validation';
20:  *
21:  *   const result = checkRequiredFields(fields, currentValues);
22:  *   // result.allRequiredFilled   → boolean
23:  *   // result.missingFields       → { matchcode, label }[]
24:  */
25:
26: import type { NormalizedField, FormValues } from '@/types';
27:


========== IMG_4094.md ==========
---
photo: IMG_4094.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 5-27
orientation: 180
confidence: high
notes: Clean photo, no ghosting artifact. Same content as top of IMG_4093 (lines 5-27 overlap and are identical), confirming the JSDoc header block transcription. Explorer sidebar shows required-field-validation.ts highlighted, same utils folder file list as IMG_4092/4093. Tab bar/breadcrumb: aqs-web-ui > src > utils > required-field-validation.ts. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings, TypeScript, Tab Size 4, UTF-8, CRLF.
---
5:  * from Main_ISLLSYS_20010101.vbs.
6:  *
7:  * Core rule:
8:  *   - Iterate every visible field that has  required === true  (equivalent to required="1").
9:  *   - A field "has a value" when its current value is a non-empty, non-whitespace string
10: *     (for checkboxes, `true` counts as filled).
11: *   - If ALL required+visible fields have a value  →  `allRequiredFilled = true`
12: *   - If ANY required+visible field is empty       →  `allRequiredFilled = false`
13: *
14: * The returned object also carries a list of the labels (matchcodes) of the
15: * offending controls so the caller can highlight / log them – exactly like the
16: * VBS `strControlList` parameter.
17: *
18: * Usage (pure function – no React dependency):
19: *   import { checkRequiredFields } from '@/utils/required-field-validation';
20: *
21: *   const result = checkRequiredFields(fields, currentValues);
22: *   // result.allRequiredFilled   → boolean
23: *   // result.missingFields       → { matchcode, label }[]
24: */
25:
26: import type { NormalizedField, FormValues } from '@/types';
27:


========== IMG_4095.md ==========
---
photo: IMG_4095.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 21-43
orientation: 180
confidence: high
notes: Clean photo, no ghosting artifact. Lines 21-24, 26-27 overlap with IMG_4093/IMG_4094 and are identical. New content: lines 28-43 define the "Types" section — export interface RequiredFieldResult and export type ButtonDisableMap. Explorer sidebar shows required-field-validation.ts highlighted, same utils folder file list as prior photos. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings, TypeScript, Tab Size 4, UTF-8, CRLF.
---
21: *   const result = checkRequiredFields(fields, currentValues);
22: *   // result.allRequiredFilled   → boolean
23: *   // result.missingFields       → { matchcode, label }[]
24: */
25:
26: import type { NormalizedField, FormValues } from '@/types';
27:
28: // ------------------------------------------------------------------------
29: // Types
30: // ------------------------------------------------------------------------
31:
32: export interface RequiredFieldResult {
33:     /** `true` when every visible+required field has a non-empty value */
34:     allRequiredFilled: boolean;
35:     /** List of fields that are required+visible but currently empty */
36:     missingFields: { matchcode: string; label: string }[];
37: }
38:
39: /**
40:  * Describes which buttons should be auto-disabled based on required-field
41:  * validation. Keys are upper-cased matchcodes (e.g. "OK", "NEXT").
42:  */
43: export type ButtonDisableMap = Record<string, { disabled: boolean }>;


========== IMG_4096.md ==========
---
photo: IMG_4096.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 45-67
orientation: 180
confidence: high
notes: Double-exposure/ghosting artifact present (faint duplicate of nearby rows, offset ~7-8 rows, bleeding in behind sharp/bold text) — bold copy transcribed. No sticky-scroll header visible at top (module-scope code, no enclosing function until line 59). Explorer sidebar shows required-field-validation.ts highlighted, same utils folder file list as prior photos. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings, TypeScript, Tab Size 4, UTF-8, CRLF.
---
45: // ------------------------------------------------------------------------
46: // Core validation (pure, framework-agnostic)
47: // ------------------------------------------------------------------------
48:
49: /**
50:  * Check whether every required + visible field contains a value.
51:  *
52:  * Mirrors VBS `CheckSpecifiedIndicator(... , "required", "1", ...)`.
53:  *
54:  * @param fields       Normalized field definitions (from API / normalizeServiceConfig)
55:  * @param values       Current form values keyed by matchcode
56:  * @param fieldMeta    Optional runtime overrides for `disabled` / `visible`
57:  *                     (same shape as PolicyFormFieldMeta in dashboard.tsx)
58:  */
59: export function checkRequiredFields(
60:     fields: ReadonlyArray<
61:         Pick<NormalizedField, 'matchcode' | 'label' | 'required' | 'visible' | 'controlType'>
62:     >,
63:     values: FormValues,
64:     fieldMeta?: Record<string, { disabled?: boolean; visible?: boolean }>,
65: ): RequiredFieldResult {
66:     const missingFields: RequiredFieldResult['missingFields'] = [];
67:     ⟪?⟫ (cut off at bottom of viewport, continues in IMG_4097)


========== IMG_4097.md ==========
---
photo: IMG_4097.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 52-72
orientation: 180
confidence: high
notes: Double-exposure/ghosting artifact present (faint duplicate of nearby rows, offset ~7-8 rows, bleeding in behind sharp/bold text) — bold copy transcribed. Lines 52-66 overlap with IMG_4096 and are identical, confirming the checkRequiredFields function signature. New content: lines 67-72 begin the function body (for loop over fields, resolving runtime visibility override, filtering to visible+required fields). Line 73 is barely visible at the very bottom edge of the viewport, mostly cut off ("const value = values[field.matchcode]..." partially legible) — not transcribed with confidence. Explorer sidebar shows required-field-validation.ts highlighted, same utils folder file list as prior photos. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings, TypeScript, Tab Size 4, UTF-8, CRLF.
---
52:  * Mirrors VBS `CheckSpecifiedIndicator(... , "required", "1", ...)`.
53:  *
54:  * @param fields       Normalized field definitions (from API / normalizeServiceConfig)
55:  * @param values       Current form values keyed by matchcode
56:  * @param fieldMeta    Optional runtime overrides for `disabled` / `visible`
57:  *                     (same shape as PolicyFormFieldMeta in dashboard.tsx)
58:  */
59: export function checkRequiredFields(
60:     fields: ReadonlyArray<
61:         Pick<NormalizedField, 'matchcode' | 'label' | 'required' | 'visible' | 'controlType'>
62:     >,
63:     values: FormValues,
64:     fieldMeta?: Record<string, { disabled?: boolean; visible?: boolean }>,
65: ): RequiredFieldResult {
66:     const missingFields: RequiredFieldResult['missingFields'] = [];
67:     for (const field of fields) {
68:         // Resolve runtime visibility override (if any)
69:         const isVisible = fieldMeta?.[field.matchcode]?.visible ?? field.visible ?? true;
70:
71:         // Only validate visible + required fields (matches VBS: visible="T" AND required="1")
72:         if (!field.required || !isVisible) continue;


========== IMG_4098.md ==========
---
photo: IMG_4098.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 59-90
orientation: 180
confidence: low
notes: Photo has a strong motion-blur/double-exposure artifact (likely camera shake or a sticky-scroll transition caught mid-animation) — most rows show a bright/sharp line of text overlapping a fainter, grayer "ghost" duplicate of a nearby line, offset by a few rows. The left gutter itself is consecutive and legible (59, then 65 through 90 — lines 60-64 are the scrolled-out/sticky-scroll parameter list). Blank-line placement for lines 67, 71, 74, 76, 78, 83 is inferred from code structure/spacing, not directly confirmed — marked uncertain. Function signature params (lines 60-64) only partially legible via ghost text: "values: FormValues," and "fieldMeta?: Record<string, { disabled?: boolean; visible?: boolean }>," — exact line numbers within 60-64 and any other params (e.g. a `fields` param) not confirmed, marked ⟪?⟫. Explorer sidebar (src/utils) visible with many files: normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts (selected/highlighted), session-storage.ts, session-sync.ts, transform-pagebuild-respon....ts, url-helpers.ts, user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts (cut off). Tab bar shows only "required-field-validation.ts" open. Status bar: branch "hitanshu/experimental*", "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4.
---
59	export function checkRequiredFields(
⟪?⟫	  ⟪?⟫ (param list, partially visible via ghost text: "values: FormValues," ... "fieldMeta?: Record<string, { disabled?: boolean; visible?: boolean }>,")
65	): RequiredFieldResult {
66	  const missingFields: RequiredFieldResult['missingFields'] = [];
67	  ⟪?⟫ (likely blank line)
68	  for (const field of fields) {
69	    // Resolve runtime visibility override (if any)
70	    const isVisible = fieldMeta?.[field.matchcode]?.visible ?? field.visible ?? true;
71	    ⟪?⟫ (likely blank line)
72	    // Only validate visible + required fields (matches VBS: visible="T" AND required="1")
73	    if (!field.required || !isVisible) continue;
74	    ⟪?⟫ (likely blank line)
75	    const value = values[field.matchcode];
76	    ⟪?⟫ (likely blank line)
77	    const isFilled = isFieldFilled(value, field.controlType);
78	    ⟪?⟫ (likely blank line)
79	    if (!isFilled) {
80	      missingFields.push({ matchcode: field.matchcode, label: field.label });
81	    }
82	  }
83	  ⟪?⟫ (likely blank line)
84	  // ─ Debug: log required-field validation results ─────────
85	  const requiredFields = fields.filter((f) => {
86	    const vis = fieldMeta?.[f.matchcode]?.visible ?? f.visible ?? true;
87	    return f.required && vis;
88	  });
89	  console.group('%c[Required-Field Validation]', 'color: #1976d2; font-weight: bold');
90	  console.log(


========== IMG_4099.md ==========
---
photo: IMG_4099.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 59-92
orientation: 180
confidence: low
notes: Near-duplicate of IMG_4098 (same file/scroll position, taken moments apart) with the same motion-blur/double-exposure ghosting artifact — see IMG_4098 notes for lines 59-90 (identical content). This shot is very slightly further scrolled, revealing the start of the console.log(...) argument list at lines 91-92, though only as faint ghost text (low confidence): 'Required fields found:', and requiredFields.map((f) => f.matchcode),. Same Explorer sidebar (src/utils) and status bar (branch hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4) as IMG_4098.
---
(lines 59-90 identical to IMG_4098 — see that transcript)
91	  'Required fields found:',
92	  requiredFields.map((f) => f.matchcode),


========== IMG_4100.md ==========
---
photo: IMG_4100.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 59-111
orientation: 180
confidence: medium
notes: Same double-exposure/sticky-scroll ghosting artifact as IMG_4098/4099 (bright/sharp line overlapping a fainter offset duplicate of a nearby line), but text is more legible here. Line 59 "export function checkRequiredFields(" is a sticky-scroll header pinned at top; normal scroll content resumes at line 85. Line 86 (const vis = fieldMeta?.[f.matchcode]?.visible ?? f.visible ?? true;) only visible as ghost text between 85 and 87, consistent with IMG_4098/4099 — included with medium confidence. Explorer sidebar (src/utils) same file list as IMG_4098, required-field-validation.ts selected. Status bar: branch hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4.
---
59	export function checkRequiredFields(
85	  const requiredFields = fields.filter((f) => {
86	    const vis = fieldMeta?.[f.matchcode]?.visible ?? f.visible ?? true;
87	    return f.required && vis;
88	  });
89	  console.group('%c[Required-Field Validation]', 'color: #1976d2; font-weight: bold');
90	  console.log(
91	    'Required fields found:',
92	    requiredFields.map((f) => f.matchcode),
93	  );
94	  if (missingFields.length > 0) {
95	    console.warn(
96	      'Missing (not yet filled):',
97	      missingFields.map((f) => `${f.matchcode} (${f.label})`),
98	    );
99	  } else {
100	    console.log('%cAll required fields are filled ✓', 'color: green');
101	  }
102	  console.groupEnd();
103	  // ─ End debug ─────────────────────────────
104	
105	  return {
106	    allRequiredFilled: missingFields.length === 0,
107	    missingFields,
108	  };
109	}
110	
111	// ---------------------------------------------------------------


========== IMG_4101.md ==========
---
photo: IMG_4101.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 93-114
orientation: 180
confidence: high
notes: Much clearer/sharper than IMG_4098-4100 (little to no ghosting on this frame). Confirms lines 93-111 read cleanly, matching/validating IMG_4100's ghost-assisted transcription. Line 114 appears blank (nothing rendered yet below the "Button-state derivation" banner comment — likely start of next code section not shown). Explorer sidebar (src/utils, partially cut off on left edge) shows: ...vice-config.ts, ...-items.ts, ...l.ts, ...sions.ts, ...tring-params.ts, ...benchmarks.ts, ...monitor.ts, ...ore.ts, required-field-validation.ts (selected, highlighted blue), ...ge.ts, ...s, ...gebuild-respon....ts, ...ons.ts, ...sistence.ts, ...natter.ts (all left-truncated, consistent with normalize-service-config.ts, parse-combo-items.ts, url-helpers.ts, user-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, session-storage.ts, pub-sub.ts, transform-pagebuild-respon....ts, session-sync.ts?, xml-detail-persistence.ts, zod-error-formatter.ts — ordering differs slightly from earlier photos, likely alphabetical list same as before). Status bar: branch hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4.
---
93	  );
94	  if (missingFields.length > 0) {
95	    console.warn(
96	      'Missing (not yet filled):',
97	      missingFields.map((f) => `${f.matchcode} (${f.label})`),
98	    );
99	  } else {
100	    console.log('%cAll required fields are filled ✓', 'color: green');
101	  }
102	  console.groupEnd();
103	  // ─ End debug ─────────────────────────────
104	
105	  return {
106	    allRequiredFilled: missingFields.length === 0,
107	    missingFields,
108	  };
109	}
110	
111	// ---------------------------------------------------------------
112	// Button-state derivation
113	// ---------------------------------------------------------------
114	


========== IMG_4102.md ==========
---
photo: IMG_4102.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 107-127
orientation: 180
confidence: high
notes: Mild ghosting/double-exposure on lines ~115-127 (fainter duplicate of a few-lines-earlier text overlapping), same artifact as other photos in this batch, but primary text stays legible throughout. Explorer sidebar (src/utils, left-truncated) shows same file list as prior photos; required-field-validation.ts selected (highlighted blue). Status bar: branch hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4.
---
107	    missingFields,
108	  };
109	}
110	
111	// ---------------------------------------------------------------
112	// Button-state derivation
113	// ---------------------------------------------------------------
114	
115	/**
116	 * Compute a map of button disabled states driven by required-field validation.
117	 *
118	 * Mirrors the VBS logic in `CheckRequiredIndicators`:
119	 *   - If `allRequiredFilled` → enable OK and NEXT
120	 *   - Otherwise            → disable OK and NEXT
121	 *   - CANCEL is never auto-disabled by required-field logic.
122	 *
123	 * The map is keyed by the button matchcode in UPPER CASE (OK, NEXT, CANCEL, …).
124	 * Only buttons whose disabled state is *affected* by required-field validation
125	 * appear in the result. Additional buttons remain untouched.
126	 *
127	 * @param validationResult  Output of `checkRequiredFields`


========== IMG_4103.md ==========
---
photo: IMG_4103.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 123-143
orientation: 180
confidence: medium
notes: Heavier ghosting/double-exposure on lines 123-137 (JSDoc block) — a fainter duplicate of nearby lines overlaps almost every row, same artifact as elsewhere in this batch, but both bold and ghost layers were cross-checked against IMG_4102 (which shows 123-127 cleanly) to resolve the JSDoc text with confidence. Lines 138-143 (function body start) are comparatively cleaner/more legible. Line 141 assumed blank between const affectedSet and the for-loop (inferred from spacing/style, not fully certain). Explorer sidebar (src/utils, left-truncated) same file list as prior photos; required-field-validation.ts selected. Status bar: branch hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4.
---
123	 * The map is keyed by the button matchcode in UPPER CASE (OK, NEXT, CANCEL, …).
124	 * Only buttons whose disabled state is *affected* by required-field validation
125	 * appear in the result. Additional buttons remain untouched.
126	 *
127	 * @param validationResult  Output of `checkRequiredFields`
128	 * @param buttonMatchcodes  Array of button matchcodes present on the page
129	 *                          (e.g. ["OK", "CANCEL", "NEXT"])
130	 * @param buttonsAffected   Which buttons should be toggled by required validation.
131	 *
132	 *                          Defaults to `['OK', 'NEXT', 'OKSPECIAL']` — mirroring the VBS behaviour. (VBS: Case "DTAOK", "DTANEXT", "DTAOKSPECIAL")  [word-wrapped onto two visual rows, single source line 132]
133	 */
134	export function computeButtonDisableMap(
135	  validationResult: RequiredFieldResult,
136	  buttonMatchcodes: string[],
137	  buttonsAffected: string[] = ['OK', 'NEXT', 'OKSPECIAL'],
138	): ButtonDisableMap {
139	  const map: ButtonDisableMap = {};
140	  const affectedSet = new Set(buttonsAffected.map((b) => b.toUpperCase()));
141	
142	  for (const mc of buttonMatchcodes) {
143	    const upper = mc.toUpperCase();


========== IMG_4104.md ==========
---
photo: IMG_4104.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 125-146
orientation: 180
confidence: high
notes: Sharp/clean frame, minimal ghosting on lines 125-133 only (JSDoc), lines 134-146 fully clear with no artifact. Confirms/matches IMG_4102/4103 JSDoc reading. Explorer sidebar (src/utils, left-truncated) same file list as prior photos; required-field-validation.ts selected. Status bar: branch hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4.
---
125	 * appear in the result. Additional buttons remain untouched.
126	 *
127	 * @param validationResult  Output of `checkRequiredFields`
128	 * @param buttonMatchcodes  Array of button matchcodes present on the page
129	 *                          (e.g. ["OK", "CANCEL", "NEXT"])
130	 * @param buttonsAffected   Which buttons should be toggled by required validation.
131	 *
132	 *                          Defaults to `['OK', 'NEXT', 'OKSPECIAL']` — mirroring the VBS behaviour. (VBS: Case "DTAOK", "DTANEXT", "DTAOKSPECIAL")  [word-wrapped onto two visual rows, single source line 132]
133	 */
134	export function computeButtonDisableMap(
135	  validationResult: RequiredFieldResult,
136	  buttonMatchcodes: string[],
137	  buttonsAffected: string[] = ['OK', 'NEXT', 'OKSPECIAL'],
138	): ButtonDisableMap {
139	  const map: ButtonDisableMap = {};
140	  const affectedSet = new Set(buttonsAffected.map((b) => b.toUpperCase()));
141	
142	  for (const mc of buttonMatchcodes) {
143	    const upper = mc.toUpperCase();
144	    if (affectedSet.has(upper)) {
145	      map[upper] = { disabled: !validationResult.allRequiredFilled };
146	    }


========== IMG_4105.md ==========
---
photo: IMG_4105.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 137-161
orientation: 180
confidence: high
notes: Moderate double-exposure ghosting on lines 137-151 (fainter duplicate of a few-lines-earlier text overlapping each row), but text remains legible and cross-checked against IMG_4104's cleaner reading of 137-146. Lines 152-161 read cleanly with little/no ghosting. Explorer sidebar (src/utils, left-truncated) same file list as prior photos; required-field-validation.ts selected. Status bar: branch hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4.
---
137	  buttonsAffected: string[] = ['OK', 'NEXT', 'OKSPECIAL'],
138	): ButtonDisableMap {
139	  const map: ButtonDisableMap = {};
140	  const affectedSet = new Set(buttonsAffected.map((b) => b.toUpperCase()));
141	
142	  for (const mc of buttonMatchcodes) {
143	    const upper = mc.toUpperCase();
144	    if (affectedSet.has(upper)) {
145	      map[upper] = { disabled: !validationResult.allRequiredFilled };
146	    }
147	  }
148	
149	  return map;
150	}
151	
152	// ---------------------------------------------------------------
153	// Helpers
154	// ---------------------------------------------------------------
155	
156	/**
157	 * Determine whether a single field value counts as "filled".
158	 *
159	 * Mirrors the VBS per-tag-type checks inside `CheckSpecifiedIndicator`:
160	 *   - INPUT / TEXTAREA / COMBO / RADIOBUTTON  →  `Len(Trim(value)) > 0`
161	 *   - SELECT (dropdown)                       →  `selectedIndex <> -1`  (i.e. non-empty string)


========== IMG_4106.md ==========
---
photo: IMG_4106.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 156-180
orientation: 180
confidence: high
notes: Sharp, clean frame — no visible ghosting/double-exposure artifact. Confirms and extends the isFieldFilled JSDoc/function seen partially (upside-down, unrotated) in the raw capture. Explorer sidebar (src/utils, left-truncated) same file list as prior photos; required-field-validation.ts selected. Status bar: branch hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4.
---
156	/**
157	 * Determine whether a single field value counts as "filled".
158	 *
159	 * Mirrors the VBS per-tag-type checks inside `CheckSpecifiedIndicator`:
160	 *   - INPUT / TEXTAREA / COMBO / RADIOBUTTON  →  `Len(Trim(value)) > 0`
161	 *   - SELECT (dropdown)                       →  `selectedIndex <> -1`  (i.e. non-empty string)
162	 *   - CHECKBOX                                →  `true` counts as filled
163	 *   - DATE / CALENDAR                         →  valid non-empty date string
164	 */
165	function isFieldFilled(value: string | boolean | undefined | null, controlType?: string): boolean {
166	  if (value === undefined || value === null) return false;
167	
168	  // Checkbox: boolean true is "filled"
169	  if (controlType === 'checkbox') {
170	    return value === true;
171	  }
172	
173	  // Everything else: non-empty trimmed string
174	  if (typeof value === 'string') {
175	    return value.trim().length > 0;
176	  }
177	
178	  // Boolean true for non-checkbox controls still counts
179	  if (typeof value === 'boolean') {
180	    return value;


========== IMG_4107.md ==========
---
photo: IMG_4107.JPG
type: vscode-code
file: aqs-web-ui/src/utils/required-field-validation.ts
lines: 170-185
orientation: 180
confidence: high
notes: Sharp, clean frame — no ghosting artifact, matches/confirms IMG_4106's reading of 170-180. Function isFieldFilled ends at line 184 with a fallback `return false;`. Line 185 and below appear blank/empty in the editor viewport (nothing else visible on screen below) — likely end of file or a large blank gap; not confirmed which. Explorer sidebar (src/utils, left-truncated) same file list as prior photos; required-field-validation.ts selected. Status bar: branch hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4.
---
170	    return value === true;
171	  }
172	
173	  // Everything else: non-empty trimmed string
174	  if (typeof value === 'string') {
175	    return value.trim().length > 0;
176	  }
177	
178	  // Boolean true for non-checkbox controls still counts
179	  if (typeof value === 'boolean') {
180	    return value;
181	  }
182	
183	  return false;
184	}
185	⟪blank / end of visible content⟫
