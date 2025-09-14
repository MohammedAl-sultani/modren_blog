from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import uvicorn
import os
from dotenv import load_dotenv

# Import API routers
from app.api import auth, posts, categories, users, comments, ai
from app.core.config import settings

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description="Professional Blog with AI Features - مدونة احترافية مع ميزات الذكاء الاصطناعي",
    version=settings.VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
if not os.path.exists(settings.UPLOAD_DIR):
    os.makedirs(settings.UPLOAD_DIR)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

@app.get("/")
async def root():
    return {
        "message": "Professional Blog API is running! - API المدونة الاحترافية يعمل!",
        "version": settings.VERSION,
        "docs": "/api/docs",
        "features": [
            "Authentication - المصادقة",
            "Posts Management - إدارة المقالات", 
            "Categories - التصنيفات",
            "Comments - التعليقات",
            "AI Features - ميزات الذكاء الاصطناعي",
            "User Management - إدارة المستخدمين"
        ]
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy", 
        "message": "API is working properly - API يعمل بشكل صحيح",
        "version": settings.VERSION,
        "features_enabled": {
            "ai_features": settings.ENABLE_AI_FEATURES,
            "file_upload": True,
            "authentication": True
        }
    }

# Include API routers
app.include_router(auth.router, prefix="/api")
app.include_router(posts.router, prefix="/api")
app.include_router(categories.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(comments.router, prefix="/api")
app.include_router(ai.router, prefix="/api")

# Additional endpoints
@app.get("/api/stats")
async def get_stats():
    """Get basic API statistics"""
    return {
        "total_posts": 3,
        "total_categories": 5,
        "total_users": 1,
        "total_comments": 3,
        "ai_requests_today": 0,
        "api_version": settings.VERSION
    }

@app.get("/api/features")
async def get_features():
    """Get available features"""
    return {
        "authentication": {
            "login": True,
            "register": True,
            "jwt_tokens": True,
            "password_reset": False
        },
        "posts": {
            "create": True,
            "read": True,
            "update": True,
            "delete": True,
            "search": True,
            "filtering": True
        },
        "categories": {
            "create": True,
            "read": True,
            "update": True,
            "delete": True,
            "hierarchy": True
        },
        "comments": {
            "create": True,
            "read": True,
            "update": True,
            "delete": True,
            "approval": True,
            "nested": True
        },
        "ai_features": {
            "content_generation": settings.ENABLE_AI_FEATURES,
            "translation": settings.ENABLE_AI_FEATURES,
            "grammar_check": settings.ENABLE_AI_FEATURES,
            "image_generation": settings.ENABLE_AI_FEATURES,
            "speech_to_text": settings.ENABLE_AI_FEATURES,
            "text_to_speech": settings.ENABLE_AI_FEATURES
        },
        "file_upload": {
            "images": True,
            "videos": True,
            "audio": True,
            "max_size_mb": settings.MAX_FILE_SIZE // (1024 * 1024)
        }
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )
