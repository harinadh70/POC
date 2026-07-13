import { createContext } from 'react-router';

// services
import type { SessionInfo } from '@features/auth/services/auth';

// types
import type { ActionType, FrameType, BrowserCommand, PermissionSnapshot } from '@/types';

// ---------------------------------------

// user context
export const userContext = createContext<SessionInfo | null>(null);

// permissions context
export const permissionsContext = createContext<PermissionSnapshot | null>(null);

/**
 * Followup action to execute after window opens
 */
export interface FollowupActionConfig {
    action: string;
    nodeKey?: string;
    policyId?: string;
    xmlDetail?: string;
    delay?: number;
}

/**
 * Window command for window.open/showModalDialog
 */
export interface WindowCommand {
    url: string;
    frame: FrameType;
    width?: string;
    height?: string;
    queryString?: string;
    /** Optional followup action to execute after window opens successfully */
    followupAction?: FollowupActionConfig;
}

/**
 * Modal command for MUI Dialog rendering
 * (Similar to WindowCommand but opens dialog instead of new window)
 */
export interface ModalCommand {
    url: string;
    frame: FrameType;
    width?: string;
    height?: string;
    queryString?: string;
    xmlDetail?: unknown;
    xmlFileName?: string;
    xmlFilePath?: string;
    browserCommands?: import('@/types').BrowserCommand[];
}

/**
 * Extended navigation context for React Router v7 dataStrategy
 * Stores state from cycling API response to flow through middleware → loaders → components
 */
export interface NavigationContextValue {
    // Original fields (from legacy ExecuteAction)
    action: ActionType | null;
    nodeKey: string | null;
    frame: FrameType | null;
    tab: number | null;
    /** XML detail - can be string (for requests) or object (from response queryString) */
    xmlDetail: string | unknown | null;
    userId: string | null;
    compLoc: string | null;
    policyId: string | null;

    // Extended fields for dataStrategy pattern
    /** Target URL returned from cycling API */
    url?: string;

    /** Browser commands to execute (SET_TEXT, LOAD_COMBO, etc.) */
    browserCommands?: BrowserCommand[];

    /** Next action to execute after current navigation completes */
    nextAction?: {
        action: ActionType;
        nodeKey?: string;
        tab?: number;
    };

    /** Window command for modal/popup */
    windowCommand?: WindowCommand;

    /** Modal command for dialog rendering */
    modalCommand?: ModalCommand;

    /** Whether navigation should be deferred (for modal chains) */
    deferred?: boolean;

    /** Query string parameters from response */
    queryString?: string;

    /** XML filename from response */
    xmlFileName?: string;

    /** XML file path from response (e.g., "../../pol/xml/Rlv_PIPHPOL_20010101.xml") */
    xmlFilePath?: string;

    /** Tab file metadata from navigation response */
    tabFileName?: string;
    tabFilePath?: string;

    /** XML list file metadata from navigation response */
    xmlListFileName?: string;
    xmlListFilePath?: string;

    /** Status code from cycling API */
    statusCode?: number;

    /** Error message if navigation failed */
    error?: string;

    /** Whether cycling API has been called for this navigation */
    cyclingCalled?: boolean;

    /** Navigation depth counter for infinite loop prevention */
    navigationDepth?: number;

    /** Whether MENU has been loaded (for serial initialization) */
    menuLoaded?: boolean;

    /** Menu data from MENU action call */
    menuData?: any; // PageNavigationResponse type from navigation service

    /**
     * ASP filename from backend response (e.g., "Main_ISLLSYS_20010101.asp")
     *
     * Extracted from cycling API response, either from:
     * - Priority 1: response.FileName field (most reliable)
     * - Priority 2: Parsed from response.url using extractAspFileName()
     *
     * This field is CRITICAL for proper route mapping and was missing in the original
     * dataStrategy implementation. Legacy VBScript ExecuteAction always extracts this.
     *
     * @see execute-action.ts for extraction logic
     */
    fileName?: string;

    /**
     * Converted React route from ASP filename (e.g., "/Main_ISLLSYS_20010101")
     *
     * Generated using asp-route-mapper utilities:
     * - aspToReactRoute() - Converts ASP filename to React route
     * - buildReactRouteUrl() - Adds query parameters if present
     *
     * This enables proper navigation to React routes instead of legacy ASP URLs.
     *
     * @see asp-route-mapper.ts for conversion utilities
     */
    reactRoute?: string;
}

// navigation context
export const navigationContext = createContext<NavigationContextValue | null>(null);

/**
 * Helper to create initial navigation context
 */
export function createInitialNavigationContext(): NavigationContextValue {
    return {
        action: null,
        nodeKey: null,
        frame: null,
        tab: null,
        xmlDetail: '<items />',
        userId: null,
        compLoc: null,
        policyId: null,
        deferred: false,
        browserCommands: [],
        cyclingCalled: false,
    };
}

/**
 * Helper to merge navigation context updates
 */
export function mergeNavigationContext(
    current: NavigationContextValue | null,
    updates: Partial<NavigationContextValue>,
): NavigationContextValue {
    return {
        ...(current ?? createInitialNavigationContext()),
        ...updates,
    // TODO ⟪missing lines 191-end — file continues beyond last captured photo, not captured⟫
