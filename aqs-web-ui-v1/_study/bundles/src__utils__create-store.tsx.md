# BUNDLE for src/utils/create-store.tsx
# 6 photo fragment(s), ascending start-line order.


========== IMG_3564.md ==========
---
photo: IMG_3564.JPG
type: vscode-code
file: aqs-web-ui/src/utils/create-store.tsx
lines: 1-33
orientation: 180
confidence: high
notes: New file (create-store.tsx), clean sharp photo, no ghosting. Editor tab shows "create-store.tsx" with a "4" badge (unsaved-changes indicator, also shown in Explorer next to the file). Explorer shows aqs-web-ui/src/utils path all with orange "modified" dots, control-metadata-extractor.ts also has a red dot (git status). Red breakpoint marker in the gutter on line 27 (the "// Support functional updates..." comment line). Status bar: branch hitanshu/experimental*, 6 errors 0 warnings (up from 2 in the control-metadata-extractor.ts photos), "No Solution". Line 34 just barely visible/cut off at bottom behind status bar (ghost text "subscribers.current.add(callback);" only partially legible, not transcribed with confidence).
---
```
1  import {
2      useRef,
3      createContext,
4      useContext,
5      useCallback,
6      useSyncExternalStore,
7      useMemo,
8  } from 'react';
9
10 // ---------------------------------------
11
12 export default function createStore<Store>(initialState: Store) {
13     type StoreUpdate = Partial<Store> | ((prev: Store) => Partial<Store>);
14
15     function useStoreData(): {
16         get: () => Store;
17         set: (value: StoreUpdate) => void;
18         subscribe: (callback: () => void) => () => void;
19     } {
20         const store = useRef(initialState);
21
22         const get = useCallback(() => store.current, []);
23
24         const subscribers = useRef(new Set<() => void>());
25
26         const set = useCallback((value: StoreUpdate) => {
27             // Support functional updates to avoid stale closure bugs when state depends on previous values.
28             const partialState = typeof value === 'function' ? value(store.current) : value;
29             store.current = { ...store.current, ...partialState };
30             subscribers.current.forEach((callback) => callback());
31         }, []);
32
33         const subscribe = useCallback((callback: () => void) => {
```


========== IMG_3565.md ==========
---
photo: IMG_3565.JPG
type: vscode-code
file: aqs-web-ui/src/utils/create-store.tsx
lines: 12-44
orientation: 180
confidence: high
notes: Mid-scroll motion-blur/ghosting artifact present (same as several control-metadata-extractor.ts photos) across most of the frame, but bottom portion (lines 33-44) is sharp/legible and gutter numbers there are unambiguous. Lines 12-33 duplicate/confirm content already captured cleanly in IMG_3564. Lines 34-44 are new: end of useStoreData (subscribe/return), the UseStoreDataReturnType type alias, and the start of StoreContext. Sidebar: create-store.tsx selected, badge "4" (unsaved changes). Status bar: branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution".
---
```
12 export default function createStore<Store>(initialState: Store) {
13     type StoreUpdate = Partial<Store> | ((prev: Store) => Partial<Store>);
14
15     function useStoreData(): {
16         get: () => Store;
17         set: (value: StoreUpdate) => void;
18         subscribe: (callback: () => void) => () => void;
19     } {
20         const store = useRef(initialState);
21
22         const get = useCallback(() => store.current, []);
23
24         const subscribers = useRef(new Set<() => void>());
25
26         const set = useCallback((value: StoreUpdate) => {
27             // Support functional updates to avoid stale closure bugs when state depends on previous values.
28             const partialState = typeof value === 'function' ? value(store.current) : value;
29             store.current = { ...store.current, ...partialState };
30             subscribers.current.forEach((callback) => callback());
31         }, []);
32
33         const subscribe = useCallback((callback: () => void) => {
34             subscribers.current.add(callback);
35             return () => subscribers.current.delete(callback);
36         }, []);
37
38         return { get, set, subscribe };
39     }
40
41     type UseStoreDataReturnType = ReturnType<typeof useStoreData>;
42
43     const StoreContext = createContext<UseStoreDataReturnType | null>(null);
44     ⟪?⟫
```


========== IMG_3566.md ==========
---
photo: IMG_3566.JPG
type: vscode-code
file: aqs-web-ui/src/utils/create-store.tsx
lines: 12,15,26,28-57
orientation: 180
confidence: high
notes: Triple sticky-scroll header at top shows nested enclosing scope: line 12 "export default function createStore<Store>(initialState: Store) {", line 15 "function useStoreData(): {", line 26 "const set = useCallback((value: StoreUpdate) => {" (this last one is stale/from a different scroll position, not the true current scope - editor body content starts at line 28). Mid-scroll ghosting artifact present throughout (same as other photos in this run). Lines 28-41 duplicate/confirm IMG_3565's clean read. Lines 42-57 cross-checked and confirmed (including the line-56 blank-line uncertainty, now resolved) against the clean, unambiguous read of the same code obtained from IMG_3567. Sidebar: create-store.tsx selected, badge "4". Status bar: branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution".
---
```
12 export default function createStore<Store>(initialState: Store) {   [sticky-scroll header]
15     function useStoreData(): {   [sticky-scroll header]
26         const set = useCallback((value: StoreUpdate) => {   [sticky-scroll header, stale]
...
28             const partialState = typeof value === 'function' ? value(store.current) : value;
29             store.current = { ...store.current, ...partialState };
30             subscribers.current.forEach((callback) => callback());
31         }, []);
32
33         const subscribe = useCallback((callback: () => void) => {
34             subscribers.current.add(callback);
35             return () => subscribers.current.delete(callback);
36         }, []);
37
38         return { get, set, subscribe };
39     }
40
41     type UseStoreDataReturnType = ReturnType<typeof useStoreData>;
42
43     const StoreContext = createContext<UseStoreDataReturnType | null>(null);
44
45     function Provider({ children }: { children: React.ReactNode }) {
46         return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
47     }
48
49     function useStore<SelectorOutput>(
50         selector: (store: Store) => SelectorOutput,
51     ): [SelectorOutput, (value: StoreUpdate) => void] {
52         const store = useContext(StoreContext);
53         if (!store) {
54             throw new Error('Store not found');
55         }
56
57         const state = useSyncExternalStore(
```


