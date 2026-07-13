export type Result<T, E = unknown> = readonly [T, null] | readonly [null, E];

/**
 * Awaits a value or promise and returns a tuple with either the resolved value or the error,
 * avoiding exceptions (i.e., "await without throw").
 *
 * This is useful for flattening async control flow without `try/catch`:
 *
 * ```ts
 * const [data, err] = await safeAwait(fetchData());
 * if (err) {
 *   // handle error
 *   console.error(err);
 * } else {
 *   // use data
 *   console.log(data);
 * }
 * ```
 *
 * The return type is a discriminated tuple:
 * - On success: `[value, null]`
 * - On failure: `[null, error]`
 *
 * @template T The resolved value type of the promise (or the plain value).
 * @template E The error type (defaults to `unknown`). You may specify a concrete type if your code normalize
 *
 * @param {T | Promise<T>} valueOrPromise A value or a promise to await. Plain values are accepted for conven
 * @returns {Promise<readonly [T, null] | readonly [null, E]>}
 * A promise that always resolves to a tuple: `[value, null]` on success, or `[null, error]` on failure.
 *
 * @example
 * // Basic usage with unknown error type
 * const [user, err] = await safeAwait(fetchUser());
 * if (err) {
 *   // err is unknown
 *   console.error('Failed:', err);
 * } else {
 *   console.log('User:', user);
 * }
 *
 * @example
 * // With a specific error type
 * type ApiError = { code: string; message: string };
 * const [payload, apiErr] = await safeAwait<Payload, ApiError>(callApi());
 * if (apiErr) {
 *   alert(apiErr.message);
 * }
 *
 * @example
 * // Distinguishing a legitimate `undefined` result from an error
 * const [maybeItem, e] = await safeAwait(getOptionalItem());
 * if (e) {
 *   // handle error
 * } else if (maybeItem === undefined) {
 *   // success, but the value itself is undefined
 * }
 *
 * @remarks
 * - This function does not throw; it always resolves.
 * - The tuple uses `null` on the opposite side to enable simple truthy checks: `if (err) { ... }`.
 */
export async function safeAwait<T, E = unknown>(
    valueOrPromise: T | Promise<T>,
): Promise<Result<T, E>> {
    try {
        const value = await valueOrPromise;
        return [value, null] as const;
    } catch (error) {
        return [null, error as E] as const;
    }
}

/**
 * Removes route suffixes like "-page" or "-dialog" from a string.
 * Ensures safe handling for undefined/null inputs.
 */
export function stripSuffix(name: string | null | undefined): string {
    if (!name || typeof name !== 'string') return '';

    return name.replace(/-(page|dialog)$/i, '');
}

/**
 * Sanitizes a file path by removing relative directory navigation (../)
 * and stripping the .xml extension.
 *
 * @param path - The raw string path (e.g., "../../pol/xml/data.xml")
 * @returns The cleaned path (e.g., "pol/xml/data")
 */
export const sanitizeFilePath = (path: string): string => {
    if (!path) return '';

    return (
        path
            // 1. Remove all occurrences of "../" or "./"
            .replace(/\.\.+\//g, '')
            // 2. Remove the ".xml" extension (case-insensitive) at the end of the string ⟪?⟫
// TODO ⟪missing lines 98+ — not captured in photos; sanitizeFilePath() body/closing and any further file content beyond this point were never photographed⟫
