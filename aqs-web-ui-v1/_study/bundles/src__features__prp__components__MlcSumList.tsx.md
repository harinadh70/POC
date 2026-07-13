# BUNDLE for src/features/prp/components/MlcSumList.tsx
# 4 photo fragment(s), ascending start-line order.


========== IMG_2694.md ==========
---
photo: IMG_2694.JPG
type: vscode-code
file: aqs-web-ui/src/features/prp/components/MlcSumList.tsx
lines: 1-33 (full file, no scroll)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 and read from rotated copy. No ghosting/motion-blur artifact in this photo (sharp, single exposure) - unlike the preceding photos in this run. New file/tab: MlcSumList.tsx, tab badge "9+, U" (9+ problems on this file, U = untracked in git). Breadcrumb: aqs-web-ui > src > features > prp > components > MlcSumList.tsx. Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > features > policy (constants: tab-definitions.ts, ultimate-cover-tab-definit...; utils: action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts; FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts) then prp > components (MlcSumList.tsx selected/highlighted blue) > services, utils, root, hooks, lib (all collapsed, some with modified-dot indicators). Status bar: aqs-web-ui, branch hitanshu/experimental*, 14 errors 0 warnings (red X "14", triangle "0"), "No Solution" (red), Ln 1 Col 1, Spaces: 2 (this file uses 2-space indent, unlike the Tab Size 4 files seen in earlier photos), UTF-8, CRLF, TypeScript JSX. Taskbar clock 5:17 PM 7/10/2026. Minimap on right shows a small red marker partway down (matches error count).
---
1    import React from 'react';
2    import { XmlList, ListColumn, ListRow } from '@components/XmlList';
3    
4    const MLC_SUM_COLUMNS: ListColumn[] = [
5      {
6        key: 'year',
7        label: 'Experience Year',
8        width: 210,
9        sortField: 'sortdate',
10       title: 'Sort by Experience Year',
11     },
12     {
13       key: 'losses',
14       label: 'Total # Losses',
15       width: 160,
16       sortField: 'losses',
17       title: 'Sort by Loss Totals',
18     },
19     {
20       key: 'lossamount',
21       label: 'Total Loss Amount',
22       width: 160,
23       sortField: 'lossamount',
24       title: 'Sort by Loss Amounts',
25     },
26     {
27       key: 'eligibleamount',
28       label: 'Total Eligible Premium From Experience Year',
29       width: 205,
30       sortField: 'eligibleamount',
31       title: 'Sort by Eligible Premium',
32     },
33   ];


========== IMG_2696.md ==========
---
photo: IMG_2696.JPG
type: vscode-code
file: aqs-web-ui/src/features/prp/components/MlcSumList.tsx
lines: 4, 31-63
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 4 "const MLC_SUM_COLUMNS: ListColumn[] = [" above the main visible block (lines 31-63), indicating lines 5-30 are the body of that array (not visible in this photo). Explorer sidebar shows aqs-web-ui > src > features > policy > constants (tab-definitions.ts, ultimate-cover-tab-definit...) > utils (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts) > FieldRenderer.tsx > index.ts > policy-information-fields.ts > types.ts > ultimate-cover-fields.ts > prp (highlighted) > components > MlcSumList.tsx (selected, "9+, U" modified indicator) > services > utils > root > hooks > lib. Tab bar shows only MlcSumList.tsx open (single tab). Status bar: branch "hitanshu/experimental*", "14 errors, 0 warnings", "No Solution". Breadcrumb: aqs-web-ui > src > features > prp > components > MlcSumList.tsx > ... (a symbol breadcrumb truncated). Bottom right: Ln 1, Col 1, Spaces: 2, UTF-8, CRLF, TypeScript JSX. Timestamp overlay 5:17 PM 7/10/2026.
---
4: const MLC_SUM_COLUMNS: ListColumn[] = [
...
31:     title: 'Sort by Eligible Premium',
32:   },
33: ];
34:
35: export interface MlcSumRow extends ListRow {
36:   year: string;
37:   losses: string;
38:   lossamount: string;
39:   eligibleamount: string;
40:   sortdate: string;
41: }
42:
43: export interface MlcSumListProps {
44:   rows: MlcSumRow[];
45:   onRowSelect?: (row: MlcSumRow) => void;
46:   onSort?: (field: string) => void;
47:   sortField?: string;
48:   sortOrder?: 'ascending' | 'descending';
49: }
50:
51: export const MlcSumList: React.FC<MlcSumListProps> = ({
52:   rows,
53:   onRowSelect,
54:   onSort,
55:   sortField = 'sortdate',
56:   sortOrder = 'descending',
57: }) => {
58:   return (
59:     <XmlList
60:       columns={MLC_SUM_COLUMNS}
61:       rows={rows}
62:       sortField={sortField}
63:       sortOrder={sortOrder}


========== IMG_2697.md ==========
---
photo: IMG_2697.JPG
type: vscode-code
file: aqs-web-ui/src/features/prp/components/MlcSumList.tsx
lines: 4, 31-63
orientation: 180
confidence: high
notes: Near-duplicate of IMG_2696 — identical code content and scroll position (line 4 sticky header, lines 31-63 visible). Difference from 2696: OUTLINE and TIMELINE sections in sidebar are collapsed (chevrons closed) rather than expanded; explorer tree otherwise same (constants, utils, FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts, prp > components > MlcSumList.tsx selected, services, utils, root, hooks, lib). Status bar: branch "hitanshu/experimental*", "14 errors, 0 warnings", "No Solution". Timestamp overlay 5:17 PM 7/10/2026 (same minute as 2696).
---
4: const MLC_SUM_COLUMNS: ListColumn[] = [
...
31:     title: 'Sort by Eligible Premium',
32:   },
33: ];
34:
35: export interface MlcSumRow extends ListRow {
36:   year: string;
37:   losses: string;
38:   lossamount: string;
39:   eligibleamount: string;
40:   sortdate: string;
41: }
42:
43: export interface MlcSumListProps {
44:   rows: MlcSumRow[];
45:   onRowSelect?: (row: MlcSumRow) => void;
46:   onSort?: (field: string) => void;
47:   sortField?: string;
48:   sortOrder?: 'ascending' | 'descending';
49: }
50:
51: export const MlcSumList: React.FC<MlcSumListProps> = ({
52:   rows,
53:   onRowSelect,
54:   onSort,
55:   sortField = 'sortdate',
56:   sortOrder = 'descending',
57: }) => {
58:   return (
59:     <XmlList
60:       columns={MLC_SUM_COLUMNS}
61:       rows={rows}
62:       sortField={sortField}
63:       sortOrder={sortOrder}


========== IMG_2695.md ==========
---
photo: IMG_2695.JPG
type: vscode-code
file: aqs-web-ui/src/features/prp/components/MlcSumList.tsx
lines: 32-47 (full file continues from IMG_2694; overlaps its lines 32-33)
orientation: 180
confidence: medium
notes: Photo was upside down; rotated 180 and read from rotated copy. Same file/tab as IMG_2694 (MlcSumList.tsx), same view scrolled slightly - top of frame (lines 1-33, the MLC_SUM_COLUMNS array) duplicates IMG_2694 and is not re-transcribed here (see that transcript). This photo has some double-exposure ghosting in the lines 35-41 region (MlcSumRow interface body) - the property order shown (year, losses, lossamount, eligibleamount, sortdate) is a best-effort reconstruction: "year" and "losses" (lines 36-37) and the closing brace (line 41) are clearly bold/legible, but "lossamount", "eligibleamount", and "sortdate" (lines 38-40) appear only as fainter/ghosted text and their exact line order is not fully certain, though all three property names and their `string` type are legible. Tab: MlcSumList.tsx, badge "9+, U". Breadcrumb: aqs-web-ui > src > features > prp > components > MlcSumList.tsx. Explorer sidebar same as IMG_2694 (prp > components > MlcSumList.tsx selected; services, utils, root, hooks, lib). Status bar: aqs-web-ui, branch hitanshu/experimental*, 14 errors 0 warnings, "No Solution" (red), Ln 1 Col 1, Spaces: 2, UTF-8, CRLF, TypeScript JSX. Taskbar clock 5:17 PM 7/10/2026.
---
32   },
33   ];
34   
35   export interface MlcSumRow extends ListRow {
36     year: string;
37     losses: string;
38     lossamount: string;
39     eligibleamount: string;
40     sortdate: string;
41   };
42   
43   export interface MlcSumListProps {
44     rows: MlcSumRow[];
45     onRowSelect?: (row: MlcSumRow) => void;
46     onSort?: (field: string) => void;
47     sortField?: string;
