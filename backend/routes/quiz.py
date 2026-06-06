from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.quiz_service import create_quiz_from_pdf
from config import UPLOAD_DIR
import os

router = APIRouter()


class QuizRequest(BaseModel):
    filename: str
    num_questions: int = 5


@router.post("/generate")
def generate_quiz(req: QuizRequest):
    path = os.path.join(UPLOAD_DIR, req.filename)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="PDF not found. Please upload it first.")
    num = max(1, min(req.num_questions, 15))
    questions = create_quiz_from_pdf(path, num)
    if not questions:
        raise HTTPException(status_code=422, detail="Could not generate quiz from this PDF.")
    return {"questions": questions, "total": len(questions)}