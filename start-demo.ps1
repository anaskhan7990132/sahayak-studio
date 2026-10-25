$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host 'Install Node.js 22.13+ from https://nodejs.org, then run this script again.'
    exit 1
}
if (-not (Test-Path 'node_modules')) {
    npm install
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
Write-Host 'Visit http://localhost:3000 after the server is ready.'
npm run dev
