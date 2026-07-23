// MODIFIED — original: src/components/ui/select.tsx (aqs-web-ui real POC)
// Integrated: GAP #83 — ShowZeroText (VBS 8986-9022)
// When the control carries showZero, a selectable empty option { value: '', label: '-- Select --' }
// is prepended to the options in BOTH render paths (Autocomplete + classic Select); the disabled
// placeholder item is suppressed in that case so '' stays selectable to clear the field.
// Every change is fenced with  >>> GAP #83 ... <<< GAP #83  markers.

import { Select as SelectField, MenuItem, Autocomplete, TextField } from '@mui/material';

// types
import type { Ref } from 'react';
import type { SelectProps as SelectFieldProps } from '@mui/material';
import type { OptionItem } from '@/types/form';

// ----------------------------------------

type SelectFieldSlotsAndSlotProps = Partial<Pick<SelectFieldProps, 'slots' | 'slotProps'>>;

type SelectProps = SelectFieldSlotsAndSlotProps & {
    /**
     * Unique identifier
     */
    id?: string;

    /**
     * Field name
     */
    name: string;

    /**
     * Controlled value
     */
    value: string;

    /**
     * Change handler (required)
     */
    onChange?: (value: string) => void;

    /**
     * Options list
     */
    options: OptionItem[]; // [truncated]

    // >>> GAP #83: ShowZeroText — @showzero flag from the control (Control.showZero / SelectFieldSchema.showZero)
    /**
     * When true, prepend a selectable empty option ('-- Select --') — legacy ShowZeroText
     */
    showZero?: boolean;
    // <<< GAP #83

    /**
     * Layout className only
     */
    className?: string;

    /**
     * Blur handler (used by FieldRenderer for EE triggering). // [truncated]

    const selectedOption = options.find((o) => o.value === value) ?? null;

    if (variant === 'autocomplete') { // [truncated]
// [gap: lines 49-78 not photographed]
function Select(props: SelectProps) {
	// >>> GAP #83: ShowZeroText — effective options list (merge AFTER the props destructuring)
	const { showZero = false } = props;
	const renderOptions: OptionItem[] = showZero
		? [{ value: '', label: '-- Select --', disabled: false }, ...options]
		: options;
	// <<< GAP #83

	// >>> GAP #83: ShowZeroText — resolve the selection against the effective list
	const selectedOption = renderOptions.find((o) => o.value === value) ?? null;
	// <<< GAP #83

	if (variant === 'autocomplete') {
		return (
			<Autocomplete
				/* >>> GAP #83: ShowZeroText */
				options={renderOptions}
				/* <<< GAP #83 */
				value={selectedOption}
				onChange={(_, newValue) => onChange?.(newValue?.value ?? '')}
				getOptionLabel={(option) => option.label}
				isOptionEqualToValue={(o, v) => o.value === v.value}
				disabled={disabled}
				renderInput={(params) => (
					<TextField
						{...params}
						inputRef={inputRef}
						name={name}
						required={required}
						placeholder={placeholder}
						onBlur={onBlur}
						onFocus={onFocus}
						data-testid={`${id}-field`}
					/>
				)}
				slotProps={slotProps}
				className={className}
			/>
		);
	}

	return (
		<SelectField
			data-testid={`${id}-field`}
			name={name}
			value={value || ''}
			onChange={(e) => onChange?.(e.target.value)}
			onBlur={onBlur}
// [gap: lines 116-130 not photographed]
	value={value || ''}
	onChange={(e) => onChange?.(e.target.value)}
	onBlur={onBlur}
	onOpen={() => onFocus?.()}
	displayEmpty
	disabled={disabled}
	inputRef={inputRef}
	required={required}
	className={className}
	slots={slots}
	slotProps={slotProps}
	renderValue={(selected) =>
		selected
			? options.find((o) => o.value === selected)?.label
			: (placeholder ?? 'Select...')
	}
>

	{/* >>> GAP #83: ShowZeroText — suppress the disabled placeholder when the '' option is rendered */}
	{!value && !showZero ? (
		<MenuItem disabled value="" data-testid={`${id}-placeholder-option-item`}>
			{placeholder ?? 'Select...'}
		</MenuItem>
	) : null}
	{/* <<< GAP #83 */}

	{/* >>> GAP #83: ShowZeroText — render the effective list (includes the '' option when showZero) */}
	{renderOptions.map((option) => (
		<MenuItem
			key={option.value}
			value={option.value}
			disabled={option.disabled}
			data-testid={`${id}-${option.value}-option-item`}
		>
			{option.label}
		</MenuItem>
	))}
	{/* <<< GAP #83 */}
</SelectField>
);

// ----------------------------------------

export { Select };
