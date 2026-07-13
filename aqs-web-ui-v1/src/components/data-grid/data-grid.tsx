// components/common-grid.tsx
/**
 * Universal Grid Component
 *
 * A reusable grid component that works with any grid configuration.
 * Maps grid config to MUI DataGrid columns and handles data rendering.
 *
 * Usage:
 * <common-grid gridConfig={config} data={apiResponse} onRowClick={handleRowClick} />
 */

import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import {
    DataGrid as MuiDataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import type { DataGridProps, GridColDef, GridRowParams } from '@mui/x-data-grid';

import type { GridConfigObject } from '@components/data-grid/data-grid-config-registry';
import { normalizeGridResponse, type GenericRow } from '@components/data-grid/data-grid-normalize';
import { Theme } from '@/constants/theme';

/** Toolbar */
function GridToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter debounceMs={400} />
            <Box sx={{ flexGrow: 1 }} />
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        </GridToolbarContainer>
    );
}

/** Footer with totals */
function TotalsFooter({
    totalUnits,
    totalPremium,
}: {
    totalUnits?: number;
    totalPremium?: number;
}) {
    return (
        <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'flex-end', gap: 3, fontWeight: 500 }}>
            {totalUnits !== undefined && <Box>Units: {totalUnits.toLocaleString()}</Box>}
            {totalPremium !== undefined && (
                <Box>
                    Premium: $
                    {totalPremium.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </Box>
            )}
        </Box>
    );
}

/**
 * Convert grid config columns to MUI GridColDef format
 */
function configToMuiColumns(config: GridConfigObject): GridColDef[] {
    return config.columns
        .filter((col) => col.visible !== false)
        .map((col) => ({
            field: col.field,
            headerName: col.label,
            width: col.width,
            flex: col.flex,
            type: col.type === 'currency' ? 'number' : col.type,
            align: col.align as any,
            sortable: col.sortable !== false,
            filterable: col.filterable !== false,
            valueFormatter: col.valueFormatter
                ? ({ value }: { value: any }) => col.valueFormatter!(value)
                : undefined,
        }));
}

export type CommonGridProps = Omit<
    DataGridProps<GenericRow>,
    | 'rows'
    | 'columns'
    | 'loading'
    | 'slots'
    | 'slotProps'
    | 'getRowId'
    | 'onRowClick'
    | 'checkboxSelection'
> & {
    /** Grid configuration (defines columns, formatting, etc.) */
    gridConfig: GridConfigObject;

    /** Raw payload straight from the backend (any structure) */
    data: any;

    /** Handle row click event */
    onRowClick?: (row: GenericRow) => void;

    /** Show checkbox column */
    checkboxSelection?: boolean;

    /** Container height (px or CSS string). Default: 480 */
    height?: number | string;
};

export function CommonDataGrid({
    gridConfig,
    data,
    onRowClick,
    checkboxSelection = false,
    height = 480,
    ...rest
}: CommonGridProps) {
    const { rows, totalUnits, totalPremium } = useMemo(
        () => normalizeGridResponse(data, gridConfig),
        [data, gridConfig],
    );

    // Add tooltip to row data if tooltip config exists
    const rowsWithTooltips = useMemo(() => {
        if (!gridConfig.tooltip?.visible) return rows;
        return rows.map((row) => {
            const fieldValue = (row as any)[gridConfig.tooltip!.field];
            const tooltipText = fieldValue
                ? `${gridConfig.tooltip!.prefix || ''}${fieldValue}`
                : '';
            return {
                ...row,
                _tooltip: tooltipText,
            } as any;
        });
    }, [rows, gridConfig]);

    const muiColumns = useMemo(() => configToMuiColumns(gridConfig), [gridConfig]);

    // Track selected row (first row selected by default)
    const [selectedRowId, setSelectedRowId] = useState<any>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (rows.length > 0 && !selectedRowId) {
            setSelectedRowId(String((rows[0] as any)[gridConfig.rowIdField || 'id']));
        }
    }, [rows, selectedRowId, gridConfig.rowIdField]);

    // Add title attributes to rows for tooltip display (only if tooltip config exists)
    useEffect(() => {
        if (!gridRef.current) return;

        const rowElements = gridRef.current?.querySelectorAll('[data-id]');

        if (!gridConfig.tooltip?.visible) {
            // Remove all title attributes if tooltip is not configured
            rowElements?.forEach((element) => {
                element.removeAttribute('title');
            });
            return;
        }

        // Add title attributes only if tooltip is configured
        const tooltipMap = new Map<string, string>();
        rowsWithTooltips.forEach((row) => {
            const rowId = String((row as any)[gridConfig.rowIdField || 'id']);
            const tooltipText = (row as any)._tooltip;
            if (tooltipText) {
                tooltipMap.set(rowId, tooltipText);
            }
        });

        // Find all row elements and add title attributes
        rowElements?.forEach((element) => {
            const rowId = element.getAttribute('data-id');
            const title = tooltipMap.get(rowId || '');
            if (title) {
                element.setAttribute('title', title);
            } else {
                element.removeAttribute('title');
            }
        });
    }, [rowsWithTooltips, gridConfig, gridConfig.rowIdField]);

    const handleRowClick = useCallback(
        (params: GridRowParams<GenericRow>) => {
            setSelectedRowId(String((params.row as any)[gridConfig.rowIdField || 'id']));
            onRowClick?.(params.row);
        },
        [onRowClick, gridConfig.rowIdField],
    );

    return (
        <div
            ref={gridRef}
            className="w-full h-full gridWrapper p-1! border-gray-100 border-2 mb-12!"
        >
            <MuiDataGrid<GenericRow>
                rows={rowsWithTooltips}
                columns={muiColumns}
                disableRowSelectionOnClick
                checkboxSelection={checkboxSelection}
                onRowClick={handleRowClick}
                slots={{
                    toolbar: GridToolbar,
                    footer: () => (
                        <TotalsFooter totalUnits={totalUnits} totalPremium={totalPremium} />
                    ),
                }}
                initialState={{
                    pagination: { paginationModel: { pageSize: gridConfig.pageSize || 10 } },
                    sorting: gridConfig.defaultSortField
                        ? {
                              sortModel: [
                                  {
                                      field: gridConfig.defaultSortField,
                                      sort: gridConfig.defaultSortOrder || ('asc' as any),
                                  },
                              ],
                          }
                        : undefined,
                    filter: { filterModel: { items: [] } },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                sx={{
                    [`& .MuiDataGrid-row[data-id="${selectedRowId}"]`]: {
                        backgroundColor: Theme.colors.TERTIARY_CONTRAST,
                        fontWeight: 500,
                    },
                }}
                {...rest}
            />
        </div>
    );
}
