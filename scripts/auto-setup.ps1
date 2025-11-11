#!/usr/bin/env pwsh
<#
.SYNOPSIS
    نظام التفعيل التلقائي لأدوات التطوير في NexusAI Platform
.DESCRIPTION
    يفعّل ويهيئ جميع الأدوات والإضافات المطلوبة تلقائياً
    مع التحقق من التوافق والإعدادات المثلى
.NOTES
    Version: 2.0.0
    Author: NexusAI Development Team
#>

$ErrorActionPreference = "Stop"

# ====================================
# 🎨 وظائف العرض
# ====================================
function Write-Header {
    Clear-Host
    Write-Host @"
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║      ⚙️  NexusAI Auto-Setup Tool ⚙️                       ║
║                                                            ║
║          التفعيل التلقائي لبيئة التطوير المتكاملة         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan
}

function Write-Section {
    param([string]$Title)
    Write-Host "`n═══════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  $Title" -ForegroundColor Yellow
    Write-Host "═══════════════════════════════════════════`n" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "   ✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "   ⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "   ❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "   ℹ️  $Message" -ForegroundColor Cyan
}

# ====================================
# 📦 تثبيت الاعتماديات
# ====================================
function Install-Dependencies {
    Write-Section "تثبيت الاعتماديات"

    try {
        if (-not (Test-Path "node_modules")) {
            Write-Info "تثبيت الحزم الأساسية..."
            npm install 2>&1 | Out-Null

            if ($LASTEXITCODE -eq 0) {
                Write-Success "تم تثبيت الاعتماديات"
            }
            else {
                Write-Error "فشل في تثبيت الاعتماديات"
                return $false
            }
        }
        else {
            Write-Success "الاعتماديات مثبتة مسبقاً"
        }

        return $true
    }
    catch {
        Write-Error "خطأ في التثبيت: $_"
        return $false
    }
}

# ====================================
# 🔧 إعداد VS Code
# ====================================
function Initialize-VSCodeSettings {
    Write-Section "إعداد VS Code"

    try {
        # التحقق من وجود VS Code
        $vscodePath = Get-Command code -ErrorAction SilentlyContinue

        if (-not $vscodePath) {
            Write-Warning "VS Code غير مثبت أو غير موجود في PATH"
            return $false
        }

        Write-Success "VS Code موجود"

        # الإضافات الأساسية المطلوبة
        $essentialExtensions = @(
            "GitHub.copilot",
            "GitHub.copilot-chat",
            "esbenp.prettier-vscode",
            "dbaeumer.vscode-eslint",
            "bradlc.vscode-tailwindcss"
        )

        Write-Info "فحص الإضافات المثبتة..."
        $installedExtensions = code --list-extensions 2>&1

        $missingExtensions = @()
        foreach ($ext in $essentialExtensions) {
            if ($installedExtensions -notcontains $ext) {
                $missingExtensions += $ext
            }
        }

        if ($missingExtensions.Count -gt 0) {
            Write-Warning "الإضافات المفقودة: $($missingExtensions.Count)"

            foreach ($ext in $missingExtensions) {
                Write-Info "تثبيت: $ext"
                code --install-extension $ext --force 2>&1 | Out-Null
            }

            Write-Success "تم تثبيت الإضافات المفقودة"
        }
        else {
            Write-Success "جميع الإضافات الأساسية مثبتة"
        }

        return $true
    }
    catch {
        Write-Error "فشل في إعداد VS Code: $_"
        return $false
    }
}

# ====================================
# 🔐 إعداد متغيرات البيئة
# ====================================
function Initialize-EnvironmentVariables {
    Write-Section "إعداد متغيرات البيئة"

    try {
        if (-not (Test-Path ".env.local")) {
            if (Test-Path ".env.example") {
                Copy-Item ".env.example" ".env.local"
                Write-Success "تم إنشاء .env.local من القالب"
                Write-Warning "يرجى تحديث مفاتيح API في .env.local"
            }
            else {
                # إنشاء ملف .env.local فارغ
                @"
# NexusAI Platform Environment Variables
# تاريخ الإنشاء: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Google AI Configuration
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
"@ | Out-File ".env.local" -Encoding UTF8

                Write-Success "تم إنشاء .env.local جديد"
                Write-Warning "يرجى إضافة مفاتيح API المطلوبة"
            }
        }
        else {
            Write-Success "ملف .env.local موجود"
        }

        return $true
    }
    catch {
        Write-Error "فشل في إعداد متغيرات البيئة: $_"
        return $false
    }
}

# ====================================
# 🔍 فحص Git
# ====================================
function Initialize-GitConfiguration {
    Write-Section "إعداد Git"

    try {
        $gitPath = Get-Command git -ErrorAction SilentlyContinue

        if (-not $gitPath) {
            Write-Warning "Git غير مثبت"
            return $false
        }

        Write-Success "Git موجود"

        # التحقق من إعداد Git
        $userName = git config user.name 2>&1
        $userEmail = git config user.email 2>&1

        if (-not $userName -or -not $userEmail) {
            Write-Warning "Git غير معد بالكامل"
            Write-Info "تنفيذ الأوامر التالية:"
            Write-Host "      git config --global user.name `"Your Name`"" -ForegroundColor Gray
            Write-Host "      git config --global user.email `"your@email.com`"" -ForegroundColor Gray
        }
        else {
            Write-Success "Git معد: $userName <$userEmail>"
        }

        # التحقق من Husky
        if (Test-Path ".husky") {
            Write-Success "Husky معد (Git hooks)"
        }

        return $true
    }
    catch {
        Write-Error "فشل في فحص Git: $_"
        return $false
    }
}

