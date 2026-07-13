# BUNDLE for src/constants/button-matchcodes.ts
# 3 photo fragment(s), ascending start-line order.


========== IMG_2299.md ==========
---
photo: IMG_2299.JPG
type: vscode-code
file: aqs-web-ui/src/constants/button-matchcodes.ts
lines: 1-34
orientation: 180
confidence: high
notes: Top of file visible (line 1 start), scrolled to show through line 34 (bottom row "'SET_SEARCH'," partially cut off by horizontal scrollbar at bottom of editor, only top half of the line's glyphs visible but text legible). Line 16 comment is truncated at the right edge of the editor (not wrapped): "// Navigation buttons  (VBS: NavButtonOnClick -> Case "DTAOK", "DTANEXT", "DTAOKSPECIAL", "DTACANCEL", "DT" then cut off — rest of the comment not visible in this photo. Explorer sidebar (aqs-web-ui/src) shows: components (header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx [U], radio.tsx, select.tsx, sub-header.tsx, text.tsx, textarea.tsx, XmlList.tsx [U]), config (action-config.ts, db.json), constants (asp-route-map.ts, button-matchcodes.ts - selected/highlighted, theme.ts), features, hooks, lib, pages, providers, services. Tab bar: "date.tsx 9+" and active "button-matchcodes.ts". Breadcrumb: aqs-web-ui > src > constants > TS button-matchcodes.ts > ... . Status bar: branch hitanshu/experimental*, "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
1    /**
2     * Centralized set of all known button matchcodes across the AQS application.
3     *
4     * Sourced from the full AQS legacy codebase (VBS + C#):
5     *   Navigation : OK | NEXT | CANCEL | BACK | OKSPECIAL
6     *   CRUD       : ADD | DELETE | SAVE | APPLY
7     *   Search     : SEARCH | SET_SEARCH
8     *   Form       : SUBMIT | RESET | CLEAR
9     *   Misc       : RATE | COPYADDRESS | OVERRIDEPRINT
10    *
11    * Import this constant wherever you need to identify button controls from
12    * the API response (e.g. useButtonExtraction, ActionButtons, etc.).
13    * Declare here ONCE - never duplicate.
14    */
15   export const BUTTON_MATCHCODES = new Set([
16       // Navigation buttons  (VBS: NavButtonOnClick -> Case "DTAOK", "DTANEXT", "DTAOKSPECIAL", "DTACANCEL", "DT⟪?⟫
17       'OK',
18       'NEXT',
19       'CANCEL',
20       'BACK',
21       'OKSPECIAL',
22
23       // CRUD buttons  (C#: cLocAdrEntEdt, cKRMState, cPRPSpcCovEntEdt, cLIASpcCovEntEdt, etc.)
24       'ADD',
25       'DELETE',
26       'SAVE',
27
28       // Action / workflow buttons
29       'APPLY',
30       'RATE', // IBUTTON on menu toolbar (VBS line 5449)
31
32       // Search buttons  (C#: cPOE4, cLC14, cBOE4, cKRMState, cBOPBldClsEntEdt, cRRE4)
33       'SEARCH',
34       'SET_SEARCH',


========== IMG_2300.md ==========
---
photo: IMG_2300.JPG
type: vscode-code
file: aqs-web-ui/src/constants/button-matchcodes.ts
lines: 11-44
orientation: 180
confidence: high
notes: Same file as IMG_2299, scrolled down to show the rest through end of file (line 44 "]) as Set<string>;" is the last line). No sticky-scroll header shown (top two lines of viewport are plain continuation of the block comment, not a pinned header). Line 16 comment still truncated at right edge, same as IMG_2299: "// Navigation buttons  (VBS: NavButtonOnClick -> Case "DTAOK", "DTANEXT", "DTAOKSPECIAL", "DTACANCEL", "DT⟪?⟫". Explorer sidebar unchanged from IMG_2299 (button-matchcodes.ts selected under constants, alongside asp-route-map.ts and theme.ts). Tab bar: "date.tsx 9+" and active "button-matchcodes.ts". Status bar: branch hitanshu/experimental*, "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
11    * Import this constant wherever you need to identify button controls from
12    * the API response (e.g. useButtonExtraction, ActionButtons, etc.).
13    * Declare here ONCE - never duplicate.
14    */
15   export const BUTTON_MATCHCODES = new Set([
16       // Navigation buttons  (VBS: NavButtonOnClick -> Case "DTAOK", "DTANEXT", "DTAOKSPECIAL", "DTACANCEL", "DT⟪?⟫
17       'OK',
18       'NEXT',
19       'CANCEL',
20       'BACK',
21       'OKSPECIAL',
22
23       // CRUD buttons  (C#: cLocAdrEntEdt, cKRMState, cPRPSpcCovEntEdt, cLIASpcCovEntEdt, etc.)
24       'ADD',
25       'DELETE',
26       'SAVE',
27
28       // Action / workflow buttons
29       'APPLY',
30       'RATE', // IBUTTON on menu toolbar (VBS line 5449)
31
32       // Search buttons  (C#: cPOE4, cLC14, cBOE4, cKRMState, cBOPBldClsEntEdt, cRRE4)
33       'SEARCH',
34       'SET_SEARCH',
35
36       // Form-level buttons
37       'SUBMIT',
38       'RESET',
39       'CLEAR',
40
41       // Misc / domain-specific buttons
42       'COPYADDRESS', // cLocAdrEntEdt (location address pages)
43       'OVERRIDEPRINT', // cDocSum (document summary pages)
44   ]) as Set<string>;


========== IMG_2301.md ==========
---
photo: IMG_2301.JPG
type: vscode-code
file: aqs-web-ui/src/constants/button-matchcodes.ts
lines: 15,26-45
orientation: 180
confidence: high
notes: Same file/tab as IMG_2299/2300 (button-matchcodes.ts), scrolled to show sticky-scroll header "15  export const BUTTON_MATCHCODES = new Set([" pinned at top, then body from line 26 through end of file (line 44 "]) as Set<string>;", line 45 blank/EOF). Content is a duplicate confirmation of IMG_2300's lines 26-44, with no new information beyond it. Explorer sidebar unchanged (button-matchcodes.ts selected under constants, alongside asp-route-map.ts and theme.ts). Tab bar: "date.tsx 9+" and active "button-matchcodes.ts". Status bar: branch hitanshu/experimental*, "No Solution", 25 errors / 0 warnings, Ln 1 Col 1, Tab Size 4, UTF-8, CRLF, TypeScript.
---
15   export const BUTTON_MATCHCODES = new Set([

26       'SAVE',
27
28       // Action / workflow buttons
29       'APPLY',
30       'RATE', // IBUTTON on menu toolbar (VBS line 5449)
31
32       // Search buttons  (C#: cPOE4, cLC14, cBOE4, cKRMState, cBOPBldClsEntEdt, cRRE4)
33       'SEARCH',
34       'SET_SEARCH',
35
36       // Form-level buttons
37       'SUBMIT',
38       'RESET',
39       'CLEAR',
40
41       // Misc / domain-specific buttons
42       'COPYADDRESS', // cLocAdrEntEdt (location address pages)
43       'OVERRIDEPRINT', // cDocSum (document summary pages)
44   ]) as Set<string>;
45
