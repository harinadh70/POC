import { z } from 'zod';

// ================================================
// TypeScript Interfaces
// ================================================

export interface ActionButtonConfig {
    combinedAction?: string;
    useDynamicCombine?: boolean;
    customAction?: string;
    targetFrame?: string;
    deferNavigation?: boolean;
}

/**
 * Post-window action configuration
 * Defines an action to execute after a NEWWINDOW frame navigation completes
 */
export interface PostWindowActionConfig {
    /** Action to trigger after window opens (e.g., "RATELEVEL") */
    action: string;
    /** Optional delay in milliseconds before triggering followup action */
    delay?: number;
    /** Whether to use current session xmlDetail from context (default: true) */
    useSessionXmlDetail?: boolean;
}

export interface ActionConfig {
    action: string;
    context: string;
    buttons: Record<string, ActionButtonConfig>;
    defaultBehavior?: {
        useCombining: boolean;
        frameTarget: string;
        deferNavigation: boolean;
    };
    /** Optional post-window action to execute after NEWWINDOW navigation */
    postWindowAction?: PostWindowActionConfig;
}

export interface ActionCatalog {
    actions: Record<string, ActionConfig>;
    defaultConfig: {
        buttons: Record<string, ActionButtonConfig>;
        defaultBehavior: {
            useCombining: boolean;
            frameTarget: string;
            deferNavigation: boolean;
        };
    };
}

// ================================================
// Zod Validation Schemas
// ================================================

export const ActionButtonConfigSchema = z.object({
    combinedAction: z.string().optional(),
    useDynamicCombine: z.boolean().optional(),
    customAction: z.string().optional(),
    targetFrame: z.string().optional(),
    deferNavigation: z.boolean().optional(),
});

export const PostWindowActionConfigSchema = z.object({
    action: z.string().min(1),
    delay: z.number().optional(),
    useSessionXmlDetail: z.boolean().optional().default(true),
});

export const ActionConfigSchema = z.object({
    action: z.string().min(1),
    context: z.string(),
    buttons: z.record(z.string(), ActionButtonConfigSchema),
    defaultBehavior: z
        .object({
            useCombining: z.boolean(),
            frameTarget: z.string(),
            deferNavigation: z.boolean(),
        })
        .optional(),
    postWindowAction: PostWindowActionConfigSchema.optional(),
});

export const ActionCatalogSchema = z.object({
    actions: z.record(z.string(), ActionConfigSchema),
    defaultConfig: z.object({
        buttons: z.record(z.string(), ActionButtonConfigSchema),
        defaultBehavior: z.object({
            useCombining: z.boolean(),
            frameTarget: z.string(),
            deferNavigation: z.boolean(),
        }),
    }),
});

// Frame Convention: Uppercase frame values (MAIN, MODAL, NEWWINDOW)
// to match legacy VBScript system and frame-router.ts normalization.
// See: Main_ISLLSYS_20010101.vbs line 4537 for legacy reference.

const DEFAULT_ACTION_BUTTONS: Record<string, ActionButtonConfig> = {
    OK: { useDynamicCombine: true, targetFrame: 'MAIN' },
    SUBMIT: { useDynamicCombine: true, targetFrame: 'MAIN' },
    NEXT: { useDynamicCombine: true, targetFrame: 'MAIN' },
    SAVE: { useDynamicCombine: true, targetFrame: 'MAIN' },
    ADD: { useDynamicCombine: true, targetFrame: 'MAIN' },
    EDIT: { useDynamicCombine: true, targetFrame: 'MAIN' };
    VIEW: { useDynamicCombine: true, targetFrame: 'MAIN' },
    PRINT: { useDynamicCombine: true, targetFrame: 'MAIN' },
    RATE: { useDynamicCombine: true, targetFrame: 'MAIN' },
    REFRESH: { useDynamicCombine: true, targetFrame: 'MAIN' },
    DELETE: { useDynamicCombine: true, targetFrame: 'MAIN', deferNavigation: true },
    DISCARD: { useDynamicCombine: true, targetFrame: 'MAIN', deferNavigation: true },
    CANCEL: { customAction: 'MENU', targetFrame: 'MAIN' },
};

// ==================================================
// ACTION_CONFIG Catalog
// ==================================================

export const ACTION_CONFIG: ActionCatalog = {
    actions: {
        STARTOPTIONS: {
            action: 'STARTOPTIONS',
            context: 'New/renewal policy type selection',
            buttons: {
                OK: { useDynamicCombine: true, targetFrame: 'MAIN' },
                CANCEL: { customAction: 'MENU', targetFrame: 'MAIN' },
                NEXT: { useDynamicCombine: true, targetFrame: 'MAIN' },
            },
            defaultBehavior: {
                useCombining: true,
                frameTarget: 'MAIN',
                deferNavigation: false,
            },
            // Generic post-window action: Executes RATELEVEL after new policy window opens
            postWindowAction: {
                action: 'RATELEVEL',
                delay: 0,
                useSessionXmlDetail: true, // Use dynamic xmlDetail from navContext
            },
        },
        RATELEVEL: {
            action: 'RATELEVEL',
            context: 'Rate level page',
            buttons: {
                OK: { useDynamicCombine: true, targetFrame: 'MAIN' },
                CANCEL: { customAction: 'MENU', targetFrame: 'MAIN' },
                NEXT: { useDynamicCombine: true, targetFrame: 'MAIN' },
                SUBMIT: { useDynamicCombine: true, targetFrame: 'MAIN' },
                DELETE: { useDynamicCombine: true, targetFrame: 'MAIN', deferNavigation: true },
            },
            defaultBehavior: {
                useCombining: true,
                frameTarget: 'MAIN',
                deferNavigation: false,
            },
        },
        ADD: {
            action: 'ADD',
            context: 'Policy Information Page',
            buttons: {
                OK: { useDynamicCombine: true, targetFrame: 'MAIN' },
                CANCEL: { customAction: 'MENU', targetFrame: 'MAIN' },
                NEXT: { useDynamicCombine: true, targetFrame: 'MAIN' },
                'PATH UPDATE': { useDynamicCombine: true, targetFrame: 'MAIN' },
            },
            defaultBehavior: {
                useCombining: true,
                frameTarget: 'MAIN',
                deferNavigation: false,
            },
        },
        Main: {
            action: 'Main',
            context: 'Main dashboard',
            buttons: {},
            defaultBehavior: {
                useCombining: false,
                frameTarget: 'MAIN',
                deferNavigation: false,
            },
        },
        menu: {
            action: 'menu',
            context: 'Menu navigation',
            buttons: {},
            defaultBehavior: {
                useCombining: false,
                frameTarget: 'MAIN',
                deferNavigation: false,
            },
        },
        TREE: {
            action: 'TREE',
            context: 'Tree navigation',
            buttons: {},
            defaultBehavior: {
                useCombining: false,
                frameTarget: 'MAIN',
                deferNavigation: false,
            },
        },
        action: {
            action: 'action',
            context: 'Generic action navigation',
            buttons: {},
            defaultBehavior: {
                useCombining: false,
                frameTarget: 'MAIN',
                deferNavigation: false,
            },
        },
        MENU: {
            action: 'MENU',
            context: 'Main menu navigation',
            buttons: {},
            defaultBehavior: {
                useCombining: false,
                frameTarget: 'MAIN',
                deferNavigation: false,
            },
        },
        COMMENTS: {
            action: 'COMMENTS',
            context: 'Comments management',
            buttons: {
                CANCEL: { customAction: 'MENU', targetFrame: 'MAIN' },
            },
            defaultBehavior: {
                useCombining: true,
                frameTarget: 'MODAL',
                deferNavigation: true,
            },
        },
        DIAGNOSTICSACTION: {
            action: 'DIAGNOSTICSACTION',
            context: 'Diagnostics page',
            buttons: {},
            defaultBehavior: {
                useCombining: false,
                frameTarget: 'MAIN',
                deferNavigation: false,
            },
        },
        NOTEPAD: {
            action: 'NOTEPAD',
            context: 'Notepad feature',
            buttons: {
                CANCEL: { customAction: 'MENU', targetFrame: 'MAIN' },
            },
            defaultBehavior: {
                useCombining: true,
                frameTarget: 'MODAL',
                deferNavigation: true,
            },
        },
        overridereport: {
            action: 'overridereport',
            context: 'Override reports',
            buttons: {},
            defaultBehavior: {
                useCombining: false,
                frameTarget: 'NEWWINDOW',
                deferNavigation: false,
            },
        },
        POLICYNUMBERING: {
            action: 'POLICYNUMBERING',
            context: 'Policy numbering',
            buttons: {
                CANCEL: { customAction: 'MENU', targetFrame: 'MAIN' },
            },
            defaultBehavior: {
                useCombining: true,
                frameTarget: 'MODAL',
                deferNavigation: true,
            },
        },
        PRICINGFACTOR: {
            action: 'PRICINGFACTOR',
            context: 'Pricing factors',
            buttons: {
                CANCEL: { customAction: 'MENU', targetFrame: 'MAIN' },
            },
            defaultBehavior: {
                useCombining: true,
                frameTarget: 'MODAL',
                deferNavigation: true,
            },
        },
        QUICKVIEW: {
            action: 'QUICKVIEW',
            context: 'Quick view',
            buttons: {
                OK: { customAction: 'MENU', targetFrame: 'MAIN' },
            },
            defaultBehavior: {
                useCombining: false,
                frameTarget: 'MODAL',
                deferNavigation: true,
            },
        },
        TARGETPREMIUM: {
            action: 'TARGETPREMIUM',
            context: 'Target premium',
            buttons: {
                CANCEL: { customAction: 'MENU', targetFrame: 'MAIN' },
            },
            defaultBehavior: {
                useCombining: true,
                frameTarget: 'MODAL',
                deferNavigation: true,
            },
        },
        UNDERWRITER: {
            action: 'UNDERWRITER',
            context: 'Underwriter info',
            buttons: {
                CANCEL: { customAction: 'MENU', targetFrame: 'MAIN' },
            },
            defaultBehavior: {
                useCombining: true,
                frameTarget: 'MAIN',
                deferNavigation: false,
            },
        },
        WORKSHEETACTION: {
            action: 'WORKSHEETACTION',
            context: 'Worksheet',
            buttons: {
                CANCEL: { customAction: 'MENU', targetFrame: 'MAIN' },
            },
            defaultBehavior: {
                useCombining: true,
                frameTarget: 'MODAL',
                deferNavigation: true,
            },
        },
        LIB: {
            action: 'LIB',
            context: 'Library',
            buttons: {},
            defaultBehavior: {
                useCombining: false,
                frameTarget: 'MAIN',
                deferNavigation: false,
            },
        },
    },
    defaultConfig: {
        buttons: DEFAULT_ACTION_BUTTONS,
        defaultBehavior: {
            useCombining: true,
            frameTarget: 'MAIN',
            deferNavigation: false,
        },
    },
};

/**
 * Returns action configuration for a known action, or a safe default fallback.
 */
export function getActionConfig(actionName: string): ActionConfig {
    const config = ACTION_CONFIG.actions[actionName];
    if (config) {
        return config;
    }

    return {
        action: actionName,
        context: 'Unknown action',
        buttons: {},
        defaultBehavior: ACTION_CONFIG.defaultConfig.defaultBehavior,
    };
}

/**
 * Resolves button behavior for a given action + matchcode pair.
 */
export function getButtonConfig(actionName: string, buttonMatchcode: string): ActionButtonConfig {
    const actionConfig = getActionConfig(actionName);
    const buttonKey = buttonMatchcode.toUpperCase();
    const actionButtonConfig = actionConfig.buttons[buttonKey];
    if (actionButtonConfig) {
        return actionButtonConfig;
    }

    if (actionConfig.defaultBehavior?.useCombining === false) {
        return {
            useDynamicCombine: false,
            targetFrame: actionConfig.defaultBehavior.frameTarget,
            deferNavigation: actionConfig.defaultBehavior.deferNavigation,
        };
    }

    const defaultButtonConfig = ACTION_CONFIG.defaultConfig.buttons[buttonKey];
    if (defaultButtonConfig) {
        return defaultButtonConfig;
    }

    return {
        useDynamicCombine: actionConfig.defaultBehavior?.useCombining ?? true,
        targetFrame: actionConfig.defaultBehavior?.frameTarget ?? 'MAIN',
        deferNavigation: actionConfig.defaultBehavior?.deferNavigation ?? false,
    };
}

/**
 * Validates the action catalog with Zod.
 *
 * @returns `true` when valid, otherwise `false`
 */
export function validateActionConfig(): boolean {
    try {
        ActionCatalogSchema.parse(ACTION_CONFIG);
        return true;
    } catch (error) {
        console.error('Action config validation failed:', error);
        return false;
    }
}
