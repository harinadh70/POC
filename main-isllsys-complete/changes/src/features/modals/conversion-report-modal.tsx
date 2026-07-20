import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

import { SessionStoreApi } from '@/stores/session-store';

// VBS: Main_ISLLSYS #11 ShowConversionReport (lines 762-789)
// Conversion summary popup with legacy SHOW-ONCE behavior: once dismissed,
// a session flag prevents it reopening for this policy.

const SHOWN_FLAG = 'conversionreportshown';

/** True when the report was already shown this session (legacy show-once). */
export function wasConversionReportShown(): boolean {
    const get = SessionStoreApi.getState()?.actions?.getXmlDetailItem;
    return (get?.(SHOWN_FLAG) ?? '') === 'yes';
}

export function markConversionReportShown(): void {
    SessionStoreApi.getState()?.actions?.setXmlDetailItem?.(SHOWN_FLAG, 'yes');
}

interface ConversionReportModalProps {
    open: boolean;
    /** Report lines from the server response. */
    lines: string[];
    onClose: () => void;
}

function ConversionReportModal({ open, lines, onClose }: ConversionReportModalProps) {
    const handleClose = () => {
        markConversionReportShown();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Conversion Report</DialogTitle>
            <DialogContent dividers>
                {lines.map((line, i) => (
                    <Typography key={`${i}-${line.slice(0, 12)}`} variant="body2" sx={{ mb: 0.5 }}>
                        {line}
                    </Typography>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export { ConversionReportModal };
export default ConversionReportModal;
