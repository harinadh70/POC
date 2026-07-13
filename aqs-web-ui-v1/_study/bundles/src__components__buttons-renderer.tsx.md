# BUNDLE for src/components/buttons-renderer.tsx
# 9 photo fragment(s), ascending start-line order.


========== IMG_2035.md ==========
---
photo: IMG_2035.JPG
type: vscode-code
file: aqs-web-ui/src/components/buttons-renderer.tsx
lines: 1-34
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "buttons-renderer.tsx 9+" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > buttons-renderer.tsx. This is the TOP of the file (line 1). Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > assets/svgs (icon2.svg, icon3.svg, icon4.svg), components > data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx (no error badge), buttons-renderer.tsx [9+, selected/highlighted], checkbox.tsx, date.tsx, dialog.tsx (cut off at bottom). Yellow squiggle under `fields` (line 20) and `onButtonClick` (line 21) destructured params (unused-var style warning color), red squiggle under `(field)` on line 29. Status bar: aqs-web-ui, branch hitanshu/experimental*, 20 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026. Line 34 is at the very bottom edge, partially cut off by the status bar but legible on close zoom.
---
1     import React from 'react';
2     import { Stack, Box } from '@mui/material';
3     import { Button } from '@components/button';
4     import type { NormalizedField } from '@/types';
5
6     export interface ButtonsRendererProps {
7         fields: NormalizedField[];
8         onButtonClick?: (matchcode: string) => void;
9         orientation?: 'row' | 'column';
10        spacing?: number;
11        justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
12        sx?: any;
13    }
14
15    /**
16     * ButtonsRenderer - Renders action buttons extracted from form controls
17     * Displays buttons with proper disabled/visible states
18     */
19    export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({
20        fields,
21        onButtonClick,
22        orientation = 'row',
23        spacing = 1,
24        justifyContent = 'flex-end',
25        sx = {},
26    }) => {
27        // Filter only button type fields that are visible
28        const buttons = fields.filter(
29            (field) => field.controlType === 'button' && field.visible !== false,
30        );
31
32        // Debug: Log button visibility
33        const allButtonFields = fields.filter((field) => field.controlType === 'button');
34        if (allButtonFields.length > 0) {
</content>


========== IMG_2036.md ==========
---
photo: IMG_2036.JPG
type: vscode-code
file: aqs-web-ui/src/components/buttons-renderer.tsx
lines: 6-42
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "buttons-renderer.tsx 9+" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > buttons-renderer.tsx. Sticky-scroll header at top: line 6 `export interface ButtonsRendererProps {`. Continues from IMG_2035, scrolled down further into the same file; content matches IMG_2035/IMG_2037. Yellow squiggles under `fields` (20) and `onButtonClick` (21); red squiggle under `(field)` (29) and `allButtonFields` (33). Line 35 contains a blue-circle emoji character inside the console.group string. Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > assets/svgs (icon2.svg, icon3.svg, icon4.svg), components > data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx (no badge), buttons-renderer.tsx [9+, selected/highlighted], checkbox.tsx, date.tsx, dialog.tsx (cut off). Status bar: aqs-web-ui, branch hitanshu/experimental*, 20 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026. Line 42 is cut off by the status bar at the bottom; only "'Will Render': f.visible !==" fragment is legible, rest marked unclear.
---
6     export interface ButtonsRendererProps {     [sticky header]
10        spacing?: number;
11        justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
12        sx?: any;
13    }
14
15    /**
16     * ButtonsRenderer - Renders action buttons extracted from form controls
17     * Displays buttons with proper disabled/visible states
18     */
19    export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({
20        fields,
21        onButtonClick,
22        orientation = 'row',
23        spacing = 1,
24        justifyContent = 'flex-end',
25        sx = {},
26    }) => {
27        // Filter only button type fields that are visible
28        const buttons = fields.filter(
29            (field) => field.controlType === 'button' && field.visible !== false,
30        );
31
32        // Debug: Log button visibility
33        const allButtonFields = fields.filter((field) => field.controlType === 'button');
34        if (allButtonFields.length > 0) {
35            console.group('🔵 [ButtonsRenderer] Button Visibility Status');
36            console.table(
37                allButtonFields.map((f) => ({
38                    Matchcode: f.matchcode,
39                    Label: f.label,
40                    Visible: f.visible,
41                    Disabled: f.disabled,
42                    'Will Render': f.visible !== ⟪?⟫
</content>


========== IMG_2037.md ==========
---
photo: IMG_2037.JPG
type: vscode-code
file: aqs-web-ui/src/components/buttons-renderer.tsx
lines: 14-47
orientation: 0
confidence: high
notes: Active tab "buttons-renderer.tsx 9+" (modified, 9+ problems); other tab "action-buttons.tsx 7". Breadcrumb aqs-web-ui > src > components > buttons-renderer.tsx. Explorer sidebar visible: src/assets/svgs (icon2.svg, icon3.svg, icon4.svg), src/components/data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx, buttons-renderer.tsx [9+, selected], checkbox.tsx, date.tsx, dialog.tsx (partially cut). Status bar: branch hitanshu/experimental*, 20 errors 0 warnings, "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026. Squiggles under fields/onButtonClick (lines 20-21) and (field) on 29, (field) on 33. Line 35 begins with a blue-circle emoji inside the string. Line 47 gutter visible but content not legible.
---
14
15	/**
16	 * ButtonsRenderer - Renders action buttons extracted from form controls
17	 * Displays buttons with proper disabled/visible states
18	 */
19	export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({
20	    fields,
21	    onButtonClick,
22	    orientation = 'row',
23	    spacing = 1,
24	    justifyContent = 'flex-end',
25	    sx = {},
26	}) => {
27	    // Filter only button type fields that are visible
28	    const buttons = fields.filter(
29	        (field) => field.controlType === 'button' && field.visible !== false,
30	    );
31
32	    // Debug: Log button visibility
33	    const allButtonFields = fields.filter((field) => field.controlType === 'button');
34	    if (allButtonFields.length > 0) {
35	        console.group('🔵 [ButtonsRenderer] Button Visibility Status');
36	        console.table(
37	            allButtonFields.map((f) => ({
38	                Matchcode: f.matchcode,
39	                Label: f.label,
40	                Visible: f.visible,
41	                Disabled: f.disabled,
42	                'Will Render': f.visible !== false ? '✅' : '❌',
43	            })),
44	        );
45	        console.groupEnd();
46	    }
47	⟪?⟫


========== IMG_2038.md ==========
---
photo: IMG_2038.JPG
type: vscode-code
file: aqs-web-ui/src/components/buttons-renderer.tsx
lines: 26-57
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 19 (export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({). Same tabs/sidebar as IMG_2037 (action-buttons.tsx 7, buttons-renderer.tsx 9+ active). Overlaps IMG_2037 for lines 26-46. Squiggles under (field) on 29 and 33, (f) on 37, (a, b) on 53. Status bar: hitanshu/experimental*, 20 errors 0 warnings, No Solution. Line 35 string starts with a blue-circle emoji.
---
19	export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({
26	}) => {
27	    // Filter only button type fields that are visible
28	    const buttons = fields.filter(
29	        (field) => field.controlType === 'button' && field.visible !== false,
30	    );
31
32	    // Debug: Log button visibility
33	    const allButtonFields = fields.filter((field) => field.controlType === 'button');
34	    if (allButtonFields.length > 0) {
35	        console.group('🔵 [ButtonsRenderer] Button Visibility Status');
36	        console.table(
37	            allButtonFields.map((f) => ({
38	                Matchcode: f.matchcode,
39	                Label: f.label,
40	                Visible: f.visible,
41	                Disabled: f.disabled,
42	                'Will Render': f.visible !== false ? '✅' : '❌',
43	            })),
44	        );
45	        console.groupEnd();
46	    }
47
48	    if (buttons.length === 0) {
49	        return null;
50	    }
51
52	    // Sort by utporder if available
53	    const sortedButtons = buttons.sort((a, b) => {
54	        const orderA = (a as any).utporder || 0;
55	        const orderB = (b as any).utporder || 0;
56	        return orderA - orderB;
57	    });


========== IMG_2039.md ==========
---
photo: IMG_2039.JPG
type: vscode-code
file: aqs-web-ui/src/components/buttons-renderer.tsx
lines: 34-65
orientation: 0
confidence: high
notes: Sticky-scroll header line 19 (export const ButtonsRenderer...). Line 33 is mostly hidden under sticky header (only red-squiggled fragment visible). Overlaps IMG_2038 for 34-57. Lines 61-65 have heavy red error squiggles under the whole lines (sx object). Line 65 shows a color swatch square before '#e0e0e0'. Same tabs/sidebar/status bar as prior photos (20 errors, No Solution, hitanshu/experimental*).
---
19	export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({
34	    if (allButtonFields.length > 0) {
35	        console.group('🔵 [ButtonsRenderer] Button Visibility Status');
36	        console.table(
37	            allButtonFields.map((f) => ({
38	                Matchcode: f.matchcode,
39	                Label: f.label,
40	                Visible: f.visible,
41	                Disabled: f.disabled,
42	                'Will Render': f.visible !== false ? '✅' : '❌',
43	            })),
44	        );
45	        console.groupEnd();
46	    }
47
48	    if (buttons.length === 0) {
49	        return null;
50	    }
51
52	    // Sort by utporder if available
53	    const sortedButtons = buttons.sort((a, b) => {
54	        const orderA = (a as any).utporder || 0;
55	        const orderB = (b as any).utporder || 0;
56	        return orderA - orderB;
57	    });
58
59	    return (
60	        <Box
61	            sx={{
62	                display: 'flex',
63	                marginBottom: '16px',
64	                paddingBottom: '12px',
65	                borderBottom: '1px solid #e0e0e0',


========== IMG_2040.md ==========
---
photo: IMG_2040.JPG
type: vscode-code
file: aqs-web-ui/src/components/buttons-renderer.tsx
lines: 44-76
orientation: 0
confidence: high
notes: Sticky-scroll header line 19. Overlaps IMG_2038/2039 for 44-65. Red error squiggles spanning lines 61-68 (the whole Box sx block through the closing >). Line 65 has color swatch before '#e0e0e0'. Line 76 only partially visible at bottom edge — appears to be a lone '>' . Same tabs (action-buttons.tsx 7, buttons-renderer.tsx 9+), status bar 20 errors 0 warnings, No Solution, hitanshu/experimental*.
---
19	export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({
44	        );
45	        console.groupEnd();
46	    }
47
48	    if (buttons.length === 0) {
49	        return null;
50	    }
51
52	    // Sort by utporder if available
53	    const sortedButtons = buttons.sort((a, b) => {
54	        const orderA = (a as any).utporder || 0;
55	        const orderB = (b as any).utporder || 0;
56	        return orderA - orderB;
57	    });
58
59	    return (
60	        <Box
61	            sx={{
62	                display: 'flex',
63	                marginBottom: '16px',
64	                paddingBottom: '12px',
65	                borderBottom: '1px solid #e0e0e0',
66	                ...sx,
67	            }}
68	        >
69	            <Stack
70	                direction={orientation}
71	                spacing={spacing}
72	                sx={{
73	                    width: '100%',
74	                    justifyContent,
75	                }}
76	⟪?⟫ (appears to be lone '>')


========== IMG_2041.md ==========
---
photo: IMG_2041.JPG
type: vscode-code
file: aqs-web-ui/src/components/buttons-renderer.tsx
lines: 52-84
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "buttons-renderer.tsx 9+" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > buttons-renderer.tsx. Sticky-scroll header at top: line 19 `export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({`. Big scroll jump from IMG_2036 (lines 43-51 not visible in either photo). Red squiggles under the whole `sx={{...}}` block lines 61-68 and under `>` line 76. Yellow-ish squiggle style continues on those same lines (JSX prop warnings). Line 65 has a small white/color-swatch box glyph inline before `#e0e0e0` (VS Code color-preview decorator). Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > assets/svgs (icon2.svg, icon3.svg, icon4.svg), components > data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx (no badge), buttons-renderer.tsx [9+, selected/highlighted], checkbox.tsx, date.tsx, dialog.tsx (cut off). Status bar: aqs-web-ui, branch hitanshu/experimental*, 20 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026. Line 84 is at the very bottom edge, cut off/blurred by the status bar; `'primary'`/`'secondary'` values are a best-effort read at lower confidence.
---
19    export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({     [sticky header]
52        // Sort by utporder if available
53        const sortedButtons = buttons.sort((a, b) => {
54            const orderA = (a as any).utporder || 0;
55            const orderB = (b as any).utporder || 0;
56            return orderA - orderB;
57        });
58
59        return (
60            <Box
61                sx={{
62                    display: 'flex',
63                    marginBottom: '16px',
64                    paddingBottom: '12px',
65                    borderBottom: '1px solid ⬛#e0e0e0',
66                    ...sx,
67                }}
68            >
69                <Stack
70                    direction={orientation}
71                    spacing={spacing}
72                    sx={{
73                        width: '100%',
74                        justifyContent,
75                    }}
76                >
77                    {sortedButtons.map((button) => (
78                        <Button
79                            key={button.matchcode}
80                            matchcode={button.matchcode}
81                            label={button.label}
82                            disabled={button.disabled}
83                            onClick={onButtonClick}
84                            variant={button.matchcode === 'OK' ? 'primary' : 'secondary'}
</content>


========== IMG_2042.md ==========
---
photo: IMG_2042.JPG
type: vscode-code
file: aqs-web-ui/src/components/buttons-renderer.tsx
lines: 62-94
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "buttons-renderer.tsx 9+" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > buttons-renderer.tsx. Sticky-scroll header: line 19 `export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({`. Line 62 (`display: 'flex',`) is faintly visible peeking out from directly under the sticky header. This is the end of the file: line 94 `);` is the last line shown, followed by presumably closing `};` off-screen/not visible (editor pane ends here in the photo — no further lines shown below 94, cut by screen bottom without a status-bar occlusion this time, i.e. line 94 may or may not be the true last line of the file). Red squiggles continue under the whole `sx={{...}}` JSX block lines 62-68 and under the `<Button ... />` prop block lines 79-90. Line 65 has a small color-swatch glyph before `#e0e0e0` (not transcribed here, see IMG_2041 for that line). Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > assets/svgs (icon2.svg, icon3.svg, icon4.svg), components > data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx (no badge), buttons-renderer.tsx [9+, selected/highlighted], checkbox.tsx, date.tsx, dialog.tsx (cut off). Status bar: aqs-web-ui, branch hitanshu/experimental*, 20 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026.
---
19    export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({     [sticky header]
62            display: 'flex',     [faint, peeking from under sticky]
63            marginBottom: '16px',
64            paddingBottom: '12px',
65            borderBottom: '1px solid ⬛#e0e0e0',
66            ...sx,
67        }}
68    >
69        <Stack
70            direction={orientation}
71            spacing={spacing}
72            sx={{
73                width: '100%',
74                justifyContent,
75            }}
76        >
77            {sortedButtons.map((button) => (
78                <Button
79                    key={button.matchcode}
80                    matchcode={button.matchcode}
81                    label={button.label}
82                    disabled={button.disabled}
83                    onClick={onButtonClick}
84                    variant={button.matchcode === 'OK' ? 'primary' : 'secondary'}
85                    color={button.matchcode === 'OK' ? 'primary' : 'secondary'}
86                    sx={{
87                        borderRadius: '4px',
88                        px: 2,
89                    }}
90                />
91            ))}
92        </Stack>
93    </Box>
94    );
</content>


========== IMG_2043.md ==========
---
photo: IMG_2043.JPG
type: vscode-code
file: aqs-web-ui/src/components/buttons-renderer.tsx
lines: 73-98
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "buttons-renderer.tsx 9+" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > buttons-renderer.tsx. Sticky-scroll header: line 19 `export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({`. This is the END of the file — line 95 `};` closes the component, line 97 is the default export, line 98 is a trailing blank line (last line of file). No red squiggles visible in this frame except a small one under `map` (line 77). Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > assets/svgs (icon2.svg, icon3.svg, icon4.svg), components > data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx (no badge), buttons-renderer.tsx [9+, selected/highlighted], checkbox.tsx, date.tsx, dialog.tsx (cut off). Status bar: aqs-web-ui, branch hitanshu/experimental*, 20 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026.
---
19    export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({     [sticky header]
73                width: '100%',
74                justifyContent,
75            }}
76        >
77            {sortedButtons.map((button) => (
78                <Button
79                    key={button.matchcode}
80                    matchcode={button.matchcode}
81                    label={button.label}
82                    disabled={button.disabled}
83                    onClick={onButtonClick}
84                    variant={button.matchcode === 'OK' ? 'primary' : 'secondary'}
85                    color={button.matchcode === 'OK' ? 'primary' : 'secondary'}
86                    sx={{
87                        borderRadius: '4px',
88                        px: 2,
89                    }}
90                />
91            ))}
92        </Stack>
93    </Box>
94    );
95    };
96
97    export default ButtonsRenderer;
98
</content>
