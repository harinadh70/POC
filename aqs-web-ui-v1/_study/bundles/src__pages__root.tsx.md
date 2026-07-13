# BUNDLE for src/pages/root.tsx
# 8 photo fragment(s), ascending start-line order.


========== IMG_3009.md ==========
---
photo: IMG_3009.JPG
type: vscode-code
file: aqs-web-ui/src/pages/root.tsx
lines: 1-34
orientation: 180
confidence: high
notes: Breadcrumb "aqs-web-ui > src > pages > root.tsx > ...". Tab bar shows only root.tsx (4 unsaved changes indicator). Explorer sidebar (src/hooks): use-form-commit.ts, use-page-form.ts, use-required-field-validation....ts (truncated), use-smart-navigation.ts; src/lib: grid-normalize.ts; src/pages: dashboard.tsx, dynamic-form-page.tsx, grid-config-example.tsx, legacy-page.tsx (U), lob-action-menu-page.tsx, LobGridExample.tsx (U), login.tsx, page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx (U), prp-mlc-sum.tsx (U), root.tsx (selected, "4"), UltimateCoverPage.tsx, xsl-test.tsx (U); providers and services folders collapsed below. Status bar: branch "hitanshu/experimental*", 6 errors / 0 warnings, "No Solution". Line 34 "};" is partially obscured by the status bar/Problems bar at the bottom of the visible editor area but legible.
---
```tsx
1   import { useEffect } from 'react';
2   import { Outlet, useNavigate, useLoaderData, useLocation } from 'react-router';
3   import { Header } from '@components/header';
4   import { Footer } from '@components/footer';
5   import { SubHeader } from '@components/sub-header';
6   import { FormProvider } from '@providers/form-provider';
7   import { DialogProvider } from '@providers/dialog-provider';
8   import { BrowserCommandsProvider } from '@providers/browser-commands-provider';
9   import { ThemeProvider } from '@providers/theme-provider';
10
11  // utils
12  import isEmpty from 'lodash-es/isEmpty';
13
14  // ----------------------------------------
15  // Type Definitions
16  // ----------------------------------------
17
18  /**
19   * Menu information from MENU action response
20   * CRITICAL: MENU response contains header navigation data (frame="MENU")
21   * NOT a navigable page route. Only menus array and queryString are relevant.
22   */
23  interface MenuInfo {
24      menus: unknown[];
25      queryString?: string;
26  }
27
28  /**
29   * Root loader data structure
30   */
31  interface RootLoaderData {
32      userInfo?: {
33          userId?: string;
34      };
```


========== IMG_3010.md ==========
---
photo: IMG_3010.JPG
type: vscode-code
file: aqs-web-ui/src/pages/root.tsx
lines: 9-38
orientation: 180
confidence: medium
notes: >
  Same file/tab as IMG_3009 (root.tsx), scrolled down slightly. This photo has severe
  motion-blur / double-exposure ghosting across the entire editor pane (visible in the
  line-number gutter as two overlapping numeric sequences ~2-4 lines apart, and in the
  code as doubled/overlapping text), most likely caused by camera/hand movement during
  a multi-frame shot. Content for lines 9-34 is corroborated at high confidence by
  cross-referencing the sharp/bold text layer against IMG_3009 (identical). Lines 35-38
  are newly visible (scrolled further than IMG_3009) but are the most heavily ghosted
  part of the frame; line 36 (closing brace of RootLoaderData) was confirmed as a bare
  "}" retroactively via IMG_3011, which shows the same interface via VS Code sticky-scroll
  and continues cleanly from this line. Breadcrumb: "aqs-web-ui > src >
  pages > root.tsx > ...". Tab bar: only root.tsx (4). Explorer sidebar same file list
  as IMG_3009 (hooks: use-form-commit.ts, use-page-form.ts, use-required-field-validation....ts,
  use-smart-navigation.ts; lib: grid-normalize.ts; pages: dashboard.tsx, dynamic-form-page.tsx,
  grid-config-example.tsx, legacy-page.tsx(U), lob-action-menu-page.tsx, LobGridExample.tsx(U),
  login.tsx, page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx(U),
  prp-mlc-sum.tsx(U), root.tsx(selected,"4"), UltimateCoverPage.tsx, xsl-test.tsx(U);
  providers/services collapsed below). Status bar: branch "hitanshu/experimental*",
  6 errors/0 warnings, "No Solution". Same timestamp (5:24 PM 7/10/2026) as IMG_3009,
  consistent with being taken moments apart.
---
```tsx
9   import { ThemeProvider } from '@providers/theme-provider';
10
11  // utils
12  import isEmpty from 'lodash-es/isEmpty';
13
14  // ----------------------------------------
15  // Type Definitions
16  // ----------------------------------------
17
18  /**
19   * Menu information from MENU action response
20   * CRITICAL: MENU response contains header navigation data (frame="MENU")
21   * NOT a navigable page route. Only menus array and queryString are relevant.
22   */
23  interface MenuInfo {
24      menus: unknown[];
25      queryString?: string;
26  }
27
28  /**
29   * Root loader data structure
30   */
31  interface RootLoaderData {
32      userInfo?: {
33          userId?: string;
34      };
35      menuInfo?: MenuInfo;
36  }
37  // ---------------------------------------- (start of next dashed comment section, cut off at bottom of frame; see IMG_3011 for continuation)
```


========== IMG_3011.md ==========
---
photo: IMG_3011.JPG
type: vscode-code
file: aqs-web-ui/src/pages/root.tsx
lines: 31-65
orientation: 180
confidence: medium
notes: >
  Continues scrolling down from IMG_3009/3010 in the same root.tsx tab. VS Code sticky-scroll
  shows "31 interface RootLoaderData {" pinned at the top of the editor (lines 32-33,
  userInfo?/userId?, are scrolled out of view behind the sticky header - already captured
  in IMG_3009/IMG_3010). This confirms line 36 is a bare "}" (resolves an uncertainty left
  open in IMG_3010's transcript for that line). Photo again has motion-blur double-exposure
  ghosting, worst in the lines 39-41 region (near the top of the visible code, below the
  "// Root Layout Component" banner) - exact content of lines 39-41 could not be resolved
  with confidence; line-number mapping for lines 42-65 was cross-validated using two
  separate unghosted/lightly-ghosted crops (lines 43-58 and lines 59-65) which agree with
  each other and with backward-counting the fixed-size JSDoc block, so confidence for
  42-65 is high despite the "medium" overall rating (pulled down by 39-41). Explorer
  sidebar: same as prior root.tsx photos; note badge "27" now on Source Control icon
  (was less before) and root.tsx tab still shows unsaved indicator "4". Status bar:
  branch "hitanshu/experimental*", 6 errors/0 warnings, "No Solution", 5:24 PM 7/10/2026.
---
```tsx
31  interface RootLoaderData {        (sticky-scroll header; lines 32-33 scrolled out of view - see IMG_3009/3010)
34      };
35      menuInfo?: MenuInfo;
36  }
37  // ----------------------------------------------
38  // Root Layout Component
39  ⟪?⟫  (heavily ghosted/illegible - likely blank or continuation of banner)
40  ⟪?⟫  (heavily ghosted/illegible)
41  ⟪?⟫  (heavily ghosted/illegible)
42  /**
43   * This is the main layout wrapper for the entire application.
44   * It establishes the provider hierarchy and renders the common UI shell (Header/Footer).
45   *
46   * Provider Hierarchy (order is critical due to dependencies):
47   *
48   * 1. FormProvider
49   *    - Manages dynamic form state for XML-driven forms
50   *    - Provides form field values, errors, and update methods
51   *    - NOW INCLUDES: Field metadata (disabled, visible, readOnly, required) from browser commands
52   *    - Used by: BrowserCommandsProvider (SET_TEXT, SET_DISABLED commands), form components
53   *    - Store: { values, errors, touched, isSubmitting, fieldMetadata }
54   *
55   * 2. DialogProvider
56   *    - Manages application-wide dialog state (modals, alerts, confirmations)
57   *    - Provides methods to open/close dialogs with different types (ok, yesno, yesnocancel)
58   *    - Used by: BrowserCommandsProvider (SHOW_MESSAGE commands), error boundaries
59   *    - Store: { open: boolean, message: ReactNode, dialogType, messageType, callbacks }
60   *
61   * 3. BrowserCommandsProvider
62   *    - Interprets and executes server browser-commands from XML responses
63   *    - Depends on: FormProvider (for SET_TEXT, SET_DISABLED, etc.), DialogProvider (for SHOW_MESSAGE),
64   *      and app-level GlobalVariableProvider (for SET_VARIABLE)
65   *    - Depends on: Router context (for NAVIGATE commands via useNavigate)
```


========== IMG_3012.md ==========
---
photo: IMG_3012.JPG
type: vscode-code
file: aqs-web-ui/src/pages/root.tsx
lines: 43-76
orientation: 180
confidence: high
notes: >
  Continues scrolling down from IMG_3011 in the same root.tsx tab (same JSDoc block above
  the Root component). Lines 43-65 are sharp and exactly corroborate IMG_3011's lines
  43-65 (cross-validated across two photos). Lines 66-76 had moderate motion-blur
  double-exposure ghosting when this photo was transcribed in isolation; the exact
  content and line numbering for 66-76 has since been CORRECTED/CONFIRMED using
  IMG_3013 (same JSDoc block, photographed one scroll-step further, with clearer
  crops resolving the ambiguity) - line 66's command list is now complete, "Why This
  Order?" is the correct capitalization, and lines 75-76 are a blank comment line
  followed by a "Layout Structure:" sub-header (an earlier version of this transcript
  incorrectly guessed "*/ " and "export default function Root() {" for 75-76; the JSDoc
  actually continues through line 80, see IMG_3013 for lines 76-94). Breadcrumb:
  "aqs-web-ui > src > pages > root.tsx > ...". Explorer sidebar unchanged from prior
  root.tsx photos. Status bar: branch "hitanshu/experimental*", 6 errors/0 warnings,
  "No Solution", 5:24 PM 7/10/2026.
---
```tsx
43   * This is the main layout wrapper for the entire application.
44   * It establishes the provider hierarchy and renders the common UI shell (Header/Footer).
45   *
46   * Provider Hierarchy (order is critical due to dependencies):
47   *
48   * 1. FormProvider
49   *    - Manages dynamic form state for XML-driven forms
50   *    - Provides form field values, errors, and update methods
51   *    - NOW INCLUDES: Field metadata (disabled, visible, readOnly, required) from browser commands
52   *    - Used by: BrowserCommandsProvider (SET_TEXT, SET_DISABLED commands), form components
53   *    - Store: { values, errors, touched, isSubmitting, fieldMetadata }
54   *
55   * 2. DialogProvider
56   *    - Manages application-wide dialog state (modals, alerts, confirmations)
57   *    - Provides methods to open/close dialogs with different types (ok, yesno, yesnocancel)
58   *    - Used by: BrowserCommandsProvider (SHOW_MESSAGE commands), error boundaries
59   *    - Store: { open: boolean, message: ReactNode, dialogType, messageType, callbacks }
60   *
61   * 3. BrowserCommandsProvider
62   *    - Interprets and executes server browser-commands from XML responses
63   *    - Depends on: FormProvider (for SET_TEXT, SET_DISABLED, etc.), DialogProvider (for SHOW_MESSAGE),
64   *      and app-level GlobalVariableProvider (for SET_VARIABLE)
65   *    - Depends on: Router context (for NAVIGATE commands via useNavigate)
66   *    - Handles commands: SET_TEXT, LOAD_COMBO, NAVIGATE, SHOW_MESSAGE, SET_DISABLED, etc.
67   *    - Store: { commands, executedCommands, pendingCommands, isExecuting }
68   *
69   * Why This Order?
70   *    - FormProvider and DialogProvider are independent (no dependencies on each other)
71   *    - BrowserCommandsProvider depends on Form and Dialog stores in this layout
72   *    - GlobalVariableProvider is mounted at app level and is shared across routes
73   *    - All providers must be INSIDE RouterProvider to use Router hooks (useNavigate, useLocation)
74   *    - This structure is defined in Root (not App.tsx) so providers are within Router context
75   *
76   * Layout Structure:
```


========== IMG_3013.md ==========
---
photo: IMG_3013.JPG
type: vscode-code
file: aqs-web-ui/src/pages/root.tsx
lines: 61-94
orientation: 180
confidence: high
notes: >
  Continues scrolling down from IMG_3012 in the same root.tsx tab. Photo has motion-blur
  double-exposure ghosting throughout (two overlapping exposures offset by ~2 lines,
  same artifact as prior photos in this sequence), but content was cross-validated via
  multiple tight crops and is now internally consistent (line counts between anchor
  points match exactly), so confidence is high. This photo reveals additional content
  that was NOT visible in IMG_3012's frame (IMG_3012 only scrolled to line 76 and its
  transcript incorrectly guessed "*/ " and "export default function Root() {" for lines
  75-76 based on a miscounted reconstruction - the true content at 75-76 is a blank
  comment line and a "Layout Structure:" sub-header; IMG_3012's transcript has been
  corrected to match). The JSDoc block closes at line 80, component body starts at 81.
  Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", 6 errors/0
  warnings, "No Solution", 5:24 PM 7/10/2026.
---
```tsx
61   * 3. BrowserCommandsProvider
62   *    - Interprets and executes server browser-commands from XML responses
63   *    - Depends on: FormProvider (for SET_TEXT, SET_DISABLED, etc.), DialogProvider (for SHOW_MESSAGE),
64   *      and app-level GlobalVariableProvider (for SET_VARIABLE)
65   *    - Depends on: Router context (for NAVIGATE commands via useNavigate)
66   *    - Handles commands: SET_TEXT, LOAD_COMBO, NAVIGATE, SHOW_MESSAGE, SET_DISABLED, etc.
67   *    - Store: { commands, executedCommands, pendingCommands, isExecuting }
68   *
69   * Why This Order?
70   *    - FormProvider and DialogProvider are independent (no dependencies on each other)
71   *    - BrowserCommandsProvider depends on Form and Dialog stores in this layout
72   *    - GlobalVariableProvider is mounted at app level and is shared across routes
73   *    - All providers must be INSIDE RouterProvider to use Router hooks (useNavigate, useLocation)
74   *    - This structure is defined in Root (not App.tsx) so providers are within Router context
75   *
76   * Layout Structure:
77   *    - Header: Top navigation bar with menu (uses sessionInformation from localStorage)
78   *    - Outlet: React Router renders child route components here
79   *    - Footer: Bottom copyright/info bar
80   */
81  export default function Root() {
82      const navigate = useNavigate();
83      const location = useLocation();
84      const { userInfo, menuInfo } = useLoaderData<RootLoaderData>();
85
86      /**
87       * Cascading navigation pattern (mimics legacy LoadNextPage callback)
88       *
89       * After MENU loads successfully, automatically navigate to dashboard.
90       * This creates TWO separate navigation events:
91       * 1. Navigate to '/' → action='MENU' → load menu data (frame="MENU" - header navigation)
92       * 2. Navigate to '/Main_ISLLSYS_20010101' → action='MAIN' → load dashboard page (frame="MAIN")
93       *
94       * CRITICAL: MENU response has frame="MENU" (not a page, just menu data for header)
```


========== IMG_3014.md ==========
---
photo: IMG_3014.JPG
type: vscode-code
file: aqs-web-ui/src/pages/root.tsx
lines: 75-107
orientation: 180
confidence: high
notes: >
  Continues scrolling down from IMG_3013 in the same root.tsx tab. This photo is sharp
  with no motion-blur ghosting, and lines 75-94 exactly corroborate the corrected mapping
  from IMG_3012/IMG_3013 (confirms "Layout Structure:" at 76, "*/" at 80, "export default
  function Root() {" at 81, etc.) - all prior uncertainty in that range is now resolved
  at high confidence. New content: lines 95-107 (Landing Route / Matches legacy notes,
  and the start of a useEffect hook). Explorer sidebar: same file list as prior root.tsx
  photos. Status bar: branch "hitanshu/experimental*", 6 errors/0 warnings, "No Solution",
  5:24 PM 7/10/2026.
---
```tsx
75
76   * Layout Structure:
77   * - Header: Top navigation bar with menu (uses sessionInformation from localStorage)
78   * - Outlet: React Router renders child route components here
79   * - Footer: Bottom copyright/info bar
80   */
81  export default function Root() {
82      const navigate = useNavigate();
83      const location = useLocation();
84      const { userInfo, menuInfo } = useLoaderData<RootLoaderData>();
85
86      /**
87       * Cascading navigation pattern (mimics legacy LoadNextPage callback)
88       *
89       * After MENU loads successfully, automatically navigate to dashboard.
90       * This creates TWO separate navigation events:
91       * 1. Navigate to '/' → action='MENU' → load menu data (frame="MENU" - header navigation)
92       * 2. Navigate to '/Main_ISLLSYS_20010101' → action='MAIN' → load dashboard page (frame="MAIN")
93       *
94       * CRITICAL: MENU response has frame="MENU" (not a page, just menu data for header)
95       *           MAIN response has frame="MAIN" and the actual page FileName
96       *
97       * Landing Route:
98       * - ALWAYS navigate to hardcoded '/Main_ISLLSYS_20010101'
99       * - MENU response does NOT contain navigable page information
100      * - Dynamic routing happens AFTER MAIN action in Dashboard component
101      *
102      * Matches legacy:
103      * - ExecuteAction("MENU") → menu loads → LoadNextPage() fires
104      * - LoadNextPage() → ExecuteAction(mstrAction="MAIN") → loads Main_ISLLSYS_20010101.asp
105      */
106     useEffect(() => {
107         // Only trigger if:
```


========== IMG_3015.md ==========
---
photo: IMG_3015.JPG
type: vscode-code
file: aqs-web-ui/src/pages/root.tsx
lines: 81-118
orientation: 180
confidence: high
notes: >
  Continues scrolling down from IMG_3014 in the same root.tsx tab. VS Code sticky-scroll
  shows "81 export default function Root() {" pinned at the top. Lines 86-104 are visible
  but with motion-blur double-exposure ghosting (same artifact as earlier photos in this
  set) - however this range exactly duplicates content already transcribed cleanly in
  IMG_3014 (lines 86-104), so it is omitted here to avoid redundancy (see IMG_3014 for
  verbatim text). Lines 105-118 are new and sharp/unghosted, giving high confidence.
  Line 118 was cut off at the very bottom edge of the frame here - subsequently confirmed
  as "}" via IMG_3016 (which also shows line 119 closing the useEffect's dependency
  array). Explorer
  sidebar unchanged. Status bar: branch "hitanshu/experimental*", 6 errors/0 warnings,
  "No Solution", 5:24 PM 7/10/2026.
---
```tsx
81  export default function Root() {   (sticky-scroll header; lines 82-85/86-104 scrolled - see IMG_3014 for 86-104 verbatim)
...
105     */
106     useEffect(() => {
107         // Only trigger if:
108         // 1. Currently on root path (not already on dashboard)
109         // 2. Menu has loaded successfully (menuInfo exists)
110         // 3. User is authenticated (userInfo exists)
111         if (location.pathname === '/' && menuInfo && userInfo?.userId) {
112             console.log('[Root] MENU loaded - cascading to dashboard (mimics LoadNextPage)');
113             // Always navigate to hardcoded dashboard route
114             // MENU response doesn't contain page FileName (it's frame data, not route data)
115             navigate('/Main_ISLLSYS_20010101', {
116                 replace: true, // Replace history to avoid back button issues
117             });
118     }   (confirmed via IMG_3016)
```


========== IMG_3016.md ==========
---
photo: IMG_3016.JPG
type: vscode-code
file: aqs-web-ui/src/pages/root.tsx
lines: 81-136
orientation: 180
confidence: high
notes: >
  Continues scrolling down from IMG_3015 in the same root.tsx tab; this appears to be
  the end of root.tsx (closing JSX return and final braces, line 135 is likely the last
  line of the file). Sticky-scroll shows "81 export default function Root() {" pinned
  at top. Lines 105-117 repeat (ghosted/duplicated) content already captured cleanly in
  IMG_3015 and are omitted here. Lines 118-136 are new: closes the useEffect (118-119),
  then the component's JSX return - a nested provider tree (ThemeProvider > FormProvider
  > DialogProvider > BrowserCommandsProvider) wrapping Header/SubHeader/Outlet/Footer.
  This resolves IMG_3015's line 118 (was marked illegible there; confirmed here as "}").
  Many JSX lines have red squiggly underlines (linter warnings, cause not visible) and
  moderate ghosting, but text is legible. Explorer sidebar unchanged. Status bar: branch
  "hitanshu/experimental*", 6 errors/0 warnings, "No Solution", 5:24 PM 7/10/2026.
---
```tsx
81  export default function Root() {   (sticky-scroll header)
...
118         }
119     }, [location.pathname, menuInfo, userInfo, navigate]);
120
121     return (
122         <ThemeProvider>
123             <FormProvider>
124                 <DialogProvider>
125                     <BrowserCommandsProvider>
126                         <Header />
127                         {!isEmpty(menuInfo) ? <SubHeader /> : null}
128                         <Outlet />
129                         <Footer />
130                     </BrowserCommandsProvider>
131                 </DialogProvider>
132             </FormProvider>
133         </ThemeProvider>
134     );
135  }
```
