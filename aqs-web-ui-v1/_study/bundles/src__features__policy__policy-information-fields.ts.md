# BUNDLE for src/features/policy/policy-information-fields.ts
# 24 photo fragment(s), ascending start-line order.


========== IMG_2649.md ==========
---
photo: IMG_2649.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 1-33
orientation: 180
confidence: high
notes: Explorer shows policy folder expanded with policy-information-fields.ts selected/highlighted. Other files visible in policy/: constants/ (tab-definitions.ts, ultimate-cover-tab-definit...), utils/ (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts), FieldRenderer.tsx, index.ts, types.ts, ultimate-cover-fields.ts. Sibling folders under src: prp, root, hooks, lib, pages, providers, services, types. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution. Line 34 begins at the very bottom edge of frame and is cut off (not legible) - only line 33 "tab: 'TABPOL'," is fully visible for the second field object (policyNumber).
---
1  // PolicyInformation static field mapping
2  // This file maps PolicyInformation tab fields for legacy ASP modernization.
3  // Each field is identified by its matchcode (field ID), label, and control type.
4  export interface PolicyInformationField {
5      matchcode: string; // Unique field identifier (from ASP/XML)
6      name: string; // Camel-case name for form bindings
7      label: string; // UI label
8      controlType: 'textbox' | 'select' | 'radio' | 'checkbox' | 'date' | 'textarea';
9      tab: string; // TABPOL | TABDET | TABBIL | TABINS | TABAGT
10     options?: Array<{ value: string; label: string }>;
11     highlight?: boolean; // Optional highlighting
12     highlightColor?: string; // Optional highlight background color
13     highlightBorderColor?: string; // Optional highlight border color
14     required?: boolean; // Field is required for form submission
15 }
16
17 // Static mapping derived from Pol_PIPHPOL_... ASP (TABPOL fields shown)
18 export const PolicyInformationFields: PolicyInformationField[] = [
19     // TABPOL (Policy)
20     {
21         matchcode: 'POLPOLV3X_LEXLIDX',
22         name: 'pathId',
23         label: 'Path ID',
24         controlType: 'textbox',
25         tab: 'TABPOL',
26         required: true,
27     },
28     {
29         matchcode: 'POLPOL_LPOLNUM',
30         name: 'policyNumber',
31         label: 'Policy Number',
32         controlType: 'textbox',
33         tab: 'TABPOL',
34 ⟪?⟫


========== IMG_2650.md ==========
---
photo: IMG_2650.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 18-52
orientation: 180
confidence: high
notes: Continuation of IMG_2649 (same file, scrolled down). Sticky-scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Line 20 is mostly cut off at top edge (only fragment of "{" visible, matches "{ " opening brace after line 19 comment from prior photo). Explorer tree same as IMG_2649, policy-information-fields.ts selected. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution. Line 52 is last fully visible line before status bar.
---
18 export const PolicyInformationFields: PolicyInformationField[] = [
19 ⟪?⟫ (not visible, from prior photo: "// TABPOL (Policy)")
20 {
21     matchcode: 'POLPOLV3X_LEXLIDX',
22     name: 'pathId',
23     label: 'Path ID',
24     controlType: 'textbox',
25     tab: 'TABPOL',
26     required: true,
27 },
28 {
29     matchcode: 'POLPOL_LPOLNUM',
30     name: 'policyNumber',
31     label: 'Policy Number',
32     controlType: 'textbox',
33     tab: 'TABPOL',
34 },
35 {
36     matchcode: 'POLPOL_NEFFDAT',
37     name: 'effectiveDate',
38     label: 'Effective Date',
39     controlType: 'date',
40     tab: 'TABPOL',
41 },
42 {
43     matchcode: 'POLPOL_NEXPDAT',
44     name: 'expirationDate',
45     label: 'Expiration Date',
46     controlType: 'date',
47     tab: 'TABPOL',
48 },
49 {
50     matchcode: 'POLPOL_LRLVTCT',
51     name: 'rateLevel',
52     label: 'Rate Level',


========== IMG_2651.md ==========
---
photo: IMG_2651.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 36-68
orientation: 180
confidence: high
notes: Continuation of IMG_2650 (same file, scrolled further down). Sticky-scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Line 68 is last visible line, cut off at bottom (matchcode value 'POLPOLEXT_Cnv_BooleanValue' fully visible though). Explorer tree unchanged, policy-information-fields.ts selected. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution.
---
18 export const PolicyInformationFields: PolicyInformationField[] = [
   ⟪sticky scroll header — actual body continues below⟫
36     matchcode: 'POLPOL_NEFFDAT',
37     name: 'effectiveDate',
38     label: 'Effective Date',
39     controlType: 'date',
40     tab: 'TABPOL',
41 },
42 {
43     matchcode: 'POLPOL_NEXPDAT',
44     name: 'expirationDate',
45     label: 'Expiration Date',
46     controlType: 'date',
47     tab: 'TABPOL',
48 },
49 {
50     matchcode: 'POLPOL_LRLVTCT',
51     name: 'rateLevel',
52     label: 'Rate Level',
53     controlType: 'radio',
54     tab: 'TABPOL',
55     options: [
56         { value: 'NEW', label: 'New' },
57         { value: 'RENEWAL', label: 'Renewal' },
58     ],
59 },
60 {
61     matchcode: 'POLPOLEXT_LrgRskRul_BooleanValue',
62     name: 'largeRiskRuleExemption',
63     label: 'Lg. Risk Rule Exemption',
64     controlType: 'checkbox',
65     tab: 'TABPOL',
66 },
67 {
68     matchcode: 'POLPOLEXT_Cnv_BooleanValue',


========== IMG_2652.md ==========
---
photo: IMG_2652.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 47-78
orientation: 180
confidence: medium
notes: Continuation/overlap of IMG_2650-2651 (same file, scrolled slightly further). Photo shows motion-blur "ghosting" - a faint duplicate of a slightly different scroll offset is superimposed behind the sharp foreground text (likely camera captured during a screen scroll animation). Transcription below is the sharp/legible foreground text only; the faint ghost text underneath was ignored as it duplicates the same field definitions at a ~1-line offset. Sticky-scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Explorer tree unchanged, policy-information-fields.ts selected. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution.
---
18 export const PolicyInformationFields: PolicyInformationField[] = [
   ⟪sticky scroll header — actual body continues below⟫
47     tab: 'TABPOL',
48 },
49 {
50     matchcode: 'POLPOL_LRLVTCT',
51     name: 'rateLevel',
52     label: 'Rate Level',
53     controlType: 'radio',
54     tab: 'TABPOL',
55     options: [
56         { value: 'NEW', label: 'New' },
57         { value: 'RENEWAL', label: 'Renewal' },
58     ],
59 },
60 {
61     matchcode: 'POLPOLEXT_LrgRskRul_BooleanValue',
62     name: 'largeRiskRuleExemption',
63     label: 'Lg. Risk Rule Exemption',
64     controlType: 'checkbox',
65     tab: 'TABPOL',
66 },
67 {
68     matchcode: 'POLPOLEXT_Cnv_BooleanValue',
69     name: 'convenience',
70     label: 'Convenience',
71     controlType: 'checkbox',
72     tab: 'TABPOL',
73 },
74 {
75     matchcode: 'POLPOL_LCMP',
76     name: 'companyName',
77     label: 'Company Name',
78     controlType: 'select',


========== IMG_2653.md ==========
---
photo: IMG_2653.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 71-102
orientation: 180
confidence: medium
notes: Continuation of IMG_2652 (same file, scrolled further). Photo has motion-blur "ghosting" - a faint duplicate of a slightly different scroll offset (~3 lines) is superimposed behind the sharp foreground text, and the left line-number gutter is likewise doubled/blurred. Line numbers below were reconstructed by cross-referencing the sharp foreground text against the confirmed line numbering from IMG_2652 (lines 71-78 match exactly) and extrapolating the consistent ~6-7 line-per-field-object pattern for lines 79-102; underlying content itself is legible. Sticky-scroll header shows line 18. Explorer tree unchanged, policy-information-fields.ts selected. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution.
---
18 export const PolicyInformationFields: PolicyInformationField[] = [
   ⟪sticky scroll header — actual body continues below⟫
71     controlType: 'checkbox',
72     tab: 'TABPOL',
73 },
74 {
75     matchcode: 'POLPOL_LCMP',
76     name: 'companyName',
77     label: 'Company Name',
78     controlType: 'select',
79     tab: 'TABPOL',
80 },
81 {
82     matchcode: 'POLPOL_LPLN',
83     name: 'plan',
84     label: 'Plan',
85     controlType: 'select',
86     tab: 'TABPOL',
87     required: true,
88 },
89 {
90     matchcode: 'POLPOLV3X_LPRDCDE',
91     name: 'productCode',
92     label: 'Product Code',
93     controlType: 'select',
94     tab: 'TABPOL',
95 },
96 {
97     matchcode: 'POLPOLEXT_PgmCdeDes_StringValue',
98     name: 'program',
99     label: 'Program',
100    controlType: 'textbox',
101    tab: 'TABPOL',
102 },


========== IMG_2654.md ==========
---
photo: IMG_2654.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 81-112
orientation: 180
confidence: high
notes: Continuation of IMG_2653 (same file, scrolled further), sharp/clear (no ghosting this time), confirms line numbering from IMG_2653 was correct. Sticky-scroll header shows line 18. Line 112 label value ("Exclude NBC") and line 113 are cut off at bottom edge. Explorer tree unchanged, policy-information-fields.ts selected. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution.
---
18 export const PolicyInformationFields: PolicyInformationField[] = [
   ⟪sticky scroll header — actual body continues below⟫
81 {
82     matchcode: 'POLPOL_LPLN',
83     name: 'plan',
84     label: 'Plan',
85     controlType: 'select',
86     tab: 'TABPOL',
87     required: true,
88 },
89 {
90     matchcode: 'POLPOLV3X_LPRDCDE',
91     name: 'productCode',
92     label: 'Product Code',
93     controlType: 'select',
94     tab: 'TABPOL',
95 },
96 {
97     matchcode: 'POLPOLEXT_PgmCdeDes_StringValue',
98     name: 'program',
99     label: 'Program',
100    controlType: 'textbox',
101    tab: 'TABPOL',
102 },
103 {
104    matchcode: 'POLXCP_POLPOL_TERRSK_LMSC',
105    name: 'terrorismCoverage',
106    label: 'Terrorism Coverage',
107    controlType: 'select',
108    tab: 'TABPOL',
109 },
110 {
111    matchcode: 'POLPOLEXT_ExcNbc_BooleanValue',
112    name: 'excludeNBC',
113    label: 'Exclude NBC⟪?⟫ (cut off at bottom edge)


========== IMG_2655.md ==========
---
photo: IMG_2655.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 94-126
orientation: 180
confidence: high
notes: Continuation of IMG_2654 (same file, scrolled further), sharp/clear. Confirms line 113 label is 'Exclude NBC'. Sticky-scroll header shows line 18. Line 126 (name: 'nyxFreeTrade') is cut off at the very bottom edge, partially legible. Explorer tree unchanged, policy-information-fields.ts selected. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution.
---
18 export const PolicyInformationFields: PolicyInformationField[] = [
   ⟪sticky scroll header — actual body continues below⟫
94     tab: 'TABPOL',
95 },
96 {
97     matchcode: 'POLPOLEXT_PgmCdeDes_StringValue',
98     name: 'program',
99     label: 'Program',
100    controlType: 'textbox',
101    tab: 'TABPOL',
102 },
103 {
104    matchcode: 'POLXCP_POLPOL_TERRSK_LMSC',
105    name: 'terrorismCoverage',
106    label: 'Terrorism Coverage',
107    controlType: 'select',
108    tab: 'TABPOL',
109 },
110 {
111    matchcode: 'POLPOLEXT_ExcNbc_BooleanValue',
112    name: 'excludeNBC',
113    label: 'Exclude NBC',
114    controlType: 'checkbox',
115    tab: 'TABPOL',
116 },
117 {
118    matchcode: 'POLPOLEXT_TutOpr_BooleanValue',
119    name: 'tutoringOperations',
120    label: 'Tutoring Operations',
121    controlType: 'checkbox',
122    tab: 'TABPOL',
123 },
124 {
125    matchcode: 'POLPOLEXT_NyxFreTrd_BooleanValue',
126    name: 'nyxFreeTrade',⟪?⟫ (cut off at bottom edge)


========== IMG_2656.md ==========
---
photo: IMG_2656.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 105-136
orientation: 180
confidence: high
notes: Continuation of IMG_2655 (same file, scrolled further), sharp/clear. Confirms lines 125-126 nyxFreeTrade/'NY Free Trade Zone'. Sticky-scroll header shows line 18. Line 136 (tab: 'TABPOL',) is last fully visible line at bottom edge. Explorer tree unchanged, policy-information-fields.ts selected. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution.
---
18 export const PolicyInformationFields: PolicyInformationField[] = [
   ⟪sticky scroll header — actual body continues below⟫
105    name: 'terrorismCoverage',
106    label: 'Terrorism Coverage',
107    controlType: 'select',
108    tab: 'TABPOL',
109 },
110 {
111    matchcode: 'POLPOLEXT_ExcNbc_BooleanValue',
112    name: 'excludeNBC',
113    label: 'Exclude NBC',
114    controlType: 'checkbox',
115    tab: 'TABPOL',
116 },
117 {
118    matchcode: 'POLPOLEXT_TutOpr_BooleanValue',
119    name: 'tutoringOperations',
120    label: 'Tutoring Operations',
121    controlType: 'checkbox',
122    tab: 'TABPOL',
123 },
124 {
125    matchcode: 'POLPOLEXT_NyxFreTrd_BooleanValue',
126    name: 'nyxFreeTrade',
127    label: 'NY Free Trade Zone',
128    controlType: 'checkbox',
129    tab: 'TABPOL',
130 },
131 {
132    matchcode: 'POLPOLEXT_NyxClsTyp_StringValue',
133    name: 'nyftzClassType',
134    label: 'NYFTZ Class Type',
135    controlType: 'select',
136    tab: 'TABPOL',


========== IMG_2657.md ==========
---
photo: IMG_2657.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 115-147
orientation: 180
confidence: high
notes: Continuation of IMG_2656 (same file, scrolled further), sharp/clear. Sticky-scroll header shows line 18. Line 147 (name: 'namedInsuredProfession',) is last visible line at bottom edge, fully legible. Explorer tree unchanged, policy-information-fields.ts selected. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution.
---
18 export const PolicyInformationFields: PolicyInformationField[] = [
   ⟪sticky scroll header — actual body continues below⟫
115    tab: 'TABPOL',
116 },
117 {
118    matchcode: 'POLPOLEXT_TutOpr_BooleanValue',
119    name: 'tutoringOperations',
120    label: 'Tutoring Operations',
121    controlType: 'checkbox',
122    tab: 'TABPOL',
123 },
124 {
125    matchcode: 'POLPOLEXT_NyxFreTrd_BooleanValue',
126    name: 'nyxFreeTrade',
127    label: 'NY Free Trade Zone',
128    controlType: 'checkbox',
129    tab: 'TABPOL',
130 },
131 {
132    matchcode: 'POLPOLEXT_NyxClsTyp_StringValue',
133    name: 'nyftzClassType',
134    label: 'NYFTZ Class Type',
135    controlType: 'select',
136    tab: 'TABPOL',
137 },
138 {
139    matchcode: 'POLPOLEXT_NyxClsCde_StringValue',
140    name: 'nyftzClassCode',
141    label: 'Class Code',
142    controlType: 'textbox',
143    tab: 'TABPOL',
144 },
145 {
146    matchcode: 'POLPOLV3X_LBUSDES',
147    name: 'namedInsuredProfession',


========== IMG_2658.md ==========
---
photo: IMG_2658.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 128-160
orientation: 180
confidence: high
notes: Continuation of IMG_2657 (same file, scrolled further), sharp/clear. Notable: the "namedInsuredProfession" field object (lines 145-153) uses optional highlight/highlightColor/required properties from the interface - highlightColor is '#fff8de' shown with a small color swatch in the editor. Sticky-scroll header shows line 18. Line 160 (tab: 'TABPOL',) is last visible line at bottom edge. Explorer tree unchanged, policy-information-fields.ts selected. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution.
---
18 export const PolicyInformationFields: PolicyInformationField[] = [
   ⟪sticky scroll header — actual body continues below⟫
128    controlType: 'checkbox',
129    tab: 'TABPOL',
130 },
131 {
132    matchcode: 'POLPOLEXT_NyxClsTyp_StringValue',
133    name: 'nyftzClassType',
134    label: 'NYFTZ Class Type',
135    controlType: 'select',
136    tab: 'TABPOL',
137 },
138 {
139    matchcode: 'POLPOLEXT_NyxClsCde_StringValue',
140    name: 'nyftzClassCode',
141    label: 'Class Code',
142    controlType: 'textbox',
143    tab: 'TABPOL',
144 },
145 {
146    matchcode: 'POLPOLV3X_LBUSDES',
147    name: 'namedInsuredProfession',
148    label: "Named Insured's Profession",
149    controlType: 'select',
150    tab: 'TABPOL',
151    highlight: true,
152    highlightColor: '#fff8de',
153    required: true,
154 },
155 {
156    matchcode: 'POLPOL_LBUSTYP',
157    name: 'businessType',
158    label: 'Business Type',
159    controlType: 'select',
160    tab: 'TABPOL',


========== IMG_2659.md ==========
---
photo: IMG_2659.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 144-176
orientation: 180
confidence: high
notes: Continuation of IMG_2658 (same file, scrolled further), sharp/clear. Confirms businessType field (155-163) also uses highlight/highlightColor '#fff8de'/required. A Microsoft Teams notification toast is visible overlapping the bottom-right of the editor ("VDI - AQS Access issue Update", "Shrikant: Sent an image", with a "Send a quick reply" box) - this is an incidental desktop notification, not part of the code; not transcribed as code content, just noted here for context. Sticky-scroll header shows line 18. Line 176 (controlType: 'select',) is cut off at the very bottom edge. Explorer tree unchanged, policy-information-fields.ts selected. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution.
---
18 export const PolicyInformationFields: PolicyInformationField[] = [
   ⟪sticky scroll header — actual body continues below⟫
144 },
145 {
146    matchcode: 'POLPOLV3X_LBUSDES',
147    name: 'namedInsuredProfession',
148    label: "Named Insured's Profession",
149    controlType: 'select',
150    tab: 'TABPOL',
151    highlight: true,
152    highlightColor: '#fff8de',
153    required: true,
154 },
155 {
156    matchcode: 'POLPOL_LBUSTYP',
157    name: 'businessType',
158    label: 'Business Type',
159    controlType: 'select',
160    tab: 'TABPOL',
161    highlight: true,
162    highlightColor: '#fff8de',
163    required: true,
164 },
165 {
166    matchcode: 'POLPOL_LPRISTANAM',
167    name: 'primaryState',
168    label: 'Primary State',
169    controlType: 'select',
170    tab: 'TABPOL',
171 },
172 {
173    matchcode: 'POLPOLEXT_SafCdt_StringValue',
174    name: 'safetyCreditGroup',
175    label: 'Safety Credit Group',
176    controlType: 'select',


========== IMG_2660.md ==========
---
photo: IMG_2660.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 144-176
orientation: 180
confidence: high
notes: Sticky scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Explorer sidebar shows aqs-web-ui/src tree expanded to src>features>policy with children constants (tab-definitions.ts, ultimate-cover-tab-definit...), utils (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts), FieldRenderer.tsx, index.ts, policy-information-fields.ts (selected/highlighted), types.ts, ultimate-cover-fields.ts. Also visible below policy: prp, root, hooks, lib, pages, providers, services, types folders. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution". Line 171 closing brace appears to end an object with no trailing comma issue noted (object at 165-171 has no "highlight/required" props, unlike siblings - may be incomplete/different entry).
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

144         },
145         {
146             matchcode: 'POLPOLV3X_LBUSDES',
147             name: 'namedInsuredProfession',
148             label: "Named Insured's Profession",
149             controlType: 'select',
150             tab: 'TABPOL',
151             highlight: true,
152             highlightColor: '#fff8de',
153             required: true,
154         },
155         {
156             matchcode: 'POLPOL_LBUSTYP',
157             name: 'businessType',
158             label: 'Business Type',
159             controlType: 'select',
160             tab: 'TABPOL',
161             highlight: true,
162             highlightColor: '#fff8de',
163             required: true,
164         },
165         {
166             matchcode: 'POLPOL_LPRISTANAM',
167             name: 'primaryState',
168             label: 'Primary State',
169             controlType: 'select',
170             tab: 'TABPOL',
171         },
172         {
173             matchcode: 'POLPOLEXT_SafCdt_StringValue',
174             name: 'safetyCreditGroup',
175             label: 'Safety Credit Group',
176             controlType: 'select',


========== IMG_2661.md ==========
---
photo: IMG_2661.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 163-194
orientation: 180
confidence: high
notes: Sticky scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Same file/explorer state as IMG_2660 (scrolled down slightly). Top line partially occluded (part of line 162 "highlightColor: '...#fff8de'," cut off, marked ⟪?⟫). Explorer sidebar unchanged from IMG_2660. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution".
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

⟪?⟫ (partial, occluded top line, likely end of "highlightColor: '#fff8de'," at line 162)
163             required: true,
164         },
165         {
166             matchcode: 'POLPOL_LPRISTANAM',
167             name: 'primaryState',
168             label: 'Primary State',
169             controlType: 'select',
170             tab: 'TABPOL',
171         },
172         {
173             matchcode: 'POLPOLEXT_SafCdt_StringValue',
174             name: 'safetyCreditGroup',
175             label: 'Safety Credit Group',
176             controlType: 'select',
177             tab: 'TABPOL',
178             highlight: true,
179             highlightColor: '#fff8de',
180         },
181         {
182             matchcode: 'POLPOLEXT_DocSta_StringValue',
183             name: 'documentPrimaryState',
184             label: 'Document Primary State',
185             controlType: 'select',
186             tab: 'TABPOL',
187         },
188         {
189             matchcode: 'POLPOL_LPOLTYP',
190             name: 'policyType',
191             label: 'Policy Type',
192             controlType: 'select',
193             tab: 'TABPOL',
194             required: true,


========== IMG_2662.md ==========
---
photo: IMG_2662.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 181-207
orientation: 180
confidence: high
notes: Photo has a motion-blur/double-exposure artifact (camera captured mid smooth-scroll) — nearly every line shows two overlapping ghosted copies of text at slightly different scroll offsets, and the line-number gutter is similarly doubled/blurred. Lines 181-194 duplicate IMG_2661's transcript (kept here for completeness since visible in-frame). Lines 195-207 were initially reconstructed from the blurred text and are now CORRECTED using the clean, unblurred IMG_2663 (same file, scrolled slightly further, lines 197-228 fully legible) as ground truth. Explorer sidebar and file/tab state same as IMG_2660/2661. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", 5:16 PM 7/10/2026.
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

181         {
182             matchcode: 'POLPOLEXT_DocSta_StringValue',
183             name: 'documentPrimaryState',
184             label: 'Document Primary State',
185             controlType: 'select',
186             tab: 'TABPOL',
187         },
188         {
189             matchcode: 'POLPOL_LPOLTYP',
190             name: 'policyType',
191             label: 'Policy Type',
192             controlType: 'select',
193             tab: 'TABPOL',
194             required: true,
195         },
196         {
197             matchcode: 'POLPOL_LPMADES',
198             name: 'pmaDescription',
199             label: 'PMA Description',
200             controlType: 'select',
201             tab: 'TABPOL',
202             required: true,
203         },
204
205         // TABPOL Insured / Agency grouped fields (kept on same tab in legacy), map to TABPOL for now
206         {
207             matchcode: 'POLNAM_LINSPRINAM_1',


========== IMG_2663.md ==========
---
photo: IMG_2663.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 197-228
orientation: 180
confidence: high
notes: Sticky scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Explorer sidebar and open tabs unchanged from IMG_2660-2662 (policy-information-fields.ts selected). Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", 5:16 PM 7/10/2026. Line 204 is a blank line inside the array (between the closing brace of the pmaDescription object and the comment). This clean unblurred capture was used to correct the earlier motion-blurred IMG_2662 transcript for the overlapping lines 197-207.
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

197             matchcode: 'POLPOL_LPMADES',
198             name: 'pmaDescription',
199             label: 'PMA Description',
200             controlType: 'select',
201             tab: 'TABPOL',
202             required: true,
203         },
204
205         // TABPOL Insured / Agency grouped fields (kept on same tab in legacy), map to TABPOL for now
206         {
207             matchcode: 'POLNAM_LINSPRINAM_1',
208             name: 'insuredPrimaryName',
209             label: 'Primary Insured',
210             controlType: 'textbox',
211             tab: 'TABPOL',
212             required: true,
213         },
214         {
215             matchcode: 'POLNAM_LINSCTY_1',
216             name: 'insuredCity',
217             label: 'City',
218             controlType: 'textbox',
219             tab: 'TABPOL',
220         },
221         {
222             matchcode: 'POLNAM_LINSSTA_1',
223             name: 'insuredState',
224             label: 'State',
225             controlType: 'select',
226             tab: 'TABPOL',
227         },
228         {


========== IMG_2664.md ==========
---
photo: IMG_2664.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 213-244
orientation: 180
confidence: high
notes: Sticky scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Top line 212 partially cut off (occluded, only fragment "required: true," visible, marked). Explorer sidebar and open tabs unchanged from prior photos in this file (policy-information-fields.ts selected). Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", 5:16 PM 7/10/2026. Comment "// Additional Agency fields observed in ASP" at line 237 marks start of a new section.
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

⟪?⟫ (partial, occluded top line, "required: true," at line 212)
213         },
214         {
215             matchcode: 'POLNAM_LINSCTY_1',
216             name: 'insuredCity',
217             label: 'City',
218             controlType: 'textbox',
219             tab: 'TABPOL',
220         },
221         {
222             matchcode: 'POLNAM_LINSSTA_1',
223             name: 'insuredState',
224             label: 'State',
225             controlType: 'select',
226             tab: 'TABPOL',
227         },
228         {
229             matchcode: 'POLAGT_LAGTNUM_1',
230             name: 'agencyCode',
231             label: 'Agency Code',
232             controlType: 'textbox',
233             tab: 'TABPOL',
234             required: true,
235         },
236
237         // Additional Agency fields observed in ASP
238         {
239             matchcode: 'POLAGT_LPCRNUM_1',
240             name: 'agencySubCode',
241             label: 'Agency Sub Code',
242             controlType: 'textbox',
243             tab: 'TABPOL',
244         },


========== IMG_2665.md ==========
---
photo: IMG_2665.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 228-260
orientation: 180
confidence: high
notes: Sticky scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Overlaps with IMG_2664 (lines 213-244); lines 228-244 repeated here for continuity. Line 260 cut off at bottom (only "matchcode: 'POLAGT_LAGTCTY_1'," visible, continues in next photo). Explorer sidebar and open tabs unchanged. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", 5:16 PM 7/10/2026.
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

228         {
229             matchcode: 'POLAGT_LAGTNUM_1',
230             name: 'agencyCode',
231             label: 'Agency Code',
232             controlType: 'textbox',
233             tab: 'TABPOL',
234             required: true,
235         },
236
237         // Additional Agency fields observed in ASP
238         {
239             matchcode: 'POLAGT_LPCRNUM_1',
240             name: 'agencySubCode',
241             label: 'Agency Sub Code',
242             controlType: 'textbox',
243             tab: 'TABPOL',
244         },
245         {
246             matchcode: 'POLAGT_LAGTPRINAM_1',
247             name: 'agencyName',
248             label: 'Agency Name',
249             controlType: 'textbox',
250             tab: 'TABPOL',
251         },
252         {
253             matchcode: 'POLAGT_LPCRNAM_1',
254             name: 'agencySubName',
255             label: 'Agency Sub Name',
256             controlType: 'textbox',
257             tab: 'TABPOL',
258         },
259         {
260             matchcode: 'POLAGT_LAGTCTY_1',


========== IMG_2666.md ==========
---
photo: IMG_2666.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 247-278
orientation: 180
confidence: medium
notes: Photo has a motion-blur/double-exposure artifact (camera captured mid smooth-scroll) similar to IMG_2662 — most lines show two overlapping ghosted copies at slightly different scroll offsets, gutter numbers doubled/blurred. Lines 247-260 overlap with confirmed content from IMG_2665 (POLAGT_LAGTPRINAM_1/agencyName, POLAGT_LPCRNAM_1/agencySubName, POLAGT_LAGTCTY_1 objects) and are repeated here for continuity. Lines 260-278 reconstructed by counting forward from IMG_2665's confirmed last line (260, "matchcode: 'POLAGT_LAGTCTY_1',") using the object-field pattern (matchcode/name/label/controlType/tab) consistent throughout this file; the reconstructed last line (278, "label: 'Detail Number',") independently matches the highest legible gutter number in the blurred frame, corroborating alignment. New comment "// Placeholder entries for other tabs (will be expanded later)" at line 274 marks a new section (POLDET_ matchcodes, "Detail Number" field). Content below line 278 (likely controlType for detailNumber) is cut off at bottom of frame. Explorer sidebar/open tabs unchanged. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", 5:16 PM 7/10/2026.
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

247             name: 'agencyName',
248             label: 'Agency Name',
249             controlType: 'textbox',
250             tab: 'TABPOL',
251         },
252         {
253             matchcode: 'POLAGT_LPCRNAM_1',
254             name: 'agencySubName',
255             label: 'Agency Sub Name',
256             controlType: 'textbox',
257             tab: 'TABPOL',
258         },
259         {
260             matchcode: 'POLAGT_LAGTCTY_1',
261             name: 'agencyCity',
262             label: 'City/State',
263             controlType: 'textbox',
264             tab: 'TABPOL',
265         },
266         {
267             matchcode: 'POLAGT_LAGTSTA_1',
268             name: 'agencyState',
269             label: 'State',
270             controlType: 'select',
271             tab: 'TABPOL',
272         },
273
274         // Placeholder entries for other tabs (will be expanded later)
275         {
276             matchcode: 'POLDET_LDETNUM',
277             name: 'detailNumber',
278             label: 'Detail Number',
⟪?⟫ (cut off at bottom of frame, likely controlType/tab lines continuing this object)


========== IMG_2667.md ==========
---
photo: IMG_2667.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 265-297
orientation: 180
confidence: high
notes: Sticky scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Mild double-exposure ghosting present throughout (faint duplicate text offset ~1-2 lines behind the sharp/bold layer); zoomed crop used to disambiguate line 265 (sharp "}," with a ghost "controlType: 'textbox',” overlapping behind it — confirmed via crop that 265 is "}," matching the object-boundary pattern and IMG_2666's independent reconstruction). Confirms/extends the reconstruction made for IMG_2666 (lines 274-278 match exactly). New section starts at line 282: "// Policy Detail (TABDET) fields from Pol_PIPHPOL_... ASP" (comment text after "Pol_PIPHPOL_" partially truncated/ellipsized on screen, exact continuation not visible — marked). Note tab value changes to 'TABDET' for the POLDET_LDETNUM, POLPOL_LEXPPOLNUM, and POLPOL_NRLVEFFDAT objects (vs 'TABPOL' used earlier in file). Line 297 opening brace visible at bottom, next object cut off. Explorer sidebar/open tabs unchanged. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", 5:16 PM 7/10/2026.
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

265         },
266         {
267             matchcode: 'POLAGT_LAGTSTA_1',
268             name: 'agencyState',
269             label: 'State',
270             controlType: 'select',
271             tab: 'TABPOL',
272         },
273
274         // Placeholder entries for other tabs (will be expanded later)
275         {
276             matchcode: 'POLDET_LDETNUM',
277             name: 'detailNumber',
278             label: 'Detail Number',
279             controlType: 'textbox',
280             tab: 'TABDET',
281         },
282         // Policy Detail (TABDET) fields from Pol_PIPHPOL_...⟪?⟫ ASP
283         {
284             matchcode: 'POLPOL_LEXPPOLNUM',
285             name: 'prevPolicyNumber',
286             label: 'Prev. Policy Number',
287             controlType: 'textbox',
288             tab: 'TABDET',
289         },
290         {
291             matchcode: 'POLPOL_NRLVEFFDAT',
292             name: 'rateLevelEffDate',
293             label: 'Rate Level Eff. Date',
294             controlType: 'date',
295             tab: 'TABDET',
296         },
297         {


========== IMG_2668.md ==========
---
photo: IMG_2668.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 281-313
orientation: 180
confidence: high
notes: Sticky scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Clean/sharp capture, no ghosting. Overlaps with IMG_2667 (lines 281-297 repeated for continuity, confirms that transcript). Line 313 was partially cut off at bottom in this photo; confirmed as "name: 'termFactorOverride'," using the clearer follow-on photo IMG_2669. Explorer sidebar/open tabs unchanged. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", 5:16 PM 7/10/2026.
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

281         },
282         // Policy Detail (TABDET) fields from Pol_PIPHPOL_... ASP
283         {
284             matchcode: 'POLPOL_LEXPPOLNUM',
285             name: 'prevPolicyNumber',
286             label: 'Prev. Policy Number',
287             controlType: 'textbox',
288             tab: 'TABDET',
289         },
290         {
291             matchcode: 'POLPOL_NRLVEFFDAT',
292             name: 'rateLevelEffDate',
293             label: 'Rate Level Eff. Date',
294             controlType: 'date',
295             tab: 'TABDET',
296         },
297         {
298             matchcode: 'POLPOL_NRLVDAT',
299             name: 'effDateOfRates',
300             label: 'Eff. Date of Rates',
301             controlType: 'date',
302             tab: 'TABDET',
303         },
304         {
305             matchcode: 'POLPOL_NSHRTRMFAC',
306             name: 'termFactor',
307             label: 'Term Factor',
308             controlType: 'textbox',
309             tab: 'TABDET',
310         },
311         {
312             matchcode: 'POLPOL_HSHRTRMFAC',
313             name: 'termFactorOverride',


========== IMG_2669.md ==========
---
photo: IMG_2669.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 294-326
orientation: 180
confidence: high
notes: Sticky scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Mild double-exposure ghosting (faint duplicate text offset behind sharp/bold layer) but gutter numbers and sharp text are legible throughout and match the established per-object pattern (matchcode/name/label/controlType/tab), giving high confidence. Overlaps with IMG_2668 (lines 294-313, confirms/completes that transcript's cut-off line 313 "name: 'termFactorOverride',"). New content: lines 314-326. Line 326 cut off at bottom in this photo; matchcode initially misread as 'POLPOL_LMTNCLC' due to ghosting, corrected to 'POLPOL_LMINCLC' using the clear follow-on photo IMG_2670. Explorer sidebar/open tabs unchanged. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", 5:16 PM 7/10/2026.
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

294             controlType: 'date',
295             tab: 'TABDET',
296         },
297         {
298             matchcode: 'POLPOL_NRLVDAT',
299             name: 'effDateOfRates',
300             label: 'Eff. Date of Rates',
301             controlType: 'date',
302             tab: 'TABDET',
303         },
304         {
305             matchcode: 'POLPOL_NSHRTRMFAC',
306             name: 'termFactor',
307             label: 'Term Factor',
308             controlType: 'textbox',
309             tab: 'TABDET',
310         },
311         {
312             matchcode: 'POLPOL_HSHRTRMFAC',
313             name: 'termFactorOverride',
314             label: 'Term Factor Override',
315             controlType: 'checkbox',
316             tab: 'TABDET',
317         },
318         {
319             matchcode: 'POLPOL_NMINPRM',
320             name: 'policyMinimum',
321             label: 'Policy Minimum',
322             controlType: 'textbox',
323             tab: 'TABDET',
324         },
325         {
326             matchcode: 'POLPOL_LMINCLC',


========== IMG_2670.md ==========
---
photo: IMG_2670.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 310-341
orientation: 180
confidence: high
notes: Sticky scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Clean/sharp capture, no ghosting. Overlaps with IMG_2668/IMG_2669 (lines 310-326 repeated for continuity); this clear capture corrected a misread matchcode from IMG_2669 (confirmed 'POLPOL_LMINCLC' at line 326, not 'LMTNCLC'). Line 341 cut off at bottom (only "name: 'billingNumber'," fully visible, next line "label: 'Billing Number'," partially cut - marked). Explorer sidebar/open tabs unchanged. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", 5:16 PM 7/10/2026.
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

310         },
311         {
312             matchcode: 'POLPOL_HSHRTRMFAC',
313             name: 'termFactorOverride',
314             label: 'Term Factor Override',
315             controlType: 'checkbox',
316             tab: 'TABDET',
317         },
318         {
319             matchcode: 'POLPOL_NMINPRM',
320             name: 'policyMinimum',
321             label: 'Policy Minimum',
322             controlType: 'textbox',
323             tab: 'TABDET',
324         },
325         {
326             matchcode: 'POLPOL_LMINCLC',
327             name: 'recalcBalMeetMP',
328             label: 'Recalc Bal/Meet MP',
329             controlType: 'checkbox',
330             tab: 'TABDET',
331         },
332         {
333             matchcode: 'POLPOL_NTCTDAT',
334             name: 'processingDate',
335             label: 'Processing Date',
336             controlType: 'date',
337             tab: 'TABDET',
338         },
339         {
340             matchcode: 'POLBIL_LBILNUM',
341             name: 'billingNumber',
⟪?⟫ (label: 'Billing Number', partially cut off at bottom of frame)


========== IMG_2671.md ==========
---
photo: IMG_2671.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 326-357
orientation: 180
confidence: medium
notes: Sticky scroll header shows line 18 "export const PolicyInformationFields: PolicyInformationField[] = [". Photo has mild-to-moderate double-exposure ghosting (faint duplicate text offset ~1 line behind the sharp/bold layer, gutter numbers similarly doubled), same artifact type as IMG_2662/2666/2669. Lines 326-341 overlap with confirmed content from IMG_2670 and are repeated here for continuity (cross-check: matches). Lines 342-357 are new, reconstructed from the sharp/bold text layer following the file's established per-object pattern (matchcode/name/label/controlType/tab); not independently cross-verified against a second clean photo, so marked medium confidence. Last line (357, controlType: 'textbox' for agentNumber) is at the very bottom of frame. Explorer sidebar/open tabs unchanged. Status bar: branch hitanshu/experimental*, "2 errors 0 warnings", "No Solution", 5:16 PM 7/10/2026.
---
Sticky scroll (line 18):
18  export const PolicyInformationFields: PolicyInformationField[] = [

326             matchcode: 'POLPOL_LMINCLC',
327             name: 'recalcBalMeetMP',
328             label: 'Recalc Bal/Meet MP',
329             controlType: 'checkbox',
330             tab: 'TABDET',
331         },
332         {
333             matchcode: 'POLPOL_NTCTDAT',
334             name: 'processingDate',
335             label: 'Processing Date',
336             controlType: 'date',
337             tab: 'TABDET',
338         },
339         {
340             matchcode: 'POLBIL_LBILNUM',
341             name: 'billingNumber',
342             label: 'Billing Number',
343             controlType: 'textbox',
344             tab: 'TABBIL',
345         },
346         {
347             matchcode: 'POLINS_LINSNUM',
348             name: 'insuredNumber',
349             label: 'Insured Number',
350             controlType: 'textbox',
351             tab: 'TABINS',
352         },
353         {
354             matchcode: 'POLAGT_LAGTNUM',
355             name: 'agentNumber',
356             label: 'Agent Number',
357             controlType: 'textbox',


========== IMG_2672.md ==========
---
photo: IMG_2672.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/policy-information-fields.ts
lines: 336-364
orientation: 180
confidence: high
notes: Sticky scroll header at top shows line 18 `export const PolicyInformationFields: PolicyInformationField[] = {`. Explorer sidebar shows aqs-web-ui/src tree: features > policy > constants (tab-definitions.ts, ultimate-cover-tab-definit...), utils (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts), FieldRenderer.tsx, index.ts, policy-information-fields.ts (open/selected), types.ts, ultimate-cover-fields.ts; also top-level folders prp, root, hooks, lib, pages, providers, services, types. Status bar: hitanshu/experimental branch, 2 errors 0 warnings, No Solution. Comment block after array closes at line 360 explains rendering should use matchcode as primary key for merging dynamic JSON.
---
18: export const PolicyInformationFields: PolicyInformationField[] = {
336:                 controlType: 'date',
337:                 tab: 'TABDET',
338:             },
339:             {
340:                 matchcode: 'POLBIL_LBILNUM',
341:                 name: 'billingNumber',
342:                 label: 'Billing Number',
343:                 controlType: 'textbox',
344:                 tab: 'TABBIL',
345:             },
346:             {
347:                 matchcode: 'POLINS_LINSNUM',
348:                 name: 'insuredNumber',
349:                 label: 'Insured Number',
350:                 controlType: 'textbox',
351:                 tab: 'TABINS',
352:             },
353:             {
354:                 matchcode: 'POLAGT_LAGTNUM',
355:                 name: 'agentNumber',
356:                 label: 'Agent Number',
357:                 controlType: 'textbox',
358:                 tab: 'TABAGT',
359:             },
360:         ];
361:
362: // Rendering should always use `matchcode` as primary key. When dynamic JSON arrives,
363: // normalize it to the PolicyInformationField shape and merge by matchcode.
364:
