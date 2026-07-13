# BUNDLE for src/features/policy/FieldRenderer.tsx
# 6 photo fragment(s), ascending start-line order.


========== IMG_2642.md ==========
---
photo: IMG_2642.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/FieldRenderer.tsx
lines: 1-34
orientation: 180
confidence: high
notes: Full file top visible (line 1 is the first line of the file). Tab bar: "FieldRenderer.tsx" (with "9+" problem badge). Breadcrumb: aqs-web-ui > src > features > policy > FieldRenderer.tsx. Explorer sidebar (policy folder) shows: constants (tab-definitions.ts, ultimate-cover-tab-definit...), utils (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts), FieldRenderer.tsx (highlighted, "9+" badge), index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 13 errors/0 warnings (jumped from 3 errors seen in ultimateCoverLoader.ts photos). Squiggly (orange/red) underlines under lines 26-29 (value=, onChange=, disabled=, /> on the <TextInput> block) indicating lint/type errors. Line 34 cut off at bottom, only partially visible ("options={(field as any).options ?? [1}" — final bracket illegible, continues in IMG_2643).
---
1   // Generic FieldRenderer for PolicyInformation
2   // Renders fields based on controlType, using matchcode-driven logic.
3   // Compatible with static mapping and future dynamic JSON integration.
4
5   import React from 'react';
6   import { type PolicyInformationField } from './policy-information-fields';
7   import type { NormalizedField } from '@/types';
8   import { TextInput } from '@/components/text';
9   import { SelectInput } from '@/components/select';
10  import { RadioInput } from '@/components/radio';
11  import { CheckboxInput } from '@/components/checkbox';
12  import { DateInput } from '@/components/date';
13  import { TextAreaInput } from '@/components/textarea';
14
15  interface FieldRendererProps {
16      field: PolicyInformationField | NormalizedField;
17      value?: unknown;
18      onChange?: (matchcode: string, value: unknown) => void;
19  }
20
21  export const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {
22      switch (field.controlType) {
23          case 'textbox':
24              return (
25                  <TextInput
26                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
27                      onChange={(v) => onChange?.(field.matchcode, v)}
28                      disabled={(field as any).disabled}
29                  />
30              );
31          case 'select':
32              return (
33                  <SelectInput
34                      options={(field as any).options ?? [] ⟪?⟫


========== IMG_2643.md ==========
---
photo: IMG_2643.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/FieldRenderer.tsx
lines: 14-47
orientation: 180
confidence: high
notes: Tab bar: "FieldRenderer.tsx" (with "9+" problem badge). Breadcrumb: aqs-web-ui > src > features > policy > FieldRenderer.tsx. Explorer sidebar (policy folder) shows: constants, utils (with ultimateCoverLoader.ts now showing no unsaved dot), FieldRenderer.tsx (highlighted), index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 13 errors/0 warnings. Overlaps with IMG_2642 (lines 1-34), confirms lines 14-33 exactly and resolves the illegible tail of line 34. Line 47 cut off at very bottom of frame (only "/>" visible, part of the RadioInput block closing).
---
14
15  interface FieldRendererProps {
16      field: PolicyInformationField | NormalizedField;
17      value?: unknown;
18      onChange?: (matchcode: string, value: unknown) => void;
19  }
20
21  export const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {
22      switch (field.controlType) {
23          case 'textbox':
24              return (
25                  <TextInput
26                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
27                      onChange={(v) => onChange?.(field.matchcode, v)}
28                      disabled={(field as any).disabled}
29                  />
30              );
31          case 'select':
32              return (
33                  <SelectInput
34                      options={(field as any).options ?? []}
35                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
36                      onChange={(v) => onChange?.(field.matchcode, v)}
37                      disabled={(field as any).disabled}
38                  />
39              );
40          case 'radio':
41              return (
42                  <RadioInput
43                      options={(field as any).options ?? []}
44                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
45                      onChange={(v) => onChange?.(field.matchcode, v)}
46                      disabled={(field as any).disabled}
47                  />


========== IMG_2644.md ==========
---
photo: IMG_2644.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/FieldRenderer.tsx
lines: 21-57
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 21 "export const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {". Tab bar: "FieldRenderer.tsx" (with "9+" problem badge). Breadcrumb: aqs-web-ui > src > features > policy > FieldRenderer.tsx. Explorer sidebar (policy folder) shows: constants, utils (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts), FieldRenderer.tsx (highlighted, "9+"), index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 13 errors/0 warnings. Squiggly underlines on lines 26-29 (TextInput block, partially hidden under sticky header). Overlaps IMG_2643 (14-47) confirming lines 21-47; extends further to line 57 ("case 'date':").
---
21  export const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {
26      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
27      onChange={(v) => onChange?.(field.matchcode, v)}
28      disabled={(field as any).disabled}
29      />
30      );
31          case 'select':
32              return (
33                  <SelectInput
34                      options={(field as any).options ?? []}
35                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
36                      onChange={(v) => onChange?.(field.matchcode, v)}
37                      disabled={(field as any).disabled}
38                  />
39              );
40          case 'radio':
41              return (
42                  <RadioInput
43                      options={(field as any).options ?? []}
44                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
45                      onChange={(v) => onChange?.(field.matchcode, v)}
46                      disabled={(field as any).disabled}
47                  />
48              );
49          case 'checkbox':
50              return (
51                  <CheckboxInput
52                      checked={Boolean((field as any).defaultValue ?? value)}
53                      onChange={(v) => onChange?.(field.matchcode, v)}
54                      disabled={(field as any).disabled}
55                  />
56              );
57          case 'date':


========== IMG_2645.md ==========
---
photo: IMG_2645.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/FieldRenderer.tsx
lines: 39-70
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 21 "export const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {". Tab bar: "FieldRenderer.tsx" (with "9+" problem badge). Breadcrumb: aqs-web-ui > src > features > policy > FieldRenderer.tsx. Explorer sidebar (policy folder) shows: constants, utils, FieldRenderer.tsx (highlighted, "9+"), index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 13 errors/0 warnings. Overlaps IMG_2644 (21-57) confirming lines 39-57; extends further to line 70 ("disabled={(field as any).disabled}" inside the 'textarea' case). Line 71 (closing "/>") just cut off at bottom of frame.
---
39              );
40          case 'radio':
41              return (
42                  <RadioInput
43                      options={(field as any).options ?? []}
44                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
45                      onChange={(v) => onChange?.(field.matchcode, v)}
46                      disabled={(field as any).disabled}
47                  />
48              );
49          case 'checkbox':
50              return (
51                  <CheckboxInput
52                      checked={Boolean((field as any).defaultValue ?? value)}
53                      onChange={(v) => onChange?.(field.matchcode, v)}
54                      disabled={(field as any).disabled}
55                  />
56              );
57          case 'date':
58              return (
59                  <DateInput
60                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
61                      onChange={(v) => onChange?.(field.matchcode, v)}
62                      disabled={(field as any).disabled}
63                  />
64              );
65          case 'textarea':
66              return (
67                  <TextAreaInput
68                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
69                      onChange={(v) => onChange?.(field.matchcode, v)}
70                      disabled={(field as any).disabled}


========== IMG_2646.md ==========
---
photo: IMG_2646.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/FieldRenderer.tsx
lines: 47-78
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 21 "export const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {", partially obscured by a "Network connection is unstable." VS Code toast notification (with Dismiss button) overlapping the breadcrumb/sticky area. Tab bar: "FieldRenderer.tsx" (with "9+" problem badge). Breadcrumb: aqs-web-ui > src > features > policy > FieldRenderer.tsx (partly hidden by toast). Explorer sidebar (policy folder) shows: constants (tab-definitions.ts, ultimate-cover-tab-definit...), utils (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts), FieldRenderer.tsx (highlighted, "9+"), index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 13 errors/0 warnings. This shows the switch statement's default case and the function's closing brace (line 76), plus a trailing top-level comment starting at line 78. File appears to end shortly after (see IMG_2647, line 79 is the last line).
---
47                  />
48              );
49          case 'checkbox':
50              return (
51                  <CheckboxInput
52                      checked={Boolean((field as any).defaultValue ?? value)}
53                      onChange={(v) => onChange?.(field.matchcode, v)}
54                      disabled={(field as any).disabled}
55                  />
56              );
57          case 'date':
58              return (
59                  <DateInput
60                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
61                      onChange={(v) => onChange?.(field.matchcode, v)}
62                      disabled={(field as any).disabled}
63                  />
64              );
65          case 'textarea':
66              return (
67                  <TextAreaInput
68                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
69                      onChange={(v) => onChange?.(field.matchcode, v)}
70                      disabled={(field as any).disabled}
71                  />
72              );
73          default:
74              return null;
75      }
76  };
77
78  // For dynamic JSON, pass normalized field objects with matchcode and controlType.


========== IMG_2647.md ==========
---
photo: IMG_2647.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/FieldRenderer.tsx
lines: 57-79
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 21 "export const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {", partially obscured by a "Network connection is unstable." VS Code toast notification (with Dismiss button). Tab bar: "FieldRenderer.tsx" (with "9+" problem badge). Breadcrumb partly hidden by toast. Explorer sidebar (policy folder) shows: constants, utils, FieldRenderer.tsx (highlighted, "9+"), index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 13 errors/0 warnings. Line 79 (blank/comment continuation) appears to be the last line of the file — no further content below it in frame, editor whitespace below suggests end-of-file. Overlaps IMG_2646 (47-78) confirming lines 57-78.
---
57          case 'date':
58              return (
59                  <DateInput
60                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
61                      onChange={(v) => onChange?.(field.matchcode, v)}
62                      disabled={(field as any).disabled}
63                  />
64              );
65          case 'textarea':
66              return (
67                  <TextAreaInput
68                      value={typeof value === 'string' ? value : (field as any).defaultValue ?? ''}
69                      onChange={(v) => onChange?.(field.matchcode, v)}
70                      disabled={(field as any).disabled}
71                  />
72              );
73          default:
74              return null;
75      }
76  };
77
78  // For dynamic JSON, pass normalized field objects with matchcode and controlType.
79
