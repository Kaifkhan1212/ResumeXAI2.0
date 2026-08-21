# ResumeXAI 2.0 – AI-Powered Resume Analysis System 🚀

ResumeXAI 2.0 is a premium, production-grade AI SaaS platform designed for high-precision resume analysis, ATS optimization, and AI authenticity verification. Built with a clean architecture, it combines multi-stage text extraction, machine learning classification, and ultra-fast LLM inference (powered by Groq's `openai/gpt-oss-20b` model) to deliver candidate match scores, selection probabilities, skill gap analyses, and actionable improvement roadmaps.

---

## 🎨 Design Philosophy: "Obsidian Architect"

The user interface delivers a high-end, dark-mode SaaS experience inspired by modern developer platforms (Vercel, Linear):

- **Obsidian Dark Mode UI:** Deep background palette (`#0b0e14`) accented with subtle indigo/blue glows and ambient background blurs.
- **Glassmorphic Components:** Backdrop filter cards with smooth borders, translucent panels, and responsive layout spacing.
- **Micro-Interactions & Motion:** Framer Motion spring physics for entrance animations, drag-and-drop file dropzones, and layout transitions.
- **Structured Executive Feedback:** Dynamic accordions, severity-coded badges (*Critical*, *Positive*, *Recommended*, *Moderate*, *Note*), and step-by-step improvement roadmaps.
- **Exportable PDF Reports:** Client-side PDF generation (`html2canvas` + `jsPDF`) with automated DOM cloning and print-optimized filtering (`.pdf-hide`).

---

## 🌟 Key Features

- **Multi-Stage Resume Parser:** Supports `.pdf`, `.docx`, and `.txt` files with fallback text extraction (`pdfplumber` → `pypdf` → `PyPDF2` → `python-docx`) ensuring support for multi-column layouts, tables, and scanned text.
- **Semantic Skill Matcher:** AI-driven technical skill discovery that handles technology synonyms (e.g., `FastAPI` ↔ `REST APIs`, `React.js` ↔ `React`) with regex keyword verification to eliminate false negatives.
- **Selection Probability Model:** A trained `Logistic Regression` machine learning classifier (`selection_model.pkl`) estimating candidate shortlist probability using skill density, match percentage, experience, and education heuristics.
- **AI Content Detection Engine:** Structural analysis measuring bullet consistency, repetitive phrases, and prompt artifacts to estimate AI-generated content percentage with confidence metrics.
- **Personalized Executive Advice:** Generates high-impact, actionable resume recommendations and comprehensive candidate feedback.
- **Automatic Candidate Name Extraction:** Heuristic text-processing pipeline that extracts real candidate names directly from resume headers.
- **Authentication & OAuth:** JWT token-based authentication with bcrypt password hashing and Google OAuth2 integration.

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (Custom Obsidian Theme)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **PDF Export:** `html2canvas` + `jsPDF`

### Backend & AI Pipeline
- **Framework:** FastAPI (Python 3.11+)
- **Database ORM:** SQLAlchemy (PostgreSQL / SQLite)
- **LLM Provider:** Groq API (`openai/gpt-oss-20b` for ultra-fast <100ms inference)
- **Machine Learning:** `scikit-learn` (Logistic Regression Classifier)
- **PDF Parsers:** `pdfplumber`, `pypdf`, `PyPDF2`, `python-docx`
- **Security:** `passlib` (bcrypt), `python-jose` (JWT), `google-auth`

---

## 🔄 End-to-End Analysis Pipeline

```mermaid
flowchart TD
    A[User Uploads Resume & Job Description] --> B[Multi-Stage Resume Parser]
    B -->|pdfplumber / pypdf / docx| C[Extracted Clean Resume Text]
    C --> D[Candidate Name Extraction Engine]
    C --> E[Groq LLM Skill Discovery & Normalization]
    E --> F[Semantic Skill Matcher & Keyword Verification]
    F --> G[Logistic Regression ML Selection Model]
    C --> H[AI Detection Service]
    F & G & H --> I[Resume Advisor & Executive Suggestions]
    I --> J[SQLAlchemy Database Persistence]
    J --> K[React Obsidian Dashboard Render]
    K --> L[Print-Optimized A4 PDF Download]
```

---

## 📁 Repository Structure

```text
├── app/                        # Backend FastAPI Application
│   ├── core/                   # Configuration, Database Setup & Groq Retry Helper
│   │   ├── config.py           # Environment Variables & Settings
│   │   ├── database.py         # SQLAlchemy Engine & Session Generator
│   │   ├── groq_helper.py      # LLM Execution with 429 Rate-Limit Retries & JSON Repair
│   │   └── security.py         # Password Hashing & JWT Utilities
│   ├── models/                 # SQLAlchemy Models (User, ResumeAnalysis)
│   ├── routes/                 # API Endpoint Handlers (Auth, Analysis, Full-Pipeline)
│   ├── schemas/                # Pydantic Request/Response Models
│   └── services/               # Core Business Logic & AI Services
│       ├── ai_detector.py      # AI Generated Text Classifier
│       ├── orchestrator.py     # Central Pipeline Orchestrator
│       ├── probability_model.py# ML Selection Classifier Loader
│       ├── resume_advisor.py   # Executive Suggestions & Feedback Generator
│       ├── resume_parser.py    # Multi-Stage PDF/DOCX/TXT File Parser
│       └── skill_matcher.py   # AI & Keyword Skill Matching Service
├── frontend/                   # React Single Page Application (Vite)
│   ├── src/
│   │   ├── components/         # MetricCard, SkillTags, ResumeFeedbackAccordion, etc.
│   │   ├── pages/              # Login, Register, Dashboard Pages
│   │   └── api.js              # Axios REST Client with Auth Interceptors
│   └── tailwind.config.js      # Custom Theme Configuration
├── ml_models/                  # Trained Machine Learning Model Artifacts
│   └── selection_model.pkl     # Logistic Regression Binary Classifier
├── requirements.txt            # Python Dependencies
├── WORKFLOW.md                 # Detailed System Workflow Guide
└── ARCHITECTURE.md             # Technical Architecture Overview
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Python:** 3.11+
- **Node.js:** 18+
- **Database:** PostgreSQL (or SQLite for development)

### 1. Backend Setup
```powershell
# Navigate to project directory
cd "E:\Kaif khan\Ai-Resume Detection"

# Activate Virtual Environment
.\venv\Scripts\Activate.ps1

# Install Dependencies
pip install -r requirements.txt

# Run FastAPI Server
.\venv\Scripts\python -m uvicorn app.main:app --reload
```
*Backend runs on `http://127.0.0.1:8000` (API Docs at `http://127.0.0.1:8000/docs`).*

### 2. Frontend Setup
```powershell
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

### 3. Environment Variables (`.env`)
Create a `.env` file in the root folder:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/resume_db
GROQ_API_KEY=your_groq_api_key_here
SECRET_KEY=your_jwt_secret_key
APP_NAME="AI Resume Analyzer"
APP_VERSION="1.0.0"
DEBUG=True
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
ACCESS_TOKEN_EXPIRE_MINUTES=43200
```

---

## 👨‍💻 Engineering Lead

**Kaif Khan**  
🔗 [GitHub Repository](https://github.com/Kaifkhan1212/ResumeXAI2.0) | 📧 kaif01450@gmail.com  
*Building scalable, production-ready AI tools for talent acquisition and career growth.*
