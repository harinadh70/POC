# BUNDLE for src/features/policy/components/PolicyInformation.tsx
# 93 photo fragment(s), ascending start-line order.


========== IMG_2440.md ==========
---
photo: IMG_2440.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 1-34
orientation: 180
confidence: high
notes: Sharp/clean photo, new file opened (tab switched from LobActionMenu.tsx to PolicyInformation.tsx, tab shows "PolicyInformation.tsx 9+, M" = 9 unsaved changes + modified/git-dirty). Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... File starts at line 1 (top of file, no sticky-scroll header needed). Line 34 is at the very bottom edge, confirmed via zoomed crop: "import { computePageBuildButtonOverrides } from '@/utils/button-state-manager';". Explorer sidebar now shows: AQS_WORKSPACE > aqs-web-ui > src > features > dashboard\utils (loader.ts, middleware.ts), form\utils (dynamic-form-loader.ts), legacy > components > utils (loader-optimized.ts[U], loader.ts[U], middleware-optimize...ts[U], middleware.ts[U]), policy > components (LobActionMenu.tsx, PolicyInformation.tsx[highlighted, 9+ M], ultimate-cover.tsx), constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts. Status bar: aqs-web-ui, hitanshu/experimental* (dirty), 91 errors / 0 warnings (up from 45 in the LobActionMenu.tsx photos — different file's diagnostics), No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 5:10 PM 7/10/2026 (about 21 minutes after the LobActionMenu.tsx photos — new segment of the recording session).
---
1     // PolicyInformation tabbed field rendering
2     // Uses static mapping from policy-information-fields.ts and FormRenderer for all tabs
3     // Rendering is matchcode-driven for future dynamic JSON integration
4     import { getItem as getPolicyID } from '@utils/session-storage';
5     import React, { useEffect, useMemo, useCallback } from 'react';
6     import { useLoaderData, useNavigation } from 'react-router';
7     // loader-driven: no direct PageNavigation calls here
8     import Tabs from '@/components/tabView/TabView';
9     import TabPanel from '@/components/tabView/TabPanel';
10    import { POLICY_TABS, DEFAULT_ACTIVE_TAB } from '@features/policy/constants/tab-definitions';
11    import { PolicyInformationFields, type PolicyInformationField } from '../policy-information-fields';
12    import type { BrowserCommand, CommitEventType, FormValues, NormalizedField } from '@/types';
13    import { FormRenderer } from '@/components/form-renderer';
14    import { FieldRenderer } from '@/components/field-renderer';
15    import { Button as ActionButton } from '@/components/button';
16    import { getItem } from '@/utils/local-storage';
17    import { extractCallsByTypeFromPageBuild } from '@/utils/build-xml-server-call-payload';
18    import type { PageBuildResponse } from '@/services/page-build';
19    import { resolveLegacyPrePostPlan } from '@/utils/build-eedata-array';
20    // loader-driven data is provided by the route loader
21    import { useFormMethods, useFormStore } from '@/providers/form-provider';
22    import type { SessionInfo } from '@features/auth/services/auth';
23    import { pubSub } from '@/utils/pub-sub';
24    import { Divider, LinearProgress, Typography } from '@mui/material';
25    import { useBrowserCommands } from '@/hooks/use-browser-commands';
26    import {
27        useFormCommit,
28        type CommitPlanContext,
29        type CommitPlanResult,
30        type ResponseCommandAdapterContext,
31    } from '@/hooks/use-form-commit';
32    // Validation utilities for button state management
33    import { checkRequiredFields } from '@/utils/required-field-validation';
34    import { computePageBuildButtonOverrides } from '@/utils/button-state-manager';


========== IMG_2441.md ==========
---
photo: IMG_2441.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 14-47
orientation: 180
confidence: high
notes: Sharp/clean photo, scrolled slightly down from IMG_2440 (which showed 1-34); overlapping lines 14-34 confirm IMG_2440's transcription exactly. New content is lines 35-47. Line 47 is cut off at the very bottom edge by the status bar in both orientations of the photo (physically clipped, not a legibility issue) — only "initialValuesByTab?: Record<string, Record<string, string" is visible before truncation, marked with ⟪?⟫ for the remainder. Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Tab: "PolicyInformation.tsx 9+, M". Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > features > dashboard\utils, form\utils, legacy > components > utils, policy > components (LobActionMenu.tsx, PolicyInformation.tsx highlighted 9+ M, ultimate-cover.tsx), constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts. Status bar: aqs-web-ui, hitanshu/experimental* (dirty), 91 errors / 0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 5:10 PM 7/10/2026.
---
14    import { FieldRenderer } from '@/components/field-renderer';
15    import { Button as ActionButton } from '@/components/button';
16    import { getItem } from '@/utils/local-storage';
17    import { extractCallsByTypeFromPageBuild } from '@/utils/build-xml-server-call-payload';
18    import type { PageBuildResponse } from '@/services/page-build';
19    import { resolveLegacyPrePostPlan } from '@/utils/build-eedata-array';
20    // loader-driven data is provided by the route loader
21    import { useFormMethods, useFormStore } from '@/providers/form-provider';
22    import type { SessionInfo } from '@features/auth/services/auth';
23    import { pubSub } from '@/utils/pub-sub';
24    import { Divider, LinearProgress, Typography } from '@mui/material';
25    import { useBrowserCommands } from '@/hooks/use-browser-commands';
26    import {
27        useFormCommit,
28        type CommitPlanContext,
29        type CommitPlanResult,
30        type ResponseCommandAdapterContext,
31    } from '@/hooks/use-form-commit';
32    // Validation utilities for button state management
33    import { checkRequiredFields } from '@/utils/required-field-validation';
34    import { computePageBuildButtonOverrides } from '@/utils/button-state-manager';
35    import { CommonDataGrid } from '@/components/data-grid/data-grid';
36    import { getGridConfig } from '@/components/data-grid/data-grid-config-registry';
37    //import type { GenericRow } from '@components/data-grid/data-grid-normalize';
38
39    interface PolicyInformationLoaderData {
40        pageBuild?: unknown;
41        xmlFileName?: string;
42        xmlFilePath?: string;
43        tabFilePath?: string;
44        xmlListFilePath?: string;
45        normalizedByTab?: Record<string, NormalizedField[]>;
46        controlsByTab?: Record<string, Array<{ matchcode: string; text: string }>>;
47        initialValuesByTab?: Record<string, Record<string, string ⟪?⟫ (line cut off at bottom edge of frame by status bar, rest not visible)


========== IMG_2442.md ==========
---
photo: IMG_2442.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 30-63
orientation: 180
confidence: high
notes: Sharp/clean photo, scrolled slightly down from IMG_2441 (which showed 14-47). Overlapping lines 30-47 confirm IMG_2441's transcription exactly (and fill in the previously cut-off tail of line 47: "string | boolean | number | null>>;"). New content is lines 48-63. Line 63 confirmed via zoom crop as "fieldsByTab[field.tab].push(field);"; nothing past line 63 is visible. Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Tab: "PolicyInformation.tsx 9+, M". Explorer sidebar unchanged from IMG_2440/2441. Status bar: aqs-web-ui, hitanshu/experimental* (dirty), 91 errors / 0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 5:10 PM 7/10/2026.
---
30        type ResponseCommandAdapterContext,
31    } from '@/hooks/use-form-commit';
32    // Validation utilities for button state management
33    import { checkRequiredFields } from '@/utils/required-field-validation';
34    import { computePageBuildButtonOverrides } from '@/utils/button-state-manager';
35    import { CommonDataGrid } from '@/components/data-grid/data-grid';
36    import { getGridConfig } from '@/components/data-grid/data-grid-config-registry';
37    //import type { GenericRow } from '@components/data-grid/data-grid-normalize';
38
39    interface PolicyInformationLoaderData {
40        pageBuild?: unknown;
41        xmlFileName?: string;
42        xmlFilePath?: string;
43        tabFilePath?: string;
44        xmlListFilePath?: string;
45        normalizedByTab?: Record<string, NormalizedField[]>;
46        controlsByTab?: Record<string, Array<{ matchcode: string; text: string }>>;
47        initialValuesByTab?: Record<string, Record<string, string | boolean | number | null>>;
48        tabsOrder?: string[];
49        formKey?: string;
50        browserCommands?: BrowserCommand[];
51        pageButtons?: Array<{
52            matchcode: string;
53            text: string;
54            disabled?: boolean;
55            visible?: boolean;
56        }>;
57    }
58
59    // Group fields by tab (static mapping)
60    const fieldsByTab: Record<string, PolicyInformationField[]> = {};
61    for (const field of PolicyInformationFields) {
62        if (!fieldsByTab[field.tab]) fieldsByTab[field.tab] = [];
63        fieldsByTab[field.tab].push(field);


========== IMG_2443.md ==========
---
photo: IMG_2443.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 47-78 (sticky 39)
orientation: 180
confidence: high
notes: Sharp/clean photo, scrolled slightly down from IMG_2442 (which showed 30-63). Sticky-scroll header shows line 39 ("interface PolicyInformationLoaderData {"). Overlapping lines 47-63 confirm IMG_2442's transcription exactly. New content is lines 64-78; line 78 ("(acc, tab) => {") is the last visible line, cut off at the bottom of the frame — line 79 onward not visible. Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Tab: "PolicyInformation.tsx 9+, M". Explorer sidebar unchanged from IMG_2440-2442. Status bar: aqs-web-ui, hitanshu/experimental* (dirty), 91 errors / 0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 5:10 PM 7/10/2026.
---
39    interface PolicyInformationLoaderData {
47        initialValuesByTab?: Record<string, Record<string, string | boolean | number | null>>;
48        tabsOrder?: string[];
49        formKey?: string;
50        browserCommands?: BrowserCommand[];
51        pageButtons?: Array<{
52            matchcode: string;
53            text: string;
54            disabled?: boolean;
55            visible?: boolean;
56        }>;
57    }
58
59    // Group fields by tab (static mapping)
60    const fieldsByTab: Record<string, PolicyInformationField[]> = {};
61    for (const field of PolicyInformationFields) {
62        if (!fieldsByTab[field.tab]) fieldsByTab[field.tab] = [];
63        fieldsByTab[field.tab].push(field);
64    }
65
66    // Debug: Log which fields have required flag set
67    console.log('[PolicyInformation] DEBUG - Original PolicyInformationFields with required:', {
68        total: PolicyInformationFields.length,
69        requiredFields: PolicyInformationFields.filter((f) => f.required).map((f) => ({
70            matchcode: f.matchcode,
71            label: f.label,
72            required: f.required,
73        })),
74    });
75
76    // Normalize static PolicyInformationField -> NormalizedField for FormRenderer
77    const normalizedStaticByTab: Record<string, NormalizedField[]> = Object.keys(fieldsByTab).reduce(
78        (acc, tab) => {


========== IMG_2444.md ==========
---
photo: IMG_2444.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 59-91
orientation: 180
confidence: high
notes: Editor tab "PolicyInformation.tsx 9+, M" (unsaved, modified). Breadcrumb aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... . Explorer sidebar shows AQS_WORKSPACE tree: aqs-web-ui > src > features > dashboard\utils (loader.ts, middleware.ts), form\utils (dynamic-form-loader.ts), legacy > components, utils (loader-optimized.ts U, loader.ts U, middleware-optimize...ts U, middleware.ts U), policy > components (LobActionMenu.tsx, PolicyInformatio...tsx [selected, 9+,M], ultimate-cover.tsx), constants>, utils>, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts. Status bar: aqs-web-ui, branch hitanshu/experimental*, 91 errors / 0 warnings icon area shows "⊗91 ⚠0", "No Solution" red badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp 5:10 PM 7/10/2026. Line 91 is the last fully visible code line before the Windows taskbar/search bar overlaps the bottom of the editor; a further line (~92) is visible but mostly obscured by the taskbar and not legible.
---
```tsx
59  // Group fields by tab (static mapping)
60  const fieldsByTab: Record<string, PolicyInformationField[]> = {};
61  for (const field of PolicyInformationFields) {
62      if (!fieldsByTab[field.tab]) fieldsByTab[field.tab] = [];
63      fieldsByTab[field.tab].push(field);
64  }
65
66  // Debug: Log which fields have required flag set
67  console.log('[PolicyInformation] DEBUG - Original PolicyInformationFields with required:', {
68      total: PolicyInformationFields.length,
69      requiredFields: PolicyInformationFields.filter((f) => f.required).map((f) => ({
70          matchcode: f.matchcode,
71          label: f.label,
72          required: f.required,
73      })),
74  });
75
76  // Normalize static PolicyInformationField -> NormalizedField for FormRenderer
77  const normalizedStaticByTab: Record<string, NormalizedField[]> = Object.keys(fieldsByTab).reduce(
78      (acc, tab) => {
79          acc[tab] = (fieldsByTab[tab] || []).map(
80              (f) =>
81                  ({
82                      matchcode: f.matchcode,
83                      label: f.label,
84                      controlType: (f.controlType as any) ?? 'textbox',
85                      showInfoIcon:
86                          f.matchcode === 'POLPOL_NRLVDAT' ||
87                          f.matchcode === 'POLPOLEXT_Cnv_BooleanValue' ||
88                          f.matchcode === 'POLPOLEXT_NyxClsTyp_StringValue',
89                      infoAriaLabel:
90                          f.matchcode === 'POLPOL_NRLVDAT'
91                              ? 'Show Eff. Date of Rates information'
```


========== IMG_2445.md ==========
---
photo: IMG_2445.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 75-107
orientation: 180
confidence: high
notes: Editor tab "PolicyInformation.tsx 9+, M" (unsaved, modified). Breadcrumb aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... . Same Explorer tree as IMG_2444 (AQS_WORKSPACE > aqs-web-ui > src > features > dashboard\utils, form\utils, legacy>components/utils, policy>components with LobActionMenu.tsx, PolicyInformatio...tsx [selected], ultimate-cover.tsx, constants>, utils>, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts). Status bar: aqs-web-ui, branch hitanshu/experimental*, ⊗91 errors ⚠0 warnings, "No Solution" red badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp 5:10 PM 7/10/2026. Continues directly from IMG_2444 (same edit session, scrolled down slightly; lines 75-91 overlap with more of the ternary chain now visible below). Line numbering verified carefully via multiple high-zoom crops of the gutter (photo has slight rotational skew that made naive line-to-number mapping error-prone) — confirmed there are NO blank lines between the infoAriaLabel ternary (ending line 96) and the infoMatchcode block (starting line 97), nor between that block (ending 102) and options (103). Line 107 "disabled: false," is the last visible line before the status bar, consistent with IMG_2444's separately-confirmed numbering.
---
```tsx
75
76  // Normalize static PolicyInformationField -> NormalizedField for FormRenderer
77  const normalizedStaticByTab: Record<string, NormalizedField[]> = Object.keys(fieldsByTab).reduce(
78      (acc, tab) => {
79          acc[tab] = (fieldsByTab[tab] || []).map(
80              (f) =>
81                  ({
82                      matchcode: f.matchcode,
83                      label: f.label,
84                      controlType: (f.controlType as any) ?? 'textbox',
85                      showInfoIcon:
86                          f.matchcode === 'POLPOL_NRLVDAT' ||
87                          f.matchcode === 'POLPOLEXT_Cnv_BooleanValue' ||
88                          f.matchcode === 'POLPOLEXT_NyxClsTyp_StringValue',
89                      infoAriaLabel:
90                          f.matchcode === 'POLPOL_NRLVDAT'
91                              ? 'Show Eff. Date of Rates information'
92                              : f.matchcode === 'POLPOLEXT_Cnv_BooleanValue'
93                                  ? 'Show Convenience information'
94                                  : f.matchcode === 'POLPOLEXT_NyxClsTyp_StringValue'
95                                      ? 'Show NYFTZ information'
96                                      : undefined,
97                      infoMatchcode:
98                          f.matchcode === 'POLPOLEXT_Cnv_BooleanValue'
99                              ? 'POLPOLEXT_Cnv_BooleanValue_INFO'
100                             : f.matchcode === 'POLPOLEXT_NyxClsTyp_StringValue'
101                                 ? 'POLPOLEXT_Nyx_BooleanValue_INFO'
102                                 : undefined,
103                     options: f.options
104                         ? f.options.map((o) => ({ label: o.label, value: o.value }))
105                         : [],
106                     defaultValue: f.controlType === 'checkbox' ? false : '',
107                     disabled: false,
```


========== IMG_2446.md ==========
---
photo: IMG_2446.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 77-123 (sticky-scroll headers 77,78,80,89 + body 95-123; line 94 obscured by sticky-scroll overlay)
orientation: 180
confidence: high
notes: Editor tab "PolicyInformation.tsx 9+, M" (unsaved, modified). Breadcrumb aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... . Same file/session as IMG_2444/2445, scrolled further down. VS Code sticky-scroll shows enclosing-scope headers pinned at top: line 77 "const normalizedStaticByTab: Record<string, NormalizedField[]> = Object.keys(fieldsByTab).reduce(", line 78 "(acc, tab) => {", line 80 "(f) =>", line 89 "infoAriaLabel:". Directly below the sticky panel the real line-94 text ("...f.matchcode === 'POLPOLEXT_NyxClsTyp_StringValue'") is visibly overlapped/garbled by the sticky overlay rendering artifact — not reliably legible here (already captured cleanly in IMG_2445 as line 94). Body content resumes cleanly at line 95. Explorer sidebar same tree as IMG_2444/2445 (PolicyInformatio...tsx selected, 9+,M). Status bar: aqs-web-ui, branch hitanshu/experimental*, ⊗91 ⚠0, "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:10 PM 7/10/2026. Line numbers 95-123 verified via multiple overlapping high-zoom crops of the gutter (camera has slight rotational skew); confirmed no blank lines between 96/97, 102/103; one blank line at 119 (after the reduce() call's closing ");" and before the "// Debug" comment).
---
```tsx
[sticky scroll headers]
77  const normalizedStaticByTab: Record<string, NormalizedField[]> = Object.keys(fieldsByTab).reduce(
78      (acc, tab) => {
80              (f) =>
89                  infoAriaLabel:
[line 94 obscured by sticky overlay, see IMG_2445]

[body, resumes clean]
95                          ? 'Show NYFTZ information'
96                              : undefined,
97                      infoMatchcode:
98                          f.matchcode === 'POLPOLEXT_Cnv_BooleanValue'
99                              ? 'POLPOLEXT_Cnv_BooleanValue_INFO'
100                             : f.matchcode === 'POLPOLEXT_NyxClsTyp_StringValue'
101                                 ? 'POLPOLEXT_Nyx_BooleanValue_INFO'
102                                 : undefined,
103                     options: f.options
104                         ? f.options.map((o) => ({ label: o.label, value: o.value }))
105                         : [],
106                     defaultValue: f.controlType === 'checkbox' ? false : '',
107                     disabled: false,
108                     visible: true,
109                     required: f.required ?? false,
110                     highlight: f.highlight,
111                     highlightColor: f.highlightColor,
112                     highlightBorderColor: f.highlightBorderColor,
113                 }) as NormalizedField,
114             );
115             return acc;
116         },
117         {} as Record<string, NormalizedField[]>,
118     );
119
120     // Debug: Log normalized fields with required flag
121     console.log('[PolicyInformation] DEBUG - Normalized fields with required:', {
122         tabsWithFields: Object.keys(normalizedStaticByTab),
123         requiredFieldsByTab: Object.entries(normalizedStaticByTab).reduce(
```


========== IMG_2447.md ==========
---
photo: IMG_2447.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 77-139 (sticky headers 77,78,80 + body 109-139)
orientation: 180
confidence: high
notes: Editor tab "PolicyInformation.tsx 9+, M". Breadcrumb aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... . Sticky-scroll pinned headers at top: line 77 "const normalizedStaticByTab: Record<string, NormalizedField[]> = Object.keys(fieldsByTab).reduce(", line 78 "(acc, tab) => {", line 80 "(f) =>". Immediately below the sticky panel, a partially-garbled overlapped row (real line 109, "required: f.required ?? false,") is visible cut/overlaid by the sticky headers — legible here since it's mostly clear text, confirms IMG_2446's line 109. Body then continues cleanly through line 139. This confirms and matches the line numbering established in IMG_2446/IMG_2445 exactly (109=required, 110=highlight, 111=highlightColor, 112=highlightBorderColor, 113=}) as NormalizedField,). Explorer sidebar same tree as prior photos. Status bar: aqs-web-ui, branch hitanshu/experimental*, ⊗91 ⚠0, "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:10 PM 7/10/2026.
---
```tsx
[sticky scroll headers]
77  const normalizedStaticByTab: Record<string, NormalizedField[]> = Object.keys(fieldsByTab).reduce(
78      (acc, tab) => {
80              (f) =>

[body]
109                     required: f.required ?? false,
110                     highlight: f.highlight,
111                     highlightColor: f.highlightColor,
112                     highlightBorderColor: f.highlightBorderColor,
113                 }) as NormalizedField,
114             );
115             return acc;
116         },
117         {} as Record<string, NormalizedField[]>,
118     );
119
120     // Debug: Log normalized fields with required flag
121     console.log('[PolicyInformation] DEBUG - Normalized fields with required:', {
122         tabsWithFields: Object.keys(normalizedStaticByTab),
123         requiredFieldsByTab: Object.entries(normalizedStaticByTab).reduce(
124             (acc, [tab, fields]) => {
125                 const required = fields.filter((f) => f.required);
126                 if (required.length > 0) {
127                     acc[tab] = required.map((f) => ({
128                         matchcode: f.matchcode,
129                         label: f.label,
130                         required: f.required,
131                     }));
132                 }
133                 return acc;
134             },
135             {} as Record<string, any>,
136         ),
137     });
138
139     // Helper: return normalized fields for a tab, falling back to patterns found in TABPOL
```


========== IMG_2448.md ==========
---
photo: IMG_2448.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 122-155
orientation: 180
confidence: high
notes: Editor tab "PolicyInformation.tsx 9+, M". Breadcrumb aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... . No sticky-scroll header this time (plain scroll). Lines 122-137 duplicate the tail of IMG_2447 (same requiredFieldsByTab reduce block) confirming numbering continuity. Line 154 "const insuredGridConfig = getGridConfig('INSURED_DETAILS');" is shown with selected/highlighted text (reverse-video styling) and line 155 is only a sliver at the very bottom edge, mostly obscured by the status bar — not reliably legible beyond the start of "const insuredGridConfig...". Explorer sidebar unchanged (PolicyInformatio...tsx selected, 9+,M). Status bar: aqs-web-ui, branch hitanshu/experimental*, ⊗91 ⚠0, "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM 7/10/2026 (note: minute ticked to 5:11 PM, one minute after IMG_2444-2447's 5:10 PM).
---
```tsx
122     tabsWithFields: Object.keys(normalizedStaticByTab),
123     requiredFieldsByTab: Object.entries(normalizedStaticByTab).reduce(
124         (acc, [tab, fields]) => {
125             const required = fields.filter((f) => f.required);
126             if (required.length > 0) {
127                 acc[tab] = required.map((f) => ({
128                     matchcode: f.matchcode,
129                     label: f.label,
130                     required: f.required,
131                 }));
132             }
133             return acc;
134         },
135         {} as Record<string, any>,
136     ),
137 });
138
139 // Helper: return normalized fields for a tab, falling back to patterns found in TABPOL
140 // Note: static normalized mapping available in `normalizedStaticByTab`
141
142 const PolicyInformation: React.FC = () => {
143     const loaderData = useLoaderData() as PolicyInformationLoaderData;
144     const navigation = useNavigation();
145     const [activeTab, setActiveTab] = React.useState<string>(DEFAULT_ACTIVE_TAB);
146     const formMethods = useFormMethods();
147     const [fieldMetadata] = useFormStore((store) => store.fieldMetadata);
148     const { executeCommands, isExecuting } = useBrowserCommands(loaderData?.browserCommands ?? []);
149     // Track FormRenderer field value changes
150     const [rendererFormValues, setRendererFormValues] = React.useState<Record<string, unknown>>({});
151
152     // Loader-provided data (normalized fields, controls, defaults, browserCommands)
153     // loaderData shape: { pageBuildRaw, normalizedByTab, controlsByTab, initialValuesByTab, tabsOrder, form ⟪?⟫
154     // Grid config for Insured Details tab
155     const insuredGridConfig = getGridConfig('INSURED_DETAILS');
```


========== IMG_2450.md ==========
---
photo: IMG_2450.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142 (sticky) + 152-184
orientation: 180
confidence: high
notes: Editor tab "PolicyInformation.tsx 9+, M". Breadcrumb aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... . Sticky-scroll pinned header at top: line 142 "const PolicyInformation: React.FC = () => {". Body then jumps straight to line 152 (skips 143-151, already captured in IMG_2448/2449). This photo is sharp/clean (no motion blur) and definitively confirms: line 156 is a COMMENTED-OUT declaration "//const [selectedInsuredRow, setSelectedInsuredRow] = React.useState<GenericRow | null>(null);" (corrects the guess made in IMG_2449 under heavy ghosting), and confirms lines 157-169 exactly as reconstructed in IMG_2449. New content: lines 170-183 (a useMemo computing policyCommitSessionInfo / normalizedAction from sessionStorage-like getItem('sessionInformation')). Line 182 "return sessionInfo.action;" is shown with a grey/selected highlight band. Line 184 is only a sliver at the very bottom edge, obscured by the status bar — not legible. Explorer sidebar unchanged (PolicyInformatio...tsx selected, 9+,M). Status bar: aqs-web-ui, branch hitanshu/experimental*, ⊗91 ⚠0, "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM 7/10/2026.
---
```tsx
[sticky scroll header]
142 const PolicyInformation: React.FC = () => {

[body]
152     // Loader-provided data (normalized fields, controls, defaults, browserCommands)
153     // loaderData shape: { pageBuildRaw, normalizedByTab, controlsByTab, initialValuesByTab, tabsOrder, form ⟪?⟫
154     // Grid config for Insured Details tab
155     const insuredGridConfig = getGridConfig('INSURED_DETAILS');
156     //const [selectedInsuredRow, setSelectedInsuredRow] = React.useState<GenericRow | null>(null);
157     // Subscribe to global tab:selected event for programmatic tab switching
158     useEffect(() => {
159         const unsubscribe = pubSub.subscribe('tab:selected', (data) => {
160             setActiveTab(data.tabMatchcode);
161         });
162         return () => unsubscribe();
163     }, []);
164
165     // Handle form value changes from FormRenderer
166     const handleFormValuesChange = useCallback((values: FormValues) => {
167         console.log('[PolicyInformation] FormRenderer values changed:', values);
168         setRendererFormValues(values);
169     }, []);
170
171     const policyCommitSessionInfo = useMemo(() => {
172         const sessionInfo = (getItem('sessionInformation') as SessionInfo) || ({} as SessionInfo);
173         const normalizedAction = (() => {
174             const rawAction = String(sessionInfo.action || '')
175                 .trim()
176                 .toUpperCase();
177
178             // Legacy policy commit flow expects ADD as base action; RATELEVEL is a navigation action.
179             if (!rawAction || rawAction === 'RATELEVEL') {
180                 return 'ADD';
181             }
182
183             return sessionInfo.action;
184         })(); ⟪?⟫
```


========== IMG_2451.md ==========
---
photo: IMG_2451.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142 (sticky) + 170-202
orientation: 180
confidence: high
notes: Editor tab "PolicyInformation.tsx 9+, M". Breadcrumb aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... . Sticky-scroll pinned header: line 142 "const PolicyInformation: React.FC = () => {". Photo is sharp (no ghosting) and confirms IMG_2450's lines 170-184 exactly. New content 185-202. Lines 200-202 are near the bottom edge, partly touching the status bar; transcribed as best-effort (line 199's trailing "||" operator and line 200's trailing comma may be clipped at the right/bottom edge — marked ⟪?⟫ where uncertain). Explorer sidebar unchanged. Status bar: aqs-web-ui, branch hitanshu/experimental*, ⊗91 ⚠0, "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM 7/10/2026.
---
```tsx
[sticky scroll header]
142 const PolicyInformation: React.FC = () => {

[body]
170     const policyCommitSessionInfo = useMemo(() => {
171         const sessionInfo = (getItem('sessionInformation') as SessionInfo) || ({} as SessionInfo);
172         const normalizedAction = (() => {
173             const rawAction = String(sessionInfo.action || '')
174                 .trim()
175                 .toUpperCase();
176
177             // Legacy policy commit flow expects ADD as base action; RATELEVEL is a navigation action.
178             if (!rawAction || rawAction === 'RATELEVEL') {
179                 return 'ADD';
180             }
181
182             return sessionInfo.action;
183         })();
184
185         return {
186             ...sessionInfo,
187             action: normalizedAction,
188         } as SessionInfo;
189     }, [loaderData?.pageBuild]);
190
191     const navContext = getItem<Record<string, unknown>>('aqs:navigation:context', {});
192     const resolvedXmlFileName = useMemo(() => {
193         return (
194             (typeof navContext?.xmlFileName === 'string' && navContext.xmlFileName.trim()) ||
195             (typeof loaderData?.xmlFileName === 'string' && loaderData.xmlFileName.trim()) ||
196             (typeof loaderData?.xmlFilePath === 'string' && loaderData.xmlFilePath.trim()) ||
197             (typeof (policyCommitSessionInfo as Record<string, unknown>)?.xmlFileName ===
198                 'string' &&
199                 String((policyCommitSessionInfo as Record<string, unknown>).xmlFileName).trim()) ⟪?⟫
200             ''
201         );
202     };
```


========== IMG_2452.md ==========
---
photo: IMG_2452.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142,171 (sticky) + 187-218 (approximate; see notes)
orientation: 180
confidence: low
notes: SIGNIFICANT MOTION-BLUR / DOUBLE-EXPOSURE GHOSTING throughout this photo, same artifact as IMG_2449 — two slightly different scroll positions of the same unchanging code appear superimposed with interleaved/doubled gutter numbers and overlapping text. Sticky-scroll shows lines 142 "const PolicyInformation: React.FC = () => {" and 171 "const policyCommitSessionInfo = useMemo(() => {" (both legible). Lines 187-202 duplicate content already captured cleanly in IMG_2451 (confirms alignment). New content beyond what IMG_2451 showed is the adaptResponseCommands useCallback (lines ~204-218), reconstructed below by disentangling the two overlaid text layers into one coherent sequence — trust is MEDIUM for the escapeXml chain (204-212, clearly legible in isolation) and LOWER for exact line numbers of hasLoadCombo (214-218) since that region is heavily doubled. The closing brace(s) beyond line 218 are cut off at the bottom edge / not legible. Explorer sidebar unchanged (PolicyInformatio...tsx selected). Status bar: aqs-web-ui, branch hitanshu/experimental*, ⊗91 ⚠0, "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM 7/10/2026.
---
```tsx
[sticky scroll headers]
142 const PolicyInformation: React.FC = () => {
171     const policyCommitSessionInfo = useMemo(() => {

[body — 187-202 duplicate IMG_2451, omitted here; new content below]
204     const adaptResponseCommands = useCallback(
205         ({ commands, response }: ResponseCommandAdapterContext): BrowserCommand[] => {
206             const escapeXml = (input: string): string =>
207                 input
208                     .replace(/&/g, '&amp;')
209                     .replace(/</g, '&lt;')
210                     .replace(/>/g, '&gt;')
211                     .replace(/"/g, '&quot;')
212                     .replace(/'/g, '&apos;');
213
214             const hasLoadCombo = commands.some((command) => {
215                 const verb = command.verb.toUpperCase();
216                 return verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS';
217             });
218             if (!hasLoadCombo) return commands; ⟪confirmed via IMG_2453⟫
```


========== IMG_2453.md ==========
---
photo: IMG_2453.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142,204 (sticky) + 205-236
orientation: 180
confidence: high
notes: Editor tab "PolicyInformation.tsx 9+, M". Breadcrumb aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... . Sharp photo, no ghosting — cleanly confirms IMG_2452's reconstructed lines 204-217 and resolves its uncertain line 218 as "if (!hasLoadCombo) return commands;". Sticky-scroll shows line 142 "const PolicyInformation: React.FC = () => {" and a second pinned row "const adaptResponseCommands = useCallback(" (line 204, gutter number not visible on this row but content matches IMG_2452's line 204 exactly). New content: lines 219-236, building a comboXml string from response.results.aqs.ListItems.value. Line 236 is at the very bottom edge, cut by the status bar — only "comboXml = `<items>${xmlItems}</items>`;" is legible, continuation not visible. Explorer sidebar unchanged. Status bar: aqs-web-ui, branch hitanshu/experimental*, ⊗91 ⚠0, "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM 7/10/2026.
---
```tsx
[sticky scroll headers]
142 const PolicyInformation: React.FC = () => {
204     const adaptResponseCommands = useCallback(

[body]
205         ({ commands, response }: ResponseCommandAdapterContext): BrowserCommand[] => {
206             const escapeXml = (input: string): string =>
207                 input
208                     .replace(/&/g, '&amp;')
209                     .replace(/</g, '&lt;')
210                     .replace(/>/g, '&gt;')
211                     .replace(/"/g, '&quot;')
212                     .replace(/'/g, '&apos;');
213
214             const hasLoadCombo = commands.some((command) => {
215                 const verb = command.verb.toUpperCase();
216                 return verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS';
217             });
218             if (!hasLoadCombo) return commands;
219
220             const listItems = response?.results?.aqs?.ListItems?.value;
221             if (!listItems) return commands;
222
223             let comboXml = '';
224             if (Array.isArray(listItems)) {
225                 const items = listItems
226                     .map((item) => String(item || '').trim())
227                     .filter((item) => item.length > 0);
228                 if (items.length > 0) {
229                     const xmlItems = items
230                         .map((item) => {
231                             const escaped = escapeXml(item);
232                             return `<item value="${escaped}" text="${escaped}" />`;
233                         })
234                         .join('');
235                     comboXml = `<items>${xmlItems}</items>`;
236                 ⟪?⟫
```


========== IMG_2454.md ==========
---
photo: IMG_2454.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142,205 (sticky) + 229-254 (approximate; see notes)
orientation: 180
confidence: medium
notes: Motion-blur/double-exposure ghosting throughout the body (same artifact as IMG_2449/2452), though less severe than those two — text is doubled/overlapping but a coherent single sequence could be reconstructed by disentangling, and it was cross-checked against several tight, less-blurred crops. Sticky-scroll shows line 142 "const PolicyInformation: React.FC = () => {", line 205 "const adaptResponseCommands = useCallback(" and "({ commands, response }: ResponseCommandAdapterContext): BrowserCommand[] => {", and a third sticky row reading roughly "if (Array.isArray(listItems)) {" whose line number is illegible under the ghosting (logically this is line 224, per IMG_2453's clean reading — sticky number likely misread as "206" due to blur, not trusted). Lines 229-236 duplicate IMG_2453 exactly (confirms alignment). New content 237-254: the `else if (typeof listItems === 'string')` branch, the final `commands.map` that injects `comboXml` into matching LOAD_COMBO/LOAD_COMBOS commands. Line 254 onward (closing the useCallback, dependency array) is right at the bottom edge / status bar and not reliably legible — marked ⟪?⟫. Explorer sidebar unchanged. Status bar: aqs-web-ui, branch hitanshu/experimental*, ⊗91 ⚠0, "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM 7/10/2026.
---
```tsx
[sticky scroll headers]
142 const PolicyInformation: React.FC = () => {
205     const adaptResponseCommands = useCallback(
        ({ commands, response }: ResponseCommandAdapterContext): BrowserCommand[] => {
224            if (Array.isArray(listItems)) {   ⟪line number uncertain, content per IMG_2453⟫

[body — 229-236 duplicate IMG_2453, omitted; new content below]
237             } else if (typeof listItems === 'string') {
238                 comboXml = listItems.trim();
239             }
240
241             if (!comboXml) return commands;
242
243             return commands.map((command) => {
244                 const verb = command.verb.toUpperCase();
245                 if ((verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS') && !command.addinf?.trim()) {
246                     return {
247                         ...command,
248                         addinf: comboXml,
249                     };
250                 }
251                 return command;
252             });
253         },
254         ⟪?⟫
```


========== IMG_2455.md ==========
---
photo: IMG_2455.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142,205,206 (sticky) + 244-273
orientation: 180
confidence: high
notes: Editor tab "PolicyInformation.tsx 9+, M". Breadcrumb aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... . Sticky-scroll shows line 142 "const PolicyInformation: React.FC = () => {", then two more pinned rows read as "205 const adaptResponseCommands = useCallback(" and "206 ({ commands, response }: ResponseCommandAdapterContext): BrowserCommand[] => {". NOTE: these two sticky line numbers conflict by one with the internally-consistent count anchored to IMG_2453 (which has no blank-line ambiguity and reconciles exactly with this photo's clearly-numbered body line 244 "const verb = command.verb.toUpperCase();" — the same anchor appears, doubly confirmed, in IMG_2453/2454 too). Given the body numbering (244 onward) is doubly-confirmed and internally consistent back through IMG_2453, the sticky-row numbers 205/206 here are noted as observed but likely a sticky-panel rendering/skew artifact rather than authoritative — the body's own gutter numbers (244+) are what's transcribed and trusted. Lines 244-263 are sharp/clean; lines 264-273 have mild double-exposure ghosting near the bottom (text partially doubled, e.g. "processIndicator", "payloadFormData", "includeCallMode", "sessionXmlAsString" each appear to repeat) — transcribed as best-effort single coherent sequence; line 273 and beyond not legible (cut by status bar). Explorer sidebar unchanged. Status bar: aqs-web-ui, branch hitanshu/experimental*, ⊗91 ⚠0, "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM 7/10/2026.
---
```tsx
[sticky scroll headers]
142 const PolicyInformation: React.FC = () => {
205     const adaptResponseCommands = useCallback(
206         ({ commands, response }: ResponseCommandAdapterContext): BrowserCommand[] => {

[body]
244             const verb = command.verb.toUpperCase();
245             if ((verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS') && !command.addinf?.trim()) {
246                 return {
247                     ...command,
248                     addinf: comboXml,
249                 };
250             }
251             return command;
252         });
253     },
254     [],
255 );
256
257     const resolveCommitPlan = useCallback(
258         (context: CommitPlanContext): CommitPlanResult | null => {
259             const { matchcode, baseFormData, pageBuildData } = context;
260
261             // Special handling for OK button: call CheckRlvChanges_PolPol for validation
262             if (matchcode.toUpperCase() === 'OK') {
263                 return {
264                     calls: [{ project: 'pZStart', class: 'cZStart', subroutine: 'CheckRlvChanges_PolPol' }],
265                     callType: 'post',
266                     processIndicator: '1',
267                     payloadFormData: baseFormData,
268                     includeCallMode: false,
269                     sessionXmlAsString: true,
270                 };
271             }
272
273         ⟪?⟫ (ghosted/illegible beyond this point)
```


========== IMG_2480.md ==========
---
photo: IMG_2480.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-578 (sticky headers) / 526-578 (visible body)
orientation: 180
confidence: low
notes: |
  Photo shows heavy motion-blur / double-exposure ghosting across most of the
  code pane (looks like the editor was mid-scroll-animation when the shutter
  fired — content appears blended between two scroll positions offset by
  roughly 5 lines, worst in the 528-557 band). Sticky-scroll header shows two
  pinned lines: "142 const PolicyInformation: React.FC = () => {" and
  "526 const getDefaultButtonOrder = (matchcode: string): number => {" — both
  sharp/legible. Lines 558-578 are comparatively clean and were cross-checked
  against multiple crops for consistency. Lines ~528-556 are best-effort only;
  exact line-to-text mapping in that band is unreliable due to the ghosting
  and is marked accordingly.
  Editor state: tab "PolicyInformation.tsx 9+, M" (unsaved, 9+ changes),
  breadcrumb aqs-web-ui > src > features > policy > components >
  PolicyInformation.tsx. Status bar: "No Solution", 91 problems / 0 warnings
  shown in bottom-left icons, Ln 1 Col 1, TypeScript JSX, branch
  hitanshu/experimental (dirty, workspace AQS_workspace).
  Explorer sidebar visible: aqs-web-ui/src/features/{dashboard/utils
  (loader.ts, middleware.ts), form/utils (dynamic-form-loader.ts), legacy
  (components, utils: loader-optimized.ts[U], loader.ts[U],
  middleware-optimize...ts[U], middleware.ts[U]), policy/components
  (LobActionMenu.tsx, PolicyInformation.tsx [selected, 9+ M], ultimate-cover.tsx),
  constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts,
  types.ts}. Other tabs: only PolicyInformation.tsx open per visible tab bar.
  Timestamp on client machine 5:11 PM 7/10/2026.
---

Sticky scroll (pinned, legible):
142   const PolicyInformation: React.FC = () => {
526     const getDefaultButtonOrder = (matchcode: string): number => {

Best-effort, LOW CONFIDENCE (ghosted/double-exposed band, ~lines 527-557):
527       const DEFAULT_BUTTON_ORDER: Record<string, number> = {
⟪?⟫         ⟪?⟫: 100,
⟪?⟫         PATHUPDATE: 100,
⟪?⟫       };
⟪?⟫       const validatedPageButtons = useMemo(() => {
⟪?⟫         try {
⟪?⟫           const upper = matchcode.toUpperCase();
⟪?⟫           return DEFAULT_BUTTON_ORDER[upper] ?? 50;
⟪?⟫         ...
⟪?⟫       const normalizedPageButtons = (loaderData?.pageButtons || []).map((btn) => ({
⟪?⟫         ...btn,
⟪?⟫         disabled: Boolean(btn.disabled),
⟪?⟫         visible: btn.visible ?? true,
⟪?⟫       }));

Clean / higher confidence (lines 558-578):
558       // Validate only fields that remain renderable after static presence filtering/merging.
559       const allFields = Object.values(normalizedStaticByTab).flatMap((tabFields) =>
560         mergeFieldsWithPageBuild((tabFields || []) as NormalizedField[]).filter(
561           (field) => field.visible !== false,
562         ),
563       );
564
565       console.log('[PolicyInformation] DEBUG - Raw allFields structure:', {
566         totalFields: allFields.length,
567         sampleFields: allFields.slice(0, 3).map((f) => ({
568           matchcode: f.matchcode,
569           required: f.required,
570           label: f.label,
571         })),
572         requiredFieldsCount: allFields.filter((f) => f.required).length,
573         allRequiredFields: allFields
574           .filter((f) => f.required)
575           .map((f) => ({
576             matchcode: f.matchcode,
577             label: f.label,
578           })),


========== IMG_2481.md ==========
---
photo: IMG_2481.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142, 550-586
orientation: 180
confidence: high
notes: |
  Sticky scroll shows two pinned lines: "142 const PolicyInformation: React.FC
  = () => {" and "550 const validatedPageButtons = useMemo(() => {". A faint
  ghost line is visible directly under the 550 sticky row reading roughly
  "const normalizedPageButtons = (loaderData?.pageButtons || []).map((btn) =>
  ({" — likely the actual line 551 bleeding through the sticky overlay
  (consistent with companion photo IMG_2480 which shows this same
  normalizedPageButtons map/useMemo region more heavily blurred). Rest of the
  pane (556-586) is sharp and unambiguous. Editor tab "PolicyInformation.tsx
  9+, M" (unsaved). Breadcrumb: aqs-web-ui > src > features > policy >
  components > PolicyInformation.tsx. Status bar: No Solution, 91 problems / 0
  warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, branch
  hitanshu/experimental (dirty), workspace AQS_workspace. Explorer sidebar
  same tree as IMG_2480 (dashboard/utils, form/utils, legacy, policy/components
  with LobActionMenu.tsx, PolicyInformation.tsx [selected], ultimate-cover.tsx,
  constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts,
  types.ts). Timestamp 5:11 PM 7/10/2026.
---

142   const PolicyInformation: React.FC = () => {
550     const validatedPageButtons = useMemo(() => {
    ⟪sticky-ghost, uncertain⟫ const normalizedPageButtons = (loaderData?.pageButtons || []).map((btn) => ({
556     }));
557
558     // Validate only fields that remain renderable after static presence filtering/merging.
559     const allFields = Object.values(normalizedStaticByTab).flatMap((tabFields) =>
560       mergeFieldsWithPageBuild((tabFields || []) as NormalizedField[]).filter(
561         (field) => field.visible !== false,
562       ),
563     );
564
565     console.log('[PolicyInformation] DEBUG - Raw allFields structure:', {
566       totalFields: allFields.length,
567       sampleFields: allFields.slice(0, 3).map((f) => ({
568         matchcode: f.matchcode,
569         required: f.required,
570         label: f.label,
571       })),
572       requiredFieldsCount: allFields.filter((f) => f.required).length,
573       allRequiredFields: allFields
574         .filter((f) => f.required)
575         .map((f) => ({
576           matchcode: f.matchcode,
577           label: f.label,
578         })),
579     });
580
581     console.log(
582       '[PolicyInformation] DEBUG - Current merged form values:',
583       mergedFormValues,
584     );
585
586     // Check which required fields are missing values


========== IMG_2482.md ==========
---
photo: IMG_2482.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142, 550, 567, 570-599
orientation: 180
confidence: high
notes: |
  Sticky scroll shows three pinned lines: "142 const PolicyInformation:
  React.FC = () => {", "550 const validatedPageButtons = useMemo(() => {",
  "567 sampleFields: allFields.slice(0, 3).map((f) => ({". Below that, real
  editor content runs 570-599 continuously, gutter numbers confirmed clean via
  zoom crop. A faint low-contrast ghost duplicate of lines ~573-596 is visible
  underneath the sharp text (same content repeated, offset ~1 line, classic
  minor motion-blur artifact) but does not obscure the primary bold text,
  which was used for this transcription. Editor tab "PolicyInformation.tsx
  9+, M" (unsaved). Breadcrumb: aqs-web-ui > src > features > policy >
  components > PolicyInformation.tsx. Status bar: No Solution, 91 problems / 0
  warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, branch
  hitanshu/experimental (dirty), workspace AQS_workspace. Explorer sidebar
  same tree as IMG_2480/2481. Timestamp 5:11 PM 7/10/2026.
---

142   const PolicyInformation: React.FC = () => {
550     const validatedPageButtons = useMemo(() => {
567       sampleFields: allFields.slice(0, 3).map((f) => ({

570         label: f.label,
571       })),
572       requiredFieldsCount: allFields.filter((f) => f.required).length,
573       allRequiredFields: allFields
574         .filter((f) => f.required)
575         .map((f) => ({
576           matchcode: f.matchcode,
577           label: f.label,
578         })),
579     });
580
581     console.log(
582       '[PolicyInformation] DEBUG - Current merged form values:',
583       mergedFormValues,
584     );
585
586     // Check which required fields are missing values
587     const validation = checkRequiredFields(allFields, mergedFormValues, {});
588
589     console.log('[PolicyInformation] DEBUG - Validation result:', {
590       allRequiredFilled: validation.allRequiredFilled,
591       missingFieldsCount: validation.missingFields.length,
592       missingFields: validation.missingFields.map((f) => ({
593         matchcode: f.matchcode,
594         label: f.label,
595       })),
596     });
597
598     // Compute button overrides based on validation
599     const overrides = computePageBuildButtonOverrides(


========== IMG_2483.md ==========
---
photo: IMG_2483.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142, 550, 585-613
orientation: 180
confidence: medium-high
notes: |
  Sticky scroll pinned: "142 const PolicyInformation: React.FC = () => {",
  "550 const validatedPageButtons = useMemo(() => {". Lines 585-596 are sharp
  and match IMG_2481/IMG_2482 exactly (cross-validated). From ~598 onward the
  frame shows the same motion-blur double-exposure seen in IMG_2480 (content
  appears blended with a copy of itself offset by a couple of lines, e.g.
  "const overrides = computePageBuildButtonOverrides(" appears legibly at two
  slightly different row positions). Content/token text in that band is
  legible; line numbers for 598-605 were cross-checked against companion
  photo IMG_2484 (which shows this same block sharply, with the same sticky
  headers 142/550, confirming 598-605 exactly) and corrected here to match.
  Numbers 606-613 are extrapolated forward from that confirmed anchor
  (medium-high confidence, not pixel-verified individually). Editor tab
  "PolicyInformation.tsx 9+, M" (unsaved). Breadcrumb: aqs-web-ui > src >
  features > policy > components > PolicyInformation.tsx. Status bar: No
  Solution, 91 problems / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript JSX, branch hitanshu/experimental (dirty), workspace
  AQS_workspace. Explorer sidebar same tree as prior photos in this file
  (PolicyInformation.tsx selected under features/policy/components).
  Timestamp 5:11 PM 7/10/2026.
---

142   const PolicyInformation: React.FC = () => {
550     const validatedPageButtons = useMemo(() => {

585
586     // Check which required fields are missing values
587     const validation = checkRequiredFields(allFields, mergedFormValues, {});
588
589     console.log('[PolicyInformation] DEBUG - Validation result:', {
590       allRequiredFilled: validation.allRequiredFilled,
591       missingFieldsCount: validation.missingFields.length,
592       missingFields: validation.missingFields.map((f) => ({
593         matchcode: f.matchcode,
594         label: f.label,
595       })),
596     });

597
598     // Compute button overrides based on validation
599     const overrides = computePageBuildButtonOverrides(
600       normalizedPageButtons,
601       validation.allRequiredFilled,
602     );
603
604     console.log('[PolicyInformation] DEBUG - Button overrides generated:', {
605       overrides: Object.entries(overrides).map(([key, val]) => ({ button: key, ...val })),
606     });
607
608     // Apply overrides to buttons
609     let buttonsWithOverrides = normalizedPageButtons.map((btn) => {
610       // Try to get override by uppercase matchcode (overrides are keyed by uppercase)
611       const matchcodeUpper = btn.matchcode?.toUpperCase?.() || '';
612       const override = overrides[matchcodeUpper];
613       if (override) {


========== IMG_2484.md ==========
---
photo: IMG_2484.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142, 550, 598-628
orientation: 180
confidence: high
notes: |
  Sticky scroll pinned: "142 const PolicyInformation: React.FC = () => {",
  "550 const validatedPageButtons = useMemo(() => {". Lines 598-605 are sharp
  and confirm/anchor the line numbering used to correct companion photo
  IMG_2483's same block. From ~609 onward the frame shows the same
  motion-blur double-exposure pattern as IMG_2480/2483 (faint duplicate of
  the text a few lines up bleeding into each row) but the primary/bold text
  is legible throughout and was used for this transcription; numbers are
  high confidence since the whole 598-628 run is internally consistent and
  cross-validated against companion photo IMG_2485, which sharply shows
  lines 610-632 of this same block (sticky "610 let buttonsWithOverrides =
  normalizedPageButtons.map((btn) => {") with no ghosting and confirms this
  numbering exactly, including that line 614 is blank. Editor tab "PolicyInformation.tsx
  9+, M" (unsaved). Breadcrumb: aqs-web-ui > src > features > policy >
  components > PolicyInformation.tsx. Status bar: No Solution, 91 problems /
  0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, branch
  hitanshu/experimental (dirty), workspace AQS_workspace. Explorer sidebar
  same tree as prior photos (PolicyInformation.tsx selected under
  features/policy/components; loader-optimized.ts, loader.ts,
  middleware-optimize...ts, middleware.ts under legacy/utils all marked U).
  Timestamp 5:11 PM 7/10/2026.
---

142   const PolicyInformation: React.FC = () => {
550     const validatedPageButtons = useMemo(() => {

598     // Compute button overrides based on validation
599     const overrides = computePageBuildButtonOverrides(
600       normalizedPageButtons,
601       validation.allRequiredFilled,
602     );
603
604     console.log('[PolicyInformation] DEBUG - Button overrides generated:', {
605       overrides: Object.entries(overrides).map(([key, val]) => ({ button: key, ...val })),
606     });
607
608
609     // Apply overrides to buttons
610     let buttonsWithOverrides = normalizedPageButtons.map((btn) => {
611       // Try to get override by uppercase matchcode (overrides are keyed by uppercase)
612       const matchcodeUpper = btn.matchcode?.toUpperCase?.() || '';
613       const override = overrides[matchcodeUpper];
614
615       if (override) {
616         const result = {
617           ...btn,
618           disabled: override.disabled,
619           visible: override.visible,
620         };
621         console.log(`[PolicyInformation] DEBUG - Button ${btn.matchcode}:`, {
622           original: { disabled: btn.disabled, visible: btn.visible },
623           override: override,
624           final: { disabled: result.disabled, visible: result.visible },
625         });
626         return result;
627       }
628       console.log(


========== IMG_2485.md ==========
---
photo: IMG_2485.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142, 550, 610, 612-642
orientation: 180
confidence: high
notes: |
  Sharp, unblurred photo (no motion-blur ghosting, unlike several neighboring
  photos in this sequence). Sticky scroll pinned: "142 const
  PolicyInformation: React.FC = () => {", "550 const validatedPageButtons =
  useMemo(() => {", "610 let buttonsWithOverrides =
  normalizedPageButtons.map((btn) => {". Real content resumes at 612 (line
  611, the "// Try to get override..." comment, is hidden behind the sticky
  widget in this frame — confirmed present via companion photo IMG_2484).
  This photo was used to cross-validate and correct line numbers in
  IMG_2484's transcript. Line 634 comment uses Unicode right-arrow "→"
  characters (rendered verbatim below). Editor tab "PolicyInformation.tsx
  9+, M" (unsaved). Breadcrumb: aqs-web-ui > src > features > policy >
  components > PolicyInformation.tsx. Status bar: No Solution, 91 problems /
  0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, branch
  hitanshu/experimental (dirty), workspace AQS_workspace. Explorer sidebar:
  same tree as prior photos; loader-optimized.ts, loader.ts,
  middleware-optimize...ts, middleware.ts under legacy/utils all marked U
  (unsaved/modified); "1" badge on Selection icon in activity bar (vs "27" on
  Explorer icon seen in other photos). Timestamp 5:11 PM 7/10/2026.
---

142   const PolicyInformation: React.FC = () => {
550     const validatedPageButtons = useMemo(() => {
610       let buttonsWithOverrides = normalizedPageButtons.map((btn) => {

612         const matchcodeUpper = btn.matchcode?.toUpperCase?.() || '';
613         const override = overrides[matchcodeUpper];
614
615         if (override) {
616           const result = {
617             ...btn,
618             disabled: override.disabled,
619             visible: override.visible,
620           };
621           console.log(`[PolicyInformation] DEBUG - Button ${btn.matchcode}:`, {
622             original: { disabled: btn.disabled, visible: btn.visible },
623             override: override,
624             final: { disabled: result.disabled, visible: result.visible },
625           });
626           return result;
627         }
628         console.log(
629           `[PolicyInformation] DEBUG - No override found for button: ${btn.matchcode}`,
630         );
631         return btn;
632       });
633
634       // Sort buttons by order: NEXT (1) → OK (2) → CANCEL (3) → others → PathUpdate (100)
635       buttonsWithOverrides = buttonsWithOverrides.sort((a, b) => {
636         const aOrder = getDefaultButtonOrder(a.matchcode);
637         const bOrder = getDefaultButtonOrder(b.matchcode);
638         return aOrder - bOrder;
639       });
640
641       console.log('[PolicyInformation] Button Validation & Sorting:', {
642         allRequiredFilled: validation.allRequiredFilled,


========== IMG_2486.md ==========
---
photo: IMG_2486.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142, 550, 610, 630-660
orientation: 180
confidence: high
notes: |
  Sharp, unblurred photo (no motion-blur ghosting). Sticky scroll pinned:
  "142 const PolicyInformation: React.FC = () => {", "550 const
  validatedPageButtons = useMemo(() => {", "610 let buttonsWithOverrides =
  normalizedPageButtons.map((btn) => {". This photo shows the end of the
  validatedPageButtons useMemo: the buttonsWithOverrides.map callback
  closing, the sort-by-order logic, a final debug console.log with a
  sortedButtons summary, the return statement, and a catch block with a
  fallback console.error + fallback button mapping. Editor tab
  "PolicyInformation.tsx 9+, M" (unsaved). Breadcrumb: aqs-web-ui > src >
  features > policy > components > PolicyInformation.tsx. Status bar: No
  Solution, 91 problems / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript JSX, branch hitanshu/experimental (dirty), workspace
  AQS_workspace. Explorer sidebar: same tree as prior photos; "1" badge on
  Selection icon (as in IMG_2485). Timestamp 5:11 PM 7/10/2026.
---

142   const PolicyInformation: React.FC = () => {
550     const validatedPageButtons = useMemo(() => {
610       let buttonsWithOverrides = normalizedPageButtons.map((btn) => {

630         );
631         return btn;
632       });
633
634       // Sort buttons by order: NEXT (1) → OK (2) → CANCEL (3) → others → PathUpdate (100)
635       buttonsWithOverrides = buttonsWithOverrides.sort((a, b) => {
636         const aOrder = getDefaultButtonOrder(a.matchcode);
637         const bOrder = getDefaultButtonOrder(b.matchcode);
638         return aOrder - bOrder;
639       });
640
641       console.log('[PolicyInformation] Button Validation & Sorting:', {
642         allRequiredFilled: validation.allRequiredFilled,
643         missingFields: validation.missingFields.map((f) => f.matchcode),
644         sortedButtons: buttonsWithOverrides.map((b) => ({
645           matchcode: b.matchcode,
646           order: getDefaultButtonOrder(b.matchcode),
647           disabled: b.disabled,
648           visible: b.visible,
649         })),
650       });
651
652       return buttonsWithOverrides;
653     } catch (error) {
654       console.error('[PolicyInformation] Button validation failed:', error);
655       return (loaderData?.pageButtons || []).map((btn) => ({
656         ...btn,
657         disabled: Boolean(btn.disabled),
658         visible: btn.visible ?? true,
659       }));
660     }


========== IMG_2487.md ==========
---
photo: IMG_2487.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142, 550, 643-667
orientation: 180
confidence: medium
notes: |
  Sticky scroll pinned: "142 const PolicyInformation: React.FC = () => {",
  "550 const validatedPageButtons = useMemo(() => {". This photo shows heavy
  motion-blur double-exposure across the whole pane (worse than most other
  photos in this batch — looks like it was taken mid-scroll while the view
  moved from the validatedPageButtons useMemo tail into a new tabConfigs
  section, with the string "const tabConfigs = POLICY_TABS.map((tab: (typeof
  POLICY_TABS)[number]) => ({" visibly ghosted at 3+ different row offsets).
  Lines 643-660 duplicate content already captured cleanly in IMG_2486
  (validation/sort debug console.log, return buttonsWithOverrides, catch
  block with fallback mapping) — see that transcript for a reliable version
  of that range. Lines 661-667 were confirmed and corrected against
  companion photo IMG_2488, which shows this exact region (661-689) sharply
  with no ghosting — in particular "label:" is simply "tab.label," (no
  ternary; this transcript's earlier guess of a TABPOL ternary there was
  wrong and has been corrected). Editor tab "PolicyInformation.tsx 9+, M"
  (unsaved). Breadcrumb: aqs-web-ui > src > features > policy > components >
  PolicyInformation.tsx. Status bar: No Solution, 91 problems / 0 warnings,
  Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, branch
  hitanshu/experimental (dirty), workspace AQS_workspace. Explorer sidebar
  same tree as prior photos. Timestamp 5:11 PM 7/10/2026.
---

142   const PolicyInformation: React.FC = () => {
550     const validatedPageButtons = useMemo(() => {

(643-660: see IMG_2486.md for a clean transcription of this range — this
photo shows the same content but heavily ghosted)

661     }, [loaderData?.pageButtons, mergedFormValues, shouldFilterStaticFieldsByPresence]);
662
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
664       id: tab.id,
665       label: tab.label,
666       accessletter: tab.accessletter,
667       render: () => (


========== IMG_2488.md ==========
---
photo: IMG_2488.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142, 550, 655, 659-689
orientation: 180
confidence: high
notes: |
  Sharp, unblurred photo (no motion-blur ghosting). Sticky scroll pinned:
  "142 const PolicyInformation: React.FC = () => {", "550 const
  validatedPageButtons = useMemo(() => {", "655 return (loaderData?.pageButtons
  || []).map((btn) => ({" (third sticky level, inside the catch-block
  fallback). This photo shows the close of validatedPageButtons useMemo (its
  dependency array), the start of tabConfigs = POLICY_TABS.map(...) building
  per-tab render configs, and the beginning of the TABPOL tab's render
  function: a TabPanel with a two-column grid layout, a left column built
  from a hard-coded `leftOrder` array of matchcodes
  (POLPOLV3X_LEXLIDX, POLPOL_LPOLNUM, POLPOL_NEFFDAT, POLPOL_NEXPDAT,
  POLPOL_LRLVTCT, POLPOLEXT_LrgRskRul_BooleanValue,
  POLPOLEXT_Cnv_BooleanValue), and the start of a `.map((mc) =>` over
  leftOrder referencing normalizedStaticByTab['TABPOL'] (cut off at bottom
  edge). Editor tab "PolicyInformation.tsx 9+, M" (unsaved). Breadcrumb:
  aqs-web-ui > src > features > policy > components > PolicyInformation.tsx.
  Status bar: No Solution, 91 problems / 0 warnings, Ln 1 Col 1, Tab Size 4,
  UTF-8, CRLF, TypeScript JSX, branch hitanshu/experimental (dirty), workspace
  AQS_workspace. Explorer sidebar same tree as prior photos; "1" badge on
  Selection icon. Timestamp 5:11 PM 7/10/2026.
---

142   const PolicyInformation: React.FC = () => {
550     const validatedPageButtons = useMemo(() => {
655         return (loaderData?.pageButtons || []).map((btn) => ({

659         }));
660       }
661     }, [loaderData?.pageButtons, mergedFormValues, shouldFilterStaticFieldsByPresence]);
662
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
664       id: tab.id,
665       label: tab.label,
666       accessletter: tab.accessletter,
667       render: () => (
668         <TabPanel id={tab.id} aria-labelledby={tab.id}>
669           {/* For TABPOL try to approximate ASP layout: top-level policy fields, then side-by-side Ins
670           {tab.id === 'TABPOL' ? (
671             <>
672               <div className="space-y-4">
673                 {/* Policy-level fields: match ASP two-column layout (left/right stacks) */}
674                 <div className="grid grid-cols-2 gap-6">
675                   {/* Left column: preserve explicit ordering */}
676                   <div>
677                     {(() => {
678                       const leftOrder = [
679                         'POLPOLV3X_LEXLIDX',
680                         'POLPOL_LPOLNUM',
681                         'POLPOL_NEFFDAT',
682                         'POLPOL_NEXPDAT',
683                         'POLPOL_LRLVTCT',
684                         'POLPOLEXT_LrgRskRul_BooleanValue',
685                         'POLPOLEXT_Cnv_BooleanValue',
686                       ];
687                       const leftFields = leftOrder
688                         .map((mc) =>
689                           normalizedStaticByTab['TABPOL']?.find(


========== IMG_2489.md ==========
---
photo: IMG_2489.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142, 663, 667, 677, 687-715
orientation: 180
confidence: high
notes: |
  Sharp, unblurred photo (no motion-blur ghosting). Sticky scroll pinned:
  "142 const PolicyInformation: React.FC = () => {", "663 const tabConfigs =
  POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({", "667 render:
  () => (", "677 {(() => {" (four sticky levels — deep nesting inside the
  IIFE building the left column). Shows completion of the left-column IIFE
  (leftFields built from leftOrder mapped against
  normalizedStaticByTab['TABPOL'], filtered, merged via
  mergeFieldsWithPageBuild, then rendered via a <FormRenderer> with fields,
  initialValues via getInitialValuesForFields, onCommitField,
  onValuesChange, useReactHookForm, fieldsPerRow, onInfoClick props), closing
  the left <div>, then opening the right column with a "// Right column:
  preserve explicit ordering" comment and the start of a `const rightOrder =
  [` array (cut off at bottom edge). Editor tab "PolicyInformation.tsx 9+, M"
  (unsaved). Breadcrumb: aqs-web-ui > src > features > policy > components >
  PolicyInformation.tsx. Status bar: No Solution, 91 problems / 0 warnings,
  Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, branch
  hitanshu/experimental (dirty), workspace AQS_workspace. Explorer sidebar
  same tree as prior photos; "1" badge on Selection icon. Timestamp 5:11 PM
  7/10/2026.
---

142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
677                     {(() => {

687                       const leftFields = leftOrder
688                         .map((mc) =>
689                           normalizedStaticByTab['TABPOL']?.find(
690                             (f) => f.matchcode === mc,
691                           ),
692                         )
693                         .filter(Boolean) as NormalizedField[];
694                       const mergedLeft = mergeFieldsWithPageBuild(leftFields);
695
696                       return (
697                         <FormRenderer
698                           fields={mergedLeft}
699                           initialValues={getInitialValuesForFields(
700                             mergedLeft,
701                           )}
702                           onCommitField={handleFieldCommit}
703                           onValuesChange={handleFormValuesChange}
704                           useReactHookForm={true}
705                           fieldsPerRow={1}
706                           onInfoClick={handleFieldInfoClick}
707                         />
708                       );
709                     })()}
710                   </div>
711
712                   {/* Right column: preserve explicit ordering */}
713                   <div>
714                     {(() => {
715                       const rightOrder = [


========== IMG_2490.md ==========
---
photo: IMG_2490.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142, 663, 667, 677, 702-731
orientation: 180
confidence: high
notes: |
  Sharp, unblurred photo (no motion-blur ghosting). Sticky scroll pinned:
  "142 const PolicyInformation: React.FC = () => {", "663 const tabConfigs =
  POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({", "667 render:
  () => (", "677 {(() => {". Shows the tail of the left-column
  <FormRenderer> props (onCommitField cut off at very top under sticky,
  onValuesChange, useReactHookForm, fieldsPerRow, onInfoClick), closing the
  left column IIFE/div, then the right-column IIFE: a `rightOrder` array of
  matchcodes (POLPOL_LCMP, POLPOLV3X_LPRDCDE, POLPOL_LPLN,
  POLPOLEXT_PgmCdeDes_StringValue, POLXCP_POLPOL_TERRSK_LMSC,
  POLPOLEXT_ExcNbc_BooleanValue, POLPOLEXT_NyxFreTrd_BooleanValue,
  POLPOLEXT_NyxClsTyp_StringValue, POLPOLEXT_TutOpr_BooleanValue,
  POLPOLEXT_NyxClsCde_StringValue), then the start of `rightFields =
  rightOrder.map((mc) => normalizedStaticByTab['TABPOL']?.find((f) =>
  f.matchcode === mc,` (cut off at bottom edge, continues in next photo).
  Editor tab "PolicyInformation.tsx 9+, M" (unsaved). Breadcrumb:
  aqs-web-ui > src > features > policy > components > PolicyInformation.tsx.
  Status bar: No Solution, 91 problems / 0 warnings, Ln 1 Col 1, Tab Size 4,
  UTF-8, CRLF, TypeScript JSX, branch hitanshu/experimental (dirty), workspace
  AQS_workspace. Explorer sidebar same tree as prior photos; "1" badge on
  Selection icon. Timestamp 5:11 PM 7/10/2026.
---

142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
677                     {(() => {

702                       onCommitField={handleFieldCommit}
703                       onValuesChange={handleFormValuesChange}
704                       useReactHookForm={true}
705                       fieldsPerRow={1}
706                       onInfoClick={handleFieldInfoClick}
707                     />
708                   );
709                 })()}
710               </div>
711
712               {/* Right column: preserve explicit ordering */}
713               <div>
714                 {(() => {
715                   const rightOrder = [
716                     'POLPOL_LCMP',
717                     'POLPOLV3X_LPRDCDE',
718                     'POLPOL_LPLN',
719                     'POLPOLEXT_PgmCdeDes_StringValue',
720                     'POLXCP_POLPOL_TERRSK_LMSC',
721                     'POLPOLEXT_ExcNbc_BooleanValue',
722                     'POLPOLEXT_NyxFreTrd_BooleanValue',
723                     'POLPOLEXT_NyxClsTyp_StringValue',
724                     'POLPOLEXT_TutOpr_BooleanValue',
725                     'POLPOLEXT_NyxClsCde_StringValue',
726                   ];
727                   const rightFields = rightOrder
728                     .map((mc) =>
729                       normalizedStaticByTab['TABPOL']?.find(
730                         (f) => f.matchcode === mc,
731                       )   ⟪rest of line 731 cut off at bottom photo edge⟫


========== IMG_2491.md ==========
---
photo: IMG_2491.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142, 663, 667, 714-715, 727-750, 751-752
orientation: 180
confidence: medium-high
notes: |
  Sticky scroll pinned: "142 const PolicyInformation: React.FC = () => {",
  "663 const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number])
  => ({", "667 render: () => (", "714 {(() => {", "715 const rightOrder =
  [". Below the sticky, the frame shows mild motion-blur double-exposure
  (the rightOrder array tail and the start of rightFields/mergedRight/
  FormRenderer block appear ghosted/overlapped with a second near-identical
  copy of themselves, similar to the pattern seen in IMG_2480/2483/2487).
  Content mirrors the left-column block seen in IMG_2489 almost exactly
  (rightOrder/rightFields/mergedRight paralleling
  leftOrder/leftFields/mergedLeft), which was used to disambiguate the
  ghosting here with reasonable confidence. Lines 748-752 (closing the right
  column IIFE, a single visible "</div>", then a
  <Divider className="mb-3" /> and the start of a "Secondary policy fields
  (Policy Type / PIW / Profession / Business / State /" comment) are sharp
  and unambiguous, though only one closing </div> is visible at 750 where
  the JSX (two-column grid opened ~674, space-y-4 wrapper opened ~672) would
  suggest two or three divs should close before the Divider — the others may
  be compacted onto the same visual line or lie just outside this crop; not
  fully resolved. Editor tab "PolicyInformation.tsx 9+, M" (unsaved).
  Breadcrumb: aqs-web-ui > src > features > policy > components >
  PolicyInformation.tsx. Status bar: No Solution, 91 problems / 0 warnings,
  Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, branch
  hitanshu/experimental (dirty), workspace AQS_workspace. Explorer sidebar
  same tree as prior photos; "1" badge on Selection icon. Timestamp 5:11 PM
  7/10/2026.
---

142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
714                 {(() => {
715                   const rightOrder = [

727                   const rightFields = rightOrder
728                     .map((mc) =>
729                       normalizedStaticByTab['TABPOL']?.find(
730                         (f) => f.matchcode === mc,
731                       ),
732                     )
733                     .filter(Boolean) as NormalizedField[];
734                   const mergedRight = mergeFieldsWithPageBuild(rightFields);
735
736                   return (
737                     <FormRenderer
738                       fields={mergedRight}
739                       initialValues={getInitialValuesForFields(
740                         mergedRight,
741                       )}
742                       onCommitField={handleFieldCommit}
743                       onValuesChange={handleFormValuesChange}
744                       useReactHookForm={true}
745                       fieldsPerRow={1}
746                       onInfoClick={handleFieldInfoClick}
747                     />
748                   );
749                 })()}
750               </div>
751           <Divider className="mb-3" />
752           {/* Secondary policy fields (Policy Type / PIW / Profession / Business / State /


========== IMG_2504.md ==========
---
photo: IMG_2504.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-949 (sparse; see notes)
orientation: 180
confidence: medium
notes: Photo has significant motion/camera blur creating a double-exposure ghosting effect across most of the code area (looks like the editor was mid smooth-scroll when the photo was taken) — two overlapping text layers are visible in many rows. Line-number gutter is sharp/reliable at 142, 663, 667, 893, 894, then jumps straight to 922 (rows in between are blurred/illegible as a reliable sequence — see unlabeled fragment block below), then sharp+continuous 922-949. Tab bar shows "PolicyInformation.tsx 9+, M" (unsaved/modified). Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Sticky-scroll headers pinned at top show enclosing scope (lines 142, 663, 667, 893). A Microsoft Teams "quick reply" popup (Hitanshu Gajjar: "ok ok koi na") overlaps the right side of the editor from roughly line 937-948, occluding line-ends (e.g. line 937 is cut off after "...mergeFieldsWithPageBuild(rema"; line 942 cut off after "controlsByTab?.['T..."). Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): features > dashboard\utils (loader.ts, middleware.ts), form\utils (dynamic-form-loader.ts), legacy > components, utils (loader-optimized.ts [U], loader.ts [U], middleware-optimize....ts [U], middleware.ts [U]), policy > components (LobActionMenu.tsx, PolicyInformatio...tsx [selected, 9+ M], ultimate-cover.tsx), constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings icon, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Date/time overlay: 5:12 PM 7/10/2026.
---

Sticky-scroll headers (pinned context lines at top of editor):
```
142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
893           {(() => {
```

Main visible body:
```
894             const placed = new Set<string>([
```

⟪?⟫ Unlabeled fragment block — visually between gutter rows 894 and 922, but exact line numbers are NOT reliably readable due to motion blur (two overlapping scroll-position exposures). Legible string entries in the brighter/sharper layer, approximate order top→bottom:
```
'POLNAM_LINSPRINAM_1',
'POLNAM_LINSCTY_1',
/* insured/agent */
'POLNAM_LINSSTA_1',
'POLAGT_LAGTNUM_1',
'POLAGT_LPCRNUM_1',
'POLAGT_LAGTPRINAM_1',
'POLAGT_LPCRNAM_1',
'POLAGT_LAGTCTY_1',
'POLAGT_LAGTSTA_1',
```
Fainter ghost layer overlapping the same region (different/adjacent scroll frame, content ⟪?⟫ uncertain):
```
'POLPOLEXI_SatCd.StringValue',
'POLPOLEXI_DocSta.StringValue',
...'StringValue',   (repeated ~3x, prefix illegible)
```

Then gutter resumes sharp and continuous:
```
922   'POLNAM_LINSCTY_1',
923   'POLNAM_LINSSTA_1',
924   'POLAGT_LAGTNUM_1',
925   'POLAGT_LPCRNUM_1',
926   'POLAGT_LAGTPRINAM_1',
927   'POLAGT_LPCRNAM_1',
928   'POLAGT_LAGTCTY_1',
929   'POLAGT_LAGTSTA_1',
930   ]);
931
932           const allStatic = normalizedStaticByTab['TABPOL'] || [];
933           const remaining = allStatic.filter(
934             (f) => !placed.has(String(f.matchcode || '')),
935           );
936           if (!remaining || remaining.length === 0) return null;
937           const merged = mergeFieldsWithPageBuild(rema⟪?⟫  [line continues, occluded by Teams popup]
938           return (
939             <div className="pt-4">
940               {/* Tab-level controls (OK/NEXT/etc.) */}
941               <div className="mb-2">
942                 {(loaderData?.controlsByTab?.['T⟪?⟫  [occluded by Teams popup — likely 'TABPOL'] || []).map(
943                   (c: any) => (
944                     <button
945                       key={c.matchcode}
946                       className="mr-2 btn btn-sm"
947                       onClick={() => {
948                         handleFieldCommit(
949                         ⟪?⟫  [cut off at bottom of visible editor / status bar]
```


========== IMG_2505.md ==========
---
photo: IMG_2505.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-952 (sparse gap 895-922; see notes)
orientation: 180
confidence: high
notes: Same file/scroll area as IMG_2504 but sharper (little motion blur), no Teams popup this time. Tab "PolicyInformation.tsx 9+, M" (unsaved/modified), selected in Explorer under policy > components. Sticky-scroll headers pinned at top: lines 142, 663, 667, 893 (same as IMG_2504). Between gutter row 894 and row 924 there is a gap where line numbers are not legible (camera blur on the number glyphs) except one row directly above 924 whose text reads 'POLNAM_LINSSTA_1', with a barely-legible number that most closely reads "923" (low confidence on the digit itself, though position strongly implies it directly precedes 924's 'POLAGT_LAGTNUM_1'). Rows 895-922 not visible/legible in this photo. Line 952 is fully covered by the horizontal scrollbar/status bar at the bottom of the editor and not visible. Explorer sidebar matches IMG_2504 (features > dashboard\utils, form\utils, legacy > components/utils, policy > components [LobActionMenu.tsx, PolicyInformatio...tsx (selected), ultimate-cover.tsx], constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts). Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time overlay 5:12 PM 7/10/2026 (same moment as IMG_2504, slightly later scroll/cursor state).
---

Sticky-scroll headers (pinned context lines at top of editor):
```
142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
893           {(() => {
```

Main visible body:
```
894             const placed = new Set<string>([
⟪?⟫  [lines 895-922 not visible/legible in this photo]
923             'POLNAM_LINSSTA_1',   ⟪line number low-confidence — glyph reads "9?4"/"923"-ish, inferred from adjacency to 924⟫
924             'POLAGT_LAGTNUM_1',
925             'POLAGT_LPCRNUM_1',
926             'POLAGT_LAGTPRINAM_1',
927             'POLAGT_LPCRNAM_1',
928             'POLAGT_LAGTCTY_1',
929             'POLAGT_LAGTSTA_1',
930           ]);
931
932           const allStatic = normalizedStaticByTab['TABPOL'] || [];
933           const remaining = allStatic.filter(
934             (f) => !placed.has(String(f.matchcode || '')),
935           );
936           if (!remaining || remaining.length === 0) return null;
937           const merged = mergeFieldsWithPageBuild(remaining as NormalizedField[]);
938           return (
939             <div className="pt-4">
940               {/* Tab-level controls (OK/NEXT/etc.) */}
941               <div className="mb-2">
942                 {(loaderData?.controlsByTab?.['TABPOL'] || []).map(
943                   (c: any) => (
944                     <button
945                       key={c.matchcode}
946                       className="mr-2 btn btn-sm"
947                       onClick={() =>
948                         handleFieldCommit(
949                           c.matchcode,
950                           true,
951                           'click',
952           ⟪?⟫  [covered by horizontal scrollbar/status bar, not visible]
```


========== IMG_2507.md ==========
---
photo: IMG_2507.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-978 (sparse 894-943; see notes)
orientation: 180
confidence: high
notes: Same file as IMG_2504/2505/2506, scrolled further down; text is sharp/legible (only rows ~945-950 have mild squiggle-underline clutter obscuring them, no double-exposure ghosting this time). Tab "PolicyInformation.tsx 9+, M", selected in Explorer, same sidebar tree as prior photos in this run. Sticky-scroll headers pinned at top: 142, 663, 667, 893 (same as IMG_2504/2505). Between sticky row 893 and row 944 the gutter jumps directly (rows 894-943 not shown as a separate block in this crop — editor shows "(c: any) => (" immediately after the sticky headers at what reads as row 944, i.e. this photo's visible body starts at 944). CAVEAT: compare to IMG_2505/2506 — there this same button/handleFieldCommit/FormRenderer block appears ONE LINE EARLIER (e.g. true/'click' at 950/951 in IMG_2505 vs 951/952 here), suggesting one line was inserted/removed in the file between shots. This photo's numbers are used as-is (they are internally consistent and sharp) but may not be perfectly reconcilable with IMG_2504-2506's numbering. Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time overlay 5:12 PM 7/10/2026.
---

Sticky-scroll headers (pinned context lines at top of editor):
```
142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
893           {(() => {
```

Main visible body:
```
944                 (c: any) => (
⟪?⟫  [rows ~945-950 present but obscured by squiggle-underline clutter/blur — likely <button, key={c.matchcode}, className="mr-2 btn btn-sm", onClick={() =>, handleFieldCommit(, c.matchcode, per IMG_2505's parallel block, but not independently confirmed at these exact numbers in this photo]
951                     true,
952                     'click',
953                   )
954                 }
955               >
956                 {c.text}
957               </button>
958             ),
959           )}
960         </div>
961         <FormRenderer
962           fields={merged}
963           initialValues={getInitialValuesForFields(merged)}
964           onCommitField={handleFieldCommit}
965           useReactHookForm={true}
966           fieldsPerRow={2}
967           onInfoClick={handleFieldInfoClick}
968         />
969       </div>
970     );
971   })()}
972   </>
973   ) : tab.id === 'TABDET' ? (
974     <div className="space-y-4">
975       {/* TABDET: two-column grid layout */}
976       <div className="grid grid-cols-2 gap-6">
977         {/* Left column */}
978         <div className="space-y-4">
```


========== IMG_2508.md ==========
---
photo: IMG_2508.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-991 (sparse 894-962; see notes)
orientation: 180
confidence: high
notes: Same file, scrolled further down; text sharp/legible throughout, minimal blur. Tab "PolicyInformation.tsx 9+, M", selected in Explorer (same sidebar as prior photos in this run). Sticky-scroll headers pinned at top: 142, 663, 667, 893 (same as IMG_2504/2505/2507). Body view jumps straight from sticky row 893 to row 963 (rows 894-962 not shown in this crop/scroll position). Content at 963-967 matches IMG_2507's 962-967 block (initialValues/onCommitField/useReactHookForm/fieldsPerRow/onInfoClick), confirming IMG_2507 and IMG_2508 share consistent line numbering (both show "initialValues={getInitialValuesForFields(merged)}" at 963). Row 991 is partly obscured by the horizontal scrollbar overlay at the bottom of the editor — text faintly legible through it, medium confidence only for that line. Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time overlay 5:12 PM 7/10/2026.
---

Sticky-scroll headers (pinned context lines at top of editor):
```
142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
893           {(() => {
```

Main visible body:
```
⟪?⟫  [lines 894-962 not visible in this photo's scroll position]
963           initialValues={getInitialValuesForFields(merged)}
964           onCommitField={handleFieldCommit}
965           useReactHookForm={true}
966           fieldsPerRow={2}
967           onInfoClick={handleFieldInfoClick}
968         />
969       </div>
970     );
971   })()}
972   </>
973   ) : tab.id === 'TABDET' ? (
974     <div className="space-y-4">
975       {/* TABDET: two-column grid layout */}
976       <div className="grid grid-cols-2 gap-6">
977         {/* Left column */}
978         <div className="space-y-4">
979           {/* Top fields (vertical stack) */}
980           {(() => {
981             const topFields = [
982               'POLPOL_LEXPPOLNUM',
983               'POLPOL_NRLVEFFDAT',
984               'POLPOL_NRLVDAT',
985             ];
986             const fields = topFields
987               .map((mc) =>
988                 normalizedStaticByTab['TABDET']?.find(
989                   (f) => f.matchcode === mc,
990                 ),
991               ⟪medium confidence, partly under scrollbar overlay⟫ .filter(Boolean) as NormalizedField[];
```


========== IMG_2510.md ==========
---
photo: IMG_2510.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142(sticky)+663+667+980+986; body 990-1018
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_2509; text sharp/legible throughout. Tab "PolicyInformation.tsx 9+, M", selected in Explorer (same sidebar as prior photos). Sticky-scroll headers pinned at top: 142, 663, 667, 980 ("{(() => {"), 986 ("const fields = topFields") — five pinned rows this time. Body resumes at row 990. Numbering here is fully consistent with IMG_2509 (row 992 = "const merged = mergeFieldsWithPageBuild(fields).map((field) => {" in both photos). This is a second, separate FormRenderer usage (for the vertical "topFields" stack) with fieldsPerRow={1}, distinct from the earlier FormRenderer around line 961-968 which had fieldsPerRow={2}. Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time overlay 5:12 PM 7/10/2026.
---

Sticky-scroll headers (pinned context lines at top of editor):
```
142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
980           {(() => {
986             const fields = topFields
```

Main visible body:
```
990               ),
991             .filter(Boolean) as NormalizedField[];
992             const merged = mergeFieldsWithPageBuild(fields).map((field) => {
993               if (field.matchcode === 'POLPOL_NRLVDAT') {
994                 return {
995                   ...field,
996                   showInfoIcon: true,
997                   infoAriaLabel:
998                     'Show Eff. Date of Rates information',
999                 };
1000              }
1001              return field;
1002            });
1003
1004            return (
1005              <FormRenderer
1006                fields={merged}
1007                initialValues={getInitialValuesForFields(merged)}
1008                onCommitField={handleFieldCommit}
1009                useReactHookForm={true}
1010                fieldsPerRow={1}
1011                onInfoClick={handleFieldInfoClick}
1012              />
1013            );
1014          })()}
1015
1016          {/* POLPOL_NSHRTRMFAC and POLPOL_HSHRTRMFAC side-by-side */}
1017          <div className="grid grid-cols-2 gap-2">
1018            <div className=⟪?⟫  [cut off at bottom edge of editor by scrollbar]
```


========== IMG_2511.md ==========
---
photo: IMG_2511.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142(sticky)+663+667+980+992; body 1003-1031
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_2510; text sharp/legible throughout. Tab "PolicyInformation.tsx 9+, M", selected in Explorer (same sidebar as prior photos). Sticky-scroll headers pinned at top: 142, 663, 667, 980 ("{(() => {"), 992 ("const merged = mergeFieldsWithPageBuild(fields).map((field) => {") — consistent with IMG_2510's numbering (992=const merged there too). Body resumes at row 1003. This is a THIRD field block/FormRenderer-adjacent section (sideFields: POLPOL_NSHRTRMFAC / POLPOL_HSHRTRMFAC side-by-side), following the same const-fields/.map/.find/.filter/const-merged pattern seen in the topFields block (IMG_2510). Row 1031 is at the very bottom edge, mostly cut off by the status bar — only "const merged = mergeFieldsWithPageBuild(fields).map(" is visible, continuation not shown. Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time overlay 5:12 PM 7/10/2026.
---

Sticky-scroll headers (pinned context lines at top of editor):
```
142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
980           {(() => {
992             const merged = mergeFieldsWithPageBuild(fields).map((field) => {
```

Main visible body:
```
1003
1004            return (
1005              <FormRenderer
1006                fields={merged}
1007                initialValues={getInitialValuesForFields(merged)}
1008                onCommitField={handleFieldCommit}
1009                useReactHookForm={true}
1010                fieldsPerRow={1}
1011                onInfoClick={handleFieldInfoClick}
1012              />
1013            );
1014          })()}
1015
1016          {/* POLPOL_NSHRTRMFAC and POLPOL_HSHRTRMFAC side-by-side */}
1017          <div className="grid grid-cols-2 gap-2">
1018            {(() => {
1019              const sideFields = [
1020                'POLPOL_NSHRTRMFAC',
1021                'POLPOL_HSHRTRMFAC',
1022              ];
1023              const fields = sideFields
1024                .map((mc) =>
1025                  normalizedStaticByTab['TABDET']?.find(
1026                    (f) => f.matchcode === mc,
1027                  ),
1028                )
1029              .filter(Boolean) as NormalizedField[];
1030              const merged = mergeFieldsWithPageBuild(fields).map(
1031              ⟪?⟫  [cut off at bottom edge/status bar — likely continues "(field) => {"]
```


========== IMG_2512.md ==========
---
photo: IMG_2512.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142(sticky)+663+667+980+1014; body 1015-1044
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_2511; text sharp/legible throughout. Tab "PolicyInformation.tsx 9+, M", selected in Explorer (same sidebar as prior photos, "ultimate-cover.tsx" note: LobActionMenu.tsx no longer shows a modified dot). Sticky-scroll headers pinned at top: 142, 663, 667, 980 ("{(() => {"), and a 5th row showing "})()}" (closing an earlier nested IIFE — matches IMG_2511's row 1014 content) — line number for that 5th sticky row not clearly legible but content matches row 1014 established in IMG_2511. Body resumes at row 1015 (blank line), matching IMG_2511's row 1015 exactly, confirming consistent numbering across IMG_2510/2511/2512. This continues the "sideFields" (POLPOL_NSHRTRMFAC/POLPOL_HSHRTRMFAC) block from IMG_2511 through to a new pattern: instead of FormRenderer, this block renders individual <FieldRenderer> components directly via merged.map(). Row 1044 is at the bottom edge, partly under the horizontal scrollbar — text still legible. Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time overlay 5:12 PM 7/10/2026.
---

Sticky-scroll headers (pinned context lines at top of editor):
```
142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
980           {(() => {
1014            })()}
```

Main visible body:
```
1015
1016          {/* POLPOL_NSHRTRMFAC and POLPOL_HSHRTRMFAC side-by-side */}
1017          <div className="grid grid-cols-2 gap-2">
1018            {(() => {
1019              const sideFields = [
1020                'POLPOL_NSHRTRMFAC',
1021                'POLPOL_HSHRTRMFAC',
1022              ];
1023              const fields = sideFields
1024                .map((mc) =>
1025                  normalizedStaticByTab['TABDET']?.find(
1026                    (f) => f.matchcode === mc,
1027                  ),
1028                )
1029              .filter(Boolean) as NormalizedField[];
1030              const merged = mergeFieldsWithPageBuild(fields).map(
1031                (f, idx) => (idx === 1 ? { ...f, label: '' } : f),
1032              );
1033              const initialVals = getInitialValuesForFields(merged);
1034              return merged.map((field, idx) => (
1035                <FieldRenderer
1036                  key={field.matchcode}
1037                  className={
1038                    idx === 0 ? '' : 'relative right-[-30px]'
1039                  }
1040                  label={field.label}
1041                  value={initialVals[field.matchcode]}
1042                  controlType={field.controlType}
1043                  options={field.options || []}
1044   ⟪partly under scrollbar⟫
```


========== IMG_2515.md ==========
---
photo: IMG_2515.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142(sticky)+663+667+~1019+~1035; body 1056-1084
orientation: 180
confidence: medium
notes: Same file, scrolled further down from IMG_2514 (final photo of this run). Sticky headers 142, 663, 667 legible; two further sticky rows read as "1019" ("return merged.map((field, idx) => (") and "1035" ("handleFieldCommit(") — these numbers are LOW confidence (digits blurred/doubled) and appear inconsistent with IMG_2512/2513's established numbering for the same "return merged.map/<FieldRenderer" text (there labeled 1034/1035 for a different, earlier sideFields block); may be a misread or the sticky scroll is showing a stale/partial scope chain. Body from row 1056 onward is sharp and internally consistent (sequential, unblurred), and is trusted as-is. Rows 1056-1065 finish the handleFieldCommit call and close out the sideFields FieldRenderer .map/IIFE block (matching content already seen unlabeled in IMG_2514). Rows 1066-1084 are NEW content: a third "Bottom fields (vertical stack)" IIFE block (POLPOL_NMINPRM, POLPOL_LMINCLC) using the same const-fields/.map/.find/.filter/const-merged/FormRenderer pattern as the topFields block (IMG_2510). Row 1083 onward is under the horizontal scrollbar/status bar, partly cut off. Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time overlay 5:12 PM 7/10/2026.
---

Sticky-scroll headers (pinned context lines at top of editor):
```
142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
~1019           return merged.map((field, idx) => (   ⟪line number low-confidence⟫
~1035             handleFieldCommit(                   ⟪line number low-confidence⟫
```

Main visible body (numbers sharp/reliable from here):
```
1056                field.matchcode,
1057                normalized,
1058                eventType,
1059              );
1060            }}
1061          />
1062        ));
1063      })()}
1064      </div>
1065      ));

1066      {/* Bottom fields (vertical stack) */}
1067      {(() => {
1068        const bottomFields = ['POLPOL_NMINPRM', 'POLPOL_LMINCLC'];
1069        const fields = bottomFields
1070          .map((mc) =>
1071            normalizedStaticByTab['TABDET']?.find(
1072              (f) => f.matchcode === mc,
1073            ),
1074          )
1075        .filter(Boolean) as NormalizedField[];
1076        const merged = mergeFieldsWithPageBuild(fields);
1077        return (
1078          <FormRenderer
1079            fields={merged}
1080            initialValues={getInitialValuesForFields(merged)}
1081            onCommitField={handleFieldCommit}
1082            useReactHookForm={true}
1083            fieldsPerRow={1}  ⟪partly under scrollbar⟫
1084   ⟪?⟫  [cut off at bottom edge of editor]
```


========== IMG_2516.md ==========
---
photo: IMG_2516.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-1099 (sticky headers) / 1068-1099 (visible body)
orientation: 180
confidence: medium
notes: Photo has noticeable motion-blur "ghosting" — each bright line has a faint, slightly-offset duplicate/echo of nearby lines overlapping it, making a handful of lines (1071-1074) hard to pin down exactly. Sticky-scroll shows 5 pinned header lines (142, 663, 667, 1068, 1070) — real line numbers, recorded below. Editor tab: "PolicyInformation.tsx 9+, M" (9+ unsaved/modified changes). Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx. Problems: 91 errors, 0 warnings, "No Solution" (C# side panel, irrelevant to this TS file). Explorer sidebar (partial/best-effort, tree reconstruction uncertain due to blur): AQS_WORKSPACE > aqs-web-ui > src > features > {dashboard\utils (loader.ts, middleware.ts), form\utils (dynamic-form-loader.ts), legacy (components, utils), policy > components (highlighted: PolicyInformation..., also ultimate-cover.tsx), components, utils (loader-optimized.ts U, loader.ts U, middleware-optimized.ts U, middleware.ts U)}, policy > components (LobActionMenu.tsx, PolicyInformatio... 9+,M [selected/blue], ultimate-cover.tsx), constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts. Branch "hitanshu/experimental*" (bottom-left), workspace "AQS_workspace (Workspace)". Timestamp 5:12 PM 7/10/2026. The bottomFields chain (lines ~1069-1074) structurally mirrors the clearly-legible rightFields chain at lines 1094-1099+ (same normalizedStaticByTab['TABDET']?.find((f) => f.matchcode === mc,) idiom) — used that parallel to sanity-check the blurred middle lines, but exact line-by-line text for 1071-1074 is a best-effort reconstruction, not a confirmed verbatim read.
---
Sticky-scroll pinned header lines (enclosing scope, real line numbers):
142     const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
1068          const fields = bottomFields
1070              normalizedStaticByTab['TABDET']?.find(

Visible editor body (gutter numbers as shown; 1071-1074 reconstructed by analogy to 1095-1099, low confidence — marked):
1068          const fields = bottomFields
1069⟪?⟫         .map((mc) =>
1070              normalizedStaticByTab['TABDET']?.find(
1071⟪?⟫             (f) => f.matchcode === mc,
1072⟪?⟫           )
1073⟪?⟫         )
1074⟪?⟫       .filter(Boolean) as NormalizedField[];
1075        .filter(Boolean) as NormalizedField[];
1076        const merged = mergeFieldsWithPageBuild(fields);
1077        return (
1078          <FormRenderer
1079            fields={merged}
1080            initialValues={getInitialValuesForFields(merged)}
1081            onCommitField={handleFieldCommit}
1082            useReactHookForm={true}
1083            fieldsPerRow={1}
1084            onInfoClick={handleFieldInfoClick}
1085          />
1086        );
1087      })()}
1088    </div>
1089    );
1090    {/* Right column */}
1091    <div>
1092      {(() => {
1093        const rightOrder = ['POLPOL_NTCTDAT'];
1094        const rightFields = rightOrder
1095          .map((mc) =>
1096            normalizedStaticByTab['TABDET']?.find(
1097              (f) => f.matchcode === mc,
1098            )
1099          )

Note: line 1075 appears twice above (once flagged uncertain as part of the reconstructed 1071-1074 block, once as the directly-read gutter line) — the reconstruction is only a hypothesis for what fills 1071-1074; the directly-read gutter number for ".filter(Boolean) as NormalizedField[];" is 1075, confirmed sharp in multiple crops.


========== IMG_2517.md ==========
---
photo: IMG_2517.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-1115 (sticky headers + body)
orientation: 180
confidence: high
notes: Same file/tab as IMG_2516 ("PolicyInformation.tsx 9+, M"), scrolled slightly further down — sticky-scroll here only shows 4 pinned lines (142, 663, 667, 1068) then body resumes at 1087, so lines 1069-1086 are hidden under the sticky widget in this shot (see IMG_2516 for a partial view of some of those, with lower confidence). This photo's text is noticeably sharper/less motion-blurred than IMG_2516, especially lines 1090-1099, which cross-confirms and corrects the trailing comma on line 1098 (confirmed "),ват" i.e. ")," ) that was ambiguous in IMG_2516. Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx. Problems: 91 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*, workspace AQS_workspace (Workspace), timestamp 5:12 PM 7/10/2026 (same session as IMG_2516). Explorer/Outline sidebar visible on right edge (upside-down original) lists similar tree to IMG_2516: types.ts, policy-information-fields.ts, index.ts, FieldRenderer.tsx, utils, constants, ultimate-cover.tsx, PolicyInformatio...9+,M (selected), LobActionMenu.tsx, components, policy, middleware.ts, middleware-optimized.ts, loader.ts, loader-optimized.ts, utils, components, legacy, dynamic-form-loader.ts, form\utils, middleware.ts, loader.ts, dashboard\utils, features, src, aqs-web-ui, AQS_WORKSPACE.
---
Sticky-scroll pinned header lines (enclosing scope, real line numbers):
142     const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
1068          {(() => {

Visible editor body (gutter numbers as shown, high confidence):
1087      })()}
1088    </div>
1089    );
1090    {/* Right column */}
1091    <div>
1092      {(() => {
1093        const rightOrder = ['POLPOL_NTCTDAT'];
1094        const rightFields = rightOrder
1095          .map((mc) =>
1096            normalizedStaticByTab['TABDET']?.find(
1097              (f) => f.matchcode === mc,
1098            ),
1099          )
1100          .filter(Boolean) as NormalizedField[];
1101        const mergedRight = mergeFieldsWithPageBuild(rightFields);
1102        return (
1103          <FormRenderer
1104            fields={mergedRight}
1105            initialValues={getInitialValuesForFields(mergedRight)}
1106            onCommitField={handleFieldCommit}
1107            useReactHookForm={true}
1108            fieldsPerRow={1}
1109            onInfoClick={handleFieldInfoClick}
1110          />
1111        );
1112      })()}
1113    </div>
1114  </div>
1115  (end of visible viewport)


========== IMG_2518.md ==========
---
photo: IMG_2518.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-1131 (sticky headers + body)
orientation: 180
confidence: high
notes: Same file/tab as IMG_2516/2517 ("PolicyInformation.tsx 9+, M"), scrolled further down. Sticky-scroll shows 142, 663, 667, and a 4th pinned line around 1092/1093 showing "{(() => {" and "const mergedRight = mergeFieldsWithPageBuild(rightFields);" overlapping/blurred together (low confidence on that exact sticky line's number, but text content matches IMG_2517's lines 1092/1101). Body content from ~1102 to 1112 duplicates IMG_2517 (right-column FormRenderer) — repeated here only where useful for line-number cross-check. New content starts at line 1116: a ternary branch for the "TABBIL" (billing) tab. Line 1130's exact gutter number has slight uncertainty (could be 1130 or 1131, status bar partially overlaps that row). Problems: 91 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*, workspace AQS_workspace (Workspace), timestamp 5:12 PM 7/10/2026.
---
Sticky-scroll pinned header lines:
142     const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
~1092/1093  {(() => {  /  const mergedRight = mergeFieldsWithPageBuild(rightFields);  [two sticky rows blurred together]

Visible editor body (gutter numbers as shown):
1102        return (
1103          <FormRenderer
1104            fields={mergedRight}
1105            initialValues={getInitialValuesForFields(mergedRight)}
1106            onCommitField={handleFieldCommit}
1107            useReactHookForm={true}
1108            fieldsPerRow={1}
1109            onInfoClick={handleFieldInfoClick}
1110          />
1111        );
1112      })()}
1113    </div>
1114  </div>
1115  </div>
1116  ) : tab.id === 'TABBIL' ? (
1117    <div className="space-y-10">
1118      {/* Render billing fields using loader-provided normalized fields */}
1119      {(() => {
1120        const billing = (loaderData?.normalizedByTab?.['TABBIL'] ||
1121          []) as NormalizedField[];
1122        // Allow only billing-related matchcodes: union of static TABBIL mapping and loa⟪?⟫ [text truncated at right edge of frame]
1123        const staticBilling = (fieldsByTab['TABBIL'] || []).map(
1124          (f) => f.matchcode,
1125        );
1126        const allowed = new Set<string>([
1127          ...staticBilling,
1128          ...billing.map((f) => String(f.matchcode || '')),
1129        ]);
1130        const mergedAll = mergeFieldsWithPageBuild(billing);


========== IMG_2519.md ==========
---
photo: IMG_2519.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-1149 (sticky headers + body)
orientation: 180
confidence: high
notes: Same file/tab as IMG_2516-2518 ("PolicyInformation.tsx 9+, M"), scrolled further — continues the TABBIL (billing) branch introduced in IMG_2518. Sticky-scroll shows 142, 663, 667 (same as prior photos in this run); body resumes directly at 1120. Line 1122's comment is cut off at the editor's right edge by the minimap/scrollbar (word-wrap off) — visible text ends "...union of static TABBIL mapping and loa" with the rest off-screen, not a legibility issue but a viewport-width truncation. Problems: 91 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*, workspace AQS_workspace (Workspace), timestamp 5:12 PM 7/10/2026.
---
Sticky-scroll pinned header lines:
142     const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (

Visible editor body (gutter numbers as shown):
1120        const billing = (loaderData?.normalizedByTab?.['TABBIL'] ||
1121          []) as NormalizedField[];
1122        // Allow only billing-related matchcodes: union of static TABBIL mapping and loa⟪truncated at viewport edge⟫
1123        const staticBilling = (fieldsByTab['TABBIL'] || []).map(
1124          (f) => f.matchcode,
1125        );
1126        const allowed = new Set<string>([
1127          ...staticBilling,
1128          ...billing.map((f) => String(f.matchcode || '')),
1129        ]);
1130        const mergedAll = mergeFieldsWithPageBuild(billing);
1131        const merged = mergedAll.filter((f) =>
1132          allowed.has(String(f.matchcode || '')),
1133        );
1134        return (
1135          <div>
1136            <div className="grid grid-cols-2 gap-6">
1137              <FormRenderer
1138                fields={merged}
1139                initialValues={getInitialValuesForFields(merged)}
1140                onCommitField={handleFieldCommit}
1141                useReactHookForm={true}
1142                fieldsPerRow={1}
1143                onInfoClick={handleFieldInfoClick}
1144              />
1145            </div>
1146          </div>
1147        );
1148      })()}
1149  (end of visible viewport, cut by status bar)


========== IMG_2520.md ==========
---
photo: IMG_2520.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-1165 (sticky headers + body)
orientation: 180
confidence: high
notes: Same file/tab as IMG_2516-2519 ("PolicyInformation.tsx 9+, M"), scrolled further. Confirms line 1149 = "</div>" (was only guessed as "end of viewport" in IMG_2519's transcript). New content starts a TABINS (Insurer tab) branch at line 1150. Line 1152's comment is cut off at the editor's right edge (viewport width), text ends "...otherwise show key/value li[st...]". Problems: 91 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*, workspace AQS_workspace (Workspace), timestamp 5:12 PM 7/10/2026.
---
Sticky-scroll pinned header lines:
142     const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
1120          {(() => {  [4th sticky row, partial]

Visible editor body (gutter numbers as shown):
1136        <div className="grid grid-cols-2 gap-6">
1137          <FormRenderer
1138            fields={merged}
1139            initialValues={getInitialValuesForFields(merged)}
1140            onCommitField={handleFieldCommit}
1141            useReactHookForm={true}
1142            fieldsPerRow={1}
1143            onInfoClick={handleFieldInfoClick}
1144          />
1145        </div>
1146      </div>
1147      );
1148    })()}
1149  </div>
1150  ) : tab.id === 'TABINS' ? (
1151    <div className="space-y-4">
1152      {/* Insurer tab: prefer loader-provided fields; otherwise show key/value li⟪truncated at viewport edge⟫ */}
1153      {(() => {
1154        const fields = (loaderData?.normalizedByTab?.['TABINS'] ||
1155          []) as NormalizedField[];
1156        if (fields && fields.length > 0) {
1157          console.log('[policyInformation] TABINS loader fields', fields);
1158          const filtered = fields
1159            .filter(
1160              (f) =>
1161                f.matchcode !== 'POLNAM_LINSZIPEXT' &&
1162                f.controlType !== 'button',
1163            )
1164            .map((f) => ({ ...f, visible: true }));
1165  (end of visible viewport, cut by status bar)


========== IMG_2528.md ==========
---
photo: IMG_2528.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-1294 (sticky scroll + viewport 1263-1294)
orientation: 180
confidence: medium
notes: Photo was upside down, rotated 180 for transcription. Sticky-scroll header shows enclosing scope lines 142, 663, 667 above the viewport (1263-1294). A horizontal scrollbar overlay obscures the gutter and code for lines 1264-1265 entirely (illegible, marked below). Line 1263 itself is also blurred/motion-smeared under the scrollbar; only partial fragments legible ("const merged = ... getInitialValuesForFields(...)" style call, not confidently transcribable). Explorer sidebar (expanded): aqs-web-ui > src > features > dashboard\utils (loader.ts, middleware.ts), form\utils (dynamic-form-loader.ts), legacy > components, legacy > utils (loader-optimized.ts [U], loader.ts [U], middleware-optimize....ts [U], middleware.ts [U] - all marked U for untracked/unstaged), policy > components (LobActionMenu.tsx, PolicyInformation...tsx [9+,M, selected/highlighted], ultimate-cover.tsx), constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts. Only one tab open: PolicyInformation.tsx (9+, M = 9+ unsaved/modified indicator). Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Status bar: branch hitanshu/experimental*, "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, timestamp 5:12 PM 7/10/2026.
---

142: const PolicyInformation: React.FC = () => {
663:     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667:         render: () => (
1263:             {(() => {
⟪?⟫ (1264-1265): ⟪entirely obscured by horizontal scrollbar overlay — line numbers and code illegible⟫
1266:                 return (
1267:                     <FormRenderer
1268:                         fields={merged}
1269:                         initialValues={getInitialValuesForFields(merged)}
1270:                         onCommitField={handleFieldCommit}
1271:                         useReactHookForm={true}
1272:                         fieldsPerRow={2}
1273:                         onInfoClick={handleFieldInfoClick}
1274:                     />
1275:                 );
1276:             })()}
1277:         </div>
1278:         )}
1279:         </TabPanel>
1280:         ),
1281: }));
1282:
1283: // Emit tab:selected event when user switches tab
1284: const handleTabChange = (tabId: string) => {
1285:     setActiveTab(tabId);
1286:     pubSub.emit('tab:selected', { tabstripId: 'policyTabs', tabMatchcode: tabId });
1287: };
1288: const policyId = getPolicyID<Record<string, unknown>>('aqs:global-variables', {})?.mstrPolicyID;
1289: const transactionType = getPolicyID<Record<string, unknown>>(
1290:     'aqs:global-variables',
1291:     {},
1292: )?.mstrTransactionType;
1293: const isRouteLoading = navigation.state === 'loading';
1294: const showBusyBar = isRouteLoading || isExecuting || isCommitting;


========== IMG_2529.md ==========
---
photo: IMG_2529.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-1305 (sticky scroll + viewport 1263-1305)
orientation: 180
confidence: high
notes: Photo was upside down, rotated 180 for transcription. Sticky-scroll header shows enclosing scope lines 142, 663, 667, 1263 above the viewport (1276-1305). This is a continuation/re-scroll of the same PolicyInformation.tsx file seen in IMG_2528 (overlapping lines 1263-1281 match). Line 1305 is cut off at the bottom by the horizontal scrollbar, only partial text "variant=\"body2\"" visible. Squiggly (red) underlines on many JSX className lines (1296-1303) suggest lint/type warnings on those lines. Explorer sidebar same as IMG_2528: aqs-web-ui > src > features > dashboard\utils, form\utils, legacy > components/utils (U-marked files), policy > components (LobActionMenu.tsx, PolicyInformation...tsx [9+,M, selected], ultimate-cover.tsx), constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts. Single tab open: PolicyInformation.tsx (9+, M). Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Status bar: branch hitanshu/experimental*, "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:12 PM 7/10/2026.
---

142: const PolicyInformation: React.FC = () => {
663:     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667:         render: () => (
1263:             {(() => {
1276:             })()}
1277:         </div>
1278:         )}
1279:         </TabPanel>
1280:         ),
1281: }));
1282:
1283: // Emit tab:selected event when user switches tab
1284: const handleTabChange = (tabId: string) => {
1285:     setActiveTab(tabId);
1286:     pubSub.emit('tab:selected', { tabstripId: 'policyTabs', tabMatchcode: tabId });
1287: };
1288: const policyId = getPolicyID<Record<string, unknown>>('aqs:global-variables', {})?.mstrPolicyID;
1289: const transactionType = getPolicyID<Record<string, unknown>>(
1290:     'aqs:global-variables',
1291:     {},
1292: )?.mstrTransactionType;
1293: const isRouteLoading = navigation.state === 'loading';
1294: const showBusyBar = isRouteLoading || isExecuting || isCommitting;
1295: return (
1296:     <div aria-busy={showBusyBar}>
1297:         <h1 className="text-[28px] font-semibold text-left text-[#00205B]">
1298:             Policy Informations
1299:         </h1>
1300:         {/* Action buttons from PageBuild (OK / NEXT / CANCEL / etc.) with validation overrides */}
1301:         <div className="grid grid-cols-2 items-top mb-4 justify-between">
1302:             <div className="flex items-baseline gap-5">
1303:                 <h3>Policy - {(policyId || '') as string}</h3>
1304:                 <Typography
1305:                     variant="body2"


========== IMG_2530.md ==========
---
photo: IMG_2530.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-1326 (sticky scroll + viewport 1294-1326)
orientation: 180
confidence: high
notes: Photo was upside down, rotated 180 for transcription. Sticky-scroll header shows enclosing scope lines 142, 1294 above the viewport (1295-1326). Continuation/further scroll of same PolicyInformation.tsx seen in IMG_2528/IMG_2529 (overlaps lines 1294-1305). Red squiggly underlines present on nearly every JSX line 1296-1325 (widespread lint/type warnings, consistent with "91 errors" in status bar). Color swatches shown inline next to hex codes on lines 1307 (#00205B) and 1309 (#E9F1FF). Line 1326 cut off at bottom by horizontal scrollbar, partial text "visible={b.visible}" visible. Explorer sidebar same as prior photos in this file (policy > components > PolicyInformation.tsx selected). Single tab open: PolicyInformation.tsx (9+, M). Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Status bar: branch hitanshu/experimental*, "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:12 PM 7/10/2026.
---

142: const PolicyInformation: React.FC = () => {
1294:     const showBusyBar = isRouteLoading || isExecuting || isCommitting;
1295:     return (
1296:         <div aria-busy={showBusyBar}>
1297:             <h1 className="text-[28px] font-semibold text-left text-[#00205B]">
1298:                 Policy Informations
1299:             </h1>
1300:             {/* Action buttons from PageBuild (OK / NEXT / CANCEL / etc.) with validation overrides */}
1301:             <div className="grid grid-cols-2 items-top mb-4 justify-between">
1302:                 <div className="flex items-baseline gap-5">
1303:                     <h3>Policy - {(policyId || '') as string}</h3>
1304:                     <Typography
1305:                         variant="body2"
1306:                         sx={{
1307:                             mb: 2,
1308:                             color: '#00205B',
1309:                             fontSize: '14px',
1310:                             backgroundColor: '#E9F1FF',
1311:                             padding: '6px',
1312:                             fontWeight: '500',
1313:                             display: 'inline-block',
1314:                         }}
1315:                     >
1316:                         {(transactionType || '') as string}
1317:                     </Typography>
1318:                 </div>
1319:                 <div className="flex justify-end gap-3">
1320:                     {(validatedPageButtons || []).map((b: any) => (
1321:                         <ActionButton
1322:                             key={b.matchcode}
1323:                             matchcode={b.matchcode}
1324:                             text={b.text}
1325:                             disabled={b.disabled}
1326:                             visible={b.visible}


========== IMG_2531.md ==========
---
photo: IMG_2531.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-1343 (sticky scroll + viewport 1313-1343, end of file)
orientation: 180
confidence: high
notes: Photo was upside down, rotated 180 for transcription. Sticky-scroll header shows line 142 above the viewport. This is the tail end of PolicyInformation.tsx — file ends at line 1343 with `export default PolicyInformation;` (line 1344 is empty/EOF). Overlaps lines 1313-1329 with IMG_2530. Widespread red squiggly underlines continue through line 1339. Explorer sidebar same as prior photos: policy > components (LobActionMenu.tsx, PolicyInformation...tsx [9+,M, selected], ultimate-cover.tsx). Single tab open: PolicyInformation.tsx (9+, M). Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Status bar: branch hitanshu/experimental*, "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:12 PM 7/10/2026.
---

142: const PolicyInformation: React.FC = () => {
⟪?⟫ (partial, top-cut, matches 1312 "display: 'inline-block'," continuation from prior photo)
1313:                         }}
1314:                     >
1315:                         {(transactionType || '') as string}
1316:                     </Typography>
1317:                 </div>
1318:                 <div className="flex justify-end gap-3">
1319:                     {(validatedPageButtons || []).map((b: any) => (
1320:                         <ActionButton
1321:                             key={b.matchcode}
1322:                             matchcode={b.matchcode}
1323:                             text={b.text}
1324:                             disabled={b.disabled}
1325:                             visible={b.visible}
1326:                             onCommit={handleFieldCommit}
1327:                         />
1328:                     ))}
1329:                 </div>
1330:             </div>
1331:             {showBusyBar ? <LinearProgress sx={{ mb: 2 }} /> : null}
1332:             <Tabs
1333:                 tabs={tabConfigs}
1334:                 value={activeTab}
1335:                 onChange={handleTabChange}
1336:                 contentPadding={2}
1337:             />
1338:         </div>
1339:     );
1340: };
1341:
1342: export default PolicyInformation;


========== IMG_2532.md ==========
---
photo: IMG_2532.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 142-1343 (sticky scroll + viewport 1330-1343, end of file)
orientation: 180
confidence: medium
notes: Photo was upside down, rotated 180 for transcription. Sticky-scroll header shows line 142 above the viewport. Duplicate/re-confirmation view of the file tail already seen in IMG_2531 (lines 1330-1343 overlap), now additionally showing line 1330 ("</div>") right below the sticky-scroll divider. Photo has noticeable camera tilt (~3 degrees, measured from the breadcrumb divider line) which makes pixel-level alignment between gutter line numbers and heavily-indented code text genuinely ambiguous within +/-1 line for lines 1337-1340; the numbering below is the best-supported reconstruction (cross-checked against JSX nesting logic and a clean, low-ambiguity count of lines 1330-1336) and is consistent with IMG_2531. No new code content beyond IMG_2531. Explorer sidebar unchanged: policy > components (LobActionMenu.tsx, PolicyInformation...tsx [9+,M, selected], ultimate-cover.tsx). Single tab open: PolicyInformation.tsx (9+, M). Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Status bar: branch hitanshu/experimental*, "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:12 PM 7/10/2026.
---

142: const PolicyInformation: React.FC = () => {
1330:             </div>
1331:             {showBusyBar ? <LinearProgress sx={{ mb: 2 }} /> : null}
1332:             <Tabs
1333:                 tabs={tabConfigs}
1334:                 value={activeTab}
1335:                 onChange={handleTabChange}
1336:                 contentPadding={2}
1337:             />
1338:         </div>
1339:     );
1340: };
1341:
1342: export default PolicyInformation;
1343: (blank / EOF)


========== IMG_2449.md ==========
---
photo: IMG_2449.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 148-169 (approximate; see notes)
orientation: 180
confidence: medium (cross-verified against IMG_2450, see notes)
notes: SIGNIFICANT MOTION-BLUR / DOUBLE-EXPOSURE GHOSTING — this photo appears to have captured two slightly different scroll positions of the same editor content superimposed (gutter numbers appear doubled/interleaved, e.g. two overlapping sequences like "148,149,150..." and "152,153,154..." visible at once, each internally consistent but offset from the other by several lines). This is NOT a sticky-scroll artifact like other photos; it looks like camera/hand motion during shutter or a mid-scroll capture. Line-number-to-text mapping below is a best-effort RECONSTRUCTION: since both overlaid exposures show the same unchanging code (only scroll position differs), the two text layers were disentangled by matching them into one coherent, logically-consistent sequence rather than trusting either overlapping gutter-number layer directly. Confidence is therefore LOW for exact line numbers in the 156-169 range even though the code text itself reads clearly once disentangled. Lines 148-155 duplicate IMG_2448 exactly (confirms reconstruction is on track). Explorer sidebar: PolicyInformatio...tsx shown selected with a white/light highlight (differs from the blue highlight in earlier photos — possibly just a rendering/focus-state artifact of the same double exposure). Status bar: aqs-web-ui, branch hitanshu/experimental*, ⊗91 ⚠0, "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM 7/10/2026. UPDATE: line 156 and the 170-183 range were subsequently confirmed clearly (no ghosting) in IMG_2450, which shows line 156 is a COMMENTED-OUT declaration ("//const [selectedInsuredRow, setSelectedInsuredRow] = React.useState<GenericRow | null>(null);") — corrected below — and that this reconstruction's 157-169 mapping was accurate (IMG_2450 starts at 169 "}, []);" matching this file's line 169 exactly).
---
```tsx
148     const { executeCommands, isExecuting } = useBrowserCommands(loaderData?.browserCommands ?? []);
149     // Track FormRenderer field value changes
150     const [rendererFormValues, setRendererFormValues] = React.useState<Record<string, unknown>>({});
151
152     // Loader-provided data (normalized fields, controls, defaults, browserCommands)
153     // loaderData shape: { pageBuildRaw, normalizedByTab, controlsByTab, initialValuesByTab, tabsOrder, form ⟪?⟫
154     // Grid config for Insured Details tab
155     const insuredGridConfig = getGridConfig('INSURED_DETAILS');
156     //const [selectedInsuredRow, setSelectedInsuredRow] = React.useState<GenericRow | null>(null);
157     // Subscribe to global tab:selected event for programmatic tab switching
158     useEffect(() => {
159         const unsubscribe = pubSub.subscribe('tab:selected', (data) => {
160             setActiveTab(data.tabMatchcode);
161         });
162         return () => unsubscribe();
163     }, []);
164
165     // Handle form value changes from FormRenderer
166     const handleFormValuesChange = useCallback((values: FormValues) => {
167         console.log('[PolicyInformation] FormRenderer values changed:', values);
168         setRendererFormValues(values);
169     }, []);
```


========== IMG_2456.md ==========
---
photo: IMG_2456.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 257-289
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 142 "const PolicyInformation: React.FC = () => {". Explorer sidebar shows aqs-web-ui/src tree expanded: features > dashboard/utils (loader.ts, middleware.ts), form/utils (dynamic-form-loader.ts), legacy > components, legacy > utils (loader-optimized.ts [U], loader.ts [U], middleware-optimized...ts [U], middleware.ts [U]), policy > components (LobActionMenu.tsx, PolicyInformation.tsx [active, 9+ M], ultimate-cover.tsx), policy > constants, policy > utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts. Git branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Tab shows "PolicyInformation.tsx 9+, M" (unsaved modified, 9+ problems). Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {   // sticky-scroll header
...
257       const resolveCommitPlan = useCallback(
258           (context: CommitPlanContext): CommitPlanResult | null => {
259               const { matchcode, baseFormData, pageBuildData } = context;
260
261               // Special handling for OK button: call CheckRlvChanges_PolPol for validation
262               if (matchcode.toUpperCase() === 'OK') {
263                   return {
264                       calls: [{ project: 'pZStart', class: 'cZStart', subroutine: 'CheckRlvChanges_PolPol' }],
265                       callType: 'post',
266                       processIndicator: '1',
267                       payloadFormData: baseFormData,
268                       includeCallMode: false,
269                       sessionXmlAsString: true,
270                   };
271               }
272           }
273
274       const callsByType = extractCallsByTypeFromPageBuild(pageBuildData, matchcode);
275
276       const controlsRaw =
277           typeof pageBuildData === 'object' && pageBuildData !== null
278               ? (
279                     pageBuildData as {
280                         Page?: {
281                             controls?: {
282                                 control?:
283                                     | Array<Record<string, unknown>>
284                                     | Record<string, unknown>;
285                             };
286                         }
287                     )?.Page?.controls?.control
288               : undefined;
289
```


========== IMG_2457.md ==========
---
photo: IMG_2457.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 287-304 (plus sticky headers 142, 258-259)
orientation: 180
confidence: medium
notes: Photo is a motion-blurred/double-exposure capture of VS Code's smooth-scroll animation — the screen shows two overlapping copies of the same content at slightly different scroll offsets (roughly a 4-line vertical shift), so most rows are ghosted/doubled. Sticky-scroll headers (142, 258-259) and lines 287-288 and 296-304 are sharp/legible; lines 289-295 were initially uncertain but are now CONFIRMED verbatim against the sharp, non-blurred IMG_2458 (same file/scroll region, taken moments later). Explorer sidebar identical to IMG_2456 (PolicyInformation.tsx selected, 9+ M). Branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {         // sticky-scroll header L1
258       const resolveCommitPlan = useCallback(            // sticky-scroll header L2
259           (context: CommitPlanContext): CommitPlanResult | null => {   // sticky-scroll header L3
...
287           )?.Page?.controls?.control
288               : undefined;
289
290           const controlArray = Array.isArray(controlsRaw)
291               ? controlsRaw
292               : controlsRaw
293                   ? [controlsRaw]
294                   : [];
295
296           const control = controlArray.find((item) => {
297               const rawMatchcode = item['@matchcode'] ?? item.matchcode;
298
299               return (
300                   String(rawMatchcode ?? '')
301                       .trim()
302                       .toUpperCase() === matchcode.toUpperCase()
303               );
304           });
```


========== IMG_2458.md ==========
---
photo: IMG_2458.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 287-315 (plus sticky headers 142, 258-259, 276)
orientation: 180
confidence: high
notes: Sticky-scroll headers stacked 4 deep - 142 "const PolicyInformation: React.FC = () => {", 258 "const resolveCommitPlan = useCallback(", 259 "(context: CommitPlanContext): CommitPlanResult | null => {", 276 "const controlsRaw =". Slight faint ghosting/double-exposure visible behind main text (same artifact as IMG_2457, much lighter here) but foreground text fully legible. This photo resolves the uncertain lines 289-295 from IMG_2457's blurred capture (same file/scroll region) - confirmed nested nullish/array-normalize ternary. Line 315 present but its content is covered by the horizontal scrollbar/selection highlight, illegible. Explorer sidebar identical to prior photos (PolicyInformation.tsx selected, 9+ M, legacy/utils files marked U). Branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {                          // sticky L1
258       const resolveCommitPlan = useCallback(                            // sticky L2
259           (context: CommitPlanContext): CommitPlanResult | null => {    // sticky L3
276               const controlsRaw =                                      // sticky L4
...
287                   )?.Page?.controls?.control
288               : undefined;
289
290           const controlArray = Array.isArray(controlsRaw)
291               ? controlsRaw
292               : controlsRaw
293                   ? [controlsRaw]
294                   : [];
295
296           const control = controlArray.find((item) => {
297               const rawMatchcode = item['@matchcode'] ?? item.matchcode;
298
299               return (
300                   String(rawMatchcode ?? '')
301                       .trim()
302                       .toUpperCase() === matchcode.toUpperCase()
303               );
304           });
305
306           const plan = resolveLegacyPrePostPlan({
307               matchcode,
308               control,
309               callsByType,
310               runtimeOptionsCount: fieldMetadata[matchcode]?.options?.length ?? 0,
311               baseFormData,
312           });
313
314           if (!plan) {
315               console.warn('[PolicyInformation] No commit calls configured for matchcode', {
```


========== IMG_2459.md ==========
---
photo: IMG_2459.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 313-326 (approx; plus sticky headers 142, 258-259)
orientation: 180
confidence: low
notes: Photo is a motion-blurred/double-exposure capture of VS Code's smooth-scroll animation (same artifact as IMG_2457/IMG_2459's neighbors) — two overlapping copies of the same content at a small vertical offset, so the line-number gutter is doubled/ghosted throughout and not reliably readable pixel-by-pixel. Content itself is legible and unambiguous; line numbers below are inferred by anchoring to the confirmed, sharp numbering from IMG_2458 (which ends mid-statement at line 313 "if (!plan) {" / 314 "console.warn(...") and extending forward through this statement and the following return block — NOT read directly off this photo's blurred gutter. Sticky headers 142/258-259 visible at top (same as prior photos). Explorer sidebar identical (PolicyInformation.tsx selected, 9+ M). Branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {                        // sticky L1
258       const resolveCommitPlan = useCallback(                          // sticky L2
259           (context: CommitPlanContext): CommitPlanResult | null => {  // sticky L3
...
313           if (!plan) {
314               console.warn('[PolicyInformation] No commit calls configured for matchcode', {
315                   matchcode,
316               });
317               return null;
318           }
319
320           return {
321               calls: plan.runtimeCalls,
322               callType: plan.selectedCallType,
323               processIndicator: plan.processIndicator,
324               payloadFormData: plan.payloadFormData,
325               includeCallMode: false,
326               sessionXmlAsString: true,
```


========== IMG_2460.md ==========
---
photo: IMG_2460.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 320-333 (approx; plus sticky headers 142, 258-259)
orientation: 180
confidence: medium
notes: Same motion-blurred/double-exposure scroll artifact as IMG_2457/2459 (two overlapping copies of the content, small vertical offset). Lines 320-326 (the CommitPlanResult return object) are confirmed. Lines 327-333 (closing of resolveCommitPlan's useCallback and start of the useFormCommit destructure) have residual +/-1 line-number uncertainty from the ghosting. Lines 334 onward, and the handleFieldCommit useCallback body, are corrected/superseded by the much sharper IMG_2461 (same file, taken moments later) — see that transcript for the verbatim, high-confidence version of lines 334-365; do not rely on this photo for that range. Explorer sidebar identical to prior photos (PolicyInformation.tsx selected, 9+ M). Branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {                        // sticky L1
258       const resolveCommitPlan = useCallback(                          // sticky L2
259           (context: CommitPlanContext): CommitPlanResult | null => {  // sticky L3
...
320           return {
321               calls: plan.runtimeCalls,
322               callType: plan.selectedCallType,
323               processIndicator: plan.processIndicator,
324               payloadFormData: plan.payloadFormData,
325               includeCallMode: false,
326               sessionXmlAsString: true,
327           };
328           },                                    ⟪?⟫ (line split uncertain, +/-1)
329           [fieldMetadata],                       ⟪?⟫
330           );                                     ⟪?⟫
331
332       const { commitField, isCommitting } = useFormCommit({   ⟪?⟫ (exact line +/-1, see IMG_2461 for confirmed 334 onward)
333           pageBuildData: loaderData?.pageBuild as PageBuildResponse | undefined,
```


========== IMG_2461.md ==========
---
photo: IMG_2461.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 334-365 (plus sticky header 142)
orientation: 180
confidence: high
notes: Much sharper than IMG_2457/2459/2460 - only faint residual ghosting, main text fully legible. This photo confirms and corrects the uncertain tail of IMG_2460's handleFieldCommit transcription - notably eventType parameter has no default (union type "CommitEventType | 'click' | string") and the normalization check is "eventType === 'blur' || eventType === 'enter'" (IMG_2460 had incorrectly guessed 'click' there). Sticky header shows only line 142 here (the useCallback-level stickies from earlier photos have scrolled past). Explorer sidebar identical to prior photos (PolicyInformation.tsx selected, 9+ M). Branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {   // sticky-scroll header
...
334           pageBuildData: loaderData?.pageBuild as PageBuildResponse | undefined,
335           sessionInfo: policyCommitSessionInfo,
336           formMethods,
337           xmlFileName: resolvedXmlFileName,
338           onCommands: executeCommands,
339           resolveCommitPlan,
340           adaptResponseCommands,
341       });
342
343       const handleFieldCommit = useCallback(
344           async (
345               matchcode: string,
346               value: string | boolean,
347               eventType: CommitEventType | 'click' | string,
348           ) => {
349               const normalizedEventType: CommitEventType =
350                   eventType === 'blur' || eventType === 'enter' ? eventType : 'change';
351               await commitField(matchcode, value, normalizedEventType);
352           },
353           [commitField],
354       );
355
356       // Build tab configs for Tabs component
357       // Prepare normalized mapping from latest PageBuild service fields (loader-provided)
358       const normalizedPageBuildMap = React.useMemo(() => {
359           try {
360               const map = new Map<string, NormalizedField>();
361               const tabs = loaderData?.normalizedByTab || {};
362               for (const tab of Object.keys(tabs)) {
363                   const arr: NormalizedField[] = tabs[tab] || [];
364                   arr.forEach((f) => {
365   ⟪cut off by status bar⟫
```


========== IMG_2462.md ==========
---
photo: IMG_2462.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 351-381 (plus sticky headers 142, 343-344)
orientation: 180
confidence: high
notes: VS Code window is now maximized/full-screen (different chrome from prior photos - title bar shows "AQS_workspace (Workspace)"). Faint scroll-ghosting still present behind the main text but foreground is fully legible throughout. Sticky headers: 142 "const PolicyInformation: React.FC = () => {", 343 "const handleFieldCommit = useCallback(", 344 "async (". Lines 351-354 confirm the numbering already established in IMG_2461. Line 381 cut off at the right/bottom by the "No Solution"/problems status bar. Explorer sidebar identical to prior photos (PolicyInformation.tsx selected, 9+ M). Branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {   // sticky-scroll header
343       const handleFieldCommit = useCallback(       // sticky-scroll header
344           async (                                  // sticky-scroll header
...
351               await commitField(matchcode, value, normalizedEventType);
352           },
353           [commitField],
354       );
355
356       // Build tab configs for Tabs component
357
358       // Prepare normalized mapping from latest PageBuild service fields (loader-provided)
359       const normalizedPageBuildMap = React.useMemo(() => {
360           try {
361               const map = new Map<string, NormalizedField>();
362               const tabs = loaderData?.normalizedByTab || {};
363               for (const tab of Object.keys(tabs)) {
364                   const arr: NormalizedField[] = tabs[tab] || [];
365                   arr.forEach((f) => {
366                       if (f.matchcode) map.set(f.matchcode, f);
367                   });
368               }
369               return map;
370           } catch (e) {
371               return new Map<string, NormalizedField>();
372           }
373       }, [loaderData?.formKey, loaderData?.normalizedByTab]);
374
375       const pageBuildPresenceSet = React.useMemo(() => {
376           const presence = new Set<string>();
377
378           const normalizedByTab = loaderData?.normalizedByTab || {};
379           for (const tabFields of Object.values(normalizedByTab)) {
380               for (const field of tabFields || []) {
381                   const matchcode = String(field?.matchcode || '')  ⟪cut off by status bar⟫
```


========== IMG_2463.md ==========
---
photo: IMG_2463.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 359-391 (plus sticky headers 142, 359)
orientation: 180
confidence: high
notes: Same maximized VS Code window as IMG_2462, faint scroll-ghosting behind main text but foreground fully legible. Sticky headers: 142 "const PolicyInformation: React.FC = () => {", 359 "const normalizedPageBuildMap = React.useMemo(() => {". Lines 359-373 confirm the numbering already established in IMG_2462. New content: 375-391 (pageBuildPresenceSet useMemo, and start of a new controlsRaw block sourced from loaderData?.pageBuild). Line 391+ cut off by status bar. Explorer sidebar identical to prior photos (PolicyInformation.tsx selected, 9+ M). Branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {              // sticky-scroll header
359       const normalizedPageBuildMap = React.useMemo(() => {   // sticky-scroll header
...
361           const map = new Map<string, NormalizedField>();
362           const tabs = loaderData?.normalizedByTab || {};
363           for (const tab of Object.keys(tabs)) {
364               const arr: NormalizedField[] = tabs[tab] || [];
365               arr.forEach((f) => {
366                   if (f.matchcode) map.set(f.matchcode, f);
367               });
368           }
369           return map;
370       } catch (e) {
371           return new Map<string, NormalizedField>();
372       }
373   }, [loaderData?.formKey, loaderData?.normalizedByTab]);
374
375   const pageBuildPresenceSet = React.useMemo(() => {
376       const presence = new Set<string>();
377
378       const normalizedByTab = loaderData?.normalizedByTab || {};
379       for (const tabFields of Object.values(normalizedByTab)) {
380           for (const field of tabFields || []) {
381               const matchcode = String(field?.matchcode || '')
382                   .trim()
383                   .toUpperCase();
384               if (matchcode) presence.add(matchcode);
385           }
386       }
387
388       const controlsRaw =
389           typeof loaderData?.pageBuild === 'object' && loaderData?.pageBuild !== null
390               ? (
391                   loaderData.pageBuild as {
                          Page?: {   ⟪cut off by status bar⟫
```


========== IMG_2464.md ==========
---
photo: IMG_2464.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 386-394 (plus sticky headers 142, 359)
orientation: 180
confidence: high
notes: Same maximized VS Code window as IMG_2462/2463, heavier scroll-ghosting than 2463 but the bold/settled layer is legible and cross-confirms IMG_2463's lines 386-391 exactly. New content is lines 392-394, continuing the controlsRaw type-narrowing block (same "Page?: { controls?: { control?: ... } }" shape seen earlier in the file at ~lines 279-283, here re-derived from loaderData.pageBuild directly rather than pageBuildData). Sticky headers: 142, 359 (same as IMG_2463). Content cut off by status bar after line 394. Explorer sidebar identical to prior photos (PolicyInformation.tsx selected, 9+ M). Branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {              // sticky-scroll header
359       const normalizedPageBuildMap = React.useMemo(() => {   // sticky-scroll header
...
386           }
387
388       const controlsRaw =
389           typeof loaderData?.pageBuild === 'object' && loaderData?.pageBuild !== null
390               ? (
391                   loaderData.pageBuild as {
392                       Page?: {
393                           controls?: {
394                               control?:   ⟪cut off by status bar⟫
```


========== IMG_2465.md ==========
---
photo: IMG_2465.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 389-410 (plus sticky headers 142, 375)
orientation: 180
confidence: high
notes: Same maximized VS Code window as IMG_2462-2464, moderate scroll-ghosting but bold/settled layer fully legible and cross-confirms IMG_2464's lines 389-394. New content 395-410: completes the controlsRaw type-cast block (control?: Array<Record>|Record union), then normalizes to a "controls" array (Array.isArray ternary, simpler than the earlier controlArray.find() pattern - here just a for...of loop), and starts iterating: "for (const control of controls) { const matchcode = String(control['@matchcode'] ?? control.matchcode ?? '')". Sticky headers: 142, 375 "const pageBuildPresenceSet = React.useMemo(() => {". Explorer sidebar identical to prior photos (PolicyInformation.tsx selected, 9+ M). Branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {              // sticky-scroll header
375       const pageBuildPresenceSet = React.useMemo(() => {     // sticky-scroll header
...
389           typeof loaderData?.pageBuild === 'object' && loaderData?.pageBuild !== null
390               ? (
391                   loaderData.pageBuild as {
392                       Page?: {
393                           controls?: {
394                               control?:
395                                   | Array<Record<string, unknown>>
396                                   | Record<string, unknown>;
397                           };
398                       }
399                   }
400               ).Page?.controls?.control
401               : undefined;
402
403       const controls = Array.isArray(controlsRaw)
404           ? controlsRaw
405           : controlsRaw
406               ? [controlsRaw]
407               : [];
408
409       for (const control of controls) {
410           const matchcode = String(control['@matchcode'] ?? control.matchcode ?? '')
```


========== IMG_2466.md ==========
---
photo: IMG_2466.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 399-428 (plus sticky headers 142, 375, 388)
orientation: 180
confidence: high
notes: Same maximized VS Code window as IMG_2462-2465, moderate scroll-ghosting but bold/settled layer fully legible and cross-confirms IMG_2465's lines 399-410. New content 411-428: finishes the matchcode-presence loop, closes pageBuildPresenceSet's useMemo (line 417, deps [loaderData?.normalizedByTab, loaderData?.pageBuild]), derives shouldFilterStaticFieldsByPresence, and starts a new mergeFieldsWithPageBuild(fields) function with a .filter() callback. Sticky headers: 142, 375, 388 "const controlsRaw =". Explorer sidebar identical to prior photos (PolicyInformation.tsx selected, 9+ M). Branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {              // sticky-scroll header
375       const pageBuildPresenceSet = React.useMemo(() => {     // sticky-scroll header
388           const controlsRaw =                                // sticky-scroll header
...
399                   }
400               ).Page?.controls?.control
401               : undefined;
402
403       const controls = Array.isArray(controlsRaw)
404           ? controlsRaw
405           : controlsRaw
406               ? [controlsRaw]
407               : [];
408
409       for (const control of controls) {
410           const matchcode = String(control['@matchcode'] ?? control.matchcode ?? '')
411               .trim()
412               .toUpperCase();
413           if (matchcode) presence.add(matchcode);
414       }
415
416       return presence;
417   }, [loaderData?.normalizedByTab, loaderData?.pageBuild]);
418
419   const shouldFilterStaticFieldsByPresence = pageBuildPresenceSet.size > 0;
420
421   const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>
422       fields
423           .filter((f) => {
424               if (!shouldFilterStaticFieldsByPresence) return true;
425               const matchcode = String(f.matchcode || '')
426                   .trim()
427                   .toUpperCase();
428               if (!matchcode) return true;
```


========== IMG_2467.md ==========
---
photo: IMG_2467.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 403-434 (plus sticky headers 142, 375)
orientation: 180
confidence: high
notes: Same maximized VS Code window as IMG_2462-2466, moderate scroll-ghosting but bold/settled layer fully legible. Lines 403-429 confirm the numbering already established in IMG_2465/2466. New content 430-434: closes the mergeFieldsWithPageBuild .filter() callback and chains a .map((f) => {...}) that starts resolving each field's page-build value (pb) and flat default (mappedDefault) by matchcode, beginning a resolvedDefaultValue computation cut off at the bottom. Sticky headers: 142, 375 "const pageBuildPresenceSet = React.useMemo(() => {". Explorer sidebar identical to prior photos (PolicyInformation.tsx selected, 9+ M). Branch hitanshu/experimental*, 91 errors/0 warnings, "No Solution". Timestamp 5:11 PM 7/10/2026.
---
```
142   const PolicyInformation: React.FC = () => {              // sticky-scroll header
375       const pageBuildPresenceSet = React.useMemo(() => {     // sticky-scroll header
...
403       const controls = Array.isArray(controlsRaw)
404           ? controlsRaw
405           : controlsRaw
406               ? [controlsRaw]
407               : [];
408
409       for (const control of controls) {
410           const matchcode = String(control['@matchcode'] ?? control.matchcode ?? '')
411               .trim()
412               .toUpperCase();
413           if (matchcode) presence.add(matchcode);
414       }
415
416       return presence;
417   }, [loaderData?.normalizedByTab, loaderData?.pageBuild]);
418
419   const shouldFilterStaticFieldsByPresence = pageBuildPresenceSet.size > 0;
420
421   const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>
422       fields
423           .filter((f) => {
424               if (!shouldFilterStaticFieldsByPresence) return true;
425               const matchcode = String(f.matchcode || '')
426                   .trim()
427                   .toUpperCase();
428               if (!matchcode) return true;
429               return pageBuildPresenceSet.has(matchcode);
430           })
431           .map((f) => {
432               const pb = f.matchcode ? normalizedPageBuildMap.get(f.matchcode) : undefined;
433               const mappedDefault = f.matchcode ? flatDefaults?.[f.matchcode] : undefined;
434               const resolvedDefaultValue =   ⟪cut off by status bar⟫
```


========== IMG_2468.md ==========
---
photo: IMG_2468.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 420-452 (sticky header shows line 142)
orientation: 180
confidence: medium
notes: Photo has a visible double-exposure/scroll-motion ghosting artifact (faint duplicate of the code shifted ~1-2 lines, likely camera rolling-shutter during a smooth-scroll animation). Line 420 text was reconstructed from the ghost layer directly under the sticky-scroll header (medium confidence); lines 421-452 read from the sharp/bright foreground layer and cross-checked against the ghost duplicate for consistency. Sticky scroll header pinned at top: line 142 `const PolicyInformation: React.FC = () => {`. Tab bar: "PolicyInformation.tsx 9+, M" (only tab visible, 9+ unsaved changes, modified). Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > (mergeFieldsWithPageBuild scope, truncated). Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src > features): dashboard\utils (loader.ts, middleware.ts), form\utils (dynamic-form-loader.ts), legacy > components > utils (loader-optimized.ts U, loader.ts U, middleware-optimize...ts U, middleware.ts U), policy > components (LobActionMenu.tsx, PolicyInformatio...tsx 9+,M — highlighted/selected, ultimate-cover.tsx), policy > constants, policy > utils, policy > FieldRenderer.tsx, policy > index.ts, policy > policy-information-fields.ts, policy > types.ts. Status bar: branch "hitanshu/experimental*" (uncommitted changes), Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Date/time on taskbar: 7/10/2026 5:11 PM.
---
142   const PolicyInformation: React.FC = () => {
...
420       const shouldFilterStaticFieldsByPresence = pageBuildPresenceSet.size > 0;
421       const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>
422         fields
423           .filter((f) => {
424             if (!shouldFilterStaticFieldsByPresence) return true;
425             const matchcode = String(f.matchcode || '')
426               .trim()
427               .toUpperCase();
428             if (!matchcode) return true;
429             return pageBuildPresenceSet.has(matchcode);
430           })
431           .map((f) => {
432             const pb = f.matchcode ? normalizedPageBuildMap.get(f.matchcode) : undefined;
433             const mappedDefault = f.matchcode ? flatDefaults?.[f.matchcode] : undefined;
434             const resolvedDefaultValue =
435               mappedDefault !== undefined
436                 ? typeof mappedDefault === 'boolean'
437                   ? mappedDefault
438                   : String(mappedDefault)
439                 : pb?.defaultValue !== undefined
440                   ? pb.defaultValue
441                   : f.defaultValue;
442
443             if (!pb && mappedDefault === undefined) return f;
444             const merged = {
445               ...f,
446               defaultValue: resolvedDefaultValue,
447               disabled: pb?.disabled !== undefined ? pb.disabled : f.disabled,
448               visible: pb?.visible !== undefined ? pb.visible : f.visible,
449               options: pb?.options && pb.options.length ? pb.options : f.options,
450             };
451             return merged;
452           });


========== IMG_2469.md ==========
---
photo: IMG_2469.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 434-465 (sticky headers show lines 142, 421, 431)
orientation: 180
confidence: medium
notes: Same file/tab as IMG_2468, scrolled further down. Strong scroll-motion double/triple-exposure ghosting throughout the code area (editor.smoothScrolling artifact) — content for lines 434-452 duplicates IMG_2468 and was cross-checked against it; lines 453-465 are new. Lines 462-465 at the very bottom of the visible editor are sharp/unghosted. Three stacked sticky-scroll headers visible at top (nested scopes): line 142 `const PolicyInformation: React.FC = () => {`, line 421 `const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>`, line 431 `.map((f) => {`. CORRECTION: line 453 was initially misread as `};` because of the ghosting; the sharp, unghosted IMG_2470 (same file, overlapping scroll range) shows line 453 is actually BLANK — corrected below. Tab bar: "PolicyInformation.tsx 9+, M" (only tab, unsaved). Breadcrumb: aqs-web-ui > src > features > policy > compo[nents] > ... (matches IMG_2468). Explorer sidebar identical to IMG_2468 (AQS_WORKSPACE > aqs-web-ui > src > features: dashboard\utils loader.ts/middleware.ts; form\utils dynamic-form-loader.ts; legacy > components > utils loader-optimized.ts U, loader.ts U, middleware-optimize...ts U, middleware.ts U; policy > components: LobActionMenu.tsx, PolicyInformatio...tsx 9+,M selected, ultimate-cover.tsx; policy > constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts). Status bar: branch "hitanshu/experimental*", Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF. Date/time on taskbar: 7/10/2026 5:11 PM (same minute as IMG_2468).
---
142   const PolicyInformation: React.FC = () => {
...
421       const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>
...
431           .map((f) => {
...
434             const resolvedDefaultValue =
435               mappedDefault !== undefined
436                 ? typeof mappedDefault === 'boolean'
437                   ? mappedDefault
438                   : String(mappedDefault)
439                 : pb?.defaultValue !== undefined
440                   ? pb.defaultValue
441                   : f.defaultValue;
442
443             if (!pb && mappedDefault === undefined) return f;
444             const merged = {
445               ...f,
446               defaultValue: resolvedDefaultValue,
447               disabled: pb?.disabled !== undefined ? pb.disabled : f.disabled,
448               visible: pb?.visible !== undefined ? pb.visible : f.visible,
449               options: pb?.options && pb.options.length ? pb.options : f.options,
450             };
451             return merged;
452           });
453
454       const flatDefaults = React.useMemo(() => {
455         const valuesByTab = Object.values(loaderData?.initialValuesByTab || {});
456         return valuesByTab.reduce<Record<string, string | boolean | number | null>>(
457           (acc, tabValues) => ({ ...acc, ...tabValues }),
458           {},
459         );
460       }, [loaderData?.initialValuesByTab]);
461
462       const getInitialValuesForFields = (fields: NormalizedField[] = []): FormValues => {
463         const acc: FormValues = {};
464         for (const f of fields) {
465           const key = f.matchcode;


========== IMG_2471.md ==========
---
photo: IMG_2471.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 434-468 (sticky headers show lines 142, 421, 431)
orientation: 180
confidence: high
notes: Same file/tab/scroll region as IMG_2468/2469/2470 (entirely overlapping content, no new lines beyond what IMG_2470 already covers up to 476). Photo is sharp, no ghosting; used to corroborate the earlier reads, in particular confirms line 453 is BLANK (matches the correction made from IMG_2470, contradicts the ghosted IMG_2469 reading). Three stacked sticky-scroll headers: line 142 `const PolicyInformation: React.FC = () => {`, line 421 `const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>`, line 431 `.map((f) => {`. Tab bar: "PolicyInformation.tsx 9+, M". Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Explorer sidebar unchanged from prior photos (PolicyInformation.tsx selected). Status bar: branch "hitanshu/experimental*", Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF. Taskbar clock 7/10/2026 5:11 PM.
---
142   const PolicyInformation: React.FC = () => {
...
421       const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>
...
431           .map((f) => {
...
434             const resolvedDefaultValue =
...
439                 : pb?.defaultValue !== undefined
440                   ? pb.defaultValue
441                   : f.defaultValue;
442
443             if (!pb && mappedDefault === undefined) return f;
444             const merged = {
445               ...f,
446               defaultValue: resolvedDefaultValue,
447               disabled: pb?.disabled !== undefined ? pb.disabled : f.disabled,
448               visible: pb?.visible !== undefined ? pb.visible : f.visible,
449               options: pb?.options && pb.options.length ? pb.options : f.options,
450             };
451             return merged;
452           });
453
454       const flatDefaults = React.useMemo(() => {
455         const valuesByTab = Object.values(loaderData?.initialValuesByTab || {});
456         return valuesByTab.reduce<Record<string, string | boolean | number | null>>(
457           (acc, tabValues) => ({ ...acc, ...tabValues }),
458           {},
459         );
460       }, [loaderData?.initialValuesByTab]);
461
462       const getInitialValuesForFields = (fields: NormalizedField[] = []): FormValues => {
463         const acc: FormValues = {};
464         for (const f of fields) {
465           const key = f.matchcode;
466           if (!key) continue;
467           const pbDefault = flatDefaults?.[key];
468           let val: string | boolean = '';


========== IMG_2470.md ==========
---
photo: IMG_2470.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 444-476 (sticky headers show lines 142, 421, 431)
orientation: 180
confidence: high
notes: Same file/tab as IMG_2468/IMG_2469, scrolled slightly further; this photo is sharp with no scroll-motion ghosting, so it is used to correct IMG_2469's line 453 (ghosted photo mis-showed "};" there — this clean photo confirms line 453 is BLANK). Three stacked sticky-scroll headers at top: line 142 `const PolicyInformation: React.FC = () => {`, line 421 `const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>`, line 431 `.map((f) => {`. Tab bar: "PolicyInformation.tsx 9+, M" (only tab, unsaved changes). Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Explorer sidebar same as IMG_2468/2469 (PolicyInformation.tsx selected/highlighted under policy > components, alongside LobActionMenu.tsx and ultimate-cover.tsx; loader-optimized.ts/loader.ts/middleware-optimize...ts/middleware.ts marked U under legacy/utils). Status bar: branch "hitanshu/experimental*", Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF. Taskbar clock 7/10/2026 5:11 PM.
---
142   const PolicyInformation: React.FC = () => {
...
421       const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>
...
431           .map((f) => {
...
444             const merged = {
...
447               disabled: pb?.disabled !== undefined ? pb.disabled : f.disabled,
448               visible: pb?.visible !== undefined ? pb.visible : f.visible,
449               options: pb?.options && pb.options.length ? pb.options : f.options,
450             };
451             return merged;
452           });
453
454       const flatDefaults = React.useMemo(() => {
455         const valuesByTab = Object.values(loaderData?.initialValuesByTab || {});
456         return valuesByTab.reduce<Record<string, string | boolean | number | null>>(
457           (acc, tabValues) => ({ ...acc, ...tabValues }),
458           {},
459         );
460       }, [loaderData?.initialValuesByTab]);
461
462       const getInitialValuesForFields = (fields: NormalizedField[] = []): FormValues => {
463         const acc: FormValues = {};
464         for (const f of fields) {
465           const key = f.matchcode;
466           if (!key) continue;
467           const pbDefault = flatDefaults?.[key];
468           let val: string | boolean = '';
469           if (pbDefault !== undefined) {
470             val = typeof pbDefault === 'boolean' ? pbDefault : String(pbDefault);
471           } else if (f.defaultValue !== undefined) {
472             val = typeof f.defaultValue === 'boolean' ? f.defaultValue : String(f.defaultValue);
473           }
474           // If this is a select/combo field and the provided default looks like a
475           // display label (not the option.value), try to map it to the canonical
476           // option.value so the select doesn't create a synthetic option.


========== IMG_2472.md ==========
---
photo: IMG_2472.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 454-481 (sticky headers show lines 142, 421, 431)
orientation: 180
confidence: high
notes: Same file/tab as prior photos in this sequence, scrolled further down; reveals new lines 477-481 beyond IMG_2470's range. Lines 454-472 duplicate and confirm IMG_2470/2471 exactly (including blank line 453, visible in sticky-collapsed view here). Three stacked sticky-scroll headers: line 142 `const PolicyInformation: React.FC = () => {`, line 421 `const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>`, line 431 `.map((f) => {` (with a 4th collapsed sticky row visibly showing stray leftover "return merged;" / "});" pixels from the sticky-scroll transition, then real content resumes at 452). Photo is sharp, minimal ghosting only in the sticky-header transition band. Tab bar: "PolicyInformation.tsx 9+, M". Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF. Taskbar clock 7/10/2026 5:11 PM. Lines 477-481 show the start of a multi-line `if (` condition (select/combo default-value canonicalization logic) continuing beyond the visible editor area at line 481, cut off by the taskbar.
---
142   const PolicyInformation: React.FC = () => {
...
421       const mergeFieldsWithPageBuild = (fields: NormalizedField[] = []): NormalizedField[] =>
...
431           .map((f) => {
...
452           });
453
454       const flatDefaults = React.useMemo(() => {
455         const valuesByTab = Object.values(loaderData?.initialValuesByTab || {});
...
469           if (pbDefault !== undefined) {
470             val = typeof pbDefault === 'boolean' ? pbDefault : String(pbDefault);
471           } else if (f.defaultValue !== undefined) {
472             val = typeof f.defaultValue === 'boolean' ? f.defaultValue : String(f.defaultValue);
473           }
474           // If this is a select/combo field and the provided default looks like a
475           // display label (not the option.value), try to map it to the canonical
476           // option.value so the select doesn't create a synthetic option.
477           if (
478             typeof val === 'string' &&
479             val !== '' &&
480             (f.controlType === 'select' || String(f.controlType) === 'combo') &&
481             Array.isArray(f.options) &&


========== IMG_2473.md ==========
---
photo: IMG_2473.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 462-497 (sticky headers show lines 142, 462)
orientation: 180
confidence: high
notes: Same file/tab, scrolled further; completes the getInitialValuesForFields function (through its closing return at 497). Lines 462-481 confirm/duplicate IMG_2471/2472; lines 482-497 are new. Mild scroll-motion ghosting present around lines 480-491 (faint duplicate offset ~1 line) but text is legible and internally consistent with the gutter numbers. Two stacked sticky-scroll headers: line 142 `const PolicyInformation: React.FC = () => {`, line 462 `const getInitialValuesForFields = (fields: NormalizedField[] = []): FormValues => {`. Tab bar: "PolicyInformation.tsx 9+, M". Breadcrumb: aqs-web-ui > src > features > policy > components > PolicyInformation.tsx > ... Explorer sidebar unchanged (PolicyInformation.tsx selected; loader-optimized.ts/loader.ts/middleware-optimize...ts/middleware.ts marked U). Status bar: branch "hitanshu/experimental*", Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF. Taskbar clock 7/10/2026 5:11 PM.
---
142   const PolicyInformation: React.FC = () => {
...
462       const getInitialValuesForFields = (fields: NormalizedField[] = []): FormValues => {
...
466           if (!key) continue;
467           const pbDefault = flatDefaults?.[key];
468           let val: string | boolean = '';
469           if (pbDefault !== undefined) {
470             val = typeof pbDefault === 'boolean' ? pbDefault : String(pbDefault);
471           } else if (f.defaultValue !== undefined) {
472             val = typeof f.defaultValue === 'boolean' ? f.defaultValue : String(f.defaultValue);
473           }
474           // If this is a select/combo field and the provided default looks like a
475           // display label (not the option.value), try to map it to the canonical
476           // option.value so the select doesn't create a synthetic option.
477           if (
478             typeof val === 'string' &&
479             val !== '' &&
480             (f.controlType === 'select' || String(f.controlType) === 'combo') &&
481             Array.isArray(f.options) &&
482             f.options.length > 0
483           ) {
484             const asStr = String(val).trim();
485             // If value already matches an option.value, keep it
486             if (!f.options.some((o) => String(o.value) === asStr)) {
487               // Try to match by label (case-insensitive)
488               const found = f.options.find(
489                 (o) => String(o.label).trim().toUpperCase() === asStr.toUpperCase(),
490               );
491               if (found) val = String(found.value);
492             }
493           }
494           if (f.controlType === 'checkbox') val = Boolean(val ?? false);
495           acc[key] = val;
496         }
497         return acc;


========== IMG_2474.md ==========
---
photo: IMG_2474.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 462-502 (sticky headers show lines 142, 462)
orientation: 180
confidence: high
notes: Same file/tab, scrolled further; confirms getInitialValuesForFields ends at line 498 with `};`, followed by a blank line and new comment block at 500-502 introducing the next section (button-state/required-fields validation, and a note about merging rendererFormValues with watched RHF values). Lines 462-497 duplicate and confirm IMG_2473. Two stacked sticky-scroll headers: line 142 `const PolicyInformation: React.FC = () => {`, line 462 `const getInitialValuesForFields = (fields: NormalizedField[] = []): FormValues => {`. Tab bar: "PolicyInformation.tsx 9+, M". Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF. Taskbar clock 7/10/2026 5:11 PM. Line 502 comment is truncated at the right edge of the editor pane in this photo ("...from external updates)") but fully legible.
---
142   const PolicyInformation: React.FC = () => {
...
462       const getInitialValuesForFields = (fields: NormalizedField[] = []): FormValues => {
...
494           if (f.controlType === 'checkbox') val = Boolean(val ?? false);
495           acc[key] = val;
496         }
497         return acc;
498       };
499
500       // Validate required fields and compute button state overrides
501       // Uses form values and normalized field definitions to determine if OK/NEXT should be enabled
502       // Merge rendererFormValues (from FormRenderer) with watched RHF values (from external updates)


========== IMG_2475.md ==========
---
photo: IMG_2475.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 502-512 (sticky headers show lines 142, 462; a stray/stale third sticky row showing "482 f.options.length > 0" is likely a scroll-transition rendering artifact, not live)
orientation: 180
confidence: high
notes: Same file/tab, scrolled further past the end of getInitialValuesForFields (which closed at line 498, confirmed in IMG_2474). New content: a debug console.log block merging RHF watched values with FormRenderer values. Line 502 repeats the comment already seen at the bottom of IMG_2474. Photo is sharp/clear in the code area. Tab bar: "PolicyInformation.tsx 9+, M". Explorer sidebar unchanged (PolicyInformation.tsx selected). Status bar: branch "hitanshu/experimental*", Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 7/10/2026 5:11 PM.
---
142   const PolicyInformation: React.FC = () => {
...
462       const getInitialValuesForFields = (fields: NormalizedField[] = []): FormValues => {
...
502       // Merge rendererFormValues (from FormRenderer) with watched RHF values (from external updates)
503
504       const watchedFormValues = (formMethods as any).watch?.() || formMethods.getValues();
505       // Use renderer values as primary source, fallback to RHF watched values
506       const mergedFormValues = { ...watchedFormValues, ...rendererFormValues };
507
508       console.log('[PolicyInformation] DEBUG - Merged form values:', {
509         rhfValues: watchedFormValues,
510         rendererValues: rendererFormValues,
511         merged: mergedFormValues,
512       });


========== IMG_2476.md ==========
---
photo: IMG_2476.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 510-523 (sticky headers show lines 142, 462)
orientation: 180
confidence: high
notes: Same file/tab, scrolled further; lines 510-512 duplicate/confirm the tail of IMG_2475's console.log block. New content: blank line 513, then a `handleFieldInfoClick` field-level action handler (info icon click for "POLPOL_NRLVDAT") spanning 514-523. Mild scroll-motion ghosting present (faint duplicate offset a few lines) but text unambiguous against the sharp gutter numbers. Two stacked sticky-scroll headers: line 142 `const PolicyInformation: React.FC = () => {`, line 462 `const getInitialValuesForFields = (fields: NormalizedField[] = []): FormValues => {` (this second header is stale/carried over from an earlier scroll position, since code at 510-523 is well past where getInitialValuesForFields closed at line 498 — transcribed as observed). Tab bar: "PolicyInformation.tsx 9+, M". Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 7/10/2026 5:11 PM.
---
142   const PolicyInformation: React.FC = () => {
...
462       const getInitialValuesForFields = (fields: NormalizedField[] = []): FormValues => {
...
510         rendererValues: rendererFormValues,
511         merged: mergedFormValues,
512       });
513
514       // Field-level action: info icon click handler for POLPOL_NRLVDAT only
515       const handleFieldInfoClick = (field: NormalizedField, value: string | boolean) => {
516         const infoTriggerMatchcode = field.infoMatchcode ?? field.matchcode;
517         console.log('[InfoIcon] Clicked info icon', {
518           fieldMatchcode: field.matchcode,
519           infoTriggerMatchcode,
520           value,
521         });
522         void handleFieldCommit(infoTriggerMatchcode, value, 'click');
523       };


========== IMG_2477.md ==========
---
photo: IMG_2477.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 520-534 (sticky headers show lines 142, 502)
orientation: 180
confidence: high
notes: Same file/tab, scrolled further; lines 520-523 duplicate/confirm the tail of IMG_2476's handleFieldInfoClick. New content: blank line 524, a comment, and the start of a getDefaultButtonOrder helper function with a DEFAULT_BUTTON_ORDER lookup record (525-534). Moderate scroll-motion ghosting present (faint duplicate offset ~3-4 lines) but text unambiguous against the sharp gutter numbers. Two stacked sticky-scroll headers: line 142 `const PolicyInformation: React.FC = () => {`, line 502 `// Merge rendererFormValues (from FormRenderer) with watched RHF values (from external updates)`. Tab bar: "PolicyInformation.tsx 9+, M". Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 7/10/2026 5:11 PM. DEFAULT_BUTTON_ORDER record continues past the visible editor area (last visible key line 534, more likely follow before the closing brace, not captured in this photo).
---
142   const PolicyInformation: React.FC = () => {
...
502       // Merge rendererFormValues (from FormRenderer) with watched RHF values (from external updates)
...
520           fieldMatchcode: field.matchcode,
521         });
522         void handleFieldCommit(infoTriggerMatchcode, value, 'click');
523       };
524
525       // Helper: Get default order for button by matchcode
526       const getDefaultButtonOrder = (matchcode: string): number => {
527         const DEFAULT_BUTTON_ORDER: Record<string, number> = {
528           NEXT: 1,
529           OK: 2,
530           CANCEL: 3,
531           OKSPECIAL: 4,
532           SUBMIT: 5,
533           SAVE: 6,
534           APPLY: 7,


========== IMG_2478.md ==========
---
photo: IMG_2478.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 524-549 (sticky headers show lines 142, 515)
orientation: 180
confidence: medium
notes: Same file/tab, scrolled further; lines 524-534 duplicate/confirm IMG_2477's getDefaultButtonOrder start. New content: the rest of the DEFAULT_BUTTON_ORDER record (535-544), the function body finishing with toUpperCase lookup (545-547), its closing `};` (548), and the start of a new `validatedPageButtons = useMemo(() => {` block (549). Heavy scroll-motion double-exposure ghosting throughout (two overlapping scroll positions offset by ~8-9 lines with near-identical structure, since the record entries are short and repetitive) — content reconstructed by matching bright/bold text against the sharp gutter line numbers; confidence downgraded to medium because of this. Two stacked sticky-scroll headers: line 142 `const PolicyInformation: React.FC = () => {`, line 515 `const handleFieldInfoClick = (field: NormalizedField, value: string | boolean) => {` (stale/carried over — actual content at 524+ is past this function). Tab bar: "PolicyInformation.tsx 9+, M". Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 7/10/2026 5:11 PM.
---
142   const PolicyInformation: React.FC = () => {
...
515       const handleFieldInfoClick = (field: NormalizedField, value: string | boolean) => {
...
524
525       // Helper: Get default order for button by matchcode
526       const getDefaultButtonOrder = (matchcode: string): number => {
527         const DEFAULT_BUTTON_ORDER: Record<string, number> = {
528           NEXT: 1,
529           OK: 2,
530           CANCEL: 3,
531           OKSPECIAL: 4,
532           SUBMIT: 5,
533           SAVE: 6,
534           APPLY: 7,
535           ADD: 10,
536           DELETE: 11,
537           SEARCH: 20,
538           SET_SEARCH: 21,
539           RATE: 22,
540           BACK: 80,
541           RESET: 81,
542           CLEAR: 82,
543           HEADERBTN1: 100,
544           PATHUPDATE: 100,
545         };
546         const upper = matchcode.toUpperCase();
547         return DEFAULT_BUTTON_ORDER[upper] ?? 50;
548       };
549       const validatedPageButtons = useMemo(() => {


========== IMG_2479.md ==========
---
photo: IMG_2479.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 526-565 (sticky headers show lines 142, 526, 527)
orientation: 180
confidence: medium
notes: Same file/tab, scrolled further. Lines 526-544 (DEFAULT_BUTTON_ORDER record tail, visible via sticky header + a brief glimpse of DELETE/SEARCH/SET_SEARCH entries) duplicate/confirm IMG_2478's transcription and cross-validate its line numbers. Line 549 `const validatedPageButtons = useMemo(() => {` is confirmed from IMG_2478. VERY heavy scroll-motion double-exposure ghosting in the 550-565 range (worse than other photos in this set) made exact line-number attribution for interior lines difficult — the code CONTENT/ORDER below is high confidence (reconstructed and cross-checked across multiple zoomed crops), but the precise line numbers for 550-564 are lower confidence (could be off by ~1 line in places); line 565 (console.log start) is confirmed sharp/unambiguous at the bottom of the visible editor. Two/three stacked sticky-scroll headers: line 142 `const PolicyInformation: React.FC = () => {`, line 526 `const getDefaultButtonOrder = (matchcode: string): number => {`, line 527 `const DEFAULT_BUTTON_ORDER: Record<string, number> = {`. Tab bar: "PolicyInformation.tsx 9+, M". Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", Problems 91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 7/10/2026 5:11 PM. Line 565's console.log call body continues beyond the visible editor area (cut off by the taskbar), not captured in this photo.
---
142   const PolicyInformation: React.FC = () => {
...
526       const getDefaultButtonOrder = (matchcode: string): number => {
527         const DEFAULT_BUTTON_ORDER: Record<string, number> = {
...
536           DELETE: 11,
537           SEARCH: 20,
538           SET_SEARCH: 21,
...
549       const validatedPageButtons = useMemo(() => {
550
551         try {
552           const normalizedPageButtons = (loaderData?.pageButtons || []).map((btn) => ({
553             ...btn,
554             disabled: Boolean(btn.disabled),
555             visible: btn.visible ?? true,
556           }));
557
558           // Validate only fields that remain renderable after static presence filtering/merging.
559           const allFields = Object.values(normalizedStaticByTab).flatMap((tabFields) =>
560             mergeFieldsWithPageBuild((tabFields || []) as NormalizedField[]).filter(
561               (field) => field.visible !== false,
562             ),
563           );
564
565           console.log('[PolicyInformation] DEBUG - Raw allFields structure:', {


========== IMG_2492.md ==========
---
photo: IMG_2492.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 714-765
orientation: 180
confidence: high
notes: >
  Sticky-scroll headers at top show enclosing scope lines 142, 663, 667, 714
  (repeated below with real line numbers): line 142
  "const PolicyInformation: React.FC = () => {"; line 663
  "const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({";
  line 667 "render: () => (". The line 714 sticky header row shows
  "{(() => {" with a faint/ghosted fragment resembling "...interface..."
  partially overlapping beneath it — this looks like a rendering artifact of
  the sticky-scroll bar transition, not actual code; excluded from
  transcription as unreliable. Editor gutter jumps 714 -> 737 (lines 715-736
  scrolled under the sticky header, not visible in this photo). Explorer
  sidebar (aqs-web-ui/src/features/policy/components) shows files:
  LobActionMenu.tsx, PolicyInformation.tsx (active, "9+, M" tab badge),
  ultimate-cover.tsx; parent dirs constants>, utils>, and files
  FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts.
  Higher up the tree: dashboard\utils (loader.ts, middleware.ts), form\utils
  (dynamic-form-loader.ts), legacy>components>, legacy>utils> (loader-optimized.ts U,
  loader.ts U, middleware-optimize....ts U, middleware.ts U — "U" = untracked/modified
  git indicator), policy>components>. Breadcrumb:
  aqs-web-ui > src > features > policy > components > PolicyInformation.tsx.
  Status bar: workspace "AQS_workspace", branch hitanshu/experimental*,
  91 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript JSX. Timestamp 5:11 PM 7/10/2026.
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (
714               {(() => {

Visible code body:
737                       fields={mergedRight}
738                       initialValues={getInitialValuesForFields(
739                           mergedRight,
740                       )}
741                       onCommitField={handleFieldCommit}
742                       onValuesChange={handleFormValuesChange}
743                       useReactHookForm={true}
744                       fieldsPerRow={1}
745                       onInfoClick={handleFieldInfoClick}
746                   />
747               );
748           })()}
749       </div>
750   </div>
751   <Divider className="mb-3!" />
752   {/* Secondary policy fields (Policy Type / PMA / Profession / Business / State /
753   <div className="grid grid-cols-2 gap-6 pt-2">
754       <div>
755           {(() => {
756               const groupLeft = [
757                   'POLPOL_LPOLTYP',
758                   'POLPOL_LPMADES',
759                   'POLPOLV3X_LBUSDES',
760               ];
761               const leftFields = groupLeft
762                   .map((mc) =>
763                       normalizedStaticByTab['TABPOL']?.find(
764                           (f) => f.matchcode === mc,
765                       )


========== IMG_2493.md ==========
---
photo: IMG_2493.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 751-781
orientation: 180
confidence: medium
notes: >
  Photo shows motion blur / double-exposure ghosting from an in-progress
  smooth-scroll animation — every code line has a faint offset duplicate
  trail behind the sharp/settled text. Line-to-text alignment for 766-781 was
  reconstructed by cross-referencing multiple tight crops (verified 767="const
  merged = mergeFieldsWithPageBuild(leftFields);", 768="return (",
  769="<FormRenderer", ... 774="useReactHookForm={true}" appeared identically
  in two independent crops, and the tail 774-781 crop was internally
  consistent) plus logical code continuity from the clean IMG_2492 capture
  (which ends at line 765 "()" closing the .find() call). Lines 751-765
  duplicate the same block already transcribed cleanly in IMG_2492 (which had
  no ghosting) and are repeated here for completeness since visible in this
  photo; content cross-validated identical between the two photos. Sticky-scroll
  header lines 142, 663, 667 repeated as in IMG_2492. Line 781 area at bottom
  of viewport appears blank (no further code visible before status bar).
  Explorer sidebar same as IMG_2492 (policy/components: LobActionMenu.tsx,
  PolicyInformation.tsx active, ultimate-cover.tsx; constants>, utils>,
  FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts).
  Status bar: AQS_workspace, branch hitanshu/experimental*, 91 errors/0
  warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX,
  5:11 PM 7/10/2026 (same timestamp as IMG_2492 — photos taken seconds apart).
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (

Visible code body:
751   <Divider className="mb-3!" />
752   {/* Secondary policy fields (Policy Type / PMA / Profession / Business / State /
753   <div className="grid grid-cols-2 gap-6 pt-2">
754       <div>
755           {(() => {
756               const groupLeft = [
757                   'POLPOL_LPOLTYP',
758                   'POLPOL_LPMADES',
759                   'POLPOLV3X_LBUSDES',
760               ];
761               const leftFields = groupLeft
762                   .map((mc) =>
763                       normalizedStaticByTab['TABPOL']?.find(
764                           (f) => f.matchcode === mc,
765                       )
766                   .filter(Boolean) as NormalizedField[];
767               const merged = mergeFieldsWithPageBuild(leftFields);
768               return (
769                   <FormRenderer
770                       fields={merged}
771                       initialValues={getInitialValuesForFields(merged)}
772                       onCommitField={handleFieldCommit}
773                       onValuesChange={handleFormValuesChange}
774                       useReactHookForm={true}
775                       fieldsPerRow={1}
776                       onInfoClick={handleFieldInfoClick}
777                   />
778               );
779           })()}
780       </div>
781


========== IMG_2494.md ==========
---
photo: IMG_2494.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 755-794
orientation: 180
confidence: medium
notes: >
  Same in-progress smooth-scroll motion blur/ghosting as IMG_2493 (sharp
  "settled" text overlapping a fainter offset trail of the prior scroll
  frame). Lines 755-778 duplicate content already verbatim-confirmed in
  IMG_2492/IMG_2493 (left-column secondary-fields block) and are repeated
  here only for completeness since visible in this photo. Lines 779-794 are
  new: reconstructed from bold/settled text plus structural symmetry with the
  left-column block (779-793 mirror 754-765/766's pattern exactly: opens a
  second sibling <div> for a "groupRight" field set of 4 matchcodes, same
  .map/.find/close-paren shape) — cross-checked against two independent crops
  which agreed on row 779="})()}", 780="</div>", and the groupRight array
  entries. Line 794 (".filter(Boolean) as NormalizedField[];") was initially
  illegible (bottom edge of viewport, obscured by scrollbar+taskbar) but is
  confirmed by cross-reference against IMG_2495, which shows the same line
  clearly a moment later in the scroll sequence. Sticky-scroll header lines 142, 663, 667 repeated as in
  prior photos. Explorer sidebar unchanged from IMG_2492/2493. Status bar:
  AQS_workspace, branch hitanshu/experimental*, 91 errors/0 warnings, No
  Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM
  7/10/2026.
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (

Visible code body (755-778 duplicate IMG_2492/IMG_2493, repeated for completeness):
755           {(() => {
756               const groupLeft = [
757                   'POLPOL_LPOLTYP',
758                   'POLPOL_LPMADES',
759                   'POLPOLV3X_LBUSDES',
760               ];
761               const leftFields = groupLeft
762                   .map((mc) =>
763                       normalizedStaticByTab['TABPOL']?.find(
764                           (f) => f.matchcode === mc,
765                       )
766                   .filter(Boolean) as NormalizedField[];
767               const merged = mergeFieldsWithPageBuild(leftFields);
768               return (
769                   <FormRenderer
770                       fields={merged}
771                       initialValues={getInitialValuesForFields(merged)}
772                       onCommitField={handleFieldCommit}
773                       onValuesChange={handleFormValuesChange}
774                       useReactHookForm={true}
775                       fieldsPerRow={1}
776                       onInfoClick={handleFieldInfoClick}
777                   />
778               );

New content:
779           })()}
780       </div>
781       <div>
782           {(() => {
783               const groupRight = [
784                   'POLPOL_LBUSTYP',
785                   'POLPOL_LPRISTANAM',
786                   'POLPOLEXT_SaFcdt_StringValue',
787                   'POLPOLEXT_DocSta_StringValue',
788               ];
789               const rightFields = groupRight
790                   .map((mc) =>
791                       normalizedStaticByTab['TABPOL']?.find(
792                           (f) => f.matchcode === mc,
793                       )
794               .filter(Boolean) as NormalizedField[];


========== IMG_2495.md ==========
---
photo: IMG_2495.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 780-810
orientation: 180
confidence: medium
notes: >
  Same in-progress smooth-scroll motion blur/ghosting as IMG_2493/IMG_2494.
  Lines 780-794 duplicate content already transcribed in IMG_2494 (right
  block/"groupRight" opening) and are repeated here for completeness. Lines
  795-809 are new (right-column mirror of the FormRenderer block seen for
  groupLeft in IMG_2492/2493, closing with two nested </div>). Line numbers
  for the blurred region were derived by sequential counting of code lines
  from the clean, non-blurred anchor in IMG_2492 (line 765) forward through
  IMG_2493's clearer crops (which independently confirmed lines 766-780),
  rather than by pixel-matching row labels to text in this photo directly —
  direct pixel alignment in this photo and IMG_2494 was tried but showed an
  inconsistent ~1-line jitter against the clean anchors, so is treated as
  less reliable than the sequential derivation. Line 810 at the very bottom
  of the viewport shows no code (blank / not yet scrolled into view before
  the status bar). Sticky-scroll header lines 142, 663, 667 repeated as in
  prior photos. Explorer sidebar unchanged. Status bar: AQS_workspace, branch
  hitanshu/experimental*, 91 errors/0 warnings, No Solution, Ln 1 Col 1, Tab
  Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM 7/10/2026.
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (

Visible code body (780-794 duplicate IMG_2494, repeated for completeness):
780       </div>
781       <div>
782           {(() => {
783               const groupRight = [
784                   'POLPOL_LBUSTYP',
785                   'POLPOL_LPRISTANAM',
786                   'POLPOLEXT_SaFcdt_StringValue',
787                   'POLPOLEXT_DocSta_StringValue',
788               ];
789               const rightFields = groupRight
790                   .map((mc) =>
791                       normalizedStaticByTab['TABPOL']?.find(
792                           (f) => f.matchcode === mc,
793                       )
794               .filter(Boolean) as NormalizedField[];

New content:
795           const merged = mergeFieldsWithPageBuild(rightFields);
796           return (
797               <FormRenderer
798                   fields={merged}
799                   initialValues={getInitialValuesForFields(merged)}
800                   onCommitField={handleFieldCommit}
801                   onValuesChange={handleFormValuesChange}
802                   useReactHookForm={true}
803                   fieldsPerRow={1}
804                   onInfoClick={handleFieldInfoClick}
805               />
806           );
807       })()}
808   </div>
809   </div>
810   (blank / not visible)


========== IMG_2496.md ==========
---
photo: IMG_2496.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 809-836
orientation: 180
confidence: medium
notes: >
  Severe motion blur / scroll ghosting when first transcribed — line numbers
  were initially a best-effort sequential estimate. CORRECTED: cross-checked
  and shifted +4 against IMG_2497, a sharp non-blurred capture of the same
  region moments later, which gave an exact, high-confidence anchor (its line
  820 = "</Typography>" matches this photo's blurred content one-for-one down
  to punctuation once shifted +4). Numbers below are now high-confidence for
  content/order; still marked medium overall since they rely on the
  cross-photo correction rather than a direct clean read of this photo itself.
  Content: end of the "groupRight" FormRenderer block (from IMG_2494/2495),
  a Divider, a new "{/* Insured / Agency highlight panel: render correct
  fields from TABPOL */}" comment, and the opening of an "Insured
  Information" panel (Typography heading + an IIFE building an `arr` of 3
  normalizedStaticByTab lookups by matchcode POLNAM_LINSPRINAM_1 /
  POLNAM_LINSCTY_1 / POLNAM_LINSSTA_1, then .filter(Boolean),
  mergeFieldsWithPageBuild, and the start of a <FormRenderer
  fields={merged}...). Sticky-scroll shows 142, 663, 667, plus a 4th deeper
  sticky line reading "{(() => {" for the still-open groupRight IIFE.
  Explorer sidebar unchanged. Status bar: AQS_workspace, branch
  hitanshu/experimental*, 91 errors/0 warnings, No Solution, Ln 1 Col 1, Tab
  Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM 7/10/2026.
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (
~821              {(() => {   [deeper sticky line, still-open groupRight IIFE]

Visible code body:
809               );
810           })()}
811       </div>
812   </div>
813   <Divider className="my-3!" />
814   {/* Insured / Agency highlight panel: render correct fields from TABPOL */}
815   <div className=" pt-4">
816       <div className="grid grid-cols-2 gap-6">
817           <div className="">
818               <Typography className="clsDivHeader tab-heading">
819                   Insured Information
820               </Typography>
821               {(() => {
822                   const arr = [
823                       normalizedStaticByTab['TABPOL']?.find(
824                           (f) => f.matchcode === 'POLNAM_LINSPRINAM_1',
825                       ),
826                       normalizedStaticByTab['TABPOL']?.find(
827                           (f) => f.matchcode === 'POLNAM_LINSCTY_1',
828                       ),
829                       normalizedStaticByTab['TABPOL']?.find(
830                           (f) => f.matchcode === 'POLNAM_LINSSTA_1',
831                       ),
832                   ].filter(Boolean) as NormalizedField[];
833                   const merged = mergeFieldsWithPageBuild(arr);
834                   return (
835                       <FormRenderer
836                           fields={merged}


========== IMG_2497.md ==========
---
photo: IMG_2497.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 820-849
orientation: 180
confidence: high
notes: >
  Sharp, non-blurred capture (unlike IMG_2493-2496) — camera caught the
  screen at rest after scrolling settled. This cleanly confirms/corrects the
  line numbering guessed in IMG_2496 (whose content was the same region,
  numbered ~4 lines too low there due to motion-blur uncertainty); IMG_2496
  has been corrected to match. Note this FormRenderer instance (Insured
  Information) has only fields/initialValues/onCommitField/useReactHookForm/
  fieldsPerRow/onInfoClick — no onValuesChange prop, unlike the groupLeft/
  groupRight FormRenderer instances seen in IMG_2492-2495. Sticky-scroll
  header shows only 142, 663, 667 here (the deeper "Insured Information" IIFE
  sticky line is not shown/has scrolled past differently than IMG_2496).
  Explorer sidebar same policy/components file list as before. Status bar:
  AQS_workspace, branch hitanshu/experimental*, 91 errors/0 warnings, No
  Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:11 PM
  7/10/2026.
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (

Visible code body:
820                   </Typography>
821                   {(() => {
822                       const arr = [
823                           normalizedStaticByTab['TABPOL']?.find(
824                               (f) => f.matchcode === 'POLNAM_LINSPRINAM_1',
825                           ),
826                           normalizedStaticByTab['TABPOL']?.find(
827                               (f) => f.matchcode === 'POLNAM_LINSCTY_1',
828                           ),
829                           normalizedStaticByTab['TABPOL']?.find(
830                               (f) => f.matchcode === 'POLNAM_LINSSTA_1',
831                           ),
832                       ].filter(Boolean) as NormalizedField[];
833                       const merged = mergeFieldsWithPageBuild(arr);
834                       return (
835                           <FormRenderer
836                               fields={merged}
837                               initialValues={getInitialValuesForFields(
838                                   merged,
839                               )}
840                               onCommitField={handleFieldCommit}
841                               useReactHookForm={true}
842                               fieldsPerRow={1}
843                               onInfoClick={handleFieldInfoClick}
844                           />
845                       );
846                   })()}
847               </div>
848               <div>
849                   <Typography className="clsDivHeader tab-heading">


========== IMG_2498.md ==========
---
photo: IMG_2498.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 821-860
orientation: 180
confidence: medium
notes: >
  Motion-blur/scroll ghosting again (two overlapping frames offset by ~2
  lines), similar to IMG_2493-2496, but content is well cross-validated: (a)
  lines 821-849 exactly duplicate the sharp, high-confidence content already
  confirmed in IMG_2497 (Insured Information FormRenderer block, closing
  divs, and the opening Typography of the next panel); (b) lines 850-860 are
  new "Agency Information" content whose structure exactly mirrors the
  "Insured Information" block line-for-line (same IIFE/const arr/.find/
  .filter/mergeFieldsWithPageBuild/FormRenderer shape), so line numbers were
  assigned by direct positional analogy with the confirmed Insured
  Information numbering from IMG_2497, then checked against the (blurred but
  legible) gutter digits in multiple tight crops, which agreed. Matchcodes
  captured so far for the Agency arr: 'POLAGT_LAGTNUM_1', 'POLAGT_LPCRNUM_1',
  and a third find() call beginning at the very bottom edge (line 860,
  matchcode not yet visible — cut off by viewport). Sticky-scroll header
  shows 142, 663, 667, plus deeper sticky lines "{(() => {" (821) and "const
  arr = [" (822) for the still-open Insured-Information IIFE. Timestamp 5:12
  PM (one minute after IMG_2492-2497's 5:11 PM). Explorer sidebar unchanged.
  Status bar: AQS_workspace, branch hitanshu/experimental*, 91 errors/0
  warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX.
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (
821               {(() => {
822                   const arr = [

Visible code body (821-849 duplicate IMG_2497, repeated for completeness):
832                   ].filter(Boolean) as NormalizedField[];
833                   const merged = mergeFieldsWithPageBuild(arr);
834                   return (
835                       <FormRenderer
836                           fields={merged}
837                           initialValues={getInitialValuesForFields(
838                               merged,
839                           )}
840                           onCommitField={handleFieldCommit}
841                           useReactHookForm={true}
842                           fieldsPerRow={1}
843                           onInfoClick={handleFieldInfoClick}
844                       />
845                   );
846               })()}
847           </div>
848           <div>
849               <Typography className="clsDivHeader tab-heading">

New content:
850                   Agency Information
851               </Typography>
852               {(() => {
853                   const arr = [
854                       normalizedStaticByTab['TABPOL']?.find(
855                           (f) => f.matchcode === 'POLAGT_LAGTNUM_1',
856                       ),
857                       normalizedStaticByTab['TABPOL']?.find(
858                           (f) => f.matchcode === 'POLAGT_LPCRNUM_1',
859                       ),
860                       normalizedStaticByTab['TABPOL']?.find(


========== IMG_2499.md ==========
---
photo: IMG_2499.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 849-878
orientation: 180
confidence: high
notes: >
  Sharp, non-blurred capture (like IMG_2497). Confirms and extends
  IMG_2498's tail: the "Agency Information" panel actually has SIX field
  lookups (LAGTNUM, LPCRNUM, LAGTPRINAM, LPCRNAM, LAGTCTY, LAGTSTA), not
  three as the parallel-structure guess in IMG_2498 might have suggested —
  IMG_2498 itself only had visibility through line 860 and is confirmed
  correct as far as it went, no correction needed there. Sticky-scroll shows
  only 142, 663, 667 (no deeper sticky line visible in this shot). Explorer
  sidebar unchanged. Status bar: AQS_workspace, branch hitanshu/experimental*,
  91 errors/0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript JSX, 5:12 PM 7/10/2026.
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (

Visible code body:
849               <Typography className="clsDivHeader tab-heading">
850                   Agency Information
851               </Typography>
852               {(() => {
853                   const arr = [
854                       normalizedStaticByTab['TABPOL']?.find(
855                           (f) => f.matchcode === 'POLAGT_LAGTNUM_1',
856                       ),
857                       normalizedStaticByTab['TABPOL']?.find(
858                           (f) => f.matchcode === 'POLAGT_LPCRNUM_1',
859                       ),
860                       normalizedStaticByTab['TABPOL']?.find(
861                           (f) => f.matchcode === 'POLAGT_LAGTPRINAM_1',
862                       ),
863                       normalizedStaticByTab['TABPOL']?.find(
864                           (f) => f.matchcode === 'POLAGT_LPCRNAM_1',
865                       ),
866                       normalizedStaticByTab['TABPOL']?.find(
867                           (f) => f.matchcode === 'POLAGT_LAGTCTY_1',
868                       ),
869                       normalizedStaticByTab['TABPOL']?.find(
870                           (f) => f.matchcode === 'POLAGT_LAGTSTA_1',
871                       ),
872                   ].filter(Boolean) as NormalizedField[];
873                   const merged = mergeFieldsWithPageBuild(arr);
874                   return (
875                       <FormRenderer
876                           fields={merged}
877                           initialValues={getInitialValuesForFields(
878                               merged,


========== IMG_2500.md ==========
---
photo: IMG_2500.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 853-889
orientation: 180
confidence: medium
notes: >
  Motion-blur/scroll ghosting (two overlapping frames), similar to
  IMG_2493-2496/2498. Lines 853-878 duplicate content already confirmed
  sharp/high-confidence in IMG_2499 (tail of the Agency Information field
  array + start of its FormRenderer) and are repeated here for completeness,
  numbered per that confirmed source rather than by re-reading this photo's
  blurred gutter (which showed roughly the same digits but with the usual
  +/-1 jitter). Lines 879-889 are new and were legible in tight crops despite
  the blur: finish the Agency-Information FormRenderer (no onValuesChange
  prop, matching the Insured-Information FormRenderer pattern from
  IMG_2497/2499), then close three nested <div>s in turn — the Agency column
  div (opened line 848), the "grid grid-cols-2 gap-6" row div (opened line
  816), and the outer " pt-4" wrapper div (opened line 815) — ending the
  whole "Insured / Agency highlight panel" section. Explorer sidebar
  unchanged. Status bar: AQS_workspace, branch hitanshu/experimental*, 91
  errors/0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript JSX, 5:12 PM 7/10/2026.
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (
~852              const arr = [    [deeper sticky line, still-open Agency IIFE]

Visible code body (853-878 duplicate IMG_2499, repeated for completeness):
853                   const arr = [
854                       normalizedStaticByTab['TABPOL']?.find(
855                           (f) => f.matchcode === 'POLAGT_LAGTNUM_1',
856                       ),
857                       normalizedStaticByTab['TABPOL']?.find(
858                           (f) => f.matchcode === 'POLAGT_LPCRNUM_1',
859                       ),
860                       normalizedStaticByTab['TABPOL']?.find(
861                           (f) => f.matchcode === 'POLAGT_LAGTPRINAM_1',
862                       ),
863                       normalizedStaticByTab['TABPOL']?.find(
864                           (f) => f.matchcode === 'POLAGT_LPCRNAM_1',
865                       ),
866                       normalizedStaticByTab['TABPOL']?.find(
867                           (f) => f.matchcode === 'POLAGT_LAGTCTY_1',
868                       ),
869                       normalizedStaticByTab['TABPOL']?.find(
870                           (f) => f.matchcode === 'POLAGT_LAGTSTA_1',
871                       ),
872                   ].filter(Boolean) as NormalizedField[];
873                   const merged = mergeFieldsWithPageBuild(arr);
874                   return (
875                       <FormRenderer
876                           fields={merged}
877                           initialValues={getInitialValuesForFields(
878                               merged,

New content:
879                   )}
880                   onCommitField={handleFieldCommit}
881                   useReactHookForm={true}
882                   fieldsPerRow={1}
883                   onInfoClick={handleFieldInfoClick}
884               />
885           );
886       })()}
887   </div>
888   </div>
889   </div>


========== IMG_2501.md ==========
---
photo: IMG_2501.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 886-902 (corrected, see notes)
orientation: 180
confidence: medium
notes: >
  CORRECTED after cross-checking against IMG_2502, a sharp non-blurred
  capture of the same region moments later. IMG_2502 gave an exact,
  high-confidence anchor: its line 893 = "{(() => {", 894 = "const placed =
  new Set<string>([", and 896 = "'POLPOLV3X_LEXLIDX'," (i.e. one line
  higher than this photo's original blur-derived estimate). Also corrected:
  IMG_2502 shows only ONE "/* right */" comment (at its line 906), not two —
  the apparent second "/* right */" originally transcribed here at "908" was
  a motion-blur misread (ghost text from the same comment bleeding across
  rows), not real duplicated code. Lines 886-889 duplicate content confirmed
  in IMG_2500 (closing the Insured/Agency panel's three nested divs). The
  exact line numbers for 890-892 (blank line(s) + the "{/* Render remaining
  static TABPOL... */}" comment) could not be pinned down precisely between
  the confirmed 889 and the confirmed 893 — there are 3 lines of slack
  (890/891/892) for what is visually 1-2 lines of content (comment, maybe a
  blank line); recorded as best-effort below. Lines 893 onward now match
  IMG_2502 exactly and should be treated as high-confidence (see IMG_2502.md
  for the continuation of this same field list). Sticky-scroll shows only
  142, 663, 667 in this shot. Explorer sidebar unchanged. Status bar:
  AQS_workspace, branch hitanshu/experimental*, 91 errors/0 warnings, No
  Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 5:12 PM
  7/10/2026.
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (

Visible code body (886-889 duplicate IMG_2500, repeated for completeness):
886       })()}
887   </div>
888   </div>
889   </div>
890   (blank line, inferred)
891   (blank line, inferred, or part of comment below)
892   {/* Render remaining static TABPOL fields that weren't placed in left/right or panel */}

New content (893+ now cross-confirmed against IMG_2502 — see that file for the continuation):
893   {(() => {
894       const placed = new Set<string>([
895           /* left */
896           'POLPOLV3X_LEXLIDX',
897           'POLPOL_LPOLNUM',
898           'POLPOL_NEFFDAT',
899           'POLPOL_NEXPDAT',
900           'POLPOL_LRLVTCT',
901           'POLPOLEXT_LrgRskRul_BooleanValue',
902           'POLPOLEXT_Cnv_BooleanValue',


========== IMG_2502.md ==========
---
photo: IMG_2502.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 893-923
orientation: 180
confidence: high
notes: >
  Sharp, non-blurred capture (like IMG_2497/2499). Confirms and corrects
  IMG_2501's tail: this photo's line 893 = "{(() => {" and 896 =
  "'POLPOLV3X_LEXLIDX'," anchor the whole `placed` Set<string> field list
  precisely. Also clarifies there is only ONE "/* right */" comment (line
  906), not two as a blur-ghost in IMG_2501 suggested. The list mixes plain
  matchcode strings with two inline group comments, "/* right */" (906) and
  "/* insured / agent */" (921); no second "/* left */" appears in this
  visible range. Sticky-scroll shows only 142, 663, 667. Explorer sidebar
  unchanged. Status bar: AQS_workspace, branch hitanshu/experimental*, 91
  errors/0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript JSX, 5:12 PM 7/10/2026.
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (

Visible code body:
893               {(() => {
894                   const placed = new Set<string>([
895                       /* left */
896                       'POLPOLV3X_LEXLIDX',
897                       'POLPOL_LPOLNUM',
898                       'POLPOL_NEFFDAT',
899                       'POLPOL_NEXPDAT',
900                       'POLPOL_LRLVTCT',
901                       'POLPOLEXT_LrgRskRul_BooleanValue',
902                       'POLPOLEXT_Cnv_BooleanValue',
903                       'POLPOL_LPOLTYP',
904                       'POLPOL_LPMADES',
905                       'POLPOLV3X_LBUSDES',
906                       /* right */
907                       'POLPOL_LCMP',
908                       'POLPOLV3X_LPRDCDE',
909                       'POLPOL_LPLN',
910                       'POLPOLEXT_PgmCdeDes_StringValue',
911                       'POLXCP_POLPOL_TERRSK_LMSC',
912                       'POLPOLEXT_ExcNbc_BooleanValue',
913                       'POLPOLEXT_NyxFreTrd_BooleanValue',
914                       'POLPOLEXT_NyxClsTyp_StringValue',
915                       'POLPOLEXT_TutOpr_BooleanValue',
916                       'POLPOLEXT_NyxClsCde_StringValue',
917                       'POLPOL_LBUSTYP',
918                       'POLPOL_LPRISTANAM',
919                       'POLPOLEXT_SafCdt_StringValue',
920                       'POLPOLEXT_DocSta_StringValue',
921                       /* insured / agent */
922                       'POLNAM_LINSPRINAM_1',
923                       'POLNAM_LINSCTY_1',


========== IMG_2503.md ==========
---
photo: IMG_2503.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 893-936
orientation: 180
confidence: high
notes: >
  Sharp, non-blurred capture (like IMG_2497/2499/2502). Sticky-scroll shows
  142, 663, 667, 893 ("{(() => {"), 894 ("const placed = new Set<string>([")
  — lines 895-908 are therefore scrolled out of view under the sticky header
  in this shot and are not repeated here; they were already transcribed
  cleanly in IMG_2502 (matchcodes from 'POLPOLV3X_LEXLIDX' through
  'POLPOLV3X_LPRDCDE'). Visible content resumes at 909. This completes the
  `placed` Set<string> array (closing at 931 "]);"), then declares
  `allStatic` from normalizedStaticByTab['TABPOL'] and filters it into
  `remaining` (fields not in `placed`). Line 932 is inferred blank (a likely
  spacer between the two const declarations; consistent with formatting seen
  elsewhere in this file, not directly disambiguable from a photo). Explorer
  sidebar unchanged. Status bar: AQS_workspace, branch hitanshu/experimental*,
  91 errors/0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript JSX, 5:12 PM 7/10/2026. This is the last photo in this chunk
  (2492-2503).
---
Sticky-scroll header lines (repeated scope context, not new code):
142   const PolicyInformation: React.FC = () => {
663       const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667           render: () => (
893               {(() => {
894                   const placed = new Set<string>([

[lines 895-908 not visible in this shot — scrolled under sticky header; see IMG_2502.md]

Visible code body:
909                   'POLPOL_LPLN',
910                   'POLPOLEXT_PgmCdeDes_StringValue',
911                   'POLXCP_POLPOL_TERRSK_LMSC',
912                   'POLPOLEXT_ExcNbc_BooleanValue',
913                   'POLPOLEXT_NyxFreTrd_BooleanValue',
914                   'POLPOLEXT_NyxClsTyp_StringValue',
915                   'POLPOLEXT_TutOpr_BooleanValue',
916                   'POLPOLEXT_NyxClsCde_StringValue',
917                   'POLPOL_LBUSTYP',
918                   'POLPOL_LPRISTANAM',
919                   'POLPOLEXT_SafCdt_StringValue',
920                   'POLPOLEXT_DocSta_StringValue',
921                   /* insured / agent */
922                   'POLNAM_LINSPRINAM_1',
923                   'POLNAM_LINSCTY_1',
924                   'POLNAM_LINSSTA_1',
925                   'POLAGT_LAGTNUM_1',
926                   'POLAGT_LPCRNUM_1',
927                   'POLAGT_LAGTPRINAM_1',
928                   'POLAGT_LPCRNAM_1',
929                   'POLAGT_LAGTCTY_1',
930                   'POLAGT_LAGTSTA_1',
931               ]);
932   (blank line, inferred)
933               const allStatic = normalizedStaticByTab['TABPOL'] || [];
934               const remaining = allStatic.filter(
935                   (f) => !placed.has(String(f.matchcode || '')),
936               );


========== IMG_2506.md ==========
---
photo: IMG_2506.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 893-960 (mostly duplicate of IMG_2504/IMG_2505; new content 952-959)
orientation: 180
confidence: medium
notes: Same file/scroll region as IMG_2504 and IMG_2505, scrolled slightly further down. Whole frame has heavy motion-blur double-exposure (two overlapping scroll-position images, ~offset by a handful of rows), same artifact as IMG_2504 — this appears to be a run of consecutive photos taken while the editor was mid-scroll. Rows 893-951 duplicate content already transcribed cleanly (non-blurred) in IMG_2505 (const placed/allStatic/remaining/merged/return block through the button onClick/handleFieldCommit args) — not re-transcribed here in detail since the text is jumbled/illegible as distinct rows in this photo; spot-checked fragments are consistent with IMG_2505's transcript (e.g. "if (!remaining || remaining.length === 0) return null;", "const merged = mergeFieldsWithPageBuild(remaining as NormalizedField[]);"). Rows 952-959 are new (not visible in IMG_2504/2505) and reconstructed from a sharper overlapping sub-layer plus indentation logic — medium confidence. CAVEAT: IMG_2507 (clearer, same file/session) shows the same content block one line later (true,/'click', at 951/952 instead of 950/951), implying the file was edited by one line between some of these shots — the 952-959 numbering here is only as reliable as the 951='click' anchor carried over from IMG_2505 and could be off by one; treat IMG_2507 as the more authoritative source for this block's line numbers. Tab "PolicyInformation.tsx 9+, M", selected in Explorer. Sticky-scroll headers same as before (142, 663, 667 — not fully re-verified this photo, occluded by blur). Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time overlay 5:12 PM 7/10/2026.
---

Rows 952-959 (clearer sub-layer, reconstructed with indentation logic; closes out the button JSX from the .map() callback seen in IMG_2505 lines 942-951):
```
952               )
953             }
954           >
955             {c.text}
956           </button>
957         ),
958       )}
959     </div>
```

⟪?⟫ Rows 893-951: heavily double-exposed/illegible as distinct rows in this photo; content matches what was already transcribed verbatim in IMG_2505 (see that file) — not repeated here to avoid transcribing unreliable blur-remixed text.


========== IMG_2509.md ==========
---
photo: IMG_2509.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 975-1004 (+sticky 142,663,667)
orientation: 180
confidence: high
notes: Same file, scrolled further down; text sharp/legible throughout, minimal blur. Tab "PolicyInformation.tsx 9+, M", selected in Explorer (same sidebar as prior photos in this run). Sticky-scroll headers pinned at top this time are only 142, 663, 667 (the row-893 IIFE scope from earlier photos has closed/is no longer an active sticky context at this scroll depth). Body resumes directly at row 975, matching IMG_2508's row 975 exactly ("{/* TABDET: two-column grid layout */}") — confirms consistent line numbering with IMG_2508. Row 1003 appears to be a blank line. Row 1004 ("return (") is right at the bottom edge of the editor, partly under the horizontal scrollbar. Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time overlay 5:12 PM 7/10/2026.
---

Sticky-scroll headers (pinned context lines at top of editor):
```
142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
```

Main visible body:
```
975       {/* TABDET: two-column grid layout */}
976       <div className="grid grid-cols-2 gap-6">
977         {/* Left column */}
978         <div className="space-y-4">
979           {/* Top fields (vertical stack) */}
980           {(() => {
981             const topFields = [
982               'POLPOL_LEXPPOLNUM',
983               'POLPOL_NRLVEFFDAT',
984               'POLPOL_NRLVDAT',
985             ];
986             const fields = topFields
987               .map((mc) =>
988                 normalizedStaticByTab['TABDET']?.find(
989                   (f) => f.matchcode === mc,
990                 ),
991               .filter(Boolean) as NormalizedField[];
992             const merged = mergeFieldsWithPageBuild(fields).map((field) => {
993               if (field.matchcode === 'POLPOL_NRLVDAT') {
994                 return {
995                   ...field,
996                   showInfoIcon: true,
997                   infoAriaLabel:
998                     'Show Eff. Date of Rates information',
999                 };
1000              }
1001              return field;
1002            });
1003
1004            return (
```


========== IMG_2513.md ==========
---
photo: IMG_2513.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 1019-1052ish (heavy blur; see notes)
orientation: 180
confidence: low
notes: Same file, scrolled slightly from IMG_2512 (or mid-scroll when shot). Whole body of this photo has heavy motion-blur double-exposure (two overlapping scroll-position images offset by ~4 rows), same artifact as IMG_2504/IMG_2506 — this photo sits between clean/sharp shots in the same photo run, suggesting it was taken while the editor was mid-scroll. Sticky headers 142, 663, 667 are legible; body from ~1019 onward is jumbled/doubled and not reliably attributable to exact line numbers. Rows 1034-1035 are legible and match IMG_2512 exactly ("return merged.map((field, idx) => (" / "<FieldRenderer") confirming this is a continuation of the same FieldRenderer block. Rows ~1036-1043 duplicate content already cleanly transcribed in IMG_2512 (key/className/label/value/controlType/options props) — not re-transcribed here. NEW content beyond IMG_2512's last visible row (1043 "options={field.options || []}") is captured below from the least-blurred sub-layer, but line numbers could not be reliably assigned — treat as low confidence, approximate order only. Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time overlay 5:12 PM 7/10/2026.
---

Sticky-scroll headers (pinned context lines at top of editor):
```
142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
```

Confirmed rows (match IMG_2512 exactly):
```
1034            return merged.map((field, idx) => (
1035              <FieldRenderer
```

⟪?⟫ New content beyond IMG_2512's row 1043, approximate order, line numbers NOT reliable (heavy double-exposure blur) — likely continues the FieldRenderer prop list:
```
required={field.required || false}
disabled={field.disabled || false}
visible={field.visible !== false}
onChange={() => {}}          ⟪?⟫ low confidence — may be truncated/misread, could take a (val) param
onCommit={(val, eventType) => {
  const normalized =
    typeof val === 'boolean'
      ? val
      : val === null || val === undefined
        ? undefined
        : String(val);
  ⟪?⟫  [continues past bottom edge of editor, not visible]
```


========== IMG_2514.md ==========
---
photo: IMG_2514.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: ~1035-1065 (heavy blur; see notes)
orientation: 180
confidence: low
notes: Same file, scrolled slightly further from IMG_2513. Whole body has heavy motion-blur double-exposure (same artifact as IMG_2504/2506/2513), gutter numbers themselves are doubled/illegible for most rows so line numbers below are NOT reliable. Sticky headers 142, 663, 667 legible; a 4th sticky-ish row shows "return merged.map((field, idx) => (" matching row 1034 established in IMG_2512/2513. Content in the upper portion duplicates IMG_2512/2513 (label/value/controlType/options/required/disabled/visible/onChange/onCommit props) — not re-transcribed. NEW content beyond IMG_2513 (the tail of the onCommit handler and the closing of this FieldRenderer/.map block) captured below from the least-blurred sub-layer. Status bar: branch "hitanshu/experimental*", "No Solution", 91 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time overlay 5:12 PM 7/10/2026.
---

Sticky-scroll headers (pinned context lines at top of editor):
```
142   const PolicyInformation: React.FC = () => {
663     const tabConfigs = POLICY_TABS.map((tab: (typeof POLICY_TABS)[number]) => ({
667       render: () => (
1034            return merged.map((field, idx) => (
```

⟪?⟫ New content beyond IMG_2513, line numbers NOT reliable (heavy double-exposure blur), approximate order — appears to be the tail of the onCommit handler, closing the FieldRenderer element, the .map() callback, the enclosing IIFE, and starting the next section:
```
      ... : String(val);
      handleFieldCommit(
        field.matchcode,
        normalized,
        eventType,
      );
    }}
  />
));
})()}
</div>
{/* Bottom fields (vertical stack) */}
</div>
{(() => {
⟪?⟫ [cut off at bottom edge of editor]
```


========== IMG_2521.md ==========
---
photo: IMG_2521.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 1156-1181 (body; sticky headers not captured in crops but same 142/663/667 pattern continues)
orientation: 180
confidence: high
notes: Same file/tab as IMG_2516-2520 ("PolicyInformation.tsx 9+, M"), scrolled further within the TABINS (Insurer) branch. Confirms/repeats lines 1156-1165 from IMG_2520, then new content 1165-1181: builds insButtons (button-type fields), logs them, and if filtered.length > 0 renders a FormRenderer wrapped in a fragment (<>) with fields mapped to disabled:true. Problems: 91 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*, workspace AQS_workspace (Workspace), timestamp 5:12 PM 7/10/2026.
---
1156        if (fields && fields.length > 0) {
1157          console.log('[policyInformation] TABINS loader fields', fields);
1158          const filtered = fields
1159            .filter(
1160              (f) =>
1161                f.matchcode !== 'POLNAM_LINSZIPEXT' &&
1162                f.controlType !== 'button',
1163            )
1164            .map((f) => ({ ...f, visible: true }));
1165          const insButtons = fields
1166            .filter((f) => f.controlType === 'button')
1167            .map((f) => ({ ...f, visible: true }));
1168          console.log('[PolicyInformation] TABINS buttons', insButtons);
1169          if (filtered.length > 0) {
1170            const merged = mergeFieldsWithPageBuild(filtered);
1171            return (
1172              <>
1173                <FormRenderer
1174                  fields={merged.map((f) => ({
1175                    ...f,
1176                    disabled: true,
1177                  }))}
1178                  initialValues={getInitialValuesForFields(merged)}
1179                  onCommitField={handleFieldCommit}
1180                  useReactHookForm={true}
1181  (cut off by status bar)


========== IMG_2522.md ==========
---
photo: IMG_2522.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 1180-1197
orientation: 180
confidence: high
notes: Same file/tab as IMG_2516-2521 ("PolicyInformation.tsx 9+, M"), continues directly from IMG_2521 (TABINS/Insurer branch's disabled-fields FormRenderer, fieldsPerRow={2} here vs {1} elsewhere) then renders insButtons as ActionButton components in a flex row. Lines 1196-1197 appear blank/no code content in this crop (near bottom of visible scroll, possibly near end of this render branch or just past the last statement shown). Problems: 91 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*, workspace AQS_workspace (Workspace), timestamp 5:12 PM 7/10/2026.
---
1180        useReactHookForm={true}
1181        fieldsPerRow={2}
1182        onInfoClick={handleFieldInfoClick}
1183      />
1184      <div className="flex justify-start  gap-3 mb-3!">
1185        {(insButtons || []).map((b: any) => (
1186          <ActionButton
1187            key={b.matchcode}
1188            matchcode={b.matchcode}
1189            text={b.label}
1190            disabled={b.disabled}
1191            visible={b.visible}
1192            onCommit={handleFieldCommit}
1193          />
1194        ))}
1195      </div>
1196      {insuredGridConfig ? (
1197        <CommonDataGrid

Note: gutter-to-text alignment for lines 1186-1195 was cross-checked with a second, wider crop (x700-3330,y1550-2150) which unambiguously confirmed this exact mapping (resolving an initial ±1 misalignment from a narrower crop). Lines 1196-1197 were initially misread as blank in this photo (edge of frame) but confirmed via IMG_2523's crop of the same region, which shows this photo scrolled slightly further and re-captures 1186-1198 clearly.


========== IMG_2523.md ==========
---
photo: IMG_2523.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 1196-1215
orientation: 180
confidence: medium
notes: Same file/tab as IMG_2516-2522 ("PolicyInformation.tsx 9+, M"). Continues the TABINS/Insurer branch: after the ActionButton row (IMG_2522), renders a CommonDataGrid for "insured" data if insuredGridConfig exists, then falls back to a generic key/value list otherwise. This shot has motion-blur ghosting around lines 1199-1203 — a faint, seemingly commented-out duplicate of the onRowClick handler ("// onRowClick={(row) => / // setSelectedInsuredRow(row as any) / // }") appears layered behind the bright/live code at roughly the same position; treated as a blur artifact of the same live lines, not transcribed as separate commented-out lines, but flagged here in case it is real dead code the photographer scrolled past. Problems: 91 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*, workspace AQS_workspace (Workspace), timestamp 5:12 PM 7/10/2026.
---
1196      {insuredGridConfig ? (
1197        <CommonDataGrid
1198          gridConfig={insuredGridConfig}
1199          data={loaderData?.insuredGridData || []}
1200          onRowClick={(row) =>
1201            setSelectedInsuredRow(row as any)
1202          }
1203        />
1204      ) : null}
1205    </>
1206    );
1207  }
1208  }
1209  const vals = loaderData?.initialValuesByTab?.['TABINS'] || {};
1210  return (
1211    <div>
1212      {Object.keys(vals).map((k) => (
1213        <div key={k} className="flex justify-between py-1">
1214  (cut off by status bar)


========== IMG_2524.md ==========
---
photo: IMG_2524.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 1214-1231
orientation: 180
confidence: high
notes: Same file/tab as IMG_2516-2523 ("PolicyInformation.tsx 9+, M"). Finishes the TABINS key/value-list fallback (lines 1214-1222), then starts a new ternary branch for tab.id === 'TABAGT' (Agent tab) at line 1223, mirroring the same loader-fields-preferred pattern seen for TABBIL/TABINS. Line 1225's comment truncated at viewport edge ("...otherwise show key/value li[st]"). Problems: 91 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*, workspace AQS_workspace (Workspace), timestamp 5:12 PM 7/10/2026.
---
1214        <div key={k} className="flex justify-between py-1">
1215          <div className="font-medium">{k}</div>
1216          <div>{String(vals[k])}</div>
1217        </div>
1218      ))}
1219    </div>
1220    );
1221  })()}
1222  </div>
1223  ) : tab.id === 'TABAGT' ? (
1224    <div className="space-y-4">
1225      {/* Agent tab: prefer loader-provided fields; otherwise show key/value li⟪truncated at viewport edge⟫ */}
1226      {(() => {
1227        const fields = (loaderData?.normalizedByTab?.['TABAGT'] ||
1228          []) as NormalizedField[];
1229        const filtered = fields
1230          .filter((f) => f.matchcode !== 'POLAGT_LAGTNUM_2_LOOKUP')
1231  (cut off by status bar)


========== IMG_2525.md ==========
---
photo: IMG_2525.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 1233-1241
orientation: 180
confidence: high
notes: Same file/tab as IMG_2516-2524 ("PolicyInformation.tsx 9+, M"). Continues the TABAGT (Agent tab) branch's loader-fields FormRenderer, fieldsPerRow={2} (like the TABINS button row) and fields mapped to disabled:true. Line 1241 is the last legible line, partially cut by the taskbar/status bar. Problems: 91 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*, workspace AQS_workspace (Workspace), timestamp 5:12 PM 7/10/2026.
---
1233        const merged = mergeFieldsWithPageBuild(filtered);
1234        return (
1235          <FormRenderer
1236            fields={merged.map((f) => ({ ...f, disabled: true }))}
1237            initialValues={getInitialValuesForFields(merged)}
1238            onCommitField={handleFieldCommit}
1239            useReactHookForm={true}
1240            fieldsPerRow={2}
1241            onInfoClick={handleFieldInfoClick}


========== IMG_2526.md ==========
---
photo: IMG_2526.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 1243-1260
orientation: 180
confidence: medium-high
notes: Same file/tab as IMG_2516-2525 ("PolicyInformation.tsx 9+, M"). Finishes the TABAGT branch with the same key/value-list fallback pattern seen for TABBIL/TABINS (Object.keys(vals).map...), then closes out the big ternary chain that started at line 667 with a final ") : (" fallback branch around line 1259-1260 (cut off at frame edge). This shot again shows the familiar motion-blur ghost-duplicate-of-previous-line artifact throughout; text stayed legible via the bright/sharp layer except for a ±1 line-count ambiguity around lines 1252-1254 (the closing </div>/))} pair for the .map(...) call) — content is not in doubt, only the exact gutter number assignment for those two lines. Problems: 91 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*, workspace AQS_workspace (Workspace), timestamp 5:12 PM 7/10/2026.
---
1243        );
1244      }
1245      const vals = loaderData?.initialValuesByTab?.['TABAGT'] || {};
1246      return (
1247        <div>
1248          {Object.keys(vals).map((k) => (
1249            <div key={k} className="flex justify-between py-1">
1250              <div className="font-medium">{k}</div>
1251              <div>{String(vals[k])}</div>
1252            </div>          [gutter number ±1 uncertain]
1253            ))}             [gutter number ±1 uncertain]
1254          </div>
1255        );
1256      })()}
1257    </div>
1258    );
1259    ) : (
1260  (cut off at frame edge / taskbar — next ternary branch begins)


========== IMG_2527.md ==========
---
photo: IMG_2527.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/PolicyInformation.tsx
lines: 1261-1278
orientation: 180
confidence: high
notes: Same file/tab as IMG_2516-2526 ("PolicyInformation.tsx 9+, M"). This is the final ") : (" default/fallback branch of the giant tab.id ternary chain (started at line 667): renders normalized static fields for whatever tab.id via FormRenderer, fieldsPerRow={2}. Line 1278 (last visible, cut by status bar) shows "})(" — likely the closing of the tabConfigs = POLICY_TABS.map((tab) => ({ ... })) callback that opened around line 663, i.e. near the end of this render function. Problems: 91 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*, workspace AQS_workspace (Workspace), timestamp 5:12 PM 7/10/2026. This is the last photo in this chunk (2516-2527); the sequence tracks a single long scroll through PolicyInformation.tsx lines ~142-1278.
---
1261      {/* Default: render normalized static fields for the tab via FormRenderer */}
1262      {(() => {
1263        const arr = normalizedStaticByTab[tab.id] || [];
1264        const merged = mergeFieldsWithPageBuild(arr as NormalizedField[]);
1265        return (
1266          <FormRenderer
1267            fields={merged}
1268            initialValues={getInitialValuesForFields(merged)}
1269            onCommitField={handleFieldCommit}
1270            useReactHookForm={true}
1271            fieldsPerRow={2}
1272            onInfoClick={handleFieldInfoClick}
1273          />
1274        );
1275      })()}
1276    </div>
1277    )}
1278  })(  (cut off by status bar)
