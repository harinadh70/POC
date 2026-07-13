// Snippet: add to src/components/data-grid/data-grid-config-registry.ts
// One entry per list on the converted page. Key = list name returned by the
// server (grid lookup key), columns.field = normalized row field names.
//
// Shape confirmed from existing entries (UC_BUILDING_CLASSIFICATION, LOB_SUMMARY).

// ============================================================
// <PAGE NAME> GRID  (e.g. UW BUILDING CLASSIFICATION)
// ============================================================
export const PAGE_GRID_SNIPPET = {
  MY_PAGE_LIST_NAME: {
    dataPath: 'row',
    columns: [
      {
        field: 'classification', // TODO: normalized field name from listData
        label: 'Classification',
        width: 350,
        type: 'string',
        align: 'left',
        sortable: true,
        filterable: false,
      },
      {
        field: 'premium',
        label: 'Premium',
        width: 300,
        type: 'number',
        align: 'right',
        sortable: false,
        filterable: false,
        // money formatting, as in LOB_SUMMARY:
        valueFormatter: (value: unknown) =>
          Number.isFinite(Number(value))
            ? '$' +
              Number(value ?? 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : String(value ?? ''),
      },
    ],
    pageSize: 25,
    defaultSortField: 'sequencer',
    defaultSortOrder: 'asc',
    footer: {
      visible: true, // only if the legacy page shows totals
      totalFields: ['premium'],
    },
    rowIdField: 'sequencer',
  },
} as const;
