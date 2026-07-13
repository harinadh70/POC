# fiddler2bruno — Fiddler Classic captures → Bruno collections + replay verification

Two tools that run on stock **Windows PowerShell 5.1** — no installs, no admin
rights, no internet access needed on the client machine:

- **Convert-FiddlerToBruno.ps1** — converts a capture into a folder Bruno opens
  natively: every request becomes a `.bru` file (method, URL, query params,
  headers, body), the host is extracted into `{{baseUrl}}`, requests grouped
  into folders by URL path.
- **Invoke-FiddlerReplay.ps1** — for each captured API writes three files
  (original / curl / result), re-hits the endpoint live, and reports exactly
  what changed vs the captured response. Built for the .NET → React migration:
  proves the backend still answers the way the legacy front end saw it.

Both read either `.saz` (Fiddler's native *File > Save > All Sessions*) or
`.har` (*File > Export Sessions > HTTPArchive v1.2*). `FiddlerCommon.ps1`
holds shared parsing — keep the three .ps1 files together.

## Setup on the client machine (one time)

1. Copy this folder to `C:\Tools\fiddler2bruno`.
2. (For one-command automation) Install the FiddlerScript hooks from
   `FiddlerCustomRules-snippet.js` — instructions are at the top of that file.

## Daily use — fully automated

Capture traffic in Fiddler, then type in the **QuickExec** box (`Alt+Q`):

```
bruno                     # -> Bruno collection at C:\FiddlerExports\BrunoCollection
bruno myapi.tmnas.com     # same, only that host
replay                    # -> replay GETs + diff report at C:\FiddlerExports\ReplayReport
replay myapi.tmnas.com    # same, only that host
```

For Bruno: **Open Collection** → the folder → pick the **capture** environment.
For replay: open `REPORT.md` in the report folder.

## Replay report layout

```
ReplayReport\
├── REPORT.md                       ← summary table, one row per API
└── 001 GET navigation\
    ├── 1-original.md               ← request + response exactly as captured
    ├── 2-curl.sh                   ← the request converted to a curl command
    └── 3-result.md                 ← verdict from hitting it again NOW
```

Verdicts in `3-result.md` / `REPORT.md`:

- **MATCH** — live response identical to the capture.
- **DIFFERENT** — lists the exact changes, e.g.
  `` `$.Title`: captured "Advantage Suite" -> now "Advantage Suite v2" ``,
  missing keys, new keys, array-length changes, HTTP status changes.
- **ERROR** — endpoint unreachable / request failed.
- **SKIPPED** — method not replayed (see safety note).
- **NO-BASELINE** — capture had no stored response to compare against.

Exit code is 1 if anything is DIFFERENT or ERROR (usable in CI/scheduled checks).

**Safety:** only `GET/HEAD/OPTIONS` are replayed by default — POST/PUT/DELETE
can create or change data. Opt in explicitly with `-Methods GET,POST`.

## Manual runs

```powershell
powershell -ExecutionPolicy Bypass -File C:\Tools\fiddler2bruno\Convert-FiddlerToBruno.ps1 `
    -InputFile C:\FiddlerExports\capture.saz -OutDir C:\FiddlerExports\BrunoCollection -NoStatic -Dedupe -Force

powershell -ExecutionPolicy Bypass -File C:\Tools\fiddler2bruno\Invoke-FiddlerReplay.ps1 `
    -InputFile C:\FiddlerExports\capture.saz -OutDir C:\FiddlerExports\ReplayReport -NoStatic -Dedupe -Force
```

## Options

Shared by both scripts:

| Parameter        | Effect                                                                 |
|------------------|------------------------------------------------------------------------|
| `-InputFile`     | `.saz` or `.har` from Fiddler (required)                               |
| `-OutDir`        | Output folder (default: `<input>-bruno` / `<input>-replay`)            |
| `-FilterHost x`  | Keep only hosts containing `x` (repeatable: `-FilterHost a,b`)         |
| `-NoStatic`      | Drop js/css/images/fonts/media requests                                |
| `-Dedupe`        | Keep only the first occurrence of each METHOD+URL                      |
| `-Force`         | Regenerate an existing output folder (only deletes folders this tool created) |

Converter only: `-KeepCookies` (keep Cookie headers in .bru files),
`-NoBaseUrl` (don't extract `{{baseUrl}}`), and the team-layout options:

| Parameter          | Effect                                                          |
|--------------------|------------------------------------------------------------------|
| `-ThreeSets`       | Team layout: each captured API becomes a folder with `original.bru` / `converted.bru` / `validation.bru` |
| `-NewApiPath p`    | NewWebApi endpoint path for converted/validation (default `/AQS.Advantage.NewWebApi/api/v1/ui/page/data`) |
| `-MappingFile f`   | JSON mapping for positional legacy values (default `NewApiMapping.json` next to the script) |

## Team layout (`-ThreeSets`)

Matches the convention in the team's collection (everything is POST there —
the legacy app funnels all calls through `XmlServercall.aspx`, the new app
through `NewWebApi/api/v1/ui/page/data`):

- **`original.bru`** — the captured legacy request, untouched.
- **`converted.bru`** — auto-translated to the NewWebApi JSON contract:
  the HTML-entity-encoded `<items>` XML in the legacy body becomes
  `XmlDetail.Items` (name/value array); positional `<value>` elements are
  mapped to JSON fields via `NewApiMapping.json` (copy
  `NewApiMapping.sample.json`, fill `valueFields` once from a known-good
  original/converted pair). Unmapped values are listed in the request's
  docs tab so nothing is silently dropped.
- **`validation.bru`** — the converted request plus an `assert` (HTTP 200)
  and a `tests` scaffold for response-parity checks.

Non-legacy requests (no `<value>` body) get `converted.bru` as a copy with a
TODO note in its docs tab.

The QuickExec `bruno` command uses `-ThreeSets` by default; the `replay`
command uses `-Methods GET,POST` because this app POSTs even for reads —
**remove POST there before replaying captures containing real transactions
(e.g. `ADD`)** so nothing is re-fired into the backend.

Replay only:

| Parameter               | Effect                                                          |
|-------------------------|------------------------------------------------------------------|
| `-Methods GET,POST`     | Which methods to replay (default `GET,HEAD,OPTIONS`)            |
| `-OverrideHeader @{...}`| Replace headers on replay, e.g. `@{ Authorization = 'Bearer fresh' }` |
| `-IgnoreKeys a,b`       | JSON keys ignored in comparison at any depth (timestamps, request ids) |
| `-MaxDiffs n`           | Stop listing differences per request after `n` (default 50)    |
| `-TimeoutSec n`         | Per-request timeout (default 30)                                |
| `-SkipCertCheck`        | Accept self-signed/internal HTTPS certificates                  |

## Behavior notes

- CONNECT tunnels are always skipped. In .bru files, transport headers
  (`Content-Length`, `Host`, `Accept-Encoding`, …) and cookies are dropped;
  `Authorization` is kept.
- Replay sends the captured headers **including Cookie/Authorization** — they
  may be expired; pass fresh values via `-OverrideHeader`. Redirects are not
  followed (the capture is per-hop, so comparison is per-hop).
- Fields that legitimately change every call (timestamps, ids) will flag as
  DIFFERENT — silence them with `-IgnoreKeys`.
- Captured response bodies are de-chunked and un-gzipped from raw wire bytes;
  brotli can't be decoded on .NET Framework (comparison is skipped with a note).
- `2-curl.sh` commands use bash quoting — run them in Git Bash / WSL / macOS.
- Bruno output validated against Bruno's own parser (`@usebruno/lang` v0.37);
  replay verdict logic tested end-to-end against a live test server.
- Tested on PowerShell 7.4; written to be 5.1-compatible. For very large HAR
  files on 5.1 the JSON fallback path is untested — prefer the SAZ route.
