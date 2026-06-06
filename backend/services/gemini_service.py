import google.generativeai as genai
from config import GEMINI_API_KEY
import json, re

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")


def chat_with_context(user_message: str, context: str = "") -> str:
    system = (
        "You are an expert AI study assistant. Help students understand concepts clearly. "
        "Be concise, accurate, and encouraging. Use examples when helpful."
    )
    if context:
        prompt = f"{system}\n\nDocument context:\n{context}\n\nStudent question: {user_message}"
    else:
        prompt = f"{system}\n\nStudent question: {user_message}"
    response = model.generate_content(prompt)
    return response.text


def generate_notes(text: str) -> str:
    prompt = (
        "You are an expert note-taker. Read the following document and produce clear, "
        "structured study notes with key concepts, definitions, and important points. "
        "Use markdown with headings and bullet points.\n\n"
        f"Document:\n{text}"
    )
    response = model.generate_content(prompt)
    return response.text


def generate_quiz(text: str, num_questions: int = 5) -> list:
    prompt = (
        f"Generate exactly {num_questions} multiple-choice quiz questions based on this document. "
        "Return ONLY a valid JSON array, no extra text. Each item must have: "
        '"question" (string), "options" (array of 4 strings), "answer" (string matching one option), '
        '"explanation" (string).\n\n'
        f"Document:\n{text}"
    )
    response = model.generate_content(prompt)
    raw = response.text.strip()
    match = re.search(r"\[.*\]", raw, re.DOTALL)
    if match:
        return json.loads(match.group())
    return []