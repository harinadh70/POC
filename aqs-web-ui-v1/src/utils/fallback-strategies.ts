/**
 * FallbackStrategies - Resilient operations with caching and fallback support
 *
 * Features:
 * - Cache last successful responses
 * - Return cached value or default on failure
 * - Automatic cache invalidation
 * - Logger integration for fallback tracking
 * - Type-safe generic operations
 *
 * @example
 * ```tsx
 * const menuData = await FallbackStrategies.withFallback(
 *   async () => fetchMenuData(sessionInfo),
 *   'menu-data',
 *   [] // default empty array
 * );
 * ```
 */

import { createLogger } from '@/utils/logger-builder';

const logger = createLogger({ feature: 'resilience', component: 'fallback-strategies' });

// ------------------------------------------
// Types
// ------------------------------------------

interface CacheEntry<T> {
    value: T;
    timestamp: number;
    key: string;
}

interface FallbackResult<T> {
    value: T;
    usedFallback: boolean;
    usedCache: boolean;
    error?: Error;
}

// ------------------------------------------
// Cache Configuration
// ------------------------------------------

const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_CACHE_SIZE = 50; // Maximum number of cached entries

// ------------------------------------------
// Cache Storage
// ------------------------------------------

class CacheStorage {
    private cache = new Map<string, CacheEntry<unknown>>();

    set<T>(key: string, value: T): void {
        // Implement simple LRU by removing oldest entry if at capacity
        if (this.cache.size >= MAX_CACHE_SIZE) {
            const oldestKey = this.cache.keys().next().value;
            if (oldestKey) {
                this.cache.delete(oldestKey);
            }
        }
        this.cache.set(key, {
            value,
            timestamp: Date.now(),
            key,
        });
    }


