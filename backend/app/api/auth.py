from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
from typing import Optional
import jwt
from ..schemas.user import UserCreate, UserLogin, UserResponse, Token
from ..core.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])
security = HTTPBearer()

# Mock user database (in production, use real database)
mock_users_db = {
    "admin@blog.com": {
        "id": 1,
        "username": "admin",
        "email": "admin@blog.com",
        "password": "admin123",  # In production, use hashed passwords
        "first_name": "Admin",
        "last_name": "User",
        "role": "admin",
        "is_active": True,
        "is_verified": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
}

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return email
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(email: str = Depends(verify_token)):
    user = mock_users_db.get(email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate):
    """Register a new user"""
    if user.email in mock_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    new_user = {
        "id": len(mock_users_db) + 1,
        "username": user.username,
        "email": user.email,
        "password": user.password,  # In production, hash this
        "first_name": user.first_name,
        "last_name": user.last_name,
        "bio": user.bio,
        "role": "user",
        "is_active": True,
        "is_verified": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    mock_users_db[user.email] = new_user
    
    # Return user without password
    user_response = new_user.copy()
    del user_response["password"]
    return user_response

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin):
    """Login user and return access token"""
    user = mock_users_db.get(user_credentials.email)
    
    if not user or user["password"] != user_credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user["is_active"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current user information"""
    user_response = current_user.copy()
    del user_response["password"]
    return user_response

@router.post("/logout")
async def logout():
    """Logout user (in production, you might want to blacklist the token)"""
    return {"message": "Successfully logged out"}

@router.post("/refresh", response_model=Token)
async def refresh_token(current_user: dict = Depends(get_current_user)):
    """Refresh access token"""
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": current_user["email"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
