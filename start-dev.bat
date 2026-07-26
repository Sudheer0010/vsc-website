@echo off
title VSC Capital Development
echo ==============================================
echo Starting VSC Capital Local Development Server...
echo ==============================================

echo [1/3] Verifying and installing dependencies...
call npm install

echo [2/3] Starting dev server in background...
start /b npm run dev

echo [3/3] Waiting for server to initialize at http://localhost:3000...
:poll
powershell -Command "try { $req = [System.Net.WebRequest]::Create('http://localhost:3000'); $resp = $req.GetResponse(); $resp.Close(); exit 0 } catch { exit 1 }" > nul 2>&1
if %errorlevel% neq 0 (
    timeout /t 1 /nobreak > nul
    goto poll
)

echo.
echo Server is active. Opening default web browser...
start http://localhost:3000
echo ==============================================
echo Dev environment is ready. Close this window to stop.
echo ==============================================
