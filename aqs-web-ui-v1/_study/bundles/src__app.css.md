# BUNDLE for src/app.css
# 7 photo fragment(s), ascending start-line order.


========== IMG_4270.md ==========
---
photo: IMG_4270.JPG
type: vscode-code
file: aqs-web-ui/src/app.css
lines: 1-27
orientation: 180
confidence: high
notes: Clean/sharp photo, no motion blur. Breadcrumb: aqs-web-ui > src > app.css. Explorer sidebar (src/utils, expanded) shows: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...(truncated), url-helpers.ts, user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts (no longer has "5" badge visible — problems count not shown next to it here), then below utils/: app.css (active/highlighted, no unsaved dot), app.tsx, context.ts, main.tsx, routes.tsx, store.ts, t...(cut off at bottom, likely types.ts). Tab bar: only "app.css" open (no dot = saved). Window title bar shows "w00w11dev0067" (machine name) at very top. Status bar: "No Solution", 2 errors / 0 warnings, "Activating Extensions...", branch "hitanshu/experimental*" (dirty), Ln 1 Col 1, CSS language mode. This is the app's global stylesheet — imports Tailwind, Google Fonts (Roboto, Raleway), CSS reset, root font variables, and input font override.
---
1   @import 'tailwindcss';
2
3   /* Import Roboto */
4   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
5
6   /* Import Raleway */
7   @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;700&display=swap');
8
9   *,
10  *::after,
11  *::before {
12      padding: 0;
13      margin: 0;
14      box-sizing: border-box;
15  }
16
17  :root {
18      --font-raleway: 'Raleway', sans-serif;
19      --font-roboto: 'Roboto', sans-serif;
20  }
21
22  /* 👉 Inputs use ROBOTO */
23  input,
24  select,
25  textarea {
26      font-family: var(--font-roboto) !important;
27      font-size: 14px !important;


========== IMG_4271.md ==========
---
photo: IMG_4271.JPG
type: vscode-code
file: aqs-web-ui/src/app.css
lines: 9-34
orientation: 180
confidence: medium
notes: Motion-blur/double-exposure artifact (screen mid-scroll-animation), similar to IMG_4268/4269 but in a CSS file. Transcribed from the bright/in-focus text layer, cross-checked line-by-line against the gutter numbers; the fainter offset ghost layer (pre-scroll afterimage) was discarded. Content for lines 9-29 exactly matches IMG_4270 (same file, scrolled down slightly), confirming accuracy. New content beyond IMG_4270: lines 30-34 (body rule using Raleway font). Explorer sidebar unchanged; app.css active/highlighted (no unsaved dot). Tab bar: only "app.css" open. Status bar: "No Solution", 2 errors / 0 warnings, "Activating Extensions...", branch "hitanshu/experimental*" (dirty). Window title bar shows machine name "w00w11dev0067".
---
9   *,
10  *::after,
11  *::before {
12      padding: 0;
13      margin: 0;
14      box-sizing: border-box;
15  }
16
17  :root {
18      --font-raleway: 'Raleway', sans-serif;
19      --font-roboto: 'Roboto', sans-serif;
20  }
21
22  /* 👉 Inputs use ROBOTO */
23  input,
24  select,
25  textarea {
26      font-family: var(--font-roboto) !important;
27      font-size: 14px !important;
28  }
29
30  /* 👉 Body + buttons use Raleway */
31  body {
32      width: 100%;
33      font-family: var(--font-raleway);
34  }


========== IMG_4272.md ==========
---
photo: IMG_4272.JPG
type: vscode-code
file: aqs-web-ui/src/app.css
lines: 25-51
orientation: 180
confidence: medium
notes: Motion-blur/double-exposure artifact again (screen mid-scroll), but bright layer is clearly legible after zoom. Lines 25-34 match content already seen in IMG_4270/4271 (textarea/body rules), confirming continuity. New content: lines 36-51. Line 37 is a bare, unprefixed selector "typography," (no leading dot, verified by close zoom — not ".typography") styled the same as "body," and "button {" on adjacent lines — likely a custom element/component tag name rather than a class. .dashIcon block uses a color swatch preview (small colored square) before "#00205b". Explorer sidebar unchanged; app.css active/highlighted. Tab bar: only "app.css" open. Status bar: "No Solution", 2 errors / 0 warnings, "Activating Extensions...", branch "hitanshu/experimental*" (dirty). Window title bar shows machine name "w00w11dev0067".
---
25  textarea {
26      font-family: var(--font-roboto) !important;
27      font-size: 14px !important;
28  }
29
30  /* 👉 Body + buttons use Raleway */
31  body {
32      width: 100%;
33      font-family: var(--font-raleway);
34  }
35
36  body,
37  typography,
38  button {
39      font-family: var(--font-raleway);
40  }
41
42  .dashIcon {
43      background-color: ⟦swatch⟧ #00205b;
44      min-height: 135px;
45      padding: 2.5rem;
46      transition: opacity 200ms;
47  }
48
49  .dashIcon:hover {
50      opacity: 0.8;
51  }


========== IMG_4273.md ==========
---
photo: IMG_4273.JPG
type: vscode-code
file: aqs-web-ui/src/app.css
lines: 31 (sticky) / 39-61 (main viewport)
orientation: 180
confidence: medium
notes: Severe motion-blur/double-exposure artifact — TWO scroll positions (offset by exactly 3 lines) are superimposed throughout the visible viewport, so most gutter rows show two overlapping line numbers and two overlapping pieces of text. Reconstructed the true sequential content by cross-referencing each line's text where it appears in BOTH of its expected overlapping positions (each real line appears twice, 3 rows apart, because the two blended exposures are 3 lines apart in scroll position) — the two independent readings for lines 53, 54, 55, 56, 57 agreed with each other, giving confidence in the reconstruction despite the artifact. Lines 39-51 corroborate content already captured cleanly in IMG_4272 (.dashIcon block etc.), which further validates the method. Lines 60 and beyond (.MuiPickersInputBase-root block contents, e.g. a "border-radius: 0px !important;" fragment glimpsed at the very bottom) are cut off by the taskbar/status bar overlay and not reliably legible — marked accordingly. Sticky scroll header shows line 31 "body {" pinned (unusual for flat CSS with no nesting, but that's what VS Code displayed). Explorer sidebar unchanged; app.css active/highlighted. Status bar: "No Solution", 2 errors / 0 warnings, "Activating Extensions...", branch "hitanshu/experimental*" (dirty). Window title bar shows machine name "w00w11dev0067".
---
Sticky scroll (pinned):
31  body {

Main visible code (reconstructed from overlapping double-exposure, cross-validated where each line appeared twice):
39          font-family: var(--font-raleway);
40      }
41
42      .dashIcon {
43          background-color: ⟦swatch⟧ #00205b;
44          min-height: 135px;
45          padding: 2.5rem;
46          transition: opacity 200ms;
47      }
48
49      .dashIcon:hover {
50          opacity: 0.8;
51      }
52
53      .MuiFormHelperText-root {
54          display: none;
55      }
56      .MuiInputBase-input,
57      .MuiInputBase-root {
58          padding: 1px 5px !important;
59      }
60
61      .MuiPickersInputBase-root {
62          ⟪?⟫ (likely "border-radius: 0px !important;" — glimpsed but obscured by taskbar/status bar, not reliably legible)


========== IMG_4274.md ==========
---
photo: IMG_4274.JPG
type: vscode-code
file: aqs-web-ui/src/app.css
lines: 42 (sticky) / 47-69 (main viewport)
orientation: 180
confidence: medium
notes: Same double-exposure/motion-blur artifact as IMG_4273 (two scroll positions ~3 lines apart superimposed). Lines 47-59 strongly corroborate content already established in IMG_4272/4273 (.dashIcon, .dashIcon:hover, .MuiFormHelperText-root, .MuiInputBase-input/.MuiInputBase-root). Lines 61-69 were initially ambiguous from this photo alone but have been CONFIRMED against the much sharper IMG_4275 (same file, scrolled slightly further, minimal blur), which cleanly shows lines 61-88 including this exact region — two commented-out MUI override blocks (.MuiPickersSectionList-root, .MuiFormControl-root) followed by ".dialogWrapper .policy-field {". Confidence raised to medium (limited by the blur in THIS photo) now that the content is cross-verified. Sticky scroll header shows line 42 ".dashIcon {" pinned. Explorer sidebar unchanged; app.css active/highlighted. Status bar: "No Solution", 2 errors / 0 warnings, branch "hitanshu/experimental*" (dirty). Window title bar shows machine name "w00w11dev0067".
---
Sticky scroll (pinned):
42  .dashIcon {

Main visible code:
47      }
48          padding: 2.5rem;
49          transition: opacity 200ms;
50      .dashIcon:hover {
51          opacity: 0.8;
52      }
53      .MuiFormHelperText-root {
54          display: none;
55      }
56      .MuiInputBase-input,
57      .MuiInputBase-root {
58          padding: 1px 5px !important;
59      }
60
61      .MuiPickersInputBase-root {
62          border-radius: 0px !important;
63          max-height: 28px;
64      }
65      /* .MuiPickersSectionList-root {
66          padding: 0px !important;
67      } */
68      /* .MuiFormControl-root {
69          position: relative;
    (line 69 continues per IMG_4275: 70 "left: 10px;", 71 "} */", 72 ".dialogWrapper .policy-field {" — see IMG_4275 for lines 70+, not reliably visible in this photo)


========== IMG_4275.md ==========
---
photo: IMG_4275.JPG
type: vscode-code
file: aqs-web-ui/src/app.css
lines: 61-88
orientation: 180
confidence: high
notes: Sharp/clean photo (minimal ghosting compared to IMG_4272-4274, only a faint one-line echo near the very top which doesn't obscure anything since content was already confirmed from prior photos). This photo resolves the ambiguous region from IMG_4274: confirms two commented-out MUI override blocks (.MuiPickersSectionList-root, .MuiFormControl-root) followed by real rules for .dialogWrapper .policy-field, .dialogWrapper .policy-field .formLabel, .dialogForm, and .dialogForm .grid. Explorer sidebar unchanged; app.css active/highlighted. Status bar: "No Solution", 2 errors / 0 warnings, branch "hitanshu/experimental*" (dirty). Window title bar shows machine name "w00w11dev0067". Line 88 is the last line visible before the status bar cuts it off (its trailing content may continue further, not visible in this photo).
---
61  .MuiPickersInputBase-root {
62      border-radius: 0px !important;
63      max-height: 28px;
64  }
65  /* .MuiPickersSectionList-root {
66      padding: 0px !important;
67  } */
68  /* .MuiFormControl-root {
69      position: relative;
70      left: 10px;
71  } */
72  .dialogWrapper .policy-field {
73      position: relative !important;
74      top: 0 !important;
75      left: 0 !important;
76      align-items: center !important;
77      gap: 30px !important;
78  }
79  .dialogWrapper .policy-field .formLabel {
80      font-weight: 700;
81  }
82  .dialogForm {
83      min-height: auto !important;
84  }
85  .dialogForm .grid {
86      left: 70px !important;
87      position: relative;
88      top: -70px !important;


========== IMG_4276.md ==========
---
photo: IMG_4276.JPG
type: vscode-code
file: aqs-web-ui/src/app.css
lines: 72-93
orientation: 180
confidence: high
notes: Lines 72-88 have a motion-blur/double-exposure artifact (same as IMG_4272-4274) but this content was already confirmed at high confidence from the sharp IMG_4275 photo of the same file — reused/cross-validated here. Lines 89-93 are new and clearly legible (little to no ghosting near the bottom of this photo). Line 93 (blank) appears to be the end of the file — the outline/explorer view and the tab show no further content, and this matches file length expectations for app.css. Explorer sidebar unchanged; app.css active/highlighted. Status bar: "No Solution", 2 errors / 0 warnings, branch "hitanshu/experimental*" (dirty). Window title bar shows machine name "w00w11dev0067". zod-error-formatter.ts in the sidebar no longer shows a "5" problems badge in this photo (was 5 in IMG_4266-4269) — unclear if fixed or just not rendered in this view.
---
72  .dialogWrapper .policy-field {
73      position: relative !important;
74      top: 0 !important;
75      left: 0 !important;
76      align-items: center !important;
77      gap: 30px !important;
78  }
79  .dialogWrapper .policy-field .formLabel {
80      font-weight: 700;
81  }
82  .dialogForm {
83      min-height: auto !important;
84  }
85  .dialogForm .grid {
86      left: 70px !important;
87      position: relative;
88      top: -70px !important;
89  }
90  .customGridWrapper .css-seqwlu {
91      padding: 16px 0;
92  }
93
