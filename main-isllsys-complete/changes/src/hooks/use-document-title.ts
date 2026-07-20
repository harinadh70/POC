import { useEffect } from 'react';

import { SessionStoreApi } from '@/stores/session-store';

// VBS: Main_ISLLSYS #17 SetFrameTitle (lines 992-1029)
// document.title = windowtitle + policy number + insured name.
// windowtitle comes from the Navigation API (the TMNAS.Advantage.API
// WindowTitle enhancement) into session xmlDetail; fallback is the default.

const DEFAULT_TITLE = 'AQS Advantage';

export function useDocumentTitle(): void {
    const xmlDetail = SessionStoreApi((s) => s.xmlDetail);
    const policyNumber = SessionStoreApi((s) => s.policyNumber);
    const primaryInsured = SessionStoreApi((s) => s.primaryInsured);

    useEffect(() => {
        const item = xmlDetail?.items?.find(
            (i: { name: string; value: string }) =>
                i.name.toLowerCase() === 'windowtitle',
        );
        const base = item?.value || DEFAULT_TITLE;

        const parts = [base, policyNumber, primaryInsured].filter(
            (p) => p && p !== '0',
        );
        document.title = parts.join(' - ');
    }, [xmlDetail, policyNumber, primaryInsured]);
}

export default useDocumentTitle;
