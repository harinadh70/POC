// GAP #11 — ShowConversionReport (Main_ISLLSYS.vbs lines 975-1030)
// NEW FILE — src/features/conversion-report/conversion-report-modal.tsx
// Conversion-report dialog: on open POSTs the current policy context,
// receives the report HTML, renders it sanitized. Print (hidden iframe)
// + Close. Shown once per policy via a session-store xmlDetail item;
// openConversionReportModal({ force: true }) bypasses the flag.

import { useEffect } from 'react';
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
    Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

// hooks
import { useShallow } from 'zustand/react/shallow';

// stores
import { SessionStoreApi } from '@stores/session-store';

// services
import { pageData } from '@services/page-data';

// ---------------------------------------------
// Show-once-per-policy flag — kept as a session-store xmlDetail item so it
// travels with the session payload exactly like other transient flags.
// ---------------------------------------------

const SHOWN_FLAG_ITEM = 'conversionreportshown';

function wasShownForCurrentPolicy(): boolean {
    const session = SessionStoreApi.getState();
    return session.actions.getXmlDetailItem(SHOWN_FLAG_ITEM) === session.policyId;
}

function markShownForCurrentPolicy(): void {
    const session = SessionStoreApi.getState();
    session.actions.setXmlDetailItem(SHOWN_FLAG_ITEM, session.policyId);
}

// ---------------------------------------------
// Local store (bespoke feature dialog — the shared ModalStore is coupled
// to the /modal resource-route cycling flow).
// ---------------------------------------------

interface ConversionReportActions {
    open: () => void;
    close: () => void;
    setLoading: (loading: boolean) => void;
    setReportHtml: (html: string) => void;
    setError: (error: string | null) => void;
}

interface ConversionReportState {
    isOpen: boolean;
    isLoading: boolean;
    /** Sanitized report HTML — empty until the fetch resolves */
    reportHtml: string;
    error: string | null;
    actions: ConversionReportActions;
}

const useConversionReportStore = create<ConversionReportState>()((set) => ({
    isOpen: false,
    isLoading: false,
    reportHtml: '',
    error: null,
    actions: {
        open: () => {
            set({ isOpen: true, isLoading: true, reportHtml: '', error: null });
        },
        close: () => {
            set({ isOpen: false, isLoading: false, reportHtml: '', error: null });
        },
        setLoading: (loading: boolean) => {
            set({ isLoading: loading });
        },
        setReportHtml: (html: string) => {
            set({ reportHtml: html, isLoading: false });
        },
        setError: (error: string | null) => {
            set({ error, isLoading: false });
        },
    },
}));

export const ConversionReportStoreApi = useConversionReportStore;

/**
 * Imperative opener — call from the action menu after a conversion.
 * Respects the once-per-policy flag unless { force: true }.
 */
export function openConversionReportModal(opts?: { force?: boolean }): void {
    if (!opts?.force && wasShownForCurrentPolicy()) {
        if (import.meta.env.DEV) {
            console.debug('[ConversionReport] Already shown for this policy — skipping.');
        }
        return;
    }
    markShownForCurrentPolicy();
    ConversionReportStoreApi.getState().actions.open();
}

// ---------------------------------------------
// Sanitizer — basic tag/attribute strip for the server-produced report.
// NOTE: DOMPurify is the production choice; this inline helper only covers
// the report HTML the legacy server emits (tables + inline styles).
// ---------------------------------------------

function sanitizeReportHtml(rawHtml: string): string {
    return (
        rawHtml
            // strip active content blocks entirely
            .replace(/<(script|iframe|object|embed|style)\b[\s\S]*?<\/\1>/gi, '')
            .replace(/<(script|iframe|object|embed)\b[^>]*\/?>/gi, '')
            // strip inline event handlers (onclick=, onload=, ...)
            .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
            .replace(/\son\w+\s*=\s*'[^']*'/gi, '')
            // neutralize javascript: URLs
            .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1=$2#$2')
    );
}

// ---------------------------------------------
// Fetch — POST current policy info, server returns the report HTML
// (results.aqs.listItems.value — string or string[] of fragments).
// ---------------------------------------------

async function fetchConversionReport(): Promise<void> {
    const { actions } = ConversionReportStoreApi.getState();
    const session = SessionStoreApi.getState();

    const result = await pageData({
        object: 'ZENTEDTCTL',
        ...session.actions.toPayload(),
        action: 'CONVERSIONREPORT', // legacy ShowConversionReport action
        callType: 'POST',
        eeData: {
            xmlFileName: session.xmlFileName ?? '',
            controlMatchcode: 'dtaCONVRPT',
            controlText: session.policyNumber ?? '',
            controlIndex: session.policyId,
            selectedNodesXml: '',
            postProcessAction: '1',
            dateString: '',
            comboListIndex: '',
            ruleAttribute: '',
            initialLValue: '',
            initialXValue: '',
            alternateNodeKey: '',
            searchControl: '',
        },
        calls: {
            type: 'post',
            call: [],
        },
    });

    if (!result.status || !result.data) {
        actions.setError(result.error ?? 'Failed to load the conversion report.');
        return;
    }

    const listItems = result.data.response.results.aqs.listItems;
    const rawValue = listItems?.value ?? '';
    const rawHtml = Array.isArray(rawValue) ? rawValue.join('') : rawValue;

    if (!rawHtml) {
        actions.setError('The server returned an empty conversion report.');
        return;
    }

    actions.setReportHtml(sanitizeReportHtml(rawHtml));
}

// ---------------------------------------------
// Print — hidden-iframe print of the (already sanitized) report content.
// ---------------------------------------------

function printReport(reportHtml: string): void {
    if (!reportHtml) return;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
        document.body.removeChild(iframe);
        return;
    }

    doc.open();
    doc.write(`<html><head><title>Conversion Report</title></head><body>${reportHtml}</body></html>`);
    doc.close();

    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();

    // Give the print dialog time to snapshot the frame before removal
    window.setTimeout(() => {
        document.body.removeChild(iframe);
    }, 1000);
}

// ---------------------------------------------
// Component
// ---------------------------------------------

function ConversionReportModal() {
    const { isOpen, isLoading, reportHtml, error } = useConversionReportStore(
        useShallow((state) => ({
            isOpen: state.isOpen,
            isLoading: state.isLoading,
            reportHtml: state.reportHtml,
            error: state.error,
        })),
    );

    // Fire the report fetch once per open
    useEffect(() => {
        if (isOpen) {
            void fetchConversionReport();
        }
    }, [isOpen]);

    const handleClose = () => {
        ConversionReportStoreApi.getState().actions.close();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Dialog
            open={isOpen}
            maxWidth={false}
            onClose={handleClose}
            aria-labelledby="conversion-report-dialog-title"
            slotProps={{ paper: { style: { width: 700, minHeight: 500 } } }}
            data-testid="conversion-report-dialog"
        >
            <DialogTitle
                id="conversion-report-dialog-title"
                component="div"
                className="flex items-center justify-between gap-2 px-4 py-3"
            >
                <Typography variant="h6" component="span" className="grow truncate">
                    Conversion Report
                </Typography>
                <IconButton size="small" onClick={handleClose} aria-label="Close conversion report">
                    <CloseRoundedIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers className="p-4! overflow-y-auto relative">
                {isLoading && (
                    <div className="flex items-center justify-center min-h-[120px]">
                        <CircularProgress aria-label="Loading conversion report" />
                    </div>
                )}

                {error && <Alert severity="error">{error}</Alert>}

                {!isLoading && !error && reportHtml && (
                    <div
                        data-testid="conversion-report-content"
                        // Sanitized above — see sanitizeReportHtml (DOMPurify in production)
                        dangerouslySetInnerHTML={{ __html: reportHtml }}
                    />
                )}
            </DialogContent>

            <DialogActions className="px-4! py-3!">
                <Button
                    startIcon={<PrintOutlinedIcon />}
                    onClick={() => printReport(reportHtml)}
                    disabled={isLoading || !reportHtml}
                    data-testid="conversion-report-print"
                >
                    Print
                </Button>
                <Button variant="contained" onClick={handleClose} data-testid="conversion-report-close">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// ---------------------------------------------

export { ConversionReportModal };
