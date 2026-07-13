# BUNDLE for src/constants/theme.ts
# 4 photo fragment(s), ascending start-line order.


========== IMG_2302.md ==========
---
photo: IMG_2302.JPG
type: vscode-code
file: aqs-web-ui/src/constants/theme.ts
lines: 1-34
orientation: 180
confidence: high
notes: Top of file visible (line 1 start) through line 34 (last line "WARNING: '#8E6E06'," partially cut off at the very bottom edge of the editor but legible after zoom). Each color value is preceded by a small colored square swatch icon (VS Code color decorator) rendered by the editor, not part of the source text. Explorer sidebar (aqs-web-ui/src) shows: components (header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx [U], radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx [U]), config (action-config.ts, db.json), constants (asp-route-map.ts, button-matchcodes.ts, theme.ts - selected/highlighted), features, hooks, lib, pages, providers, services. Tab bar: "date.tsx 9+" and active "theme.ts". Breadcrumb: aqs-web-ui > src > constants > TS theme.ts > ... . Status bar: branch hitanshu/experimental*, "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
1    export const Theme = {
2        borders: {
3            RADIUS: 5,
4        },
5        colors: {
6            BRAND: '#00205B',
7            BRAND_CONTRAST: '#fff',
8            SUBHEADER_BG: '#E9F1FF',
9            PRIMARY_TEXT: '#00205B',
10           SECONDARY_TEXT: '#616265',
11           TERTIARY_TEXT: '#848891',
12           PRIMARY: '#00205B',
13           PRIMARY_VARIANT: '#00A0DF',
14           PRIMARY_CONTRAST: '#616265',
15           PRIMARY_DARK: '#FF9900',
16           SECONDARY: '#004E9F',
17           SECONDARY_VARIANT: '#AB9344',
18           SECONDARY_CONTRAST: '#FFF8DE',
19           TERTIARY: '#009900',
20           TERTIARY_VARIANT: '#E9EDF0',
21           TERTIARY_CONTRAST: '#CCD6DF',
22           TERTIARY_DARK: '#9AA7B3',
23           BACKGROUND: '#f8f8f8',
24           BACKGROUND_BUTTON: '#fff',
25           BACKGROUND_PAPER: '#f2f2f2',
26           DISABLED_BACKGROUND: '#CCD6DF',
27           DISABLED: '#E9EDF0',
28           DIVIDER: '#CCD6DF',
29           BORDER: '#CCD6DF',
30           BORDER_LIGHT: '#74818D',
31           BORDER_DARK: '#00205B',
32           ERROR: '#CC0000',
33           ERROR_LIGHT: '#E20033',
34           WARNING: '#8E6E06',


========== IMG_2304.md ==========
---
photo: IMG_2304.JPG
type: vscode-code
file: aqs-web-ui/src/constants/theme.ts
lines: 27-57
orientation: 180
confidence: high
notes: |
  Sticky scroll headers at top show line 1 "export const Theme = {" and line 5 "colors: {".
  Breadcrumb: aqs-web-ui > src > constants > theme.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "theme.ts".
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): components (expanded: header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx [U], radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx [U]), config (expanded: action-config.ts, db.json), constants (expanded: asp-route-map.ts, button-matchcodes.ts, theme.ts [selected/highlighted]), features (collapsed), hooks (collapsed), lib (collapsed), pages (collapsed), providers (collapsed), services (collapsed).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution" indicator, 25 errors / 0 warnings (from Problems), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Faint ghost/double-exposure overlay of the same text slightly offset visible throughout image (screen refresh artifact during photo capture) — did not affect legibility, real text is the sharper foreground layer.
  Image required 180° rotation (was upside down).
---

Sticky scroll (enclosing scope, not part of visible range but shown at top):
```
1   export const Theme = {
5     colors: {
```

Visible code:
```
27      DISABLED: '#E9EDF0',
28      DIVIDER: '#CCD6DF',
29      BORDER: '#CCD6DF',
30      BORDER_LIGHT: '#74818D',
31      BORDER_DARK: '#00205B',
32      ERROR: '#CC0000',
33      ERROR_LIGHT: '#E20033',
34      WARNING: '#8F6F06',
35      TOOLTIP_BACKGROUND: '#CCD6DF',
36      TOOLTIP_TEXT: '#0A2C6E',
37      PRIMARY_BUTTON_BG: '#00205B',
38      BUTTON_HOVER: '#004E9F',
39      PRIMARY_BUTTON_INACTIVE: '#ccc',
40      SECONDARY_BUTTON_BG: '#FFFFFF',
41      SECONDARY_BUTTON_HOVER: '#E7EEFB',
42      SECONDARY_BUTTON_INACTIVE: '#E9EDF0',
43      TABLE_BG: '#F1F3DB',
44      TABLE_ROW_HOVER: '#FFF8DE',
45      CALENDER_BG: '#E9F1FF',
46      INPUT_FIELD_FOCUS_BG: '#FFCC00',
47      popup_BG: '#DCE8EE',
48    },
49    fonts: {
50      FONT: ['raleway', 'sans-serif'],
51    },
52    fontVarients: {
53      RalewayBold: 'RalewayBold',
54      RalewayLight: 'RalewayLight',
55      RalewayMedium: 'RalewayMedium',
56      RalewaySemiBold: 'RalewaySemiBold',
57      RalewaySemiBoldItalic: 'RalewaySemiBoldItalic',
```

Notes on exact tokens:
- Line 47 key is lowercase-mixed `popup_BG` (not `POPUP_BG`), unlike neighboring keys — verbatim as shown, comma has slight gap in source rendering but is present.
- Line 52 key is `fontVarients` (misspelled, missing second "a") — verbatim as shown in source.


========== IMG_2303.md ==========
---
photo: IMG_2303.JPG
type: vscode-code
file: aqs-web-ui/src/constants/theme.ts
lines: 34-46 (approximate, see notes)
orientation: 180
confidence: low
notes: SEVERE MOTION-BLUR / DOUBLE-EXPOSURE ARTIFACT, same phenomenon as IMG_2295 — the editor was mid-scroll during the shot, so the code pane (gutter numbers and text) shows two overlapping copies of the content offset by about 3 lines throughout, making exact line-number-to-text mapping unreliable. This is a continuation of aqs-web-ui/src/constants/theme.ts past line 34 (WARNING), which was captured cleanly in IMG_2302. The key: value pairs below were reconstructed by cross-referencing the two overlapping copies visible in this photo; their exact order/line numbers are a best-effort reconstruction, not a confirmed reading — treat with caution. One value could not be resolved: WARNING re-appears in this blurred photo looking like either '#8E6E06' or '#8F6E06' (E/F ambiguous under blur) — defer to IMG_2302's sharp, high-confidence reading of '#8E6E06' for that key. The very last visible key at the bottom edge of the editor is illegible, rendered something like "DODUB_BG" or "POPUP_BG" with value '#DCE8EE' — marked ⟪?⟫, not confirmed. Explorer sidebar/tab bar/status bar unchanged from IMG_2302 (theme.ts selected under constants, branch hitanshu/experimental*, No Solution, 25 errors/0 warnings, TypeScript).
---
⟪exact line numbers unreliable due to double-exposure blur; keys below follow theme.ts colors object, continuing after line 34 "WARNING: '#8E6E06',"⟫
    TOOLTIP_BACKGROUND: '#CCD6DF',
    TOOLTIP_TEXT: '#0A2C6E',
    PRIMARY_BUTTON_BG: '#00205B',
    BUTTON_HOVER: '#004E9F',
    PRIMARY_BUTTON_INACTIVE: '#ccc',
    SECONDARY_BUTTON_BG: '#FFFFFF',
    SECONDARY_BUTTON_HOVER: '#E7EEFB',
    SECONDARY_BUTTON_INACTIVE: '#E9EDF0',
    TABLE_BG: '#F1F3DB',
    TABLE_ROW_HOVER: '#FFF8DE',
    CALENDER_BG: '#E9F1FF',
    INPUT_FIELD_FOCUS_BG: '#FFCC00',
    ⟪?⟫_BG: '#DCE8EE',


========== IMG_2305.md ==========
---
photo: IMG_2305.JPG
type: vscode-code
file: aqs-web-ui/src/constants/theme.ts
lines: 37-66
orientation: 180
confidence: high
notes: |
  Same file as IMG_2304 (theme.ts), scrolled further down; shows the end of the file (last non-empty line is 65 `};`, line 66 is blank/EOF — no more content below).
  Sticky scroll headers at top show line 1 "export const Theme = {" and line 5 "colors: {".
  Breadcrumb: aqs-web-ui > src > constants > theme.ts > ...
  Tab bar: "date.tsx 9+" (other group, dimmed) and active tab "theme.ts".
  Explorer sidebar identical to IMG_2304 (theme.ts selected/highlighted under constants).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
  Faint ghost/double-exposure overlay of same text slightly offset visible throughout (screen capture artifact); did not affect legibility.
  Image required 180° rotation (was upside down).
---

Sticky scroll (enclosing scope, not part of visible range but shown at top):
```
1   export const Theme = {
5     colors: {
```

Visible code:
```
37      PRIMARY_BUTTON_BG: '#00205B',
38      BUTTON_HOVER: '#004E9F',
39      PRIMARY_BUTTON_INACTIVE: '#ccc',
40      SECONDARY_BUTTON_BG: '#FFFFFF',
41      SECONDARY_BUTTON_HOVER: '#E7EEFB',
42      SECONDARY_BUTTON_INACTIVE: '#E9EDF0',
43      TABLE_BG: '#F1F3DB',
44      TABLE_ROW_HOVER: '#FFF8DE',
45      CALENDER_BG: '#E9F1FF',
46      INPUT_FIELD_FOCUS_BG: '#FFCC00',
47      popup_BG: '#DCE8EE',
48    },
49    fonts: {
50      FONT: ['raleway', 'sans-serif'],
51    },
52    fontVarients: {
53      RalewayBold: 'RalewayBold',
54      RalewayLight: 'RalewayLight',
55      RalewayMedium: 'RalewayMedium',
56      RalewaySemiBold: 'RalewaySemiBold',
57      RalewaySemiBoldItalic: 'RalewaySemiBoldItalic',
58      RalewayRegular: 'RalewayRegular',
59      RalewayLightItalic: 'RalewayLightItalic',
60      RalewayMediumItalic: 'RalewayMediumItalic',
61    },
62    layout: {
63      PAGE_WIDTH: 1550,
64    },
65  };
66
```

Notes: line 52 key is `fontVarients` (misspelled, verbatim). Line 65 `};` is the closing brace of the top-level `export const Theme = {...}` statement — confirms this is the end of theme.ts (66 lines total, line 66 blank).
