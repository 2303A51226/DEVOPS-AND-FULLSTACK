#!/bin/bash

# Personal Finance Tracker - Multi-Platform Start Script
# This script installs dependencies and runs the backend server

echo "🚀 Personal Finance Tracker - Backend Startup"
echo "=============================================="
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16.x or higher."
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✓ Node.js version: $NODE_VERSION"

# Check npm installation
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✓ npm version: $NPM_VERSION"
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/backend" || exit 1

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✓ Dependencies installed"
else
    echo "✓ Dependencies already installed"
fi

echo ""
echo "=============================================="
echo "🎯 Select an option:"
echo "=============================================="
echo "1) Start development server (npm run dev)"
echo "2) Start production server (npm start)"
echo "3) Run integration tests (npm test)"
echo "4) Run tests with coverage (npm run test:coverage)"
echo "5) Run tests in watch mode (npm run test:watch)"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🔥 Starting development server..."
        npm run dev
        ;;
    2)
        echo ""
        echo "🚀 Starting production server..."
        npm start
        ;;
    3)
        echo ""
        echo "🧪 Running integration tests..."
        npm test
        ;;
    4)
        echo ""
        echo "📊 Running tests with coverage..."
        npm run test:coverage
        ;;
    5)
        echo ""
        echo "👁️  Running tests in watch mode..."
        npm run test:watch
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac
