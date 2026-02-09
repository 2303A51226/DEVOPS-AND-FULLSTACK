#!/bin/bash

# Start Backend Server
echo "Starting Backend Server..."
cd backend
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start Frontend Server
echo "Starting Frontend Server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================="
echo "Personal Finance Tracker - Running"
echo "========================================="
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo "========================================="

# Wait for both processes
wait
