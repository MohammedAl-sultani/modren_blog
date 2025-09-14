from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PostBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    category_id: Optional[int] = None
    tags: Optional[List[str]] = []
    meta_description: Optional[str] = None
    meta_keywords: Optional[str] = None
    is_featured: bool = False

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category_id: Optional[int] = None
    tags: Optional[List[str]] = None
    meta_description: Optional[str] = None
    meta_keywords: Optional[str] = None
    is_featured: Optional[bool] = None
    status: Optional[str] = None

class PostResponse(PostBase):
    id: int
    slug: str
    status: str = "draft"
    post_type: str = "text"
    author_id: int
    featured_image: Optional[str] = None
    view_count: int = 0
    like_count: int = 0
    comment_count: int = 0
    share_count: int = 0
    is_ai_generated: bool = False
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PostListResponse(BaseModel):
    id: int
    title: str
    slug: str
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    author_id: int
    category_id: Optional[int] = None
    view_count: int = 0
    like_count: int = 0
    comment_count: int = 0
    is_featured: bool = False
    published_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True
