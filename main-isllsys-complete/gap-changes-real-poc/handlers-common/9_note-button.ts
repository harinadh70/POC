// ============================================================================
// GAP #64: NoteButtonOnClick (VBS lines 6365-6468)
// ============================================================================
//
// VBS FLOW:
//   1. User clicks the Note/Attachment button on a form or grid row
//   2. VBS collects the entity context:
//      - If on a grid: collects ALL selected row IDs from the list control
//        via mstrSelectedRow and the xmllist SelectedNodes
//      - If on a form: uses the current nodeKey / entity identifier
//   3. Builds an XML payload with the note context:
//      matchcode = "dtaNOTES" (hardcoded note control matchcode)
//      lValue = "NOTES" (action)
//      xValue = entity key (nodeKey or selected row key)
//      data3 = serialized selected node keys (pipe-delimited or XML)
//   4. Posts to server via xmlServerCall
//   5. Server returns note content + browser commands
//   6. VBS opens a modal window to display the notes
//   7. Modal allows viewing existing notes and adding new ones
//   8. On modal close, refreshes the parent form/grid if notes changed
//
// REAL POC ALREADY HAS:
//   - grid-store: rows keyed by matchcode (GridRow: { id, [key]: unknown })
//   - SessionStoreApi: stamps mstrSelectedRow, carries current nodeKey
//   - executeFormActionBindings: main action executor for server calls
//   - handlerForBrowserCommands: dispatches commands from server response
//   - Modal infrastructure: clientModalLoader/clientModalAction with
//     useFetcher pattern, ModalStoreApi for open/close
//   - HandlersContext: handler registration via import.meta.glob
//
// WHAT THIS CODE ADDS:
//   - handleNoteButtonClick: collects row IDs from grid-store, builds
//     the note payload, calls the server
//   - NoteModal: MUI Dialog shell that renders note content from server
//     response, supports viewing existing notes and adding new ones
//   - Handler registration: exports as a named handler for the handler
//     chain (auto-discovered via import.meta.glob)
//
// WHERE TO ADD:
//   Handler:  src/handlers/common/notes.ts
//   Modal:    src/features/notes/note-modal.tsx
// ============================================================================

import React, { useState, useCallback, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
    CircularProgress,
    Box,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

// ---------------------------------------------------------------------------
// Store imports
// ---------------------------------------------------------------------------
import { SessionStoreApi } from '@/stores/session-store';
import { GridStoreApi } from '@/stores/grid-store';
import type { GridRow } from '@/stores/grid-store';

// ---------------------------------------------------------------------------
// Service imports — EEData building + server call
// ---------------------------------------------------------------------------
import { handlerForButtonOnClick } from '@/handlers/common/payload';
import { handlerForBrowserCommands } from '@/handlers/common/command';
import type { CommandHandlers } from '@/handlers/common/command';
import { baseQuery } from '@/utils/http-instance';

// ---------------------------------------------------------------------------
// Handler type — matches the HandlerFunction signature from the Real POC's
// handler registration system (src/types/handler.ts)
// ---------------------------------------------------------------------------
import type { HandlerFunction, HandlerSchema } from '@/types/handler';


// ============================================================================
// Types
// ============================================================================

/** A single note item returned from the server. */
export interface NoteItem {
    /** Server-assigned note ID. */
    id: string;
    /** Note text content. */
    text: string;
    /** Author name or user ID. */
    author?: string;
    /** Date string (server format, typically MM/DD/YYYY). */
    date?: string;
    /** Note type/category if applicable. */
    type?: string;
}

/** Props for the NoteModal component. */
export interface NoteModalProps {
    /** Whether the modal is open. */
    open: boolean;
    /** The entity key the notes belong to (nodeKey or row key). */
    entityKey: string;
    /** Display label for the entity (e.g., "Vehicle - 2024 Toyota"). */
    entityLabel?: string;
    /** Pre-loaded notes from server response. */
    notes: NoteItem[];
    /** Whether notes are currently loading. */
    isLoading?: boolean;
    /** Close handler. */
    onClose: () => void;
    /** Called when notes change (add/delete) so parent can refresh. */
    onNotesChanged?: () => void;
    /** XML file name for server call context. */
    xmlFileName?: string;
}

/** Result of the note server call. */
interface NoteServerResponse {
    notes?: NoteItem[];
    commands?: unknown[];
}


// ============================================================================
// handleNoteButtonClick — core handler function
// ============================================================================

/**
 * Handle the Note/Attachment button click.
 *
 * Collects selected row IDs from grid-store (if on a grid) or the current
 * nodeKey from session-store (if on a form), builds the note payload, and
 * calls the server.
 *
 * VBS: NoteButtonOnClick (lines 6365-6468)
 *   - Collected row IDs via mstrSelectedRow + SelectedNodes
 *   - Built XML payload with matchcode="dtaNOTES", action="NOTES"
 *   - Posted to server, opened modal with response
 *
 * @param gridMatchcode  If clicking from a grid toolbar, the grid's matchcode.
 *                       Pass undefined if clicking from a form-level button.
 * @param opts           Additional context for the server call
 * @returns              Server response with notes and commands, or null on error
 */
export async function handleNoteButtonClick(
    gridMatchcode?: string,
    opts: {
        xmlFileName?: string;
        commandHandlers?: CommandHandlers;
        runCommands?: (commands: unknown[]) => void | Promise<void>;
    } = {},
): Promise<NoteServerResponse | null> {
    const session = SessionStoreApi.getState();

    // -----------------------------------------------------------------------
    // 1. Collect entity key(s) for the note context
    //
    // VBS: If on a grid, collected ALL selected row IDs. If on a form,
    // used the current nodeKey.
    //
    // Real POC: Grid rows are in grid-store keyed by matchcode.
    // mstrSelectedRow in session-store has the currently selected row key.
    // -----------------------------------------------------------------------
    let entityKey: string;
    let selectedNodeKeys: string = '';

    if (gridMatchcode) {
        // Grid context: collect the selected row key from session
        entityKey = session?.mstrSelectedRow ?? '';

        // Also collect all row IDs from the grid for multi-note contexts
        // VBS built a pipe-delimited or XML list of selected node keys
        const gridState = GridStoreApi.getState();
        const gridRows = gridState?.rows?.[gridMatchcode] ?? [];
        if (gridRows.length > 0) {
            // Build pipe-delimited list of row IDs (VBS format)
            selectedNodeKeys = gridRows
                .map((row: GridRow) => String(row.id ?? ''))
                .filter(Boolean)
                .join('|');
        }

        // If no specific row selected, fall back to first row
        if (!entityKey && gridRows.length > 0) {
            entityKey = String(gridRows[0]?.id ?? '');
        }
    } else {
        // Form context: use the current nodeKey from session
        entityKey = session?.nodeKey ?? session?.mstrSelectedRow ?? '';
    }

    if (!entityKey) {
        console.warn('[notes] No entity key available for notes — nothing selected.');
        return null;
    }

    // -----------------------------------------------------------------------
    // 2. Stamp session variables
    //    VBS: Set mstrCurrentButton = "dtaNOTES"
    // -----------------------------------------------------------------------
    session?.actions?.setSession?.({
        key: 'mstrCurrentButton',
        value: 'dtaNOTES',
    });

    // -----------------------------------------------------------------------
    // 3. Build EEData for the note server call
    //
    // VBS EEData shape for notes:
    //   matchcode = "dtaNOTES"
    //   lValue = "NOTES" (action identifier)
    //   xValue = entityKey (nodeKey or selected row key)
    //   data3 = selectedNodeKeys (pipe-delimited list)
    //   postProcessAction = "1"
    //
    // Real POC: handlerForButtonOnClick builds EEData for button actions.
    // We use it with the note-specific values.
    // -----------------------------------------------------------------------
    const eeData = handlerForButtonOnClick(
        'dtaNOTES',                   // matchcode
        opts.xmlFileName ?? '',       // xmlFileName
        entityKey,                    // relatedValue (goes into xValue)
    );

    // Override specific fields for note context
    // (handlerForButtonOnClick sets lValue = matchcode; we need "NOTES")
    const noteEEData = {
        ...eeData,
        controlMatchcode: 'dtaNOTES',
        controlText: 'NOTES',         // lValue = action
        controlIndex: entityKey,       // xValue = entity key
        data3: selectedNodeKeys,       // data3 = all selected keys
    };

    // -----------------------------------------------------------------------
    // 4. POST to server
    // -----------------------------------------------------------------------
    const payload = {
        object: 'ZENTEDTCTL',
        ...(session?.toPayload?.() ?? {}),
        eeData: noteEEData,
        callType: 'POST',
    };

    let response: unknown;
    try {
        response = await baseQuery({
            method: 'POST',
            url: '/ui/page/data',
            data: payload,
        });
    } catch (error) {
        console.error('[notes] Server call failed:', error);
        return null;
    }

    // -----------------------------------------------------------------------
    // 5. Parse the server response
    //    VBS: Extracted notes from the response, then opened a modal
    //    Real POC: Response follows the standard aqs response shape
    // -----------------------------------------------------------------------
    const responseData = response as {
        results?: {
            aqs?: {
                browserCtl?: { call?: unknown[] };
                noteData?: NoteItem[];
            };
        };
    } | null;

    const commands = responseData?.results?.aqs?.browserCtl?.call;
    const notes = responseData?.results?.aqs?.noteData ?? [];

    // Process any browser commands (e.g., OPEN_MODAL, SET_TEXT)
    if (Array.isArray(commands) && commands.length > 0) {
        if (opts.runCommands) {
            await opts.runCommands(commands);
        } else if (opts.commandHandlers) {
            handlerForBrowserCommands(commands as any[], opts.commandHandlers);
        }
    }

    return { notes, commands: commands as unknown[] | undefined };
}


// ============================================================================
// Handler registration export
// ============================================================================

/**
 * Named handler for the handler chain.
 *
 * The Real POC discovers handlers via import.meta.glob('/src/handlers/common/*.ts').
 * Each handler module exports a `handlers` record matching HandlerModuleSchema.
 *
 * To register this handler, place this file at src/handlers/common/notes.ts.
 * It will be auto-discovered and available as 'onNoteButtonClick' in the
 * merged handler map.
 *
 * In the form schema or button bindings, reference it as:
 *   { type: 'custom', name: 'onNoteButtonClick' }
 */
export const noteButtonHandler: HandlerFunction = async (schema: HandlerSchema) => {
    const gridMatchcode = schema.args?.gridMatchcode as string | undefined;
    const xmlFileName = schema.context?.xmlFilePath ?? '';

    await handleNoteButtonClick(gridMatchcode, { xmlFileName });
};

/** Handler module export — auto-discovered by import.meta.glob. */
export const handlers: Record<string, HandlerFunction> = {
    onNoteButtonClick: noteButtonHandler,
};


// ============================================================================
// NoteModal component
// ============================================================================

/**
 * MUI Dialog shell for viewing and adding notes.
 *
 * VBS: Opened a COM modal window with a rich text control showing notes.
 * The modal allowed viewing existing notes and adding new ones. On add,
 * it posted to the server and refreshed the notes list.
 *
 * Real POC: Uses MUI Dialog, matching the existing modal patterns.
 * The content is driven by the server response (NoteItem[]).
 *
 * Usage (in a page or layout component):
 *
 *   const [noteModalState, setNoteModalState] = useState({
 *       open: false, entityKey: '', notes: [] as NoteItem[],
 *   });
 *
 *   // After handleNoteButtonClick returns:
 *   const result = await handleNoteButtonClick(gridMatchcode, opts);
 *   if (result) {
 *       setNoteModalState({
 *           open: true,
 *           entityKey,
 *           notes: result.notes ?? [],
 *       });
 *   }
 *
 *   <NoteModal
 *       open={noteModalState.open}
 *       entityKey={noteModalState.entityKey}
 *       notes={noteModalState.notes}
 *       onClose={() => setNoteModalState(prev => ({ ...prev, open: false }))}
 *       onNotesChanged={() => void refetchNotes()}
 *   />
 */
export function NoteModal({
    open,
    entityKey,
    entityLabel,
    notes,
    isLoading = false,
    onClose,
    onNotesChanged,
    xmlFileName,
}: NoteModalProps) {
    const [draft, setDraft] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset draft when modal opens/closes
    useEffect(() => {
        if (!open) setDraft('');
    }, [open]);

    // -----------------------------------------------------------------------
    // Add a new note
    //
    // VBS: Posted to server with action="NOTES_ADD", refreshed notes list.
    // Real POC: Uses the same server call pattern as handleNoteButtonClick
    // but with the NOTES_ADD action.
    // -----------------------------------------------------------------------
    const handleAdd = useCallback(async () => {
        if (!draft.trim()) return;
        setIsSubmitting(true);

        try {
            const session = SessionStoreApi.getState();
            const eeData = {
                controlMatchcode: 'dtaNOTES',
                controlText: draft.trim(),      // lValue = note text
                controlIndex: entityKey,         // xValue = entity key
                data3: 'ADD',                    // data3 = add action
                postProcessAction: '1',
            };

            await baseQuery({
                method: 'POST',
                url: '/ui/page/data',
                data: {
                    object: 'ZENTEDTCTL',
                    ...(session?.toPayload?.() ?? {}),
                    eeData,
                    callType: 'POST',
                },
            });

            setDraft('');
            onNotesChanged?.();
        } catch (error) {
            console.error('[notes] Failed to add note:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [draft, entityKey, onNotesChanged]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            aria-labelledby="note-modal-title"
        >
            <DialogTitle id="note-modal-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <NoteAddIcon />
                    <span>Notes{entityLabel ? ` - ${entityLabel}` : ''}</span>
                </Box>
                <IconButton size="small" onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                {/* Loading state */}
                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                        <CircularProgress size={32} />
                    </Box>
                )}

                {/* Notes list */}
                {!isLoading && notes.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                        No notes yet.
                    </Typography>
                )}

                {!isLoading && notes.length > 0 && (
                    <List dense sx={{ maxHeight: 300, overflow: 'auto', mb: 2 }}>
                        {notes.map((note, index) => (
                            <React.Fragment key={note.id}>
                                {index > 0 && <Divider component="li" />}
                                <ListItem disableGutters sx={{ alignItems: 'flex-start' }}>
                                    <ListItemText
                                        primary={note.text}
                                        secondary={
                                            [note.author, note.date]
                                                .filter(Boolean)
                                                .join(' — ') || undefined
                                        }
                                        primaryTypographyProps={{ variant: 'body2' }}
                                        secondaryTypographyProps={{ variant: 'caption' }}
                                    />
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
                )}

                {/* Add new note */}
                <Divider sx={{ my: 1 }} />
                <TextField
                    fullWidth
                    size="small"
                    multiline
                    minRows={2}
                    maxRows={4}
                    placeholder="Add a note..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    disabled={isSubmitting}
                    sx={{ mt: 1 }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={isSubmitting}>
                    Close
                </Button>
                <Button
                    variant="contained"
                    onClick={() => void handleAdd()}
                    disabled={!draft.trim() || isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
                >
                    {isSubmitting ? 'Adding...' : 'Add Note'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}


// ============================================================================
// INTEGRATION GUIDE
// ============================================================================
//
// === 1. Handler registration (auto-discovered) ===
//
// Place the handler export at: src/handlers/common/notes.ts
// The import.meta.glob pattern in file-resolver.ts will auto-discover it.
// It will be available in the merged handler map as 'onNoteButtonClick'.
//
// === 2. Schema binding (for XML-driven pages) ===
//
// In the page schema or button definition, bind the note button:
//   {
//       matchcode: 'btnNotes',
//       controlType: 'button',
//       schemaEvents: {
//           onClick: [
//               { type: 'custom', name: 'onNoteButtonClick' }
//           ]
//       }
//   }
//
// === 3. Grid toolbar integration ===
//
// To add a Notes button to the grid toolbar (from 7_grid-actions.ts):
//   - Add a 'NOTES' action to the GridToolbar buttons
//   - In handleAction, dispatch to handleNoteButtonClick instead of
//     handleListAction when action === 'NOTES'
//
// === 4. Manual wiring (for static/custom pages) ===
//
// In a page component:
//   import { handleNoteButtonClick, NoteModal } from '@/features/notes/note-modal';
//
//   const [noteState, setNoteState] = useState({ open: false, notes: [] });
//
//   const onNoteClick = async () => {
//       const result = await handleNoteButtonClick('lstVehicles', { xmlFileName });
//       if (result?.notes) {
//           setNoteState({ open: true, notes: result.notes });
//       }
//   };
//
//   <Button onClick={() => void onNoteClick()}>Notes</Button>
//   <NoteModal
//       open={noteState.open}
//       entityKey={currentNodeKey}
//       notes={noteState.notes}
//       onClose={() => setNoteState(prev => ({ ...prev, open: false }))}
//   />
//
// ============================================================================

export default NoteModal;
