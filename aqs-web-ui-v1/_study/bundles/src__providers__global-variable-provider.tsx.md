# BUNDLE for src/providers/global-variable-provider.tsx
# 10 photo fragment(s), ascending start-line order.


========== IMG_3128.md ==========
---
photo: IMG_3128.JPG
type: vscode-code
file: aqs-web-ui/src/providers/global-variable-provider.tsx
lines: 1-34
orientation: 180
confidence: high
notes: New file/tab opened, top of file. Sharp, no ghosting/blur. Tab bar shows only "global-variable-provider.tsx 3" (3 unsaved changes) open — form-provider.tsx tab from prior photos is gone. Explorer sidebar: providers/ folder expanded, global-variable-provider.tsx highlighted/selected (3 unsaved), siblings browser-commands-provide..., dialog-provider.tsx, form-provider.tsx, tab-context-provider.tsx, theme-provider.tsx; below providers/: services, types [green dot], utils, app.css, app.tsx, context.ts, main.tsx, routes.tsx. Status bar: branch hitanshu/experimental*, 5 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Red squiggle under "React" in "React.ReactNode" on line 31 (likely missing import diagnostic, consistent with no default React import in the import list at line 3). Line 34 is the last visible line, cut off by the status bar but fully legible: "const GlobalVariableProviderContent = ({ children }: GlobalVariableProviderContentProps) => {".
---
1: /* eslint-disable react-refresh/only-export-components */
2:
3: import { useCallback, useEffect, useMemo, useRef, type PropsWithChildren } from 'react';
4:
5: // utils
6: import createStore from '@utils/create-store';
7: import { createFeatureLogger } from '@utils/logger-builder';
8: import { getItem, removeItem, setItem } from '@utils/session-storage';
9:
10: // types
11: import type { GlobalVariableStore } from '@/types';
12:
13: type VariablesMap = Record<string, unknown>;
14:
15: // ----------------------------------------
16:
17: const logger = createFeatureLogger('global-variables', 'GlobalVariableProvider');
18: const GLOBAL_VARIABLES_STORAGE_KEY = 'aqs:global-variables';
19:
20: interface GlobalVariableState {
21:     variables: Record<string, unknown>;
22: }
23:
24: const { Provider, useStore } = createStore<GlobalVariableState>({
25:     variables: {},
26: });
27:
28: // ----------------------------------------
29:
30: interface GlobalVariableProviderContentProps extends PropsWithChildren {
31:     children: React.ReactNode;
32: }
33:
34: const GlobalVariableProviderContent = ({ children }: GlobalVariableProviderContentProps) => {


========== IMG_3129.md ==========
---
photo: IMG_3129.JPG
type: vscode-code
file: aqs-web-ui/src/providers/global-variable-provider.tsx
lines: 4-36
orientation: 180
confidence: high
notes: Same file/tab as IMG_3128, scrolled down by ~2 lines, revealing new content past line 34 (isHydratedRef). Whole frame has a 2-line-offset double-exposure ghost (each sharp/bold line has a fainter echo ~2 rows above it), but the sharp layer is legible throughout and content for lines 4-34 exactly matches IMG_3128 (no edits between shots — verified via a clean high-zoom crop of lines 4-15). New lines revealed beyond IMG_3128's cutoff: 35 "const [variables, setStore] = useStore((store) => store.variables);" and 36 "const isHydratedRef = useRef(false);" (both sharp/unambiguous, confirmed at high zoom). Explorer sidebar now shows the tree more expanded (aqs-web-ui > src > pages [expanded: login.tsx, page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]] > providers [expanded: browser-commands-provide..., dialog-provider.tsx, form-provider.tsx, global-variable-provider.tsx (selected, "3" unsaved), tab-context-provider.tsx, theme-provider.tsx] > services, types [green dot], utils, app.css, app.tsx, context.ts, main.tsx, routes.tsx); OUTLINE/TIMELINE/C# PROJECT DETAILS panel headers visible collapsed at the bottom of the sidebar. Status bar: aqs-web-ui, branch hitanshu/experimental*, 5 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Red squiggle still under "React" in "React.ReactNode" (line 31).
---
4: import { useCallback, useEffect, useMemo, useRef, type PropsWithChildren } from 'react';
5: // utils
6: import createStore from '@utils/create-store';
7: import { createFeatureLogger } from '@utils/logger-builder';
8: import { getItem, removeItem, setItem } from '@utils/session-storage';
9:
10: // types
11: import type { GlobalVariableStore } from '@/types';
12:
13: type VariablesMap = Record<string, unknown>;
14:
15: // ----------------------------------------
16:
17: const logger = createFeatureLogger('global-variables', 'GlobalVariableProvider');
18: const GLOBAL_VARIABLES_STORAGE_KEY = 'aqs:global-variables';
19:
20: interface GlobalVariableState {
21:     variables: Record<string, unknown>;
22: }
23:
24: const { Provider, useStore } = createStore<GlobalVariableState>({
25:     variables: {},
26: });
27:
28: // ----------------------------------------
29:
30: interface GlobalVariableProviderContentProps extends PropsWithChildren {
31:     children: React.ReactNode;
32: }
33:
34: const GlobalVariableProviderContent = ({ children }: GlobalVariableProviderContentProps) => {
35:     const [variables, setStore] = useStore((store) => store.variables);
36:     const isHydratedRef = useRef(false);


========== IMG_3130.md ==========
---
photo: IMG_3130.JPG
type: vscode-code
file: aqs-web-ui/src/providers/global-variable-provider.tsx
lines: 20-49
orientation: 180
confidence: medium
notes: Same file, scrolled further down from IMG_3129, revealing the useEffect hydration block (37-49) for the first time. Lines 20-36 repeat/confirm IMG_3128/IMG_3129 content exactly (not re-verified pixel-by-pixel here, reused from those higher-confidence transcripts). Heavy double-exposure ghosting throughout the useEffect block; cross-checked extensively against IMG_3131's re-shot of the same lines (same block, clearer photo) using both whole-block and single-line-height crops. The gutter numbers 39-49 form an unambiguous 11-row sequence and the code content for each row is legible, but pixel-level row/text pairing shifted by 1 line depending on crop method, so treat the exact placement of the blank separator line (43) and the if-block's closing brace (47) as medium confidence — the code content and overall order (useEffect open, persisted lookup, if-check, setStore call, blank, logger.debug call, close if, isHydratedRef assignment, close useEffect) is high confidence. Explorer sidebar unchanged from IMG_3129 (global-variable-provider.tsx selected, "3" unsaved, providers/ and pages/ expanded). Status bar: aqs-web-ui, branch hitanshu/experimental*, 5 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX.
---
20: interface GlobalVariableState {
21:     variables: Record<string, unknown>;
22: }
23:
24: const { Provider, useStore } = createStore<GlobalVariableState>({
25:     variables: {},
26: });
27:
28: // ----------------------------------------
29:
30: interface GlobalVariableProviderContentProps extends PropsWithChildren {
31:     children: React.ReactNode;
32: }
33:
34: const GlobalVariableProviderContent = ({ children }: GlobalVariableProviderContentProps) => {
35:     const [variables, setStore] = useStore((store) => store.variables);
36:     const isHydratedRef = useRef(false);
37:
38:     // Hydrate persisted variables once on provider mount
39:     useEffect(() => {
40:         const persisted = getItem<Record<string, unknown>>(GLOBAL_VARIABLES_STORAGE_KEY, {});
41:         if (persisted && Object.keys(persisted).length > 0) {
42:             setStore({ variables: persisted });
43:
44:             logger.debug('Hydrated global variables from sessionStorage', {
45:                 variableCount: Object.keys(persisted).length,
46:             });
47:         }
48:         isHydratedRef.current = true;
49:     }, [setStore]);


========== IMG_3131.md ==========
---
photo: IMG_3131.JPG
type: vscode-code
file: aqs-web-ui/src/providers/global-variable-provider.tsx
lines: 34 (sticky); 38-68
orientation: 180
confidence: medium
notes: Same file, scrolled further down from IMG_3130, re-showing the first useEffect hydration block (confirms/refines IMG_3130) and revealing a second useEffect (persistence-on-change effect) for the first time. Sticky header pinned at top: line 34 "const GlobalVariableProviderContent = ({ children }: GlobalVariableProviderContentProps) => {". Severe double-exposure ghosting throughout with a non-constant offset (varied between ~1 and ~5 lines across different crop regions of the same photo, consistent with rotational/non-linear camera shake rather than simple vertical motion) — extensive cross-checking via dozens of targeted single-line and multi-line crops was done, and top anchors (line 39 "useEffect(() => {", line 40 "const persisted = getItem...") are high confidence, confirmed identically across both this photo and IMG_3130. Everything from line 41 onward is a best-effort reconstruction: the code content and statement order is believed correct (cross-checked for syntactic completeness — every opened brace has a matching close), but exact line numbers for blank-line placement in the 41-68 span could shift by 1-2 in either direction versus the true file; a literal pixel reading of the bottom of this photo suggested "if (!isSaved) {" might be at line 70 rather than 68, which would require two additional lines somewhere in 41-68 that could not be located — flagging this explicitly rather than guessing further. Explorer sidebar and status bar unchanged from IMG_3129/3130 (global-variable-provider.tsx selected, "3" unsaved, hitanshu/experimental*, 5 errors / 0 warnings, "No Solution", TypeScript JSX).
---
34: const GlobalVariableProviderContent = ({ children }: GlobalVariableProviderContentProps) => {
39:     useEffect(() => {
40:         const persisted = getItem<Record<string, unknown>>(GLOBAL_VARIABLES_STORAGE_KEY, {});
41:         if (persisted && Object.keys(persisted).length > 0) {
42:             setStore({ variables: persisted });
43:
44:             logger.debug('Hydrated global variables from sessionStorage', {
45:                 variableCount: Object.keys(persisted).length,
46:             });
47:         }
48:         isHydratedRef.current = true;
49:     }, [setStore]);
50:
51:     // Persist variables whenever they change after hydration
52:     useEffect(() => {
53:         if (!isHydratedRef.current) {
54:             return;
55:         }
56:
57:         if (Object.keys(variables).length === 0) {
58:             const isRemoved = removeItem(GLOBAL_VARIABLES_STORAGE_KEY);
59:             if (!isRemoved) {
60:                 logger.warn('Failed to persist global variables to sessionStorage', {
61:                     operation: 'remove',
62:                 });
63:             }
64:             return;
65:         }
66:
67:         const isSaved = setItem(GLOBAL_VARIABLES_STORAGE_KEY, variables);
68:         if (!isSaved) {


========== IMG_3132.md ==========
---
photo: IMG_3132.JPG
type: vscode-code
file: aqs-web-ui/src/providers/global-variable-provider.tsx
lines: 34 (sticky); 54 (sticky); 56-88
orientation: 180
confidence: medium
notes: Same file, scrolled further down from IMG_3131, showing the rest of the second useEffect (persistence-on-change) and the file's final GlobalVariableProvider wrapper component through line 88 (end of visible content, cut off by status bar). Two sticky headers pinned at top: line 34 "const GlobalVariableProviderContent = ({ children }: GlobalVariableProviderContentProps) => {" and line 54 "useEffect(() => {" — the line-54 anchor is a valuable, reliable confirmation that the second useEffect (referred to with lower confidence in IMG_3131's notes) starts at line 54, not 52 as IMG_3131 estimated; IMG_3131's line numbers for this effect should be treated as approximate (off by roughly 2). Line 55 is hidden entirely under the sticky-scroll divider in this shot (not visible in either photo) — its content (likely a `if (!isHydratedRef.current) ... ` hydration guard, given the pattern established by the first effect) could not be confirmed and is omitted rather than guessed. Lines 56-64 and 69-88 were read via numerous targeted crops and are believed accurate; heavy double-exposure ghosting is present throughout (consistent 2-3 line offset) but was successfully cross-checked against multiple overlapping crops for this photo. Lines 66-68 (between the first block's closing brace and "const isSaved") could not be resolved — likely just a blank line plus possible short comment, omitted rather than guessed. Explorer sidebar and status bar unchanged from prior photos in this file (global-variable-provider.tsx selected, "3" unsaved, hitanshu/experimental*, 5 errors / 0 warnings, "No Solution", TypeScript JSX). Comment "// ----------------------------------------" at line 80 renders with a dashed horizontal-rule decoration (VS Code comment-divider styling, same as lines 15/28 elsewhere in this file) — this is a normal section divider, not the "commented-out dead code" pattern seen in form-provider.tsx.
---
34: const GlobalVariableProviderContent = ({ children }: GlobalVariableProviderContentProps) => {
54:     useEffect(() => {
56:         if (Object.keys(variables).length === 0) {
57:             const isRemoved = removeItem(GLOBAL_VARIABLES_STORAGE_KEY);
58:             if (!isRemoved) {
59:                 logger.warn('Failed to persist global variables to sessionStorage', {
60:                     operation: 'remove',
61:                 });
62:             }
63:             return;
64:         }
65:
69:         const isSaved = setItem(GLOBAL_VARIABLES_STORAGE_KEY, variables);
70:         if (!isSaved) {
71:             logger.warn('Failed to persist global variables to sessionStorage', {
72:                 operation: 'set',
73:             });
74:         }
75:     }, [variables]);
76:
77:     return <>{children}</>;
78: };
79:
80: // ----------------------------------------
81:
82: const GlobalVariableProvider = ({ children }: PropsWithChildren) => {
83:     return (
84:         <Provider>
85:             <GlobalVariableProviderContent>{children}</GlobalVariableProviderContent>
86:         </Provider>
87:     );
88: };


========== IMG_3133.md ==========
---
photo: IMG_3133.JPG
type: vscode-code
file: aqs-web-ui/src/providers/global-variable-provider.tsx
lines: 34 (sticky); 54 (sticky); 74-105
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3132. Two sticky headers pinned at top unchanged: line 34 "const GlobalVariableProviderContent = ({ children }: GlobalVariableProviderContentProps) => {" and line 54 "useEffect(() => {" (these are stale/inherited sticky context from higher up the file, not literally adjacent to the visible body). Lines 74-78 cross-confirm IMG_3132's transcript exactly (high confidence). Lines 79-88 (the GlobalVariableProvider wrapper) are consistent with IMG_3132's numbering, reused here rather than re-derived (this photo's severe ghosting in that specific span made independent verification unreliable, but no conflicting content was found — see IMG_3132 for that block). Lines 90-105 are new: a JSDoc block for `useGlobalVariableStore` followed by the start of the hook body, read with high confidence via multiple clean crops (moderate double-exposure ghosting present but the sharp/bold layer was unambiguous throughout this span, offset ~3 lines consistently). Line 105 "const variablesRef = useRef<VariablesMap>(variables);" is the last visible line, cut off by the Windows taskbar/status bar at the bottom of the photo. Explorer sidebar and status bar unchanged from prior photos (global-variable-provider.tsx selected, "3" unsaved, hitanshu/experimental*, 5 errors / 0 warnings, "No Solution", TypeScript JSX).
---
34: const GlobalVariableProviderContent = ({ children }: GlobalVariableProviderContentProps) => {
54:     useEffect(() => {
74:         }
75:     }, [variables]);
76:
77:     return <>{children}</>;
78: };
79:
80: // ----------------------------------------
81:
82: const GlobalVariableProvider = ({ children }: PropsWithChildren) => {
83:     return (
84:         <Provider>
85:             <GlobalVariableProviderContent>{children}</GlobalVariableProviderContent>
86:         </Provider>
87:     );
88: };
89:
90: /**
91:  * Hook for reading and mutating legacy global variables.
92:  * Supports dynamic names like mstrPolicyID and GlobalVars.mblnPolicyRated.
93:  *
94:  * IMPORTANT: `getVariable` and `getAllVariables` read from a synchronous ref
95:  * so that values set via `setVariable` are visible within the same execution
96:  * frame (e.g., sequential browser-command processing). Without the ref,
97:  * React's batched state updates would cause stale-closure reads.
98:  */
99: export function useGlobalVariableStore(): GlobalVariableStore {
100:     const [variables, setStore] = useStore((store) => store.variables);
101:
102:     // Ref that is updated synchronously inside setVariable and via useEffect,
103:     // so that getVariable always returns the freshest value even before
104:     // React re-renders the component.
105:     const variablesRef = useRef<VariablesMap>(variables);


========== IMG_3134.md ==========
---
photo: IMG_3134.JPG
type: vscode-code
file: aqs-web-ui/src/providers/global-variable-provider.tsx
lines: 88 (sticky); 99-117
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3133. Sticky header pinned at top: line 88 "const GlobalVariableProvider = ({ children }: PropsWithChildren) => {" (note: this is stale — the actual GlobalVariableProvider declaration is at line 82 per IMG_3132/3133; VS Code sticky scroll appears to be showing a slightly different anchor line here, possibly the closing "};" region — transcribed as displayed). Lines 90-98 (JSDoc comment) repeat IMG_3133 content and are heavily double-exposure-ghosted in this shot (not re-transcribed, see IMG_3133 for that block, which is higher confidence). Lines 99-117 read cleanly with light ghosting only (offset ~4-5 lines, well-separated and easy to disambiguate) via targeted crops — high confidence. Line 105 "const variablesRef = useRef<VariablesMap>(variables);" and its preceding comment at 104 cross-confirm IMG_3133's transcript exactly. New content: the ref-sync useEffect (106-110) and the start of the `setVariable` useCallback (111-117), which validates the variable name isn't empty before proceeding — line 118 body continues off-screen, cut off by the status bar. Explorer sidebar and status bar unchanged (global-variable-provider.tsx selected, "3" unsaved, hitanshu/experimental*, 5 errors / 0 warnings, "No Solution", TypeScript JSX).
---
88: const GlobalVariableProvider = ({ children }: PropsWithChildren) => {
99: export function useGlobalVariableStore(): GlobalVariableStore {
100:     const [variables, setStore] = useStore((store) => store.variables);
101:
102:     // Ref that is updated synchronously inside setVariable and via useEffect,
103:     // so that getVariable always returns the freshest value even before
104:     // React re-renders the component.
105:     const variablesRef = useRef<VariablesMap>(variables);
106:
107:     // Sync ref whenever variables change (can't do this during render)
108:     useEffect(() => {
109:         variablesRef.current = variables;
110:     }, [variables]);
111:
112:     const setVariable = useCallback(
113:         (name: string, value: unknown) => {
114:             if (!name || name.trim() === '') {
115:                 logger.warn('Ignoring SET_VARIABLE with empty variable name');
116:                 return;
117:             }


========== IMG_3135.md ==========
---
photo: IMG_3135.JPG
type: vscode-code
file: aqs-web-ui/src/providers/global-variable-provider.tsx
lines: 99 (sticky); 116-139
orientation: 180
confidence: medium
notes: Same file, scrolled further down from IMG_3134. Sticky header: line 99 "export function useGlobalVariableStore(): GlobalVariableStore {". Heavy double-exposure ghosting throughout (offset ~3 lines, fairly consistent and mostly resolvable via targeted crops). Lines 116-126 (rest of setVariable's functional setStore update, closing the useCallback) read with high confidence. Lines 127-130 could not be resolved — the gap between setVariable's closing ");" (126) and "const getVariable = useCallback(" (confirmed at 131 via clean crop) is wider than expected for a single blank line; likely contains a blank line plus a short JSDoc/comment (following the pattern of other functions in this file having a one-line explanatory comment), but content is omitted rather than guessed. Lines 131-139 (getVariable's signature, body, and dependency array) read with medium-high confidence. Line 139 "[], // Stable reference - reads from ref, not from closed-over state" is the last line clearly visible before the status bar; a line 140 ");" and 141 "}," are inferred (closing getVariable's useCallback and the function itself is NOT closed here — getVariable continues to be used later) but not independently confirmed, so omitted. Explorer sidebar and status bar unchanged from prior photos (global-variable-provider.tsx selected, "3" unsaved, hitanshu/experimental*, 5 errors / 0 warnings, "No Solution", TypeScript JSX). This is the last photo in this batch (3124-3135); the file continues beyond line 139 but is not captured in this chunk.
---
99: export function useGlobalVariableStore(): GlobalVariableStore {
116:             // Use functional update so concurrent SET_VARIABLE calls merge with the freshest state.
117:             setStore((prevStore) => {
118:                 const updated: VariablesMap = { ...prevStore.variables, [name]: value };
119:                 // Synchronously update the ref so that subsequent getVariable calls
120:                 // within the same execution frame see the new value.
121:                 variablesRef.current = updated;
122:                 return { variables: updated };
123:             });
124:         },
125:         [setStore],
126:     );
131:     const getVariable = useCallback(
132:         <T = unknown,>(name: string): T | undefined => {
133:             if (!name) {
134:                 return undefined;
135:             }
136:             // Read from ref for synchronous freshness (avoids stale closure).
137:             return variablesRef.current[name] as T | undefined;
138:         },
139:         [], // Stable reference - reads from ref, not from closed-over state


========== IMG_3136.md ==========
---
photo: IMG_3136.JPG
type: vscode-code
file: aqs-web-ui/src/providers/global-variable-provider.tsx
lines: 99-165
orientation: 180
confidence: high
notes: >
  Multi-level sticky scroll at top of editor: line 99 "export function useGlobalVariableStore(): GlobalVariableStore {"
  is the outer pinned header, then line 131 "const getVariable = useCallback(" and line 132
  "<T = unknown,>(name: string): T | undefined => {" are further nested sticky headers (a thin
  divider line separates the pinned headers from the actually-scrolled viewport). Actual scrolled
  content resumes at line 136 — lines 133-135 are not visible on screen (scrolled above, hidden
  under the sticky headers). Tab bar shows "global-variable-provider.tsx" with a "3" (3 unsaved/
  problem indicator) and status bar shows "5 errors, 0 warnings", "No Solution", branch
  "hitanshu/experimental*" (dirty), workspace "AQS_workspace". Explorer sidebar (pages > providers)
  visible files: login.tsx, page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx,
  prp-mlc-sum.tsx (U=untracked/modified), root.tsx, UltimateCoverPage.tsx, xsl-test.tsx (U),
  providers folder: browser-commands-provider..., dialog-provider.tsx, form-provider.tsx,
  global-variable-provider.tsx (highlighted/selected, "3"), tab-context-provider.tsx,
  theme-provider.tsx; also services, types, utils, app.css, app.tsx, context.ts, main.tsx,
  routes.tsx below providers. Photo has a visible ghosting/double-exposure artifact (faint
  duplicate of each text line offset down-and-right by ~1 line height) consistent with camera
  motion blur during capture — sharp/foreground text was used for transcription, ghost text
  ignored. Comment on line 139 uses an en dash "–" (not hyphen) in "reads from ref, not from
  closed-over state". Timestamp shown 6:13 PM 7/10/2026.
---
99      export function useGlobalVariableStore(): GlobalVariableStore {
131         const getVariable = useCallback(
132             <T = unknown,>(name: string): T | undefined => {
136                 // Read from ref for synchronous freshness (avoids stale closure).
137                 return variablesRef.current[name] as T | undefined;
138             },
139             [], // Stable reference – reads from ref, not from closed-over state
140         );
141
142         const getAllVariables = useCallback((): Record<string, unknown> => {
143             return { ...variablesRef.current };
144         }, []);
145
146         const clearVariables = useCallback(() => {
147             variablesRef.current = {};
148             setStore({ variables: {} });
149         }, [setStore]);
150
151         // The returned object is stable (depends only on stable callbacks) so that
152         // consumers like CommandHandlerBuilder don't needlessly rebuild.
153         return useMemo(
154             () => ({
155                 variables,
156                 setVariable,
157                 getVariable,
158                 getAllVariables,
159                 clearVariables,
160             }),
161             [variables, setVariable, getVariable, getAllVariables, clearVariables],
162         );
163     }
164
165     export { GlobalVariableProvider };


========== IMG_3137.md ==========
---
photo: IMG_3137.JPG
type: vscode-code
file: aqs-web-ui/src/providers/global-variable-provider.tsx
lines: 99-165
orientation: 180
confidence: medium
notes: >
  Same file/tab as IMG_3136 ("global-variable-provider.tsx 3"), same visible line range 99-165,
  captured with heavy motion-blur double-exposure — the photo appears to overlay two adjacent
  scroll positions of the same editor (one frame matching IMG_3136's layout with sticky headers
  99/131/132 then content from 136, another frame slightly further scrolled with sticky headers
  99/131 then content from ~142), so many lines appear doubled/offset on screen. Underlying source
  text is identical to IMG_3136 in the overlapping region; no new lines beyond 99-165 are legible
  (lines 100-130 and 133-135 remain hidden/scrolled off in both overlaid frames). Content
  transcribed here matches IMG_3136 verbatim for lines 99-165. Tab bar "global-variable-
  provider.tsx 3", status bar "5 errors 0 warnings", "No Solution", branch "hitanshu/experimental*",
  workspace AQS_workspace. Explorer sidebar same as IMG_3136 (pages: login.tsx, page-not-found.tsx,
  policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx (U), root.tsx,
  UltimateCoverPage.tsx, xsl-test.tsx (U); providers: browser-commands-provide..., dialog-
  provider.tsx, form-provider.tsx, global-variable-provider.tsx (selected), tab-context-
  provider.tsx, theme-provider.tsx). Timestamp 6:13 PM 7/10/2026 — same minute as IMG_3136,
  confirming these are back-to-back/burst shots of the same screen state.
---
99      export function useGlobalVariableStore(): GlobalVariableStore {
131         const getVariable = useCallback(
132             <T = unknown,>(name: string): T | undefined => {
136                 // Read from ref for synchronous freshness (avoids stale closure).
137                 return variablesRef.current[name] as T | undefined;
138             },
139             [], // Stable reference – reads from ref, not from closed-over state
140         );
141
142         const getAllVariables = useCallback((): Record<string, unknown> => {
143             return { ...variablesRef.current };
144         }, []);
145
146         const clearVariables = useCallback(() => {
147             variablesRef.current = {};
148             setStore({ variables: {} });
149         }, [setStore]);
150
151         // The returned object is stable (depends only on stable callbacks) so that
152         // consumers like CommandHandlerBuilder don't needlessly rebuild.
153         return useMemo(
154             () => ({
155                 variables,
156                 setVariable,
157                 getVariable,
158                 getAllVariables,
159                 clearVariables,
160             }),
161             [variables, setVariable, getVariable, getAllVariables, clearVariables],
162         );
163     }
164
165     export { GlobalVariableProvider };
