// components/PolicyLobGrid.tsx

import * as React from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridRowParams,
  type DataGridProps,
} from "@mui/x-data-grid";

import type { GridResponse } from "../types/grid-response";
import { normalizeGridResponse, type LobRow } from "../lib/grid-normalize";

type Currency = string;

const formatCurrency = (value: number, currency: Currency = "USD") =>
  value.toLocaleString(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

type SortDirection = 'asc' | 'desc';

const buildDefaultColumns = (currency: Currency): GridColDef<LobRow>[] => [
  {
    field: "lob",
    headerName: "LOB",
    minWidth: 100,
  },
  {
    field: "name",
    headerName: "Line of Business",
    flex: 1,
    minWidth: 220,
  },
  {
    field: "units",
    headerName: "Units",
    type: "number",
    minWidth: 110,
    valueFormatter: ({ value }) => (Number.isFinite(value) ? value.toLocaleString() : "0"),
  },
  {
    field: "premium",
    headerName: "Premium",
    type: "number",
    minWidth: 140,
    valueFormatter: ({ value }) => formatCurrency(Number(value ?? 0), currency),
  },
  {
    field: "exists",
    headerName: "Exists",
    type: "boolean",
    minWidth: 100,
  },
  {
    field: "converted",
    headerName: "Converted",
    type: "boolean",
    minWidth: 120,
  },
  {
    field: "sequencer",
    headerName: "Seq",
    type: "number",
    minWidth: 90,
    sortable: true,
  },
  {
    field: "nodekey",
    headerName: "Node Key",
    flex: 1,
    minWidth: 260,
  },
];

/** DataGrid Toolbar */
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

/** Footer with totals from Page */
function TotalsFooter({
  totalUnits,
  totalPremium,
  currency,
}: {
  totalUnits: number;
  totalPremium: number;
  currency: Currency;
}) {
  return (
    <Box sx={{ p: 1.5, display: "flex", justifyContent: "flex-end", gap: 3, fontWeight: 500 }}>
      <Box>Units: {totalUnits.toLocaleString()}</Box>
      <Box>Premium: {formatCurrency(totalPremium, currency)}</Box>
    </Box>
  );
}

export type PolicyLobGridProps = Omit<
  DataGridProps<LobRow>,
  "rows"
  | "columns"
  | "loading"
  | "slots"
  | "slotProps"
  | "getRowId"
  | "onRowClick"
  | "checkboxSelection"
> & {
  /** Raw payload straight from the backend */
  data: GridResponse;

  /** Show a checkbox column */
  checkboxSelection?: boolean;

  /** Currency code for premium formatting. Default: "USD" */
  currency?: Currency;

  /** Initial page size. Default: 10 */
  pageSize?: number;

  /** Replace/extend default columns */
  columns?: GridColDef<LobRow>[];

  /** Override row click handler */
  onRowClick?: (row: LobRow) => void;

  /** Container height (px or CSS string). Default: 480 */
  height?: number | string;
};

export function PolicyLobGrid({
  data,
  checkboxSelection = false,
  currency = "USD",
  pageSize = 10,
  columns,
  onRowClick,
  height = 480,
  ...rest
}: PolicyLobGridProps) {
  const { rows, totalUnits, totalPremium } = React.useMemo(() => normalizeGridResponse(data), [data]);
  const resolvedColumns = React.useMemo(
    () => columns ?? buildDefaultColumns(currency),
    [columns, currency]
  );

  const handleRowClick = React.useCallback(
    (params: GridRowParams<LobRow>) => {
      onRowClick?.(params.row);
    },
    [onRowClick]
  );

  return (
    <Box sx={{ height, width: "100%" }}>
      <DataGrid<LobRow>
        rows={rows}
        columns={resolvedColumns}
        disableRowSelectionOnClick
        checkboxSelection={checkboxSelection}
        onRowClick={handleRowClick}
        slots={{
          toolbar: GridToolbar,
          footer: () => (
            <TotalsFooter totalUnits={totalUnits} totalPremium={totalPremium} currency={currency} />
          ),
        }}
        initialState={{
          pagination: { paginationModel: { pageSize } },
          sorting: { sortModel: [{ field: "sequencer", sort: "asc" }] },
          filter: { filterModel: { items: [] } },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        {...rest}
      />
    </Box>
  );
}

export default PolicyLobGrid;
