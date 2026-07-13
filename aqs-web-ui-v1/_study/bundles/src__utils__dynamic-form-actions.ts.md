# BUNDLE for src/utils/dynamic-form-actions.ts
# 5 photo fragment(s), ascending start-line order.


========== IMG_3584.md ==========
---
photo: IMG_3584.JPG
type: vscode-code
file: aqs-web-ui/src/utils/dynamic-form-actions.ts
lines: 1-33
orientation: 180
confidence: high
notes: |
  Clean, sharp capture. Tab bar shows two tabs: "dynamic-model-type.ts" area
  no longer visible; tabs shown are "dynamic-form-actions.ts" (italic/preview,
  with a "2" badge next to it indicating 2 problems in this file) — active tab.
  File is a new file relative to prior photos in this chunk.
  Explorer sidebar (aqs-web-ui/src/utils), expanded — long alphabetical file list visible:
    command-handlers.ts, common.ts, control-metadata-extractor.ts, create-store.tsx,
    detect-modal-type.ts, dynamic-form-actions.ts [highlighted, active],
    error-handlers.ts, execute-action.ts, fallback-strategies.ts, form.ts,
    frame-router.ts, http-instance.ts, legacy-xml-detail.ts, local-storage.ts,
    logger-builder.ts, menu-persistence.ts, normalize-service-config cop... (truncated,
    looks like a duplicate/copy variant), normalize-service-config.ts, parse-combo-items.ts,
    parse-info-xml.ts, parse-permissions.ts, parse-querystring-params.ts, performance-benchmarks.ts
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "4" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:21 PM 7/10/2026.
  Squiggly underline visible under the '@features/page-build/services/page-build' import path (line 4).
