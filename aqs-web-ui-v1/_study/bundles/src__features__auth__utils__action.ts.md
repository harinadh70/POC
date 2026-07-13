# BUNDLE for src/features/auth/utils/action.ts
# 5 photo fragment(s), ascending start-line order.


========== IMG_2325.md ==========
---
photo: IMG_2325.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/utils/action.ts
lines: 1-34
orientation: 180
confidence: high
notes: |
  Breadcrumb: aqs-web-ui > src > features > auth > utils > action.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "action.ts" (italic, likely preview tab) with "2" (problems count badge on tab).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (auth.ts, check-sso.ts listed), utils (expanded) > action.ts [selected/highlighted, "2"], loader.ts, middleware.ts; auth > middleware.ts (sibling of services/utils); dashboard, form, legacy (all collapsed, legacy cut off at bottom).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  Squiggly underline (red, likely unused-import or lint warning) visible under 'react-router' string on line 11.
  Line 34 is fully cut off at the bottom edge (only the line number is visible, no content legible).
  Image required 180° rotation (was upside down).
---

```
1   import { data, redirect } from 'react-router';
2   import { loginUser, logoutUser } from '../services/auth';
3
4   // utils
5   import { removeItem, setItem } from '@utils/local-storage';
6   import { clearMenuData } from '@utils/menu-persistence';
7   import { clearSessionStorage } from '@utils/session-storage';
8   import { clearPermissions } from '@utils/permission-store';
9
10  // types
11  import type { ActionFunctionArgs } from 'react-router';
12
13  // ----------------------------------------
14
15  export async function clientLoginAction({ request }: ActionFunctionArgs) {
16      const formData = await request.formData();
17      const username = formData.get('username') as string;
18      const password = formData.get('password') as string;
19
20      // 1. Validate the user / Call your Backend API here
21      const result = await loginUser(username as string, password as string);
22      if (!result.status) {
23          // We return 'data' so the component can access it via useActionData
24          return data({ error: 'Login Failed. Please try again.' }, { status: 401 });
25      }
26
27      // Store sessionInformation in localStorage for client-side access
28      if (result.sessionInformation) {
29          setItem('sessionInformation', result.sessionInformation);
30
31          // Clear skipSSOCheck flag now that user has successfully logged in
32          // This allows SSO check to run again on next page load (in case user gets AD session later)
33          removeItem('skipSSOCheck');
34
```


========== IMG_2326.md ==========
---
photo: IMG_2326.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/utils/action.ts
lines: 14-47
orientation: 180
confidence: high
notes: |
  Breadcrumb: aqs-web-ui > src > features > auth > utils > action.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "action.ts" (italic, likely preview tab) with "2" (problems count badge on tab).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (expanded: auth.ts, check-sso.ts), utils (expanded) > action.ts [selected/highlighted, "2"], loader.ts, middleware.ts; auth > middleware.ts (sibling of services/utils); dashboard, form, legacy (all collapsed, legacy cut off at bottom).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  Continuation/scroll-down of the same file from IMG_2325 (lines 14-33 repeat content already seen, extending to new lines 34-47). Underline squiggles (lint) visible under "legacy" and "ExecuteAction" in the comment on line 44.
  Line 47 is blank at the very bottom edge, possibly end of file (no further scrollbar content visible).
  Image required 180° rotation (was upside down).
---

```
14
15  export async function clientLoginAction({ request }: ActionFunctionArgs) {
16      const formData = await request.formData();
17      const username = formData.get('username') as string;
18      const password = formData.get('password') as string;
19
20      // 1. Validate the user / Call your Backend API here
21      const result = await loginUser(username as string, password as string);
22      if (!result.status) {
23          // We return 'data' so the component can access it via useActionData
24          return data({ error: 'Login Failed. Please try again.' }, { status: 401 });
25      }
26
27      // Store sessionInformation in localStorage for client-side access
28      if (result.sessionInformation) {
29          setItem('sessionInformation', result.sessionInformation);
30
31          // Clear skipSSOCheck flag now that user has successfully logged in
32          // This allows SSO check to run again on next page load (in case user gets AD session later)
33          removeItem('skipSSOCheck');
34
35          console.log('[clientLoginAction] Login successful, redirecting to root', {
36              userId: result.sessionInformation.userId,
37              compLoc: result.sessionInformation.compLoc,
38              policyId: result.sessionInformation.policyId,
39          });
40
41          // NOTE: Redirect to root route first to trigger MENU loading
42          // Flow: root → rootMenuMiddleware sets action='MENU' → dataStrategy calls API
43          // Then Root useEffect cascades to dashboard → action='MAIN'
44          // This matches legacy ExecuteAction serial initialization pattern
45          return redirect('/');
46      }
47
```


