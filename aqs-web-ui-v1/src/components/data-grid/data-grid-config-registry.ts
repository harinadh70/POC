/**
 * Grid Configuration Registry
 *
 * Maps XSL files to grid column configurations.
 * When API returns XML name, use it to look up the grid config.
 *
 * Usage:
 * const config = getGridConfigByXsL('LobSummary_ISLLPOL_20010101.xsl');
 * <UniversalGrid gridConfig={config} data={apiResponse} />
 */

export interface ColumnConfig {
    /** Field name from API response */
    field: string;

    /** Display label in grid header */
    label: string;

    /** Column width in pixels */
    width?: number;

    /** Flex grow (if width not set) */
    flex?: number;

    /** Column type: 'string' | 'number' | 'boolean' | 'date' | 'currency' */
    type?: 'string' | 'number' | 'boolean' | 'date' | 'currency';

    /** Text align: 'left' | 'center' | 'right' */
    align?: 'left' | 'center' | 'right';

    /** Is column sortable? Default: true */
    sortable?: boolean;

    /** Is column filterable? Default: true */
    filterable?: boolean;

    /** Is column visible in grid? Default: true */
    visible?: boolean;

    /** Custom formatter function */
    valueFormatter?: (value: any) => string;

    /** Currency code for currency type fields (e.g., 'USD') */
    currency?: string;
}

export interface GridConfigObject {
    /** Unique config ID */
    id: string;

    /** Display name for this grid */
    name: string;

    /** XSL filename this config is based on */
    xslFile: string;

    /** Columns to display */
    columns: ColumnConfig[];

    /** Default page size for pagination */
    pageSize?: number;

    /** Default sort field */
    defaultSortField?: string;

    /** Default sort order: 'asc' | 'desc' */
    defaultSortOrder?: 'asc' | 'desc';

    /** Footer config for totals */
    footer?: {
        visible: boolean;
        /** Field names to calculate totals for */
        totalFields?: string[];
        /** Custom footer template - can override */
        template?: (data: any) => React.ReactNode;
    };

    /** Fields to hide from display but keep in row data */
    hiddenFields?: string[];

    /** Row ID field - which field contains unique identifier */
    rowIdField?: string;

    /** Path to data array in response (e.g., "Page.LOB" or "policy") */
    dataPath?: string;

    /** Tooltip configuration (optional - only if XSL has tooltip logic) */
    tooltip?: {
        /** Whether to show tooltip on row hover */
        visible?: boolean;
        /** Field to display in tooltip */
        field: string;
        /** Tooltip prefix text (e.g., "PolicyId: " will be prepended to ⟪truncated — not captured in photos⟫
        prefix?: string;
    };
}

/**
 * Grid Config Registry - All available grid configurations
 *
 * To add a new grid:
 * 1. Analyze the XSL file to get column names, widths, alignment
 * 2. Create a new ColumnConfig entry for each column
 * 3. Add to GRID_CONFIG_REGISTRY below
 * 4. Use gridConfig.id when rendering UniversalGrid
 */
export const GRID_CONFIG_REGISTRY: Record<string, GridConfigObject> = {
    // ============================================================
    // LOB SUMMARY GRID
    // ============================================================
    LOB_SUMMARY: {
        id: 'LOB_SUMMARY',
        name: 'LOB Summary',
        xslFile: 'LobSummary_ISLLPOL_20010101.xsl',
        dataPath: 'Page.LOB',
        columns: [
            {
                field: 'text',
                label: 'Line of Business',
                width: 430,
                type: 'string',
                align: 'left',
                sortable: false,
                filterable: false,
            },
            {
                field: 'units',
                label: 'Units',
                width: 150,
                type: 'number',
                align: 'center',
                sortable: false,
                filterable: false,
                valueFormatter: (value) => (Number.isFinite(value) ? value ⟪truncated — not captured in photos⟫
            },
            {
                field: 'premium',
                label: 'Premium',
                width: 150,
                type: 'number',
                align: 'right',
                sortable: false,
                filterable: false,
                valueFormatter: (value) =>
                    '$' +
                    Number(value ?? 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }),
            },
        ],
        pageSize: 25,
        defaultSortField: 'sequencer',
        defaultSortOrder: 'asc',
        footer: {
            visible: true,
            totalFields: ['premium'],
        },
        rowIdField: 'sequencer',
    },

    // ============================================================
    // INSURED DETAILS GRID
    // ============================================================
    INSURED_DETAILS: {
        id: 'INSURED_DETAILS',
        name: 'Insured Details',
        xslFile: 'AddNamInsLst_ISLLPOL_20010101.xsl',
        dataPath: 'policy',
        columns: [
            {
                field: 'sequencer',
                label: 'Order #',
                width: 105,
                type: 'number',
                align: 'right',
                sortable: true,
                filterable: false,
            },
            {
                field: 'insuredname',
                label: 'Named Insured',
                width: 270,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: false,
            },
            {
                field: 'policynumber',
                label: 'Secondary Name',
                width: 270,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: false,
            },
            {
                field: 'productcode',
                label: 'Misc Name',
                width: 270,
                type: 'string',
                align: 'left',
                sortable: false,
                filterable: false,
            },
        ],
        pageSize: 10,
        defaultSortField: 'sequencer',
        defaultSortOrder: 'asc',
        footer: {
            visible: true,
            totalFields: [],
        },
        rowIdField: 'policyid',
    },

    // ============================================================
    // WORK IN PROGRESS SERVICES GRID
    // ============================================================
    WIP_SERVICES: {
        id: 'WIP_SERVICES',
        name: 'Work In Progress Services',
        xslFile: 'WipSerLst_PIPHPOL_20010101.xsl',
        dataPath: 'policy',
        columns: [
            {
                field: 'policynumber',
                label: 'Policy',
                width: 85,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: false,
            },
            {
                field: 'productcode',
                label: 'Product Code',
                width: 155,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: true,
            },
            {
                field: 'insuredname',
                label: 'Insured Name',
                width: 155,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: true,
            },
            {
                field: 'externalid',
                label: 'Path ID',
                width: 85,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: true,
            },
            {
                field: 'workflowstatus',
                label: 'Status',
                width: 100,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: true,
            },
            {
                field: 'primarytransaction',
                label: 'Transaction',
                width: 93,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: true,
            },
            {
                field: 'effdate',
                label: 'Eff Date',
                width: 70,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: true,
            },
            {
                field: 'owner',
                label: 'Owner',
                width: 85,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: true,
            },
            {
                field: 'policytype',
                label: 'Policy Type',
                width: 100,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: true,
            },
            {
                field: 'description',
                label: 'Remarks',
                width: 345,
                type: 'string',
                align: 'left',
                sortable: true,
                filterable: true,
            },
        ],
        pageSize: 10,
        defaultSortField: 'policynumber',
        defaultSortOrder: 'asc',
        footer: {
            visible: true,
            totalFields: [],
        },
        rowIdField: 'sequencer',
        tooltip: {
            visible: true,
            field: 'policyid',
            prefix: 'PolicyId: ',
        },
    },

    // ================================================================
    // POLICY LIST GRID (Example - add your own here)
    // ================================================================
    // POLICY_LIST: {
    //   id: 'POLICY_LIST',
    //   name: 'Policy List',
    //   xslFile: 'PolicyList_ISLLPOL_20010101.xsl',
    //   columns: [
    //     { field: 'policynumber', label: 'Policy Number', width: 150, type: 'string' },
    //     { field: 'insuredname', label: 'Insured Name', flex: 1, type: 'string' },
    //     { field: 'effectivedate', label: 'Effective Date', width: 120, type: 'date' },
    //     { field: 'premium', label: 'Premium', width: 120, type: 'currency', align: 'right' },
    //   ],
    //   pageSize: 10,
    //   rowIdField: 'policynumber',
    // },
};

/**
 * Get grid config by XSL filename
 * @param xslFileName - XSL filename (e.g., 'LobSummary_ISLLPOL_20010101.xsl')
 * @returns GridConfigObject if found
 */
export function getGridConfigByXsL(xslFileName: string): GridConfigObject | null {
    return (
        Object.values(GRID_CONFIG_REGISTRY).find((config) => config.xslFile === xslFileName) || null
    );
}

/**
 * Get grid config by config ID
 * @param configId - Config ID (e.g., 'LOB_SUMMARY')
 * @returns GridConfigObject if found
 */
export function getGridConfig(configId: string): GridConfigObject | null {
    return GRID_CONFIG_REGISTRY[configId] || null;
}

/**
 * List all available grid configurations
 */
export function listGridConfigs(): GridConfigObject[] {
    return Object.values(GRID_CONFIG_REGISTRY);
}
