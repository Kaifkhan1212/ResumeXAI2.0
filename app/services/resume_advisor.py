import json
from groq import Groq
from fastapi import HTTPException, status
from ..core.config import settings

class ResumeAdvisorService:
    def __init__(self):
        if settings.GROQ_API_KEY:
            self.client = Groq(api_key=settings.GROQ_API_KEY)
            self.model_id = 'llama-3.3-70b-versatile'
        else:
            self.client = None
            self.model_id = None

    async def generate_resume_suggestions(self, resume_text: str, jd_text: str, missing_skills: list, match_score: float) -> dict:
        # Default/Fallback Suggestions based on requirements
        fallback_suggestions = [
            "Add missing technologies such as AWS, Docker, or Microservices.",
            "Include project descriptions demonstrating real-world experience.",
            "Quantify achievements with measurable results."
        ]
        
        fallback_response = {
            "improvement_suggestions": fallback_suggestions,
            "overall_feedback": "AI summary unavailable. Please review missing skills and improve your resume."
        }

        # Validation check before calling the model
        if not self.client:
            return fallback_response

        prompt = f"""
        Act as an expert senior executive recruiter and career advisor. Analyze the following resume against the job description with extreme detail.
        
        Resume:
        {resume_text}
        
        Job Description:
        {jd_text}
        
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
            # Main model execution with error handling
            response = self.client.chat.completions.create(
                model=self.model_id,
                messages=[
                    {"role": "system", "content": "You are an expert senior executive recruiter and career advisor. Return all insights in STRICT JSON format."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
            )
            
            try:
                result = json.loads(response.choices[0].message.content)
                return result
            except json.JSONDecodeError:
                print(f"Groq JSON Parsing Error: {response.text}")
                return fallback_response

        except Exception as e:
            # Log Groq errors clearly for debugging
            print(f"Groq Error: {e}")
            import traceback
            traceback.print_exc()
            return fallback_response

resume_advisor_service = ResumeAdvisorService()
