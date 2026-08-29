$ErrorActionPreference = 'Stop'

$source = 'D:\satyagraha\VAULT\Satyagraha Law Group\site\wiki'
$project = Split-Path -Parent $PSScriptRoot
$content = Join-Path $project 'content'

Copy-Item -LiteralPath (Join-Path $source 'Home.md') -Destination (Join-Path $content 'index.md') -Force
Copy-Item -LiteralPath (Join-Path $source 'bare acts') -Destination $content -Recurse -Force

Write-Host "Wiki content copied into $content"
