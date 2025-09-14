#!/bin/bash

# Professional Blog Startup Script
echo "🚀 Starting Professional Blog Application..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Check if MySQL is running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "⚠️  MySQL is not running. Please start MySQL service."
    echo "   On macOS: brew services start mysql"
    echo "   On Ubuntu: sudo systemctl start mysql"
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

# Install Node.js dependencies
echo "📥 Installing Node.js dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from template..."
    cp env.example .env
    echo "📝 Please edit .env file with your configuration before running the application."
fi

# Create uploads directory
mkdir -p uploads/images uploads/videos uploads/audio

echo "✅ Setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your database and API keys"
echo "2. Start MySQL and create database: blog_db"
echo "3. Run: ./start-backend.sh (in one terminal)"
echo "4. Run: ./start-frontend.sh (in another terminal)"
echo ""
echo "🌐 Application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/api/docs"
