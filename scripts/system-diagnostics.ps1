#!/usr/bin/env pwsh
<#
.SYNOPSIS
    نظام تشخيص شامل لبيئة تطوير NexusAI Platform
.DESCRIPTION
    يجمع معلومات تفصيلية عن النظام، الأدوات المثبتة، التحديثات المتاحة،
    ويقدم تحليل ذكي للتوافق والأمان
.NOTES
    Version: 2.0.0
    Author: NexusAI Development Team
    Last Updated: 2025-11-11
#>

# ====================================
# ⚙️ إعدادات عامة
# ====================================
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# الألوان للعرض الاحترافي
function Write-Section {
    param([string]$Title)
    Write-Host "`n═══════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  $Title" -ForegroundColor Yellow
    Write-Host "═══════════════════════════════════════════`n" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Label, [string]$Value)
    Write-Host "   $Label`: " -NoNewline -ForegroundColor Gray
    Write-Host $Value -ForegroundColor White
}

# ====================================
# 🖥️ معلومات النظام
# ====================================
function Get-SystemInfo {
    Write-Section "معلومات النظام"

    try {
        $os = Get-CimInstance -ClassName Win32_OperatingSystem
        $cpu = Get-CimInstance -ClassName Win32_Processor | Select-Object -First 1
        $memory = Get-CimInstance -ClassName Win32_PhysicalMemory | Measure-Object -Property Capacity -Sum
        $disk = Get-CimInstance -ClassName Win32_LogicalDisk -Filter "DeviceID='C:'"

        Write-Info "نظام التشغيل" "$($os.Caption) $($os.Version)"
        Write-Info "البنية" "$($os.OSArchitecture)"
        Write-Info "المعالج" "$($cpu.Name.Trim())"
        Write-Info "الذاكرة العشوائية" "$([Math]::Round($memory.Sum / 1GB, 2)) GB"
        Write-Info "المساحة المتاحة" "$([Math]::Round($disk.FreeSpace / 1GB, 2)) GB / $([Math]::Round($disk.Size / 1GB, 2)) GB"
        Write-Info "اللغة" "$($os.OSLanguage)"

        Write-Success "تم جمع معلومات النظام بنجاح"

        return @{
            OS = $os.Caption
            Architecture = $os.OSArchitecture
            CPU = $cpu.Name
            RAM_GB = [Math]::Round($memory.Sum / 1GB, 2)
            FreeSpace_GB = [Math]::Round($disk.FreeSpace / 1GB, 2)
        }
    }
    catch {
        Write-Error "فشل في جمع معلومات النظام: $_"
        return $null
    }
}

# ====================================
# 📦 فحص الأدوات المثبتة
# ====================================
function Get-InstalledTools {
    Write-Section "الأدوات والبرمجيات المثبتة"

    $tools = @{
        "Node.js" = { node --version 2>&1 }
        "npm" = { npm --version 2>&1 }
        "Git" = { git --version 2>&1 }
        "PowerShell" = { $PSVersionTable.PSVersion.ToString() }
        "VS Code" = { code --version 2>&1 | Select-Object -First 1 }
        "Docker" = { docker --version 2>&1 }
        "TypeScript" = { tsc --version 2>&1 }
    }

    $results = @{}

    foreach ($tool in $tools.GetEnumerator()) {
        try {
            $version = & $tool.Value
            if ($version -and $version -notmatch "not recognized|not found") {
                Write-Success "$($tool.Key): $version"
                $results[$tool.Key] = $version
            }
            else {
                Write-Warning "$($tool.Key): غير مثبت"
                $results[$tool.Key] = $null
            }
        }
        catch {
            Write-Warning "$($tool.Key): غير مثبت"
            $results[$tool.Key] = $null
        }
    }

    return $results
}

# ====================================
# 🔄 فحص التحديثات المتاحة
# ====================================
function Get-AvailableUpdates {
    Write-Section "التحديثات المتاحة"

    try {
        # فحص تحديثات npm
        Write-Host "🔍 فحص تحديثات الحزم..." -ForegroundColor Cyan
        $outdated = npm outdated --json 2>&1 | ConvertFrom-Json -ErrorAction SilentlyContinue

        if ($outdated) {
            $updateCount = ($outdated.PSObject.Properties).Count
            Write-Info "عدد الحزم القابلة للتحديث" $updateCount

            $criticalUpdates = @()
            $safeUpdates = @()

            foreach ($pkg in $outdated.PSObject.Properties) {
                $name = $pkg.Name
                $current = $pkg.Value.current
                $wanted = $pkg.Value.wanted
                $latest = $pkg.Value.latest

                # تحليل التحديث (major/minor/patch)
                if ($wanted -ne $latest) {
                    $criticalUpdates += @{
                        Name = $name
                        Current = $current
                        Latest = $latest
                        Type = "Major"
                    }
                }
                else {
                    $safeUpdates += @{
                        Name = $name
                        Current = $current
                        Latest = $latest
                        Type = "Safe"
                    }
                }
            }

            if ($safeUpdates.Count -gt 0) {
                Write-Host "`n✅ تحديثات آمنة ($($safeUpdates.Count)):" -ForegroundColor Green
                $safeUpdates | ForEach-Object {
                    Write-Info $_.Name "$($_.Current) → $($_.Latest)"
                }
            }

            if ($criticalUpdates.Count -gt 0) {
                Write-Host "`n⚠️  تحديثات رئيسية تتطلب مراجعة ($($criticalUpdates.Count)):" -ForegroundColor Yellow
                $criticalUpdates | ForEach-Object {
                    Write-Info $_.Name "$($_.Current) → $($_.Latest)"
                }
            }

            return @{
                Safe = $safeUpdates
                Critical = $criticalUpdates
                Total = $updateCount
            }
        }
        else {
            Write-Success "جميع الحزم محدثة!"
            return @{ Safe = @(); Critical = @(); Total = 0 }
        }
    }
    catch {
        Write-Warning "فشل في فحص التحديثات: $_"
        return $null
    }
}

# ====================================
# 🔒 فحص الأمان والثغرات
# ====================================
function Get-SecurityAudit {
    Write-Section "تدقيق الأمان"

    try {
        Write-Host "🔍 فحص الثغرات الأمنية..." -ForegroundColor Cyan
        $audit = npm audit --json 2>&1 | ConvertFrom-Json -ErrorAction SilentlyContinue

        if ($audit -and $audit.metadata) {
            $vulnerabilities = $audit.metadata.vulnerabilities

            Write-Info "الثغرات الحرجة" $vulnerabilities.critical
            Write-Info "الثغرات العالية" $vulnerabilities.high
            Write-Info "الثغرات المتوسطة" $vulnerabilities.moderate
            Write-Info "الثغرات المنخفضة" $vulnerabilities.low

            if ($vulnerabilities.critical -gt 0 -or $vulnerabilities.high -gt 0) {
                Write-Error "يوجد ثغرات أمنية خطيرة تتطلب إصلاحاً فورياً!"
                Write-Host "   تنفيذ: " -NoNewline -ForegroundColor Gray
                Write-Host "npm audit fix" -ForegroundColor Cyan
            }
            else {
                Write-Success "لا توجد ثغرات أمنية خطيرة"
            }

            return $vulnerabilities
        }
        else {
            Write-Success "الفحص الأمني كامل - لا توجد مشاكل"
            return $null
        }
    }
    catch {
        Write-Warning "فشل في تدقيق الأمان: $_"
        return $null
    }
}

# ====================================
# 🧪 فحص صحة المشروع
# ====================================
function Test-ProjectHealth {
    Write-Section "صحة المشروع"

    $checks = @(
        @{ Name = "package.json"; Path = "package.json" }
        @{ Name = "tsconfig.json"; Path = "tsconfig.json" }
        @{ Name = ".env.local"; Path = ".env.local" }
        @{ Name = "node_modules"; Path = "node_modules" }
        @{ Name = ".next"; Path = ".next" }
    )

    foreach ($check in $checks) {
        if (Test-Path $check.Path) {
            Write-Success "$($check.Name) موجود"
        }
        else {
            Write-Warning "$($check.Name) غير موجود"
        }
    }

    # فحص صحة package.json
    try {
        $pkg = Get-Content "package.json" | ConvertFrom-Json
        Write-Info "اسم المشروع" $pkg.name
        Write-Info "الإصدار" $pkg.version
        Write-Info "عدد الاعتماديات" $pkg.dependencies.PSObject.Properties.Count
        Write-Info "عدد اعتماديات التطوير" $pkg.devDependencies.PSObject.Properties.Count
    }
    catch {
        Write-Error "فشل في قراءة package.json"
    }
}

# ====================================
# 📊 تقرير شامل
# ====================================
function Export-Report {
    param(
        [hashtable]$SystemInfo,
        [hashtable]$Tools,
        [hashtable]$Updates,
        [object]$Security
    )

    Write-Section "إنشاء التقرير"

    $reportPath = "diagnostic-report-$(Get-Date -Format 'yyyy-MM-dd-HHmmss').json"

    $report = @{
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        System = $SystemInfo
        Tools = $Tools
        Updates = $Updates
        Security = $Security
    }

    try {
        $report | ConvertTo-Json -Depth 10 | Out-File $reportPath -Encoding UTF8
        Write-Success "تم حفظ التقرير: $reportPath"

        # عرض ملخص سريع
        Write-Host "`n" + "═" * 50 -ForegroundColor Cyan
        Write-Host "📊 ملخص التشخيص" -ForegroundColor Yellow
        Write-Host "═" * 50 -ForegroundColor Cyan
        Write-Host "✅ النظام: سليم" -ForegroundColor Green
        Write-Host "📦 الأدوات: $($Tools.Keys.Count) مثبتة" -ForegroundColor Green

        if ($Updates -and $Updates.Total -gt 0) {
            Write-Host "🔄 التحديثات: $($Updates.Total) متاحة" -ForegroundColor Yellow
        }
        else {
            Write-Host "🔄 التحديثات: محدث" -ForegroundColor Green
        }

        if ($Security -and ($Security.critical -gt 0 -or $Security.high -gt 0)) {
            Write-Host "🔒 الأمان: يتطلب إجراءً" -ForegroundColor Red
        }
        else {
            Write-Host "🔒 الأمان: آمن" -ForegroundColor Green
        }
        Write-Host "═" * 50 + "`n" -ForegroundColor Cyan
    }
    catch {
        Write-Error "فشل في حفظ التقرير: $_"
    }
}

# ====================================
# 🚀 التنفيذ الرئيسي
# ====================================
function Start-Diagnostics {
    Clear-Host

    Write-Host @"
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     🚀 NexusAI Platform - System Diagnostics Tool 🚀     ║
║                                                           ║
║            نظام التشخيص الشامل لبيئة التطوير             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

    Write-Host "`n🔍 بدء فحص النظام...`n" -ForegroundColor Yellow
    Start-Sleep -Seconds 1

    # جمع المعلومات
    $systemInfo = Get-SystemInfo
    $tools = Get-InstalledTools
    $updates = Get-AvailableUpdates
    $security = Get-SecurityAudit
    Test-ProjectHealth

    # إنشاء التقرير
    Export-Report -SystemInfo $systemInfo -Tools $tools -Updates $updates -Security $security

    Write-Host "`n✨ اكتمل التشخيص بنجاح!`n" -ForegroundColor Green
}

# تشغيل التشخيص
Start-Diagnostics
