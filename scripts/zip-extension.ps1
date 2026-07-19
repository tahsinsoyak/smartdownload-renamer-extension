$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root "dist"
$outDir = Join-Path $root "release"
$manifest = Get-Content -Raw (Join-Path $root "public\manifest.json") | ConvertFrom-Json
$zip = Join-Path $outDir ("smart-download-renamer-v{0}.zip" -f $manifest.version)
$legacyZip = Join-Path $outDir "smart-download-renamer.zip"

if (!(Test-Path $dist)) {
  throw "dist folder not found. Run npm run build first."
}

New-Item -ItemType Directory -Force -Path $outDir | Out-Null
if (Test-Path $zip) {
  Remove-Item -LiteralPath $zip -Force
}
if (Test-Path $legacyZip) {
  Remove-Item -LiteralPath $legacyZip -Force
}

Compress-Archive -Path (Join-Path $dist "*") -DestinationPath $zip -Force
Write-Host "Created $zip"
