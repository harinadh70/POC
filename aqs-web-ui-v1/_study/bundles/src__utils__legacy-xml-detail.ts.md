# BUNDLE for src/utils/legacy-xml-detail.ts
# 8 photo fragment(s), ascending start-line order.


========== IMG_3775.md ==========
---
photo: IMG_3775.JPG
type: vscode-code
file: aqs-web-ui/src/utils/legacy-xml-detail.ts
lines: 1-27
orientation: 180
confidence: high
notes: Breadcrumb shows aqs-web-ui > src > utils > legacy-xml-detail.ts > escapeXmlAttribute (function symbol selected). Sharp, unblurred photo (no ghosting artifact this time). Explorer sidebar (aqs-web-ui/src/utils/) selected/highlighted: legacy-xml-detail.ts. Other files listed: dynamic-form-actions.ts, error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts (active), local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop... (truncated), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:25 PM 7/10/2026 (Windows clock shows 19:26).
---
1:  function escapeXmlAttribute(raw: string): string {
2:      return raw
3:          .replace(/&/g, '&amp;')
4:          .replace(/'/g, '&apos;')
5:          .replace(/\"/g, '&quot;')
6:          .replace(/</g, '&lt;')
7:          .replace(/>/g, '&gt;');
8:  }
9:
10: interface XmlItem {
11:     name: string;
12:     value: string;
13: }
14:
15: function toXmlItems(value: unknown): XmlItem[] {
16:     if (!value || typeof value !== 'object') {
17:         return [];
18:     }
19:
20:     const root = value as Record<string, unknown>;
21:     const itemsNode =
22:         (root.items as Record<string, unknown> | undefined) ??
23:         (root['items'] as Record<string, unknown> | undefined);
24:
25:     const rawItems =
26:         (itemsNode?.item as unknown) ??
27:         (root.item as unknown) ??


========== IMG_3776.md ==========
---
photo: IMG_3776.JPG
type: vscode-code
file: aqs-web-ui/src/utils/legacy-xml-detail.ts
lines: 1-27
orientation: 180
confidence: high
notes: Duplicate view of the same scroll position as IMG_3775 (identical content, same file/lines, timestamp one minute later 7:26 PM). Sharp, unblurred photo. Breadcrumb aqs-web-ui > src > utils > legacy-xml-detail.ts > escapeXmlAttribute. Explorer sidebar unchanged from IMG_3775. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar shows Ctrl+Alt+Del / USB Devices / Fullscreen menu bar visible at very top (remote desktop toolbar).
---
1:  function escapeXmlAttribute(raw: string): string {
2:      return raw
3:          .replace(/&/g, '&amp;')
4:          .replace(/'/g, '&apos;')
5:          .replace(/\"/g, '&quot;')
6:          .replace(/</g, '&lt;')
7:          .replace(/>/g, '&gt;');
8:  }
9:
10: interface XmlItem {
11:     name: string;
12:     value: string;
13: }
14:
15: function toXmlItems(value: unknown): XmlItem[] {
16:     if (!value || typeof value !== 'object') {
17:         return [];
18:     }
19:
20:     const root = value as Record<string, unknown>;
21:     const itemsNode =
22:         (root.items as Record<string, unknown> | undefined) ??
23:         (root['items'] as Record<string, unknown> | undefined);
24:
25:     const rawItems =
26:         (itemsNode?.item as unknown) ??
27:         (root.item as unknown) ??


========== IMG_3777.md ==========
---
photo: IMG_3777.JPG
type: vscode-code
file: aqs-web-ui/src/utils/legacy-xml-detail.ts
lines: 15-40
orientation: 180
confidence: high
notes: Breadcrumb still reads "aqs-web-ui > src > utils > legacy-xml-detail.ts > escapeXmlAttribute" (stale/lagging symbol indicator; cursor is actually within toXmlItems below). A faint sticky-scroll/ghost row above line 15 reads "interface XmlItem {" — likely the pinned sticky-scroll header for line 10 (confirmed from IMG_3775/3776), not a new numbered line. Photo again has the double-exposure/motion-blur ghost layer (duplicate of the same text offset ~1 line below/right of each sharp line); only sharp gutter-aligned text transcribed. Lines 20-27 overlap with IMG_3775/IMG_3776 and match exactly (cross-verified), giving high confidence for the rest of this block. Explorer sidebar unchanged, legacy-xml-detail.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:26 PM 7/10/2026.
---
15: function toXmlItems(value: unknown): XmlItem[] {
16:     if (!value || typeof value !== 'object') {
17:         return [];
18:     }
19:
20:     const root = value as Record<string, unknown>;
21:     const itemsNode =
22:         (root.items as Record<string, unknown> | undefined) ??
23:         (root['items'] as Record<string, unknown> | undefined);
24:
25:     const rawItems =
26:         (itemsNode?.item as unknown) ??
27:         (root.item as unknown) ??
28:         (root.items as unknown);
29:
30:     const itemArray = Array.isArray(rawItems)
31:         ? rawItems
32:         : rawItems && typeof rawItems === 'object'
33:             ? [rawItems]
34:             : [];
35:
36:     return itemArray
37:         .map((entry) => {
38:             if (!entry || typeof entry !== 'object') {
39:                 return null;
40:             }


========== IMG_3778.md ==========
---
photo: IMG_3778.JPG
type: vscode-code
file: aqs-web-ui/src/utils/legacy-xml-detail.ts
lines: 28-54
orientation: 180
confidence: high
notes: Continuation of toXmlItems from IMG_3777 (breadcrumb still shows stale "escapeXmlAttribute", sticky header shows function toXmlItems(value unknown): XmlItem[] {). Same double-exposure/motion-blur ghost layer as prior photos in this file (duplicate text ~2-3 lines below/right of each sharp line); only sharp gutter-aligned text transcribed — cross-checked gutter column separately to confirm the consecutive real sequence is 28-54 with no skips. Line 43/44 right-hand ends and line 54 were confirmed via extra tight crops (line 54 partly under the status bar overlay but legible). Line 28 overlaps IMG_3777 and matches. Explorer sidebar unchanged, legacy-xml-detail.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:26 PM 7/10/2026.
---
28:         (root.items as unknown);
29:
30:     const itemArray = Array.isArray(rawItems)
31:         ? rawItems
32:         : rawItems && typeof rawItems === 'object'
33:             ? [rawItems]
34:             : [];
35:
36:     return itemArray
37:         .map((entry) => {
38:             if (!entry || typeof entry !== 'object') {
39:                 return null;
40:             }
41:
42:             const item = entry as Record<string, unknown>;
43:             const name = String(item['@name'] ?? item.name ?? '').trim();
44:             const itemValue = String(item['@value'] ?? item.value ?? '').trim();
45:             if (!name) {
46:                 return null;
47:             }
48:
49:             return {
50:                 name,
51:                 value: itemValue,
52:             };
53:         })
54:         .filter((row): row is XmlItem => row !== null);


========== IMG_3779.md ==========
---
photo: IMG_3779.JPG
type: vscode-code
file: aqs-web-ui/src/utils/legacy-xml-detail.ts
lines: 39-62
orientation: 180
confidence: high
notes: Continues legacy-xml-detail.ts past the end of toXmlItems (closes at 55) into a new exported function toLegacyXmlDetailString starting at 62 (JSDoc block 57-61 describing it). Two stacked sticky-scroll header rows at top show line 15 "function toXmlItems(value: unknown): XmlItem[] {" and a merged/overlapping "return itemArray .map((entry) => {" fragment — not treated as new numbered content since it duplicates lines already captured in IMG_3778. Same double-exposure/motion-blur ghosting as prior photos in this file; only sharp gutter-aligned text transcribed. Lines 39-54 overlap with IMG_3778 and match exactly (cross-verified). Line 62 is partly under the status bar overlay but legible. Explorer sidebar unchanged, legacy-xml-detail.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:26 PM 7/10/2026.
---
39:             return null;
40:         }
41:
42:         const item = entry as Record<string, unknown>;
43:         const name = String(item['@name'] ?? item.name ?? '').trim();
44:         const itemValue = String(item['@value'] ?? item.value ?? '').trim();
45:         if (!name) {
46:             return null;
47:         }
48:
49:         return {
50:             name,
51:             value: itemValue,
52:         };
53:     })
54:     .filter((row): row is XmlItem => row !== null);
55: }
56:
57: /**
58:  * Converts xmlDetail values to legacy XML session format used by XmlCycling/PageNavigation.
59:  * - String values pass through untouched.
60:  * - Object values with items/item nodes convert to <items><item .../></items> XML.
61:  */
62: export function toLegacyXmlDetailString(value: unknown, fallback = ''): string {


========== IMG_3780.md ==========
---
photo: IMG_3780.JPG
type: vscode-code
file: aqs-web-ui/src/utils/legacy-xml-detail.ts
lines: 55-69
orientation: 180
confidence: high
notes: Continues from IMG_3779 into the body of toLegacyXmlDetailString. Lines 55-61 overlap IMG_3779 and match exactly (cross-verified). Heavy double-exposure/motion-blur ghosting throughout (a consistent +3-line-offset ghost of earlier scroll content under each sharp line). Initial pass mis-read lines 66-69 (dropped a blank line); corrected after cross-checking against IMG_3781, which shows the same block 62-77 with clearer gutter/text alignment and a consistently verifiable +3 ghost-line offset (confirmed the blank line at 66 and 71 by the absence of a ghost artifact where one was predicted). Two stacked sticky-scroll headers at top show line 15 "function toXmlItems(value: unknown): XmlItem[] {" and line 37 ".map((entry) => {" (already captured, not new). Status bar cuts off further lines below 69. Explorer sidebar unchanged, legacy-xml-detail.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:26 PM 7/10/2026.
---
55: }
56:
57: /**
58:  * Converts xmlDetail values to legacy XML session format used by XmlCycling/PageNavigation.
59:  * - String values pass through untouched.
60:  * - Object values with items/item nodes convert to <items><item .../></items> XML.
61:  */
62: export function toLegacyXmlDetailString(value: unknown, fallback = ''): string {
63:     if (typeof value === 'string') {
64:         return value;
65:     }
66:
67:     const items = toXmlItems(value);
68:     if (items.length === 0) {
69:         return fallback;


========== IMG_3781.md ==========
---
photo: IMG_3781.JPG
type: vscode-code
file: aqs-web-ui/src/utils/legacy-xml-detail.ts
lines: 62-77
orientation: 180
confidence: high
notes: Continues toLegacyXmlDetailString from IMG_3780/IMG_3779. Same double-exposure/motion-blur ghosting as prior photos in this file, but here the ghost has a clean, consistent +3-line offset (ghost visible at screen row N is a faint repeat of the sharp text from row N-3), which was used to cross-verify every line, including two blank lines (66 and 71) whose presence was confirmed by the absence of a ghost artifact where the pattern predicted one. This corrects/refines the equivalent block read in IMG_3780 (which missed the blank line at 66). Two stacked sticky-scroll headers at top show line 15 "function toXmlItems(value: unknown): XmlItem[] {" and line 37 ".map((entry) => {" (already captured elsewhere, not new). Explorer sidebar unchanged, legacy-xml-detail.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:26 PM 7/10/2026.
---
62: export function toLegacyXmlDetailString(value: unknown, fallback = ''): string {
63:     if (typeof value === 'string') {
64:         return value;
65:     }
66:
67:     const items = toXmlItems(value);
68:     if (items.length === 0) {
69:         return fallback;
70:     }
71:
72:     const xmlItems = items
73:         .map(
74:             (item) =>
75:                 `<item name='${escapeXmlAttribute(item.name)}' value='${escapeXmlAttribute(item.value)}' />`,
76:         )
77:         .join('');


========== IMG_3782.md ==========
---
photo: IMG_3782.JPG
type: vscode-code
file: aqs-web-ui/src/utils/legacy-xml-detail.ts
lines: 62-81
orientation: 180
confidence: high
notes: Scrolled one line further than IMG_3781, revealing the end of toLegacyXmlDetailString (closes at 80) and file continues to at least 81 (blank/EOF area, cut off by taskbar below). Lines 62-77 overlap IMG_3781 and were re-derived independently here using the same consistent +3-line ghost-offset method, arriving at the identical mapping (cross-verified twice). New content: 78 (blank), 79 (return statement building the final `<items>...</items>` string), 80 (closing brace). Same double-exposure/motion-blur ghosting as prior photos in this file. Explorer sidebar unchanged, legacy-xml-detail.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Taskbar clock 7:26 PM 7/10/2026.
---
62: export function toLegacyXmlDetailString(value: unknown, fallback = ''): string {
63:     if (typeof value === 'string') {
64:         return value;
65:     }
66:
67:     const items = toXmlItems(value);
68:     if (items.length === 0) {
69:         return fallback;
70:     }
71:
72:     const xmlItems = items
73:         .map(
74:             (item) =>
75:                 `<item name='${escapeXmlAttribute(item.name)}' value='${escapeXmlAttribute(item.value)}' />`,
76:         )
77:         .join('');
78:
79:     return `<items>${xmlItems}</items>`;
80: }
81:
