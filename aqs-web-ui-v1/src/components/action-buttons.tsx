/**
 * ActionButtons Component
 * ----------------------
 * Dynamically renders action buttons (OK, Cancel, Next, Submit, Delete, Add, etc.)
 * from the API response. Buttons are identified by matchcode.
 *
 * Supported matchcodes (sourced from the full AQS legacy codebase):
 *   Navigation : OK | NEXT | CANCEL | BACK | OKSPECIAL
 *   CRUD       : ADD | DELETE | SAVE | APPLY
 *   Search     : SEARCH | SET_SEARCH
 *   Form       : SUBMIT | RESET | CLEAR
 *   Misc       : RATE | COPYADDRESS | OVERRIDEPRINT
 *
 * Features:
 *   - Auto-discovers button controls from raw API controls array
 *   - Respects `@disabled`, `@visible`, and `@text` from API
 *   - Accepts runtime overrides (e.g. from required-field validation or browser commands)
 *   - Preserves button `calls` for the click handler
 *   - Renders in configurable horizontal or vertical layout
 *   - Fully driven by data - no manual button JSX required
 *
 * NOTE: This component does NOT contain required-field validation logic itself.
 *       Use the `useRequiredFieldValidation` hook to compute the `buttonOverrides`
 *       prop from the current form state.
 */

import React, { useMemo } from 'react';
import { Stack, Button } from '@mui/material';
import { BUTTON_MATCHCODES } from '@/constants/button-matchcodes';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Matches the shape of a raw control item from the page-build API response */
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

/** Runtime override for a single button's meta (disabled / visible) */
export interface ButtonOverride {
    disabled?: boolean;
    visible?: boolean;
}

export interface ActionButtonsProps {
    /**
     * Raw controls array from API (`pageBuild.Page.controls.control`).
     * The component filters out only known button matchcodes.
     */
    controls: RawButtonControl[];

    /**
     * Runtime overrides keyed by UPPER-CASED matchcode.
     * These take precedence over the API's `@disabled` / `@visible`.
     * Typically produced by `useRequiredFieldValidation().buttonDisableMap`
     * merged with `useComputedButtonStates()`.
     */
    buttonOverrides?: Record<string, ButtonOverride>;

    /**
     * Called when any action button is clicked.
     * Receives the button matchcode (upper-cased) as argument.
     */
    onButtonClick?: (matchcode: string) => void;

    /** Layout direction. Default: 'row' */
    orientation?: 'row' | 'column';

    /** MUI Stack spacing. Default: 1 */
    spacing?: number;

    /** Additional sx passed to the outer container */
    sx?: Record<string, unknown>;
}

// BUTTON_MATCHCODES imported from @/constants/button-matchcodes

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const flagToBool = (v: unknown, defaultVal = false): boolean => {
    if (v === undefined || v === null || v === '') return defaultVal;
    if (typeof v === 'boolean') return v;
    const s = String(v).trim().toUpperCase();
    return s === 'T' || s === 'TRUE' || s === '1' || s === 'Y';
};

/** Derive a display order for each button matchcode */
const defaultOrder = (mc: string): number => {
    switch (mc) {
        // Primary actions
        case 'OK':
        case 'OKSPECIAL':
            return 1;
        case 'NEXT':
            return 2;
        case 'SUBMIT':
        case 'SAVE':
            return 3;
        case 'APPLY':
            return 4;

        // CRUD actions
        case 'ADD':
            return 10;
        case 'DELETE':
            return 11;

        // Search / domain actions
        case 'SEARCH':
        case 'SET_SEARCH':
            return 20;
        case 'RATE':
            return 21;
        case 'COPYADDRESS':
            return 22;
        case 'OVERRIDEPRINT':
            return 23;

        // Navigation helpers
        case 'BACK':
            return 80;
        case 'RESET':
            return 81;
        case 'CLEAR':
            return 82;
        case 'CANCEL':
            return 99; // Cancel always last

        default:
            return 50;
    }
};

// -----------------------------------------------------------------------
// Shared sx tokens
// -----------------------------------------------------------------------
const baseSx = {
    fontSize: '14px',
} as const;

/** Determine visual variant and style based on button's role */
const getButtonStyle = (
    mc: string,
): {
    variant: 'primary' | 'secondary' | 'text';
    sx: Record<string, unknown>;
} => {
    switch (mc) {
        // — Primary (contained dark-blue) ——————————
        case 'OK':
        case 'OKSPECIAL':
        case 'NEXT':
        case 'SUBMIT':
        case 'SAVE':
            return {
                variant: 'primary',
                sx: {
                    ...baseSx,
                },
            };

        // — Destructive (contained red) ——————————
        case 'DELETE':
            return {
                variant: 'secondary',
                sx: {
                    ...baseSx,
                },
            };

        // — Accent actions (outlined blue) ——————————
        case 'ADD':
        case 'APPLY':
        case 'RATE':
        case 'SEARCH':
        case 'SET_SEARCH':
        case 'COPYADDRESS':
        case 'OVERRIDEPRINT':
            return {
                variant: 'primary',
                sx: {
                    ...baseSx,
                },
            };

        // — Default (neutral outlined) ——————————
        default:
            return {
                variant: 'secondary',
                sx: {
                    ...baseSx,
                },
            };
    }
};

// -----------------------------------------------------------------------
// Parsed button for rendering
// -----------------------------------------------------------------------

interface ParsedButton {
    matchcode: string; // UPPER-CASED
    text: string;
    disabled: boolean;
    visible: boolean;
    utporder: number;
    raw: RawButtonControl;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    controls,
    buttonOverrides = {},
    onButtonClick,
    orientation = 'row',
    spacing = 1,
    sx = {},
}) => {
    /** Extract, normalise and sort buttons from raw controls */
    const buttons: ParsedButton[] = useMemo(() => {
        if (!controls || controls.length === 0) return [];

        const extracted: ParsedButton[] = [];

        for (const ctrl of controls) {
            const mc = (ctrl['@matchcode'] || '').toString().toUpperCase();
            if (!BUTTON_MATCHCODES.has(mc)) continue;

            extracted.push({
                matchcode: mc,
                text: (ctrl['@text'] as string) || mc,
                disabled: flagToBool(ctrl['@disabled']),
                visible: flagToBool(ctrl['@visible'], true),
                utporder: Number(ctrl['@utporder'] ?? defaultOrder(mc)),
                raw: ctrl,
            });
        }

        // Sort: buttons with explicit server @utporder come first (sorted among
        // themselves by that value); buttons without @utporder follow, sorted by
        // the component's built-in defaultOrder.  This prevents the defaultOrder
        // fallback (e.g. OK=1) from accidentally sorting ahead of a server-ordered
        // button like NEXT (@utporder=100).
        extracted.sort((a, b) => {
            const aExplicit = a.raw['@utporder'] != null && a.raw['@utporder'] !== '';
            const bExplicit = b.raw['@utporder'] != null && b.raw['@utporder'] !== '';

            if (aExplicit && !bExplicit) return -1;
            if (!aExplicit && bExplicit) return 1;

            // Both in the same group — compare by utporder value
            if (a.utporder !== b.utporder) return a.utporder - b.utporder;
            return defaultOrder(a.matchcode) - defaultOrder(b.matchcode);
        });

        return extracted;
    }, [controls]);

    /** Apply runtime overrides to produce final render-ready state */
    const visibleButtons = useMemo(() => {
        return buttons
            .map((btn) => {
                const override = buttonOverrides[btn.matchcode];
                return {
                    ...btn,
                    disabled: override?.disabled ?? btn.disabled,
                    visible: override?.visible ?? btn.visible,
                };
            })
            .filter((btn) => btn.visible);
    }, [buttons, buttonOverrides]);

    if (visibleButtons.length === 0) return null;

    return (
        <Stack
            direction={orientation}
            spacing={spacing}
            sx={{
                justifyContent: 'flex-end',
                ...sx,
            }}
        >
            {visibleButtons.map((btn) => {
                const style = getButtonStyle(btn.matchcode);

                return (
                    <Button
                        key={btn.matchcode}
                        variant={style.variant}
                        size="small"
                        disabled={btn.disabled}
                        onClick={() => onButtonClick?.(btn.matchcode)}
                        sx={style.sx}
                    >
                        {btn.text}
                    </Button>
                );
            })}
        </Stack>
    );
};
