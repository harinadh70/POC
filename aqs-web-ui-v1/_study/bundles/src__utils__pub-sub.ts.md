# BUNDLE for src/utils/pub-sub.ts
# 14 photo fragment(s), ascending start-line order.


========== IMG_4079.md ==========
---
photo: IMG_4079.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 1-27
orientation: 180
confidence: high
notes: |
  Sharp, clean capture, no ghosting/blur. New file (previous photos in this batch were
  permission-store.ts). Left activity bar now shows more icons expanded (search,
  source control with badge, run/debug, extensions, accounts with "1" badge, settings) —
  slightly different from earlier photos, sidebar width also wider.
  Explorer sidebar (src/utils) visible, pub-sub.ts selected/highlighted: form.ts,
  frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts,
  logger-builder.ts, menu-persistence.ts, normalize-service-config copy...ts,
  normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts,
  parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts,
  performance-monitor.ts, permission-store.ts, pub-sub.ts (open), required-field-validation.ts.
  Tab bar: only "pub-sub.ts" tab (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > pub-sub.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
  Window title bar: "w00w11dev0067" (note extra "w00" prefix vs earlier "w11dev0067").
  Taskbar clock 7:31 PM 7/10/2026.
---
1   import type { BrowserCommand } from './apply-server-commands';
2   import type { MessageType } from '@components/dialog';
3
4   /**
5    * Type-safe event map for PubSub system.
6    * Add new event types here to ensure type safety across subscribers.
7    */
8   export interface PubSubEvents {
9       'command:executed': { matchcode: string; value: unknown };
10      'command:error': { error: Error; command: BrowserCommand };
11      'form:field-updated': { matchcode: string; value: unknown };
12      'dialog:opened': { type: MessageType };
13      'global:variable-updated': { name: string; value: unknown };
14      'command:call-server-requested': { callType: string; sourceCommand: BrowserCommand };
15      // Tab-related events
16      'tab:selected': { tabstripId: string; tabMatchcode: string };
17      'tab:registered': {
18          tabstripId: string;
19          tabs: Array<{ matchcode: string; label: string; index: number }>;
20      };
21  }
22
23  /**
24   * Type-safe event emitter for cross-component communication.
25   * Supports wildcard subscriptions and automatic cleanup.
26   */
27  export class PubSub {


========== IMG_4080.md ==========
---
photo: IMG_4080.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 8 (sticky header), 13-38
orientation: 180
confidence: high
notes: |
  Sharp, clean capture, no ghosting/blur. Sticky-scroll header pins line 8
  ("export interface PubSubEvents {"). Body content confirms/overlaps IMG_4079
  (lines 13-21 match exactly) and extends further with the PubSub class body
  (lines 27-38), including full JSDoc for the subscribe method up to an in-progress
  @example block (cut off mid-line at 38).
  Explorer sidebar (src/utils) visible, pub-sub.ts selected: form.ts, frame-router.ts,
  http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts,
  menu-persistence.ts, normalize-service-config copy...ts, normalize-service-config.ts,
  parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts,
  parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts,
  permission-store.ts, pub-sub.ts (open), required-field-validation.ts.
  Tab bar: only "pub-sub.ts" tab (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > pub-sub.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
  Window title bar ends "...1dev0067" (cut off at left edge of photo).
  Taskbar clock 7:31 PM 7/10/2026.
---
8   export interface PubSubEvents {
    (sticky-scroll header; lines 9-12 already captured in IMG_4079)
13      'global:variable-updated': { name: string; value: unknown };
14      'command:call-server-requested': { callType: string; sourceCommand: BrowserCommand };
15      // Tab-related events
16      'tab:selected': { tabstripId: string; tabMatchcode: string };
17      'tab:registered': {
18          tabstripId: string;
19          tabs: Array<{ matchcode: string; label: string; index: number }>;
20      };
21  }
22
23  /**
24   * Type-safe event emitter for cross-component communication.
25   * Supports wildcard subscriptions and automatic cleanup.
26   */
27  export class PubSub {
28      private subscribers: Map<string, Set<(data: any) => void>> = new Map();
29
30      /**
31       * Subscribe to a specific event type or all events using wildcard '*'.
32       * @param event - Event name from PubSubEvents or '*' for all events
33       * @param callback - Function to call when event is emitted
34       * @returns Unsubscribe function for cleanup
35       *
36       * @example
37       * const unsubscribe = pubSub.subscribe('command:executed', (data) => {
38       *   console.log('Command executed:', data.matchcode);


========== IMG_4081.md ==========
---
photo: IMG_4081.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 27-54
orientation: 180
confidence: high
notes: |
  UPDATE: IMG_4082 (same file, sharper capture of lines 41-67) confirms the
  reconstruction below for lines 44-54 was correct, and supplied the authoritative line
  numbering for that span. Original capture had motion-blur double-exposure (same
  ~3-line-offset ghosting as IMG_4074/IMG_4077); lines 27-38 exactly duplicate content
  already confirmed clean/sharp in IMG_4080. Lines 39, 41 (marking the tail of the
  @example JSDoc block, between "console.log(...)" at 38 and "unsubscribe();" at 42)
  could not be pinned down exactly from this photo alone — content/order shown below is
  best-effort (probably "* });" and a blank "*" or similar) but exact text of those two
  lines is unconfirmed.
  Explorer sidebar (src/utils) visible, pub-sub.ts selected: form.ts, frame-router.ts,
  http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts,
  menu-persistence.ts, normalize-service-config copy...ts, normalize-service-config.ts,
  parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts,
  parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts,
  permission-store.ts, pub-sub.ts (open), required-field-validation.ts.
  Tab bar: only "pub-sub.ts" tab (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > pub-sub.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
  Window title bar ends "...1dev0067" (cut off). Taskbar clock 7:31 PM 7/10/2026.
---
27  export class PubSub {
28      private subscribers: Map<string, Set<(data: any) => void>> = new Map();
29
30  /**
31   * Subscribe to a specific event type or all events using wildcard '*'.
32   * @param event - Event name from PubSubEvents or '*' for all events
33   * @param callback - Function to call when event is emitted
34   * @returns Unsubscribe function for cleanup
35   *
36   * @example
37   * const unsubscribe = pubSub.subscribe('command:executed', (data) => {
38   *   console.log('Command executed:', data.matchcode);
39  ⟪? uncertain, likely "* });" ⟫
40   * // Later, cleanup
41  ⟪? uncertain ⟫
42   * unsubscribe();
43   */
44  subscribe<K extends keyof PubSubEvents | '*'>(
45      event: K,
46      callback: K extends '*'
47          ? (data: PubSubEvents[keyof PubSubEvents]) => void
48          : K extends keyof PubSubEvents
49              ? (data: PubSubEvents[K]) => void
50              : never,
51  ): () => void {
52      const eventName = event as string;
53
54      if (!this.subscribers.has(eventName)) {


========== IMG_4082.md ==========
---
photo: IMG_4082.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 27 (sticky header), 41-67
orientation: 180
confidence: high
notes: |
  Motion-blur double-exposure present (same ~3-line-offset ghosting as other photos in
  this batch), but the crisp/bold foreground layer is legible throughout using the
  deconvolution method validated earlier. This photo CONFIRMS the best-effort
  reconstruction of lines 41-53 made in IMG_4081 was correct (subscribe<K> generic
  signature with nested conditional-type callback parameter). Sticky-scroll header
  pins line 27 ("export class PubSub {").
  Explorer sidebar (src/utils) visible, pub-sub.ts selected: form.ts, frame-router.ts,
  http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts,
  menu-persistence.ts, normalize-service-config copy...ts, normalize-service-config.ts,
  parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts,
  parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts,
  permission-store.ts, pub-sub.ts (open), required-field-validation.ts.
  Tab bar: only "pub-sub.ts" tab (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > pub-sub.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
  Window title bar: "w11dev0067". Taskbar clock 7:31 PM 7/10/2026.
---
27  export class PubSub {
    (sticky-scroll header)
41   * // Later, cleanup
42   * unsubscribe();
43   */
44  subscribe<K extends keyof PubSubEvents | '*'>(
45      event: K,
46      callback: K extends '*'
47          ? (data: PubSubEvents[keyof PubSubEvents]) => void
48          : K extends keyof PubSubEvents
49              ? (data: PubSubEvents[K]) => void
50              : never,
51  ): () => void {
52      const eventName = event as string;
53
54      if (!this.subscribers.has(eventName)) {
55          this.subscribers.set(eventName, new Set());
56      }
57
58      const callbackSet = this.subscribers.get(eventName)!;
59      callbackSet.add(callback as (data: any) => void);
60
61      // Return unsubscribe function
62      return () => {
63          const set = this.subscribers.get(eventName);
64          if (set) {
65              set.delete(callback as (data: any) => void);
66              // Clean up empty sets
67              if (set.size === 0) {


========== IMG_4083.md ==========
---
photo: IMG_4083.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 27 (sticky header), 44-69
orientation: 180
confidence: high
notes: |
  Motion-blur double-exposure present but crisp/bold foreground layer legible using the
  same deconvolution method as prior photos. Lines 44-67 exactly duplicate/confirm
  content already established in IMG_4081/IMG_4082; new content is lines 68-69
  (closing the "clean up empty sets" block, confirmed via a clean tight crop). Sticky
  header pins line 27 ("export class PubSub {").
  Explorer sidebar (src/utils) visible, pub-sub.ts selected: form.ts, frame-router.ts,
  http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts,
  menu-persistence.ts, normalize-service-config copy...ts, normalize-service-config.ts,
  parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts,
  parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts,
  permission-store.ts, pub-sub.ts (open), required-field-validation.ts.
  Tab bar: only "pub-sub.ts" tab (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > pub-sub.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
  Window title bar: "0w11dev0067". Taskbar clock 7:31 PM 7/10/2026.
---
27  export class PubSub {
    (sticky-scroll header; body lines 28-43 already captured in IMG_4079/4080/4081)
44  subscribe<K extends keyof PubSubEvents | '*'>(
45      event: K,
46      callback: K extends '*'
47          ? (data: PubSubEvents[keyof PubSubEvents]) => void
48          : K extends keyof PubSubEvents
49              ? (data: PubSubEvents[K]) => void
50              : never,
51  ): () => void {
52      const eventName = event as string;
53
54      if (!this.subscribers.has(eventName)) {
55          this.subscribers.set(eventName, new Set());
56      }
57
58      const callbackSet = this.subscribers.get(eventName)!;
59      callbackSet.add(callback as (data: any) => void);
60
61      // Return unsubscribe function
62      return () => {
63          const set = this.subscribers.get(eventName);
64          if (set) {
65              set.delete(callback as (data: any) => void);
66              // Clean up empty sets
67              if (set.size === 0) {
68                  this.subscribers.delete(eventName);
69              }


========== IMG_4084.md ==========
---
photo: IMG_4084.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 27 (sticky header), 44 (sticky header), 67-85
orientation: 180
confidence: high
notes: |
  UPDATE: IMG_4085 (same file, sharp capture of lines 81-88) confirms/corrects the tail
  of this reconstruction — anchors line 81 as a blank comment line "*", 82 as "@example",
  83 as the example code, 84 as "*/", and 85 as the emit signature. Adjusted below
  accordingly (shifted +1 vs. original guess, with one extra line inserted around 76-80
  to fit); exact placement of the two blank "*" separator lines within 76-80 is still
  approximate but the content/order of all comment text is confirmed.
  Motion-blur double-exposure present (~3-line-offset ghosting, same artifact as other
  photos in this batch). Two sticky-scroll headers pin lines 27 ("export class PubSub {")
  and 44 ("subscribe<K extends keyof PubSubEvents | '*'>("). Lines 67-69 exactly confirm
  IMG_4083. Lines 70-75 reconstructed with high confidence via careful crop analysis
  (closing braces cascade of the subscribe() method, then start of the emit() JSDoc).
  Explorer sidebar (src/utils) visible, pub-sub.ts selected: form.ts, frame-router.ts,
  http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts,
  menu-persistence.ts, normalize-service-config copy...ts, normalize-service-config.ts,
  parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts,
  parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts,
  permission-store.ts, pub-sub.ts (open), required-field-validation.ts.
  Tab bar: only "pub-sub.ts" tab (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > pub-sub.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
  Window title bar: "w11dev0067". Taskbar clock 7:31 PM 7/10/2026.
---
27  export class PubSub {
    (sticky-scroll header)
44      subscribe<K extends keyof PubSubEvents | '*'>(
    (sticky-scroll header)
67              if (set.size === 0) {
68                  this.subscribers.delete(eventName);
69              }
70          }
71      };
72  }
73  /**
74   * Emit an event with payload to all subscribers.
75   * Also triggers wildcard '*' subscribers.
76   * Errors in callbacks are caught and logged to prevent breaking other subscribers.
77   *
78   * @param event - Event name from PubSubEvents
79   * @param data - Event payload matching the event type
80  ⟪? exact position of second blank "*" separator approximate ⟫
81   *
82   * @example
83   * pubSub.emit('command:executed', { matchcode: 'FIELD1', value: 'test' });
84   */
85  emit<K extends keyof PubSubEvents>(event: K, data: PubSubEvents[K]): void {


========== IMG_4085.md ==========
---
photo: IMG_4085.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 27 (sticky header), 81-106
orientation: 180
confidence: high
notes: |
  Motion-blur double-exposure present (~2-line-offset ghosting) but crisp/bold
  foreground layer fully legible throughout using the established deconvolution
  method; verified with tight zoomed crops. Sticky-scroll header pins line 27
  ("export class PubSub {"). This confirms and corrects the tail of IMG_4084's
  best-effort reconstruction (see note there) and gives the full body of the emit()
  method, mirroring specific-subscriber and wildcard-subscriber dispatch with
  try/catch error handling around each callback invocation. Line 106 ("} catch (error) {")
  is the last visible line at the bottom of the viewport.
  Explorer sidebar (src/utils) visible, pub-sub.ts selected: form.ts, frame-router.ts,
  http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts,
  menu-persistence.ts, normalize-service-config copy...ts, normalize-service-config.ts,
  parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts,
  parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts,
  permission-store.ts, pub-sub.ts (open), required-field-validation.ts.
  Tab bar: only "pub-sub.ts" tab (italic = preview mode).
  Breadcrumb: aqs-web-ui > src > utils > pub-sub.ts > ...
  Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
  Window title bar ends "...11dev0067" (cut off). Taskbar clock 7:31 PM 7/10/2026.
---
27  export class PubSub {
    (sticky-scroll header)
81   *
82   * @example
83   * pubSub.emit('command:executed', { matchcode: 'FIELD1', value: 'test' });
84   */
85  emit<K extends keyof PubSubEvents>(event: K, data: PubSubEvents[K]): void {
86      const eventName = event as string;
87
88      // Call specific event subscribers
89      const specificSubscribers = this.subscribers.get(eventName);
90      if (specificSubscribers) {
91          specificSubscribers.forEach((callback) => {
92              try {
93                  callback(data);
94              } catch (error) {
95                  console.error(`[PubSub] Error in subscriber for event "${eventName}":`, error);
96              }
97          });
98      }
99
100     // Call wildcard subscribers
101     const wildcardSubscribers = this.subscribers.get('*');
102     if (wildcardSubscribers) {
103         wildcardSubscribers.forEach((callback) => {
104             try {
105                 callback(data);
106             } catch (error) {


========== IMG_4086.md ==========
---
photo: IMG_4086.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 90-114
orientation: 180
confidence: medium
notes: Photo has a vertical double-exposure/ghosting artifact (rolling-shutter or motion blur) — every code row shows a faint duplicate of a nearby row bleeding in behind the sharp/bold text. Transcription below uses the sharp copy, cross-validated against IMG_4087 which shows overlapping lines 112-114 identically. Sticky-scroll headers pinned at top: line 27 "export class PubSub {" and line 85 "emit<K extends keyof PubSubEvents>(event: K, data: PubSubEvents[K]): void {" (lines 86-89 not visible, hidden under sticky headers/scrolled past). Explorer sidebar shows aqs-web-ui > src > utils folder expanded with files: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy(?).ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts (highlighted/open, blue), required-field-validation.ts. Tab bar shows only "pub-sub.ts" open. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings. Editor language TypeScript, Tab Size 4, UTF-8, CRLF. Breadcrumb: aqs-web-ui > src > utils > pub-sub.ts > ...
---
27:     export class PubSub {
85:         emit<K extends keyof PubSubEvents>(event: K, data: PubSubEvents[K]): void {
90:             if (specificSubscribers) {
91:                 specificSubscribers.forEach((callback) => {
92:                     try {
93:                         callback(data);
94:                     } catch (error) {
95:                         console.error(`[PubSub] Error in subscriber for event "${eventName}":`, error);
96:                     }
97:                 });
98:             }
99:
100:             // Call wildcard subscribers
101:             const wildcardSubscribers = this.subscribers.get('*');
102:             if (wildcardSubscribers) {
103:                 wildcardSubscribers.forEach((callback) => {
104:                     try {
105:                         callback(data);
106:                     } catch (error) {
107:                         console.error(
108:                             `[PubSub] Error in wildcard subscriber for event "${eventName}":`,
109:                             error,
110:                         );
111:                     }
112:                 });
113:             }
114:         }


========== IMG_4087.md ==========
---
photo: IMG_4087.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 112-135
orientation: 180
confidence: medium
notes: Same double-exposure/ghosting artifact as IMG_4086 (faint duplicate text bleeding in behind sharp/bold text). Lines 112-114 cross-validated identically against IMG_4086. Line 115 is ambiguous — bold text shows "});" but this conflicts with brace-balance of the emit() method (which appears to close cleanly and completely at line 114, matching IMG_4086's 25-line span 90-114 with all braces paired); the "});" at 115 is most likely a ghost/afterimage bleeding through from line 112's identical text three rows below, so it is marked uncertain below rather than asserted as real. Line 116 bold text shows "/**" (start of new JSDoc block for the clear() method) with a faint "}" ghost overlapping it. Sticky-scroll headers pinned at top: line 27 "export class PubSub {", line 85 "emit<K extends keyof PubSubEvents>(event: K, data: PubSubEvents[K]): void {", line 103 "wildcardSubscribers.forEach((callback) => {". Explorer sidebar identical file list to IMG_4086 (utils folder expanded, pub-sub.ts highlighted). Tab bar shows only "pub-sub.ts" open. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings, TypeScript, Tab Size 4, UTF-8, CRLF.
---
27:     export class PubSub {
85:         emit<K extends keyof PubSubEvents>(event: K, data: PubSubEvents[K]): void {
103:             wildcardSubscribers.forEach((callback) => {
112:                 });
113:             }
114:         }
115:     ⟪?⟫ (bold text reads "});" but likely a ghosting artifact — see notes; brace count suggests this line may actually be blank)
116:     /**
117:          * Unsubscribe all listeners for a specific event.
118:          * If no event is provided, clears all subscriptions.
119:          *
120:          * @param event - Optional event name to clear. If omitted, clears all events.
121:          *
122:          * @example
123:          * // Clear specific event
124:          * pubSub.clear('command:executed');
125:          *
126:          * // Clear all events
127:          * pubSub.clear();
128:          */
129:         clear(event?: keyof PubSubEvents | '*'): void {
130:             if (event) {
131:                 this.subscribers.delete(event as string);
132:             } else {
133:                 this.subscribers.clear();
134:             }
135:         }


========== IMG_4088.md ==========
---
photo: IMG_4088.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 123-148
orientation: 180
confidence: high
notes: Same double-exposure/ghosting artifact as prior pub-sub.ts photos (faint duplicate of nearby rows bleeding in behind sharp/bold text); ghost text ignored, bold copy transcribed and cross-validated against IMG_4087's overlapping lines 123-128 (identical). Sticky-scroll header pinned at top: line 27 "export class PubSub {". Explorer sidebar: aqs-web-ui > src > utils folder, same file list as prior photos, pub-sub.ts highlighted/open. Tab bar shows only "pub-sub.ts" open. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings, TypeScript, Tab Size 4, UTF-8, CRLF.
---
27:     export class PubSub {
123:          * // Clear specific event
124:          * pubSub.clear('command:executed');
125:          *
126:          * // Clear all events
127:          * pubSub.clear();
128:          */
129:         clear(event?: keyof PubSubEvents | '*'): void {
130:             if (event) {
131:                 this.subscribers.delete(event as string);
132:             } else {
133:                 this.subscribers.clear();
134:             }
135:         }
136:
137:         /**
138:          * Get the number of subscribers for a specific event.
139:          * Useful for debugging and testing.
140:          *
141:          * @param event - Event name to check
142:          * @returns Number of subscribers
143:          */
144:         getSubscriberCount(event: keyof PubSubEvents | '*'): number {
145:             return this.subscribers.get(event as string)?.size ?? 0;
146:         }
147:
148:         /**


========== IMG_4089.md ==========
---
photo: IMG_4089.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 135-159
orientation: 180
confidence: high
notes: Same double-exposure/ghosting artifact as prior pub-sub.ts photos; bold/sharp copy transcribed, cross-validated against IMG_4088's overlapping lines 135-148 (identical). Sticky-scroll headers pinned at top: line 27 "export class PubSub {" and line 129 "clear(event?: keyof PubSubEvents | '*'): void {". Line 157 "}" closes the PubSub class opened at line 27. Line 159 "/**" begins a new block whose content is cut off at the bottom edge of the viewport (not visible). Explorer sidebar: aqs-web-ui > src > utils folder, same file list as prior photos, pub-sub.ts highlighted/open. Tab bar shows only "pub-sub.ts" open. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings, TypeScript, Tab Size 4, UTF-8, CRLF.
---
27:     export class PubSub {
129:         clear(event?: keyof PubSubEvents | '*'): void {
135:         }
136:
137:         /**
138:          * Get the number of subscribers for a specific event.
139:          * Useful for debugging and testing.
140:          *
141:          * @param event - Event name to check
142:          * @returns Number of subscribers
143:          */
144:         getSubscriberCount(event: keyof PubSubEvents | '*'): number {
145:             return this.subscribers.get(event as string)?.size ?? 0;
146:         }
147:
148:         /**
149:          * Get all active event names.
150:          * Useful for debugging.
151:          *
152:          * @returns Array of event names with active subscribers
153:          */
154:         getActiveEvents(): string[] {
155:             return Array.from(this.subscribers.keys());
156:         }
157:     }
158:
159:     /** ⟪?⟫ (cut off at bottom of viewport, content not visible)


========== IMG_4090.md ==========
---
photo: IMG_4090.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 152-177
orientation: 180
confidence: high
notes: Same double-exposure/ghosting artifact as prior pub-sub.ts photos; bold/sharp copy transcribed, cross-validated against IMG_4089 (lines 152-159 overlap) and IMG_4091 (lines 165-177 overlap) — all identical. Sticky-scroll header pinned at top: line 27 "export class PubSub {" (the row is visually merged/garbled with ghost text from the getActiveEvents JSDoc in the photo, but the enclosing-class sticky header itself is unambiguous). Line 157 "}" closes the PubSub class opened at line 27; lines 159-177 (the "Singleton PubSub instance..." JSDoc and export statement) are outside the class body, at module scope. Explorer sidebar: aqs-web-ui > src > utils folder, same file list as prior photos, pub-sub.ts highlighted/open. Tab bar shows only "pub-sub.ts" open. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings, TypeScript, Tab Size 4, UTF-8, CRLF.
---
27:     export class PubSub {
152:              * @returns Array of event names with active subscribers
153:              */
154:         getActiveEvents(): string[] {
155:             return Array.from(this.subscribers.keys());
156:         }
157:     }
158:
159:     /**
160:      * Singleton PubSub instance for global event communication.
161:      * Import this instance throughout your application.
162:      *
163:      * @example
164:      * import { pubSub } from '@/utils/pub-sub';
165:      *
166:      * // Subscribe
167:      * const unsubscribe = pubSub.subscribe('command:executed', (data) => {
168:      *   console.log(data.matchcode);
169:      * });
170:      *
171:      * // Emit
172:      * pubSub.emit('command:executed', { matchcode: 'FIELD1', value: 'test' });
173:      *
174:      * // Cleanup
175:      * unsubscribe();
176:      */
177:     export const pubSub = new PubSub();


========== IMG_4092.md ==========
---
photo: IMG_4092.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 164-178
orientation: 180
confidence: high
notes: Clean photo, no ghosting artifact this time (unlike IMG_4086-4091). Confirms end-of-file: line 177 "export const pubSub = new PubSub();" is the last statement, line 178 is blank/EOF (no further lines). Explorer sidebar utils folder now fully expanded (scrolled further than prior photos), listing additional files beyond pub-sub.ts: normalize-service-config copy(?).ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts (highlighted/open), required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon....ts, url-helpers.ts, user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts. Tab bar shows only "pub-sub.ts" open. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings, TypeScript, Tab Size 4, UTF-8, CRLF.
---
164:      * import { pubSub } from '@/utils/pub-sub';
165:      *
166:      * // Subscribe
167:      * const unsubscribe = pubSub.subscribe('command:executed', (data) => {
168:      *   console.log(data.matchcode);
169:      * });
170:      *
171:      * // Emit
172:      * pubSub.emit('command:executed', { matchcode: 'FIELD1', value: 'test' });
173:      *
174:      * // Cleanup
175:      * unsubscribe();
176:      */
177:     export const pubSub = new PubSub();
178:     (blank — end of file)


========== IMG_4091.md ==========
---
photo: IMG_4091.JPG
type: vscode-code
file: aqs-web-ui/src/utils/pub-sub.ts
lines: 165-178
orientation: 180
confidence: high
notes: Same double-exposure/ghosting artifact as prior pub-sub.ts photos; bold/sharp copy transcribed, cross-validated against IMG_4090 (lines 165-177 overlap, identical). No sticky-scroll header visible at top this time — lines 165-178 are module-scope (outside the PubSub class, which closed at line 157), so there is no enclosing function/class to pin. Line 177 "export const pubSub = new PubSub();" is the last statement in the file; line 178 appears blank, consistent with end-of-file. Explorer sidebar: aqs-web-ui > src > utils folder, same file list as prior photos, pub-sub.ts highlighted/open. Tab bar shows only "pub-sub.ts" open. Status bar: branch hitanshu/experimental*, "No Solution", 2 errors 0 warnings, TypeScript, Tab Size 4, UTF-8, CRLF.
---
165:      *
166:      * // Subscribe
167:      * const unsubscribe = pubSub.subscribe('command:executed', (data) => {
168:      *   console.log(data.matchcode);
169:      * });
170:      *
171:      * // Emit
172:      * pubSub.emit('command:executed', { matchcode: 'FIELD1', value: 'test' });
173:      *
174:      * // Cleanup
175:      * unsubscribe();
176:      */
177:     export const pubSub = new PubSub();
178:     (blank — end of file)
