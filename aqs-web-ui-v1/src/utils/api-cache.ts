/**
 * API Cache - TTL-based caching with LRU eviction
 *
 * Features:
 * - Builder pattern for flexible configuration
 * - Time-To-Live (TTL) based cache expiration
 * - Least Recently Used (LRU) eviction when max size reached
 * - Automatic cache key generation from HTTP request parameters
 * - Cache invalidation by pattern matching
 * - TypeScript strict mode with full type safety
 *
 * @example
 * ```tsx
 * const cache = new ApiCacheBuilder()
 *   .withTTL(5 * 60 * 1000) // 5 minutes
 *   .withMaxSize(100)
 *   .withKeyPrefix('api')
 *   .build();
 *
 * // Set cache entry
 * cache.set('GET', '/users', {}, { data: [...] });
 *
 * // Get cache entry
 * const cached = cache.get('GET', '/users', {});
 * if (cached) {
 *   console.log('Cache hit:', cached);
 * }
 *
 * // Invalidate by pattern
 * cache.invalidate('/users');
 * ```
 */

import { LoggerBuilder } from '@/utils/logger-builder';

// ----------------------------------------
// Types
// ----------------------------------------

interface CacheEntry<T> {
  value: T;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

interface CacheConfig {
  ttl: number;             // Time-to-live in milliseconds
  maxSize: number;         // Maximum number of entries
  keyPrefix: string;       // Prefix for all cache keys
  enableLogging: boolean;  // Enable debug logging
}

export interface CacheStats {
  size: number;
  maxSize: number;
  hits: number;
  misses: number;
  evictions: number;
  hitRate: number;
}

// ----------------------------------------
// API Cache Implementation
// ----------------------------------------

export class ApiCache {
  private cache: Map<string, CacheEntry<unknown>>;
  private readonly config: CacheConfig;
  private readonly logger = new LoggerBuilder()
    .withContext({ module: 'ApiCache' })
    .withLevel('debug')
    .build();

  private stats = {
    hits: 0,
    misses: 0,
    evictions: 0,
  };

  constructor(config: CacheConfig) {
    this.config = config;
    this.cache = new Map();

    if (this.config.enableLogging) {
      this.logger.debug('ApiCache initialized', {
        ttl: config.ttl,
        maxSize: config.maxSize,
        keyPrefix: config.keyPrefix,
      });
    }
  }

  /**
   * Generate cache key from HTTP method, URL, and parameters
   */
  private generateKey(method: string, url: string, params: Record<string, unknown> = {}): string {
    const paramsStr = Object.keys(params).length > 0 ? JSON.stringify(params) : '';
    return `${this.config.keyPrefix}:${method}:${url}:${paramsStr}`;
  }

  /**
   * Check if cache entry is expired
   */
  private isExpired(entry: CacheEntry<unknown>): boolean {
    const now = Date.now();
    return now - entry.timestamp > this.config.ttl;
  }

  /**
   * Evict least recently used entry
   */
  private evictLRU(): void {
    let lruKey: string | null = null;
    let lruTime = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < lruTime) {
        lruTime = entry.lastAccessed;
        lruKey = key;
      }
    }

    if (lruKey) {
      this.cache.delete(lruKey);
      this.stats.evictions++;

      if (this.config.enableLogging) {
        this.logger.debug('LRU eviction', { key: lruKey, evictions: this.stats.evictions });
      }
    }
  }

  /**
   * Clean up expired entries
   */
  private cleanupExpired(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.config.ttl) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => {
      this.cache.delete(key);
      if (this.config.enableLogging) {
        this.logger.debug('Expired entry removed', { key });
      }
    });
  }

  /**
   * Get cached value
   */
  get<T>(method: string, url: string, params: Record<string, unknown> = {}): T | null {
    const key = this.generateKey(method, url, params);
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) {
      this.stats.misses++;
      if (this.config.enableLogging) {
        this.logger.debug('Cache miss', { key, misses: this.stats.misses });
      }
      return null;
    }

    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.stats.misses++;
      if (this.config.enableLogging) {
        this.logger.debug('Cache miss (expired)', {
          key,
          age: Date.now() - entry.timestamp,
        });
      }
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    this.stats.hits++;

    if (this.config.enableLogging) {
      this.logger.debug('Cache hit', {
        key,
        accessCount: entry.accessCount,
        age: Date.now() - entry.timestamp,
        hits: this.stats.hits,
      });
    }

    return entry.value;
  }

  /**
   * Set cached value
   */
  set<T>(method: string, url: string, params: Record<string, unknown> = {}, value: T): void {
    // Clean up expired entries before adding new one
    this.cleanupExpired();

    // Evict LRU if cache is full
    if (this.cache.size >= this.config.maxSize) {
      this.evictLRU();
    }

    const key = this.generateKey(method, url, params);
    const now = Date.now();

    const entry: CacheEntry<T> = {
      value,
      timestamp: now,
      accessCount: 0,
      lastAccessed: now,
    };

    this.cache.set(key, entry as CacheEntry<unknown>);

    if (this.config.enableLogging) {
      this.logger.debug('Cache set', { key, size: this.cache.size });
    }
  }

  /**
   * Check if key exists in cache and is not expired
   */
  has(method: string, url: string, params: Record<string, unknown> = {}): boolean {
    const key = this.generateKey(method, url, params);
    const entry = this.cache.get(key);

    if (!entry) {
      return false;
    }
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Delete specific cache entry
   */
  delete(method: string, url: string, params: Record<string, unknown> = {}): boolean {
    const key = this.generateKey(method, url, params);
    const deleted = this.cache.delete(key);

    if (deleted && this.config.enableLogging) {
      this.logger.debug('Cache entry deleted', { key });
    }

    return deleted;
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    this.stats.hits = 0;
    this.stats.misses = 0;
    this.stats.evictions = 0;

    if (this.config.enableLogging) {
      this.logger.debug('Cache cleared', { entriesCleared: size });
    }
  }

  /**
   * Invalidate cache entries matching URL pattern
   */
  invalidate(urlPattern: string): number {
    const keysToDelete: string[] = [];

    for (const key of this.cache.keys()) {
      // Extract URL from key (format: prefix:method:url:params)
      const parts = key.split(':');
      if (parts.length >= 3) {
        const url = parts[2];
        if (url.includes(urlPattern)) {
          keysToDelete.push(key);
        }
      }
    }

    keysToDelete.forEach((key) => this.cache.delete(key));

    if (this.config.enableLogging) {
      this.logger.debug('Cache invalidated by pattern', {
        pattern: urlPattern,
        entriesInvalidated: keysToDelete.length,
      });
    }

    return keysToDelete.length;
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate = totalRequests > 0 ? this.stats.hits / totalRequests : 0;

    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      hits: this.stats.hits,
      misses: this.stats.misses,
      evictions: this.stats.evictions,
      hitRate: Math.round(hitRate * 10000) / 100, // Percentage with 2 decimals
    };
  }
}

// ----------------------------------------
// Builder Pattern
// ----------------------------------------

export class ApiCacheBuilder {
  private config: CacheConfig = {
    ttl: 5 * 60 * 1000, // Default: 5 minutes
    maxSize: 100, // Default: 100 entries
    keyPrefix: 'api-cache', // Default prefix
    enableLogging: false, // Default: disabled in production
  };

  /**
   * Set time-to-live for cache entries
   * @param ttl Time in milliseconds
   */
  withTTL(ttl: number): this {
    if (ttl <= 0) {
      throw new Error('TTL must be greater than 0');
    }
    this.config.ttl = ttl;
    return this;
  }

  /**
   * Set maximum cache size
   * @param maxSize Maximum number of entries
   */
  withMaxSize(maxSize: number): this {
    if (maxSize <= 0) {
      throw new Error('Max size must be greater than 0');
    }
    this.config.maxSize = maxSize;
    return this;
  }

  /**
   * Set cache key prefix
   * @param prefix Prefix for all cache keys
   */
  withKeyPrefix(prefix: string): this {
    this.config.keyPrefix = prefix;
    return this;
  }

  /**
   * Enable debug logging
   */
  enableLogging(): this {
    this.config.enableLogging = true;
    return this;
  }

  /**
   * Disable debug logging
   */
  disableLogging(): this {
    this.config.enableLogging = false;
    return this;
  }

  /**
   * Build and return ApiCache instance
   */
  build(): ApiCache {
    return new ApiCache(this.config);
  }
}

// ---------------------------------------------
// Default Export
// ---------------------------------------------

export default ApiCacheBuilder;
