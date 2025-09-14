#!/bin/bash

# Backend Startup Script
echo "🚀 Starting Professional Blog Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run ./start.sh first."
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create it from env.example"
    exit 1
fi

# Navigate to backend directory
cd backend

# Start the FastAPI server
echo "🔧 Starting FastAPI server..."
echo "📍 Backend will be available at: http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/api/docs"
echo "🔄 Auto-reload is enabled for development"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python run.py
