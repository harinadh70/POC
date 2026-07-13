# BUNDLE for src/components/button.tsx
# 5 photo fragment(s), ascending start-line order.


========== IMG_2030.md ==========
---
photo: IMG_2030.JPG
type: vscode-code
file: aqs-web-ui/src/components/button.tsx
lines: 1-34
orientation: 0
confidence: high
notes: Tab bar shows "action-buttons.tsx" (7 problems) and active tab "button.tsx" (8 problems). Breadcrumb aqs-web-ui > src > components > button.tsx > ... Explorer: aqs-web-ui > src > assets > svgs (icon2.svg, icon3.svg, icon4.svg, more above cut off) > components > data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx) > modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts) > tabView (TabPanel.tsx, TabView.tsx) > action-buttons.tsx (7), button.tsx (8, selected), buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx (cut off). Status bar: aqs-web-ui, hitanshu/experimental*, 17 errors 0 warnings, No Solution, 4:36 PM 7/10/2026. Line 34 cut off at bottom (body of the primary-variant if-block continuation not visible beyond "}").
---
1	import React from 'react';
2	import { Button as MuiButton } from '@mui/material';
3	import type { PageBuildButton } from '@utils/transform-pagebuild-response';
4	import type { CommitEventType } from '@/types';
5
6	export interface ButtonProps extends Omit<PageBuildButton, 'calls'> {
7		onCommit: (matchcode: string, value: string | boolean, eventType: CommitEventType) => void;
8		loading?: boolean;
9	}
10
11	export const Button: React.FC<ButtonProps> = ({
12		matchcode,
13		text,
14		disabled,
15		visible,
16		onCommit,
17		loading = false,
18	}) => {
19		if (!visible) {
20			return null;
21		}
22
23		const handleClick = () => {
24			// Buttons trigger with empty string value and 'change' event type
25			onCommit(matchcode, '', 'change');
26		};
27
28		// Determine button variant based on matchcode
29		const getVariant = (): 'primary' | 'secondary' | 'text' | 'tableMedium' => {
30			const upperMatchcode = matchcode.toUpperCase();
31
32			if (['OK', 'SUBMIT', 'NEXT', 'HEADERBTN1'].includes(upperMatchcode)) {
33				return 'primary';
34			⟪cut off at bottom edge⟫


========== IMG_2031.md ==========
---
photo: IMG_2031.JPG
type: vscode-code
file: aqs-web-ui/src/components/button.tsx
lines: 9-42 (line 43 fragment visible)
orientation: 0
confidence: high
notes: Same file as IMG_2030, scrolled down slightly (no sticky header shown). New content vs IMG_2030 begins at line 35. Explorer identical list, button.tsx selected (8 problems), action-buttons.tsx (7). Status bar unchanged: 17 errors 0 warnings, No Solution, 4:36 PM 7/10/2026. Bottom line fragment (43) shows "return 'secondary';" partially cut off/blurred at the very bottom edge - low confidence for that fragment only.
---
9	}
10
11	export const Button: React.FC<ButtonProps> = ({
12		matchcode,
13		text,
14		disabled,
15		visible,
16		onCommit,
17		loading = false,
18	}) => {
19		if (!visible) {
20			return null;
21		}
22
23		const handleClick = () => {
24			// Buttons trigger with empty string value and 'change' event type
25			onCommit(matchcode, '', 'change');
26		};
27
28		// Determine button variant based on matchcode
29		const getVariant = (): 'primary' | 'secondary' | 'text' | 'tableMedium' => {
30			const upperMatchcode = matchcode.toUpperCase();
31
32			if (['OK', 'SUBMIT', 'NEXT', 'HEADERBTN1'].includes(upperMatchcode)) {
33				return 'primary';
34			}
35			if (upperMatchcode === 'CANCEL') {
36				return 'secondary';
37			}
38
39			if (['NAMEINSADD', 'NAMEINSEDIT', 'NAMEINSDELETE', 'PRINTORDER'].includes(upperMatchcode)) {
40				return 'tableMedium';
41			}
42	⟪?⟫ return 'secondary';  ⟪cut off/blurred at bottom edge, low confidence⟫


========== IMG_2032.md ==========
---
photo: IMG_2032.JPG
type: vscode-code
file: aqs-web-ui/src/components/button.tsx
lines: 11 (sticky), 20(partial)-52
orientation: 0
confidence: high
notes: Same file, scrolled down further. Sticky header shows line 11 "export const Button: React.FC<ButtonProps> = ({". Line 20 partially clipped under sticky header showing only "return null;" fragment, line 21 shows closing "}" of the !visible guard. This photo confirms line 42-43 read in IMG_2031 ("return 'secondary';" / "};") and reveals new content lines 44-52 (getColor function start). Explorer identical (button.tsx selected, 8 problems; action-buttons.tsx 7). Status bar unchanged: 17 errors 0 warnings, No Solution, 4:36 PM 7/10/2026. Line 52 cut off at very bottom (return 'errorMedium'; not yet visible).
---
11	export const Button: React.FC<ButtonProps> = ({
[sticky header]
20		return null;  ⟪partially clipped, top edge⟫
21		}
22
23		const handleClick = () => {
24			// Buttons trigger with empty string value and 'change' event type
25			onCommit(matchcode, '', 'change');
26		};
27
28		// Determine button variant based on matchcode
29		const getVariant = (): 'primary' | 'secondary' | 'text' | 'tableMedium' => {
30			const upperMatchcode = matchcode.toUpperCase();
31
32			if (['OK', 'SUBMIT', 'NEXT', 'HEADERBTN1'].includes(upperMatchcode)) {
33				return 'primary';
34			}
35			if (upperMatchcode === 'CANCEL') {
36				return 'secondary';
37			}
38
39			if (['NAMEINSADD', 'NAMEINSEDIT', 'NAMEINSDELETE', 'PRINTORDER'].includes(upperMatchcode)) {
40				return 'tableMedium';
41			}
42			return 'secondary';
43		};
44
45		// Determine button color based on matchcode
46		const getColor = (): 'primary' | 'secondary' | 'errorMedium' | 'primary' | 'tableMedium' => {
47			const upperMatchcode = matchcode.toUpperCase();
48
49			if (['OK', 'SUBMIT', 'NEXT', 'HEADERBTN1'].includes(upperMatchcode)) {
50				return 'primary';
51			}
52			if (upperMatchcode === 'DELETE' || upperMatchcode === 'DISCARD') {


========== IMG_2033.md ==========
---
photo: IMG_2033.JPG
type: vscode-code
file: aqs-web-ui/src/components/button.tsx
lines: 34-65
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "button.tsx 8" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > button.tsx. Sticky-scroll headers at top: line 11 `export const Button: React.FC<ButtonProps> = ({` and line 29 `const getVariant = (): 'primary' | ...`. Lines 30-33 are hidden behind the sticky headers (not visible/occluded) — only a fragment `}` renders on the row for line 34. Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > assets/svgs (icon2.svg, icon3.svg, icon4.svg), components > data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx [8, selected/highlighted], buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx (cut off at bottom). Red squiggles under `<MuiButton` (line 62) and continuing under lines 63-65 (JSX attribute block). Status bar: aqs-web-ui, branch hitanshu/experimental*, 17 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026.
---
11    export const Button: React.FC<ButtonProps> = ({     [sticky header]
29        const getVariant = (): 'primary' | 'secondary' | 'text' | 'tableMedium' => {     [sticky header]
34        }
35        if (upperMatchcode === 'CANCEL') {
36            return 'secondary';
37        }
38
39        if (['NAMEINSADD', 'NAMEINSEDIT', 'NAMEINSDELETE', 'PRINTORDER'].includes(upperMatchcode)) {
40            return 'tableMedium';
41        }
42
43        return 'secondary';
44    };
45
46    // Determine button color based on matchcode
47    const getColor = (): 'primary' | 'secondary' | 'errorMedium' | 'primary' | 'tableMedium' => {
48        const upperMatchcode = matchcode.toUpperCase();
49        if (['OK', 'SUBMIT', 'NEXT', 'HEADERBTN1'].includes(upperMatchcode)) {
50            return 'primary';
51        }
52        if (upperMatchcode === 'DELETE' || upperMatchcode === 'DISCARD') {
53            return 'errorMedium';
54        }
55        if (['NAMEINSADD', 'NAMEINSEDIT', 'NAMEINSDELETE', 'PRINTORDER'].includes(upperMatchcode)) {
56            return 'secondary';
57        }
58        return 'primary';
59    };
60
61    return (
62        <MuiButton
63            variant={getVariant()}
64            color={getColor()}
65            disabled={disabled || loading}
</content>


========== IMG_2034.md ==========
---
photo: IMG_2034.JPG
type: vscode-code
file: aqs-web-ui/src/components/button.tsx
lines: 44-73
orientation: 0
confidence: high
notes: Tab bar "action-buttons.tsx 7" (inactive), "button.tsx 8" (active, modified, X close). Breadcrumb aqs-web-ui > src > components > button.tsx. Sticky-scroll header at top: line 11 `export const Button: React.FC<ButtonProps> = ({`. Lines 12-43 scrolled off above (not visible). Same scroll region as IMG_2033 but scrolled further down; content of getColor (lines 46-59) is identical between the two photos confirming no blank lines inside the if-blocks. New content visible here beyond IMG_2033: onClick/sx JSX props and the closing return JSX (lines 66-73). Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > assets/svgs (icon2.svg, icon3.svg, icon4.svg), components > data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx [7], button.tsx [8, selected/highlighted], buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx (cut off at bottom). Red squiggles under `<MuiButton` and continuing under the whole JSX attribute block lines 63-68. Status bar: aqs-web-ui, branch hitanshu/experimental*, 17 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:36 PM 7/10/2026. Cursor visible (I-beam) near line 59/`I` mid-screen artifact, not code.
---
11    export const Button: React.FC<ButtonProps> = ({     [sticky header]
44
45
46    // Determine button color based on matchcode
47    const getColor = (): 'primary' | 'secondary' | 'errorMedium' | 'primary' | 'tableMedium' => {
48        const upperMatchcode = matchcode.toUpperCase();
49        if (['OK', 'SUBMIT', 'NEXT', 'HEADERBTN1'].includes(upperMatchcode)) {
50            return 'primary';
51        }
52        if (upperMatchcode === 'DELETE' || upperMatchcode === 'DISCARD') {
53            return 'errorMedium';
54        }
55        if (['NAMEINSADD', 'NAMEINSEDIT', 'NAMEINSDELETE', 'PRINTORDER'].includes(upperMatchcode)) {
56            return 'secondary';
57        }
58        return 'primary';
59    };
60
61    return (
62        <MuiButton
63            variant={getVariant()}
64            color={getColor()}
65            disabled={disabled || loading}
66            onClick={handleClick}
67            sx={{ minWidth: 100 }}
68        >
69
70            {text}
71        </MuiButton>
72    );
73    };
</content>
