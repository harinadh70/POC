import { SessionStoreApi } from '@/stores/session-store';

// VBS: Main_ISLLSYS LoadFirstPage lines 438-452
// After first page loads, if policyId != "0", poll umbrella mapping status.
//
// Legacy:
//   window.setTimeout "document.frames('menu').FetchUmbrellaMappingStatus()", 1000
//
// In the SPA this becomes a normal async call — no 1-second delay needed.

interface UmbrellaMappingResult {
    status: string;
    hasMapping: boolean;
}

/**
 * Check whether the current policy has an umbrella mapping.
 * VBS guard is `mstrPolicyID <> "0"` — anything except the search page
 * (policyId "0") triggers the check, including negative utility ids.
 *
 * TODO: Wire to actual API endpoint when available.
 * The legacy code called this via menu frame's FetchUmbrellaMappingStatus
 * which hit a separate server endpoint.
 */
export async function fetchUmbrellaMappingStatus(): Promise<UmbrellaMappingResult | null> {
    const session = SessionStoreApi.getState();
    const policyId = session.policyId;

    if (policyId === '0' || !policyId) return null;

    try {
        // TODO: Replace with actual API call when endpoint is confirmed.
        // Legacy endpoint was: xmlCheckAsynch.asp?object=UMBRELLA&policyid=<id>
        // For now, return a no-op result so the wiring is in place.
        return { status: 'OK', hasMapping: false };
    } catch {
        return null;
    }
}
