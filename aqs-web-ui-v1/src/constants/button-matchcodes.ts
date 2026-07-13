/**
 * Centralized set of all known button matchcodes across the AQS application.
 *
 * Sourced from the full AQS legacy codebase (VBS + C#):
 *   Navigation : OK | NEXT | CANCEL | BACK | OKSPECIAL
 *   CRUD       : ADD | DELETE | SAVE | APPLY
 *   Search     : SEARCH | SET_SEARCH
 *   Form       : SUBMIT | RESET | CLEAR
 *   Misc       : RATE | COPYADDRESS | OVERRIDEPRINT
 *
 * Import this constant wherever you need to identify button controls from
 * the API response (e.g. useButtonExtraction, ActionButtons, etc.).
 * Declare here ONCE - never duplicate.
 */
export const BUTTON_MATCHCODES = new Set([
    // Navigation buttons  (VBS: NavButtonOnClick -> Case "DTAOK", "DTANEXT", "DTAOKSPECIAL", "DTACANCEL", "DT⟪?⟫
    'OK',
    'NEXT',
    'CANCEL',
    'BACK',
    'OKSPECIAL',

    // CRUD buttons  (C#: cLocAdrEntEdt, cKRMState, cPRPSpcCovEntEdt, cLIASpcCovEntEdt, etc.)
    'ADD',
    'DELETE',
    'SAVE',

    // Action / workflow buttons
    'APPLY',
    'RATE', // IBUTTON on menu toolbar (VBS line 5449)

    // Search buttons  (C#: cPOE4, cLC14, cBOE4, cKRMState, cBOPBldClsEntEdt, cRRE4)
    'SEARCH',
    'SET_SEARCH',

    // Form-level buttons
    'SUBMIT',
    'RESET',
    'CLEAR',

    // Misc / domain-specific buttons
    'COPYADDRESS', // cLocAdrEntEdt (location address pages)
    'OVERRIDEPRINT', // cDocSum (document summary pages)
]) as Set<string>;
