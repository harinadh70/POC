# BUNDLE for src/pages/UltimateCoverPage.tsx
# 3 photo fragment(s), ascending start-line order.


========== IMG_3017.md ==========
---
photo: IMG_3017.JPG
type: vscode-code
file: aqs-web-ui/src/pages/UltimateCoverPage.tsx
lines: 1-34
orientation: 180
confidence: high
notes: >
  New file/tab opened: UltimateCoverPage.tsx (tab bar shows "UltimateCoverPage.tsx 9+",
  unsaved/problem count marker "9+"; root.tsx tab is now closed/not in tab bar - only
  this tab shown). Breadcrumb: "aqs-web-ui > src > pages > UltimateCoverPage.tsx > ...".
  Explorer sidebar: pages folder now shows root.tsx (no longer bold/selected) and
  UltimateCoverPage.tsx highlighted/selected with badge "9+"; other pages unchanged
  (dashboard.tsx, dynamic-form-page.tsx, grid-config-example.tsx, legacy-page.tsx(U),
  lob-action-menu-page.tsx, LobGridExample.tsx(U), login.tsx, page-not-found.tsx,
  policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx(U), root.tsx,
  UltimateCoverPage.tsx(selected, "9+"), xsl-test.tsx(U)). Sharp/clean photo, no ghosting.
  Status bar: branch "hitanshu/experimental*", 18 errors/0 warnings, "No Solution",
  5:25 PM 7/10/2026 (time advanced from prior photos' 5:24 PM). Several JSX lines
  (19-23, 30-32) have red squiggly underlines (linter warnings, cause not visible).
---
```tsx
1   import { useState } from 'react';
2   import { Suspense } from 'react';
3   import { Loader } from '@components/loader';
4   import { useLoaderData } from 'react-router';
5   import { TabContextProvider } from '@providers/tab-context-provider';
6   import UltimateCover from '@/features/policy/components/ultimate-cover';
7   import { getItem } from '@utils/session-storage';
8   import { isEmpty } from 'lodash-es';
9   import { Typography } from '@mui/material';
10
11  export default function UltimateCoverPage() {
12      const loaderData = useLoaderData() as any;
13      const [loading] = useState(false);
14
15      const policyId = getItem<Record<string, unknown>>('aqs:global-variables', {})?.mstrPolicyID;
16
17      if (loading)
18          return (
19              <Suspense fallback={<Loader />}>
20                  <main className="p-4 md:p-6">
21                      <Loader />
22                  </main>
23              </Suspense>
24          );
25
26      if (isEmpty(loaderData?.pageBuild)) return null;
27
28      return (
29          <TabContextProvider>
30              <div className="grid grid-cols-4 gap-x-2 items-start w-full h-full">
31                  <div className="col-span-1 py-4! px-8! relative h-full bg-[#F9F7F0] min-h-175 ">
32                      <h1 className="text-[16px] font-semibold text-left text-[#00205B] ">
33                          Ultimate Cover
34                      </h1>
```


========== IMG_3018.md ==========
---
photo: IMG_3018.JPG
type: vscode-code
file: aqs-web-ui/src/pages/UltimateCoverPage.tsx
lines: 11-44
orientation: 180
confidence: high
notes: >
  Same tab as IMG_3017 (UltimateCoverPage.tsx), scrolled down slightly to reveal the rest
  of the file (lines 34-44 are new; 11-33 repeat IMG_3017 content and are omitted here -
  see IMG_3017 for lines 1-33 verbatim). Sharp/clean photo, no ghosting. Line 44 ");" is
  the last line visible in frame; a closing "}" for the function likely follows just
  below but is not captured. A vertical-bar cursor/column-selection glyph appears near
  line 35 ("Policy - {(policyId..."), not part of the code text. Explorer sidebar:
  UltimateCoverPage.tsx selected with badge "9+", root.tsx now shown above it (no longer
  bold). Status bar: branch "hitanshu/experimental*", 18 errors/0 warnings, "No Solution",
  5:25 PM 7/10/2026.
---
```tsx
11  export default function UltimateCoverPage() {
    (lines 12-33 repeat IMG_3017 - see that transcript)
34      <Typography className="policy-id-no">
35          Policy - {(policyId || '') as string}
36      </Typography>
37
38      </div>
39      <div className="col-span-3 px-8! p-4! customGridWrapper">
40          <UltimateCover />
41
42      </div>
43  </TabContextProvider>
44  );
```


========== IMG_3019.md ==========
---
photo: IMG_3019.JPG
type: vscode-code
file: aqs-web-ui/src/pages/UltimateCoverPage.tsx
lines: 11-46
orientation: 180
confidence: high
notes: >
  Same tab as IMG_3017/IMG_3018 (UltimateCoverPage.tsx), scrolled so the end of the file
  is visible (sticky-scroll pins "11 export default function UltimateCoverPage() {" and
  "return (" at top). Confirms this is the end of the file: line 44 ");" line 45 "}"
  (closing the function), line 46 blank/EOF. Content for lines 28-44 duplicates
  IMG_3018 exactly (omitted here - see IMG_3018 for verbatim text of 28-44); only the
  newly-confirmed lines 45-46 are added. Sharp/clean photo, no ghosting. Explorer
  sidebar: pages list reordered slightly (UltimateCoverPage.tsx still selected with
  badge "9+"; policy-details.tsx and PolicyInformationPage.tsx now appear above
  prp-mlc-sum.tsx/root.tsx in the list - same file set as before, order shuffled).
  Status bar: branch "hitanshu/experimental*", 18 errors/0 warnings, "No Solution",
  5:25 PM 7/10/2026.
---
```tsx
11  export default function UltimateCoverPage() {
        return (
    (lines 28-44 repeat IMG_3018 verbatim - see that transcript)
44          );
45      }
46
```
