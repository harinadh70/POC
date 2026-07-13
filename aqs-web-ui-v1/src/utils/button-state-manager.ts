/**
 * Button State Manager Utility
 * -----------------------------
 * Comprehensive utility for extracting, normalizing, and computing final states for buttons
 * from the PageBuild API response.
 *
 * Handles:
 *   - Extracting button controls from raw API controls array
 *   - Normalizing button properties (@matchcode, @text, @disabled, @visible)
 *   - Computing final button states based on visibility and required-field validation
 *   - Providing override maps for ActionButtons component
 *
 * Core Rules:
 *   - Buttons are controls where @controltype === "button"
 *   - A button is only rendered if @visible === "T"
 *   - A button is disabled by default if @disabled === "T"
 *   - If all required fields are filled, override disabled to "F" for VISIBLE buttons only
 *   - CANCEL and other non-validation-affected buttons maintain their API state
 */

import type { ButtonOverride } from '@components/action-buttons';

// ---------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------

/** Raw button control from the API response */
export interface RawButtonControl {
    '@matchcode'?: string;
    '@text'?: string;
    '@disabled'?: string;
    '@visible'?: string;
    '@utporder'?: string | number;
    '@controltype'?: string;
    calls?: unknown;
    [key: string]: unknown;
}

/** Normalized button definition */
export interface NormalizedButton {
    matchcode: string | number;
    text: string;
    disabled: boolean;
    visible: boolean;
    utporder: number;
    raw: RawButtonControl;
}

/** Final computed button state */
export interface FinalButtonState {
    matchcode: string;
    text: string;
    disabled: boolean;
    visible: boolean;
    utporder: number;
    /** Whether this button's disabled state was overridden by validation */
    disabledByValidation: boolean;
}

// ---------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------

/**
 * Buttons that are affected by required-field validation.
 * When all required fields are filled, these buttons are enabled.
 * Others maintain their API disabled state.
 *
 * Mirrors VBS logic: Case "DTAOK", "DTANEXT", "DTAOKSPECIAL"
 */
export const BUTTONS_AFFECTED_BY_VALIDATION = new Set(['OK', 'NEXT', 'OKSPECIAL', 'SUBMIT']);

/**
 * Default order for buttons without explicit @utporder.
 * Determines render order. Lower numbers render first.
 *
 * Priority order:
 * 1. NEXT (1)
 * 2. OK (2)
 * 3. CANCEL (3)
 * 4. Other validation-affected buttons
 * 5. Other buttons
 * 6. Static/header buttons (HEADERBTN1, etc.)
 */
const DEFAULT_BUTTON_ORDER: Record<string, number> = {
    NEXT: 1,
    OK: 2,
    CANCEL: 3,
    OKSPECIAL: 4,
    SUBMIT: 5,
    SAVE: 6,
    APPLY: 7,
    ADD: 10,
    DELETE: 11,
    SEARCH: 20,
    SET_SEARCH: 21,
    RATE: 22,
    BACK: 80,
    RESET: 81,
    CLEAR: 82,
    HEADERBTN1: 100,
    PATHUPDATE: 100,
};

// ------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------

/**
 * Convert string flag to boolean
 * Matches API convention: "T"/"F", "1"/"0", "true"/"false"
 */
function flagToBool(value: unknown, defaultValue = false): boolean {
    if (value === undefined || value === null || value === '') return defaultValue;
    if (typeof value === 'boolean') return value;
    const str = String(value).trim().toUpperCase();
    return str === 'T' || str === 'TRUE' || str === '1' || str === 'Y';
}

/**
 * Get default order for a button
 * Used when @utporder is not specified
 */
function getDefaultOrder(matchcode: string): number {
    const upper = matchcode.toUpperCase();
    return DEFAULT_BUTTON_ORDER[upper] ?? 50;
}

// ------------------------------------------------------------
// Core Extraction & Normalization
// ------------------------------------------------------------

/**
 * Extract button controls from raw controls array.
 * Filters only controls where @controltype === "button".
 *
 * @param controls - Raw controls array from API (pageBuild.Page.controls.control)
 * @returns Normalized button controls
 */
export function extractButtons(controls: RawButtonControl[]): NormalizedButton[] {
    if (!controls || !Array.isArray(controls)) return [];

    return (
        controls
            // Filter only button controls
            .filter((ctrl) => {
                const controlType = (ctrl['@controltype'] || '').toLowerCase();
                return controlType === 'button';
            })
            // Normalize each button
            .map((ctrl) => {
                const matchcode = (ctrl['@matchcode'] || '').toUpperCase().trim();
                return {
                    matchcode,
                    text: (ctrl['@text'] as string) || matchcode,
                    disabled: flagToBool(ctrl['@disabled']),
                    visible: flagToBool(ctrl['@visible'], true), // Default visible=true if not specified
                    utporder: Number(ctrl['@utporder'] ?? getDefaultOrder(matchcode)),
                    raw: ctrl,
                };
            })
            // Filter out buttons with empty matchcode
            .filter((btn) => btn.matchcode.length > 0)
    );
}
/**
 * Compute final button states based on validation and visibility.
 * Rules:
 * - If button is NOT visible (@visible="F"): keep it hidden and disabled
 *   - If allRequiredFilled=true: override disabled to false
 *   - If allRequiredFilled=false: keep disabled as true
 * - If button IS visible (@visible="T"):
 *   - If button is in BUTTONS_AFFECTED_BY_VALIDATION (OK, NEXT, etc.):
 *     - If allRequiredFilled=true: override disabled to false
 *     - If allRequiredFilled=false: keep disabled state from API
 *   - If button is NOT in BUTTONS_AFFECTED_BY_VALIDATION (CANCEL, etc.):
 *     - Keep disabled state from API
 *
 * @param buttons - Normalized buttons from extractButtons()
 * @param allRequiredFilled - Whether all required fields have values
 * @returns Final button states with override information
 */
export function computeButtonStates(
    buttons: NormalizedButton[],
    allRequiredFilled: boolean,
): FinalButtonState[] {
    return buttons.map((btn) => {
        let finalDisabled = btn.disabled;
        let disabledByValidation = false;

        // Only apply validation logic if button is visible
        if (btn.visible && BUTTONS_AFFECTED_BY_VALIDATION.has(btn.matchcode)) {
            // Button is affected by validation
            finalDisabled = !allRequiredFilled;
            disabledByValidation = true;

            console.debug('[ButtonStateManager] Validation override applied', {
                matchcode: btn.matchcode,
                allRequiredFilled,
                apiDisabled: btn.disabled,
                finalDisabled,
            });
        }

        return {
            matchcode: btn.matchcode,
            text: btn.text,
            disabled: finalDisabled,
            visible: btn.visible,
            utporder: btn.utporder,
            disabledByValidation,
        };
    });
}

/**
 * Convert final button states to ActionButtons override map format.
 *
 * @param finalStates - Final button states from computeButtonStates()
 * @returns Override map keyed by matchcode
 */
export function computeButtonOverridesMap(
    finalStates: FinalButtonState[],
): Record<string, ButtonOverride> {
    const map: Record<string, ButtonOverride> = {};

    for (const state of finalStates) {
        map[state.matchcode] = {
            disabled: state.disabled,
            visible: state.visible,
        };
    }

    return map;
}

/**
 * Sort buttons by utporder for rendering.
 * Buttons with explicit @utporder come first (sorted by value),
 * then buttons with default order (sorted by defaultOrder).
 *
 * @param buttons - Buttons to sort
 * @returns Sorted buttons
 */
export function sortButtonsByOrder<T extends { utporder: number }>(buttons: T[]): T[] {
    return [...buttons].sort((a, b) => {
        const aExplicit = 'raw' in a ? (a as any).raw['@utporder'] != null : false;
        const bExplicit = 'raw' in b ? (b as any).raw['@utporder'] != null : false;

        // Explicit orders come first
        if (aExplicit && !bExplicit) return -1;
        if (!aExplicit && bExplicit) return 1;

        // Same group: compare utporder
        return a.utporder - b.utporder;
    });
}

// ------------------------------------------------------------
// Comprehensive Processing
// ------------------------------------------------------------

/**
 * All-in-one function to extract, normalize, compute states, and generate overrides.
 *
 * @param controls - Raw controls from API
 * @param allRequiredFilled - Whether all required fields have values
 * @returns Object containing buttons, final states, and override map
 */
export function processButtonsForRendering(
    controls: RawButtonControl[],
    allRequiredFilled: boolean,
) {
    // Step 1: Extract and normalize
    const buttons = extractButtons(controls);

    // Step 2: Compute final states
    const finalStates = computeButtonStates(buttons, allRequiredFilled);

    // Step 3: Sort by order
    const sortedButtons = sortButtonsByOrder(buttons);
    const sortedFinalStates = sortButtonsByOrder(finalStates);

    // Step 4: Generate override map
    const buttonOverrides = computeButtonOverridesMap(finalStates);

    // Step 5: Debug logging
    console.group('[ButtonStateManager] Button Processing Complete');
    console.log('Extracted buttons:', buttons.length);
    console.log('All required filled:', allRequiredFilled);
    console.table(
        finalStates.map((state) => ({
            Matchcode: state.matchcode,
            Text: state.text,
            Visible: state.visible ? '✓' : 'X',
            Disabled: state.disabled ? '✓' : 'X',
            'Validation Override': state.disabledByValidation ? '✓' : '-',
            Order: state.utporder,
        })),
    );
    console.groupEnd();

    return {
        buttons: sortedButtons,
        finalStates: sortedFinalStates,
        buttonOverrides,
        visibleButtons: finalStates.filter((btn) => btn.visible),
    };
}

// ---------------------------------------------------------------------------
// PageBuildButton Integration (for form-renderer)
// ---------------------------------------------------------------------------

/**
 * Compute button overrides from PageBuildButton array (already parsed from API).
 * Simpler than processButtonsForRendering since these buttons are already normalized.
 *
 * This is the main entry point for form-renderer.tsx integration.
 *
 * @param buttons - PageBuildButton array from API response
 * @param allRequiredFilled - Whether all required fields have values
 * @returns Override map for ActionButtons component
 */
export function computePageBuildButtonOverrides(
    buttons: Array<{
        matchcode: string;
        text: string;
        disabled: boolean;
        visible: boolean;
    }>,
    allRequiredFilled: boolean,
): Record<string, ButtonOverride> {
    const overrides: Record<string, ButtonOverride> = {};

    for (const button of buttons) {
        // Normalize matchcode to uppercase for case-insensitive checks
        const matchcodeUpper = button.matchcode?.toUpperCase?.() || '';

        // If button is not visible, keep it hidden and disabled
        if (!button.visible) {
            overrides[matchcodeUpper] = {
                visible: false,
                disabled: true,
            };
            continue;
        }

        // Button is visible - check if it should be enabled by validation
        // Use uppercase matchcode for consistent comparison with BUTTONS_AFFECTED_BY_VALIDATION
        const isAffectedByValidation = BUTTONS_AFFECTED_BY_VALIDATION.has(matchcodeUpper);

        if (isAffectedByValidation) {
            // Button is affected by validation - disable if required fields are empty
            overrides[matchcodeUpper] = {
                visible: true,
                disabled: !allRequiredFilled, // Force disabled=true if required fields not filled
            };
        } else {
            // Button is not affected by validation - keep API state
            overrides[matchcodeUpper] = {
                visible: true,
                disabled: button.disabled,
            };
        }
    }

    // Debug logging
    console.group('[ButtonStateManager] PageBuild Button Processing');
    console.log('Total buttons:', buttons.length);
    console.log('All required filled:', allRequiredFilled);
    console.table(
        buttons.map((btn) => {
            const matchcodeUpper = btn.matchcode?.toUpperCase?.() || '';
            const override = overrides[matchcodeUpper];
            const isAffected = BUTTONS_AFFECTED_BY_VALIDATION.has(matchcodeUpper);
            return {
                Matchcode: btn.matchcode,
                Text: btn.text,
                Visible: override.visible ? '✓' : 'X',
                'API Disabled': btn.disabled ? '✓' : 'X',
                'Final Disabled': override.disabled ? '✓' : 'X',
                'Validation-Affected': isAffected ? '✓' : '-',
            };
        }),
    );
    console.groupEnd();

    return overrides;
}
