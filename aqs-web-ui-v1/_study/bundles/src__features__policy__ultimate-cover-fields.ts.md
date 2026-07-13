# BUNDLE for src/features/policy/ultimate-cover-fields.ts
# 14 photo fragment(s), ascending start-line order.


========== IMG_2680.md ==========
---
photo: IMG_2680.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 1-34
orientation: 180
confidence: high
notes: New file (different tab) from prior photos - ultimate-cover-fields.ts, top of file, sharp/clear image. Explorer sidebar shows same aqs-web-ui/src/features/policy tree; ultimate-cover-fields.ts is selected/highlighted blue, also bold-italic in tab bar suggesting preview/unsaved-preview mode. Status bar: hitanshu/experimental branch, 2 errors 0 warnings, No Solution. Line 34 was cut off at bottom edge in this photo; confirmed by IMG_2681 (same file, scrolled) to read `tabIndex: 21,` - corrected below.
---
1: // Ultimate Cover field definitions and configurations
2: // Note: control types are mapped to FieldRenderer supported types
3: export interface FieldConfig {
4:     matchcode: string;
5:     label: string;
6:     controlType: 'textbox' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'calendar';
7:     visible?: boolean;
8:     required?: boolean;
9:     disabled?: boolean;
10:     tabIndex?: number;
11:     options?: Array<{ label: string; value: string }>;
12:     defaultValue?: string | boolean;
13:     maxLength?: number;
14:     hint?: string;
15:     dateFormat?: string;
16:     isNumeric?: boolean;
17:     left?: number | string;
18:     top?: number | string;
19: }
20:
21: // Policy Tab Fields - Reordered for 2-column layout (left fields pairing with right column fields)
22: export const ultimateCoverPolicyTabFields: FieldConfig[] = [
23:     {
24:         matchcode: 'BOPPOLEXT_Coi_StringValue',
25:         label: 'Coinsurance',
26:         controlType: 'select',
27:         required: true,
28:         tabIndex: 1,
29:     },
30:     {
31:         matchcode: 'BOPPOL_NIRM7',
32:         label: 'Expense Mod',
33:         controlType: 'textbox',
34:         tabIndex: 21,


========== IMG_2681.md ==========
---
photo: IMG_2681.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 3-44
orientation: 180
confidence: high
notes: Same file/tab as IMG_2680 (ultimate-cover-fields.ts), scrolled down slightly. Sticky scroll header shows line 3 `export interface FieldConfig {`. Sharp, clear image. Corrects/confirms line 34 of IMG_2680 which was cut off and marked uncertain there - actual value is `tabIndex: 21,` (not `tabIndex: 2`). Explorer sidebar same tree, ultimate-cover-fields.ts selected. Status bar: hitanshu/experimental branch, 2 errors 0 warnings, No Solution.
---
3: export interface FieldConfig {
13:     maxLength?: number;
14:     hint?: string;
15:     dateFormat?: string;
16:     isNumeric?: boolean;
17:     left?: number | string;
18:     top?: number | string;
19: }
20:
21: // Policy Tab Fields - Reordered for 2-column layout (left fields pairing with right column fields)
22: export const ultimateCoverPolicyTabFields: FieldConfig[] = [
23:     {
24:         matchcode: 'BOPPOLEXT_Coi_StringValue',
25:         label: 'Coinsurance',
26:         controlType: 'select',
27:         required: true,
28:         tabIndex: 1,
29:     },
30:     {
31:         matchcode: 'BOPPOL_NIRM7',
32:         label: 'Expense Mod',
33:         controlType: 'textbox',
34:         tabIndex: 21,
35:         isNumeric: true,
36:         left: '50%',
37:         top: '0px',
38:     },
39:     {
40:         matchcode: 'BOPPOL_LDED2',
41:         label: 'Building Deductible',
42:         controlType: 'select',
43:         required: true,
44:         tabIndex: 2,


========== IMG_2682.md ==========
---
photo: IMG_2682.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 22-62
orientation: 180
confidence: high
notes: Same file/tab as IMG_2680/2681 (ultimate-cover-fields.ts), scrolled further. Sticky scroll header shows line 22 `export const ultimateCoverPolicyTabFields: FieldConfig[] = [`. Photo has double-exposure/motion-blur ghosting (fainter duplicate offset a few lines) but bold/sharp layer was cross-verified via zoomed crops against known content from IMG_2680/2681 for lines 31-38 (matches exactly), and resolves new content for lines 39-62. New object starting line 46 is matchcode 'BOPPOLEXT_TerRsk_StringValue' / label 'Terrorism Coverage', disabled:true, tabIndex:-1. Explorer sidebar same tree, ultimate-cover-fields.ts selected. Status bar: hitanshu/experimental branch, 2 errors 0 warnings, No Solution.
---
22: export const ultimateCoverPolicyTabFields: FieldConfig[] = [
31:         matchcode: 'BOPPOL_NIRM7',
32:         label: 'Expense Mod',
33:         controlType: 'textbox',
34:         tabIndex: 21,
35:         isNumeric: true,
36:         left: '50%',
37:         top: '0px',
38:     },
39:     {
40:         matchcode: 'BOPPOL_LDED2',
41:         label: 'Building Deductible',
42:         controlType: 'select',
43:         required: true,
44:         tabIndex: 2,
45:     },
46:     {
47:         matchcode: 'BOPPOLEXT_TerRsk_StringValue',
48:         label: 'Terrorism Coverage',
49:         controlType: 'select',
50:         disabled: true,
51:         tabIndex: -1,
52:         left: '50%',
53:         top: '28px',
54:     },
55:
56:     {
57:         matchcode: 'BOPPOL_LDED1',
58:         label: 'Pers Prop Deductible',
59:         controlType: 'select',
60:         required: true,
61:         tabIndex: 3,
62:     },


========== IMG_2683.md ==========
---
photo: IMG_2683.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 22-81
orientation: 180
confidence: high
notes: Same file/tab as IMG_2680/2681/2682 (ultimate-cover-fields.ts), scrolled further. Sticky scroll header shows line 22 `export const ultimateCoverPolicyTabFields: FieldConfig[] = [`. Photo has double-exposure/motion-blur ghosting (fainter duplicate offset a few lines) but bold/sharp layer cross-verified via zoomed crops; lines 49-62 match/confirm IMG_2682, lines 63-81 are new content. Explorer sidebar same tree, ultimate-cover-fields.ts selected. Status bar: hitanshu/experimental branch, 2 errors 0 warnings, No Solution.
---
22: export const ultimateCoverPolicyTabFields: FieldConfig[] = [
49:         controlType: 'select',
50:         disabled: true,
51:         tabIndex: -1,
52:         left: '50%',
53:         top: '28px',
54:     },
55:
56:     {
57:         matchcode: 'BOPPOL_LDED1',
58:         label: 'Pers Prop Deductible',
59:         controlType: 'select',
60:         required: true,
61:         tabIndex: 3,
62:     },
63:     {
64:         matchcode: 'BOPPOLEXT_SdsDed_StringValue',
65:         label: 'Sewer, Drain or Sump Ded',
66:         controlType: 'select',
67:         tabIndex: 22,
68:         left: '50%',
69:         top: '56px',
70:     },
71:
72:     {
73:         matchcode: 'BOPPOLEXT_Idd_StringValue',
74:         label: 'Transit Deductible',
75:         controlType: 'select',
76:         tabIndex: 4,
77:     },
78:     {
79:         matchcode: 'BOPPOLEXT_SplDed_StringValue',
80:         label: 'Sprinkler Leakage Ded',
81:         controlType: 'select',


========== IMG_2684.md ==========
---
photo: IMG_2684.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 60-91 (sticky scroll: 22)
orientation: 180
confidence: medium
notes: Photo was upside down; rotated 180 and read from rotated copy. Photo exhibits a strong double-exposure/motion-ghosting artifact across the entire frame (every line of text, and the gutter numbers themselves, appear with a fainter offset duplicate a few lines away - consistent with VS Code's smooth-scroll animation being mid-transition when a multi-frame shot was taken). Gutter-number-to-text pairing by naive visual alignment was unreliable (off by ~2 lines in places); line numbers below were reconstructed via brace-matching of the repeating FieldConfig pattern (matchcode/label/controlType/[required]/tabIndex[/left/top], wrapped in { }) and cross-verified against: (1) the faint ghost-layer text near the top of this photo, which independently reads matchcode/label('Pers Prop Deductible')/controlType/required in sequence, and (2) the overlapping visible range in IMG_2685 (same file, scrolled down, lines 68-97), whose clean, unambiguous reading of lines 90-97 (controlType/tabIndex/}/{/matchcode/label/controlType/tabIndex for the Fdd and PbdDed fields) matches this reconstruction exactly. Confidence in field CONTENT (matchcodes, labels, tabIndex/left/top values) is high; confidence in exact line-number placement is medium given the source photo's ghosting. Sticky-scroll header at top shows enclosing line 22: "export const ultimateCoverPolicyTabFields: FieldConfig[] = [". Tab: ultimate-cover-fields.ts (only tab open). Breadcrumb: aqs-web-ui > src > features > policy > ultimate-cover-fields.ts. Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): features > policy > constants (tab-definitions.ts, ultimate-cover-tab-definit[ions].ts), utils (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts), FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts (selected, highlighted blue); then collapsed folders prp, root, hooks, lib, pages, providers, services, types. Status bar: workspace "AQS_workspace (Workspace)", branch hitanshu/experimental*, 2 errors 0 warnings (red X icon "2", triangle "0"), "No Solution" (red), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 5:16 PM 7/10/2026.
---
Sticky scroll header:
22   export const ultimateCoverPolicyTabFields: FieldConfig[] = [

Visible body (lines 60-91; line 59, matchcode for the field closing at 64, is above the visible range):
60       label: 'Pers Prop Deductible',
61       controlType: 'select',
62       required: true,
63       tabIndex: 3,
64   },
65   {
66       matchcode: 'BOPPOLEXT_SdsDed_StringValue',
67       label: 'Sewer, Drain or Sump Ded',
68       controlType: 'select',
69       tabIndex: 22,
70       left: '50%',
71       top: '56px',
72   },
73   {
74       matchcode: 'BOPPOLEXT_Idd_StringValue',
75       label: 'Transit Deductible',
76       controlType: 'select',
77       tabIndex: 4,
78   },
79   {
80       matchcode: 'BOPPOLEXT_SplDed_StringValue',
81       label: 'Sprinkler Leakage Ded',
82       controlType: 'select',
83       tabIndex: 23,
84       left: '50%',
85       top: '93px',
86   },
87   {
88       matchcode: 'BOPPOLEXT_Fdd_StringValue',
89       label: 'Flood Deductible',
90       controlType: 'select',
91       tabIndex: 5,


========== IMG_2685.md ==========
---
photo: IMG_2685.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 68-97 (sticky scroll: 22)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 and read from rotated copy. Same file/tab as IMG_2684, scrolled down slightly (overlaps IMG_2684 lines 68-91). Photo has the same double-exposure/motion-ghosting artifact as IMG_2684 (faint offset duplicate of each text line), but the lower portion of this photo (lines ~85-97) is comparatively clean/unambiguous - gutter numbers there are singular and line up tightly with a self-consistent matchcode/label/controlType/tabIndex sequence for the Fdd and PbdDed fields, which was used as the anchor to resolve/cross-check the line numbering in IMG_2684. Sticky-scroll header at top shows enclosing line 22: "export const ultimateCoverPolicyTabFields: FieldConfig[] = [". Tab: ultimate-cover-fields.ts (only tab open). Breadcrumb: aqs-web-ui > src > features > policy > ultimate-cover-fields.ts. Explorer sidebar identical to IMG_2684 (AQS_WORKSPACE > aqs-web-ui > src > features > policy > constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts selected/highlighted; collapsed prp, root, hooks, lib, pages, providers, services, types). Status bar: workspace "AQS_workspace (Workspace)", branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution" (red), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 5:16 PM 7/10/2026.
---
Sticky scroll header:
22   export const ultimateCoverPolicyTabFields: FieldConfig[] = [

Visible body (lines 68-97):
68       controlType: 'select',
69       tabIndex: 22,
70       left: '50%',
71       top: '56px',
72   },
73   {
74       matchcode: 'BOPPOLEXT_Idd_StringValue',
75       label: 'Transit Deductible',
76       controlType: 'select',
77       tabIndex: 4,
78   },
79   {
80       matchcode: 'BOPPOLEXT_SplDed_StringValue',
81       label: 'Sprinkler Leakage Ded',
82       controlType: 'select',
83       tabIndex: 23,
84       left: '50%',
85       top: '93px',
86   },
87   {
88       matchcode: 'BOPPOLEXT_Fdd_StringValue',
89       label: 'Flood Deductible',
90       controlType: 'select',
91       tabIndex: 5,
92   },
93   {
94       matchcode: 'BOPPOLEXT_PbdDed_BooleanValue',
95       label: 'Per Building Ded',
96       controlType: 'checkbox',
97       tabIndex: 24,


========== IMG_2686.md ==========
---
photo: IMG_2686.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 86-118 (sticky scroll: 22)
orientation: 180
confidence: medium
notes: Photo was upside down; rotated 180 and read from rotated copy. Same file/tab as IMG_2684/IMG_2685, scrolled down further (overlaps IMG_2685 at lines 86-91, and overlaps IMG_2687 at lines 100-118). Same double-exposure/motion-ghosting artifact as prior photos. Line numbers below were corrected after cross-checking against IMG_2687 (same file, scrolled slightly further, much sharper/less blurred), which gave an unambiguous reading of lines 100-131; there appears to be one blank/unclear line at 101 between the PbdDed field's closing brace and the Eqd field's opening brace (no legible bold text there in either photo - possibly a genuine blank line in the source). Field content (matchcodes, labels, control types, tabIndex/left/top values) is high confidence; line-number placement is now high confidence for lines 93-118 (anchored via IMG_2687) and medium for lines 86-92. Sticky-scroll header at top shows enclosing line 22: "export const ultimateCoverPolicyTabFields: FieldConfig[] = [". Tab: ultimate-cover-fields.ts (only tab open). Breadcrumb: aqs-web-ui > src > features > policy > ultimate-cover-fields.ts. Explorer sidebar identical to IMG_2684/2685. Status bar: workspace "AQS_workspace (Workspace)", branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution" (red), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 5:16 PM 7/10/2026.
---
Sticky scroll header:
22   export const ultimateCoverPolicyTabFields: FieldConfig[] = [

Visible body (lines 86-118):
86   },
87   {
88       matchcode: 'BOPPOLEXT_Fdd_StringValue',
89       label: 'Flood Deductible',
90       controlType: 'select',
91       tabIndex: 5,
92   },
93   {
94       matchcode: 'BOPPOLEXT_PbdDed_BooleanValue',
95       label: 'Per Building Ded',
96       controlType: 'checkbox',
97       tabIndex: 24,
98       left: '50%',
99       top: '125px',
100  },
101  ⟪blank/unclear line⟫
102  {
103      matchcode: 'BOPPOLEXT_Eqd_StringValue',
104      label: 'Earthquake Deductible',
105      controlType: 'select',
106      tabIndex: 6,
107  },
108  {
109      matchcode: 'BOPPOLEXT_AllBldRofSrf_BooleanValue',
110      label: 'All Bldgs Roof Surfacing',
111      controlType: 'checkbox',
112      tabIndex: 25,
113      left: '50%',
114      top: '160px',
115  },
116  {
117      matchcode: 'BOPPOLEXT_EqdPer_StringValue',
118      label: 'EQ Percentage Deductible',


========== IMG_2687.md ==========
---
photo: IMG_2687.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 99-131 (sticky scroll: 22)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 and read from rotated copy. Same file/tab as prior photos in this run, scrolled down further (overlaps IMG_2686 at lines 100-118). This photo is notably sharper/less blurred than IMG_2684-2686, giving an unambiguous reading confirmed by multiple tight crops. There is one blank/unclear line at 101 between the PbdDed field's closing brace (100) and the Eqd field's opening brace (102) - no legible bold foreground text at that row in either this photo or IMG_2686, possibly a genuine blank line in the source. This photo's clean reading of lines 100-131 was used to retroactively correct the line numbering in IMG_2686's transcript. Sticky-scroll header at top shows enclosing line 22: "export const ultimateCoverPolicyTabFields: FieldConfig[] = [". Tab: ultimate-cover-fields.ts (only tab open). Breadcrumb: aqs-web-ui > src > features > policy > ultimate-cover-fields.ts. Explorer sidebar identical to prior photos in this run (ultimate-cover-fields.ts selected/highlighted; policy/constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts; collapsed prp, root, hooks, lib, pages, providers, services, types). Status bar: workspace "AQS_workspace (Workspace)", branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution" (red), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 5:16 PM 7/10/2026.
---
Sticky scroll header:
22   export const ultimateCoverPolicyTabFields: FieldConfig[] = [

Visible body (lines 99-131):
99       top: '125px',
100  },
101  ⟪blank/unclear line⟫
102  {
103      matchcode: 'BOPPOLEXT_Eqd_StringValue',
104      label: 'Earthquake Deductible',
105      controlType: 'select',
106      tabIndex: 6,
107  },
108  {
109      matchcode: 'BOPPOLEXT_AllBldRofSrf_BooleanValue',
110      label: 'All Bldgs Roof Surfacing',
111      controlType: 'checkbox',
112      tabIndex: 25,
113      left: '50%',
114      top: '160px',
115  },
116  {
117      matchcode: 'BOPPOLEXT_EqdPer_StringValue',
118      label: 'EQ Percentage Deductible',
119      controlType: 'select',
120      tabIndex: 7,
121  },
122  {
123      matchcode: 'BOPPOLEXT_Wsh_StringValue',
124      label: 'Wind/Hail Deductible',
125      controlType: 'select',
126      tabIndex: 8,
127  },
128  {
129      matchcode: 'BOPPOLEXT_WatDam_StringValue',
130      label: 'Water Damage Deductible',
131      controlType: 'select',


========== IMG_2688.md ==========
---
photo: IMG_2688.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 107-141 (sticky scroll: 22)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 and read from rotated copy. Same file/tab as prior photos in this run, scrolled down further (overlaps IMG_2687 at lines 107-131, and overlaps IMG_2689 at lines 134-141). Same double-exposure/motion-ghosting artifact (faint offset duplicate of each line), but lines 107-120 match the mapping already cross-confirmed via IMG_2687, giving high confidence for the whole visible range. The Loc_DoubleValue field (lines 134-141, "# of Locations") property order (controlType, disabled, tabIndex, isNumeric) was confirmed via a clean crop of IMG_2689 which shows the same field range more sharply. Sticky-scroll header at top shows enclosing line 22: "export const ultimateCoverPolicyTabFields: FieldConfig[] = [". Tab: ultimate-cover-fields.ts (only tab open). Breadcrumb: aqs-web-ui > src > features > policy > ultimate-cover-fields.ts. Explorer sidebar identical to prior photos in this run. Status bar: workspace "AQS_workspace (Workspace)", branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution" (red), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 5:16 PM 7/10/2026.
---
Sticky scroll header:
22   export const ultimateCoverPolicyTabFields: FieldConfig[] = [

Visible body (lines 107-141):
107  },
108  {
109      matchcode: 'BOPPOLEXT_AllBldRofSrf_BooleanValue',
110      label: 'All Bldgs Roof Surfacing',
111      controlType: 'checkbox',
112      tabIndex: 25,
113      left: '50%',
114      top: '160px',
115  },
116  {
117      matchcode: 'BOPPOLEXT_EqdPer_StringValue',
118      label: 'EQ Percentage Deductible',
119      controlType: 'select',
120      tabIndex: 7,
121  },
122  {
123      matchcode: 'BOPPOLEXT_Wsh_StringValue',
124      label: 'Wind/Hail Deductible',
125      controlType: 'select',
126      tabIndex: 8,
127  },
128  {
129      matchcode: 'BOPPOLEXT_WatDam_StringValue',
130      label: 'Water Damage Deductible',
131      controlType: 'select',
132      tabIndex: 9,
133  },
134  {
135      matchcode: 'BOPPOLEXT_Loc_DoubleValue',
136      label: '# of Locations',
137      controlType: 'textbox',
138      disabled: true,
139      tabIndex: 10,
140      isNumeric: true,
141  },


========== IMG_2689.md ==========
---
photo: IMG_2689.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 123-154 (sticky scroll: 22)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 and read from rotated copy. Same file/tab as prior photos in this run, scrolled down further (overlaps IMG_2688 at lines 123-141). Same double-exposure/motion-ghosting artifact, but multiple tight crops gave an unambiguous, internally consistent reading for lines 123-154. A ghost duplicate of the 'BOPPOL_LPRISTANAM' / 'Primary State' field (lines 149-154) appears bled into the visual area around lines 152-154 in less-cropped views of this photo; a tight crop confirmed only one such field is actually present in this range (149-154, tabIndex 12) - treated as a ghosting artifact, not a real duplicate in the source. Sticky-scroll header at top shows enclosing line 22: "export const ultimateCoverPolicyTabFields: FieldConfig[] = [". Tab: ultimate-cover-fields.ts (only tab open). Breadcrumb: aqs-web-ui > src > features > policy > ultimate-cover-fields.ts. Explorer sidebar identical to prior photos in this run. Status bar: workspace "AQS_workspace (Workspace)", branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution" (red), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 5:16 PM 7/10/2026.
---
Sticky scroll header:
22   export const ultimateCoverPolicyTabFields: FieldConfig[] = [

Visible body (lines 123-154):
123      matchcode: 'BOPPOLEXT_Wsh_StringValue',
124      label: 'Wind/Hail Deductible',
125      controlType: 'select',
126      tabIndex: 8,
127  },
128  {
129      matchcode: 'BOPPOLEXT_WatDam_StringValue',
130      label: 'Water Damage Deductible',
131      controlType: 'select',
132      tabIndex: 9,
133  },
134  {
135      matchcode: 'BOPPOLEXT_Loc_DoubleValue',
136      label: '# of Locations',
137      controlType: 'textbox',
138      disabled: true,
139      tabIndex: 10,
140      isNumeric: true,
141  },
142  {
143      matchcode: 'BOPPOLEXT_Csp_StringValue',
144      label: 'CSP Code',
145      controlType: 'textbox',
146      required: true,
147      tabIndex: 11,
148  },
149  {
150      matchcode: 'BOPPOL_LPRISTANAM',
151      label: 'Primary State',
152      controlType: 'select',
153      tabIndex: 12,
154  },


========== IMG_2690.md ==========
---
photo: IMG_2690.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 139-170 (sticky scroll: 22)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 and read from rotated copy. Same file/tab as prior photos in this run, scrolled down further (overlaps IMG_2689 at lines 139-154). Same double-exposure/motion-ghosting artifact, but tight crops gave an unambiguous reading. This photo shows the END of the ultimateCoverPolicyTabFields array (closing "];" at line 167) and the START of a new array, ultimateCoverDetailsTabFields, at line 170 (preceded by a "// Details Tab Fields" comment at line 169). A less-cropped view of this photo showed what looked like a second BOPPOL_BMRFMRCEXC/Microfracture field with tabIndex 13 near lines 161-165 - a tight crop confirmed this is a ghosting artifact (the same field's own content bleeding into an adjacent visual row); only one such field exists (161-166, tabIndex 14). Sticky-scroll header at top shows enclosing line 22: "export const ultimateCoverPolicyTabFields: FieldConfig[] = [". Tab: ultimate-cover-fields.ts (only tab open). Breadcrumb: aqs-web-ui > src > features > policy > ultimate-cover-fields.ts. Explorer sidebar identical to prior photos in this run. Status bar: workspace "AQS_workspace (Workspace)", branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution" (red), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 5:16 PM 7/10/2026.
---
Sticky scroll header:
22   export const ultimateCoverPolicyTabFields: FieldConfig[] = [

Visible body (lines 139-170):
139      tabIndex: 10,
140      isNumeric: true,
141  },
142  {
143      matchcode: 'BOPPOLEXT_Csp_StringValue',
144      label: 'CSP Code',
145      controlType: 'textbox',
146      required: true,
147      tabIndex: 11,
148  },
149  {
150      matchcode: 'BOPPOL_LPRISTANAM',
151      label: 'Primary State',
152      controlType: 'select',
153      tabIndex: 12,
154  },
155  {
156      matchcode: 'BOPPOLEXT_AgdVal_BooleanValue',
157      label: 'Agreed Value',
158      controlType: 'checkbox',
159      tabIndex: 13,
160  },
161  {
162      matchcode: 'BOPPOL_BMRFMRCEXC',
163      label: 'Microfracture or Microcracking Exclusion',
164      controlType: 'checkbox',
165      tabIndex: 14,
166  },
167  ];
168  
169  // Details Tab Fields
170  export const ultimateCoverDetailsTabFields: FieldConfig[] = [


========== IMG_2691.md ==========
---
photo: IMG_2691.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 155-186 (sticky scroll: 22)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 and read from rotated copy. Same file/tab as prior photos in this run, scrolled down further (overlaps IMG_2690 at lines 155-170). Same double-exposure/motion-ghosting artifact, but tight crops gave an unambiguous reading confirming IMG_2690's mapping and extending it. Shows the end of the ultimateCoverPolicyTabFields array (closes at line 167) and the start of ultimateCoverDetailsTabFields (line 170 onward, preceded by "// Details Tab Fields" comment at 169). Sticky-scroll header at top shows enclosing line 22 (still the old ultimateCoverPolicyTabFields declaration, stale since the editor hasn't scrolled past its own closing bracket's sticky context): "export const ultimateCoverPolicyTabFields: FieldConfig[] = [". Tab: ultimate-cover-fields.ts (only tab open). Breadcrumb: aqs-web-ui > src > features > policy > ultimate-cover-fields.ts. Explorer sidebar identical to prior photos in this run. Status bar: workspace "AQS_workspace (Workspace)", branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution" (red), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 5:16 PM 7/10/2026.
---
Sticky scroll header:
22   export const ultimateCoverPolicyTabFields: FieldConfig[] = [

Visible body (lines 155-186):
155  {
156      matchcode: 'BOPPOLEXT_AgdVal_BooleanValue',
157      label: 'Agreed Value',
158      controlType: 'checkbox',
159      tabIndex: 13,
160  },
161  {
162      matchcode: 'BOPPOL_BMRFMRCEXC',
163      label: 'Microfracture or Microcracking Exclusion',
164      controlType: 'checkbox',
165      tabIndex: 14,
166  },
167  ];
168  
169  // Details Tab Fields
170  export const ultimateCoverDetailsTabFields: FieldConfig[] = [
171  {
172      matchcode: 'BOPPOL_LEXPPOLNUM',
173      label: 'Prev. Policy Number',
174      controlType: 'textbox',
175      maxLength: 20,
176      tabIndex: 2,
177  },
178  {
179      matchcode: 'BOPPOL_NRLVEFFDAT',
180      label: 'Rate Level Eff. Date',
181      controlType: 'date',
182      tabIndex: 3,
183  },
184  {
185      matchcode: 'BOPPOL_LRLVTCT',
186      label: 'Rate Level',


========== IMG_2693.md ==========
---
photo: IMG_2693.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 178-206 (sticky scroll: 170)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 and read from rotated copy. Same file/tab as prior photos in this run, scrolled down slightly further (overlaps IMG_2691/IMG_2692 at lines 178-197). This photo has little to no ghosting (much sharper than IMG_2684-2692), giving a fully unambiguous reading; used to confirm the earlier photos' line numbers and to capture the end of the ultimateCoverDetailsTabFields array. Sticky-scroll header correctly shows line 170 "export const ultimateCoverDetailsTabFields: FieldConfig[] = [" here (unlike IMG_2691/2692 which showed a stale line 22 from the outer/earlier array). Array closes with "];" at line 205; line 206 is blank (last visible line, possibly end of file - not confirmed). Tab: ultimate-cover-fields.ts (only tab open). Breadcrumb: aqs-web-ui > src > features > policy > ultimate-cover-fields.ts. Explorer sidebar identical to prior photos in this run. Status bar: workspace "AQS_workspace (Workspace)", branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution" (red), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 5:16 PM 7/10/2026.
---
Sticky scroll header:
170  export const ultimateCoverDetailsTabFields: FieldConfig[] = [

Visible body (lines 178-206):
178  {
179      matchcode: 'BOPPOL_NRLVEFFDAT',
180      label: 'Rate Level Eff. Date',
181      controlType: 'date',
182      tabIndex: 3,
183  },
184  {
185      matchcode: 'BOPPOL_LRLVTCT',
186      label: 'Rate Level',
187      controlType: 'radio',
188      tabIndex: 4,
189  },
190  {
191      matchcode: 'BOPPOL_NRLVDAT',
192      ⟪label: 'Eff. Date of Rates', - inferred, not directly visible in this crop, confirmed in IMG_2692⟫
193      ⟪controlType: 'date', - inferred, confirmed in IMG_2692⟫
194      ⟪disabled: true, - inferred, confirmed in IMG_2692⟫
195      ⟪tabIndex: 5, - inferred, confirmed in IMG_2692⟫
196  },
197  {
198      matchcode: 'BOPPOL_NMINPRM',
199      label: 'Minimum Premium',
200      controlType: 'textbox',
201      disabled: true,
202      tabIndex: 1,
203      isNumeric: true,
204  },
205  ];
206  


========== IMG_2692.md ==========
---
photo: IMG_2692.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/ultimate-cover-fields.ts
lines: 181-202 (sticky scroll: 22)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 and read from rotated copy. Same file/tab as prior photos in this run (still the ultimateCoverDetailsTabFields array), scrolled down further (overlaps IMG_2691 at lines 181-186). Same double-exposure/motion-ghosting artifact; two overlapping crops were reconciled (one crop's numbering was off by one relative to the other due to slightly different crop boundaries - resolved by cross-checking against the unambiguous matchcode/label pairing). Sticky-scroll header still shows the stale enclosing line 22 (ultimateCoverPolicyTabFields, the earlier/outer array whose closing bracket the editor hasn't scrolled past for sticky-context purposes) rather than line 170 (ultimateCoverDetailsTabFields) - same behavior noted in IMG_2691. Tab: ultimate-cover-fields.ts (only tab open). Breadcrumb: aqs-web-ui > src > features > policy > ultimate-cover-fields.ts. Explorer sidebar identical to prior photos in this run. Status bar: workspace "AQS_workspace (Workspace)", branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution" (red), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 5:16 PM 7/10/2026.
---
Sticky scroll header:
22   export const ultimateCoverPolicyTabFields: FieldConfig[] = [

Visible body (lines 181-202):
181      controlType: 'date',
182      tabIndex: 3,
183  },
184  {
185      matchcode: 'BOPPOL_LRLVTCT',
186      label: 'Rate Level',
187      controlType: 'radio',
188      tabIndex: 4,
189  },
190  {
191      matchcode: 'BOPPOL_NRLVDAT',
192      label: 'Eff. Date of Rates',
193      controlType: 'date',
194      disabled: true,
195      tabIndex: 5,
196  },
197  {
198      matchcode: 'BOPPOL_NMINPRM',
199      label: 'Minimum Premium',
200      controlType: 'textbox',
201      disabled: true,
202      tabIndex: 1,
