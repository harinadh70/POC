import { data, redirect } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';

import { navigationContext, userContext } from '@/context';
import { navigation } from '@services/navigation';
import { fetchPageBuild } from '@services/page-build';
import { normalizeServiceConfig } from '@utils/normalize-service-config';
import { transformPageBuildResponse } from '@utils/transform-pagebuild-response';
import type { PageBuildButton } from '@utils/transform-pagebuild-response';
import { parseBrowserCommandsFromPageBuild } from '@utils/apply-server-commands';

import type { BrowserCommand, NormalizedField } from '@/types';
import type { PageBuildResponse } from '@services/page-build';
import type { SessionInfo } from '@features/auth/services/auth';

interface DynamicFormLoaderData {
    pageBuildData?: PageBuildResponse;
    normalizedFields: NormalizedField[];
    buttons: PageBuildButton[];
    browserCommands: BrowserCommand[];
    sessionInfo: SessionInfo;
    isPopup: boolean;
    xmlFilePath?: string;
    error?: string;
}

interface FollowupActionParams {
    action: string;
    nodeKey: string | null;
    policyId: string | null;
    xmlDetail: string | null;
}

type PageBuildXmlDetail = NonNullable<Parameters<typeof fetchPageBuild>[1]>;

interface BuildPageBuildParamsInput {
    aspFileName?: string;
    fallbackFileName?: string;
    navXmlFileName?: string;
    xmlDetailCandidate?: unknown;
    fallbackXmlDetail?: unknown;
}

interface BuildPageBuildParamsOutput {
    xmlFileName?: string;
    xmlDetail?: PageBuildXmlDetail;
}

function isPopupWindow(): boolean {
    return typeof window !== 'undefined' && !!window.opener;
}

function extractFollowupActionFromQuery(
    searchParams: URLSearchParams,
): FollowupActionParams | null {
    const action = searchParams.get('action')?.trim();

    if (!action) {
        return null;
    }

    return {
        action,
        nodeKey: searchParams.get('nodeKey'),
        policyId: searchParams.get('policyId'),
        xmlDetail: searchParams.get('xmlDetail'),
    };
}

