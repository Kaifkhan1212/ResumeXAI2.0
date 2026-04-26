from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from ..services.probability_model import probability_model_service, ProbabilityModelService

router = APIRouter(tags=["Prediction"])

class ProbabilityRequest(BaseModel):
    skill_match_score: float = Field(..., ge=0, le=100)
    skill_count: int = Field(..., ge=0)
    years_of_experience: float = Field(..., ge=0)
    education_score: int = Field(..., ge=1, le=5)

class ProbabilityResponse(BaseModel):
    selection_probability: float

@router.post("/predict-probability", response_model=ProbabilityResponse)
async def predict_probability(
    request: ProbabilityRequest,
    service: ProbabilityModelService = Depends(lambda: probability_model_service)
):
    features = request.model_dump()
    prob = service.predict_probability(features)
    return {"selection_probability": prob}
