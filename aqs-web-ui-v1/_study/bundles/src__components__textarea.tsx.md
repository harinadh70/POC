# BUNDLE for src/components/textarea.tsx
# 6 photo fragment(s), ascending start-line order.


========== IMG_2235.md ==========
---
photo: IMG_2235.JPG
type: vscode-code
file: aqs-web-ui/src/components/textarea.tsx
lines: 1-33
orientation: 180
confidence: high
notes: Clear, sharp image, no ghosting. New file opened (textarea.tsx), sibling to text.tsx. Tab bar: date.tsx (9+) and textarea.tsx (8, active/unsaved). Breadcrumb: aqs-web-ui > src > components > textarea.tsx. Explorer sidebar (components folder): header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx (selected, 8), XmlList.tsx (U). Other src folders: config, constants, features, hooks, lib, pages, providers, services, types, utils; files app.css, app.tsx, context.ts. highlightColor default shown with an inline color swatch (yellow) next to '#fff566', highlightBorderColor swatch (teal) next to '#0a6f6f'. Status bar: aqs-web-ui, branch hitanshu/experimental* (dirty), No Solution, 33 problems, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp 4:42 PM 7/10/2026.
---
1       import React, { useCallback, useState } from 'react';
2       import { TextField } from '@mui/material';
3       import type { CommitEventType } from '@/types';
4
5       export interface TextAreaInputProps {
6         value: string;
7         required?: boolean;
8         disabled?: boolean;
9         tabIndex?: number;
10        placeholder?: string;
11        size?: 'small' | 'medium';
12        width?: number | string;
13        onChange?: (val: string) => void;
14        onCommit?: (val: string, eventType: CommitEventType) => void;
15        // optional highlight
16        highlight?: boolean;
17        highlightColor?: string;
18        highlightBorderColor?: string;
19      }
20
21      export const TextAreaInput: React.FC<TextAreaInputProps> = ({
22        value,
23        required,
24        disabled,
25        tabIndex = 0,
26        placeholder = '',
27        size = 'small',
28        width = '100%',
29        onChange,
30        onCommit,
31        highlight = false,
32        highlightColor = '#fff566',
33        highlightBorderColor = '#0a6f6f',


========== IMG_2236.md ==========
---
photo: IMG_2236.JPG
type: vscode-code
file: aqs-web-ui/src/components/textarea.tsx
lines: 5-44 (sticky header shows line 5)
orientation: 180
confidence: high
notes: Clear, sharp image, no ghosting. Continues from IMG_2235 (same file), scrolled down slightly — lines 5-33 repeat content already seen in IMG_2235, new content is lines 34-44. Sticky-scroll header pinned at top: line 5 "export interface TextAreaInputProps {". Tab bar: date.tsx (9+) and textarea.tsx (8, active). Breadcrumb: aqs-web-ui > src > components > textarea.tsx. Explorer sidebar (components folder): header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx (selected, 8), XmlList.tsx (U). Other src folders: config, constants, features, hooks, lib, pages, providers, services, types, utils; files app.css, app.tsx, context.ts. Status bar: aqs-web-ui, branch hitanshu/experimental* (dirty), No Solution, 33 problems, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp 4:42 PM 7/10/2026.
---
5       export interface TextAreaInputProps {
...
13        onChange?: (val: string) => void;
14        onCommit?: (val: string, eventType: CommitEventType) => void;
15        // optional highlight
16        highlight?: boolean;
17        highlightColor?: string;
18        highlightBorderColor?: string;
19      }
20
21      export const TextAreaInput: React.FC<TextAreaInputProps> = ({
22        value,
23        required,
24        disabled,
25        tabIndex = 0,
26        placeholder = '',
27        size = 'small',
28        width = '100%',
29        onChange,
30        onCommit,
31        highlight = false,
32        highlightColor = '#fff566',
33        highlightBorderColor = '#0a6f6f',
34      }) => {
35        const [touched, setTouched] = useState(false);
36        const showError = !!required && touched && String(value ?? '').trim() === '';
37
38        const handleChange = useCallback(
39          (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value),
40          [onChange],
41        );
42
43        const handleBlur = useCallback(() => {
44          setTouched(true);


========== IMG_2237.md ==========
---
photo: IMG_2237.JPG
type: vscode-code
file: aqs-web-ui/src/components/textarea.tsx
lines: 21-55 (sticky header shows line 21)
orientation: 180
confidence: high
notes: Clear, sharp image, no ghosting. Continues from IMG_2236 (same file), scrolled down slightly further — overlaps lines 21-46 already seen, new content lines 47-55. Sticky-scroll header pinned at top: line 21 "export const TextAreaInput: React.FC<TextAreaInputProps> = ({". Tab bar: date.tsx (9+) and textarea.tsx (8, active). Breadcrumb: aqs-web-ui > src > components > textarea.tsx. Explorer sidebar (components folder): header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx (selected, 8), XmlList.tsx (U). Other src folders: config, constants, features, hooks, lib, pages, providers, services, types, utils; files app.css, app.tsx, context.ts. Status bar: aqs-web-ui, branch hitanshu/experimental* (dirty), No Solution, 33 problems, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp 4:42 PM 7/10/2026.
---
21      export const TextAreaInput: React.FC<TextAreaInputProps> = ({
...
23        required,
24        disabled,
25        tabIndex = 0,
26        placeholder = '',
27        size = 'small',
28        width = '100%',
29        onChange,
30        onCommit,
31        highlight = false,
32        highlightColor = '#fff566',
33        highlightBorderColor = '#0a6f6f',
34      }) => {
35        const [touched, setTouched] = useState(false);
36        const showError = !!required && touched && String(value ?? '').trim() === '';
37
38        const handleChange = useCallback(
39          (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value),
40          [onChange],
41        );
42
43        const handleBlur = useCallback(() => {
44          setTouched(true);
45          onCommit?.(value ?? '', 'blur');
46        }, [onCommit, value]);
47
48        const handleKeyDown = useCallback(
49          (e: React.KeyboardEvent<HTMLInputElement>) => {
50            if (e.key === 'Enter') {
51              setTouched(true);
52              onCommit?.(value ?? '', 'enter');
53            }
54          },
55          [onCommit, value]


========== IMG_2238.md ==========
---
photo: IMG_2238.JPG
type: vscode-code
file: aqs-web-ui/src/components/textarea.tsx
lines: 36-68 (sticky header shows line 21)
orientation: 180
confidence: medium
notes: Photo has motion-blur/double-exposure ghosting (same VS Code smooth-scroll artifact seen in other photos in this set) affecting rows ~36-58 — two overlapping scroll positions ~2 lines apart, with bold/sharp text as primary layer and fainter gray text as a residual ghost. Reconstructed using the sharp layer cross-validated against IMG_2237 (clean, unghosted) for lines 36-55, which match exactly. Line 68 "helperText={showError ? 'This field is requ...'" is cut off at the bottom edge of the screen/photo (obscured by the status bar) in both this photo and the original un-rotated capture — the closing portion of the string and the `: ' '}` are not visible in either. Sticky-scroll header pinned at top: line 21 "export const TextAreaInput: React.FC<TextAreaInputProps> = ({". Tab bar: date.tsx (9+) and textarea.tsx (8, active). Breadcrumb: aqs-web-ui > src > components > textarea.tsx. Explorer sidebar (components folder): header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx (selected, 8), XmlList.tsx (U). Status bar: aqs-web-ui, branch hitanshu/experimental* (dirty), No Solution, 33 problems, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp 4:42 PM 7/10/2026.
---
21      export const TextAreaInput: React.FC<TextAreaInputProps> = ({
...
36        const showError = !!required && touched && String(value ?? '').trim() === '';
37
38        const handleChange = useCallback(
39          (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value),
40          [onChange],
41        );
42
43        const handleBlur = useCallback(() => {
44          setTouched(true);
45          onCommit?.(value ?? '', 'blur');
46        }, [onCommit, value]);
47
48        const handleKeyDown = useCallback(
49          (e: React.KeyboardEvent<HTMLInputElement>) => {
50            if (e.key === 'Enter') {
51              setTouched(true);
52              onCommit?.(value ?? '', 'enter');
53            }
54          },
55          [onCommit, value],
56        );
57
58        return (
59          <TextField
60            size={size}
61            value={value ?? ''}
62            onChange={handleChange}
63            onBlur={handleBlur}
64            onKeyDown={handleKeyDown}
65            placeholder={placeholder}
66            disabled={disabled}
67            error={showError}
68            helperText={showError ? 'This field is requ⟪?⟫' : ' '}


========== IMG_2239.md ==========
---
photo: IMG_2239.JPG
type: vscode-code
file: aqs-web-ui/src/components/textarea.tsx
lines: 48-81 (sticky headers show lines 21, 48, 49)
orientation: 180
confidence: high
notes: Clear, sharp image, no ghosting. Confirms/cross-validates the reconstructed lines 48-68 from IMG_2238 exactly (including full helperText string, previously truncated). New content lines 69-81. Sticky-scroll headers pinned at top: line 21 "export const TextAreaInput: React.FC<TextAreaInputProps> = ({", line 48 "const handleKeyDown = useCallback(", line 49 "(e: React.KeyboardEvent<HTMLInputElement>) => {". Line 81 is cut off at the very bottom edge of the visible editor area (just "}," visible before status bar). Tab bar: date.tsx (9+) and textarea.tsx (8, active). Breadcrumb: aqs-web-ui > src > components > textarea.tsx. Explorer sidebar (components folder): header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx (selected, 8), XmlList.tsx (U). Status bar: aqs-web-ui, branch hitanshu/experimental* (dirty), No Solution, 33 problems, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp 4:42 PM 7/10/2026.
---
21      export const TextAreaInput: React.FC<TextAreaInputProps> = ({
48      const handleKeyDown = useCallback(
49        (e: React.KeyboardEvent<HTMLInputElement>) => {
...
51            setTouched(true);
52            onCommit?.(value ?? '', 'enter');
53          }
54        },
55        [onCommit, value],
56      );
57
58      return (
59        <TextField
60          size={size}
61          value={value ?? ''}
62          onChange={handleChange}
63          onBlur={handleBlur}
64          onKeyDown={handleKeyDown}
65          placeholder={placeholder}
66          disabled={disabled}
67          error={showError}
68          helperText={showError ? 'This field is required.' : ' '}
69          inputProps={{ tabIndex }}
70          fullWidth
71          multiline
72          minRows={3}
73          sx={{
74            width,
75            ...(highlight && {
76              '& .MuiOutlinedInput-root': {
77                backgroundColor: highlightColor,
78                '& fieldset': { borderColor: highlightBorderColor },
79                '&:hover fieldset': { borderColor: highlightBorderColor },
80                '&.Mui-focused fieldset': { borderColor: highlightBorderColor },
81              },


========== IMG_2240.md ==========
---
photo: IMG_2240.JPG
type: vscode-code
file: aqs-web-ui/src/components/textarea.tsx
lines: 65-87 (sticky header shows line 21) — end of file
orientation: 180
confidence: high
notes: Clear, sharp image, no ghosting. Shows the end of textarea.tsx (file ends at line 86 with closing "};", line 87 blank/EOF). Sticky-scroll header pinned at top: line 21 "export const TextAreaInput: React.FC<TextAreaInputProps> = ({". Tab bar: date.tsx (9+) and textarea.tsx (8, active). Breadcrumb: aqs-web-ui > src > components > textarea.tsx. Explorer sidebar (components folder): header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx (selected, 8), XmlList.tsx (U). Status bar: aqs-web-ui, branch hitanshu/experimental* (dirty), No Solution, 33 problems, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp 4:42 PM 7/10/2026.
---
21      export const TextAreaInput: React.FC<TextAreaInputProps> = ({
...
65        placeholder={placeholder}
66        disabled={disabled}
67        error={showError}
68        helperText={showError ? 'This field is required.' : ' '}
69        inputProps={{ tabIndex }}
70        fullWidth
71        multiline
72        minRows={3}
73        sx={{
74          width,
75          ...(highlight && {
76            '& .MuiOutlinedInput-root': {
77              backgroundColor: highlightColor,
78              '& fieldset': { borderColor: highlightBorderColor },
79              '&:hover fieldset': { borderColor: highlightBorderColor },
80              '&.Mui-focused fieldset': { borderColor: highlightBorderColor },
81            },
82          }),
83        }}
84      />
85      );
86    };
87
