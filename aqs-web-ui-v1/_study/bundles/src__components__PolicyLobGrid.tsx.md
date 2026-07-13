# BUNDLE for src/components/PolicyLobGrid.tsx
# 14 photo fragment(s), ascending start-line order.


========== IMG_2171.md ==========
---
photo: IMG_2171.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 1-34
orientation: 180
confidence: high
notes: New file/tab opened, top of file. Tab bar shows "date.tsx 9+" (inactive) and "PolicyLobGrid.tsx 7, U" (active, unsaved, "U" = git untracked/modified flag). Breadcrumb: aqs-web-ui > src > components > PolicyLobGrid.tsx. Explorer sidebar (components expanded): header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (selected, "7, U"), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx ("U"). Top-level src items: components, config, constants, features (dot=modified), hooks, lib (dot), pages (dot), providers, services, types (dot), utils; files app.css, app.tsx, context.ts. Problems: 31 errors, 1 warning, "No Solution". Branch "hitanshu/experimental*" dirty. Line 34 is cut off at the very bottom edge of the screen/status bar overlap — only "headerName: "LOB"" legible, trailing comma/content beyond not visible.
---
```tsx
1   // components/PolicyLobGrid.tsx
2   
3   import * as React from "react";
4   import { Box } from "@mui/material";
5   import {
6     DataGrid,
7     GridColDef,
8     GridToolbarContainer,
9     GridToolbarColumnsButton,
10    GridToolbarDensitySelector,
11    GridToolbarExport,
12    GridToolbarQuickFilter,
13    GridRowParams,
14    type DataGridProps,
15  } from "@mui/x-data-grid";
16  
17  import type { GridResponse } from "../types/grid-response";
18  import { normalizeGridResponse, type LobRow } from "../lib/grid-normalize";
19  
20  type Currency = string;
21  
22  const formatCurrency = (value: number, currency: Currency = "USD") =>
23    value.toLocaleString(undefined, {
24      style: "currency",
25      currency,
26      maximumFractionDigits: 2,
27    });
28  
29  type SortDirection = 'asc' | 'desc';
30  
31  const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [
32    {
33      field: "lob",
34      headerName: "LOB" ⟪? — line cut off at bottom edge, remainder not visible⟫
```


========== IMG_2172.md ==========
---
photo: IMG_2172.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 17-49
orientation: 180
confidence: high
notes: Continuation of same file/tab as IMG_2171, scrolled down slightly (no sticky-scroll header shown — top-level scope). Tab bar: "date.tsx 9+" (inactive), "PolicyLobGrid.tsx 7, U" (active). Explorer sidebar same as IMG_2171. Problems: 31 errors, 1 warning, "No Solution". Branch "hitanshu/experimental*" dirty.
---
```tsx
17  import type { GridResponse } from "../types/grid-response";
18  import { normalizeGridResponse, type LobRow } from "../lib/grid-normalize";
19  
20  type Currency = string;
21  
22  const formatCurrency = (value: number, currency: Currency = "USD") =>
23    value.toLocaleString(undefined, {
24      style: "currency",
25      currency,
26      maximumFractionDigits: 2,
27    });
28  
29  type SortDirection = 'asc' | 'desc';
30  
31  const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [
32    {
33      field: "lob",
34      headerName: "LOB",
35      minWidth: 100,
36    },
37    {
38      field: "name",
39      headerName: "Line of Business",
40      flex: 1,
41      minWidth: 220,
42    },
43    {
44      field: "units",
45      headerName: "Units",
46      type: "number",
47      minWidth: 110,
48      valueFormatter: ({ value }) => (Number.isFinite(value) ? value.toLocaleString() : "0"),
49    },
```


========== IMG_2173.md ==========
---
photo: IMG_2173.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 27-60
orientation: 180
confidence: high
notes: Continuation of same file/tab, scrolled down from IMG_2172 (overlaps lines 27-49). Tab bar: "date.tsx 9+" (inactive), "PolicyLobGrid.tsx 7, U" (active). Explorer sidebar unchanged. Problems: 31 errors, 1 warning, "No Solution". Branch "hitanshu/experimental*" dirty. Line 60 cut off at very bottom edge — only "type: "boolean"," visible, trailing content beyond not visible.
---
```tsx
27    });
28  
29  type SortDirection = 'asc' | 'desc';
30  
31  const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [
32    {
33      field: "lob",
34      headerName: "LOB",
35      minWidth: 100,
36    },
37    {
38      field: "name",
39      headerName: "Line of Business",
40      flex: 1,
41      minWidth: 220,
42    },
43    {
44      field: "units",
45      headerName: "Units",
46      type: "number",
47      minWidth: 110,
48      valueFormatter: ({ value }) => (Number.isFinite(value) ? value.toLocaleString() : "0"),
49    },
50    {
51      field: "premium",
52      headerName: "Premium",
53      type: "number",
54      minWidth: 140,
55      valueFormatter: ({ value }) => formatCurrency(Number(value ?? 0), currency),
56    },
57    {
58      field: "exists",
59      headerName: "Exists",
60      type: "boolean" ⟪? — line cut off at bottom edge, trailing content/comma not visible⟫
```


