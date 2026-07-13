# BUNDLE for src/providers/tab-context-provider.tsx
# 2 photo fragment(s), ascending start-line order.


========== IMG_3138.md ==========
---
photo: IMG_3138.JPG
type: vscode-code
file: aqs-web-ui/src/providers/tab-context-provider.tsx
lines: 1-33
orientation: 180
confidence: high
notes: >
  Clean, sharp photo (no ghosting/motion blur, unlike IMG_3136/3137). Tab bar shows
  "tab-context-provider.tsx 4" (4 problems). Status bar: "6 errors, 0 warnings", "No Solution",
  branch "hitanshu/experimental*" (dirty), workspace AQS_workspace. Squiggly underline (red,
  likely lint/type warning) visible under "<TabContext.Provider value={{ activeTab, setActiveTab }}>"
  on line 23. Explorer sidebar: pages (login.tsx, page-not-found.tsx, policy-details.tsx,
  PolicyInformationPage.tsx, prp-mlc-sum.tsx (U), root.tsx, UltimateCoverPage.tsx, xsl-test.tsx (U));
  providers (browser-commands-provide..., dialog-provider.tsx, form-provider.tsx,
  global-variable-provider.tsx, tab-context-provider.tsx [selected/highlighted, "4"],
  theme-provider.tsx); services, types (has unsaved-change dot), utils, app.css, app.tsx,
  context.ts, main.tsx, routes.tsx. Whole file (lines 1-33) fits on screen, no folding or sticky
  scroll active here. Timestamp 6:13 PM 7/10/2026.
---
1   import React, { createContext, useContext, useState } from 'react';
2   import type { ReactNode } from 'react';
3
4   interface TabContextValue {
5       activeTab: string;
6       setActiveTab: (tab: string) => void;
7   }
8
9   const TabContext = createContext<TabContextValue | undefined>(undefined);
10
11  interface TabContextProviderProps {
12      initialTab?: string;
13      children: ReactNode;
14  }
15
16  export const TabContextProvider: React.FC<TabContextProviderProps> = ({
17      initialTab = '',
18      children,
19  }) => {
20      const [activeTab, setActiveTab] = useState(initialTab);
21
22      return (
23          <TabContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabContext.Provider>
24      );
25  };
26
27  export const useTabContext = (): TabContextValue => {
28      const context = useContext(TabContext);
29      if (!context) {
30          throw new Error('useTabContext must be used within a TabContextProvider');
31      }
32      return context;
33  };


========== IMG_3139.md ==========
---
photo: IMG_3139.JPG
type: vscode-code
file: aqs-web-ui/src/providers/tab-context-provider.tsx
lines: 1-34
orientation: 180
confidence: medium
notes: >
  Same file/tab as IMG_3138 ("tab-context-provider.tsx 4"), heavy motion-blur double-exposure
  overlaying two near-identical scroll positions (content itself unchanged vs IMG_3138, just the
  photo shows a doubled/offset ghost of every line). Confirms the file is exactly 34 lines (line 34
  is blank/EOF, visible clearly at the bottom in this shot vs. being cut off in IMG_3138). All
  visible/legible text matches IMG_3138 verbatim for lines 1-33. Status bar: "6 errors, 0 warnings",
  "No Solution", branch "hitanshu/experimental*", workspace AQS_workspace. Sidebar unchanged from
  IMG_3138 (tab-context-provider.tsx selected, "4"). Timestamp 6:13 PM 7/10/2026 (same minute as
  IMG_3138, confirming back-to-back/burst shots).
---
1   import React, { createContext, useContext, useState } from 'react';
2   import type { ReactNode } from 'react';
3
4   interface TabContextValue {
5       activeTab: string;
6       setActiveTab: (tab: string) => void;
7   }
8
9   const TabContext = createContext<TabContextValue | undefined>(undefined);
10
11  interface TabContextProviderProps {
12      initialTab?: string;
13      children: ReactNode;
14  }
15
16  export const TabContextProvider: React.FC<TabContextProviderProps> = ({
17      initialTab = '',
18      children,
19  }) => {
20      const [activeTab, setActiveTab] = useState(initialTab);
21
22      return (
23          <TabContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabContext.Provider>
24      );
25  };
26
27  export const useTabContext = (): TabContextValue => {
28      const context = useContext(TabContext);
29      if (!context) {
30          throw new Error('useTabContext must be used within a TabContextProvider');
31      }
32      return context;
33  };
34
