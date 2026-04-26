from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from ..services.skill_matcher import skill_matcher_service, SkillMatcherService

router = APIRouter(tags=["Analysis"])

class AnalyzeRequest(BaseModel):
    resume_text: str
    job_description: str

from ..services.probability_model import probability_model_service
from ..services.ai_detector import ai_detector_service

class AnalyzeResponse(BaseModel):
    skill_match_score: float
    matched_skills: list[str]
    missing_skills: list[str]
    selection_likelihood: float
    ai_generated_probability: float

@router.post("/analyze-resume", response_model=AnalyzeResponse)
async def analyze_resume(
    request: AnalyzeRequest,
    service: SkillMatcherService = Depends(lambda: skill_matcher_service)
):
    if not request.resume_text.strip() or not request.job_description.strip():
        return {
            "skill_match_score": 0.0,
            "matched_skills": [],
            "missing_skills": [],
            "selection_likelihood": 0.0,
            "ai_generated_probability": 0.0
        }

    try:
        # 1. Match Skills
        match_result = await service.match_resume_to_jd(
            request.resume_text, 
            request.job_description
        )

        # 2. Get AI Detection (Mocked/Simplified for this standalone route if preferred, but let's use real services)
        # To keep it lightweight, we'll estimate experience and education scores for probability
        # Or we can just use the orchestrator's helpers if they were static/accessible
        
        # For simplicity and to fulfill "Ensure the API response still returns...", 
        # let's call the other services.
        
        ai_detection = await ai_detector_service.detect_ai_generated(request.resume_text)
        
        # Simple heuristic for probability features (same as orchestrator)
        # In a real app, these would be extracted by a parser
        skill_count = len(match_result["matched_skills"])
        
        # We'll use default/estimated values since full parsing isn't done here
        prob_features = {
            "skill_match_score": match_result["skill_match_score"],
            "skill_count": skill_count,
            "years_of_experience": 0.0, # Placeholder/Default
            "education_score": 3        # Placeholder/Default
        }
        selection_prob = probability_model_service.predict_probability(prob_features)

        return {
            "skill_match_score": match_result["skill_match_score"],
            "matched_skills": match_result["matched_skills"],
            "missing_skills": match_result["missing_skills"],
            "selection_likelihood": selection_prob,
            "ai_generated_probability": ai_detection["ai_generated_probability"]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during analysis: {str(e)}"
        )
