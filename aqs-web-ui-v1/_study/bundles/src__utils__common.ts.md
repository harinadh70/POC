# BUNDLE for src/utils/common.ts
# 6 photo fragment(s), ascending start-line order.


========== IMG_3550.md ==========
---
photo: IMG_3550.JPG
type: vscode-code
file: aqs-web-ui/src/utils/common.ts
lines: 1-34
orientation: 180
confidence: high
notes: New file compared to prior photos - common.ts (not command-handlers.ts). Breadcrumb shows aqs-web-ui > src > utils > common.ts > Result (symbol breadcrumb). Explorer sidebar: same utils folder listing as before, command-handlers.ts now unselected/unhighlighted (previously it was highlighted+italic unsaved), common.ts is now selected/highlighted. Only tab open: common.ts (no unsaved dot). Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors / 0 warnings (down from 7 seen in command-handlers.ts photos), "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:21 PM 7/10/2026. Bottom of photo shows a second physical keyboard (photographer's own laptop) partly in frame.
---
1: export type Result<T, E = unknown> = readonly [T, null] | readonly [null, E];
2:
3: /**
4:  * Awaits a value or promise and returns a tuple with either the resolved value or the error,
5:  * avoiding exceptions (i.e., "await without throw").
6:  *
7:  * This is useful for flattening async control flow without `try/catch`:
8:  *
9:  * ```ts
10:  * const [data, err] = await safeAwait(fetchData());
11:  * if (err) {
12:  *   // handle error
13:  *   console.error(err);
14:  * } else {
15:  *   // use data
16:  *   console.log(data);
17:  * }
18:  * ```
19:  *
20:  * The return type is a discriminated tuple:
21:  * - On success: `[value, null]`
22:  * - On failure: `[null, error]`
23:  *
24:  * @template T The resolved value type of the promise (or the plain value).
25:  * @template E The error type (defaults to `unknown`). You may specify a concrete type if your code normalize
26:  *
27:  * @param {T | Promise<T>} valueOrPromise A value or a promise to await. Plain values are accepted for conven
28:  * @returns {Promise<readonly [T, null] | readonly [null, E]>}
29:  * A promise that always resolves to a tuple: `[value, null]` on success, or `[null, error]` on failure.
30:  *
31:  * @example
32:  * // Basic usage with unknown error type
33:  * const [user, err] = await safeAwait(fetchUser());
34:  * if (err) {  (line cut off at bottom)


========== IMG_3551.md ==========
---
photo: IMG_3551.JPG
type: vscode-code
file: aqs-web-ui/src/utils/common.ts
lines: 14-44
orientation: 180
confidence: low
notes: Photo exhibits significant motion-blur/double-exposure ghosting -- the editor was apparently mid smooth-scroll animation when the photo was taken, so most rows show two overlapping/superimposed lines of text (line-number gutter itself stays crisp 14-44). Content is the continuation of the safeAwait() JSDoc in common.ts (same doc block as IMG_3550, which clearly covers lines 1-34). Where overlap made text ambiguous, marked ⟪?⟫. Breadcrumb: aqs-web-ui > src > utils > common.ts > Result. Explorer: common.ts now highlighted/selected in sidebar (utils folder), command-handlers.ts no longer highlighted. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:21 PM 7/10/2026.
---
14: } else {
15:  *   ⟪?⟫ (overlapped: "// handle error" ghosted with "use data")
16:  *   ⟪?⟫ (overlapped: "console.error(err);" ghosted with "console.log(data);")
17: * }
18:  * ... // use data ⟪?⟫ (ghost text overlapping)
19:  *   console.log(data);
20:  * }
21:  * ```
22:  *
23:  * The return type is a discriminated tuple:
24:  * - On success: `[value, null]`
25:  * - On failure: `[null, error]`
26:  *
27:  * @template T The resolved value type of the promise (or the plain value).
28:  * @template E The error type (defaults to `unknown`). You may specify a concrete type if your code normalize
29:  *
30:  * @param {T | Promise<T>} valueOrPromise A value or a promise to await. Plain values are accepted for conven⟪?⟫
31:  * @returns {Promise<readonly [T, null] | readonly [null, E]>}
32:  * A promise that always resolves to a tuple: `[value, null]` on success, or `[null, error]` on failure.
33:  *
34:  * @example
35:  * // Basic usage with unknown error type
36:  * const [user, err] = await safeAwait(fetchUser());
37:  * if (err) {
38:  *   // err is unknown
39:  *   console.error('Failed:', err);
40:  * } else {
41:  *   console.log('User:', user);
42:  * }
43:  *
44:  * @example


========== IMG_3552.md ==========
---
photo: IMG_3552.JPG
type: vscode-code
file: aqs-web-ui/src/utils/common.ts
lines: 22-58
orientation: 180
confidence: medium
notes: Photo has the same motion-blur/double-exposure ghosting as IMG_3551 (mid-scroll-animation capture; each row shows two superimposed lines of text). Content is the continuation of the safeAwait() JSDoc in common.ts. Transcription below was reconstructed by reading the brighter/sharper text layer per gutter row and cross-validating against the clean, unblurred IMG_3550 (covers lines 1-34) and IMG_3553 (covers lines 43-76) which bracket this photo's unique range (35-42) and confirm the rest matches exactly -- hence medium rather than low confidence. Explorer sidebar: common.ts selected/highlighted. Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:21 PM 7/10/2026.
---
22:  * - On failure: `[null, error]`
23:  *
24:  * @template T The resolved value type of the promise (or the plain value).
25:  * @template E The error type (defaults to `unknown`). You may specify a concrete type if your code normalize
26:  *
27:  * @param {T | Promise<T>} valueOrPromise A value or a promise to await. Plain values are accepted for conven
28:  * @returns {Promise<readonly [T, null] | readonly [null, E]>}
29:  * A promise that always resolves to a tuple: `[value, null]` on success, or `[null, error]` on failure.
30:  *
31:  * @example
32:  * // Basic usage with unknown error type
33:  * const [user, err] = await safeAwait(fetchUser());
34:  * if (err) {
35:  *   // err is unknown
36:  *   console.error('Failed:', err);
37:  * } else {
38:  *   console.log('User:', user);
39:  * }
40:  *
41:  * @example
42:  * // With a specific error type
43:  * type ApiError = { code: string; message: string };
44:  * const [payload, apiErr] = await safeAwait<Payload, ApiError>(callApi());
45:  * if (apiErr) {
46:  *   alert(apiErr.message);
47:  * }
48:  *
49:  * @example
50:  * // Distinguishing a legitimate `undefined` result from an error
51:  * const [maybeItem, e] = await safeAwait(getOptionalItem());
52:  * if (e) {
53:  *   // handle error
54:  * } else if (maybeItem === undefined) {
55:  *   // success, but the value itself is undefined
56:  * }
57:  *
58:  * @remarks


========== IMG_3553.md ==========
---
photo: IMG_3553.JPG
type: vscode-code
file: aqs-web-ui/src/utils/common.ts
lines: 43-76
orientation: 180
confidence: high
notes: Clean (no ghosting/blur) photo. Shows the end of the safeAwait() JSDoc (@example blocks, @remarks) and the full implementation of safeAwait<T, E>(). Also begins the JSDoc for the next utility (line 73 "/**", 74 "Removes route suffixes like \"-page\" or \"-dialog\" from a string.", 75 "Ensures safe handling for undefined/null inputs.", 76 "*/" cut off at bottom). Explorer sidebar: common.ts highlighted/selected, same utils folder listing as prior photos. Only tab open: common.ts (no unsaved dot). Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:21 PM 7/10/2026.
---
43:  * type ApiError = { code: string; message: string };
44:  * const [payload, apiErr] = await safeAwait<Payload, ApiError>(callApi());
45:  * if (apiErr) {
46:  *   alert(apiErr.message);
47:  * }
48:  *
49:  * @example
50:  * // Distinguishing a legitimate `undefined` result from an error
51:  * const [maybeItem, e] = await safeAwait(getOptionalItem());
52:  * if (e) {
53:  *   // handle error
54:  * } else if (maybeItem === undefined) {
55:  *   // success, but the value itself is undefined
56:  * }
57:  *
58:  * @remarks
59:  * - This function does not throw; it always resolves.
60:  * - The tuple uses `null` on the opposite side to enable simple truthy checks: `if (err) { ... }`.
61:  */
62: export async function safeAwait<T, E = unknown>(
63:     valueOrPromise: T | Promise<T>,
64: ): Promise<Result<T, E>> {
65:     try {
66:         const value = await valueOrPromise;
67:         return [value, null] as const;
68:     } catch (error) {
69:         return [null, error as E] as const;
70:     }
71: }
72:
73: /**
74:  * Removes route suffixes like "-page" or "-dialog" from a string.
75:  * Ensures safe handling for undefined/null inputs.
76:  */


========== IMG_3554.md ==========
---
photo: IMG_3554.JPG
type: vscode-code
file: aqs-web-ui/src/utils/common.ts
lines: 62-94
orientation: 180
confidence: medium
notes: Photo has motion-blur/double-exposure ghosting (consistent one-line-offset echo per row, i.e. each row's ghost text matches the row above it -- a slight scroll jitter during capture). Primary/bold text layer transcribed below; cross-validated against clean IMG_3553 for the overlapping range (62-76), which matches exactly. New content beyond IMG_3553: full stripSuffix() function (77-81) and start of sanitizeFilePath() with its JSDoc (83-94, cut off at bottom). Explorer sidebar: common.ts selected/highlighted, same utils folder listing as prior photos. Only tab open: common.ts (no unsaved dot). Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:21 PM 7/10/2026.
---
62: export async function safeAwait<T, E = unknown>(
63:     valueOrPromise: T | Promise<T>,
64: ): Promise<Result<T, E>> {
65:     try {
66:         const value = await valueOrPromise;
67:         return [value, null] as const;
68:     } catch (error) {
69:         return [null, error as E] as const;
70:     }
71: }
72:
73: /**
74:  * Removes route suffixes like "-page" or "-dialog" from a string.
75:  * Ensures safe handling for undefined/null inputs.
76:  */
77: export function stripSuffix(name: string | null | undefined): string {
78:     if (!name || typeof name !== 'string') return '';
79:
80:     return name.replace(/-(page|dialog)$/i, '');
81: }
82:
83: /**
84:  * Sanitizes a file path by removing relative directory navigation (../)
85:  * and stripping the .xml extension.
86:  *
87:  * @param path - The raw string path (e.g., "../../pol/xml/data.xml")
88:  * @returns The cleaned path (e.g., "pol/xml/data")
89:  */
90: export const sanitizeFilePath = (path: string): string => {
91:     if (!path) return '';
92:
93:     return (
94:         path (line cut off at bottom of screen)


========== IMG_3555.md ==========
---
photo: IMG_3555.JPG
type: vscode-code
file: aqs-web-ui/src/utils/common.ts
lines: 62-97
orientation: 180
confidence: high
notes: Mostly clean/sharp photo (line 97 partially obscured by a horizontal scrollbar highlight overlay, and cut off at bottom by status bar, but still legible). Line 62 "export async function safeAwait<T, E = unknown>(" appears to be a sticky-scroll header (gutter jumps from 62 straight to 65 - lines 63-64 not shown/repeated). Shows full stripSuffix() function and the start of sanitizeFilePath(), including its .replace() chain comments. Explorer sidebar: common.ts selected/highlighted, same utils folder listing as prior photos. Only tab open: common.ts (no unsaved dot). Status bar: aqs-web-ui, branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 6:21 PM 7/10/2026.
---
62: export async function safeAwait<T, E = unknown>(
(sticky-scroll header; lines 63-64 not shown)

65:     try {
66:         const value = await valueOrPromise;
67:         return [value, null] as const;
68:     } catch (error) {
69:         return [null, error as E] as const;
70:     }
71: }
72:
73: /**
74:  * Removes route suffixes like "-page" or "-dialog" from a string.
75:  * Ensures safe handling for undefined/null inputs.
76:  */
77: export function stripSuffix(name: string | null | undefined): string {
78:     if (!name || typeof name !== 'string') return '';
79:
80:     return name.replace(/-(page|dialog)$/i, '');
81: }
82:
83: /**
84:  * Sanitizes a file path by removing relative directory navigation (../)
85:  * and stripping the .xml extension.
86:  *
87:  * @param path - The raw string path (e.g., "../../pol/xml/data.xml")
88:  * @returns The cleaned path (e.g., "pol/xml/data")
89:  */
90: export const sanitizeFilePath = (path: string): string => {
91:     if (!path) return '';
92:
93:     return (
94:         path
95:             // 1. Remove all occurrences of "../" or "./"
96:             .replace(/\.\.+\//g, '')
97:             // 2. Remove the ".xml" extension (case-insensitive) at the end of the string ⟪?⟫ (partially obscured by scrollbar overlay; cut off at bottom of screen)
