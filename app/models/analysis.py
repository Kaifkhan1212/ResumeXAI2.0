from sqlalchemy import Column, Integer, String, Float, DateTime, Text, JSON
from sqlalchemy.sql import func
from ..core.database import Base

class ResumeAnalysis(Base):
    __tablename__ = "resume_analyses"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255))
    candidate_name = Column(String(255), nullable=True)
    resume_text = Column(Text)
    job_description = Column(Text)
    
    match_score = Column(Float)
    matched_skills = Column(JSON)
    missing_skills = Column(JSON)
    
    selection_probability = Column(Float)
    ai_generated_probability = Column(Float)
    confidence_level = Column(String(50))
    ai_reasoning = Column(Text)
    
    summary = Column(Text)
    improvement_suggestions = Column(JSON)
    overall_feedback = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
