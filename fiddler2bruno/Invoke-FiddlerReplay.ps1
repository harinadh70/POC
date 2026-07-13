<#
.SYNOPSIS
  Replay a Fiddler Classic capture against the live backend and diff the
  responses against what was originally captured.

.DESCRIPTION
  For every request in a .saz / .har capture this writes a folder with three
  files:
    1-original.md   the request and response exactly as captured
    2-curl.sh       the request converted to a curl command
    3-result.md     verdict from replaying the request NOW: MATCH if the live
                    response equals the captured one, otherwise a list of the
                    exact JSON paths that differ (changed values, missing keys,
                    new keys, status changes)
  plus a top-level REPORT.md summary table.

  SAFETY: only GET/HEAD/OPTIONS are replayed by default. POST/PUT/DELETE/PATCH
  can create or change data on the backend - opt in with:  -Methods GET,POST

  Requires FiddlerCommon.ps1 in the same folder. PowerShell 5.1 compatible.

.EXAMPLE
  .\Invoke-FiddlerReplay.ps1 -InputFile C:\FiddlerExports\capture.saz -OutDir C:\FiddlerExports\ReplayReport -NoStatic -Dedupe -Force

.EXAMPLE
  # fresh auth token, ignore fields that always change
  .\Invoke-FiddlerReplay.ps1 capture.saz -OverrideHeader @{ Authorization = 'Bearer <new token>' } -IgnoreKeys timestamp,requestId -Force
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$InputFile,

    # Report folder. Default: "<input name>-replay" next to the input.
    [string]$OutDir,

    [string[]]$FilterHost = @(),
    [switch]$NoStatic,
    [switch]$Dedupe,

    # Methods allowed to be replayed. Anything else is reported as SKIPPED.
    [string[]]$Methods = @('GET', 'HEAD', 'OPTIONS'),

    # Headers to add/replace on replay, e.g. @{ Authorization = 'Bearer fresh' }.
    [hashtable]$OverrideHeader = @{},

    # JSON key names ignored during comparison (matched at any depth),
    # e.g. -IgnoreKeys timestamp,requestId,serverTime
    [string[]]$IgnoreKeys = @(),

    # Stop listing differences per request after this many.
    [int]$MaxDiffs = 50,

    [int]$TimeoutSec = 30,

    # Accept untrusted/self-signed HTTPS certificates (internal environments).
    [switch]$SkipCertCheck,

    # Overwrite an existing report folder (only deletes one containing REPORT.md).
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'FiddlerCommon.ps1')

$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
# Hop-by-hop headers that must not be replayed verbatim.
$NoReplayHeaders = @(
    'host','content-length','connection','proxy-connection','keep-alive',
    'accept-encoding','transfer-encoding','expect','upgrade-insecure-requests'
)

