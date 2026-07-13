import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { GridList } from '@/types';

/**
 * DataGridRenderer — the React home for legacy XmlList.htc / IMDBXmlList.htc
 * (SDD §7.2 → MUI DataGrid). Any server list becomes a sortable grid from its
 * normalized column config — no per-list component.
 */
export function DataGridRenderer({ list }: { list: GridList }) {
  const columns: GridColDef[] = list.columns.map((c) => ({
    field: c.field,
    headerName: c.header,
    width: c.width ?? 160,
    sortable: true,
  }));

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
        {list.listName}
      </Typography>
      <DataGrid
        rows={list.rows}
        columns={columns}
        getRowId={(r) => (r as Record<string, unknown>)[list.rowIdField] as string | number}
        density="compact"
        hideFooterSelectedRowCount
        pageSizeOptions={[5, 10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        sx={{ bgcolor: 'background.paper' }}
      />
    </Box>
  );
}
