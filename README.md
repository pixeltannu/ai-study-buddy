# ✦ AI Study Buddy

> An AI-powered study assistant that transforms the way you learn.

🌐 **Live Demo:** [AI Study Buddy](https://dashing-creponne-0d9334.netlify.app)

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi)
![Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=flat&logo=google)

## 🚀 About

AI Study Buddy is a full-stack intelligent study assistant. Upload any PDF document and leverage the power of Google Gemini AI to:

- 💬 **Chat** with your document — ask anything, get instant answers
- 📝 **Generate Notes** — structured, markdown-formatted study notes
- 🧠 **Take Quizzes** — AI-generated multiple-choice questions with scoring

Built for students, researchers, and lifelong learners who want to study smarter, not harder.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, CSS3 |
| Backend | FastAPI, Python 3.11 |
| AI | Google Gemini 1.5 Flash |
| PDF Processing | PyMuPDF |

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.11
- Node.js
- Google Gemini API Key → get it from https://aistudio.google.com

### 1. Clone the Repository

git clone https://github.com/pixeltannu/ai-study-buddy.git
cd ai-study-buddy

### 2. Backend Setup

cd backend
pip install -r requirements.txt

### 3. Environment Setup

Create .env file inside backend/ folder:
GEMINI_API_KEY=your_gemini_api_key_here

### 4. Run Backend

cd backend
python main.py

### 5. Run Frontend

cd frontend
npm install
npm run dev

## 📄 License
MIT License
