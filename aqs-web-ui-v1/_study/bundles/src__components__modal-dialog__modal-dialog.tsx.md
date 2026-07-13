# BUNDLE for src/components/modal-dialog/modal-dialog.tsx
# 20 photo fragment(s), ascending start-line order.


========== IMG_1905.md ==========
---
photo: IMG_1905.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 1-34
orientation: 0
confidence: high
notes: Tab shows "modal-dialog.tsx 9+" (9+ problems in file). Squiggles under 'react' (line 1), '@mui/material' (13), '@mui/icons-material/CloseRounded' (14) - module-resolution errors. Minimap shows heavy red error marks. modal-dialog.tsx highlighted in Explorer with "9+" badge; modal-dialog folder has modified (dot) marker. Status bar: 16 errors 0 warnings, "No Solution", branch hitanshu/experimental*, TypeScript JSX, CRLF. Line 34 partially cut at bottom: "xmlDetail?: unknown;". Clock 4:30 PM 7/10/2026.
---
1	import { useEffect, useRef } from 'react';
2	import {
3	    Dialog as MuiDialog,
4	    DialogTitle,
5	    DialogContent,
6	    DialogActions,
7	    Button,
8	    IconButton,
9	    CircularProgress,
10	    Alert,
11	    Box,
12	    Typography,
13	} from '@mui/material';
14	import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
15
16	import { FormRenderer } from '@components/form-renderer';
17	import { useFormMethods } from '@providers/form-provider';
18	import { createFeatureLogger } from '@utils/logger-builder';
19	import type { CommitEventType } from '@/types';
20	import type { BrowserCommand } from '@utils/apply-server-commands';
21
22	import { useModalData } from '@components/modal-dialog/use-modal-data';
23	import { useModalState } from '@components/modal-dialog/use-modal-state';
24	import { useModalActions } from '@components/modal-dialog/use-modal-actions';
25	import { Theme } from '@/constants/theme';
26
27	const logger = createFeatureLogger('modal', 'ModalDialog');
28
29	export interface ModalDialogProps {
30	    open: boolean;
31	    url: string;
32	    width?: string;
33	    height?: string;
34	    xmlDetail?: unknown;


========== IMG_1906.md ==========
---
photo: IMG_1906.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 6-39
orientation: 0
confidence: medium
notes: Large right-click context menu occludes center-right of editor (Go to Definition F12, Go to Type Definition, Go to Source Definition, Go to Implementations Ctrl+F12, Go to References Shift+F12, Peek, Find All References Shift+Alt+F12, Find All Implementations, Show Call Hierarchy Shift+Alt+H, Add File to Chat, Open Inline Chat Ctrl+I, Explain, Review, Rename Symbol F2, Change All Occurrences Ctrl+F2, Format Document Shift+Alt+F, Refactor... Ctrl+Shift+R, Source Action..., Cut/Copy/Paste, Command Palette... Ctrl+Shift+P). Cursor Ln 24 Col 21 (on useModalActions import). Lines 6-33 match IMG_1905 content where visible. Explorer now also shows loader.tsx, PolicyLobGrid.tsx (U = untracked git marker), radio.tsx. Source-control badge 27. 16 errors, No Solution. Right-edge fragments visible past menu: line 19 "ded';", 20 "mmands';", 22 "-modal-data';", 23 "-modal-state';", 24 "se-modal-actions';", 38-39 area "y?: string }) => void;" and "d;".
---
6	    DialogActions,
7	    Button,
8	    IconButton,
9	    CircularProgress,
10	    Alert,
11	    Box,
12	    Typography,
13	} from '@mui/materia⟪?menu occludes⟫
14	import CloseRoundedI⟪?⟫
15
16	import { FormRendere⟪?⟫
17	import { useFormMeth⟪?⟫
18	import { createFeatu⟪?⟫
19	import type { Commit⟪?⟫ ⟪…⟫ded';
20	import type { Browse⟪?⟫ ⟪…⟫mmands';
21
22	import { useModalDat⟪?⟫ ⟪…⟫-modal-data';
23	import { useModalSta⟪?⟫ ⟪…⟫-modal-state';
24	import { useModalAct⟪?⟫ ⟪…⟫se-modal-actions';
25	import { Theme } fro⟪?⟫
26
27	const logger = creat⟪?⟫
28
29	export interface Mod⟪?⟫
30	    open: boolean;
31	    url: string;
32	    width?: string;
33	    height?: string;
34	    xmlDetail?: unkn⟪?⟫
35	    xmlFileName?: st⟪?⟫
36	    browserCommands?⟪?⟫
37	    onClose: (deferr⟪?⟫
38	    onBrowserCommand⟪?⟫ ⟪…⟫y?: string }) => void;
39	}


========== IMG_1907.md ==========
---
photo: IMG_1907.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 6-39
orientation: 0
confidence: high
notes: Same view as IMG_1906 but context menu closed - completes the occluded lines. Cursor Ln 24 Col 21; status bar shows git blame "Chavan (4 months ago)". Squiggles under '@mui/material' and '@mui/icons-material/CloseRounded'. 16 errors 0 warnings, No Solution, branch hitanshu/experimental*. Explorer: modal-dialog expanded (index.ts, modal-dialog.tsx 9+, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView collapsed, plus action-buttons.tsx through radio.tsx; PolicyLobGrid.tsx marked U. Source control badge 27.
---
6	    DialogActions,
7	    Button,
8	    IconButton,
9	    CircularProgress,
10	    Alert,
11	    Box,
12	    Typography,
13	} from '@mui/material';
14	import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
15
16	import { FormRenderer } from '@components/form-renderer';
17	import { useFormMethods } from '@providers/form-provider';
18	import { createFeatureLogger } from '@utils/logger-builder';
19	import type { CommitEventType } from '@/types';
20	import type { BrowserCommand } from '@utils/apply-server-commands';
21
22	import { useModalData } from '@components/modal-dialog/use-modal-data';
23	import { useModalState } from '@components/modal-dialog/use-modal-state';
24	import { useModalActions } from '@components/modal-dialog/use-modal-actions';
25	import { Theme } from '@/constants/theme';
26
27	const logger = createFeatureLogger('modal', 'ModalDialog');
28
29	export interface ModalDialogProps {
30	    open: boolean;
31	    url: string;
32	    width?: string;
33	    height?: string;
34	    xmlDetail?: unknown;
35	    xmlFileName?: string;
36	    browserCommands?: BrowserCommand[];
37	    onClose: (deferredNavigation?: { action: string; nodeKey?: string }) => void;
38	    onBrowserCommands?: (commands: BrowserCommand[]) => void;
39	}


========== IMG_1908.md ==========
---
photo: IMG_1908.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 17-50
orientation: 0
confidence: high
notes: Scrolled slightly down from IMG_1907. Squiggles under React.FC destructured props (open, url, xmlDetail, xmlFileName, browserCommandsFromProps, onClose) - likely unresolved-type errors from failed module resolution. 16 errors, No Solution, blame "Chavan (4 months ago)", Ln 24 Col 21. Line 50 cut off at bottom edge (partially visible under line 49, illegible). Note comment on line 46 about size controlled via CSS.
---
17	import { useFormMethods } from '@providers/form-provider';
18	import { createFeatureLogger } from '@utils/logger-builder';
19	import type { CommitEventType } from '@/types';
20	import type { BrowserCommand } from '@utils/apply-server-commands';
21
22	import { useModalData } from '@components/modal-dialog/use-modal-data';
23	import { useModalState } from '@components/modal-dialog/use-modal-state';
24	import { useModalActions } from '@components/modal-dialog/use-modal-actions';
25	import { Theme } from '@/constants/theme';
26
27	const logger = createFeatureLogger('modal', 'ModalDialog');
28
29	export interface ModalDialogProps {
30	    open: boolean;
31	    url: string;
32	    width?: string;
33	    height?: string;
34	    xmlDetail?: unknown;
35	    xmlFileName?: string;
36	    browserCommands?: BrowserCommand[];
37	    onClose: (deferredNavigation?: { action: string; nodeKey?: string }) => void;
38	    onBrowserCommands?: (commands: BrowserCommand[]) => void;
39	}
40
41	const ModalDialog: React.FC<ModalDialogProps> = ({
42	    open,
43	    url,
44	    // width = '800',
45	    // height = '600', // Size is now controlled via CSS in ModalDialog for better responsiveness
46	    xmlDetail,
47	    xmlFileName,
48	    browserCommands: browserCommandsFromProps,
49	    onClose,
50	⟪?cut off at bottom⟫


========== IMG_1909.md ==========
---
photo: IMG_1909.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 27-61
orientation: 0
confidence: high
notes: Continuation scroll of same file. Squiggles under destructured props open, url, xmlDetail, xmlFileName, browserCommandsFromProps, onClose, onBrowserCommands and under React.FC. 16 errors, No Solution, blame "Chavan (4 months ago)", Ln 24 Col 21. Line 61 partially cut at bottom ("open," visible, taken as line 61). Mouse I-beam near line 45 over '600'.
---
27	const logger = createFeatureLogger('modal', 'ModalDialog');
28
29	export interface ModalDialogProps {
30	    open: boolean;
31	    url: string;
32	    width?: string;
33	    height?: string;
34	    xmlDetail?: unknown;
35	    xmlFileName?: string;
36	    browserCommands?: BrowserCommand[];
37	    onClose: (deferredNavigation?: { action: string; nodeKey?: string }) => void;
38	    onBrowserCommands?: (commands: BrowserCommand[]) => void;
39	}
40
41	const ModalDialog: React.FC<ModalDialogProps> = ({
42	    open,
43	    url,
44	    // width = '800',
45	    // height = '600', // Size is now controlled via CSS in ModalDialog for better responsiveness
46	    xmlDetail,
47	    xmlFileName,
48	    browserCommands: browserCommandsFromProps,
49	    onClose,
50	    onBrowserCommands,
51	}) => {
52	    const formMethods = useFormMethods();
53	    const { reset } = formMethods;
54	    const { state, dispatch } = useModalState();
55	    const processedData = useModalData(xmlDetail);
56	    const wasOpenRef = useRef(false);
57
58	    const { handleClose, handleCommitField, handleButtonClick, isButtonActionAllowed } =
59	        useModalActions({
60	            open,
61	⟪?cut off at bottom⟫


========== IMG_1910.md ==========
---
photo: IMG_1910.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 41-73
orientation: 0
confidence: high
notes: Continuation scroll. Squiggles under open/url/xmlDetail/xmlFileName/browserCommandsFromProps/onClose/onBrowserCommands (destructure) and React.FC and isButtonActionAllowed. 16 errors, No Solution, blame "Chavan (4 months ago)", Ln 24 Col 21. Line 40 gutter partially visible at very top (blank). Line 73 "return;" visible at bottom edge.
---
41	const ModalDialog: React.FC<ModalDialogProps> = ({
42	    open,
43	    url,
44	    // width = '800',
45	    // height = '600', // Size is now controlled via CSS in ModalDialog for better responsiveness
46	    xmlDetail,
47	    xmlFileName,
48	    browserCommands: browserCommandsFromProps,
49	    onClose,
50	    onBrowserCommands,
51	}) => {
52	    const formMethods = useFormMethods();
53	    const { reset } = formMethods;
54	    const { state, dispatch } = useModalState();
55	    const processedData = useModalData(xmlDetail);
56	    const wasOpenRef = useRef(false);
57
58	    const { handleClose, handleCommitField, handleButtonClick, isButtonActionAllowed } =
59	        useModalActions({
60	            open,
61	            xmlDetail,
62	            xmlFileName,
63	            state,
64	            dispatch,
65	            formMethods,
66	            onClose,
67	            onBrowserCommands,
68	        });
69
70	    useEffect(() => {
71	        if (!open) {
72	            wasOpenRef.current = false;
73	            return;


========== IMG_1911.md ==========
---
photo: IMG_1911.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 41,52-84
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 41 "const ModalDialog: React.FC<ModalDialogProps> = ({". Body lines 52-84. Line 84 half-cut by status bar, reads approximately "dispatch({ type: 'ERROR', error: processedData.error });" - marked partial. 16 errors, No Solution, blame "Chavan (4 months ago)", Ln 24 Col 21. isButtonActionAllowed underlined (squiggle) on line 58.
---
41	const ModalDialog: React.FC<ModalDialogProps> = ({   [sticky scroll]
52	    const formMethods = useFormMethods();
53	    const { reset } = formMethods;
54	    const { state, dispatch } = useModalState();
55	    const processedData = useModalData(xmlDetail);
56	    const wasOpenRef = useRef(false);
57
58	    const { handleClose, handleCommitField, handleButtonClick, isButtonActionAllowed } =
59	        useModalActions({
60	            open,
61	            xmlDetail,
62	            xmlFileName,
63	            state,
64	            dispatch,
65	            formMethods,
66	            onClose,
67	            onBrowserCommands,
68	        });
69
70	    useEffect(() => {
71	        if (!open) {
72	            wasOpenRef.current = false;
73	            return;
74	        }
75
76	        if (wasOpenRef.current) {
77	            return;
78	        }
79
80	        wasOpenRef.current = true;
81	        dispatch({ type: 'LOADING' });
82
83	        if (processedData.error) {
84	            dispatch({ type: 'ERROR'⟪?⟫ error: processedData.error });⟪partially cut⟫


========== IMG_1912.md ==========
---
photo: IMG_1912.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 41,65-97
orientation: 0
confidence: high
notes: Sticky-scroll header line 41 "const ModalDialog: React.FC<ModalDialogProps> = ({". Body 65-97. 16 errors, No Solution, blame "Chavan (4 months ago)", Ln 24 Col 21. Line 97 at bottom edge fully legible. useEffect at line 70 not indented inside component per gutter (appears at col 1 - actually indented one level, alignment skewed by photo angle).
---
41	const ModalDialog: React.FC<ModalDialogProps> = ({   [sticky scroll]
65	            formMethods,
66	            onClose,
67	            onBrowserCommands,
68	        });
69
70	    useEffect(() => {
71	        if (!open) {
72	            wasOpenRef.current = false;
73	            return;
74	        }
75
76	        if (wasOpenRef.current) {
77	            return;
78	        }
79
80	        wasOpenRef.current = true;
81	        dispatch({ type: 'LOADING' });
82
83	        if (processedData.error) {
84	            dispatch({ type: 'ERROR', error: processedData.error });
85	            return;
86	        }
87
88	        logger.info('Processing modal data from props', {
89	            hasXmlDetail: !!xmlDetail,
90	            xmlFileName,
91	            commandCount: browserCommandsFromProps?.length || 0,
92	            url,
93	            fieldCount: processedData.fields.length,
94	        });
95
96	        reset(processedData.defaultValues);
97


========== IMG_1913.md ==========
---
photo: IMG_1913.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 41,70,79-110
orientation: 0
confidence: high
notes: Sticky-scroll headers - line 41 "const ModalDialog: React.FC<ModalDialogProps> = ({" and line 70 "useEffect(() => {". Body 79-110, plus a wrapped/next line under 110 visible: "// eslint-disable-next-line react-hooks/exhaustive-deps" (likely line 111). 16 errors, No Solution, blame "Chavan (4 months ago)", Ln 24 Col 21.
---
41	const ModalDialog: React.FC<ModalDialogProps> = ({   [sticky scroll]
70	    useEffect(() => {   [sticky scroll]
79
80	        wasOpenRef.current = true;
81	        dispatch({ type: 'LOADING' });
82
83	        if (processedData.error) {
84	            dispatch({ type: 'ERROR', error: processedData.error });
85	            return;
86	        }
87
88	        logger.info('Processing modal data from props', {
89	            hasXmlDetail: !!xmlDetail,
90	            xmlFileName,
91	            commandCount: browserCommandsFromProps?.length || 0,
92	            url,
93	            fieldCount: processedData.fields.length,
94	        });
95
96	        reset(processedData.defaultValues);
97
98	        dispatch({
99	            type: 'SUCCESS',
100	            payload: {
101	                fields: processedData.fields,
102	                buttons: processedData.buttons,
103	                metadata: processedData.metadata,
104	                fieldOrder: processedData.fieldOrder,
105	                utpOrder: processedData.utpOrder,
106	                sessionXml: processedData.sessionXml,
107	                browserCommands: browserCommandsFromProps || [],
108	            },
109	        });
110	        // eslint-disable-next-line react-hooks/exhaustive-deps


========== IMG_1914.md ==========
---
photo: IMG_1914.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 41,70,90-121
orientation: 0
confidence: high
notes: Sticky-scroll headers line 41 and line 70 (useEffect). Body 90-121. Red squiggles under the JSX lines 116-120 (MuiDialog/DialogTitle etc - JSX type errors from unresolved React/MUI). 16 errors, No Solution, blame "Chavan (4 months ago)", Ln 24 Col 21. Line 121 mostly cut by status bar - appears to be "justifyContent: 'space-between'," (marked uncertain).
---
41	const ModalDialog: React.FC<ModalDialogProps> = ({   [sticky scroll]
70	    useEffect(() => {   [sticky scroll]
90	            xmlFileName,
91	            commandCount: browserCommandsFromProps?.length || 0,
92	            url,
93	            fieldCount: processedData.fields.length,
94	        });
95
96	        reset(processedData.defaultValues);
97
98	        dispatch({
99	            type: 'SUCCESS',
100	            payload: {
101	                fields: processedData.fields,
102	                buttons: processedData.buttons,
103	                metadata: processedData.metadata,
104	                fieldOrder: processedData.fieldOrder,
105	                utpOrder: processedData.utpOrder,
106	                sessionXml: processedData.sessionXml,
107	                browserCommands: browserCommandsFromProps || [],
108	            },
109	        });
110	        // eslint-disable-next-line react-hooks/exhaustive-deps
111	    }, [open]);
112
113	    const hasFields = state.fields.length > 0;
114
115	    return (
116	        <MuiDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
117	            <DialogTitle
118	                sx={{
119	                    display: 'flex',
120	                    alignItems: 'center',
121	                    justifyContent: 'space-between'⟪?partially cut⟫


========== IMG_1915.md ==========
---
photo: IMG_1915.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 41-134 (sticky headers 41,70,100; body 104-134)
orientation: 0
confidence: high
notes: >
  Explorer sidebar (aqs-web-ui/src/components) expanded: data-grid, modal-dialog
  (index.ts, modal-dialog.tsx [active, 9+ unsaved changes], use-modal-actions.ts,
  use-modal-data.ts, use-modal-state.ts), tabView, action-buttons.tsx, button.tsx,
  buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx,
  field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx,
  loader.tsx, PolicyLobGrid.tsx (marked U/untracked), radio.tsx (cut off).
  Breadcrumb: aqs-web-ui > src > components > modal-dialog > modal-dialog.tsx > ...
  Tab bar shows "modal-dialog.tsx 9+" as only visible/active tab.
  Status bar: branch hitanshu/experimental*, 16 errors / 0 warnings, "No Solution",
  "Chavan (4 months ago)" (git blame on current line), Ln 24 Col 21, Tab Size 4,
  UTF-8, CRLF, TypeScript JSX.
  Sticky scroll pinned headers at top show enclosing scope: line 41 (component decl),
  line 70 (useEffect), line 100 (payload object literal start) — these are NOT
  repeated in the body transcription below.
  Heavy red squiggly underlines (lint/type errors) across lines 117-133 (the JSX
  return block), consistent with the "16 errors" status bar count.
  Color swatch icon (small blue square) rendered inline before '#0A2C6E' on line 122
  — this is a VS Code color-preview decoration, not code text.
  Line 134 is the last gutter number visible before the frame's bottom edge; its
  code text was not legible/captured in this photo (likely continues to
  <DialogContent> or similar based on JSX structure).
  Verified via multiple high-zoom crops of the photo to resolve line-number/text
  alignment (photo taken at an angle causing perspective shear).
---
[Sticky scroll headers, pinned — enclosing scope, not part of contiguous body]
41	const ModalDialog: React.FC<ModalDialogProps> = ({
70	    useEffect(() => {
100	        payload: {

[Body, contiguous 104-134]
104	            fieldOrder: processedData.fieldOrder,
105	            utpOrder: processedData.utpOrder,
106	            sessionXml: processedData.sessionXml,
107	            browserCommands: browserCommandsFromProps || [],
108	        },
109	    });
110	    // eslint-disable-next-line react-hooks/exhaustive-deps
111	}, [open]);
112	
113	const hasFields = state.fields.length > 0;
114	
115	return (
116	    <MuiDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
117	        <DialogTitle
118	            sx={{
119	                display: 'flex',
120	                alignItems: 'center',
121	                justifyContent: 'space-between',
122	                color: '#0A2C6E',
123	                padding: '5px 20px',
124	                fontWeight: 700,
125	                fontSize: '1rem'
126	            }}
127	        >
128	
129	            {state.metadata.title || 'Modal'}
130	
131	            <IconButton onClick={handleClose} size="small" aria-label="Close modal">
132	                <CloseRoundedIcon />
133	            </IconButton>
134	        </DialogTitle>⟪?⟫ (line 134 gutter visible, text not legible in frame)


========== IMG_1916.md ==========
---
photo: IMG_1916.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 101-131 (sticky: 41, 70, 100)
orientation: 0
confidence: high
notes: Tab "modal-dialog.tsx 9+" (9+ problems in file). Breadcrumb aqs-web-ui > src > components > modal-dialog > modal-dialog.tsx. Red squiggles under nearly all JSX lines 116-131 (16 errors, 0 warnings in status bar; red "No Solution" indicator). Branch hitanshu/experimental*, blame "Chavan (4 months ago)", Ln 24 Col 21, TypeScript JSX, CRLF. Explorer sidebar: src/components/{data-grid, modal-dialog/{index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts}, tabView/}, then component files: action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U = untracked), radio.tsx. Line 101 partially occluded by sticky-scroll edge but legible.
---
Sticky scroll headers:
  41	  const ModalDialog: React.FC<ModalDialogProps> = ({
  70	      useEffect(() => {
 100	            payload: {

 101	              fields: processedData.fields,
 102	              buttons: processedData.buttons,
 103	              metadata: processedData.metadata,
 104	              fieldOrder: processedData.fieldOrder,
 105	              utpOrder: processedData.utpOrder,
 106	              sessionXml: processedData.sessionXml,
 107	              browserCommands: browserCommandsFromProps || [],
 108	            },
 109	          });
 110	          // eslint-disable-next-line react-hooks/exhaustive-deps
 111	        }, [open]);
 112	
 113	        const hasFields = state.fields.length > 0;
 114	
 115	        return (
 116	          <MuiDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
 117	            <DialogTitle
 118	              sx={{
 119	                display: 'flex',
 120	                alignItems: 'center',
 121	                justifyContent: 'space-between',
 122	                color: '#0A2C6E',
 123	                padding: '5px 20px',
 124	                fontWeight: 700,
 125	                fontSize: '1rem',
 126	              }}
 127	            >
 128	
 129	              {state.metadata.title || 'Modal'}
 130	
 131	              <IconButton onClick={handleClose} size="small" aria-label="Close modal">
 132	                <CloseRoundedIcon />


========== IMG_1917.md ==========
---
photo: IMG_1917.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 111-142 (sticky: 41, 70)
orientation: 0
confidence: high
notes: Same file as IMG_1916, scrolled down. Tab "modal-dialog.tsx 9+". Red squiggles under all JSX lines 116-142. Status bar: 16 errors 0 warnings, "No Solution", branch hitanshu/experimental*, Ln 24 Col 21, blame "Chavan (4 months ago)". Line 136 token read as `Theme.colors.popupBG` (photo shows slight gap "popup BG" but squiggle underline suggests one identifier). Line below 142 at bottom edge cut off/blurred (looks like a comparison against 'OK'/'SUBMIT'... — marked illegible). Explorer sidebar same as IMG_1916 (modal-dialog folder expanded; PolicyLobGrid.tsx U).
---
Sticky scroll headers:
  41	  const ModalDialog: React.FC<ModalDialogProps> = ({
  70	      useEffect(() => {

 111	        }, [open]);
 112	
 113	        const hasFields = state.fields.length > 0;
 114	
 115	        return (
 116	          <MuiDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
 117	            <DialogTitle
 118	              sx={{
 119	                display: 'flex',
 120	                alignItems: 'center',
 121	                justifyContent: 'space-between',
 122	                color: '#0A2C6E',
 123	                padding: '5px 20px',
 124	                fontWeight: 700,
 125	                fontSize: '1rem',
 126	              }}
 127	            >
 128	
 129	              {state.metadata.title || 'Modal'}
 130	
 131	              <IconButton onClick={handleClose} size="small" aria-label="Close modal">
 132	                <CloseRoundedIcon />
 133	              </IconButton>
 134	            </DialogTitle>
 135	
 136	            <DialogActions sx={{ bgcolor: Theme.colors.popupBG, padding: '10px 20px' }}>
 137	              {state.buttons.length > 0 ? (
 138	                state.buttons
 139	                  .filter((button) => button.visible)
 140	                  .map((button) => {
 141	                    const upper = button.matchcode.toUpperCase();
 142	                    const isPrimary =
 143	                      ⟪?⟫ (bottom edge: appears to compare upper === 'OK' || upper === 'SUBMIT' || ... 'NEXT' — illegible)


========== IMG_1918.md ==========
---
photo: IMG_1918.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 123-155 (sticky: 41)
orientation: 0
confidence: high
notes: Same file, scrolled further. Red squiggles on all JSX lines (16 errors, "No Solution"). Line 136 again reads `Theme.colors.popup BG` with a visible gap — most likely `Theme.colors.popupBG`. This photo confirms the line cut off in IMG_1917 (143-144). Branch hitanshu/experimental*, blame Chavan (4 months ago). Explorer sidebar same as prior photos.
---
Sticky scroll header:
  41	  const ModalDialog: React.FC<ModalDialogProps> = ({

 123	                padding: '5px 20px',
 124	                fontWeight: 700,
 125	                fontSize: '1rem',
 126	              }}
 127	            >
 128	
 129	              {state.metadata.title || 'Modal'}
 130	
 131	              <IconButton onClick={handleClose} size="small" aria-label="Close modal">
 132	                <CloseRoundedIcon />
 133	              </IconButton>
 134	            </DialogTitle>
 135	
 136	            <DialogActions sx={{ bgcolor: Theme.colors.popupBG, padding: '10px 20px' }}>
 137	              {state.buttons.length > 0 ? (
 138	                state.buttons
 139	                  .filter((button) => button.visible)
 140	                  .map((button) => {
 141	                    const upper = button.matchcode.toUpperCase();
 142	                    const isPrimary =
 143	                      upper === 'OK' || upper === 'SUBMIT' || upper === 'NEXT';
 144	                    const isActionPermitted = isButtonActionAllowed(upper);
 145	
 146	                    return (
 147	                      <Button
 148	                        key={button.matchcode}
 149	                        variant={isPrimary ? 'primary' : 'secondary'}
 150	                        className="px-7! py-1!"
 151	                        onClick={() => handleButtonClick(button)}
 152	                        // Keep guarded actions visible but disabled when permission is denied.
 153	                        disabled={
 154	                          state.submitting || button.disabled || !isActionPermitted
 155	                        }


========== IMG_1919.md ==========
---
photo: IMG_1919.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 137-169 (sticky: 41)
orientation: 0
confidence: high
notes: Same file, scrolled further; overlaps IMG_1918 (137-155) and confirms it. Line numbering anchored to IMG_1917/1918 overlap (153 disabled={, 154 state.submitting...). Red squiggles on all lines, 16 errors, "No Solution", branch hitanshu/experimental*, blame Chavan (4 months ago). Line 169 "</Button>" partially cut at bottom edge. Explorer sidebar identical to prior photos.
---
Sticky scroll header:
  41	  const ModalDialog: React.FC<ModalDialogProps> = ({

 137	              {state.buttons.length > 0 ? (
 138	                state.buttons
 139	                  .filter((button) => button.visible)
 140	                  .map((button) => {
 141	                    const upper = button.matchcode.toUpperCase();
 142	                    const isPrimary =
 143	                      upper === 'OK' || upper === 'SUBMIT' || upper === 'NEXT';
 144	                    const isActionPermitted = isButtonActionAllowed(upper);
 145	
 146	                    return (
 147	                      <Button
 148	                        key={button.matchcode}
 149	                        variant={isPrimary ? 'primary' : 'secondary'}
 150	                        className="px-7! py-1!"
 151	                        onClick={() => handleButtonClick(button)}
 152	                        // Keep guarded actions visible but disabled when permission is denied.
 153	                        disabled={
 154	                          state.submitting || button.disabled || !isActionPermitted
 155	                        }
 156	                      >
 157	                        {button.text || button.matchcode}
 158	                      </Button>
 159	                    );
 160	                  })
 161	              ) : (
 162	                <Button
 163	                  onClick={handleClose}
 164	                  variant="primary"
 165	                  className="px-7! py-1!"
 166	                  disabled={state.submitting}
 167	                >
 168	                  Cancel
 169	                </Button>


========== IMG_1920.md ==========
---
photo: IMG_1920.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 143-174 (sticky: 41, 139)
orientation: 0
confidence: high
notes: Same file, scrolled further; heavy overlap with IMG_1919 (143-169), new lines 170-174. Line 143 partially occluded by sticky-scroll edge/blur but consistent with IMG_1919. Line 174 at bottom edge, slightly cut but legible. Red squiggles everywhere, 16 errors, "No Solution", branch hitanshu/experimental*, blame Chavan (4 months ago). Explorer sidebar identical.
---
Sticky scroll headers:
  41	  const ModalDialog: React.FC<ModalDialogProps> = ({
 139	                  .map((button) => {

 143	                      upper === 'OK' || upper === 'SUBMIT' || upper === 'NEXT';
 144	                    const isActionPermitted = isButtonActionAllowed(upper);
 145	
 146	                    return (
 147	                      <Button
 148	                        key={button.matchcode}
 149	                        variant={isPrimary ? 'primary' : 'secondary'}
 150	                        className="px-7! py-1!"
 151	                        onClick={() => handleButtonClick(button)}
 152	                        // Keep guarded actions visible but disabled when permission is denied.
 153	                        disabled={
 154	                          state.submitting || button.disabled || !isActionPermitted
 155	                        }
 156	                      >
 157	                        {button.text || button.matchcode}
 158	                      </Button>
 159	                    );
 160	                  })
 161	              ) : (
 162	                <Button
 163	                  onClick={handleClose}
 164	                  variant="primary"
 165	                  className="px-7! py-1!"
 166	                  disabled={state.submitting}
 167	                >
 168	                  Cancel
 169	                </Button>
 170	              )}
 171	            </DialogActions>
 172	
 173	            <DialogContent dividers className="min-h-50 dialogWrapper">
 174	              {!!(state.metadata.pathLabel || state.metadata.pageLabel) && (


========== IMG_1921.md ==========
---
photo: IMG_1921.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 154-184 (sticky: 41, 139)
orientation: 0
confidence: high
notes: Same file, scrolled further; overlaps IMG_1920 (154-174), new lines 175-184. Below line 184 a partially cut line reads ") : null}" at bottom edge (line 185). Red squiggles on all lines, 16 errors, "No Solution", branch hitanshu/experimental*, blame Chavan (4 months ago). Explorer sidebar identical to prior photos.
---
Sticky scroll headers:
  41	  const ModalDialog: React.FC<ModalDialogProps> = ({
 139	                  .map((button) => {

 154	                          state.submitting || button.disabled || !isActionPermitted
 155	                        }
 156	                      >
 157	                        {button.text || button.matchcode}
 158	                      </Button>
 159	                    );
 160	                  })
 161	              ) : (
 162	                <Button
 163	                  onClick={handleClose}
 164	                  variant="primary"
 165	                  className="px-7! py-1!"
 166	                  disabled={state.submitting}
 167	                >
 168	                  Cancel
 169	                </Button>
 170	              )}
 171	            </DialogActions>
 172	
 173	            <DialogContent dividers className="min-h-50 dialogWrapper">
 174	              {!!(state.metadata.pathLabel || state.metadata.pageLabel) && (
 175	                <Box sx={{ mb: 2 }} display="flex" alignItems="center" gap={4}>
 176	                  {state.metadata.pathLabel ? (
 177	                    <Typography variant="body2" color="text.secondary">
 178	                      {state.metadata.pathLabel}
 179	                    </Typography>
 180	                  ) : null}
 181	                  {state.metadata.pageLabel ? (
 182	                    <Typography variant="body2" color="text.secondary">
 183	                      {state.metadata.pageLabel}
 184	                    </Typography>
 185	                  ) : null}   ⟪partially cut at bottom edge⟫


========== IMG_1922.md ==========
---
photo: IMG_1922.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 169-199 (sticky: 41)
orientation: 0
confidence: high
notes: Same file, scrolled further; overlaps IMG_1921 (169-184), new lines 185-199. Line numbering anchored on overlap (173 DialogContent, 181 pageLabel ternary). A further line below 199 is cut off at bottom edge (starts "{state..." — illegible). Red squiggles on all JSX lines, 16 errors, "No Solution", branch hitanshu/experimental*, blame Chavan (4 months ago). Explorer sidebar identical.
---
Sticky scroll header:
  41	  const ModalDialog: React.FC<ModalDialogProps> = ({

 169	                </Button>
 170	              )}
 171	            </DialogActions>
 172	
 173	            <DialogContent dividers className="min-h-50 dialogWrapper">
 174	              {!!(state.metadata.pathLabel || state.metadata.pageLabel) && (
 175	                <Box sx={{ mb: 2 }} display="flex" alignItems="center" gap={4}>
 176	                  {state.metadata.pathLabel ? (
 177	                    <Typography variant="body2" color="text.secondary">
 178	                      {state.metadata.pathLabel}
 179	                    </Typography>
 180	                  ) : null}
 181	                  {state.metadata.pageLabel ? (
 182	                    <Typography variant="body2" color="text.secondary">
 183	                      {state.metadata.pageLabel}
 184	                    </Typography>
 185	                  ) : null}
 186	                </Box>
 187	              )}
 188	
 189	              {state.loading && (
 190	                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
 191	                  <CircularProgress />
 192	                </Box>
 193	              )}
 194	
 195	              {state.error && (
 196	                <Alert severity="error" sx={{ mb: 2 }}>
 197	                  {state.error}
 198	                </Alert>
 199	              )}


========== IMG_1923.md ==========
---
photo: IMG_1923.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 182-213 (sticky: 41)
orientation: 0
confidence: high
notes: Same file, scrolled further; overlaps IMG_1922 (182-199), new lines 200-213. Line 213 "useReactHookForm" at bottom edge, slightly cut but legible (appears to be a prop on FormRenderer). Red squiggles on all JSX lines, 16 errors, "No Solution", branch hitanshu/experimental*, blame Chavan (4 months ago). Explorer sidebar identical.
---
Sticky scroll header:
  41	  const ModalDialog: React.FC<ModalDialogProps> = ({

 182	                    <Typography variant="body2" color="text.secondary">
 183	                      {state.metadata.pageLabel}
 184	                    </Typography>
 185	                  ) : null}
 186	                </Box>
 187	              )}
 188	
 189	              {state.loading && (
 190	                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
 191	                  <CircularProgress />
 192	                </Box>
 193	              )}
 194	
 195	              {state.error && (
 196	                <Alert severity="error" sx={{ mb: 2 }}>
 197	                  {state.error}
 198	                </Alert>
 199	              )}
 200	
 201	              {!state.loading && !state.error && hasFields && (
 202	                <FormRenderer
 203	                  className="dialogForm"
 204	                  fields={state.fields}
 205	                  onCommitField={
 206	                    handleCommitField as (
 207	                      matchcode: string,
 208	                      value: string | boolean,
 209	                      eventType: CommitEventType,
 210	                    ) => void
 211	                  }
 212	                  disabled={state.submitting}
 213	                  useReactHookForm


========== IMG_1924.md ==========
---
photo: IMG_1924.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/modal-dialog.tsx
lines: 197-225 (end of file)
orientation: 0
confidence: high
notes: >
  Same file/tab as IMG_1915 (modal-dialog.tsx, 9+ unsaved changes), continues
  directly downward to end of file. Explorer sidebar identical to IMG_1915
  (modal-dialog folder expanded: index.ts, modal-dialog.tsx active, use-modal-actions.ts,
  use-modal-data.ts, use-modal-state.ts, then tabView, action-buttons.tsx, button.tsx,
  buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx...).
  Status bar: branch hitanshu/experimental*, 16 errors / 0 warnings, "No Solution",
  Ln 24 Col 21, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Heavy lint/type red
  squiggly underlines through lines 197-218 (the JSX conditional-render block).
  Sticky scroll header still shows line 41 (const ModalDialog: React.FC<ModalDialogProps> = ({).
  Line 209 CommitEventType is truncated at right edge of frame ("CommitE...").
  File ends at line 225 (blank) after `export { ModalDialog };` on 224.
---
41	const ModalDialog: React.FC<ModalDialogProps> = ({   [sticky scroll header]
197	                </Alert>
198	            )}
199	
200	            {!state.loading && !state.error && hasFields && (
201	                <FormRenderer
202	                    className="dialogForm"
203	                    fields={state.fields}
204	                    onCommitField={
205	                        handleCommitField as (
206	                            matchcode: string,
207	                            value: string | boolean,
208	                            eventType: CommitEventType,
209	                        ) => void
210	                    }
211	                    disabled={state.submitting}
212	                    useReactHookForm
213	                />
214	            )}
215
216	            {!state.loading && !state.error && !hasFields && (
217	                <Typography>No content available.</Typography>
218	            )}
219	        </DialogContent>
220	    </MuiDialog>
221	    );
222	};
223
224	export { ModalDialog };
225
