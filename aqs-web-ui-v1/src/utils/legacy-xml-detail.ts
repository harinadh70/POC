function escapeXmlAttribute(raw: string): string {
    return raw
        .replace(/&/g, '&amp;')
        .replace(/'/g, '&apos;')
        .replace(/\"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

interface XmlItem {
    name: string;
    value: string;
}

function toXmlItems(value: unknown): XmlItem[] {
    if (!value || typeof value !== 'object') {
        return [];
    }

    const root = value as Record<string, unknown>;
    const itemsNode =
        (root.items as Record<string, unknown> | undefined) ??
        (root['items'] as Record<string, unknown> | undefined);

    const rawItems =
        (itemsNode?.item as unknown) ??
        (root.item as unknown) ??
        (root.items as unknown);

    const itemArray = Array.isArray(rawItems)
        ? rawItems
        : rawItems && typeof rawItems === 'object'
            ? [rawItems]
            : [];

    return itemArray
        .map((entry) => {
            if (!entry || typeof entry !== 'object') {
                return null;
            }

            const item = entry as Record<string, unknown>;
            const name = String(item['@name'] ?? item.name ?? '').trim();
            const itemValue = String(item['@value'] ?? item.value ?? '').trim();
            if (!name) {
                return null;
            }

            return {
                name,
                value: itemValue,
            };
        })
        .filter((row): row is XmlItem => row !== null);
}

/**
 * Converts xmlDetail values to legacy XML session format used by XmlCycling/PageNavigation.
 * - String values pass through untouched.
 * - Object values with items/item nodes convert to <items><item .../></items> XML.
 */
export function toLegacyXmlDetailString(value: unknown, fallback = ''): string {
    if (typeof value === 'string') {
        return value;
    }

    const items = toXmlItems(value);
    if (items.length === 0) {
        return fallback;
    }

    const xmlItems = items
        .map(
            (item) =>
                `<item name='${escapeXmlAttribute(item.name)}' value='${escapeXmlAttribute(item.value)}' />`,
        )
        .join('');

    return `<items>${xmlItems}</items>`;
}
