# BUNDLE for src/utils/xml-detail-persistence.ts
# 7 photo fragment(s), ascending start-line order.


========== IMG_4247.md ==========
---
photo: IMG_4247.JPG
type: vscode-code
file: aqs-web-ui/src/utils/xml-detail-persistence.ts
lines: 1-27
orientation: 180
confidence: high
notes: Sharp, clear photo with no visible ghosting/blur. Single open tab "xml-detail-persistence.ts". Breadcrumb: aqs-web-ui > src > utils > xml-detail-persistence.ts. Explorer sidebar (src/utils/, expanded) shows: performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts, session-storage.ts, session-sync.ts, transform-pagebuild-respon...(truncated), url-helpers.ts, user-permissions.ts, xml-detail-persistence.ts (selected/highlighted), zod-error-formatter.ts; below utils/: app.css, app.tsx, context.ts, main.tsx, routes.tsx, store.ts. Status bar: branch "hitanshu/experimental*", "No Solution", 2 errors/0 warnings, Ln 1 Col 1, TypeScript. This appears to be the whole file (line 27 is the last line, file ends there with no more content below).
---
1	import { getItem, setItem, removeItem } from './local-storage';
2	
3	const STORAGE_KEY = 'aqs:pendingXmlDetail';
4	const TTL_MS = 5000;
5	
6	interface NavigationXmlDetail {
7	    xmlDetail: string;
8	    targetUrl: string;
9	    timestamp: number;
10	}
11	
12	const isRecord = (value: unknown): value is Record<string, unknown> =>
13	    typeof value === 'object' && value !== null && !Array.isArray(value);
14	
15	const isNavigationXmlDetail = (value: unknown): value is NavigationXmlDetail => {
16	    if (!isRecord(value)) {
17	        return false;
18	    }
19	
20	    return (
21	        typeof value.xmlDetail === 'string' &&
22	        typeof value.targetUrl === 'string' &&
23	        typeof value.timestamp === 'number' &&
24	        Number.isFinite(value.timestamp)
25	    );
26	};
27	


========== IMG_4248.md ==========
---
photo: IMG_4248.JPG
type: vscode-code
file: aqs-web-ui/src/utils/xml-detail-persistence.ts
lines: 6 (sticky header), 10-35
orientation: 180
confidence: high
notes: Same file/session as IMG_4247, scrolled down; overlaps IMG_4247 lines 10-27 (already transcribed there, clearer/less ghosted in this photo's ghost layer but sharp layer agrees) and adds new content lines 28-35. Single open tab "xml-detail-persistence.ts", branch "hitanshu/experimental*", "No Solution", 2 errors/0 warnings, Ln 1 Col 1, TypeScript. Explorer sidebar unchanged (utils/ expanded, xml-detail-persistence.ts selected). VS Code sticky-scroll header pinned at top shows "6 interface NavigationXmlDetail {" (lines 7-9, the interface fields, are hidden under the sticky header). Photo has mild double-exposure ghosting (fainter offset repeat of the same text) throughout but primary/sharp layer is legible. "http://localhost" on line 29 is underlined (VS Code link detection, not an error). Line 35 "return null;" is the last fully visible line before the status bar; lines 36+ (closing braces) are cut off / not legible.
---
6	interface NavigationXmlDetail {   ⟪sticky-scroll header⟫
10	}
11	
12	const isRecord = (value: unknown): value is Record<string, unknown> =>
13	    typeof value === 'object' && value !== null && !Array.isArray(value);
14	
15	const isNavigationXmlDetail = (value: unknown): value is NavigationXmlDetail => {
16	    if (!isRecord(value)) {
17	        return false;
18	    }
19	
20	    return (
21	        typeof value.xmlDetail === 'string' &&
22	        typeof value.targetUrl === 'string' &&
23	        typeof value.timestamp === 'number' &&
24	        Number.isFinite(value.timestamp)
25	    );
26	};
27	
28	const normalizeUrl = (value: string): string | null => {
29	    const baseOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';
30	
31	    try {
32	        const url = new URL(value, baseOrigin);
33	        return `${url.pathname}${url.search}`;
34	    } catch {
35	        return null;


========== IMG_4249.md ==========
---
photo: IMG_4249.JPG
type: vscode-code
file: aqs-web-ui/src/utils/xml-detail-persistence.ts
lines: 15 (sticky header), 21-43
orientation: 180
confidence: high
notes: Same file/session as IMG_4247/IMG_4248, scrolled further down; overlaps lines 21-35 (already transcribed in IMG_4248, consistent here) and adds new content lines 36-43. Single open tab "xml-detail-persistence.ts", branch "hitanshu/experimental*", "No Solution", 2 errors/0 warnings, Ln 1 Col 1, TypeScript. Explorer sidebar unchanged (utils/ expanded, xml-detail-persistence.ts selected). VS Code sticky-scroll header pinned at top shows "15 const isNavigationXmlDetail = (value: unknown): value is NavigationXmlDetail => {"; lines 16-20 (if/return-false/blank/return-open-paren) are hidden under the sticky header and not independently legible in this photo (see IMG_4248 for lines 16-20). Photo has moderate double-exposure ghosting throughout (fainter offset repeat of the same static text) but the primary/sharp text layer is legible. Line 43 ("// Graceful degradation when storage is blocked/unavailable.") is the last fully visible line before the status bar; content below is cut off.
---
15	const isNavigationXmlDetail = (value: unknown): value is NavigationXmlDetail => {   ⟪sticky-scroll header⟫
21	        typeof value.xmlDetail === 'string' &&
22	        typeof value.targetUrl === 'string' &&
23	        typeof value.timestamp === 'number' &&
24	        Number.isFinite(value.timestamp)
25	    );
26	};
27	
28	const normalizeUrl = (value: string): string | null => {
29	    const baseOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';
30	
31	    try {
32	        const url = new URL(value, baseOrigin);
33	        return `${url.pathname}${url.search}`;
34	    } catch {
35	        return null;
36	    }
37	};
38	
39	export const clearPendingXmlDetail = (): void => {
40	    try {
41	        removeItem(STORAGE_KEY);
42	    } catch {
43	        // Graceful degradation when storage is blocked/unavailable.


========== IMG_4250.md ==========
---
photo: IMG_4250.JPG
type: vscode-code
file: aqs-web-ui/src/utils/xml-detail-persistence.ts
lines: 46 (blank, ghost artifact), 47-69
orientation: 180
confidence: high
notes: Same file/session as IMG_4247-4249, scrolled further down; new content (setPendingXmlDetail and start of getPendingXmlDetail functions). Single open tab "xml-detail-persistence.ts", branch "hitanshu/experimental*", "No Solution", 2 errors/0 warnings, Ln 1 Col 1, TypeScript. Explorer sidebar unchanged (utils/ expanded, xml-detail-persistence.ts selected). Photo has double-exposure ghosting (fainter offset repeat of the same text) throughout. RESOLVED line-number check: line 61 "export const getPendingXmlDetail = (currentUrl: string): string | null => {" was independently re-confirmed sharp/unambiguous in IMG_4251 (same number, same text), which anchors this photo's 47-69 numbering as correct. That in turn confirms IMG_4249's read of "39: export const clearPendingXmlDetail = (): void => {" (39-45 = declaration + try/removeItem/catch/comment/close/close) is also correct, and line 46 in this photo is actually blank — the bold-looking "export const clearPendingXmlDetail = (): void => {" text initially read at line 46 here was a ghosting artifact bleeding down from the real declaration 7 rows above (off top of this crop), not genuine line-46 content. Line 69 is the last fully visible line before the status bar.
---
46	
47	export const setPendingXmlDetail = (xmlDetail: string, targetUrl: string): void => {
48	    try {
49	        const payload: NavigationXmlDetail = {
50	            xmlDetail,
51	            targetUrl,
52	            timestamp: Date.now(),
53	        };
54	
55	        setItem(STORAGE_KEY, payload);
56	    } catch {
57	        // Graceful degradation when storage is blocked/unavailable.
58	    }
59	};
60	
61	export const getPendingXmlDetail = (currentUrl: string): string | null => {
62	    try {
63	        const rawPayload = getItem<NavigationXmlDetail>(STORAGE_KEY);
64	        if (!rawPayload) {
65	            return null;
66	        }
67	
68	        if (!isNavigationXmlDetail(rawPayload)) {
69	            clearPendingXmlDetail();


========== IMG_4251.md ==========
---
photo: IMG_4251.JPG
type: vscode-code
file: aqs-web-ui/src/utils/xml-detail-persistence.ts
lines: 61-88
orientation: 180
confidence: high
notes: Same file/session as IMG_4247-4250, scrolled further down; overlaps IMG_4250's 61-69 (consistent, used to resolve a line-numbering ambiguity in IMG_4250 — see that transcript's notes) and adds new content 70-88 (rest of getPendingXmlDetail body: TTL expiry check and target-URL match check). Single open tab "xml-detail-persistence.ts", branch "hitanshu/experimental*", "No Solution", 2 errors/0 warnings, Ln 1 Col 1, TypeScript. Explorer sidebar unchanged (utils/ expanded, xml-detail-persistence.ts selected). Photo has double-exposure ghosting (fainter offset repeat of the same text, offset ~7 rows) throughout but the primary/sharp text layer is legible and internally consistent. Line 88 "return null;" is the last fully visible line before the status bar; function likely continues below (closing braces / final success-path return) but that content is not visible in this photo.
---
61	export const getPendingXmlDetail = (currentUrl: string): string | null => {
62	    try {
63	        const rawPayload = getItem<NavigationXmlDetail>(STORAGE_KEY);
64	        if (!rawPayload) {
65	            return null;
66	        }
67	
68	        if (!isNavigationXmlDetail(rawPayload)) {
69	            clearPendingXmlDetail();
70	            return null;
71	        }
72	
73	        const now = Date.now();
74	        if (now - rawPayload.timestamp > TTL_MS) {
75	            clearPendingXmlDetail();
76	            return null;
77	        }
78	
79	        const pendingTarget = normalizeUrl(rawPayload.targetUrl);
80	        const currentTarget = normalizeUrl(currentUrl);
81	
82	        if (!pendingTarget || !currentTarget) {
83	            clearPendingXmlDetail();
84	            return null;
85	        }
86	
87	        if (pendingTarget !== currentTarget) {
88	            return null;


========== IMG_4253.md ==========
---
photo: IMG_4253.JPG
type: vscode-code
file: aqs-web-ui/src/utils/xml-detail-persistence.ts
lines: 61 (sticky header), 92-97
orientation: 180
confidence: low
notes: Same file/session as IMG_4247-4252, same scroll region as IMG_4252 (end of getPendingXmlDetail) but with a VS Code sticky-scroll header now pinned at top showing "61 export const getPendingXmlDetail = (currentUrl: string): string | null => {" — this independently confirms the function's start line (61) already established via IMG_4250/IMG_4251. Single open tab "xml-detail-persistence.ts", branch "hitanshu/experimental*", "No Solution", 2 errors/0 warnings, Ln 1 Col 1, TypeScript. Explorer sidebar unchanged (utils/ expanded, xml-detail-persistence.ts selected). This photo has the heaviest double-exposure ghosting of the set — the same short block (roughly "return rawPayload.xmlDetail; } catch { clearPendingXmlDetail(); return null; } };") appears to repeat vertically twice in the frame, and the exact line-number-to-content pairing for the closing lines (93-98) could not be pinned down with confidence beyond what IMG_4252 already established. Treating this photo as confirmatory rather than a new source: the content matches IMG_4252's lines 92-96 ("return rawPayload.xmlDetail;" / "} catch {" / "clearPendingXmlDetail();" / "return null;" / "}"), plus a closing "};" immediately after (consistent with either line 96 or 97 depending on an unresolved one-line ambiguity around a possible blank line — see IMG_4252 notes). No content beyond this closing brace is visible; this appears to be the end of the getPendingXmlDetail function and very possibly near/at the end of the visible file region reached by this photo sequence.
---
61	export const getPendingXmlDetail = (currentUrl: string): string | null => {   ⟪sticky-scroll header⟫
92	return rawPayload.xmlDetail;
93	} catch {
94	    clearPendingXmlDetail();
95	    return null;
96	}
97	};


========== IMG_4252.md ==========
---
photo: IMG_4252.JPG
type: vscode-code
file: aqs-web-ui/src/utils/xml-detail-persistence.ts
lines: 88-96
orientation: 180
confidence: medium
notes: Same file/session as IMG_4247-4251, scrolled further down; end of getPendingXmlDetail function. Single open tab "xml-detail-persistence.ts", branch "hitanshu/experimental*", "No Solution", 2 errors/0 warnings, Ln 1 Col 1, TypeScript. Explorer sidebar unchanged (utils/ expanded, xml-detail-persistence.ts selected). Photo has heavy double-exposure ghosting (fainter offset repeat of the same text, offset ~2-3 rows) which made the exact line count in this block ambiguous even after contrast-enhanced re-zoom. Content reconstructed logically (matching the try/catch + clearPendingXmlDetail()-on-failure pattern already established for setPendingXmlDetail/getPendingXmlDetail earlier in the file) and cross-checked against line 88 "return null;" which is unambiguous/sharp and consistent with IMG_4251's line 87 "if (pendingTarget !== currentTarget) {" immediately preceding it. After line 96 "};" (closing the getPendingXmlDetail function), the photo also shows a second bold "};" around what would be line 97 and a bold "return null;" around line 98 — these could not be confidently reconciled with the rest of the block (possibly ghost bleed-through, possibly a genuine extra blank line shifting the count by one) and are omitted rather than guessed; see IMG_4253 for what follows.
---
88	return null;
89	}
90	
91	return rawPayload.xmlDetail;
92	} catch {
93	    clearPendingXmlDetail();
94	    return null;
95	}
96	};
