from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CommentBase(BaseModel):
    content: str
    post_id: int
    parent_id: Optional[int] = None

class CommentCreate(CommentBase):
    pass

class CommentUpdate(BaseModel):
    content: Optional[str] = None

class CommentResponse(CommentBase):
    id: int
    user_id: Optional[int] = None
    is_approved: bool = False
    is_ai_generated: bool = False
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
