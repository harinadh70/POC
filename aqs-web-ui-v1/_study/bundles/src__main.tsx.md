# BUNDLE for src/main.tsx
# 1 photo fragment(s), ascending start-line order.


========== IMG_4328.md ==========
---
photo: IMG_4328.JPG
type: vscode-code
file: aqs-web-ui/src/main.tsx
lines: 1-15
orientation: 180
confidence: high
notes: Full file (only 15 lines, no sticky scroll needed). Explorer sidebar (src/utils) same file list as prior photos; under src/: app.css, app.tsx, context.ts, main.tsx (selected/highlighted, tab "4" indicating 4 unsaved/related items), routes.tsx, store.ts, types.ts (cut off at bottom). Tab bar: only main.tsx open (italicized = preview tab). Status bar: aqs-web-ui, branch hitanshu/experimental*, 6 errors 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > main.tsx.
---
1       import { StrictMode } from 'react';
2       import { createRoot } from 'react-dom/client';
3
4       // global css
5       import '@/app.css';
6
7       // root app
8       import App from '@/app';
9
10      createRoot(document.getElementById('root')!).render(
11          <StrictMode>
12              <App />
13          </StrictMode>,
14      );
15
