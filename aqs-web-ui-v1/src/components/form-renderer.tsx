import React, { useMemo, useState, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { FieldRenderer } from './field-renderer';
import { Button } from './button';
import { useFormMethods, useFormStore } from '@providers/form-provider';
import { useGlobalVariableStore } from '@/providers/global-variable-provider';
import { createFeatureLogger } from '@/utils/logger-builder';

// Utilities
import { checkRequiredFields } from '@/utils/required-field-validation';
import { computePageBuildButtonOverrides } from '@/utils/button-state-manager';

// Types
import type { CommitEventType, FormValues, NormalizedField } from '@/types';
import type { PermissionSnapshot } from '@/types';
import type { PageBuildButton } from '@utils/transform-pagebuild-response';

// --------------------------------------

const logger = createFeatureLogger('forms', 'FormRenderer');

const ACTION_BUTTON_MATCHCODES = new Set([
    'OK',
    'SUBMIT',
    'NEXT',
    'SAVE',
    'ADD',
    'EDIT',
    'VIEW',
    'PRINT',
    'RATE',
    'REFRESH',
    'CANCEL',
    'DELETE',
    'DISCARD',
]);

export interface FormRendererProps {
    fields: NormalizedField[];
    buttons?: PageBuildButton[];
    permissions?: PermissionSnapshot;
    initialValues?: FormValues;
    onValuesChange?: (next: FormValues) => void;
    onCommitField?: (
        matchcode: string,
        value: string | boolean,
        eventType: CommitEventType,
    ) => void;

    /** Optional callback fired when a field-level info icon is clicked. */
    onInfoClick?: (field: NormalizedField, value: string | boolean) => void;
    /** Called when form is submitted (e.g., OK button clicked) */
    onSubmit?: (formData: Record<string, unknown>) => Promise<void>;

    /** Whether form is disabled (e.g., during submission) */
    disabled?: boolean;

    labelWidth?: number | string;

    /** How many fields per row (default 2) */
    fieldsPerRow?: 1 | 2 | 3 | 4;

    /**
     * Responsive behavior:
     * - If true (default), two-per-row from md+ and full-width on xs.
     * - If false, always enforce fieldsPerRow even on small screens.
     */
    responsive?: boolean;

    /** Use react-hook-form registration via Controller (for PageBuild modals) */
    useReactHookForm?: boolean;

    /** Validation errors for specific fields */
    validationErrors?: Record<string, string>;

    /** Field currently being committed (for loading indicator) */
    committingField?: string | null;

    /** Custom width for field containers (overrides default width calculation) */
    fieldWidth?: number | string;

    /** Offset to add to field top positions in pixels (default 0) */
    topOffset?: number;

    /** Additional CSS class name for the form container */
    className?: string;
}

const FormRenderer: React.FC<FormRendererProps> = ({
    fields,
    buttons = [],
    permissions,
    initialValues = {},
    onValuesChange,
    onCommitField,
    onSubmit,
    disabled = false,
    labelWidth = 150,
    fieldsPerRow = 2,
    responsive = true,
    useReactHookForm = false,
    validationErrors = {},
    committingField = null,
    fieldWidth,
    topOffset = 0,
    className = '',
    onInfoClick,
}) => {
    const [submitting] = useState(false);
    const formMethods = useFormMethods();
    const globalVariableStore = useGlobalVariableStore();
    // Get field metadata from form store
    const [fieldMetadata] = useFormStore((store) => store.fieldMetadata);
    void onSubmit;

    // Apply field metadata overrides from browser commands (SET_DISABLED, SET_VISIBLE, etc.)
    const fieldsWithMetadata = useMemo(() => {
        return fields.map((field) => {
            const metadata = fieldMetadata[field.matchcode];
            if (!metadata) {
                return field;
            }

            const nextVisible = metadata.visible !== undefined ? metadata.visible : field.visible;
            const nextDisabled =
                metadata.disabled !== undefined ? metadata.disabled : field.disabled;
            const nextRequired =
                metadata.required !== undefined ? metadata.required : field.required;
            const nextReadOnly =
                metadata.readOnly !== undefined
                    ? metadata.readOnly
                    : field.readOnly !== undefined
                        ? field.readOnly
                        : false;
            const nextOptions = metadata.options !== undefined ? metadata.options : field.options;

            const visibleChanged = metadata.visible !== undefined && nextVisible !== field.visible;
            const disabledChanged =
                metadata.disabled !== undefined && nextDisabled !== field.disabled;
            const requiredChanged =
                metadata.required !== undefined && nextRequired !== field.required;
            const readOnlyChanged =
                metadata.readOnly !== undefined &&
                nextReadOnly !== (field.readOnly !== undefined ? field.readOnly : false);
            const optionsChanged = metadata.options !== undefined;

            if (
                visibleChanged ||
                disabledChanged ||
                requiredChanged ||
                readOnlyChanged ||
                optionsChanged
            ) {
                logger.debug('[FORM_RENDERER] Field metadata override applied', {
                    matchcode: field.matchcode,
                    overrides: {
                        visible: visibleChanged
                            ? { from: field.visible, to: nextVisible }
                            : undefined,
                        disabled: disabledChanged
                            ? { from: field.disabled, to: nextDisabled }
                            : undefined,
                        required: requiredChanged
                            ? { from: field.required, to: nextRequired }
                            : undefined,
                        readOnly: readOnlyChanged
                            ? { from: field.readOnly, to: nextReadOnly }
                            : undefined,
                        options: optionsChanged
                            ? {
                                  from: Array.isArray(field.options) ? field.options.length : 0,
                                  to: Array.isArray(nextOptions) ? nextOptions.length : 0,
                              }
                            : undefined,
                    },
                });
            }

            return {
                ...field,
                visible: nextVisible,
                disabled: nextDisabled,
                required: nextRequired,
                readOnly: nextReadOnly,
                options: nextOptions,
            };
        });
    }, [fields, fieldMetadata]);

    const permissionedFields = useMemo(() => {
        const applyPermissions = (field: NormalizedField): NormalizedField => {
            const fieldPermission = permissions?.fields?.[field.matchcode];
            if (!fieldPermission) {
                return field;
            }

            const nextVisible = fieldPermission.visible ? field.visible : false;
            const nextDisabled = fieldPermission.editable ? field.disabled : true;
            const nextRequired = fieldPermission.required ?? field.required;

            const visibleChanged = nextVisible !== field.visible;
            const disabledChanged = nextDisabled !== field.disabled;
            const requiredChanged = nextRequired !== field.required;

            if (visibleChanged || disabledChanged || requiredChanged) {
                console.debug('[FORM_RENDERER] Field permission override applied', {
                    matchcode: field.matchcode,
                    overrides: {
                        visible: visibleChanged
                            ? { from: field.visible, to: nextVisible }
                            : undefined,
                        disabled: disabledChanged
                            ? { from: field.disabled, to: nextDisabled }
                            : undefined,
                        required: requiredChanged
                            ? { from: field.required, to: nextRequired }
                            : undefined,
                    },
                });
            }

            return {
                ...field,
                visible: nextVisible,
                disabled: nextDisabled,
                required: nextRequired,
            };
        };

        return fieldsWithMetadata.map(applyPermissions);
    }, [fieldsWithMetadata, permissions]);

    // Build initial values
    const initial = useMemo(() => {
        const obj: FormValues = { ...initialValues };
        permissionedFields.forEach((f) => {
            const has = Object.prototype.hasOwnProperty.call(obj, f.matchcode);
            if (!has) {
                obj[f.matchcode] =
                    f.defaultValue !== undefined
                        ? f.defaultValue
                        : f.controlType === 'checkbox'
                            ? false
                            : '';
            }
        });
        return obj;
    }, [permissionedFields, initialValues]);

    const [values, setValues] = useState<FormValues>(initial);

    // Watch all form values from RHF for button state computation
    // This ensures button validation runs even when server commands update fields
    const watchedFormValues = formMethods.watch();
    // Apply updated initial values when incoming `initial` changes (e.g., when PageBuild defaults arrive)
    // React.useEffect(() => {
    //   setValues(initial);
    // }, [initial]);

    const updateField = useCallback(
        (code: string, val: string | boolean) => {
            setValues((prev) => {
                const next = { ...prev, [code]: val };
                onValuesChange?.(next);
                return next;
            });
        },
        [onValuesChange],
    );

    const handleCommit = useCallback(
        (code: string, val: string | boolean, eventType: CommitEventType) => {
            const normalizedMatchcode = code.toUpperCase();
            if (ACTION_BUTTON_MATCHCODES.has(normalizedMatchcode)) {
                globalVariableStore.setVariable('mstrCurrentButton', normalizedMatchcode);
                logger.debug('Stored current button matchcode for cycling navigation', {
                    matchcode: normalizedMatchcode,
                    eventType,
                });
            }

            onCommitField?.(code, val, eventType);
        },
        [globalVariableStore, onCommitField],
    );

    const normalizeCommitValue = useCallback((v: unknown): string | boolean => {
        if (v === null || v === undefined) return '';
        if (typeof v === 'boolean') return v;
        if (typeof v === 'object') {
            if ((v as any).value !== undefined) return String((v as any).value);
            return '';
        }
        return String(v);
    }, []);

    const regularFields = useMemo(() => {
        return permissionedFields.filter((f) => f.visible !== false);
    }, [permissionedFields]);

    // Compute required field validation and button overrides
    // Uses watchedFormValues (from RHF.watch) to ensure validation updates
    // when server commands populate fields via SET_TEXT
    const { buttonOverrides } = useMemo(() => {
        const validation = checkRequiredFields(
            permissionedFields,
            watchedFormValues,
            fieldMetadata,
        );
        const overrides = computePageBuildButtonOverrides(buttons, validation.allRequiredFilled);

        logger.debug('[FormRenderer] Button Validation Debug:', {
            allRequiredFilled: validation.allRequiredFilled,
            missingFields: validation.missingFields.map((f) => f.matchcode),
            buttons: buttons.map((b) => ({
                matchcode: b.matchcode,
                disabled: b.disabled,
                visible: b.visible,
            })),
            overrides: overrides,
        });

        return {
            allRequiredFilled: validation.allRequiredFilled,
            buttonOverrides: overrides,
        };
    }, [permissionedFields, watchedFormValues, fieldMetadata, buttons]);

    // Helper: Get default button order by matchcode
    const getDefaultButtonOrder = (matchcode: string): number => {
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
        const upper = matchcode.toUpperCase();
        return DEFAULT_BUTTON_ORDER[upper] ?? 50;
    };

    // Sort buttons for consistent display order: explicit @utporder first, then default order
    const sortedButtons = useMemo(() => {
        const sorted = [...buttons].sort((a, b) => {
            // If both have explicit order, use it
            if (a.order !== undefined && b.order !== undefined) {
                return a.order - b.order;
            }
            // If only one has explicit order, it comes first
            if (a.order !== undefined) return -1;
            if (b.order !== undefined) return 1;
            // Both undefined - use default order by matchcode
            const aDefault = getDefaultButtonOrder(a.matchcode);
            const bDefault = getDefaultButtonOrder(b.matchcode);
            return aDefault - bDefault;
        });

        return sorted;
    }, [buttons]);

    const toFieldValue = useCallback((field: NormalizedField, value: unknown): string | boolean => {
        if (field.controlType === 'checkbox') {
            return Boolean(value);
        }
        return value === undefined || value === null ? '' : String(value);
    }, []);

    // Compute the grid column size for each item
    // Base unit: 12 columns. For fieldsPerRow=2 => baseSpan=6; =3 => 4; =4 => 3
    const baseSpan = Math.max(1, Math.floor(12 / Math.max(1, fieldsPerRow)));

    // Helper: get grid sizes for a field, considering colSpan
    const gridSizesForField = (f: NormalizedField) => {
        const colSpan = Math.min(Math.max(f.colSpan ?? 1, 1), fieldsPerRow);
        const span = Math.min(12, baseSpan * colSpan);

        if (responsive) {
            // Responsive: full-width on xs, two-per-row (or N-per-row) on md+
            return { xs: 12, md: span };
        }
        // Non-responsive: always enforce N-per-row even on xs (may be tight on small screens)
        return { xs: span };
    };

    // Helper: compute positioning and width values for a field
    // Extracted outside map() to avoid recalculation on every field iteration
    const computeFieldStyling = useCallback(
        (f: NormalizedField) => {
            // Top value: convert number to pt, keep string as-is
            const topValue = (() => {
                if (f.top === undefined || f.top === null) return undefined;
                const numValue = Number(f.top);
                if (isNaN(numValue)) return f.top;
                return `${numValue}pt`;
            })();

            // Left value: convert number to px, keep string as-is
            const leftValue = (() => {
                if (f.left === undefined || f.left === null) return undefined;
                const numValue = Number(f.left);
                if (isNaN(numValue)) return f.left;
                return `${numValue}px`;
            })();

            // Control width: Priority: fieldWidth prop > f.ctrlwidth > f.width > default 320
            const ctrlWidthValue = (() => {
                if (fieldWidth !== undefined) {
                    const numValue = Number(fieldWidth);
                    return isNaN(numValue) ? fieldWidth : `${numValue}px`;
                }
                if (f.ctrlwidth !== undefined && f.ctrlwidth !== null) {
                    const numValue = Number(f.ctrlwidth);
                    return isNaN(numValue) ? f.ctrlwidth : `${numValue}px`;
                }
                const width = f.width ?? 320;
                const numValue = Number(width);
                return isNaN(numValue) ? width : `${numValue}px`;
            })();

            return { topValue, leftValue, ctrlWidthValue };
        },
        [fieldWidth],
    );

    // Helper: Calculate minimum height for absolute layout to prevent overlap. Finds the max 'top' value amo⟪?⟫
    // This ensures that the form container is tall enough to accommodate all absolutely positioned fields wi⟪?⟫
    // Used in the style of the form container div to set minHeight dynamically based on field positions.
    // Only recalculates when fields change, not on every render.
    // Assumes a default field height of 56px (typical for form controls) to add as buffer below the lowest f⟪?⟫
    // On Policy Information -> Insured Details
    const absoluteLayoutMinHeight = useMemo(() => {
        const toPixels = (value: unknown): number => {
            if (value === null || value === undefined) return 0;
            if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
            if (typeof value !== 'string') return 0;

            const trimmed = value.trim().toLowerCase();
            if (!trimmed) return 0;

            const numeric = Number.parseFloat(trimmed);
            if (!Number.isFinite(numeric)) return 0;

            if (trimmed.endsWith('pt')) {
                return numeric * (4 / 3);
            }

            return numeric;
        };

        const absoluteFields = regularFields.filter(
            (f) => f.top !== undefined || f.left !== undefined,
        );

        if (absoluteFields.length === 0) {
            return undefined;
        }

        const maxTop = absoluteFields.reduce((max, field) => {
            const topPx = toPixels(field.top);
            return topPx > max ? topPx : max;
        }, 0);

        // Reserve enough space for the last absolutely-positioned row.
        return Math.max(56, Math.ceil(maxTop + 56));
    }, [regularFields]);

    return (
        <>
            {/* Action Buttons - Top Right */}
            {sortedButtons.length > 0 && (
                <div className="flex justify-end gap-3">
                    {sortedButtons.map((button) => {
                        // Get button overrides from computed state manager
                        const override = buttonOverrides[button.matchcode];

                        // Determine final visibility and disabled state with defaults
                        const finalVisible = override?.visible ?? button.visible ?? true;
                        const finalDisabled =
                            (override?.disabled ?? button.disabled ?? false) ||
                            disabled ||
                            submitting;

                        logger.debug('[FormRenderer] Button State', {
                            matchcode: button.matchcode,
                            apiDisabled: button.disabled,
                            apiVisible: button.visible,
                            overrideExists: !!override,
                            overrideDisabled: override?.disabled,
                            overrideVisible: override?.visible,
                            finalDisabled,
                            finalVisible,
                        });

                        // Skip rendering hidden buttons
                        if (!finalVisible) {
                            return null;
                        }

                        return (
                            <Button
                                key={button.matchcode}
                                matchcode={button.matchcode}
                                text={button.text}
                                disabled={finalDisabled}
                                visible={finalVisible}
                                onCommit={handleCommit}
                                loading={submitting}
                            />
                        );
                    })}
                </div>
            )}

            {/* Form Fields */}
            <div
                className={`relative w-full ${className}`}
                style={
                    absoluteLayoutMinHeight
                        ? {
                              minHeight: `${absoluteLayoutMinHeight}px`,
                              paddingBottom: '8px',
                          }
                        : undefined
                }
            >
                {regularFields.map((f) => {
                    const sizes = gridSizesForField(f);

                    // Compute dynamic positioning and width values
                    const { topValue, leftValue, ctrlWidthValue } = computeFieldStyling(f);

                    if (useReactHookForm) {
                        return (
                            <div
                                key={f.matchcode}
                                {...sizes}
                                style={{
                                    position: topValue || leftValue ? 'absolute' : 'relative',
                                    ...(topValue ? { top: topValue } : {}),
                                    ...(leftValue ? { left: leftValue } : {}),
                                    width: ctrlWidthValue,
                                    marginBottom: topValue || leftValue ? '0' : '8px',
                                }}
                            >
                                <Controller
                                    name={f.matchcode}
                                    control={formMethods.control}
                                    defaultValue={
                                        f.defaultValue !== undefined
                                            ? f.defaultValue
                                            : f.controlType === 'checkbox'
                                                ? false
                                                : ''
                                    }
                                    render={({ field }) => (
                                        <FieldRenderer
                                            label={f.label}
                                            value={toFieldValue(f, field.value)}
                                            controlType={f.controlType}
                                            options={f.options}
                                            required={f.required}
                                            disabled={f.disabled || disabled || submitting}
                                            visible={f.visible !== false}
                                            tabIndex={f.tabIndex ?? 0}
                                            width={f.width ?? 320}
                                            labelWidth={labelWidth}
                                            placeholder={f.placeholder ?? ''}
                                            onChange={(val) => {
                                                field.onChange(val);
                                            }}
                                            onCommit={(val, eventType) => {
                                                const normalized = normalizeCommitValue(val);
                                                field.onChange(normalized);
                                                if (eventType === 'blur') {
                                                    field.onBlur();
                                                }
                                                handleCommit(f.matchcode, normalized, eventType);
                                            }}
                                            highlight={f.highlight}
                                            highlightColor={f.highlightColor}
                                            highlightBorderColor={f.highlightBorderColor}
                                            dateFormat={f.dateFormat}
                                            minDate={f.minDate}
                                            maxDate={f.maxDate}
                                            isNumeric={f.isNumeric}
                                            maxLength={f.maxLength}
                                            left={f.left}
                                            top={f.top}
                                            ctrlwidth={f.ctrlwidth}
                                            showInfoIcon={f.showInfoIcon}
                                            infoAriaLabel={f.infoAriaLabel}
                                            onInfoClick={
                                                f.showInfoIcon && onInfoClick
                                                    ? (val: string | boolean) => onInfoClick(f, val)
                                                    : undefined
                                            }
                                        />
                                    )}
                                />
                            </div>
                        );
                    }

                    return (
                        <div
                            key={f.matchcode}
                            {...sizes}
                            style={{
                                position: topValue || leftValue ? 'absolute' : 'relative',
                                ...(topValue ? { top: topValue } : {}),
                                ...(leftValue ? { left: leftValue } : {}),
                                width: ctrlWidthValue,
                                marginBottom: topValue || leftValue ? '0' : `${8 + topOffset}px`,
                            }}
                        >
                            <FieldRenderer
                                label={f.label}
                                value={values[f.matchcode]}
                                controlType={f.controlType}
                                options={f.options}
                                required={f.required}
                                disabled={f.disabled || disabled || submitting}
                                visible={f.visible !== false}
                                tabIndex={f.tabIndex ?? 0}
                                width={f.width ?? 320}
                                labelWidth={labelWidth}
                                placeholder={f.placeholder ?? ''}
                                onChange={(val) => updateField(f.matchcode, val)}
                                onCommit={(val, eventType) =>
                                    handleCommit(f.matchcode, normalizeCommitValue(val), eventType)
                                }
                                highlight={f.highlight}
                                highlightColor={f.highlightColor}
                                highlightBorderColor={f.highlightBorderColor}
                                dateFormat={f.dateFormat}
                                minDate={f.minDate}
                                maxDate={f.maxDate}
                                isNumeric={f.isNumeric}
                                maxLength={f.maxLength}
                                validationError={validationErrors[f.matchcode]}
                                isCommitting={committingField === f.matchcode}
                                left={f.left}
                                top={f.top}
                                ctrlwidth={f.ctrlwidth}
                                showInfoIcon={f.showInfoIcon}
                                infoAriaLabel={f.infoAriaLabel}
                                onInfoClick={
                                    f.showInfoIcon && onInfoClick
                                        ? (val: string | boolean) => onInfoClick(f, val)
                                        : undefined
                                }
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export { FormRenderer };
