# BUNDLE for src/features/prp/utils/loader.ts
# 1 photo fragment(s), ascending start-line order.


========== IMG_2704.md ==========
---
photo: IMG_2704.JPG
type: vscode-code
file: aqs-web-ui/src/features/prp/utils/loader.ts
lines: 1-24
orientation: 180
confidence: high
notes: Clean, sharp photo, no ghosting/blur. Full file content visible (24 lines total, editor shows entire file). Same tool-call-leak artifact pattern as IMG_2703's prp.ts: line 23 is "}</content>" and line 24 is "<parameter name=\"filePath\">C:\Users\skudale\Documents\aqs-web-ui\src\features\prp\utils\loader.ts" — confirms this is a systemic issue (an AI coding assistant's raw tool-call XML/pseudo-XML got saved verbatim as the tail of the file) affecting multiple files in this repo, not a one-off. Explorer sidebar shows aqs-web-ui > src > features > policy > utils > ultimateCoverLoader.ts > FieldRenderer.tsx > index.ts > policy-information-fields.ts > types.ts > ultimate-cover-fields.ts > prp > components (MlcSumList.tsx, "U") > services (prp.ts, "U") > utils > loader.ts (selected, "9+, U") > root > hooks > lib > pages > providers > services > types > utils. Breadcrumb: aqs-web-ui > src > features > prp > utils > loader.ts > ... Status bar: branch "hitanshu/experimental*", "30 errors, 0 warnings" (warnings count differs from prior photos which showed 2), "No Solution". Bottom right: Ln 1, Col 1, Spaces: 2, UTF-8, CRLF, TypeScript. Timestamp overlay 5:17 PM 7/10/2026.
---
1: import { data } from 'react-router';
2: import { fetchMlcSumList } from '../services/prp';
3:
4: // Types
5: export interface PrpLoaderData {
6:   mlcSumRows: Awaited<ReturnType<typeof fetchMlcSumList>>;
7: }
8:
9: /**
10:  * Loader for PRP MLC Sum page
11:  * Fetches the MLC summary list data
12:  */
13: export async function prpMlcSumLoader(): Promise<PrpLoaderData> {
14:   try {
15:     const mlcSumRows = await fetchMlcSumList();
16:
17:     return data({ mlcSumRows }, { status: 200 });
18:   } catch (error) {
19:     console.error('[PRP Loader] Failed to load MLC sum data:', error);
20:     // Return empty array on error to prevent page crash
21:     return data({ mlcSumRows: [] }, { status: 200 });
22:   }
23: }</content>
24: <parameter name="filePath">C:\Users\skudale\Documents\aqs-web-ui\src\features\prp\utils\loader.ts
