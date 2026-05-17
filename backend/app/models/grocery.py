from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base

class GroceryItem(Base):
    __tablename__ = "grocery_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    item_name = Column(String, index=True)
    category = Column(String, index=True)
    quantity = Column(Float)
    unit = Column(String)
    price = Column(Float)
    purchase_date = Column(DateTime, default=datetime.utcnow)
    expiry_date = Column(DateTime, index=True)
    store_name = Column(String)
    source_type = Column(String) # manual / receipt / label
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = relationship("User", back_populates="grocery_items")

class Receipt(Base):
    __tablename__ = "receipts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    store_name = Column(String)
    purchase_date = Column(DateTime)
    total_amount = Column(Float)
    file_path = Column(String)
    raw_text = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="receipts")
    items = relationship("ReceiptItem", back_populates="receipt")

class ReceiptItem(Base):
    __tablename__ = "receipt_items"

    id = Column(Integer, primary_key=True, index=True)
    receipt_id = Column(Integer, ForeignKey("receipts.id"))
    item_name = Column(String)
    quantity = Column(Float)
    price = Column(Float)
    category = Column(String)

    receipt = relationship("Receipt", back_populates="items")
