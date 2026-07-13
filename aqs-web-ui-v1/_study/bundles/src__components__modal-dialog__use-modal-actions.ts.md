# BUNDLE for src/components/modal-dialog/use-modal-actions.ts
# 34 photo fragment(s), ascending start-line order.


========== IMG_1925.md ==========
---
photo: IMG_1925.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 1-34
orientation: 0
confidence: high
notes: >
  Explorer sidebar (aqs-web-ui/src/components) expanded: data-grid, modal-dialog
  (index.ts, modal-dialog.tsx, use-modal-actions.ts [active, 3 unsaved changes],
  use-modal-data.ts, use-modal-state.ts), tabView, action-buttons.tsx, button.tsx,
  buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx,
  field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx,
  loader.tsx, PolicyLobGrid.tsx (marked U/untracked), radio.tsx (cut off).
  Breadcrumb: aqs-web-ui > src > components > modal-dialog > use-modal-actions.ts > ...
  Tab bar: "use-modal-actions.ts 3" only visible tab. Lightbulb icon at line 1
  (quick-fix suggestion). Yellow squiggle under 'react' import string on line 1
  (minor lint, e.g. import-order). Status bar: branch hitanshu/experimental*,
  5 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF,
  TypeScript. Clock shows 4:31 PM 7/10/2026. No other errors/squiggles visible
  in the body text itself. Line 34 cut off at bottom of frame after "string => {".
---
1	import { useCallback, useEffect, useRef, type Dispatch } from 'react';
2	import type { UseFormReturn } from 'react-hook-form';
3	import { useActionGuard } from '@hooks/use-action-guard';
4	import { useGlobalVariableStore } from '@/providers/global-variable-provider';
5
6	import { xmlServerCall } from '@services/xml-server-call';
7	import type { CommitEventType, ControlType } from '@/types';
8	import type { SessionInfo } from '@features/auth/services/auth';
9	import type { ModalAction, ModalState } from '@components/modal-dialog/use-modal-state';
10	import { getItem } from '@utils/local-storage';
11	import { createFeatureLogger } from '@utils/logger-builder';
12	import {
13	    parseBrowserCommandsFromXMLServerCall,
14	    type BrowserCommand,
15	} from '@utils/apply-server-commands';
16	import {
17	    buildXMLServerCallPayload,
18	    extractCallsFromPageBuild,
19	} from '@utils/build-xml-server-call-payload';
20	import type { PageBuildButton } from '@utils/transform-pagebuild-response';
21	import { parseComboItems } from '@utils/parse-combo-items';
22
23	const logger = createFeatureLogger('modal', 'ModalActions');
24
25	const FIELD_COMMIT_DEDUPE_WINDOW_MS = 450;
26	const GUARDED_MODAL_ACTIONS = new Set(['DELETE', 'SUBMIT', 'ISSUE', 'APPROVE', 'CANCEL']);
27
28	type CommitSignature = {
29	    eventType: CommitEventType;
30	    value: string;
31	    timestamp: number;
32	};
33
34	const normalizeCommitValue = (value: string | number | boolean): string => {


========== IMG_1926.md ==========
---
photo: IMG_1926.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 9-42 (last line partial)
orientation: 0
confidence: high
notes: >
  Same file/tab as IMG_1925 (use-modal-actions.ts, 3 unsaved changes), scrolled
  down slightly. Same explorer sidebar state. Status bar: branch
  hitanshu/experimental*, 5 errors / 0 warnings, "No Solution", Ln 1 Col 1,
  Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:31 PM 7/10/2026. No visible
  squiggles/lint markers in this body range. Line 42 cut off at bottom of
  frame mid-statement.
---
9	import type { ModalAction, ModalState } from '@components/modal-dialog/use-modal-state';
10	import { getItem } from '@utils/local-storage';
11	import { createFeatureLogger } from '@utils/logger-builder';
12	import {
13	    parseBrowserCommandsFromXMLServerCall,
14	    type BrowserCommand,
15	} from '@utils/apply-server-commands';
16	import {
17	    buildXMLServerCallPayload,
18	    extractCallsFromPageBuild,
19	} from '@utils/build-xml-server-call-payload';
20	import type { PageBuildButton } from '@utils/transform-pagebuild-response';
21	import { parseComboItems } from '@utils/parse-combo-items';
22
23	const logger = createFeatureLogger('modal', 'ModalActions');
24
25	const FIELD_COMMIT_DEDUPE_WINDOW_MS = 450;
26	const GUARDED_MODAL_ACTIONS = new Set(['DELETE', 'SUBMIT', 'ISSUE', 'APPROVE', 'CANCEL']);
27
28	type CommitSignature = {
29	    eventType: CommitEventType;
30	    value: string;
31	    timestamp: number;
32	};
33
34	const normalizeCommitValue = (value: string | number | boolean): string => {
35	    if (typeof value === 'boolean') {
36	        return value ? 'true' : 'false';
37	    }
38	    return String(value ?? '');
39	};
40
41	const isCommitEventAllowed = (controlType: ControlType, eventType: CommitEventType): boolean => {
42	    if (controlType === 'textbox' || controlType === ⟪?⟫ (rest obscured by status bar overlay at bottom of frame)


========== IMG_1927.md ==========
---
photo: IMG_1927.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 19-52
orientation: 0
confidence: high
notes: >
  Same file/tab as IMG_1925/1926 (use-modal-actions.ts, 3 unsaved changes),
  scrolled down further. Same explorer sidebar state (modal-dialog folder
  expanded, use-modal-actions.ts highlighted). Status bar: branch
  hitanshu/experimental*, 5 errors / 0 warnings, "No Solution", Ln 1 Col 1,
  Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:31 PM 7/10/2026. No visible
  lint squiggles in this range. Line 19 partially cut off at top of frame
  (only "} from '@utils/build-xml-server-call-payload';" tail visible).
  Content continues below frame after line 52.
---
19	} from '@utils/build-xml-server-call-payload';
20	import type { PageBuildButton } from '@utils/transform-pagebuild-response';
21	import { parseComboItems } from '@utils/parse-combo-items';
22
23	const logger = createFeatureLogger('modal', 'ModalActions');
24
25	const FIELD_COMMIT_DEDUPE_WINDOW_MS = 450;
26	const GUARDED_MODAL_ACTIONS = new Set(['DELETE', 'SUBMIT', 'ISSUE', 'APPROVE', 'CANCEL']);
27
28	type CommitSignature = {
29	    eventType: CommitEventType;
30	    value: string;
31	    timestamp: number;
32	};
33
34	const normalizeCommitValue = (value: string | number | boolean): string => {
35	    if (typeof value === 'boolean') {
36	        return value ? 'true' : 'false';
37	    }
38	    return String(value ?? '');
39	};
40
41	const isCommitEventAllowed = (controlType: ControlType, eventType: CommitEventType): boolean => {
42	    if (controlType === 'textbox' || controlType === 'textarea') {
43	        return eventType === 'blur' || eventType === 'enter';
44	    }
45
46	    if (
47	        controlType === 'select' ||
48	        controlType === 'checkbox' ||
49	        controlType === 'radio' ||
50	        controlType === 'date' ||
51	        controlType === 'calendar'
52	    ) {


========== IMG_1928.md ==========
---
photo: IMG_1928.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 28-63
orientation: 0
confidence: high
notes: Line 28 is a sticky-scroll header (viewport starts at 31). Tab shows "use-modal-actions.ts 3" (3 problems). Status bar shows 5 errors 0 warnings, "No Solution" indicator, branch hitanshu/experimental*, Ln 1 Col 1, TypeScript, CRLF, Tab Size 4. Explorer sidebar: aqs-web-ui > src > components > data-grid (partially occluded child), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts [3], use-modal-data.ts, use-modal-state.ts), tabView (collapsed), then action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U = untracked), radio.tsx (partially visible). Panels: OUTLINE, TIMELINE, C# PROJECT DETAILS. Line 63 cut off at bottom edge ("now: number" partially visible). Windows taskbar at bottom, clock 4:32 PM 7/10/2026.
---
28	type CommitSignature = {
31	    timestamp: number;
32	};
33
34	const normalizeCommitValue = (value: string | number | boolean): string => {
35	    if (typeof value === 'boolean') {
36	        return value ? 'true' : 'false';
37	    }
38	    return String(value ?? '');
39	};
40
41	const isCommitEventAllowed = (controlType: ControlType, eventType: CommitEventType): boolean => {
42	    if (controlType === 'textbox' || controlType === 'textarea') {
43	        return eventType === 'blur' || eventType === 'enter';
44	    }
45
46	    if (
47	        controlType === 'select' ||
48	        controlType === 'checkbox' ||
49	        controlType === 'radio' ||
50	        controlType === 'date' ||
51	        controlType === 'calendar'
52	    ) {
53	        return eventType === 'change';
54	    }
55
56	    return false;
57	};
58
59	const isDuplicateCommit = (
60	    lastCommit: CommitSignature | undefined,
61	    nextEventType: CommitEventType,
62	    nextValue: string,
63	    now: number⟪?⟫ (line cut off at bottom edge)


========== IMG_1929.md ==========
---
photo: IMG_1929.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 41-75
orientation: 0
confidence: high
notes: Line 41 is a sticky-scroll header (viewport starts at 44). Continuation of IMG_1928 (overlaps lines 44-63). Tab "use-modal-actions.ts 3". Status bar: 5 errors 0 warnings, "No Solution", branch hitanshu/experimental*, TypeScript, CRLF. Same Explorer sidebar contents as IMG_1928. Gutter shows a git-change marker near line 69. Line 76 gutter number visible but content cut off at bottom. References constant FIELD_COMMIT_DEDUPE_WINDOW_MS.
---
41	const isCommitEventAllowed = (controlType: ControlType, eventType: CommitEventType): boolean => {
44	    }
45
46	    if (
47	        controlType === 'select' ||
48	        controlType === 'checkbox' ||
49	        controlType === 'radio' ||
50	        controlType === 'date' ||
51	        controlType === 'calendar'
52	    ) {
53	        return eventType === 'change';
54	    }
55
56	    return false;
57	};
58
59	const isDuplicateCommit = (
60	    lastCommit: CommitSignature | undefined,
61	    nextEventType: CommitEventType,
62	    nextValue: string,
63	    now: number,
64	): boolean => {
65	    if (!lastCommit) {
66	        return false;
67	    }
68
69	    if (nextValue !== lastCommit.value) {
70	        return false;
71	    }
72
73	    if (now - lastCommit.timestamp > FIELD_COMMIT_DEDUPE_WINDOW_MS) {
74	        return false;
75	    }


========== IMG_1930.md ==========
---
photo: IMG_1930.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 41-89
orientation: 0
confidence: high
notes: Line 41 is a sticky-scroll header (viewport starts at 57). Continuation of IMG_1929 (overlaps 57-75). Tab "use-modal-actions.ts 3". Status bar: 5 errors 0 warnings, "No Solution", branch hitanshu/experimental*. Same Explorer sidebar as IMG_1928. Git-change marker near line 82 in gutter. Line 89 shows closing "};" partially at bottom edge.
---
41	const isCommitEventAllowed = (controlType: ControlType, eventType: CommitEventType): boolean => {
57	};
58
59	const isDuplicateCommit = (
60	    lastCommit: CommitSignature | undefined,
61	    nextEventType: CommitEventType,
62	    nextValue: string,
63	    now: number,
64	): boolean => {
65	    if (!lastCommit) {
66	        return false;
67	    }
68
69	    if (nextValue !== lastCommit.value) {
70	        return false;
71	    }
72
73	    if (now - lastCommit.timestamp > FIELD_COMMIT_DEDUPE_WINDOW_MS) {
74	        return false;
75	    }
76
77	    if (lastCommit.eventType === nextEventType) {
78	        return true;
79	    }
80
81	    if (
82	        nextEventType === 'blur' &&
83	        (lastCommit.eventType === 'enter' || lastCommit.eventType === 'change')
84	    ) {
85	        return true;
86	    }
87
88	    return false;
89	};


========== IMG_1931.md ==========
---
photo: IMG_1931.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 59-102
orientation: 0
confidence: high
notes: Line 59 is a sticky-scroll header (viewport starts at ~70; line 70 "return false;" is partially occluded by the sticky header). Overlaps IMG_1930 lines 70-89. Tab "use-modal-actions.ts 3". Status bar: 5 errors 0 warnings, "No Solution", branch hitanshu/experimental*. Same Explorer sidebar as IMG_1928. Line 102 at bottom edge, start of useModalActions export.
---
59	const isDuplicateCommit = (
70	        return false;   (partially occluded by sticky header)
71	    }
72
73	    if (now - lastCommit.timestamp > FIELD_COMMIT_DEDUPE_WINDOW_MS) {
74	        return false;
75	    }
76
77	    if (lastCommit.eventType === nextEventType) {
78	        return true;
79	    }
80
81	    if (
82	        nextEventType === 'blur' &&
83	        (lastCommit.eventType === 'enter' || lastCommit.eventType === 'change')
84	    ) {
85	        return true;
86	    }
87
88	    return false;
89	};
90
91	interface UseModalActionsParams {
92	    open: boolean;
93	    xmlDetail: unknown;
94	    xmlFileName?: string;
95	    state: ModalState;
96	    dispatch: Dispatch<ModalAction>;
97	    formMethods: UseFormReturn<Record<string, unknown>>;
98	    onClose: (deferredNavigation?: { action: string; nodeKey?: string }) => void;
99	    onBrowserCommands?: (commands: BrowserCommand[]) => void;
100	}
101
102	export function useModalActions({


========== IMG_1932.md ==========
---
photo: IMG_1932.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 59-115
orientation: 0
confidence: high
notes: Line 59 is a sticky-scroll header; viewport starts ~83 (line 83 mostly hidden behind sticky header, faintly visible). Overlaps IMG_1931 lines 84-102. Tab "use-modal-actions.ts 3". Status bar: 5 errors 0 warnings, "No Solution", branch hitanshu/experimental*. Hooks referenced: useActionGuard, useGlobalVariableStore, useRef maps for recentCommitsRef and fieldCommitSequenceRef.
---
59	const isDuplicateCommit = (
83	        (lastCommit.eventType === 'enter' || lastCommit.eventType === 'change')   (mostly occluded by sticky header)
84	    ) {
85	        return true;
86	    }
87
88	    return false;
89	};
90
91	interface UseModalActionsParams {
92	    open: boolean;
93	    xmlDetail: unknown;
94	    xmlFileName?: string;
95	    state: ModalState;
96	    dispatch: Dispatch<ModalAction>;
97	    formMethods: UseFormReturn<Record<string, unknown>>;
98	    onClose: (deferredNavigation?: { action: string; nodeKey?: string }) => void;
99	    onBrowserCommands?: (commands: BrowserCommand[]) => void;
100	}
101
102	export function useModalActions({
103	    open,
104	    xmlDetail,
105	    xmlFileName,
106	    state,
107	    dispatch,
108	    formMethods,
109	    onClose,
110	    onBrowserCommands,
111	}: UseModalActionsParams) {
112	    const { isActionAllowed } = useActionGuard();
113	    const globalVariableStore = useGlobalVariableStore();
114	    const recentCommitsRef = useRef<Map<string, CommitSignature>>(new Map());
115	    const fieldCommitSequenceRef = useRef<Map<string, number>>(new Map());


========== IMG_1933.md ==========
---
photo: IMG_1933.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 91-128
orientation: 0
confidence: high
notes: Line 91 is a sticky-scroll header (viewport starts at 97). Overlaps IMG_1932 lines 97-115. Tab "use-modal-actions.ts 3". Status bar: 5 errors 0 warnings, "No Solution", branch hitanshu/experimental*. JSDoc block (lines 119-127) documents action-level authorization for high-risk modal buttons; line 128 begins isButtonActionAllowed = useCallback(.
---
91	interface UseModalActionsParams {
97	    formMethods: UseFormReturn<Record<string, unknown>>;
98	    onClose: (deferredNavigation?: { action: string; nodeKey?: string }) => void;
99	    onBrowserCommands?: (commands: BrowserCommand[]) => void;
100	}
101
102	export function useModalActions({
103	    open,
104	    xmlDetail,
105	    xmlFileName,
106	    state,
107	    dispatch,
108	    formMethods,
109	    onClose,
110	    onBrowserCommands,
111	}: UseModalActionsParams) {
112	    const { isActionAllowed } = useActionGuard();
113	    const globalVariableStore = useGlobalVariableStore();
114	    const recentCommitsRef = useRef<Map<string, CommitSignature>>(new Map());
115	    const fieldCommitSequenceRef = useRef<Map<string, number>>(new Map());
116	    const modalLifetimeRef = useRef(0);
117	    const unmountedRef = useRef(false);
118
119	    /**
120	     * Enforce action-level authorization for high-risk modal buttons.
121	     *
122	     * @example
123	     * if (!isButtonActionAllowed('DELETE')) {
124	     *   console.warn('[Security] DELETE action denied by permissions');
125	     *   return;
126	     * }
127	     */
128	    const isButtonActionAllowed = useCallback(


========== IMG_1934.md ==========
---
photo: IMG_1934.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-141
orientation: 0
confidence: high
notes: Line 102 is a sticky-scroll header (viewport starts at 110). Overlaps IMG_1933 lines 110-128. Tab "use-modal-actions.ts 3". Status bar: 5 errors 0 warnings, "No Solution", branch hitanshu/experimental*. References GUARDED_MODAL_ACTIONS set. Line 142 partially visible at bottom cut ("unmountedRef.current = true;" barely legible, marked uncertain).
---
102	export function useModalActions({
110	    onBrowserCommands,
111	}: UseModalActionsParams) {
112	    const { isActionAllowed } = useActionGuard();
113	    const globalVariableStore = useGlobalVariableStore();
114	    const recentCommitsRef = useRef<Map<string, CommitSignature>>(new Map());
115	    const fieldCommitSequenceRef = useRef<Map<string, number>>(new Map());
116	    const modalLifetimeRef = useRef(0);
117	    const unmountedRef = useRef(false);
118
119	    /**
120	     * Enforce action-level authorization for high-risk modal buttons.
121	     *
122	     * @example
123	     * if (!isButtonActionAllowed('DELETE')) {
124	     *   console.warn('[Security] DELETE action denied by permissions');
125	     *   return;
126	     * }
127	     */
128	    const isButtonActionAllowed = useCallback(
129	        (matchcode: string): boolean => {
130	            const action = matchcode.toUpperCase();
131	            if (!GUARDED_MODAL_ACTIONS.has(action)) {
132	                return true;
133	            }
134
135	            return isActionAllowed(action);
136	        },
137	        [isActionAllowed],
138	    );
139
140	    useEffect(() => {
141	        return () => {
142	            unmountedRef.current = true;⟪?⟫ (cut off at bottom edge)


========== IMG_1935.md ==========
---
photo: IMG_1935.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-155
orientation: 0
confidence: high
notes: Line 102 is a sticky-scroll header (viewport starts at 123). Overlaps IMG_1934 lines 123-141. Tab "use-modal-actions.ts 3". Status bar: 5 errors 0 warnings, "No Solution", branch hitanshu/experimental*. Line 155 partially cut at bottom ("modalLifetimeRef.current += 1;").
---
102	export function useModalActions({
123	     * if (!isButtonActionAllowed('DELETE')) {
124	     *   console.warn('[Security] DELETE action denied by permissions');
125	     *   return;
126	     * }
127	     */
128	    const isButtonActionAllowed = useCallback(
129	        (matchcode: string): boolean => {
130	            const action = matchcode.toUpperCase();
131	            if (!GUARDED_MODAL_ACTIONS.has(action)) {
132	                return true;
133	            }
134
135	            return isActionAllowed(action);
136	        },
137	        [isActionAllowed],
138	    );
139
140	    useEffect(() => {
141	        return () => {
142	            unmountedRef.current = true;
143	        };
144	    }, []);
145
146	    useEffect(() => {
147	        if (!open) {
148	            modalLifetimeRef.current += 1;
149	            recentCommitsRef.current.clear();
150	            fieldCommitSequenceRef.current.clear();
151	        }
152	    }, [open]);
153
154	    const handleClose = useCallback(() => {
155	        modalLifetimeRef.current += 1;⟪?⟫ (cut off at bottom edge)


========== IMG_1936.md ==========
---
photo: IMG_1936.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-170
orientation: 0
confidence: high
notes: Line 102 is a sticky-scroll header (viewport starts at 139). Overlaps IMG_1935 lines 139-155. Tab "use-modal-actions.ts 3". Status bar: 5 errors 0 warnings, "No Solution", branch hitanshu/experimental*. Line 164 property read as ".addinf" — legible but unusual name, flagged for cross-check. Line 171 gutter number partially visible, content cut.
---
102	export function useModalActions({
139
140	    useEffect(() => {
141	        return () => {
142	            unmountedRef.current = true;
143	        };
144	    }, []);
145
146	    useEffect(() => {
147	        if (!open) {
148	            modalLifetimeRef.current += 1;
149	            recentCommitsRef.current.clear();
150	            fieldCommitSequenceRef.current.clear();
151	        }
152	    }, [open]);
153
154	    const handleClose = useCallback(() => {
155	        modalLifetimeRef.current += 1;
156
157	        const navigateCyclingCommand = state.browserCommands.find(
158	            (cmd) => cmd.verb === 'NAVIGATE_CYCLING',
159	        );
160
161	        if (navigateCyclingCommand) {
162	            onClose({
163	                action: navigateCyclingCommand.noun,
164	                nodeKey: navigateCyclingCommand.addinf⟪?⟫,
165	            });
166	            return;
167	        }
168
169	        onClose(undefined);
170	    }, [onClose, state.browserCommands]);


========== IMG_1937.md ==========
---
photo: IMG_1937.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-183
orientation: 0
confidence: high
notes: Line 102 is a sticky-scroll header (viewport starts at 152). Overlaps IMG_1936 lines 152-170; this photo confirms line 164 reads "navigateCyclingCommand.addinf" clearly. Tab "use-modal-actions.ts 3". Status bar: 5 errors 0 warnings, "No Solution", branch hitanshu/experimental*. Line 184 partially cut ("return;").
---
102	export function useModalActions({
152	    }, [open]);
153
154	    const handleClose = useCallback(() => {
155	        modalLifetimeRef.current += 1;
156
157	        const navigateCyclingCommand = state.browserCommands.find(
158	            (cmd) => cmd.verb === 'NAVIGATE_CYCLING',
159	        );
160
161	        if (navigateCyclingCommand) {
162	            onClose({
163	                action: navigateCyclingCommand.noun,
164	                nodeKey: navigateCyclingCommand.addinf,
165	            });
166	            return;
167	        }
168
169	        onClose(undefined);
170	    }, [onClose, state.browserCommands]);
171
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
174	            const field = state.fields.find((item) => item.matchcode === matchcode);
175	            if (!field) {
176	                logger.debug('Skipping field commit: field not found in modal state', {
177	                    matchcode,
178	                    eventType,
179	                });
180	                return;
181	            }
182
183	            if (!isCommitEventAllowed(field.controlType, eventType)) {


========== IMG_1938.md ==========
---
photo: IMG_1938.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-207
orientation: 0
confidence: high
notes: Sticky-scroll headers at lines 102, 172, 173 (viewport starts at 178). Overlaps IMG_1937 lines 178-183. Tab "use-modal-actions.ts 3". Status bar: 5 errors 0 warnings, "No Solution", branch hitanshu/experimental*. References extractCallsFromPageBuild(xmlDetail, matchcode) and XMLServerCall. Line 208 cut at bottom.
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
178	                    eventType,
179	                });
180	                return;
181	            }
182
183	            if (!isCommitEventAllowed(field.controlType, eventType)) {
184	                return;
185	            }
186
187	            const normalizedValue = normalizeCommitValue(value);
188	            const now = Date.now();
189	            const previousCommit = recentCommitsRef.current.get(matchcode);
190	            if (isDuplicateCommit(previousCommit, eventType, normalizedValue, now)) {
191	                logger.debug('Skipping duplicate field commit', {
192	                    matchcode,
193	                    eventType,
194	                });
195	                return;
196	            }
197
198	            recentCommitsRef.current.set(matchcode, {
199	                eventType,
200	                value: normalizedValue,
201	                timestamp: now,
202	            });
203
204	            const calls = extractCallsFromPageBuild(xmlDetail, matchcode);
205	            if (calls.length === 0) {
206	                logger.debug('No commit calls found for field; skipping XMLServerCall', {
207	                    matchcode,


========== IMG_1939.md ==========
---
photo: IMG_1939.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-220
orientation: 0
confidence: high
notes: Sticky-scroll headers at lines 102, 172, 173 (viewport starts at 191). Overlaps IMG_1938 lines 191-207. Tab "use-modal-actions.ts 3". Status bar: 5 errors 0 warnings, "No Solution", branch hitanshu/experimental*. References getItem<SessionInfo>('sessionInformation'), fieldCommitSequenceRef sequencing, modalSnapshot from modalLifetimeRef. Line 221 gutter partially visible, content cut.
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
191	                logger.debug('Skipping duplicate field commit', {
192	                    matchcode,
193	                    eventType,
194	                });
195	                return;
196	            }
197
198	            recentCommitsRef.current.set(matchcode, {
199	                eventType,
200	                value: normalizedValue,
201	                timestamp: now,
202	            });
203
204	            const calls = extractCallsFromPageBuild(xmlDetail, matchcode);
205	            if (calls.length === 0) {
206	                logger.debug('No commit calls found for field; skipping XMLServerCall', {
207	                    matchcode,
208	                });
209	                return;
210	            }
211
212	            const sessionInfo = getItem<SessionInfo>('sessionInformation');
213	            if (!sessionInfo) {
214	                logger.warn('Skipping field commit: session information not found', { matchcode });
215	                return;
216	            }
217
218	            const currentSeq = (fieldCommitSequenceRef.current.get(matchcode) ?? 0) + 1;
219	            fieldCommitSequenceRef.current.set(matchcode, currentSeq);
220	            const modalSnapshot = modalLifetimeRef.current;


========== IMG_1951.md ==========
---
photo: IMG_1951.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-336 (sticky headers 102,172; body 306-336)
orientation: 0
confidence: high
notes: >
  Same file/tab as IMG_1925/1926/1927 (use-modal-actions.ts, 3 unsaved changes),
  scrolled much further down. Sticky scroll pinned headers at top show enclosing
  scope: line 102 (export function useModalActions({) and line 172
  (const handleCommitField = useCallback(). Explorer sidebar unchanged (modal-dialog
  folder expanded). Status bar: branch hitanshu/experimental*, 5 errors / 0
  warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. No
  visible lint squiggles in this body range. Comment on line 322 "// Defensive:
  accept button.calls possibly undefined and fall back to extract from xmlDetail"
  documents defensive-coding intent. Content continues below frame after line 336
  (payload = buildXMLServerCallPayload({ statement starts and is cut off).
---
[Sticky scroll headers, pinned — enclosing scope, not part of contiguous body]
102	export function useModalActions({
172	    const handleCommitField = useCallback(

[Body, contiguous 306-336]
306	            onBrowserCommands,
307	        ],
308	    );
309
310	    const executeButtonAction = useCallback(
311	        async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {
312	            dispatch({ type: 'SUBMITTING', submitting: true });
313	            dispatch({ type: 'ERROR', error: '' });
314
315	            try {
316	                const sessionInfo = getItem<SessionInfo>('sessionInformation');
317	                if (!sessionInfo) {
318	                    throw new Error('Session information not found');
319	                }
320
321	                // Defensive: accept button.calls possibly undefined and fall back to extract from xmlDetail
322	                const calls =
323	                    Array.isArray(button.calls) && button.calls.length > 0
324	                        ? button.calls
325	                        : extractCallsFromPageBuild(xmlDetail, button.matchcode);
326
327	                const isCancel = button.matchcode.toUpperCase() === 'CANCEL';
328	                if (calls.length === 0) {
329	                    if (isCancel) {
330	                        handleClose();
331	                    }
332	                    dispatch({ type: 'SUBMITTING', submitting: false });
333	                    return;
334	                }
335
336	                const payload = buildXMLServerCallPayload({


========== IMG_1954.md ==========
---
photo: IMG_1954.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-368 (sticky headers 102,310,311,336; body 339-368, last line partial)
orientation: 0
confidence: high
notes: >
  Same file/tab as prior use-modal-actions.ts photos (3 unsaved changes),
  scrolled further down within executeButtonAction. Sticky scroll pinned
  headers (4 lines, divider visible below them): 102 (export function
  useModalActions({), 310 (const executeButtonAction = useCallback(), 311
  (async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {),
  336 (const payload = buildXMLServerCallPayload({). Lines 337-338 are not
  visible (covered by the sticky overlay); normal scrollable body resumes at 339.
  Verified line "339" (not "337") via high-zoom crop of the gutter. Explorer
  sidebar unchanged (modal-dialog folder expanded, use-modal-actions.ts
  highlighted). Status bar: branch hitanshu/experimental*, 5 errors / 0
  warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  No visible lint squiggles. Line 368 cut off at bottom of frame mid-string.
---
[Sticky scroll headers, pinned — enclosing scope, not part of contiguous body]
102	export function useModalActions({
310	    const executeButtonAction = useCallback(
311	        async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {
336	            const payload = buildXMLServerCallPayload({

[Body, contiguous 339-368]
339	                sessionInfo,
340	                calls,
341	                buttonMatchcode: button.matchcode,
342	                fieldOrder: state.fieldOrder,
343	                utpOrder: state.utpOrder,
344	                sessionXml: state.sessionXml,
345	            });
346
347	            const response = await xmlServerCall(payload);
348	            if (response.errors) {
349	                dispatch({ type: 'ERROR', error: response.errors });
350	                dispatch({ type: 'SUBMITTING', submitting: false });
351	                return;
352	            }
353
354	            const commands = parseBrowserCommandsFromXMLServerCall(response);
355	            dispatch({ type: 'SET_COMMANDS', commands });
356	            onBrowserCommands?.(commands);
357
358	            const closeCommand = commands.find((cmd) => cmd.verb === 'CLOSE_MODAL');
359	            if (closeCommand || isCancel) {
360	                handleClose();
361	            }
362	        } catch (err) {
363	            logger.error('Modal button action failed', err as Error, {
364	                button: button.matchcode,
365	            });
366	            dispatch({
367	                type: 'ERROR',
368	                error: err instanceof Error ? err.message : 'Failed to process modal action',


========== IMG_1955.md ==========
---
photo: IMG_1955.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-373 (sticky headers 102,310,311,336; body 344-373)
orientation: 0
confidence: high
notes: >
  Same file/tab as IMG_1954 (use-modal-actions.ts, 3 unsaved changes), scrolled
  a few lines further than IMG_1954 (body starts at 344 vs 339). Sticky scroll
  pinned headers (4 lines): 102 (export function useModalActions({), 310
  (const executeButtonAction = useCallback(), 311 (async (button:
  PageBuildButton, submitFormData: Record<string, unknown>) => {), 336
  (const payload = buildXMLServerCallPayload({). Line 344 partially obscured
  by sticky-overlay divider but confirmed via zoom crop as
  "sessionXml: state.sessionXml,". Line 373 ("},") confirmed via zoom crop —
  closes the async callback body passed to useCallback, comma precedes the
  dependency array (not visible, cut off by frame). Explorer sidebar unchanged.
  Status bar: branch hitanshu/experimental*, 5 errors / 0 warnings,
  "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. No visible
  lint squiggles.
---
[Sticky scroll headers, pinned — enclosing scope, not part of contiguous body]
102	export function useModalActions({
310	    const executeButtonAction = useCallback(
311	        async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {
336	            const payload = buildXMLServerCallPayload({

[Body, contiguous 344-373]
344	                sessionXml: state.sessionXml,
345	            });
346
347	            const response = await xmlServerCall(payload);
348	            if (response.errors) {
349	                dispatch({ type: 'ERROR', error: response.errors });
350	                dispatch({ type: 'SUBMITTING', submitting: false });
351	                return;
352	            }
353
354	            const commands = parseBrowserCommandsFromXMLServerCall(response);
355	            dispatch({ type: 'SET_COMMANDS', commands });
356	            onBrowserCommands?.(commands);
357
358	            const closeCommand = commands.find((cmd) => cmd.verb === 'CLOSE_MODAL');
359	            if (closeCommand || isCancel) {
360	                handleClose();
361	            }
362	        } catch (err) {
363	            logger.error('Modal button action failed', err as Error, {
364	                button: button.matchcode,
365	            });
366	            dispatch({
367	                type: 'ERROR',
368	                error: err instanceof Error ? err.message : 'Failed to process modal action',
369	            });
370	        } finally {
371	            dispatch({ type: 'SUBMITTING', submitting: false });
372	        }
373	    },


========== IMG_1956.md ==========
---
photo: IMG_1956.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-381 (sticky headers 102,310,311; body 351-381, first/last partial)
orientation: 0
confidence: high
notes: >
  Same file/tab as prior use-modal-actions.ts photos (3 unsaved changes),
  scrolled further down past the executeButtonAction try/catch/finally block
  into the useCallback dependency array. Sticky scroll pinned headers (3
  lines this time — payload-const header no longer pinned since scroll
  passed it): 102 (export function useModalActions({), 310 (const
  executeButtonAction = useCallback(), 311 (async (button: PageBuildButton,
  submitFormData: Record<string, unknown>) => {). Line 351 only partially
  visible at very top of frame (just "return;" tail). Line 382
  (onBrowserCommands,) partially cut off at bottom of frame. Explorer sidebar
  unchanged. Status bar: branch hitanshu/experimental*, 5 errors / 0
  warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
[Sticky scroll headers, pinned — enclosing scope, not part of contiguous body]
102	export function useModalActions({
310	    const executeButtonAction = useCallback(
311	        async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {

[Body, contiguous 351-381]
351	                return; ⟪partial, top-of-frame⟫
352	            }
353
354	            const commands = parseBrowserCommandsFromXMLServerCall(response);
355	            dispatch({ type: 'SET_COMMANDS', commands });
356	            onBrowserCommands?.(commands);
357
358	            const closeCommand = commands.find((cmd) => cmd.verb === 'CLOSE_MODAL');
359	            if (closeCommand || isCancel) {
360	                handleClose();
361	            }
362	        } catch (err) {
363	            logger.error('Modal button action failed', err as Error, {
364	                button: button.matchcode,
365	            });
366	            dispatch({
367	                type: 'ERROR',
368	                error: err instanceof Error ? err.message : 'Failed to process modal action',
369	            });
370	        } finally {
371	            dispatch({ type: 'SUBMITTING', submitting: false });
372	        }
373	    },
374	    [
375
376	        xmlDetail,
377	        xmlFileName,
378	        state.fieldOrder,
379	        state.utpOrder,
380	        state.sessionXml,
381	        dispatch,


========== IMG_1957.md ==========
---
photo: IMG_1957.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-394 (sticky headers 102,310,311; body 364-394, first line partial)
orientation: 0
confidence: high
notes: >
  Same file/tab as IMG_1956, scrolled a bit further (overlaps 1956's tail,
  then continues past the end of executeButtonAction's useCallback deps array
  into the start of handleButtonClick). Sticky scroll pinned headers unchanged:
  102, 310, 311. Line 364 partially visible at very top of frame (only
  "button: button.matchcode," tail, no legible line number). Line 394 cut off
  at bottom of frame after "if (!isButtonActionAllowed(action)) {" — the
  isButtonActionAllowed call has its "action" argument highlighted (matching
  bracket/occurrence highlight, not a selection). Explorer sidebar unchanged.
  Status bar: branch hitanshu/experimental*, 5 errors / 0 warnings,
  "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
[Sticky scroll headers, pinned — enclosing scope, not part of contiguous body]
102	export function useModalActions({
310	    const executeButtonAction = useCallback(
311	        async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {

[Body, contiguous 364(partial)-394]
364	                button: button.matchcode, ⟪partial, top-of-frame, no legible gutter number⟫
365	            });
366	            dispatch({
367	                type: 'ERROR',
368	                error: err instanceof Error ? err.message : 'Failed to process modal action',
369	            });
370	        } finally {
371	            dispatch({ type: 'SUBMITTING', submitting: false });
372	        }
373	    },
374	    [
375
376	        xmlDetail,
377	        xmlFileName,
378	        state.fieldOrder,
379	        state.utpOrder,
380	        state.sessionXml,
381	        dispatch,
382	        onBrowserCommands,
383	        handleClose,
384	    ],
385	);
386
387	const handleButtonClick = useCallback(
388	    (button: PageBuildButton) => {
389	        const action = button.matchcode.toUpperCase();
390	        globalVariableStore.setVariable('mstrCurrentButton', action);
391	        logger.debug('Stored current button matchcode for cycling navigation', {
392	            matchcode: action,
393	        });
394	        if (!isButtonActionAllowed(action)) {


========== IMG_1958.md ==========
---
photo: IMG_1958.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 102-414 (sticky header 102; body 384-414, end of file)
orientation: 0
confidence: high
notes: >
  Same file/tab as prior use-modal-actions.ts photos (3 unsaved changes),
  scrolled to the end of the file (handleButtonClick definition through the
  hook's final return statement and closing brace). Sticky scroll shows line
  102 (export function useModalActions({) clearly; a second sticky-area line
  directly beneath it is present but the text is too garbled/obscured to
  transcribe reliably (likely a residual/ghosted render of the
  executeButtonAction header, not confirmed — marked illegible, not included
  in transcription). File appears to end at line 414 (blank line after the
  closing brace on 413). Explorer sidebar unchanged (modal-dialog folder
  expanded, use-modal-actions.ts highlighted, 3 unsaved changes). Status bar:
  branch hitanshu/experimental*, 5 errors / 0 warnings, "No Solution",
  Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Comment on line 395
  "// Permission check before executing server-side action." Template
  literal on line 396 uses console.warn with a backtick string.
---
[Sticky scroll header, pinned — enclosing scope, not part of contiguous body]
102	export function useModalActions({
⟪?⟫	(second sticky line present but illegible/garbled, not transcribed)

[Body, contiguous 384-414]
384	    );
385
386	    const handleButtonClick = useCallback(
387	        (button: PageBuildButton) => {
388	            const action = button.matchcode.toUpperCase();
389	            globalVariableStore.setVariable('mstrCurrentButton', action);
390	            logger.debug('Stored current button matchcode for cycling navigation', {
391	                matchcode: action,
392	            });
393
394	            if (!isButtonActionAllowed(action)) {
395	                // Permission check before executing server-side action.
396	                console.warn(`[Security] ${action} action denied by permissions`);
397	                return;
398	            }
399
400	            void formMethods.handleSubmit(async (formData) => {
401	                await executeButtonAction(button, formData);
402	            })();
403	        },
404	        [formMethods, executeButtonAction, globalVariableStore, isButtonActionAllowed],
405	    );
406
407	    return {
408	        handleClose,
409	        handleCommitField,
410	        handleButtonClick,
411	        isButtonActionAllowed,
412	    };
413	}
414


========== IMG_1940.md ==========
---
photo: IMG_1940.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 204-234 (sticky headers 102, 172, 173)
orientation: 0
confidence: high
notes: Tab "use-modal-actions.ts 3" (3 problems badge). Status bar - branch hitanshu/experimental*, errors 5 / warnings 0, red "No Solution" indicator, Ln 1 Col 1, TypeScript, CRLF. Explorer sidebar visible - aqs-web-ui/src/components with data-grid, modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts [3], use-modal-data.ts, use-modal-state.ts), tabView folder, then action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U = untracked), radio.tsx. OUTLINE / TIMELINE / C# PROJECT DETAILS panes below. Line 234 partially cut off at bottom ("});" likely). Windows taskbar clock 4:32 PM 7/10/2026.
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
204	            const calls = extractCallsFromPageBuild(xmlDetail, matchcode);
205	            if (calls.length === 0) {
206	                logger.debug('No commit calls found for field; skipping XMLServerCall', {
207	                    matchcode,
208	                });
209	                return;
210	            }
211	
212	            const sessionInfo = getItem<SessionInfo>('sessionInformation');
213	            if (!sessionInfo) {
214	                logger.warn('Skipping field commit: session information not found', { matchcode });
215	                return;
216	            }
217	
218	            const currentSeq = (fieldCommitSequenceRef.current.get(matchcode) ?? 0) + 1;
219	            fieldCommitSequenceRef.current.set(matchcode, currentSeq);
220	            const modalSnapshot = modalLifetimeRef.current;
221	
222	            try {
223	                const formData = formMethods.getValues();
224	
225	                const payload = buildXMLServerCallPayload({
226	                    xmlFileName: xmlFileName || '',
227	                    formData,
228	                    sessionInfo,
229	                    calls,
230	                    buttonMatchcode: matchcode,
231	                    fieldOrder: state.fieldOrder,
232	                    utpOrder: state.utpOrder,
233	                    sessionXml: state.sessionXml,
234	                });⟪cut off at bottom edge⟫


========== IMG_1941.md ==========
---
photo: IMG_1941.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 217-247 (sticky headers 102, 172, 173)
orientation: 0
confidence: high
notes: Same session as IMG_1940, scrolled down (overlaps lines 218-234). Tab "use-modal-actions.ts 3". Status bar - hitanshu/experimental*, errors 5 / warnings 0, "No Solution". Same Explorer sidebar as IMG_1940 (modal-dialog folder expanded, PolicyLobGrid.tsx marked U). Line 247 partially cut off at bottom ("return;"). matchcode underlined (squiggle?) at line 244.
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
217	
218	            const currentSeq = (fieldCommitSequenceRef.current.get(matchcode) ?? 0) + 1;
219	            fieldCommitSequenceRef.current.set(matchcode, currentSeq);
220	            const modalSnapshot = modalLifetimeRef.current;
221	
222	            try {
223	                const formData = formMethods.getValues();
224	
225	                const payload = buildXMLServerCallPayload({
226	                    xmlFileName: xmlFileName || '',
227	                    formData,
228	                    sessionInfo,
229	                    calls,
230	                    buttonMatchcode: matchcode,
231	                    fieldOrder: state.fieldOrder,
232	                    utpOrder: state.utpOrder,
233	                    sessionXml: state.sessionXml,
234	                });
235	
236	                const response = await xmlServerCall(payload);
237	
238	                if (
239	                    unmountedRef.current ||
240	                    modalSnapshot !== modalLifetimeRef.current ||
241	                    currentSeq !== fieldCommitSequenceRef.current.get(matchcode)
242	                ) {
243	                    logger.debug('Ignoring stale field commit response', {
244	                        matchcode,
245	                        seq: currentSeq,
246	                    });
247	                    return;⟪cut off at bottom edge⟫


========== IMG_1942.md ==========
---
photo: IMG_1942.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 229-257 (sticky headers 102, 172, 173, 225)
orientation: 0
confidence: high
notes: Same session, scrolled further (overlaps IMG_1941 lines 229-247). Tab "use-modal-actions.ts 3". Status bar - hitanshu/experimental*, errors 5 / warnings 0, "No Solution". Same Explorer sidebar. Line 257 gutter visible but content blank/cut at bottom.
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
225	                const payload = buildXMLServerCallPayload({
229	                    calls,
230	                    buttonMatchcode: matchcode,
231	                    fieldOrder: state.fieldOrder,
232	                    utpOrder: state.utpOrder,
233	                    sessionXml: state.sessionXml,
234	                });
235	
236	                const response = await xmlServerCall(payload);
237	
238	                if (
239	                    unmountedRef.current ||
240	                    modalSnapshot !== modalLifetimeRef.current ||
241	                    currentSeq !== fieldCommitSequenceRef.current.get(matchcode)
242	                ) {
243	                    logger.debug('Ignoring stale field commit response', {
244	                        matchcode,
245	                        seq: currentSeq,
246	                    });
247	                    return;
248	                }
249	
250	                if (response.errors) {
251	                    logger.warn('Field commit response returned non-fatal errors', {
252	                        matchcode,
253	                        errors: response.errors,
254	                    });
255	                    return;
256	                }
257	⟪blank/cut off⟫


========== IMG_1943.md ==========
---
photo: IMG_1943.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 238-268 (sticky headers 102, 172, 173)
orientation: 0
confidence: high
notes: Same session, scrolled further (overlaps IMG_1942 lines 238-256). Tab "use-modal-actions.ts 3". Status bar - hitanshu/experimental*, errors 5 / warnings 0, "No Solution". Same Explorer sidebar (PolicyLobGrid.tsx U). Line 268 gutter visible, content cut at bottom.
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
238	                if (
239	                    unmountedRef.current ||
240	                    modalSnapshot !== modalLifetimeRef.current ||
241	                    currentSeq !== fieldCommitSequenceRef.current.get(matchcode)
242	                ) {
243	                    logger.debug('Ignoring stale field commit response', {
244	                        matchcode,
245	                        seq: currentSeq,
246	                    });
247	                    return;
248	                }
249	
250	                if (response.errors) {
251	                    logger.warn('Field commit response returned non-fatal errors', {
252	                        matchcode,
253	                        errors: response.errors,
254	                    });
255	                    return;
256	                }
257	
258	                const commands = parseBrowserCommandsFromXMLServerCall(response);
259	                if (commands.length === 0) {
260	                    return;
261	                }
262	
263	                dispatch({ type: 'SET_COMMANDS', commands });
264	                onBrowserCommands?.(commands);
265	
266	                for (const command of commands) {
267	                    const verb = command.verb.toUpperCase();
268	⟪cut off at bottom edge⟫


========== IMG_1944.md ==========
---
photo: IMG_1944.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 249-278 (sticky headers 102, 172, 173)
orientation: 0
confidence: high
notes: Same session, scrolled further (overlaps IMG_1943 lines 249-267). Tab "use-modal-actions.ts 3". Status bar - hitanshu/experimental*, errors 5 / warnings 0, "No Solution". Same Explorer sidebar. Photo taken at angle; line 278 at bottom edge partly readable.
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
249	
250	                if (response.errors) {
251	                    logger.warn('Field commit response returned non-fatal errors', {
252	                        matchcode,
253	                        errors: response.errors,
254	                    });
255	                    return;
256	                }
257	
258	                const commands = parseBrowserCommandsFromXMLServerCall(response);
259	                if (commands.length === 0) {
260	                    return;
261	                }
262	
263	                dispatch({ type: 'SET_COMMANDS', commands });
264	                onBrowserCommands?.(commands);
265	
266	                for (const command of commands) {
267	                    const verb = command.verb.toUpperCase();
268	
269	                    if (verb === 'SET_TEXT') {
270	                        formMethods.setValue(command.noun, command.addinf, {
271	                            shouldValidate: true,
272	                            shouldDirty: true,
273	                            shouldTouch: false,
274	                        });
275	                        continue;
276	                    }
277	
278	                    if (verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS') {


========== IMG_1946.md ==========
---
photo: IMG_1946.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 251-281 (sticky headers 102, 172, 173)
orientation: 0
confidence: high
notes: Near-duplicate viewport of IMG_1945 (fully overlapping content, lines 251-281). Line 251 partially hidden under sticky header ("logger.warn('Field commit response returned non-fatal errors', {" faintly visible). Tab "use-modal-actions.ts 3". Status bar - hitanshu/experimental*, errors 5 / warnings 0, "No Solution". Same Explorer sidebar (PolicyLobGrid.tsx U).
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
251	                    logger.warn('Field commit response returned non-fatal errors', {  ⟪partially hidden under sticky header⟫
252	                        matchcode,
253	                        errors: response.errors,
254	                    });
255	                    return;
256	                }
257	
258	                const commands = parseBrowserCommandsFromXMLServerCall(response);
259	                if (commands.length === 0) {
260	                    return;
261	                }
262	
263	                dispatch({ type: 'SET_COMMANDS', commands });
264	                onBrowserCommands?.(commands);
265	
266	                for (const command of commands) {
267	                    const verb = command.verb.toUpperCase();
268	
269	                    if (verb === 'SET_TEXT') {
270	                        formMethods.setValue(command.noun, command.addinf, {
271	                            shouldValidate: true,
272	                            shouldDirty: true,
273	                            shouldTouch: false,
274	                        });
275	                        continue;
276	                    }
277	
278	                    if (verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS') {
279	                        const listItems = response.results?.aqs?.ListItems?.value;
280	                        const options = parseComboItems(listItems);
281	                        if (options.length > 0) {


========== IMG_1945.md ==========
---
photo: IMG_1945.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 254-284 (sticky headers 102, 172, 173)
orientation: 0
confidence: high
notes: Same session, scrolled further (overlaps IMG_1944 lines 254-278). Tab "use-modal-actions.ts 3". Status bar - hitanshu/experimental*, errors 5 / warnings 0, "No Solution". Lines 283-284 at bottom edge partially readable (line 284 "matchcode: command.noun" cut by taskbar). Same Explorer sidebar.
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
254	                    });
255	                    return;
256	                }
257	
258	                const commands = parseBrowserCommandsFromXMLServerCall(response);
259	                if (commands.length === 0) {
260	                    return;
261	                }
262	
263	                dispatch({ type: 'SET_COMMANDS', commands });
264	                onBrowserCommands?.(commands);
265	
266	                for (const command of commands) {
267	                    const verb = command.verb.toUpperCase();
268	
269	                    if (verb === 'SET_TEXT') {
270	                        formMethods.setValue(command.noun, command.addinf, {
271	                            shouldValidate: true,
272	                            shouldDirty: true,
273	                            shouldTouch: false,
274	                        });
275	                        continue;
276	                    }
277	
278	                    if (verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS') {
279	                        const listItems = response.results?.aqs?.ListItems?.value;
280	                        const options = parseComboItems(listItems);
281	                        if (options.length > 0) {
282	                            dispatch({
283	                                type: 'PATCH_FIELD_OPTIONS',
284	                                matchcode: command.noun⟪,?⟫ ⟪cut off by taskbar⟫


========== IMG_1947.md ==========
---
photo: IMG_1947.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 265-294 (sticky headers 102, 172, 173)
orientation: 0
confidence: high
notes: Continues IMG_1945/1946 (overlap 265-284). Faint line under sticky header reads "onBrowserCommands?.(commands);" (line 264). Tab "use-modal-actions.ts 3". Status bar - hitanshu/experimental*, errors 5 / warnings 0, "No Solution". Line 294 "});" at bottom edge near taskbar. Same Explorer sidebar.
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
265	
266	                for (const command of commands) {
267	                    const verb = command.verb.toUpperCase();
268	
269	                    if (verb === 'SET_TEXT') {
270	                        formMethods.setValue(command.noun, command.addinf, {
271	                            shouldValidate: true,
272	                            shouldDirty: true,
273	                            shouldTouch: false,
274	                        });
275	                        continue;
276	                    }
277	
278	                    if (verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS') {
279	                        const listItems = response.results?.aqs?.ListItems?.value;
280	                        const options = parseComboItems(listItems);
281	                        if (options.length > 0) {
282	                            dispatch({
283	                                type: 'PATCH_FIELD_OPTIONS',
284	                                matchcode: command.noun,
285	                                options,
286	                            });
287	                        }
288	                    }
289	                }
290	            } catch (error) {
291	                logger.error('Non-fatal modal field commit failed', error as Error, {
292	                    matchcode,
293	                    eventType,
294	                });


========== IMG_1948.md ==========
---
photo: IMG_1948.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 272-302 (sticky headers 102, 172, 173)
orientation: 0
confidence: high
notes: Continues IMG_1947 (overlap 272-294); shows end of handleCommitField try/catch and start of useCallback dependency array. Line 272 partially hidden under sticky header ("shouldDirty: true," faint). Tab "use-modal-actions.ts 3". Status bar - hitanshu/experimental*, errors 5 / warnings 0, "No Solution". Line 302 at bottom edge. Same Explorer sidebar (PolicyLobGrid.tsx U).
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
272	                            shouldDirty: true,  ⟪partially hidden under sticky header⟫
273	                            shouldTouch: false,
274	                        });
275	                        continue;
276	                    }
277	
278	                    if (verb === 'LOAD_COMBO' || verb === 'LOAD_COMBOS') {
279	                        const listItems = response.results?.aqs?.ListItems?.value;
280	                        const options = parseComboItems(listItems);
281	                        if (options.length > 0) {
282	                            dispatch({
283	                                type: 'PATCH_FIELD_OPTIONS',
284	                                matchcode: command.noun,
285	                                options,
286	                            });
287	                        }
288	                    }
289	                }
290	            } catch (error) {
291	                logger.error('Non-fatal modal field commit failed', error as Error, {
292	                    matchcode,
293	                    eventType,
294	                });
295	            }
296	        },
297	        [
298	            xmlDetail,
299	            xmlFileName,
300	            state.fields,
301	            state.fieldOrder,
302	            state.utpOrder,


========== IMG_1949.md ==========
---
photo: IMG_1949.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 283-313 (sticky headers 102, 172, 173)
orientation: 0
confidence: high
notes: Continues IMG_1948 (overlap 283-302). Shows full useCallback dependency array of handleCommitField (298-307) and start of executeButtonAction (310+). Tab "use-modal-actions.ts 3". Status bar - hitanshu/experimental*, errors 5 / warnings 0, "No Solution". Line 313 mostly cut by status bar; faint text looks like "dispatch({ type: 'ERROR', error: '' });". Same Explorer sidebar.
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
283	                                type: 'PATCH_FIELD_OPTIONS',
284	                                matchcode: command.noun,
285	                                options,
286	                            });
287	                        }
288	                    }
289	                }
290	            } catch (error) {
291	                logger.error('Non-fatal modal field commit failed', error as Error, {
292	                    matchcode,
293	                    eventType,
294	                });
295	            }
296	        },
297	        [
298	            xmlDetail,
299	            xmlFileName,
300	            state.fields,
301	            state.fieldOrder,
302	            state.utpOrder,
303	            state.sessionXml,
304	            formMethods,
305	            dispatch,
306	            onBrowserCommands,
307	        ],
308	    );
309	
310	    const executeButtonAction = useCallback(
311	        async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {
312	            dispatch({ type: 'SUBMITTING', submitting: true });
313	            dispatch({ type: 'ERROR', ⟪error: ''⟫ });⟪mostly cut by status bar⟫


========== IMG_1950.md ==========
---
photo: IMG_1950.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 296-326 (sticky headers 102, 172, 173)
orientation: 0
confidence: high
notes: Continues IMG_1949 (overlap 296-313). Shows executeButtonAction body with defensive comment about button.calls. Tab "use-modal-actions.ts 3". Status bar - hitanshu/experimental*, errors 5 / warnings 0, "No Solution". Line 326 gutter visible, content cut at bottom. Same Explorer sidebar (PolicyLobGrid.tsx U).
---
102	export function useModalActions({
172	    const handleCommitField = useCallback(
173	        async (matchcode: string, value: string | number | boolean, eventType: CommitEventType) => {
296	        },
297	        [
298	            xmlDetail,
299	            xmlFileName,
300	            state.fields,
301	            state.fieldOrder,
302	            state.utpOrder,
303	            state.sessionXml,
304	            formMethods,
305	            dispatch,
306	            onBrowserCommands,
307	        ],
308	    );
309	
310	    const executeButtonAction = useCallback(
311	        async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {
312	            dispatch({ type: 'SUBMITTING', submitting: true });
313	            dispatch({ type: 'ERROR', error: '' });
314	
315	            try {
316	                const sessionInfo = getItem<SessionInfo>('sessionInformation');
317	                if (!sessionInfo) {
318	                    throw new Error('Session information not found');
319	                }
320	
321	                // Defensive: accept button.calls possibly undefined and fall back to extract from xmlDetail
322	                const calls =
323	                    Array.isArray(button.calls) && button.calls.length > 0
324	                        ? button.calls
325	                        : extractCallsFromPageBuild(xmlDetail, button.matchcode);
326	⟪cut off at bottom edge⟫


========== IMG_1952.md ==========
---
photo: IMG_1952.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 320-350
orientation: 0
confidence: high
notes: Tab "use-modal-actions.ts" shows 3 problems; sticky-scroll headers show line 102 `export function useModalActions({`, line 310 `const executeButtonAction = useCallback(`, line 311 `async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {`. Line 321 comment runs off right edge of screen ("...extract from xmlDeta" cut). Status bar: branch hitanshu/experimental*, 5 errors 0 warnings, red "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar: aqs-web-ui > src > components with data-grid, modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts [3], use-modal-data.ts, use-modal-state.ts), tabView folder, then action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (git U = untracked), radio.tsx (partially visible). Panels: OUTLINE, TIMELINE, C# PROJECT DETAILS. Line 350 gutter number cut off by Problems bar; a further line below 350 is visible but illegible. modal-dialog folder dot = modified.
---
102	export function useModalActions({          // sticky scroll
310	    const executeButtonAction = useCallback(          // sticky scroll
311	        async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {          // sticky scroll
320
321	            // Defensive: accept button.calls possibly undefined and fall back to extract from xmlDeta⟪?⟫
322	            const calls =
323	                Array.isArray(button.calls) && button.calls.length > 0
324	                    ? button.calls
325	                    : extractCallsFromPageBuild(xmlDetail, button.matchcode);
326
327	            const isCancel = button.matchcode.toUpperCase() === 'CANCEL';
328	            if (calls.length === 0) {
329	                if (isCancel) {
330	                    handleClose();
331	                }
332	                dispatch({ type: 'SUBMITTING', submitting: false });
333	                return;
334	            }
335
336
337	            const payload = buildXMLServerCallPayload({
338	                xmlFileName: xmlFileName || '',
339	                formData: submitFormData,
340	                sessionInfo,
341	                calls,
342	                buttonMatchcode: button.matchcode,
343	                fieldOrder: state.fieldOrder,
344	                utpOrder: state.utpOrder,
345	                sessionXml: state.sessionXml,
346	            });
347
348	            const response = await xmlServerCall(payload);
349	            if (response.errors) {
350	                dispatch({ type: 'ERROR', error: response.errors });


========== IMG_1953.md ==========
---
photo: IMG_1953.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/use-modal-actions.ts
lines: 328-357
orientation: 0
confidence: high
notes: Same editor state as IMG_1952 scrolled down ~8 lines; overlaps lines 328-350. Tab "use-modal-actions.ts" 3 problems. Sticky-scroll headers lines 102/310/311 same as IMG_1952. Status bar: hitanshu/experimental*, 5 errors 0 warnings, "No Solution", TypeScript, CRLF. Explorer sidebar identical to IMG_1952 (modal-dialog folder: index.ts, modal-dialog.tsx, use-modal-actions.ts [3], use-modal-data.ts, use-modal-state.ts; tabView; action-buttons.tsx ... PolicyLobGrid.tsx [U], radio.tsx). Cursor I-beam visible near line 341 text area.
---
102	export function useModalActions({          // sticky scroll
310	    const executeButtonAction = useCallback(          // sticky scroll
311	        async (button: PageBuildButton, submitFormData: Record<string, unknown>) => {          // sticky scroll
328	            if (calls.length === 0) {
329	                if (isCancel) {
330	                    handleClose();
331	                }
332	                dispatch({ type: 'SUBMITTING', submitting: false });
333	                return;
334	            }
335
336
337	            const payload = buildXMLServerCallPayload({
338	                xmlFileName: xmlFileName || '',
339	                formData: submitFormData,
340	                sessionInfo,
341	                calls,
342	                buttonMatchcode: button.matchcode,
343	                fieldOrder: state.fieldOrder,
344	                utpOrder: state.utpOrder,
345	                sessionXml: state.sessionXml,
346	            });
347
348	            const response = await xmlServerCall(payload);
349	            if (response.errors) {
350	                dispatch({ type: 'ERROR', error: response.errors });
351	                dispatch({ type: 'SUBMITTING', submitting: false });
352	                return;
353	            }
354
355	            const commands = parseBrowserCommandsFromXMLServerCall(response);
356	            dispatch({ type: 'SET_COMMANDS', commands });
357	            onBrowserCommands?.(commands);
