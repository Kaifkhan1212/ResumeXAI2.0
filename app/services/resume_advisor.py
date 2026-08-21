import re
import json
from groq import Groq
from fastapi import HTTPException, status
from ..core.config import settings
from ..core.groq_helper import execute_groq_call, parse_json_from_response

class ResumeAdvisorService:
    def __init__(self):
        if settings.GROQ_API_KEY:
            self.client = Groq(api_key=settings.GROQ_API_KEY)
            self.model_id = settings.GROQ_MODEL_ID
        else:
            self.client = None
            self.model_id = None

    async def generate_resume_suggestions(self, resume_text: str, jd_text: str, missing_skills: list, match_score: float) -> dict:
        fallback_suggestions = [
            "Add missing technologies such as AWS, Docker, or Microservices.",
            "Include project descriptions demonstrating real-world experience.",
            "Quantify achievements with measurable results."
        ]
        
        fallback_response = {
            "improvement_suggestions": fallback_suggestions,
            "overall_feedback": "AI summary unavailable. Please review missing skills and improve your resume."
        }

        if not self.client or not resume_text or resume_text.startswith("ERROR:"):
            return fallback_response

        prompt = f"""
        Act as an expert senior executive recruiter and career advisor. Analyze the following resume against the job description with extreme detail.
        
        Resume:
        {resume_text[:4000]}
        
        Job Description:
        {jd_text[:4000]}
        
        Identified Gaps (Missing Skills):
        {', '.join(missing_skills)}
        
        Current Match Score: {match_score}%
        
        Provide high-level, actionable, and personalized suggestions to transform this resume into a top-tier candidate profile.
        
        Return the result STRICTLY as a JSON object with the following structure:
        {{
            "improvement_suggestions": [
                "Detailed Suggestion 1 (Mention specific resume locations and exact technical phrases to add)",
                "Detailed Suggestion 2", 
                "Detailed Suggestion 3",
                "Detailed Suggestion 4",
                "Detailed Suggestion 5",
                "Detailed Suggestion 6"
            ],
            "overall_feedback": "A thorough, multi-paragraph (at least 200 words) deep-dive evaluation of the resume's strengths, critical technical gaps, formatting improvements, and overall narrative impact. Talk about how the candidate can specifically bridge the {100 - match_score}% gap."
        }}
        """

        try:
            messages = [
                {"role": "system", "content": "You are an expert senior executive recruiter and career advisor. Return all insights strictly as valid raw JSON with NO extra explanation outside JSON."},
                {"role": "user", "content": prompt}
            ]
            response = await execute_groq_call(self.client, self.model_id, messages)
            
            try:
                content = response.choices[0].message.content
                result = parse_json_from_response(content)
                return result
            except Exception as json_err:
                print(f"Groq JSON Parsing Error: {json_err}")
                return fallback_response

        except Exception as e:
            print(f"Groq Advisor Error: {e}")
            return fallback_response

resume_advisor_service = ResumeAdvisorService()

