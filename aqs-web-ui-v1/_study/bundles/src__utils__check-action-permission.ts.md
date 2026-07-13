# BUNDLE for src/utils/check-action-permission.ts
# 1 photo fragment(s), ascending start-line order.


========== IMG_3444.md ==========
---
photo: IMG_3444.JPG
type: vscode-code
file: aqs-web-ui/src/utils/check-action-permission.ts
lines: 1-27
orientation: 180
confidence: high
notes: Full file visible, sharp/no ghosting (unlike the button-state-manager.ts photos in this batch). File is short and appears complete (ends at line 27 with a trailing blank line 27 in the gutter after the closing brace at 26). Explorer sidebar: same aqs-web-ui/src tree as before, now with check-action-permission.ts highlighted/selected (utils folder: api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa...(truncated), button-state-manager.ts, check-action-permission.ts (selected), command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Only tab open: check-action-permission.ts. Status bar: branch hitanshu/experimental*, "2 ⚠0", No Solution, TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 6:19 PM 7/10/2026.
---
1: import type { PermissionSnapshot } from '@/types';
2:
3: /**
4:  * Check if an action is allowed based on permissions
5:  * Fail-closed: returns false if permissions missing or action denied
6:  */
7: export function isActionAllowed(action: string, permissions: PermissionSnapshot | null): boolean {
8:     if (!permissions) {
9:         console.warn('[Security] No permissions loaded, denying action:', action);
10:         return false;
11:     }
12:
13:     // Check deny list first
14:     if (permissions.actions.deny.includes(action)) {
15:         console.warn('[Security] Action explicitly denied:', action);
16:         return false;
17:     }
18:
19:     // If allow list exists and is non-empty, action must be in it
20:     if (permissions.actions.allow.length > 0 && !permissions.actions.allow.includes(action)) {
21:         console.warn('[Security] Action not in allow list:', action);
22:         return false;
23:     }
24:
25:     return true;
26: }
27:
