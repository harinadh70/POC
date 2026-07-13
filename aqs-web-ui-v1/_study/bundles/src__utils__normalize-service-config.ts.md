# BUNDLE for src/utils/normalize-service-config.ts
# 24 photo fragment(s), ascending start-line order.


========== IMG_3882.md ==========
---
photo: IMG_3882.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 1-27
orientation: 180
confidence: high
notes: >
  Tab bar shows two tabs: "normalize-service-config.ts" (active) and
  "normalize-service-config cop..." (the copy file from IMG_3881, truncated
  in tab bar). Breadcrumb: aqs-web-ui > src > utils > normalize-service-config.ts.
  Explorer sidebar lists utils/ folder: dynamic-form-actions.ts, error-handlers.ts,
  execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts,
  http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts,
  menu-persistence.ts, normalize-service-config cop..., normalize-service-config.ts
  (highlighted/active), parse-combo-items.ts, parse-info-xml.ts,
  parse-permissions.ts, parse-querystring-params.ts. Problems: 2 errors, 0
  warnings, "No Solution". Status bar: branch hitanshu/experimental*, cursor
  Ln 1 Col 1, TypeScript, UTF-8, CRLF, Tab Size 4. No ghosting/blur in this
  photo - clean single exposure.
---
1   import type { NormalizedField, OptionItem } from '../types';
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
13      matchcode?: string;
14      id?: string;
15      label?: string;
16      ctrllabel?: string;
17
18      // Important for your backend:
19      controltype?: string; // 'textbox' | 'calendar' | 'combo' | 'radio' | 'button' etc.
20      type?: string;
21
22      text?: string;
23      value?: string;
24      checked?: boolean;
25
26      tabindex?: string | number;
27      ctrlwidth?: string | number;


========== IMG_3883.md ==========
---
photo: IMG_3883.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 1-27
orientation: 180
confidence: high
notes: >
  Duplicate/near-duplicate shot of IMG_3882 - same file, same visible line
  range (1-27), same content, same timestamp (7:27 PM). Only tab title
  differs slightly in rendering (italic "normalize-service-config.ts" as
  active/preview tab vs IMG_3882's non-italic). Same Explorer sidebar listing
  as IMG_3882. Problems: 2 errors, 0 warnings, "No Solution". Branch
  hitanshu/experimental*. No ghosting - clean single exposure.
---
1   import type { NormalizedField, OptionItem } from '../types';
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
13      matchcode?: string;
14      id?: string;
15      label?: string;
16      ctrllabel?: string;
17
18      // Important for your backend:
19      controltype?: string; // 'textbox' | 'calendar' | 'combo' | 'radio' | 'button' etc.
20      type?: string;
21
22      text?: string;
23      value?: string;
24      checked?: boolean;
25
26      tabindex?: string | number;
27      ctrlwidth?: string | number;


========== IMG_3884.md ==========
---
photo: IMG_3884.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 12, 26-51
orientation: 180
confidence: high
notes: >
  Sticky-scroll header pinned at top shows line 12 "export type ServiceField = {".
  Scrolled body content covers lines 26-51 (continuation of the ServiceField
  type). Same Explorer sidebar listing as prior photos. Problems: 2 errors,
  0 warnings, "No Solution". Timestamp 7:28 PM (one minute later than
  3882/3883, confirming scroll-down progression through the same file). No
  ghosting - clean single exposure.
---
12  export type ServiceField = {
26      tabindex?: string | number;
27      ctrlwidth?: string | number;
28      default?: string | boolean;
29      required?: string | boolean | number;
30      disabled?: string | boolean;
31      visible?: string | boolean;
32
33      // options sources
34      options?: Array<unknown>;
35      items?: Array<unknown>;
36      list?: Array<unknown>;
37      datasource?: Array<unknown>;
38      listitems?: Array<{ label: string; value: string }>;
39
40      // highlight (optional)
41      highlight?: string | boolean;
42      highlightColor?: string;
43      highlightBorderColor?: string;
44
45      // date specifics (optional)
46      dateFormat?: string;
47      minDate?: string;
48      maxDate?: string;
49      iscalendar?: string | boolean; // @iscalendar flag from API
50
51      // positioning (optional) - from @top, @left in API


========== IMG_3886.md ==========
---
photo: IMG_3886.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 12, 42-67
orientation: 180
confidence: high
notes: >
  Sticky-scroll header pinned at top shows line 12 "export type ServiceField = {".
  This photo captures the end of the ServiceField type (through line 59)
  and the start of the normalizeServiceConfig function (60-67), including
  helper functions normalizeKey and toControlType. Same Explorer sidebar
  listing as prior photos. Problems: 2 errors, 0 warnings, "No Solution".
  Timestamp 7:28 PM. No ghosting - clean single exposure.
---
12  export type ServiceField = {
42      highlightColor?: string;
43      highlightBorderColor?: string;
44
45      // date specifics (optional)
46      dateFormat?: string;
47      minDate?: string;
48      maxDate?: string;
49      iscalendar?: string | boolean; // @iscalendar flag from API
50
51      // positioning (optional) - from @top, @left in API
52      top?: string | number;
53      left?: string | number;
54
55      // input restrictions (optional)
56      maxlength?: string | number;
57
58      section?: string; // left/right/buttons
59  };
60
61  export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
62      const normalizeKey = (s?: string) => (s || '').toString().trim().toLowerCase();
63
64      const toControlType = (rawControlType?: string, rawType?: string) => {
65          const key = normalizeKey(rawControlType) || normalizeKey(rawType) || '';
66          if (key.includes('check')) return 'checkbox';
67          if (key.includes('radio')) return 'radio';


========== IMG_3885.md ==========
---
photo: IMG_3885.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 31-56
orientation: 180
confidence: medium
notes: >
  Motion-blur/double-exposure artifact present: a fainter ghost layer
  (offset ~5 lines earlier scroll position) overlaps the sharp/bold layer.
  Transcription below is the sharp/bold layer, aligned to gutter numbers
  31-56 shown in photo; content overlaps and corroborates IMG_3884 (26-51)
  and IMG_3886 (42-67), all internally consistent. Sticky header (not
  fully legible in this shot) implied line 12 "export type ServiceField = {".
  Same Explorer sidebar listing as prior photos. Problems: 2 errors, 0
  warnings, "No Solution". Timestamp 7:28 PM.
---
31      visible?: string | boolean;
32
33      // options sources
34      options?: Array<unknown>;
35      items?: Array<unknown>;
36      list?: Array<unknown>;
37      datasource?: Array<unknown>;
38      listitems?: Array<{ label: string; value: string }>;
39
40      // highlight (optional)
41      highlight?: string | boolean;
42      highlightColor?: string;
43      highlightBorderColor?: string;
44
45      // date specifics (optional)
46      dateFormat?: string;
47      minDate?: string;
48      maxDate?: string;
49      iscalendar?: string | boolean; // @iscalendar flag from API
50
51      // positioning (optional) - from @top, @left in API
52      top?: string | number;
53      left?: string | number;
54
55      // input restrictions (optional)
56      maxlength?: string | number;


========== IMG_3887.md ==========
---
photo: IMG_3887.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 49-75
orientation: 180
confidence: high
notes: >
  Continues toControlType() function body from IMG_3886, showing the full
  key-matching cascade (checkbox/radio/select/textarea/date/textbox/button
  fallbacks). Same Explorer sidebar listing as prior photos. Problems: 2
  errors, 0 warnings, "No Solution". Timestamp 7:28 PM. No ghosting - clean
  single exposure.
---
49      iscalendar?: string | boolean; // @iscalendar flag from API
50
51      // positioning (optional) - from @top, @left in API
52      top?: string | number;
53      left?: string | number;
54
55      // input restrictions (optional)
56      maxlength?: string | number;
57
58      section?: string; // left/right/buttons
59  };
60
61  export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
62      const normalizeKey = (s?: string) => (s || '').toString().trim().toLowerCase();
63
64      const toControlType = (rawControlType?: string, rawType?: string) => {
65          const key = normalizeKey(rawControlType) || normalizeKey(rawType) || '';
66          if (key.includes('check')) return 'checkbox';
67          if (key.includes('radio')) return 'radio';
68          if (key.includes('combo') || key.includes('dropdown') || key.includes('list'))
69              return 'select';
70          if (key.includes('area') || key.includes('textarea')) return 'textarea';
71          if (key.includes('date') || key.includes('calendar') || key.includes('time')) return 'date';
72          // text-like fallbacks
73          if (key.includes('text') || key.includes('box') || key === 'textbox') return 'textbox';
74          if (key.includes('ibutton')) return 'button';
75          return 'textbox';


========== IMG_3888.md ==========
---
photo: IMG_3888.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 59-85
orientation: 180
confidence: medium
notes: >
  Motion-blur/double-exposure artifact present: fainter ghost layer (earlier
  scroll position, offset ~5 lines) overlaps sharp/bold layer. Transcription
  is the sharp/bold layer, aligned to gutter numbers 59-85. Shows end of
  toControlType(), start of the return/.filter/.map pipeline over
  serviceArray, and the beginning of the @iscalendar handling comment.
  Corroborated by IMG_3887 (49-75) and IMG_3889 (85-96/104ish) for the
  overlapping ranges. Same Explorer sidebar listing as prior photos.
  Problems: 2 errors, 0 warnings, "No Solution". Timestamp 7:28 PM.
---
59  };
60
61  export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
62      const normalizeKey = (s?: string) => (s || '').toString().trim().toLowerCase();
63
64      const toControlType = (rawControlType?: string, rawType?: string) => {
65          const key = normalizeKey(rawControlType) || normalizeKey(rawType) || '';
66          if (key.includes('check')) return 'checkbox';
67          if (key.includes('radio')) return 'radio';
68          if (key.includes('combo') || key.includes('dropdown') || key.includes('list'))
69              return 'select';
70          if (key.includes('area') || key.includes('textarea')) return 'textarea';
71          if (key.includes('date') || key.includes('calendar') || key.includes('time')) return 'date';
72          // text-like fallbacks
73          if (key.includes('text') || key.includes('box') || key === 'textbox') return 'textbox';
74          if (key.includes('ibutton')) return 'button';
75          return 'textbox';
76      };
77
78      return (
79          (serviceArray || [])
80              // Filter out "buttons" for your FormRenderer if needed:
81              .filter((it) => normalizeKey(it.controltype) !== 'button')
82              .map((it) => {
83                  let controlType = toControlType(it.controltype, it.type);
84
85                  // If @iscalendar="T" and controltype="textbox", render as date field


========== IMG_3889.md ==========
---
photo: IMG_3889.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 61, 64, 66-90
orientation: 180
confidence: medium
notes: >
  Motion-blur/double-exposure artifact present: fainter ghost layer overlaps
  sharp/bold layer, offset a few lines. Transcription is the sharp/bold
  layer. Shows the .filter/.map pipeline and start of the @iscalendar
  textbox-to-date-field console.log debug block. Corroborated by IMG_3888
  (78-85) and IMG_3890 (86-98) for overlapping ranges. Same Explorer
  sidebar listing as prior photos. Problems: 2 errors, 0 warnings, "No
  Solution". Timestamp 7:28 PM.
---
61  export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
64      const toControlType = (rawControlType?: string, rawType?: string) => {
66          if (key.includes('check')) return 'checkbox';
67          if (key.includes('radio')) return 'radio';
68          if (key.includes('combo') || key.includes('dropdown') || key.includes('list'))
69              return 'select';
70          if (key.includes('area') || key.includes('textarea')) return 'textarea';
71          if (key.includes('date') || key.includes('calendar') || key.includes('time')) return 'date';
72          // text-like fallbacks
73          if (key.includes('text') || key.includes('box') || key === 'textbox') return 'textbox';
74          if (key.includes('ibutton')) return 'button';
75          return 'textbox';
76      };
77
78      return (
79          (serviceArray || [])
80              // Filter out "buttons" for your FormRenderer if needed:
81              .filter((it) => normalizeKey(it.controltype) !== 'button')
82              .map((it) => {
83                  let controlType = toControlType(it.controltype, it.type);
84
85                  // If @iscalendar="T" and controltype="textbox", render as date field
86                  if (controlType === 'textbox' && flag(it.iscalendar)) {
87                      console.log('[normalize-service-config] Calendar field detected:', {
88                          matchcode: it.matchcode,
89                          iscalendar: it.iscalendar,
90                          text: it.text,


========== IMG_3890.md ==========
---
photo: IMG_3890.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 61, 64, 74-98
orientation: 180
confidence: medium
notes: >
  Motion-blur/double-exposure artifact present: fainter ghost layer overlaps
  sharp/bold layer. Transcription is the sharp/bold layer. Shows the end of
  the calendar-detection debug block, controlType being reassigned to
  'date', and the start of options normalization (normalizedMatchcode,
  "// Normalize options" comment, options array declaration). The exact
  blank-line/brace placement around lines 93-98 is ambiguous across this
  photo and IMG_3891/IMG_3892 due to the blur - a closing "}" for the
  calendar if-block appears near line 93, but a zoomed re-check of
  IMG_3892's sharper capture of the same region suggests the brace may
  instead sit one line later (line 96) after the normalizedMatchcode
  assignment; transcribed here as read in this photo. Same Explorer
  sidebar listing as prior photos. Problems: 2 errors, 0 warnings, "No
  Solution". Timestamp 7:28 PM.
---
61  export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
64      const toControlType = (rawControlType?: string, rawType?: string) => {
74          if (key.includes('ibutton')) return 'button';
75          return 'textbox';
76      };
77
78      return (
79          (serviceArray || [])
80              // Filter out "buttons" for your FormRenderer if needed:
81              .filter((it) => normalizeKey(it.controltype) !== 'button')
82              .map((it) => {
83                  let controlType = toControlType(it.controltype, it.type);
84
85                  // If @iscalendar="T" and controltype="textbox", render as date field
86                  if (controlType === 'textbox' && flag(it.iscalendar)) {
87                      console.log('[normalize-service-config] Calendar field detected:', {
88                          matchcode: it.matchcode,
89                          iscalendar: it.iscalendar,
90                          text: it.text,
91                      });
92                      controlType = 'date';
93                  }
94
95                  const normalizedMatchcode = it.matchcode || it.id || randomKey();
96
97                  // Normalize options
98                  let options: OptionItem[] = [];


========== IMG_3891.md ==========
---
photo: IMG_3891.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 61, 81-104
orientation: 180
confidence: medium
notes: >
  Motion-blur/double-exposure artifact present: fainter ghost layer overlaps
  sharp/bold layer, offset ~3 lines. Transcription is the sharp/bold layer,
  cross-checked against IMG_3890 (overlap 86-98) and IMG_3892 (overlap
  95-104) - content consistent. Shows end of calendar-detection block,
  normalizedMatchcode/options setup, rawOptions source fallback chain, and
  start of getArrayFromRaw() helper. Same Explorer sidebar listing as prior
  photos. Problems: 2 errors, 0 warnings, "No Solution". Timestamp 7:28 PM.
---
61  export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
81              .filter((it) => normalizeKey(it.controltype) !== 'button')
82              .map((it) => {
83                  let controlType = toControlType(it.controltype, it.type);
84
85                  // If @iscalendar="T" and controltype="textbox", render as date field
86                  if (controlType === 'textbox' && flag(it.iscalendar)) {
87                      console.log('[normalize-service-config] Calendar field detected:', {
88                          matchcode: it.matchcode,
89                          iscalendar: it.iscalendar,
90                          text: it.text,
91                      });
92                      controlType = 'date';
93                  }
94
95                  const normalizedMatchcode = it.matchcode || it.id || randomKey();
96
97                  // Normalize options
98                  let options: OptionItem[] = [];
99                  const rawOptions =
100                     it.options || it.list || it.datasource || it.items || it.listitems;
101                 const getArrayFromRaw = (r: unknown): unknown[] => {
102                     if (Array.isArray(r)) return r as unknown[];
103                     if (!r || typeof r !== 'object') return [];
104                     const obj = r as Record<string, unknown>;


========== IMG_3892.md ==========
---
photo: IMG_3892.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 61, 82, 95-119
orientation: 180
confidence: medium
notes: >
  Motion-blur/double-exposure artifact present: fainter ghost layer overlaps
  sharp/bold layer, offset ~3 lines. Transcription is the sharp/bold layer.
  A high-zoom crop of lines 95-99 shows "const normalizedMatchcode = ..."
  at 95 followed by a lone "}" at 96 before the blank line/"// Normalize
  options" comment at 98 - this brace's structural target is unclear (see
  note on IMG_3890) and may instead be a ghost artifact of the calendar
  if-block's closing brace bleeding through from an adjacent scroll frame;
  transcribed literally as seen. Lines 105-119 (getArrayFromRaw's XML-shape
  handling, keyed-map fallback, and start of the rawArray.map/option-label
  building) are legible with a logical if/return structure. Same Explorer
  sidebar listing as prior photos. Problems: 2 errors, 0 warnings, "No
  Solution". Timestamp 7:28 PM.
---
61  export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
82              .map((it) => {
95                  const normalizedMatchcode = it.matchcode || it.id || randomKey();
96                  }
97
98                  // Normalize options
99                  let options: OptionItem[] = [];
100                 const rawOptions =
101                     it.options || it.list || it.datasource || it.items || it.listitems;
102                 const getArrayFromRaw = (r: unknown): unknown[] => {
103                     if (Array.isArray(r)) return r as unknown[];
104                     if (!r || typeof r !== 'object') return [];
105                     const obj = r as Record<string, unknown>;
106                     // Handle XML-like shape: { item: [...] } or { item: {...} }
107                     if (obj.item) {
108                         if (Array.isArray(obj.item)) return obj.item as unknown[];
109                         return [obj.item] as unknown[];
110                     }
111                     // Fallback: if object looks like a keyed map, return its values
112                     return Object.values(obj) as unknown[];
113                 };
114                 const rawArray = getArrayFromRaw(rawOptions);
115                 if (rawArray.length) {
116                     options = rawArray.map((o) => {
117                         if (o && typeof o === 'object') {
118                             const option = o as Record<string, unknown>;
119                             const label =


========== IMG_3893.md ==========
---
photo: IMG_3893.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 61-127
orientation: 180
confidence: medium
notes: Photo has heavy motion-blur/double-exposure ghosting across the whole code pane (every glyph shows a faint duplicate offset a few lines vertically and a few px horizontally), making several tokens uncertain even after cropping/zooming; minimap on right edge is a solid noise smear. Sticky-scroll headers visible at top: line 61 "export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {" and line 82 ".map((it) => {" (both truncated by ghosting, partially legible). Explorer sidebar (utils folder) shows: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy...ts (a copy file), normalize-service-config.ts (selected/highlighted), parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Tab bar shows only "normalize-service-config.ts" open. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Earlier OUTLINE panel (seen in the still-upside-down first read before rotation, same photo) listed sibling ts files: parse-querying-params, parse-permissions, parse-info-xmls, parse-combo-items, normalize-service-configs (selected), normalize-service-config copy, menu-persistence, logger-builders, local-storages, legacy-xml-details, http-instances, frame-routers, forms, fallback-strategies, execute-actions, error-handlers, dynamic-form-actions. Order of the label fallback chain (lines 119-122) and the nested id/@value/key/value chain (124-127+) was corrected/cross-checked against the sharper duplicate view of the same code in IMG_3894 (same file, overlapping line range); continues in IMG_3894.md for lines 128-140.
---
61: export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
82:     .map((it) => {

101:     const getArrayFromRaw = (r: unknown): unknown[] => {
104:       const obj = r as Record<string, unknown>;
105:       if (Array.isArray(r)) return r as unknown[];
106:       // Handle XML-like shape: { item: [...] } or { item: {...} }
107:       if (obj.item) {
108:         if (Array.isArray(obj.item)) return obj.item as unknown[];
109:         return [obj.item] as unknown[];
110:       }
111:       // Fallback: if object looks like a keyed map, return its values
112:       return Object.values(obj) as unknown[];
113:     };
⟪?⟫:     const rawArray = getArrayFromRaw(rawOptions);
114:     if (rawArray.length) {
115:       options = rawArray.map((o) => {
116:         if (o && typeof o === 'object') {
117:           const option = o as Record<string, unknown>;
118:           const label =
119:             (option['#text'] as string) ??
120:             (option['text'] as string) ??
121:             (option['label'] as string) ??
122:             (option['name'] as string) ??
123:             String(
124:               (option['@value'] as string) ??
125:               (option['value'] as string) ??
126:               String(
127:                 (option['id'] as string) ??


========== IMG_3894.md ==========
---
photo: IMG_3894.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 61-140
orientation: 180
confidence: medium
notes: Same file/session as IMG_3893, scrolled slightly further down (same sticky-scroll headers at lines 61 and 82 visible at top). Same heavy motion-blur/double-exposure ghosting throughout the code pane (each row shows a fainter duplicate of nearby lines a few px offset), plus visible camera-angle skew between the left gutter number column and the code text column, so exact line-number-to-text alignment past line ~130 is uncertain by roughly +/-1-2 lines even though the code content/order itself is legible and internally consistent. Content transcribed below reflects the sharpest/boldest layer at each row, cross-checked across multiple crops/zooms. Explorer sidebar (utils folder) identical to IMG_3893: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, "normalize-service-config cop..." (copy file), normalize-service-config.ts (selected), parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Only tab open: normalize-service-config.ts. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Minimap on right edge is a solid noise smear (motion blur).
---
61: export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
82:     .map((it) => {

115:       options = rawArray.map((o) => {
116:         if (o && typeof o === 'object') {
117:           const option = o as Record<string, unknown>;
118:           const label =
119:             (option['#text'] as string) ??
120:             (option['text'] as string) ??
121:             (option['label'] as string) ??
122:             (option['name'] as string) ??
123:             String(
124:               (option['@value'] as string) ??
125:               (option['value'] as string) ??
126:               String(
127:                 (option['id'] as string) ??
128:                 (option['key'] as string) ??
129:                 (option['value'] as string) ??
130:             );
⟪?⟫:         const value = String(
⟪?⟫:             (option['@value'] as string) ??
⟪?⟫:             (option['value'] as string) ??
⟪?⟫:             (option['id'] as string) ??
⟪?⟫:             (option['key'] as string) ??
⟪?⟫:             ⟪?⟫
136:           );
137:           return { label, value };
138:         }
139:         return { label: String(o), value: String(o) };
140:       });


========== IMG_3895.md ==========
---
photo: IMG_3895.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 61-149
orientation: 180
confidence: high
notes: Same file as IMG_3893/IMG_3894, scrolled further down; much sharper/less ghosting than those two photos. Sticky-scroll headers at top: line 61 (normalizeServiceConfig decl, truncated), line 82 ".map((it) => {", line 115 "options = rawArray.map((o) => {". A faint 4th sticky-looking gutter number "118" appears directly below 115 but with no distinct legible text of its own (likely a motion-blur ghost of "115", not a real distinct sticky row — could not resolve). IMPORTANT DISCREPANCY: the "const label =" fallback chain visible here (lines 126-130: option['id'] ?? option['key'] ?? '') is much SHORTER than the elaborate #text/text/label/name chain transcribed at the same apparent function in IMG_3893/IMG_3894 (lines 118-129 there). Likewise "const value = String(...)" here (131-136) ends with a bare "label," fallback rather than the nested String(id/key/value) seen before. This looks like a genuinely different edit state of the file (repo is dirty — status bar shows "hitanshu/experimental*" with uncommitted changes and "2 errors"), not a misread — flagging for reconciliation rather than forcing consistency. Exact line-number alignment around 134-136 has +/-1 uncertainty (crop boundary). Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Explorer/tabs identical to IMG_3893/3894 (normalize-service-config.ts selected/open, same utils/ sibling file list, same OUTLINE panel entries).
---
61: export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
82:     .map((it) => {
115:       options = rawArray.map((o) => {

126:           const label =
127:             (option['id'] as string) ??
128:             (option['key'] as string) ??
129:             '',
130:           );
131:           const value = String(
132:             (option['@value'] as string) ??
133:             (option['value'] as string) ??
134:             (option['id'] as string) ??
135:             (option['key'] as string) ??
136:             label,
137:           );
138:           return { label, value };
139:         }
140:         return { label: String(o), value: String(o) };
141:       });
142:
143:       // Remove duplicate options by value
144:       const seenValues = new Set<string>();
145:       options = options.filter((opt) => {
146:         if (seenValues.has(opt.value)) {
147:           return false;
148:         }
149:         seenValues.add(opt.value);


========== IMG_3896.md ==========
---
photo: IMG_3896.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 61-154
orientation: 180
confidence: medium
notes: Same file, scrolled further down again; same edit-state family as IMG_3895 (dedupe-by-value / dedupe-by-label logic, not the elaborate #text/text/label/name fallback chain seen in IMG_3893/3894). Very heavy motion-blur/double-exposure ghosting throughout the body (worse than IMG_3893/3894, looks like a larger vertical shift, roughly 4-5 lines), so line-number-to-text alignment below ~145 has +/-1 uncertainty; content/order itself is legible and internally consistent across crops. Sticky-scroll headers at top: line 61 (normalizeServiceConfig decl), line 82 ".map((it) => {", line 115 "options = rawArray.map((o) => {", line 130 "const value = String(" (all repeated/legible, ghosted). Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Explorer/tabs identical to prior photos in this series (normalize-service-config.ts selected/open, same utils/ sibling file list).
---
61: export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
82:     .map((it) => {
115:       options = rawArray.map((o) => {
130:           const value = String(

145:         if (seenValues.has(opt.value)) {
146:           return false;
147:         }
148:         seenValues.add(opt.value);
149:         return true;
150:       });
151:       // Further dedupe by label (case-insensitive). Prefer coded values
152:       // (where value !== label) over label-as-value entries.
153:       const labelMap = new Map<string, OptionItem>();
154:       for (const opt of options) {


========== IMG_3897.md ==========
---
photo: IMG_3897.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 144-169
orientation: 180
confidence: medium
notes: Same file/edit-state family as IMG_3895/3896 (dedupe-by-value then dedupe-by-label logic), scrolled to show the tail of the function. Heavy motion-blur/double-exposure ghosting throughout (each row has a fainter duplicate a few lines off), so exact line numbers below ~155 carry +/-1 uncertainty versus IMG_3896's numbering for the same statements (e.g. "const labelMap = new Map..." reads as line 153 in IMG_3896 but line 154 here); code content/order is consistent and legible. Line numbers 166-169 (closing braces + Array.from) confirmed/corrected against the sharper overlapping view in IMG_3898. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Explorer/tabs identical to prior photos in this series.
---
146:         options = options.filter((opt) => {
147:           return false;
148:         }
149:         seenValues.add(opt.value);
150:       });
151:       // Further dedupe by label (case-insensitive). Prefer coded values
152:       // (where value !== label) over label-as-value entries.
153:       const labelMap = new Map<string, OptionItem>();
154:       for (const opt of options) {
155:         const key = String(opt.label || opt.value || '')
156:           .trim()
157:           .toUpperCase();
158:         if (!labelMap.has(key)) {
159:           labelMap.set(key, opt);
160:           continue;
161:         }
162:         const existing = labelMap.get(key)!;
163:         const existingIsLabelOnly = existing.value === existing.label;
164:         const newIsLabelOnly = opt.value === opt.label;
165:         if (existingIsLabelOnly && !newIsLabelOnly) {
166:           labelMap.set(key, opt);
167:         }
168:       }
169:       options = Array.from(labelMap.values());


========== IMG_3898.md ==========
---
photo: IMG_3898.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 154-177
orientation: 180
confidence: high
notes: Same file, scrolled to show the end of the options-normalization block and the start of a new section handling positioning/width conversion (widthNum, topValue). Moderate ghosting (each row has a fainter duplicate offset a few lines) but this crop region is sharp enough to read with high confidence. This clarifies/confirms IMG_3897's tail (two closing braces at 167/168 before "options = Array.from(labelMap.values());" at 169, not one). Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Explorer/tabs identical to prior photos in this series (normalize-service-config.ts selected/open).
---
166:           labelMap.set(key, opt);
167:         }
168:       }
169:       options = Array.from(labelMap.values());
170:     }
171:
172:     const widthNum = it.ctrlwidth !== undefined ? Number(it.ctrlwidth) : undefined;
173:
174:     // Convert positioning values (top, left) to proper units
175:     const topValue = () => {
176:       if (it.top === undefined || it.top === null || it.top === '') return undefined;
177:       const num = Number(it.top);


========== IMG_3900.md ==========
---
photo: IMG_3900.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 174-198
orientation: 180
confidence: high
notes: Same file, scrolled to show topValue/leftValue/ctrlWidthValue helpers plus the start of "Default value logic" for different control types (checkbox, select). This crop is sharper than IMG_3898/3899 for the same region and was used to correct their line numbers by 1 in a couple of spots (leftValue block). Moderate ghosting present but resolvable. Line 198 ("let dv = ...") corrected to 199 per the sharper, unghosted view in IMG_3901. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Explorer sidebar (partially visible, cut off on left edge): ...orm-actions.ts, ...llers.ts, ...tion.ts, ...rategies.ts, ...er.ts, ...ce.ts, ...detail.ts, ...ge.ts, ...ts, ...der.ts, ...stence.ts, "...service-config cop..." , "...service-config.ts" (selected), ...bo-items.ts, ...xml.ts, ...missions.ts, ...ystring-params.ts (all left-truncated by the sidebar being narrow/cut off in this crop).
---
82:     .map((it) => {
174:     // Convert positioning values (top, left) to proper units
175:     const topValue = (() => {
176:       if (it.top === undefined || it.top === null || it.top === '') return undefined;
177:       const num = Number(it.top);
178:       return isNaN(num) ? it.top : `${num}px`;
179:     })();

181:     const leftValue = (() => {
182:       if (it.left === undefined || it.left === null || it.left === '')
183:         return undefined;
184:       const num = Number(it.left);
185:       return isNaN(num) ? it.left : `${num}px`;
186:     })();

188:     const ctrlWidthValue = widthNum !== undefined ? `${widthNum}px` : undefined;

190:     // Default value logic: handle different control types appropriately
191:     let defaultValueForType: string | boolean;
192:     if (controlType === 'checkbox') {
193:       defaultValueForType = Boolean(it.checked ?? flag(it.default));
194:     } else if (controlType === 'select') {
196:       // For select/combo, prefer @default or @value. If service provided a display
197:       // label in it.text but the options use codes as value, translate label
198:       // -> value so the select can match the correct option.
199:       let dv = (it.default as string) || (it.value as string) || '';


========== IMG_3899.md ==========
---
photo: IMG_3899.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 177-188
orientation: 180
confidence: medium
notes: Same file, scrolled further down; continues the positioning/units-conversion helpers (topValue, leftValue, ctrlWidthValue) started in IMG_3898. Heavy motion-blur/double-exposure ghosting throughout (each row shows a fainter duplicate of a line ~3 rows away), resolved by cross-referencing multiple crops/zooms; content order is internally consistent (topValue block mirrors leftValue block). Line numbers for the leftValue block (181-186) corrected against the sharper overlapping view in IMG_3900. Line 187 (between "})();" at 186 and "const ctrlWidthValue = ..." at 188) is blank, per IMG_3900. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Explorer/tabs identical to prior photos in this series (normalize-service-config.ts selected/open); sidebar also shows sibling files ...service-config cop...ts, ...service-config.ts, ...bo-items.ts, ...xml.ts, ...missions.ts, ...ystring-params.ts (partially cut off by crop).
---
177:     const num = Number(it.top);
178:     return isNaN(num) ? it.top : `${num}px`;
179:   })();

181:   const leftValue = (() => {
182:     if (it.left === undefined || it.left === null || it.left === '')
183:       return undefined;
184:     const num = Number(it.left);
185:     return isNaN(num) ? it.left : `${num}px`;
186:   })();

188:   const ctrlWidthValue = widthNum !== undefined ? `${widthNum}px` : undefined;


========== IMG_3901.md ==========
---
photo: IMG_3901.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 196-218
orientation: 180
confidence: medium
notes: Same file, scrolled to show the rest of "Default value logic" (select/combo label-to-value mapping, radio, textbox/date fallback) and the start of numeric-field detection (rawControlTypeKey, isNumericField). Code content/order is clear and confidently read (multiple sharp, low-ghosting crops), but repeated re-cropping of this exact region produced line numbers that drifted by +/-1 depending on the crop window (likely camera-angle skew between the gutter number column and the code text column) — three independent close-up crops of the same ~10-line span each gave a different absolute offset for where "defaultValueForType = dv;" / "} else if (controlType === 'radio')" fall. The sequence below uses the numbering anchored to the widest/most stable single crop (starting at 196, matching IMG_3900's continuation); treat all line numbers in this file as +/-1. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Explorer sidebar (left-truncated in crop): ...lers.ts, ...tion.ts, ...ategies.ts, ...er.ts, ...ce.ts, ...detail.ts, ...ge.ts, ...der.ts, ...stence.ts, "...service-config cop...", "...service-config.ts" (selected), ...bo-items.ts, ...xml.ts, ...missions.ts, ...string-params.ts.
---
196:       // For select/combo, prefer @default or @value. If service provided a display
197:       // label in `it.text` but the options use codes as `value`, translate label
198:       // -> value so the select can match the correct option.
199:       let dv = (it.default as string) || (it.value as string) || '';
200:       // If the API provided display text (it.text) and no explicit value, use it
201:       if (!dv && (it.text as string)) dv = it.text as string;
202:       // If dv doesn't match any option.value but matches an option.label, map it
203:       if (dv && options.length && !options.some((o) => o.value === dv)) {
204:         const byLabel = options.find((o) => o.label === dv);
205:         if (byLabel) dv = byLabel.value;
206:       }
207:       defaultValueForType = dv;
208:     } else if (controlType === 'radio') {
209:       // For radio, use default only (not @text)
210:       defaultValueForType = (it.default as string) || '';
211:     } else {
212:       // For textbox, date, etc., use only default/value (not @text)
213:       defaultValueForType = (it.value as string) ?? (it.default as string) ?? '';
214:     }
215:
216:     // Detect if original controltype was numeric
217:     const rawControlTypeKey = normalizeKey(it.controltype);
218:     const isNumericField =


========== IMG_3902.md ==========
---
photo: IMG_3902.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 214-224
orientation: 180
confidence: medium
notes: Same file, scrolled to show the tail of the default-value logic, numeric-field detection (isNumericField), and the start of the return object for the normalized field (controlType, matchcode, required, label, ...). Heavy motion-blur/double-exposure ghosting throughout; line numbers here drift by a couple lines relative to IMG_3901's numbering for the same statements (e.g. "defaultValueForType = (it.value...)" reads as 213 in IMG_3901's estimate but 215 here) — this whole series has a recurring +/-1-2 line-number drift between photos that could not be fully reconciled; code content/order transcribed is internally consistent. Bottom of the return object (further fields after "label: ...") is cut off by the taskbar in this photo. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Explorer sidebar (left-truncated): ...ervice-config cop..., ...ervice-config.ts (selected), ...bo-items.ts, ...xml.ts, ...missions.ts, ...ystring-params.ts.
---
214:       // For textbox, date, etc., use only default/value (not @text)
215:       defaultValueForType = (it.value as string) ?? (it.default as string) ?? '';
216:     // Detect if original controltype was numeric
217:     const rawControlTypeKey = normalizeKey(it.controltype);
218:     const isNumericField =
219:       rawControlTypeKey === 'numeric' || rawControlTypeKey === 'number';

220:     return {
221:       controlType,
222:       matchcode: normalizedMatchcode,
223:       required: flag(it.required),
224:       label: it.ctrllabel || it.label || normalizedMatchcode,


========== IMG_3903.md ==========
---
photo: IMG_3903.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 224-235
orientation: 180
confidence: medium
notes: Same file, scrolled to show more of the returned NormalizedField object literal (required, disabled, visible, tabIndex, width, options, defaultValue, placeholder, highlight, highlightColor). Heavy motion-blur/double-exposure ghosting throughout, with the recurring ~3-line-offset duplicate seen in earlier photos of this series; a "placeholder: (it.default as string) || ''," fragment appeared to repeat at what would be line 229 and again at 232 — treated as the same real line (232) ghosted onto 229's row, so line 229 is left unlisted rather than guessed. Absolute line numbers in this whole series drift +/-1-3 between photos and could not be fully reconciled against IMG_3902; content/field order transcribed is internally consistent. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Explorer sidebar (left-truncated): ...service-config.ts (selected), ...bo-items.ts, ...xml.ts, ...missions.ts, ...ystring-params.ts.
---
226:       visible: it.visible !== undefined ? flag(it.visible, true) : true,
227:       tabIndex: Number(it.tabindex ?? 0),
228:       width: widthNum ?? 320,

230:       options,
231:       defaultValue: defaultValueForType,
232:       placeholder: (it.default as string) || '',
233:       // highlight passthrough if you added highlighting
234:       highlight: flag(it.highlight),
235:       highlightColor: it.highlightColor,


========== IMG_3904.md ==========
---
photo: IMG_3904.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 224-244
orientation: 180
confidence: low
notes: Same file, scrolled to show more of the returned NormalizedField object literal (disabled/visible/tabIndex/width/placeholder/options/defaultValue, highlight/highlightColor/highlightBorderColor, dateFormat/minDate/maxDate, top/left/ctrlwidth). Very heavy motion-blur/double-exposure ghosting throughout (worst in this series), and repeated close-up crops of the same rows gave DIFFERENT line numbers for the same field (e.g. "disabled:" reads as line 226 in one crop and "visible:" reads as 226 in another, a few rows apart) — the absolute line numbering below could not be reliably pinned down and should be treated as approximate (+/-2) despite the field content/order itself being clear and internally consistent (cross-checked against IMG_3902/IMG_3903 which show the same object literal, also with their own +/-1-3 drift). Original photo (before this crop-level analysis) showed the object continuing further with an "// input restrictions passthrough" comment and a "maxlength: Number(it.maxlength) : undefined," field beyond what's captured below, plus additional ctrlwidth/top/left duplicate-looking fragments consistent with the same ghosting pattern. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", Ln 1 Col 1, TypeScript. Explorer sidebar (left-truncated): ...orm-actions.ts, ...dlers.ts, ...ction.ts, ...rategies.ts, ...ter.ts, ...older.ts, ...istence.ts, ...service-config cop..., ...service-config.ts (selected), ...bo-items.ts, ...xml.ts, ...missions.ts, ...ystring-params.ts.
---
82:     .map((it) => {
224:       required: flag(it.required),
225:       disabled: flag(it.disabled),
226:       visible: it.visible !== undefined ? flag(it.visible, true) : true,
227:       tabIndex: Number(it.tabindex ?? 0),
228:       width: widthNum ?? 320,
229:       placeholder: (it.default as string) || '',
230:       options,
231:       defaultValue: defaultValueForType,
232:       // highlight passthrough if you added highlighting
233:       highlight: flag(it.highlight),
234:       highlightColor: it.highlightColor,
235:       highlightBorderColor: it.highlightBorderColor,
236:       // date passthrough (auto-detected from @iscalendar or explicit date type)
237:       dateFormat: it.dateFormat || 'MM/DD/YYYY', // matches API format
238:       minDate: it.minDate,
239:       maxDate: it.maxDate,
240:       // positioning passthrough (absolute positioning values from API)
241:       top: topValue,
242:       left: leftValue,
243:       ctrlwidth: ctrlWidthValue,


========== IMG_3905.md ==========
---
photo: IMG_3905.JPG
type: vscode-code
file: aqs-web-ui/src/utils/normalize-service-config.ts
lines: 229-253
orientation: 180
confidence: medium
notes: >
  Photo shows a camera-motion-blur "ghosting" artifact: every text line has a
  faint duplicate of an earlier line (offset ~3 rows down) superimposed over it.
  Sharp/bright text was treated as ground truth; the dim duplicate was ignored
  as it repeats content 3 lines earlier. Line-number anchors 229 (top,
  "placeholder:") and 249-253 (bottom block, directly confirmed against gutter)
  are solid; blank-line placement in the 232-246 stretch is inferred (exactly 2
  blank lines must exist in that span to reconcile the count) and could shift
  by up to 2 lines. Sticky-scroll headers pinned at top show enclosing scope:
  line 61 "export const normalizeServiceConfig = (serviceArray: ServiceField[]):
  NormalizedField[] => {" and line 82 ".map((it) => {". Explorer sidebar (utils
  folder) visible: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts,
  fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts,
  legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts,
  normalize-service-config copy.ts (note: a "copy" file also exists),
  normalize-service-config.ts (selected/highlighted), parse-combo-items.ts,
  parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Tab bar:
  only normalize-service-config.ts open. Status bar: "No Solution", branch
  hitanshu/experimental*, 2 errors / 0 warnings ("2 ⚠0" symbol misread
  possible), workspace AQS_workspace.
---
[Sticky scroll headers, pinned at top of editor]
61      export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
82          .map((it) => {

[Main visible content]
229                 placeholder: (it.default as string) || '',
230                 options,
231                 defaultValue: defaultValueForType,
232
233                 // highlight passthrough if you added highlighting
234                 highlight: flag(it.highlight),
235                 highlightColor: it.highlightColor,
236                 highlightBorderColor: it.highlightBorderColor,
237
238                 // date passthrough (auto-detected from @iscalendar or explicit date type)
239                 dateFormat: it.dateFormat || 'MM/DD/YYYY', // matches API format
240                 minDate: it.minDate,
241                 maxDate: it.maxDate,
242                 // positioning passthrough (absolute positioning values from API)
243                 top: topValue,
244                 left: leftValue,
245                 ctrlwidth: ctrlWidthValue,
246                 // input restrictions passthrough
247                 isNumeric: isNumericField,
248                 maxLength: it.maxlength ? Number(it.maxlength) : undefined,
249                 // you can keep section info outside if needed
250                 section: it.section,
251             } as NormalizedField;
252         });
253     );
