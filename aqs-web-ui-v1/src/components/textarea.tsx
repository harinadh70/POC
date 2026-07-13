import React, { useCallback, useState } from 'react';
import { TextField } from '@mui/material';
import type { CommitEventType } from '@/types';

export interface TextAreaInputProps {
  value: string;
  required?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  placeholder?: string;
  size?: 'small' | 'medium';
  width?: number | string;
  onChange?: (val: string) => void;
  onCommit?: (val: string, eventType: CommitEventType) => void;
  // optional highlight
  highlight?: boolean;
  highlightColor?: string;
  highlightBorderColor?: string;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  value,
  required,
  disabled,
  tabIndex = 0,
  placeholder = '',
  size = 'small',
  width = '100%',
  onChange,
  onCommit,
  highlight = false,
  highlightColor = '#fff566',
  highlightBorderColor = '#0a6f6f',
}) => {
  const [touched, setTouched] = useState(false);
  const showError = !!required && touched && String(value ?? '').trim() === '';

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value),
    [onChange],
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
    },
    [onCommit, value],
  );

  return (
    <TextField
      size={size}
      value={value ?? ''}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      error={showError}
      helperText={showError ? 'This field is required.' : ' '}
      inputProps={{ tabIndex }}
      fullWidth
      multiline
      minRows={3}
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
};
