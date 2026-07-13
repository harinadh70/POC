# BUNDLE for src/components/text.tsx
# 11 photo fragment(s), ascending start-line order.


========== IMG_2224.md ==========
---
photo: IMG_2224.JPG
type: vscode-code
file: aqs-web-ui/src/components/text.tsx
lines: 1-34
orientation: 180
confidence: high
notes: New tab opened next to date.tsx (still 9+ unsaved) — text.tsx now active/selected in Explorer (9+ unsaved). No sticky-scroll headers (file shown from line 1). Clean read, no ghosting/blur. Explorer sidebar (components folder) shows header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx (9+, selected), textarea.tsx, XmlList.tsx (U). Top-level src folders below components: config, constants, features, hooks, lib, pages, providers, services, types, utils, plus app.css, app.tsx, context.ts. Status bar: branch hitanshu/experimental*, 35 errors, 0 warnings, No Solution. Minimap on right shows a large red error marker near the bottom of the file. Line 34 is mostly obscured by the "No Solution" status-bar popup overlapping the bottom of the editor; only "tabIndex = 0" is legible, rest of line not visible.
---
1:  import React, { useCallback, useState } from 'react';
2:  import { CircularProgress, InputAdornment, TextField } from '@mui/material';
3:  import type { CommitEventType } from '@/types';
4:
5:  export interface TextInputProps {
6:      value: string;
7:      required?: boolean;
8:      disabled?: boolean;
9:      tabIndex?: number;
10:     placeholder?: string;
11:     size?: 'small' | 'medium';
12:     width?: number | string;
13:     onChange?: (val: string) => void;
14:     onCommit?: (val: string, eventType: CommitEventType) => void;
15:
16:     // NEW
17:     highlight?: boolean;
18:     highlightColor?: string;
19:     highlightBorderColor?: string;
20:
21:     // Numeric field support
22:     isNumeric?: boolean;
23:     maxLength?: number;
24:
25:     // Validation and loading state
26:     validationError?: string;
27:     isCommitting?: boolean;
28: }
29:
30: export const TextInput: React.FC<TextInputProps> = ({
31:     value,
32:     required,
33:     disabled,
34:     tabIndex = 0⟪?⟫


========== IMG_2225.md ==========
---
photo: IMG_2225.JPG
type: vscode-code
file: aqs-web-ui/src/components/text.tsx
lines: 15-47
orientation: 180
confidence: high
notes: Same file/tab as IMG_2224 (text.tsx), scrolled down. Sticky scroll header shows line 5 "export interface TextInputProps {". Photo has mild motion-blur ghosting (faint duplicate text ~1 line below each real line, from VS Code smooth-scroll animation) but the bold/foreground line is clearly legible throughout, so confidence remains high. Lines 15-34 match IMG_2224 exactly (cross-verified). Explorer/tab bar unchanged (text.tsx active, 9+ unsaved; date.tsx also open). Status bar: branch hitanshu/experimental*, 35 errors, 0 warnings, No Solution. highlightColor and highlightBorderColor values are shown with inline MUI/VS-Code color-swatch squares before the hex codes (yellow swatch for #fff566, teal swatch for #0a6f6f) — these are editor color-decorator icons, not part of the source text.
---
5:      export interface TextInputProps {
...
15:
16:     // NEW
17:     highlight?: boolean;
18:     highlightColor?: string;
19:     highlightBorderColor?: string;
20:
21:     // Numeric field support
22:     isNumeric?: boolean;
23:     maxLength?: number;
24:
25:     // Validation and loading state
26:     validationError?: string;
27:     isCommitting?: boolean;
28: }
29:
30: export const TextInput: React.FC<TextInputProps> = ({
31:     value,
32:     required,
33:     disabled,
34:     tabIndex = 0,
35:     placeholder = '',
36:     size = 'small',
37:     width = '100%',
38:     onChange,
39:     onCommit,
40:
41:     // NEW
42:     highlight = false,
43:     highlightColor = '#fff566',
44:     highlightBorderColor = '#0a6f6f',
45:
46:     // Numeric field support
47:     isNumeric = false,


========== IMG_2226.md ==========
---
photo: IMG_2226.JPG
type: vscode-code
file: aqs-web-ui/src/components/text.tsx
lines: 28-60
orientation: 180
confidence: high
notes: Same file/tab as IMG_2224/2225 (text.tsx), scrolled further down. Sticky scroll header shows line 5 "export interface TextInputProps {". Clean read, no ghosting. Lines 28-47 match IMG_2224/IMG_2225 exactly (cross-verified). Explorer/tab bar unchanged (text.tsx active, 9+ unsaved; date.tsx also open). Status bar: branch hitanshu/experimental*, 35 errors, 0 warnings, No Solution.
---
5:      export interface TextInputProps {
...
28: }
29:
30: export const TextInput: React.FC<TextInputProps> = ({
31:     value,
32:     required,
33:     disabled,
34:     tabIndex = 0,
35:     placeholder = '',
36:     size = 'small',
37:     width = '100%',
38:     onChange,
39:     onCommit,
40:
41:     // NEW
42:     highlight = false,
43:     highlightColor = '#fff566',
44:     highlightBorderColor = '#0a6f6f',
45:
46:     // Numeric field support
47:     isNumeric = false,
48:     maxLength,
49:
50:     // Validation and loading state
51:     validationError,
52:     isCommitting = false,
53: }) => {
54:     const [touched, setTouched] = useState(false);
55:     const requiredError = !!required && touched && String(value ?? '').trim() === '';
56:     const showError = requiredError || !!validationError;
57:     const errorMessage = validationError || (requiredError ? 'This field is required.' : '');
58:
59:     const handleChange = useCallback(
60:         (e: React.ChangeEvent<HTMLInputElement>) => {


========== IMG_2227.md ==========
---
photo: IMG_2227.JPG
type: vscode-code
file: aqs-web-ui/src/components/text.tsx
lines: 30-73
orientation: 180
confidence: high
notes: Same file/tab as IMG_2224-2226 (text.tsx), scrolled further down. Sticky scroll header shows line 30 "export const TextInput: React.FC<TextInputProps> = ({". Clean read, no ghosting. Lines 42-60 match IMG_2225/IMG_2226 exactly (cross-verified). Explorer/tab bar unchanged (text.tsx active, 9+ unsaved; date.tsx also open). Status bar: branch hitanshu/experimental*, 35 errors, 0 warnings, No Solution.
---
30:     export const TextInput: React.FC<TextInputProps> = ({
...
42:         highlight = false,
43:         highlightColor = '#fff566',
44:         highlightBorderColor = '#0a6f6f',
45:
46:         // Numeric field support
47:         isNumeric = false,
48:         maxLength,
49:
50:         // Validation and loading state
51:         validationError,
52:         isCommitting = false,
53:     }) => {
54:         const [touched, setTouched] = useState(false);
55:         const requiredError = !!required && touched && String(value ?? '').trim() === '';
56:         const showError = requiredError || !!validationError;
57:         const errorMessage = validationError || (requiredError ? 'This field is required.' : '');
58:
59:         const handleChange = useCallback(
60:             (e: React.ChangeEvent<HTMLInputElement>) => {
61:                 let newValue = e.target.value;
62:
63:                 // If numeric field, filter non-digit characters
64:                 if (isNumeric) {
65:                     newValue = newValue.replace(/[^\d]/g, '');
66:                 }
67:
68:                 // Enforce maxLength - truncate if exceeds
69:                 if (maxLength && newValue.length > maxLength) {
70:                     newValue = newValue.slice(0, maxLength);
71:                 }
72:
73:                 onChange?.(newValue);


========== IMG_2228.md ==========
---
photo: IMG_2228.JPG
type: vscode-code
file: aqs-web-ui/src/components/text.tsx
lines: 57-89
orientation: 180
confidence: high
notes: Same file/tab as IMG_2224-2227 (text.tsx), scrolled further down. Sticky scroll header shows line 30 "export const TextInput: React.FC<TextInputProps> = ({". Clean read, no ghosting. Lines 57-73 match IMG_2226/IMG_2227 exactly (cross-verified). Explorer/tab bar unchanged (text.tsx active, 9+ unsaved; date.tsx also open). Status bar: branch hitanshu/experimental*, 35 errors, 0 warnings, No Solution. Line 89 is obscured/cut off by the "No Solution" status-bar popup at the bottom of the screen — not transcribed.
---
30:     export const TextInput: React.FC<TextInputProps> = ({
...
57:         const errorMessage = validationError || (requiredError ? 'This field is required.' : '');
58:
59:         const handleChange = useCallback(
60:             (e: React.ChangeEvent<HTMLInputElement>) => {
61:                 let newValue = e.target.value;
62:
63:                 // If numeric field, filter non-digit characters
64:                 if (isNumeric) {
65:                     newValue = newValue.replace(/[^\d]/g, '');
66:                 }
67:
68:                 // Enforce maxLength - truncate if exceeds
69:                 if (maxLength && newValue.length > maxLength) {
70:                     newValue = newValue.slice(0, maxLength);
71:                 }
72:
73:                 onChange?.(newValue);
74:             },
75:             [onChange, isNumeric, maxLength],
76:         );
77:
78:         const handlePaste = useCallback(
79:             (e: React.ClipboardEvent<HTMLInputElement>) => {
80:                 const pastedText = e.clipboardData.getData('text');
81:                 const currentValue = (e.target as HTMLInputElement).value;
82:                 const selectionStart = (e.target as HTMLInputElement).selectionStart || 0;
83:                 const selectionEnd = (e.target as HTMLInputElement).selectionEnd || 0;
84:
85:                 // Calculate what the new value would be after paste
86:                 const beforeSelection = currentValue.slice(0, selectionStart);
87:                 const afterSelection = currentValue.slice(selectionEnd);
88:                 let newValue = beforeSelection + pastedText + afterSelection;
89:                 ⟪?⟫


========== IMG_2229.md ==========
---
photo: IMG_2229.JPG
type: vscode-code
file: aqs-web-ui/src/components/text.tsx
lines: 73-102
orientation: 180
confidence: high
notes: Same file/tab as IMG_2224-2228 (text.tsx), scrolled further down. Two sticky scroll headers shown: line 30 "export const TextInput: React.FC<TextInputProps> = ({" and line 59 "const handleChange = useCallback(" / line 60 "(e: React.ChangeEvent<HTMLInputElement>) => {". Clean read, no ghosting — resolves the line 89 that was cut off/illegible in IMG_2228: it is blank. Lines 73-88 match IMG_2227/IMG_2228 exactly (cross-verified). Explorer/tab bar unchanged (text.tsx active, 9+ unsaved; date.tsx also open). Status bar: branch hitanshu/experimental*, 35 errors, 0 warnings, No Solution.
---
30:     export const TextInput: React.FC<TextInputProps> = ({
59:         const handleChange = useCallback(
60:             (e: React.ChangeEvent<HTMLInputElement>) => {
...
73:                 onChange?.(newValue);
74:             },
75:             [onChange, isNumeric, maxLength],
76:         );
77:
78:         const handlePaste = useCallback(
79:             (e: React.ClipboardEvent<HTMLInputElement>) => {
80:                 const pastedText = e.clipboardData.getData('text');
81:                 const currentValue = (e.target as HTMLInputElement).value;
82:                 const selectionStart = (e.target as HTMLInputElement).selectionStart || 0;
83:                 const selectionEnd = (e.target as HTMLInputElement).selectionEnd || 0;
84:
85:                 // Calculate what the new value would be after paste
86:                 const beforeSelection = currentValue.slice(0, selectionStart);
87:                 const afterSelection = currentValue.slice(selectionEnd);
88:                 let newValue = beforeSelection + pastedText + afterSelection;
89:
90:                 // Apply numeric filter if needed
91:                 if (isNumeric) {
92:                     newValue = newValue.replace(/[^\d]/g, '');
93:                 }
94:
95:                 // Enforce maxLength
96:                 if (maxLength && newValue.length > maxLength) {
97:                     e.preventDefault();
98:                     newValue = newValue.slice(0, maxLength);
99:                     onChange?.(newValue);
100:                }
101:            },
102:            [onChange, isNumeric, maxLength],


========== IMG_2230.md ==========
---
photo: IMG_2230.JPG
type: vscode-code
file: aqs-web-ui/src/components/text.tsx
lines: 86-115
orientation: 180
confidence: high
notes: Same file/tab as IMG_2224-2229 (text.tsx), scrolled further down. Sticky scroll headers show line 30 "export const TextInput: React.FC<TextInputProps> = ({" and lines 78-79 "const handlePaste = useCallback(" / "(e: React.ClipboardEvent<HTMLInputElement>) => {". Photo has mild motion-blur ghosting (faint duplicate ~1 line below each real line) but the bold/foreground line is clearly legible throughout. Lines 86-102 match IMG_2228/IMG_2229 exactly (cross-verified). Explorer/tab bar unchanged (text.tsx active, 9+ unsaved; date.tsx also open). Status bar: branch hitanshu/experimental*, 35 errors, 0 warnings, No Solution.
---
30:     export const TextInput: React.FC<TextInputProps> = ({
78:         const handlePaste = useCallback(
79:             (e: React.ClipboardEvent<HTMLInputElement>) => {
...
86:                 const beforeSelection = currentValue.slice(0, selectionStart);
87:                 const afterSelection = currentValue.slice(selectionEnd);
88:                 let newValue = beforeSelection + pastedText + afterSelection;
89:
90:                 // Apply numeric filter if needed
91:                 if (isNumeric) {
92:                     newValue = newValue.replace(/[^\d]/g, '');
93:                 }
94:
95:                 // Enforce maxLength
96:                 if (maxLength && newValue.length > maxLength) {
97:                     e.preventDefault();
98:                     newValue = newValue.slice(0, maxLength);
99:                     onChange?.(newValue);
100:                }
101:            },
102:            [onChange, isNumeric, maxLength],
103:        );
104:
105:        const handleBlur = useCallback(() => {
106:            setTouched(true);
107:            onCommit?.(value ?? '', 'blur');
108:        }, [onCommit, value]);
109:
110:        const handleKeyDown = useCallback(
111:            (e: React.KeyboardEvent<HTMLInputElement>) => {
112:                if (e.key === 'Enter') {
113:                    setTouched(true);
114:                    onCommit?.(value ?? '', 'enter');
115:                }


========== IMG_2231.md ==========
---
photo: IMG_2231.JPG
type: vscode-code
file: aqs-web-ui/src/components/text.tsx
lines: 101-131
orientation: 180
confidence: medium
notes: Same file/tab as IMG_2224-2230 (text.tsx), scrolled to the end of the visible handlers (last photo in this batch). Sticky scroll headers show line 30 "export const TextInput: React.FC<TextInputProps> = ({" and lines 78-79 "const handlePaste = useCallback(" / "(e: React.ClipboardEvent<HTMLInputElement>) => {". Lines 101-115 match IMG_2230 exactly (cross-verified against that cleaner photo) and are transcribed from that source, not re-derived here. Lines 116-131 (the allowedKeys block) are affected by SEVERE double-exposure ghosting — two overlapping scroll frames offset by ~3 lines, both nearly equally sharp in places, making per-line assignment genuinely ambiguous in several spots even after extensive high-zoom cropping. High confidence anchors within this block: line 130 "];" and line 131 "const isAllowedKey = allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey;" (clearly legible), the comment "// Allow: Backspace, Delete, Tab, Escape, Enter, and non-printable keys", and that array element 'ArrowRight' is the last item before the closing bracket (line 129). The array's full membership (Backspace, Delete, Tab, Escape, Enter, ArrowLeft, ArrowRight, Home, End) is well supported by legible bold+ghost fragments, but the exact line-by-line order for lines ~120-128 could not be reliably resolved from this photo — presented as best-effort reconstruction; treat that specific range as low confidence. Explorer/tab bar unchanged (text.tsx active, 9+ unsaved; date.tsx also open). Status bar: branch hitanshu/experimental*, 35 errors, 0 warnings, No Solution.
---
30:     export const TextInput: React.FC<TextInputProps> = ({
78:         const handlePaste = useCallback(
79:             (e: React.ClipboardEvent<HTMLInputElement>) => {
...
101:            },
102:            [onChange, isNumeric, maxLength],
103:        );
104:
105:        const handleBlur = useCallback(() => {
106:            setTouched(true);
107:            onCommit?.(value ?? '', 'blur');
108:        }, [onCommit, value]);
109:
110:        const handleKeyDown = useCallback(
111:            (e: React.KeyboardEvent<HTMLInputElement>) => {
112:                if (e.key === 'Enter') {
113:                    setTouched(true);
114:                    onCommit?.(value ?? '', 'enter');
115:                }
116:                // If maxLength is set and we're at the limit, prevent regular character input
117:                if (maxLength && value && value.length >= maxLength) {
118:                    // Allow: Backspace, Delete, Tab, Escape, Enter, and non-printable keys
119:                    const allowedKeys = [⟪?⟫
120:                        'Backspace',⟪?⟫
121:                        'Delete',⟪?⟫
122:                        'Tab',⟪?⟫
123:                        'Escape',⟪?⟫
124:                        'Enter',⟪?⟫
125:                        'ArrowLeft',⟪?⟫
126:                        'Home',⟪?⟫
127:                        'End',⟪?⟫
128:                        ⟪?⟫
129:                        'ArrowRight',
130:                    ];
131:                    const isAllowedKey = allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey;


========== IMG_2232.md ==========
---
photo: IMG_2232.JPG
type: vscode-code
file: aqs-web-ui/src/components/text.tsx
lines: 105-139 (sticky header shows line 30)
orientation: 180
confidence: medium
notes: Photo has severe motion-blur/double-exposure ghosting throughout the code pane — appears to be VS Code smooth-scroll animation caught mid-scroll, producing two overlapping renderings of the file ~2-3 lines apart (both line numbers and text doubled, one bold/sharp, one faint/gray). Transcription below reconstructs the single coherent line sequence by combining the sharp layer with the faint layer at each row (cross-validated: closing braces and useCallback structure are self-consistent). Confidence is medium because the ordering of the last four items in the allowedKeys array (Home / ArrowLeft / End / ArrowRight, lines 126-129) is less certain due to the ghosting, though the set of 9 items and overall structure are clear. Sticky-scroll header pinned at top: line 30 "export const TextInput: React.FC<TextInputProps> = ({". Tab bar: "date.tsx" and "text.tsx" both open (both showing "9+" unsaved-changes badge). Breadcrumb: aqs-web-ui > src > components > text.tsx. Explorer sidebar (components folder) visible: header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx (selected), textarea.tsx, XmlList.tsx (U). Other top-level src folders visible: config, constants, features, hooks, lib, pages, providers, services, types, utils; files app.css, app.tsx, context.ts. Status bar: workspace aqs-web-ui, branch hitanshu/experimental* (dirty), "No Solution", 35 problems icon, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp 4:42 PM 7/10/2026.
---
30      export const TextInput: React.FC<TextInputProps> = ({
...
105     const handleBlur = useCallback(() => {
106       setTouched(true);
107       onCommit?.(value ?? '', 'blur');
108     }, [onCommit, value]);
109
110     const handleKeyDown = useCallback(
111       (e: React.KeyboardEvent<HTMLInputElement>) => {
112         if (e.key === 'Enter') {
113           setTouched(true);
114           onCommit?.(value ?? '', 'enter');
115         }
116
117         // If maxLength is set and we're at the limit, prevent regular character input
118         if (maxLength && value && value.length >= maxLength) {
119           // Allow: Backspace, Delete, Tab, Escape, Enter, and non-printable keys
120           const allowedKeys = [
121             'Backspace',
122             'Delete',
123             'Tab',
124             'Escape',
125             'Enter',
126             'Home',
127             'ArrowLeft',
128             'End',
129             'ArrowRight',
130           ];
131           const isAllowedKey = allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey;
132
133           if (!isAllowedKey && e.key.length === 1) {
134             e.preventDefault();
135           }
136         }
137       },
138       [onCommit, value, maxLength]
139     );


========== IMG_2233.md ==========
---
photo: IMG_2233.JPG
type: vscode-code
file: aqs-web-ui/src/components/text.tsx
lines: 133-163 (sticky headers show lines 30, 110, 111)
orientation: 180
confidence: high
notes: Clear, sharp image, no ghosting. Sticky-scroll headers pinned at top show enclosing scope: line 30 "export const TextInput: React.FC<TextInputProps> = ({", line 110 "const handleKeyDown = useCallback(", line 111 "(e: React.KeyboardEvent<HTMLInputElement>) => {". Red squiggly underlines appear under most JSX prop lines 143-162 (likely a "No Solution"/project-config TS issue rather than real errors, per status bar "No Solution", 35 problems). Tab bar: date.tsx and text.tsx (both "9+" unsaved). Breadcrumb: aqs-web-ui > src > components > text.tsx. Explorer sidebar (components folder): header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx (selected, 9+), textarea.tsx, XmlList.tsx (U). Other src folders: config, constants, features, hooks, lib, pages, providers, services, types, utils; files app.css, app.tsx, context.ts. Status bar: aqs-web-ui, branch hitanshu/experimental* (dirty), No Solution, 35 problems, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp 4:42 PM 7/10/2026.
---
30      export const TextInput: React.FC<TextInputProps> = ({
110     const handleKeyDown = useCallback(
111       (e: React.KeyboardEvent<HTMLInputElement>) => {
...
133           if (!isAllowedKey && e.key.length === 1) {
134             e.preventDefault();
135           }
136         }
137       },
138       [onCommit, value, maxLength],
139     );
140
141     return (
142       <TextField
143         size={size}
144         value={value ?? ''}
145         onChange={handleChange}
146         onBlur={handleBlur}
147         onKeyDown={handleKeyDown}
148         onPaste={handlePaste}
149         placeholder={placeholder}
150         disabled={disabled || isCommitting}
151         error={showError}
152         helperText={errorMessage || ' '}
153         inputProps={{
154           tabIndex,
155           maxLength: maxLength || undefined,
156           inputMode: isNumeric ? 'numeric' : 'text',
157         }}
158         fullWidth
159         InputProps={{
160           endAdornment: isCommitting ? (
161             <InputAdornment position="end">
162               <CircularProgress size={20} />
163             </InputAdornment>


========== IMG_2234.md ==========
---
photo: IMG_2234.JPG
type: vscode-code
file: aqs-web-ui/src/components/text.tsx
lines: 147-178 (sticky header shows line 30)
orientation: 180
confidence: high
notes: Clear, sharp image, no ghosting. Continues directly from IMG_2233 (same file/session). Sticky-scroll header pinned at top: line 30 "export const TextInput: React.FC<TextInputProps> = ({". Red squiggly underlines under nearly every JSX prop line 147-178 (consistent with status bar "No Solution", 35 problems — likely project/tsconfig not loaded rather than real errors). Tab bar: date.tsx and text.tsx (both "9+" unsaved). Breadcrumb: aqs-web-ui > src > components > text.tsx. Explorer sidebar (components folder): header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx (selected, 9+), textarea.tsx, XmlList.tsx (U). Other src folders: config, constants, features, hooks, lib, pages, providers, services, types, utils; files app.css, app.tsx, context.ts. Status bar: aqs-web-ui, branch hitanshu/experimental* (dirty), No Solution, 35 problems, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp 4:42 PM 7/10/2026.
---
30      export const TextInput: React.FC<TextInputProps> = ({
...
147           onKeyDown={handleKeyDown}
148           onPaste={handlePaste}
149           placeholder={placeholder}
150           disabled={disabled || isCommitting}
151           error={showError}
152           helperText={errorMessage || ' '}
153           inputProps={{
154             tabIndex,
155             maxLength: maxLength || undefined,
156             inputMode: isNumeric ? 'numeric' : 'text',
157           }}
158           fullWidth
159           InputProps={{
160             endAdornment: isCommitting ? (
161               <InputAdornment position="end">
162                 <CircularProgress size={20} />
163               </InputAdornment>
164             ) : null,
165           }}
166           sx={{
167             width,
168             ...(highlight && {
169               '& .MuiOutlinedInput-root': {
170                 backgroundColor: highlightColor,
171                 '& fieldset': { borderColor: highlightBorderColor },
172                 '&:hover fieldset': { borderColor: highlightBorderColor },
173                 '&.Mui-focused fieldset': { borderColor: highlightBorderColor },
174               },
175             }),
176           }}
177         />
178       );