========== IMG_2174.md ==========
---
photo: IMG_2174.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 44-76
orientation: 180
confidence: high
notes: Continuation of same file/tab, scrolled down from IMG_2173 (overlaps lines 44-60). VS Code sticky-scroll header pinned at top shows line 31 "const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [". Minor rolling-shutter ghost/double-image artifact present below ~line 48 (faint duplicate text overlapping, offset ~1 line) but bold/sharp text layer was clearly distinguishable and used for transcription. Tab bar: "date.tsx 9+" (inactive), "PolicyLobGrid.tsx 7, U" (active). Explorer sidebar unchanged. Problems: 31 errors, 1 warning, "No Solution". Branch "hitanshu/experimental*" dirty.
---
```tsx
31  const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [   ⟪sticky-scroll header⟫
44    field: "units",
45    headerName: "Units",
46    type: "number",
47    minWidth: 110,
48    valueFormatter: ({ value }) => (Number.isFinite(value) ? value.toLocaleString() : "0"),
49  },
50  {
51    field: "premium",
52    headerName: "Premium",
53    type: "number",
54    minWidth: 140,
55    valueFormatter: ({ value }) => formatCurrency(Number(value ?? 0), currency),
56  },
57  {
58    field: "exists",
59    headerName: "Exists",
60    type: "boolean",
61    minWidth: 100,
62  },
63  {
64    field: "converted",
65    headerName: "Converted",
66    type: "boolean",
67    minWidth: 120,
68  },
69  {
70    field: "sequencer",
71    headerName: "Seq",
72    type: "number",
73    minWidth: 90,
74    sortable: true,
75  },
76  {
```


========== IMG_2175.md ==========
---
photo: IMG_2175.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 57-89
orientation: 180
confidence: high
notes: Continuation of same file/tab, scrolled down from IMG_2174 (overlaps lines 57-76). VS Code sticky-scroll header pinned at top shows line 31 "const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [". Minor rolling-shutter ghost/double-image artifact present throughout (faint duplicate text offset ~1 line) but bold/sharp text layer was clearly distinguishable and used for transcription. New function begins at line 84 (GridToolbar). Tab bar: "date.tsx 9+" (inactive), "PolicyLobGrid.tsx 7, U" (active). Explorer sidebar unchanged. Problems: 31 errors, 1 warning, "No Solution". Branch "hitanshu/experimental*" dirty.
---
```tsx
31  const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [   ⟪sticky-scroll header⟫
57    {
58      field: "exists",
59      headerName: "Exists",
60      type: "boolean",
61      minWidth: 100,
62    },
63    {
64      field: "converted",
65      headerName: "Converted",
66      type: "boolean",
67      minWidth: 120,
68    },
69    {
70      field: "sequencer",
71      headerName: "Seq",
72      type: "number",
73      minWidth: 90,
74      sortable: true,
75    },
76    {
77      field: "nodekey",
78      headerName: "Node Key",
79      flex: 1,
80      minWidth: 260,
81    },
82  ];
83  
84  /** DataGrid Toolbar */
85  function GridToolbar() {
86    return (
87      <GridToolbarContainer>
88        <GridToolbarQuickFilter debounceMs={400} />
89        <Box sx={{ flexGrow: 1 }} />
```


========== IMG_2176.md ==========
---
photo: IMG_2176.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 70-102
orientation: 180
confidence: high
notes: Continuation of same file/tab, scrolled down from IMG_2175 (overlaps lines 70-82). VS Code sticky-scroll header pinned at top shows line 31 "const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [" (this partially occludes line 70, which reads "field: "sequencer"," underneath — legible). Image is sharp/clean, no motion-tear artifact this time. Lines 88, 90, 91, 92, 93 show red squiggly underlines (Problems/lint markers) under the JSX tag names (GridToolbarQuickFilter, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarContainer closing tag) — likely unresolved-import or type errors. Tab bar: "date.tsx 9+" (inactive), "PolicyLobGrid.tsx 7, U" (active). Explorer sidebar unchanged; components folder item and src/components tree row now show orange/modified dot next to "components" itself too. Problems: 31 errors, 1 warning, "No Solution". Branch "hitanshu/experimental*" dirty. Line 102 cut off at bottom edge: "}: {" visible — start of destructured-props TS type annotation continuing off-screen.
---
```tsx
31  const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [   ⟪sticky-scroll header⟫
70    field: "sequencer",
71    headerName: "Seq",
72    type: "number",
73    minWidth: 90,
74    sortable: true,
75  },
76  {
77    field: "nodekey",
78    headerName: "Node Key",
79    flex: 1,
80    minWidth: 260,
81  },
82  ];
83  
84  /** DataGrid Toolbar */
85  function GridToolbar() {
86    return (
87      <GridToolbarContainer>
88        <GridToolbarQuickFilter debounceMs={400} />
89        <Box sx={{ flexGrow: 1 }} />
90        <GridToolbarColumnsButton />
91        <GridToolbarDensitySelector />
92        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
93      </GridToolbarContainer>
94    );
95  }
96  
97  /** Footer with totals from Page */
98  function TotalsFooter({
99    totalUnits,
100   totalPremium,
101   currency,
102 }: {   ⟪line cut off at bottom edge; rest of the type-annotation line beyond the opening "{" not visible⟫
```


========== IMG_2177.md ==========
---
photo: IMG_2177.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 81-113
orientation: 180
confidence: high
notes: Continuation of same file/tab, scrolled down from IMG_2176 (overlaps lines 81-102). VS Code sticky-scroll header pinned at top shows line 31 "const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [". Image sharp/clean, no motion-tear artifact. Confirms line 102 reads "}: {" (TS destructured-parameter type annotation), correcting the tentative/cut-off reading from IMG_2176. Red squiggly underlines remain on GridToolbar* JSX tags (lines 88, 90-93). Tab bar: "date.tsx 9+" (inactive), "PolicyLobGrid.tsx 7, U" (active). Explorer sidebar unchanged. Problems: 31 errors, 1 warning, "No Solution". Branch "hitanshu/experimental*" dirty. Line 113 only a lone "}" glyph is visible at the very bottom edge before the status bar — rest of line (if any) not visible.
---
```tsx
31  const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [   ⟪sticky-scroll header⟫
81    },
82  ];
83  
84  /** DataGrid Toolbar */
85  function GridToolbar() {
86    return (
87      <GridToolbarContainer>
88        <GridToolbarQuickFilter debounceMs={400} />
89        <Box sx={{ flexGrow: 1 }} />
90        <GridToolbarColumnsButton />
91        <GridToolbarDensitySelector />
92        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
93      </GridToolbarContainer>
94    );
95  }
96  
97  /** Footer with totals from Page */
98  function TotalsFooter({
99    totalUnits,
100   totalPremium,
101   currency,
102 }: {
103   totalUnits: number;
104   totalPremium: number;
105   currency: Currency;
106 }) {
107   return (
108     <Box sx={{ p: 1.5, display: "flex", justifyContent: "flex-end", gap: 3, fontWeight: 500 }}>
109       <Box>Units: {totalUnits.toLocaleString()}</Box>
110       <Box>Premium: {formatCurrency(totalPremium, currency)}</Box>
111     </Box>
112   );
113 }   ⟪only a lone "}" glyph visible at bottom edge, rest of line if any not visible⟫
```


