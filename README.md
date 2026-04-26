# ResumeXAI – AI-Powered Resume Analysis System 🚀

ResumeXAI is a premium, production-grade AI SaaS platform designed for professional resume analysis and optimization. Orchestrated with a "Clean Architecture" philosophy, it leverages Natural Language Processing, Machine Learning, and High-Performance Generative AI (powered by **Groq LPU**) to provide high-fidelity insights into candidate suitability, match scores, and resume authenticity.

---

## 🎨 Design Philosophy: "Obsidian Architect"

The platform features a high-end, editorial user experience inspired by the aesthetic standards of **Vercel**, **Linear**, and **Stripe**. The interface focuses on:

- **Glassmorphism:** Layered surfaces with high-diffusion blurs and tonal transparency.
- **Atmospheric Depth:** Deep obsidian backgrounds (`#0b0e14`) with subtle, animated indigo/blue glows.
- **Fluid Motion Physics:** Smooth transitions and spring-based animations powered by **Framer Motion**.
- **Micro-Interactions:** Luminous hover states, real-time feedback rendering, and interactive metric dashboards.
- **Optimized Layout:** Smart grid distribution with full-width executive feedback sections for maximum readability.

---

## 🌟 Elite Features

- **Obsidian Dashboard:** A visually stunning interactive workspace for seamless resume-JD matching.
- **Semantic Matching Engine v2:** AI-powered competency evaluation that goes beyond keywords to understand synonyms, related technologies, and implied experience.
- **Selection Probability:** ML-powered algorithm that calculates the probability of hiring success based on skill depth and experience.
- **AI Detection Score:** Neural evaluation to identify AI-generated components, featuring a **Strict Warning System**.
- **Executive Name Extraction:** Automatically identifies and extracts the candidate's name from the document for personalized reporting.
- **Verified PDF Reports:** Export beautifully formatted, dynamic reports with executive headers, candidate metadata, and professional branding.

---

## 🏗️ Technical Architecture

### Frontend Ecosystem
- **Core:** React 18 (Vite)
- **Styling:** Vanilla CSS + Tailwind (Obsidian Design System)
- **Animation:** Framer Motion (Optimized for instant report delivery)
- **PDF Engine:** `html2canvas` + `jsPDF` (Dynamic height capture)

### Backend & AI
- **Framework:** FastAPI (Python 3.10+)
- **Database:** SQLAlchemy (PostgreSQL/SQLite)
- **AI Core:** **Groq AI (`llama-3.3-70b-versatile`)** — *Ultra-fast inference using LPU Acceleration*
- **Skill Engine:** **Semantic Cross-Match Logic** (Handles "MySQL" vs "PostgreSQL" and other technical synonyms intelligently)

---

## 🔄 Analysis Pipeline

1. **Upload:** Ingestion of Resume (PDF/DOCX) and Job Description via the glassmorphism interface.
2. **Name Extraction:** AI identifies the candidate's name for report personalization.
3. **Semantic Matching:** Groq evaluates resume text against JD requirements using a deep competency-based cross-match.
4. **Statistical Scoring:** NLP engines compute semantic overlap while ML models predict shortlisting likelihood.
5. **Authencity Audit:** Neural detectors evaluate linguistic patterns for AI-generation probability.
6. **Executive Feedback:** System generates comprehensive, multi-paragraph reasoning and improvement deep-dives in an optimized full-width view.
7. **Export:** Generation of a professional PDF report with persistent executive branding.

---

## 📂 System Manifest

```text
├── app/                    # Backend Intelligence (FastAPI)
│   ├── core/               # Vault, Config & Database Infrastructure
│   ├── models/             # Entity Definitions (SQLAlchemy)
│   ├── routes/             # API Endpoints (Auth & Analysis)
│   ├── schemas/            # Data Validation (Pydantic)
│   └── services/           # AI Services (Groq, ML, NLP)
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
git clone https://github.com/Kaifkhan1212/AI-Resume-Analyzer
cd AI-Resume-Analyzer

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
SECRET_KEY=your_secret_key
GOOGLE_CLIENT_ID=your_id
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
*Building the future of AI-driven career intelligence with Groq LPU technology.*

