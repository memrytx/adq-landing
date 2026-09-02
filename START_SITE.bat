@echo off
setlocal

cd /d "%~dp0"
title AQDesign local site

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo Node.js and npm were not found.
  echo Install Node.js from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing project dependencies...
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo Starting AQDesign at http://127.0.0.1:5173/adq-landing/
echo The browser will open automatically when the server is ready.
echo Press Ctrl+C in this window to stop the server.
echo.

start "" /b powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$url='http://127.0.0.1:5173/adq-landing/'; for ($i=0; $i -lt 75; $i++) { try { $response=Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 1; if ($response.StatusCode -eq 200) { Start-Process $url; exit 0 } } catch {}; Start-Sleep -Milliseconds 400 }; Write-Host 'The browser could not be opened automatically. Open http://127.0.0.1:5173/adq-landing/ manually.'"

call npm.cmd run dev -- --host 127.0.0.1 --strictPort

if errorlevel 1 (
  echo.
  echo The development server stopped with an error.
  pause
)

endlocal
