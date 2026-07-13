# BUNDLE for src/features/policy/components/LobActionMenu.tsx
# 16 photo fragment(s), ascending start-line order.


========== IMG_2423.md ==========
---
photo: IMG_2423.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 1-34
orientation: 180
confidence: high
notes: >
  Editor tab switched from middleware.ts to LobActionMenu.tsx (tab shows
  "LobActionMenu.tsx 9+", other open tab "date.tsx 9+"). Explorer sidebar
  now shows aqs-web-ui/src/features/policy expanded: components/
  (LobActionMenu.tsx 9+ selected, PolicyInformation.tsx M, ultimate-cover.tsx),
  constants/, utils/, FieldRenderer.tsx, index.ts; legacy/utils still shows
  loader-optimized.ts U, loader.ts U, middleware-optimize...ts U,
  middleware.ts U (all still marked unsaved/untracked "U"). Status bar now
  shows 45 errors, 0 warnings (up from 31 in the middleware.ts photos),
  "No Solution", TypeScript JSX. Tooltip popup "unknown" visible near cursor
  on line 24 (hover-over type info for mstrPolicyID). No sticky-scroll header
  visible (top of file).
---
1   import { useMemo, useState } from 'react';
2   import { Alert, Button, Typography } from '@mui/material';
3   import { useLoaderData, useLocation } from 'react-router';
4   import { getItem as getPolicyID } from '@utils/session-storage';
5
6   import { CommonDataGrid } from '@components/data-grid/data-grid';
7   import { getGridConfig } from '@components/data-grid/data-grid-config-registry';
8   import { useSmartNavigation } from '@hooks/use-smart-navigation';
9   import { getItem } from '@utils/local-storage';
10
11  import type { LobActionMenuLoaderData } from '@features/policy/utils/lobActionMenuLoader';
12  import type { GenericRow } from '@components/data-grid/data-grid-normalize';
13
14  interface SessionInfoLike {
15      policyId?: string;
16      nodeKey?: string;
17      sessionXml?: string;
18  }
19
20  interface SessionXmlFlags {
21      isInquiry: boolean;
22      transactionId: string;
23  }
24  const policyId = getPolicyID<Record<string, unknown>>('aqs:global-variables', {})?.mstrPolicyID;
25  const transactionType = getPolicyID<Record<string, unknown>>(
26      'aqs:global-variables',
27      {},
28  )?.mstrTransactionType;
29  function parseSessionXmlFlags(sessionXml: string | undefined): SessionXmlFlags {
30      if (!sessionXml || !sessionXml.trim()) {
31          return { isInquiry: false, transactionId: '' };
32      }
33
34      try {


========== IMG_2424.md ==========
---
photo: IMG_2424.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 11-44
orientation: 180
confidence: high
notes: >
  Continuation of IMG_2423 (same file, scrolled down slightly; lines 11-34
  overlap and are consistent). No sticky-scroll header shown - breadcrumb
  only. Same Explorer/tab/status-bar state as IMG_2423 (45 errors, 0
  warnings).
---
11  import type { LobActionMenuLoaderData } from '@features/policy/utils/lobActionMenuLoader';
12  import type { GenericRow } from '@components/data-grid/data-grid-normalize';
13
14  interface SessionInfoLike {
15      policyId?: string;
16      nodeKey?: string;
17      sessionXml?: string;
18  }
19
20  interface SessionXmlFlags {
21      isInquiry: boolean;
22      transactionId: string;
23  }
24  const policyId = getPolicyID<Record<string, unknown>>('aqs:global-variables', {})?.mstrPolicyID;
25  const transactionType = getPolicyID<Record<string, unknown>>(
26      'aqs:global-variables',
27      {},
28  )?.mstrTransactionType;
29  function parseSessionXmlFlags(sessionXml: string | undefined): SessionXmlFlags {
30      if (!sessionXml || !sessionXml.trim()) {
31          return { isInquiry: false, transactionId: '' };
32      }
33
34      try {
35          const parser = new DOMParser();
36          const doc = parser.parseFromString(sessionXml, 'text/xml');
37          if (doc.querySelector('parsererror')) {
38              return { isInquiry: false, transactionId: '' };
39          }
40
41          const items = Array.from(doc.querySelectorAll('item'));
42          const getValue = (name: string): string => {
43              const found = items.find(
44                  (item) => (item.getAttribute('name') ?? '').trim().toLowerCase() === name,


========== IMG_2425.md ==========
---
photo: IMG_2425.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 25-54
orientation: 180
confidence: low
notes: >
  SEVERE double-exposure/motion-blur artifact: the photo appears to have
  captured VS Code's smooth-scroll animation mid-motion, superimposing two
  scroll positions of the same file offset by ~3 lines (visible as two
  overlapping sets of gutter line numbers and two overlapping copies of
  similar-looking code). Line numbers 25-44 were cross-verified against the
  clean reads in IMG_2423/IMG_2424 and match exactly. Lines 45-54 (new
  content not visible in those clean photos) were reconstructed from the
  sharper/foreground text layer and independently cross-checked against the
  clearer IMG_2426 photo, where they match. Transcribed here at low
  confidence due to the source photo's blur; treat IMG_2426 as the primary
  source for lines 45+.
---
25  const transactionType = getPolicyID<Record<string, unknown>>(
26      'aqs:global-variables',
27      {},
28  )?.mstrTransactionType;
29  function parseSessionXmlFlags(sessionXml: string | undefined): SessionXmlFlags {
30      if (!sessionXml || !sessionXml.trim()) {
31          return { isInquiry: false, transactionId: '' };
32      }
33
34      try {
35          const parser = new DOMParser();
36          const doc = parser.parseFromString(sessionXml, 'text/xml');
37          if (doc.querySelector('parsererror')) {
38              return { isInquiry: false, transactionId: '' };
39          }
40
41          const items = Array.from(doc.querySelectorAll('item'));
42          const getValue = (name: string): string => {
43              const found = items.find(
44                  (item) => (item.getAttribute('name') ?? '').trim().toLowerCase() === name,
45              );
46              return (found?.getAttribute('value') ?? '').trim();
47          };
48
49          const inquiryValue = getValue('inquiry').toUpperCase();
50          const transactionId = getValue('transactionid');
51
52          const isInquiryByTransaction = transactionId === '7' || transactionId === '10';
53          const isInquiry = inquiryValue === 'T' || isInquiryByTransaction;
54  ⟪?⟫ (blurred/illegible below this point in this photo; see IMG_2426)


========== IMG_2426.md ==========
---
photo: IMG_2426.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 29-67
orientation: 180
confidence: medium
notes: >
  Same double-exposure/motion-blur artifact as IMG_2425 (two superimposed
  scroll positions ~3 lines apart), though the foreground text layer is
  legible with careful zoom/crop. Sticky-scroll header pinned at top: line
  29 (`function parseSessionXmlFlags(...)`). Transcription below uses only
  the sharp/foreground layer, verified against zoomed crops and cross-checked
  where ranges overlap with IMG_2424 (35-44) and IMG_2427 (61-67) - all
  consistent. Lines 45-60 are the first clean confirmation of this content
  in the batch.
---
29  function parseSessionXmlFlags(sessionXml: string | undefined): SessionXmlFlags {
36      const doc = parser.parseFromString(sessionXml, 'text/xml');
37      if (doc.querySelector('parsererror')) {
41      const items = Array.from(doc.querySelectorAll('item'));
42      const getValue = (name: string): string => {
43          const found = items.find(
44              (item) => (item.getAttribute('name') ?? '').trim().toLowerCase() === name,
45          );
46          return (found?.getAttribute('value') ?? '').trim();
47      };
48
49      const inquiryValue = getValue('inquiry').toUpperCase();
50      const transactionId = getValue('transactionid');
51
52      const isInquiryByTransaction = transactionId === '7' || transactionId === '10';
53      const isInquiry = inquiryValue === 'T' || isInquiryByTransaction;
54
55      return { isInquiry, transactionId };
56  } catch {
57      return { isInquiry: false, transactionId: '' };
58  }
59  }
60
61  function isTrueFlag(value: unknown): boolean {
62      if (typeof value !== 'string') {
63          return false;
64      }
65      const normalized = value.trim().toUpperCase();
66      return normalized === 'T' || normalized === 'TRUE' || normalized === '1';
67  }


========== IMG_2427.md ==========
---
photo: IMG_2427.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 61-92
orientation: 180
confidence: medium
notes: >
  Same double-exposure/motion-blur artifact as IMG_2425/2426 (two
  superimposed scroll positions). Sticky-scroll header pinned at top: line
  61 (`function isTrueFlag(...)`). Foreground/sharp text layer transcribed
  below via zoomed crops; lines 61-67 cross-checked against IMG_2426
  (consistent). Lines 68-92 are new content, internally consistent and
  logically coherent (React component start, useLoaderData/useLocation/
  useSmartNavigation/useState hooks, handleRowClick handler).
---
61  function isTrueFlag(value: unknown): boolean {
66      const normalized = value.trim().toUpperCase();
67      return normalized === 'T' || normalized === 'TRUE' || normalized === '1';
68  }
69
70  export default function LobActionMenu() {
71      const loaderData = useLoaderData() as LobActionMenuLoaderData;
72      const location = useLocation();
73      const gridConfig = getGridConfig('LOB_SUMMARY');
74      const fallbackGridData = { Page: { LOB: [] } };
75      const { smartNavigate } = useSmartNavigation();
76      const [selectedRow, setSelectedRow] = useState<GenericRow | null>(null);
77
78      // Wrap setSelectedRow to add logging
79      const handleRowClick = (row: GenericRow) => {
80          const nodeKey = row?.nodekey ?? row?.nodeKey;
81          console.log('[LobActionMenu] LOB row selected', {
82              lob: row?.text,
83              nodeKey,
84              exists: row?.exists,
85              converted: row?.converted,
86          });
87          setSelectedRow(row);
88      };
89
90      const sessionInfo = getItem<SessionInfoLike>('sessionInformation');
91      const sessionFlags = useMemo(
92          () => parseSessionXmlFlags(sessionInfo?.sessionXml),


========== IMG_2428.md ==========
---
photo: IMG_2428.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 70-106
orientation: 180
confidence: medium
notes: >
  Same double-exposure/motion-blur artifact as prior photos in this batch.
  Sticky-scroll header pinned at top: line 70 (`export default function
  LobActionMenu() {`). Foreground/sharp text layer transcribed via zoomed
  crops; lines 76-89 cross-checked against IMG_2427 (consistent). Lines
  90-106 are new content: sessionFlags useMemo, selectedNodeKey useMemo,
  selectedExists useMemo.
---
70  export default function LobActionMenu() {
76      const [selectedRow, setSelectedRow] = useState<GenericRow | null>(null);
78      // Wrap setSelectedRow to add logging
79      const handleRowClick = (row: GenericRow) => {
80          const nodeKey = row?.nodekey ?? row?.nodeKey;
81          console.log('[LobActionMenu] LOB row selected', {
82              lob: row?.text,
83              nodeKey,
84              exists: row?.exists,
85              converted: row?.converted,
86          });
87          setSelectedRow(row);
88      };
89
90      const sessionInfo = getItem<SessionInfoLike>('sessionInformation');
91      const sessionFlags = useMemo(
92          () => parseSessionXmlFlags(sessionInfo?.sessionXml),
93          [sessionInfo?.sessionXml],
94      );
95
96      const selectedNodeKey = useMemo(() => {
97          const rawNodeKey = selectedRow?.nodekey ?? selectedRow?.nodeKey;
98          return typeof rawNodeKey === 'string' ? rawNodeKey.trim() : '';
99      }, [selectedRow]);
100
101     const selectedExists = useMemo(() => {
102         if (!selectedRow) return false;
103         const rawExists = selectedRow?.exists;
104         if (typeof rawExists !== 'string') return false;
105         return isTrueFlag(rawExists);
106     }, [selectedRow]);


========== IMG_2429.md ==========
---
photo: IMG_2429.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 70-123
orientation: 180
confidence: high
notes: >
  Slight motion-blur ghosting present but much lighter than IMG_2425-2428;
  foreground text clearly legible after zoom. Sticky-scroll header pinned at
  top: line 70 (`export default function LobActionMenu() {`). Lines 91-106
  overlap with IMG_2428 and are consistent. New content: selectedConverted
  useMemo, isInquiryMode/editLabel, disableAdd/disableEdit/disableDelete
  flags (disableDelete continues onto IMG_2430).
---
70  export default function LobActionMenu() {
91      const sessionFlags = useMemo(
93          [sessionInfo?.sessionXml],
94      );
96      const selectedNodeKey = useMemo(() => {
97          const rawNodeKey = selectedRow?.nodekey ?? selectedRow?.nodeKey;
98          return typeof rawNodeKey === 'string' ? rawNodeKey.trim() : '';
99      }, [selectedRow]);
100
101     const selectedExists = useMemo(() => {
102         if (!selectedRow) return false;
103         const rawExists = selectedRow?.exists;
104         if (typeof rawExists !== 'string') return false;
105         return isTrueFlag(rawExists);
106     }, [selectedRow]);
107
108     const selectedConverted = useMemo(() => {
109         if (!selectedRow) return false;
110         const rawConverted = selectedRow?.converted;
111         if (typeof rawConverted !== 'string' || rawConverted.trim() === '') {
112             return true;
113         }
114         return isTrueFlag(rawConverted);
115     }, [selectedRow]);
116
117     const isInquiryMode = sessionFlags.isInquiry;
118     const editLabel = isInquiryMode ? 'View' : 'Edit';
119
120     const disableAdd = !selectedRow || selectedExists || isInquiryMode || !selectedConverted;
121     const disableEdit = !selectedRow || !selectedExists || selectedNodeKey === '';
122     const disableDelete =
123         !selectedRow ||


========== IMG_2430.md ==========
---
photo: IMG_2430.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 70-128
orientation: 180
confidence: medium
notes: >
  Motion-blur double-exposure artifact present (similar to IMG_2425-2428).
  Sticky-scroll header pinned at top: line 70 (`export default function
  LobActionMenu() {`). Lines 96-123 overlap with IMG_2429/2428 and are
  consistent (transcribed here from the clearer IMG_2429 where ranges
  overlap). New content: completes the disableDelete multi-line expression
  (lines 124-127).
---
70  export default function LobActionMenu() {
96      const selectedNodeKey = useMemo(() => {
97          const rawNodeKey = selectedRow?.nodekey ?? selectedRow?.nodeKey;
98          return typeof rawNodeKey === 'string' ? rawNodeKey.trim() : '';
99      }, [selectedRow]);
100
101     const selectedExists = useMemo(() => {
102         if (!selectedRow) return false;
103         const rawExists = selectedRow?.exists;
104         if (typeof rawExists !== 'string') return false;
105         return isTrueFlag(rawExists);
106     }, [selectedRow]);
107
108     const selectedConverted = useMemo(() => {
109         if (!selectedRow) return false;
110         const rawConverted = selectedRow?.converted;
111         if (typeof rawConverted !== 'string' || rawConverted.trim() === '') {
112             return true;
113         }
114         return isTrueFlag(rawConverted);
115     }, [selectedRow]);
116
117     const isInquiryMode = sessionFlags.isInquiry;
118     const editLabel = isInquiryMode ? 'View' : 'Edit';
119
120     const disableAdd = !selectedRow || selectedExists || isInquiryMode || !selectedConverted;
121     const disableEdit = !selectedRow || !selectedExists || selectedNodeKey === '';
122     const disableDelete =
123         !selectedRow ||
124         !selectedExists ||
125         isInquiryMode ||
126         !selectedConverted ||
127         selectedNodeKey === '';
128


========== IMG_2431.md ==========
---
photo: IMG_2431.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 70-155
orientation: 180
confidence: high
notes: >
  Little to no motion blur (camera steadier than IMG_2425-2430); two
  sticky-scroll headers pinned at top: line 70 (`export default function
  LobActionMenu() {`) and line 122 (`const disableDelete =`). Real scrolled
  content 124-155. Line 155 (`}`) is the last visible line before the status
  bar cuts off the view - file continues beyond what's captured in this
  photo (closing `});` for smartNavigate and the function itself are not
  visible). Lines 124-127 overlap with IMG_2430 and are consistent.
---
70  export default function LobActionMenu() {
122     const disableDelete =
124         !selectedExists ||
125         isInquiryMode ||
126         !selectedConverted ||
127         selectedNodeKey === '';
128
129     const navigateLobAction = (action: string): void => {
130         if (!selectedNodeKey) {
131             console.warn('[LobActionMenu] No LOB selected - cannot navigate', {
132                 action,
133                 selectedRow,
134             });
135             return;
136         }
137
138         console.log('[LobActionMenu] Navigating to LOB action', {
139             action,
140             selectedLOB: selectedRow?.text,
141             nodeKey: selectedNodeKey,
142             policyId: sessionInfo?.policyId,
143             note: 'This will trigger cycling API call in dataStrategy',
144         });
145
146         // Navigate with new action - let backend cycling response determine frame/route
147         // This will trigger dataStrategy → executeAction → cycling API → redirect
148         smartNavigate(location.pathname, {
149             nodeKey: selectedNodeKey,
150             policyId: sessionInfo?.policyId ?? '0',
151             xmlDetail: sessionInfo?.sessionXml ?? '',
152             queryParams: {
153                 action,
154                 // Removed hardcoded frame - let backend response control routing
155             }⟪?⟫


========== IMG_2432.md ==========
---
photo: IMG_2432.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 70-165 (sticky 70,129; visible content 134(occluded)-165)
orientation: 180
confidence: high
notes: Sticky-scroll headers at top show enclosing scope lines 70 ("export default function LobActionMenu() {") and 129 ("const navigateLobAction = (action: string): void => {"). Line 134 is a fragment partially hidden under the sticky-scroll separator bar (only a tiny colored glyph cluster visible) — marked ⟪?⟫, actual lines 130-133 are scrolled out of view entirely (not shown in photo). Tab bar shows "date.tsx 9+" and active tab "LobActionMenu.tsx 9+" (italicized = preview/unsaved tab, "9+" = 9 unsaved changes indicator). Breadcrumb: aqs-web-ui > src > features > policy > components > LobActionMenu.tsx > ... Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): features > auth (middleware.ts), dashboard\utils (loader.ts, middleware.ts), form\utils (dynamic-form-loader.ts), legacy > components, utils (loader-optimized.ts [U], loader.ts [U], middleware-optimize...ts [U], middleware.ts [U] — U = untracked/unmerged git markers), policy > components with LobActionMenu.tsx (highlighted/selected, 9+), PolicyInformation.tsx [M modified], ultimate-cover.tsx, then constants, utils, FieldRenderer.tsx, index.ts siblings under policy. Status bar: repo "aqs-web-ui", branch "hitanshu/experimental*" (dirty), Problems 45 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Timestamp overlay top-left: 4:49 PM 7/10/2026 (matches taskbar clock).
---
70    export default function LobActionMenu() {
129       const navigateLobAction = (action: string): void => {
134   ⟪?⟫ (line occluded by sticky-scroll separator bar, only a small fragment of colored glyphs visible; lines 130-133 not visible in photo at all)
135           return;
136       }
137
138       console.log('[LobActionMenu] Navigating to LOB action', {
139         action,
140         selectedLOB: selectedRow?.text,
141         nodeKey: selectedNodeKey,
142         policyId: sessionInfo?.policyId,
143         note: 'This will trigger cycling API call in dataStrategy',
144       });
145
146       // Navigate with new action - let backend cycling response determine frame/route
147       // This will trigger dataStrategy → executeAction → cycling API → redirect
148       smartNavigate(location.pathname, {
149         nodeKey: selectedNodeKey,
150         policyId: sessionInfo?.policyId ?? '0',
151         xmlDetail: sessionInfo?.sessionXml ?? '',
152         queryParams: {
153           action,
154           // Removed hardcoded frame - let backend response control routing
155         },
156       });
157     };
158
159     if (!gridConfig) {
160       return (
161         <div>
162           <Alert severity="error">LOB grid configuration is missing.</Alert>
163         </div>
164       );
165     }


========== IMG_2433.md ==========
---
photo: IMG_2433.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 167-191 (plus sticky 70; ghosted duplicate of ~159-166 visible at top)
orientation: 180
confidence: medium
notes: SEVERE PHOTO ARTIFACT — this photo is a double-exposure/motion-blur shot, apparently taken while VS Code was mid-scroll (or the phone moved during a slow shutter), so two overlapping scroll positions of the SAME file are superimposed throughout the whole editor pane, each with its own (slightly offset) line-number gutter. The top ~40% of the frame is an overlapping ghost of content already captured cleanly in IMG_2432 (the "if (!gridConfig) { return (<div><Alert severity=\"error\">LOB grid configuration is missing.</Alert></div>); }" block, lines ~159-166) — not re-transcribed here since it duplicates IMG_2432. CORRECTION: the h3/Typography/transactionType block below was originally transcribed here with guessed line numbers 172-191 from this ghosted photo; IMG_2434 (same file, same "9+" unsaved state, same minute 4:49 PM — taken moments later without ghosting) shows this exact same block cleanly at lines 176-191, confirming the content but with the true property order/values corrected: fontWeight is the string '500' (not the number 500), and property order is mb, color, fontSize, backgroundColor, padding, fontWeight, display (this transcript's line numbers/content below have been updated to match IMG_2434's clean ground truth — treat IMG_2434 as authoritative for this block; only line 191 "id=\"pageIssue\"" onward in this photo is uncorrected/not visible in 2434's crop used here). Lines 169-171 (marked ⟪?⟫) remain unresolved/uncertain — the boundary between "<div>" (168) and the Policy-heading div is ambiguous: best guess is a soft-wrapped h1 tag+text ("Line of Business Action Menu" is clearly legible plain text, presumably the child text of an h1) followed by a closing </div> and a blank line, but exact line numbers/wrapping for 169-171 could not be confirmed from either photo. Explorer sidebar and tab bar/breadcrumb are static (unaffected by scroll ghosting) and identical to IMG_2432: tabs "date.tsx 9+" and active "LobActionMenu.tsx 9+"; breadcrumb aqs-web-ui > src > features > policy > components > LobActionMenu.tsx > ...; sidebar shows same tree (auth/middleware.ts, dashboard\utils, form\utils, legacy, utils with loader-optimized.ts[U]/loader.ts[U]/middleware-optimize...ts[U]/middleware.ts[U], policy > components with LobActionMenu.tsx highlighted 9+, PolicyInformation.tsx[M], ultimate-cover.tsx, constants, utils, FieldRenderer.tsx, index.ts). Status bar: aqs-web-ui, hitanshu/experimental* (dirty), 45 errors / 0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock overlay 4:49 PM 7/10/2026 (same minute as IMG_2432/IMG_2434 — photos taken seconds apart in the same session).
---
70    export default function LobActionMenu() {
      ⟪ghosted duplicate of lines ~159-166 from IMG_2432 overlapping here — not re-transcribed, see IMG_2432⟫
167       return (
168         <div>
169   ⟪?⟫     <h1 className="text-[28px] font-semibold text-left text-[#00205B]">Line of Business Action Menu</h1>
170   ⟪?⟫     </div>
171   ⟪?⟫
172         <div className="flex items-center justify-between mb-3">
173           <div className="flex items-baseline gap-4">
174             ⟪?⟫ (h3 Policy heading, exact line number uncertain — see IMG_2434 line 176 for clean text)
175             ⟪?⟫ (Typography open, exact line number uncertain — see IMG_2434 line 177)
176             variant="body2"                              [corrected to match IMG_2434 L178]
177             sx={{                                         [corrected to match IMG_2434 L179]
178               mb: 2,                                      [corrected to match IMG_2434 L180]
179               color: '#00205B',                           [corrected to match IMG_2434 L181]
180               fontSize: '14px',                           [corrected to match IMG_2434 L182]
181               backgroundColor: '#E9F1FF',                 [corrected to match IMG_2434 L183]
182               padding: '6px',                             [corrected to match IMG_2434 L184]
183               fontWeight: '500',                          [corrected to match IMG_2434 L185]
184               display: 'inline-block',                    [corrected to match IMG_2434 L186]
185             }}                                             [corrected to match IMG_2434 L187]
186           >                                                [corrected to match IMG_2434 L188]
187             {(transactionType || '') as string}            [corrected to match IMG_2434 L189]
188           </Typography>                                    [corrected to match IMG_2434 L190]
189         </div>                                              [corrected to match IMG_2434 L191]
190         <Button
191           id="pageIssue"


========== IMG_2434.md ==========
---
photo: IMG_2434.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 176-207 (sticky 70)
orientation: 180
confidence: high
notes: Sharp/clean photo (no motion blur). Sticky-scroll header at top shows enclosing scope line 70 ("export default function LobActionMenu() {"). This photo confirms and corrects the ghosted content guessed in IMG_2433 for lines 176-191 (same Typography sx block, transactionType badge). Tab bar shows "date.tsx 9+" and active tab "LobActionMenu.tsx 9+" (italic = preview tab). Breadcrumb: aqs-web-ui > src > features > policy > components > LobActionMenu.tsx > ... Explorer sidebar identical to IMG_2432/2433 (AQS_WORKSPACE > aqs-web-ui > src > features > auth/middleware.ts, dashboard\utils, form\utils, legacy > components > utils [loader-optimized.ts U, loader.ts U, middleware-optimize...ts U, middleware.ts U], policy > components with LobActionMenu.tsx highlighted 9+, PolicyInformation.tsx M, ultimate-cover.tsx, constants, utils, FieldRenderer.tsx, index.ts). Status bar: aqs-web-ui, hitanshu/experimental* (dirty), 45 errors / 0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock overlay 4:49 PM 7/10/2026 — same minute as IMG_2432/2433, part of the same scroll-through session.
---
70    export default function LobActionMenu() {
176           <h3>Policy - {(policyId || '') as string}</h3>
177           <Typography
178             variant="body2"
179             sx={{
180               mb: 2,
181               color: '#00205B',
182               fontSize: '14px',
183               backgroundColor: '#E9F1FF',
184               padding: '6px',
185               fontWeight: '500',
186               display: 'inline-block',
187             }}
188           >
189             {(transactionType || '') as string}
190           </Typography>
191         </div>
192
193         <Button
194           id="pageIssue"
195           name="Issue"
196           variant="secondary"
197           onClick={() => {
198             // Navigate to issue action - let backend determine frame/route
199             smartNavigate(location.pathname, {
200               nodeKey: selectedNodeKey || sessionInfo?.nodeKey || '',
201               policyId: sessionInfo?.policyId ?? '0',
202               xmlDetail: sessionInfo?.sessionXml ?? '',
203               queryParams: {
204                 action: 'ISSUE',
205                 // Removed hardcoded frame - let backend response control routing
206               },
207             });


========== IMG_2435.md ==========
---
photo: IMG_2435.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 176-207 (sticky 70)
orientation: 180
confidence: high
notes: DUPLICATE of IMG_2434 — identical scroll position, identical visible code (lines 176-207), same tab state, same status bar, same clock (4:49 PM 7/10/2026). Appears to be a second photo taken of the exact same screen state (only the mouse/text-cursor position differs slightly). Content transcribed in full below for completeness per instructions. Sticky-scroll header at top shows line 70 ("export default function LobActionMenu() {"). Tab bar: "date.tsx 9+" and active "LobActionMenu.tsx 9+". Breadcrumb: aqs-web-ui > src > features > policy > components > LobActionMenu.tsx > ... Explorer sidebar identical to IMG_2432-2434. Status bar: aqs-web-ui, hitanshu/experimental* (dirty), 45 errors / 0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX.
---
70    export default function LobActionMenu() {
176           <h3>Policy - {(policyId || '') as string}</h3>
177           <Typography
178             variant="body2"
179             sx={{
180               mb: 2,
181               color: '#00205B',
182               fontSize: '14px',
183               backgroundColor: '#E9F1FF',
184               padding: '6px',
185               fontWeight: '500',
186               display: 'inline-block',
187             }}
188           >
189             {(transactionType || '') as string}
190           </Typography>
191         </div>
192
193         <Button
194           id="pageIssue"
195           name="Issue"
196           variant="secondary"
197           onClick={() => {
198             // Navigate to issue action - let backend determine frame/route
199             smartNavigate(location.pathname, {
200               nodeKey: selectedNodeKey || sessionInfo?.nodeKey || '',
201               policyId: sessionInfo?.policyId ?? '0',
202               xmlDetail: sessionInfo?.sessionXml ?? '',
203               queryParams: {
204                 action: 'ISSUE',
205                 // Removed hardcoded frame - let backend response control routing
206               },
207             });


========== IMG_2436.md ==========
---
photo: IMG_2436.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 197-234 (sticky 70, 197)
orientation: 180
confidence: high
notes: Sharp/clean photo. Sticky-scroll headers at top show lines 70 ("export default function LobActionMenu() {") and 197 ("onClick={() => {"). Line 213 className has a orange squiggle (lint warning, likely Tailwind class-order or unknown class rule) under "flex flex-row gap-3 my-3!" — note the trailing "!" on "my-3!" (Tailwind v4 "important" suffix syntax). Line 234 is cut off at the very bottom of the frame (only "id=\"dtaDelete\"" and the start of "name=\"Delete\"" are visible, rest occluded by the status bar). Tab bar: "date.tsx 9+" and active "LobActionMenu.tsx 9+". Breadcrumb: aqs-web-ui > src > features > policy > components > LobActionMenu.tsx > ... Explorer sidebar identical to prior photos in this series (AQS_WORKSPACE > aqs-web-ui > src > features > auth/middleware.ts, dashboard\utils, form\utils, legacy > components > utils [loader-optimized.ts U, loader.ts U, middleware-optimize...ts U, middleware.ts U], policy > components with LobActionMenu.tsx highlighted 9+, PolicyInformation.tsx M, ultimate-cover.tsx, constants, utils, FieldRenderer.tsx, index.ts). Status bar: aqs-web-ui, hitanshu/experimental* (dirty), 45 errors / 0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 4:49 PM 7/10/2026, same session as prior photos.
---
70    export default function LobActionMenu() {
197           onClick={() => {
203             queryParams: {
204               action: 'ISSUE',
205               // Removed hardcoded frame - let backend response control routing
206             },
207           });
208         }}
209       >
210         Issue
211       </Button>
212     </div>
213     <div className="flex flex-row gap-3 my-3!">
214       <Button
215         id="dtaAdd"
216         name="Add"
217         variant="tableMedium"
218         disabled={disableAdd}
219         onClick={() => navigateLobAction('ADD')}
220       >
221         Add
222       </Button>
223       <Button
224         id="dtaEdit"
225         name="Edit"
226         variant="tableMedium"
227         disabled={disableEdit}
228         onClick={() => navigateLobAction('ACTION')}
229       >
230         {editLabel}
231       </Button>
232       <Button
233         id="dtaDelete"
234         name="Delete"  ⟪?⟫ (line cut off at bottom edge of frame, rest not visible)


========== IMG_2437.md ==========
---
photo: IMG_2437.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 218-249 (sticky 70)
orientation: 180
confidence: medium
notes: Double-exposure/motion-blur photo (same artifact as IMG_2433/2436-adjacent) — two overlapping scroll positions of the same file superimposed, gutter numbers interleaved (e.g. a single visual row shows both "231" and "234", both "233" and "236", etc). Lines 218-234 overlap with and are already confirmed cleanly by IMG_2436 (Add/Edit button JSX) — not re-verified in detail here beyond confirming they match. Lines 235-249 are NEW content reconstructed with medium-high confidence: the ghosted duplicate text for the Delete button (id="dtaDelete", name, variant, disabled, onClick, Delete label, closing tag) was disentangled by pattern-matching against the already-confirmed Add button (lines 215-222) and Edit button (lines 224-231) structure in IMG_2436, which both follow the identical 8-line shape (id/name/variant/disabled/onClick/>/label/</Button>) — the Delete button follows the same shape at 233-240. Lines 241-249 (closing </div> of the flex-row button group, then two conditional {loaderData?.error ? (...) : null} / {loaderData?.warning ? (...) : null} blocks rendering <Alert> components) were reconstructed the same way by counting the 9 distinct (deduplicated) text fragments visible against the 9 gutter numbers 241-249. Content past line 249 is cut off at the bottom of the frame (a faint "<CommonData...warning ?" fragment is visible but not transcribed — insufficient confidence). Tab bar: "date.tsx 9+" and active "LobActionMenu.tsx 9+". Breadcrumb: aqs-web-ui > src > features > policy > components > LobActionMenu.tsx > ... Sidebar identical to prior photos in series. Status bar: aqs-web-ui, hitanshu/experimental* (dirty), 45 errors / 0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 4:49 PM 7/10/2026.
---
70    export default function LobActionMenu() {
218           disabled={disableAdd}
219           onClick={() => navigateLobAction('ADD')}
220         >
221           Add
222         </Button>
223         <Button
224           id="dtaEdit"
225           name="Edit"
226           variant="tableMedium"
227           disabled={disableEdit}
228           onClick={() => navigateLobAction('ACTION')}
229         >
230           {editLabel}
231         </Button>
232         <Button
233           id="dtaDelete"
234           name="Delete"
235           variant="tableMedium"
236           disabled={disableDelete}
237           onClick={() => navigateLobAction('DELETE')}
238         >
239           Delete
240         </Button>
241       </div>
242       {loaderData?.error ? (
243         <Alert severity="error" sx={{ mb: 1.5 }}>
244           {loaderData.error}
245         </Alert>
246       ) : null}
247       {loaderData?.warning ? (
248         <Alert severity="warning" sx={{ mb: 1.5 }}>
249           {loaderData.warning}


========== IMG_2438.md ==========
---
photo: IMG_2438.JPG
type: vscode-code
file: aqs-web-ui/src/features/policy/components/LobActionMenu.tsx
lines: 226-257 (sticky 70)
orientation: 180
confidence: high
notes: Sharp/clean photo. Confirms the reconstructed Delete-button block and loaderData error/warning Alert blocks guessed from the ghosted IMG_2437, and extends with new content through line 257 (end of a CommonDataGrid JSX element). Sticky-scroll header shows line 70 ("export default function LobActionMenu() {"). Tab bar: "date.tsx 9+" and active "LobActionMenu.tsx 9+". Breadcrumb: aqs-web-ui > src > features > policy > components > LobActionMenu.tsx > ... Explorer sidebar identical to prior photos in series. Status bar: aqs-web-ui, hitanshu/experimental* (dirty), 45 errors / 0 warnings, No Solution, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 4:49 PM 7/10/2026.
---
70    export default function LobActionMenu() {
226           variant="tableMedium"
227           disabled={disableEdit}
228           onClick={() => navigateLobAction('ACTION')}
229         >
230           {editLabel}
231         </Button>
232         <Button
233           id="dtaDelete"
234           name="Delete"
235           variant="tableMedium"
236           disabled={disableDelete}
237           onClick={() => navigateLobAction('DELETE')}
238         >
239           Delete
240         </Button>
241       </div>
242       {loaderData?.error ? (
243         <Alert severity="error" sx={{ mb: 1.5 }}>
244           {loaderData.error}
245         </Alert>
246       ) : null}
247       {loaderData?.warning ? (
248         <Alert severity="warning" sx={{ mb: 1.5 }}>
249           {loaderData.warning}
250         </Alert>
251       ) : null}
252       <CommonDataGrid
253         gridConfig={gridConfig}
254         data={loaderData?.pageBuild ?? fallbackGridData}
255         onRowClick={handleRowClick}
256         height={600}
257       />
