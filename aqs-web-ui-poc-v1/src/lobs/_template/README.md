# Adding a new Line of Business (LOB 2 … 156)

This is the entire cost of onboarding a new LOB. **No engine code changes.**

## 1. Create the config folder

```
src/lobs/<lob>/<lob>-config.ts
```

Export a `LobDefinition`:

```ts
import type { LobDefinition, PageConfig } from '@/types';

const somePage: PageConfig = {
  pageId: 'some-page',
  title: 'Some Page',
  version: '2026.01.01',
  strategy: 'dynamic',        // or 'static' / 'hybrid'
  gridListNames: ['UC_SOME_LIST'],
  permissions: ['SOME_VIEW'],
};

export const myLob: LobDefinition = {
  code: 'XYZ',
  name: 'My Line of Business',
  navPrefix: 'XYZ',
  status: 'active',
  pages: { 'some-page': somePage },
};
```

## 2. Register it

Add one line to `src/lobs/registry.ts`:

```ts
import { myLob } from './xyz/xyz-config';
// ...
export const LOB_REGISTRY = [ policyLob, myLob, /* … */ ];
```

## 3. Point the backend at its pages

The `dynamic` strategy needs nothing else — the PageBuild API drives the UI.
For `static` / `hybrid`, add the page's static schema controls to its `PageConfig`.

That's it. Routing, rendering, events, modals, grids, state, and the command
loop are all provided by the shared engine.
