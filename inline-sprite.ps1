$spritePath = "C:\Users\Lyzz\Documents\01_Dev\Portfolio\assets\icons\sprite.svg"
$spriteContent = Get-Content $spritePath -Raw

$htmlFiles = @(
    "C:\Users\Lyzz\Documents\01_Dev\Portfolio\index.html",
    "C:\Users\Lyzz\Documents\01_Dev\Portfolio\skills.html",
    "C:\Users\Lyzz\Documents\01_Dev\Portfolio\portfolio.html"
)

foreach ($file in $htmlFiles) {
    $content = Get-Content $file -Raw

    # Replace external sprite references with same-document references
    $content = $content -replace 'href="\./assets/icons/sprite\.svg#', 'href="#'

    # Build inline sprite (change display:none to position:absolute so it doesn't take space)
    $inlineSprite = $spriteContent -replace 'style="display:none"', 'style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true"'

    # Insert before </body>
    $content = $content -replace '</body>', "$inlineSprite`n</body>"

    [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated: $file"
}
