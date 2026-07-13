# BUNDLE for src/utils/http-instance.ts
# 31 photo fragment(s), ascending start-line order.


========== IMG_3744.md ==========
---
photo: IMG_3744.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 1-27
orientation: 180
confidence: high
notes: Sharp, clean single exposure. New file compared to prior photos (frame-router.ts closed, http-instance.ts now the active tab, top of file). Breadcrumb aqs-web-ui > src > utils > http-instance.ts. Single tab open (http-instance.ts, active/highlighted in Explorer). Explorer sidebar (utils folder, scrolled further down than earlier photos): dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts (highlighted), legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop... (copy variant), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Problems: 2 errors, 0 warnings, "No Solution". Branch hitanshu/experimental*.
---
1	import axios from 'axios';
2	
3	// types
4	import type { AxiosRequestConfig, AxiosError } from 'axios';
5	import type { RetryOptions } from '@/types';
6	
7	// utils
8	import { createFeatureLogger } from '@utils/logger-builder';
9	import { ApiCache } from '@/utils/api-cache';
10	import { perfMonitor } from '@/utils/performance-monitor';
11	import { removeItem, setItem } from '@utils/local-storage';
12	
13	// Create logger for HTTP requests
14	const logger = createFeatureLogger('api', 'http-instance');
15	
16	// --------------------------------------------
17	// ApiError Class
18	// --------------------------------------------
19	
20	/**
21	 * Custom API Error class with enhanced context and retry information
22	 */
23	export class ApiError extends Error {
24	    statusCode?: number;
25	    isRetryable: boolean;
26	    context?: Record<string, unknown>;
27	


========== IMG_3749.md ==========
---
photo: IMG_3749.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 1-27
orientation: 180
confidence: high
notes: Explorer sidebar shows utils/ folder expanded with files - dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts (selected/active), legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, "normalize-service-config cop..." (likely a copy file), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Tab bar shows only http-instance.ts open (6 problems indicator on tab). Status bar: branch hitanshu/experimental*, 8 errors/0 warnings, "No Solution", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Git blame shows "Chavan (4 months ago)" for line 15. Cursor sits at end of line 15 (blank line after logger declaration).
---
1  import axios from 'axios';
2  
3  // types
4  import type { AxiosRequestConfig, AxiosError } from 'axios';
5  import type { RetryOptions } from '@/types';
6  
7  // utils
8  import { createFeatureLogger } from '@utils/logger-builder';
9  import { ApiCache } from '@utils/api-cache';
10  import { perfMonitor } from '@utils/performance-monitor';
11  import { removeItem, setItem } from '@utils/local-storage';
12  
13  // Create logger for HTTP requests
14  const logger = createFeatureLogger('api', 'http-instance');
15  
16  // --------------------------------------
17  // ApiError Class
18  // --------------------------------------
19  
20  /**
21   * Custom API Error class with enhanced context and retry information
22   */
23  export class ApiError extends Error {
24      statusCode?: number;
25      isRetryable: boolean;
26      context?: Record<string, unknown>;
27  


========== IMG_3745.md ==========
---
photo: IMG_3745.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 4-30
orientation: 180
confidence: medium
notes: Double-exposure/ghosting throughout (camera moved while scrolling, blending two scroll positions of the same static file ~9-10 lines apart, larger offset than the usual 2-3 line ghost seen elsewhere but same phenomenon). Lines 4-14 are cross-confirmed at high confidence against the sharp IMG_3744 (identical content, just re-photographed/ghosted). Lines 15-27 likewise match IMG_3744. Lines 28-30 (start of constructor) are new here; reconstructed from the brighter/sharper of the two overlaid exposures and independently corroborated by IMG_3746 (clearer overlapping photo of lines 27-46, same values). Explorer/tab shows http-instance.ts with an unsaved-changes indicator "6" on the tab, and Problems count reads 8 errors, 0 warnings (up from 2 in earlier photos) — this appears to be workspace-wide linting noise from other files, not evidence that this file's content differs from IMG_3744; the visible text is verbatim identical wherever both photos overlap. Breadcrumb aqs-web-ui > src > utils > http-instance.ts. Explorer sidebar: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts (highlighted), legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop..., normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Branch hitanshu/experimental*.
---
4	import type { AxiosRequestConfig, AxiosError } from 'axios';
5	import type { RetryOptions } from '@/types';
6	
7	// utils
8	import { createFeatureLogger } from '@utils/logger-builder';
9	import { ApiCache } from '@/utils/api-cache';
10	import { perfMonitor } from '@/utils/performance-monitor';
11	import { removeItem, setItem } from '@utils/local-storage';
12	
13	// Create logger for HTTP requests
14	const logger = createFeatureLogger('api', 'http-instance');
15	
16	// --------------------------------------------
17	// ApiError Class
18	// --------------------------------------------
19	
20	/**
21	 * Custom API Error class with enhanced context and retry information
22	 */
23	export class ApiError extends Error {
24	    statusCode?: number;
25	    isRetryable: boolean;
26	    context?: Record<string, unknown>;
27	
28	    constructor(
29	        message: string,
30	        statusCode?: number,


========== IMG_3750.md ==========
---
photo: IMG_3750.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 6-33
orientation: 180
confidence: high
notes: Same file/view as IMG_3749 scrolled down slightly (overlapping content lines 6-27 repeat, new lines 28-33 visible). Line 33 cut off at bottom of visible editor area (only "3" visible, content unreadable - marked below). Explorer sidebar same utils/ file list as IMG_3749. Status bar identical: branch hitanshu/experimental*, 8 errors/0 warnings, No Solution, Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Git blame "Chavan (4 months ago)" on line 15.
---
6  
7  // utils
8  import { createFeatureLogger } from '@utils/logger-builder';
9  import { ApiCache } from '@utils/api-cache';
10  import { perfMonitor } from '@utils/performance-monitor';
11  import { removeItem, setItem } from '@utils/local-storage';
12  
13  // Create logger for HTTP requests
14  const logger = createFeatureLogger('api', 'http-instance');
15  
16  // --------------------------------------
17  // ApiError Class
18  // --------------------------------------
19  
20  /**
21   * Custom API Error class with enhanced context and retry information
22   */
23  export class ApiError extends Error {
24      statusCode?: number;
25      isRetryable: boolean;
26      context?: Record<string, unknown>;
27  
28      constructor(
29          message: string,
30          statusCode?: number,
31          isRetryable = false,
32          context?: Record<string, unknown>,
33  ⟪?⟫ (line cut off at bottom edge of screen, not legible)


========== IMG_3747.md ==========
---
photo: IMG_3747.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 23,28 (sticky headers) / 37-61 (body)
orientation: 180
confidence: high
notes: Double-exposure/ghosting present (same ~13-line scroll-offset blend as IMG_3745/3746) but the brighter/sharper layer is legible and internally self-consistent with the dimmer duplicate layer throughout, so transcribed at high confidence. Sticky-scroll headers at top show line 23 "export class ApiError extends Error {" and line 28 "constructor(". Body 37-61 (61 cut off by bottom edge, "break;" and start of "case 401:" visible). Lines 37-44 corroborate IMG_3746 exactly. Lines 46-61 are new: JSDoc for fromAxiosError, start of the static fromAxiosError(error: AxiosError): ApiError method with statusCode/responseData extraction and a switch on HTTP status codes building user-friendly messages. Explorer/tab shows http-instance.ts unsaved-changes indicator "6", Problems 8 errors/0 warnings (same as IMG_3745/3746). Breadcrumb aqs-web-ui > src > utils > http-instance.ts. Explorer sidebar: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts (highlighted), legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop..., normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Branch hitanshu/experimental*.
---
23	export class ApiError extends Error {
28	    constructor(
37	        this.isRetryable = isRetryable;
38	        this.context = context;
39	
40	        // Maintains proper stack trace for where error was thrown
41	        if (typeof (Error as any).captureStackTrace === 'function') {
42	            (Error as any).captureStackTrace(this, ApiError);
43	        }
44	    }
45	
46	    /**
47	     * Create ApiError from Axios error with user-friendly messages
48	     */
49	    static fromAxiosError(error: AxiosError): ApiError {
50	        const statusCode = error.response?.status;
51	        const responseData = error.response?.data as any;
52	
53	        // Determine user-friendly message
54	        let message = 'An unexpected error occurred';
55	        if (responseData?.message) {
56	            message = responseData.message;
57	        } else if (statusCode) {
58	            switch (statusCode) {
59	                case 400:
60	                    message = 'Invalid request. Please check your input.';
61	                    break;


========== IMG_3748.md ==========
---
photo: IMG_3748.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 23,49 (sticky headers) / 77-101 (body)
orientation: 180
confidence: high
notes: Sharp, clean single exposure (no ghosting). Sticky-scroll headers at top show line 23 "export class ApiError extends Error {" and line 49 "static fromAxiosError(error: AxiosError): ApiError {". Body 77-101, continuing the switch(statusCode) block and completing the fromAxiosError retry-detection logic (line 101 cut off at the very bottom, condition continues past visible area). Explorer/tab shows http-instance.ts unsaved-changes indicator "6", Problems 8 errors/0 warnings. Breadcrumb aqs-web-ui > src > utils > http-instance.ts. Explorer sidebar: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts (highlighted), legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop..., normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Branch hitanshu/experimental*.
---
23	export class ApiError extends Error {
49	    static fromAxiosError(error: AxiosError): ApiError {
77	                case 422:
78	                    message = 'Validation failed. Please check your input.';
79	                    break;
80	                case 429:
81	                    message = 'Too many requests. Please slow down.';
82	                    break;
83	                case 500:
84	                    message = 'Server error. Please try again later.';
85	                    break;
86	                case 502:
87	                case 503:
88	                case 504:
89	                    message = 'Service unavailable. Please try again later.';
90	                    break;
91	            }
92	        } else if (error.code === 'ECONNABORTED') {
93	            message = 'Request timeout. Please check your connection.';
94	        } else if (error.code === 'ERR_NETWORK') {
95	            message = 'Network error. Please check your connection.';
96	        }
97	
98	        // Determine if error is retryable
99	        const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
100	        const isRetryable =
101	            (statusCode && retryableStatusCodes.includes(statusCode)) ||


========== IMG_3751.md ==========
---
photo: IMG_3751.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 23-51
orientation: 180
confidence: medium
notes: Photo has a strong double-exposure/motion-blur artifact (likely camera shake during a longer low-light exposure) — every line shows a faint "ghost" duplicate of content from 3 rows above it superimposed at its position, in addition to the true/sharp text. Reading was cross-validated against the non-blurred IMG_3749 and IMG_3750 (same file, overlapping lines 23-27, which are identical here) and against internal consistency of the ghost-offset-3 pattern to separate true content from ghost bleed-through. Line 27 and line 45 are blank in the true content (ghost text from lines 24 and 42 respectively bleeds through and can look deceptively sharp there since there's no true content competing). Explorer sidebar same utils/ file list as prior photos, http-instance.ts still selected/highlighted (6 problems badge). Status bar unchanged: branch hitanshu/experimental*, 8 errors/0 warnings, No Solution, Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, git blame "Chavan (4 months ago)".
---
23  export class ApiError extends Error {
24      statusCode?: number;
25      isRetryable: boolean;
26      context?: Record<string, unknown>;
27  
28      constructor(
29          message: string,
30          statusCode?: number,
31          isRetryable = false,
32          context?: Record<string, unknown>,
33      ) {
34          super(message);
35          this.name = 'ApiError';
36          this.statusCode = statusCode;
37          this.isRetryable = isRetryable;
38          this.context = context;
39  
40          // Maintains proper stack trace for where error was thrown
41          if (typeof (Error as any).captureStackTrace === 'function') {
42              (Error as any).captureStackTrace(this, ApiError);
43          }
44      }
45  
46      /**
47       * Create ApiError from Axios error with user-friendly messages
48       */
49      static fromAxiosError(error: AxiosError): ApiError {
50          const statusCode = error.response?.status;
51          const responseData = error.response?.data as any;


========== IMG_3746.md ==========
---
photo: IMG_3746.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 27-46
orientation: 180
confidence: medium
notes: Double-exposure/ghosting throughout (same ~9-10 line scroll-offset blend as IMG_3745). Lines 27-33 corroborate IMG_3745 exactly (constructor signature: message, statusCode?, isRetryable = false, context?). Lines 34-46 (constructor body: super(message), field assignments, captureStackTrace block, and the start of the next JSDoc comment at 46) are reconstructed from the brighter/sharper of the two overlaid exposures, internally cross-checked against the dimmer duplicate layer (both agree). Line 46 shows only "/**" (comment open) before the visible area ends. Explorer/tab shows http-instance.ts with unsaved-changes indicator "6", Problems 8 errors/0 warnings (see note in IMG_3745 — treated as unrelated workspace noise, not a content difference). Breadcrumb aqs-web-ui > src > utils > http-instance.ts. Explorer sidebar: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts (highlighted), legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop..., normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Branch hitanshu/experimental*.
---
27	
28	    constructor(
29	        message: string,
30	        statusCode?: number,
31	        isRetryable = false,
32	        context?: Record<string, unknown>,
33	    ) {
34	        super(message);
35	        this.name = 'ApiError';
36	        this.statusCode = statusCode;
37	        this.isRetryable = isRetryable;
38	        this.context = context;
39	
40	        // Maintains proper stack trace for where error was thrown
41	        if (typeof (Error as any).captureStackTrace === 'function') {
42	            (Error as any).captureStackTrace(this, ApiError);
43	        }
44	    }
45	
46	/**


========== IMG_3752.md ==========
---
photo: IMG_3752.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 35-56 (plus sticky-scroll headers for lines 23 and 28)
orientation: 180
confidence: medium
notes: Same double-exposure/motion-blur ghosting as IMG_3751 (faint duplicate of content ~3 rows away superimposed on the true text at each row); resolved the same way by taking the bold/sharp layer and cross-checking against IMG_3751's already-confirmed lines 35-51 (identical here). Sticky-scroll headers pinned at top of editor: "23  export class ApiError extends Error {" and "28  constructor(". Line 52 update (resolved via IMG_3753, which shows the same photographic artifact more clearly and confirms a consistent +3-row ghost offset throughout this file, e.g. row 60 ghost = row 57 content): the "static fromAxiosError(error: AxiosError): ApiError {" seen at line 52 is the ghost of line 49 bleeding down 3 rows, not real duplicated code — true line 52 content is most likely blank (consistent with blank lines elsewhere before comment/logic blocks, e.g. lines 39, 45, 52 in IMG_3753's clean reading). Faint ghost fragments below the visible sharp text at rows 55-56 hint at further code below the viewport (matches IMG_3753's confirmed lines 57+: "} else if (statusCode) { switch (statusCode) { case 400:" ...) but that content was only visible as blur here, not as confirmed sharp text in this photo. Explorer sidebar unchanged (utils/ file list, http-instance.ts selected, 6 problems badge). Status bar unchanged: branch hitanshu/experimental*, 8 errors/0 warnings, No Solution, Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, git blame "Chavan (4 months ago)".
---
[sticky scroll] 23  export class ApiError extends Error {
[sticky scroll] 28      constructor(

35          this.name = 'ApiError';
36          this.statusCode = statusCode;
37          this.isRetryable = isRetryable;
38          this.context = context;
39  
40          // Maintains proper stack trace for where error was thrown
41          if (typeof (Error as any).captureStackTrace === 'function') {
42              (Error as any).captureStackTrace(this, ApiError);
43          }
44      }
45  
46      /**
47       * Create ApiError from Axios error with user-friendly messages
48       */
49      static fromAxiosError(error: AxiosError): ApiError {
50          const statusCode = error.response?.status;
51          const responseData = error.response?.data as any;
52  (blank — bold text visible here reads "static fromAxiosError(error: AxiosError): ApiError {", but this is confirmed to be a ghosting artifact of line 49 bleeding down 3 rows; see notes)
53          // Determine user-friendly message
54          let message = 'An unexpected error occurred';
55          if (responseData?.message) {
56              message = responseData.message;


========== IMG_3753.md ==========
---
photo: IMG_3753.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 44-69 (plus sticky-scroll headers for lines 23 and 44)
orientation: 180
confidence: medium
notes: Same double-exposure/motion-blur ghosting as IMG_3751/3752 (constant +3 row offset — content from row N bleeds faintly into row N+3). Cross-checking this offset across many rows (e.g. row 26 ghost = row 23 "export class ApiError..." seen in IMG_3751; row 60 ghost = row 57 "} else if (statusCode) {" here) confirms this is a uniform photographic artifact, not genuine duplicated source code — this also resolves the ambiguity flagged in IMG_3752's line 52: it is the ghost of line 49 ("static fromAxiosError...") bleeding down, so line 52's true content is most likely blank (consistent with blank lines elsewhere before comment blocks, e.g. line 39, 45). Sticky-scroll headers pinned at top: "23  export class ApiError extends Error {" and "44  }" (the second header shows a transitional ghost of "constructor(" blended in — resolved as "}" per line 44's confirmed content). Bottom edge of visible code shows a fragment of what is likely line 70 ("break;") but it is not clearly a distinct numbered row in the photo, so not transcribed as confirmed. Explorer sidebar unchanged (utils/ file list, http-instance.ts selected, 6 problems badge). Status bar unchanged: branch hitanshu/experimental*, 8 errors/0 warnings, No Solution, Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, git blame "Chavan (4 months ago)".
---
[sticky scroll] 23  export class ApiError extends Error {
[sticky scroll] 44      }

44      }
45  
46      /**
47       * Create ApiError from Axios error with user-friendly messages
48       */
49      static fromAxiosError(error: AxiosError): ApiError {
50          const statusCode = error.response?.status;
51          const responseData = error.response?.data as any;
52  
53          // Determine user-friendly message
54          let message = 'An unexpected error occurred';
55          if (responseData?.message) {
56              message = responseData.message;
57          } else if (statusCode) {
58              switch (statusCode) {
59                  case 400:
60                      message = 'Invalid request. Please check your input.';
61                      break;
62                  case 401:
63                      message = 'Unauthorized. Please log in again.';
64                      break;
65                  case 403:
66                      message = 'Access denied. You do not have permission.';
67                      break;
68                  case 404:
69                      message = 'Resource not found.';


========== IMG_3754.md ==========
---
photo: IMG_3754.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 54-77 (plus sticky-scroll headers for lines 23 and 49)
orientation: 180
confidence: medium
notes: Continuation of IMG_3753, scrolled down further; same constant +3-row double-exposure ghosting throughout (resolved the same way — bold/sharp layer per gutter number is the true content). Sticky-scroll headers pinned at top: "23  export class ApiError extends Error {" and "49      static fromAxiosError(error: AxiosError): ApiError {" — this confirms line 49 itself is real (not a ghost), reinforcing that the apparent duplicate at line 52 in IMG_3752/3753 is indeed just the ghost of this line 49 bleeding down 3 rows. Lines 54-69 repeat content already transcribed in IMG_3753 (included here for completeness/verbatim capture per instructions); lines 70-77 are new. Photo cuts off right after "case 422:" on line 77 — its message line is not visible (only a ghost of line 75's message bleeds through). Explorer/status bar not visible in this crop set but assumed unchanged from adjacent photos (same file, same session) — status bar readable at bottom: 8 errors/0 warnings, No Solution, git blame "Chavan (4 months ago)".
---
[sticky scroll] 23  export class ApiError extends Error {
[sticky scroll] 49      static fromAxiosError(error: AxiosError): ApiError {

54          let message = 'An unexpected error occurred';
55          if (responseData?.message) {
56              message = responseData.message;
57          } else if (statusCode) {
58              switch (statusCode) {
59                  case 400:
60                      message = 'Invalid request. Please check your input.';
61                      break;
62                  case 401:
63                      message = 'Unauthorized. Please log in again.';
64                      break;
65                  case 403:
66                      message = 'Access denied. You do not have permission.';
67                      break;
68                  case 404:
69                      message = 'Resource not found.';
70                      break;
71                  case 408:
72                      message = 'Request timeout. Please try again.';
73                      break;
74                  case 409:
75                      message = 'Conflict. The resource has been modified.';
76                      break;
77                  case 422:


========== IMG_3755.md ==========
---
photo: IMG_3755.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 64-88 (plus sticky-scroll headers for lines 23 and 49)
orientation: 180
confidence: high
notes: Much less motion-blur ghosting than IMG_3751-3754 (only a very faint trace at the very top, main body crisp/clean). Sticky-scroll headers pinned at top: "23  export class ApiError extends Error {" and "49      static fromAxiosError(error: AxiosError): ApiError {". Lines 64-77 repeat content already established in IMG_3753/3754 (included for completeness); lines 78-88 are new — continues the switch(statusCode) case list (422, 429, 500, 502, 503, 504) mapping HTTP status codes to user-friendly messages. Photo cuts off right after "case 504:" on line 88 — its message body not yet visible. Status bar: 8 errors/0 warnings, No Solution, git blame "Chavan (4 months ago)", Ln 15 Col 1, other fields consistent with prior photos (Tab Size 4, UTF-8, CRLF, TypeScript, branch hitanshu/experimental*).
---
[sticky scroll] 23  export class ApiError extends Error {
[sticky scroll] 49      static fromAxiosError(error: AxiosError): ApiError {

64                      break;
65                  case 403:
66                      message = 'Access denied. You do not have permission.';
67                      break;
68                  case 404:
69                      message = 'Resource not found.';
70                      break;
71                  case 408:
72                      message = 'Request timeout. Please try again.';
73                      break;
74                  case 409:
75                      message = 'Conflict. The resource has been modified.';
76                      break;
77                  case 422:
78                      message = 'Validation failed. Please check your input.';
79                      break;
80                  case 429:
81                      message = 'Too many requests. Please slow down.';
82                      break;
83                  case 500:
84                      message = 'Server error. Please try again later.';
85                      break;
86                  case 502:
87                  case 503:
88                  case 504:


========== IMG_3756.md ==========
---
photo: IMG_3756.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 77-101 (plus sticky-scroll headers for lines 23 and 49)
orientation: 180
confidence: medium
notes: Continuation of IMG_3755, scrolled down further. Same constant ~+2/+3-row double-exposure ghosting as prior photos in this run; resolved row-by-row with per-line high-zoom crops (bold/sharp layer per gutter number = true content, cross-checked against the offset pattern). Sticky-scroll headers pinned at top: "23  export class ApiError extends Error {" and "49      static fromAxiosError(error: AxiosError): ApiError {". Lines 77-90 repeat content already established in IMG_3755 (included for completeness); lines 91-101 are new — closes the status-code switch, adds an error.code fallback chain (ECONNABORTED / ERR_NETWORK), then begins an isRetryable computation. Line 97 resolved as blank (matches the file's recurring style of a blank line before a comment block, e.g. lines 39/45/52) — the bold-looking text seen there is the ghost of line 94 bleeding through unopposed. Photo cuts off mid-statement after line 101 ("... || " continues, likely onto more status-code-based OR-conditions on the next line) — not visible in this photo. Status bar: 8 errors/0 warnings, No Solution, git blame "Chavan (4 months ago)", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, branch hitanshu/experimental*.
---
[sticky scroll] 23  export class ApiError extends Error {
[sticky scroll] 49      static fromAxiosError(error: AxiosError): ApiError {

77                  case 422:
78                      message = 'Validation failed. Please check your input.';
79                      break;
80                  case 429:
81                      message = 'Too many requests. Please slow down.';
82                      break;
83                  case 500:
84                      message = 'Server error. Please try again later.';
85                      break;
86                  case 502:
87                  case 503:
88                  case 504:
89                      message = 'Service unavailable. Please try again later.';
90                      break;
91              }
92          } else if (error.code === 'ECONNABORTED') {
93              message = 'Request timeout. Please check your connection.';
94          } else if (error.code === 'ERR_NETWORK') {
95              message = 'Network error. Please check your connection.';
96          }
97  
98          // Determine if error is retryable
99          const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
100         const isRetryable =
101             (statusCode && retryableStatusCodes.includes(statusCode)) ||


========== IMG_3757.md ==========
---
photo: IMG_3757.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 87-109 (plus sticky-scroll headers for lines 23 and 49)
orientation: 180
confidence: high
notes: Continuation of IMG_3756, scrolled down further. Same double-exposure ghosting as prior photos; resolved with per-line high-zoom crops precisely aligned to gutter numbers (very reliable this time — gutter numbers 98-109 all consecutive/unambiguous). Sticky-scroll headers pinned at top: "23  export class ApiError extends Error {" and "49      static fromAxiosError(error: AxiosError): ApiError {". Lines 87-101 repeat content already established in IMG_3755/3756 (included for completeness); lines 102-109 are new — finishes the isRetryable OR-chain (adds error.code checks for ECONNABORTED/ERR_NETWORK) and begins building a "context" object with url/method/statusCode for the ApiError. Line 104 resolved as blank (matches the file's recurring blank-line-before-comment style). Photo cuts off after line 109 ("statusCode,") — a ghost fragment hints the next line is "errorCode: error.code," but that is not confirmed sharp text in this photo. Status bar: 8 errors/0 warnings, No Solution, git blame "Chavan (4 months ago)", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, branch hitanshu/experimental*.
---
[sticky scroll] 23  export class ApiError extends Error {
[sticky scroll] 49      static fromAxiosError(error: AxiosError): ApiError {

87                  case 503:
88                  case 504:
89                      message = 'Service unavailable. Please try again later.';
90                      break;
91              }
92          } else if (error.code === 'ECONNABORTED') {
93              message = 'Request timeout. Please check your connection.';
94          } else if (error.code === 'ERR_NETWORK') {
95              message = 'Network error. Please check your connection.';
96          }
97  
98          // Determine if error is retryable
99          const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
100         const isRetryable =
101             (statusCode && retryableStatusCodes.includes(statusCode)) ||
102             error.code === 'ECONNABORTED' ||
103             error.code === 'ERR_NETWORK';
104 
105         // Build context object
106         const context: Record<string, unknown> = {
107             url: error.config?.url,
108             method: error.config?.method?.toUpperCase(),
109             statusCode,


========== IMG_3758.md ==========
---
photo: IMG_3758.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 103-127 (plus sticky-scroll headers for lines 23 and 49)
orientation: 180
confidence: medium
notes: Continuation of IMG_3757, scrolled down further; ends the fromAxiosError method, closes the ApiError class, and reveals a new section (a `wait()` helper and the start of Axios instance creation). Same double-exposure/motion-blur ghosting as prior photos, resolved row-by-row using precise gutter-anchored per-row crops (calculated y-positions from a clean gutter-number read spanning 103-127). Sticky-scroll headers pinned at top: "23  export class ApiError extends Error {" and "49      static fromAxiosError(error: AxiosError): ApiError {". Lines 103-104 repeat/overlap content already established in IMG_3757. Lines 116, 120, 122, 124 resolved as blank (each shows only an unopposed ghost of content 3-4 rows above bleeding through, consistent with the file's recurring blank-line-before-logical-break style). Line 116 in particular initially looked like a genuine second "if (responseData?.errors) {" block duplicating lines 113-115, but was resolved as a ghost of line 113 using VS Code's bracket-pair colorization as an independent cross-check: only one depth-3 (blue) closing brace exists for the if-block (line 115), and the very next brace (line 118, pink/depth-2) closes the method — if line 116 opened a second real if-block, a second depth-3 closing brace would be required before the method-closing brace, which is not present. Line 121 is a long dashed comment divider (`// ---...---`); exact dash count is approximate (screen-width dashes, not individually countable at this resolution). Line 125's comment reads "Instace" verbatim (likely a source typo for "Instance") — transcribed exactly as shown, not corrected. Status bar: 8 errors/0 warnings, No Solution, git blame "Chavan (4 months ago)", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, branch hitanshu/experimental*. Explorer sidebar: aqs-web-ui > src > utils, http-instance.ts selected/highlighted (6-badge problems icon visible in file list), tab bar shows "http-instance.ts" with a "6" badge.
---
[sticky scroll] 23  export class ApiError extends Error {
[sticky scroll] 49      static fromAxiosError(error: AxiosError): ApiError {

103             error.code === 'ERR_NETWORK';
104  (blank — only a ghost of line 101's "(statusCode && retryableStatusCodes.includes(statusCode)) ||" is visible here, a photographic artifact)
105         // Build context object
106         const context: Record<string, unknown> = {
107             url: error.config?.url,
108             method: error.config?.method?.toUpperCase(),
109             statusCode,
110             errorCode: error.code,
111         };
112  (blank — ghost of line 109's "statusCode," bleeds through here)
113         if (responseData?.errors) {
114             context.details = responseData.errors;
115         }
116  (blank — ghost of line 113's "if (responseData?.errors) {" bleeds down; resolved via bracket-depth-colorization cross-check, see notes)
117         return new ApiError(message, statusCode, isRetryable, context);
118     }
119 }
120  (blank — ghost of line 117's return statement bleeds through here)
121 // ------------------------------------------------------------------
122  (blank — faint ghost of line 119's closing brace only)
123 const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
124  (blank — ghost of line 121's dashed comment bleeds through here)
125 // --- Axios Instace ---
126 const api = axios.create({
127     baseURL: import.meta.env.VITE_API_BASE_URL,


========== IMG_3759.md ==========
---
photo: IMG_3759.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 118-143 (plus sticky-scroll header for line 23)
orientation: 180
confidence: high
notes: Continuation of IMG_3758, scrolled down further. This photo is crisp/sharp with essentially none of the double-exposure motion-blur ghosting seen in IMG_3751-3758 — a clean, high-confidence read. It strongly corroborates the ghosting-artifact resolution made in IMG_3758 for lines 118-127 (closing braces, blank lines, dashed comment, wait() helper, and start of the Axios instance) — all match exactly what was inferred there. Only one sticky-scroll header pinned at top this time: "23  export class ApiError extends Error {" (the fromAxiosError method's line-49 header is gone since that method has fully scrolled out of view and closed). New content: finishes the ApiError class close, a `wait()` helper, creation of the shared `api` axios instance (baseURL/headers/withCredentials), and the start of a request interceptor (`api.interceptors.request.use(...)`) that logs outgoing requests via `logger.debug`, returns the config, and logs interceptor errors via `logger.error` in its error handler. Line 121 is a long dashed comment divider (`// ---...---`); exact dash count is approximate. Line 125 again reads "Instace" verbatim (source typo for "Instance"), consistent with IMG_3758. Photo cuts off after line 143 — the interceptor's error-handler body and its closing braces are not visible. Explorer sidebar: aqs-web-ui > src > utils, http-instance.ts selected (badge "6"). Status bar: 8 errors/0 warnings, No Solution, git blame "Chavan (4 months ago)", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, branch hitanshu/experimental*. Taskbar clock reads 7:24 PM 10-07-2026.
---
[sticky scroll] 23  export class ApiError extends Error {

118     }
119 }
120
121 // ------------------------------------------------------------------
122
123 const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
124
125 // --- Axios Instace ---
126 const api = axios.create({
127     baseURL: import.meta.env.VITE_API_BASE_URL,
128     headers: { 'Content-Type': 'application/json' },
129     withCredentials: true,
130 });
131
132 // --- Request Interceptor ---
133 api.interceptors.request.use(
134     (config) => {
135         logger.debug('Outgoing request', {
136             method: config.method?.toUpperCase(),
137             url: config.url,
138             data: config.data,
139         });
140         return config;
141     },
142     (error) => {
143         logger.error('Request interceptor error', error as Error);


========== IMG_3760.md ==========
---
photo: IMG_3760.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 126-154
orientation: 180
confidence: medium
notes: Continuation of IMG_3759, scrolled down slightly further (same file, same tab). No sticky-scroll header is pinned in this photo — line 126 (top-level `const api = axios.create({`) is not nested inside any class/function that VS Code would pin. Same double-exposure motion-blur ghosting as IMG_3751-3758 returns in this photo (IMG_3759 itself was clean); resolved with a consistent, simple +3-row offset (ghost at row N = content of row N-3, confirmed directly from the gutter numbers themselves, which show a faint duplicate number 3 rows above each bold number) — simpler than IMG_3758's dual-offset case. Lines 126-146 duplicate/overlap content already established at high confidence in IMG_3759 (included here for completeness/verbatim capture); lines 147-154 are new. Line 147 resolved as blank (only an unopposed ghost of line 144's "return Promise.reject(error);" is visible there), consistent with the file's recurring blank-line-before-comment style (matches line 131 before "// --- Request Interceptor ---" and line 147 before "// --- Response Interceptor ---"). Line 154 ("data: response.data,") is partially clipped at the very bottom of the visible editor viewport by the OS status bar/taskbar overlap in this photo — the field name/value are legible but the trailing comma is inferred from the parallel structure of the request-interceptor's logger.debug call at lines 136-138 (method/url/data, each with a trailing comma) rather than being 100% pixel-confirmed; the closing `});` for this logger.debug call and anything after line 154 is not visible in this photo. Status bar: 8 errors/0 warnings, No Solution, git blame "Chavan (4 months ago)", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, branch hitanshu/experimental*. Explorer sidebar: aqs-web-ui > src > utils, http-instance.ts selected (badge "6"). Taskbar clock reads 7:24 PM 10-07-2026.
---
126 const api = axios.create({
127     baseURL: import.meta.env.VITE_API_BASE_URL,
128     headers: { 'Content-Type': 'application/json' },
129     withCredentials: true,
130 });
131
132 // --- Request Interceptor ---
133 api.interceptors.request.use(
134     (config) => {
135         logger.debug('Outgoing request', {
136             method: config.method?.toUpperCase(),
137             url: config.url,
138             data: config.data,
139         });
140         return config;
141     },
142     (error) => {
143         logger.error('Request interceptor error', error as Error);
144         return Promise.reject(error);
145     },
146 );
147
148 // --- Response Interceptor ---
149 api.interceptors.response.use(
150     (response) => {
151         logger.debug('Incoming response', {
152             status: response.status,
153             url: response.config.url,
154             data: response.data,


========== IMG_3761.md ==========
---
photo: IMG_3761.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 141-167
orientation: 180
confidence: medium
notes: Photo has a camera-shake double-exposure ghosting effect (two near-identical overlapping frames of the same scroll position, offset by a few lines and a few pixels). Line 165 is an orphaned "url: error.config?.url," statement sitting right after the object literal already closes at line 164 (which already has its own "url" property at line 162) — an apparent leftover/duplicate artifact from editing, transcribed verbatim; likely contributes to the file's "8 errors" status. Reading cross-checked/corrected against the sharper overlapping photos IMG_3762 and IMG_3763, which show the same region (lines 148-188) more legibly. Explorer sidebar (AQS_WORKSPACE workspace > aqs-web-ui > src > utils) shows files: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts (highlighted/open, badge "6"), legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config-cop... (truncated name), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Only one tab open: http-instance.ts. Breadcrumb: aqs-web-ui > src > utils > http-instance.ts > .... Status bar: branch "hitanshu/experimental*" (uncommitted changes), "8 errors, 0 warnings", "No Solution", git blame "Chavan (4 months ago)", cursor Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. A faint ghost line above line 141 (partially cut off by breadcrumb bar) appears to read "(config) => {" — likely the tail of the preceding request-interceptor arrow function, not confidently placed at a line number so omitted from the numbered transcript.
---
141    },
142    (error) => {
143      logger.error('Request interceptor error', error as Error);
144      return Promise.reject(error);
145    },
146  );
147
148  // --- Response Interceptor ---
149  api.interceptors.response.use(
150    (response) => {
151      logger.debug('Incoming response', {
152        status: response.status,
153        url: response.config.url,
154        data: response.data,
155      });
156      return response;
157    },
158    (error: AxiosError) => {
159      // Handle 401 errors immediately
160      if (error.response?.status === 401) {
161        logger.debug('401 response received', {
162          url: error.config?.url,
163          skipAuthInterceptor: error.config?.skipAuthInterceptor,
164        });
165        url: error.config?.url,
166        // Skip interceptor for SSO check requests (expected to fail)
167        if (error.config?.skipAuthInterceptor) {


========== IMG_3762.md ==========
---
photo: IMG_3762.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 148-176
orientation: 180
confidence: high
notes: Camera-shake double-exposure ghosting present (same as IMG_3761, a near-identical overlapping second frame at a slight pixel offset) but sharp/bold foreground text is clearly distinguishable and legible line by line, giving high confidence. This photo overlaps and confirms lines 148-164 from IMG_3761 and extends further to line 176. Line 165 is an orphaned "url: error.config?.url," statement right after the object literal already closes at line 164 (which already has its own "url" property at line 162) — apparent leftover/duplicate editing artifact, transcribed verbatim; likely contributes to the file's "8 errors" status. Line 173 is just a closing "}" (closes the outer "if (error.response?.status === 401)" block opened at 160); line 172 holds the logger.warn call. Reading cross-checked/corrected against the sharper overlapping photo IMG_3763, which shows the same region (lines 158-188) more legibly and resolved earlier ambiguity in this photo's read of lines 165 and 172-176. Same tab/file open (http-instance.ts, badge "6"), same Explorer sidebar file list as IMG_3761 (utils folder: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config-cop..., normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts). Status bar: branch "hitanshu/experimental*", "8 errors, 0 warnings", "No Solution", git blame "Chavan (4 months ago)", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
148  // --- Response Interceptor ---
149  api.interceptors.response.use(
150    (response) => {
151      logger.debug('Incoming response', {
152        status: response.status,
153        url: response.config.url,
154        data: response.data,
155      });
156      return response;
157    },
158    (error: AxiosError) => {
159      // Handle 401 errors immediately
160      if (error.response?.status === 401) {
161        logger.debug('401 response received', {
162          url: error.config?.url,
163          skipAuthInterceptor: error.config?.skipAuthInterceptor,
164        });
165        url: error.config?.url,
166        // Skip interceptor for SSO check requests (expected to fail)
167        if (error.config?.skipAuthInterceptor) {
168          logger.debug('401 from SSO check (expected), skipping interceptor');
169          return Promise.reject(ApiError.fromAxiosError(error));
170        }
171
172        logger.warn('401 Unauthorized - Session expired, clearing session');
173      }
174        // Clear session from localStorage using utility
175        const removed = removeItem('sessionInformation');
176        if (!removed) {⟪?⟫


========== IMG_3763.md ==========
---
photo: IMG_3763.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 158-188
orientation: 180
confidence: high
notes: Same camera-shake double-exposure ghosting as IMG_3761/IMG_3762 (a second near-identical frame offset by ~2 lines-worth of pixels), but sharp/bold foreground text is clearly distinguishable line by line — this photo gave the clearest, most reliable read of this whole block and was used to correct ambiguous lines in IMG_3761/IMG_3762 (line 165, and lines 172-176). Notable oddities transcribed verbatim (apparent WIP/editing artifacts, consistent with the file's "8 errors"/"No Solution" status): line 165 "url: error.config?.url," is an orphaned statement right after the object literal at 161-164 already closed (which already has its own "url" property at line 162); line 173 is a lone closing "}" for the outer "if (error.response?.status === 401)" block opened at 160; line 179 "if (!removed) {" appears to have no body/closing brace before the next line's comment at 180 (a second, apparently truncated/incomplete duplicate of the 176-178 if-block). Same tab/file open (http-instance.ts, badge "6"), same Explorer sidebar file list as IMG_3761/3762 (utils folder). Status bar: branch "hitanshu/experimental*", "8 errors, 0 warnings", "No Solution", git blame "Chavan (4 months ago)", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Titlebar shows "... Devices" and "Fullscreen" text partially visible at top edge (cut off), suggesting a screen-sharing/recording toolbar overlay.
---
158    (error: AxiosError) => {
159      // Handle 401 errors immediately
160      if (error.response?.status === 401) {
161        logger.debug('401 response received', {
162          url: error.config?.url,
163          skipAuthInterceptor: error.config?.skipAuthInterceptor,
164        });
165        url: error.config?.url,
166        // Skip interceptor for SSO check requests (expected to fail)
167        if (error.config?.skipAuthInterceptor) {
168          logger.debug('401 from SSO check (expected), skipping interceptor');
169          return Promise.reject(ApiError.fromAxiosError(error));
170        }
171
172        logger.warn('401 Unauthorized - Session expired, clearing session');
173      }
174      // Clear session from localStorage using utility
175      const removed = removeItem('sessionInformation');
176      if (!removed) {
177        logger.error('Failed to clear session from localStorage');
178      }
179      if (!removed) {
180      // Set skipSSOCheck flag to prevent SSO loop on login page
181      setItem('skipSSOCheck', true);
182
183      // Return rejected promise with user-friendly error (React Router will handle navigation)
184      return Promise.reject(
185        new ApiError('Your session has expired. Please log in again.', 401, false, {
186          sessionCleared: true,
187        }),
188      );


========== IMG_3764.md ==========
---
photo: IMG_3764.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 158-196
orientation: 180
confidence: high
notes: Same camera-shake double-exposure ghosting as IMG_3761/3762/3763, but sharp foreground text is clearly legible throughout. Confirms lines 158-173 already covered by IMG_3763 and extends the visible range to line 196. Resolves the structure around lines 179-189: the second "if (!removed) {" block opened at line 179 is NOT missing a body — it stays open through the comment/setItem/comment/return-Promise.reject statements (180-188) and is closed by the "}" at line 189; that means the setItem('skipSSOCheck', true) and the rejected-promise/ApiError logic (180-188) only run when session removal FAILED, which reads like a real logic bug (duplicated "if (!removed)" instead of unconditional/else logic) rather than a transcription artifact — transcribed verbatim. After line 189, execution falls through (regardless of the earlier 401-specific branch) to a general ApiError conversion + logger.error call (191-196), which is cut off by the status bar at line 196 ("context: apiError.context," — trailing content not visible). Titlebar again shows a partial "...Devices" / "Fullscreen" overlay at the very top edge, cut off, consistent with a screen-recording/sharing toolbar. Same tab/file, same Explorer sidebar, same status bar branch/error state as prior photos in this file (hitanshu/experimental*, 8 errors, No Solution, git blame Chavan 4 months ago).
---
158    (error: AxiosError) => {
...
170      }
171
172      logger.warn('401 Unauthorized - Session expired, clearing session');
173    }
174    // Clear session from localStorage using utility
175    const removed = removeItem('sessionInformation');
176    if (!removed) {
177      logger.error('Failed to clear session from localStorage');
178    }
179    if (!removed) {
180      // Set skipSSOCheck flag to prevent SSO loop on login page
181      setItem('skipSSOCheck', true);
182
183      // Return rejected promise with user-friendly error (React Router will handle navigation)
184      return Promise.reject(
185        new ApiError('Your session has expired. Please log in again.', 401, false, {
186          sessionCleared: true,
187        }),
188      );
189    }
190
191    // Convert to ApiError for better error handling
192    const apiError = ApiError.fromAxiosError(error);
193    logger.error('Response interceptor error', apiError, {
194      statusCode: apiError.statusCode,
195      isRetryable: apiError.isRetryable,
196      context: apiError.context,⟪?⟫


========== IMG_3765.md ==========
---
photo: IMG_3765.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 158-201
orientation: 180
confidence: high
notes: Same camera-shake double-exposure ghosting as prior photos in this sequence (IMG_3761-3764), sharp foreground text clearly legible. Confirms lines 158-196 already transcribed from IMG_3763/IMG_3764 and extends to line 201, which is blank (end of the response-error-interceptor function/api.interceptors.response.use(...) call, closed at line 200). Reading of line 201 corrected against the sharper photo IMG_3766, which shows this same region with much less blur and confirms 201 is empty (an earlier read of this photo alone had mistakenly attributed a duplicated "return Promise.reject(apiError);" ghost line to 201). Titlebar again shows partial "...Devices"/"Fullscreen" overlay cut off at the very top, consistent with a screen-recording/sharing toolbar. Same tab/file, same Explorer sidebar file list, same status bar (branch hitanshu/experimental*, 8 errors 0 warnings, No Solution, git blame Chavan 4 months ago, Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript).
---
158    (error: AxiosError) => {
       ... [lines 159-196 identical to IMG_3763.md / IMG_3764.md — see those transcripts] ...
176      if (!removed) {
177        logger.error('Failed to clear session from localStorage');
178      }
179      if (!removed) {
180        // Set skipSSOCheck flag to prevent SSO loop on login page
181        setItem('skipSSOCheck', true);
182
183        // Return rejected promise with user-friendly error (React Router will handle navigation)
184        return Promise.reject(
185          new ApiError('Your session has expired. Please log in again.', 401, false, {
186            sessionCleared: true,
187          }),
188        );
189      }
190
191      // Convert to ApiError for better error handling
192      const apiError = ApiError.fromAxiosError(error);
193      logger.error('Response interceptor error', apiError, {
194        statusCode: apiError.statusCode,
195        isRetryable: apiError.isRetryable,
196        context: apiError.context,
197      });
198      return Promise.reject(apiError);
199    },
200  );
201


========== IMG_3766.md ==========
---
photo: IMG_3766.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 194-219
orientation: 180
confidence: high
notes: Sticky-scroll header at top shows line 158 "(error: AxiosError) => {" (enclosing scope). Camera-shake double-exposure ghosting present but noticeably lighter/less severe than IMG_3761-3765 — sharp foreground text is very legible throughout, giving high confidence. Confirms lines 194-200 already seen in IMG_3765 and clarifies that line 201 is blank (corrects an earlier misread in IMG_3765.md, see its notes). Extends coverage to a new section: the JSDoc block and start of an exported baseQuery function (lines 202-219) — a different logical unit (base Axios wrapper with retry/caching) that begins right after the response interceptor setup ends. Same tab/file open (http-instance.ts, badge "6"), same Explorer sidebar file list (utils folder). Status bar: branch "hitanshu/experimental*", "8 errors, 0 warnings", "No Solution", git blame "Chavan (4 months ago)", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Titlebar shows partial "...Devices"/"Fullscreen" overlay cut off at the very top edge, consistent with a screen-recording/sharing toolbar visible in this run of photos.
---
158    (error: AxiosError) => {  [sticky-scroll header]
194        statusCode: apiError.statusCode,
195        isRetryable: apiError.isRetryable,
196        context: apiError.context,
197      });
198      return Promise.reject(apiError);
199    },
200  );
201
202  // --- Base Query ---
203
204  /**
205   * Enhanced base query with caching and performance monitoring
206   *
207   * @param config - Axios request configuration
208   * @param retryOptions - Retry configuration for failed requests
209   * @param cache - Optional ApiCache instance for caching responses
210   * @returns Promise resolving to response data
211   */
212  export const baseQuery = async <T>(
213    config: AxiosRequestConfig,
214    retryOptions: RetryOptions = {},
215    cache?: ApiCache,
216  ): Promise<T> => {
217    const { retries = 0, retryDelay = 500, retryOn = [500, 502, 503, 504] } = retryOptions;
218
219    // Generate cache key if cache is provided (only for GET requests)


========== IMG_3767.md ==========
---
photo: IMG_3767.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 204-230
orientation: 180
confidence: high
notes: Camera-shake double-exposure ghosting present but sharp foreground text is clearly legible throughout. Confirms lines 204-219 already seen in IMG_3766 and extends the baseQuery function body to line 230 (cache lookup via cache.get<T>(...) with method/url/params arguments, args continue past the visible bottom edge). Line 218 "const cacheKey =" is an apparent duplicate/leftover of the real declaration at line 220 (confirmed via VS Code's sticky-scroll header in the sharper photo IMG_3768, which pins line 218 with this exact text) — another instance of the duplicated-statement pattern seen elsewhere in this file; originally mistranscribed as blank here, corrected after cross-checking IMG_3768. Same tab/file open (http-instance.ts, badge "6"), same Explorer sidebar file list (utils folder). Status bar: branch "hitanshu/experimental*", "8 errors, 0 warnings", "No Solution", git blame "Chavan (4 months ago)", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Titlebar shows partial "...Devices"/"Fullscreen" overlay cut off at the very top edge, consistent with a screen-recording/sharing toolbar visible in this run of photos.
---
204  /**
205   * Enhanced base query with caching and performance monitoring
206   *
207   * @param config - Axios request configuration
208   * @param retryOptions - Retry configuration for failed requests
209   * @param cache - Optional ApiCache instance for caching responses
210   * @returns Promise resolving to response data
211   */
212  export const baseQuery = async <T>(
213    config: AxiosRequestConfig,
214    retryOptions: RetryOptions = {},
215    cache?: ApiCache,
216  ): Promise<T> => {
217    const { retries = 0, retryDelay = 500, retryOn = [500, 502, 503, 504] } = retryOptions;
218    const cacheKey =
219    // Generate cache key if cache is provided (only for GET requests)
220    const cacheKey =
221      cache && config.method?.toUpperCase() === 'GET'
222        ? `${config.url}?${JSON.stringify(config.params || {})}`
223        : null;
224
225    // Check cache before making request
226    if (cacheKey && cache) {
227      const cachedData = cache.get<T>(
228        config.method?.toUpperCase() || 'GET',
229        config.url || '',
230        config.params || {},⟪?⟫


========== IMG_3768.md ==========
---
photo: IMG_3768.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 212-243
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 212 "export const baseQuery = async <T>(" (enclosing function). Camera-shake double-exposure ghosting present but noticeably lighter than most earlier photos in this run — sharp foreground text is very legible. A second sticky-scroll row pins line 218 "const cacheKey =" (confirmed at high zoom) directly above line 219's comment — an apparent duplicate/leftover of the real declaration at line 220 (same duplicated-statement pattern seen elsewhere in this file, e.g. IMG_3762/IMG_3763's "url:" and "if (!removed)" duplicates); used to correct IMG_3767.md which had mistranscribed line 218 as blank. Extends coverage through the cache-hit/cache-miss branch and into the retry-loop setup (perfMonitor.start, "let attempt = 0"). Same tab/file open (http-instance.ts, badge "6"), same Explorer sidebar file list (utils folder). Status bar: branch "hitanshu/experimental*", "8 errors, 0 warnings", "No Solution", git blame "Chavan (4 months ago)", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Titlebar shows partial "Ctrl+Alt+Del"/"USB Devices"/"Fullscreen" overlay cut off at the very top edge, consistent with a screen-recording/sharing toolbar visible throughout this run of photos.
---
212  export const baseQuery = async <T>(  [sticky-scroll header]
218  const cacheKey =  [sticky-scroll header, duplicate of line 220]
219    // Generate cache key if cache is provided (only for GET requests)
220    const cacheKey =
221      cache && config.method?.toUpperCase() === 'GET'
222        ? `${config.url}?${JSON.stringify(config.params || {})}`
223        : null;
224
225    // Check cache before making request
226    if (cacheKey && cache) {
227      const cachedData = cache.get<T>(
228        config.method?.toUpperCase() || 'GET',
229        config.url || '',
230        config.params || {},
231      );
232      if (cachedData) {
233        logger.debug('Cache hit', { url: config.url, key: cacheKey });
234        return cachedData;
235      }
236      logger.debug('Cache miss', { url: config.url, key: cacheKey });
237    }
238
239    // Start performance measurement
240    const requestId = `${config.method?.toUpperCase()}_${config.url}_${Date.now()}`;
241    perfMonitor.start(requestId, { method: config.method, url: config.url });
242
243    let attempt = 0;


========== IMG_3769.md ==========
---
photo: IMG_3769.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 234-256
orientation: 180
confidence: medium
notes: Heavier camera-shake double-exposure ghosting than IMG_3766-3768 in this section, requiring many tight cross-checked crops to separate sharp foreground text from ghost text (offset ~2-3 lines). Confirms lines 234-243 already seen in IMG_3768 and extends to line 256. Line 244 "perfMonitor.start(requestId, { method: config.method, url: config.url });" duplicates the call already made at line 241 — another instance of this file's recurring duplicated-statement pattern (see IMG_3762/3763/3767/3768 notes) — transcribed verbatim; the developer appears to have pasted the perfMonitor.start call again right before the retry while-loop. Line 248 could not be conclusively read as sharp text (only faint ghost fragments visible) and is transcribed as blank based on the file's consistent style of a blank line before each following comment block (matches the blank-line-before-comment pattern seen at lines 224/238); flagged with lower confidence. Sticky-scroll header at top shows line 212 "export const baseQuery = async <T>(". Same tab/file, same Explorer sidebar, same status bar (branch hitanshu/experimental*, 8 errors 0 warnings, No Solution, git blame Chavan 4 months ago). Titlebar shows partial "Ctrl+Alt+Del"/"USB Devices"/"Fullscreen" overlay cut off at top edge (screen-recording/sharing toolbar).
---
212  export const baseQuery = async <T>(  [sticky-scroll header]
234        );
235        return cachedData;
236      }
237      logger.debug('Cache miss', { url: config.url, key: cacheKey });
238    }
239    // Start performance measurement
240    const requestId = `${config.method?.toUpperCase()}_${config.url}_${Date.now()}`;
241    perfMonitor.start(requestId, { method: config.method, url: config.url });
242
243    let attempt = 0;
244    perfMonitor.start(requestId, { method: config.method, url: config.url });⟪duplicate, see notes⟫
245    while (true) {
246      try {
247        const response = await api.request<T>(config);
248  ⟪?⟫
249        // End performance measurement
250        perfMonitor.end(requestId);
251        logger.debug('Request completed', {
252          url: config.url,
253          attempt: attempt > 0 ? attempt : undefined,
254        });
255
256        // Store in cache if cache is provided


========== IMG_3770.md ==========
---
photo: IMG_3770.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 240-267
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 212 "export const baseQuery = async <T>(". Camera-shake double-exposure ghosting present but sharp foreground text is legible with careful cross-checking. Confirms lines 240-256 already transcribed from IMG_3769 (including the duplicated perfMonitor.start call at line 244) and this photo's clearer framing of line 248 supports it being blank (only ghost fragments visible there, no distinct sharp text) — corroborates the medium-confidence guess made in IMG_3769.md. Extends coverage through the cache.set(...) call and into "// Return just the data" at line 267. Same tab/file, same Explorer sidebar, same status bar (branch hitanshu/experimental*, 8 errors 0 warnings, No Solution, git blame Chavan 4 months ago). Titlebar shows partial "Ctrl+Alt+Del"/"USB Devices"/"Fullscreen" overlay cut off at top edge (screen-recording/sharing toolbar).
---
212  export const baseQuery = async <T>(  [sticky-scroll header]
241    perfMonitor.start(requestId, { method: config.method, url: config.url });
242    // Start performance measurement
243    let attempt = 0;
244    perfMonitor.start(requestId, { method: config.method, url: config.url });
245    while (true) {
246      try {
247        const response = await api.request<T>(config);
248
249        // End performance measurement
250        perfMonitor.end(requestId);
251        logger.debug('Request completed', {
252          url: config.url,
253          attempt: attempt > 0 ? attempt : undefined,
254        });
255
256        // Store in cache if cache is provided
257        if (cacheKey && cache) {
258          cache.set(
259            config.method?.toUpperCase() || 'GET',
260            config.url || '',
261            config.params || {},
262            response.data,
263          );
264          logger.debug('Response cached', { url: config.url, key: cacheKey });
265        }
266
267        // Return just the data


========== IMG_3771.md ==========
---
photo: IMG_3771.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 257-282
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 212 "export const baseQuery = async <T>(". Camera-shake double-exposure ghosting present but sharp foreground text is clearly legible throughout. Confirms lines 257-267 already seen in IMG_3770 and extends through the catch block: converting to ApiError, computing isRetryable, and starting the retry-attempt branch. Line 283 is cut off by the status bar at the very bottom edge (only a ghost repeat of line 280's "if (attempt < retries && isRetryable) {" is faintly visible there) — not transcribed as it isn't reliably legible. Same tab/file, same Explorer sidebar, same status bar (branch hitanshu/experimental*, 8 errors 0 warnings, No Solution, git blame Chavan 4 months ago). Titlebar shows partial "Ctrl+Alt+Del"/"USB Devices"/"Fullscreen" overlay cut off at top edge (screen-recording/sharing toolbar).
---
212  export const baseQuery = async <T>(  [sticky-scroll header]
257      if (cacheKey && cache) {
258        cache.set(
259          config.method?.toUpperCase() || 'GET',
260          config.url || '',
261          config.params || {},
262          response.data,
263        );
264        logger.debug('Response cached', { url: config.url, key: cacheKey });
265      }
266
267      // Return just the data
268      return response.data;
269    } catch (error) {
270      // Convert to ApiError if not already
271      const apiError =
272        error instanceof ApiError ? error : ApiError.fromAxiosError(error as AxiosError);
273
274      // Check if should retry
275      const isRetryable =
276        apiError.isRetryable &&
277        apiError.statusCode &&
278        retryOn.includes(apiError.statusCode);
279
280      if (attempt < retries && isRetryable) {
281        attempt++;
282        logger.warn('Retrying request', {


========== IMG_3772.md ==========
---
photo: IMG_3772.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 271-296
orientation: 180
confidence: high
notes: Sticky-scroll header shows line 212 "export const baseQuery = async <T>(". This is the clearest/least-blurred photo in the whole run — camera-shake double-exposure ghosting is present but very light, sharp foreground text is highly legible throughout. Confirms lines 271-282 already seen in IMG_3771 and finally resolves line 283 (cut off in IMG_3771) as "attempt," — part of the logger.warn(...) call's object argument. Extends through the end of the retry-attempt if-block (await wait(retryDelay); continue;), the post-loop performance-measurement-with-error cleanup, and into the start of the final error log call at line 296, which is cut off by the status bar (only "logger.error('Request failed', apiError, {" visible, continuation not shown). Same tab/file, same Explorer sidebar, same status bar (branch hitanshu/experimental*, 8 errors 0 warnings, No Solution, git blame Chavan 4 months ago). Titlebar shows partial "...Devices"/"Fullscreen" overlay cut off at top edge (screen-recording/sharing toolbar), consistent with the rest of this photo run. This appears to be the last photo in this particular scroll-through of http-instance.ts's baseQuery function.
---
212  export const baseQuery = async <T>(  [sticky-scroll header]
270    // Convert to ApiError if not already
271    const apiError =
272      error instanceof ApiError ? error : ApiError.fromAxiosError(error as AxiosError);
273
274    // Check if should retry
275    const isRetryable =
276      apiError.isRetryable &&
277      apiError.statusCode &&
278      retryOn.includes(apiError.statusCode);
279
280    if (attempt < retries && isRetryable) {
281      attempt++;
282      logger.warn('Retrying request', {
283        attempt,
284        maxRetries: retries,
285        url: config.url,
286        statusCode: apiError.statusCode,
287      });
288      await wait(retryDelay);
289      continue;
290    }
291
292    // End performance measurement with error
293    perfMonitor.end(requestId);
294
295    // Log final error
296    logger.error('Request failed', apiError, {⟪?⟫


========== IMG_3773.md ==========
---
photo: IMG_3773.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 275-301
orientation: 180
confidence: medium
notes: Sticky-scroll header pinned at top shows line 212 `export const baseQuery = async <T>(`. Photo has a double-exposure/motion-blur ghost layer offset ~3 lines below each sharp line (camera caught the screen mid-scroll); the ghost text repeats phrases from the same block (e.g. "apiError.statusCode &&", "isRetryable) {", "retryOn.includes(apiError.statusCode);") rather than showing distinct new code, so only the sharp gutter-aligned text is transcribed below. Line 276 is not legibly resolvable (buried in the ghost overlay) and is marked illegible. Line 279 is confirmed blank (no sharp text at that row). Explorer sidebar (aqs-web-ui/src/utils/) shows: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts (active, tab has unsaved-changes dot "6"), legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop... (truncated name), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Status bar: branch hitanshu/experimental*, 8 errors / 0 warnings, "No Solution", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Editor says "Chavan (4 months ago)" (git blame/lens on line 275). Taskbar clock 7:24 PM 7/10/2026.
---
212:    export const baseQuery = async <T>(
...
275:        const isRetryable =
276: ⟪?⟫
277:          apiError.statusCode &&
278:          retryOn.includes(apiError.statusCode);
279:
280:      if (attempt < retries && isRetryable) {
281:          attempt++;
282:          logger.warn('Retrying request', {
283:              attempt,
284:              maxRetries: retries,
285:              url: config.url,
286:              statusCode: apiError.statusCode,
287:          });
288:          await wait(retryDelay);
289:          continue;
290:      }
291:
292:      // End performance measurement with error
293:      perfMonitor.end(requestId);
294:
295:      // Log final error
296:      logger.error('Request failed', apiError, {
297:          url: config.url,
298:          attempts: attempt + 1,
299:          statusCode: apiError.statusCode,
300:          context: apiError.context,
301:      });


========== IMG_3774.md ==========
---
photo: IMG_3774.JPG
type: vscode-code
file: aqs-web-ui/src/utils/http-instance.ts
lines: 284-308
orientation: 180
confidence: high
notes: Sticky-scroll header pinned at top shows line 212 `export const baseQuery = async <T>(`. Same double-exposure/motion-blur ghosting as IMG_3773 (a fainter duplicate of the same block offset a couple lines below each sharp line, including duplicated gutter numbers) — only the sharp gutter-aligned text is transcribed. Lines 284-301 overlap with IMG_3773 and match it exactly (cross-verified). New content beyond that photo: 302-308, which closes out the retry/error-throw block and the baseQuery function. Explorer sidebar (aqs-web-ui/src/utils/) unchanged from IMG_3773: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts (active tab, unsaved dot "6"), legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop... (truncated), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Status bar: branch hitanshu/experimental*, 8 errors / 0 warnings, "No Solution", Ln 15 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, "Chavan (4 months ago)" blame. Taskbar clock 7:25 PM 7/10/2026.
---
212:    export const baseQuery = async <T>(
...
284:            maxRetries: retries,
285:            url: config.url,
286:            statusCode: apiError.statusCode,
287:        });
288:        await wait(retryDelay);
289:        continue;
290:    }
291:
292:    // End performance measurement with error
293:    perfMonitor.end(requestId);
294:
295:    // Log final error
296:    logger.error('Request failed', apiError, {
297:        url: config.url,
298:        attempts: attempt + 1,
299:        statusCode: apiError.statusCode,
300:        context: apiError.context,
301:    });
302:
303:    // Throw ApiError for upstream handling
304:    throw apiError;
305:  }
306: }
307: };
308:
