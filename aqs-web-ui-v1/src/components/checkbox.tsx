import React, { useState, useCallback } from 'react';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import type { CommitEventType } from '@/types';

export interface CheckboxInputProps {
    checked: boolean;
    required?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    onChange?: (val: boolean) => void;
    onCommit?: (val: boolean, eventType: CommitEventType) => void;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
    checked,
    required,
    disabled,
    tabIndex = 0,
    onChange,
    onCommit,
}) => {
    const [touched, setTouched] = useState(false);
    const showError = !!required && touched && checked !== true;

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const next = e.target.checked;
            onChange?.(next);
            setTouched(true);
            onCommit?.(next, 'change');
        },
        [onChange, onCommit],
    );

    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={Boolean(checked)}
                        onChange={handleChange}
                        disabled={disabled}
                        inputProps={{ tabIndex }}
                        size="small"
                    />
                }
                label="" // keep label on the left via the row container
            />
            <FormHelperText error={showError}>
                {showError ? 'This checkbox is required.' : ' '}
            </FormHelperText>
        </>
    );
};
