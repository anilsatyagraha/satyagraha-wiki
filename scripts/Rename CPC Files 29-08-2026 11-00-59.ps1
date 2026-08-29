param(
    [Parameter(Mandatory = $true)]
    [string]$Root
)

$ErrorActionPreference = 'Stop'

$resolvedRoot = (Resolve-Path -LiteralPath $Root).Path
$expectedLeaf = 'Code of Civil Procedure'
if ((Split-Path -Leaf $resolvedRoot) -ne $expectedLeaf) {
    throw "Refusing to migrate unexpected folder: $resolvedRoot"
}

$mapping = [ordered]@{}
$mapping['cpc1'] = 'Civil-Procedure-Code-Preliminary'
for ($sourceNumber = 2; $sourceNumber -le 12; $sourceNumber++) {
    $partNumber = $sourceNumber - 1
    $mapping["cpc$sourceNumber"] = "Civil-Procedure-Code-Part-$partNumber"
}

$orders = 1..51 | ForEach-Object { $_.ToString() }
$orders += '16a', '20a', '27a', '32a'
foreach ($order in $orders) {
    $mapping["cpco$order"] = "Civil-Procedure-Code-Order-$($order.ToUpperInvariant())"
}

foreach ($footnote in 1..68) {
    $mapping["cpc-f$footnote"] = "Civil-Procedure-Code-Footnotes-$footnote"
}

foreach ($appendix in 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h') {
    $mapping["cpc-app$appendix"] = "Civil-Procedure-Code-Appendix-$($appendix.ToUpperInvariant())"
}

foreach ($schedule in 2..5) {
    $mapping["cpc-sch$schedule"] = "Civil-Procedure-Code-Schedule-$schedule"
}

$mapping['cpc-annex'] = 'Civil-Procedure-Code-Annexure'

$utf8 = [System.Text.UTF8Encoding]::new($false)
$markdownFiles = Get-ChildItem -LiteralPath $resolvedRoot -Filter '*.md' -File

foreach ($file in $markdownFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $updated = $content
    foreach ($entry in $mapping.GetEnumerator()) {
        $pattern = '(?i)(?<=\[\[)' + [regex]::Escape($entry.Key) + '(?=[\]|#])'
        $updated = [regex]::Replace($updated, $pattern, $entry.Value)
    }
    if ($updated -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $updated, $utf8)
    }
}

$renamed = 0
foreach ($entry in $mapping.GetEnumerator()) {
    $oldPath = Join-Path $resolvedRoot ($entry.Key + '.md')
    $newPath = Join-Path $resolvedRoot ($entry.Value + '.md')

    if (Test-Path -LiteralPath $oldPath) {
        if (Test-Path -LiteralPath $newPath) {
            throw "Refusing to overwrite existing file: $newPath"
        }
        Move-Item -LiteralPath $oldPath -Destination $newPath
        $renamed++
    }

    if (Test-Path -LiteralPath $newPath) {
        $content = [System.IO.File]::ReadAllText($newPath)
        $legacyAlias = "bare-acts/code-of-civil-procedure/$($entry.Key)"
        $shortAliasPattern = '(?m)^(\s*-\s*)' + [regex]::Escape($entry.Key) + '\s*$'
        if ($content -match $shortAliasPattern) {
            $content = [regex]::Replace($content, $shortAliasPattern, "`${1}$legacyAlias")
        }
        $aliasPattern = '(?m)^\s*-\s*' + [regex]::Escape($legacyAlias) + '\s*$'
        if ($content -notmatch $aliasPattern) {
            $frontmatter = "---`naliases:`n  - $legacyAlias`n---`n"
            $content = $frontmatter + $content
        }

        $suffix = $entry.Value.Substring('Civil-Procedure-Code-'.Length) -replace '-', ' '
        $title = "Civil Procedure Code - $suffix"
        $frontmatterMatch = [regex]::Match($content, '\A---\r?\n(?<frontmatter>.*?)\r?\n---\r?\n', 'Singleline')
        if (-not $frontmatterMatch.Success) {
            throw "Expected frontmatter was not found in $newPath"
        }
        if ($frontmatterMatch.Groups['frontmatter'].Value -notmatch '(?m)^title\s*:') {
            $escapedTitle = $title.Replace('"', '\"')
            $content = [regex]::Replace($content, '\A---\r?\n', "---`ntitle: `"$escapedTitle`"`n", 1)
        }
        [System.IO.File]::WriteAllText($newPath, $content, $utf8)
    }
}

$unresolved = Get-ChildItem -LiteralPath $resolvedRoot -Filter '*.md' -File |
    Select-String -Pattern '\[\[(cpc\d+|cpco\d+[a-z]?|cpc-f\d+|cpc-app[a-h]|cpc-sch\d+|cpc-annex)(?=[\]|#])' -AllMatches

if ($unresolved) {
    throw "Unresolved abbreviated wiki links remain in $resolvedRoot"
}

Write-Host "Renamed $renamed CPC Markdown files in $resolvedRoot"
