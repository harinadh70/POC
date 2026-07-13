# BUNDLE for src/components/modal-dialog/use-modal-data.ts
# 11 photo fragment(s), ascending start-line order.


========== IMG_1959.md ==========
---
photo: IMG_1959.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-data.ts
lines: 1-34 (last line cut off)
orientation: 0
confidence: high
notes: >
  New tab opened: "use-modal-data.ts 1" (1 unsaved change), active/italicized
  tab title indicating preview mode; "use-modal-actions.ts 3" tab still open
  to its left (not active). Explorer sidebar: modal-dialog folder now shows
  use-modal-data.ts highlighted/selected (index.ts, modal-dialog.tsx,
  use-modal-actions.ts, use-modal-data.ts [active], use-modal-state.ts, then
  tabView, action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx,
  date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx,
  form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx,
  PolicyLobGrid.tsx [U/untracked], radio.tsx [cut off]).
  Breadcrumb: aqs-web-ui > src > components > modal-dialog > use-modal-data.ts > ...
  Status bar: branch hitanshu/experimental*, 6 errors / 0 warnings (up from 5
  in the actions-file photos), "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8,
  CRLF, TypeScript. Clock 4:32 PM 7/10/2026. Yellow squiggle under 'react'
  import string on line 1 (minor lint, same as seen in use-modal-actions.ts).
  Line 34 gutter number visible at very bottom of frame but its code text is
  cut off by the status bar / not legible.
---
1	import { useMemo } from 'react';
2
3	import type { NormalizedField } from '@/types';
4	import { createFeatureLogger } from '@utils/logger-builder';
5	import { normalizeServiceConfig } from '@utils/normalize-service-config';
6	import {
7	    transformPageBuildResponse,
8	    type ModalPageMetadata,
9	    type PageBuildButton,
10	} from '@utils/transform-pagebuild-response';
11
12	const logger = createFeatureLogger('modal', 'ModalData');
13
14	export interface SessionXmlItem {
15	    name: string;
16	    value: string;
17	}
18
19	const parseSessionXmlItems = (sessionXml: unknown): SessionXmlItem[] => {
20	    if (typeof sessionXml !== 'string' || !sessionXml.trim()) {
21	        return [];
22	    }
23
24	    try {
25	        const parser = new DOMParser();
26	        const doc = parser.parseFromString(sessionXml, 'application/xml');
27	        const parseError = doc.querySelector('parsererror');
28
29	        if (parseError) {
30	            logger.warn('SessionXml parse error detected; returning empty items', {
31	                error: parseError.textContent,
32	            });
33	            return [];
34	⟪?⟫ (line 34 gutter visible, text cut off by bottom of frame)


========== IMG_1960.md ==========
---
photo: IMG_1960.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-data.ts
lines: 17-49
orientation: 0
confidence: high
notes: Tab bar shows "use-modal-actions.ts" (3 problems) and active tab "use-modal-data.ts" (1 problem). Breadcrumb aqs-web-ui > src > components > modal-dialog > use-modal-data.ts > ... Explorer sidebar (modal-dialog folder open) shows index.ts, modal-dialog.tsx, use-modal-actions.ts (3), use-modal-data.ts (1, selected), use-modal-state.ts, tabView (folder). Below modal-dialog, sibling files under components/data-grid area visible above (data-grid collapsed partially) then action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U - unsaved/untracked marker), radio.tsx (cut off). Status bar: aqs-web-ui, branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Line 49 cut off at bottom (extractSessionXmlItems signature starts, body not visible).
---
17	}
18	
19	const parseSessionXmlItems = (sessionXml: unknown): SessionXmlItem[] => {
20		if (typeof sessionXml !== 'string' || !sessionXml.trim()) {
21			return [];
22		}
23	
24		try {
25			const parser = new DOMParser();
26			const doc = parser.parseFromString(sessionXml, 'application/xml');
27			const parseError = doc.querySelector('parsererror');
28	
29			if (parseError) {
30				logger.warn('SessionXml parse error detected; returning empty items', {
31					error: parseError.textContent,
32				});
33				return [];
34			}
35	
36			const items = Array.from(doc.querySelectorAll('item'));
37			return items
38				.map((item) => ({
39					name: item.getAttribute('name')?.trim() ?? '',
40					value: item.getAttribute('value')?.trim() ?? '',
41				}))
42				.filter((item) => item.name !== '');
43		} catch (error) {
44			logger.error('Failed to parse SessionXml; returning empty items', error as Error);
45			return [];
46		}
47	};
48	
49	const extractSessionXmlItems = (xmlDetail: unknown): SessionXmlItem[] => {


========== IMG_1961.md ==========
---
photo: IMG_1961.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-data.ts
lines: 19 (sticky), 28-60
orientation: 0
confidence: high
notes: Same file as IMG_1960, scrolled down. VS Code sticky-scroll header shows line 19 "const parseSessionXmlItems = (sessionXml: unknown): SessionXmlItem[] => {" pinned at top (repeats enclosing scope). Line 28 partially obscured under sticky header, shown blank (confirmed blank in IMG_1960). Explorer: modal-dialog expanded, use-modal-data.ts selected (1 problem), use-modal-actions.ts (3 problems), use-modal-state.ts, tabView folder (collapsed) below it; same sibling tsx files list as IMG_1960. Status bar unchanged: hitanshu/experimental*, 6 errors 0 warnings, No Solution.
---
19	const parseSessionXmlItems = (sessionXml: unknown): SessionXmlItem[] => {
[... sticky header, body continues below ...]
28	
29		if (parseError) {
30			logger.warn('SessionXml parse error detected; returning empty items', {
31				error: parseError.textContent,
32			});
33			return [];
34		}
35	
36		const items = Array.from(doc.querySelectorAll('item'));
37		return items
38			.map((item) => ({
39				name: item.getAttribute('name')?.trim() ?? '',
40				value: item.getAttribute('value')?.trim() ?? '',
41			}))
42			.filter((item) => item.name !== '');
43	} catch (error) {
44		logger.error('Failed to parse SessionXml; returning empty items', error as Error);
45		return [];
46	}
47	};
48	
49	const extractSessionXmlItems = (xmlDetail: unknown): SessionXmlItem[] => {
50		if (!xmlDetail || typeof xmlDetail !== 'object') {
51			return [];
52		}
53	
54		const pageBuild = xmlDetail as {
55			Session?: {
56				SessionXml?: unknown;
57			};
58		};
59	
60		return parseSessionXmlItems(pageBuild.Session?.SessionXml);


========== IMG_1962.md ==========
---
photo: IMG_1962.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-data.ts
lines: 19 (sticky), 41(partial)-73
orientation: 0
confidence: high
notes: Same file, scrolled further down. Sticky header still shows line 19 "const parseSessionXmlItems = (sessionXml: unknown): SessionXmlItem[] => {". Line 41 partially clipped under sticky header showing only "}));" fragment. New content vs prior photos starts at line 61 (closing "};" of extractSessionXmlItems) through line 73 (interface ModalDataResult definition, cut off at 73 which is blank/next line not shown). Explorer unchanged. Status bar unchanged: hitanshu/experimental*, 6 errors 0 warnings, No Solution.
---
19	const parseSessionXmlItems = (sessionXml: unknown): SessionXmlItem[] => {
[sticky header]
41		}));  ⟪partially clipped, top edge⟫
42			.filter((item) => item.name !== '');
43		} catch (error) {
44			logger.error('Failed to parse SessionXml; returning empty items', error as Error);
45			return [];
46		}
47	};
48	
49	const extractSessionXmlItems = (xmlDetail: unknown): SessionXmlItem[] => {
50		if (!xmlDetail || typeof xmlDetail !== 'object') {
51			return [];
52		}
53	
54		const pageBuild = xmlDetail as {
55			Session?: {
56				SessionXml?: unknown;
57			};
58		};
59	
60		return parseSessionXmlItems(pageBuild.Session?.SessionXml);
61	};
62	
63	export interface ModalDataResult {
64		fields: NormalizedField[];
65		buttons: PageBuildButton[];
66		metadata: ModalPageMetadata;
67		fieldOrder: string[];
68		utpOrder: string[];
69		sessionXml: SessionXmlItem[];
70		defaultValues: Record<string, string | boolean>;
71		error: string | null;
72	}
73	


========== IMG_1963.md ==========
---
photo: IMG_1963.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-data.ts
lines: 48-81
orientation: 0
confidence: high
notes: Same file, scrolled slightly further (no sticky header visible this time, line 48 partially clipped at very top). New content vs prior photos begins at line 74 (EMPTY_RESULT constant), continues to line 81 (cut off at bottom, "defaultValues: {}," partially visible). Explorer unchanged (use-modal-data.ts selected, 1 problem). Status bar: hitanshu/experimental*, 6 errors 0 warnings, No Solution. Timestamp 4:33 PM 7/10/2026 (one minute later than IMG_1960-1962's 4:32 PM).
---
48
49	const extractSessionXmlItems = (xmlDetail: unknown): SessionXmlItem[] => {
50		if (!xmlDetail || typeof xmlDetail !== 'object') {
51			return [];
52		}
53
54		const pageBuild = xmlDetail as {
55			Session?: {
56				SessionXml?: unknown;
57			};
58		};
59
60		return parseSessionXmlItems(pageBuild.Session?.SessionXml);
61	};
62
63	export interface ModalDataResult {
64		fields: NormalizedField[];
65		buttons: PageBuildButton[];
66		metadata: ModalPageMetadata;
67		fieldOrder: string[];
68		utpOrder: string[];
69		sessionXml: SessionXmlItem[];
70		defaultValues: Record<string, string | boolean>;
71		error: string | null;
72	}
73
74	const EMPTY_RESULT: ModalDataResult = {
75		fields: [],
76		buttons: [],
77		metadata: {},
78		fieldOrder: [],
79		utpOrder: [],
80		sessionXml: [],
81		defaultValues: {},


========== IMG_1964.md ==========
---
photo: IMG_1964.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-data.ts
lines: 61-94
orientation: 0
confidence: high
notes: Tabs: use-modal-actions.ts (3 problems), use-modal-data.ts (1 problem, active). Breadcrumb aqs-web-ui > src > components > modal-dialog > use-modal-data.ts. Explorer: components > data-grid (collapsed items cut off), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts [3], use-modal-data.ts [1], use-modal-state.ts), tabView (collapsed), then action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U = untracked), radio.tsx. Sidebar sections: OUTLINE, TIMELINE, C# PROJECT DETAILS. Status bar: branch hitanshu/experimental*, 6 errors 0 warnings, red "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Line 61 only a fragment visible at top edge. Windows taskbar clock 4:33 PM 7/10/2026.
---
61	⟪?⟫  (fragment at top edge, appears to be `};`)
62
63	export interface ModalDataResult {
64	    fields: NormalizedField[];
65	    buttons: PageBuildButton[];
66	    metadata: ModalPageMetadata;
67	    fieldOrder: string[];
68	    utpOrder: string[];
69	    sessionXml: SessionXmlItem[];
70	    defaultValues: Record<string, string | boolean>;
71	    error: string | null;
72	}
73
74	const EMPTY_RESULT: ModalDataResult = {
75	    fields: [],
76	    buttons: [],
77	    metadata: {},
78	    fieldOrder: [],
79	    utpOrder: [],
80	    sessionXml: [],
81	    defaultValues: {},
82	    error: null,
83	};
84
85	export function useModalData(xmlDetail: unknown): ModalDataResult {
86	    return useMemo(() => {
87	        if (!xmlDetail) {
88	            return {
89	                ...EMPTY_RESULT,
90	                error: 'Modal xmlDetail not provided',
91	            };
92	        }
93
94	        const transformed = transformPageBuildResponse(xmlDetail);


========== IMG_1965.md ==========
---
photo: IMG_1965.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-data.ts
lines: 63(sticky),70-102
orientation: 0
confidence: high
notes: Same file as IMG_1964, scrolled down. Sticky-scroll header shows line 63 `export interface ModalDataResult {`. Line 70 partially occluded/blurred at top edge. Tabs: use-modal-actions.ts (3), use-modal-data.ts (1, active). Status bar: hitanshu/experimental*, 6 errors 0 warnings, "No Solution", TypeScript. Explorer same as IMG_1964 (modal-dialog files, PolicyLobGrid.tsx U).
---
63	export interface ModalDataResult {          (sticky-scroll header)
70	defaultValues: Record<string, string | boolean>,  ⟪?⟫ (blurred, partly occluded by sticky header)
71	    error: string | null;
72	}
73
74	const EMPTY_RESULT: ModalDataResult = {
75	    fields: [],
76	    buttons: [],
77	    metadata: {},
78	    fieldOrder: [],
79	    utpOrder: [],
80	    sessionXml: [],
81	    defaultValues: {},
82	    error: null,
83	};
84
85	export function useModalData(xmlDetail: unknown): ModalDataResult {
86	    return useMemo(() => {
87	        if (!xmlDetail) {
88	            return {
89	                ...EMPTY_RESULT,
90	                error: 'Modal xmlDetail not provided',
91	            };
92	        }
93
94	        const transformed = transformPageBuildResponse(xmlDetail);
95	        const sessionXml = extractSessionXmlItems(xmlDetail);
96	        const fields = normalizeServiceConfig(transformed.serviceFields);
97
98	        if (fields.length === 0) {
99	            return {
100	                ...EMPTY_RESULT,
101	                metadata: transformed.metadata,
102	                buttons: transformed.buttons,


========== IMG_1966.md ==========
---
photo: IMG_1966.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-data.ts
lines: 83-115
orientation: 0
confidence: high
notes: Continuation of use-modal-data.ts. Line ~74 sticky/top edge fragment shows `const EMPTY_RESULT: ModalDataResult = {` (blurred, cut). Tabs: use-modal-actions.ts (3), use-modal-data.ts (1, active). Status bar: hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Explorer same as prior photos.
---
83	};
84
85	export function useModalData(xmlDetail: unknown): ModalDataResult {
86	    return useMemo(() => {
87	        if (!xmlDetail) {
88	            return {
89	                ...EMPTY_RESULT,
90	                error: 'Modal xmlDetail not provided',
91	            };
92	        }
93
94	        const transformed = transformPageBuildResponse(xmlDetail);
95	        const sessionXml = extractSessionXmlItems(xmlDetail);
96	        const fields = normalizeServiceConfig(transformed.serviceFields);
97
98	        if (fields.length === 0) {
99	            return {
100	                ...EMPTY_RESULT,
101	                metadata: transformed.metadata,
102	                buttons: transformed.buttons,
103	                error: 'Modal configuration is invalid: no renderable form fields found.',
104	            };
105	        }
106
107	        const defaultValues = fields.reduce<Record<string, string | boolean>>((acc, field) => {
108	            acc[field.matchcode] =
109	                field.defaultValue !== undefined
110	                    ? field.defaultValue
111	                    : field.controlType === 'checkbox'
112	                        ? false
113	                        : '';
114	            return acc;
115	        }, {});


========== IMG_1967.md ==========
---
photo: IMG_1967.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-data.ts
lines: 85-86(sticky),95-126
orientation: 0
confidence: high
notes: Sticky-scroll headers show lines 85 `export function useModalData(xmlDetail: unknown): ModalDataResult {` and 86 `return useMemo(() => {`. Line 126 partially cut at bottom edge (`...transformed.defaultValues,`). Tabs/status/explorer same as prior photos (6 errors, "No Solution", hitanshu/experimental*).
---
85	export function useModalData(xmlDetail: unknown): ModalDataResult {   (sticky)
86	    return useMemo(() => {                                            (sticky)
95	        const sessionXml = extractSessionXmlItems(xmlDetail);
96	        const fields = normalizeServiceConfig(transformed.serviceFields);
97
98	        if (fields.length === 0) {
99	            return {
100	                ...EMPTY_RESULT,
101	                metadata: transformed.metadata,
102	                buttons: transformed.buttons,
103	                error: 'Modal configuration is invalid: no renderable form fields found.',
104	            };
105	        }
106
107	        const defaultValues = fields.reduce<Record<string, string | boolean>>((acc, field) => {
108	            acc[field.matchcode] =
109	                field.defaultValue !== undefined
110	                    ? field.defaultValue
111	                    : field.controlType === 'checkbox'
112	                        ? false
113	                        : '';
114	            return acc;
115	        }, {});
116
117	        return {
118	            fields,
119	            buttons: transformed.buttons,
120	            metadata: transformed.metadata,
121	            fieldOrder: transformed.fieldOrder,
122	            utpOrder: transformed.utpOrder,
123	            sessionXml,
124	            defaultValues: {
125	                ...defaultValues,
126	                ...transformed.defaultValues,   (partially cut at bottom edge)


========== IMG_1968.md ==========
---
photo: IMG_1968.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-data.ts
lines: 85-86(sticky),100-131
orientation: 0
confidence: high
notes: Sticky headers lines 85-86 same as IMG_1967. Line 100 partly occluded by sticky (`...EMPTY_RESULT,` visible). End of useModalData hook visible: useMemo deps `[xmlDetail]` at line 130, closing `}` at 131. Tabs/status/explorer unchanged (6 errors, "No Solution").
---
85	export function useModalData(xmlDetail: unknown): ModalDataResult {   (sticky)
86	    return useMemo(() => {                                            (sticky)
100	                ...EMPTY_RESULT,      (partly occluded)
101	                metadata: transformed.metadata,
102	                buttons: transformed.buttons,
103	                error: 'Modal configuration is invalid: no renderable form fields found.',
104	            };
105	        }
106
107	        const defaultValues = fields.reduce<Record<string, string | boolean>>((acc, field) => {
108	            acc[field.matchcode] =
109	                field.defaultValue !== undefined
110	                    ? field.defaultValue
111	                    : field.controlType === 'checkbox'
112	                        ? false
113	                        : '';
114	            return acc;
115	        }, {});
116
117	        return {
118	            fields,
119	            buttons: transformed.buttons,
120	            metadata: transformed.metadata,
121	            fieldOrder: transformed.fieldOrder,
122	            utpOrder: transformed.utpOrder,
123	            sessionXml,
124	            defaultValues: {
125	                ...defaultValues,
126	                ...transformed.defaultValues,
127	            },
128	            error: null,
129	        };
130	    }, [xmlDetail]);
131	}


========== IMG_1969.md ==========
---
photo: IMG_1969.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-data.ts
lines: 85-86,107(sticky),112-132
orientation: 0
confidence: high
notes: End of file visible (file ends at line 131; 132 is last empty line). Sticky headers: 85 export function useModalData..., 86 return useMemo..., 107 const defaultValues = fields.reduce<Record<string, string | boolean>>((acc, field) => {. Tabs/status/explorer unchanged (6 errors, "No Solution", hitanshu/experimental*).
---
85	export function useModalData(xmlDetail: unknown): ModalDataResult {   (sticky)
86	    return useMemo(() => {                                            (sticky)
107	        const defaultValues = fields.reduce<Record<string, string | boolean>>((acc, field) => {   (sticky)
112	                        ? false
113	                        : '';
114	            return acc;
115	        }, {});
116
117	        return {
118	            fields,
119	            buttons: transformed.buttons,
120	            metadata: transformed.metadata,
121	            fieldOrder: transformed.fieldOrder,
122	            utpOrder: transformed.utpOrder,
123	            sessionXml,
124	            defaultValues: {
125	                ...defaultValues,
126	                ...transformed.defaultValues,
127	            },
128	            error: null,
129	        };
130	    }, [xmlDetail]);
131	}
132
