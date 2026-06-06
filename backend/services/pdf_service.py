import fitz  # PyMuPDF


def extract_text_from_pdf(file_path: str) -> str:
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text.strip()


def get_pdf_metadata(file_path: str) -> dict:
    doc = fitz.open(file_path)
    meta = doc.metadata
    page_count = doc.page_count
    doc.close()
    return {
        "title": meta.get("title", ""),
        "author": meta.get("author", ""),
        "pages": page_count,
    }