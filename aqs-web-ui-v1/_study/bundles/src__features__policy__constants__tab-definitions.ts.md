# BUNDLE for src/features/policy/constants/tab-definitions.ts
# 1 photo fragment(s), ascending start-line order.


========== IMG_2573.md ==========
---
photo: IMG_2573.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/constants/tab-definitions.ts
lines: 1-17
orientation: 180
confidence: high
notes: Whole file fits on screen (17 lines total, file ends at line 17 which is blank/EOF). Very little ghosting, high legibility. Breadcrumb: aqs-web-ui > src > features > policy > constants > tab-definitions.ts > PolicyTab. Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > features > dashboard\utils (loader.ts, middleware.ts), form\utils (dynamic-form-loader.ts), legacy > components, legacy > utils (loader-optimized.ts U, loader.ts U, middleware-optimize....ts U, middleware.ts U), policy > components (LobActionMenu.tsx, PolicyInformation.tsx M, ultimate-cover.tsx — no unsaved-changes marker visible now, unlike prior photos), policy > constants (expanded: tab-definitions.ts selected/highlighted, ultimate-cover-tab-definit....ts), policy > utils, FieldRenderer.tsx, index.ts. Tab bar: only one open tab "tab-definitions.ts" (no unsaved dot). Status bar problem count is notably different from the ultimate-cover.tsx photos: "2 errors / 0 warnings" here (vs. "23 errors / 2 warnings" earlier) — this is a different, much cleaner file. Branch "hitanshu/experimental*", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript (not JSX — plain .ts file). Clock 5:13 PM 7/10/2026.
---
1   export interface PolicyTab {
2       id: string;
3       label: string;
4       matchcode: string;
5       accessletter: string;
6   }
7
8   export const POLICY_TABS: PolicyTab[] = [
9       { id: 'TABPOL', label: 'Policy', matchcode: 'TABPOL', accessletter: 'P' },
10      { id: 'TABDET', label: 'Policy Detail', matchcode: 'TABDET', accessletter: 'D' },
11      { id: 'TABBIL', label: 'Billing/Misc', matchcode: 'TABBIL', accessletter: 'B' },
12      { id: 'TABINS', label: 'Insured Detail', matchcode: 'TABINS', accessletter: 'I' },
13      { id: 'TABAGT', label: 'Agent Detail', matchcode: 'TABAGT', accessletter: 'A' },
14  ];
15
16  export const DEFAULT_ACTIVE_TAB = 'TABPOL';
17
