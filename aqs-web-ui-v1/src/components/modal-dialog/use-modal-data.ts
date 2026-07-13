import { useMemo } from 'react';

import type { NormalizedField } from '@/types';
import { createFeatureLogger } from '@utils/logger-builder';
import { normalizeServiceConfig } from '@utils/normalize-service-config';
import {
    transformPageBuildResponse,
    type ModalPageMetadata,
    type PageBuildButton,
} from '@utils/transform-pagebuild-response';

const logger = createFeatureLogger('modal', 'ModalData');

export interface SessionXmlItem {
    name: string;
    value: string;
}

const parseSessionXmlItems = (sessionXml: unknown): SessionXmlItem[] => {
    if (typeof sessionXml !== 'string' || !sessionXml.trim()) {
        return [];
    }

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(sessionXml, 'application/xml');
        const parseError = doc.querySelector('parsererror');

        if (parseError) {
            logger.warn('SessionXml parse error detected; returning empty items', {
                error: parseError.textContent,
            });
            return [];
        }

        const items = Array.from(doc.querySelectorAll('item'));
        return items
            .map((item) => ({
                name: item.getAttribute('name')?.trim() ?? '',
                value: item.getAttribute('value')?.trim() ?? '',
            }))
            .filter((item) => item.name !== '');
    } catch (error) {
        logger.error('Failed to parse SessionXml; returning empty items', error as Error);
        return [];
    }
};

const extractSessionXmlItems = (xmlDetail: unknown): SessionXmlItem[] => {
    if (!xmlDetail || typeof xmlDetail !== 'object') {
        return [];
    }

    const pageBuild = xmlDetail as {
        Session?: {
            SessionXml?: unknown;
        };
    };

    return parseSessionXmlItems(pageBuild.Session?.SessionXml);
};

export interface ModalDataResult {
    fields: NormalizedField[];
    buttons: PageBuildButton[];
    metadata: ModalPageMetadata;
    fieldOrder: string[];
    utpOrder: string[];
    sessionXml: SessionXmlItem[];
    defaultValues: Record<string, string | boolean>;
    error: string | null;
}

const EMPTY_RESULT: ModalDataResult = {
    fields: [],
    buttons: [],
    metadata: {},
    fieldOrder: [],
    utpOrder: [],
    sessionXml: [],
    defaultValues: {},
    error: null,
};

export function useModalData(xmlDetail: unknown): ModalDataResult {
    return useMemo(() => {
        if (!xmlDetail) {
            return {
                ...EMPTY_RESULT,
                error: 'Modal xmlDetail not provided',
            };
        }

        const transformed = transformPageBuildResponse(xmlDetail);
        const sessionXml = extractSessionXmlItems(xmlDetail);
        const fields = normalizeServiceConfig(transformed.serviceFields);

        if (fields.length === 0) {
            return {
                ...EMPTY_RESULT,
                metadata: transformed.metadata,
                buttons: transformed.buttons,
                error: 'Modal configuration is invalid: no renderable form fields found.',
            };
        }

        const defaultValues = fields.reduce<Record<string, string | boolean>>((acc, field) => {
            acc[field.matchcode] =
                field.defaultValue !== undefined
                    ? field.defaultValue
                    : field.controlType === 'checkbox'
                        ? false
                        : '';
            return acc;
        }, {});

        return {
            fields,
            buttons: transformed.buttons,
            metadata: transformed.metadata,
            fieldOrder: transformed.fieldOrder,
            utpOrder: transformed.utpOrder,
            sessionXml,
            defaultValues: {
                ...defaultValues,
                ...transformed.defaultValues,
            },
            error: null,
        };
    }, [xmlDetail]);
}
