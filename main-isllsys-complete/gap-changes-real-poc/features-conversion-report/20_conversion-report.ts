// ============================================================================
// GAP #11: ShowConversionReport (VBS lines 975-1030)
// ============================================================================
// VBS: Opens conversion report modal — passes current policy info to server,
//      receives HTML report, displays in modal/new window
// REAL POC: No conversion report feature. Modal system exists.
// FIX: ConversionReportModal component
// WHERE TO ADD: src/features/conversion-report/conversion-report-modal.tsx
// WIRE INTO: action menu or toolbar
// ============================================================================
//
// IMPLEMENTATION NOTES
// --------------------------------------------------------------------------
// The VBS ShowConversionReport routine (lines 975-1030) does:
//   1. Checks a session flag — if the report was already shown for this
//      policy, it skips (show-once-per-session behaviour).
//   2. Builds a request with the current policy info (policyId, compLoc,
//      userId) and action = "CONVERSIONREPORT".
//   3. Calls the server, which returns an HTML report string.
//   4. Opens the HTML in a modal dialog or (optionally) a new browser window.
//   5. Sets the session flag so the report is not shown again.
//
// The Real POC equivalent:
//   - Show-once flag: stored in the session-store (Zustand), same pattern as
//     the simpler version in changes/src/features/modals/conversion-report-modal.tsx
//     but now with full HTML rendering.
//   - Server call: uses postRaw from ee-call.ts (same as grid-actions.ts and
//     batch-edits). The server returns raw HTML in the response body.
//   - HTML rendering: the server's HTML report may contain arbitrary markup
//     (tables, styles, images). We sanitise it before rendering to prevent XSS.
//     DOMPurify is the recommended library; if not available, we fall back to a
//     basic sanitisation regex (strip script tags, event handlers).
//   - Print: window.print() scoped to the modal content via an iframe approach.
//   - New window: window.open() with the sanitised HTML written to the new
//     document, matching the legacy VBS flow.
//
// DEPENDENCIES (all confirmed present or easily addable):
//   - @mui/material: Dialog, DialogTitle, DialogContent, DialogActions,
//     Button, CircularProgress, Box, IconButton
//   - @mui/icons-material: PrintOutlined, OpenInNewOutlined (optional — can
//     use text buttons instead if icons package not installed)
//   - zustand: create (for the conversion-report modal store)
//   - @/stores/session-store: SessionStoreApi (session info + show-once flag)
//   - @/services/ee-call: postRaw (send request to server)
//   - @/stores/browser-command-store: useBrowserCommandStore (error notifications)
//   - dompurify (optional): sanitise server HTML. If not installed:
//     npm install dompurify @types/dompurify
// ============================================================================

import { useState, useCallback, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    Box,
    IconButton,
    Typography,
} from '@mui/material';
import { create } from 'zustand';

import { postRaw } from '@/services/ee-call';
import { SessionStoreApi } from '@/stores/session-store';
import { useBrowserCommandStore } from '@/stores/browser-command-store';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Payload sent to the server to request the conversion report. */
interface ConversionReportRequest {
    action: 'CONVERSIONREPORT';
    userId: string;
    compLoc: string;
    policyId: string;
}

/** Server response — the report comes back as an HTML string. */
interface ConversionReportResponse {
    /** The raw HTML report content from the server. */
    reportHtml?: string;
    /** Alternative: report as plain-text lines (fallback for non-HTML endpoints). */
    lines?: string[];
    error?: string;
}

// ---------------------------------------------------------------------------
// Modal store — controls open/close state
// ---------------------------------------------------------------------------
// Same Zustand micro-store pattern as batch-edits-modal and the existing
// modal system in src/resources/modal.tsx. Keeps the modal trigger decoupled
// from the component tree.

interface ConversionReportModalState {
    isOpen: boolean;
    /** The policyId this report is for (set on open, used for the show-once check). */
    policyId: string;
    open: (policyId: string) => void;
    close: () => void;
}

export const useConversionReportModalStore = create<ConversionReportModalState>((set) => ({
    isOpen: false,
    policyId: '',
    open: (policyId) => set({ isOpen: true, policyId }),
    close: () => set({ isOpen: false, policyId: '' }),
}));

// ---------------------------------------------------------------------------
// Show-once session flag
// ---------------------------------------------------------------------------
// VBS stored a flag in the session XML detail items so the conversion report
// was only shown once per policy per session. We replicate this via the
// session-store's detail-item mechanism (same as the simpler version in
// changes/src/features/modals/conversion-report-modal.tsx).

const SHOWN_FLAG_PREFIX = 'conversionreportshown_';

/** Check whether the conversion report was already shown for this policyId. */
export function wasConversionReportShown(policyId: string): boolean {
    const get = SessionStoreApi.getState()?.actions?.getXmlDetailItem;
    // Per-policy flag: "conversionreportshown_12345" = "yes"
    return (get?.(`${SHOWN_FLAG_PREFIX}${policyId}`) ?? '') === 'yes';
}

/** Mark the conversion report as shown for this policyId so it won't reopen. */
export function markConversionReportShown(policyId: string): void {
    SessionStoreApi.getState()?.actions?.setXmlDetailItem?.(
        `${SHOWN_FLAG_PREFIX}${policyId}`,
        'yes',
    );
}

// ---------------------------------------------------------------------------
// HTML sanitisation
// ---------------------------------------------------------------------------
// The server returns raw HTML. Before rendering with dangerouslySetInnerHTML
// we MUST sanitise it to prevent XSS. DOMPurify is preferred; if not
// available at build time we fall back to a basic regex strip.
//
// INSTALL: npm install dompurify @types/dompurify
// If DOMPurify is installed, uncomment the import line below and delete the
// fallback sanitiser.

// import DOMPurify from 'dompurify';  // <-- uncomment when dompurify is installed

/** Fallback sanitiser when DOMPurify is not available.
 *  Strips <script> tags and on* event-handler attributes.
 *  NOT a substitute for DOMPurify in production — install the real package. */
function fallbackSanitise(html: string): string {
    return html
        // Remove all <script>...</script> blocks (including multi-line).
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        // Remove inline event handlers (onclick, onerror, onload, etc.).
        .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
        // Remove javascript: protocol in href/src attributes.
        .replace(/(href|src)\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi, '$1=""');
}

/** Sanitise HTML — uses DOMPurify when available, fallback otherwise. */
function sanitiseHtml(dirty: string): string {
    // When DOMPurify is installed, use: return DOMPurify.sanitize(dirty);
    // For now, use the fallback:
    return fallbackSanitise(dirty);
}

// ---------------------------------------------------------------------------
// Helper: open report in a new browser window
// ---------------------------------------------------------------------------
// VBS could open the conversion report in a separate IE window. In modern
// browsers we use window.open and write the sanitised HTML into the new
// document. This matches the legacy "pop-out" behaviour.

function openReportInNewWindow(sanitisedHtml: string, title: string): void {
    const newWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
    if (!newWindow) {
        // Pop-up blocked — caller should fall back to the modal view.
        return;
    }
    newWindow.document.open();
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>${title}</title>
            <style>
                body { font-family: Arial, Helvetica, sans-serif; padding: 20px; }
                table { border-collapse: collapse; width: 100%; }
                td, th { border: 1px solid #999; padding: 4px 8px; }
                @media print { body { padding: 0; } }
            </style>
        </head>
        <body>${sanitisedHtml}</body>
        </html>
    `);
    newWindow.document.close();
}

// ---------------------------------------------------------------------------
// Helper: print the report content
// ---------------------------------------------------------------------------
// Uses a hidden iframe to scope the print to just the report content,
// leaving the rest of the app UI out of the print preview. This is the
// standard SPA approach to printing a dialog's content.

function printReportContent(sanitisedHtml: string): void {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    iframe.style.width = '0';
    iframe.style.height = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
    if (!doc) {
        document.body.removeChild(iframe);
        return;
    }

    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, Helvetica, sans-serif; padding: 12px; }
                table { border-collapse: collapse; width: 100%; }
                td, th { border: 1px solid #999; padding: 4px 8px; }
            </style>
        </head>
        <body>${sanitisedHtml}</body>
        </html>
    `);
    doc.close();

    // Wait for content to render before printing.
    iframe.onload = () => {
        iframe.contentWindow?.print();
        // Clean up after print dialog closes.
        setTimeout(() => document.body.removeChild(iframe), 1000);
    };
}

// ---------------------------------------------------------------------------
// Component: ConversionReportModal (~30 lines of JSX)
// ---------------------------------------------------------------------------
// MUI Dialog that:
//   1. On open, calls the server endpoint to fetch the conversion report HTML.
//   2. Sanitises the HTML and renders it inside the dialog content area.
//   3. Provides "Print" and "Open in New Window" action buttons.
//   4. On close, marks the report as shown (session flag) so it won't reopen.
//
// The modal opens via useConversionReportModalStore — triggered from menu/toolbar.

export function ConversionReportModal() {
    const isOpen = useConversionReportModalStore((s) => s.isOpen);
    const policyId = useConversionReportModalStore((s) => s.policyId);
    const closeModal = useConversionReportModalStore((s) => s.close);
    const notify = useBrowserCommandStore((s) => s.notify);

    // --- Local state: fetched report HTML and loading indicator ---
    const [reportHtml, setReportHtml] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Ref to avoid double-fetching in StrictMode (React 18+/19 dev mode).
    const fetchedForPolicy = useRef<string>('');

    // --- Fetch the report from the server when the modal opens ---
    // Uses postRaw from ee-call.ts (same pattern as grid-actions and batch-edits).
    useEffect(() => {
        if (!isOpen || !policyId) return;
        if (fetchedForPolicy.current === policyId) return; // Already fetched.

        let cancelled = false;
        fetchedForPolicy.current = policyId;

        async function fetchReport() {
            setLoading(true);
            setError(null);
            try {
                const session = SessionStoreApi.getState();
                const userId = (session as Record<string, unknown>)?.userId as string ?? '';
                const compLoc = (session as Record<string, unknown>)?.compLoc as string ?? 'PIHW';

                const payload: ConversionReportRequest = {
                    action: 'CONVERSIONREPORT',
                    userId,
                    compLoc,
                    policyId,
                };

                const response = (await postRaw(payload)) as ConversionReportResponse | null;

                if (cancelled) return;

                if (response === null) {
                    setError('Conversion report service not configured.');
                    return;
                }
                if (response.error) {
                    setError(response.error);
                    return;
                }

                // The server may return HTML directly or as an array of text lines.
                // Sanitise whichever format we receive.
                const rawHtml = response.reportHtml
                    ?? response.lines?.join('<br/>') // Fallback: plain-text lines.
                    ?? '<p>No report data returned.</p>';

                setReportHtml(sanitiseHtml(rawHtml));
            } catch (err) {
                if (!cancelled) {
                    setError(`Failed to load report: ${(err as Error).message}`);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        void fetchReport();
        return () => { cancelled = true; };
    }, [isOpen, policyId]);

    // --- Handle close: mark as shown + reset state ---
    const handleClose = useCallback(() => {
        if (policyId) markConversionReportShown(policyId);
        setReportHtml('');
        setError(null);
        fetchedForPolicy.current = '';
        closeModal();
    }, [policyId, closeModal]);

    // --- Handle print: uses iframe-scoped printing ---
    const handlePrint = useCallback(() => {
        if (reportHtml) printReportContent(reportHtml);
    }, [reportHtml]);

    // --- Handle open in new window ---
    const handleOpenNewWindow = useCallback(() => {
        if (!reportHtml) return;
        openReportInNewWindow(reportHtml, 'Conversion Report');
        // Also mark as shown when popped out.
        if (policyId) markConversionReportShown(policyId);
    }, [reportHtml, policyId]);

    // --- Render ---
    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Conversion Report</DialogTitle>
            <DialogContent dividers>
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                )}
                {error && (
                    <Typography color="error" variant="body2">{error}</Typography>
                )}
                {!loading && !error && reportHtml && (
                    <Box
                        sx={{ '& table': { width: '100%', borderCollapse: 'collapse' },
                              '& td, & th': { border: '1px solid', borderColor: 'divider', p: 0.5 },
                              fontSize: '0.875rem' }}
                        dangerouslySetInnerHTML={{ __html: reportHtml }}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOpenNewWindow} disabled={loading || !reportHtml}>
                    Open in New Window
                </Button>
                <Button onClick={handlePrint} disabled={loading || !reportHtml}>
                    Print
                </Button>
                <Button onClick={handleClose} variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// ---------------------------------------------------------------------------
// Handler: openConversionReportModal
// ---------------------------------------------------------------------------
// Call this from the action menu, toolbar, or wherever the conversion report
// should be triggered. Includes the show-once check — if the report was
// already shown for this policy, the modal will not reopen.
//
// WIRE INTO existing code (1 line each):
//
//   action-menu or toolbar:
//     <MenuItem onClick={() => openConversionReportModal(currentPolicyId)}>
//       Conversion Report
//     </MenuItem>
//
//   App.tsx or layout — mount the modal once at the app level:
//     <ConversionReportModal />
//
// The handler checks the show-once flag before opening. To force-show
// (bypass show-once), pass forceShow = true.

export function openConversionReportModal(policyId: string, forceShow = false): void {
    if (!policyId) {
        useBrowserCommandStore.getState().notify('warning', 'No policy selected.');
        return;
    }

    // Show-once guard: skip if already shown for this policy this session.
    if (!forceShow && wasConversionReportShown(policyId)) {
        return; // Silently skip — matches VBS behaviour.
    }

    useConversionReportModalStore.getState().open(policyId);
}

// ---------------------------------------------------------------------------
// Exports — both named and default (project convention from CHANGES-README)
// ---------------------------------------------------------------------------

export { ConversionReportModal as default };
