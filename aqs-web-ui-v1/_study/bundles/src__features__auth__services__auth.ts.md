# BUNDLE for src/features/auth/services/auth.ts
# 11 photo fragment(s), ascending start-line order.


========== IMG_2306.md ==========
---
photo: IMG_2306.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/auth.ts
lines: 1-34
orientation: 180
confidence: high
notes: |
  Breadcrumb: aqs-web-ui > src > features > auth > services > auth.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "auth.ts" with "2" (problems count badge on tab).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, partially cut off at top: ...sub-header.tsx cut, text.tsx, textarea.tsx, XmlList.tsx [U]), config (expanded: action-config.ts, db.json), constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts), features (expanded) > auth (expanded) > services (expanded) > auth.ts [selected/highlighted, "2"], check-sso.ts, utils (collapsed), middleware.ts; dashboard, form, legacy, policy, prp, root (all collapsed, not expanded).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Line 34 (JSDoc comment continuation) is cut off at the bottom of the screen by the taskbar — only "* Attempts to retrieve the user data from the server. If the request fails due to an unauthorized error (HTT" is visible; rest of the line and any further lines are not visible in this photo.
  Image required 180° rotation (was upside down).
---

```
1   import { z } from 'zod';
2   import { baseQuery } from '@/utils/http-instance';
3
4   // utils
5   import isEmpty from 'lodash-es/isEmpty';
6
7   // types
8   import type { User } from '@/types';
9
10  // ---------------------------------------
11
12  export const LoginResponseSchema = z.object({
13      statusCode: z.number(),
14      statusMessage: z.string(),
15      token: z.string().optional(), // optional because failed login may not include it
16      sessioninformation: z
17          .object({
18              compLoc: z.string(),
19              userId: z.string(),
20              policyId: z.string(),
21              nodeKey: z.string(),
22              action: z.string(),
23              diagnosticMode: z.string(),
24          })
25          .optional(),
26  });
27
28  export type LoginResponse = z.infer<typeof LoginResponseSchema>;
29  export type SessionInfo = NonNullable<LoginResponse['sessioninformation']>;
30
31  /**
32   * Fetches the authenticated user's information based on the current session.
33   *
34   * Attempts to retrieve the user data from the server. If the request fails due to an unauthorized error (HTT⟪?⟫
```

Line 34 cut off at bottom edge of screen (taskbar occludes rest of line and any subsequent lines).


========== IMG_2307.md ==========
---
photo: IMG_2307.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/auth.ts
lines: 12-47
orientation: 180
confidence: high
notes: |
  Same file as IMG_2306 (auth.ts), scrolled further down. Lines 13-14 (statusCode, statusMessage) are hidden behind sticky-scroll header for line 12 — not re-transcribed here but already captured in IMG_2306.
  Breadcrumb: aqs-web-ui > src > features > auth > services > auth.ts > ...
  Tab bar: "date.tsx 9+" (dimmed, other group) and active tab "auth.ts" with problems badge "2".
  Explorer sidebar: components (expanded, top partially cut off: text.tsx, textarea.tsx, XmlList.tsx [U]), config (expanded: action-config.ts, db.json), constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts), features > auth > services > auth.ts [selected, "2"], check-sso.ts, utils (collapsed), middleware.ts; dashboard, form, legacy, policy, prp, root (collapsed).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Line 47 has a grey text-selection/highlight background over part of it (likely search match or selection), text still fully legible.
  Image required 180° rotation (was upside down).
---

Sticky scroll (enclosing scope, not part of visible range but shown at top):
```
12  export const LoginResponseSchema = z.object({
```

