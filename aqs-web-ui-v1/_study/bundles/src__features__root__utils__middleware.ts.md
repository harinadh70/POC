# BUNDLE for src/features/root/utils/middleware.ts
# 16 photo fragment(s), ascending start-line order.


========== IMG_2726.md ==========
---
photo: IMG_2726.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 1-34
orientation: 180
confidence: high
notes: Sharp, essentially artifact-free photo (no motion blur ghosting). New file compared to IMG_2720-2725 (which were all loader.ts) — this is middleware.ts, top of file, no sticky scroll yet. Tab bar shows "middleware.ts 7" (7 problems in this file). Explorer sidebar: root/utils now shows both loader.ts and middleware.ts, with middleware.ts highlighted/selected (badge "7"). Status bar: branch "hitanshu/experimental*", "No Solution", 9 errors/0 warnings (⊗9 △0, up from 6 in the loader.ts photos), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:18 PM 7/10/2026 (one minute after the loader.ts photos IMG_2720-2725).
---
1:  import { navigationContext, mergeNavigationContext } from '@/context';
2:  import { getItem } from '@utils/local-storage';
3:  import { getPendingXmlDetail } from '@utils/xml-detail-persistence';
4:  import type { ActionType, FrameType } from '@/types';
5:  import type { SessionInfo } from '@features/auth/services/auth';
6:  import type { MiddlewareFunction } from 'react-router';
7:
8:  interface NavigationLocationState {
9:      xmlDetail?: string;
10: }
11:
12: interface MiddlewareRequestWithState extends Request {
13:     request?: {
14:         state?: unknown;
15:     };
16:     state?: unknown;
17: }
18:
19: const getSessionXmlDetail = (sessionInfo: SessionInfo | null): string | null => {
20:     if (!sessionInfo || typeof sessionInfo !== 'object') {
21:         return null;
22:     }
23:
24:     const sessionRecord = sessionInfo as Record<string, unknown>;
25:     const sessionXml = sessionRecord.sessionXml;
26:
27:     if (typeof sessionXml !== 'string' || sessionXml.trim() === '') {
28:         return null;
29:     }
30:
31:     return sessionXml;
32: };
33:
34: const normalizeCurrentXmlDetail = (xmlDetail: unknown): string | null => {  (line cut off at bottom edge of visible editor area)


========== IMG_2727.md ==========
---
photo: IMG_2727.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 1-34
orientation: 180
confidence: high
notes: Near-duplicate of IMG_2726 — same file, same scroll position (lines 1-34), same content, essentially artifact-free/sharp. Only visible differences: cursor blink position and minor sidebar scroll/expansion state (root/utils shows loader.ts and middleware.ts, middleware.ts selected, badge "7"). Status bar: branch "hitanshu/experimental*", "No Solution", 9 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:18 PM 7/10/2026 (same as IMG_2726).
---
1:  import { navigationContext, mergeNavigationContext } from '@/context';
2:  import { getItem } from '@utils/local-storage';
3:  import { getPendingXmlDetail } from '@utils/xml-detail-persistence';
4:  import type { ActionType, FrameType } from '@/types';
5:  import type { SessionInfo } from '@features/auth/services/auth';
6:  import type { MiddlewareFunction } from 'react-router';
7:
8:  interface NavigationLocationState {
9:      xmlDetail?: string;
10: }
11:
12: interface MiddlewareRequestWithState extends Request {
13:     request?: {
14:         state?: unknown;
15:     };
16:     state?: unknown;
17: }
18:
19: const getSessionXmlDetail = (sessionInfo: SessionInfo | null): string | null => {
20:     if (!sessionInfo || typeof sessionInfo !== 'object') {
21:         return null;
22:     }
23:
24:     const sessionRecord = sessionInfo as Record<string, unknown>;
25:     const sessionXml = sessionRecord.sessionXml;
26:
27:     if (typeof sessionXml !== 'string' || sessionXml.trim() === '') {
28:         return null;
29:     }
30:
31:     return sessionXml;
32: };
33:
34: const normalizeCurrentXmlDetail = (xmlDetail: unknown): string | null => {  (line cut off at bottom edge of visible editor area)


========== IMG_2728.md ==========
---
photo: IMG_2728.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 17-49
orientation: 180
confidence: high
notes: Some motion-blur ghosting present (each row has a faint duplicate offset by ~1 row) but content is legible throughout; cross-checked against sharper regions. Continues middleware.ts from IMG_2726/2727 (lines 1-34 identical there) into new content lines 35-49 (normalizeCurrentXmlDetail and start of isNavigationLocationState). Explorer sidebar same as before, middleware.ts selected (badge "7") under root/utils. Status bar: branch "hitanshu/experimental*", "No Solution", 9 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:18 PM 7/10/2026 (same as IMG_2726/2727).
---
17: }
18:
19: const getSessionXmlDetail = (sessionInfo: SessionInfo | null): string | null => {
20:     if (!sessionInfo || typeof sessionInfo !== 'object') {
21:         return null;
22:     }
23:
24:     const sessionRecord = sessionInfo as Record<string, unknown>;
25:     const sessionXml = sessionRecord.sessionXml;
26:
27:     if (typeof sessionXml !== 'string' || sessionXml.trim() === '') {
28:         return null;
29:     }
30:
31:     return sessionXml;
32: };
33:
34: const normalizeCurrentXmlDetail = (xmlDetail: unknown): string | null => {
35:     if (typeof xmlDetail !== 'string' || !xmlDetail) {
36:         return null;
37:     }
38:
39:     if (xmlDetail.trim() === '' || xmlDetail.trim() === '<items />') {
40:         return null;
41:     }
42:
43:     return xmlDetail;
44: };
45:
46: const isNavigationLocationState = (value: unknown): value is NavigationLocationState => {
47:     if (typeof value !== 'object' || value === null) {
48:         return false;
49:     }


========== IMG_2729.md ==========
---
photo: IMG_2729.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 44-62
orientation: 180
confidence: high
notes: Mild motion-blur ghosting (faint duplicate offset ~1 row) but all content legible. Continues middleware.ts from IMG_2728 (which ended at line 49) into new content through line 62 — completes isNavigationLocationState and adds getXmlDetailFromLocationState. Explorer sidebar unchanged, middleware.ts selected (badge "7") under root/utils. Status bar: branch "hitanshu/experimental*", "No Solution", 9 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:18 PM 7/10/2026 (same minute as IMG_2726-2728).
---
44: };
45:
46: const isNavigationLocationState = (value: unknown): value is NavigationLocationState => {
47:     if (typeof value !== 'object' || value === null) {
48:         return false;
49:     }
50:
51:     const state = value as Record<string, unknown>;
52:     return state.xmlDetail === undefined || typeof state.xmlDetail === 'string';
53: };
54:
55: const getXmlDetailFromLocationState = (request: Request): string | null => {
56:     const requestWithState = request as MiddlewareRequestWithState;
57:     const nestedRequestState = requestWithState.request?.state;
58:     if (isNavigationLocationState(nestedRequestState) && nestedRequestState.xmlDetail) {
59:         return nestedRequestState.xmlDetail;
60:     }
61:
62:     const directRequestState = requestWithState.state;  (line continues below, cut off at bottom edge of visible editor area)


========== IMG_2730.md ==========
---
photo: IMG_2730.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 49-68
orientation: 180
confidence: high
notes: Sharp, essentially artifact-free photo. Continues middleware.ts from IMG_2729 (which ended at line 62) through line 68 — completes getXmlDetailFromLocationState (adds the directRequestState fallback check) and starts a `typeof window !== 'undefined'` browser-environment guard. Explorer sidebar unchanged, middleware.ts selected (badge "7") under root/utils. Status bar: branch "hitanshu/experimental*", "No Solution", 9 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:18 PM 7/10/2026 (same minute as IMG_2726-2729).
---
49:     }
50:
51:     const state = value as Record<string, unknown>;
52:     return state.xmlDetail === undefined || typeof state.xmlDetail === 'string';
53: };
54:
55: const getXmlDetailFromLocationState = (request: Request): string | null => {
56:     const requestWithState = request as MiddlewareRequestWithState;
57:
58:     const nestedRequestState = requestWithState.request?.state;
59:     if (isNavigationLocationState(nestedRequestState) && nestedRequestState.xmlDetail) {
60:         return nestedRequestState.xmlDetail;
61:     }
62:
63:     const directRequestState = requestWithState.state;
64:     if (isNavigationLocationState(directRequestState) && directRequestState.xmlDetail) {
65:         return directRequestState.xmlDetail;
66:     }
67:
68:     if (typeof window !== 'undefined') {  (line continues below, cut off at bottom edge of visible editor area)


========== IMG_2731.md ==========
---
photo: IMG_2731.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 65-97
orientation: 180
confidence: high
notes: Sharp, essentially artifact-free photo. Continues middleware.ts from IMG_2730 (which ended at line 68) — completes getXmlDetailFromLocationState (browser window.history.state fallback, final return null), then a section-divider comment, a JSDoc block, and the start of the exported hydrateNavigationContextMiddleware function (MiddlewareFunction from react-router). Sticky scroll shows line 55 "const getXmlDetailFromLocationState = (request: Request): string | null => {". Explorer sidebar unchanged, middleware.ts selected (badge "7") under root/utils. Status bar: branch "hitanshu/experimental*", "No Solution", 9 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:18 PM 7/10/2026 (same minute as IMG_2726-2730).
---
55:     const getXmlDetailFromLocationState = (request: Request): string | null => {
65:     }
66:
67:     if (typeof window !== 'undefined') {
68:         const historyState = (window.history.state as { usr?: unknown } | null)?.usr;
69:         if (isNavigationLocationState(historyState) && historyState.xmlDetail) {
70:             return historyState.xmlDetail;
71:         }
72:     }
73:
74:     return null;
75: };
76:
77:
78: // ------------------------------------------------
79:
80: /**
81:  * Hydrates navigation context from URL query params.
82:  *
83:  * This enables same-route actions like ?action=STARTOPTIONS to re-trigger
84:  * cycling API calls by resetting cyclingCalled=false.
85:  */
86: export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (
87:     { context, request },
88:     next,
89: ) => {
90:     const url = new URL(request.url);
91:     const xmlDetailFromPending = getPendingXmlDetail(request.url);
92:     const xmlDetailFromState = getXmlDetailFromLocationState(request);
93:     const resolvedXmlDetail = xmlDetailFromPending ?? xmlDetailFromState;
94:
95:     const parsedNavigation = {
96:         action: url.searchParams.get('action') as ActionType | null,
97:         frame: url.searchParams.get('frame') as FrameType | null,  (line continues below, cut off at bottom edge of visible editor area)


========== IMG_2732.md ==========
---
photo: IMG_2732.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 65-97
orientation: 180
confidence: high
notes: |
  Sticky-scroll header at top shows enclosing line 55: `const getXmlDetailFromLocationState = (request: Request): string | null => {`.
  Breadcrumb: aqs-web-ui > src > features > root > utils > middleware.ts > ...
  Tab bar: only "middleware.ts" tab open, shows a "7" badge (unclear meaning, possibly unsaved-change count); sidebar entry for middleware.ts also shows "7".
  Status bar: branch hitanshu/experimental*, "No Solution", 9 errors / 0 warnings (red "No Solution" badge, "9" red circle, small triangle "0").
  Explorer sidebar tree visible (AQS_WORKSPACE):
    aqs-web-ui/src/features/
      policy/
        utils/ultimateCoverLoader.ts
        FieldRenderer.tsx
        index.ts
        policy-information-fields.ts
        types.ts
        ultimate-cover-fields.ts
      prp/
        components/MlcSumList.tsx (U - modified)
        services/prp.ts (U)
        utils/loader.ts (U)
      root/
        services/user-data.ts
        utils/loader.ts, middleware.ts (selected, highlighted)
    hooks/ (collapsed)
    lib/ (collapsed)
  Source control badge shows "27" pending changes.
---
55: const getXmlDetailFromLocationState = (request: Request): string | null => {   [sticky-scroll header, enclosing scope]

65:     return directRequestState.xmlDetail;
66:   }
67:
68:   if (typeof window !== 'undefined') {
69:     const historyState = (window.history.state as { usr?: unknown } | null)?.usr;
70:     if (isNavigationLocationState(historyState) && historyState.xmlDetail) {
71:       return historyState.xmlDetail;
72:     }
73:   }
74:
75:   return null;
76: };
77:
78: // ----------------------------------------------
79:
80: /**
81:  * Hydrates navigation context from URL query params.
82:  *
83:  * This enables same-route actions like ?action=STARTOPTIONS to re-trigger
84:  * cycling API calls by resetting cyclingCalled=false.
85:  */
86: export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (
87:   { context, request },
88:   next,
89: ) => {
90:   const url = new URL(request.url);
91:   const xmlDetailFromPending = getPendingXmlDetail(request.url);
92:   const xmlDetailFromState = getXmlDetailFromLocationState(request);
93:   const resolvedXmlDetail = xmlDetailFromPending ?? xmlDetailFromState;
94:
95:   const parsedNavigation = {
96:     action: url.searchParams.get('action') as ActionType | null,
97:     frame: url.searchParams.get('frame') as FrameType | null,


========== IMG_2733.md ==========
---
photo: IMG_2733.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 86-118
orientation: 180
confidence: medium
notes: |
  Photo has visible motion/double-exposure ghosting (a fainter duplicate of the text offset a few lines down-right overlays the sharp foreground text throughout). Transcription below follows the bold/sharp foreground text, cross-validated against the exact line-number gutter and against the overlapping range already confirmed at high confidence in IMG_2732 (lines 86-97 match IMG_2732 lines 86-97 exactly). Confidence set to medium because of the ghosting even though cross-validation succeeded.
  Breadcrumb: aqs-web-ui > src > features > root > utils > middleware.ts > ...
  Tab bar: only "middleware.ts" tab open (badge "7", same unexplained badge as IMG_2732).
  Explorer sidebar: same tree as IMG_2732 (policy/utils/ultimateCoverLoader.ts, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts; prp/components/MlcSumList.tsx (U); prp/services/prp.ts (U); prp/utils/loader.ts (U); root/services/user-data.ts; root/utils/loader.ts, middleware.ts selected); source-control badge "27".
  Status bar: branch hitanshu/experimental*, "No Solution" (red), 9 errors / 0 warnings.
  No sticky-scroll header visible above line 86 (top-level export, no enclosing scope).
---
86: export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (
87:   { context, request },
88:   next,
89: ) => {
90:   const url = new URL(request.url);
91:   const xmlDetailFromPending = getPendingXmlDetail(request.url);
92:   const xmlDetailFromState = getXmlDetailFromLocationState(request);
93:   const resolvedXmlDetail = xmlDetailFromPending ?? xmlDetailFromState;
94:
95:   const parsedNavigation = {
96:     action: url.searchParams.get('action') as ActionType | null,
97:     frame: url.searchParams.get('frame') as FrameType | null,
98:     policyId: url.searchParams.get('policyId'),
99:     nodeKey: url.searchParams.get('nodeKey'),
100:   };
101:
102:   const sessionInfo = getItem<SessionInfo>('sessionInformation');
103:   const sessionXmlDetail = getSessionXmlDetail(sessionInfo);
104:   const userId = sessionInfo?.userId ?? null;
105:   const compLoc = sessionInfo?.compLoc ?? null;
106:   const currentNavContext = context.get(navigationContext);
107:   const currentXmlDetail = normalizeCurrentXmlDetail(currentNavContext?.xmlDetail);
108:   const xmlDetailForContext =
109:     resolvedXmlDetail ?? sessionXmlDetail ?? currentXmlDetail ?? '';
110:
111:   const hasNavigationParams =
112:     url.searchParams.has('action') ||
113:     url.searchParams.has('nodeKey') ||
114:     url.searchParams.has('frame') ||
115:     url.searchParams.has('policyId');
116:
117:   if (hasNavigationParams) {
118:     console.log('[HYDRATE_MIDDLEWARE] URL params detected', {


========== IMG_2734.md ==========
---
photo: IMG_2734.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 95-130
orientation: 180
confidence: low
notes: |
  Severe motion/double-exposure ghosting throughout (a fainter duplicate of the text, offset roughly 2-3 lines down, overlays the sharp foreground text; the vertical offset between real and ghost text is not perfectly constant, likely due to camera movement during the shot, which made pixel-for-pixel gutter-to-text alignment unreliable in places). Line numbers below were reconstructed by: (1) anchoring on lines 95-118, which are identically confirmed at high confidence from the overlapping, much cleaner photo IMG_2733 (same file, same lines, verbatim match), and (2) sequentially counting foreground/bold code lines forward from the confirmed anchor at line 118 (console.log) through to the end of the visible viewport, rather than trusting blurred gutter digits directly.
  Sticky-scroll header pinned at top of editor (does not represent scrolled-in content): line 86 `export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (`.
  Line 130's trailing `?? currentNavContext?.nodeKey ?? null,` is inferred by parallel structure with line 128 (`action: parsedNavigation.action ?? currentNavContext?.action ?? null,`); the ghost overlay makes the exact property name at that position hard to verify pixel-for-pixel — flagged with ⟪?⟫ alternate below.
  Line 131 begins below line 130 but is cut off by the bottom status bar ("Ln 1, Col 1" / "Tab Size" / "No Solution" / "9 errors, 0 warnings" visible) — not legible, not transcribed.
  Breadcrumb: aqs-web-ui > src > features > root > utils > middleware.ts > ...
  Tab bar: only "middleware.ts" tab open (badge "7").
  Explorer sidebar (top portion visible, matches IMG_2732/2733): AQS_WORKSPACE > aqs-web-ui > src > features > policy > utils (partially visible, cut off at "ultimateCoverLoader.ts").
  Status bar: branch hitanshu/experimental*, "No Solution" (red), 9 errors / 0 warnings.
---
86: export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (   [sticky-scroll header, enclosing scope]

95:   const parsedNavigation = {
96:     action: url.searchParams.get('action') as ActionType | null,
97:     frame: url.searchParams.get('frame') as FrameType | null,
98:     policyId: url.searchParams.get('policyId'),
99:     nodeKey: url.searchParams.get('nodeKey'),
100:   };
101:
102:   const sessionInfo = getItem<SessionInfo>('sessionInformation');
103:   const sessionXmlDetail = getSessionXmlDetail(sessionInfo);
104:   const userId = sessionInfo?.userId ?? null;
105:   const compLoc = sessionInfo?.compLoc ?? null;
106:   const currentNavContext = context.get(navigationContext);
107:   const currentXmlDetail = normalizeCurrentXmlDetail(currentNavContext?.xmlDetail);
108:   const xmlDetailForContext =
109:     resolvedXmlDetail ?? sessionXmlDetail ?? currentXmlDetail ?? '';
110:
111:   const hasNavigationParams =
112:     url.searchParams.has('action') ||
113:     url.searchParams.has('nodeKey') ||
114:     url.searchParams.has('frame') ||
115:     url.searchParams.has('policyId');
116:
117:   if (hasNavigationParams) {
118:     console.log('[HYDRATE_MIDDLEWARE] URL params detected', {
119:       action: parsedNavigation.action,
120:       frame: parsedNavigation.frame,
121:       hasPendingXmlDetail: !!xmlDetailFromPending,
122:       hasXmlDetailState: !!xmlDetailFromState,
123:     });
124:
125:     context.set(
126:       navigationContext,
127:       mergeNavigationContext(currentNavContext, {
128:         action: parsedNavigation.action ?? currentNavContext?.action ?? null,
129:         nodeKey:
130:           parsedNavigation.nodeKey ?? currentNavContext?.nodeKey ⟪?⟫ ?? null,


========== IMG_2735.md ==========
---
photo: IMG_2735.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 128-149
orientation: 180
confidence: medium
notes: |
  Extremely severe motion/double-exposure ghosting throughout — much worse than IMG_2733/IMG_2734 (two near-identical overlapping copies of the text, offset by a couple of lines, run through the whole visible viewport). Sticky-scroll header pinned at top: line 86 `export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (` (same as IMG_2733/2734, not re-transcribed).
  This photo also shows lines ~111-127 (the `hasNavigationParams`/`console.log('[HYDRATE_MIDDLEWARE]...')`/`context.set(...)` opening block already transcribed from IMG_2733 and IMG_2734), but in this photo that region is too degraded to independently re-derive reliable line numbers — NOT re-transcribed here.
  CORRECTED (2nd pass): line numbers below were originally derived from this photo's own blurry gutter digits and were off by +1 for most of this range, and the `policyId` fallback chain was misread as a 2-line expression. Both are now corrected using IMG_2737 — a sharp, ghost-free photo of the same file that captures lines 139-170 with high confidence and overlaps this photo's tail. `xmlDetail: xmlDetailForContext,` (line 138) and the `policyId:` chain (139-143, four alternatives: `parsedNavigation.policyId ?? currentNavContext?.policyId ?? sessionInfo?.policyId ?? '0'`) were confirmed there; the rest of this photo's range (128-137, 144-149) is shifted +1 accordingly but not independently re-verified pixel-by-pixel against IMG_2737 (which starts at 139).
  Tab bar: only "middleware.ts" tab open (badge "7"). Status bar: branch hitanshu/experimental*, "No Solution" (red), 9 errors / 0 warnings.
---
86: export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (   [sticky-scroll header, enclosing scope]

128:     context.set(
129:       navigationContext,
130:       mergeNavigationContext(currentNavContext, {
131:         action: parsedNavigation.action ?? currentNavContext?.action ?? null,
132:         nodeKey:
133:           parsedNavigation.nodeKey ?? currentNavContext?.nodeKey ?? null,
134:         frame: parsedNavigation.frame ?? currentNavContext?.frame ?? null,
135:         userId,
136:         tab: null,
137:         compLoc,
138:         xmlDetail: xmlDetailForContext,
139:         policyId:
140:           parsedNavigation.policyId ??
141:           currentNavContext?.policyId ??
142:           sessionInfo?.policyId ??
143:           '0',
144:         cyclingCalled: false,
145:         error: undefined,
146:         modalCommand: undefined,
147:         windowCommand: undefined,
148:         navigationDepth: 0,
149:         // preserve menu data across navigations


========== IMG_2736.md ==========
---
photo: IMG_2736.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 139-159
orientation: 180
confidence: high
notes: |
  Same severe motion/double-exposure ghosting as IMG_2735 in the original capture, which made this photo's own gutter digits unreliable (an earlier pass here disagreed with itself by up to 3 lines across different crops). CORRECTED (2nd pass): line numbers and content below are taken from IMG_2737, a sharp, ghost-free photo of the same file whose visible range (139-170) fully contains this photo's range, rather than from this photo's own blurry digits. Confidence upgraded to high on that basis.
  Sticky-scroll header pinned at top: line 86 `export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (` (not re-transcribed).
  Divider comment `// ----------------------------------------` at line 159 matches the style seen at line 78 in IMG_2732, marking the start of a new section (a JSDoc block for `rootMenuMiddleware`, captured in IMG_2737).
  Tab bar: only "middleware.ts" tab open (badge "7"). Status bar: branch hitanshu/experimental*, "No Solution" (red), 9 errors / 0 warnings.
---
86: export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (   [sticky-scroll header, enclosing scope]

139:       policyId:
140:         parsedNavigation.policyId ??
141:         currentNavContext?.policyId ??
142:         sessionInfo?.policyId ??
143:         '0',
144:       cyclingCalled: false,
145:       error: undefined,
146:       modalCommand: undefined,
147:       windowCommand: undefined,
148:       navigationDepth: 0,
149:       // Preserve menu data across navigations
150:       menuData: currentNavContext?.menuData,
151:       menuLoaded: currentNavContext?.menuLoaded,
152:     }),
153:   );
154:   }
155:
156:   await next();
157: };
158:
159: // ----------------------------------------


========== IMG_2737.md ==========
---
photo: IMG_2737.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 139-170
orientation: 180
confidence: high
notes: |
  Sharp, clear photo — no motion/double-exposure ghosting (unlike IMG_2733 through IMG_2736). This resolves the line-number/content uncertainty flagged in IMG_2735 and IMG_2736 for the same region (the `policyId` fallback chain, `cyclingCalled`/`error`/`modalCommand`/`windowCommand`/`navigationDepth`/menu-preservation tail of the `mergeNavigationContext({...})` object, and the middleware's closing lines). IMG_2735/IMG_2736 have been corrected to match this photo's readings where they overlap.
  Sticky-scroll header pinned at top: line 86 `export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (`.
  A new exported middleware, `rootMenuMiddleware`, begins at line 168 with a JSDoc block starting at line 161.
  Breadcrumb: aqs-web-ui > src > features > root > utils > middleware.ts > ...
  Tab bar: only "middleware.ts" tab open (badge "7").
  Explorer sidebar (same tree as prior photos in this sequence) with one change: root/utils/loader.ts now also shows a "U" (modified) marker, in addition to root/utils/middleware.ts being selected.
  Status bar: branch hitanshu/experimental*, "No Solution" (red), 9 errors / 0 warnings. Source-control badge "27".
  Line 171 exists below the visible content but is obscured by the "No Solution" status-bar overlay — not legible.
---
86: export const hydrateNavigationContextMiddleware: MiddlewareFunction = async (   [sticky-scroll header, enclosing scope]

139:       policyId:
140:         parsedNavigation.policyId ??
141:         currentNavContext?.policyId ??
142:         sessionInfo?.policyId ??
143:         '0',
144:       cyclingCalled: false,
145:       error: undefined,
146:       modalCommand: undefined,
147:       windowCommand: undefined,
148:       navigationDepth: 0,
149:       // Preserve menu data across navigations
150:       menuData: currentNavContext?.menuData,
151:       menuLoaded: currentNavContext?.menuLoaded,
152:     }),
153:   );
154:   }
155:
156:   await next();
157: };
158:
159: // ----------------------------------------
160:
161: /**
162:  * Root initialization middleware
163:  * Sets navigation context with action='MENU' before dataStrategy runs
164:  *
165:  * This ensures the cycling API is called to load menu data when root layout loads
166:  * with an authenticated session.
167:  */
168: export const rootMenuMiddleware: MiddlewareFunction = async ({ context, request }, next) => {
169:   const url = new URL(request.url);
170:   const actionFromUrl = url.searchParams.get('action');


========== IMG_2738.md ==========
---
photo: IMG_2738.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 168-196
orientation: 180
confidence: high
notes: |
  Moderate motion/double-exposure ghosting throughout (fainter duplicate text offset a few lines away), similar to IMG_2733/2734 but somewhat less severe than IMG_2735/2736. No sticky-scroll header visible (rootMenuMiddleware is a top-level export, same as hydrateNavigationContextMiddleware in earlier photos, so nothing is pinned once scrolled past it).
  Lines 168-182 cross-checked against IMG_2737 (independently confirms 168-170).
  CORRECTED (2nd pass): lines 183-196 were originally derived from sequential counting with uncertain line numbers (±2-3 lines); now corrected using IMG_2739, a much clearer photo of the same file covering 168-206, which showed a blank line at 183 (this photo's original transcript had none, shifting everything from 184 onward by -1). Confidence upgraded to high.
  Breadcrumb: aqs-web-ui > src > features > root > utils > middleware.ts > ...
  Tab bar: only "middleware.ts" tab open (badge "7"). Status bar: branch hitanshu/experimental*, "No Solution" (red), 9 errors / 0 warnings.
---
168: export const rootMenuMiddleware: MiddlewareFunction = async ({ context, request }, next) => {
169:   const url = new URL(request.url);
170:   const actionFromUrl = url.searchParams.get('action');
171:   // Skip MENU API call on login page
172:   if (url.pathname === '/login') {
173:     console.log('[rootMenuMiddleware] Skipping MENU action on login page');
174:     await next();
175:     return;
176:   }
177:
178:   const sessionInfo = getItem<SessionInfo>('sessionInformation');
179:   const sessionXmlDetail = getSessionXmlDetail(sessionInfo);
180:
181:   if (sessionInfo && sessionInfo.userId) {
182:     const currentNavContext = context.get(navigationContext);
183:
184:     if (actionFromUrl) {
185:       console.log('[rootMenuMiddleware] Preserving action from URL', {
186:         action: actionFromUrl,
187:         userId: sessionInfo.userId,
188:         compLoc: sessionInfo.compLoc,
189:         policyId: sessionInfo.policyId,
190:       });
191:
192:       context.set(
193:         navigationContext,
194:         mergeNavigationContext(currentNavContext, {
195:           action: actionFromUrl as ActionType,
196:           nodeKey: currentNavContext?.nodeKey ?? sessionInfo.nodeKey ?? null,


========== IMG_2739.md ==========
---
photo: IMG_2739.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 168-207
orientation: 180
confidence: high
notes: |
  Light ghosting only (much clearer than IMG_2735/2736/2738); all gutter digits and code text below were cross-checked and are unambiguous. This photo resolves the line-number uncertainty flagged in IMG_2738 for lines 183-194 — IMG_2738's sequential-count guess was off by 1 from line 184 onward (it had no blank line at 183); corrected here and IMG_2738 has been updated to match.
  Sticky-scroll header pinned at top: line 168 `export const rootMenuMiddleware: MiddlewareFunction = async ({ context, request }, next) => {`.
  Content visible runs from line 168 (sticky header) through line 207 (cross-checked against IMG_2740, which independently shows the same `}),` at line 207).
  Breadcrumb: aqs-web-ui > src > features > root > utils > middleware.ts > ...
  Tab bar: only "middleware.ts" tab open (badge "7"). Status bar: branch hitanshu/experimental*, "No Solution" (red), 9 errors / 0 warnings.
---
168: export const rootMenuMiddleware: MiddlewareFunction = async ({ context, request }, next) => {   [sticky-scroll header, enclosing scope]

176:     return;
177:   }
178:   const sessionInfo = getItem<SessionInfo>('sessionInformation');
179:   const sessionXmlDetail = getSessionXmlDetail(sessionInfo);
180:
181:   if (sessionInfo && sessionInfo.userId) {
182:     const currentNavContext = context.get(navigationContext);
183:
184:     if (actionFromUrl) {
185:       console.log('[rootMenuMiddleware] Preserving action from URL', {
186:         action: actionFromUrl,
187:         userId: sessionInfo.userId,
188:         compLoc: sessionInfo.compLoc,
189:         policyId: sessionInfo.policyId,
190:       });
191:
192:       context.set(
193:         navigationContext,
194:         mergeNavigationContext(currentNavContext, {
195:           action: actionFromUrl as ActionType,
196:           nodeKey: currentNavContext?.nodeKey ?? sessionInfo.nodeKey ?? null,
197:           xmlDetail:
198:             normalizeCurrentXmlDetail(currentNavContext?.xmlDetail) ??
199:             sessionXmlDetail ??
200:             '',
201:           tab: null,
202:           userId: sessionInfo.userId,
203:           compLoc: sessionInfo.compLoc,
204:           policyId: currentNavContext?.policyId ?? sessionInfo.policyId ?? '0',
205:           cyclingCalled: false,
206:
207:         }),


========== IMG_2740.md ==========
---
photo: IMG_2740.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 207-223
orientation: 180
confidence: high
notes: |
  Moderate ghosting (fainter duplicate text offset a few lines down), but gutter digits were legible and internally consistent throughout the transcribed range. Sticky-scroll header pinned at top: line 168 `export const rootMenuMiddleware: MiddlewareFunction = async ({ context, request }, next) => {` (not re-transcribed).
  This continues directly from IMG_2739 (which ended at line 207, `}),`, cross-confirmed by both photos independently). Shows the `else if (!currentNavContext?.action)` branch (sets a debug console.log then calls `context.set` with a fresh MENU navigation context) of the same `if (sessionInfo && sessionInfo.userId)` block started in IMG_2738/2739.
  Line 223 was cut off by the bottom status bar/taskbar in this photo; confirmed via IMG_2741 as `compLoc: sessionInfo.compLoc,`.
  Breadcrumb: aqs-web-ui > src > features > root > utils > middleware.ts > ...
  Tab bar: only "middleware.ts" tab open (badge "7"). Status bar: branch hitanshu/experimental*, "No Solution" (red), 9 errors / 0 warnings.
---
168: export const rootMenuMiddleware: MiddlewareFunction = async ({ context, request }, next) => {   [sticky-scroll header, enclosing scope]

207:         }),
208:       );
209:     } else if (!currentNavContext?.action) {
210:       console.log('[rootMenuMiddleware] Setting navigation context with action=MENU', {
211:         userId: sessionInfo.userId,
212:         compLoc: sessionInfo.compLoc,
213:         policyId: sessionInfo.policyId,
214:       });
215:       context.set(
216:         navigationContext,
217:         mergeNavigationContext(currentNavContext, {
218:           action: 'MENU',
219:           nodeKey: sessionInfo.nodeKey || null,
220:           xmlDetail: sessionXmlDetail ?? '',
221:           tab: null,
222:           userId: sessionInfo.userId,
223:           compLoc: sessionInfo.compLoc,


========== IMG_2741.md ==========
---
photo: IMG_2741.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/utils/middleware.ts
lines: 221-240
orientation: 180
confidence: medium
notes: |
  Moderate ghosting (fainter duplicate text offset a few lines away). Sticky-scroll header pinned at top: line 168 `export const rootMenuMiddleware: MiddlewareFunction = async ({ context, request }, next) => {` (not re-transcribed).
  Lines 221-227 are clean/unambiguous (cross-checked against IMG_2740, which shows the same content at 221-223 with matching numbers).
  Lines 228-240 (the final `else { ... }` branch closing the `if (actionFromUrl) {...} else if (...) {...} else {...}` chain, the outer `} else {` for when there's no authenticated session, and the middleware's closing `await next(); };`) had a recurring 1-line discrepancy between two different crops of this same photo; numbers below pick the sequential count anchored at the clean `cyclingCalled: false,` / `}),` / `);` run at 225-227, which left no unexplained gaps through to `};`. Treat these specific numbers as accurate to within ±1 line; code content is legible with good confidence.
  Breadcrumb: aqs-web-ui > src > features > root > utils > middleware.ts > ...
  Tab bar: only "middleware.ts" tab open (badge "7"). Status bar: branch hitanshu/experimental*, "No Solution" (red), 9 errors / 0 warnings.
---
168: export const rootMenuMiddleware: MiddlewareFunction = async ({ context, request }, next) => {   [sticky-scroll header, enclosing scope]

221:           tab: null,
222:           userId: sessionInfo.userId,
223:           compLoc: sessionInfo.compLoc,
224:           policyId: sessionInfo.policyId || '0',
225:           cyclingCalled: false,
226:         }),
227:       );
228:     } else {
229:       console.log('[rootMenuMiddleware] Navigation context already set, skipping', {
230:         actionFromUrl,
231:         action: currentNavContext?.action,
232:         cyclingCalled: currentNavContext?.cyclingCalled,
233:       });
234:     }
235:   } else {
236:     console.log('[rootMenuMiddleware] No session information found in localStorage');
237:   }
238:
239:   await next();
240: };
