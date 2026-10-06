# Fetch real product photos via Bing images async endpoint (clean structured results)
# All files are dev placeholders: replace public/images/ with supplier assets before launch.
$ErrorActionPreference = "Continue"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
$root = Split-Path -Parent $PSScriptRoot
$imgRoot = Join-Path $root "public\images"
foreach ($d in @("products", "categories", "cases")) { New-Item -ItemType Directory -Force -Path (Join-Path $imgRoot $d) | Out-Null }

# watermarked stock agencies + noise hosts
$blacklist = "alamy|gettyimages|istockphoto|dreamstime|shutterstock|123rf|stockphoto|depositphotos|freepik|vecteezy|advert|goodreads|kym-cdn"

$items = @(
  @("products/labor-1", "cut resistant safety gloves product white background"),
  @("products/labor-2", "ABS safety helmet hard hat product white background"),
  @("products/labor-3", "clear safety goggles product white background"),
  @("products/labor-4", "foam ear plugs product white background"),
  @("products/labor-5", "blue nitrile gloves product white background"),
  @("products/tools-1", "phillips screwdriver set product white background"),
  @("products/tools-2", "combination wrench set chrome product white background"),
  @("products/tools-3", "insulated pliers product white background"),
  @("products/tools-4", "corded hammer drill product white background"),
  @("products/tools-5", "claw hammer fiberglass handle product white background"),
  @("products/electric-1", "copper electrical wire coil product white background"),
  @("products/electric-2", "three pole circuit breaker product white background"),
  @("products/electric-3", "UFO LED high bay light product white background"),
  @("products/electric-4", "grey electrical junction box product white background"),
  @("products/electric-5", "black cable ties product white background"),
  @("products/equip-1", "ball bearing 6205 product white background"),
  @("products/equip-2", "rubber v-belt product white background"),
  @("products/equip-3", "steel conveyor roller product white background"),
  @("products/equip-4", "thermocouple temperature sensor probe product white background"),
  @("products/equip-5", "hydraulic hose fitting product white background"),
  @("products/faci-1", "blue plastic storage bin product white background"),
  @("products/faci-2", "stretch wrap film roll product white background"),
  @("products/faci-3", "packing tape roll product white background"),
  @("products/faci-4", "aluminium step ladder product white background"),
  @("products/faci-5", "janitorial cleaning cart product white background"),
  @("products/veh-1", "heavy duty caster wheel product white background"),
  @("products/veh-2", "hand pallet truck product white background"),
  @("products/veh-3", "solid forklift tire product white background"),
  @("products/veh-4", "lifting sling strap polyester product white background"),
  @("products/veh-5", "rubber wheel chock product white background"),
  @("categories/labor", "personal protective equipment ppe flat lay"),
  @("categories/tools", "hand tools arranged on workbench"),
  @("categories/electric", "electrical supplies circuit breakers and copper wire"),
  @("categories/equipment", "industrial bearings and belts machine parts"),
  @("categories/facility", "warehouse shelves with plastic storage bins"),
  @("categories/vehicle", "warehouse hand pallet truck logistics"),
  @("hero", "modern industrial warehouse interior with forklift"),
  @("cases/case-1", "aluminum extrusion press machine factory"),
  @("cases/case-2", "electrician installing LED light in factory"),
  @("cases/case-3", "electronics assembly line workers esd")
)

function Test-ImageFile($path) {
  if (-not (Test-Path $path)) { return $false }
  if ((Get-Item $path).Length -lt 15000) { return $false }
  $fs = [System.IO.File]::OpenRead($path)
  $b = New-Object byte[] 4; $n = $fs.Read($b, 0, 4); $fs.Close()
  $hex = ($b | ForEach-Object { $_.ToString("X2") }) -join " "
  return ($hex.StartsWith("FF D8") -or $hex.StartsWith("89 50 4E 47"))
}

# purge previous bad images
foreach ($it in $items) { $p = Join-Path $imgRoot "$($it[0]).jpg"; if (Test-Path $p) { Remove-Item $p -Force } }

$i = 0; $ok = 0
foreach ($it in $items) {
  $i++; $name = $it[0]; $query = $it[1]
  $out = Join-Path $imgRoot "$name.jpg"
  if ((Test-Path $out) -and (Get-Item $out).Length -gt 15000) { Write-Output "[$i/$($items.Count)] SKIP $name"; $ok++; continue }

  $q = [uri]::EscapeDataString($query)
  $murls = @()
  try {
    $r = Invoke-WebRequest -Uri "https://www.bing.com/images/async?q=$q&first=0&count=30&mmasync=1" -UserAgent $ua -UseBasicParsing -TimeoutSec 30
    $murls = [regex]::Matches($r.Content, 'murl&quot;:&quot;(.+?)&quot;') |
      ForEach-Object { ($_.Groups[1].Value -replace '&amp;', '&') } |
      Where-Object { $_ -match '\.(jpg|jpeg|png)(\?|$)' -and $_ -notmatch $blacklist } |
      Select-Object -Unique -First 5
  } catch { Write-Output "[$i/$($items.Count)] SEARCH-ERR $name : $($_.Exception.Message)" }

  $got = $false
  foreach ($u in $murls) {
    try {
      $tmp = "$env:TEMP\bingtmp.jpg"
      Invoke-WebRequest -Uri $u -OutFile $tmp -UserAgent $ua -UseBasicParsing -TimeoutSec 40
      if (Test-ImageFile $tmp) { Move-Item $tmp $out -Force; Write-Output "[$i/$($items.Count)] OK $name"; $got = $true; $ok++; break }
    } catch { }
  }
  if (-not $got) { Write-Output "[$i/$($items.Count)] MISS $name ($($murls.Count) candidates)" }
  Start-Sleep -Seconds 2
}
Write-Output "ALL DONE: $ok/$($items.Count)"
