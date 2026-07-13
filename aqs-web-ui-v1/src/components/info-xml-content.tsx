import React, { useMemo } from 'react';
import {
    Alert,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

import { parseInfoXml } from '@/utils/parse-info-xml';

export interface InfoXmlContentProps {
    xmlData: string;
}

/**
 * Generic informational dialog content.
 *
 * This component is intentionally global and reusable:
 * - It parses legacy XML payloads from browser commands
 * - It renders known structures with expected columns
 * - It falls back to a generic table for unknown structures
 */
export const InfoXmlContent: React.FC<InfoXmlContentProps> = ({ xmlData }) => {
    // Parse XML once per payload update.
    const parsed = useMemo(() => parseInfoXml(xmlData), [xmlData]);

    // Render parse errors as user-friendly alerts inside the dialog body.
    if (parsed.error) {
        return (
            <Alert severity="warning" sx={{ mt: 1 }}>
                {parsed.error}
            </Alert>
        );
    }

    return (
        <Box sx={{ minWidth: 320 }}>
            {/* Render detected title for better context. */}
            {parsed.title ? (
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                    {parsed.title}
                </Typography>
            ) : null}

            {/* Render all sections to support multi-table structures like taxinfo. */}
            {parsed.sections.map((section) => (
                <Box key={section.id} sx={{ mb: 2 }}>
                    {/* Render section title when available. */}
                    {section.title ? (
                        <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 600 }}>
                            {section.title}
                        </Typography>
                    ) : null}

                    {/* Render dynamic columns/rows from normalized parser output. */}
                    <TableContainer>
                        <Table size="small" aria-label={`info-table-${section.id}`}>
                            <TableHead>
                                <TableRow>
                                    {section.columns.map((column) => (
                                        <TableCell
                                            key={`${section.id}-head-${column.key}`}
                                            align={column.align || 'left'}
                                            sx={{
                                                width: column.width,
                                                fontWeight: 700,
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {column.header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {section.rows.map((row, rowIndex) => (
                                    <TableRow key={`${section.id}-row-${rowIndex}`}>
                                        {section.columns.map((column) => (
                                            <TableCell
                                                key={`${section.id}-row-${rowIndex}-${column.key}`}
                                                align={column.align || 'left'}
                                            >
                                                {row[column.key] || ''}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ))}
        </Box>
    );
};
