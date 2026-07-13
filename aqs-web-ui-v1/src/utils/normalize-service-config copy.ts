import type { OptionItem, Calls } from '@/types';

const flag = (v: unknown, defaultFalse = false): boolean => {
    if (v === undefined || v === null || v === '') return defaultFalse;
    if (typeof v === 'boolean') return v;
    const s = String(v).trim().toUpperCase();
    return s === 'T' || s === 'TRUE' || s === '1' || s === 'Y';
};

const randomKey = () => 'fld_' + Math.random().toString(36).slice(2, 10);

export type ServiceField = {
    // Standard properties
    matchcode?: string;
    id?: string;
    label?: string;
    ctrllabel?: string;

    // Important for your backend:
    controltype?: string; // 'textbox' | 'calendar' | 'combo' | 'radio' | 'button' | 'numeric' etc.
    type?: string;

    text?: string;
    value?: string;
    checked?: boolean;

    tabindex?: string | number;
    ctrlwidth?: string | number;
    default?: string | boolean;
    required?: string | boolean | number;
    disabled?: string | boolean;
    visible?: string | boolean;
    maxlength?: string | number;

    // @-prefixed properties from XML/JSON backend
    '@matchcode'?: string;
    '@controltype'?: string;
    '@ctrllabel'?: string;
    '@ctrlwidth'?: string | number;
    '@default'?: string | boolean;
    '@disabled'?: string;
    '@required'?: string | boolean | number;
    '@visible'?: string;
    '@tabindex'?: string | number;
    '@text'?: string;
    '@maxlength'?: string | number;
    '@type'?: string;
    '@left'?: string | number;
    '@top'?: string | number;
    '@utporder'?: string | number;
    '@firstcontrol'?: string;
    '@tab'?: string;

    // options sources
    options?: Array<unknown>;
    items?: Array<unknown>;
    list?: Array<unknown>;
    datasource?: Array<unknown>;
    listitems?: Array<{ key: string; label: string }>;

    // highlight (optional)
    highlight?: string | boolean;
    highlightColor?: string;
    highlightBorderColor?: string;

    // LimitToList attribute from legacy AQS
    '@limittolist'?: string;
    limittolist?: string;

    // date specifics (optional)
    dateFormat?: string;
    minDate?: string;
    maxDate?: string;

    // calls
    calls?: Calls[];
};

export type NormalizedField = {
    utporder: number;
    matchcode: string;
    label: string;
    controlType:
        | 'textbox'
        | 'textarea'
        | 'select'
        | 'radio'
        | 'checkbox'
        | 'date'
        | 'numeric'
        | 'radioField'
        | 'button';
    required: boolean;
    disabled: boolean;
    visible: boolean;
    tabIndex: number;
    width: number;
    placeholder?: string;
    options: OptionItem[];
    defaultValue: string | boolean; // ✅ mixed type supported
    maxLength?: number;

    // Optional UI helpers
    highlight?: boolean;
    highlightColor?: string;
    highlightBorderColor?: string;

    // LimitToList - when false on a select/combo, field gets yellow highlight
    limitToList?: boolean;

    // Date helpers
    dateFormat?: string;
    minDate?: string;
    maxDate?: string;
    iscalendar?: boolean; // for backward compatibility with 'calendar' controltype
    isNumeric?: boolean; // if true, only allow numbers

    // positioning (top/left from API - px or % values)
    top?: string | number;
    left?: string | number;
    ctrlwidth?: string | number;

    // calls
    calls?: Calls[];
};

export const normalizeServiceConfig = (
    serviceArray: readonly ServiceField[] = [],
): NormalizedField[] => {
    const normalizeKey = (s?: string) => (s || '').toString().trim().toLowerCase();

    // Helper to get property with or without @ prefix
    const getProp = <T>(obj: ServiceField, key: string): T | undefined => {
        const atKey = `@${key}` as keyof ServiceField;
        return ((obj[atKey] as T) ?? (obj[key as keyof ServiceField] as T)) as T | undefined;
    };

    const toControlType = (
        rawControlType?: string,
        rawType?: string,
        checkCalender?: boolean | number,
    ): NormalizedField['controlType'] | undefined => {
        if (checkCalender === true) {
            return 'date';
        }

        const key = normalizeKey(rawControlType) || normalizeKey(rawType);

        if (!key) {
            // No controltype/type present and no calendar flag -> do NOT assume
            return undefined;
        }

        switch (key) {
            case 'textbox':
            case 'text':
                return 'textbox';
            case 'textarea':
                return 'textarea';
            case 'select':
            case 'dropdown':
            case 'combo':
                return 'select';
            case 'radio':
            case 'radiobutton':
                return 'radio';
            case 'checkbox':
            case 'bool':
                return 'checkbox';
            case 'date':
            case 'datepicker':
            case 'datetime':
            case 'calendar':
                return 'date';
            case 'numeric':
            case 'number':
            case 'integer':
                return 'textbox';
            // case 'button':
            // case 'btn':
            //   return 'button';
            default:
                return 'textbox'; // default to textbox if unknown
        }
    };

    const coerceOptions = (it: ServiceField): OptionItem[] => {
        const rawOptions = it.options ?? it.list ?? it.datasource ?? it.items ?? it.listitems;
        if (!Array.isArray(rawOptions)) return [];

        return rawOptions.map((o): OptionItem => {
            if (o && typeof o === 'object') {
                const obj = o as Record<string, unknown>;
                const label =
                    (obj.label as string) ??
                    (obj.text as string) ??
                    (obj.name as string) ??
                    String(
                        (obj.value as string) ?? (obj.id as string) ?? (obj.key as string) ?? '',
                    );
                const value = String(
                    (obj.value as string) ?? (obj.id as string) ?? (obj.key as string) ?? label,
                );
                return { label, value };
            }
            return { label: String(o), value: String(o) };
        });
    };

    /**
     * Extract options from indexed properties (@text1/@value1, @text2/@value2, etc.)
     * Used by radio, select, combo controls with dynamic option lists
     */
    const extractIndexedOptions = (it: ServiceField): OptionItem[] => {
        const options: OptionItem[] = [];

        for (let i = 1; i <= 100; i += 1) {
            const valueKey = `@value${i}` as keyof ServiceField;
            const textKey = `@text${i}` as keyof ServiceField;

            const optionValue = it[valueKey] ?? (it[`value${i}` as keyof ServiceField] as unknown);
            const optionLabel = it[textKey] ?? (it[`text${i}` as keyof ServiceField] as unknown);

            // Stop iteration if both are missing
            if (!optionValue && !optionLabel) {
                break;
            }

            options.push({
                value: String(optionValue ?? ''),
                label: String(optionLabel ?? optionValue ?? ''),
            });
        }
        return options;
    };

    return (
        serviceArray
            // Filter out fields without control types
            .filter((it) => {
                const ctrlType = getProp<string>(it, 'controltype');
                const normalized = toControlType(
                    ctrlType,
                    getProp<string>(it, 'type'),
                    flag(getProp<string | number>(it, 'iscalendar')),
                );
                return normalized !== undefined;
            })
            .map((it): NormalizedField => {
                const rawControlType = getProp<string>(it, 'controltype');
                const rawType = getProp<string>(it, 'type');
                const checkCalender = flag(getProp<string | number>(it, 'iscalendar'));
                const controlType =
                    toControlType(rawControlType, rawType, checkCalender) ?? 'textbox';

                // Try indexed options first (for radio/select with @text1/@value1 format)
                let options = extractIndexedOptions(it);
                // Fall back to coerceOptions if indexed options not found
                if (options.length === 0) {
                    options = coerceOptions(it);
                }

                const rawWidth = getProp<string | number>(it, 'ctrlwidth');
                const widthNum =
                    rawWidth !== undefined && rawWidth !== null ? Number(rawWidth) : undefined;

                const rawDefault = getProp<string | boolean>(it, 'default');
                const rawValue = it.value;

                // Determine default value with priority: @default > @value > empty
                // Important: Respect explicit @default even if empty (don't fall back to @text)
                let defaultValueForType: string | boolean;
                if (controlType === 'checkbox') {
                    defaultValueForType = Boolean(it.checked ?? flag(rawDefault));
                } else if (controlType === 'select') {
                    // For SELECT/COMBO fields: treat numeric defaults as "no selection"
                    // (they're typically list indices like "1", not actual values)
                    if (typeof rawDefault === 'string' && rawDefault.trim() !== '') {
                        // Check if it's purely numeric
                        if (/^\d+$/.test(rawDefault.trim())) {
                            // Numeric default (list index) → treat as no selection
                            defaultValueForType = '';
                        } else {
                            // Non-numeric text → use as-is
                            defaultValueForType = rawDefault;
                        }
                    } else if (rawValue !== undefined) {
                        defaultValueForType = String(rawValue);
                    } else {
                        defaultValueForType = '';
                    }
                } else {
                    // For other controls, prioritize @default if explicitly set
                    if (typeof rawDefault === 'string') {
                        // @default is explicitly set (even if empty string)
                        defaultValueForType = rawDefault;
                    } else if (rawValue !== undefined) {
                        // If no @default, use @value if available
                        defaultValueForType = String(rawValue);
                    } else {
                        // Otherwise default to empty string
                        defaultValueForType = '';
                    }
                }

                const rawMatchcode = getProp<string>(it, 'matchcode');
                const rawLabel = getProp<string>(it, 'ctrllabel');
                const rawRequired = getProp<string | boolean | number>(it, 'required');
                const rawDisabled = getProp<string>(it, 'disabled');
                const rawVisible = getProp<string>(it, 'visible');
                const rawTabIndex = getProp<string | number>(it, 'tabindex');
                const rawMaxLength = getProp<string | number>(it, 'maxlength');
                const rawUtpOrder = getProp<string | number>(it, 'utporder');
                const rawLeft = getProp<string | number>(it, 'left');
                const rawTop = getProp<string | number>(it, 'top');
                const isCalendar = getProp<string | number>(it, 'iscalendar');
                const rawLimitToList = getProp<string>(it, 'limittolist');

                // Check if original controlType was numeric
                const originalControlType = normalizeKey(rawControlType);
                const isNumericType = ['numeric', 'number', 'integer'].includes(
                    originalControlType,
                );

                // For SELECT fields with numeric defaults, don't use placeholder
                // (numeric defaults are list indices, not field values)
                let placeholder = '';
                if (
                    typeof rawDefault === 'string' &&
                    !(controlType === 'select' && /^\d+$/.test(rawDefault.trim()))
                ) {
                    placeholder = rawDefault;
                }

                return {
                    utporder: Number(rawUtpOrder ?? 0),
                    matchcode: rawMatchcode || it.id || randomKey(),
                    label: rawLabel || it.label || 'Field',
                    controlType,
                    required: flag(rawRequired),
                    disabled: flag(rawDisabled),
                    visible: rawVisible !== undefined ? flag(rawVisible, true) : true,
                    tabIndex: Number(rawTabIndex ?? 0),
                    width: widthNum ?? 320,
                    placeholder,
                    options,
                    iscalendar: flag(isCalendar),
                    defaultValue: defaultValueForType,
                    maxLength: rawMaxLength !== undefined ? Number(rawMaxLength) : undefined,
                    // LimitToList: "T" means strict list, anything else (or absent) means free-text combo
                    limitToList: rawLimitToList !== undefined ? flag(rawLimitToList) : undefined,

                    // Yellow highlight for select/combo fields with LimitToList ≠ "T"
                    // Legacy AQS: combo + LTL=F → bright yellow ■ #FFFF00
                    // When @limittolist is absent on a combo, it defaults to LTL=F → yellow
                    highlight:
                        flag(it.highlight) || (controlType === 'select' && !flag(rawLimitToList)),
                    highlightColor:
                        it.highlightColor ??
                        (controlType === 'select' && !flag(rawLimitToList) ? '#FFFF00' : undefined),
                    highlightBorderColor: it.highlightBorderColor,

                    // date passthrough
                    dateFormat: it.dateFormat || 'MM/DD/YYYY',
                    minDate: it.minDate,
                    maxDate: it.maxDate,
                    isNumeric: isNumericType,

                    // positioning (top/left from API - px or % values)
                    top: rawTop,
                    left: rawLeft,
                    ctrlWidth: rawWidth,
                    // calls passthrough
                    calls: it.calls,
                } satisfies NormalizedField;
            })
    );
};
