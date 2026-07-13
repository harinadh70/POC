# BUNDLE for src/utils/session-storage.ts
# 6 photo fragment(s), ascending start-line order.


========== IMG_4108.md ==========
---
photo: IMG_4108.JPG
type: vscode-code
file: aqs-web-ui/src/utils/session-storage.ts
lines: 9-27
orientation: 180
confidence: high
notes: New file compared to IMG_4098-4107 (session-storage.ts, not required-field-validation.ts). Sharp, clean frame — no ghosting/double-exposure artifact. Explorer sidebar (src/utils, left-truncated) shows same file list as prior photos but now with session-storage.ts selected/highlighted blue (was previously required-field-validation.ts). Lines 1-8 (getItem JSDoc header, before "* const userId = ...") not visible in this photo — line 9 is mid-JSDoc example block. Status bar: branch hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4.
---
9	 * const userId = getItem<string>('userId', 'guest');
10	 * const preferences = getItem<Record<string, any>>('userPrefs');
11	 */
12	export const getItem = <T>(key: string, defaultValue?: T): T | null => {
13	  try {
14	    const item = sessionStorage.getItem(key);
15	    return item ? JSON.parse(item) : (defaultValue ?? null);
16	  } catch (error) {
17	    console.error(`Error reading from sessionStorage for key "${key}":`, error);
18	    return defaultValue ?? null;
19	  }
20	};
21	
22	/**
23	 * Stores a value in sessionStorage with the specified key.
24	 * @template T - The type of the value being stored.
25	 * @param {string} key - The sessionStorage key under which to store the value.
26	 * @param {T} value - The value to store. Will be serialized to JSON.
27	 * @returns {boolean} Returns true if the value was successfully stored, false otherwise.


========== IMG_4109.md ==========
---
photo: IMG_4109.JPG
type: vscode-code
file: aqs-web-ui/src/utils/session-storage.ts
lines: 22-40
orientation: 180
confidence: high
notes: Sharp, clean frame — no ghosting/double-exposure artifact. Confirms/extends IMG_4108's reading of the setItem JSDoc (22-27) and shows the full setItem function body (34-40). Explorer sidebar (src/utils, left-truncated) same file list as IMG_4108; session-storage.ts selected/highlighted blue. Status bar: branch hitanshu/experimental*, No Solution, 2 errors/0 warnings, Ln 1 Col 1, TypeScript, CRLF, UTF-8, Tab Size 4.
---
22	/**
23	 * Stores a value in sessionStorage with the specified key.
24	 * @template T - The type of the value being stored.
25	 * @param {string} key - The sessionStorage key under which to store the value.
26	 * @param {T} value - The value to store. Will be serialized to JSON.
27	 * @returns {boolean} Returns true if the value was successfully stored, false otherwise.
28	 * @example
29	 * const success = setItem('user', { name: 'John', age: 30 });
30	 * if (success) {
31	 *   console.log('User data saved');
32	 * }
33	 */
34	export const setItem = <T>(key: string, value: T): boolean => {
35	  try {
36	    sessionStorage.setItem(key, JSON.stringify(value));
37	    return true;
38	  } catch (error) {
39	    console.error(`Error writing to sessionStorage for key "${key}":`, error);
40	    return false;


========== IMG_4110.md ==========
---
photo: IMG_4110.JPG
type: vscode-code
file: aqs-web-ui/src/utils/session-storage.ts
lines: 25-51
orientation: 180
confidence: medium
notes: Photo has a faint double-exposure/motion-blur ghost overlay (looks like a second, slightly-scrolled frame superimposed ~2-9 lines below the primary text) affecting lines ~34-51; primary (bold, in-focus) text was legible and used for transcription. Explorer sidebar (utils folder) shows sibling files: normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts (selected), session-sync.ts, transform-pagebuild-respon..., url-helpers.ts, user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts. Tab bar shows only session-storage.ts open. Breadcrumb: aqs-web-ui > src > utils > session-storage.ts. Status bar: branch hitanshu/experimental*, 2 errors/0 warnings, "No Solution", TypeScript, UTF-8, CRLF, Tab Size 4. Git decoration dot on aqs-web-ui and src folders (modified).
---
25	 * @param {string} key - The sessionStorage key under which to store the value.
26	 * @param {T} value - The value to store. Will be serialized to JSON.
27	 * @returns {boolean} Returns true if the value was successfully stored, false otherwise.
28	 * @example
29	 * const success = setItem('user', { name: 'John', age: 30 });
30	 * if (success) {
31	 *   console.log('User data saved');
32	 * }
33	 */
34	export const setItem = <T>(key: string, value: T): boolean => {
35	  try {
36	    sessionStorage.setItem(key, JSON.stringify(value));
37	    return true;
38	  } catch (error) {
39	    console.error(`Error writing to sessionStorage for key "${key}":`, error);
40	    return false;
41	  }
42	};
43	
44	/**
45	 * Removes an item from sessionStorage by key.
46	 * @param {string} key - The key of the item to remove from sessionStorage.
47	 * @returns {boolean} Returns true if the item was successfully removed, false if an error occurred.
48	 * @example
49	 * const success = removeItem('userId');
50	 * if (success) {
51	 *   console.log('User data cleared'); ⟪?⟫


========== IMG_4111.md ==========
---
photo: IMG_4111.JPG
type: vscode-code
file: aqs-web-ui/src/utils/session-storage.ts
lines: 34-61
orientation: 180
confidence: low
notes: Photo has heavy double-exposure/motion-blur ghosting (two overlapping scroll frames superimposed) across the whole visible pane, worse than IMG_4110 of the same file/tab. Content for lines 34-51 duplicates IMG_4110 (see that transcript, higher confidence there); transcription below for lines 52-61 is reconstructed from the legible bold/in-focus overlay text and cross-checked against the parallel setItem() function pattern (lines 34-42) which removeItem() mirrors. Mark low confidence overall due to ghosting. Same tab/breadcrumb/sidebar as IMG_4110 (aqs-web-ui > src > utils > session-storage.ts; utils folder listing identical). Status bar: branch hitanshu/experimental*, 2 errors/0 warnings, "No Solution".
---
34	export const setItem = <T>(key: string, value: T): boolean => {
35	  try {
36	    sessionStorage.setItem(key, JSON.stringify(value));
37	    return true;
38	  } catch (error) {
39	    console.error(`Error writing to sessionStorage for key "${key}":`, error);
40	    return false;
41	  }
42	};
43	
44	/**
45	 * Removes an item from sessionStorage by key.
46	 * @param {string} key - The key of the item to remove from sessionStorage.
47	 * @returns {boolean} Returns true if the item was successfully removed, false if an error occurred.
48	 * @example ⟪?⟫
49	 * const success = removeItem('userId'); ⟪?⟫
50	 * if (success) { ⟪?⟫
51	 *   console.log('User data cleared'); ⟪?⟫
52	 * } ⟪?⟫
53	 */ ⟪?⟫
54	export const removeItem = (key: string): boolean => {
55	  try {
56	    sessionStorage.removeItem(key); ⟪?⟫
57	    return true; ⟪?⟫
58	  } catch (error) {
59	    console.error(`Error removing from sessionStorage for key "${key}":`, error);
60	    return false;
61	  }


========== IMG_4112.md ==========
---
photo: IMG_4112.JPG
type: vscode-code
file: aqs-web-ui/src/utils/session-storage.ts
lines: 54-79
orientation: 180
confidence: high
notes: Sharp, no ghosting (unlike IMG_4110/IMG_4111 of same file). Tab bar shows only session-storage.ts open. Breadcrumb: aqs-web-ui > src > utils > session-storage.ts. Status bar: branch hitanshu/experimental*, 2 errors/0 warnings, "No Solution", TypeScript, UTF-8, CRLF, Tab Size 4. Explorer sidebar (utils folder) visible: normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts (selected), session-sync.ts, transform-pagebuild-respon..., url-helpers.ts, user-permissions.ts, xml-detail-persistence.ts, zod-error-formatter.ts.
---
54	export const removeItem = (key: string): boolean => {
55	  try {
56	    sessionStorage.removeItem(key);
57	    return true;
58	  } catch (error) {
59	    console.error(`Error removing from sessionStorage for key "${key}":`, error);
60	    return false;
61	  }
62	};
63	
64	/**
65	 * Clears all data stored in the browser's `sessionStorage`.
66	 *
67	 * Attempts to remove all session-scoped key/value pairs and returns whether
68	 * the operation succeeded.
69	 *
70	 * @returns `true` if `sessionStorage` was cleared successfully; otherwise `false` if an error occurred.
71	 */
72	export const clearSessionStorage = (): boolean => {
73	  try {
74	    sessionStorage.clear();
75	    return true;
76	  } catch (error) {
77	    console.error('Error clearing sessionStorage:', error);
78	    return false;
79	  }


========== IMG_4113.md ==========
---
photo: IMG_4113.JPG
type: vscode-code
file: aqs-web-ui/src/utils/session-storage.ts
lines: 62-80
orientation: 180
confidence: high
notes: Sharp, no ghosting. Sticky-scroll header at top of editor shows the tail of line 54 signature ("export const removeItem = (key: string): boolean => {") still scrolled just above line 62, confirming continuity with IMG_4112. Line 80 "}" is the closing brace of clearSessionStorage and appears to be the last line of the file (no further content below before blank space). Breadcrumb: aqs-web-ui > src > utils > session-storage.ts. Status bar not fully visible in this crop but tab bar shows only session-storage.ts open.
---
54	export const removeItem = (key: string): boolean => { ⟪sticky-scroll header, repeated⟫
62	};
63	
64	/**
65	 * Clears all data stored in the browser's `sessionStorage`.
66	 *
67	 * Attempts to remove all session-scoped key/value pairs and returns whether
68	 * the operation succeeded.
69	 *
70	 * @returns `true` if `sessionStorage` was cleared successfully; otherwise `false` if an error occurred.
71	 */
72	export const clearSessionStorage = (): boolean => {
73	  try {
74	    sessionStorage.clear();
75	    return true;
76	  } catch (error) {
77	    console.error('Error clearing sessionStorage:', error);
78	    return false;
79	  }
80	};