function toPageBuildXmlDetail(source: unknown): PageBuildXmlDetail | undefined {
    if (!source) {
        return undefined;
    }

    if (typeof source === 'object') {
        const record = source as { items?: { item?: unknown } };
        const items = record.items?.item;

        if (Array.isArray(items)) {
            const normalizedItems = items
                .filter((item) => typeof item === 'object' && item !== null)
                .map((item) => {
                    const row = item as Record<string, unknown>;
                    return {
                        '@name': String(row['@name'] ?? ''),
                        '@value': String(row['@value'] ?? ''),
                    };
                });

            return {
                items: {
                    item: normalizedItems,
                },
            };
        }

        if (typeof items === 'object' && items !== null) {
            const row = items as Record<string, unknown>;
            return {
                items: {
                    item: [
                        {
                            '@name': String(row['@name'] ?? ''),
                            '@value': String(row['@value'] ?? ''),
                        },
                    ],
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

    if (value.startsWith('{') || value.startsWith('[')) {
        try {
            const parsed = JSON.parse(value) as unknown;
            return toPageBuildXmlDetail(parsed);
        } catch {
            return undefined;
        }
    }

    if (typeof DOMParser === 'undefined') {
        return undefined;
    }

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(value, 'text/xml');
        const parserError = doc.querySelector('parsererror');

        if (parserError) {
            return undefined;
        }

        const xmlItems = Array.from(doc.querySelectorAll('item')).map((item) => ({
            '@name': item.getAttribute('name') ?? '',
            '@value': item.getAttribute('value') ?? '',
        }));

        return {
            items: {
                item: xmlItems,
            },
        };
    } catch {
        return undefined;
    }
}

function readXmlDetailString(source: unknown): string | undefined {
    if (typeof source === 'string' && source.trim()) {
        return source;
    }

    return undefined;
}

function buildPageBuildParams({
    aspFileName,
    fallbackFileName,
    navXmlFileName,
    xmlDetailCandidate,
    fallbackXmlDetail,
}: BuildPageBuildParamsInput): BuildPageBuildParamsOutput {
    const xmlFileName =
        navXmlFileName?.trim() || aspFileName?.trim() || fallbackFileName?.trim() || undefined;

    const xmlDetail =
        toPageBuildXmlDetail(xmlDetailCandidate) ?? toPageBuildXmlDetail(fallbackXmlDetail);

    return {
        xmlFileName,
        xmlDetail,
    };
}

function getRegularPageBuildFileName(
    aspFileName: string | undefined,
    fallbackFileName: string | undefined,
): string | undefined {
    return aspFileName?.trim() || fallbackFileName?.trim() || undefined;
}

export async function dynamicFormLoader({ context, params, request }: LoaderFunctionArgs) {
    const userInfo = context.get(userContext);

    if (!userInfo) {
        return redirect('/login');
    }

    const navContext = context.get(navigationContext);
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const isPopup = isPopupWindow();

    console.log('NAV_CONTECT', navContext);

    const aspFileName = params.aspFileName;
    const policyId = params.policyId;
    const followupAction = extractFollowupActionFromQuery(searchParams);

    console.log('NAV_CONTECT', navContext);
    try {
        if (isPopup && followupAction) {
            const navXmlDetail =
                readXmlDetailString(followupAction.xmlDetail) ??
                readXmlDetailString(navContext?.xmlDetail) ??
                '<items />';
            const navResult = await navigation({
                compLoc: userInfo.compLoc,
                userId: userInfo.userId,
                policyID:
                    policyId?.trim() ||
                    followupAction.policyId?.trim() ||
                    navContext?.policyId?.trim() ||
                    userInfo.policyId,
                nodeKey:
                    followupAction.nodeKey?.trim() ||
                    navContext?.nodeKey?.trim() ||
                    userInfo.nodeKey,
                action: navContext?.action?.trim() || followupAction.action?.trim(),
                xmlDetail: navXmlDetail,
                diagnosticMode: userInfo.diagnosticMode,
            });

            if (!navResult.status || !navResult.data) {
                return data(
                    {
                        error: navResult.error ?? 'Navigation failed for followup action',
                        normalizedFields: [],
                        buttons: [],
                        browserCommands: navResult.browserCommands ?? [],
                        sessionInfo: userInfo,
                        isPopup,
                        xmlFilePath: undefined,
                    } satisfies DynamicFormLoaderData,
                    { status: 500 },
                );
            }

            const pageBuildParams = buildPageBuildParams({
                aspFileName,
                fallbackFileName: navContext?.fileName ?? navContext?.xmlFileName,
                navXmlFileName: navResult.data.xmlFileName || navResult.data.FileName,
                xmlDetailCandidate: navResult.data.xmlDetail,
                fallbackXmlDetail: followupAction.xmlDetail ?? navContext?.xmlDetail,
            });

            if (!pageBuildParams.xmlFileName) {
                return data(
                    {
                        error: 'Unable to resolve target page for popup followup action',
                        normalizedFields: [],
                        buttons: [],
                        browserCommands: navResult.browserCommands ?? [],
                        sessionInfo: userInfo,
                        isPopup,
                        xmlFilePath: navResult.data?.xmlFilePath,
                    } satisfies DynamicFormLoaderData,
                    { status: 400 },
                );
            }

            // FIX 1: Create updated sessionInfo with correct nodeKey, action, and policyId from navigation r⟪?⟫
            // This ensures PageBuild receives consistent session data matching the navigation state
            const resolvedPolicyId =
                policyId?.trim() ||
                followupAction.policyId?.trim() ||
                navContext?.policyId?.trim() ||
                userInfo.policyId;

            const updatedSessionInfo: SessionInfo = {
                ...userInfo,
                policyId: resolvedPolicyId,
                nodeKey: followupAction.nodeKey?.trim() || navContext?.nodeKey || userInfo.nodeKey,
                action: followupAction.action,
            };

            const pageBuildResult = await fetchPageBuild(
                updatedSessionInfo,
                pageBuildParams.xmlDetail,
                pageBuildParams.xmlFileName,
                followupAction.action,
                resolvedPolicyId,
            );

            if (!pageBuildResult.status || !pageBuildResult.data) {
                return data(
                    {
                        error: 'PageBuild failed for popup followup action',
                        normalizedFields: [],
                        buttons: [],
                        browserCommands: navResult.browserCommands ?? [],
                        sessionInfo: userInfo,
                        isPopup,
                        xmlFilePath: navResult.data?.xmlFilePath,
                    } satisfies DynamicFormLoaderData,
                    { status: 500 },
                );
            }

            const transformed = transformPageBuildResponse(pageBuildResult.data);
            const normalizedFields = normalizeServiceConfig(transformed.serviceFields);

            // Extract browser commands from PageBuild response (e.g., SET_DISABLED commands)
            // For popup scenario, we only use PageBuild commands (not navigation commands)
            // to avoid duplicate PageBuild calls from navigation commands already executed in opener
            const pageBuildCommands = parseBrowserCommandsFromPageBuild(pageBuildResult.data);

            // FIX 2: Use only PageBuild commands for popup scenario
            // Commands from navigation were already executed in the opener window,
            // re-executing them here would cause duplicate PageBuild calls
            return data({
                pageBuildData: pageBuildResult.data,
                normalizedFields,
                buttons: transformed.buttons,
                browserCommands: pageBuildCommands,
                sessionInfo: updatedSessionInfo,
                isPopup,
                xmlFilePath: navResult.data?.xmlFilePath,
            } satisfies DynamicFormLoaderData);
        }

        const regularFileName = getRegularPageBuildFileName(
            aspFileName,
            navContext?.fileName ?? navContext?.xmlFileName,
        );

        if (!regularFileName) {
            return data(
                {
                    error: 'No target page was specified for form loading',
                    normalizedFields: [],
                    buttons: [],
                    browserCommands: navContext?.browserCommands ?? [],
                    sessionInfo: userInfo,
                    isPopup,
                    xmlFilePath: navContext?.xmlFilePath,
                } satisfies DynamicFormLoaderData,
                { status: 400 },
            );
        }

        const pageBuildParams = buildPageBuildParams({
            aspFileName: regularFileName,
            fallbackFileName: navContext?.fileName ?? navContext?.xmlFileName,
            xmlDetailCandidate: searchParams.get('xmlDetail'),
            fallbackXmlDetail: navContext?.xmlDetail,
        });

        const pageBuildResult = await fetchPageBuild(
            userInfo,
            pageBuildParams.xmlDetail,
            regularFileName,
            navContext?.action || searchParams.get('action') || undefined,
            policyId?.trim() || navContext?.policyId?.trim() || userInfo.policyId,
        );

        if (!pageBuildResult.status || !pageBuildResult.data) {
            return data(
                {
                    error: 'PageBuild failed for form load',
                    normalizedFields: [],
                    buttons: [],
                    browserCommands: navContext?.browserCommands ?? [],
                    sessionInfo: userInfo,
                    isPopup,
                    xmlFilePath: navContext?.xmlFilePath,
                } satisfies DynamicFormLoaderData,
                { status: 500 },
            );
        }

        const transformed = transformPageBuildResponse(pageBuildResult.data);
        const normalizedFields = normalizeServiceConfig(transformed.serviceFields);

        // Extract browser commands from PageBuild response (e.g., SET_DISABLED commands)
        const pageBuildCommands = parseBrowserCommandsFromPageBuild(pageBuildResult.data);
        // Merge with navigation context commands (nav context commands take precedence)
        const allBrowserCommands = [...pageBuildCommands, ...(navContext?.browserCommands ?? [])];

        return data({
            pageBuildData: pageBuildResult.data,
            normalizedFields,
            buttons: transformed.buttons,
            browserCommands: allBrowserCommands,
            sessionInfo: userInfo,
            isPopup,
            xmlFilePath: navContext?.xmlFilePath,
        } satisfies DynamicFormLoaderData);
    } catch (error) {
        return data(
            {
                error: error instanceof Error ? error.message : 'Unexpected loader error',
                normalizedFields: [],
                buttons: [],
                browserCommands: navContext?.browserCommands ?? [],
                sessionInfo: userInfo,
                isPopup,
                xmlFilePath: navContext?.xmlFilePath,
            } satisfies DynamicFormLoaderData,
            { status: 500 },
        );
// TODO ⟪missing lines 413-end — not captured in photos⟫
