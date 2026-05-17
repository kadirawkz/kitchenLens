from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..core.database import get_db
from ..models.user import User
from ..models.grocery import GroceryItem
from .deps import get_current_user
from ..services.rag_service import rag_service
from ..services.zero_waste_service import zero_waste_service
from pydantic import BaseModel
from datetime import datetime, timedelta

router = APIRouter()

class ChatQuery(BaseModel):
    question: str

@router.post("/chat")
async def chat(
    query: ChatQuery,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get user inventory to provide as context
    inventory = db.query(GroceryItem).filter(GroceryItem.user_id == current_user.id).all()
    inventory_list = [f"{i.item_name} (exp: {i.expiry_date.strftime('%Y-%m-%d') if i.expiry_date else 'N/A'})" for i in inventory]
    
    response = await rag_service.query_recipes(query.question, inventory_list, current_user.id)
    return {"answer": response}

@router.post("/zero-waste-mode")
async def zero_waste(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Find items expiring within 3 days
    end_date = datetime.utcnow() + timedelta(days=3)
    expiring_items = db.query(GroceryItem).filter(
        GroceryItem.user_id == current_user.id,
        GroceryItem.expiry_date <= end_date,
        GroceryItem.expiry_date >= datetime.utcnow()
    ).all()
    
    response = await zero_waste_service.get_zero_waste_recommendation(expiring_items, current_user.id)
    return {"answer": response, "expiring_items": [i.item_name for i in expiring_items]}
