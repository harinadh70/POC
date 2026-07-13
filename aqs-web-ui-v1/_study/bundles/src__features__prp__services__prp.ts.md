# BUNDLE for src/features/prp/services/prp.ts
# 6 photo fragment(s), ascending start-line order.


========== IMG_2698.md ==========
---
photo: IMG_2698.JPG
type: vscode-code
file: aqs-web-ui/src/features/prp/services/prp.ts
lines: 1-34
orientation: 180
confidence: high
notes: Explorer sidebar shows aqs-web-ui > src > features > policy > constants (tab-definitions.ts, ultimate-cover-tab-definit...) > utils (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts) > FieldRenderer.tsx > index.ts > policy-information-fields.ts > types.ts > ultimate-cover-fields.ts > prp > components (MlcSumList.tsx, marked "U" unsaved) > services > prp.ts (selected, "9+, U" modified) > utils > root > hooks. Tab bar: only prp.ts open (single tab). Breadcrumb: aqs-web-ui > src > features > prp > services > prp.ts > ... Status bar: branch "hitanshu/experimental*", "30 errors, 2 warnings", "No Solution". Bottom right: Ln 1, Col 1, Spaces: 2, UTF-8, CRLF, TypeScript. Left sidebar icon shows a badge "27" (likely source control changed-files count) and a "1" badge on account/notification icon. Line 34 comment is cut off at the very bottom of the screen by the Windows taskbar overlay — text after "session information" may be truncated/occluded.
---
1: import { z } from 'zod';
2: import { baseQuery } from '@/utils/http-instance';
3:
4: // Types
5: export interface MlcSumRow {
6:   id: string;
7:   selected?: boolean;
8:   year: string;
9:   losses: string;
10:   lossamount: string;
11:   eligibleamount: string;
12:   sortdate: string;
13: }
14:
15: // Zod schemas for validation
16: export const MlcSumRowSchema = z.object({
17:   id: z.string(),
18:   selected: z.boolean().optional(),
19:   year: z.string(),
20:   losses: z.string(),
21:   lossamount: z.string(),
22:   eligibleamount: z.string(),
23:   sortdate: z.string(),
24: });
25:
26: export const MlcSumListResponseSchema = z.object({
27:   list: z.array(MlcSumRowSchema),
28: });
29:
30: export type MlcSumListResponse = z.infer<typeof MlcSumListResponseSchema>;
31:
32: /**
33:  * Fetches MLC summary list data
34:  * In the legacy system, this would call XMLList.Get with session information ⟪?⟫


========== IMG_2699.md ==========
---
photo: IMG_2699.JPG
type: vscode-code
file: aqs-web-ui/src/features/prp/services/prp.ts
lines: 5-41 (approx, see notes)
orientation: 180
confidence: low
notes: SEVERE double-exposure/motion-blur artifact — the photo shows two overlapping scroll positions of the same file superimposed (camera/hand shake or mid-scroll capture), roughly 6-8 lines apart, making most of the frame illegible as a single coherent reading. Same file as IMG_2698 (aqs-web-ui/src/features/prp/services/prp.ts). Lines 5-30 duplicate content already transcribed cleanly and at high confidence in IMG_2698 (MlcSumRow interface, MlcSumRowSchema, MlcSumListResponseSchema, MlcSumListResponse type). New content beyond IMG_2698 (lines 32-41) reconstructed below from the less-blurred foreground layer, cross-checked against the JSDoc opening already seen at line 32-34 in IMG_2698 ("/** * Fetches MLC summary list data * In the legacy system, this would call XMLList.Get with session information"). Explorer sidebar unchanged from IMG_2698 (prp.ts selected under services). Status bar: branch "hitanshu/experimental*", "30 errors, 2 warnings", "No Solution". Timestamp overlay 5:17 PM 7/10/2026. Treat lines 35-41 as medium confidence at best given the ghosting; verify against a future clean photo of this same file if one exists.
---
5: export interface MlcSumRow {
...
30: export type MlcSumListResponse = z.infer<typeof MlcSumListResponseSchema>;
31:
32: /**
33:  * Fetches MLC summary list data
34:  * In the legacy system, this would call XMLList.Get with session information
35:  * For now, returns mock data that matches the XSL structure
36:  */
37: export async function fetchMlcSumList(sessionInfo?: any): Promise<MlcSumRow[]> {
38:   try {
39:     // In production, this would be:
40:     // const response = await baseQuery<MlcSumListResponse>({
41:     //   url: '/api/prp/mlc-sum-list',


========== IMG_2700.md ==========
---
photo: IMG_2700.JPG
type: vscode-code
file: aqs-web-ui/src/features/prp/services/prp.ts
lines: 25-57 (approx, see notes)
orientation: 180
confidence: low
notes: Same double-exposure/motion-blur artifact as IMG_2699 — two overlapping scroll positions of the same file superimposed, roughly 8 lines apart. Same file (aqs-web-ui/src/features/prp/services/prp.ts), continuing further down than IMG_2699. Lines 25-30 and 32-38 corroborate IMG_2698/IMG_2699 exactly (MlcSumListResponseSchema, MlcSumListResponse type, JSDoc comment, fetchMlcSumList signature, try {) giving higher confidence for that portion. Lines 39-57 (commented-out real-fetch example plus mockData array) are reconstructed from partially-legible overlapping text and standard boilerplate inference — mark as lower confidence; word-level fragments visible include "method: 'POST'", "data: { sessionInfo }", "url: '/api/prp/mlc-sum-list'", "return response.list", "Mock data for development", "const mockData: MlcSumRow[] = [", "id:", "selected: false,", "year: '2023'", "losses: '2'", "lossamount: '15000.00'", "eligibleamount: '50000.00'", "sortdate: '20230101'". Explorer sidebar same as IMG_2698/2699 (prp.ts selected under services, sidebar badge "27"). Status bar: branch "hitanshu/experimental*", "30 errors, 2 warnings", "No Solution". Timestamp overlay 5:17 PM 7/10/2026.
---
25: export const MlcSumRowSchema = z.object({
26: export const MlcSumListResponseSchema = z.object({
27:   list: z.array(MlcSumRowSchema),
28: });
29:
30: export type MlcSumListResponse = z.infer<typeof MlcSumListResponseSchema>;
31:
32: /**
33:  * Fetches MLC summary list data
34:  * In the legacy system, this would call XMLList.Get with session information
35:  * For now, returns mock data that matches the XSL structure
36:  */
37: export async function fetchMlcSumList(sessionInfo?: any): Promise<MlcSumRow[]> {
38:   try {
39:     // In production, this would be:
40:     // const response = await baseQuery<MlcSumListResponse>({
41:     //   url: '/api/prp/mlc-sum-list',
42:     //   method: 'POST',
43:     //   data: { sessionInfo }
44:     // });
45:     // return response.list;
46: ⟪?⟫
47:     // Mock data for development
48:     const mockData: MlcSumRow[] = [
49:       {
50:         id: ⟪?⟫,
51:         selected: false,
52:         year: '2023',
53:         losses: '2',
54:         lossamount: '15000.00',
55:         eligibleamount: '50000.00',
56:         sortdate: '20230101',
57:       },


========== IMG_2701.md ==========
---
photo: IMG_2701.JPG
type: vscode-code
file: aqs-web-ui/src/features/prp/services/prp.ts
lines: 37, 39-70 (approx, see notes)
orientation: 180
confidence: medium
notes: Sticky-scroll header pins line 37 "export async function fetchMlcSumList(sessionInfo?: any): Promise<MlcSumRow[]> {" at top while content below (39+) scrolls. Same double-exposure/motion-blur ghosting seen in IMG_2699/IMG_2700 affects lines 39-49 and to a lesser degree 50-70, but content is cross-validated against IMG_2700 (which independently shows the same commented-out fetch example and start of mockData array) so confidence is higher than those two photos. Mock data array shows 3 objects with a consistent 7-field pattern (id, selected, year, losses, lossamount, eligibleamount, sortdate): {id:'1',selected:false,year:'2023',losses:'2',lossamount:'15000.00',eligibleamount:'50000.00',sortdate:'20230101'}, {id:'2',selected:true,year:'2022',losses:'1',lossamount:'8000.00',eligibleamount:'45000.00',sortdate:'20220101'}, {id:'3',selected:false,year:'2021',...} (3rd object cut off at bottom of frame by taskbar, only id/selected/year visible). Exact absolute line numbers for the mockData array body (50-70) are a best-effort reconstruction based on a consistent 9-line-per-object pattern anchored to line 48/49 (confirmed in IMG_2700) — could be off by 1 due to ghosting. Explorer sidebar same as prior photos (prp.ts selected under services, sidebar badge "27"). Status bar: branch "hitanshu/experimental*", "30 errors, 2 warnings", "No Solution". Timestamp overlay 5:17 PM 7/10/2026.
---
37: export async function fetchMlcSumList(sessionInfo?: any): Promise<MlcSumRow[]> {
39:   // In production, this would be:
40:   // const response = await baseQuery<MlcSumListResponse>({
41:   //   url: '/api/prp/mlc-sum-list',
42:   //   method: 'POST',
43:   //   data: { sessionInfo }
44:   // });
45:   // return response.list;
46: ⟪?⟫
47:   // Mock data for development
48:   const mockData: MlcSumRow[] = [
49:     {
50:       id: '1',
51:       selected: false,
52:       year: '2023',
53:       losses: '2',
54:       lossamount: '15000.00',
55:       eligibleamount: '50000.00',
56:       sortdate: '20230101',
57:     },
58:     {
59:       id: '2',
60:       selected: true,
61:       year: '2022',
62:       losses: '1',
63:       lossamount: '8000.00',
64:       eligibleamount: '45000.00',
65:       sortdate: '20220101',
66:     },
67:     {
68:       id: '3',
69:       selected: false,
70:       year: '2021',


========== IMG_2702.md ==========
---
photo: IMG_2702.JPG
type: vscode-code
file: aqs-web-ui/src/features/prp/services/prp.ts
lines: 37, 48, 56-86
orientation: 180
confidence: high
notes: Sticky-scroll headers pin lines 37 ("export async function fetchMlcSumList(sessionInfo?: any): Promise<MlcSumRow[]> {") and 48 ("const mockData: MlcSumRow[] = [") at top while content 56+ scrolls beneath. Mild double-exposure ghosting present (faint duplicate text offset ~8-9 lines, same artifact as IMG_2699-2701) but the foreground/sharp layer is clearly legible throughout and cross-validates cleanly against the mockData object pattern established in IMG_2700/IMG_2701 (3rd object: id:'3', selected:false, year:'2021', losses:'3', lossamount:'25000.00', eligibleamount:'55000.00', sortdate:'20210101'). Confirms lines 56-57 are the tail of object 1 (sortdate:'20230101', }) and lines 58-66 are object 2 (id:'2'...sortdate:'20220101') exactly as reconstructed in IMG_2701. Line 86 reads "}</content>" — an unusual trailing fragment (literal "</content>" tag) that does not look like valid TypeScript; possibly a stray artifact from an AI-code-generation/templating tool left in the file, or a rendering overlay; transcribed verbatim. Explorer sidebar same as prior photos (services > prp.ts selected, sidebar badge "27"). Status bar: branch "hitanshu/experimental*", "30 errors, 2 warnings", "No Solution". Timestamp overlay 5:17 PM 7/10/2026.
---
37: export async function fetchMlcSumList(sessionInfo?: any): Promise<MlcSumRow[]> {
48:   const mockData: MlcSumRow[] = [
...
56:       sortdate: '20230101',
57:     },
58:     {
59:       id: '2',
60:       selected: true,
61:       year: '2022',
62:       losses: '1',
63:       lossamount: '8000.00',
64:       eligibleamount: '45000.00',
65:       sortdate: '20220101',
66:     },
67:     {
68:       id: '3',
69:       selected: false,
70:       year: '2021',
71:       losses: '3',
72:       lossamount: '25000.00',
73:       eligibleamount: '55000.00',
74:       sortdate: '20210101',
75:     },
76:   ];
77:   // Simulate API delay
78:   await new Promise(resolve => setTimeout(resolve, 100));
79:
80:   return mockData;
81:   } catch (error) {
82:     console.error('[PRP API] Failed to fetch MLC sum list:', error);
83:     throw error;
84:   }
85: }
86: }</content>


========== IMG_2703.md ==========
---
photo: IMG_2703.JPG
type: vscode-code
file: aqs-web-ui/src/features/prp/services/prp.ts
lines: 37, 48, 69-87
orientation: 180
confidence: high
notes: Sticky-scroll headers pin lines 37 and 48 at top (same as IMG_2702). Faint duplicate ghost of the lower text repeats below the main block (mild double-exposure, same recurring artifact) but the primary/sharp layer is fully legible. NOTABLE: the file's last visible lines (86-87) are NOT valid TypeScript — line 86 is "}</content>" and line 87 is "<parameter name=\"filePath\">C:\Users\skudale\Documents\aqs-web-ui\src\features\prp\services\prp.ts" (text continues, wrapped/truncated at right edge of editor, exact continuation beyond "prp.ts" not visible — no closing wrapper visible in frame). This looks like a raw AI-coding-assistant tool-call payload (a file-write/edit tool's <content>...</content> and <parameter name="filePath"> tags) that got pasted or saved verbatim into the actual .ts source file rather than being consumed by the tool, i.e. apparent leaked/malformed AI tool output committed into the codebase. Confirms username "skudale" and local path C:\Users\skudale\Documents\aqs-web-ui\... for this developer's machine. Explorer sidebar: services > prp.ts selected (highlighted differently now, blue background full-row), sidebar badge "27"; components/prp/features/aqs-web-ui folders show modified-dot indicators. Status bar: branch "hitanshu/experimental*", "30 errors, 2 warnings", "No Solution". Timestamp overlay 5:17 PM 7/10/2026.
---
37: export async function fetchMlcSumList(sessionInfo?: any): Promise<MlcSumRow[]> {
48:   const mockData: MlcSumRow[] = [
...
69:       selected: false,
70:       year: '2021',
71:       losses: '3',
72:       lossamount: '25000.00',
73:       eligibleamount: '55000.00',
74:       sortdate: '20210101',
75:     },
76:   ];
77:
78:   // Simulate API delay
79:   await new Promise(resolve => setTimeout(resolve, 100));
80:
81:   return mockData;
82: } catch (error) {
83:   console.error('[PRP API] Failed to fetch MLC sum list:', error);
84:   throw error;
85: }
86: }</content>
87: <parameter name="filePath">C:\Users\skudale\Documents\aqs-web-ui\src\features\prp\services\prp.ts ⟪?⟫
