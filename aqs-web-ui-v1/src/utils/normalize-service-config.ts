import type { NormalizedField, OptionItem } from '../types';

const flag = (v: unknown, defaultFalse = false): boolean => {
    if (v === undefined || v === null || v === '') return defaultFalse;
    if (typeof v === 'boolean') return v;
    const s = String(v).trim().toUpperCase();
    return s === 'T' || s === 'TRUE' || s === '1' || s === 'Y';
};

const randomKey = () => 'fld_' + Math.random().toString(36).slice(2, 10);

export type ServiceField = {
    matchcode?: string;
    id?: string;
    label?: string;
    ctrllabel?: string;

    // Important for your backend:
    controltype?: string; // 'textbox' | 'calendar' | 'combo' | 'radio' | 'button' etc.
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

    // options sources
    options?: Array<unknown>;
    items?: Array<unknown>;
    list?: Array<unknown>;
    datasource?: Array<unknown>;
    listitems?: Array<{ label: string; value: string }>;

    // highlight (optional)
    highlight?: string | boolean;
    highlightColor?: string;
    highlightBorderColor?: string;

    // date specifics (optional)
    dateFormat?: string;
    minDate?: string;
    maxDate?: string;
    iscalendar?: string | boolean; // @iscalendar flag from API

    // positioning (optional) - from @top, @left in API
    top?: string | number;
    left?: string | number;

    // input restrictions (optional)
    maxlength?: string | number;

    section?: string; // left/right/buttons
};

export const normalizeServiceConfig = (serviceArray: ServiceField[]): NormalizedField[] => {
    const normalizeKey = (s?: string) => (s || '').toString().trim().toLowerCase();

    const toControlType = (rawControlType?: string, rawType?: string) => {
        const key = normalizeKey(rawControlType) || normalizeKey(rawType) || '';
        if (key.includes('check')) return 'checkbox';
        if (key.includes('radio')) return 'radio';
        if (key.includes('combo') || key.includes('dropdown') || key.includes('list'))
            return 'select';
        if (key.includes('area') || key.includes('textarea')) return 'textarea';
        if (key.includes('date') || key.includes('calendar') || key.includes('time')) return 'date';
        // text-like fallbacks
        if (key.includes('text') || key.includes('box') || key === 'textbox') return 'textbox';
        if (key.includes('ibutton')) return 'button';
        return 'textbox';
    };

    return (
        (serviceArray || [])
            // Filter out "buttons" for your FormRenderer if needed:
            .filter((it) => normalizeKey(it.controltype) !== 'button')
            .map((it) => {
                let controlType = toControlType(it.controltype, it.type);

                // If @iscalendar="T" and controltype="textbox", render as date field
                if (controlType === 'textbox' && flag(it.iscalendar)) {
                    console.log('[normalize-service-config] Calendar field detected:', {
                        matchcode: it.matchcode,
                        iscalendar: it.iscalendar,
                        text: it.text,
                    });
                    controlType = 'date';
                }

                const normalizedMatchcode = it.matchcode || it.id || randomKey();

                // Normalize options
                let options: OptionItem[] = [];
                const rawOptions =
                    it.options || it.list || it.datasource || it.items || it.listitems;
                const getArrayFromRaw = (r: unknown): unknown[] => {
                    if (Array.isArray(r)) return r as unknown[];
                    if (!r || typeof r !== 'object') return [];
                    const obj = r as Record<string, unknown>;
                    // Handle XML-like shape: { item: [...] } or { item: {...} }
                    if (obj.item) {
                        if (Array.isArray(obj.item)) return obj.item as unknown[];
                        return [obj.item] as unknown[];
                    }
                    // Fallback: if object looks like a keyed map, return its values
                    return Object.values(obj) as unknown[];
                };
                const rawArray = getArrayFromRaw(rawOptions);
                if (rawArray.length) {
                    options = rawArray.map((o) => {
                        if (o && typeof o === 'object') {
                            const option = o as Record<string, unknown>;
                            // TODO ⟪missing lines 118-125 — not captured in photos⟫
                            const label =
                                (option['id'] as string) ??
                                (option['key'] as string) ??
                                '',
                            );
                            const value = String(
                                (option['@value'] as string) ??
                                (option['value'] as string) ??
                                (option['id'] as string) ??
                                (option['key'] as string) ??
                                label,
                            );
                            return { label, value };
                        }
                        return { label: String(o), value: String(o) };
                    });

                    // Remove duplicate options by value
                    const seenValues = new Set<string>();
                    options = options.filter((opt) => {
                        if (seenValues.has(opt.value)) {
                            return false;
                        }
                        seenValues.add(opt.value);
                        return true;
                    });
                    // Further dedupe by label (case-insensitive). Prefer coded values
                    // (where value !== label) over label-as-value entries.
                    const labelMap = new Map<string, OptionItem>();
                    for (const opt of options) {
                        const key = String(opt.label || opt.value || '')
                            .trim()
                            .toUpperCase();
                        if (!labelMap.has(key)) {
                            labelMap.set(key, opt);
                            continue;
                        }
                        const existing = labelMap.get(key)!;
                        const existingIsLabelOnly = existing.value === existing.label;
                        const newIsLabelOnly = opt.value === opt.label;
                        if (existingIsLabelOnly && !newIsLabelOnly) {
                            labelMap.set(key, opt);
                        }
                    }
                    options = Array.from(labelMap.values());
                }

                const widthNum = it.ctrlwidth !== undefined ? Number(it.ctrlwidth) : undefined;

                // Convert positioning values (top, left) to proper units
                const topValue = (() => {
                    if (it.top === undefined || it.top === null || it.top === '') return undefined;
                    const num = Number(it.top);
                    return isNaN(num) ? it.top : `${num}px`;
                })();

                const leftValue = (() => {
                    if (it.left === undefined || it.left === null || it.left === '')
                        return undefined;
                    const num = Number(it.left);
                    return isNaN(num) ? it.left : `${num}px`;
                })();

                const ctrlWidthValue = widthNum !== undefined ? `${widthNum}px` : undefined;

                // Default value logic: handle different control types appropriately
                let defaultValueForType: string | boolean;
                if (controlType === 'checkbox') {
                    defaultValueForType = Boolean(it.checked ?? flag(it.default));
                } else if (controlType === 'select') {
                    // For select/combo, prefer @default or @value. If service provided a display
                    // label in `it.text` but the options use codes as `value`, translate label
                    // -> value so the select can match the correct option.
                    let dv = (it.default as string) || (it.value as string) || '';
                    // If the API provided display text (it.text) and no explicit value, use it
                    if (!dv && (it.text as string)) dv = it.text as string;
                    // If dv doesn't match any option.value but matches an option.label, map it
                    if (dv && options.length && !options.some((o) => o.value === dv)) {
                        const byLabel = options.find((o) => o.label === dv);
                        if (byLabel) dv = byLabel.value;
                    }
                    defaultValueForType = dv;
                } else if (controlType === 'radio') {
                    // For radio, use default only (not @text)
                    defaultValueForType = (it.default as string) || '';
                } else {
                    // For textbox, date, etc., use only default/value (not @text)
                    defaultValueForType = (it.value as string) ?? (it.default as string) ?? '';
                }

                // Detect if original controltype was numeric
                const rawControlTypeKey = normalizeKey(it.controltype);
                const isNumericField =
                    rawControlTypeKey === 'numeric' || rawControlTypeKey === 'number';

                return {
                    controlType,
                    matchcode: normalizedMatchcode,
                    required: flag(it.required),
                    label: it.ctrllabel || it.label || normalizedMatchcode,
                    disabled: flag(it.disabled),
                    visible: it.visible !== undefined ? flag(it.visible, true) : true,
                    tabIndex: Number(it.tabindex ?? 0),
                    width: widthNum ?? 320,
                    placeholder: (it.default as string) || '',
                    options,
                    defaultValue: defaultValueForType,

                    // highlight passthrough if you added highlighting
                    highlight: flag(it.highlight),
                    highlightColor: it.highlightColor,
                    highlightBorderColor: it.highlightBorderColor,

                    // date passthrough (auto-detected from @iscalendar or explicit date type)
                    dateFormat: it.dateFormat || 'MM/DD/YYYY', // matches API format
                    minDate: it.minDate,
                    maxDate: it.maxDate,
                    // positioning passthrough (absolute positioning values from API)
                    top: topValue,
                    left: leftValue,
                    ctrlwidth: ctrlWidthValue,
                    // input restrictions passthrough
                    isNumeric: isNumericField,
                    maxLength: it.maxlength ? Number(it.maxlength) : undefined,
                    // you can keep section info outside if needed
                    section: it.section,
                } as NormalizedField;
            })
    );
    // TODO ⟪missing lines beyond 253 — not captured in photos (closing brace of normalizeServiceConfig)⟫
