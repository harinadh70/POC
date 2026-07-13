import type { FC } from 'react';
import { TextInput } from './text';
import { SelectInput } from './select';
import { RadioInput } from './radio';
import { CheckboxInput } from './checkbox';
import { DateInput } from './date';
import { FormLabel, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// types
import type { CommitEventType, ControlType, OptionItem } from '@/types';

// -------------------------------------

export interface FieldRendererProps {
    /** Optional matchcode (field identifier) forwarded from FormRenderer */
    matchcode?: string;
    label: string;
    value: string | boolean | undefined | null;
    controlType: ControlType;
    options?: OptionItem[];
    onChange?: (val: string | boolean) => void;
    //onCommit?: (val: string | boolean, eventType: CommitEventType) => void;
    onCommit?: (val: string | boolean | OptionItem | null, eventType: CommitEventType) => void;
    showInfoIcon?: boolean;
    infoAriaLabel?: string;
    onInfoClick?: (value: string | boolean) => void;
    required?: boolean;
    disabled?: boolean;
    visible?: boolean;
    tabIndex?: number;
    width?: number | string;
    labelWidth?: number | string;
    placeholder?: string;
    size?: 'small' | 'medium';
    allowFreeText?: boolean;

    // highlight
    highlight?: boolean;
    highlightColor?: string;
    highlightBorderColor?: string;

    // date-specific (optional)
    dateFormat?: string;
    minDate?: string;
    maxDate?: string;

    // input restrictions
    isNumeric?: boolean;
    maxLength?: number;

    // Validation and loading state
    validationError?: string;
    isCommitting?: boolean;
    top?: number | string;
    left?: number | string;
    ctrlwidth?: number | string;
    className?: string;
}

export const FieldRenderer: FC<FieldRendererProps> = ({
    matchcode,
    label,
    value,
    controlType,
    options = [],
    onChange,
    onCommit,
    required = false,
    disabled = false,
    visible = true,
    tabIndex = 0,
    width = 320,
    labelWidth = 200,
    placeholder = '',
    size = 'small',
    allowFreeText = true,

    highlight = false,
    highlightColor = '#fff8de',
    highlightBorderColor = '',

    dateFormat = 'MM/DD/YYYY',
    minDate,
    maxDate,
    isNumeric = false,
    maxLength,
    top,
    left,
    ctrlwidth,
    // Validation and loading state
    validationError,
    isCommitting = false,
    className = '',
    showInfoIcon = false,
    infoAriaLabel = 'Show information',
    onInfoClick,
}) => {
    void labelWidth;
    void top;
    void left;

    if (!visible) return null;

    const stringValue = value === undefined || value === null ? '' : String(value);
    const booleanValue = Boolean(value);

    // Use ctrlwidth if provided, otherwise fall back to width prop
    const ctrlWidthValue = (() => {
        if (ctrlwidth === undefined || ctrlwidth === null) return width;
        const numValue = Number(ctrlwidth);
        if (isNaN(numValue)) return ctrlwidth;
        return `${numValue}px`;
    })();

    return (
        <div className={`grid grid-cols-[150px 1fr] items-center  w-full! gap-3 ${className}`}>
            {/* Label column */}
            {/* <Box sx={{ width: labelWidth }}> */}
            <FormLabel
                required={required}
                className="formLabel inline-flex w-full items-center justify-end gap-1"
            >
                {/* Field label text remains unchanged for all existing fields. */}
                <span className="leading-tight">{label}</span>

                {/* Optional info icon used by info-enabled fields only. */}
                {showInfoIcon ? (
                    <IconButton
                        size="small"
                        onClick={() => {
                            if (onInfoClick) {
                                console.log('[FieldRenderer] Info icon clicked');
                                onInfoClick(
                                    typeof value === 'boolean' ? value : String(value ?? ''),
                                );
                            }}
                        }}
                        aria-label={infoAriaLabel}
                        disabled={false}
                        sx={{ p: 0.25, flexShrink: 0 }}
                    >
                        <InfoOutlinedIcon fontSize="small" color="primary" />
                    </IconButton>
                ) : null}
            </FormLabel>
            {/* </Box> */}

            {/* Control column */}
            {/* <Box sx={{ width }}> */}
            {controlType === 'textbox' && (
                <TextInput
                    value={stringValue}
                    required={required}
                    disabled={disabled}
                    tabIndex={tabIndex}
                    placeholder={placeholder}
                    size={size}
                    width={ctrlWidthValue}
                    onChange={(v) => onChange?.(v)}
                    onCommit={(v, e) => onCommit?.(v, e)}
                    highlight={highlight}
                    highlightColor={highlightColor}
                    highlightBorderColor={highlightBorderColor}
                    isNumeric={isNumeric}
                    maxLength={maxLength}
                    validationError={validationError}
                    isCommitting={isCommitting}
                />
            )}

            {controlType === 'select' && (
                <SelectInput
                    matchcode={matchcode}
                    value={stringValue}
                    options={options}
                    required={required}
                    disabled={disabled}
                    tabIndex={tabIndex}
                    placeholder={placeholder}
                    size={size}
                    width={ctrlWidthValue}
                    allowFreeText={allowFreeText}
                    onChange={(v) =>
                        onChange?.(typeof v === 'object' && v !== null ? String(v.value ?? '') : v)
                    }
                    onCommit={(v, e) => onCommit?.(v, e)}
                    highlight={highlight}
                    highlightColor={highlightColor}
                    highlightBorderColor={highlightBorderColor}
                />
            )}

            {controlType === 'radio' && (
                <RadioInput
                    value={stringValue}
                    options={options}
                    required={required}
                    disabled={disabled}
                    tabIndex={tabIndex}
                    onChange={(v) => onChange?.(v)}
                    onCommit={(v, e) => onCommit?.(v, e)}
                />
            )}

            {controlType === 'checkbox' && (
                <CheckboxInput
                    checked={booleanValue}
                    required={required}
                    disabled={disabled}
                    tabIndex={tabIndex}
                    onChange={(v) => onChange?.(v)}
                    onCommit={(v, e) => onCommit?.(v, e)}
                />
            )}

            {(controlType === 'calendar' || controlType === 'date') &&
                (() => {
                    return (
                        <DateInput
                            value={stringValue}
                            required={required}
                            disabled={disabled}
                            tabIndex={tabIndex}
                            placeholder={placeholder}
                            size={size}
                            width={ctrlWidthValue}
                            onChange={(v) => onChange?.(v)}
                            onCommit={(v, e) => onCommit?.(v, e)}
                            dateFormat={dateFormat}
                            minDate={minDate}
                            maxDate={maxDate}
                            highlight={highlight}
                            highlightColor={highlightColor}
                            highlightBorderColor={highlightBorderColor}
                        />
                    );
                })()}

            {controlType !== 'textbox' &&
                controlType !== 'textarea' &&
                controlType !== 'select' &&
                controlType !== 'radio' &&
                controlType !== 'checkbox' &&
                controlType !== 'calendar' &&
                controlType !== 'date' && (
                    <TextInput
                        value={stringValue}
                        required={required}
                        disabled={disabled}
                        tabIndex={tabIndex}
                        placeholder={placeholder}
                        size={size}
                        width={ctrlWidthValue}
                        onChange={(v) => onChange?.(v)}
                        onCommit={(v, e) => onCommit?.(v, e)}
                        highlight={highlight}
                        highlightColor={highlightColor}
                        highlightBorderColor={highlightBorderColor}
                        validationError={validationError}
                        isCommitting={isCommitting}
                    />
                )}
        </div>
    );
};
