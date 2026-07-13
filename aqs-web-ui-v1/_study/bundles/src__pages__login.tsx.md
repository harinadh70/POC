# BUNDLE for src/pages/login.tsx
# 10 photo fragment(s), ascending start-line order.


========== IMG_2957.md ==========
---
photo: IMG_2957.JPG
type: vscode-code
file: aqs-web-ui/src/pages/login.tsx
lines: 1-34
orientation: 180
confidence: high
notes: Photo taken upside down; rotated 180 to read. Clean, sharp, no ghosting — high confidence. New file compared to prior photos in this batch (login.tsx, not LobGridExample.tsx). Explorer sidebar: AQS_WORKSPACE > aqs-web-ui > src > hooks/ (use-form-commit.ts, use-page-form.ts, use-required-field-validation....ts, use-smart-navigation.ts); lib/ (grid-normalize.ts [U]); pages/ (dashboard.tsx, dynamic-form-page.tsx, grid-config-example.tsx, legacy-page.tsx [U], lob-action-menu-page.tsx, LobGridExample.tsx [U], login.tsx [selected/highlighted, 9+ unsaved], page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]); providers/, services/ (collapsed). Tab bar: only "login.tsx 9+" visible (italic = preview tab). Breadcrumb: aqs-web-ui > src > pages > login.tsx > ... Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), 34 errors / 0 warnings (up from 23 in the LobGridExample.tsx photos — different file), red "No Solution" badge, Ln 1 Col 1, Tab Size: 4 (note: this file uses Tab Size 4, unlike LobGridExample.tsx's Spaces: 2), UTF-8, CRLF, TypeScript JSX, 5:23 PM 7/10/2026. A hover tooltip/popup is visible over lines 17-20: "JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists. ts(7026)" with action links "View Problem (Alt+F8)", "Quick Fix... (Ctrl+.)", "Fix (Ctrl+I)" — this popup occludes most of lines 19-20 (only "<mai" is visible before the tooltip on line 19). CORRECTION (informed by IMG_2958, a clean shot of this same region taken moments later): the tooltip was hiding TWO lines, not one — line 19 is `<main className="flex flex-col grow items-center justify-center p-10! bg-[#EEF9FF]! h-[calc(100vh-100...">` and line 20 is `<DisplayUserStatus />`, which pushes the `<div>` down to line 21 and every subsequent line down by 1 versus my original (uncorrected) read of this photo alone. Line numbers below reflect this correction. Right-edge minimap shows heavy orange/red/white change decorations for most of the file.
---
1  import { useState, useEffect } from 'react';
2  import { Form, useNavigation, useActionData, useLocation } from 'react-router';
3  import Button from '@mui/material/Button';
4  import TextField from '@mui/material/TextField';
5  import Tooltip from '@mui/material/Tooltip';
6  import Collapse from '@mui/material/Collapse';
7  import Alert from '@mui/material/Alert';
8  import { Typography } from '@mui/material';
9
10 // ----------------------------------------
11
12 export default function Login() {
13     const location = useLocation();
14     const navigation = useNavigation();
15
16     const isSubmitting = navigation.state === 'submitting';
17
18     return (
19         <main⟪?⟫  ⟪rest of line occluded by hover tooltip; see IMG_2958 for full text: className="flex flex-col grow items-center justify-center p-10! bg-[#EEF9FF]! h-[calc(100vh-100...⟫
20         ⟪occluded by hover tooltip; per IMG_2958 this line is: <DisplayUserStatus />⟫
21         <div className="flex items-center justify-center bg-white!">
22             <Form
23                 method="post"
24                 style={{
25                     minWidth: '450px',
26                     minHeight: '300px',
27                     display: 'flex',
28                     justifyContent: 'center',
29                     alignItems: 'center',
30                 }}
31                 className=" p-10! text-center!"
32                 key={location.key}
33                 autoComplete="off"
34                 ⟪continues, cut off at bottom of frame⟫


========== IMG_2958.md ==========
---
photo: IMG_2958.JPG
type: vscode-code
file: aqs-web-ui/src/pages/login.tsx
lines: 12, 18-49
orientation: 180
confidence: medium
notes: Photo taken upside down; rotated 180 to read. Heavy double-exposure/motion-blur ghosting throughout most of the frame (screen content appears smeared by roughly 2-3 lines, similar to IMG_2954/2956), except the top block (lines 12, 18-29) which is clean and unambiguous. This photo resolves line 19 from IMG_2957, which was occluded there by a hover tooltip: line 19 is `<main className="flex flex-col grow items-center justify-center p-10! bg-[#EEF9FF]! h-[calc(100vh-100...` (cut off at the right edge of frame, continuation not visible — marked with ⟪?⟫). It also reveals a previously-unseen line 20, `<DisplayUserStatus />`, between `<main>` and the `<div className="flex items-center justify-center bg-white!">` — this pushes every subsequent line number in this file down by 1 relative to what was inferable from IMG_2957 alone (e.g. the div is line 21 here, not 20). Lines 30-35 (the tail of the <Form> opening tag: closing `}}`, `className`, `key`, `autoComplete`, `>`, and the following `<div className="w-full">`) sit in the heaviest ghosting band; the order transcribed here (className, then key, then autoComplete) is now CONFIRMED correct by IMG_2959, a clean unghosted photo of this same region, which independently agrees with IMG_2957's reading too — three photos concur. Lines 36-49 (h6 heading, nested divs, Typography with a red-asterisk required-field span, "Username" label) are legible with only minor ghosting. Explorer sidebar: same as IMG_2957 but LobGridExample.tsx now shows only "U" (no "9+") and login.tsx shows "9+" (active/selected). Tab bar: only "login.tsx 9+" visible. Breadcrumb: aqs-web-ui > src > pages > login.tsx > ... Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), 34 errors / 0 warnings, red "No Solution" badge, Ln 1 Col 1, Tab Size: 4, UTF-8, CRLF, TypeScript JSX, 5:23 PM 7/10/2026.
---
12 export default function Login() {
...
18     return (
19         <main className="flex flex-col grow items-center justify-center p-10! bg-[#EEF9FF]! h-[calc(100vh-100⟪cut off at right edge, continuation not visible⟫
20         <DisplayUserStatus />
21         <div className="flex items-center justify-center bg-white!">
22             <Form
23                 method="post"
24                 style={{
25                     minWidth: '450px',
26                     minHeight: '300px',
27                     display: 'flex',
28                     justifyContent: 'center',
29                     alignItems: 'center',
30                 }}
31                 className=" p-10! text-center!"
32                 key={location.key}
33                 autoComplete="off"
34             >
35                 <div className="w-full">
36                     <h6 className="text-[#0A2C6E] font-semibold text-[18px] mb-6!">
37                         AQS/advantage User Login
38                     </h6>
39                     <div className="flex flex-col gap-y-4 justify-end">
40                         <div className="grid grid-cols-[70px_1fr] items-center gap-4">
41                             <Typography
42                                 variant="body1"
43                                 className="shrink-0 text-left formLabel "
44                             >
45                                 <span className="text-[#CC0000] text-2xl align-top leading-none">
46                                     *
47                                 </span>
48                                 Username
49                             </Typography>


========== IMG_2959.md ==========
---
photo: IMG_2959.JPG
type: vscode-code
file: aqs-web-ui/src/pages/login.tsx
lines: 12, 23-55
orientation: 180
confidence: high
notes: Photo taken upside down; rotated 180 to read. Clean, sharp, no ghosting — high confidence. This photo definitively confirms the <Form> prop order at lines 30-34 (closing `}}`, then `className`, then `key`, then `autoComplete`, then `>`), resolving the uncertainty noted in IMG_2958's transcript — three independent photos (IMG_2957, IMG_2958, IMG_2959) now agree on this order. Sticky-scroll header shows line 12 ("export default function Login() {"). New content past IMG_2958's line 49: a blank line, then a <Tooltip> component begins with a `title` prop containing a <span style={{ whiteSpace: 'pre-line' }}> wrapping text "name = dtaUserID" — content is cut off at the bottom of the frame after line 55 ("</span>" partial). Explorer sidebar: same as IMG_2957/2958 (login.tsx selected [9+], LobGridExample.tsx [U]). Tab bar: only "login.tsx 9+" visible (italic = preview tab). Breadcrumb: aqs-web-ui > src > pages > login.tsx > ... Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), 34 errors / 0 warnings, red "No Solution" badge, Ln 1 Col 1, Tab Size: 4, UTF-8, CRLF, TypeScript JSX, 5:23 PM 7/10/2026.
---
Sticky scroll header (pinned line showing enclosing scope):
12 export default function Login() {

Body:
23                 method="post"
24                 style={{
25                     minWidth: '450px',
26                     minHeight: '300px',
27                     display: 'flex',
28                     justifyContent: 'center',
29                     alignItems: 'center',
30                 }}
31                 className=" p-10! text-center!"
32                 key={location.key}
33                 autoComplete="off"
34             >
35                 <div className="  w-full">
36                     <h6 className="text-[#0A2C6E] font-semibold text-[18px] mb-6!">
37                         AQS/advantage User Login
38                     </h6>
39                     <div className="flex flex-col gap-y-4 justify-end ">
40                         <div className="grid grid-cols-[70px_1fr] items-center gap-4">
41                             <Typography
42                                 variant="body1"
43                                 className="shrink-0 text-left formLabel "
44                             >
45                                 <span className="text-[#CC0000] text-2xl align-top leading-none">
46                                     *
47                                 </span>
48                                 Username
49                             </Typography>
50
51                             <Tooltip
52                                 title={
53                                     <span style={{ whiteSpace: 'pre-line' }}>
54                                         name = dtaUserID
55                                     </span>⟪continues, cut off at bottom of frame⟫


========== IMG_2960.md ==========
---
photo: IMG_2960.JPG
type: vscode-code
file: aqs-web-ui/src/pages/login.tsx
lines: 12,36-69
orientation: 180
confidence: low
notes: Photo has severe motion-blur / double-exposure ghosting (screen appears to have been scrolling during the shutter) — every visual row shows two overlapping copies of text offset by ~2-3 lines, and the same code fragments appear twice at different screen positions. Line-to-content mapping below is a best-effort reconstruction from the overlapping copies (which are mutually reinforcing since they are the same underlying scroll) and confidence should be treated as low for exact line numbers 48-69; the gutter itself visibly skips from 50 to 53 (lines 51-52 not legible/possibly folded). Line 12 is a VS Code sticky-scroll header ("export default function Login() {"), pinned at top, not affected by the blur. Tab bar shows only "login.tsx 9+" (9 unsaved changes) open/highlighted in Explorer. Breadcrumb: aqs-web-ui > src > pages > login.tsx > Login. Explorer sidebar (src/pages) shows: dashboard.tsx, dynamic-form-page.tsx, grid-config-example.tsx, legacy-page.tsx [U], lob-action-menu-page.tsx, LobGridExample.tsx [U], login.tsx (selected, 9+), page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]; also providers/ and services/ (collapsed) under src. src/hooks: use-form-commit.ts, use-page-form.ts, use-required-field-validation....ts, use-smart-navigation.ts. src/lib: grid-normalize.ts [U]. Problems panel: 34 errors, 0 warnings, "No Solution". Branch hitanshu/experimental* (dirty). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX.
---
12: export default function Login() {
[... lines 13-35 not visible (scrolled out of view above) ...]
36: <h6 className="text-[#0A2C6E] font-semibold text-[18px] mb-6!">
37:   AQS/advantage User Login
38: </h6>
39: <div className="flex flex-col gap-y-4 justify-end ">
40:   <div className="grid grid-cols-[70px_1fr] items-center gap-4">
41:     <Typography
42:       variant="body1"
43:       className="shrink-0 text-left formLabel"
44:     >
45:       <span className="text-[#CC0000] text-2xl align-top leading-none">*</span>
46:       Username
47:     </Typography>
48:     <Tooltip
49:       title={
50:         <span style={{ whiteSpace: 'pre-line' }}>
[... lines 51-52 not legible (gutter skips 50→53; possibly folded or lost to blur) ...]
53:       }
54:       placement="top"
55:       arrow
56:     >
57:       <TextField
58:         size="small"
59:         type="text"
60:         id="username"
61:         name="username"
62:         fullWidth
63:         required
64:         autoFocus
65:         data-testid="Username"
66:         required
67:       />
68:     </Tooltip>
69:   </div>


========== IMG_2961.md ==========
---
photo: IMG_2961.JPG
type: vscode-code
file: aqs-web-ui/src/pages/login.tsx
lines: 12,49-78
orientation: 180
confidence: low
notes: Same severe motion-blur/double-exposure ghosting as IMG_2960 (screen scrolling during shutter, duplicate offset text throughout). This photo is a continuation further down login.tsx, overlapping IMG_2960's tail end (the Username Tooltip/TextField block) and continuing into the start of what appears to be a Password field block (Typography label with a red-asterisk span, then "Password" label cut off near the bottom by the status bar / editor pane edge before it could be read further, last legible gutter number seen was 81). Line 12 sticky-scroll header "export default function Login() {" pinned at top, same as IMG_2960. Because of the blur, exact line-number-to-content alignment for 70-78 is uncertain; treat as approximate. Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, 34 errors/0 warnings, "No Solution". Cursor appears to be a text-caret hovering mid-editor (I-beam) — likely the point where the photo was taken while user was scrolling/clicking.
---
12: export default function Login() {
[... lines 13-48 not visible (scrolled out of view above) ...]
49: </Typography>
50: <Tooltip
51: title={
52:   <span style={{ whiteSpace: 'pre-line' }}>
53:     name = dtaUserID
54:   </span>
55: }
56: placement="top"
57: arrow
58: >
59: <TextField
60:   size="small"
61:   type="text"
62:   id="username"
63:   name="username"
64:   fullWidth
65:   required
66:   autoFocus
67:   data-testid="Username"
68:   required
69: />
70: </Tooltip>
71: </div>
72: <div className="grid grid-cols-[70px_1fr] items-center gap-4">
73:   <Typography
74:     variant="body1"
75:     className="shrink-0 text-left formLabel"
76:   >
77:     <span className="text-[#CC0000] text-2xl align-top leading-none">*</span>
78:     Password
[... lines beyond ~78 not clearly legible (cut off near bottom of view / status bar), last gutter number glimpsed was 81 ...]


========== IMG_2962.md ==========
---
photo: IMG_2962.JPG
type: vscode-code
file: aqs-web-ui/src/pages/login.tsx
lines: 12,63-89
orientation: 180
confidence: low
notes: UPDATE (from later, clearer IMG_2964.md of the same file): the Button element that follows this photo's content sits at lines 94-107, not ~89 as guessed in earlier drafts of the 2962/2963 sequence — i.e. approximately 5 lines exist between line 87 (</div> closing the password grid div) and the true <Button> opening tag that this photo did not resolve (likely additional props/whitespace lost to blur). Treat the "lines" field below as approximate for 70-89; content values are believed correct, exact line numbers less so. Same file/session as IMG_2960.md (login.tsx, branch hitanshu/experimental*), scrolled further down. Severe motion-blur / double-exposure ghosting again — every row shows two overlapping copies of text offset vertically (e.g. faint "align-top"/"leading-none" fragments from the Password asterisk span bleed into the Username TextField block above it), consistent with the screen having scrolled during the shutter. Lines 63-69 are cross-referenced against IMG_2960.md (which already resolved this exact span from a less-blurred capture) and are high-confidence within this low-confidence photo; lines 70-89 are this photo's own best-effort reconstruction from the sharp/bold text layer (ghost layer suppressed all these duplicated props again: id/size/name/type/fullWidth/required/autoFocus/data-testid each appeared twice, offset ~1-3 lines, matching the pattern already documented in IMG_2960.md). Lines 90-94 (tail of <Button ...> element) are not legible — obscured by the taskbar/status bar at the bottom of the screen. Line 12 is the VS Code sticky-scroll header ("export default function Login() {"), pinned at top. Tab bar: "login.tsx 9+" (9 unsaved changes), only tab open. Breadcrumb: aqs-web-ui > src > pages > login.tsx > ... (truncated). Explorer sidebar (src/pages, unchanged from IMG_2960.md): dashboard.tsx, dynamic-form-page.tsx, grid-config-example.tsx, legacy-page.tsx [U], lob-action-menu-page.tsx, LobGridExample.tsx [U], login.tsx (selected, 9+), page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]; providers/ and services/ (collapsed) under src. src/hooks: use-form-commit.ts, use-page-form.ts, use-required-field-validation....ts, use-smart-navigation.ts. src/lib: grid-normalize.ts [U]. Problems: 34 errors, 0 warnings, "No Solution". Right-edge overview ruler densely marked red (matches the 34 errors, e.g. likely duplicate JSX attributes from the doubled "required"/"id" props). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 5:23 PM 7/10/2026.
---
12: export default function Login() {
[... lines 13-62 not visible (scrolled out of view above) ...]
63:         required
64:         autoFocus
65:         data-testid="Username"
66:         required
67:       />
68:     </Tooltip>
69:   </div>
70:   <div className="grid grid-cols-[70px_1fr] items-center gap-4">
71:     <Typography
72:       variant="body1"
73:       className="shrink-0 text-left formLabel"
74:     >
75:       <span className="text-[#CC0000] text-2xl align-top leading-none">*</span>
76:       Password
77:     </Typography>
78:     <TextField
79:       size="small"
80:       required
81:       id="password"
82:       name="password"
83:       fullWidth
84:       type="password"
85:       data-testid="Password"
86:     />
87:   </div>
88:   <div className="flex  justify-end ">
89:     <Button
[... lines 90-94 not legible (obscured by taskbar at bottom of screen) ...]


========== IMG_2963.md ==========
---
photo: IMG_2963.JPG
type: vscode-code
file: aqs-web-ui/src/pages/login.tsx
lines: 12,76-88,~94-107
orientation: 180
confidence: low
notes: Same file/session as IMG_2960.md, IMG_2962.md and IMG_2964.md (login.tsx, branch hitanshu/experimental*), scrolled slightly further down (overlaps IMG_2962.md at lines 76-88). Same severe motion-blur/double-exposure ghosting as the previous two photos in this scroll sequence. CORRECTION: this photo's own gutter numbers for the <Button> block could not be pixel-verified due to blur; IMG_2964.md (a much clearer, near-unblurred photo of the same file scrolled slightly further) independently confirms the Button block actually sits at lines 94-107 (variant="primary" at 97, </div> at 107), not 89-102 as originally estimated here from blur alone. That means ~5 lines exist between line 88 (<div className="flex justify-end">) and the <Button> element that were not resolved in this photo (likely additional Button props not visible, e.g. between </div> at 87 and <Button — content for lines 89-93 is NOT captured in this photo and is not guessed here). The content/prop VALUES below (type, fullWidth, variant, size, data-testid, className, sx, ternary children) are believed accurate verbatim per the sharp text layer and match IMG_2964.md exactly for the tail (variant onward); only the exact line-number labels for the untagged lines are corrected to align with IMG_2964.md's confirmed numbering. Line 12 is the VS Code sticky-scroll header ("export default function Login() {"), pinned at top. Tab bar: "login.tsx 9+" (9 unsaved changes). Breadcrumb: aqs-web-ui > src > pages > login.tsx > ... Explorer sidebar (src/pages, unchanged from prior photos): dashboard.tsx, dynamic-form-page.tsx, grid-config-example.tsx, legacy-page.tsx [U], lob-action-menu-page.tsx, LobGridExample.tsx [U], login.tsx (selected, 9+), page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]; providers/ and services/ (collapsed) under src. src/hooks: use-form-commit.ts, use-page-form.ts, use-required-field-validation....ts, use-smart-navigation.ts. src/lib: grid-normalize.ts [U]. Problems: 34 errors, 0 warnings, "No Solution". Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 5:23 PM 7/10/2026 (same moment as IMG_2962.JPG).
---
12: export default function Login() {
[... lines 13-75 not visible (scrolled out of view above); lines 63-75 already transcribed in IMG_2962.md ...]
76:       Password
77:     </Typography>
78:     <TextField
79:       size="small"
80:       required
81:       id="password"
82:       name="password"
83:       fullWidth
84:       type="password"
85:       data-testid="Password"
86:     />
87:   </div>
88:   <div className="flex  justify-end ">
[... <Button opening tag and its first props (type="submit", fullWidth) are not confidently captured in this photo; see IMG_2964.md lines 94-107 for the confirmed/clearer version of this whole block ...]
~97:       variant="primary"
~98:       size="large"
~99:       data-testid="Login"
~100:       className=" text-right"
~101:       sx={{
~102:         maxWidth: '120px',
~103:       }}
~104:     >
~105:       {isSubmitting ? 'Logging in...' : 'Login'}
~106:     </Button>
~107:   </div>


========== IMG_2964.md ==========
---
photo: IMG_2964.JPG
type: vscode-code
file: aqs-web-ui/src/pages/login.tsx
lines: 12,97-128
orientation: 180
confidence: high
notes: Same file/session as IMG_2960/2962/2963.md (login.tsx, branch hitanshu/experimental*), scrolled further down; continues the Button element and reveals the end of the Login() function plus a new function. Much LESS motion blur than the three preceding photos — text is sharp and this photo's line numbers are treated as ground truth (used to correct line-number estimates in IMG_2962.md/IMG_2963.md for the Button block). Line 12 is the VS Code sticky-scroll header ("export default function Login() {"), pinned at top. Tab bar: "login.tsx 9+" (9 unsaved changes), only tab open. Breadcrumb: aqs-web-ui > src > pages > login.tsx > ... Explorer sidebar (src/pages, unchanged): dashboard.tsx, dynamic-form-page.tsx, grid-config-example.tsx, legacy-page.tsx [U], lob-action-menu-page.tsx, LobGridExample.tsx [U, selected earlier but now login.tsx selected 9+], page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]; providers/ and services/ (collapsed) under src. src/hooks: use-form-commit.ts, use-page-form.ts, use-required-field-validation....ts, use-smart-navigation.ts. src/lib: grid-normalize.ts [U]. Problems: 34 errors, 0 warnings, "No Solution". Overview ruler (right edge) densely red top and bottom. Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 5:23 PM 7/10/2026. New top-level function DisplayUserStatus() begins at line 118, separated from Login() by a dashed comment divider — appears to render a TimedAlert from React Router's useActionData() error.
---
12: export default function Login() {
[... lines 13-96 not visible (scrolled out of view above); lines 63-88 covered (approximately) in IMG_2962.md/IMG_2963.md ...]
97:       variant="primary"
98:       size="large"
99:       data-testid="Login"
100:       className=" text-right"
101:       sx={{
102:         maxWidth: '120px',
103:       }}
104:     >
105:       {isSubmitting ? 'Logging in...' : 'Login'}
106:     </Button>
107:   </div>
108:   </div>
109:   </div>
110:   </Form>
111:   </div>
112:   </main>
113: );
114: }
115:
116: // ----------------------------------------
117:
118: function DisplayUserStatus() {
119:   const actionData = useActionData() as { error?: string } | undefined;
120:
121:   if (!actionData?.error) return null;
122:
123:   // By passing the error as a key, this component "re-mounts"
124:   // every time the error message changes.
125:   return <TimedAlert key={actionData.error} message={actionData.error} />;
126: }
127:
128: // ----------------------------------------


========== IMG_2965.md ==========
---
photo: IMG_2965.JPG
type: vscode-code
file: aqs-web-ui/src/pages/login.tsx
lines: 12,97-128
orientation: 180
confidence: high
notes: Near-duplicate of IMG_2964.JPG — identical scroll position and content (same editor view, same timestamp 5:23 PM 7/10/2026), minimal blur. Only visible difference: Explorer sidebar selection highlight has moved from login.tsx to LobGridExample.tsx [U] (tab bar still shows only "login.tsx 9+" open/active). See IMG_2964.md for the full transcription of this code (lines 12, 97-128) — content verified identical here. Explorer sidebar (src/pages) otherwise unchanged: dashboard.tsx, dynamic-form-page.tsx, grid-config-example.tsx, legacy-page.tsx [U], lob-action-menu-page.tsx, LobGridExample.tsx [U, now selected], login.tsx (9+), page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]. Problems: 34 errors, 0 warnings, "No Solution". Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX.
---
12: export default function Login() {
[... lines 13-96 not visible (scrolled out of view above) ...]
97:       variant="primary"
98:       size="large"
99:       data-testid="Login"
100:       className=" text-right"
101:       sx={{
102:         maxWidth: '120px',
103:       }}
104:     >
105:       {isSubmitting ? 'Logging in...' : 'Login'}
106:     </Button>
107:   </div>
108:   </div>
109:   </div>
110:   </Form>
111:   </div>
112:   </main>
113: );
114: }
115:
116: // ----------------------------------------
117:
118: function DisplayUserStatus() {
119:   const actionData = useActionData() as { error?: string } | undefined;
120:
121:   if (!actionData?.error) return null;
122:
123:   // By passing the error as a key, this component "re-mounts"
124:   // every time the error message changes.
125:   return <TimedAlert key={actionData.error} message={actionData.error} />;
126: }
127:
128: // ----------------------------------------


========== IMG_2966.md ==========
---
photo: IMG_2966.JPG
type: vscode-code
file: aqs-web-ui/src/pages/login.tsx
lines: 118-146
orientation: 180
confidence: medium
notes: Same file/session as IMG_2960/2962/2963/2964/2965.md (login.tsx, branch hitanshu/experimental*), scrolled further down past the end of DisplayUserStatus() into a new TimedAlert() component. Motion-blur/double-exposure ghosting present again (roughly a 2-line-offset ghost of the same content repeats throughout), but the sharp/bold text layer is legible and internally consistent with standard JSX/bracket-matching structure (verified via VS Code's bracket-guide colorization visible in a close crop), so confidence is medium rather than low. Lines 118-128 duplicate content already captured in IMG_2964.md (DisplayUserStatus/end of file comment divider) — included here again for continuity since they're visible in this photo too, cross-referenced against IMG_2964.md. New content is lines 129-146 (TimedAlert component body). No sticky-scroll header offset issue this time — line 118 "function DisplayUserStatus() {" is both the top visible line and appears to double as its own sticky header. Tab bar: "login.tsx 9+" (9 unsaved changes), only tab open. Breadcrumb: aqs-web-ui > src > pages > login.tsx > ... Explorer sidebar (src/pages, unchanged): dashboard.tsx, dynamic-form-page.tsx, grid-config-example.tsx, legacy-page.tsx [U], lob-action-menu-page.tsx, LobGridExample.tsx [U], login.tsx (selected, 9+), page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]; providers/ and services/ (collapsed) under src. src/hooks: use-form-commit.ts, use-page-form.ts, use-required-field-validation....ts, use-smart-navigation.ts. src/lib: grid-normalize.ts [U]. Problems: 34 errors, 0 warnings, "No Solution". Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 5:23 PM 7/10/2026.
---
118: function DisplayUserStatus() {
119:   const actionData = useActionData() as { error?: string } | undefined;
120:
121:   if (!actionData?.error) return null;
122:
123:   // By passing the error as a key, this component "re-mounts"
124:   // every time the error message changes.
125:   return <TimedAlert key={actionData.error} message={actionData.error} />;
126: }
127:
128: // ----------------------------------------
129:
130: function TimedAlert({ message }: { message: string }) {
131:   const [visible, setVisible] = useState(true);
132:
133:   useEffect(() => {
134:     const timer = setTimeout(() => setVisible(false), 2000);
135:     return () => clearTimeout(timer);
136:   }, []); // Runs once on mount (which happens whenever the error changes)
137:
138:   return (
139:     <Collapse in={visible}>
140:       <Alert severity="error" variant="filled" onClose={() => setVisible(false)}>
141:         {message}
142:       </Alert>
143:     </Collapse>
144:   );
145: }
146:
