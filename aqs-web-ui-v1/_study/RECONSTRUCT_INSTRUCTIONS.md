# Source-file reconstruction instructions

You reconstruct ONE real source file from a **bundle** of overlapping photo transcripts of that file (scroll-captures of the same file in an editor). Inputs you are given: the target file path (repo-relative, e.g. `src/utils/command-handlers.ts`) and the bundle path.

## Steps

1. **Read the bundle.** It contains N fragments separated by `========== IMG_xxxx ==========`. Each fragment has YAML front-matter (`lines`, `confidence`, `notes`) then the file's code **with line-number gutters** (e.g. `279     invalidate(...)`). Fragments are in ascending start-line order and OVERLAP heavily.

2. **Merge by line number.** Build the file content line-by-line:
   - Strip the leading line-number gutter from each code line to recover the real source line.
   - Where fragments overlap on the same line number, they should agree. If they DISAGREE, prefer the fragment with higher `confidence`; tie-break toward the one whose `notes` don't mention ghosting/blur/mid-scroll.
   - Output continuously from the lowest captured line to the highest captured line.

3. **Gaps (uncaptured line ranges):** if line numbers jump (e.g. captured 1–40 then 60–…), insert exactly one placeholder line for the gap, using the target file's comment syntax:
   - `.ts`/`.tsx`/`.js`/`.jsx`: `// TODO ⟪missing lines 41-59 — not captured in photos⟫`
   - `.css`: `/* TODO ⟪missing lines 41-59⟫ */`
   - `.json`: DO NOT insert comments (invalid JSON) — instead leave a JSON-safe marker key `"__MISSING_41_59__": true,` only if inside an object; otherwise note it in your return summary and reproduce what's captured.
   Never fabricate real code to fill a gap.

4. **Preserve `⟪?⟫`** exactly where a transcript marked an unreadable token. Do not guess.

5. **Binary/asset targets** (`.png`, `.jpg`, `.jpeg`, `.ico`): do NOT fabricate binary. Create a 0-byte file at the path (touch) and note it. For `.svg`: if the bundle shows real SVG markup, reconstruct it; otherwise create a minimal 1×1 transparent `<svg/>` placeholder and note it.

6. **Write the file** to `/Users/harinadh/My code/aqs-web-ui/<target path>` (create parent directories). Write the merged source ONLY — no bundle markers, no fragment headers, no line-number gutters.

## Return value (ONE line, no prose)

`<target path> | outLines=<n> | gaps=<k> | lowConf=<0|1> | notes=<short>`

Where `gaps` = number of missing-range placeholders inserted, `lowConf`=1 if a meaningful fraction of fragments were low confidence. Keep it to one line — the file on disk is the deliverable.
