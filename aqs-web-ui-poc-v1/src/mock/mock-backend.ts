import type {
  AqsApi,
} from '@/engine/api/client';
import type {
  BrowserCommand,
  ExecuteActionResult,
  NavigationResponse,
  PageBuildResponse,
  SessionInfo,
} from '@/types';

/**
 * Mock backend — stands in for the .NET 4.8 wrapper APIs so the POC runs with
 * no server. It returns the same JSON shapes the real PageBuild/Navigation/
 * Page-Layout APIs return, including server-driven BrowserCommands.
 *
 * Everything here is Policy (LOB 1) sample data. It lives OUTSIDE the engine —
 * the engine never imports mock data. A real backend replaces this file only.
 */

const delay = (ms = 220) => new Promise((r) => setTimeout(r, ms));

/* Policy Information — a representative dynamic/hybrid page (SDD §10.2.2). */
const policyInformation: PageBuildResponse = {
  pageId: 'policy-information',
  title: 'Policy Information',
  tabs: [
    { id: 'general', label: 'General' },
    { id: 'coverage', label: 'Coverage' },
    { id: 'named-insured', label: 'Named Insured' },
  ],
  controls: [
    { matchcode: 'POLNBR', type: 'text', label: 'Policy Number', value: 'POL-2026-004182', readOnly: true, row: 0, col: 0 },
    { matchcode: 'POLSTAT', type: 'select', label: 'Policy Status', value: 'INPROCESS', row: 0, col: 1,
      options: [
        { value: 'INPROCESS', label: 'In Process' },
        { value: 'ISSUED', label: 'Issued' },
        { value: 'CANCELLED', label: 'Cancelled' },
      ] },
    { matchcode: 'EFFDT', type: 'date', label: 'Effective Date', value: '2026-07-01', required: true, row: 1, col: 0 },
    { matchcode: 'EXPDT', type: 'date', label: 'Expiration Date', value: '2027-07-01', required: true, row: 1, col: 1 },
    { matchcode: 'INSNAME', type: 'text', label: 'Named Insured', value: 'Cedar Ridge Logistics LLC', required: true, row: 2, col: 0, maxLength: 60 },
    { matchcode: 'STATE', type: 'combo', label: 'Risk State', value: 'TX', row: 2, col: 1,
      options: [
        { value: 'TX', label: 'Texas' },
        { value: 'CA', label: 'California' },
        { value: 'NY', label: 'New York' },
        { value: 'FL', label: 'Florida' },
      ] },
    { matchcode: 'TERM', type: 'number', label: 'Term (months)', value: 12, row: 3, col: 0 },
    { matchcode: 'CANRSN', type: 'select', label: 'Cancellation Reason', value: '', visible: false, row: 3, col: 1,
      options: [
        { value: 'NONPAY', label: 'Non-payment' },
        { value: 'UWDECL', label: 'Underwriting decline' },
        { value: 'INSREQ', label: 'Insured request' },
      ] },
    { matchcode: 'REMARKS', type: 'textarea', label: 'Remarks', value: '', row: 4, col: 0, colSpan: 2 },
  ],
  actions: [
    { matchcode: 'SAVE', type: 'button', label: 'Save', action: 'SAVE', frame: 'HIDDEN' },
    { matchcode: 'ADDNI', type: 'button', label: 'Add Named Insured', action: 'ADD_NAMED_INSURED', frame: 'MODAL' },
    { matchcode: 'CANCEL', type: 'button', label: 'Cancel', action: 'CANCEL', frame: 'MAIN' },
  ],
  grids: [
    {
      listName: 'UC_COVERAGE',
      rowIdField: 'id',
      columns: [
        { field: 'coverage', header: 'Coverage', width: 220 },
        { field: 'limit', header: 'Limit', width: 140 },
        { field: 'deductible', header: 'Deductible', width: 140 },
        { field: 'premium', header: 'Premium', width: 130 },
      ],
      rows: [
        { id: 1, coverage: 'General Liability', limit: '$1,000,000', deductible: '$5,000', premium: '$4,210' },
        { id: 2, coverage: 'Auto Liability', limit: '$1,000,000', deductible: '$2,500', premium: '$6,880' },
        { id: 3, coverage: 'Cargo', limit: '$250,000', deductible: '$1,000', premium: '$1,540' },
      ],
    },
  ],
  commands: [],
};

const PAGES: Record<string, PageBuildResponse> = {
  'policy-information': policyInformation,
};

export const mockBackend: AqsApi = {
  async navigate(_session: SessionInfo, target: string): Promise<NavigationResponse> {
    await delay(120);
    return { pageId: target, frame: 'MAIN', title: PAGES[target]?.title };
  },

  async pageBuild(_session: SessionInfo, pageId: string): Promise<PageBuildResponse> {
    await delay();
    const page = PAGES[pageId];
    if (!page) {
      return {
        pageId,
        title: pageId,
        controls: [],
        commands: [{ type: 'DISPLAY_INFORMATION', message: `No PageBuild config for "${pageId}" yet.` }],
      };
    }
    return structuredClone(page);
  },

  async pageLayout(
    _session: SessionInfo,
    req: { matchcode: string; action?: string; value?: unknown; formData: Record<string, unknown> },
  ): Promise<ExecuteActionResult> {
    await delay(160);
    const commands: BrowserCommand[] = [];

    // ── Server-driven business rule (the demo "aha"): status → Cancelled
    // reveals + requires the Cancellation Reason and warns the user. This is
    // exactly the legacy onChange→server→BrowserCommands loop, in React.
    if (req.matchcode === 'POLSTAT') {
      const cancelled = req.value === 'CANCELLED';
      commands.push({ type: 'SET_VISIBLE', target: 'CANRSN', value: cancelled });
      commands.push({ type: 'SET_REQUIRED', target: 'CANRSN', value: cancelled });
      if (cancelled)
        commands.push({ type: 'DISPLAY_WARNING', message: 'Cancelling a policy requires a cancellation reason.' });
      return { outcome: 'COMMANDS_ONLY', frame: 'MAIN', commands };
    }

    if (req.action === 'SAVE') {
      commands.push({ type: 'DISPLAY_MESSAGE', message: 'Policy saved successfully.' });
      return { outcome: 'COMMANDS_ONLY', frame: 'HIDDEN', commands };
    }

    if (req.action === 'ADD_NAMED_INSURED') {
      return {
        outcome: 'STORE_MODAL_CMD',
        frame: 'MODAL',
        commands: [{ type: 'DISPLAY_INFORMATION', message: 'Named-Insured modal would open here (modal engine).' }],
      };
    }

    if (req.action === 'CANCEL') {
      return { outcome: 'CONTINUE_TO_LOADER', frame: 'MAIN', commands, navigateTo: 'dashboard' };
    }

    return { outcome: 'COMMANDS_ONLY', frame: 'MAIN', commands };
  },
};
