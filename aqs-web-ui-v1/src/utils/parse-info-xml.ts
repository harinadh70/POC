/**
 * Utility: Parse info-dialog XML payloads into normalized table-friendly structures.
 *
 * This parser is intentionally generic and safe:
 * - It supports known legacy roots (`effdaterates`, `taxinfo`)
 * - It falls back to a generic key/value structure for unknown payloads
 * - It never throws to callers; parse errors are returned as typed state
 */

export interface InfoTableColumn {
    key: string;
    header: string;
    align?: 'left' | 'right' | 'center';
    width?: string;
}

export interface InfoTableSection {
    id: string;
    title?: string;
    columns: InfoTableColumn[];
    rows: Array<Record<string, string>>;
}

export interface ParsedInfoXml {
    root: string;
    title?: string;
    sections: InfoTableSection[];
    isKnownStructure: boolean;
    error?: string;
    rawXml: string;
}

interface NormalizedInfoXmlPayload {
    xml: string;
    isRecovered: boolean;
}

/**
 * Helper: Safely read an attribute and normalize null/undefined to empty string.
 */
const readAttr = (element: Element, name: string): string => {
    const value = element.getAttribute(name);
    return value === null || value === undefined ? '' : value;
};

const hasXmlLikeTag = (value: string): boolean => /<[a-zA-Z_][\w:.-]*[\s>/]/.test(value);

const decodeHtmlEntities = (value: string): string => {
    if (!value || !value.includes('&')) {
        return value;
    }

    return value
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/&amp;/gi, '&');
};

