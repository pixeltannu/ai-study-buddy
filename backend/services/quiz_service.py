from services.gemini_service import generate_quiz
from services.pdf_service import extract_text_from_pdf


def create_quiz_from_pdf(file_path: str, num_questions: int = 5) -> list:
    text = extract_text_from_pdf(file_path)
    if not text:
        return []
    trimmed = text[:12000]
    return generate_quiz(trimmed, num_questions)