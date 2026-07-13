# BUNDLE for src/utils/api-cache.ts
# 27 photo fragment(s), ascending start-line order.


========== IMG_3245.md ==========
---
photo: IMG_3245.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 1-34
orientation: 180
confidence: high
notes: Clear, sharp photo, no ghosting/blur. Breadcrumb: aqs-web-ui > src > utils > api-cache.ts. Tab bar shows only "api-cache.ts" open (italicized, meaning preview tab, not pinned). Explorer sidebar fully expanded under aqs-web-ui/src: providers/ (theme-provider.tsx), services/ (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types/ (grid-response.ts, unsaved "U"), utils/ (api-cache.ts selected, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa...(truncated), button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Minimap visible on right edge (not legible). Line 34 partially cut off at bottom: "import { LoggerBuilder } from '@/utils/logger-builder';" (import name partly obscured by taskbar, transcribed from visible fragment).
---
1    /**
2     * API Cache - TTL-based caching with LRU eviction
3     *
4     * Features:
5     * - Builder pattern for flexible configuration
6     * - Time-To-Live (TTL) based cache expiration
7     * - Least Recently Used (LRU) eviction when max size reached
8     * - Automatic cache key generation from HTTP request parameters
9     * - Cache invalidation by pattern matching
10    * - TypeScript strict mode with full type safety
11    *
12    * @example
13    * ```tsx
14    * const cache = new ApiCacheBuilder()
15    *   .withTTL(5 * 60 * 1000) // 5 minutes
16    *   .withMaxSize(100)
17    *   .withKeyPrefix('api')
18    *   .build();
19    *
20    * // Set cache entry
21    * cache.set('GET', '/users', {}, { data: [...] });
22    *
23    * // Get cache entry
24    * const cached = cache.get('GET', '/users', {});
25    * if (cached) {
26    *   console.log('Cache hit:', cached);
27    * }
28    *
29    * // Invalidate by pattern
30    * cache.invalidate('/users');
31    * ```
32    */
33
34   import { LoggerBuilder } from '@/utils/logger-builder';


========== IMG_3246.md ==========
---
photo: IMG_3246.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 8-39
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3245 (api-cache.ts), captured moments later — screen has scrolled down a few lines and the photo has motion-blur double-exposure ghosting (gutter shows two interleaved numeral sequences offset by ~3 lines, e.g. bold "18" over faint "15"). Lines 1-33 duplicate the JSDoc header already transcribed cleanly in IMG_3245 (same content: API Cache TTL/LRU doc comment, @example block, cache.set/get/invalidate examples) — not re-transcribed here verbatim due to ghosting, see IMG_3245.md for the clean version. Lines 34-39 below are newly visible/legible past the doc comment and are NOT ghosted (bottom of viewport was steadier). Breadcrumb: aqs-web-ui > src > utils > api-cache.ts. Explorer sidebar same as IMG_3245 (api-cache.ts selected/highlighted in utils/). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
34   import { LoggerBuilder } from '@/utils/logger-builder';
35
36   // ----------------------------------------
37   // Types
38   // ----------------------------------------
39


========== IMG_3247.md ==========
---
photo: IMG_3247.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 30-54
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3245/IMG_3246 (api-cache.ts), scrolled further down. Motion-blur double-exposure ghosting present throughout (gutter shows interleaved duplicate numerals), worse in the upper part of the visible range (lines 30-39, which duplicate content already captured cleanly in IMG_3246) and lighter toward the bottom. Lines 30-39 not re-transcribed here (see IMG_3246.md/IMG_3245.md for clean versions of the doc-comment/import/section-header lines). Lines 40-45 (interface CacheEntry<T>) are clearly legible and unambiguous. Lines 46-54 (interface CacheConfig and start of CacheStats) are legible in content but exact blank-line placement/line-number alignment is uncertain due to blur — marked with ⟪?⟫ where line number assignment is a best guess. Bottom of interface CacheStats is cut off by the taskbar/bottom edge of the photo. Breadcrumb: aqs-web-ui > src > utils > api-cache.ts. Explorer sidebar same file list as prior two photos, api-cache.ts still selected. Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
30   * cache.invalidate('/users');
31   * ```
32   */
33
34   import { LoggerBuilder } from '@/utils/logger-builder';
35
36   // ----------------------------------------
37   // Types
38   // ----------------------------------------
39
40   interface CacheEntry<T> {
41     value: T;
42     timestamp: number;
43     accessCount: number;
44     lastAccessed: number;
45   }
46⟪?⟫
47⟪?⟫ interface CacheConfig {
48⟪?⟫   ttl: number;             // Time-to-live in milliseconds
49⟪?⟫   maxSize: number;         // Maximum number of entries
50⟪?⟫   keyPrefix: string;       // Prefix for all cache keys
51⟪?⟫   enableLogging: boolean;  // Enable debug logging
52⟪?⟫ }
53⟪?⟫ export interface CacheStats {
54⟪?⟫   size: number;            ⟪?⟫ (comment cut off at bottom of photo)


========== IMG_3248.md ==========
---
photo: IMG_3248.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 40-70
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3245-3247 (api-cache.ts), scrolled further down. Motion-blur double-exposure ghosting present throughout (gutter shows interleaved duplicate numerals offset by ~7 lines), but content is largely legible and cross-consistent between the doubled layers, resolving prior uncertainty from IMG_3247 about the CacheConfig/CacheStats interfaces (confirms them here). Exact line-number alignment for lines 61-70 has ±1-2 line uncertainty due to blur (marked below). Breadcrumb: aqs-web-ui > src > utils > api-cache.ts. Explorer sidebar unchanged, api-cache.ts selected. Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
40   interface CacheEntry<T> {
41     value: T;
42     timestamp: number;
43     accessCount: number;
44     lastAccessed: number;
45   }
46
47   interface CacheConfig {
48     ttl: number;             // Time-to-live in milliseconds
49     maxSize: number;         // Maximum number of entries
50     keyPrefix: string;       // Prefix for all cache keys
51     enableLogging: boolean;  // Enable debug logging
52   }
53
54   export interface CacheStats {
55     size: number;
56     maxSize: number;
57     hits: number;
58     misses: number;
59     evictions: number;
60     hitRate: number;
61   }
62⟪?⟫
63⟪?⟫  // ----------------------------------------
64⟪?⟫  // API Cache Implementation
65⟪?⟫  // ----------------------------------------
66⟪?⟫
67⟪?⟫  export class ApiCache {
68⟪?⟫    private cache: Map<string, CacheEntry<unknown>>;
69⟪?⟫    private readonly config: CacheConfig;
70⟪?⟫    private readonly logger = new LoggerBuilder()


========== IMG_3249.md ==========
---
photo: IMG_3249.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 54-91
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3245-3248 (api-cache.ts), scrolled further down. Motion-blur double-exposure ghosting present (gutter shows interleaved duplicate numerals), but the primary/bold layer is legible and internally consistent, cross-validating the CacheStats/comment-header/ApiCache class opening seen partially in IMG_3248. Lines 55-59 (size/maxSize/hits/misses/evictions fields of CacheStats) not visible in this photo (cut off above line 54's row); see IMG_3248.md for those. Line 91 "}" is the last fully visible line before the taskbar cuts off the view. Breadcrumb: aqs-web-ui > src > utils > api-cache.ts. Explorer sidebar unchanged, api-cache.ts selected. Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
54   export interface CacheStats {
...
60     hitRate: number;
61   }
62
63   // ----------------------------------------
64   // API Cache Implementation
65   // ----------------------------------------
66
67   export class ApiCache {
68     private cache: Map<string, CacheEntry<unknown>>;
69     private readonly config: CacheConfig;
70     private readonly logger = new LoggerBuilder()
71       .withContext({ module: 'ApiCache' })
72       .withLevel('debug')
73       .build();
74
75     private stats = {
76       hits: 0,
77       misses: 0,
78       evictions: 0,
79     };
80
81     constructor(config: CacheConfig) {
82       this.config = config;
83       this.cache = new Map();
84
85       if (this.config.enableLogging) {
86         this.logger.debug('ApiCache initialized', {
87           ttl: config.ttl,
88           maxSize: config.maxSize,
89           keyPrefix: config.keyPrefix,
90         });
91       }


========== IMG_3250.md ==========
---
photo: IMG_3250.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 67-108
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3245-3249 (api-cache.ts), scrolled further down. Motion-blur double-exposure ghosting present (gutter shows interleaved duplicate numerals). Lines 67-83 (export class ApiCache opening, private stats, constructor start) duplicate content already transcribed in IMG_3249.md — not repeated here. Lines 84-108 below are the new content, cross-confirmed across multiple zoomed crops. Line-number alignment for lines 90-93 (closing braces of the enableLogging if-block/constructor and following blank line(s) before the next JSDoc) has notable uncertainty due to blur — content ("}" x2, then blank) is legible but the exact count/placement is a best guess, marked with ⟪?⟫. Lines 84-89 and 94-108 are legible and consistently cross-confirmed across overlapping crops. Breadcrumb: aqs-web-ui > src > utils > api-cache.ts. Explorer sidebar unchanged, api-cache.ts selected. Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
84     ttl: config.ttl,
85     maxSize: config.maxSize,
86     keyPrefix: config.keyPrefix,
87     });
88⟪?⟫ }
89⟪?⟫ }
90⟪?⟫
91⟪?⟫
92   /**
93    * Generate cache key from HTTP method, URL, and parameters
94    */
95   private generateKey(method: string, url: string, params: Record<string, unknown> = {}): string {
96     const paramsStr = Object.keys(params).length > 0 ? JSON.stringify(params) : '';
97     return `${this.config.keyPrefix}:${method}:${url}:${paramsStr}`;
98   }
99
100  /**
101   * Check if cache entry is expired
102   */
103  private isExpired(entry: CacheEntry<unknown>): boolean {
104    const now = Date.now();
105    return now - entry.timestamp > this.config.ttl;
106  }


========== IMG_3252.md ==========
---
photo: IMG_3252.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 67-139
orientation: 180
confidence: high
notes: Same file/tab as IMG_3245-3251 (api-cache.ts), scrolled further down. Some faint motion-blur ghosting present but the bold/primary layer is clearly legible and resolves ambiguities from IMG_3251 (confirms "let lruKey: string | null = null;" declaration and the rest of evictLRU, plus start of cleanupExpired). Sticky-scroll header at top shows enclosing scope "export class ApiCache {" pinned above line 105. Line 105 ("private isExpired(...): boolean {") was faint/ghosted rather than bold in this photo but included for continuity/readability (cross-confirmed against IMG_3250/IMG_3251 which show the same signature clearly). Breadcrumb: aqs-web-ui > src > utils > api-cache.ts. Explorer sidebar unchanged, api-cache.ts selected. Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
105  private isExpired(entry: CacheEntry<unknown>): boolean {
106    const now = Date.now();
107    return now - entry.timestamp > this.config.ttl;
108  }
109
110  /**
111   * Evict least recently used entry
112   */
113  private evictLRU(): void {
114    let lruKey: string | null = null;
115    let lruTime = Infinity;
116
117    for (const [key, entry] of this.cache.entries()) {
118      if (entry.lastAccessed < lruTime) {
119        lruTime = entry.lastAccessed;
120        lruKey = key;
121      }
122    }
123
124    if (lruKey) {
125      this.cache.delete(lruKey);
126      this.stats.evictions++;
127
128      if (this.config.enableLogging) {
129        this.logger.debug('LRU eviction', { key: lruKey, evictions: this.stats.evictions });
130      }
131    }
132  }
133
134  /**
135   * Clean up expired entries
136   */
137  private cleanupExpired(): void {
138    const now = Date.now();
139    const keysToDelete: string[] = [];


========== IMG_3251.md ==========
---
photo: IMG_3251.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 92-123
orientation: 180
confidence: low
notes: Same file/tab as IMG_3245-3250 (api-cache.ts), scrolled further down. Heavy motion-blur double-exposure ghosting (gutter numerals doubled/interleaved, and the gutter itself jumps 113→117 with 114-116 only visible as blur trail, not distinct bold digits — consistent with the screen having scrolled during the camera's exposure). Lines 92-106 duplicate content already transcribed in IMG_3250.md (generateKey method, isExpired method) — not repeated here. Lines 107-123 (end of isExpired, start of evictLRU) transcribed below; content is logically coherent (standard LRU-eviction loop) but line numbers 114-116 are a best-effort reconstruction (marked ⟪?⟫) since they were not distinctly legible as bold text, only inferred from the surrounding code logic and faint blur trail. Declaration of "lruKey" variable not clearly visible — likely combined with "let lruTime = Infinity;" on the same or an adjacent line, or occurring where marked ⟪?⟫. Content past line ~122 (rest of evictLRU, e.g. the actual delete-from-cache call) is cut off / not visible in this photo. Breadcrumb: aqs-web-ui > src > utils > api-cache.ts. Explorer sidebar unchanged, api-cache.ts selected. Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
107    return now - entry.timestamp > this.config.ttl;
108  }
109
110  /**
111   * Evict least recently used entry
112   */
113  private evictLRU(): void {
114⟪?⟫   let lruTime = Infinity;
115⟪?⟫   for (const [key, entry] of this.cache.entries()) {
116⟪?⟫     if (entry.lastAccessed < lruTime) {
117        lruTime = entry.lastAccessed;
118        lruKey = key;
119      }
120    }
121⟪?⟫
122⟪?⟫
123⟪?⟫


========== IMG_3253.md ==========
---
photo: IMG_3253.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 113-152
orientation: 180
confidence: high
notes: Same file/tab as IMG_3245-3252 (api-cache.ts), scrolled further down. Motion-blur ghosting present, worse toward the bottom of the frame, but the bold/primary layer is clearly legible throughout and cross-confirms/completes evictLRU (from IMG_3252) and the full cleanupExpired method. Sticky-scroll header at top shows enclosing scope "export class ApiCache {" (line 67) pinned below breadcrumb, with "private evictLRU(): void {" (line 113) pinned as a second sticky level. Lines 113-132 (evictLRU body) duplicate IMG_3252 content — included here for completeness since clearly legible in this photo too. Breadcrumb: aqs-web-ui > src > utils > api-cache.ts. Explorer sidebar unchanged, api-cache.ts selected. Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
113  private evictLRU(): void {
...
122    }
123
124    if (lruKey) {
125      this.cache.delete(lruKey);
126      this.stats.evictions++;
127
128      if (this.config.enableLogging) {
129        this.logger.debug('LRU eviction', { key: lruKey, evictions: this.stats.evictions });
130      }
131    }
132  }
133
134  /**
135   * Clean up expired entries
136   */
137  private cleanupExpired(): void {
138    const now = Date.now();
139    const keysToDelete: string[] = [];
140    for (const [key, entry] of this.cache.entries()) {
141      if (now - entry.timestamp > this.config.ttl) {
142        keysToDelete.push(key);
143      }
144    }
145
146    keysToDelete.forEach((key) => {
147      this.cache.delete(key);
148      if (this.config.enableLogging) {
149        this.logger.debug('Expired entry removed', { key });
150      }
151    });
152  }


========== IMG_3254.md ==========
---
photo: IMG_3254.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 137-173
orientation: 180
confidence: high
notes: Same file/tab as IMG_3245-3253 (api-cache.ts), scrolled further down. Motion-blur ghosting present but bold/primary layer clearly legible throughout. Completes cleanupExpired (already seen in IMG_3253, minor ±1 line-number jitter vs that photo, typical of this blurred series) and shows the full start of the get<T>() method through the isExpired-eviction branch. Sticky-scroll header at top: "export class ApiCache {" (line 67) and "private cleanupExpired(): void {" (line 137) pinned. Line 173 cut off at bottom of frame mid-statement. Breadcrumb: aqs-web-ui > src > utils > api-cache.ts. Explorer sidebar unchanged, api-cache.ts selected. Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
137  private cleanupExpired(): void {
...
149    this.logger.debug('Expired entry removed', { key });
150    }
151    });
152  }
153
154  /**
155   * Get cached value
156   */
157  get<T>(method: string, url: string, params: Record<string, unknown> = {}): T | null {
158    const key = this.generateKey(method, url, params);
159    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
160
161    if (!entry) {
162      this.stats.misses++;
163      if (this.config.enableLogging) {
164        this.logger.debug('Cache miss', { key, misses: this.stats.misses });
165      }
166      return null;
167    }
168
169    if (this.isExpired(entry)) {
170      this.cache.delete(key);
171      this.stats.misses++;
172      if (this.config.enableLogging) {
173⟪?⟫     this.logger.debug( ⟪cut off at bottom of photo⟫


========== IMG_3255.md ==========
---
photo: IMG_3255.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 137-178
orientation: 180
confidence: medium
notes: Same file/tab as IMG_3244-3254 (api-cache.ts). Severe motion-blur double-exposure throughout — two overlapping copies of the scrolled view are superimposed (ghost layer offset up-left by ~4-6 lines from the sharp/bold layer), making the gutter line numbers themselves jitter/misread in places. Content is legible via the sharp layer and cross-confirmed against the already-transcribed IMG_3253 (lines 113-152, high confidence) and IMG_3254 (lines 137-173, high confidence, cut off mid-statement at 173). This photo's sharp layer extends the visible content through line 178, closing out the isExpired-eviction branch of get<T>() that IMG_3254 cut off ("this.logger.debug('Cache miss (expired)', { key, age: Date.now() - entry.timestamp, }); } }"). Line numbers below reconciled against IMG_3253's high-confidence reading (its gutter showed 146 for keysToDelete.forEach; this photo's blurred gutter read closer to 147 for the same line — treated as the same ±1 jitter noted in IMG_3254's notes, not a real discrepancy). Sticky-scroll header at top: "export class ApiCache {" (line 67) and "private cleanupExpired(): void {" (line 137) pinned. Breadcrumb: aqs-web-ui > src > utils > api-cache.ts. Explorer sidebar unchanged, api-cache.ts selected. Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, timestamp 6:15 PM 7/10/2026.
---
137  private cleanupExpired(): void {
...
146    keysToDelete.forEach((key) => {
147      this.cache.delete(key);
148      if (this.config.enableLogging) {
149        this.logger.debug('Expired entry removed', { key });
150      }
151    });
152  }
153
154  /**
155   * Get cached value
156   */
157  get<T>(method: string, url: string, params: Record<string, unknown> = {}): T | null {
158    const key = this.generateKey(method, url, params);
159    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
160
161    if (!entry) {
162      this.stats.misses++;
163      if (this.config.enableLogging) {
164        this.logger.debug('Cache miss', { key, misses: this.stats.misses });
165      }
166      return null;
167    }
168
169    if (this.isExpired(entry)) {
170      this.cache.delete(key);
171      this.stats.misses++;
172      if (this.config.enableLogging) {
173        this.logger.debug('Cache miss (expired)', {
174          key,
175          age: Date.now() - entry.timestamp,
176        });
177      }
178    }


========== IMG_3256.md ==========
---
photo: IMG_3256.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 158-197
orientation: 180
confidence: low
notes: Severe rolling-shutter/motion double-exposure artifact — the frame captures two overlapping/interleaved copies of the scrolled code offset by roughly 2 lines, so exact line-to-text mapping is unreliable in the upper portion (marked ⟪?⟫ below where genuinely unreadable, otherwise text fragments themselves were legible even though their precise line number is inferred from code structure, not directly read). Sticky-scroll headers pinned at top read "67  export class ApiCache {" and "158  get<T>(method: string, url: string, params: Record<string, unknown> = {}): T | null {". This is the SAME get<T> method body captured cleanly (no ghosting) in IMG_3257 at lines 171-202 — treat that transcript as authoritative for the overlapping range (~170-197); this photo mainly adds the otherwise-unseen lines 158-169, which are the ones most affected by the ghosting. Explorer sidebar (legible, not ghosted): aqs-web-ui > src > providers (theme-provider.tsx) > services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts) > types (grid-response.ts) > utils (api-cache.ts [selected/highlighted], apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa[d?].ts — name truncated, button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, clock 6:15 PM 7/10/2026.
---
158     get<T>(method: string, url: string, params: Record<string, unknown> = {}): T | null {
159-165 ⟪?⟫ (fully obscured by ghosting/overlap — not legible enough to transcribe)
166         if (this.config.enableLogging) {
167             this.logger.debug('Cache miss', { key, misses: this.stats.misses });
168         }
169         return null;
     ⟪?⟫ (closing brace(s) for the preceding if-block not clearly resolvable from the ghosted image)
170     if (this.isExpired(entry)) {
171         this.cache.delete(key);
172         this.stats.misses++;
173         if (this.config.enableLogging) {
174             this.logger.debug('Cache miss (expired)', {
175                 key,
176                 age: Date.now() - entry.timestamp,
177             });
178         }
179         return null;
180     }
181
182     // Update access statistics
183     entry.accessCount++;
184     entry.lastAccessed = Date.now();
185     this.stats.hits++;
186
187     if (this.config.enableLogging) {
188         this.logger.debug('Cache hit', {
189             key,
190             accessCount: entry.accessCount,
191             age: Date.now() - entry.timestamp,
192             hits: this.stats.hits,
193         });
194     }
195
196     return entry.value;
197 }


========== IMG_3257.md ==========
---
photo: IMG_3257.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 171-202
orientation: 180
confidence: high
notes: Clean, sharp shot (no motion blur), directly follows IMG_3256's scroll position in the same file. Sticky-scroll headers pinned at top read "67  export class ApiCache {" and "158  get<T>(method: string, url: string, params: Record<string, unknown> = {}): T | null {". Explorer sidebar: aqs-web-ui > src > providers (theme-provider.tsx) > services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts) > types (grid-response.ts) > utils (api-cache.ts [selected/highlighted], apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa[d?].ts, button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, clock 6:15 PM 7/10/2026. Line 202 (bottom, partially cut) begins the next method `set<T>`.
---
171         this.cache.delete(key);
172         this.stats.misses++;
173         if (this.config.enableLogging) {
174             this.logger.debug('Cache miss (expired)', {
175                 key,
176                 age: Date.now() - entry.timestamp,
177             });
178         }
179         return null;
180     }
181
182     // Update access statistics
183     entry.accessCount++;
184     entry.lastAccessed = Date.now();
185     this.stats.hits++;
186
187     if (this.config.enableLogging) {
188         this.logger.debug('Cache hit', {
189             key,
190             accessCount: entry.accessCount,
191             age: Date.now() - entry.timestamp,
192             hits: this.stats.hits,
193         });
194     }
195
196     return entry.value;
197 }
198
199 /**
200  * Set cached value
201  */
202 set<T>(method: string, url: string, params: Record<string, unknown> = {}, value: T): void {


========== IMG_3258.md ==========
---
photo: IMG_3258.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 185-215
orientation: 180
confidence: high
notes: Clean, sharp shot. Sticky-scroll headers pinned at top read "67  export class ApiCache {" and "158  get<T>(method: string, url: string, params: Record<string, unknown> = {}): T | null {" (line 158 sticky label is stale/leftover from the get<T> method — actual body shown is the tail of get<T> plus the new set<T> method starting at 202). Explorer sidebar: aqs-web-ui > src > providers (theme-provider.tsx) > services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts) > types (grid-response.ts) > utils (api-cache.ts [selected], apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa[d?].ts, button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, clock 6:15 PM 7/10/2026. Line 184 partially cut off at top ("entry.lastAccessed = ... Date.now();" implied).
---
185         this.stats.hits++;
186
187         if (this.config.enableLogging) {
188             this.logger.debug('Cache hit', {
189                 key,
190                 accessCount: entry.accessCount,
191                 age: Date.now() - entry.timestamp,
192                 hits: this.stats.hits,
193             });
194         }
195
196         return entry.value;
197     }
198
199     /**
200      * Set cached value
201      */
202     set<T>(method: string, url: string, params: Record<string, unknown> = {}, value: T): void {
203         // Clean up expired entries before adding new one
204         this.cleanupExpired();
205
206         // Evict LRU if cache is full
207         if (this.cache.size >= this.config.maxSize) {
208             this.evictLRU();
209         }
210
211         const key = this.generateKey(method, url, params);
212         const now = Date.now();
213
214         const entry: CacheEntry<T> = {
215             value,


========== IMG_3259.md ==========
---
photo: IMG_3259.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 202-236
orientation: 180
confidence: high
notes: Slight double-exposure ghosting in the lower half (lines ~222-236 show a faint duplicate of the same text shifted a few pixels — confirmed by zoomed crop that both layers read identically, so transcription is reliable despite the visual doubling). Sticky-scroll headers pinned at top read "67  export class ApiCache {" and "202  set<T>(method: string, url: string, params: Record<string, unknown> = {}, value: T): void {". Explorer sidebar unchanged from prior photos (api-cache.ts selected under utils). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, clock 6:16 PM 7/10/2026.
---
202     set<T>(method: string, url: string, params: Record<string, unknown> = {}, value: T): void {
206         // Evict LRU if cache is full
207         if (this.cache.size >= this.config.maxSize) {
208             this.evictLRU();
209         }
210
211         const key = this.generateKey(method, url, params);
212         const now = Date.now();
213
214         const entry: CacheEntry<T> = {
215             value,
216             timestamp: now,
217             accessCount: 0,
218             lastAccessed: now,
219         };
220
221         this.cache.set(key, entry as CacheEntry<unknown>);
222
223         if (this.config.enableLogging) {
224             this.logger.debug('Cache set', { key, size: this.cache.size });
225         }
226     }
227
228     /**
229      * Check if key exists in cache and is not expired
230      */
231     has(method: string, url: string, params: Record<string, unknown> = {}): boolean {
232         const key = this.generateKey(method, url, params);
233         const entry = this.cache.get(key);
234
235         if (!entry) {
236             return false;


========== IMG_3260.md ==========
---
photo: IMG_3260.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 221-253
orientation: 180
confidence: medium
notes: Double-exposure/motion-blur ghosting throughout (same static frame duplicated with a small vertical offset — both layers read identically where legible, so text content is reliable). Exact per-line gutter alignment cross-checked against the clearer IMG_3259/IMG_3262/IMG_3263 (which confirm the delete() signature falls on line 250, not 249 as this blurred photo's gutter first suggested), hence "medium" confidence. Sticky-scroll headers pinned at top: "67  export class ApiCache {" and "202  set<T>(method: string, url: string, params: Record<string, unknown> = {}, value: T): void {". Lines 221-226 duplicate content already captured cleanly in IMG_3259. Explorer sidebar unchanged (api-cache.ts selected under utils). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, clock 6:16 PM 7/10/2026.
---
221         this.cache.set(key, entry as CacheEntry<unknown>);
222
223         if (this.config.enableLogging) {
224             this.logger.debug('Cache set', { key, size: this.cache.size });
225         }
226     }
227
228     /**
229      * Check if key exists in cache and is not expired
230      */
231     has(method: string, url: string, params: Record<string, unknown> = {}): boolean {
232         const key = this.generateKey(method, url, params);
233         const entry = this.cache.get(key);
234
235         if (!entry) {
236             return false;
237         }
238         if (this.isExpired(entry)) {
239             this.cache.delete(key);
240             return false;
241         }
242
243         return true;
244     }
245
246
247     /**
248      * Delete specific cache entry
249      */
250     delete(method: string, url: string, params: Record<string, unknown> = {}): boolean {
251         const key = this.generateKey(method, url, params);
252         const deleted = this.cache.delete(key);
253


========== IMG_3261.md ==========
---
photo: IMG_3261.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 231-266
orientation: 180
confidence: medium
notes: Double-exposure/motion-blur ghosting throughout (same static frame duplicated with a small vertical offset — both layers read identically where legible, so text content is reliable). Exact per-line gutter alignment cross-checked against the clearer IMG_3262/IMG_3263 (which confirm the delete() signature falls on line 250 and clear() on line 264), hence "medium" confidence. Sticky-scroll headers pinned at top: "67  export class ApiCache {" and "231  has(method: string, url: string, params: Record<string, unknown> = {}): boolean {". Lines 231-253 overlap content also visible (more blurred) in IMG_3260. Explorer sidebar unchanged (api-cache.ts selected under utils). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, clock 6:16 PM 7/10/2026.
---
231     has(method: string, url: string, params: Record<string, unknown> = {}): boolean {
232         const key = this.generateKey(method, url, params);
233         const entry = this.cache.get(key);
234
235         if (!entry) {
236             return false;
237         }
238         if (this.isExpired(entry)) {
239             this.cache.delete(key);
240             return false;
241         }
242
243         return true;
244     }
245
246
247     /**
248      * Delete specific cache entry
249      */
250     delete(method: string, url: string, params: Record<string, unknown> = {}): boolean {
251         const key = this.generateKey(method, url, params);
252         const deleted = this.cache.delete(key);
253
254         if (deleted && this.config.enableLogging) {
255             this.logger.debug('Cache entry deleted', { key });
256         }
257
258         return deleted;
259     }
260
261     /**
262      * Clear all cache entries
263      */
264     clear(): void {
265         const size = this.cache.size;
266         this.cache.clear();


========== IMG_3262.md ==========
---
photo: IMG_3262.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 231-278
orientation: 180
confidence: high
notes: Mostly clean/sharp; only very slight doubling on lines ~264-269 (still legible, corroborated by clean IMG_3263). Sticky-scroll headers pinned at top: "67  export class ApiCache {" and "231  has(method: string, url: string, params: Record<string, unknown> = {}): boolean {". Explorer sidebar unchanged (api-cache.ts selected under utils). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, clock 6:16 PM 7/10/2026.
---
231     has(method: string, url: string, params: Record<string, unknown> = {}): boolean {
245     }
246
247     /**
248      * Delete specific cache entry
249      */
250     delete(method: string, url: string, params: Record<string, unknown> = {}): boolean {
251         const key = this.generateKey(method, url, params);
252         const deleted = this.cache.delete(key);
253
254         if (deleted && this.config.enableLogging) {
255             this.logger.debug('Cache entry deleted', { key });
256         }
257
258         return deleted;
259     }
260
261     /**
262      * Clear all cache entries
263      */
264     clear(): void {
265         const size = this.cache.size;
266         this.cache.clear();
267         this.stats.hits = 0;
268         this.stats.misses = 0;
269         this.stats.evictions = 0;
270
271         if (this.config.enableLogging) {
272             this.logger.debug('Cache cleared', { entriesCleared: size });
273         }
274     }
275
276     /**
277      * Invalidate cache entries matching URL pattern
278      */


========== IMG_3263.md ==========
---
photo: IMG_3263.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 250-289
orientation: 180
confidence: high
notes: Clean, sharp shot (no ghosting). Sticky-scroll headers pinned at top: "67  export class ApiCache {" and "250  delete(method: string, url: string, params: Record<string, unknown> = {}): boolean {". Explorer sidebar unchanged (api-cache.ts selected under utils). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, clock 6:16 PM 7/10/2026. Line 289 (bottom, partially cut) is inside the invalidate() for-loop.
---
250     delete(method: string, url: string, params: Record<string, unknown> = {}): boolean {
258         return deleted;
259     }
260
261     /**
262      * Clear all cache entries
263      */
264     clear(): void {
265         const size = this.cache.size;
266         this.cache.clear();
267         this.stats.hits = 0;
268         this.stats.misses = 0;
269         this.stats.evictions = 0;
270
271         if (this.config.enableLogging) {
272             this.logger.debug('Cache cleared', { entriesCleared: size });
273         }
274     }
275
276     /**
277      * Invalidate cache entries matching URL pattern
278      */
279     invalidate(urlPattern: string): number {
280         const keysToDelete: string[] = [];
281
282         for (const key of this.cache.keys()) {
283             // Extract URL from key (format: prefix:method:url:params)
284             const parts = key.split(':');
285             if (parts.length >= 3) {
286                 const url = parts[2];
287                 if (url.includes(urlPattern)) {
288                     keysToDelete.push(key);
289                 }


========== IMG_3264.md ==========
---
photo: IMG_3264.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 264-302
orientation: 180
confidence: high
notes: Clean, sharp shot (only line 264's very top edge has a faint sticky-scroll overlay remnant). Sticky-scroll headers pinned at top: "67  export class ApiCache {" and "264  clear(): void {" (stale label; visible body is actually the tail of clear() plus the new invalidate() method starting at 279). Explorer sidebar unchanged (api-cache.ts selected under utils). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, clock 6:16 PM 7/10/2026.
---
264     clear(): void {
271         if (this.config.enableLogging) {
272             this.logger.debug('Cache cleared', { entriesCleared: size });
273         }
274     }
275
276     /**
277      * Invalidate cache entries matching URL pattern
278      */
279     invalidate(urlPattern: string): number {
280         const keysToDelete: string[] = [];
281
282         for (const key of this.cache.keys()) {
283             // Extract URL from key (format: prefix:method:url:params)
284             const parts = key.split(':');
285             if (parts.length >= 3) {
286                 const url = parts[2];
287                 if (url.includes(urlPattern)) {
288                     keysToDelete.push(key);
289                 }
290             }
291         }
292
293         keysToDelete.forEach((key) => this.cache.delete(key));
294
295         if (this.config.enableLogging) {
296             this.logger.debug('Cache invalidated by pattern', {
297                 pattern: urlPattern,
298                 entriesInvalidated: keysToDelete.length,
299             });
300         }
301
302         return keysToDelete.length;


========== IMG_3265.md ==========
---
photo: IMG_3265.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 279-320
orientation: 180
confidence: high
notes: Double-exposure/motion-blur ghosting throughout (same static frame duplicated with a small vertical offset), but both layers read identically wherever legible, so text content is reliable; lines 279-302 duplicate/overlap content already captured cleanly in IMG_3264. Sticky-scroll headers pinned at top: "67  export class ApiCache {" and "279  invalidate(urlPattern: string): number {". Explorer sidebar unchanged (api-cache.ts selected under utils). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, clock 6:16 PM 7/10/2026.
---
293         keysToDelete.forEach((key) => this.cache.delete(key));
294
295         if (this.config.enableLogging) {
296             this.logger.debug('Cache invalidated by pattern', {
297                 pattern: urlPattern,
298                 entriesInvalidated: keysToDelete.length,
299             });
300         }
301
302         return keysToDelete.length;
303     }
304
305     /**
306      * Get cache statistics
307      */
308     getStats(): CacheStats {
309         const totalRequests = this.stats.hits + this.stats.misses;
310         const hitRate = totalRequests > 0 ? this.stats.hits / totalRequests : 0;
311
312         return {
313             size: this.cache.size,
314             maxSize: this.config.maxSize,
315             hits: this.stats.hits,
316             misses: this.stats.misses,
317             evictions: this.stats.evictions,
318             hitRate: Math.round(hitRate * 10000) / 100, // Percentage with 2 decimals
319         };
320     }


========== IMG_3266.md ==========
---
photo: IMG_3266.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 279-333
orientation: 180
confidence: high
notes: Clean, sharp shot (no ghosting). Sticky-scroll headers pinned at top: "67  export class ApiCache {" and "279  invalidate(urlPattern: string): number {" (stale label; visible body is actually getStats() and the closing brace of the ApiCache class, followed by a new exported class ApiCacheBuilder starting at line 327). Explorer sidebar unchanged (api-cache.ts selected under utils). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, clock 6:16 PM 7/10/2026. Line 321 "}" closes the ApiCache class; a "Builder Pattern" section-divider comment block follows before the new ApiCacheBuilder class.
---
279     invalidate(urlPattern: string): number {
303     }
304
305     /**
306      * Get cache statistics
307      */
308     getStats(): CacheStats {
309         const totalRequests = this.stats.hits + this.stats.misses;
310         const hitRate = totalRequests > 0 ? this.stats.hits / totalRequests : 0;
311
312         return {
313             size: this.cache.size,
314             maxSize: this.config.maxSize,
315             hits: this.stats.hits,
316             misses: this.stats.misses,
317             evictions: this.stats.evictions,
318             hitRate: Math.round(hitRate * 10000) / 100, // Percentage with 2 decimals
319         };
320     }
321 }
322
323 // ----------------------------------------
324 // Builder Pattern
325 // ----------------------------------------
326
327 export class ApiCacheBuilder {
328     private config: CacheConfig = {
329         ttl: 5 * 60 * 1000, // Default: 5 minutes
330         maxSize: 100, // Default: 100 entries
331         keyPrefix: 'api-cache', // Default prefix
332         enableLogging: false, // Default: disabled in production
333     };


========== IMG_3267.md ==========
---
photo: IMG_3267.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 321-349
orientation: 180
confidence: high
notes: Double-exposure/motion-blur ghosting throughout (same static frame duplicated with a small vertical offset), but both layers read identically wherever legible, so text content is reliable; lines 321-334 duplicate/overlap content already captured cleanly in IMG_3266. Sticky-scroll headers pinned at top: "67  export class ApiCache {" and "327  export class ApiCacheBuilder {" (note: ApiCacheBuilder is a separate top-level exported class, not nested in ApiCache — sticky header shows it because it's the current enclosing scope at the cursor). Explorer sidebar unchanged (api-cache.ts selected under utils). Only tab open: api-cache.ts. Status bar: "No Solution", 2 errors / 0 warnings, branch hitanshu/experimental*, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript, clock 6:16 PM 7/10/2026. Line 349 (bottom, cut off) begins the body of withMaxSize's validation check.
---
321 }
322
323 // ----------------------------------------
324 // Builder Pattern
325 // ----------------------------------------
326
327 export class ApiCacheBuilder {
328     private config: CacheConfig = {
329         ttl: 5 * 60 * 1000, // Default: 5 minutes
330         maxSize: 100, // Default: 100 entries
331         keyPrefix: 'api-cache', // Default prefix
332         enableLogging: false, // Default: disabled in production
333     };
334
335     /**
336      * Set time-to-live for cache entries
337      * @param ttl Time in milliseconds
338      */
339     withTTL(ttl: number): this {
340         if (ttl <= 0) {
341             throw new Error('TTL must be greater than 0');
342         }
343         this.config.ttl = ttl;
344         return this;
345     }
346
347     /**
348      * Set maximum cache size
349      * @param maxSize Maximum number of entries
350      */
351     withMaxSize(maxSize: number): this {
352         if (maxSize <= 0) {


========== IMG_3268.md ==========
---
photo: IMG_3268.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 327-370
orientation: 180
confidence: medium
notes: Photo has a motion-blur/double-exposure ghosting artifact throughout (two overlapping vertically-offset copies of the same scrolled content); transcription reconstructed from the sharper/bold-focus pass aligned to the gutter line numbers, cross-checked at multiple zoom crops. Explorer sidebar (AQS_WORKSPACE > aqs-web-ui > src): providers > theme-provider.tsx; services > lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts; types > grid-response.ts (selected marker "U"); utils (expanded) > api-cache.ts (selected, highlighted), apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa[d]..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts. Tab bar: single tab "api-cache.ts". Breadcrumb: aqs-web-ui > src > utils > api-cache.ts > ... Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:16 PM 7/10/2026. Line 371 begins ("with...(...): this {") but is cut off by the status bar / too blurred to transcribe reliably — marked ⟪?⟫.
---
327  export class ApiCacheBuilder {
...
339  withTTL(ttl: number): this {
340    if (ttl <= 0) {
341      throw new Error('TTL must be greater than 0');
342    }
343    this.config.ttl = ttl;
344    return this;
345  }
346
347  /**
348   * Set maximum cache size
349   * @param maxSize Maximum number of entries
350   */
351  withMaxSize(maxSize: number): this {
352    if (maxSize <= 0) {
353      throw new Error('Max size must be greater than 0');
354    }
355    this.config.maxSize = maxSize;
356    return this;
357  }
358
359  /**
360   * Set cache key prefix
361   * @param prefix Prefix for all cache keys
362   */
363  withKeyPrefix(prefix: string): this {
364    this.config.keyPrefix = prefix;
365    return this;
366  }
367
368  /**
369   * Enable debug logging
370   */
371  ⟪?⟫ (line cut off by status bar, illegible)


========== IMG_3269.md ==========
---
photo: IMG_3269.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 327-378
orientation: 180
confidence: medium
notes: Same file/scroll region as IMG_3268, scrolled slightly further down (overlap 327-357 repeated, new content 358-378). Photo has the same motion-blur/double-exposure ghosting artifact (two vertically-offset overlapping copies of the same content); transcription reconstructed from the sharper/bold-focus pass aligned to gutter numbers, verified via zoom crops. Explorer sidebar identical to IMG_3268 (utils folder expanded, api-cache.ts selected). Tab bar: single tab "api-cache.ts". Breadcrumb: aqs-web-ui > src > utils > api-cache.ts > ... Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:16 PM 7/10/2026. Line 379 ("disableLogging(): this {" expected) is cut off by the status bar / illegible — marked ⟪?⟫.
---
327  export class ApiCacheBuilder {
       withTTL(ttl: number): this {
...
347  /**
348   * Set maximum cache size
349   * @param maxSize Maximum number of entries
350   */
351  withMaxSize(maxSize: number): this {
352    if (maxSize <= 0) {
353      throw new Error('Max size must be greater than 0');
354    }
355    this.config.maxSize = maxSize;
356    return this;
357  }
358
359  /**
360   * Set cache key prefix
361   * @param prefix Prefix for all cache keys
362   */
363  withKeyPrefix(prefix: string): this {
364    this.config.keyPrefix = prefix;
365    return this;
366  }
367
368  /**
369   * Enable debug logging
370   */
371  enableLogging(): this {
372    this.config.enableLogging = true;
373    return this;
374  }
375
376  /**
377   * Disable debug logging
378   */
379  ⟪?⟫ (line cut off by status bar, illegible — expected "disableLogging(): this {")


========== IMG_3271.md ==========
---
photo: IMG_3271.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 327-397
orientation: 180
confidence: high
notes: Same file, scrolled to the very end of api-cache.ts (last method + closing brace + default export banner + export statement). This photo is sharp/clear, no ghosting artifact (unlike IMG_3268-3270), and confirms the reconstruction of the file tail. File ends at line 397 (blank line after the export). Explorer sidebar identical to prior photos in this file (utils folder expanded, api-cache.ts selected, sibling files: apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa..., button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx, detect-modal-type.ts). Tab bar: single tab "api-cache.ts". Breadcrumb: aqs-web-ui > src > utils > api-cache.ts > ... Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:16 PM 7/10/2026.
---
327  export class ApiCacheBuilder {
...
368  /**
369   * Enable debug logging
370   */
371  enableLogging(): this {
372    this.config.enableLogging = true;
373    return this;
374  }
375
376  /**
377   * Disable debug logging
378   */
379  disableLogging(): this {
380    this.config.enableLogging = false;
381    return this;
382  }
383
384  /**
385   * Build and return ApiCache instance
386   */
387  build(): ApiCache {
388    return new ApiCache(this.config);
389  }
390  }
391
392  // ---------------------------------------------
393  // Default Export
394  // ---------------------------------------------
395
396  export default ApiCacheBuilder;
397


========== IMG_3270.md ==========
---
photo: IMG_3270.JPG
type: vscode-code
file: aqs-web-ui/src/utils/api-cache.ts
lines: 368-394
orientation: 180
confidence: medium
notes: Same file, scrolled further than IMG_3269 (overlap 368-378 repeats IMG_3269 content; new content 379-394 is the tail of the file). Photo has the same motion-blur/double-exposure ghosting artifact throughout; transcription of 368-378 taken from the clearer IMG_3269 reading of the identical lines, new tail lines 379-394 reconstructed from this photo's sharper bold-focus pass at multiple zoom crops and confirmed exactly against the sharp/clear IMG_3271 (same file, same tail, no ghosting). Explorer sidebar identical to IMG_3268/3269 (utils folder expanded, api-cache.ts selected). Tab bar: single tab "api-cache.ts". Breadcrumb: aqs-web-ui > src > utils > api-cache.ts > ... Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:16 PM 7/10/2026.
---
327  export class ApiCacheBuilder {
...
368  /**
369   * Enable debug logging
370   */
371  enableLogging(): this {
372    this.config.enableLogging = true;
373    return this;
374  }
375
376  /**
377   * Disable debug logging
378   */
379  disableLogging(): this {
380    this.config.enableLogging = false;
381    return this;
382  }
383
384  /**
385   * Build and return ApiCache instance
386   */
387  build(): ApiCache {
388    return new ApiCache(this.config);
389  }
390  }
391
392  // ---------------------------------------------
393  // Default Export
394  // ---------------------------------------------
