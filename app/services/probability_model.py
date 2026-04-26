import os
import joblib
import random
import pandas as pd
import numpy as np
from fastapi import HTTPException, status

class ProbabilityModelService:
    def __init__(self, model_path: str = "ml_models/selection_model.pkl"):
        self.model_path = model_path
        self.model = None
        self._load_model()

    def _load_model(self):
        """Loads the model if it exists."""
        if os.path.exists(self.model_path):
            try:
                self.model = joblib.load(self.model_path)
            except Exception as e:
                print(f"Error loading model: {e}")
                self.model = None
        else:
            print(f"Model file not found at {self.model_path}")

    def predict_probability(self, features: dict) -> float:
        """
        Predicts the selection probability based on normalized input features.
        Expected keys: match_score (0-100), skill_count (0-20), years_of_experience (0-15), education_score (1-5)
        """
        if self.model is None:
            self._load_model()
            if self.model is None:
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail="Selection model is not initialized. Please train the model first."
                )

        try:
            # 1. Extract features
            match_score = float(features.get("skill_match_score", features.get("match_score", 0)))
            skill_count = float(features.get("skill_count", 0))
            years_exp = float(features.get("years_of_experience", 0))
            edu_score = float(features.get("education_score", 1))

            # 2. Calculate Weighted Probability (Deterministic)
            # Weights: Skill Match (70%), Skill Depth (10%), Experience (15%), Education (5%)
            
            # Normalize Skill Depth: assuming 15+ skills is "full depth"
            skill_depth_score = min(skill_count / 15.0, 1.0) * 100
            
            # Normalize Experience: assuming 8+ years is "senior/full points"
            exp_points = min(years_exp / 8.0, 1.0) * 100
            
            # Normalize Education: (1-5 range) -> 1=20, 3=60, 5=100
            edu_points = (edu_score / 5.0) * 100

            probability = (
                (match_score * 0.70) + 
                (skill_depth_score * 0.10) + 
                (exp_points * 0.15) + 
                (edu_points * 0.05)
            )

            # 3. Add Model Influence IF available (Optional blend)
            if self.model is not None:
                try:
                    norm_features = {
                        'skill_match_score': match_score / 100.0,
                        'skill_count': min(skill_count / 20.0, 1.0),
                        'years_of_experience': min(years_exp / 10.0, 1.0),
                        'education_score': (max(1, min(5, edu_score)) - 1) / 4.0
                    }
                    input_df = pd.DataFrame([norm_features])
                    input_df = input_df[['skill_match_score', 'skill_count', 'years_of_experience', 'education_score']]
                    model_prob = float(self.model.predict_proba(input_df)[0][1]) * 100.0
                    
                    # Blend: 70% Formula, 30% ML Model for refinement
                    probability = (probability * 0.7) + (model_prob * 0.3)
                except Exception:
                    pass # Fallback to formula only

            # Clamp between 0-100
            probability = max(0.0, min(100.0, probability))
                
            return round(probability, 2)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error during probability prediction: {str(e)}"
            )

# Instantiate as a singleton to load once
probability_model_service = ProbabilityModelService()
