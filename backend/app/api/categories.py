from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from ..schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse
from ..api.auth import get_current_user

router = APIRouter(prefix="/categories", tags=["Categories"])

# Mock categories database
mock_categories_db = [
    {
        "id": 1,
        "name": "التكنولوجيا",
        "slug": "technology",
        "description": "مقالات حول التكنولوجيا والبرمجة",
        "color": "#3b82f6",
        "icon": "fas fa-laptop-code",
        "parent_id": None,
        "is_active": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": 2,
        "name": "الذكاء الاصطناعي",
        "slug": "artificial-intelligence",
        "description": "مقالات حول الذكاء الاصطناعي والتعلم الآلي",
        "color": "#8b5cf6",
        "icon": "fas fa-robot",
        "parent_id": None,
        "is_active": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": 3,
        "name": "التطوير",
        "slug": "development",
        "description": "مقالات حول تطوير البرمجيات",
        "color": "#10b981",
        "icon": "fas fa-code",
        "parent_id": None,
        "is_active": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": 4,
        "name": "التصميم",
        "slug": "design",
        "description": "مقالات حول التصميم والواجهات",
        "color": "#f59e0b",
        "icon": "fas fa-palette",
        "parent_id": None,
        "is_active": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": 5,
        "name": "الأعمال",
        "slug": "business",
        "description": "مقالات حول ريادة الأعمال والأعمال",
        "color": "#ef4444",
        "icon": "fas fa-briefcase",
        "parent_id": None,
        "is_active": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
]

@router.get("/", response_model=List[CategoryResponse])
async def get_categories():
    """Get all active categories"""
    return [cat for cat in mock_categories_db if cat["is_active"]]

@router.get("/{category_id}", response_model=CategoryResponse)
async def get_category(category_id: int):
    """Get a specific category by ID"""
    category = next((cat for cat in mock_categories_db if cat["id"] == category_id), None)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.get("/slug/{slug}", response_model=CategoryResponse)
async def get_category_by_slug(slug: str):
    """Get a specific category by slug"""
    category = next((cat for cat in mock_categories_db if cat["slug"] == slug), None)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.post("/", response_model=CategoryResponse)
async def create_category(category: CategoryCreate, current_user: dict = Depends(get_current_user)):
    """Create a new category (Admin only)"""
    if current_user["role"] not in ["admin", "editor"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Generate slug from name
    slug = category.name.lower().replace(" ", "-").replace("أ", "a").replace("ب", "b")
    
    new_category = {
        "id": len(mock_categories_db) + 1,
        "name": category.name,
        "slug": slug,
        "description": category.description,
        "color": category.color,
        "icon": category.icon,
        "parent_id": category.parent_id,
        "is_active": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    mock_categories_db.append(new_category)
    return new_category

@router.put("/{category_id}", response_model=CategoryResponse)
async def update_category(
    category_id: int, 
    category_update: CategoryUpdate, 
    current_user: dict = Depends(get_current_user)
):
    """Update an existing category (Admin only)"""
    if current_user["role"] not in ["admin", "editor"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    category = next((cat for cat in mock_categories_db if cat["id"] == category_id), None)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Update fields
    update_data = category_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field in category:
            category[field] = value
    
    category["updated_at"] = datetime.now()
    
    # Update slug if name changed
    if "name" in update_data:
        category["slug"] = category["name"].lower().replace(" ", "-").replace("أ", "a").replace("ب", "b")
    
    return category

@router.delete("/{category_id}")
async def delete_category(category_id: int, current_user: dict = Depends(get_current_user)):
    """Delete a category (Admin only)"""
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    category = next((cat for cat in mock_categories_db if cat["id"] == category_id), None)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Check if category has posts (in real app, check database)
    # For now, just deactivate instead of delete
    category["is_active"] = False
    category["updated_at"] = datetime.now()
    
    return {"message": "Category deactivated successfully"}

@router.get("/{category_id}/posts")
async def get_category_posts(category_id: int):
    """Get all posts in a specific category"""
    from .posts import mock_posts_db
    
    category = next((cat for cat in mock_categories_db if cat["id"] == category_id), None)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    posts = [post for post in mock_posts_db if post["category_id"] == category_id and post["status"] == "published"]
    return posts
