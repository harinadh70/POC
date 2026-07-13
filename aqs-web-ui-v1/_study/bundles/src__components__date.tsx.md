# BUNDLE for src/components/date.tsx
# 22 photo fragment(s), ascending start-line order.


========== IMG_2049.md ==========
---
photo: IMG_2049.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 1-34
orientation: 0
confidence: high
notes: Tab "date.tsx 9+" (9+ problems badge). Breadcrumb aqs-web-ui > src > components > date.tsx. Status bar branch hitanshu/experimental*, 25 errors 0 warnings, "No Solution" indicator, Ln 1 Col 1, TypeScript JSX, CRLF, UTF-8. Squiggly underlines under most import module specifiers (react, dayjs, @mui/* — likely unresolved modules) and under currentMonth/onMonthChange on line 24. Explorer sidebar visible: aqs-web-ui > src > components with data-grid (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView (TabPanel.tsx, TabView.tsx), action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx (selected, 9+), dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx. OUTLINE / TIMELINE / C# PROJECT DETAILS sections below. Line 34 partially cut off at bottom (reads "setMonthAnchor(null);" faint). Time 4:37 PM 7/10/2026.
---
 1	import type { FC } from 'react';
 2	import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
 3	import dayjs, { Dayjs } from 'dayjs';
 4	
 5	import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
 6	import { DatePicker } from '@mui/x-date-pickers/DatePicker';
 7	import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
 8	
 9	import { Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
10	
11	import { ChevronLeft, ChevronRight, ArrowDropDown } from '@mui/icons-material';
12	
13	import type { CommitEventType } from '@/types';
14	
15	/* ==========================================================
16	   Custom Calendar Header (Month + Year Dropdown)
17	   ========================================================== */
18	
19	interface CustomCalendarHeaderProps {
20	    currentMonth: Dayjs;
21	    onMonthChange: (date: Dayjs) => void;
22	}
23	
24	const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
25	    const [monthAnchor, setMonthAnchor] = useState<HTMLElement | null>(null);
26	    const [yearAnchor, setYearAnchor] = useState<HTMLElement | null>(null);
27	
28	    const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMM'));
29	    const years = Array.from({ length: 36 }, (_, i) => 2000 + i);
30	
31	    const handleMonthSelect = useCallback(
32	        (monthIndex: number) => {
33	            onMonthChange(currentMonth.month(monthIndex));
34	            setMonthAnchor(null);


========== IMG_2050.md ==========
---
photo: IMG_2050.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 9-42
orientation: 0
confidence: high
notes: Same file as IMG_2049, scrolled down slightly (overlaps lines 9-34). Tab "date.tsx 9+". Squiggles under '@mui/material' and '@mui/icons-material' import specifiers and under currentMonth/onMonthChange on line 24. Status bar: hitanshu/experimental*, 25 errors 0 warnings, No Solution, Ln 1 Col 1, TypeScript JSX. Explorer sidebar same file list as IMG_2049 (components: data-grid, modal-dialog, tabView, action-buttons.tsx ... form-renderer.tsx). Line 42 cut off at bottom (faint "setYearAnchor(null);"). Time 4:37 PM 7/10/2026.
---
 9	import { Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
10	
11	import { ChevronLeft, ChevronRight, ArrowDropDown } from '@mui/icons-material';
12	
13	import type { CommitEventType } from '@/types';
14	
15	/* ==========================================================
16	   Custom Calendar Header (Month + Year Dropdown)
17	   ========================================================== */
18	
19	interface CustomCalendarHeaderProps {
20	    currentMonth: Dayjs;
21	    onMonthChange: (date: Dayjs) => void;
22	}
23	
24	const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
25	    const [monthAnchor, setMonthAnchor] = useState<HTMLElement | null>(null);
26	    const [yearAnchor, setYearAnchor] = useState<HTMLElement | null>(null);
27	
28	    const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMM'));
29	    const years = Array.from({ length: 36 }, (_, i) => 2000 + i);
30	
31	    const handleMonthSelect = useCallback(
32	        (monthIndex: number) => {
33	            onMonthChange(currentMonth.month(monthIndex));
34	            setMonthAnchor(null);
35	        },
36	        [currentMonth, onMonthChange],
37	    );
38	
39	    const handleYearSelect = useCallback(
40	        (year: number) => {
41	            onMonthChange(currentMonth.year(year));
42	            setYearAnchor(null);   ⟪line mostly cut off at bottom edge; faint but consistent with this reading⟫


========== IMG_2051.md ==========
---
photo: IMG_2051.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 17-50
orientation: 0
confidence: high
notes: Continuation of IMG_2049/2050 (overlaps 17-45). Tab "date.tsx 9+". Squiggles under currentMonth/onMonthChange destructure on line 24. Status bar: hitanshu/experimental*, 25 errors 0 warnings, No Solution, Ln 1 Col 1. Explorer sidebar identical to prior photos. Line 50 cut off at bottom edge (partially visible, illegible). Time 4:37 PM 7/10/2026.
---
17	   ========================================================== */
18	
19	interface CustomCalendarHeaderProps {
20	    currentMonth: Dayjs;
21	    onMonthChange: (date: Dayjs) => void;
22	}
23	
24	const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
25	    const [monthAnchor, setMonthAnchor] = useState<HTMLElement | null>(null);
26	    const [yearAnchor, setYearAnchor] = useState<HTMLElement | null>(null);
27	
28	    const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMM'));
29	    const years = Array.from({ length: 36 }, (_, i) => 2000 + i);
30	
31	    const handleMonthSelect = useCallback(
32	        (monthIndex: number) => {
33	            onMonthChange(currentMonth.month(monthIndex));
34	            setMonthAnchor(null);
35	        },
36	        [currentMonth, onMonthChange],
37	    );
38	
39	    const handleYearSelect = useCallback(
40	        (year: number) => {
41	            onMonthChange(currentMonth.year(year));
42	            setYearAnchor(null);
43	        },
44	        [currentMonth, onMonthChange],
45	    );
46	
47	    return (
48	        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
49	            {/* MONTH */}
50	            ⟪?⟫ (line cut off at bottom edge)


========== IMG_2052.md ==========
---
photo: IMG_2052.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 24-57
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 24 (const CustomCalendarHeader...) with squiggles under currentMonth/onMonthChange; editor body starts at line 26 (line 25 hidden by sticky header). Overlaps IMG_2051 (26-49), new content 50-57. Tab "date.tsx 9+". Status bar: hitanshu/experimental*, 25 errors 0 warnings, No Solution, TypeScript JSX. Explorer sidebar same as prior photos. Time 4:37 PM 7/10/2026.
---
24	const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {   [sticky scroll]
26	    const [yearAnchor, setYearAnchor] = useState<HTMLElement | null>(null);
27	
28	    const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMM'));
29	    const years = Array.from({ length: 36 }, (_, i) => 2000 + i);
30	
31	    const handleMonthSelect = useCallback(
32	        (monthIndex: number) => {
33	            onMonthChange(currentMonth.month(monthIndex));
34	            setMonthAnchor(null);
35	        },
36	        [currentMonth, onMonthChange],
37	    );
38	
39	    const handleYearSelect = useCallback(
40	        (year: number) => {
41	            onMonthChange(currentMonth.year(year));
42	            setYearAnchor(null);
43	        },
44	        [currentMonth, onMonthChange],
45	    );
46	
47	    return (
48	        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
49	            {/* MONTH */}
50	            <Box display="flex" alignItems="center" gap={1}>
51	                <IconButton
52	                    size="small"
53	                    onClick={() => onMonthChange(currentMonth.subtract(1, 'month'))}
54	                >
55	                    <ChevronLeft fontSize="small" />
56	                </IconButton>
57	


========== IMG_2053.md ==========
---
photo: IMG_2053.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 24-68 (sticky scroll: 24, 31; visible body: 37-68)
orientation: 0
confidence: high
notes: Sticky-scroll header shows enclosing scope lines 24 and 31 (function signature and handleMonthSelect useCallback start) which are folded above the actually-scrolled body starting at line 37. Explorer sidebar shows aqs-web-ui/src/components/ expanded with data-grid/, modal-dialog/, tabView/ subfolders and files: data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx, index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts, TabPanel.tsx, TabView.tsx, action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx (highlighted/active, "9+" unsaved changes badge), dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx. Tab bar shows single open tab "date.tsx" with "9+" modified indicator. Breadcrumb: aqs-web-ui > src > components > date.tsx > ... Status bar: branch "hitanshu/experimental*", 25 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Lines 59-63 (display, alignItems, sx, onClick, closing >) all have orange squiggly underlines (lint/type warnings) on the JSX prop area. Windows taskbar visible at bottom, time 4:37 PM 7/10/2026.
---
24      const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
31          const handleMonthSelect = useCallback(
37          );
38
39          const handleYearSelect = useCallback(
40              (year: number) => {
41                  onMonthChange(currentMonth.year(year));
42                  setYearAnchor(null);
43              },
44              [currentMonth, onMonthChange],
45          );
46
47          return (
48              <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
49                  {/* MONTH */}
50                  <Box display="flex" alignItems="center" gap={1}>
51                      <IconButton
52                          size="small"
53                          onClick={() => onMonthChange(currentMonth.subtract(1, 'month'))}
54                      >
55                          <ChevronLeft fontSize="small" />
56                      </IconButton>
57
58                      <Box
59                          display="flex"
60                          alignItems="center"
61                          sx={{ cursor: 'pointer' }}
62                          onClick={(e) => setMonthAnchor(e.currentTarget)}
63                      >
64                          <Typography fontWeight={600}>{currentMonth.format('MMM')}</Typography>
65                          <ArrowDropDown />
66                      </Box>
67
68                      <IconButton


========== IMG_2054.md ==========
---
photo: IMG_2054.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 24-73 (sticky scroll: 24, 39/40 overlapping; visible body: 43-73)
orientation: 0
confidence: high
notes: Sticky-scroll shows line 24 (function signature) and line 39 "const handleYearSelect = useCallback(" with line 40 "(year: number) => {" visibly overlapping/double-exposed underneath it (mid-scroll capture artifact) before body resumes at line 43. Same file/tab as IMG_2053, scrolled down slightly to reveal more (previously line 68 was the last cut-off line; now full IconButton block 68-73 visible). Explorer sidebar identical to IMG_2053 (date.tsx highlighted, 9+ unsaved). Lines 60-63 show orange squiggly lint underlines (display, alignItems, sx, onClick, closing >) same as prior photo. Status bar: branch "hitanshu/experimental*", 25 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 4:37 PM 7/10/2026.
---
24      const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
39          const handleYearSelect = useCallback(
40              (year: number) => {
43              },
44              [currentMonth, onMonthChange],
45          );
46
47          return (
48              <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
49                  {/* MONTH */}
50                  <Box display="flex" alignItems="center" gap={1}>
51                      <IconButton
52                          size="small"
53                          onClick={() => onMonthChange(currentMonth.subtract(1, 'month'))}
54                      >
55                          <ChevronLeft fontSize="small" />
56                      </IconButton>
57
58                      <Box
59                          display="flex"
60                          alignItems="center"
61                          sx={{ cursor: 'pointer' }}
62                          onClick={(e) => setMonthAnchor(e.currentTarget)}
63                      >
64                          <Typography fontWeight={600}>{currentMonth.format('MMM')}</Typography>
65                          <ArrowDropDown />
66                      </Box>
67
68                      <IconButton
69                          size="small"
70                          onClick={() => onMonthChange(currentMonth.add(1, 'month'))}
71                      >
72                          <ChevronRight fontSize="small" />
73                      </IconButton>


========== IMG_2055.md ==========
---
photo: IMG_2055.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 24-84 (sticky scroll: 24; visible body: 52-84)
orientation: 0
confidence: high
notes: Sticky-scroll shows only line 24 (function signature) this time. Same file/tab as IMG_2053/2054, scrolled further down revealing the month <Menu> dropdown block (lines 75-84) for the first time. Explorer sidebar identical to prior photos (date.tsx highlighted, 9+ unsaved). Lines 60-64 still show orange squiggly lint underlines (display, alignItems, sx, onClick, closing >). Status bar: branch "hitanshu/experimental*", 25 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 4:37 PM 7/10/2026.
---
24      const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
52                      size="small"
53                      onClick={() => onMonthChange(currentMonth.subtract(1, 'month'))}
54                  >
55                      <ChevronLeft fontSize="small" />
56                  </IconButton>
57
58                  <Box
59                      display="flex"
60                      alignItems="center"
61                      sx={{ cursor: 'pointer' }}
62                      onClick={(e) => setMonthAnchor(e.currentTarget)}
63                  >
64                      <Typography fontWeight={600}>{currentMonth.format('MMM')}</Typography>
65                      <ArrowDropDown />
66                  </Box>
67
68                  <IconButton
69                      size="small"
70                      onClick={() => onMonthChange(currentMonth.add(1, 'month'))}
71                  >
72                      <ChevronRight fontSize="small" />
73                  </IconButton>
74
75                  <Menu
76                      anchorEl={monthAnchor}
77                      open={Boolean(monthAnchor)}
78                      onClose={() => setMonthAnchor(null)}
79                  >
80                      {months.map((m, i) => (
81                          <MenuItem key={m} onClick={() => handleMonthSelect(i)}>
82                              {m}
83                          </MenuItem>
84                      ))}


========== IMG_2056.md ==========
---
photo: IMG_2056.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 24-94 (sticky scroll: 24; visible body: 63-94)
orientation: 0
confidence: high
notes: Sticky-scroll shows line 24 (function signature) overlapping line 63 in the photo (double-exposure scroll artifact) but line 63's content (closing ">") is legible and consistent with prior photos. Scrolled further down than IMG_2055, revealing the end of the MONTH Box block (close </Menu>, </Box> at line 87), a "{/* YEAR */}" comment at 88, and the start of the YEAR section's IconButton (subtract 1 year) block, lines 89-94 (cut off mid-ChevronLeft at bottom by status bar). Explorer sidebar identical to prior photos (date.tsx highlighted, 9+ unsaved). Status bar: branch "hitanshu/experimental*", 25 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 4:37 PM 7/10/2026.
---
24      const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
63                  >
64                      <Typography fontWeight={600}>{currentMonth.format('MMM')}</Typography>
65                      <ArrowDropDown />
66                  </Box>
67
68                  <IconButton
69                      size="small"
70                      onClick={() => onMonthChange(currentMonth.add(1, 'month'))}
71                  >
72                      <ChevronRight fontSize="small" />
73                  </IconButton>
74
75                  <Menu
76                      anchorEl={monthAnchor}
77                      open={Boolean(monthAnchor)}
78                      onClose={() => setMonthAnchor(null)}
79                  >
80                      {months.map((m, i) => (
81                          <MenuItem key={m} onClick={() => handleMonthSelect(i)}>
82                              {m}
83                          </MenuItem>
84                      ))}
85                  </Menu>
86              </Box>
87
88              {/* YEAR */}
89              <Box display="flex" alignItems="center" gap={1}>
90                  <IconButton
91                      size="small"
92                      onClick={() => onMonthChange(currentMonth.subtract(1, 'year'))}
93                  >
94                      <ChevronLeft fontSize="small" />


========== IMG_2057.md ==========
---
photo: IMG_2057.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 24-105 (sticky scroll: 24; visible body: 73-105)
orientation: 0
confidence: high
notes: Sticky-scroll shows line 24 (function signature). Scrolled further down than IMG_2056, revealing the tail of the MONTH Menu block (73-87, repeats content already captured) plus the full YEAR section mirroring the MONTH section: IconButton (subtract 1 year, 90-96), and a clickable Typography Box showing currentMonth.format('YYYY') with ArrowDropDown (97-105). Explorer sidebar identical to prior photos (date.tsx highlighted, 9+ unsaved). No lint squiggles visible on this scroll position. Status bar: branch "hitanshu/experimental*", 25 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 4:37 PM 7/10/2026.
---
24      const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
73                  </IconButton>
74
75                  <Menu
76                      anchorEl={monthAnchor}
77                      open={Boolean(monthAnchor)}
78                      onClose={() => setMonthAnchor(null)}
79                  >
80                      {months.map((m, i) => (
81                          <MenuItem key={m} onClick={() => handleMonthSelect(i)}>
82                              {m}
83                          </MenuItem>
84                      ))}
85                  </Menu>
86              </Box>
87
88              {/* YEAR */}
89              <Box display="flex" alignItems="center" gap={1}>
90                  <IconButton
91                      size="small"
92                      onClick={() => onMonthChange(currentMonth.subtract(1, 'year'))}
93                  >
94                      <ChevronLeft fontSize="small" />
95                  </IconButton>
96
97                  <Box
98                      display="flex"
99                      alignItems="center"
100                     sx={{ cursor: 'pointer' }}
101                     onClick={(e) => setYearAnchor(e.currentTarget)}
102                 >
103                     <Typography fontWeight={600}>{currentMonth.format('YYYY')}</Typography>
104                     <ArrowDropDown />
105                 </Box>


========== IMG_2058.md ==========
---
photo: IMG_2058.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 24-115 (sticky scroll: 24; visible body: 84-115)
orientation: 0
confidence: high
notes: Sticky-scroll shows line 24 (function signature). Scrolled further down than IMG_2057, revealing the rest of the YEAR section: the clickable year-display Box closing (106), an IconButton (add 1 year, single-line-collapsed style unlike the month version, 107-109), and the start of a year <Menu> (111-115, cut off by status bar right after the opening ">"). Note IconButton at line 107 is written compactly on one line "<IconButton size="small" onClick={...}" unlike the MONTH section's multi-line IconButton props. Explorer sidebar identical to prior photos (date.tsx highlighted, 9+ unsaved). Status bar: branch "hitanshu/experimental*", 25 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 4:37 PM 7/10/2026.
---
24      const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
84                      ))}
85                  </Menu>
86              </Box>
87
88              {/* YEAR */}
89              <Box display="flex" alignItems="center" gap={1}>
90                  <IconButton
91                      size="small"
92                      onClick={() => onMonthChange(currentMonth.subtract(1, 'year'))}
93                  >
94                      <ChevronLeft fontSize="small" />
95                  </IconButton>
96
97                  <Box
98                      display="flex"
99                      alignItems="center"
100                     sx={{ cursor: 'pointer' }}
101                     onClick={(e) => setYearAnchor(e.currentTarget)}
102                 >
103                     <Typography fontWeight={600}>{currentMonth.format('YYYY')}</Typography>
104                     <ArrowDropDown />
105                 </Box>
106
107                 <IconButton size="small" onClick={() => onMonthChange(currentMonth.add(1, 'year'))}>
108                     <ChevronRight fontSize="small" />
109                 </IconButton>
110
111                 <Menu
112                     anchorEl={yearAnchor}
113                     open={Boolean(yearAnchor)}
114                     onClose={() => setYearAnchor(null)}
115                 >


========== IMG_2059.md ==========
---
photo: IMG_2059.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 24-126 (sticky scroll: 24; visible body: 94-125, line 126 cut off/blank)
orientation: 0
confidence: high
notes: Sticky-scroll shows line 24 (function signature). Scrolled further down than IMG_2058, revealing the rest of the YEAR section including its <Menu> with years.map(...) MenuItem list (lines 116-121, mirrors the MONTH Menu structure), then the closing tags for both YEAR Box, the outer flex Box (justifyContent space-between), the return(...) parenthesis, and the component's closing "};" at line 125. This appears to be the end of the CustomCalendarHeader component. Explorer sidebar identical to prior photos (date.tsx highlighted, 9+ unsaved). Status bar: branch "hitanshu/experimental*", 25 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 4:37 PM 7/10/2026.
---
24      const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
94                      <ChevronLeft fontSize="small" />
95                  </IconButton>
96
97                  <Box
98                      display="flex"
99                      alignItems="center"
100                     sx={{ cursor: 'pointer' }}
101                     onClick={(e) => setYearAnchor(e.currentTarget)}
102                 >
103                     <Typography fontWeight={600}>{currentMonth.format('YYYY')}</Typography>
104                     <ArrowDropDown />
105                 </Box>
106
107                 <IconButton size="small" onClick={() => onMonthChange(currentMonth.add(1, 'year'))}>
108                     <ChevronRight fontSize="small" />
109                 </IconButton>
110
111                 <Menu
112                     anchorEl={yearAnchor}
113                     open={Boolean(yearAnchor)}
114                     onClose={() => setYearAnchor(null)}
115                 >
116                     {years.map((y) => (
117                         <MenuItem key={y} onClick={() => handleYearSelect(y)}>
118                             {y}
119                         </MenuItem>
120                     ))}
121                 </Menu>
122             </Box>
123         </Box>
124     );
125 };
126


========== IMG_2060.md ==========
---
photo: IMG_2060.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 24-136 (sticky scroll: 24; visible body: 105-136)
orientation: 0
confidence: high
notes: Sticky-scroll shows line 24 (function signature of CustomCalendarHeader, now above where the component itself ends at line 125). Scrolled further down than IMG_2059, showing the CustomCalendarHeader component's end (}; at 125) followed by a large comment-block section divider "/* ======... DateInput Component ======... */" (127-130, with a checkmark-emoji-like icon rendered inline before "DateInput Component" - likely a codicon/GitLens decoration, not literal text) and the start of a new exported interface DateInputProps (131-136+, cut off after minDate?: string;). Explorer sidebar identical to prior photos (date.tsx highlighted, 9+ unsaved). Status bar: branch "hitanshu/experimental*", 25 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 4:37 PM 7/10/2026.
---
24      const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
105                 </Box>
106
107                 <IconButton size="small" onClick={() => onMonthChange(currentMonth.add(1, 'year'))}>
108                     <ChevronRight fontSize="small" />
109                 </IconButton>
110
111                 <Menu
112                     anchorEl={yearAnchor}
113                     open={Boolean(yearAnchor)}
114                     onClose={() => setYearAnchor(null)}
115                 >
116                     {years.map((y) => (
117                         <MenuItem key={y} onClick={() => handleYearSelect(y)}>
118                             {y}
119                         </MenuItem>
120                     ))}
121                 </Menu>
122             </Box>
123         </Box>
124     );
125 };
126
127 /* ================================================================
128     DateInput Component
129 ================================================================ */
130
131 export interface DateInputProps {
132     value: string;
133     onCommit?: (val: string, eventType: CommitEventType) => void;
134
135     dateFormat?: string;
136     minDate?: string;


========== IMG_2062.md ==========
---
photo: IMG_2062.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 24-142 (sticky scroll: 24; visible body: 110-142, line 142 barely legible)
orientation: 0
confidence: medium
notes: Sticky-scroll shows line 24 (CustomCalendarHeader signature, stale reference since that component already ended at 125 above the visible scroll area). Scrolled further down than IMG_2060, showing the tail of CustomCalendarHeader (repeats content already captured in IMG_2059/2060) plus the full DateInputProps interface (131-140: value, onCommit, dateFormat, minDate, maxDate, disabled, width) and the very start of the next declaration at line 142, which is almost entirely obscured/clipped by the VS Code status bar at the bottom of the photo (only top slivers of characters visible). Line 142 transcribed at low confidence as "export const DateInput: FC<DateInputProps> = ({" based on partial glyph shapes and syntax-highlight color pattern (blue const, teal DateInput, yellow FC, teal DateInputProps) — treat as tentative, to be confirmed by a later photo scrolled further. Explorer sidebar identical to prior photos (date.tsx no longer bold/highlighted-active in this shot but still shows "9+" unsaved badge). Status bar: branch "hitanshu/experimental*", 25 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 4:37 PM 7/10/2026.
---
24      const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
110
111                 <Menu
112                     anchorEl={yearAnchor}
113                     open={Boolean(yearAnchor)}
114                     onClose={() => setYearAnchor(null)}
115                 >
116                     {years.map((y) => (
117                         <MenuItem key={y} onClick={() => handleYearSelect(y)}>
118                             {y}
119                         </MenuItem>
120                     ))}
121                 </Menu>
122             </Box>
123         </Box>
124     );
125 };
126
127 /* ================================================================
128     DateInput Component
129 ================================================================ */
130
131 export interface DateInputProps {
132     value: string;
133     onCommit?: (val: string, eventType: CommitEventType) => void;
134
135     dateFormat?: string;
136     minDate?: string;
137     maxDate?: string;
138     disabled?: boolean;
139     width?: number | string;
140 }
141
142 export const DateInput: FC<DateInputProps> = ({⟪?⟫


========== IMG_2061.md ==========
---
photo: IMG_2061.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 102-133
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 24 (enclosing CustomCalendarHeader component). Tab "date.tsx 9+" (9+ badge also in Explorer next to date.tsx). Status bar - branch hitanshu/experimental*, 25 errors 0 warnings, "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Taskbar clock 4:37 PM 7/10/2026. Explorer sidebar visible under aqs-web-ui/src/components - data-grid/(data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog/(index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView/(TabPanel.tsx, TabView.tsx), action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx. Panels below - OUTLINE, TIMELINE, C# PROJECT DETAILS. Line 134 cut off at bottom edge. Minimap shows red/orange change markers.
---
Sticky scroll (line 24):
24	const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {

102	                >
103	                    <Typography fontWeight={600}>{currentMonth.format('YYYY')}</Typography>
104	                    <ArrowDropDown />
105	                </Box>
106	
107	                <IconButton size="small" onClick={() => onMonthChange(currentMonth.add(1, 'year'))}>
108	                    <ChevronRight fontSize="small" />
109	                </IconButton>
110	
111	                <Menu
112	                    anchorEl={yearAnchor}
113	                    open={Boolean(yearAnchor)}
114	                    onClose={() => setYearAnchor(null)}
115	                >
116	                    {years.map((y) => (
117	                        <MenuItem key={y} onClick={() => handleYearSelect(y)}>
118	                            {y}
119	                        </MenuItem>
120	                    ))}
121	                </Menu>
122	            </Box>
123	        </Box>
124	    );
125	};
126	
127	/* ============================================================
128	   ✅ DateInput Component
129	================================================================
130	============================================================ */
131	export interface DateInputProps {
132	    value: string;
133	    onCommit?: (val: string, eventType: CommitEventType) => void;


========== IMG_2063.md ==========
---
photo: IMG_2063.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 125-157 (no clear sticky-scroll header; visible body 125-157)
orientation: 0
confidence: high
notes: No legible sticky-scroll header this time — the row just above line 125 shows faint motion-blurred/double-exposed text (appears to be leftover interface-comment content from a prior scroll position) that is illegible; not transcribed per instructions (marked ⟪?⟫ omitted rather than guessed). This photo confirms line 142 exactly as tentatively read in IMG_2062: "export const DateInput: FC<DateInputProps> = ({". Reveals the full destructured props list for DateInput (143-149: value, onCommit, dateFormat = 'MM/DD/YYYY', minDate, maxDate, disabled, width = '100%'), the closing "}) => {" at 150, and the start of the component body: useState/useRef hook declarations (151-155) and the start of a useEffect (157), cut off at bottom by status bar. Several destructured identifiers (value, onCommit, minDate, maxDate, disabled) have orange squiggly underlines (likely "unused variable" TS hints since they're not yet referenced in the visible body). Explorer sidebar identical to prior photos (date.tsx highlighted, 9+ unsaved). Status bar: branch "hitanshu/experimental*", 25 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 4:37 PM 7/10/2026.
---
125 };
126
127 /* ================================================================
128     DateInput Component
129 ================================================================ */
130
131 export interface DateInputProps {
132     value: string;
133     onCommit?: (val: string, eventType: CommitEventType) => void;
134
135     dateFormat?: string;
136     minDate?: string;
137     maxDate?: string;
138     disabled?: boolean;
139     width?: number | string;
140 }
141
142 export const DateInput: FC<DateInputProps> = ({
143     value,
144     onCommit,
145     dateFormat = 'MM/DD/YYYY',
146     minDate,
147     maxDate,
148     disabled,
149     width = '100%',
150 }) => {
151     const [displayValue, setDisplayValue] = useState(value);
152     const [tempDate, setTempDate] = useState<Dayjs | null>(null);
153     const [open, setOpen] = useState(false);
154     const originalValueRef = useRef(value);
155     const allowCloseRef = useRef(false);
156
157     useEffect(() => {


========== IMG_2064.md ==========
---
photo: IMG_2064.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 131-165 (sticky scroll: 131; visible body: 134-165)
orientation: 0
confidence: high
notes: Sticky-scroll shows line 131 "export interface DateInputProps {". A second sticky row beneath it is motion-blurred/illegible (not transcribed). Scrolled slightly further than IMG_2063, revealing the end of the useEffect (158-160: setDisplayValue(value), originalValueRef.current = value, closing "}, [value]);") and the start of a useMemo computing parsedValue (162-165): guards on empty displayValue, then tries strict dayjs parsing with dateFormat, returning it if valid — cut off at bottom by status bar right after "if (strict.isValid()) return strict;". Explorer sidebar identical to prior photos (date.tsx highlighted, 9+ unsaved). Several destructured identifiers (onCommit, minDate, maxDate, disabled) still show orange squiggly underlines in the props destructure block. Status bar: branch "hitanshu/experimental*", 25 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 4:37 PM 7/10/2026.
---
131 export interface DateInputProps {
134
135     dateFormat?: string;
136     minDate?: string;
137     maxDate?: string;
138     disabled?: boolean;
139     width?: number | string;
140 }
141
142 export const DateInput: FC<DateInputProps> = ({
143     value,
144     onCommit,
145     dateFormat = 'MM/DD/YYYY',
146     minDate,
147     maxDate,
148     disabled,
149     width = '100%',
150 }) => {
151     const [displayValue, setDisplayValue] = useState(value);
152     const [tempDate, setTempDate] = useState<Dayjs | null>(null);
153     const [open, setOpen] = useState(false);
154     const originalValueRef = useRef(value);
155     const allowCloseRef = useRef(false);
156
157     useEffect(() => {
158         setDisplayValue(value);
159         originalValueRef.current = value;
160     }, [value]);
161
162     const parsedValue = useMemo(() => {
163         if (!displayValue) return null;
164         const strict = dayjs(displayValue, dateFormat, true);
165         if (strict.isValid()) return strict;


========== IMG_2065.md ==========
---
photo: IMG_2065.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 142-186 (sticky scroll: 142; visible body: 155-186)
orientation: 0
confidence: high
notes: Sticky-scroll shows line 142 "export const DateInput: FC<DateInputProps> = ({"; a second sticky row is motion-blurred/illegible. Scrolled further than IMG_2064, revealing the rest of the parsedValue useMemo (166-171: fallback to "loose" non-strict dayjs parse, then ISO parse, returning null if none valid, deps [displayValue, dateFormat]), min/max Dayjs conversions from minDate/maxDate props (172-174), the start of the return statement (175) wrapping a MUI <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ cancelButtonLabel: 'Close', okButtonLabel: 'OK' }}> (176-183), and the start of a <DatePicker> with value={open ? tempDate : parsedValue}, open={open}, disabled={disabled} (184-186, cut off at bottom by status bar). Explorer sidebar identical to prior photos (date.tsx highlighted, 9+ unsaved). Status bar: branch "hitanshu/experimental*", 25 errors/0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 4:37 PM 7/10/2026.
---
142 export const DateInput: FC<DateInputProps> = ({
155     const allowCloseRef = useRef(false);
156
157     useEffect(() => {
158         setDisplayValue(value);
159         originalValueRef.current = value;
160     }, [value]);
161
162     const parsedValue = useMemo(() => {
163         if (!displayValue) return null;
164         const strict = dayjs(displayValue, dateFormat, true);
165         if (strict.isValid()) return strict;
166         const loose = dayjs(displayValue, dateFormat);
167         if (loose.isValid()) return loose;
168         const iso = dayjs(displayValue);
169         return iso.isValid() ? iso : null;
170     }, [displayValue, dateFormat]);
171
172     const min = minDate ? dayjs(minDate) : undefined;
173     const max = maxDate ? dayjs(maxDate) : undefined;
174
175     return (
176         <LocalizationProvider
177             dateAdapter={AdapterDayjs}
178             localeText={{
179                 cancelButtonLabel: 'Close',
180                 okButtonLabel: 'OK',
181             }}
182         >
183             <DatePicker
184                 value={open ? tempDate : parsedValue}
185                 open={open}
186                 disabled={disabled}


========== IMG_2066.md ==========
---
photo: IMG_2066.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 169-199
orientation: 0
confidence: high
notes: Two sticky-scroll headers stacked at top - line 142 `export const DateInput: FC<DateInputProps> = ({` and line 162 `const parsedValue = useMemo(() => {`. Line 199 cut off at bottom edge (only comment text visible, next line "if (...)" clipped). Tab "date.tsx 9+" active, date.tsx highlighted in Explorer. Status bar: hitanshu/experimental*, 25 errors 0 warnings, No Solution. Explorer sidebar: components/ containing data-grid/, modal-dialog/, tabView/, action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx, error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx. Taskbar clock 4:37 PM 7/10/2026.
---
Sticky scroll:
142	export const DateInput: FC<DateInputProps> = ({
162	    const parsedValue = useMemo(() => {

169	        return iso.isValid() ? iso : null;
170	    }, [displayValue, dateFormat]);
171	
172	    const min = minDate ? dayjs(minDate) : undefined;
173	    const max = maxDate ? dayjs(maxDate) : undefined;
174	
175	    return (
176	        <LocalizationProvider
177	            dateAdapter={AdapterDayjs}
178	            localeText={{
179	                cancelButtonLabel: 'Close',
180	                okButtonLabel: 'OK',
181	            }}
182	        >
183	            <DatePicker
184	                value={open ? tempDate : parsedValue}
185	                open={open}
186	                disabled={disabled}
187	                minDate={min}
188	                maxDate={max}
189	                format={dateFormat}
190	                closeOnSelect={false}
191	                sx={{ width: '100%' }}
192	                onOpen={() => {
193	                    setTempDate(parsedValue);
194	                    originalValueRef.current = displayValue;
195	                    allowCloseRef.current = false;
196	                    setOpen(true);
197	                }}
198	                onClose={() => {
199	                    // Prevent closing unless explicitly allowed by OK/Cancel


========== IMG_2067.md ==========
---
photo: IMG_2067.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 184-215
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 142 `export const DateInput: FC<DateInputProps> = ({`. Continues from IMG_2066 (overlap 184-199). Line 215 cut off at right/bottom edge (sx: { width } shown, rest of object not visible). Tab "date.tsx 9+" active. Status bar: hitanshu/experimental*, 25 errors 0 warnings, No Solution. Same Explorer sidebar tree as IMG_2066.
---
Sticky scroll:
142	export const DateInput: FC<DateInputProps> = ({

184	                value={open ? tempDate : parsedValue}
185	                open={open}
186	                disabled={disabled}
187	                minDate={min}
188	                maxDate={max}
189	                format={dateFormat}
190	                closeOnSelect={false}
191	                sx={{ width: '100%' }}
192	                onOpen={() => {
193	                    setTempDate(parsedValue);
194	                    originalValueRef.current = displayValue;
195	                    allowCloseRef.current = false;
196	                    setOpen(true);
197	                }}
198	                onClose={() => {
199	                    // Prevent closing unless explicitly allowed by OK/Cancel
200	                    if (allowCloseRef.current) {
201	                        setOpen(false);
202	                    } else {
203	                        // Re-open the picker to prevent accidental closing
204	                        setOpen(false);
205	                    }
206	                }}
207	                onChange={(newValue) => setTempDate(newValue)}
208	                slotProps={{
209	                    actionBar: {
210	                        actions: [],
211	                    },
212	                    textField: {
213	                        fullWidth: true,
214	                        onBlur: () => onCommit?.(displayValue, 'blur'),
215	                        sx: { width },


========== IMG_2068.md ==========
---
photo: IMG_2068.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 197-228
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 142 `export const DateInput: FC<DateInputProps> = ({`. Continues from IMG_2067 (overlap 197-215). Line 228 cut off at bottom edge. Red squiggly underlines (linter warnings) on lines 224-228 area (className, disabled, onClick attributes). Tab "date.tsx 9+" active. Status bar: hitanshu/experimental*, 25 errors 0 warnings, No Solution.
---
Sticky scroll:
142	export const DateInput: FC<DateInputProps> = ({

197	                }}
198	                onClose={() => {
199	                    // Prevent closing unless explicitly allowed by OK/Cancel
200	                    if (allowCloseRef.current) {
201	                        setOpen(false);
202	                    } else {
203	                        // Re-open the picker to prevent accidental closing
204	                        setOpen(false);
205	                    }
206	                }}
207	                onChange={(newValue) => setTempDate(newValue)}
208	                slotProps={{
209	                    actionBar: {
210	                        actions: [],
211	                    },
212	                    textField: {
213	                        fullWidth: true,
214	                        onBlur: () => onCommit?.(displayValue, 'blur'),
215	                        sx: { width },
216	                    },
217	                }}
218	                slots={{
219	                    calendarHeader: CustomCalendarHeader,
220	                    actionBar: () => (
221	                        <Box display="flex" justifyContent="flex-end" gap={5} px={2} py={1}>
222	                            <button
223	                                className="text-[14px] cursor-pointer"
224	                                disabled={!tempDate}
225	                                onClick={() => {
226	                                    allowCloseRef.current = true;
227	                                    if (tempDate) {
228	                                        const str = tempDate.format(dateFormat);


========== IMG_2069.md ==========
---
photo: IMG_2069.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 212-244
orientation: 0
confidence: high
notes: Sticky-scroll header shows line 142 `export const DateInput: FC<DateInputProps> = ({`. Continues from IMG_2068 (overlap 212-228). Red squiggly underlines on JSX attribute lines 224-243 (className, disabled, onClick etc - likely eslint/jsx-a11y warnings on native <button>). Blank line at 235 between `>` and `OK` text-node. Tab "date.tsx 9+" active. Status bar: hitanshu/experimental*, 25 errors 0 warnings, No Solution.
---
Sticky scroll:
142	export const DateInput: FC<DateInputProps> = ({

212	                    textField: {
213	                        fullWidth: true,
214	                        onBlur: () => onCommit?.(displayValue, 'blur'),
215	                        sx: { width },
216	                    },
217	                }}
218	                slots={{
219	                    calendarHeader: CustomCalendarHeader,
220	                    actionBar: () => (
221	                        <Box display="flex" justifyContent="flex-end" gap={5} px={2} py={1}>
222	                            <button
223	                                className="text-[14px] cursor-pointer"
224	                                disabled={!tempDate}
225	                                onClick={() => {
226	                                    allowCloseRef.current = true;
227	                                    if (tempDate) {
228	                                        const str = tempDate.format(dateFormat);
229	                                        setDisplayValue(str);
230	                                        onCommit?.(str, 'change');
231	                                    }
232	                                    setOpen(false);
233	                                }}
234	                            >
235	
236	                                OK
237	                            </button>
238	                            <button
239	                                className="text-[14px] cursor-pointer"
240	                                onClick={() => {
241	                                    allowCloseRef.current = true;
242	                                    setDisplayValue(originalValueRef.current);
243	                                    setTempDate(null);
244	                                    setOpen(false);


========== IMG_2070.md ==========
---
photo: IMG_2070.JPG
type: vscode-code
file: aqs-web-ui/src/components/date.tsx
lines: 224-255
orientation: 0
confidence: high
notes: Two sticky-scroll headers - line 142 `export const DateInput: FC<DateInputProps> = ({` and line 220 `actionBar: () => (`. This photo shows the end of the file/component (closing `);` and `}` for the DateInput arrow function). Line 255 is cut off at bottom edge of screen - content not legible, presumed to be the closing `};` of the component but not confirmed; marked ⟪?⟫. Red squiggly underlines throughout JSX attribute block (224-244). Tab "date.tsx 9+" active. Status bar: hitanshu/experimental*, 25 errors 0 warnings, No Solution.
---
Sticky scroll:
142	export const DateInput: FC<DateInputProps> = ({
220	                    actionBar: () => (

224	                                disabled={!tempDate}
225	                                onClick={() => {
226	                                    allowCloseRef.current = true;
227	                                    if (tempDate) {
228	                                        const str = tempDate.format(dateFormat);
229	                                        setDisplayValue(str);
230	                                        onCommit?.(str, 'change');
231	                                    }
232	                                    setOpen(false);
233	                                }}
234	                            >
235	
236	                                OK
237	                            </button>
238	                            <button
239	                                className="text-[14px] cursor-pointer"
240	                                onClick={() => {
241	                                    allowCloseRef.current = true;
242	                                    setDisplayValue(originalValueRef.current);
243	                                    setTempDate(null);
244	                                    setOpen(false);
245	                                }}
246	                            >
247	                                Close
248	                            </button>
249	                        </Box>
250	                    ),
251	                }}
252	            />
253	        </LocalizationProvider>
254	    );
255	⟪?⟫ (cut off at bottom edge, not legible)
