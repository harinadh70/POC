import { z } from 'zod';

// services
import { type SessionInfo } from '@features/auth/services/auth';

// utils
import { baseQuery } from '@utils/http-instance';
import { sanitizeFilePath } from '@utils/common';
import { getPermissionMap, isPermissionsInitialized } from '@utils/permission-store';
import { applyPermissionsToPage } from '@utils/user-permissions';

// --------------------------------------

// Helper for fields that can be a single object or an array of objects
const arrayOrSingle = <T extends z.ZodTypeAny>(schema: T) => z.union([schema, z.array(schema)]);

const CallSchema = z.object({
    '@project': z.string().optional(),
    '@class': z.string().optional(),
    '@subroutine': z.string().optional(),
    '@componenttype': z.string().optional(),
    '@type': z.string().optional(),
});

const ListItemSchema = z.object({
    '@value': z.coerce.string(),
    '#text': z.coerce.string().optional().default(''),
});

const ListItemsSchema = z.union([
    z.object({
        item: z.union([arrayOrSingle(ListItemSchema), z.array(z.any())]),
    }),
    z.array(ListItemSchema),
    z.null(),
]);

const CallsContainerSchema = z.object({
    '@type': z.string().optional(),
    '@mode': z.string().optional(),
    call: arrayOrSingle(CallSchema).optional(),
});

const ControlSchema = z
    .object({
        '@matchcode': z.string(),
        '@text': z.string().optional(),
        '@ctrllabel': z.string().optional(),
        '@type': z.string().optional(),
        '@controltype': z.string().optional(),
        '@default': z.string().optional(),
        '@required': z.string().optional(),
        '@disabled': z.string().optional(),
        '@visible': z.string().optional(),
        '@value1': z.string().optional(),
        '@text1': z.string().optional(),
        '@value2': z.string().optional(),
        '@text2': z.string().optional(),
        '@tabindex': z.string().optional(),
        '@utporder': z.string().optional(),
        '@relatedcontrol': z.string().optional(),
        listitems: ListItemsSchema.optional(),
        calls: arrayOrSingle(CallsContainerSchema).optional(),
    })
    .passthrough(); // Using passthrough to allow other @ attributes not explicitly listed

const BrowserCommandSchema = z.object({
    '@verb': z.string(),
    '@noun': z.string(),
    '@addinf': z.string(),
    '@resfil': z.string(),
});
.passthrough(); // Using passthrough to allow other @ attributes not explicitly listed
export const PageBuildResponseSchema = z.object({
    Session: z.object({
        CompLoc: z.string(),
        UserId: z.string(),
        PolicyId: z.string(),
        NodeKey: z.string(),
        Action: z.string(),
        DiagnosticMode: z.string(),
        SessionXml: z.string(),
    }),
    Page: z
        .object({
            '@ignorechanges': z.string().optional(),
            '@elapsedtime': z.string().optional(),
            calls: z
                .union([
                    z.object({
                        '@type': z.string(),
                        call: arrayOrSingle(BrowserCommandSchema).optional(),
                    }),
                    z.array(z.object({ '@type': z.string() })),
                ])
                .optional(),
            controls: z.object({
                control: arrayOrSingle(ControlSchema),
                '#comment': arrayOrSingle(z.any()).optional(),
            }),
            utp: z
                .object({
                    data: arrayOrSingle(
                        z.object({
                            '@matchcode': z.string(),
                            '@name': z.string(),
                        }),
                    ),
                })
                .optional(),
        })
        .passthrough(),
    ListData: z.any().optional(),
});

// Type inference for use in your frontend/backend
export type PageBuildResponse = z.infer<typeof PageBuildResponseSchema>;

const DetailItemSchema = z.object({
    '@name': z.string(),
    '@value': z.string(),
});

export const XmlDetailSchema = z.object({
    items: z.object({
        item: z.array(DetailItemSchema),
    }),
});

type XmlDetail = z.infer<typeof XmlDetailSchema>;

export interface PageBuildRequestOptions {
    pageCode?: string;
    tabFile?: string;
    xmlListFile?: string;
}

/**
 * Converts the xmlDetail object structure into the legacy-style sessionXml string.
 * Format: <items><item name='key' value='val'/></items>
 */
export const buildSessionXml = (xmlDetail: XmlDetail): string => {
    const items = xmlDetail?.items?.item;

    if (!items) return '<items></items>';

    // Ensure we are working with an array (handles single object vs array inconsistency)
    const itemArray = Array.isArray(items) ? items : [items];

    const itemStrings = itemArray.map((item: any) => {
        const name = item['@name'] || '';
        const value = item['@value'] || '';
        // Use proper XML attribute format with spaces (per apis.instructions.md line 208)
        return `<item name='${name}' value='${value}'/>`;
    });

    return `<items>${itemStrings.join('')}</items>`;
};

export async function fetchPageBuild(
    sessionInfo: SessionInfo,
    xmlDetail?: XmlDetail,
    xmlFileName?: string,
    action?: string,
    policyId?: string,
    options?: PageBuildRequestOptions,
): Promise<{ status: boolean; data?: PageBuildResponse | null }> {
    // 1. Use inferred type
    try {
        const sessionXml = xmlDetail ? buildSessionXml(xmlDetail) : '<items />';
        const xmlFileNameWithoutExtension = xmlFileName ? sanitizeFilePath(xmlFileName) : 'Unknown';
        console.log(xmlFileNameWithoutExtension, '&&&&&&&&', xmlFileName);

        // resolvedAction is used ONLY for the session.action field in the request body
        const resolvedAction = action || sessionInfo.action || 'STARTOPTIONS';
        // routingAction is derived from the EXPLICIT action parameter only.
        // When callers don't pass an action (undefined), routing must fall through
        // to the default pageCode (xmlFileNameWithoutExtension), NOT pick up
        // sessionInfo.action — which could be 'Add' or 'RATELEVEL' from a prior flow.
        const routingAction = action ? action.toUpperCase() : '';

        let pageCode = options?.pageCode ?? '';
        if (!pageCode && routingAction === 'RATELEVEL') {
            pageCode = `pol/xml/${xmlFileNameWithoutExtension}`;
        } else if (!pageCode && routingAction === 'ADD') {
            pageCode = 'pol/xml/Pol_PIPHPOL_WxxDocVerDelWxxTutOpr_20250302';
        } else if (!pageCode) {
            pageCode = xmlFileNameWithoutExtension;
        }

        const tabFile =
            options?.tabFile ??
            (routingAction === 'ADD' ? 'pol/xml/PolTabs_PIPHPOL_20250301.xml' : '');
        const xmlListFile =
            options?.xmlListFile ??
            (routingAction === 'ADD' ? 'pol/xml/AddNamInsLst_ISLLPOL_2001010' : '');

        const body = {
            session: {
                compLoc: sessionInfo.compLoc,
                userId: sessionInfo.userId,
                policyID: policyId || sessionInfo.policyId || '0',
                nodeKey: sessionInfo.nodeKey,
                action: resolvedAction,
                diagnosticMode: sessionInfo.diagnosticMode || '0',
                sessionXml: sessionXml,
            },
            pageCode,
            TabFile: tabFile,
            XMLListFile: xmlListFile,
        };
        console.log('****************[fetchPageBuild]************** Request body:', body);

        const response = await baseQuery<PageBuildResponse>({
            url: '/PageBuild',
            method: 'POST',
            data: body,
        });

        console.log('**********111111******[fetchPageBuild]************** Raw response:', response);

        // 2. Validate the response against the schema
        const validation = PageBuildResponseSchema.safeParse(response);

        if (validation.success) {
            console.log('Page build data validated successfully');

            // 3. Auto-apply permissions from global permission store
            let finalData = validation.data;
            if (isPermissionsInitialized()) {
                const permMap = getPermissionMap();
                if (permMap) {
                    console.log('[PageBuild] Applying permissions to page...');
                    finalData = applyPermissionsToPage(validation.data, permMap);
                    console.log('[PageBuild] Permissions applied successfully');
                }
            } else {
                console.log(
                    '[PageBuild] Permission store not initialized, skipping permission application',
                );
            }

            return {
                status: true,
                data: finalData,
            };
        }
        // Log validation errors to see exactly what field failed
        console.error('[PAGE_BUILD] Schema Validation Error:', validation.error.format());
        console.error('[PAGE_BUILD] Response that failed validation:', response);
        return { status: false, data: null };
    } catch (error) {
        console.error('[PAGE_BUILD] Error fetching page build data:', error);
        return { status: false, data: null };
    }
}