========== IMG_2328.md ==========
---
photo: IMG_2328.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/utils/action.ts
lines: 15-76
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 15 (enclosing function signature), then editor jumps to line 44 — lines 16-43 are not visible/hidden behind sticky scroll. Tab bar shows "date.tsx 9+" and active tab "action.ts 2" (2 = problem count badge on tab). Breadcrumb: aqs-web-ui > src > features > auth > utils > action.ts. Explorer sidebar (expanded): AQS_WORKSPACE > aqs-web-ui > src > components > text.tsx, textarea.tsx, XmlList.tsx(U) > config > action-config.ts, db.json > constants > asp-route-map.ts, button-matchcodes.ts, theme.ts > features > auth > services > auth.ts, check-sso.ts > utils > action.ts (highlighted/selected, badge "2"), loader.ts, middleware.ts > (features) middleware.ts > dashboard, form, legacy (partially visible). Status bar: aqs-web-ui, branch "hitanshu/experimental*", 27 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Date/time overlay 4:45 PM 7/10/2026. Line 76 is cut off at bottom by the status bar / "No Solution" banner, content not legible. removeItem(...) calls at lines 71-72 have no "localStorage." prefix — likely destructured/imported utility functions.
---
15: export async function clientLoginAction({ request }: ActionFunctionArgs) {
   [sticky-scroll header; editor body resumes at line 44]
44:     // This matches legacy ExecuteAction serial initialization pattern
45:     return redirect('/');
46: }
47:
48:     return data({ error: 'Failed to login due to missing session information.' }, { status: 401 });
49: }
50:
51: export async function clientLogoutAction() {
52:     const result = await logoutUser();
53:
54:     if (!result) {
55:         return data({ error: 'Logout failed.' });
56:     }
57:
58:     const sessionInfo = localStorage.getItem('sessionInformation');
59:     if (sessionInfo) {
60:         try {
61:             const parsed = JSON.parse(sessionInfo) as { userId?: string; compLoc?: string };
62:             if (parsed.userId && parsed.compLoc) {
63:                 clearMenuData(parsed.userId, parsed.compLoc);
64:             }
65:         } catch (error) {
66:             console.error('[clientLogoutAction] Failed to parse session information', error);
67:         }
68:     }
69:
70:     // Remove sessionInformation and cached permissions from localStorage on logout
71:     removeItem('sessionInformation');
72:     removeItem('permissionSnapshot');
73:
74:     // Clear in-memory permission cache to prevent stale data
75:     clearPermissions();
76: ⟪?⟫ (line cut off by status bar, not legible)


========== IMG_2327.md ==========
---
photo: IMG_2327.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/utils/action.ts
lines: 31-63
orientation: 180
confidence: high
notes: |
  Sticky-scroll header at top shows line 15: "export async function clientLoginAction({ request }: ActionFunctionArgs) {" (enclosing function for the top of the visible viewport).
  Breadcrumb: aqs-web-ui > src > features > auth > utils > action.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "action.ts" (italic, likely preview tab) with "2" (problems count badge on tab).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (expanded: auth.ts, check-sso.ts), utils (expanded) > action.ts [selected/highlighted, "2"], loader.ts, middleware.ts; auth > middleware.ts (sibling of services/utils); dashboard, form, legacy (all collapsed, legacy cut off at bottom).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  Continuation/scroll-down of the same file from IMG_2326 (lines 31-46 repeat content already seen, extending to new lines 47-63). This confirms the arrow character (→) used in the flow comments on lines 42-43.
  Line 63 is cut off at the very bottom edge (only the top sliver of the glyphs is visible, overlapped by the red "No Solution" badge); reads as "clearMenuData(parsed.userId, parsed.compLoc)" cross-referenced against the `clearMenuData` import on line 6 of this file (captured in IMG_2325), but the exact trailing punctuation is not legible.
  Image required 180° rotation (was upside down).
---

```
15  export async function clientLoginAction({ request }: ActionFunctionArgs) {   (sticky-scroll header)
31          // Clear skipSSOCheck flag now that user has successfully logged in
32          // This allows SSO check to run again on next page load (in case user gets AD session later)
33          removeItem('skipSSOCheck');
34
35          console.log('[clientLoginAction] Login successful, redirecting to root', {
36              userId: result.sessionInformation.userId,
37              compLoc: result.sessionInformation.compLoc,
38              policyId: result.sessionInformation.policyId,
39          });
40
41          // NOTE: Redirect to root route first to trigger MENU loading
42          // Flow: root → rootMenuMiddleware sets action='MENU' → dataStrategy calls API
43          // Then Root useEffect cascades to dashboard → action='MAIN'
44          // This matches legacy ExecuteAction serial initialization pattern
45          return redirect('/');
46      }
47
48      return data({ error: 'Failed to login due to missing session information.' }, { status: 401 });
49  }
50
51  export async function clientLogoutAction() {
52      const result = await logoutUser();
53
54      if (!result) {
55          return data({ error: 'Logout failed.' });
56      }
57
58      const sessionInfo = localStorage.getItem('sessionInformation');
59      if (sessionInfo) {
60          try {
61              const parsed = JSON.parse(sessionInfo) as { userId?: string; compLoc?: string };
62              if (parsed.userId && parsed.compLoc) {
63                  clearMenuData(parsed.userId, parsed.compLoc)⟪?⟫
```


========== IMG_2329.md ==========
---
photo: IMG_2329.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/utils/action.ts
lines: 51-87
orientation: 180
confidence: high
notes: Same file/tab as IMG_2328 (action.ts), scrolled down. Sticky-scroll header shows line 51 (export async function clientLogoutAction() {); lines 52-56 hidden behind sticky header, line 57 (blank) barely peeking through the sticky-scroll divider. Body resumes fully at line 58 and runs to line 87 (closing brace of clientLogoutAction). Explorer sidebar same as IMG_2328: action.ts highlighted under features > auth > utils, siblings loader.ts, middleware.ts. Tab bar: date.tsx 9+, active action.ts 2. Status bar: aqs-web-ui, hitanshu/experimental*, 27 errors/0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Time overlay 4:45 PM 7/10/2026. This photo completes the tail of clientLogoutAction that was cut off in IMG_2328 (line 76 onward).
---
51: export async function clientLogoutAction() {
   [sticky-scroll header; lines 52-56 hidden]
57:
58:     const sessionInfo = localStorage.getItem('sessionInformation');
59:     if (sessionInfo) {
60:         try {
61:             const parsed = JSON.parse(sessionInfo) as { userId?: string; compLoc?: string };
62:             if (parsed.userId && parsed.compLoc) {
63:                 clearMenuData(parsed.userId, parsed.compLoc);
64:             }
65:         } catch (error) {
66:             console.error('[clientLogoutAction] Failed to parse session information', error);
67:         }
68:     }
69:
70:     // Remove sessionInformation and cached permissions from localStorage on logout
71:     removeItem('sessionInformation');
72:     removeItem('permissionSnapshot');
73:
74:     // Clear in-memory permission cache to prevent stale data
75:     clearPermissions();
76:
77:     // Clear ALL sessionStorage keys so global variables and cached per-session values do not leak across use
78:     clearSessionStorage();
79:
80:     // Set flag to skip SSO check after logout
81:     // Prevents immediate Windows AD re-authentication when user explicitly logged out
82:     setItem('skipSSOCheck', true);
83:
84:     // Redirect to login page
85:     return redirect('/login');
86: }
87:
