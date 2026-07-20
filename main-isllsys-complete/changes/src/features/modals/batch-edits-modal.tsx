import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// VBS: Main_ISLLSYS #10 ShowBatchEdits (lines 718-758)
// Open the batch-edits popup when the server reports pending batch edits
// (or skip entirely when there are none — the caller decides via `rows`).

export interface BatchEditRow {
    id: string;
    description: string;
    status?: string;
}

interface BatchEditsModalProps {
    open: boolean;
    rows: BatchEditRow[];
    onClose: () => void;
}

function BatchEditsModal({ open, rows, onClose }: BatchEditsModalProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Batch Edits</DialogTitle>
            <DialogContent dividers>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.status ?? ''}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export { BatchEditsModal };
export default BatchEditsModal;
