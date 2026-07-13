# BUNDLE for src/hooks/use-page-form.ts
# 30 photo fragment(s), ascending start-line order.


========== IMG_2829.md ==========
---
photo: IMG_2829.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 1-34
orientation: 180
confidence: high
notes: Clean, sharp photo. Explorer sidebar shows aqs-web-ui/src tree: features > prp > utils; root > services > user-data.ts; root > utils > loader.ts, middleware.ts; hooks (expanded): use-action-guard.ts, use-browser-commands.ts, use-deferred-navigation.ts, use-form-commit.ts, use-page-form.ts (active tab, "9+" problems badge), use-required-field-validation....ts, use-smart-navigation.ts; then lib, pages, providers, services, types, utils, app.css. Tab bar shows only use-page-form.ts open. Status bar: branch hitanshu/experimental*, "No Solution", 29 errors / 0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8. This is a large JSDoc-style block comment at top of file documenting the hook's purpose/design. Line 34 cut off at bottom edge ("// Validation is driven by externalFields + externalValues" partially visible).
---
1	/**
2	 * usePageForm — ONE master hook for every AQS page component.
3	 * ─────────────────────────────────────────────
4	 * Consolidates ALL common boilerplate that was previously ~100+ lines
5	 * of hook calls inside each page component:
6	 *
7	 *
8	 *   Form state (values + fieldMeta)                          ← useReducer
9	 *   Button extraction from API controls                      ← memoized split
10	 *   Button state (runtime overrides via commands)             ← useReducer
11	 *   Browser-command processing on mount                       ← useEffect (once)
12	 *   Field normalization + runtime overlay                     ← two-stage memo
13	 *   Required-field validation → disable map                   ← useRequiredFieldValidation
14	 *   Computed (merged) final button states                     ← memoized merge
15	 *
16	 *
17	 * Usage in a page component:
18	 * ─────────────────────────
19	 *
20	 *   — Scenario A: Fully dynamic (component uses updatedFields directly) —
21	 *   const page = usePageForm({
22	 *       rawControls,
23	 *       pageBuildCalls: pageBuild?.Page?.calls,
24	 *   });
25	 *   // Validation is driven by page.updatedFields + page.fieldState.values
26	 *
27	 *   — Scenario B: Static + dynamic fields (component has its own merged fields) —
28	 *   const page = usePageForm({
29	 *       rawControls,
30	 *       pageBuildCalls: pageBuild?.Page?.calls,
31	 *       externalFields: myMergedFields,   // ← your NormalizedField[]
32	 *       externalValues: myFormValues,     // ← your local FormValues state
33	 *   });
34	 *   // Validation is driven by externalFields + externalValues


========== IMG_2830.md ==========
---
photo: IMG_2830.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 12-44 (continuation of same JSDoc block seen in IMG_2829, scroll-blur artifact)
orientation: 180
confidence: medium
notes: Same file/tab as IMG_2829 (use-page-form.ts), scrolled down slightly further; photo shows scroll motion-blur double-exposure (ghost of the previous scroll position from IMG_2829 overlaid on the new position), so lines 12-34 duplicate content already captured cleanly in IMG_2829 and are not re-transcribed reliably here — only the newly-visible tail (lines ~35-44) is transcribed with reasonable confidence from a cropped/zoomed region. Exact line-number-to-text alignment for 40-42 is uncertain (marked). Sidebar/tab/status bar identical to IMG_2829: use-page-form.ts active (9+ problems), branch hitanshu/experimental*, 29 errors/0 warnings, No Solution.
---
(lines 12-34: duplicate/ghosted repeat of IMG_2829 content — see that transcript; not re-transcribed)

35	 * // No manual batchSetValues / setValue sync needed!
36	 *
37	 * // Then use:
38	 *   page.updatedFields          - fields ready for <FormRenderer> (Scenario A)
39	 *   page.fieldState.values      - current form values (Scenario A)
40	⟪?⟫                              - { setValue, batchSetValues, setFieldMeta, batchSetFieldMeta, reset }
41	 *   page.fieldActions           - pass to <ActionButtons overrides={...}>
42	 *   page.rawControls
43	 *   page.buttonActions          - { setButtonMeta, batchSetButtonMeta, setButtonCommands, batchSetButtonCom⟪mands⟫ }
44	 *   page.initialButtonCommands  - merged button commands for click handler


========== IMG_2831.md ==========
---
photo: IMG_2831.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 38-65
orientation: 180
confidence: medium
notes: Continuation of same JSDoc block + imports for use-page-form.ts (same tab as IMG_2829/2830). Photo again shows scroll motion-blur ghosting (two adjacent scroll positions overlaid) but the property-table portion (lines 38-56) and the react import (line 57) are legible with reasonably good confidence via zoomed crops. Import block order at lines 59-63 corrected per the sharper reading in IMG_2832 (same lines, less blur there): BUTTON_MATCHCODES, useRequiredFieldValidation, normalizeServiceConfig, applyCommands, NormalizedField/FormValues — see IMG_2832 transcript as authoritative for this range. Sidebar/tab/status bar same as IMG_2829/2830: use-page-form.ts active (9+ problems), branch hitanshu/experimental*, 29 errors/0 warnings, No Solution.
---
38	 *   page.updatedFields          - fields ready for <FormRenderer> (Scenario A)
39	 *   page.fieldState.values      - current form values (Scenario A)
40	 *   page.fieldActions           - { setValue, batchSetValues, setFieldMeta, batchSetFieldMeta, reset }
41	 *   page.rawControls            - pass to <ActionButtons controls={…}>
42	 *   page.finalButtonStates      - pass to <ActionButtons buttonOverrides={…}>
43	 *   page.buttonActions          - { setButtonMeta, batchSetButtonMeta, setButtonCommands, batchSetButtonCom⟪mands⟫ }
44	 *   page.initialButtonCommands  - merged button commands for click handler
45	 *   page.buttonMatchcodes       - string[] of matchcodes present on the page
46	 *   page.allRequiredFilled      - boolean
47	 *   page.missingFields          - string[] of missing required field matchcodes
48	 *   page.buttonDisableMap       - per-button { disabled } map from validation
49	 *
50	 * Page-specific code that the component still handles:
51	 *   - Session data / EE data (page-specific payloads)
52	 *   - handleCommitField (field blur → API call → apply result via fieldActions)
53	 *   - handleButtonClick (navigation, button commands)
54	 *   - loadOptions (dropdown loading)
55	 */
56	
57	import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
58	
59	import { BUTTON_MATCHCODES } from '@/constants/button-matchcodes';
60	import { useRequiredFieldValidation } from '@/hooks/use-required-field-validation';
61	import { normalizeServiceConfig, type ServiceField } from '@utils/normalize-service-config';
62	import { applyCommands, type BrowserCommand } from '@/utils/apply-server-commands';
63	import type { NormalizedField, FormValues } from '@/types';


========== IMG_2832.md ==========
---
photo: IMG_2832.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 57-81
orientation: 180
confidence: medium
notes: Same file/tab (use-page-form.ts). Import block (57-63) is sharp/high-confidence and corrects the uncertain ordering guessed in IMG_2831's transcript — authoritative order confirmed here: react, then BUTTON_MATCHCODES, useRequiredFieldValidation, normalizeServiceConfig, applyCommands, NormalizedField/FormValues. Below line 63 the photo again shows scroll motion-blur ghosting; FieldMeta/ButtonMeta/FormState type declarations are legible in content but precise blank-line placement (numbers 64-69, 79-80) is uncertain — marked. Sidebar/tab/status bar same as prior use-page-form.ts photos: active tab "9+" problems, branch hitanshu/experimental*, 29 errors/0 warnings, No Solution.
---
57	import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
58	
59	import { BUTTON_MATCHCODES } from '@/constants/button-matchcodes';
60	import { useRequiredFieldValidation } from '@/hooks/use-required-field-validation';
61	import { normalizeServiceConfig, type ServiceField } from '@utils/normalize-service-config';
62	import { applyCommands, type BrowserCommand } from '@/utils/apply-server-commands';
63	import type { NormalizedField, FormValues } from '@/types';
64	⟪?⟫
65	⟪?⟫
66	// Exported Types
67	//
68	/** Runtime overrides for a single form field (disabled / visible). */
69	export type FieldMeta = {
70	    disabled?: boolean;
71	    visible?: boolean;
72	};
73	⟪?⟫
74	/** Runtime overrides for a single button (disabled / visible). */
75	export type ButtonMeta = {
76	    disabled?: boolean;
77	    visible?: boolean;
78	};
79	⟪?⟫
80	/** Form state managed by the hook. */
	export interface FormState {
81	    values: FormValues;


========== IMG_2833.md ==========
---
photo: IMG_2833.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 80-112
orientation: 180
confidence: medium
notes: Same file/tab (use-page-form.ts), continuing type declarations. Scroll motion-blur ghosting present throughout (as in prior photos of this file) but lines 93-109 (FormFieldActions / ButtonStateActions interfaces) are legible with good confidence via zoomed crops. Lines 80-92 (tail of ButtonMeta, FormState and ButtonState interfaces) had uncertain exact line-number alignment; lines 108-112 corrected/confirmed against the sharper reading in IMG_2834 (same lines, less blur there): ButtonStateActions has exactly 4 methods and closes at line 108, blank 109, "// — Hook input / output —" divider at 110, UsePageFormOptions interface begins at 112 — see IMG_2834 transcript as authoritative for lines 108+. Sidebar/tab/status bar same as prior use-page-form.ts photos: active tab "9+" problems, branch hitanshu/experimental*, 29 errors/0 warnings, No Solution.
---
80	export type ButtonMeta = {
81	    visible?: boolean;
	/** Form state managed by the hook. */
82	export interface FormState {
83	    values: FormValues;
84	    fieldMeta: Record<string, FieldMeta>;
	/** Button state managed by the hook. */
85	}
86	
	export interface ButtonState {
88	    meta: Record<string, ButtonMeta>;
	    commands: Record<string, BrowserCommand[]>;
91	}
92	
93	/** Actions exposed for form field state manipulation. */
94	export interface FormFieldActions {
95	    setValue: (noun: string, value: string | boolean) => void;
96	    setFieldMeta: (noun: string, meta: FieldMeta) => void;
97	    batchSetValues: (values: Record<string, string | boolean>) => void;
98	    batchSetFieldMeta: (fieldMeta: Record<string, FieldMeta>) => void;
99	    reset: () => void;
100	}
101	
102	/** Actions exposed for button state manipulation. */
103	export interface ButtonStateActions {
104	    setButtonMeta: (buttonName: string, meta: ButtonMeta) => void;
105	    batchSetButtonMeta: (buttonMeta: Record<string, ButtonMeta>) => void;
106	    setButtonCommands: (buttonName: string, commands: BrowserCommand[]) => void;
107	    batchSetButtonCommands: (buttonCommands: Record<string, BrowserCommand[]>) => void;
108	}
109	
110	// — Hook input / output —
111	
112	export interface UsePageFormOptions {
	/** Raw controls from the API: `pageBuild.Page.controls.control` */ (see IMG_2834 for lines 113+)


========== IMG_2834.md ==========
---
photo: IMG_2834.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 93-123
orientation: 180
confidence: medium
notes: Same file/tab (use-page-form.ts). This photo's clean upper portion (93-100, FormFieldActions) confirms IMG_2833's reading. Resolves IMG_2833's uncertain tail: ButtonStateActions interface (103-108) has exactly 4 methods (setButtonMeta, batchSetButtonMeta, setButtonCommands, batchSetButtonCommands) closing at line 108, blank 109, comment divider "// — Hook input / output —" at 110, then UsePageFormOptions interface begins at 112 with JSDoc'd properties rawControls (114), pageBuildCalls (116), and buttonsAffectedByValidation. Declaration line number for buttonsAffectedByValidation confirmed as 122 (not 123) per the sharper reading in IMG_2835 — see that transcript as authoritative for lines 117-123. Scroll motion-blur ghosting still present in lower half (110-123) so exact blank-line placement there is approximate. Sidebar/tab/status bar same as prior use-page-form.ts photos: active tab "9+" problems, branch hitanshu/experimental*, 29 errors/0 warnings, No Solution.
---
93	/** Actions exposed for form field state manipulation. */
94	export interface FormFieldActions {
95	    setValue: (noun: string, value: string | boolean) => void;
96	    setFieldMeta: (noun: string, meta: FieldMeta) => void;
97	    batchSetValues: (values: Record<string, string | boolean>) => void;
98	    batchSetFieldMeta: (fieldMeta: Record<string, FieldMeta>) => void;
99	    reset: () => void;
100	}
101	
102	/** Actions exposed for button state manipulation. */
103	export interface ButtonStateActions {
104	    setButtonMeta: (buttonName: string, meta: ButtonMeta) => void;
105	    batchSetButtonMeta: (buttonMeta: Record<string, ButtonMeta>) => void;
106	    setButtonCommands: (buttonName: string, commands: BrowserCommand[]) => void;
107	    batchSetButtonCommands: (buttonCommands: Record<string, BrowserCommand[]>) => void;
108	}
109	
110	// — Hook input / output —
111	
112	export interface UsePageFormOptions {
113	    /** Raw controls from the API: `pageBuild.Page.controls.control` */
114	    rawControls: ServiceField[];
115	    /** Page-level calls from the API: `pageBuild?.Page?.calls` */
116	    pageBuildCalls?: unknown;
117	    /** Which buttons should be disabled when required fields are empty.
118	     * When omitted, the underlying validation utility uses its own
119	     * VBS-derived default (OK, NEXT, OKSPECIAL) — fully dynamic,
120	     * no static values in this hook.
121	     */
122	    buttonsAffectedByValidation?: string[];
123	(blank — see IMG_2835)


========== IMG_2835.md ==========
---
photo: IMG_2835.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 112-141
orientation: 180
confidence: medium
notes: Same file/tab (use-page-form.ts). This photo clarifies/corrects IMG_2834's uncertain tail — buttonsAffectedByValidation declaration is confirmed at line 122 (not 123 as guessed there), followed by a blank line 123. New content: JSDoc for `externalFields` (Scenario B — static + dynamic fields, lines 124-133), the `externalFields?: ReadonlyArray<Pick<NormalizedField, ...>>` declaration (134-136), and start of another JSDoc block for a companion prop to externalFields (138-141+, cut off at bottom of frame). Scroll motion-blur ghosting present but less severe than earlier photos of this file; most of this range is legible. Sidebar/tab/status bar same as prior use-page-form.ts photos: active tab "9+" problems, branch hitanshu/experimental*, 29 errors/0 warnings, No Solution.
---
112	export interface UsePageFormOptions {
113	    /** Raw controls from the API: `pageBuild.Page.controls.control` */
114	    rawControls: ServiceField[];
115	    /** Page-level calls from the API: `pageBuild?.Page?.calls` */
116	    pageBuildCalls?: unknown;
117	    /** Which buttons should be disabled when required fields are empty.
118	     * When omitted, the underlying validation utility uses its own
119	     * VBS-derived default (OK, NEXT, OKSPECIAL) — fully dynamic,
120	     * no static values in this hook.
121	     */
122	    buttonsAffectedByValidation?: string[];
123	
124	    /**
125	     * **Scenario B — static + dynamic fields.**
126	     *
127	     * When a page component builds its own field definitions (e.g. merging
128	     * static layout with pageBuild data), pass the resulting array here.
129	     * The hook will use these — instead of its internally normalised
130	     * `updatedFields` — for required-field validation.
131	     *
132	     * When omitted, the hook falls back to its own `updatedFields` (Scenario A).
133	     */
134	    externalFields?: ReadonlyArray<
135	        Pick<NormalizedField, 'matchcode' | 'label' | 'required' | 'visible' | 'controlType'>
136	    >;
137	
138	    /**
139	     * **Scenario B — companion to `externalFields`.**
140	     *
141	     * The component's own receiving form values (e.g. from `useState`) ⟪?⟫ (cut off at bottom of frame)


========== IMG_2836.md ==========
---
photo: IMG_2836.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 143-178
orientation: 180
confidence: medium
notes: Same file/tab (use-page-form.ts), now into the `UsePageFormReturn` interface (return shape of the hook), sectioned with `// — Form fields —`, `// — Button extraction —`, `// — Button state —` comment dividers. Scroll motion-blur ghosting present throughout. Line numbers for the "Button extraction" subsection (160-170 below) were corrected +1 using the gap-free sequential reading confirmed in IMG_2837 (same lines, sharper there) — see that transcript as authoritative for 161-177. Section 149-159 (Form fields / early UsePageFormReturn members) and connecting blank/skipped lines (153-155) still have uncertain exact line-number alignment — marked. Sidebar/tab/status bar same as prior use-page-form.ts photos: active tab "9+" problems, branch hitanshu/experimental*, 29 errors/0 warnings, No Solution.
---
143	     * always sees the latest user input — no manual fieldActions.setValue
144	     * When omitted the hook falls back to its internal `fieldState.values`.
145	     * sync required.
146	    externalValues?: FormValues;
147	     * When omitted the hook falls back to its internal `fieldState.values`.
148	     */
149	export interface UsePageFormReturn {
150	    // — Form fields ——————————————
151	    /** Normalized + runtime-overlaid fields, ready for `<FormRenderer>`. */
152	    updatedFields: NormalizedField[];
153	⟪?⟫
154	⟪?⟫
155	⟪?⟫
156	    /** Current form state (values + fieldMeta). */
157	    fieldState: FormState;
158	    /** Imperative actions for form state. */
159	    fieldActions: FormFieldActions;
160	⟪?⟫
161	    // — Button extraction ——————————————
162	    /** Non-button controls (form fields only). */
163	    formControls: ServiceField[];
164	    /** Button matchcodes present on this page. */
165	    buttonMatchcodes: string[];
166	    /** Initial button meta from API (disabled / visible flags). */
167	    initialButtonMeta: Record<string, ButtonMeta>;
168	    /** Initial button commands from API. */
169	    initialButtonCommands: Record<string, any[]>;
170	⟪?⟫
171	    // — Button state ——————————————
172	    /** Runtime button state (overrides applied via browser commands). */
173	    buttonState: ButtonState;
174	    /** Imperative actions for button state. */
175	    buttonActions: ButtonStateActions;
176	    /** Final merged button states (API + runtime + validation). Pass to `<ActionButtons buttonOverrides>`. */
177	    finalButtonStates: Record<string, ButtonMeta>;
178	⟪?⟫ (cut off at bottom of frame)


========== IMG_2837.md ==========
---
photo: IMG_2837.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 152-191
orientation: 180
confidence: high
notes: Same file/tab (use-page-form.ts), continuing UsePageFormReturn interface through Button state / Validation sections and closing the interface at line 191. Top portion (161-173, Button extraction) is sharp/clean with a gap-free line sequence and corrects IMG_2836's line numbers for the same subsection by +1 (see IMG_2836's notes). Lower portion (174-191) has scroll motion-blur ghosting; IMG_2839 (sharp, no ghosting) confirms lines 184-191 exactly as transcribed here. Sidebar/tab/status bar same as prior use-page-form.ts photos: active tab "9+" problems, branch hitanshu/experimental*, 29 errors/0 warnings, No Solution. Bottom edge of frame shows start of next section "// — Internal types (not exported) —" (line ~193, cut off).
---
152	export interface UsePageFormReturn {
...(lines 152-159 same as IMG_2836)
161	    // — Button extraction ——————————————
162	    /** Non-button controls (form fields only). */
163	    formControls: ServiceField[];
164	    /** Button matchcodes present on this page. */
165	    buttonMatchcodes: string[];
166	    /** Initial button meta from API (disabled / visible flags). */
167	    initialButtonMeta: Record<string, ButtonMeta>;
168	    /** Initial button commands from API. */
169	    initialButtonCommands: Record<string, any[]>;
170	
171	    // — Button state ——————————————
172	    /** Runtime button state (overrides applied via browser commands). */
173	    buttonState: ButtonState;
174	    /** Imperative actions for button state. */
175	    buttonActions: ButtonStateActions;
176	    /** Final merged button states (API + runtime + validation). Pass to `<ActionButtons buttonOverrides>`. */
177	    finalButtonStates: Record<string, ButtonMeta>;
178	    /**
179	     * Merged button commands: API initial + any runtime overrides.
180	     * Use as the command source in your button click handler.
181	     */
182	    mergedButtonCommands: Record<string, BrowserCommand[]>;
183	
184	    // — Validation ——————————————
185	    /** True when every required + visible field has a value. */
186	    allRequiredFilled: boolean;
187	    /** Required fields that are still empty (matchcode + label). */
188	    missingFields: { matchcode: string; label: string }[];
189	    /** Per-button `{ disabled }` map from required-field validation. */
190	    buttonDisableMap: Record<string, { disabled: boolean }>;
191	}


========== IMG_2838.md ==========
---
photo: IMG_2838.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 176-207 (new content from ~192)
orientation: 180
confidence: medium
notes: Same file/tab (use-page-form.ts). Lines 176-191 duplicate/confirm content already captured cleanly in IMG_2837 (end of UsePageFormReturn interface). New content starts at the "// Internal reducer types (not exported)" comment (~193) followed by the internal `FormFieldAction` and `ButtonAction` discriminated-union reducer action types. Heavy scroll motion-blur ghosting makes exact line-number-to-text alignment for 192-207 unreliable in THIS photo, but IMG_2839 (sharp, no ghosting) provides an authoritative, corrected reading of this exact range (193-208) — see that transcript; the line numbers below are superseded by it. Bottom of frame here cuts off mid-way through the last ButtonAction union member. Sidebar/tab/status bar same as prior use-page-form.ts photos: active tab "9+" problems, branch hitanshu/experimental*, 29 errors/0 warnings, No Solution.
---
191	}
192	
193	// Internal reducer types (not exported)
194	
195	type FormFieldAction =
196	    | { type: 'SET_VALUE'; noun: string; value: string | boolean }
197	    | { type: 'SET_FIELD_META'; noun: string; meta: FieldMeta }
198	    | { type: 'BATCH_SET_VALUES'; values: Record<string, string | boolean> }
199	    | { type: 'BATCH_SET_META'; fieldMeta: Record<string, FieldMeta> }
200	    | { type: 'RESET' };
201	
202	type ButtonAction =
203	    | { type: 'SET_BUTTON_META'; buttonName: string; meta: ButtonMeta }
204	    | { type: 'BATCH_SET_BUTTON_META'; buttonMeta: Record<string, ButtonMeta> }
205	    | { type: 'SET_BUTTON_COMMANDS'; buttonName: string; commands: BrowserCommand[] }
206	    | { type: 'BATCH_SET_BUTTON_COMMANDS'; ⟪?⟫ (cut off at bottom of frame)


========== IMG_2839.md ==========
---
photo: IMG_2839.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 184-215
orientation: 180
confidence: high
notes: Same file/tab (use-page-form.ts). This photo is sharp with NO motion-blur ghosting (unlike most other use-page-form.ts photos in this batch) and is therefore authoritative for lines 184-215, superseding uncertain line-number guesses in IMG_2837 and IMG_2838's transcripts for the overlapping range (184-190 Validation block, 191-208 internal reducer action types). Shows the end of the `UsePageFormReturn` interface, the internal (not exported) `FormFieldAction` and `ButtonAction` discriminated-union reducer types, and the start of the "The Master Hook" section with the `usePageForm` function signature opening at line 214. Sidebar/tab/status bar same as prior use-page-form.ts photos: active tab "9+" problems, branch hitanshu/experimental*, 29 errors/0 warnings, No Solution.
---
184	    // — Validation ——————————————
185	    /** True when every required + visible field has a value. */
186	    allRequiredFilled: boolean;
187	    /** Required fields that are still empty (matchcode + label). */
188	    missingFields: { matchcode: string; label: string }[];
189	    /** Per-button `{ disabled }` map from required-field validation. */
190	    buttonDisableMap: Record<string, { disabled: boolean }>;
191	}
192	
193	// ═══════════════════════════════════════════
194	// Internal reducer types (not exported)
195	// ═══════════════════════════════════════════
196	
197	type FormFieldAction =
198	    | { type: 'SET_VALUE'; noun: string; value: string | boolean }
199	    | { type: 'SET_FIELD_META'; noun: string; meta: FieldMeta }
200	    | { type: 'BATCH_SET_VALUES'; values: Record<string, string | boolean> }
201	    | { type: 'BATCH_SET_META'; fieldMeta: Record<string, FieldMeta> }
202	    | { type: 'RESET' };
203	
204	type ButtonAction =
205	    | { type: 'SET_BUTTON_META'; buttonName: string; meta: ButtonMeta }
206	    | { type: 'BATCH_SET_BUTTON_META'; buttonMeta: Record<string, ButtonMeta> }
207	    | { type: 'SET_BUTTON_COMMANDS'; buttonName: string; commands: BrowserCommand[] }
208	    | { type: 'BATCH_SET_BUTTON_COMMANDS'; buttonCommands: Record<string, BrowserCommand[]> };
209	
210	// ═══════════════════════════════════════════
211	// The Master Hook
212	// ═══════════════════════════════════════════
213	
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
215	    const {


========== IMG_2840.md ==========
---
photo: IMG_2840.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 208-260
orientation: 180
confidence: medium
notes: Same tab/file as prior use-page-form.ts photos (IMG_2829-2833). Photo shows severe double-exposure/motion-blur ghosting throughout the body (two overlapping renderings of nearby scroll positions superimposed, consistent with the "scroll motion-blur ghosting" already noted on this file in IMG_2832/IMG_2833) — likely iPhone multi-frame HDR merge while the editor was mid-scroll. Line numbers below are reconstructed by anchoring to "export function usePageForm(...)" which recurs as a clean, unghosted VS Code sticky-scroll header at line 214 in every later photo of this file (IMG_2841-2851) — exact blank-line counts around 222-223, 240-241, 245-246, 256-257 are uncertain (±1-2 lines) and marked. No sticky scroll active yet in this photo (top-of-scroll view). Explorer sidebar: aqs-web-ui > src > hooks, use-page-form.ts highlighted (9+ problems), siblings use-action-guard.ts, use-browser-commands.ts, use-deferred-navigation.ts, use-form-commit.ts, use-required-field-validation....ts, use-smart-navigation.ts. Branch hitanshu/experimental*, 29 errors/0 warnings, No Solution, TypeScript, Ln 1 Col 1.
---
208	type ButtonAction =
209	    | { type: 'SET_BUTTON_COMMANDS'; buttonName: string; commands: BrowserCommand[] }
210	    | { type: 'BATCH_SET_BUTTON_COMMANDS'; buttonCommands: Record<string, BrowserCommand[]> }
211	    | { type: 'SET_BUTTON_META'; buttonMeta: Record<string, ButtonMeta> }
212	    | { type: 'BATCH_SET_BUTTON_META'; buttonCommands: Record<string, BrowserCommand[]> };
213	// The Master Hook
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
215	    const {
216	        rawControls,
217	        pageBuildCalls,
218	        buttonsAffectedByValidation,
219	        externalFields,
220	        externalValues,
221	    } = options;
222	⟪?⟫
223	    // 1. Form field state (values + fieldMeta)
224	    const formReducer = useCallback((state: FormState, action: FormFieldAction): FormState => {
225	        switch (action.type) {
226	            case 'SET_VALUE':
227	                return { ...state, values: { ...state.values, [action.noun]: action.value } };
228	            case 'SET_FIELD_META':
229	                return { ...state, fieldMeta: { ...state.fieldMeta, [action.noun]: action.meta } };
230	            case 'BATCH_SET_VALUES':
231	                return { ...state, values: { ...state.values, ...action.values } };
232	            case 'BATCH_SET_META':
233	                return { ...state, fieldMeta: { ...state.fieldMeta, ...action.fieldMeta } };
234	            case 'RESET':
235	                return { values: {}, fieldMeta: {} };
236	            default:
237	                return state;
238	        }
239	    }, []);
240	⟪?⟫
241	    const [fieldState, fieldDispatch] = useReducer(formReducer, {
242	        values: {},
243	        fieldMeta: {},
244	    });
245	⟪?⟫
246	    const fieldActions: FormFieldActions = useMemo(
247	        () => ({
248	            setValue: (noun, value) => fieldDispatch({ type: 'SET_VALUE', noun, value }),
249	            setFieldMeta: (noun, meta) => fieldDispatch({ type: 'SET_FIELD_META', noun, meta }),
250	            batchSetValues: (values) => fieldDispatch({ type: 'BATCH_SET_VALUES', values }),
251	            batchSetFieldMeta: (fieldMeta) => fieldDispatch({ type: 'BATCH_SET_META', fieldMeta }),
252	            reset: () => fieldDispatch({ type: 'RESET' }),
253	        }),
254	        []
255	    );
256	⟪?⟫
257	    // 2. Button extraction — split controls into buttons vs form fields
258	    //
259	⟪?⟫
260	    const extraction = useMemo(() => {


========== IMG_2841.md ==========
---
photo: IMG_2841.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214-260
orientation: 180
confidence: medium
notes: Same tab/file, appears to be a near-duplicate/retry shot of IMG_2840 (essentially the same scroll position, same content and same gutter-number range) — likely a second attempt because the first photo came out blurred. Severe double-exposure/motion-blur ghosting throughout, same artifact as IMG_2840/IMG_2832/IMG_2833. Content is consistent with and cross-validates IMG_2840's transcription for lines 214-260. Sidebar/tab/status bar identical to IMG_2840 (use-page-form.ts, 9+ problems, hitanshu/experimental*, 29 errors/0 warnings, No Solution).
---
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
215	    const {
216	        rawControls,
217	        pageBuildCalls,
218	        buttonsAffectedByValidation,
219	        externalFields,
220	        externalValues,
221	    } = options;
222	⟪?⟫
223	    // 1. Form field state (values + fieldMeta)
224	    const formReducer = useCallback((state: FormState, action: FormFieldAction): FormState => {
225	        switch (action.type) {
226	            case 'SET_VALUE':
227	                return { ...state, values: { ...state.values, [action.noun]: action.value } };
228	            case 'SET_FIELD_META':
229	                return { ...state, fieldMeta: { ...state.fieldMeta, [action.noun]: action.meta } };
230	            case 'BATCH_SET_VALUES':
231	                return { ...state, values: { ...state.values, ...action.values } };
232	            case 'BATCH_SET_META':
233	                return { ...state, fieldMeta: { ...state.fieldMeta, ...action.fieldMeta } };
234	            case 'RESET':
235	                return { values: {}, fieldMeta: {} };
236	            default:
237	                return state;
238	        }
239	    }, []);
240	⟪?⟫
241	    const [fieldState, fieldDispatch] = useReducer(formReducer, {
242	        values: {},
243	        fieldMeta: {},
244	    });
245	⟪?⟫
246	    const fieldActions: FormFieldActions = useMemo(
247	        () => ({
248	            setValue: (noun, value) => fieldDispatch({ type: 'SET_VALUE', noun, value }),
249	            setFieldMeta: (noun, meta) => fieldDispatch({ type: 'SET_FIELD_META', noun, meta }),
250	            batchSetValues: (values) => fieldDispatch({ type: 'BATCH_SET_VALUES', values }),
251	            batchSetFieldMeta: (fieldMeta) => fieldDispatch({ type: 'BATCH_SET_META', fieldMeta }),
252	            reset: () => fieldDispatch({ type: 'RESET' }),
253	        }),
254	        []
255	    );
256	⟪?⟫
257	    // 2. Button extraction — split controls into buttons vs form fields
258	    //
259	⟪?⟫
260	    const extraction = useMemo(() => {


========== IMG_2842.md ==========
---
photo: IMG_2842.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214, 244-276
orientation: 180
confidence: medium
notes: VS Code sticky-scroll shows "export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {" pinned at line 214 (clean/unghosted — this is the reliable anchor used across all photos of this file from here on). Below the sticky header the body has the same severe double-exposure/motion-blur ghosting as IMG_2840/2841 (two overlapping scroll positions superimposed). Body content is the tail of the fieldActions useMemo block plus the start of the button-extraction useMemo (flagToBoolean helper). Exact line numbers for lines 259-264 (between the "2. Button extraction" comment and "const extraction = useMemo(...)", which is independently confirmed as line 265 by sticky headers in IMG_2843/2844/2845) are not clearly resolvable through the ghosting and are marked uncertain — there is a small, expected numbering discontinuity vs IMG_2840/2841's own body-line count (accumulated blank-line uncertainty in this heavily-ghosted file). Sidebar/tab/status bar unchanged (use-page-form.ts, 9+ problems, hitanshu/experimental*, 29 errors/0 warnings, No Solution).
---
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
244	    });
245	⟪?⟫
246	    const fieldActions: FormFieldActions = useMemo(
247	        () => ({
248	            setValue: (noun, value) => fieldDispatch({ type: 'SET_VALUE', noun, value }),
249	            setFieldMeta: (noun, meta) => fieldDispatch({ type: 'SET_FIELD_META', noun, meta }),
250	            batchSetValues: (values) => fieldDispatch({ type: 'BATCH_SET_VALUES', values }),
251	            batchSetFieldMeta: (fieldMeta) => fieldDispatch({ type: 'BATCH_SET_META', fieldMeta }),
252	            reset: () => fieldDispatch({ type: 'RESET' }),
253	        }),
254	        []
255	    );
256	⟪?⟫
257	    // 2. Button extraction — split controls into buttons vs form fields
258	    //
259-264	⟪? lines not clearly resolvable through ghosting ?⟫
265	    const extraction = useMemo(() => {
266	        if (!rawControls || rawControls.length === 0) {
267	            return {
268	                formControls: [] as ServiceField[],
269	                initialButtonMeta: {} as Record<string, ButtonMeta>,
270	                initialButtonCommands: {} as Record<string, BrowserCommand[]>,
271	            };
272	        }
273	⟪?⟫
274	        const flagToBoolean = (v: unknown, defaultFalse = false): boolean => {
275	            if (v === undefined || v === null || v === '') return defaultFalse;
276	            if (typeof v === 'boolean') return v;


========== IMG_2843.md ==========
---
photo: IMG_2843.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214, 265-294
orientation: 180
confidence: medium
notes: Two clean VS Code sticky-scroll headers pinned at top - line 214 "export function usePageForm(...)" and line 265 "const extraction = useMemo(() => {" (both unghosted, used as anchors). Body below has the same severe double-exposure/motion-blur ghosting as prior photos of this file. Content overlaps the tail of IMG_2842 (flagToBoolean helper) and continues into rawControls.forEach setup and the BUTTON_MATCHCODES branch (initialButtonMeta disabled/visible). Sidebar/tab/status bar unchanged (use-page-form.ts, 9+ problems, hitanshu/experimental*, 29 errors/0 warnings, No Solution).
---
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
265	const extraction = useMemo(() => {
266	    if (!rawControls || rawControls.length === 0) {
267	        return {
268	            formControls: [] as ServiceField[],
269	            initialButtonMeta: {} as Record<string, ButtonMeta>,
270	            initialButtonCommands: {} as Record<string, BrowserCommand[]>,
271	        };
272	    }
273	⟪?⟫
274	    const flagToBoolean = (v: unknown, defaultFalse = false): boolean => {
275	        if (v === undefined || v === null || v === '') return defaultFalse;
276	        if (typeof v === 'boolean') return v;
277	        const s = String(v).trim().toUpperCase();
278	        return s === 'T' || s === 'TRUE' || s === '1' || s === 'Y';
279	    };
280	⟪?⟫
281	    const formControls: ServiceField[] = [];
282	    const initialButtonMeta: Record<string, ButtonMeta> = {};
283	    const initialButtonCommands: Record<string, any[]> = {};
284	⟪?⟫
285	    rawControls.forEach((control) => {
286	        const matchcode = (control['@matchcode'] || control.matchcode || '')
287	            .toString()
288	            .toUpperCase()
289	            .trim();
290	⟪?⟫
291	        if (BUTTON_MATCHCODES.has(matchcode)) {
292	            initialButtonMeta[matchcode] = {
293	                disabled: flagToBoolean(control['@disabled']),
294	                visible: flagToBoolean(control['@visible'], true),


========== IMG_2844.md ==========
---
photo: IMG_2844.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214, 265, 285, 291-320
orientation: 180
confidence: medium
notes: Three clean VS Code sticky-scroll headers stacked at top - line 214 "export function usePageForm(...)", line 265 "const extraction = useMemo(() => {", line 285 "rawControls.forEach((control) => {" (all unghosted, used as anchors; matches instructions' note that sticky headers repeat enclosing-scope lines with real line numbers). Body below has the usual double-exposure/motion-blur ghosting. Content: completes the BUTTON_MATCHCODES branch (initialButtonMeta/initialButtonCommands), closes the forEach/useMemo (extraction), then begins the "3. Button state (runtime overrides from browser commands)" section with buttonReducer's useCallback/switch (SET_BUTTON_META, BATCH_SET_BUTTON_META cases, start of SET_BUTTON_COMMANDS). Sidebar/tab/status bar unchanged (use-page-form.ts, 9+ problems, hitanshu/experimental*, 29 errors/0 warnings, No Solution).
---
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
265	const extraction = useMemo(() => {
285	rawControls.forEach((control) => {
291	        initialButtonMeta[matchcode] = {
292	            disabled: flagToBoolean(control['@disabled']),
293	            visible: flagToBoolean(control['@visible'], true),
294	        };
295	        if (control.calls) {
296	            initialButtonCommands[matchcode] = Array.isArray(control.calls)
297	                ? control.calls
298	                : [control.calls];
299	        }
300	    } else {
301	        formControls.push(control);
302	    }
303	});
304	⟪?⟫
305	    return { formControls, initialButtonMeta, initialButtonCommands };
306	}, [rawControls]);
307	⟪?⟫
308	//
309	// 3. Button state (runtime overrides from browser commands)
310	//
311	const buttonReducer = useCallback((state: ButtonState, action: ButtonAction): ButtonState => {
312	    switch (action.type) {
313	        case 'SET_BUTTON_META':
314	            return {
315	                ...state,
316	                meta: { ...state.meta, [action.buttonName]: action.meta },
317	            };
318	        case 'BATCH_SET_BUTTON_META':
319	            return { ...state, meta: { ...state.meta, ...action.buttonMeta } };
320	        case 'SET_BUTTON_COMMANDS':


========== IMG_2845.md ==========
---
photo: IMG_2845.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214, 265, 285, 311-332
orientation: 180
confidence: medium
notes: Same three sticky-scroll anchors as IMG_2844 (214, 265, 285) plus the buttonReducer declaration itself scrolling into the sticky region. Overlaps IMG_2844's tail (SET_BUTTON_META/SET_BUTTON_COMMANDS cases) and continues through BATCH_SET_BUTTON_COMMANDS, default, the reducer's closing, into the buttonState/buttonDispatch useReducer call. Usual double-exposure/motion-blur ghosting throughout the body. Sidebar/tab/status bar unchanged (use-page-form.ts, 9+ problems, hitanshu/experimental*, 29 errors/0 warnings, No Solution).
---
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
265	const extraction = useMemo(() => {
285	rawControls.forEach((control) => {
311	const buttonReducer = useCallback((state: ButtonState, action: ButtonAction): ButtonState => {
312	    switch (action.type) {
313	        case 'SET_BUTTON_META':
314	            return {
315	                ...state,
316	                meta: { ...state.meta, [action.buttonName]: action.meta },
317	            };
318	        case 'BATCH_SET_BUTTON_META':
319	            return { ...state, meta: { ...state.meta, ...action.buttonMeta } };
320	        case 'SET_BUTTON_COMMANDS':
321	            return {
322	                ...state,
323	                commands: { ...state.commands, [action.buttonName]: action.commands },
324	            };
325	        case 'BATCH_SET_BUTTON_COMMANDS':
326	            return { ...state, commands: { ...state.commands, ...action.buttonCommands } };
327	        default:
328	            return state;
329	    }
330	}, []);
331	⟪?⟫
332	const [buttonState, buttonDispatch] = useReducer(buttonReducer, {


========== IMG_2846.md ==========
---
photo: IMG_2846.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214, 311, 319-351
orientation: 180
confidence: medium
notes: Sticky-scroll anchors 214 "export function usePageForm(...)" and 311 "const buttonReducer = useCallback(...)" pinned at top (unghosted). Body overlaps IMG_2845's tail (BATCH_SET_BUTTON_COMMANDS case, default, reducer close) then continues into the buttonState/buttonDispatch useReducer call and the buttonActions useMemo (setButtonMeta/batchSetButtonMeta/setButtonCommands/batchSetButtonCommands). Ghosting near the bottom of the frame (~line 348-351) makes the exact placement of the final batchSetButtonCommands entry and closing `}), [], );` uncertain — transcribed once per the clearer/foreground layer rather than duplicated. Sidebar/tab/status bar unchanged (use-page-form.ts, 9+ problems, hitanshu/experimental*, 29 errors/0 warnings, No Solution).
---
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
311	const buttonReducer = useCallback((state: ButtonState, action: ButtonAction): ButtonState => {
319	        case 'SET_BUTTON_COMMANDS':
320	            return {
321	                ...state,
322	                commands: { ...state.commands, [action.buttonName]: action.commands },
323	            };
324	        case 'BATCH_SET_BUTTON_COMMANDS':
325	            return { ...state, commands: { ...state.commands, ...action.buttonCommands } };
326	⟪?⟫
327	⟪?⟫
328	⟪?⟫
329	⟪?⟫
330	        default:
331	            return state;
332	    }
333	}, []);
334	⟪?⟫
335	const [buttonState, buttonDispatch] = useReducer(buttonReducer, {
336	    meta: {},
337	    commands: {},
338	});
339	⟪?⟫
340	const buttonActions: ButtonStateActions = useMemo(
341	    () => ({
342	        setButtonMeta: (buttonName, meta) =>
343	            buttonDispatch({ type: 'SET_BUTTON_META', buttonName, meta }),
344	        batchSetButtonMeta: (buttonMeta) =>
345	            buttonDispatch({ type: 'BATCH_SET_BUTTON_META', buttonMeta }),
346	        setButtonCommands: (buttonName, commands) =>
347	            buttonDispatch({ type: 'SET_BUTTON_COMMANDS', buttonName, commands }),
348	        batchSetButtonCommands: (buttonCommands) =>
349	            buttonDispatch({ type: 'BATCH_SET_BUTTON_COMMANDS', buttonCommands }),
350	    }),
351	    []


========== IMG_2847.md ==========
---
photo: IMG_2847.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214, 355-386
orientation: 180
confidence: medium
notes: Sticky-scroll anchor 214 "export function usePageForm(...)" pinned at top (unghosted). Body begins the "4. Browser commands — process page-build calls ONCE on mount" section: hasRunBrowserCmds ref guard, the mount-only useEffect, normalizing pageBuildCalls into callsArray/actualCommands, mapping to BrowserCommand[] (verb/noun/addinf/resfil) and filtering, down to declaring valuesToSet. Usual double-exposure/motion-blur ghosting present but this photo's gutter numbers were read with better confidence than most in this batch (fewer ⟪?⟫ gaps). Sidebar/tab/status bar unchanged (use-page-form.ts, 9+ problems, hitanshu/experimental*, 29 errors/0 warnings, No Solution).
---
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
355	// 4. Browser commands — process page-build calls ONCE on mount
356	//     (sets initial field values + fieldMeta from API browser commands)
357	//
358	const hasRunBrowserCmds = useRef(false);
359	⟪?⟫
360	useEffect(() => {
361	    if (!pageBuildCalls || hasRunBrowserCmds.current) return;
362	⟪?⟫
363	    const callsArray = Array.isArray(pageBuildCalls) ? pageBuildCalls : [pageBuildCalls];
364	    if (callsArray.length === 0) return;
365	⟪?⟫
366	    let actualCommands: any[] = [];
367	    callsArray.forEach((callObj: any) => {
368	        if (Array.isArray(callObj.call)) {
369	            actualCommands = actualCommands.concat(callObj.call);
370	        } else if (callObj.call && typeof callObj.call === 'object') {
371	            actualCommands.push(callObj.call);
372	        }
373	    });
374	⟪?⟫
375	    const browserCommands: BrowserCommand[] = actualCommands
376	        .map((cmd: any) => ({
377	            verb: cmd.verb || cmd['@verb'] || '',
378	            noun: cmd.noun || cmd['@noun'] || '',
379	            addinf: cmd.addinf || cmd['@addinf'] || '',
380	            resfil: cmd.resfil || cmd['@resfil'] || '',
381	        }))
382	        .filter((cmd) => !!(cmd.verb || cmd.noun));
383	⟪?⟫
384	    if (browserCommands.length === 0) return;
385	⟪?⟫
386	    const valuesToSet: Record<string, string | boolean> = {};


========== IMG_2848.md ==========
---
photo: IMG_2848.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214, 360, 367-399
orientation: 180
confidence: medium
notes: Sticky-scroll anchors 214 "export function usePageForm(...)" and 360 "useEffect(() => {" pinned at top (unghosted). Body overlaps IMG_2847's forEach/browserCommands map+filter and continues into valuesToSet/fieldMetaToSet declarations and the applyCommands(browserCommands, {...}) call object (setText, setVariable, setDisabled, start of setVisible). Ghosting duplicated the valuesToSet/fieldMetaToSet const declarations in the raw photo (same two lines appearing twice at slightly different vertical offsets) — de-duplicated here to one occurrence each per the gutter-aligned foreground layer. Sidebar/tab/status bar unchanged (use-page-form.ts, 9+ problems, hitanshu/experimental*, 29 errors/0 warnings, No Solution).
---
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
360	useEffect(() => {
367	    callsArray.forEach((callObj: any) => {
368	⟪?⟫
369	⟪?⟫
370	        } else if (callObj.call && typeof callObj.call === 'object') {
371	            actualCommands.push(callObj.call);
372	⟪?⟫
373	    });
374	⟪?⟫
375	    const browserCommands: BrowserCommand[] = actualCommands
376	        .map((cmd: any) => ({
377	            verb: cmd.verb || cmd['@verb'] || '',
378	            noun: cmd.noun || cmd['@noun'] || '',
379	            addinf: cmd.addinf || cmd['@addinf'] || '',
380	            resfil: cmd.resfil || cmd['@resfil'] || '',
381	        }))
382	        .filter((cmd) => !!(cmd.verb || cmd.noun));
383	⟪?⟫
384	    if (browserCommands.length === 0) return;
385	⟪?⟫
386	    const valuesToSet: Record<string, string | boolean> = {};
387	⟪?⟫
388	    const fieldMetaToSet: Record<string, FieldMeta> = {};
389	⟪?⟫
390	    applyCommands(browserCommands, {
391	        setText: (noun, value) => {
392	            valuesToSet[noun] = value;
393	        },
394	        setVariable: (noun, value) => {
395	            valuesToSet[noun] = value;
396	        },
397	        setDisabled: (noun, isDisabled) => {
398	            fieldMetaToSet[noun] = { ...fieldMetaToSet[noun], disabled: isDisabled };
399	        },


========== IMG_2849.md ==========
---
photo: IMG_2849.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214, 360, 385-415
orientation: 180
confidence: medium
notes: Sticky-scroll anchors 214 and 360 pinned at top (unghosted). Body overlaps IMG_2848's valuesToSet/fieldMetaToSet/applyCommands opening and continues through setVariable, setDisabled, setVisible, displayMessage (no-op), the .then(...) callback that sets hasRunBrowserCmds.current = true and calls fieldActions.batchSetValues/batchSetFieldMeta when there is anything to set, down to the eslint-disable comment and the effect's closing `}, [pageBuildCalls]);`. Usual double-exposure/motion-blur ghosting present but this photo read with reasonably good confidence. Sidebar/tab/status bar unchanged (use-page-form.ts, 9+ problems, hitanshu/experimental*, 29 errors/0 warnings, No Solution).
---
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
360	useEffect(() => {
385	    const valuesToSet: Record<string, string | boolean> = {};
386	⟪?⟫
387	    const fieldMetaToSet: Record<string, FieldMeta> = {};
388	⟪?⟫
389	    applyCommands(browserCommands, {
390	        setText: (noun, value) => {
391	            valuesToSet[noun] = value;
392	        },
393	        setVariable: (noun, value) => {
394	            valuesToSet[noun] = value;
395	        },
396	        setDisabled: (noun, isDisabled) => {
397	            fieldMetaToSet[noun] = { ...fieldMetaToSet[noun], disabled: isDisabled };
398	        },
399	        setVisible: (noun, isVisible) => {
400	            fieldMetaToSet[noun] = { ...fieldMetaToSet[noun], visible: isVisible };
401	        },
402	        displayMessage: () => {
403	            /* no-op */
404	        },
405	    }).then(() => {
406	        hasRunBrowserCmds.current = true;
407	⟪?⟫
408	        if (Object.keys(valuesToSet).length > 0) {
409	            fieldActions.batchSetValues(valuesToSet);
410	        }
411	⟪?⟫
412	        if (Object.keys(fieldMetaToSet).length > 0) {
413	            fieldActions.batchSetFieldMeta(fieldMetaToSet);
414	        }
415	    });


========== IMG_2850.md ==========
---
photo: IMG_2850.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214, 360, 401-431
orientation: 180
confidence: medium
notes: Sticky-scroll anchors 214 and 360 pinned at top (unghosted). Body overlaps IMG_2849's tail (setVisible/displayMessage, .then callback, batchSetValues/batchSetFieldMeta) then closes the browser-commands useEffect (eslint-disable comment + deps array), and opens "5. Field normalization — two-stage memoization" (Stage 1 raw API controls -> NormalizedField[], Stage 2 overlay runtime values+fieldMeta): the normalizedFields useMemo, and the start of a long comment block about seeding fieldState.values from normalized defaults and the @text fallback for auto-populated fields. Severe ghosting; line 429 duplicates line 428's text in the source photo (repeated "their value in @text..." line) which looks like a genuine ghost artifact rather than real duplicated code - flagged, not repeated in transcription. There is a known ~1-line numbering overlap with IMG_2849's final lines (both derived independently from a heavily-ghosted region). Sidebar/tab/status bar unchanged (use-page-form.ts, 9+ problems, hitanshu/experimental*, 29 errors/0 warnings, No Solution).
---
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
360	useEffect(() => {
401	        setVisible: (noun, isVisible) => {
402	            fieldMetaToSet[noun] = { ...fieldMetaToSet[noun], visible: isVisible };
403	        },
404	        displayMessage: () => {
405	            /* no-op */
406	        },
407	    }).then(() => {
408	        hasRunBrowserCmds.current = true;
409	        if (Object.keys(valuesToSet).length > 0) {
410	            fieldActions.batchSetValues(valuesToSet);
411	        }
412	        if (Object.keys(fieldMetaToSet).length > 0) {
413	            fieldActions.batchSetFieldMeta(fieldMetaToSet);
414	        }
415	    });
416	    // eslint-disable-next-line react-hooks/exhaustive-deps
417	}, [pageBuildCalls]);
418	⟪?⟫
419	// 5. Field normalization — two-stage memoization
420	//    Stage 1: normalize raw API controls → NormalizedField[]
421	//    Stage 2: overlay runtime values + fieldMeta
422	//
423	const normalizedFields = useMemo(() => {
424	    if (!extraction.formControls || extraction.formControls.length === 0) return [];
425	    return normalizeServiceConfig(extraction.formControls) as NormalizedField[];
426	}, [extraction.formControls]);
427	⟪?⟫
428	// Seed fieldState.values from normalised field defaults AND @text from raw API:
429	// normalizeServiceConfig derives defaultValue from @default / @value but NOT
430	// @text. Many auto-populated fields (e.g. POLNAM_LINSPRINAM_2) only carry
431	// their value in @text. We fall back to it here so required-field validation


========== IMG_2851.md ==========
---
photo: IMG_2851.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214, 425-444
orientation: 180
confidence: medium
notes: Sticky-scroll anchor 214 pinned at top (unghosted). Body overlaps IMG_2850's comment block (Seed fieldState.values.../normalizeServiceConfig/@text fallback) — this photo's two overlapping ghost exposures show the SAME 9-line comment block at two adjacent scroll offsets, which cross-validated the reading with high internal confidence despite the visual doubling. Comment concludes with an IMPORTANT note restricting the @text fallback to non-interactive field types (textbox/textarea/label/date), since SELECT/COMBO/RADIO fields' @text may be a placeholder/list-index that would falsely satisfy required-field validation. Then: const hasSeededDefaults = useRef(false); a useEffect guarded by hasSeededDefaults.current/normalizedFields.length; and the start of building a matchcode -> @text lookup (textByMatchcode) via a for..of loop over extraction.formControls. Sidebar/tab/status bar unchanged (use-page-form.ts, 9+ problems, hitanshu/experimental*, 29 errors/0 warnings, No Solution).
---
214	export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
425	⟪?⟫
426	// Seed fieldState.values from normalised field defaults AND @text from raw API:
427	// normalizeServiceConfig derives defaultValue from @default / @value but NOT
428	// @text. Many auto-populated fields (e.g. POLNAM_LINSPRINAM_2) only carry
429	// their value in @text. We fall back to it here so required-field validation
430	// recognises those fields as "filled".
431	// IMPORTANT: The @text fallback is restricted to non-interactive field types
432	// (textbox, textarea, label, date). For SELECT / COMBO / RADIO fields, @text
433	// may contain a placeholder or list-index text that does NOT represent a real
434	// user selection — seeding those would falsely satisfy required-field validation.
435	const hasSeededDefaults = useRef(false);
436	⟪?⟫
437	useEffect(() => {
438	    if (hasSeededDefaults.current || normalizedFields.length === 0) return;
439	⟪?⟫
440	    // Build a matchcode → @text lookup from the raw API controls
441	    const textByMatchcode: Record<string, string> = {};
442	    for (const ctrl of extraction.formControls) {
443	        const mc = (ctrl as any)['@matchcode'] || (ctrl as any).matchcode || ''
444	⟪continues off-frame⟫


========== IMG_2852.md ==========
---
photo: IMG_2852.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214-447
orientation: 180
confidence: high
notes: Sticky scroll header shows line 214 (function signature). Breadcrumb aqs-web-ui > src > hooks > use-page-form.ts > .... Tab "use-page-form.ts" has unsaved marker (9+ problems). Explorer sidebar shows aqs-web-ui/src tree with features > prp > utils, root > services > user-data.ts, root > utils > loader.ts, middleware.ts, hooks folder open with use-action-guard.ts, use-browser-commands.ts, use-deferred-navigation.ts, use-form-commit.ts, use-page-form.ts (selected), use-required-field-validation..., use-smart-navigation.ts; also lib, pages, providers, services, types, utils, app.css at root level. Status bar: branch hitanshu/experimental*, 29 errors 0 warnings, "No Solution". Cursor at Ln 1, Col 1 despite content shown (likely stale from selection). Minimap on right shows red/orange markers (errors) scattered throughout file.
---
214: export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
415:     }, [pageBuildCalls]);
416:
417:     // ─────────────────────────────────────────────
418:     // 5. Field normalization — two-stage memoization
419:     //    Stage 1: normalize raw API controls → NormalizedField[]
420:     //    Stage 2: overlay runtime values + fieldMeta
421:     // ─────────────────────────────────────────────
422:     const normalizedFields = useMemo(() => {
423:         if (!extraction.formControls || extraction.formControls.length === 0) return [];
424:         return normalizeServiceConfig(extraction.formControls) as NormalizedField[];
425:     }, [extraction.formControls]);
426:
427:     // Seed fieldState.values from normalised field defaults AND @text from raw API.
428:     // normalizeServiceConfig derives defaultValue from @default / @value but NOT
429:     // @text. Many auto-populated fields (e.g. POLNAM_LINSPRINAM_2) only carry
430:     // their value in @text. We fall back to it here so required-field validation
431:     // recognises those fields as "filled".
432:     //
433:     // IMPORTANT: The @text fallback is restricted to non-interactive field types
434:     // (textbox, textarea, label, date). For SELECT / COMBO / RADIO fields, @text
435:     // may contain a placeholder or list-index text that does NOT represent a real
436:     // user selection — seeding those would falsely satisfy required-field validation.
437:     const hasSeededDefaults = useRef(false);
438:     useEffect(() => {
439:         if (hasSeededDefaults.current || normalizedFields.length === 0) return;
440:
441:         // Build a matchcode → @text lookup from the raw API controls
442:         const textByMatchcode: Record<string, string> = {};
443:         for (const ctrl of extraction.formControls) {
444:             const mc = ((ctrl as any)['@matchcode'] || (ctrl as any).matchcode || '')
445:                 .toString()
446:                 .trim();
447:             const text = ((ctrl as any)['@text'] ?? '').toString().trim();


========== IMG_2853.md ==========
---
photo: IMG_2853.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214-473 (sticky headers 214, 438; content 443-473)
orientation: 180
confidence: medium
notes: Photo has a double-exposure / motion-blur artifact — the editor appears to have been mid-way through an animated scroll when the shutter fired, so two overlapping scroll positions (offset by ~3 lines) are superimposed across the whole code pane. Line-number gutter and content were reconstructed by cross-referencing both overlapping layers and validating overlap against the clean IMG_2852 transcript (lines 443-447 match exactly between the two photos). Lines 448-450 and 458-473 read consistently between layers (high confidence). Lines 451-457 (two comment lines, a blank line, and the textFallbackTypes/defaults declarations) had ambiguous exact row placement due to the ghosting — sequence/content is very likely correct (forms coherent, syntactically valid TS matching the surrounding logic) but exact blank-line position and comment ordering carries residual uncertainty, marked ⟪?⟫ where most uncertain. Sticky scroll headers unchanged from IMG_2852: line 214 (usePageForm function signature) and line 438 (useEffect(() => {). Same tab/file/sidebar context as IMG_2852 (use-page-form.ts selected in hooks folder, 29 errors/0 warnings, branch hitanshu/experimental*, No Solution, 5:20 PM 7/10/2026).
---
214: export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
438: useEffect(() => {
443:     for (const ctrl of extraction.formControls) {
444:         const mc = ((ctrl as any)['@matchcode'] || (ctrl as any).matchcode || '')
445:             .toString()
446:             .trim();
447:         const text = ((ctrl as any)['@text'] ?? '').toString().trim();
448:         if (mc && text) {
449:             textByMatchcode[mc] = text;
450:         }
451:     }
452: ⟪?⟫
453:     // Field types where @text represents an actual auto-populated value
454:     // (NOT a dropdown placeholder or display label)
455:     const textFallbackTypes = new Set(['textbox', 'textarea', 'label', 'date', 'calendar']);
456: ⟪?⟫
457:     const defaults: Record<string, string | boolean> = {};
458:     for (const field of normalizedFields) {
459:         if (field.defaultValue !== undefined && field.defaultValue !== '') {
460:             defaults[field.matchcode] = field.defaultValue;
461:         } else if (
462:             textByMatchcode[field.matchcode] &&
463:             textFallbackTypes.has(field.controlType ?? '')
464:         ) {
465:             // Fallback: use @text from the raw control (auto-populated value)
466:             // Only for non-interactive types where @text is the real value
467:             defaults[field.matchcode] = textByMatchcode[field.matchcode];
468:         }
469:     }
470:     if (Object.keys(defaults).length > 0) {
471:         hasSeededDefaults.current = true;
472:         fieldActions.batchSetValues(defaults);
473:     }


========== IMG_2854.md ==========
---
photo: IMG_2854.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214-494 (sticky headers 214, 438; content 464-494)
orientation: 180
confidence: medium
notes: Double-exposure / motion-blur throughout this photo — appears the editor was scrolling (animated/smooth scroll) when the shutter fired, smearing each source line across several rows. Lines 464-474 are HIGH confidence: they exactly match/continue the clean IMG_2852 transcript and IMG_2853 reconstruction. Lines 475-494 were originally transcribed with 2-line uncertainty from this photo alone, then CORRECTED using the much cleaner overlapping capture in IMG_2855 (same file, same lines 474-503, taken moments later with far less blur) — line numbers below for 475-494 are now high confidence, cross-validated against IMG_2855. Sticky scroll headers unchanged: line 214 (usePageForm signature), line 438 (useEffect(() => {). Same tab/sidebar/status-bar context as IMG_2852/2853 (use-page-form.ts selected, 29 errors/0 warnings, branch hitanshu/experimental*, No Solution, 5:20 PM 7/10/2026). Cursor shown at Ln 1, Col 1 (stale).
---
214: export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
438: useEffect(() => {
464:         ) {
465:             // Fallback: use @text from the raw control (auto-populated value)
466:             // Only for non-interactive types where @text is the real value
467:             defaults[field.matchcode] = textByMatchcode[field.matchcode];
468:         }
469:     }
470:     if (Object.keys(defaults).length > 0) {
471:         hasSeededDefaults.current = true;
472:         fieldActions.batchSetValues(defaults);
473:     }
474: }, [normalizedFields, fieldActions, extraction.formControls]);
475: const updatedFields: NormalizedField[] = useMemo(() => {
476:     return normalizedFields.map((field) => ({
477:         ...field,
478:         disabled: fieldState.fieldMeta[field.matchcode]?.disabled ?? field.disabled,
479:         visible: fieldState.fieldMeta[field.matchcode]?.visible ?? field.visible,
480:         value: fieldState.values[field.matchcode],
481:     }));
482: }, [normalizedFields, fieldState.values, fieldState.fieldMeta]);
483: ⟪blank?⟫
484: // ───────────────────────────────────────────
485: // 6. Required-field validation → button disable map
486: // Mirrors VBS CheckRequiredIndicators:
487: //    If ALL required+visible fields filled → enable OK/NEXT
488: //    If ANY required+visible field empty  → disable OK/NEXT
489: // ───────────────────────────────────────────
490: const buttonMatchcodes = useMemo(
491:     () => Object.keys(extraction.initialButtonMeta),
492:     [extraction.initialButtonMeta],
493: );
494: ⟪blank?⟫


========== IMG_2855.md ==========
---
photo: IMG_2855.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214-503 (sticky headers 214, 438; content 474-503)
orientation: 180
confidence: high
notes: Some double-exposure/motion-blur ghosting present (same scrolling-capture artifact as IMG_2853/2854) but much lighter here — foreground text is legible and internally consistent across the whole visible range, giving high confidence. This photo's clean capture of lines 474-494 was used to retroactively correct IMG_2854's transcript (which had 2-line uncertainty in that range from a blurrier capture). Line 504 is cut off at the very bottom edge of the editor viewport (just above the status bar) and not legible — content ⟪?⟫. Sticky scroll headers unchanged: line 214 (usePageForm signature), line 438 (useEffect(() => {). Same tab/file context (use-page-form.ts selected, 9+ unsaved changes indicator). Explorer sidebar unchanged from prior photos in this sequence. Status bar: branch hitanshu/experimental*, 29 errors/0 warnings, "No Solution", 5:20 PM 7/10/2026. Cursor Ln 1, Col 1 (stale, not reflecting scroll position).
---
214: export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
438: useEffect(() => {
474: }, [normalizedFields, fieldActions, extraction.formControls]);
475: const updatedFields: NormalizedField[] = useMemo(() => {
476:     return normalizedFields.map((field) => ({
477:         ...field,
478:         disabled: fieldState.fieldMeta[field.matchcode]?.disabled ?? field.disabled,
479:         visible: fieldState.fieldMeta[field.matchcode]?.visible ?? field.visible,
480:         value: fieldState.values[field.matchcode],
481:     }));
482: }, [normalizedFields, fieldState.values, fieldState.fieldMeta]);
483: ⟪blank?⟫
484: // ───────────────────────────────────────────
485: // 6. Required-field validation → button disable map
486: // Mirrors VBS CheckRequiredIndicators:
487: //    If ALL required+visible fields filled → enable OK/NEXT
488: //    If ANY required+visible field empty  → disable OK/NEXT
489: // ───────────────────────────────────────────
490: const buttonMatchcodes = useMemo(
491:     () => Object.keys(extraction.initialButtonMeta),
492:     [extraction.initialButtonMeta],
493: );
494: ⟪blank?⟫
495: // When the component provides its own fields + values (Scenario B),
496: // validation uses those directly — no manual sync needed.
497: // Otherwise (Scenario A) we fall back to the hook's internal state.
498: const validationFields = externalFields ?? updatedFields;
499: const validationValues = externalValues ?? fieldState.values;
500: ⟪blank?⟫
501: const { allRequiredFilled, missingFields, buttonDisableMap } = useRequiredFieldValidation(
502:     validationFields,
503:     validationValues,
504: ⟪?⟫


========== IMG_2856.md ==========
---
photo: IMG_2856.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214-539 (sticky header 214; content 507-539)
orientation: 180
confidence: high
notes: Clean, sharp capture — no motion blur/ghosting (unlike IMG_2853/2854/2855). Sticky scroll header shows only line 214 (usePageForm function signature); the useEffect sticky header from earlier photos is gone, meaning we've scrolled past that function scope. Line 507 (buttonsAffectedByValidation,) is a partial line at the very top, cut off above by the sticky header. Explorer sidebar unchanged. Status bar: branch hitanshu/experimental*, 29 errors/0 warnings, "No Solution", 5:20 PM 7/10/2026. Cursor Ln 1, Col 1 (stale). This is a new section: "7. Computed final button states" comment block, then finalButtonStates useMemo merging API initial state, runtime browser-command overrides, and required-field validation overrides.
---
214: export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
507:     buttonsAffectedByValidation,
508: );
509:
510: // ───────────────────────────────────────────
511: // 7. Computed final button states
512: //    Merges: API initial → runtime overrides → validation overrides
513: // ───────────────────────────────────────────
514: const finalButtonStates = useMemo(() => {
515:     // 1. Start with the API's initial disabled/visible values
516:     const merged: Record<string, ButtonMeta> = { ...extraction.initialButtonMeta };
517:
518:     // 2. Layer on any runtime browser-command overrides (SET_DISABLED, SET_VISIBLE, etc.)
519:     for (const [key, val] of Object.entries(buttonState.meta)) {
520:         merged[key] = { ...merged[key], ...val };
521:     }
522:
523:     // 3. Required-field validation is the PRIMARY driver for OK / NEXT
524:     //    (exactly like VBS CheckRequiredIndicators → enable/disable dtaOK and dtaNEXT)
525:     for (const [key, val] of Object.entries(buttonDisableMap)) {
526:         if (merged[key]) {
527:             if (val.disabled) {
528:                 merged[key] = { ...merged[key], disabled: true };
529:             } else {
530:                 // All required fields filled → enable unless server explicitly disabled
531:                 const runtimeForceDisabled = buttonState.meta[key]?.disabled === true;
532:                 if (!runtimeForceDisabled) {
533:                     merged[key] = { ...merged[key], disabled: false };
534:                 }
535:             }
536:         }
537:     }
538:
539:     return merged;


========== IMG_2857.md ==========
---
photo: IMG_2857.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214-562 (sticky headers 214, 514; content 532-562)
orientation: 180
confidence: high
notes: Clean, sharp capture, no motion blur/ghosting. Sticky scroll shows two header rows: line 214 (usePageForm function signature) and line 514 (const finalButtonStates = useMemo(() => {), then real content resumes at line 532. Left edge of Explorer sidebar slightly cropped by photo framing but folder/file names still legible (AQS_WORKSPACE, aqs-web-ui, src, features > prp > utils, root > services > user-data.ts, utils > loader.ts/middleware.ts, hooks folder with use-page-form.ts selected). Status bar: branch hitanshu/experimental*, 29 errors/0 warnings, "No Solution", 5:20 PM 7/10/2026. Cursor Ln 1, Col 1 (stale). Content shows the tail of finalButtonStates useMemo, a new mergedButtonCommands useMemo, and the start of the hook's final return statement.
---
214: export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
514: const finalButtonStates = useMemo(() => {
532:                 if (!runtimeForceDisabled) {
533:                     merged[key] = { ...merged[key], disabled: false };
534:                 }
535:             }
536:         }
537:     }
538:
539:     return merged;
540: }, [extraction.initialButtonMeta, buttonState.meta, buttonDisableMap]);
541:
542: // Merged button commands (initial + runtime)
543: const mergedButtonCommands = useMemo(
544:     () => ({ ...extraction.initialButtonCommands, ...buttonState.commands }),
545:     [extraction.initialButtonCommands, buttonState.commands],
546: );
547:
548: // ───────────────────────────────────────────
549: // Return everything the component needs
550: // ───────────────────────────────────────────
551: return {
552:     // Form
553:     updatedFields,
554:     fieldState,
555:     fieldActions,
556:
557:     // Button extraction
558:     formControls: extraction.formControls,
559:     buttonMatchcodes,
560:     initialButtonMeta: extraction.initialButtonMeta,
561:     initialButtonCommands: extraction.initialButtonCommands,
562:     // Button state


========== IMG_2858.md ==========
---
photo: IMG_2858.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-page-form.ts
lines: 214-568 (sticky headers 214, 514; content 546-568)
orientation: 180
confidence: medium
notes: Moderate double-exposure/motion-blur ghosting throughout (similar scroll-capture artifact as IMG_2853-2855). Lines 546-551 cross-validated as high confidence against the clean IMG_2857 capture of the same lines (const mergedButtonCommands = useMemo(...) closing + Return-everything comment block + "return {"). Lines 552-561 clearly legible despite ghosting (bold foreground text unambiguous). Lines 562-568 (the "Button state" group of the return object) had 1-line row-alignment ambiguity between two zoomed crops — content list is solid (buttonState, buttonActions, finalButtonStates, mergedButtonCommands) but exact line numbers for the blank line and comment carry minor uncertainty, and line 568 is cut off by the status bar overlay at the bottom of the editor viewport, marked ⟪?⟫. Sticky scroll headers unchanged: line 214 (usePageForm signature), line 514 (const finalButtonStates = useMemo(() => {). Explorer sidebar and status bar unchanged (use-page-form.ts selected, 29 errors/0 warnings, branch hitanshu/experimental*, No Solution, 5:20 PM 7/10/2026). Cursor Ln 1, Col 1 (stale).
---
214: export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
514: const finalButtonStates = useMemo(() => {
546: );
547:
548: // ───────────────────────────────────────────
549: // Return everything the component needs
550: // ───────────────────────────────────────────
551: return {
552:     // Form
553:     updatedFields,
554:     fieldState,
555:     fieldActions,
556:
557:     // Button extraction
558:     formControls: extraction.formControls,
559:     buttonMatchcodes,
560:     initialButtonMeta: extraction.initialButtonMeta,
561:     initialButtonCommands: extraction.initialButtonCommands,
562:
563:     // Button state
564:     buttonState,
565:     buttonActions,
566:     finalButtonStates,
567:     mergedButtonCommands,
568: ⟪?⟫
