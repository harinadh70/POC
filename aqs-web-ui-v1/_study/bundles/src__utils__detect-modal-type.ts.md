# BUNDLE for src/utils/detect-modal-type.ts
# 14 photo fragment(s), ascending start-line order.


========== IMG_3570.md ==========
---
photo: IMG_3570.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 1-34
orientation: 180
confidence: high
notes: New tab opened (detect-modal-type.ts), replacing create-store.tsx from prior photos. Explorer sidebar shows same utils tree, now with detect-modal-type.ts selected/highlighted (below create-store.tsx). Status bar: aqs-web-ui, branch hitanshu/experimental*, "No Solution", 2 errors/0 warnings. Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript (not JSX, plain .ts). Line 34 is cut off at bottom of visible editor ("/** Explicit modal type from backend */") - partially obscured by status bar.
---
1   /**
2    * @file detect-modal-type.ts
3    * @description Pattern detection for modal dialog types
4    *
5    * Determines which modal pattern to use based on cycling response,
6    * xmlFilePath conventions, and PageBuild response analysis.
7    *
8    * @see modal-strategy-validation.md for modal type categories
9    */
10
11  import { createFeatureLogger } from '@/utils/logger-builder';
12
13  const logger = createFeatureLogger('util', 'DetectModalType');
14
15  // ========================================
16  // Types
17  // ========================================
18
19  /**
20   * Modal pattern types supported by the framework
21   */
22  export type ModalType =
23      | 'dataEntry'  // New/create modals - Three-API Pattern
24      | 'edit'  // Edit modals with field commits
25      | 'selection'  // Selection/lookup modals
26      | 'confirmation'  // Yes/No/Cancel dialogs
27      | 'info'  // Read-only information modals
28      | 'multiStep'  // Multi-step wizard modals
29      | 'fieldCommit';  // Modals with field-level commits
30
31  export interface ModalTypeDetectionInput {
32      /** Cycling response data */
33      cyclingResponse?: {
34          /** Explicit modal type from backend */


========== IMG_3571.md ==========
---
photo: IMG_3571.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 1-34
orientation: 180
confidence: low
notes: SEVERE MOTION BLUR / DOUBLE-EXPOSURE GHOSTING — the image shows two overlapping copies of the same editor view offset vertically by roughly one line, making most text doubled/illegible. Content matches IMG_3570 exactly (same file detect-modal-type.ts, same lines 1-34, same tab/breadcrumb, same explorer state, same status bar: 2 errors/0 warnings, No Solution, hitanshu/experimental*, 6:21 PM 7/10/2026). No new information beyond IMG_3570; transcription below reproduces the IMG_3570 content since line numbers and headers are confirmed identical, but the raw pixels for this specific photo are not independently legible beyond confirming line numbers/structure match. Treat IMG_3570 as the authoritative clean capture of this content.
---
Ghosted/double-exposed duplicate of IMG_3570 (same file, same visible line range). Legible anchors confirmed: line numbers 1-34, breadcrumb "aqs-web-ui > src > utils > detect-modal-type.ts", tab "detect-modal-type.ts".

1   /**
2    * @file detect-modal-type.ts
3    * @description Pattern detection for modal dialog types
4    *
5    * Determines which modal pattern to use based on cycling response,
6    * xmlFilePath conventions, and PageBuild response analysis.
7    *
8    * @see modal-strategy-validation.md for modal type categories
9    */
10
11  import { createFeatureLogger } from '@/utils/logger-builder';
12
13  const logger = createFeatureLogger('util', 'DetectModalType');
14
15  // ========================================
16  // Types
17  // ========================================
18
19  /**
20   * Modal pattern types supported by the framework
21   */
22  export type ModalType =
23      | 'dataEntry'  // New/create modals - Three-API Pattern
24      | 'edit'  // Edit modals with field commits
25      | 'selection'  // Selection/lookup modals
26      | 'confirmation'  // Yes/No/Cancel dialogs
27      | 'info'  // Read-only information modals
28      | 'multiStep'  // Multi-step wizard modals
29      | 'fieldCommit';  // Modals with field-level commits
30
31  export interface ModalTypeDetectionInput {
32      /** Cycling response data */
33      cyclingResponse?: {
34          /** Explicit modal type from backend */
⟪?⟫ (rest illegible due to double-exposure ghosting)


========== IMG_3572.md ==========
---
photo: IMG_3572.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 17-49
orientation: 180
confidence: high
notes: Same tab/file as IMG_3570/3571 (detect-modal-type.ts), scrolled further down. Photo has double-exposure/motion-blur ghosting (a fainter duplicate text layer offset ~2 lines above the sharp layer), but the sharp foreground layer was verified legible via close-up crops of the rotated image, cross-checked against IMG_3570 for lines 17-30 overlap. Explorer: detect-modal-type.ts selected/highlighted in utils folder. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 2 errors/0 warnings. Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
17  // ========================================
18
19  /**
20   * Modal pattern types supported by the framework
21   */
22  export type ModalType =
23      | 'dataEntry'  // New/create modals - Three-API Pattern
24      | 'edit'  // Edit modals with field commits
25      | 'selection'  // Selection/lookup modals
26      | 'confirmation'  // Yes/No/Cancel dialogs
27      | 'info'  // Read-only information modals
28      | 'multiStep'  // Multi-step wizard modals
29      | 'fieldCommit';  // Modals with field-level commits
30
31  export interface ModalTypeDetectionInput {
32      /** Cycling response data */
33      cyclingResponse?: {
34          /** Explicit modal type from backend */
35          modalType?: ModalType;
36          /** XML file path identifier */
37          xmlFilePath?: string;
38          /** Frame type */
39          frame?: string;
40      };
41
42      /** PageBuild response data */
43      pageBuildResponse?: {
44          /** Form controls array */
45          controls?: Array<{
46              '@disabled'?: string;
47              '@matchcode'?: string;
48              '@controltype'?: string;
49          }>;


========== IMG_3573.md ==========
---
photo: IMG_3573.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 43-76 (sticky scroll shows line 31)
orientation: 180
confidence: medium
notes: Same tab/file as IMG_3570-3572 (detect-modal-type.ts), scrolled further down. Sticky scroll header shows line 31 "export interface ModalTypeDetectionInput {". Photo has double-exposure/motion-blur ghosting (fainter duplicate text layer offset a few lines), resolved via close-up crops; lines 43-49 overlap with and are consistent with IMG_3572's clean capture. Line 75's xmlFilePath string value confirmed via higher-res crop in IMG_3574 (same content, less blurred) as "NewRnl_ISLLSYS_20010101.xml" (lowercase L, not digit 1). Explorer: detect-modal-type.ts selected in utils folder. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 2 errors/0 warnings.
---
Sticky scroll (line 31):
31  export interface ModalTypeDetectionInput {

43      pageBuildResponse?: {
44          /** Form controls array */
45          controls?: Array<{
46              '@disabled'?: string;
47              '@matchcode'?: string;
48              '@controltype'?: string;
49          }>;
50          /** Tab/step indicators */
51          tabs?: unknown;
52      };
53  }
54
55  // ========================================
56  // Utility Functions
57  // ========================================
58
59  /**
60   * Detect modal type based on available data
61   *
62   * Decision tree:
63   * 1. Check cycling response for explicit modalType
64   * 2. Check xmlFilePath naming convention
65   * 3. Analyze PageBuild response structure
66   * 4: Fallback to 'dataEntry' (default)
67   *
68   * @param input - Detection input data
69   * @returns Detected modal type
70   *
71   * @example
72   * ```typescript
73   * const modalType = detectModalType({
74   *   cyclingResponse: {
75   *     xmlFilePath: "NewRnl_ISLLSYS_20010101.xml"
76   *   }


========== IMG_3574.md ==========
---
photo: IMG_3574.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 64-97
orientation: 180
confidence: high
notes: Same tab/file as IMG_3570-3573 (detect-modal-type.ts), scrolled further down; no distinct sticky-scroll header visible above line 64 in this capture. Photo has double-exposure/motion-blur ghosting throughout; resolved via close-up crops. Lines 64-76 overlap with and are consistent with IMG_3573's content (confirms xmlFilePath value is "NewRnl_ISLLSYS_20010101.xml", lowercase L). Lines 81-97 corrected against the much clearer IMG_3575 (same function, no ghosting there), which showed this photo's original guess of a double-blank at 94-95 was wrong — actual layout has single blank lines at 87 and 95. Explorer: detect-modal-type.ts selected in utils folder. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
64   * 2. Check xmlFilePath naming convention
65   * 3. Analyze PageBuild response structure
66   * 4: Fallback to 'dataEntry' (default)
67   *
68   * @param input - Detection input data
69   * @returns Detected modal type
70   *
71   * @example
72   * ```typescript
73   * const modalType = detectModalType({
74   *   cyclingResponse: {
75   *     xmlFilePath: "NewRnl_ISLLSYS_20010101.xml"
76   *   }
77   * });
78   * // Returns: 'dataEntry'
79   * ```
80   */
81  export function detectModalType(input: ModalTypeDetectionInput): ModalType {
82      logger.debug('Detecting modal type', {
83          hasExplicitType: !!input.cyclingResponse?.modalType,
84          xmlFilePath: input.cyclingResponse?.xmlFilePath,
85          hasPageBuildResponse: !!input.pageBuildResponse,
86      });
87
88      // Step 1: Check for explicit modalType in cycling response
89      if (input.cyclingResponse?.modalType) {
90          logger.info('Using explicit modal type from cycling response', {
91              modalType: input.cyclingResponse.modalType,
92          });
93          return input.cyclingResponse.modalType;
94      }
95
96      // Step 2: Check xmlFilePath naming convention
97      if (input.cyclingResponse?.xmlFilePath) {


========== IMG_3580.md ==========
---
photo: IMG_3580.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 81, 161-194
orientation: 180
confidence: medium
notes: |
  Photo has a strong double-exposure/ghosting artifact — VS Code appears to have
  been mid smooth-scroll-animation when the shutter fired, so two scroll
  positions are blended, offset by exactly 2 lines (fainter/grayer "ghost"
  layer sits 2 rows above its matching sharp/bright content). Transcription
  below is the sharp/settled layer at each gutter line number. The ghost layer
  was used only to recover lines 161-162, which are otherwise occluded above
  the visible sharp range by the sticky-scroll header (line 81) — these two
  lines are lower-confidence reconstructions. Line 194 "case 'dataEntry'" is
  cut off at the very bottom of the editor viewport (red squiggle/error marker
  visible under it, error likely continues off-screen); terminating punctuation
  (colon vs semicolon) is a best guess from a blurred glyph.
  Sticky scroll header: line 81 `export function detectModalType(input: ModalTypeDetectionInput): ModalType {`
  Tab bar: only one tab open, "detect-modal-type.ts".
  Explorer sidebar (aqs-web-ui/src), expanded:
    providers/ (theme-provider.tsx)
    services/ (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts)
    types/ (grid-response.ts)
    utils/ (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts,
      build-eedata-array.ts, build-xml-server-call-payload... (truncated name), button-state-manager.ts,
      check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts,
      create-store.tsx, detect-modal-type.ts [currently open/highlighted])
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "2" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:21 PM 7/10/2026.
---
81:     export function detectModalType(input: ModalTypeDetectionInput): ModalType {
       ... (lines 82-160 not visible — occluded above viewport / sticky header)
161:        if (hasFieldCommits) {                                              ⟪ghost-layer reconstruction, medium confidence⟫
162:          logger.info('Detected fieldCommit modal - has commit-enabled fields');  ⟪ghost-layer reconstruction, medium confidence⟫
163:          return 'fieldCommit';
164:        }
165:      }
166:
167:      // Step 4: Default fallback
168:      logger.info('Using default modal type: dataEntry');
169:      return 'dataEntry';
170:  }
171:
172:  /**
173:   * Get modal behavior flags based on modal type
174:   *
175:   * @param modalType - Detected modal type
176:   * @returns Behavior flags for the modal
177:   *
178:   * @example
179:   * ```typescript
180:   * const flags = getModalBehaviorFlags('edit');
181:   * // Returns: { enableFieldCommits: true, skipPageBuild: false, ... }
182:   * ```
183:   */
184:  export function getModalBehaviorFlags(modalType: ModalType) {
185:    const flags = {
186:      enableFieldCommits: false,
187:      skipPageBuild: false,
188:      skipXMLServerCall: false,
189:      isMultiStep: false,
190:      isReadOnly: false,
191:    };
192:
193:    switch (modalType) {
194:      case 'dataEntry':⟪?⟫


========== IMG_3575.md ==========
---
photo: IMG_3575.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 84-115 (sticky scroll shows line 81)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting (unlike IMG_3571-3574). Sticky scroll header shows line 81 "export function detectModalType(input: ModalTypeDetectionInput): ModalType {". This capture corrects the line numbering guessed in IMG_3574 for lines 82-97 (single blank lines at 87 and 95, not a double-blank at 94-95). Explorer: detect-modal-type.ts selected in utils folder. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
Sticky scroll (line 81):
81  export function detectModalType(input: ModalTypeDetectionInput): ModalType {

84          xmlFilePath: input.cyclingResponse?.xmlFilePath,
85          hasPageBuildResponse: !!input.pageBuildResponse,
86      });
87
88      // Step 1: Check for explicit modalType in cycling response
89      if (input.cyclingResponse?.modalType) {
90          logger.info('Using explicit modal type from cycling response', {
91              modalType: input.cyclingResponse.modalType,
92          });
93          return input.cyclingResponse.modalType;
94      }
95
96      // Step 2: Check xmlFilePath naming convention
97      if (input.cyclingResponse?.xmlFilePath) {
98          const fileName = input.cyclingResponse.xmlFilePath.toLowerCase();
99
100         // Pattern: NewRnl_*, New_* → 'dataEntry'
101         if (fileName.includes('newrnl_') || fileName.includes('new_')) {
102             logger.info('Detected dataEntry modal from xmlFilePath', { fileName });
103             return 'dataEntry';
104         }
105
106         // Pattern: Edit_* → 'edit'
107         if (fileName.includes('edit_')) {
108             logger.info('Detected edit modal from xmlFilePath', { fileName });
109             return 'edit';
110         }
111
112         // Pattern: Select_*, Lookup_* → 'selection'
113         if (fileName.includes('select_') || fileName.includes('lookup_')) {
114             logger.info('Detected selection modal from xmlFilePath', { fileName });
115             return 'selection';


========== IMG_3576.md ==========
---
photo: IMG_3576.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 105-136 (sticky scroll shows line 81)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting. Sticky scroll header shows line 81 "export function detectModalType(input: ModalTypeDetectionInput): ModalType {". Explorer: detect-modal-type.ts selected in utils folder. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
Sticky scroll (line 81):
81  export function detectModalType(input: ModalTypeDetectionInput): ModalType {

105
106      // Pattern: Edit_* → 'edit'
107      if (fileName.includes('edit_')) {
108          logger.info('Detected edit modal from xmlFilePath', { fileName });
109          return 'edit';
110      }
111
112      // Pattern: Select_*, Lookup_* → 'selection'
113      if (fileName.includes('select_') || fileName.includes('lookup_')) {
114          logger.info('Detected selection modal from xmlFilePath', { fileName });
115          return 'selection';
116      }
117
118      // Pattern: Confirm_* → 'confirmation'
119      if (fileName.includes('confirm_')) {
120          logger.info('Detected confirmation modal from xmlFilePath', { fileName });
121          return 'confirmation';
122      }
123
124      // Pattern: Info_*, View_* → 'info'
125      if (fileName.includes('info_') || fileName.includes('view_')) {
126          logger.info('Detected info modal from xmlFilePath', { fileName });
127          return 'info';
128      }
129  }
130
131  // Step 3: Analyze PageBuild response (if available)
132  if (input.pageBuildResponse?.controls) {
133      const controls = input.pageBuildResponse.controls;
134
135      // Check if all controls are disabled (read-only modal)
136      const allDisabled = controls.every((ctrl) => ctrl['@disabled'] === 'T');


========== IMG_3577.md ==========
---
photo: IMG_3577.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 126-157 (sticky scroll shows line 81)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting. Sticky scroll header shows line 81 "export function detectModalType(input: ModalTypeDetectionInput): ModalType {". Explorer: detect-modal-type.ts selected in utils folder. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 157 continues off-screen/cut at bottom ("![...].includes(matchcode)" partially visible under status bar in wider view — full line captured).
---
Sticky scroll (line 81):
81  export function detectModalType(input: ModalTypeDetectionInput): ModalType {

126             logger.info('Detected info modal from xmlFilePath', { fileName });
127             return 'info';
128         }
129     }
130
131     // Step 3: Analyze PageBuild response (if available)
132     if (input.pageBuildResponse?.controls) {
133         const controls = input.pageBuildResponse.controls;
134
135         // Check if all controls are disabled (read-only modal)
136         const allDisabled = controls.every((ctrl) => ctrl['@disabled'] === 'T');
137         if (allDisabled && controls.length > 0) {
138             logger.info('Detected info modal - all controls disabled', {
139                 controlCount: controls.length,
140             });
141             return 'info';
142         }
143
144         // Check for multi-step indicators (tabs, steps)
145         if (input.pageBuildResponse.tabs) {
146             logger.info('Detected multiStep modal - has tabs/steps');
147             return 'multiStep';
148         }
149
150         // Check for field commit patterns (controls with @commit="T" or commit handlers)
151         const hasFieldCommits = controls.some((ctrl) => {
152             const matchcode = ctrl['@matchcode'] || '';
153             const controlType = ctrl['@controltype'] || '';
154             // Common patterns for fields that trigger commits
155             return (
156                 (controlType === 'select' || controlType === 'dropdown') &&
157                 !['OK', 'CANCEL', 'SUBMIT', 'NEXT', 'BACK'].includes(matchcode)


========== IMG_3578.md ==========
---
photo: IMG_3578.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 126-157 (sticky scroll shows line 81)
orientation: 180
confidence: high
notes: DUPLICATE — identical scroll position and content to IMG_3577 (same file, same visible lines 126-157, same sticky scroll line 81, same cursor position, same status bar state). Appears to be a repeat photo of the same screen state. Clean/sharp capture, no ghosting. Explorer: detect-modal-type.ts selected in utils folder. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 2 errors/0 warnings.
---
Sticky scroll (line 81):
81  export function detectModalType(input: ModalTypeDetectionInput): ModalType {

126             logger.info('Detected info modal from xmlFilePath', { fileName });
127             return 'info';
128         }
129     }
130
131     // Step 3: Analyze PageBuild response (if available)
132     if (input.pageBuildResponse?.controls) {
133         const controls = input.pageBuildResponse.controls;
134
135         // Check if all controls are disabled (read-only modal)
136         const allDisabled = controls.every((ctrl) => ctrl['@disabled'] === 'T');
137         if (allDisabled && controls.length > 0) {
138             logger.info('Detected info modal - all controls disabled', {
139                 controlCount: controls.length,
140             });
141             return 'info';
142         }
143
144         // Check for multi-step indicators (tabs, steps)
145         if (input.pageBuildResponse.tabs) {
146             logger.info('Detected multiStep modal - has tabs/steps');
147             return 'multiStep';
148         }
149
150         // Check for field commit patterns (controls with @commit="T" or commit handlers)
151         const hasFieldCommits = controls.some((ctrl) => {
152             const matchcode = ctrl['@matchcode'] || '';
153             const controlType = ctrl['@controltype'] || '';
154             // Common patterns for fields that trigger commits
155             return (
156                 (controlType === 'select' || controlType === 'dropdown') &&
157                 !['OK', 'CANCEL', 'SUBMIT', 'NEXT', 'BACK'].includes(matchcode)


========== IMG_3579.md ==========
---
photo: IMG_3579.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 141-173 (sticky scroll shows line 81)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting. Sticky scroll header shows line 81 "export function detectModalType(input: ModalTypeDetectionInput): ModalType {". Line 141 partially cut off at very top under sticky header (only "return 'info';" and closing "}" fragment visible, faint). This capture shows the end of the detectModalType function (closes at line 170) and the start of a new JSDoc block at 172-173 for a subsequent function ("Get modal behavior flags based on modal type"). Explorer: detect-modal-type.ts selected in utils folder. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
Sticky scroll (line 81):
81  export function detectModalType(input: ModalTypeDetectionInput): ModalType {

141         return 'info';
142     }
143
144     // Check for multi-step indicators (tabs, steps)
145     if (input.pageBuildResponse.tabs) {
146         logger.info('Detected multiStep modal - has tabs/steps');
147         return 'multiStep';
148     }
149
150     // Check for field commit patterns (controls with @commit="T" or commit handlers)
151     const hasFieldCommits = controls.some((ctrl) => {
152         const matchcode = ctrl['@matchcode'] || '';
153         const controlType = ctrl['@controltype'] || '';
154         // Common patterns for fields that trigger commits
155         return (
156             (controlType === 'select' || controlType === 'dropdown') &&
157             !['OK', 'CANCEL', 'SUBMIT', 'NEXT', 'BACK'].includes(matchcode)
158         );
159     });
160
161     if (hasFieldCommits) {
162         logger.info('Detected fieldCommit modal - has commit-enabled fields');
163         return 'fieldCommit';
164     }
165     }
166
167     // Step 4: Default fallback
168     logger.info('Using default modal type: dataEntry');
169     return 'dataEntry';
170 }
171
172 /**
173  * Get modal behavior flags based on modal type


========== IMG_3581.md ==========
---
photo: IMG_3581.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 175-207
orientation: 180
confidence: high
notes: |
  Clean, sharp capture (no motion blur/ghosting, unlike IMG_3580). Confirms
  the reconstruction made in IMG_3580 for lines 172-194 was accurate.
  Tab bar: only one tab open, "detect-modal-type.ts".
  Explorer sidebar (aqs-web-ui/src), expanded, same tree as IMG_3580:
    providers/ (theme-provider.tsx)
    services/ (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts)
    types/ (grid-response.ts)
    utils/ (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts,
      build-eedata-array.ts, build-xml-server-call-payload... (truncated name), button-state-manager.ts,
      check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts,
      create-store.tsx, detect-modal-type.ts [currently open/highlighted, blue])
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "2" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:21 PM 7/10/2026.
---
175:   * @param modalType - Detected modal type
176:   * @returns Behavior flags for the modal
177:   *
178:   * @example
179:   * ```typescript
180:   * const flags = getModalBehaviorFlags('edit');
181:   * // Returns: { enableFieldCommits: true, skipPageBuild: false, ... }
182:   * ```
183:   */
184:  export function getModalBehaviorFlags(modalType: ModalType) {
185:    const flags = {
186:      enableFieldCommits: false,
187:      skipPageBuild: false,
188:      skipXMLServerCall: false,
189:      isMultiStep: false,
190:      isReadOnly: false,
191:    };
192:
193:    switch (modalType) {
194:      case 'dataEntry':
195:        // Standard Three-API Pattern
196:        break;
197:
198:      case 'edit':
199:      case 'fieldCommit':
200:        flags.enableFieldCommits = true;
201:        break;
202:
203:      case 'selection':
204:        flags.skipXMLServerCall = true; // May not need XMLServerCall on submit
205:        break;
206:
207:      case 'confirmation':


========== IMG_3582.md ==========
---
photo: IMG_3582.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 184-185, 190-220
orientation: 180
confidence: high
notes: |
  Clean, sharp capture (no ghosting). Sticky scroll header pins lines 184-185
  (`export function getModalBehaviorFlags(modalType: ModalType) {` /
  `const flags = {`) above the scrolled body which starts at line 190.
  Line 220 is the last line in the editor viewport and is clipped/occluded by
  the status bar at the very bottom of the screen. CORRECTION (confirmed by
  IMG_3583, which shows this same line clearly): line 220 is blank — it is
  followed by `logger.debug('Modal behavior flags', { modalType, flags });`
  at line 221.
  Tab bar: only one tab open, "detect-modal-type.ts".
  Explorer sidebar (aqs-web-ui/src) unchanged from IMG_3580/3581 — detect-modal-type.ts highlighted (blue, active).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "2" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:21 PM 7/10/2026.
---
184:  export function getModalBehaviorFlags(modalType: ModalType) {
185:    const flags = {
       ... (lines 186-189 not visible — scrolled above viewport, covered by sticky header)
190:      isReadOnly: false,
191:    };
192:
193:    switch (modalType) {
194:      case 'dataEntry':
195:        // Standard Three-API Pattern
196:        break;
197:
198:      case 'edit':
199:      case 'fieldCommit':
200:        flags.enableFieldCommits = true;
201:        break;
202:
203:      case 'selection':
204:        flags.skipXMLServerCall = true; // May not need XMLServerCall on submit
205:        break;
206:
207:      case 'confirmation':
208:        flags.skipPageBuild = true; // Static content, no form structure needed
209:        break;
210:
211:      case 'info':
212:        flags.skipXMLServerCall = true;
213:        flags.isReadOnly = true;
214:        break;
215:
216:      case 'multiStep':
217:        flags.isMultiStep = true;
218:        break;
219:    }
220:


========== IMG_3583.md ==========
---
photo: IMG_3583.JPG
type: vscode-code
file: aqs-web-ui/src/utils/detect-modal-type.ts
lines: 184, 205-224
orientation: 180
confidence: high
notes: |
  Photo taken at an angle (camera tilted, screen trapezoidal in frame) but text
  is legible after rotation; some blur in the explorer sidebar file names.
  Sticky scroll header pins line 184 (`export function getModalBehaviorFlags(modalType: ModalType) {`).
  This photo's content overlaps with IMG_3582 (lines 205-219) and resolves the
  line 220 ambiguity noted there: line 220 is actually BLANK, followed by the
  logger.debug call at 221 (see also correction note added to IMG_3582.md).
  Tab bar: only one tab open, "detect-modal-type.ts".
  Explorer sidebar (aqs-web-ui/src) unchanged from prior photos in this file — detect-modal-type.ts highlighted (blue, active).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "2" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF. Timestamp visible earlier in sequence ~6:21 PM 7/10/2026 (clock not fully legible this frame).
---
184:  export function getModalBehaviorFlags(modalType: ModalType) {
       ... (lines 185-204 not visible — scrolled above viewport, covered by sticky header)
205:        break;
206:
207:      case 'confirmation':
208:        flags.skipPageBuild = true; // Static content, no form structure needed
209:        break;
210:
211:      case 'info':
212:        flags.skipXMLServerCall = true;
213:        flags.isReadOnly = true;
214:        break;
215:
216:      case 'multiStep':
217:        flags.isMultiStep = true;
218:        break;
219:    }
220:
221:    logger.debug('Modal behavior flags', { modalType, flags });
222:    return flags;
223:  }
224:
