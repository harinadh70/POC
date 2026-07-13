# BUNDLE for src/components/field-renderer.tsx
# 13 photo fragment(s), ascending start-line order.


========== IMG_2098.md ==========
---
photo: IMG_2098.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 1-34
orientation: 180
confidence: high
notes: Active tab field-renderer.tsx (9+ problems, italic/modified). Other tab: date.tsx (9+). Squiggles under 'react' (line 1), '@mui/material' (line 7), '@mui/icons-material/InfoOutlined' (line 8). Line 34 partially cut at bottom: `placeholder?: string;`. Status bar: 65 errors 0 warnings, No Solution, branch hitanshu/experimental*, TypeScript JSX. Cursor/mouse pointer overlaps line 19 near `| null;`. Explorer same components list as IMG_2097; field-renderer.tsx selected with 9+ badge.
---
   1  import type { FC } from 'react';
   2  import { TextInput } from './text';
   3  import { SelectInput } from './select';
   4  import { RadioInput } from './radio';
   5  import { CheckboxInput } from './checkbox';
   6  import { DateInput } from './date';
   7  import { FormLabel, IconButton } from '@mui/material';
   8  import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
   9
  10  // types
  11  import type { CommitEventType, ControlType, OptionItem } from '@/types';
  12
  13  // -------------------------------------
  14
  15  export interface FieldRendererProps {
  16      /** Optional matchcode (field identifier) forwarded from FormRenderer */
  17      matchcode?: string;
  18      label: string;
  19      value: string | boolean | undefined | null;
  20      controlType: ControlType;
  21      options?: OptionItem[];
  22      onChange?: (val: string | boolean) => void;
  23      //onCommit?: (val: string | boolean, eventType: CommitEventType) => void;
  24      onCommit?: (val: string | boolean | OptionItem | null, eventType: CommitEventType) => void;
  25      showInfoIcon?: boolean;
  26      infoAriaLabel?: string;
  27      onInfoClick?: (value: string | boolean) => void;
  28      required?: boolean;
  29      disabled?: boolean;
  30      visible?: boolean;
  31      tabIndex?: number;
  32      width?: number | string;
  33      labelWidth?: number | string;
  34      placeholder?: string;


========== IMG_2099.md ==========
---
photo: IMG_2099.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 15-57 (with gap; sticky scroll shows line 15 header)
orientation: 180
confidence: high
notes: Sticky scroll header shows line 15 "export interface FieldRendererProps {" pinned at top while editor body shows lines 26-57. Explorer sidebar (components folder) visible with files: dialog.tsx, error-boundary.tsx, field-renderer.tsx (selected, "9+" modified marker), footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U = untracked/unmerged marker), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx (U marker). Other folders below components: config, constants, features (dot = changes), hooks, lib (dot), pages (dot), providers, services. Tab bar: date.tsx (9+), field-renderer.tsx (9+, active). Breadcrumb: aqs-web-ui > src > components > field-renderer.tsx > ... Status bar: branch hitanshu/experimental*, 65 errors 0 warnings, "No Solution". Minimap on right shows heavy red (errors/changes) highlighting.
---
15  export interface FieldRendererProps {
26      infoAriaLabel?: string;
27      onInfoClick?: (value: string | boolean) => void;
28      required?: boolean;
29      disabled?: boolean;
30      visible?: boolean;
31      tabIndex?: number;
32      width?: number | string;
33      labelWidth?: number | string;
34      placeholder?: string;
35      size?: 'small' | 'medium';
36      allowFreeText?: boolean;
37
38      // highlight
39      highlight?: boolean;
40      highlightColor?: string;
41      highlightBorderColor?: string;
42
43      // date-specific (optional)
44      dateFormat?: string;
45      minDate?: string;
46      maxDate?: string;
47
48      // input restrictions
49      isNumeric?: boolean;
50      maxLength?: number;
51
52      // Validation and loading state
53      validationError?: string;
54      isCommitting?: boolean;
55      top?: number | string;
56      left?: number | string;
57      ctrlwidth?: number | string;


========== IMG_2100.md ==========
---
photo: IMG_2100.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 15 (sticky) + 47-78
orientation: 180
confidence: high
notes: Sticky scroll header shows line 15 "export interface FieldRendererProps {" pinned at top while editor body shows lines 47-78 (interface closes at 59, then export const FieldRenderer starts at 61). Explorer sidebar same as IMG_2099 but "27" badge on source-control icon (27 changes). Tab bar: date.tsx (9+), field-renderer.tsx (9+, active). Breadcrumb: aqs-web-ui > src > components > field-renderer.tsx > ... Status bar: branch hitanshu/experimental*, 65 errors 0 warnings, "No Solution". Minimap shows red highlighting concentrated lower portion.
---
15  export interface FieldRendererProps {
47
48      // input restrictions
49      isNumeric?: boolean;
50      maxLength?: number;
51
52      // Validation and loading state
53      validationError?: string;
54      isCommitting?: boolean;
55      top?: number | string;
56      left?: number | string;
57      ctrlwidth?: number | string;
58      className?: string;
59  }
60
61  export const FieldRenderer: FC<FieldRendererProps> = ({
62      matchcode,
63      label,
64      value,
65      controlType,
66      options = [],
67      onChange,
68      onCommit,
69      required = false,
70      disabled = false,
71      visible = true,
72      tabIndex = 0,
73      width = 320,
74      labelWidth = 200,
75      placeholder = '',
76      size = 'small',
77      allowFreeText = true,
78      ⟪?⟫


========== IMG_2101.md ==========
---
photo: IMG_2101.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 61 (sticky) + 65-97
orientation: 180
confidence: high
notes: Sticky scroll header shows line 61 "export const FieldRenderer: FC<FieldRendererProps> = ({" pinned at top while editor body shows lines 65-97 (destructured props continuing). Explorer sidebar (components folder) with field-renderer.tsx selected (9+ marker), source-control badge "27". highlightColor default shown as a small white/color swatch box before the string '#fff8de'. Tab bar: date.tsx (9+), field-renderer.tsx (9+, active). Status bar: branch hitanshu/experimental*, 65 errors 0 warnings, "No Solution". Minimap shows dense red highlighting.
---
61  export const FieldRenderer: FC<FieldRendererProps> = ({
65      controlType,
66      options = [],
67      onChange,
68      onCommit,
69      required = false,
70      disabled = false,
71      visible = true,
72      tabIndex = 0,
73      width = 320,
74      labelWidth = 200,
75      placeholder = '',
76      size = 'small',
77      allowFreeText = true,
78
79      highlight = false,
80      highlightColor = '⟪color swatch⟫#fff8de',
81      highlightBorderColor = '',
82
83      dateFormat = 'MM/DD/YYYY',
84      minDate,
85      maxDate,
86      isNumeric = false,
87      maxLength,
88      top,
89      left,
90      ctrlwidth,
91      // Validation and loading state
92      validationError,
93      isCommitting = false,
94      className = '',
95      showInfoIcon = false,
96      infoAriaLabel = 'Show information',
97      onInfoClick,


========== IMG_2102.md ==========
---
photo: IMG_2102.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 61 (sticky) + 86-118
orientation: 180
confidence: high
notes: Sticky scroll header shows line 61 "export const FieldRenderer: FC<FieldRendererProps> = ({" pinned at top while editor body shows lines 86-118, includes end of destructured props (}) => { at line 98), local void declarations, early return, computed values, and start of JSX return. Explorer sidebar same as IMG_2101. Tab bar: date.tsx (9+), field-renderer.tsx (9+, active). Status bar: branch hitanshu/experimental*, 65 errors 0 warnings, "No Solution". Minimap shows red highlighting concentrated at top portion of file, less at this scroll position.
---
61  export const FieldRenderer: FC<FieldRendererProps> = ({
86      isNumeric = false,
87      maxLength,
88      top,
89      left,
90      ctrlwidth,
91      // Validation and loading state
92      validationError,
93      isCommitting = false,
94      className = '',
95      showInfoIcon = false,
96      infoAriaLabel = 'Show information',
97      onInfoClick,
98  }) => {
99      void labelWidth;
100     void top;
101     void left;
102
103     if (!visible) return null;
104
105     const stringValue = value === undefined || value === null ? '' : String(value);
106     const booleanValue = Boolean(value);
107
108     // Use ctrlwidth if provided, otherwise fall back to width prop
109     const ctrlWidthValue = (() => {
110         if (ctrlwidth === undefined || ctrlwidth === null) return width;
111         const numValue = Number(ctrlwidth);
112         if (isNaN(numValue)) return ctrlwidth;
113         return `${numValue}px`;
114     })();
115
116     return (
117         <div className={`grid grid-cols-[150px 1fr] items-center  w-full! gap-3 ${className}`}>
118             {/* Label column */}


========== IMG_2103.md ==========
---
photo: IMG_2103.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 61 (sticky) + 107-139
orientation: 180
confidence: high
notes: Sticky scroll header shows line 61 "export const FieldRenderer: FC<FieldRendererProps> = ({" pinned at top while editor body shows lines 107-139 (line 107 mostly cropped/blank at very top edge under tab bar). Shows ctrlWidthValue IIFE, start of JSX return, FormLabel with info icon button (IconButton with InfoOutlinedIcon), console.log debug statement. Heavy red squiggly underlines (JSX/lint warnings) visible throughout lines 118-139 in original screenshot. Explorer sidebar same as prior photos, field-renderer.tsx selected. Tab bar: date.tsx (9+), field-renderer.tsx (9+, active). Status bar: branch hitanshu/experimental*, 65 errors 0 warnings, "No Solution".
---
61  export const FieldRenderer: FC<FieldRendererProps> = ({
107 ⟪blank/cropped⟫
108     // Use ctrlwidth if provided, otherwise fall back to width prop
109     const ctrlWidthValue = (() => {
110         if (ctrlwidth === undefined || ctrlwidth === null) return width;
111         const numValue = Number(ctrlwidth);
112         if (isNaN(numValue)) return ctrlwidth;
113         return `${numValue}px`;
114     })();
115
116     return (
117         <div className={`grid grid-cols-[150px 1fr] items-center  w-full! gap-3 ${className}`}>
118             {/* Label column */}
119             {/* <Box sx={{ width: labelWidth }}> */}
120             <FormLabel
121                 required={required}
122                 className="formLabel inline-flex w-full items-center justify-end gap-1"
123             >
124                 {/* Field label text remains unchanged for all existing fields. */}
125                 <span className="leading-tight">{label}</span>
126
127                 {/* Optional info icon used by info-enabled fields only. */}
128                 {showInfoIcon ? (
129                     <IconButton
130                         size="small"
131                         onClick={() => {
132                             if (onInfoClick) {
133                                 console.log('[FieldRenderer] Info icon clicked');
134                                 onInfoClick(
135                                     typeof value === 'boolean' ? value : String(value ?? ''),
136                                 );
137                             }}
138                         }}
139                         aria-label={infoAriaLabel}


========== IMG_2104.md ==========
---
photo: IMG_2104.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 61 (sticky) + 123-155
orientation: 180
confidence: high
notes: Sticky scroll header shows line 61 "export const FieldRenderer: FC<FieldRendererProps> = ({" pinned at top while editor body shows lines 123-155. Continues IconButton JSX (disabled, sx, InfoOutlinedIcon), closes FormLabel, begins Control column section with conditional rendering for controlType === 'textbox' rendering a TextInput. Heavy red squiggly underlines (lint/JSX warnings) throughout. Explorer sidebar same as prior photos, field-renderer.tsx selected. Tab bar: date.tsx (9+), field-renderer.tsx (9+, active). Status bar: branch hitanshu/experimental*, 65 errors 0 warnings, "No Solution". Line 155 cut off at bottom edge (disabled={disabled} partially visible).
---
61  export const FieldRenderer: FC<FieldRendererProps> = ({
123             >
124                 {/* Field label text remains unchanged for all existing fields. */}
125                 <span className="leading-tight">{label}</span>
126
127                 {/* Optional info icon used by info-enabled fields only. */}
128                 {showInfoIcon ? (
129                     <IconButton
130                         size="small"
131                         onClick={() => {
132                             if (onInfoClick) {
133                                 console.log('[FieldRenderer] Info icon clicked');
134                                 onInfoClick(
135                                     typeof value === 'boolean' ? value : String(value ?? ''),
136                                 );
137                             }}
138                         }}
139                         aria-label={infoAriaLabel}
140                         disabled={false}
141                         sx={{ p: 0.25, flexShrink: 0 }}
142                     >
143                         <InfoOutlinedIcon fontSize="small" color="primary" />
144                     </IconButton>
145                 ) : null}
146             </FormLabel>
147             {/* </Box> */}
148
149             {/* Control column */}
150             {/* <Box sx={{ width }}> */}
151             {controlType === 'textbox' && (
152                 <TextInput
153                     value={stringValue}
154                     required={required}
155                     disabled={disabled}


========== IMG_2105.md ==========
---
photo: IMG_2105.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 61 (sticky) + 144-176
orientation: 180
confidence: high
notes: Sticky scroll header shows line 61 "export const FieldRenderer: FC<FieldRendererProps> = ({" pinned at top while editor body shows lines 144-176. Closes IconButton/FormLabel/Box, then TextInput block (controlType === 'textbox') fully shown, followed by start of SelectInput block (controlType === 'select'). Explorer sidebar same as prior photos, field-renderer.tsx selected. Tab bar: date.tsx (9+), field-renderer.tsx (9+, active). Status bar: branch hitanshu/experimental*, 65 errors 0 warnings, "No Solution". Line 176 cut off at bottom (options={options} partially visible).
---
61  export const FieldRenderer: FC<FieldRendererProps> = ({
144                 </IconButton>
145             ) : null}
146         </FormLabel>
147         {/* </Box> */}
148
149         {/* Control column */}
150         {/* <Box sx={{ width }}> */}
151         {controlType === 'textbox' && (
152             <TextInput
153                 value={stringValue}
154                 required={required}
155                 disabled={disabled}
156                 tabIndex={tabIndex}
157                 placeholder={placeholder}
158                 size={size}
159                 width={ctrlWidthValue}
160                 onChange={(v) => onChange?.(v)}
161                 onCommit={(v, e) => onCommit?.(v, e)}
162                 highlight={highlight}
163                 highlightColor={highlightColor}
164                 highlightBorderColor={highlightBorderColor}
165                 isNumeric={isNumeric}
166                 maxLength={maxLength}
167                 validationError={validationError}
168                 isCommitting={isCommitting}
169             />
170         )}
171
172         {controlType === 'select' && (
173             <SelectInput
174                 matchcode={matchcode}
175                 value={stringValue}
176                 options={options}


========== IMG_2106.md ==========
---
photo: IMG_2106.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 61 (sticky) + 165-197
orientation: 180
confidence: high
notes: Sticky scroll header shows line 61 "export const FieldRenderer: FC<FieldRendererProps> = ({" pinned at top while editor body shows lines 165-197. Continues/finishes TextInput props (165-169), then full SelectInput block (172-192) with onChange coercing object/typeof v checks, then start of RadioInput block (controlType === 'radio'). Explorer sidebar same as prior photos. Tab bar: date.tsx (9+), field-renderer.tsx (9+, active). Status bar: branch hitanshu/experimental*, 65 errors 0 warnings, "No Solution". Line 197 cut off at bottom (options={options} partially visible for RadioInput).
---
61  export const FieldRenderer: FC<FieldRendererProps> = ({
165                 isNumeric={isNumeric}
166                 maxLength={maxLength}
167                 validationError={validationError}
168                 isCommitting={isCommitting}
169             />
170         )}
171
172         {controlType === 'select' && (
173             <SelectInput
174                 matchcode={matchcode}
175                 value={stringValue}
176                 options={options}
177                 required={required}
178                 disabled={disabled}
179                 tabIndex={tabIndex}
180                 placeholder={placeholder}
181                 size={size}
182                 width={ctrlWidthValue}
183                 allowFreeText={allowFreeText}
184                 onChange={(v) =>
185                     onChange?.(typeof v === 'object' && v !== null ? String(v.value ?? '') : v)
186                 }
187                 onCommit={(v, e) => onCommit?.(v, e)}
188                 highlight={highlight}
189                 highlightColor={highlightColor}
190                 highlightBorderColor={highlightBorderColor}
191             />
192         )}
193
194         {controlType === 'radio' && (
195             <RadioInput
196                 value={stringValue}
197                 options={options}


========== IMG_2107.md ==========
---
photo: IMG_2107.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 61 (sticky) + 186-218
orientation: 180
confidence: high
notes: Sticky scroll header shows line 61 "export const FieldRenderer: FC<FieldRendererProps> = ({" pinned at top while editor body shows lines 186-218. Finishes SelectInput block, full RadioInput block (controlType === 'radio'), full CheckboxInput block (controlType === 'checkbox'), and start of the calendar/date IIFE block (controlType === 'calendar' || controlType === 'date'). Explorer sidebar same as prior photos, field-renderer.tsx selected (9+). Tab bar: date.tsx (9+), field-renderer.tsx (9+, active). Status bar: branch hitanshu/experimental*, 65 errors 0 warnings, "No Solution".
---
61  export const FieldRenderer: FC<FieldRendererProps> = ({
186             }
187                 onCommit={(v, e) => onCommit?.(v, e)}
188                 highlight={highlight}
189                 highlightColor={highlightColor}
190                 highlightBorderColor={highlightBorderColor}
191             />
192         )}
193
194         {controlType === 'radio' && (
195             <RadioInput
196                 value={stringValue}
197                 options={options}
198                 required={required}
199                 disabled={disabled}
200                 tabIndex={tabIndex}
201                 onChange={(v) => onChange?.(v)}
202                 onCommit={(v, e) => onCommit?.(v, e)}
203             />
204         )}
205
206         {controlType === 'checkbox' && (
207             <CheckboxInput
208                 checked={booleanValue}
209                 required={required}
210                 disabled={disabled}
211                 tabIndex={tabIndex}
212                 onChange={(v) => onChange?.(v)}
213                 onCommit={(v, e) => onCommit?.(v, e)}
214             />
215         )}
216
217         {(controlType === 'calendar' || controlType === 'date') &&
218             (() => {


========== IMG_2108.md ==========
---
photo: IMG_2108.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 61 (sticky) + 207-239
orientation: 180
confidence: high
notes: Sticky scroll header shows line 61 "export const FieldRenderer: FC<FieldRendererProps> = ({" pinned at top while editor body shows lines 207-239 (line 207 is cropped/mostly cut off at very top, only "<CheckboxInput" tag partially visible above 208). Finishes CheckboxInput block, then the calendar/date IIFE returning a DateInput component with full prop list, closing the IIFE call at line 238-239. This appears to be near end of the FieldRenderer component body. Explorer sidebar same as prior photos, field-renderer.tsx selected (9+). Tab bar: date.tsx (9+), field-renderer.tsx (9+, active). Status bar: branch hitanshu/experimental*, 65 errors 0 warnings, "No Solution".
---
61  export const FieldRenderer: FC<FieldRendererProps> = ({
207         <CheckboxInput
208             checked={booleanValue}
209             required={required}
210             disabled={disabled}
211             tabIndex={tabIndex}
212             onChange={(v) => onChange?.(v)}
213             onCommit={(v, e) => onCommit?.(v, e)}
214         />
215     )}
216
217     {(controlType === 'calendar' || controlType === 'date') &&
218         (() => {
219             return (
220                 <DateInput
221                     value={stringValue}
222                     required={required}
223                     disabled={disabled}
224                     tabIndex={tabIndex}
225                     placeholder={placeholder}
226                     size={size}
227                     width={ctrlWidthValue}
228                     onChange={(v) => onChange?.(v)}
229                     onCommit={(v, e) => onCommit?.(v, e)}
230                     dateFormat={dateFormat}
231                     minDate={minDate}
232                     maxDate={maxDate}
233                     highlight={highlight}
234                     highlightColor={highlightColor}
235                     highlightBorderColor={highlightBorderColor}
236                 />
237             );
238         })()}
239


========== IMG_2109.md ==========
---
photo: IMG_2109.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 228-260 (sticky scroll line 61)
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 61 `export const FieldRenderer: FC<FieldRendererProps> = ({`. Whole visible body covered in red squiggles (errors) and status bar shows 65 errors / 0 warnings, "No Solution" indicator. Tabs: date.tsx 9+, field-renderer.tsx 9+ (active, modified). Breadcrumb: aqs-web-ui > src > components > field-renderer.tsx. Explorer sidebar (src/components): dialog.tsx, error-boundary.tsx, field-renderer.tsx (9+ problems), footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx (U); folders: config, constants, features, hooks, lib, pages, providers, services; also OUTLINE, TIMELINE, C# PROJECT DETAILS panels. Branch hitanshu/experimental*. Minimap heavily red. Line 228 partially occluded/blurry at top edge (onChange line, cut). Cursor artifact overlaps line 244-245 near 'checkbox'/'calendar'.
---
  61  export const FieldRenderer: FC<FieldRendererProps> = ({
 228              onChange={(v) => onChange?.(v)}
 229              onCommit={(v, e) => onCommit?.(v, e)}
 230              dateFormat={dateFormat}
 231              minDate={minDate}
 232              maxDate={maxDate}
 233              highlight={highlight}
 234              highlightColor={highlightColor}
 235              highlightBorderColor={highlightBorderColor}
 236            />
 237          );
 238        })()}
 239
 240        {controlType !== 'textbox' &&
 241          controlType !== 'textarea' &&
 242          controlType !== 'select' &&
 243          controlType !== 'radio' &&
 244          controlType !== 'checkbox' &&
 245          controlType !== 'calendar' &&
 246          controlType !== 'date' && (
 247            <TextInput
 248              value={stringValue}
 249              required={required}
 250              disabled={disabled}
 251              tabIndex={tabIndex}
 252              placeholder={placeholder}
 253              size={size}
 254              width={ctrlWidthValue}
 255              onChange={(v) => onChange?.(v)}
 256              onCommit={(v, e) => onCommit?.(v, e)}
 257              highlight={highlight}
 258              highlightColor={highlightColor}
 259              highlightBorderColor={highlightBorderColor}
 260              validationError={validationError}


========== IMG_2110.md ==========
---
photo: IMG_2110.JPG
type: vscode-code
file: aqs-web-ui/src/components/field-renderer.tsx
lines: 247-267 (sticky scroll line 61)
orientation: 180
confidence: high
notes: Continuation of IMG_2109 scrolled down; end of file (267 is last visible/blank line). Sticky header line 61 `export const FieldRenderer: FC<FieldRendererProps> = ({`. Red squiggles on all code lines; 65 errors / 0 warnings; "No Solution". Tabs: date.tsx 9+, field-renderer.tsx 9+ (active). Same explorer sidebar as IMG_2109 (components folder expanded, PolicyLobGrid.tsx and XmlList.tsx marked U). Branch hitanshu/experimental*.
---
  61  export const FieldRenderer: FC<FieldRendererProps> = ({
 247            <TextInput
 248              value={stringValue}
 249              required={required}
 250              disabled={disabled}
 251              tabIndex={tabIndex}
 252              placeholder={placeholder}
 253              size={size}
 254              width={ctrlWidthValue}
 255              onChange={(v) => onChange?.(v)}
 256              onCommit={(v, e) => onCommit?.(v, e)}
 257              highlight={highlight}
 258              highlightColor={highlightColor}
 259              highlightBorderColor={highlightBorderColor}
 260              validationError={validationError}
 261              isCommitting={isCommitting}
 262            />
 263          )}
 264        </div>
 265      );
 266  };
 267
