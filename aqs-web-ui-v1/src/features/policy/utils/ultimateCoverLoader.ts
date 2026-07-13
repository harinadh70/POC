import { data } from 'react-router';
import { fetchPageBuild } from '@services/page-build';
import { transformPageBuildResponse } from '@utils/transform-pagebuild-response';
import { normalizeServiceConfig } from '@utils/normalize-service-config';
import { parseBrowserCommandsFromPageBuild } from '@utils/apply-server-commands';
import { getItem } from '@utils/local-storage';

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

// Static request for Ultimate Cover - BOP Policy Ultimate Cover page
// NOTE: action must NOT be 'ADD' or 'RATELEVEL' as fetchPageBuild overrides pageCode for those actions
// Use 'VIEW' to preserve the custom pageCode in the API call
const STATIC_REQUEST = {
    session: {
        compLoc: 'PIPH',
        userId: 'SMALUSAR',
        policyID: '489905',
        nodeKey: 'BOP|POL|0|UCP|0|',
        action: 'VIEW', // Changed from 'ADD' - prevents fetchPageBuild from overriding pageCode
        diagnosticMode: '0',
        sessionItems: {
            'auto approve': 'T',
            discard: 'F',
            issue: 'F',
            submit: 'T',
            compact: 'Firm',
            policystatus: 'In Process',
            sectransactionid: '1',
            rlvlocked: 'False',
            inquiry: 'F',
            historytype: 'FFL',
            transactionid: '1',
        },
    },
    pageCode: 'bop/xml/Pol_PIPHBOP_Ucp_20250201',
    TabFile: '0',
    XMLListFile: 'bop/xml/Pol_PIPHBOP_Ucp_20250201.xml',
};

export async function ultimateCoverLoader({ request }: any) {
    try {
        const url = new URL(String(request.url));
        const search = url.searchParams;
        console.log(
            '[]',
            'ultimateCoverLoader search params:',
            Object.fromEntries(search.entries()),
        );
        // Use STATIC_REQUEST values - ignore session storage and context
        // Override ONLY if explicitly provided in URL query params
        const policyId = search.get('policyId') ?? STATIC_REQUEST.session.policyID;
        const action = search.get('action') ?? STATIC_REQUEST.session.action;
        const nodeKey = search.get('nodeKey') ?? STATIC_REQUEST.session.nodeKey;
        const xmlFileName =
            search.get('xmlFileName') ?? search.get('fileName') ?? 'Pol_PIPHBOP_Ucp_20250201';
        const xmlFilePath = search.get('xmlFilePath') ?? STATIC_REQUEST.pageCode;
        const tabFilePath = search.get('tabFilePath') ?? STATIC_REQUEST.TabFile;
        const xmlListFilePath = search.get('xmlListFilePath') ?? STATIC_REQUEST.XMLListFile;

        const pageBuildOptions = {
            pageCode: normalizePageCodeFromXmlPath(xmlFilePath),
            tabFile: normalizeXmlPath(tabFilePath),
            xmlListFile: normalizeXmlPath(xmlListFilePath),
        };

        let pageBuild: any = null;

        if (!pageBuild) {
            try {
                // Use static session configuration
                const requestSession: SessionInfo = {
                    compLoc: STATIC_REQUEST.session.compLoc,
                    userId: STATIC_REQUEST.session.userId,
                    diagnosticMode: STATIC_REQUEST.session.diagnosticMode,
                    policyId: policyId,
                    nodeKey: nodeKey,
                    action: action,
                };

                const result = await fetchPageBuild(
                    requestSession,
                    STATIC_REQUEST.session.sessionItems as any,
                    xmlFileName,
                    action,
                    policyId,
                    pageBuildOptions,
                );
                if (result?.status && result.data) pageBuild = result.data;
            } catch (e) {
                console.error('[ultimateCoverLoader] fetchPageBuild error:', e);
            }
        }

        // TODO ⟪missing line 119 — not captured in photos⟫
        if (!pageBuild) {
            try {
                const fallback = getItem<unknown>('ultimateCoverPageBuild');
                if (fallback) {
                    pageBuild = fallback;
                }
            } catch (e) {
                console.error('[ultimateCoverLoader] fallback error:', e);
            }
        }
        // Transform + normalize
        const transformed = transformPageBuildResponse(pageBuild);
        const normalized = normalizeServiceConfig(transformed.serviceFields as any);

        // Build tab map from raw controls
        const rawControls = pageBuild?.Page?.controls?.control ?? [];
        const controlArray = ensureArray(rawControls as any);
        const tabMap = new Map<string, string>();

        // Build static lookup from our UltimateCoverFields (if present)
        const staticTabLookup = new Map<string, string>();
        try {
            // Import fields dynamically to avoid circular dependencies
            const { ultimateCoverPolicyTabFields, ultimateCoverDetailsTabFields } =
                await import('@features/policy/ultimate-cover-fields');

            for (const f of ultimateCoverPolicyTabFields || []) {
                if (f && f.matchcode) staticTabLookup.set(f.matchcode, 'TABPOLICY');
            }
            for (const f of ultimateCoverDetailsTabFields || []) {
                if (f && f.matchcode) staticTabLookup.set(f.matchcode, 'TABDET');
            }
        } catch (e) {
            console.error('[ultimateCoverLoader] Error loading field definitions:', e);
        }

        controlArray.forEach((c: any) => {
            const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
            const t = (c['@tab'] ?? c.tab ?? '')?.toString();
            // Prefer explicit tab from PageBuild; otherwise fall back to our static mapping
            const resolved = t || staticTabLookup.get(mc) || 'TABPOLICY';
            if (mc) tabMap.set(mc, resolved);
        });

        const normalizedWithTab = normalized.map((f) => ({
            ...f,
            tab: tabMap.get(f.matchcode || '') ?? 'TABPOLICY',
        }));

        // Partition by tab
        const normalizedByTab: Record<string, any[]> = {};
        for (const f of normalizedWithTab) {
            const tab = f.tab || 'TABPOLICY';
            if (!normalizedByTab[tab]) normalizedByTab[tab] = [];
            normalizedByTab[tab].push(f);
        }

        // Merge options from transformed fields if not present in normalized
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
                            if (existingIsLabelOnly && !newIsLabelOnly) {
                                labelMap.set(key, opt);
                            }
                        }
                        // TODO ⟪missing lines 224-225 — not captured legibly in photos (heavy screen-tear/ghosting artifact in this region; see IMG_2635/IMG_2636 notes)⟫
                    }
                }
                nf.options = Array.from(labelMap.values());
            }
        } catch (e) {
            console.error('[ultimateCoverLoader] Error merging options:', e);
        }
        // Collect controls (buttons)
        const controlsByTab: Record<string, any[]> = {};
        for (const c of controlArray) {
            const mc = (c['@matchcode'] ?? c.matchcode ?? '')?.toString();
            const tab = (c['@tab'] ?? c.tab ?? 'TABPOLICY')?.toString();
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

        // Initial values by tab
        const initialValuesByTab: Record<string, Record<string, unknown>> = {};
        for (const [mc, val] of Object.entries(transformed.defaultValues || {})) {
            const tab = tabMap.get(mc) ?? 'TABPOLICY';
            if (!initialValuesByTab[tab]) initialValuesByTab[tab] = {};
            initialValuesByTab[tab][mc] = val;
        }

        // Tabs order
        const tabsOrder: string[] = [];
        const seen = new Set<string>();
        for (const mc of transformed.utpOrder || transformed.fieldOrder || []) {
            const tab = tabMap.get(mc) ?? 'TABPOLICY';
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

        const pageButtons = (transformed.buttons || []).map((b) => ({
            ...b,
            tab: tabMap.get((b.matchcode || '') as string) ?? 'TABPOLICY',
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
        console.error('[ultimateCoverLoader] error:', err);
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
