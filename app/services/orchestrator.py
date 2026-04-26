import re
import asyncio
import json
from typing import Dict, Any, List
from groq import Groq
from .resume_parser import resume_parser_service
from .skill_matcher import skill_matcher_service
from .probability_model import probability_model_service
from .ai_detector import ai_detector_service
from .resume_advisor import resume_advisor_service
from ..core.config import settings

class AnalysisOrchestrator:
    def __init__(self):
        if settings.GROQ_API_KEY:
            self.client = Groq(api_key=settings.GROQ_API_KEY)
            self.model_id = 'llama-3.3-70b-versatile'
        else:
            self.client = None
            self.model_id = None

    @staticmethod
    def _estimate_experience(text: str) -> float:
        """
        Simple heuristic to estimate years of experience from text.
        Searches for patterns like '5+ years', '3 years of experience', etc.
        """
        patterns = [
            r'(\d+)\+?\s*(?:years?|yrs?)\b',
            r'\b(?:experience|exp)\b\s*:\s*(\d+)',
        ]
        years = 0.0
        for pattern in patterns:
            matches = re.findall(pattern, text.lower())
            if matches:
                # Take the highest found number as a simple heuristic
                vals = [float(m) for m in matches if float(m) < 40] # cap at 40
                if vals:
                    years = max(years, max(vals))
        return years

    @staticmethod
    def _calculate_education_score(text: str) -> int:
        """
        Basic keyword scoring for education. 
        1: Basic, 3: Bachelor, 5: Master/PhD.
        """
        text = text.lower()
        if any(kw in text for kw in ['phd', 'doctorate', 'master', 'ms', 'mba', 'm.tech']):
            return 5
        if any(kw in text for kw in ['bachelor', 'bs', 'ba', 'b.tech', 'degree']):
            return 3
        return 1

    async def _extract_name(self, resume_text: str) -> str:
        """
        Extract the candidate's name from the resume text using Gemini.
        """
        if not self.client:
            # Fallback: try to find the first line or use a generic name
            lines = [l.strip() for l in resume_text.split('\n') if l.strip()]
            return lines[0] if lines else "Candidate"

        prompt = f"""
        Extract the full name of the candidate from the following resume text.
        Return ONLY the name as a string, no other text or JSON. If you cannot find a name, return "Candidate".
        
        Resume Text:
        {resume_text[:2000]}  # Send first 2k chars for speed
        """
        
        try:
            response = self.client.chat.completions.create(
                model=self.model_id,
                messages=[
                    {"role": "system", "content": "Extract the candidate's full name. Return ONLY the name."},
                    {"role": "user", "content": prompt}
                ]
            )
            name = response.choices[0].message.content.strip()
            # Clean up potential artifacts
            name = name.split('\n')[0].strip()
            return name if name else "Candidate"
        except Exception as e:
            print(f"Name Extraction Error: {e}")
            return "Candidate"

    async def run_pipeline(self, file_content: bytes, filename: str, jd_text: str) -> Dict[str, Any]:
        # 1. Extract Text
        try:
            resume_text = await resume_parser_service.extract_text(file_content, filename)
        except Exception as e:
            print(f"Parser Error: {e}")
            resume_text = "ERROR: Could not extract text from file."
        
        # 2. Match Skills & Score
        try:
            match_result = await skill_matcher_service.match_resume_to_jd(resume_text, jd_text)
        except Exception as e:
            print(f"Skill Matcher Error: {e}")
            match_result = {"skill_match_score": 0.0, "matched_skills": [], "missing_skills": []}
        
        # 3. Calculate additional metrics for Probability Model
        matched_skills = match_result["matched_skills"]
        skill_count = len(matched_skills)
        years_of_experience = self._estimate_experience(resume_text)
        education_score = self._calculate_education_score(resume_text)
        
        # 4. Predict Selection Probability
        try:
            prob_features = {
                "skill_match_score": match_result["skill_match_score"],
                "skill_count": skill_count,
                "years_of_experience": years_of_experience,
                "education_score": education_score
            }
            selection_prob = probability_model_service.predict_probability(prob_features)
        except Exception as e:
            print(f"Probability Model Error: {e}")
            selection_prob = 0.0
        
        # 5. Detect AI-generated content (Gemini)
        try:
            ai_detection = await ai_detector_service.detect_ai_generated(resume_text)
        except Exception as e:
            print(f"AI Detector Error: {e}")
            ai_detection = {"ai_generated_probability": 0.0, "confidence_level": "Low", "reasoning": "Analysis failed."}
        
        # 6. Generate AI Suggestions
        try:
            suggestions = await resume_advisor_service.generate_resume_suggestions(
                resume_text, jd_text, match_result["missing_skills"], match_result["skill_match_score"]
            )
        except Exception as e:
            print(f"Resume Advisor Error: {e}")
            suggestions = {"improvement_suggestions": [], "overall_feedback": "Service unavailable."}
        
        # 7. Extract Name
        candidate_name = await self._extract_name(resume_text)
        
        # 8. Generate Summary
        summary = self._generate_summary(match_result, selection_prob, ai_detection)
        
        return {
            "candidate_name": candidate_name,
            "resume_text": resume_text,
            "skill_match_score": match_result["skill_match_score"],
            "matched_skills": matched_skills,
            "missing_skills": match_result["missing_skills"],
            "selection_likelihood": selection_prob,
            "ai_generated_probability": ai_detection["ai_generated_probability"],
            "confidence_level": ai_detection["confidence_level"],
            "ai_reasoning": ai_detection["reasoning"],
            "improvement_suggestions": suggestions["improvement_suggestions"],
            "overall_feedback": suggestions["overall_feedback"],
            "summary": summary
        }

    def _generate_summary(self, match_result: dict, prob: float, ai: dict) -> str:
        missing = match_result["missing_skills"]
        score = match_result["skill_match_score"]
        
        suggestion = "Complete match!" if score > 80 else f"Focus on gaining: {', '.join(missing[:3])}."
        if ai["ai_generated_probability"] > 70:
            suggestion += " Note: Content appears highly AI-generated."
            
        return f"Overall Match Score: {score}%. {suggestion}"

orchestrator = AnalysisOrchestrator()
