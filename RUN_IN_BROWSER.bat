@echo off
title MarketingHub Online Platform - Browser Launcher
echo ============================================================
echo   MarketingHub Online Platform - Local Browser Launcher
echo ============================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
  echo [ERROR] Node.js is not installed on this computer!
  echo Please download and install Node.js LTS from: https://nodejs.org
  echo Then double-click this file again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo [1/2] Installing required packages (first time only)...
  call npm install --legacy-peer-deps
  if %errorlevel% neq 0 (
    echo [ERROR] Package installation failed. Check your internet connection.
    pause
    exit /b 1
  )
)

echo [2/2] Starting server at http://localhost:3000 ...
start "" http://localhost:3000
call npm run dev
pause
