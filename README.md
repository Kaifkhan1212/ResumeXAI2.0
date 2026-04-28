# ResumeXAI 2.0 – AI-Powered Resume Analysis System 🚀

ResumeXAI 2.0 is a premium, production-grade AI SaaS platform designed for professional resume analysis and optimization. Orchestrated with a "Clean Architecture" philosophy, it leverages Natural Language Processing, Machine Learning, and High-Performance Generative AI (powered by Google Gemini and Groq) to provide high-fidelity insights into candidate suitability, match scores, and resume authenticity.

---

## 🎨 Design Philosophy: "Obsidian Architect"

The platform features a high-end, editorial user experience inspired by the aesthetic standards of top-tier enterprise SaaS products (e.g., Vercel, Linear). The interface focuses on:

- **SaaS-Grade Landing Experience:** A dynamic hero section featuring masked grid patterns, deep obsidian backgrounds (`#0b0e14`), and subtle indigo/blue glows.
- **Glassmorphism Components:** Layered UI elements utilizing backdrop filters and tonal transparency for maximum depth.
- **Fluid Micro-interactions:** Smooth spring-based animations, drag-and-drop scanner visuals, and hover-lift effects powered by **Framer Motion**.
- **Interactive Data Visualization:** Complex AI feedback is delivered through animated accordions, dynamic severity badges, and structured timeline roadmaps.
- **PDF-Optimized:** Seamlessly transitions from a highly interactive web interface into a clean, printable A4 PDF document using custom rendering logic.

---

## 🌟 Elite Features

- **Interactive Feedback System:** Transforms static text into an expandable, glassmorphic accordion with severity-based color coding (Critical, Positive, Warning, Note).
- **Strategic Roadmap View:** "Areas to Improve" are presented as a vertical, animated timeline roadmap, guiding the user step-by-step through resume optimization.
- **Semantic Matching Engine:** Evaluates competency beyond keywords, deeply understanding synonyms and implied experience via Google Gemini/Groq LLMs.
- **Selection Probability:** ML-powered algorithm that calculates the probability of hiring success.
- **AI Detection Score:** Neural evaluation to identify AI-generated text, ensuring authenticity.
- **Exportable PDF Reports:** Instantly generates a professional report (`html2canvas` + `jsPDF`) that automatically strips complex UI animations for a perfect, clean printout.

---

## 🏗️ Technical Architecture

### Frontend Ecosystem
- **Core:** React 18 (Vite)
- **Styling:** Tailwind CSS (Custom thematic configuration)
- **Animation:** Framer Motion (Layout transitions, staggered entrances)
- **PDF Engine:** `html2canvas` + `jsPDF` (Custom cloning logic, automated overflow-hidden removal for perfect typography)

### Backend & AI
- **Framework:** FastAPI (Python 3.10+)
- **Database:** SQLAlchemy (PostgreSQL)
- **AI Core:** Google Gemini & Groq LLMs — *Ultra-fast inference and deep semantic reasoning*
- **Skill Engine:** NLP TF-IDF Vectorization and Logistic Regression

---

## 🔄 Analysis Pipeline

1. **Ingestion:** Users upload a Resume (PDF/DOCX) and Job Description via an interactive, pulsing drag-and-drop scanner zone.
2. **Text Extraction:** Python-based parsers extract semantic text structure from the binary document.
3. **LLM Evaluation:** AI cross-matches the candidate's skills against the JD requirements, producing a deep competency evaluation.
4. **Statistical Scoring:** NLP engines and ML models calculate Match Score, Selection Probability, and AI Authenticity.
5. **UI Orchestration:** The React frontend parses the raw AI data, mapping specific text cues to visual severity states (e.g., mapping "missing skill" to a glowing red 'Critical' badge).
6. **Executive Review:** Users navigate their results through an intuitive Dashboard, exploring insights via the Feedback Accordion and Timeline Roadmap.
7. **Export:** Users can generate a pixel-perfect PDF report containing all generated insights.

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