========== IMG_3567.md ==========
---
photo: IMG_3567.JPG
type: vscode-code
file: aqs-web-ui/src/utils/create-store.tsx
lines: 12,49-81
orientation: 180
confidence: high
notes: Sticky-scroll header at top shows nested enclosing scope: line 12 "export default function createStore<Store>(initialState: Store) {" and line 49 "function useStore<SelectorOutput>(" plus a partially-visible/overlapped third sticky line for the "selector: (store: Store) => SelectorOutput," parameter (line 50, grayed and cut by line 51's content). Clean, sharp screenshot with NO motion-blur/ghosting - resolves the line-56-blank-line ambiguity noted in IMG_3566 (confirmed blank). Shows the rest of useStore (useSyncExternalStore call, return) and the start of a large JSDoc comment block for a new exported hook (useMemoizedSelector, based on the doc text and @example - name not yet visible, function signature would follow after line 81). Sidebar: create-store.tsx selected, badge "4". Status bar: branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution".
---
```
12 export default function createStore<Store>(initialState: Store) {   [sticky-scroll header]
49     function useStore<SelectorOutput>(   [sticky-scroll header]
50         selector: (store: Store) => SelectorOutput,   [sticky-scroll header, partially overlapped]
51     ): [SelectorOutput, (value: StoreUpdate) => void] {
52         const store = useContext(StoreContext);
53         if (!store) {
54             throw new Error('Store not found');
55         }
56
57         const state = useSyncExternalStore(
58             store.subscribe,
59             () => selector(store.get()),
60             () => selector(initialState),
61         );
62
63         return [state, store.set];
64     }
65
66     /**
67      * Memoized selector hook for optimized state selection
68      *
69      * Use this when selecting derived or computed state that should be memoized
70      * to prevent unnecessary recalculations on every render.
71      *
72      * @param selector - Function to select/compute state slice
73      * @param deps - Optional dependency array for memoization (defaults to selected state)
74      * @returns Memoized selected state value
75      *
76      * @example
77      * ```tsx
78      * // Select and memoize computed value
79      * const totalPrice = useMemoizedSelector(
80      *     (store) => store.items.reduce((sum, item) => sum + item.price, 0)
81      * );
```


========== IMG_3568.md ==========
---
photo: IMG_3568.JPG
type: vscode-code
file: aqs-web-ui/src/utils/create-store.tsx
lines: 65-97 (sticky scroll shows line 12)
orientation: 180
confidence: high
notes: Sticky scroll header at top shows line 12 "export default function createStore<Store>(initialState: Store) {". Explorer sidebar shows aqs-web-ui/src tree expanded: providers (theme-provider.tsx), services (lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts), types (grid-response.ts - has "U" modified indicator), utils (api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa... truncated, button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx [selected/highlighted, has "4" badge], detect-modal-type.ts). Tab bar shows only create-store.tsx open (with "4" unsaved-editor-group indicator). Status bar: aqs-web-ui, branch hitanshu/experimental*, "No Solution", 6 errors/0 warnings (red circle with 6, triangle with 0). Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 6:21 PM 7/10/2026.
---
Sticky scroll (line 12):
12  export default function createStore<Store>(initialState: Store) {

65
66      /**
67       * Memoized selector hook for optimized state selection
68       *
69       * Use this when selecting derived or computed state that should be memoized
70       * to prevent unnecessary recalculations on every render.
71       *
72       * @param selector - Function to select/compute state slice
73       * @param deps - Optional dependency array for memoization (defaults to selected state)
74       * @returns Memoized selected state value
75       *
76       * @example
77       * ```tsx
78       * // Select and memoize computed value
79       * const totalPrice = useMemoizedSelector(
80       *   (store) => store.items.reduce((sum, item) => sum + item.price, 0)
81       * );
82       *
83       * // The selector result is automatically memoized based on state changes
84       * ```
85       */
86      function useMemoizedSelector<SelectorOutput>(
87          selector: (store: Store) => SelectorOutput,
88      ): SelectorOutput {
89          const store = useContext(StoreContext);
90          if (!store) {
91              throw new Error('Store not found');
92          }
93
94          // Use useSyncExternalStore which already handles memoization efficiently
95          // It only triggers re-renders when the selected state actually changes
96          const state = useSyncExternalStore(
97              store.subscribe,


========== IMG_3569.md ==========
---
photo: IMG_3569.JPG
type: vscode-code
file: aqs-web-ui/src/utils/create-store.tsx
lines: 84-109 (sticky scroll shows line 12)
orientation: 180
confidence: high
notes: Continuation of same file/tab as IMG_3568, scrolled down further. Sticky scroll header still shows line 12 "export default function createStore<Store>(initialState: Store) {". This appears to be the end of the file (line 109 closes final brace, no more content below). Explorer sidebar same tree as IMG_3568: utils folder expanded with create-store.tsx selected. Status bar: aqs-web-ui, branch hitanshu/experimental*, "No Solution", 6 errors/0 warnings. Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Time 6:21 PM 7/10/2026.
---
Sticky scroll (line 12):
12  export default function createStore<Store>(initialState: Store) {

84       * ```
85       */
86      function useMemoizedSelector<SelectorOutput>(
87          selector: (store: Store) => SelectorOutput,
88      ): SelectorOutput {
89          const store = useContext(StoreContext);
90          if (!store) {
91              throw new Error('Store not found');
92          }
93
94          // Use useSyncExternalStore which already handles memoization efficiently
95          // It only triggers re-renders when the selected state actually changes
96          const state = useSyncExternalStore(
97              store.subscribe,
98              () => selector(store.get()),
99              () => selector(initialState),
100         );
101
102         // Wrap in useMemo to prevent recalculation when component re-renders
103         // but the selected state hasn't changed
104         return useMemo(() => state, [state]);
105     }
106
107     return { Provider, useStore, useMemoizedSelector };
108 }
109
