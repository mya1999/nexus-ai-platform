# ===============================
# ZORO AI AUTO-ENVIRONMENT SETUP
# ===============================

# 1) أساسيات الأمان والتنفيذ
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

# 2) استدعاء الأدوات الأساسية
Import-Module PSScriptAnalyzer -ErrorAction SilentlyContinue
Import-Module PowerShell-Beautifier -ErrorAction SilentlyContinue
Import-Module PSReadLine -ErrorAction SilentlyContinue
Import-Module posh-git -ErrorAction SilentlyContinue
Import-Module oh-my-posh -ErrorAction SilentlyContinue
Import-Module Terminal-Icons -ErrorAction SilentlyContinue
Import-Module Microsoft.PowerShell.SecretManagement -ErrorAction SilentlyContinue
Import-Module Microsoft.PowerShell.SecretStore -ErrorAction SilentlyContinue
Import-Module Az.Tools.Predictor -ErrorAction SilentlyContinue

# 3) واجهة ذكية
Set-PSReadLineOption -PredictionSource HistoryAndPlugin
Set-PSReadLineOption -Colors @{ "InlinePrediction" = "`e[38;5;111m" }

# 4) تخصيص المظهر
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\paradox.omp.json" | Invoke-Expression
#Enable-SecretStore -Scope CurrentUser -Authentication None -PasswordTimeout 0 -Confirm:$false | Out-Null

# 5) رسالة نجاح
Write-Host "`n🚀 ZORO AI PowerShell Environment Loaded Successfully" -ForegroundColor Green
Write-Host "🔧 الذكاء الاصطناعي، التحليل، والتنسيق جاهزون." -ForegroundColor Cyan

