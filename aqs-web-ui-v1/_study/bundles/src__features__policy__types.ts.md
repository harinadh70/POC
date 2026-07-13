# BUNDLE for src/features/policy/types.ts
# 7 photo fragment(s), ascending start-line order.


========== IMG_2673.md ==========
---
photo: IMG_2673.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/types.ts
lines: 1-34
orientation: 180
confidence: high
notes: Explorer sidebar shows aqs-web-ui/src tree under features > policy: constants (tab-definitions.ts, ultimate-cover-tab-definit...), utils (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts), FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts (open/selected, highlighted blue), ultimate-cover-fields.ts; top-level folders prp, root, hooks, lib, pages, providers, services, types. Status bar: hitanshu/experimental branch, 2 errors 0 warnings, No Solution. Line 34 cut off at bottom edge of screen, only partially legible: `'@default'?: string;` (inferred from partial glyphs, marked low confidence for that line only).
---
1: // Ultimate Cover page types and interfaces
2:
3: export interface SessionData {
4:     CompLoc: string;
5:     UserId: string;
6:     PolicyId: string;
7:     NodeKey: string;
8:     Action: string;
9:     DiagnosticMode: string;
10:     SessionXml: string;
11: }
12:
13: export interface ListItem {
14:     '@value': string;
15:     '#text': string;
16: }
17:
18: export interface ControlCallData {
19:     '@type': string;
20:     call: Call | Call[];
21: }
22:
23: export interface Call {
24:     '@project': string;
25:     '@class': string;
26:     '@subroutine': string;
27:     '@componenttype'?: string;
28: }
29:
30: export interface Control {
31:     '@matchcode': string;
32:     '@controltype'?: string;
33:     '@text'?: string;
34:     '@default'?: string; ⟪?⟫


========== IMG_2674.md ==========
---
photo: IMG_2674.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/types.ts
lines: 3-36
orientation: 180
confidence: high
notes: Same file/tab as IMG_2673 (types.ts), scrolled down slightly (sticky header shows line 3 `export interface SessionData {`, line 4 hidden behind sticky header). Explorer sidebar identical to IMG_2673. Status bar: hitanshu/experimental branch, 2 errors 0 warnings, No Solution. This photo confirms line 34 content from IMG_2673 (`'@default'?: string;`) which was previously marked uncertain.
---
3: export interface SessionData {
5:     UserId: string;
6:     PolicyId: string;
7:     NodeKey: string;
8:     Action: string;
9:     DiagnosticMode: string;
10:     SessionXml: string;
11: }
12:
13: export interface ListItem {
14:     '@value': string;
15:     '#text': string;
16: }
17:
18: export interface ControlCallData {
19:     '@type': string;
20:     call: Call | Call[];
21: }
22:
23: export interface Call {
24:     '@project': string;
25:     '@class': string;
26:     '@subroutine': string;
27:     '@componenttype'?: string;
28: }
29:
30: export interface Control {
31:     '@matchcode': string;
32:     '@controltype'?: string;
33:     '@text'?: string;
34:     '@default'?: string;
35:     '@required'?: string;
36:     '@disabled': string;


========== IMG_2675.md ==========
---
photo: IMG_2675.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/types.ts
lines: 23-54
orientation: 180
confidence: medium
notes: Same file/tab as IMG_2673/2674 (types.ts), further scrolled. PHOTO HAS HEAVY MOTION-BLUR / DOUBLE-EXPOSURE GHOSTING (looks like editor was scrolling ~2-3 lines during shutter, producing two overlapping smeared copies of the text offset vertically). Transcription below reconstructed from the sharper/bolder of the two overlapping layers, cross-checked against IMG_2674 (line 36 '@disabled': string matches exactly, anchoring the alignment). Line 38 field name is blurred/ambiguous - looks like "utporder" or "outporder", marked uncertain. Content past line 54 (closing braces of PageData, and a possible further "treenode"/"node" field visible as ghost text) was not confidently resolvable due to blur and is omitted rather than guessed. Explorer sidebar same as prior types.ts photos. Status bar: hitanshu/experimental branch, 2 errors 0 warnings, No Solution.
---
23: export interface Call {
26:     '@subroutine': string;
27:     '@componenttype'?: string;
28: }
29:
30: export interface Control {
31:     '@matchcode': string;
32:     '@controltype'?: string;
33:     '@text'?: string;
34:     '@default'?: string;
35:     '@required'?: string;
36:     '@disabled': string;
37:     '@visible'?: string;
38:     '@⟪utporder?⟫'?: string;
39:     '@limittolist'?: string;
40:     '@showzero'?: string;
41:     '@rule'?: string;
42:     [key: string]: any;
43:     listitems?: {
44:         item: ListItem[];
45:     }
46:     calls?: ControlCallData | ControlCallData[];
47: }
48:
49: export interface PageData {
50:     '@BOPPOLRLV': string;
51:     '@matchcode': string;
52:     '@elapsedtime': string;
53:     controls: {
54:         control: Control[];


========== IMG_2676.md ==========
---
photo: IMG_2676.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/types.ts
lines: 42-73
orientation: 180
confidence: high
notes: Same file/tab as IMG_2673/2674/2675 (types.ts), scrolled further down. Sticky scroll header at top shows line 30 `export interface Control {`. Photo has mild double-exposure/motion-blur ghosting (fainter duplicate text offset ~2 lines) but the sharp foreground layer was cross-verified via multiple zoomed crops and is fully legible; also resolves ambiguous tail content from IMG_2675 (treenode/node fields). Explorer sidebar same tree as prior types.ts photos, policy folder expanded, features/src expanded higher up. Status bar: hitanshu/experimental branch, 2 errors 0 warnings, No Solution.
---
30: export interface Control {
42:     [key: string]: any;
43:     listitems?: {
44:         item: ListItem[];
45:     };
46:     calls?: ControlCallData | ControlCallData[];
47: }
48:
49: export interface PageData {
50:     '@BOPPOLRLV': string;
51:     '@matchcode': string;
52:     '@elapsedtime': string;
53:     controls: {
54:         control: Control[];
55:     };
56:     treenode?: {
57:         node: {
58:             '@text': string;
59:             '@image': string;
60:             '@nodekey': string;
61:             '@parentkey': string;
62:         };
63:     };
64:     calls?: {
65:         '@type': string;
66:         call: Call;
67:     };
68: }
69:
70: export interface UltimateCoverPageResponse {
71:     Session: SessionData;
72:     Page: PageData;
73:     ListData: any;


========== IMG_2677.md ==========
---
photo: IMG_2677.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/types.ts
lines: 49-86
orientation: 180
confidence: high
notes: Same file/tab as prior types.ts photos, scrolled further. Sticky scroll header at top shows line 49 `export interface PageData {`. Sharp, clear image (no motion blur). Confirms lines 55-68 matching IMG_2676, and reveals new interface `UltimateCoverFormData` starting line 76 with a "// Policy Tab" comment and a long list of optional string fields with inline comments describing deductible types (Coinsurance, Building/Pers Prop/Transit/Flood/Earthquake/EQ Percentage/Wind-Hail/Water Damage Deductible). Explorer sidebar same tree, types.ts selected/highlighted blue. Status bar: hitanshu/experimental branch, 2 errors 0 warnings, No Solution.
---
49: export interface PageData {
55:     };
56:     treenode?: {
57:         node: {
58:             '@text': string;
59:             '@image': string;
60:             '@nodekey': string;
61:             '@parentkey': string;
62:         };
63:     };
64:     calls?: {
65:         '@type': string;
66:         call: Call;
67:     };
68: }
69:
70: export interface UltimateCoverPageResponse {
71:     Session: SessionData;
72:     Page: PageData;
73:     ListData: any;
74: }
75:
76: export interface UltimateCoverFormData {
77:     // Policy Tab
78:     BOPPOLEXT_Coi_StringValue?: string; // Coinsurance
79:     BOPPOL_LDED2?: string; // Building Deductible
80:     BOPPOL_LDED1?: string; // Pers Prop Deductible
81:     BOPPOLEXT_Idd_StringValue?: string; // Transit Deductible
82:     BOPPOLEXT_Fdd_StringValue?: string; // Flood Deductible
83:     BOPPOLEXT_Eqd_StringValue?: string; // Earthquake Deductible
84:     BOPPOLEXT_EqdPer_StringValue?: string; // EQ Percentage Deductible
85:     BOPPOLEXT_Wsh_StringValue?: string; // Wind/Hail Deductible
86:     BOPPOLEXT_WatDam_StringValue?: string; // Water Damage Deductible


========== IMG_2678.md ==========
---
photo: IMG_2678.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/types.ts
lines: 49-97
orientation: 180
confidence: high
notes: Same file/tab as prior types.ts photos (IMG_2673-2677), scrolled further down. Sticky scroll headers at top show line 49 `export interface PageData {` and line 64 `calls?: {`. Sharp, clear image, no motion blur. Confirms and extends IMG_2677's UltimateCoverFormData interface content through line 97. Explorer sidebar same tree, types.ts selected/highlighted blue. Status bar: hitanshu/experimental branch, 2 errors 0 warnings, No Solution. Underline squiggles visible under several field names (e.g. SdsDed, Sp1Ded, PbdDed, AllBldRofSrf) suggesting lint/spellcheck warnings, not errors.
---
49: export interface PageData {
64:     calls?: {
66:         call: Call;
67:     };
68: }
69:
70: export interface UltimateCoverPageResponse {
71:     Session: SessionData;
72:     Page: PageData;
73:     ListData: any;
74: }
75:
76: export interface UltimateCoverFormData {
77:     // Policy Tab
78:     BOPPOLEXT_Coi_StringValue?: string; // Coinsurance
79:     BOPPOL_LDED2?: string; // Building Deductible
80:     BOPPOL_LDED1?: string; // Pers Prop Deductible
81:     BOPPOLEXT_Idd_StringValue?: string; // Transit Deductible
82:     BOPPOLEXT_Fdd_StringValue?: string; // Flood Deductible
83:     BOPPOLEXT_Eqd_StringValue?: string; // Earthquake Deductible
84:     BOPPOLEXT_EqdPer_StringValue?: string; // EQ Percentage Deductible
85:     BOPPOLEXT_Wsh_StringValue?: string; // Wind/Hail Deductible
86:     BOPPOLEXT_WatDam_StringValue?: string; // Water Damage Deductible
87:     BOPPOLEXT_Loc_DoubleValue?: string; // # of Locations
88:     BOPPOLEXT_Csp_StringValue?: string; // CSP Code
89:     BOPPOL_LPRISTANAM?: string; // Primary State
90:     BOPPOLEXT_AgdVal_BooleanValue?: boolean; // Agreed Value
91:     BOPPOL_BMRFMRCEXC?: boolean; // Microfracture Exclusion
92:     BOPPOL_NIRM7?: string; // Expense Mod
93:     BOPPOLEXT_SdsDed_StringValue?: string; // Sewer/Drain/Sump Ded
94:     BOPPOLEXT_Sp1Ded_StringValue?: string; // Sprinkler Leakage Ded
95:     BOPPOLEXT_PbdDed_BooleanValue?: boolean; // Per Building Ded
96:     BOPPOLEXT_AllBldRofSrf_BooleanValue?: boolean; // All Bldgs Roof Surfacing
97:     BOPPOLEXT_TERRSK_StringValue?: string; // Terrorism Coverage


========== IMG_2679.md ==========
---
photo: IMG_2679.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/types.ts
lines: 75-104
orientation: 180
confidence: medium
notes: Same file/tab as prior types.ts photos, scrolled slightly further than IMG_2678. Sticky scroll headers show `export interface UltimateCoverPageResponse {` and (behind it, ghosted) `export interface UltimateCoverFormData {`. Lines 75-97 (UltimateCoverFormData body, Policy Tab fields) are a heavy double-exposure/motion-blur duplicate of content already transcribed cleanly in IMG_2677 and IMG_2678 - not re-transcribed here since illegible as a fresh source and would just repeat prior data. Lines 98-104 are sharp/unblurred and are NEW content (start of a "// Details Tab" section) not seen in earlier photos - transcribed verbatim below. Explorer sidebar same tree, types.ts selected. Status bar: hitanshu/experimental branch, 2 errors 0 warnings (gutter shows a yellow warning triangle near line 105), No Solution.
---
98:
99:     // Details Tab
100:     BOPPOL_LEXPPOLNUM?: string; // Prev. Policy Number
101:     BOPPOL_NRLVEFFDAT?: string; // Rate Level Eff. Date
102:     BOPPOL_LRLVTCT?: string; // Rate Level (NEW/RENEWAL)
103:     BOPPOL_NRLVDAT?: string; // Eff. Date of Rates
104:     BOPPOL_NMINPRM?: string; // Minimum Premium
