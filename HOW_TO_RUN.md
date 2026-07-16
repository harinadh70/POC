# How to Run — Local Deployment Steps

Two ways to run, depending on what the machine has.

---

## Prerequisites (both paths)

1. **Node.js 20 LTS or newer** — download from https://nodejs.org (LTS installer). Verify:
   ```
   node --version
   npm --version
   ```
2. **Get this repo onto the machine** (it is PRIVATE — you must be signed in as harinadh70):
   - **GitHub Desktop:** File → Clone Repository → select `harinadh70/POC` → Clone, or
   - **Browser (no git needed):** github.com/harinadh70/POC → green **Code** button → **Download ZIP** → extract.
3. Corporate proxy note (client machines): if `npm install` times out, set the proxy first:
   ```
   npm config set proxy http://<proxy-host>:<port>
   npm config set https-proxy http://<proxy-host>:<port>
   ```

---

## Path A — Run the COMPLETE project (real aqs-web-ui repo + the window_onload changes)

Use this on the machine that has the real `aqs-web-ui` project (hitanshu/experimental branch).
The complete app only runs there because it needs the real TMNAS.Advantage.API backend.

1. Open the real `aqs-web-ui` repo and create a working branch:
   ```
   git checkout hitanshu/experimental
   git pull
   git checkout -b window-onload-gaps
   ```

2. From this POC repo, copy the **5 new files** from `aqs-web-ui-impl/src/` into the
   same paths under the real repo's `src/`:

   | Copy from `aqs-web-ui-impl/src/` | To real repo `src/` |
   |---|---|
   | `utils/page-init-rules.ts` | `utils/page-init-rules.ts` |
   | `hooks/use-page-init.ts` | `hooks/use-page-init.ts` |
   | `hooks/use-page-load-timing.ts` | `hooks/use-page-load-timing.ts` |
   | `components/breadcrumb.tsx` | `components/breadcrumb.tsx` |
   | `services/umbrella-status.ts` | `services/umbrella-status.ts` |

3. **MERGE (do not overwrite) the 4 modified files.** The real repo's versions are the
   source of truth — open each pair side by side and port only the blocks marked with
   `GAP` comments:
   - `features/frame/components/static-renderer.tsx` — add `usePageInit(...)` call + `<Breadcrumb />`
   - `features/frame/components/dynamic-renderer.tsx` — add `usePageInit(...)` call
   - `layouts/tab-layout.tsx` — add `initialTab` / `onTabClick` props + init effect
   - `components/header.tsx` — add the timing display

   See `aqs-web-ui-impl/README.md` for what each change does.

4. Install & verify (no new dependencies are added, so `npm install` only matters on a fresh clone):
   ```
   npm install
   npx tsc --noEmit
   ```
   Fix any type mismatches `tsc` reports — the impl was written against a photo-reconstructed
   copy of the codebase, so small type drift is possible (e.g. TreeNode field names
   `level` / `parentKey` in breadcrumb.tsx).

5. Make sure the backend API is reachable (same as the app normally uses on the client
   network — check the repo's `.env` / vite proxy config for the API base URL).

6. Run it:
   ```
   npm run dev
   ```
   Open the printed localhost URL in the browser.

7. Test using the checklist in `actual-poc-gap-analysis/` docs:
   - ADD-mode page → dataChanged flag true; EDIT/INQUIRY → false
   - EDIT page with ShowNextOnEdit "T" → Next disabled; "F" → Next hidden
   - Page with pathstart/pathend in schema → breadcrumb appears (also after hard reload, once tree loads)
   - Tab page with a session tab value → correct tab preselected, Cancel focused
   - Navigate between pages → ms timing appears next to Logout

---

## Path B — No real repo on the machine (demo from this POC repo only)

The only fully runnable app inside THIS repo is the scaffold POC (mock-data driven):

```
cd aqs-web-ui-poc-v1
npm install
npm run dev
```

Open http://localhost:5173.

**What will NOT run standalone — and why:**
- `aqs-web-ui-v1/` — reconstruction of the real app from photos; has unphotographed gaps, will not build.
- `aqs-web-ui-impl/` — drop-in change set only (no package.json); it executes as part of the real repo per Path A.

---

## Quick reference

| Folder | What it is | Runs standalone? |
|---|---|---|
| `aqs-web-ui-poc-v1/` | Best-practices scaffold POC (mock data) | YES — npm install && npm run dev |
| `aqs-web-ui-v1/` | Photo-reconstruction of real app + study docs | No (photo gaps) |
| `aqs-web-ui-impl/` | window_onload gap change set | No — integrate via Path A |
| `actual-poc-gap-analysis/` | Gap analysis docs (VBS → React) | Docs only |
| `fulcrum-react-conversion/`, `fiddler2bruno/` | Docs / tooling | — |
