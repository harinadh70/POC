# BUNDLE for src/utils/control-metadata-extractor.ts
# 8 photo fragment(s), ascending start-line order.


========== IMG_3556.md ==========
---
photo: IMG_3556.JPG
type: vscode-code
file: aqs-web-ui/src/utils/control-metadata-extractor.ts
lines: 1-34
orientation: 180
confidence: high
notes: Explorer sidebar shows aqs-web-ui > src > utils, with control-metadata-extractor.ts selected/highlighted. Other visible files in utils/: api-cache.ts, apply-server-commands.ts, asp-route-mapper.ts, build-cycling-url.ts, build-eedata-array.ts, build-xml-server-call-payloa...(truncated), button-state-manager.ts, check-action-permission.ts, command-handlers.ts, common.ts, control-metadata-extractor.ts (open), create-store.tsx, detect-modal-type.ts. Also visible: providers/theme-provider.tsx, services/lob-action-menu.ts, navigation.ts, page-build.ts, user-data.ts, xml-server-call.ts, types/grid-response.ts. Tab bar shows only "control-metadata-extractor.ts" open. Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Line 34 is cut off at bottom of visible editor area (only "return [" partially visible, not confidently legible - marked below).
---
```
1  import type { OptionItem } from '@/types';
2  import type { ControlMetadata } from '@utils/build-eedata-array';
3
4  /**
5   * Extract control metadata from PageBuild for EEData building
6   */
7
8  /**
9   * Normalize listItem elements (from XML) to OptionItem array
10  */
11 export function normalizeListItems(listItem: unknown): OptionItem[] {
12     if (!listItem) return [];
13
14     // Handle array format
15     if (Array.isArray(listItem)) {
16         return listItem
17             .filter(
18                 (item): item is Record<string, any> => typeof item === 'object' && item !== null,
19             )
20             .map((item, index) => {
21                 const label = String(item['#text'] || item['@text'] || item['@label'] || '').trim();
22                 const explicitValue = String(item['@value'] ?? '').trim();
23                 const value = explicitValue || label || String(index + 1);
24                 return { label: label || value, value };
25             });
26     }
27
28     // Handle single object format
29     if (typeof listItem === 'object' && listItem !== null) {
30         const item = listItem as Record<string, any>;
31         const label = String(item['#text'] || item['@text'] || item['@label'] || '').trim();
32         const explicitValue = String(item['@value'] ?? '').trim();
33         const value = explicitValue || label || '1';
34         return [ ⟪?⟫
```


========== IMG_3557.md ==========
---
photo: IMG_3557.JPG
type: vscode-code
file: aqs-web-ui/src/utils/control-metadata-extractor.ts
lines: 9-41
orientation: 180
confidence: low
notes: Photo shows severe motion-blur/ghosting — appears to be captured mid-scroll-animation (rolling-shutter shear), so two overlapping scroll positions of the SAME file are superimposed, offset by several lines, across the image. Lines 9-33 duplicate content already captured cleanly in IMG_3556 and are used here only to confirm/cross-check. Lines 34-40 are new (not visible in IMG_3556, which cut off at line 34) and are reconstructed from the sharper/bold text layer; line 41 is illegible (obscured by ghosting and the status bar edge). Sidebar/explorer tree matches IMG_3556 (aqs-web-ui > src > utils, control-metadata-extractor.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
```
9   * Normalize listItem elements (from XML) to OptionItem array
10  */
11 export function normalizeListItems(listItem: unknown): OptionItem[] {
12     if (!listItem) return [];
13
14     // Handle array format
15     if (Array.isArray(listItem)) {
16         return listItem
17             .filter(
18                 (item): item is Record<string, any> => typeof item === 'object' && item !== null,
19             )
20             .map((item, index) => {
21                 const label = String(item['#text'] || item['@text'] || item['@label'] || '').trim();
22                 const explicitValue = String(item['@value'] ?? '').trim();
23                 const value = explicitValue || label || String(index + 1);
24                 return { label: label || value, value };
25             });
26     }
27
28     // Handle single object format
29     if (typeof listItem === 'object' && listItem !== null) {
30         const item = listItem as Record<string, any>;
31         const label = String(item['#text'] || item['@text'] || item['@label'] || '').trim();
32         const explicitValue = String(item['@value'] ?? '').trim();
33         const value = explicitValue || label || '1';
34         return [
35             {
36                 label: label || value,
37                 value,
38             },
39         ];
40     }
41     ⟪?⟫
```


========== IMG_3558.md ==========
---
photo: IMG_3558.JPG
type: vscode-code
file: aqs-web-ui/src/utils/control-metadata-extractor.ts
lines: 11-54
orientation: 180
confidence: medium
notes: Sticky-scroll header at top shows line 11 "export function normalizeListItems(listItem: unknown): OptionItem[] {" (enclosing scope). Like IMG_3557, much of the upper portion of this photo (roughly lines 20-33) has motion-blur/ghosting from mid-scroll capture (rolling-shutter shear, two overlapping scroll positions); that range duplicates content already transcribed cleanly in IMG_3556/IMG_3557 and is omitted here rather than re-guessed. Lines 34-54 are sharp/legible (bold foreground layer) and give the first clean look at the end of normalizeListItems and the start of extractControlMetadata. Line 55 cut off at bottom edge behind status bar, only a ghost/duplicate of line 52 visible, not transcribed. Sidebar tree unchanged (utils folder, control-metadata-extractor.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
```
11 export function normalizeListItems(listItem: unknown): OptionItem[] {   [sticky-scroll header]
...
34     return [
35         {
36             label: label || value,
37             value,
38         },
39     ];
40     }
41
42     return [];
43 }
44
45 /**
46  * Extract control metadata from a PageBuild control element
47  */
48 export function extractControlMetadata(
49     controlElement: any,
50     matchcode: string,
51 ): ControlMetadata | undefined {
52     if (!controlElement) {
53         return undefined;
54     }
```


========== IMG_3559.md ==========
---
photo: IMG_3559.JPG
type: vscode-code
file: aqs-web-ui/src/utils/control-metadata-extractor.ts
lines: 44-73
orientation: 180
confidence: medium
notes: Same mid-scroll motion-blur/ghosting artifact as IMG_3557/IMG_3558 (rolling/animated-scroll double exposure). Lines 44-54 cross-checked against the clean read in IMG_3558. Lines 55-73 cross-checked and corrected against the clean, unambiguous read of the same code obtained from IMG_3560 (which shows this same function with much less ghosting) - line numbers below reflect that correction. Sidebar tree unchanged (utils folder, control-metadata-extractor.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution". Bottom of visible code cut off by status bar/taskbar.
---
```
44 }
45 /**
46  * Extract control metadata from a PageBuild control element
47  */
48 export function extractControlMetadata(
49     controlElement: any,
50     matchcode: string,
51 ): ControlMetadata | undefined {
52     if (!controlElement) {
53         return undefined;
54     }
55
56     const controlType = (controlElement['@controltype'] || 'textbox').toLowerCase();
57
58     // Extract options from listitems structure (listitems.item[])
59     let options: any[] = [];
60     if (
61         (controlType === 'select' || controlType === 'combo' || controlType === 'kpcombo') &&
62         controlElement.listitems
63     ) {
64         const listItemsNode = controlElement.listitems;
65         if (listItemsNode && listItemsNode.item) {
66             options = Array.isArray(listItemsNode.item) ? listItemsNode.item : [listItemsNode.item];
67         }
68     }
69
70     return {
71         matchcode,
72         label: controlElement['@label'] || matchcode,
73         controlType,
```


========== IMG_3560.md ==========
---
photo: IMG_3560.JPG
type: vscode-code
file: aqs-web-ui/src/utils/control-metadata-extractor.ts
lines: 48,55-85
orientation: 180
confidence: high
notes: Sticky-scroll header at top shows line 48 "export function extractControlMetadata(" (enclosing scope). Same mid-scroll ghosting artifact as IMG_3557-3559 is present (faint duplicate text offset a few lines, especially lines 55-63), but the bold/sharp foreground layer is legible and its line numbers cross-checked cleanly against gutter digits and against the clean read in IMG_3558 (lines 44-54) plus the reconstructed logic from IMG_3559 - all consistent. Lines 55, 57, 69, 79 appear to be blank lines (no bold text distinct from ghost at those rows). Line 85 mostly obscured by ghosting/status-bar overlap, not confidently transcribed. Explorer sidebar unchanged (utils folder, control-metadata-extractor.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
```
48 export function extractControlMetadata(   [sticky-scroll header]
...
55
56     const controlType = (controlElement['@controltype'] || 'textbox').toLowerCase();
57
58     // Extract options from listitems structure (listitems.item[])
59     let options: any[] = [];
60     if (
61         (controlType === 'select' || controlType === 'combo' || controlType === 'kpcombo') &&
62         controlElement.listitems
63     ) {
64         const listItemsNode = controlElement.listitems;
65         if (listItemsNode && listItemsNode.item) {
66             options = Array.isArray(listItemsNode.item) ? listItemsNode.item : [listItemsNode.item];
67         }
68     }
69
70     return {
71         matchcode,
72         label: controlElement['@label'] || matchcode,
73         controlType,
74         options: options.length > 0 ? normalizeListItems(options) : undefined,
75         showZero: controlElement['@showzero'] !== 'F' && controlElement['@showzero'] !== 'false',
76         rule: controlElement['@rule'] || undefined,
77     };
78 }
79
80 /**
81  * Find control element by matchcode from PageBuild data
82  */
83 export function findControlElement(pageBuildData: any, matchcode: string): any | undefined {
84     const controls = pageBuildData?.Page?.controls?.control;
85     ⟪?⟫
```


========== IMG_3561.md ==========
---
photo: IMG_3561.JPG
type: vscode-code
file: aqs-web-ui/src/utils/control-metadata-extractor.ts
lines: 83-115
orientation: 180
confidence: high
notes: Mild mid-scroll ghosting present (same artifact as prior photos in this sequence — faint duplicate text a few lines behind) but the bold/sharp foreground layer is clearly legible and line numbers are unambiguous/sequential in the gutter. Shows the tail of findControlElement, all of extractAllControlsMetadata's start (new function). Sidebar tree unchanged (utils folder, control-metadata-extractor.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
```
83 export function findControlElement(pageBuildData: any, matchcode: string): any | undefined {
84     const controls = pageBuildData?.Page?.controls?.control;
85
86     if (!controls) {
87         return undefined;
88     }
89
90     // Handle both array and single control formats
91     const controlArray = Array.isArray(controls) ? controls : [controls];
92     const targetMatchcode = String(matchcode || '')
93         .trim()
94         .toUpperCase();
95
96     return controlArray.find((ctrl) => {
97         const controlMatchcode = String(ctrl?.['@matchcode'] ?? '')
98             .trim()
99             .toUpperCase();
100        return controlMatchcode === targetMatchcode;
101    });
102 }
103
104 /**
105  * Extract all controls metadata from PageBuild for caching
106  */
107 export function extractAllControlsMetadata(pageBuildData: any): Map<string, ControlMetadata> {
108     const metadataMap = new Map<string, ControlMetadata>();
109
110     const controls = pageBuildData?.Page?.controls?.control;
111     if (!controls) return metadataMap;
112
113     const controlArray = Array.isArray(controls) ? controls : [controls];
114
115     for (const control of controlArray) {
```


========== IMG_3562.md ==========
---
photo: IMG_3562.JPG
type: vscode-code
file: aqs-web-ui/src/utils/control-metadata-extractor.ts
lines: 83,107-126
orientation: 180
confidence: high
notes: Sticky-scroll headers at top show enclosing scope lines 83 "export function findControlElement(pageBuildData: any, matchcode: string): any | undefined {" and (partially, ghosted) the tail of that function. Same mid-scroll ghosting artifact as prior photos in this run is present but the bold/sharp foreground layer is legible with unambiguous sequential gutter numbers for 107-126. Lines 107-115 duplicate content already captured in IMG_3561 (cross-checked, consistent). Lines 116-126 are new: body of the for-loop in extractAllControlsMetadata and the function's closing braces/return. Line 127 shows only a faint ghost duplicate of "return metadataMap;" (from line 125), no bold content there — appears to be blank/end of visible code. Sidebar tree unchanged (utils folder, control-metadata-extractor.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
```
83 export function findControlElement(pageBuildData: any, matchcode: string): any | undefined {   [sticky-scroll header]
...
107 export function extractAllControlsMetadata(pageBuildData: any): Map<string, ControlMetadata> {
108     const metadataMap = new Map<string, ControlMetadata>();
109
110     const controls = pageBuildData?.Page?.controls?.control;
111     if (!controls) return metadataMap;
112
113     const controlArray = Array.isArray(controls) ? controls : [controls];
114
115     for (const control of controlArray) {
116         const rawMatchcode = String(control?.['@matchcode'] ?? '').trim();
117         if (rawMatchcode) {
118             const metadata = extractControlMetadata(control, rawMatchcode);
119             if (metadata) {
120                 metadataMap.set(rawMatchcode, metadata);
121             }
122         }
123     }
124
125     return metadataMap;
126 }
```


========== IMG_3563.md ==========
---
photo: IMG_3563.JPG
type: vscode-code
file: aqs-web-ui/src/utils/control-metadata-extractor.ts
lines: 107,115-127
orientation: 180
confidence: high
notes: Sticky-scroll header at top shows line 107 "export function extractAllControlsMetadata(pageBuildData: any): Map<string, ControlMetadata> {". Clean, sharp screenshot with NO motion-blur/ghosting (unlike IMG_3557-3562) - camera/scroll was static, so this is a strong cross-check. Notably the gutter jumps directly from 107 to 115 in the editor body, i.e. lines 108-114 are not shown - most likely a folded/collapsed code region in VS Code (the const metadataMap/controls/controlArray setup lines already seen in IMG_3561/3562), though no fold-chevron is clearly visible in the photo. Content for lines 115-126 exactly matches IMG_3562's transcription (cross-validated). Line 127 is confirmed blank (cursor sits there, rest of editor canvas below is empty) - this is the end of the file. Sidebar tree unchanged (utils folder, control-metadata-extractor.ts selected). Status bar: branch hitanshu/experimental*, 2 errors 0 warnings, "No Solution".
---
```
107 export function extractAllControlsMetadata(pageBuildData: any): Map<string, ControlMetadata> {   [sticky-scroll header]
115     for (const control of controlArray) {
116         const rawMatchcode = String(control?.['@matchcode'] ?? '').trim();
117         if (rawMatchcode) {
118             const metadata = extractControlMetadata(control, rawMatchcode);
119             if (metadata) {
120                 metadataMap.set(rawMatchcode, metadata);
121             }
122         }
123     }
124
125     return metadataMap;
126 }
127
```
