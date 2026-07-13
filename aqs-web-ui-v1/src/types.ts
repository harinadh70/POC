export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
}

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

export interface RetryOptions {
    retries?: number;
    retryDelay?: number;
    retryOn?: number[]; // status codes to retry on
}

// Extend Axios config to support custom flags
declare module 'axios' {
    export interface AxiosRequestConfig {
        skipAuthInterceptor?: boolean;
    }
}

// src/types.ts
export type ControlType =
    | 'textbox'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'date'
    | 'calendar';
export type CommitEventType = 'blur' | 'enter' | 'change';

export interface OptionItem {
    label: string;
    value: string;
}

export interface NormalizedField {
    matchcode: string;
    label: string;
    controlType: ControlType;
    required?: boolean;
    disabled?: boolean;
    visible?: boolean;
    readOnly?: boolean;
    tabIndex?: number;
    width?: number | string;
    placeholder?: string;
    options?: OptionItem[];
    defaultValue?: string | boolean;
    colSpan?: number;

    // highlight props (optional - if you already added these)
    highlight?: boolean;
    highlightColor?: string;
    highlightBorderColor?: string;

    // date-specific (optional)
    dateFormat?: string; // e.g. 'YYYY-MM-DD'
    minDate?: string; // ISO string or format matching dateFormat
    maxDate?: string;
    top?: number | string; // for absolute positioning
    left?: number | string; // for absolute positioning
    ctrlWidth?: number | string; // for absolute positioning

    // input restrictions (numeric and maxLength)
    isNumeric?: boolean; // Whether field should only accept numeric input
    maxLength?: number; // Maximum character length for input

    // info icon support
    showInfoIcon?: boolean;
    infoAriaLabel?: string;
    infoMatchcode?: string;
}

export type FormValues = Record<string, string | boolean>;
type Option = { value: string; text: string };

export interface FormControl {
    id: string;
    matchcode: string;
    controltype:
        | 'input'
        | 'select'
        | 'checkbox'
        | 'radio'
        | 'textarea'
        | 'date'
        | 'number'
        | 'button';
    ctrllabel: string;
    tabindex: string;
    value: string | boolean;
    text: string;
    options?: Option[];
    required: 'T' | 'F' | boolean | string;
    disabled: 'T' | 'F' | boolean | string;
}

export type FrameType = 'newwindow' | 'modal' | 'inline';

export type ActionType =
    | 'MAIN'
    | 'START'
    | 'MENU'
    | 'STARTOPTIONS'
    | 'RATELEVEL'
    | 'RLVUPDATE'
    | 'ADD';

// ============================================
// Command Types
// ============================================

/**
 * Browser command from backend XML responses.
 * Verbs: SET_TEXT, LOAD_COMBO, NAVIGATE, etc.
 */
export interface BrowserCommand {
    verb: string; // SET_TEXT, LOAD_COMBO, etc.
    noun: string; // Control matchcode or target
    addinf: string; // Additional info
    resfil?: string; // Resource file reference (optional)
}

/**
 * Dropdown/select option item with selection state.
 */
export interface ComboItem {
    value: string;
    label: string;
    selected?: boolean;
    disabled?: boolean;
}

/**
 * Result of executing a browser command.
 */
export interface CommandResult {
    success: boolean;
    error?: Error;
    verb: string;
    noun: string;
}

/**
 * Shared store contract for legacy-style global variables.
 * Used by SET_VARIABLE browser commands.
 */
export interface GlobalVariableStore {
    variables: Record<string, unknown>;
    setVariable: (name: string, value: unknown) => void;
    getVariable: <T = unknown>(name: string) => T | undefined;
    getAllVariables: () => Record<string, unknown>;
    clearVariables: () => void;
}

/**
 * Known global variables from legacy VBScript system.
 * Matches marrSessionInformation array and mstr* global variables.
 */
export interface KnownGlobalVariables {
    /** Company Location (sessionInformation[0]) */
    mstrCompLoc?: string;
    /** User ID (sessionInformation[1]) */
    mstrUserID?: string;
    /** Policy ID (sessionInformation[2]) */
    mstrPolicyID?: string;
    /** Node Key (sessionInformation[3]) */
    mstrNodeKey?: string;
    /** Current action context (sessionInformation[4]) - CRITICAL for NAVIGATE_CYCLING */
    mstrAction?: string;
    /** Diagnostic mode (sessionInformation[5]) */
    mstrDiagnosticMode?: string;
    /** XML detail session data (sessionInformation[6]) */
    mstrXMLDetail?: string;
    /** Current button matchcode (NEW - for action combining) */
    mstrCurrentButton?: string;
    /** Transaction type */
    mstrTransactionType?: string;
    /** Policy number */
    mstrPolicyNumber?: string;
    /** Primary insured name */
    mstrPrimaryInsured?: string;
}

/**
 * Function type for individual command handlers.
 * Returns void or Promise<void> for async operations.
 */
export type CommandHandler = (
    noun: string,
    addinf: string,
    resfil?: string,
) => void | Promise<void>;

/**
 * Field-level authorization flags for a single `matchcode`.
 */
export interface FieldPermission {
    visible: boolean;
    editable: boolean;
    required?: boolean;
}

/**
 * Page-level authorization buckets for ASP-backed routes.
 */
export interface PagePermissions {
    allowedAspFiles: string[];
    deniedAspFiles: string[];
}

/**
 * Action-level authorization buckets for backend verbs/commands.
 */
export interface ActionPermissions {
    allow: string[];
    deny: string[];
}

/**
 * Generic permission effect used by lookup helpers.
 */
export type PermissionEffect = 'allow' | 'deny';

/**
 * Utility map for ASP page authorization decisions.
 */
export type PagePermissionLookup = Record<string, PermissionEffect>;

/**
 * Utility map for action authorization decisions.
 */
export type ActionPermissionLookup = Record<string, PermissionEffect>;

/**
 * Normalized authorization snapshot derived from `GetUserData` payloads.
 *
 * @remarks
 * `rawSecurity` and `rawOptions` are retained for diagnostics and
 * troubleshooting when incoming payload structures vary by `compLoc`.
 */
export interface PermissionSnapshot {
    rawSecurity: Record<string, unknown>;
    rawOptions: Record<string, unknown>;
    page: PagePermissions;
    actions: ActionPermissions;
    fields: Record<string, FieldPermission>;
}

