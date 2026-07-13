/**
 * Retrieves an item from localStorage with type safety and error handling.
 * @template T - The type of the value to retrieve.
 * @param {string} key - The key of the item to retrieve from localStorage.
 * @param {T} [defaultValue] - Optional default value to return if the key doesn't exist.
 * @returns {T | null} The parsed value from localStorage, the default value, or null if neither is available
 * @throws Does not throw, errors are caught and logged to console.
 * @example
 * const userId = getItem<string>('userId', 'guest');
 * const preferences = getItem<Record<string, any>>('userPrefs');
 */
export const getItem = <T>(key: string, defaultValue?: T): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : (defaultValue ?? null);
    } catch (error) {
        console.error(`Error reading from localStorage for key "${key}":`, error);
        return defaultValue ?? null;
    }
};

/**
 * Stores a value in localStorage with the specified key.
 * @template T - The type of the value being stored.
 * @param {string} key - The localStorage key under which to store the value.
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
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error writing to localStorage for key "${key}":`, error);
        return false;
    }
};

/**
 * Removes an item from localStorage by key.
 * @param {string} key - The key of the item to remove from localStorage.
 * @returns {boolean} Returns true if the item was successfully removed, false if an error occurred.
 * @example
 * const success = removeItem('userId');
 * if (success) {
 *   console.log('User data cleared');
 * }
 */
export const removeItem = (key: string): boolean => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing from localStorage for key "${key}":`, error);
        return false;
    }
};
