# Placeholder image batch generator (McMaster-style white-bg product shots)
# Replace all files under public/images/ with supplier images before launch.
# NOTE: API is rate-limited; we throttle + detect the cached fallback image and retry.
$ErrorActionPreference = "Continue"
$root = Split-Path -Parent $PSScriptRoot
$imgRoot = Join-Path $root "public\images"
foreach ($d in @("products", "categories", "cases")) { New-Item -ItemType Directory -Force -Path (Join-Path $imgRoot $d) | Out-Null }

$fallbackHash = "19A0B822EDB11957055E4588C2159058"

$style = ", professional product photography on pure white background, studio lighting, industrial catalog style, photorealistic, no text, no watermark, no logo"

$images = @(
  @("products/labor-1", "square_hd", "cut-resistant safety work gloves, black nylon shell with grey polyurethane coated palm" + $style),
  @("products/labor-2", "square_hd", "white and blue ABS industrial safety helmet hard hat" + $style),
  @("products/labor-3", "square_hd", "clear polycarbonate safety goggles with indirect ventilation" + $style),
  @("products/labor-4", "square_hd", "pair of orange foam ear plugs" + $style),
  @("products/labor-5", "square_hd", "blue nitrile disposable gloves" + $style),
  @("products/tools-1", "square_hd", "set of phillips head screwdrivers with red comfort handles" + $style),
  @("products/tools-2", "square_hd", "polished chrome combination wrench set" + $style),
  @("products/tools-3", "square_hd", "insulated combination pliers with red 1000V handles" + $style),
  @("products/tools-4", "square_hd", "blue corded hammer drill power tool" + $style),
  @("products/tools-5", "square_hd", "steel claw hammer with fiberglass handle" + $style),
  @("products/electric-1", "square_hd", "coils of red and blue copper electrical wire" + $style),
  @("products/electric-2", "square_hd", "black molded case three pole circuit breaker" + $style),
  @("products/electric-3", "square_hd", "round UFO high bay LED lamp with aluminium heatsink" + $style),
  @("products/electric-4", "square_hd", "grey plastic electrical junction box with terminals" + $style),
  @("products/electric-5", "square_hd", "bundle of black nylon cable ties" + $style),
  @("products/equip-1", "square_hd", "chrome steel ball bearing" + $style),
  @("products/equip-2", "square_hd", "black rubber v-belt" + $style),
  @("products/equip-3", "square_hd", "galvanized steel conveyor roller" + $style),
  @("products/equip-4", "square_hd", "K-type thermocouple temperature sensor probe with stainless steel sheath and cable" + $style),
  @("products/equip-5", "square_hd", "steel hydraulic hose fitting connector" + $style),
  @("products/faci-1", "square_hd", "blue plastic stackable storage bin for small parts" + $style),
  @("products/faci-2", "square_hd", "roll of transparent stretch wrap film" + $style),
  @("products/faci-3", "square_hd", "roll of clear packing tape" + $style),
  @("products/faci-4", "square_hd", "aluminium step ladder" + $style),
  @("products/faci-5", "square_hd", "industrial janitor cleaning cart with bags" + $style),
  @("products/veh-1", "square_hd", "heavy duty black caster wheel with brake" + $style),
  @("products/veh-2", "square_hd", "blue hydraulic hand pallet truck" + $style),
  @("products/veh-3", "square_hd", "solid black rubber industrial tire for forklift" + $style),
  @("products/veh-4", "square_hd", "orange polyester webbing lifting sling strap" + $style),
  @("products/veh-5", "square_hd", "black rubber wheel chock" + $style),
  @("categories/labor", "landscape_4_3", "flat lay of personal protective equipment, hard hat gloves goggles earplugs, on workshop table"),
  @("categories/tools", "landscape_4_3", "assorted professional hand tools arranged on workbench"),
  @("categories/electric", "landscape_4_3", "electrical supplies, circuit breakers copper wire and LED lamp"),
  @("categories/equipment", "landscape_4_3", "industrial machine spare parts, bearings belts and gears closeup"),
  @("categories/facility", "landscape_4_3", "warehouse shelves filled with blue plastic storage bins"),
  @("categories/vehicle", "landscape_4_3", "warehouse floor with hand pallet truck and heavy duty caster wheels"),
  @("hero", "landscape_16_9", "modern industrial warehouse interior, asian worker with tablet checking inventory, forklift in background, green tone, cinematic wide shot"),
  @("cases/case-1", "landscape_4_3", "aluminum extrusion press machine in factory, glowing hot metal, industrial photography"),
  @("cases/case-2", "landscape_4_3", "newly built factory interior with electrician installing LED high bay lights"),
  @("cases/case-3", "landscape_4_3", "electronics assembly line, workers wearing anti-static gloves and wristbands")
)

# purge stale/invalid files
foreach ($img in $images) {
  $out = Join-Path $imgRoot "$($img[0]).jpg"
  if (Test-Path $out) {
    $h = (Get-FileHash $out -Algorithm MD5).Hash
    if ($h -eq $fallbackHash -or (Get-Item $out).Length -lt 20000) { Remove-Item $out -Force }
  }
}

$i = 0; $okCount = 0
foreach ($img in $images) {
  $i++
  $name = $img[0]; $size = $img[1]; $prompt = $img[2]
  $out = Join-Path $imgRoot "$name.jpg"
  if ((Test-Path $out) -and (Get-Item $out).Length -gt 20000) { Write-Output "[$i/$($images.Count)] SKIP $name"; $okCount++; continue }

  $done = $false
  for ($try = 1; $try -le 3 -and -not $done; $try++) {
    $url = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=$([uri]::EscapeDataString($prompt))&image_size=$size"
    try {
      Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 180
      $h = (Get-FileHash $out -Algorithm MD5).Hash
      if ($h -ne $fallbackHash -and (Get-Item $out).Length -gt 20000) {
        Write-Output "[$i/$($images.Count)] OK $name try=$try ($((Get-Item $out).Length) bytes)"
        $done = $true; $okCount++
      } else {
        Write-Output "[$i/$($images.Count)] RETRY $name try=$try (fallback image)"
        Remove-Item $out -Force -ErrorAction SilentlyContinue
      }
    } catch {
      Write-Output "[$i/$($images.Count)] ERR $name try=$try : $($_.Exception.Message)"
    }
    if (-not $done) { Start-Sleep -Milliseconds 4000 }
  }
  Start-Sleep -Milliseconds 2500
}
Write-Output "ALL DONE: $okCount/$($images.Count) ok"
