# BUNDLE for src/utils/parse-combo-items.ts
# 5 photo fragment(s), ascending start-line order.


========== IMG_3906.md ==========
---
photo: IMG_3906.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-combo-items.ts
lines: 1-27
orientation: 180
confidence: high
notes: >
  Clean read, no ghosting/blur artifact. Tab bar: only parse-combo-items.ts
  open. Explorer sidebar (utils folder) visible, parse-combo-items.ts selected:
  form.ts, frame-router.ts, http-instance.ts, legacy-xml-detail.ts,
  local-storage.ts, logger-builder.ts, menu-persistence.ts,
  normalize-service-config copy.ts, normalize-service-config.ts,
  parse-combo-items.ts (selected), parse-info-xml.ts, parse-permissions.ts,
  parse-querystring-params.ts, performance-benchmarks.ts,
  performance-monitor.ts, permission-store.ts, pub-sub.ts,
  required-field-validation.ts. Status bar: No Solution, branch
  hitanshu/experimental*, 2 errors/0 warnings.
---
1   import type { OptionItem } from '@/types';
2
3   /**
4    * Parse LOAD_COMBO pipe-delimited array into normalized select options.
5    *
6    * Format: ["", "Label1|Value1", "Label2|Value2"]
7    * where entries are split on the pipe (|) character.
8    */
9   export function parseComboItems(input: unknown): OptionItem[] {
10      if (!input) {
11          return [];
12      }
13
14      let items: string[] = [];
15
16      if (Array.isArray(input)) {
17          items = input.filter((item): item is string => typeof item === 'string');
18      } else if (typeof input === 'string') {
19          items = [input];
20      } else {
21          return [];
22      }
23
24      const parsed: OptionItem[] = [];
25
26      for (const item of items) {
27          const trimmed = item.trim();


========== IMG_3907.md ==========
---
photo: IMG_3907.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-combo-items.ts
lines: 9-35
orientation: 180
confidence: high
notes: >
  Photo has a faint camera-motion-blur ghosting artifact (each line shows a
  dim duplicate of an earlier line ~2-3 rows below it), but the sharp/bright
  foreground text is fully legible and cross-validated against the clean read
  in IMG_3906.md (lines 9-27 overlap exactly) and IMG_3908.md (lines 20-35
  overlap). Sticky-scroll header pinned at top: line 9 "export function
  parseComboItems(input: unknown): OptionItem[] {". Same explorer sidebar/tab
  state as IMG_3906. Status bar: No Solution, branch hitanshu/experimental*,
  2 errors/0 warnings.
---
[Sticky scroll header, pinned at top of editor]
9   export function parseComboItems(input: unknown): OptionItem[] {

[Main visible content]
10      if (!input) {
11          return [];
12      }
13
14      let items: string[] = [];
15
16      if (Array.isArray(input)) {
17          items = input.filter((item): item is string => typeof item === 'string');
18      } else if (typeof input === 'string') {
19          items = [input];
20      } else {
21          return [];
22      }
23
24      const parsed: OptionItem[] = [];
25
26      for (const item of items) {
27          const trimmed = item.trim();
28          if (trimmed === '') {
29              continue;
30          }
31
32          const pipeIndex = trimmed.indexOf('|');
33          if (pipeIndex === -1) {
34              parsed.push({
35                  label: trimmed,


========== IMG_3908.md ==========
---
photo: IMG_3908.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-combo-items.ts
lines: 20-46
orientation: 180
confidence: high
notes: >
  Same camera-motion-blur ghosting artifact as IMG_3907 (dim duplicate of an
  earlier line superimposed ~2-3 rows below); sharp foreground text used as
  ground truth and cross-validated against IMG_3907.md (lines 20-35 overlap
  exactly) and IMG_3909.md (lines 28-52, clean read, confirms line 46
  verbatim). Sticky-scroll header pinned at top: line 9 "export function
  parseComboItems(input: unknown): OptionItem[] {". Line 46 was cut at the
  bottom edge of this particular frame but is confirmed complete via
  IMG_3909. Same explorer sidebar/tab state as IMG_3906/3907. Status bar: No
  Solution, branch hitanshu/experimental*, 2 errors/0 warnings.
---
[Sticky scroll header, pinned at top of editor]
9   export function parseComboItems(input: unknown): OptionItem[] {

[Main visible content]
20      } else {
21          return [];
22      }
23
24      const parsed: OptionItem[] = [];
25
26      for (const item of items) {
27          const trimmed = item.trim();
28          if (trimmed === '') {
29              continue;
30          }
31
32          const pipeIndex = trimmed.indexOf('|');
33          if (pipeIndex === -1) {
34              parsed.push({
35                  label: trimmed,
36                  value: trimmed,
37              });
38              continue;
39          }
40
41          const label = trimmed.substring(0, pipeIndex).trim();
42          const value = trimmed.substring(pipeIndex + 1).trim();
43
44          parsed.push({
45              label: label || value,
46              value: value || label,


========== IMG_3909.md ==========
---
photo: IMG_3909.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-combo-items.ts
lines: 28-52
orientation: 180
confidence: high
notes: >
  Clean read, no ghosting artifact. Completes the parseComboItems function
  (matches/confirms IMG_3907.md and IMG_3908.md content). Sticky-scroll
  header pinned at top: line 9 "export function parseComboItems(input:
  unknown): OptionItem[] {". Same explorer sidebar/tab state as
  IMG_3906-3908. Status bar: No Solution, branch hitanshu/experimental*,
  2 errors/0 warnings.
---
[Sticky scroll header, pinned at top of editor]
9   export function parseComboItems(input: unknown): OptionItem[] {

[Main visible content]
28          if (trimmed === '') {
29              continue;
30          }
31
32          const pipeIndex = trimmed.indexOf('|');
33          if (pipeIndex === -1) {
34              parsed.push({
35                  label: trimmed,
36                  value: trimmed,
37              });
38              continue;
39          }
40
41          const label = trimmed.substring(0, pipeIndex).trim();
42          const value = trimmed.substring(pipeIndex + 1).trim();
43
44          parsed.push({
45              label: label || value,
46              value: value || label,
47          });
48      }
49
50      return parsed;
51  }
52


========== IMG_3910.md ==========
---
photo: IMG_3910.JPG
type: vscode-code
file: aqs-web-ui/src/utils/parse-combo-items.ts
lines: 39-52
orientation: 180
confidence: high
notes: >
  Camera-motion-blur ghosting artifact present (dim duplicate of an earlier
  line superimposed a few rows below, plus a second fainter repeat near the
  bottom of the frame); sharp foreground text used as ground truth and
  fully cross-validated against the clean read in IMG_3909.md (identical
  content, lines 39-52 subset). Sticky-scroll header pinned at top: line 9
  "export function parseComboItems(input: unknown): OptionItem[] {". Same
  explorer sidebar/tab state as IMG_3906-3909. Status bar: No Solution,
  branch hitanshu/experimental*, 2 errors/0 warnings.
---
[Sticky scroll header, pinned at top of editor]
9   export function parseComboItems(input: unknown): OptionItem[] {

[Main visible content]
39          }
40
41          const label = trimmed.substring(0, pipeIndex).trim();
42          const value = trimmed.substring(pipeIndex + 1).trim();
43
44          parsed.push({
45              label: label || value,
46              value: value || label,
47          });
48      }
49
50      return parsed;
51  }
52