    get<T>(key: string, ttl: number = DEFAULT_CACHE_TTL): T | null {
        const entry = this.cache.get(key) as CacheEntry<T> | undefined;

        if (!entry) {
            return null;
        }

        // Check if cache entry is still valid
        const isExpired = Date.now() - entry.timestamp > ttl;

        if (isExpired) {
            this.cache.delete(key);
            return null;
        }

        return entry.value;
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    delete(key: string): boolean {
        return this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    getSize(): number {
        return this.cache.size;
    }

    getKeys(): string[] {
        return Array.from(this.cache.keys());
    }
}

// Global cache instance
const cache = new CacheStorage();

// ------------------------------------------
// FallbackStrategies Class
// ------------------------------------------

export class FallbackStrategies {
    /**
     * Execute operation with fallback support
     * Caches successful responses and returns cached/default value on failure
     *
     * @param operation - Async operation to execute
     * @param fallbackKey - Unique key for caching (e.g., 'menu-data', 'user-profile')
     * @param defaultValue - Default value to return if operation fails and no cache exists
     * @param options - Additional options for cache TTL and retry behavior
     * @returns Operation result, cached value, or default value
     *
     * @example
     * ```tsx
     * const data = await FallbackStrategies.withFallback(
     *   () => fetchData(),
     *   'my-data-key',
     *   { default: 'value' }
     * );
     * ```
     */
    static async withFallback<T>(
        operation: () => Promise<T>,
        fallbackKey: string,
        defaultValue?: T,
        options?: {
            cacheTTL?: number;
            logContext?: string;
            suppressErrors?: boolean;
        }
    ): Promise<T> {
        const {
            cacheTTL = DEFAULT_CACHE_TTL,
            logContext = fallbackKey,
            suppressErrors = false,
        } = options || {};

        try {
            // Attempt to execute operation
            const result = await operation();

            // Cache successful result
            cache.set(fallbackKey, result);

            logger.debug(`Operation succeeded for ${fallbackKey}`, {
                fallbackKey,
                context: logContext,
                cached: true,
            });

            return result;
        } catch (error) {
            // Log the failure
            logger.warn(`Operation failed for ${fallbackKey}, attempting fallback`, {
                fallbackKey,
                context: logContext,
                error: error instanceof Error ? error.message : String(error),
            });

            // Try to get cached value
            const cachedValue = cache.get<T>(fallbackKey, cacheTTL);

            if (cachedValue !== null) {
                logger.info(`Using cached value for ${fallbackKey}`, {
                    fallbackKey,
                    context: logContext,
                    source: 'cache',
                });

                return cachedValue;
            }
            // If no cache and default value provided, use default
            if (defaultValue !== undefined) {
                logger.info(`Using default value for ${fallbackKey}`, {
                    fallbackKey,
                    context: logContext,
                    source: 'default',
                });

                return defaultValue;
            }

            // No fallback available, rethrow error
            logger.error(`No fallback available for ${fallbackKey}`, error as Error, {
                fallbackKey,
                context: logContext,
            });

            if (!suppressErrors) {
                throw error;
            }

            // If suppressErrors is true and no default, return null as last resort
            // This is type-unsafe but prevents crashes in critical paths
            return null as T;
        }
    }


    /**
     * Execute operation with fallback and return detailed result
     * Includes metadata about whether fallback was used
     *
     * @param operation - Async operation to execute
     * @param fallbackKey - Unique key for caching
     * @param defaultValue - Default value to return on failure
     * @param options - Additional options
     * @returns Result object with value and metadata
     */
    static async withFallbackDetailed<T>(
        operation: () => Promise<T>,
        fallbackKey: string,
        defaultValue?: T,
        options?: {
            cacheTTL?: number;
            logContext?: string;
        }
    ): Promise<FallbackResult<T>> {
        const { cacheTTL = DEFAULT_CACHE_TTL, logContext = fallbackKey } = options || {};

        try {
            const result = await operation();
            cache.set(fallbackKey, result);
            return {
                value: result,
                usedFallback: false,
                usedCache: false,
            };
        } catch (error) {
            logger.warn(`Operation failed for ${fallbackKey}`, {
                fallbackKey,
                context: logContext,
            });

            const cachedValue = cache.get<T>(fallbackKey, cacheTTL);
            if (cachedValue !== null) {
                return {
                    value: cachedValue,
                    usedFallback: true,
                    usedCache: true,
                    error: error as Error,
                };
            }

            if (defaultValue !== undefined) {
                return {
                    value: defaultValue,
                    usedFallback: true,
                    usedCache: false,
                    error: error as Error,
                };
            }
            throw error;
        }
    }
    // TODO ⟪missing lines 272-274 — not captured in photos⟫

    /**
     * Manually set cache value for a key
     * Useful for preloading cache or manual cache management
     *
     * @param key - Cache key
     * @param value - Value to cache
     */
    static setCache<T>(key: string, value: T): void {
        cache.set(key, value);
        logger.debug(`Cache manually set for ${key}`, { key });
    }

    /**
     * Get cached value without executing operation
     *
     * @param key - Cache key
     * @param ttl - Optional custom TTL for this retrieval
     * @returns Cached value or null if not found/expired
     */
    static getCache<T>(key: string, ttl?: number): T | null {
        return cache.get<T>(key, ttl);
    }

    /**
     * Check if cache has valid entry for key
     *
     * @param key - Cache key to check
     * @returns True if cache has valid entry
     */
    static hasCache(key: string): boolean {
        return cache.has(key);
    }

    /**
     * Invalidate (delete) cache entry for specific key
     *
     * @param key - Cache key to invalidate
     * @returns True if entry was deleted
     */
    static invalidateCache(key: string): boolean {
        const deleted = cache.delete(key);
        if (deleted) {
            logger.debug(`Cache invalidated for ${key}`, { key });
        }
        return deleted;
    }

    /**
     * Clear all cache entries
     * Use with caution - clears entire cache
     */
    static clearAllCache(): void {
        const size = cache.getSize();
        cache.clear();
        logger.info('All cache cleared', { previousSize: size });
    }

    /**
     * Get cache statistics for monitoring
     *
     *
     * @returns Cache statistics object
     */
    static getCacheStats(): {
        size: number;
        maxSize: number;
        keys: string[];
    } {
        return {
            size: cache.getSize(),
            maxSize: MAX_CACHE_SIZE,
            keys: cache.getKeys(),
        };
    }

}
