# AI Resume Analyzer 🚀

A professional, production-ready AI-powered platform designed to analyze resumes against job descriptions with high precision. This project leverages Machine Learning, Natural Language Processing (NLP), and Generative AI to provide deep insights into candidate suitability, selection probability, and resume quality.

## 🌟 Core Features

- **Resume Parsing**: Automated text extraction from PDF and DOCX formats.
- **Semantic Skill Matching**: Uses TF-IDF vectorization and Cosine Similarity to identify matched and missing skills.
- **Selection Probability Prediction**: A trained Logistic Regression model predicts the likelihood of selection based on match score, experience, and education.
- **AI Content Detection**: Detects if a resume was AI-generated using Google Gemini 2.5 Flash neural models.
- **Neural Engine Analysis**: Provides detailed AI-driven reasoning for the analysis results.
- **Growth Blueprint**: Generates personalized, actionable suggestions for resume improvement.
- **Interactive Dashboard**: Modern React-based UI with glassmorphism design, real-time charts (Recharts), and smooth animations (Framer Motion).
- **PDF Intelligence Export**: Generate and download professional analysis reports in PDF format.
- **Data Persistence**: Robust PostgreSQL integration for storing and retrieving analysis history.

## 🧠 Key Concepts Demonstrated

- Natural Language Processing (NLP)
- Feature Engineering
- Machine Learning Classification
- Large Language Model Integration
- Explainable AI (XAI)
- REST API Architecture
- Full Stack Application Development

---

## 🏗️ System Architecture

The project follows a **Clean Architecture** pattern, emphasizing modularity, separation of concerns, and scalability.

- **Frontend**: A high-performance SPA built with **React (Vite)** and **Tailwind CSS**.
- **Backend**: A modular **FastAPI** application with specialized services for NLP, ML, and AI tasks.
- **Database**: **PostgreSQL** managed by **SQLAlchemy ORM** for persistent storage.
- **AI Core**: Integrated with **Google Gemini 2.5 Flash** for sophisticated text analysis and reasoning.
- **ML Layer**: **Scikit-learn** powered Logistic Regression model for predictive analysis.

## 🔄 End-to-End Workflow

1. **Upload**: User uploads resume and provides job description.
2. **Extraction**: Backend extracts text from PDF/DOCX formats.
3. **Vectorization**: NLP engine computes TF-IDF vectors for features.
4. **Scoring**: Cosine similarity generates the core Match Score.
5. **Prediction**: ML model predicts Selection Probability based on matched features.
6. **AI Detection**: Gemini API evaluates AI-generated probability and confidence.
7. **Advisory**: Gemini generates Growth Blueprint (suggestions) and overall summary.
8. **Persistence**: Results are stored in PostgreSQL for historical tracking.
9. **Visualization**: Structured JSON is returned and rendered in the React Dashboard.

---

## 📂 Project Structure

```text
├── app/                    # Backend (FastAPI)
│   ├── core/               # Configuration and Database setup
│   ├── models/             # SQLAlchemy ORM models
│   ├── routes/             # API Router registrations
│   ├── schemas/            # Pydantic validation schemas
│   ├── services/           # Business logic (ML, NLP, AI services)
│   └── main.py             # Application entry point
├── frontend/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # UI Components (Dashboard, Cards, etc.)
│   │   ├── api.js          # Axios API bridge
│   │   └── App.jsx         # Main Layout and State
│   └── tailwind.config.js  # Styling configuration
├── ml_models/              # Serialized trained ML models
├── requirements.txt        # Backend dependencies
└── .env                    # System environment variables
```

---

## 🛠️ Technical Implementation

### Natural Language Processing (NLP)
The system uses `TfidfVectorizer` to convert resume and job description text into numerical vectors. **Cosine Similarity** is then calculated to determine the semantic overlap, providing a robust "Match Score."

### Machine Learning (ML)
A **Logistic Regression** model trained on normalized features (match score, skill count, experience, education) provides the "Selection Probability." Input features are scaled to a standard 0-1 range to ensure prediction stability.

### Generative AI (Google Gemini)
The **AI Detection** and **Advisor** modules use Gemini 2.5 Flash. It utilizes structured prompts to return strict JSON responses, enabling the system to provide "Neural Reasoning" and "Improvement Suggestions" directly in the dashboard.

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL

### 1. Backend Setup
```bash
# Clone the repository
git clone https://github.com/Kaifkhan1212/ResumeXAI.git
cd "ResumeXAI"

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/resume_db
GEMINI_API_KEY=your_gemini_api_key
SECRET_KEY=your_secret_key
APP_NAME="AI Resume Analyzer"
APP_VERSION="2.5.0"
DEBUG=True
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

---

## 🏃 Running the Application

### Start Backend
```bash
# In the root directory
uvicorn app.main:app --reload
```
The API documentation will be available at: `http://127.0.0.1:8000/docs`

### Start Frontend
```bash
# In the frontend directory
npm run dev
```
The application will be available at: `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/full-analysis | Complete resume evaluation pipeline |
| POST | /api/v1/upload-resume | Upload resume & extract text |
| POST | /api/v1/analyze-resume | Skill matching & scoring |
| POST | /api/v1/predict-probability | ML-based selection prediction |
| POST | /api/v1/detect-ai | Gemini-powered AI content detection |
| GET | /health | Service status & health check |

---

## 📊 Database Schema
The system uses a `resume_analyses` table to store:
- Extracted text (Resume & JD)
- Calculated scores (Match & Probability)
- Skill tags (Matched & Missing)
- AI insights (Detection & Reasoning)
- Growth Blueprint (Suggestions & Feedback)

---

## 🔮 Future Improvements
- [ ] Multi-resume bulk analysis.
- [ ] Integration with LinkedIn API for direct profile fetching.
- [ ] Advanced candidate ranking and filtering for recruiters.
- [ ] Real-time collaborative hiring feedback loops.

---

## 📄 License
This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Kaif Khan**  

🔗 GitHub: https://github.com/Kaifkhan1212  
📧 Email: kaif0140@gmail.com

Built with FastAPI, React, PostgreSQL, and Google Gemini.
