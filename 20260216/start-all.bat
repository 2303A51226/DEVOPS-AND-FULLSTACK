@echo off
REM Personal Finance Tracker - Multi-Platform Start Script (Windows)
REM This script installs dependencies and runs the backend server

echo.
echo 🚀 Personal Finance Tracker - Backend Startup
echo ==============================================================
echo.

REM Check Node.js installation
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16.x or higher.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%

REM Check npm installation
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✓ npm version: %NPM_VERSION%
echo.

REM Navigate to backend directory
cd /d "%~dp0backend" || goto error

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed
) else (
    echo ✓ Dependencies already installed
)

echo.
echo ==============================================================
echo 🎯 Select an option:
echo ==============================================================
echo 1) Start development server (npm run dev)
echo 2) Start production server (npm start)
echo 3) Run integration tests (npm test)
echo 4) Run tests with coverage (npm run test:coverage)
echo 5) Run tests in watch mode (npm run test:watch)
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo 🔥 Starting development server...
    call npm run dev
) else if "%choice%"=="2" (
    echo.
    echo 🚀 Starting production server...
    call npm start
) else if "%choice%"=="3" (
    echo.
    echo 🧪 Running integration tests...
    call npm test
) else if "%choice%"=="4" (
    echo.
    echo 📊 Running tests with coverage...
    call npm run test:coverage
) else if "%choice%"=="5" (
    echo.
    echo 👁️  Running tests in watch mode...
    call npm run test:watch
) else (
    echo Invalid choice. Exiting.
    exit /b 1
)

goto end

:error
echo ❌ Error: Could not navigate to backend directory
pause
exit /b 1

:end
pause
