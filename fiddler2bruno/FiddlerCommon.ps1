# FiddlerCommon.ps1 — shared parsing for Fiddler Classic captures (.saz / .har).
# Dot-sourced by Convert-FiddlerToBruno.ps1 and Invoke-FiddlerReplay.ps1.
# Windows PowerShell 5.1 compatible. Keep this file next to those scripts.

Add-Type -AssemblyName System.IO.Compression.FileSystem

$FiddlerStaticPattern = '\.(js|mjs|css|map|png|jpe?g|gif|svg|ico|woff2?|ttf|eot|otf|webp|avif|mp4|mp3)([?#]|$)'

function Get-SafeName {
    param([string]$Name, [int]$MaxLen = 50)
    $s = $Name -replace '[<>:"/\\|?*\x00-\x1f]', '_'
    $s = ($s -replace '\s+', ' ').Trim(' ._')
    if ($s.Length -eq 0) { $s = 'request' }
    if ($s.Length -gt $MaxLen) { $s = $s.Substring(0, $MaxLen).Trim(' ._') }
    return $s
}

function Get-HeaderValue {
    param($Headers, [string]$Name)
    foreach ($h in $Headers) {
        if ($h[0] -ieq $Name) { return $h[1] }
    }
    return $null
}

function Find-DoubleCrlf {
    param([byte[]]$B)
    for ($i = 0; $i -lt $B.Length - 3; $i++) {
        if ($B[$i] -eq 13 -and $B[$i + 1] -eq 10 -and $B[$i + 2] -eq 13 -and $B[$i + 3] -eq 10) { return $i }
    }
    return -1
}

# Reassemble a Transfer-Encoding: chunked body. Returns input on any parse error.
function Expand-ChunkedBody {
    param([byte[]]$B)
    try {
        $out = New-Object System.IO.MemoryStream
        $pos = 0
        while ($pos -lt $B.Length) {
            $lineEnd = $pos
            while ($lineEnd -lt $B.Length - 1 -and -not ($B[$lineEnd] -eq 13 -and $B[$lineEnd + 1] -eq 10)) { $lineEnd++ }
            $sizeHex = [System.Text.Encoding]::ASCII.GetString($B, $pos, $lineEnd - $pos).Split(';')[0].Trim()
            $size = [Convert]::ToInt32($sizeHex, 16)
            if ($size -eq 0) { break }
            $pos = $lineEnd + 2
            $out.Write($B, $pos, [Math]::Min($size, $B.Length - $pos))
            $pos += $size + 2   # skip the chunk's trailing CRLF
        }
        return $out.ToArray()
    }
    catch { return $B }
}

# Decompress a gzip/deflate body. Returns $null if the encoding is unsupported.
function Expand-CompressedBody {
    param([byte[]]$B, [string]$ContentEncoding)
    foreach ($skip in 0, 2) {   # deflate bodies sometimes carry a 2-byte zlib header
        try {
            $ms = New-Object System.IO.MemoryStream(, $B)
            [void]$ms.Seek($skip, 'Begin')
            if ($ContentEncoding -match 'gzip') {
                if ($skip -gt 0) { return $null }
                $z = New-Object System.IO.Compression.GZipStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
            }
            elseif ($ContentEncoding -match 'deflate') {
                $z = New-Object System.IO.Compression.DeflateStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
            }
            else { return $null }   # br / zstd not available on .NET Framework
            $out = New-Object System.IO.MemoryStream
            $z.CopyTo($out)
            $z.Dispose()
            return $out.ToArray()
        }
        catch { }
    }
    return $null
}

# Parse one raw HTTP/1.x request (a SAZ raw/NN_c.txt file).
function ConvertFrom-RawRequest {
    param([byte[]]$Bytes)
    $text = [System.Text.Encoding]::UTF8.GetString($Bytes)
    $sepIdx = $text.IndexOf("`r`n`r`n"); $sepLen = 4
    if ($sepIdx -lt 0) { $sepIdx = $text.IndexOf("`n`n"); $sepLen = 2 }
    if ($sepIdx -lt 0) { $head = $text; $body = '' }
    else {
        $head = $text.Substring(0, $sepIdx)
        $body = $text.Substring($sepIdx + $sepLen)
    }

    $lines = $head -split "`r?`n"
    if ($lines.Count -lt 1) { return $null }
    $reqLine = $lines[0].Split(' ')
    if ($reqLine.Count -lt 2) { return $null }
    $method = $reqLine[0].ToUpperInvariant()
    $target = $reqLine[1]

    $headers = New-Object System.Collections.ArrayList
    for ($i = 1; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        $c = $line.IndexOf(':')
        if ($c -gt 0) {
            [void]$headers.Add(@($line.Substring(0, $c).Trim(), $line.Substring($c + 1).Trim()))
        }
    }

    $url = $target
    if ($method -ne 'CONNECT' -and $target.StartsWith('/')) {
        # Origin-form request line: rebuild an absolute URL from the Host header.
        $hostHdr = Get-HeaderValue $headers 'Host'
        if (-not $hostHdr) { $hostHdr = 'unknown-host' }
        $url = 'https://' + $hostHdr + $target
    }

    return @{ Method = $method; Url = $url; Headers = $headers; Body = $body }
}

