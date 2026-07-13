<#
.SYNOPSIS
  Convert a Fiddler Classic capture (.saz or .har) into a Bruno collection.

.DESCRIPTION
  Reads either Fiddler's native SAZ archive (File > Save > All Sessions)
  or a HAR export (File > Export Sessions > HTTPArchive v1.2) and writes a
  Bruno collection folder: bruno.json, an environment with {{baseUrl}}, and
  one .bru file per captured request (grouped into folders by URL path).

  Requires FiddlerCommon.ps1 in the same folder.
  Works on Windows PowerShell 5.1 (default on Windows 10/11) and PowerShell 7+.
  No modules, no internet access, no admin rights required.

.EXAMPLE
  .\Convert-FiddlerToBruno.ps1 -InputFile C:\FiddlerExports\capture.saz -OutDir C:\FiddlerExports\BrunoCollection -NoStatic -Dedupe -Force
#>
[CmdletBinding()]
param(
    # Path to the .saz or .har file exported from Fiddler.
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$InputFile,

    # Output collection folder. Default: "<input name>-bruno" next to the input.
    [string]$OutDir,

    # Only keep requests whose host contains one of these strings (e.g. "tmnas.com").
    [string[]]$FilterHost = @(),

    # Skip static assets (js/css/images/fonts/media).
    [switch]$NoStatic,

    # Keep only the first occurrence of each METHOD + URL.
    [switch]$Dedupe,

    # Keep Cookie headers (dropped by default - they are session noise).
    [switch]$KeepCookies,

    # Do not extract the host into a {{baseUrl}} environment variable.
    [switch]$NoBaseUrl,

    # Team layout: one folder per captured request containing original.bru /
    # converted.bru / validation.bru. For legacy XmlServercall-style bodies
    # (positional <value> elements), converted.bru is auto-translated to the
    # NewWebApi JSON contract (XmlDetail.Items etc.).
    [switch]$ThreeSets,

    # Path of the new Web API endpoint used in converted/validation requests.
    [string]$NewApiPath = '/AQS.Advantage.NewWebApi/api/v1/ui/page/data',

    # JSON mapping file for the positional legacy values, e.g.
    # { "newApiPath": "/...", "valueFields": ["CompLoc","UserId","Poaid","",""] }
    # valueFields[i] = JSON property for legacy value #i+1 ("" = unmapped).
    # Default: NewApiMapping.json next to this script, if present.
    [string]$MappingFile = '',

    # Overwrite an existing output collection (only deletes a folder that
    # contains bruno.json, i.e. one this script previously generated).
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'FiddlerCommon.ps1')

$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
# Transport/browser-noise headers that are not part of the API contract.
$DropHeaders = @(
    'host','content-length','connection','proxy-connection','keep-alive',
    'accept-encoding','transfer-encoding','upgrade-insecure-requests',
    'sec-ch-ua','sec-ch-ua-mobile','sec-ch-ua-platform','sec-fetch-site',
    'sec-fetch-mode','sec-fetch-dest','sec-fetch-user','pragma','cache-control'
)
$BruMethods = @('get','post','put','delete','patch','head','options')

# Classify the request body from its Content-Type.
function Get-BodyKind {
    param($Headers, [string]$Body)
    if ([string]::IsNullOrEmpty($Body)) { return 'none' }
    $ctype = [string](Get-HeaderValue $Headers 'Content-Type')
    if ($ctype -match 'json')                  { return 'json' }
    if ($ctype -match 'x-www-form-urlencoded') { return 'form-urlencoded' }
    if ($ctype -match 'xml')                   { return 'xml' }
    return 'text'
}

function New-BruBlock {
    param([string]$Tag, $Pairs)   # $Pairs = list of @(key, value)
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.AppendLine("$Tag {")
    foreach ($p in $Pairs) {
        $v = ([string]$p[1] -replace '\s+', ' ').Trim()   # .bru is line-oriented
        [void]$sb.AppendLine("  $($p[0]): $v")
    }
    [void]$sb.Append('}')
    return $sb.ToString()
}

function New-BruFile {
    param($Session, [int]$Seq, [string]$Name, [string]$BaseUrl)

    $uri = [uri]$Session.Url
    $displayUrl = $Session.Url
    if ($BaseUrl) { $displayUrl = '{{baseUrl}}' + $uri.PathAndQuery }

    $kind = Get-BodyKind $Session.Headers $Session.Body
    $bodyLabel = switch ($kind) {
        'json'            { 'json' }
        'xml'             { 'xml' }
        'form-urlencoded' { 'formUrlEncoded' }
        'text'            { 'text' }
        default           { 'none' }
    }
    $method = $Session.Method.ToLowerInvariant()
    if ($BruMethods -notcontains $method) { $method = 'post' }

    $chunks = New-Object System.Collections.ArrayList
    [void]$chunks.Add((New-BruBlock 'meta' @(@('name', $Name), @('type', 'http'), @('seq', $Seq))))
    [void]$chunks.Add((New-BruBlock $method @(@('url', $displayUrl), @('body', $bodyLabel), @('auth', 'none'))))

    # Query params (kept URL-encoded, exactly as captured).
    $query = $uri.Query.TrimStart('?')
    if ($query) {
        $qPairs = New-Object System.Collections.ArrayList
        foreach ($pair in $query.Split('&')) {
            if (-not $pair) { continue }
            $eq = $pair.IndexOf('=')
            if ($eq -ge 0) { [void]$qPairs.Add(@($pair.Substring(0, $eq), $pair.Substring($eq + 1))) }
            else           { [void]$qPairs.Add(@($pair, '')) }
        }
        if ($qPairs.Count -gt 0) { [void]$chunks.Add((New-BruBlock 'params:query' $qPairs)) }
    }

    $headers = New-Object System.Collections.ArrayList
    foreach ($h in $Session.Headers) {
        if ($DropHeaders -contains $h[0].ToLowerInvariant()) { continue }
        [void]$headers.Add($h)
    }
    if ($headers.Count -gt 0) { [void]$chunks.Add((New-BruBlock 'headers' $headers)) }

    if ($kind -eq 'form-urlencoded') {
        $fPairs = New-Object System.Collections.ArrayList
        foreach ($pair in $Session.Body.Split('&')) {
            if (-not $pair) { continue }
            $eq = $pair.IndexOf('=')
            if ($eq -ge 0) { [void]$fPairs.Add(@($pair.Substring(0, $eq), $pair.Substring($eq + 1))) }
            else           { [void]$fPairs.Add(@($pair, '')) }
        }
        [void]$chunks.Add((New-BruBlock 'body:form-urlencoded' $fPairs))
    }
    elseif ($kind -ne 'none') {
        # Body kept verbatim, indented two spaces inside the block.
        $bodyLines = $Session.Body -split "`r?`n" | ForEach-Object { '  ' + $_ }
        [void]$chunks.Add("body:$kind {`n" + ($bodyLines -join "`n") + "`n}")
    }

    return ($chunks -join "`n`n") + "`n"
}

# ---------------------------------------------------- legacy -> NewWebApi

function ConvertTo-JsonStringLiteral {
    param([string]$S)
    $S = $S -replace '\\', '\\' -replace '"', '\"'
    $S = $S -replace "`r", '\r' -replace "`n", '\n' -replace "`t", '\t'
    return '"' + $S + '"'
}

# Extract the positional <value> elements from a legacy XmlServercall body
# (each element's content is HTML-entity decoded).
function Get-LegacyValues {
    param([string]$Body)
    $vals = New-Object System.Collections.ArrayList
    foreach ($m in [regex]::Matches($Body, '<value>(.*?)</value>', 'Singleline,IgnoreCase')) {
        [void]$vals.Add([System.Net.WebUtility]::HtmlDecode($m.Groups[1].Value))
    }
    return ,$vals
}

# Build the NewWebApi JSON body from the legacy values.
# The value containing <items> becomes XmlDetail.Items; the rest are mapped by
# position via $ValueFields (from the mapping file) or listed as unmapped.
function ConvertTo-NewApiBody {
    param($Values, [string[]]$ValueFields)

    $skeleton = @('Title','Transaction','Url','DocId','DocName','XmlFile','TabFile',
                  'XmlList','XmlPage','XSLWorksheet','Height','Width','Frame','CallType')
    $items = New-Object System.Collections.ArrayList
    $positional = New-Object System.Collections.ArrayList
    foreach ($v in $Values) {
        if ($v -match '<items[\s>]') {
            foreach ($im in [regex]::Matches($v, "<item\s+name\s*=\s*['""]([^'""]*)['""]\s+value\s*=\s*['""]([^'""]*)['""]")) {
                [void]$items.Add(@($im.Groups[1].Value, $im.Groups[2].Value))
            }
        }
        else { [void]$positional.Add($v) }
    }

    $mapped = @{}
    $unmapped = New-Object System.Collections.ArrayList
    for ($i = 0; $i -lt $positional.Count; $i++) {
        $field = ''
        if ($ValueFields -and $i -lt $ValueFields.Count) { $field = [string]$ValueFields[$i] }
        if ($field) { $mapped[$field] = $positional[$i] }
        else {
            $show = [string]$positional[$i]
            if ($show.Length -gt 120) { $show = $show.Substring(0, 117) + '...' }
            [void]$unmapped.Add(('value {0}: {1}' -f ($i + 1), $show))
        }
    }

    $sb = New-Object System.Text.StringBuilder
    [void]$sb.AppendLine('{')
    foreach ($f in $skeleton) {
        $val = '""'
        if ($f -eq 'DocId') { $val = '0' }
        elseif ($f -eq 'Height' -or $f -eq 'Width') { $val = 'null' }
        if ($mapped.ContainsKey($f)) { $val = ConvertTo-JsonStringLiteral $mapped[$f]; $mapped.Remove($f) }
        [void]$sb.AppendLine('  "' + $f + '": ' + $val + ',')
    }
    foreach ($f in @($mapped.Keys)) {   # mapped fields outside the skeleton
        [void]$sb.AppendLine('  "' + $f + '": ' + (ConvertTo-JsonStringLiteral $mapped[$f]) + ',')
    }
    [void]$sb.AppendLine('  "XmlDetail": {')
    [void]$sb.AppendLine('    "Items": [')
    for ($i = 0; $i -lt $items.Count; $i++) {
        $sep = ','
        if ($i -eq $items.Count - 1) { $sep = '' }
        [void]$sb.AppendLine('      { "name": ' + (ConvertTo-JsonStringLiteral $items[$i][0]) +
            ', "value": ' + (ConvertTo-JsonStringLiteral $items[$i][1]) + ' }' + $sep)
    }
    [void]$sb.AppendLine('    ]')
    [void]$sb.AppendLine('  }')
    [void]$sb.Append('}')

    return @{ Json = $sb.ToString(); Unmapped = $unmapped; ItemCount = $items.Count }
}

function New-SimpleDocs {
    param([string[]]$Lines)
    $ind = New-Object System.Collections.ArrayList
    foreach ($l in $Lines) { [void]$ind.Add(('  ' + $l).TrimEnd()) }
    return "docs {`n" + ($ind -join "`n") + "`n}"
}

$ValidationTests = @"
assert {
  res.status: eq 200
}

tests {
  test("HTTP 200", function() {
    expect(res.getStatus()).to.equal(200);
  });
  // TODO(team): compare response fields against the captured legacy response
  // stored in this folder's 'original' request (or run Invoke-FiddlerReplay).
}
"@

# ------------------------------------------------------------- main

$InputFile = (Resolve-Path $InputFile).Path
if (-not $OutDir) {
    $OutDir = Join-Path (Split-Path $InputFile) `
        ([System.IO.Path]::GetFileNameWithoutExtension($InputFile) + '-bruno')
}

$sessions = Import-FiddlerCapture -Path $InputFile
$total = $sessions.Count

$kept = Select-CapturedSessions -Sessions $sessions -FilterHost $FilterHost -NoStatic:$NoStatic -Dedupe:$Dedupe
if (-not $KeepCookies) {
    foreach ($s in $kept) {
        $filtered = New-Object System.Collections.ArrayList
        foreach ($h in $s.Headers) { if ($h[0] -ine 'Cookie') { [void]$filtered.Add($h) } }
        $s.Headers = $filtered
    }
}

if ($kept.Count -eq 0) {
    throw "No requests kept ($total sessions read). Check -FilterHost / -NoStatic settings."
}

# ---- host stats / baseUrl
$hostCounts = @{}
foreach ($s in $kept) {
    $u = [uri]$s.Url
    $k = $u.Scheme + '://' + $u.Authority
    if ($hostCounts.ContainsKey($k)) { $hostCounts[$k]++ } else { $hostCounts[$k] = 1 }
}
$singleHost = ($hostCounts.Count -eq 1) -and (-not $NoBaseUrl)
$baseUrl = $null
if ($singleHost) { $baseUrl = @($hostCounts.Keys)[0] }

# ---- output folder
if (Test-Path $OutDir) {
    $marker = Join-Path $OutDir 'bruno.json'
    if ($Force -and (Test-Path $marker)) {
        Remove-Item -Recurse -Force $OutDir
    }
    elseif ((Get-ChildItem $OutDir -Force | Measure-Object).Count -gt 0) {
        throw "Output folder '$OutDir' already exists and is not empty. Use -Force to regenerate (only deletes folders containing bruno.json)."
    }
}
[void][System.IO.Directory]::CreateDirectory($OutDir)

$brunoJson = @"
{
  "version": "1",
  "name": "$(Split-Path $OutDir -Leaf)",
  "type": "collection",
  "ignore": ["node_modules", ".git"]
}
"@
[System.IO.File]::WriteAllText((Join-Path $OutDir 'bruno.json'), $brunoJson, $Utf8NoBom)

if ($baseUrl) {
    $envDir = Join-Path $OutDir 'environments'
    [void][System.IO.Directory]::CreateDirectory($envDir)
    $envBru = (New-BruBlock 'vars' @(, @('baseUrl', $baseUrl))) + "`n"
    [System.IO.File]::WriteAllText((Join-Path $envDir 'capture.bru'), $envBru, $Utf8NoBom)
}

# ---- mapping file (ThreeSets)
$valueFields = @()
if ($ThreeSets) {
    if (-not $MappingFile) { $MappingFile = Join-Path $PSScriptRoot 'NewApiMapping.json' }
    if (Test-Path $MappingFile) {
        $map = Get-Content -Raw $MappingFile | ConvertFrom-Json
        if ($map.newApiPath)  { $NewApiPath = [string]$map.newApiPath }
        if ($map.valueFields) { $valueFields = @($map.valueFields | ForEach-Object { [string]$_ }) }
        Write-Host "Using mapping file: $MappingFile ($($valueFields.Count) positional fields)"
    }
    else {
        Write-Host "No mapping file found ($MappingFile) - positional legacy values will be listed as unmapped in each converted.bru docs tab." -ForegroundColor Yellow
    }
}

# ---- write requests
$usedPaths = @{}
$bruBase = $null
if ($baseUrl) { $bruBase = $baseUrl }
$i = 0
foreach ($s in $kept) {
    $i++
    $uri = [uri]$s.Url
    $segs = @($uri.AbsolutePath.Trim('/').Split('/') | Where-Object { $_ })

    $folder = $OutDir
    if (-not $singleHost) { $folder = Join-Path $folder (Get-SafeName $uri.Authority) }
    $leaf = 'root'
    if ($segs.Count -gt 0) { $leaf = $segs[$segs.Count - 1] }

    if ($ThreeSets) {
        # ---- team layout: <NNN leaf>\original.bru + converted.bru + validation.bru
        $folder = Join-Path $folder (Get-SafeName ('{0:d3} {1}' -f $i, $leaf) 60)
        [void][System.IO.Directory]::CreateDirectory($folder)

        # 1. original — the captured legacy request, untouched
        [System.IO.File]::WriteAllText((Join-Path $folder 'original.bru'),
            (New-BruFile -Session $s -Seq 1 -Name 'original' -BaseUrl $bruBase), $Utf8NoBom)

        # 2. converted — legacy XML <value> body translated to NewWebApi JSON
        $isLegacy = $s.Body -match '<value>'
        if ($isLegacy) {
            $legacyVals = Get-LegacyValues -Body $s.Body
            $newBody = ConvertTo-NewApiBody -Values $legacyVals -ValueFields $valueFields

            $newUrl = $uri.Scheme + '://' + $uri.Authority + $NewApiPath
            $convHeaders = New-Object System.Collections.ArrayList
            [void]$convHeaders.Add(@('Content-Type', 'application/json'))
            $auth = Get-HeaderValue $s.Headers 'Authorization'
            if ($auth) { [void]$convHeaders.Add(@('Authorization', $auth)) }
            $convSession = @{ Method = 'POST'; Url = $newUrl; Headers = $convHeaders; Body = $newBody.Json }

            $convBru = New-BruFile -Session $convSession -Seq 2 -Name 'converted' -BaseUrl $bruBase
            $docLines = New-Object System.Collections.ArrayList
            [void]$docLines.Add("Auto-translated from the legacy call ($($newBody.ItemCount) XmlDetail.Items).")
            if ($newBody.Unmapped.Count -gt 0) {
                [void]$docLines.Add('')
                [void]$docLines.Add('UNMAPPED positional legacy values - map them via NewApiMapping.json:')
                foreach ($u in $newBody.Unmapped) { [void]$docLines.Add('- ' + $u) }
            }
            $convBru = $convBru + "`n" + (New-SimpleDocs -Lines $docLines) + "`n"
            [System.IO.File]::WriteAllText((Join-Path $folder 'converted.bru'), $convBru, $Utf8NoBom)

            $valSession = @{ Method = 'POST'; Url = $newUrl; Headers = $convHeaders; Body = $newBody.Json }
        }
        else {
            # Not a legacy <value> body: converted is a copy pending manual work.
            $convBru = New-BruFile -Session $s -Seq 2 -Name 'converted' -BaseUrl $bruBase
            $convBru = $convBru + "`n" + (New-SimpleDocs -Lines @(
                'TODO(team): no legacy <value> body detected in this capture;',
                'point this request at the NewWebApi equivalent manually.')) + "`n"
            [System.IO.File]::WriteAllText((Join-Path $folder 'converted.bru'), $convBru, $Utf8NoBom)
            $valSession = $s
        }

        # 3. validation — the converted request + assertions
        $valBru = New-BruFile -Session $valSession -Seq 3 -Name 'validation' -BaseUrl $bruBase
        $valBru = $valBru + "`n" + $ValidationTests
        [System.IO.File]::WriteAllText((Join-Path $folder 'validation.bru'), $valBru, $Utf8NoBom)
        continue
    }

    if ($segs.Count -gt 1) {
        # Group by the first one or two path segments (e.g. "api_v1").
        $take = 1
        if ($segs.Count -gt 2) { $take = 2 }
        $folder = Join-Path $folder (Get-SafeName (($segs[0..($take - 1)]) -join '_'))
    }
    [void][System.IO.Directory]::CreateDirectory($folder)

    $name = "$($s.Method) $leaf"

    $fname = (Get-SafeName ('{0:d3} {1}' -f $i, $name)) + '.bru'
    $full = Join-Path $folder $fname
    $bump = 2
    while ($usedPaths.ContainsKey($full)) {
        $fname = (Get-SafeName ('{0:d3} {1} ({2})' -f $i, $name, $bump)) + '.bru'
        $full = Join-Path $folder $fname
        $bump++
    }
    $usedPaths[$full] = $true

    [System.IO.File]::WriteAllText($full, (New-BruFile -Session $s -Seq $i -Name $name -BaseUrl $bruBase), $Utf8NoBom)
}

# ---- summary
Write-Host "Read $total sessions -> kept $($kept.Count) requests" -ForegroundColor Green
foreach ($k in ($hostCounts.Keys | Sort-Object { -$hostCounts[$_] })) {
    Write-Host ("  {0,4}  {1}" -f $hostCounts[$k], $k)
}
Write-Host "Bruno collection written to: $OutDir" -ForegroundColor Green
Write-Host "Open Bruno -> Open Collection -> select that folder (environment: 'capture')."
