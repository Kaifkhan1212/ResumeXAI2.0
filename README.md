# ResumeXAI 2.0 – AI-Powered Resume Analysis System 🚀

ResumeXAI 2.0 is a premium, production-grade AI SaaS platform designed for professional resume analysis and optimization. Orchestrated with a "Clean Architecture" philosophy, it leverages Natural Language Processing, Machine Learning, and High-Performance Generative AI (powered by Google Gemini and Groq) to provide high-fidelity insights into candidate suitability, match scores, and resume authenticity.

---

## 🎨 Design Philosophy: "Obsidian Architect"

The platform features a high-end, editorial user experience inspired by the aesthetic standards of top-tier enterprise SaaS products. The interface focuses on:

- **Glassmorphism:** Layered surfaces with high-diffusion blurs and tonal transparency.
- **Atmospheric Depth:** Deep obsidian backgrounds (`#0b0e14`) with subtle, animated indigo/blue glows.
- **Fluid Motion Physics:** Smooth transitions and spring-based animations powered by **Framer Motion**.
- **Responsive Layout:** Perfectly engineered media queries that scale from desktop displays down to comfortable mobile experiences.
- **Optimized Layout:** Smart grid distribution with full-width, bullet-pointed executive feedback sections for maximum readability.

---

## 🌟 Elite Features

- **Obsidian Dashboard:** A visually stunning interactive workspace for seamless resume-JD matching.
- **Semantic Matching Engine:** AI-powered competency evaluation that goes beyond keywords to understand synonyms and implied experience.
- **Selection Probability:** ML-powered algorithm that calculates the probability of hiring success based on skill depth and experience.
- **AI Detection Score:** Neural evaluation to identify AI-generated components, featuring a **Strict Warning System** to detect ChatGPT-generated resumes.
- **Actionable AI Insights:** Transforms raw AI reasoning into structured, easy-to-read, numbered key points for both "Areas to Improve" and "Resume Feedback".
- **Verified PDF Reports:** Export beautifully formatted, dynamic reports directly from the web browser to a PDF using `html2canvas` and `jsPDF`, strictly tailored to exclude complex UI animations for a clean, professional printout.

---

## 🏗️ Technical Architecture

### Frontend Ecosystem
- **Core:** React 18 (Vite)
- **Styling:** Vanilla CSS + Tailwind CSS
- **Animation:** Framer Motion (Optimized for instant report delivery)
- **PDF Engine:** `html2canvas` + `jsPDF` (Custom cloning logic to handle CSS filters)

### Backend & AI
- **Framework:** FastAPI (Python 3.10+)
- **Database:** SQLAlchemy (PostgreSQL)
- **AI Core:** Google Gemini & Groq LLMs — *Ultra-fast inference and deep semantic reasoning*
- **Skill Engine:** NLP TF-IDF Vectorization and Logistic Regression

---

## 🔄 Analysis Pipeline

1. **Upload:** Ingestion of Resume (PDF/DOCX) and Job Description via the glassmorphism interface.
2. **Text Extraction:** Specialized parsers read the binary document data.
3. **Semantic Matching:** AI evaluates resume text against JD requirements using a deep competency-based cross-match.
4. **Statistical Scoring:** NLP engines compute semantic overlap while ML models predict shortlisting likelihood.
5. **Authencity Audit:** Detectors evaluate linguistic patterns for AI-generation probability.
6. **Executive Feedback:** System generates comprehensive, multi-paragraph reasoning parsed cleanly into structured bullet points.
7. **Export:** Generation of a professional PDF report with persistent executive branding.

---

## 📂 System Manifest

```text
├── app/                    # Backend Intelligence (FastAPI)
│   ├── core/               # Vault, Config & Database Infrastructure
│   ├── models/             # Entity Definitions (SQLAlchemy)
│   ├── routes/             # API Endpoints (Auth & Analysis)
│   ├── schemas/            # Data Validation (Pydantic)
│   └── services/           # AI Services (LLMs, ML, NLP)
├── frontend/               # Frontend Interface (React + Obsidian UI)
│   ├── src/
│   │   ├── components/     # High-Fidelity UI Blocks (MetricCard, ResultsDashboard)
│   │   ├── pages/          # Authentication & Dashboard Views
│   │   └── api.js          # Auth-Aware Communication Bridge
│   └── tailwind.config.js  # Design System Tokens
└── requirements.txt        # System Dependencies
```

---

## 🚀 Deployment & Setup

### Prerequisites
- Python 3.9+ | Node.js 20+ | PostgreSQL 15+

### 1. Backend Setup
```bash
# Clone the repository
git clone https://github.com/Kaifkhan1212/ResumeXAI2.0.git
cd ResumeXAI2.0

# Initialize Environment
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

# Install Dependencies
pip install -r requirements.txt
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/resume_db
GROQ_API_KEY=your_groq_key_here
GEMINI_API_KEY=your_gemini_key_here
SECRET_KEY=your_secret_key
GOOGLE_CLIENT_ID=your_id
ACCESS_TOKEN_EXPIRE_MINUTES=43200
```

---

## 🏃 Running the Application

**Start Backend:**
```bash
uvicorn app.main:app --reload
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

---

## 👨‍💻 Engineering Lead

**Kaif Khan**  
🔗 [GitHub](https://github.com/Kaifkhan1212) | 📧 kaif01450@gmail.com  
*Building the future of AI-driven career intelligence.*
