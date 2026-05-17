from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from ..services.ocr_service import ocr_service
from .deps import get_current_user
from ..models.user import User
import shutil
import os

router = APIRouter()

@router.post("/upload-label")
async def upload_label(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    os.makedirs("uploads/labels", exist_ok=True)
    file_path = f"uploads/labels/{current_user.id}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    summary = await ocr_service.summarize_nutrition(file_path)
    return {"summary": summary}
