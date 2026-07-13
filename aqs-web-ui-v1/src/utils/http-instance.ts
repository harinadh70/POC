import axios from 'axios';

// types
import type { AxiosRequestConfig, AxiosError } from 'axios';
import type { RetryOptions } from '@/types';

// utils
import { createFeatureLogger } from '@utils/logger-builder';
import { ApiCache } from '@/utils/api-cache';
import { perfMonitor } from '@/utils/performance-monitor';
import { removeItem, setItem } from '@utils/local-storage';

// Create logger for HTTP requests
const logger = createFeatureLogger('api', 'http-instance');

// --------------------------------------------
// ApiError Class
// --------------------------------------------

/**
 * Custom API Error class with enhanced context and retry information
 */
export class ApiError extends Error {
    statusCode?: number;
    isRetryable: boolean;
    context?: Record<string, unknown>;

    constructor(
        message: string,
        statusCode?: number,
        isRetryable = false,
        context?: Record<string, unknown>,
    ) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.isRetryable = isRetryable;
        this.context = context;

        // Maintains proper stack trace for where error was thrown
        if (typeof (Error as any).captureStackTrace === 'function') {
            (Error as any).captureStackTrace(this, ApiError);
        }
    }

    /**
     * Create ApiError from Axios error with user-friendly messages
     */
    static fromAxiosError(error: AxiosError): ApiError {
        const statusCode = error.response?.status;
        const responseData = error.response?.data as any;

        // Determine user-friendly message
        let message = 'An unexpected error occurred';
        if (responseData?.message) {
            message = responseData.message;
        } else if (statusCode) {
            switch (statusCode) {
                case 400:
                    message = 'Invalid request. Please check your input.';
                    break;
                case 401:
                    message = 'Unauthorized. Please log in again.';
                    break;
                case 403:
                    message = 'Access denied. You do not have permission.';
                    break;
                case 404:
                    message = 'Resource not found.';
                    break;
                case 408:
                    message = 'Request timeout. Please try again.';
                    break;
                case 409:
                    message = 'Conflict. The resource has been modified.';
                    break;
                case 422:
                    message = 'Validation failed. Please check your input.';
                    break;
                case 429:
                    message = 'Too many requests. Please slow down.';
                    break;
                case 500:
                    message = 'Server error. Please try again later.';
                    break;
                case 502:
                case 503:
                case 504:
                    message = 'Service unavailable. Please try again later.';
                    break;
            }
        } else if (error.code === 'ECONNABORTED') {
            message = 'Request timeout. Please check your connection.';
        } else if (error.code === 'ERR_NETWORK') {
            message = 'Network error. Please check your connection.';
        }

        // Determine if error is retryable
        const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
        const isRetryable =
            (statusCode && retryableStatusCodes.includes(statusCode)) ||
            error.code === 'ECONNABORTED' ||
            error.code === 'ERR_NETWORK';

        // Build context object
        const context: Record<string, unknown> = {
            url: error.config?.url,
            method: error.config?.method?.toUpperCase(),
            statusCode,
            errorCode: error.code,
        };

        if (responseData?.errors) {
            context.details = responseData.errors;
        }

        return new ApiError(message, statusCode, isRetryable, context);
    }
}

// ------------------------------------------------------------------

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Axios Instace ---
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// --- Request Interceptor ---
api.interceptors.request.use(
    (config) => {
        logger.debug('Outgoing request', {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
        });
        return config;
    },
    (error) => {
        logger.error('Request interceptor error', error as Error);
        return Promise.reject(error);
    },
);

// --- Response Interceptor ---
api.interceptors.response.use(
    (response) => {
        logger.debug('Incoming response', {
            status: response.status,
            url: response.config.url,
            data: response.data,
        });
        return response;
    },
    (error: AxiosError) => {
        // Handle 401 errors immediately
        if (error.response?.status === 401) {
            logger.debug('401 response received', {
                url: error.config?.url,
                skipAuthInterceptor: error.config?.skipAuthInterceptor,
            });
            url: error.config?.url,
            // Skip interceptor for SSO check requests (expected to fail)
            if (error.config?.skipAuthInterceptor) {
                logger.debug('401 from SSO check (expected), skipping interceptor');
                return Promise.reject(ApiError.fromAxiosError(error));
            }

            logger.warn('401 Unauthorized - Session expired, clearing session');
        }
        // Clear session from localStorage using utility
        const removed = removeItem('sessionInformation');
        if (!removed) {
            logger.error('Failed to clear session from localStorage');
        }
        if (!removed) {
            // Set skipSSOCheck flag to prevent SSO loop on login page
            setItem('skipSSOCheck', true);

            // Return rejected promise with user-friendly error (React Router will handle navigation)
            return Promise.reject(
                new ApiError('Your session has expired. Please log in again.', 401, false, {
                    sessionCleared: true,
                }),
            );
        }

        // Convert to ApiError for better error handling
        const apiError = ApiError.fromAxiosError(error);
        logger.error('Response interceptor error', apiError, {
            statusCode: apiError.statusCode,
            isRetryable: apiError.isRetryable,
            context: apiError.context,
        });
        return Promise.reject(apiError);
    },
);

// --- Base Query ---

/**
 * Enhanced base query with caching and performance monitoring
 *
 * @param config - Axios request configuration
 * @param retryOptions - Retry configuration for failed requests
 * @param cache - Optional ApiCache instance for caching responses
 * @returns Promise resolving to response data
 */
export const baseQuery = async <T>(
    config: AxiosRequestConfig,
    retryOptions: RetryOptions = {},
    cache?: ApiCache,
): Promise<T> => {
    const { retries = 0, retryDelay = 500, retryOn = [500, 502, 503, 504] } = retryOptions;
    const cacheKey =
    // Generate cache key if cache is provided (only for GET requests)
    const cacheKey =
        cache && config.method?.toUpperCase() === 'GET'
            ? `${config.url}?${JSON.stringify(config.params || {})}`
            : null;

    // Check cache before making request
    if (cacheKey && cache) {
        const cachedData = cache.get<T>(
            config.method?.toUpperCase() || 'GET',
            config.url || '',
            config.params || {},
        );
        if (cachedData) {
            logger.debug('Cache hit', { url: config.url, key: cacheKey });
            return cachedData;
        }
        logger.debug('Cache miss', { url: config.url, key: cacheKey });
    }

    // Start performance measurement
    const requestId = `${config.method?.toUpperCase()}_${config.url}_${Date.now()}`;
    perfMonitor.start(requestId, { method: config.method, url: config.url });

    let attempt = 0;
    perfMonitor.start(requestId, { method: config.method, url: config.url });
    while (true) {
        try {
            const response = await api.request<T>(config);

            // End performance measurement
            perfMonitor.end(requestId);
            logger.debug('Request completed', {
                url: config.url,
                attempt: attempt > 0 ? attempt : undefined,
            });

            // Store in cache if cache is provided
            if (cacheKey && cache) {
                cache.set(
                    config.method?.toUpperCase() || 'GET',
                    config.url || '',
                    config.params || {},
                    response.data,
                );
                logger.debug('Response cached', { url: config.url, key: cacheKey });
            }

            // Return just the data
            return response.data;
        } catch (error) {
            // Convert to ApiError if not already
            const apiError =
                error instanceof ApiError ? error : ApiError.fromAxiosError(error as AxiosError);

            // Check if should retry
            const isRetryable =
                apiError.isRetryable &&
                apiError.statusCode &&
                retryOn.includes(apiError.statusCode);

            if (attempt < retries && isRetryable) {
                attempt++;
                logger.warn('Retrying request', {
                    attempt,
                    maxRetries: retries,
                    url: config.url,
                    statusCode: apiError.statusCode,
                });
                await wait(retryDelay);
                continue;
            }

            // End performance measurement with error
            perfMonitor.end(requestId);

            // Log final error
            logger.error('Request failed', apiError, {
                url: config.url,
                attempts: attempt + 1,
                statusCode: apiError.statusCode,
                context: apiError.context,
            });

            // Throw ApiError for upstream handling
            throw apiError;
        }
    }
};
