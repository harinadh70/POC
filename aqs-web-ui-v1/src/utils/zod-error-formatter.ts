/**
 * ZodErrorFormatter - Convert Zod validation errors to user-friendly messages
 *
 * Features:
 * - Maps Zod error codes to readable messages
 * - Context-aware error logging
 * - Integration with logger-builder
 * - Handles nested validation errors
 * - Type-safe error formatting
 *
 * @example
 * ```tsx
 * try {
 *   const parsed = schema.parse(data);
 * } catch (error) {
 *   if (error instanceof ZodError) {
 *     const message = ZodErrorFormatter.toUserMessage(error);
 *     ZodErrorFormatter.logValidationError(error, 'PageBuildResponse');
 *   }
 * }
 * ```
 */

import { ZodError, type ZodIssue } from 'zod';
import { createLogger } from '@/utils/logger-builder';

const logger = createLogger({ feature: 'validation', component: 'zod-error-formatter' });

// --------------------------------------------
// Types
// --------------------------------------------

interface FormattedError {
  path: string;
  message: string;
  code: string;
}

// --------------------------------------------
// Error Code Mapping
// --------------------------------------------

const ERROR_CODE_MESSAGES: Record<string, string> = {
  invalid_type: 'Invalid data type',
  invalid_literal: 'Invalid value',
  custom: 'Validation failed',
  invalid_union: 'Invalid value format',
  invalid_union_discriminator: 'Invalid data structure',
  invalid_enum_value: 'Invalid selection',
  unrecognized_keys: 'Unexpected fields',
  invalid_arguments: 'Invalid parameters',
  invalid_return_type: 'Invalid response format',
  invalid_date: 'Invalid date format',
  invalid_string: 'Invalid text format',
  too_small: 'Value is too small',
  too_big: 'Value is too large',
  invalid_intersection_types: 'Data structure mismatch',
  not_multiple_of: 'Invalid numeric value',
  not_finite: 'Number must be finite',
};

// --------------------------------------------
// ZodErrorFormatter Class
// --------------------------------------------

export class ZodErrorFormatter {
  /**
   * Convert ZodError to user-friendly message
   * Aggregates all validation errors into a single readable message
   *
   * @param error - ZodError instance from failed validation
   * @returns Human-readable error message
   */
  static toUserMessage(error: ZodError): string {
    if (!error || !(error instanceof ZodError)) {
      return 'Validation error occurred';
    }

    const issues = error.issues;

    if (issues.length === 0) {
      return 'Validation error occurred';
    }

    // Single error: provide detailed message
    if (issues.length === 1) {
      const issue = issues[0];
      return this.formatSingleIssue(issue);
    }

    // Multiple errors: list all with paths
    const formattedErrors = issues
      .map((issue) => this.formatIssueWithPath(issue))
      .filter((msg) => msg !== null);

    if (formattedErrors.length === 0) {
      return 'Multiple validation errors occurred';
    }

    return `Validation failed:\n${formattedErrors.map((msg) => `• ${msg}`).join('\n')}`;
  }

  /**
   * Log validation error with context for debugging
   * Provides detailed error information for development/troubleshooting
   *
   * @param error - ZodError instance from failed validation
   * @param context - Context string describing where validation failed (e.g., 'PageBuildResponse', 'UserLo⟪?⟫
   */
  static logValidationError(error: ZodError, context: string): void {
    if (!error || !(error instanceof ZodError)) {
      logger.error('Invalid error passed to logValidationError', error, { context });
      return;
    }

    const formattedErrors = this.formatErrorsForLogging(error);

    logger.error(`Validation error in ${context}`, error, {
      context,
      errorCount: error.issues.length,
      errors: formattedErrors,
      rawError: error.format(),
    });
  }

  // --------------------------------------------
  // Private Helper Methods
  // --------------------------------------------

  /**
   * Format a single Zod issue into readable message
   */
  private static formatSingleIssue(issue: ZodIssue): string {
    const baseMessage = this.getMessageForCode(issue.code);
    const customMessage = issue.message !== 'Invalid input' ? issue.message : null;

    // Use custom message if provided and meaningful
    if (customMessage && customMessage !== baseMessage) {
      return customMessage;
    }

    // Add type-specific details
    if (issue.code === 'invalid_type') {
      const expectedType = 'expected' in issue ? issue.expected : 'valid';
      const receivedType = 'received' in issue ? issue.received : 'invalid';
      return `Expected ${expectedType}, received ${receivedType}`;
    }

    if (issue.code === 'too_small') {
      const minimum = 'minimum' in issue ? issue.minimum : null;
      const type = 'type' in issue ? issue.type : 'value';
      if (minimum !== null) {
        return `Minimum ${type} is ${minimum}`;
      }
    }

    if (issue.code === 'too_big') {
      const maximum = 'maximum' in issue ? issue.maximum : null;
      const type = 'type' in issue ? issue.type : 'value';
      if (maximum !== null) {
        return `Maximum ${type} is ${maximum}`;
      }
    }

    return baseMessage;
  }

  /**
   * Format issue with path for multi-error display
   */
  private static formatIssueWithPath(issue: ZodIssue): string {
    const path = this.formatPath(issue.path);
    const message = this.formatSingleIssue(issue);

    if (path) {
      return `${path}: ${message}`;
    }

    return message;
  }

  /**
   * Format error path array into readable string
   */
  private static formatPath(path: (string | number | symbol)[]): string {
    if (!path || path.length === 0) {
      return '';
    }

    return path
      .filter((segment): segment is string | number => typeof segment !== 'symbol')
      .map((segment, index) => {
        if (typeof segment === 'number') {
          return `[${segment}]`;
        }
        return index === 0 ? segment : `.${segment}`;
      })
      .join('');
  }

  /**
   * Get user-friendly message for error code
   */
  private static getMessageForCode(code: string): string {
    return ERROR_CODE_MESSAGES[code] || 'Validation error';
  }

  /**
   * Format all errors for structured logging
   */
  private static formatErrorsForLogging(error: ZodError): FormattedError[] {
    return error.issues.map((issue) => ({
      path: this.formatPath(issue.path),
      message: this.formatSingleIssue(issue),
      code: issue.code,
    }));
  }
}
// TODO ⟪missing line 219 — illegible in photo (obscured by scrollbar/bottom chrome)⟫