========== IMG_2178.md ==========
---
photo: IMG_2178.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 85-126
orientation: 180
confidence: high
notes: Continuation of same file/tab, scrolled down from IMG_2177 (overlaps lines 85-113; confirms line 113 is a lone "}"). VS Code sticky-scroll header pinned at top shows line 85 "function GridToolbar() {". Image sharp/clean, no motion-tear artifact. New type export begins at line 115 (PolicyLobGridProps). Tab bar: "date.tsx 9+" (inactive), "PolicyLobGrid.tsx 7, U" (active). Explorer sidebar unchanged. Problems: 31 errors, 1 warning, "No Solution". Branch "hitanshu/experimental*" dirty. Line 126 cut off at very bottom edge: only "/** Raw payload straight from the backend */" visible, comment appears complete but any code following it on subsequent lines is not visible.
---
```tsx
85  function GridToolbar() {   ⟪sticky-scroll header⟫
94    );
95  }
96  
97  /** Footer with totals from Page */
98  function TotalsFooter({
99    totalUnits,
100   totalPremium,
101   currency,
102 }: {
103   totalUnits: number;
104   totalPremium: number;
105   currency: Currency;
106 }) {
107   return (
108     <Box sx={{ p: 1.5, display: "flex", justifyContent: "flex-end", gap: 3, fontWeight: 500 }}>
109       <Box>Units: {totalUnits.toLocaleString()}</Box>
110       <Box>Premium: {formatCurrency(totalPremium, currency)}</Box>
111     </Box>
112   );
113 }
114 
115 export type PolicyLobGridProps = Omit<
116   DataGridProps<LobRow>,
117   "rows"
118   | "columns"
119   | "loading"
120   | "slots"
121   | "slotProps"
122   | "getRowId"
123   | "onRowClick"
124   | "checkboxSelection"
125 > & {
126   /** Raw payload straight from the backend */
```


========== IMG_2179.md ==========
---
photo: IMG_2179.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 98-139
orientation: 180
confidence: high
notes: Continuation of same file/tab, scrolled down from IMG_2178 (overlaps lines 98-126). VS Code sticky-scroll header pinned at top shows line 98 "function TotalsFooter({". Image sharp/clean, no motion-tear artifact. Shows full body of the PolicyLobGridProps type (Omit<DataGridProps<LobRow>, ...> & { ... }) including JSDoc comments for each optional prop (data, checkboxSelection, currency, pageSize, columns). Tab bar: "date.tsx 9+" (inactive), "PolicyLobGrid.tsx 7, U" (active). Explorer sidebar unchanged. Problems: 31 errors, 1 warning, "No Solution". Branch "hitanshu/experimental*" dirty. Line 139 is the last visible line before the status bar; content beyond not visible in this photo.
---
```tsx
98  function TotalsFooter({   ⟪sticky-scroll header⟫
107   return (
108     <Box sx={{ p: 1.5, display: "flex", justifyContent: "flex-end", gap: 3, fontWeight: 500 }}>
109       <Box>Units: {totalUnits.toLocaleString()}</Box>
110       <Box>Premium: {formatCurrency(totalPremium, currency)}</Box>
111     </Box>
112   );
113 }
114 
115 export type PolicyLobGridProps = Omit<
116   DataGridProps<LobRow>,
117   "rows"
118   | "columns"
119   | "loading"
120   | "slots"
121   | "slotProps"
122   | "getRowId"
123   | "onRowClick"
124   | "checkboxSelection"
125 > & {
126   /** Raw payload straight from the backend */
127   data: GridResponse;
128 
129   /** Show a checkbox column */
130   checkboxSelection?: boolean;
131 
132   /** Currency code for premium formatting. Default: "USD" */
133   currency?: Currency;
134 
135   /** Initial page size. Default: 10 */
136   pageSize?: number;
137 
138   /** Replace/extend default columns */
139   columns?: GridColDef<LobRow>[];
```


========== IMG_2180.md ==========
---
photo: IMG_2180.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 115-155
orientation: 180
confidence: high
notes: Explorer sidebar (aqs-web-ui/src) shows components/ expanded with files header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (selected, "7,U" = 7 problems/unsaved), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx ("U"); collapsed folders: config, constants, features, hooks, lib, pages, providers, services, types, utils; also app.css, app.tsx, context.ts at src root. Tab bar: "date.tsx 9+" (inactive, other tabs collapsed behind it) and active tab "PolicyLobGrid.tsx 7,U". Breadcrumb: aqs-web-ui > src > components > PolicyLobGrid.tsx > ... Status bar: branch "hitanshu/experimental*", "31 errors / 1 warning", "No Solution", Ln 1 Col 1, Spaces:2, UTF-8, CRLF, TypeScript JSX. Between line 115 and 123 there is a horizontal fold-divider in the gutter — lines 116-122 are COLLAPSED (folded), not visible in this photo; the visible line 125 starts with "> & {" (fold caret) confirming a folded region inside the Omit<...> generic. Line 155 at bottom is cut off mid-line ("height = 480").
---
115  export type PolicyLobGridProps = Omit<
     ⟪folded: lines 116-122 not visible⟫
