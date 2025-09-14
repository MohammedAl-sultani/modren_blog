from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from datetime import datetime
from ..schemas.comment import CommentCreate, CommentUpdate, CommentResponse
from ..api.auth import get_current_user

router = APIRouter(prefix="/comments", tags=["Comments"])

# Mock comments database
mock_comments_db = [
    {
        "id": 1,
        "post_id": 1,
        "user_id": 1,
        "parent_id": None,
        "content": "مقال رائع ومفيد جداً! شكراً لك على هذه المعلومات القيمة.",
        "is_approved": True,
        "is_ai_generated": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": 2,
        "post_id": 1,
        "user_id": None,  # Anonymous comment
        "parent_id": None,
        "content": "هل يمكنك كتابة مقال عن تطبيقات الذكاء الاصطناعي في الطب؟",
        "is_approved": True,
        "is_ai_generated": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": 3,
        "post_id": 1,
        "user_id": 1,
        "parent_id": 2,
        "content": "نعم، سأكتب مقالاً عن ذلك قريباً. شكراً على الاقتراح!",
        "is_approved": True,
        "is_ai_generated": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
]

@router.get("/", response_model=List[CommentResponse])
async def get_comments(
    post_id: Optional[int] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    approved_only: bool = Query(True)
):
    """Get comments with optional filtering"""
    comments = mock_comments_db.copy()
    
    # Apply filters
    if post_id:
        comments = [c for c in comments if c["post_id"] == post_id]
    
    if approved_only:
        comments = [c for c in comments if c["is_approved"]]
    
    # Apply pagination
    return comments[skip:skip + limit]

@router.get("/{comment_id}", response_model=CommentResponse)
async def get_comment(comment_id: int):
    """Get a specific comment by ID"""
    comment = next((c for c in mock_comments_db if c["id"] == comment_id), None)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment

@router.post("/", response_model=CommentResponse)
async def create_comment(comment: CommentCreate, current_user: dict = Depends(get_current_user)):
    """Create a new comment"""
    new_comment = {
        "id": len(mock_comments_db) + 1,
        "post_id": comment.post_id,
        "user_id": current_user["id"],
        "parent_id": comment.parent_id,
        "content": comment.content,
        "is_approved": current_user["role"] in ["admin", "editor"],  # Auto-approve for admins/editors
        "is_ai_generated": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    mock_comments_db.append(new_comment)
    
    # Update post comment count
    from .posts import mock_posts_db
    post = next((p for p in mock_posts_db if p["id"] == comment.post_id), None)
    if post:
        post["comment_count"] += 1
    
    return new_comment

@router.put("/{comment_id}", response_model=CommentResponse)
async def update_comment(
    comment_id: int, 
    comment_update: CommentUpdate, 
    current_user: dict = Depends(get_current_user)
):
    """Update a comment"""
    comment = next((c for c in mock_comments_db if c["id"] == comment_id), None)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    # Check if user is comment author or admin
    if comment["user_id"] != current_user["id"] and current_user["role"] not in ["admin", "editor"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Update fields
    update_data = comment_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field in comment:
            comment[field] = value
    
    comment["updated_at"] = datetime.now()
    
    return comment

@router.delete("/{comment_id}")
async def delete_comment(comment_id: int, current_user: dict = Depends(get_current_user)):
    """Delete a comment"""
    comment = next((c for c in mock_comments_db if c["id"] == comment_id), None)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    # Check if user is comment author or admin
    if comment["user_id"] != current_user["id"] and current_user["role"] not in ["admin", "editor"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    mock_comments_db.remove(comment)
    
    # Update post comment count
    from .posts import mock_posts_db
    post = next((p for p in mock_posts_db if p["id"] == comment["post_id"]), None)
    if post:
        post["comment_count"] = max(0, post["comment_count"] - 1)
    
    return {"message": "Comment deleted successfully"}

@router.post("/{comment_id}/approve")
async def approve_comment(comment_id: int, current_user: dict = Depends(get_current_user)):
    """Approve a comment (Admin/Editor only)"""
    if current_user["role"] not in ["admin", "editor"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    comment = next((c for c in mock_comments_db if c["id"] == comment_id), None)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    comment["is_approved"] = True
    comment["updated_at"] = datetime.now()
    
    return {"message": "Comment approved successfully"}

@router.post("/{comment_id}/reject")
async def reject_comment(comment_id: int, current_user: dict = Depends(get_current_user)):
    """Reject a comment (Admin/Editor only)"""
    if current_user["role"] not in ["admin", "editor"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    comment = next((c for c in mock_comments_db if c["id"] == comment_id), None)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    comment["is_approved"] = False
    comment["updated_at"] = datetime.now()
    
    return {"message": "Comment rejected successfully"}

@router.get("/pending/", response_model=List[CommentResponse])
async def get_pending_comments(current_user: dict = Depends(get_current_user)):
    """Get pending comments (Admin/Editor only)"""
    if current_user["role"] not in ["admin", "editor"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    pending_comments = [c for c in mock_comments_db if not c["is_approved"]]
    return pending_comments
