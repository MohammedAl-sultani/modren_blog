#!/usr/bin/env python3
"""
Run script for the Professional Blog Backend
"""
import uvicorn
import os
from dotenv import load_dotenv
from app.core.config import settings

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    print(f"🚀 Starting Professional Blog API...")
    print(f"📍 Host: {settings.HOST}")
    print(f"🔌 Port: {settings.PORT}")
    print(f"🔄 Debug Mode: {settings.DEBUG}")
    print(f"📚 API Docs: http://{settings.HOST}:{settings.PORT}/api/docs")
    print(f"🌐 API URL: http://{settings.HOST}:{settings.PORT}")
    print(f"🤖 AI Features: {'Enabled' if settings.ENABLE_AI_FEATURES else 'Disabled'}")
    print("=" * 50)
    
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )
