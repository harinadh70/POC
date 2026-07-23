// ---------------------------------------------
// GAPS #66 + #68 — ListButtonClick + ListButtonOnClick (VBS 6553-6590, 6609-6708)
// NEW FILE — target: src/components/ui/grid-toolbar.tsx
// List-button toolbar for XMLLIST grids: confirms DELETE, stamps
// mstrCurrentButton + selected row, builds EEData via
// handlerForListButtonOnClick, POSTs via the pageData service, dispatches
// returned browser commands, and NEXT-loops the remaining selected rows.
// ---------------------------------------------

import { useMemo, useState } from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Tooltip,
} from '@mui/material';

// icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// store
import { GridStoreApi } from '@stores/grid-store';
import { SessionStoreApi } from '@stores/session-store';
import { ModalStoreApi } from '@stores/modal-store';

// context
import { useFormRendererContext } from '@components/ui/form-renderer-context';

// hooks
import { useCommandHandlers } from '@hooks/use-command-handlers';

// services
import { pageData } from '@services/page-data';

// handlers
import { handlerForListButtonOnClick } from '@handlers/common/payload';
import { handlerForBrowserCommands } from '@handlers/common/command';

// types
import type { ReactNode } from 'react';
import type { BrowserCommand, EEData } from '@/types/common';
import type { GridRow } from '@stores/grid-store';
import type { PageDataPayload } from '@services/page-data';
import type { CommandHandlers } from '@handlers/common/command';

// ---------------------------------------
// List-button toolbar (Add/Edit/Delete/Refresh) for a grid matchcode.
// Mirrors legacy ListButtonClick / ListButtonOnClickHandler.
// ---------------------------------------

export interface GridListButtonConfig {
	/** Control matchcode posted as EEData controlMatchcode (e.g. "cmdADD") */
	matchcode: string;
	/** Toolbar tooltip / aria label */
	label: string;
	/** EDIT/DELETE require a staged row before posting */
	requiresSelection: boolean;
}

/**
 * Default list buttons — keyed by action string the way DEFAULT_ACTION_BUTTONS
 * in constants/common.ts is keyed. Pages may pass a trimmed/extended record.
 */
export const DEFAULT_LIST_BUTTONS: Record<string, GridListButtonConfig> = {
	ADD: { matchcode: 'cmdADD', label: 'Add', requiresSelection: false },
	EDIT: { matchcode: 'cmdEDIT', label: 'Edit', requiresSelection: true },
	DELETE: { matchcode: 'cmdDELETE', label: 'Delete', requiresSelection: true },
	REFRESH: { matchcode: 'cmdREFRESH', label: 'Refresh', requiresSelection: false },
};

const ICON_MAP: Record<string, ReactNode> = {
	ADD: <AddIcon fontSize="small" />,
	EDIT: <EditIcon fontSize="small" />,
	DELETE: <DeleteIcon fontSize="small" />,
	REFRESH: <RefreshIcon fontSize="small" />,
};

/**
 * Maps internal EEData (matchcode/lValue/xValue/data3) to the pageData wire
 * shape — same field mapping as normalizeEEData in resources/modal.tsx.
 */
function toWireEEData(eeData: EEData): PageDataPayload['eeData'] {
	return {
		xmlFileName: eeData.xmlFileName,
		controlMatchcode: eeData.matchcode,
		controlText: eeData.lValue,
		controlIndex: eeData.xValue,
		selectedNodesXml: eeData.data3,
		postProcessAction: eeData.postProcessAction,
		dateString: eeData.dateString,
		comboListIndex: eeData.comboListIndex,
		ruleAttribute: eeData.ruleAttribute,
		initialLValue: eeData.initialLValue,
		initialXValue: eeData.initialXValue,
		alternateNodeKey: eeData.alternateNodeKey,
		searchControl: eeData.searchControl,
	};
}

/** EEData[4] payload — minimal selected-nodes XML for multi-row actions */
function buildSelectedNodesXml(rows: GridRow[]): string {
	if (rows.length === 0) {
		return '';
	}
	const nodes = rows.map((row) => `<node key="${String(row.id)}"/>`).join('');
	return `<selectednodes>${nodes}</selectednodes>`;
}

interface GridToolbarProps {
	/** Matchcode of the grid this toolbar drives (GridStoreApi rows key) */
	matchcode: string;
	/** List buttons keyed by action — defaults to DEFAULT_LIST_BUTTONS */
	buttons?: Record<string, GridListButtonConfig>;
}

function GridToolbar({ matchcode, buttons }: GridToolbarProps) {
	const formRendererCtx = useFormRendererContext();
	const baseCommandHandlers = useCommandHandlers();
	const [isBusy, setIsBusy] = useState(false);
	const [confirmAction, setConfirmAction] = useState<string | null>(null);

	const toolbarButtons = buttons ?? DEFAULT_LIST_BUTTONS;

	// Frame-level handlers plus grid-scoped verbs, so LOAD_GRID / CLEAR_GRID
	// from the response repopulate this grid and DISPLAY_* surface inline.
	const commandHandlers = useMemo<CommandHandlers>(
		() => ({
			...baseCommandHandlers,
			onLoadGrid: (gridMatchcode, gridRows) => {
				GridStoreApi.getState().actions.setRows(gridMatchcode, gridRows);
			},
			onClearGrid: (gridMatchcode) => {
				GridStoreApi.getState().actions.clearRows(gridMatchcode);
			},
			onDisplayMessage: (message, type) => {
				const variant = type === 'error' ? 'error' : type === 'info' ? 'info' : 'warning';
				ModalStoreApi.getState().actions.setVariant(variant, message);
			},
		}),
		[baseCommandHandlers],
	);

	/** Selected rows staged by data-grid (mstrSelectedNodes / mstrSelectedKey). */
	const resolveSelectedRows = (): GridRow[] => {
		const rows = GridStoreApi.getState().rows[matchcode] ?? [];
		const sessionActions = SessionStoreApi.getState().actions;

		const selectedNodes = sessionActions.getXmlDetailItem('mstrSelectedNodes');
		if (selectedNodes) {
			try {
				const keys = JSON.parse(selectedNodes) as (string | number)[];
				const byId = new Map(rows.map((row) => [String(row.id), row]));
				const selected = keys
					.map((key) => byId.get(String(key)))
					.filter((row): row is GridRow => row !== undefined);
				if (selected.length > 0) {
					return selected;
				}
			} catch {
				// fall through to the single-row staging below
			}
		}

		const selectedKey = sessionActions.getXmlDetailItem('mstrSelectedKey');
		if (selectedKey) {
			const row = rows.find((gridRow) => String(gridRow.id) === selectedKey);
			if (row) {
				return [row];
			}
		}

		return [];
	};

	/**
	 * One EE post for one (optional) row — mirrors ListButtonOnClickHandler.
	 * Returns loop-control info consumed by the NEXT-loop in runListAction.
	 */
	const postListButton = async (
		action: string,
		config: GridListButtonConfig,
		row: GridRow | undefined,
		selectedRows: GridRow[],
		rowCount: number,
	): Promise<{ halted: boolean; serverAction: string }> => {
		// Stamp the row exactly the way data-grid's row click stamps it (GAP #67)
		if (row) {
			SessionStoreApi.getState().actions.setXmlDetailItem(
				'mstrSelectedRow',
				JSON.stringify(row),
			);
			SessionStoreApi.getState().actions.setXmlDetailItem('mstrSelectedKey', String(row.id));
		}

		const eeData: EEData = handlerForListButtonOnClick(
			config.matchcode,
			action,
			formRendererCtx.xmlFileName,
			{
				selectedKey: row ? String(row.id) : '',
				selectedNodesXml: buildSelectedNodesXml(selectedRows),
				rowCount,
				emptyListNodeKey: formRendererCtx.routerContext.nodeKey,
			},
		);

		// Read session AFTER stamping so xmlDetail carries the staged row
		const session = SessionStoreApi.getState();
		const result = await pageData({
			object: 'ZENTEDTCTL',
			compLoc: session.compLoc,
			userId: session.userId,
			policyId: session.policyId,
			nodeKey: formRendererCtx.routerContext.nodeKey,
			action: formRendererCtx.routerContext.action,
			diagnosticMode: '0',
			xmlFile: formRendererCtx.xmlFileName,
			callType: 'POST',
			xmlDetail: session.xmlDetail,
			eeData: toWireEEData(eeData),
			calls: {
				type: 'post',
				call: [],
			},
		});

		if (!result.status || !result.data) {
			ModalStoreApi.getState().actions.setVariant(
				'error',
				result.error ?? `List button ${config.matchcode} call failed`,
			);
			return { halted: true, serverAction: '' };
		}

		const aqs = result.data.response.results.aqs;

		// Session round-trip — response.results.aqs.sessionInformation.value[0..6]
		SessionStoreApi.getState().actions.updateSessionFromArray(aqs.sessionInformation.value);

		const commands = (aqs.browserCtl?.call ?? []) as BrowserCommand[];
		const halted = commands.some((cmd) => {
			const verb = cmd.verb.toUpperCase();
			return verb === 'STOP' || verb === 'DISPLAY_ERROR' || verb === 'BUSINESS_ERROR';
		});

		// STOP is NEXT-loop control only — never dispatched to the command engine
		handlerForBrowserCommands(
			commands.filter((cmd) => cmd.verb.toUpperCase() !== 'STOP'),
			commandHandlers,
		);

		const serverAction = (
			aqs.eeData.postProcessAction ?? aqs.eeData.controlText ?? ''
		).toUpperCase();

		return { halted, serverAction };
	};

	/** Full ListButtonClick flow: stamp button -> post -> NEXT-loop rows. */
	const runListAction = async (action: string, config: GridListButtonConfig): Promise<void> => {
		const rowCount = (GridStoreApi.getState().rows[matchcode] ?? []).length;
		const selectedRows = resolveSelectedRows();

		if (config.requiresSelection && selectedRows.length === 0) {
			ModalStoreApi.getState().actions.setVariant(
				'warning',
				`Select a row before using ${config.label}.`,
			);
			return;
		}

		// Stamp the originating button — mirrors executeServerEE / legacy mstrCurrentButton
		SessionStoreApi.getState().actions.setXmlDetailItem(
			'mstrCurrentButton',
			config.matchcode.toUpperCase(),
		);

		setIsBusy(true);
		try {
			// DELETE (and any NEXT-driven action) walks selected rows sequentially;
			// selection-free actions (ADD/REFRESH) post once with no staged row.
			const queue: (GridRow | undefined)[] =
				selectedRows.length > 0 ? selectedRows : [undefined];

			for (let index = 0; index < queue.length; index++) {
				const { halted, serverAction } = await postListButton(
					action,
					config,
					queue[index],
					selectedRows,
					rowCount,
				);
				if (halted) {
					break;
				}

				// NEXT-loop (VBS 6553-6590): keep posting only while the server
				// answers NEXT and more selected rows remain.
				const hasMoreRows = index < queue.length - 1;
				if (serverAction !== 'NEXT' || !hasMoreRows) {
					break;
				}
			}
		} finally {
			setIsBusy(false);
		}
	};

	const handleButtonClick = (action: string, config: GridListButtonConfig) => {
		// DELETE always confirms before posting (mirrors legacy ListButtonClick)
		if (action.toUpperCase() === 'DELETE') {
			setConfirmAction(action);
			return;
		}
		void runListAction(action, config);
	};

	const handleConfirmDelete = () => {
		const action = confirmAction;
		setConfirmAction(null);
		if (action) {
			const config = toolbarButtons[action];
			if (config) {
				void runListAction(action, config);
			}
		}
	};

	const handleCancelDelete = () => {
		setConfirmAction(null);
	};

	return (
		<Box
			role="toolbar"
			aria-label={`${matchcode} list actions`}
			className="flex items-center justify-end gap-2"
		>
			{Object.entries(toolbarButtons).map(([action, config]) => (
				<Tooltip key={config.matchcode} title={config.label}>
					<span>
						<IconButton
							size="small"
							color="primary"
							aria-label={config.label}
							disabled={isBusy}
							onClick={() => {
								handleButtonClick(action, config);
							}}
						>
							{ICON_MAP[action.toUpperCase()] ?? <PlayArrowIcon fontSize="small" />}
						</IconButton>
					</span>
				</Tooltip>
			))}

			<Dialog open={confirmAction !== null} onClose={handleCancelDelete}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete the selected row(s)?
					</DialogContentText>
				</DialogContent>
				<DialogActions className="flex items-center justify-end gap-2 p-4">
					<Button variant="contained" color="primary" onClick={handleConfirmDelete}>
						Ok
					</Button>
					<Button variant="outlined" color="inherit" onClick={handleCancelDelete}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export { GridToolbar };
