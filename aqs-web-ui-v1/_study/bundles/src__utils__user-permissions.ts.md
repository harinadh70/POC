# BUNDLE for src/utils/user-permissions.ts
# 50 photo fragment(s), ascending start-line order.


========== IMG_4197.md ==========
---
photo: IMG_4197.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 1-27
orientation: 180
confidence: high
notes: New tab opened: user-permissions.ts (only tab shown). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts. Explorer sidebar (utils folder) shows: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...ts, url-helpers.ts, user-permissions.ts (selected/highlighted), xml-detail-persistence.ts, zod-error-formatter.ts. Below utils: app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts, and a cut-off types.ts. Status bar: branch hitanshu/experimental (dirty, asterisk), 2 errors / 0 warnings, "No Solution". Cursor at Ln 1, Col 1. Image is sharp/clear, no ghosting artifact this time. Horizontal scrollbar visible at bottom of editor (line 14 is long).
---
1     // permissions.ts
2     // Drop-in utils to apply security permissions to a Page Builder response
3     // using your Permission API response. Handles mixed array/object nodes.
4
5     /** ===== Types ===== */
6
7     export type TF = 'T' | 'F';
8
9     export interface PermissionNode {
10        vis: boolean; // visible
11        dis: boolean; // disabled
12    }
13
14    export type PermissionMap = Record<string, Record<string, Record<string, PermissionNode>>>; // lob -> page ->
15
16    export type FallbackMode = 'VisibleEnabled' | 'HiddenDisabled';
17
18    export type LookupStrategy =
19        | 'exact' // only exact [lob][page][obj]
20        | 'exact-then-wider'; // exact, else search any page in lob, else GBL
21
22    export interface ApplyOptions {
23        /** How to behave when a permission is not found (mimics VBScript variants). Default: VisibleEnabled */
24        fallbackMode?: FallbackMode;
25        /** Lookup breadth when exact page isn't found in permission map. Default: exact-then-wider */
26        lookupStrategy?: LookupStrategy;
27


========== IMG_4198.md ==========
---
photo: IMG_4198.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 9-34
orientation: 180
confidence: medium
notes: Same tab as IMG_4197 (user-permissions.ts), scrolled down. Lines 9-27 repeat/confirm content already seen in IMG_4197; new content revealed at lines 28-34 (ApplyOptions continued: compLocToLob, nodeKeyToLob, actionToPageMc mapping fields, and defaultLob fallback field). Photo shows the same double-exposure/motion-blur ghosting artifact as the url-helpers.ts photos (a fainter duplicate of the whole visible block appears shifted down by about 13 lines, e.g. line 9's content-echo reappears near line 22, line 14's echo reappears near line 27, etc.) — treated as camera artifact, not real duplicate code; transcription uses the bold/clear-aligned text at each gutter number. Explorer sidebar (utils folder) unchanged: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...ts, url-helpers.ts, user-permissions.ts (selected), xml-detail-persistence.ts, zod-error-formatter.ts. Status bar: branch hitanshu/experimental (dirty, asterisk), 2 errors / 0 warnings, "No Solution". Cursor at Ln 1, Col 1.
---
9     export interface PermissionNode {
10        vis: boolean; // visible
11        dis: boolean; // disabled
12    }
13
14    export type PermissionMap = Record<string, Record<string, Record<string, PermissionNode>>>; // lob -> page ->
15
16    export type FallbackMode = 'VisibleEnabled' | 'HiddenDisabled';
17
18    export type LookupStrategy =
19        | 'exact' // only exact [lob][page][obj]
20        | 'exact-then-wider'; // exact, else search any page in lob, else GBL
21
22    export interface ApplyOptions {
23        /** How to behave when a permission is not found (mimics VBScript variants). Default: VisibleEnabled */
24        fallbackMode?: FallbackMode;
25        /** Lookup breadth when exact page isn't found in permission map. Default: exact-then-wider */
26        lookupStrategy?: LookupStrategy;
27
28        /** Mappings to resolve LOB & Page keys from PageBuilder session context */
29        compLocToLob?: Record<string, string>;
30        nodeKeyToLob?: Record<string, string>;
31        actionToPageMc?: Record<string, string>;
32
33        /** Fallback LOB if nothing resolves (must exist in permissionMap to be used) */
34        defaultLob?: string;


========== IMG_4199.md ==========
---
photo: IMG_4199.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 14-40
orientation: 180
confidence: high
notes: Same tab as IMG_4197/IMG_4198 (user-permissions.ts), scrolled down further. Lines 14-34 repeat/confirm content already seen in IMG_4197/IMG_4198; new content revealed at lines 35-40 (forceDisableWhenHidden option, closing brace of ApplyOptions interface at 38, and a new "Small Utilities" section header comment at 40). Photo still shows a faint ghosting/motion-blur echo of some lines (e.g. faint duplicate text behind lines 21-31), but text is legible and mostly high confidence. Explorer sidebar (utils folder) unchanged: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...ts, url-helpers.ts, user-permissions.ts (selected), xml-detail-persistence.ts, zod-error-formatter.ts. Status bar: branch hitanshu/experimental (dirty, asterisk), 2 errors / 0 warnings, "No Solution". Cursor at Ln 1, Col 1.
---
14    export type PermissionMap = Record<string, Record<string, Record<string, PermissionNode>>>; // lob -> page ->
15
16    export type FallbackMode = 'VisibleEnabled' | 'HiddenDisabled';
17
18    export type LookupStrategy =
19        | 'exact' // only exact [lob][page][obj]
20        | 'exact-then-wider'; // exact, else search any page in lob, else GBL
21
22    export interface ApplyOptions {
23        /** How to behave when a permission is not found (mimics VBScript variants). Default: VisibleEnabled */
24        fallbackMode?: FallbackMode;
25        /** Lookup breadth when exact page isn't found in permission map. Default: exact-then-wider */
26        lookupStrategy?: LookupStrategy;
27
28        /** Mappings to resolve LOB & Page keys from PageBuilder session context */
29        compLocToLob?: Record<string, string>;
30        nodeKeyToLob?: Record<string, string>;
31        actionToPageMc?: Record<string, string>;
32
33        /** Fallback LOB if nothing resolves (must exist in permissionMap to be used) */
34        defaultLob?: string;
35
36        /** Optional: If true, when visible=false also force disabled=true for safety */
37        forceDisableWhenHidden?: boolean;
38    }
39
40    /** ===== Small Utilities ===== */


========== IMG_4200.md ==========
---
photo: IMG_4200.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 18-46
orientation: 180
confidence: high
notes: Same tab as IMG_4197/4198/4199 (user-permissions.ts), scrolled down further. Lines 18-40 repeat/confirm content already seen in prior photos in this sequence. New content revealed at lines 41-46: toBool and toTF small utility functions, and the start of a JSDoc comment "Resolve LOB key with BOP exception handling." for a function whose signature is cut off at the bottom of the visible area (line 46 is the last visible, partially obscured by window edge). Image is sharp, no ghosting artifact this time. Explorer sidebar (utils folder) unchanged: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...ts, url-helpers.ts, user-permissions.ts (selected), xml-detail-persistence.ts, zod-error-formatter.ts. Status bar: branch hitanshu/experimental (dirty, asterisk), 2 errors / 0 warnings, "No Solution". Cursor at Ln 1, Col 1.
---
18    export type LookupStrategy =
19        (line not fully visible - continues from prior photo)
20        | 'exact-then-wider'; // exact, else search any page in lob, else GBL
21
22    export interface ApplyOptions {
23        /** How to behave when a permission is not found (mimics VBScript variants). Default: VisibleEnabled */
24        fallbackMode?: FallbackMode;
25        /** Lookup breadth when exact page isn't found in permission map. Default: exact-then-wider */
26        lookupStrategy?: LookupStrategy;
27
28        /** Mappings to resolve LOB & Page keys from PageBuilder session context */
29        compLocToLob?: Record<string, string>;
30        nodeKeyToLob?: Record<string, string>;
31        actionToPageMc?: Record<string, string>;
32
33        /** Fallback LOB if nothing resolves (must exist in permissionMap to be used) */
34        defaultLob?: string;
35
36        /** Optional: If true, when visible=false also force disabled=true for safety */
37        forceDisableWhenHidden?: boolean;
38    }
39
40    /** ===== Small Utilities ===== */
41
42    const toBool = (v?: TF | string): boolean => v === 'T';
43    const toTF = (b: boolean): TF => (b ? 'T' : 'F');
44
45    /**
46     * Resolve LOB key with BOP exception handling.


========== IMG_4201.md ==========
---
photo: IMG_4201.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 18-46
orientation: 180
confidence: high
notes: Near-duplicate of IMG_4200 — same tab (user-permissions.ts), identical scroll position (lines 18-46 visible, same timestamp 7:50 PM / 19:50 in taskbar), content identical. Likely a second photo taken of the same screen state. Explorer sidebar and status bar identical to IMG_4200 (branch hitanshu/experimental, dirty, 2 errors / 0 warnings, "No Solution").
---
18    export type LookupStrategy =
20        | 'exact-then-wider'; // exact, else search any page in lob, else GBL
21
22    export interface ApplyOptions {
23        /** How to behave when a permission is not found (mimics VBScript variants). Default: VisibleEnabled */
24        fallbackMode?: FallbackMode;
25        /** Lookup breadth when exact page isn't found in permission map. Default: exact-then-wider */
26        lookupStrategy?: LookupStrategy;
27
28        /** Mappings to resolve LOB & Page keys from PageBuilder session context */
29        compLocToLob?: Record<string, string>;
30        nodeKeyToLob?: Record<string, string>;
31        actionToPageMc?: Record<string, string>;
32
33        /** Fallback LOB if nothing resolves (must exist in permissionMap to be used) */
34        defaultLob?: string;
35
36        /** Optional: If true, when visible=false also force disabled=true for safety */
37        forceDisableWhenHidden?: boolean;
38    }
39
40    /** ===== Small Utilities ===== */
41
42    const toBool = (v?: TF | string): boolean => v === 'T';
43    const toTF = (b: boolean): TF => (b ? 'T' : 'F');
44
45    /**
46     * Resolve LOB key with BOP exception handling.


========== IMG_4202.md ==========
---
photo: IMG_4202.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 22, 36-61
orientation: 180
confidence: medium
notes: Same tab as prior photos in sequence (user-permissions.ts). Sticky-scroll header shows line 22 (export interface ApplyOptions {) since viewport top (line 36) is still inside that interface. New function resolveLobKeyWithBopException begins here with a JSDoc comment describing legacy AQS BOP-LOB special-casing logic. Photo shows the familiar double-exposure/motion-blur ghosting (faint duplicate of the whole block shifted down ~13 lines), used bold/clear-aligned text for transcription. Line 61 ends with "} else {" and a further line partially visible below it (looks like a comment "// BOP|POL|...|ISO|... -> \"BOPISO\"") is cut off by the taskbar/window edge and not reliably legible — omitted, expect it in the next photo. Explorer sidebar (utils folder) unchanged. Status bar: branch hitanshu/experimental (dirty, asterisk), 2 errors / 0 warnings, "No Solution". Cursor at Ln 1, Col 1.
---
22    export interface ApplyOptions {
36        /** Optional: If true, when visible=false also force disabled=true for safety */
37        forceDisableWhenHidden?: boolean;
38    }
39
40    /** ===== Small Utilities ===== */
41
42    const toBool = (v?: TF | string): boolean => v === 'T';
43    const toTF = (b: boolean): TF => (b ? 'T' : 'F');
44
45    /**
46     * Resolve LOB key with BOP exception handling.
47     * Legacy AQS special logic:
48     *   - BOP|POL|0|ISO|0 → "BOPISO" (segment1 + segment4)
49     *   - BOP|SPC|0|0|ISO|... → "BOPISO" (segment1 + segment5 when segment2 starts with "SPC")
50     *   - All other LOBs → segment1 only
51     */
52    export function resolveLobKeyWithBopException(nodeKey: string): string {
53        const segments = nodeKey.split('|');
54        const segment1 = segments[0] || '';
55
56        if (segment1.toUpperCase() === 'BOP') {
57            const segment2 = segments[1] || '';
58            if (segment2.toUpperCase().startsWith('SPC')) {
59                // BOP|SPC|...|...|ISO|... → "BOPISO"
60                return segment1 + (segments[4] || '');
61            } else {


========== IMG_4203.md ==========
---
photo: IMG_4203.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 48-75
orientation: 180
confidence: medium
notes: Same tab as prior photos in sequence (user-permissions.ts), scrolled down. Lines 48-61 repeat/confirm content already seen in IMG_4202. New content: the "else" branch of resolveLobKeyWithBopException (BOP|POL case, lines 62-63), its closing braces (64-65), fallback return segment1 (67), function close (68), and the start of two more helper functions: normalizeArray<T> (lines 70-73) and safeClone<T> (line 75, cut off at bottom of visible area by the taskbar/window edge — a comment "// structuredClone is available in modern runtimes; JSON fallback for older ..." is partially visible below it but not reliably legible, expect full text in next photo). Photo again shows the double-exposure/motion-blur ghosting artifact (faint duplicate block shifted down ~13 lines); bold/clear-aligned text used for transcription. Explorer sidebar (utils folder) unchanged. Status bar: branch hitanshu/experimental (dirty, asterisk), 2 errors / 0 warnings, "No Solution". Cursor at Ln 1, Col 1.
---
48    *   - BOP|POL|0|ISO|0 → "BOPISO" (segment1 + segment4)
49    *   - BOP|SPC|0|0|ISO|... → "BOPISO" (segment1 + segment5 when segment2 starts with "SPC")
50    *   - All other LOBs → segment1 only
51    */
52    export function resolveLobKeyWithBopException(nodeKey: string): string {
53        const segments = nodeKey.split('|');
54        const segment1 = segments[0] || '';
55
56        if (segment1.toUpperCase() === 'BOP') {
57            const segment2 = segments[1] || '';
58            if (segment2.toUpperCase().startsWith('SPC')) {
59                // BOP|SPC|...|...|ISO|... → "BOPISO"
60                return segment1 + (segments[4] || '');
61            } else {
62                // BOP|POL|...|ISO|... → "BOPISO"
63                return segment1 + (segments[3] || '');
64            }
65        }
66
67        return segment1;
68    }
69
70    function normalizeArray<T>(x: T | T[] | undefined): T[] {
71        if (!x) return [];
72        return Array.isArray(x) ? x : [x];
73    }
74
75    function safeClone<T>(obj: T): T {


========== IMG_4204.md ==========
---
photo: IMG_4204.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 52 (sticky), 65-90
orientation: 180
confidence: medium
notes: Same tab as prior photos (user-permissions.ts). Sticky-scroll header shows line 52 (resolveLobKeyWithBopException). Lines 65-73 repeat/confirm content already seen in IMG_4203 (end of resolveLobKeyWithBopException and normalizeArray helper). New content: safeClone<T> function body (75-80) and the start of a large JSDoc block (82-90) documenting the shape of a "Build Permission Map from YOUR API shape" example object (xdiSecurity > lob > ... nesting begins). This photo has a strong, consistent double-exposure/motion-blur ghosting artifact offset by exactly +5 lines (e.g. line 70's text reappears faintly at line 75, line 71's at 76, etc.) — used to cross-check the bold/clear text at each gutter number. Lines 77, 81, 83, and 85 showed only the faint +5 ghost of an earlier line with no distinguishable bold text of their own; inferred as blank lines (77, 81) or bare " *" JSDoc continuation lines (83, 85) based on surrounding structure — flagged low-confidence, not directly confirmed legible. Line 90 is cut off at the very bottom edge by the taskbar, only "{" partially visible. Explorer sidebar (utils folder) unchanged. Status bar: branch hitanshu/experimental (dirty, asterisk), 2 errors / 0 warnings, "No Solution". Cursor at Ln 1, Col 1.
---
52    export function resolveLobKeyWithBopException(nodeKey: string): string {
65        }
66
67        return segment1;
68    }
69
70    function normalizeArray<T>(x: T | T[] | undefined): T[] {
71        if (!x) return [];
72        return Array.isArray(x) ? x : [x];
73    }
74
75    function safeClone<T>(obj: T): T {
76        // structuredClone is available in modern runtimes; JSON fallback for older environments
77        ⟪blank line — inferred, only ghosting artifact visible⟫
78        if (typeof structuredClone === 'function') return structuredClone(obj);
79        return JSON.parse(JSON.stringify(obj));
80    }
81    ⟪blank line — inferred, only ghosting artifact visible⟫
82    /** ===== Build Permission Map from YOUR API shape =====
83     * ⟪blank JSDoc line — inferred, only ghosting artifact visible⟫
84     * Accepts the exact shape you shared (mixed array/object for pag/obj).
85     * ⟪blank JSDoc line — inferred, only ghosting artifact visible⟫
86     * Input shape:
87     * {
88     *   xdiSecurity: {
89     *     lob: [
90     *       {


========== IMG_4205.md ==========
---
photo: IMG_4205.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 85-111
orientation: 180
confidence: high
notes: Same tab as prior photos in sequence (user-permissions.ts), scrolled down. Completes the JSDoc example block started in IMG_4204 (an example "Input shape" JSON showing xdiSecurity > lob[] > pag[] > obj[] nesting with "@mc"/"@vis"/"@dis" attribute-style keys, consistent with legacy XML-derived security data), then begins the real implementation: export function buildPermissionMapFromApi(api: any): PermissionMap, initializing an empty map and normalizing api?.xdiSecurity?.lob via the normalizeArray helper seen earlier. Slight ghosting artifact only near the very bottom rows (108-112), rest of the image is sharp. Explorer sidebar (utils folder) unchanged. Status bar: branch hitanshu/experimental (dirty, asterisk), 2 errors / 0 warnings, "No Solution". Cursor at Ln 1, Col 1.
---
85     *
86     * Input shape:
87     * {
88     *   xdiSecurity: {
89     *     lob: [
90     *       {
91     *         "@mc": "BOPACE",
92     *         pag: [
93     *           {
94     *             "@mc": "PolAsp",
95     *             obj: [
96     *               { "@mc": "BOPPOL_NIRM1", "@vis": "T", "@dis": "F" },
97     *               ...
98     *             ]
99     *           },
100    *           ...
101    *         ]
102    *       },
103    *       ...
104    *     ]
105    *   }
106    * }
107    */
108    export function buildPermissionMapFromApi(api: any): PermissionMap {
109        const map: PermissionMap = {};
110
111        const lobList = normalizeArray(api?.xdiSecurity?.lob);


========== IMG_4206.md ==========
---
photo: IMG_4206.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 96-122
orientation: 180
confidence: medium
notes: Photo has a motion-blur double-exposure artifact throughout the code pane — two overlapping copies of the scrolling content are visible, offset vertically by ~2-3 lines (gutter shows two overlapping sets of line numbers, e.g. faint "106/107/108..." behind the sharp "108/109/110..."). Transcription below follows the sharp/bold-white layer only (the one matching each printed gutter number) and discards the fainter ghost duplicate. Cross-validated against IMG_4207 (same file, same function, overlapping/continuing lines 108-138) which confirms this reading and resolves ambiguity for lines 113-122 (the logic is a clean 3-level nested loop: lob -> pag -> obj, each level following an identical shape, which matches exactly). Lines 96-107 are the tail of a JSDoc comment showing an example nested JSON shape (xdiSecurity.lob[].pag[].obj[]) that the function below parses; the comment also shows the same ghosting (e.g. faint "@mc": "PolAsp"," near line 97, faint duplicate object near line 99) which is the artifact, not real additional lines — comment content transcribed at medium confidence. Explorer sidebar (src/utils folder expanded) shows: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...ts (name truncated), url-helpers.ts, user-permissions.ts (open/selected, highlighted blue), xml-detail-persistence.ts, zod-error-formatter.ts; above utils: app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts, types.ts (partially visible, cut off at bottom of sidebar). Only one tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts. Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock shows 7:50 PM 7/10/2026.
---
```
096   *      { "@mc": "BOPPOL_NIRM1", "@vis": "T", "@dis": "F" },
097   *      ...
098   *    ]
099   *   },
100   *   ...
101   *  ]
102   *  },
103   *  ...
104   * ]
105   * }
106   * }
107   */
108   export function buildPermissionMapFromApi(api: any): PermissionMap {
109       const map: PermissionMap = {};
110
111       const lobList = normalizeArray(api?.xdiSecurity?.lob);
112
113       for (const lob of lobList) {
114           const lobMc: string | undefined = lob?.['@mc'];
115           if (!lobMc) continue;
116           if (!map[lobMc]) map[lobMc] = {};
117
118           const pagList = normalizeArray(lob?.pag);
119
120           for (const pag of pagList) {
121               const pageMc: string | undefined = pag?.['@mc'];
122               if (!pageMc) continue;
```


========== IMG_4207.md ==========
---
photo: IMG_4207.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 108, 113-137
orientation: 180
confidence: medium
notes: Same file/function as IMG_4206, scrolled slightly further down, with a VS Code sticky-scroll header pinning line 108 (the enclosing "export function buildPermissionMapFromApi..." signature) at the top of the editor, separated by a thin divider, while the actual scrolled viewport resumes at line 113 (lines 109-112 are not visible, hidden behind/above the sticky header). Photo also has the same motion-blur double-exposure artifact as IMG_4206 (ghost duplicate text offset ~2-3 lines, varying direction). Transcription follows the sharp/bold-white layer matching each gutter number; lines 127-137 are unambiguous/clean (no meaningful ghosting) and confirm the reconstructed pattern for 113-126 (3-level nested loop lob->pag->obj, each level: derive Mc key, `if (!Mc) continue;`, ensure map bucket exists, blank line, then declare next-level list). Explorer sidebar identical to IMG_4206 (src/utils expanded: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...ts, url-helpers.ts, user-permissions.ts selected, xml-detail-persistence.ts, zod-error-formatter.ts; above utils: app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts). Only tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock 7:50 PM 7/10/2026. A text-cursor (I-beam) appears near end of a ghosted line ~124 but is part of the blur artifact, not treated as meaningful.
---
```
108   export function buildPermissionMapFromApi(api: any): PermissionMap {
        ⋮  (sticky-scroll divider; lines 109-112 scrolled out of view above)
113       for (const lob of lobList) {
114           const lobMc: string | undefined = lob?.['@mc'];
115           if (!lobMc) continue;
116           if (!map[lobMc]) map[lobMc] = {};
117
118           const pagList = normalizeArray(lob?.pag);
119
120           for (const pag of pagList) {
121               const pageMc: string | undefined = pag?.['@mc'];
122               if (!pageMc) continue;
123               if (!map[lobMc][pageMc]) map[lobMc][pageMc] = {};
124
125               const objList = normalizeArray(pag?.obj);
126
127               for (const obj of objList) {
128                   const objMc: string | undefined = obj?.['@mc'];
129                   if (!objMc) continue;
130                   const vis = toBool(obj?.['@vis']);
131                   const dis = toBool(obj?.['@dis']);
132                   map[lobMc][pageMc][objMc] = { vis, dis };
133               }
134           }
135       }
136
137       return map;
138   }
```


========== IMG_4208.md ==========
---
photo: IMG_4208.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 108, 120-146
orientation: 180
confidence: high
notes: Same file/tab as IMG_4206/4207, scrolled further down. VS Code sticky-scroll pins line 108 (enclosing function signature) at the top with a thin divider; the scrolled viewport resumes at line 120 (partially clipped by the divider but legible). Mild motion-blur ghosting is visible around lines 133-135 (a faint duplicate of lines 130-132 bleeds through) but this range was independently confirmed clean/unambiguous in IMG_4207, so read at high confidence. Lines 140-146 begin a new JSDoc comment block for the next function (resolveLobKey), fully legible. Explorer sidebar same as prior photos (src/utils expanded, user-permissions.ts selected). Only tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock 7:50 PM 7/10/2026.
---
```
108   export function buildPermissionMapFromApi(api: any): PermissionMap {
        ⋮  (sticky-scroll divider; lines 109-119 scrolled out of view above)
120           for (const pag of pagList) {
121               const pageMc: string | undefined = pag?.['@mc'];
122               if (!pageMc) continue;
123               if (!map[lobMc][pageMc]) map[lobMc][pageMc] = {};
124
125               const objList = normalizeArray(pag?.obj);
126
127               for (const obj of objList) {
128                   const objMc: string | undefined = obj?.['@mc'];
129                   if (!objMc) continue;
130                   const vis = toBool(obj?.['@vis']);
131                   const dis = toBool(obj?.['@dis']);
132                   map[lobMc][pageMc][objMc] = { vis, dis };
133               }
134           }
135       }
136
137       return map;
138   }
139
140   /** ===== Resolve LOB from PageBuilder Session =====
141    *
142    * Strategy:
143    *   1) compLocToLob mapping (if provided)
144    *   2) If Session.CompLoc is itself a known LOB, use it
145    *   3) nodeKeyToLob mapping using first token of NodeKey (e.g., "POL|POL|0|" -> "POL")
146    *   4) defaultLob (if provided and valid)
```


========== IMG_4209.md ==========
---
photo: IMG_4209.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 108, 134-159
orientation: 180
confidence: high
notes: Same file/tab, scrolled further down from IMG_4208 (overlaps its lines 134-146). VS Code sticky-scroll still pins line 108 (enclosing function signature, now stale/from the previous function since resolveLobKey starts at 148 - the sticky header shown is for buildPermissionMapFromApi, left over as the top of the file's outer scope is not itself enclosing the new function; treated as informational only). Mild motion-blur ghosting (~2-line offset duplicate) visible from line 151 downward but every line cross-checked against its sharp/bold layer and internally consistent - high confidence. Lines 148-152 are the resolveLobKey function signature (multi-line params): pageBuilderJson: any, permissionMap: PermissionMap, options?: Pick<ApplyOptions, 'compLocToLob' | 'nodeKeyToLob' | 'defaultLob'>, returning string | undefined. Explorer sidebar unchanged from prior photos. Only tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock 7:50 PM 7/10/2026.
---
```
108   export function buildPermissionMapFromApi(api: any): PermissionMap {
        ⋮  (sticky-scroll divider; lines 109-133 scrolled out of view above)
134           }
135       }
136
137       return map;
138   }
139
140   /** ===== Resolve LOB from PageBuilder Session =====
141    *
142    * Strategy:
143    *   1) compLocToLob mapping (if provided)
144    *   2) If Session.CompLoc is itself a known LOB, use it
145    *   3) nodeKeyToLob mapping using first token of NodeKey (e.g., "POL|POL|0|" -> "POL")
146    *   4) defaultLob (if provided and valid)
147    */
148   export function resolveLobKey(
149       pageBuilderJson: any,
150       permissionMap: PermissionMap,
151       options?: Pick<ApplyOptions, 'compLocToLob' | 'nodeKeyToLob' | 'defaultLob'>,
152   ): string | undefined {
153       const validLobs = new Set(Object.keys(permissionMap));
154
155       const compLoc = pageBuilderJson?.Session?.CompLoc as string | undefined;
156       const nodeKey = pageBuilderJson?.Session?.NodeKey as string | undefined;
157
158       if (compLoc && options?.compLocToLob) {
159           const mapped = options.compLocToLob[compLoc];
```


========== IMG_4210.md ==========
---
photo: IMG_4210.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 138-163
orientation: 180
confidence: high
notes: Same file/tab as prior photos in this sequence, scrolled to show the tail of buildPermissionMapFromApi (line 138 closing brace, faint sticky-scroll ghost of its signature above it) and the new resolveLobKey function (140-163). Mild motion-blur ghosting present (~3-line-offset faint duplicate) but every line here is legible at high confidence; cross-checked against IMG_4209 (108-159, agrees) and IMG_4211 (148-172, agrees). Line 164 is visible at the very bottom edge of the frame ("if (nodeKey) {") but partially cut off/blurred — not transcribed here, see IMG_4211. Explorer sidebar unchanged (src/utils expanded, user-permissions.ts selected, same file list as prior photos). Only tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock 7:50 PM 7/10/2026.
---
```
138   }
139
140   /** ===== Resolve LOB from PageBuilder Session =====
141    *
142    * Strategy:
143    *   1) compLocToLob mapping (if provided)
144    *   2) If Session.CompLoc is itself a known LOB, use it
145    *   3) nodeKeyToLob mapping using first token of NodeKey (e.g., "POL|POL|0|" -> "POL")
146    *   4) defaultLob (if provided and valid)
147    */
148   export function resolveLobKey(
149       pageBuilderJson: any,
150       permissionMap: PermissionMap,
151       options?: Pick<ApplyOptions, 'compLocToLob' | 'nodeKeyToLob' | 'defaultLob'>,
152   ): string | undefined {
153       const validLobs = new Set(Object.keys(permissionMap));
154
155       const compLoc = pageBuilderJson?.Session?.CompLoc as string | undefined;
156       const nodeKey = pageBuilderJson?.Session?.NodeKey as string | undefined;
157
158       if (compLoc && options?.compLocToLob) {
159           const mapped = options.compLocToLob[compLoc];
160           if (mapped && validLobs.has(mapped)) return mapped;
161       }
162
163       if (compLoc && validLobs.has(compLoc)) return compLoc;
```


========== IMG_4211.md ==========
---
photo: IMG_4211.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 148-172
orientation: 180
confidence: high
notes: Same file/tab, scrolled slightly further than IMG_4210 (overlaps its lines 148-163, which agree). Motion-blur double-exposure ghosting (~3-line offset faint duplicate) is heavier here than in IMG_4210, especially lines 158-172. Lines 164-172 below were corrected against the much clearer IMG_4212 (same range, minimal ghosting there) — the `// Use BOP exception logic...` comment sits BEFORE `if (nodeKey) {` (not inside it as this blurry photo alone suggested), and the fallback block is nested inside the nodeKey block. Confidence high for 148-163 (corroborated by IMG_4210) and 164-172 (corrected/corroborated by IMG_4212). Explorer sidebar unchanged. Only tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock 7:50 PM 7/10/2026.
---
```
148   export function resolveLobKey(
149       pageBuilderJson: any,
150       permissionMap: PermissionMap,
151       options?: Pick<ApplyOptions, 'compLocToLob' | 'nodeKeyToLob' | 'defaultLob'>,
152   ): string | undefined {
153       const validLobs = new Set(Object.keys(permissionMap));
154
155       const compLoc = pageBuilderJson?.Session?.CompLoc as string | undefined;
156       const nodeKey = pageBuilderJson?.Session?.NodeKey as string | undefined;
157
158       if (compLoc && options?.compLocToLob) {
159           const mapped = options.compLocToLob[compLoc];
160           if (mapped && validLobs.has(mapped)) return mapped;
161       }
162
163       if (compLoc && validLobs.has(compLoc)) return compLoc;
164
165       // Use BOP exception logic for NodeKey resolution
166       if (nodeKey) {
167           const resolvedLob = resolveLobKeyWithBopException(nodeKey);
168           if (validLobs.has(resolvedLob)) return resolvedLob;
169
170           // Fallback to nodeKeyToLob mapping if provided
171           if (options?.nodeKeyToLob) {
172               const root = nodeKey.split('|')[0];
```


========== IMG_4212.md ==========
---
photo: IMG_4212.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 148, 163-188
orientation: 180
confidence: high
notes: Same file/tab, sticky-scroll still pins line 148 (resolveLobKey signature) at top; scrolled viewport resumes at line 163. Text is largely crisp with only light ghosting on a few lines (e.g. faint duplicate of 163 behind 166, faint duplicates around 174-182) which is easily discounted against the sharp layer. This photo resolves the exact structure of the nodeKey/BOP-exception branch (166-176) and confirms/corrects the reading from IMG_4211: the `// Use BOP exception logic for NodeKey resolution` comment (165) precedes `if (nodeKey) {` (166), and the nodeKeyToLob fallback (170-175) is nested inside that block. Lines 185-188 begin a new JSDoc comment for resolvePageKey. Explorer sidebar unchanged from prior photos. Only tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock 7:50 PM 7/10/2026.
---
```
148   export function resolveLobKey(
        ⋮  (sticky-scroll divider; lines 149-162 scrolled out of view above)
163       if (compLoc && validLobs.has(compLoc)) return compLoc;
164
165       // Use BOP exception logic for NodeKey resolution
166       if (nodeKey) {
167           const resolvedLob = resolveLobKeyWithBopException(nodeKey);
168           if (validLobs.has(resolvedLob)) return resolvedLob;
169
170           // Fallback to nodeKeyToLob mapping if provided
171           if (options?.nodeKeyToLob) {
172               const root = nodeKey.split('|')[0];
173               const mapped = options.nodeKeyToLob[root];
174               if (mapped && validLobs.has(mapped)) return mapped;
175           }
176       }
177
178       if (options?.defaultLob && validLobs.has(options.defaultLob)) {
179           return options.defaultLob;
180       }
181
182       return undefined;
183   }
184
185   /** ===== Resolve Page key =====
186    *
187    * Strategy:
188    *   1) actionToPageMc mapping against Session.Action (if provided)
```


========== IMG_4213.md ==========
---
photo: IMG_4213.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 148, 173-198
orientation: 180
confidence: high
notes: Same file/tab, sticky-scroll still pins line 148 (resolveLobKey signature); scrolled viewport resumes at line 173, overlapping/confirming IMG_4212's tail (173-183). Only light ghosting present, easily discounted. Lines 185-192 are a JSDoc comment describing the strategy for the next function, resolvePageKey (193-198+, signature continues past the visible frame). Explorer sidebar unchanged. Only tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock 7:50 PM 7/10/2026.
---
```
148   export function resolveLobKey(
        ⋮  (sticky-scroll divider; lines 149-172 scrolled out of view above)
173               const mapped = options.nodeKeyToLob[root];
174               if (mapped && validLobs.has(mapped)) return mapped;
175           }
176       }
177
178       if (options?.defaultLob && validLobs.has(options.defaultLob)) {
179           return options.defaultLob;
180       }
181
182       return undefined;
183   }
184
185   /** ===== Resolve Page key =====
186    *
187    * Strategy:
188    *   1) actionToPageMc mapping against Session.Action (if provided)
189    *   2) If Session.Action itself is a page present under the resolved LOB, use it
190    *   3) If Page has an explicit "@matchcode" (rare in your Page JSON), use it when valid
191    *   4) Otherwise return undefined; the lookup can try wider strategies.
192    */
193   export function resolvePageKey(
194       pageBuilderJson: any,
195       lobKey: string | undefined,
196       permissionMap: PermissionMap,
197       options?: Pick<ApplyOptions, 'actionToPageMc'>,
198   ): string | undefined {
```


========== IMG_4214.md ==========
---
photo: IMG_4214.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 185-211
orientation: 180
confidence: high
notes: Same file/tab, continues past resolveLobKey into the resolvePageKey JSDoc comment and function body. Motion-blur double-exposure ghosting present throughout (a fainter duplicate offset a few lines) but every line cross-validated against IMG_4213 (185-198, agrees exactly) and IMG_4215 (193-218, agrees exactly), so high confidence. Explorer sidebar unchanged from prior photos in this sequence (src/utils expanded, user-permissions.ts selected). Only tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock 7:50 PM 7/10/2026.
---
```
185   /** ===== Resolve Page key =====
186    *
187    * Strategy:
188    *   1) actionToPageMc mapping against Session.Action (if provided)
189    *   2) If Session.Action itself is a page present under the resolved LOB, use it
190    *   3) If Page has an explicit "@matchcode" (rare in your Page JSON), use it when valid
191    *   4) Otherwise return undefined; the lookup can try wider strategies.
192    */
193   export function resolvePageKey(
194       pageBuilderJson: any,
195       lobKey: string | undefined,
196       permissionMap: PermissionMap,
197       options?: Pick<ApplyOptions, 'actionToPageMc'>,
198   ): string | undefined {
199       const action = pageBuilderJson?.Session?.Action as string | undefined;
200       const pageMcFromActionMap =
201           action && options?.actionToPageMc ? options.actionToPageMc[action] : undefined;
202
203       if (lobKey && pageMcFromActionMap && permissionMap[lobKey]?.[pageMcFromActionMap]) {
204           return pageMcFromActionMap;
205       }
206
207       if (lobKey && action && permissionMap[lobKey]?.[action]) {
208           return action; // e.g., when Action equals permission page key
209       }
210
211       const explicitPageMc = pageBuilderJson?.Page?.controls?.control?.['@matchcode'] as
```


========== IMG_4215.md ==========
---
photo: IMG_4215.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 193-218
orientation: 180
confidence: high
notes: Same file/tab, scrolled slightly further than IMG_4214 (overlaps its lines 193-211, which agree exactly). Light motion-blur ghosting present but easily discounted against the sharp layer. Lines 211-213 show a multi-line `as (string | undefined)` type assertion split across three lines (Prettier-style union formatting); line 217 is an unconditional `return undefined;` fallback closing the function at 218. Explorer sidebar unchanged. Only tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock 7:50 PM 7/10/2026.
---
```
193   export function resolvePageKey(
194       pageBuilderJson: any,
195       lobKey: string | undefined,
196       permissionMap: PermissionMap,
197       options?: Pick<ApplyOptions, 'actionToPageMc'>,
198   ): string | undefined {
199       const action = pageBuilderJson?.Session?.Action as string | undefined;
200       const pageMcFromActionMap =
201           action && options?.actionToPageMc ? options.actionToPageMc[action] : undefined;
202
203       if (lobKey && pageMcFromActionMap && permissionMap[lobKey]?.[pageMcFromActionMap]) {
204           return pageMcFromActionMap;
205       }
206
207       if (lobKey && action && permissionMap[lobKey]?.[action]) {
208           return action; // e.g., when Action equals permission page key
209       }
210
211       const explicitPageMc = pageBuilderJson?.Page?.controls?.control?.['@matchcode'] as
212           | string
213           | undefined;
214       if (lobKey && explicitPageMc && permissionMap[lobKey]?.[explicitPageMc]) {
215           return explicitPageMc;
216       }
217       return undefined; // allow wider search by object if needed
218   }
```


========== IMG_4216.md ==========
---
photo: IMG_4216.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 193, 199-224
orientation: 180
confidence: high
notes: Same file/tab, sticky-scroll pins line 193 (resolvePageKey signature); scrolled viewport resumes at 199 (line 199 itself partially clipped by the divider but legible, matches IMG_4215). Very light ghosting only, all lines clear. Confirms 199-218 exactly as read in IMG_4215, and adds new content 219-224: closing brace of resolvePageKey, then the start of a new JSDoc comment for findPermissionNode ("Find permission for a control (object)"). Explorer sidebar unchanged from prior photos. Only tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock 7:50 PM 7/10/2026.
---
```
193   export function resolvePageKey(
        ⋮  (sticky-scroll divider; lines 194-198 scrolled out of view above)
199       const action = pageBuilderJson?.Session?.Action as string | undefined;
200       const pageMcFromActionMap =
201           action && options?.actionToPageMc ? options.actionToPageMc[action] : undefined;
202
203       if (lobKey && pageMcFromActionMap && permissionMap[lobKey]?.[pageMcFromActionMap]) {
204           return pageMcFromActionMap;
205       }
206
207       if (lobKey && action && permissionMap[lobKey]?.[action]) {
208           return action; // e.g., when Action equals permission page key
209       }
210
211       const explicitPageMc = pageBuilderJson?.Page?.controls?.control?.['@matchcode'] as
212           | string
213           | undefined;
214       if (lobKey && explicitPageMc && permissionMap[lobKey]?.[explicitPageMc]) {
215           return explicitPageMc;
216       }
217
218       return undefined; // allow wider search by object if needed
219   }
220
221   /** ===== Find permission for a control (object) =====
222    *
223    * Strategy (configurable):
224    *   exact:
```


========== IMG_4217.md ==========
---
photo: IMG_4217.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 220-245
orientation: 180
confidence: high
notes: Same file/tab, scrolled past resolvePageKey (219, faint sticky ghost "}" at top) into the findPermissionNode JSDoc comment and function body. Text is crisp with only very light ghosting. Full JSDoc strategy comment (221-233) is legible: exact vs exact-then-wider (default) lookup strategies with GBL (global) fallback. Function signature (234-240): findPermissionNode(permissionMap, lobKey, pageKey, objMc, lookupStrategy: LookupStrategy = 'exact-then-wider'): PermissionNode | undefined. Body starts with a "// 1) exact" comment and an early-return exact-match check, then a lookupStrategy==='exact' short-circuit. Line 246 is visible at the very bottom edge of the frame but clipped/illegible — not transcribed (see continuation, not photographed in this range). Explorer sidebar unchanged. Only tab open: user-permissions.ts. Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch "hitanshu/experimental*" (dirty), source-control badge "27", "⊗2 ⚠0", "No Solution", Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4. Window title "w00w11dev0067". Clock 7:50 PM 7/10/2026.
---
```
220
221   /** ===== Find permission for a control (object) =====
222    *
223    * Strategy (configurable):
224    *   exact:
225    *     - require exact [lob][page][obj], else not found
226    *   exact-then-wider (default):
227    *     1) exact [lob][page][obj]
228    *     2) if not found and lob present -> search this obj across ALL pages under that lob:
229    *          - if found EXACTLY in one page, use it
230    *     3) try GBL (global) scope as a last attempt:
231    *          - exact [GBL][GBL][obj], else any page under GBL containing obj (if unique)
232    *     4) else not found
233    */
234   export function findPermissionNode(
235       permissionMap: PermissionMap,
236       lobKey: string | undefined,
237       pageKey: string | undefined,
238       objMc: string,
239       lookupStrategy: LookupStrategy = 'exact-then-wider',
240   ): PermissionNode | undefined {
241       // 1) exact
242       if (lobKey && pageKey && permissionMap[lobKey]?.[pageKey]?.[objMc]) {
243           return permissionMap[lobKey][pageKey][objMc];
244       }
245       if (lookupStrategy === 'exact') return undefined;
```


========== IMG_4218.md ==========
---
photo: IMG_4218.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 230-256
orientation: 180
confidence: high
notes: Explorer sidebar (src/utils expanded) shows files - performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...(truncated, likely transform-pagebuild-response.ts), url-helpers.ts, user-permissions.ts (selected/highlighted), xml-detail-persistence.ts, zod-error-formatter.ts; below utils folder: app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts, and a truncated "TS types.t..." file cut off at bottom. Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Photo has visible motion-blur double-exposure ghosting (slightly offset duplicate of same text) but primary text layer is legible; verified via zoomed crop.
---
230	 *    3) try GBL (global) scope as a last attempt:
231	 *       - exact [GBL][GBL][obj], else any page under GBL containing obj (if unique)
232	 *    4) else not found
233	 */
234	export function findPermissionNode(
235	    permissionMap: PermissionMap,
236	    lobKey: string | undefined,
237	    pageKey: string | undefined,
238	    objMc: string,
239	    lookupStrategy: LookupStrategy = 'exact-then-wider',
240	): PermissionNode | undefined {
241	    // 1) exact
242	    if (lobKey && pageKey && permissionMap[lobKey]?.[pageKey]?.[objMc]) {
243	        return permissionMap[lobKey][pageKey][objMc];
244	    }
245	    if (lookupStrategy === 'exact') return undefined;
246	
247	    // 2) search within LOB across pages (unique only)
248	    if (lobKey && permissionMap[lobKey]) {
249	        let found: PermissionNode | undefined;
250	        let count = 0;
251	        for (const [_pk, objs] of Object.entries(permissionMap[lobKey])) {
252	            if (objs[objMc]) {
253	                found = objs[objMc];
254	                count++;
255	                if (count > 1) break; // not unique
256	            }


========== IMG_4219.md ==========
---
photo: IMG_4219.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 234, 242-267
orientation: 180
confidence: high
notes: VS Code sticky-scroll header at top pins line 234 (function signature) while editor scrolled to show 242-267. Explorer sidebar same as IMG_4218 (src/utils expanded, user-permissions.ts highlighted). Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Photo has visible motion-blur double-exposure ghosting but primary text layer is legible.
---
[sticky scroll header]
234	export function findPermissionNode(

[main editor view]
242	    if (lobKey && pageKey && permissionMap[lobKey]?.[pageKey]?.[objMc]) {
243	        return permissionMap[lobKey][pageKey][objMc];
244	    }
245	    if (lookupStrategy === 'exact') return undefined;
246	
247	    // 2) search within LOB across pages (unique only)
248	    if (lobKey && permissionMap[lobKey]) {
249	        let found: PermissionNode | undefined;
250	        let count = 0;
251	        for (const [_pk, objs] of Object.entries(permissionMap[lobKey])) {
252	            if (objs[objMc]) {
253	                found = objs[objMc];
254	                count++;
255	                if (count > 1) break; // not unique
256	            }
257	        }
258	        if (count === 1 && found) return found;
259	    }
260	
261	    // 3) try GBL
262	    const gbl = 'GBL';
263	    if (permissionMap[gbl]) {
264	        // exact GBL/GBL first
265	        if (permissionMap[gbl][gbl]?.[objMc]) {
266	            return permissionMap[gbl][gbl][objMc];
267	        }


========== IMG_4220.md ==========
---
photo: IMG_4220.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 234, 244-269
orientation: 180
confidence: high
notes: VS Code sticky-scroll header at top pins line 234 (function signature) while editor scrolled to show 244-269. Explorer sidebar same as prior photos (src/utils expanded, user-permissions.ts highlighted). Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Photo has heavy motion-blur double-exposure ghosting (two overlapping scroll positions); verified ambiguous lines 268-269 via zoomed crop.
---
[sticky scroll header]
234	export function findPermissionNode(

[main editor view]
244	    }
245	    if (lookupStrategy === 'exact') return undefined;
246	
247	    // 2) search within LOB across pages (unique only)
248	    if (lobKey && permissionMap[lobKey]) {
249	        let found: PermissionNode | undefined;
250	        let count = 0;
251	        for (const [_pk, objs] of Object.entries(permissionMap[lobKey])) {
252	            if (objs[objMc]) {
253	                found = objs[objMc];
254	                count++;
255	                if (count > 1) break; // not unique
256	            }
257	        }
258	        if (count === 1 && found) return found;
259	    }
260	
261	    // 3) try GBL
262	    const gbl = 'GBL';
263	    if (permissionMap[gbl]) {
264	        // exact GBL/GBL first
265	        if (permissionMap[gbl][gbl]?.[objMc]) {
266	            return permissionMap[gbl][gbl][objMc];
267	        }
268	        // else search GBL across its pages (unique)
269	        let found: PermissionNode | undefined;


========== IMG_4221.md ==========
---
photo: IMG_4221.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 234, 257-279
orientation: 180
confidence: medium
notes: VS Code sticky-scroll header at top pins line 234 (function signature) while editor scrolled to show 257-279 (line 280, if it exists, is cut off by the taskbar and not legible). Explorer sidebar same as prior photos (src/utils expanded, user-permissions.ts highlighted). Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Photo has VERY heavy motion-blur double-exposure ghosting (two overlapping scroll positions superimposed, worse than IMG_4218-4220, including doubled/overlapping gutter line numbers in places); confidence downgraded to medium. Lines 257-269 cross-verified against IMG_4219/IMG_4220; lines 269-279 verified via zoomed crop showing sharp foreground layer and an unambiguous gutter crop for lines 276-280.
---
[sticky scroll header]
234	export function findPermissionNode(

[main editor view]
257	        }
258	        if (count === 1 && found) return found;
259	    }
260	
261	    // 3) try GBL
262	    const gbl = 'GBL';
263	    if (permissionMap[gbl]) {
264	        // exact GBL/GBL first
265	        if (permissionMap[gbl][gbl]?.[objMc]) {
266	            return permissionMap[gbl][gbl][objMc];
267	        }
268	        // else search GBL across its pages (unique)
269	        let found: PermissionNode | undefined;
270	        let count = 0;
271	        for (const [_pk, objs] of Object.entries(permissionMap[gbl])) {
272	            if (objs[objMc]) {
273	                found = objs[objMc];
274	                count++;
275	                if (count > 1) break;
276	            }
277	        }
278	        if (count === 1 && found) return found;
279	    }


========== IMG_4222.md ==========
---
photo: IMG_4222.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 234, 268-293
orientation: 180
confidence: high
notes: VS Code sticky-scroll header at top pins line 234 (function signature) while editor scrolled to show 268-293. This photo reveals the end of findPermissionNode (closes at line 282 with a fallback "return undefined;" at 281, matching the JSDoc's documented case 4 "else not found") and the start of a new exported function getSecurityValues at line 285, preceded by a JSDoc comment "/** ===== Equivalent to GetSecurityValues* in TS ===== */" at 284. Explorer sidebar same as prior photos (src/utils expanded, user-permissions.ts highlighted). Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Photo has motion-blur double-exposure ghosting but the primary text layer is legible; lines 284-293 cross-verified via zoomed crop.
---
[sticky scroll header]
234	export function findPermissionNode(

[main editor view]
268	        // else search GBL across its pages (unique)
269	        let found: PermissionNode | undefined;
270	        let count = 0;
271	        for (const [_pk, objs] of Object.entries(permissionMap[gbl])) {
272	            if (objs[objMc]) {
273	                found = objs[objMc];
274	                count++;
275	                if (count > 1) break;
276	            }
277	        }
278	        if (count === 1 && found) return found;
279	    }
280	
281	    return undefined;
282	}
283	
284	/** ===== Equivalent to GetSecurityValues* in TS ===== */
285	export function getSecurityValues(
286	    permissionMap: PermissionMap,
287	    lobKey: string | undefined,
288	    pageKey: string | undefined,
289	    objMc: string,
290	    options?: Pick<ApplyOptions, 'fallbackMode' | 'lookupStrategy'>,
291	): { visible: boolean; disabled: boolean } {
292	    const fallbackMode = options?.fallbackMode ?? 'VisibleEnabled';
293	    const lookupStrategy = options?.lookupStrategy ?? 'exact-then-wider';


========== IMG_4223.md ==========
---
photo: IMG_4223.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 234, 270-295
orientation: 180
confidence: high
notes: VS Code sticky-scroll header at top pins line 234 (function signature) while editor scrolled to show 270-295 (line 296 exists per gutter but is cut off/not legible, obscured by the horizontal scrollbar and taskbar). This photo largely re-shows content already captured in IMG_4222 (270-293, cross-verified consistent) and adds new line 295, the first line of body inside getSecurityValues calling findPermissionNode. Explorer sidebar same as prior photos (src/utils expanded, user-permissions.ts highlighted). Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Photo has motion-blur double-exposure ghosting but primary text layer is legible; verified via zoomed crops.
---
[sticky scroll header]
234	export function findPermissionNode(

[main editor view]
270	        let count = 0;
271	        for (const [_pk, objs] of Object.entries(permissionMap[gbl])) {
272	            if (objs[objMc]) {
273	                found = objs[objMc];
274	                count++;
275	                if (count > 1) break;
276	            }
277	        }
278	        if (count === 1 && found) return found;
279	    }
280	
281	    return undefined;
282	}
283	
284	/** ===== Equivalent to GetSecurityValues* in TS ===== */
285	export function getSecurityValues(
286	    permissionMap: PermissionMap,
287	    lobKey: string | undefined,
288	    pageKey: string | undefined,
289	    objMc: string,
290	    options?: Pick<ApplyOptions, 'fallbackMode' | 'lookupStrategy'>,
291	): { visible: boolean; disabled: boolean } {
292	    const fallbackMode = options?.fallbackMode ?? 'VisibleEnabled';
293	    const lookupStrategy = options?.lookupStrategy ?? 'exact-then-wider';
294	
295	    const node = findPermissionNode(permissionMap, lobKey, pageKey, objMc, lookupStrategy);


========== IMG_4224.md ==========
---
photo: IMG_4224.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 285-311
orientation: 180
confidence: high
notes: VS Code sticky-scroll header at top pins line 285 (getSecurityValues signature) while editor scrolled to show 286-311. This photo captures the full body of getSecurityValues (285-306) and the start of a new JSDoc block (308-311+) for a "Check for Security Attributes in PageBuild Response" deep-scan function. Line 312 is visible only as a thin sliver at the very bottom edge (cut off by the status bar) and not reliably legible; not transcribed. Explorer sidebar same as prior photos (src/utils expanded, user-permissions.ts highlighted). Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Photo has mild motion-blur double-exposure ghosting but primary text layer is clearly legible throughout.
---
[sticky scroll header]
285	export function getSecurityValues(

[main editor view]
286	    permissionMap: PermissionMap,
287	    lobKey: string | undefined,
288	    pageKey: string | undefined,
289	    objMc: string,
290	    options?: Pick<ApplyOptions, 'fallbackMode' | 'lookupStrategy'>,
291	): { visible: boolean; disabled: boolean } {
292	    const fallbackMode = options?.fallbackMode ?? 'VisibleEnabled';
293	    const lookupStrategy = options?.lookupStrategy ?? 'exact-then-wider';
294	
295	    const node = findPermissionNode(permissionMap, lobKey, pageKey, objMc, lookupStrategy);
296	
297	    if (node) {
298	        return { visible: node.vis, disabled: node.dis };
299	    }
300	
301	    // VBScript defaults
302	    if (fallbackMode === 'HiddenDisabled') {
303	        return { visible: false, disabled: true };
304	    }
305	    return { visible: true, disabled: false };
306	}
307	
308	/** ===== Check for Security Attributes in PageBuild Response =====
309	 *
310	 * Deep-scans the **entire** Page Build API response (including every
311	 * nested object / array at any depth) to find at least one object that


========== IMG_4225.md ==========
---
photo: IMG_4225.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 285, 305-329
orientation: 180
confidence: medium
notes: VS Code sticky-scroll header at top pins line 285 (getSecurityValues signature) while editor scrolled to show 305-329. This photo has heavy motion-blur double-exposure ghosting (two overlapping scroll positions, offset by ~2 lines, causing doubled gutter numbers); the foreground/bold text layer was distinguished from the fainter ghost layer via multiple zoomed crops and cross-checked against IMG_4224 for the overlapping lines 305-311. Captures the tail of getSecurityValues (305-306), a large JSDoc block (308-323) documenting a new hasSecurityAttributes deep-scan function, and the start of hasSecurityAttributes itself (324-328) including a nested walk() helper and a visited WeakSet for circular-reference safety. Line 329 (a "// Guard: skip primitives..." comment) is visible only under the horizontal scrollbar overlay at the very bottom edge and is lower-confidence. Explorer sidebar same as prior photos (src/utils expanded, user-permissions.ts highlighted). Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
[sticky scroll header]
285	export function getSecurityValues(

[main editor view]
305	    return { visible: true, disabled: false };
306	}
307	
308	/** ===== Check for Security Attributes in PageBuild Response =====
309	 *
310	 * Deep-scans the **entire** Page Build API response (including every
311	 * nested object / array at any depth) to find at least one object that
312	 * contains all three security keys: `cat`, `pag`, and `obj` (with or
313	 * without the `@` prefix).
314	 *
315	 * When such a triple is found the page's controls reference a
316	 * category / page / object permission record, meaning
317	 * `applyPermissionsToPage` should be invoked.
318	 *
319	 * Handles:
320	 * - null / undefined / empty responses
321	 * - single-object or array nodes at any nesting level
322	 * - circular-reference safety via a visited Set
323	 */
324	export function hasSecurityAttributes(pageBuildResponse: any): boolean {
325	    if (pageBuildResponse == null || typeof pageBuildResponse !== 'object') return false;
326	
327	    function walk(node: any): boolean {
328	        const visited = new WeakSet();
329	        // Guard: skip primitives and already-visited refs (circular safety)


========== IMG_4226.md ==========
---
photo: IMG_4226.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 317-343
orientation: 180
confidence: high
notes: No sticky-scroll header this time (the enclosing function hasSecurityAttributes' opening line 324 is within the visible viewport). Captures the tail of the JSDoc block (317-323) and the body of hasSecurityAttributes (324-343): null/object guard, a WeakSet for circular-reference safety, a nested walk() function checking for '@cat'/'cat', '@pag'/'pag', '@obj'/'obj' keys on non-array nodes, and the start of a recursion comment at 343. Explorer sidebar same as prior photos (src/utils expanded, user-permissions.ts highlighted). Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Photo has some motion-blur double-exposure ghosting but the primary text layer is clearly legible throughout; cross-verified against IMG_4225 for overlapping lines 317-329.
---
317	 * `applyPermissionsToPage` should be invoked.
318	 *
319	 * Handles:
320	 * - null / undefined / empty responses
321	 * - single-object or array nodes at any nesting level
322	 * - circular-reference safety via a visited Set
323	 */
324	export function hasSecurityAttributes(pageBuildResponse: any): boolean {
325	    if (pageBuildResponse == null || typeof pageBuildResponse !== 'object') return false;
326	
327	    const visited = new WeakSet();
328	
329	    function walk(node: any): boolean {
330	        // Guard: skip primitives and already-visited refs (circular safety)
331	        if (node == null || typeof node !== 'object') return false;
332	        if (visited.has(node)) return false;
333	        visited.add(node);
334	
335	        // If this node itself is an object (not an array) check for the triple
336	        if (!Array.isArray(node)) {
337	            const hasCat = '@cat' in node || 'cat' in node;
338	            const hasPag = '@pag' in node || 'pag' in node;
339	            const hasObj = '@obj' in node || 'obj' in node;
340	            if (hasCat && hasPag && hasObj) return true;
341	        }
342	
343	        // Recurse into every child value (works for both arrays and objects)


========== IMG_4227.md ==========
---
photo: IMG_4227.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 324, 326-351
orientation: 180
confidence: high
notes: VS Code sticky-scroll header at top pins line 324 (hasSecurityAttributes signature) while editor scrolled to show 326-351. Completes the body of hasSecurityAttributes: the walk() recursion (343-345 - recurse into Array.isArray(node) ? node : Object.values(node), return values.some(walk)), closes walk() at 346, calls "return walk(pageBuildResponse);" at 348, closes the function at 349, and starts a new JSDoc block at 351 "/** ===== Apply permissions to PageBuilder JSON in-place (copy) =====" for what is presumably an applyPermissionsToPage-style function. Explorer sidebar same as prior photos (src/utils expanded, user-permissions.ts highlighted). Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Photo has motion-blur double-exposure ghosting but the primary text layer is clearly legible; cross-verified against IMG_4226 for overlapping lines 326-343 and via zoomed crop for line 351.
---
[sticky scroll header]
324	export function hasSecurityAttributes(pageBuildResponse: any): boolean {

[main editor view]
326	
327	    const visited = new WeakSet();
328	
329	    function walk(node: any): boolean {
330	        // Guard: skip primitives and already-visited refs (circular safety)
331	        if (node == null || typeof node !== 'object') return false;
332	        if (visited.has(node)) return false;
333	        visited.add(node);
334	
335	        // If this node itself is an object (not an array) check for the triple
336	        if (!Array.isArray(node)) {
337	            const hasCat = '@cat' in node || 'cat' in node;
338	            const hasPag = '@pag' in node || 'pag' in node;
339	            const hasObj = '@obj' in node || 'obj' in node;
340	            if (hasCat && hasPag && hasObj) return true;
341	        }
342	
343	        // Recurse into every child value (works for both arrays and objects)
344	        const values: any[] = Array.isArray(node) ? node : Object.values(node);
345	        return values.some(walk);
346	    }
347	
348	    return walk(pageBuildResponse);
349	}
350	
351	/** ===== Apply permissions to PageBuilder JSON in-place (copy) =====


========== IMG_4228.md ==========
---
photo: IMG_4228.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 324, 329, 345-369
orientation: 180
confidence: high
notes: VS Code sticky-scroll shows TWO stacked headers at top - line 324 (hasSecurityAttributes signature) and line 329 (nested walk function signature) - while editor scrolled to show 345-369. Completes hasSecurityAttributes (345-349), then a JSDoc block (351-360) documenting a new applyPermissionsToPage function (LOB/Page resolution, @visible/@disabled application, TAB/DIV/companion-control handling, @secDis marker), and the start of applyPermissionsToPage itself (361-369) with its parameter list and a destructured options object with defaults (fallbackMode, lookupStrategy, compLocToLob). Explorer sidebar same as prior photos (src/utils expanded, user-permissions.ts highlighted). Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Photo has motion-blur double-exposure ghosting but the primary text layer is clearly legible; cross-verified against IMG_4227 for overlapping lines 345-351.
---
[sticky scroll header, outer]
324	export function hasSecurityAttributes(pageBuildResponse: any): boolean {

[sticky scroll header, inner]
329	    function walk(node: any): boolean {

[main editor view]
345	        return values.some(walk);
346	    }
347	
348	    return walk(pageBuildResponse);
349	}
350	
351	/** ===== Apply permissions to PageBuilder JSON in-place (copy) =====
352	 *
353	 * - Resolves LOB and Page using provided options and permissionMap
354	 * - Iterates every control and applies @visible/@disabled
355	 * - Handles TAB controls (TABXXX) specially
356	 * - Handles DIV containers by cascading to children
357	 * - Applies @secDis marker for security-disabled controls
358	 * - Respects condition checks: only hide if visible, only disable if enabled
359	 * - Handles companion controls (lbl*, cal*, inf*)
360	 */
361	export function applyPermissionsToPage(
362	    pageBuilderJson: any,
363	    permissionMap: PermissionMap,
364	    options?: ApplyOptions,
365	): any {
366	    const {
367	        fallbackMode = 'VisibleEnabled',
368	        lookupStrategy = 'exact-then-wider',
369	        compLocToLob,


========== IMG_4229.md ==========
---
photo: IMG_4229.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 356-382
orientation: 180
confidence: high
notes: No sticky-scroll header (applyPermissionsToPage's opening line 361 is within the visible viewport). Completes the JSDoc block (356-360) and shows the start of applyPermissionsToPage's body (361-382): parameter list (pageBuilderJson, permissionMap, options), a destructured options object with defaults (fallbackMode, lookupStrategy, compLocToLob, nodeKeyToLob, actionToPageMc, defaultLob, forceDisableWhenHidden), a safeClone(pageBuilderJson) call into `updated` to avoid mutating the original payload, and several console.log debug statements ("[Permissions] ========== STARTING PERMISSION APPLICATION ==========", NodeKey, Page @matchcode). Line 383 (appears to start "// Resolve LOB and Page keys" per a faint ghost) is obscured by the horizontal scrollbar overlay at the very bottom edge and not reliably legible; not transcribed. Explorer sidebar same as prior photos (src/utils expanded, user-permissions.ts highlighted). Tab bar shows only user-permissions.ts open. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Photo has mild motion-blur double-exposure ghosting but the primary text layer is clearly legible; cross-verified against IMG_4228 for overlapping lines 356-369.
---
356	 * - Handles DIV containers by cascading to children
357	 * - Applies @secDis marker for security-disabled controls
358	 * - Respects condition checks: only hide if visible, only disable if enabled
359	 * - Handles companion controls (lbl*, cal*, inf*)
360	 */
361	export function applyPermissionsToPage(
362	    pageBuilderJson: any,
363	    permissionMap: PermissionMap,
364	    options?: ApplyOptions,
365	): any {
366	    const {
367	        fallbackMode = 'VisibleEnabled',
368	        lookupStrategy = 'exact-then-wider',
369	        compLocToLob,
370	        nodeKeyToLob,
371	        actionToPageMc,
372	        defaultLob,
373	        forceDisableWhenHidden = false,
374	    } = options || {};
375	
376	    // Copy to avoid mutating original payload
377	    const updated = safeClone(pageBuilderJson);
378	
379	    console.log('[Permissions] ========== STARTING PERMISSION APPLICATION ==========');
380	    console.log('[Permissions] NodeKey:', updated?.Session?.NodeKey);
381	    console.log('[Permissions] Page @matchcode:', updated?.Page?.['@matchcode']);
382	


========== IMG_4230.md ==========
---
photo: IMG_4230.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 356-383
orientation: 180
confidence: high
notes: Explorer sidebar shows src/utils/ folder contents (performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon..., url-helpers.ts, user-permissions.ts [selected/highlighted], xml-detail-persistence.ts, zod-error-formatter.ts), and above utils: app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts, types.ts (cut off). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > (scope not shown, cut off). Tab bar shows only user-permissions.ts open. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Line 383 only partially visible at bottom edge of screen (cut off, appears to start "// Resolve LOB and Page keys" but not fully legible - marked below).
---
```
356	 * - Handles DIV containers by cascading to children
357	 * - Applies @secDis marker for security-disabled controls
358	 * - Respects condition checks: only hide if visible, only disable if enabled
359	 * - Handles companion controls (lbl*, cal*, inf*)
360	 */
361	export function applyPermissionsToPage(
362	    pageBuilderJson: any,
363	    permissionMap: PermissionMap,
364	    options?: ApplyOptions,
365	): any {
366	    const {
367	        fallbackMode = 'VisibleEnabled',
368	        lookupStrategy = 'exact-then-wider',
369	        compLocToLob,
370	        nodeKeyToLob,
371	        actionToPageMc,
372	        defaultLob,
373	        forceDisableWhenHidden = false,
374	    } = options || {};
375	
376	    // Copy to avoid mutating original payload
377	    const updated = safeClone(pageBuilderJson);
378	
379	    console.log('[Permissions] ========== STARTING PERMISSION APPLICATION ==========');
380	    console.log('[Permissions] NodeKey:', updated?.Session?.NodeKey);
381	    console.log('[Permissions] Page @matchcode:', updated?.Page?.['@matchcode']);
382	
383	    ⟪?⟫ (cut off at bottom edge, appears to be "// Resolve LOB and Page keys")
```


========== IMG_4231.md ==========
---
photo: IMG_4231.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 356-382
orientation: 180
confidence: high
notes: DUPLICATE of IMG_4230 — identical scroll position, same visible lines 356-382, same explorer state. Explorer sidebar shows src/utils/ folder (performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon..., url-helpers.ts, user-permissions.ts [selected], xml-detail-persistence.ts, zod-error-formatter.ts), and app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts, types.ts (cut off). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Tab bar: only user-permissions.ts open. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Line 383 cut off at bottom edge, not legible.
---
```
356	 * - Handles DIV containers by cascading to children
357	 * - Applies @secDis marker for security-disabled controls
358	 * - Respects condition checks: only hide if visible, only disable if enabled
359	 * - Handles companion controls (lbl*, cal*, inf*)
360	 */
361	export function applyPermissionsToPage(
362	    pageBuilderJson: any,
363	    permissionMap: PermissionMap,
364	    options?: ApplyOptions,
365	): any {
366	    const {
367	        fallbackMode = 'VisibleEnabled',
368	        lookupStrategy = 'exact-then-wider',
369	        compLocToLob,
370	        nodeKeyToLob,
371	        actionToPageMc,
372	        defaultLob,
373	        forceDisableWhenHidden = false,
374	    } = options || {};
375	
376	    // Copy to avoid mutating original payload
377	    const updated = safeClone(pageBuilderJson);
378	
379	    console.log('[Permissions] ========== STARTING PERMISSION APPLICATION ==========');
380	    console.log('[Permissions] NodeKey:', updated?.Session?.NodeKey);
381	    console.log('[Permissions] Page @matchcode:', updated?.Page?.['@matchcode']);
382	
```


========== IMG_4233.md ==========
---
photo: IMG_4233.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 361, 384, 387-411
orientation: 180
confidence: high
notes: VS Code sticky-scroll shows two pinned header lines at top — line 361 (function decl "export function applyPermissionsToPage(") and line 384 (enclosing "const lobKey = resolveLobKey(updated, permissionMap, {" call) — before the real scrolled viewport resumes at line 387. Confirms/cross-validates the reconstructed content of IMG_4232 (lines 384-406 match exactly). Faint ghost/afterimage text visible behind several lines (mild motion blur, one-line-offset shadow) but the foreground text is crisp and unambiguous throughout. Explorer sidebar unchanged (utils/ folder, user-permissions.ts selected, same file list as prior photos). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Bottom line 412 cut off by horizontal scrollbar/status bar, only "visibilityChanged: 0," ghost partly visible, not confidently legible as a distinct line.
---
```
361	export function applyPermissionsToPage(
...
384	    const lobKey = resolveLobKey(updated, permissionMap, {
...
387	        defaultLob,
388	    });
389	    const pageKey = resolvePageKey(updated, lobKey, permissionMap, { actionToPageMc });
390	
391	    console.log('[Permissions] Resolved LOB:', lobKey || '(none)');
392	    console.log('[Permissions] Resolved Page:', pageKey || '(none)');
393	
394	    const controls: any[] = updated?.Page?.controls?.control || [];
395	    console.log(`[Permissions] Total controls to process: ${controls.length}`);
396	
397	    // Build a map for quick lookup of controls by matchcode
398	    const controlMap = new Map<string, any>();
399	    for (const ctrl of controls) {
400	        const mc = ctrl?.['@matchcode'];
401	        if (mc) controlMap.set(mc, ctrl);
402	    }
403	
404	    // Stats for debugging
405	    const stats = {
406	        total: controls.length,
407	        permissionsFound: 0,
408	        permissionsNotFound: 0,
409	        visibilityChanged: 0,
410	        disabledChanged: 0,
411	        tabsProcessed: 0,
```


========== IMG_4234.md ==========
---
photo: IMG_4234.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 361, 405-430
orientation: 180
confidence: high
notes: Sticky-scroll header pinned at top shows line 361 "export function applyPermissionsToPage(". Mild ghosting/afterimage visible behind most lines (one-line-offset shadow duplicate, same artifact seen in IMG_4232/4233) but foreground text is crisp and unambiguous. Continues directly from IMG_4233 (stats object literal, lines 405-414), then a for-loop over controls (416+) doing permission lookup via findPermissionNode and applying fallback via applyPermissionToControl. Explorer sidebar unchanged (utils/ folder, user-permissions.ts selected). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Line 430 cut off at bottom by taskbar; only partial "continue;" visible, treated as legible tail.
---
```
361	export function applyPermissionsToPage(
...
405	    const stats = {
406	        total: controls.length,
407	        permissionsFound: 0,
408	        permissionsNotFound: 0,
409	        visibilityChanged: 0,
410	        disabledChanged: 0,
411	        tabsProcessed: 0,
412	        divsProcessed: 0,
413	        companionsProcessed: 0,
414	    };
415	
416	    for (const ctrl of controls) {
417	        const objMc: string | undefined = ctrl?.['@matchcode'];
418	        if (!objMc) continue;
419	
420	        // Look up permission for this control
421	        const permNode = findPermissionNode(permissionMap, lobKey, pageKey, objMc, lookupStrategy);
422	
423	        // If no permission found, use fallback and skip further processing
424	        if (!permNode) {
425	            stats.permissionsNotFound++;
426	            if (fallbackMode === 'HiddenDisabled') {
427	                applyPermissionToControl(ctrl, { vis: false, dis: true }, forceDisableWhenHidden);
428	            }
429	            // VisibleEnabled = no change (keep API values)
430	            continue;
```


========== IMG_4235.md ==========
---
photo: IMG_4235.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 361, 415-440
orientation: 180
confidence: high
notes: Sticky-scroll header pinned at top shows line 361 "export function applyPermissionsToPage(". Mild ghosting/afterimage visible behind most lines (same one-line-offset shadow artifact as prior photos in this run) but foreground text is crisp and unambiguous. Continues directly from IMG_4234 (for-loop body, permission-not-found branch), then permission-found branch begins at 433-434, and a "TAB Handling" section starts at 436. Explorer sidebar unchanged (utils/ folder, user-permissions.ts selected). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Line 440 is a multi-line console.log template literal argument, comma at end indicates it continues onto line 441 (not visible, cut off at bottom).
---
```
361	export function applyPermissionsToPage(
...
415	
416	    for (const ctrl of controls) {
417	        const objMc: string | undefined = ctrl?.['@matchcode'];
418	        if (!objMc) continue;
419	
420	        // Look up permission for this control
421	        const permNode = findPermissionNode(permissionMap, lobKey, pageKey, objMc, lookupStrategy);
422	
423	        // If no permission found, use fallback and skip further processing
424	        if (!permNode) {
425	            stats.permissionsNotFound++;
426	            if (fallbackMode === 'HiddenDisabled') {
427	                applyPermissionToControl(ctrl, { vis: false, dis: true }, forceDisableWhenHidden);
428	            }
429	            // VisibleEnabled = no change (keep API values)
430	            continue;
431	        }
432	
433	        stats.permissionsFound++;
434	        const mcUpper = objMc.toUpperCase();
435	
436	        // === TAB Handling ===
437	        if (mcUpper.startsWith('TAB')) {
438	            stats.tabsProcessed++;
439	            console.log(
440	                `[Permissions] TAB found: ${objMc} → vis=${permNode.vis}, dis=${permNode.dis}`,
```


========== IMG_4236.md ==========
---
photo: IMG_4236.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 361, 447-469
orientation: 180
confidence: medium
notes: Severe motion-blur / double-exposure throughout (same artifact as IMG_4232, confirmed here with a consistent -3-row ghost offset via a clean gutter-only crop showing bright numbers 447-469 each with a fainter duplicate of line N at row N+3). Sticky header shows line 361 "export function applyPermissionsToPage(". Lines 447-454 (DIV-handling block) and 464-469 (visibility-changed block) were cross-validated and are HIGH confidence. Lines ~455-463 (in between: a "Track changes for stats" comment, beforeVis/beforeDis capture, a "// === Regular Control ===" comment, and an applyPermissionToControl call, plus a "// Check if anything changed" comment before line 464) could not be reliably assigned to exact line numbers — the ghosting caused apparent duplicate const declarations (which cannot be real, since TypeScript would not compile two `const beforeVis` in the same scope), so exact ordering/spacing is our best-effort reconstruction, flagged uncertain. Explorer sidebar unchanged (utils/ folder, user-permissions.ts selected). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution".
---
```
361	export function applyPermissionsToPage(
...
447	    if (mcUpper.startsWith('DIV')) {
448	        stats.divsProcessed++;
449	        console.log(
450	            `[Permissions] DIV found: ${objMc} → vis=${permNode.vis}, dis=${permNode.dis}`,
451	        );
452	        applyDivPermission(ctrl, permNode, controls, controlMap, forceDisableWhenHidden);
453	        continue;
454	    }

⟪uncertain exact line numbers, ~455-463 — content observed but ordering/spacing not fully verifiable due to ghosting⟫
	// Track changes for stats
	const beforeVis = ctrl['@visible'];
	const beforeDis = ctrl['@disabled'];

	// === Regular Control ===
	applyPermissionToControl(ctrl, permNode, forceDisableWhenHidden);

	// Check if anything changed

464	    if (ctrl['@visible'] !== beforeVis) {
465	        stats.visibilityChanged++;
466	        console.log(
467	            `[Permissions] VISIBILITY CHANGED: ${objMc} → ${beforeVis} to ${ctrl['@visible']}`
468	        );
469	    }
```


========== IMG_4237.md ==========
---
photo: IMG_4237.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 361, 465-490
orientation: 180
confidence: high
notes: Sticky header shows line 361 "export function applyPermissionsToPage(". Text is mostly crisp with only faint residual ghosting (much lighter than IMG_4236), fully legible. Confirms the tail of IMG_4236 (465-469 visibility-changed block matches exactly). Continues with a disabled-changed block (470-476), a Companion Controls section (477-481), then prints summary stats (483+). Line 473's template literal is cut off at the right edge of the visible viewport (horizontal scroll needed) — captured text ends mid-expression "(secDis=${ct" with the rest off-screen. Explorer sidebar unchanged (utils/ folder, user-permissions.ts selected). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Line 490 cut off at bottom by taskbar/status bar overlay.
---
```
361	export function applyPermissionsToPage(
...
465	        stats.visibilityChanged++;
466	        console.log(
467	            `[Permissions] VISIBILITY CHANGED: ${objMc} → ${beforeVis} to ${ctrl['@visible']}`,
468	        );
469	    }
470	    if (ctrl['@disabled'] !== beforeDis) {
471	        stats.disabledChanged++;
472	        console.log(
473	            `[Permissions] DISABLED CHANGED: ${objMc} → ${beforeDis} to ${ctrl['@disabled']} (secDis=${ct⟪?cut off, continues past right edge of viewport⟫
474	        );
475	    }
476	
477	    // === Companion Controls (lbl*, cal*, inf*) ===
478	    const companionsBefore = stats.companionsProcessed;
479	    applyCompanionPermissions(objMc, permNode, controlMap, forceDisableWhenHidden);
480	    stats.companionsProcessed += stats.companionsProcessed - companionsBefore;
481	}
482	
483	// Print summary stats
484	console.log('[Permissions] ========== PERMISSION APPLICATION COMPLETE ==========');
485	console.log('[Permissions] Summary:', stats);
486	console.log(`[Permissions] Controls with permissions: ${stats.permissionsFound}`);
487	console.log(`[Permissions] Controls without permissions: ${stats.permissionsNotFound}`);
488	console.log(`[Permissions] Visibility changed: ${stats.visibilityChanged}`);
489	console.log(`[Permissions] Disabled changed: ${stats.disabledChanged}`);
490	if (stats.tabsProcessed > 0)
```


========== IMG_4238.md ==========
---
photo: IMG_4238.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 361, 476-501
orientation: 180
confidence: high
notes: Sticky header shows line 361 "export function applyPermissionsToPage(". Photo has the same one-line-offset ghosting artifact seen in nearby photos of this run, but content was fully cross-validated against IMG_4237 (lines 476-490 match exactly) and internally consistent crops for 491-501, so treated as high confidence despite the ghosting. This photo shows the tail of applyPermissionsToPage: end of Companion Controls block, summary console.log block, TAB/DIV processed-count logging, "return updated;", the function's closing brace (497), and the start of a new JSDoc comment block for a function that applies permission to a single control with legacy-behavior notes. Explorer sidebar unchanged (utils/ folder, user-permissions.ts selected). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution".
---
```
361	export function applyPermissionsToPage(
...
476	
477	    // === Companion Controls (lbl*, cal*, inf*) ===
478	    const companionsBefore = stats.companionsProcessed;
479	    applyCompanionPermissions(objMc, permNode, controlMap, forceDisableWhenHidden);
480	    stats.companionsProcessed += stats.companionsProcessed - companionsBefore;
481	}
482	
483	// Print summary stats
484	console.log('[Permissions] ========== PERMISSION APPLICATION COMPLETE ==========');
485	console.log('[Permissions] Summary:', stats);
486	console.log(`[Permissions] Controls with permissions: ${stats.permissionsFound}`);
487	console.log(`[Permissions] Controls without permissions: ${stats.permissionsNotFound}`);
488	console.log(`[Permissions] Visibility changed: ${stats.visibilityChanged}`);
489	console.log(`[Permissions] Disabled changed: ${stats.disabledChanged}`);
490	if (stats.tabsProcessed > 0)
491	    console.log(`[Permissions] TABs processed: ${stats.tabsProcessed}`);
492	if (stats.divsProcessed > 0)
493	    console.log(`[Permissions] DIVs processed: ${stats.divsProcessed}`);
494	console.log('[Permissions] ==================================================');
495	
496	return updated;
497	}
498	
499	/**
500	 * Apply permission to a single control with condition checks.
501	 * Legacy behavior:
```


========== IMG_4239.md ==========
---
photo: IMG_4239.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 361, 492-517
orientation: 180
confidence: high
notes: Sticky header shows line 361 "export function applyPermissionsToPage(". Heavy motion-blur/double-exposure ghosting throughout (worse than IMG_4238, similar to IMG_4232/4236), but content cross-validated against IMG_4238 for the overlapping lines 492-501 (exact match) and resolved via multiple tight crops for the new content 502-517. This photo shows the end of applyPermissionsToPage (492-497), the start of a JSDoc block (499-505) documenting a new function, and the beginning of function applyPermissionToControl (506+) including its parameter list and the start of its body (visibility-hide branch). Explorer sidebar unchanged (utils/ folder, user-permissions.ts selected). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Line 517 cut off at bottom by taskbar overlay; only a ghost repeat of the line-514 comment is visible there, not confidently a distinct real line (likely the closing "}" of the if-block, not legible).
---
```
361	export function applyPermissionsToPage(
...
492	if (stats.divsProcessed > 0)
493	    console.log(`[Permissions] DIVs processed: ${stats.divsProcessed}`);
494	console.log('[Permissions] ==================================================');
495	
496	return updated;
497	}
498	
499	/**
500	 * Apply permission to a single control with condition checks.
501	 * Legacy behavior:
502	 *   - Only hide if currently visible=T
503	 *   - Only disable if currently disabled=F
504	 *   Set @secDis="T" marker if disabled by security
505	 */
506	function applyPermissionToControl(
507	    ctrl: any,
508	    perm: PermissionNode,
509	    forceDisableWhenHidden: boolean = false,
510	): void {
511	    const currentVisible = ctrl['@visible'];
512	    const currentDisabled = ctrl['@disabled'];
513	
514	    // Visibility: Only hide if currently visible
515	    if (!perm.vis && currentVisible === 'T') {
516	        ctrl['@visible'] = 'F';
517	⟪?⟫ (cut off at bottom edge, not legible)
```


========== IMG_4232.md ==========
---
photo: IMG_4232.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 381-406
orientation: 180
confidence: medium
notes: Photo has a motion-blur / double-exposure artifact — every row shows two overlapping renders of the editor offset by ~2-3 line-heights (looks like the camera caught VS Code mid smooth-scroll). Content below was reconstructed by cross-referencing both overlapping layers and validating against the logical code flow and against the tail of IMG_4230/4231 (line 381 "Page @matchcode" and the start of line 383 "// Resolve LOB and Page keys" match exactly, confirming alignment). Blank lines (382, 390, 393, 396, 403) inferred from visible vertical gaps between statements, not fully certain given the blur — flagged medium confidence. Explorer sidebar unchanged from prior photos (utils/ folder, user-permissions.ts selected). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Sticky scroll header shows "361 export function applyPermissionsToPage(". Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Bottom line 406 cut off by taskbar overlay; a further ghost fragment of "// Stats for debugging" is visible below it but not confidently a distinct line.
---
```
381	console.log('[Permissions] Page @matchcode:', updated?.Page?.['@matchcode']);
382	
383	// Resolve LOB and Page keys
384	const lobKey = resolveLobKey(updated, permissionMap, {
385	    compLocToLob,
386	    nodeKeyToLob,
387	    defaultLob,
388	});
389	const pageKey = resolvePageKey(updated, lobKey, permissionMap, { actionToPageMc });
390	
391	console.log('[Permissions] Resolved LOB:', lobKey || '(none)');
392	console.log('[Permissions] Resolved Page:', pageKey || '(none)');
393	
394	const controls: any[] = updated?.Page?.controls?.control || [];
395	console.log(`[Permissions] Total controls to process: ${controls.length}`);
396	
397	// Build a map for quick lookup of controls by matchcode
398	const controlMap = new Map<string, any>();
399	for (const ctrl of controls) {
400	    const mc = ctrl?.['@matchcode'];
401	    if (mc) controlMap.set(mc, ctrl);
402	}
403	
404	// Stats for debugging
405	const stats = {
406	    total: controls.length,
```


========== IMG_4240.md ==========
---
photo: IMG_4240.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 506, 511-530
orientation: 180
confidence: medium
notes: Sticky header shows line 506 "function applyPermissionToControl(" (no longer line 361 — scrolled past the outer function). Same one-line-offset/-3-row ghosting artifact as other photos in this run; resolved via a precise gutter-aligned crop confirming the sequential bright line numbers 511-530 with no skips. Lines 511-528 are high confidence (fully cross-validated against IMG_4239 for the overlapping 511-517 and internally consistent for 518-528). Lines 529-530 are uncertain: the crop appeared to show "/**" sandwiched between two closing braces, which is not structurally valid — most likely 529 closes the forceDisableWhenHidden if-block and 530 closes the function itself, with a new JSDoc block starting after (cut off / not clearly resolved in this photo), but this is our best-effort reconstruction, not a confirmed reading. Explorer sidebar not visible in this crop range (scrolled/same file). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution".
---
```
506	function applyPermissionToControl(
...
511	    const currentVisible = ctrl['@visible'];
512	    const currentDisabled = ctrl['@disabled'];
513	
514	    // Visibility: Only hide if currently visible
515	    if (!perm.vis && currentVisible === 'T') {
516	        ctrl['@visible'] = 'F';
517	    }
518	
519	    // Disabled: Only disable if currently enabled
520	    if (perm.dis && currentDisabled === 'F') {
521	        ctrl['@disabled'] = 'T';
522	        // Set @secDis marker to indicate disabled by security
523	        ctrl['@secDis'] = 'T';
524	    }
525	    // Force disable when hidden (optional safety feature)
526	    if (forceDisableWhenHidden && ctrl['@visible'] === 'F') {
527	        ctrl['@disabled'] = 'T';
528	    }
529	⟪?⟫ likely closing brace of if-block and/or function; exact content/order of 529-530 not reliably resolved due to ghosting
530	⟪?⟫
```


========== IMG_4241.md ==========
---
photo: IMG_4241.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 506, 518-540 (JSDoc block corrected to 532-535 after cross-checking multiple crops)
orientation: 180
confidence: medium
notes: Sticky header shows line 506 "function applyPermissionToControl(". Same heavy motion-blur/double-exposure ghosting as IMG_4236/IMG_4239 (repeated attempts at disambiguating bright-vs-ghost text in the 518-532 range gave inconsistent results between crops, so that range is presented as content-only without fully trustworthy line-number assignment). Lines 511-517 (not repeated below, see IMG_4239/4240) and lines 533-540 are HIGH confidence, cross-validated across multiple independent crops. The 518-532 range's distinct statements were identified (visibility-hide branch tail, disabled/secDis branch, force-disable-when-hidden branch, closing braces) but exact line-by-line placement could not be pinned down reliably — flagged uncertain. This photo shows the tail of applyPermissionToControl, a new JSDoc block documenting a TAB-controls permission function (533-535), and the start of function applyTabPermission (536-540). Explorer sidebar unchanged (utils/ folder, user-permissions.ts selected). Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts > ... Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Content past line 540 ("if (!perm.vis) {" and "ctrl['@visible'] = 'F';") is cut off at the very bottom edge by the horizontal scrollbar/status bar — only visible as faint ghost bleed-through, not confidently transcribed.
---
```
506	function applyPermissionToControl(
...
⟪uncertain exact line numbers, ~518-532 — content observed but ordering/spacing not fully verifiable due to heavy ghosting⟫
	// Disabled: Only disable if currently enabled
	if (perm.dis && currentDisabled === 'F') {
	    ctrl['@disabled'] = 'T';
	    // Set @secDis marker to indicate disabled by security
	    ctrl['@secDis'] = 'T';
	}
	// Force disable when hidden (optional safety feature)
	if (forceDisableWhenHidden && ctrl['@visible'] === 'F') {
	    ctrl['@disabled'] = 'T';
	}

532	/**
533	 * Apply permission to TAB controls.
534	 * TABs use @tabVisible and @tabDisabled attributes.
535	 */
536	function applyTabPermission(ctrl: any, perm: PermissionNode): void {
537	    ctrl['@tabVisible'] = toTF(perm.vis);
538	    ctrl['@tabDisabled'] = toTF(perm.dis);
539	
540	    // Also set standard attributes for consistency
541	⟪?⟫ cut off at bottom edge — appears to be "if (!perm.vis) {" continuing, not confidently legible
```


========== IMG_4242.md ==========
---
photo: IMG_4242.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 533-556
orientation: 180
confidence: medium
notes: Photo has significant motion-blur/double-exposure ghosting (two overlapping semi-transparent copies of the same static screen offset by a few pixels), making exact line-boundary reading hard in places; content below was cross-verified across three independent zoomed re-reads and is internally consistent. Tab bar shows single open tab "user-permissions.ts". Breadcrumb: aqs-web-ui > src > utils > user-permissions.ts. Explorer sidebar (src/utils/, expanded) shows files: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...(truncated), ui-helpers.ts, user-permissions.ts (selected/highlighted), xml-detail-persistence.ts, zod-error-formatter.ts; below utils/: app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, TypeScript. Lines 555-556 corrected using the much sharper/less-ghosted view of the same lines in IMG_4243 (params are ctrl/perm/allControls/_controlMap/forceDisableWhenHidden, not allControls/controlMap as initially misread here). Function signature for applyDivPermission continues past line 556 (params allControls/_controlMap/forceDisableWhenHidden and opening "{") — see IMG_4243 for lines 557 onward.
---
533	/**
534	 * Apply permission to TAB controls.
535	 * TABs use @tabVisible and @tabDisabled attributes.
536	 */
537	function applyTabPermission(ctrl: any, perm: PermissionNode): void {
538	    ctrl['@tabVisible'] = toTF(perm.vis);
539	    ctrl['@tabDisabled'] = toTF(perm.dis);
540	    // Also set standard attributes for consistency
541	    if (!perm.vis) {
542	        ctrl['@visible'] = 'F';
543	    }
544	    if (perm.dis) {
545	        ctrl['@disabled'] = 'T';
546	        ctrl['@secDis'] = 'T';
547	    }
548	}
549	
550	/**
551	 * Apply permission to DIV container and cascade to child controls.
552	 * Legacy behavior: When DIV is hidden/disabled, all children inside are affected.
553	 */
554	function applyDivPermission(
555	    ctrl: any,
556	    perm: PermissionNode,


========== IMG_4243.md ==========
---
photo: IMG_4243.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 548-575
orientation: 180
confidence: high
notes: Same file/session as IMG_4242 (continues just below it), single open tab "user-permissions.ts", branch "hitanshu/experimental*", "No Solution", 2 errors/0 warnings, Ln 1 Col 1, TypeScript. Explorer sidebar (src/utils/, expanded) same file list as IMG_4242: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...(truncated), ui-helpers.ts, user-permissions.ts (selected), xml-detail-persistence.ts, zod-error-formatter.ts; below utils/: app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts. Photo has mild double-exposure ghosting (a fainter offset repeat of the same static text) but the primary text layer is sharp and unambiguous throughout — much clearer than IMG_4242's version of the same function signature (params here confirmed as ctrl/perm/allControls/_controlMap/forceDisableWhenHidden, used to correct IMG_4242 lines 555-556). Line 575 is visible only as a sliver at the very bottom edge (horizontal scrollbar overlapping) — not legible, omitted from transcription. Note parameter name is "_controlMap" (underscore-prefixed, appears unused in this function body) and "forceDisableWhenHidden" (no 'd' after Disable).
---
548	}
549	
550	/**
551	 * Apply permission to DIV container and cascade to child controls.
552	 * Legacy behavior: When DIV is hidden/disabled, all children inside are affected.
553	 */
554	function applyDivPermission(
555	    ctrl: any,
556	    perm: PermissionNode,
557	    allControls: any[],
558	    _controlMap: Map<string, any>,
559	    forceDisableWhenHidden: boolean,
560	): void {
561	    const divMc = ctrl['@matchcode'];
562	
563	    // Apply to the DIV itself
564	    applyPermissionToControl(ctrl, perm, forceDisableWhenHidden);
565	
566	    // Find and apply to all child controls that belong to this DIV
567	    // Children have @tab or @div attribute matching the DIV matchcode
568	    for (const childCtrl of allControls) {
569	        const childDiv = childCtrl['@div'] || childCtrl['@tab'];
570	        if (childDiv === divMc) {
571	            applyPermissionToControl(childCtrl, perm, forceDisableWhenHidden);
572	        }
573	    }
574	}


========== IMG_4244.md ==========
---
photo: IMG_4244.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 554-580
orientation: 180
confidence: high
notes: Same editor/session as IMG_4242/IMG_4243, scrolled slightly further down (overlaps IMG_4243's 554-574, extends to new content 575-580). Single open tab "user-permissions.ts", branch "hitanshu/experimental*", "No Solution", 2 errors/0 warnings, Ln 1 Col 1, TypeScript. Explorer sidebar unchanged (utils/ expanded, user-permissions.ts selected). Mild double-exposure ghosting present (as in the other two photos) but primary text layer is sharp and legible. Line 580 sits at the very bottom edge of the visible editor area with what looks like a red squiggle/selection highlight under "lblPOLPOL_NEFFDAT" (spell-check style underline on the identifier inside the comment); text still legible.
---
554	function applyDivPermission(
555	    ctrl: any,
556	    perm: PermissionNode,
557	    allControls: any[],
558	    _controlMap: Map<string, any>,
559	    forceDisableWhenHidden: boolean,
560	): void {
561	    const divMc = ctrl['@matchcode'];
562	
563	    // Apply to the DIV itself
564	    applyPermissionToControl(ctrl, perm, forceDisableWhenHidden);
565	
566	    // Find and apply to all child controls that belong to this DIV
567	    // Children have @tab or @div attribute matching the DIV matchcode
568	    for (const childCtrl of allControls) {
569	        const childDiv = childCtrl['@div'] || childCtrl['@tab'];
570	        if (childDiv === divMc) {
571	            applyPermissionToControl(childCtrl, perm, forceDisableWhenHidden);
572	        }
573	    }
574	}
575	
576	/**
577	 * Apply permissions to companion controls (labels, calendars, info buttons).
578	 * Legacy naming convention:
579	 *   - Field: POLPOL_NEFFDAT
580	 *   - Label: lblPOLPOL_NEFFDAT


========== IMG_4245.md ==========
---
photo: IMG_4245.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 576-601
orientation: 180
confidence: high
notes: Same editor/session as IMG_4242-4244, scrolled further down. Single open tab "user-permissions.ts", branch "hitanshu/experimental*", "No Solution", 2 errors/0 warnings, Ln 1 Col 1, TypeScript. Explorer sidebar unchanged (utils/ expanded, user-permissions.ts selected). Mild double-exposure ghosting present but primary text layer sharp/legible throughout. A dimmed line is visible at the very top edge of the code pane labeled "575" reading "function applyDivPermission(" — likely a VS Code sticky-scroll artifact/ghost rather than genuine line 575 content (line 575 was confirmed blank in IMG_4244, and applyDivPermission's real declaration is line 554); not included in the numbered transcript below since its meaning is uncertain. Legacy naming convention comment documents companion-control field-name prefixes (lbl/cal/inf) for labels/calendars/info-buttons tied to a POL field example "POLPOL_NEFFDAT".
---
576	/**
577	 * Apply permissions to companion controls (labels, calendars, info buttons).
578	 * Legacy naming convention:
579	 *   - Field: POLPOL_NEFFDAT
580	 *   - Label: lblPOLPOL_NEFFDAT
581	 *   - Calendar: calPOLPOL_NEFFDAT
582	 *   - Info button: infPOLPOL_NEFFDAT
583	 */
584	function applyCompanionPermissions(
585	    baseMc: string,
586	    perm: PermissionNode,
587	    controlMap: Map<string, any>,
588	    _forceDisableWhenHidden: boolean,
589	): void {
590	    const companionPrefixes = ['lbl', 'cal', 'inf'];
591	
592	    for (const prefix of companionPrefixes) {
593	        const companionMc = prefix + baseMc;
594	        const companionCtrl = controlMap.get(companionMc);
595	
596	        if (companionCtrl) {
597	            // For visibility, hide companion if main field is hidden
598	            if (!perm.vis) {
599	                companionCtrl['@visible'] = 'F';
600	            }
601	            // Labels typically don't have disabled state, but cal/inf might


========== IMG_4246.md ==========
---
photo: IMG_4246.JPG
type: vscode-code
file: aqs-web-ui/src/utils/user-permissions.ts
lines: 584 (sticky header), 592-608
orientation: 180
confidence: high
notes: Same editor/session as IMG_4242-4245, scrolled further down; end of applyCompanionPermissions function. Single open tab "user-permissions.ts", branch "hitanshu/experimental*", "No Solution", 2 errors/0 warnings, Ln 1 Col 1, TypeScript. Explorer sidebar unchanged (utils/ expanded, user-permissions.ts selected). This photo is notably sharp with almost no double-exposure ghosting (unlike IMG_4242-4245), so confidence is high. VS Code sticky-scroll header pinned at top shows "584 function applyCompanionPermissions(" (the enclosing function declaration) while the editor is scrolled to show its body; line 591 (blank) is cut off just below the sticky header, not legible. Line 608 is blank (end of file content visible, no further code below).
---
584	function applyCompanionPermissions(   ⟪sticky-scroll header⟫
592	    for (const prefix of companionPrefixes) {
593	        const companionMc = prefix + baseMc;
594	        const companionCtrl = controlMap.get(companionMc);
595	
596	        if (companionCtrl) {
597	            // For visibility, hide companion if main field is hidden
598	            if (!perm.vis) {
599	                companionCtrl['@visible'] = 'F';
600	            }
601	            // Labels typically don't have disabled state, but cal/inf might
602	            if (perm.dis && prefix !== 'lbl') {
603	                companionCtrl['@disabled'] = 'T';
604	            }
605	        }
606	    }
607	}
608	