123    | "onRowClick"
124    | "checkboxSelection"
125  > & {
126    /** Raw payload straight from the backend */
127    data: GridResponse;
128
129    /** Show a checkbox column */
130    checkboxSelection?: boolean;
131
132    /** Currency code for premium formatting. Default: "USD" */
133    currency?: Currency;
134
135    /** Initial page size. Default: 10 */
136    pageSize?: number;
137
138    /** Replace/extend default columns */
139    columns?: GridColDef<LobRow>[];
140
141    /** Override row click handler */
142    onRowClick?: (row: LobRow) => void;
143
144    /** Container height (px or CSS string). Default: 480 */
145    height?: number | string;
146  };
147
148  export function PolicyLobGrid({
149    data,
150    checkboxSelection = false,
151    currency = "USD",
152    pageSize = 10,
153    columns,
154    onRowClick,
155    height = 480 ⟪cut off at bottom edge of screen⟫


========== IMG_2181.md ==========
---
photo: IMG_2181.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 115-165
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 115 (export type PolicyLobGridProps = Omit<). Line directly under the sticky header (~133) is clipped/half-hidden, looks like "currency?: Currency;" but unreadable — omitted. Tabs: date.tsx (9+ problems), PolicyLobGrid.tsx "7, U" (active, unsaved/modified). Explorer components folder: header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (7, U), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx (U); sibling folders: config, constants, features (dot), hooks, lib (dot), pages (dot), providers, services, types (dot), utils; files app.css, app.tsx, context.ts; panels OUTLINE, TIMELINE, C# PROJECT DETAILS. Status bar: branch hitanshu/experimental*, 31 errors / 1 warning, "No Solution" red badge, Ln 1 Col 1, Spaces:2, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:41 PM 7/10/2026.
---
115	export type PolicyLobGridProps = Omit<
134	
135	  /** Initial page size. Default: 10 */
136	  pageSize?: number;
137	
138	  /** Replace/extend default columns */
139	  columns?: GridColDef<LobRow>[];
140	
141	  /** Override row click handler */
142	  onRowClick?: (row: LobRow) => void;
143	
144	  /** Container height (px or CSS string). Default: 480 */
145	  height?: number | string;
146	};
147	
148	export function PolicyLobGrid({
149	  data,
150	  checkboxSelection = false,
151	  currency = "USD",
152	  pageSize = 10,
153	  columns,
154	  onRowClick,
155	  height = 480,
156	  ...rest
157	}: PolicyLobGridProps) {
158	  const { rows, totalUnits, totalPremium } = React.useMemo(() => normalizeGridResponse(data), [data]);
159	  const resolvedColumns = React.useMemo(
160	    () => columns ?? buildDefaultColumns(currency),
161	    [columns, currency]
162	  );
163	
164	  const handleRowClick = React.useCallback(
165	    (params: GridRowParams<LobRow>) => {


========== IMG_2182.md ==========
---
photo: IMG_2182.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 146-178
orientation: 180
confidence: high
notes: Same file as IMG_2181, scrolled down (overlaps lines 146-165). Line 179 partially visible at bottom edge but clipped by taskbar — omitted. Tabs: date.tsx 9+, PolicyLobGrid.tsx 7, U (active). Same explorer tree as IMG_2181 (components: header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx 7,U, radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx U; config, constants, features, hooks, lib, pages, providers, services, types, utils, app.css, app.tsx, context.ts). Status bar: hitanshu/experimental*, 31 errors 1 warning, "No Solution", TypeScript JSX. normalizeGridResponse highlighted (selection match) on line 158.
---
146	};
147	
148	export function PolicyLobGrid({
149	  data,
150	  checkboxSelection = false,
151	  currency = "USD",
152	  pageSize = 10,
153	  columns,
154	  onRowClick,
155	  height = 480,
156	  ...rest
157	}: PolicyLobGridProps) {
158	  const { rows, totalUnits, totalPremium } = React.useMemo(() => normalizeGridResponse(data), [data]);
159	  const resolvedColumns = React.useMemo(
160	    () => columns ?? buildDefaultColumns(currency),
161	    [columns, currency]
162	  );
163	
164	  const handleRowClick = React.useCallback(
165	    (params: GridRowParams<LobRow>) => {
166	      onRowClick?.(params.row);
167	    },
168	    [onRowClick]
169	  );
170	
171	  return (
172	    <Box sx={{ height, width: "100%" }}>
173	      <DataGrid<LobRow>
174	        rows={rows}
175	        columns={resolvedColumns}
176	        disableRowSelectionOnClick
177	        checkboxSelection={checkboxSelection}
178	        onRowClick={handleRowClick}


========== IMG_2183.md ==========
---
photo: IMG_2183.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 148-186
orientation: 180
confidence: medium
notes: Photo has a motion-blur "double exposure" ghosting artifact — a faint duplicate of the same code (offset ~7-9 lines up, e.g. faint "height=480", "...rest", "const resolvedColumns = React.useMemo" etc. repeating under the sharp lines) is visible underneath the sharp/bold text, apparently from the screen mid-scroll when the photo was taken. Transcription below follows only the SHARP, bold, correctly-numbered text (line numbers 148, 155-186); the blurred duplicate is ignored as a capture artifact, not real duplicate code. Explorer sidebar same as IMG_2180 (components/ expanded, PolicyLobGrid.tsx selected "7,U"). Tabs: "date.tsx 9+" and active "PolicyLobGrid.tsx 7,U". Breadcrumb: aqs-web-ui > src > components > PolicyLobGrid.tsx > ... Status bar: branch "hitanshu/experimental*", 31 errors/1 warning, "No Solution", Ln 1 Col1, Spaces:2, UTF-8, CRLF, TypeScript JSX. Lines 149-154 not visible (scrolled past/above view, only their blurred ghosts partly visible - not transcribed).
---
148  export function PolicyLobGrid({
     ⟪lines 149-154 not visible in frame⟫
155    height = 480,
156    ...rest
157  }: PolicyLobGridProps) {
158    const { rows, totalUnits, totalPremium } = React.useMemo(() => normalizeGridResponse(data), [data]);
159    const resolvedColumns = React.useMemo(
160      () => columns ?? buildDefaultColumns(currency),
161      [columns, currency]
162    );
163
164    const handleRowClick = React.useCallback(
165      (params: GridRowParams<LobRow>) => {
166        onRowClick?.(params.row);
167      },
168      [onRowClick]
169    );
170
171    return (
172      <Box sx={{ height, width: "100%" }}>
173        <DataGrid<LobRow>
174          rows={rows}
175          columns={resolvedColumns}
176          disableRowSelectionOnClick
177          checkboxSelection={checkboxSelection}
178          onRowClick={handleRowClick}
179          slots={{
180            toolbar: GridToolbar,
181            footer: () => (
182              <TotalsFooter totalUnits={totalUnits} totalPremium={totalPremium} currency={currency} />
183            ),
184          }}
185          initialState={{
186            pagination: { paginationModel: { pageSize } },


========== IMG_2184.md ==========
---
photo: IMG_2184.JPG
type: vscode-code
file: aqs-web-ui/src/components/PolicyLobGrid.tsx
lines: 148-197 (148 is sticky-scroll header; body visible 176-197)
orientation: 180
confidence: high
notes: Line 148 "export function PolicyLobGrid({" appears at top as a VS Code sticky-scroll header (enclosing function signature), separated by a divider line from line 176 which is the actual first line of the scrolled body. This is the tail end of the PolicyLobGrid.tsx file — ends with closing of the function (195 "}") and "export default PolicyLobGrid;" at 197. Explorer sidebar identical to IMG_2180/2183 (components/ expanded, PolicyLobGrid.tsx selected "7,U"). Tabs: "date.tsx 9+" and active "PolicyLobGrid.tsx 7,U". Breadcrumb: aqs-web-ui > src > components > PolicyLobGrid.tsx > ... Status bar: branch "hitanshu/experimental*", 31 errors/1 warning, "No Solution", Ln1 Col1, Spaces:2, UTF-8, CRLF, TypeScript JSX.
---
148  export function PolicyLobGrid({  ⟪sticky-scroll header, enclosing scope⟫
176        disableRowSelectionOnClick
177        checkboxSelection={checkboxSelection}
178        onRowClick={handleRowClick}
179        slots={{
180          toolbar: GridToolbar,
181          footer: () => (
182            <TotalsFooter totalUnits={totalUnits} totalPremium={totalPremium} currency={currency} />
183          ),
184        }}
185        initialState={{
186          pagination: { paginationModel: { pageSize } },
187          sorting: { sortModel: [{ field: "sequencer", sort: "asc" }] },
188          filter: { filterModel: { items: [] } },
189        }}
190        pageSizeOptions={[5, 10, 25, 50, 100]}
191        {...rest}
192      />
193    </Box>
194    );
195  }
196
197  export default PolicyLobGrid;