# ====================================
# 🧪 فحص الأدوات المساعدة
# ====================================
function Test-DevelopmentTools {
    Write-Section "فحص الأدوات المساعدة"

    $tools = @{
        "Node.js" = { node --version }
        "npm" = { npm --version }
        "TypeScript" = { npx tsc --version }
        "ESLint" = { npx eslint --version }
        "Prettier" = { npx prettier --version }
    }

    $allPresent = $true

    foreach ($tool in $tools.GetEnumerator()) {
        try {
            $version = & $tool.Value 2>&1
            Write-Success "$($tool.Key): $version"
        }
        catch {
            Write-Warning "$($tool.Key): غير متاح"
            $allPresent = $false
        }
    }

    return $allPresent
}

# ====================================
# 🚀 تشغيل الفحوصات الأولية
# ====================================
function Start-InitialChecks {
    Write-Section "الفحوصات الأولية"

    try {
        # فحص TypeScript
        Write-Info "فحص TypeScript..."
        npm run typecheck 2>&1 | Out-Null

        if ($LASTEXITCODE -eq 0) {
            Write-Success "TypeScript: لا توجد أخطاء"
        }
        else {
            Write-Warning "TypeScript: توجد أخطاء"
        }

        # فحص ESLint
        Write-Info "فحص ESLint..."
        npm run lint 2>&1 | Out-Null

        if ($LASTEXITCODE -eq 0) {
            Write-Success "ESLint: الكود نظيف"
        }
        else {
            Write-Warning "ESLint: توجد تحذيرات"
            Write-Info "تنفيذ: npm run lint:fix"
        }

        return $true
    }
    catch {
        Write-Warning "فشلت بعض الفحوصات: $_"
        return $false
    }
}

# ====================================
# 📝 إنشاء سكربتات مساعدة
# ====================================
function New-HelperScripts {
    Write-Section "إنشاء سكربتات مساعدة"

    try {
        # سكربت بدء سريع
        $quickStartScript = @'
#!/usr/bin/env pwsh
# Quick Start Script for NexusAI Platform

Write-Host "🚀 Starting NexusAI Platform..." -ForegroundColor Cyan

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start development server
Write-Host "🔥 Starting development server..." -ForegroundColor Green
npm run dev
'@

        if (-not (Test-Path "scripts")) {
            New-Item -ItemType Directory -Path "scripts" -Force | Out-Null
        }

        $quickStartScript | Out-File "quick-start.ps1" -Encoding UTF8
        Write-Success "تم إنشاء: quick-start.ps1"

        return $true
    }
    catch {
        Write-Warning "فشل في إنشاء السكربتات: $_"
        return $false
    }
}

# ====================================
# 📊 تقرير الإعداد
# ====================================
function Show-SetupSummary {
    param(
        [bool]$DependenciesOk,
        [bool]$VSCodeOk,
        [bool]$EnvOk,
        [bool]$GitOk,
        [bool]$ToolsOk,
        [bool]$ChecksOk
    )

    Write-Host "`n" + "═" * 60 -ForegroundColor Cyan
    Write-Host "📊 ملخص الإعداد" -ForegroundColor Yellow
    Write-Host "═" * 60 -ForegroundColor Cyan

    function Show-Status {
        param([string]$Name, [bool]$Status)
        Write-Host "$Name : " -NoNewline
        if ($Status) {
            Write-Host "✅ جاهز" -ForegroundColor Green
        }
        else {
            Write-Host "⚠️  يحتاج إجراءً" -ForegroundColor Yellow
        }
    }

    Show-Status "الاعتماديات" $DependenciesOk
    Show-Status "VS Code" $VSCodeOk
    Show-Status "متغيرات البيئة" $EnvOk
    Show-Status "Git" $GitOk
    Show-Status "الأدوات المساعدة" $ToolsOk
    Show-Status "الفحوصات الأولية" $ChecksOk

    Write-Host "═" * 60 -ForegroundColor Cyan

    $allOk = $DependenciesOk -and $VSCodeOk -and $EnvOk -and $GitOk -and $ToolsOk

    if ($allOk) {
        Write-Host "`n✨ بيئة التطوير جاهزة بالكامل!`n" -ForegroundColor Green
        Write-Host "🚀 للبدء، نفذ: " -NoNewline -ForegroundColor Cyan
        Write-Host "npm run dev`n" -ForegroundColor White
    }
    else {
        Write-Host "`n⚠️  يرجى مراجعة العناصر التي تحتاج إجراءً`n" -ForegroundColor Yellow
    }
}

# ====================================
# 🚀 التنفيذ الرئيسي
# ====================================
function Start-AutoSetup {
    Write-Header

    Write-Host "`n⚙️  بدء التفعيل التلقائي...`n" -ForegroundColor Yellow
    Start-Sleep -Seconds 1

    # تنفيذ خطوات الإعداد
    $dependenciesOk = Install-Dependencies
    $vscodeOk = Initialize-VSCodeSettings
    $envOk = Initialize-EnvironmentVariables
    $gitOk = Initialize-GitConfiguration
    $toolsOk = Test-DevelopmentTools
    $checksOk = Start-InitialChecks
    New-HelperScripts | Out-Null

    # عرض الملخص
    Show-SetupSummary -DependenciesOk $dependenciesOk -VSCodeOk $vscodeOk `
        -EnvOk $envOk -GitOk $gitOk -ToolsOk $toolsOk -ChecksOk $checksOk
}

# تشغيل النظام
Start-AutoSetup
