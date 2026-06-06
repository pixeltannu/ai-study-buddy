from fastapi import APIRouter, UploadFile, File, HTTPException
from services.pdf_service import extract_text_from_pdf, get_pdf_metadata
from services.gemini_service import generate_notes
from utils.helpers import is_valid_pdf, is_valid_size, get_upload_path
from config import UPLOAD_DIR
import os

router = APIRouter()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not is_valid_pdf(file.filename):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    content = await file.read()
    if not is_valid_size(len(content)):
        raise HTTPException(status_code=400, detail="File exceeds 20 MB limit.")
    save_path = get_upload_path(file.filename, UPLOAD_DIR)
    with open(save_path, "wb") as f:
        f.write(content)
    meta = get_pdf_metadata(save_path)
    return {"filename": file.filename, "metadata": meta, "message": "Upload successful."}


@router.get("/notes/{filename}")
def get_notes(filename: str):
    path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found.")
    text = extract_text_from_pdf(path)
    if not text:
        raise HTTPException(status_code=422, detail="Could not extract text from PDF.")
    notes = generate_notes(text[:10000])
    return {"filename": filename, "notes": notes}


@router.delete("/{filename}")
def delete_pdf(filename: str):
    path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found.")
    os.remove(path)
    return {"message": f"{filename} deleted successfully."}