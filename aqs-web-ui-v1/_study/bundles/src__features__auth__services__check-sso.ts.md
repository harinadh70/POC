# BUNDLE for src/features/auth/services/check-sso.ts
# 8 photo fragment(s), ascending start-line order.


========== IMG_2317.md ==========
---
photo: IMG_2317.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/check-sso.ts
lines: 1-34
orientation: 180
confidence: high
notes: |
  Breadcrumb: aqs-web-ui > src > features > auth > services > check-sso.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "check-sso.ts" (no problems badge, clean file for this tab).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (expanded) > auth.ts, check-sso.ts [selected/highlighted], utils (collapsed), middleware.ts; dashboard, form, legacy, policy, prp, root (all collapsed).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  Line 34 is right at the bottom edge, partially cut by the taskbar but text is legible in a zoomed crop: "Prevents immediate SSO re-check after logout".
  Image required 180° rotation (was upside down).
---

```
1   import { loginUser, type SessionInfo } from './auth';
2   import { getItem, setItem } from '@utils/local-storage';
3
4   // ----------------------------------------
5   // SSO Check Flag Lifecycle
6   // ----------------------------------------
7   /**
8    * Why SSO Check Doesn't Happen on Every Page Refresh:
9    *
10   * The skipSSOCheck flag (stored in localStorage) controls when Windows AD SSO checks occur.
11   * This prevents unnecessary API calls on every page load.
12   *
13   * Flow:
14   * 1. First Load (no flag):
15   *    - User lands on /login
16   *    - checkSSOSession() calls Windows AD API
17   *    - API returns 401 (no AD session)
18   *    - Sets skipSSOCheck = true in localStorage
19   *    - Shows login form
20   *
21   * 2. On Refresh (flag exists):
22   *    - skipSSOCheck = true found in localStorage
23   *    - Skips SSO check completely (0 API calls)
24   *    - Shows login form immediately
25   *    - Performance: instant render, no wait for API
26   *
27   * 3. After Manual Login:
28   *    - User enters credentials successfully
29   *    - clientLoginAction clears skipSSOCheck flag
30   *    - Next page load will attempt SSO again
31   *
32   * 4. After Logout:
33   *    - clientLogoutAction sets skipSSOCheck = true
34   *    - Prevents immediate SSO re-check after logout
```


========== IMG_2318.md ==========
---
photo: IMG_2318.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/check-sso.ts
lines: 14-47
orientation: 180
confidence: high
notes: |
  Breadcrumb: aqs-web-ui > src > features > auth > services > check-sso.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "check-sso.ts" (no problems badge).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (expanded) > auth.ts, check-sso.ts [selected/highlighted], utils (collapsed), middleware.ts; dashboard, form, legacy, policy, prp, root (all collapsed).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  This is a continuation/scroll-down of the same file from IMG_2317 (lines 14-34 repeat content already seen, extending to new lines 35-47).
  Line 47 cut off at bottom edge of screen (taskbar occludes rest of the line and any further lines); only "*" visible so far.
  Image required 180° rotation (was upside down).
---

```
14  * 1. First Load (no flag):
15  *    - User lands on /login
16  *    - checkSSOSession() calls Windows AD API
17  *    - API returns 401 (no AD session)
18  *    - Sets skipSSOCheck = true in localStorage
19  *    - Shows login form
20  *
21  * 2. On Refresh (flag exists):
22  *    - skipSSOCheck = true found in localStorage
23  *    - Skips SSO check completely (0 API calls)
24  *    - Shows login form immediately
25  *    - Performance: instant render, no wait for API
26  *
27  * 3. After Manual Login:
28  *    - User enters credentials successfully
29  *    - clientLoginAction clears skipSSOCheck flag
30  *    - Next page load will attempt SSO again
31  *
32  * 4. After Logout:
33  *    - clientLogoutAction sets skipSSOCheck = true
34  *    - Prevents immediate SSO re-check after logout
35  *
36  * Why This Design?
37  * - Avoids repeated 401 calls to Windows AD on every refresh
38  * - Respects user's decision to use manual login
39  * - Only re-checks SSO when user successfully authenticates
40  * - Optimal for production: 1 SSO check per user session
41  */
42
43  // ----------------------------------------
44
45  /**
46   * Result type for SSO session check operation.
47   *
```


========== IMG_2319.md ==========
---
photo: IMG_2319.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/check-sso.ts
lines: 30-63
orientation: 180
confidence: high
notes: |
  Breadcrumb: aqs-web-ui > src > features > auth > services > check-sso.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "check-sso.ts" (no problems badge).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (expanded) > auth.ts, check-sso.ts [selected/highlighted], utils (collapsed), middleware.ts; dashboard, form, legacy, policy, prp, root (all collapsed).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  Continuation/scroll-down of the same file from IMG_2317/IMG_2318 (lines 30-41 repeat content already seen, extending to new lines 42-63).
  Line 63 is cut off at the very bottom edge, further occluded by the red "No Solution" status-bar badge overlapping the text; only "* 5. Returns failure state if SSO authenticat..." is legible, rest marked illegible.
  Image required 180° rotation (was upside down).
---

```
30  *    - Next page load will attempt SSO again
31  *
32  * 4. After Logout:
33  *    - clientLogoutAction sets skipSSOCheck = true
34  *    - Prevents immediate SSO re-check after logout
35  *
36  * Why This Design?
37  * - Avoids repeated 401 calls to Windows AD on every refresh
38  * - Respects user's decision to use manual login
39  * - Only re-checks SSO when user successfully authenticates
40  * - Optimal for production: 1 SSO check per user session
41  */
42
43  // ----------------------------------------
44
45  /**
46   * Result type for SSO session check operation.
47   *
48   * - When status is true, sessionInformation object is provided
49   * - When status is false, shouldShowLogin flag indicates user should see login UI
50   */
51  export type SSOCheckResult =
52      | { status: true; sessionInformation: SessionInfo }
53      | { status: false; shouldShowLogin: true };
54
55  /**
56   * Checks for an existing SSO (Single Sign-On) session.
57   *
58   * This function performs the following operations:
59   * 1. Checks if the 'skipSSOCheck' flag exists in localStorage
60   * 2. If the flag is present and true, removes it and returns a failure state
61   * 3. Otherwise, attempts to authenticate via SSO by calling loginUser() without credentials
62   * 4. Returns success with session information if SSO authentication succeeds
63   * 5. Returns failure state if SSO authenticat⟪?⟫
```


========== IMG_2320.md ==========
---
photo: IMG_2320.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/check-sso.ts
lines: 43-76
orientation: 180
confidence: high
notes: |
  Breadcrumb: aqs-web-ui > src > features > auth > services > check-sso.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "check-sso.ts" (no problems badge).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (expanded) > auth.ts, check-sso.ts [selected/highlighted], utils (collapsed), middleware.ts; dashboard, form, legacy, policy, prp, root (all collapsed).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  Continuation/scroll-down of the same file from IMG_2318/IMG_2319 (lines 43-63 repeat content already seen, extending to new lines 64-76). Line 63 here is fully legible (unlike the partial cut in IMG_2319), confirming that line's tail text: "fails or has no session information".
  Line 76 is right at the bottom edge (overlapped by red "No Solution" status-bar badge) but text is legible in a zoomed crop: "console.log('SSO session active:', result.sessionInformation);".
  Image required 180° rotation (was upside down).
---

```
43  // ----------------------------------------
44
45  /**
46   * Result type for SSO session check operation.
47   *
48   * - When status is true, sessionInformation object is provided
49   * - When status is false, shouldShowLogin flag indicates user should see login UI
50   */
51  export type SSOCheckResult =
52      | { status: true; sessionInformation: SessionInfo }
53      | { status: false; shouldShowLogin: true };
54
55  /**
56   * Checks for an existing SSO (Single Sign-On) session.
57   *
58   * This function performs the following operations:
59   * 1. Checks if the 'skipSSOCheck' flag exists in localStorage
60   * 2. If the flag is present and true, removes it and returns a failure state
61   * 3. Otherwise, attempts to authenticate via SSO by calling loginUser() without credentials
62   * 4. Returns success with session information if SSO authentication succeeds
63   * 5. Returns failure state if SSO authentication fails or has no session information
64   *
65   * The skipSSOCheck flag is used when the user explicitly logs out or when SSO
66   * should be bypassed (e.g., after a manual logout to prevent immediate re-login).
67   *
68   * @returns {Promise<SSOCheckResult>} A promise that resolves to either:
69   *   - Success state with sessionInformation object if SSO session is valid
70   *   - Failure state with shouldShowLogin flag if SSO check fails or is skipped
71   *
72   * @example
73   * const result = await checkSSOSession();
74   * if (result.status) {
75   *   // SSO session found, use result.sessionInformation
76   *   console.log('SSO session active:', result.sessionInformation);
```


========== IMG_2321.md ==========
---
photo: IMG_2321.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/check-sso.ts
lines: 59-92
orientation: 180
confidence: high
notes: |
  Breadcrumb: aqs-web-ui > src > features > auth > services > check-sso.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "check-sso.ts" (no problems badge).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (expanded) > auth.ts, check-sso.ts [selected/highlighted], utils (collapsed), middleware.ts; dashboard, form, legacy, policy, prp, root (all collapsed).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  Continuation/scroll-down of the same file from IMG_2320 (lines 59-76 repeat content already seen, extending to new lines 77-92). This confirms line 76's full text (already captured in IMG_2320).
  Line 91 is blank; line 92 ("try {") is right at the bottom edge, overlapped by the red "No Solution" status-bar badge — faint in this photo but cross-confirmed against the clearer IMG_2322 (same file, next scroll position), which shows line 90 "}", line 91 blank, line 92 "try {" unambiguously.
  Image required 180° rotation (was upside down).
---

```
59  * 1. Checks if the 'skipSSOCheck' flag exists in localStorage
60  * 2. If the flag is present and true, removes it and returns a failure state
61  * 3. Otherwise, attempts to authenticate via SSO by calling loginUser() without credentials
62  * 4. Returns success with session information if SSO authentication succeeds
63  * 5. Returns failure state if SSO authentication fails or has no session information
64  *
65  * The skipSSOCheck flag is used when the user explicitly logs out or when SSO
66  * should be bypassed (e.g., after a manual logout to prevent immediate re-login).
67  *
68  * @returns {Promise<SSOCheckResult>} A promise that resolves to either:
69  *   - Success state with sessionInformation object if SSO session is valid
70  *   - Failure state with shouldShowLogin flag if SSO check fails or is skipped
71  *
72  * @example
73  * const result = await checkSSOSession();
74  * if (result.status) {
75  *   // SSO session found, use result.sessionInformation
76  *   console.log('SSO session active:', result.sessionInformation);
77  * } else {
78  *   // Show login form
79  *   console.log('SSO check failed, showing login');
80  * }
81  */
82  export async function checkSSOSession(): Promise<SSOCheckResult> {
83      // Check if we already attempted SSO and it failed
84      // This flag persists across page refreshes to avoid unnecessary API calls
85      // Only cleared when: 1) User logs in successfully, or 2) After explicit logout
86      const skipSSO = getItem<boolean>('skipSSOCheck');
87      if (skipSSO === true) {
88          console.log('[SSO Check] skipSSOCheck flag set, skipping Windows AD check');
89          return { status: false, shouldShowLogin: true };
90      }
91
92      try {
```


========== IMG_2322.md ==========
---
photo: IMG_2322.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/check-sso.ts
lines: 72-104
orientation: 180
confidence: high
notes: |
  Breadcrumb: aqs-web-ui > src > features > auth > services > check-sso.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "check-sso.ts" (no problems badge).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (expanded) > auth.ts, check-sso.ts [selected/highlighted], utils (collapsed), middleware.ts; dashboard, form, legacy, policy, prp, root (all collapsed).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  Continuation/scroll-down of the same file from IMG_2321 (lines 72-91 repeat content already seen, extending to new lines 92-104). Gutter shows a line 105 at the very bottom edge but its content is fully occluded by the taskbar/red "No Solution" badge — not transcribed.
  Image required 180° rotation (was upside down).
---

```
72  * @example
73  * const result = await checkSSOSession();
74  * if (result.status) {
75  *   // SSO session found, use result.sessionInformation
76  *   console.log('SSO session active:', result.sessionInformation);
77  * } else {
78  *   // Show login form
79  *   console.log('SSO check failed, showing login');
80  * }
81  */
82  export async function checkSSOSession(): Promise<SSOCheckResult> {
83      // Check if we already attempted SSO and it failed
84      // This flag persists across page refreshes to avoid unnecessary API calls
85      // Only cleared when: 1) User logs in successfully, or 2) After explicit logout
86      const skipSSO = getItem<boolean>('skipSSOCheck');
87      if (skipSSO === true) {
88          console.log('[SSO Check] skipSSOCheck flag set, skipping Windows AD check');
89          return { status: false, shouldShowLogin: true };
90      }
91
92      try {
93          // Attempt Windows AD SSO authentication
94          console.log('[SSO Check] Attempting Windows AD SSO authentication');
95          const loginResult = await loginUser();
96
97          // Check if login succeeded and has session information
98          if (loginResult.status && loginResult.sessionInformation) {
99              console.log('[SSO Check] Windows AD SSO successful');
100             return {
101                 status: true,
102                 sessionInformation: loginResult.sessionInformation,
103             };
104         }
```


========== IMG_2323.md ==========
---
photo: IMG_2323.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/check-sso.ts
lines: 86-118
orientation: 180
confidence: high
notes: |
  Sticky-scroll header at top shows line 82: "export async function checkSSOSession(): Promise<SSOCheckResult> {" (enclosing function for the visible viewport).
  Breadcrumb: aqs-web-ui > src > features > auth > services > check-sso.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "check-sso.ts" (no problems badge).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (expanded) > auth.ts, check-sso.ts [selected/highlighted], utils (collapsed), middleware.ts; dashboard, form, legacy, policy, prp, root (all collapsed).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  Continuation/scroll-down of the same file from IMG_2322 (lines 86-104 repeat/overlap content already seen, extending to new lines 105-118). Small yellow lightbulb quick-fix indicator visible in the gutter at line 118 (closing brace of the function).
  Image required 180° rotation (was upside down).
---

```
82  export async function checkSSOSession(): Promise<SSOCheckResult> {   (sticky-scroll header)
86      const skipSSO = getItem<boolean>('skipSSOCheck');
87      if (skipSSO === true) {
88          console.log('[SSO Check] skipSSOCheck flag set, skipping Windows AD check');
89          return { status: false, shouldShowLogin: true };
90      }
91
92      try {
93          // Attempt Windows AD SSO authentication
94          console.log('[SSO Check] Attempting Windows AD SSO authentication');
95          const loginResult = await loginUser();
96
97          // Check if login succeeded and has session information
98          if (loginResult.status && loginResult.sessionInformation) {
99              console.log('[SSO Check] Windows AD SSO successful');
100             return {
101                 status: true,
102                 sessionInformation: loginResult.sessionInformation,
103             };
104         }
105
106         // SSO authentication failed - set flag to prevent retries
107         // This flag persists in localStorage so subsequent page loads skip the SSO check
108         // Result: No API calls on refresh, instant login form render
109         console.log('[SSO Check] Windows AD SSO not available, setting skipSSOCheck flag');
110         setItem('skipSSOCheck', true);
111         return { status: false, shouldShowLogin: true };
112     } catch (error) {
113         // Log error and set flag to prevent retries
114         console.error('[SSO Check] Failed to check SSO session:', error);
115         setItem('skipSSOCheck', true);
116         return { status: false, shouldShowLogin: true };
117     }
118 }
```


========== IMG_2324.md ==========
---
photo: IMG_2324.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/check-sso.ts
lines: 97-119
orientation: 180
confidence: high
notes: |
  Sticky-scroll header at top shows line 82: "export async function checkSSOSession(): Promise<SSOCheckResult> {" (enclosing function for the visible viewport).
  Breadcrumb: aqs-web-ui > src > features > auth > services > check-sso.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "check-sso.ts" (no problems badge).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (expanded) > auth.ts, check-sso.ts [selected/highlighted], utils (collapsed), middleware.ts; dashboard, form, legacy, policy, prp, root (all collapsed).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  Same scroll position as IMG_2323, essentially identical content (lines 97-118 repeat what was already captured); the new information is line 119, which is blank — this is the end of the file (no more lines/scrollbar below, editor shows nothing past 119).
  Image required 180° rotation (was upside down).
---

```
82  export async function checkSSOSession(): Promise<SSOCheckResult> {   (sticky-scroll header)
97          // Check if login succeeded and has session information
98          if (loginResult.status && loginResult.sessionInformation) {
99              console.log('[SSO Check] Windows AD SSO successful');
100             return {
101                 status: true,
102                 sessionInformation: loginResult.sessionInformation,
103             };
104         }
105
106         // SSO authentication failed - set flag to prevent retries
107         // This flag persists in localStorage so subsequent page loads skip the SSO check
108         // Result: No API calls on refresh, instant login form render
109         console.log('[SSO Check] Windows AD SSO not available, setting skipSSOCheck flag');
110         setItem('skipSSOCheck', true);
111         return { status: false, shouldShowLogin: true };
112     } catch (error) {
113         // Log error and set flag to prevent retries
114         console.error('[SSO Check] Failed to check SSO session:', error);
115         setItem('skipSSOCheck', true);
116         return { status: false, shouldShowLogin: true };
117     }
118 }
119                                                                       (blank — end of file)
```
