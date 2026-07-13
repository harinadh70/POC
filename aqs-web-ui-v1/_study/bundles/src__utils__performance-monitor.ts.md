# BUNDLE for src/utils/performance-monitor.ts
# 29 photo fragment(s), ascending start-line order.


========== IMG_4041.md ==========
---
photo: IMG_4041.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 1-27
orientation: 180
confidence: high
notes: Clean, sharp photo, no ghosting. Tab shows "performance-monitor.ts 1" (unsaved indicator "1" — likely 1 unsaved change count shown on the tab, tab title italic). Explorer sidebar src/utils file list: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, "normalize-service-config cop..." (normalize-service-config copy.ts), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts (selected, highlighted blue, shows "1" unsaved marker), permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", 3 errors / 0 warnings (up from 2 in prior photos), "No Solution", Ln 1 Col 1, TypeScript. Taskbar clock 7:30 PM 10-07-2026. This is a JSDoc file-header comment block.
---
1    /**
2     * Performance Monitor - Browser Performance API integration
3     *
4     * Features:
5     * - Start/end performance measurements
6     * - Integration with logger-builder for output
7     * - Automatic duration calculation
8     * - Performance.measure events for browser DevTools
9     * - Configurable log levels for different operations
10    * - Singleton pattern for global access
11    *
12    * @example
13    * ```tsx
14    * import { perfMonitor } from '@/utils/performance-monitor';
15    *
16    * // Measure function execution
17    * perfMonitor.start('api-call');
18    * await fetchData();
19    * perfMonitor.end('api-call', 'info');
20    *
21    * // Measure with custom context
22    * perfMonitor.start('render', { component: 'Dashboard' });
23    * // ... render logic
24    * perfMonitor.end('render', 'debug');
25    *
26    * // Get active measurements
27    * const active = perfMonitor.getActiveMeasurements();


========== IMG_4042.md ==========
---
photo: IMG_4042.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 4-30
orientation: 180
confidence: high
notes: Clean, sharp photo, no ghosting. Scrolled slightly further down from IMG_4041 (same file, same JSDoc header block), overlapping lines 4-27 and extending to new lines 28-30. Explorer sidebar src/utils file list: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, "normalize-service-config cop..." (normalize-service-config copy.ts), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts (shows "1" unsaved marker), performance-monitor.ts (selected, shows "1" unsaved marker), permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, TypeScript. Taskbar clock 7:30 PM 10-07-2026.
---
4     * Features:
5     * - Start/end performance measurements
6     * - Integration with logger-builder for output
7     * - Automatic duration calculation
8     * - Performance.measure events for browser DevTools
9     * - Configurable log levels for different operations
10    * - Singleton pattern for global access
11    *
12    * @example
13    * ```tsx
14    * import { perfMonitor } from '@/utils/performance-monitor';
15    *
16    * // Measure function execution
17    * perfMonitor.start('api-call');
18    * await fetchData();
19    * perfMonitor.end('api-call', 'info');
20    *
21    * // Measure with custom context
22    * perfMonitor.start('render', { component: 'Dashboard' });
23    * // ... render logic
24    * perfMonitor.end('render', 'debug');
25    *
26    * // Get active measurements
27    * const active = perfMonitor.getActiveMeasurements();
28    * console.log('Active measurements:', active);
29    * ```
30    */


========== IMG_4043.md ==========
---
photo: IMG_4043.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 19-46
orientation: 180
confidence: high
notes: Clean, sharp photo, no ghosting. Continues from IMG_4042 (overlaps lines 19-30 of the JSDoc header) and extends into new code lines 31-46. Line 46 is cut off at the bottom edge of the visible editor area (only "label: string;" partially visible, same as line 39's pattern for PerformanceMeasurement interface — recorded as legible). Explorer sidebar src/utils unchanged: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts (selected, "1" unsaved marker), permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, TypeScript. Taskbar clock 7:30 PM 10-07-2026.
---
19    * perfMonitor.end('api-call', 'info');
20    *
21    * // Measure with custom context
22    * perfMonitor.start('render', { component: 'Dashboard' });
23    * // ... render logic
24    * perfMonitor.end('render', 'debug');
25    *
26    * // Get active measurements
27    * const active = perfMonitor.getActiveMeasurements();
28    * console.log('Active measurements:', active);
29    * ```
30    */
31
32    import { LoggerBuilder, type LogLevelString } from '@/utils/logger-builder';
33
34    // ---------------------------------------------
35    // Types
36    // ---------------------------------------------
37
38    interface PerformanceEntry {
39        label: string;
40        startTime: number;
41        startMark: string;
42        context?: Record<string, unknown>;
43    }
44
45    interface PerformanceMeasurement {
46        label: string;


========== IMG_4044.md ==========
---
photo: IMG_4044.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 38-67
orientation: 180
confidence: medium
notes: Moderate double-image/ghosting artifact (same style as IMG_4039/4040 — faint duplicate text offset ~3 lines behind the crisp foreground), plus VS Code sticky-scroll pinning "interface PerformanceEntry {" (line 38) at top which hides lines 39-41 in this specific capture. Lines 38-46 overlap content already cleanly captured in IMG_4043 (used as cross-reference for the obscured lines 39-41 and 44, which are blank/hidden here); lines 47-67 are new content read from the crisp foreground layer with higher confidence. Explorer sidebar src/utils unchanged: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts (selected, "1" unsaved marker), permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, TypeScript. Taskbar clock 7:30 PM 10-07-2026.
---
38   interface PerformanceEntry {
39       label: string;
40       startTime: number;
41       startMark: string;
42       context?: Record<string, unknown>;
43   }
44
45   interface PerformanceMeasurement {
46       label: string;
47       duration: number;
48       startTime: number;
49       endTime: number;
50       context?: Record<string, unknown>;
51   }
52
53   interface PerformanceMonitorConfig {
54       enableBrowserMarks: boolean; // Use browser Performance API marks
55       enableLogging: boolean; // Enable console logging
56       defaultLogLevel: LogLevelString; // Default log level for measurements
57       warningThreshold: number; // Warn if operation exceeds this (ms)
58   }
59
60   // ---------------------------------------------
61   // Performance Monitor Implementation
62   // ---------------------------------------------
63
64   export class PerformanceMonitor {
65       private readonly config: PerformanceMonitorConfig;
66       private readonly logger = new LoggerBuilder()
67           .withContext({ module: 'PerformanceMonitor' })


========== IMG_4045.md ==========
---
photo: IMG_4045.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 45-72
orientation: 180
confidence: medium
notes: Moderate double-image/ghosting artifact (same recurring style as IMG_4039/4040/4044 — faint duplicate text offset ~3 lines behind the crisp foreground, from camera motion blur, not actual duplicate file content). Line 46 ("label: string;") is obscured by the ghost overlap in this capture; content cross-referenced from IMG_4043/IMG_4044 which captured it cleanly. Lines 45-62 overlap content already captured in IMG_4044 (used to validate line numbers via the sharp top-of-frame gutter digits, which read clearly here). Tail line numbers (67-72) were corrected after cross-referencing the cleaner IMG_4046/IMG_4047 photos of the same file: there is a blank line 71 between ".build();" (70) and "private activeEntries: Map<string, PerformanceEntry>;" (72) that this capture's ghosting made easy to miss; original OCR mis-numbered activeEntries as line 71. Explorer sidebar src/utils unchanged: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts (selected, "1" unsaved marker), permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:31 PM 10-07-2026, weather 26°C mostly cloudy.
---
45   interface PerformanceMeasurement {
46       label: string;
47       duration: number;
48       startTime: number;
49       endTime: number;
50       context?: Record<string, unknown>;
51   }
52
53   interface PerformanceMonitorConfig {
54       enableBrowserMarks: boolean; // Use browser Performance API marks
55       enableLogging: boolean; // Enable console logging
56       defaultLogLevel: LogLevelString; // Default log level for measurements
57       warningThreshold: number; // Warn if operation exceeds this (ms)
58   }
59
60   // ---------------------------------------------
61   // Performance Monitor Implementation
62   // ---------------------------------------------
63
64   export class PerformanceMonitor {
65       private readonly config: PerformanceMonitorConfig;
66       private readonly logger = new LoggerBuilder()
67           .withContext({ module: 'PerformanceMonitor' })
68           .withLevel('debug')
69           .enableTimestamps()
70           .build();
71
72       private activeEntries: Map<string, PerformanceEntry>;


========== IMG_4046.md ==========
---
photo: IMG_4046.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 62-88
orientation: 180
confidence: high
notes: Continues directly from IMG_4045 (overlaps lines 62-72). Same recurring faint double-image/ghosting artifact (offset ~3 lines behind the crisp foreground, from camera motion, not real duplicate content), but the crisp foreground gutter digits are clearly legible end-to-end here. Line numbers for lines 71-88 were corrected after cross-referencing the cleaner IMG_4047 photo of the same file (whose sticky-scroll headers pin "64 export class PerformanceMonitor {" and "76 constructor(...)" simultaneously, confirming an authoritative anchor): there is a blank line 71 between ".build();" (70) and "private activeEntries: Map<string, PerformanceEntry>;" (72) that was originally missed, shifting everything below it down by one. Line 88 ("// Check if browser Performance API is available") was cut off at the very bottom edge of this capture and cross-referenced from IMG_4047, which shows it cleanly. Explorer sidebar src/utils unchanged: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts (selected, "1" unsaved marker), permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:31 PM 10-07-2026, weather 26°C mostly cloudy.
---
62   // ---------------------------------------------
63
64   export class PerformanceMonitor {
65       private readonly config: PerformanceMonitorConfig;
66       private readonly logger = new LoggerBuilder()
67           .withContext({ module: 'PerformanceMonitor' })
68           .withLevel('debug')
69           .enableTimestamps()
70           .build();
71
72       private activeEntries: Map<string, PerformanceEntry>;
73       private completedMeasurements: PerformanceMeasurement[];
74       private readonly supportsPerformanceAPI: boolean;
75
76       constructor(config: Partial<PerformanceMonitorConfig> = {}) {
77           this.config = {
78               enableBrowserMarks: true,
79               enableLogging: true,
80               defaultLogLevel: 'debug',
81               warningThreshold: 1000, // 1 second
82               ...config,
83           };
84
85           this.activeEntries = new Map();
86           this.completedMeasurements = [];
87
88           // Check if browser Performance API is available


========== IMG_4047.md ==========
---
photo: IMG_4047.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 64-104
orientation: 180
confidence: high
notes: Clean capture with two VS Code sticky-scroll headers pinned at top simultaneously — "64 export class PerformanceMonitor {" and "76 constructor(config: Partial<PerformanceMonitorConfig> = {}) {" — which authoritatively confirms line numbering and was used to correct an off-by-one error found in IMG_4045/IMG_4046 (a blank line 71 that had been missed). Sticky headers cover/hide lines 77-78 (this.config = { / enableBrowserMarks: true,) which are cross-referenced from IMG_4046 instead. Faint ghost/double-image artifact present (same recurring style, offset ~3 lines, camera motion) but crisp foreground is legible throughout. Line 104 (JSDoc "@param label Unique label for this measurement") is cut off at the very bottom edge of the frame but legible. Explorer sidebar src/utils unchanged: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts (selected, "1" unsaved marker), permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:31 PM 10-07-2026, weather 26°C mostly cloudy.
---
64   export class PerformanceMonitor {                                    (sticky scroll header)
76       constructor(config: Partial<PerformanceMonitorConfig> = {}) {    (sticky scroll header)
77           this.config = {                                              (hidden behind sticky, cross-ref IMG_4046)
78               enableBrowserMarks: true,                                (hidden behind sticky, cross-ref IMG_4046)
79               enableLogging: true,
80               defaultLogLevel: 'debug',
81               warningThreshold: 1000, // 1 second
82               ...config,
83           };
84
85           this.activeEntries = new Map();
86           this.completedMeasurements = [];
87
88           // Check if browser Performance API is available
89           this.supportsPerformanceAPI =
90               typeof performance !== 'undefined' &&
91               typeof performance.mark === 'function' &&
92               typeof performance.measure === 'function';
93
94           if (this.config.enableLogging) {
95               this.logger.debug('PerformanceMonitor initialized', {
96                   browserAPI: this.supportsPerformanceAPI,
97                   warningThreshold: this.config.warningThreshold,
98               });
99           }
100      }
101
102      /**
103       * Start a performance measurement
104       * @param label Unique label for this measurement


========== IMG_4050.md ==========
---
photo: IMG_4050.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 64-135 (sticky headers 64,107; body visible 111-135; 108-110 partially recovered from ghosting, see notes)
orientation: 180
confidence: medium
notes: |
  Photo is a low-light multi-frame capture with visible motion/scroll-animation ghosting throughout
  the code pane (a fainter, slightly offset duplicate of the text is layered behind the sharp text,
  consistent with the editor's smooth-scroll animation being mid-transition when the shot was taken).
  Sticky-scroll headers pinned at top: line 64 "export class PerformanceMonitor {" and line 107
  "start(label: string, context?: Record<string, unknown>): void {". Lines 108-110 are not part of the
  settled/sharp frame (hidden under the sticky header) but are legible as the fainter ghost layer and
  are included below at lower confidence. Lines 111-135 are the sharp/settled frame, high confidence.
  Tab bar: single tab "performance-monitor.ts" (badge "1"). Breadcrumb: aqs-web-ui > src > utils >
  performance-monitor.ts > ...
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src > utils), all .ts, performance-monitor.ts selected/highlighted:
  form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts,
  menu-persistence.ts, normalize-service-config cop... (truncated, likely "copy"), normalize-service-config.ts,
  parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts,
  performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts
  Status bar: repo "aqs-web-ui", branch "hitanshu/experimental*" (dirty), Problems ⊗3 ⚠0, "No Solution",
  Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Window title "AQS_workspace (Workspace)".
---
64      export class PerformanceMonitor {
...
107         start(label: string, context?: Record<string, unknown>): void {
108             if (this.activeEntries.has(label)) {
109                 this.logger.warn('Measurement already started', { label });
110                 return;
111             }
112
113             const startMark = `${label}-start`;
114             const startTime = Date.now();
115
116             // Create browser performance mark
117             if (this.config.enableBrowserMarks && this.supportsPerformanceAPI) {
118                 try {
119                     performance.mark(startMark);
120                 } catch (error) {
121                     this.logger.error('Failed to create performance mark', error, { label });
122                 }
123             }
124
125             const entry: PerformanceEntry = {
126                 label,
127                 startTime,
128                 startMark,
129                 context,
130             };
131
132             this.activeEntries.set(label, entry);
133
134             if (this.config.enableLogging) {
135                 this.logger.debug('Performance measurement started', { label, context });


========== IMG_4051.md ==========
---
photo: IMG_4051.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 64-140 (sticky headers 64,107; body visible 116-140)
orientation: 180
confidence: high
notes: |
  Same file/session as IMG_4050 (aqs-web-ui/src/utils/performance-monitor.ts), scrolled a bit further
  down. Low-light multi-frame capture again shows a fainter, ~2-3-line-offset ghost duplicate of the
  text layered behind the sharp/settled text (editor smooth-scroll animation caught mid-transition).
  Sticky-scroll headers pinned at top: line 64 "export class PerformanceMonitor {" and line 107
  "start(label: string, context?: Record<string, unknown>): void {". Body resumes at line 116 (lines
  108-115 fully hidden under sticky headers this time, no peek-through). Transcribed content below is
  the sharp/settled layer only; cross-checked against IMG_4050 for the overlapping lines 116-135 and
  consistent. Confirms the start() method body closes at line 137 (two closing braces at 136 for the
  "if (enableLogging)" block and 137 for the method itself), followed by a blank line 138 and the start
  of a new JSDoc block at 139-140 "/** ... * End a performance measurement and log the result" (for the
  next method, presumably "end()", not yet visible).
  Tab bar: single tab "performance-monitor.ts" (badge "1"). Breadcrumb: aqs-web-ui > src > utils >
  performance-monitor.ts > ...
  Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src > utils) same file list as IMG_4050, all .ts,
  performance-monitor.ts selected/highlighted: form.ts, frame-router.ts, http-instance.ts,
  legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts,
  normalize-service-config cop... (truncated), normalize-service-config.ts, parse-combo-items.ts,
  parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts,
  performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts
  Status bar: repo "aqs-web-ui", branch "hitanshu/experimental*" (dirty), Problems ⊗3 ⚠0, "No Solution",
  Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Window title "AQS_workspace (Workspace)". Same taskbar
  clock (19:31, 10-07-2026) as IMG_4050 — photos taken seconds apart.
---
64      export class PerformanceMonitor {
...
107         start(label: string, context?: Record<string, unknown>): void {
...
116             // Create browser performance mark
117             if (this.config.enableBrowserMarks && this.supportsPerformanceAPI) {
118                 try {
119                     performance.mark(startMark);
120                 } catch (error) {
121                     this.logger.error('Failed to create performance mark', error, { label });
122                 }
123             }
124
125             const entry: PerformanceEntry = {
126                 label,
127                 startTime,
128                 startMark,
129                 context,
130             };
131
132             this.activeEntries.set(label, entry);
133
134             if (this.config.enableLogging) {
135                 this.logger.debug('Performance measurement started', { label, context });
136             }
137         }
138
139         /**
140          * End a performance measurement and log the result


========== IMG_4062.md ==========
---
photo: IMG_4062.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 64,243-269
orientation: 180
confidence: medium
notes: Photo has significant vertical motion-blur "ghosting" — every line appears with a faint duplicate/echo bleeding into the row below (looks like the editor was mid-scroll or camera shook during exposure). Sticky-scroll header shows line 64 "export class PerformanceMonitor {" pinned at top (divider line beneath it) while body is scrolled to 243-269. A JSDoc block for getMeasurementsByPattern is not fully captured in-frame — only faint/ghosted fragments "@param pattern String to match in label (case-insensitive)" are visible near lines 246-247, presumably bleed-through from a JSDoc comment scrolled just above line 243 (off-screen). Reconstructed line 244 ("const regex = new RegExp(pattern, 'i');") from faint ghost text since regex is referenced at line 245 and no other candidate line exists; treat 244 as medium confidence. Status bar: no Problems/warnings icons legible except "⊗3 △0", "No Solution", branch "hitanshu/experimental*", workspace "aqs-web-ui". Explorer shows utils folder open with: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts (selected/highlighted), permission-store.ts, pub-sub.ts, required-field-validation.ts. Breadcrumb: aqs-web-ui > src > utils > performance-monitor.ts. Only tab open is performance-monitor.ts (1 unsaved-dot indicator).
---
64      export class PerformanceMonitor {

243     getMeasurementsByPattern(pattern: string): PerformanceMeasurement[] {
244       const regex = new RegExp(pattern, 'i'); ⟪?⟫ (ghosted, low confidence — regex declaration inferred, exact text/comment uncertain)
245       return this.completedMeasurements.filter((m) => regex.test(m.label));
246     }
247     ⟪ghost text only, appears blank; faint bleed-through: "@param pattern String to match in label (case-insensitive)"⟫

248     /**
249      * Calculate average duration for measurements matching a label pattern
250      * @param pattern String to match in label
251      */
252     getAverageDuration(pattern: string): number | null {
253       const measurements = this.getMeasurementsByPattern(pattern);
254

255       if (measurements.length === 0) {
256         return null;
257       }
258

259       const total = measurements.reduce((sum, m) => sum + m.duration, 0);
260       return total / measurements.length;
261     }
262

263     /**
264      * Clear all completed measurements
265      */
266     clearHistory(): void {
267       const count = this.completedMeasurements.length;
268       this.completedMeasurements = [];
269     ⟪?⟫ (cut off at bottom edge of frame / status bar; likely closing brace and/or a logger call, not legible)


========== IMG_4063.md ==========
---
photo: IMG_4063.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 64,252-282
orientation: 180
confidence: high
notes: Same file/tab as IMG_4062, scrolled down further. Sticky-scroll shows line 64 "export class PerformanceMonitor {" pinned, then line 252 "getAverageDuration(pattern: string): number | null {" also pinned as a second sticky-scroll level, then scrollable body from ~258-282. Photo has the same vertical motion-blur ghosting as IMG_4062 (each line has a faint echo bled into the row below), but content this time is fully legible/unambiguous because it overlaps with lines already confirmed from IMG_4062 (259-268) plus new lines 269-282. Explorer/status bar identical to IMG_4062: branch "hitanshu/experimental*", "⊗3 △0", "No Solution", workspace aqs-web-ui, only tab open performance-monitor.ts.
---
64      export class PerformanceMonitor {

252     getAverageDuration(pattern: string): number | null {
...
258

259       const total = measurements.reduce((sum, m) => sum + m.duration, 0);
260       return total / measurements.length;
261     }
262

263     /**
264      * Clear all completed measurements
265      */
266     clearHistory(): void {
267       const count = this.completedMeasurements.length;
268       this.completedMeasurements = [];
269

270       if (this.config.enableLogging) {
271         this.logger.debug('Performance history cleared', { measurementsCleared: count });
272       }
273     }

274

275     /**
276      * Clear browser performance marks and measures
277      */
278     clearBrowserMarks(): void {
279       if (this.supportsPerformanceAPI) {
280         try {
281           performance.clearMarks();
282           performance.clearMeasures();


========== IMG_4064.md ==========
---
photo: IMG_4064.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 64,278-304
orientation: 180
confidence: medium
notes: Same file/tab, scrolled further down from IMG_4063 (sticky-scroll now pins line 64 class header and line 278 clearBrowserMarks header). Photo has heavy vertical motion-blur ghosting (worse than 4062/4063) — every line's text and gutter number has a faint duplicate bled in nearby, making some line-number-to-text alignment uncertain. Reconstructed lines 278-304 by cross-referencing bold/sharp text against brace-nesting logic (method > if > try/catch, 3 closing braces at 289-291) and the getSummary() return-type property list, which is internally consistent. Lines 296-304 (getSummary signature, return type shape and first 2 body lines) are corroborated by a comparatively sharp lower crop and are high confidence; lines 278-295 are medium confidence due to ghosting. Explorer/status bar same as prior photos: branch "hitanshu/experimental*", "⊗3 △0", "No Solution", only tab performance-monitor.ts.
---
64      export class PerformanceMonitor {

278     clearBrowserMarks(): void {
279       if (this.supportsPerformanceAPI) {
280         try {
281           performance.clearMarks();
282           performance.clearMeasures();
283

284           if (this.config.enableLogging) {
285             this.logger.debug('Browser performance marks cleared');
286           }
287         } catch (error) {
288           this.logger.error('Failed to clear browser performance marks', error);
289         }
290       }
291     }

292

293     /**
294      * Get summary statistics for all measurements
295      */
296     getSummary(): {
297       totalMeasurements: number;
298       activeMeasurements: number;
299       averageDuration: number;
300       slowest: PerformanceMeasurement | null;
301       fastest: PerformanceMeasurement | null;
302     } {
303       const measurements = this.completedMeasurements;
304       const total = measurements.length;


========== IMG_4065.md ==========
---
photo: IMG_4065.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 64,296-325
orientation: 180
confidence: medium
notes: Same tab/file as IMG_4063/4064, scrolled further down (sticky-scroll pins line 64 class header and line 296 getSummary() header). Photo has severe double-exposure-style ghosting — a fainter duplicate of the text from ~2 lines above bleeds down onto each line, worse than IMG_4064's blur (not just edge blur but whole coherent duplicate text stacked in). Lines 296-317 are legible with medium-high confidence by tracking the bold/sharp foreground glyphs and cross-referencing lines 296-304 against the already-transcribed IMG_4064 (exact match). Lines 318-325 (the slowest/fastest reduce block) are reconstructed at medium confidence: the sharp foreground text is corroborated by standard reduce-based min/max pattern, consistent paren/semicolon nesting (closing "); " at 321 and 324), and the trailing "); " visible alone at line 325 just above the taskbar occlusion, but exact identifier text there is less certain given the ghosting. Explorer sidebar (from top): form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy....ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts (highlighted/selected, badge "1"), permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", "⊗3 △0", "No Solution", single tab performance-monitor.ts open. Taskbar clock 7:31 PM 7/10/2026.
---
64      export class PerformanceMonitor {

296     getSummary(): {
297       totalMeasurements: number;
298       activeMeasurements: number;
299       averageDuration: number;
300       slowest: PerformanceMeasurement | null;
301       fastest: PerformanceMeasurement | null;
302     } {
303       const measurements = this.completedMeasurements;
304       const total = measurements.length;
305

306       if (total === 0) {
307         return {
308           totalMeasurements: 0,
309           activeMeasurements: this.activeEntries.size,
310           averageDuration: 0,
311           slowest: null,
312           fastest: null,
313         };
314       }
315

316       const durations = measurements.map((m) => m.duration);
317       const avgDuration = durations.reduce((sum, d) => sum + d, 0) / total;
318

319       const slowest = measurements.reduce((prev, curr) =>
320         curr.duration > prev.duration ? curr : prev,
321       );
322       const fastest = measurements.reduce((prev, curr) =>
323         curr.duration < prev.duration ? curr : prev,
324       );
325       ⟪?⟫


========== IMG_4066.md ==========
---
photo: IMG_4066.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 64,296,306-328
orientation: 180
confidence: medium
notes: Same tab/file as IMG_4063-4065, scrolled slightly further than IMG_4065 (sticky-scroll still pins line 64 class header and line 296 getSummary() header). Photo again shows the double-exposure-style ghosting (fainter duplicate text/gutter numbers bleeding in from nearby lines, apparently mid-scroll-animation blur) seen in IMG_4064/4065. Resolved the gutter-number ambiguity around lines 313-317 by cross-checking against the already-established (from IMG_4064/4065) content of lines 306-314, which pins the "const durations = measurements.map(...)" / "const avgDuration = ..." pair unambiguously to 316-317 (the alternate reading of 313-314 is impossible since those lines are already known to be "};" / "}"). Lines 306-317 high confidence (corroborated across three photos now); lines 318-328 medium confidence, reconstructed from sharp/bold foreground glyphs plus consistent 3-line reduce-block structure (mirrors the slowest-block pattern) and brace/paren nesting; this reconstruction matches IMG_4065's independent (lower-confidence) reading of the same 318-324 span. Sidebar/status bar unchanged from prior photos in this sequence: Explorer showing utils folder (form.ts ... required-field-validation.ts, performance-monitor.ts highlighted), branch "hitanshu/experimental*", "⊗3 △0", "No Solution", single tab open. Taskbar clock 7:31 PM 7/10/2026.
---
64      export class PerformanceMonitor {

296     getSummary(): {

306       if (total === 0) {
307         return {
308           totalMeasurements: 0,
309           activeMeasurements: this.activeEntries.size,
310           averageDuration: 0,
311           slowest: null,
312           fastest: null,
313         };
314       }
315

316       const durations = measurements.map((m) => m.duration);
317       const avgDuration = durations.reduce((sum, d) => sum + d, 0) / total;
318

319       const slowest = measurements.reduce((prev, curr) =>
320         curr.duration > prev.duration ? curr : prev,
321       );
322       const fastest = measurements.reduce((prev, curr) =>
323         curr.duration < prev.duration ? curr : prev,
324       );
325       return {
326         totalMeasurements: total,
327         activeMeasurements: this.activeEntries.size,
328         averageDuration: Math.round(avgDuration * 100) / 100,


========== IMG_4067.md ==========
---
photo: IMG_4067.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 64,296,314-345
orientation: 180
confidence: low
notes: Same tab/file as IMG_4063-4066, scrolled slightly further (sticky-scroll still pins line 64 class header and line 296 getSummary() header). Worst ghosting yet in this sequence — every row shows a second, dimmer, coherent duplicate of text from a nearby row (consistent with mid-scroll-animation double exposure), and the vertical offset between the two overlaid copies is NOT constant across this photo the way it was in IMG_4065/66, which makes exact line-number attribution genuinely ambiguous in the 318-326 span. High confidence: lines 306-317 (cross-referenced/consistent with IMG_4064-4066, unchanged here) and lines 327-345 (read from two clean, low-ghost crops where sharp gutter digits and sharp text align unambiguously: "327 return {" through "336 /**", and "336 /**" through "345 labels.forEach(...)"). Low confidence / gap: lines 318-326 — the slowest/fastest reduce blocks are clearly present in content (verified: "const slowest = measurements.reduce((prev, curr) =>", "curr.duration > prev.duration ? curr : prev,", ");", "const fastest = measurements.reduce((prev, curr) =>", "curr.duration < prev.duration ? curr : prev,", ");") but repeated attempts to pin them to specific line numbers produced inconsistent results (once suggesting fastest-declare at 322, another read suggesting 324-325); the two solid anchors (317 avgDuration, 327 return{) leave a 9-line gap for what structurally looks like an 7-8 line block (blank + slowest×3 + fastest×3 [+ possibly 1 extra blank/line unaccounted for]), so lines 325-326 are marked unknown rather than guessed. NOTE FOR RECONCILIATION: this numbering places "return {" at 327, ~2 lines later than the number implied by IMG_4065/IMG_4066's own (lower-confidence) reconstructions of the same slowest/fastest block (which had return{ at 325) — the two photos' reconstructions of lines 318-326 disagree by ~2 and neither could be fully verified against the other; content wording is consistent either way, only line numbers are in question. Explorer sidebar/status bar unchanged: utils folder listing (form.ts ... required-field-validation.ts, performance-monitor.ts highlighted), branch "hitanshu/experimental*", "⊗3 △0", "No Solution". Taskbar clock 7:31 PM 7/10/2026.
---
64      export class PerformanceMonitor {

296     getSummary(): {

314       }
315

316       const durations = measurements.map((m) => m.duration);
317       const avgDuration = durations.reduce((sum, d) => sum + d, 0) / total;
318

319       const slowest = measurements.reduce((prev, curr) =>
320         curr.duration > prev.duration ? curr : prev,
321       );
322       const fastest = measurements.reduce((prev, curr) =>
323         curr.duration < prev.duration ? curr : prev,
324       );
325       ⟪?⟫
326       ⟪?⟫
327       return {
328         totalMeasurements: total,
329         activeMeasurements: this.activeEntries.size,
330         averageDuration: Math.round(avgDuration * 100) / 100,
331         slowest,
332         fastest,
333       };
334     }

335

336     /**
337      * Force end all active measurements (cleanup utility)
338      */
339     endAll(logLevel?: LogLevelString): void {
340       const labels = Array.from(this.activeEntries.keys());
341

342       if (labels.length > 0 && this.config.enableLogging) {
343         this.logger.warn('Force ending all active measurements', { count: labels.length });
344       }
345       labels.forEach((label) => this.end(label, logLevel));


========== IMG_4068.md ==========
---
photo: IMG_4068.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 64,339,342-367
orientation: 180
confidence: high
notes: Same tab/file as prior photos in sequence, scrolled to near the end of the file (sticky-scroll now pins line 64 class header and line 339 endAll() header). Much less ghosting than IMG_4065-4067 — mostly clean sharp text, only line 342 (the sticky-scroll boundary row, partially overlapped by the endAll sticky header) is a bit occluded but content matches what was already read in IMG_4067 ("if (labels.length > 0 && this.config.enableLogging) {"). Line 367 cut off at the very bottom edge by the status bar (just "//" divider visible, content not shown). This photo lands right after "}" closes the class (line 348), then module-level singleton export section. Explorer sidebar/status bar unchanged: utils folder listing (form.ts ... required-field-validation.ts, performance-monitor.ts highlighted), branch "hitanshu/experimental*", "⊗3 △0", "No Solution". Taskbar clock 7:31 PM 7/10/2026.
---
64      export class PerformanceMonitor {

339     endAll(logLevel?: LogLevelString): void {

342         if (labels.length > 0 && this.config.enableLogging) {
343           this.logger.warn('Force ending all active measurements', { count: labels.length });
344         }
345

346         labels.forEach((label) => this.end(label, logLevel));
347       }
348     }
349

350     // ----------------------------------------
351     // Singleton Instance
352     // ----------------------------------------
353

354     /**
355      * Global performance monitor instance
356      * Use this singleton for consistent performance tracking across the application
357      */
358     export const perfMonitor = new PerformanceMonitor({
359       enableBrowserMarks: true,
360       enableLogging: import.meta.env.DEV, // Enable logging in dev mode only
361       defaultLogLevel: 'debug',
362       warningThreshold: 1000, // Warn if operation takes more than 1 second
363     });
364

365     // ----------------------------------------
366     // Exports
367     // ⟪?⟫


========== IMG_4048.md ==========
---
photo: IMG_4048.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 76-109
orientation: 180
confidence: medium
notes: Heavy triple-image ghosting/motion blur in the upper two-thirds of the frame (lines 76-99), much worse than the recurring ~3-line-offset ghost seen in other photos of this file — appears to be 2-3 overlapping exposures. That portion (76-99) duplicates content already cleanly captured in IMG_4047 and is not re-transcribed verbatim here beyond confirming it matches (this.activeEntries/completedMeasurements/supportsPerformanceAPI init, browser-API feature detection, enableLogging debug block). New content starts at line 100 and the bottom of the frame (100-109) is much less ghosted and legible with higher confidence: the closing brace of the constructor, a JSDoc block for a "start" method, and the beginning of its implementation. Line 109's tail ("{ label });") is reconstructed from an overlapping/bled fragment near the very bottom edge of the viewport (right where the status bar begins) rather than cleanly read in-line — marked lower confidence for that fragment specifically. Sticky-scroll headers pinned: "64 export class PerformanceMonitor {" and "76 constructor(config: Partial<PerformanceMonitorConfig> = {}) {" (same as IMG_4047). Explorer sidebar src/utils unchanged: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts (selected, "1" unsaved marker), permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:31 PM 10-07-2026, weather 26°C mostly cloudy.
---
64   export class PerformanceMonitor {                                    (sticky scroll header)
76       constructor(config: Partial<PerformanceMonitorConfig> = {}) {    (sticky scroll header)
[77-99: heavily ghosted re-capture of content already transcribed cleanly in IMG_4047 — this.config assignment, this.activeEntries/completedMeasurements init, "// Check if browser Performance API is available" + this.supportsPerformanceAPI feature-detect block, if (this.config.enableLogging) { this.logger.debug(...) } block, closing braces]
100      }
101
102      /**
103       * Start a performance measurement
104       * @param label Unique label for this measurement
105       * @param context Optional context data
106       */
107      start(label: string, context?: Record<string, unknown>): void {
108          if (this.activeEntries.has(label)) {
109              this.logger.warn('Measurement already started', { label });


========== IMG_4049.md ==========
---
photo: IMG_4049.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 94-117
orientation: 180
confidence: high
notes: Continues directly from IMG_4048. Lines 92-99 re-show (with the recurring faint ~3-line-offset ghost artifact) content already captured cleanly in IMG_4047/IMG_4048 (the enableLogging/logger.debug initialization block) — only lines 94-99 shown here for continuity, not fully re-verified. New content from line 100 onward is clean and legible with high confidence, including the full "start(label, context)" method signature and body through the beginning of an "if (enableBrowserMarks && supportsPerformanceAPI)" block at line 117, which is cut off at the bottom edge of the frame (opening brace inferred from consistent brace-per-line style used throughout this file; body not visible). Sticky-scroll headers pinned: "64 export class PerformanceMonitor {" and "76 constructor(config: Partial<PerformanceMonitorConfig> = {}) {". Left activity bar shows the Search view active (badge "27") instead of Explorer's usual icon state, but the Explorer side panel itself is still showing the file tree as in prior photos; src/utils unchanged: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts (selected, "1" unsaved marker), permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", 3 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:31 PM 10-07-2026, weather 26°C mostly cloudy.
---
64   export class PerformanceMonitor {                                    (sticky scroll header)
76       constructor(config: Partial<PerformanceMonitorConfig> = {}) {    (sticky scroll header)
94           if (this.config.enableLogging) {
95               this.logger.debug('PerformanceMonitor initialized', {
96                   browserAPI: this.supportsPerformanceAPI,
97                   warningThreshold: this.config.warningThreshold,
98               });
99           }
100      }
101
102      /**
103       * Start a performance measurement
104       * @param label Unique label for this measurement
105       * @param context Optional context data
106       */
107      start(label: string, context?: Record<string, unknown>): void {
108          if (this.activeEntries.has(label)) {
109              this.logger.warn('Measurement already started', { label });
110              return;
111          }
112
113          const startMark = `${label}-start`;
114          const startTime = Date.now();
115
116          // Create browser performance mark
117          if (this.config.enableBrowserMarks && this.supportsPerformanceAPI) {


========== IMG_4052.md ==========
---
photo: IMG_4052.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 137-161
orientation: 180
confidence: high
notes: Sticky-scroll headers at top show enclosing scope - line 64 "export class PerformanceMonitor {" and line 107 "start(label: string, context?: Record<string, unknown>): void {". Editor shows faint ghosted duplicate of the same lines slightly offset beneath the sharp text (camera motion/exposure artifact), not real duplicate code - ignored. Explorer sidebar (src/utils) shows: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy....ts (truncated name), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts (selected/highlighted), permission-store.ts, pub-sub.ts, required-field-validation.ts. Tab bar shows only performance-monitor.ts open (with a "1" problem badge). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, "No Solution", 3 errors / 0 warnings, branch hitanshu/experimental*, workspace aqs-web-ui.
---

64: export class PerformanceMonitor {
107:    start(label: string, context?: Record<string, unknown>): void {
137: }
138:
139: /**
140:  * End a performance measurement and log the result
141:  * @param label Label of the measurement to end
142:  * @param logLevel Log level for output (default: config.defaultLogLevel)
143:  */
144: end(label: string, logLevel?: LogLevelString): void {
145:     const entry = this.activeEntries.get(label);
146:
147:     if (!entry) {
148:         this.logger.warn('Measurement not found or already ended', { label });
149:         return;
150:     }
151:
152:     const endMark = `${label}-end`;
153:     const endTime = Date.now();
154:     const duration = endTime - entry.startTime;
155:
156:     // Create browser performance mark and measure
157:     if (this.config.enableBrowserMarks && this.supportsPerformanceAPI) {
158:         try {
159:             performance.mark(endMark);
160:             performance.measure(label, entry.startMark, endMark);
161:         } catch (error) {


========== IMG_4053.md ==========
---
photo: IMG_4053.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 142-167
orientation: 180
confidence: medium
notes: Photo captured mid-scroll-animation - a ghosted duplicate of nearby lines is superimposed slightly offset over the sharp text (VS Code smooth-scroll blur), not real duplicate code. Transcription below follows the sharp/aligned text keyed to the gutter line numbers. This is a continuation of the same file/scroll position as IMG_4052 (performance-monitor.ts), now scrolled to show lines up to 167. Sticky-scroll header at top: line 64 "export class PerformanceMonitor {". Explorer sidebar (src/utils) same file list as IMG_4052; performance-monitor.ts selected/highlighted. Tab bar: only performance-monitor.ts open (1 problem badge). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, "No Solution", 3 errors / 0 warnings, branch hitanshu/experimental*, workspace aqs-web-ui.
---

64: export class PerformanceMonitor {
142:  * @param logLevel Log level for output (default: config.defaultLogLevel)
143:  */
144: end(label: string, logLevel?: LogLevelString): void {
145:     const entry = this.activeEntries.get(label);
146:
147:     if (!entry) {
148:         this.logger.warn('Measurement not found or already ended', { label });
149:         return;
150:     }
151:
152:     const endMark = `${label}-end`;
153:     const endTime = Date.now();
154:     const duration = endTime - entry.startTime;
155:
156:     // Create browser performance mark and measure
157:     if (this.config.enableBrowserMarks && this.supportsPerformanceAPI) {
158:         try {
159:             performance.mark(endMark);
160:             performance.measure(label, entry.startMark, endMark);
161:         } catch (error) {
162:             this.logger.error('Failed to create performance measure', error, { label });
163:         }
164:     }
165:
166:     // Store completed measurement
167:     const measurement: PerformanceMeasurement = {


========== IMG_4054.md ==========
---
photo: IMG_4054.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 144-172
orientation: 180
confidence: medium
notes: Same as IMG_4053, photo captured mid-scroll-animation - two overlapping scroll positions of the editor are superimposed (bold/sharp text vs. fainter ghost text offset a few lines above/below). Transcription follows the sharp text aligned to its gutter line numbers. Continues the same performance-monitor.ts view as IMG_4052/4053, now scrolled further to show the `measurement` object literal being built (lines 166-172). Below line 172 a closing `};` and a `this.<something>.push(measurement);` call are visible but too overlapped/cut off by the taskbar to transcribe reliably - marked illegible. Sticky-scroll header at top: line 64 "export class PerformanceMonitor {". Explorer sidebar (src/utils) same file list as prior photos; performance-monitor.ts selected/highlighted (1 problem badge). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, "No Solution", 3 errors / 0 warnings, branch hitanshu/experimental*, workspace aqs-web-ui.
---

64: export class PerformanceMonitor {
144: end(label: string, logLevel?: LogLevelString): void {
152:     const endMark = `${label}-end`;
153:     const endTime = Date.now();
154:     const duration = endTime - entry.startTime;
156:     // Create browser performance mark and measure
157:     if (this.config.enableBrowserMarks && this.supportsPerformanceAPI) {
158:         try {
159:             performance.mark(endMark);
160:             performance.measure(label, entry.startMark, endMark);
161:         } catch (error) {
162:             this.logger.error('Failed to create performance measure', error, { label });
163:         }
164:     }
165: }
166:     // Store completed measurement
167:     const measurement: PerformanceMeasurement = {
168:         label,
169:         duration,
170:         startTime: entry.startTime,
171:         endTime,
172:         context: entry.context,
173: ⟪?⟫ (partially visible "};" then a "this.⟪?⟫.push(measurement);" line, obscured by scroll-ghosting and taskbar - not reliably legible)


========== IMG_4055.md ==========
---
photo: IMG_4055.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 144-183
orientation: 180
confidence: medium
notes: Photo has a small (~3-line) double-exposure/camera-jitter ghost overlapping the sharp text throughout, worse in the upper half (lines ~158-176) than the lower half (~177-183, which is clean). Line-number gutter itself is legible and sequential (158-183) even where code glyphs overlap; content for lines 158-173 is reconstructed from the sharp/bold glyphs cross-checked against the unambiguous structure already established in IMG_4052/4053/4054 for this same try/catch + measurement-object block. Lines 174-183 are new content not seen in prior photos of this file (push/delete calls and start of the "Log the result" block). Sticky-scroll headers at top: line 64 "export class PerformanceMonitor {" and line 144 "end(label: string, logLevel?: LogLevelString): void {". Explorer sidebar (src/utils) same file list as prior photos; performance-monitor.ts selected/highlighted (1 problem badge). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, "No Solution", 3 errors / 0 warnings, branch hitanshu/experimental*, workspace aqs-web-ui.
---

64: export class PerformanceMonitor {
144: end(label: string, logLevel?: LogLevelString): void {
158:         try {
159:             performance.mark(endMark);
160:             performance.measure(label, entry.startMark, endMark);
161:         } catch (error) {
162:             this.logger.error('Failed to create performance measure', error, { label });
163:         }
164:     }
165:
166:     // Store completed measurement
167:     const measurement: PerformanceMeasurement = {
168:         label,
169:         duration,
170:         startTime: entry.startTime,
171:         endTime,
172:         context: entry.context,
173:     };
174:
175:     this.completedMeasurements.push(measurement);
176:     this.activeEntries.delete(label);
177:
178:     // Log the result
179:     if (this.config.enableLogging) {
180:         const effectiveLogLevel = logLevel ?? this.config.defaultLogLevel;
181:         const logData = {
182:             label,
183:             duration: `${duration}ms`,


========== IMG_4056.md ==========
---
photo: IMG_4056.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 174-198
orientation: 180
confidence: medium
notes: Same small (~2-3 line) double-exposure/jitter ghosting as IMG_4055 throughout the visible code (line-number gutter is legible/sequential; code glyphs have a faint offset duplicate bleeding through). Overlaps with IMG_4055 for lines 174-183 (cross-checked, consistent). New content confidently added here: lines 184-198 (spread of entry.context into logData, the duration-exceeds-warningThreshold branch, and the closing braces of end()). Sticky-scroll headers at top: line 64 "export class PerformanceMonitor {" and line 144 "end(label: string, logLevel?: LogLevelString): void {". Explorer sidebar (src/utils) same file list as prior photos; performance-monitor.ts selected/highlighted (1 problem badge). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, "No Solution", 3 errors / 0 warnings, branch hitanshu/experimental*, workspace aqs-web-ui.
---

64: export class PerformanceMonitor {
144: end(label: string, logLevel?: LogLevelString): void {
175:     this.completedMeasurements.push(measurement);
176:     this.activeEntries.delete(label);
177:
178:     // Log the result
179:     if (this.config.enableLogging) {
180:         const effectiveLogLevel = logLevel ?? this.config.defaultLogLevel;
181:         const logData = {
182:             label,
183:             duration: `${duration}ms`,
184:             ...entry.context,
185:         };
186:
187:         // Warn if duration exceeds threshold
188:         if (duration > this.config.warningThreshold) {
189:             this.logger.warn(`Performance threshold exceeded: ${label}`, {
190:                 ...logData,
191:                 threshold: this.config.warningThreshold,
192:                 exceeded: duration - this.config.warningThreshold,
193:             });
194:         } else {
195:             this.logger.log(effectiveLogLevel, `Performance: ${label}`, logData);
196:         }
197:     }
198: }


========== IMG_4057.md ==========
---
photo: IMG_4057.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 187-211
orientation: 180
confidence: medium
notes: Same small double-exposure/jitter ghosting as IMG_4055/4056 (line-number gutter legible/sequential; code glyphs have a faint offset duplicate bleeding through, worst around 187-198 which overlaps/confirms IMG_4056; lines 199-211 are sharp/clean with minimal ghosting). New content: JSDoc block for a "measure" method and the start of its signature: `async measure<T>(label: string, fn: () => T | Promise<T>, logLevel?: LogLevelString): Promise<T> {`. Sticky-scroll headers at top: line 64 "export class PerformanceMonitor {" and line 144 "end(label: string, logLevel?: LogLevelString): void {". Explorer sidebar (src/utils) same file list as prior photos; performance-monitor.ts selected/highlighted (1 problem badge). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, "No Solution", 3 errors / 0 warnings, branch hitanshu/experimental*, workspace aqs-web-ui.
---

64: export class PerformanceMonitor {
144: end(label: string, logLevel?: LogLevelString): void {
187:         // Warn if duration exceeds threshold
188:         if (duration > this.config.warningThreshold) {
189:             this.logger.warn(`Performance threshold exceeded: ${label}`, {
190:                 ...logData,
191:                 threshold: this.config.warningThreshold,
192:                 exceeded: duration - this.config.warningThreshold,
193:             });
194:         } else {
195:             this.logger.log(effectiveLogLevel, `Performance: ${label}`, logData);
196:         }
197:     }
198: }
199:
200: /**
201:  * Measure the execution time of a function
202:  * @param label Label for the measurement
203:  * @param fn Function to measure
204:  * @param logLevel Log level for output
205:  * @returns Result of the function
206:  */
207: async measure<T>(
208:     label: string,
209:     fn: () => T | Promise<T>,
210:     logLevel?: LogLevelString,
211: ): Promise<T> {


========== IMG_4058.md ==========
---
photo: IMG_4058.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 195-219
orientation: 180
confidence: medium
notes: Same small double-exposure/jitter ghosting as prior photos of this file (gutter legible/sequential; code glyphs have a faint offset duplicate bleeding through, worst around 195-200). Lines 195-211 overlap/confirm IMG_4056 and IMG_4057 (used the cross-validated reading from those two photos for 195-206 since this photo's overlap in that band was more ambiguous). New content: body of the `measure<T>()` method - start/try/await fn()/end/return, and a catch branch that ends the measurement with an 'error' logLevel and rethrows. A further ghost fragment "} catch (error) {" is visible right at the bottom edge past line 219 but is too overlapped/cut off by the taskbar to transcribe reliably. Sticky-scroll headers at top: line 64 "export class PerformanceMonitor {" and line 144 "end(label: string, logLevel?: LogLevelString): void {". Explorer sidebar (src/utils) same file list as prior photos; performance-monitor.ts selected/highlighted (1 problem badge). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, "No Solution", 3 errors / 0 warnings, branch hitanshu/experimental*, workspace aqs-web-ui.
---

64: export class PerformanceMonitor {
144: end(label: string, logLevel?: LogLevelString): void {
195:             this.logger.log(effectiveLogLevel, `Performance: ${label}`, logData);
196:         }
197:     }
198: }
199:
200: /**
201:  * Measure the execution time of a function
202:  * @param label Label for the measurement
203:  * @param fn Function to measure
204:  * @param logLevel Log level for output
205:  * @returns Result of the function
206:  */
207: async measure<T>(
208:     label: string,
209:     fn: () => T | Promise<T>,
210:     logLevel?: LogLevelString,
211: ): Promise<T> {
212:     this.start(label);
213:     try {
214:         const result = await fn();
215:         this.end(label, logLevel);
216:         return result;
217:     } catch (error) {
218:         this.end(label, 'error');
219:         throw error;


========== IMG_4059.md ==========
---
photo: IMG_4059.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 207-238
orientation: 180
confidence: high
notes: Minor jitter ghosting near the very top (lines ~213-220, where a faint offset duplicate of the same try/catch block bleeds through) but content there cross-checks exactly against IMG_4058. Lines 220-238 are sharp and unambiguous: closes measure<T>(), then getActiveMeasurements() and getCompletedMeasurements(limit?) methods with JSDoc. Sticky-scroll headers at top: line 64 "export class PerformanceMonitor {" and line 207 "async measure<T>(". Explorer sidebar (src/utils) same file list as prior photos; performance-monitor.ts open/selected in the tab bar (1 problem badge); note the "1" badge in the sidebar row appears to sit next to performance-benchmarks.ts in this shot, though performance-monitor.ts is still the highlighted/active file - likely just an alignment artifact of the photo. Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, "No Solution", 3 errors / 0 warnings, branch hitanshu/experimental*, workspace aqs-web-ui.
---

64: export class PerformanceMonitor {
207: async measure<T>(
214:         const result = await fn();
215:         this.end(label, logLevel);
216:         return result;
217:     } catch (error) {
218:         this.end(label, 'error');
219:         throw error;
220:     }
221: }
222:
223: /**
224:  * Get all active (not yet ended) measurements
225:  */
226: getActiveMeasurements(): string[] {
227:     return Array.from(this.activeEntries.keys());
228: }
229:
230: /**
231:  * Get completed measurements
232:  * @param limit Maximum number of measurements to return (most recent first)
233:  */
234: getCompletedMeasurements(limit?: number): PerformanceMeasurement[] {
235:     const measurements = [...this.completedMeasurements].reverse();
236:     return limit ? measurements.slice(0, limit) : measurements;
237: }
238: ⟪?⟫ (cut off at bottom edge of frame)


========== IMG_4060.md ==========
---
photo: IMG_4060.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 223-248
orientation: 180
confidence: high
notes: Minor jitter ghosting (faint offset duplicate a few lines below the sharp text) but content is unambiguous throughout. Continues from IMG_4059 (getActiveMeasurements, getCompletedMeasurements - matches exactly) and adds new method getMeasurementsByPattern(pattern). Sticky-scroll header at top: line 64 "export class PerformanceMonitor {" (only one header shown this time - "measure<T>(" header from IMG_4059 has scrolled out except a faint sliver at the very top edge). Left edge of the VS Code window/File menu is slightly cropped out of frame (photo framing, not app state). Explorer sidebar (src/utils) same file list as prior photos; performance-monitor.ts selected/highlighted (1 problem badge). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, "No Solution", 3 errors / 0 warnings, branch hitanshu/experimental*, workspace aqs-web-ui.
---

64: export class PerformanceMonitor {
224:  * Get all active (not yet ended) measurements
225:  */
226: getActiveMeasurements(): string[] {
227:     return Array.from(this.activeEntries.keys());
228: }
229:
230: /**
231:  * Get completed measurements
232:  * @param limit Maximum number of measurements to return (most recent first)
233:  */
234: getCompletedMeasurements(limit?: number): PerformanceMeasurement[] {
235:     const measurements = [...this.completedMeasurements].reverse();
236:     return limit ? measurements.slice(0, limit) : measurements;
237: }
238:
239: /**
240:  * Get measurements by label pattern
241:  * @param pattern String to match in label (case-insensitive)
242:  */
243: getMeasurementsByPattern(pattern: string): PerformanceMeasurement[] {
244:     const regex = new RegExp(pattern, 'i');
245:     return this.completedMeasurements.filter((m) => regex.test(m.label));
246: }
247:
248: ⟪?⟫ (cut off at bottom edge, start of next JSDoc block "/**")


========== IMG_4061.md ==========
---
photo: IMG_4061.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 231-256
orientation: 180
confidence: high
notes: Minor jitter ghosting (faint offset duplicate a few lines below the sharp text) but content is unambiguous throughout. Overlaps with IMG_4060 for lines 231-248 (cross-checked, consistent). New content: getAverageDuration(pattern) method start - computes matching measurements via getMeasurementsByPattern and begins an empty-check branch. Sticky-scroll header at top: line 64 "export class PerformanceMonitor {". Explorer sidebar (src/utils) same file list as prior photos; performance-monitor.ts selected/highlighted (1 problem badge). Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, "No Solution", 3 errors / 0 warnings, branch hitanshu/experimental*, workspace aqs-web-ui.
---

64: export class PerformanceMonitor {
231:  * Get completed measurements
232:  * @param limit Maximum number of measurements to return (most recent first)
233:  */
234: getCompletedMeasurements(limit?: number): PerformanceMeasurement[] {
235:     const measurements = [...this.completedMeasurements].reverse();
236:     return limit ? measurements.slice(0, limit) : measurements;
237: }
238:
239: /**
240:  * Get measurements by label pattern
241:  * @param pattern String to match in label (case-insensitive)
242:  */
243: getMeasurementsByPattern(pattern: string): PerformanceMeasurement[] {
244:     const regex = new RegExp(pattern, 'i');
245:     return this.completedMeasurements.filter((m) => regex.test(m.label));
246: }
247:
248: /**
249:  * Calculate average duration for measurements matching a label pattern
250:  * @param pattern String to match in label
251:  */
252: getAverageDuration(pattern: string): number | null {
253:     const measurements = this.getMeasurementsByPattern(pattern);
254:
255:     if (measurements.length === 0) {
256:         return null;


========== IMG_4069.md ==========
---
photo: IMG_4069.JPG
type: vscode-code
file: aqs-web-ui/src/utils/performance-monitor.ts
lines: 351-370
orientation: 180
confidence: high
notes: Same tab/file as prior photos, scrolled to the very end of the file (no sticky-scroll header shown here since we're past all enclosing scopes — class already closed at line 348 per IMG_4068). Moderate ghosting (duplicate offset text) but content fully corroborated against IMG_4068's already-established lines 354-367, giving high confidence for the whole range including the new tail (368-370). File ends at line 370 (blank line after final statement); line 369 "export default PerformanceMonitor;" exports the CLASS itself as default (separately from the named singleton export `perfMonitor` at line 358) — worth noting for the reconstruction since both the class and a pre-configured singleton instance are exported. Explorer sidebar: same utils file list; performance-monitor.ts highlighted/selected (badge "1"), and performance-benchmarks.ts also shows a "1" badge in this photo (unclear significance — possibly an unsaved-change or reference-count indicator, not clicked/open per tab bar which still shows only performance-monitor.ts). Status bar: branch "hitanshu/experimental*", "⊗3 △0", "No Solution". Taskbar clock 7:31 PM 7/10/2026.
---
351     // Singleton Instance
352     // ----------------------------------------

354     /**
355      * Global performance monitor instance
356      * Use this singleton for consistent performance tracking across the application
357      */
358     export const perfMonitor = new PerformanceMonitor({
359       enableBrowserMarks: true,
360       enableLogging: import.meta.env.DEV, // Enable logging in dev mode only
361       defaultLogLevel: 'debug',
362       warningThreshold: 1000, // Warn if operation takes more than 1 second
363     });
364

365     // ----------------------------------------
366     // Exports
367     // ----------------------------------------
368

369     export default PerformanceMonitor;
370
