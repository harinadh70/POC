import { TreeStoreApi } from '@/stores/tree-store';

// VBS: Main_ISLLSYS #18 RefreshTree      (lines 1032-1039)
//    + #34 Tree_IsNodeValid (lines 2741-2758)
//    + #35 Tree_SelectNode  (lines 2761-2779)
//    + #84 SetIconImages    (lines 9026-9036)
// Thin wrappers over the client branch's tree-store, defensive about its
// exact action names (R4). Configure the branch fetcher once at startup:
//   configureTreeFetch((branchKey) => treeService.fetchBranch(branchKey));

type TreeActionsShape = {
    selectNode?: (key: string | null) => void;
    removeNode?: (key: string) => void;
    updateNodeImage?: (key: string, image: string) => void;
    loadTree?: (nodes: unknown[]) => void;
    addNodes?: (parentKey: string, nodes: unknown[]) => void;
};

let branchFetcher: ((branchKey: string) => Promise<unknown[]>) | null = null;

export function configureTreeFetch(fetcher: (branchKey: string) => Promise<unknown[]>): void {
    branchFetcher = fetcher;
}

/** #34: does the node exist in the tree? */
export function hasNode(nodeKey: string): boolean {
    return Boolean(TreeStoreApi.getState()?.nodes?.[nodeKey]);
}

/** #35: select a node and (optionally) navigate to its page. */
export function selectNodeAndNavigate(
    nodeKey: string,
    navigate?: (nodeKey: string) => void,
): void {
    const actions = TreeStoreApi.getState()?.actions as TreeActionsShape | undefined;
    actions?.selectNode?.(nodeKey);
    navigate?.(nodeKey);
}

/** #84: update a node's icon image. */
export function updateNodeIcon(nodeKey: string, image: string): void {
    const actions = TreeStoreApi.getState()?.actions as TreeActionsShape | undefined;
    actions?.updateNodeImage?.(nodeKey, image);
}

/** #18: refetch a branch from the server and merge it under its parent. */
export async function refetchBranch(branchKey: string): Promise<void> {
    if (!branchFetcher) {
        console.warn('[tree-actions] configureTreeFetch not called — refetch skipped.');
        return;
    }
    const nodes = await branchFetcher(branchKey);
    const actions = TreeStoreApi.getState()?.actions as TreeActionsShape | undefined;
    actions?.addNodes?.(branchKey, nodes);
}
