// MODIFIED — original: src/stores/tree-store.ts
// GAP #34 — Tree_IsNodeValid (eebrowser.vbs lines 2728-2758):
// adds isNodeValid(nodekey) — O(1) existence check against the flat nodes map.
// Changes are wrapped in GAP markers; everything outside them matches the original.

import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

// types
import type { TreeNode } from '@/types/tree';

// ------------------------------------------------

/**
 * Converts an array to unique values.
 * Note: Keep this outside components to maintain referential stability
 * if used inside selectors.
 */
const toUniqueArray = (values: string[]): string[] => [...new Set(values)];

// define the shape of our tree actions
interface TreeAction {
    setTreeLoaded: (loaded: boolean) => void;
    clearTree: () => void;
    loadTree: (nodes: TreeNode[]) => void;
    addNode: (node: TreeNode) => void;
    selectNode: (nodekey: string | null) => void;
    expandNode: (nodekey: string) => void;
    collapseNode: (nodekey: string) => void;
    toggleExpand: (nodekey: string) => void;
    addNodes: (parentKey: string, nodes: TreeNode[]) => void;
    updateNodeText: (nodekey: string, text: string) => void;
    updateNodeKey: (oldKey: string, newKey: string) => void;
    updateNodeImage: (nodekey: string, image: string) => void;
    removeNode: (nodekey: string) => void;
    resetTree: () => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    // >>> GAP #34: Tree_IsNodeValid (VBS 2728-2758)
    /** True when the nodekey exists in the loaded tree. */
    isNodeValid: (nodekey: string) => boolean;
    // <<< GAP #34
}

// define the shape of our tree state
interface TreeState {
    isTreeLoaded: boolean;
    /** Flat map of all nodes by nodekey for O(1) lookups */
    nodes: Partial<Record<string, TreeNode>>;
    /** Ordered list of root-level node keys */
    rootKeys: string[];
    /** Currently selected node key */
    selectedNodeKey: string | null;
    /** Array of expanded node keys (must be array, not Set, for serialization) */
    expandedKeys: string[];
    /** Loading state */
    isLoading: boolean;
    /** Error message if tree load failed */
    error: string | null;
    actions: TreeAction;
}

const defaultTree: Omit<TreeState, 'actions'> = {
    nodes: {},
    rootKeys: [],
    selectedNodeKey: null,
    expandedKeys: [],
    isLoading: false,
    error: null,
    isTreeLoaded: false,
};

