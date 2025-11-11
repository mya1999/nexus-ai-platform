#!/usr/bin/env pwsh
# ═══════════════════════════════════════════════════════════
# 🚀 NexusAI - Auto Start Script
# ═══════════════════════════════════════════════════════════
# سكريبت التشغيل السريع للمشروع
# ═══════════════════════════════════════════════════════════

Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🚀 NexusAI Platform - Auto Start" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# التحقق من Node.js
Write-Host "🔍 Checking Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found! Please install Node.js" -ForegroundColor Red
    exit 1
}

# التحقق من npm
Write-Host "🔍 Checking npm..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "✅ npm: v$npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "───────────────────────────────────────────────────────────" -ForegroundColor Cyan

# التحقق من الحزم
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed!" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "───────────────────────────────────────────────────────────" -ForegroundColor Cyan

# التحقق من .env
if (!(Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local not found!" -ForegroundColor Yellow
    Write-Host "📝 Please configure your API keys in .env.local" -ForegroundColor Yellow
} else {
    Write-Host "✅ Environment variables configured" -ForegroundColor Green
}

Write-Host ""
Write-Host "───────────────────────────────────────────────────────────" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Starting Development Server..." -ForegroundColor Green
Write-Host ""
Write-Host "📍 Server will be available at:" -ForegroundColor Cyan
Write-Host "   • Local:   http://localhost:3000" -ForegroundColor White
Write-Host "   • Network: http://0.0.0.0:3000" -ForegroundColor White
Write-Host ""
Write-Host "💡 Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# تشغيل السيرفر
npm run dev
