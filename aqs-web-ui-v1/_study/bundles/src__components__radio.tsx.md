# BUNDLE for src/components/radio.tsx
# 4 photo fragment(s), ascending start-line order.


========== IMG_2185.md ==========
---
photo: IMG_2185.JPG
type: vscode-code
file: aqs-web-ui/src/components/radio.tsx
lines: 1-34
orientation: 180
confidence: high
notes: Explorer sidebar components/ expanded: header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx ("U"), radio.tsx (selected, "9+"), select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx ("U"); collapsed: config, constants, features(dot), hooks, lib(dot), pages(dot), providers, services, types(dot), utils; app.css, app.tsx, context.ts at src root. Tabs: "date.tsx 9+" and active "radio.tsx 9+". Breadcrumb: aqs-web-ui > src > components > radio.tsx > ... A toast notification overlays the breadcrumb: "Network connection is unstable." with "Dismiss" button (VS Code Remote/cloud connection warning, not app content). Status bar: branch "hitanshu/experimental*", 35 errors/0 warnings, "No Solution", Ln1 Col1, Tab Size:4, UTF-8, CRLF, TypeScript JSX. Line 34 cut off at bottom of frame but legible: "[onChange, onCommit]" (closing a useCallback dependency array).
---
1   import React, { useState, useCallback } from 'react';
2   import { FormControl, RadioGroup, Radio, FormControlLabel, FormHelperText } from '@mui/material';
3   import type { CommitEventType, OptionItem } from '@/types';
4
5   export interface RadioInputProps {
6     value: string;
7     options: OptionItem[];
8     required?: boolean;
9     disabled?: boolean;
10    tabIndex?: number;
11    onChange?: (val: string) => void;
12    onCommit?: (val: string, eventType: CommitEventType) => void;
13  }
14
15  export const RadioInput: React.FC<RadioInputProps> = ({
16    value,
17    options,
18    required,
19    disabled,
20    tabIndex = 0,
21    onChange,
22    onCommit,
23  }) => {
24    const [touched, setTouched] = useState(false);
25    const showError = !!required && touched && String(value ?? '').trim() === '';
26
27    const handleChange = useCallback(
28      (e: React.ChangeEvent<HTMLInputElement>) => {
29        const next = e.target.value;
30        onChange?.(next);
31        setTouched(true);
32        onCommit?.(next, 'change');
33      },
34      [onChange, onCommit]


========== IMG_2186.md ==========
---
photo: IMG_2186.JPG
type: vscode-code
file: aqs-web-ui/src/components/radio.tsx
lines: 5, 12-44 (5 sticky header; 12-13 partly obscured by toast)
orientation: 180
confidence: high
notes: Continuation of radio.tsx from IMG_2185, scrolled slightly further. Line 5 "export interface RadioInputProps {" is a VS Code sticky-scroll header. A "Network connection is unstable" toast (with Dismiss button) overlaps lines ~6-12, obscuring them, but line 12 was already captured clearly in IMG_2185 as "onCommit?: (val: string, eventType: CommitEventType) => void;" and line 13 "}" is visible below the toast. Lines 15-34 duplicate IMG_2185 content exactly (RadioInput component params/state/handleChange), included here for continuity. New content vs IMG_2185: lines 36-44 (return JSX: FormControl > RadioGroup with row, value, onChange, className props, cut off at line 44 "  >"). Explorer sidebar: same as IMG_2185, radio.tsx selected "9+". Tabs: "date.tsx 9+", active "radio.tsx 9+". Status bar: branch "hitanshu/experimental*", 35 errors/0 warnings, "No Solution", Ln1 Col1, Tab Size:4, UTF-8, CRLF, TypeScript JSX.
---
5   export interface RadioInputProps {  ⟪sticky-scroll header⟫
    ⟪lines 6-11 obscured by "Network connection is unstable" toast⟫
12    onCommit?: (val: string, eventType: CommitEventType) => void;  ⟪partly obscured, confirmed from IMG_2185⟫
13  }
14
15  export const RadioInput: React.FC<RadioInputProps> = ({
16    value,
17    options,
18    required,
19    disabled,
20    tabIndex = 0,
21    onChange,
22    onCommit,
23  }) => {
24    const [touched, setTouched] = useState(false);
25    const showError = !!required && touched && String(value ?? '').trim() === '';
26
27    const handleChange = useCallback(
28      (e: React.ChangeEvent<HTMLInputElement>) => {
29        const next = e.target.value;
30        onChange?.(next);
31        setTouched(true);
32        onCommit?.(next, 'change');
33      },
34      [onChange, onCommit],
35    );
36
37    return (
38      <FormControl disabled={disabled} error={showError} component="fieldset" fullWidth>
39        <RadioGroup
40          row
41          value={value ?? ''}
42          onChange={handleChange}
43          className="flex flex-row items-center gap-2 flex-nowrap!"
44        >


========== IMG_2187.md ==========
---
photo: IMG_2187.JPG
type: vscode-code
file: aqs-web-ui/src/components/radio.tsx
lines: 15, 23-55 (15 sticky header)
orientation: 180
confidence: high
notes: Continuation of radio.tsx, scrolled further down, showing the rest of the RadioInput component through its closing return JSX (ends the file / component at line 55 "</FormControl>"). Line 15 "export const RadioInput: React.FC<RadioInputProps> = ({" is a VS Code sticky-scroll header, partly obscured by the "Network connection is unstable" toast. Lines 24-35 duplicate content already seen in IMG_2185/2186 (state/handleChange) - included for continuity. New content vs IMG_2186: lines 45-55 (options.map rendering FormControlLabel/Radio, closing RadioGroup, FormHelperText with error text, closing FormControl). Note "control={<Radio inputProps={{ tabIndex }} size="small" />}" on line 49 has a wavy underline (linter/type squiggle) under part of it. Explorer sidebar identical to IMG_2186. Tabs: "date.tsx 9+", active "radio.tsx 9+". Status bar: branch "hitanshu/experimental*", 35 errors/0 warnings, "No Solution", Ln1 Col1, Tab Size:4, UTF-8, CRLF, TypeScript JSX.
---
15  export const RadioInput: React.FC<RadioInputProps> = ({  ⟪sticky-scroll header, partly obscured by toast⟫
23  }) => {
24    const [touched, setTouched] = useState(false);
25    const showError = !!required && touched && String(value ?? '').trim() === '';
26
27    const handleChange = useCallback(
28      (e: React.ChangeEvent<HTMLInputElement>) => {
29        const next = e.target.value;
30        onChange?.(next);
31        setTouched(true);
32        onCommit?.(next, 'change');
33      },
34      [onChange, onCommit],
35    );
36
37    return (
38      <FormControl disabled={disabled} error={showError} component="fieldset" fullWidth>
39        <RadioGroup
40          row
41          value={value ?? ''}
42          onChange={handleChange}
43          className="flex flex-row items-center gap-2 flex-nowrap!"
44        >
45          {options.map((opt) => (
46            <FormControlLabel
47              key={String(opt.value)}
48              value={opt.value}
49              control={<Radio inputProps={{ tabIndex }} size="small" />}
50              label={opt.label}
51            />
52          ))}
53        </RadioGroup>
54        <FormHelperText>{showError ? 'Please choose an option.' : ' '}</FormHelperText>
55      </FormControl>


========== IMG_2188.md ==========
---
photo: IMG_2188.JPG
type: vscode-code
file: aqs-web-ui/src/components/radio.tsx
lines: 15, 27, 38-58 (15 and 27 are sticky headers)
orientation: 180
confidence: high
notes: Final view of radio.tsx scrolled to the end of the RadioInput component. Photo has a motion-blur double-exposure ghosting artifact (a fainter duplicate of the same block of code, offset ~2 lines, visible underneath the sharp text) — transcription below follows only the sharp/bold correctly-numbered text. Lines 15 "export const RadioInput: React.FC<RadioInputProps> = ({" and 27 "const handleChange = useCallback(" are VS Code sticky-scroll headers (nested enclosing scopes), separated by divider lines from the scrolled body starting at 38. Lines 38-55 duplicate content already captured in IMG_2187; new content here is lines 56-58: ");" (closes the return-JSX), "};" (closes the RadioInput arrow-function component), and 58 is blank (end of visible/typed content — likely end of file or followed by more blank lines not shown). Explorer sidebar identical to IMG_2187 (radio.tsx selected, "9+"). Tabs: "date.tsx 9+", active "radio.tsx 9+". Status bar: branch "hitanshu/experimental*", 35 errors/0 warnings, "No Solution", Ln1 Col1, Tab Size:4, UTF-8, CRLF, TypeScript JSX.
---
15  export const RadioInput: React.FC<RadioInputProps> = ({  ⟪sticky-scroll header⟫
27    const handleChange = useCallback(  ⟪sticky-scroll header⟫
38    <FormControl disabled={disabled} error={showError} component="fieldset" fullWidth>
39      <RadioGroup
40        row
41        value={value ?? ''}
42        onChange={handleChange}
43        className="flex flex-row items-center gap-2 flex-nowrap!"
44      >
45        {options.map((opt) => (
46          <FormControlLabel
47            key={String(opt.value)}
48            value={opt.value}
49            control={<Radio inputProps={{ tabIndex }} size="small" />}
50            label={opt.label}
51          />
52        ))}
53      </RadioGroup>
54      <FormHelperText>{showError ? 'Please choose an option.' : ' '}</FormHelperText>
55    </FormControl>
56    );
57  };
58  ⟪blank⟫
