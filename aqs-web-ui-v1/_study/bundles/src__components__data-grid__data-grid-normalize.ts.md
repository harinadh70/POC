# BUNDLE for src/components/data-grid/data-grid-normalize.ts
# 5 photo fragment(s), ascending start-line order.


========== IMG_1884.md ==========
---
photo: IMG_1884.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-normalize.ts
lines: 1-34
orientation: 0
confidence: high
notes: Top of file. Tab: data-grid-normalize.ts (1 problem badge); file selected in Explorer with badge 1. 'lodash-es' on line 3 appears squiggle-underlined (module resolution warning?). Line 34 half-clipped at bottom edge — reads "for (const part of parts) {". First line comment says lib/grid-normalize.ts (original path differs from actual file location). Explorer sidebar same data-grid tree as prior photos (PolicyLobGrid.tsx U). Status bar: hitanshu/experimental*, 3 errors 0 warnings, No Solution, Ln 1 Col 1, TypeScript. Clock 4:29 PM 7/10/2026.
---
1	// lib/grid-normalize.ts
2	
3	import { castArray } from 'lodash-es';
4	import type { GridConfigObject } from '@components/data-grid/data-grid-config-registry';
5	
6	/**
7	 * Generic row type for any grid data
8	 * Holds the actual row data from the API response
9	 */
10	export type GenericRow = {
11	    id: string;
12	    [key: string]: any;
13	};
14	
15	export type NormalizedResult = {
16	    rows: GenericRow[];
17	    totalUnits?: number;
18	    totalPremium?: number;
19	};
20	
21	const toNumber = (value: string | number | null | undefined) => {
22	    const n = Number(value ?? 0);
23	    return Number.isFinite(n) ? n : 0;
24	};
25	
26	/**
27	 * Extract nested property from object using dot notation
28	 * e.g., "Page.LOB" or "policy"
29	 */
30	function getNestedProperty(obj: any, path?: string): any[] {
31	    if (!path) return [];
32	    const parts = path.split('.');
33	    let current = obj;
34	    for (const part of parts) {


========== IMG_1885.md ==========
---
photo: IMG_1885.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-normalize.ts
lines: 18-49
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 15 (export type NormalizedResult = {). Line 17 hidden behind sticky; visible starts 18. Overlaps IMG_1884 for lines 18-34. Explorer: data-grid-normalize.ts selected (1 problem). Status bar: hitanshu/experimental*, 3 errors 0 warnings, No Solution, TypeScript. Clock 4:30 PM 7/10/2026.
---
Sticky scroll (context, real line numbers):
15	export type NormalizedResult = {

18	    totalPremium?: number;
19	};
20	
21	const toNumber = (value: string | number | null | undefined) => {
22	    const n = Number(value ?? 0);
23	    return Number.isFinite(n) ? n : 0;
24	};
25	
26	/**
27	 * Extract nested property from object using dot notation
28	 * e.g., "Page.LOB" or "policy"
29	 */
30	function getNestedProperty(obj: any, path?: string): any[] {
31	    if (!path) return [];
32	    const parts = path.split('.');
33	    let current = obj;
34	    for (const part of parts) {
35	        current = current?.[part];
36	    }
37	    return castArray(current);
38	}
39	
40	/**
41	 * Normalize a single row from the API response
42	 */
43	const normalizeRow = (item: any, idx: number, rowIdField?: string): GenericRow => ({
44	    id: item?.[rowIdField || 'id'] || String(idx),
45	    ...item,
46	});
47	
48	/**
49	 * Normalize grid response based on config and data path


========== IMG_1886.md ==========
---
photo: IMG_1886.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-normalize.ts
lines: 30-65
orientation: 0
confidence: high
notes: New file/tab compared to prior photos - data-grid-normalize.ts now selected/open (data-grid-config-registry.ts tab closed, only this tab shown). Sticky-scroll header at top shows enclosing scope line 30 "function getNestedProperty(...)". Immediately below the sticky header, a partial line (gutter number obscured, appears to be line 31, 32, or 33) is faintly visible but occluded/illegible under the sticky-scroll shadow overlay - marked below. Explorer sidebar: data-grid folder now shows data-grid-config-registry.ts and data-grid-normalize.ts (selected, highlighted) and data-grid.tsx; same folders/files as before otherwise. Branch hitanshu/experimental*, Problems 3 errors 0 warnings, "No Solution". Timestamp 4:30 PM.
---
Sticky-scroll header line (enclosing scope):
30      function getNestedProperty(obj: any, path?: string): any[] {

⟪? one line occluded/illegible under sticky-scroll shadow, appears to declare "let current = ..." or similar init before the for-loop⟫
34          for (const part of parts) {
35              current = current?.[part];
36          }
37          return castArray(current);
38      }
39
40      /**
41       * Normalize a single row from the API response
42       */
43      const normalizeRow = (item: any, idx: number, rowIdField?: string): GenericRow => ({
44          id: item?.[rowIdField || 'id'] || String(idx),
45          ...item,
46      });
47
48      /**
49       * Normalize grid response based on config and data path
50       */
51      export const normalizeGridResponse = (
52          data: any,
53          gridConfig?: GridConfigObject,
54      ): NormalizedResult => {
55          if (!data || !gridConfig) {
56              return { rows: [], totalUnits: 0, totalPremium: 0 };
57          }
58
59          // Extract data array using dataPath from config
60          const dataPath = gridConfig.dataPath;
61          const items = getNestedProperty(data, dataPath);
62
63          // Normalize all rows using generic normalization
64          const rows: GenericRow[] = items.map((item, idx) =>
65              normalizeRow(item, idx, gridConfig.rowIdField),


========== IMG_1887.md ==========
---
photo: IMG_1887.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-normalize.ts
lines: 43-76
orientation: 0
confidence: high
notes: Same file/tab as IMG_1886, scrolled down slightly (no sticky-scroll header visible this time; contiguous from line 43). Line 76 at bottom is partially cut off by "No Solution" status bar overlay but text is legible ("if (gridConfig.footer?.totalFields?.includes('units')) {"). Explorer sidebar unchanged, data-grid-normalize.ts selected. Branch hitanshu/experimental*, Problems 3 errors 0 warnings, "No Solution". Timestamp 4:30 PM.
---
43      const normalizeRow = (item: any, idx: number, rowIdField?: string): GenericRow => ({
44          id: item?.[rowIdField || 'id'] || String(idx),
45          ...item,
46      });
47
48      /**
49       * Normalize grid response based on config and data path
50       */
51      export const normalizeGridResponse = (
52          data: any,
53          gridConfig?: GridConfigObject,
54      ): NormalizedResult => {
55          if (!data || !gridConfig) {
56              return { rows: [], totalUnits: 0, totalPremium: 0 };
57          }
58
59          // Extract data array using dataPath from config
60          const dataPath = gridConfig.dataPath;
61          const items = getNestedProperty(data, dataPath);
62
63          // Normalize all rows using generic normalization
64          const rows: GenericRow[] = items.map((item, idx) =>
65              normalizeRow(item, idx, gridConfig.rowIdField),
66          );
67
68          // Calculate totals if config specifies totalFields
69          let totalUnits: number | undefined;
70          let totalPremium: number | undefined;
71
72          if (gridConfig.footer?.totalFields?.includes('premium')) {
73              totalPremium = rows.reduce((sum, row) => sum + toNumber(row.premium), 0);
74          }
75
76          if (gridConfig.footer?.totalFields?.includes('units')) {


========== IMG_1888.md ==========
---
photo: IMG_1888.JPG
type: vscode-code
file: aqs-web-ui/src/components/data-grid/data-grid-normalize.ts
lines: 51-86
orientation: 0
confidence: high
notes: Same file/tab as IMG_1886/1887, scrolled to end of file (line 86 is last line, blank - end of file). Sticky-scroll header at top shows enclosing scope line 51 "export const normalizeGridResponse = (". Main visible contiguous block starts at line 57 (partial, only closing brace "}" visible for line 57) through 86. Explorer sidebar unchanged, data-grid-normalize.ts selected. Branch hitanshu/experimental*, Problems 3 errors 0 warnings, "No Solution". Timestamp 4:30 PM.
---
Sticky-scroll header line (enclosing scope):
51      export const normalizeGridResponse = (

Main visible code:
57          }
58
59          // Extract data array using dataPath from config
60          const dataPath = gridConfig.dataPath;
61          const items = getNestedProperty(data, dataPath);
62
63          // Normalize all rows using generic normalization
64          const rows: GenericRow[] = items.map((item, idx) =>
65              normalizeRow(item, idx, gridConfig.rowIdField),
66          );
67
68          // Calculate totals if config specifies totalFields
69          let totalUnits: number | undefined;
70          let totalPremium: number | undefined;
71
72          if (gridConfig.footer?.totalFields?.includes('premium')) {
73              totalPremium = rows.reduce((sum, row) => sum + toNumber(row.premium), 0);
74          }
75
76          if (gridConfig.footer?.totalFields?.includes('units')) {
77              totalUnits = rows.reduce((sum, row) => sum + toNumber(row.units), 0);
78          }
79
80          return {
81              rows,
82              totalUnits,
83              totalPremium,
84          };
85      };
86
