# BUNDLE for src/utils/parse-info-xml.ts
# 34 photo fragment(s), ascending start-line order.


========== IMG_3911.md ==========
---
photo: IMG_3911.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 1-27
orientation: 180
confidence: high
notes: >
  Clean read, no ghosting artifact. New file (first appearance in this batch):
  parse-info-xml.ts, selected/highlighted in explorer, tab bar shows only
  this file open. Explorer sidebar (utils folder): form.ts, frame-router.ts,
  http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts,
  menu-persistence.ts, normalize-service-config copy.ts,
  normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts
  (selected), parse-permissions.ts, parse-querystring-params.ts,
  performance-benchmarks.ts, performance-monitor.ts, permission-store.ts,
  pub-sub.ts, required-field-validation.ts. Status bar: No Solution, branch
  hitanshu/experimental*, 2 errors/0 warnings.
---
1   /**
2    * Utility: Parse info-dialog XML payloads into normalized table-friendly structures.
3    *
4    * This parser is intentionally generic and safe:
5    * - It supports known legacy roots (`effdaterates`, `taxinfo`)
6    * - It falls back to a generic key/value structure for unknown payloads
7    * - It never throws to callers; parse errors are returned as typed state
8    */
9
10  export interface InfoTableColumn {
11      key: string;
12      header: string;
13      align?: 'left' | 'right' | 'center';
14      width?: string;
15  }
16
17  export interface InfoTableSection {
18      id: string;
19      title?: string;
20      columns: InfoTableColumn[];
21      rows: Array<Record<string, string>>;
22  }
23
24  export interface ParsedInfoXml {
25      root: string;
26      title?: string;
27      sections: InfoTableSection[];


========== IMG_3912.md ==========
---
photo: IMG_3912.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 9-32
orientation: 180
confidence: medium
notes: >
  Camera-motion-blur ghosting artifact present (dim duplicate of an earlier
  line superimposed ~3 rows below); sharp foreground text used as ground
  truth and cross-validated against the clean read in IMG_3911.md (lines
  9-27 overlap exactly). Lines 1-31 transcribed with high confidence. Line 32
  is blank; the start of the next interface, "interface
  NormalizedInfoXmlPayload {" (and its members "xml: string;" / "isRecovered:
  boolean;"), is visible ONLY as the blurred ghost trailing off the bottom
  edge of this frame (not sharp) so it is not transcribed here — see later
  photos for a sharp read of that interface. Same explorer sidebar/tab state
  as IMG_3911. Status bar: No Solution, branch hitanshu/experimental*,
  2 errors/0 warnings.
---
9
10  export interface InfoTableColumn {
11      key: string;
12      header: string;
13      align?: 'left' | 'right' | 'center';
14      width?: string;
15  }
16
17  export interface InfoTableSection {
18      id: string;
19      title?: string;
20      columns: InfoTableColumn[];
21      rows: Array<Record<string, string>>;
22  }
23
24  export interface ParsedInfoXml {
25      root: string;
26      title?: string;
27      sections: InfoTableSection[];
28      isKnownStructure: boolean;
29      error?: string;
30      rawXml: string;
31  }
32


========== IMG_3913.md ==========
---
photo: IMG_3913.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 17-43
orientation: 180
confidence: high
notes: >
  Clean read, no ghosting artifact. Confirms/extends IMG_3911.md and
  IMG_3912.md (lines 17-31 overlap exactly) and introduces new content:
  interface NormalizedInfoXmlPayload (33-36) and the start of the readAttr
  helper (38-43). Same explorer sidebar/tab state as IMG_3911/3912. Status
  bar: No Solution, branch hitanshu/experimental*, 2 errors/0 warnings.
---
17  export interface InfoTableSection {
18      id: string;
19      title?: string;
20      columns: InfoTableColumn[];
21      rows: Array<Record<string, string>>;
22  }
23
24  export interface ParsedInfoXml {
25      root: string;
26      title?: string;
27      sections: InfoTableSection[];
28      isKnownStructure: boolean;
29      error?: string;
30      rawXml: string;
31  }
32
33  interface NormalizedInfoXmlPayload {
34      xml: string;
35      isRecovered: boolean;
36  }
37
38  /**
39   * Helper: Safely read an attribute and normalize null/undefined to empty string.
40   */
41  const readAttr = (element: Element, name: string): string => {
42      const value = element.getAttribute(name);
43      return value === null || value === undefined ? '' : value;


========== IMG_3914.md ==========
---
photo: IMG_3914.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 24-51
orientation: 180
confidence: high
notes: >
  Camera-motion-blur ghosting artifact present (dim duplicate of an earlier
  line superimposed ~3 rows below); sharp foreground text used as ground
  truth. Lines 24-43 cross-validated verbatim against the clean read in
  IMG_3913.md. Line 24 ("export interface ParsedInfoXml {") is a
  sticky-scroll header pinned at the top of the editor while the file is
  scrolled to show its body; gutter jumps directly from 24 to 28, confirming
  25-27 are scrolled out of view above. New content beyond IMG_3913: the
  closing of readAttr (44) and the hasXmlLikeTag helper (46) and the start of
  decodeHtmlEntities (48-51); this is cross-validated against the sharp text
  in IMG_3915.md and IMG_3916.md, which show the same lines. Same explorer
  sidebar/tab state as IMG_3911-3913. Status bar: No Solution, branch
  hitanshu/experimental*, 2 errors/0 warnings.
---
[Sticky scroll header, pinned at top of editor]
24  export interface ParsedInfoXml {

[Main visible content]
28      isKnownStructure: boolean;
29      error?: string;
30      rawXml: string;
31  }
32
33  interface NormalizedInfoXmlPayload {
34      xml: string;
35      isRecovered: boolean;
36  }
37
38  /**
39   * Helper: Safely read an attribute and normalize null/undefined to empty string.
40   */
41  const readAttr = (element: Element, name: string): string => {
42      const value = element.getAttribute(name);
43      return value === null || value === undefined ? '' : value;
44  };
45
46  const hasXmlLikeTag = (value: string): boolean => /<[a-zA-Z_][\w:.-]*[\s>/]/.test(value);
47
48  const decodeHtmlEntities = (value: string): string => {
49      if (!value || !value.includes('&')) {
50          return value;
51      }


========== IMG_3915.md ==========
---
photo: IMG_3915.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 33-61
orientation: 180
confidence: high
notes: >
  Camera-motion-blur ghosting artifact present, same as IMG_3914; sharp
  foreground text used as ground truth. Line 33 ("interface
  NormalizedInfoXmlPayload {") is a sticky-scroll header pinned at the top of
  the editor; gutter jumps directly from 33 to 36. Lines 33-51 cross-validated
  against IMG_3914.md. New content: the body of decodeHtmlEntities (52-58,
  the .replace() chain decoding HTML entities lt/gt/quot/apos/amp) and the
  start of sanitizeInvalidAmpersands (61); cross-validated against the sharp
  text in IMG_3916.md. Same explorer sidebar/tab state as IMG_3911-3914.
  Status bar: No Solution, branch hitanshu/experimental*, 2 errors/0
  warnings.
---
[Sticky scroll header, pinned at top of editor]
33  interface NormalizedInfoXmlPayload {

[Main visible content]
36  }
37
38  /**
39   * Helper: Safely read an attribute and normalize null/undefined to empty string.
40   */
41  const readAttr = (element: Element, name: string): string => {
42      const value = element.getAttribute(name);
43      return value === null || value === undefined ? '' : value;
44  };
45
46  const hasXmlLikeTag = (value: string): boolean => /<[a-zA-Z_][\w:.-]*[\s>/]/.test(value);
47
48  const decodeHtmlEntities = (value: string): string => {
49      if (!value || !value.includes('&')) {
50          return value;
51      }
52
53      return value
54          .replace(/&lt;/gi, '<')
55          .replace(/&gt;/gi, '>')
56          .replace(/&quot;/gi, '"')
57          .replace(/&#39;|&apos;/gi, "'")
58          .replace(/&amp;/gi, '&');
59  };
60
61  const sanitizeInvalidAmpersands = (value: string): string => {


========== IMG_3916.md ==========
---
photo: IMG_3916.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 48-77
orientation: 180
confidence: high
notes: >
  Camera-motion-blur ghosting artifact present, same as IMG_3914/3915; sharp
  foreground text used as ground truth. Line 48 ("const decodeHtmlEntities =
  (value: string): string => {") is a sticky-scroll header pinned at the top
  of the editor; gutter jumps directly from 48 to 52. Lines 48-61
  cross-validated against IMG_3915.md. New content: the rest of
  sanitizeInvalidAmpersands (62-67, including the ampersand-sanitizing regex
  on line 66) and the start of parseXmlDocument (69-77: DOMParser setup,
  try/catch, parsererror check). Bottom of frame is cut/blurred right after
  line 76 ("return null;"); line 77 is very likely just the closing "}" of
  the catch block (marked uncertain below) and the function's own closing
  brace/next statement is not visible in this photo. Same explorer
  sidebar/tab state as IMG_3911-3915. Status bar: No Solution, branch
  hitanshu/experimental*, 2 errors/0 warnings.
---
[Sticky scroll header, pinned at top of editor]
48  const decodeHtmlEntities = (value: string): string => {

[Main visible content]
52
53      return value
54          .replace(/&lt;/gi, '<')
55          .replace(/&gt;/gi, '>')
56          .replace(/&quot;/gi, '"')
57          .replace(/&#39;|&apos;/gi, "'")
58          .replace(/&amp;/gi, '&');
59  };
60
61  const sanitizeInvalidAmpersands = (value: string): string => {
62      if (!value || !value.includes('&')) {
63          return value;
64      }
65
66      return value.replace(/&(?!(?:#\d+|#x[0-9a-fA-F]+|[a-zA-Z][\w.-]*);)/g, '&amp;');
67  };
68
69  const parseXmlDocument = (xml: string): Document | null => {
70      try {
71          const parser = new DOMParser();
72          const doc = parser.parseFromString(xml, 'text/xml');
73          const parseError = doc.querySelector('parsererror');
74          return parseError ? null : doc;
75      } catch {
76          return null;
77      } ⟪?⟫


========== IMG_3917.md ==========
---
photo: IMG_3917.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 61-90
orientation: 180
confidence: medium
notes: Photo has a motion-blur/scroll "ghost" double-exposure — a faint duplicate of the same text appears offset a few lines below the crisp text, consistent with VS Code smooth-scroll happening during the camera exposure. Lines 62-64 are not directly crisp (obscured behind sticky-scroll header bar for line 61) but were reconstructed from the faint ghost overlay, which clearly reads "if (!value || !value.includes('&')) { / return value; / }" — flagged medium confidence. Sticky-scroll header at top pins line 61 (enclosing function `sanitizeInvalidAmpersands`). Line 90 is the last visible line, cut off by the status bar below it; further content beyond it is illegible. Explorer sidebar (aqs-web-ui > src > utils) shows files: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts (selected/highlighted), parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts. Single tab open: parse-info-xml.ts. Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution". Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. A near-identical second file-name list is visible far right of screen (likely a second/duplicate sidebar panel or reflection artifact) — not transcribed as it duplicates the Explorer list. Windows taskbar clock shows 7:28 PM 7/10/2026.
---
[sticky-scroll header, enclosing scope]
61	const sanitizeInvalidAmpersands = (value: string): string => {

[main visible body]
62	    if (!value || !value.includes('&')) {          ⟪reconstructed from motion-blur ghost overlay, medium confidence⟫
63	        return value;                                ⟪reconstructed from motion-blur ghost overlay, medium confidence⟫
64	    }                                                 ⟪reconstructed from motion-blur ghost overlay, medium confidence⟫
65	
66	    return value.replace(/&(?!(?:#\d+|#x[0-9a-fA-F]+|[a-zA-Z][\w.-]*);)/g, '&amp;');
67	};
68	
69	const parseXmlDocument = (xml: string): Document | null => {
70	    try {
71	        const parser = new DOMParser();
72	        const doc = parser.parseFromString(xml, 'text/xml');
73	        const parseError = doc.querySelector('parsererror');
74	        return parseError ? null : doc;
75	    } catch {
76	        return null;
77	    }
78	};
79	
80	const normalizeXmlCandidate = (input: string): string => {
81	    const trimmed = input.trim();
82	    if (!trimmed) {
83	        return '';
84	    }
85	
86	    const startIndex = trimmed.search(/<(effdaterates|taxinfo|item|exception|header)\b/i);
87	    if (startIndex > 0) {
88	        return trimmed.slice(startIndex);
89	    }
90	    if (startIndex > 0) {
[content below line 90 obscured by the taskbar/status bar — ⟪?⟫ illegible]


========== IMG_3918.md ==========
---
photo: IMG_3918.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 69-101
orientation: 180
confidence: medium
notes: Same file/scroll region as IMG_3917 but scrolled a bit further, taken moments later (same "hitanshu/experimental*" branch, same 7:28 PM 7/10/2026 timestamp). Sticky-scroll header pins line 69 (enclosing function `parseXmlDocument`); real content resumes at line 76 (lines 70-75 hidden behind sticky header, previously transcribed in IMG_3917 as lines 70-74 of the try/catch body). Photo again shows the scroll motion-blur "ghost" double-exposure seen in IMG_3917 (faint duplicate text offset a few rows below/above crisp text) — transcription below is the crisp (bold, sharp, colored) text only. Notably lines 87-89 (`if (startIndex > 0) { return trimmed.slice(startIndex); }`) and line 90 (`if (startIndex > 0) {`) plus lines 91 and 94 (both read identically as `if (startIndex === -1 && /^[\w:-]+\s*=\s*['"]/i.test(trimmed)) {`) appear to be genuinely duplicated blocks in the live editor, not a transcription artifact — each occurrence was independently confirmed crisp/in-focus at high zoom. This likely corresponds to the "2 errors" shown in the status bar (⊗2), consistent with an in-progress edit/duplicate-paste. Line 101 is cut off at the very bottom edge (only "if (!original) {" fully visible on line 100; content of 101 not legible). Explorer sidebar (aqs-web-ui > src > utils) unchanged from IMG_3917: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config copy.ts, normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts (selected), parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts. Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
[sticky-scroll header, enclosing scope]
69	const parseXmlDocument = (xml: string): Document | null => {

[main visible body]
76	        return null;
77	    }
78	};
79	
80	const normalizeXmlCandidate = (input: string): string => {
81	    const trimmed = input.trim();
82	    if (!trimmed) {
83	        return '';
84	    }
85	
86	    const startIndex = trimmed.search(/<(effdaterates|taxinfo|item|exception|header)\b/i);
87	    if (startIndex > 0) {
88	        return trimmed.slice(startIndex);
89	    }
90	    if (startIndex > 0) {
91	    if (startIndex === -1 && /^[\w:-]+\s*=\s*['"]/i.test(trimmed)) {
92	        return `<item ${trimmed}`;
93	    }
94	    if (startIndex === -1 && /^[\w:-]+\s*=\s*['"]/i.test(trimmed)) {
95	    return trimmed;
96	};
97	
98	const tryNormalizeInfoXmlPayload = (rawPayload: string): NormalizedInfoXmlPayload | null => {
99	    const original = (rawPayload || '').trim();
100	    if (!original) {
101	⟪?⟫ content cut off at bottom edge of screen, not legible


========== IMG_3919.md ==========
---
photo: IMG_3919.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 80-106
orientation: 180
confidence: medium
notes: Same file, same editing session as IMG_3917/IMG_3918 (same "hitanshu/experimental*" branch, same 7:28 PM 7/10/2026 timestamp), scrolled further down. Sticky-scroll header pins line 80 (`normalizeXmlCandidate`); real content resumes at line 84. Lines 84-96 are an exact re-confirmation of IMG_3918's lines 84-96 (including the apparently-duplicated `if (startIndex > 0) {` / `if (startIndex === -1 && ...)` blocks at 90/91/94, unchanged — still shows ⊗2 errors in the status bar). New content beyond IMG_3918 is lines 100-106 (start of function body of `tryNormalizeInfoXmlPayload`). Photo again has the same scroll motion-blur ghosting artifact as the two prior photos; lines 101-102 were reconstructed from a blend of overlapping crisp/ghost text (the guard `if (!original) { return null; }`) — flagged medium confidence. Line 103 is confirmed blank (mirrors the blank-line-after-guard style seen in `normalizeXmlCandidate` above it) and lines 104-106 confirmed, cross-checked against the same lines re-shown in IMG_3920 (scrolled slightly further, same file/session). Explorer sidebar unchanged from prior two photos (utils folder, parse-info-xml.ts selected). Status bar: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
[sticky-scroll header, enclosing scope]
80	const normalizeXmlCandidate = (input: string): string => {

[main visible body]
84	    const trimmed = input.trim();
85	    if (!trimmed) {
86	    const startIndex = trimmed.search(/<(effdaterates|taxinfo|item|exception|header)\b/i);
87	    if (startIndex > 0) {
88	        return trimmed.slice(startIndex);
89	    }
90	    if (startIndex > 0) {
91	    if (startIndex === -1 && /^[\w:-]+\s*=\s*['"]/i.test(trimmed)) {
92	        return `<item ${trimmed}`;
93	    }
94	    if (startIndex === -1 && /^[\w:-]+\s*=\s*['"]/i.test(trimmed)) {
95	    return trimmed;
96	};
97	
98	const tryNormalizeInfoXmlPayload = (rawPayload: string): NormalizedInfoXmlPayload | null => {
99	    const original = (rawPayload || '').trim();
100	    if (!original) {
101	        return null;                                            ⟪reconstructed from blended crisp/ghost text, medium confidence⟫
102	    }                                                            ⟪reconstructed, medium confidence⟫
103	
104	    const decoded = decodeHtmlEntities(original).trim();
105	    const sanitizedOriginal = sanitizeInvalidAmpersands(original);
106	    const sanitizedDecoded = sanitizeInvalidAmpersands(decoded);


========== IMG_3920.md ==========
---
photo: IMG_3920.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 94-119
orientation: 180
confidence: medium
notes: Same file/session as IMG_3917-3919 (branch "hitanshu/experimental*", 7:28 PM 7/10/2026), scrolled further down. Sticky-scroll header pins line 80 (`normalizeXmlCandidate`); real content resumes at line 94. Lines 94-106 re-confirm and refine IMG_3919's tail (confirms a blank line at 103 between the `if (!original) { return null; }` guard and `const decoded = ...`). New content beyond IMG_3919 is lines 107-119: builds `directCandidates` array, filters by `hasXmlLikeTag`, loops over candidates calling `parseXmlDocument`, and returns `{ xml, isRecovered }` on first successful parse. Line 119 was initially misread as `};` (closing the function) but IMG_3921 (same file, scrolled slightly further, taken moments later) shows the function actually continues past this point with more fallback logic (`normalizeXmlCandidate`, etc.) — line 119 is blank; the `};` originally read there was a motion-blur ghost echo of line 116's `};` (see notes on IMG_3921). Same scroll motion-blur ghosting artifact as prior photos in this sequence; transcription reflects crisp/bold text only. Explorer sidebar and status bar otherwise unchanged from IMG_3917-3919.
---
[sticky-scroll header, enclosing scope]
80	const normalizeXmlCandidate = (input: string): string => {

[main visible body]
94	
95	    return trimmed;
96	};
97	
98	const tryNormalizeInfoXmlPayload = (rawPayload: string): NormalizedInfoXmlPayload | null => {
99	    const original = (rawPayload || '').trim();
100	    if (!original) {
101	        return null;
102	    }
103	
104	    const decoded = decodeHtmlEntities(original).trim();
105	    const sanitizedOriginal = sanitizeInvalidAmpersands(original);
106	    const sanitizedDecoded = sanitizeInvalidAmpersands(decoded);
107	    const directCandidates = [original, decoded, sanitizedOriginal, sanitizedDecoded].filter(
108	        (value) => hasXmlLikeTag(value),
109	    );
110	
111	    for (const candidate of directCandidates) {
112	        if (parseXmlDocument(candidate)) {
113	            return {
114	                xml: candidate,
115	                isRecovered: candidate !== original,
116	            };
117	        }
118	    }
119	                                                                 ⟪corrected after cross-reference with IMG_3921: this line is blank; the earlier read of "};" here was a motion-blur ghost echo of line 116⟫


========== IMG_3921.md ==========
---
photo: IMG_3921.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 105-127
orientation: 180
confidence: medium
notes: Same file/session as IMG_3917-3920 (branch "hitanshu/experimental*", 7:28 PM 7/10/2026), scrolled further down. Sticky-scroll header pins line 98 (`tryNormalizeInfoXmlPayload`); real content resumes at line 105. Lines 105-118 re-confirm IMG_3920's lines 105-118 (candidate-building, filter, for-loop, direct-parse return). Correction versus IMG_3920: line 119 is blank (not `};` as originally transcribed from IMG_3920 — that was a motion-blur ghost echo of line 116's `};`; IMG_3920 has been corrected accordingly). New content: lines 120-127 show a second fallback stage — normalize the decoded XML via `normalizeXmlCandidate`, bail with `return null` if it still doesn't look like XML, then try `sanitizeInvalidAmpersands` on the normalized value and attempt `parseXmlDocument` again. Line 127 `return {` is the last fully-crisp line; faint ghost/next-frame text beyond it suggests `xml: normalizedSanitized,` and `isRecovered: true,` follow but are not confirmed crisp (not transcribed with line numbers). Same scroll motion-blur ghosting artifact as prior photos in this sequence. Status bar unchanged: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution".
---
[sticky-scroll header, enclosing scope]
98	const tryNormalizeInfoXmlPayload = (rawPayload: string): NormalizedInfoXmlPayload | null => {

[main visible body]
105	    const sanitizedOriginal = sanitizeInvalidAmpersands(original);
106	    const sanitizedDecoded = sanitizeInvalidAmpersands(decoded);
107	    const directCandidates = [original, decoded, sanitizedOriginal, sanitizedDecoded].filter(
108	        (value) => hasXmlLikeTag(value),
109	    );
110	
111	    for (const candidate of directCandidates) {
112	        if (parseXmlDocument(candidate)) {
113	            return {
114	                xml: candidate,
115	                isRecovered: candidate !== original,
116	            };
117	        }
118	    }
119	
120	    const normalized = normalizeXmlCandidate(decoded);
121	    if (!normalized || !hasXmlLikeTag(normalized)) {
122	        return null;
123	    }
124	
125	    const normalizedSanitized = sanitizeInvalidAmpersands(normalized);
126	    if (normalizedSanitized !== normalized && parseXmlDocument(normalizedSanitized)) {
127	        return {


========== IMG_3922.md ==========
---
photo: IMG_3922.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 115-140
orientation: 180
confidence: high
notes: Same file/session as IMG_3917-3921 (branch "hitanshu/experimental*", 7:28 PM 7/10/2026), scrolled further down. Sticky-scroll header pins line 98 (`tryNormalizeInfoXmlPayload`); real content resumes at line 115. This photo has noticeably less motion blur/ghosting than IMG_3917-3921 — text is crisp and unambiguous throughout, confirming the earlier cross-photo reconstruction (line 119 blank, matching the correction made to IMG_3920/IMG_3921). Lines 115-127 re-confirm prior photos. New content: lines 128-140 show two more fallback stages of `tryNormalizeInfoXmlPayload` — a `normalizedSanitized` object return, then wrapping `normalized` in a synthetic `<info-recovered>...</info-recovered>` element and retrying `parseXmlDocument`, returning `{ xml: wrapped, isRecovered: true }` on success. Line 140 (`const wrappedSanitized = ...`) is right at the bottom edge/faint but legible with contrast enhancement — the pattern strongly suggests a further wrapped-sanitized retry follows (not shown, cut off by status bar). Status bar unchanged: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar unchanged (utils folder, parse-info-xml.ts selected).
---
[sticky-scroll header, enclosing scope]
98	const tryNormalizeInfoXmlPayload = (rawPayload: string): NormalizedInfoXmlPayload | null => {

[main visible body]
115	            isRecovered: candidate !== original,
116	            };
117	        }
118	    }
119	
120	    const normalized = normalizeXmlCandidate(decoded);
121	    if (!normalized || !hasXmlLikeTag(normalized)) {
122	        return null;
123	    }
124	
125	    const normalizedSanitized = sanitizeInvalidAmpersands(normalized);
126	    if (normalizedSanitized !== normalized && parseXmlDocument(normalizedSanitized)) {
127	        return {
128	            xml: normalizedSanitized,
129	            isRecovered: true,
130	        };
131	    }
132	
133	    const wrapped = `<info-recovered>${normalized}</info-recovered>`;
134	    if (parseXmlDocument(wrapped)) {
135	        return {
136	            xml: wrapped,
137	            isRecovered: true,
138	        };
139	    }
140	    const wrappedSanitized = `<info-recovered>${normalizedSanitized}</info-recovered>`;   ⟪low-contrast, at bottom edge of screen — best-effort read⟫


========== IMG_3923.md ==========
---
photo: IMG_3923.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 128-153
orientation: 180
confidence: high
notes: Same file/session as IMG_3917-3922 (branch "hitanshu/experimental*", 7:28 PM 7/10/2026), scrolled further down. Sticky-scroll header pins line 98 (`tryNormalizeInfoXmlPayload`); real content resumes at line 128. Very little motion-blur ghosting in this photo — text is crisp and unambiguous throughout. Lines 128-140 re-confirm IMG_3922. New content: lines 141-150 complete `tryNormalizeInfoXmlPayload` with a final `wrappedSanitized` retry stage and a `return null;` fallback (closing the function at line 150, `};`) — confirms the function's full fallback chain is: direct candidates -> normalized -> normalizedSanitized -> wrapped -> wrappedSanitized -> null. Line 152 starts a new function `hasDirectChild = (element: Element, selector: string): boolean => {`. Line 153 is the last visible line (partially cut at the very bottom edge but legible): `return Array.from(element.children).some((child) => child.matches(selector));`. Status bar unchanged: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar unchanged (utils folder, parse-info-xml.ts selected).
---
[sticky-scroll header, enclosing scope]
98	const tryNormalizeInfoXmlPayload = (rawPayload: string): NormalizedInfoXmlPayload | null => {

[main visible body]
128	            xml: normalizedSanitized,
129	            isRecovered: true,
130	        };
131	    }
132	
133	    const wrapped = `<info-recovered>${normalized}</info-recovered>`;
134	    if (parseXmlDocument(wrapped)) {
135	        return {
136	            xml: wrapped,
137	            isRecovered: true,
138	        };
139	    }
140	
141	    const wrappedSanitized = `<info-recovered>${normalizedSanitized}</info-recovered>`;
142	    if (parseXmlDocument(wrappedSanitized)) {
143	        return {
144	            xml: wrappedSanitized,
145	            isRecovered: true,
146	        };
147	    }
148	
149	    return null;
150	};
151	
152	const hasDirectChild = (element: Element, selector: string): boolean => {
153	    return Array.from(element.children).some((child) => child.matches(selector));


========== IMG_3924.md ==========
---
photo: IMG_3924.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 136-161
orientation: 180
confidence: high
notes: Same file/session as IMG_3917-3923 (branch "hitanshu/experimental*", 7:28 PM 7/10/2026), scrolled further down. Sticky-scroll header pins line 98 (`tryNormalizeInfoXmlPayload`); real content resumes at line 136. Lines 136-150 (tail of `tryNormalizeInfoXmlPayload`, function closes at 150) have heavier ghosting in this particular photo than IMG_3922/3923 did for the same lines, so the transcription for 136-150 here reuses the high-confidence crisp reads already cross-validated in IMG_3922 and IMG_3923 rather than re-deriving from this blurrier capture. New content: line 152 `hasDirectChild` (re-confirms IMG_3923's line 152-153), plus two new helper functions: `looksLikeEffDateRates` (156-159, checks for `:scope > item` elements with a `date` attribute) and the start of `looksLikeTaxInfo` (161). Has the usual mild scroll motion-blur ghosting but crisp text is unambiguous throughout. Status bar unchanged: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar unchanged (utils folder, parse-info-xml.ts selected).
---
[sticky-scroll header, enclosing scope]
98	const tryNormalizeInfoXmlPayload = (rawPayload: string): NormalizedInfoXmlPayload | null => {

[main visible body]
136	            xml: wrapped,
137	            isRecovered: true,
138	        };
139	    }
140	
141	    const wrappedSanitized = `<info-recovered>${normalizedSanitized}</info-recovered>`;
142	    if (parseXmlDocument(wrappedSanitized)) {
143	        return {
144	            xml: wrappedSanitized,
145	            isRecovered: true,
146	        };
147	    }
148	
149	    return null;
150	};
151	
152	const hasDirectChild = (element: Element, selector: string): boolean => {
153	    return Array.from(element.children).some((child) => child.matches(selector));
154	};
155	
156	const looksLikeEffDateRates = (rootElement: Element): boolean => {
157	    const itemElements = Array.from(rootElement.querySelectorAll(':scope > item'));
158	    return itemElements.length > 0 && itemElements.some((item) => item.hasAttribute('date'));
159	};
160	
161	const looksLikeTaxInfo = (rootElement: Element): boolean => {


========== IMG_3925.md ==========
---
photo: IMG_3925.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 144-167
orientation: 180
confidence: high
notes: Same file/session as IMG_3917-3924 (branch "hitanshu/experimental*", 7:28 PM 7/10/2026), scrolled further down. Sticky-scroll header pins line 98 (`tryNormalizeInfoXmlPayload`); real content resumes at line 144. Lines 144-159 re-confirm prior photos (tail of `tryNormalizeInfoXmlPayload`, `hasDirectChild`, `looksLikeEffDateRates`). New content: lines 161-167 complete `looksLikeTaxInfo` (checks for `:scope > item` elements with `city`/`citycode` attributes, or a direct `exception` child). Rows 168-169 initially appeared to show a crisp repeat of lines 165-166 (`const hasExceptions = ...` / `return hasCityItems || hasExceptions;`) but per the established +3-row scroll motion-blur ghost offset seen throughout this sequence, these are ghost echoes, not real duplicate content — line 168 is blank, and a `/**` JSDoc comment block appears to begin around line 169 (only a fragment of the opening `/**` is visible at the very bottom edge, not confidently transcribable). Status bar unchanged: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar unchanged (utils folder, parse-info-xml.ts selected).
---
[sticky-scroll header, enclosing scope]
98	const tryNormalizeInfoXmlPayload = (rawPayload: string): NormalizedInfoXmlPayload | null => {

[main visible body]
144	            xml: wrappedSanitized,
145	            isRecovered: true,
146	        };
147	    }
148	
149	    return null;
150	};
151	
152	const hasDirectChild = (element: Element, selector: string): boolean => {
153	    return Array.from(element.children).some((child) => child.matches(selector));
154	};
155	
156	const looksLikeEffDateRates = (rootElement: Element): boolean => {
157	    const itemElements = Array.from(rootElement.querySelectorAll(':scope > item'));
158	    return itemElements.length > 0 && itemElements.some((item) => item.hasAttribute('date'));
159	};
160	
161	const looksLikeTaxInfo = (rootElement: Element): boolean => {
162	    const hasCityItems = Array.from(rootElement.querySelectorAll(':scope > item')).some(
163	        (item) => item.hasAttribute('city') || item.hasAttribute('citycode'),
164	    );
165	    const hasExceptions = hasDirectChild(rootElement, 'exception');
166	    return hasCityItems || hasExceptions;
167	};


========== IMG_3926.md ==========
---
photo: IMG_3926.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 152-175
orientation: 180
confidence: medium
notes: Same file/session as IMG_3917-3925 (branch "hitanshu/experimental*", 7:28 PM 7/10/2026), scrolled further down. No sticky-scroll header this time — the visible range (151-175) sits between top-level function declarations so there's no enclosing scope to pin. Lines 152-167 re-confirm prior photos (`hasDirectChild`, `looksLikeEffDateRates`, `looksLikeTaxInfo`). New content: a JSDoc comment block (169-171: "Helper: Build a resilient generic table from arbitrary XML attributes.") followed by the start of a new function `toGenericSection` (172-175), which builds an `InfoTableSection` by walking all descendant elements (`querySelectorAll('*')`) and their attributes. Heavier scroll motion-blur ghosting than IMG_3922-3925; lines 168 (blank) and 175 (`for (const element of elements) {`) were reconstructed with lower confidence from faint/edge text — 175 is right at the bottom edge, only a fragment legible. Status bar unchanged: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar unchanged (utils folder, parse-info-xml.ts selected).
---
152	const hasDirectChild = (element: Element, selector: string): boolean => {
153	    return Array.from(element.children).some((child) => child.matches(selector));
154	};
155	
156	const looksLikeEffDateRates = (rootElement: Element): boolean => {
157	    const itemElements = Array.from(rootElement.querySelectorAll(':scope > item'));
158	    return itemElements.length > 0 && itemElements.some((item) => item.hasAttribute('date'));
159	};
160	
161	const looksLikeTaxInfo = (rootElement: Element): boolean => {
162	    const hasCityItems = Array.from(rootElement.querySelectorAll(':scope > item')).some(
163	        (item) => item.hasAttribute('city') || item.hasAttribute('citycode'),
164	    );
165	    const hasExceptions = hasDirectChild(rootElement, 'exception');
166	    return hasCityItems || hasExceptions;
167	};
168	
169	/**
170	 * Helper: Build a resilient generic table from arbitrary XML attributes.
171	 */
172	const toGenericSection = (rootElement: Element): InfoTableSection => {
173	    const rows: Array<Record<string, string>> = [];
174	    const elements = Array.from(rootElement.querySelectorAll('*'));
175	    for (const element of elements) {                              ⟪low confidence — fragment at bottom edge of screen⟫


========== IMG_3927.md ==========
---
photo: IMG_3927.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 161-185
orientation: 180
confidence: medium
notes: Same file/session as IMG_3917-3926 (branch "hitanshu/experimental*", 7:28 PM 7/10/2026), scrolled further down. No sticky-scroll header (range sits inside function bodies, not spanning a new outer scope boundary in a way VS Code chose to pin). Lines 161-174 re-confirm prior photos (`looksLikeTaxInfo`, JSDoc comment, start of `toGenericSection`). New content: lines 176-184 show the body of `toGenericSection`'s nested loops — for each element, for each attribute, push a `{ element: tagName, attribute: name, value }` row; the two `for` loops close at 183 and 184. Heavy scroll motion-blur ghosting in this photo (worse than IMG_3922-3925) made lines 178-182 ambiguous between crisp/ghost text in places; the transcription was reconstructed using the internally-consistent object-literal structure, precise gutter-number-aligned crops, and cross-checked against multiple overlapping crops. Line 185 initially appeared to be a crisp `});` at the bottom edge, but IMG_3928 (same file, scrolled slightly further, taken moments later) shows unambiguously that line 185 is blank and the function continues at 186 with `if (rows.length === 0) { ... }` (a fallback that pushes a single generic row from `rootElement` when no attributes were found) — the `});` originally read at 185 was a ghost echo of line 182's `});`. Status bar unchanged: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
161	const looksLikeTaxInfo = (rootElement: Element): boolean => {
162	    const hasCityItems = Array.from(rootElement.querySelectorAll(':scope > item')).some(
163	        (item) => item.hasAttribute('city') || item.hasAttribute('citycode'),
164	    );
165	    const hasExceptions = hasDirectChild(rootElement, 'exception');
166	    return hasCityItems || hasExceptions;
167	};
168	
169	/**
170	 * Helper: Build a resilient generic table from arbitrary XML attributes.
171	 */
172	const toGenericSection = (rootElement: Element): InfoTableSection => {
173	    const rows: Array<Record<string, string>> = [];
174	    const elements = Array.from(rootElement.querySelectorAll('*'));
175	
176	    for (const element of elements) {
177	        for (const attr of Array.from(element.attributes)) {
178	            rows.push({
179	                element: element.tagName,
180	                attribute: attr.name,
181	                value: attr.value,
182	            });
183	        }
184	    }
185	                                                                 ⟪confirmed blank via IMG_3928 cross-reference — see notes⟫


========== IMG_3928.md ==========
---
photo: IMG_3928.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 172-198
orientation: 180
confidence: high
notes: Same file/session as IMG_3917-3927 (branch "hitanshu/experimental*", 7:28 PM 7/10/2026), scrolled further down — this is the last photo in this batch. Sticky-scroll header pins line 172 (`toGenericSection`); real content resumes at line 176. Lines 176-184 re-confirm IMG_3927. Resolves IMG_3927's uncertainty at line 185: it is blank, and the function continues with a fallback block (186-192): if no attribute rows were collected, push a single row derived from `rootElement.tagName` / a literal `'value'` attribute / `rootElement.textContent`. Function then returns an `InfoTableSection` object (194-198+): `id: 'generic'`, `title: 'Information'`, and a `columns` array starting with `{ key: 'element', header: 'Element', width: '25%' }`. Two more column definitions (`{ key: 'attribute', header: 'Attribute', width: '25%' }` and `{ key: 'value', header: 'Value', width: '50%' }`) are visible directly below line 198 but their own gutter numbers are cut off by the status bar at the bottom edge — included below without line numbers, medium confidence only. This crops matches and completes the `InfoTableSection` shape referenced by the two other `return { id, title, columns }` object literals seen in earlier functions in this file (parse-permissions.ts pattern). Status bar unchanged: branch "hitanshu/experimental*", 2 errors / 0 warnings, "No Solution", Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Explorer sidebar unchanged (utils folder, parse-info-xml.ts selected).
---
[sticky-scroll header, enclosing scope]
172	const toGenericSection = (rootElement: Element): InfoTableSection => {

[main visible body]
176	    for (const element of elements) {
177	        for (const attr of Array.from(element.attributes)) {
178	            rows.push({
179	                element: element.tagName,
180	                attribute: attr.name,
181	                value: attr.value,
182	            });
183	        }
184	    }
185	
186	    if (rows.length === 0) {
187	        rows.push({
188	            element: rootElement.tagName,
189	            attribute: 'value',
190	            value: rootElement.textContent?.trim() || '',
191	        });
192	    }
193	
194	    return {
195	        id: 'generic',
196	        title: 'Information',
197	        columns: [
198	            { key: 'element', header: 'Element', width: '25%' },
[unnumbered — visible below line 198, cut off by status bar before their gutter numbers were legible]
	            { key: 'attribute', header: 'Attribute', width: '25%' },
	            { key: 'value', header: 'Value', width: '50%' },


========== IMG_3929.md ==========
---
photo: IMG_3929.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 172,189-214
orientation: 180
confidence: medium
notes: Photo has a pronounced double-exposure/motion-blur ghosting artifact — a faint, uncolored (no syntax highlighting) duplicate of nearby lines is smeared across the whole frame, offset a few lines up/left from the real content. Transcription below keeps only the sharp, syntax-colored text at each real gutter line number; the gray ghost text (appears to be lines ~186-188 and other nearby lines bleeding through, e.g. "rows.push({", "element: rootElement.tagName,", duplicated column arrays) was excluded as not authoritative. Line 172 is a VS Code sticky-scroll header (enclosing function signature for toGenericSection), shown pinned above line 189 which is actually visible in the viewport. Lines 193, 205, 212 are blank in the real file (only ghost text occupies those rows). Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open. Explorer sidebar (utils folder) shows: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, "normalize-service-config copy.ts", normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts (highlighted/active), parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts. Outline panel (right side, partially visible in original) lists many "parse-*"/"normalize-*" symbols. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock shows 7:28 PM 7/10/2026.
---
172:    const toGenericSection = (rootElement: Element): InfoTableSection => {   ⟪sticky-scroll header⟫

189:            attribute: 'value',
190:            value: rootElement.textContent?.trim() || '',
191:        });
192:    }
193:
194:        return {
195:            id: 'generic',
196:            title: 'Information',
197:            columns: [
198:                { key: 'element', header: 'Element', width: '25%' },
199:                { key: 'attribute', header: 'Attribute', width: '25%' },
200:                { key: 'value', header: 'Value', width: '50%' },
201:            ],
202:            rows,
203:        };
204:    };
205:
206:    /**
207:     * Helper: Parse legacy `effdaterates` XML payload into one 2-column section.
208:     */
209:    const parseEffDateRates = (rootElement: Element): ParsedInfoXml => {
210:        const headerItem = rootElement.querySelector('header > item');
211:        const title = headerItem ? readAttr(headerItem, 'description') : 'Effective Date of Rates';
212:
213:        const rows = Array.from(rootElement.querySelectorAll(':scope > item')).map((item) => ({
214:            description: readAttr(item, 'description'),


========== IMG_3930.md ==========
---
photo: IMG_3930.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 172,202-227
orientation: 180
confidence: high
notes: Same file as IMG_3929, scrolled further down (continuation). VS Code sticky-scroll shows line 172 (const toGenericSection = ... enclosing function signature) pinned above the viewport, which starts at line 202. Photo again has a faint double-exposure/motion-blur ghost of nearby lines bleeding through underneath the sharp text (most visible around lines 213-227, e.g. faint duplicate of "const rows = Array.from(...)" and the columns array) — excluded from transcription, only sharp/syntax-colored text used. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open (parse-info-xml.ts). Explorer sidebar (utils folder) same file list as IMG_3929, parse-info-xml.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock 7:28 PM 7/10/2026.
---
172:    const toGenericSection = (rootElement: Element): InfoTableSection => {   ⟪sticky-scroll header⟫

202:            rows,
203:        };
204:    };
205:
206:    /**
207:     * Helper: Parse legacy `effdaterates` XML payload into one 2-column section.
208:     */
209:    const parseEffDateRates = (rootElement: Element): ParsedInfoXml => {
210:        const headerItem = rootElement.querySelector('header > item');
211:        const title = headerItem ? readAttr(headerItem, 'description') : 'Effective Date of Rates';
212:
213:        const rows = Array.from(rootElement.querySelectorAll(':scope > item')).map((item) => ({
214:            description: readAttr(item, 'description'),
215:            date: readAttr(item, 'date'),
216:        }));
217:
218:        return {
219:            root: 'effdaterates',
220:            title,
221:            sections: [
222:                {
223:                    id: 'effdaterates-main',
224:                    columns: [
225:                        { key: 'description', header: 'Description', width: '75%' },
226:                        { key: 'date', header: 'Date', align: 'right', width: '25%' },
227:                    ],


========== IMG_3931.md ==========
---
photo: IMG_3931.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 209-235
orientation: 180
confidence: high
notes: Same file as IMG_3929/IMG_3930, scrolled further down; no sticky-scroll header this time (line 209 visible directly at top of viewport). Faint double-exposure/motion-blur ghost of nearby lines still bleeds through underneath the sharp text throughout (e.g. duplicate faint copies of the columns array and rawXml line) — excluded from transcription, only sharp/syntax-colored text used. Line 235 appears blank (only ghost text visible there). Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open (parse-info-xml.ts). Explorer sidebar (utils folder) same file list as prior photos, parse-info-xml.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock 7:28 PM 7/10/2026.
---
209:    const parseEffDateRates = (rootElement: Element): ParsedInfoXml => {
210:        const headerItem = rootElement.querySelector('header > item');
211:        const title = headerItem ? readAttr(headerItem, 'description') : 'Effective Date of Rates';
212:
213:        const rows = Array.from(rootElement.querySelectorAll(':scope > item')).map((item) => ({
214:            description: readAttr(item, 'description'),
215:            date: readAttr(item, 'date'),
216:        }));
217:
218:        return {
219:            root: 'effdaterates',
220:            title,
221:            sections: [
222:                {
223:                    id: 'effdaterates-main',
224:                    columns: [
225:                        { key: 'description', header: 'Description', width: '75%' },
226:                        { key: 'date', header: 'Date', align: 'right', width: '25%' },
227:                    ],
228:                    rows,
229:                },
230:            ],
231:            isKnownStructure: true,
232:            rawXml: rootElement.ownerDocument?.documentElement?.outerHTML || '',
233:        };
234:    };
235:


========== IMG_3932.md ==========
---
photo: IMG_3932.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 209,220-245
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3931 (lines 220-235 overlap with IMG_3931's 220-235, included here again per-photo as instructed; new content starts at line 236, the parseTaxInfo helper). VS Code sticky-scroll shows line 209 (const parseEffDateRates = ...) pinned above the viewport, which starts at line 220. Faint double-exposure/motion-blur ghost of nearby lines bleeds through underneath the sharp text throughout — excluded from transcription. Line 245 is cut off at the bottom edge of the visible editor area (status bar occludes the rest of the line); only "const exceptionRows = Array.from(rootElement.querySelectorAll(':scope > exception')).map(" is visible, continuation not captured in this photo. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open (parse-info-xml.ts). Explorer sidebar (utils folder) same file list as prior photos, parse-info-xml.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock 7:28 PM 7/10/2026.
---
209:    const parseEffDateRates = (rootElement: Element): ParsedInfoXml => {   ⟪sticky-scroll header⟫

220:            title,
221:            sections: [
222:                {
223:                    id: 'effdaterates-main',
224:                    columns: [
225:                        { key: 'description', header: 'Description', width: '75%' },
226:                        { key: 'date', header: 'Date', align: 'right', width: '25%' },
227:                    ],
228:                    rows,
229:                },
230:            ],
231:            isKnownStructure: true,
232:            rawXml: rootElement.ownerDocument?.documentElement?.outerHTML || '',
233:        };
234:    };
235:
236:    /**
237:     * Helper: Parse legacy `taxinfo` XML payload into city and exception sections.
238:     */
239:    const parseTaxInfo = (rootElement: Element): ParsedInfoXml => {
240:        const cityRows = Array.from(rootElement.querySelectorAll(':scope > item')).map((item) => ({
241:            city: readAttr(item, 'city'),
242:            citycode: readAttr(item, 'citycode'),
243:            exceptioncode: readAttr(item, 'exceptioncode'),
244:        }));
245:        const exceptionRows = Array.from(rootElement.querySelectorAll(':scope > exception')).map(⟪cut off at bottom edge⟫


========== IMG_3933.md ==========
---
photo: IMG_3933.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 209,221,229-254
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3932; content 229-245 overlaps prior photos, new content is lines 246-254 (exceptionRows mapping and start of the parseTaxInfo return statement). VS Code sticky-scroll shows two pinned lines this time: line 209 (const parseEffDateRates = ...) and line 221 (sections: [), above the viewport which starts at line 229. Faint double-exposure/motion-blur ghost of nearby lines bleeds through underneath the sharp text throughout — excluded from transcription. Line 254 is cut off at the very bottom edge (status bar); only "root: 'taxinfo'" is visible, rest not captured in this photo. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open (parse-info-xml.ts). Explorer sidebar (utils folder) same file list as prior photos, parse-info-xml.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock 7:28 PM 7/10/2026.
---
209:    const parseEffDateRates = (rootElement: Element): ParsedInfoXml => {   ⟪sticky-scroll header⟫
221:        sections: [   ⟪sticky-scroll header⟫

229:                },
230:            ],
231:            isKnownStructure: true,
232:            rawXml: rootElement.ownerDocument?.documentElement?.outerHTML || '',
233:        };
234:    };
235:
236:    /**
237:     * Helper: Parse legacy `taxinfo` XML payload into city and exception sections.
238:     */
239:    const parseTaxInfo = (rootElement: Element): ParsedInfoXml => {
240:        const cityRows = Array.from(rootElement.querySelectorAll(':scope > item')).map((item) => ({
241:            city: readAttr(item, 'city'),
242:            citycode: readAttr(item, 'citycode'),
243:            exceptioncode: readAttr(item, 'exceptioncode'),
244:        }));
245:
246:        const exceptionRows = Array.from(rootElement.querySelectorAll(':scope > exception')).map(
247:            (item) => ({
248:                taxcode: readAttr(item, 'taxcode'),
249:                footnote: readAttr(item, 'footnote'),
250:            }),
251:        );
252:
253:        return {
254:            root: 'taxinfo'⟪cut off at bottom edge⟫


========== IMG_3934.md ==========
---
photo: IMG_3934.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 239,240-264
orientation: 180
confidence: medium
notes: Same file, scrolled further down from IMG_3933; lines 240-254 overlap prior photos (consistent content/line numbers with IMG_3932/3933), new content is lines 255-264 (start of the taxinfo-cities section/columns). VS Code sticky-scroll shows one pinned line above the viewport (the parseTaxInfo function signature) — the gutter digit was blurred/double-exposed and read ambiguously as either "238" or "239" on close zoom; going with 239 since that matches the unambiguous, clean reading of the same line established in IMG_3933 and is consistent with line 240 (const cityRows) and lines 250-264 which all read cleanly here and match IMG_3933's numbering exactly. Faint double-exposure/motion-blur ghost of nearby lines bleeds through underneath the sharp text in the upper portion of the viewport (240-249 area) — excluded from transcription; lines 250-264 are photographed cleanly with no ghosting. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open (parse-info-xml.ts). Explorer sidebar (utils folder) same file list as prior photos, parse-info-xml.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock 7:28 PM 7/10/2026.
---
239:    const parseTaxInfo = (rootElement: Element): ParsedInfoXml => {   ⟪sticky-scroll header; gutter digit uncertain, read as 239 — see notes⟫

240:        const cityRows = Array.from(rootElement.querySelectorAll(':scope > item')).map((item) => ({
241:            city: readAttr(item, 'city'),
242:            citycode: readAttr(item, 'citycode'),
243:            exceptioncode: readAttr(item, 'exceptioncode'),
244:        }));
245:
246:        const exceptionRows = Array.from(rootElement.querySelectorAll(':scope > exception')).map(
247:            (item) => ({
248:                taxcode: readAttr(item, 'taxcode'),
249:                footnote: readAttr(item, 'footnote'),
250:            }),
251:        );
252:
253:        return {
254:            root: 'taxinfo',
255:            title: 'Tax City Information',
256:            sections: [
257:                {
258:                    id: 'taxinfo-cities',
259:                    title: 'City Information',
260:                    columns: [
261:                        { key: 'city', header: 'City', width: '50%' },
262:                        { key: 'citycode', header: 'City Code', align: 'right', width: '20%' },
263:                        {
264:                            key: 'exceptioncode',


========== IMG_3935.md ==========
---
photo: IMG_3935.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 239,252,253,254-277
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3934; this photo confirms the parseTaxInfo declaration is line 239 (clean, unambiguous gutter read here), resolving the uncertainty flagged in IMG_3934's notes. Lines 254-270 overlap prior photos, new content is lines 271-277 (start of the taxinfo-exceptions section/columns). VS Code sticky-scroll shows three pinned lines above the viewport: line 239 (const parseTaxInfo = ...), line 252 (blank/continuation of exceptionRows statement — shown as faint in sticky area), and line 253 (return {); viewport starts at line 254. Faint double-exposure/motion-blur ghost of nearby lines bleeds through underneath the sharp text throughout (e.g. duplicate faint copies of columns arrays) — excluded from transcription, only sharp/syntax-colored text used. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open (parse-info-xml.ts). Explorer sidebar (utils folder) same file list as prior photos, parse-info-xml.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock 7:29 PM 7/10/2026.
---
239:    const parseTaxInfo = (rootElement: Element): ParsedInfoXml => {   ⟪sticky-scroll header⟫
252:    ⟪sticky-scroll header, faint/uncertain — likely blank/continuation line⟫
253:        return {   ⟪sticky-scroll header⟫

254:            root: 'taxinfo',
255:            title: 'Tax City Information',
256:            sections: [
257:                {
258:                    id: 'taxinfo-cities',
259:                    title: 'City Information',
260:                    columns: [
261:                        { key: 'city', header: 'City', width: '50%' },
262:                        { key: 'citycode', header: 'City Code', align: 'right', width: '20%' },
263:                        {
264:                            key: 'exceptioncode',
265:                            header: 'Exception Code',
266:                            align: 'right',
267:                            width: '30%',
268:                        },
269:                    ],
270:                    rows: cityRows,
271:                },
272:                {
273:                    id: 'taxinfo-exceptions',
274:                    title: 'Tax Code Exceptions',
275:                    columns: [
276:                        { key: 'taxcode', header: 'Tax Code', width: '15%' },
277:                        { key: 'footnote', header: 'Description', width: '85%' },


========== IMG_3936.md ==========
---
photo: IMG_3936.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 239,256,260,267-285
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3935; lines 267-277 overlap prior photos, new content is lines 278-285 (end of the parseTaxInfo function — exceptionRows section closing, isKnownStructure/rawXml, closing braces). This appears to be the end of the parseTaxInfo helper. VS Code sticky-scroll shows three pinned lines above the viewport: line 239 (const parseTaxInfo = ...), line 256 (sections: [), and line 260 (columns: [); viewport starts at line 267. Heavy faint double-exposure/motion-blur ghost of nearby lines bleeds through underneath the sharp text throughout this photo — excluded from transcription, only sharp/syntax-colored text used. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open (parse-info-xml.ts). Explorer sidebar (utils folder) same file list as prior photos, parse-info-xml.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock 7:29 PM 7/10/2026.
---
239:    const parseTaxInfo = (rootElement: Element): ParsedInfoXml => {   ⟪sticky-scroll header⟫
256:        sections: [   ⟪sticky-scroll header⟫
260:                    columns: [   ⟪sticky-scroll header⟫

267:                            width: '30%',
268:                        },
269:                    ],
270:                    rows: cityRows,
271:                },
272:                {
273:                    id: 'taxinfo-exceptions',
274:                    title: 'Tax Code Exceptions',
275:                    columns: [
276:                        { key: 'taxcode', header: 'Tax Code', width: '15%' },
277:                        { key: 'footnote', header: 'Description', width: '85%' },
278:                    ],
279:                    rows: exceptionRows,
280:                },
281:            ],
282:            isKnownStructure: true,
283:            rawXml: rootElement.ownerDocument?.documentElement?.outerHTML || '',
284:        };
285:    };


========== IMG_3937.md ==========
---
photo: IMG_3937.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 239,256,274-298
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3936; lines 274-285 overlap prior photos (end of parseTaxInfo), new content is lines 286-298 (JSDoc for the main exported parseInfoXml API, and the start of its body handling the empty-input case). VS Code sticky-scroll shows two pinned lines: line 239 (const parseTaxInfo = ...) and line 256 (sections: [); viewport starts at line 274. Faint double-exposure/motion-blur ghost of nearby lines bleeds through underneath the sharp text in the upper portion — excluded from transcription; lines below ~286 are photographed cleanly with minimal ghosting. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open (parse-info-xml.ts). Explorer sidebar (utils folder) same file list as prior photos, parse-info-xml.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock 7:29 PM 7/10/2026.
---
239:    const parseTaxInfo = (rootElement: Element): ParsedInfoXml => {   ⟪sticky-scroll header⟫
256:        sections: [   ⟪sticky-scroll header⟫

274:                    title: 'Tax Code Exceptions',
275:                    columns: [
276:                        { key: 'taxcode', header: 'Tax Code', width: '15%' },
277:                        { key: 'footnote', header: 'Description', width: '85%' },
278:                    ],
279:                    rows: exceptionRows,
280:                },
281:            ],
282:            isKnownStructure: true,
283:            rawXml: rootElement.ownerDocument?.documentElement?.outerHTML || '',
284:        };
285:    };
286:
287:    /**
288:     * Main API: Parse XML from `DISPLAY_INFORMATION` / `DISPLAY_TAXCITY_INFORMATION` commands.
289:     */
290:    export const parseInfoXml = (xmlData: string): ParsedInfoXml => {
291:        const trimmed = (xmlData || '').trim();
292:
293:        if (!trimmed) {
294:            return {
295:                root: 'empty',
296:                title: 'Information',
297:                sections: [],
298:                isKnownStructure: false,


========== IMG_3938.md ==========
---
photo: IMG_3938.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 239,284-309
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3937; lines 284-298 overlap prior photos, new content is lines 299-309 (empty-input error message/rawXml, start of the try block that normalizes the payload and handles the invalid case). VS Code sticky-scroll shows one pinned line: line 239 (const parseTaxInfo = ...); viewport starts at line 284. Faint double-exposure/motion-blur ghost of nearby lines bleeds through underneath the sharp text in the upper portion — excluded from transcription; lower lines (299-309) photographed cleanly. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open (parse-info-xml.ts). Explorer sidebar (utils folder) same file list as prior photos, parse-info-xml.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock 7:29 PM 7/10/2026.
---
239:    const parseTaxInfo = (rootElement: Element): ParsedInfoXml => {   ⟪sticky-scroll header⟫

284:        };
285:    };
286:
287:    /**
288:     * Main API: Parse XML from `DISPLAY_INFORMATION` / `DISPLAY_TAXCITY_INFORMATION` commands.
289:     */
290:    export const parseInfoXml = (xmlData: string): ParsedInfoXml => {
291:        const trimmed = (xmlData || '').trim();
292:
293:        if (!trimmed) {
294:            return {
295:                root: 'empty',
296:                title: 'Information',
297:                sections: [],
298:                isKnownStructure: false,
299:                error: 'No XML content was provided for informational dialog.',
300:                rawXml: xmlData,
301:            };
302:        }
303:
304:        try {
305:            const normalizedPayload = tryNormalizeInfoXmlPayload(xmlData);
306:            if (!normalizedPayload) {
307:                return {
308:                    root: 'invalid',
309:                    title: 'Information',


========== IMG_3939.md ==========
---
photo: IMG_3939.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 290,294-319
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3938; lines 294-309 overlap prior photos, new content is lines 310-319 (rest of the "invalid payload" early return, and the start of document parsing/null-doc check). VS Code sticky-scroll shows one pinned line: line 290 (export const parseInfoXml = ...); viewport starts at line 294. Heavy faint double-exposure/motion-blur ghost of nearby lines bleeds through underneath the sharp text throughout this photo — excluded from transcription, only sharp/syntax-colored text used. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open (parse-info-xml.ts). Explorer sidebar (utils folder) same file list as prior photos, parse-info-xml.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock 7:29 PM 7/10/2026.
---
290:    export const parseInfoXml = (xmlData: string): ParsedInfoXml => {   ⟪sticky-scroll header⟫

294:            return {
295:                root: 'empty',
296:                title: 'Information',
297:                sections: [],
298:                isKnownStructure: false,
299:                error: 'No XML content was provided for informational dialog.',
300:                rawXml: xmlData,
301:            };
302:        }
303:
304:        try {
305:            const normalizedPayload = tryNormalizeInfoXmlPayload(xmlData);
306:            if (!normalizedPayload) {
307:                return {
308:                    root: 'invalid',
309:                    title: 'Information',
310:                    sections: [],
311:                    isKnownStructure: false,
312:                    error: 'Unable to parse informational XML payload.',
313:                    rawXml: xmlData,
314:                };
315:            }
316:
317:            const doc = parseXmlDocument(normalizedPayload.xml);
318:            if (!doc) {
319:                return {


========== IMG_3940.md ==========
---
photo: IMG_3940.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 290,305-330
orientation: 180
confidence: high
notes: Same file, scrolled further down from IMG_3939; lines 305-319 overlap prior photo, new content is lines 320-330 (the "!doc" early-return object, and the start of root element/tag-name resolution). VS Code sticky-scroll shows one pinned line: line 290 (export const parseInfoXml = ...); viewport starts at line 305. Faint double-exposure/motion-blur ghost of nearby lines bleeds through underneath the sharp text throughout this photo (most visible 307-327, duplicating the two near-identical "invalid"/"Unable to parse" return blocks) — excluded from transcription, only sharp/syntax-colored text used. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts. Single tab open (parse-info-xml.ts). Explorer sidebar (utils folder) same file list as prior photos, parse-info-xml.ts highlighted/active. Status bar: branch hitanshu/experimental*, 2 errors / 0 warnings, "No Solution". Windows taskbar clock 7:29 PM 7/10/2026.
---
290:    export const parseInfoXml = (xmlData: string): ParsedInfoXml => {   ⟪sticky-scroll header⟫

305:        const normalizedPayload = tryNormalizeInfoXmlPayload(xmlData);
306:        if (!normalizedPayload) {
307:            return {
308:                root: 'invalid',
309:                title: 'Information',
310:                sections: [],
311:                isKnownStructure: false,
312:                error: 'Unable to parse informational XML payload.',
313:                rawXml: xmlData,
314:            };
315:        }
316:
317:        const doc = parseXmlDocument(normalizedPayload.xml);
318:        if (!doc) {
319:            return {
320:                root: 'invalid',
321:                title: 'Information',
322:                sections: [],
323:                isKnownStructure: false,
324:                error: 'Unable to parse informational XML payload.',
325:                rawXml: xmlData,
326:            };
327:        }
328:
329:        const rootElement = doc.documentElement;
330:        const root = rootElement.tagName.toLowerCase();


========== IMG_3941.md ==========
---
photo: IMG_3941.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 290-335
orientation: 180
confidence: low
notes: Photo has severe double-exposure/motion-blur ghosting across the whole code pane — nearly every line appears twice, offset by a few px both vertically and diagonally (visible even in the line-number gutter, where each number "310","311",... is duplicated as a blurred/rotated ghost of itself, same value not a different one — confirms camera shake during a slow shutter, not two different scroll positions). Because of this, exact line-by-line mapping for the repeated guard-clause block (approx. lines 296-327) could not be reliably reconstructed; only the general repeated pattern could be made out, so the range is marked low confidence except for the sticky-scroll header (line 290) and the tail block (~329-335) which is legible because both ghost layers agree. Explorer sidebar (utils folder) visible: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, "normalize-service-config cop..." (copy, likely normalize-service-config copy.ts), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts (highlighted/open), parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts. Tab bar shows only "parse-info-xml.ts" open (single tab). Status bar: branch "hitanshu/experimental*" (dirty), "2 errors 0 warnings" (red "No Solution" badge), Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts > ... System clock 7:29 PM 7/10/2026 (client machine date, not real capture date).
---
Sticky scroll header:
290  export const parseInfoXml = (xmlData: string): ParsedInfoXml => {

Lines ~296-327 (ghosted/double-exposed, low confidence — appears to be a guard clause repeated roughly 2-3 times, one per preceding XML-root branch, of this general shape; exact line numbers for each repetition are unreliable):
    const doc = parseXmlDocument(normalizedPayload.xml);
    if (!doc) {
      return {
        root: 'invalid',
        title: 'Information',
        sections: [],
        isKnownStructure: false,
        error: 'Unable to parse informational XML payload.',
        rawXml: xmlData,
      };
    }

327  }
328
329  const rootElement = doc.documentElement;
330  const root = rootElement.tagName.toLowerCase();
331
332  if (root === 'effdaterates') {
333    return parseEffDateRates(rootElement);
334  }
335  if (root === 'taxinfo') {

[Lines 329-335 corrected/confirmed against the much sharper duplicate capture IMG_3942.JPG (same file, overlapping range 318-343) — see that transcript for high-confidence version of this whole region.]


========== IMG_3942.md ==========
---
photo: IMG_3942.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 290-343
orientation: 180
confidence: high
notes: Same file/function as IMG_3941.JPG (parseInfoXml), scrolled down slightly (gutter now 318-343 vs 310-335) and the ghosting/motion-blur artifact is much lighter this time — a faint dim duplicate of a slightly-earlier scroll position is visible behind the sharp foreground text but the foreground text itself is fully legible and used for this transcription. This photo corroborates and corrects the low-confidence middle section of IMG_3941.JPG. Function dispatches on lowercased root tag name: 'effdaterates' -> parseEffDateRates, 'taxinfo' -> parseTaxInfo, then falls back to looksLikeEffDateRates(rootElement) heuristic -> parseEffDateRates. Explorer sidebar (utils folder) visible, parse-info-xml.ts highlighted/open: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop... (copy), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts. Single tab open "parse-info-xml.ts". Status bar: branch "hitanshu/experimental*" (dirty), 2 errors 0 warnings, red "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts > ... Two colored dots left of line numbers 290 (orange/red) and 318 (green) — likely git gutter change markers or breakpoint/bookmark indicators. System clock 7:29 PM 7/10/2026 (client machine date).
---
Sticky scroll header:
290  export const parseInfoXml = (xmlData: string): ParsedInfoXml => {

318      if (!doc) {
319          return {
320              root: 'invalid',
321              title: 'Information',
322              sections: [],
323              isKnownStructure: false,
324              error: 'Unable to parse informational XML payload.',
325              rawXml: xmlData,
326          };
327      }
328
329      const rootElement = doc.documentElement;
330      const root = rootElement.tagName.toLowerCase();
331
332      if (root === 'effdaterates') {
333          return parseEffDateRates(rootElement);
334      }
335      (blank — ghost bleed-through of line 332's text, not real content)
336      if (root === 'taxinfo') {
337          return parseTaxInfo(rootElement);
338      }
339      (blank — ghost bleed-through of line 336's text, not real content)
340      if (looksLikeEffDateRates(rootElement)) {
341          return parseEffDateRates(rootElement);
342      }
343      (blank — ghost bleed-through of line 340's text, not real content)

Note: lines 335/339/343 were initially uncertain in this photo (the ghosted duplicate text was hard to distinguish from real content). Resolved via IMG_3943.JPG, a later photo of the same file scrolled slightly further, which shows the same photographic artifact clearly: the code pane's dim ghost layer is an exact copy of the sharp layer offset 3 gutter rows down, and lines 335/339/343/347 never show independent bold text of their own — only that bleed-through — confirming they are blank separator lines between the if-blocks. See IMG_3943.JPG for the confirmed continuation (lines 344-356).


========== IMG_3943.md ==========
---
photo: IMG_3943.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 290-356
orientation: 180
confidence: high
notes: Same file/function as IMG_3941.JPG and IMG_3942.JPG (parseInfoXml), scrolled further down. This photo has a consistent "ghost" double-exposure artifact throughout — a dim, semi-transparent duplicate of the code pane appears offset exactly 3 gutter rows below its real position (i.e. the pixels at gutter row N also faintly show the real text of row N-3). This confirms lines 335, 339, 343 and 347 are BLANK in the actual source: they only ever show the bled-through ghost of lines 332, 336, 340 and 344 respectively (verified by exact text match), never independent bold/sharp text of their own — this resolves an ambiguity left open in IMG_3942.JPG's transcript (that photo's line 343 is actually blank, not a real repeated condition). Confirms the dispatcher's full fallback-chain structure: known root tag -> parseEffDateRates/parseTaxInfo; else heuristic looksLikeEffDateRates/looksLikeTaxInfo -> same parsers; else generic fallback return using toGenericSection(rootElement); wrapped in a try and a "} catch {" block (line 355) whose body begins repeating a very similar generic-fallback return shape. Explorer sidebar (utils folder), parse-info-xml.ts highlighted: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop... (copy), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts. Single tab "parse-info-xml.ts" open. Status bar: branch "hitanshu/experimental*" (dirty), 2 errors 0 warnings, red "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts > ... Colored gutter dots: red/orange at line 290, green at line 331 (git change markers). System clock 7:29 PM 7/10/2026 (client machine date).
---
Sticky scroll header:
290  export const parseInfoXml = (xmlData: string): ParsedInfoXml => {

331  (blank)
332      if (root === 'effdaterates') {
333          return parseEffDateRates(rootElement);
334      }
335  (blank — ghost bleed-through of line 332 visible but not real content)
336      if (root === 'taxinfo') {
337          return parseTaxInfo(rootElement);
338      }
339  (blank — ghost bleed-through of line 336)
340      if (looksLikeEffDateRates(rootElement)) {
341          return parseEffDateRates(rootElement);
342      }
343  (blank — ghost bleed-through of line 340)
344      if (looksLikeTaxInfo(rootElement)) {
345          return parseTaxInfo(rootElement);
346      }
347  (blank — ghost bleed-through of line 344)
348      return {
349          root,
350          title: 'Information',
351          sections: [toGenericSection(rootElement)],
352          isKnownStructure: false,
353          rawXml: normalizedPayload.isRecovered ? normalizedPayload.xml : xmlData,
354      };
355  } catch {
356      return {

(photo cuts off at line 356; continuation in next photo in sequence)


========== IMG_3944.md ==========
---
photo: IMG_3944.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-info-xml.ts
lines: 290-371 (349-371 transcribed; 290 is sticky header only)
orientation: 180
confidence: high
notes: Same file as IMG_3941-3943.JPG (parseInfoXml), scrolled to the end of the function plus the start of the next export. Same photographic double-exposure artifact as prior photos in this run — a dim ghost of the code pane offset exactly 3 gutter rows below its real position. Used this consistent 3-row offset as a cross-check: for every questionable row, verified the dim ghost text there exactly equals the sharp real text 3 rows above, which resolved lines 357/358/360/361/363/365 (bold-looking text at first glance, cross-checked against what should ghost-bleed from 3 rows up) and confirmed line 366 and 371 are blank lines (only ghost bleed-through visible, no real content). This is the end of parseInfoXml (closes at line 365) followed by a blank line 366, then a new export canRenderInfoXmlTable (367-370), then blank line 371 (last visible row / likely EOF or just before it). Explorer sidebar (utils folder), parse-info-xml.ts highlighted: form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts, logger-builder.ts, menu-persistence.ts, normalize-service-config cop... (copy), normalize-service-config.ts, parse-combo-items.ts, parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts, performance-monitor.ts, permission-store.ts, pub-sub.ts, required-field-validation.ts. Single tab "parse-info-xml.ts" open. Status bar: branch "hitanshu/experimental*" (dirty), 2 errors 0 warnings, red "No Solution" badge, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Breadcrumb: aqs-web-ui > src > utils > parse-info-xml.ts > ... System clock 7:29 PM 7/10/2026 (client machine date).
---
Sticky scroll header:
290  export const parseInfoXml = (xmlData: string): ParsedInfoXml => {

349      root,
350      title: 'Information',
351      sections: [toGenericSection(rootElement)],
352      isKnownStructure: false,
353      rawXml: normalizedPayload.isRecovered ? normalizedPayload.xml : xmlData,
354  };
355  } catch {
356      return {
357          root: 'error',
358          title: 'Information',
359          sections: [],
360          isKnownStructure: false,
361          error: 'Unexpected error while processing informational XML.',
362          rawXml: xmlData,
363      };
364  }
365  };
366  (blank)
367  export const canRenderInfoXmlTable = (xmlData: string): boolean => {
368      const parsed = parseInfoXml(xmlData);
369      return !parsed.error && parsed.sections.length > 0;
370  };
371  (blank)
