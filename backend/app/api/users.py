from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from ..schemas.user import UserResponse, UserUpdate
from ..api.auth import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserResponse)
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    """Get current user's profile"""
    user_response = current_user.copy()
    del user_response["password"]
    return user_response

@router.put("/me", response_model=UserResponse)
async def update_my_profile(
    user_update: UserUpdate, 
    current_user: dict = Depends(get_current_user)
):
    """Update current user's profile"""
    from ..api.auth import mock_users_db
    
    # Update fields
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field in current_user and value is not None:
            current_user[field] = value
    
    current_user["updated_at"] = datetime.now()
    
    # Update in mock database
    mock_users_db[current_user["email"]] = current_user
    
    user_response = current_user.copy()
    del user_response["password"]
    return user_response

@router.get("/", response_model=List[UserResponse])
async def get_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    role: Optional[str] = Query(None),
    current_user: dict = Depends(get_current_user)
):
    """Get all users (Admin only)"""
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    from ..api.auth import mock_users_db
    
    users = list(mock_users_db.values())
    
    # Apply role filter
    if role:
        users = [user for user in users if user["role"] == role]
    
    # Apply pagination
    users = users[skip:skip + limit]
    
    # Remove passwords from response
    for user in users:
        if "password" in user:
            del user["password"]
    
    return users

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, current_user: dict = Depends(get_current_user)):
    """Get a specific user by ID"""
    if current_user["role"] != "admin" and current_user["id"] != user_id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    from ..api.auth import mock_users_db
    
    user = next((u for u in mock_users_db.values() if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_response = user.copy()
    del user_response["password"]
    return user_response

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int, 
    user_update: UserUpdate, 
    current_user: dict = Depends(get_current_user)
):
    """Update a user (Admin only or own profile)"""
    if current_user["role"] != "admin" and current_user["id"] != user_id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    from ..api.auth import mock_users_db
    
    user = next((u for u in mock_users_db.values() if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update fields
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field in user and value is not None:
            user[field] = value
    
    user["updated_at"] = datetime.now()
    
    # Update in mock database
    mock_users_db[user["email"]] = user
    
    user_response = user.copy()
    del user_response["password"]
    return user_response

@router.delete("/{user_id}")
async def delete_user(user_id: int, current_user: dict = Depends(get_current_user)):
    """Delete a user (Admin only)"""
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    if current_user["id"] == user_id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
    
    from ..api.auth import mock_users_db
    
    user = next((u for u in mock_users_db.values() if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # In production, you might want to soft delete
    del mock_users_db[user["email"]]
    
    return {"message": "User deleted successfully"}

@router.post("/{user_id}/activate")
async def activate_user(user_id: int, current_user: dict = Depends(get_current_user)):
    """Activate a user (Admin only)"""
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    from ..api.auth import mock_users_db
    
    user = next((u for u in mock_users_db.values() if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user["is_active"] = True
    user["updated_at"] = datetime.now()
    
    return {"message": "User activated successfully"}

@router.post("/{user_id}/deactivate")
async def deactivate_user(user_id: int, current_user: dict = Depends(get_current_user)):
    """Deactivate a user (Admin only)"""
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    if current_user["id"] == user_id:
        raise HTTPException(status_code=400, detail="Cannot deactivate your own account")
    
    from ..api.auth import mock_users_db
    
    user = next((u for u in mock_users_db.values() if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user["is_active"] = False
    user["updated_at"] = datetime.now()
    
    return {"message": "User deactivated successfully"}
