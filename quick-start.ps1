#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Quick Start Script for NexusAI Platform
.DESCRIPTION
    سكربت البدء السريع - يبدأ المشروع بخطوة واحدة
.NOTES
    Version: 1.0.0
#>

$ErrorActionPreference = "Stop"

Write-Host @"
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║           🚀 NexusAI Platform - Quick Start 🚀            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

Write-Host "`n⚡ Starting NexusAI Platform...`n" -ForegroundColor Yellow

# التحقق من node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
    npm install

    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n❌ Failed to install dependencies!" -ForegroundColor Red
        exit 1
    }

    Write-Host "✅ Dependencies installed!`n" -ForegroundColor Green
}
else {
    Write-Host "✅ Dependencies already installed`n" -ForegroundColor Green
}

# التحقق من .env.local
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  Warning: .env.local not found" -ForegroundColor Yellow
    Write-Host "   Creating from .env.example...`n" -ForegroundColor Gray

    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env.local"
        Write-Host "✅ Created .env.local - Please add your API keys!`n" -ForegroundColor Green
    }
}

# بدء خادم التطوير
Write-Host "🔥 Starting development server..." -ForegroundColor Green
Write-Host "   Opening: " -NoNewline -ForegroundColor Gray
Write-Host "http://localhost:3000`n" -ForegroundColor Cyan

npm run dev
