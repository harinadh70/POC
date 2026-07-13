import { data } from 'react-router';

import { navigationContext } from '@/context';
import { fetchPageBuild, type PageBuildResponse } from '@services/page-build';
import { fetchLobActionMenu } from '@services/lob-action-menu';
import { getItem } from '@utils/local-storage';
import { readContextFromStorage } from '@utils/session-sync';

import type { LoaderFunctionArgs } from 'react-router';
import type { SessionInfo } from '@features/auth/services/auth';

interface PageBuildXmlItem {
    '@name': string;
    '@value': string;
}

interface PageBuildXmlDetail {
    items: {
        item: PageBuildXmlItem[];
    };
}

function getRawActionFromQueryString(queryString: string | undefined): string | undefined {
    if (!queryString) {
        return undefined;
    }

    const queryStart = queryString.indexOf('?');
    const queryPart = queryStart >= 0 ? queryString.slice(queryStart + 1) : queryString;
    const params = new URLSearchParams(queryPart);

    const action = params.get('Action') ?? params.get('action');
    if (!action || action.trim() === '') {
        return undefined;
    }

    return action;
}

function toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {
    if (!source) {
        return undefined;
    }

    if (typeof source === 'object' && source !== null) {
        const record = source as { items?: { item?: unknown } };
        const items = record.items?.item;
        if (Array.isArray(items)) {
            return {
                items: {
                    item: items
                        .filter((item) => typeof item === 'object' && item !== null)
                        .map((item) => {
                            const row = item as Record<string, unknown>;
                            return {
                                '@name': String(row['@name'] ?? ''),
                                '@value': String(row['@value'] ?? ''),
                            };
                        }),
                },
            };
        }
    }

    if (typeof source !== 'string') {
        return undefined;
    }

    const value = source.trim();
    if (!value) {
        return undefined;
    }

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(value, 'text/xml');
        if (doc.querySelector('parsererror')) {
            return undefined;
        }
        // TODO ⟪missing lines 79-end — not captured in photos: rest of toPageBuildXmlDetail (XML-to-PageBuildXmlDetail conversion, catch block, closing braces) and the route loader function itself (default export using LoaderFunctionArgs, SessionInfo, fetchPageBuild, fetchLobActionMenu, getItem, readContextFromStorage, navigationContext, data, PageBuildResponse — none of which appear in captured lines 1-78)⟫
