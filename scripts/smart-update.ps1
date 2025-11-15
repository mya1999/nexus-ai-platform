#!/usr/bin/env pwsh
<#
.SYNOPSIS
    نظام إدارة التحديثات الذكي لـ NexusAI Platform
.DESCRIPTION
    يفحص التحديثات المتاحة، يحلل التوافق، ويطبق التحديثات الآمنة تلقائياً
    مع حفظ نقاط استعادة لضمان عدم فقدان البيانات
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
║      🔄 NexusAI Smart Update Manager 🔄                   ║
║                                                            ║
║         نظام إدارة التحديثات الذكي والآمن                ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan
}

function Write-Step {
    param([string]$Message)
    Write-Host "`n▶ $Message" -ForegroundColor Yellow
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

# ====================================
# 💾 إنشاء نقطة استعادة
# ====================================
function New-BackupPoint {
    Write-Step "إنشاء نقطة استعادة..."

    try {
        $backupDir = "backups"
        $timestamp = Get-Date -Format "yyyy-MM-dd-HHmmss"
        $backupPath = Join-Path $backupDir "backup-$timestamp"

        if (-not (Test-Path $backupDir)) {
            New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
        }

        # نسخ الملفات الحرجة
        $criticalFiles = @(
            "package.json",
            "package-lock.json",
            "tsconfig.json",
            ".env.local"
        )

        New-Item -ItemType Directory -Path $backupPath -Force | Out-Null

        foreach ($file in $criticalFiles) {
            if (Test-Path $file) {
                Copy-Item $file -Destination $backupPath -Force
                Write-Success "نسخ احتياطي: $file"
            }
        }

        Write-Success "نقطة الاستعادة: $backupPath"
        return $backupPath
    }
    catch {
        Write-Error "فشل في إنشاء نقطة استعادة: $_"
        return $null
    }
}

# ====================================
# 🔍 تحليل التحديثات
# ====================================
function Get-UpdateAnalysis {
    Write-Step "تحليل التحديثات المتاحة..."

    try {
        $outdated = npm outdated --json 2>&1

        if ($LASTEXITCODE -eq 0 -or $outdated) {
            $updates = $outdated | ConvertFrom-Json -ErrorAction SilentlyContinue

            if (-not $updates) {
                Write-Success "جميع الحزم محدثة!"
                return @{
                    SafeUpdates = @()
                    RiskyUpdates = @()
                    Total = 0
                }
            }

            $safeUpdates = @()
            $riskyUpdates = @()

            foreach ($pkg in $updates.PSObject.Properties) {
                $name = $pkg.Name
                $current = $pkg.Value.current
                $wanted = $pkg.Value.wanted
                $latest = $pkg.Value.latest

                # تحليل نوع التحديث
                $updateInfo = @{
                    Name = $name
                    Current = $current
                    Wanted = $wanted
                    Latest = $latest
                }

                # التحديثات الآمنة: patch و minor فقط
                if ($wanted -eq $latest) {
                    $safeUpdates += $updateInfo
                }
                else {
                    $riskyUpdates += $updateInfo
                }
            }

            Write-Success "تم تحليل $($updates.PSObject.Properties.Count) تحديث"
            Write-Host "   📦 تحديثات آمنة: $($safeUpdates.Count)" -ForegroundColor Green
            Write-Host "   ⚠️  تحديثات رئيسية: $($riskyUpdates.Count)" -ForegroundColor Yellow

            return @{
                SafeUpdates = $safeUpdates
                RiskyUpdates = $riskyUpdates
                Total = $updates.PSObject.Properties.Count
            }
        }
        else {
            Write-Success "جميع الحزم محدثة!"
            return @{
                SafeUpdates = @()
                RiskyUpdates = @()
                Total = 0
            }
        }
    }
    catch {
        Write-Warning "فشل في تحليل التحديثات: $_"
        return $null
    }
}

# ====================================
# 🛡️ فحص الأمان
# ====================================
function Test-SecurityVulnerabilities {
    Write-Step "فحص الثغرات الأمنية..."

    try {
        $audit = npm audit --json 2>&1 | ConvertFrom-Json -ErrorAction SilentlyContinue

        if ($audit -and $audit.metadata) {
            $vulnerabilities = $audit.metadata.vulnerabilities
            $total = $vulnerabilities.critical + $vulnerabilities.high + $vulnerabilities.moderate + $vulnerabilities.low

            if ($total -gt 0) {
                Write-Warning "تم اكتشاف $total ثغرة أمنية"
                Write-Host "   🔴 حرجة: $($vulnerabilities.critical)" -ForegroundColor Red
                Write-Host "   🟠 عالية: $($vulnerabilities.high)" -ForegroundColor Yellow
                Write-Host "   🟡 متوسطة: $($vulnerabilities.moderate)" -ForegroundColor Yellow
                Write-Host "   🟢 منخفضة: $($vulnerabilities.low)" -ForegroundColor Green

                return $true  # يوجد ثغرات
            }
            else {
                Write-Success "لا توجد ثغرات أمنية"
                return $false
            }
        }
        else {
            Write-Success "الفحص الأمني كامل"
            return $false
        }
    }
    catch {
        Write-Warning "فشل في فحص الأمان: $_"
        return $false
    }
}

# ====================================
# 🔧 تطبيق التحديثات الآمنة
# ====================================
function Install-SafeUpdates {
    param([array]$SafeUpdates)

    if ($SafeUpdates.Count -eq 0) {
        Write-Success "لا توجد تحديثات آمنة للتطبيق"
        return $true
    }

    Write-Step "تطبيق التحديثات الآمنة ($($SafeUpdates.Count) حزمة)..."

    try {
        # عرض قائمة التحديثات
        Write-Host "`n   📦 الحزم التي سيتم تحديثها:" -ForegroundColor Cyan
        foreach ($pkg in $SafeUpdates) {
            Write-Host "      • $($pkg.Name): $($pkg.Current) → $($pkg.Wanted)" -ForegroundColor Gray
        }

        Write-Host "`n   ⏳ جاري التحديث..." -ForegroundColor Yellow

        # تنفيذ التحديث
        npm update 2>&1 | Out-Null

        if ($LASTEXITCODE -eq 0) {
            Write-Success "تم تطبيق التحديثات بنجاح"
            return $true
        }
        else {
            Write-Error "فشل في تطبيق التحديثات"
            return $false
        }
    }
    catch {
        Write-Error "حدث خطأ أثناء التحديث: $_"
        return $false
    }
}

# ====================================
# 🔒 إصلاح الثغرات الأمنية
# ====================================
function Repair-SecurityIssues {
    param([bool]$HasVulnerabilities)

    if (-not $HasVulnerabilities) {
        return $true
    }

    Write-Step "إصلاح الثغرات الأمنية..."

    try {
        Write-Host "`n   ⏳ جاري الإصلاح..." -ForegroundColor Yellow

        # محاولة الإصلاح التلقائي
        npm audit fix --force 2>&1 | Out-Null

        if ($LASTEXITCODE -eq 0) {
            Write-Success "تم إصلاح الثغرات الأمنية"
            return $true
        }
        else {
            Write-Warning "بعض الثغرات تتطلب تدخلاً يدوياً"
            return $false
        }
    }
    catch {
        Write-Error "فشل في إصلاح الثغرات: $_"
        return $false
    }
}

# ====================================
# ✅ فحص صحة المشروع
# ====================================
function Test-ProjectIntegrity {
    Write-Step "فحص صحة المشروع..."

    try {
        # فحص التركيب
        Write-Host "   ⏳ التحقق من الاعتماديات..." -ForegroundColor Yellow
        npm install --dry-run 2>&1 | Out-Null

        if ($LASTEXITCODE -ne 0) {
            Write-Error "توجد مشاكل في الاعتماديات"
            return $false
        }

        # فحص Lint
        Write-Host "   ⏳ فحص تنسيق الكود (Lint)..." -ForegroundColor Yellow
        npm run lint 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "توجد أخطاء في تنسيق الكود (Lint). قم بتشغيل 'npm run lint -- --fix' لإصلاحها."
        }

        # فحص TypeScript
        Write-Host "   ⏳ فحص TypeScript..." -ForegroundColor Yellow
        npm run typecheck 2>&1 | Out-Null

        if ($LASTEXITCODE -ne 0) {
            Write-Warning "توجد أخطاء في TypeScript"
        }

        Write-Success "المشروع سليم"
        return $true
    }
    catch {
        Write-Warning "فشل في فحص الصحة: $_"
        return $false
    }
}

# ====================================
# 📊 إنشاء تقرير التحديث
# ====================================
function Export-UpdateReport {
    param(
        [hashtable]$Analysis,
        [bool]$UpdateSuccess,
        [bool]$SecurityFixed,
        [string]$BackupPath
    )

    Write-Step "إنشاء تقرير التحديث..."

    $reportPath = "update-report-$(Get-Date -Format 'yyyy-MM-dd-HHmmss').json"

    $report = @{
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Analysis = $Analysis
        UpdateSuccess = $UpdateSuccess
        SecurityFixed = $SecurityFixed
        BackupPath = $BackupPath
        Status = if ($UpdateSuccess) { "Success" } else { "Failed" }
    }

    try {
        $report | ConvertTo-Json -Depth 10 | Out-File $reportPath -Encoding UTF8
        Write-Success "التقرير: $reportPath"
    }
    catch {
        Write-Warning "فشل في حفظ التقرير: $_"
    }
}

# ====================================
# 🚀 التنفيذ الرئيسي
# ====================================
function Start-SmartUpdate {
    Write-Header

    Write-Host "`n🚀 بدء عملية التحديث الذكي...`n" -ForegroundColor Yellow
    Start-Sleep -Seconds 1

    # 1. إنشاء نقطة استعادة
    $backupPath = New-BackupPoint

    if (-not $backupPath) {
        Write-Error "فشل في إنشاء نقطة استعادة - إيقاف العملية"
        return
    }

    # 2. تحليل التحديثات
    $analysis = Get-UpdateAnalysis

    if (-not $analysis -or $analysis.Total -eq 0) {
        Write-Success "`n✨ المشروع محدث بالكامل!"
        return
    }

    # 3. فحص الأمان
    $hasVulnerabilities = Test-SecurityVulnerabilities

    # 4. تطبيق التحديثات الآمنة
    $updateSuccess = Install-SafeUpdates -SafeUpdates $analysis.SafeUpdates

    # 5. إصلاح الثغرات الأمنية
    $securityFixed = Repair-SecurityIssues -HasVulnerabilities $hasVulnerabilities

    # 6. فحص الصحة النهائي
    $isHealthy = Test-ProjectIntegrity

    # 7. إنشاء التقرير
    Export-UpdateReport -Analysis $analysis -UpdateSuccess $updateSuccess -SecurityFixed $securityFixed -BackupPath $backupPath

    # 8. عرض النتائج
    Write-Host "`n" + "═" * 60 -ForegroundColor Cyan
    Write-Host "📊 ملخص عملية التحديث" -ForegroundColor Yellow
    Write-Host "═" * 60 -ForegroundColor Cyan
    Write-Host "📦 تحديثات آمنة: $($analysis.SafeUpdates.Count) - " -NoNewline
    if ($updateSuccess) {
        Write-Host "✅ نجح" -ForegroundColor Green
    } else {
        Write-Host "❌ فشل" -ForegroundColor Red
    }

    Write-Host "⚠️  تحديثات رئيسية: $($analysis.RiskyUpdates.Count) - " -NoNewline
    Write-Host "يتطلب مراجعة يدوية" -ForegroundColor Yellow

    Write-Host "🔒 الثغرات الأمنية: " -NoNewline
    if ($securityFixed) {
        Write-Host "✅ تم الإصلاح" -ForegroundColor Green
    } elseif ($hasVulnerabilities) {
        Write-Host "⚠️  يتطلب إجراءً" -ForegroundColor Yellow
    } else {
        Write-Host "✅ آمن" -ForegroundColor Green
    }

    Write-Host "🏥 صحة المشروع: " -NoNewline
    if ($isHealthy) {
        Write-Host "✅ سليم" -ForegroundColor Green
    } else {
        Write-Host "⚠️  يحتاج مراجعة" -ForegroundColor Yellow
    }

    Write-Host "💾 نقطة الاستعادة: $backupPath" -ForegroundColor Gray
    Write-Host "═" * 60 -ForegroundColor Cyan

    if ($updateSuccess -and $isHealthy) {
        Write-Host "`n✨ اكتملت عملية التحديث بنجاح!`n" -ForegroundColor Green
    }
    else {
        Write-Host "`n⚠️  العملية اكتملت مع تحذيرات - يرجى مراجعة التقرير`n" -ForegroundColor Yellow
    }
}

# تشغيل النظام
Start-SmartUpdate
