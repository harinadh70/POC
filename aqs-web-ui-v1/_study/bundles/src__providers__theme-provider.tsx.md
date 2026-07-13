# BUNDLE for src/providers/theme-provider.tsx
# 37 photo fragment(s), ascending start-line order.


========== IMG_3140.md ==========
---
photo: IMG_3140.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 1-34
orientation: 180
confidence: high
notes: >
  Clean, sharp photo (no ghosting). Tab bar "theme-provider.tsx 9+" (9+ problems). Status bar:
  "15 errors, 0 warnings", "No Solution", branch "hitanshu/experimental*", workspace
  AQS_workspace. Line 4 import '@mui/x-data-grid/themeAugmentation' has red squiggle underline
  (likely unresolved import / lint warning) and line 1 '@mui/material/styles' also has a squiggle.
  Line 34 (disabledBackground) is cut off/obscured by the VS Code status bar at the very bottom of
  the viewport in this shot; confirmed via a separate crop of the top edge of the paired
  upside-down original photo (before rotation, this same line appears near the top edge, less
  obstructed) reading "disabledBackground: Theme.colors.DISABLED_BACKGROUND" — trailing comma
  confirmed via IMG_3141 (same file, scrolled slightly further, shows line 34 in full). Explorer
  sidebar: pages (login.tsx, page-not-found.tsx,
  policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx (U), root.tsx,
  UltimateCoverPage.tsx, xsl-test.tsx (U)); providers (browser-commands-provide...,
  dialog-provider.tsx, form-provider.tsx, global-variable-provider.tsx, tab-context-provider.tsx,
  theme-provider.tsx [selected, "9+"]); services (lob-action-menu.ts, navigation.ts,
  page-build.ts, user-data.ts, xml-server-call.ts); types, utils. Right-side minimap shows dense
  red error markers clustered near the bottom of the file. Timestamp 6:13 PM 7/10/2026.
---
1   import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
2   import { createTheme } from '@mui/material/styles';
3   import { Theme } from '@/constants/theme';
4   import '@mui/x-data-grid/themeAugmentation';
5
6   // types
7   import type { ReactNode } from 'react';
8
9   // ----------------------------------------
10
11  const theme = createTheme({
12      typography: {
13          fontFamily: Theme.fonts.FONT.toString(),
14      },
15      palette: {
16          brand: {
17              main: Theme.colors.BRAND,
18              contrastText: Theme.colors.BRAND_CONTRAST,
19          },
20          brandComplement: {
21              main: Theme.colors.BRAND,
22              contrastText: Theme.colors.BRAND_CONTRAST,
23          },
24          primary: {
25              main: Theme.colors.PRIMARY,
26              contrastText: Theme.colors.PRIMARY_CONTRAST,
27          },
28          secondary: {
29              main: Theme.colors.SECONDARY,
30              contrastText: Theme.colors.SECONDARY_CONTRAST,
31          },
32          action: {
33              disabled: Theme.colors.DISABLED,
34              disabledBackground: Theme.colors.DISABLED_BACKGROUND,


========== IMG_3141.md ==========
---
photo: IMG_3141.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 1-36
orientation: 180
confidence: medium
notes: >
  Same file/tab as IMG_3140 ("theme-provider.tsx 9+"), captured mid-scroll with heavy motion-blur
  double-exposure — two overlapping scroll frames of the same content are superimposed (offset by
  a few lines), making line-by-line gutter-to-text mapping unreliable across most of the file.
  Body text for lines 1-34 is identical to IMG_3140 (verified clean/sharp there) and is repeated
  here for continuity. This photo's value-add is the bottom of the palette.action block, which was
  cut off in IMG_3140: a clean, unambiguous crop of the lower-right portion of this photo shows (in
  order) "disabled: Theme.colors.DISABLED," / "disabledBackground: Theme.colors.DISABLED_BACKGROUND,"
  (confirms trailing comma left uncertain in IMG_3140) / "hover: Theme.colors.SECONDARY_VARIANT," /
  "}," — i.e. lines 33-36, closing the `action` object. Status bar: "15 errors, 0 warnings",
  "No Solution", branch "hitanshu/experimental*", workspace AQS_workspace. Sidebar shows services
  folder fully expanded (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts,
  xml-server-call.ts) below providers. Timestamp 6:13 PM 7/10/2026 (same minute as IMG_3140).
---
1   import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
2   import { createTheme } from '@mui/material/styles';
3   import { Theme } from '@/constants/theme';
4   import '@mui/x-data-grid/themeAugmentation';
5
6   // types
7   import type { ReactNode } from 'react';
8
9   // ----------------------------------------
10
11  const theme = createTheme({
12      typography: {
13          fontFamily: Theme.fonts.FONT.toString(),
14      },
15      palette: {
16          brand: {
17              main: Theme.colors.BRAND,
18              contrastText: Theme.colors.BRAND_CONTRAST,
19          },
20          brandComplement: {
21              main: Theme.colors.BRAND,
22              contrastText: Theme.colors.BRAND_CONTRAST,
23          },
24          primary: {
25              main: Theme.colors.PRIMARY,
26              contrastText: Theme.colors.PRIMARY_CONTRAST,
27          },
28          secondary: {
29              main: Theme.colors.SECONDARY,
30              contrastText: Theme.colors.SECONDARY_CONTRAST,
31          },
32          action: {
33              disabled: Theme.colors.DISABLED,
34              disabledBackground: Theme.colors.DISABLED_BACKGROUND,
35              hover: Theme.colors.SECONDARY_VARIANT,
36          },


========== IMG_3142.md ==========
---
photo: IMG_3142.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 11-52
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3140/3141 ("theme-provider.tsx 9+"), scrolled further down. Three-level
  sticky scroll pinned at top: line 11 "const theme = createTheme({", line 15 "palette: {", line
  20 "brandComplement: {" (a divider line separates these pinned headers from the live scrolled
  viewport). Actual scrolled content resumes at line 22 (line 21 "main: Theme.colors.BRAND," is
  hidden behind the sticky headers, consistent with IMG_3141's reading of that line). Faint
  ghosting/double-exposure visible but much lighter than IMG_3136/3137/3141 — line numbers and text
  are legible and consistent throughout. New content beyond IMG_3140/3141: error block (lines
  37-41: light/main/contrastText all using Theme.colors.ERROR / ERROR_LIGHT), warning block (lines
  42-44), divider (line 46), and start of border block (lines 48-52: main, light, dark, veryLight).
  Status bar: "15 errors, 0 warnings", "No Solution", branch "hitanshu/experimental*", workspace
  AQS_workspace. Sidebar unchanged (theme-provider.tsx selected, "9+"; services folder with
  lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts; types, utils
  below). Minimap shows dense red error markers concentrated mid-file. Timestamp 6:13 PM 7/10/2026.
---
11      const theme = createTheme({
15          palette: {
20              brandComplement: {
22                  contrastText: Theme.colors.BRAND_CONTRAST,
23              },
24              primary: {
25                  main: Theme.colors.PRIMARY,
26                  contrastText: Theme.colors.PRIMARY_CONTRAST,
27              },
28              secondary: {
29                  main: Theme.colors.SECONDARY,
30                  contrastText: Theme.colors.SECONDARY_CONTRAST,
31              },
32              action: {
33                  disabled: Theme.colors.DISABLED,
34                  disabledBackground: Theme.colors.DISABLED_BACKGROUND,
35                  hover: Theme.colors.SECONDARY_VARIANT,
36              },
37              error: {
38                  light: Theme.colors.ERROR_LIGHT,
39                  main: Theme.colors.ERROR,
40                  contrastText: Theme.colors.ERROR,
41              },
42              warning: {
43                  main: Theme.colors.WARNING,
44              },
45
46              divider: Theme.colors.DIVIDER,
47
48              border: {
49                  main: Theme.colors.BORDER,
50                  light: Theme.colors.BORDER_LIGHT,
51                  dark: Theme.colors.DIVIDER,
52                  veryLight: Theme.colors.BORDER,


========== IMG_3143.md ==========
---
photo: IMG_3143.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 11-63
orientation: 180
confidence: medium
notes: >
  Same file/tab as IMG_3140/3141/3142 ("theme-provider.tsx 9+"), scrolled further down. Three-level
  sticky scroll pinned at top: line 11 "const theme = createTheme({", line 15 "palette: {", line 32
  "action: {" — actual scrolled content resumes at line 33. Moderate ghosting/double-exposure
  throughout (fainter duplicate of each line offset down by a few lines) but line numbers/text
  mostly legible and cross-consistent with IMG_3142 for the overlapping range (33-52). New content
  beyond IMG_3142: text block (54-56: primary: Theme.colors.PRIMARY_TEXT), closing of palette
  object (57), shape block (58-60: borderRadius: Theme.borders.RADIUS), and start of components
  block (61-63). Lines 61-63 are at the very bottom edge of the screen, partly obscured by the OS
  taskbar/status bar — confirmed via a crop of the corresponding top-edge region of the paired
  upside-down original photo: line 61 "components: {", line 62 "MuiFormHelperText: {" with what
  appears to be a nested "'error': {" also on/near that line, line 63 "styleOverrides: {" (text cut
  off at right edge, exact structure/nesting of 62-63 not fully certain — marked low-confidence).
  Status bar: "15 errors, 0 warnings", "No Solution", branch "hitanshu/experimental*", workspace
  AQS_workspace. Sidebar unchanged; types folder has unsaved-change dot. Timestamp 6:13 PM
  7/10/2026. UPDATE: lines 62-63 structure confirmed via IMG_3144 (same file, scrolled slightly
  further, sharper capture) — line 62 is "MuiFormHelperText: {" and line 63 is
  "styleOverrides: {" (nesting continues root/'&.Mui-error' on lines 64-65 per IMG_3144);
  corrected below, confidence raised to high for lines 61-63.
---
11      const theme = createTheme({
15          palette: {
32              action: {
33                  disabled: Theme.colors.DISABLED,
34                  disabledBackground: Theme.colors.DISABLED_BACKGROUND,
35                  hover: Theme.colors.SECONDARY_VARIANT,
36              },
37              error: {
38                  light: Theme.colors.ERROR_LIGHT,
39                  main: Theme.colors.ERROR,
40                  contrastText: Theme.colors.ERROR,
41              },
42              warning: {
43                  main: Theme.colors.WARNING,
44              },
45
46              divider: Theme.colors.DIVIDER,
47
48              border: {
49                  main: Theme.colors.BORDER,
50                  light: Theme.colors.BORDER_LIGHT,
51                  dark: Theme.colors.DIVIDER,
52                  veryLight: Theme.colors.BORDER,
53              },
54              text: {
55                  primary: Theme.colors.PRIMARY_TEXT,
56              },
57          },
58          shape: {
59              borderRadius: Theme.borders.RADIUS,
60          },
61          components: {
62              MuiFormHelperText: {
63                  styleOverrides: {


========== IMG_3144.md ==========
---
photo: IMG_3144.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 11-76
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3140-3143 ("theme-provider.tsx 9+"), scrolled further down. Two-level sticky
  scroll pinned at top: line 11 "const theme = createTheme({", line 15 "palette: {" — scrolled
  content resumes at 45. Heavy motion-blur double-exposure ghosting throughout (each line has a
  fainter duplicate offset ~2 rows down/left), but a tight crop of the components-block region
  (lines 61-76) isolated the sharp/foreground text cleanly, giving high confidence for the
  `components.MuiFormHelperText` / `components.MuiFormLabel` override structure — this also
  resolves the line 62-63 nesting that was uncertain in IMG_3143 (confirmed: MuiFormHelperText: {
  styleOverrides: { root: { '&.Mui-error': { ... } } } }). Lines 45-60 match IMG_3142/3143 verbatim
  (divider/border/text/shape blocks). Status bar: "15 errors, 0 warnings", "No Solution", branch
  "hitanshu/experimental*", workspace AQS_workspace. Sidebar unchanged (theme-provider.tsx
  selected, "9+"). Timestamp 6:13 PM 7/10/2026.
---
11      const theme = createTheme({
15          palette: {
46              divider: Theme.colors.DIVIDER,
48              border: {
49                  main: Theme.colors.BORDER,
50                  light: Theme.colors.BORDER_LIGHT,
51                  dark: Theme.colors.DIVIDER,
52                  veryLight: Theme.colors.BORDER,
53              },
54              text: {
55                  primary: Theme.colors.PRIMARY_TEXT,
56              },
57          },
58          shape: {
59              borderRadius: Theme.borders.RADIUS,
60          },
61          components: {
62              MuiFormHelperText: {
63                  styleOverrides: {
64                      root: {
65                          '&.Mui-error': {
66                              color: Theme.colors.ERROR,
67                              marginLeft: '0px',
68                          },
69                      },
70                  },
71              },
72              MuiFormLabel: {
73                  styleOverrides: {
74                      root: {
75                          '&.MuiFormLabel-asterisk': {
76                              color: Theme.colors.ERROR,


========== IMG_3146.md ==========
---
photo: IMG_3146.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 11-110
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3140-3145 ("theme-provider.tsx 9+"), scrolled further down. Four-level
  sticky scroll pinned at top: line 11 "const theme = createTheme({", line 61 "components: {",
  line 72 "MuiFormLabel: {", line 73 "styleOverrides: {", line 74 "root: {" — scrolled content
  resumes at line 89. Moderate ghosting present but multiple tight crops of the gutter column and
  text were cross-checked and reconciled to produce a confident, gap-free line mapping for 89-110.
  This photo resolves and corrects the tail-end guesses made in IMG_3145 for lines 89-99 (confirmed
  here: 89-91 close out MuiFormLabel's override chain, 92 starts MuiTypography, 95-97 is
  '&.montBold', 98-100 is '&.montBlue', 101-107 is '&.formLabel', 108+ starts '&.tab-heading').
  Lines 109-110 are cut off at the very bottom of the screen (status bar overlap) — only
  "fontWeight: '700'," (109) and "fontSize: '1rem'," (110, partially visible) are legible; further
  properties of '&.tab-heading' are not visible in this photo. Status bar: "15 errors, 0 warnings",
  "No Solution", branch "hitanshu/experimental*", workspace AQS_workspace. Sidebar unchanged
  (theme-provider.tsx selected, "9+"). Timestamp 6:13 PM 7/10/2026.
---
11      const theme = createTheme({
61          components: {
72              MuiFormLabel: {
73                  styleOverrides: {
74                      root: {
89                      },
90                  },
91              },
92              MuiTypography: {
93                  styleOverrides: {
94                      root: {
95                          '&.montBold': {
96                              fontWeight: '700',
97                          },
98                          '&.montBlue': {
99                              color: Theme.colors.BRAND,
100                         },
101                         '&.formLabel': {
102                             fontWeight: '500',
103                             fontSize: '0.875rem',
104                             color: Theme.colors.PRIMARY_TEXT,
105                             textWrap: 'nowrap',
106                             marginBottom: '1px',
107                         },
108                         '&.tab-heading': {
109                             fontWeight: '700',
110                             fontSize: '1rem',


========== IMG_3147.md ==========
---
photo: IMG_3147.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 11-128
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3140-3146 ("theme-provider.tsx 9+"), scrolled further down — appears to be
  the last photo in this scroll sequence through theme-provider.tsx. Three-level sticky scroll
  pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 92
  "MuiTypography: {", line 93 "styleOverrides: {", line 94 "root: {" — scrolled content resumes at
  line 101. Moderate ghosting/double-exposure throughout (each line's text has a fainter duplicate
  offset a few rows away) but a clean crop of the left gutter column confirmed an unbroken sequential
  run of line numbers 106-128, which was used to anchor the deduplicated text reading. Lines
  101-110 match IMG_3146 verbatim (already confirmed there). New content beyond IMG_3146: rest of
  '&.tab-heading' (111-113: marginBottom/color/close), '&.dashMenu' block (114-121: fontWeight,
  fontSize, paddingTop, textTransform, color, whiteSpace, close), and start of '&.policy-id-no'
  block (122-128: whiteSpace, fontSize, fontWeight, textAlign, color, marginTop). The object
  continues beyond line 128 (a further "textAlign: 'left'," and closing brace are visible at the
  very bottom edge of the screen but not gutter-numbered/confirmed, so not transcribed). Status
  bar: "15 errors, 0 warnings", "No Solution", branch "hitanshu/experimental*", workspace
  AQS_workspace. Sidebar unchanged (theme-provider.tsx selected, "9+"). Timestamp 6:13 PM 7/10/2026.
---
11      const theme = createTheme({
61          components: {
92              MuiTypography: {
93                  styleOverrides: {
94                      root: {
101                         '&.formLabel': {
102                             fontWeight: '500',
103                             fontSize: '0.875rem',
104                             color: Theme.colors.PRIMARY_TEXT,
105                             textWrap: 'nowrap',
106                             marginBottom: '1px',
107                         },
108                         '&.tab-heading': {
109                             fontWeight: '700',
110                             fontSize: '1rem',
111                             marginBottom: '0.5rem',
112                             color: Theme.colors.BRAND,
113                         },
114                         '&.dashMenu': {
115                             fontWeight: '700',
116                             fontSize: '1rem',
117                             paddingTop: '0.5rem',
118                             textTransform: 'capitalize',
119                             color: Theme.colors.PRIMARY_TEXT,
120                             whiteSpace: 'nowrap',
121                         },
122                         '&.policy-id-no': {
123                             whiteSpace: 'nowrap',
124                             fontSize: '12px',
125                             fontWeight: '400',
126                             textAlign: 'left',
127                             color: Theme.colors.PRIMARY_TEXT,
128                             marginTop: '4px',


========== IMG_3172.md ==========
---
photo: IMG_3172.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 11-473
orientation: 180
confidence: medium
notes: |
  Photo has a mild double-exposure/motion-blur ghosting effect through the editor body
  (camera shake during a slow-shutter shot while VS Code auto-scrolled) — most lines of
  code and their gutter numbers appear overlaid with a second, fainter/blurred copy offset
  ~3 lines down (an artifact only, not real duplicate content). Sticky-scroll header rows
  (11, 61, 342, 355, 433) are crisp/single. Line numbers below were initially misread during
  transcription but were cross-checked and CONFIRMED against IMG_3173, which shows the same
  file scrolled slightly further (lines 454-483 crisp, no ghosting) and overlaps this photo's
  content at lines 454-473 with an exact match, confirming the numbering used here.
  Explorer sidebar (partially visible): aqs-web-ui > src > providers > theme-provider.tsx;
  open tabs bar shows only theme-provider.tsx with "9+" unsaved/other indicator. Explorer
  tree lists pages: login.tsx, page-not-found.tsx, policy-details.tsx,
  PolicyInformationPage.tsx, prp-mlc-sum.tsx (modified "U"), root.tsx, UltimateCoverPage.tsx,
  xsl-test.tsx (modified "U"); providers: browser-commands-provider(?), dialog-provider.tsx,
  form-provider.tsx, global-variable-provider.tsx, tab-context-provider.tsx,
  theme-provider.tsx (active, "9+"); services: lob-action-menu.ts, navigation.ts,
  page-build.ts, user-data.ts, xml-server-call.ts; also types, utils folders collapsed.
  Status bar: branch hitanshu/experimental*, "No Solution", 15 errors / 0 warnings,
  TypeScript JSX, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1. Timestamp 6:14 PM 7/10/2026.
---
11: const theme = createTheme({
61:     components: {
342:        MuiButton: {
355:            variants: [
433:                style: {
                ⟪... lines 434-447 not visible, scrolled above sticky header ...⟫
448:                },
449:                '&:disabled': {
450:                    color: '⬜#b4b6b8',
451:                },
452:            },
453:            {
                    ⟪props: { variant: 'errorMedium' } line — see IMG_3173 line 453 area⟫
454:                style: {
455:                    backgroundColor: Theme.colors.ERROR,
456:                    border: `1px solid ${Theme.colors.ERROR}`,
457:                    color: Theme.colors.BRAND_CONTRAST,
458:                    fontWeight: 700,
459:                    padding: '0 3em',
460:                    '&.MuiButtonBase-root': {
461:                        fontSize: '0.875rem',
462:                        textTransform: 'none',
463:                    },
464:                    '&:hover': {
465:                        backgroundColor: Theme.colors.ERROR_LIGHT,
466:                        border: `1px solid ${Theme.colors.ERROR}`,
467:                        color: Theme.colors.ERROR,
468:                    },
469:                },
470:            },
471:            ],
472:        },
473:    },


========== IMG_3173.md ==========
---
photo: IMG_3173.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 11-483
orientation: 180
confidence: high
notes: |
  Same file/scroll session as IMG_3172, scrolled a bit further down; overlaps and confirms
  IMG_3172's line numbering for lines 454-473 exactly. Sticky-scroll header pins lines 11, 61,
  342, 355, 454 (so line 455 is hidden behind the sticky header, not visible). Lines 478-482
  show mild motion-blur ghosting (a faint blue echo of each line's own content appears ~3 rows
  above it, e.g. line 481/482's text ghosts up near lines 478/479) but the bold/sharp text is
  unambiguous and used below. Bottom of frame (line 483 and the following "declare module
  '@mui/material/styles' {" line) is compressed/dim and partly obscured by the taskbar row —
  see notes inline.
  Explorer sidebar identical to IMG_3172 (theme-provider.tsx active/highlighted, "9+" tabs
  indicator). Tab bar: only theme-provider.tsx open. Status bar: branch hitanshu/experimental*,
  "No Solution", 15 errors / 0 warnings, TypeScript JSX, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1.
  Timestamp 6:14 PM 7/10/2026.
---
11: const theme = createTheme({
61:     components: {
342:        MuiButton: {
355:            variants: [
454:                style: {
                ⟪line 455 hidden behind sticky-scroll header⟫
456:                    border: `1px solid ${Theme.colors.ERROR}`,
457:                    color: Theme.colors.BRAND_CONTRAST,
458:                    fontWeight: '700',
459:                    padding: '0 3em',
460:                    '&.MuiButtonBase-root': {
461:                        fontSize: '0.875rem',
462:                        textTransform: 'none',
463:                    },
464:                    '&:hover': {
465:                        backgroundColor: Theme.colors.ERROR_LIGHT,
466:                        border: `1px solid ${Theme.colors.ERROR}`,
467:                        color: Theme.colors.ERROR,
468:                    },
469:                },
470:            },
471:            ],
472:        },
473:    },
474: });
475:
476: declare module '@mui/material/Button' {
477:     interface ButtonPropsVariantOverrides {
478:         primary: true;
479:         secondary: true;
480:         tertiary: true;
481:         errorMedium: true;
482:         tableMedium: true;
483:     }  ⟪closing interface; possible second "}" closing the declare module block not clearly separated — cut off/dim at bottom edge before taskbar⟫
⟪next line, likely 484 or 485⟫: declare module '@mui/material/styles' {  ⟪text dim/muted with a diagnostic squiggle under the string, position obscured by the taskbar red "No Solution" bar⟫


========== IMG_3174.md ==========
---
photo: IMG_3174.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 11-502
orientation: 180
confidence: medium
notes: |
  Continues scrolling down from IMG_3173 in the same file/session. Sticky-scroll header pins
  lines 11 (const theme = createTheme({), 61 (components: {), 342 (MuiButton: {) — meaning
  lines 343-471 (the bulk of the `variants` array) are not visible in this photo, only
  reachable via the sticky header. The whole frame has the same mild double-exposure/motion
  ghosting seen in IMG_3172 (every line has a fainter echo ~3 rows offset); lines 472-474
  (the closing-brace tail of createTheme(...)) were too blurred/ambiguous to re-derive
  independently here, so they are taken as previously confirmed from the sharp/high-confidence
  IMG_3173 reading (472: },  473: },  474: });). Lines 476-483 match IMG_3173/IMG_3174 overlap
  exactly (declare module '@mui/material/Button' { interface ButtonPropsVariantOverrides).
  New content beyond IMG_3173 starts at line 484. Line 502's code text is cut off/hidden
  behind the "No Solution" status-bar badge at the bottom of the screen — not transcribed.
  Explorer sidebar/tab bar/status bar same as IMG_3172/3173 (theme-provider.tsx active,
  branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", TypeScript JSX,
  UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 6:14 PM 7/10/2026).
---
11: const theme = createTheme({
61:     components: {
342:        MuiButton: {
                ⟪... lines 343-471 not visible (variants array body), scrolled above sticky header ...⟫
472:        },       ⟪per IMG_3173 cross-reference; blurred/ambiguous in this photo⟫
473:    },           ⟪per IMG_3173 cross-reference; blurred/ambiguous in this photo⟫
474: });             ⟪per IMG_3173 cross-reference; blurred/ambiguous in this photo⟫
475:
476: declare module '@mui/material/Button' {
477:     interface ButtonPropsVariantOverrides {
478:         primary: true;
479:         secondary: true;
480:         tertiary: true;
481:         errorMedium: true;
482:         tableMedium: true;
483:     }
484: }
485:
486: declare module '@mui/material/styles' {
487:     interface TypeText {
488:         watermark: string;
489:     }
490:
491:     interface Palette {
492:         brand: Palette['primary'];
493:         brandComplement: Palette['primary'];
494:         border: Palette['primary'];
495:     }
496:
497:     interface PaletteOptions {
498:         brand: PaletteOptions['primary'];
499:         brandComplement: PaletteOptions['primary'];
500:         border: PaletteOptions['primary'];
501:     }
502: ⟪content obscured by "No Solution" status-bar badge⟫


========== IMG_3145.md ==========
---
photo: IMG_3145.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 61-99
orientation: 180
confidence: high
notes: >
  Same file/tab as IMG_3140-3144 ("theme-provider.tsx 9+"), scrolled further down. Three-level
  sticky scroll pinned at top: line 11 "const theme = createTheme({", line 61 "components: {",
  line 62 "MuiFormHelperText: {". Heavy motion-blur double-exposure (two overlapping scroll frames
  offset by several lines) throughout the body. A clean crop of the left gutter column confirmed
  exact line numbers for 63-89 (63,64, gap, 69-89 sequential — lines 65-68 are the already-known
  '&.Mui-error' block from IMG_3144, hidden here behind the sticky headers). Lines 90-99 were
  initially guessed from brace-nesting logic but have since been corrected/confirmed against
  IMG_3146 (same file, scrolled slightly further, with clean unambiguous crops of this exact
  range): 90-91 close out the '&.formLabel'/root/styleOverrides/MuiFormLabel chain, 92 opens a new
  MuiTypography override block, continuing through '&.montBold' (95-97) into '&.montBlue' (98-99,
  cut off here — continues in IMG_3146). Text content for lines 76-89 was cross-checked against a
  second sharp crop and is high-confidence. Status bar: "15 errors, 0 warnings", "No Solution",
  branch "hitanshu/experimental*", workspace AQS_workspace. Sidebar unchanged (theme-provider.tsx
  selected, "9+"). Timestamp 6:13 PM 7/10/2026.
---
11      const theme = createTheme({
61          components: {
62              MuiFormHelperText: {
63                  styleOverrides: {
64                      root: {
                            (lines 65-68: '&.Mui-error': { color: Theme.colors.ERROR, marginLeft: '0px', }, — see IMG_3144)
69                      },
70                  },
71              },
72              MuiFormLabel: {
73                  styleOverrides: {
74                      root: {
75                          '&.MuiFormLabel-asterisk': {
76                              color: Theme.colors.ERROR,
77                              fontSize: '1.4rem',
78                              verticalAlign: 'top',
79                          },
80                          '&.formLabel': {
81                              fontWeight: 500,
82                              fontSize: '0.875rem',
83                              color: Theme.colors.PRIMARY_TEXT,
84                              textWrap: 'auto',
85                              lineHeight: 1,
86                              textAlign: 'right',
87                              marginRight: '1rem',
88                          },
89                      },
90                  },
91              },
92              MuiTypography: {
93                  styleOverrides: {
94                      root: {
95                          '&.montBold': {
96                              fontWeight: '700',
97                          },
98                          '&.montBlue': {
99                              color: Theme.colors.BRAND,


========== IMG_3148.md ==========
---
photo: IMG_3148.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 114-144
orientation: 180
confidence: low
notes: Severe motion-blur/double-exposure across the entire code pane (much worse than typical shake-ghosting) — appears the camera captured the screen while it was actively scrolling, so each visual row blends the settled (crisp/bold) line with a faint smear of content from several lines further down. The left-edge gutter numbers are reliably sequential and crisp (114-121 and 129-144 confirmed via close zoom), so the line-number anchors below are trustworthy, but exact text-to-line assignment in the interior (approx. 119-137) is reconstructed best-effort from the crisper of the two overlapping layers and could be off by a line or two — treat as approximate. Sticky-scroll headers pinned above the scrolled area: 11 `const theme = createTheme({`, 61 `components: {`, 92 `MuiTypography: {`, 93 `styleOverrides: {`, 94 `root: {`. Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar (aqs-web-ui/src): pages/ (login.tsx, page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]); providers/ (browser-commands-provide..., dialog-provider.tsx, form-provider.tsx, global-variable-provider.tsx, tab-context-provider.tsx, theme-provider.tsx [selected, 9+]); services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts); types, utils folders.
---
11: const theme = createTheme({
61:     components: {
92:         MuiTypography: {
93:             styleOverrides: {
94:                 root: {
114:                     '&.dashMenu': {
115:                       paddingTop: '0.5rem',
116:                       fontWeight: '700',
117:                       textTransform: 'capitalize',
118:                       fontSize: '1rem',
119:                       color: Theme.colors.PRIMARY_TEXT,
120:                       textAlign: 'left',
121:                       whiteSpace: 'nowrap',
122:                     ⟪?⟫ },
123:                     '&.policy-id-no'⟪?⟫: {
124:                       paddingTop: '0.5rem',
125:                       fontSize: '12px',
126:                       textTransform: 'capitalize',
127:                       fontWeight: '400',
128:                       color: Theme.colors.PRIMARY_TEXT,
129:                       marginTop: '4px',
130:                     ⟪?⟫ textAlign: 'left',
131:                     ⟪?⟫ },
132:         MuiInputBase: {
133:           styleOverrides: {
134:             root: {
135:               fontSize: '0.9rem',
136:             },
137:             '&.MuiInputBase-input': {
138:               root: {
139:                 padding: '10px 12px',
140:                 fontSize: '0.9rem',
141:               },
142:               '&.MuiInputBase-input': {
143:                 '&.MuiOutlinedInput-root': {
144:                   padding: '10px 12px',
⟪?⟫: borderRadius: '0px',
⟪?⟫: },
⟪?⟫: '&:hover': {
⟪?⟫:   '&.MuiOutlinedInput-root': {
⟪?⟫:     borderRadius: '0px',
⟪?⟫:     color: Theme.colors.PRIMARY⟪?⟫,


========== IMG_3149.md ==========
---
photo: IMG_3149.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 130-160
orientation: 180
confidence: medium
notes: Photo has the same double-exposure/motion-blur ghosting seen across this batch (camera shake shifted a faint duplicate ~1 line up/right of the crisp text), but the crisp (bold, in-focus) layer is legible and internally consistent (brace nesting balances correctly), so confidence is medium rather than low. Sticky-scroll header at top shows only line 92 `MuiTypography: {` (11 and 61 from earlier scroll position no longer shown/pinned). Lines 130-132 (three closing braces) close root/styleOverrides/MuiTypography respectively before sibling `MuiInputBase` opens at 133 — inferred from brace-balance, actual gutter digits for 130-132 partly obscured by blur but consistent with this reading. Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar same as IMG_3148 (theme-provider.tsx selected under providers/).
---
130:                 },
131:             },
132:         },
133:         MuiInputBase: {
134:             styleOverrides: {
135:                 root: {
136:                     fontSize: '0.9rem',
137:                     '&.MuiInputBase-input': {
138:                         padding: '10px 12px',
139:                     },
140:                     '&.MuiOutlinedInput-root': {
141:                         borderRadius: '0px',
142:                         '&:hover': {
143:                             borderRadius: '0px',
144:                             color: Theme.colors.PRIMARY,
145:                             backgroundColor: Theme.colors.BRAND_CONTRAST,
146:                         },
147:                         '&.active': {
148:                             borderRadius: '0px',
149:                             color: Theme.colors.PRIMARY,
150:                             backgroundColor: Theme.colors.BRAND_CONTRAST,
151:                         },
152:                         '&.Mui-disabled': {
153:                             border: `0.5px solid ${Theme.colors.DISABLED}`,
154:                             backgroundColor: Theme.colors.DISABLED_BACKGROUND,
155:                             color: `${Theme.colors.SECONDARY_VARIANT} !important`,
156:                         },
157:                     },
158:                 },
159:             },
160:         },


========== IMG_3150.md ==========
---
photo: IMG_3150.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 151-178
orientation: 180
confidence: high
notes: Same double-exposure ghosting pattern as IMG_3148/3149 initially made lines 161-170 hard to pin down, but IMG_3151 (taken moments later, same file, same region, much less ghosting) shows this exact range cleanly and confirms/corrects the reading below — content for lines 151-191 cross-checked against IMG_3151 where overlapping (161-191) and matches. Sticky-scroll header at top: 11 `const theme = createTheme({`, 61 `components: {`, 133 `MuiInputBase: {`, 134 `styleOverrides: {`, 135 `root: {`. Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar unchanged (theme-provider.tsx selected under providers/).
---
151:                     },
152:                     '&.Mui-disabled': {
153:                         border: `0.5px solid ${Theme.colors.DISABLED}`,
154:                         backgroundColor: Theme.colors.DISABLED_BACKGROUND,
155:                         color: `${Theme.colors.SECONDARY_VARIANT} !important`,
156:                     },
157:                 },
158:             },
159:         },
160:     },
161:     MuiDataGrid: {
162:         styleOverrides: {
163:             root: {
164:                 '& .MuiDataGrid-mainContent': {
165:                     '& .MuiDataGrid-main': {
166:                         border: `0.5px solid ${Theme.colors.DISABLED}`,
167:                         '& .MuiDataGrid-columnHeaders': {
168:                             backgroundColor: Theme.colors.BRAND,
169:                             color: Theme.colors.BRAND_CONTRAST,
170:                             fontSize: '14px',
171:                             fontWeight: '700',
172:
173:                             '& .MuiDataGrid-columnHeader': {
174:                                 backgroundColor: Theme.colors.BRAND,
175:                                 borderBottom: 'none',
176:                                 '& .MuiDataGrid-columnHeaderTitleContainer': {
177:                                     justifyContent: 'start',
178:                                     paddingLeft: '1rem',


========== IMG_3151.md ==========
---
photo: IMG_3151.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 161-191
orientation: 180
confidence: high
notes: Much cleaner/crisper photo than IMG_3148-3150 — minimal ghosting, text matches gutter numbers cleanly. Sticky-scroll header at top: 11 `const theme = createTheme({`, 61 `components: {`. Line 172 is blank. Line 191 is the last fully visible line; line 192 (`'& .MuiDataGrid-row': {`) is cut off at the very bottom edge of the frame above the status bar and is only partially legible — not included. Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar unchanged (theme-provider.tsx selected under providers/).
---
161:         MuiDataGrid: {
162:             styleOverrides: {
163:                 root: {
164:                     '& .MuiDataGrid-mainContent': {
165:                         '& .MuiDataGrid-main': {
166:                             border: `0.5px solid ${Theme.colors.DISABLED}`,
167:                             '& .MuiDataGrid-columnHeaders': {
168:                                 backgroundColor: Theme.colors.BRAND,
169:                                 color: Theme.colors.BRAND_CONTRAST,
170:                                 fontSize: '14px',
171:                                 fontWeight: '700',
172:
173:                                 '& .MuiDataGrid-columnHeader': {
174:                                     backgroundColor: Theme.colors.BRAND,
175:                                     borderBottom: 'none',
176:                                     '& .MuiDataGrid-columnHeaderTitleContainer': {
177:                                         justifyContent: 'start',
178:                                         paddingLeft: '1rem',
179:                                     },
180:                                     '& .MuiDataGrid-menuIcon': {
181:                                         '& .MuiSvgIcon-root': {
182:                                             color: 'white',
183:                                         },
184:                                     },
185:                                 },
186:                                 '& .MuiDataGrid-filler': {
187:                                     backgroundColor: Theme.colors.BRAND,
188:                                     borderBottom: 'none',
189:                                 },
190:                             },
191:                         },


========== IMG_3152.md ==========
---
photo: IMG_3152.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 185-212
orientation: 180
confidence: high
notes: Faint 1-line double-exposure ghost throughout (consistent with the rest of this batch) but the crisp/bold layer is clearly legible and unambiguous at each line. Sticky-scroll header at top: 11 `const theme = createTheme({`, 61 `components: {`, 161 `MuiDataGrid: {`, 162 `styleOverrides: {`, 163 `root: {`. Line 198 is blank. Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar unchanged (theme-provider.tsx selected under providers/).
---
185:                                 },
186:                                 '& .MuiDataGrid-filler': {
187:                                     backgroundColor: Theme.colors.BRAND,
188:                                     borderBottom: 'none',
189:                                 },
190:                             },
191:                         },
192:                         '& .MuiDataGrid-row': {
193:                             fontWeight: 500,
194:                             ':hover': {
195:                                 backgroundColor: Theme.colors.TABLE_ROW_HOVER,
196:                             },
197:                         },
198:
199:                         '& .MuiDataGrid-cell': {
200:                             textAlign: 'left',
201:                             paddingLeft: '2rem',
202:                             paddingRight: '2rem',
203:                         },
204:                     },
205:                 },
206:             },
207:         },
208:         MuiFormControlLabel: {
209:             styleOverrides: {
210:                 root: {
211:                     '& .MuiCheckbox-root.Mui-disabled ': {
212:                         color: Theme.colors.DISABLED_BACKGROUND,


========== IMG_3153.md ==========
---
photo: IMG_3153.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 198-223
orientation: 180
confidence: high
notes: Double-exposure ghosting (~2-3 line offset shadow) throughout, worse than IMG_3152 but readable via zoomed crops using the crisp/bold layer cross-checked against the gutter digit sequence. Lines 217-223 cross-checked against IMG_3154 (taken moments later, same region, clearer) and corrected accordingly. Sticky-scroll header at top: 11 `const theme = createTheme({`, 61 `components: {`, 161 `MuiDataGrid: {`, 162 `styleOverrides: {`, 163 `root: {`. Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar unchanged (theme-provider.tsx selected under providers/).
---
198:
199:                         '& .MuiDataGrid-cell': {
200:                             textAlign: 'left',
201:                             paddingLeft: '2rem',
202:                             paddingRight: '2rem',
203:                         },
204:                     },
205:                 },
206:             },
207:         },
208:         MuiFormControlLabel: {
209:             styleOverrides: {
210:                 root: {
211:                     '& .MuiCheckbox-root.Mui-disabled ': {
212:                         color: Theme.colors.DISABLED_BACKGROUND,
213:                     },
214:                 },
215:             },
216:         },
217:         MuiTabs: {
218:             styleOverrides: {
219:                 root: {
220:                     '& .MuiButtonBase-root': {
221:                         textTransform: 'capitalize',
222:                     },
223:                     '& .MuiTabs-scroller': {


========== IMG_3154.md ==========
---
photo: IMG_3154.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 220-245
orientation: 180
confidence: medium
notes: Double-exposure ghosting (~3-4 line offset) throughout. Lines 220-229 legible with high confidence (corrects/confirms IMG_3153's tail — see note there). Lines 230-245 (MuiPaper.styleOverrides.root, covering '& .MuiPopover-paper', '& .MuiPickersLayout-root', '& .MuiPickersLayout-contentWrapper', '& .MuiButtonBase-root' selectors) were reconstructed best-effort from clearly-legible fragments (selector names, property names/values all read correctly somewhere in frame) but exact line-by-line placement for 230-233 and 243-245 in particular is uncertain due to overlapping exposures; treat that sub-range as approximate — cross-check against IMG_3155/IMG_3156 which cover the same region with partially different (also uncertain) line alignment for 243-246, converging on '& .MuiButtonBase-root' containing '&.MuiPickersDay-root' > '&.Mui-selected' > color: Theme.colors.BRAND_CONTRAST (not BORDER_DARK as tentatively shown at line 245 below). Sticky-scroll header at top: 11 `const theme = createTheme({`, 61 `components: {`, 208 `MuiFormControlLabel: {`. Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar unchanged (theme-provider.tsx selected under providers/).
---
220:                     '& .MuiButtonBase-root': {
221:                         textTransform: 'capitalize',
222:                     },
223:                     '& .MuiTabs-scroller': {
224:                         borderBottom: `1px solid ${Theme.colors.TERTIARY_CONTRAST}`,
225:                     },
226:                 },
227:             },
228:         },
229:         MuiPaper: {
230:             styleOverrides: {
231:                 root: {
232: ⟪?⟫                 fontFamily: 'var(--font-roboto) !important',
233: ⟪?⟫                 '& .MuiPopover-paper': {
234:                         fontFamily: 'var(--font-roboto) !important',
235:                         maxHeight: 'calc(100% - 264px)',
236:                         borderRadius: '10px',
237:                     },
238:                     '& .MuiPickersLayout-root': {
239: ⟪?⟫                     fontFamily: 'var(--font-roboto) !important',
240:                         borderRadius: '10px',
241:                         display: 'inline-block',
242:                         '& .MuiPickersLayout-contentWrapper': {
243:                             backgroundColor: Theme.colors.CALENDER_BG,
244:                             '& .MuiButtonBase-root': {
245: ⟪?⟫                             color: Theme.colors.BORDER_DARK,


========== IMG_3155.md ==========
---
photo: IMG_3155.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 229-257
orientation: 180
confidence: medium
notes: Severe double/triple-exposure ghosting, worse than any other photo in this batch. This range overlaps IMG_3154 (229-245) and IMG_3156 (245-257), both clearer; content and line numbers below have been cross-checked/corrected against IMG_3156 in particular, which resolved the exact gutter alignment for 245-257 via a dedicated unified crop. MuiPaper.styleOverrides.root nests '& .MuiPopover-paper', '& .MuiPickersLayout-root', '& .MuiPickersLayout-contentWrapper', '& .MuiButtonBase-root', '&.MuiPickersDay-root' / '&.Mui-selected', '& .MuiYearCalendar-root' / '& .MuiYearCalendar-button.Mui-selected', and '& .MuiMonthCalendar-root' / '& .MuiMonthCalendar-button.Mui-selected' selectors, each setting color: Theme.colors.BRAND_CONTRAST or similar. Lines 232-233 and 240 remain uncertain (see IMG_3154 note). Sticky-scroll header at top: 11 `const theme = createTheme({`, 61 `components: {`, 229 `MuiPaper: {`, 230 `styleOverrides: {`, 231 `root: {`. Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar unchanged (theme-provider.tsx selected under providers/).
---
229:         MuiPaper: {
230:             styleOverrides: {
231:                 root: {
232: ⟪?⟫             fontFamily: 'var(--font-roboto) !important',
233: ⟪?⟫             borderRadius: '10px',
234:                     '& .MuiPopover-paper': {
235:                         fontFamily: 'var(--font-roboto) !important',
236:                         maxHeight: 'calc(100% - 264px)',
237:                         borderRadius: '10px',
238:                     },
239:                     '& .MuiPickersLayout-root': {
240: ⟪?⟫                     fontFamily: 'var(--font-roboto) !important',
241:                         display: 'inline-block',
242:                         '& .MuiPickersLayout-contentWrapper': {
243:                             backgroundColor: Theme.colors.CALENDER_BG,
244:                             '& .MuiButtonBase-root': {
245:                                 '&.MuiPickersDay-root': {
246:                                     '&.Mui-selected': {
247:                                         color: Theme.colors.BRAND_CONTRAST,
248:                                     },
249:                                 },
250:                             },
251:                         },
252:                     },
253:                 },
254:                 '& .MuiYearCalendar-root': {
255:                     '& .MuiYearCalendar-button.Mui-selected': {
256:                         color: Theme.colors.BRAND_CONTRAST,
257:                     },


========== IMG_3156.md ==========
---
photo: IMG_3156.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 245-273
orientation: 180
confidence: medium
notes: Double-exposure ghosting (~3 line offset shadow) throughout, but gutter number column itself is unambiguous/sequential (245-273, verified via dedicated zoomed gutter crops) even where the code text overlaps with its own ghost. Lines 245-259 (MuiPickersDay-root/.Mui-selected, MuiYearCalendar-root/button, MuiMonthCalendar-root/button) and 267-273 (closing braces, MuiDialog opening) read with high confidence via a unified gutter+text crop. Lines 260-266 (around '& .MuiDateCalendar-root' — maxHeight/fontFamily props appear to occur twice in the frame, once crisp and once possibly a 3-line ghost of the same content, or possibly a genuine second similar selector block) could not be fully disambiguated; presented as a best-effort single occurrence but treat as approximate. Sticky-scroll header at top: 11 `const theme = createTheme({`, 61 `components: {`, 229 `MuiPaper: {`, 230 `styleOverrides: {`, 231 `root: {`. Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar unchanged (theme-provider.tsx selected under providers/).
---
245:                             '&.MuiPickersDay-root': {
246:                                 '&.Mui-selected': {
247:                                     color: Theme.colors.BRAND_CONTRAST,
248:                                 },
249:                             },
250:                         },
251:                     },
252:                 },
253:                 '& .MuiYearCalendar-root': {
254:                     '& .MuiYearCalendar-button.Mui-selected': {
255:                         color: Theme.colors.BRAND_CONTRAST,
256:                     },
257:                 },
258:                 '& .MuiMonthCalendar-root': {
259:                     '& .MuiMonthCalendar-button.Mui-selected': {
260: ⟪?⟫                     color: Theme.colors.BRAND_CONTRAST,
261: ⟪?⟫                 },
262: ⟪?⟫             },
263: ⟪?⟫             '& .MuiDateCalendar-root': {
264: ⟪?⟫                 maxHeight: '290px',
265: ⟪?⟫                 fontFamily: 'var(--font-roboto) !important',
266: ⟪?⟫             },
267:                 '& .MuiList-root': {
268:                     padding: '0',
269:                 },
270:             },
271:         },
272:     },
273:     MuiDialog: {


========== IMG_3157.md ==========
---
photo: IMG_3157.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 261-289
orientation: 180
confidence: medium
notes: Double-exposure ghosting (~2-3 line offset) throughout. Lines 267-289 legible with high confidence via tight unified crops. Lines 261-266 (around '& .MuiDateCalendar-root' with maxHeight/fontFamily) show the same recurring ambiguity seen in IMG_3155/IMG_3156 — the maxHeight/fontFamily pair appears to render twice in the frame (once crisp, once as what looks like a 2-3 line ghost or possibly a genuine near-duplicate second block); the exact line assignment for 264-266 could not be fully resolved and is presented as best-effort. MuiDialog opening at line 273 (not 271) confirmed via a dedicated tight crop, consistent with IMG_3156. Sticky-scroll header at top: 11 `const theme = createTheme({`, 61 `components: {`, 229 `MuiPaper: {`, 230 `styleOverrides: {`, 231 `root: {`. Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar unchanged (theme-provider.tsx selected under providers/).
---
261:                 '& .MuiDateCalendar-root': {
262:                     maxHeight: '290px',
263:                     fontFamily: 'var(--font-roboto) !important',
264:                 },
265: ⟪?⟫             },
266: ⟪?⟫             },
267:                 '& .MuiList-root': {
268:                     padding: '0',
269:                 },
270:             },
271:         },
272:     },
273:     MuiDialog: {
274:         styleOverrides: {
275:             root: {},
276:         },
277:     },
278:     MuiDialogContent: {
279:         styleOverrides: {
280:             root: {
281:                 display: 'flex',
282:                 justifyContent: 'start',
283:                 alignItems: 'center',
284:                 gap: '1.5rem',
285:                 '& .MuiStack-root': {
286:                     '& .MuiFormLabel-root': {
287:                         fontWeight: '700',
288:                         fontSize: '0.875rem',
289:                         color: Theme.colors.PRIMARY_TEXT,


========== IMG_3158.md ==========
---
photo: IMG_3158.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 269-297
orientation: 180
confidence: medium
notes: Double-exposure ghosting throughout. Lines 269-272 initially appeared to show a second "MuiDialog: {" block due to ghosting, but IMG_3159 (taken moments later, same region, much clearer) confirms only a single "}," sits at line 272 immediately before the one real MuiDialog opening at line 273 — the apparent duplicate was a ghost/color-blend artifact, not genuine duplicate code. Lines 269-272 are transcribed as four closing braces (exact split of which closes root/styleOverrides/MuiPaper vs. a possible blank line not fully resolved). Lines 279-297 (MuiDialogContent root through MuiTableBody-root/MuiTableRow-root/MuiTableCell-alignRight styles) read with higher confidence. VS Code shows inline color-swatch icons next to `#00205B` hex literals (lines 296-297+). Sticky-scroll header at top: 11 `const theme = createTheme({`, 61 `components: {`, 229 `MuiPaper: {`, 230 `styleOverrides: {`, 231 `root: {`. Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar unchanged (theme-provider.tsx selected under providers/). Line 297 is the last line visible in frame (content continues below, cut off).
---
269: ⟪?⟫             },
270: ⟪?⟫         },
271: ⟪?⟫     },
272: ⟪?⟫
273:     MuiDialog: {
274:         styleOverrides: {
275:             root: {},
276:         },
277:     },
278:     MuiDialogContent: {
279:         styleOverrides: {
280:             root: {
281:                 display: 'flex',
282:                 justifyContent: 'start',
283:                 alignItems: 'center',
284:                 gap: '1.5rem',
285:                 '& .MuiStack-root': {
286:                     '& .MuiFormLabel-root': {
287:                         fontWeight: '700',
288:                         fontSize: '0.875rem',
289:                         color: Theme.colors.PRIMARY_TEXT,
290:                     },
291:                 },
292:                 '& .MuiBox-root': {
293:                     width: '350px',
294:                     height: '400px',
295:                     '& .MuiTableBody-root': {
296:                         '& .MuiTableRow-root': {
297:                             borderBottom: '2px solid #00205B',


========== IMG_3159.md ==========
---
photo: IMG_3159.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 272-302
orientation: 180
confidence: high
notes: Much cleaner photo than IMG_3155-3158, minimal ghosting. Confirms/resolves ambiguity from those photos — line 272 is a single closing brace and line 273 is the one true `MuiDialog: {` opening (the apparent second "MuiDialog" seen faintly in IMG_3158 was a ghost artifact, not real duplicate code). Sticky-scroll header at top: 11 `const theme = createTheme({`, 61 `components: {`, 229 `MuiPaper: {`. Line 302 is the last line visible in frame (closing brace, closes '& .MuiBox-root'; content continues below, cut off). Status bar: aqs-web-ui, branch hitanshu/experimental*, 15 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Tab bar: only theme-provider.tsx open (9+ unsaved changes). Explorer sidebar unchanged (theme-provider.tsx selected under providers/).
---
272:             },
273:     MuiDialog: {
274:         styleOverrides: {
275:             root: {},
276:         },
277:     },
278:     MuiDialogContent: {
279:         styleOverrides: {
280:             root: {
281:                 display: 'flex',
282:                 justifyContent: 'start',
283:                 alignItems: 'center',
284:                 gap: '1.5rem',
285:                 '& .MuiStack-root': {
286:                     '& .MuiFormLabel-root': {
287:                         fontWeight: '700',
288:                         fontSize: '0.875rem',
289:                         color: Theme.colors.PRIMARY_TEXT,
290:                     },
291:                 },
292:                 '& .MuiBox-root': {
293:                     width: '350px',
294:                     height: '400px',
295:                     '& .MuiTableBody-root': {
296:                         '& .MuiTableRow-root': {
297:                             borderBottom: '2px solid #00205B',
298:                         },
299:                         '& .MuiTableCell-alignRight': {
300:                             fontFamily: 'var(--font-roboto)',
301:                         },
302:                     },


========== IMG_3160.md ==========
---
photo: IMG_3160.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 278-321
orientation: 180
confidence: low
notes: Photo has heavy motion-blur/double-exposure ghosting (editor was mid smooth-scroll when shutter fired) — a faint secondary code layer (e.g. "fontSize: '0.875rem'", "colors.PRIMARY_TEXT,", "'& .MuiBox-root': {") overlaps the sharp foreground text at different indentation; this ghost trail is NOT transcribed as it cannot be reliably attributed to real line numbers, only the sharp/in-focus text (aligned with the crisp line-number gutter) is transcribed. Line 304 (closing brace) not legible in this photo — marked ⟪?⟫; lines 305-308 cross-checked and confirmed against the clear (non-ghosted) IMG_3161 photo of the same file/scroll region, taken moments later. Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 278 "MuiDialogContent: {", line 279 "styleOverrides: {", line 280 "root: {". Tab bar: "theme-provider.tsx" active with "9+" (many other tabs open/unsaved, not individually legible). Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): pages/ (login.tsx, page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]); providers/ (browser-commands-provide..., dialog-provider.tsx, form-provider.tsx, global-variable-provider.tsx, tab-context-provider.tsx, theme-provider.tsx [selected, 9+]); services/ (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts); types/, utils/ (collapsed). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Bottom-left: branch "hitanshu/experimental*" (uncommitted changes), "No Solution" badge, ⊗15 warnings/errors indicator (15 problems, 0 warnings). Clock 6:13 PM 7/10/2026.
---
11    const theme = createTheme({
61        components: {
278           MuiDialogContent: {
279               styleOverrides: {
280                   root: {
290                       width: '350px',
291                       height: '400px',
292                       '& .MuiTableBody-root': {
293                           width: '350px',
294                           height: '400px',
295                           '& .MuiTableRow-root': {
296                               borderBottom: '2px solid #00205B',
297                               fontFamily: 'var(--font-roboto)',
298                           },
299                           '& .MuiTableCell-alignRight': {
300                               fontFamily: 'var(--font-roboto)',
301                           },
302                       },
303                   },
304                   ⟪?⟫  (closing brace, not legible in this photo)
305               },
306           },
307
308           MuiFormControl: {
309               styleOverrides: {
310                   root: {
311                       display: 'flex',
312                       flexDirection: 'row',
313                       alignItems: 'center',
314                       '& .MuiFormControlLabel-label': {
315                           fontWeight: '500',
316                           fontSize: '0.875rem',
317                           color: '#000000',
318                       },
319                       '& .MuiPickersInputBase-root': {
320                           color: '#000000',
321                           fontSize: '14px',
                        },


========== IMG_3161.md ==========
---
photo: IMG_3161.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 278-334
orientation: 180
confidence: high
notes: Sharp, clear photo (no motion blur, unlike IMG_3160 of the same file just before it). Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 278 "MuiDialogContent: {", line 279 "styleOverrides: {" — actual editor viewport content starts at line 305, confirming the MuiDialogContent block's root/styleOverrides closing braces sit at 305-306. Tab bar: "theme-provider.tsx" active, "9+" other tabs. Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): pages/ (login.tsx, page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]); providers/ (browser-commands-provide..., dialog-provider.tsx, form-provider.tsx, global-variable-provider.tsx, tab-context-provider.tsx, theme-provider.tsx [selected, 9+]); services/ (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts); types/, utils/ (collapsed). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Bottom-left: branch "hitanshu/experimental*" (uncommitted changes), "No Solution" badge, ⊗15 △0 problems indicator. Clock 6:13 PM 7/10/2026. Line 334 only shows a trailing "}" fragment cut off at the very bottom edge of the screen.
---
11    const theme = createTheme({
61        components: {
278           MuiDialogContent: {
279               styleOverrides: {
305               },
306           },
307
308           MuiFormControl: {
309               styleOverrides: {
310                   root: {
311                       display: 'flex',
312                       flexDirection: 'row',
313                       alignItems: 'center',
314                       '& .MuiFormControlLabel-label': {
315                           fontWeight: '500',
316                           fontSize: '0.875rem',
317                           color: '#000000',
318                       },
319                       '& .MuiPickersInputBase-root': {
320                           fontSize: '14px',
321
322                           '& .MuiPickersSectionList-root': {
323                               '& .MuiPickersSectionList-sectionContent ': {
324                                   fontFamily: 'var(--font-roboto)',
325                                   fontSize: '0.9rem',
326                               },
327                           },
328                           '& .MuiInputAdornment-positionEnd .MuiSvgIcon-root': {
329                               width: '18px',
330                               height: '18px',
331                               position: 'relative',
332                               right: '-5px',
333                           },
334                       ⟪?⟫  (trailing "}" fragment cut off at bottom edge of screen)


========== IMG_3162.md ==========
---
photo: IMG_3162.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 308-355
orientation: 180
confidence: medium
notes: Photo has motion-blur/double-exposure ghosting in the upper portion (lines ~327-338, editor mid-scroll) similar to IMG_3160; lower portion (339-355, MuiButton block) is sharper. Lines 327-333 duplicate/confirm content already captured sharply in IMG_3161 (same file). Only the sharp/in-focus text is transcribed; faint ghost-layer duplicate text is ignored. Bracket-nesting check: after line 338 the closing-brace count appears one or two short of what would be needed to fully close MuiFormControl (root/styleOverrides/MuiFormControl) before "MuiButton:" opens at 339 as a sibling key under `components` — flagged as uncertain, marked ⟪?⟫. NOTE: the very next photo, IMG_3163 (same file, taken moments later), shows MuiButton at line 342 instead of 339 with otherwise-identical surrounding code — i.e. the file was actively being edited between these two shots (3 lines inserted), which plausibly explains the apparent brace-count gap here rather than a misread. Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 308 "MuiFormControl: {", line 309 "styleOverrides: {", line 310 "root: {" (then content resumes at 327); further down, lines 339 "MuiButton: {", 340 "styleOverrides: {", 341 "root: {" are also sticky-pinned, with content resuming at 345 (lines 342-344 not visible, hidden behind sticky header, same pattern as IMG_3160/3161's MuiDialogContent block). Theme.colors.PRIMARY / Theme.colors.BRAND_CONTRAST are plain blue-highlighted identifiers (imported theme constants), no color-swatch box shown (unlike literal hex values elsewhere which show a swatch). Tab bar: "theme-provider.tsx" active, "9+" other tabs. Explorer sidebar unchanged from IMG_3160/3161 (theme-provider.tsx selected under providers/). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Bottom-left: branch "hitanshu/experimental*", "No Solution" badge, ⊗15 △0 problems. Clock 6:13 PM 7/10/2026. Line 355 "variants: [" cut off at bottom edge of screen.
---
11    const theme = createTheme({
61        components: {
308           MuiFormControl: {
309               styleOverrides: {
310                   root: {
327                       },
328                       '& .MuiInputAdornment-positionEnd .MuiSvgIcon-root': {
329                           width: '18px',
330                           height: '18px',
331                           position: 'relative',
332                           right: '-5px',
333                       },
334                       // '&.MuiPickersTextField-root': {
335                       //   width: '320px',
336                       // },
337                   ⟪?⟫  },
338               ⟪?⟫  },

339           MuiButton: {
340               styleOverrides: {
341                   root: {
345                       '& .MuiButton-textInherit ': {
346                           borderRadius: '1.5rem',
347                           paddingTop: '0.5rem',
348                           paddingBottom: '0.5rem',
349                           backgroundColor: Theme.colors.PRIMARY,
350                           color: Theme.colors.BRAND_CONTRAST,
351                       },
352                   },
353               },
354
355           variants: [


========== IMG_3163.md ==========
---
photo: IMG_3163.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 342-373
orientation: 180
confidence: high
notes: Photo has motion-blur/double-exposure ghosting in places (editor mid-scroll), most visibly around lines 369-373 and in the 344-345 boundary; resolved via cross-check against IMG_3164 (see below). Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 342 "MuiButton: {", line 343 "styleOverrides: {", line 344 "root: {". IMPORTANT: this photo's sticky header shows MuiButton at line 342, whereas the immediately-preceding photo IMG_3162 (same file) showed MuiButton at line 339 with otherwise near-identical downstream content (borderRadius etc. land on the same line numbers, 346 vs 346) — indicating the file was actively being edited between the two shots (net ~3 lines changed somewhere between the MuiFormControl block and MuiButton's root content). Both photos are transcribed as literally read; not reconciled into a single state. Line 345 ('& .MuiButton-textInherit ': {) is only faintly visible at the sticky-header fade boundary, lower confidence. Lines 369-373 (the '&:hover' block) were initially misaligned by one due to ghosting but have been corrected/confirmed against the sharper photo IMG_3164 (same file, taken ~1 minute later, showing the identical '&:hover' block at the same line numbers). Theme.colors.PRIMARY / Theme.colors.BRAND_CONTRAST / Theme.colors.BUTTON_HOVER are plain identifiers (imported theme constants, blue-highlighted), not literal hex values. Explorer sidebar, tab bar ("theme-provider.tsx", 9+), and status bar unchanged from IMG_3160-3162 (branch "hitanshu/experimental*", "No Solution", ⊗15 △0, 6:13 PM 7/10/2026).
---
11    const theme = createTheme({
61        components: {
342           MuiButton: {
343               styleOverrides: {
344                   root: {
345                       ⟪& .MuiButton-textInherit ': {⟫ (faint, at sticky-header fade boundary)
346                           borderRadius: '1.5rem',
347                           paddingTop: '0.5rem',
348                           paddingBottom: '0.5rem',
349                           backgroundColor: Theme.colors.PRIMARY,
350                           color: Theme.colors.BRAND_CONTRAST,
351                       },
352                   },
353               },

355               variants: [
356                   {
357                       props: { variant: 'primary' },
358                       style: {
359                           backgroundColor: Theme.colors.PRIMARY,
360                           border: `1px solid ${Theme.colors.PRIMARY}`,
361                           color: Theme.colors.BRAND_CONTRAST,
362                           borderRadius: '1.5rem',
363                           paddingX: '0.5rem',
364                           paddingY: '0.5rem',
365                           textTransform: 'capitalize',
366                           fontSize: '0.875rem',
367                           fontWeight: '500',
368                           maxHeight: '35px',
369                           '&:hover': {
370                               backgroundColor: Theme.colors.BUTTON_HOVER,
371                               border: `1px solid ${Theme.colors.BUTTON_HOVER}`,
372                               color: Theme.colors.BRAND_CONTRAST,
373                           },  (closing braces for style/variant-object/array beyond this are cut off at the bottom edge of the photo)


========== IMG_3164.md ==========
---
photo: IMG_3164.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 342-378
orientation: 180
confidence: high
notes: Mostly sharp photo; faint ghost/motion-blur duplicate text visible in places (e.g. around 358-372) but does not obscure the sharp foreground reading, which is transcribed here. Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 342 "MuiButton: {", line 343 "styleOverrides: {", line 344 "root: {" — actual content resumes at line 351 (lines 345-350 not visible, hidden behind sticky header, consistent with the MuiButton root block seen partially in IMG_3163). This photo confirms/corrects the '&:hover' block line numbers that were ambiguous in IMG_3163 (369 '&:hover': {, 370 backgroundColor, 371 border, 372 color, 373 closing brace). Theme.colors.PRIMARY / BRAND_CONTRAST / BUTTON_HOVER / TERTIARY_VARIANT / BORDER_LIGHT are plain blue-highlighted identifiers (imported theme constants); '#59646d' at line 377 is a literal hex value shown with a color-swatch box. Tab bar: "theme-provider.tsx" active, "9+" other tabs. Explorer sidebar unchanged (theme-provider.tsx selected under providers/). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Bottom-left: branch "hitanshu/experimental*", "No Solution" badge, ⊗15 △0 problems. Clock now 6:14 PM 7/10/2026 (one minute later than IMG_3160-3163's 6:13 PM). Line 378 "}," cut off at very bottom edge of screen.
---
11    const theme = createTheme({
61        components: {
342           MuiButton: {
343               styleOverrides: {
344                   root: {
351                       },
352                   },
353               },
354
355               variants: [
356                   {
357                       props: { variant: 'primary' },
358                       style: {
359                           backgroundColor: Theme.colors.PRIMARY,
360                           border: `1px solid ${Theme.colors.PRIMARY}`,
361                           color: Theme.colors.BRAND_CONTRAST,
362                           borderRadius: '1.5rem',
363                           paddingX: '0.5rem',
364                           paddingY: '0.5rem',
365                           textTransform: 'capitalize',
366                           fontSize: '0.875rem',
367                           fontWeight: '500',
368                           maxHeight: '35px',
369                           '&:hover': {
370                               backgroundColor: Theme.colors.BUTTON_HOVER,
371                               border: `1px solid ${Theme.colors.BUTTON_HOVER}`,
372                               color: Theme.colors.BRAND_CONTRAST,
373                           },
374                           '&:disabled': {
375                               backgroundColor: Theme.colors.TERTIARY_VARIANT,
376                               border: `1px solid ${Theme.colors.BORDER_LIGHT}`,
377                               color: '#59646d',
378                           },


========== IMG_3165.md ==========
---
photo: IMG_3165.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 342-397
orientation: 180
confidence: high
notes: Heavy motion-blur/double-exposure ghosting throughout (editor mid-scroll), worst in the lower third (~391-397) which is also cut off at the bottom edge of the screen by the status bar/"No Solution" badge. Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 342 "MuiButton: {", line 355 "variants: [", line 358 "style: {" (this last sticky line is a re-pin of the 'primary' variant's style block already captured in IMG_3163/3164; no new content). Lines 379-390 read with high confidence (sharp, minimal ghosting). Lines 391-397 were initially a reconstruction (marked ⟪?⟫) based on partially-legible fragments, cross-matched against the parallel structure of the 'primary' variant's style block seen in IMG_3164 — CONFIRMED verbatim-correct by the next photo, IMG_3166 (same file, sharper), which shows this exact 'secondary' variant hover block at lines 391-397; ⟪?⟫ markers left in place below as a record but the reconstructed text is accurate per IMG_3166. Theme.colors.* identifiers are plain blue-highlighted references (imported constants). Tab bar: "theme-provider.tsx" active, "9+" other tabs. Explorer sidebar unchanged. Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Bottom-left: branch "hitanshu/experimental*", "No Solution", ⊗15 △0. Clock 6:14 PM 7/10/2026.
---
11    const theme = createTheme({
61        components: {
342           MuiButton: {
355               variants: [
358                   style: {

379                       },
380                   },
381                   {
382                       props: { variant: 'secondary' },
383                       style: {
384                           backgroundColor: Theme.colors.BACKGROUND_BUTTON,
385                           border: `1px solid ${Theme.colors.SECONDARY}`,
386                           color: Theme.colors.SECONDARY,
387                           borderRadius: '1.5rem',
388                           paddingTop: '0.5rem',
389                           paddingBottom: '0.5rem',
390                           textTransform: 'capitalize',
391                   ⟪?⟫    fontSize: '0.875rem',
392                   ⟪?⟫    fontWeight: '500',
393                   ⟪?⟫    maxHeight: '35px',
394                   ⟪?⟫    '&:hover': {
395                   ⟪?⟫        backgroundColor: Theme.colors.SECONDARY_BUTTON_HOVER,
396                   ⟪?⟫        border: `1px solid ${Theme.colors.PRIMARY}`,
397                   ⟪?⟫        color: Theme.colors.PRIMARY,


========== IMG_3166.md ==========
---
photo: IMG_3166.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 342-405
orientation: 180
confidence: high
notes: Motion-blur/double-exposure ghosting present throughout (editor mid-scroll), heaviest around lines 377-390 (which duplicate content already captured sharply in IMG_3165 — not re-transcribed in detail here, see that file); lines 391-405 are sharp/legible and confirm the reconstruction made in IMG_3165 for the 'secondary' variant's '&:hover' block. Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 342 "MuiButton: {", line 355 "variants: [", line 358 "style: {" (re-pin of 'primary' variant style block, no new content). Theme.colors.* are plain blue-highlighted identifiers (imported constants); '#59646d' is a literal hex shown with a color-swatch box. Tab bar: "theme-provider.tsx" active, "9+" other tabs. Explorer sidebar unchanged. Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Bottom-left: branch "hitanshu/experimental*", "No Solution", ⊗15 △0. Clock 6:14 PM 7/10/2026. Line 405 "color: '#59646d'," cut off at very bottom edge of screen (belongs to a further variant beyond 'secondary', not yet captured).
---
11    const theme = createTheme({
61        components: {
342           MuiButton: {
355               variants: [
358                   style: {

379                       },
380                   },
381                   {
382                       props: { variant: 'secondary' },
383                       style: {
384                           backgroundColor: Theme.colors.BACKGROUND_BUTTON,
385                           border: `1px solid ${Theme.colors.SECONDARY}`,
386                           color: Theme.colors.SECONDARY,
387                           borderRadius: '1.5rem',
388                           paddingTop: '0.5rem',
389                           paddingBottom: '0.5rem',
390                           textTransform: 'capitalize',
391                           fontSize: '0.875rem',
392                           fontWeight: '500',
393                           maxHeight: '35px',
394                           '&:hover': {
395                               backgroundColor: Theme.colors.SECONDARY_BUTTON_HOVER,
396                               border: `1px solid ${Theme.colors.PRIMARY}`,
397                               color: Theme.colors.PRIMARY,
398                           },
399                           '&:disabled': {
400                               backgroundColor: Theme.colors.TERTIARY_VARIANT,
401                               border: `1px solid ${Theme.colors.BORDER_LIGHT}`,
402                               color: '#59646d',
403                           },
404                       },
405                   ⟪color: '#59646d',⟫ (cut off at bottom edge, belongs to next section not yet visible)


========== IMG_3167.md ==========
---
photo: IMG_3167.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 342-418
orientation: 180
confidence: medium
notes: Motion-blur/double-exposure ghosting present (editor mid-scroll) but the sharp foreground layer is legible for nearly all lines. CAVEAT: the line numbers for 393-405 (hover/disabled block + closing braces) read consistently within this photo (checked twice: full image + zoomed crop) but are offset by 1 from IMG_3166's independently double-checked numbering for the identical 'secondary'-variant content (which put hover-open at 394, not 393). Content/text itself matches between the two photos; only the exact line-number attribution for this span is uncertain by ±1 — not re-resolved further. Numbers for lines 406+ (new 'tertiary' variant content) follow directly from this photo's own count and may carry the same ±1 uncertainty. Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 342 "MuiButton: {", line 355 "variants: [", line 383 "style: {" (re-pin of 'secondary' variant's style block, matching IMG_3165/3166). Lines 390-405 confirm/duplicate the 'secondary' variant '&:hover'/'&:disabled' block already captured in IMG_3165/3166 (transcribed again here for completeness since fully legible). New content: lines 406-418 introduce a THIRD variant, props: { variant: 'tertiary' }, with its own style block (note: uses Theme.colors.BRAND for text color and a larger fontSize '1rem' vs '0.875rem' for primary/secondary). Line 418 "textTransform: 'capitalize'," is suspicious (appears to duplicate line 415's identical text) and is cut off at the very bottom edge of the screen — likely a ghost/motion-blur artifact rather than real distinct content; marked ⟪?⟫. Theme.colors.* are plain blue-highlighted identifiers (imported constants); '#59646d' at line 401 is literal hex with color swatch. Tab bar: "theme-provider.tsx" active, "9+" other tabs. Explorer sidebar unchanged. Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Bottom-left: branch "hitanshu/experimental*", "No Solution", ⊗15 △0. Clock 6:14 PM 7/10/2026.
---
11    const theme = createTheme({
61        components: {
342           MuiButton: {
355               variants: [
383                   style: {
390                       fontSize: '0.875rem',
391                       fontWeight: '500',
392                       maxHeight: '35px',
393                       '&:hover': {
394                           backgroundColor: Theme.colors.SECONDARY_BUTTON_HOVER,
395                           border: `1px solid ${Theme.colors.PRIMARY}`,
396                           color: Theme.colors.PRIMARY,
397                       },
398                       '&:disabled': {
399                           backgroundColor: Theme.colors.TERTIARY_VARIANT,
400                           border: `1px solid ${Theme.colors.BORDER_LIGHT}`,
401                           color: '#59646d',
402                       },
403                   },
404               },
405               {
406                   props: { variant: 'tertiary' },
407                   style: {
408                       backgroundColor: Theme.colors.TERTIARY_VARIANT,
409                       border: `1px solid ${Theme.colors.TERTIARY_VARIANT}`,
410                       color: Theme.colors.BRAND,
411                       borderRadius: '1.5rem',
412                       paddingX: '0.5rem',
413                       paddingY: '0.5rem',
414                       textTransform: 'capitalize',
415                       fontSize: '1rem',
416                       fontWeight: '500',
417                   ⟪?⟫ textTransform: 'capitalize',  (likely ghost/motion-blur duplicate of line 414; cut off at bottom edge)


========== IMG_3169.md ==========
---
photo: IMG_3169.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 342-441
orientation: 180
confidence: high
notes: Motion-blur/double-exposure ghosting present (editor mid-scroll) but sharp foreground text is legible throughout. Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 342 "MuiButton: {", line 355 "variants: [", line 408 "style: {" (re-pin of the 'tertiary' variant's style block; content resumes at 414, lines 409-413 hidden behind sticky header). Lines 414-429 confirm/complete the 'tertiary' variant seen partially in IMG_3167/3168, including the fully-legible COMMENTED '&:disabled' block (lines 424-428: only backgroundColor, border, opacity — no color line, correcting a tentative reading in IMG_3168). CAVEAT: line numbers for this overlapping span (414-429) are offset by ~1 from IMG_3168's own numbering for the same content (recurring ±1 uncertainty across these ghosted photos, as noted in IMG_3167/3168) — this photo's own internally-consistent count is used here. NEW content: line 430 closes the 'tertiary' variant array element; line 431 opens a FOURTH variant, props: { variant: 'tableMedium' }, with style block (backgroundColor: Theme.colors.BRAND_CONTRAST, border: `none`, color: Theme.colors.BRAND, borderRadius: `none`, padding: '0', textTransform: 'capitalize', fontSize: '0.875rem', fontWeight: '500', ...). Theme.colors.* are plain blue-highlighted identifiers (imported constants); '#c4cbd1' is literal hex with color-swatch box. Tab bar: "theme-provider.tsx" active, "9+" other tabs. Explorer sidebar unchanged. Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Bottom-left: branch "hitanshu/experimental*", "No Solution", ⊗15 △0. Clock 6:14 PM 7/10/2026. Line 441 "fontWeight: '500'," and a further ghosted "textTransform: 'capitalize'," are at/beyond the bottom edge of the screen — the latter not confidently attributed to a line number, marked ⟪?⟫.
---
11    const theme = createTheme({
61        components: {
342           MuiButton: {
355               variants: [
408                   style: {
414                       paddingY: '0.5rem',
415                       textTransform: 'capitalize',
416                       fontSize: '1rem',
417                       fontWeight: '500',
418
419                       '&:hover': {
420                           backgroundColor: '#c4cbd1',
421                           border: `1px solid #c4cbd1`,
422                           color: Theme.colors.BRAND,
423                       },
424                       // '&:disabled': {
425                       //   backgroundColor: Theme.colors.PRIMARY_BUTTON_INACTIVE,
426                       //   border: `1px solid ${Theme.colors.PRIMARY_BUTTON_INACTIVE}`,
427                       //   opacity: 0.5,
428                       // },
429                   },
430               },
431               {
432                   props: { variant: 'tableMedium' },
433                   style: {
434                       backgroundColor: Theme.colors.BRAND_CONTRAST,
435                       border: `none`,
436                       color: Theme.colors.BRAND,
437                       borderRadius: `none`,
438                       padding: '0',
439                       textTransform: 'capitalize',
440                       fontSize: '0.875rem',
441                       fontWeight: '500',
                      ⟪?⟫ textTransform: 'capitalize',  (ghosted, cut off at bottom edge)


========== IMG_3170.md ==========
---
photo: IMG_3170.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 342-460
orientation: 180
confidence: high
notes: Motion-blur/double-exposure ghosting present in this photo (editor mid-scroll) made exact line-number attribution for 442-451 initially uncertain. CORRECTED: the next photo, IMG_3171 (same file, taken moments later), shows this identical span with no ghosting at all — its clean reading is authoritative and is used here in place of this photo's blurred count. Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 342 "MuiButton: {", line 355 "variants: [" — content resumes at 431. Lines 431-441 are the 'tableMedium' variant's base style props (also seen in IMG_3169). Lines 443-448 add '&:hover' (color: Theme.colors.PRIMARY_BUTTON_INACTIVE) and '&:disabled' (color: '#b4b6b8') sub-blocks; 449 closes style, 450 closes the array element, 451 is blank, 452 opens the next ('errorMedium') array element. Theme.colors.* are plain blue-highlighted identifiers (imported constants); '#b4b6b8' is literal hex with color-swatch box. Tab bar: "theme-provider.tsx" active, "9+" other tabs. Explorer sidebar unchanged. Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Bottom-left: branch "hitanshu/experimental*", "No Solution", ⊗15 △0. Clock 6:14 PM 7/10/2026.
---
11    const theme = createTheme({
61        components: {
342           MuiButton: {
355               variants: [
431               {
432                   props: { variant: 'tableMedium' },
433                   style: {
434                       backgroundColor: Theme.colors.BRAND_CONTRAST,
435                       border: `none`,
436                       color: Theme.colors.BRAND,
437                       borderRadius: 'none',
438                       padding: '0',
439                       textTransform: 'capitalize',
440                       fontSize: '0.875rem',
441                       fontWeight: '500',
442
443                       '&:hover': {
444                           color: Theme.colors.PRIMARY_BUTTON_INACTIVE,
445                       },
446                       '&:disabled': {
447                           color: '#b4b6b8',
448                       },
449                   },
450               },
451
452               {
453                   props: { variant: 'errorMedium' },
454                   style: {
455                       backgroundColor: Theme.colors.ERROR,
456                       border: `1px solid ${Theme.colors.ERROR}`,
457                       color: Theme.colors.BRAND_CONTRAST,
458                       fontWeight: '700',
459                       padding: '0 3em',
460                       '&.MuiButtonBase-root': {


========== IMG_3171.md ==========
---
photo: IMG_3171.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 342-460
orientation: 180
confidence: high
notes: Sharp, clear photo — no motion blur (unlike IMG_3170 of the same file/region taken moments before). This photo's reading is authoritative for lines 431-460 and was used to correct IMG_3170's transcript. Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 342 "MuiButton: {", line 355 "variants: [" — content resumes at 431. Lines 431-450 are the complete 'tableMedium' variant (props, style: backgroundColor/border/color/borderRadius/padding/textTransform/fontSize/fontWeight, '&:hover' with color: Theme.colors.PRIMARY_BUTTON_INACTIVE, '&:disabled' with color: '#b4b6b8', then closes). Line 451 is blank. Line 452 opens a new array element, props: { variant: 'errorMedium' }, style: { backgroundColor: Theme.colors.ERROR, border referencing Theme.colors.ERROR, color: Theme.colors.BRAND_CONTRAST, fontWeight: '700', padding: '0 3em', '&.MuiButtonBase-root': { — this last line (460) is cut off at the very bottom edge of the screen, content continues beyond what's visible here. Theme.colors.* are plain blue-highlighted identifiers (imported constants); '#b4b6b8' is literal hex with color-swatch box. Tab bar: "theme-provider.tsx" active, "9+" other tabs. Explorer sidebar unchanged (theme-provider.tsx selected under providers/). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Bottom-left: branch "hitanshu/experimental*", "No Solution", ⊗15 △0. Clock 6:14 PM 7/10/2026.
---
11    const theme = createTheme({
61        components: {
342           MuiButton: {
355               variants: [
431               {
432                   props: { variant: 'tableMedium' },
433                   style: {
434                       backgroundColor: Theme.colors.BRAND_CONTRAST,
435                       border: `none`,
436                       color: Theme.colors.BRAND,
437                       borderRadius: 'none',
438                       padding: '0',
439                       textTransform: 'capitalize',
440                       fontSize: '0.875rem',
441                       fontWeight: '500',
442
443                       '&:hover': {
444                           color: Theme.colors.PRIMARY_BUTTON_INACTIVE,
445                       },
446                       '&:disabled': {
447                           color: '#b4b6b8',
448                       },
449                   },
450               },
451
452               {
453                   props: { variant: 'errorMedium' },
454                   style: {
455                       backgroundColor: Theme.colors.ERROR,
456                       border: `1px solid ${Theme.colors.ERROR}`,
457                       color: Theme.colors.BRAND_CONTRAST,
458                       fontWeight: '700',
459                       padding: '0 3em',
460                       '&.MuiButtonBase-root': {


========== IMG_3168.md ==========
---
photo: IMG_3168.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 383-428
orientation: 180
confidence: medium
notes: Heavy motion-blur/double-exposure ghosting throughout (editor mid-scroll). Sticky-scroll headers pinned at top: line 11 "const theme = createTheme({", line 61 "components: {", line 342 "MuiButton: {", line 355 "variants: [", line 383 "style: {" (re-pin, no new content — same 'secondary' variant style block seen in IMG_3165-3167). Lines 401-408 close out the 'secondary' variant's '&:disabled' block, style, and array element, then open a THIRD variant element with props: { variant: 'tertiary' } (matches/overlaps content also seen in IMG_3167, with line numbers off by roughly 1 between the two photos — see caveat in IMG_3167's notes; this photo's own numbering is used here). Lines 409-419 are the 'tertiary' variant's base style props (backgroundColor, border, color: Theme.colors.BRAND, borderRadius, paddingX/Y, textTransform, fontSize: '1rem' — notably larger than primary/secondary's '0.875rem' — fontWeight). Lines 420-424 are a live (uncommented) '&:hover' block using literal hex '#c4cbd1' for backgroundColor/border and Theme.colors.BRAND for color. Lines ~425-428 contain a COMMENTED-OUT '&:disabled' block (each line prefixed "//"): color: Theme.colors.BRAND, backgroundColor: Theme.colors.PRIMARY_BUTTON_INACTIVE, border referencing Theme.colors.PRIMARY_BUTTON_INACTIVE, opacity: 0.5, closing brace — exact line-by-line number attribution for this commented block is uncertain due to severe ghosting and being cut off at the very bottom edge of the screen; content is reproduced but marked ⟪?⟫ for line precision. Theme.colors.* are plain blue-highlighted identifiers; '#59646d' and '#c4cbd1' are literal hex values with color-swatch boxes. Tab bar: "theme-provider.tsx" active, "9+" other tabs. Explorer sidebar unchanged. Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Bottom-left: branch "hitanshu/experimental*", "No Solution", ⊗15 △0. Clock 6:14 PM 7/10/2026.
---
11    const theme = createTheme({
61        components: {
342           MuiButton: {
355               variants: [
383                   style: {

401                           border: `1px solid ${Theme.colors.BORDER_LIGHT}`,
402                           color: '#59646d',
403                       },
404                   },
405               },
406               {
407                   props: { variant: 'tertiary' },
408                   style: {
409                       backgroundColor: Theme.colors.TERTIARY_VARIANT,
410                       border: `1px solid ${Theme.colors.TERTIARY_VARIANT}`,
411                       color: Theme.colors.BRAND,
412                       borderRadius: '1.5rem',
413                       paddingX: '0.5rem',
414                       paddingY: '0.5rem',
415                       textTransform: 'capitalize',
416                       fontSize: '1rem',
417                       fontWeight: '500',
418                       ⟪?⟫ (line-number precision uncertain from here to 428, content below reconstructed from legible fragments)
                          '&:hover': {
                              backgroundColor: '#c4cbd1',
                              border: `1px solid #c4cbd1`,
                              color: Theme.colors.BRAND,
                          },
                          // '&:disabled': {
                          //   color: Theme.colors.BRAND,
                          //   backgroundColor: Theme.colors.PRIMARY_BUTTON_INACTIVE,
                          //   border: `1px solid ${Theme.colors.PRIMARY_BUTTON_INACTIVE}`,
                          //   opacity: 0.5,
428                       //  },


========== IMG_3175.md ==========
---
photo: IMG_3175.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 486-520
orientation: 180
confidence: high
notes: |
  Continues scrolling from IMG_3174; reaches the end of the file (line 520, "export {
  ThemeProvider };"). Mild double-exposure/motion ghosting present throughout (each line
  has a fainter echo a few rows below, e.g. "interface TypeBackground {" ghosts down near
  line 505/506) but the bold/sharp text is unambiguous and used below. This appears to be
  the last screenful of theme-provider.tsx.
  Explorer sidebar/tab bar/status bar same as prior photos in this series (theme-provider.tsx
  active/highlighted "9+", branch hitanshu/experimental*, 15 errors / 0 warnings,
  "No Solution", TypeScript JSX, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 6:14 PM 7/10/2026).
---
486: declare module '@mui/material/styles' {
                ⟪lines 487-488 not visible, scrolled above sticky header (interface TypeText { watermark: string; } — see IMG_3174)⟫
489:     }
490:
491:     interface Palette {
492:         brand: Palette['primary'];
493:         brandComplement: Palette['primary'];
494:         border: Palette['primary'];
495:     }
496:
497:     interface PaletteOptions {
498:         brand: PaletteOptions['primary'];
499:         brandComplement: PaletteOptions['primary'];
500:         border: PaletteOptions['primary'];
501:     }
502:
503:     interface TypeBackground {
504:         input?: string;
505:         inputDisabled?: string;
506:     }
507:
508:     interface PaletteColor {
509:         veryLight?: string;
510:     }
511:     interface SimplePaletteColorOptions {
512:         veryLight?: string;
513:     }
514: }
515:
516: function ThemeProvider({ children }: { children: ReactNode }) {
517:     return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
518: }
519:
520: export { ThemeProvider };


========== IMG_3176.md ==========
---
photo: IMG_3176.JPG
type: vscode-code
file: aqs-web-ui/src/providers/theme-provider.tsx
lines: 486-521
orientation: 180
confidence: high
notes: |
  Same end-of-file view as IMG_3175 (theme-provider.tsx ends at line 520 "export {
  ThemeProvider };", line 521 is blank/EOF), scrolled slightly differently. This photo
  CONFIRMS the line numbering fix applied to IMG_3175 (there is a blank line at 507,
  between "interface TypeBackground { ... }" (503-506) and "interface PaletteColor {"
  (508)). Mild double-exposure/motion ghosting present throughout (each line has a fainter
  echo a few rows below) but bold/sharp text is unambiguous.
  Explorer sidebar/tab bar/status bar same as prior photos in this series (theme-provider.tsx
  active/highlighted "9+", branch hitanshu/experimental*, 15 errors / 0 warnings,
  "No Solution", TypeScript JSX, UTF-8, CRLF, Tab Size 4, Ln 1 Col 1, 6:14 PM 7/10/2026).
---
486: declare module '@mui/material/styles' {
                ⟪lines 487-490 not visible, scrolled above sticky header⟫
491:     interface Palette {
                ⟪line 492 not visible (brand: Palette['primary'];) — see IMG_3175⟫
493:         brandComplement: Palette['primary'];
494:         border: Palette['primary'];
495:     }
496:
497:     interface PaletteOptions {
498:         brand: PaletteOptions['primary'];
499:         brandComplement: PaletteOptions['primary'];
500:         border: PaletteOptions['primary'];
501:     }
502:
503:     interface TypeBackground {
504:         input?: string;
505:         inputDisabled?: string;
506:     }
507:
508:     interface PaletteColor {
509:         veryLight?: string;
510:     }
511:     interface SimplePaletteColorOptions {
512:         veryLight?: string;
513:     }
514: }
515:
516: function ThemeProvider({ children }: { children: ReactNode }) {
517:     return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
518: }
519:
520: export { ThemeProvider };
521:
