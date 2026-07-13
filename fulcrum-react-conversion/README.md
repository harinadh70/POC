# Converting a legacy ASP page to React (aqs-web-ui)

Playbook + code templates for converting one legacy ASP/XML page into the existing
React engine (modal-dialog + frame-system + data-grid). Modeled on the `selcov`
feature and the components confirmed in the UICode solution.

Every conversion is **configuration + one thin feature hook** — you should not be
writing new form/grid/button components. If a page seems to need one, first check
whether a `NormalizedField` type or grid config option already covers it.

---

## Step 0 — Gather the page facts (from the legacy ASP page)

Fill this in before touching React code:

| Fact | Where to find it | Example |
|---|---|---|
| Xml file name | Navigation response `SessionInfo.XmlFile`, or the ASP page source | `UWBuildingClass.xml` |
| NodeKey / LOB prefix | Navigation tree (`POL/BOP/CAU/IRM/WRM/LIA/RMP...`) | `BOP...` |
| Field matchcodes | ASP page controls / Fiddler capture of the legacy postback | `BLDCLS`, `EFFDT` |
| Button matchcodes | ASP buttons | `ADD`, `EDIT`, `DELETE`, `OK`, `CANCEL` |
| Grid list name(s) | The list/table section of the page XML | `UC_BUILDING_CLASSIFICATION` |
| onLoad calls | What the page loads on entry (schema-on-load capture in Fiddler/Bruno) | — |

Tip: capture one full legacy round-trip in Fiddler and convert it with
fiddler2bruno — the request body shows exactly which matchcodes/calls the page
sends, and the response shows the fields/list payload you must expect back.

## Step 1 — Grid config → `src/components/data-grid/data-grid-config-registry.ts`

Add one entry per list on the page (see `grid-config.snippet.ts`). Keys must match
the list name the server returns; columns' `field` values must match the
row-data field names after `data-grid-normalize`.

## Step 2 — Feature folder → `src/features/<page>/`

Copy `use-page-modal-flow.template.ts` and rename (`use-<page>-modal-flow.ts`).
It wires: schema-on-load → modal state → commits → button actions, entirely on
the existing hooks (`use-modal-state`, `use-modal-actions`, `use-modal-data`).

## Step 3 — Route / frame hosting

Give the page a React Router v7 route whose loader resolves navigation/session
(same pattern as `.docs/execute-action-migration-plan.md`), and render it via the
frame-system (`static-frame-renderer` for schema-on-load pages) or as a modal in
an existing flow (`use-auto-modal-queue` if it's part of a queued wizard).

## Step 4 — Session mapping

Never hand-build `SessionInfo` — reuse `resolveModalSessionInfo` semantics:
`{ compLoc, userId, policyId, nodeKey, action, diagnosticMode }` sourced from
`modalSession`, falling back to the route's session. CompLoc defaults to `PIHW`
server-side; don't hardcode it in React.

## Step 5 — Verify

- onLoad: page renders all fields in `fieldOrder`, buttons styled by matchcode
  (ADD/EDIT/DELETE → tableMedium, OK/SUBMIT/NEXT/HEADERBTN1 → primary, CANCEL → secondary).
- Each button: compare the `xmlServerCall` payload in devtools against the
  legacy Fiddler capture — matchcodes, callType, fieldOrder, utpOrder, sessionXml
  must carry the same values the ASP page sent.
- Grid: sorting/formatting from the registry entry; row ids stable (`rowIdField`).
- Error path: server error → `ERROR` action → content-error-boundary, no crash.

## Gotchas (from the existing code)

- `buttonMatchcode === 'OK'` has special handling for named-insured add/edit
  modals (`isNamedInsuredAddOrEditModal`) — check for page-specific special cases
  like this before assuming generic behavior.
- `previousValue` is tracked per normalized matchcode key in `use-modal-actions`;
  combos/selects need the previous label captured for future commits.
- `appendSessionXmlItemIfMissing` — session XML items must not be duplicated when
  a page re-submits.
- RLV actions are matched by `RLV_ACTIONS.some(a => upperAction.includes(a))` —
  uppercase/trim your action strings.
- XMLLIST buttons: `listName`/`buttonAction`/`buttonText` are currently undefined
  for them (marked TODO in use-modal-actions) — if your page has an XMLLIST
  control, that plumbing may need finishing first.
