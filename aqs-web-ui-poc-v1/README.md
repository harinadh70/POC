# AQS Portal — React Migration POC

Proof-of-concept for migrating the legacy **AQS (ASP / VBScript)** insurance
application to a modern **React** front end, per Solution Design Document v13.

**The thesis:** there are **156+ Lines of Business (LOBs)**. One reusable engine
renders every one of them. LOB 1 (Policy) is fully wired; onboarding LOB 2…156
is **configuration, not code**.

## Run it

```bash
npm install
npm run dev      # → http://localhost:5173
```

Sign in with any user id → Dashboard → click **POL / Policy** → Policy Information.
Change **Policy Status → Cancelled** to see the server-driven command loop reveal
the Cancellation Reason field and raise a warning.

```bash
npm run build      # typechecks + production build to dist/
npm run typecheck  # types only
```

## Stack (per SDD v13 §6, §7)

React 18 · TypeScript · Vite · React Router (loaders) · Zustand · MUI v7 · Tailwind v4.
Backend in the real system = .NET 4.8 wrapper APIs over the legacy DLLs; here a
**mock backend** (`src/mock/`) returns the same JSON shapes so the POC runs standalone.

## Architecture — two zones that never blur

```
src/
├── engine/            ← LOB-AGNOSTIC. Written once, frozen. Never edited to add an LOB.
│   ├── api/           API contract (swap mock → real .NET APIs here)
│   ├── renderers/     FieldRenderer · FormRenderer · DataGridRenderer · ButtonsRenderer
│   ├── commands/      execute-action (VBS frame switch) · dispatch (command-handlers)
│   └── modal/         NotificationHost (DISPLAY_* commands)
├── lobs/              ← PURE CONFIG. One entry per LOB.
│   ├── registry.ts    THE registry — 156 entries. LOB 1 active, rest config-ready.
│   ├── policy/        LOB 1 (Policy) — the only implemented LOB
│   └── _template/     copy-me guide for LOB 2…156
├── stores/            Zustand: auth · app · browser-command · page (SDD §3)
├── pages/             Login · Dashboard · LobPage (the ONE generic page host)
├── shell/             AppLayout · ErrorBoundary
├── mock/              stand-in for the .NET wrapper APIs
└── types/             the shared contract (Controls / Commands / PageBuild)
```

### How a page loads (SDD §5.3)

`route loader` → **Navigation API** (what to load) → **PageBuild API** (controls +
actions + commands, XML→JSON) → normalize → `FormRenderer`/`FieldRenderer`/`DataGrid`
→ apply initial `BrowserCommands`. A user action → **Page Layout API** →
`executeAction` routes the returned commands through `dispatch`.

### Render strategies (SDD §10.2.2)

`dynamic` (PageBuild only) · `static` / `hybrid` (versioned JSON schema merged with
PageBuild via `mergeControlsWithPageBuild`). Policy Information is `hybrid`.

### Legacy `.htc` → MUI (SDD §7.2)

FieldRenderer maps every legacy control: Combo→Autocomplete, Dropdown→Select,
Calendar→DatePicker, Radiobutton→Radio, Tabstrip→Tabs, XmlList→DataGrid, …

## Adding LOB 2 … 156

See `src/lobs/_template/README.md`. In short: add a config folder + one line in
`registry.ts`. No engine changes.

## Wiring the real backend

Implement `AqsApi` (`src/engine/api/client.ts`) against the .NET 4.8 endpoints and
export it as `api`. Nothing else changes — the engine only knows the interface.

---
*Reconstructed from the team's working branch + SDD v13. This is a POC: the mock
backend and LOB-1 sample data stand in for the real APIs.*