Visible code:
```
15      token: z.string().optional(), // optional because failed login may not include it
16      sessioninformation: z
17          .object({
18              compLoc: z.string(),
19              userId: z.string(),
20              policyId: z.string(),
21              nodeKey: z.string(),
22              action: z.string(),
23              diagnosticMode: z.string(),
24          })
25          .optional(),
26  });
27
28  export type LoginResponse = z.infer<typeof LoginResponseSchema>;
29  export type SessionInfo = NonNullable<LoginResponse['sessioninformation']>;
30
31  /**
32   * Fetches the authenticated user's information based on the current session.
33   *
34   * Attempts to retrieve the user data from the server. If the request fails due to an unauthorized error (HTT
35   * it tries to refresh the authentication session and retries fetching the user data once more.
36   * If the refresh or the second fetch fails, or if any other error occurs, it returns `null`.
37   *
38   * @returns {Promise<User | null>} A promise that resolves to the authenticated user object if successful, or
39   */
40  export async function fetchAuthenticatedUserBySession(): Promise<User | null> {
41      try {
42          // 1. Try fetching the authenticated user
43          const user = await baseQuery<User>({ url: '/users/1', method: 'GET' });
44          return user;
45      } catch (err) {
46          // 2. If unauthorized → try refresh
47          const error = err as { status: number };
```

Note: line 34 still shows "(HTT" cut at the right edge of the editor pane (word wraps/truncates identically to IMG_2306; full continuation not visible in either photo). Line 38 similarly appears to truncate at "or" at right edge.


========== IMG_2308.md ==========
---
photo: IMG_2308.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/auth.ts
lines: 30-63
orientation: 180
confidence: high
notes: |
  Same file as IMG_2306/IMG_2307 (auth.ts), scrolled further down; shows the full body of fetchAuthenticatedUserBySession() and the start of the next JSDoc block.
  Breadcrumb: aqs-web-ui > src > features > auth > services > auth.ts > ...
  Tab bar: "date.tsx 9+" (dimmed, other group) and active tab "auth.ts" with problems badge "2".
  Explorer sidebar unchanged from IMG_2307 (auth.ts selected/highlighted, "2").
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Line 63 is almost entirely occluded by the bottom taskbar/"No Solution" badge; only "/**" is visible, marking the start of a new JSDoc comment block after the function ends at line 61.
  Line 34 again shows the comment truncated at "(HTT" at the right edge (same as IMG_2306/2307) — full text still not visible in any photo.
  Image required 180° rotation (was upside down).
---

```
30
31  /**
32   * Fetches the authenticated user's information based on the current session.
33   *
34   * Attempts to retrieve the user data from the server. If the request fails due to an unauthorized error (HTT
35   * it tries to refresh the authentication session and retries fetching the user data once more.
36   * If the refresh or the second fetch fails, or if any other error occurs, it returns `null`.
37   *
38   * @returns {Promise<User | null>} A promise that resolves to the authenticated user object if successful, or
39   */
40  export async function fetchAuthenticatedUserBySession(): Promise<User | null> {
41      try {
42          // 1. Try fetching the authenticated user
43          const user = await baseQuery<User>({ url: '/users/1', method: 'GET' });
44          return user;
45      } catch (err) {
46          // 2. If unauthorized → try refresh
47          const error = err as { status: number };
48          if (error.status === 401) {
49              try {
50                  // 3. Retry fetching user after refresh
51                  await baseQuery({ url: '/auth/refresh', method: 'POST' });
52                  const user = await baseQuery<User>({ url: '/users/1', method: 'GET' });
53                  return user;
54              } catch {
55                  return null;
56              }
57          }
58          // Other errors → treat as unauthenticated
59          return null;
60      }
61  }
62
63  /**⟪?⟫
```

Line 63: only "/**" visible; rest of line/content below occluded by taskbar.


========== IMG_2309.md ==========
---
photo: IMG_2309.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/auth.ts
lines: 38-71
orientation: 180
confidence: high
notes: |
  Same file (auth.ts), scrolled further down; shows end of fetchAuthenticatedUserBySession() (repeat of IMG_2308 content, lines 38-61) plus new JSDoc block for a validateUser-like login function starting at line 63.
  Breadcrumb: aqs-web-ui > src > features > auth > services > auth.ts > ...
  Tab bar: "date.tsx 9+" (dimmed) and active tab "auth.ts" with problems badge "2".
  Explorer sidebar unchanged (auth.ts selected/highlighted, "2").
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Line 71 is almost entirely covered by a grey text-selection/highlight bar plus the taskbar edge — illegible except line number; marked with ⟪?⟫.
  Image required 180° rotation (was upside down).
---

```
38   * @returns {Promise<User | null>} A promise that resolves to the authenticated user object if successful, or
39   */
40  export async function fetchAuthenticatedUserBySession(): Promise<User | null> {
41      try {
42          // 1. Try fetching the authenticated user
43          const user = await baseQuery<User>({ url: '/users/1', method: 'GET' });
44          return user;
45      } catch (err) {
46          // 2. If unauthorized → try refresh
47          const error = err as { status: number };
48          if (error.status === 401) {
49              try {
50                  // 3. Retry fetching user after refresh
51                  await baseQuery({ url: '/auth/refresh', method: 'POST' });
52                  const user = await baseQuery<User>({ url: '/users/1', method: 'GET' });
53                  return user;
54              } catch {
55                  return null;
56              }
57          }
58          // Other errors → treat as unauthenticated
59          return null;
60      }
61  }
62
63  /**
64   * Validates user credentials by sending a login request to the authentication API.
65   *
66   * @param username - The username of the user attempting to log in.
67   * @param password - The password of the user attempting to log in.
68   * @returns A promise that resolves to `true` if the login is successful (status code 200), `false` otherwise
69   *
70   * @example
71  ⟪?⟫
```

Line 71 mostly occluded by a grey selection/highlight bar and the taskbar; illegible.


========== IMG_2310.md ==========
---
photo: IMG_2310.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/auth.ts
lines: 40-84
orientation: 180
confidence: high
notes: |
  Same file (auth.ts), scrolled further down. Repeats tail of fetchAuthenticatedUserBySession() (lines 52-61, already captured in IMG_2308/2309) and shows the full validateUser JSDoc example (lines 70-75, resolving the ⟪?⟫ from IMG_2309 line 71) plus the start of loginUser() function signature (lines 76-84).
  Sticky scroll header at top shows line 40 "export async function fetchAuthenticatedUserBySession(): Promise<User | null> {".
  Breadcrumb: aqs-web-ui > src > features > auth > services > auth.ts > ...
  Tab bar: "date.tsx 9+" (dimmed) and active tab "auth.ts" with problems badge "2".
  Explorer sidebar unchanged (auth.ts selected/highlighted, "2").
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Line 84 ("try {") is mostly occluded by the bottom taskbar/red "No Solution" badge but legible under zoom.
  Image required 180° rotation (was upside down).
---

Sticky scroll (enclosing scope, not part of visible range but shown at top):
```
40  export async function fetchAuthenticatedUserBySession(): Promise<User | null> {
```

Visible code:
```
52          const user = await baseQuery<User>({ url: '/users/1', method: 'GET' });
53          return user;
54      } catch {
55          return null;
56      }
57      }
58      // Other errors → treat as unauthenticated
59      return null;
60  }
61  }
62
63  /**
64   * Validates user credentials by sending a login request to the authentication API.
65   *
66   * @param username - The username of the user attempting to log in.
67   * @param password - The password of the user attempting to log in.
68   * @returns A promise that resolves to `true` if the login is successful (status code 200), `false` otherwise
69   *
70   * @example
71   * const isValid = await validateUser('john_doe', 'password123');
72   * if (isValid) {
73   *   console.log('User authenticated successfully');
74   * }
75   */
76  export async function loginUser(
77      username?: string,
78      password?: string,
79  ): Promise<{
80      status: boolean;
81      token: string | null;
82      sessionInformation?: LoginResponse['sessioninformation'];
83  }> {
84      try {
```


========== IMG_2311.md ==========
---
photo: IMG_2311.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/auth.ts
lines: 64-97
orientation: 180
confidence: high
notes: |
  Same file (auth.ts), scrolled further down. Repeats validateUser JSDoc (64-75, already captured in IMG_2309/2310) and loginUser signature (76-83, already captured in IMG_2310), plus new body of loginUser (84-97).
  Breadcrumb: aqs-web-ui > src > features > auth > services > auth.ts > ...
  Tab bar: "date.tsx 9+" (dimmed) and active tab "auth.ts" with problems badge "2".
  Explorer sidebar unchanged (auth.ts selected/highlighted, "2").
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Line 97 partly occluded by taskbar but "});" legible under zoom.
  Image required 180° rotation (was upside down).
---

```
64   * Validates user credentials by sending a login request to the authentication API.
65   *
66   * @param username - The username of the user attempting to log in.
67   * @param password - The password of the user attempting to log in.
68   * @returns A promise that resolves to `true` if the login is successful (status code 200), `false` otherwise
69   *
70   * @example
71   * const isValid = await validateUser('john_doe', 'password123');
72   * if (isValid) {
73   *   console.log('User authenticated successfully');
74   * }
75   */
76  export async function loginUser(
77      username?: string,
78      password?: string,
79  ): Promise<{
80      status: boolean;
81      token: string | null;
82      sessionInformation?: LoginResponse['sessioninformation'];
83  }> {
84      try {
85          // For SSO checks (no credentials), mark request to skip 401 interceptor
86          const isSSOAttempt = isEmpty(username) || isEmpty(password);
87
88          if (isSSOAttempt) {
89              console.log('[loginUser] SSO attempt - setting skipAuthInterceptor flag');
90          }
91
92          const response = await baseQuery<LoginResponse>({
93              url: '/auth/login',
94              method: 'POST',
95              skipAuthInterceptor: isSSOAttempt, // Skip 401 interceptor for SSO checks
96              ...(isSSOAttempt ? {} : { data: { Username: username, Password: password } }),
97          });
```