const useTreeStore = create<TreeState>()((set, get) => ({
    ...defaultTree,
    actions: {
        setTreeLoaded: (loaded: boolean) => {
            set({ isTreeLoaded: loaded });
        },
        clearTree: () => {
            set({
                nodes: {},
                rootKeys: [],
                selectedNodeKey: null,
                expandedKeys: [],
                isLoading: false,
                error: null,
                isTreeLoaded: false,
            });
        },
        loadTree: (nodes: TreeNode[]) => {
            if (nodes.length === 0) {
                set({
                    nodes: {},
                    rootKeys: [],
                    selectedNodeKey: null,
                    expandedKeys: [],
                    error: null,
                    isTreeLoaded: true,
                });
                return;
            }

            const nextNodes: Record<string, TreeNode> = {};
            for (const node of nodes) {
                if (!node.nodekey) {
                    continue;
                }

                if (node.nodekey in nextNodes) {
                    console.warn(
                        '[TreeProvider] Duplicate node key during loadTree. Replacing node.',
                        {
                            nodekey: node.nodekey,
                        },
                    );
                }

                nextNodes[node.nodekey] = {
                    ...node,
                    children: toUniqueArray(node.children),
                };
            }

            const rootKeys = nodes
                .filter(
                    (node) =>
                        node.nodekey &&
                        (node.parentKey === null || !(node.parentKey in nextNodes)),
                )
                .map((node) => node.nodekey);

            const expandedKeys = nodes
                .filter((node) => node.nodekey && node.expanded)
                .map((node) => node.nodekey);

            set({
                nodes: nextNodes,
                rootKeys: toUniqueArray(rootKeys),
                selectedNodeKey: null,
                expandedKeys: toUniqueArray(expandedKeys),
                isLoading: false,
                error: null,
                isTreeLoaded: true,
            });
        },
        addNode: (node: TreeNode) => {
            if (!node.nodekey) {
                return;
            }
            set((state) => {
                const nextNodes: Partial<Record<string, TreeNode>> = {
                    ...state.nodes,
                    [node.nodekey]: { ...node, children: toUniqueArray(node.children) },
                };

                const parent = node.parentKey ? state.nodes[node.parentKey] : undefined;
                if (parent && node.parentKey) {
                    nextNodes[node.parentKey] = {
                        ...parent,
                        children: toUniqueArray([...parent.children, node.nodekey]),
                    };
                    return { nodes: nextNodes };
                }

                return {
                    nodes: nextNodes,
                    rootKeys: toUniqueArray([...state.rootKeys, node.nodekey]),
                };
            });
        },
        selectNode: (nodekey: string | null) => {
            set({ selectedNodeKey: nodekey });
        },
        expandNode: (nodekey: string) => {
            set((state) =>
                state.expandedKeys.includes(nodekey)
                    ? state
                    : { expandedKeys: [...state.expandedKeys, nodekey] },
            );
        },
        collapseNode: (nodekey: string) => {
            set((state) => ({
                expandedKeys: state.expandedKeys.filter((key) => key !== nodekey),
            }));
        },
        toggleExpand: (nodekey: string) => {
            set((state) => ({
                expandedKeys: state.expandedKeys.includes(nodekey)
                    ? state.expandedKeys.filter((key) => key !== nodekey)
                    : [...state.expandedKeys, nodekey],
            }));
        },
        addNodes: (parentKey: string, nodes: TreeNode[]) => {
            set((state) => {
                const parent = state.nodes[parentKey];
                if (!parent) {
                    return state;
                }

                const nextNodes: Partial<Record<string, TreeNode>> = { ...state.nodes };
                const childKeys: string[] = [];

                for (const node of nodes) {
                    if (!node.nodekey) {
                        continue;
                    }
                    childKeys.push(node.nodekey);
                    nextNodes[node.nodekey] = {
                        ...node,
                        parentKey,
                        children: toUniqueArray(node.children),
                    };
                }

                nextNodes[parentKey] = {
                    ...parent,
                    children: toUniqueArray([...parent.children, ...childKeys]),
                    hasLazyChildren: false,
                };

                return { nodes: nextNodes };
            });
        },
        updateNodeText: (nodekey: string, text: string) => {
            set((state) => {
                const node = state.nodes[nodekey];
                if (!node) {
                    return state;
                }
                return { nodes: { ...state.nodes, [nodekey]: { ...node, text } } };
            });
        },
        updateNodeKey: (oldKey: string, newKey: string) => {
            set((state) => {
                const node = state.nodes[oldKey];
                if (!node || oldKey === newKey) {
                    return state;
                }

                const nextNodes: Partial<Record<string, TreeNode>> = { ...state.nodes };
                delete nextNodes[oldKey];
                nextNodes[newKey] = { ...node, nodekey: newKey };

                // Re-point the parent's child list and every child's parentKey
                if (node.parentKey) {
                    const parent = nextNodes[node.parentKey];
                    if (parent) {
                        nextNodes[node.parentKey] = {
                            ...parent,
                            children: parent.children.map((key) =>
                                key === oldKey ? newKey : key,
                            ),
                        };
                    }
                }
                for (const childKey of node.children) {
                    const child = nextNodes[childKey];
                    if (child) {
                        nextNodes[childKey] = { ...child, parentKey: newKey };
                    }
                }

                return {
                    nodes: nextNodes,
                    rootKeys: state.rootKeys.map((key) => (key === oldKey ? newKey : key)),
                    expandedKeys: state.expandedKeys.map((key) =>
                        key === oldKey ? newKey : key,
                    ),
                    selectedNodeKey:
                        state.selectedNodeKey === oldKey ? newKey : state.selectedNodeKey,
                };
            });
        },
        updateNodeImage: (nodekey: string, image: string) => {
            set((state) => {
                const node = state.nodes[nodekey];
                if (!node) {
                    return state;
                }
                return { nodes: { ...state.nodes, [nodekey]: { ...node, image } } };
            });
        },
        removeNode: (nodekey: string) => {
            set((state) => {
                const node = state.nodes[nodekey];
                if (!node) {
                    return state;
                }

                const nextNodes: Partial<Record<string, TreeNode>> = { ...state.nodes };
                delete nextNodes[nodekey];

                if (node.parentKey) {
                    const parent = nextNodes[node.parentKey];
                    if (parent) {
                        nextNodes[node.parentKey] = {
                            ...parent,
                            children: parent.children.filter((key) => key !== nodekey),
                        };
                    }
                }

                return {
                    nodes: nextNodes,
                    rootKeys: state.rootKeys.filter((key) => key !== nodekey),
                    expandedKeys: state.expandedKeys.filter((key) => key !== nodekey),
                    selectedNodeKey:
                        state.selectedNodeKey === nodekey ? null : state.selectedNodeKey,
                };
            });
        },
        resetTree: () => {
            set({ ...defaultTree });
        },
        setLoading: (isLoading: boolean) => {
            set({ isLoading });
        },
        setError: (error: string | null) => {
            set({ error });
        },
        // >>> GAP #34: Tree_IsNodeValid (VBS 2728-2758)
        isNodeValid: (nodekey: string) => {
            // Callers pass nodeKeys with or without the trailing pipe ("POL|POL|0|");
            // the flat nodes map is keyed without it.
            const key = nodekey.endsWith('|') ? nodekey.slice(0, -1) : nodekey;
            return Boolean(get().nodes[key]);
        },
        // <<< GAP #34
    },
}));

export type UseTreeStore = typeof useTreeStore;

export const TreeStoreApi = useTreeStore;

export const useTree = () =>
    useTreeStore(
        useShallow((state) => ({
            nodes: state.nodes,
            rootKeys: state.rootKeys,
            selectedNodeKey: state.selectedNodeKey,
            expandedKeys: state.expandedKeys,
            isLoading: state.isLoading,
            error: state.error,
            isTreeLoaded: state.isTreeLoaded,
        })),
    );

export const useTreeActions = () => useTreeStore((state) => state.actions);
