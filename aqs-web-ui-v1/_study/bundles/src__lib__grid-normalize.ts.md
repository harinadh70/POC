# BUNDLE for src/lib/grid-normalize.ts
# 3 photo fragment(s), ascending start-line order.


========== IMG_2882.md ==========
---
photo: IMG_2882.JPG
type: vscode-code
file: aqs-web-ui/src/lib/grid-normalize.ts
lines: 1-34
orientation: 180
confidence: high
notes: New file opened (not use-smart-navigation.ts): grid-normalize.ts under aqs-web-ui/src/lib, tab shows "U" (unsaved) badge, 2 errors/0 warnings in status bar (down from 19 — different file's diagnostics). Explorer sidebar: aqs-web-ui > src > features > prp > utils, root > services > user-data.ts, utils > loader.ts, middleware.ts, hooks (collapsed, listing use-action-guard.ts ... use-smart-navigation.ts), lib (expanded) > grid-normalize.ts (active), then collapsed pages, providers, services, types, utils. Breadcrumb: aqs-web-ui > src > lib > grid-normalize.ts. Clean/sharp photo, no motion blur. Left activity bar switched to a different icon set (source-control-style icons visible, badge "27" on one icon) vs earlier photos' explorer-only view — branch hitanshu/experimental*, No Solution.
---
1: // lib/grid-normalize.ts
2:
3: import type { GridResponse, LobItem } from "../types/grid-response";
4:
5: export type LobRow = {
6:     id: string;
7:     lob: string;
8:     name: string;
9:     units: number;
10:     premium: number;
11:     exists: boolean;
12:     converted: boolean;
13:     sequencer: number;
14:     nodekey: string;
15: };
16:
17: export type NormalizedResult = {
18:     rows: LobRow[];
19:     totalUnits: number;
20:     totalPremium: number;
21: };
22:
23: const toNumber = (value: string | number | null | undefined) => {
24:     const n = Number(value ?? 0);
25:     return Number.isFinite(n) ? n : 0;
26: };
27:
28: const normalizeItem = (item: LobItem, idx: number): LobRow => ({
29:     id: item.nodekey || `${item["@lob"]}-${item.sequencer}-${idx}`,
30:     lob: item["@lob"],
31:     name: item.text,
32:     units: toNumber(item.units),
33:     premium: toNumber(item.premium),
34:     exists: item["@exists"] === "T" ⟪cut off at bottom edge of visible editor area⟫


========== IMG_2883.md ==========
---
photo: IMG_2883.JPG
type: vscode-code
file: aqs-web-ui/src/lib/grid-normalize.ts
lines: 17-47
orientation: 180
confidence: medium
notes: Same double-exposure/ghosting artifact as several photos in this run (two overlapping scroll positions, ~5-line offset); primary bold/sharp text is legible throughout and was used for transcription, fainter ghost text ignored. Lines 17-34 duplicate content already confirmed clean in IMG_2882 (not independently re-derived, see that transcript). Lines 35-47 are new (past where IMG_2882 stopped) and were read directly off the sharp/bold text layer with reasonable confidence. Same file/tab/sidebar as IMG_2882 (grid-normalize.ts, "U" unsaved, 2 errors/0 warnings, No Solution, hitanshu/experimental*, 5:21 PM 7/10/2026).
---
⟪17-34: not independently re-derived — matches IMG_2882 lines 17-34, see that transcript⟫

30: lob: item["@lob"],
31: name: item.text,
32: units: toNumber(item.units),
33: premium: toNumber(item.premium),
34: exists: item["@exists"] === "T",
35: converted: item["@converted"] === "T",
36: sequencer: toNumber(item.sequencer ?? idx),
37: nodekey: item.nodekey,
38: });
39:
40: export const normalizeGridResponse = (data: GridResponse): NormalizedResult => {
41:     const raw = data?.Page?.LOB;
42:     const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
43:     const rows = items.map(normalizeItem);
44:
45:     return {
46:         rows,
47:         totalUnits: toNumber(data?.Page?.["@totalunits"]),


========== IMG_2884.md ==========
---
photo: IMG_2884.JPG
type: vscode-code
file: aqs-web-ui/src/lib/grid-normalize.ts
lines: 28-50
orientation: 180
confidence: high
notes: Clean/sharp photo, no motion blur. Completes grid-normalize.ts (file ends at line 50). Explorer sidebar: lib > grid-normalize.ts (active, "U" unsaved), pages/providers/services/types/utils collapsed below. Status bar: 2 errors/0 warnings, No Solution, hitanshu/experimental*, 5:21 PM 7/10/2026. Line 28's continuation ("id: item.nodekey || ...") and lines 29-33 are obscured/not shown (jump cut from 28 straight to 34 in the visible viewport — likely just above the visible area, already captured in IMG_2882/2883).
---
28: const normalizeItem = (item: LobItem, idx: number): LobRow => ({
⟪29-33 not visible in this photo — see IMG_2882/2883⟫
34:     exists: item["@exists"] === "T",
35:     converted: item["@converted"] === "T",
36:     sequencer: toNumber(item.sequencer ?? idx),
37:     nodekey: item.nodekey,
38: });
39:
40: export const normalizeGridResponse = (data: GridResponse): NormalizedResult => {
41:     const raw = data?.Page?.LOB;
42:     const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
43:     const rows = items.map(normalizeItem);
44:
45:     return {
46:         rows,
47:         totalUnits: toNumber(data?.Page?.["@totalunits"]),
48:         totalPremium: toNumber(data?.Page?.["@totalpremium"]),
49:     };
50: };
