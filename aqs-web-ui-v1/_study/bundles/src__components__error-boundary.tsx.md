# BUNDLE for src/components/error-boundary.tsx
# 8 photo fragment(s), ascending start-line order.


========== IMG_2090.md ==========
---
photo: IMG_2090.JPG
type: vscode-code
file: aqs-web-ui/src/components/error-boundary.tsx
lines: 1-34
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 with sips to /Users/harinadh/My code/aqs-web-ui/_study/rotated/IMG_2090.jpg and transcribed from that. No sticky-scroll header (top of file, function body not yet indented deep enough). Tab bar: date.tsx (9+ problems), error-boundary.tsx (5 problems, active). Breadcrumb: aqs-web-ui > src > components > error-boundary.tsx > ... Explorer sidebar shows components folder expanded further than earlier photos: dialog.tsx, error-boundary.tsx (selected), field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U = unsaved), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx (U = unsaved); below components: config/, constants/, features/ (has unsaved dot), hooks/, lib/ (has unsaved dot), pages/ (has unsaved dot), providers/, services/. Line 34 cut off at the very bottom edge of the screenshot, only partially visible ("// Clean session using utility"). Status bar: branch hitanshu/experimental*, 30 errors / 0 warnings, "No Solution".
---
```
1   import { useRouteError, isRouteErrorResponse } from 'react-router';
2   import { Box, Typography, Button, Paper, Alert, AlertTitle, Collapse } from '@mui/material';
3   import { useState, useEffect } from 'react';
4
5   // utils
6   import { createFeatureLogger } from '@/utils/logger-builder';
7   import { removeItem } from '@utils/local-storage';
8
9   // Create logger
10  const logger = createFeatureLogger('error', 'ErrorBoundary');
11
12  // ---------------------------------------
13
14  export function GlobalErrorBoundary() {
15      const error = useRouteError();
16      const [showDetails, setShowDetails] = useState(false);
17      const [shouldAutoRedirect, setShouldAutoRedirect] = useState(false);
18      const isDev = import.meta.env.DEV;
19
20      // Logic to determine the error message
21      let errorMessage = 'An unexpected error occurred.';
22      let errorStatus = 'Error';
23      let errorStack: string | undefined;
24      let errorContext: Record<string, unknown> | undefined;
25
26      if (isRouteErrorResponse(error)) {
27          errorStatus = error.status.toString();
28
29          // Handle 401 specially
30          if (error.status === 401) {
31              errorMessage = 'Your session has expired. Redirecting to login...';
32              setShouldAutoRedirect(true);
33
34              // Clean session using utility
```


========== IMG_2091.md ==========
---
photo: IMG_2091.JPG
type: vscode-code
file: aqs-web-ui/src/components/error-boundary.tsx
lines: 14 (sticky), main view 23-55
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 with sips to /Users/harinadh/My code/aqs-web-ui/_study/rotated/IMG_2091.jpg and transcribed from that. Same file/tab as IMG_2090, scrolled down. Sticky-scroll header shows line 14 "export function GlobalErrorBoundary() {". Line 55 is cut off at the very right/bottom edge, last characters not fully legible (marked ⟪?⟫). Explorer sidebar now shows components folder fully expanded plus sibling folders: config/, constants/, features/ (unsaved dot), hooks/, lib/ (unsaved dot), pages/ (unsaved dot), providers/, services/. Status bar: branch hitanshu/experimental*, 30 errors / 0 warnings, "No Solution".
---
```
[sticky scroll header]
14  export function GlobalErrorBoundary() {

[main editor body]
23      let errorStack: string | undefined;
24      let errorContext: Record<string, unknown> | undefined;
25
26      if (isRouteErrorResponse(error)) {
27          errorStatus = error.status.toString();
28
29          // Handle 401 specially
30          if (error.status === 401) {
31              errorMessage = 'Your session has expired. Redirecting to login...';
32              setShouldAutoRedirect(true);
33
34              // Clear session using utility
35              const removed = removeItem('sessionInformation');
36              if (!removed) {
37                  console.error('Failed to clear session');
38              }
39          }
40
41          if (error.status === 404) errorMessage = 'Page not found.';
42          if (error.status === 405) errorMessage = 'Method not allowed. Did you forget an action?';
43          if (error.data?.message) errorMessage = error.data.message;
44          errorContext = error.data;
45      } else if (error instanceof Error) {
46          errorMessage = error.message;
47          errorStack = error.stack;
48
49          // Check for ApiError with 401
50          if ('statusCode' in error && (error as any).statusCode === 401) {
51              errorStatus = '401';
52              errorMessage = 'Your session has expired. Redirecting to login...';
53              setShouldAutoRedirect(true);
54
55              const removed = removeItem('sessionInformation')⟪?⟫
```


========== IMG_2092.md ==========
---
photo: IMG_2092.JPG
type: vscode-code
file: aqs-web-ui/src/components/error-boundary.tsx
lines: 14 (sticky), main view 49-81
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 with sips to /Users/harinadh/My code/aqs-web-ui/_study/rotated/IMG_2092.jpg and transcribed from that. Same file/tab, scrolled down further from IMG_2091 (overlap on lines 49-55). Sticky-scroll header shows line 14 "export function GlobalErrorBoundary() {"; line 49 is partly clipped behind the sticky header divider but legible as "// Check for ApiError with 401" (confirmed fully visible in IMG_2091). Explorer sidebar unchanged. Status bar: branch hitanshu/experimental*, 30 errors / 0 warnings, "No Solution".
---
```
[sticky scroll header]
14  export function GlobalErrorBoundary() {

[main editor body]
49          // Check for ApiError with 401
50          if ('statusCode' in error && (error as any).statusCode === 401) {
51              errorStatus = '401';
52              errorMessage = 'Your session has expired. Redirecting to login...';
53              setShouldAutoRedirect(true);
54
55              const removed = removeItem('sessionInformation');
56              if (!removed) {
57                  console.error('Failed to clear session');
58              }
59          } else if ('statusCode' in error) {
60              // Check if it's our custom ApiError
61              errorStatus = String((error as any).statusCode || 'Error');
62              errorContext = (error as any).context;
63          }
64      }
65
66      // Log error with full context
67      logger.error('Route error caught by boundary', error as Error, {
68          status: errorStatus,
69          message: errorMessage,
70          context: errorContext,
71      });
72
73      // Auto-redirect effect for 401 errors
74      useEffect(() => {
75          if (shouldAutoRedirect) {
76              logger.info('Auto-redirecting to login after 401 error');
77              const timer = setTimeout(() => {
78                  window.location.href = '/login';
79              }, 2000);
80              return () => clearTimeout(timer);
81          }
```


========== IMG_2093.md ==========
---
photo: IMG_2093.JPG
type: vscode-code
file: aqs-web-ui/src/components/error-boundary.tsx
lines: 14 (sticky), main view 68-99 (sliver of 100 visible but not legible)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 with sips to /Users/harinadh/My code/aqs-web-ui/_study/rotated/IMG_2093.jpg and transcribed from that. Same file/tab, scrolled down further from IMG_2092 (overlap on lines 68-81). Sticky-scroll header shows line 14 "export function GlobalErrorBoundary() {". A sliver of line 100 is visible at the very bottom edge, cut off by the taskbar — appears to start with "</T..." (likely "</Typography>") but not legible enough to transcribe confidently. Explorer sidebar unchanged. Status bar: branch hitanshu/experimental*, 30 errors / 0 warnings, "No Solution".
---
```
[sticky scroll header]
14  export function GlobalErrorBoundary() {

[main editor body]
68          status: errorStatus,
69          message: errorMessage,
70          context: errorContext,
71      });
72
73      // Auto-redirect effect for 401 errors
74      useEffect(() => {
75          if (shouldAutoRedirect) {
76              logger.info('Auto-redirecting to login after 401 error');
77              const timer = setTimeout(() => {
78                  window.location.href = '/login';
79              }, 2000);
80              return () => clearTimeout(timer);
81          }
82      }, [shouldAutoRedirect]);
83
84      const handleRetry = () => {
85          logger.info('User retrying after error');
86          window.location.reload();
87      };
88
89      const handleGoHome = () => {
90          logger.info('User navigating home after error');
91          window.location.href = '/';
92      };
93
94      return (
95          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
96              <Paper elevation={3} sx={{ p: 5, maxWidth: 700, width: '100%' }}>
97                  <Box textAlign="center" mb={3}>
98                      <Typography variant="h2" color="error" gutterBottom>
99                          {errorStatus}
100                     ⟪?⟫ (sliver only, likely </Typography>)
```


