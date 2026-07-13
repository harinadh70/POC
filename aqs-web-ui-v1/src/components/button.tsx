import React from 'react';
import { Button as MuiButton } from '@mui/material';
import type { PageBuildButton } from '@utils/transform-pagebuild-response';
import type { CommitEventType } from '@/types';

export interface ButtonProps extends Omit<PageBuildButton, 'calls'> {
    onCommit: (matchcode: string, value: string | boolean, eventType: CommitEventType) => void;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    matchcode,
    text,
    disabled,
    visible,
    onCommit,
    loading = false,
}) => {
    if (!visible) {
        return null;
    }

    const handleClick = () => {
        // Buttons trigger with empty string value and 'change' event type
        onCommit(matchcode, '', 'change');
    };

    // Determine button variant based on matchcode
    const getVariant = (): 'primary' | 'secondary' | 'text' | 'tableMedium' => {
        const upperMatchcode = matchcode.toUpperCase();

        if (['OK', 'SUBMIT', 'NEXT', 'HEADERBTN1'].includes(upperMatchcode)) {
            return 'primary';
        }
        if (upperMatchcode === 'CANCEL') {
            return 'secondary';
        }

        if (['NAMEINSADD', 'NAMEINSEDIT', 'NAMEINSDELETE', 'PRINTORDER'].includes(upperMatchcode)) {
            return 'tableMedium';
        }

        return 'secondary';
    };

    // Determine button color based on matchcode
    const getColor = (): 'primary' | 'secondary' | 'errorMedium' | 'primary' | 'tableMedium' => {
        const upperMatchcode = matchcode.toUpperCase();
        if (['OK', 'SUBMIT', 'NEXT', 'HEADERBTN1'].includes(upperMatchcode)) {
            return 'primary';
        }
        if (upperMatchcode === 'DELETE' || upperMatchcode === 'DISCARD') {
            return 'errorMedium';
        }
        if (['NAMEINSADD', 'NAMEINSEDIT', 'NAMEINSDELETE', 'PRINTORDER'].includes(upperMatchcode)) {
            return 'secondary';
        }
        return 'primary';
    };

    return (
        <MuiButton
            variant={getVariant()}
            color={getColor()}
            disabled={disabled || loading}
            onClick={handleClick}
            sx={{ minWidth: 100 }}
        >

            {text}
        </MuiButton>
    );
};
