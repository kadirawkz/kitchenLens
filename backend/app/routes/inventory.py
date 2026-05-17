from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from ..core.database import get_db
from ..models.grocery import GroceryItem
from ..models.user import User
from .deps import get_current_user
from ..schemas.grocery import GroceryItemCreate, GroceryItemOut, GroceryItemUpdate

router = APIRouter()

@router.get("/", response_model=List[GroceryItemOut])
def list_inventory(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None
):
    query = db.query(GroceryItem).filter(GroceryItem.user_id == current_user.id)
    if category:
        query = query.filter(GroceryItem.category == category)
    return query.offset(skip).limit(limit).all()

@router.post("/", response_model=GroceryItemOut)
def create_item(
    item_in: GroceryItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_item = GroceryItem(**item_in.dict(), user_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/expiring-soon", response_model=List[GroceryItemOut])
def expiring_soon(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    days: int = 3
):
    end_date = datetime.utcnow() + timedelta(days=days)
    return db.query(GroceryItem).filter(
        GroceryItem.user_id == current_user.id,
        GroceryItem.expiry_date <= end_date,
        GroceryItem.expiry_date >= datetime.utcnow()
    ).all()

@router.get("/expired", response_model=List[GroceryItemOut])
def expired_items(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(GroceryItem).filter(
        GroceryItem.user_id == current_user.id,
        GroceryItem.expiry_date < datetime.utcnow()
    ).all()

@router.put("/{item_id}", response_model=GroceryItemOut)
def update_item(
    item_id: int,
    item_in: GroceryItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_item = db.query(GroceryItem).filter(GroceryItem.id == item_id, GroceryItem.user_id == current_user.id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    update_data = item_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_item, field, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_item = db.query(GroceryItem).filter(GroceryItem.id == item_id, GroceryItem.user_id == current_user.id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted"}
