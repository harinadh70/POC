# BUNDLE for src/components/data-grid/data-grid.tsx
# 15 photo fragment(s), ascending start-line order.


========== IMG_1889.md ==========
---
photo: IMG_1889.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 1-34
orientation: 0
confidence: high
notes: New file/tab - data-grid.tsx now open and selected in Explorer (tab shows "9+" unsaved-changes badge). Line 34 at bottom is cut off ("<GridToolbarColumnsButton />" partially visible under status bar). Explorer sidebar: data-grid folder shows data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx (selected, "9+"). Branch hitanshu/experimental*, Problems now 13 errors, 0 warnings (up from 3 in earlier photos), "No Solution". Timestamp 4:30 PM. File header comment says "// components/common-grid.tsx" even though file is named data-grid.tsx (likely stale comment/rename artifact - noted verbatim).
---
1       // components/common-grid.tsx
2       /**
3        * Universal Grid Component
4        *
5        * A reusable grid component that works with any grid configuration.
6        * Maps grid config to MUI DataGrid columns and handles data rendering.
7        *
8        * Usage:
9        * <common-grid gridConfig={config} data={apiResponse} onRowClick={handleRowClick} />
10      */
11
12      import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
13      import { Box } from '@mui/material';
14      import {
15          DataGrid as MuiDataGrid,
16          GridToolbarColumnsButton,
17          GridToolbarContainer,
18          GridToolbarDensitySelector,
19          GridToolbarExport,
20          GridToolbarQuickFilter,
21      } from '@mui/x-data-grid';
22      import type { DataGridProps, GridColDef, GridRowParams } from '@mui/x-data-grid';
23
24      import type { GridConfigObject } from '@components/data-grid/data-grid-config-registry';
25      import { normalizeGridResponse, type GenericRow } from '@components/data-grid/data-grid-normalize';
26      import { Theme } from '@/constants/theme';
27
28      /** Toolbar */
29      function GridToolbar() {
30          return (
31              <GridToolbarContainer>
32                  <GridToolbarQuickFilter debounceMs={400} />
33                  <Box sx={{ flexGrow: 1 }} />
34                  <GridToolbarColumnsButton />


========== IMG_1890.md ==========
---
photo: IMG_1890.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 17-49
orientation: 0
confidence: high
notes: Same file/tab as IMG_1889 (data-grid.tsx), scrolled down slightly showing lines 17-49 (49 cut off at bottom by status bar, only "return (" visible, line 50 not visible). Photo taken at an angle causing some perspective skew on long import lines (24-26) that made them briefly look like they had an extra wrapped row; cross-checked against IMG_1889 (clearer photo of the same lines) and transcribed to match exactly - high confidence. Explorer sidebar unchanged, data-grid.tsx selected ("9+" unsaved badge). Branch hitanshu/experimental*, Problems 13 errors 0 warnings, "No Solution". Timestamp 4:30 PM.
---
17          GridToolbarContainer,
18          GridToolbarDensitySelector,
19          GridToolbarExport,
20          GridToolbarQuickFilter,
21      } from '@mui/x-data-grid';
22      import type { DataGridProps, GridColDef, GridRowParams } from '@mui/x-data-grid';
23
24      import type { GridConfigObject } from '@components/data-grid/data-grid-config-registry';
25      import { normalizeGridResponse, type GenericRow } from '@components/data-grid/data-grid-normalize';
26      import { Theme } from '@/constants/theme';
27
28      /** Toolbar */
29      function GridToolbar() {
30          return (
31              <GridToolbarContainer>
32                  <GridToolbarQuickFilter debounceMs={400} />
33                  <Box sx={{ flexGrow: 1 }} />
34                  <GridToolbarColumnsButton />
35                  <GridToolbarDensitySelector />
36                  <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
37              </GridToolbarContainer>
38          );
39      }
40
41      /** Footer with totals */
42      function TotalsFooter({
43          totalUnits,
44          totalPremium,
45      }: {
46          totalUnits?: number;
47          totalPremium?: number;
48      }) {
49          return (


========== IMG_1891.md ==========
---
photo: IMG_1891.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 29-62
orientation: 0
confidence: high
notes: Same file/tab (data-grid.tsx), scrolled down further. Sticky-scroll header at top shows enclosing scope line 29 "function GridToolbar() {". Main contiguous visible block is lines 31-62 (line 63 barely visible/cut off at very bottom under status bar, only a fragment of gutter number visible, not transcribed). Explorer sidebar unchanged. Branch hitanshu/experimental*, Problems 13 errors 0 warnings, "No Solution". Timestamp 4:30 PM.
---
Sticky-scroll header line (enclosing scope):
29      function GridToolbar() {

Main visible code:
31          <GridToolbarContainer>
32              <GridToolbarQuickFilter debounceMs={400} />
33              <Box sx={{ flexGrow: 1 }} />
34              <GridToolbarColumnsButton />
35              <GridToolbarDensitySelector />
36              <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
37          </GridToolbarContainer>
38      );
39  }
40
41  /** Footer with totals */
42  function TotalsFooter({
43      totalUnits,
44      totalPremium,
45  }: {
46      totalUnits?: number;
47      totalPremium?: number;
48  }) {
49      return (
50          <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'flex-end', gap: 3, fontWeight: 500 }}>
51              {totalUnits !== undefined && <Box>Units: {totalUnits.toLocaleString()}</Box>}
52              {totalPremium !== undefined && (
53                  <Box>
54                      Premium: $
55                      {totalPremium.toLocaleString(undefined, {
56                          minimumFractionDigits: 2,
57                          maximumFractionDigits: 2,
58                      })}
59                  </Box>
60              )}
61          </Box>
62      );


========== IMG_1892.md ==========
---
photo: IMG_1892.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 42-76
orientation: 0
confidence: high
notes: Tab "data-grid.tsx 9+" (modified, 9+ problems badge). Breadcrumb aqs-web-ui > src > components > data-grid > data-grid.tsx. Gutter jumps 42→44 (row for line 43, presumably "totalUnits,", not visible — possible digit misread of 43 as 44). Line 76 partially cut at bottom edge. Status bar: branch hitanshu/experimental*, 13 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Explorer sidebar (data-grid folder): data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx (selected, 9+); modal-dialog and tabView folders; components files: action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U = untracked), radio.tsx, select.tsx, sub-header.tsx. Orange modified dots on aqs-web-ui/src/components/data-grid tree. Panels: OUTLINE, TIMELINE, C# PROJECT DETAILS. Taskbar clock 4:30 PM 7/10/2026.
---
42	function TotalsFooter({
44	    totalPremium,
45	}: {
46	    totalUnits?: number;
47	    totalPremium?: number;
48	}) {
49	    return (
50	        <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'flex-end', gap: 3, fontWeight: 500 }}>
51	            {totalUnits !== undefined && <Box>Units: {totalUnits.toLocaleString()}</Box>}
52	            {totalPremium !== undefined && (
53	                <Box>
54	                    Premium: $
55	                    {totalPremium.toLocaleString(undefined, {
56	                        minimumFractionDigits: 2,
57	                        maximumFractionDigits: 2,
58	                    })}
59	                </Box>
60	            )}
61	        </Box>
62	    );
63	}
64	
65	/**
66	 * Convert grid config columns to MUI GridColDef format
67	 */
68	function configToMuiColumns(config: GridConfigObject): GridColDef[] {
69	    return config.columns
70	        .filter((col) => col.visible !== false)
71	        .map((col) => ({
72	            field: col.field,
73	            headerName: col.label,
74	            width: col.width,
75	            flex: col.flex,
76	            type: col.type === 'currency' ? 'number' : col.type⟪?⟫


========== IMG_1893.md ==========
---
photo: IMG_1893.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 60-91
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 42 "function TotalsFooter({". Tab "data-grid.tsx 9+" modified. Overlaps IMG_1892 (lines 60-76). Line 92 partially visible at bottom cut off (likely 'slotProps'). Status bar: hitanshu/experimental*, 13 errors 0 warnings, No Solution, Ln 1 Col 1, TypeScript JSX. Same Explorer sidebar as IMG_1892 (PolicyLobGrid.tsx U). Taskbar 4:30 PM 7/10/2026.
---
42	function TotalsFooter({        [sticky scroll header]
60	            )}
61	        </Box>
62	    );
63	}
64	
65	/**
66	 * Convert grid config columns to MUI GridColDef format
67	 */
68	function configToMuiColumns(config: GridConfigObject): GridColDef[] {
69	    return config.columns
70	        .filter((col) => col.visible !== false)
71	        .map((col) => ({
72	            field: col.field,
73	            headerName: col.label,
74	            width: col.width,
75	            flex: col.flex,
76	            type: col.type === 'currency' ? 'number' : col.type,
77	            align: col.align as any,
78	            sortable: col.sortable !== false,
79	            filterable: col.filterable !== false,
80	            valueFormatter: col.valueFormatter
81	                ? ({ value }: { value: any }) => col.valueFormatter!(value)
82	                : undefined,
83	        }));
84	}
85	
86	export type CommonGridProps = Omit<
87	    DataGridProps<GenericRow>,
88	    | 'rows'
89	    | 'columns'
90	    | 'loading'
91	    | 'slots'
92	    | '⟪?⟫'   [cut off at bottom edge, likely 'slotProps']


========== IMG_1894.md ==========
---
photo: IMG_1894.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 79-110
orientation: 0
confidence: high
notes: Sticky-scroll headers show lines 68 "function configToMuiColumns(config: GridConfigObject): GridColDef[] {" and 71 ".map((col) => ({". Line 79 top row partially clipped by sticky header. Gutter/row pairing slightly skewed by the 2 sticky rows; numbering below reconciled with IMG_1893 which clearly shows 86=export, 91='slots'. Overlaps IMG_1893 (79-91). Tab data-grid.tsx 9+. Status bar: hitanshu/experimental*, 13 errors 0 warnings, No Solution, TypeScript JSX. Same Explorer sidebar as IMG_1892; PolicyLobGrid.tsx U. Line 110 is last fully visible row. Taskbar 4:30 PM 7/10/2026.
---
68	function configToMuiColumns(config: GridConfigObject): GridColDef[] {   [sticky scroll]
71	        .map((col) => ({                                                 [sticky scroll]
79	            filterable: col.filterable !== false,   [partially occluded by sticky rows]
80	            valueFormatter: col.valueFormatter
81	                ? ({ value }: { value: any }) => col.valueFormatter!(value)
82	                : undefined,
83	        }));
84	}
85	
86	export type CommonGridProps = Omit<
87	    DataGridProps<GenericRow>,
88	    | 'rows'
89	    | 'columns'
90	    | 'loading'
91	    | 'slots'
92	    | 'slotProps'
93	    | 'getRowId'
94	    | 'onRowClick'
95	    | 'checkboxSelection'
96	> & {
97	    /** Grid configuration (defines columns, formatting, etc.) */
98	    gridConfig: GridConfigObject;
99	
100	    /** Raw payload straight from the backend (any structure) */
101	    data: any;
102	
103	    /** Handle row click event */
104	    onRowClick?: (row: GenericRow) => void;
105	
106	    /** Show checkbox column */
107	    checkboxSelection?: boolean;
108	
109	    /** Container height (px or CSS string). Default: 480 */
110	    height?: number | string;


========== IMG_1895.md ==========
---
photo: IMG_1895.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 91-123
orientation: 0
confidence: high
notes: Sticky-scroll header line 86 "export type CommonGridProps = Omit<". Line 91 ('slots') mostly hidden behind sticky row. Overlaps IMG_1894 (91-110). Tab data-grid.tsx 9+. Status bar: hitanshu/experimental*, 13 errors 0 warnings, No Solution, TypeScript JSX. Same Explorer sidebar; PolicyLobGrid.tsx U. Taskbar 4:30 PM 7/10/2026.
---
86	export type CommonGridProps = Omit<   [sticky scroll]
91	    | 'slots'   [mostly occluded by sticky row]
92	    | 'slotProps'
93	    | 'getRowId'
94	    | 'onRowClick'
95	    | 'checkboxSelection'
96	> & {
97	    /** Grid configuration (defines columns, formatting, etc.) */
98	    gridConfig: GridConfigObject;
99	
100	    /** Raw payload straight from the backend (any structure) */
101	    data: any;
102	
103	    /** Handle row click event */
104	    onRowClick?: (row: GenericRow) => void;
105	
106	    /** Show checkbox column */
107	    checkboxSelection?: boolean;
108	
109	    /** Container height (px or CSS string). Default: 480 */
110	    height?: number | string;
111	};
112	
113	export function CommonDataGrid({
114	    gridConfig,
115	    data,
116	    onRowClick,
117	    checkboxSelection = false,
118	    height = 480,
119	    ...rest
120	}: CommonGridProps) {
121	    const { rows, totalUnits, totalPremium } = useMemo(
122	        () => normalizeGridResponse(data, gridConfig),
123	        [data, gridConfig],


========== IMG_1896.md ==========
---
photo: IMG_1896.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 111-144
orientation: 0
confidence: high
notes: Line 111 top row clipped ("};" partially visible). Spell-checker squiggle under "row" in rows.map((row) line 129. Overlaps IMG_1895 (111-123). Tab data-grid.tsx 9+. Status bar: hitanshu/experimental*, 13 errors 0 warnings, No Solution, TypeScript JSX. Same Explorer sidebar; PolicyLobGrid.tsx U. Taskbar 4:30 PM 7/10/2026.
---
111	};   [partially clipped at top]
112	
113	export function CommonDataGrid({
114	    gridConfig,
115	    data,
116	    onRowClick,
117	    checkboxSelection = false,
118	    height = 480,
119	    ...rest
120	}: CommonGridProps) {
121	    const { rows, totalUnits, totalPremium } = useMemo(
122	        () => normalizeGridResponse(data, gridConfig),
123	        [data, gridConfig],
124	    );
125	
126	    // Add tooltip to row data if tooltip config exists
127	    const rowsWithTooltips = useMemo(() => {
128	        if (!gridConfig.tooltip?.visible) return rows;
129	        return rows.map((row) => {
130	            const fieldValue = (row as any)[gridConfig.tooltip!.field];
131	            const tooltipText = fieldValue
132	                ? `${gridConfig.tooltip!.prefix || ''}${fieldValue}`
133	                : '';
134	            return {
135	                ...row,
136	                _tooltip: tooltipText,
137	            } as any;
138	        });
139	    }, [rows, gridConfig]);
140	
141	    const muiColumns = useMemo(() => configToMuiColumns(gridConfig), [gridConfig]);
142	
143	    // Track selected row (first row selected by default)
144	    const [selectedRowId, setSelectedRowId] = useState<any>(null);


========== IMG_1902.md ==========
---
photo: IMG_1902.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 113-232
orientation: 0
confidence: medium
notes: Same file/tab (data-grid.tsx), scrolled much further down into the CommonDataGrid component body/JSX return. Sticky-scroll header at top shows enclosing scope line 113 "export function CommonDataGrid({". Line 199 is largely occluded/illegible under the sticky-scroll shadow overlay - only a fragment "ref={gridRef}" is faintly readable, marked with ⟪?⟫ for the uncertain part. Main clearly visible block is lines 200-232; the last row's gutter number (232) is cut off by the status bar overlay but its code content is legible. Explorer sidebar unchanged, data-grid.tsx selected ("9+"). Branch hitanshu/experimental*, Problems 13 errors 0 warnings, "No Solution". Timestamp 4:30 PM.
---
Sticky-scroll header line (enclosing scope):
113     export function CommonDataGrid({

199     ⟪? occluded under sticky-scroll shadow⟫ ref={gridRef}
200         className="w-full h-full gridWrapper p-1! border-gray-100 border-2 mb-12!"
201     >
202
203         <MuiDataGrid<GenericRow>
204             rows={rowsWithTooltips}
205             columns={muiColumns}
206             disableRowSelectionOnClick
207             checkboxSelection={checkboxSelection}
208             onRowClick={handleRowClick}
209             slots={{
210                 toolbar: GridToolbar,
211                 footer: () => (
212                     <TotalsFooter totalUnits={totalUnits} totalPremium={totalPremium} />
213                 ),
214             }}
215             initialState={{
216                 pagination: { paginationModel: { pageSize: gridConfig.pageSize || 10 } },
217                 sorting: gridConfig.defaultSortField
218                     ? {
219                             sortModel: [
220                                 {
221                                     field: gridConfig.defaultSortField,
222                                     sort: gridConfig.defaultSortOrder || ('asc' as any),
223                                 },
224                             ],
225                       }
226                     : undefined,
227                 filter: { filterModel: { items: [] } },
228             }}
229             pageSizeOptions={[5, 10, 25, 50, 100]}
230             sx={{
231                 [`& .MuiDataGrid-row[data-id="${selectedRowId}"]`]: {
232     ⟪? line number cut off by status bar, content legible⟫     backgroundColor: Theme.colors.TERTIARY_CONTRAST,


========== IMG_1903.md ==========
---
photo: IMG_1903.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 113-240
orientation: 0
confidence: high
notes: Same file/tab (data-grid.tsx), scrolled slightly further than IMG_1902, showing the same sx block plus the rest of the CommonDataGrid function through end of file (line 240, end of function/file). Sticky-scroll header at top shows enclosing scope line 113 "export function CommonDataGrid({". This photo confirms/clarifies line 232 ("backgroundColor: Theme.colors.TERTIARY_CONTRAST,") which was partially cut off in IMG_1902. Explorer sidebar unchanged, data-grid.tsx selected ("9+"). Branch hitanshu/experimental*, Problems 13 errors 0 warnings, "No Solution". Timestamp 4:30 PM.
---
Sticky-scroll header line (enclosing scope):
113     export function CommonDataGrid({

Main visible code:
215             pagination: { paginationModel: { pageSize: gridConfig.pageSize || 10 } },
216             sorting: gridConfig.defaultSortField
217                 ? {
218                         sortModel: [
219                             {
220                                 field: gridConfig.defaultSortField,
221                                 sort: gridConfig.defaultSortOrder || ('asc' as any),
222                             },
223                         ],
224                   }
225                 : undefined,
226             filter: { filterModel: { items: [] } },
227         }}
228         pageSizeOptions={[5, 10, 25, 50, 100]}
229         sx={{
230             [`& .MuiDataGrid-row[data-id="${selectedRowId}"]`]: {
231                 backgroundColor: Theme.colors.TERTIARY_CONTRAST,
232                 fontWeight: 500,
233             },
234         }}
235         {...rest}
236                 />
237     </div>
238     );
239 }
240


========== IMG_1897.md ==========
---
photo: IMG_1897.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 126-157
orientation: 0
confidence: high
notes: Sticky-scroll header line 113 "export function CommonDataGrid({". Spell-check squiggle under "(row" on line 129. Overlaps IMG_1896 (126-144). Tab data-grid.tsx 9+. Status bar: hitanshu/experimental*, 13 errors 0 warnings, No Solution, TypeScript JSX. Same Explorer sidebar; PolicyLobGrid.tsx U. Taskbar 4:30 PM 7/10/2026.
---
113	export function CommonDataGrid({   [sticky scroll]
126	    // Add tooltip to row data if tooltip config exists
127	    const rowsWithTooltips = useMemo(() => {
128	        if (!gridConfig.tooltip?.visible) return rows;
129	        return rows.map((row) => {
130	            const fieldValue = (row as any)[gridConfig.tooltip!.field];
131	            const tooltipText = fieldValue
132	                ? `${gridConfig.tooltip!.prefix || ''}${fieldValue}`
133	                : '';
134	            return {
135	                ...row,
136	                _tooltip: tooltipText,
137	            } as any;
138	        });
139	    }, [rows, gridConfig]);
140	
141	    const muiColumns = useMemo(() => configToMuiColumns(gridConfig), [gridConfig]);
142	
143	    // Track selected row (first row selected by default)
144	    const [selectedRowId, setSelectedRowId] = useState<any>(null);
145	    const gridRef = useRef<HTMLDivElement>(null);
146	
147	    useEffect(() => {
148	        if (rows.length > 0 && !selectedRowId) {
149	            setSelectedRowId(String((rows[0] as any)[gridConfig.rowIdField || 'id']));
150	        }
151	    }, [rows, selectedRowId, gridConfig.rowIdField]);
152	
153	    // Add title attributes to rows for tooltip display (only if tooltip config exists)
154	    useEffect(() => {
155	        if (!gridRef.current) return;
156	
157	        const rowElements = gridRef.current?.querySelectorAll('[data-id]');


========== IMG_1898.md ==========
---
photo: IMG_1898.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 147-178
orientation: 0
confidence: high
notes: Sticky-scroll header line 113 "export function CommonDataGrid({". Spell-check squiggles under "(element" (162), "(row" (169), "(element" (178). Overlaps IMG_1897 (147-157). Line 179 partly visible at very bottom but illegible. Tab data-grid.tsx 9+. Status bar: hitanshu/experimental*, 13 errors 0 warnings, No Solution, TypeScript JSX. Same Explorer sidebar; PolicyLobGrid.tsx U. Taskbar 4:30 PM 7/10/2026.
---
113	export function CommonDataGrid({   [sticky scroll]
147	    useEffect(() => {
148	        if (rows.length > 0 && !selectedRowId) {
149	            setSelectedRowId(String((rows[0] as any)[gridConfig.rowIdField || 'id']));
150	        }
151	    }, [rows, selectedRowId, gridConfig.rowIdField]);
152	
153	    // Add title attributes to rows for tooltip display (only if tooltip config exists)
154	    useEffect(() => {
155	        if (!gridRef.current) return;
156	
157	        const rowElements = gridRef.current?.querySelectorAll('[data-id]');
158	
159	        if (!gridConfig.tooltip?.visible) {
160	            // Remove all title attributes if tooltip is not configured
161	            rowElements?.forEach((element) => {
162	                element.removeAttribute('title');
163	            });
164	            return;
165	        }
166	
167	        // Add title attributes only if tooltip is configured
168	        const tooltipMap = new Map<string, string>();
169	        rowsWithTooltips.forEach((row) => {
170	            const rowId = String((row as any)[gridConfig.rowIdField || 'id']);
171	            const tooltipText = (row as any)._tooltip;
172	            if (tooltipText) {
173	                tooltipMap.set(rowId, tooltipText);
174	            }
175	        });
176	
177	        // Find all row elements and add title attributes
178	        rowElements?.forEach((element) => {


========== IMG_1899.md ==========
---
photo: IMG_1899.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 158-189
orientation: 0
confidence: high
notes: Sticky-scroll headers lines 113 "export function CommonDataGrid({" and 154 "useEffect(() => {". Line 158 top row clipped behind sticky rows. Spell-check squiggles under "(element" (161, 178), "(row" (169), "handleRowClick" (189). Overlaps IMG_1898 (158-178). Tab data-grid.tsx 9+. Status bar: hitanshu/experimental*, 13 errors 0 warnings, No Solution, TypeScript JSX. Same Explorer sidebar; PolicyLobGrid.tsx U. Taskbar 4:30 PM 7/10/2026.
---
113	export function CommonDataGrid({   [sticky scroll]
154	    useEffect(() => {               [sticky scroll]
158	    ⟪occluded by sticky rows⟫
159	        if (!gridConfig.tooltip?.visible) {
160	            // Remove all title attributes if tooltip is not configured
161	            rowElements?.forEach((element) => {
162	                element.removeAttribute('title');
163	            });
164	            return;
165	        }
166	
167	        // Add title attributes only if tooltip is configured
168	        const tooltipMap = new Map<string, string>();
169	        rowsWithTooltips.forEach((row) => {
170	            const rowId = String((row as any)[gridConfig.rowIdField || 'id']);
171	            const tooltipText = (row as any)._tooltip;
172	            if (tooltipText) {
173	                tooltipMap.set(rowId, tooltipText);
174	            }
175	        });
176	
177	        // Find all row elements and add title attributes
178	        rowElements?.forEach((element) => {
179	            const rowId = element.getAttribute('data-id');
180	            const title = tooltipMap.get(rowId || '');
181	            if (title) {
182	                element.setAttribute('title', title);
183	            } else {
184	                element.removeAttribute('title');
185	            }
186	        });
187	    }, [rowsWithTooltips, gridConfig, gridConfig.rowIdField]);
188	
189	    const handleRowClick = useCallback(


========== IMG_1900.md ==========
---
photo: IMG_1900.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 172-202
orientation: 0
confidence: high
notes: Sticky-scroll headers lines 113 "export function CommonDataGrid({", 154 "useEffect(() => {", 169 "rowsWithTooltips.forEach((row) => {". Line 172 "if (tooltipText) {" partially clipped behind sticky rows. ESLint/error squiggles (red wavy underlines) under lines 198-201 (<div ... className=...>) — likely the source of some of the 13 errors. Overlaps IMG_1899 (172-189). Tab data-grid.tsx 9+. Status bar: hitanshu/experimental*, 13 errors 0 warnings, No Solution, TypeScript JSX. PolicyLobGrid.tsx U. Taskbar 4:30 PM 7/10/2026.
---
113	export function CommonDataGrid({           [sticky scroll]
154	    useEffect(() => {                       [sticky scroll]
169	        rowsWithTooltips.forEach((row) => { [sticky scroll]
172	            if (tooltipText) {   [partially occluded]
173	                tooltipMap.set(rowId, tooltipText);
174	            }
175	        });
176	
177	        // Find all row elements and add title attributes
178	        rowElements?.forEach((element) => {
179	            const rowId = element.getAttribute('data-id');
180	            const title = tooltipMap.get(rowId || '');
181	            if (title) {
182	                element.setAttribute('title', title);
183	            } else {
184	                element.removeAttribute('title');
185	            }
186	        });
187	    }, [rowsWithTooltips, gridConfig, gridConfig.rowIdField]);
188	
189	    const handleRowClick = useCallback(
190	        (params: GridRowParams<GenericRow>) => {
191	            setSelectedRowId(String((params.row as any)[gridConfig.rowIdField || 'id']));
192	            onRowClick?.(params.row);
193	        },
194	        [onRowClick, gridConfig.rowIdField],
195	    );
196	
197	    return (
198	        <div
199	            ref={gridRef}
200	            className="w-full h-full gridWrapper p-1! border-gray-100 border-2 mb-12!"
201	        >
202	            <MuiDataGrid<GenericRow>


========== IMG_1901.md ==========
---
photo: IMG_1901.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid.tsx
lines: 186-215
orientation: 0
confidence: high
notes: Sticky-scroll headers lines 113 "export function CommonDataGrid({", 154 "useEffect(() => {", 178 "rowElements?.forEach((element) => {". Line 186 "});" clipped behind sticky rows (first fully legible row is 186 "});"). Red error squiggles under lines 198-201 (<div ref className ... >) — Tailwind-style className "p-1! ... mb-12!". Overlaps IMG_1900 (186-202). Tab data-grid.tsx 9+. Status bar: hitanshu/experimental*, 13 errors 0 warnings, No Solution, TypeScript JSX. PolicyLobGrid.tsx U. Taskbar 4:30 PM 7/10/2026.
---
113	export function CommonDataGrid({              [sticky scroll]
154	    useEffect(() => {                          [sticky scroll]
178	        rowElements?.forEach((element) => {    [sticky scroll]
186	        });
187	    }, [rowsWithTooltips, gridConfig, gridConfig.rowIdField]);
188	
189	    const handleRowClick = useCallback(
190	        (params: GridRowParams<GenericRow>) => {
191	            setSelectedRowId(String((params.row as any)[gridConfig.rowIdField || 'id']));
192	            onRowClick?.(params.row);
193	        },
194	        [onRowClick, gridConfig.rowIdField],
195	    );
196	
197	    return (
198	        <div
199	            ref={gridRef}
200	            className="w-full h-full gridWrapper p-1! border-gray-100 border-2 mb-12!"
201	        >
202	            <MuiDataGrid<GenericRow>
203	                rows={rowsWithTooltips}
204	                columns={muiColumns}
205	                disableRowSelectionOnClick
206	                checkboxSelection={checkboxSelection}
207	                onRowClick={handleRowClick}
208	                slots={{
209	                    toolbar: GridToolbar,
210	                    footer: () => (
211	                        <TotalsFooter totalUnits={totalUnits} totalPremium={totalPremium} />
212	                    ),
213	                }}
214	                initialState={{
215	                    pagination: { paginationModel: { pageSize: gridConfig.pageSize || 10 } },
