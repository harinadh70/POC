import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

import { postEECall } from '@/services/ee-call';

// VBS: Main_ISLLSYS #64 NoteButtonOnClick (lines 6365-6468)
// Notes/attachments for an entity (policy/vehicle/etc.). STUB LEVEL:
// list + add wired through ee-call; refine columns/attachments once the
// NOTES calltype response shape is confirmed on the client branch.

export interface NoteItem {
    id: string;
    text: string;
    author?: string;
    date?: string;
}

interface NotesModalProps {
    open: boolean;
    entityKey: string; // legacy: row-ids / nodeKey the notes belong to
    notes: NoteItem[];
    onClose: () => void;
    onNotesChanged?: () => void;
}

function NotesModal({ open, entityKey, notes, onClose, onNotesChanged }: NotesModalProps) {
    const [draft, setDraft] = useState('');

    const handleAdd = async () => {
        if (!draft.trim()) return;
        await postEECall({
            matchcode: 'dtaNOTES',
            value: draft.trim(),
            callType: 'NOTES_ADD',
            context: { entityKey },
        });
        setDraft('');
        onNotesChanged?.();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Notes</DialogTitle>
            <DialogContent dividers>
                <List dense>
                    {notes.map((n) => (
                        <ListItem key={n.id} disableGutters>
                            <ListItemText
                                primary={n.text}
                                secondary={[n.author, n.date].filter(Boolean).join(' — ')}
                            />
                        </ListItem>
                    ))}
                </List>
                <TextField
                    fullWidth
                    size="small"
                    multiline
                    minRows={2}
                    placeholder="Add a note..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button variant="contained" onClick={() => void handleAdd()} disabled={!draft.trim()}>
                    Add Note
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export { NotesModal };
export default NotesModal;