========== IMG_2312.md ==========
---
photo: IMG_2312.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/auth.ts
lines: 75-107
orientation: 180
confidence: medium
notes: |
  Same file (auth.ts), scrolled slightly further than IMG_2311. This photo has a pronounced double-exposure/ghosting artifact across most of the frame — two overlapping copies of the text, offset vertically by a few lines (likely captured mid-scroll-animation or rolling-shutter interaction with the display). Lines 75-97 are a repeat of content already cleanly captured in IMG_2310/IMG_2311 and are not re-transcribed in detail here; only the new lines 98-107 (visible past the previous photo's cutoff) are transcribed, verified via high-zoom crops to separate the sharp foreground text from the faint ghost layer.
  Breadcrumb: aqs-web-ui > src > features > auth > services > auth.ts > ...
  Tab bar: "date.tsx 9+" (dimmed) and active tab "auth.ts" with problems badge "2".
  Explorer sidebar unchanged (auth.ts selected/highlighted, "2").
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Image required 180° rotation (was upside down).
---

New lines beyond IMG_2311 (98-107), verified via zoom (ghost-free reading):
```
98
99      // Validate using Zod
100     const parsed = LoginResponseSchema.safeParse(response);
101
102     if (parsed.success && parsed.data.statusCode === 200) {
103         console.log('Login successful:', parsed.data.statusMessage);
104         return {
105             status: true,
106             token: parsed.data.token ?? null,
107             sessionInformation: parsed.data.sessioninformation,
```

Lines 75-97 repeat prior content (loginUser signature and body through the baseQuery call and closing `});`) already transcribed cleanly in IMG_2310.md and IMG_2311.md — see those files; not re-transcribed here due to the ghosting artifact making this photo a lower-fidelity source for that range.


========== IMG_2313.md ==========
---
photo: IMG_2313.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/auth.ts
lines: 75-107
orientation: 180
confidence: high
notes: |
  Same file, same scroll position as IMG_2312 (lines 75-107), but this photo is sharp/clean with no ghosting artifact — confirms and supersedes the ghost-affected reading in IMG_2312 for lines 75-97, and independently confirms lines 98-107.
  Breadcrumb: aqs-web-ui > src > features > auth > services > auth.ts > ...
  Tab bar: "date.tsx 9+" (dimmed) and active tab "auth.ts" with problems badge "2".
  Explorer sidebar unchanged (auth.ts selected/highlighted, "2").
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Line 107 cut off at bottom edge of screen (taskbar); only "sessionInformation: parsed.data.sessioninformation," visible, same as prior photo.
  Image required 180° rotation (was upside down).
---

```
75   */
76  export async function loginUser(
77      username?: string,
78      password?: string,
79  ): Promise<{
80      status: boolean;
81      token: string | null;
82      sessionInformation?: LoginResponse['sessioninformation'];
83  }> {
84      try {
85          // For SSO checks (no credentials), mark request to skip 401 interceptor
86          const isSSOAttempt = isEmpty(username) || isEmpty(password);
87
88          if (isSSOAttempt) {
89              console.log('[loginUser] SSO attempt - setting skipAuthInterceptor flag');
90          }
91
92          const response = await baseQuery<LoginResponse>({
93              url: '/auth/login',
94              method: 'POST',
95              skipAuthInterceptor: isSSOAttempt, // Skip 401 interceptor for SSO checks
96              ...(isSSOAttempt ? {} : { data: { Username: username, Password: password } }),
97          });
98
99          // Validate using Zod
100         const parsed = LoginResponseSchema.safeParse(response);
101
102         if (parsed.success && parsed.data.statusCode === 200) {
103             console.log('Login successful:', parsed.data.statusMessage);
104             return {
105                 status: true,
106                 token: parsed.data.token ?? null,
107                 sessionInformation: parsed.data.sessioninformation,
```


========== IMG_2314.md ==========
---
photo: IMG_2314.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/auth.ts
lines: 95-126
orientation: 180
confidence: high
notes: |
  Same file (auth.ts), scrolled further down. Shows tail of loginUser() (repeat of 95-97 from prior photos), the success-path return block, the failure-path returns, the catch block, function close, and the start of a new logoutUser() function.
  Sticky scroll headers at top show line 76 "export async function loginUser(" and line 92 "const response = await baseQuery<LoginResponse>({".
  Breadcrumb: aqs-web-ui > src > features > auth > services > auth.ts > ...
  Tab bar: "date.tsx 9+" (dimmed) and active tab "auth.ts" with problems badge "2".
  Explorer sidebar unchanged (auth.ts selected/highlighted, "2").
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Line 126 mostly cut off by taskbar; verified via zoom.
  Image required 180° rotation (was upside down).
---

Sticky scroll (enclosing scope, not part of visible range but shown at top):
```
76  export async function loginUser(
92      const response = await baseQuery<LoginResponse>({
```

Visible code:
```
95          skipAuthInterceptor: isSSOAttempt, // Skip 401 interceptor for SSO checks
96          ...(isSSOAttempt ? {} : { data: { Username: username, Password: password } }),
97      });
98
99      // Validate using Zod
100     const parsed = LoginResponseSchema.safeParse(response);
101
102     if (parsed.success && parsed.data.statusCode === 200) {
103         console.log('Login successful:', parsed.data.statusMessage);
104         return {
105             status: true,
106             token: parsed.data.token ?? null,
107             sessionInformation: parsed.data.sessioninformation,
108         };
109     }
110
111     console.warn('Login failed with status:', response.statusCode);
112     return { status: false, token: null, sessionInformation: undefined };
113 } catch (error) {
114     console.warn('Login request failed:', error);
115     return { status: false, token: null, sessionInformation: undefined };
116 }
117 }
118
119 export async function logoutUser(): Promise<boolean> {
120     try {
121         const response = await baseQuery<{
122             statusCode: number;
123             statusMessage: string;
124             token: string;
125             sessioninformation?: string[];
126         }>({ url: '/auth/logout', method: 'POST' });
```


========== IMG_2315.md ==========
---
photo: IMG_2315.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/auth.ts
lines: 102-134
orientation: 180
confidence: high
notes: |
  Same file (auth.ts), scrolled further down (last photo in this batch). Repeats tail of loginUser() (102-117, already captured in IMG_2314) and shows the rest of logoutUser(): the baseQuery call with inline generic type, success path, and start of failure path (127-134).
  Sticky scroll header at top shows line 76 "export async function loginUser(".
  Breadcrumb: aqs-web-ui > src > features > auth > services > auth.ts > ...
  Tab bar: "date.tsx 9+" (dimmed) and active tab "auth.ts" with problems badge "2".
  Explorer sidebar unchanged (auth.ts selected/highlighted, "2").
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Line 134 almost entirely occluded by the "No Solution" badge; only "return false;" legible under high zoom. This is the last line visible in the photo — function body (closing braces) not captured (end of batch).
  Image required 180° rotation (was upside down).
---

Sticky scroll (enclosing scope, not part of visible range but shown at top):
```
76  export async function loginUser(
```

Visible code:
```
102     if (parsed.success && parsed.data.statusCode === 200) {
103         console.log('Login successful:', parsed.data.statusMessage);
104         return {
105             status: true,
106             token: parsed.data.token ?? null,
107             sessionInformation: parsed.data.sessioninformation,
108         };
109     }
110
111         console.warn('Login failed with status:', response.statusCode);
112         return { status: false, token: null, sessionInformation: undefined };
113     } catch (error) {
114         console.warn('Login request failed:', error);
115         return { status: false, token: null, sessionInformation: undefined };
116     }
117 }
118
119 export async function logoutUser(): Promise<boolean> {
120     try {
121         const response = await baseQuery<{
122             statusCode: number;
123             statusMessage: string;
124             token: string;
125             sessioninformation?: string[];
126         }>({ url: '/auth/logout', method: 'POST' });
127
128         if (response.statusCode === 200 && !response.token) {
129             console.log('Logout successful');
130             return true;
131         }
132
133         console.warn('Logout failed with status:', response.statusCode);
134         return false;
```

This is the last photo in the requested range (2304-2315); the remainder of logoutUser() (closing braces, catch block if any) is not visible in this photo.


========== IMG_2316.md ==========
---
photo: IMG_2316.JPG
type: vscode-code
file: aqs-web-ui/src/features/auth/services/auth.ts
lines: 115-140
orientation: 180
confidence: high
notes: |
  Sticky-scroll header at top shows line 76: "export async function loginUser(" (enclosing function for the top of the visible viewport, closes at line 117).
  Breadcrumb: aqs-web-ui > src > features > auth > services > auth.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "auth.ts" with "2" (problems count badge on tab).
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded, cut off at top), text.tsx, textarea.tsx, XmlList.tsx [U]; config (expanded: action-config.ts, db.json); constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts); features (expanded) > auth (expanded) > services (expanded) > auth.ts [selected/highlighted, "2"], check-sso.ts, utils (collapsed), middleware.ts; dashboard, form, legacy, policy, prp, root (all collapsed).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 27 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Clock 4:45 PM 7/10/2026.
  Photo has a double-exposure/motion-blur ghost duplicate of the same text offset slightly down-and-right throughout the frame (camera shake); transcription taken from the sharper/brighter foreground layer, cross-checked against cropped zooms.
  Image required 180° rotation (was upside down).
---

```
76  export async function loginUser(                                    (sticky-scroll header)
115     return { status: false, token: null, sessionInformation: undefined };
116     }
117 }
118
119 export async function logoutUser(): Promise<boolean> {
120     try {
121         const response = await baseQuery<{
122             statusCode: number;
123             statusMessage: string;
124             token: string;
125             sessionInformation?: string[];
126         }>({ url: '/auth/logout', method: 'POST' });
127
128         if (response.statusCode === 200 && !response.token) {
129             console.log('Logout successful');
130             return true;
131         }
132
133         console.warn('Logout failed with status:', response.statusCode);
134         return false;
135     } catch (error) {
136         console.error('Logout failed:', error);
137         return false;
138     }
139 }
140
```
