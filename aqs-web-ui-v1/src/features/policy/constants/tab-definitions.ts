export interface PolicyTab {
    id: string;
    label: string;
    matchcode: string;
    accessletter: string;
}

export const POLICY_TABS: PolicyTab[] = [
    { id: 'TABPOL', label: 'Policy', matchcode: 'TABPOL', accessletter: 'P' },
    { id: 'TABDET', label: 'Policy Detail', matchcode: 'TABDET', accessletter: 'D' },
    { id: 'TABBIL', label: 'Billing/Misc', matchcode: 'TABBIL', accessletter: 'B' },
    { id: 'TABINS', label: 'Insured Detail', matchcode: 'TABINS', accessletter: 'I' },
    { id: 'TABAGT', label: 'Agent Detail', matchcode: 'TABAGT', accessletter: 'A' },
];

export const DEFAULT_ACTIVE_TAB = 'TABPOL';
