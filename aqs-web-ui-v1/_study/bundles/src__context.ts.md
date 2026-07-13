# BUNDLE for src/context.ts
# 14 photo fragment(s), ascending start-line order.


========== IMG_4314.md ==========
---
photo: IMG_4314.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 1-27
orientation: 180
confidence: high
notes: Explorer sidebar (src expanded, utils subfolder expanded) shows files - utils/: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...(truncated), url-helpers.ts, user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts. Under src/ (below utils): app.css, app.tsx, context.ts (selected/highlighted, has "1" badge = 1 symbol/problem in file), main.tsx, routes.tsx, store.ts, and a partially cut-off entry below (looks like "t...s.ts", likely types.ts). Only one tab open: context.ts. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Breadcrumb: aqs-web-ui > src > context.ts > ...
---
1: import { createContext } from 'react-router';
2:
3: // services
4: import type { SessionInfo } from '@features/auth/services/auth';
5:
6: // types
7: import type { ActionType, FrameType, BrowserCommand, PermissionSnapshot } from '@/types';
8:
9: // ---------------------------------------
10:
11: // user context
12: export const userContext = createContext<SessionInfo | null>(null);
13:
14: // permissions context
15: export const permissionsContext = createContext<PermissionSnapshot | null>(null);
16:
17: /**
18:  * Followup action to execute after window opens
19:  */
20: export interface FollowupActionConfig {
21:     action: string;
22:     nodeKey?: string;
23:     policyId?: string;
24:     xmlDetail?: string;
25:     delay?: number;
26: }
27:


========== IMG_4315.md ==========
---
photo: IMG_4315.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 17-43
orientation: 180
confidence: high
notes: Continuation/scroll-down of same context.ts file as IMG_4314 (overlaps lines 17-26, extends to 43). Explorer sidebar identical to IMG_4314 (utils/ subfolder expanded with same file list; context.ts selected with "1" badge). Only one tab open: context.ts. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Breadcrumb: aqs-web-ui > src > context.ts > ...
---
17: /**
18:  * Followup action to execute after window opens
19:  */
20: export interface FollowupActionConfig {
21:     action: string;
22:     nodeKey?: string;
23:     policyId?: string;
24:     xmlDetail?: string;
25:     delay?: number;
26: }
27:
28: /**
29:  * Window command for window.open/showModalDialog
30:  */
31: export interface WindowCommand {
32:     url: string;
33:     frame: FrameType;
34:     width?: string;
35:     height?: string;
36:     queryString?: string;
37:     /** Optional followup action to execute after window opens successfully */
38:     followupAction?: FollowupActionConfig;
39: }
40:
41: /**
42:  * Modal command for MUI Dialog rendering
43:  * (Similar to WindowCommand but opens dialog instead of new window)


========== IMG_4316.md ==========
---
photo: IMG_4316.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 30-54
orientation: 180
confidence: medium
notes: Photo is a motion-blurred double-exposure (camera captured mid-scroll) - two overlapping frames of the same context.ts file visible offset by ~12-15 lines, with a sharp/bold foreground layer (the newer scroll position, lines 30-54) and a fainter ghost layer underneath (the older scroll position, matching IMG_4315's lines 28-43). Transcription below is reconstructed from the sharp foreground layer only, cross-checked against overlapping content already confirmed in IMG_4315 (lines 30-44 match exactly) plus new content (lines 45-54, ModalCommand interface) verified via high-dpi crops. Explorer sidebar: source-control icon shows badge "27" (uncommitted changes count) vs "1" seen in other shots - likely a transient UI state during the motion blur, not a distinct fact. Same file tree as IMG_4314/4315 (utils/ expanded, context.ts selected). Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", TypeScript. Line 54 (browserCommands) is cut off at the very bottom edge of the visible editor area, red squiggle visible under part of it (likely a lint/type warning). Closing brace for ModalCommand not visible (would be line 55+, out of frame).
---
30: */
31: export interface WindowCommand {
32:     url: string;
33:     frame: FrameType;
34:     width?: string;
35:     height?: string;
36:     queryString?: string;
37:     /** Optional followup action to execute after window opens successfully */
38:     followupAction?: FollowupActionConfig;
39: }
40:
41: /**
42:  * Modal command for MUI Dialog rendering
43:  * (Similar to WindowCommand but opens dialog instead of new window)
44:  */
45: export interface ModalCommand {
46:     url: string;
47:     frame: FrameType;
48:     width?: string;
49:     height?: string;
50:     queryString?: string;
51:     xmlDetail?: unknown;
52:     xmlFileName?: string;
53:     xmlFilePath?: string;
54:     browserCommands?: import('@/types').BrowserCommand[];


========== IMG_4317.md ==========
---
photo: IMG_4317.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 45-72
orientation: 180
confidence: high
notes: VS Code sticky-scroll header pins line 45 "export interface ModalCommand {" at top of editor, which obscures line 46 (url: string; - per IMG_4316) so the visible body resumes at line 47. Explorer sidebar identical file tree as prior shots; source-control icon shows "27" badge. Only tab open: context.ts. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Breadcrumb: aqs-web-ui > src > context.ts > ...
---
45: export interface ModalCommand {
    [sticky-scroll header pins line 45 here; line 46 "url: string;" not visible, obscured beneath header]
47:     frame: FrameType;
48:     width?: string;
49:     height?: string;
50:     queryString?: string;
51:     xmlDetail?: unknown;
52:     xmlFileName?: string;
53:     xmlFilePath?: string;
54:     browserCommands?: import('@/types').BrowserCommand[];
55: }
56:
57: /**
58:  * Extended navigation context for React Router v7 dataStrategy
59:  * Stores state from cycling API response to flow through middleware → loaders → components
60:  */
61: export interface NavigationContextValue {
62:     // Original fields (from legacy ExecuteAction)
63:     action: ActionType | null;
64:     nodeKey: string | null;
65:     frame: FrameType | null;
66:     tab: number | null;
67:     /** XML detail - can be string (for requests) or object (from response queryString) */
68:     xmlDetail: string | unknown | null;
69:     userId: string | null;
70:     compLoc: string | null;
71:     policyId: string | null;
72:


========== IMG_4318.md ==========
---
photo: IMG_4318.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 55-80
orientation: 180
confidence: high
notes: Slight motion-blur ghosting near top two lines (55-56, showing faint overlapping remnants of "xmlFileName?/xmlFilePath?/browserCommands?" from the previous scroll position seen in IMG_4316/4317) but the bulk of the frame (57-80) is sharp and clear. Sticky-scroll header pins line 45 "export interface ModalCommand {" at top. Explorer sidebar same file tree; source-control badge "27". Only tab open: context.ts. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", TypeScript.
---
45: export interface ModalCommand {
    [sticky-scroll header]
55: }
56:
57: /**
58:  * Extended navigation context for React Router v7 dataStrategy
59:  * Stores state from cycling API response to flow through middleware → loaders → components
60:  */
61: export interface NavigationContextValue {
62:     // Original fields (from legacy ExecuteAction)
63:     action: ActionType | null;
64:     nodeKey: string | null;
65:     frame: FrameType | null;
66:     tab: number | null;
67:     /** XML detail - can be string (for requests) or object (from response queryString) */
68:     xmlDetail: string | unknown | null;
69:     userId: string | null;
70:     compLoc: string | null;
71:     policyId: string | null;
72:
73:     // Extended fields for dataStrategy pattern
74:     /** Target URL returned from cycling API */
75:     url?: string;
76:
77:     /** Browser commands to execute (SET_TEXT, LOAD_COMBO, etc.) */
78:     browserCommands?: BrowserCommand[];
79:
80:     /** Next action to execute after current navigation completes */


========== IMG_4319.md ==========
---
photo: IMG_4319.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 61-90
orientation: 180
confidence: medium
notes: Photo is a motion-blurred double-exposure (editor scrolled ~7 lines during shutter), two overlapping frames throughout. Reconstructed via high-dpi crops isolating the sharp/bold foreground layer at each row; lines 61-78 duplicate content already confirmed clean in IMG_4317/IMG_4318 (cross-checked, matches exactly). New content not seen in prior photos: lines 79-90 (nextAction nested object, windowCommand field). Line 91 (likely "modalCommand?: ModalCommand;" by pattern) is not reliably legible - a repeat of "windowCommand?: WindowCommand;" appears near line 90 in the ghost layer but is ambiguous, so omitted rather than guessed. Sticky-scroll header pins line 61 "export interface NavigationContextValue {". Explorer sidebar same file tree, source-control badge "27". Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", TypeScript.
---
61: export interface NavigationContextValue {
    [sticky-scroll header]
62:     // Original fields (from legacy ExecuteAction)
63:     action: ActionType | null;
64:     nodeKey: string | null;
65:     frame: FrameType | null;
66:     tab: number | null;
67:     /** XML detail - can be string (for requests) or object (from response queryString) */
68:     xmlDetail: string | unknown | null;
69:     userId: string | null;
70:     compLoc: string | null;
71:     policyId: string | null;
72:
73:     // Extended fields for dataStrategy pattern
74:     /** Target URL returned from cycling API */
75:     url?: string;
76:
77:     /** Browser commands to execute (SET_TEXT, LOAD_COMBO, etc.) */
78:     browserCommands?: BrowserCommand[];
79:
80:     /** Next action to execute after current navigation completes */
81:     nextAction?: {
82:         action: ActionType;
83:         nodeKey?: string;
84:         tab?: number;
85:     };
86:
87:     /** Window command for modal/popup */
88:     windowCommand?: WindowCommand;
89:
90:     /** Modal command for dialog rendering */


========== IMG_4326.md ==========
---
photo: IMG_4326.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 61-180
orientation: 180
confidence: high
notes: Sticky scroll header shows line 61 "export interface NavigationContextValue {". Explorer sidebar (src/utils) visible files: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...(truncated), url-helpers.ts, user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts; then under src/: app.css, app.tsx, context.ts (selected/highlighted), main.tsx, routes.tsx, store.ts, types.ts (cut off). Tab bar shows only context.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 3 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > context.ts > ...
---
61      export interface NavigationContextValue {
155         */
156         reactRoute?: string;
157     }
158
159     // navigation context
160     export const navigationContext = createContext<NavigationContextValue | null>(null);
161
162     /**
163      * Helper to create initial navigation context
164      */
165     export function createInitialNavigationContext(): NavigationContextValue {
166         return {
167             action: null,
168             nodeKey: null,
169             frame: null,
170             tab: null,
171             xmlDetail: '<items />',
172             userId: null,
173             compLoc: null,
174             policyId: null,
175             deferred: false,
176             browserCommands: [],
177             cyclingCalled: false,
178         };
179     }
180


========== IMG_4320.md ==========
---
photo: IMG_4320.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 78-103
orientation: 180
confidence: high
notes: Top portion (lines 78-89) has mild motion-blur ghosting (overlap with adjacent scroll position, same content already confirmed in IMG_4319) but lines 90-103 are sharp and clear, resolving the line-91 ambiguity left open in IMG_4319 - confirmed "modalCommand?: ModalCommand;". Sticky-scroll header pins line 61 "export interface NavigationContextValue {". Explorer sidebar same file tree, source-control badge "27". Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", TypeScript. Comment on line 102 shows an example XML path with a real-looking POL/PIPHPOL file: "../../pol/xml/Rlv_PIPHPOL_20010101.xml".
---
61: export interface NavigationContextValue {
    [sticky-scroll header]
78:     browserCommands?: BrowserCommand[];
79:
80:     /** Next action to execute after current navigation completes */
81:     nextAction?: {
82:         action: ActionType;
83:         nodeKey?: string;
84:         tab?: number;
85:     };
86:
87:     /** Window command for modal/popup */
88:     windowCommand?: WindowCommand;
89:
90:     /** Modal command for dialog rendering */
91:     modalCommand?: ModalCommand;
92:
93:     /** Whether navigation should be deferred (for modal chains) */
94:     deferred?: boolean;
95:
96:     /** Query string parameters from response */
97:     queryString?: string;
98:
99:     /** XML filename from response */
100:     xmlFileName?: string;
101:
102:     /** XML file path from response (e.g., "../../pol/xml/Rlv_PIPHPOL_20010101.xml") */
103:     xmlFilePath?: string;


========== IMG_4321.md ==========
---
photo: IMG_4321.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 97-122
orientation: 180
confidence: high
notes: Minor motion-blur ghosting only at the very top edge (lines 97-98 area, faint repeat of same content from previous scroll position - not a distraction). Body of frame (99-122) sharp and clear. Sticky-scroll header pins line 61 "export interface NavigationContextValue {". Explorer sidebar same file tree, source-control badge "27". Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", TypeScript. Comment on line 102 confirms XML path example "../../pol/xml/Rlv_PIPHPOL_20010101.xml".
---
61: export interface NavigationContextValue {
    [sticky-scroll header]
97:     queryString?: string;
98:
99:     /** XML filename from response */
100:     xmlFileName?: string;
101:
102:     /** XML file path from response (e.g., "../../pol/xml/Rlv_PIPHPOL_20010101.xml") */
103:     xmlFilePath?: string;
104:
105:     /** Tab file metadata from navigation response */
106:     tabFileName?: string;
107:     tabFilePath?: string;
108:
109:     /** XML list file metadata from navigation response */
110:     xmlListFileName?: string;
111:     xmlListFilePath?: string;
112:
113:     /** Status code from cycling API */
114:     statusCode?: number;
115:
116:     /** Error message if navigation failed */
117:     error?: string;
118:
119:     /** Whether cycling API has been called for this navigation */
120:     cyclingCalled?: boolean;
121:
122:     /** Navigation depth counter for infinite loop prevention */


========== IMG_4322.md ==========
---
photo: IMG_4322.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 120-146
orientation: 180
confidence: high
notes: Sharp, clear frame (no ghosting). Sticky-scroll header pins line 61 "export interface NavigationContextValue {". Line 146 cut off at very bottom edge (only partial text visible, comment continuation of the "Converted React route..." doc comment). Explorer sidebar same file tree, source-control badge "27". Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", TypeScript. Notable: detailed doc comment on fileName field explains it's critical for route mapping, extracted via priority from response.FileName or parsed from response.url via extractAspFileName(), references execute-action.ts.
---
61: export interface NavigationContextValue {
    [sticky-scroll header]
120:     cyclingCalled?: boolean;
121:
122:     /** Navigation depth counter for infinite loop prevention */
123:     navigationDepth?: number;
124:
125:     /** Whether MENU has been loaded (for serial initialization) */
126:     menuLoaded?: boolean;
127:
128:     /** Menu data from MENU action call */
129:     menuData?: any; // PageNavigationResponse type from navigation service
130:
131:     /**
132:      * ASP filename from backend response (e.g., "Main_ISLLSYS_20010101.asp")
133:      *
134:      * Extracted from cycling API response, either from:
135:      * - Priority 1: response.FileName field (most reliable)
136:      * - Priority 2: Parsed from response.url using extractAspFileName()
137:      *
138:      * This field is CRITICAL for proper route mapping and was missing in the original
139:      * dataStrategy implementation. Legacy VBScript ExecuteAction always extracts this.
140:      *
141:      * @see execute-action.ts for extraction logic
142:      */
143:     fileName?: string;
144:
145:     /**
146:      * Converted React route from ASP filename (e.g., "/Main_ISLLSYS_20010101")


========== IMG_4323.md ==========
---
photo: IMG_4323.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 131-156
orientation: 180
confidence: high
notes: Sharp, clear frame, no ghosting. Sticky-scroll header pins line 61 "export interface NavigationContextValue {". Duplicates lines 131-143 already seen in IMG_4322 (consistent) and adds new lines 144-156. Explorer sidebar same file tree, source-control badge "27". Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", TypeScript. References asp-route-mapper.ts (aspToReactRoute(), buildReactRouteUrl()) and execute-action.ts.
---
61: export interface NavigationContextValue {
    [sticky-scroll header]
131:     /**
132:      * ASP filename from backend response (e.g., "Main_ISLLSYS_20010101.asp")
133:      *
134:      * Extracted from cycling API response, either from:
135:      * - Priority 1: response.FileName field (most reliable)
136:      * - Priority 2: Parsed from response.url using extractAspFileName()
137:      *
138:      * This field is CRITICAL for proper route mapping and was missing in the original
139:      * dataStrategy implementation. Legacy VBScript ExecuteAction always extracts this.
140:      *
141:      * @see execute-action.ts for extraction logic
142:      */
143:     fileName?: string;
144:
145:     /**
146:      * Converted React route from ASP filename (e.g., "/Main_ISLLSYS_20010101")
147:      *
148:      * Generated using asp-route-mapper utilities:
149:      * - aspToReactRoute() - Converts ASP filename to React route
150:      * - buildReactRouteUrl() - Adds query parameters if present
151:      *
152:      * This enables proper navigation to React routes instead of legacy ASP URLs.
153:      *
154:      * @see asp-route-mapper.ts for conversion utilities
155:      */
156:     reactRoute?: string;


========== IMG_4324.md ==========
---
photo: IMG_4324.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 142-167
orientation: 180
confidence: high
notes: Sharp, clear frame, only faint ghosting behind reactRoute doc comment (does not obscure text). Sticky-scroll header pins line 61 "export interface NavigationContextValue {". Shows end of NavigationContextValue interface (line 157 closing brace), start of navigationContext createContext call (line 160), and beginning of createInitialNavigationContext() helper function (line 165-167, cut off at line 167 "action: null,"). Explorer sidebar same file tree, source-control badge "27". Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", TypeScript.
---
61: export interface NavigationContextValue {
    [sticky-scroll header]
142:      */
143:     fileName?: string;
144:
145:     /**
146:      * Converted React route from ASP filename (e.g., "/Main_ISLLSYS_20010101")
147:      *
148:      * Generated using asp-route-mapper utilities:
149:      * - aspToReactRoute() - Converts ASP filename to React route
150:      * - buildReactRouteUrl() - Adds query parameters if present
151:      *
152:      * This enables proper navigation to React routes instead of legacy ASP URLs.
153:      *
154:      * @see asp-route-mapper.ts for conversion utilities
155:      */
156:     reactRoute?: string;
157: }
158:
159: // navigation context
160: export const navigationContext = createContext<NavigationContextValue | null>(null);
161:
162: /**
163:  * Helper to create initial navigation context
164:  */
165: export function createInitialNavigationContext(): NavigationContextValue {
166:     return {
167:         action: null,


========== IMG_4325.md ==========
---
photo: IMG_4325.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 144-169
orientation: 180
confidence: high
notes: Top portion (144-156) has motion-blur ghosting (double exposure, ~5-line offset) but duplicates content already confirmed clean in IMG_4323/IMG_4324 (reactRoute doc comment block) - not retranscribed in detail here, see those files. Bottom portion (157-169) is sharp and clear, extending past IMG_4324 with new lines 168-169 (nodeKey: null, frame: null in the createInitialNavigationContext return object). Sticky-scroll header pins line 61 "export interface NavigationContextValue {". Explorer sidebar same file tree, source-control badge "27". Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", TypeScript.
---
61: export interface NavigationContextValue {
    [sticky-scroll header]
144: [ghosted/duplicate - see IMG_4323/IMG_4324 for clean transcription of lines 144-156: reactRoute doc comment block]
...
157: }
158:
159: // navigation context
160: export const navigationContext = createContext<NavigationContextValue | null>(null);
161:
162: /**
163:  * Helper to create initial navigation context
164:  */
165: export function createInitialNavigationContext(): NavigationContextValue {
166:     return {
167:         action: null,
168:         nodeKey: null,
169:         frame: null,


========== IMG_4327.md ==========
---
photo: IMG_4327.JPG
type: vscode-code
file: aqs-web-ui/src/context.ts
lines: 165-190
orientation: 180
confidence: medium
notes: Whole photo has a motion-blur/double-exposure "ghosting" artifact (two overlapping copies of the screen slightly offset, including the line-number gutter), making lines 165-179 hard to read directly; cross-checked against IMG_4326 (same createInitialNavigationContext body, clean, confirmed line numbers 165-179) to confirm those lines and their numbering. Lines 181-190 (new mergeNavigationContext function) are comparatively legible. Explorer sidebar same as IMG_4326 (src/utils file list, context.ts highlighted). Status bar: aqs-web-ui, branch hitanshu/experimental*, 3 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > context.ts > ...
---
165     export function createInitialNavigationContext(): NavigationContextValue {
166         return {
167             action: null,
168             nodeKey: null,
169             frame: null,
170             tab: null,
171             xmlDetail: '<items />',
172             userId: null,
173             compLoc: null,
174             policyId: null,
175             deferred: false,
176             browserCommands: [],
177             cyclingCalled: false,
178         };
179     }
180
181     /**
182      * Helper to merge navigation context updates
183      */
184     export function mergeNavigationContext(
185         current: NavigationContextValue | null,
186         updates: Partial<NavigationContextValue>,
187     ): NavigationContextValue {
188         return {
189             ...(current ?? createInitialNavigationContext()),
190             ...updates,
