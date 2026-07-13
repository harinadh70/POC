# BUNDLE for src/features/dashboard/utils/middleware.ts
# 4 photo fragment(s), ascending start-line order.


========== IMG_2357.md ==========
---
photo: IMG_2357.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/middleware.ts
lines: 1-34
orientation: 180
confidence: high
notes: New tab opened — "middleware.ts 4" (4 = problem count badge), tab bar also shows "date.tsx 9+". No sticky-scroll header (file starts at line 1, visible at top). Line 34 is cut off at the very bottom edge by the status bar; legible as "mergeNavigationContext(currentNavContext, {" but the rest of the line is not visible (marked uncertain/cut-off). Breadcrumb: aqs-web-ui > src > features > dashboard > utils > middleware.ts > .... Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > constants (theme.ts) > features > auth > services (auth.ts, check-sso.ts) > utils (action.ts, loader.ts, middleware.ts) > middleware.ts > dashboard\utils (highlighted; loader.ts and middleware.ts both visible, middleware.ts selected/open) > form, legacy, policy, prp, root, hooks, lib, pages, providers. Status bar: aqs-web-ui, branch hitanshu/experimental*, problem count changed to 29 (was 27 in loader.ts photos) / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 4:46 PM 7/10/2026. Squiggly underline visible under 'react-router' import on line 4 (import resolution warning).
---
```
1   import { navigationContext, mergeNavigationContext } from '@/context';
2   import { getItem } from '@utils/local-storage';
3   import type { SessionInfo } from '@features/auth/services/auth';
4   import type { MiddlewareFunction } from 'react-router';
5
6   // ----------------------------------------
7
8   /**
9    * Dashboard initialization middleware
10   * Sets navigation context with action='MAIN' before dataStrategy runs
11   *
12   * This ensures the cycling API is called when the dashboard route is accessed
13   * after login or SSO authentication.
14   */
15  export const dashboardInitMiddleware: MiddlewareFunction = async ({ context, request }, next) => {
16      const requestUrl = new URL(request.url);
17      const hasActionInQuery = requestUrl.searchParams.has('action');
18
19      const sessionInfo = getItem<SessionInfo>('sessionInformation');
20
21      if (sessionInfo && sessionInfo.userId) {
22          const currentNavContext = context.get(navigationContext);
23
24          // Only set if not already set (to avoid overwriting)
25          if (!currentNavContext?.cyclingCalled && !hasActionInQuery) {
26              console.log('[dashboardInitMiddleware] Setting navigation context with action=MAIN', {
27                  userId: sessionInfo.userId,
28                  compLoc: sessionInfo.compLoc,
29                  policyId: sessionInfo.policyId,
30              });
31
32              context.set(
33                  navigationContext,
34                  mergeNavigationContext(currentNavContext, {⟪?⟫
```


========== IMG_2358.md ==========
---
photo: IMG_2358.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/middleware.ts
lines: 12-17 (dup of IMG_2357), 21-34 (dup of IMG_2357), 35-47 (new)
orientation: 180
confidence: high
notes: SEVERE double-exposure/motion-blur artifact — the entire photo shows two overlapping renders of the editor offset vertically by exactly 3 code lines (gutter shows two interleaved number sequences N and N+3 at every row throughout the photo, e.g. "39"/"42", "34"/"31"), consistent with the camera catching the screen mid a 3-line scroll animation. This is NOT two different files — both traces are the same static middleware.ts scrolled ~3 lines apart, so the two traces were cross-referenced against each other and against IMG_2357 to reconstruct a single coherent line sequence. Lines 12-17 and 21-34 duplicate IMG_2357's clean (non-blurred) reading exactly and are NOT re-transcribed here — see IMG_2357 for that range (this photo also newly confirms IMG_2357's line 34 is complete: "mergeNavigationContext(currentNavContext, {" with no truncation). Lines 35-46 are NEW (beyond IMG_2357's cutoff) and were reconstructed from the ghosted double-image; individual field values are legible but exact line-number placement carries some uncertainty — recommend verifying against a clean re-shoot if precision matters. Line 47's string literal is cut off at the right edge of the screen/photo after "skipping" — confirmed by IMG_2359 (clean, unblurred photo of the same file, lines 28-60) to continue as "...skipping'," followed by a details object on lines 48-53. IMG_2359 also confirms the entire lines 35-46 reconstruction here is byte-for-byte correct. Tab/breadcrumb/sidebar/status-bar unchanged from IMG_2357 (middleware.ts active, 29 problems, hitanshu/experimental*).
---
```
12  * This ensures the cycling API is called when the dashboard route is accessed
13  * after login or SSO authentication.
14  */
15  export const dashboardInitMiddleware: MiddlewareFunction = async ({ context, request }, next) => {
16      const requestUrl = new URL(request.url);
17      const hasActionInQuery = requestUrl.searchParams.has('action');
    ⟪... lines 18-31 consistent with IMG_2357 (sessionInfo, if-block, currentNavContext, comment, nested if, console.log w/ userId/compLoc/policyId) — not re-transcribed, see IMG_2357 ...⟫
32      context.set(
33          navigationContext,
34          mergeNavigationContext(currentNavContext, {
35              action: 'MAIN',
36              nodeKey: sessionInfo.nodeKey || null,
37              xmlDetail: ''⟪?⟫,
38              tab: null,
39              userId: sessionInfo.userId,
40              compLoc: sessionInfo.compLoc,
41              policyId: sessionInfo.policyId || '0',
42              cyclingCalled: false,
43          }),
44      );
45  } else {
46      console.log(
47          '[dashboardInitMiddleware] Navigation context already set or action provided in URL, skipping⟪?⟫
```


========== IMG_2359.md ==========
---
photo: IMG_2359.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/middleware.ts
lines: 15, 28-60
orientation: 180
confidence: high
notes: Clean/sharp photo (no motion blur, unlike IMG_2358). Line 15 is sticky-scroll header. Confirms IMG_2358's reconstructed lines 28-46 exactly (cross-validates the double-exposure reconstruction there). New content: lines 47-60, completing the console.log call (object with currentAction/cyclingCalled/hasActionInQuery), the outer else branch (no session info), and "await next();" closing the middleware, ending at line 60 "};" (partially cut by scrollbar at very bottom but legible). Breadcrumb: aqs-web-ui > src > features > dashboard > utils > middleware.ts > .... Tabs: "date.tsx 9+" and active "middleware.ts 4". Explorer: dashboard\utils expanded showing loader.ts and middleware.ts (middleware.ts selected). Status bar: aqs-web-ui, branch hitanshu/experimental*, 29 problems / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 4:46 PM 7/10/2026.
---
```
15  export const dashboardInitMiddleware: MiddlewareFunction = async ({ context, request }, next) => {
28              compLoc: sessionInfo.compLoc,
29              policyId: sessionInfo.policyId,
30          });
31
32          context.set(
33              navigationContext,
34              mergeNavigationContext(currentNavContext, {
35                  action: 'MAIN',
36                  nodeKey: sessionInfo.nodeKey || null,
37                  xmlDetail: '',
38                  tab: null,
39                  userId: sessionInfo.userId,
40                  compLoc: sessionInfo.compLoc,
41                  policyId: sessionInfo.policyId || '0',
42                  cyclingCalled: false,
43              }),
44          );
45      } else {
46          console.log(
47              '[dashboardInitMiddleware] Navigation context already set or action provided in URL, skipping',
48              {
49                  currentAction: currentNavContext?.action,
50                  cyclingCalled: currentNavContext?.cyclingCalled,
51                  hasActionInQuery,
52              },
53          );
54      }
55  } else {
56      console.warn('[dashboardInitMiddleware] No session information found in localStorage');
57  }
58
59  await next();
60  };
```


========== IMG_2360.md ==========
---
photo: IMG_2360.JPG
type: vscode-code
file: aqs-web-ui/src/features/dashboard/utils/middleware.ts
lines: 15, 41(partial)-61
orientation: 180
confidence: high
notes: Duplicate/near-duplicate of IMG_2359 content, scrolled slightly; confirms file ends at line 60 "};" with a trailing blank line 61 — middleware.ts is 61 lines total. No new code beyond IMG_2359. Line 41 ("policyId: sessionInfo.policyId || '0',") is partially obscured behind the sticky-scroll header band but its ghosted text is still legible. Timestamp advanced to 4:47 PM (vs 4:46 PM in prior photos), so ~1 minute elapsed. Mouse cursor now hovering over "form" folder in Explorer sidebar (not clicked/expanded). Sidebar otherwise same: dashboard\utils expanded with loader.ts and middleware.ts (middleware.ts selected/highlighted). Breadcrumb: aqs-web-ui > src > features > dashboard > utils > middleware.ts > .... Tabs: "date.tsx 9+" and active "middleware.ts 4". Status bar: aqs-web-ui, branch hitanshu/experimental*, 29 problems / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 4:47 PM 7/10/2026.
---
```
15  export const dashboardInitMiddleware: MiddlewareFunction = async ({ context, request }, next) => {
41              policyId: sessionInfo.policyId || '0',
42              cyclingCalled: false,
43          }),
44      );
45      } else {
46          console.log(
47              '[dashboardInitMiddleware] Navigation context already set or action provided in URL, skipping',
48              {
49                  currentAction: currentNavContext?.action,
50                  cyclingCalled: currentNavContext?.cyclingCalled,
51                  hasActionInQuery,
52              },
53          );
54      }
55  } else {
56      console.warn('[dashboardInitMiddleware] No session information found in localStorage');
57  }
58
59  await next();
60  };
61
```
