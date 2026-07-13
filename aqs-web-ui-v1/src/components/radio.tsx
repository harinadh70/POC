import React, { useState, useCallback } from 'react';
import { FormControl, RadioGroup, Radio, FormControlLabel, FormHelperText } from '@mui/material';
import type { CommitEventType, OptionItem } from '@/types';

export interface RadioInputProps {
  value: string;
  options: OptionItem[];
  required?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  onChange?: (val: string) => void;
  onCommit?: (val: string, eventType: CommitEventType) => void;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  value,
  options,
  required,
  disabled,
  tabIndex = 0,
  onChange,
  onCommit,
}) => {
  const [touched, setTouched] = useState(false);
  const showError = !!required && touched && String(value ?? '').trim() === '';

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      onChange?.(next);
      setTouched(true);
      onCommit?.(next, 'change');
    },
    [onChange, onCommit],
  );

  return (
    <FormControl disabled={disabled} error={showError} component="fieldset" fullWidth>
      <RadioGroup
        row
        value={value ?? ''}
        onChange={handleChange}
        className="flex flex-row items-center gap-2 flex-nowrap!"
      >
        {options.map((opt) => (
          <FormControlLabel
            key={String(opt.value)}
            value={opt.value}
            control={<Radio inputProps={{ tabIndex }} size="small" />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{showError ? 'Please choose an option.' : ' '}</FormHelperText>
    </FormControl>
  );
};
