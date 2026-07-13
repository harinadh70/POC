# BUNDLE for src/components/header.tsx
# 14 photo fragment(s), ascending start-line order.


========== IMG_2150.md ==========
---
photo: IMG_2150.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 1-34
orientation: 180
confidence: high
notes: New file opened — header.tsx, top of file (no sticky-scroll headers, this is the true start). Clean/sharp photo, no ghosting. Status bar now shows 41 errors, 0 warnings (down from 71 in form-renderer.tsx photos), "No Solution". Tab bar: "date.tsx 9+", "header.tsx 9+" (active, italic = preview tab). Breadcrumb: aqs-web-ui > src > components > header.tsx > ... Explorer sidebar: header.tsx now selected/highlighted (was form-renderer.tsx in prior photos); same component file list as before (dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx (U)). Branch: hitanshu/experimental*. Many import lines (1-8, 11, 14-16) have squiggle underlines (likely unresolved path-alias lint warnings, not necessarily errors). Line 34 cut off at very bottom by status bar but legible via zoom.
---
1	import { useRouteLoaderData, useSubmit, useLocation, useNavigate } from 'react-router';
2	import { useState } from 'react';
3	import Stack from '@mui/material/Stack';
4	import Button from '@mui/material/Button';
5	import Box from '@mui/material/Box';
6	import Menu from '@mui/material/Menu';
7	import MenuItem from '@mui/material/MenuItem';
8	import Fade from '@mui/material/Fade';
9	
10	// utils
11	import isEmpty from 'lodash-es/isEmpty';
12	
13	// assets
14	import logo from '@images/brandLogo.png';
15	import LogoutIcon from '@mui/icons-material/Logout';
16	import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
17	
18	// ---------------------------------------
19	
20	type RootLoaderData = {
21	    userInfo: string[] | undefined;
22	    menuInfo: Record<string, unknown> | undefined;
23	};
24	
25	// ---------------------------------------
26	
27	function Header() {
28	    const rootData = useRouteLoaderData('root') as RootLoaderData;
29	    const location = useLocation();
30	    const submit = useSubmit();
31	    const navigate = useNavigate();
32	
33	    const isLoginPage = location.pathname === '/';
34	    const isLoggedIn = !isEmpty(rootData?.userInfo) && !isLoginPage;


========== IMG_2151.md ==========
---
photo: IMG_2151.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 11(partial)-44
orientation: 180
confidence: high
notes: Continuation of header.tsx, scrolled slightly from IMG_2150 (line 11 mostly cut off at top, just a sliver of "import isEmpty from 'lodash-es/isEmpty';" visible). Clean/sharp photo, no ghosting. Status bar: 41 errors, 0 warnings, "No Solution". Tab bar: "date.tsx 9+", "header.tsx 9+" (active). Breadcrumb: aqs-web-ui > src > components > header.tsx > ... Explorer sidebar scrolled down vs IMG_2150, now shows more of the tree: components folder (partial, showing radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx (U)) followed by sibling top-level folders/files under src: config, constants, features, hooks, lib, pages, providers, services, types, utils, then files app.css (#), app.tsx, context.ts (TS), main.tsx, routes.tsx, store.ts (TS), types.ts (TS, partially cut at bottom). This reveals the top-level src/ structure: components/, config/, constants/, features/, hooks/, lib/, pages/, providers/, services/, types/, utils/, plus app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts, types.ts. Line 44 cut off at bottom by status bar but legible.
---
11	import isEmpty from 'lodash-es/isEmpty';
12	
13	// assets
14	import logo from '@images/brandLogo.png';
15	import LogoutIcon from '@mui/icons-material/Logout';
16	import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
17	
18	// ---------------------------------------
19	
20	type RootLoaderData = {
21	    userInfo: string[] | undefined;
22	    menuInfo: Record<string, unknown> | undefined;
23	};
24	
25	// ---------------------------------------
26	
27	function Header() {
28	    const rootData = useRouteLoaderData('root') as RootLoaderData;
29	    const location = useLocation();
30	    const submit = useSubmit();
31	    const navigate = useNavigate();
32	
33	    const isLoginPage = location.pathname === '/';
34	    const isLoggedIn = !isEmpty(rootData?.userInfo) && !isLoginPage;
35	
36	    // Use menu data from API (via root loader) or fallback to empty array
37	    const menus = (rootData?.menuInfo?.menus as any[]) || [];
38	
39	    // Menu state
40	    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
41	    const [openMenu, setOpenMenu] = useState<string | null>(null);
42	
43	    const handleOpen = (event: React.MouseEvent<HTMLElement>, menuName: string) => {
44	      setAnchorEl(event.currentTarget);


========== IMG_2152.md ==========
---
photo: IMG_2152.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 19-52
orientation: 180
confidence: high
notes: Continuation of header.tsx, largely overlapping with IMG_2151 but extends further to line 52 (handleClose function body). Clean/sharp photo, no ghosting. Status bar: 41 errors, 0 warnings, "No Solution". Tab bar: "date.tsx 9+", "header.tsx 9+" (active). Breadcrumb: aqs-web-ui > src > components > header.tsx > ... Explorer sidebar same as IMG_2151 (components folder showing radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx (U), then config, constants, features, hooks, lib, pages, providers, services, types, utils folders, then app.css (#), app.tsx, context.ts (TS), main.tsx, routes.tsx, store.ts (TS), types.ts (TS) files, cut off at bottom). Branch: hitanshu/experimental*.
---
19	
20	type RootLoaderData = {
21	    userInfo: string[] | undefined;
22	    menuInfo: Record<string, unknown> | undefined;
23	};
24	
25	// ---------------------------------------
26	
27	function Header() {
28	    const rootData = useRouteLoaderData('root') as RootLoaderData;
29	    const location = useLocation();
30	    const submit = useSubmit();
31	    const navigate = useNavigate();
32	
33	    const isLoginPage = location.pathname === '/';
34	    const isLoggedIn = !isEmpty(rootData?.userInfo) && !isLoginPage;
35	
36	    // Use menu data from API (via root loader) or fallback to empty array
37	    const menus = (rootData?.menuInfo?.menus as any[]) || [];
38	
39	    // Menu state
40	    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
41	    const [openMenu, setOpenMenu] = useState<string | null>(null);
42	
43	    const handleOpen = (event: React.MouseEvent<HTMLElement>, menuName: string) => {
44	      setAnchorEl(event.currentTarget);
45	      setOpenMenu(menuName);
46	    };
47	
48	    const handleClose = () => {
49	      setAnchorEl(null);
50	      setOpenMenu(null);
51	    };
52	


========== IMG_2153.md ==========
---
photo: IMG_2153.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 25-57
orientation: 180
confidence: high
notes: Continuation of header.tsx, overlaps IMG_2151/2152 (lines 25-51 identical) and extends further to new content at 52-57 (handleMenuAction function start). This photo has a double-exposure/motion-blur ghosting artifact from roughly line 28 downward — every line shows a sharp/bright copy plus a fainter duplicate of nearby content bleeding through underneath (camera-shake style, similar to IMG_2143), but gutter numbers stay crisp and the primary (bright) text was cross-checked at high zoom for lines 52-57 to confirm accuracy. Status bar: 41 errors, 0 warnings, "No Solution". Tab bar: "date.tsx 9+", "header.tsx 9+" (active). Breadcrumb: aqs-web-ui > src > components > header.tsx > ... Explorer sidebar same as IMG_2151/2152. Branch: hitanshu/experimental*. Line 57 cut off at very bottom (only top portion of the line visible, rest presumably continues below frame, not captured).
---
25	// ---------------------------------------
26	
27	function Header() {
28	    const rootData = useRouteLoaderData('root') as RootLoaderData;
29	    const location = useLocation();
30	    const submit = useSubmit();
31	    const navigate = useNavigate();
32	
33	    const isLoginPage = location.pathname === '/';
34	    const isLoggedIn = !isEmpty(rootData?.userInfo) && !isLoginPage;
35	
36	    // Use menu data from API (via root loader) or fallback to empty array
37	    const menus = (rootData?.menuInfo?.menus as any[]) || [];
38	
39	    // Menu state
40	    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
41	    const [openMenu, setOpenMenu] = useState<string | null>(null);
42	
43	    const handleOpen = (event: React.MouseEvent<HTMLElement>, menuName: string) => {
44	      setAnchorEl(event.currentTarget);
45	      setOpenMenu(menuName);
46	    };
47	
48	    const handleClose = () => {
49	      setAnchorEl(null);
50	      setOpenMenu(null);
51	    };
52	
53	    const handleMenuAction = (item: any) => {
54	      handleClose();
55	
56	      if (item.action === 'SelectTab') {
57	        navigate(`/tab/${item.args}`);


========== IMG_2154.md ==========
---
photo: IMG_2154.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 27-76
orientation: 180
confidence: medium
notes: |
  SEVERE double-exposure/ghosting artifact: nearly every code row shows two
  overlapping lines of text (phone's HDR/multi-frame merge, or VS Code
  sticky-scroll transitioning mid-capture, blended two moments together).
  Cross-referenced against IMG_2155 (same file, scrolled slightly further
  down, much cleaner capture) which CONFIRMS lines 58, 60-65, 67-68, 70-76
  verbatim — see IMG_2155.md for the authoritative version of that range.
  Lines 44-46 (handleOpen body) and 48-51 (handleClose) below are this
  photo's own best-effort reconstruction from the ghost overlap and are not
  independently confirmed. Lines 54-57 (the 'SelectTab' branch that must
  open the item.action if/else chain) are NOT visible in this photo at all
  (out of frame above line 58) — left unresolved here, see IMG_2155 notes
  for a low-confidence guess.
  Tabs open: "date.tsx" (unsaved dot) and "header.tsx" (active, unsaved dot).
  Breadcrumb: aqs-web-ui > src > components > header.tsx > (Header function).
  Explorer sidebar (components folder expanded): radio.tsx, select.tsx,
  sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx (highlighted, "U" =
  untracked). Other top-level src folders visible: config, constants,
  features (dot), hooks, lib (dot), pages (dot), providers, services,
  types (dot), utils, plus app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts. Status bar: branch "hitanshu/experimental*",
  41 errors / 0 warnings, "No Solution". Right edge of editor shows a
  reddish-orange vertical smear in the overview ruler/minimap area —
  consistent with the same motion/double-exposure artifact rather than a
  distinct UI element.
---
27  function Header() {
    ...
43      const handleOpen = (event: React.MouseEvent<HTMLElement>, menuName: string) => {
44          setAnchorEl(event.currentTarget);  ⟪? reconstructed from ghost overlap⟫
45          setOpenMenu(menuName);  ⟪? reconstructed from ghost overlap⟫
46      };  ⟪? reconstructed from ghost overlap⟫
47
48      const handleClose = () => {  ⟪? "()=>" vs "(event...)=>" ambiguous, overlapped with handleOpen ghost⟫
49          setAnchorEl(null);
50          setOpenMenu(null);
51      };  ⟪? ghost-overlapped⟫
52
53      const handleMenuAction = (item: any) => {
54          ⟪?⟫ (not visible in this photo; see IMG_2155)
55          ⟪?⟫
56          ⟪?⟫
57          ⟪?⟫
58          } else if (item.action === 'Logout') {   [confirmed via IMG_2155]
59              navigate('/logout');                 [confirmed via IMG_2155]
60          } else if (item.action === 'OpenExternalLink') {   [confirmed via IMG_2155]
61              window.open(item.args?.split('#')[0], '_blank');   [confirmed via IMG_2155]
62          } else if (item.action === 'LaunchModal') {   [confirmed via IMG_2155]
63              // modal logic here   [confirmed via IMG_2155]
64          }   [confirmed via IMG_2155]
65      };   [confirmed via IMG_2155]
66
67      const handleCancel = () => navigate('/', { replace: true });   [confirmed via IMG_2155]
68      const handleLogout = () => submit(null, { method: 'post', action: '/logout' });   [confirmed via IMG_2155]
69
70      return (   [confirmed via IMG_2155]
71          <Stack   [confirmed via IMG_2155]
72              component={'header'}   [confirmed via IMG_2155]
73              direction={'row'}   [confirmed via IMG_2155]
74              alignItems={'center'}
75              justifyContent={'space-between'}
76              height={60}


========== IMG_2155.md ==========
---
photo: IMG_2155.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 27-89 (sticky headers 27,53; scrolled view 58-89)
orientation: 180
confidence: medium
notes: |
  Sticky-scroll headers pinned at top: line 27 "function Header() {" and
  line 53 "const handleMenuAction = (item: any) => {". Below that the
  scrolled viewport starts at line 58. Rows 58-73 show a ghost/double-
  exposure overlap similar to IMG_2154 (fainter duplicate text bleeding
  through), but the PRIMARY (bold/sharp) text for lines 58-65, 67-68,
  70-73 is clearly legible and internally consistent — treated as
  high-confidence for those specific lines. The faint ghost text visible
  behind rows 58-65 appears to read fragments "if (item.action ===
  'SelectTab') {" / "navigate(`/tab/${item.args}`)" / "}" — likely a
  transient sticky-scroll render of the 'SelectTab' branch (lines ~54-57,
  not otherwise visible in either 2154 or 2155) bleeding into the frame;
  too indistinct to transcribe with confidence, left as ⟪?⟫.
  Rows 74-89 are clean/unghosted and high-confidence.
  Tabs open: "date.tsx" (unsaved dot) and "header.tsx" (active, unsaved dot,
  italicized = preview tab). Breadcrumb: aqs-web-ui > src > components >
  header.tsx > (Header). Explorer sidebar (components expanded): radio.tsx,
  select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx
  (highlighted, "U" = untracked). Other src folders: config, constants,
  features (dot), hooks, lib (dot), pages (dot), providers, services,
  types (dot), utils; plus app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts. Status bar: branch "hitanshu/experimental*",
  41 errors / 0 warnings, "No Solution". Right edge shows the same
  reddish-orange vertical smear in the overview ruler as IMG_2154 (motion
  artifact, not a distinct UI element). Red squiggly underlines (ESLint/TS
  warnings) visible under most of the JSX prop lines 72-89.
---
27  function Header() {              [sticky header]
53      const handleMenuAction = (item: any) => {   [sticky header]
        ⟪?⟫ (lines 54-57 not visible; faint transient overlay suggests an
        opening "if (item.action === 'SelectTab') { navigate(`/tab/${item.args}`); }"
        branch precedes line 58, but not legible enough to transcribe verbatim)
58          } else if (item.action === 'Logout') {
59              navigate('/logout');
60          } else if (item.action === 'OpenExternalLink') {
61              window.open(item.args?.split('#')[0], '_blank');
62          } else if (item.action === 'LaunchModal') {
63              // modal logic here
64          }
65      };
66
67      const handleCancel = () => navigate('/', { replace: true });
68      const handleLogout = () => submit(null, { method: 'post', action: '/logout' });
69
70      return (
71          <Stack
72              component={'header'}
73              direction={'row'}
74              alignItems={'center'}
75              justifyContent={'space-between'}
76              height={60}
77              className=" !px-8 bg-white shadow-xl! relative z-10"
78          >
79              {/* LEFT SIDE: LOGO */}
80              <Stack direction={'row'} alignItems={'center'} gap={4}>
81                  <img src={logo} alt="Logo" className="!w-[170px]" />
82                  {isLoggedIn && menus && menus.length > 0 && (
83                      <Stack direction="row" gap={2} alignItems="center">
84                          {menus.map((menu: any) => (
85                              <Box key={menu['@name']}>
86                                  <Button
87                                      onClick={(e) => handleOpen(e, menu['@name'])}
88                                      endIcon={<KeyboardArrowDownIcon />}
89                                      sx={{


========== IMG_2156.md ==========
---
photo: IMG_2156.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 27, 71-102 (sticky header 27)
orientation: 180
confidence: high
notes: |
  Clean, sharp capture — no ghosting/blur (unlike IMG_2154/2155). Sticky
  scroll header pinned at top: line 27 "function Header() {" (line 70's
  "return (" is cut off, only its bottom edge is visible above line 71).
  Tabs open: "date.tsx" (unsaved dot) and "header.tsx" (active, unsaved dot,
  italicized = preview tab). Breadcrumb: aqs-web-ui > src > components >
  header.tsx > (Header). Explorer sidebar (components expanded): radio.tsx,
  select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx
  (highlighted, "U" = untracked). Other src folders: config, constants,
  features (dot), hooks, lib (dot), pages (dot), providers, services,
  types (dot), utils; plus app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts. Status bar: branch "hitanshu/experimental*",
  41 errors / 0 warnings, "No Solution". Right edge shows the same
  reddish-orange vertical smear/waveform in the overview ruler as prior
  photos in this sequence (not further investigated — likely a git-diff or
  search-match overview-ruler decoration rendered as a solid block at this
  zoom, or a repeated camera artifact). Cursor I-beam visible over the hex
  color value at line 92, verified via zoomed crop that it reads '#0A2C6E'
  (blue color swatch matches). Red squiggly underlines (ESLint/TS warnings)
  under nearly every JSX/object-literal line in this range — consistent
  with the "41 errors" status bar count. Line 94 has an inline comment
  "// keep label on one line".
---
27  function Header() {              [sticky header]
    ⟪...⟫ (line 70 "return (" partially cut off above line 71)
71          <Stack
72              component={'header'}
73              direction={'row'}
74              alignItems={'center'}
75              justifyContent={'space-between'}
76              height={60}
77              className=" !px-8 bg-white shadow-xl! relative z-10"
78          >
79              {/* LEFT SIDE: LOGO */}
80              <Stack direction={'row'} alignItems={'center'} gap={4}>
81                  <img src={logo} alt="Logo" className="!w-[170px]" />
82                  {isLoggedIn && menus && menus.length > 0 && (
83                      <Stack direction="row" gap={2} alignItems="center">
84                          {menus.map((menu: any) => (
85                              <Box key={menu['@name']}>
86                                  <Button
87                                      onClick={(e) => handleOpen(e, menu['@name'])}
88                                      endIcon={<KeyboardArrowDownIcon />}
89                                      sx={{
90                                          textTransform: 'none',
91                                          fontSize: '1rem',
92                                          color: '#0A2C6E',
93                                          fontWeight: 500,
94                                          whiteSpace: 'nowrap', // keep label on one line
95                                          minWidth: 'fit-content',
96                                          '&:hover, &.selected': {
97                                              backgroundColor: 'transparent',
98                                          },
99                                      }}
100                                 >
101                                     {menu['@name']}
102                                 </Button>


========== IMG_2157.md ==========
---
photo: IMG_2157.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 27, 84-118 (sticky header 27)
orientation: 180
confidence: high
notes: |
  Clean, sharp capture — no ghosting/blur. Sticky scroll header pinned at
  top: line 27 "function Header() {" then a gap directly to line 84 (rest
  scrolled off). Overlaps/confirms IMG_2156's lines 84-102 and extends
  further to 103-118 (the <Menu> element). Confirms line 92 color hex is
  '#0A2C6E' (clearly legible here, swatch blue). Same hex reused at line
  113 border color.
  Tabs open: "date.tsx" (unsaved dot) and "header.tsx" (active, unsaved dot,
  italicized = preview tab). Breadcrumb: aqs-web-ui > src > components >
  header.tsx > (Header). Explorer sidebar (components expanded): radio.tsx,
  select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx
  (highlighted, "U" = untracked). Other src folders: config, constants,
  features (dot), hooks, lib (dot), pages (dot), providers, services,
  types (dot), utils; plus app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts. Status bar: branch "hitanshu/experimental*",
  41 errors / 0 warnings, "No Solution". Right edge shows the same
  reddish-orange vertical bar in the overview ruler seen in prior photos of
  this file. Red squiggly underlines (ESLint/TS warnings) under nearly every
  line 88-117.
---
27  function Header() {              [sticky header]
    ⟪...⟫ (lines 28-83 scrolled off/not visible)
84                          {menus.map((menu: any) => (
    ⟪...⟫ (lines 85-86 not visible, cut off above 87)
87                              onClick={(e) => handleOpen(e, menu['@name'])}
88                              endIcon={<KeyboardArrowDownIcon />}
89                              sx={{
90                                  textTransform: 'none',
91                                  fontSize: '1rem',
92                                  color: '#0A2C6E',
93                                  fontWeight: 500,
94                                  whiteSpace: 'nowrap', // keep label on one line
95                                  minWidth: 'fit-content',
96                                  '&:hover, &.selected': {
97                                      backgroundColor: 'transparent',
98                                  },
99                              }}
100                         >
101                             {menu['@name']}
102                         </Button>
103
104                         <Menu
105                             anchorEl={anchorEl}
106                             open={openMenu === menu['@name']}
107                             onClose={handleClose}
108                             TransitionComponent={Fade}
109                             sx={{
110                                 '& .MuiPaper-root': {
111                                     borderRadius: '0px',
112                                     boxShadow: 'none',
113                                     border: '1px solid #0A2C6E',
114                                     top: '60px !important',
115                                     '& .MuiMenu-list': {
116                                         padding: 0,
117                                     },
118                             },


========== IMG_2158.md ==========
---
photo: IMG_2158.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 27, 84, 98-128 (sticky headers 27, 84)
orientation: 180
confidence: high
notes: |
  Clean, sharp capture — no ghosting/blur. Sticky scroll headers pinned at
  top: line 27 "function Header() {" and line 84 "{menus.map((menu: any) => (".
  Confirms/overlaps IMG_2157's lines 98-118 exactly (same content, same
  '#0A2C6E' border color at 113) and extends new content to lines 119-128
  (the menu.item nested MenuItem.map block).
  Tabs open: "date.tsx" (unsaved dot) and "header.tsx" (active, unsaved dot,
  italicized = preview tab). Breadcrumb: aqs-web-ui > src > components >
  header.tsx > (Header). Explorer sidebar (components expanded): radio.tsx,
  select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx
  (highlighted, "U" = untracked). Other src folders: config, constants,
  features (dot), hooks, lib (dot), pages (dot), providers, services,
  types (dot), utils; plus app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts. Status bar: branch "hitanshu/experimental*",
  41 errors / 0 warnings, "No Solution". Right edge shows the same
  reddish-orange vertical bar/streak in the overview ruler as prior photos
  of this file. Red squiggly underlines under nearly every line 98-128.
  Line 128 cut off at bottom edge ("borderRadius: '0px'," partially visible).
---
27  function Header() {              [sticky header]
84                          {menus.map((menu: any) => (   [sticky header]
    ⟪...⟫ (lines 85-97 not visible, matches IMG_2157)
98                              },
99                          }}
100                         >
101                             {menu['@name']}
102                         </Button>
103
104                         <Menu
105                             anchorEl={anchorEl}
106                             open={openMenu === menu['@name']}
107                             onClose={handleClose}
108                             TransitionComponent={Fade}
109                             sx={{
110                                 '& .MuiPaper-root': {
111                                     borderRadius: '0px',
112                                     boxShadow: 'none',
113                                     border: '1px solid #0A2C6E',
114                                     top: '60px !important',
115                                     '& .MuiMenu-list': {
116                                         padding: 0,
117                                     },
118                                 },
119                             }}
120                         >
121                             {menu.item &&
122                                 Array.isArray(menu.item) &&
123                                 menu.item.filter(Boolean).map((item: any, idx: number) => (
124                                     <MenuItem
125                                         key={idx}
126                                         onClick={() => handleMenuAction(item)}
127                                         sx={{
128                                             borderRadius: '0px',


========== IMG_2159.md ==========
---
photo: IMG_2159.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 27, 84, 110, 112-141 (sticky headers 27, 84, 110)
orientation: 180
confidence: high
notes: |
  Clean, sharp capture — no ghosting/blur. Three sticky-scroll headers
  pinned at top: line 27 "function Header() {", line 84
  "{menus.map((menu: any) => (", line 110 "'& .MuiPaper-root': {".
  Confirms/overlaps IMG_2158's lines 110-119 exactly and extends new
  content lines 120-141 (menu.item.filter(Boolean).map -> <MenuItem> block
  with its own sx, hover styles, and {item.label}). Zoomed crop confirms
  hex values precisely: line 131 color '#0A2C6E', line 133 backgroundColor
  '#004e9F', line 135 color '#fff'.
  Tabs open: "date.tsx" (unsaved dot) and "header.tsx" (active, unsaved dot,
  italicized = preview tab). Breadcrumb: aqs-web-ui > src > components >
  header.tsx > (Header). Explorer sidebar (components expanded): radio.tsx,
  select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx
  (highlighted, "U" = untracked). Other src folders: config, constants,
  features (dot), hooks, lib (dot), pages (dot), providers, services,
  types (dot), utils; plus app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts. Status bar: branch "hitanshu/experimental*",
  41 errors / 0 warnings, "No Solution". Right edge shows the same
  reddish-orange vertical bar/streak in the overview ruler as prior photos.
  Red squiggly underlines under nearly all lines 112-141. Line 142 (closing
  brackets ")}") cut off at very bottom edge, only squiggle tips visible.
---
27  function Header() {              [sticky header]
84                          {menus.map((menu: any) => (   [sticky header]
110                             '& .MuiPaper-root': {     [sticky header]
    ⟪...⟫ (line 111 "borderRadius: '0px'," not visible, matches IMG_2158)
112                                 boxShadow: 'none',
113                                 border: '1px solid #0A2C6E',
114                                 top: '60px !important',
115                                 '& .MuiMenu-list': {
116                                     padding: 0,
117                                 },
118                             },
119                         }}
120                     >
121                         {menu.item &&
122                             Array.isArray(menu.item) &&
123                             menu.item.filter(Boolean).map((item: any, idx: number) => (
124                                 <MenuItem
125                                     key={idx}
126                                     onClick={() => handleMenuAction(item)}
127                                     sx={{
128                                         borderRadius: '0px',
129                                         boxShadow: 'none',
130                                         fontSize: '0.9rem',
131                                         color: '#0A2C6E',
132                                         '&:hover': {
133                                             backgroundColor: '#004e9F',
134                                             boxShadow: 'none',
135                                             color: '#fff',
136                                             textDecoration: 'underline',
137                                         },
138                                     }}
139                                 >
140                                     {item.label}
141                                 </MenuItem>


========== IMG_2160.md ==========
---
photo: IMG_2160.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 27, 84, 122-152 (sticky headers 27, 84)
orientation: 180
confidence: high
notes: |
  Clean, sharp capture — no ghosting/blur. Sticky scroll headers pinned at
  top: line 27 "function Header() {" and line 84 "{menus.map((menu: any) => (".
  Confirms/overlaps IMG_2159's lines 122-141 exactly (same MenuItem sx block,
  same hex colors #0A2C6E / #004e9F / #fff) and extends new content lines
  142-152: closes out the MenuItem map, Menu, Box, menus.map, inner Stack,
  and outer left-side Stack, then opens a new right-side Stack with a
  "Dynamic Menus from API" comment.
  Tabs open: "date.tsx" (unsaved dot) and "header.tsx" (active, unsaved dot,
  italicized = preview tab). Breadcrumb: aqs-web-ui > src > components >
  header.tsx > (Header). Explorer sidebar (components expanded): radio.tsx,
  select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx
  (highlighted, "U" = untracked). Other src folders: config, constants,
  features (dot), hooks, lib (dot), pages (dot), providers, services,
  types (dot), utils; plus app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts. Status bar: branch "hitanshu/experimental*",
  41 errors / 0 warnings, "No Solution". Right edge shows the same
  reddish-orange vertical bar/streak in the overview ruler as prior photos.
  Line 121 ("{menu.item &&") only its top sliver is visible, cut by the
  sticky-header divider line.
---
27  function Header() {              [sticky header]
84                          {menus.map((menu: any) => (   [sticky header]
    ⟪...⟫ (line 121 "{menu.item &&" sliver only, matches IMG_2159)
122                             Array.isArray(menu.item) &&
123                             menu.item.filter(Boolean).map((item: any, idx: number) => (
124                                 <MenuItem
125                                     key={idx}
126                                     onClick={() => handleMenuAction(item)}
127                                     sx={{
128                                         borderRadius: '0px',
129                                         boxShadow: 'none',
130                                         fontSize: '0.9rem',
131                                         color: '#0A2C6E',
132                                         '&:hover': {
133                                             backgroundColor: '#004e9F',
134                                             boxShadow: 'none',
135                                             color: '#fff',
136                                             textDecoration: 'underline',
137                                         },
138                                     }}
139                                 >
140                                     {item.label}
141                                 </MenuItem>
142                             ))}
143                         </Menu>
144                     </Box>
145                 ))}
146             </Stack>
147             )}
148         </Stack>
149
150             {/* RIGHT SIDE: MENUS + LOGOUT */}
151             <Stack direction={'row'} gap={3} alignItems={'center'}>
152                 {/* Dynamic Menus from API */}


========== IMG_2161.md ==========
---
photo: IMG_2161.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 27, 84, 123, 138-169 (sticky headers 27, 84, 123)
orientation: 180
confidence: high
notes: |
  Mostly clean/sharp capture; a soft out-of-focus colorful blur/reflection
  overlays the right two-thirds of the editor pane (looks like a lighting
  or bokeh reflection on the laptop screen, not a text-scroll ghosting
  artifact) but it does not obscure legibility of the code text underneath.
  Third sticky-scroll header now reads line 123
  "menu.item.filter(Boolean).map((item: any, idx: number) => (" (was line
  110 in IMG_2159/2160 — sticky scope has updated as the view scrolled
  past the MuiPaper-root sx block). Confirms/overlaps IMG_2160's lines
  138-152 and extends new content lines 153-168: the isLoggedIn ternary
  with a Logout <Button> (tertiary variant) followed by ") : (" opening the
  else-branch with a Cancel <Button> (primary variant).
  Line 158 className has a noticeable gap of extra whitespace before the
  closing quote — "rounded-none! px-7! py-4!    " — transcribed verbatim;
  possibly trailing whitespace in source, or additional utility classes
  obscured by the text-cursor I-beam (zoomed crop did not resolve further
  text there).
  Tabs open: "date.tsx" (unsaved dot) and "header.tsx" (active, unsaved dot,
  italicized = preview tab). Breadcrumb: aqs-web-ui > src > components >
  header.tsx > (Header). Explorer sidebar (components expanded): radio.tsx,
  select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx
  (highlighted, "U" = untracked). Other src folders: config, constants,
  features (dot), hooks, lib (dot), pages (dot), providers, services,
  types (dot), utils; plus app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts. Status bar: branch "hitanshu/experimental*",
  41 errors / 0 warnings, "No Solution". Right edge shows the same
  reddish-orange vertical bar/streak in the overview ruler as prior photos.
---
27  function Header() {              [sticky header]
84                          {menus.map((menu: any) => (   [sticky header]
123                             menu.item.filter(Boolean).map((item: any, idx: number) => (   [sticky header]
    ⟪...⟫ (matches IMG_2160 for lines up to 137)
138                                     },
139                                 }}
140                             >
141                                 {item.label}
142                             </MenuItem>
143                         ))}
144                     </Menu>
145                 </Box>
146             ))}
147         </Stack>
148         )}
149     </Stack>
150
151         {/* RIGHT SIDE: MENUS + LOGOUT */}
152         <Stack direction={'row'} gap={3} alignItems={'center'}>
153             {/* Dynamic Menus from API */}
154
155             {/* Logout / Cancel */}
156             {isLoggedIn ? (
157                 <Button
158                     variant="tertiary"
159                     className="rounded-none! px-7! py-4!    "
160                     endIcon={<LogoutIcon />}
161                     onClick={handleLogout}
162                 >
163                     Logout
164                 </Button>
165             ) : (
166                 <>
167                     <Button variant="primary" className="px-7! py-1!" onClick={handleCancel}>
168                         Cancel
169                     </Button>


========== IMG_2162.md ==========
---
photo: IMG_2162.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 27, 152-182 (sticky header 27; reaches end of file)
orientation: 180
confidence: high
notes: |
  Mostly clean/sharp capture; same soft out-of-focus colorful blur/reflection
  as IMG_2161 overlays the right two-thirds of the pane but does not obscure
  code legibility. Sticky scroll now shows only line 27 "function Header() {"
  pinned (the deeper sticky levels from IMG_2161 have scrolled away).
  This photo reaches the END of the file: closes the Cancel/Help button
  fragment, the ternary, the right-side Stack, the outer Stack, the return
  statement, and the Header function, followed by a horizontal-rule comment
  and "export { Header };" at line 181. Line 182 is blank/EOF.
  Confirms/overlaps IMG_2161's lines 152-169 exactly (isLoggedIn ternary,
  Logout button) and adds new content 169-182: a second Button in the
  ternary's else-branch ("Cancel" was already known; here also shows
  variant="secondary" "Help" button, then closing tags, then export).
  Tabs open: "date.tsx" (unsaved dot) and "header.tsx" (active, unsaved dot,
  italicized = preview tab). Breadcrumb: aqs-web-ui > src > components >
  header.tsx > (Header). Explorer sidebar (components expanded): radio.tsx,
  select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx
  (highlighted, "U" = untracked). Other src folders: config, constants,
  features (dot), hooks, lib (dot), pages (dot), providers, services,
  types (dot), utils; plus app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts. Status bar: branch "hitanshu/experimental*",
  41 errors / 0 warnings, "No Solution". Right edge shows the same
  reddish-orange vertical bar/streak in the overview ruler as prior photos
  (ends partway down since file ends at 182).
---
27  function Header() {              [sticky header]
152                         {/* Dynamic Menus from API */}
153
154             {/* Logout / Cancel */}
155             {isLoggedIn ? (
156                 <Button
157                     variant="tertiary"
158                     className="rounded-none! px-7! py-4!    "
159                     endIcon={<LogoutIcon />}
160                     onClick={handleLogout}
161                 >
162                     Logout
163                 </Button>
164             ) : (
165                 <>
166                     <Button variant="primary" className="px-7! py-1!" onClick={handleCancel}>
167                         Cancel
168                     </Button>
169                     <Button variant="secondary" className="px-7! py-1!">
170                         Help
171                     </Button>
172                 </>
173             )}
174         </Stack>
175     </Stack>
176         );
177 }
178
179 // ------------------------------------------
180
181 export { Header };
182


========== IMG_2163.md ==========
---
photo: IMG_2163.JPG
type: vscode-code
file: aqs-web-ui/src/components/header.tsx
lines: 27, 165-182 (sticky header 27; duplicate of IMG_2162's tail)
orientation: 180
confidence: high
notes: |
  DUPLICATE content — no new lines beyond IMG_2162. This photo shows the
  same end-of-file range (165-182: the ternary's Cancel/Help buttons
  through "export { Header };") that IMG_2162 already fully captured,
  just scrolled slightly further so only line 27 remains sticky-pinned
  (the 152-164 sticky levels from IMG_2162 have scrolled off). Included
  for completeness/cross-validation only; transcript below is identical
  to IMG_2162's 165-182 range. Same soft out-of-focus colorful blur/
  reflection over the right two-thirds of the pane as IMG_2161/2162,
  does not obscure legibility.
  Tabs open: "date.tsx" (unsaved dot) and "header.tsx" (active, unsaved dot,
  italicized = preview tab). Breadcrumb: aqs-web-ui > src > components >
  header.tsx > (Header). Explorer sidebar (components expanded): radio.tsx,
  select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx
  (highlighted, "U" = untracked). Other src folders: config, constants,
  features (dot), hooks, lib (dot), pages (dot), providers, services,
  types (dot), utils; plus app.css, app.tsx, context.ts, main.tsx,
  routes.tsx, store.ts, types.ts. Status bar: branch "hitanshu/experimental*",
  41 errors / 0 warnings, "No Solution".
---
27  function Header() {              [sticky header]
165                 <>
166                     <Button variant="primary" className="px-7! py-1!" onClick={handleCancel}>
167                         Cancel
168                     </Button>
169                     <Button variant="secondary" className="px-7! py-1!">
170                         Help
171                     </Button>
172                 </>
173             )}
174         </Stack>
175     </Stack>
176         );
177 }
178
179 // ------------------------------------------
180
181 export { Header };
182
