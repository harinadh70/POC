import React, { useCallback, useState } from 'react';
import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import type { CommitEventType } from '@/types';

export interface TextInputProps {
    value: string;
    required?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    placeholder?: string;
    size?: 'small' | 'medium';
    width?: number | string;
    onChange?: (val: string) => void;
    onCommit?: (val: string, eventType: CommitEventType) => void;

    // NEW
    highlight?: boolean;
    highlightColor?: string;
    highlightBorderColor?: string;

    // Numeric field support
    isNumeric?: boolean;
    maxLength?: number;

    // Validation and loading state
    validationError?: string;
    isCommitting?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
    value,
    required,
    disabled,
    tabIndex = 0,
    placeholder = '',
    size = 'small',
    width = '100%',
    onChange,
    onCommit,

    // NEW
    highlight = false,
    highlightColor = '#fff566',
    highlightBorderColor = '#0a6f6f',

    // Numeric field support
    isNumeric = false,
    maxLength,

    // Validation and loading state
    validationError,
    isCommitting = false,
}) => {
    const [touched, setTouched] = useState(false);
    const requiredError = !!required && touched && String(value ?? '').trim() === '';
    const showError = requiredError || !!validationError;
    const errorMessage = validationError || (requiredError ? 'This field is required.' : '');

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let newValue = e.target.value;

            // If numeric field, filter non-digit characters
            if (isNumeric) {
                newValue = newValue.replace(/[^\d]/g, '');
            }

            // Enforce maxLength - truncate if exceeds
            if (maxLength && newValue.length > maxLength) {
                newValue = newValue.slice(0, maxLength);
            }

            onChange?.(newValue);
        },
        [onChange, isNumeric, maxLength],
    );

    const handlePaste = useCallback(
        (e: React.ClipboardEvent<HTMLInputElement>) => {
            const pastedText = e.clipboardData.getData('text');
            const currentValue = (e.target as HTMLInputElement).value;
            const selectionStart = (e.target as HTMLInputElement).selectionStart || 0;
            const selectionEnd = (e.target as HTMLInputElement).selectionEnd || 0;

            // Calculate what the new value would be after paste
            const beforeSelection = currentValue.slice(0, selectionStart);
            const afterSelection = currentValue.slice(selectionEnd);
            let newValue = beforeSelection + pastedText + afterSelection;

            // Apply numeric filter if needed
            if (isNumeric) {
                newValue = newValue.replace(/[^\d]/g, '');
            }

            // Enforce maxLength
            if (maxLength && newValue.length > maxLength) {
                e.preventDefault();
                newValue = newValue.slice(0, maxLength);
                onChange?.(newValue);
            }
        },
        [onChange, isNumeric, maxLength],
    );

    const handleBlur = useCallback(() => {
        setTouched(true);
        onCommit?.(value ?? '', 'blur');
    }, [onCommit, value]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                setTouched(true);
                onCommit?.(value ?? '', 'enter');
            }

            // If maxLength is set and we're at the limit, prevent regular character input
            if (maxLength && value && value.length >= maxLength) {
                // Allow: Backspace, Delete, Tab, Escape, Enter, and non-printable keys
                const allowedKeys = [
                    'Backspace',
                    'Delete',
                    'Tab',
                    'Escape',
                    'Enter',
                    'Home',
                    'ArrowLeft',
                    'End',
                    'ArrowRight',
                ];
                const isAllowedKey = allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey;

                if (!isAllowedKey && e.key.length === 1) {
                    e.preventDefault();
                }
            }
        },
        [onCommit, value, maxLength],
    );

    return (
        <TextField
            size={size}
            value={value ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder={placeholder}
            disabled={disabled || isCommitting}
            error={showError}
            helperText={errorMessage || ' '}
            inputProps={{
                tabIndex,
                maxLength: maxLength || undefined,
                inputMode: isNumeric ? 'numeric' : 'text',
            }}
            fullWidth
            InputProps={{
                endAdornment: isCommitting ? (
                    <InputAdornment position="end">
                        <CircularProgress size={20} />
                    </InputAdornment>
                ) : null,
            }}
            sx={{
                width,
                ...(highlight && {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: highlightColor,
                        '& fieldset': { borderColor: highlightBorderColor },
                        '&:hover fieldset': { borderColor: highlightBorderColor },
                        '&.Mui-focused fieldset': { borderColor: highlightBorderColor },
                    },
                }),
            }}
        />
    );
