# BUNDLE for src/hooks/use-required-field-validation.ts
# 4 photo fragment(s), ascending start-line order.


========== IMG_2859.md ==========
---
photo: IMG_2859.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-required-field-validation.ts
lines: 1-34
orientation: 180
confidence: high
notes: Clean, sharp capture, no motion blur. New file opened — tab "use-required-field-validation.ts" (1 unsaved change), breadcrumb aqs-web-ui > src > hooks > use-required-field-validation.ts. Explorer sidebar: hooks folder now shows use-action-guard.ts, use-browser-commands.ts, use-deferred-navigation.ts, use-form-commit.ts, use-page-form.ts, use-required-field-valid... (selected, highlighted), use-smart-navigation.ts. Also visible: features > prp > utils, root > services > user-data.ts, utils > loader.ts/middleware.ts; lib, pages, providers, services, types, utils, app.css at aqs-web-ui root. Status bar: branch hitanshu/experimental*, 3 errors/0 warnings (down from 29 — different file), "No Solution", 5:20 PM 7/10/2026. Cursor Ln 1, Col 1. This is the start of the file: JSDoc header block describing the hook's purpose/behaviour/usage, then imports, then the Types section header comment and start of RequiredFieldValidationResult interface.
---
1: /**
2:  * useRequiredFieldValidation Hook
3:  * ────────────────────────────────
4:  * React hook that wraps the pure `checkRequiredFields` utility.
5:  * Recomputes whenever fields, values, or fieldMeta change.
6:  *
7:  * Mirrors the VBS `CheckRequiredIndicators` behaviour:
8:  *   - If ALL required+visible fields have values → buttons (OK, NEXT) enabled
9:  *   - If ANY required+visible field is empty     → buttons (OK, NEXT) disabled
10:  *
11:  * Usage:
12:  *   const { allRequiredFilled, missingFields, buttonDisableMap } =
13:  *       useRequiredFieldValidation(fields, values, fieldMeta, ['OK', 'NEXT']);
14:  */
15:
16: import { useMemo } from 'react';
17: import {
18:     checkRequiredFields,
19:     computeButtonDisableMap,
20:     type RequiredFieldResult,
21:     type ButtonDisableMap,
22: } from '@/utils/required-field-validation';
23:
24: import type { NormalizedField, FormValues } from '@/types';
25:
26: // ─────────────────────────────────────────────────────────────────
27: // Types
28: // ─────────────────────────────────────────────────────────────────
29:
30: export interface RequiredFieldValidationResult extends RequiredFieldResult {
31:     /**
32:      * Map of button matchcodes (upper-cased) to `{ disabled }` state.
33:      * Only contains entries for `buttonsAffected`.
34:      */


========== IMG_2860.md ==========
---
photo: IMG_2860.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-required-field-validation.ts
lines: 22-55
orientation: 180
confidence: medium
notes: Double-exposure/motion-blur ghosting throughout (same scroll-capture artifact seen in the use-page-form.ts photos). Lines 22-27 cross-validated as high confidence against the clean IMG_2859 capture (imports + Types divider). Lines 30-36 (RequiredFieldValidationResult interface body) also match IMG_2859 continuation. Lines 37-49 (Hook section divider + JSDoc @param list) cross-validated and corrected against the clearer overlapping capture in IMG_2861 (same file, same lines, taken moments later with better legibility). Lines 50-55 (function signature, first params) corrected against IMG_2861 which shows line 51 is a single unbroken line (not split across two lines as originally guessed here). Explorer sidebar and status bar unchanged (use-required-field-validation.ts selected, 3 errors/0 warnings, branch hitanshu/experimental*, No Solution, 5:20 PM 7/10/2026). Cursor Ln 1, Col 1 (stale).
---
22: } from '@/utils/required-field-validation';
23:
24: import type { NormalizedField, FormValues } from '@/types';
25:
26: // ─────────────────────────────────────────────────────────────────
27: // Types
28: // ─────────────────────────────────────────────────────────────────
29:
30: export interface RequiredFieldValidationResult extends RequiredFieldResult {
31:     /**
32:      * Map of button matchcodes (upper-cased) to `{ disabled }` state.
33:      * Only contains entries for `buttonsAffected`.
34:      */
35:     buttonDisableMap: ButtonDisableMap;
36: }
37:
38: // ─────────────────────────────────────────────────────────────────
39: // Hook
40: // ─────────────────────────────────────────────────────────────────
41: ⟪blank?⟫
42: /**
43:  * @param fields             Normalized field definitions (from API / normalizeServiceConfig)
44:  * @param values             Current form values keyed by matchcode
45:  * @param fieldMeta          Optional runtime overrides for `disabled` / `visible`
46:  * @param buttonMatchcodes   All button matchcodes present on the page (e.g. ["OK","CANCEL","NEXT"])
47:  * @param buttonsAffected    Which buttons should be auto-toggled.
48:  *                           When omitted the core utility uses its VBS-derived default.
49:  */
50: export function useRequiredFieldValidation(
51:     fields: ReadonlyArray<Pick<NormalizedField, 'matchcode' | 'label' | 'required' | 'visible' | 'controlType'>>,
52:     values: FormValues,
53:     fieldMeta?: Record<string, { disabled?: boolean; visible?: boolean }>,
54:     buttonMatchcodes: string[] = [],
55:     buttonsAffected?: string[],


========== IMG_2861.md ==========
---
photo: IMG_2861.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-required-field-validation.ts
lines: 30-68
orientation: 180
confidence: medium
notes: Double-exposure/motion-blur ghosting throughout (same scroll-capture artifact as IMG_2860). Lines 30-55 cross-validated as high confidence against IMG_2860 (and used to correct that transcript's line 51-53 split). Line-number gutter itself double-exposed/ghosted from row ~62 onward (verified via a tight gutter-only crop: sharp numbers run 44-61 continuously, then jump straight to 65-68, meaning rows 62-64 exist but their numerals were not sharply resolved in this shot). Lines 56-61 clearly legible. Lines 62-64 (arguments to computeButtonDisableMap) are LOW confidence — row numbers assumed sequential but exact content per row is a best-effort placeholder, marked ⟪?⟫; partially-legible fragments visible somewhere in the blur include "validationResult," "buttonMatchcodes," and "buttonsAffected !== undefined ? [buttonsAffected] : [])," which likely belong here but could not be pinned to specific rows. Lines 65-68 (closing paren, return statement start, spread of validationResult) legible at medium confidence. Explorer sidebar and status bar unchanged (use-required-field-validation.ts selected, 3 errors/0 warnings, branch hitanshu/experimental*, No Solution, 5:20 PM 7/10/2026). Cursor Ln 1, Col 1 (stale).
---
30: export interface RequiredFieldValidationResult extends RequiredFieldResult {
36: }
37:
38: // ─────────────────────────────────────────────────────────────────
39: // Hook
40: // ─────────────────────────────────────────────────────────────────
41:
42: /**
43:  * @param fields             Normalized field definitions (from API / normalizeServiceConfig)
44:  * @param values             Current form values keyed by matchcode
45:  * @param fieldMeta          Optional runtime overrides for `disabled` / `visible`
46:  * @param buttonMatchcodes   All button matchcodes present on the page (e.g. ["OK","CANCEL","NEXT"])
47:  * @param buttonsAffected    Which buttons should be auto-toggled.
48:  *                           When omitted the core utility uses its VBS-derived default.
49:  */
50: export function useRequiredFieldValidation(
51:     fields: ReadonlyArray<Pick<NormalizedField, 'matchcode' | 'label' | 'required' | 'visible' | 'controlType'>>,
52:     values: FormValues,
53:     fieldMeta?: Record<string, { disabled?: boolean; visible?: boolean }>,
54:     buttonMatchcodes: string[] = [],
55:     buttonsAffected?: string[],
56: ⟪?⟫
57: ⟪?⟫
58: ): RequiredFieldValidationResult {
59:     return useMemo(() => {
60:         const validationResult = checkRequiredFields(fields, values, fieldMeta);
61:         const buttonDisableMap = computeButtonDisableMap(
62:             ⟪?⟫
63:             ⟪? buttonMatchcodes,⟫
64:             ⟪? buttonsAffected !== undefined ? [buttonsAffected] : [],⟫
65:         );
66:
67:         return {
68:             ...validationResult,


========== IMG_2862.md ==========
---
photo: IMG_2862.JPG
type: vscode-code
file: aqs-web-ui/src/hooks/use-required-field-validation.ts
lines: 46-73 (end of file)
orientation: 180
confidence: medium
notes: Heavy double-exposure/motion-blur ghosting throughout (same scroll-capture artifact as IMG_2860/IMG_2861 of this file). Lines 46-55 are the same JSDoc @param block / function-signature params already established at HIGH/cross-validated confidence from IMG_2860+IMG_2861 (two independent photos agreeing) — reused here verbatim rather than re-derived from this blurrier shot, since this photo's own alignment of gutter numbers to that text was internally inconsistent (ghost bleed made row53 appear to carry "fields: ReadonlyArray<" which contradicts the 2-photo consensus that fields is line 51 — treated as blur artifact, not a real discrepancy). Lines 56-57 remain UNRESOLVED (⟪?⟫), same as IMG_2861 — no photo has cleanly captured them; they fall between "buttonsAffected?: string[]," (55) and "): RequiredFieldValidationResult {" (58), so likely either blank line(s) or one more optional parameter, but not legible in any capture. Lines 58-61 cross-validated at high confidence against IMG_2861 AND independently re-confirmed sharp in this photo (): RequiredFieldValidationResult {, return useMemo(() => {, const validationResult = checkRequiredFields(fields, values, fieldMeta);, const buttonDisableMap = computeButtonDisableMap(). Lines 62-63 are NEW: this photo's sharp/foreground layer clearly shows "buttonMatchcodes," then "buttonsAffected !== undefined ? [buttonsAffected] : [])," as the two call arguments — this independently corroborates IMG_2861's own low-confidence ⟪?⟫ guess for the same content, so confidence raised to medium. Line 64 is UNRESOLVED (⟪?⟫) — expected to be either the closing ");" or a continuation/blank, but the exact row could not be pinned down amid the ghosting (closing ");" was instead read with medium confidence at line 65, based on a separate tight crop of the lines-65-73 region that showed less blur). Lines 66-71 (blank, return {, ...validationResult,, buttonDisableMap,, };, }, [fields, values, fieldMeta, buttonMatchcodes, buttonsAffected]);) reconstructed at medium confidence from a clearer crop of that region, internally consistent with standard React hook wrap-up shape and with IMG_2861's partial read of "return {" / "...validationResult,". Lines 72-73 (closing "}" of the function, then trailing blank/EOF line) are SHARP/unambiguous in this photo — no ghosting at the very bottom, high confidence — and mark the end of the file. Same tab/sidebar/status-bar context as IMG_2859-2861 (use-required-field-validation.ts selected, 3 errors/0 warnings, branch hitanshu/experimental*, No Solution, 5:20 PM 7/10/2026). Cursor Ln 1, Col 1 (stale).
---
46:  * @param buttonMatchcodes   All button matchcodes present on the page (e.g. ["OK","CANCEL","NEXT"])
47:  * @param buttonsAffected    Which buttons should be auto-toggled.
48:  *                           When omitted the core utility uses its VBS-derived default.
49:  */
50: export function useRequiredFieldValidation(
51:     fields: ReadonlyArray<Pick<NormalizedField, 'matchcode' | 'label' | 'required' | 'visible' | 'controlType'>>,
52:     values: FormValues,
53:     fieldMeta?: Record<string, { disabled?: boolean; visible?: boolean }>,
54:     buttonMatchcodes: string[] = [],
55:     buttonsAffected?: string[],
56: ⟪?⟫
57: ⟪?⟫
58: ): RequiredFieldValidationResult {
59:     return useMemo(() => {
60:         const validationResult = checkRequiredFields(fields, values, fieldMeta);
61:         const buttonDisableMap = computeButtonDisableMap(
62:             buttonMatchcodes,
63:             buttonsAffected !== undefined ? [buttonsAffected] : [],
64: ⟪?⟫
65:         );
66:
67:         return {
68:             ...validationResult,
69:             buttonDisableMap,
70:         };
71:     }, [fields, values, fieldMeta, buttonMatchcodes, buttonsAffected]);
72: }
73:
