# BUNDLE for src/features/policy/utils/lobActionMenuLoader.ts
# 4 photo fragment(s), ascending start-line order.


========== IMG_2576.md ==========
---
photo: IMG_2576.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/lobActionMenuLoader.ts
lines: 1-34
orientation: 180
confidence: high
notes: Tab shows "lobActionMenuLoader.ts 2" (second/pinned instance). Breadcrumb aqs-web-ui > src > features > policy > utils > lobActionMenuLoader.ts > ... . Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src > features > policy) shows: constants/tab-definitions.ts, constants/ultimate-cover-tab-definit..., utils/ (expanded) action.ts, lobActionMenuLoader.ts (highlighted, has unsaved-changes dot "2"), middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts, then FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts; below policy: prp, root, hooks, lib, pages, providers, services, types (siblings under src, collapsed except policy). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 4 errors / 0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8. Bottom-right clock 5:14 PM 7/10/2026. Line 34 cut off at photo edge in first read; confirmed via crop as "return undefined;".
---
1  import { data } from 'react-router';
2  
3  import { navigationContext } from '@/context';
4  import { fetchPageBuild, type PageBuildResponse } from '@services/page-build';
5  import { fetchLobActionMenu } from '@services/lob-action-menu';
6  import { getItem } from '@utils/local-storage';
7  import { readContextFromStorage } from '@utils/session-sync';
8  
9  import type { LoaderFunctionArgs } from 'react-router';
10 import type { SessionInfo } from '@features/auth/services/auth';
11 
12 interface PageBuildXmlItem {
13     '@name': string;
14     '@value': string;
15 }
16 
17 interface PageBuildXmlDetail {
18     items: {
19         item: PageBuildXmlItem[];
20     };
21 }
22 
23 function getRawActionFromQueryString(queryString: string | undefined): string | undefined {
24     if (!queryString) {
25         return undefined;
26     }
27 
28     const queryStart = queryString.indexOf('?');
29     const queryPart = queryStart >= 0 ? queryString.slice(queryStart + 1) : queryString;
30     const params = new URLSearchParams(queryPart);
31 
32     const action = params.get('Action') ?? params.get('action');
33     if (!action || action.trim() === '') {
34         return undefined;


========== IMG_2577.md ==========
---
photo: IMG_2577.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/lobActionMenuLoader.ts
lines: 12-47
orientation: 180
confidence: high
notes: Same tab "lobActionMenuLoader.ts 2" as IMG_2576, scrolled down slightly. Photo has a visible ghost/double-exposure artifact (faint duplicate of text offset a few px down-right behind the sharp foreground text) — transcription is from the sharp foreground layer only. Explorer sidebar same as IMG_2576 (policy/utils expanded, lobActionMenuLoader.ts highlighted). Source-control badge shows "27" pending changes. Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 4 errors / 0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, 5:14 PM 7/10/2026. Confirmed line 47 via crop: "const items = record.items?.item;" (line continues beyond visible crop, matches pattern with IMG_2576's line 19 PageBuildXmlItem[] typing but cut off here).
---
12 interface PageBuildXmlItem {
   (lines 13-14 not visible in this photo, occluded by ghost artifact)
15 }
16 
17 interface PageBuildXmlDetail {
18     items: {
19         item: PageBuildXmlItem[];
20     };
21 }
22 
23 function getRawActionFromQueryString(queryString: string | undefined): string | undefined {
24     if (!queryString) {
25         return undefined;
26     }
27 
28     const queryStart = queryString.indexOf('?');
29     const queryPart = queryStart >= 0 ? queryString.slice(queryStart + 1) : queryString;
30     const params = new URLSearchParams(queryPart);
31 
32     const action = params.get('Action') ?? params.get('action');
33     if (!action || action.trim() === '') {
34         return undefined;
35     }
36 
37     return action;
38 }
39 
40 function toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {
41     if (!source) {
42         return undefined;
43     }
44 
45     if (typeof source === 'object' && source !== null) {
46         const record = source as { items?: { item?: unknown } };
47         const items = record.items?.item;


========== IMG_2578.md ==========
---
photo: IMG_2578.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/lobActionMenuLoader.ts
lines: 40-60
orientation: 180
confidence: medium
notes: Strong double-exposure/motion-blur artifact — the photo appears to overlay two scroll positions of the same editor (offset by ~17 lines), likely camera captured mid-scroll. The upper/fainter layer repeats lines ~23-39 (getRawActionFromQueryString, already fully transcribed in IMG_2577) overlaid with the sharper/lower layer showing lines 40-60 of toPageBuildXmlDetail. Transcription below is the sharp foreground layer (lines 40-60), cross-checked via 2x-upscaled crops of two regions. Lines 40-47 duplicate IMG_2577 content (already high-confidence there); lines 48-60 are new. Explorer sidebar same as prior two photos (policy/utils expanded, lobActionMenuLoader.ts highlighted, source-control badge "27"). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 4 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, 5:14 PM 7/10/2026.
---
40 function toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {
41     if (!source) {
42         return undefined;
43     }
44 
45     if (typeof source === 'object' && source !== null) {
46         const record = source as { items?: { item?: unknown } };
47         const items = record.items?.item;
48         if (Array.isArray(items)) {
49             return {
50                 items: {
51                     item: items
52                         .filter((item) => typeof item === 'object' && item !== null)
53                         .map((item) => {
54                             const row = item as Record<string, unknown>;
55                             return {
56                                 '@name': String(row['@name'] ?? ''),
57                                 '@value': String(row['@value'] ?? ''),
58                             };
59                         }),
60                 },


========== IMG_2579.md ==========
---
photo: IMG_2579.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/lobActionMenuLoader.ts
lines: 40-78
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 40 "function toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {" pinned at top; editor body starts at line 47, so lines 41-46 are not visible in this photo (already captured in IMG_2577/2578: lines 41-47 = if(!source){return undefined;} + if(typeof source==='object' && source!==null){ const record = source as {...}; const items = record.items?.item;). This photo is sharp/clear (no double exposure) and confirms/extends IMG_2578's lines 48-60 plus new lines 61-78. Explorer sidebar unchanged (policy/utils expanded, lobActionMenuLoader.ts highlighted, source-control badge "27"). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 4 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, 5:14 PM 7/10/2026. Line 78 "return undefined;" is the last full line visible before photo cuts off.
---
40 function toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {
   ... (sticky scroll header; lines 41-46 not visible, see IMG_2577/2578)
47     const items = record.items?.item;
48     if (Array.isArray(items)) {
49         return {
50             items: {
51                 item: items
52                     .filter((item) => typeof item === 'object' && item !== null)
53                     .map((item) => {
54                         const row = item as Record<string, unknown>;
55                         return {
56                             '@name': String(row['@name'] ?? ''),
57                             '@value': String(row['@value'] ?? ''),
58                         };
59                     }),
60             },
61         };
62     }
63 }
64 
65 if (typeof source !== 'string') {
66     return undefined;
67 }
68 
69 const value = source.trim();
70 if (!value) {
71     return undefined;
72 }
73 
74 try {
75     const parser = new DOMParser();
76     const doc = parser.parseFromString(value, 'text/xml');
77     if (doc.querySelector('parsererror')) {
78         return undefined;
