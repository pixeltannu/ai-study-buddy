from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import chat_with_context
from services.pdf_service import extract_text_from_pdf
from config import UPLOAD_DIR
import os

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    filename: str = ""


@router.post("/")
def chat(req: ChatRequest):
    context = ""
    if req.filename:
        path = os.path.join(UPLOAD_DIR, req.filename)
        if os.path.exists(path):
            full_text = extract_text_from_pdf(path)
            context = full_text[:8000]
    try:
        reply = chat_with_context(req.message, context)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))