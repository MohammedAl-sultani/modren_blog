from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from datetime import datetime
from ..schemas.post import PostCreate, PostUpdate, PostResponse, PostListResponse
from ..api.auth import get_current_user

router = APIRouter(prefix="/posts", tags=["Posts"])

# Mock posts database
mock_posts_db = [
    {
        "id": 1,
        "title": "مقدمة في الذكاء الاصطناعي وتطبيقاته",
        "slug": "introduction-to-artificial-intelligence",
        "content": "الذكاء الاصطناعي (AI) هو أحد أكثر المجالات تطوراً في عصرنا الحالي...",
        "excerpt": "استكشف عالم الذكاء الاصطناعي وتعلم كيف يغير حياتنا اليومية",
        "status": "published",
        "post_type": "text",
        "author_id": 1,
        "category_id": 1,
        "tags": ["ذكاء اصطناعي", "تكنولوجيا", "تعلم آلي"],
        "featured_image": None,
        "view_count": 1250,
        "like_count": 89,
        "comment_count": 23,
        "share_count": 15,
        "is_featured": True,
        "is_ai_generated": False,
        "meta_description": "مقال شامل عن الذكاء الاصطناعي وتطبيقاته",
        "meta_keywords": "ذكاء اصطناعي، AI، تعلم آلي",
        "published_at": datetime.now(),
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": 2,
        "title": "أفضل ممارسات تطوير تطبيقات الويب",
        "slug": "best-practices-web-development",
        "content": "تطوير تطبيقات الويب يتطلب اتباع أفضل الممارسات...",
        "excerpt": "تعلم أفضل الممارسات والأساليب الحديثة في تطوير تطبيقات الويب",
        "status": "published",
        "post_type": "text",
        "author_id": 1,
        "category_id": 2,
        "tags": ["تطوير", "ويب", "برمجة"],
        "featured_image": None,
        "view_count": 980,
        "like_count": 67,
        "comment_count": 15,
        "share_count": 8,
        "is_featured": False,
        "is_ai_generated": False,
        "meta_description": "دليل شامل لأفضل ممارسات تطوير الويب",
        "meta_keywords": "تطوير ويب، برمجة، أفضل ممارسات",
        "published_at": datetime.now(),
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": 3,
        "title": "تصميم واجهات المستخدم الحديثة",
        "slug": "modern-ui-design",
        "content": "تصميم واجهات المستخدم يتطور باستمرار...",
        "excerpt": "دليل شامل لتصميم واجهات مستخدم جذابة وسهلة الاستخدام",
        "status": "draft",
        "post_type": "text",
        "author_id": 1,
        "category_id": 3,
        "tags": ["تصميم", "UI", "UX"],
        "featured_image": None,
        "view_count": 0,
        "like_count": 0,
        "comment_count": 0,
        "share_count": 0,
        "is_featured": False,
        "is_ai_generated": False,
        "meta_description": "تعلم تصميم واجهات المستخدم الحديثة",
        "meta_keywords": "تصميم، UI، UX، واجهات",
        "published_at": None,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
]

@router.get("/", response_model=List[PostListResponse])
async def get_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    status: Optional[str] = Query(None),
    category_id: Optional[int] = Query(None),
    featured: Optional[bool] = Query(None),
    search: Optional[str] = Query(None)
):
    """Get all posts with optional filtering"""
    posts = mock_posts_db.copy()
    
    # Apply filters
    if status:
        posts = [p for p in posts if p["status"] == status]
    
    if category_id:
        posts = [p for p in posts if p["category_id"] == category_id]
    
    if featured is not None:
        posts = [p for p in posts if p["is_featured"] == featured]
    
    if search:
        search_lower = search.lower()
        posts = [p for p in posts if 
                search_lower in p["title"].lower() or 
                search_lower in p["content"].lower() or
                search_lower in p["excerpt"].lower()]
    
    # Apply pagination
    return posts[skip:skip + limit]

@router.get("/{post_id}", response_model=PostResponse)
async def get_post(post_id: int):
    """Get a specific post by ID"""
    post = next((p for p in mock_posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Increment view count
    post["view_count"] += 1
    
    return post

@router.get("/slug/{slug}", response_model=PostResponse)
async def get_post_by_slug(slug: str):
    """Get a specific post by slug"""
    post = next((p for p in mock_posts_db if p["slug"] == slug), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Increment view count
    post["view_count"] += 1
    
    return post

@router.post("/", response_model=PostResponse)
async def create_post(post: PostCreate, current_user: dict = Depends(get_current_user)):
    """Create a new post"""
    # Generate slug from title
    slug = post.title.lower().replace(" ", "-").replace("أ", "a").replace("ب", "b")
    
    new_post = {
        "id": len(mock_posts_db) + 1,
        "title": post.title,
        "slug": slug,
        "content": post.content,
        "excerpt": post.excerpt,
        "status": "draft",
        "post_type": "text",
        "author_id": current_user["id"],
        "category_id": post.category_id,
        "tags": post.tags or [],
        "featured_image": None,
        "view_count": 0,
        "like_count": 0,
        "comment_count": 0,
        "share_count": 0,
        "is_featured": post.is_featured,
        "is_ai_generated": False,
        "meta_description": post.meta_description,
        "meta_keywords": post.meta_keywords,
        "published_at": None,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    mock_posts_db.append(new_post)
    return new_post

@router.put("/{post_id}", response_model=PostResponse)
async def update_post(
    post_id: int, 
    post_update: PostUpdate, 
    current_user: dict = Depends(get_current_user)
):
    """Update an existing post"""
    post = next((p for p in mock_posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check if user is author or admin
    if post["author_id"] != current_user["id"] and current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Update fields
    update_data = post_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field in post:
            post[field] = value
    
    post["updated_at"] = datetime.now()
    
    # Update slug if title changed
    if "title" in update_data:
        post["slug"] = post["title"].lower().replace(" ", "-").replace("أ", "a").replace("ب", "b")
    
    return post

@router.delete("/{post_id}")
async def delete_post(post_id: int, current_user: dict = Depends(get_current_user)):
    """Delete a post"""
    post = next((p for p in mock_posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check if user is author or admin
    if post["author_id"] != current_user["id"] and current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    mock_posts_db.remove(post)
    return {"message": "Post deleted successfully"}

@router.post("/{post_id}/like")
async def like_post(post_id: int, current_user: dict = Depends(get_current_user)):
    """Like a post"""
    post = next((p for p in mock_posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    post["like_count"] += 1
    return {"message": "Post liked successfully", "like_count": post["like_count"]}

@router.post("/{post_id}/share")
async def share_post(post_id: int, current_user: dict = Depends(get_current_user)):
    """Share a post"""
    post = next((p for p in mock_posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    post["share_count"] += 1
    return {"message": "Post shared successfully", "share_count": post["share_count"]}

@router.get("/featured/", response_model=List[PostListResponse])
async def get_featured_posts(limit: int = Query(5, ge=1, le=20)):
    """Get featured posts"""
    featured_posts = [p for p in mock_posts_db if p["is_featured"] and p["status"] == "published"]
    return featured_posts[:limit]

@router.get("/recent/", response_model=List[PostListResponse])
async def get_recent_posts(limit: int = Query(10, ge=1, le=50)):
    """Get recent published posts"""
    recent_posts = [p for p in mock_posts_db if p["status"] == "published"]
    recent_posts.sort(key=lambda x: x["published_at"], reverse=True)
    return recent_posts[:limit]
