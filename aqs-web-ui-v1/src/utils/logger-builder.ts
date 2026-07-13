/**
 * Logger Builder - Flexible logging system with context, levels, and formatting
 *
 * Features:
 * - Chainable builder pattern for configuration
 * - Log level filtering (debug < info < warn < error < silent)
 * - Context inheritance for child loggers
 * - Timestamps and color output
 * - Development vs production mode support
 * - Browser-safe implementation
 *
 * @example
 * ```tsx
 * const logger = new LoggerBuilder()
 *   .withContext({ feature: 'navigation', component: 'dataStrategy' })
 *   .withLevel('debug')
 *   .enableTimestamps()
 *   .enableColors()
 *   .build();
 *
 * logger.info('Cycling API called', { action: 'ACTION', nodeKey: '123' });
 * logger.error('Navigation failed', error, { url: '/policy' });
 * ```
 */

// ----------------------------------------
// Types & Enums
// ----------------------------------------

export const LogLevel = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    SILENT: 4,
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export type LogLevelString = 'debug' | 'info' | 'warn' | 'error' | 'silent';

export interface Logger {
    debug(message: string, data?: unknown): void;
    info(message: string, data?: unknown): void;
    warn(message: string, data?: unknown): void;
    error(message: string, error?: Error | unknown, data?: unknown): void;
    log(level: LogLevelString, message: string, data?: unknown): void;
    createChild(context: Record<string, unknown>): Logger;
}

interface LoggerConfig {
    context: Record<string, unknown>;
    level: LogLevel;
    prefix: string;
    enableTimestamps: boolean;
    enableColors: boolean;
    metadata: Record<string, unknown>;
}

// ----------------------------------------
// Global Configuration
// ----------------------------------------

let globalLogLevel: LogLevel = LogLevel.INFO;

export function setGlobalLogLevel(level: LogLevelString): void {
    globalLogLevel = parseLogLevel(level);
}

export function getGlobalLogLevel(): LogLevelString {
    return logLevelToString(globalLogLevel);
}

// ----------------------------------------
// Utility Functions
// ----------------------------------------

function parseLogLevel(level: LogLevelString): LogLevel {
    const mapping: Record<LogLevelString, LogLevel> = {
        debug: LogLevel.DEBUG,
        info: LogLevel.INFO,
        warn: LogLevel.WARN,
        error: LogLevel.ERROR,
        silent: LogLevel.SILENT,
    };
    return mapping[level];
}

function logLevelToString(level: LogLevel): LogLevelString {
    const mapping: Record<LogLevel, LogLevelString> = {
        [LogLevel.DEBUG]: 'debug',
        [LogLevel.INFO]: 'info',
        [LogLevel.WARN]: 'warn',
        [LogLevel.ERROR]: 'error',
        [LogLevel.SILENT]: 'silent',
    };
    return mapping[level];
}

function isDevelopment(): boolean {
    return import.meta.env.DEV === true;
}

// ANSI color codes for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
};

function formatTimestamp(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${ms}`;
}

function colorize(text: string, color: keyof typeof colors, enabled: boolean): string {
    if (!enabled) return text;
    return `${colors[color]}${text}${colors.reset}`;
}

function formatLogLevel(level: LogLevelString, enableColors: boolean): string {
    const levelUpper = level.toUpperCase().padEnd(5, ' ');

    if (!enableColors) return levelUpper;

    switch (level) {
        case 'debug':
            return colorize(levelUpper, 'gray', true);
        case 'info':
            return colorize(levelUpper, 'blue', true);
        case 'warn':
            return colorize(levelUpper, 'yellow', true);
        case 'error':
            return colorize(levelUpper, 'red', true);
        default:
            return levelUpper;
    }
}

function formatContext(context: Record<string, unknown>, enableColors: boolean): string {
    if (Object.keys(context).length === 0) return '';

    const parts: string[] = [];

    // Format feature/component if present
    if (context.feature) {
        parts.push(`[${context.feature}]`);
    }
    if (context.component) {
        parts.push(`[${context.component}]`);
    }

    // Add other context keys
    const otherKeys = Object.keys(context).filter((k) => k !== 'feature' && k !== 'component');
    if (otherKeys.length > 0) {
        const otherContext = otherKeys.map((k) => `${k}=${context[k]}`).join(', ');
        parts.push(`{${otherContext}}`);
    }

    const formatted = parts.join(' ');
    return enableColors ? colorize(formatted, 'cyan', true) : formatted;
}

function safeStringify(data: unknown, indent = 2): string {
    try {

        if (data === undefined) return 'undefined';
        if (data === null) return 'null';
        if (typeof data === 'string') return data;
        if (typeof data === 'number' || typeof data === 'boolean') return String(data);
        if (data instanceof Error) {
            // Handle Error objects specially
            return JSON.stringify(
                {
                    name: data.name,
                    message: data.message,
                    stack: data.stack,
                },
                null,
                indent,
            );
        }

        // Handle circular references and other complex objects
        const seen = new WeakSet();
        return JSON.stringify(
            data,
            (_key, value) => {
                if (typeof value === 'object' && value !== null) {
                    if (seen.has(value)) {
                        return '[Circular]';
                    }
                    seen.add(value);
                }
                return value;
            },
            indent,
        );
    } catch (error) {
        return `[Unstringifiable: ${String(error)}]`;
    }
}

// ------------------------------------------
// Logger Implementation
// ------------------------------------------

class LoggerImpl implements Logger {
    private config: LoggerConfig;

    constructor(config: LoggerConfig) {
        this.config = config;
    }

    debug(message: string, data?: unknown): void {
        this.log('debug', message, data);
    }

    info(message: string, data?: unknown): void {
        this.log('info', message, data);
    }

    warn(message: string, data?: unknown): void {
        this.log('warn', message, data);
    }

    error(message: string, error?: Error | unknown, data?: unknown): void {
        // Handle overloaded signature: error(message, error?, data?)
        let errorObj: Error | undefined;
        let additionalData: unknown;
        if (error instanceof Error) {
            errorObj = error;
            additionalData = data;
        } else {
            additionalData = error;
        }

        const combinedData = {
            ...(additionalData as Record<string, unknown>),
            ...(errorObj
                ? {
                    error: {
                        name: errorObj.name,
                        message: errorObj.message,
                        stack: errorObj.stack,
                    },
                }
                : {}),
        };

        this.log('error', message, Object.keys(combinedData).length > 0 ? combinedData : undefined);
    }


    log(level: LogLevelString, message: string, data?: unknown): void {
        const numericLevel = parseLogLevel(level);

        // Check against both instance level and global level
        const effectiveLevel = Math.max(this.config.level, globalLogLevel);

        if (numericLevel < effectiveLevel) {
            return; // Skip logging if below threshold
        }

        // Build log message parts
        const parts: string[] = [];

        // Timestamp
        if (this.config.enableTimestamps) {
            const timestamp = formatTimestamp();
            const coloredTimestamp = this.config.enableColors
                ? colorize(timestamp, 'gray', true)
                : timestamp;
            parts.push(`[${coloredTimestamp}]`);
        }


        // Log level
        const formattedLevel = formatLogLevel(level, this.config.enableColors);
        parts.push(`[${formattedLevel}]`);

        // Prefix
        if (this.config.prefix) {
            const coloredPrefix = this.config.enableColors
                ? colorize(this.config.prefix, 'magenta', true)
                : this.config.prefix;
            parts.push(`[${coloredPrefix}]`);
        }

        // Context
        const contextStr = formatContext(this.config.context, this.config.enableColors);
        if (contextStr) {
            parts.push(contextStr);
        }

        // Message
        parts.push(message);

        const logLine = parts.join(' ');

        // Output to appropriate console method
        switch (level) {
            case 'debug':
                console.debug(logLine);
                break;
            case 'info':
                console.info(logLine);
                break;
            case 'warn':
                console.warn(logLine);
                break;
            case 'error':
                console.error(logLine);
                break;
        }

        // Log additional data if present
        if (data !== undefined) {
            const dataLabel = this.config.enableColors
                ? colorize('  ↳ Data:', 'gray', true)
                : '  ↳ Data:';
            console.log(dataLabel);

            if (typeof data === 'object' && data !== null) {
                // Pretty print objects
                if (isDevelopment()) {
                    console.log(safeStringify(data, 2));
                } else {
                    console.log(safeStringify(data, 0)); // Compact in production
                }
            } else {
                console.log('⟪?⟫', data);
            }
        }

        // Log metadata if present (development only)
        if (isDevelopment() && Object.keys(this.config.metadata).length > 0) {
            const metaLabel = this.config.enableColors
                ? colorize('  ↳ Metadata:', 'dim', true)
                : '  ↳ Metadata:';
            console.log(metaLabel, this.config.metadata);
        }
    }

    createChild(context: Record<string, unknown>): Logger {
        // Merge parent context with child context (child takes precedence)
        const mergedContext = { ...this.config.context, ...context };

        // Create new logger with merged context but same other config
        const childConfig: LoggerConfig = {
            ...this.config,
            context: mergedContext,
        };

        return new LoggerImpl(childConfig);
    }
}

// ----------------------------------------
// Logger Builder
// ----------------------------------------

export class LoggerBuilder {
    private config: LoggerConfig;

    constructor(baseConfig?: Partial<LoggerConfig>) {
        // Initialize with defaults
        this.config = {
            context: {},
            level: isDevelopment() ? LogLevel.DEBUG : LogLevel.INFO,
            prefix: '',
            enableTimestamps: isDevelopment(),
            enableColors: isDevelopment(),
            metadata: {},
            ...baseConfig,
        };
    }

    /**
     * Add context data that will be included in all log messages.
     * Common keys: feature, component, userId, sessionId, etc.
     */
    withContext(context: Record<string, unknown>): LoggerBuilder {
        return new LoggerBuilder({
            ...this.config,
            context: { ...this.config.context, ...context },
        });
    }
    }

    /**
     * Set the minimum log level. Messages below this level will be filtered out.
     */
    withLevel(level: LogLevelString): LoggerBuilder {
        return new LoggerBuilder({
            ...this.config,
            level: parseLogLevel(level),
        });
    }

    /**
     * Add a prefix to all log messages (e.g., service name, module name).
     */
    withPrefix(prefix: string): LoggerBuilder {
        return new LoggerBuilder({
            ...this.config,
            prefix,
        });
    }

    /**
     * Enable timestamps in log output (default: on in development, off in production).
     */
    enableTimestamps(enabled = true): LoggerBuilder {
        return new LoggerBuilder({
            ...this.config,
            enableTimestamps: enabled,
        });
    }

    /**
     * Enable ANSI color codes in log output (default: on in development, off in production).
     */
    enableColors(enabled = true): LoggerBuilder {
        return new LoggerBuilder({
            ...this.config,
            enableColors: enabled,
        });
    }

    /**
     * Add metadata that will be logged with each message (development only).
     * Useful for debugging purposes.
     */
    withMetadata(metadata: Record<string, unknown>): LoggerBuilder {
        return new LoggerBuilder({
            ...this.config,
            metadata: { ...this.config.metadata, ...metadata },
        });
    }
    /**
     * Build and return the configured Logger instance.
     */
    build(): Logger {
        return new LoggerImpl(this.config);
    }
}

// ----------------------------------------
// Convenience Factory Functions
// ----------------------------------------

/**
 * Create a logger with default settings (development-aware).
 */
export function createLogger(context?: Record<string, unknown>): Logger {
    const builder = new LoggerBuilder();

    if (context) {
        return builder.withContext(context).build();
    }

    return builder.build();
}

/**
 * Create a logger for a specific feature/component combination.
 */
export function createFeatureLogger(feature: string, component: string): Logger {
    return new LoggerBuilder().withContext({ feature, component }).build();
}
/**
 * Create a silent logger (useful for testing or disabling logs).
 */
export function createSilentLogger(): Logger {
    return new LoggerBuilder().withLevel('silent').build();
}

// ----------------------------------------
// Default Export
// ----------------------------------------


export default LoggerBuilder;
