import * as React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

export interface TabPanelProps {
    id: string;
    'aria-labelledby': string;
    hidden?: boolean;
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
    padding?: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
    id,
    'aria-labelledby': ariaLabelledby,
    hidden = false,
    children,
    sx,
    padding = 2,
}) => {
    return (
        <div
            role="tabpanel"
            id={id}
            aria-labelledby={ariaLabelledby}
            hidden={hidden}
            style={{ width: '100%' }}
        >
            {!hidden && <Box sx={{ width: '100%', p: padding, ...sx }}>{children}</Box>}
        </div>
    );
};

export default TabPanel;
