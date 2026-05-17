from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class GroceryItemBase(BaseModel):
    item_name: str
    category: Optional[str] = "Uncategorized"
    quantity: Optional[float] = 1.0
    unit: Optional[str] = "unit"
    price: Optional[float] = 0.0
    purchase_date: Optional[datetime] = None
    expiry_date: Optional[datetime] = None
    store_name: Optional[str] = None
    source_type: Optional[str] = "manual"
    notes: Optional[str] = None

class GroceryItemCreate(GroceryItemBase):
    pass

class GroceryItemUpdate(BaseModel):
    item_name: Optional[str] = None
    category: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None
    price: Optional[float] = None
    expiry_date: Optional[datetime] = None
    notes: Optional[str] = None

class GroceryItemOut(GroceryItemBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ReceiptItemBase(BaseModel):
    item_name: str
    quantity: float
    price: float
    category: str

class ReceiptBase(BaseModel):
    store_name: str
    purchase_date: datetime
    total_amount: float
    file_path: Optional[str] = None
    raw_text: Optional[str] = None

class ReceiptOut(ReceiptBase):
    id: int
    items: List[ReceiptItemBase]

    class Config:
        from_attributes = True
