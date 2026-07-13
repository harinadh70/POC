# BUNDLE for src/pages/page-not-found.tsx
# 2 photo fragment(s), ascending start-line order.


========== IMG_2967.md ==========
---
photo: IMG_2967.JPG
type: vscode-code
file: aqs-web-ui/src/pages/page-not-found.tsx
lines: 1-33 (whole file)
orientation: 180
confidence: high
notes: Sharp, minimal blur — whole file fits on screen (lines 1-33, no scrolling needed). Line 22 sx={{ bgcolor: '#fff' }} — VS Code renders a small white color-swatch icon inline before "#fff" (not literal text). Line 17's className string is truncated by the physical right edge of the laptop screen/bezel (photo cuts off there) — visible portion: "grid grid-cols-3 grid-flow-col justify-center max-w-[50%] m-auto! gap-4 mt-10 min-h-100" with more likely following (e.g. "vh" + more classes + closing quote/bracket) not visible/photographed. Tab bar: "page-not-found.tsx 9+" (9 unsaved changes), only tab open. Breadcrumb: aqs-web-ui > src > pages > page-not-found.tsx > ... Explorer sidebar (src/pages) fully expanded and visible: dashboard.tsx, dynamic-form-page.tsx, grid-config-example.tsx, legacy-page.tsx [U], lob-action-menu-page.tsx, LobGridExample.tsx [U], login.tsx, page-not-found.tsx (selected, 9+), policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]; providers/ and services/ (collapsed) under src. src/hooks: use-form-commit.ts, use-page-form.ts, use-required-field-validation....ts, use-smart-navigation.ts. src/lib: grid-normalize.ts [U]. Problems: 21 errors, 0 warnings (down from 34 seen on login.tsx — this file has fewer), "No Solution". Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Clock 5:23 PM 7/10/2026. Branch hitanshu/experimental* (dirty).
---
1: import { useLocation } from 'react-router';
2: import Button from '@mui/material/Button';
3:
4: // ----------------------------------------
5:
6: export default function PageNotFound() {
7:   const location = useLocation();
8:
9:   return (
10:     <main className="bg-white h-[calc(100vh-122px)]! grid items-center pt-11">
11:       <div className="grid grid-cols-1 justify-center items-center">
12:         <p className="text-[#0A2C6E] text-center w-full text-2xl! font-semibold! mb-10!">
13:           Page Not Found
14:         </p>
15:         <p className="text-[#0A2C6E] text-center w-full text-sm! font-medium!">
16:           We couldn't find a page at <code>{location.pathname}</code>.
17:         </p>
18:         <div className="grid grid-cols-3 grid-flow-col justify-center max-w-[50%] m-auto! gap-4 mt-10 min-h-100⟪?⟫
19:           <div>
20:             <Button
21:               variant="contained"
22:               className="p-4! flex flex-col shadow-none!"
23:               sx={{ bgcolor: '#fff' }}
24:               onClick={() => (window.location.href = '/')}
25:             >
26:               <p className="text-[#0A2C6E] capitalize pt-2!">Back to Home</p>
27:             </Button>
28:           </div>
29:         </div>
30:       </div>
31:     </main>
32:   );
33: }


========== IMG_2968.md ==========
---
photo: IMG_2968.JPG
type: vscode-code
file: aqs-web-ui/src/pages/page-not-found.tsx
lines: 6,18-34
orientation: 180
confidence: high
notes: Near-duplicate of IMG_2967.JPG — same file (page-not-found.tsx, whole-file view, same timestamp 5:23 PM 7/10/2026), photographed from a slightly different angle/crop (laptop keyboard visible at top of photo) showing the lower portion of the same content plus a sticky-scroll header for line 6. Content verified identical to IMG_2967.md for the overlapping lines; see that transcript for lines 1-17 and full notes (Tailwind classes, color swatch on line 22 bgcolor, etc). Line 18's className string is again truncated at "mt-10" near the right edge of this crop (same ambiguous tail as IMG_2967.md's line 18 note about a possible further "min-h-100..." — not resolved here either). File ends at line 34 (blank line after the closing "}" on line 33). Explorer sidebar (src/pages) same as IMG_2967.md: dashboard.tsx, dynamic-form-page.tsx, grid-config-example.tsx, legacy-page.tsx [U], lob-action-menu-page.tsx, LobGridExample.tsx [U], login.tsx, page-not-found.tsx (selected, 9+), policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx [U], root.tsx, UltimateCoverPage.tsx, xsl-test.tsx [U]. Problems: 21 errors, 0 warnings, "No Solution". Status bar: Ln 1, Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX. Branch hitanshu/experimental* (dirty).
---
6: export default function PageNotFound() {
[... lines 7-17 not repeated here, see IMG_2967.md ...]
18:         <div className="grid grid-cols-3 grid-flow-col justify-center max-w-[50%] m-auto! gap-4 mt-10⟪?⟫
19:           <div>
20:             <Button
21:               variant="contained"
22:               className="p-4! flex flex-col shadow-none!"
23:               sx={{ bgcolor: '#fff' }}
24:               onClick={() => (window.location.href = '/')}
25:             >
26:               <p className="text-[#0A2C6E] capitalize pt-2!">Back to Home</p>
27:             </Button>
28:           </div>
29:         </div>
30:       </div>
31:     </main>
32:   );
33: }
34:
