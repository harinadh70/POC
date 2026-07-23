// GAP #64 — NoteButtonOnClick, modal part (Main_ISLLSYS.vbs lines 6365-6468)
// NEW FILE — src/features/notes/note-modal.tsx
// Notes dialog for the current entity: scrollable notes list + multiline
// add-note field, Save POSTs via the EE pageData pattern with the legacy
// matchcode "dtaNOTES". Opened by handlers/common/notes.ts (OPEN_MODAL
// flow) through the exported openNoteModal(entityKey).

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// hooks
import { useShallow } from 'zustand/react/shallow';

// stores
import { SessionStoreApi } from '@stores/session-store';

// services
import { pageData } from '@services/page-data';

// ---------------------------------------------

/** Legacy note matchcode — VBS NoteButtonOnClick builds its XML payload with matchcode="dtaNOTES". */
const NOTES_MATCHCODE = 'dtaNOTES';

export interface NoteItem {
    id: string;
    text: string;
}

// ---------------------------------------------
// Local store (bespoke feature dialog — the shared ModalStore is coupled
// to the /modal resource-route cycling flow).
// ---------------------------------------------

interface NoteModalActions {
    open: (entityKey: string) => void;
    close: () => void;
    setLoading: (loading: boolean) => void;
    setSaving: (saving: boolean) => void;
    setNotes: (notes: NoteItem[]) => void;
    appendNote: (note: NoteItem) => void;
    setError: (error: string | null) => void;
}

interface NoteModalState {
    isOpen: boolean;
    /** nodeKey (or row key) of the entity whose notes are shown */
    entityKey: string;
    notes: NoteItem[];
    isLoading: boolean;
    isSaving: boolean;
    error: string | null;
    actions: NoteModalActions;
}

const useNoteModalStore = create<NoteModalState>()((set) => ({
    isOpen: false,
    entityKey: '',
    notes: [],
    isLoading: false,
    isSaving: false,
    error: null,
    actions: {
        open: (entityKey: string) => {
            set({
                isOpen: true,
                entityKey,
                notes: [],
                isLoading: true,
                isSaving: false,
                error: null,
            });
        },
        close: () => {
            set({
                isOpen: false,
                entityKey: '',
                notes: [],
                isLoading: false,
                isSaving: false,
                error: null,
            });
        },
        setLoading: (loading: boolean) => {
            set({ isLoading: loading });
        },
        setSaving: (saving: boolean) => {
            set({ isSaving: saving });
        },
        setNotes: (notes: NoteItem[]) => {
            set({ notes, isLoading: false });
        },
        appendNote: (note: NoteItem) => {
            set((state) => ({ notes: [...state.notes, note], isSaving: false }));
        },
        setError: (error: string | null) => {
            set({ error, isLoading: false, isSaving: false });
        },
    },
}));

export const NoteModalStoreApi = useNoteModalStore;

/**
 * Imperative opener — the notes handler (handlers/common/notes.ts)
 * calls this after collecting the target entity key from the grid row.
 */
export function openNoteModal(entityKey: string): void {
    NoteModalStoreApi.getState().actions.open(entityKey);
}

// ---------------------------------------------
// Server calls — EE pageData pattern (same wire shape as clientModalAction).
// ---------------------------------------------

function buildNotesEEData(entityKey: string, noteText: string, postProcessAction: string) {
    const session = SessionStoreApi.getState();
    return {
        xmlFileName: session.xmlFileName ?? '',
        controlMatchcode: NOTES_MATCHCODE,
        controlText: noteText,
        controlIndex: entityKey,
        selectedNodesXml: '',
        postProcessAction,
        dateString: '',
        comboListIndex: '',
        ruleAttribute: '',
        initialLValue: '',
        initialXValue: '',
        alternateNodeKey: entityKey.includes('|') ? entityKey : '',
        searchControl: '',
    };
}

/** Parse the notes list from results.aqs.listItems.value (string | string[]). */
function parseNotes(rawValue: string | string[] | undefined): NoteItem[] {
    if (rawValue === undefined || rawValue === '') {
        return [];
    }
    const values = Array.isArray(rawValue) ? rawValue : [rawValue];
    return values
        .filter((text) => text !== '')
        .map((text, index) => ({ id: String(index), text }));
}

async function fetchNotes(): Promise<void> {
    const { entityKey, actions } = NoteModalStoreApi.getState();
    const session = SessionStoreApi.getState();

    const result = await pageData({
        object: 'ZENTEDTCTL',
        ...session.actions.toPayload(),
        callType: 'POST',
        eeData: buildNotesEEData(entityKey, 'VIEW', '0'),
        calls: {
            type: 'post',
            call: [],
        },
    });

    if (!result.status || !result.data) {
        actions.setError(result.error ?? 'Failed to load notes.');
        return;
    }

    actions.setNotes(parseNotes(result.data.response.results.aqs.listItems?.value));
}

async function saveNote(noteText: string): Promise<boolean> {
    const { entityKey, notes, actions } = NoteModalStoreApi.getState();
    const trimmed = noteText.trim();
    if (trimmed === '') {
        return false;
    }

    actions.setSaving(true);
    actions.setError(null);

    const session = SessionStoreApi.getState();

    const result = await pageData({
        object: 'ZENTEDTCTL',
        ...session.actions.toPayload(),
        callType: 'POST',
        eeData: buildNotesEEData(entityKey, trimmed, 'add'),
        calls: {
            type: 'post',
            call: [],
        },
    });

    if (!result.status) {
        actions.setError(result.error ?? 'Failed to save the note.');
        return false;
    }

    actions.appendNote({ id: String(notes.length), text: trimmed });
    return true;
}

// ---------------------------------------------
// Component
// ---------------------------------------------

function NoteModal() {
    const { isOpen, entityKey, notes, isLoading, isSaving, error } = useNoteModalStore(
        useShallow((state) => ({
            isOpen: state.isOpen,
            entityKey: state.entityKey,
            notes: state.notes,
            isLoading: state.isLoading,
            isSaving: state.isSaving,
            error: state.error,
        })),
    );

    const [draft, setDraft] = useState('');

    // Load the entity's notes each time the dialog opens
    useEffect(() => {
        if (isOpen) {
            setDraft('');
            void fetchNotes();
        }
    }, [isOpen, entityKey]);

    const handleClose = () => {
        if (isSaving) return;
        NoteModalStoreApi.getState().actions.close();
    };

    const handleSave = async () => {
        const saved = await saveNote(draft);
        if (saved) {
            setDraft('');
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Dialog
            open={isOpen}
            maxWidth={false}
            onClose={handleClose}
            aria-labelledby="note-dialog-title"
            slotProps={{ paper: { style: { width: 600, minHeight: 450 } } }}
            data-testid="note-dialog"
        >
            <DialogTitle
                id="note-dialog-title"
                component="div"
                className="flex items-center justify-between gap-2 px-4 py-3"
            >
                <Typography variant="h6" component="span" className="grow truncate">
                    Notes
                </Typography>
                <IconButton
                    size="small"
                    onClick={handleClose}
                    aria-label="Close notes"
                    disabled={isSaving}
                >
                    <CloseRoundedIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers className="p-4! overflow-y-auto relative">
                {error && (
                    <Alert
                        severity="error"
                        onClose={() => NoteModalStoreApi.getState().actions.setError(null)}
                        className="mb-3"
                    >
                        {error}
                    </Alert>
                )}

                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[120px]">
                        <CircularProgress aria-label="Loading notes" />
                    </div>
                ) : (
                    <List
                        dense
                        className="max-h-60 overflow-y-auto mb-3!"
                        data-testid="note-list"
                    >
                        {notes.length === 0 ? (
                            <ListItem>
                                <ListItemText secondary="No notes for this record yet." />
                            </ListItem>
                        ) : (
                            notes.map((note) => (
                                <ListItem key={note.id} divider data-testid={`note-item-${note.id}`}>
                                    <ListItemText primary={note.text} />
                                </ListItem>
                            ))
                        )}
                    </List>
                )}

                <TextField
                    name="noteDraft"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="Add a note..."
                    disabled={isLoading || isSaving}
                    data-testid="note-draft-field"
                />
            </DialogContent>

            <DialogActions className="px-4! py-3!">
                <Button onClick={handleClose} disabled={isSaving} data-testid="note-close">
                    Close
                </Button>
                <Button
                    variant="contained"
                    onClick={() => void handleSave()}
                    disabled={draft.trim() === '' || isLoading || isSaving}
                    startIcon={isSaving ? <CircularProgress size={16} /> : null}
                    data-testid="note-save"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// ---------------------------------------------

export { NoteModal };
