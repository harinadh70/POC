import { TreeStoreApi } from '@/stores/tree-store';
import { SessionStoreApi } from '@/stores/session-store';
import { postRaw } from '@/services/ee-call';
import { confirmDialog } from '@utils/confirm';

// VBS: Main_ISLLSYS #19 DeleteAction (lines 1045-1362)
// Confirm -> server DELETE -> remove node from tree -> refresh dependent
// sibling branches (per-LOB table) -> navigate to the parent node.

// Legacy kept a per-LOB table of branches to refresh after a delete
// (e.g. deleting a vehicle refreshes drivers + coverages). Fill in per LOB
// as pages come online; keys are nodeKey prefixes.
const BRANCH_REFRESH: Record<string, string[]> = {
    // 'CAU': ['CAU|VEH', 'CAU|DRV'],
    // 'BOP': ['BOP|LOC'],
};

export interface DeleteActionDeps {
    /** Navigate after delete — pass the router's navigate function. */
    navigate?: (to: string | number) => void;
    /** Refetch a tree branch from the server (tree-actions.refetchBranch). */
    refetchBranch?: (branchKey: string) => Promise<void>;
}

/**
 * Execute the legacy delete flow for a tree node.
 * Returns true when the node was deleted.
 */
export async function executeDeleteAction(
    nodeKey: string,
    deps: DeleteActionDeps = {},
): Promise<boolean> {
    const tree = TreeStoreApi.getState();
    const node = tree?.nodes?.[nodeKey];
    const label = (node as { text?: string } | undefined)?.text ?? nodeKey;

    // 1. Confirm (legacy: "Are you sure you want to delete ...?")
    const confirmed = await confirmDialog(
        `Are you sure you want to delete "${label}"?`,
    );
    if (!confirmed) return false;

    // 2. Server call
    const session = SessionStoreApi.getState();
    const payload = {
        ...((session?.actions?.toPayload?.() as object) ?? {}),
        action: 'DELETE',
        nodeKey,
    };
    const response = await postRaw(payload);
    if (response === null) return false; // ee-call not configured — no-op

    // 3. Remove from tree (defensive: action name per client branch)
    const treeActions = TreeStoreApi.getState()?.actions as
        | { removeNode?: (key: string) => void }
        | undefined;
    treeActions?.removeNode?.(nodeKey);

    // 4. Refresh dependent branches for this LOB
    const lobPrefix = nodeKey.split('|')[0] ?? '';
    const branches = BRANCH_REFRESH[lobPrefix] ?? [];
    if (deps.refetchBranch) {
        await Promise.all(branches.map((b) => deps.refetchBranch!(b)));
    }

    // 5. Navigate to parent (legacy selected the parent node)
    const parentKey = nodeKey.split('|').slice(0, -1).join('|');
    if (deps.navigate && parentKey) {
        deps.navigate(-1); // simplest: back; swap for parent route if mapped
    }

    return true;
}

export default executeDeleteAction;