# Parse one raw HTTP/1.x response (a SAZ raw/NN_s.txt file) into status,
# headers, content type and a decoded text body (de-chunked, decompressed).
function ConvertFrom-RawResponse {
    param([byte[]]$Bytes)
    $sep = Find-DoubleCrlf $Bytes
    if ($sep -lt 0) { return $null }
    $head = [System.Text.Encoding]::UTF8.GetString($Bytes, 0, $sep)
    $bodyBytes = New-Object byte[] ($Bytes.Length - $sep - 4)
    if ($bodyBytes.Length -gt 0) { [Array]::Copy($Bytes, $sep + 4, $bodyBytes, 0, $bodyBytes.Length) }

    $lines = $head -split "`r?`n"
    $stParts = $lines[0].Split(' ')
    $status = $lines[0]
    if ($stParts.Count -ge 2) { $status = ($stParts[1..($stParts.Count - 1)] -join ' ') }

    $headers = New-Object System.Collections.ArrayList
    for ($i = 1; $i -lt $lines.Count; $i++) {
        $c = $lines[$i].IndexOf(':')
        if ($c -gt 0) { [void]$headers.Add(@($lines[$i].Substring(0, $c).Trim(), $lines[$i].Substring($c + 1).Trim())) }
    }

    $ctype = [string](Get-HeaderValue $headers 'Content-Type')
    $note = $null
    $bodyText = $null

    if ([string](Get-HeaderValue $headers 'Transfer-Encoding') -match 'chunked') {
        $bodyBytes = Expand-ChunkedBody $bodyBytes
    }
    $cenc = [string](Get-HeaderValue $headers 'Content-Encoding')
    if ($cenc -and $cenc -notmatch 'identity') {
        $decoded = Expand-CompressedBody -B $bodyBytes -ContentEncoding $cenc
        if ($null -eq $decoded) {
            $note = "body not decoded (Content-Encoding: $cenc)"
            $bodyBytes = New-Object byte[] 0
        }
        else { $bodyBytes = $decoded }
    }

    if ($ctype -match 'image/|audio/|video/|font|octet-stream|pdf|zip|protobuf|msgpack') {
        $note = 'binary body omitted'
    }
    elseif ($bodyBytes.Length -gt 0) {
        $bodyText = [System.Text.Encoding]::UTF8.GetString($bodyBytes)
    }

    return @{ Status = $status; ContentType = $ctype; Headers = $headers; Body = $bodyText; Note = $note }
}

function Import-Saz {
    param([string]$Path)
    $sessions = New-Object System.Collections.ArrayList
    $zip = [System.IO.Compression.ZipFile]::OpenRead($Path)
    try {
        $entries = @($zip.Entries | Where-Object { $_.FullName -match 'raw[/\\](\d+)_c\.txt$' } |
            Sort-Object { [int]([regex]::Match($_.FullName, 'raw[/\\](\d+)_c\.txt$').Groups[1].Value) })
        $respByNum = @{}
        foreach ($re in $zip.Entries) {
            $m = [regex]::Match($re.FullName, 'raw[/\\](\d+)_s\.txt$')
            if ($m.Success) { $respByNum[[int]$m.Groups[1].Value] = $re }
        }
        foreach ($entry in $entries) {
            $ms = New-Object System.IO.MemoryStream
            $stream = $entry.Open()
            try { $stream.CopyTo($ms) } finally { $stream.Dispose() }
            $req = ConvertFrom-RawRequest -Bytes $ms.ToArray()
            if ($req) {
                $num = [int]([regex]::Match($entry.FullName, 'raw[/\\](\d+)_c\.txt$').Groups[1].Value)
                if ($respByNum.ContainsKey($num)) {
                    $rs = New-Object System.IO.MemoryStream
                    $rstream = $respByNum[$num].Open()
                    try { $rstream.CopyTo($rs) } finally { $rstream.Dispose() }
                    try { $req.Response = ConvertFrom-RawResponse -Bytes $rs.ToArray() } catch { }
                }
                [void]$sessions.Add($req)
            }
        }
    }
    finally { $zip.Dispose() }
    return ,$sessions
}

function Import-Har {
    param([string]$Path)
    $text = [System.IO.File]::ReadAllText($Path)   # handles UTF-8 BOM
    if ($PSVersionTable.PSVersion.Major -ge 6) {
        $har = $text | ConvertFrom-Json
    }
    else {
        # PS 5.1's ConvertFrom-Json chokes on multi-MB files; use JavaScriptSerializer.
        Add-Type -AssemblyName System.Web.Extensions
        $ser = New-Object System.Web.Script.Serialization.JavaScriptSerializer
        $ser.MaxJsonLength = [int]::MaxValue
        $ser.RecursionLimit = 1000
        $har = $ser.DeserializeObject($text)
    }

    $sessions = New-Object System.Collections.ArrayList
    foreach ($entry in $har.log.entries) {
        $r = $entry.request
        if (-not $r) { continue }
        $headers = New-Object System.Collections.ArrayList
        foreach ($h in @($r.headers)) {
            if ($h) { [void]$headers.Add(@([string]$h.name, [string]$h.value)) }
        }
        $body = ''
        if ($r.postData -and $r.postData.text) {
            $body = [string]$r.postData.text
            if ([string]$r.postData.encoding -eq 'base64') {
                $body = [System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($body))
            }
        }

        $respObj = $null
        $resp = $entry.response
        if ($resp) {
            $rBody = $null
            $rNote = $null
            $ct = $null
            $rHeaders = New-Object System.Collections.ArrayList
            foreach ($h in @($resp.headers)) {
                if ($h) { [void]$rHeaders.Add(@([string]$h.name, [string]$h.value)) }
            }
            if ($resp.content) {
                $ct = [string]$resp.content.mimeType
                if ($resp.content.text) {
                    $rBody = [string]$resp.content.text
                    if ([string]$resp.content.encoding -eq 'base64') {
                        try { $rBody = [System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($rBody)) }
                        catch { $rBody = $null; $rNote = 'body not decoded (base64)' }
                    }
                }
            }
            $respObj = @{
                Status      = ([string]$resp.status + ' ' + [string]$resp.statusText).Trim()
                ContentType = $ct
                Headers     = $rHeaders
                Body        = $rBody
                Note        = $rNote
            }
        }

        [void]$sessions.Add(@{
            Method   = ([string]$r.method).ToUpperInvariant()
            Url      = [string]$r.url
            Headers  = $headers
            Body     = $body
            Response = $respObj
        })
    }
    return ,$sessions
}

# Load a capture file by extension.
function Import-FiddlerCapture {
    param([string]$Path)
    $ext = [System.IO.Path]::GetExtension($Path).ToLowerInvariant()
    switch ($ext) {
        '.saz'  { return ,(Import-Saz -Path $Path) }
        '.har'  { return ,(Import-Har -Path $Path) }
        default { throw "Unsupported input type '$ext' - expected .saz or .har" }
    }
}

# Shared session filter: drops CONNECT tunnels, applies host/static/dedupe rules.
function Select-CapturedSessions {
    param($Sessions, [string[]]$FilterHost = @(), [switch]$NoStatic, [switch]$Dedupe)
    $seen = @{}
    $kept = New-Object System.Collections.ArrayList
    foreach ($s in $Sessions) {
        if ($s.Method -eq 'CONNECT' -or $s.Url -notmatch '^https?://') { continue }
        $sHost = ([uri]$s.Url).Authority
        if ($FilterHost.Count -gt 0) {
            $match = $false
            foreach ($f in $FilterHost) { if ($sHost -like "*$f*") { $match = $true; break } }
            if (-not $match) { continue }
        }
        if ($NoStatic -and $s.Url -match $FiddlerStaticPattern) { continue }
        if ($Dedupe) {
            $key = $s.Method + ' ' + ($s.Url.Split('#')[0])
            if ($seen.ContainsKey($key)) { continue }
            $seen[$key] = $true
        }
        [void]$kept.Add($s)
    }
    return ,$kept
}

# Token-preserving JSON pretty-printer (no round-trip through ConvertFrom-Json,
# which mangles dates and large numbers on PS 5.1).
function Format-Json {
    param([string]$Json)
    $sb = New-Object System.Text.StringBuilder
    $indent = 0
    $inStr = $false
    $esc = $false
    foreach ($ch in $Json.ToCharArray()) {
        if ($esc) { [void]$sb.Append($ch); $esc = $false; continue }
        if ($inStr) {
            [void]$sb.Append($ch)
            if ($ch -eq '\') { $esc = $true } elseif ($ch -eq '"') { $inStr = $false }
            continue
        }
        if ($ch -eq '"') { $inStr = $true; [void]$sb.Append($ch) }
        elseif ($ch -eq '{' -or $ch -eq '[') {
            $indent++
            [void]$sb.Append($ch)
            [void]$sb.Append("`n" + ('  ' * $indent))
        }
        elseif ($ch -eq '}' -or $ch -eq ']') {
            $indent = [Math]::Max(0, $indent - 1)
            [void]$sb.Append("`n" + ('  ' * $indent))
            [void]$sb.Append($ch)
        }
        elseif ($ch -eq ',') {
            [void]$sb.Append($ch)
            [void]$sb.Append("`n" + ('  ' * $indent))
        }
        elseif ($ch -eq ':') { [void]$sb.Append(': ') }
        elseif (-not [char]::IsWhiteSpace($ch)) { [void]$sb.Append($ch) }
    }
    return $sb.ToString()
}
