# BUNDLE for src/features/policy/index.ts
# 1 photo fragment(s), ascending start-line order.


========== IMG_2648.md ==========
---
photo: IMG_2648.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/index.ts
lines: 1-21
orientation: 180
confidence: high
notes: Explorer shows aqs-web-ui/src/features/policy tree expanded - constants/ (tab-definitions.ts, ultimate-cover-tab-definit...), utils/ (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts), FieldRenderer.tsx, index.ts (selected/highlighted), policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Sibling top-level folders under src: prp, root, hooks, lib, pages, providers, services, types. Branch hitanshu/experimental*, 2 errors 0 warnings, No Solution indicator. File is short (21 lines), fully visible, no scrolling needed.
---
1  // Export main component
2  export { default as UltimateCover } from './components/ultimate-cover';
3
4  // Export loader
5  export { ultimateCoverLoader } from './utils/ultimateCoverLoader';
6
7  // Export field definitions
8  export {
9      ultimateCoverPolicyTabFields,
10     ultimateCoverDetailsTabFields,
11 } from './ultimate-cover-fields';
12
13 // Export types
14 export type {
15     UltimateCoverPageResponse,
16     UltimateCoverFormData,
17     SessionData,
18     Control,
19     PageData,
20 } from './types';
21
