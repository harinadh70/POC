# BUNDLE for src/components/sub-header.tsx
# 2 photo fragment(s), ascending start-line order.


========== IMG_2222.md ==========
---
photo: IMG_2222.JPG
type: vscode-code
file: aqs-web-ui/src/components/sub-header.tsx
lines: 1-34
orientation: 180
confidence: high
notes: New tab opened next to date.tsx (still 9+ unsaved) — sub-header.tsx now active/selected in Explorer (also 9+ unsaved). No sticky-scroll headers (whole file visible from line 1). Explorer sidebar (components folder) shows header.tsx, info-xml-content.tsx, loader.tsx, PolicyLobGrid.tsx (U), radio.tsx, select.tsx, sub-header.tsx (9+, selected), text.tsx, textarea.tsx, XmlList.tsx (U). Status bar: branch hitanshu/experimental*, 35 errors, 0 warnings, No Solution. Line 24's className template literal is cut off at the right edge of the photo (screen/frame edge, not word-wrap) after "text-[#9AA7" — remainder of that hex color value not visible in this photo. Line 27's target attribute reads literally as target=" blank" in the photo — the "_" of "_blank" may be visually merged with/hidden under the red squiggly underline at the baseline; transcribed as seen, most likely intended as target="_blank". Line 34 "</div>" is faint, partially occluded by the horizontal scrollbar at the bottom edge of the editor pane.
---
1:  import { useState } from 'react';
2:
3:  const SubHeader = () => {
4:      const [active, setActive] = useState('Override Summary');
5:
6:      const menuItems = [
7:          'Umb Rate',
8:          'Rate',
9:          'Worksheets',
10:         'Quick View',
11:         'LOB Action Menu',
12:         'Status Page',
13:         'Note Pad',
14:         'Policy Numbering',
15:         'Override Summary',
16:     ];
17:
18:     return (
19:         <div className="bg-[#E9F1FF] px-8! py-2 ">
20:             <ul className="flex space-x-6 text-sm text-white overflow-x-auto items-center h-12">
21:                 {menuItems.map((item) => (
22:                     <li
23:                         key={item}
24:                         onClick={() => setActive(item)}
25:                         className={`cursor-pointer whitespace-nowrap transition px-3 no-underline text-[#9AA7⟪?⟫
26:  ${active === item ? 'border-white font-bold text-[15px] text-[#00205B]' : 'border-transparent'}`}
27:                     >
28:                         <a className="no-underline text-[15px]" target=" blank">
29:                             {item}
30:                         </a>
31:                     </li>
32:                 ))}
33:             </ul>
34:         </div>


========== IMG_2223.md ==========
---
photo: IMG_2223.JPG
type: vscode-code
file: aqs-web-ui/src/components/sub-header.tsx
lines: 16-39
orientation: 180
confidence: high
notes: Same file as IMG_2222, scrolled down; entire file now fits (this is the full file, ends at line 39). Sticky scroll headers show line 3 "const SubHeader = () => {" and line 6 "const menuItems = [". No ghosting/blur in this photo, clean read. Tab bar/explorer unchanged (sub-header.tsx active, 9+ unsaved; date.tsx also open). Status bar: branch hitanshu/experimental*, 35 errors, 0 warnings, No Solution. Lines 16-34 match IMG_2222 exactly (cross-verified), including the same truncation of line 25's "text-[#9AA7" (now fully visible, not cut off, since horizontal scroll position differs slightly — still ends the same on screen at "text-[#9AA7" per this photo too, screen right edge cuts it) and line 28's target=" blank" ambiguity (same as IMG_2222).
---
3:      const SubHeader = () => {
6:          const menuItems = [
...
16:     ];
17:
18:     return (
19:         <div className="bg-[#E9F1FF] px-8! py-2 ">
20:             <ul className="flex space-x-6 text-sm text-white overflow-x-auto items-center h-12">
21:                 {menuItems.map((item) => (
22:                     <li
23:                         key={item}
24:                         onClick={() => setActive(item)}
25:                         className={`cursor-pointer whitespace-nowrap transition px-3 no-underline text-[#9AA7⟪?⟫
26:  ${active === item ? 'border-white font-bold text-[15px] text-[#00205B]' : 'border-transparent'}`}
27:                     >
28:                         <a className="no-underline text-[15px]" target=" blank">
29:                             {item}
30:                         </a>
31:                     </li>
32:                 ))}
33:             </ul>
34:         </div>
35:     );
36: };
37:
38: export { SubHeader };
39:
