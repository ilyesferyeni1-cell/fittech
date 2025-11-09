@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Starting FIT_Tech Project
echo ========================================
echo.

REM Get the directory where the batch file is located
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

echo Checking dependencies...
echo.

REM Check if backend node_modules exists
if not exist "backend\node_modules" (
    echo Backend dependencies not found. Installing...
    cd backend
    call npm install
    cd ..
    echo.
)

REM Check if frontend node_modules exists
if not exist "frontend\saudi-league-tracker\node_modules" (
    echo Frontend dependencies not found. Installing...
    cd frontend\saudi-league-tracker
    call npm install
    cd ..\..
    echo.
)

echo ========================================
echo Starting Servers...
echo ========================================
echo.
echo Starting Backend Server (Port 3000)...
echo Starting Frontend Server (Port 4200)...
echo.

REM Start backend server in a new window
start "Backend Server - Port 3000" cmd /k "cd /d "%SCRIPT_DIR%backend" && npm start"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server in a new window
start "Frontend Server - Port 4200" cmd /k "cd /d "%SCRIPT_DIR%frontend\saudi-league-tracker" && npm start"

echo.
echo ========================================
echo Both servers are starting in separate windows...
echo.
echo Backend API:  http://localhost:3000
echo Frontend App: http://localhost:4200
echo.
echo Note: Close the server windows to stop the servers.
echo ========================================
echo.
echo Press any key to close this window (servers will continue running)...
pause >nul