========== IMG_2094.md ==========
---
photo: IMG_2094.JPG
type: vscode-code
file: aqs-web-ui/src/components/error-boundary.tsx
lines: 14 (sticky), main view 89-120 (sliver of 121 visible but not fully legible)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 with sips to /Users/harinadh/My code/aqs-web-ui/_study/rotated/IMG_2094.jpg and transcribed from that. Same file/tab, scrolled down further from IMG_2093 (overlap on lines 89-99; confirms line 100 = "</Typography>" which was only a guessed sliver in IMG_2093). Sticky-scroll header shows line 14 "export function GlobalErrorBoundary() {". Line 121 is only a thin sliver at the very bottom, cut off by the taskbar — appears to start with "sx={{" but not legible enough to transcribe with confidence (marked ⟪?⟫). Explorer sidebar unchanged. Status bar: branch hitanshu/experimental*, 30 errors / 0 warnings, "No Solution".
---
```
[sticky scroll header]
14  export function GlobalErrorBoundary() {

[main editor body]
89      const handleGoHome = () => {
90          logger.info('User navigating home after error');
91          window.location.href = '/';
92      };
93
94      return (
95          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
96              <Paper elevation={3} sx={{ p: 5, maxWidth: 700, width: '100%' }}>
97                  <Box textAlign="center" mb={3}>
98                      <Typography variant="h2" color="error" gutterBottom>
99                          {errorStatus}
100                     </Typography>
101                     <Typography variant="h5" gutterBottom>
102                         Oops! Something went wrong.
103                     </Typography>
104                     <Typography variant="body1" color="text.secondary" mb={3}>
105                         {errorMessage}
106                     </Typography>
107                 </Box>
108
109                 {/* Error context in dev mode */}
110                 {isDev && errorContext && (
111                     <Box mb={3}>
112                         <Alert
113                             severity="warning"
114                             onClick={() => setShowDetails(!showDetails)}
115                             sx={{ cursor: 'pointer' }}
116                         >
117                             <AlertTitle>Developer Info (Click to expand)</AlertTitle>
118                             <Collapse in={showDetails}>
119                                 <Box
120                                     component="pre"
121                                     ⟪?⟫ (sliver only, likely "sx={{")
```


========== IMG_2095.md ==========
---
photo: IMG_2095.JPG
type: vscode-code
file: aqs-web-ui/src/components/error-boundary.tsx
lines: 14 (sticky), main view 105-136
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 with sips to /Users/harinadh/My code/aqs-web-ui/_study/rotated/IMG_2095.jpg and transcribed from that. Same file/tab, scrolled down further from IMG_2094 (overlap on lines 105-120; confirms line 121 = "sx={{" which was only a guessed sliver in IMG_2094). Sticky-scroll header shows line 14 "export function GlobalErrorBoundary() {". All lines fully legible this time (image is sharp). Explorer sidebar unchanged. Status bar: branch hitanshu/experimental*, 30 errors / 0 warnings, "No Solution".
---
```
[sticky scroll header]
14  export function GlobalErrorBoundary() {

[main editor body]
105                         {errorMessage}
106                     </Typography>
107                 </Box>
108
109                 {/* Error context in dev mode */}
110                 {isDev && errorContext && (
111                     <Box mb={3}>
112                         <Alert
113                             severity="warning"
114                             onClick={() => setShowDetails(!showDetails)}
115                             sx={{ cursor: 'pointer' }}
116                         >
117                             <AlertTitle>Developer Info (Click to expand)</AlertTitle>
118                             <Collapse in={showDetails}>
119                                 <Box
120                                     component="pre"
121                                     sx={{
122                                         mt: 2,
123                                         p: 2,
124                                         bgcolor: 'grey.100',
125                                         borderRadius: 1,
126                                         overflow: 'auto',
127                                         maxHeight: 200,
128                                         fontSize: '0.75rem',
129                                     }}
130                                 >
131                                     {JSON.stringify(errorContext, null, 2)}
132                                 </Box>
133                             {errorStack && (
134                                 <Box
135                                     component="pre"
136                                     sx={{
```


