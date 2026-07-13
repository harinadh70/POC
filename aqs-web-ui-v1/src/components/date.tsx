import type { FC } from 'react';
import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';

import { ChevronLeft, ChevronRight, ArrowDropDown } from '@mui/icons-material';

import type { CommitEventType } from '@/types';

/* ==========================================================
   Custom Calendar Header (Month + Year Dropdown)
   ========================================================== */

interface CustomCalendarHeaderProps {
    currentMonth: Dayjs;
    onMonthChange: (date: Dayjs) => void;
}

const CustomCalendarHeader: FC<CustomCalendarHeaderProps> = ({ currentMonth, onMonthChange }) => {
    const [monthAnchor, setMonthAnchor] = useState<HTMLElement | null>(null);
    const [yearAnchor, setYearAnchor] = useState<HTMLElement | null>(null);

    const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMM'));
    const years = Array.from({ length: 36 }, (_, i) => 2000 + i);

    const handleMonthSelect = useCallback(
        (monthIndex: number) => {
            onMonthChange(currentMonth.month(monthIndex));
            setMonthAnchor(null);
        },
        [currentMonth, onMonthChange],
    );

    const handleYearSelect = useCallback(
        (year: number) => {
            onMonthChange(currentMonth.year(year));
            setYearAnchor(null);
        },
        [currentMonth, onMonthChange],
    );

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
            {/* MONTH */}
            <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                    size="small"
                    onClick={() => onMonthChange(currentMonth.subtract(1, 'month'))}
                >
                    <ChevronLeft fontSize="small" />
                </IconButton>

                <Box
                    display="flex"
                    alignItems="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={(e) => setMonthAnchor(e.currentTarget)}
                >
                    <Typography fontWeight={600}>{currentMonth.format('MMM')}</Typography>
                    <ArrowDropDown />
                </Box>

                <IconButton
                    size="small"
                    onClick={() => onMonthChange(currentMonth.add(1, 'month'))}
                >
                    <ChevronRight fontSize="small" />
                </IconButton>

                <Menu
                    anchorEl={monthAnchor}
                    open={Boolean(monthAnchor)}
                    onClose={() => setMonthAnchor(null)}
                >
                    {months.map((m, i) => (
                        <MenuItem key={m} onClick={() => handleMonthSelect(i)}>
                            {m}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>

            {/* YEAR */}
            <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                    size="small"
                    onClick={() => onMonthChange(currentMonth.subtract(1, 'year'))}
                >
                    <ChevronLeft fontSize="small" />
                </IconButton>

                <Box
                    display="flex"
                    alignItems="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={(e) => setYearAnchor(e.currentTarget)}
                >
                    <Typography fontWeight={600}>{currentMonth.format('YYYY')}</Typography>
                    <ArrowDropDown />
                </Box>

                <IconButton size="small" onClick={() => onMonthChange(currentMonth.add(1, 'year'))}>
                    <ChevronRight fontSize="small" />
                </IconButton>

                <Menu
                    anchorEl={yearAnchor}
                    open={Boolean(yearAnchor)}
                    onClose={() => setYearAnchor(null)}
                >
                    {years.map((y) => (
                        <MenuItem key={y} onClick={() => handleYearSelect(y)}>
                            {y}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    );
};

/* ================================================================
    DateInput Component
================================================================ */

export interface DateInputProps {
    value: string;
    onCommit?: (val: string, eventType: CommitEventType) => void;

    dateFormat?: string;
    minDate?: string;
    maxDate?: string;
    disabled?: boolean;
    width?: number | string;
}

export const DateInput: FC<DateInputProps> = ({
    value,
    onCommit,
    dateFormat = 'MM/DD/YYYY',
    minDate,
    maxDate,
    disabled,
    width = '100%',
}) => {
    const [displayValue, setDisplayValue] = useState(value);
    const [tempDate, setTempDate] = useState<Dayjs | null>(null);
    const [open, setOpen] = useState(false);
    const originalValueRef = useRef(value);
    const allowCloseRef = useRef(false);

    useEffect(() => {
        setDisplayValue(value);
        originalValueRef.current = value;
    }, [value]);

    const parsedValue = useMemo(() => {
        if (!displayValue) return null;
        const strict = dayjs(displayValue, dateFormat, true);
        if (strict.isValid()) return strict;
        const loose = dayjs(displayValue, dateFormat);
        if (loose.isValid()) return loose;
        const iso = dayjs(displayValue);
        return iso.isValid() ? iso : null;
    }, [displayValue, dateFormat]);

    const min = minDate ? dayjs(minDate) : undefined;
    const max = maxDate ? dayjs(maxDate) : undefined;

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{
                cancelButtonLabel: 'Close',
                okButtonLabel: 'OK',
            }}
        >
            <DatePicker
                value={open ? tempDate : parsedValue}
                open={open}
                disabled={disabled}
                minDate={min}
                maxDate={max}
                format={dateFormat}
                closeOnSelect={false}
                sx={{ width: '100%' }}
                onOpen={() => {
                    setTempDate(parsedValue);
                    originalValueRef.current = displayValue;
                    allowCloseRef.current = false;
                    setOpen(true);
                }}
                onClose={() => {
                    // Prevent closing unless explicitly allowed by OK/Cancel
                    if (allowCloseRef.current) {
                        setOpen(false);
                    } else {
                        // Re-open the picker to prevent accidental closing
                        setOpen(false);
                    }
                }}
                onChange={(newValue) => setTempDate(newValue)}
                slotProps={{
                    actionBar: {
                        actions: [],
                    },
                    textField: {
                        fullWidth: true,
                        onBlur: () => onCommit?.(displayValue, 'blur'),
                        sx: { width },
                    },
                }}
                slots={{
                    calendarHeader: CustomCalendarHeader,
                    actionBar: () => (
                        <Box display="flex" justifyContent="flex-end" gap={5} px={2} py={1}>
                            <button
                                className="text-[14px] cursor-pointer"
                                disabled={!tempDate}
                                onClick={() => {
                                    allowCloseRef.current = true;
                                    if (tempDate) {
                                        const str = tempDate.format(dateFormat);
                                        setDisplayValue(str);
                                        onCommit?.(str, 'change');
                                    }
                                    setOpen(false);
                                }}
                            >

                                OK
                            </button>
                            <button
                                className="text-[14px] cursor-pointer"
                                onClick={() => {
                                    allowCloseRef.current = true;
                                    setDisplayValue(originalValueRef.current);
                                    setTempDate(null);
                                    setOpen(false);
                                }}
                            >
                                Close
                            </button>
                        </Box>
                    ),
                }}
            />
        </LocalizationProvider>
    );
⟪?⟫
