/**
 * Performance Monitor - Browser Performance API integration
 *
 * Features:
 * - Start/end performance measurements
 * - Integration with logger-builder for output
 * - Automatic duration calculation
 * - Performance.measure events for browser DevTools
 * - Configurable log levels for different operations
 * - Singleton pattern for global access
 *
 * @example
 * ```tsx
 * import { perfMonitor } from '@/utils/performance-monitor';
 *
 * // Measure function execution
 * perfMonitor.start('api-call');
 * await fetchData();
 * perfMonitor.end('api-call', 'info');
 *
 * // Measure with custom context
 * perfMonitor.start('render', { component: 'Dashboard' });
 * // ... render logic
 * perfMonitor.end('render', 'debug');
 *
 * // Get active measurements
 * const active = perfMonitor.getActiveMeasurements();
 * console.log('Active measurements:', active);
 * ```
 */

import { LoggerBuilder, type LogLevelString } from '@/utils/logger-builder';

// ---------------------------------------------
// Types
// ---------------------------------------------

interface PerformanceEntry {
    label: string;
    startTime: number;
    startMark: string;
    context?: Record<string, unknown>;
}

interface PerformanceMeasurement {
    label: string;
    duration: number;
    startTime: number;
    endTime: number;
    context?: Record<string, unknown>;
}

interface PerformanceMonitorConfig {
    enableBrowserMarks: boolean; // Use browser Performance API marks
    enableLogging: boolean; // Enable console logging
    defaultLogLevel: LogLevelString; // Default log level for measurements
    warningThreshold: number; // Warn if operation exceeds this (ms)
}

// ---------------------------------------------
// Performance Monitor Implementation
// ---------------------------------------------

export class PerformanceMonitor {
    private readonly config: PerformanceMonitorConfig;
    private readonly logger = new LoggerBuilder()
        .withContext({ module: 'PerformanceMonitor' })
        .withLevel('debug')
        .enableTimestamps()
        .build();

    private activeEntries: Map<string, PerformanceEntry>;
    private completedMeasurements: PerformanceMeasurement[];
    private readonly supportsPerformanceAPI: boolean;

    constructor(config: Partial<PerformanceMonitorConfig> = {}) {
        this.config = {
            enableBrowserMarks: true,
            enableLogging: true,
            defaultLogLevel: 'debug',
            warningThreshold: 1000, // 1 second
            ...config,
        };

        this.activeEntries = new Map();
        this.completedMeasurements = [];

        // Check if browser Performance API is available
        this.supportsPerformanceAPI =
            typeof performance !== 'undefined' &&
            typeof performance.mark === 'function' &&
            typeof performance.measure === 'function';

        if (this.config.enableLogging) {
            this.logger.debug('PerformanceMonitor initialized', {
                browserAPI: this.supportsPerformanceAPI,
                warningThreshold: this.config.warningThreshold,
            });
        }
    }

    /**
     * Start a performance measurement
     * @param label Unique label for this measurement
     * @param context Optional context data
     */
    start(label: string, context?: Record<string, unknown>): void {
        if (this.activeEntries.has(label)) {
            this.logger.warn('Measurement already started', { label });
            return;
        }

        const startMark = `${label}-start`;
        const startTime = Date.now();

        // Create browser performance mark
        if (this.config.enableBrowserMarks && this.supportsPerformanceAPI) {
            try {
                performance.mark(startMark);
            } catch (error) {
                this.logger.error('Failed to create performance mark', error, { label });
            }
        }

        const entry: PerformanceEntry = {
            label,
            startTime,
            startMark,
            context,
        };

        this.activeEntries.set(label, entry);

        if (this.config.enableLogging) {
            this.logger.debug('Performance measurement started', { label, context });
        }
    }

    /**
     * End a performance measurement and log the result
     * @param label Label of the measurement to end
     * @param logLevel Log level for output (default: config.defaultLogLevel)
     */
    end(label: string, logLevel?: LogLevelString): void {
        const entry = this.activeEntries.get(label);

        if (!entry) {
            this.logger.warn('Measurement not found or already ended', { label });
            return;
        }

        const endMark = `${label}-end`;
        const endTime = Date.now();
        const duration = endTime - entry.startTime;

        // Create browser performance mark and measure
        if (this.config.enableBrowserMarks && this.supportsPerformanceAPI) {
            try {
                performance.mark(endMark);
                performance.measure(label, entry.startMark, endMark);
            } catch (error) {
                this.logger.error('Failed to create performance measure', error, { label });
            }
        }

        // Store completed measurement
        const measurement: PerformanceMeasurement = {
            label,
            duration,
            startTime: entry.startTime,
            endTime,
            context: entry.context,
        };

        this.completedMeasurements.push(measurement);
        this.activeEntries.delete(label);

        // Log the result
        if (this.config.enableLogging) {
            const effectiveLogLevel = logLevel ?? this.config.defaultLogLevel;
            const logData = {
                label,
                duration: `${duration}ms`,
                ...entry.context,
            };

            // Warn if duration exceeds threshold
            if (duration > this.config.warningThreshold) {
                this.logger.warn(`Performance threshold exceeded: ${label}`, {
                    ...logData,
                    threshold: this.config.warningThreshold,
                    exceeded: duration - this.config.warningThreshold,
                });
            } else {
                this.logger.log(effectiveLogLevel, `Performance: ${label}`, logData);
            }
        }
    }

    /**
     * Measure the execution time of a function
     * @param label Label for the measurement
     * @param fn Function to measure
     * @param logLevel Log level for output
     * @returns Result of the function
     */
    async measure<T>(
        label: string,
        fn: () => T | Promise<T>,
        logLevel?: LogLevelString,
    ): Promise<T> {
        this.start(label);
        try {
            const result = await fn();
            this.end(label, logLevel);
            return result;
        } catch (error) {
            this.end(label, 'error');
            throw error;
        }
    }

    /**
     * Get all active (not yet ended) measurements
     */
    getActiveMeasurements(): string[] {
        return Array.from(this.activeEntries.keys());
    }

    /**
     * Get completed measurements
     * @param limit Maximum number of measurements to return (most recent first)
     */
    getCompletedMeasurements(limit?: number): PerformanceMeasurement[] {
        const measurements = [...this.completedMeasurements].reverse();
        return limit ? measurements.slice(0, limit) : measurements;
    }

    /**
     * Get measurements by label pattern
     * @param pattern String to match in label (case-insensitive)
     */
    getMeasurementsByPattern(pattern: string): PerformanceMeasurement[] {
        const regex = new RegExp(pattern, 'i');
        return this.completedMeasurements.filter((m) => regex.test(m.label));
    }

    /**
     * Calculate average duration for measurements matching a label pattern
     * @param pattern String to match in label
     */
    getAverageDuration(pattern: string): number | null {
        const measurements = this.getMeasurementsByPattern(pattern);

        if (measurements.length === 0) {
            return null;
        }

        const total = measurements.reduce((sum, m) => sum + m.duration, 0);
        return total / measurements.length;
    }

    /**
     * Clear all completed measurements
     */
    clearHistory(): void {
        const count = this.completedMeasurements.length;
        this.completedMeasurements = [];

        if (this.config.enableLogging) {
            this.logger.debug('Performance history cleared', { measurementsCleared: count });
        }
    }

    /**
     * Clear browser performance marks and measures
     */
    clearBrowserMarks(): void {
        if (this.supportsPerformanceAPI) {
            try {
                performance.clearMarks();
                performance.clearMeasures();

                if (this.config.enableLogging) {
                    this.logger.debug('Browser performance marks cleared');
                }
            } catch (error) {
                this.logger.error('Failed to clear browser performance marks', error);
            }
        }
    }

    /**
     * Get summary statistics for all measurements
     */
    getSummary(): {
        totalMeasurements: number;
        activeMeasurements: number;
        averageDuration: number;
        slowest: PerformanceMeasurement | null;
        fastest: PerformanceMeasurement | null;
    } {
        const measurements = this.completedMeasurements;
        const total = measurements.length;

        if (total === 0) {
            return {
                totalMeasurements: 0,
                activeMeasurements: this.activeEntries.size,
                averageDuration: 0,
                slowest: null,
                fastest: null,
            };
        }

        const durations = measurements.map((m) => m.duration);
        const avgDuration = durations.reduce((sum, d) => sum + d, 0) / total;

        const slowest = measurements.reduce((prev, curr) =>
            curr.duration > prev.duration ? curr : prev,
        );
        const fastest = measurements.reduce((prev, curr) =>
            curr.duration < prev.duration ? curr : prev,
        );
        // ⟪?⟫
        // ⟪?⟫
        return {
            totalMeasurements: total,
            activeMeasurements: this.activeEntries.size,
            averageDuration: Math.round(avgDuration * 100) / 100,
            slowest,
            fastest,
        };
    }

    /**
     * Force end all active measurements (cleanup utility)
     */
    endAll(logLevel?: LogLevelString): void {
        const labels = Array.from(this.activeEntries.keys());

        if (labels.length > 0 && this.config.enableLogging) {
            this.logger.warn('Force ending all active measurements', { count: labels.length });
        }

        labels.forEach((label) => this.end(label, logLevel));
    }
}

// ----------------------------------------
// Singleton Instance
// ----------------------------------------

/**
 * Global performance monitor instance
 * Use this singleton for consistent performance tracking across the application
 */
export const perfMonitor = new PerformanceMonitor({
    enableBrowserMarks: true,
    enableLogging: import.meta.env.DEV, // Enable logging in dev mode only
    defaultLogLevel: 'debug',
    warningThreshold: 1000, // Warn if operation takes more than 1 second
});

// ----------------------------------------
// Exports
// ----------------------------------------

export default PerformanceMonitor;
