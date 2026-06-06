import os
from config import ALLOWED_EXTENSIONS, MAX_FILE_SIZE_MB


def is_valid_pdf(filename: str) -> bool:
    ext = os.path.splitext(filename)[1].lower()
    return ext in ALLOWED_EXTENSIONS


def is_valid_size(size_bytes: int) -> bool:
    return size_bytes <= MAX_FILE_SIZE_MB * 1024 * 1024


def get_upload_path(filename: str, upload_dir: str) -> str:
    safe_name = os.path.basename(filename)
    return os.path.join(upload_dir, safe_name)