/**
 * usePageForm — ONE master hook for every AQS page component.
 * ─────────────────────────────────────────────
 * Consolidates ALL common boilerplate that was previously ~100+ lines
 * of hook calls inside each page component:
 *
 *
 *   Form state (values + fieldMeta)                          ← useReducer
 *   Button extraction from API controls                      ← memoized split
 *   Button state (runtime overrides via commands)             ← useReducer
 *   Browser-command processing on mount                       ← useEffect (once)
 *   Field normalization + runtime overlay                     ← two-stage memo
 *   Required-field validation → disable map                   ← useRequiredFieldValidation
 *   Computed (merged) final button states                     ← memoized merge
 *
 *
 * Usage in a page component:
 * ─────────────────────────
 *
 *   — Scenario A: Fully dynamic (component uses updatedFields directly) —
 *   const page = usePageForm({
 *       rawControls,
 *       pageBuildCalls: pageBuild?.Page?.calls,
 *   });
 *   // Validation is driven by page.updatedFields + page.fieldState.values
 *
 *   — Scenario B: Static + dynamic fields (component has its own merged fields) —
 *   const page = usePageForm({
 *       rawControls,
 *       pageBuildCalls: pageBuild?.Page?.calls,
 *       externalFields: myMergedFields,   // ← your NormalizedField[]
 *       externalValues: myFormValues,     // ← your local FormValues state
 *   });
 *   // Validation is driven by externalFields + externalValues
 *
 * // No manual batchSetValues / setValue sync needed!
 *
 * // Then use:
 *   page.updatedFields          - fields ready for <FormRenderer> (Scenario A)
 *   page.fieldState.values      - current form values (Scenario A)
 *   page.fieldActions           - { setValue, batchSetValues, setFieldMeta, batchSetFieldMeta, reset }
 *   page.rawControls            - pass to <ActionButtons controls={…}>
 *   page.finalButtonStates      - pass to <ActionButtons buttonOverrides={…}>
 *   page.buttonActions          - { setButtonMeta, batchSetButtonMeta, setButtonCommands, batchSetButtonCom⟪mands⟫ }
 *   page.initialButtonCommands  - merged button commands for click handler
 *   page.buttonMatchcodes       - string[] of matchcodes present on the page
 *   page.allRequiredFilled      - boolean
 *   page.missingFields          - string[] of missing required field matchcodes
 *   page.buttonDisableMap       - per-button { disabled } map from validation
 *
 * Page-specific code that the component still handles:
 *   - Session data / EE data (page-specific payloads)
 *   - handleCommitField (field blur → API call → apply result via fieldActions)
 *   - handleButtonClick (navigation, button commands)
 *   - loadOptions (dropdown loading)
 */

import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';

import { BUTTON_MATCHCODES } from '@/constants/button-matchcodes';
import { useRequiredFieldValidation } from '@/hooks/use-required-field-validation';
import { normalizeServiceConfig, type ServiceField } from '@utils/normalize-service-config';
import { applyCommands, type BrowserCommand } from '@/utils/apply-server-commands';
import type { NormalizedField, FormValues } from '@/types';

// Exported Types
//
/** Runtime overrides for a single form field (disabled / visible). */
export type FieldMeta = {
    disabled?: boolean;
    visible?: boolean;
};

/** Runtime overrides for a single button (disabled / visible). */
export type ButtonMeta = {
    disabled?: boolean;
    visible?: boolean;
};

/** Form state managed by the hook. */
export interface FormState {
    values: FormValues;
    fieldMeta: Record<string, FieldMeta>;
}

/** Button state managed by the hook. */
export interface ButtonState {
    meta: Record<string, ButtonMeta>;
    commands: Record<string, BrowserCommand[]>;
}

/** Actions exposed for form field state manipulation. */
export interface FormFieldActions {
    setValue: (noun: string, value: string | boolean) => void;
    setFieldMeta: (noun: string, meta: FieldMeta) => void;
    batchSetValues: (values: Record<string, string | boolean>) => void;
    batchSetFieldMeta: (fieldMeta: Record<string, FieldMeta>) => void;
    reset: () => void;
}

/** Actions exposed for button state manipulation. */
export interface ButtonStateActions {
    setButtonMeta: (buttonName: string, meta: ButtonMeta) => void;
    batchSetButtonMeta: (buttonMeta: Record<string, ButtonMeta>) => void;
    setButtonCommands: (buttonName: string, commands: BrowserCommand[]) => void;
    batchSetButtonCommands: (buttonCommands: Record<string, BrowserCommand[]>) => void;
}

// — Hook input / output —

export interface UsePageFormOptions {
    /** Raw controls from the API: `pageBuild.Page.controls.control` */
    rawControls: ServiceField[];
    /** Page-level calls from the API: `pageBuild?.Page?.calls` */
    pageBuildCalls?: unknown;
    /** Which buttons should be disabled when required fields are empty.
     * When omitted, the underlying validation utility uses its own
     * VBS-derived default (OK, NEXT, OKSPECIAL) — fully dynamic,
     * no static values in this hook.
     */
    buttonsAffectedByValidation?: string[];

    /**
     * **Scenario B — static + dynamic fields.**
     *
     * When a page component builds its own field definitions (e.g. merging
     * static layout with pageBuild data), pass the resulting array here.
     * The hook will use these — instead of its internally normalised
     * `updatedFields` — for required-field validation.
     *
     * When omitted, the hook falls back to its own `updatedFields` (Scenario A).
     */
    externalFields?: ReadonlyArray<
        Pick<NormalizedField, 'matchcode' | 'label' | 'required' | 'visible' | 'controlType'>
    >;

    /**
     * **Scenario B — companion to `externalFields`.**
     *
     * The component's own receiving form values (e.g. from `useState`) ⟪?⟫
     * always sees the latest user input — no manual fieldActions.setValue
     * sync required. When omitted the hook falls back to its internal
     * `fieldState.values`.
     */
    externalValues?: FormValues;
}

export interface UsePageFormReturn {
    // — Form fields ——————————————
    /** Normalized + runtime-overlaid fields, ready for `<FormRenderer>`. */
    updatedFields: NormalizedField[];
    ⟪?⟫
    ⟪?⟫
    ⟪?⟫
    /** Current form state (values + fieldMeta). */
    fieldState: FormState;
    /** Imperative actions for form state. */
    fieldActions: FormFieldActions;

    // — Button extraction ——————————————
    /** Non-button controls (form fields only). */
    formControls: ServiceField[];
    /** Button matchcodes present on this page. */
    buttonMatchcodes: string[];
    /** Initial button meta from API (disabled / visible flags). */
    initialButtonMeta: Record<string, ButtonMeta>;
    /** Initial button commands from API. */
    initialButtonCommands: Record<string, any[]>;

    // — Button state ——————————————
    /** Runtime button state (overrides applied via browser commands). */
    buttonState: ButtonState;
    /** Imperative actions for button state. */
    buttonActions: ButtonStateActions;
    /** Final merged button states (API + runtime + validation). Pass to `<ActionButtons buttonOverrides>`. */
    finalButtonStates: Record<string, ButtonMeta>;
    /**
     * Merged button commands: API initial + any runtime overrides.
     * Use as the command source in your button click handler.
     */
    mergedButtonCommands: Record<string, BrowserCommand[]>;

    // — Validation ——————————————
    /** True when every required + visible field has a value. */
    allRequiredFilled: boolean;
    /** Required fields that are still empty (matchcode + label). */
    missingFields: { matchcode: string; label: string }[];
    /** Per-button `{ disabled }` map from required-field validation. */
    buttonDisableMap: Record<string, { disabled: boolean }>;
}

// ═══════════════════════════════════════════
// Internal reducer types (not exported)
// ═══════════════════════════════════════════

type FormFieldAction =
    | { type: 'SET_VALUE'; noun: string; value: string | boolean }
    | { type: 'SET_FIELD_META'; noun: string; meta: FieldMeta }
    | { type: 'BATCH_SET_VALUES'; values: Record<string, string | boolean> }
    | { type: 'BATCH_SET_META'; fieldMeta: Record<string, FieldMeta> }
    | { type: 'RESET' };

type ButtonAction =
    | { type: 'SET_BUTTON_META'; buttonName: string; meta: ButtonMeta }
    | { type: 'BATCH_SET_BUTTON_META'; buttonMeta: Record<string, ButtonMeta> }
    | { type: 'SET_BUTTON_COMMANDS'; buttonName: string; commands: BrowserCommand[] }
    | { type: 'BATCH_SET_BUTTON_COMMANDS'; buttonCommands: Record<string, BrowserCommand[]> };

// ═══════════════════════════════════════════
// The Master Hook
// ═══════════════════════════════════════════

