/**
 * ErrorHandlers - Centralized error handling with dialog integration
 *
 * Features:
 * - Network error handling with retry suggestions
 * - Validation error handling using ZodErrorFormatter
 * - Dialog integration for user notifications
 * - Comprehensive logging for all error types
 * - Type-safe error handling
 *
 * @example
 * ```tsx
 * const { onOpenDialog } = useDialogStore();
 *
 * try {
 *   await fetchData();
 * } catch (error) {
 *   await ErrorHandlers.handleNetworkError(error, onOpenDialog, 'fetchUserData');
 * }
 * ```
 */
import { ZodError } from 'zod';
import { createLogger } from '@/utils/logger-builder';
import { ZodErrorFormatter } from '@/utils/zod-error-formatter';

import type { MessageType } from '@/components/dialog';

// ------------------------------------------
// Types
// ------------------------------------------


/**
 * Dialog show function signature from useDialogStore⟪?⟫
 */
export interface ShowDialogFunction {
    (options: {
        message: React.ReactNode;
        title?: string;
        messageType?: MessageType;
        dialogType?: 'ok' | 'yesno' | 'yesnocancel';
        onOk?: () => void;
        onYes?: () => void;
        onNo?: () => void;
        onCancel?: () => void;
    }): void;
}
interface NetworkErrorDetails {
    status?: number;
    statusText?: string;
    url?: string;
    method?: string;
}

const logger = createLogger({ feature: 'error-handling', component: 'error-handlers' });


// ------------------------------------------
// ErrorHandlers Class
// ------------------------------------------

export class ErrorHandlers {
    /**
     * Handle network errors with user notification and logging
     * Provides context-aware error messages based on HTTP status codes
     *
     * @param error - Error object from failed network request
     * @param showDialog - Function to display dialog (from useDialogStore)
     * @param context - Context string describing the operation (e.g., 'fetchPageBuild', 'submitLogin')
     */
    static async handleNetworkError(
        error: unknown,
        showDialog: ShowDialogFunction,
        context: string,
    ): Promise<void> {
        const details = this.extractNetworkErrorDetails(error);
        const userMessage = this.formatNetworkErrorMessage(details);
        const errorType = this.getNetworkErrorType(details);

        // Log detailed error information
        logger.error(`Network error in ${context}`, error as Error, {
            context,
            ...details,
            errorType,
        });

        // Show user-friendly dialog
        showDialog({
            message: userMessage,
            messageType: errorType,
            dialogType: 'ok',
            title: 'Network Error',
        });
    }

    /**
     * Handle validation errors with formatted messages
     * Converts Zod validation errors to user-friendly format
     *
     * @param error - ZodError instance from failed validation
     * @param showDialog - Function to display dialog (from useDialogStore)
     * @param context - Context string describing what was being validated (e.g., 'PageBuildResponse')
     */
    static handleValidationError(
        error: ZodError,
        showDialog: ShowDialogFunction,
        context: string,
    ): void {
        if (!error || !(error instanceof ZodError)) {
            logger.error('Invalid error passed to handleValidationError', error as Error, {
                context,
            });

            showDialog({
                message: 'An unexpected validation error occurred. Please try again.',
                messageType: 'error',
                dialogType: 'ok',
                title: 'Validation Error',
            });
            return;
        }

        // Log validation error with full details
        ZodErrorFormatter.logValidationError(error, context);

        // Format user-friendly message
        const userMessage = ZodErrorFormatter.toUserMessage(error);

        // Show dialog with formatted message
        showDialog({
            message: userMessage,
            messageType: 'error',
            dialogType: 'ok',
            title: 'Validation Error',
        });
    }

    /**
     * Handle generic errors with fallback messaging
     * Use when error type is unknown or not network/validation related
     *
     * @param error - Any error object
     * @param showDialog - Function to display dialog (from useDialogStore)
     * @param context - Context string describing the operation
     * @param userMessage - Optional custom user-facing message
     */
    static handleGenericError(
        error: unknown,
        showDialog: ShowDialogFunction,
        context: string,
        userMessage?: string,
    ): void {
        const message =
            userMessage || 'An unexpected error occurred. Please try again or contact support.';

        logger.error(`Generic error in ${context}`, error as Error, {
            context,
            errorType: 'generic',
        });

        showDialog({
            message,
            messageType: 'error',
            dialogType: 'ok',
            title: 'Error',
        });
    }

    // ----------------------------------------
    // Private Helper Methods
    // ----------------------------------------

    /**
     * Extract network error details from various error formats
     */
    private static extractNetworkErrorDetails(error: unknown): NetworkErrorDetails {
        const details: NetworkErrorDetails = {};

        // Handle Axios errors
        if (this.isAxiosError(error)) {
            details.status = error.response?.status;
            details.statusText = error.response?.statusText;
            details.url = error.config?.url;
            details.method = error.config?.method?.toUpperCase();
        }
        // Handle Fetch API errors
        else if (error instanceof Response) {
            details.status = error.status;
            details.statusText = error.statusText;
            details.url = error.url;
        }
        // Handle generic errors with status
        else if (
            error &&
            typeof error === 'object' &&
            'status' in error &&
            typeof error.status === 'number'
        ) {
            details.status = error.status;
        }

        return details;
    }

    /**
     * Format network error into user-friendly message
     */
    private static formatNetworkErrorMessage(details: NetworkErrorDetails): string {
        const { status, statusText } = details;

        if (!status) {
            return 'Network connection failed. Please check your internet connection and try again.';
        }

        // 4xx errors - client errors
        if (status >= 400 && status < 500) {
            switch (status) {
                case 400:
                    return 'Invalid request. Please check your input and try again.';
                case 401:
                    return 'Your session has expired. Please log in again.';
                case 403:
                    return 'You do not have permission to perform this action.';
                case 404:
                    return 'The requested resource was not found. Please contact support if this persists.';
                case 408:
                    return 'Request timeout. Please try again.';
                case 429:
                    return 'Too many requests. Please wait a moment and try again.';
                default:
                    return `Request failed: ${statusText || 'Client error'}. Please try again.`;
            }
        }

        // 5xx errors - server errors
        if (status >= 500) {
            switch (status) {
                case 500:
                    return 'Server error occurred. Please try again or contact support if this persists.';
                case 502:
                    return 'Service temporarily unavailable. Please try again in a few moments.';
                case 503:
                    return 'Service is currently unavailable. Please try again later.';
                case 504:
                    return 'Request timeout. The server took too long to respond. Please try again.';
                default:
                    return `Server error: ${statusText || 'Unknown'}. Please try again or contact support.`;
            }
        }

        // Other status codes
        return `Request failed with status ${status}. Please try again or contact support.`;
    }

    /**
     * Determine message type based on error details
     */
    private static getNetworkErrorType(details: NetworkErrorDetails): MessageType {
        const { status } = details;

        if (!status) {
            return 'error';
        }

        // 401/403 are authentication/authorization issues
        if (status === 401 || status === 403) {
            return 'warning';
        }

        // 4xx are client errors (user can potentially fix)
        if (status >= 400 && status < 500) {
            return 'warning';
        }

        // 5xx are server errors
        if (status >= 500) {
            return 'error';
        }

        return 'error';
    }

    /**
     * Type guard for Axios errors
     */
    private static isAxiosError(error: unknown): error is {
        response?: { status: number; statusText: string };
        config?: { url: string; method: string };
    } {
        return (
            error !== null &&
            typeof error === 'object' &&
            'isAxiosError' in error &&
            error.isAxiosError === true
        );
    }
    // TODO ⟪missing lines 297-end — not captured in photos (likely closing brace for ErrorHandlers class, possibly more)⟫
