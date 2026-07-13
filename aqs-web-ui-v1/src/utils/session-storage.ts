// TODO ⟪missing lines 1-8 — not captured in photos⟫
 * const userId = getItem<string>('userId', 'guest');
 * const preferences = getItem<Record<string, any>>('userPrefs');
 */
export const getItem = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : (defaultValue ?? null);
  } catch (error) {
    console.error(`Error reading from sessionStorage for key "${key}":`, error);
    return defaultValue ?? null;
  }
};

/**
 * Stores a value in sessionStorage with the specified key.
 * @template T - The type of the value being stored.
 * @param {string} key - The sessionStorage key under which to store the value.
 * @param {T} value - The value to store. Will be serialized to JSON.
 * @returns {boolean} Returns true if the value was successfully stored, false otherwise.
 * @example
 * const success = setItem('user', { name: 'John', age: 30 });
 * if (success) {
 *   console.log('User data saved');
 * }
 */
export const setItem = <T>(key: string, value: T): boolean => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to sessionStorage for key "${key}":`, error);
    return false;
  }
};

/**
 * Removes an item from sessionStorage by key.
 * @param {string} key - The key of the item to remove from sessionStorage.
 * @returns {boolean} Returns true if the item was successfully removed, false if an error occurred.
 * @example
 * const success = removeItem('userId');
 * if (success) {
 *   console.log('User data cleared'); ⟪?⟫
 * } ⟪?⟫
 */ ⟪?⟫
export const removeItem = (key: string): boolean => {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from sessionStorage for key "${key}":`, error);
    return false;
  }
};

/**
 * Clears all data stored in the browser's `sessionStorage`.
 *
 * Attempts to remove all session-scoped key/value pairs and returns whether
 * the operation succeeded.
 *
 * @returns `true` if `sessionStorage` was cleared successfully; otherwise `false` if an error occurred.
 */
export const clearSessionStorage = (): boolean => {
  try {
    sessionStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
    return false;
  }
};
