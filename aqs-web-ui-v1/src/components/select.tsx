import React, { useState, useCallback, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type { CommitEventType, OptionItem } from '@/types';
import { pubSub } from '@/utils/pub-sub';

export interface SelectInputProps {
  /** Optional matchcode for the field (used for logging / event matching) */
  matchcode?: string;
  value: string | OptionItem | null;
  options: OptionItem[];
  required?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  placeholder?: string;
  size?: 'small' | 'medium';
  width?: number | string;
  allowFreeText?: boolean;
  onChange?: (val: string | OptionItem) => void;
  onCommit?: (val: string | OptionItem, eventType: CommitEventType) => void;

  // NEW
  highlight?: boolean;
  highlightColor?: string;
  highlightBorderColor?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  matchcode,
  value,
  options,
  required,
  disabled,
  tabIndex = 0,
  placeholder = '',
  size = 'small',
  width = '100%',
  allowFreeText = true,
  onChange,
  onCommit,

  // NEW
  highlight = false,
  highlightColor = '#fff566',
  highlightBorderColor = '#0a6f6f',
}) => {
  const [touched, setTouched] = useState(false);

  // Control popup open state so we can open it when options arrive
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // Flag indicating user attempted to open while options were not yet available
  const requestedOpenOnOptionsLoad = useRef(false);
  // Guard to ensure we only request pre-call once per open interaction
  const preCallRequested = useRef(false);
  // Blur-only commit strategy: mark when user changed selection/input.
  const pendingBlurCommitRef = useRef(false);
  // Track previous effective options length to detect arrivals
  const prevOptionsLength = useRef(0);
  // Signal to indicate options arrived from pub-sub; incremented slightly deferred
  const [arrivalSignal, setArrivalSignal] = useState(0);
  const [isLazyLoading, setIsLazyLoading] = useState(false);
  const reopenTimerRef = useRef<number | null>(null);

  const scheduleDropdownRefresh = useCallback(
    (clearRequestedOpenFlag: boolean) => {
      if (reopenTimerRef.current !== null) {
        window.clearTimeout(reopenTimerRef.current);
        reopenTimerRef.current = null;
      }

      if (open) {
        setOpen(false);
      }

      reopenTimerRef.current = window.setTimeout(() => {
        setOpen(true);
        if (clearRequestedOpenFlag) {
          requestedOpenOnOptionsLoad.current = false;
        }
        reopenTimerRef.current = null;
      }, 40);
    },
    [open],
  );

  // Extract the string value for validation and matching
  const stringValue =
    typeof value === 'string'
      ? value
      : value && typeof value === 'object' && 'value' in value
        ? String(value.value)
        : '';

  // Debug: Log when value is provided but no matching options exist
  // This helps diagnose the issue where service returns SELECT field value without options
  useEffect(() => {
    if (stringValue && options.length === 0) {
      console.warn('[SelectInput] ⚠ Value provided but no options available', {
        matchcode,
        value: stringValue,
        hasOptions: false,
        controlType: 'select',
        note: 'Service may have returned value without LOAD_COMBO. Ensure API response includes optio⟪?⟫',
      });
    }
    if (stringValue && !options.find((o) => String(o.value) === String(stringValue))) {
      console.log('[SelectInput] 📌 Creating synthetic option for server-provided value', {
        matchcode,
        value: stringValue,
        syntheticOption: { value: stringValue, label: stringValue },
      });
    }
  }, [matchcode, stringValue, options.length, options]);

  const showError = !!required && touched && stringValue.trim() === '';

  const commit = useCallback(
    (v: string | OptionItem | null, eventType: CommitEventType) => {
      // For SELECT: extract actual value (not label)
      let strValue = '';
      if (v === null) {
        strValue = '';
      } else if (typeof v === 'string') {
        strValue = v;
      } else if (typeof v === 'object' && 'value' in v) {
        strValue = String(v.value);
      }
      console.log('[SelectInput] Committing value:', {
        original: v,
        value: strValue,
        eventType,
      });
      onCommit?.(strValue, eventType);
    },
    [onCommit],
  );

  // Find matching option if value is a string, or use value if it's already an OptionItem
  const selectedValue = (() => {
    if (value && typeof value === 'object' && 'value' in value) {
      // Value is already an OptionItem
      return value;
    }
    // Value is a string, find matching option
    const matching = options.find((o) => String(o.value) === String(stringValue ?? ''));
    if (matching) {
      return matching;
    }
    // Some browser commands bind dropdowns using display label text.
    // Prefer resolving by label to avoid creating a synthetic duplicate row.
    // const matchingByLabel = options.find(
    //   (o) => String(o.label).trim() === String(stringValue ?? '').trim(),
    // );
    // if (matchingByLabel) {
    //   return matchingByLabel;
    // }
    // No matching option found, but value exists
    // Create a synthetic option so the value can be displayed
    if (stringValue && stringValue.trim() !== '') {
      return { value: stringValue, label: stringValue };
    }
    return null;
  })();

  // Track if user is actively typing
  const [inputValue, setInputValue] = useState('');
  const [isUserTyping, setIsUserTyping] = useState(false);

  // Sync inputValue to show the selected option's label
  // This ensures the selected value is always displayed, but doesn't trigger filtering
  useEffect(() => {
    // Only auto-sync when user is NOT actively typing
    // When user is typing, let their input control inputValue
    if (isUserTyping) return;

    if (selectedValue && typeof selectedValue === 'object' && 'label' in selectedValue) {
      // Set inputValue to the label for display
      Promise.resolve().then(() => {
        setInputValue(selectedValue.label ?? String(selectedValue.value ?? ''));
      });
    } else if (!selectedValue) {
      // No selection, clear the display
      Promise.resolve().then(() => {
        setInputValue('');
      });
    }
  }, [selectedValue, isUserTyping]);

  // Custom filtering: show all options when value is just selected,
  // but filter when user is actually typing
  const filterOptions = useCallback(
    (opts: OptionItem[]) => {
      // If user is not typing, show all options
      if (!isUserTyping || inputValue === '') {
        return opts;
      }

      // User is typing, filter based on the input text
      const lowerInput = inputValue.toLowerCase();
      return opts.filter((opt) => {
        const label = opt.label?.toLowerCase() ?? String(opt.value ?? '').toLowerCase();
        const value = String(opt.value ?? '').toLowerCase();
        return label.includes(lowerInput) || value.includes(lowerInput);
      });
    },
    [isUserTyping, inputValue],
  );

  // Ensure synthetic option is included in the options list for Autocomplete
  const effectiveOptions = (() => {
    // Keep popup empty when no real options exist so loading/empty states can render correctly.
    if (options.length === 0) {
      return options;
    }

    // Check if selectedValue already exists in options by comparing values (not reference)
    const valueExists =
      selectedValue &&
      options.some((o) => String(o.value) === String(selectedValue.value ?? selectedValue));

    const labelExists =
      selectedValue &&
      options.some(
        (o) =>
          String(o.label).trim() ===
          String(selectedValue.label ?? selectedValue.value ?? selectedValue).trim(),
      );

    const syntheticOption =
      selectedValue && !valueExists && !labelExists ? [selectedValue] : [];
    return [...options, ...syntheticOption];
  })();

  // React immediately to global field updates from browser commands (LOAD_COMBO/CLEAR_COMBO).
  useEffect(() => {
    if (!matchcode || !matchcode.trim()) {
      return undefined;
    }

    const normalizedMatchcode = matchcode.trim().toLowerCase();

    const unsubscribe = pubSub.subscribe('form:field-updated', (event) => {
      const eventMatchcode = String(event.matchcode ?? '')
        .trim()
        .toLowerCase();

      if (eventMatchcode !== normalizedMatchcode) {
        return;
      }

      if (!Array.isArray(event.value)) {
        return;
      }

      const incomingOptionCount = event.value.length;
      // If cleared, immediately close
      if (incomingOptionCount === 0) {
        // update prev length to 0 so next increases are detected
        prevOptionsLength.current = 0;
        setOpen(false);
        setIsLazyLoading(false);
        requestedOpenOnOptionsLoad.current = false;
        preCallRequested.current = false;
        pendingBlurCommitRef.current = false;
        return;
      }

      setIsLazyLoading(false);

      // Defer signaling to allow React props to update from form store
      window.setTimeout(() => setArrivalSignal((s) => s + 1), 20);
    });

    return () => {
      unsubscribe();
    };
  }, [matchcode, open, scheduleDropdownRefresh]);

  // When options change while the input is focused, open the popup so user sees new items.
  // Only auto-open when the user previously attempted to open (requestedOpenOnOptionsLoad)
  useEffect(() => {
    const curr = effectiveOptions.length;
    const prev = prevOptionsLength.current ?? 0;
    // Options arrived (length increased)
    if (curr > 0 && curr > prev) {
      if (requestedOpenOnOptionsLoad.current) {
        // previously requested open while empty - open now
        scheduleDropdownRefresh(true);
        return undefined;
      } else if (open) {
        // already open but options changed - force a quick refresh so popup renders new items
        scheduleDropdownRefresh(false);
      }
    }
    // if no options and not focused, ensure popup closed
    if (!isFocused && curr === 0) {
      setOpen(false);
    }
    prevOptionsLength.current = curr;
    // If options just arrived via pub-sub signal, and user attempted to open, open/refresh now
    if (arrivalSignal > 0 && curr > 0 && requestedOpenOnOptionsLoad.current) {
      scheduleDropdownRefresh(true);
      // reset arrival signal (we keep prevOptionsLength updated above)
      setArrivalSignal(0);
    }
    return undefined;
  }, [isFocused, effectiveOptions.length, open, scheduleDropdownRefresh]);

  useEffect(() => {
    return () => {
      if (reopenTimerRef.current !== null) {
        window.clearTimeout(reopenTimerRef.current);
        reopenTimerRef.current = null;
      }
    };
  }, []);

  return (
    <Autocomplete
      key={matchcode ? `${matchcode} ${effectiveOptions.length} ${arrivalSignal}` : undefined}
      open={open}
      onOpen={() => {
        pendingBlurCommitRef.current = false;
        // User attempted to open - if no runtime options yet, mark requestedOpenOnOptionsLoad
        // Use the original `options` prop (not `effectiveOptions`) so synthetic
        // options created from a default/text value do not prevent pre-call.
        if (options.length === 0) {
          requestedOpenOnOptionsLoad.current = true;
          setIsLazyLoading(true);
          // Trigger a pre-call via onCommit only once per user-open interaction.
          if (!preCallRequested.current) {
            preCallRequested.current = true;
            // Lazy-load options while preserving current display value in form state.
            onCommit?.(stringValue, 'change');
          }
        }
        setOpen(true);
      }}
      onClose={() => {
        setIsLazyLoading(false);
        requestedOpenOnOptionsLoad.current = false;
        preCallRequested.current = false;
        setOpen(false);
      }}
      freeSolo={allowFreeText}
      options={effectiveOptions}
      value={selectedValue}
      inputValue={inputValue}
      filterOptions={filterOptions}
      onInputChange={(_, newInputValue, reason) => {
        // Update the input field text
        setInputValue(newInputValue);

        // Track if user is actively typing
        if (reason === 'input') {
          setIsUserTyping(true);
        } else {
          // User is not typing (e.g., option selected, or blur)
          setIsUserTyping(false);
        }

        // Only update parent state if user is actually typing (free text mode)
        if (!allowFreeText) return;
        if (reason === 'input') {
          // User is typing, notify parent with the typed text
          onChange?.(newInputValue);
          pendingBlurCommitRef.current = true;
        }
      }}
      onFocus={() => setIsFocused(true)}
      onChange={(_, option) => {
        // Extract the actual value (not the label for display)
        let nextVal = '';
        if (typeof option === 'string') {
          nextVal = option;
        } else if (option && typeof option === 'object' && 'value' in option) {
          nextVal = String(option.value);
        }

        console.log('[SelectInput] Value selected:', {
          selectedOption: option,
          extractedValue: nextVal,
        });

        // Notify parent of the actual value for form state
        onChange?.(nextVal);
        setTouched(true);
        pendingBlurCommitRef.current = true;

        // Don't clear inputValue here - let useEffect sync it based on selectedValue
        // The useEffect will set inputValue to show the selected option's label

        // Commit is intentionally deferred to blur/tab-out for select fields.
      }}
      onBlur={() => {
        setIsFocused(false);
        setTouched(true);

        if (!pendingBlurCommitRef.current) {
          return;
        }
        // Keep inputValue synced to show selected value - don't clear it
        // The dropdown will close automatically without filtering issues

        // Extract actual value for blur event
        let blurVal = '';
        if (selectedValue && typeof selectedValue === 'string') {
          blurVal = selectedValue;
        } else if (
          selectedValue &&
          typeof selectedValue === 'object' &&
          'value' in selectedValue
        ) {
          blurVal = String(selectedValue.value);
        }
        commit(blurVal, 'blur');
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        if (option && typeof option === 'object' && 'label' in option) {
          return option.label ?? '';
        }
        return '';
      }}
      isOptionEqualToValue={(option, val) => {
        if (!option) return false;
        // Extract value from val (could be string or OptionItem)

        const compareValue =
          typeof val === 'string'
            ? val
            : val && typeof val === 'object' && 'value' in val
            ? String(val.value)
            : '';

        return String(option.value) === compareValue;
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setTouched(true);
          // Extract label value for enter event
          let enterVal = '';
          if (selectedValue && typeof selectedValue === 'string') {
            enterVal = selectedValue;
          } else if (
            selectedValue &&
            typeof selectedValue === 'object' &&
            'label' in selectedValue
          ) {
            enterVal = String(selectedValue.label);
          }
          commit(enterVal, 'enter');
        }
      }}
      disabled={disabled}
      loading={isLazyLoading && options.length === 0}
      loadingText="Loading options..."
      forcePopupIcon
      popupIcon={<ArrowDropDownIcon />}
      disableClearable={false}
      renderInput={(params) => (
        <TextField
          {...params}
          size={size}
          placeholder={placeholder}
          error={showError}
          helperText={showError ? 'Please select a value.' : ' '}
          inputProps={{
            ...params.inputProps,
            tabIndex,
          }}
          fullWidth
          // Apply highlight styling to the input root
          sx={{
            ...(highlight && {
              '& .MuiOutlinedInput-root': {
                backgroundColor: highlightColor,
                '& fieldset': {
                  borderColor: highlightBorderColor,
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: highlightBorderColor,
                  borderWidth: '2px',
                },
                '&.Mui-focused fieldset': {
                  borderColor: highlightBorderColor,
                  borderWidth: '2px',
                },
              },
            }),
          }}
        />
      )}
      sx={{ width: typeof width === 'number' ? `${width}px` : width }}
    />
  );
};
