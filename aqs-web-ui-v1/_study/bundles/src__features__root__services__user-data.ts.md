# BUNDLE for src/features/root/services/user-data.ts
# 4 photo fragment(s), ascending start-line order.


========== IMG_2705.md ==========
---
photo: IMG_2705.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/services/user-data.ts
lines: 1-34
orientation: 180
confidence: high
notes: Clean, sharp photo, no ghosting. Explorer sidebar shows aqs-web-ui > src > features > policy > utils > ultimateCoverLoader.ts > FieldRenderer.tsx > index.ts > policy-information-fields.ts > types.ts > ultimate-cover-fields.ts > prp (components: MlcSumList.tsx "U"; services: prp.ts "U"; utils: loader.ts "U") > root > services > user-data.ts (selected, "1" unsaved/problem indicator) > utils > hooks > lib > pages > providers. Breadcrumb: aqs-web-ui > src > features > root > services > user-data.ts > ... Status bar: branch "hitanshu/experimental*", "3 errors, 0 warnings" (much lower than the prp.ts/loader.ts files' 30 errors — this is a different, less-broken file), "No Solution". Bottom right: Ln 1, Col 1, Tab Size: 4 (note: Tab Size 4, differs from the Spaces: 2 seen in prp files), UTF-8, CRLF, TypeScript. Timestamp overlay 5:17 PM 7/10/2026. Line 34 "XMLFile: ''," confirmed via zoom crop, partially cut by status bar in main view.
---
1: import { z } from 'zod';
2:
3: // services
4: import { type SessionInfo } from '@features/auth/services/auth';
5:
6: // utils
7: import { baseQuery } from '@utils/http-instance';
8:
9: // ------------------------------------------
10:
11: export const PageNavigationResponseSchema = z.object({
12:   result: z.union([z.string(), z.record(z.string(), z.any())]),
13:   xdiSecurity: z.object(), // ""
14:   xdiOptions: z.object(), // ""
15:   atAQS: z.string(), // "1"
16:   mnodValue: z.string(), // "start"
17:   statusMessage: z.string(), // "OK"
18:   statusCode: z.number().int(), // 200
19: });
20:
21: export async function fetchUserData(
22:   sessionInfo: SessionInfo,
23: ): Promise<{ status: boolean; data?: Record<string, unknown> | null }> {
24:   try {
25:     // 2. gather params for navigation
26:     const body = {
27:       compLoc: sessionInfo.compLoc,
28:       userId: sessionInfo.userId,
29:       policyID: '0',
30:       nodeKey: sessionInfo.nodeKey,
31:       action: 'Main',
32:       diagnosticMode: '0',
33:       xmlDetail: '<items />',
34:       XMLFile: '',


========== IMG_2706.md ==========
---
photo: IMG_2706.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/services/user-data.ts
lines: 11, 15-47
orientation: 180
confidence: high
notes: Continuation of same file as IMG_2705, scrolled further down. Sticky-scroll header pins lines 11 and 15-19 (PageNavigationResponseSchema closing) at top while content 20+ scrolls beneath. Mild double-exposure ghosting present but foreground/sharp layer fully legible and consistent with IMG_2705's lines 26-34. Notable: the inline baseQuery<{...}> generic type uses PascalCase field names (StatusCode, StatusMessage) whereas the PageNavigationResponseSchema zod object (lines 11-19) and the earlier interface use camelCase (statusCode, statusMessage) — an inconsistency worth flagging, transcribed verbatim as shown. Explorer sidebar shows aqs-web-ui > src > features > policy > utils > ultimateCoverLoader.ts > FieldRenderer.tsx > index.ts > policy-information-fields.ts > types.ts > ultimate-cover-fields.ts > prp (components: MlcSumList.tsx "U"; services: prp.ts "U"; utils: loader.ts "U") > root > services > user-data.ts (selected, "1") > utils > hooks > lib > pages > providers. Status bar: branch "hitanshu/experimental*", "3 errors, 0 warnings", "No Solution". Bottom right: Ln 1, Col 1, Tab Size: 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:17 PM 7/10/2026.
---
11: export const PageNavigationResponseSchema = z.object({
15:   atAQS: z.string(), // "1"
16:   mnodValue: z.string(), // "start"
17:   statusMessage: z.string(), // "OK"
18:   statusCode: z.number().int(), // 200
19: });
20:
21: export async function fetchUserData(
22:   sessionInfo: SessionInfo,
23: ): Promise<{ status: boolean; data?: Record<string, unknown> | null }> {
24:   try {
25:     // 2. gather params for navigation
26:     const body = {
27:       compLoc: sessionInfo.compLoc,
28:       userId: sessionInfo.userId,
29:       policyID: '0',
30:       nodeKey: sessionInfo.nodeKey,
31:       action: 'Main',
32:       diagnosticMode: '0',
33:       xmlDetail: '<items />',
34:       XMLFile: '',
35:       tab: '',
36:       debug: 'false',
37:       returnType: '',
38:     };
39:
40:     const response = await baseQuery<{
41:       StatusCode: number;
42:       StatusMessage: string;
43:       atAQS: string;
44:       mnodValue: string;
45:       xdiOptions: Record<string, unknown>;
46:       xdiSecurity: Record<string, unknown>;
47:     }>({


========== IMG_2707.md ==========
---
photo: IMG_2707.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/services/user-data.ts
lines: 21, 26, 32-63
orientation: 180
confidence: high
notes: Continuation of same file as IMG_2705/IMG_2706, scrolled further down to the end of fetchUserData. Sticky-scroll headers pin lines 21 ("export async function fetchUserData(") and 26 ("const body = {") at top while content 32+ scrolls beneath. Mild double-exposure ghosting present (consistent recurring artifact across this whole photo batch) but foreground/sharp layer fully legible and consistent with IMG_2706's tail (body object literal, baseQuery generic type). Confirms full baseQuery call: url '/userData/GetUserData', method 'POST', data: body. Destructures { StatusCode, StatusMessage, ...restData } = response, then branches on StatusCode === 200 (logs and returns { status: true, data: restData }) else falls through to return { status: false, data: null }; catch block logs 'Error fetching user data:' and (per line 63, edge of frame) also returns { status: false, data: null }. No stray tool-call artifact visible in this file's visible range (unlike prp.ts/loader.ts) — end of function reached at line ~63/64 without a "</content>" tail appearing in frame. Explorer sidebar unchanged from IMG_2706 (root > services > user-data.ts selected, "1"). Status bar: branch "hitanshu/experimental*", "3 errors, 0 warnings", "No Solution". Bottom right: Ln 1, Col 1, Tab Size: 4, UTF-8, CRLF, TypeScript. Timestamp overlay 5:17 PM 7/10/2026.
---
21: export async function fetchUserData(
26:     const body = {
32:       diagnosticMode: '0',
33:       xmlDetail: '<items />',
34:       XMLFile: '',
35:       tab: '',
36:       debug: 'false',
37:       returnType: '',
38:     };
39:
40:     const response = await baseQuery<{
41:       StatusCode: number;
42:       StatusMessage: string;
43:       atAQS: string;
44:       mnodValue: string;
45:       xdiOptions: Record<string, unknown>;
46:       xdiSecurity: Record<string, unknown>;
47:     }>({
48:       url: '/userData/GetUserData',
49:       method: 'POST',
50:       data: body,
51:     });
52:
53:     const { StatusCode, StatusMessage, ...restData } = response;
54:
55:     if (StatusCode === 200) {
56:       console.log('User data fetched successfully:', StatusMessage);
57:       return { status: true, data: restData };
58:     }
59:
60:     return { status: false, data: null };
61:   } catch (error) {
62:     console.error('Error fetching user data:', error);
63:     return { status: false, data: null };


========== IMG_2708.md ==========
---
photo: IMG_2708.JPG
type: vscode-code
file: aqs-web-ui/src/features/root/services/user-data.ts
lines: 21-66
orientation: 180
confidence: medium
notes: >
  Photo has heavy motion-blur double-exposure ghosting (camera shake) across the whole
  code pane — every line has a fainter duplicate offset ~3 rows down/left, making the
  bottom portion (lines ~60-66) ambiguous. Transcription below uses the sharper/bolder
  text layer aligned to each gutter number; ghost duplicates were discarded as noise
  where identifiable. Lines 63-66 are lower confidence — could include an extra
  ghost-duplicated "} catch (error) {" block that is not real code (marked below).
  Sticky-scroll headers pinned at top: line 21 "export async function fetchUserData("
  and line 40 "const response = await baseQuery<{" (real enclosing-scope lines, not
  part of the contiguous 45-66 body).
  Explorer sidebar (aqs-web-ui/src/features) visible: policy > utils (ultimateCoverLoader.ts,
  FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts);
  prp > components (MlcSumList.tsx, modified/"U"), services (prp.ts, "U"), utils (loader.ts, "U");
  root > services > user-data.ts (currently open/highlighted). Also top-level src children
  (collapsed): utils, hooks, lib, pages, providers.
  Tab bar: only "user-data.ts" tab open.
  Breadcrumb: aqs-web-ui > src > features > root > services > user-data.ts > ...
  Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Bottom-left: workspace
  "aqs-web-ui", branch "hitanshu/experimental*" (dirty), Problems 3 errors / 0 warnings,
  "No Solution". Clock shows 5:17 PM 7/10/2026 (client machine date, not reliable).
---
21: export async function fetchUserData(
   (sticky-scroll header line; params not shown — collapsed above viewport)
40: const response = await baseQuery<{
   (sticky-scroll header line; generic type-arg block open)
45:     xdiOptions: Record<string, unknown>;
46:     xdiSecurity: Record<string, unknown>;
47:   }>({
48:     url: '/userData/GetUserData',
49:     method: 'POST',
50:     data: body,
51:   });
52:   const { StatusCode, StatusMessage, ...restData } = response;
53:
54:   if (StatusCode === 200) {
55:     console.log('User data fetched successfully:', StatusMessage);
56:     return { status: true, data: restData };
57:   }
58:
59:   return { status: false, data: null };
60: } catch (error) {
61:   console.error('Error fetching user data:', error);
62:   return { status: false, data: null };
63: }
64: }
65: ⟪?⟫ (possible ghost-duplicate artifact, not confidently real code)
66: ⟪?⟫ (possible ghost-duplicate artifact, not confidently real code)
