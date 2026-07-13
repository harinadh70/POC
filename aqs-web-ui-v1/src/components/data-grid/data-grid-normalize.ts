// lib/grid-normalize.ts

import { castArray } from 'lodash-es';
import type { GridConfigObject } from '@components/data-grid/data-grid-config-registry';

/**
 * Generic row type for any grid data
 * Holds the actual row data from the API response
 */
export type GenericRow = {
    id: string;
    [key: string]: any;
};

export type NormalizedResult = {
    rows: GenericRow[];
    totalUnits?: number;
    totalPremium?: number;
};

const toNumber = (value: string | number | null | undefined) => {
    const n = Number(value ?? 0);
    return Number.isFinite(n) ? n : 0;
};

/**
 * Extract nested property from object using dot notation
 * e.g., "Page.LOB" or "policy"
 */
function getNestedProperty(obj: any, path?: string): any[] {
    if (!path) return [];
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
        current = current?.[part];
    }
    return castArray(current);
}

/**
 * Normalize a single row from the API response
 */
const normalizeRow = (item: any, idx: number, rowIdField?: string): GenericRow => ({
    id: item?.[rowIdField || 'id'] || String(idx),
    ...item,
});

/**
 * Normalize grid response based on config and data path
 */
export const normalizeGridResponse = (
    data: any,
    gridConfig?: GridConfigObject,
): NormalizedResult => {
    if (!data || !gridConfig) {
        return { rows: [], totalUnits: 0, totalPremium: 0 };
    }

    // Extract data array using dataPath from config
    const dataPath = gridConfig.dataPath;
    const items = getNestedProperty(data, dataPath);

    // Normalize all rows using generic normalization
    const rows: GenericRow[] = items.map((item, idx) =>
        normalizeRow(item, idx, gridConfig.rowIdField),
    );

    // Calculate totals if config specifies totalFields
    let totalUnits: number | undefined;
    let totalPremium: number | undefined;

    if (gridConfig.footer?.totalFields?.includes('premium')) {
        totalPremium = rows.reduce((sum, row) => sum + toNumber(row.premium), 0);
    }

    if (gridConfig.footer?.totalFields?.includes('units')) {
        totalUnits = rows.reduce((sum, row) => sum + toNumber(row.units), 0);
    }

    return {
        rows,
        totalUnits,
        totalPremium,
    };
};
