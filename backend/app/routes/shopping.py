from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..routes.deps import get_current_user
from ..models.user import User
from ..models.recipe import ShoppingListItem
from pydantic import BaseModel

router = APIRouter()

class ShoppingItemCreate(BaseModel):
    item_name: str
    quantity: str
    priority: str = "Medium"
    reason: str = None

@router.get("/", response_model=List[dict])
def get_shopping_list(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items = db.query(ShoppingListItem).filter(ShoppingListItem.user_id == current_user.id).all()
    return [
        {
            "id": item.id,
            "item_name": item.item_name,
            "quantity": item.quantity,
            "priority": item.priority,
            "is_completed": item.is_completed,
            "reason": item.reason
        } for item in items
    ]

@router.post("/")
def add_to_shopping_list(
    item: ShoppingItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_item = ShoppingListItem(
        user_id=current_user.id,
        item_name=item.item_name,
        quantity=item.quantity,
        priority=item.priority,
        reason=item.reason
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@router.delete("/{item_id}")
def delete_shopping_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    item = db.query(ShoppingListItem).filter(
        ShoppingListItem.id == item_id, 
        ShoppingListItem.user_id == current_user.id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": "Deleted"}
