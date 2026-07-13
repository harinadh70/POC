# BUNDLE for src/utils/permission-store.ts
# 9 photo fragment(s), ascending start-line order.


========== IMG_4070.md ==========
---
photo: IMG_4070.JPG
type: vscode-code
file: aqs-web-ui/src/utils/permission-store.ts
lines: 1-27
orientation: 180
confidence: high
notes: New file (different from performance-monitor.ts in IMG_4062-4069). Sharp, clean photo — no motion-blur/ghosting artifacts, top of file (Ln 1, Col 1). Explorer sidebar (utils folder, alphabetical): form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop....ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts (highlighted/selected, blue), pub-sub.ts, required-field-validation.ts. Tab bar shows only permission-store.ts open (previous performance-monitor.ts tab is gone). Left activity bar now shows Source Control icon with a "1" badge (uncommitted change indicator), differing from earlier photos. Status bar: branch "hitanshu/experimental*", "⊗2 △0" (down from ⊗3 in earlier photos), "No Solution". Taskbar clock 7:31 PM 7/10/2026.
---
1       /**
2        * Permission Store - Global Permission Cache
3        *
4        * Equivalent to legacy AQS `mxmlSecurity` global variable.
5        * Stores the permission map once on login/app load and provides
6        * access throughout the application lifecycle.
7        *
8        * Usage:
9        *   - Call initializePermissions() in root loader after fetching user data
10       *   - Call getPermissionMap() anywhere permissions are needed
11       *   - Call clearPermissions() on logout
12       */
13

14      import { buildPermissionMapFromApi, type PermissionMap } from './user-permissions';
15

16      // ----------------------------------------
17      // Module-level state (singleton pattern)
18      // ----------------------------------------
19

20      let permissionMap: PermissionMap | null = null;
21      let isInitialized = false;
22

23      // ----------------------------------------
24      // Public API
25      // ----------------------------------------
26

27      /**


========== IMG_4071.md ==========
---
photo: IMG_4071.JPG
type: vscode-code
file: aqs-web-ui/src/utils/permission-store.ts
lines: 9-38
orientation: 180
confidence: high
notes: Same file as IMG_4070, scrolled down slightly (no sticky-scroll header — top-level module code). Photo has moderate ghosting (duplicate text offset by 2 lines, i.e. ghost at row N = content of row N-2), but unlike the performance-monitor.ts photos this offset is small and consistent throughout, so sharp/bold foreground text maps cleanly and unambiguously to each gutter number — cross-checked systematically (ghost at 30/31/33/34/35/36 exactly reproduces the already-known content of 28/29/31/32/33/34), giving high confidence. Lines 9-21 overlap/match IMG_4070 exactly. New content: lines 27-38 (JSDoc for initializePermissions + start of function body). Line 38 "return;" is the last visible line before the status bar/taskbar cuts off the view. Explorer sidebar unchanged (permission-store.ts highlighted). Status bar: branch "hitanshu/experimental*", "⊗2 △0", "No Solution". Taskbar clock 7:31 PM 7/10/2026.
---
9        *   - Call initializePermissions() in root loader after fetching user data
10       *   - Call getPermissionMap() anywhere permissions are needed
11       *   - Call clearPermissions() on logout
12       */
13

14      import { buildPermissionMapFromApi, type PermissionMap } from './user-permissions';
15

16      // ----------------------------------------
17      // Module-level state (singleton pattern)

20      let permissionMap: PermissionMap | null = null;
21      let isInitialized = false;

27      /**
28       * Initialize the global permission store from the API response.
29       * Should be called once after fetching user data (e.g., in root loader).
30       *
31       * @param apiResponse - The raw API response containing xdiSecurity
32       */
33      export function initializePermissions(apiResponse: any): void {
34        if (!apiResponse?.xdiSecurity) {
35          console.warn('[PermissionStore] No xdiSecurity found in API response');
36          permissionMap = null;
37          isInitialized = false;
38          return;


========== IMG_4072.md ==========
---
photo: IMG_4072.JPG
type: vscode-code
file: aqs-web-ui/src/utils/permission-store.ts
lines: 22-48
orientation: 180
confidence: high
notes: Same file as IMG_4070/4071, scrolled down further (new content: rest of initializePermissions() body, lines 39-48). Ghosting present (duplicate offset text) made initial line-number placement for 39-47 uncertain, but IMG_4073 (same file, scrolled slightly further) independently confirms this exact numbering (39="}" closing the if-block, 41-48 as transcribed here), so confidence has been upgraded to high. Lines 22-38 match/overlap IMG_4071. Explorer sidebar unchanged (permission-store.ts highlighted). Status bar: branch "hitanshu/experimental*", "⊗2 △0", "No Solution". Taskbar clock 7:31 PM 7/10/2026.
---
22

24      // Public API

27      /**
28       * Initialize the global permission store from the API response.
29       * Should be called once after fetching user data (e.g., in root loader).
30       *
31       * @param apiResponse - The raw API response containing xdiSecurity
32       */
33      export function initializePermissions(apiResponse: any): void {
34        if (!apiResponse?.xdiSecurity) {
35          console.warn('[PermissionStore] No xdiSecurity found in API response');
36          permissionMap = null;
37          isInitialized = false;
38          return;
39        }
40

41        permissionMap = buildPermissionMapFromApi(apiResponse);
42        isInitialized = true;
43

44        console.log('[PermissionStore] Permissions initialized', {
45          lobCount: Object.keys(permissionMap).length,
46          lobs: Object.keys(permissionMap),
47        });
48      }


========== IMG_4073.md ==========
---
photo: IMG_4073.JPG
type: vscode-code
file: aqs-web-ui/src/utils/permission-store.ts
lines: 33,36-61
orientation: 180
confidence: high
notes: Same file as IMG_4070-4072, scrolled down slightly further (sticky-scroll now pins line 33 initializePermissions() header; lines 34-35 are just above the visible area, hidden under the sticky header). This photo cleanly corroborates and upgrades confidence for IMG_4072's line numbering of 36-48 (which was marked medium-confidence there due to drifting ghost offset) — here the same content reads unambiguously at the identical line numbers (39 is confirmed "}" closing the early-return if-block, not blank as initially guessed before correction). New content beyond IMG_4072: lines 49-61 — JSDoc + getPermissionMap() (50-56), and the start of JSDoc + isPermissionsInitialized() (58-61, body cut off by the status bar after the opening brace). Explorer sidebar unchanged (permission-store.ts highlighted). Status bar: branch "hitanshu/experimental*", "⊗2 △0", "No Solution". Taskbar clock 7:31 PM 7/10/2026.
---
33      export function initializePermissions(apiResponse: any): void {

36        permissionMap = null;
37        isInitialized = false;
38        return;
39      }
40

41      permissionMap = buildPermissionMapFromApi(apiResponse);
42      isInitialized = true;
43

44      console.log('[PermissionStore] Permissions initialized', {
45        lobCount: Object.keys(permissionMap).length,
46        lobs: Object.keys(permissionMap),
47      });
48    }
49

50      /**
51       * Get the current permission map.
52       * Returns null if not initialized.
53       */
54      export function getPermissionMap(): PermissionMap | null {
55        return permissionMap;
56      }
57

58      /**
59       * Check if permissions have been initialized.
60       */
61      export function isPermissionsInitialized(): boolean {


========== IMG_4074.md ==========
---
photo: IMG_4074.JPG
type: vscode-code
file: aqs-web-ui/src/utils/permission-store.ts
lines: 33-72
orientation: 180
confidence: medium
notes: |
  UPDATE: IMG_4075 (same file, sharp/unblurred, lines 59-85) confirms the reconstruction
  below for lines 59-72 was correct. Lines 44-46, 50-52, and 60/64 jsdoc-comment
  placement below are still best-effort/uncertain (not covered by IMG_4075).
  Photo exhibits a motion-blur double-exposure artifact: the editor appears to have been
  mid-scroll during the shutter, so two renderings of the viewport are superimposed,
  offset by ~3 lines. Sharp/bold gutter numbers read clearly as 33 (sticky-scroll header),
  47, 48, 49, then (after an illegible/smeared patch) 53, 54, 55, 56, 57, 58, 59, 60, 61,
  62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72. A fainter ghost text (offset -3 lines from
  each sharp row) overlaps most rows, which made exact line-to-text assignment for the
  jsdoc-comment lines uncertain in a few spots (marked below). Reconstruction below is
  best-effort using the sharp text plus contextual inference from the repeated
  jsdoc-comment + export-function pattern used throughout this file; apparent
  "duplicate" function signatures seen in the raw ghosted image (e.g. getPermissionMap
  appearing to repeat) are almost certainly this ghosting artifact, not real duplicate
  code, once the -3-line offset is accounted for — but this is not 100% certain since
  status bar shows 2 problems / "No Solution" which could also indicate a real TS error
  elsewhere in the file (not necessarily duplication).
  Explorer sidebar (src/utils) visible: form.ts, frame-router.ts, http-instance.ts,
  legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts,
  normalize-service-config copy...ts, normalize-service-config.ts, parse-combo-items.ts,
  parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts,
  performance-benchmarks.ts, performance-monitor.ts, permission-store.ts (open, selected),
  pub-sub.ts, required-field-validation.ts (more below, cut off).
  Tab bar: only "permission-store.ts" tab visible (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > permission-store.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings icons.
  Window title bar: "w11dev0067". Taskbar clock 7:31 PM 7/10/2026 (client machine date/time).
---
33  export function initializePermissions(apiResponse: any): void {
    ⟪? lines 34-43 not visible — function body above the visible viewport ⟫
44  ⟪?⟫  console.log('[PermissionStore] Permissions initialized', {
45  ⟪?⟫    lobCount: Object.keys(permissionMap).length,
46  ⟪?⟫    lobs: Object.keys(permissionMap),
47      });
48  }
49  (blank)
    ⟪? lines 50-52 illegible — smeared by ghosting/motion blur ⟫
53  /**
54   * Get the current permission map.
55   * Returns null if not initialized.
56   */
57  export function getPermissionMap(): PermissionMap | null {
58    return permissionMap;
59  }
60  ⟪?⟫ (blank or start of next jsdoc — not legible)
61  /**
62   * Check if permissions have been initialized.
63   */
64  export function isPermissionsInitialized(): boolean {
    ⟪? line(s) between 64 and 65 uncertain — possible content: "return isInitialized && permissionMap !== null;" then "}" ⟫
65  /**
66   * Clear the permission store.
67   * Should be called on logout to clean up.
68   */
69  export function clearPermissions(): void {
70    permissionMap = null;
71    isInitialized = false;
72    console.log('[PermissionStore] Permissions cleared');


========== IMG_4075.md ==========
---
photo: IMG_4075.JPG
type: vscode-code
file: aqs-web-ui/src/utils/permission-store.ts
lines: 59-85
orientation: 180
confidence: high
notes: |
  Sharp, clean capture (no ghosting/blur), unlike IMG_4074 which showed the same file
  scrolled slightly earlier with a motion-blur double-exposure. This photo confirms the
  best-effort reconstruction made for IMG_4074 lines 59-72 was correct.
  Explorer sidebar (src/utils, aqs-web-ui > src > utils) visible, permission-store.ts
  selected/highlighted: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts,
  local-storage.ts, logger-builder.ts, menu-persistence.ts,
  normalize-service-config copy...ts, normalize-service-config.ts, parse-combo-items.ts,
  parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts,
  performance-benchmarks.ts, performance-monitor.ts, permission-store.ts (open),
  pub-sub.ts, required-field-validation.ts.
  Tab bar: only "permission-store.ts" tab (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > permission-store.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
  Window title bar: "w11dev0067". Taskbar clock 7:31 PM 7/10/2026.
  Cursor at Ln 1, Col 1 (editor not focused / just opened in preview mode).
---
59   * Check if permissions have been initialized.
60   */
61  export function isPermissionsInitialized(): boolean {
62      return isInitialized && permissionMap !== null;
63  }
64
65  /**
66   * Clear the permission store.
67   * Should be called on logout to clean up.
68   */
69  export function clearPermissions(): void {
70      permissionMap = null;
71      isInitialized = false;
72      console.log('[PermissionStore] Permissions cleared');
73  }
74
75  /**
76   * Get permission stats for debugging.
77   */
78  export function getPermissionStats(): {
79      initialized: boolean;
80      lobCount: number;
81      lobs: string[];
82      totalPages: number;
83      totalObjects: number;
84  } {
85      if (!permissionMap) {


========== IMG_4076.md ==========
---
photo: IMG_4076.JPG
type: vscode-code
file: aqs-web-ui/src/utils/permission-store.ts
lines: 75-101
orientation: 180
confidence: high
notes: |
  Sharp, clean capture, no ghosting/blur. Continues directly from IMG_4075 (lines 59-85).
  Explorer sidebar (src/utils) visible, permission-store.ts selected: form.ts,
  frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts,
  logger-builder.ts, menu-persistence.ts, normalize-service-config copy...ts,
  normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts,
  parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts,
  performance-monitor.ts, permission-store.ts (open), pub-sub.ts,
  required-field-validation.ts.
  Tab bar: only "permission-store.ts" tab (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > permission-store.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
  Window title bar: "w11dev0067". Taskbar clock 7:31 PM 7/10/2026.
  Line 101 is the last fully visible line (bottom of viewport, partially cut by status bar).
---
75  /**
76   * Get permission stats for debugging.
77   */
78  export function getPermissionStats(): {
79      initialized: boolean;
80      lobCount: number;
81      lobs: string[];
82      totalPages: number;
83      totalObjects: number;
84  } {
85      if (!permissionMap) {
86          return {
87              initialized: false,
88              lobCount: 0,
89              lobs: [],
90              totalPages: 0,
91              totalObjects: 0,
92          };
93      }
94
95      let totalPages = 0;
96      let totalObjects = 0;
97
98      for (const lob of Object.values(permissionMap)) {
99          totalPages += Object.keys(lob).length;
100         for (const page of Object.values(lob)) {
101             totalObjects += Object.keys(page).length;


========== IMG_4077.md ==========
---
photo: IMG_4077.JPG
type: vscode-code
file: aqs-web-ui/src/utils/permission-store.ts
lines: 78-103
orientation: 180
confidence: high
notes: |
  Motion-blur double-exposure again (same ~3-line-offset ghosting pattern as IMG_4074),
  but lines 78-101 exactly duplicate content already confirmed clean/sharp in IMG_4076,
  so this photo mainly re-confirms that transcription. New content beyond IMG_4076 is
  lines 102-103 (closing braces of the nested for-loops), read from the sharp/crisp
  foreground layer using the same -3-line ghost-offset deconvolution method validated
  on IMG_4074/4075/4076. A further line 104 is present in the ghost layer but its crisp
  counterpart falls below the visible viewport (cut off by the status bar) — not
  transcribed.
  Explorer sidebar (src/utils) visible, permission-store.ts selected: form.ts,
  frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts,
  logger-builder.ts, menu-persistence.ts, normalize-service-config copy...ts,
  normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts,
  parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts,
  performance-monitor.ts, permission-store.ts (open), pub-sub.ts,
  required-field-validation.ts.
  Tab bar: only "permission-store.ts" tab (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > permission-store.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
  Window title bar: "w11dev0067". Taskbar clock 7:31 PM 7/10/2026.
---
78  export function getPermissionStats(): {
79      initialized: boolean;
80      lobCount: number;
81      lobs: string[];
82      totalPages: number;
83      totalObjects: number;
84  } {
85      if (!permissionMap) {
86          return {
87              initialized: false,
88              lobCount: 0,
89              lobs: [],
90              totalPages: 0,
91              totalObjects: 0,
92          };
93      }
94
95      let totalPages = 0;
96      let totalObjects = 0;
97
98      for (const lob of Object.values(permissionMap)) {
99          totalPages += Object.keys(lob).length;
100         for (const page of Object.values(lob)) {
101             totalObjects += Object.keys(page).length;
102         }
103     }


========== IMG_4078.md ==========
---
photo: IMG_4078.JPG
type: vscode-code
file: aqs-web-ui/src/utils/permission-store.ts
lines: 78 (sticky header), 102-113
orientation: 180
confidence: high
notes: |
  Sharp, clean capture, no ghosting/blur. Sticky-scroll header at top pins line 78
  ("export function getPermissionStats(): {"), the enclosing scope for the visible
  body. This appears to be the end of the file — line 113 "}" closes getPermissionStats,
  and the file/viewport ends there (no further content below, large empty area in
  editor). Continues directly from IMG_4077 (which ended at line 103).
  Explorer sidebar (src/utils) visible, permission-store.ts selected: form.ts,
  frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts,
  logger-builder.ts, menu-persistence.ts, normalize-service-config copy...ts,
  normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts,
  parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts,
  performance-monitor.ts, permission-store.ts (open), pub-sub.ts,
  required-field-validation.ts.
  Tab bar: only "permission-store.ts" tab (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > permission-store.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
  Window title bar: "w11dev0067". Taskbar clock 7:31 PM 7/10/2026.
---
78  export function getPermissionStats(): {
    (sticky-scroll header; body lines 79-101 already captured in IMG_4076/IMG_4077)
102         }
103     }
104
105     return {
106         initialized: isInitialized,
107         lobCount: Object.keys(permissionMap).length,
108         lobs: Object.keys(permissionMap),
109         totalPages,
110         totalObjects,
111     };
112 }
113