---
1:  // Utility functions for dynamic form actions and calls extraction from page-build API
2:  // This enables generic handling for all pages
3:  import { z } from 'zod';
4:  import type { PageBuildResponse } from '@features/page-build/services/page-build';
5:
6:  // Define Zod schema for action controls
7:  export const ActionControlSchema = z.object({
8:    matchcode: z.string(),
9:    text: z.string(),
10:   calls: z.array(z.unknown()),
11:   '@subroutine': z.string().optional(),
12: });
13:
14: export type ActionControl = z.infer<typeof ActionControlSchema>;
15: /**
16:  * Extracts action controls and their associated calls from a page-build response.
17:  * Returns an array of { matchcode, text, calls } for each action control.
18:  */
19: export function extractActionControls(pageData: PageBuildResponse | null) {
20:   if (!pageData || !pageData.Page || !pageData.Page.controls || !pageData.Page.controls.control)
21:     return [];
22:   const controls = pageData.Page.controls.control;
23:   return controls
24:     .filter((ctrl: any) => ctrl.calls && ctrl['@matchcode'])
25:     .map((ctrl: any) => ({
26:       matchcode: ctrl['@matchcode'],
27:       text: ctrl['@text'],
28:       calls: Array.isArray(ctrl.calls.call)
29:         ? ctrl.calls.call
30:         : ctrl.calls.call
31:           ? [ctrl.calls.call]
32:           : [],
33:     }));


========== IMG_3585.md ==========
---
photo: IMG_3585.JPG
type: vscode-code
file: aqs-web-ui/src/utils/dynamic-form-actions.ts
lines: 6-39
orientation: 180
confidence: medium
notes: |
  Double-exposure/ghosting artifact (mid smooth-scroll capture, same as
  IMG_3580), fainter duplicate text overlaid ~2 lines offset throughout most
  of the frame. Lines 6-34 are a duplicate of content already transcribed
  cleanly in IMG_3584 (same file, same lines) — confirmed identical where
  legible through the ghosting. Lines 35-39 are new (not visible in IMG_3584)
  and are clearly legible (less ghosting near the bottom of this capture) —
  see zoomed crop confirmation.
  Tab bar: "dynamic-form-actions.ts" (with "2" problems badge), active tab.
  Explorer sidebar (aqs-web-ui/src/utils) same expanded file list as IMG_3584.
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "4" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:21 PM 7/10/2026.
---
6:  // Define Zod schema for action controls
7:  export const ActionControlSchema = z.object({
8:    matchcode: z.string(),
9:    text: z.string(),
10:   calls: z.array(z.unknown()),
11:   '@subroutine': z.string().optional(),
12: });
13:
14: export type ActionControl = z.infer<typeof ActionControlSchema>;
15: /**
16:  * Extracts action controls and their associated calls from a page-build response.
17:  * Returns an array of { matchcode, text, calls } for each action control.
18:  */
19: export function extractActionControls(pageData: PageBuildResponse | null) {
20:   if (!pageData || !pageData.Page || !pageData.Page.controls || !pageData.Page.controls.control)
21:     return [];
22:   const controls = pageData.Page.controls.control;
23:   return controls
24:     .filter((ctrl: any) => ctrl.calls && ctrl['@matchcode'])
25:     .map((ctrl: any) => ({
26:       matchcode: ctrl['@matchcode'],
27:       text: ctrl['@text'],
28:       calls: Array.isArray(ctrl.calls.call)
29:         ? ctrl.calls.call
30:         : ctrl.calls.call
31:           ? [ctrl.calls.call]
32:           : [],
33:     }));
34: }
35:
36: // Additional utilities for eeData and dynamic form handling can be added here.
37:
38: /**
39:  * Builds EEData array dynamically based on control, form state, and navigation data.


========== IMG_3586.md ==========
---
photo: IMG_3586.JPG
type: vscode-code
file: aqs-web-ui/src/utils/dynamic-form-actions.ts
lines: 19-34 (partial/duplicate), 40-56 (approx)
orientation: 180
confidence: medium
notes: |
  Heavy double-exposure/ghosting artifact throughout (same mid-scroll-animation
  effect as IMG_3580/3585), fainter duplicate text offset ~2 lines above each
  sharp line. Top of frame (lines 19-34) duplicates content already transcribed
  cleanly in IMG_3584/3585 (extractActionControls function) — not re-transcribed
  in full here, see those files.
  New content in this photo: lines 35-52 clearly legible (buildEEData function
  signature and first few statements). Below line 52 the gutter line numbers
  become impossible to disambiguate — sharp and ghost line-number digits overlap
  each other in the gutter AND the content is clipped by the status bar at the
  bottom of the screen. The content of the return array (matchcode, policyType,
  transactionId entries with trailing comments, and closing `];`) is visible and
  legible in isolation but its exact line numbers (~53-56) are a reconstruction,
  not a direct read — flagged medium/low confidence.
  Tab bar: "dynamic-form-actions.ts" (with "2" problems badge), active tab.
  Explorer sidebar (aqs-web-ui/src/utils) same expanded file list as prior photos.
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "4" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:21 PM 7/10/2026.
---
40:  */
41:  export function buildEEData(
42:    control: any,
43:    formState: Record<string, string>,
44:    navigationData?: { xmlFilePath?: string },
45:  ): string[] {
46:    const xmlFilePath = navigationData?.xmlFilePath ?? '';
47:    const matchcode = control['@matchcode'] ?? '';
48:    const policyType = formState['PolicyType'] || 'NEW';
49:    const transactionId = formState['transactionid'] || control['@transactionid'] || '1';
50:
51:    return [
52:      xmlFilePath, // XML file path
   ⟪approx. line numbers below, ~53-56, gutter not reliably resolvable through ghosting/status-bar clipping⟫
53:      matchcode, // Action/control identifier
54:      policyType, // Policy type
55:      transactionId, // Transaction ID⟪?⟫
56:      ⟪?⟫ (likely closing `];` — not visible, below viewport/status bar)


========== IMG_3587.md ==========
---
photo: IMG_3587.JPG
type: vscode-code
file: aqs-web-ui/src/utils/dynamic-form-actions.ts
lines: 35-65 (tail ~53-65 uncertain)
orientation: 180
confidence: medium
notes: |
  Same double-exposure/ghosting artifact as other photos in this scroll
  sequence (IMG_3580/3585/3586), fainter duplicate text offset ~2 lines above
  each sharp line, compounded here by the array literal's repetitive tokens
  (matchcode/transactionId/'' appear multiple times), which makes exact
  line-to-content pairing for lines ~53-65 considerably harder than usual —
  cross-checked against three overlapping crops but line numbers 53-64 below
  should be treated as a best-effort reconstruction, not a confirmed direct
  read. Lines 35-52 are high confidence (cross-confirmed against IMG_3585/3586).
  Structurally, the return array appears to build a fixed-position legacy
  EEData string array: xmlFilePath, matchcode, policyType, transactionId,
  then reserved/blank slots interleaved with repeated matchcode/transactionId
  values (comments literally say "(repeat)"), closed by `];` then `}`.
  CORRECTION: IMG_3588 (same file, cleaner capture, no ghosting) gives a
  confirmed high-confidence read of this exact range — see IMG_3588.md. The
  confirmed sequence for lines 53-65 is: matchcode(53)/policyType(54)/
  transactionId(55)/''(56)/transactionId-repeat(57)/''(58)/''(59)/
  ''-reserved(60)/matchcode-repeat(61)/''(62)/''(63)/''-reserved(64)/];(65).
  The reconstruction below (made before IMG_3588 was processed) is close but
  not exact — defer to IMG_3588.md for this range.
  Tab bar: "dynamic-form-actions.ts" (with "2" problems badge), active tab.
  Explorer sidebar (aqs-web-ui/src/utils) same expanded file list as prior photos.
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "4" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:21 PM 7/10/2026.
---
35:  export function extractActionControls(pageData: PageBuildResponse | null) {
       (sticky-scroll header artifact overlapping line 19's signature — see IMG_3584/3585 for that function)
36:  // Additional utilities for eeData and dynamic form handling can be added here.
37:
38:  /**
39:   * Builds EEData array dynamically based on control, form state, and navigation data.
40:   */
41:  export function buildEEData(
42:    control: any,
43:    formState: Record<string, string>,
44:    navigationData?: { xmlFilePath?: string },
45:  ): string[] {
46:    const xmlFilePath = navigationData?.xmlFilePath ?? '';
47:    const matchcode = control['@matchcode'] ?? '';
48:    const policyType = formState['PolicyType'] || 'NEW';
49:    const transactionId = formState['transactionid'] || control['@transactionid'] || '1';
50:
51:    return [
52:      xmlFilePath, // XML file path
   ⟪lines 53-64 below: best-effort reconstruction, medium/low confidence — see notes⟫
53:      matchcode, // Action/control identifier
54:      policyType, // Policy type
55:      transactionId, // Transaction ID
56:      '', // Reserved/unused
57:      transactionId, // Transaction ID (repeat)
58:      '', // Reserved/unused
59:      matchcode, // Action/control identifier (repeat)
60:      '', // Reserved/unused
61:      matchcode, // Action/control identifier (repeat)
62:      '', // Reserved/unused
63:    ];
64:  }
65:  ⟪?⟫ (blank or start of next JSDoc block — not reliably legible)


========== IMG_3588.md ==========
---
photo: IMG_3588.JPG
type: vscode-code
file: aqs-web-ui/src/utils/dynamic-form-actions.ts
lines: 38-39 (sticky), 46-70
orientation: 180
confidence: high
notes: |
  Much cleaner capture than IMG_3586/3587 — little to no ghosting through most
  of the frame (only lines ~46-51 have mild ghost overlap). This photo
  definitively resolves the buildEEData() return-array tail that was uncertain
  in IMG_3586/IMG_3587: the array has 13 elements (lines 52-64) closing with
  `];` at 65 and `}` at 66, followed by a blank line and the next function's
  JSDoc starting at 68 ("Builds an XML string for the xmlDetail property...").
  CORRECTION to IMG_3587.md: that photo's best-effort reconstruction for lines
  53-64 was close but not exact — see the confirmed sequence below (in
  particular there are three consecutive '' reserved slots at 58-59-60 and
  again at 62-63-64, not the pattern guessed in IMG_3587).
  Sticky scroll shows breadcrumb only (no enclosing function line pinned) plus
  lines 38-39 of the JSDoc for buildEEData scrolled into the pinned region.
  Tab bar: "dynamic-form-actions.ts" (with "2" problems badge), active tab.
  Explorer sidebar (aqs-web-ui/src/utils) same expanded file list as prior photos.
  Status bar: workspace "aqs-web-ui", branch "hitanshu/experimental*" (dirty), "4" errors / "0" warnings,
    red "No Solution" indicator, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript. Timestamp 6:21 PM 7/10/2026.
---
38:  /**
39:   * Builds EEData array dynamically based on control, form state, and navigation data.
       ... (lines 40-45 not visible — occluded above viewport)
46:    const xmlFilePath = navigationData?.xmlFilePath ?? '';
47:    const matchcode = control['@matchcode'] ?? '';
48:    const policyType = formState['PolicyType'] || 'NEW';
49:    const transactionId = formState['transactionid'] || control['@transactionid'] || '1';
50:
51:    return [
52:      xmlFilePath, // XML file path
53:      matchcode, // Action/control identifier
54:      policyType, // Policy type
55:      transactionId, // Transaction ID
56:      '', // Reserved/unused
57:      transactionId, // Transaction ID (repeat)
58:      '',
59:      '',
60:      '', // Reserved/unused
61:      matchcode, // Action/control identifier (repeat)
62:      '',
63:      '',
64:      '', // Reserved/unused
65:    ];
66:  }
67:
68:  /**
69:   * Builds an XML string for the xmlDetail property from form state and keys.
70:   */
