// ============================================================================
// GAP #30: PathDescription (VBS lines 2424-2490)
// ============================================================================
//
// VBS BEHAVIOR:
//   Function PathDescription(strNodeKey, intPathStart, intPathEnd) walks
//   the TreeView's ancestor chain from strNodeKey up to the root, collects
//   node text (level titles), then slices between intPathStart and intPathEnd
//   (1-based inclusive level indices). Segments are joined with " > " and
//   cleaned: "Policy Coverages -" prefix stripped, trailing dashes removed.
//   Result is written into the mstrPathLabel session variable and displayed
//   in a span near the page header.
//
// REAL POC STATUS:
//   - mstrPathLabel is stored in session-store from the cycling API response
//     (pathLabel field parsed from PageNavigationResponseSchema).
//   - The 1_frame-title.ts gap file adds `pathLabel` to the session store and
//     a `useFrameTitle()` hook that writes document.title from it.
//   - The changes/src/components/breadcrumb.tsx file (already written) has the
//     FULL tree-walking logic (buildAncestorChain + pathSegments). It reads
//     pathStart/pathEnd from schema.pageHeader and walks tree-store nodes.
//   - Static-renderer.tsx already renders <Breadcrumb /> with the right props.
//   - BUT: there is no standalone, reusable Breadcrumb that reads pathLabel
//     from session-store directly (the existing one only walks the tree). Some
//     pages set pathLabel via the cycling response WITHOUT tree ancestry.
//
// FIX:
//   A simpler PathLabelBreadcrumb component that reads the pathLabel string
//   from session-store, splits on " > ", and renders MUI Breadcrumbs. This
//   covers pages where the server sends pathLabel directly. Falls back to
//   tree-walking via the existing Breadcrumb when pathLabel is empty.
//
// WHERE TO ADD: src/components/ui/path-label-breadcrumb.tsx
// WIRE INTO: header.tsx or static-renderer.tsx (alongside the tree-walking
//            Breadcrumb, which handles the pathStart/pathEnd case)
// ============================================================================

import { useMemo } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

import { SessionStoreApi } from '@/stores/session-store';
import { TreeStoreApi } from '@/stores/tree-store';

import type { TreeNode } from '@/types/tree';

// ---------------------------------------------------------------------------
// PathLabelBreadcrumb — reads pathLabel string from session-store
// ---------------------------------------------------------------------------
// This is the SIMPLE path: when the cycling API response includes a pathLabel
// string (e.g. "Policy > Vehicles > 2019 Honda Civic"), just split and render.
// Falls back to tree-walking when pathLabel is empty but nodeKey is set.

/**
 * Walk tree-store ancestors from nodeKey to root, return node texts in
 * root-to-leaf order. Used as fallback when pathLabel string is empty.
 */
function buildAncestorTexts(
    nodeKey: string,
    nodes: Partial<Record<string, TreeNode>>,
): string[] {
    const chain: string[] = [];
    let current = nodes[nodeKey];

    while (current) {
        // Prepend so result is root -> leaf order
        if (current.text?.trim()) {
            chain.unshift(current.text.trim());
        }
        current = current.parentKey ? nodes[current.parentKey] : undefined;
    }
    return chain;
}

/**
 * PathLabelBreadcrumb
 *
 * Renders a breadcrumb trail from session-store's pathLabel string.
 *
 * Resolution order:
 *   1. If session.pathLabel is non-empty, split on " > " delimiter
 *   2. Else if session.nodeKey exists in tree-store, walk ancestors
 *   3. Else render nothing
 *
 * Usage:
 *   <PathLabelBreadcrumb />
 *
 * For the schema-driven pathStart/pathEnd approach, use the existing
 * <Breadcrumb pathStart={n} pathEnd={n} /> from src/components/breadcrumb.tsx.
 */
export function PathLabelBreadcrumb() {
    // Subscribe reactively — breadcrumb updates when navigation completes
    // and session-store receives a new pathLabel from the cycling response.
    const pathLabel = SessionStoreApi((s) => s.pathLabel);
    const nodeKey = SessionStoreApi((s) => s.nodeKey);
    const nodes = TreeStoreApi((s) => s.nodes);

    const segments = useMemo(() => {
        // Primary: server-provided pathLabel string
        if (pathLabel && pathLabel.trim().length > 0) {
            return pathLabel
                .split(/\s*>\s*/)
                .map((s) => s.trim())
                .filter(Boolean);
        }

        // Fallback: walk tree-store ancestors from current nodeKey
        if (nodeKey && nodes) {
            return buildAncestorTexts(nodeKey, nodes);
        }

        return [];
    }, [pathLabel, nodeKey, nodes]);

    // Nothing to show — render nothing (no empty Breadcrumbs container)
    if (segments.length === 0) return null;

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

export default PathLabelBreadcrumb;

// ---------------------------------------------------------------------------
// INTEGRATION NOTES
// ---------------------------------------------------------------------------
//
// 1. In header.tsx or static-renderer.tsx, import and render:
//
//      import { PathLabelBreadcrumb } from '@/components/ui/path-label-breadcrumb';
//
//      // Render above the page content, below the header nav bar:
//      <PathLabelBreadcrumb />
//
// 2. The existing <Breadcrumb pathStart={...} pathEnd={...} /> in
//    static-renderer.tsx handles the TREE-WALKING case (schema-driven
//    pathStart/pathEnd). PathLabelBreadcrumb handles the SIMPLER case
//    where the server sends a flat pathLabel string. Use ONE or the OTHER
//    per page — the schema determines which:
//
//      {schema?.pageHeader?.pathstart
//          ? <Breadcrumb pathStart={...} pathEnd={...} hasPathLabelControl={...} />
//          : <PathLabelBreadcrumb />
//      }
//
// 3. pathLabel is set in session-store by the cycling response handler
//    (see 1_frame-title.ts STEP 2). No additional wiring needed — the
//    component subscribes reactively via SessionStoreApi hook.
