import { z } from 'zod';
import { baseQuery } from '@utils/http-instance';

// type
import type { BrowserCommand } from '@/types';

/* --------------------------------------------------
 * "Menu" XML detail parts
 * -------------------------------------------------- */

const permissiveBoolean = z
    .preprocess((val) => {
        if (typeof val === 'string') return val.toLowerCase() === 'true';
        if (typeof val === 'boolean') return val;
        return false;
    }, z.boolean())
    .default(false);

const MenuItemSchema = z
    .object({
        '@matchcode': z.string().optional(),
        label: z.string().default(''),
        action: z.string().default(''),
        args: z.string().optional(),
        test: z.string().default(''),
        shortcut: z.string().nullable().default(null),
    })
    .nullable();

const MenuCategorySchema = z.object({
    '@name': z.string().default('Unknown'),
    '@matchcode': z.string().optional(),
    item: z.array(MenuItemSchema).default([]),
});

const MenuXmlDetailSchema = z
    .object({
        m_blnSecurityPerms: permissiveBoolean,
        m_blnBatchPrintPerms: permissiveBoolean,
        m_blnSummaryMessagesPerms: permissiveBoolean,
        m_blnDocUtilityPerms: permissiveBoolean,
        m_blnResourceImportPerms: permissiveBoolean,
        m_blnPolicyImportExportPerms: permissiveBoolean,
        mxmlPageData: z
            .object({
                menus: z
                    .object({
                        '@id': z.string().default(''),
                        menu: z.array(MenuCategorySchema).default([]),
                    })
                    .default({ '@id': '', menu: [] }),
            })
            .default({ menus: { '@id': '', menu: [] } }),
    })
    .strict()
    .default({
        m_blnSecurityPerms: false,
        m_blnBatchPrintPerms: false,
        m_blnSummaryMessagesPerms: false,
        m_blnDocUtilityPerms: false,
        m_blnResourceImportPerms: false,
        m_blnPolicyImportExportPerms: false,
        mxmlPageData: { menus: { '@id': '', menu: [] } },
    });

/* --------------------------------------------------
 * Main XML detail parts
 * -------------------------------------------------- */

const MainXmlItemSchema = z.object({
    '@name': z.string(),
    '@value': z.string(),
});

// Schema for the xmlDetail section
const MainXmlDetailSchema = z.object({
    items: z
        .object({
            item: z.array(MainXmlItemSchema),
        })
        .optional()
        .transform((val) => val || { item: [] }),
        .nullable()
});
/* --------------------------------------------------
 * Base (common) fields — shared by both response variants
 * -------------------------------------------------- */
const CommonBase = z.object({
    result: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
    url: z.string().optional(),
    errors: z.string().nullable(), // null (or string message if present)
    queryString: z.string(), // "../../system/asp/"
    FileName: z.string(), // ""
    statusCode: z.number().int(), // 200
    frame: z.string().optional(), // "modal" or "main"
    height: z.string().optional(), // "200"
    width: z.string().optional(), // Modal width
    diagnosticMode: z.string().optional(), // "0"
    xmlFileName: z.string(),
    xmlFilePath: z.string(),
    browserCommands: z.string().optional(), // XML string of browser commands
    // NEW OPTIONAL FIELDS
    tabFileName: z.string().optional(),
    tabFilePath: z.string().optional(),
    xmlListFileName: z.string().optional(),
    xmlListFilePath: z.string().optional(),
    TabFileName: z.string().optional(),
    TabFilePath: z.string().optional(),
    XMLListFileName: z.string().optional(),
    XMLListFilePath: z.string().optional(),
    TabFile: z.string().optional(),
    XMLListFile: z.string().optional(),
    returnTabJsonData: z.string().optional(),
    returnXmlListFileJsonData: z.string().optional(),
    action: z.string().optional(),
    nodeKey: z.string().optional(),
    policyId: z.string().optional(),
});

/* --------------------------------------------------
 * Discriminated union by `action`
 * -------------------------------------------------- */

const MenuResponseSchema = CommonBase.extend({
    xmlDetail: MenuXmlDetailSchema,
});

const MainResponseSchema = CommonBase.extend({
    xmlDetail: z.union([
        MainXmlDetailSchema,            // normal case
        z.string(),                     // sometimes server returns ""
        z.object({}).passthrough(),     // empty {} or other structure
    ]),
}).passthrough();

// Generic response for other actions (e.g., STARTOPTIONS, modal actions)
// xmlDetail can be an empty string or minimal structure
const GenericResponseSchema = CommonBase.extend({
    xmlDetail: z.union([
        z.string(),                     // Allow empty string or any string
        z.object({}).passthrough(),     // Allow any object structure
        MenuXmlDetailSchema,
        MainXmlDetailSchema,
    ]),
});

export const PageNavigationResponseSchema = z.union([
    MenuResponseSchema,
    MainResponseSchema,
    GenericResponseSchema,
]);

// Types:
export type PageNavigationResponse = z.infer<typeof PageNavigationResponseSchema>;
export type MenuPageNavigationResponse = z.infer<typeof MenuResponseSchema>;
export type MainPageNavigationResponse = z.infer<typeof MainResponseSchema>;

const DEFAULT_NON_ZERO_POLICY_XML_DETAIL =
    "<items><item name='datachanged' value='T'/><item name='auto approve' value='T'/><item name='discard' val⟪?⟫";

const ADD_NEXT_COMPAT_XML_DETAIL =
    "<items><item name='auto approve' value='T'/><item name='discard' value='F'/><item name='issue' value='F'⟪?⟫";

function isAddNextAction(action?: string): boolean {
    return action?.trim().toUpperCase() === 'ADD|NEXT';
}

/**
 * Navigation request parameters
 */
export interface NavigationParams {
    compLoc: string;
    userId: string;
    policyID?: string;
    nodeKey: string;
    action?: string;
    diagnosticMode?: string;
    xmlDetail?: string;
    tab?: string;
    debug?: string;
    returnType?: string;
}

/**
 * Navigation result with parsed browser commands
 */
export interface NavigationResult {
    status: boolean;
    data: PageNavigationResponse | null;
    error?: string;
    browserCommands?: BrowserCommand[];
}

/**
 * Call cycling API (XmlCycling.aspx equivalent)
 *
 * Optimized for use in React Router v7 dataStrategy.
 * Returns structured response with browser commands parsed.
 *
 * @param params - Navigation parameters
 * @returns Navigation result with parsed commands
 *
 * @example
 * ```tsx
 * // In dataStrategy:
 * const navContext = context.get(navigationContext);
 * const result = await navigation({
 *     compLoc: navContext.compLoc,
 *     userId: navContext.userId,
 *     nodeKey: navContext.nodeKey,
 *     action: navContext.action,
 *     xmlDetail: navContext.xmlDetail,
 * });
 *
 * if (result.status) {
 *     context.set(navigationContext, {
 *         ...navContext,
 *         url: result.data.url,
 *         frame: result.data.frame,
 *         browserCommands: result.browserCommands,
 *     });
 * }
 * ```
 */
export async function navigation(params: NavigationParams): Promise<NavigationResult> {
    console.log('[Navigation] Calling navigation with params:', params);
    try {
        const isAddNextCompat = isAddNextAction(params.action);
        const xmlDetail =
            isAddNextCompat
                ? ADD_NEXT_COMPAT_XML_DETAIL
                : params.policyID == '0'
                    ? (params.xmlDetail ?? '')
                    : DEFAULT_NON_ZERO_POLICY_XML_DETAIL;
        const returnType = isAddNextCompat ? 'XML' : (params.returnType ?? 'xml');
        const body: Record<string, string> = {
            compLoc: params.compLoc,
            userId: params.userId,
            policyID: params.policyID ?? '0',
            nodeKey: params.nodeKey,
            action: params.action ?? '',
            diagnosticMode: params.diagnosticMode ?? '0',
            // To do - support structured xmlDetail in the future, we can add logic to convert objects to XML
            xmlDetail,
            tab: params.tab ?? '0',
            debug: params.debug ?? 'false',
            returnType,
        };

        console.log('[Page Navigation--->] Sending request with params:', body);

        const response = await baseQuery<{
            statusCode: number;
            FileName: string;
            queryString: string;
            result: Record<string, unknown>;
        }>({ url: '/PageNavigation', method: 'POST', data: body });

        console.log('*******[Navigation]******** Raw response:', response);

        // Validate using Zod
        const { success, data, error: zodError } = PageNavigationResponseSchema.safeParse(response);

        if (!success) {
            console.error('[Navigation] Zod validation failed:', zodError);
            console.error('[Navigation] Response that failed validation:', response);
            return {
                status: false,
                data: null,
                error: 'Validation failed',
            };
        }

        if (data.statusCode === 200) {
            // Parse browser commands if present
            const browserCommands = data.browserCommands
                ? parseBrowserCommandsFromXml(data.browserCommands)
                : [];

            return {
                status: true,
                data,
                browserCommands,
            };
        }

        console.warn('[Navigation] Failed with status:', data.statusCode);
        return {
            status: false,
            data,
            error: data.errors ?? `Status code: ${data.statusCode}`,
        };
    } catch (error) {
        console.error('[Navigation] Failed:', error);
        return {
            status: false,
            data: null,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Parse browser commands XML into structured array
 *
 * @param xmlString - Browser commands XML from server
 * @returns Array of browser commands
 *
 * @example
 * ```xml
 * <browser-commands>
 *   <call verb="SET_TEXT" noun="txtPolicyNumber" addinf="POL-12345"/>
 *   <call verb="LOAD_COMBO" noun="cmbState" addinf="<items>...</items>"/>
 * </browser-commands>
 * ```
 */
export function parseBrowserCommandsFromXml(xmlString: string): BrowserCommand[] {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlString, 'text/xml');
        const calls = Array.from(doc.getElementsByTagName('call'));

        return calls.map((node) => {
            const verb = node.getAttribute('verb') || '';
            const noun = node.getAttribute('noun') || '';
            const addinf = node.getAttribute('addinf') || '';
            const resfil = node.getAttribute('resfil') || undefined;

            // Return command in types.ts format (noun, addinf)
            // Command handlers expect this format
            return {
                verb,
                noun,
                addinf,
                ...(resfil && { resfil }),
            };
        });
    } catch (error) {
        console.error('[Navigation] Failed to parse browser commands:', error);
        return [];
    }
}