export function usePageForm(options: UsePageFormOptions): UsePageFormReturn {
    const {
        rawControls,
        pageBuildCalls,
        buttonsAffectedByValidation,
        externalFields,
        externalValues,
    } = options;

    // 1. Form field state (values + fieldMeta)
    const formReducer = useCallback((state: FormState, action: FormFieldAction): FormState => {
        switch (action.type) {
            case 'SET_VALUE':
                return { ...state, values: { ...state.values, [action.noun]: action.value } };
            case 'SET_FIELD_META':
                return { ...state, fieldMeta: { ...state.fieldMeta, [action.noun]: action.meta } };
            case 'BATCH_SET_VALUES':
                return { ...state, values: { ...state.values, ...action.values } };
            case 'BATCH_SET_META':
                return { ...state, fieldMeta: { ...state.fieldMeta, ...action.fieldMeta } };
            case 'RESET':
                return { values: {}, fieldMeta: {} };
            default:
                return state;
        }
    }, []);

    const [fieldState, fieldDispatch] = useReducer(formReducer, {
        values: {},
        fieldMeta: {},
    });

    const fieldActions: FormFieldActions = useMemo(
        () => ({
            setValue: (noun, value) => fieldDispatch({ type: 'SET_VALUE', noun, value }),
            setFieldMeta: (noun, meta) => fieldDispatch({ type: 'SET_FIELD_META', noun, meta }),
            batchSetValues: (values) => fieldDispatch({ type: 'BATCH_SET_VALUES', values }),
            batchSetFieldMeta: (fieldMeta) => fieldDispatch({ type: 'BATCH_SET_META', fieldMeta }),
            reset: () => fieldDispatch({ type: 'RESET' }),
        }),
        []
    );

    // 2. Button extraction — split controls into buttons vs form fields
    //
    ⟪? lines not clearly resolvable through ghosting ?⟫
    const extraction = useMemo(() => {
        if (!rawControls || rawControls.length === 0) {
            return {
                formControls: [] as ServiceField[],
                initialButtonMeta: {} as Record<string, ButtonMeta>,
                initialButtonCommands: {} as Record<string, BrowserCommand[]>,
            };
        }

        const flagToBoolean = (v: unknown, defaultFalse = false): boolean => {
            if (v === undefined || v === null || v === '') return defaultFalse;
            if (typeof v === 'boolean') return v;
            const s = String(v).trim().toUpperCase();
            return s === 'T' || s === 'TRUE' || s === '1' || s === 'Y';
        };

        const formControls: ServiceField[] = [];
        const initialButtonMeta: Record<string, ButtonMeta> = {};
        const initialButtonCommands: Record<string, any[]> = {};

        rawControls.forEach((control) => {
            const matchcode = (control['@matchcode'] || control.matchcode || '')
                .toString()
                .toUpperCase()
                .trim();

            if (BUTTON_MATCHCODES.has(matchcode)) {
                initialButtonMeta[matchcode] = {
                    disabled: flagToBoolean(control['@disabled']),
                    visible: flagToBoolean(control['@visible'], true),
                };
                if (control.calls) {
                    initialButtonCommands[matchcode] = Array.isArray(control.calls)
                        ? control.calls
                        : [control.calls];
                }
            } else {
                formControls.push(control);
            }
        });

        return { formControls, initialButtonMeta, initialButtonCommands };
    }, [rawControls]);

    //
    // 3. Button state (runtime overrides from browser commands)
    //
    const buttonReducer = useCallback((state: ButtonState, action: ButtonAction): ButtonState => {
        switch (action.type) {
            case 'SET_BUTTON_META':
                return {
                    ...state,
                    meta: { ...state.meta, [action.buttonName]: action.meta },
                };
            case 'BATCH_SET_BUTTON_META':
                return { ...state, meta: { ...state.meta, ...action.buttonMeta } };
            case 'SET_BUTTON_COMMANDS':
                return {
                    ...state,
                    commands: { ...state.commands, [action.buttonName]: action.commands },
                };
            case 'BATCH_SET_BUTTON_COMMANDS':
                return { ...state, commands: { ...state.commands, ...action.buttonCommands } };
            default:
                return state;
        }
    }, []);

    const [buttonState, buttonDispatch] = useReducer(buttonReducer, {
        meta: {},
        commands: {},
    });

    const buttonActions: ButtonStateActions = useMemo(
        () => ({
            setButtonMeta: (buttonName, meta) =>
                buttonDispatch({ type: 'SET_BUTTON_META', buttonName, meta }),
            batchSetButtonMeta: (buttonMeta) =>
                buttonDispatch({ type: 'BATCH_SET_BUTTON_META', buttonMeta }),
            setButtonCommands: (buttonName, commands) =>
                buttonDispatch({ type: 'SET_BUTTON_COMMANDS', buttonName, commands }),
            batchSetButtonCommands: (buttonCommands) =>
                buttonDispatch({ type: 'BATCH_SET_BUTTON_COMMANDS', buttonCommands }),
        }),
        []
    // TODO ⟪missing lines 352-354 — not captured in photos⟫

    // 4. Browser commands — process page-build calls ONCE on mount
    //     (sets initial field values + fieldMeta from API browser commands)
    //
    const hasRunBrowserCmds = useRef(false);

    useEffect(() => {
        if (!pageBuildCalls || hasRunBrowserCmds.current) return;

        const callsArray = Array.isArray(pageBuildCalls) ? pageBuildCalls : [pageBuildCalls];
        if (callsArray.length === 0) return;

        let actualCommands: any[] = [];
        callsArray.forEach((callObj: any) => {
            if (Array.isArray(callObj.call)) {
                actualCommands = actualCommands.concat(callObj.call);
            } else if (callObj.call && typeof callObj.call === 'object') {
                actualCommands.push(callObj.call);
            }
        });

        const browserCommands: BrowserCommand[] = actualCommands
            .map((cmd: any) => ({
                verb: cmd.verb || cmd['@verb'] || '',
                noun: cmd.noun || cmd['@noun'] || '',
                addinf: cmd.addinf || cmd['@addinf'] || '',
                resfil: cmd.resfil || cmd['@resfil'] || '',
            }))
            .filter((cmd) => !!(cmd.verb || cmd.noun));

        if (browserCommands.length === 0) return;

        const valuesToSet: Record<string, string | boolean> = {};

        const fieldMetaToSet: Record<string, FieldMeta> = {};

        applyCommands(browserCommands, {
            setText: (noun, value) => {
                valuesToSet[noun] = value;
            },
            setVariable: (noun, value) => {
                valuesToSet[noun] = value;
            },
            setDisabled: (noun, isDisabled) => {
                fieldMetaToSet[noun] = { ...fieldMetaToSet[noun], disabled: isDisabled };
            },
            setVisible: (noun, isVisible) => {
                fieldMetaToSet[noun] = { ...fieldMetaToSet[noun], visible: isVisible };
            },
            displayMessage: () => {
                /* no-op */
            },
        }).then(() => {
            hasRunBrowserCmds.current = true;
            if (Object.keys(valuesToSet).length > 0) {
                fieldActions.batchSetValues(valuesToSet);
            }
            if (Object.keys(fieldMetaToSet).length > 0) {
                fieldActions.batchSetFieldMeta(fieldMetaToSet);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageBuildCalls]);

    // ─────────────────────────────────────────────
    // 5. Field normalization — two-stage memoization
    //    Stage 1: normalize raw API controls → NormalizedField[]
    //    Stage 2: overlay runtime values + fieldMeta
    // ─────────────────────────────────────────────
    const normalizedFields = useMemo(() => {
        if (!extraction.formControls || extraction.formControls.length === 0) return [];
        return normalizeServiceConfig(extraction.formControls) as NormalizedField[];
    }, [extraction.formControls]);

    // Seed fieldState.values from normalised field defaults AND @text from raw API.
    // normalizeServiceConfig derives defaultValue from @default / @value but NOT
    // @text. Many auto-populated fields (e.g. POLNAM_LINSPRINAM_2) only carry
    // their value in @text. We fall back to it here so required-field validation
    // recognises those fields as "filled".
    //
    // IMPORTANT: The @text fallback is restricted to non-interactive field types
    // (textbox, textarea, label, date). For SELECT / COMBO / RADIO fields, @text
    // may contain a placeholder or list-index text that does NOT represent a real
    // user selection — seeding those would falsely satisfy required-field validation.
    const hasSeededDefaults = useRef(false);
    useEffect(() => {
        if (hasSeededDefaults.current || normalizedFields.length === 0) return;

        // Build a matchcode → @text lookup from the raw API controls
        const textByMatchcode: Record<string, string> = {};
        for (const ctrl of extraction.formControls) {
            const mc = ((ctrl as any)['@matchcode'] || (ctrl as any).matchcode || '')
                .toString()
                .trim();
            const text = ((ctrl as any)['@text'] ?? '').toString().trim();
            if (mc && text) {
                textByMatchcode[mc] = text;
            }
        }

        // Field types where @text represents an actual auto-populated value
        // (NOT a dropdown placeholder or display label)
        const textFallbackTypes = new Set(['textbox', 'textarea', 'label', 'date', 'calendar']);

        const defaults: Record<string, string | boolean> = {};
        for (const field of normalizedFields) {
            if (field.defaultValue !== undefined && field.defaultValue !== '') {
                defaults[field.matchcode] = field.defaultValue;
            } else if (
                textByMatchcode[field.matchcode] &&
                textFallbackTypes.has(field.controlType ?? '')
            ) {
                // Fallback: use @text from the raw control (auto-populated value)
                // Only for non-interactive types where @text is the real value
                defaults[field.matchcode] = textByMatchcode[field.matchcode];
            }
        }
        if (Object.keys(defaults).length > 0) {
            hasSeededDefaults.current = true;
            fieldActions.batchSetValues(defaults);
        }
    }, [normalizedFields, fieldActions, extraction.formControls]);

    const updatedFields: NormalizedField[] = useMemo(() => {
        return normalizedFields.map((field) => ({
            ...field,
            disabled: fieldState.fieldMeta[field.matchcode]?.disabled ?? field.disabled,
            visible: fieldState.fieldMeta[field.matchcode]?.visible ?? field.visible,
            value: fieldState.values[field.matchcode],
        }));
    }, [normalizedFields, fieldState.values, fieldState.fieldMeta]);

    // ───────────────────────────────────────────
    // 6. Required-field validation → button disable map
    // Mirrors VBS CheckRequiredIndicators:
    //    If ALL required+visible fields filled → enable OK/NEXT
    //    If ANY required+visible field empty  → disable OK/NEXT
    // ───────────────────────────────────────────
    const buttonMatchcodes = useMemo(
        () => Object.keys(extraction.initialButtonMeta),
        [extraction.initialButtonMeta],
    );

    // When the component provides its own fields + values (Scenario B),
    // validation uses those directly — no manual sync needed.
    // Otherwise (Scenario A) we fall back to the hook's internal state.
    const validationFields = externalFields ?? updatedFields;
    const validationValues = externalValues ?? fieldState.values;

    const { allRequiredFilled, missingFields, buttonDisableMap } = useRequiredFieldValidation(
        validationFields,
        validationValues,
        buttonsAffectedByValidation,
    );

    // ───────────────────────────────────────────
    // 7. Computed final button states
    //    Merges: API initial → runtime overrides → validation overrides
    // ───────────────────────────────────────────
    const finalButtonStates = useMemo(() => {
        // 1. Start with the API's initial disabled/visible values
        const merged: Record<string, ButtonMeta> = { ...extraction.initialButtonMeta };

        // 2. Layer on any runtime browser-command overrides (SET_DISABLED, SET_VISIBLE, etc.)
        for (const [key, val] of Object.entries(buttonState.meta)) {
            merged[key] = { ...merged[key], ...val };
        }

        // 3. Required-field validation is the PRIMARY driver for OK / NEXT
        //    (exactly like VBS CheckRequiredIndicators → enable/disable dtaOK and dtaNEXT)
        for (const [key, val] of Object.entries(buttonDisableMap)) {
            if (merged[key]) {
                if (val.disabled) {
                    merged[key] = { ...merged[key], disabled: true };
                } else {
                    // All required fields filled → enable unless server explicitly disabled
                    const runtimeForceDisabled = buttonState.meta[key]?.disabled === true;
                    if (!runtimeForceDisabled) {
                        merged[key] = { ...merged[key], disabled: false };
                    }
                }
            }
        }

        return merged;
    }, [extraction.initialButtonMeta, buttonState.meta, buttonDisableMap]);

    // Merged button commands (initial + runtime)
    const mergedButtonCommands = useMemo(
        () => ({ ...extraction.initialButtonCommands, ...buttonState.commands }),
        [extraction.initialButtonCommands, buttonState.commands],
    );

    // ───────────────────────────────────────────
    // Return everything the component needs
    // ───────────────────────────────────────────
    return {
        // Form
        updatedFields,
        fieldState,
        fieldActions,

        // Button extraction
        formControls: extraction.formControls,
        buttonMatchcodes,
        initialButtonMeta: extraction.initialButtonMeta,
        initialButtonCommands: extraction.initialButtonCommands,

        // Button state
        buttonState,
        buttonActions,
        finalButtonStates,
        mergedButtonCommands,
        // TODO ⟪missing lines 568-end — not captured in photos: allRequiredFilled, missingFields, buttonDisableMap return properties and closing braces⟫