========== IMG_2096.md ==========
---
photo: IMG_2096.JPG
type: vscode-code
file: aqs-web-ui/src/components/error-boundary.tsx
lines: 14 (sticky), main view 128-160 (end of visible scroll; file likely continues beyond 160, not captured)
orientation: 180
confidence: high
notes: Photo was upside down; rotated 180 with sips to /Users/harinadh/My code/aqs-web-ui/_study/rotated/IMG_2096.jpg and transcribed from that. Same file/tab, scrolled down further from IMG_2095 (overlap on lines 128-136; confirms line 128 = "fontSize: '0.75rem'," partially visible behind sticky header). Sticky-scroll header shows line 14 "export function GlobalErrorBoundary() {". Line 160 "Back to Home" is the last visible line, cut off by the taskbar; file content beyond line 160 not captured in this photo set. Explorer sidebar unchanged. Status bar: branch hitanshu/experimental*, 30 errors / 0 warnings, "No Solution". This is the last photo in the assigned range (2082-2096).
---
```
[sticky scroll header]
14  export function GlobalErrorBoundary() {

[main editor body]
128                                     fontSize: '0.75rem',
129                                 }}
130                             >
131                                 {JSON.stringify(errorContext, null, 2)}
132                             </Box>
133                         {errorStack && (
134                             <Box
135                                 component="pre"
136                                 sx={{
137                                     mt: 2,
138                                     p: 2,
139                                     bgcolor: 'grey.100',
140                                     borderRadius: 1,
141                                     overflow: 'auto',
142                                     maxHeight: 200,
143                                     fontSize: '0.75rem',
144                                 }}
145                             >
146                                 {errorStack}
147                             </Box>
148                         ))}
149                     </Collapse>
150                 </Alert>
151             </Box>
152         ))}
153
154         {/* Action buttons */}
155         <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
156             <Button variant="contained" onClick={handleRetry} color="primary">
157                 Retry
158             </Button>
159             <Button variant="outlined" onClick={handleGoHome}>
160                 Back to Home
```


========== IMG_2097.md ==========
---
photo: IMG_2097.JPG
type: vscode-code
file: aqs-web-ui/src/components/error-boundary.tsx
lines: 152-167
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 14 `export function GlobalErrorBoundary() {`. Every code line 152-164 has red squiggle underlines (whole-line diagnostics). Tab bar: date.tsx (9+ problems), error-boundary.tsx (5 problems, active, modified dot). Status bar: branch hitanshu/experimental*, 30 errors 0 warnings, "No Solution", Ln 1 Col 1, TypeScript JSX, CRLF. Explorer sidebar (src/components): dialog.tsx, error-boundary.tsx (S badge, selected), field-renderer.tsx, footer.tsx, form-renderer.tsx, header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx (U); folders: config, constants, features, hooks, lib, pages, providers, services. Breadcrumb: aqs-web-ui > src > components > error-boundary.tsx. Taskbar time 4:39 PM 7/10/2026.
---
  14  export function GlobalErrorBoundary() {
 152          )}
 153
 154          {/* Action buttons */}
 155          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
 156            <Button variant="contained" onClick={handleRetry} color="primary">
 157              Retry
 158            </Button>
 159            <Button variant="outlined" onClick={handleGoHome}>
 160              Back to Home
 161            </Button>
 162          </Box>
 163        </Paper>
 164      </Box>
 165    );
 166  }
 167
