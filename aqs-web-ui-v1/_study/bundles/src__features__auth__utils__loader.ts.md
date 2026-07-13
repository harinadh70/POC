# BUNDLE for src/features/auth/utils/loader.ts
# 6 photo fragment(s), ascending start-line order.


========== IMG_2330.md ==========
---
photo: IMG_2330.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/utils/loader.ts
lines: 1-34
orientation: 180
confidence: high
notes: New tab opened "loader.ts 1" (1 = problem count badge), next to "date.tsx 9+". Breadcrumb aqs-web-ui > src > features > auth > utils > loader.ts. Explorer sidebar: loader.ts highlighted/selected under features > auth > utils, siblings action.ts and middleware.ts. Status bar: aqs-web-ui, hitanshu/experimental*, 26 errors / 0 warnings (down from 27 in IMG_2328/2329), No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Time overlay 4:45 PM 7/10/2026. Line 34 is the last visible line, partially cut off at the very bottom edge by status bar but text is legible via zoom.
---
1: import { data, redirect } from 'react-router';
2:
3: // services
4: import { checkSSOSession } from '../services/check-sso';
5: import { type SessionInfo } from '../services/auth';
6:
7: // utils
8: import { setItem, getItem } from '@utils/local-storage';
9:
10: // ----------------------------------------
11:
12: /**
13:  * Loader function for the login route.
14:  *
15:  * Checks if the user is already authenticated via SSO before rendering the login form.
16:  * If SSO authentication is successful, stores the session information and redirects
17:  * to the appropriate dashboard page. If SSO fails or is skipped, allows the login
18:  * form to render.
19:  *
20:  * @param {LoaderFunctionArgs} args - React Router loader arguments
21:  * @returns Either a redirect to the dashboard or data(null) to render login
22:  *
23:  * @example
24:  * // In route configuration:
25:  * {
26:  *   path: '/login',
27:  *   loader: clientLoginLoader,
28:  *   element: <LoginPage />
29:  * }
30:  */
31: export async function clientLoginLoader() {
32:     try {
33:         // Check if there's already a valid session in localStorage
34:         const existingSession = getItem<SessionInfo>('sessionInformation');


========== IMG_2331.md ==========
---
photo: IMG_2331.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/utils/loader.ts
lines: 9-42
orientation: 180
confidence: high
notes: Same file/tab as IMG_2330 (loader.ts), scrolled down slightly. Explorer sidebar unchanged: loader.ts highlighted under features > auth > utils, siblings action.ts, middleware.ts. Status bar: aqs-web-ui, hitanshu/experimental*, 26 errors/0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Time overlay 4:46 PM 7/10/2026. Line 42 is a comment cut off/occluded by the status bar at the very bottom edge; reconstructed from partial visibility (confidence medium for that single line only, rest high).
---
9:
10: // ----------------------------------------
11:
12: /**
13:  * Loader function for the login route.
14:  *
15:  * Checks if the user is already authenticated via SSO before rendering the login form.
16:  * If SSO authentication is successful, stores the session information and redirects
17:  * to the appropriate dashboard page. If SSO fails or is skipped, allows the login
18:  * form to render.
19:  *
20:  * @param {LoaderFunctionArgs} args - React Router loader arguments
21:  * @returns Either a redirect to the dashboard or data(null) to render login
22:  *
23:  * @example
24:  * // In route configuration:
25:  * {
26:  *   path: '/login',
27:  *   loader: clientLoginLoader,
28:  *   element: <LoginPage />
29:  * }
30:  */
31: export async function clientLoginLoader() {
32:     try {
33:         // Check if there's already a valid session in localStorage
34:         const existingSession = getItem<SessionInfo>('sessionInformation');
35:         if (existingSession && existingSession.userId) {
36:             // User already has a session, redirect to root to trigger MENU load
37:             // rootMenuMiddleware will set action='MENU' → then cascade to dashboard
38:             console.log('[clientLoginLoader] Existing session found, redirecting to root');
39:             return redirect('/');
40:         }
41:
42:         // Check if skipSSOCheck flag is set (from 401 interceptor or manual logout) ⟪?⟫


========== IMG_2332.md ==========
---
photo: IMG_2332.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/utils/loader.ts
lines: 25-57
orientation: 180
confidence: high
notes: Same file/tab as IMG_2330/2331 (loader.ts), scrolled further down. Explorer sidebar unchanged: loader.ts highlighted under features > auth > utils, siblings action.ts, middleware.ts. Status bar: aqs-web-ui, hitanshu/experimental*, 26 errors/0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Time overlay 4:46 PM 7/10/2026. Line 57 is cut off by the status bar at the very bottom edge; appears blank (no visible code) but not fully confirmed.
---
25:  * {
26:  *   path: '/login',
27:  *   loader: clientLoginLoader,
28:  *   element: <LoginPage />
29:  * }
30:  */
31: export async function clientLoginLoader() {
32:     try {
33:         // Check if there's already a valid session in localStorage
34:         const existingSession = getItem<SessionInfo>('sessionInformation');
35:         if (existingSession && existingSession.userId) {
36:             // User already has a session, redirect to root to trigger MENU load
37:             // rootMenuMiddleware will set action='MENU' → then cascade to dashboard
38:             console.log('[clientLoginLoader] Existing session found, redirecting to root');
39:             return redirect('/');
40:         }
41:
42:         // Check if skipSSOCheck flag is set (from 401 interceptor or manual logout)
43:         const skipSSO = getItem<boolean>('skipSSOCheck');
44:         if (skipSSO === true) {
45:             // Don't remove flag yet - keep it for manual login attempt
46:             console.log('[clientLoginLoader] skipSSOCheck flag detected, rendering login form');
47:             return data(null);
48:         }
49:
50:         // No session and no skip flag - attempt SSO authentication
51:         const ssoResult = await checkSSOSession();
52:
53:         // If SSO authentication was successful
54:         if (ssoResult.status === true && ssoResult.sessionInformation) {
55:             // Store session information in localStorage for subsequent requests
56:             const stored = setItem('sessionInformation', ssoResult.sessionInformation);
57: ⟪?⟫ (blank line or cut off by status bar, not legible)


========== IMG_2333.md ==========
---
photo: IMG_2333.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/utils/loader.ts
lines: 31-70
orientation: 180
confidence: high
notes: Same file/tab as IMG_2330-2332 (loader.ts), scrolled further down. Sticky-scroll header shows line 31 (export async function clientLoginLoader() {); lines 32-38 hidden behind sticky header, body resumes fully at line 39. Explorer sidebar unchanged: loader.ts highlighted under features > auth > utils, siblings action.ts, middleware.ts. Status bar: aqs-web-ui, hitanshu/experimental*, 26 errors/0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Time overlay 4:46 PM 7/10/2026. Line 70 ("});") is the last fully visible line at the bottom edge; content beyond not visible in this photo.
---
31: export async function clientLoginLoader() {
   [sticky-scroll header; lines 32-38 hidden]
39:         return redirect('/');
40:     }
41:
42:         // Check if skipSSOCheck flag is set (from 401 interceptor or manual logout)
43:         const skipSSO = getItem<boolean>('skipSSOCheck');
44:         if (skipSSO === true) {
45:             // Don't remove flag yet - keep it for manual login attempt
46:             console.log('[clientLoginLoader] skipSSOCheck flag detected, rendering login form');
47:             return data(null);
48:         }
49:
50:         // No session and no skip flag - attempt SSO authentication
51:         const ssoResult = await checkSSOSession();
52:
53:         // If SSO authentication was successful
54:         if (ssoResult.status === true && ssoResult.sessionInformation) {
55:             // Store session information in localStorage for subsequent requests
56:             const stored = setItem('sessionInformation', ssoResult.sessionInformation);
57:
58:             if (!stored) {
59:                 console.error(
60:                     '[clientLoginLoader] Failed to store session information in localStorage',
61:                 );
62:                 return data(null);
63:             }
64:
65:             // SSO successful - redirect to root to trigger MENU load first
66:             console.log('[clientLoginLoader] SSO successful, redirecting to root', {
67:                 userId: ssoResult.sessionInformation.userId,
68:                 compLoc: ssoResult.sessionInformation.compLoc,
69:                 policyId: ssoResult.sessionInformation.policyId,
70:             });


========== IMG_2334.md ==========
---
photo: IMG_2334.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/utils/loader.ts
lines: 31-81
orientation: 180
confidence: high
notes: Same file/tab as IMG_2330-2333 (loader.ts), scrolled further down; overlaps and extends IMG_2333. Sticky-scroll header shows line 31 (export async function clientLoginLoader() {); line 49 (blank) barely peeking through sticky divider, body resumes fully at line 50 and runs to line 81 ("} catch (error) {" at the bottom edge, start of the catch block). Explorer sidebar unchanged: loader.ts highlighted under features > auth > utils. Status bar: aqs-web-ui, hitanshu/experimental*, 26 errors/0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Time overlay 4:46 PM 7/10/2026.
---
31: export async function clientLoginLoader() {
   [sticky-scroll header; lines 32-48 hidden]
49:
50:         // No session and no skip flag - attempt SSO authentication
51:         const ssoResult = await checkSSOSession();
52:
53:         // If SSO authentication was successful
54:         if (ssoResult.status === true && ssoResult.sessionInformation) {
55:             // Store session information in localStorage for subsequent requests
56:             const stored = setItem('sessionInformation', ssoResult.sessionInformation);
57:
58:             if (!stored) {
59:                 console.error(
60:                     '[clientLoginLoader] Failed to store session information in localStorage',
61:                 );
62:                 return data(null);
63:             }
64:
65:             // SSO successful - redirect to root to trigger MENU load first
66:             console.log('[clientLoginLoader] SSO successful, redirecting to root', {
67:                 userId: ssoResult.sessionInformation.userId,
68:                 compLoc: ssoResult.sessionInformation.compLoc,
69:                 policyId: ssoResult.sessionInformation.policyId,
70:             });
71:
72:             // NOTE: Redirect to root route first to trigger MENU loading
73:             // Flow: root → rootMenuMiddleware sets action='MENU' → dataStrategy calls API
74:             // Then Root useEffect cascades to dashboard → action='MAIN'
75:             return redirect('/');
76:         }
77:
78:         // SSO failed or skipSSOCheck was set - allow login form to render
79:         console.log('[clientLoginLoader] SSO not available or skipped, rendering login form');
80:         return data(null);
81:     } catch (error) {


========== IMG_2335.md ==========
---
photo: IMG_2335.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/utils/loader.ts
lines: 62-87
orientation: 180
confidence: high
notes: Same file/tab as IMG_2330-2334 (loader.ts), scrolled to the end of the file (line 87 is the last line, blank, EOF). Sticky-scroll header shows line 31 (export async function clientLoginLoader() {); line 62 mostly hidden behind sticky header (only "return data(null);" faintly visible at the very top edge), body resumes fully at line 63. This photo completes the tail of clientLoginLoader/catch block that continued from IMG_2334. Explorer sidebar unchanged: loader.ts highlighted under features > auth > utils. Status bar: aqs-web-ui, hitanshu/experimental*, 26 errors/0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Time overlay 4:46 PM 7/10/2026.
---
31: export async function clientLoginLoader() {
   [sticky-scroll header; line 62 "return data(null);" barely visible beneath]
63:         }
64:
65:             // SSO successful - redirect to root to trigger MENU load first
66:             console.log('[clientLoginLoader] SSO successful, redirecting to root', {
67:                 userId: ssoResult.sessionInformation.userId,
68:                 compLoc: ssoResult.sessionInformation.compLoc,
69:                 policyId: ssoResult.sessionInformation.policyId,
70:             });
71:
72:             // NOTE: Redirect to root route first to trigger MENU loading
73:             // Flow: root → rootMenuMiddleware sets action='MENU' → dataStrategy calls API
74:             // Then Root useEffect cascades to dashboard → action='MAIN'
75:             return redirect('/');
76:         }
77:
78:         // SSO failed or skipSSOCheck was set - allow login form to render
79:         console.log('[clientLoginLoader] SSO not available or skipped, rendering login form');
80:         return data(null);
81:     } catch (error) {
82:         // Log error and allow login form to render as fallback
83:         console.error('[clientLoginLoader] Error during SSO check:', error);
84:         return data(null);
85:     }
86: }
87:
