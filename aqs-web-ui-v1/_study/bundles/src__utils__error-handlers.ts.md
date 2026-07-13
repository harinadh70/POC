# BUNDLE for src/utils/error-handlers.ts
# 19 photo fragment(s), ascending start-line order.


========== IMG_3589.md ==========
---
photo: IMG_3589.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 1-34
orientation: 180
confidence: high
notes: |
  Clean, sharp capture, no ghosting. New file relative to prior photos in this
  chunk. Tab bar: only one tab open, "error-handlers.ts" (with "2" problems badge).
  Explorer sidebar (aqs-web-ui/src/utils), expanded, alphabetical file list visible:
    command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx,
    detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts [highlighted, active],
    execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts,
    legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts,
    normalize-service-config cop... (truncated), normalize-service-config.ts,
    parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts,
    parse-querystring-params.ts, performance-benchmarks.ts
  Squiggly underline under 'zod' import specifier (line 22).
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "4" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:21 PM 7/10/2026.
  Line 34 is the last visible line, cut off at the very bottom edge of the
  viewport/status bar; only partially legible ("...signature from useDialogStore").
---
1:   /**
2:    * ErrorHandlers - Centralized error handling with dialog integration
3:    *
4:    * Features:
5:    * - Network error handling with retry suggestions
6:    * - Validation error handling using ZodErrorFormatter
7:    * - Dialog integration for user notifications
8:    * - Comprehensive logging for all error types
9:    * - Type-safe error handling
10:   *
11:   * @example
12:   * ```tsx
13:   * const { onOpenDialog } = useDialogStore();
14:   *
15:   * try {
16:   *   await fetchData();
17:   * } catch (error) {
18:   *   await ErrorHandlers.handleNetworkError(error, onOpenDialog, 'fetchUserData');
19:   * }
20:   * ```
21:   */
22:  import { ZodError } from 'zod';
23:  import { createLogger } from '@/utils/logger-builder';
24:  import { ZodErrorFormatter } from '@/utils/zod-error-formatter';
25:
26:  import type { MessageType } from '@/components/dialog';
27:
28:  // ------------------------------------------
29:  // Types
30:  // ------------------------------------------
31:
32:
33:  /**
34:   * Dialog show function signature from useDialogStore⟪?⟫ (line clipped at bottom of viewport)


========== IMG_3590.md ==========
---
photo: IMG_3590.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 20-52 (approx)
orientation: 180
confidence: medium
notes: |
  Double-exposure/ghosting artifact (mid smooth-scroll capture, same as other
  photos in this set), fainter duplicate text ~2 lines offset. Lines 20-34
  duplicate content already transcribed cleanly in IMG_3589 (imports/JSDoc) —
  not repeated in full here. New content: the ShowDialogFunction interface
  (36-47) and start of NetworkErrorDetails interface (48-52+). Exact line
  numbers for 48-52 (order of status/statusText/url/method fields) varied
  slightly between two crops of the same photo taken at different zoom levels;
  the order given below is the best-supported reading but individual field-to-
  line-number pairing in that tail is medium confidence. The interface's
  closing brace is not visible (cut off at bottom of viewport/status bar).
  Tab bar: "error-handlers.ts" (with "2" problems badge), active tab.
  Explorer sidebar (aqs-web-ui/src/utils) same expanded file list as IMG_3589.
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "4" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:21 PM 7/10/2026.
---
20:  import { ZodError } from 'zod';
21:  import { createLogger } from '@/utils/logger-builder';
22:  import { ZodErrorFormatter } from '@/utils/zod-error-formatter';
       (lines 25-27 not distinctly re-transcribed — identical to IMG_3589 lines 25-27)
       ... (see IMG_3589.md for lines 20-34, transcribed cleanly there)
35:  */
36:  export interface ShowDialogFunction {
37:    (options: {
38:      message: React.ReactNode;
39:      title?: string;
40:      messageType?: MessageType;
41:      dialogType?: 'ok' | 'yesno' | 'yesnocancel';
42:      onOk?: () => void;
43:      onYes?: () => void;
44:      onNo?: () => void;
45:      onCancel?: () => void;
46:    }): void;
47:  }
48:  interface NetworkErrorDetails {
49:    status?: number;
50:    statusText?: string;
51:    url?: string;
52:    method?: string;⟪?⟫
       ... (closing brace and any further fields not visible — cut off at bottom of viewport)


========== IMG_3591.md ==========
---
photo: IMG_3591.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 27-60 (approx; interface section ~2-line numbering uncertainty, see notes)
orientation: 180
confidence: medium
notes: |
  Double-exposure/ghosting artifact throughout most of the frame (same as
  IMG_3589/3590), fainter duplicate text ~2 lines offset. This photo largely
  re-shows the ShowDialogFunction / NetworkErrorDetails interfaces already
  covered in IMG_3590, but with a persistent ~2-line discrepancy in exact
  gutter-number alignment between different crops of the same photo (e.g. the
  "interface NetworkErrorDetails {" line reads as 46 in one crop of this photo
  vs. 48 in IMG_3590's cleaner crop) — this could not be fully resolved even
  after zooming multiple regions; IMG_3590.md's numbering (interface starting
  at line 48) is treated as authoritative for that section since it was
  corroborated across more crops. New, more clearly legible content in THIS
  photo: the `const logger = createLogger(...)` statement and the start of a
  "// ErrorHandlers Class" comment banner (lines ~53-60), transcribed below
  with higher confidence.
  Tab bar: "error-handlers.ts" (with "2" problems badge), active tab.
  Explorer sidebar (aqs-web-ui/src/utils) same expanded file list as IMG_3589/3590.
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "4" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:21 PM 7/10/2026.
---
27:  import type { MessageType } from '@/components/dialog';
       ... (lines 28-45: ShowDialogFunction interface — see IMG_3590.md for the
            transcribed content; this photo shows the same text with a ~2-line
            gutter-number ambiguity that was not fully resolvable)
~46-48: interface NetworkErrorDetails {
~47-49:   status?: number;
~48-50:   statusText?: string;
~49-51:   url?: string;
~50-52:   method?: string;
~51-53: }
       (blank line)
53:  const logger = createLogger({ feature: 'error-handling', component: 'error-handlers' });
54:
55:
56:
57:
58:  // ------------------------------------------
59:  // ErrorHandlers Class
60:  // ------------------------------------------


========== IMG_3592.md ==========
---
photo: IMG_3592.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 49-78
orientation: 180
confidence: low
notes: Severe double-exposure/motion-blur ghosting throughout, worst in lines ~49-61 (looks like two overlapping scroll states ~3 lines apart, consistent with the editor still mid-scroll-animation when the shutter fired; likely rolling-shutter capturing an active smooth-scroll). Lines 62-78 are legible and were cross-validated against the much cleaner IMG_3593 (same file, lines 62-94, clean single exposure) which confirms line 62 = "export class ErrorHandlers {" and the handleNetworkError JSDoc/signature exactly as transcribed below. Lines 49-61 are best-effort reconstruction using the ghost-offset pattern (faint text at row N consistently echoes the real content of row N+3) to disambiguate overlapping text; uncertain fragments marked ⟪?⟫. Explorer sidebar: error-handlers.ts selected/highlighted in utils folder (same file listing as later photos of this file: command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy..., normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts). Only tab open: error-handlers.ts (2 problems). Status bar: aqs-web-ui, branch hitanshu/experimental*, 4 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:21 PM 7/10/2026. Photo was upside down; rotated 180 to read.
---
49: interface NetworkErrorDetails {
50:     url?: string;
51:     method?: string;
52: ⟪?⟫ (obscured by ghosting; possibly another field, e.g. status?: number;)
53: ⟪?⟫ (obscured by ghosting)
54: }
55: ⟪?⟫ (blank line, heavily ghosted)
56: const logger = createLogger({ feature: 'error-handling', component: 'error-handlers' });
57: ⟪?⟫ (blank line, heavily ghosted)
58: // ---------------------------------------- ⟪?⟫
59: // ErrorHandlers Class
60: // ---------------------------------------- ⟪?⟫
61: ⟪?⟫ (blank line, heavily ghosted)
62: export class ErrorHandlers {
63:     /**
64:      * Handle network errors with user notification and logging
65:      * Provides context-aware error messages based on HTTP status codes
66:      *
67:      * @param error - Error object from failed network request
68:      * @param showDialog - Function to display dialog (from useDialogStore)
69:      * @param context - Context string describing the operation (e.g., 'fetchPageBuild', 'submitLogin')
70:      */
71:     static async handleNetworkError(
72:         error: unknown,
73:         showDialog: ShowDialogFunction,
74:         context: string,
75:     ): Promise<void> {
76:         const details = this.extractNetworkErrorDetails(error);
77:         const userMessage = this.formatNetworkErrorMessage(details);
78:         const errorType = this.getNetworkErrorType(details);


========== IMG_3593.md ==========
---
photo: IMG_3593.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 62-94
orientation: 180
confidence: high
notes: Faint double-exposure ghost echo visible behind the bold text (same content repeated ~9 lines lower, e.g. bold line 62 echoed faintly again down near line 71, bold line 71 echoed near line 80, etc.) but the bold/sharp layer aligned with the gutter numbers is clean and unambiguous throughout, and cross-validates IMG_3592's overlapping range (62-78) exactly. Explorer sidebar: error-handlers.ts selected/highlighted in utils folder, same file listing as IMG_3592 (command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy..., normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts). Only tab open: error-handlers.ts (2 problems). Status bar: aqs-web-ui, branch hitanshu/experimental*, 4 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:21 PM 7/10/2026. Photo was upside down; rotated 180 to read.
---
62: export class ErrorHandlers {
63:     /**
64:      * Handle network errors with user notification and logging
65:      * Provides context-aware error messages based on HTTP status codes
66:      *
67:      * @param error - Error object from failed network request
68:      * @param showDialog - Function to display dialog (from useDialogStore)
69:      * @param context - Context string describing the operation (e.g., 'fetchPageBuild', 'submitLogin')
70:      */
71:     static async handleNetworkError(
72:         error: unknown,
73:         showDialog: ShowDialogFunction,
74:         context: string,
75:     ): Promise<void> {
76:         const details = this.extractNetworkErrorDetails(error);
77:         const userMessage = this.formatNetworkErrorMessage(details);
78:         const errorType = this.getNetworkErrorType(details);
79:
80:         // Log detailed error information
81:         logger.error(`Network error in ${context}`, error as Error, {
82:             context,
83:             ...details,
84:             errorType,
85:         });
86:
87:         // Show user-friendly dialog
88:         showDialog({
89:             message: userMessage,
90:             messageType: errorType,
91:             dialogType: 'ok',
92:             title: 'Network Error',
93:         });
94:     }


========== IMG_3594.md ==========
---
photo: IMG_3594.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 79-110 (sticky scroll shows lines 62, 71)
orientation: 180
confidence: high
notes: Sticky scroll headers at top show enclosing scope, line 62 "export class ErrorHandlers {" and line 71 "static async handleNetworkError(". Faint double-exposure ghost echo visible behind the bold text throughout (same content repeated ~8 lines lower), but the bold/sharp layer aligned with the gutter numbers is clean and unambiguous. Lines 79-95 cross-validated exactly against IMG_3593 (lines 62-94). New content beyond IMG_3593: JSDoc for handleValidationError (96-103) and its signature/body start (104-110), cut off mid-line at bottom of screen. Explorer sidebar: error-handlers.ts selected/highlighted in utils folder, same file listing as IMG_3592/3593. Only tab open: error-handlers.ts (2 problems). Status bar: aqs-web-ui, branch hitanshu/experimental*, 4 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:22 PM 7/10/2026. Photo was upside down; rotated 180 to read.
---
Sticky scroll (enclosing scope):
62  export class ErrorHandlers {
71      static async handleNetworkError(

79:
80:         // Log detailed error information
81:         logger.error(`Network error in ${context}`, error as Error, {
82:             context,
83:             ...details,
84:             errorType,
85:         });
86:
87:         // Show user-friendly dialog
88:         showDialog({
89:             message: userMessage,
90:             messageType: errorType,
91:             dialogType: 'ok',
92:             title: 'Network Error',
93:         });
94:     }
95:
96:     /**
97:      * Handle validation errors with formatted messages
98:      * Converts Zod validation errors to user-friendly format
99:      *
100:      * @param error - ZodError instance from failed validation
101:      * @param showDialog - Function to display dialog (from useDialogStore)
102:      * @param context - Context string describing what was being validated (e.g., 'PageBuildResponse')
103:      */
104:     static handleValidationError(
105:         error: ZodError,
106:         showDialog: ShowDialogFunction,
107:         context: string,
108:     ): void {
109:         if (!error || !(error instanceof ZodError)) {
110:             logger.error('Invalid error passed to handleValidationError', error as Error, {


========== IMG_3595.md ==========
---
photo: IMG_3595.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 104-136 (sticky scroll shows line 62)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting. Sticky scroll header shows line 62 "export class ErrorHandlers {" and line 104 "static handleValidationError(" pinned. Cross-validates and extends IMG_3594 (which showed 104-110 partially/ghosted); this photo confirms 104-110 cleanly and adds new content 111-136 (rest of handleValidationError body). Explorer: error-handlers.ts selected in utils folder, same file listing as prior photos. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 4 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:22 PM 7/10/2026.
---
Sticky scroll (line 62):
62  export class ErrorHandlers {
104     static handleValidationError(

104:    static handleValidationError(
105:        error: ZodError,
106:        showDialog: ShowDialogFunction,
107:        context: string,
108:    ): void {
109:        if (!error || !(error instanceof ZodError)) {
110:            logger.error('Invalid error passed to handleValidationError', error as Error, {
111:                context,
112:            });
113:
114:            showDialog({
115:                message: 'An unexpected validation error occurred. Please try again.',
116:                messageType: 'error',
117:                dialogType: 'ok',
118:                title: 'Validation Error',
119:            });
120:            return;
121:        }
122:
123:        // Log validation error with full details
124:        ZodErrorFormatter.logValidationError(error, context);
125:
126:        // Format user-friendly message
127:        const userMessage = ZodErrorFormatter.toUserMessage(error);
128:
129:        // Show dialog with formatted message
130:        showDialog({
131:            message: userMessage,
132:            messageType: 'error',
133:            dialogType: 'ok',
134:            title: 'Validation Error',
135:        });
136:    }


========== IMG_3596.md ==========
---
photo: IMG_3596.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 122-152 (sticky scroll shows lines 62, 104)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting. Sticky scroll header shows line 62 "export class ErrorHandlers {" and line 104 "static handleValidationError(" pinned. Overlaps and cross-validates IMG_3595 for lines 122-136 (exact match). New content beyond IMG_3595: JSDoc + signature start for handleGenericError (137-152), cut off mid-line at bottom of screen. Explorer: error-handlers.ts selected in utils folder, same file listing as prior photos. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 4 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:22 PM 7/10/2026.
---
Sticky scroll (lines 62, 104):
62  export class ErrorHandlers {
104     static handleValidationError(

122:
123:        // Log validation error with full details
124:        ZodErrorFormatter.logValidationError(error, context);
125:
126:        // Format user-friendly message
127:        const userMessage = ZodErrorFormatter.toUserMessage(error);
128:
129:        // Show dialog with formatted message
130:        showDialog({
131:            message: userMessage,
132:            messageType: 'error',
133:            dialogType: 'ok',
134:            title: 'Validation Error',
135:        });
136:    }
137:
138:    /**
139:     * Handle generic errors with fallback messaging
140:     * Use when error type is unknown or not network/validation related
141:     *
142:     * @param error - Any error object
143:     * @param showDialog - Function to display dialog (from useDialogStore)
144:     * @param context - Context string describing the operation
145:     * @param userMessage - Optional custom user-facing message
146:     */
147:    static handleGenericError(
148:        error: unknown,
149:        showDialog: ShowDialogFunction,
150:        context: string,
151:        userMessage?: string,
152:    ): void {


========== IMG_3597.md ==========
---
photo: IMG_3597.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 136-168 (sticky scroll shows line 62)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting. Sticky scroll header shows line 62 "export class ErrorHandlers {" pinned. Overlaps and cross-validates IMG_3596 for lines 136-152 (exact match). New content beyond IMG_3596: rest of handleGenericError body (153-168, closes the method). Explorer: error-handlers.ts selected in utils folder, same file listing as prior photos. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 4 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:22 PM 7/10/2026.
---
Sticky scroll (line 62):
62  export class ErrorHandlers {

136:    }
137:
138:    /**
139:     * Handle generic errors with fallback messaging
140:     * Use when error type is unknown or not network/validation related
141:     *
142:     * @param error - Any error object
143:     * @param showDialog - Function to display dialog (from useDialogStore)
144:     * @param context - Context string describing the operation
145:     * @param userMessage - Optional custom user-facing message
146:     */
147:    static handleGenericError(
148:        error: unknown,
149:        showDialog: ShowDialogFunction,
150:        context: string,
151:        userMessage?: string,
152:    ): void {
153:        const message =
154:            userMessage || 'An unexpected error occurred. Please try again or contact support.';
155:
156:        logger.error(`Generic error in ${context}`, error as Error, {
157:            context,
158:            errorType: 'generic',
159:        });
160:
161:        showDialog({
162:            message,
163:            messageType: 'error',
164:            dialogType: 'ok',
165:            title: 'Error',
166:        });
167:    }
168: }


========== IMG_3598.md ==========
---
photo: IMG_3598.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 168-197 (sticky scroll shows lines 62, 147)
orientation: 180
confidence: high
notes: Sticky scroll header shows line 62 "export class ErrorHandlers {" and line 147 "static handleGenericError(" pinned. Faint double-exposure ghost echo visible behind the bold text throughout (same content repeated a few lines lower/offset), but the bold/sharp layer aligned with the gutter numbers is clean and unambiguous; transcribed from that layer. Line 197 is cut off by the status bar at the bottom of the screen (closing ") {" not visible). Explorer: error-handlers.ts selected in utils folder, same file listing as prior photos. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 4 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:22 PM 7/10/2026. Photo was upside down; rotated 180 to read.
---
Sticky scroll (lines 62, 147):
62  export class ErrorHandlers {
147     static handleGenericError(

168:    }
169:    // ----------------------------------------
170:    // Private Helper Methods
171:    // ----------------------------------------
172:
173:    /**
174:     * Extract network error details from various error formats
175:     */
176:    private static extractNetworkErrorDetails(error: unknown): NetworkErrorDetails {
177:        const details: NetworkErrorDetails = {};
178:
179:        // Handle Axios errors
180:        if (this.isAxiosError(error)) {
181:            details.status = error.response?.status;
182:            details.statusText = error.response?.statusText;
183:            details.url = error.config?.url;
184:            details.method = error.config?.method?.toUpperCase();
185:        }
186:        // Handle Fetch API errors
187:        else if (error instanceof Response) {
188:            details.status = error.status;
189:            details.statusText = error.statusText;
190:            details.url = error.url;
191:        }
192:        // Handle generic errors with status
193:        else if (
194:            error &&
195:            typeof error === 'object' &&
196:            'status' in error &&
197:            typeof error.status === 'number' ⟪?⟫ (line cut off by status bar at bottom of screen)


========== IMG_3599.md ==========
---
photo: IMG_3599.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 168-197 (sticky scroll shows lines 62, 147)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting (near-duplicate framing of IMG_3598, same visible line range, but sharper here). Sticky scroll header shows line 62 "export class ErrorHandlers {" and line 147 "static handleGenericError(" pinned. Confirms IMG_3598's transcription exactly and additionally shows line 197 in full (not cut off by the status bar this time): "typeof error.status === 'number'". Explorer: error-handlers.ts selected in utils folder, same file listing as prior photos. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 4 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:22 PM 7/10/2026. Photo was upside down; rotated 180 to read.
---
Sticky scroll (lines 62, 147):
62  export class ErrorHandlers {
147     static handleGenericError(

168:    }
169:    // ----------------------------------------
170:    // Private Helper Methods
171:    // ----------------------------------------
172:
173:    /**
174:     * Extract network error details from various error formats
175:     */
176:    private static extractNetworkErrorDetails(error: unknown): NetworkErrorDetails {
177:        const details: NetworkErrorDetails = {};
178:
179:        // Handle Axios errors
180:        if (this.isAxiosError(error)) {
181:            details.status = error.response?.status;
182:            details.statusText = error.response?.statusText;
183:            details.url = error.config?.url;
184:            details.method = error.config?.method?.toUpperCase();
185:        }
186:        // Handle Fetch API errors
187:        else if (error instanceof Response) {
188:            details.status = error.status;
189:            details.statusText = error.statusText;
190:            details.url = error.url;
191:        }
192:        // Handle generic errors with status
193:        else if (
194:            error &&
195:            typeof error === 'object' &&
196:            'status' in error &&
197:            typeof error.status === 'number'


========== IMG_3600.md ==========
---
photo: IMG_3600.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 190-220 (sticky scroll shows lines 62, 176)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting. Sticky scroll header shows line 62 "export class ErrorHandlers {" and line 176 "private static extractNetworkErrorDetails(error: unknown): NetworkErrorDetails {" pinned. Cross-validates IMG_3598/3599 for lines 176-197. New content: rest of extractNetworkErrorDetails (198-203), JSDoc + start of formatNetworkErrorMessage (204-220). Line 221 (partial "return '...' ;" after "case 401:") is physically occluded by the Windows taskbar/status-bar overlay at the very bottom edge of the screen in the photo — only illegible fragments visible, not transcribed. Explorer: error-handlers.ts selected in utils folder, same file listing as prior photos. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 4 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:22 PM 7/10/2026. Photo was upside down; rotated 180 to read.
---
Sticky scroll (lines 62, 176):
62  export class ErrorHandlers {
176     private static extractNetworkErrorDetails(error: unknown): NetworkErrorDetails {

190:            details.url = error.url;
191:        }
192:        // Handle generic errors with status
193:        else if (
194:            error &&
195:            typeof error === 'object' &&
196:            'status' in error &&
197:            typeof error.status === 'number'
198:        ) {
199:            details.status = error.status;
200:        }
201:
202:        return details;
203:    }
204:
205:    /**
206:     * Format network error into user-friendly message
207:     */
208:    private static formatNetworkErrorMessage(details: NetworkErrorDetails): string {
209:        const { status, statusText } = details;
210:
211:        if (!status) {
212:            return 'Network connection failed. Please check your internet connection and try again.';
213:        }
214:
215:        // 4xx errors - client errors
216:        if (status >= 400 && status < 500) {
217:            switch (status) {
218:                case 400:
219:                    return 'Invalid request. Please check your input and try again.';
220:                case 401:
221:                    ⟪?⟫ (return statement occluded by taskbar overlay at bottom edge of photo, illegible)


========== IMG_3601.md ==========
---
photo: IMG_3601.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 203-233 (sticky scroll shows lines 62, 176)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting. Sticky scroll header shows line 62 "export class ErrorHandlers {" and line 176 "private static extractNetworkErrorDetails(error: unknown): NetworkErrorDetails {" pinned. Cross-validates and completes IMG_3600 (confirms lines 204-220 exactly, and fills in line 221 which was occluded by the taskbar in IMG_3600: "return 'Your session has expired. Please log in again.';"). New content: full switch/case block for 4xx status codes through the default case and closing braces (222-233). Line 234 barely visible at very top edge, cut off. Explorer: error-handlers.ts selected in utils folder, same file listing as prior photos. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 4 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:22 PM 7/10/2026. Photo was upside down; rotated 180 to read.
---
Sticky scroll (lines 62, 176):
62  export class ErrorHandlers {
176     private static extractNetworkErrorDetails(error: unknown): NetworkErrorDetails {

203:    }
204:
205:    /**
206:     * Format network error into user-friendly message
207:     */
208:    private static formatNetworkErrorMessage(details: NetworkErrorDetails): string {
209:        const { status, statusText } = details;
210:
211:        if (!status) {
212:            return 'Network connection failed. Please check your internet connection and try again.';
213:        }
214:
215:        // 4xx errors - client errors
216:        if (status >= 400 && status < 500) {
217:            switch (status) {
218:                case 400:
219:                    return 'Invalid request. Please check your input and try again.';
220:                case 401:
221:                    return 'Your session has expired. Please log in again.';
222:                case 403:
223:                    return 'You do not have permission to perform this action.';
224:                case 404:
225:                    return 'The requested resource was not found. Please contact support if this persists.';
226:                case 408:
227:                    return 'Request timeout. Please try again.';
228:                case 429:
229:                    return 'Too many requests. Please wait a moment and try again.';
230:                default:
231:                    return `Request failed: ${statusText || 'Client error'}. Please try again.`;
232:            }
233:        }


========== IMG_3602.md ==========
---
photo: IMG_3602.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 216-247 (sticky scroll shows lines 62, 208)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting. Sticky scroll header shows line 62 "export class ErrorHandlers {" and line 208 "private static formatNetworkErrorMessage(details: NetworkErrorDetails): string {" pinned. Cross-validates IMG_3601 exactly for lines 216-233. New content: 5xx server-error switch block (234-247), line 247 cut off mid-line by the status bar at the bottom of the screen. Explorer: error-handlers.ts selected in utils folder, same file listing as prior photos. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 4 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:22 PM 7/10/2026. Photo was upside down; rotated 180 to read.
---
Sticky scroll (lines 62, 208):
62  export class ErrorHandlers {
208     private static formatNetworkErrorMessage(details: NetworkErrorDetails): string {

216:        if (status >= 400 && status < 500) {
217:            switch (status) {
218:                case 400:
219:                    return 'Invalid request. Please check your input and try again.';
220:                case 401:
221:                    return 'Your session has expired. Please log in again.';
222:                case 403:
223:                    return 'You do not have permission to perform this action.';
224:                case 404:
225:                    return 'The requested resource was not found. Please contact support if this persists.';
226:                case 408:
227:                    return 'Request timeout. Please try again.';
228:                case 429:
229:                    return 'Too many requests. Please wait a moment and try again.';
230:                default:
231:                    return `Request failed: ${statusText || 'Client error'}. Please try again.`;
232:            }
233:        }
234:
235:        // 5xx errors - server errors
236:        if (status >= 500) {
237:            switch (status) {
238:                case 500:
239:                    return 'Server error occurred. Please try again or contact support if this persists.';
240:                case 502:
241:                    return 'Service temporarily unavailable. Please try again in a few moments.';
242:                case 503:
243:                    return 'Service is currently unavailable. Please try again later.';
244:                case 504:
245:                    return 'Request timeout. The server took too long to respond. Please try again.';
246:                default:
247:                    return `Server error: ${statusText || 'Unknown'}. Please try again or contact support.` ⟪?⟫ (line cut off by status bar at bottom of screen)


========== IMG_3603.md ==========
---
photo: IMG_3603.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 227-257 (sticky scroll shows lines 62, 208)
orientation: 180
confidence: high
notes: Clean/sharp capture, no ghosting. Sticky scroll header shows line 62 "export class ErrorHandlers {" and line 208 "private static formatNetworkErrorMessage(details: NetworkErrorDetails): string {" pinned. Cross-validates IMG_3602 exactly for lines 227-246, and confirms line 247 which was cut off in IMG_3602: "return \`Server error: ${statusText || 'Unknown'}. Please try again or contact support.\`;". New content: closing braces (248-249), "Other status codes" fallback return (250-253), and JSDoc start for the next private method (254-257), cut off at bottom of screen. Explorer: error-handlers.ts selected in utils folder, same file listing as prior photos. Status bar: aqs-web-ui, hitanshu/experimental*, No Solution, 4 errors/0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:22 PM 7/10/2026. Photo was upside down; rotated 180 to read.
---
Sticky scroll (lines 62, 208):
62  export class ErrorHandlers {
208     private static formatNetworkErrorMessage(details: NetworkErrorDetails): string {

227:                    return 'Request timeout. Please try again.';
228:                case 429:
229:                    return 'Too many requests. Please wait a moment and try again.';
230:                default:
231:                    return `Request failed: ${statusText || 'Client error'}. Please try again.`;
232:            }
233:        }
234:
235:        // 5xx errors - server errors
236:        if (status >= 500) {
237:            switch (status) {
238:                case 500:
239:                    return 'Server error occurred. Please try again or contact support if this persists.';
240:                case 502:
241:                    return 'Service temporarily unavailable. Please try again in a few moments.';
242:                case 503:
243:                    return 'Service is currently unavailable. Please try again later.';
244:                case 504:
245:                    return 'Request timeout. The server took too long to respond. Please try again.';
246:                default:
247:                    return `Server error: ${statusText || 'Unknown'}. Please try again or contact support.`;
248:            }
249:        }
250:
251:        // Other status codes
252:        return `Request failed with status ${status}. Please try again or contact support.`;
253:    }
254:
255:    /**
256:     * Determine message type based on error details
257:     */


========== IMG_3604.md ==========
---
photo: IMG_3604.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 251-281
orientation: 180
confidence: high
notes: Sticky scroll headers at top show enclosing scope, line 62 "export class ErrorHandlers {" and line 208 "private static formatNetworkErrorMessage(details: NetworkErrorDetails): string {". Explorer sidebar (aqs-web-ui > src > utils) lists many files: command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts (active, 2 problems), execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy..., normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts. Status bar: branch hitanshu/experimental*, 4 errors / 0 warnings, "No Solution". Tab bar shows only "error-handlers.ts 2" (2 problems in file). Photo was upside down; rotated 180 to read.
---
Sticky scroll (enclosing scope):
62   export class ErrorHandlers {
208    private static formatNetworkErrorMessage(details: NetworkErrorDetails): string {

251        // Other status codes
252        return `Request failed with status ${status}. Please try again or contact support.`;
253    }
254
255    /**
256     * Determine message type based on error details
257     */
258    private static getNetworkErrorType(details: NetworkErrorDetails): MessageType {
259        const { status } = details;
260
261        if (!status) {
262            return 'error';
263        }
264
265        // 401/403 are authentication/authorization issues
266        if (status === 401 || status === 403) {
267            return 'warning';
268        }
269
270        // 4xx are client errors (user can potentially fix)
271        if (status >= 400 && status < 500) {
272            return 'warning';
273        }
274
275        // 5xx are server errors
276        if (status >= 500) {
277            return 'error';
278        }
279
280        return 'error';
281    }


========== IMG_3605.md ==========
---
photo: IMG_3605.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 251-281
orientation: 180
confidence: high
notes: Duplicate/near-identical framing of IMG_3604 (same file, same visible line range). Sticky scroll headers: line 62 "export class ErrorHandlers {" and line 208 "private static formatNetworkErrorMessage(details: NetworkErrorDetails): string {". Explorer sidebar identical list of files under aqs-web-ui > src > utils (command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts active/2 problems, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy..., normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts). Status bar: branch hitanshu/experimental*, 4 errors/0 warnings, "No Solution". Photo was upside down; rotated 180 to read.
---
Sticky scroll (enclosing scope):
62   export class ErrorHandlers {
208    private static formatNetworkErrorMessage(details: NetworkErrorDetails): string {

251        // Other status codes
252        return `Request failed with status ${status}. Please try again or contact support.`;
253    }
254
255    /**
256     * Determine message type based on error details
257     */
258    private static getNetworkErrorType(details: NetworkErrorDetails): MessageType {
259        const { status } = details;
260
261        if (!status) {
262            return 'error';
263        }
264
265        // 401/403 are authentication/authorization issues
266        if (status === 401 || status === 403) {
267            return 'warning';
268        }
269
270        // 4xx are client errors (user can potentially fix)
271        if (status >= 400 && status < 500) {
272            return 'warning';
273        }
274
275        // 5xx are server errors
276        if (status >= 500) {
277            return 'error';
278        }
279
280        return 'error';
281    }


========== IMG_3607.md ==========
---
photo: IMG_3607.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 266-291
orientation: 180
confidence: high
notes: Sticky scroll headers show line 62 "export class ErrorHandlers {" and line 258 "private static getNetworkErrorType(details: NetworkErrorDetails): MessageType {". Explorer sidebar (aqs-web-ui > src > utils) visible files: apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts, dynamic-form-actions.ts, error-handlers.ts (active, 2 problems), execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts. Status bar: branch hitanshu/experimental*, 4 errors/0 warnings, "No Solution", timestamp 6:59 PM 7/10/2026. Photo was upside down; rotated 180 to read. Bottom of visible code cut off mid-line at 291.
---
Sticky scroll (enclosing scope):
62   export class ErrorHandlers {
258    private static getNetworkErrorType(details: NetworkErrorDetails): MessageType {

266        if (status === 401 || status === 403) {
267            return 'warning';
268        }
269
270        // 4xx are client errors (user can potentially fix)
271        if (status >= 400 && status < 500) {
272            return 'warning';
273        }
274
275        // 5xx are server errors
276        if (status >= 500) {
277            return 'error';
278        }
279
280        return 'error';
281    }
282
283    /**
284     * Type guard for Axios errors
285     */
286    private static isAxiosError(error: unknown): error is {
287        response?: { status: number; statusText: string };
288        config?: { url: string; method: string };
289    } {
290        return (
291            error !== null &&


========== IMG_3608.md ==========
---
photo: IMG_3608.JPG
type: vscode-code
file: aqs-web-ui/src/utils/error-handlers.ts
lines: 277-296
orientation: 180
confidence: medium
notes: Photo exhibits a motion-blur/double-exposure artifact — code and gutter line numbers appear as two overlapping offset copies (screen apparently mid-scroll when captured), making exact line alignment past ~296 unreliable. Content is a continuation/duplicate of IMG_3607 (same file, same isAxiosError function). Sticky scroll headers show line 62 "export class ErrorHandlers {" and line 258 "private static getNetworkErrorType(details: NetworkErrorDetails): MessageType {". Explorer sidebar same utils file list as IMG_3607 (error-handlers.ts active, 2 problems). Status bar: branch hitanshu/experimental*, 4 errors/0 warnings, "No Solution", 6:59 PM 7/10/2026. Photo was upside down; rotated 180 to read. Lines 277-291 cross-verified against clean IMG_3604/3605/3607 captures (high confidence); lines 292-296 read from the blurred frame (medium confidence); anything past line 296 is illegible ghosting, marked below.
---
Sticky scroll (enclosing scope):
62   export class ErrorHandlers {
258    private static getNetworkErrorType(details: NetworkErrorDetails): MessageType {

277        return 'error';
278    }
279
280        return 'error';
281    }
282
283    /**
284     * Type guard for Axios errors
285     */
286    private static isAxiosError(error: unknown): error is {
287        response?: { status: number; statusText: string };
288        config?: { url: string; method: string };
289    } {
290        return (
291            error !== null &&
292            typeof error === 'object' &&
293            'isAxiosError' in error &&
294            error.isAxiosError === true
295        );
296    }
⟪?⟫ (further lines obscured by double-exposure blur; possibly one more closing brace for the class body or a blank line, not legible)
