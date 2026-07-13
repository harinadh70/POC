# BUNDLE for src/types.ts
# 24 photo fragment(s), ascending start-line order.


========== IMG_4343.md ==========
---
photo: IMG_4343.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 1-27
orientation: 180
confidence: high
notes: Whole file visible (27 lines, ends with blank line 27), crisp/no ghosting. Breadcrumb shows "aqs-web-ui > src > types.ts > User" (cursor/symbol context inside the User interface). Tab "types.ts" shown italicized (preview-mode tab) with modified-lines badge "1". Explorer sidebar: utils/ (xml-detail-persistence.ts, zod-error-formatter.ts), app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts, types.ts (active), then .env.development, .env.production, .gitignore, .prettierrc, browser-commands-analy...(truncated, "U"), eslint.config.js, GLOBAL_COMPONENTS_A...(x2, "U"), index.html (cut). Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings (down from 4 in store.ts photos). Window "w00w11dev0067", taskbar clock 19:53 10-07-2026.
---
```
1   export interface User {
2       id: string;
3       firstName: string;
4       lastName: string;
5       username: string;
6       password: string;
7       email: string;
8   }
9
10  export interface ApiError {
11      message: string;
12      status: number;
13      errors?: Record<string, string[]>;
14  }
15
16  export interface ApiResponse<T> {
17      data: T;
18      message?: string;
19      status: number;
20  }
21
22  export interface RetryOptions {
23      retries?: number;
24      retryDelay?: number;
25      retryOn?: number[]; // status codes to retry on
26  }
27
```


========== IMG_4344.md ==========
---
photo: IMG_4344.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 14-40
orientation: 180
confidence: high
notes: Same types.ts file as IMG_4343, scrolled down. Crisp, no ghosting. Breadcrumb "aqs-web-ui > src > types.ts > User". Tab "types.ts" italicized (preview) with badge "1". Line 41 was visible only as a thin sliver at the bottom edge in this photo; the follow-up photo IMG_4345 (same file, scrolled slightly further) confirms line 41 = `| 'checkbox'`. Explorer sidebar unchanged from IMG_4343. Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings. Window "w00w11dev0067", taskbar clock 19:53 10-07-2026.
---
```
14  }
15
16  export interface ApiResponse<T> {
17      data: T;
18      message?: string;
19      status: number;
20  }
21
22  export interface RetryOptions {
23      retries?: number;
24      retryDelay?: number;
25      retryOn?: number[]; // status codes to retry on
26  }
27
28  // Extend Axios config to support custom flags
29  declare module 'axios' {
30      export interface AxiosRequestConfig {
31          skipAuthInterceptor?: boolean;
32      }
33  }
34
35  // src/types.ts
36  export type ControlType =
37      | 'textbox'
38      | 'textarea'
39      | 'select'
40      | 'radio'
```
(line 41 cut off at the bottom viewport edge — a sliver of text is visible, possibly `| 'checkbox'`, but not legible enough to transcribe with confidence)


========== IMG_4345.md ==========
---
photo: IMG_4345.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 22-51
orientation: 180
confidence: high
notes: Same types.ts file, scrolled further down. Mild ghosting artifact (faint duplicate of a slightly-earlier scroll position bleeding through, offset ~13 lines), but the foreground/bold text is legible and unambiguous throughout. Sticky-scroll header at top shows line 22 "export interface RetryOptions {" (lines 23-25 hidden behind it, already transcribed in IMG_4344). This photo confirms line 41 = `| 'checkbox'`, which IMG_4344 could only partially see. Tab "types.ts" italicized (preview) badge "1". Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings. Window "w00w11dev0067", taskbar clock 19:53 10-07-2026.
---
```
22  export interface RetryOptions {
26  }
27
28  // Extend Axios config to support custom flags
29  declare module 'axios' {
30      export interface AxiosRequestConfig {
31          skipAuthInterceptor?: boolean;
32      }
33  }
34
35  // src/types.ts
36  export type ControlType =
37      | 'textbox'
38      | 'textarea'
39      | 'select'
40      | 'radio'
41      | 'checkbox'
42      | 'date'
43      | 'calendar';
44  export type CommitEventType = 'blur' | 'enter' | 'change';
45
46  export interface OptionItem {
47      label: string;
48      value: string;
49  }
50
51  export interface NormalizedField {
```


========== IMG_4346.md ==========
---
photo: IMG_4346.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 36-67
orientation: 180
confidence: high
notes: Same types.ts file, scrolled further to show the NormalizedField interface. Crisp, only faint/negligible ghosting near lines 61-63 that doesn't obscure the sharp text. Sticky-scroll header at top shows line 36 "export type ControlType =". Line 41 (`| 'checkbox'`, already confirmed via IMG_4345) is only a barely-visible sliver at the very top of the code area here, not re-transcribed. Tab "types.ts" italicized (preview) badge "1". Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings. Window "w00w11dev0067", taskbar clock 19:53 10-07-2026.
---
```
36  export type ControlType =
42      | 'date'
43      | 'calendar';
44  export type CommitEventType = 'blur' | 'enter' | 'change';
45
46  export interface OptionItem {
47      label: string;
48      value: string;
49  }
50
51  export interface NormalizedField {
52      matchcode: string;
53      label: string;
54      controlType: ControlType;
55      required?: boolean;
56      disabled?: boolean;
57      visible?: boolean;
58      readOnly?: boolean;
59      tabIndex?: number;
60      width?: number | string;
61      placeholder?: string;
62      options?: OptionItem[];
63      defaultValue?: string | boolean;
64      colSpan?: number;
65
66      // highlight props (optional - if you already added these)
67      highlight?: boolean;
```


========== IMG_4347.md ==========
---
photo: IMG_4347.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 51-82
orientation: 180
confidence: high
notes: Same types.ts NormalizedField interface, scrolled further. Photo has significant motion-blur/ghosting (looks like the screen was captured mid-scroll) — every row shows two overlapping renderings offset by 2-6 lines depending on position, worst around lines 75-78. Lines 55-67 duplicate content already confirmed cleanly in IMG_4346 and are reused here (reading is consistent between the two photos). Lines 68-82 are new and were reconstructed by very close crop/zoom analysis pairing each gutter number with its correctly-weighted (bold vs faint) adjacent text — bold pairs (74/maxDate, 77/ctrlWidth, 79/comment, 80/isNumeric, 81/maxLength) and fainter/ghost pairs (75/top, 76/left) were each internally consistent (same brightness level for number and its text), which is how the line assignment was resolved. A trailing fragment "// info icon support" is visible as a ghost right at the bottom edge (below line 82) but is cut off/not legible enough to transcribe. This reconstruction (lines 68-82) is independently corroborated by the clearer follow-up photo IMG_4348, which shows the same fields at the same line numbers with less ambiguity — confidence upgraded from medium to high on that basis. Sticky-scroll header at top: line 51 "export interface NormalizedField {". Explorer sidebar unchanged (types.ts active, badge "1"). Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings. Window "w00w11dev0067", taskbar clock 19:53 10-07-2026.
---
```
51  export interface NormalizedField {
55      required?: boolean;
56      disabled?: boolean;
57      visible?: boolean;
58      readOnly?: boolean;
59      tabIndex?: number;
60      width?: number | string;
61      placeholder?: string;
62      options?: OptionItem[];
63      defaultValue?: string | boolean;
64      colSpan?: number;
65
66      // highlight props (optional - if you already added these)
67      highlight?: boolean;
68      highlightColor?: string;
69      highlightBorderColor?: string;
70
71      // date-specific (optional)
72      dateFormat?: string; // e.g. 'YYYY-MM-DD'
73      minDate?: string; // ISO string or format matching dateFormat
74      maxDate?: string;
75      top?: number | string; // for absolute positioning
76      left?: number | string; // for absolute positioning
77      ctrlWidth?: number | string; // for absolute positioning
78
79      // input restrictions (numeric and maxLength)
80      isNumeric?: boolean; // Whether field should only accept numeric input
81      maxLength?: number; // Maximum character length for input
82
```
(a further ghosted fragment "// info icon support" is visible right at the bottom edge, cut off — not legible enough to transcribe with confidence)


========== IMG_4348.md ==========
---
photo: IMG_4348.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 51-87
orientation: 180
confidence: high
notes: Same types.ts NormalizedField interface as IMG_4347, scrolled to show the rest of it through its closing brace. Same motion-blur/ghosting artifact as IMG_4347 (a faint duplicate of nearby content offset ~3 lines bleeds through at every row); line numbers were verified by only trusting a field's text when its brightness/boldness matched its adjacent gutter number's boldness (a bold gutter number with only faint adjacent text means that line is genuinely blank, its faint neighbor being a ghost bleed from a line 3 rows away). This method confirms and extends IMG_4347's reconstruction exactly. Line 87 "}" closes the interface (bracket-matched, sharp yellow bracket, clearly paired with bold "87"). The screen row for "88" shows only a bright-ish ghost of line 85's content ("infoAriaLabel?: string;") bleeding through — since the interface already closed at 87, this cannot be real field content at 88, so it is treated as a ghost artifact and not transcribed as line content. Sticky-scroll header at top: line 51 "export interface NormalizedField {". Tab "types.ts" italicized (preview) badge "1". Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings. Window "w00w11dev0067", taskbar clock 19:53 10-07-2026.
---
```
51  export interface NormalizedField {
62      options?: OptionItem[];
63      defaultValue?: string | boolean;
64      colSpan?: number;
65
66      // highlight props (optional - if you already added these)
67      highlight?: boolean;
68      highlightColor?: string;
69      highlightBorderColor?: string;
70
71      // date-specific (optional)
72      dateFormat?: string; // e.g. 'YYYY-MM-DD'
73      minDate?: string; // ISO string or format matching dateFormat
74      maxDate?: string;
75      top?: number | string; // for absolute positioning
76      left?: number | string; // for absolute positioning
77      ctrlWidth?: number | string; // for absolute positioning
78
79      // input restrictions (numeric and maxLength)
80      isNumeric?: boolean; // Whether field should only accept numeric input
81      maxLength?: number; // Maximum character length for input
82
83      // info icon support
84      showInfoIcon?: boolean;
85      infoAriaLabel?: string;
86      infoMatchcode?: string;
87  }
```


