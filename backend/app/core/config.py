from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Professional Blog API"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Security
    SECRET_KEY: str = "your-super-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database (Optional - for future use)
    DATABASE_URL: Optional[str] = None
    
    # File Upload
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_IMAGE_TYPES: list = ["jpg", "jpeg", "png", "gif", "webp"]
    ALLOWED_VIDEO_TYPES: list = ["mp4", "avi", "mov", "wmv", "flv"]
    ALLOWED_AUDIO_TYPES: list = ["mp3", "wav", "ogg", "m4a"]
    
    # AI Features (Optional)
    OPENAI_API_KEY: Optional[str] = None
    ENABLE_AI_FEATURES: bool = False
    
    # CORS
    ALLOWED_ORIGINS: list = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8080",
        "http://127.0.0.1:8080"
    ]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create settings instance
settings = Settings()

# Create upload directories
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(f"{settings.UPLOAD_DIR}/images", exist_ok=True)
os.makedirs(f"{settings.UPLOAD_DIR}/videos", exist_ok=True)
os.makedirs(f"{settings.UPLOAD_DIR}/audio", exist_ok=True)
