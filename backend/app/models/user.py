from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    grocery_items = relationship("GroceryItem", back_populates="owner")
    receipts = relationship("Receipt", back_populates="owner")
    recipes = relationship("Recipe", back_populates="owner")
    shopping_list = relationship("ShoppingListItem", back_populates="owner")
    chat_history = relationship("ChatHistory", back_populates="owner")