[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor 3072  # TLS 1.2
if ($SkipCertCheck) {
    [System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
}

# ------------------------------------------------------------- replay

function Invoke-CapturedRequest {
    param($Session, [int]$TimeoutSec, [hashtable]$OverrideHeader)

    # Merge override headers over the captured ones (replace by name).
    $headers = New-Object System.Collections.ArrayList
    foreach ($h in $Session.Headers) {
        if ($OverrideHeader.Keys -notcontains $h[0]) { [void]$headers.Add($h) }
    }
    foreach ($k in $OverrideHeader.Keys) { [void]$headers.Add(@([string]$k, [string]$OverrideHeader[$k])) }

    try {
        $req = [System.Net.WebRequest]::Create($Session.Url)
        $req.Method = $Session.Method
        $req.Timeout = $TimeoutSec * 1000
        $req.ReadWriteTimeout = $TimeoutSec * 1000
        $req.AllowAutoRedirect = $false     # the capture is per-hop; compare per-hop
        $req.AutomaticDecompression = [System.Net.DecompressionMethods]::GZip -bor [System.Net.DecompressionMethods]::Deflate

        $contentType = $null
        foreach ($h in $headers) {
            $n = $h[0].ToLowerInvariant()
            if ($NoReplayHeaders -contains $n) { continue }
            # .NET restricted headers must be set via properties.
            switch ($n) {
                'content-type'      { $contentType = $h[1] }
                'accept'            { $req.Accept = $h[1] }
                'user-agent'        { $req.UserAgent = $h[1] }
                'referer'           { $req.Referer = $h[1] }
                'if-modified-since' { }
                'range'             { }
                'date'              { }
                default             { try { $req.Headers.Set($h[0], $h[1]) } catch { } }
            }
        }

        $hasBody = $Session.Body -and ($Session.Method -notin @('GET', 'HEAD', 'OPTIONS', 'TRACE'))
        if ($hasBody) {
            if ($contentType) { $req.ContentType = $contentType }
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($Session.Body)
            $req.ContentLength = $bytes.Length
            $rs = $req.GetRequestStream()
            try { $rs.Write($bytes, 0, $bytes.Length) } finally { $rs.Dispose() }
        }

        $resp = $null
        try { $resp = $req.GetResponse() }
        catch [System.Net.WebException] {
            if ($_.Exception.Response) { $resp = $_.Exception.Response }  # 4xx/5xx still have a body
            else { return @{ Error = $_.Exception.Message } }
        }
        try {
            $status = ('{0} {1}' -f [int]$resp.StatusCode, $resp.StatusDescription).Trim()
            $reader = New-Object System.IO.StreamReader($resp.GetResponseStream(), [System.Text.Encoding]::UTF8)
            $body = $reader.ReadToEnd()
            return @{ Status = $status; ContentType = [string]$resp.ContentType; Body = $body }
        }
        finally { $resp.Close() }
    }
    catch { return @{ Error = $_.Exception.Message } }
}

# ------------------------------------------------------------- diffing

function Format-Val {
    param($V)
    if ($null -eq $V) { return 'null' }
    if ($V -is [datetime]) { return '"' + $V.ToString('yyyy-MM-ddTHH:mm:ss') + '"' }
    if ($V -is [string]) {
        $s = $V
        if ($s.Length -gt 80) { $s = $s.Substring(0, 77) + '...' }
        return '"' + $s + '"'
    }
    if ($V -is [bool]) { return $V.ToString().ToLowerInvariant() }
    if ($V -is [array]) { return "[array of $($V.Count)]" }
    if ($V -is [System.Management.Automation.PSCustomObject] -or $V -is [System.Collections.IDictionary]) { return '{object}' }
    return [string]$V
}

function Add-Diff {
    param($Diffs, [string]$Msg, [int]$Max)
    if ($Diffs.Count -lt $Max) { [void]$Diffs.Add($Msg) }
    elseif ($Diffs.Count -eq $Max) { [void]$Diffs.Add('... more differences truncated ...') }
}

function Test-IsJsonObject {
    param($V)
    return ($V -is [System.Management.Automation.PSCustomObject] -or $V -is [System.Collections.IDictionary])
}

function Get-JsonKeys {
    param($V)
    if ($V -is [System.Collections.IDictionary]) { return @($V.Keys) }
    return @($V.PSObject.Properties.Name)
}

function Get-JsonValue {
    param($V, [string]$Key)
    if ($V -is [System.Collections.IDictionary]) { return $V[$Key] }
    return $V.$Key
}

# Recursive structural JSON comparison; appends human-readable diffs.
function Compare-JsonNode {
    param($Exp, $Act, [string]$Path, $Diffs, [string[]]$IgnoreKeys, [int]$Max)
    if ($Diffs.Count -gt $Max) { return }

    if ($null -eq $Exp -and $null -eq $Act) { return }
    if (($null -eq $Exp) -ne ($null -eq $Act)) {
        Add-Diff $Diffs "``$Path``: captured $(Format-Val $Exp) -> now $(Format-Val $Act)" $Max
        return
    }

    $expIsObj = Test-IsJsonObject $Exp
    $actIsObj = Test-IsJsonObject $Act
    $expIsArr = $Exp -is [array]
    $actIsArr = $Act -is [array]

    if ($expIsObj -and $actIsObj) {
        $expKeys = Get-JsonKeys $Exp
        $actKeys = Get-JsonKeys $Act
        foreach ($k in $expKeys) {
            if ($IgnoreKeys -contains $k) { continue }
            if ($actKeys -notcontains $k) {
                Add-Diff $Diffs "``$Path.$k`` MISSING in new response (captured $(Format-Val (Get-JsonValue $Exp $k)))" $Max
            }
            else {
                Compare-JsonNode (Get-JsonValue $Exp $k) (Get-JsonValue $Act $k) "$Path.$k" $Diffs $IgnoreKeys $Max
            }
        }
        foreach ($k in $actKeys) {
            if ($IgnoreKeys -contains $k) { continue }
            if ($expKeys -notcontains $k) {
                Add-Diff $Diffs "``$Path.$k`` is NEW in replay (value $(Format-Val (Get-JsonValue $Act $k)))" $Max
            }
        }
        return
    }
    if ($expIsArr -and $actIsArr) {
        if ($Exp.Count -ne $Act.Count) {
            Add-Diff $Diffs "``$Path`` array length: captured $($Exp.Count) -> now $($Act.Count)" $Max
        }
        $n = [Math]::Min($Exp.Count, $Act.Count)
        for ($i = 0; $i -lt $n; $i++) {
            Compare-JsonNode $Exp[$i] $Act[$i] "$Path[$i]" $Diffs $IgnoreKeys $Max
        }
        return
    }
    if ($expIsObj -ne $actIsObj -or $expIsArr -ne $actIsArr) {
        Add-Diff $Diffs "``$Path`` type changed: captured $(Format-Val $Exp) -> now $(Format-Val $Act)" $Max
        return
    }
    if (([string]$Exp) -cne ([string]$Act)) {
        Add-Diff $Diffs "``$Path``: captured $(Format-Val $Exp) -> now $(Format-Val $Act)" $Max
    }
}

# Compare captured vs replayed response -> verdict + diff list.
function Compare-Responses {
    param($Captured, $Replayed, [string[]]$IgnoreKeys, [int]$Max)
    $diffs = New-Object System.Collections.ArrayList

    $capCode = ($Captured.Status -split ' ')[0]
    $newCode = ($Replayed.Status -split ' ')[0]
    if ($capCode -ne $newCode) {
        Add-Diff $diffs "HTTP status: captured **$($Captured.Status)** -> now **$($Replayed.Status)**" $Max
    }

    $capCt = ([string]$Captured.ContentType -split ';')[0].Trim()
    $newCt = ([string]$Replayed.ContentType -split ';')[0].Trim()
    if ($capCt -and $newCt -and $capCt -ne $newCt) {
        Add-Diff $diffs "Content-Type: captured ``$capCt`` -> now ``$newCt``" $Max
    }

    if ($Captured.Note) {
        [void]$diffs.Add("(body comparison skipped: captured $($Captured.Note))")
        return ,$diffs
    }

    $capBody = [string]$Captured.Body
    $newBody = [string]$Replayed.Body
    if (-not $capBody -and -not $newBody) { return ,$diffs }

    $bothJson = $false
    if ($capCt -match 'json' -or $newCt -match 'json' -or ($capBody.TrimStart() -match '^[\[{]')) {
        try {
            $capObj = $capBody | ConvertFrom-Json
            $newObj = $newBody | ConvertFrom-Json
            $bothJson = $true
            Compare-JsonNode $capObj $newObj '$' $diffs $IgnoreKeys $Max
        }
        catch { $bothJson = $false }
    }
    if (-not $bothJson) {
        $a = $capBody -replace "`r`n", "`n"
        $b = $newBody -replace "`r`n", "`n"
        if ($a -cne $b) {
            $min = [Math]::Min($a.Length, $b.Length)
            $idx = 0
            while ($idx -lt $min -and $a[$idx] -eq $b[$idx]) { $idx++ }
            $ctxA = $a.Substring([Math]::Max(0, $idx - 30), [Math]::Min(60, $a.Length - [Math]::Max(0, $idx - 30)))
            $ctxB = $b.Substring([Math]::Max(0, $idx - 30), [Math]::Min(60, $b.Length - [Math]::Max(0, $idx - 30)))
            Add-Diff $diffs "Body differs at char $idx (captured $($a.Length) chars, now $($b.Length) chars)" $Max
            Add-Diff $diffs "captured: ``...$ctxA...``" $Max
            Add-Diff $diffs "now:      ``...$ctxB...``" $Max
        }
    }
    return ,$diffs
}

# ------------------------------------------------------------- report files

function ConvertTo-Curl {
    param($Session)
    $esc = { param($s) ([string]$s) -replace "'", "'\''" }
    $lines = New-Object System.Collections.ArrayList
    [void]$lines.Add("curl -k -i -X $($Session.Method) '$(& $esc $Session.Url)'")
    foreach ($h in $Session.Headers) {
        $n = $h[0].ToLowerInvariant()
        if ($NoReplayHeaders -contains $n) { continue }
        [void]$lines.Add("  -H '$(& $esc ($h[0] + ': ' + $h[1]))'")
    }
    if ($Session.Body -and ($Session.Method -notin @('GET', 'HEAD'))) {
        [void]$lines.Add("  --data-raw '$(& $esc $Session.Body)'")
    }
    return ($lines -join " \`n") + "`n"
}

function Format-BodyForReport {
    param([string]$Body, [string]$ContentType)
    if (-not $Body) { return '(empty body)' }
    $b = $Body
    $truncated = $false
    if ($b.Length -gt 262144) { $b = $b.Substring(0, 262144); $truncated = $true }
    if ($ContentType -match 'json' -and -not $truncated -and $b -notmatch "`n") { $b = Format-Json $b }
    $lang = ''
    if ($ContentType -match 'json') { $lang = 'json' } elseif ($ContentType -match 'xml|html') { $lang = 'xml' }
    $out = '````' + $lang + "`n" + $b + "`n" + '````'
    if ($truncated) { $out += "`n_(truncated at 256 KB)_" }
    return $out
}

function New-OriginalMd {
    param($Session, [string]$Title)
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.AppendLine("# $Title")
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine('## Request (as captured)')
    [void]$sb.AppendLine('```http')
    [void]$sb.AppendLine("$($Session.Method) $($Session.Url) HTTP/1.1")
    foreach ($h in $Session.Headers) { [void]$sb.AppendLine("$($h[0]): $($h[1])") }
    if ($Session.Body) {
        [void]$sb.AppendLine('')
        [void]$sb.AppendLine($Session.Body)
    }
    [void]$sb.AppendLine('```')
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine('## Response (as captured)')
    if ($Session.Response) {
        $r = $Session.Response
        [void]$sb.AppendLine('')
        [void]$sb.AppendLine("**Status:** $($r.Status)")
        if ($r.Headers -and $r.Headers.Count -gt 0) {
            [void]$sb.AppendLine('')
            [void]$sb.AppendLine('```http')
            foreach ($h in $r.Headers) { [void]$sb.AppendLine("$($h[0]): $($h[1])") }
            [void]$sb.AppendLine('```')
        }
        if ($r.Note) { [void]$sb.AppendLine(''); [void]$sb.AppendLine("_$($r.Note)_") }
        if ($r.Body) {
            [void]$sb.AppendLine('')
            [void]$sb.AppendLine((Format-BodyForReport -Body $r.Body -ContentType $r.ContentType))
        }
    }
    else {
        [void]$sb.AppendLine('')
        [void]$sb.AppendLine('_(no response stored in capture)_')
    }
    return $sb.ToString()
}

function New-ResultMd {
    param([string]$Title, [string]$Verdict, $Session, $Replayed, $Diffs)
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.AppendLine("# $Title")
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine("## Verdict: $Verdict")
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine("Replayed: ``$($Session.Method) $($Session.Url)``")
    if ($Replayed -and -not $Replayed.Error) {
        [void]$sb.AppendLine("Live status: **$($Replayed.Status)**  (captured: **$($Session.Response.Status)**)")
    }
    if ($Replayed -and $Replayed.Error) {
        [void]$sb.AppendLine('')
        [void]$sb.AppendLine("**Request failed:** $($Replayed.Error)")
    }
    if ($Diffs -and $Diffs.Count -gt 0) {
        [void]$sb.AppendLine('')
        [void]$sb.AppendLine("## What is different ($($Diffs.Count))")
        [void]$sb.AppendLine('')
        foreach ($d in $Diffs) { [void]$sb.AppendLine("- $d") }
        if ($Replayed -and $Replayed.Body) {
            [void]$sb.AppendLine('')
            [void]$sb.AppendLine('## Live response body')
            [void]$sb.AppendLine('')
            [void]$sb.AppendLine((Format-BodyForReport -Body $Replayed.Body -ContentType $Replayed.ContentType))
        }
    }
    return $sb.ToString()
}

# ------------------------------------------------------------- main

$InputFile = (Resolve-Path $InputFile).Path
if (-not $OutDir) {
    $OutDir = Join-Path (Split-Path $InputFile) `
        ([System.IO.Path]::GetFileNameWithoutExtension($InputFile) + '-replay')
}

$sessions = Import-FiddlerCapture -Path $InputFile
$kept = Select-CapturedSessions -Sessions $sessions -FilterHost $FilterHost -NoStatic:$NoStatic -Dedupe:$Dedupe
if ($kept.Count -eq 0) {
    throw "No requests kept ($($sessions.Count) sessions read). Check -FilterHost / -NoStatic settings."
}

if (Test-Path $OutDir) {
    $marker = Join-Path $OutDir 'REPORT.md'
    if ($Force -and (Test-Path $marker)) { Remove-Item -Recurse -Force $OutDir }
    elseif ((Get-ChildItem $OutDir -Force | Measure-Object).Count -gt 0) {
        throw "Output folder '$OutDir' already exists and is not empty. Use -Force to regenerate (only deletes folders containing REPORT.md)."
    }
}
[void][System.IO.Directory]::CreateDirectory($OutDir)

$summary = New-Object System.Collections.ArrayList
$counts = @{ MATCH = 0; DIFFERENT = 0; SKIPPED = 0; ERROR = 0; 'NO-BASELINE' = 0 }
$i = 0
foreach ($s in $kept) {
    $i++
    $uri = [uri]$s.Url
    $segs = @($uri.AbsolutePath.Trim('/').Split('/') | Where-Object { $_ })
    $leaf = 'root'
    if ($segs.Count -gt 0) { $leaf = $segs[$segs.Count - 1] }
    $title = '{0:d3} {1} {2}' -f $i, $s.Method, $leaf
    $folder = Join-Path $OutDir (Get-SafeName $title 60)
    $bump = 2
    while (Test-Path $folder) { $folder = Join-Path $OutDir (Get-SafeName "$title ($bump)" 60); $bump++ }
    [void][System.IO.Directory]::CreateDirectory($folder)

    # 1. original
    [System.IO.File]::WriteAllText((Join-Path $folder '1-original.md'), (New-OriginalMd -Session $s -Title $title), $Utf8NoBom)
    # 2. curl
    [System.IO.File]::WriteAllText((Join-Path $folder '2-curl.sh'), (ConvertTo-Curl -Session $s), $Utf8NoBom)

    # 3. replay + compare
    $verdict = ''
    $detail = ''
    $diffs = $null
    $replayed = $null
    if ($Methods -notcontains $s.Method) {
        $verdict = 'SKIPPED'
        $detail = "method $($s.Method) not replayed (pass -Methods GET,$($s.Method) to enable)"
    }
    elseif (-not $s.Response) {
        $verdict = 'NO-BASELINE'
        $detail = 'capture has no stored response to compare against'
    }
    else {
        $replayed = Invoke-CapturedRequest -Session $s -TimeoutSec $TimeoutSec -OverrideHeader $OverrideHeader
        if ($replayed.Error) {
            $verdict = 'ERROR'
            $detail = $replayed.Error
        }
        else {
            $diffs = Compare-Responses -Captured $s.Response -Replayed $replayed -IgnoreKeys $IgnoreKeys -Max $MaxDiffs
            if ($diffs.Count -eq 0) { $verdict = 'MATCH'; $detail = "response identical ($($replayed.Status))" }
            else { $verdict = 'DIFFERENT'; $detail = "$($diffs.Count) difference(s)" }
        }
    }
    $counts[$verdict] = $counts[$verdict] + 1

    [System.IO.File]::WriteAllText((Join-Path $folder '3-result.md'),
        (New-ResultMd -Title $title -Verdict $verdict -Session $s -Replayed $replayed -Diffs $diffs), $Utf8NoBom)

    $color = switch ($verdict) {
        'MATCH'     { 'Green' }
        'DIFFERENT' { 'Red' }
        'ERROR'     { 'Red' }
        default     { 'Yellow' }
    }
    Write-Host ("[{0,-11}] {1} {2}  {3}" -f $verdict, $s.Method, $uri.PathAndQuery, $detail) -ForegroundColor $color
    [void]$summary.Add(@{ Title = $title; Method = $s.Method; Path = $uri.PathAndQuery; Verdict = $verdict; Detail = $detail; Folder = Split-Path $folder -Leaf })
}

# ---- REPORT.md
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('# Fiddler Replay Report')
[void]$sb.AppendLine('')
[void]$sb.AppendLine("Input: ``$InputFile``  |  Requests: $($kept.Count)")
[void]$sb.AppendLine('')
[void]$sb.AppendLine("**MATCH: $($counts.MATCH)**  |  **DIFFERENT: $($counts.DIFFERENT)**  |  ERROR: $($counts.ERROR)  |  SKIPPED: $($counts.SKIPPED)  |  NO-BASELINE: $($counts['NO-BASELINE'])")
[void]$sb.AppendLine('')
[void]$sb.AppendLine('| # | Verdict | Method | Path | Detail |')
[void]$sb.AppendLine('|---|---------|--------|------|--------|')
foreach ($row in $summary) {
    $mark = switch ($row.Verdict) {
        'MATCH'     { 'MATCH' }
        'DIFFERENT' { '**DIFFERENT**' }
        'ERROR'     { '**ERROR**' }
        default     { $row.Verdict }
    }
    [void]$sb.AppendLine("| [$($row.Title.Substring(0,3))](./$([uri]::EscapeDataString($row.Folder))/3-result.md) | $mark | $($row.Method) | ``$($row.Path)`` | $($row.Detail) |")
}
[System.IO.File]::WriteAllText((Join-Path $OutDir 'REPORT.md'), $sb.ToString(), $Utf8NoBom)

Write-Host ''
Write-Host ("Done: {0} MATCH, {1} DIFFERENT, {2} ERROR, {3} SKIPPED, {4} NO-BASELINE" -f `
    $counts.MATCH, $counts.DIFFERENT, $counts.ERROR, $counts.SKIPPED, $counts['NO-BASELINE']) -ForegroundColor Cyan
Write-Host "Report: $(Join-Path $OutDir 'REPORT.md')" -ForegroundColor Cyan

if ($counts.DIFFERENT -gt 0 -or $counts.ERROR -gt 0) { exit 1 } else { exit 0 }
