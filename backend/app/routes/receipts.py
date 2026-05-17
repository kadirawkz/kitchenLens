from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.user import User
from ..models.grocery import Receipt, ReceiptItem
from .deps import get_current_user
from ..services.ocr_service import ocr_service
import shutil
import os

router = APIRouter()

@router.post("/upload")
async def upload_receipt(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Save file
    os.makedirs("uploads/receipts", exist_ok=True)
    file_path = f"uploads/receipts/{current_user.id}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Process with Gemini
    ocr_data = await ocr_service.process_receipt(file_path)
    if not ocr_data:
        raise HTTPException(status_code=500, detail="Failed to process receipt")
    
    # Create receipt record
    db_receipt = Receipt(
        user_id=current_user.id,
        store_name=ocr_data.get("store_name"),
        purchase_date=datetime.strptime(ocr_data.get("purchase_date"), "%Y-%m-%d") if ocr_data.get("purchase_date") else datetime.utcnow(),
        total_amount=ocr_data.get("total_amount"),
        file_path=file_path
    )
    db.add(db_receipt)
    db.commit()
    db.refresh(db_receipt)
    
    # Add items
    for item in ocr_data.get("items", []):
        db_item = ReceiptItem(
            receipt_id=db_receipt.id,
            item_name=item.get("item_name"),
            quantity=item.get("quantity", 1),
            price=item.get("price", 0),
            category=item.get("category", "Uncategorized")
        )
        db.add(db_item)
    
    db.commit()
    
    return {"receipt_id": db_receipt.id, "data": ocr_data}

from datetime import datetime
