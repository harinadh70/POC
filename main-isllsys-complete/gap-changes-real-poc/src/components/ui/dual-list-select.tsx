// GAP #53 — FillSelectList dual-list (Main_ISLLSYS.vbs lines 5172-5303)
// NEW FILE — src/components/ui/dual-list-select.tsx
// Coverage dual-list foundation: "Available" and "Selected" MUI lists
// with > / < transfer buttons. Highlight items, transfer with the
// buttons; maxSelected enforces the legacy coverage-code limit.

import { useState } from 'react';
import {
    Button,
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';

// types
import type { OptionItem } from '@/types/form';

// ----------------------------------------

interface DualListSelectProps {
    /**
     * Unique identifier (test ids follow the select.tsx convention)
     */
    id?: string;

    /**
     * Full option catalog — value/label/disabled
     */
    options: OptionItem[];

    /**
     * Controlled selection: option values currently in the "Selected" list
     */
    value: string[];

    /**
     * Change handler (required) — receives the next selected values
     */
    onChange: (next: string[]) => void;

    /**
     * Coverage-code limit — the "Selected" list may not exceed this count
     */
    maxSelected?: number;

    /**
     * Disable the whole control
     */
    disabled?: boolean;

    /**
     * List headings — default "Available" / "Selected"
     */
    availableLabel?: string;
    selectedLabel?: string;

    /**
     * Layout className only
     */
    className?: string;
}

// ----------------------------------------

function DualListSelect({
    id = 'dual-list',
    options,
    value,
    onChange,
    maxSelected,
    disabled = false,
    availableLabel = 'Available',
    selectedLabel = 'Selected',
    className,
}: DualListSelectProps) {
    // Highlighted (checked) option values — may span both lists; each
    // transfer only consumes the side it applies to.
    const [checked, setChecked] = useState<string[]>([]);

    const availableOptions = options.filter((option) => !value.includes(option.value));
    const selectedOptions = value
        .map((selectedValue) => options.find((option) => option.value === selectedValue))
        .filter((option): option is OptionItem => option !== undefined);

    const checkedAvailable = availableOptions
        .filter((option) => checked.includes(option.value))
        .map((option) => option.value);
    const checkedSelected = selectedOptions
        .filter((option) => checked.includes(option.value))
        .map((option) => option.value);

    const remainingCapacity =
        maxSelected !== undefined ? Math.max(0, maxSelected - value.length) : Number.POSITIVE_INFINITY;
    const atLimit = maxSelected !== undefined && value.length >= maxSelected;

    const toggleChecked = (optionValue: string) => {
        setChecked((prev) =>
            prev.includes(optionValue)
                ? prev.filter((v) => v !== optionValue)
                : [...prev, optionValue],
        );
    };

    /** > — move highlighted available items into the selected list (capped). */
    const handleTransferToSelected = () => {
        if (checkedAvailable.length === 0 || atLimit) return;
        const moving = checkedAvailable.slice(0, remainingCapacity);
        if (import.meta.env.DEV && moving.length < checkedAvailable.length) {
            console.warn(
                `[DualListSelect:${id}] maxSelected=${maxSelected} reached — ` +
                    `moved ${moving.length} of ${checkedAvailable.length} items`,
            );
        }
        onChange([...value, ...moving]);
        setChecked((prev) => prev.filter((v) => !moving.includes(v)));
    };

    /** < — remove highlighted selected items back to the available list. */
    const handleTransferToAvailable = () => {
        if (checkedSelected.length === 0) return;
        onChange(value.filter((selectedValue) => !checkedSelected.includes(selectedValue)));
        setChecked((prev) => prev.filter((v) => !checkedSelected.includes(v)));
    };

    const renderList = (
        title: string,
        listOptions: OptionItem[],
        side: 'available' | 'selected',
    ) => (
        <Paper variant="outlined" className="flex flex-col grow min-w-0">
            <Typography
                variant="subtitle2"
                component="h3"
                className="px-3! py-2! border-b"
                data-testid={`${id}-${side}-title`}
            >
                {title}
                {side === 'selected' && maxSelected !== undefined
                    ? ` (${listOptions.length}/${maxSelected})`
                    : ` (${listOptions.length})`}
            </Typography>
            <List dense className="grow overflow-y-auto" data-testid={`${id}-${side}-list`}>
                {listOptions.map((option) => (
                    <ListItem key={option.value} disablePadding>
                        <ListItemButton
                            dense
                            onClick={() => toggleChecked(option.value)}
                            disabled={disabled || option.disabled}
                            data-testid={`${id}-${side}-${option.value}-option-item`}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.includes(option.value)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-label': option.label }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={option.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );

    return (
        <div className={className} data-testid={`${id}-field`}>
            <div className="flex items-stretch gap-3 min-h-60">
                {renderList(availableLabel, availableOptions, 'available')}

                <div className="flex flex-col items-center justify-center gap-2">
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleTransferToSelected}
                        disabled={disabled || checkedAvailable.length === 0 || atLimit}
                        aria-label="Move highlighted items to selected"
                        data-testid={`${id}-transfer-to-selected`}
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleTransferToAvailable}
                        disabled={disabled || checkedSelected.length === 0}
                        aria-label="Move highlighted items back to available"
                        data-testid={`${id}-transfer-to-available`}
                    >
                        &lt;
                    </Button>
                </div>

                {renderList(selectedLabel, selectedOptions, 'selected')}
            </div>

            {atLimit ? (
                <Typography
                    variant="caption"
                    className="block mt-1!"
                    data-testid={`${id}-limit-message`}
                >
                    Maximum of {maxSelected} coverage codes selected.
                </Typography>
            ) : null}
        </div>
    );
}

// ----------------------------------------

export { DualListSelect };
export type { DualListSelectProps };
