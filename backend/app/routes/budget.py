from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict
from ..core.database import get_db
from ..routes.deps import get_current_user
from ..models.user import User
from ..models.grocery import GroceryItem
from sqlalchemy import func

router = APIRouter()

@router.get("/summary")
def get_budget_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Total spent (sum of prices in grocery items)
    total_spent = db.query(func.sum(GroceryItem.price)).filter(GroceryItem.user_id == current_user.id).scalar() or 0
    
    # Category breakdown
    category_data = db.query(
        GroceryItem.category, 
        func.sum(GroceryItem.price).label("total")
    ).filter(GroceryItem.user_id == current_user.id).group_by(GroceryItem.category).all()
    
    breakdown = {cat: total for cat, total in category_data}
    
    # Monthly trend (mocking some data for the UI chart)
    trend = [
        {"month": "Jan", "amount": total_spent * 0.8},
        {"month": "Feb", "amount": total_spent * 0.9},
        {"month": "Mar", "amount": total_spent}
    ]

    return {
        "total_spent": total_spent,
        "breakdown": breakdown,
        "trend": trend,
        "currency": "USD"
    }
