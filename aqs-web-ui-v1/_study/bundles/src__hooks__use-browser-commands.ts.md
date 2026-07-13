# BUNDLE for src/hooks/use-browser-commands.ts
# 6 photo fragment(s), ascending start-line order.


========== IMG_2743.md ==========
---
photo: IMG_2743.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-browser-commands.ts
lines: 1-34
orientation: 180
confidence: high
notes: |
  Sharp, clear photo — no ghosting/blur. Shows the top of the file (JSDoc header block with an @example, plus imports and the start of a second JSDoc block for the exported hook); line 34 is the last visible line, its bottom edge just touching the status bar.
  Breadcrumb: aqs-web-ui > src > hooks > use-browser-commands.ts > ...
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src), same tree as IMG_2742 with use-browser-commands.ts now selected:
    features/prp/utils (collapsed)
    features/root/services/user-data.ts, utils/loader.ts, utils/middleware.ts
    hooks/: use-action-guard.ts, use-browser-commands.ts (selected, tab truncated to "use-browser-commands..."), use-deferred-navigation.ts, use-form-commit.ts, use-page-form.ts, use-required-field-validation... (truncated), use-smart-navigation.ts
    lib/, pages/, providers/, services/, types/, utils/ (collapsed), app.css
  Tab bar: only "use-browser-commands.ts" tab open (badge "1").
  Status bar: branch hitanshu/experimental*, "No Solution" (red), 3 errors / 0 warnings.
---
1: /**
2:  * @file use-browser-commands.ts
3:  * @description React hook for applying browser commands from loader data
4:  *
5:  * This hook simplifies command execution by delegating to BrowserCommandsProvider.
6:  * Commands should be fetched in loaders and provided via useLoaderData().
7:  *
8:  * @example
9:  * ```tsx
10:  * // In loader:
11:  * export async function pageLoader({ context }) {
12:  *   const navContext = context.get(navigationContext);
13:  *   return data({ browserCommands: navContext?.browserCommands || [] });
14:  * }
15:  *
16:  * // In component:
17:  * function Page() {
18:  *   const { browserCommands } = useLoaderData();
19:  *   useBrowserCommands(browserCommands); // Auto-executes
20:  *   return <div>...</div>;
21:  * }
22:  * ```
23:  */
24:
25: import { useEffect, useRef } from 'react';
26: import { useBrowserCommandsStore } from '@providers/browser-commands-provider';
27: import type { BrowserCommand } from '@/types';
28:
29: /**
30:  * Hook for applying browser commands from loader data.
31:  *
32:  * Automatically executes commands when they change.
33:  * Commands should be fetched in loaders, not useEffect.
34:  * Uses ref-based deduplication to prevent infinite loops from array reference changes.


========== IMG_2744.md ==========
---
photo: IMG_2744.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-browser-commands.ts
lines: 11-44
orientation: 180
confidence: medium
notes: |
  Photo shows a scroll/motion ghosting artifact in the upper third of the frame (roughly lines 11-23):
  a faint, offset duplicate layer of similar JSDoc comment text is superimposed behind the sharp
  foreground text, e.g. faint fragments "This hook simplifies command execution by delegating to
  BrowserCommandsProvider", "...be fetched in loaders and provided via useLoaderData()", "// In loader:".
  These look like a scroll-position ghost (LCD response lag / capture blur) duplicating nearby
  comment lines, not distinct additional code — not transcribed as separate lines. Line 11 itself is
  faint/overlapped by the breadcrumb bar; transcribed as best-effort, low confidence for that line only.
  Breadcrumb: aqs-web-ui > src > hooks > use-browser-commands.ts > ...
  Tab bar: only "use-browser-commands.ts" open, "1" unsaved-change badge.
  Explorer sidebar tree (AQS_WORKSPACE):
    aqs-web-ui (modified dot)
      src (modified dot)
        features (modified dot)
          prp
            utils (expanded, no children visible)
        root
          services/
            user-data.ts
          utils/
            loader.ts
            middleware.ts (modified dot)
        hooks (expanded, highlighted)
          use-action-guard.ts
          use-browser-commands....ts (selected/highlighted, "1" badge)
          use-deferred-navigation.ts
          use-form-commit.ts
          use-page-form.ts
          use-required-field-validation....ts
          use-smart-navigation.ts
        lib/ (collapsed, dot)
        pages/ (collapsed, dot)
        providers/ (collapsed)
        services/ (collapsed)
        types/ (collapsed, dot)
        utils/ (collapsed)
      app.css
  Status bar: branch hitanshu/experimental*, "No Solution" red badge, 3 errors / 0 warnings.
  Source-control icon badge in activity bar shows "1".
---
11: * export async function pageLoader({ context }) {   ⟪faint/ghosted, low confidence⟫
12: *   const navContext = context.get(navigationContext);
13: *   return data({ browserCommands: navContext?.browserCommands || [] });
14: * }
15: *
16: * // In component:
17: * function Page() {
18: *   const { browserCommands } = useLoaderData();
19: *   useBrowserCommands(browserCommands); // Auto-executes
20: *   return <div>...</div>;
21: * }
22: * ...
23: */
24:
25: import { useEffect, useRef } from 'react';
26: import { useBrowserCommandsStore } from '@providers/browser-commands-provider';
27: import type { BrowserCommand } from '@/types';
28:
29: /**
30:  * Hook for applying browser commands from loader data.
31:  *
32:  * Automatically executes commands when they change.
33:  * Commands should be fetched in loaders, not useEffect.
34:  * Uses ref-based deduplication to prevent infinite loops from array reference changes.
35:  *
36:  * @param commands - Array of commands from loader data
37:  * @param autoExecute - Whether to execute commands automatically (default: true)
38:  * @returns Object with isExecuting state and executeCommands function
39:  *
40:  * @example
41:  * ```tsx
42:  * // Simple usage - auto-execute commands
43:  * function MyPage() {
44:  *   const { browserCommands } = useLoaderData();


========== IMG_2745.md ==========
---
photo: IMG_2745.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-browser-commands.ts
lines: 30-62
orientation: 180
confidence: low
notes: |
  SEVERE ghosting/double-exposure artifact across the entire frame: the editor pane shows what
  appears to be two overlapping captures of the document offset by roughly 5 lines (consistent
  with the page having scrolled slightly during a rolling-shutter photo capture), so most rows show
  two blended lines of text plus two overlapping gutter numbers. Gutter numbers themselves were
  independently verified as a clean sequential run 30->62 via a tightly-cropped, high-zoom read of
  just the gutter column, so those numbers are trusted; deriving which text belongs to which exact
  number required reasoning about code structure/JSDoc flow rather than a direct clean read.
  Lines 30-44 are corroborated against the sharper photo IMG_2744 (same content, same numbering,
  high confidence there); lines 45-62 are this photo's best-effort reconstruction from the dominant/
  bold half of the doubled text, cross-checked for internal consistency (line count matches the
  30-62 gutter span) but NOT independently confirmed by another sharp photo — treat line boundaries
  in the 45-62 range as approximate; a couple of blank/comment lines could be off by one row.
  Content just below the visible gutter cutoff ("Execute Commands", "</button>") is legible but its
  exact line numbers (63-64?) are not confirmed since the gutter is cropped at 62 at the frame edge.
  Breadcrumb: aqs-web-ui > src > hooks > use-browser-commands.ts
  Tab bar: only "use-browser-commands.ts" open, "1" unsaved-change badge.
  Explorer sidebar tree same as IMG_2744 (hooks folder expanded, use-browser-commands...ts selected).
  Source-control icon badge in activity bar now shows "27" (was "1" in IMG_2744).
  Status bar: branch hitanshu/experimental*, "No Solution" red badge, 3 errors / 0 warnings.
---
30: * Hook for applying browser commands from loader data.
31: *
32: * Automatically executes commands when they change.
33: * Commands should be fetched in loaders, not useEffect.
34: * Uses ref-based deduplication to prevent infinite loops from array reference changes.
35: *
36: * @param commands - Array of commands from loader data
37: * @param autoExecute - Whether to execute commands automatically (default: true)
38: * @returns Object with isExecuting state and executeCommands function
39: *
40: * @example
41: * ```tsx
42: * // Simple usage - auto-execute commands
43: * function MyPage() {
44: *   const { browserCommands } = useLoaderData();
45: *   useBrowserCommands(browserCommands); // Auto-executes  ⟪reconstructed, low confidence⟫
46: *   return <div>...</div>;  ⟪reconstructed, low confidence⟫
47: * }  ⟪reconstructed, low confidence⟫
48: *  ⟪reconstructed, low confidence⟫
49: * // Manual execution control  ⟪reconstructed, low confidence⟫
50: * function AdvancedPage() {  ⟪reconstructed, low confidence⟫
51: *   const { browserCommands } = useLoaderData();  ⟪reconstructed, low confidence⟫
52: *   const { executeCommands, isExecuting } = useBrowserCommands(browserCommands, false);  ⟪reconstructed, low confidence⟫
53: *  ⟪reconstructed, low confidence⟫
54: *   const handleAction = async () => {  ⟪reconstructed, low confidence⟫
55: *     await executeCommands(browserCommands);  ⟪reconstructed, low confidence⟫
56: *   };  ⟪reconstructed, low confidence⟫
57: *  ⟪reconstructed, low confidence⟫
58: *   return (  ⟪reconstructed, low confidence⟫
59: *     <div>  ⟪reconstructed, low confidence⟫
60: *       <button onClick={handleAction} disabled={isExecuting}>  ⟪reconstructed, low confidence⟫
61: *         Execute Commands  ⟪reconstructed, low confidence⟫
62: *       </button>  ⟪reconstructed, low confidence⟫


========== IMG_2746.md ==========
---
photo: IMG_2746.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-browser-commands.ts
lines: 41-74
orientation: 180
confidence: medium
notes: |
  Same pervasive ghosting/double-exposure artifact as IMG_2745 (offset duplicate text throughout,
  consistent with scroll motion during a rolling-shutter photo capture). This photo is scrolled a
  bit further than IMG_2745 and its content corroborates/confirms most of IMG_2745's reconstructed
  lines 44-62 (same code, same line numbers), raising confidence for that overlapping span, and
  extends legibly through line 74 (start of the useBrowserCommands hook body).
  A large, bold, non-comment-styled "function MyPage() {" appears pinned at the very top of the
  editor pane above the normal gutter sequence -- interpreted as a VS Code sticky-scroll header
  (pinned enclosing-scope line, likely representing line 43) rather than a distinct new line; not
  given its own line number in the transcription below.
  Breadcrumb: aqs-web-ui > src > hooks > use-browser-commands.ts
  Tab bar: only "use-browser-commands.ts" open, "1" unsaved-change badge.
  Explorer sidebar tree unchanged from IMG_2745 (hooks folder expanded, use-browser-commands...ts
  selected/highlighted).
  Source-control icon badge in activity bar shows "27" (same as IMG_2745).
  Status bar: branch hitanshu/experimental*, "No Solution" red badge, 3 errors / 0 warnings.
  Line 75 (cut off at bottom edge of frame) appeared to repeat "useEffect(() => {" /
  "if (!autoExecute...)" text -- likely ghost bleed-through of line ~72, not transcribed as new
  content.
---
41: * ```tsx
42: * // Simple usage - auto-execute commands
43: * function MyPage() {
44: *   const { browserCommands } = useLoaderData();
45: *   useBrowserCommands(browserCommands);
46: *   return <div>...</div>;
47: * }
48: *
49: * // Manual execution control
50: * function AdvancedPage() {
51: *   const { browserCommands } = useLoaderData();
52: *   const { executeCommands, isExecuting } = useBrowserCommands(browserCommands, false);
53: *
54: *   const handleAction = async () => {
55: *     await executeCommands(browserCommands);
56: *   };
57: *
58: *   return (
59: *     <div>
60: *       <button onClick={handleAction} disabled={isExecuting}>
61: *         Execute Commands
62: *       </button>
63: *     </div>
64: *   );
65: * }
66: * ...
67: */
68: export function useBrowserCommands(commands?: BrowserCommand[], autoExecute = true) {
69:   const { executeCommands, isExecuting } = useBrowserCommandsStore();
70:   const executedSignatureRef = useRef<string | null>(null);
71:   useEffect(() => {
72:     if (!autoExecute || !commands || commands.length === 0) {
73:       return;
74:     }


========== IMG_2747.md ==========
---
photo: IMG_2747.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-browser-commands.ts
lines: 59-89
orientation: 180
confidence: medium
notes: |
  Same pervasive scroll-motion ghosting/double-exposure artifact as IMG_2745/IMG_2746. Lines 59-74
  corroborate IMG_2746 exactly (high confidence for that span). Lines 75-89 are this photo's own
  content (the commandSignature/JSON.stringify dedup logic and the "skip if already executed" guard)
  reconstructed from two internally-consistent close-up crops of this same photo; however, a
  tightly-cropped read of the bottom crop's gutter numbers (86-91) taken in isolation suggested the
  whole 75-89 span could be shifted by -1 relative to what's transcribed below (i.e. the guard's
  closing "}" might be line 74 XOR line 75 depending on which crop's digit reading is trusted) --
  code CONTENT and ORDER are confident; exact line numbers in the 75-89 range carry +/-1 uncertainty.
  Breadcrumb: aqs-web-ui > src > hooks > use-browser-commands.ts
  Tab bar: only "use-browser-commands.ts" open, "1" unsaved-change badge.
  Explorer sidebar tree unchanged (hooks folder expanded, use-browser-commands...ts selected).
  Source-control icon badge in activity bar shows "27".
  Status bar: branch hitanshu/experimental*, "No Solution" red badge, 3 errors / 0 warnings.
  Minimap (right edge) shows a small red marker partway down, consistent with an error elsewhere
  in the file.
---
59: *     <div>
60: *       <button onClick={handleAction} disabled={isExecuting}>
61: *         Execute Commands
62: *       </button>
63: *     </div>
64: *   );
65: * }
66: * ...
67: */
68: export function useBrowserCommands(commands?: BrowserCommand[], autoExecute = true) {
69:   const { executeCommands, isExecuting } = useBrowserCommandsStore();
70:   const executedSignatureRef = useRef<string | null>(null);
71:   useEffect(() => {
72:     if (!autoExecute || !commands || commands.length === 0) {
73:       return;
74:     }
75:
76:     // Create a signature of the commands to detect actual changes
77:     // This prevents re-execution when array reference changes but content is same
78:     const commandSignature = JSON.stringify(
79:       commands.map((cmd) => ({
80:         verb: cmd.verb,
81:         noun: cmd.noun,
82:         addinf: cmd.addinf,
83:       })),
84:     );
85:
86:     // Skip if we've already executed these exact commands
87:     if (executedSignatureRef.current === commandSignature) {
88:       return;
89:     }


========== IMG_2748.md ==========
---
photo: IMG_2748.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-browser-commands.ts
lines: 65-100
orientation: 180
confidence: medium
notes: |
  Same pervasive scroll-motion ghosting/double-exposure artifact as prior photos in this file
  (IMG_2745-2747). Two sticky-scroll-like pinned lines appear at the very top of the editor pane
  above the normal gutter sequence, showing the enclosing "export function useBrowserCommands(...)"
  and "useEffect(() => {" context; not given separate line numbers here since their content/line
  numbers (65 and 71 respectively) were already established from IMG_2746/IMG_2747. Lines 72-89
  corroborate IMG_2747 exactly (high confidence). Lines 90-100 are new content in this photo, read
  from a clean, unambiguous crop with a directly-verified sequential gutter run (72->102), giving
  higher confidence than the earlier photos in this series.
  Breadcrumb: aqs-web-ui > src > hooks > use-browser-commands.ts
  Tab bar: only "use-browser-commands.ts" open, "1" unsaved-change badge.
  Explorer sidebar tree unchanged (hooks folder expanded, use-browser-commands...ts selected).
  Source-control icon badge in activity bar shows "27".
  Status bar: branch hitanshu/experimental*, "No Solution" red badge, 3 errors / 0 warnings.
  Gutter visible through line 102 but content beyond 100 not legibly distinguishable from ghosting;
  not transcribed.
---
65: export function useBrowserCommands(commands?: BrowserCommand[], autoExecute = true) {
66:   const { executeCommands, isExecuting } = useBrowserCommandsStore();
67:   const executedSignatureRef = useRef<string | null>(null);
68: ⟪?⟫
69: ⟪?⟫
70: ⟪?⟫
71:   useEffect(() => {
72:     if (!autoExecute || !commands || commands.length === 0) {
73:       return;
74:     }
75:
76:     // Create a signature of the commands to detect actual changes
77:     // This prevents re-execution when array reference changes but content is same
78:     const commandSignature = JSON.stringify(
79:       commands.map((cmd) => ({
80:         verb: cmd.verb,
81:         noun: cmd.noun,
82:         addinf: cmd.addinf,
83:       })),
84:     );
85:
86:     // Skip if we've already executed these exact commands
87:     if (executedSignatureRef.current === commandSignature) {
88:       return;
89:     }
90:
91:     // Mark as executed before execution to prevent race conditions
92:     executedSignatureRef.current = commandSignature;
93:
94:     // Execute commands from loader
95:     executeCommands(commands).catch((error) => {
96:       console.error('[useBrowserCommands] Failed to execute commands:', error);
97:       // Reset on error to allow retry
98:       executedSignatureRef.current = null;
99:     });
100:   }, [commands, autoExecute, executeCommands]);
