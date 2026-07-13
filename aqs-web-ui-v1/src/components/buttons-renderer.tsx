import React from 'react';
import { Stack, Box } from '@mui/material';
import { Button } from '@components/button';
import type { NormalizedField } from '@/types';

export interface ButtonsRendererProps {
    fields: NormalizedField[];
    onButtonClick?: (matchcode: string) => void;
    orientation?: 'row' | 'column';
    spacing?: number;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    sx?: any;
}

/**
 * ButtonsRenderer - Renders action buttons extracted from form controls
 * Displays buttons with proper disabled/visible states
 */
export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({
    fields,
    onButtonClick,
    orientation = 'row',
    spacing = 1,
    justifyContent = 'flex-end',
    sx = {},
}) => {
    // Filter only button type fields that are visible
    const buttons = fields.filter(
        (field) => field.controlType === 'button' && field.visible !== false,
    );

    // Debug: Log button visibility
    const allButtonFields = fields.filter((field) => field.controlType === 'button');
    if (allButtonFields.length > 0) {
        console.group('🔵 [ButtonsRenderer] Button Visibility Status');
        console.table(
            allButtonFields.map((f) => ({
                Matchcode: f.matchcode,
                Label: f.label,
                Visible: f.visible,
                Disabled: f.disabled,
                'Will Render': f.visible !== false ? '✅' : '❌',
            })),
        );
        console.groupEnd();
    }

    if (buttons.length === 0) {
        return null;
    }

    // Sort by utporder if available
    const sortedButtons = buttons.sort((a, b) => {
        const orderA = (a as any).utporder || 0;
        const orderB = (b as any).utporder || 0;
        return orderA - orderB;
    });

    return (
        <Box
            sx={{
                display: 'flex',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid #e0e0e0',
                ...sx,
            }}
        >
            <Stack
                direction={orientation}
                spacing={spacing}
                sx={{
                    width: '100%',
                    justifyContent,
                }}
            >
                {sortedButtons.map((button) => (
                    <Button
                        key={button.matchcode}
                        matchcode={button.matchcode}
                        label={button.label}
                        disabled={button.disabled}
                        onClick={onButtonClick}
                        variant={button.matchcode === 'OK' ? 'primary' : 'secondary'}
                        color={button.matchcode === 'OK' ? 'primary' : 'secondary'}
                        sx={{
                            borderRadius: '4px',
                            px: 2,
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default ButtonsRenderer;
