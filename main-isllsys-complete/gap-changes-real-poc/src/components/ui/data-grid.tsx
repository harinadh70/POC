// ---------------------------------------------
// MODIFIED — GAP #67: XMLListonItemSelected (VBS 6594-6605) + GAPS #66/#68 toolbar mount
// Original: aqs-web-ui-actual/src/components/ui/data-grid.tsx
// Target:   src/components/ui/data-grid.tsx
// Row click now also stages mstrSelectedKey (multi-select stages
// mstrSelectedNodes) for grid-toolbar's EEData build; GridToolbar mounts
// above the grid when a `buttons` prop is passed (GridNode declares none).
// Changes marked >>> GAP #NN ... <<< GAP #NN.
// ---------------------------------------------

import { useMemo } from 'react';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { useFormContext } from 'react-hook-form';

// store
import { useGridRows } from '@stores/grid-store';
import { SessionStoreApi } from '@stores/session-store';

// context
import { useFormRendererContext } from '@components/ui/form-renderer-context';
import { useHandlers } from '@/contexts/handlers-context';

// >>> GAP #66/#68: ListButtonClick — list-button toolbar
import { GridToolbar } from '@components/ui/grid-toolbar';
// <<< GAP #66/#68

// utils
import { executeFormActionBindings } from '@utils/form-action-executor';

// types
import type { GridNode } from '@types/layout';
// >>> GAP #66/#67/#68: toolbar + selection-staging types
import type { GridRowSelectionModel } from '@mui/x-data-grid';
import type { GridListButtonConfig } from '@components/ui/grid-toolbar';
// <<< GAP #66/#67/#68

// ---------------------------------------
// Grid renderer backed by GridStoreApi rows for this node matchcode.
// ---------------------------------------

interface DataGridProps {
	node: GridNode;
	// >>> GAP #66/#68: GridNode declares no list-button property (types/layout.ts),
	// so the toolbar mounts when the page renderer passes a `buttons` prop.
	buttons?: Record<string, GridListButtonConfig>;
	// <<< GAP #66/#68
}

function DataGrid({ node, buttons }: DataGridProps) {
	const rows = useGridRows()[node.matchcode] ?? [];
	const navigate = useNavigate();
	const formRendererCtx = useFormRendererContext();
	const handlers = useHandlers();
	const { getValues, setValue, trigger, handleSubmit, reset } =
		useFormContext<Record<string, unknown>>();

	const columns = useMemo(
		() =>
			node.columns.map((column) => ({
				field: column.field,
				headerName: column.headerName,
				width: column.width ?? 150,
				sortable: column.sortable ?? true,
				filterable: column.filterable ?? true,
			})),
		[node.columns],
	);

	// >>> GAP #66/#68: toolbar renders only when list buttons are passed
	const hasToolbar = buttons !== undefined && Object.keys(buttons).length > 0;
	// <<< GAP #66/#68

	const handleRowClick = async (rowId: string | number, rowData: Record<string, unknown>) => {
		// Stamp mstrSelectedRow so server subs can read the selected record context
		SessionStoreApi.getState().actions.setXmlDetailItem(
			'mstrSelectedRow',
			JSON.stringify(rowData),
		);

		// >>> GAP #67: XMLListonItemSelected (VBS 6594-6605) — stage the selected
		// key alongside mstrSelectedRow so grid-toolbar can build EEData[3]/[4]
		SessionStoreApi.getState().actions.setXmlDetailItem('mstrSelectedKey', String(rowId));
		// <<< GAP #67

		const onClickBindings = node.field.schemaEvents?.onClick ?? [];
		if (onClickBindings.length > 0) {
			await executeFormActionBindings(onClickBindings, {
				getValues,
				setValue,
				trigger,
				handleSubmit,
				reset,
				navigate,
				routerContext: formRendererCtx.routerContext,
				control: node.field,
				xmlFileName: formRendererCtx.xmlFileName,
				fieldState: { lValue: String(rowId), xValue: String(rowId) },
				handlers,
			});
		}
	};

	// >>> GAP #67: multi-row selection staging for the toolbar NEXT-loop.
	// Stamped via the same setXmlDetailItem mechanism as mstrSelectedRow.
	const handleRowSelectionModelChange = (model: GridRowSelectionModel) => {
		const selectedKeys =
			model.type === 'exclude'
				? rows.filter((row) => !model.ids.has(row.id)).map((row) => String(row.id))
				: Array.from(model.ids).map((id) => String(id));
		SessionStoreApi.getState().actions.setXmlDetailItem(
			'mstrSelectedNodes',
			JSON.stringify(selectedKeys),
		);
	};
	// <<< GAP #67

	return (
		<>
			{/* >>> GAP #66/#68: mount the list-button toolbar above the grid */}
			{hasToolbar && <GridToolbar matchcode={node.matchcode} buttons={buttons} />}
			{/* <<< GAP #66/#68 */}
			<MuiDataGrid
				rows={rows}
				columns={columns}
				onRowClick={(params) => {
					void handleRowClick(params.id, params.row as Record<string, unknown>);
				}}
				// >>> GAP #67: selection staging (checkboxes only when toolbar present)
				checkboxSelection={hasToolbar}
				onRowSelectionModelChange={handleRowSelectionModelChange}
				// <<< GAP #67
			/>
		</>
	);
}

export { DataGrid };
