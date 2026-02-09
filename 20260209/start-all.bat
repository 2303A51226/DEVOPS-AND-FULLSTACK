@echo off
REM Start Backend Server
start "Finance Tracker - Backend" cmd /k "cd backend && npm start"

REM Start Frontend Server
start "Finance Tracker - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo =========================================
echo Personal Finance Tracker - Starting...
echo =========================================
echo.
echo Backend will start at:  http://localhost:5000
echo Frontend will start at: http://localhost:3000
echo.
echo Close these windows to stop the servers.
echo =========================================
