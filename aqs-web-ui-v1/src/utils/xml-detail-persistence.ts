import { getItem, setItem, removeItem } from './local-storage';

const STORAGE_KEY = 'aqs:pendingXmlDetail';
const TTL_MS = 5000;

interface NavigationXmlDetail {
    xmlDetail: string;
    targetUrl: string;
    timestamp: number;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const isNavigationXmlDetail = (value: unknown): value is NavigationXmlDetail => {
    if (!isRecord(value)) {
        return false;
    }

    return (
        typeof value.xmlDetail === 'string' &&
        typeof value.targetUrl === 'string' &&
        typeof value.timestamp === 'number' &&
        Number.isFinite(value.timestamp)
    );
};

const normalizeUrl = (value: string): string | null => {
    const baseOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';

    try {
        const url = new URL(value, baseOrigin);
        return `${url.pathname}${url.search}`;
    } catch {
        return null;
    }
};

export const clearPendingXmlDetail = (): void => {
    try {
        removeItem(STORAGE_KEY);
    } catch {
        // Graceful degradation when storage is blocked/unavailable.
    }
};

export const setPendingXmlDetail = (xmlDetail: string, targetUrl: string): void => {
    try {
        const payload: NavigationXmlDetail = {
            xmlDetail,
            targetUrl,
            timestamp: Date.now(),
        };

        setItem(STORAGE_KEY, payload);
    } catch {
        // Graceful degradation when storage is blocked/unavailable.
    }
};

export const getPendingXmlDetail = (currentUrl: string): string | null => {
    try {
        const rawPayload = getItem<NavigationXmlDetail>(STORAGE_KEY);
        if (!rawPayload) {
            return null;
        }

        if (!isNavigationXmlDetail(rawPayload)) {
            clearPendingXmlDetail();
            return null;
        }

        const now = Date.now();
        if (now - rawPayload.timestamp > TTL_MS) {
            clearPendingXmlDetail();
            return null;
        }

        const pendingTarget = normalizeUrl(rawPayload.targetUrl);
        const currentTarget = normalizeUrl(currentUrl);

        if (!pendingTarget || !currentTarget) {
            clearPendingXmlDetail();
            return null;
        }

        if (pendingTarget !== currentTarget) {
            return null;
        }

        return rawPayload.xmlDetail;
    } catch {
        clearPendingXmlDetail();
        return null;
    }
};
