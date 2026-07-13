# BUNDLE for src/components/modal-dialog/use-modal-state.ts
# 9 photo fragment(s), ascending start-line order.


========== IMG_1970.md ==========
---
photo: IMG_1970.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-state.ts
lines: 1-33
orientation: 0
confidence: high
notes: New file in tab bar: use-modal-actions.ts (3), use-modal-state.ts (1, active). Red squiggle under 'react' on line 1 (likely the 1 problem). Explorer: use-modal-data.ts now shows no badge; use-modal-state.ts shows 1. Status bar: 6 errors 0 warnings, "No Solution", hitanshu/experimental*. Line 34 cut at bottom (only `}` partially visible under line 33).
---
1	import { useReducer } from 'react';
2
3	import type { NormalizedField } from '@/types';
4	import type { SessionXmlItem } from '@components/modal-dialog/use-modal-data';
5	import type { BrowserCommand } from '@utils/apply-server-commands';
6	import type { ModalPageMetadata, PageBuildButton } from '@utils/transform-pagebuild-response';
7
8	export interface ModalState {
9	    loading: boolean;
10	    submitting: boolean;
11	    error: string | null;
12	    fields: NormalizedField[];
13	    buttons: PageBuildButton[];
14	    metadata: ModalPageMetadata;
15	    fieldOrder: string[];
16	    utpOrder: string[];
17	    sessionXml: SessionXmlItem[];
18	    browserCommands: BrowserCommand[];
19	}
20
21	export type ModalAction =
22	    | { type: 'LOADING' }
23	    | {
24	          type: 'SUCCESS';
25	          payload: {
26	              fields: NormalizedField[];
27	              buttons: PageBuildButton[];
28	              metadata: ModalPageMetadata;
29	              fieldOrder: string[];
30	              utpOrder: string[];
31	              sessionXml: SessionXmlItem[];
32	              browserCommands: BrowserCommand[];
33	          };


========== IMG_1971.md ==========
---
photo: IMG_1971.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-state.ts
lines: 8(sticky),12-44
orientation: 0
confidence: high
notes: Sticky header line 8 `export interface ModalState {`. Line 12 partly occluded by sticky (appears `fields: NormalizedField[];`). Full ModalAction union visible. Line 44 at bottom edge `const defaultInitialState: ModalState = {`. Tabs: use-modal-actions.ts (3), use-modal-state.ts (1, active). Status: 6 errors, "No Solution".
---
8	export interface ModalState {          (sticky)
12	    fields: NormalizedField[];         (partly occluded by sticky)
13	    buttons: PageBuildButton[];
14	    metadata: ModalPageMetadata;
15	    fieldOrder: string[];
16	    utpOrder: string[];
17	    sessionXml: SessionXmlItem[];
18	    browserCommands: BrowserCommand[];
19	}
20
21	export type ModalAction =
22	    | { type: 'LOADING' }
23	    | {
24	          type: 'SUCCESS';
25	          payload: {
26	              fields: NormalizedField[];
27	              buttons: PageBuildButton[];
28	              metadata: ModalPageMetadata;
29	              fieldOrder: string[];
30	              utpOrder: string[];
31	              sessionXml: SessionXmlItem[];
32	              browserCommands: BrowserCommand[];
33	          };
34	      }
35	    | { type: 'ERROR'; error: string }
36	    | { type: 'SUBMITTING'; submitting: boolean }
37	    | { type: 'SET_COMMANDS'; commands: BrowserCommand[] }
38	    | {
39	          type: 'PATCH_FIELD_OPTIONS';
40	          matchcode: string;
41	          options: Array<{ label: string; value: string }>;
42	      };
43
44	const defaultInitialState: ModalState = {


========== IMG_1972.md ==========
---
photo: IMG_1972.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-state.ts
lines: 19-52
orientation: 0
confidence: high
notes: Continuation; overlaps IMG_1971 (lines 19-42) and continues into defaultInitialState (44-52). Line 19 fragment `}` at top edge. Tabs: use-modal-actions.ts (3), use-modal-state.ts (1, active). Status: 6 errors, "No Solution", hitanshu/experimental*.
---
19	}
20
21	export type ModalAction =
22	    | { type: 'LOADING' }
23	    | {
24	          type: 'SUCCESS';
25	          payload: {
26	              fields: NormalizedField[];
27	              buttons: PageBuildButton[];
28	              metadata: ModalPageMetadata;
29	              fieldOrder: string[];
30	              utpOrder: string[];
31	              sessionXml: SessionXmlItem[];
32	              browserCommands: BrowserCommand[];
33	          };
34	      }
35	    | { type: 'ERROR'; error: string }
36	    | { type: 'SUBMITTING'; submitting: boolean }
37	    | { type: 'SET_COMMANDS'; commands: BrowserCommand[] }
38	    | {
39	          type: 'PATCH_FIELD_OPTIONS';
40	          matchcode: string;
41	          options: Array<{ label: string; value: string }>;
42	      };
43
44	const defaultInitialState: ModalState = {
45	    loading: false,
46	    submitting: false,
47	    error: null,
48	    fields: [],
49	    buttons: [],
50	    metadata: {},
51	    fieldOrder: [],
52	    utpOrder: [],


========== IMG_1973.md ==========
---
photo: IMG_1973.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-state.ts
lines: 21(sticky),34-65
orientation: 0
confidence: high
notes: Sticky header line 21 `export type ModalAction =`. Line 34 partly occluded at top (closing `}` of SUCCESS variant). modalReducer function begins at line 57. Tabs: use-modal-actions.ts (3), use-modal-state.ts (1, active). Status: 6 errors, "No Solution", hitanshu/experimental*.
---
21	export type ModalAction =            (sticky)
34	      }                              (partly occluded)
35	    | { type: 'ERROR'; error: string }
36	    | { type: 'SUBMITTING'; submitting: boolean }
37	    | { type: 'SET_COMMANDS'; commands: BrowserCommand[] }
38	    | {
39	          type: 'PATCH_FIELD_OPTIONS';
40	          matchcode: string;
41	          options: Array<{ label: string; value: string }>;
42	      };
43
44	const defaultInitialState: ModalState = {
45	    loading: false,
46	    submitting: false,
47	    error: null,
48	    fields: [],
49	    buttons: [],
50	    metadata: {},
51	    fieldOrder: [],
52	    utpOrder: [],
53	    sessionXml: [],
54	    browserCommands: [],
55	};
56
57	function modalReducer(state: ModalState, action: ModalAction): ModalState {
58	    switch (action.type) {
59	        case 'LOADING':
60	            return {
61	                ...state,
62	                loading: true,
63	                error: null,
64	            };
65	        case 'SUCCESS':


========== IMG_1974.md ==========
---
photo: IMG_1974.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-state.ts
lines: 43-76
orientation: 0
confidence: high
notes: Continuation into modalReducer SUCCESS case. Line 76 partially cut at bottom edge but legible. Tabs: use-modal-actions.ts (3), use-modal-state.ts (1, active). Status: 6 errors, "No Solution", hitanshu/experimental*.
---
43
44	const defaultInitialState: ModalState = {
45	    loading: false,
46	    submitting: false,
47	    error: null,
48	    fields: [],
49	    buttons: [],
50	    metadata: {},
51	    fieldOrder: [],
52	    utpOrder: [],
53	    sessionXml: [],
54	    browserCommands: [],
55	};
56
57	function modalReducer(state: ModalState, action: ModalAction): ModalState {
58	    switch (action.type) {
59	        case 'LOADING':
60	            return {
61	                ...state,
62	                loading: true,
63	                error: null,
64	            };
65	        case 'SUCCESS':
66	            return {
67	                ...state,
68	                loading: false,
69	                error: null,
70	                fields: action.payload.fields,
71	                buttons: action.payload.buttons,
72	                metadata: action.payload.metadata,
73	                fieldOrder: action.payload.fieldOrder,
74	                utpOrder: action.payload.utpOrder,
75	                sessionXml: action.payload.sessionXml,
76	                browserCommands: action.payload.browserCommands,   (cut at bottom edge)


========== IMG_1975.md ==========
---
photo: IMG_1975.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-state.ts
lines: 56-89
orientation: 0
confidence: high
notes: Tab bar shows "use-modal-actions.ts" (3 problems) and active tab "use-modal-state.ts" (1 problem). Breadcrumb aqs-web-ui > src > components > modal-dialog > use-modal-state.ts > ... Explorer: modal-dialog folder expanded, files index.ts, modal-dialog.tsx, use-modal-actions.ts (3), use-modal-data.ts, use-modal-state.ts (1, selected/highlighted), tabView (folder, collapsed), then action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx (cut off). Status bar: aqs-web-ui, hitanshu/experimental*, 6 errors 0 warnings, No Solution, 4:33 PM 7/10/2026. Line 89 cut off (case 'SET_COMMANDS': body not visible).
---
56
57	function modalReducer(state: ModalState, action: ModalAction): ModalState {
58		switch (action.type) {
59			case 'LOADING':
60				return {
61					...state,
62					loading: true,
63					error: null,
64				};
65			case 'SUCCESS':
66				return {
67					...state,
68					loading: false,
69					error: null,
70					fields: action.payload.fields,
71					buttons: action.payload.buttons,
72					metadata: action.payload.metadata,
73					fieldOrder: action.payload.fieldOrder,
74					utpOrder: action.payload.utpOrder,
75					sessionXml: action.payload.sessionXml,
76					browserCommands: action.payload.browserCommands,
77				};
78			case 'ERROR':
79				return {
80					...state,
81					loading: false,
82					error: action.error,
83				};
84			case 'SUBMITTING':
85				return {
86					...state,
87					submitting: action.submitting,
88				};
89			case 'SET_COMMANDS':


========== IMG_1976.md ==========
---
photo: IMG_1976.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-state.ts
lines: 57-94
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 57 (function modalReducer signature). Line 62 mostly hidden behind sticky header (only "loading: tru…" fragment visible). Tabs open: use-modal-actions.ts (3 problems), use-modal-state.ts (1 problem, active). Explorer: aqs-web-ui/src/components with data-grid, modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts [3], use-modal-data.ts, use-modal-state.ts [1]), tabView folder, then action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U = untracked), radio.tsx (partially cut). Sidebar sections: OUTLINE, TIMELINE, C# PROJECT DETAILS. Status bar: branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution" red indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 4:33 PM 7/10/2026. modal-dialog folder dot = modified (git).
---
57	function modalReducer(state: ModalState, action: ModalAction): ModalState {
62	                loading: tru⟪?⟫   (mostly hidden behind sticky header)
63	                error: null,
64	            };
65	        case 'SUCCESS':
66	            return {
67	                ...state,
68	                loading: false,
69	                error: null,
70	                fields: action.payload.fields,
71	                buttons: action.payload.buttons,
72	                metadata: action.payload.metadata,
73	                fieldOrder: action.payload.fieldOrder,
74	                utpOrder: action.payload.utpOrder,
75	                sessionXml: action.payload.sessionXml,
76	                browserCommands: action.payload.browserCommands,
77	            };
78	        case 'ERROR':
79	            return {
80	                ...state,
81	                loading: false,
82	                error: action.error,
83	            };
84	        case 'SUBMITTING':
85	            return {
86	                ...state,
87	                submitting: action.submitting,
88	            };
89	        case 'SET_COMMANDS':
90	            return {
91	                ...state,
92	                browserCommands: action.commands,
93	            };
94	        case 'PATCH_FIELD_OPTIONS':


========== IMG_1977.md ==========
---
photo: IMG_1977.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-state.ts
lines: 57-107
orientation: 0
confidence: high
notes: Same file as IMG_1976, scrolled down. Sticky-scroll header line 57 (modalReducer signature). Line 75 partially hidden behind sticky (only fragment visible above line 76). Overlaps IMG_1976 lines 76-94. Tabs: use-modal-actions.ts (3), use-modal-state.ts (1, active). Same Explorer tree as IMG_1976 (modal-dialog folder expanded, PolicyLobGrid.tsx U). Status bar: hitanshu/experimental*, 6 errors 0 warnings, No Solution. Clock 4:33 PM 7/10/2026.
---
57	function modalReducer(state: ModalState, action: ModalAction): ModalState {
76	                browserCommands: action.payload.browserCommands,
77	            };
78	        case 'ERROR':
79	            return {
80	                ...state,
81	                loading: false,
82	                error: action.error,
83	            };
84	        case 'SUBMITTING':
85	            return {
86	                ...state,
87	                submitting: action.submitting,
88	            };
89	        case 'SET_COMMANDS':
90	            return {
91	                ...state,
92	                browserCommands: action.commands,
93	            };
94	        case 'PATCH_FIELD_OPTIONS':
95	            return {
96	                ...state,
97	                fields: state.fields.map((field) =>
98	                    field.matchcode === action.matchcode
99	                        ? {
100	                              ...field,
101	                              options: action.options,
102	                          }
103	                        : field,
104	                ),
105	            };
106	        default:
107	            return state;


========== IMG_1978.md ==========
---
photo: IMG_1978.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-state.ts
lines: 57-119
orientation: 0
confidence: high
notes: Same file, scrolled to end. Sticky header line 57 (modalReducer signature). Line 91 mostly hidden behind sticky ("...state," fragment). Shows end of modalReducer plus exported hook useModalState. Overlaps IMG_1977 lines 92-107. Same tabs/Explorer/status bar as prior photos (6 errors, No Solution, hitanshu/experimental*). Clock 4:33 PM 7/10/2026.
---
57	function modalReducer(state: ModalState, action: ModalAction): ModalState {
91	                ...state,   (mostly hidden behind sticky header)
92	                browserCommands: action.commands,
93	            };
94	        case 'PATCH_FIELD_OPTIONS':
95	            return {
96	                ...state,
97	                fields: state.fields.map((field) =>
98	                    field.matchcode === action.matchcode
99	                        ? {
100	                              ...field,
101	                              options: action.options,
102	                          }
103	                        : field,
104	                ),
105	            };
106	        default:
107	            return state;
108	    }
109	}
110	
111	export function useModalState(initialState?: Partial<ModalState>) {
112	    const [state, dispatch] = useReducer(modalReducer, {
113	        ...defaultInitialState,
114	        ...initialState,
115	    });
116	
117	    return { state, dispatch };
118	}
119	
