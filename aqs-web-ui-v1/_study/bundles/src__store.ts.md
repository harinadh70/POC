# BUNDLE for src/store.ts
# 2 photo fragment(s), ascending start-line order.


========== IMG_4341.md ==========
---
photo: IMG_4341.JPG
type: vscode-code
file: aqs-web-ui/src/store.ts
lines: 1-27
orientation: 180
confidence: high
notes: Whole file visible (27 lines, ends with blank line 27), crisp/no ghosting. Tab "store.ts" active with modified-lines badge "2". Explorer sidebar (src/ expanded) shows: utils/ (only xml-detail-persistence.ts, zod-error-formatter.ts visible — list appears scrolled/collapsed vs earlier photos), app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts (active), types.ts, then repo-root-level files: .env.development, .env.production, .gitignore, .prettierrc, browser-commands-analy...(truncated, "U" badge = untracked), eslint.config.js, GLOBAL_COMPONENTS_A...(x2 entries, one folder-like one file-like, both "U" badge), index.html (partially cut "..dex.html"). Status bar: branch "hitanshu/experimental*", "No Solution", 4 errors/0 warnings (down from 6 in routes.tsx photos). Window "w00w11dev0067", taskbar clock 19:52 10-07-2026, weather "26°C Mostly cloudy".
---
```
1   import { configureStore } from '@reduxjs/toolkit';
2
3   // types
4   import type { Action, ThunkAction } from '@reduxjs/toolkit';
5
6   // ------------------------------------
7
8   export const store = configureStore({
9       reducer: {},
10  });
11
12  // Infer the type of `store`
13  export type AppStore = typeof store;
14
15  export type RootState = ReturnType<AppStore['getState']>;
16
17  // Infer the `AppDispatch` type from the store itself
18  export type AppDispatch = AppStore['dispatch'];
19
20  // Define a reusable type describing thunk functions
21  export type AppThunk<ThunkReturnType = void> = ThunkAction<
22      ThunkReturnType,
23      RootState,
24      unknown,
25      Action
26  >;
27
```


========== IMG_4342.md ==========
---
photo: IMG_4342.JPG
type: vscode-code
file: aqs-web-ui/src/store.ts
lines: 14-27
orientation: 180
confidence: high
notes: Near-duplicate of IMG_4341 (same store.ts file, same scroll position, no sticky-scroll headers this time — just a second/steadier shot of the same view). Content of lines 14-27 matches IMG_4341 exactly. No ghosting artifact, crisp text. Explorer sidebar identical to IMG_4341's src/ listing. Status bar: branch "hitanshu/experimental*", "No Solution", 4 errors/0 warnings. Window "w00w11dev0067", taskbar clock 19:52 10-07-2026.
---
```
14
15  export type RootState = ReturnType<AppStore['getState']>;
16
17  // Infer the `AppDispatch` type from the store itself
18  export type AppDispatch = AppStore['dispatch'];
19
20  // Define a reusable type describing thunk functions
21  export type AppThunk<ThunkReturnType = void> = ThunkAction<
22      ThunkReturnType,
23      RootState,
24      unknown,
25      Action
26  >;
27
```
