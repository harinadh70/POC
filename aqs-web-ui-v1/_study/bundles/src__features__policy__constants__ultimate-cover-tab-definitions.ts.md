# BUNDLE for src/features/policy/constants/ultimate-cover-tab-definitions.ts
# 1 photo fragment(s), ascending start-line order.


========== IMG_2574.md ==========
---
photo: IMG_2574.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/constants/ultimate-cover-tab-definitions.ts
lines: 1-14
orientation: 180
confidence: high
notes: Whole file fits on screen (14 lines total, file ends at line 14 which is blank/EOF). Very little ghosting, high legibility. Breadcrumb: aqs-web-ui > src > features > policy > constants > ultimate-cover-tab-definitions.ts > UltimateCoverTab. This file is the source of the ULTIMATE_COVER_TABS constant referenced throughout ultimate-cover.tsx in the other photos in this batch (IMG_2565-2572), and confirms it currently has only 2 tabs defined (Policy, Details) even though ultimate-cover.tsx's UI comments/logic (e.g. "fieldsPerRow={tab.id === 'TABPOLICY' ? 2 : 1}") reference "TABPOLICY" matching id here. Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > features > dashboard\utils (loader.ts, middleware.ts), form\utils (dynamic-form-loader.ts), legacy > components, legacy > utils (loader-optimized.ts U, loader.ts U, middleware-optimize....ts U, middleware.ts U), policy > components (LobActionMenu.tsx, PolicyInformation.tsx M, ultimate-cover.tsx), policy > constants (tab-definitions.ts, ultimate-cover-tab-definit....ts selected/highlighted), utils, FieldRenderer.tsx, index.ts. Tab bar: only one open tab "ultimate-cover-tab-definitions.ts" (no unsaved dot). Status bar: "2 errors / 0 warnings", branch "hitanshu/experimental*", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript (plain .ts file, not JSX). Clock 5:13 PM 7/10/2026.
---
1   export interface UltimateCoverTab {
2       id: string;
3       label: string;
4       matchcode: string;
5       accessletter: string;
6   }
7
8   export const ULTIMATE_COVER_TABS: UltimateCoverTab[] = [
9       { id: 'TABPOLICY', label: 'Policy', matchcode: 'TABPOLICY', accessletter: 'P' },
10      { id: 'TABDET', label: 'Details', matchcode: 'TABDET', accessletter: 'D' },
11  ];
12
13  export const DEFAULT_ACTIVE_TAB = 'TABPOLICY';
14
