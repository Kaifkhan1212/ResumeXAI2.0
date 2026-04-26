# System Architecture – ResumeXAI 🏗️

ResumeXAI utilizes a modern, professional full-stack architecture designed for high-performance AI-driven resume analysis. The system follows a **client-server architecture** organized into three primary layers, ensuring modularity, security, and scalability.

- **Presentation Layer (Frontend)**: A responsive React SPA for user interaction and data visualization.
- **Application Layer (Backend APIs)**: A FastAPI orchestrator that manages authentication, file processing, and service coordination.
- **Data & Intelligence Layer (Database + ML + AI)**: The persistent storage and advanced analytical engines (NLP, Logistic Regression, and Google Gemini).

---

# High-Level Architecture

The following diagram illustrates the high-level interaction between system components:

```mermaid
graph TD
    A[User Browser] <--> B[React Frontend]
    B <--> C[FastAPI Backend]
    C --> D[Analytical Engines]
    D --> D1[Resume Parser]
    D --> D2[NLP / TF-IDF Engine]
    D --> D3[ML Prediction Model]
    D --> D4[AI Reasoning Engine]
    C <--> E[PostgreSQL Database]
```

The backend orchestrates all analytical modules, aggregates the intelligence, and returns a structured JSON evaluation report to the frontend dashboard.

---

# Frontend Architecture

**Technology Stack:** React (Vite) + Tailwind CSS + Framer Motion (Animations) + Recharts (Visualization)

### Key Components:
- **Auth Module**: Secure Login and Registration pages (including Google OAuth integration).
- **Dashboard**: The central workspace for uploading resumes and job descriptions.
- **Upload Engine**: Handles file selection, drag-and-drop, and binary data submission.
- **Results Dashboard**: A high-fidelity interface that renders evaluation metrics, interactive charts, skill tags, and AI-driven insights.
- **API Connector (Axios)**: A centralized bridge that handles JWT authentication and communication with backend endpoints.
- **Intelligence State**: Manages user authentication status and the consolidated analysis results.

---

# Backend Architecture

**Technology Stack:** FastAPI + SQLAlchemy + Uvicorn

### Core Services:
- **Authentication Service**: Manages local registration/login and Google OAuth 2.0 verification. Handles JWT issuance and validation.
- **Resume Processing Service**: Specialized service for extracting raw text from PDF and DOCX formats.
- **AI Name Extraction**: A specialized Gemini-based service that identifies the candidate's name from unstructured resume text for personalized reporting.
- **AI Skill Matcher Service**: Leverages LLMs (Gemini) to extract technical skills and perform semantic normalization, allowing the system to understand synonymous technologies (e.g., "Node" vs "Node.js").
- **NLP Processing Engine**: Leverages TF-IDF vectorization and Cosine Similarity to calculate statistical match scores.
- **Machine Learning Module**: Integrates a trained Logistic Regression model to estimate the candidate's selection probability based on multiple numeric features.
- **AI Reasoning Engine**: Interfaces with Google Gemini (`gemini-flash-latest`) to generate deep qualitative assessments and multi-paragraph feedback.
- **Orchestration Service**: Consolidates outputs from all engines into a single, structured API response.

---

# Database Architecture

**Database Engine:** PostgreSQL / SQLite (Development)

### Core Entities:
- **Users Table**: Stores authenticated user information.
- **ResumeAnalysis Table**: Stores the results of every profile evaluation.
  - `id` (UUID)
  - `user_id` (FK)
  - `candidate_name` (Extracted via AI)
  - `skill_match_score` (Float)
  - `selection_likelihood` (Float)
  - `ai_generated_probability` (Float)
  - `analysis_data` (JSON Blob for deep results)
  - `created_at`

---

# AI & Machine Learning Layer

This layer is the core intelligence of ResumeXAI, combining statistical rigor with advanced narrative AI.

- **Entity Extraction**: Gemini identifies candidate metadata (Name, Title) from raw text.
- **LLM Skill Extraction**: Generative models extract and normalize technical competencies directly from descriptions.
- **NLP Processing**: `TfidfVectorizer` converts natural language into high-dimensional feature vectors for statistical comparisons.
- **Similarity Calculation**: Cosine Similarity measures the angular distance between the Resume and JD vectors.
- **ML Prediction**: A Logistic Regression classifier estimates the likelihood of a candidate being shortlisted.
- **AI-Content Detection**: Neural models evaluate the text for patterns indicative of AI generation (Red alert for >40%).
- **Generative AI Analysis**: Google Gemini generates the "Neural Reasoning" and "Executive Recommendations."

---

# Security Architecture

ResumeXAI implements enterprise-grade security practices:
- **JWT Authentication**: Stateless token-based authentication for all protected routes.
- **Google OAuth**: Secure verification of Google ID tokens on the server-side.
- **Password Hashing**: Industry-standard `bcrypt` hashing for local credentials.
- **Protected API Routes**: Middleware-enforced authorization requiring a valid Bearer token.
- **CORS Configuration**: Strict origin filtering to prevent unauthorized cross-origin resource sharing.

---

# API Architecture

The system exposes a clean, versioned REST API (`/api/v1`) for frontend-backend communication.

**Primary Endpoints:**
- `POST /auth/register`: User enrollment.
- `POST /auth/login`: Credential validation & JWT issuance.
- `POST /auth/google`: Google token verification & login.
- `GET /auth/me`: User profile retrieval.
- `POST /api/v1/full-analysis`: The primary entry point for the analysis pipeline.

---

# Data Flow Architecture

1. **Auth**: User logs in and receives a JWT.
2. **Submit**: Frontend sends resume and optional JD to the backend.
3. **Extract**: Backend parses technical content from uploaded files.
4. **Vectorize**: The NLP engine computes feature vectors.
5. **Score**: Match score and skill gaps are calculated.
6. **Predict**: The ML model predicts selection probability.
7. **Reason**: Google Gemini evaluates AI-content and generates summaries.
8. **Visualize**: Consolidated JSON is rendered in the React dashboard.

---

# Scalability & Future Roadmap

**Scalability Considerations:**
- **Containerization**: Use of Docker for infrastructure consistency.
- **Cloud Deployment**: Designed for AWS (ECS/EKS) or GCP (Cloud Run).
- **Asynchronous Tasks**: Future move to Celery/Redis for long-running analysis.

**Proposed Improvements:**
- **Analysis History**: Persisting and displaying past evaluations for each user.
- **Microservices Partitioning**: Moving the ML/NLP layers to independent microservices.
- **CI/CD Pipeline**: Automated retraining of the Logistic Regression model.
- **K8s Integration**: Deployment on Kubernetes for auto-scaling capabilities.

---
*Architecture documentation for ResumeXAI – Intelligent Resume Evaluation.*
