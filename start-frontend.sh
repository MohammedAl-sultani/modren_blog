#!/bin/bash

# Frontend Startup Script
echo "🚀 Starting Professional Blog Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📥 Installing Node.js dependencies..."
    npm install
fi

# Start the React development server
echo "🔧 Starting React development server..."
echo "📍 Frontend will be available at: http://localhost:3000"
echo "🔄 Hot reload is enabled for development"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
