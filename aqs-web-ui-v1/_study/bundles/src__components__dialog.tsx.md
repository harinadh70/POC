# BUNDLE for src/components/dialog.tsx
# 14 photo fragment(s), ascending start-line order.


========== IMG_2071.md ==========
---
photo: IMG_2071.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 1-34
orientation: 0
confidence: high
notes: New tab opened - "dialog.tsx 9+" (active, italicized = preview tab), "date.tsx 9+" tab still open alongside it. dialog.tsx now highlighted/selected in Explorer sidebar (blue background) under components/, right below date.tsx. Status bar problem count jumped from 25 to 52 errors, 0 warnings, "No Solution". Top of file - imports from react and @mui/material, plus 5 mui icon imports and a Theme import from '@/constants/theme'. Type exports for MessageType, DialogType, DialogAction, DialogCloseReason follow.
---
1	import { useId, useCallback } from 'react';
2	import {
3	    Dialog as MuiDialog,
4	    DialogTitle,
5	    DialogContent,
6	    DialogActions,
7	    Button,
8	    Typography,
9	    IconButton,
10	    type DialogProps as MuiDialogProps,
11	} from '@mui/material';
12	
13	// icons
14	import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
15	import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
16	import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
17	import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
18	import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
19	import { Theme } from '@/constants/theme';
20	
21	// ---------------------------------------
22	
23	export type MessageType = 'warning' | 'error' | 'question' | 'information';
24	export type DialogType = 'ok' | 'yesno' | 'yesnocancel';
25	export type DialogAction = 'ok' | 'yes' | 'no' | 'cancel';
26	
27	export type DialogCloseReason =
28	    | 'backdropClick'
29	    | 'escapeKeyDown'
30	    | 'action:ok'
31	    | 'action:yes'
32	    | 'action:no'
33	    | 'action:cancel'
34	    | 'closeButton';


========== IMG_2072.md ==========
---
photo: IMG_2072.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 12-44
orientation: 0
confidence: high
notes: Continues from IMG_2071 (overlap 12-34), scrolled down slightly further to reveal DialogProps interface start. dialog.tsx tab active, selected in Explorer. Status bar 52 errors 0 warnings, No Solution, hitanshu/experimental*.
---
12	
13	// icons
14	import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
15	import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
16	import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
17	import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
18	import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
19	import { Theme } from '@/constants/theme';
20	
21	// ---------------------------------------
22	
23	export type MessageType = 'warning' | 'error' | 'question' | 'information';
24	export type DialogType = 'ok' | 'yesno' | 'yesnocancel';
25	export type DialogAction = 'ok' | 'yes' | 'no' | 'cancel';
26	
27	export type DialogCloseReason =
28	    | 'backdropClick'
29	    | 'escapeKeyDown'
30	    | 'action:ok'
31	    | 'action:yes'
32	    | 'action:no'
33	    | 'action:cancel'
34	    | 'closeButton';
35	
36	export interface DialogProps {
37	    open: boolean;
38	    message: React.ReactNode;
39	    messageType?: MessageType;
40	    dialogType?: DialogType;
41	
42	    /** Events for respective actions */
43	    onOk?: () => void;
44	    onYes?: () => void;


========== IMG_2073.md ==========
---
photo: IMG_2073.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 25-57
orientation: 0
confidence: high
notes: Tab bar shows date.tsx 9+ and dialog.tsx 9+ (active). Breadcrumb aqs-web-ui > src > components > dialog.tsx. Line 24 above viewport is partially occluded by breadcrumb bar (looks like an `export type Dialog...` union line ending with `;`). Explorer sidebar visible under aqs-web-ui/src/components: data-grid/ (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog/ (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView/ (TabPanel.tsx, TabView.tsx), action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx (9+), dialog.tsx (9+, selected), error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx. Bottom panels: OUTLINE, TIMELINE, C# PROJECT DETAILS. Status bar: branch hitanshu/experimental*, 52 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. React.ReactNode has a squiggle under `React` on line 38. Source control badge 27. Taskbar clock 4:37 PM 7/10/2026.
---
25	export type DialogAction = 'ok' | 'yes' | 'no' | 'cancel';
26	
27	export type DialogCloseReason =
28	    | 'backdropClick'
29	    | 'escapeKeyDown'
30	    | 'action:ok'
31	    | 'action:yes'
32	    | 'action:no'
33	    | 'action:cancel'
34	    | 'closeButton';
35	
36	export interface DialogProps {
37	    open: boolean;
38	    message: React.ReactNode;
39	    messageType?: MessageType;
40	    dialogType?: DialogType;
41	
42	    /** Events for respective actions */
43	    onOk?: () => void;
44	    onYes?: () => void;
45	    onNo?: () => void;
46	    onCancel?: () => void;
47	
48	    /** Called whenever the dialog should close */
49	    onClose: (reason?: DialogCloseReason) => void;
50	
51	    /** UI/Behavior customizations */
52	    title?: string;
53	    okText?: string;
54	    yesText?: string;
55	    noText?: string;
56	    cancelText?: string;
57	    autoFocusButton?: DialogAction; // which button should get autofocus


========== IMG_2074.md ==========
---
photo: IMG_2074.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 35-68
orientation: 0
confidence: high
notes: Same session as IMG_2073, scrolled down (overlaps lines 35-57). Tabs: date.tsx 9+, dialog.tsx 9+ (active). Squiggle under `React` on line 38. Explorer sidebar same as IMG_2073 (components: data-grid/, modal-dialog/, tabView/, action-buttons.tsx ... form-renderer.tsx). Status bar: hitanshu/experimental*, 52 errors 0 warnings, No Solution, TypeScript JSX, CRLF. Line 68 partially cut at bottom edge but legible.
---
35	
36	export interface DialogProps {
37	    open: boolean;
38	    message: React.ReactNode;
39	    messageType?: MessageType;
40	    dialogType?: DialogType;
41	
42	    /** Events for respective actions */
43	    onOk?: () => void;
44	    onYes?: () => void;
45	    onNo?: () => void;
46	    onCancel?: () => void;
47	
48	    /** Called whenever the dialog should close */
49	    onClose: (reason?: DialogCloseReason) => void;
50	
51	    /** UI/Behavior customizations */
52	    title?: string;
53	    okText?: string;
54	    yesText?: string;
55	    noText?: string;
56	    cancelText?: string;
57	    autoFocusButton?: DialogAction; // which button should get autofocus
58	    closeOnAction?: boolean; // default: true
59	    hideCloseIcon?: boolean; // default: false
60	    disableBackdropClose?: boolean; // default: false
61	    disableEscapeKeyDown?: boolean; // default: false
62	
63	    /** Pass-through MUI Dialog props (except open/onClose) */
64	    dialogProps?: Omit<MuiDialogProps, 'open' | 'onClose'>;
65	}
66	
67	const iconForType = (type: MessageType) => {
68	    switch (type) {


========== IMG_2075.md ==========
---
photo: IMG_2075.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 47-78
orientation: 0
confidence: high
notes: Sticky-scroll header at top shows line 36 `export interface DialogProps {`. Same session as IMG_2073/2074, scrolled further. Overlaps 47-65 with IMG_2074. A partially cut line 79 is visible at the very bottom edge (appears to be `defaultTitle: 'Error',` but clipped — not counted). Tabs date.tsx 9+ / dialog.tsx 9+ (active). Status bar: hitanshu/experimental*, 52 errors 0 warnings, No Solution. Explorer sidebar identical to prior photos.
---
36	export interface DialogProps {    <- sticky scroll
47	
48	    /** Called whenever the dialog should close */
49	    onClose: (reason?: DialogCloseReason) => void;
50	
51	    /** UI/Behavior customizations */
52	    title?: string;
53	    okText?: string;
54	    yesText?: string;
55	    noText?: string;
56	    cancelText?: string;
57	    autoFocusButton?: DialogAction; // which button should get autofocus
58	    closeOnAction?: boolean; // default: true
59	    hideCloseIcon?: boolean; // default: false
60	    disableBackdropClose?: boolean; // default: false
61	    disableEscapeKeyDown?: boolean; // default: false
62	
63	    /** Pass-through MUI Dialog props (except open/onClose) */
64	    dialogProps?: Omit<MuiDialogProps, 'open' | 'onClose'>;
65	}
66	
67	const iconForType = (type: MessageType) => {
68	    switch (type) {
69	        case 'warning':
70	            return {
71	                Icon: WarningAmberRoundedIcon,
72	                color: 'warning' as const,
73	                defaultTitle: 'Warning',
74	            };
75	        case 'error':
76	            return {
77	                Icon: ErrorOutlineRoundedIcon,
78	                color: 'error' as const,


========== IMG_2076.md ==========
---
photo: IMG_2076.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 63-94
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 36 `export interface DialogProps {`. Continues from IMG_2075 (overlap 63-78). Case 'information' (line 87) falls through to default (line 88). Tabs date.tsx 9+ / dialog.tsx 9+ (active). Status bar: hitanshu/experimental*, 52 errors 0 warnings, No Solution. Explorer sidebar same repo tree as prior photos.
---
36	export interface DialogProps {    <- sticky scroll
63	    /** Pass-through MUI Dialog props (except open/onClose) */
64	    dialogProps?: Omit<MuiDialogProps, 'open' | 'onClose'>;
65	}
66	
67	const iconForType = (type: MessageType) => {
68	    switch (type) {
69	        case 'warning':
70	            return {
71	                Icon: WarningAmberRoundedIcon,
72	                color: 'warning' as const,
73	                defaultTitle: 'Warning',
74	            };
75	        case 'error':
76	            return {
77	                Icon: ErrorOutlineRoundedIcon,
78	                color: 'error' as const,
79	                defaultTitle: 'Error',
80	            };
81	        case 'question':
82	            return {
83	                Icon: HelpOutlineRoundedIcon,
84	                color: 'info' as const,
85	                defaultTitle: 'Confirm',
86	            };
87	        case 'information':
88	        default:
89	            return {
90	                Icon: InfoOutlinedIcon,
91	                color: 'info' as const,
92	                defaultTitle: 'Informational',
93	            };
94	    }


========== IMG_2077.md ==========
---
photo: IMG_2077.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 76-107
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 67 `const iconForType = (type: MessageType) => {`. Lines 68-75 (switch statement open, case 'warning' block) not visible in this photo - gap between sticky header and scrolled content. Content matches/confirms previously-transcribed IMG_2076 (lines 76-94) then continues into new territory (95-107: end of iconForType, start of Dialog component prop destructuring). Tab "dialog.tsx 9+" active. Status bar 52 errors 0 warnings, No Solution, hitanshu/experimental*.
---
Sticky scroll:
67	const iconForType = (type: MessageType) => {

76	            return {
77	                Icon: ErrorOutlineRoundedIcon,
78	                color: 'error' as const,
79	                defaultTitle: 'Error',
80	            };
81	        case 'question':
82	            return {
83	                Icon: HelpOutlineRoundedIcon,
84	                color: 'info' as const,
85	                defaultTitle: 'Confirm',
86	            };
87	        case 'information':
88	        default:
89	            return {
90	                Icon: InfoOutlinedIcon,
91	                color: 'info' as const,
92	                defaultTitle: 'Informational',
93	            };
94	    }
95	};
96	
97	const Dialog: React.FC<DialogProps> = ({
98	    open,
99	    message,
100	    messageType = 'information',
101	    dialogType = 'ok',
102	
103	    onOk,
104	    onYes,
105	    onNo,
106	    onCancel,
107	    onClose,


========== IMG_2078.md ==========
---
photo: IMG_2078.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 84-115
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 67 `const iconForType = (type: MessageType) => {`. Continues from IMG_2077 (overlap 84-107), scrolled further to reveal more of the Dialog component's destructured props (title, okText, yesText, noText, cancelText, autoFocusButton, closeOnAction). Tab "dialog.tsx 9+" active. Status bar 52 errors 0 warnings, No Solution, hitanshu/experimental*.
---
Sticky scroll:
67	const iconForType = (type: MessageType) => {

84	                color: 'info' as const,
85	                defaultTitle: 'Confirm',
86	            };
87	        case 'information':
88	        default:
89	            return {
90	                Icon: InfoOutlinedIcon,
91	                color: 'info' as const,
92	                defaultTitle: 'Informational',
93	            };
94	    }
95	};
96	
97	const Dialog: React.FC<DialogProps> = ({
98	    open,
99	    message,
100	    messageType = 'information',
101	    dialogType = 'ok',
102	
103	    onOk,
104	    onYes,
105	    onNo,
106	    onCancel,
107	    onClose,
108	
109	    title,
110	    okText = 'OK',
111	    yesText = 'Yes',
112	    noText = 'No',
113	    cancelText = 'Cancel',
114	    autoFocusButton,
115	    closeOnAction = true,


========== IMG_2079.md ==========
---
photo: IMG_2079.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 96-128
orientation: 0
confidence: high
notes: Continues from IMG_2078 (overlap 96-115), scrolled further. Reveals rest of Dialog component's destructured props (hideCloseIcon, disableBackdropClose, disableEscapeKeyDown, dialogProps) and start of component body (iconForType call, useId hooks, fireAction useCallback). Tab "dialog.tsx 9+" active. Status bar 52 errors 0 warnings, No Solution, hitanshu/experimental*.
---
96	
97	const Dialog: React.FC<DialogProps> = ({
98	    open,
99	    message,
100	    messageType = 'information',
101	    dialogType = 'ok',
102	
103	    onOk,
104	    onYes,
105	    onNo,
106	    onCancel,
107	    onClose,
108	
109	    title,
110	    okText = 'OK',
111	    yesText = 'Yes',
112	    noText = 'No',
113	    cancelText = 'Cancel',
114	    autoFocusButton,
115	    closeOnAction = true,
116	    hideCloseIcon = false,
117	    disableBackdropClose = false,
118	    disableEscapeKeyDown = false,
119	
120	    dialogProps,
121	}) => {
122	    const { Icon, defaultTitle } = iconForType(messageType);
123	
124	    const labelId = useId();
125	    const descId = useId();
126	
127	    const fireAction = useCallback(
128	        (action: DialogAction) => {


========== IMG_2085.md ==========
---
photo: IMG_2085.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 97-205 (sticky headers 97, 170, 174; body 175-205)
orientation: 0
confidence: high
notes: Tabs open: date.tsx (9+ problems), dialog.tsx (9+ problems, active). Breadcrumb aqs-web-ui > src > components > dialog.tsx. Red squiggle underlines on most JSX attribute lines 190-205 (look like spell-checker/problem underlines). Status bar: branch hitanshu/experimental*, 52 errors 0 warnings, "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Explorer sidebar visible: src/components with folders data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), plus files action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx (9+), dialog.tsx (9+, highlighted), error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx. Panels: OUTLINE, TIMELINE, C# PROJECT DETAILS. Line-number mapping for 175-187 inferred by counting rows back from 188 "return (" (photo angle skews row alignment) — entries themselves verbatim. Line 205 partially cut at bottom. Minimap shows heavy red (errors). Date/time in taskbar: 4:38 PM 7/10/2026.
---
  97  const Dialog: React.FC<DialogProps> = ({
 170      const buttons: {
 174      }[] =
 175          dialogType === 'ok'
 176              ? [{ key: 'ok', label: okText, color: 'primary' }]
 177              : dialogType === 'yesno'
 178                  ? [
 179                        { key: 'yes', label: yesText, color: 'primary' },
 180                        { key: 'no', label: noText, color: 'inherit' },
 181                    ]
 182                  : [
 183                        { key: 'yes', label: yesText, color: 'primary' },
 184                        { key: 'no', label: noText, color: 'inherit' },
 185                        { key: 'cancel', label: cancelText, color: 'inherit' },
 186                    ];
 187
 188      return (
 189          <MuiDialog
 190              open={open}
 191              onClose={handleBackdropClose}
 192              aria-labelledby={labelId}
 193              aria-describedby={descId}
 194              onKeyDown={handleKeyDown}
 195              {...dialogProps}
 196              className="dialogWrap"
 197          >
 198              <DialogTitle id={labelId} sx={{ pr: hideCloseIcon ? 3 : 6 }}>
 199                  <div className="flex items-center gap-3">
 200                      <Icon
 201                          sx={{
 202                              fontSize: '26px',
 203                              color: Theme.colors.BRAND,
 204                              backgroundColor: Theme.colors.SUBHEADER_BG,
 205                          }}⟪cut off at bottom⟫


========== IMG_2080.md ==========
---
photo: IMG_2080.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 110-141
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 97 `const Dialog: React.FC<DialogProps> = ({`. Continues from IMG_2079 (overlap 110-128), scrolled further into fireAction's switch statement body. Tab "dialog.tsx 9+" active. Status bar 52 errors 0 warnings, No Solution, hitanshu/experimental*.
---
Sticky scroll:
97	const Dialog: React.FC<DialogProps> = ({

110	    okText = 'OK',
111	    yesText = 'Yes',
112	    noText = 'No',
113	    cancelText = 'Cancel',
114	    autoFocusButton,
115	    closeOnAction = true,
116	    hideCloseIcon = false,
117	    disableBackdropClose = false,
118	    disableEscapeKeyDown = false,
119	
120	    dialogProps,
121	}) => {
122	    const { Icon, defaultTitle } = iconForType(messageType);
123	
124	    const labelId = useId();
125	    const descId = useId();
126	
127	    const fireAction = useCallback(
128	        (action: DialogAction) => {
129	            switch (action) {
130	                case 'ok':
131	                    onOk?.();
132	                    break;
133	                case 'yes':
134	                    onYes?.();
135	                    break;
136	                case 'no':
137	                    onNo?.();
138	                    break;
139	                case 'cancel':
140	                    onCancel?.();
141	                    break;


========== IMG_2081.md ==========
---
photo: IMG_2081.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 120-152
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 97 `const Dialog: React.FC<DialogProps> = ({`. Continues from IMG_2080 (overlap 120-141), scrolled further to show end of fireAction useCallback (closeOnAction/onClose logic, dependency array) and start of defaultAction computation. Line 152 is cut off at the right/bottom edge of the screen - trailing line comment reads `// for yesn` then is illegible/truncated, marked ⟪?⟫. Tab "dialog.tsx 9+" active. Status bar 52 errors 0 warnings, No Solution, hitanshu/experimental*.
---
Sticky scroll:
97	const Dialog: React.FC<DialogProps> = ({

120	    dialogProps,
121	}) => {
122	    const { Icon, defaultTitle } = iconForType(messageType);
123	
124	    const labelId = useId();
125	    const descId = useId();
126	
127	    const fireAction = useCallback(
128	        (action: DialogAction) => {
129	            switch (action) {
130	                case 'ok':
131	                    onOk?.();
132	                    break;
133	                case 'yes':
134	                    onYes?.();
135	                    break;
136	                case 'no':
137	                    onNo?.();
138	                    break;
139	                case 'cancel':
140	                    onCancel?.();
141	                    break;
142	            }
143	
144	            if (closeOnAction) {
145	                onClose?.(`action:${action}`);
146	            }
147	        },
148	        [onOk, onYes, onNo, onCancel, closeOnAction, onClose],
149	    );
150	
151	    const defaultAction: DialogAction =
152	        autoFocusButton ?? (dialogType === 'ok' ? 'ok' : dialogType === 'yesno' ? 'yes' : 'yes'); // for yesn⟪?⟫


========== IMG_2086.md ==========
---
photo: IMG_2086.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 189-220 (sticky header 97)
orientation: 0
confidence: high
notes: Continuation of IMG_2085 (overlaps 189-205). Sticky scroll line 97 "const Dialog: React.FC<DialogProps> = ({". Red squiggle underlines across nearly all visible JSX lines. Tabs: date.tsx 9+, dialog.tsx 9+ (active). Status bar: hitanshu/experimental*, 52 errors 0 warnings, No Solution, TypeScript JSX, CRLF. Same Explorer sidebar as IMG_2085 (dialog.tsx highlighted, 9+ badge). Line ~221 partially visible below 220 but illegible (looks like onClick handler for IconButton).
---
  97  const Dialog: React.FC<DialogProps> = ({
 189          <MuiDialog
 190              open={open}
 191              onClose={handleBackdropClose}
 192              aria-labelledby={labelId}
 193              aria-describedby={descId}
 194              onKeyDown={handleKeyDown}
 195              {...dialogProps}
 196              className="dialogWrap"
 197          >
 198              <DialogTitle id={labelId} sx={{ pr: hideCloseIcon ? 3 : 6 }}>
 199                  <div className="flex items-center gap-3">
 200                      <Icon
 201                          sx={{
 202                              fontSize: '26px',
 203                              color: Theme.colors.BRAND,
 204                              backgroundColor: Theme.colors.SUBHEADER_BG,
 205                          }}
 206                      />
 207                      <Typography
 208                          component="span"
 209                          variant="h6"
 210                          sx={{
 211                              fontSize: '16px',
 212                              fontWeight: '700',
 213                          }}
 214                      >
 215                          {title ?? defaultTitle}
 216                      </Typography>
 217                  </div>
 218                  {!hideCloseIcon && (
 219                      <IconButton
 220                          aria-label="Close dialog"
 221                          ⟪?⟫ (partially cut: looks like onClick={() => onClose⟪?⟫)


========== IMG_2087.md ==========
---
photo: IMG_2087.JPG
type: vscode-code
file: aqs-web-ui/src/components/dialog.tsx
lines: 202-234 (sticky header 97)
orientation: 0
confidence: high
notes: Continuation of IMG_2086 (overlaps 202-220). Sticky scroll line 97. Red squiggle underlines on nearly every line. Same tabs (date.tsx 9+, dialog.tsx 9+ active), same sidebar, status bar: hitanshu/experimental*, 52 errors 0 warnings, No Solution. Line 234 partially visible at very bottom: "</Typography>" (cut).
---
  97  const Dialog: React.FC<DialogProps> = ({
 202                              fontSize: '26px',
 203                              color: Theme.colors.BRAND,
 204                              backgroundColor: Theme.colors.SUBHEADER_BG,
 205                          }}
 206                      />
 207                      <Typography
 208                          component="span"
 209                          variant="h6"
 210                          sx={{
 211                              fontSize: '16px',
 212                              fontWeight: '700',
 213                          }}
 214                      >
 215                          {title ?? defaultTitle}
 216                      </Typography>
 217                  </div>
 218                  {!hideCloseIcon && (
 219                      <IconButton
 220                          aria-label="Close dialog"
 221                          onClick={() => onClose?.('closeButton')}
 222                          sx={{ position: 'absolute', right: 8, top: 8, color: Theme.colors.BRAND }}
 223                          size="small"
 224                      >
 225                          <CloseRoundedIcon />
 226                      </IconButton>
 227                  )}
 228              </DialogTitle>
 229
 230              <DialogContent id={descId}>
 231                  {typeof message === 'string' ? (
 232                      <Typography variant="body1" sx={{ mt: 0.5 }}>
 233                          {message}
 234                      </Typography>⟪cut off at bottom⟫
