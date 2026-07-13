# BUNDLE for src/utils/local-storage.ts
# 5 photo fragment(s), ascending start-line order.


========== IMG_3783.md ==========
---
photo: IMG_3783.JPG
type: vscode-code
file: aqs-web-ui/src/utils/local-storage.ts
lines: 1-27
orientation: 180
confidence: high
notes: New file, sharp/unblurred photo (no ghosting). Breadcrumb aqs-web-ui > src > utils > local-storage.ts > ... Explorer sidebar (aqs-web-ui/src/utils/) selected/highlighted: local-storage.ts. Other files listed: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts (active), logger-builder.ts, menu-persistence.ts, normalize-service-config cop... (truncated), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:26 PM 7/10/2026.
---
1:  /**
2:   * Retrieves an item from localStorage with type safety and error handling.
3:   * @template T - The type of the value to retrieve.
4:   * @param {string} key - The key of the item to retrieve from localStorage.
5:   * @param {T} [defaultValue] - Optional default value to return if the key doesn't exist.
6:   * @returns {T | null} The parsed value from localStorage, the default value, or null if neither is available
7:   * @throws Does not throw, errors are caught and logged to console.
8:   * @example
9:   * const userId = getItem<string>('userId', 'guest');
10:  * const preferences = getItem<Record<string, any>>('userPrefs');
11:  */
12: export const getItem = <T>(key: string, defaultValue?: T): T | null => {
13:     try {
14:         const item = localStorage.getItem(key);
15:         return item ? JSON.parse(item) : (defaultValue ?? null);
16:     } catch (error) {
17:         console.error(`Error reading from localStorage for key "${key}":`, error);
18:         return defaultValue ?? null;
19:     }
20: };
21:
22: /**
23:  * Stores a value in localStorage with the specified key.
24:  * @template T - The type of the value being stored.
25:  * @param {string} key - The localStorage key under which to store the value.
26:  * @param {T} value - The value to store. Will be serialized to JSON.
27:  * @returns {boolean} Returns true if the value was successfully stored, false otherwise.


========== IMG_3784.md ==========
---
photo: IMG_3784.JPG
type: vscode-code
file: aqs-web-ui/src/utils/local-storage.ts
lines: 1-35
orientation: 180
confidence: high
notes: Scrolled slightly from IMG_3783, same file. Lines 1-27 overlap IMG_3783 and match exactly (cross-verified against that cleaner, unblurred photo). New content 28-35 finishes the setItem JSDoc block and starts the setItem function signature; read through the same double-exposure/motion-blur ghosting seen in legacy-xml-detail.ts photos (consistent small-line-offset ghost under each sharp line), resolved by picking the bold/foreground text at each gutter-aligned row. Explorer sidebar unchanged, local-storage.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:26 PM 7/10/2026.
---
1:  /**
2:   * Retrieves an item from localStorage with type safety and error handling.
3:   * @template T - The type of the value to retrieve.
4:   * @param {string} key - The key of the item to retrieve from localStorage.
5:   * @param {T} [defaultValue] - Optional default value to return if the key doesn't exist.
6:   * @returns {T | null} The parsed value from localStorage, the default value, or null if neither is available
7:   * @throws Does not throw, errors are caught and logged to console.
8:   * @example
9:   * const userId = getItem<string>('userId', 'guest');
10:  * const preferences = getItem<Record<string, any>>('userPrefs');
11:  */
12: export const getItem = <T>(key: string, defaultValue?: T): T | null => {
13:     try {
14:         const item = localStorage.getItem(key);
15:         return item ? JSON.parse(item) : (defaultValue ?? null);
16:     } catch (error) {
17:         console.error(`Error reading from localStorage for key "${key}":`, error);
18:         return defaultValue ?? null;
19:     }
20: };
21:
22: /**
23:  * Stores a value in localStorage with the specified key.
24:  * @template T - The type of the value being stored.
25:  * @param {string} key - The localStorage key under which to store the value.
26:  * @param {T} value - The value to store. Will be serialized to JSON.
27:  * @returns {boolean} Returns true if the value was successfully stored, false otherwise.
28:  * @example
29:  * const success = setItem('user', { name: 'John', age: 30 });
30:  * if (success) {
31:  *   console.log('User data saved');
32:  * }
33:  */
34: export const setItem = <T>(key: string, value: T): boolean => {
35:     try {


========== IMG_3785.md ==========
---
photo: IMG_3785.JPG
type: vscode-code
file: aqs-web-ui/src/utils/local-storage.ts
lines: 12-40
orientation: 180
confidence: high
notes: Photo taken upside down; rotated 180 to read. Gutter jumps directly from line 12 to line 15 — lines 13-14 are NOT visible on screen (no fold chevron/"..." marker seen in gutter; possibly obscured or a collapsed region not clearly rendered). Content not guessed, left out per instructions. Explorer sidebar (utils folder) shows: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts (highlighted/selected), logger-builder.ts, menu-persistence.ts, "normalize-service-config copy...ts", normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Only one tab open: local-storage.ts. Breadcrumb: aqs-web-ui > src > utils > local-storage.ts. Status bar: branch "hitanshu/experimental*" (asterisk = unsaved changes), Problems 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock shows 19:26, 10-07-2026.
---
12: export const getItem = <T>(key: string, defaultValue?: T): T | null => {
[lines 13-14 not visible in photo]
15:     return item ? JSON.parse(item) : (defaultValue ?? null);
16: } catch (error) {
17:     console.error(`Error reading from localStorage for key "${key}":`, error);
18:     return defaultValue ?? null;
19: }
20: };
21:
22: /**
23:  * Stores a value in localStorage with the specified key.
24:  * @template T - The type of the value being stored.
25:  * @param {string} key - The localStorage key under which to store the value.
26:  * @param {T} value - The value to store. Will be serialized to JSON.
27:  * @returns {boolean} Returns true if the value was successfully stored, false otherwise.
28:  * @example
29:  * const success = setItem('user', { name: 'John', age: 30 });
30:  * if (success) {
31:  *   console.log('User data saved');
32:  * }
33:  */
34: export const setItem = <T>(key: string, value: T): boolean => {
35:     try {
36:         localStorage.setItem(key, JSON.stringify(value));
37:         return true;
38:     } catch (error) {
39:         console.error(`Error writing to localStorage for key "${key}":`, error);
40:         return false;


========== IMG_3786.md ==========
---
photo: IMG_3786.JPG
type: vscode-code
file: aqs-web-ui/src/utils/local-storage.ts
lines: 34-63
orientation: 180
confidence: high
notes: Photo taken upside down; rotated 180 to read. Line 34 is a VS Code sticky-scroll header (repeats the enclosing `setItem` function signature) while the actual visible/scrolled body starts at line 39. Continuation of same file as IMG_3785 (setItem catch block, then removeItem JSDoc + implementation). Explorer sidebar (utils folder) unchanged from IMG_3785: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts (selected), logger-builder.ts, menu-persistence.ts, "normalize-service-config copy...ts", normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Only one tab open: local-storage.ts. Breadcrumb: aqs-web-ui > src > utils > local-storage.ts. Status bar: branch "hitanshu/experimental*", Problems 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock 19:26, 10-07-2026.
---
34: export const setItem = <T>(key: string, value: T): boolean => {   [sticky-scroll header]
39:         console.error(`Error writing to localStorage for key "${key}":`, error);
40:         return false;
41:     }
42: };
43:
44: /**
45:  * Removes an item from localStorage by key.
46:  * @param {string} key - The key of the item to remove from localStorage.
47:  * @returns {boolean} Returns true if the item was successfully removed, false if an error occurred.
48:  * @example
49:  * const success = removeItem('userId');
50:  * if (success) {
51:  *   console.log('User data cleared');
52:  * }
53:  */
54: export const removeItem = (key: string): boolean => {
55:     try {
56:         localStorage.removeItem(key);
57:         return true;
58:     } catch (error) {
59:         console.error(`Error removing from localStorage for key "${key}":`, error);
60:         return false;
61:     }
62: };
63:


========== IMG_3787.md ==========
---
photo: IMG_3787.JPG
type: vscode-code
file: aqs-web-ui/src/utils/local-storage.ts
lines: 48-63
orientation: 180
confidence: medium
notes: Photo taken upside down; rotated 180 to read. Camera motion caused a double-exposure/ghosting artifact — the crisp, gutter-numbered layer (lines 48-63) is overlaid with a fainter duplicate of the same file scrolled to a slightly different position (no reliable gutter numbers on that ghost layer, offset ~diagonally down-right). Transcribed only the sharp, line-numbered layer below; content is a re-photograph of the same removeItem JSDoc + implementation already captured in IMG_3786 (lines 34-63), fully consistent with it. Explorer sidebar unchanged: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts (selected), logger-builder.ts, menu-persistence.ts, "normalize-service-config copy...ts", normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Only one tab open: local-storage.ts. Breadcrumb: aqs-web-ui > src > utils > local-storage.ts. Status bar: branch "hitanshu/experimental*", Problems 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Windows taskbar clock 19:26, 10-07-2026.
---
48:  * @example
49:  * const success = removeItem('userId');
50:  * if (success) {
51:  *   console.log('User data cleared');
52:  * }
53:  */
54: export const removeItem = (key: string): boolean => {
55:     try {
56:         localStorage.removeItem(key);
57:         return true;
58:     } catch (error) {
59:         console.error(`Error removing from localStorage for key "${key}":`, error);
60:         return false;
61:     }
62: };
63:
