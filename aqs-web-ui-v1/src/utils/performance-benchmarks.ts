/**
 * Performance Benchmarks - Target performance thresholds for key operations
 *
 * These benchmarks define acceptable performance targets for critical operations
 * in the application. Use with PerformanceMonitor to track and alert on
 * performance regressions.
 *
 * Targets are based on:
 * - User experience research (e.g., 100ms for perceived instant response)
 * - Web Vitals recommendations
 * - Application-specific requirements
 *
 * @example
 * ```tsx
 * import { perfMonitor } from '@/utils/performance-monitor';
 * import { benchmarks } from '@/utils/performance-benchmarks';
 *
 * perfMonitor.start('api-fetch-user');
 * const data = await fetchUser();
 * perfMonitor.end('api-fetch-user');
 *
 * const avgDuration = perfMonitor.getAverageDuration('api-fetch-user');
 * if (avgDuration && avgDuration > benchmarks.api.fetchUser.target) {
 *   console.warn('User fetch exceeds target', {
 *     actual: avgDuration,
 *     target: benchmarks.api.fetchUser.target,
 *   });
 * }
 * ```
 */

// ----------------------------------------
// Types
// ----------------------------------------

export interface PerformanceBenchmark {
    /** Target duration in milliseconds */
    target: number;
    /** Warning threshold in milliseconds (when to alert) */
    warning: number;
    /** Critical threshold in milliseconds (serious performance issue) */
    critical: number;
    /** Human-readable description */
    description: string;
    /** Category of operation */
    category: BenchmarkCategory;
}

export type BenchmarkCategory =
    | 'api'
    | 'render'
    | 'navigation'
    | 'interaction'
    | 'data-processing'
    | 'cache';

// ----------------------------------------
// Core Web Vitals Benchmarks
// Based on Google's Web Vitals recommendations
// ----------------------------------------

export const coreWebVitals = {
    /** Largest Contentful Paint - measures loading performance */
    LCP: {
        target: 2500, // Good: ≤ 2.5s
        warning: 4000, // Needs Improvement: 2.5s - 4s
        critical: 4000, // Poor: > 4s
        description: 'Largest Contentful Paint - time to render largest content element',
        category: 'render' as const,
    },

    /** First Input Delay - measures interactivity */
    FID: {
        target: 100, // Good: ≤ 100ms
        warning: 300, // Needs Improvement: 100ms - 300ms
        critical: 300, // Poor: > 300ms
        description: 'First Input Delay - time from user interaction to browser response',
        category: 'interaction' as const,
    },

    /** Cumulative Layout Shift - measures visual stability */
    CLS: {
        target: 0.1, // Good: ≤ 0.1
        warning: 0.25, // Needs Improvement: 0.1 - 0.25
        critical: 0.25, // Poor: > 0.25
        description: 'Cumulative Layout Shift - visual stability metric (unitless)',
        category: 'render' as const,
    },

    /** Interaction to Next Paint - measures responsiveness */
    INP: {
        target: 200, // Good: ≤ 200ms
        warning: 500, // Needs Improvement: 200ms - 500ms
        critical: 500, // Poor: > 500ms
        description: 'Interaction to Next Paint - time for page to respond to user input',
        category: 'interaction' as const,
    },

    /** Time to First Byte - measures server response time */
    TTFB: {
        target: 800, // Good: ≤ 800ms
        warning: 1800, // Needs Improvement: 800ms - 1800ms
        critical: 1800, // Poor: > 1800ms
        description: 'Time to First Byte - server response time',
        category: 'api' as const,
    },
} as const satisfies Record<string, PerformanceBenchmark>;

// ----------------------------------------
// Application-Specific Benchmarks
// ----------------------------------------

export const benchmarks = {
    /** API call benchmarks */
    api: {
        /** Authentication/login operations */
        login: {
            target: 1000, // 1 second
            warning: 2000,
            critical: 5000,
            description: 'User login/authentication',
            category: 'api' as const,
        },

        /** Session validation */
        sessionCheck: {
            target: 200,
            warning: 500,
            critical: 1000,
            description: 'Session validation check',
            category: 'api' as const,
        },

        /** Fetch user profile data */
        fetchUser: {
            target: 500,
            warning: 1000,
            critical: 2000,
            description: 'Fetch user profile information',
            category: 'api' as const,
        },

        /** Fetch menu/navigation data */
        fetchMenu: {
            target: 300,
            warning: 800,
            critical: 1500,
            description: 'Fetch menu and navigation data',
            category: 'api' as const,
        },

        /** Page build/form generation */
        pageBuild: {
            target: 1000,
            warning: 2000,
            critical: 3000,
            description: 'Page build and form generation',
            category: 'api' as const,
        },

        /** Field commit operations */
        fieldCommit: {
            target: 500,
            warning: 1000,
            critical: 2000,
            description: 'Field value commit to server',
            category: 'api' as const,
        },

        /** Data fetch operations */
        dataFetch: {
            target: 800,
            warning: 1500,
            critical: 3000,
            description: 'General data fetch operations',
            category: 'api' as const,
        },

        /** XML parsing */
        xmlParse: {
            target: 100,
            warning: 300,
            critical: 500,
            description: 'Parse XML response from legacy backend',
            category: 'data-processing' as const,
        },
    },

    /** Component rendering benchmarks */
    render: {
        /** Initial page render */
        initialPageRender: {
            target: 1000,
            warning: 2000,
            critical: 3000,
            description: 'Initial page render time',
            category: 'render' as const,
        },

        /** Form rendering */
        formRender: {
            target: 500,
            warning: 1000,
            critical: 2000,
            description: 'Dynamic form rendering',
            category: 'render' as const,
        },

        /** Component update */
        componentUpdate: {
            target: 100,
            warning: 300,
            critical: 500,
            description: 'Component re-render time',
            category: 'render' as const,
        },

        /** List rendering */
        listRender: {
            target: 300,
            warning: 800,
            critical: 1500,
            description: 'Large list rendering',
            category: 'render' as const,
        },

        /** Dialog open */
        dialogOpen: {
            target: 100,
            warning: 300,
            critical: 500,
            description: 'Dialog/modal open animation',
            category: 'render' as const,
        },
    },

    /** Navigation benchmarks */
    navigation: {
        /** Route transition */
        routeTransition: {
            target: 500,
            warning: 1000,
            critical: 2000,
            description: 'Route transition time',
            category: 'navigation' as const,
        },

        /** Loader execution */
        loaderExecution: {
            target: 800,
            warning: 1500,
            critical: 3000,
            description: 'React Router loader execution',
            category: 'navigation' as const,
        },

        /** Action execution */
        actionExecution: {
            target: 1000,
            warning: 2000,
            critical: 4000,
            description: 'React Router action execution',
            category: 'navigation' as const,
        },
    },

    /** User interaction benchmarks */
    interaction: {
        /** Button click response */
        buttonClick: {
            target: 100,
            warning: 200,
            critical: 500,
            description: 'Button click response time',
            category: 'interaction' as const,
        },

        /** Input field response */
        inputResponse: {
            target: 50,
            warning: 100,
            critical: 200,
            description: 'Input field keystroke response',
            category: 'interaction' as const,
        },

        /** Dropdown open */
        dropdownOpen: {
            target: 100,
            warning: 300,
            critical: 500,
            description: 'Dropdown/select open time',
            category: 'interaction' as const,
        },

        /** Search/filter operation */
        searchFilter: {
            target: 200,
            warning: 500,
            critical: 1000,
            description: 'Search or filter operation',
            category: 'interaction' as const,
        },
    },

    /** Data processing benchmarks */
    dataProcessing: {
        /** Normalize service config */
        normalizeConfig: {
            target: 100,
            warning: 300,
            critical: 500,
            description: 'XML to normalized field transformation',
            category: 'data-processing' as const,
        },

        /** Apply browser commands */
        applyCommands: {
            target: 200,
            warning: 500,
            critical: 1000,
            description: 'Apply server browser commands',
            category: 'data-processing' as const,
        },

        /** Form validation */
        formValidation: {
            target: 100,
            warning: 300,
            critical: 500,
            description: 'Form field validation',
            category: 'data-processing' as const,
        },

        /** Zod schema validation */
        zodValidation: {
            target: 50,
            warning: 150,
            critical: 300,
            description: 'Zod schema validation',
            category: 'data-processing' as const,
        },
    },

    /** Cache operation benchmarks */
    cache: {
        /** Cache get operation */
        cacheGet: {
            target: 10,
            warning: 50,
            critical: 100,
            description: 'Cache read operation',
            category: 'cache' as const,
        },

        /** Cache set operation */
        cacheSet: {
            target: 20,
            warning: 100,
            critical: 200,
            description: 'Cache write operation',
            category: 'cache' as const,
        },

        /** Cache invalidation */
        cacheInvalidate: {
            target: 50,
            warning: 200,
            critical: 500,
            description: 'Cache invalidation operation',
            category: 'cache' as const,
        },
    },
} as const satisfies Record<string, Record<string, PerformanceBenchmark>>;

// ------------------------------------------
// Utility Functions
// ------------------------------------------

/**
 * Get benchmark by operation key path
 * @example getBenchmark('api', 'login') => benchmarks.api.login
 */
export function getBenchmark(
    category: keyof typeof benchmarks,
    operation: string,
): PerformanceBenchmark | undefined {
    const categoryBenchmarks = benchmarks[category];
    if (!categoryBenchmarks) return undefined;

    return categoryBenchmarks[operation as keyof typeof categoryBenchmarks];
}

/**
 * Check if duration meets target benchmark
 */
export function meetsTarget(duration: number, benchmark: PerformanceBenchmark): boolean {
    return duration <= benchmark.target;
}

/**
 * Check if duration exceeds warning threshold
 */
export function exceedsWarning(duration: number, benchmark: PerformanceBenchmark): boolean {
    return duration > benchmark.warning;
}

/**
 * Check if duration exceeds critical threshold
 */
export function exceedsCritical(duration: number, benchmark: PerformanceBenchmark): boolean {
    return duration > benchmark.critical;
}

/**
 * Get performance status for a duration
 */
export function getPerformanceStatus(
    duration: number,
    benchmark: PerformanceBenchmark,
): 'excellent' | 'good' | 'warning' | 'critical' {
    if (duration <= benchmark.target * 0.7) return 'excellent';
    if (duration <= benchmark.target) return 'good';
    if (duration <= benchmark.warning) return 'warning';
    return 'critical';
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export default benchmarks;
