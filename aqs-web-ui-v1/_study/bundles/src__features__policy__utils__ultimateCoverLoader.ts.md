# BUNDLE for src/features/policy/utils/ultimateCoverLoader.ts
# 21 photo fragment(s), ascending start-line order.


========== IMG_2621.md ==========
---
photo: IMG_2621.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 1-34
orientation: 180
confidence: high
notes: Sharp/clear photo, no motion blur, no sticky-scroll header (top of file, cursor at Ln 1 Col 1). New file compared to prior photos in this run - tab switched from policyInformationLoader.ts to ultimateCoverLoader.ts (highlighted/selected in Explorer sidebar under aqs-web-ui > src > features > policy > utils). Explorer sidebar fully visible: constants> (tab-definitions.ts, ultimate-cover-tab-definit...), utils> (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts [selected]), FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts; collapsed folders below: prp, root, hooks, lib, pages, providers, services, types. Status bar: branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution", TypeScript, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 5:15 PM 7/10/2026. Photo required 180-degree rotation (was upside down).
---
1:  import { data } from 'react-router';
2:  import { fetchPageBuild } from '@services/page-build';
3:  import { transformPageBuildResponse } from '@utils/transform-pagebuild-response';
4:  import { normalizeServiceConfig } from '@utils/normalize-service-config';
5:  import { parseBrowserCommandsFromPageBuild } from '@utils/apply-server-commands';
6:  import { getItem } from '@utils/local-storage';
7:
8:  import type { SessionInfo } from '@features/auth/services/auth';
9:
10: function ensureArray<T>(v: T | T[] | undefined): T[] {
11:     if (!v) return [];
12:     return Array.isArray(v) ? v : [v];
13: }
14:
15: function normalizeXmlPath(value: string | undefined): string | undefined {
16:     if (!value || !value.trim()) {
17:         return undefined;
18:     }
19:
20:     return value
21:         .trim()
22:         .replace(/^\.\.\//, '')
23:         .replace(/^\//, '');
24: }
25:
26: function normalizePageCodeFromXmlPath(value: string | undefined): string | undefined {
27:     const normalized = normalizeXmlPath(value);
28:     if (!normalized) {
29:         return undefined;
30:     }
31:
32:     return normalized.replace(/\.xml$/i, '');
33: }
34: ⟪next line cut off at bottom edge⟫


========== IMG_2622.md ==========
---
photo: IMG_2622.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 15-49
orientation: 180
confidence: high
notes: Sharp/clear photo, no motion blur, no sticky-scroll header visible (cursor at Ln 1 Col 1, top of scroll region still near file start). Same file/tab/sidebar/status bar as IMG_2621 (branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution", 5:15 PM 7/10/2026). Shows the STATIC_REQUEST constant definition beginning - a hardcoded/mocked request object for the "Ultimate Cover" BOP Policy page, with an inline comment block explaining why action must be 'VIEW' and not 'ADD'/'RATELEVEL'. Bottom line 49 cut off mid-line at status bar (only "'F'," fragment of the next sessionItems property visible). Photo required 180-degree rotation (was upside down).
---
15: function normalizeXmlPath(value: string | undefined): string | undefined {
18:     }
19:
20:     return value
21:         .trim()
22:         .replace(/^\.\.\//, '')
23:         .replace(/^\//, '');
24: }
25:
26: function normalizePageCodeFromXmlPath(value: string | undefined): string | undefined {
27:     const normalized = normalizeXmlPath(value);
28:     if (!normalized) {
29:         return undefined;
30:     }
31:
32:     return normalized.replace(/\.xml$/i, '');
33: }
34:
35: // Static request for Ultimate Cover - BOP Policy Ultimate Cover page
36: // NOTE: action must NOT be 'ADD' or 'RATELEVEL' as fetchPageBuild overrides pageCode for those actions
37: // Use 'VIEW' to preserve the custom pageCode in the API call
38: const STATIC_REQUEST = {
39:     session: {
40:         compLoc: 'PIPH',
41:         userId: 'SMALUSAR',
42:         policyID: '489905',
43:         nodeKey: 'BOP|POL|0|UCP|0|',
44:         action: 'VIEW', // Changed from 'ADD' - prevents fetchPageBuild from overriding pageCode
45:         diagnosticMode: '0',
46:         sessionItems: {
47:             'auto approve': 'T',
48:             discard: 'F',
49:             issue: 'F',


========== IMG_2624.md ==========
---
photo: IMG_2624.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 38-80
orientation: 180
confidence: high
notes: Sticky-scroll shows two header rows (line 39 "session: {" and line 46 "sessionItems: {") stacked above a divider. The line immediately below the divider (line number partially cut off by the sticky-scroll bar, inferred as line 51 from sequence since line 52 follows) reads "compact: 'Firm',". Explorer sidebar shows aqs-web-ui/src tree expanded: features/policy/constants (tab-definitions.ts, ultimate-cover-tab-definit...[truncated]), features/policy/utils (action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts [current file, highlighted, unsaved dot "1"]), features/policy (FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts), collapsed folders prp, root, hooks, lib, pages, providers, services, types. Tab bar: only "ultimateCoverLoader.ts" open (unsaved, dot indicator "1"). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026. Line numbers below 76 were verified via a wide (gutter-to-EOL) high-res crop to correct for photo skew that otherwise misaligns numbers to text by one row.
---
38  const STATIC_REQUEST = {
39      session: {
    ⋮ (sticky scroll, enclosing scope)
46          sessionItems: {
    ⋮ (sticky scroll continuation)
51              compact: 'Firm',
52              policystatus: 'In Process',
53              sectransactionid: '1',
54              rlvlocked: 'False',
55              inquiry: 'F',
56              historytype: 'FFL',
57              transactionid: '1',
58          },
59      },
60      pageCode: 'bop/xml/Pol_PIPHBOP_Ucp_20250201',
61      TabFile: '0',
62      XMLListFile: 'bop/xml/Pol_PIPHBOP_Ucp_20250201.xml',
63  };
64
65  export async function ultimateCoverLoader({ request }: any) {
66      try {
67          const url = new URL(String(request.url));
68          const search = url.searchParams;
69          console.log(
70              '[]',
71              'ultimateCoverLoader search params:',
72              Object.fromEntries(search.entries()),
73          );
74          // Use STATIC_REQUEST values - ignore session storage and context
75          // Override ONLY if explicitly provided in URL query params
76          const policyId = search.get('policyId') ?? STATIC_REQUEST.session.policyID;
77          const action = search.get('action') ?? STATIC_REQUEST.session.action;
78          const nodeKey = search.get('nodeKey') ?? STATIC_REQUEST.session.nodeKey;
79          const xmlFileName =
80              search.get('xmlFileName') ?? search.get('fileName') ?? 'Pol_PIPHBOP_Ucp_20250201';


========== IMG_2623.md ==========
---
photo: IMG_2623.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 41-68
orientation: 180
confidence: medium
notes: Motion-blur / double-exposure throughout (faint ghost layer trailing a sharper foreground layer, same artifact seen in several policyInformationLoader.ts photos earlier in this run). Reconciled against the unambiguous property list in IMG_2622 (STATIC_REQUEST.session.sessionItems) to resolve exact line numbers. No sticky-scroll header visible (still near top of file, cursor Ln 1 Col 1). Same file/tab/sidebar/status bar as IMG_2621/IMG_2622 (branch "hitanshu/experimental*", 3 errors/0 warnings, "No Solution", 5:15 PM 7/10/2026). Shows the rest of STATIC_REQUEST.session.sessionItems, the pageCode/TabFile/XMLListFile properties closing out STATIC_REQUEST, and the start of the exported ultimateCoverLoader function (URL/searchParams parsing). Photo required 180-degree rotation (was upside down).
---
41:     userId: 'SMALUSAR',
42:     policyID: '489905',
43:     nodeKey: 'BOP|POL|0|UCP|0|',
44:     action: 'VIEW', // Changed from 'ADD' - prevents fetchPageBuild from overriding pageCode
45:     diagnosticMode: '0',
46:     sessionItems: {
47:         'auto approve': 'T',
48:         discard: 'F',
49:         issue: 'F',
50:         submit: 'T',
51:         comploc: 'PIPH',
52:         policystatus: 'In Process',
53:         sectransactionid: '1',
54:         rlvlocked: 'False',
55:         inquiry: 'F',
56:         historytype: 'FFL',
57:         transactionid: '1',
58:     },
59:     },
60:     pageCode: 'bop/xml/Pol_PIPHBOP_Ucp_20250201',
61:     TabFile: '0',
62:     XMLListFile: 'bop/xml/Pol_PIPHBOP_Ucp_20250201',
63: };
64:
65: export async function ultimateCoverLoader({ request }: any) {
66:     try {
67:         const url = new URL(String(request.url));
68:         const search = url.searchParams;


========== IMG_2625.md ==========
---
photo: IMG_2625.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 64-96
orientation: 180
confidence: high
notes: Continuation of ultimateCoverLoader.ts (same file/session as IMG_2624, scrolled down slightly; same unsaved-dot "1" tab). Explorer sidebar same as IMG_2624 (ultimateCoverLoader.ts highlighted). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026. Mouse text-cursor (I-beam) visible overlapping "STATIC_REQUEST.TabFile" on line 81 — not literal text. Line numbers cross-checked with multiple wide/narrow gutter-aligned crops to correct for photo skew (camera-angle skew visually drifts code text down-and-right relative to its true gutter number, causing a naive single-pass read to misassign lines by one — see IMG_2624 note).
---
64
65  export async function ultimateCoverLoader({ request }: any) {
66      try {
67          const url = new URL(String(request.url));
68          const search = url.searchParams;
69          console.log(
70              '[]',
71              'ultimateCoverLoader search params:',
72              Object.fromEntries(search.entries()),
73          );
74          // Use STATIC_REQUEST values - ignore session storage and context
75          // Override ONLY if explicitly provided in URL query params
76          const policyId = search.get('policyId') ?? STATIC_REQUEST.session.policyID;
77          const action = search.get('action') ?? STATIC_REQUEST.session.action;
78          const nodeKey = search.get('nodeKey') ?? STATIC_REQUEST.session.nodeKey;
79          const xmlFileName =
80              search.get('xmlFileName') ?? search.get('fileName') ?? 'Pol_PIPHBOP_Ucp_20250201';
81          const xmlFilePath = search.get('xmlFilePath') ?? STATIC_REQUEST.pageCode;
82          const tabFilePath = search.get('tabFilePath') ?? STATIC_REQUEST.TabFile;
83          const xmlListFilePath = search.get('xmlListFilePath') ?? STATIC_REQUEST.XMLListFile;
84
85          const pageBuildOptions = {
86              pageCode: normalizePageCodeFromXmlPath(xmlFilePath),
87              tabFile: normalizeXmlPath(tabFilePath),
88              xmlListFile: normalizeXmlPath(xmlListFilePath),
89          };
90
91          let pageBuild: any = null;
92
93          if (!pageBuild) {
94              try {
95                  // Use static session configuration
96                  const requestSession: SessionInfo = {


========== IMG_2626.md ==========
---
photo: IMG_2626.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 65-109
orientation: 180
confidence: high
notes: Continuation of ultimateCoverLoader.ts (same file/session as IMG_2624/2625, scrolled further down; same unsaved-dot "1" tab). Sticky-scroll shows one header row (line 65, enclosing function signature). Below the sticky-scroll divider there is a blurred/ghosted overlap of two lines (line 77 "const action = search.get('action') ?? STATIC_REQUEST.session.action;" bleeding into line 78) — likely camera motion blur mid-scroll-render; content is otherwise identical to and cross-verified against IMG_2625's lines 77-78, so line 78 is transcribed with high confidence. Explorer sidebar same tree as IMG_2624/2625, ultimateCoverLoader.ts highlighted; visible unsaved-dot markers next to prp, root(?), lib, pages(?), types folders (exact folder-to-dot mapping uncertain from photo). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026.
---
65  export async function ultimateCoverLoader({ request }: any) {
    ⋮ (sticky scroll, enclosing scope)
    ⋮ (blurred overlap of line 77 content, see notes)
78          const nodeKey = search.get('nodeKey') ?? STATIC_REQUEST.session.nodeKey;
79          const xmlFileName =
80              search.get('xmlFileName') ?? search.get('fileName') ?? 'Pol_PIPHBOP_Ucp_20250201';
81          const xmlFilePath = search.get('xmlFilePath') ?? STATIC_REQUEST.pageCode;
82          const tabFilePath = search.get('tabFilePath') ?? STATIC_REQUEST.TabFile;
83          const xmlListFilePath = search.get('xmlListFilePath') ?? STATIC_REQUEST.XMLListFile;
84
85          const pageBuildOptions = {
86              pageCode: normalizePageCodeFromXmlPath(xmlFilePath),
87              tabFile: normalizeXmlPath(tabFilePath),
88              xmlListFile: normalizeXmlPath(xmlListFilePath),
89          };
90
91          let pageBuild: any = null;
92
93          if (!pageBuild) {
94              try {
95                  // Use static session configuration
96                  const requestSession: SessionInfo = {
97                      compLoc: STATIC_REQUEST.session.compLoc,
98                      userId: STATIC_REQUEST.session.userId,
99                      diagnosticMode: STATIC_REQUEST.session.diagnosticMode,
100                     policyId: policyId,
101                     nodeKey: nodeKey,
102                     action: action,
103                 };
104
105                 const result = await fetchPageBuild(
106                     requestSession,
107                     STATIC_REQUEST.session.sessionItems as any,
108                     xmlFileName,
109                     action,
    ⟪line 110 onward cut off below status bar, not legible in this photo — see IMG_2627 for continuation⟫


========== IMG_2627.md ==========
---
photo: IMG_2627.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 91-122
orientation: 180
confidence: medium
notes: Continuation of ultimateCoverLoader.ts (same file/session as IMG_2624-2626, scrolled further down; unsaved-dot "1" tab). Photo shows a pronounced screen-tear/double-exposure artifact — a fainter duplicate of the same code (offset ~4 lines) is visible bled-through underneath the sharp/bright foreground text for most of the frame (VS Code mid-scroll-render when the photo was taken). Transcription uses only the sharp/bright text layer, cross-checked against gutter line numbers and against the already-verified overlapping content in IMG_2626 (lines 91-109 match exactly). Line 91 number itself is obscured by the sticky-scroll divider bar (same pattern as IMG_2624/2626) but is confidently inferred from sequence/overlap with IMG_2626. Sticky-scroll shows one header row (line 65). Explorer sidebar same tree as prior photos, ultimateCoverLoader.ts highlighted (unsaved dot "1"). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026. Line 123 present in gutter but its text is cut off at the very bottom edge of the screen, not legible.
---
65  export async function ultimateCoverLoader({ request }: any) {
    ⋮ (sticky scroll, enclosing scope)
91          let pageBuild: any = null;
92
93          if (!pageBuild) {
94              try {
95                  // Use static session configuration
96                  const requestSession: SessionInfo = {
97                      compLoc: STATIC_REQUEST.session.compLoc,
98                      userId: STATIC_REQUEST.session.userId,
99                      diagnosticMode: STATIC_REQUEST.session.diagnosticMode,
100                     policyId: policyId,
101                     nodeKey: nodeKey,
102                     action: action,
103                 };
104
105                 const result = await fetchPageBuild(
106                     requestSession,
107                     STATIC_REQUEST.session.sessionItems as any,
108                     xmlFileName,
109                     action,
110                     policyId,
111                     pageBuildOptions,
112                 );
113                 if (result?.status && result.data) pageBuild = result.data;
114             } catch (e) {
115                 console.error('[ultimateCoverLoader] fetchPageBuild error:', e);
116             }
117         }
118
119         if (!pageBuild) {
120             try {
121                 const fallback = getItem<unknown>('ultimateCoverPageBuild');
122                 if (fallback) {


========== IMG_2628.md ==========
---
photo: IMG_2628.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 120-141
orientation: 180
confidence: medium
notes: Continuation of ultimateCoverLoader.ts (same file/session as IMG_2624-2627; unsaved-dot "1" tab). Photo has a strong screen-tear/double-exposure artifact across almost the entire frame (worse than IMG_2627) — a fainter duplicate of the same code, offset a few lines, is bled-through under the sharp/bright foreground text. Sticky-scroll shows line 65 header; the region from roughly line 106 to 119 (fetchPageBuild call args + catch block, i.e. the same content already transcribed in IMG_2627's lines 105-119) is too torn/doubled in this photo to independently re-derive exact line numbers with confidence, so it is NOT re-transcribed here — see IMG_2627 for that content. Note the gutter numbering in this photo for the fallback-lookup block ("if (!pageBuild) { try { const fallback = ..." ) reads one higher (120/121/122...) than the equivalent block read in IMG_2627 (119/120/121...), suggesting one line was inserted somewhere in the intervening (torn, unverified) 106-119 region between the two photo captures (file has unsaved changes throughout this active-editing session). Lines 120-141 below are cross-checked with multiple wide gutter-to-EOL crops and are high-confidence despite the surrounding tearing. Explorer sidebar same tree as prior photos, ultimateCoverLoader.ts highlighted (unsaved dot "1"). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026. Line 141 "try {" is the last visible line, its body cut off at the bottom of the screen.
---
65  export async function ultimateCoverLoader({ request }: any) {
    ⋮ (sticky scroll, enclosing scope)
    ⋮ (lines ~106-119 present but illegible due to tearing — see IMG_2627 for this content)
120         if (!pageBuild) {
121             try {
122                 const fallback = getItem<unknown>('ultimateCoverPageBuild');
123                 if (fallback) {
124                     pageBuild = fallback;
125                 }
126             } catch (e) {
127                 console.error('[ultimateCoverLoader] fallback error:', e);
128             }
129         }
130         // Transform + normalize
131         const transformed = transformPageBuildResponse(pageBuild);
132         const normalized = normalizeServiceConfig(transformed.serviceFields as any);
133
134         // Build tab map from raw controls
135         const rawControls = pageBuild?.Page?.controls?.control ?? [];
136         const controlArray = ensureArray(rawControls as any);
137         const tabMap = new Map<string, string>();
138
139         // Build static lookup from our UltimateCoverFields (if present)
140         const staticTabLookup = new Map<string, string>();
141         try {


========== IMG_2629.md ==========
---
photo: IMG_2629.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 126-157
orientation: 180
confidence: high
notes: Continuation of ultimateCoverLoader.ts (same file/session as IMG_2624-2628; unsaved-dot "1" tab). Photo has the same strong screen-tear/double-exposure artifact as IMG_2627/2628 (fainter duplicate content bled through, offset a few lines, under the sharp/bright foreground text). Lines 126-141 cross-verified as an exact match against IMG_2628's already-established numbering. Lines 142-157 verified via wide gutter-to-EOL crops and cross-confirmed against IMG_2630 (which shows this same 152-157 region clearly, without tear ambiguity): 152-154 is a single catch block ("} catch (e) { console.error(...) }"), 155 is blank, 156 "controlArray.forEach((c: any) => {" begins the next statement. Line 157 is the last visible line in this photo, cut off at the bottom of the screen/status bar (its content, "const mc = ...", is captured in IMG_2630). Explorer sidebar same tree as prior photos, ultimateCoverLoader.ts highlighted (unsaved dot "1"). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026.
---
65  export async function ultimateCoverLoader({ request }: any) {
    ⋮ (sticky scroll, enclosing scope)
126             } catch (e) {
127                 console.error('[ultimateCoverLoader] fallback error:', e);
128             }
129         }
130         // Transform + normalize
131         const transformed = transformPageBuildResponse(pageBuild);
132         const normalized = normalizeServiceConfig(transformed.serviceFields as any);
133
134         // Build tab map from raw controls
135         const rawControls = pageBuild?.Page?.controls?.control ?? [];
136         const controlArray = ensureArray(rawControls as any);
137         const tabMap = new Map<string, string>();
138
139         // Build static lookup from our UltimateCoverFields (if present)
140         const staticTabLookup = new Map<string, string>();
141         try {
142             // Import fields dynamically to avoid circular dependencies
143             const { ultimateCoverPolicyTabFields, ultimateCoverDetailsTabFields } =
144                 await import('@features/policy/ultimate-cover-fields');
145
146             for (const f of ultimateCoverPolicyTabFields || []) {
147                 if (f && f.matchcode) staticTabLookup.set(f.matchcode, 'TABPOLICY');
148             }
149             for (const f of ultimateCoverDetailsTabFields || []) {
150                 if (f && f.matchcode) staticTabLookup.set(f.matchcode, 'TABDET');
151             }
152         } catch (e) {
153             console.error('[ultimateCoverLoader] Error loading field definitions:', e);
154         }
155
156         controlArray.forEach((c: any) => {
157 ⟪cut off at bottom of screen — see IMG_2630 for continuation⟫


========== IMG_2630.md ==========
---
photo: IMG_2630.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 139-169
orientation: 180
confidence: high
notes: Continuation of ultimateCoverLoader.ts (same file/session as IMG_2624-2629; unsaved-dot "1" tab). Has a mild screen-tear/ghost duplicate bleeding through under the bright/sharp foreground text (less severe than IMG_2627-2629) but line numbers and code are clearly legible and were verified with wide gutter-to-EOL crops. This photo resolves an ambiguity from IMG_2629: lines 152-154 are a single "} catch (e) { console.error(...) }" block, line 155 is blank, and line 156 "controlArray.forEach((c: any) => {" follows directly — confirmed here with a clean (non-ambiguous) view of the same lines. Line 169 "// Partition by tab" corrected after cross-checking against the much cleaner IMG_2631 (which shows the identical lines 167-169 with no tearing) — this photo's own tear made 169 ambiguous. Explorer sidebar same tree as prior photos, ultimateCoverLoader.ts highlighted (unsaved dot "1"). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026.
---
65  export async function ultimateCoverLoader({ request }: any) {
    ⋮ (sticky scroll, enclosing scope)
139         // Build static lookup from our UltimateCoverFields (if present)
140         const staticTabLookup = new Map<string, string>();
141         try {
142             // Import fields dynamically to avoid circular dependencies
143             const { ultimateCoverPolicyTabFields, ultimateCoverDetailsTabFields } =
144                 await import('@features/policy/ultimate-cover-fields');
145
146             for (const f of ultimateCoverPolicyTabFields || []) {
147                 if (f && f.matchcode) staticTabLookup.set(f.matchcode, 'TABPOLICY');
148             }
149             for (const f of ultimateCoverDetailsTabFields || []) {
150                 if (f && f.matchcode) staticTabLookup.set(f.matchcode, 'TABDET');
151             }
152         } catch (e) {
153             console.error('[ultimateCoverLoader] Error loading field definitions:', e);
154         }
155
156         controlArray.forEach((c: any) => {
157             const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
158             const t = (c['@tab'] ?? c.tab ?? '')?.toString();
159             // Prefer explicit tab from PageBuild; otherwise fall back to our static mapping
160             const resolved = t || staticTabLookup.get(mc) || 'TABPOLICY';
161             if (mc) tabMap.set(mc, resolved);
162         });
163
164         const normalizedWithTab = normalized.map((f) => ({
165             ...f,
166             tab: tabMap.get(f.matchcode || '') ?? 'TABPOLICY',
167         }));
168
169         // Partition by tab


========== IMG_2631.md ==========
---
photo: IMG_2631.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 149-181
orientation: 180
confidence: high
notes: Continuation of ultimateCoverLoader.ts (same file/session as IMG_2624-2630; unsaved-dot "1" tab). Clean photo, no visible screen tearing, all line numbers directly legible. This photo's clean view of lines 149-169 was used to correct an ambiguity in IMG_2630 (see that file's notes) — confirms line 169 is "// Partition by tab" (not 170). Explorer sidebar same tree as prior photos, ultimateCoverLoader.ts highlighted (unsaved dot "1"). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026. Line 181 is the last visible line, cut off at the bottom of the screen/status bar.
---
65  export async function ultimateCoverLoader({ request }: any) {
    ⋮ (sticky scroll, enclosing scope)
150             if (f && f.matchcode) staticTabLookup.set(f.matchcode, 'TABDET');
151         }
152         } catch (e) {
153             console.error('[ultimateCoverLoader] Error loading field definitions:', e);
154         }
155
156         controlArray.forEach((c: any) => {
157             const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
158             const t = (c['@tab'] ?? c.tab ?? '')?.toString();
159             // Prefer explicit tab from PageBuild; otherwise fall back to our static mapping
160             const resolved = t || staticTabLookup.get(mc) || 'TABPOLICY';
161             if (mc) tabMap.set(mc, resolved);
162         });
163
164         const normalizedWithTab = normalized.map((f) => ({
165             ...f,
166             tab: tabMap.get(f.matchcode || '') ?? 'TABPOLICY',
167         }));
168
169         // Partition by tab
170         const normalizedByTab: Record<string, any[]> = {};
171         for (const f of normalizedWithTab) {
172             const tab = f.tab || 'TABPOLICY';
173             if (!normalizedByTab[tab]) normalizedByTab[tab] = [];
174             normalizedByTab[tab].push(f);
175         }
176
177         // Merge options from transformed fields if not present in normalized
178         try {
179             const optionMap = new Map<string, any[]>();
180             for (const sf of transformed.serviceFields || []) {
181 ⟪cut off at bottom of screen⟫


========== IMG_2632.md ==========
---
photo: IMG_2632.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 163-194
orientation: 180
confidence: high
notes: Continuation of ultimateCoverLoader.ts (same file/session as IMG_2624-2631; unsaved-dot "1" tab). Mild screen-tear/ghost duplicate bleeding through under the bright/sharp foreground text, but line numbers and code clearly legible via wide gutter-to-EOL crops. Lines 163-181 overlap and match IMG_2630/2631 exactly (cross-verified). Explorer sidebar same tree as prior photos, ultimateCoverLoader.ts highlighted (unsaved dot "1"). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026. Line 194 is the last visible line, cut off at the bottom of the screen/status bar.
---
65  export async function ultimateCoverLoader({ request }: any) {
    ⋮ (sticky scroll, enclosing scope)
163         });
164         const normalizedWithTab = normalized.map((f) => ({
165             ...f,
166             tab: tabMap.get(f.matchcode || '') ?? 'TABPOLICY',
167         }));
168
169         // Partition by tab
170         const normalizedByTab: Record<string, any[]> = {};
171         for (const f of normalizedWithTab) {
172             const tab = f.tab || 'TABPOLICY';
173             if (!normalizedByTab[tab]) normalizedByTab[tab] = [];
174             normalizedByTab[tab].push(f);
175         }
176
177         // Merge options from transformed fields if not present in normalized
178         try {
179             const optionMap = new Map<string, any[]>();
180             for (const sf of transformed.serviceFields || []) {
181                 const mc = (sf.matchcode || sf.id || '')?.toString();
182                 if (!mc) continue;
183                 const rawOpts = sf.options || sf.listitems || sf.items || sf.datasource || sf.list;
184                 if (Array.isArray(rawOpts) && rawOpts.length) optionMap.set(mc, rawOpts);
185             }
186             for (const arr of Object.values(normalizedByTab)) {
187                 for (const nf of arr) {
188                     if (!nf) continue;
189                     const mc = String(nf.matchcode || '');
190                     if (!mc) continue;
191                     if ((!nf.options || nf.options.length === 0) && optionMap.has(mc)) {
192                         const raw = optionMap.get(mc) || [];
193                         const mapped = (raw || []).map((o: any) => {
194 ⟪cut off at bottom of screen⟫


========== IMG_2633.md ==========
---
photo: IMG_2633.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 172-206
orientation: 180
confidence: high
notes: Continuation of ultimateCoverLoader.ts (same file/session as IMG_2624-2632; unsaved-dot "1" tab). Very heavy screen-tear/double-exposure artifact throughout this photo (worst of the series). Lines 172-193 overlap and cross-verify against IMG_2632's already-established numbering. Lines 194-206 were initially transcribed from this torn photo with low confidence, then corrected using the much cleaner IMG_2634 (which shows this exact same block, lines 192-206, with no tearing) — now high confidence. Explorer sidebar same tree as prior photos, ultimateCoverLoader.ts highlighted (unsaved dot "1"). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026.
---
65  export async function ultimateCoverLoader({ request }: any) {
    ⋮ (sticky scroll, enclosing scope)
172             const tab = f.tab || 'TABPOLICY';
173             if (!normalizedByTab[tab]) normalizedByTab[tab] = [];
174             normalizedByTab[tab].push(f);
175         }
176
177         // Merge options from transformed fields if not present in normalized
178         try {
179             const optionMap = new Map<string, any[]>();
180             for (const sf of transformed.serviceFields || []) {
181                 const mc = (sf.matchcode || sf.id || '')?.toString();
182                 if (!mc) continue;
183                 const rawOpts = sf.options || sf.listitems || sf.items || sf.datasource || sf.list;
184                 if (Array.isArray(rawOpts) && rawOpts.length) optionMap.set(mc, rawOpts);
185             }
186             for (const arr of Object.values(normalizedByTab)) {
187                 for (const nf of arr) {
188                     if (!nf) continue;
189                     const mc = String(nf.matchcode || '');
190                     if (!mc) continue;
191                     if ((!nf.options || nf.options.length === 0) && optionMap.has(mc)) {
192                         const raw = optionMap.get(mc) || [];
193                         const mapped = (raw || []).map((o: any) => {
194                             if (!o) return { label: String(o), value: String(o) };
195                             if (typeof o === 'object') {
196                                 return {
197                                     label:
198                                         (o.label as string) ??
199                                         (o.text as string) ??
200                                         (o['#text'] as string) ??
201                                         String(o.value ?? o.id ?? ''),
202                                     value: String(o.value ?? o.id ?? o.key ?? o['@value'] ?? ''),
203                                 };
204                             }
205                             return { label: String(o), value: String(o) };
206                         });


========== IMG_2634.md ==========
---
photo: IMG_2634.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 192-223
orientation: 180
confidence: high
notes: Continuation of ultimateCoverLoader.ts (same file/session as IMG_2624-2633; unsaved-dot "1" tab). Clean photo, no visible screen tearing, all line numbers directly legible. This photo's clean view of lines 192-206 was used to correct IMG_2633's tear-degraded reading of the same lines (see that file's notes). Explorer sidebar same tree as prior photos, ultimateCoverLoader.ts highlighted (unsaved dot "1"). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026. Line 223 is the last visible line ("}", closing the for-loop starting at 209).
---
65  export async function ultimateCoverLoader({ request }: any) {
    ⋮ (sticky scroll, enclosing scope)
    ⋮ (line ~191 "if ((!nf.options || nf.options.length === 0) && optionMap.has(mc)) {" partially visible above 192)
192             const raw = optionMap.get(mc) || [];
193             const mapped = (raw || []).map((o: any) => {
194                 if (!o) return { label: String(o), value: String(o) };
195                 if (typeof o === 'object') {
196                     return {
197                         label:
198                             (o.label as string) ??
199                             (o.text as string) ??
200                             (o['#text'] as string) ??
201                             String(o.value ?? o.id ?? ''),
202                         value: String(o.value ?? o.id ?? o.key ?? o['@value'] ?? ''),
203                     };
204                 }
205                 return { label: String(o), value: String(o) };
206             });
207
208             const labelMap = new Map<string, { label: string; value: string }>();
209             for (const opt of mapped) {
210                 const key = String(opt.label || opt.value || '')
211                     .trim()
212                     .toUpperCase();
213                 if (!labelMap.has(key)) {
214                     labelMap.set(key, opt);
215                     continue;
216                 }
217                 const existing = labelMap.get(key)!;
218                 const existingIsLabelOnly = existing.value === existing.label;
219                 const newIsLabelOnly = opt.value === opt.label;
220                 if (existingIsLabelOnly && !newIsLabelOnly) {
221                     labelMap.set(key, opt);
222                 }
223             }


========== IMG_2635.md ==========
---
photo: IMG_2635.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 210-241
orientation: 180
confidence: medium
notes: Continuation of ultimateCoverLoader.ts (same file/session as IMG_2624-2634; unsaved-dot "1" tab), and the final photo in this batch. Lines 210-223 overlap and exactly match the clean IMG_2634 reading (high confidence). Lines 224-231 have a heavy screen-tear/double-exposure artifact; a lag-3 ghost pattern is confirmed elsewhere in this photo (e.g. faint "if (existingIsLabelOnly && !newIsLabelOnly) {" bleeding through under line 223, which is the true content of line 220 three rows up), but at lines 224 and 227 the exact same statement "nf.options = Array.from(labelMap.values());" appears twice, both rendered equally sharp/in-focus (unlike the fainter, clearly-ghosted duplicates elsewhere), so it could not be conclusively resolved as pure tear vs. genuine leftover duplicate code — this file is on branch "hitanshu/experimental*" (dirty) with 3 live TS errors, so a real duplicate/leftover statement is plausible. Both occurrences transcribed as observed; line count between confirmed anchors (224 and 229, the latter cross-verified via a clean crop with unambiguous gutter digits) requires exactly this many lines. Marked ⟪?⟫ accordingly; confidence for lines 224-231 is low-medium, while 210-223 and 232-241 are high confidence. Line 240 appears blank. Line 241 "if (" is the last visible line, cut off at the bottom of the screen (macOS Dock icons visible below the editor in this photo). Explorer sidebar same tree as prior photos, ultimateCoverLoader.ts highlighted (unsaved dot "1"). Status bar: branch "hitanshu/experimental*" (dirty), 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, 5:15 PM 7/10/2026.
---
65  export async function ultimateCoverLoader({ request }: any) {
    ⋮ (sticky scroll, enclosing scope)
210             const key = String(opt.label || opt.value || '')
211                 .trim()
212                 .toUpperCase();
213             if (!labelMap.has(key)) {
214                 labelMap.set(key, opt);
215                 continue;
216             }
217             const existing = labelMap.get(key)!;
218             const existingIsLabelOnly = existing.value === existing.label;
219             const newIsLabelOnly = opt.value === opt.label;
220             if (existingIsLabelOnly && !newIsLabelOnly) {
221                 labelMap.set(key, opt);
222             }
223         }
224             nf.options = Array.from(labelMap.values());
225         }
226     }
227             nf.options = Array.from(labelMap.values()); ⟪? — duplicate of line 224; see notes: tear artifact or genuine leftover WIP duplicate, undetermined⟫
228     }
229 } catch (e) {
230     console.error('[ultimateCoverLoader] Error merging options:', e);
231 }
232 // Collect controls (buttons)
233 const controlsByTab: Record<string, any[]> = {};
234 for (const c of controlArray) {
235     const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
236     const tab = (c['@tab'] ?? c.tab ?? 'TABPOLICY')?.toString();
237     const controlType = (c['@controltype'] ?? c.controltype ?? '')
238         ?.toString()
239         .toLowerCase();
240
241     if (


========== IMG_2636.md ==========
---
photo: IMG_2636.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 224-257
orientation: 180
confidence: medium
notes: Photo has heavy motion-blur / double-exposure ghosting (two near-identical frames of the same code overlaid, offset by ~1 line), making exact line-number alignment for lines 224-232 uncertain; reconstructed by cross-referencing with the sharper IMG_2637 (same file, overlapping lines 242-257, exact match confirmed). Sticky-scroll header shows enclosing function: line 65 "export async function ultimateCoverLoader({ request }: any) {". Tab bar: only "ultimateCoverLoader.ts" open (1 unsaved marker). Breadcrumb: aqs-web-ui > src > features > policy > utils > ultimateCoverLoader.ts. Explorer sidebar (policy/utils folder) shows: action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts (highlighted); also FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts at features/policy level; policy/constants folder has tab-definitions.ts, ultimate-cover-tab-definit...(truncated name). Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings. A faint/ghosted fragment above line 226, only partially in frame and low-confidence, appears to read "if (existingIsLabelOnly && !newIsLabelOnly) {" — marked illegible/uncertain, not assigned a firm line number.
---
⟪?⟫ (faint, partially out of frame, uncertain) if (existingIsLabelOnly && !newIsLabelOnly) {
226      }
227  }
228          nf.options = Array.from(labelMap.values());
229      }
230  } catch (e) {
231      console.error('[ultimateCoverLoader] Error merging options:', e);
232  }
233  // Collect controls (buttons)
234  const controlsByTab: Record<string, any[]> = {};
235  for (const c of controlArray) {
236      const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
237      const tab = (c['@tab'] ?? c.tab ?? 'TABPOLICY')?.toString();
238      const controlType = (c['@controltype'] ?? c.controltype ?? '')
239          ?.toString()
240          .toLowerCase();
241      if (
242          controlType === 'button' ||
243          (mc &&
244              mc.toUpperCase &&
245              ['OK', 'CANCEL', 'NEXT', 'BACK', 'SUBMIT'].includes(mc.toUpperCase()))
246      ) {
247          if (!controlsByTab[tab]) controlsByTab[tab] = [];
248          controlsByTab[tab].push({
249              matchcode: mc,
250              text: (c['@text'] ?? c.text ?? mc)?.toString(),
251              tab,
252              control: c,
253          });
254      }
255  }
256
257  // Initial values by tab


========== IMG_2637.md ==========
---
photo: IMG_2637.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 242-273
orientation: 180
confidence: high
notes: Sticky-scroll header shows enclosing function: line 65 "export async function ultimateCoverLoader({ request }: any) {"; line 241's own code is hidden behind the sticky-scroll header (only an illegible fragment peeks through). Tab bar: only "ultimateCoverLoader.ts" open (1 unsaved marker). Breadcrumb: aqs-web-ui > src > features > policy > utils > ultimateCoverLoader.ts. Explorer sidebar (policy/utils folder) shows: action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts (highlighted); also FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts at features/policy level. Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings. Overlaps with IMG_2636 (lines 224-257) which confirms this content; this photo is sharper/less blurry.
---
241  ⟪?⟫ (hidden under sticky-scroll header, illegible)
242      controlType === 'button' ||
243      (mc &&
244          mc.toUpperCase &&
245          ['OK', 'CANCEL', 'NEXT', 'BACK', 'SUBMIT'].includes(mc.toUpperCase()))
246  ) {
247      if (!controlsByTab[tab]) controlsByTab[tab] = [];
248      controlsByTab[tab].push({
249          matchcode: mc,
250          text: (c['@text'] ?? c.text ?? mc)?.toString(),
251          tab,
252          control: c,
253      });
254  }
255  }
256
257  // Initial values by tab
258  const initialValuesByTab: Record<string, Record<string, unknown>> = {};
259  for (const [mc, val] of Object.entries(transformed.defaultValues || {})) {
260      const tab = tabMap.get(mc) ?? 'TABPOLICY';
261      if (!initialValuesByTab[tab]) initialValuesByTab[tab] = {};
262      initialValuesByTab[tab][mc] = val;
263  }
264
265  // Tabs order
266  const tabsOrder: string[] = [];
267  const seen = new Set<string>();
268  for (const mc of transformed.utpOrder || transformed.fieldOrder || []) {
269      const tab = tabMap.get(mc) ?? 'TABPOLICY';
270      if (!seen.has(tab)) {
271          seen.add(tab);
272          tabsOrder.push(tab);
273      }


========== IMG_2638.md ==========
---
photo: IMG_2638.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 255-286
orientation: 180
confidence: high
notes: Photo has motion-blur double-exposure ghosting (a fainter duplicate of the whole visible block appears offset ~11 lines below the sharp copy, i.e. two overlapping scroll positions of the same editor blended into one frame); transcribed from the sharp/high-contrast layer only, cross-validated against IMG_2637 and IMG_2639 (exact match on overlapping lines 255-268 and 267-282). Sticky-scroll header shows line 65 "export async function ultimateCoverLoader({ request }: any) {". Tab bar: only "ultimateCoverLoader.ts" open (1 unsaved marker). Breadcrumb: aqs-web-ui > src > features > policy > utils > ultimateCoverLoader.ts. Explorer sidebar (policy/utils) shows: action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts (highlighted); also FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings.
---
255  }
256
257  // Initial values by tab
258  const initialValuesByTab: Record<string, Record<string, unknown>> = {};
259  for (const [mc, val] of Object.entries(transformed.defaultValues || {})) {
260      const tab = tabMap.get(mc) ?? 'TABPOLICY';
261      if (!initialValuesByTab[tab]) initialValuesByTab[tab] = {};
262      initialValuesByTab[tab][mc] = val;
263  }
264
265  // Tabs order
266  const tabsOrder: string[] = [];
267  const seen = new Set<string>();
268  for (const mc of transformed.utpOrder || transformed.fieldOrder || []) {
269      const tab = tabMap.get(mc) ?? 'TABPOLICY';
270      if (!seen.has(tab)) {
271          seen.add(tab);
272          tabsOrder.push(tab);
273      }
274  }
275  for (const k of Object.keys(normalizedByTab)) {
276      if (!seen.has(k)) {
277          seen.add(k);
278          tabsOrder.push(k);
279      }
280  }
281
282  const formKey = JSON.stringify({
283      tabs: tabsOrder,
284      fields: normalized.map((f) => f.matchcode || ''),
285      t: Date.now(),
286  });


========== IMG_2639.md ==========
---
photo: IMG_2639.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 270-302
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 65 "export async function ultimateCoverLoader({ request }: any) {". Tab bar: only "ultimateCoverLoader.ts" open (1 unsaved marker). Breadcrumb: aqs-web-ui > src > features > policy > utils > ultimateCoverLoader.ts. Explorer sidebar (policy/utils) shows: action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts (highlighted); also FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings. Overlaps with IMG_2638 (255-286) confirming lines 270-282; sharp/clean photo, no ghosting.
---
270      if (!seen.has(tab)) {
271          seen.add(tab);
272          tabsOrder.push(tab);
273      }
274  }
275  for (const k of Object.keys(normalizedByTab)) {
276      if (!seen.has(k)) {
277          seen.add(k);
278          tabsOrder.push(k);
279      }
280  }
281
282  const formKey = JSON.stringify({
283      tabs: tabsOrder,
284      fields: normalized.map((f) => f.matchcode || ''),
285      t: Date.now(),
286  });
287
288  const browserCommands = parseBrowserCommandsFromPageBuild(pageBuild || {});
289
290  const pageButtons = (transformed.buttons || []).map((b) => ({
291      ...b,
292      tab: tabMap.get((b.matchcode || '') as string) ?? 'TABPOLICY',
293  }));
294
295  return data({
296      pageBuild,
297      xmlFileName,
298      xmlFilePath,
299      tabFilePath,
300      xmlListFilePath,
301      normalizedByTab,
302      controlsByTab,


========== IMG_2640.md ==========
---
photo: IMG_2640.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 286-311
orientation: 180
confidence: high
notes: Photo has motion-blur double-exposure ghosting (fainter duplicate of the block offset ~9-11 lines below the sharp copy); transcribed from the sharp/high-contrast layer, cross-validated against IMG_2639 (286-302) and IMG_2641 (297-311), exact match. Sticky-scroll header shows line 65 "export async function ultimateCoverLoader({ request }: any) {". Tab bar: only "ultimateCoverLoader.ts" open (1 unsaved marker). Breadcrumb: aqs-web-ui > src > features > policy > utils > ultimateCoverLoader.ts. Explorer sidebar (policy/utils) shows: action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts (highlighted); also FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings.
---
286  });
287
288  const browserCommands = parseBrowserCommandsFromPageBuild(pageBuild || {});
289
290  const pageButtons = (transformed.buttons || []).map((b) => ({
291      ...b,
292      tab: tabMap.get((b.matchcode || '') as string) ?? 'TABPOLICY',
293  }));
294
295  return data({
296      pageBuild,
297      xmlFileName,
298      xmlFilePath,
299      tabFilePath,
300      xmlListFilePath,
301      normalizedByTab,
302      controlsByTab,
303      initialValuesByTab,
304      tabsOrder,
305      formKey,
306      browserCommands,
307      pageButtons,
308      meta: { loaded: true },
309  });
310  } catch (err) {
311      console.error('[ultimateCoverLoader] error:', err);


========== IMG_2641.md ==========
---
photo: IMG_2641.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/utils/ultimateCoverLoader.ts
lines: 297-328
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 65 "export async function ultimateCoverLoader({ request }: any) {". Tab bar: only "ultimateCoverLoader.ts" open (1 unsaved marker). Breadcrumb: aqs-web-ui > src > features > policy > utils > ultimateCoverLoader.ts. Explorer sidebar (policy/utils) shows: action.ts, lobActionMenuLoader.ts, middleware.ts, policyInformationLoader.ts, ultimateCoverLoader.ts (highlighted); also FieldRenderer.tsx, index.ts, policy-information-fields.ts, types.ts, ultimate-cover-fields.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 3 errors/0 warnings. Sharp/clean photo, no ghosting. Line 328 appears blank/end of visible area (function closing brace likely follows off-screen). Overlaps with IMG_2640 (286-311) confirming lines 297-311.
---
297      xmlFileName,
298      xmlFilePath,
299      tabFilePath,
300      xmlListFilePath,
301      normalizedByTab,
302      controlsByTab,
303      initialValuesByTab,
304      tabsOrder,
305      formKey,
306      browserCommands,
307      pageButtons,
308      meta: { loaded: true },
309  });
310  } catch (err) {
311      console.error('[ultimateCoverLoader] error:', err);
312      return data({
313          pageBuild: null,
314          xmlFileName: undefined,
315          xmlFilePath: undefined,
316          tabFilePath: undefined,
317          xmlListFilePath: undefined,
318          normalizedByTab: {},
319          controlsByTab: {},
320          initialValuesByTab: {},
321          tabsOrder: [],
322          formKey: '',
323          browserCommands: [],
324          meta: { error: String(err) },
325      });
326  }
327  }
328
