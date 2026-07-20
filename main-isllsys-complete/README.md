# Main_ISLLSYS Complete — Analysis & Changes

Everything for the full Main_ISLLSYS_20010101.vbs (~9,090 lines, 85 routines)
migration in one place.

## Files here

| # | File | What it is |
|---|------|-----------|
| 1 | `1_ANALYSIS_all_85_routines.txt` | Complete gap analysis — every routine scored against the actual POC: **25 DONE, 10 PARTIAL, 31 GAP, 19 N/A** |
| 2 | `2_CHANGES_implementation_plan.txt` | The changes to make — all 41 GAP/PARTIAL routines mapped to ~15 features with new-file designs, merge points, build order, and delivery rules for the client branch |

## Headline numbers

- Legacy source: 9,087 lines of VBScript, one file, 85 routines
- Already covered by the actual POC framework: 25 routines (29%)
- Eliminated entirely by the SPA architecture: 19 routines (22%)
- Remaining work: ~900–1,150 lines of React across ~15–20 small files
  - Priority 1 (core edit loop): ~250–300 lines
  - Priority 2 (features): ~350–450 lines
  - Priority 3 (polish): ~300–400 lines

## Related material elsewhere in this repo

- `actual-poc-gap-analysis/` — the full numbered doc series (window_onload gaps,
  Eebrowser complete gaps, plus originals of the two docs above)
- `aqs-web-ui-v1/_study/main-isllsys-vbs/` — the reconstructed VBS source itself
  (`Main_ISLLSYS_20010101.reconstructed.vbs`) and the all-85-routines
  explanation (`Main_ISLLSYS_full_routine_reference.txt` / `.docx`)
- `aqs-web-ui-impl/` — the window_onload change set already implemented
  (also delivers 3 of this file's P3 items: breadcrumb, lazy tabs, umbrella stub)
