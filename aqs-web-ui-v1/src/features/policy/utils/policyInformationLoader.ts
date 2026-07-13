import { data, redirect } from 'react-router';
import { fetchPageBuild } from '@services/page-build';
import { PolicyInformationFields } from '@features/policy/policy-information-fields';
import { transformPageBuildResponse } from '@utils/transform-pagebuild-response';
import { normalizeServiceConfig } from '@utils/normalize-service-config';
import { parseBrowserCommandsFromPageBuild } from '@utils/apply-server-commands';
import { getItem } from '@utils/local-storage';
import { readContextFromStorage } from '@utils/session-sync';

import type { SessionInfo } from '@features/auth/services/auth';

function ensureArray<T>(v: T | T[] | undefined): T[] {
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
}

function normalizeXmlPath(value: string | undefined): string | undefined {
    if (!value || !value.trim()) {
        return undefined;
    }

    return value
        .trim()
        .replace(/^\.\.\//, '')
        .replace(/^\//, '');
}

function normalizePageCodeFromXmlPath(value: string | undefined): string | undefined {
    const normalized = normalizeXmlPath(value);
    if (!normalized) {
        return undefined;
    }

    return normalized.replace(/\.xml$/i, '');
}

function resolveEffectiveAction(rawAction: string): string {
    const normalized = rawAction.trim().toUpperCase();
    if (!normalized.includes('|')) {
        return rawAction;
    }

    const tokens = normalized
        .split('|')
        .map((token) => token.trim())
        .filter((token) => token.length > 0);

    if (tokens.length < 2) {
        return rawAction;
    }

    const trailingToken = tokens[tokens.length - 1];
    if (trailingToken === 'RLVUPDATE') {
        return trailingToken;
    }

    return tokens[0];
}

interface PageBuildXmlItem {
    '@name': string;
    '@value': string;
    item?: PageBuildXmlItem[];
}

interface PageBuildXmlDetail {
    items: {
        item: PageBuildXmlItem[];
    };
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

    if (value.startsWith('{') || value.startsWith('[')) {
        try {
            const parsed = JSON.parse(value) as unknown;
            return toPageBuildXmlDetail(parsed);
        } catch {
            return undefined;
        }
    }
}

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(value, 'text/xml');
        if (doc.querySelector('parsererror')) {
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

let loaderCallCount = 0;

export async function policyInformationLoader({ request }: any) {
    try {
        loaderCallCount++;

        // Reuse query param parsing similar to existing loader behavior
        const url = new URL(String(request.url));
        const search = url.searchParams;

        console.log(`[PolicyInformationLoader] ===== START (Call #${loaderCallCount}) =====`);
        console.log('[PolicyInformationLoader] Request details:', {
            pathname: url.pathname,
            searchParams: Object.fromEntries(search.entries()),
        });

        //  const landingToken = search.get('landingToken') || search.get('xmlToken') || undefined;
        const storedContext = readContextFromStorage();
        const sessionInfo = (getItem('sessionInformation') as Record<string, unknown> | null) ?? {};

        const policyId =
            search.get('policyId') ??
            (typeof storedContext?.policyId === 'string' ? storedContext.policyId : null) ??
            (typeof sessionInfo.policyId === 'string' ? sessionInfo.policyId : null) ??
            undefined;
        const rawAction =
            search.get('action') ??
            (typeof storedContext?.action === 'string' ? storedContext.action : null) ??
            (typeof sessionInfo.action === 'string' ? sessionInfo.action : null) ??
            undefined;
        const action =
            typeof rawAction === 'string' && rawAction.includes('|')
                ? resolveEffectiveAction(rawAction)
                : rawAction;
        const nodeKey =
            search.get('nodeKey') ??
            (typeof storedContext?.nodeKey === 'string' ? storedContext.nodeKey : null) ??
            (typeof sessionInfo.nodeKey === 'string' ? sessionInfo.nodeKey : null) ??
            undefined;
        const xmlFileName =
            search.get('xmlFileName') ??
            search.get('fileName') ??
            (typeof storedContext?.xmlFileName === 'string' ? storedContext.xmlFileName : null) ??
            (typeof sessionInfo.xmlFileName === 'string' ? sessionInfo.xmlFileName : null) ??
            undefined;
        const xmlFilePath =
            search.get('xmlFilePath') ??
            (typeof storedContext?.xmlFilePath === 'string' ? storedContext.xmlFilePath : null) ??
            undefined;
        const tabFilePath =
            search.get('tabFilePath') ??
            (typeof storedContext?.tabFilePath === 'string' ? storedContext.tabFilePath : null) ??
            undefined;
        const xmlListFilePath =
            search.get('xmlListFilePath') ??
            (typeof storedContext?.xmlListFilePath === 'string'
                ? storedContext.xmlListFilePath
                : null) ??
            undefined;
        const xmlDetailParam = search.get('xmlDetail') ?? undefined;
        const xmlDetail =
            xmlDetailParam ??
            (typeof storedContext?.xmlDetail === 'string' ? storedContext.xmlDetail : null) ??
            (typeof sessionInfo.sessionXml === 'string' ? sessionInfo.sessionXml : null) ??
            undefined;

        const frameParam = (search.get('frame') ?? '').trim().toUpperCase();

        // Dynamic frame-based routing: use frame response to determine routing
        // This replaces hardcoded filename checks with generic pattern
        // TODO ⟪missing line 206 — not captured in photos⟫
        if (frameParam && frameParam.trim() !== '' && (xmlFileName || xmlFilePath)) {
            // Import at top of function for dynamic resolution
            const { aspToReactRoute } = await import('@utils/asp-route-mapper');

            const fileName = xmlFileName || xmlFilePath;
            if (fileName) {
                // Dynamically resolve React route from ASP filename
                const reactRoute = aspToReactRoute(fileName);
                // CRITICAL: Only redirect if we're NOT already on the target route
                // This prevents infinite redirect loops
                if (url.pathname !== reactRoute) {
                    const nextParams = new URLSearchParams(search);

                    // CRITICAL: Remove frame param to prevent re-processing after redirect
                    nextParams.delete('frame');

                    // CRITICAL: Remove combined action to prevent dataStrategy from calling cycling API again
                    const currentAction = nextParams.get('action');
                    if (currentAction && currentAction.includes('|')) {
                        // Extract base action (e.g., RATELEVEL from RATELEVEL|NEXT)
                        const baseAction = currentAction.split('|')[0];
                        nextParams.set('action', baseAction);
                    }

                    console.log('[PolicyInformationLoader] Frame-based redirect:', {
                        frame: frameParam,
                        fileName,
                        reactRoute,
                        currentPath: url.pathname,
                        originalAction: currentAction,
                        cleanedAction: nextParams.get('action'),
                    });

                    return redirect(`${reactRoute}?${nextParams.toString()}`);
                } else {
                    console.log('[PolicyInformationLoader] Already on target route, skipping redirect', {
                        currentPath: url.pathname,
                        targetRoute: reactRoute,
                        willRemoveFrameParam: true,
                    });
                }
            }
        }

        const pageBuildXmlDetail = toPageBuildXmlDetail(xmlDetail);
        const pageBuildOptions = {
            pageCode: normalizePageCodeFromXmlPath(xmlFilePath),
            tabFile: normalizeXmlPath(tabFilePath),
            xmlListFile: normalizeXmlPath(xmlListFilePath),
        };

        // Resolve pageBuild payload: try sessionStorage token, inline xmlDetail, or localStorage fallback
        let pageBuild: any = null;

        if (!pageBuild) {
            try {
                const requestSession: SessionInfo = {
                    compLoc: typeof sessionInfo.compLoc === 'string' ? sessionInfo.compLoc : '',
                    userId: typeof sessionInfo.userId === 'string' ? sessionInfo.userId : '',
                    diagnosticMode:
                        typeof sessionInfo.diagnosticMode === 'string'
                            ? sessionInfo.diagnosticMode
                            : '0',
                    policyId: policyId ?? '',
                    nodeKey: nodeKey ?? '',
                    action: action ?? '',
                };

                console.log('[PolicyInformationLoader] ===== CALLING fetchPageBuild =====', {
                    session: requestSession,
                    xmlFileName,
                    action,
                    policyId,
                    pageBuildOptions,
                    hasXmlDetail: !!pageBuildXmlDetail,
                });

                const result = await fetchPageBuild(
                    requestSession,
                    pageBuildXmlDetail,
                    xmlFileName,
                    action ?? 'ADD',
                    policyId,
                    pageBuildOptions,
                );

                console.log('[PolicyInformationLoader] fetchPageBuild result:', {
                    hasStatus: !!result?.status,
                    hasData: !!result?.data,
                });

                if (result?.status && result.data) pageBuild = result.data;
            } catch (e) {
                console.error('[PolicyInformationLoader] fetchPageBuild error:', e);
            }
        }

        if (!pageBuild) {
            try {
                const fallback = getItem<unknown>('landingPageBuild');
                if (fallback) {
                    pageBuild = fallback;
                }
            } catch (e) {
                // ignore
            }
        }

        // Transform + normalize
        const transformed = transformPageBuildResponse(pageBuild);
        const normalized = normalizeServiceConfig(transformed.serviceFields as any);

        // Build tab map from raw controls so we know which tab each matchcode belongs to
        const rawControls = pageBuild?.Page?.controls?.control ?? [];
        const controlArray = ensureArray(rawControls as any);
        const tabMap = new Map<string, string>();
        // Build a static lookup from our authoritative static mapping (if present)
        const staticTabLookup = new Map<string, string>();
        try {
            for (const f of PolicyInformationFields || []) {
                if (f && f.matchcode) staticTabLookup.set(f.matchcode, f.tab);
            }
        } catch (e) {
            // noop
        }

        controlArray.forEach((c: any) => {
            const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
            const t = (c['@tab'] ?? c.tab ?? '')?.toString();
            // Prefer explicit tab from PageBuild; if missing, fall back to our static mapping;
            // otherwise default to TABBIL to preserve previous behavior.
            const resolved = t || staticTabLookup.get(mc) || 'TABBIL';
            if (mc) tabMap.set(mc, resolved);

        });

        const normalizedWithTab = normalized.map((f) => ({
            ...f,
            tab: tabMap.get(f.matchcode || '') ?? 'TABBIL',
        }));

        // Partition by tab
        const normalizedByTab: Record<string, any[]> = {};
        for (const f of normalizedWithTab) {
            const tab = f.tab || 'TABBIL';
            if (!normalizedByTab[tab]) normalizedByTab[tab] = [];
            normalizedByTab[tab].push(f);
        }

        // Defensive fallback: if normalizeServiceConfig produced fields without options,
        // but the original transformed.serviceFields contained listitems/options, copy
        // those options into the normalized fields so selects/combos render correctly.
        try {
            const optionMap = new Map<string, any[]>();
            for (const sf of transformed.serviceFields || []) {
                const mc = (sf.matchcode || sf.id || '')?.toString();
                if (!mc) continue;
                const rawOpts = sf.options || sf.listitems || sf.items || sf.datasource || sf.list;
                if (Array.isArray(rawOpts) && rawOpts.length) optionMap.set(mc, rawOpts);
            }
            for (const arr of Object.values(normalizedByTab)) {
                for (const nf of arr) {
                    if (!nf) continue;
                    const mc = String(nf.matchcode || '');
                    if (!mc) continue;
                    if ((!nf.options || nf.options.length === 0) && optionMap.has(mc)) {
                        const raw = optionMap.get(mc) || [];
                        // normalize to { label, value }
                        const mapped = (raw || []).map((o: any) => {
                            if (!o) return { label: String(o), value: String(o) };
                            if (typeof o === 'object') {
                                return {
                                    label:
                                        (o.label as string) ??
                                        (o.text as string) ??
                                        (o['#text'] as string) ??
                                        String(o.value ?? o.id ?? ''),
                                    value: String(o.value ?? o.id ?? o.key ?? o['@value'] ?? ''),
                                };
                            }
                            return { label: String(o), value: String(o) };
                        });
                        // Deduplicate by label (case-insensitive). Prefer entries where
                        // value !== label (coded values) over label-as-value entries.
                        const labelMap = new Map<string, { label: string; value: string }>();
                        for (const opt of mapped) {
                            const key = String(opt.label || opt.value || '')
                                .trim()
                                .toUpperCase();
                            if (!labelMap.has(key)) {
                                labelMap.set(key, opt);
                                continue;
                            }
                            const existing = labelMap.get(key)!;
                            const existingIsLabelOnly = existing.value === existing.label;
                            const newIsLabelOnly = opt.value === opt.label;
                            // If existing is label-only and new has coded value, prefer new
                            if (existingIsLabelOnly && !newIsLabelOnly) {
                                labelMap.set(key, opt);
                            }
                            // Otherwise keep existing (first-seen)
                        }
                        nf.options = Array.from(labelMap.values());
                    }
                }
            }
        }
    } catch (e) {
        // ignore defensive merge errors
    }
        // Collect controls (buttons / controls with controltype==='button') into controlsByTab
        const controlsByTab: Record<string, any[]> = {};
        for (const c of controlArray) {
            const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
            const tab = (c['@tab'] ?? c.tab ?? 'TABBIL')?.toString();
            const controlType = (c['@controltype'] ?? c.controltype ?? '')
                ?.toString()
                .toLowerCase();
            if (
                controlType === 'button' ||
                (mc &&
                    mc.toUpperCase &&
                    ['OK', 'CANCEL', 'NEXT', 'BACK', 'SUBMIT'].includes(mc.toUpperCase()))
            ) {
                if (!controlsByTab[tab]) controlsByTab[tab] = [];
                controlsByTab[tab].push({
                    matchcode: mc,
                    text: (c['@text'] ?? c.text ?? mc)?.toString(),
                    tab,
                    control: c,
                });
            }
        }

        // initialValuesByTab
        const initialValuesByTab: Record<string, Record<string, unknown>> = {};
        for (const [mc, val] of Object.entries(transformed.defaultValues || {})) {
            const tab = tabMap.get(mc) ?? 'TABBIL';
            if (!initialValuesByTab[tab]) initialValuesByTab[tab] = {};
            initialValuesByTab[tab][mc] = val;
        }

        // tabsOrder: derive from utpOrder if present, else keys of normalizedByTab
        const tabsOrder: string[] = [];
        const seen = new Set<string>();
        for (const mc of transformed.utpOrder || transformed.fieldOrder || []) {
            const tab = tabMap.get(mc) ?? 'TABBIL';
            if (!seen.has(tab)) {
                seen.add(tab);
                tabsOrder.push(tab);
            }
        }
        for (const k of Object.keys(normalizedByTab)) {
            if (!seen.has(k)) {
                seen.add(k);
                tabsOrder.push(k);
            }
        }

        const formKey = JSON.stringify({
            tabs: tabsOrder,
            fields: normalized.map((f) => f.matchcode || ''),
            t: Date.now(),
        });

        const browserCommands = parseBrowserCommandsFromPageBuild(pageBuild || {});

        // Map transformed buttons to tabs (use tabMap if available)
        const pageButtons = (transformed.buttons || []).map((b) => ({
            ...b,
            tab: tabMap.get((b.matchcode || '') as string) ?? 'TABBIL',
        }));

        return data({
            pageBuild,
            xmlFileName,
            xmlFilePath,
            tabFilePath,
            xmlListFilePath,
            normalizedByTab,
            controlsByTab,
            initialValuesByTab,
            tabsOrder,
            formKey,
            browserCommands,
            pageButtons,
            meta: { loaded: true },
        });
    } catch (err) {
        console.error('[policyInformationLoader] error', err);
        return data({
            pageBuild: null,
            xmlFileName: undefined,
            xmlFilePath: undefined,
            tabFilePath: undefined,
            xmlListFilePath: undefined,
            normalizedByTab: {},
            controlsByTab: {},
            initialValuesByTab: {},
            tabsOrder: [],
            formKey: '',
            browserCommands: [],
            meta: { error: String(err) },
        });
    }
}
