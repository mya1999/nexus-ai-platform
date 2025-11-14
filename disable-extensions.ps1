# 🔧 تعطيل Extensions غير الضرورية في VS Code

Write-Host "`n🎯 تعطيل Extensions غير الضرورية...`n" -ForegroundColor Cyan

# قائمة Extensions المطلوب تعطيلها
$extensionsToDisable = @(
    "ms-vscode.azure-repos",
    "gitkraken.gitkraken-authentication", 
    "ms-toolsai.jupyter",
    "marp-team.marp-vscode",
    "Prisma.prisma",
    "SonarSource.sonarlint-vscode",
    "GitHub.copilot-app-modernization",
    "GitHub.copilot-app-modernization-java"
)

Write-Host "📋 Extensions المطلوب تعطيلها:`n" -ForegroundColor Yellow

foreach ($ext in $extensionsToDisable) {
    Write-Host "  ❌ $ext" -ForegroundColor Red
    code --disable-extension $ext 2>$null
}

Write-Host "`n✅ تم تعطيل Extensions غير الضرورية!`n" -ForegroundColor Green

Write-Host "🔄 يجب إعادة تشغيل VS Code لتطبيق التغييرات:`n" -ForegroundColor Yellow
Write-Host "Get-Process -Name 'Code' | Stop-Process -Force ; Start-Sleep 2 ; code .`n" -ForegroundColor Cyan

Write-Host "📊 الأدوات المتبقية: Built-In + Essential Extensions فقط (حوالي 50-60 أداة)" -ForegroundColor Green