import { useMemo } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

import { SessionStoreApi } from '@/stores/session-store';
import { TreeStoreApi } from '@/stores/tree-store';

import type { TreeNode } from '@/types/tree';

// VBS: Eebrowser second_window_onload lines 287-333
// Builds a breadcrumb path label from the tree node ancestry.
//
// Legacy logic:
//   1. Get pagelabelkey from session xmlDetail (fallback: nodeKey)
//   2. If page has no PathLabel control AND pathstart/pathend > 0:
//      Call PathDescription(key, pathstart, pathend) to build text
//   3. Strip "Policy Coverages -" prefix, trim trailing dashes

interface BreadcrumbProps {
    /** pageHeader.pathstart — shallower tree level (1-based, inclusive). */
    pathStart?: number | string;
    /** pageHeader.pathend — deeper tree level (1-based, inclusive). */
    pathEnd?: number | string;
    hasPathLabelControl?: boolean;
}

/** Schema values may arrive as strings ("3") — normalize to a positive int or 0. */
function toLevel(value: number | string | undefined): number {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? Math.trunc(n) : 0;
}

/**
 * Walk up the tree from nodekey to build the ancestor chain.
 * Tree store keeps nodes as a flat map (Record<nodekey, TreeNode>).
 * Returns nodes in root → leaf order.
 */
function buildAncestorChain(
    nodekey: string,
    nodesMap: Partial<Record<string, TreeNode>>,
): TreeNode[] {
    const chain: TreeNode[] = [];
    let current = nodesMap[nodekey];

    while (current) {
        chain.unshift(current);
        current = current.parentKey ? nodesMap[current.parentKey] : undefined;
    }
    return chain;
}

/**
 * VBS PathDescription as an array: ancestor texts between pathStart and
 * pathEnd levels. Strips the "Policy Coverages -" prefix from the first
 * segment and trailing dashes from the last, per the legacy string cleanup.
 */
function pathSegments(chain: TreeNode[], pathStart: number, pathEnd: number): string[] {
    const texts = chain
        .filter((n) => n.level >= pathStart && n.level <= pathEnd)
        .map((n) => n.text.trim())
        .filter(Boolean);

    if (texts.length === 0) return [];

    texts[0] = texts[0].replace(/^Policy Coverages\s*-\s*/i, '').trim();
    const last = texts.length - 1;
    texts[last] = texts[last].replace(/\s*-\s*$/, '').trim();

    return texts.filter(Boolean);
}

function Breadcrumb({ pathStart, pathEnd, hasPathLabelControl = false }: BreadcrumbProps) {
    // Subscribe via hooks (not getState) — the tree loads asynchronously, and
    // the trail must appear once its nodes land in the store.
    const xmlDetail = SessionStoreApi((s) => s.xmlDetail);
    const nodeKey = SessionStoreApi((s) => s.nodeKey);
    const nodes = TreeStoreApi((s) => s.nodes);

    const start = toLevel(pathStart);
    const end = toLevel(pathEnd);

    const segments = useMemo(() => {
        if (hasPathLabelControl || start <= 0 || end <= 0) return [];

        // VBS: strPageLabelKey = SessionXML_GetItem("pagelabelkey"),
        // fallback marrSessionInformation(3) = nodeKey
        const item = xmlDetail.items.find(
            (i) => i.name.toLowerCase() === 'pagelabelkey',
        );
        const pageLabelKey = item?.value || nodeKey;

        const chain = buildAncestorChain(pageLabelKey, nodes);
        return pathSegments(chain, start, end);
    }, [hasPathLabelControl, start, end, xmlDetail, nodeKey, nodes]);

    if (segments.length === 0) return null;

    // Segments are labels, not navigation targets (legacy PathLabel was plain
    // text) — render Typography, not anchor-less Links.
    return (
        <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            sx={{ px: 2, py: 0.5, fontSize: '0.8rem' }}
        >
            {segments.map((seg, idx) => (
                <Typography
                    key={`${idx}-${seg}`}
                    color={idx === segments.length - 1 ? 'text.primary' : 'text.secondary'}
                    sx={{
                        fontSize: 'inherit',
                        fontWeight: idx === segments.length - 1 ? 500 : 400,
                    }}
                >
                    {seg}
                </Typography>
            ))}
        </Breadcrumbs>
    );
}

export { Breadcrumb };
export type { BreadcrumbProps };
