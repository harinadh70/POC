# BUNDLE for src/services/user-data.ts
# 6 photo fragment(s), ascending start-line order.


========== IMG_3223.md ==========
---
photo: IMG_3223.JPG
type: vscode-code
file: aqs-web-ui/src/services/user-data.ts
lines: 1-34
orientation: 180
confidence: high
notes: New file relative to IMG_3220-3222 (page-build.ts) — this is user-data.ts, 1 unsaved change, tab bar shows only this file open. Line 34 is cut off at the very bottom edge of the screen, partially legible ("userId: sessionInfo.userId," — inferred from partial glyphs, marked low-confidence). Explorer sidebar: same tree as before, services folder now shows lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts (active/highlighted, 1 unsaved), xml-server-call.ts; services folder label shown in orange/modified color. Status bar: branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution". Squiggly underline under 'zod' import on line 1 (possible missing module warning).
---
1: import { z } from 'zod';
2: 
3: // services
4: import { type SessionInfo } from '@features/auth/services/auth';
5: 
6: // types
7: import type { PermissionSnapshot } from '@/types';
8: 
9: // utils
10: import { baseQuery } from '@utils/http-instance';
11: import { parsePermissions } from '@utils/parse-permissions';
12: 
13: // ---------------------------------------
14: 
15: export const PageNavigationResponseSchema = z.object({
16:     result: z.union([z.string(), z.record(z.string(), z.any())]),
17:     xdiSecurity: z.record(z.string(), z.unknown()), // ""
18:     xdiOptions: z.record(z.string(), z.unknown()), // ""
19:     atAQS: z.string(), // "1"
20:     mnodValue: z.string(), // "start"
21:     statusMessage: z.string(), // "OK"
22:     statusCode: z.number().int(), // 200
23: });
24: 
25: export async function fetchUserData(sessionInfo: SessionInfo): Promise<{
26:     status: boolean;
27:     data?: Record<string, unknown> | null;
28:     permissions?: PermissionSnapshot;
29: }> {
30:     try {
31:         // 2. gather params for navigation
32:         const body = {
33:             compLoc: sessionInfo.compLoc,
34:             userId: sessionInfo.userId, ⟪?⟫ (line cut off at bottom edge of screen, low confidence)


========== IMG_3224.md ==========
---
photo: IMG_3224.JPG
type: vscode-code
file: aqs-web-ui/src/services/user-data.ts
lines: 6-39
orientation: 180
confidence: medium
notes: Photo has a visible double-exposure/ghosting artifact — a fainter duplicate of the same editor content is superimposed slightly offset (looks like the screen was mid-scroll or refreshing during capture, or a slow shutter caught two frames). Transcription below is from the sharper/brighter foreground text; the ghost text underneath matches the same content so nothing appears lost. Continues directly from IMG_3223 (same file, same scroll position extended a few lines further — lines 33-39 are new content beyond what IMG_3223 showed). Explorer sidebar unchanged. Status bar: branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution".
---
6:     // types
7:     import type { PermissionSnapshot } from '@/types';
8: 
9:     // utils
10:     import { baseQuery } from '@utils/http-instance';
11:     import { parsePermissions } from '@utils/parse-permissions';
12: 
13:     // ---------------------------------------
14: 
15:     export const PageNavigationResponseSchema = z.object({
16:         result: z.union([z.string(), z.record(z.string(), z.any())]),
17:         xdiSecurity: z.record(z.string(), z.unknown()), // ""
18:         xdiOptions: z.record(z.string(), z.unknown()), // ""
19:         atAQS: z.string(), // "1"
20:         mnodValue: z.string(), // "start"
21:         statusMessage: z.string(), // "OK"
22:         statusCode: z.number().int(), // 200
23:     });
24: 
25:     export async function fetchUserData(sessionInfo: SessionInfo): Promise<{
26:         status: boolean;
27:         data?: Record<string, unknown> | null;
28:         permissions?: PermissionSnapshot;
29:     }> {
30:         try {
31:             // 2. gather params for navigation
32:             const body = {
33:                 compLoc: sessionInfo.compLoc,
34:                 userId: sessionInfo.userId,
35:                 policyID: '0',
36:                 nodeKey: sessionInfo.nodeKey,
37:                 action: 'Main',
38:                 diagnosticMode: '0',
39:                 xmlDetail: '<items />',


========== IMG_3225.md ==========
---
photo: IMG_3225.JPG
type: vscode-code
file: aqs-web-ui/src/services/user-data.ts
lines: 14-47
orientation: 180
confidence: high
notes: Continues directly from IMG_3223/IMG_3224 (same file, scrolled slightly further) — new content beyond IMG_3224 is lines 40-47. Line 47 cut off at bottom of screen ("StatusCode: number;" visible, part of an inline type literal for baseQuery<{...}>). Explorer sidebar unchanged; services folder highlighted orange (modified), user-data.ts active with 1 unsaved change. Status bar: branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution".
---
14: 
15:     export const PageNavigationResponseSchema = z.object({
16:         result: z.union([z.string(), z.record(z.string(), z.any())]),
17:         xdiSecurity: z.record(z.string(), z.unknown()), // ""
18:         xdiOptions: z.record(z.string(), z.unknown()), // ""
19:         atAQS: z.string(), // "1"
20:         mnodValue: z.string(), // "start"
21:         statusMessage: z.string(), // "OK"
22:         statusCode: z.number().int(), // 200
23:     });
24: 
25:     export async function fetchUserData(sessionInfo: SessionInfo): Promise<{
26:         status: boolean;
27:         data?: Record<string, unknown> | null;
28:         permissions?: PermissionSnapshot;
29:     }> {
30:         try {
31:             // 2. gather params for navigation
32:             const body = {
33:                 compLoc: sessionInfo.compLoc,
34:                 userId: sessionInfo.userId,
35:                 policyID: '0',
36:                 nodeKey: sessionInfo.nodeKey,
37:                 action: 'Main',
38:                 diagnosticMode: '0',
39:                 xmlDetail: '<items />',
40:                 XMLFile: '',
41:                 tab: '',
42:                 debug: 'false',
43:                 returnType: '',
44:             };
45: 
46:             const response = await baseQuery<{
47:                 StatusCode: number; ⟪?⟫ (line cut off at bottom edge of screen)


========== IMG_3226.md ==========
---
photo: IMG_3226.JPG
type: vscode-code
file: aqs-web-ui/src/services/user-data.ts
lines: 25-57
orientation: 180
confidence: high
notes: Continues directly from IMG_3225 (same file, scrolled slightly further, no gap this time — line 25 shown as normal content, not a sticky header). New content beyond IMG_3225 is lines 48-57 (rest of the baseQuery generic type and the request options object). Explorer sidebar unchanged; services folder highlighted orange (modified), user-data.ts active with 1 unsaved change. Status bar: branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution".
---
25:     export async function fetchUserData(sessionInfo: SessionInfo): Promise<{
26:         status: boolean;
27:         data?: Record<string, unknown> | null;
28:         permissions?: PermissionSnapshot;
29:     }> {
30:         try {
31:             // 2. gather params for navigation
32:             const body = {
33:                 compLoc: sessionInfo.compLoc,
34:                 userId: sessionInfo.userId,
35:                 policyID: '0',
36:                 nodeKey: sessionInfo.nodeKey,
37:                 action: 'Main',
38:                 diagnosticMode: '0',
39:                 xmlDetail: '<items />',
40:                 XMLFile: '',
41:                 tab: '',
42:                 debug: 'false',
43:                 returnType: '',
44:             };
45: 
46:             const response = await baseQuery<{
47:                 StatusCode: number;
48:                 StatusMessage: string;
49:                 atAQS: string;
50:                 mnodValue: string;
51:                 xdiOptions?: Record<string, unknown> | null;
52:                 xdiSecurity?: Record<string, unknown> | null;
53:             }>({
54:                 url: '/userData/GetUserData',
55:                 method: 'POST',
56:                 data: body,
57:             });


========== IMG_3227.md ==========
---
photo: IMG_3227.JPG
type: vscode-code
file: aqs-web-ui/src/services/user-data.ts
lines: 43-73
orientation: 180
confidence: high
notes: Two VS Code sticky-scroll headers pinned at top — line 25 "export async function fetchUserData(sessionInfo: SessionInfo): Promise<{" and line 32 "const body = {". A partial line (42, "debug: 'false',") is visibly garbled/overlapped right under the second sticky header before line 43 begins cleanly — omitted as illegible. Continues directly from IMG_3226 (same file, scrolled further) — new content beyond IMG_3226 is lines 58-73. Explorer sidebar unchanged; services folder highlighted orange (modified), user-data.ts active with 1 unsaved change. Status bar: branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution". Bottom of visible code (line 73) is the closing of a console.log/object passed to it — cut off at screen edge.
---
[Sticky scroll headers, pinned — not part of continuous range]
25: export async function fetchUserData(sessionInfo: SessionInfo): Promise<{
32:     const body = {

[Partial/garbled line, overlapped by sticky header — omitted]
42: ⟪?⟫ (likely "debug: 'false'," per IMG_3226, obscured)

[Visible scrolled content]
43:             returnType: '',
44:         };
45: 
46:         const response = await baseQuery<{
47:             StatusCode: number;
48:             StatusMessage: string;
49:             atAQS: string;
50:             mnodValue: string;
51:             xdiOptions?: Record<string, unknown> | null;
52:             xdiSecurity?: Record<string, unknown> | null;
53:         }>({
54:             url: '/userData/GetUserData',
55:             method: 'POST',
56:             data: body,
57:         });
58: 
59:         const { StatusCode, StatusMessage, ...restData } = response;
60: 
61:         if (StatusCode === 200) {
62:             console.log('User data fetched successfully:', StatusMessage);
63: 
64:             let permissions: PermissionSnapshot | undefined;
65:             try {
66:                 permissions = parsePermissions(response.xdiSecurity, response.xdiOptions);
67:                 console.log('[PERMISSIONS] Loaded successfully', {
68:                     allowedPages: permissions.page.allowedAspFiles.length,
69:                     deniedPages: permissions.page.deniedAspFiles.length,
70:                     allowActions: permissions.actions.allow.length,
71:                     denyActions: permissions.actions.deny.length,
72:                     fieldRules: Object.keys(permissions.fields).length,
73:                 });


========== IMG_3228.md ==========
---
photo: IMG_3228.JPG
type: vscode-code
file: aqs-web-ui/src/services/user-data.ts
lines: 57-89
orientation: 180
confidence: high
notes: Sticky-scroll header pinned at top — line 25 "export async function fetchUserData(sessionInfo: SessionInfo): Promise<{". Row right under the sticky header shows a fragment overlapping (gutter shows "57" faintly followed by "});" — treated as line 57 closing the baseQuery call, consistent with IMG_3227. This is the tail end of fetchUserData() and end of file (line 89 is the final closing brace). Continues directly from IMG_3227. Explorer sidebar unchanged; services folder highlighted orange (modified), user-data.ts active with 1 unsaved change. Status bar: branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution".
---
[Sticky scroll header, pinned — not part of continuous range]
25: export async function fetchUserData(sessionInfo: SessionInfo): Promise<{

[Visible scrolled content]
57:         });
58: 
59:         const { StatusCode, StatusMessage, ...restData } = response;
60: 
61:         if (StatusCode === 200) {
62:             console.log('User data fetched successfully:', StatusMessage);
63: 
64:             let permissions: PermissionSnapshot | undefined;
65:             try {
66:                 permissions = parsePermissions(response.xdiSecurity, response.xdiOptions);
67:                 console.log('[PERMISSIONS] Loaded successfully', {
68:                     allowedPages: permissions.page.allowedAspFiles.length,
69:                     deniedPages: permissions.page.deniedAspFiles.length,
70:                     allowActions: permissions.actions.allow.length,
71:                     denyActions: permissions.actions.deny.length,
72:                     fieldRules: Object.keys(permissions.fields).length,
73:                 });
74:             } catch (permissionError) {
75:                 console.error(
76:                     '[PERMISSIONS] Failed to parse GetUserData permissions',
77:                     permissionError,
78:                 );
79:             }
80: 
81:             return { status: true, data: restData, permissions };
82:         }
83: 
84:         return { status: false, data: null };
85:     } catch (error) {
86:         console.error('Error fetching user data:', error);
87:         return { status: false, data: null };
88:     }
89: }
