import re
import json
from groq import Groq
from typing import List, Set, Dict, Any
from ..core.config import settings
from ..core.groq_helper import execute_groq_call, parse_json_from_response

class SkillMatcherService:
    def __init__(self):
        if settings.GROQ_API_KEY:
            self.client = Groq(api_key=settings.GROQ_API_KEY)
            self.model_id = settings.GROQ_MODEL_ID
        else:
            self.client = None
            self.model_id = None

    async def _extract_skills_ai(self, text: str, context: str = "resume") -> Set[str]:
        """
        Extract professional technical skills from text using AI.
        Filters out generic words and normalizes terms.
        """
        if not self.client or not text or text.startswith("ERROR:"):
            return set()

        prompt = f"""
        Extract a comprehensive list of technical skills, frameworks, tools, and professional competencies from the following {context}.
        RULES:
        1. Return ONLY actual technical skills (e.g., 'React', 'Python', 'AWS').
        2. DO NOT include generic words like 'Experienced', 'Teamwork', 'Project', 'Stack', 'Developer'.
        3. Normalize common abbreviations (e.g., 'js' to 'JavaScript', 'aws' to 'AWS').
        4. Return the result STRICTLY as a JSON array of strings.
        
        {context.capitalize()} Text:
        {text[:4000]}
        """

        try:
            messages = [
                {"role": "system", "content": "You are a specialized technical skill extractor. Return ONLY raw valid JSON (array of strings or object)."},
                {"role": "user", "content": prompt}
            ]
            response = await execute_groq_call(self.client, self.model_id, messages)
            data = parse_json_from_response(response.choices[0].message.content)
            
            # Robust extraction: Look for a list in common keys, or take the first list found
            skills = []
            if isinstance(data, list):
                skills = data
            elif isinstance(data, dict):
                for key in ["skills", "extracted_skills", "technical_skills", "professional_skills"]:
                    if key in data and isinstance(data[key], list):
                        skills = data[key]
                        break
                if not skills:
                    for val in data.values():
                        if isinstance(val, list):
                            skills = val
                            break
            
            return {str(s).lower().strip() for s in skills if s}
        except Exception as e:
            print(f"AI Skill Extraction Error ({context}): {e}")
            return set()

    def _extract_keywords_fallback(self, text: str) -> set:
        if not text:
            return set()
        text = text.lower()
        text = re.sub(r'[^a-z0-9\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        
        stop_words = {'and', 'the', 'for', 'with', 'from', 'that', 'this', 'using', 'working', 'experienced', 'stack', 'full', 'hiring', 'developer', 'apis'}
        words = set(re.findall(r'\b[a-z]{2,}\b', text))
        return words - stop_words

    async def _semantic_match(self, resume_text: str, jd_skills: List[str]) -> dict:
        if not self.client or not jd_skills:
            return {"skill_match_score": 0.0, "matched_skills": [], "missing_skills": sorted(jd_skills)}

        prompt = f"""
        Analyze the candidate's resume against the following list of Job Requirements.

        REQUIRED SKILLS:
        {json.dumps(jd_skills, indent=2)}

        CANDIDATE RESUME:
        {resume_text[:6000]}

        EVALUATION TASK:
        For EACH skill in the 'REQUIRED SKILLS' list, determine if it is:
        - "Matched": Candidate has the skill OR a clear equivalent/synonym.
        - "Missing": No evidence of the skill or equivalent experience.

        SMART MATCHING EXAMPLES:
        - JD: "PostgreSQL" | Resume: "MySQL" -> RESULT: "Matched" (Logic: Strong Relational DB competency)
        - JD: "REST APIs" | Resume: "FastAPI endpoints" -> RESULT: "Matched" (Logic: Equivalent tech)
        - JD: "CI/CD basics" | Resume: "basic CI/CD" -> RESULT: "Matched" (Logic: Exact semantic match)

        OUTPUT RULES:
        1. Return ONLY a JSON object.
        2. Use the EXACT skill names from the 'REQUIRED SKILLS' list.
        3. Be generous with related technical competencies.

        Return Format:
        {{
            "analysis": [
                {{
                    "skill": "Exact Skill Name from JD",
                    "status": "Matched" or "Missing",
                    "reason": "Brief technical evidence"
                }}
            ]
        }}
        """

        try:
            messages = [
                {"role": "system", "content": "You are a technical recruiting expert. Return raw valid JSON with an 'analysis' array of skills."},
                {"role": "user", "content": prompt}
            ]
            response = await execute_groq_call(self.client, self.model_id, messages)
            data = parse_json_from_response(response.choices[0].message.content)
            
            analysis = []
            if isinstance(data, list):
                analysis = data
            elif isinstance(data, dict):
                if "analysis" in data and isinstance(data["analysis"], list):
                    analysis = data["analysis"]
                else:
                    for v in data.values():
                        if isinstance(v, list):
                            analysis = v
                            break

            final_matched = []
            final_missing = []
            
            # Map back based on AI's 'status' field for each JD skill
            for item in analysis:
                if not isinstance(item, dict):
                    continue
                skill_name = item.get("skill") or item.get("name") or ""
                status = item.get("status", "Missing")
                
                # Check if this skill exists in our original JD list (case-insensitive mapping)
                original_skill = next((s for s in jd_skills if s.lower() == str(skill_name).lower()), None)
                
                if original_skill:
                    if str(status).lower() in ["matched", "true", "yes", "present"]:
                        if original_skill not in final_matched:
                            final_matched.append(original_skill)
                    else:
                        if original_skill not in final_missing:
                            final_missing.append(original_skill)
            
            # Fallback 1: Direct text search check to guarantee skills present in resume are NEVER missed
            resume_text_lower = resume_text.lower()
            for s in jd_skills:
                s_lower = s.lower().strip()
                pattern = r'\b' + re.escape(s_lower) + r'\b'
                if re.search(pattern, resume_text_lower) or (len(s_lower) > 3 and s_lower in resume_text_lower):
                    if s not in final_matched:
                        final_matched.append(s)
                    if s in final_missing:
                        final_missing.remove(s)

            # Fallback 2: Any unanalyzed skill default to missing
            for s in jd_skills:
                if s not in final_matched and s not in final_missing:
                    final_missing.append(s)

            score = round((len(final_matched) / len(jd_skills)) * 100, 2) if jd_skills else 0.0

            return {
                "skill_match_score": score,
                "matched_skills": sorted(final_matched),
                "missing_skills": sorted(final_missing)
            }
        except Exception as e:
            print(f"Semantic Matching Error: {e}")
            # Text-based keyword matching fallback on LLM failure
            final_matched = []
            final_missing = []
            resume_text_lower = resume_text.lower()
            for s in jd_skills:
                s_lower = s.lower().strip()
                if s_lower in resume_text_lower:
                    final_matched.append(s)
                else:
                    final_missing.append(s)
            score = round((len(final_matched) / len(jd_skills)) * 100, 2) if jd_skills else 0.0
            return {
                "skill_match_score": score,
                "matched_skills": sorted(final_matched),
                "missing_skills": sorted(final_missing)
            }

    async def match_resume_to_jd(self, resume_text: str, jd_text: str) -> dict:
        """
        Calculates match score based on AI-powered semantic matching.
        """
        if not resume_text.strip() or not jd_text.strip():
            return {"skill_match_score": 0.0, "matched_skills": [], "missing_skills": []}

        # 1. Extract the "Source of Truth" skills from the JD
        jd_skills = await self._extract_skills_ai(jd_text, "job description")
        if not jd_skills:
            jd_skills = self._extract_keywords_fallback(jd_text)

        if not jd_skills:
            return {"skill_match_score": 0.0, "matched_skills": [], "missing_skills": []}

        # 2. Perform Semantic Matching against the Resume
        return await self._semantic_match(resume_text, list(jd_skills))

skill_matcher_service = SkillMatcherService()