const sanitizeInvalidAmpersands = (value: string): string => {
    if (!value || !value.includes('&')) {
        return value;
    }

    return value.replace(/&(?!(?:#\d+|#x[0-9a-fA-F]+|[a-zA-Z][\w.-]*);)/g, '&amp;');
};

const parseXmlDocument = (xml: string): Document | null => {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        const parseError = doc.querySelector('parsererror');
        return parseError ? null : doc;
    } catch {
        return null;
    }
};

const normalizeXmlCandidate = (input: string): string => {
    const trimmed = input.trim();
    if (!trimmed) {
        return '';
    }

    const startIndex = trimmed.search(/<(effdaterates|taxinfo|item|exception|header)\b/i);
    if (startIndex > 0) {
        return trimmed.slice(startIndex);
    }
    if (startIndex > 0) {
    if (startIndex === -1 && /^[\w:-]+\s*=\s*['"]/i.test(trimmed)) {
        return `<item ${trimmed}`;
    }
    if (startIndex === -1 && /^[\w:-]+\s*=\s*['"]/i.test(trimmed)) {
    return trimmed;
};

const tryNormalizeInfoXmlPayload = (rawPayload: string): NormalizedInfoXmlPayload | null => {
    const original = (rawPayload || '').trim();
    if (!original) {
        return null;
    }

    const decoded = decodeHtmlEntities(original).trim();
    const sanitizedOriginal = sanitizeInvalidAmpersands(original);
    const sanitizedDecoded = sanitizeInvalidAmpersands(decoded);
    const directCandidates = [original, decoded, sanitizedOriginal, sanitizedDecoded].filter(
        (value) => hasXmlLikeTag(value),
    );

    for (const candidate of directCandidates) {
        if (parseXmlDocument(candidate)) {
            return {
                xml: candidate,
                isRecovered: candidate !== original,
            };
        }
    }

    const normalized = normalizeXmlCandidate(decoded);
    if (!normalized || !hasXmlLikeTag(normalized)) {
        return null;
    }

    const normalizedSanitized = sanitizeInvalidAmpersands(normalized);
    if (normalizedSanitized !== normalized && parseXmlDocument(normalizedSanitized)) {
        return {
            xml: normalizedSanitized,
            isRecovered: true,
        };
    }

    const wrapped = `<info-recovered>${normalized}</info-recovered>`;
    if (parseXmlDocument(wrapped)) {
        return {
            xml: wrapped,
            isRecovered: true,
        };
    }

    const wrappedSanitized = `<info-recovered>${normalizedSanitized}</info-recovered>`;
    if (parseXmlDocument(wrappedSanitized)) {
        return {
            xml: wrappedSanitized,
            isRecovered: true,
        };
    }

    return null;
};

const hasDirectChild = (element: Element, selector: string): boolean => {
    return Array.from(element.children).some((child) => child.matches(selector));
};

const looksLikeEffDateRates = (rootElement: Element): boolean => {
    const itemElements = Array.from(rootElement.querySelectorAll(':scope > item'));
    return itemElements.length > 0 && itemElements.some((item) => item.hasAttribute('date'));
};

const looksLikeTaxInfo = (rootElement: Element): boolean => {
    const hasCityItems = Array.from(rootElement.querySelectorAll(':scope > item')).some(
        (item) => item.hasAttribute('city') || item.hasAttribute('citycode'),
    );
    const hasExceptions = hasDirectChild(rootElement, 'exception');
    return hasCityItems || hasExceptions;
};

/**
 * Helper: Build a resilient generic table from arbitrary XML attributes.
 */
const toGenericSection = (rootElement: Element): InfoTableSection => {
    const rows: Array<Record<string, string>> = [];
    const elements = Array.from(rootElement.querySelectorAll('*'));

    for (const element of elements) {
        for (const attr of Array.from(element.attributes)) {
            rows.push({
                element: element.tagName,
                attribute: attr.name,
                value: attr.value,
            });
        }
    }

    if (rows.length === 0) {
        rows.push({
            element: rootElement.tagName,
            attribute: 'value',
            value: rootElement.textContent?.trim() || '',
        });
    }

    return {
        id: 'generic',
        title: 'Information',
        columns: [
            { key: 'element', header: 'Element', width: '25%' },
            { key: 'attribute', header: 'Attribute', width: '25%' },
            { key: 'value', header: 'Value', width: '50%' },
        ],
        rows,
    };
};

/**
 * Helper: Parse legacy `effdaterates` XML payload into one 2-column section.
 */
const parseEffDateRates = (rootElement: Element): ParsedInfoXml => {
    const headerItem = rootElement.querySelector('header > item');
    const title = headerItem ? readAttr(headerItem, 'description') : 'Effective Date of Rates';

    const rows = Array.from(rootElement.querySelectorAll(':scope > item')).map((item) => ({
        description: readAttr(item, 'description'),
        date: readAttr(item, 'date'),
    }));

    return {
        root: 'effdaterates',
        title,
        sections: [
            {
                id: 'effdaterates-main',
                columns: [
                    { key: 'description', header: 'Description', width: '75%' },
                    { key: 'date', header: 'Date', align: 'right', width: '25%' },
                ],
                rows,
            },
        ],
        isKnownStructure: true,
        rawXml: rootElement.ownerDocument?.documentElement?.outerHTML || '',
    };
};

/**
 * Helper: Parse legacy `taxinfo` XML payload into city and exception sections.
 */
const parseTaxInfo = (rootElement: Element): ParsedInfoXml => {
    const cityRows = Array.from(rootElement.querySelectorAll(':scope > item')).map((item) => ({
        city: readAttr(item, 'city'),
        citycode: readAttr(item, 'citycode'),
        exceptioncode: readAttr(item, 'exceptioncode'),
    }));
    const exceptionRows = Array.from(rootElement.querySelectorAll(':scope > exception')).map(
        (item) => ({
            taxcode: readAttr(item, 'taxcode'),
            footnote: readAttr(item, 'footnote'),
        }),
    );

    return {
        root: 'taxinfo',
        title: 'Tax City Information',
        sections: [
            {
                id: 'taxinfo-cities',
                title: 'City Information',
                columns: [
                    { key: 'city', header: 'City', width: '50%' },
                    { key: 'citycode', header: 'City Code', align: 'right', width: '20%' },
                    {
                        key: 'exceptioncode',
                        header: 'Exception Code',
                        align: 'right',
                        width: '30%',
                    },
                ],
                rows: cityRows,
            },
            {
                id: 'taxinfo-exceptions',
                title: 'Tax Code Exceptions',
                columns: [
                    { key: 'taxcode', header: 'Tax Code', width: '15%' },
                    { key: 'footnote', header: 'Description', width: '85%' },
                ],
                rows: exceptionRows,
            },
        ],
        isKnownStructure: true,
        rawXml: rootElement.ownerDocument?.documentElement?.outerHTML || '',
    };
};

/**
 * Main API: Parse XML from `DISPLAY_INFORMATION` / `DISPLAY_TAXCITY_INFORMATION` commands.
 */
export const parseInfoXml = (xmlData: string): ParsedInfoXml => {
    const trimmed = (xmlData || '').trim();

    if (!trimmed) {
        return {
            root: 'empty',
            title: 'Information',
            sections: [],
            isKnownStructure: false,
            error: 'No XML content was provided for informational dialog.',
            rawXml: xmlData,
        };
    }

    try {
        const normalizedPayload = tryNormalizeInfoXmlPayload(xmlData);
        if (!normalizedPayload) {
            return {
                root: 'invalid',
                title: 'Information',
                sections: [],
                isKnownStructure: false,
                error: 'Unable to parse informational XML payload.',
                rawXml: xmlData,
            };
        }

        const doc = parseXmlDocument(normalizedPayload.xml);
        if (!doc) {
            return {
                root: 'invalid',
                title: 'Information',
                sections: [],
                isKnownStructure: false,
                error: 'Unable to parse informational XML payload.',
                rawXml: xmlData,
            };
        }

        const rootElement = doc.documentElement;
        const root = rootElement.tagName.toLowerCase();

        if (root === 'effdaterates') {
            return parseEffDateRates(rootElement);
        }

        if (root === 'taxinfo') {
            return parseTaxInfo(rootElement);
        }

        if (looksLikeEffDateRates(rootElement)) {
            return parseEffDateRates(rootElement);
        }

        if (looksLikeTaxInfo(rootElement)) {
            return parseTaxInfo(rootElement);
        }

        return {
            root,
            title: 'Information',
            sections: [toGenericSection(rootElement)],
            isKnownStructure: false,
            rawXml: normalizedPayload.isRecovered ? normalizedPayload.xml : xmlData,
        };
    } catch {
        return {
            root: 'error',
            title: 'Information',
            sections: [],
            isKnownStructure: false,
            error: 'Unexpected error while processing informational XML.',
            rawXml: xmlData,
        };
    }
};

export const canRenderInfoXmlTable = (xmlData: string): boolean => {
    const parsed = parseInfoXml(xmlData);
    return !parsed.error && parsed.sections.length > 0;
};
