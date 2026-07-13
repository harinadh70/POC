import type { OptionItem } from '@/types';
import type { ControlMetadata } from '@utils/build-eedata-array';

/**
 * Extract control metadata from PageBuild for EEData building
 */

/**
 * Normalize listItem elements (from XML) to OptionItem array
 */
export function normalizeListItems(listItem: unknown): OptionItem[] {
    if (!listItem) return [];

    // Handle array format
    if (Array.isArray(listItem)) {
        return listItem
            .filter(
                (item): item is Record<string, any> => typeof item === 'object' && item !== null,
            )
            .map((item, index) => {
                const label = String(item['#text'] || item['@text'] || item['@label'] || '').trim();
                const explicitValue = String(item['@value'] ?? '').trim();
                const value = explicitValue || label || String(index + 1);
                return { label: label || value, value };
            });
    }

    // Handle single object format
    if (typeof listItem === 'object' && listItem !== null) {
        const item = listItem as Record<string, any>;
        const label = String(item['#text'] || item['@text'] || item['@label'] || '').trim();
        const explicitValue = String(item['@value'] ?? '').trim();
        const value = explicitValue || label || '1';
        return [
            {
                label: label || value,
                value,
            },
        ];
    }

    return [];
}

/**
 * Extract control metadata from a PageBuild control element
 */
export function extractControlMetadata(
    controlElement: any,
    matchcode: string,
): ControlMetadata | undefined {
    if (!controlElement) {
        return undefined;
    }

    const controlType = (controlElement['@controltype'] || 'textbox').toLowerCase();

    // Extract options from listitems structure (listitems.item[])
    let options: any[] = [];
    if (
        (controlType === 'select' || controlType === 'combo' || controlType === 'kpcombo') &&
        controlElement.listitems
    ) {
        const listItemsNode = controlElement.listitems;
        if (listItemsNode && listItemsNode.item) {
            options = Array.isArray(listItemsNode.item) ? listItemsNode.item : [listItemsNode.item];
        }
    }

    return {
        matchcode,
        label: controlElement['@label'] || matchcode,
        controlType,
        options: options.length > 0 ? normalizeListItems(options) : undefined,
        showZero: controlElement['@showzero'] !== 'F' && controlElement['@showzero'] !== 'false',
        rule: controlElement['@rule'] || undefined,
    };
}

/**
 * Find control element by matchcode from PageBuild data
 */
export function findControlElement(pageBuildData: any, matchcode: string): any | undefined {
    const controls = pageBuildData?.Page?.controls?.control;

    if (!controls) {
        return undefined;
    }

    // Handle both array and single control formats
    const controlArray = Array.isArray(controls) ? controls : [controls];
    const targetMatchcode = String(matchcode || '')
        .trim()
        .toUpperCase();

    return controlArray.find((ctrl) => {
        const controlMatchcode = String(ctrl?.['@matchcode'] ?? '')
            .trim()
            .toUpperCase();
        return controlMatchcode === targetMatchcode;
    });
}

/**
 * Extract all controls metadata from PageBuild for caching
 */
export function extractAllControlsMetadata(pageBuildData: any): Map<string, ControlMetadata> {
    const metadataMap = new Map<string, ControlMetadata>();

    const controls = pageBuildData?.Page?.controls?.control;
    if (!controls) return metadataMap;

    const controlArray = Array.isArray(controls) ? controls : [controls];

    for (const control of controlArray) {
        const rawMatchcode = String(control?.['@matchcode'] ?? '').trim();
        if (rawMatchcode) {
            const metadata = extractControlMetadata(control, rawMatchcode);
            if (metadata) {
                metadataMap.set(rawMatchcode, metadata);
            }
        }
    }

    return metadataMap;
}