========== IMG_4350.md ==========
---
photo: IMG_4350.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 51-111 (sticky header 51; visible body 86-111)
orientation: 180
confidence: medium
notes: >
  Photo has significant motion-blur ghosting/double-exposure, apparently from
  the editor auto-scrolling during the camera exposure. Line-number gutter
  86-91 is clean/single, but from line 92 downward every row shows a bold
  sharp number/text plus a fainter ghost number/text offset by -2 lines
  (e.g. bold "105" carries a dim "103" ghost behind it). The ghost content
  at row N consistently equals the real content of row N-2, which was used
  to cross-validate the bold reading (e.g. bold line 103 = "button';" matches
  the dim ghost seen under bold line 105). Transcription below uses only the
  bold/sharp text. Around lines 86-89 there is also a faint ghost of a "}"
  bracket and a repeated "infoMatchcode?: string;" fragment that could not be
  confidently placed - noted but not included in the numbered transcript.
  Sticky-scroll header at top shows "51 export interface NormalizedField {"
  (the enclosing interface for lines 86-88). Explorer sidebar (from the
  original un-rotated capture) shows: AQS_WORKSPACE > aqs-web-ui > src >
  utils (xml-detail-persistence.ts, zod-error-formatter.ts), app.css, app.tsx,
  context.ts, main.tsx, routes.tsx, store.ts, types.ts (selected, 1 problem),
  .env.development, .env.production, .gitignore, .prettierrc,
  browser-commands-analy...(truncated), eslint.config.js,
  GLOBAL_COMPONENTS_A...(x2, truncated, unsaved "U"), index.html. Status bar:
  branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution",
  TypeScript, UTF-8, CRLF, Tab Size 4. Single tab open: types.ts (1, modified
  dot). The `controltype` union (lines 96-103) shows bare quoted string
  values ('input','select','checkbox','radio','textarea','date','number',
  'button') with only a thin vertical mark (likely blinking text cursor or a
  blurred indent guide) to their left - could not confirm whether a leading
  "|" union separator is present; by contrast line 109's "|" separators
  elsewhere on screen are clearly bold and legible, so the ambiguity here is
  attributed to blur rather than absence, but is not confirmed either way.
  UPDATE from IMG_4351.JPG (same file/interface, scrolled further, no
  ghosting): that photo clearly shows this exact union list with leading "|"
  pipes (e.g. "| 'checkbox'", "| 'radio'", etc.), so lines 96-103 above
  almost certainly do have leading "|" separators that were simply obscured
  by blur/cursor in this photo.
---

Sticky-scroll header:
51  export interface NormalizedField {

Visible editor body:
86      infoMatchcode?: string;
87      showInfoIcon?: boolean;
88      infoAriaLabel?: string;
89  export type FormValues = Record<string, string | boolean>;
90  type Option = { value: string; text: string };
91
92  export interface FormControl {
93      id: string;
94      matchcode: string;
95      controltype:
96          'input'
97          'select'
98          'checkbox'
99          'radio'
100         'textarea'
101         'date'
102         'number'
103         'button';
104     ctrllabel: string;
105     tabindex: string;
106     value: string | boolean;
107     text: string;
108     options?: Option[];
109     required: 'T' | 'F' | boolean | string;
110     disabled: 'T' | 'F' | boolean | string;
111 }


========== IMG_4349.md ==========
---
photo: IMG_4349.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 79-104
orientation: 180
confidence: high
notes: Same types.ts file, scrolled past the end of the NormalizedField interface (closes at line 87, matching IMG_4348) into new content: FormValues type alias, an Option type alias, and the start of a FormControl interface. Same recurring ghosting/motion-blur artifact (faint duplicate ~2-3 lines offset) but the bold/sharp text was legible and internally consistent throughout via crop/zoom verification. Sticky-scroll header at top: line 51 "export interface NormalizedField {" (stale/pinned from earlier scroll position; the interface itself is no longer in view). Lines 79-87 reproduce content already confirmed in IMG_4348. Tab "types.ts" italicized (preview) badge "1". Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings. Window "w00w11dev0067", taskbar clock 19:53 10-07-2026. File continues past line 104 (not captured in this photo).
---
```
51  export interface NormalizedField {
79      // input restrictions (numeric and maxLength)
80      isNumeric?: boolean; // Whether field should only accept numeric input
81      maxLength?: number; // Maximum character length for input
82
83      // info icon support
84      showInfoIcon?: boolean;
85      infoAriaLabel?: string;
86      infoMatchcode?: string;
87  }
88
89  export type FormValues = Record<string, string | boolean>;
90  type Option = { value: string; text: string };
91
92  export interface FormControl {
93      id: string;
94      matchcode: string;
95      controltype:
96          | 'input'
97          | 'select'
98          | 'checkbox'
99          | 'radio'
100         | 'textarea'
101         | 'date'
102         | 'number'
103         | 'button';
104     ctrlLabel: string;
```
(file continues below line 104, not captured in this photo)


========== IMG_4351.md ==========
---
photo: IMG_4351.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 92-122 (sticky headers 92,95; visible body 98-122)
orientation: 180
confidence: high
notes: >
  Clean, sharp capture, no motion blur/ghosting (unlike IMG_4350 of the same
  file). Two stacked sticky-scroll headers visible at top: line 92
  "export interface FormControl {" and line 95 "controltype:" (its enclosing
  property), then a divider, then live editor body starts at line 98. This
  confirms the `controltype` union type uses leading "|" pipe separators
  (visible clearly here for 'checkbox'/'radio'/'textarea'/'date'/'number'/
  'button'), which resolves the ambiguity noted in IMG_4350's transcript for
  lines 96-97 ('input'/'select', not visible in this photo). Same file tab
  "types.ts" open (1, modified dot), same explorer sidebar list as IMG_4350
  (utils/xml-detail-persistence.ts, utils/zod-error-formatter.ts, app.css,
  app.tsx, context.ts, main.tsx, routes.tsx, store.ts, types.ts selected,
  .env.development, .env.production, .gitignore, .prettierrc,
  browser-commands-analy...(truncated,unsaved), eslint.config.js,
  GLOBAL_COMPONENTS_A...(x2, truncated, unsaved), index.html). Status bar:
  branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution",
  TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1.
---

Sticky-scroll headers:
92  export interface FormControl {
95      controltype:

Visible editor body:
98          | 'checkbox'
99          | 'radio'
100         | 'textarea'
101         | 'date'
102         | 'number'
103         | 'button';
104     ctrllabel: string;
105     tabindex: string;
106     value: string | boolean;
107     text: string;
108     options?: Option[];
109     required: 'T' | 'F' | boolean | string;
110     disabled: 'T' | 'F' | boolean | string;
111 }
112
113 export type FrameType = 'newwindow' | 'modal' | 'inline';
114
115 export type ActionType =
116     | 'MAIN'
117     | 'START'
118     | 'MENU'
119     | 'STARTOPTIONS'
120     | 'RATELEVEL'
121     | 'RLVUPDATE'
122     | 'ADD';


========== IMG_4352.md ==========
---
photo: IMG_4352.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 112-138
orientation: 180
confidence: medium
notes: >
  Same file/tab as IMG_4350/IMG_4351 (types.ts), continues scrolling down.
  Significant motion-blur double-exposure ghosting throughout (editor
  auto-scrolling during exposure), same pattern as IMG_4350: a bold/sharp
  frame plus a fainter ghost frame offset by a few lines. Content below is
  the bold/sharp reading, cross-validated where possible against the ghost
  (ghost content at a given row consistently matches the real content of a
  row ~2-3 lines earlier, confirming the bold reading is self-consistent).
  Lines 115-122 (export type ActionType = 'MAIN'|'START'|'MENU'|
  'STARTOPTIONS'|'RATELEVEL'|'RLVUPDATE'|'ADD') exactly match IMG_4351's
  clean (unblurred) capture of the same block, which gives high confidence
  in this section despite the blur. Lines 124-127 (comment banner) have
  some residual uncertainty: content is clearly "// ====", "// Command
  Types", "// ====" but the exact count/order of the two dashed separator
  lines vs. a possible blank line 127 could not be fully resolved - shown
  below as the most standard/likely arrangement. Line 138 (last visible,
  right above the status bar) appears blank; a faint ghost of a further-
  scrolled frame shows "140  * Dropdown/select option item with selection
  state." (part of a new JSDoc block, /** likely at 139) bleeding through -
  not confidently part of this viewport, shown only as a note. Same
  explorer sidebar/tab/status bar as IMG_4350/4351 (types.ts selected,
  branch hitanshu/experimental*, 3 errors/0 warnings, No Solution).
---

112
113 export type FrameType = 'newwindow' | 'modal' | 'inline';
114
115 export type ActionType =
116     | 'MAIN'
117     | 'START'
118     | 'MENU'
119     | 'STARTOPTIONS'
120     | 'RATELEVEL'
121     | 'RLVUPDATE'
122     | 'ADD';
123
124 // ============================================
125 // Command Types
126 // ============================================
127
128 /**
129  * Browser command from backend XML responses.
130  * Verbs: SET_TEXT, LOAD_COMBO, NAVIGATE, etc.
131  */
132 export interface BrowserCommand {
133     verb: string; // SET_TEXT, LOAD_COMBO, etc.
134     noun: string; // Control matchcode or target
135     addinf: string; // Additional info
136     resfil?: string; // Resource file reference (optional)
137 }
138

(faint ghost only, not confidently in-frame: 139 /**  140 * Dropdown/select option item with selection state.)


========== IMG_4353.md ==========
---
photo: IMG_4353.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 127-154
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_4350-4352 (types.ts), continues scrolling down.
  Motion-blur double-exposure ghosting present throughout (same pattern:
  bold/sharp frame + fainter ghost frame offset a few lines earlier), but
  bold text is clearly legible here and content is fully self-consistent
  with IMG_4352's read of lines 127-138 (confirms line 138 is blank, and
  resolves IMG_4352's uncertainty about lines 139-140: line 139 = "/**",
  line 140 = "* Dropdown/select option item with selection state.",
  line 141 = "*/"). This photo is the clearest yet of this scroll region.
  Same explorer sidebar/tab/status bar as prior types.ts photos (types.ts
  selected, branch hitanshu/experimental*, 3 errors/0 warnings,
  No Solution). Bottom of frame cuts off mid-line at 154
  ("error?: Error;" - only the property is visible, rest of interface
  CommandResult not yet shown).
---

127
128 /**
129  * Browser command from backend XML responses.
130  * Verbs: SET_TEXT, LOAD_COMBO, NAVIGATE, etc.
131  */
132 export interface BrowserCommand {
133     verb: string; // SET_TEXT, LOAD_COMBO, etc.
134     noun: string; // Control matchcode or target
135     addinf: string; // Additional info
136     resfil?: string; // Resource file reference (optional)
137 }
138
139 /**
140  * Dropdown/select option item with selection state.
141  */
142 export interface ComboItem {
143     value: string;
144     label: string;
145     selected?: boolean;
146     disabled?: boolean;
147 }
148
149 /**
150  * Result of executing a browser command.
151  */
152 export interface CommandResult {
153     success: boolean;
154     error?: Error;


========== IMG_4354.md ==========
---
photo: IMG_4354.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 130-156
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_4350-4353 (types.ts), scrolled slightly further than
  IMG_4353 (by ~3 lines). Much sharper capture than IMG_4350/4352 - only
  faint residual ghosting, all text clearly legible. Confirms and extends
  IMG_4353's read: interface CommandResult now shows fields success, error,
  verb, noun (verb/noun continue beyond what IMG_4353 showed). Same explorer
  sidebar/tab/status bar as prior types.ts photos (types.ts selected, branch
  hitanshu/experimental*, 3 errors/0 warnings, No Solution). Bottom of frame
  cuts off right after line 156.
---

130  * Verbs: SET_TEXT, LOAD_COMBO, NAVIGATE, etc.
131  */
132 export interface BrowserCommand {
133     verb: string; // SET_TEXT, LOAD_COMBO, etc.
134     noun: string; // Control matchcode or target
135     addinf: string; // Additional info
136     resfil?: string; // Resource file reference (optional)
137 }
138
139 /**
140  * Dropdown/select option item with selection state.
141  */
142 export interface ComboItem {
143     value: string;
144     label: string;
145     selected?: boolean;
146     disabled?: boolean;
147 }
148
149 /**
150  * Result of executing a browser command.
151  */
152 export interface CommandResult {
153     success: boolean;
154     error?: Error;
155     verb: string;
156     noun: string;


========== IMG_4355.md ==========
---
photo: IMG_4355.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 148-175
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_4350-4354 (types.ts), continues scrolling down.
  Motion-blur double-exposure ghosting present (bold/sharp frame + fainter
  ghost frame offset a few lines earlier) but bold text fully legible and
  self-consistent with IMG_4354 (confirms interface CommandResult fields
  success/error/verb/noun and closing brace at 157). Same explorer
  sidebar/tab/status bar as prior types.ts photos (types.ts selected,
  branch hitanshu/experimental*, 3 errors/0 warnings, No Solution). Line
  173 text is cut off at the right edge of the photo; full text recovered
  from the original (un-rotated) wide view of the same frame.
---

148
149 /**
150  * Result of executing a browser command.
151  */
152 export interface CommandResult {
153     success: boolean;
154     error?: Error;
155     verb: string;
156     noun: string;
157 }
158
159 /**
160  * Shared store contract for legacy-style global variables.
161  * Used by SET_VARIABLE browser commands.
162  */
163 export interface GlobalVariableStore {
164     variables: Record<string, unknown>;
165     setVariable: (name: string, value: unknown) => void;
166     getVariable: <T = unknown>(name: string) => T | undefined;
167     getAllVariables: () => Record<string, unknown>;
168     clearVariables: () => void;
169 }
170
171 /**
172  * Known global variables from legacy VBScript system.
173  * Matches marrSessionInformation array and mstr* global variables.
174  */
175 export interface KnownGlobalVariables {


========== IMG_4356.md ==========
---
photo: IMG_4356.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 159-185
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_4350-4355 (types.ts), continues scrolling down.
  Motion-blur double-exposure ghosting present (bold/sharp frame + fainter
  ghost frame offset a few lines earlier) but bold text fully legible and
  self-consistent with IMG_4355 (confirms GlobalVariableStore interface
  159-169 and KnownGlobalVariables opening 172-175). New content:
  KnownGlobalVariables interface fields, each preceded by an inline JSDoc
  comment noting which marrSessionInformation array index it maps to.
  Line 184's comment is cut off at the right edge of the photo; full text
  recovered from the original (un-rotated) wide view of the same frame.
  Same explorer sidebar/tab/status bar as prior types.ts photos (types.ts
  selected, branch hitanshu/experimental*, 3 errors/0 warnings,
  No Solution). Bottom of frame cuts off right after line 185.
---

159 /**
160  * Shared store contract for legacy-style global variables.
161  * Used by SET_VARIABLE browser commands.
162  */
163 export interface GlobalVariableStore {
164     variables: Record<string, unknown>;
165     setVariable: (name: string, value: unknown) => void;
166     getVariable: <T = unknown>(name: string) => T | undefined;
167     getAllVariables: () => Record<string, unknown>;
168     clearVariables: () => void;
169 }
170
171 /**
172  * Known global variables from legacy VBScript system.
173  * Matches marrSessionInformation array and mstr* global variables.
174  */
175 export interface KnownGlobalVariables {
176     /** Company Location (sessionInformation[0]) */
177     mstrCompLoc?: string;
178     /** User ID (sessionInformation[1]) */
179     mstrUserID?: string;
180     /** Policy ID (sessionInformation[2]) */
181     mstrPolicyID?: string;
182     /** Node Key (sessionInformation[3]) */
183     mstrNodeKey?: string;
184     /** Current action context (sessionInformation[4]) - CRITICAL for NAVIGATE_CYCLING */
185     mstrAction?: string;


========== IMG_4357.md ==========
---
photo: IMG_4357.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 159-185
orientation: 180
confidence: high
notes: >
  Near-duplicate of IMG_4356 - same scroll position, same visible line range
  (159-185), same content (GlobalVariableStore interface 163-169 and
  KnownGlobalVariables interface 175-185 with its mstr* fields). Appears to
  be a second consecutive shot of the same editor state rather than a new
  scroll position. Same motion-blur double-exposure ghosting pattern as
  other photos in this sequence. Same explorer sidebar/tab/status bar as
  prior types.ts photos (types.ts selected, branch hitanshu/experimental*,
  3 errors/0 warnings, No Solution). See IMG_4356.md for the full verified
  transcription of this identical range.
---

159 /**
160  * Shared store contract for legacy-style global variables.
161  * Used by SET_VARIABLE browser commands.
162  */
163 export interface GlobalVariableStore {
164     variables: Record<string, unknown>;
165     setVariable: (name: string, value: unknown) => void;
166     getVariable: <T = unknown>(name: string) => T | undefined;
167     getAllVariables: () => Record<string, unknown>;
168     clearVariables: () => void;
169 }
170
171 /**
172  * Known global variables from legacy VBScript system.
173  * Matches marrSessionInformation array and mstr* global variables.
174  */
175 export interface KnownGlobalVariables {
176     /** Company Location (sessionInformation[0]) */
177     mstrCompLoc?: string;
178     /** User ID (sessionInformation[1]) */
179     mstrUserID?: string;
180     /** Policy ID (sessionInformation[2]) */
181     mstrPolicyID?: string;
182     /** Node Key (sessionInformation[3]) */
183     mstrNodeKey?: string;
184     /** Current action context (sessionInformation[4]) - CRITICAL for NAVIGATE_CYCLING */
185     mstrAction?: string;


========== IMG_4358.md ==========
---
photo: IMG_4358.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 163-193
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_4350-4357 (types.ts), scrolled further down than
  IMG_4356/4357. Sharp, clearly legible capture for lines 179-193 (minimal
  ghosting); upper portion (163-178, not re-transcribed here since already
  covered at higher confidence by IMG_4356/4357) still shows the familiar
  motion-blur double-exposure pattern. New content beyond IMG_4356/4357:
  KnownGlobalVariables interface fields continue past mstrAction (185) with
  mstrDiagnosticMode (sessionInformation[5]), mstrXMLDetail
  (sessionInformation[6]), mstrCurrentButton (marked "NEW - for action
  combining"), and mstrTransactionType. Same explorer sidebar/tab/status bar
  as prior types.ts photos (types.ts selected, branch hitanshu/experimental*,
  3 errors/0 warnings, No Solution). Bottom of frame cuts off right after
  line 193 (interface KnownGlobalVariables not yet closed).
---

179     mstrUserID?: string;
180     /** Policy ID (sessionInformation[2]) */
181     mstrPolicyID?: string;
182     /** Node Key (sessionInformation[3]) */
183     mstrNodeKey?: string;
184     /** Current action context (sessionInformation[4]) - CRITICAL for NAVIGATE_CYCLING */
185     mstrAction?: string;
186     /** Diagnostic mode (sessionInformation[5]) */
187     mstrDiagnosticMode?: string;
188     /** XML detail session data (sessionInformation[6]) */
189     mstrXMLDetail?: string;
190     /** Current button matchcode (NEW - for action combining) */
191     mstrCurrentButton?: string;
192     /** Transaction type */
193     mstrTransactionType?: string;


========== IMG_4359.md ==========
---
photo: IMG_4359.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 194-209
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_4350-4358 (types.ts), scrolled further down than
  IMG_4358. Sharp, clearly legible capture, only light residual ghosting.
  Completes the KnownGlobalVariables interface (fields mstrPolicyNumber,
  mstrPrimaryInsured, closing brace at 198), then a new JSDoc block and
  the CommandHandler function type (204-208). Same explorer sidebar/tab/
  status bar as prior types.ts photos (types.ts selected, branch
  hitanshu/experimental*, 3 errors/0 warnings, No Solution). Line 209 is
  blank and is the last visible line.
---

194     /** Policy number */
195     mstrPolicyNumber?: string;
196     /** Primary insured name */
197     mstrPrimaryInsured?: string;
198 }
199
200 /**
201  * Function type for individual command handlers.
202  * Returns void or Promise<void> for async operations.
203  */
204 export type CommandHandler = (
205     noun: string,
206     addinf: string,
207     resfil?: string,
208 ) => void | Promise<void>;
209


========== IMG_4361.md ==========
---
photo: IMG_4361.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 197-222
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_4350-4360 (types.ts), scrolled slightly further than
  IMG_4360 (by ~8 lines). Confirms IMG_4360's FieldPermission interface
  (213-214) and completes it with editable/required fields and closing
  brace (215-217). New content: a JSDoc block and the start of interface
  PagePermissions (219-222). Same explorer sidebar/tab/status bar as prior
  types.ts photos (types.ts selected, branch hitanshu/experimental*,
  3 errors/0 warnings, No Solution). Motion-blur ghosting present but bold
  text clearly legible. Bottom of frame cuts off right after line 222
  (interface PagePermissions body not yet shown - this is the last photo
  in this chunk).
---

197     mstrPrimaryInsured?: string;
198 }
199
200 /**
201  * Function type for individual command handlers.
202  * Returns void or Promise<void> for async operations.
203  */
204 export type CommandHandler = (
205     noun: string,
206     addinf: string,
207     resfil?: string,
208 ) => void | Promise<void>;
209
210 /**
211  * Field-level authorization flags for a single `matchcode`.
212  */
213 export interface FieldPermission {
214     visible: boolean;
215     editable: boolean;
216     required?: boolean;
217 }
218
219 /**
220  * Page-level authorization buckets for ASP-backed routes.
221  */
222 export interface PagePermissions {


========== IMG_4360.md ==========
---
photo: IMG_4360.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 200-214
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_4350-4359 (types.ts), scrolled slightly further than
  IMG_4359 (by ~6 lines). Confirms IMG_4359's CommandHandler type (200-208)
  and adds new content: a JSDoc block and the start of interface
  FieldPermission with its first field `visible`. Same explorer sidebar/
  tab/status bar as prior types.ts photos (types.ts selected, branch
  hitanshu/experimental*, 3 errors/0 warnings, No Solution). Motion-blur
  ghosting present but bold text clearly legible. Bottom of frame cuts off
  right after line 214.
---

200 /**
201  * Function type for individual command handlers.
202  * Returns void or Promise<void> for async operations.
203  */
204 export type CommandHandler = (
205     noun: string,
206     addinf: string,
207     resfil?: string,
208 ) => void | Promise<void>;
209
210 /**
211  * Field-level authorization flags for a single `matchcode`.
212  */
213 export interface FieldPermission {
214     visible: boolean;


========== IMG_4362.md ==========
---
photo: IMG_4362.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 204-233
orientation: 180
confidence: medium
notes: >
  Breadcrumb: aqs-web-ui > src > types.ts > User. Line 204 "export type CommandHandler = ("
  renders as a sticky-scroll pinned header; lines 205-206 are hidden behind it, and line 207
  is partially cut/overlapped by the sticky-scroll separator making it hard to read cleanly —
  transcribed as best-effort "resultUrl?: string," (medium confidence on that one line only,
  rest of the photo is high confidence). Bottom line 233 is a lone "}" partially cut off at
  frame edge, closing ActionPermissions.
  Tab bar: only "types.ts" open (unsaved dot). Explorer sidebar (aqs-web-ui/src expanded):
  utils/ (xml-detail-persistence.ts, zod-error-formatter.ts), app.css, app.tsx, context.ts,
  main.tsx, routes.tsx, store.ts, types.ts (selected). Above src/: .env.development,
  .env.production, .gitignore, .prettierrc, browser-commands-analy...(truncated, marked U),
  eslint.config.js, GLOBAL_COMPONENTS_A...(truncated, marked U) x2, index.html (cut off at
  bottom of visible tree).
  Status bar: aqs-web-ui, branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution",
  Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
204  export type CommandHandler = (
205  ⟪?⟫ (hidden behind sticky-scroll header)
206  ⟪?⟫ (hidden behind sticky-scroll header)
207      resultUrl?: string,
208  ) => void | Promise<void>;
209
210  /**
211   * Field-level authorization flags for a single `matchcode`.
212   */
213  export interface FieldPermission {
214      visible: boolean;
215      editable: boolean;
216      required?: boolean;
217  }
218
219  /**
220   * Page-level authorization buckets for ASP-backed routes.
221   */
222  export interface PagePermissions {
223      allowedAspFiles: string[];
224      deniedAspFiles: string[];
225  }
226
227  /**
228   * Action-level authorization buckets for backend verbs/commands.
229   */
230  export interface ActionPermissions {
231      allow: string[];
232      deny: string[];
233  }


========== IMG_4363.md ==========
---
photo: IMG_4363.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 219-246
orientation: 180
confidence: high
notes: >
  Breadcrumb: aqs-web-ui > src > types.ts > User. Photo has a motion/scroll double-exposure
  artifact: every line shows a faint duplicate of nearby text shifted ~2 lines down (looks
  like the editor was mid-smooth-scroll when the photo was taken). The ghost/duplicate layer
  was ignored; transcription follows only the crisp text aligned to each gutter line number.
  Content overlaps with IMG_4362 (lines 219-233 repeat PagePermissions/ActionPermissions seen
  there) and extends further to PermissionEffect, PagePermissionLookup, and the start of an
  action-lookup type at line 245-246 (cut off at bottom of frame).
  Tab bar: only "types.ts" open (unsaved dot), same as IMG_4362.
  Explorer sidebar identical to IMG_4362 (utils/ with xml-detail-persistence.ts,
  zod-error-formatter.ts; app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts,
  types.ts selected; .env.development, .env.production, .gitignore, .prettierrc,
  browser-commands-analy...(U), eslint.config.js, GLOBAL_COMPONENTS_A...(U) x2, index.html cut off).
  Status bar: aqs-web-ui, branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution".
---
219  /**
220   * Page-level authorization buckets for ASP-backed routes.
221   */
222  export interface PagePermissions {
223      allowedAspFiles: string[];
224      deniedAspFiles: string[];
225  }
226
227  /**
228   * Action-level authorization buckets for backend verbs/commands.
229   */
230  export interface ActionPermissions {
231      allow: string[];
232      deny: string[];
233  }
234
235  /**
236   * Generic permission effect used by lookup helpers.
237   */
238  export type PermissionEffect = 'allow' | 'deny';
239
240  /**
241   * Utility map for ASP page authorization decisions.
242   */
243  export type PagePermissionLookup = Record<string, PermissionEffect>;
244
245  /**
246   * Utility map for action authorization decisions. (line cut off at bottom of frame)


========== IMG_4364.md ==========
---
photo: IMG_4364.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 230-256
orientation: 180
confidence: high
notes: >
  Breadcrumb: aqs-web-ui > src > types.ts > User. Clean, sharp shot (no ghosting/motion
  blur unlike IMG_4363). Confirms/extends the ActionPermissionLookup and
  AuthorizationSnapshot-ish JSDoc block begun in IMG_4363. Tab bar: only "types.ts" open
  (unsaved dot). Explorer sidebar identical to IMG_4362/4363 (utils/ with
  xml-detail-persistence.ts, zod-error-formatter.ts; app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts selected; .env.development, .env.production, .gitignore,
  .prettierrc, browser-commands-analy...(U), eslint.config.js, GLOBAL_COMPONENTS_A...(U) x2,
  index.html cut off). Status bar: aqs-web-ui, branch "hitanshu/experimental*", 3 errors /
  0 warnings, "No Solution". JSDoc block starting at 250 documents a normalized authorization
  snapshot type whose declaration is not yet visible (cut off after line 256, presumably
  continues on the next screen/photo).
---
230  export interface ActionPermissions {
231      allow: string[];
232      deny: string[];
233  }
234
235  /**
236   * Generic permission effect used by lookup helpers.
237   */
238  export type PermissionEffect = 'allow' | 'deny';
239
240  /**
241   * Utility map for ASP page authorization decisions.
242   */
243  export type PagePermissionLookup = Record<string, PermissionEffect>;
244
245  /**
246   * Utility map for action authorization decisions.
247   */
248  export type ActionPermissionLookup = Record<string, PermissionEffect>;
249
250  /**
251   * Normalized authorization snapshot derived from `GetUserData` payloads.
252   *
253   * @remarks
254   * `rawSecurity` and `rawOptions` are retained for diagnostics and
255   * troubleshooting when incoming payload structures vary by `compLoc`.
256   */


========== IMG_4365.md ==========
---
photo: IMG_4365.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 238-264
orientation: 180
confidence: high
notes: >
  Breadcrumb: aqs-web-ui > src > types.ts > User. Faint scroll-motion ghosting present
  (same artifact as IMG_4363) but the crisp/primary text aligned to line numbers is fully
  legible; ghost duplicate ignored. This photo reveals the full PermissionSnapshot interface
  whose JSDoc was seen starting at line 250 in IMG_4364. Line 264 is blank (cut off at very
  bottom of frame but confirmed empty via close crop). Tab bar: only "types.ts" open (unsaved
  dot). Explorer sidebar identical to prior types.ts photos (utils/ with
  xml-detail-persistence.ts, zod-error-formatter.ts; app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts selected; .env.development, .env.production, .gitignore,
  .prettierrc, browser-commands-analy...(U), eslint.config.js, GLOBAL_COMPONENTS_A...(U) x2,
  index.html cut off). Status bar: aqs-web-ui, branch "hitanshu/experimental*", 3 errors /
  0 warnings, "No Solution".
---
238  export type PermissionEffect = 'allow' | 'deny';
239
240  /**
241   * Utility map for ASP page authorization decisions.
242   */
243  export type PagePermissionLookup = Record<string, PermissionEffect>;
244
245  /**
246   * Utility map for action authorization decisions.
247   */
248  export type ActionPermissionLookup = Record<string, PermissionEffect>;
249
250  /**
251   * Normalized authorization snapshot derived from `GetUserData` payloads.
252   *
253   * @remarks
254   * `rawSecurity` and `rawOptions` are retained for diagnostics and
255   * troubleshooting when incoming payload structures vary by `compLoc`.
256   */
257  export interface PermissionSnapshot {
258      rawSecurity: Record<string, unknown>;
259      rawOptions: Record<string, unknown>;
260      page: PagePermissions;
261      actions: ActionPermissions;
262      fields: Record<string, FieldPermission>;
263  }
264


========== IMG_4366.md ==========
---
photo: IMG_4366.JPG
type: vscode-code
file: aqs-web-ui/src/types.ts
lines: 243-264
orientation: 180
confidence: high
notes: >
  Breadcrumb: aqs-web-ui > src > types.ts > User. Duplicate/overlapping content of
  IMG_4365 (same PermissionSnapshot interface, same scroll position give or take a few
  lines) — no new lines beyond what IMG_4365 already captured. Faint scroll-motion ghosting
  present (same artifact as IMG_4363/4365) but primary text aligned to line numbers is fully
  legible. Line 264 confirmed blank. Tab bar: only "types.ts" open (unsaved dot). Explorer
  sidebar identical to prior types.ts photos (utils/ with xml-detail-persistence.ts,
  zod-error-formatter.ts; app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts,
  types.ts selected; .env.development, .env.production, .gitignore, .prettierrc,
  browser-commands-analy...(U), eslint.config.js, GLOBAL_COMPONENTS_A...(U) x2, index.html
  cut off). Status bar: aqs-web-ui, branch "hitanshu/experimental*", 3 errors / 0 warnings,
  "No Solution".
---
243  export type PagePermissionLookup = Record<string, PermissionEffect>;
244
245  /**
246   * Utility map for action authorization decisions.
247   */
248  export type ActionPermissionLookup = Record<string, PermissionEffect>;
249
250  /**
251   * Normalized authorization snapshot derived from `GetUserData` payloads.
252   *
253   * @remarks
254   * `rawSecurity` and `rawOptions` are retained for diagnostics and
255   * troubleshooting when incoming payload structures vary by `compLoc`.
256   */
257  export interface PermissionSnapshot {
258      rawSecurity: Record<string, unknown>;
259      rawOptions: Record<string, unknown>;
260      page: PagePermissions;
261      actions: ActionPermissions;
262      fields: Record<string, FieldPermission>;
263  }
264
