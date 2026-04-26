# System Workflow – ResumeXAI 🛠️

This document details the end-to-end technical workflow of the **ResumeXAI – AI Powered Resume Analysis System**. It covers everything from user authentication to the final AI-driven evaluation report.

---

## 1. User Authentication

The platform requires users to authenticate before accessing the Resume Analysis Dashboard.

**Authentication Methods:**
- Email & Password Login
- Google OAuth Login

**Workflow:**
1. User opens the **Login Page**.
2. User chooses an authentication method.
3. **Email/Password**: Credentials are sent to the FastAPI `/auth/login` endpoint.
4. **Google Login**: User authenticates via Google; an OAuth ID token is returned to the frontend.
5. **Validation**: Backend verifies either the local credentials or the Google ID token.
6. **JWT Generation**: A secure **JWT Access Token** is generated for the session.
7. **Storage**: The token is stored in the browser's `localStorage`.
8. **Redirect**: User is securely redirected to the **Resume Analysis Dashboard**.

---

## 2. Resume Submission

After authentication, users can interact with the main analysis interface.

**Workflow:**
1. User uploads a **Resume** (PDF or DOCX format).
2. User provides a **Job Description** (Text input).
3. Frontend triggers a request to the FastAPI analysis endpoint with the binary file and JD text.
4. Backend initiates the processing pipeline.

---

## 3. Resume Processing Pipeline

- **Step 1 – Resume Text Extraction**: The system uses specialized parsers (`PyPDF2`, `python-docx`) to extract raw text from binary files.
- **Step 2 – AI Name Extraction**: The `Orchestrator` calls a Gemini-based service to identify the candidate's name from the raw text for the Executive Header.
- **Step 3 – AI Skill Discovery**: Google Gemini analyzes the resume to extract technical skills, normalizes them, and identifies deep semantic overlap with the JD.
- **Step 4 – Statistical NLP Analysis**: The system applies **TF-IDF Vectorization** and **Cosine Similarity** to provide a numerical "Match Score" baseline.
- **Step 5 – ML Evaluation**: A trained **Logistic Regression** model predicts the shortlist probability.

---

## 4. Machine Learning Evaluation

A trained **Logistic Regression** model (Binary Classification) evaluates the candidate's selection probability.

**Weighted Features:**
- Skill similarity score (NLP)
- Skill density (AI Extracted count)
- Technical keyword alignment
- Educational/Experience heuristics

---

## 5. AI Generated Content Detection

The system evaluates the language patterns of the resume to identify AI-generated components.

**Alert Logic:**
- **Score < 20% (Low)**: Emerald (Natural/Safe)
- **Score 21-40% (Medium)**: Yellow (Caution)
- **Score > 40% (High)**: **Red Alert** (High AI Probability)
- **Label Priority**: If the system classifes a result as **"HIGH"**, the UI overrides any percentage to display a **Red Warning State**.

---

## 6. Executive Generative AI (Google Gemini)

The system leverages **gemini-flash-latest** to providing deep qualitative insights.

**Generated Reports:**
- **Executive Reasoning**: A multi-paragraph, 150+ word analysis of clinical detail, structural tells, and data-backed evidence.
- **Strategic Recommendations**: 6+ high-impact suggestions including specific technical phrases and sections to optimize.
- **Analysis Final Assessment**: A 200+ word deep-dive into how the candidate can bridge the gap.

---

## 7. Result Visualization & Export

The React dashboard renders the intelligence with optimized performance:

- **Instant Delivery**: Typewriter animations are removed to ensure reports are "ready-to-read" immediately.
- **PDF Report Engine**: Utilizing `html2canvas` with custom visibility overrides to capture a **single-page dynamic height report**.
- **Executive Header**: The export includes a professional header with the candidate's name, report ID, and timestamp.

---

# Complete System Pipeline

```mermaid
graph TD
    A[User Login] --> B[Resume & JD Submission]
    B --> C[Text Extraction]
    C --> D[AI Name Extraction]
    D --> E[AI Skill Discovery & Normalization]
    E --> F[NLP & ML Statistical Scoring]
    F --> G[AI Content Warning Audit]
    G --> H[Gemini reasoning & executive advice]
    H --> I[Structured JSON Payload]
    I --> J[Instant Dashboard Visualization]
    J --> K[Dynamic PDF Report Export]
```

---
*Technical Documentation for the ResumeXAI Intelligent Evaluation Engine.*
