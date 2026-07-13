import {
    useRef,
    createContext,
    useContext,
    useCallback,
    useSyncExternalStore,
    useMemo,
} from 'react';

// ---------------------------------------

export default function createStore<Store>(initialState: Store) {
    type StoreUpdate = Partial<Store> | ((prev: Store) => Partial<Store>);

    function useStoreData(): {
        get: () => Store;
        set: (value: StoreUpdate) => void;
        subscribe: (callback: () => void) => () => void;
    } {
        const store = useRef(initialState);

        const get = useCallback(() => store.current, []);

        const subscribers = useRef(new Set<() => void>());

        const set = useCallback((value: StoreUpdate) => {
            // Support functional updates to avoid stale closure bugs when state depends on previous values.
            const partialState = typeof value === 'function' ? value(store.current) : value;
            store.current = { ...store.current, ...partialState };
            subscribers.current.forEach((callback) => callback());
        }, []);

        const subscribe = useCallback((callback: () => void) => {
            subscribers.current.add(callback);
            return () => subscribers.current.delete(callback);
        }, []);

        return { get, set, subscribe };
    }

    type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

    const StoreContext = createContext<UseStoreDataReturnType | null>(null);

    function Provider({ children }: { children: React.ReactNode }) {
        return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
    }

    function useStore<SelectorOutput>(
        selector: (store: Store) => SelectorOutput,
    ): [SelectorOutput, (value: StoreUpdate) => void] {
        const store = useContext(StoreContext);
        if (!store) {
            throw new Error('Store not found');
        }

        const state = useSyncExternalStore(
            store.subscribe,
            () => selector(store.get()),
            () => selector(initialState),
        );

        return [state, store.set];
    }

    /**
     * Memoized selector hook for optimized state selection
     *
     * Use this when selecting derived or computed state that should be memoized
     * to prevent unnecessary recalculations on every render.
     *
     * @param selector - Function to select/compute state slice
     * @param deps - Optional dependency array for memoization (defaults to selected state)
     * @returns Memoized selected state value
     *
     * @example
     * ```tsx
     * // Select and memoize computed value
     * const totalPrice = useMemoizedSelector(
     *     (store) => store.items.reduce((sum, item) => sum + item.price, 0)
     * );
     *
     * // The selector result is automatically memoized based on state changes
     * ```
     */
    function useMemoizedSelector<SelectorOutput>(
        selector: (store: Store) => SelectorOutput,
    ): SelectorOutput {
        const store = useContext(StoreContext);
        if (!store) {
            throw new Error('Store not found');
        }

        // Use useSyncExternalStore which already handles memoization efficiently
        // It only triggers re-renders when the selected state actually changes
        const state = useSyncExternalStore(
            store.subscribe,
            () => selector(store.get()),
            () => selector(initialState),
        );

        // Wrap in useMemo to prevent recalculation when component re-renders
        // but the selected state hasn't changed
        return useMemo(() => state, [state]);
    }

    return { Provider, useStore, useMemoizedSelector };
}
