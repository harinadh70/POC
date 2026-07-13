# BUNDLE for src/components/checkbox.tsx
# 5 photo fragment(s), ascending start-line order.


========== IMG_2044.md ==========
---
photo: IMG_2044.JPG
type: vscode-code
file: aqs-web-ui/src/components/checkbox.tsx
lines: 1-33
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "checkbox.tsx 8" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > checkbox.tsx. Top of file (line 1). Yellow squiggles under destructured params `checked` (15), `required` (16), `disabled` (17), `onChange` (19), `onCommit` (20) — unused-var style warnings. Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > assets/svgs (icon2.svg, icon3.svg, icon4.svg), components > data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx, buttons-renderer.tsx, checkbox.tsx [8, selected/highlighted, cursor hovering], date.tsx, dialog.tsx (cut off). Status bar: aqs-web-ui, branch hitanshu/experimental*, 17 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026. Line 34 is present at the very bottom edge but not legible (blank/cut off by status bar).
---
1     import React, { useState, useCallback } from 'react';
2     import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
3     import type { CommitEventType } from '@/types';
4
5     export interface CheckboxInputProps {
6         checked: boolean;
7         required?: boolean;
8         disabled?: boolean;
9         tabIndex?: number;
10        onChange?: (val: boolean) => void;
11        onCommit?: (val: boolean, eventType: CommitEventType) => void;
12    }
13
14    export const CheckboxInput: React.FC<CheckboxInputProps> = ({
15        checked,
16        required,
17        disabled,
18        tabIndex = 0,
19        onChange,
20        onCommit,
21    }) => {
22        const [touched, setTouched] = useState(false);
23        const showError = !!required && touched && checked !== true;
24
25        const handleChange = useCallback(
26            (e: React.ChangeEvent<HTMLInputElement>) => {
27                const next = e.target.checked;
28                onChange?.(next);
29                setTouched(true);
30                onCommit?.(next, 'change');
31            },
32            [onChange, onCommit],
33        );
</content>


========== IMG_2045.md ==========
---
photo: IMG_2045.JPG
type: vscode-code
file: aqs-web-ui/src/components/checkbox.tsx
lines: 10-42
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "checkbox.tsx 8" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > checkbox.tsx. Sticky-scroll header: line 5 `export interface CheckboxInputProps {`. Explorer sidebar now scrolled/expanded further showing more of components/: data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx, buttons-renderer.tsx, checkbox.tsx [8, selected/highlighted], date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx (new file names visible not seen in prior photos). Yellow squiggles under destructured params (19 onChange, 20 onCommit) and under `checked=`/`onChange=` JSX attrs (40-41 area). Red squiggle under the `<Checkbox` opening tag block lines 39-41. Status bar: aqs-web-ui, branch hitanshu/experimental*, 17 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026. Line 42 is at the very bottom edge, partially cut/blurred by status bar; content is a best-effort read.
---
5     export interface CheckboxInputProps {     [sticky header]
10        onChange?: (val: boolean) => void;
11        onCommit?: (val: boolean, eventType: CommitEventType) => void;
12    }
13
14    export const CheckboxInput: React.FC<CheckboxInputProps> = ({
15        checked,
16        required,
17        disabled,
18        tabIndex = 0,
19        onChange,
20        onCommit,
21    }) => {
22        const [touched, setTouched] = useState(false);
23        const showError = !!required && touched && checked !== true;
24
25        const handleChange = useCallback(
26            (e: React.ChangeEvent<HTMLInputElement>) => {
27                const next = e.target.checked;
28                onChange?.(next);
29                setTouched(true);
30                onCommit?.(next, 'change');
31            },
32            [onChange, onCommit],
33        );
34
35        return (
36            <>
37                <FormControlLabel
38                    control={
39                        <Checkbox
40                            checked={Boolean(checked)}
41                            onChange={handleChange}
42                            disabled={disabled}
</content>


========== IMG_2046.md ==========
---
photo: IMG_2046.JPG
type: vscode-code
file: aqs-web-ui/src/components/checkbox.tsx
lines: 18-49
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "checkbox.tsx 8" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > checkbox.tsx. Sticky-scroll header: line 14 `export const CheckboxInput: React.FC<CheckboxInputProps> = ({`. Explorer sidebar (fully expanded components/ list visible): data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx, buttons-renderer.tsx, checkbox.tsx [8, selected/highlighted], date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx. Red squiggles under the whole `<Checkbox ... />` JSX prop block lines 40-45. Line 47 has a trailing inline comment `// keep label on the left via the row container`. Status bar: aqs-web-ui, branch hitanshu/experimental*, 17 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026. Line 50 peeks out at the very bottom edge but is entirely illegible/cut by the status bar (not transcribed).
---
14    export const CheckboxInput: React.FC<CheckboxInputProps> = ({     [sticky header]
18        tabIndex = 0,
19        onChange,
20        onCommit,
21    }) => {
22        const [touched, setTouched] = useState(false);
23        const showError = !!required && touched && checked !== true;
24
25        const handleChange = useCallback(
26            (e: React.ChangeEvent<HTMLInputElement>) => {
27                const next = e.target.checked;
28                onChange?.(next);
29                setTouched(true);
30                onCommit?.(next, 'change');
31            },
32            [onChange, onCommit],
33        );
34
35        return (
36            <>
37                <FormControlLabel
38                    control={
39                        <Checkbox
40                            checked={Boolean(checked)}
41                            onChange={handleChange}
42                            disabled={disabled}
43                            inputProps={{ tabIndex }}
44                            size="small"
45                        />
46                    }
47                    label="" // keep label on the left via the row container
48                />
49                <FormHelperText error={showError}
</content>


========== IMG_2047.md ==========
---
photo: IMG_2047.JPG
type: vscode-code
file: aqs-web-ui/src/components/checkbox.tsx
lines: 23-54
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "checkbox.tsx 8" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > checkbox.tsx. Sticky-scroll header: line 14 `export const CheckboxInput: React.FC<CheckboxInputProps> = ({`. This is the end of the component body — line 54 `};` closes CheckboxInput; line 55 visible in gutter but blank/no content shown before the photo's bottom edge (status bar not occluding this time, editor viewport simply ends there). Explorer sidebar (same fully expanded components/ list as IMG_2046): data-grid, modal-dialog, tabView, action-buttons.tsx [7], button.tsx, buttons-renderer.tsx, checkbox.tsx [8, selected/highlighted], date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx. Red squiggles under `<Checkbox ... />` block lines 40-45. Status bar: aqs-web-ui, branch hitanshu/experimental*, 17 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026.
---
14    export const CheckboxInput: React.FC<CheckboxInputProps> = ({     [sticky header]
23        const showError = !!required && touched && checked !== true;
24
25        const handleChange = useCallback(
26            (e: React.ChangeEvent<HTMLInputElement>) => {
27                const next = e.target.checked;
28                onChange?.(next);
29                setTouched(true);
30                onCommit?.(next, 'change');
31            },
32            [onChange, onCommit],
33        );
34
35        return (
36            <>
37                <FormControlLabel
38                    control={
39                        <Checkbox
40                            checked={Boolean(checked)}
41                            onChange={handleChange}
42                            disabled={disabled}
43                            inputProps={{ tabIndex }}
44                            size="small"
45                        />
46                    }
47                    label="" // keep label on the left via the row container
48                />
49                <FormHelperText error={showError}>
50                    {showError ? 'This checkbox is required.' : ' '}
51                </FormHelperText>
52            </>
53        );
54    };
</content>


========== IMG_2048.md ==========
---
photo: IMG_2048.JPG
type: vscode-code
file: aqs-web-ui/src/components/checkbox.tsx
lines: 34-55
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "checkbox.tsx 8" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > checkbox.tsx. Sticky-scroll header: line 14 `export const CheckboxInput: React.FC<CheckboxInputProps> = ({`. Confirms end of file: line 54 `};` closes the component, line 55 is a blank trailing line and the true end of the visible/typed file content (cursor I-beam artifact visible below it, not code). Explorer sidebar fully expanded, same components/ list as IMG_2046/2047: data-grid, modal-dialog, tabView, action-buttons.tsx [7], button.tsx, buttons-renderer.tsx, checkbox.tsx [8, selected/highlighted], date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx. Red squiggles under `<Checkbox ... />` block lines 40-45. Status bar: aqs-web-ui, branch hitanshu/experimental*, 17 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026.
---
14    export const CheckboxInput: React.FC<CheckboxInputProps> = ({     [sticky header]
34
35        return (
36            <>
37                <FormControlLabel
38                    control={
39                        <Checkbox
40                            checked={Boolean(checked)}
41                            onChange={handleChange}
42                            disabled={disabled}
43                            inputProps={{ tabIndex }}
44                            size="small"
45                        />
46                    }
47                    label="" // keep label on the left via the row container
48                />
49                <FormHelperText error={showError}>
50                    {showError ? 'This checkbox is required.' : ' '}
51                </FormHelperText>
52            </>
53        );
54    };
55
</content>
