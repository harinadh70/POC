export interface UltimateCoverTab {
    id: string;
    label: string;
    matchcode: string;
    accessletter: string;
}

export const ULTIMATE_COVER_TABS: UltimateCoverTab[] = [
    { id: 'TABPOLICY', label: 'Policy', matchcode: 'TABPOLICY', accessletter: 'P' },
    { id: 'TABDET', label: 'Details', matchcode: 'TABDET', accessletter: 'D' },
];

export const DEFAULT_ACTIVE_TAB = 'TABPOLICY';
