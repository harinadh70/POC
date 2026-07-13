# BUNDLE for src/utils/button-state-manager.ts
# 26 photo fragment(s), ascending start-line order.


========== IMG_3418.md ==========
---
photo: IMG_3418.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 1-34
orientation: 180
confidence: high
notes: New file/tab, sharp/minimal ghosting (unlike the previous build-xml-server-call-payload.ts sequence). File is currently selected in Explorer sidebar (button-state-managers.ts highlighted). Status bar: 2 errors, 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Only tab open: button-state-manager.ts (italic = preview tab). Line 34 cut off mid-word ("'@controltype'?: string;" partially visible at very bottom edge, low confidence on that last line).
---
1    /**
2     * Button State Manager Utility
3     * -----------------------------
4     * Comprehensive utility for extracting, normalizing, and computing final states for buttons
5     * from the PageBuild API response.
6     *
7     * Handles:
8     *   - Extracting button controls from raw API controls array
9     *   - Normalizing button properties (@matchcode, @text, @disabled, @visible)
10    *   - Computing final button states based on visibility and required-field validation
11    *   - Providing override maps for ActionButtons component
12    *
13    * Core Rules:
14    *   - Buttons are controls where @controltype === "button"
15    *   - A button is only rendered if @visible === "T"
16    *   - A button is disabled by default if @disabled === "T"
17    *   - If all required fields are filled, override disabled to "F" for VISIBLE buttons only
18    *   - CANCEL and other non-validation-affected buttons maintain their API state
19    */
20
21   import type { ButtonOverride } from '@components/action-buttons';
22
23   // ---------------------------------------------------------------------
24   // Types
25   // ---------------------------------------------------------------------
26
27   /** Raw button control from the API response */
28   export interface RawButtonControl {
29       '@matchcode'?: string;
30       '@text'?: string;
31       '@disabled'?: string;
32       '@visible'?: string;
33       '@utporder'?: string | number;
34       ⟪? — '@controltype'?: string; (cut off at bottom edge, low confidence) ⟫


========== IMG_3419.md ==========
---
photo: IMG_3419.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 1-47
orientation: 180
confidence: high
notes: Same file/tab as IMG_3418, scrolled slightly. Light ghosting but text is legible. Confirms and extends IMG_3418 (lines 1-34 overlap and match; line 34 confirmed as '@controltype'?: string;). New content: lines 35-47. Status bar: 2 errors, 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
28   export interface RawButtonControl {
29       '@matchcode'?: string;
30       '@text'?: string;
31       '@disabled'?: string;
32       '@visible'?: string;
33       '@utporder'?: string | number;
34       '@controltype'?: string;
35       calls?: unknown;
36       [key: string]: unknown;
37   }
38
39   /** Normalized button definition */
40   export interface NormalizedButton {
41       matchcode: string | number;
42       text: string;
43       disabled: boolean;
44       visible: boolean;
45       utporder: number;
46       raw: RawButtonControl;
47       ⟪? — comment start "/** Normalized button definition */" or similar, cut off at bottom of frame ⟫


========== IMG_3420.md ==========
---
photo: IMG_3420.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 21-52
orientation: 180
confidence: high
notes: Same file/tab as IMG_3418/3419, scrolled slightly further. Light ghosting, legible. Lines 21-47 duplicate IMG_3418/3419 content (not re-transcribed, see those). New content: lines 48-52, start of FinalButtonState interface. Status bar: 2 errors, 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
40   export interface NormalizedButton {
     ⟪? — lines 41-47 duplicate IMG_3419, see that transcript ⟫
48   }
49   /** Final computed button state */
50   export interface FinalButtonState {
51       matchcode: string;
52       text: string;
     ⟪? — continues beyond bottom of frame ⟫


========== IMG_3421.md ==========
---
photo: IMG_3421.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 40-68
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3418-3420, scrolled slightly further. Light-to-moderate ghosting. Lines 40-53 duplicate earlier photos (see IMG_3419/3420). New content: lines 54-67 (end of FinalButtonState interface, start of a "Constants" section with a JSDoc comment about validation-affected buttons). CORRECTION: line 68 was cut off/misread here as an echo of line 65; IMG_3422 (clearer, same file further scrolled) shows line 68 is actually just "*" (blank JSDoc line), followed by 69 "* Mirrors VBS logic: Case \"DTAOK\", \"DTANEXT\", \"DTAOKSPECIAL\"" and 70 "*/" — see IMG_3422 transcript for the authoritative continuation. Status bar: 2 errors, 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
50   export interface FinalButtonState {
     ⟪? — lines 51-53 duplicate IMG_3420, see that transcript ⟫
54       visible: boolean;
55       utporder: number;
56       /** Whether this button's disabled state was overridden by validation */
57       disabledByValidation: boolean;
58   }
59
60   // ---------------------------------------------------------------------
61   // Constants
62   // ---------------------------------------------------------------------
63
64   /**
65    * Buttons that are affected by required-field validation.
66    * When all required fields are filled, these buttons are enabled.
67    * Others maintain their API disabled state.
     (line 68 onward corrected/continued in IMG_3422 — see that transcript)


========== IMG_3422.md ==========
---
photo: IMG_3422.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 40-76
orientation: 180
confidence: high
notes: Same file/tab as IMG_3418-3421, scrolled slightly further. Lines 40-67 duplicate earlier photos (see IMG_3419/3420/3421). New/corrected content: lines 68-76, sharp and clear. This resolves IMG_3421's uncertain line 68 (it is a blank JSDoc continuation line "*", not a repeat of line 65). Status bar: 2 errors, 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
64   /**
65    * Buttons that are affected by required-field validation.
66    * When all required fields are filled, these buttons are enabled.
67    * Others maintain their API disabled state.
68    *
69    * Mirrors VBS logic: Case "DTAOK", "DTANEXT", "DTAOKSPECIAL"
70    */
71   export const BUTTONS_AFFECTED_BY_VALIDATION = new Set(['OK', 'NEXT', 'OKSPECIAL', 'SUBMIT']);
72
73   /**
74    * Default order for buttons without explicit @utporder.
75    * Determines render order. Lower numbers render first.
76    *
     ⟪? — comment continues beyond bottom of frame ⟫


========== IMG_3423.md ==========
---
photo: IMG_3423.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 77-97
orientation: 180
confidence: high
notes: Same file/tab as IMG_3418-3422, scrolled further; continues directly from IMG_3422 (which ended mid-comment at line 76 "Priority order:"). Moderate ghosting on lines 88-92 (cross-checked via sequential value ordering 3,4,5,6,7 which resolves cleanly) but overall high confidence. Status bar: 2 errors, 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
73   /**
74    * Default order for buttons without explicit @utporder.
75    * Determines render order. Lower numbers render first.
76    *
77    * Priority order:
78    * 1. NEXT (1)
79    * 2. OK (2)
80    * 3. CANCEL (3)
81    * 4. Other validation-affected buttons
82    * 5. Other buttons
83    * 6. Static/header buttons (HEADERBTN1, etc.)
84   */
85   const DEFAULT_BUTTON_ORDER: Record<string, number> = {
86       NEXT: 1,
87       OK: 2,
88       CANCEL: 3,
89       OKSPECIAL: 4,
90       SUBMIT: 5,
91       SAVE: 6,
92       APPLY: 7,
93       ADD: 10,
94       DELETE: 11,
95       SEARCH: 20,
96       SET_SEARCH: 21,
97       RATE: 22,
     ⟪? — continues beyond bottom of frame ⟫


========== IMG_3424.md ==========
---
photo: IMG_3424.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 80-110
orientation: 180
confidence: high
notes: Photo has motion-blur "ghosting" (text appears double, offset ~2 lines vertically) — transcribed from the sharp layer aligned with the gutter line numbers, ghost duplicate ignored. Breadcrumb: aqs-web-ui > src > utils > button-state-manager.ts. Tab open: button-state-manager.ts (only tab visible). Explorer sidebar visible: AQS_WORKSPACE > aqs-web-ui > src > providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts, modified marker "U"), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payload..., button-state-manager.ts [selected/highlighted], check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Lines 111-113 begin to appear at the very bottom edge but are illegible (cut off by screen bottom / ghosting) — not transcribed.
---
80	 * 3. CANCEL (3)
81	 * 4. Other validation-affected buttons
82	 * 5. Other buttons
83	 * 6. Static/header buttons (HEADERBTN1, etc.)
84	 */
85	const DEFAULT_BUTTON_ORDER: Record<string, number> = {
86		NEXT: 1,
87		OK: 2,
88		CANCEL: 3,
89		OKSPECIAL: 4,
90		SUBMIT: 5,
91		SAVE: 6,
92		APPLY: 7,
93		ADD: 10,
94		DELETE: 11,
95		SEARCH: 20,
96		SET_SEARCH: 21,
97		RATE: 22,
98		BACK: 80,
99		RESET: 81,
100		CLEAR: 82,
101		HEADERBTN1: 100,
102		PATHUPDATE: 100,
103	};
104	
105	// ------------------------------------------------------------
106	// Helper Functions
107	// ------------------------------------------------------------
108	
109	/**
110	 * Convert string flag to boolean


========== IMG_3425.md ==========
---
photo: IMG_3425.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 102-133
orientation: 180
confidence: high
notes: Continuation of same file/scroll position as IMG_3424, scrolled further down (sticky-scroll header at top shows enclosing scope "const DEFAULT_BUTTON_ORDER: Record<string, number> = {" from line 85). Photo has motion-blur ghosting (duplicate offset text) — transcribed from sharp/gutter-aligned layer. Same tab/breadcrumb/sidebar/status bar as IMG_3424 (button-state-manager.ts selected, branch hitanshu/experimental*, 2 errors/0 warnings, No Solution). Lines 132-134 are at the very bottom edge of the screen and mostly illegible due to ghosting/cutoff — line 132 appears blank, line 133 begins a comment divider but content beyond is not confidently legible.
---
[sticky scroll] 85	const DEFAULT_BUTTON_ORDER: Record<string, number> = {

102		PATHUPDATE: 100,
103	};
104	
105	// ------------------------------------------------------------
106	// Helper Functions
107	// ------------------------------------------------------------
108	
109	/**
110	 * Convert string flag to boolean
111	 * Matches API convention: "T"/"F", "1"/"0", "true"/"false"
112	 */
113	function flagToBool(value: unknown, defaultValue = false): boolean {
114		if (value === undefined || value === null || value === '') return defaultValue;
115		if (typeof value === 'boolean') return value;
116		const str = String(value).trim().toUpperCase();
117		return str === 'T' || str === 'TRUE' || str === '1' || str === 'Y';
118	}
119	
120	/**
121	 * Get default order for a button
122	 * Used when @utporder is not specified
123	 */
124	function getDefaultOrder(matchcode: string): number {
125		const upper = matchcode.toUpperCase();
126		return DEFAULT_BUTTON_ORDER[upper] ?? 50;
127	}
128	
129	// ------------------------------------------------------------
130	// Core Extraction & Normalization
131	// ------------------------------------------------------------
132	
133	⟪?⟫


========== IMG_3426.md ==========
---
photo: IMG_3426.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 106-136
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3425. Photo has motion-blur ghosting (duplicate offset text) — transcribed from sharp/gutter-aligned layer. Same tab/breadcrumb/sidebar/status bar as prior photos in this file (button-state-manager.ts selected in Explorer under aqs-web-ui/src/utils; branch hitanshu/experimental*, 2 errors/0 warnings, No Solution, TypeScript, CRLF, UTF-8, Tab Size 4). Lines 133-136 (start of extractButtons JSDoc) are near the bottom edge with heavy ghosting and could not be reliably disambiguated from this photo alone — see IMG_3427 which shows the same JSDoc block (lines 134-141) clearly and is the authoritative transcription for that content.
---
106	// Helper Functions
107	// ------------------------------------------------------------
108	
109	/**
110	 * Convert string flag to boolean
111	 * Matches API convention: "T"/"F", "1"/"0", "true"/"false"
112	 */
113	function flagToBool(value: unknown, defaultValue = false): boolean {
114		if (value === undefined || value === null || value === '') return defaultValue;
115		if (typeof value === 'boolean') return value;
116		const str = String(value).trim().toUpperCase();
117		return str === 'T' || str === 'TRUE' || str === '1' || str === 'Y';
118	}
119	
120	/**
121	 * Get default order for a button
122	 * Used when @utporder is not specified
123	 */
124	function getDefaultOrder(matchcode: string): number {
125		const upper = matchcode.toUpperCase();
126		return DEFAULT_BUTTON_ORDER[upper] ?? 50;
127	}
128	
129	// ------------------------------------------------------------
130	// Core Extraction & Normalization
131	// ------------------------------------------------------------
132	
133-136	⟪?⟫ (JSDoc for extractButtons begins here; heavy ghosting makes exact line assignment unreliable in this photo — see IMG_3427 for clear transcription of this block)


========== IMG_3427.md ==========
---
photo: IMG_3427.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 122-154
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3426; shows start of extractButtons() function. Photo has motion-blur ghosting (duplicate offset text) — transcribed from sharp/gutter-aligned layer. Same tab/breadcrumb/sidebar/status bar as prior photos (button-state-manager.ts selected; branch hitanshu/experimental*, 2 errors/0 warnings, No Solution, TypeScript). Line 155 begins at the very bottom edge (".map((ctrl) => {" / "matchcode" visible) but is too faint/cut off to transcribe reliably.
---
122	 * Get default order for a button
123	 * Used when @utporder is not specified
124	 */
125	function getDefaultOrder(matchcode: string): number {
126		const upper = matchcode.toUpperCase();
127		return DEFAULT_BUTTON_ORDER[upper] ?? 50;
128	}
129	
130	// ------------------------------------------------------------
131	// Core Extraction & Normalization
132	// ------------------------------------------------------------
133	
134	/**
135	 * Extract button controls from raw controls array.
136	 * Filters only controls where @controltype === "button".
137	 *
138	 * @param controls - Raw controls array from API (pageBuild.Page.controls.control)
139	 * @returns Normalized button controls
140	 */
141	export function extractButtons(controls: RawButtonControl[]): NormalizedButton[] {
142		if (!controls || !Array.isArray(controls)) return [];
143	
144		return (
145			controls
146				// Filter only button controls
147				.filter((ctrl) => {
148					const controlType = (ctrl['@controltype'] || '').toLowerCase();
149					return controlType === 'button';
150				})
151				// Normalize each button
152				.map((ctrl) => {
153					const matchcode = (ctrl['@matchcode'] || '').toUpperCase().trim();
154					return {


========== IMG_3428.md ==========
---
photo: IMG_3428.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 135-167
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3427; shows the object literal returned by extractButtons()'s .map() and the start of the computeButtonStates JSDoc. Photo has motion-blur ghosting (duplicate offset text) — transcribed from sharp/gutter-aligned layer. Lines 135-154 repeat content already captured more centrally in IMG_3427 (cross-validated, consistent). Line number for the trailing "/**" corrected to 167 (not 168) after cross-referencing the unambiguous bold gutter numbers in IMG_3430/IMG_3431 (there is no blank line between the closing "}" at 166 and "/**"). Same tab/breadcrumb/sidebar/status bar as prior photos (button-state-manager.ts selected; branch hitanshu/experimental*, 2 errors/0 warnings, No Solution, TypeScript).
---
135	 * Extract button controls from raw controls array.
136	 * Filters only controls where @controltype === "button".
137	 *
138	 * @param controls - Raw controls array from API (pageBuild.Page.controls.control)
139	 * @returns Normalized button controls
140	 */
141	export function extractButtons(controls: RawButtonControl[]): NormalizedButton[] {
142		if (!controls || !Array.isArray(controls)) return [];
143	
144		return (
145			controls
146				// Filter only button controls
147				.filter((ctrl) => {
148					const controlType = (ctrl['@controltype'] || '').toLowerCase();
149					return controlType === 'button';
150				})
151				// Normalize each button
152				.map((ctrl) => {
153					const matchcode = (ctrl['@matchcode'] || '').toUpperCase().trim();
154					return {
155						matchcode,
156						text: (ctrl['@text'] as string) || matchcode,
157						disabled: flagToBool(ctrl['@disabled']),
158						visible: flagToBool(ctrl['@visible'], true), // Default visible=true if not specified
159						utporder: Number(ctrl['@utporder'] ?? getDefaultOrder(matchcode)),
160						raw: ctrl,
161					};
162				})
163				// Filter out buttons with empty matchcode
164				.filter((btn) => btn.matchcode.length > 0)
165		);
166	}
167	/**


========== IMG_3429.md ==========
---
photo: IMG_3429.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 141-184
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3428. Sticky-scroll header at top shows enclosing scope "export function extractButtons(controls: RawButtonControl[]): NormalizedButton[] {" (line 141). Lines 150-166 repeat content already captured in IMG_3428 (cross-validated, consistent — the object literal returned by extractButtons()'s .map()). Heavy motion-blur ghosting throughout; the computeButtonStates JSDoc rules list (167-184) was initially transcribed with uncertain line numbers but has since been cross-validated and corrected against the unambiguous bold gutter numbers in IMG_3430/IMG_3431 (same block, clearer photo) — numbering below is now high-confidence. Same tab/sidebar/status bar as prior photos (button-state-manager.ts selected; branch hitanshu/experimental*, 2 errors/0 warnings, No Solution, TypeScript).
---
[sticky scroll] 141	export function extractButtons(controls: RawButtonControl[]): NormalizedButton[] {

150			})
151			// Normalize each button
152			.map((ctrl) => {
153				const matchcode = (ctrl['@matchcode'] || '').toUpperCase().trim();
154				return {
155					matchcode,
156					text: (ctrl['@text'] as string) || matchcode,
157					disabled: flagToBool(ctrl['@disabled']),
158					visible: flagToBool(ctrl['@visible'], true), // Default visible=true if not specified
159					utporder: Number(ctrl['@utporder'] ?? getDefaultOrder(matchcode)),
160					raw: ctrl,
161				};
162			})
163			// Filter out buttons with empty matchcode
164			.filter((btn) => btn.matchcode.length > 0)
165	);
166	}
167	/**
168	 * Compute final button states based on validation and visibility.
169	 * Rules:
170	 * - If button is NOT visible (@visible="F"): keep it hidden and disabled
171	 *   - If allRequiredFilled=true: override disabled to false
172	 *   - If allRequiredFilled=false: keep disabled as true
173	 * - If button IS visible (@visible="T"):
174	 *   - If button is in BUTTONS_AFFECTED_BY_VALIDATION (OK, NEXT, etc.):
175	 *     - If allRequiredFilled=true: override disabled to false
176	 *     - If allRequiredFilled=false: keep disabled state from API
177	 *   - If button is NOT in BUTTONS_AFFECTED_BY_VALIDATION (CANCEL, etc.):
178	 *     - Keep disabled state from API
179	 *
180	 * @param buttons - Normalized buttons from extractButtons()
181	 * @param allRequiredFilled - Whether all required fields have values
182	 * @returns Final button states with override information
183	 */
184	export function computeButtonStates(


========== IMG_3430.md ==========
---
photo: IMG_3430.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 167-201
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3429; shows the full computeButtonStates() JSDoc and the start of its body (validation-override branch). Photo has motion-blur ghosting (duplicate offset text) — transcribed from sharp/gutter-aligned layer, cross-validated against IMG_3429 and IMG_3431 (overlapping ranges, consistent; anchored on the unambiguous bold gutter numbers 177-187 visible in this photo and IMG_3431). Same tab/breadcrumb/sidebar/status bar as prior photos (button-state-manager.ts selected; branch hitanshu/experimental*, 2 errors/0 warnings, No Solution, TypeScript). Lines below 201 continue in IMG_3431.
---
167	/**
168	 * Compute final button states based on validation and visibility.
169	 * Rules:
170	 * - If button is NOT visible (@visible="F"): keep it hidden and disabled
171	 *   - If allRequiredFilled=true: override disabled to false
172	 *   - If allRequiredFilled=false: keep disabled as true
173	 * - If button IS visible (@visible="T"):
174	 *   - If button is in BUTTONS_AFFECTED_BY_VALIDATION (OK, NEXT, etc.):
175	 *     - If allRequiredFilled=true: override disabled to false
176	 *     - If allRequiredFilled=false: keep disabled state from API
177	 *   - If button is NOT in BUTTONS_AFFECTED_BY_VALIDATION (CANCEL, etc.):
178	 *     - Keep disabled state from API
179	 *
180	 * @param buttons - Normalized buttons from extractButtons()
181	 * @param allRequiredFilled - Whether all required fields have values
182	 * @returns Final button states with override information
183	 */
184	export function computeButtonStates(
185		buttons: NormalizedButton[],
186		allRequiredFilled: boolean,
187	): FinalButtonState[] {
188		return buttons.map((btn) => {
189			let finalDisabled = btn.disabled;
190			let disabledByValidation = false;
191	
192			// Only apply validation logic if button is visible
193			if (btn.visible && BUTTONS_AFFECTED_BY_VALIDATION.has(btn.matchcode)) {
194				// Button is affected by validation
195				finalDisabled = !allRequiredFilled;
196				disabledByValidation = true;
197	
198				console.debug('[ButtonStateManager] Validation override applied', {
199					matchcode: btn.matchcode,
200					allRequiredFilled,
201					apiDisabled: btn.disabled,


========== IMG_3431.md ==========
---
photo: IMG_3431.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 177-210
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3430 (large overlap, cross-validated and consistent — this photo has the clearest/most unambiguous bold gutter numbers of the sequence and was used to correct line numbers in IMG_3428/3429/3430). Shows the rest of the computeButtonStates() JSDoc, its signature, and the body through the start of the return object. Photo has motion-blur ghosting (duplicate offset text) — transcribed from sharp/gutter-aligned layer. Same tab/breadcrumb/sidebar/status bar as prior photos (button-state-manager.ts selected; branch hitanshu/experimental*, 2 errors/0 warnings, No Solution, TypeScript). Content continues past line 210, cut off at bottom edge.
---
177		 *   - If button is NOT in BUTTONS_AFFECTED_BY_VALIDATION (CANCEL, etc.):
178		 *     - Keep disabled state from API
179		 *
180		 * @param buttons - Normalized buttons from extractButtons()
181		 * @param allRequiredFilled - Whether all required fields have values
182		 * @returns Final button states with override information
183		 */
184	export function computeButtonStates(
185		buttons: NormalizedButton[],
186		allRequiredFilled: boolean,
187	): FinalButtonState[] {
188		return buttons.map((btn) => {
189			let finalDisabled = btn.disabled;
190			let disabledByValidation = false;
191	
192			// Only apply validation logic if button is visible
193			if (btn.visible && BUTTONS_AFFECTED_BY_VALIDATION.has(btn.matchcode)) {
194				// Button is affected by validation
195				finalDisabled = !allRequiredFilled;
196				disabledByValidation = true;
197	
198				console.debug('[ButtonStateManager] Validation override applied', {
199					matchcode: btn.matchcode,
200					allRequiredFilled,
201					apiDisabled: btn.disabled,
202					finalDisabled,
203				});
204			}
205	
206			return {
207				matchcode: btn.matchcode,
208				text: btn.text,
209				disabled: finalDisabled,
210				visible: btn.visible,


========== IMG_3432.md ==========
---
photo: IMG_3432.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 190-223
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3431 (large overlap, consistent). Sticky-scroll header at top shows two enclosing scopes: "export function computeButtonStates(" (line 184) and "return buttons.map((btn) => {" (line 188). Shows the rest of computeButtonStates() body and the start of the computeButtonOverridesMap() JSDoc. Photo has motion-blur ghosting (duplicate offset text) — transcribed from sharp/gutter-aligned layer. Same tab/breadcrumb/sidebar/status bar as prior photos (button-state-manager.ts selected; branch hitanshu/experimental*, 2 errors/0 warnings, No Solution, TypeScript).
---
[sticky scroll] 184	export function computeButtonStates(
[sticky scroll] 188		return buttons.map((btn) => {

190			let disabledByValidation = false;
191	
192			// Only apply validation logic if button is visible
193			if (btn.visible && BUTTONS_AFFECTED_BY_VALIDATION.has(btn.matchcode)) {
194				// Button is affected by validation
195				finalDisabled = !allRequiredFilled;
196				disabledByValidation = true;
197	
198				console.debug('[ButtonStateManager] Validation override applied', {
199					matchcode: btn.matchcode,
200					allRequiredFilled,
201					apiDisabled: btn.disabled,
202					finalDisabled,
203				});
204			}
205	
206			return {
207				matchcode: btn.matchcode,
208				text: btn.text,
209				disabled: finalDisabled,
210				visible: btn.visible,
211				utporder: btn.utporder,
212				disabledByValidation,
213			};
214		});
215	}
216	
217	/**
218	 * Convert final button states to ActionButtons override map format.
219	 *
220	 * @param finalStates - Final button states from computeButtonStates()
221	 * @returns Override map keyed by matchcode
222	 */
223	export function computeButtonOverridesMap(


========== IMG_3433.md ==========
---
photo: IMG_3433.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 206-236
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3432 (large overlap, consistent). Sticky-scroll header at top shows two enclosing scopes: "export function computeButtonStates(" (line 184) and "return buttons.map((btn) => {" (line 188) — stale/leftover from the scroll position, the actual visible body is computeButtonOverridesMap(). Shows the end of computeButtonStates() and the full body of computeButtonOverridesMap(), which appears to be the end of the file (line 236 is the last visible line, no further content below it before the status bar). Photo has motion-blur ghosting (duplicate offset text) — transcribed from sharp/gutter-aligned layer. Same tab/breadcrumb/sidebar/status bar as prior photos (button-state-manager.ts selected; branch hitanshu/experimental*, 2 errors/0 warnings, No Solution, TypeScript).
---
[sticky scroll] 184	export function computeButtonStates(
[sticky scroll] 188		return buttons.map((btn) => {

206			return {
207				matchcode: btn.matchcode,
208				text: btn.text,
209				disabled: finalDisabled,
210				visible: btn.visible,
211				utporder: btn.utporder,
212				disabledByValidation,
213			};
214		});
215	}
216	
217	/**
218	 * Convert final button states to ActionButtons override map format.
219	 *
220	 * @param finalStates - Final button states from computeButtonStates()
221	 * @returns Override map keyed by matchcode
222	 */
223	export function computeButtonOverridesMap(
224		finalStates: FinalButtonState[],
225	): Record<string, ButtonOverride> {
226		const map: Record<string, ButtonOverride> = {};
227	
228		for (const state of finalStates) {
229			map[state.matchcode] = {
230				disabled: state.disabled,
231				visible: state.visible,
232			};
233		}
234	
235		return map;
236	}


========== IMG_3434.md ==========
---
photo: IMG_3434.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 231-262
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3433 (overlap, consistent). Shows the end of computeButtonOverridesMap() and the full sortButtonsByOrder() function (a generic helper). Photo has lighter motion-blur ghosting than earlier photos in this set; content is clearly legible and gutter numbers largely unambiguous. Same tab/breadcrumb/sidebar/status bar as prior photos (button-state-manager.ts selected; branch hitanshu/experimental*, 2 errors/0 warnings, No Solution, TypeScript).
---
231		visible: state.visible,
232	};
233	}
234	
235	return map;
236	}
237	
238	/**
239	 * Sort buttons by utporder for rendering.
240	 * Buttons with explicit @utporder come first (sorted by value),
241	 * then buttons with default order (sorted by defaultOrder).
242	 *
243	 * @param buttons - Buttons to sort
244	 * @returns Sorted buttons
245	 */
246	export function sortButtonsByOrder<T extends { utporder: number }>(buttons: T[]): T[] {
247		return [...buttons].sort((a, b) => {
248			const aExplicit = 'raw' in a ? (a as any).raw['@utporder'] != null : false;
249			const bExplicit = 'raw' in b ? (b as any).raw['@utporder'] != null : false;
250	
251			// Explicit orders come first
252			if (aExplicit && !bExplicit) return -1;
253			if (!aExplicit && bExplicit) return 1;
254	
255			// Same group: compare utporder
256			return a.utporder - b.utporder;
257		});
258	}
259	
260	// ------------------------------------------------------------
261	// Comprehensive Processing
262	// ------------------------------------------------------------


========== IMG_3435.md ==========
---
photo: IMG_3435.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 241-273
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3434 (overlap, consistent). Shows the rest of sortButtonsByOrder(), the "Comprehensive Processing" section divider, and the start of the processButtonsForRendering() JSDoc + signature — the last content visible before the bottom of the screen (photo cuts off mid-parameter-list at line 273; unclear if this is near end of file). Photo has light motion-blur ghosting. On line 263 a faint "}" glyph appears between the comment-divider block and the next JSDoc's "/**" — this looks like a ghosting artifact (bleed-through of the "}" from line 258) rather than real code, since a bare "}" there would not be syntactically sensible; treated as blank in this transcript. Similarly, on lines 272-273 the JSDoc's "@param" description text ("from API", "Whether all required fields have values") bleeds through faintly onto the parameter declaration lines — not transcribed as it is not real code, just ghosting of the lines above. Same tab/breadcrumb/sidebar/status bar as prior photos (button-state-manager.ts selected; branch hitanshu/experimental*, 2 errors/0 warnings, No Solution, TypeScript).
---
241	 * then buttons with default order (sorted by defaultOrder).
242	 *
243	 * @param buttons - Buttons to sort
244	 * @returns Sorted buttons
245	 */
246	export function sortButtonsByOrder<T extends { utporder: number }>(buttons: T[]): T[] {
247		return [...buttons].sort((a, b) => {
248			const aExplicit = 'raw' in a ? (a as any).raw['@utporder'] != null : false;
249			const bExplicit = 'raw' in b ? (b as any).raw['@utporder'] != null : false;
250	
251			// Explicit orders come first
252			if (aExplicit && !bExplicit) return -1;
253			if (!aExplicit && bExplicit) return 1;
254	
255			// Same group: compare utporder
256			return a.utporder - b.utporder;
257		});
258	}
259	
260	// ------------------------------------------------------------
261	// Comprehensive Processing
262	// ------------------------------------------------------------
263	
264	/**
265	 * All-in-one function to extract, normalize, compute states, and generate overrides.
266	 *
267	 * @param controls - Raw controls from API
268	 * @param allRequiredFilled - Whether all required fields have values
269	 * @returns Object containing buttons, final states, and override map
270	 */
271	export function processButtonsForRendering(
272		controls: RawButtonControl[],
273		allRequiredFilled: boolean,


========== IMG_3436.md ==========
---
photo: IMG_3436.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 246-289
orientation: 180
confidence: medium
notes: Photo has motion-blur/double-exposure ghosting throughout (two slightly offset scroll-position frames overlaid), worst around lines 247-258 where a sticky-scroll boundary sits. Lines 247-256 are not visible at all (scrolled off under the sticky header showing line 246). Line 257's content is illegible/conflated with ghost text; only "});" is confidently legible there. Lines 264-289 are legible with high confidence (ghost text there duplicates identical content, so it reads clean). Explorer sidebar (src/aqs-web-ui tree) visible: providers/theme-provider.tsx, services/{lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts}, types/grid-response.ts, utils/{api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa...(truncated), button-state-manager.ts (selected/highlighted), check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts}. Tab bar shows only button-state-manager.ts open. Status bar: branch hitanshu/experimental*, "2 ⚠0", "No Solution" badge, TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1. Timestamp 6:18 PM 7/10/2026 in taskbar.
---
246: export function sortButtonsByOrder<T extends { utporder: number }>(buttons: T[]): T[] {
247: ⟪?⟫ (not visible — hidden under sticky-scroll header)
248: ⟪?⟫ (not visible — hidden under sticky-scroll header)
249: ⟪?⟫ (not visible — hidden under sticky-scroll header)
250: ⟪?⟫ (not visible — hidden under sticky-scroll header)
251: ⟪?⟫ (not visible — hidden under sticky-scroll header)
252: ⟪?⟫ (not visible — hidden under sticky-scroll header)
253: ⟪?⟫ (not visible — hidden under sticky-scroll header)
254: ⟪?⟫ (not visible — hidden under sticky-scroll header)
255: ⟪?⟫ (not visible — hidden under sticky-scroll header)
256: ⟪?⟫ (not visible — hidden under sticky-scroll header)
257:     });
258: }
259:
260: // ---------------------------------------------------------------------------
261: // Comprehensive Processing
262: // ---------------------------------------------------------------------------
263:
264: /**
265:  * All-in-one function to extract, normalize, compute states, and generate overrides.
266:  *
267:  * @param controls - Raw controls from API
268:  * @param allRequiredFilled - Whether all required fields have values
269:  * @returns Object containing buttons, final states, and override map
270:  */
271: export function processButtonsForRendering(
272:     controls: RawButtonControl[],
273:     allRequiredFilled: boolean,
274: ) {
275:     // Step 1: Extract and normalize
276:     const buttons = extractButtons(controls);
277:
278:     // Step 2: Compute final states
279:     const finalStates = computeButtonStates(buttons, allRequiredFilled);
280:
281:     // Step 3: Sort by order
282:     const sortedButtons = sortButtonsByOrder(buttons);
283:     const sortedFinalStates = sortButtonsByOrder(finalStates);
284:
285:     // Step 4: Generate override map
286:     const buttonOverrides = computeButtonOverridesMap(finalStates);
287:
288:     // Step 5: Debug logging
289:     console.group('[ButtonStateManager] Button Processing Complete');


========== IMG_3437.md ==========
---
photo: IMG_3437.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 269-302
orientation: 180
confidence: high
notes: Same motion-blur/double-exposure ghosting as IMG_3436 (two slightly offset scroll-position frames overlaid), but here the ghost text duplicates identical content one sticky-scroll frame apart, so the sharp/bold foreground text is fully legible. Sticky-scroll header at top pins the end of the JSDoc block (lines 269-270) and the function signature (271) while content below scrolls. Explorer sidebar identical to IMG_3436 (button-state-manager.ts highlighted). Only tab open: button-state-manager.ts. Status bar: branch hitanshu/experimental*, "2 ⚠0", "No Solution", TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1. Timestamp 6:18 PM 7/10/2026.
---
269:  * @returns Object containing buttons, final states, and override map
270:  */
271: export function processButtonsForRendering(
272:     controls: RawButtonControl[],
273:     allRequiredFilled: boolean,
274: ) {
275:     // Step 1: Extract and normalize
276:     const buttons = extractButtons(controls);
277:
278:     // Step 2: Compute final states
279:     const finalStates = computeButtonStates(buttons, allRequiredFilled);
280:
281:     // Step 3: Sort by order
282:     const sortedButtons = sortButtonsByOrder(buttons);
283:     const sortedFinalStates = sortButtonsByOrder(finalStates);
284:
285:     // Step 4: Generate override map
286:     const buttonOverrides = computeButtonOverridesMap(finalStates);
287:
288:     // Step 5: Debug logging
289:     console.group('[ButtonStateManager] Button Processing Complete');
290:     console.log('Extracted buttons:', buttons.length);
291:     console.log('All required filled:', allRequiredFilled);
292:     console.table(
293:         finalStates.map((state) => ({
294:             Matchcode: state.matchcode,
295:             Text: state.text,
296:             Visible: state.visible ? '✓' : 'X',
297:             Disabled: state.disabled ? '✓' : 'X',
298:             'Validation Override': state.disabledByValidation ? '✓' : '-',
299:             Order: state.utporder,
300:         }))
301:     );
302:     console.groupEnd();


========== IMG_3438.md ==========
---
photo: IMG_3438.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 284-315
orientation: 180
confidence: high
notes: Sticky-scroll header pins line 271 "export function processButtonsForRendering(" at top. Mild motion-blur/double-exposure ghosting throughout (same artifact as IMG_3436/3437) but foreground text is sharp and unambiguous; verified exact gutter-to-text alignment via cropped zoom. Line 315 is cut off at the very bottom edge of the visible editor area (above the status bar), content not legible. Explorer sidebar identical to prior photos in this sequence (button-state-manager.ts highlighted, same file tree). Only tab open: button-state-manager.ts. Status bar: branch hitanshu/experimental*, "2 ⚠0", "No Solution", TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1. Timestamp 6:18 PM 7/10/2026.
---
271: export function processButtonsForRendering( [sticky-scroll header]
284:
285:     // Step 4: Generate override map
286:     const buttonOverrides = computeButtonOverridesMap(finalStates);
287:
288:     // Step 5: Debug logging
289:     console.group('[ButtonStateManager] Button Processing Complete');
290:     console.log('Extracted buttons:', buttons.length);
291:     console.log('All required filled:', allRequiredFilled);
292:     console.table(
293:         finalStates.map((state) => ({
294:             Matchcode: state.matchcode,
295:             Text: state.text,
296:             Visible: state.visible ? '✓' : 'X',
297:             Disabled: state.disabled ? '✓' : 'X',
298:             'Validation Override': state.disabledByValidation ? '✓' : '-',
299:             Order: state.utporder,
300:         })),
301:     );
302:     console.groupEnd();
303:
304:     return {
305:         buttons: sortedButtons,
306:         finalStates: sortedFinalStates,
307:         buttonOverrides,
308:         visibleButtons: finalStates.filter((btn) => btn.visible),
309:     };
310: }
311:
312: // ---------------------------------------------------------------------------
313: // PageBuildButton Integration (for form-renderer)
314: // ---------------------------------------------------------------------------
315: ⟪?⟫ (cut off at bottom edge of visible editor area)


========== IMG_3439.md ==========
---
photo: IMG_3439.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 299-331
orientation: 180
confidence: medium
notes: Same motion-blur/double-exposure ghosting as prior photos in this sequence. Sticky-scroll header pins line 271 "export function processButtonsForRendering(" at top (that function's body is out of view; this photo is scrolled down to the next function, computePageBuildButtonOverrides). Lines 299-311 duplicate content already captured with high confidence in IMG_3438 (end of processButtonsForRendering) — reproduced here at lower confidence only for continuity, ghosting made exact re-verification difficult. Lines 312-325 (section banner + JSDoc block for computePageBuildButtonOverrides) verified via zoomed crop, medium-high confidence. Lines 326-331 (function signature + inline object-array param type) cross-verified against IMG_3440's cleaner crop of the same lines and corrected accordingly (buttons: Array<{ matchcode/text/disabled/visible }>). Same file tree/explorer and status bar as IMG_3438 (branch hitanshu/experimental*, "2 ⚠0", No Solution, TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 6:18 PM 7/10/2026).
---
271: export function processButtonsForRendering( [sticky-scroll header, body out of view below]
299:     Order: state.utporder,
300:     })),
301:     );
302:     console.groupEnd();
303:
304:     return {
305:         buttons: sortedButtons,
306:         finalStates: sortedFinalStates,
307:         buttonOverrides,
308:         visibleButtons: finalStates.filter((btn) => btn.visible),
309:     };
310: }
311:
312: // ---------------------------------------------------------------------------
313: // PageBuildButton Integration (for form-renderer)
314: // ---------------------------------------------------------------------------
315:
316: /**
317:  * Compute button overrides from PageBuildButton array (already parsed from API).
318:  * Simpler than processButtonsForRendering since these buttons are already normalized.
319:  *
320:  * This is the main entry point for form-renderer.tsx integration.
321:  *
322:  * @param buttons - PageBuildButton array from API response
323:  * @param allRequiredFilled - Whether all required fields have values
324:  * @returns Override map for ActionButtons component
325:  */
326: export function computePageBuildButtonOverrides(
327:     buttons: Array<{
328:         matchcode: string;
329:         text: string;
330:         disabled: boolean;
331:         visible: boolean;


========== IMG_3440.md ==========
---
photo: IMG_3440.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 307-339
orientation: 180
confidence: high
notes: Same motion-blur/double-exposure ghosting as prior photos in this sequence; verified the function-signature block (lines ~325-339 in this photo's own frame) via a tight zoom crop, which resolved earlier ambiguity from IMG_3439 about the inline object-array param shape (matchcode/text/disabled/visible, in that order). JSDoc line numbers 316-325 reused from IMG_3439's dedicated crop verification (not independently re-cropped in this photo) since the two photos show overlapping scroll positions of the same block; a 1-line indexing discrepancy between this photo's own gutter and IMG_3439's was reconciled in favor of the IMG_3439 crop (10-line JSDoc block, two blank "*" separator lines). Sticky-scroll header pins line 271 "export function processButtonsForRendering(" at top (out of view; scrolled to computePageBuildButtonOverrides). Explorer sidebar/status bar same as prior photos (branch hitanshu/experimental*, "2 ⚠0", No Solution, TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 6:18 PM 7/10/2026).
---
271: export function processButtonsForRendering( [sticky-scroll header, out of view below]
307:     buttonOverrides,
308:     visibleButtons: finalStates.filter((btn) => btn.visible),
309:     };
310: }
311:
312: // ---------------------------------------------------------------------------
313: // PageBuildButton Integration (for form-renderer)
314: // ---------------------------------------------------------------------------
315:
316: /**
317:  * Compute button overrides from PageBuildButton array (already parsed from API).
318:  * Simpler than processButtonsForRendering since these buttons are already normalized.
319:  *
320:  * This is the main entry point for form-renderer.tsx integration.
321:  *
322:  * @param buttons - PageBuildButton array from API response
323:  * @param allRequiredFilled - Whether all required fields have values
324:  * @returns Override map for ActionButtons component
325:  */
326: export function computePageBuildButtonOverrides(
327:     buttons: Array<{
328:         matchcode: string;
329:         text: string;
330:         disabled: boolean;
331:         visible: boolean;
332:     }>,
333:     allRequiredFilled: boolean,
334: ): Record<string, ButtonOverride> {
335:     const overrides: Record<string, ButtonOverride> = {};
336:
337:     for (const button of buttons) {
338:         // Normalize matchcode to uppercase for case-insensitive checks
339:         const matchcodeUpper = button.matchcode?.toUpperCase?.() || '';


========== IMG_3441.md ==========
---
photo: IMG_3441.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 326-349
orientation: 180
confidence: high
notes: Same motion-blur/double-exposure ghosting as prior photos; gutter/content alignment cross-verified against IMG_3440's crop for the overlapping lines 326-339 (exact match, high confidence). Sticky-scroll header pins line 326 "export function computePageBuildButtonOverrides(" at top. Explorer sidebar/status bar same as prior photos (branch hitanshu/experimental*, "2 ⚠0", No Solution, TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 6:18 PM 7/10/2026).
---
326: export function computePageBuildButtonOverrides( [sticky-scroll header]
327:     buttons: Array<{
328:         matchcode: string;
329:         text: string;
330:         disabled: boolean;
331:         visible: boolean;
332:     }>,
333:     allRequiredFilled: boolean,
334: ): Record<string, ButtonOverride> {
335:     const overrides: Record<string, ButtonOverride> = {};
336:
337:     for (const button of buttons) {
338:         // Normalize matchcode to uppercase for case-insensitive checks
339:         const matchcodeUpper = button.matchcode?.toUpperCase?.() || '';
340:
341:         // If button is not visible, keep it hidden and disabled
342:         if (!button.visible) {
343:             overrides[matchcodeUpper] = {
344:                 visible: false,
345:                 disabled: true,
346:             };
347:             continue;
348:         }
349: ⟪?⟫ (blank or start of next comment, cut off at bottom edge — continues in IMG_3442)


========== IMG_3442.md ==========
---
photo: IMG_3442.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 350-381
orientation: 180
confidence: high
notes: Much less ghosting than surrounding photos in this sequence — text is largely sharp and unambiguous. Sticky-scroll header pins line 326 "export function computePageBuildButtonOverrides(" at top. Explorer sidebar/status bar same as prior photos (branch hitanshu/experimental*, "2 ⚠0", No Solution, TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 6:19 PM 7/10/2026 — note time ticked over to 6:19 PM here vs 6:18 PM in earlier photos of this sequence).
---
326: export function computePageBuildButtonOverrides( [sticky-scroll header]
350:         // Button is visible - check if it should be enabled by validation
351:         // Use uppercase matchcode for consistent comparison with BUTTONS_AFFECTED_BY_VALIDATION
352:         const isAffectedByValidation = BUTTONS_AFFECTED_BY_VALIDATION.has(matchcodeUpper);
353:
354:         if (isAffectedByValidation) {
355:             // Button is affected by validation - disable if required fields are empty
356:             overrides[matchcodeUpper] = {
357:                 visible: true,
358:                 disabled: !allRequiredFilled, // Force disabled=true if required fields not filled
359:             };
360:         } else {
361:             // Button is not affected by validation - keep API state
362:             overrides[matchcodeUpper] = {
363:                 visible: true,
364:                 disabled: button.disabled,
365:             };
366:         }
367:     }
368:
369:     // Debug logging
370:     console.group('[ButtonStateManager] PageBuild Button Processing');
371:     console.log('Total buttons:', buttons.length);
372:     console.log('All required filled:', allRequiredFilled);
373:     console.table(
374:         buttons.map((btn) => {
375:             const matchcodeUpper = btn.matchcode?.toUpperCase?.() || '';
376:             const override = overrides[matchcodeUpper];
377:             const isAffected = BUTTONS_AFFECTED_BY_VALIDATION.has(matchcodeUpper);
378:             return {
379:                 Matchcode: btn.matchcode,
380:                 Text: btn.text,
381:                 Visible: override.visible ? '✓' : 'X',


========== IMG_3443.md ==========
---
photo: IMG_3443.JPG
type: vscode-code
file: aqs-web-ui/src/utils/button-state-manager.ts
lines: 365-392
orientation: 180
confidence: high
notes: Moderate motion-blur/double-exposure ghosting (same artifact as prior photos) but foreground text is legible with high confidence throughout. This appears to be the end of the file — line 391 closes computePageBuildButtonOverrides and line 392 is blank/EOF, no further content visible. Sticky-scroll header pins line 326 "export function computePageBuildButtonOverrides(" at top. Explorer sidebar/status bar same as prior photos (branch hitanshu/experimental*, "2 ⚠0", No Solution, TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 6:19 PM 7/10/2026).
---
326: export function computePageBuildButtonOverrides( [sticky-scroll header]
365:             };
366:         }
367:     }
368:
369:     // Debug logging
370:     console.group('[ButtonStateManager] PageBuild Button Processing');
371:     console.log('Total buttons:', buttons.length);
372:     console.log('All required filled:', allRequiredFilled);
373:     console.table(
374:         buttons.map((btn) => {
375:             const matchcodeUpper = btn.matchcode?.toUpperCase?.() || '';
376:             const override = overrides[matchcodeUpper];
377:             const isAffected = BUTTONS_AFFECTED_BY_VALIDATION.has(matchcodeUpper);
378:             return {
379:                 Matchcode: btn.matchcode,
380:                 Text: btn.text,
381:                 Visible: override.visible ? '✓' : 'X',
382:                 'API Disabled': btn.disabled ? '✓' : 'X',
383:                 'Final Disabled': override.disabled ? '✓' : 'X',
384:                 'Validation-Affected': isAffected ? '✓' : '-',
385:             };
386:         }),
387:     );
388:     console.groupEnd();
389:
390:     return overrides;
391: }
392: ⟪?⟫ (blank line at/near end of file)
