import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
MAX_FILE_SIZE_MB = 20
ALLOWED_EXTENSIONS = {".pdf"}

os.makedirs(UPLOAD_DIR, exist_ok=True)