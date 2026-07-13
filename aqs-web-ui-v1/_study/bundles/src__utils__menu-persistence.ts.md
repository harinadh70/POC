# BUNDLE for src/utils/menu-persistence.ts
# 8 photo fragment(s), ascending start-line order.


========== IMG_3833.md ==========
---
photo: IMG_3833.JPG
type: vscode-code
file: aqs-web-ui/src/utils/menu-persistence.ts
lines: 1-27
orientation: 180
confidence: high
notes: Explorer sidebar (utils folder) shows sibling files - dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts (selected/highlighted), normalize-service-config cop... (likely "copy", possibly a stray duplicate file), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts (list continues below fold). Tab bar shows only menu-persistence.ts open. Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings. Workspace name "AQS_workspace (Workspace)". Breadcrumb: aqs-web-ui > src > utils > menu-persistence.ts > ...
---
1   const MENU_STORAGE_KEY = 'aqs_menu_data';
2
3   export interface PersistedMenuInfo {
4       menus: unknown[];
5       queryString: string;
6   }
7
8   export interface PersistedMenuData {
9       menuInfo: PersistedMenuInfo;
10      timestamp: number;
11      userId: string;
12      compLoc: string;
13  }
14
15  type MenuStorageShape = Record<string, PersistedMenuData>;
16
17  function createStorageEntryKey(userId: string, compLoc: string): string {
18      return `${userId}::${compLoc}`;
19  }
20
21  function readStorage(): MenuStorageShape {
22      try {
23          const raw = localStorage.getItem(MENU_STORAGE_KEY);
24          if (!raw) {
25              return {};
26          }
27


========== IMG_3834.md ==========
---
photo: IMG_3834.JPG
type: vscode-code
file: aqs-web-ui/src/utils/menu-persistence.ts
lines: 8-37
orientation: 180
confidence: medium
notes: Photo exhibits strong motion-blur "ghosting" (VS Code was mid smooth-scroll animation when the shutter fired) — most rows show two overlapping line-number/text layers offset by ~3 lines. Lines 8-27 were cross-checked against the clean IMG_3833 capture of the same file and are high-confidence; lines 28-37 (new content beyond what IMG_3833 showed) were reconstructed from the least-blurred crops and standard try/catch control flow, so exact line-number attribution there is medium confidence (content itself is legible/consistent across crops). Explorer sidebar and tab bar identical to IMG_3833 (menu-persistence.ts selected, siblings parse-querystring-params.ts, parse-permissions.ts, parse-info-xml.ts, parse-combo-items.ts, normalize-service-config.ts, normalize-service-config cop..., logger-builder.ts, local-storage.ts, legacy-xml-detail.ts, http-instance.ts, frame-router.ts, form.ts, fallback-strategies.ts, execute-action.ts, error-handlers.ts, dynamic-form-actions.ts). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings. Breadcrumb: aqs-web-ui > src > utils > menu-persistence.ts > ...
---
8   export interface PersistedMenuData {
9       menuInfo: PersistedMenuInfo;
10      timestamp: number;
11      userId: string;
12      compLoc: string;
13  }
14
15  type MenuStorageShape = Record<string, PersistedMenuData>;
16
17  function createStorageEntryKey(userId: string, compLoc: string): string {
18      return `${userId}::${compLoc}`;
19  }
20
21  function readStorage(): MenuStorageShape {
22      try {
23          const raw = localStorage.getItem(MENU_STORAGE_KEY);
24          if (!raw) {
25              return {};
26          }
27
28          const parsed = JSON.parse(raw) as unknown;
29          if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
30              return {};
31          }
32          return parsed as MenuStorageShape;
33      } catch (error) {
34          console.error('[menu-persistence] Failed reading menu storage', error);
35          return {};
36      }
37  }


========== IMG_3835.md ==========
---
photo: IMG_3835.JPG
type: vscode-code
file: aqs-web-ui/src/utils/menu-persistence.ts
lines: 21-48
orientation: 180
confidence: high
notes: Mild motion-blur ghosting present (faint duplicate text layer behind the sharp text, same artifact as IMG_3834) but the sharp/bold layer is fully legible and confirms the line-28-37 reconstruction made from IMG_3834. Sticky-scroll header pins line 21 "function readStorage(): MenuStorageShape {"; line 22 "try {" scrolled above it and is not re-shown (already captured in IMG_3833/3834). Explorer sidebar identical to prior photos of this file (menu-persistence.ts selected, siblings dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, normalize-service-config cop..., normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings. Line 48 (export function setMenuData) is the last line visible; its body is below the visible editor area / cut off.
---
21  function readStorage(): MenuStorageShape {
        (line 22 "try {" — off-screen above sticky header, see IMG_3833/3834)
23          const raw = localStorage.getItem(MENU_STORAGE_KEY);
24          if (!raw) {
25              return {};
26          }
27
28          const parsed = JSON.parse(raw) as unknown;
29          if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
30              return {};
31          }
32
33          return parsed as MenuStorageShape;
34      } catch (error) {
35          console.error('[menu-persistence] Failed reading menu storage', error);
36          return {};
37      }
38  }
39
40  function writeStorage(data: MenuStorageShape): void {
41      try {
42          localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(data));
43      } catch (error) {
44          console.error('[menu-persistence] Failed writing menu storage', error);
45      }
46  }
47
48  export function setMenuData(userId: string, compLoc: string, menuInfo: PersistedMenuInfo): void {


========== IMG_3836.md ==========
---
photo: IMG_3836.JPG
type: vscode-code
file: aqs-web-ui/src/utils/menu-persistence.ts
lines: 21-51
orientation: 180
confidence: high
notes: Same motion-blur ghosting artifact as IMG_3834/3835 (faint duplicate text layer offset a few lines behind the sharp layer) but the sharp/bold layer is fully legible throughout and matches prior photos for lines 21-48. New content beyond what IMG_3835 showed is lines 49-51 (body of setMenuData). Explorer sidebar identical to prior photos (menu-persistence.ts selected). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
---
21  function readStorage(): MenuStorageShape {
        (line 22 "try {" — off-screen above sticky header, see IMG_3833/3834)
23          const raw = localStorage.getItem(MENU_STORAGE_KEY);
24          if (!raw) {
25              return {};
26          }
27
28          const parsed = JSON.parse(raw) as unknown;
29          if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
30              return {};
31          }
32
33          return parsed as MenuStorageShape;
34      } catch (error) {
35          console.error('[menu-persistence] Failed reading menu storage', error);
36          return {};
37      }
38  }
39
40  function writeStorage(data: MenuStorageShape): void {
41      try {
42          localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(data));
43      } catch (error) {
44          console.error('[menu-persistence] Failed writing menu storage', error);
45      }
46  }
47
48  export function setMenuData(userId: string, compLoc: string, menuInfo: PersistedMenuInfo): void {
49      if (!userId || !compLoc) {
50          return;
51      }


========== IMG_3837.md ==========
---
photo: IMG_3837.JPG
type: vscode-code
file: aqs-web-ui/src/utils/menu-persistence.ts
lines: 21-61 (49-61 new; 21-48 repeat of IMG_3835/3836, cross-checked)
orientation: 180
confidence: medium
notes: Same motion-blur/scroll-animation ghosting artifact as prior photos of this file (faint duplicate text layer offset a few lines behind the sharp layer). This photo's own capture of lines 52-61 was ambiguous (gutter briefly suggested a duplicate "if (!userId || !compLoc) {" guard clause at 52, and the object-literal property order/count was unclear); resolved here using the much sharper IMG_3838 capture of the identical code (same scroll region, less blur), which confirmed line 52 is blank (the apparent duplicate guard clause was a ghost of lines 49-51) and confirmed all 4 object-literal properties (menuInfo, timestamp, userId, compLoc — matching the PersistedMenuData interface field order from IMG_3833). Lines 21-51 repeat content already confirmed in IMG_3835/3836 (readStorage, writeStorage, start of setMenuData). Explorer sidebar identical to prior photos (menu-persistence.ts selected). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
---
21  function readStorage(): MenuStorageShape {
        ... (lines 21-47: readStorage/writeStorage, see IMG_3835/3836 — unchanged)
48  export function setMenuData(userId: string, compLoc: string, menuInfo: PersistedMenuInfo): void {
49      if (!userId || !compLoc) {
50          return;
51      }
52
53      const storage = readStorage();
54      const entryKey = createStorageEntryKey(userId, compLoc);
55
56      storage[entryKey] = {
57          menuInfo,
58          timestamp: Date.now(),
59          userId,
60          compLoc,
61      };


========== IMG_3838.md ==========
---
photo: IMG_3838.JPG
type: vscode-code
file: aqs-web-ui/src/utils/menu-persistence.ts
lines: 48-75
orientation: 180
confidence: high
notes: Same motion-blur ghosting artifact as prior photos of this file but noticeably sharper/less severe here, making the sharp vs. faint-ghost text layers easy to distinguish at zoom. This capture resolved ambiguity from IMG_3837 (confirmed line 52 is blank, not a duplicate guard clause; confirmed the setMenuData object literal has 4 properties in interface-declaration order: menuInfo, timestamp, userId, compLoc). New content beyond IMG_3837 is lines 62-75 (writeStorage call, closing brace, and the new exported function getMenuData). Explorer sidebar identical to prior photos (menu-persistence.ts selected). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
---
48  export function setMenuData(userId: string, compLoc: string, menuInfo: PersistedMenuInfo): void {
49      if (!userId || !compLoc) {
50          return;
51      }
52
53      const storage = readStorage();
54      const entryKey = createStorageEntryKey(userId, compLoc);
55
56      storage[entryKey] = {
57          menuInfo,
58          timestamp: Date.now(),
59          userId,
60          compLoc,
61      };
62
63      writeStorage(storage);
64  }
65
66  export function getMenuData(userId: string, compLoc: string): PersistedMenuData | null {
67      if (!userId || !compLoc) {
68          return null;
69      }
70
71      const storage = readStorage();
72      const entryKey = createStorageEntryKey(userId, compLoc);
73
74      return storage[entryKey] ?? null;
75  }


========== IMG_3839.md ==========
---
photo: IMG_3839.JPG
type: vscode-code
file: aqs-web-ui/src/utils/menu-persistence.ts
lines: 64-90
orientation: 180
confidence: high
notes: Same recurring motion-blur ghosting artifact (faint duplicate text layer a few lines behind the sharp layer) but sharp layer is fully legible throughout. Confirms end of setMenuData (line 64 closing brace) already seen in IMG_3838, and getMenuData (66-75, matches IMG_3838 exactly). New content is clearMenuData (77-90): clears entire localStorage key when no userId/compLoc given, otherwise deletes just that user/compLoc entry. Explorer sidebar identical to prior photos (menu-persistence.ts selected). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
---
64  }
65
66  export function getMenuData(userId: string, compLoc: string): PersistedMenuData | null {
67      if (!userId || !compLoc) {
68          return null;
69      }
70
71      const storage = readStorage();
72      const entryKey = createStorageEntryKey(userId, compLoc);
73
74      return storage[entryKey] ?? null;
75  }
76
77  export function clearMenuData(userId?: string, compLoc?: string): void {
78      if (!userId || !compLoc) {
79          localStorage.removeItem(MENU_STORAGE_KEY);
80          return;
81      }
82
83      const storage = readStorage();
84      const entryKey = createStorageEntryKey(userId, compLoc);
85
86      if (storage[entryKey]) {
87          delete storage[entryKey];
88          writeStorage(storage);
89      }
90  }


========== IMG_3840.md ==========
---
photo: IMG_3840.JPG
type: vscode-code
file: aqs-web-ui/src/utils/menu-persistence.ts
lines: 75-91
orientation: 180
confidence: high
notes: Same recurring motion-blur ghosting artifact (faint duplicate text layer a few lines behind sharp layer) but sharp layer fully legible; content for lines 75-90 exactly matches IMG_3839's reading (getMenuData tail, clearMenuData body). New confirmation here is that line 91 is blank and the editor area below it is empty — this is the end of the file (90 lines of code + trailing blank line 91, EOF). Explorer sidebar identical to prior photos (menu-persistence.ts selected). Status bar: branch "hitanshu/experimental*" (dirty), "No Solution", 2 errors / 0 warnings.
---
75  }
76
77  export function clearMenuData(userId?: string, compLoc?: string): void {
78      if (!userId || !compLoc) {
79          localStorage.removeItem(MENU_STORAGE_KEY);
80          return;
81      }
82
83      const storage = readStorage();
84      const entryKey = createStorageEntryKey(userId, compLoc);
85
86      if (storage[entryKey]) {
87          delete storage[entryKey];
88          writeStorage(storage);
89      }
90  }
91  (blank — end of file)
