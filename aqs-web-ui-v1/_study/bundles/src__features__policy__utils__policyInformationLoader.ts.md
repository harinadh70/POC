# BUNDLE for src/features/policy/utils/policyInformationLoader.ts
# 40 photo fragment(s), ascending start-line order.


========== IMG_2581.md ==========
---
photo: IMG_2581.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 1-34
orientation: 180
confidence: high
notes: Tab bar shows "policyInformationLoader.ts" with "1" badge (unsaved changes). Breadcrumb: aqs-web-ui > src > features > policy > utils > policyInformationLoader.ts. Explorer sidebar (features/policy/utils expanded) shows files: action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoa...(selected/highlighted, truncated name = policyInformationLoader.ts), ultimateCoverLoader.ts; sibling files under policy: constants/tab-definitions.ts, constants/ultimate-cover-tab-definit...(truncated), FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Top-level folders visible: prp, root, hooks, lib, pages, providers, services, types. Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*", "No Solution", 3 errors / 0 warnings, Ln 1 Col 1, Tab Size:4, UTF-8, CRLF, TypeScript. Line 34 is at the very bottom edge of the visible screen (below it is the status bar) — confirmed via crop, text is legible but partially clipped by editor window bottom edge.
---
```ts
1  import { data, redirect } from 'react-router';
2  import { fetchPageBuild } from '@services/page-build';
3  import { PolicyInformationFields } from '@features/policy/policy-information-fields';
4  import { transformPageBuildResponse } from '@utils/transform-pagebuild-response';
5  import { normalizeServiceConfig } from '@utils/normalize-service-config';
6  import { parseBrowserCommandsFromPageBuild } from '@utils/apply-server-commands';
7  import { getItem } from '@utils/local-storage';
8  import { readContextFromStorage } from '@utils/session-sync';
9  
10 import type { SessionInfo } from '@features/auth/services/auth';
11 
12 function ensureArray<T>(v: T | T[] | undefined): T[] {
13     if (!v) return [];
14     return Array.isArray(v) ? v : [v];
15 }
16 
17 function normalizeXmlPath(value: string | undefined): string | undefined {
18     if (!value || !value.trim()) {
19         return undefined;
20     }
21 
22     return value
23         .trim()
24         .replace(/^\.\.\//, '')
25         .replace(/^\//, '');
26 }
27 
28 function normalizePageCodeFromXmlPath(value: string | undefined): string | undefined {
29     const normalized = normalizeXmlPath(value);
30     if (!normalized) {
31         return undefined;
32     }
33 
34     return normalized.replace(/\.xml$/i, '');
```


========== IMG_2582.md ==========
---
photo: IMG_2582.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 12-44
orientation: 180
confidence: high
notes: Same file/tab as IMG_2581 ("policyInformationLoader.ts", "1" unsaved badge), scrolled down to show lines 12-44. Photo has a motion/double-exposure ghosting artifact (likely mid-scroll-animation when shot) — a faint duplicate of the same text appears offset ~1 line below the crisp primary text; transcription below is from the crisp, in-focus layer only, cross-checked against IMG_2581 for lines 12-34 (identical content, confirms line 34 in full: "return normalized.replace(/\.xml$/i, '');"). Source Control icon in activity bar shows badge "27". Explorer sidebar unchanged from IMG_2581 (policy/utils folder expanded, policyInformationLoader.ts highlighted). Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings, Ln 1 Col 1, Tab Size:4, UTF-8, CRLF, TypeScript.
---
```ts
12 function ensureArray<T>(v: T | T[] | undefined): T[] {
13     if (!v) return [];
14     return Array.isArray(v) ? v : [v];
15 }
16 
17 function normalizeXmlPath(value: string | undefined): string | undefined {
18     if (!value || !value.trim()) {
19         return undefined;
20     }
21 
22     return value
23         .trim()
24         .replace(/^\.\.\//, '')
25         .replace(/^\//, '');
26 }
27 
28 function normalizePageCodeFromXmlPath(value: string | undefined): string | undefined {
29     const normalized = normalizeXmlPath(value);
30     if (!normalized) {
31         return undefined;
32     }
33 
34     return normalized.replace(/\.xml$/i, '');
35 }
36 
37 function resolveEffectiveAction(rawAction: string): string {
38     const normalized = rawAction.trim().toUpperCase();
39     if (!normalized.includes('|')) {
40         return rawAction;
41     }
42 
43     const tokens = normalized
44         .split('|')
```


========== IMG_2583.md ==========
---
photo: IMG_2583.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 17-58 (approx, see notes)
orientation: 180
confidence: high
notes: Same file/tab as IMG_2581/2582 ("policyInformationLoader.ts"), scrolled further down. This photo has a strong double-exposure/motion-blur artifact — the editor gutter and text visibly show TWO overlapping scroll positions offset by ~3 lines (e.g. gutter shows stacked pairs like "47/50", "50/53", "53/56" at the same pixel row), almost certainly because the photo was taken mid smooth-scroll animation (e.g. a fast mouse-wheel tick) with a slow shutter. The upper portion (lines 17-34, function normalizeXmlPath/normalizePageCodeFromXmlPath) duplicates content already cleanly transcribed in IMG_2581/IMG_2582 and is omitted here. For the tail content (resolveEffectiveAction body, lines 37-58) exact line numbers could not be read with certainty directly from this photo because of the doubled gutter digits, so the numbering below was originally RECONSTRUCTED by sequential counting from the confirmed anchor "44: .split('|')" (IMG_2582) plus the surrounding functions' blank-line-per-block pattern. UPDATE: IMG_2584 (same file, scrolled slightly further, much less ghosting) independently shows this exact same function with clean/legible line numbers, and CONFIRMS this reconstruction is byte-for-byte correct (both content and line numbers). Confidence upgraded to high accordingly. Only ONE occurrence of the trailingToken-check block exists in the real file; the apparent second occurrence in this photo is the ghosting duplicate, not real duplicated code. Source Control badge "27" visible. Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings, Ln 1 Col 1, Tab Size:4, UTF-8, CRLF, TypeScript.
---
```ts
17 function normalizeXmlPath(value: string | undefined): string | undefined {
   ⟪... lines 18-34 unchanged, see IMG_2581/IMG_2582 transcripts ...⟫
37 function resolveEffectiveAction(rawAction: string): string {
38     const normalized = rawAction.trim().toUpperCase();
39     if (!normalized.includes('|')) {
40         return rawAction;
41     }
42 
43     const tokens = normalized
44         .split('|')
45         .map((token) => token.trim())
46         .filter((token) => token.length > 0);
47 
48     if (tokens.length < 2) {
49         return rawAction;
50     }
51 
52     const trailingToken = tokens[tokens.length - 1];
53     if (trailingToken === 'RLVUPDATE') {
54         return trailingToken;
55     }
56 
57     return tokens[0];
58 }
```


========== IMG_2584.md ==========
---
photo: IMG_2584.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 28-64
orientation: 180
confidence: high
notes: Same file/tab as IMG_2581/2582/2583 ("policyInformationLoader.ts", "1" unsaved badge), scrolled further down. Photo again shows a mild double-exposure/ghosting artifact (same mid-scroll camera effect as IMG_2583) but the primary/bold text layer is legible and internally consistent here, and it CONFIRMS the reconstructed line numbering proposed in IMG_2583's transcript for the resolveEffectiveAction function body (lines 37-58) — content and line numbers match exactly. This photo adds new content beyond IMG_2583: the end of normalizePageCodeFromXmlPath (line 28 header visible, body already transcribed in IMG_2581/2582), the full resolveEffectiveAction function (37-58, confirming prior reconstruction), and a new interface PageBuildXmlItem (60-64) not seen in earlier photos. Explorer sidebar unchanged (policy/utils folder expanded, policyInformationLoader.ts highlighted). Source Control badge "27". Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings, Ln 1 Col 1, Tab Size:4, UTF-8, CRLF, TypeScript.
---
```ts
28 function normalizePageCodeFromXmlPath(value: string | undefined): string | undefined {
   ⟪... lines 29-36 unchanged, see IMG_2581/IMG_2582/IMG_2583 transcripts ...⟫
37 function resolveEffectiveAction(rawAction: string): string {
38     const normalized = rawAction.trim().toUpperCase();
39     if (!normalized.includes('|')) {
40         return rawAction;
41     }
42 
43     const tokens = normalized
44         .split('|')
45         .map((token) => token.trim())
46         .filter((token) => token.length > 0);
47 
48     if (tokens.length < 2) {
49         return rawAction;
50     }
51 
52     const trailingToken = tokens[tokens.length - 1];
53     if (trailingToken === 'RLVUPDATE') {
54         return trailingToken;
55     }
56 
57     return tokens[0];
58 }
59 
60 interface PageBuildXmlItem {
61     '@name': string;
62     '@value': string;
63     item?: PageBuildXmlItem[];
64 }
```


========== IMG_2585.md ==========
---
photo: IMG_2585.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 37-81
orientation: 180
confidence: high
notes: Same file/tab as IMG_2581-2584 ("policyInformationLoader.ts", "1" unsaved badge), scrolled further down. Mild double-exposure ghosting artifact present (as in prior photos of this scroll session) but primary/bold text layer is clearly legible throughout and content is cross-verified via zoomed crops. Lines 37-64 duplicate content already transcribed in IMG_2583/IMG_2584 (confirms it again). New content: interface PageBuildXmlDetail (65-69) and start of function toPageBuildXmlDetail (70-81, body continues into next photo — line 81 "return {" is the last fully visible line before the editor viewport bottom/status bar). Explorer sidebar unchanged (policy/utils folder expanded, policyInformationLoader.ts highlighted). Source Control badge "27". Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings, Ln 1 Col 1, Tab Size:4, UTF-8, CRLF, TypeScript.
---
```ts
37 function resolveEffectiveAction(rawAction: string): string {
   ⟪... lines 38-58 unchanged, see IMG_2583/IMG_2584 transcripts ...⟫
59 
60 interface PageBuildXmlItem {
   ⟪... lines 61-64 unchanged, see IMG_2584 transcript ...⟫
65 interface PageBuildXmlDetail {
66     items: {
67         item: PageBuildXmlItem[];
68     };
69 }
70 
71 function toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {
72     if (!source) {
73         return undefined;
74     }
75 
76     if (typeof source === 'object' && source !== null) {
77         const record = source as { items?: { item?: unknown } };
78         const items = record.items?.item;
79 
80         if (Array.isArray(items)) {
81             return {
```


========== IMG_2586.md ==========
---
photo: IMG_2586.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 37-89
orientation: 180
confidence: high
notes: Same file/tab as IMG_2581-2585 ("policyInformationLoader.ts", "1" unsaved badge), scrolled further down. This photo is sharp with no double-exposure ghosting (unlike IMG_2583/2585). Lines 37-78 duplicate content already transcribed in IMG_2583/2584/2585 (confirms it again, no discrepancies found). New content: rest of the toPageBuildXmlDetail function body (79-88), the Array.isArray(items) branch's return object — maps raw items to { items: { item: [...] } } shape, building each row's '@name'/'@value' from a Record<string, unknown> cast. Line 89 is cut off at the very bottom of the editor viewport (only the gutter number "89" is visible above the status bar; its content is not visible in this photo). Explorer sidebar unchanged (policy/utils folder expanded, policyInformationLoader.ts highlighted). Source Control badge "27". Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings, Ln 1 Col 1, Tab Size:4, UTF-8, CRLF, TypeScript.
---
```ts
37 function resolveEffectiveAction(rawAction: string): string {
   ⟪... lines 38-78 unchanged, see IMG_2583/IMG_2584/IMG_2585 transcripts ...⟫
79     if (Array.isArray(items)) {
80         return {
81             items: {
82                 item: items
83                     .filter((item) => typeof item === 'object' && item !== null)
84                     .map((item) => {
85                         const row = item as Record<string, unknown>;
86                         return {
87                             '@name': String(row['@name'] ?? ''),
88                             '@value': String(row['@value'] ?? ''),
89 ⟪? line cut off at bottom of viewport, not visible in photo⟫
```


========== IMG_2587.md ==========
---
photo: IMG_2587.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 64-97
orientation: 180
confidence: high
notes: Same file/tab as IMG_2581-2586 ("policyInformationLoader.ts", "1" unsaved badge), scrolled further down. Photo is sharp, no double-exposure ghosting. Lines 64-88 duplicate content already transcribed in IMG_2584/2585/2586 (confirms it again, no discrepancies). New content: the closing braces that end toPageBuildXmlDetail's Array.isArray branch and the function itself (89-95, verified precisely via indentation-guide crop — closing sequence "};" / "}),​" / "}," / "};" / "}" / "}" / "}" matches nesting of return{/map()/items:{/return{/if(Array.isArray)/if(typeof===object)/function), a blank line 96, and the start of a new guard clause "if (typeof source !== 'string') {" at line 97 (this is the last line visible before the editor viewport bottom/status bar — its body is not shown in this photo). Explorer sidebar unchanged (policy/utils folder expanded, policyInformationLoader.ts highlighted). Source Control badge "27". Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings, Ln 1 Col 1, Tab Size:4, UTF-8, CRLF, TypeScript.
---
```ts
64 }
   ⟪... lines 65-88 unchanged, see IMG_2584/IMG_2585/IMG_2586 transcripts ...⟫
89                             };
90                         }),
91                     },
92                 };
93             }
94         }
95     }
96 
97     if (typeof source !== 'string') {
```


========== IMG_2588.md ==========
---
photo: IMG_2588.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 71-107
orientation: 180
confidence: high
notes: Breadcrumb "aqs-web-ui > src > features > policy > utils > TS policyInformationLoa... > toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {". VS Code sticky-scroll shows two pinned header rows at top of editor: line 71 (function signature) and a second row "if (typeof source === 'object' && source !== null) {" which has NO visible line number in the gutter (blank) — likely the enclosing if-block header for the scrolled content starting at line 76; its true line number (probably 75) is not legible in the photo, so left unlabeled below. Explorer sidebar (policy feature folder) expanded: constants> (tab-definitions.ts, ultimate-cover-tab-definit...), utils> (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoa...ts [selected/highlighted], ultimateCoverLoader.ts), FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts; parent tree also shows prp>, root>, hooks>, lib>, pages>, providers>, services>, types> (collapsed). Tab bar: only "policyInformationLoader.ts" open (1 unsaved dot). Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution". Editor language TypeScript, CRLF, UTF-8.
---
71	    function toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {
	    if (typeof source === 'object' && source !== null) {
76	        const record = source as { items?: { item?: unknown } };
77	        const items = record.items?.item;
78	
79	        if (Array.isArray(items)) {
80	            return {
81	                items: {
82	                    item: items
83	                        .filter((item) => typeof item === 'object' && item !== null)
84	                        .map((item) => {
85	                            const row = item as Record<string, unknown>;
86	                            return {
87	                                '@name': String(row['@name'] ?? ''),
88	                                '@value': String(row['@value'] ?? ''),
89	                            };
90	                        }),
91	                },
92	            };
93	        }
94	    }
95	
96	
97	    if (typeof source !== 'string') {
98	        return undefined;
99	    }
100	
101	    const value = source.trim();
102	    if (!value) {
103	        return undefined;
104	    }
105	
106	    if (value.startsWith('{') || value.startsWith('[')) {
107	        try {


========== IMG_2589.md ==========
---
photo: IMG_2589.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 71-123
orientation: 180
confidence: high
notes: Breadcrumb "aqs-web-ui > src > features > policy > utils > TS policyInformationLoader.ts > ...". VS Code sticky-scroll shows two pinned header rows at top of editor: line 71 (function signature, fully legible) and a second row directly below reading "items: {" whose line-number digits are cut in half by the sticky-scroll boundary (only top halves visible, read as "81", matches content of line 81 from IMG_2588) — medium confidence on that specific number. Editor now scrolled further down than IMG_2588; visible body lines 92-123. Same file as IMG_2588 (continuation, more scrolled). Lines 111-113 show THREE consecutive closing braces at decreasing indent (2-tab, 1-tab, flush-left) where only two would normally be expected to close the try/catch and the enclosing "if (value.startsWith...)" — the flush-left brace at 113 is one level shallower than the "if" at 105, which would prematurely close the enclosing function; this is plausibly linked to the "3 errors" shown in the status bar for this WIP branch, transcribed verbatim as seen rather than "corrected". Line 123 renders '@name' followed by what looks like a semicolon but is syntactically a colon (object literal key), consistent with pattern on line 87 of IMG_2588 ('@value' key similarly on next line, cut off at bottom edge of photo). Explorer sidebar: same policy/utils folder expanded, policyInformationLoader.ts highlighted/selected (tab shows "1" unsaved-edit dot). Tab bar: only policyInformationLoader.ts open. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
71	    function toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {
81	        items: {
92	            };
93	        }
94	    }
95	
96	
97	    if (typeof source !== 'string') {
98	        return undefined;
99	    }
100	    const value = source.trim();
101	    if (!value) {
102	        return undefined;
103	    }
104	
105	    if (value.startsWith('{') || value.startsWith('[')) {
106	        try {
107	            const parsed = JSON.parse(value) as unknown;
108	            return toPageBuildXmlDetail(parsed);
109	        } catch {
110	            return undefined;
111	        }
112	    }
113	}
114	
115	    try {
116	        const parser = new DOMParser();
117	        const doc = parser.parseFromString(value, 'text/xml');
118	        if (doc.querySelector('parsererror')) {
119	            return undefined;
120	        }
121	
122	        const xmlItems = Array.from(doc.querySelectorAll('item')).map((item) => ({
123	            '@name': item.getAttribute('name') ?? '',


========== IMG_2591.md ==========
---
photo: IMG_2591.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 71-149
orientation: 180
confidence: medium
notes: Same file, scrolled further down; range 119-136 is a re-scroll of content already sharply verified in IMG_2590 (reused here since this photo's own view of that range is obscured by heavy motion-blur ghosting — a second fainter copy of the code offset ~2 lines down-left is superimposed throughout, worse than IMG_2590/2589). New content past IMG_2590's bottom starts at line 137. Sticky-scroll pinned rows at top: line 71 (function signature) and line 115 ("try {") — these visually cover/hide lines 116-118 in the gutter, so first normally-scrolled visible line is 119. Lines 137-149 read fresh from this photo but line-number alignment in the 145-149 zone is uncertain (repeated re-crops gave inconsistent alignment by ±1 row due to the ghosting) — best-effort mapping used; line 145 could not be confidently read (may be blank) and line 149 is cut off at the bottom edge of the editor viewport (only its opening "console.log(" ghost fragment visible, rest illegible). Function policyInformationLoader begins at 139 (exported, async, takes { request }: any); loaderCallCount is declared/reset oddly twice in view (module-level "let loaderCallCount = 0;" at 137 outside the function, then apparently reused/incremented inside at 141 without a second declaration — consistent with the file's WIP state / 3 reported TS errors). Explorer sidebar unchanged (policy/utils folder, policyInformationLoader.ts selected). Tab bar: only policyInformationLoader.ts open. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
71	    function toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {
115	    try {
119	            return undefined;
120	        }
121	        const xmlItems = Array.from(doc.querySelectorAll('item')).map((item) => ({
122	            '@name': item.getAttribute('name') ?? '',
123	            '@value': item.getAttribute('value') ?? '',
124	        }));
125	
126	
127	        return {
128	            items: {
129	                item: xmlItems,
130	            },
131	        };
132	    } catch {
133	        return undefined;
134	    }
135	}
136	
137	let loaderCallCount = 0;
138	}
139	export async function policyInformationLoader({ request }: any) {
140	    try {
141	        loaderCallCount++;
142	        // Reuse query param parsing similar to existing loader behavior
143	        const url = new URL(String(request.url));
144	        const search = url.searchParams;
145	
146	        console.log(`[PolicyInformationLoader] ===== START (Call #${loaderCallCount}) =====`);
147	        console.log('[PolicyInformationLoader] Request details:', {
148	            pathname: url.pathname,
149	⟪?⟫


========== IMG_2592.md ==========
---
photo: IMG_2592.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 71-157
orientation: 180
confidence: high
notes: Same file, scrolled further down; sharp/clear photo, no motion-blur ghosting (unlike IMG_2590/2591). Sticky-scroll line 71 (function signature) still pinned at top. Line numbers for the return-object/catch block here (126-136) are ONE LOWER than the equivalent content read in IMG_2590/IMG_2591 (e.g. "return {" is 126 here vs 127 there), and this photo has an extra blank line between "return undefined;" and its closing brace that IMG_2590/2591 did not show — most likely the developer made a small edit (removed/added a blank line) to this actively-edited WIP file between those photos and this one, rather than a misreading; each photo's line numbers were independently re-verified against its own gutter via tight zoom crops. New content beyond IMG_2591: policyInformationLoader function body implementing query-param parsing, console logging (twice: a "===== START" banner and a "Request details" object dump with pathname/searchParams), a commented-out landingToken line, readContextFromStorage(), and reading sessionInfo via getItem — trailing off at "const policyId =" at line 157 (bottom edge of viewport, value not visible). Explorer sidebar unchanged (policy/utils folder, policyInformationLoader.ts selected, 1 unsaved-edit dot). Tab bar: only policyInformationLoader.ts open. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
71	    function toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {
126	        return {
127	            items: {
128	                item: xmlItems,
129	            },
130	        };
131	    } catch {
132	        return undefined;
133	
134	    }
135	}
136	
137	let loaderCallCount = 0;
138	
139	export async function policyInformationLoader({ request }: any) {
140	    try {
141	        loaderCallCount++;
142	
143	        // Reuse query param parsing similar to existing loader behavior
144	        const url = new URL(String(request.url));
145	        const search = url.searchParams;
146	
147	        console.log(`[PolicyInformationLoader] ===== START (Call #${loaderCallCount}) =====`);
148	        console.log('[PolicyInformationLoader] Request details:', {
149	            pathname: url.pathname,
150	            searchParams: Object.fromEntries(search.entries()),
151	        });
152	
153	        //  const landingToken = search.get('landingToken') || search.get('xmlToken') || undefined;
154	        const storedContext = readContextFromStorage();
155	        const sessionInfo = (getItem('sessionInformation') as Record<string, unknown> | null) ?? {};
156	
157	        const policyId =


========== IMG_2590.md ==========
---
photo: IMG_2590.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 105-136
orientation: 180
confidence: medium
notes: Same file as IMG_2588/IMG_2589, scrolled further down (sticky-scroll line 71 function signature still pinned at top, visible but mostly occluded by a heavy motion-blur/double-exposure ghost). The whole photo has a pronounced ghosting artifact — a second, fainter, vertically-offset (~2 lines lower) duplicate of the code is superimposed under the sharp/in-focus text, consistent with camera motion blur while the screen was static (not a scrolling animation, since the sharp layer's line numbers line up with the sharp text throughout). Transcription below uses ONLY the sharp/in-focus layer that aligns with the gutter line numbers; the ghost duplicate is not transcribed. Lines 111-113 again show three consecutive closing braces (see note in IMG_2589) — same apparent brace-count anomaly, consistent with the 3 TS errors in the status bar. Line 136 is blank/cut off at the very bottom edge of the editor viewport (only ghost text visible there, no sharp content — file may continue below, not visible in this photo). Explorer sidebar: same policy/utils folder expanded, policyInformationLoader.ts highlighted/selected. Tab bar: only policyInformationLoader.ts open (1 unsaved-edit dot). Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
105	    if (value.startsWith('{') || value.startsWith('[')) {
106	        try {
107	            const parsed = JSON.parse(value) as unknown;
108	            return toPageBuildXmlDetail(parsed);
109	        } catch {
110	            return undefined;
111	        }
112	    }
113	}
114	
115	    try {
116	        const parser = new DOMParser();
117	        const doc = parser.parseFromString(value, 'text/xml');
118	        if (doc.querySelector('parsererror')) {
119	            return undefined;
120	        }
121	        const xmlItems = Array.from(doc.querySelectorAll('item')).map((item) => ({
122	            '@name': item.getAttribute('name') ?? '',
123	            '@value': item.getAttribute('value') ?? '',
124	        }));
125	
126	
127	        return {
128	            items: {
129	                item: xmlItems,
130	            },
131	        };
132	    } catch {
133	        return undefined;
134	    }
135	}
136	


========== IMG_2593.md ==========
---
photo: IMG_2593.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 135-168
orientation: 180
confidence: medium
notes: Same file, scrolled further down. Heavy motion-blur/double-exposure ghosting throughout (a second, fainter copy of the code offset a few lines down-left is superimposed on the sharp layer, worse than IMG_2592, similar to IMG_2590/2591) — line-number-to-text alignment for this photo was reconstructed via tight zoomed crops isolating the sharp (bold/crisp) layer from the faint ghost layer, cross-checked against an unambiguous anchor (line 153="const storedContext = readContextFromStorage();", 154="const sessionInfo = (getItem('sessionInformation') as Record<string, unknown> | null) ?? {};", clearly legible). New content past IMG_2592: derivation of policyId and rawAction from search params with fallbacks to storedContext/sessionInfo, then undefined; and the start of an "action" derivation involving rawAction.includes('|'), cut off at the bottom edge of the viewport (line 168/169, not fully visible). Exact absolute line numbers for 156-168 carry some residual uncertainty (±1) given the ghosting; code content/order is transcribed faithfully. Explorer sidebar unchanged. Tab bar: only policyInformationLoader.ts open. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
135	}
136	
137	let loaderCallCount = 0;
138	
139	export async function policyInformationLoader({ request }: any) {
140	    try {
141	        loaderCallCount++;
142	
143	        // Reuse query param parsing similar to existing loader behavior
144	        const url = new URL(String(request.url));
145	        const search = url.searchParams;
146	
147	        console.log(`[PolicyInformationLoader] ===== START (Call #${loaderCallCount}) =====`);
148	        console.log('[PolicyInformationLoader] Request details:', {
149	            pathname: url.pathname,
150	            searchParams: Object.fromEntries(search.entries()),
151	        });
152	
153	        const storedContext = readContextFromStorage();
154	        const sessionInfo = (getItem('sessionInformation') as Record<string, unknown> | null) ?? {};
155	        //  const landingToken = search.get('landingToken') || search.get('xmlToken') || undefined;
156	        const policyId =
157	            search.get('policyId') ??
158	            (typeof storedContext?.policyId === 'string' ? storedContext.policyId : null) ??
159	            (typeof sessionInfo.policyId === 'string' ? sessionInfo.policyId : null) ??
160	            undefined;
161	
162	        const rawAction =
163	            search.get('action') ??
164	            (typeof storedContext?.action === 'string' ? storedContext.action : null) ??
165	            (typeof sessionInfo.action === 'string' ? sessionInfo.action : null) ??
166	            undefined;
167	
168	        const action =
169	            typeof rawAction === 'string' && rawAction.includes('|')


========== IMG_2594.md ==========
---
photo: IMG_2594.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139-181
orientation: 180
confidence: high
notes: Same file, scrolled further down. Sharp/clear photo, no motion-blur ghosting. Sticky-scroll line 139 ("export async function policyInformationLoader({ request }: any) {") pinned at top. Line-number alignment verified via tight zoomed crops of the gutter against text start. Shows the full derivation chain for policyId, rawAction/action (with a resolveEffectiveAction(rawAction) call gated on rawAction.includes('|')), nodeKey, and xmlFileName, each falling back through search params -> storedContext -> sessionInfo -> undefined. No blank lines between these consecutive const-block declarations (confirmed lines 161/162 and 175/176 directly adjacent, no gap) — differs from the blank-line-separated style seen earlier in the function (e.g. around lines 151-157). Explorer sidebar unchanged. Tab bar: only policyInformationLoader.ts open. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
139	    export async function policyInformationLoader({ request }: any) {
149	            pathname: url.pathname,
150	            searchParams: Object.fromEntries(search.entries()),
151	        });
152	
153	        //  const landingToken = search.get('landingToken') || search.get('xmlToken') || undefined;
154	        const storedContext = readContextFromStorage();
155	        const sessionInfo = (getItem('sessionInformation') as Record<string, unknown> | null) ?? {};
156	
157	        const policyId =
158	            search.get('policyId') ??
159	            (typeof storedContext?.policyId === 'string' ? storedContext.policyId : null) ??
160	            (typeof sessionInfo.policyId === 'string' ? sessionInfo.policyId : null) ??
161	            undefined;
162	        const rawAction =
163	            search.get('action') ??
164	            (typeof storedContext?.action === 'string' ? storedContext.action : null) ??
165	            (typeof sessionInfo.action === 'string' ? sessionInfo.action : null) ??
166	            undefined;
167	        const action =
168	            typeof rawAction === 'string' && rawAction.includes('|')
169	                ? resolveEffectiveAction(rawAction)
170	                : rawAction;
171	        const nodeKey =
172	            search.get('nodeKey') ??
173	            (typeof storedContext?.nodeKey === 'string' ? storedContext.nodeKey : null) ??
174	            (typeof sessionInfo.nodeKey === 'string' ? sessionInfo.nodeKey : null) ??
175	            undefined;
176	        const xmlFileName =
177	            search.get('xmlFileName') ??
178	            search.get('fileName') ??
179	            (typeof storedContext?.xmlFileName === 'string' ? storedContext.xmlFileName : null) ??
180	            (typeof sessionInfo.xmlFileName === 'string' ? sessionInfo.xmlFileName : null) ??
181	            undefined;


========== IMG_2595.md ==========
---
photo: IMG_2595.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139-194
orientation: 180
confidence: high
notes: Same file, scrolled further down. Sharp/clear photo, no ghosting. Sticky-scroll pinned rows at top: line 139 (function signature) and line 162 ("const rawAction ="). Continues the search-param/storedContext/sessionInfo fallback-derivation pattern for nodeKey, xmlFileName (both 4-condition: search x2 or x1, storedContext, sessionInfo, undefined), then xmlFilePath and tabFilePath which use a SHORTER 3-condition pattern (search, storedContext only — no sessionInfo fallback), then xmlListFilePath begins a multi-line ternary "(typeof storedContext?.xmlListFilePath === 'string' ? storedContext.xmlListFilePath : null) ??" split across lines 192-194, cut off at the bottom of the viewport before its trailing "undefined;". Explorer sidebar unchanged (policy/utils folder, policyInformationLoader.ts selected). Tab bar: only policyInformationLoader.ts open. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
139	    export async function policyInformationLoader({ request }: any) {
162	        const rawAction =
163	            search.get('action') ??
164	            (typeof storedContext?.action === 'string' ? storedContext.action : null) ??
165	            (typeof sessionInfo.action === 'string' ? sessionInfo.action : null) ??
166	            undefined;
167	        const action =
168	            typeof rawAction === 'string' && rawAction.includes('|')
169	                ? resolveEffectiveAction(rawAction)
170	                : rawAction;
171	        const nodeKey =
172	            search.get('nodeKey') ??
173	            (typeof storedContext?.nodeKey === 'string' ? storedContext.nodeKey : null) ??
174	            (typeof sessionInfo.nodeKey === 'string' ? sessionInfo.nodeKey : null) ??
175	            undefined;
176	        const xmlFileName =
177	            search.get('xmlFileName') ??
178	            search.get('fileName') ??
179	            (typeof storedContext?.xmlFileName === 'string' ? storedContext.xmlFileName : null) ??
180	            (typeof sessionInfo.xmlFileName === 'string' ? sessionInfo.xmlFileName : null) ??
181	            undefined;
182	        const xmlFilePath =
183	            search.get('xmlFilePath') ??
184	            (typeof storedContext?.xmlFilePath === 'string' ? storedContext.xmlFilePath : null) ??
185	            undefined;
186	        const tabFilePath =
187	            search.get('tabFilePath') ??
188	            (typeof storedContext?.tabFilePath === 'string' ? storedContext.tabFilePath : null) ??
189	            undefined;
190	        const xmlListFilePath =
191	            search.get('xmlListFilePath') ??
192	            (typeof storedContext?.xmlListFilePath === 'string'
193	                ? storedContext.xmlListFilePath
194	                : null) ??


========== IMG_2596.md ==========
---
photo: IMG_2596.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139-201
orientation: 180
confidence: low
notes: Same file, scrolled slightly further than IMG_2595. This photo has SEVERE motion-blur/double-exposure ghosting — worse than any other in this batch — with two overlapping copies of the gutter numbers and code text interleaved throughout, making exact line-number-to-text alignment unreliable even under heavy zoom/crop. Lines 139-194 duplicate content already verified in IMG_2594/IMG_2595 (sticky rows 139 function signature and 167 "const action ="/169 sticky-adjacent visible; body shows action/nodeKey/xmlFileName/xmlFilePath/tabFilePath/xmlListFilePath blocks matching those photos). NEW content past IMG_2595's cutoff (line 194): after xmlListFilePath's undefined, a new "const xmlDetailParam = search.get('xmlDetail') ?? undefined;" line, then "const xmlDetail =" derived from xmlDetailParam, falling back to storedContext.xmlDetail, then sessionInfo.sessionXml (note: falls back to a differently-named sessionXml property here, not xmlDetail), then undefined. Line numbers for this new content (195-201) are a best-effort sequential estimate continuing from IMG_2595's confirmed endpoint at 194, not independently pixel-verified against the gutter due to the ghosting — treat as approximate. Explorer sidebar unchanged. Tab bar: only policyInformationLoader.ts open. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
139	    export async function policyInformationLoader({ request }: any) {
167	        const action =
168	            typeof rawAction === 'string' && rawAction.includes('|')
169	                ? resolveEffectiveAction(rawAction)
170	                : rawAction;
171	        const nodeKey =
172	            search.get('nodeKey') ??
173	            (typeof storedContext?.nodeKey === 'string' ? storedContext.nodeKey : null) ??
174	            (typeof sessionInfo.nodeKey === 'string' ? sessionInfo.nodeKey : null) ??
175	            undefined;
176	        const xmlFileName =
177	            search.get('xmlFileName') ??
178	            search.get('fileName') ??
179	            (typeof storedContext?.xmlFileName === 'string' ? storedContext.xmlFileName : null) ??
180	            (typeof sessionInfo.xmlFileName === 'string' ? sessionInfo.xmlFileName : null) ??
181	            undefined;
182	        const xmlFilePath =
183	            search.get('xmlFilePath') ??
184	            (typeof storedContext?.xmlFilePath === 'string' ? storedContext.xmlFilePath : null) ??
185	            undefined;
186	        const tabFilePath =
187	            search.get('tabFilePath') ??
188	            (typeof storedContext?.tabFilePath === 'string' ? storedContext.tabFilePath : null) ??
189	            undefined;
190	        const xmlListFilePath =
191	            search.get('xmlListFilePath') ??
192	            (typeof storedContext?.xmlListFilePath === 'string'
193	                ? storedContext.xmlListFilePath
194	                : null) ??
195	            undefined;
196	        const xmlDetailParam = search.get('xmlDetail') ?? undefined;
197	        const xmlDetail =
198	            xmlDetailParam ??
199	            (typeof storedContext?.xmlDetail === 'string' ? storedContext.xmlDetail : null) ??
200	            (typeof sessionInfo.sessionXml === 'string' ? sessionInfo.sessionXml : null) ??
201	            undefined;


========== IMG_2597.md ==========
---
photo: IMG_2597.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139-215
orientation: 180
confidence: medium
notes: Same file, scrolled further down. Moderate motion-blur ghosting (offset ~3 lines down), sharp layer isolated via zoomed crops matched against gutter numbers. Lines 139-200 duplicate content already verified in IMG_2595/2596 (xmlFilePath/tabFilePath/xmlListFilePath/xmlDetailParam/xmlDetail blocks). NEW content past line 200: a "frameParam" derived from search.get('frame') trimmed/uppercased, then comments explaining "Dynamic frame-based routing: use frame response to determine routing / This replaces hardcoded filename checks with generic pattern", an `if (frameParam && frameParam.trim() !== '' && (xmlFileName || xmlFilePath))` block that does a runtime `await import('@utils/asp-route-mapper')` to get `aspToReactRoute`, derives `fileName = xmlFileName || xmlFilePath`, and if fileName is truthy calls `aspToReactRoute(fileName)` to get `reactRoute` — cut off at the bottom of the viewport before its body. CORRECTION (post-hoc, after transcribing the much sharper/higher-confidence IMG_2599 which captures this exact region unghosted): this photo's ghosting caused two errors, now fixed here — (1) absolute line numbers from "if (frameParam...)" onward were misread as one lower than actual (IMG_2599 confirms "if (frameParam...)" is line 207, not 206; renumbered below accordingly, so line 201's blank-vs-not uncertainty and lines 202-206 above are left as originally captured/unverified and may still carry a ±1 error), and (2) there is NO "if (reactRoute) {" line — that was a ghosting misread; line 214 is actually "const reactRoute = aspToReactRoute(fileName);" and the code continues directly with a comment (see IMG_2599 for the verified continuation: "// CRITICAL: Only redirect if we're NOT already on the target route" at line 215). Explorer sidebar unchanged. Tab bar: only policyInformationLoader.ts open. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
139	    export async function policyInformationLoader({ request }: any) {
195	        const xmlDetailParam = search.get('xmlDetail') ?? undefined;
196	        const xmlDetail =
197	            xmlDetailParam ??
198	            (typeof storedContext?.xmlDetail === 'string' ? storedContext.xmlDetail : null) ??
199	            (typeof sessionInfo.sessionXml === 'string' ? sessionInfo.sessionXml : null) ??
200	            undefined;
201	
202	        const frameParam = (search.get('frame') ?? '').trim().toUpperCase();
203	
204	        // Dynamic frame-based routing: use frame response to determine routing
205	        // This replaces hardcoded filename checks with generic pattern
206	⟪?⟫
207	        if (frameParam && frameParam.trim() !== '' && (xmlFileName || xmlFilePath)) {
208	            // Import at top of function for dynamic resolution
209	            const { aspToReactRoute } = await import('@utils/asp-route-mapper');
210	
211	            const fileName = xmlFileName || xmlFilePath;
212	            if (fileName) {
213	                // Dynamically resolve React route from ASP filename
214	                const reactRoute = aspToReactRoute(fileName);
215	⟪see IMG_2599 for verified continuation⟫


========== IMG_2598.md ==========
---
photo: IMG_2598.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139-229
orientation: 180
confidence: medium
notes: Same file, scrolled slightly further than IMG_2597. Severe motion-blur/double-exposure ghosting throughout this photo made independent pixel-level line-number verification unreliable (two overlapping copies of gutter numbers and code text, variable ~2-3 line offset). SUPERSEDED/CORRECTED using IMG_2599, a much sharper near-ghost-free photo of this exact same region taken moments later, which provided an unambiguous ground-truth reading. The content and line numbers below are taken from IMG_2599's verified transcription rather than reconstructed independently from this photo's own pixels; confidence raised to medium (content is solid, but this photo itself could not independently confirm it, hence not "high"). Content: inside the "if (fileName) { ... const reactRoute = aspToReactRoute(fileName);" block, directly followed (no blank line) by a comment pair about only redirecting when not already on the target route (to prevent infinite loops), an "if (url.pathname !== reactRoute) {" guard, "const nextParams = new URLSearchParams(search);", a blank line, a comment about removing the frame param, "nextParams.delete('frame');", a blank line, a comment about removing the combined action to prevent dataStrategy from calling the cycling API again, "const currentAction = nextParams.get('action');", "if (currentAction && currentAction.includes('|')) {", a comment giving an example (RATELEVEL from RATELEVEL|NEXT), "const baseAction = currentAction.split('|')[0];", "nextParams.set('action', baseAction);", and the closing "}". Explorer sidebar unchanged. Tab bar: only policyInformationLoader.ts open. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
139	    export async function policyInformationLoader({ request }: any) {
214	                const reactRoute = aspToReactRoute(fileName);
215	                // CRITICAL: Only redirect if we're NOT already on the target route
216	                // This prevents infinite redirect loops
217	                if (url.pathname !== reactRoute) {
218	                    const nextParams = new URLSearchParams(search);
219	
220	                    // CRITICAL: Remove frame param to prevent re-processing after redirect
221	                    nextParams.delete('frame');
222	
223	                    // CRITICAL: Remove combined action to prevent dataStrategy from calling cycling API again
224	                    const currentAction = nextParams.get('action');
225	                    if (currentAction && currentAction.includes('|')) {
226	                        // Extract base action (e.g., RATELEVEL from RATELEVEL|NEXT)
227	                        const baseAction = currentAction.split('|')[0];
228	                        nextParams.set('action', baseAction);
229	                    }


========== IMG_2599.md ==========
---
photo: IMG_2599.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139-239
orientation: 180
confidence: high
notes: Same file, scrolled further down, apparently to the end of the function/file. Sharp/clear photo, minimal ghosting (a rare well-focused shot in this batch) — line-number alignment verified via multiple tight zoomed crops of the gutter directly against text. Sticky-scroll rows pinned at top: line 139 (function signature) and line 207 ("if (frameParam && frameParam.trim() !== '' && (xmlFileName || xmlFilePath)) {"). This photo resolves ambiguity left by the heavily-ghosted IMG_2597/IMG_2598: confirms there is NO "if (reactRoute) {" line (that was a ghosting misread in IMG_2597) — after "const reactRoute = aspToReactRoute(fileName);" the code goes directly (no blank line) into the "// CRITICAL: Only redirect..." comment pair, then "if (url.pathname !== reactRoute) {". Also establishes that the "if (frameParam...)" sticky line is 207, one higher than IMG_2597's own (ghosting-affected) numbering had it (206) — IMG_2597/IMG_2598 notes have been cross-referenced/corrected against this photo. Full content: the redirect-loop-prevention block (nextParams construction, frame param removal, combined-action splitting via "|" delimiter into baseAction, re-setting the cleaned action), followed by a closing brace, then a `console.log('[PolicyInformationLoader] Frame-based redirect:', {...})` debug call logging frame/fileName/reactRoute/currentPath/originalAction/cleanedAction, closed by "});" at line 238. Line 239 exists (gutter number visible) but its content is fully obscured by the VS Code status bar/UI chrome in this shot ("3 errors, 0 warnings, No Solution" badge overlaps it) — likely the closing "}" of the enclosing "if (currentAction...)" wait — more likely the outer function/if closing brace(s); left unread. This appears to be at or very near the end of the visible/scrollable function body. Explorer sidebar unchanged (policy/utils folder, policyInformationLoader.ts selected). Tab bar: only policyInformationLoader.ts open. Status bar: branch hitanshu/experimental*, 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
139	    export async function policyInformationLoader({ request }: any) {
207	        if (frameParam && frameParam.trim() !== '' && (xmlFileName || xmlFilePath)) {
208	            // Import at top of function for dynamic resolution
209	            const { aspToReactRoute } = await import('@utils/asp-route-mapper');
210	
211	            const fileName = xmlFileName || xmlFilePath;
212	            if (fileName) {
213	                // Dynamically resolve React route from ASP filename
214	                const reactRoute = aspToReactRoute(fileName);
215	                // CRITICAL: Only redirect if we're NOT already on the target route
216	                // This prevents infinite redirect loops
217	                if (url.pathname !== reactRoute) {
218	                    const nextParams = new URLSearchParams(search);
219	
220	                    // CRITICAL: Remove frame param to prevent re-processing after redirect
221	                    nextParams.delete('frame');
222	
223	                    // CRITICAL: Remove combined action to prevent dataStrategy from calling cycling API again
224	                    const currentAction = nextParams.get('action');
225	                    if (currentAction && currentAction.includes('|')) {
226	                        // Extract base action (e.g., RATELEVEL from RATELEVEL|NEXT)
227	                        const baseAction = currentAction.split('|')[0];
228	                        nextParams.set('action', baseAction);
229	                    }
230	
231	                    console.log('[PolicyInformationLoader] Frame-based redirect:', {
232	                        frame: frameParam,
233	                        fileName,
234	                        reactRoute,
235	                        currentPath: url.pathname,
236	                        originalAction: currentAction,
237	                        cleanedAction: nextParams.get('action'),
238	                    });
239	⟪?⟫


========== IMG_2612.md ==========
---
photo: IMG_2612.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139,375-418
orientation: 180
confidence: high
notes: Sticky-scroll shows two pinned header rows at top - line 139 "export async function policyInformationLoader({ request }: any) {" and line 375 "const mapped = (raw || []).map((o: any) => {". Immediately below the sticky rows, one more line of code is visible ("return { label: String(o), value: String(o) };") but its own gutter number is not legible/rendered (likely line 376, obscured - could be a sticky-scroll continuation artifact). Regular numbered content resumes at 387. Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src > features > policy): constants> (tab-definitions.ts, ultimate-cover-tab-definit...), utils> (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoa... [selected/highlighted, tab open], ultimateCoverLoader.ts), FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts; collapsed folders below: prp, root, hooks, lib, pages, providers, services, types. Tab bar shows only "policyInformationLoader.ts" open (1 tab, unsaved dot). Status bar: branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution", TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1. Timestamp 5:14 PM 7/10/2026. Photo required 180-degree rotation (was upside down).
---
139:    export async function policyInformationLoader({ request }: any) {
[sticky] 375:    const mapped = (raw || []).map((o: any) => {
[unlabeled, ~376]:    return { label: String(o), value: String(o) };
387:    });
388:    // Deduplicate by label (case-insensitive). Prefer entries where
389:    // value !== label (coded values) over label-as-value entries.
390:    const labelMap = new Map<string, { label: string; value: string }>();
391:    for (const opt of mapped) {
392:        const key = String(opt.label || opt.value || '')
393:            .trim()
394:            .toUpperCase();
395:        if (!labelMap.has(key)) {
396:            labelMap.set(key, opt);
397:            continue;
398:        }
399:        const existing = labelMap.get(key)!;
400:        const existingIsLabelOnly = existing.value === existing.label;
401:        const newIsLabelOnly = opt.value === opt.label;
402:        // If existing is label-only and new has coded value, prefer new
403:        if (existingIsLabelOnly && !newIsLabelOnly) {
404:            labelMap.set(key, opt);
405:        }
406:        // Otherwise keep existing (first-seen)
407:    }
408:    nf.options = Array.from(labelMap.values());
409:    }
410:    }
411:    }
412:    }
413:    } catch (e) {
414:        // ignore defensive merge errors
415:    }
416:    // Collect controls (buttons / controls with controltype==='button') into controlsByTab
417:    const controlsByTab: Record<string, any[]> = {};
418:    (cursor position, line begins here - see IMG_2614 for content: "for (const c of controlArray) {")


========== IMG_2613.md ==========
---
photo: IMG_2613.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139,397-428
orientation: 180
confidence: low
notes: Heavy motion-blur / double-exposure photo - two overlapping scroll positions of the same editor viewport are superimposed (camera caught the screen mid-scroll-animation), causing every line of text and every gutter number to appear ghosted/doubled with a vertical offset. Same file/tab as IMG_2612 and IMG_2614 (policyInformationLoader.ts, sidebar and status bar identical - branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution", 5:14 PM 7/10/2026). Sticky-scroll pinned row at top: line 139 "export async function policyInformationLoader({ request }: any) {" and a second sticky row numbered 397. The legible/reconstructable code content in this photo is the same code already captured cleanly in IMG_2612 (lines ~397-417, e.g. "const existing = labelMap.get(key)!;" through the "// Collect controls..." comment) overlapping with the start of the control-collection loop also captured cleanly in IMG_2614 (lines ~418-428, "for (const c of controlArray) {" through the OK/CANCEL/NEXT/BACK/SUBMIT includes() check). No new/different code content beyond what IMG_2612 and IMG_2614 already provide at higher fidelity. Given the ghosting, exact line-to-text alignment could not be reliably re-derived independent of those two photos, so this transcript is intentionally left as a description rather than a re-transcription of duplicate content, per instructions to mark illegible/unreliable fragments rather than guess.
---
[Sticky header, legible] 139:    export async function policyInformationLoader({ request }: any) {
[Sticky header, legible] 397:    ⟪ghosted - see IMG_2612 line 397: "continue;" ⟫

⟪Remaining visible content in this photo (lines ~398-428) is a double-exposed ghost overlay of two scroll positions; content matches IMG_2612 lines 398-417 and IMG_2614 lines 418-428 verbatim - see those transcripts for the reliable verbatim text.⟫


========== IMG_2614.md ==========
---
photo: IMG_2614.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139,415-439
orientation: 180
confidence: medium
notes: Partial motion-blur / double-exposure (same scroll-animation artifact as IMG_2613) affects the upper portion of the visible code (roughly lines 415-429, where ghosted duplicate text/numbers overlap); the lower portion (roughly lines 430-439) has some residual ghosting too. Reconstructed the overlapping upper section by cross-referencing the sharper duplicate layer within this same photo plus IMG_2612/IMG_2613. Property order of the pushed object (lines 432-435) was corrected against the sharp, unambiguous read of the same object literal in IMG_2615 (matchcode, text, tab, control) - the ghosting in this photo made an earlier read of that order unreliable. Same file/tab/sidebar/status bar as IMG_2612 and IMG_2613 (branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution", 5:14 PM 7/10/2026). Sticky-scroll pinned row at top: line 139 "export async function policyInformationLoader({ request }: any) {".
---
139:    export async function policyInformationLoader({ request }: any) {
415:    }
416:    // Collect controls (buttons / controls with controltype==='button') into controlsByTab
417:    const controlsByTab: Record<string, any[]> = {};
418:    for (const c of controlArray) {
419:        const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
420:        const tab = (c['@tab'] ?? c.tab ?? 'TABBIL')?.toString();
421:        const controlType = (c['@controltype'] ?? c.controltype ?? '')
422:            ?.toString()
423:            .toLowerCase();
424:        if (
425:            controlType === 'button' ||
426:            (mc &&
427:                mc.toUpperCase &&
428:                ['OK', 'CANCEL', 'NEXT', 'BACK', 'SUBMIT'].includes(mc.toUpperCase()))
429:        ) {
430:            if (!controlsByTab[tab]) controlsByTab[tab] = [];
431:            controlsByTab[tab].push({
432:                matchcode: mc,
433:                text: (c['@text'] ?? c.text ?? mc)?.toString(),
434:                tab,
435:                control: c,
436:            });
437:        }
438:    }
439:    (end of visible viewport / blank line below)


========== IMG_2615.md ==========
---
photo: IMG_2615.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139,419-452
orientation: 180
confidence: high
notes: Sharp/clear photo, no motion blur. Sticky-scroll pinned header at top shows only line 139 "export async function policyInformationLoader({ request }: any) {". Correction vs earlier photos - the pushed control object here (lines 431-436) is clearly matchcode/text/tab/control order (not matchcode/control/text/tab as mis-read from the blurrier IMG_2614); this photo is the authoritative source for that property order. Same file/tab/sidebar/status bar as prior photos in this run (branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution", 5:14 PM 7/10/2026, TypeScript/UTF-8/CRLF/Tab Size 4). Bottom line 452 is cut off at the status bar. Photo required 180-degree rotation (was upside down).
---
139:    export async function policyInformationLoader({ request }: any) {
419:    const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
420:    const tab = (c['@tab'] ?? c.tab ?? 'TABBIL')?.toString();
421:    const controlType = (c['@controltype'] ?? c.controltype ?? '')
422:        ?.toString()
423:        .toLowerCase();
424:    if (
425:        controlType === 'button' ||
426:        (mc &&
427:            mc.toUpperCase &&
428:            ['OK', 'CANCEL', 'NEXT', 'BACK', 'SUBMIT'].includes(mc.toUpperCase()))
429:    ) {
430:        if (!controlsByTab[tab]) controlsByTab[tab] = [];
431:        controlsByTab[tab].push({
432:            matchcode: mc,
433:            text: (c['@text'] ?? c.text ?? mc)?.toString(),
434:            tab,
435:            control: c,
436:        });
437:    }
438:    }
439:    }
440:
441:    // initialValuesByTab
442:    const initialValuesByTab: Record<string, Record<string, unknown>> = {};
443:    for (const [mc, val] of Object.entries(transformed.defaultValues || {})) {
444:        const tab = tabMap.get(mc) ?? 'TABBIL';
445:        if (!initialValuesByTab[tab]) initialValuesByTab[tab] = {};
446:        initialValuesByTab[tab][mc] = val;
447:    }
448:
449:    // tabsOrder: derive from utpOrder if present, else keys of normalizedByTab
450:    const tabsOrder: string[] = [];
451:    const seen = new Set<string>();
452:    for (const mc of transformed.utpOrder || transformed.fieldOrder || ⟪cut off at bottom edge / status bar⟫


========== IMG_2616.md ==========
---
photo: IMG_2616.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139,428-460
orientation: 180
confidence: medium
notes: Motion-blur / double-exposure affects the upper portion (roughly lines 428-439, overlapping ghost of the controlsByTab.push block already captured cleanly in IMG_2614/IMG_2615); lines 440-460 are sharp and clearly legible. Sticky-scroll pinned header at top shows line 139 "export async function policyInformationLoader({ request }: any) {". Same file/tab/sidebar/status bar as prior photos (branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution", 5:14 PM 7/10/2026). Sidebar dots (unsaved-change indicators) visible next to several folders (features, policy, utils-adjacent items). Photo required 180-degree rotation (was upside down).
---
139:    export async function policyInformationLoader({ request }: any) {
[ghosted, ~428-439]:    ⟪overlapping double-exposure of the same controlsByTab.push({...}); closing braces block already transcribed verbatim in IMG_2614 (lines 428-439) and IMG_2615 (lines 428-439) - not re-transcribed here to avoid guessing over the blur⟫
440:
441:    // initialValuesByTab
442:    const initialValuesByTab: Record<string, Record<string, unknown>> = {};
443:    for (const [mc, val] of Object.entries(transformed.defaultValues || {})) {
444:        const tab = tabMap.get(mc) ?? 'TABBIL';
445:        if (!initialValuesByTab[tab]) initialValuesByTab[tab] = {};
446:        initialValuesByTab[tab][mc] = val;
447:    }
448:    // tabsOrder: derive from utpOrder if present, else keys of normalizedByTab
449:    const tabsOrder: string[] = [];
450:    const seen = new Set<string>();
451:    for (const mc of transformed.utpOrder || transformed.fieldOrder || []) {
452:        const tab = tabMap.get(mc) ?? 'TABBIL';
453:        if (!seen.has(tab)) {
454:            seen.add(tab);
455:            tabsOrder.push(tab);
456:        }
457:    }
458:    for (const k of Object.keys(normalizedByTab)) {
459:        if (!seen.has(k)) {
460:            ⟪cut off at bottom edge / status bar - see IMG_2617 for continuation⟫


========== IMG_2617.md ==========
---
photo: IMG_2617.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139,444-476
orientation: 180
confidence: high
notes: Sharp/clear photo, no motion blur. Sticky-scroll pinned header at top shows line 139 "export async function policyInformationLoader({ request }: any) {". Same file/tab/sidebar/status bar as prior photos in this run (branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution", 5:14 PM 7/10/2026, TypeScript/UTF-8/CRLF/Tab Size 4). Sidebar unsaved-change dots visible next to several folders. Bottom line 476 cut off by status bar - only "...b," visible.
---
139:    export async function policyInformationLoader({ request }: any) {
444:    if (!initialValuesByTab[tab]) initialValuesByTab[tab] = {};
445:    initialValuesByTab[tab][mc] = val;
446:
447:    }
448:    // tabsOrder: derive from utpOrder if present, else keys of normalizedByTab
449:    const tabsOrder: string[] = [];
450:    const seen = new Set<string>();
451:    for (const mc of transformed.utpOrder || transformed.fieldOrder || []) {
452:        const tab = tabMap.get(mc) ?? 'TABBIL';
453:        if (!seen.has(tab)) {
454:            seen.add(tab);
455:            tabsOrder.push(tab);
456:        }
457:    }
458:    for (const k of Object.keys(normalizedByTab)) {
459:        if (!seen.has(k)) {
460:            seen.add(k);
461:            tabsOrder.push(k);
462:        }
463:    }
464:    }
465:
466:    const formKey = JSON.stringify({
467:        tabs: tabsOrder,
468:        fields: normalized.map((f) => f.matchcode || ''),
469:        t: Date.now(),
470:    });
471:
472:    const browserCommands = parseBrowserCommandsFromPageBuild(pageBuild || {});
473:
474:    // Map transformed buttons to tabs (use tabMap if available)
475:    const pageButtons = (transformed.buttons || []).map((b) => ({
476:        ...b, ⟪cut off at bottom edge / status bar⟫


========== IMG_2618.md ==========
---
photo: IMG_2618.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139,457-488
orientation: 180
confidence: medium
notes: Motion-blur / double-exposure affects the whole photo to varying degrees - a faint ghost layer (offset by roughly -2 lines) trails behind a sharper foreground layer throughout. Sticky-scroll pinned header at top shows line 139 "export async function policyInformationLoader({ request }: any) {". Line numbers below were reconciled against the unambiguous, ghost-free IMG_2619 and IMG_2620 (both agree with each other on the numbering of the "return data({...})" object, e.g. normalizedByTab=486, tabsOrder=489), since an initial read of this photo's own gutter digits in the lower region was internally inconsistent by about 2 lines due to the ghosting. Same file/tab/sidebar/status bar as prior photos (branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution", 5:15 PM 7/10/2026). Photo required 180-degree rotation (was upside down).
---
139:    export async function policyInformationLoader({ request }: any) {
457:    }
458:    }
459:    for (const k of Object.keys(normalizedByTab)) {
460:        if (!seen.has(k)) {
461:            seen.add(k);
462:            tabsOrder.push(k);
463:        }
464:    }
465:
466:    const formKey = JSON.stringify({
467:        tabs: tabsOrder,
468:        fields: normalized.map((f) => f.matchcode || ''),
469:        t: Date.now(),
470:    });
471:
472:    const browserCommands = parseBrowserCommandsFromPageBuild(pageBuild || {});
473:
474:    // Map transformed buttons to tabs (use tabMap if available)
475:    const pageButtons = (transformed.buttons || []).map((b) => ({
476:        ...b,
477:        tab: tabMap.get((b.matchcode || '') as string) ?? 'TABBIL',
478:    }));
479:
480:    return data({
481:        pageBuild,
482:        xmlFileName,
483:        xmlFilePath,
484:        tabFilePath,
485:        xmlListFilePath,
486:        normalizedByTab,
487:        controlsByTab,
488:        initialValuesByTab, ⟪cut off at bottom edge / status bar⟫


========== IMG_2619.md ==========
---
photo: IMG_2619.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139,470-502
orientation: 180
confidence: high
notes: Sharp/clear photo, no motion blur. Sticky-scroll pinned header at top shows line 139 "export async function policyInformationLoader({ request }: any) {". Shows the end of the try block (return data({...}) with the full success-path field list) and the start of the catch block's fallback return data({...}). Same file/tab/sidebar/status bar as prior photos (branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution", 5:15 PM 7/10/2026). Photo required 180-degree rotation (was upside down).
---
139:    export async function policyInformationLoader({ request }: any) {
470:    });
471:    const browserCommands = parseBrowserCommandsFromPageBuild(pageBuild || {});
472:
473:    // Map transformed buttons to tabs (use tabMap if available)
474:    const pageButtons = (transformed.buttons || []).map((b) => ({
475:        ...b,
476:        tab: tabMap.get((b.matchcode || '') as string) ?? 'TABBIL',
477:    }));
478:
479:
480:    return data({
481:        pageBuild,
482:        xmlFileName,
483:        xmlFilePath,
484:        tabFilePath,
485:        xmlListFilePath,
486:        normalizedByTab,
487:        controlsByTab,
488:        initialValuesByTab,
489:        tabsOrder,
490:        formKey,
491:        browserCommands,
492:        pageButtons,
493:        meta: { loaded: true },
494:    });
495:    } catch (err) {
496:        console.error('[policyInformationLoader] error', err);
497:        return data({
498:            pageBuild: null,
499:            xmlFileName: undefined,
500:            xmlFilePath: undefined,
501:            tabFilePath: undefined,
502:            xmlListFilePath: undefined,


========== IMG_2620.md ==========
---
photo: IMG_2620.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 139,486-513
orientation: 180
confidence: high
notes: Sharp/clear photo, no motion blur. Sticky-scroll pinned header at top shows line 139 "export async function policyInformationLoader({ request }: any) {". Shows the tail end of the success-path return object, the full catch-block fallback return object, and the closing braces of the function (line 512) - this is the end of the policyInformationLoader function body. Line 513 is blank (end of visible viewport). Same file/tab/sidebar/status bar as prior photos (branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution", 5:15 PM 7/10/2026). Photo required 180-degree rotation (was upside down).
---
139:    export async function policyInformationLoader({ request }: any) {
486:        normalizedByTab,
487:        controlsByTab,
488:        initialValuesByTab,
489:        tabsOrder,
490:        formKey,
491:        browserCommands,
492:        pageButtons,
493:        meta: { loaded: true },
494:    });
495:    } catch (err) {
496:        console.error('[policyInformationLoader] error', err);
497:        return data({
498:            pageBuild: null,
499:            xmlFileName: undefined,
500:            xmlFilePath: undefined,
501:            tabFilePath: undefined,
502:            xmlListFilePath: undefined,
503:            normalizedByTab: {},
504:            controlsByTab: {},
505:            initialValuesByTab: {},
506:            tabsOrder: [],
507:            formKey: '',
508:            browserCommands: [],
509:            meta: { error: String(err) },
510:        });
511:    }
512:    }
513:


========== IMG_2600.md ==========
---
photo: IMG_2600.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 218-249
orientation: 180
confidence: high
notes: Sticky-scroll header at top shows enclosing function signature (line 139). Explorer sidebar expanded showing aqs-web-ui/src tree: features/policy/constants (tab-definitions.ts, ultimate-cover-tab-definit...[truncated]), features/policy/utils (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoa...[current file, highlighted, unsaved dot "1"], ultimateCoverLoader.ts), features/policy (FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts), and collapsed folders prp, root, hooks, lib, pages, providers, services, types. Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026. Line 224 comment text is cut off at right edge of screen ("...cycling API agai" — likely "again"). Overlaps with IMG_2601 which shows the same region plus more below.
---
139  export async function policyInformationLoader({ request }: any) {
     ⋮ (sticky scroll, enclosing scope)

218      if (url.pathname !== reactRoute) {
219          const nextParams = new URLSearchParams(search);
220
221          // CRITICAL: Remove frame param to prevent re-processing after redirect
222          nextParams.delete('frame');
223
224          // CRITICAL: Remove combined action to prevent dataStrategy from calling cycling API agai⟪?⟫
225          const currentAction = nextParams.get('action');
226          if (currentAction && currentAction.includes('|')) {
227              // Extract base action (e.g., RATELEVEL from RATELEVEL|NEXT)
228              const baseAction = currentAction.split('|')[0];
229              nextParams.set('action', baseAction);
230          }
231
232          console.log('[PolicyInformationLoader] Frame-based redirect:', {
233              frame: frameParam,
234              fileName,
235              reactRoute,
236              currentPath: url.pathname,
237              originalAction: currentAction,
238              cleanedAction: nextParams.get('action'),
239          });
240
241          return redirect(`${reactRoute}?${nextParams.toString()}`);
242      } else {
243          console.log('[PolicyInformationLoader] Already on target route, skipping redirect', {
244              currentPath: url.pathname,
245              targetRoute: reactRoute,
246              willRemoveFrameParam: true,
247          });
248      }
249  }


========== IMG_2601.md ==========
---
photo: IMG_2601.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 223-255
orientation: 180
confidence: high
notes: Sticky scroll header at top shows line 139 "export async function policyInformationLoader({ request }: any) {". Tab bar shows single tab "policyInformationLoader.ts" (unsaved indicator "1"). Breadcrumb: aqs-web-ui > src > features > policy > utils > policyInformationLoader.ts > .... Explorer sidebar (features/policy expanded): constants > tab-definitions.ts, ultimate-cover-tab-definit...ts; utils > action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts (selected/highlighted), ultimateCoverLoader.ts; also FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts directly under policy. Other top-level folders visible: prp, root, hooks, lib, pages, providers, services, types. Status bar: branch "hitanshu/experimental*" (dirty), "3 errors, 0 warnings" (red circle 3, triangle 0), "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026. Line 254 partially cut off at bottom of frame (only top of text visible: "tabFile: normalizeXmlPath(tabFilePath)"), line 255 not legible (cut off).
---
139: export async function policyInformationLoader({ request }: any) {
   ⋮ (sticky scroll gap)
223:     // CRITICAL: Remove combined action to prevent dataStrategy from calling cycling API agai⟪?⟫
224:     const currentAction = nextParams.get('action');
225:     if (currentAction && currentAction.includes('|')) {
226:       // Extract base action (e.g., RATELEVEL from RATELEVEL|NEXT)
227:       const baseAction = currentAction.split('|')[0];
228:       nextParams.set('action', baseAction);
229:     }
230:
231:     console.log('[PolicyInformationLoader] Frame-based redirect:', {
232:       frame: frameParam,
233:       fileName,
234:       reactRoute,
235:       currentPath: url.pathname,
236:       originalAction: currentAction,
237:       cleanedAction: nextParams.get('action'),
238:     });
239:
240:     return redirect(`${reactRoute}?${nextParams.toString()}`);
241:   } else {
242:     console.log('[PolicyInformationLoader] Already on target route, skipping redirect', {
243:       currentPath: url.pathname,
244:       targetRoute: reactRoute,
245:       willRemoveFrameParam: true,
246:     });
247:   }
248: }
249: }
250:
251: const pageBuildXmlDetail = toPageBuildXmlDetail(xmlDetail);
252: const pageBuildOptions = {
253:   pageCode: normalizePageCodeFromXmlPath(xmlFilePath),
254:   tabFile: normalizeXmlPath(tabFilePath)⟪?⟫
255: ⟪?⟫


========== IMG_2602.md ==========
---
photo: IMG_2602.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 236-268
orientation: 180
confidence: low
notes: SEVERE double-exposure/ghosting artifact - every line of code and every gutter line-number appears duplicated, offset by roughly 2 screen-rows, making this look like two overlapping scroll positions of the same file blended together (likely camera/hand shake or a mid-scroll capture). Same file/tab as IMG_2601 (policyInformationLoader.ts), same sticky-scroll header "139: export async function policyInformationLoader({ request }: any) {". Lines 236-255 in this photo show the SAME content already verified cleanly in IMG_2601's transcript (lines 223-255) - reused that verified text here rather than re-guessing from the blurred duplicate. Lines 256-268 are new (beyond IMG_2601's visible range) and were reconstructed by isolating the higher-contrast/sharper of the two overlapping text layers in cropped zooms; still uncertain in places. Bottom of frame (line 268 and below) is cut off by the "No Solution" / errors status bar. Status bar: branch "hitanshu/experimental*" (dirty), "3 errors, 0 warnings", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026 (same as IMG_2601, suggesting these photos were taken back-to-back of the same static screen). Explorer sidebar identical to IMG_2601 (policy/utils folder expanded, policyInformationLoader.ts highlighted).
---
139: export async function policyInformationLoader({ request }: any) {
   ⋮ (sticky scroll gap)
236:     originalAction: currentAction,
237:     cleanedAction: nextParams.get('action'),
238:   });
239:
240:   return redirect(`${reactRoute}?${nextParams.toString()}`);
241: } else {
242:   console.log('[PolicyInformationLoader] Already on target route, skipping redirect', {
243:     currentPath: url.pathname,
244:     targetRoute: reactRoute,
245:     willRemoveFrameParam: true,
246:   });
247: }
248: }
249: }
250:
251: const pageBuildXmlDetail = toPageBuildXmlDetail(xmlDetail);
252: const pageBuildOptions = {
253:   pageCode: normalizePageCodeFromXmlPath(xmlFilePath),
254:   tabFile: normalizeXmlPath(tabFilePath),
255:   xmlListFile: normalizeXmlPath(xmlListFilePath),
256: };
257: ⟪?⟫ (likely blank)
258: // Resolve pageBuild payload: try sessionStorage token, inline xmlDetail, or localStorage fallback
259: let pageBuild: any = null;
260: ⟪?⟫ (likely blank)
261: if (!pageBuild) {
262:   try {
263:     const requestSession: SessionInfo = {
264:       compLoc: typeof sessionInfo.compLoc === 'string' ? sessionInfo.compLoc : '',
265:       userId: typeof sessionInfo.userId === 'string' ? sessionInfo.userId : '',
266:       diagnosticMode: ⟪?⟫
267:       typeof sessionInfo.diagnosticMode === 'string' ⟪?⟫
268: ⟪?⟫ (cut off by status bar)


========== IMG_2603.md ==========
---
photo: IMG_2603.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 253-286
orientation: 180
confidence: high
notes: Sticky scroll shows two header lines at top - line 139 "export async function policyInformationLoader({ request }: any) {" and line 253 "const pageBuildOptions = {" (enclosing scope). Line numbering here is shifted ~1-2 lines later than the equivalent content seen in IMG_2601/IMG_2602 (e.g. "xmlListFile: normalizeXmlPath(xmlListFilePath)," is line 255 in IMG_2601 but line 256 here) - the file was likely being actively edited between photos, so each photo's line numbers are taken as its own ground truth. Explorer sidebar identical to IMG_2601/2602 (policy/utils folder expanded, policyInformationLoader.ts highlighted, 1 unsaved tab). Status bar: branch "hitanshu/experimental*" (dirty), "3 errors, 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026. Line 286 cut off at bottom edge of frame (only "requestSession," partially visible, continuation not captured).
---
139: export async function policyInformationLoader({ request }: any) {
253: const pageBuildOptions = {
   ⋮ (sticky scroll gap)
256:     xmlListFile: normalizeXmlPath(xmlListFilePath),
257:   };
258:
259:   // Resolve pageBuild payload: try sessionStorage token, inline xmlDetail, or localStorage fallback
260:   let pageBuild: any = null;
261:
262:   if (!pageBuild) {
263:     try {
264:       const requestSession: SessionInfo = {
265:         compLoc: typeof sessionInfo.compLoc === 'string' ? sessionInfo.compLoc : '',
266:         userId: typeof sessionInfo.userId === 'string' ? sessionInfo.userId : '',
267:         diagnosticMode:
268:           typeof sessionInfo.diagnosticMode === 'string'
269:             ? sessionInfo.diagnosticMode
270:             : '0',
271:         policyId: policyId ?? '',
272:         nodeKey: nodeKey ?? '',
273:         action: action ?? '',
274:       };
275:
276:       console.log('[PolicyInformationLoader] ===== CALLING fetchPageBuild =====', {
277:         session: requestSession,
278:         xmlFileName,
279:         action,
280:         policyId,
281:         pageBuildOptions,
282:         hasXmlDetail: !!pageBuildXmlDetail,
283:       });
284:
285:       const result = await fetchPageBuild(
286:         requestSession,⟪?⟫


========== IMG_2604.md ==========
---
photo: IMG_2604.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 264-302
orientation: 180
confidence: high
notes: Sticky scroll shows two header lines - line 139 "export async function policyInformationLoader({ request }: any) {" and line 264 "const requestSession: SessionInfo = {" (enclosing scope). Line 271 is partially obscured by the sticky-scroll divider shadow but legible as "policyId: policyId ?? '',", matching numbering established in IMG_2603. Continues directly from IMG_2603 (which ended mid-line at 286). Explorer sidebar identical to prior photos in this sequence (policy/utils folder expanded, policyInformationLoader.ts highlighted). Status bar: branch "hitanshu/experimental*" (dirty), "3 errors, 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026.
---
139: export async function policyInformationLoader({ request }: any) {
264: const requestSession: SessionInfo = {
   ⋮ (sticky scroll gap)
271:       policyId: policyId ?? '',
272:       nodeKey: nodeKey ?? '',
273:       action: action ?? '',
274:     };
275:
276:     console.log('[PolicyInformationLoader] ===== CALLING fetchPageBuild =====', {
277:       session: requestSession,
278:       xmlFileName,
279:       action,
280:       policyId,
281:       pageBuildOptions,
282:       hasXmlDetail: !!pageBuildXmlDetail,
283:     });
284:
285:     const result = await fetchPageBuild(
286:       requestSession,
287:       pageBuildXmlDetail,
288:       xmlFileName,
289:       action ?? 'ADD',
290:       policyId,
291:       pageBuildOptions,
292:     );
293:
294:     console.log('[PolicyInformationLoader] fetchPageBuild result:', {
295:       hasStatus: !!result?.status,
296:       hasData: !!result?.data,
297:     });
298:
299:     if (result?.status && result.data) pageBuild = result.data;
300:   } catch (e) {
301:     console.error('[PolicyInformationLoader] fetchPageBuild error:', e);
302:   }


========== IMG_2605.md ==========
---
photo: IMG_2605.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 284-315
orientation: 180
confidence: high
notes: Sticky scroll shows only line 139 "export async function policyInformationLoader({ request }: any) {" followed by a "..." collapsed-context marker (no second enclosing-scope line shown here, unlike IMG_2603/2604). Lines 284-302 overlap/confirm IMG_2604's transcription exactly. New content beyond IMG_2604: lines 303-315, a second fallback block reading from getItem('landingPageBuild'). Explorer sidebar identical to prior photos (policy/utils folder expanded, policyInformationLoader.ts highlighted). Status bar: branch "hitanshu/experimental*" (dirty), "3 errors, 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026. Line 315 is blank/cut off at very bottom edge, no content visible.
---
139: export async function policyInformationLoader({ request }: any) {
   ⋮ (sticky scroll: "...")
284:     const result = await fetchPageBuild(
285:       requestSession,
286:       pageBuildXmlDetail,
287:       xmlFileName,
288:       action ?? 'ADD',
289:       policyId,
290:       pageBuildOptions,
291:     );
292:
293:     console.log('[PolicyInformationLoader] fetchPageBuild result:', {
294:       hasStatus: !!result?.status,
295:       hasData: !!result?.data,
296:     });
297:
298:     if (result?.status && result.data) pageBuild = result.data;
299:   } catch (e) {
300:     console.error('[PolicyInformationLoader] fetchPageBuild error:', e);
301:   }
302: }
303:
304: if (!pageBuild) {
305:   try {
306:     const fallback = getItem<unknown>('landingPageBuild');
307:     if (fallback) {
308:       pageBuild = fallback;
309:     }
310:   } catch (e) {
311:     // ignore
312:   }
313: }
314: }
315: ⟪?⟫ (blank / not visible)


========== IMG_2606.md ==========
---
photo: IMG_2606.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 302-334
orientation: 180
confidence: high
notes: Sticky scroll shows only line 139 "export async function policyInformationLoader({ request }: any) {". Line numbering here is shifted +1 relative to IMG_2605 for the same content (e.g. the closing brace pair before "if (!pageBuild)" is lines 301-302 in IMG_2605 but 302-303 here) - file was being actively edited/reformatted between photos; each photo's own gutter numbers are used as ground truth. Explorer sidebar identical to prior photos (policy/utils folder expanded, policyInformationLoader.ts highlighted). Status bar: branch "hitanshu/experimental*" (dirty), "3 errors, 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026. Line 334 cut off at very bottom edge by taskbar/status bar (only fragment "controlArray.forEach((c: any) => {" visible, partially obscured).
---
139: export async function policyInformationLoader({ request }: any) {
   ⋮ (sticky scroll gap)
302:   }
303: }
304:
305: if (!pageBuild) {
306:   try {
307:     const fallback = getItem<unknown>('landingPageBuild');
308:     if (fallback) {
309:       pageBuild = fallback;
310:     }
311:   } catch (e) {
312:     // ignore
313:   }
314: }
315:
316: // Transform + normalize
317: const transformed = transformPageBuildResponse(pageBuild);
318: const normalized = normalizeServiceConfig(transformed.serviceFields as any);
319:
320: // Build tab map from raw controls so we know which tab each matchcode belongs to
321: const rawControls = pageBuild?.Page?.controls?.control ?? [];
322: const controlArray = ensureArray(rawControls as any);
323: const tabMap = new Map<string, string>();
324: // Build a static lookup from our authoritative static mapping (if present)
325: const staticTabLookup = new Map<string, string>();
326: try {
327:   for (const f of PolicyInformationFields || []) {
328:     if (f && f.matchcode) staticTabLookup.set(f.matchcode, f.tab);
329:   }
330: } catch (e) {
331:   // noop
332: }
333: controlArray.forEach((c: any) => {⟪?⟫
334: ⟪?⟫ (cut off by taskbar)


========== IMG_2607.md ==========
---
photo: IMG_2607.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 315-347
orientation: 180
confidence: high
notes: Sticky scroll shows only line 139 "export async function policyInformationLoader({ request }: any) {". Overlaps and confirms tail of IMG_2606 (lines 315-332 match exactly, this photo's numbering is 1 higher than IMG_2606's for the same statements - e.g. "// Transform + normalize" is 316 in IMG_2606 vs 315 here - consistent with the file being actively edited between shots). New content beyond IMG_2606: lines 333-347 (controlArray.forEach block building matchcode->tab map, then normalizedWithTab). Explorer sidebar identical to prior photos. Status bar: branch "hitanshu/experimental*" (dirty), "3 errors, 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026. Line 347 cut off at very bottom edge (not legible).
---
139: export async function policyInformationLoader({ request }: any) {
   ⋮ (sticky scroll gap)
315:   // Transform + normalize
316:   const transformed = transformPageBuildResponse(pageBuild);
317:   const normalized = normalizeServiceConfig(transformed.serviceFields as any);
318:
319:   // Build tab map from raw controls so we know which tab each matchcode belongs to
320:   const rawControls = pageBuild?.Page?.controls?.control ?? [];
321:   const controlArray = ensureArray(rawControls as any);
322:   const tabMap = new Map<string, string>();
323:   // Build a static lookup from our authoritative static mapping (if present)
324:   const staticTabLookup = new Map<string, string>();
325:   try {
326:     for (const f of PolicyInformationFields || []) {
327:       if (f && f.matchcode) staticTabLookup.set(f.matchcode, f.tab);
328:     }
329:   } catch (e) {
330:     // noop
331:   }
332:
333:   controlArray.forEach((c: any) => {
334:     const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
335:     const t = (c['@tab'] ?? c.tab ?? '')?.toString();
336:     // Prefer explicit tab from PageBuild; if missing, fall back to our static mapping;
337:     // otherwise default to TABBIL to preserve previous behavior.
338:     const resolved = t || staticTabLookup.get(mc) || 'TABBIL';
339:     if (mc) tabMap.set(mc, resolved);
340:
341:   });
342:
343:   const normalizedWithTab = normalized.map((f) => ({
344:     ...f,
345:     tab: tabMap.get(f.matchcode || '') ?? 'TABBIL',
346:   }));
347: ⟪?⟫ (blank / cut off by bottom of frame)


========== IMG_2608.md ==========
---
photo: IMG_2608.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 328-360
orientation: 180
confidence: medium
notes: Mild double-exposure/ghosting artifact throughout (a fainter, ~1-line-shifted echo of the text is visible behind the sharp/bold layer, similar to but less severe than IMG_2602) - transcribed from the sharp/bold layer, cross-checked against the overlapping range already confirmed in IMG_2607 (lines 328-341 match IMG_2607's 328-341 content exactly once line numbers there are reconciled). Sticky scroll shows line 139 "export async function policyInformationLoader({ request }: any) {" with a faint ghost artifact of "if (f && f.matchcode) staticTabLookup.set(f.matchcode, f.tab);" bleeding through at the very top edge. New content beyond IMG_2607: lines 348-360 (partition normalizedWithTab by tab, start of a "Defensive fallback" try block building an optionMap). Explorer sidebar identical to prior photos. Status bar: branch "hitanshu/experimental*" (dirty), "3 errors, 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026.
---
139: export async function policyInformationLoader({ request }: any) {
   ⋮ (sticky scroll gap)
328:     }
329:   } catch (e) {
330:     // noop
331:   }
332:
333:   controlArray.forEach((c: any) => {
334:     const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
335:     const t = (c['@tab'] ?? c.tab ?? '')?.toString();
336:     // Prefer explicit tab from PageBuild; if missing, fall back to our static mapping;
337:     // otherwise default to TABBIL to preserve previous behavior.
338:     const resolved = t || staticTabLookup.get(mc) || 'TABBIL';
339:     if (mc) tabMap.set(mc, resolved);
340:
341:   });
342:
343:   const normalizedWithTab = normalized.map((f) => ({
344:     ...f,
345:     tab: tabMap.get(f.matchcode || '') ?? 'TABBIL',
346:   }));
347:
348:   // Partition by tab
349:   const normalizedByTab: Record<string, any[]> = {};
350:   for (const f of normalizedWithTab) {
351:     const tab = f.tab || 'TABBIL';
352:     if (!normalizedByTab[tab]) normalizedByTab[tab] = [];
353:     normalizedByTab[tab].push(f);
354:   }
355:
356:   // Defensive fallback: if normalizeServiceConfig produced fields without options,
357:   // but the original transformed.serviceFields contained listitems/options, copy
358:   // those options into the normalized fields so selects/combos render correctly.
359:   try {
360:     const optionMap = new Map<string, any[]>();


========== IMG_2609.md ==========
---
photo: IMG_2609.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 342-373
orientation: 180
confidence: low
notes: Severe double-exposure/ghosting artifact throughout (similar to IMG_2602/IMG_2608 but worse - overlapping echo text at roughly 1-2 row offsets makes many rows show two blended statements). Lines 342-360 were cross-checked against IMG_2608's clean/high-confidence transcription of the same range (line numbers match exactly - no edits happened between these two shots for this portion, confirmed via multiple tight crops of the "// but the original / // those options / try { / const optionMap" anchor sequence at 357-360). Lines 361-373 are NEW content beyond IMG_2608 and were reconstructed from the ghosted image by identifying the sharper/bolder of each overlapping text pair and cross-validating with code logic/variable-use order (mc defined before use, rawOpts before use, matching brace nesting); exact line-number-to-statement attribution in 361-373 carries real uncertainty (+/-1 line in places) even though the content/sequence itself is reasonably legible. Sticky scroll shows line 139 "export async function policyInformationLoader({ request }: any) {" with a faint ghost of "controlArray.forEach((c: any) => {" bleeding through at the top. Explorer sidebar identical to prior photos. Status bar: branch "hitanshu/experimental*" (dirty), "3 errors, 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026.
---
139: export async function policyInformationLoader({ request }: any) {
   ⋮ (sticky scroll gap)
342:
343:   const normalizedWithTab = normalized.map((f) => ({
344:     ...f,
345:     tab: tabMap.get(f.matchcode || '') ?? 'TABBIL',
346:   }));
347:
348:   // Partition by tab
349:   const normalizedByTab: Record<string, any[]> = {};
350:   for (const f of normalizedWithTab) {
351:     const tab = f.tab || 'TABBIL';
352:     if (!normalizedByTab[tab]) normalizedByTab[tab] = [];
353:     normalizedByTab[tab].push(f);
354:   }
355:
356:   // Defensive fallback: if normalizeServiceConfig produced fields without options,
357:   // but the original transformed.serviceFields contained listitems/options, copy
358:   // those options into the normalized fields so selects/combos render correctly.
359:   try {
360:     const optionMap = new Map<string, any[]>();
361:     for (const sf of transformed.serviceFields || []) {⟪?⟫
362:       const mc = (sf.matchcode || sf.id || '')?.toString();⟪?⟫
363:       if (!mc) continue;⟪?⟫
364:       const rawOpts = sf.options || sf.listitems || sf.items || sf.datasource || sf.list;⟪?⟫
365:       if (Array.isArray(rawOpts) && rawOpts.length) optionMap.set(mc, rawOpts);⟪?⟫
366:     }⟪?⟫
367:     for (const arr of Object.values(normalizedByTab)) {⟪?⟫
368:       for (const nf of arr) {⟪?⟫
369:         if (!nf) continue;⟪?⟫
370:         const mc = String(nf.matchcode || '');⟪?⟫
371:         if (!mc) continue;⟪?⟫
372:         if ((!nf.options || nf.options.length === 0) && optionMap.has(mc)) {⟪?⟫
373:           const raw = optionMap.get(mc) || [];⟪?⟫


========== IMG_2610.md ==========
---
photo: IMG_2610.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 356-386
orientation: 180
confidence: low
notes: EXTREMELY severe double-exposure/ghosting artifact - much worse than IMG_2602/2608/2609, with what appears to be two full-opacity overlapping scroll positions offset by several rows, making most of the frame very hard to disentangle character-by-character. Lines 356-373 substantially duplicate content already captured (with its own uncertainty) in IMG_2609 - not re-transcribed here in detail. Lines ~373-386 are reconstructed best-effort: an option-normalization helper turning raw list items into {label, value} pairs, followed by the start of a label-dedup Map. Reconstruction leans on recognizing a coherent/sensible code pattern (fallback chain o.label ?? o.text ?? String(o.value ?? o.id ?? o.key ?? o['@value'] ?? '') reused for both the label-fallback and the value line, which explains why that fragment visually appears twice) rather than confident pixel-level reading; treat this transcript as indicative, not verbatim-certain. Sticky scroll shows line 139 "export async function policyInformationLoader({ request }: any) {" with heavy ghost text bleeding into the header area. Explorer sidebar identical to prior photos. Status bar: branch "hitanshu/experimental*" (dirty), "3 errors, 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026.
---
139: export async function policyInformationLoader({ request }: any) {
   ⋮ (sticky scroll gap; lines 356-373 heavily overlap IMG_2609's 356-373 - see that transcript)
373:   // normalize to { label, value }⟪?⟫
374:   const mapped = (raw || []).map((o: any) => {⟪?⟫
375:     if (!o) return { label: '', value: '' };⟪?⟫
376:     if (typeof o === 'object') {⟪?⟫
377:       return {⟪?⟫
378:         label: (o.label as string) ?? (o.text as string) ?? String(o.value ?? o.id ?? o.key ?? o['@value'] ?? ''),⟪?⟫
379:         value: String(o.value ?? o.id ?? o.key ?? o['@value'] ?? ''),⟪?⟫
380:       };⟪?⟫
381:     }⟪?⟫
382:     return { label: String(o), value: String(o) };⟪?⟫
383:   });⟪?⟫
384:   // Deduplicate by label (case-insensitive); prefer entries where value === label (coded values) over label-as-value entries.⟪?⟫
385:   const labelMap = new Map<string, { label: string; value: string }>();⟪?⟫
386: ⟪?⟫ (cut off / illegible)


========== IMG_2611.md ==========
---
photo: IMG_2611.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/policyInformationLoader.ts
lines: 373-405
orientation: 180
confidence: high
notes: Clean, sharp photo (no ghosting, unlike IMG_2608-2610). Sticky scroll shows two header lines - line 139 "export async function policyInformationLoader({ request }: any) {" and line 373 "const raw = optionMap.get(mc) || [];" (enclosing scope). This photo resolves with much higher confidence the option-normalization and label-dedup logic that IMG_2610 could only guess at through heavy ghosting - the actual label fallback chain is (o.label as string) ?? (o.text as string) ?? (o['#text'] as string) ?? String(o.value ?? o.id ?? ''), which differs from IMG_2610's lower-confidence guess. Explorer sidebar identical to prior photos (policy/utils folder expanded, policyInformationLoader.ts highlighted). Status bar: branch "hitanshu/experimental*" (dirty), "3 errors, 0 warnings", "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:14 PM 7/10/2026. Line 405 cut off at very bottom edge (only "labelMap.set(key, opt);" partially visible, continuation not captured).
---
139: export async function policyInformationLoader({ request }: any) {
373: const raw = optionMap.get(mc) || [];
   ⋮ (sticky scroll gap)
374:   // normalize to { label, value }
375:   const mapped = (raw || []).map((o: any) => {
376:     if (!o) return { label: String(o), value: String(o) };
377:     if (typeof o === 'object') {
378:       return {
379:         label:
380:           (o.label as string) ??
381:           (o.text as string) ??
382:           (o['#text'] as string) ??
383:           String(o.value ?? o.id ?? ''),
384:         value: String(o.value ?? o.id ?? o.key ?? o['@value'] ?? ''),
385:       };
386:     }
387:     return { label: String(o), value: String(o) };
388:   });
389:   // Deduplicate by label (case-insensitive). Prefer entries where
390:   // value !== label (coded values) over label-as-value entries.
391:   const labelMap = new Map<string, { label: string; value: string }>();
392:   for (const opt of mapped) {
393:     const key = String(opt.label || opt.value || '')
394:       .trim()
395:       .toUpperCase();
396:     if (!labelMap.has(key)) {
397:       labelMap.set(key, opt);
398:       continue;
399:     }
400:     const existing = labelMap.get(key)!;
401:     const existingIsLabelOnly = existing.value === existing.label;
402:     const newIsLabelOnly = opt.value === opt.label;
403:     // If existing is label-only and new has coded value, prefer new
404:     if (existingIsLabelOnly && !newIsLabelOnly) {
405:       labelMap.set(key, opt);⟪?⟫
