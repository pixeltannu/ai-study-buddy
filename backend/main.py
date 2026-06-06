from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import router as chat_router
from routes.pdf import router as pdf_router
from routes.quiz import router as quiz_router

app = FastAPI(title="AI Study Buddy API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])
app.include_router(pdf_router,  prefix="/api/pdf",  tags=["PDF"])
app.include_router(quiz_router, prefix="/api/quiz", tags=["Quiz"])

@app.get("/")
def root():
    return {"status": "AI Study Buddy API is running"}