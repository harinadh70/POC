// ---------------------------------------------
// GAP #30 — PathDescription (VBS 2424-2490)
// NEW FILE — target: src/components/ui/breadcrumb.tsx
// Renders the legacy " > " path as MUI Breadcrumbs from session-store
// pathLabel (legacy mstrPathLabel, stamped by the cycling response — GAP #17
// companion change); falls back to walking tree-store ancestors from the
// current nodeKey when pathLabel is empty.
// ---------------------------------------------

import { useMemo } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';

// store
import { usePathLabel, useSession } from '@stores/session-store';
import { useTree } from '@stores/tree-store';

// types
import type { TreeNode } from '@/types/tree';

// ---------------------------------------
// Breadcrumb — legacy PathDescription equivalent.
// ---------------------------------------

const PATH_SEPARATOR = ' > ';

/** Cycle guard for malformed parentKey chains */
const MAX_ANCESTOR_DEPTH = 25;

/** Tree keys may or may not carry the trailing pipe — try both forms. */
function resolveTreeNode(
	nodes: Partial<Record<string, TreeNode>>,
	nodeKey: string,
): TreeNode | undefined {
	const trimmed = nodeKey.endsWith('|') ? nodeKey.slice(0, -1) : nodeKey;
	return nodes[nodeKey] ?? nodes[trimmed] ?? nodes[`${trimmed}|`];
}

/**
 * Fallback path — walks tree-store ancestors from the current node up to the
 * root via parentKey links and returns labels in root-first order.
 * Mirrors the legacy PathDescription ancestor walk (VBS 2424-2490).
 */
function walkAncestorLabels(
	nodes: Partial<Record<string, TreeNode>>,
	nodeKey: string,
): string[] {
	const labels: string[] = [];
	let current = resolveTreeNode(nodes, nodeKey);
	let depth = 0;

	while (current && depth < MAX_ANCESTOR_DEPTH) {
		labels.unshift(current.text);
		current = current.parentKey ? resolveTreeNode(nodes, current.parentKey) : undefined;
		depth += 1;
	}

	return labels;
}

function Breadcrumb() {
	// pathLabel (legacy mstrPathLabel) is stamped on session-store from the
	// cycling response by the GAP #17 session-store change.
	const pathLabel = usePathLabel();
	const { nodeKey } = useSession();
	const { nodes: treeNodes } = useTree();

	const segments = useMemo(() => {
		const serverPath = pathLabel.trim();
		if (serverPath.length > 0) {
			return serverPath
				.split(PATH_SEPARATOR)
				.map((segment) => segment.trim())
				.filter((segment) => segment.length > 0);
		}
		// Server sent no path — rebuild it from tree-store ancestors
		return walkAncestorLabels(treeNodes, nodeKey);
	}, [pathLabel, treeNodes, nodeKey]);

	if (segments.length === 0) {
		return null;
	}

	return (
		<Breadcrumbs separator=">" aria-label="breadcrumb">
			{segments.map((segment, index) => (
				<Typography
					key={`${segment}-${String(index)}`}
					variant="body2"
					color={index === segments.length - 1 ? 'text.primary' : 'text.secondary'}
				>
					{segment}
				</Typography>
			))}
		</Breadcrumbs>
	);
}

export { Breadcrumb };
