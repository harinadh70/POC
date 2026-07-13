# BUNDLE for src/components/data-grid/data-grid-config-registry.ts
# 22 photo fragment(s), ascending start-line order.


========== IMG_1862.md ==========
---
photo: IMG_1862.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 1-34
orientation: 0
confidence: high
notes: Tab data-grid-config-registry.ts; breadcrumb aqs-web-ui > src > components > data-grid > data-grid-config-registry.ts. Explorer shows components/data-grid folder: data-grid-config-registry.ts (selected), data-grid-normalize.ts, data-grid.tsx; sibling folders modal-dialog, tabView; component files action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx. Status bar: Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript; "Initializing 'aqs-web-ui/tsconfig.app.json'"; branch hitanshu/experimental*, 0 errors 0 warnings, "No Solution". Minimap dense (long file). Line 33 partially cut by taskbar overlay: appears "/** Is column filterable? Default: true */". Line 25 comment continues past right edge of viewport (ends at 'currency, closing */ not visible).
---
1    /**
2     * Grid Configuration Registry
3     *
4     * Maps XSL files to grid column configurations.
5     * When API returns XML name, use it to look up the grid config.
6     *
7     * Usage:
8     * const config = getGridConfigByXsL('LobSummary_ISLLPOL_20010101.xsl');
9     * <UniversalGrid gridConfig={config} data={apiResponse} />
10    */
11
12   export interface ColumnConfig {
13       /** Field name from API response */
14       field: string;
15
16       /** Display label in grid header */
17       label: string;
18
19       /** Column width in pixels */
20       width?: number;
21
22       /** Flex grow (if width not set) */
23       flex?: number;
24
25       /** Column type: 'string' | 'number' | 'boolean' | 'date' | 'currency
26       type?: 'string' | 'number' | 'boolean' | 'date' | 'currency';
27
28       /** Text align: 'left' | 'center' | 'right' */
29       align?: 'left' | 'center' | 'right';
30
31       /** Is column sortable? Default: true */
32       sortable?: boolean;
33
34       /** Is column filterable? Default: true */   ⟪partially occluded by notification bar⟫


========== IMG_1863.md ==========
---
photo: IMG_1863.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 28-60 (sticky scroll: 12)
orientation: 0
confidence: high
notes: Same file as IMG_1862, scrolled down. Sticky-scroll header shows line 12 "export interface ColumnConfig {". Tab shows "data-grid-config-registry.ts 1" (1 problem); status bar shows 3 errors 0 warnings now, "No Solution", branch hitanshu/experimental*. Explorer components folder expanded showing full component list incl. error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (marked U = untracked), radio.tsx, select.tsx, sub-header.tsx. src/components/data-grid have orange/red git dots. Line 28 partially cut by sticky header; line 60 partially cut by horizontal scrollbar.
---
Sticky: 12   export interface ColumnConfig {

28       /** Text align: 'left' | 'center' | 'right' */   ⟪top edge clipped⟫
29       align?: 'left' | 'center' | 'right';
30
31       /** Is column sortable? Default: true */
32       sortable?: boolean;
33
34       /** Is column filterable? Default: true */
35       filterable?: boolean;
36
37       /** Is column visible in grid? Default: true */
38       visible?: boolean;
39
40       /** Custom formatter function */
41       valueFormatter?: (value: any) => string;
42
43       /** Currency code for currency type fields (e.g., 'USD') */
44       currency?: string;
45   }
46
47   export interface GridConfigObject {
48       /** Unique config ID */
49       id: string;
50
51       /** Display name for this grid */
52       name: string;
53
54       /** XSL filename this config is based on */
55       xslFile: string;
56
57       /** Columns to display */
58       columns: ColumnConfig[];
59
60       /** Default page size for pagination */   ⟪bottom edge clipped by scrollbar⟫

Explorer (components/): data-grid (data-grid-config-regist... 1, data-grid-normalize.ts, data-grid.tsx), modal-dialog, tabView, action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx


========== IMG_1865.md ==========
---
photo: IMG_1865.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 47-107
orientation: 0
confidence: high
notes: Sticky scroll/breadcrumb shows "aqs-web-ui > src > components > data-grid > data-grid-config-registry.ts > ...". Only one tab open (data-grid-config-registry.ts). Explorer sidebar shows aqs-web-ui/src/components tree expanded: data-grid (data-grid-config-registry.ts selected, data-grid-normalize.ts, data-grid.tsx), modal-dialog (collapsed), tabView (collapsed), action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (marked U/untracked), radio.tsx, select.tsx, sub-header.tsx. Branch hitanshu/experimental* (dirty). Problems: 3 errors, 0 warnings. "No Solution" indicator. Line 88 tooltip comment text is truncated at right edge of editor (horizontal scroll indicator "›" visible) - full comment not visible. Copilot chat panel open on right showing session history (unrelated).
---
47      export interface GridConfigObject {
    ⟪... lines 48-75 not visible, editor scrolled ...⟫
76          };
77
78          /** Fields to hide from display but keep in row data */
79          hiddenFields?: string[];
80
81          /** Row ID field - which field contains unique identifier */
82          rowIdField?: string;
83
84          /** Path to data array in response (e.g., "Page.LOB" or "policy") */
85          dataPath?: string;
86
87          /** Tooltip configuration (optional - only if XSL has tooltip logic) ⟪truncated, text continues off-screen⟫
88          tooltip?: {
89              /** Whether to show tooltip on row hover */
90              visible?: boolean;
91              /** Field to display in tooltip */
92              field: string;
93              /** Tooltip prefix text (e.g., "PolicyId: " will be prepended to ⟪truncated, text continues off-screen⟫
94              prefix?: string;
95          };
96      }
97
98      /**
99       * Grid Config Registry - All available grid configurations
100      *
101      * To add a new grid:
102      * 1. Analyze the XSL file to get column names, widths, alignment
103      * 2. Create a new ColumnConfig entry for each column
104      * 3. Add to GRID_CONFIG_REGISTRY below
105      * 4. Use gridConfig.id when rendering UniversalGrid
106      */
107     export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {


========== IMG_1864.md ==========
---
photo: IMG_1864.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 57-89 (sticky scroll: 47)
orientation: 0
confidence: high
notes: Same file, scrolled further. Sticky header line 47 "export interface GridConfigObject {". Line 75 "React" has red squiggle under React.ReactNode (likely missing import — matches 3 errors in status bar). Tab "data-grid-config-registry.ts 1". Status: 3 errors 0 warnings, No Solution, hitanshu/experimental*, Ln 1 Col 1, TypeScript. Line 57 clipped by sticky header; line 89 clipped by scrollbar. Explorer same components list, PolicyLobGrid.tsx (U).
---
Sticky: 47   export interface GridConfigObject {

57       /** Columns to display */   ⟪top edge clipped⟫
58       columns: ColumnConfig[];
59
60       /** Default page size for pagination */
61       pageSize?: number;
62
63       /** Default sort field */
64       defaultSortField?: string;
65
66       /** Default sort order: 'asc' | 'desc' */
67       defaultSortOrder?: 'asc' | 'desc';
68
69       /** Footer config for totals */
70       footer?: {
71           visible: boolean;
72           /** Field names to calculate totals for */
73           totalFields?: string[];
74           /** Custom footer template - can override */
75           template?: (data: any) => React.ReactNode;   ⟪red squiggle under React⟫
76       };
77
78       /** Fields to hide from display but keep in row data */
79       hiddenFields?: string[];
80
81       /** Row ID field - which field contains unique identifier */
82       rowIdField?: string;
83
84       /** Path to data array in response (e.g., "Page.LOB" or "policy") */
85       dataPath?: string;
86
87       /** Tooltip configuration (optional - only if XSL has tooltip logic) */
88       tooltip?: {
89           /** Whether to show tooltip on row hover */   ⟪bottom edge clipped by scrollbar⟫


========== IMG_1866.md ==========
---
photo: IMG_1866.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 98-131
orientation: 0
confidence: high
notes: Same file/tab as IMG_1865, editor scrolled down further. Explorer sidebar same tree as IMG_1865 (data-grid-config-registry.ts selected). Branch hitanshu/experimental*. Problems 3 errors 0 warnings, "No Solution". Copilot chat panel open on right (unrelated). Cursor visible after "Page.L" on line 115 (dataPath value).
---
98      /**
99       * Grid Config Registry - All available grid configurations
100      *
101      * To add a new grid:
102      * 1. Analyze the XSL file to get column names, widths, alignment
103      * 2. Create a new ColumnConfig entry for each column
104      * 3. Add to GRID_CONFIG_REGISTRY below
105      * 4. Use gridConfig.id when rendering UniversalGrid
106      */
107     export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
108         // ============================================================
109         // LOB SUMMARY GRID
110         // ============================================================
111         LOB_SUMMARY: {
112             id: 'LOB_SUMMARY',
113             name: 'LOB Summary',
114             xslFile: 'LobSummary_ISLLPOL_20010101.xsl',
115             dataPath: 'Page.LOB',
116             columns: [
117                 {
118                     field: 'text',
119                     label: 'Line of Business',
120                     width: 430,
121                     type: 'string',
122                     align: 'left',
123                     sortable: false,
124                     filterable: false,
125                 },
126                 {
127                     field: 'units',
128                     label: 'Units',
129                     width: 150,
130                     type: 'number',
131                     align: 'center',


========== IMG_1867.md ==========
---
photo: IMG_1867.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 107-155
orientation: 0
confidence: high
notes: Same file/tab, scrolled further down. Sticky-scroll headers at top show enclosing scope lines 107, 111, 116 (repeated, not part of contiguous visible block - listed separately below). Main visible contiguous block is lines 125-155 (155 partially cut off at bottom, only "footer: {" visible). Line 135 valueFormatter arrow function truncated at right edge of editor (horizontal scroll). Explorer sidebar same as prior photos. Branch hitanshu/experimental*, Problems 3 errors 0 warnings, "No Solution".
---
Sticky-scroll header lines (enclosing scope, repeated from earlier in file):
107     export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
111         LOB_SUMMARY: {
116         columns: [

Main visible code:
125             },
126             {
127                 field: 'units',
128                 label: 'Units',
129                 width: 150,
130                 type: 'number',
131                 align: 'center',
132                 sortable: false,
133                 filterable: false,
134                 valueFormatter: (value) => (Number.isFinite(value) ? value ⟪truncated, text continues off-screen⟫
135             },
136             {
137                 field: 'premium',
138                 label: 'Premium',
139                 width: 150,
140                 type: 'number',
141                 align: 'right',
142                 sortable: false,
143                 filterable: false,
144                 valueFormatter: (value) =>
145                     '$' +
146                     Number(value ?? 0).toLocaleString(undefined, {
147                         minimumFractionDigits: 2,
148                         maximumFractionDigits: 2,
149                     }),
150             },
151         ],
152         pageSize: 25,
153         defaultSortField: 'sequencer',
154         defaultSortOrder: 'asc',
155         footer: {


========== IMG_1879.md ==========
---
photo: IMG_1879.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 107-318
orientation: 0
confidence: high
notes: Same file/tab as IMG_1865-1867, editor scrolled much further down into a new config block "WIP_SERVICES". Sticky-scroll headers at top show enclosing scope lines 107, 221, 226 (repeated context, not contiguous with visible block). Main contiguous visible block is lines 288-318 (318 partially cut off at bottom, only "pageSize: 10," visible). Explorer sidebar unchanged. Branch hitanshu/experimental*, Problems 3 errors 0 warnings, "No Solution".
---
Sticky-scroll header lines (enclosing scope, repeated from earlier in file):
107     export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
221         WIP_SERVICES: {
226             columns: [

Main visible code:
288                 filterable: true,
289             },
290             {
291                 field: 'owner',
292                 label: 'Owner',
293                 width: 85,
294                 type: 'string',
295                 align: 'left',
296                 sortable: true,
297                 filterable: true,
298             },
299             {
300                 field: 'policytype',
301                 label: 'Policy Type',
302                 width: 100,
303                 type: 'string',
304                 align: 'left',
305                 sortable: true,
306                 filterable: true,
307             },
308             {
309                 field: 'description',
310                 label: 'Remarks',
311                 width: 345,
312                 type: 'string',
313                 align: 'left',
314                 sortable: true,
315                 filterable: true,
316             },
317         ],
318         pageSize: 10,


========== IMG_1868.md ==========
---
photo: IMG_1868.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 138-168
orientation: 0
confidence: high
notes: Sticky-scroll headers show lines 107/111/116. Tab "data-grid-config-registry.ts 1" (1 problem badge). Explorer visible: aqs-web-ui/src/components/data-grid (data-grid-config-regist...ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog, tabView folders; action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U git marker), radio.tsx, select.tsx, sub-header.tsx. Bottom panels: OUTLINE, TIMELINE, C# PROJECT DETAILS. Status bar: branch hitanshu/experimental*, 3 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript. VS Code Chat sidebar open (sessions: "Analysis of OK button functionality in AQ...", "Analysis of Global Components in React R...", "Comparing and Modifying Routing Files i..."). Taskbar clock 4:28 PM 7/10/2026. Line 168 partially occluded by horizontal scrollbar but legible.
---
Sticky scroll headers:
107  export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
111      LOB_SUMMARY: {
116          columns: [

138                  label: 'Premium',
139                  width: 150,
140                  type: 'number',
141                  align: 'right',
142                  sortable: false,
143                  filterable: false,
144                  valueFormatter: (value) =>
145                      '$' +
146                      Number(value ?? 0).toLocaleString(undefined, {
147                          minimumFractionDigits: 2,
148                          maximumFractionDigits: 2,
149                      }),
150              },
151          ],
152          pageSize: 25,
153          defaultSortField: 'sequencer',
154          defaultSortOrder: 'asc',
155          footer: {
156              visible: true,
157              totalFields: ['premium'],
158          },
159          rowIdField: 'sequencer',
160      },
161
162      // ============================================================
163      // INSURED DETAILS GRID
164      // ============================================================
165      INSURED_DETAILS: {
166          id: 'INSURED_DETAILS',
167          name: 'Insured Details',
168          xslFile: 'AddNamInsLst_ISLLPOL_20010101.xsl',


========== IMG_1869.md ==========
---
photo: IMG_1869.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 153-184
orientation: 0
confidence: high
notes: Same session as IMG_1868, scrolled down. Sticky-scroll headers lines 107/111 (LOB_SUMMARY still shown at 111 though content is past it). Overlaps IMG_1868 lines 153-168. Line 184 partially cut by horizontal scrollbar ("type: 'string'"). Red dot in minimap near line ~160 area. Explorer/status bar identical to IMG_1868 (branch hitanshu/experimental*, 3 errors, No Solution, TypeScript). Clock 4:28 PM 7/10/2026.
---
Sticky scroll headers:
107  export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
111      LOB_SUMMARY: {

153          defaultSortField: 'sequencer',
154          defaultSortOrder: 'asc',
155          footer: {
156              visible: true,
157              totalFields: ['premium'],
158          },
159          rowIdField: 'sequencer',
160      },
161
162      // ============================================================
163      // INSURED DETAILS GRID
164      // ============================================================
165      INSURED_DETAILS: {
166          id: 'INSURED_DETAILS',
167          name: 'Insured Details',
168          xslFile: 'AddNamInsLst_ISLLPOL_20010101.xsl',
169          dataPath: 'policy',
170          columns: [
171              {
172                  field: 'sequencer',
173                  label: 'Order #',
174                  width: 105,
175                  type: 'number',
176                  align: 'right',
177                  sortable: true,
178                  filterable: false,
179              },
180              {
181                  field: 'insuredname',
182                  label: 'Named Insured',
183                  width: 270,
184                  type: 'string'⟪?⟫


========== IMG_1870.md ==========
---
photo: IMG_1870.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 169-199
orientation: 0
confidence: high
notes: Continuation of IMG_1869 (overlaps 169-184). Sticky-scroll headers lines 107/165. Line 200 hidden by horizontal scrollbar (line after 199 shows partial "label: ..." cut off). Note line 190-191: field 'policynumber' labeled 'Secondary Name'. Status bar same (hitanshu/experimental*, 3 errors, No Solution). Clock 4:29 PM 7/10/2026.
---
Sticky scroll headers:
107  export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
165      INSURED_DETAILS: {

169          dataPath: 'policy',
170          columns: [
171              {
172                  field: 'sequencer',
173                  label: 'Order #',
174                  width: 105,
175                  type: 'number',
176                  align: 'right',
177                  sortable: true,
178                  filterable: false,
179              },
180              {
181                  field: 'insuredname',
182                  label: 'Named Insured',
183                  width: 270,
184                  type: 'string',
185                  align: 'left',
186                  sortable: true,
187                  filterable: false,
188              },
189              {
190                  field: 'policynumber',
191                  label: 'Secondary Name',
192                  width: 270,
193                  type: 'string',
194                  align: 'left',
195                  sortable: true,
196                  filterable: false,
197              },
198              {
199                  field: 'productcode',


========== IMG_1871.md ==========
---
photo: IMG_1871.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 186-215
orientation: 0
confidence: high
notes: Continuation (overlaps IMG_1870 lines 186-199). Sticky-scroll headers lines 107/165/170. Line 186 top row partially hidden behind sticky header (shows "align: 'left'," faintly cut — marked). Line 215 partially over horizontal scrollbar but legible. INSURED_DETAILS grid: pageSize 10, rowIdField 'policyid', footer totalFields empty []. Red dot in minimap ~line 195 region. Status bar same. Clock 4:29 PM 7/10/2026.
---
Sticky scroll headers:
107  export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
165      INSURED_DETAILS: {
170          columns: [

185                  ⟪align: 'left',⟫ (mostly hidden under sticky header)
186                  sortable: true,
187                  filterable: false,
188              },
189              {
190                  field: 'policynumber',
191                  label: 'Secondary Name',
192                  width: 270,
193                  type: 'string',
194                  align: 'left',
195                  sortable: true,
196                  filterable: false,
197              },
198              {
199                  field: 'productcode',
200                  label: 'Misc Name',
201                  width: 270,
202                  type: 'string',
203                  align: 'left',
204                  sortable: false,
205                  filterable: false,
206              },
207          ],
208          pageSize: 10,
209          defaultSortField: 'sequencer',
210          defaultSortOrder: 'asc',
211          footer: {
212              visible: true,
213              totalFields: [],
214          },
215          rowIdField: 'policyid',


========== IMG_1872.md ==========
---
photo: IMG_1872.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 193-223
orientation: 0
confidence: high
notes: Continuation (overlaps IMG_1871 lines 193-215). Sticky-scroll headers lines 107/165/170. Line 193 mostly hidden under sticky header (partial "type: 'string'," visible). Line 223 sits over the horizontal scrollbar but legible. Starts WORK IN PROGRESS SERVICES GRID section (WIP_SERVICES) at 221. Status bar same (hitanshu/experimental*, 3 errors, No Solution). Clock 4:29 PM 7/10/2026.
---
Sticky scroll headers:
107  export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
165      INSURED_DETAILS: {
170          columns: [

193                  ⟪type: 'string',⟫ (partially hidden under sticky header)
194                  align: 'left',
195                  sortable: true,
196                  filterable: false,
197              },
198              {
199                  field: 'productcode',
200                  label: 'Misc Name',
201                  width: 270,
202                  type: 'string',
203                  align: 'left',
204                  sortable: false,
205                  filterable: false,
206              },
207          ],
208          pageSize: 10,
209          defaultSortField: 'sequencer',
210          defaultSortOrder: 'asc',
211          footer: {
212              visible: true,
213              totalFields: [],
214          },
215          rowIdField: 'policyid',
216      },
217
218      // ============================================================
219      // WORK IN PROGRESS SERVICES GRID
220      // ============================================================
221      WIP_SERVICES: {
222          id: 'WIP_SERVICES',
223          name: 'Work In Progress Services',


========== IMG_1873.md ==========
---
photo: IMG_1873.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 207-236
orientation: 0
confidence: high
notes: Continuation (overlaps IMG_1872 lines 207-223). Sticky-scroll headers lines 107/165/170. Line 207 partial under sticky header ("]," and remnants of "},"). WIP_SERVICES grid: xslFile 'WipSerLst_PIPHPOL_20010101.xsl', dataPath 'policy', first column policynumber/'Policy'. Line 236 is just "{" above horizontal scrollbar. Status bar same. Clock 4:29 PM 7/10/2026.
---
Sticky scroll headers:
107  export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
165      INSURED_DETAILS: {
170          columns: [

207          ],
208          pageSize: 10,
209          defaultSortField: 'sequencer',
210          defaultSortOrder: 'asc',
211          footer: {
212              visible: true,
213              totalFields: [],
214          },
215          rowIdField: 'policyid',
216      },
217
218      // ============================================================
219      // WORK IN PROGRESS SERVICES GRID
220      // ============================================================
221      WIP_SERVICES: {
222          id: 'WIP_SERVICES',
223          name: 'Work In Progress Services',
224          xslFile: 'WipSerLst_PIPHPOL_20010101.xsl',
225          dataPath: 'policy',
226          columns: [
227              {
228                  field: 'policynumber',
229                  label: 'Policy',
230                  width: 85,
231                  type: 'string',
232                  align: 'left',
233                  sortable: true,
234                  filterable: false,
235              },
236              {


========== IMG_1874.md ==========
---
photo: IMG_1874.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 207-236
orientation: 0
confidence: high
notes: Near-duplicate retake of IMG_1873 — identical viewport (lines 207-236), identical content. Sticky-scroll headers lines 107/165/170. Line 207 partial under sticky header. Line 236 is "{" above horizontal scrollbar. Status bar same (hitanshu/experimental*, 3 errors, No Solution, TypeScript). Clock 4:29 PM 7/10/2026.
---
Sticky scroll headers:
107  export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
165      INSURED_DETAILS: {
170          columns: [

207          ],
208          pageSize: 10,
209          defaultSortField: 'sequencer',
210          defaultSortOrder: 'asc',
211          footer: {
212              visible: true,
213              totalFields: [],
214          },
215          rowIdField: 'policyid',
216      },
217
218      // ============================================================
219      // WORK IN PROGRESS SERVICES GRID
220      // ============================================================
221      WIP_SERVICES: {
222          id: 'WIP_SERVICES',
223          name: 'Work In Progress Services',
224          xslFile: 'WipSerLst_PIPHPOL_20010101.xsl',
225          dataPath: 'policy',
226          columns: [
227              {
228                  field: 'policynumber',
229                  label: 'Policy',
230                  width: 85,
231                  type: 'string',
232                  align: 'left',
233                  sortable: true,
234                  filterable: false,
235              },
236              {


========== IMG_1875.md ==========
---
photo: IMG_1875.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 236-265
orientation: 0
confidence: high
notes: Continuation. Sticky-scroll headers now lines 107/221/226 (inside WIP_SERVICES columns). Line 235 remnant ("},") hidden under sticky header; line 236 "{" first fully visible. WIP_SERVICES columns: productcode/'Product Code' (filterable true), insuredname/'Insured Name', externalid/'Path ID', workflowstatus/'Status' (starts at 264, cut at 265 by scrollbar). Status bar same. Clock 4:29 PM 7/10/2026.
---
Sticky scroll headers:
107  export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
221      WIP_SERVICES: {
226          columns: [

236              {
237                  field: 'productcode',
238                  label: 'Product Code',
239                  width: 155,
240                  type: 'string',
241                  align: 'left',
242                  sortable: true,
243                  filterable: true,
244              },
245              {
246                  field: 'insuredname',
247                  label: 'Insured Name',
248                  width: 155,
249                  type: 'string',
250                  align: 'left',
251                  sortable: true,
252                  filterable: true,
253              },
254              {
255                  field: 'externalid',
256                  label: 'Path ID',
257                  width: 85,
258                  type: 'string',
259                  align: 'left',
260                  sortable: true,
261                  filterable: true,
262              },
263              {
264                  field: 'workflowstatus',
265                  label: 'Status',


========== IMG_1876.md ==========
---
photo: IMG_1876.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 249-278
orientation: 0
confidence: high
notes: Continuation (overlaps IMG_1875 lines 249-265). Sticky-scroll headers lines 107/221/226. Line 248 hidden under sticky header. New column at 273: primarytransaction/'Transaction' width 93. Line 278 "sortable: true," sits on horizontal scrollbar, legible; next line cut. Status bar same (hitanshu/experimental*, 3 errors, No Solution). Clock 4:29 PM 7/10/2026.
---
Sticky scroll headers:
107  export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
221      WIP_SERVICES: {
226          columns: [

249                  type: 'string',
250                  align: 'left',
251                  sortable: true,
252                  filterable: true,
253              },
254              {
255                  field: 'externalid',
256                  label: 'Path ID',
257                  width: 85,
258                  type: 'string',
259                  align: 'left',
260                  sortable: true,
261                  filterable: true,
262              },
263              {
264                  field: 'workflowstatus',
265                  label: 'Status',
266                  width: 100,
267                  type: 'string',
268                  align: 'left',
269                  sortable: true,
270                  filterable: true,
271              },
272              {
273                  field: 'primarytransaction',
274                  label: 'Transaction',
275                  width: 93,
276                  type: 'string',
277                  align: 'left',
278                  sortable: true,


========== IMG_1877.md ==========
---
photo: IMG_1877.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 262-292
orientation: 0
confidence: high
notes: Continuation (overlaps IMG_1876 lines 262-278). Sticky-scroll headers lines 107/221/226. New columns: effdate/'Eff Date' width 70, owner starts at 291. Line 292 mostly cut by horizontal scrollbar (partial "label: 'Owner'"). Status bar same (hitanshu/experimental*, 3 errors, No Solution). Clock 4:29 PM 7/10/2026.
---
Sticky scroll headers:
107  export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
221      WIP_SERVICES: {
226          columns: [

262              },
263              {
264                  field: 'workflowstatus',
265                  label: 'Status',
266                  width: 100,
267                  type: 'string',
268                  align: 'left',
269                  sortable: true,
270                  filterable: true,
271              },
272              {
273                  field: 'primarytransaction',
274                  label: 'Transaction',
275                  width: 93,
276                  type: 'string',
277                  align: 'left',
278                  sortable: true,
279                  filterable: true,
280              },
281              {
282                  field: 'effdate',
283                  label: 'Eff Date',
284                  width: 70,
285                  type: 'string',
286                  align: 'left',
287                  sortable: true,
288                  filterable: true,
289              },
290              {
291                  field: 'owner',
292                  ⟪label: 'Owner',⟫ (mostly cut by scrollbar)


========== IMG_1878.md ==========
---
photo: IMG_1878.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 272-302
orientation: 0
confidence: high
notes: Continuation (overlaps IMG_1877 lines 272-292). Sticky-scroll headers lines 107/221/226. Line 272 shows only "{" remnant under sticky header. New columns: owner/'Owner' width 85, policytype/'Policy Type' width 100 (starts 300; 302 "width: 100," sits on scrollbar, legible). Status bar same (hitanshu/experimental*, 3 errors, No Solution). Clock partially cut ~4:2x PM 7/10/2026.
---
Sticky scroll headers:
107  export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
221      WIP_SERVICES: {
226          columns: [

272              {
273                  field: 'primarytransaction',
274                  label: 'Transaction',
275                  width: 93,
276                  type: 'string',
277                  align: 'left',
278                  sortable: true,
279                  filterable: true,
280              },
281              {
282                  field: 'effdate',
283                  label: 'Eff Date',
284                  width: 70,
285                  type: 'string',
286                  align: 'left',
287                  sortable: true,
288                  filterable: true,
289              },
290              {
291                  field: 'owner',
292                  label: 'Owner',
293                  width: 85,
294                  type: 'string',
295                  align: 'left',
296                  sortable: true,
297                  filterable: true,
298              },
299              {
300                  field: 'policytype',
301                  label: 'Policy Type',
302                  width: 100,


========== IMG_1880.md ==========
---
photo: IMG_1880.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 306-336
orientation: 0
confidence: high
notes: Sticky-scroll headers show lines 107, 221, 226 (enclosing scope). Line 306 clipped by sticky scroll, only trailing "," fragment visible. Tab bar shows data-grid-config-registry.ts (1 problem badge). Explorer sidebar visible: aqs-web-ui/src/components/data-grid/{data-grid-config-regist...ts (1), data-grid-normalize.ts, data-grid.tsx}, modal-dialog/, tabView/, action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U = untracked), radio.tsx, select.tsx, sub-header.tsx; also OUTLINE, TIMELINE, C# PROJECT DETAILS sections. Status bar: branch hitanshu/experimental*, 3 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8 CRLF, TypeScript. Copilot/Claude-style CHAT panel on right (sessions: "Analysis of OK button functionality in AQ...", "Analysis of Global Components in React R...", "Comparing and Modifying Routing Files i..." — 4 mos ago). Text cursor visible on line 320. Windows taskbar clock 4:29 PM 7/10/2026. Source-control badge 27.
---
Sticky scroll (context, real line numbers):
107	export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
221	    WIP_SERVICES: {
226	        columns: [

306	            ⟪clipped by sticky scroll — only trailing "," visible⟫
307	            },
308	            {
309	                field: 'description',
310	                label: 'Remarks',
311	                width: 345,
312	                type: 'string',
313	                align: 'left',
314	                sortable: true,
315	                filterable: true,
316	            },
317	        ],
318	        pageSize: 10,
319	        defaultSortField: 'policynumber',
320	        defaultSortOrder: 'asc',
321	        footer: {
322	            visible: true,
323	            totalFields: [],
324	        },
325	        rowIdField: 'sequencer',
326	        tooltip: {
327	            visible: true,
328	            field: 'policyid',
329	            prefix: 'PolicyId: ',
330	        },
331	    },
332	
333	    // ================================================================
334	    // POLICY LIST GRID (Example - add your own here)
335	    // ================================================================
336	    // POLICY_LIST: {


========== IMG_1881.md ==========
---
photo: IMG_1881.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 322-352
orientation: 0
confidence: high
notes: Same file as IMG_1880, scrolled down. Sticky-scroll headers show lines 107, 221, 321. Line 322 clipped by sticky (only "visible: true," faintly visible). Lines 341-344 truncated at right edge by editor/chat-panel boundary — marked with ⟪cut⟫. Tab bar: data-grid-config-registry.ts (1 problem). Explorer sidebar same as IMG_1880 (PolicyLobGrid.tsx marked U). Status bar: hitanshu/experimental*, 3 errors 0 warnings, No Solution, Ln 1 Col 1, TypeScript. Chat panel right with same session list. Cursor rendered near line 336-337. Clock 4:29 PM 7/10/2026.
---
Sticky scroll (context, real line numbers):
107	export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
221	    WIP_SERVICES: {
321	        footer: {

322	            ⟪clipped by sticky scroll — "visible: true," faintly visible⟫
323	            totalFields: [],
324	        },
325	        rowIdField: 'sequencer',
326	        tooltip: {
327	            visible: true,
328	            field: 'policyid',
329	            prefix: 'PolicyId: ',
330	        },
331	    },
332	
333	    // ================================================================
334	    // POLICY LIST GRID (Example - add your own here)
335	    // ================================================================
336	    // POLICY_LIST: {
337	    //   id: 'POLICY_LIST',
338	    //   name: 'Policy List',
339	    //   xslFile: 'PolicyList_ISLLPOL_20010101.xsl',
340	    //   columns: [
341	    //     { field: 'policynumber', label: 'Policy Number', width: 150, ty⟪cut off at right edge⟫
342	    //     { field: 'insuredname', label: 'Insured Name', flex: 1, type: ⟪cut off at right edge⟫
343	    //     { field: 'effectivedate', label: 'Effective Date', width: 120, ⟪cut off at right edge⟫
344	    //     { field: 'premium', label: 'Premium', width: 120, type: 'currer⟪cut off at right edge — likely 'currency'⟫
345	    //   ],
346	    //   pageSize: 10,
347	    //   rowIdField: 'policynumber',
348	    // },
349	};
350	
351	/**
352	 * Get grid config by XSL filename


========== IMG_1882.md ==========
---
photo: IMG_1882.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 341-373
orientation: 0
confidence: high
notes: Same file, scrolled further. Sticky-scroll header shows only line 107. Line 341 clipped by sticky — faintly reads "// { field: 'policynumber', label: 'Policy Number', width: 150, type: 'string' },". Chat panel closed so full line widths now visible (completes lines truncated in IMG_1881). Line 358 ends "|| null" partially at right edge (null confirmed legible). Explorer sidebar same as before (PolicyLobGrid.tsx U). Status bar: hitanshu/experimental*, 3 errors 0 warnings, No Solution, Ln 1 Col 1, TypeScript. Clock 4:29 PM 7/10/2026.
---
Sticky scroll (context, real line numbers):
107	export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {

341	    //     ⟪clipped by sticky — faint: { field: 'policynumber', label: 'Policy Number', width: 150, type: 'string' },⟫
342	    //     { field: 'insuredname', label: 'Insured Name', flex: 1, type: 'string' },
343	    //     { field: 'effectivedate', label: 'Effective Date', width: 120, type: 'date' },
344	    //     { field: 'premium', label: 'Premium', width: 120, type: 'currency', align: 'right' },
345	    //   ],
346	    //   pageSize: 10,
347	    //   rowIdField: 'policynumber',
348	    // },
349	};
350	
351	/**
352	 * Get grid config by XSL filename
353	 * @param xslFileName - XSL filename (e.g., 'LobSummary_ISLLPOL_20010101.xsl')
354	 * @returns GridConfigObject if found
355	 */
356	export function getGridConfigByXsL(xslFileName: string): GridConfigObject | null {
357	    return (
358	        Object.values(GRID_CONFIG_REGISTRY).find((config) => config.xslFile === xslFileName) || null
359	    );
360	}
361	
362	/**
363	 * Get grid config by config ID
364	 * @param configId - Config ID (e.g., 'LOB_SUMMARY')
365	 * @returns GridConfigObject if found
366	 */
367	export function getGridConfig(configId: string): GridConfigObject | null {
368	    return GRID_CONFIG_REGISTRY[configId] || null;
369	}
370	
371	/**
372	 * List all available grid configurations
373	 */


========== IMG_1883.md ==========
---
photo: IMG_1883.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-config-registry.ts
lines: 357-377
orientation: 0
confidence: high
notes: End of file (last line 377). Sticky-scroll header shows line 356 (getGridConfigByXsL signature). Line 357 partially clipped by sticky ("return (" visible). Explorer sidebar same as prior photos (data-grid folder expanded; PolicyLobGrid.tsx U). Tab: data-grid-config-registry.ts (1 problem). Status bar: hitanshu/experimental*, 3 errors 0 warnings, No Solution, Ln 1 Col 1, TypeScript. Clock 4:29 PM 7/10/2026. Overlaps with IMG_1882 for lines 357-373.
---
Sticky scroll (context, real line numbers):
356	export function getGridConfigByXsL(xslFileName: string): GridConfigObject | null {

357	    return (
358	        Object.values(GRID_CONFIG_REGISTRY).find((config) => config.xslFile === xslFileName) || null
359	    );
360	}
361	
362	/**
363	 * Get grid config by config ID
364	 * @param configId - Config ID (e.g., 'LOB_SUMMARY')
365	 * @returns GridConfigObject if found
366	 */
367	export function getGridConfig(configId: string): GridConfigObject | null {
368	    return GRID_CONFIG_REGISTRY[configId] || null;
369	}
370	
371	/**
372	 * List all available grid configurations
373	 */
374	export function listGridConfigs(): GridConfigObject[] {
375	    return Object.values(GRID_CONFIG_REGISTRY);
376	}
377	
