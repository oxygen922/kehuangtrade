# Upload all images under public/images to R2 bucket "kehuangtrade".
# Usage: powershell -File scripts/upload-r2.ps1 -Token <cfat_...> -AccountId <account_id>
# Token comes from: dash.cloudflare.com -> R2 -> Manage R2 API Tokens (R2 Edit)
param(
  [Parameter(Mandatory = $true)] [string]$Token,
  [Parameter(Mandatory = $true)] [string]$AccountId,
  [string]$Bucket = "kehuangtrade",
  [string]$Source = ""
)

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
if (-not $Source) { $Source = Join-Path $PSScriptRoot "..\public\images" }
$base = (Resolve-Path $Source).Path
$files = Get-ChildItem $base -Recurse -File
"source: $base"
"files : $($files.Count)"

$mimeByExt = @{
  ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"; ".png" = "image/png"
  ".webp" = "image/webp"; ".gif" = "image/gif"; ".svg" = "image/svg+xml"
}

$ok = 0; $fail = @()
$i = 0
foreach ($f in $files) {
  $i++
  $key = $f.FullName.Substring($base.Length + 1).Replace("\", "/")
  $mime = $mimeByExt[$f.Extension.ToLower()]
  if (-not $mime) { $mime = "application/octet-stream" }
  $uri = "https://api.cloudflare.com/client/v4/accounts/$AccountId/r2/buckets/$Bucket/objects/$key"
  $done = $false
  foreach ($try in 1..3) {
    try {
      Invoke-RestMethod -Method Put -Uri $uri `
        -Headers @{ Authorization = "Bearer $Token" } `
        -ContentType $mime -InFile $f.FullName -TimeoutSec 60 | Out-Null
      $done = $true; break
    } catch {
      Start-Sleep -Seconds (2 * $try)
    }
  }
  if ($done) { $ok++; "[$i/$($files.Count)] OK  $key" }
  else { $fail += $key; "[$i/$($files.Count)] FAIL $key" }
}

""
"uploaded: $ok / $($files.Count)"
if ($fail.Count -gt 0) {
  "failed keys:"; $fail | ForEach-Object { "  $_" }
  exit 1
}
