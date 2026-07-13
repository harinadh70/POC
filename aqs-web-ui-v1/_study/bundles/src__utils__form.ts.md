# BUNDLE for src/utils/form.ts
# 1 photo fragment(s), ascending start-line order.


========== IMG_3708.md ==========
---
photo: IMG_3708.JPG
type: vscode-code
file: aqs-web-ui/src/utils/form.ts
lines: 1-9 (whole file)
orientation: 180
confidence: high
notes: Clear/sharp photo, no motion blur, entire file visible (only 9 lines, file ends here). form.ts is the newly active/highlighted tab in Explorer sidebar (utils folder), replacing fallback-strategies.ts from prior photos. Sidebar file list unchanged otherwise: apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractors.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts (active), frame-router.ts. Status bar shows "Spaces: 4" (not Tab Size:4 as in fallback-strategies.ts photos). Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*. Cursor/mouse pointer visible mid-editor (no selection).
---
1   // types
2   import type { FormControl } from '@/types';
3
4   // ----------------------------------------
5
6   export const toBool = (v: unknown) => v === true || v === 'T' || v === 'true' || v === 1;
7   export const toReq = (v: unknown) => v === true || v === 'T' || v === 'true' || v === 1;
8   export const kindOf = (c: FormControl) => c.controltype; // unify
9
