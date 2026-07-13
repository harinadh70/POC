# BUNDLE for src/services/lob-action-menu.ts
# 3 photo fragment(s), ascending start-line order.


========== IMG_3177.md ==========
---
photo: IMG_3177.JPG
type: vscode-code
file: aqs-web-ui/src/services/lob-action-menu.ts
lines: 1-34
orientation: 180
confidence: high
notes: |
  Sharp, unblurred photo (no double-exposure ghosting), fully legible. New file compared to
  prior photos in this batch: aqs-web-ui/src/services/lob-action-menu.ts, tab shows "1"
  (one unsaved change indicator). Explorer sidebar: same tree as before (pages, providers
  folders) with services folder now expanded showing lob-action-menu.ts (highlighted/active),
  navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts, then types, utils folders.
  Status bar: branch hitanshu/experimental*, "No Solution", 3 errors / 0 warnings (down from
  15 in the theme-provider.tsx photos), Tab Size 4, UTF-8, CRLF, TypeScript (not JSX — plain
  .ts file), Ln 1 Col 1. Left activity bar shows an extra icon (looks like a Teams/M-shaped
  icon) with a "1" badge not seen in earlier photos. Timestamp 6:14 PM 7/10/2026. Line 34 is
  cut off at the very bottom edge of the screen (partially visible: "const parsed =
  LobActionMenuResponseSchema.safeParse(response);").
---
1: import { z } from 'zod';
2:
3: import { baseQuery } from '@utils/http-instance';
4:
5: const LobActionMenuResponseSchema = z.object({}).passthrough();
6:
7: export interface LobActionMenuPayload {
8:     Session: {
9:         CompLoc: string;
10:         UserId: string;
11:         PolicyId: string;
12:         NodeKey: string;
13:         Action: string;
14:         DiagnosticMode: string;
15:         SessionXml: string;
16:     };
17:     PageCode: string;
18:     TabFile: string;
19:     XMLListFile: string;
20: }
21:
22: export type LobActionMenuResponse = z.infer<typeof LobActionMenuResponseSchema>;
23:
24: export async function fetchLobActionMenu(
25:     payload: LobActionMenuPayload,
26: ): Promise<{ status: boolean; data: LobActionMenuResponse | null; error?: string }> {
27:     try {
28:         const response = await baseQuery<unknown>({
29:             url: '/LobActionMenu',
30:             method: 'POST',
31:             data: payload,
32:         });
33:
34:         const parsed = LobActionMenuResponseSchema.safeParse(response);  ⟪line cut off at bottom edge of screen, rest not visible⟫


========== IMG_3178.md ==========
---
photo: IMG_3178.JPG
type: vscode-code
file: aqs-web-ui/src/services/lob-action-menu.ts
lines: 7-41
orientation: 180
confidence: medium
notes: |
  Continues/overlaps IMG_3177 (same file), scrolled down slightly; sticky-scroll header pins
  lines 7 (export interface LobActionMenuPayload {) and 8 (Session: {). Whole code area has
  mild double-exposure/motion ghosting (each line has a echo ~2-3 rows away); gutter numbers
  themselves are sharp/unambiguous. Lines 7-34 overlap with and were cross-checked against
  the clean/unblurred IMG_3177 reading (exact match). Lines 35-41 are new (not visible in
  IMG_3177) and were read from the less-blurred of the two overlapping copies at each row,
  cross-checked for internal consistency (if/return/status/data/error/}; / } sequence reads
  cleanly with no contradictions). Line 42 (start of new statement) not visible below the
  status bar.
  Status bar: branch hitanshu/experimental*, "No Solution", 3 errors / 0 warnings, TypeScript,
  UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 6:14 PM 7/10/2026. Tab shows "1" unsaved change.
---
7: export interface LobActionMenuPayload {
8:     Session: {
                ⟪lines 9-10 not visible, scrolled above sticky header (CompLoc, UserId — see IMG_3177)⟫
11:         PolicyId: string;
12:         NodeKey: string;
13:         Action: string;
14:         DiagnosticMode: string;
15:         SessionXml: string;
16:     };
17:     PageCode: string;
18:     TabFile: string;
19:     XMLListFile: string;
20: }
21:
22: export type LobActionMenuResponse = z.infer<typeof LobActionMenuResponseSchema>;
23:
24: export async function fetchLobActionMenu(
25:     payload: LobActionMenuPayload,
26: ): Promise<{ status: boolean; data: LobActionMenuResponse | null; error?: string }> {
27:     try {
28:         const response = await baseQuery<unknown>({
29:             url: '/LobActionMenu',
30:             method: 'POST',
31:             data: payload,
32:         });
33:
34:         const parsed = LobActionMenuResponseSchema.safeParse(response);
35:         if (!parsed.success) {
36:             return {
37:                 status: false,
38:                 data: null,
39:                 error: 'Invalid LobActionMenu response format',
40:             };
41:         }


========== IMG_3179.md ==========
---
photo: IMG_3179.JPG
type: vscode-code
file: aqs-web-ui/src/services/lob-action-menu.ts
lines: 24-55
orientation: 180
confidence: high
notes: |
  Sharp, unblurred photo (no double-exposure ghosting), fully legible. Reaches end of file
  (line 54 closes the function, line 55 blank/EOF). Sticky-scroll header pins line 24
  (export async function fetchLobActionMenu(), so lines 25-33 are not visible here — see
  IMG_3177/IMG_3178 for that span. Confirms lines 34-41 exactly as read in IMG_3178.
  Status bar: branch hitanshu/experimental*, "No Solution", 3 errors / 0 warnings, TypeScript,
  UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 6:14 PM 7/10/2026. Tab shows "1" unsaved change. This
  is very likely the complete lob-action-menu.ts file (1-55).
---
24: export async function fetchLobActionMenu(
                ⟪lines 25-33 not visible, scrolled above sticky header — see IMG_3177/IMG_3178⟫
34:         const parsed = LobActionMenuResponseSchema.safeParse(response);
35:         if (!parsed.success) {
36:             return {
37:                 status: false,
38:                 data: null,
39:                 error: 'Invalid LobActionMenu response format',
40:             };
41:         }
42:
43:         return {
44:             status: true,
45:             data: parsed.data,
46:         };
47:     } catch (error) {
48:         return {
49:             status: false,
50:             data: null,
51:             error: error instanceof Error ? error.message : 'LobActionMenu request failed',
52:         };
53:     }
54: }
55:
