import asyncio
import json
import os
from groq import Groq
from dotenv import load_dotenv
from typing import List, Set, Dict, Any

load_dotenv()

async def debug_semantic_match():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        print("GROQ_API_KEY not found")
        return

    client = Groq(api_key=api_key)
    model_id = 'llama-3.3-70b-versatile'

    jd_skills = ["Python", "FastAPI or Django", "PostgreSQL", "REST APIs", "Docker", "AWS", "Git", "CI & CD"]
    resume_text = """
    TECHNICAL SKILLS
    Programming Languages: Java, Python, C#, C++
    Core Concepts: Data Structures & Algorithms, Object-Oriented Programming (OOP), MVC Architecture
    Databases: MySQL, Supabase, SQL
    Software Development: Testing, Code Optimization
    DevOps Tools: Git, GitHub, basic CI/CD, Version Control
    AI/ML: Fundamentals of Machine Learning, Supervised & Unsupervised Learning, Scikit-learn, TensorFlow
    Libraries & Frameworks: NumPy, Pandas
    Soft Skills: Critical Thinking & Problem Solving, Emotional Intelligence, Teamwork & Collaboration
    """

    prompt = f"""
    Identify which of the following Job Requirements are met by the candidate based on their Resume.

    REQUIRED SKILLS FROM JOB DESCRIPTION:
    {', '.join(jd_skills)}

    CANDIDATE RESUME CONTENT:
    {resume_text}

    EVALUATION RULES:
    1. SMART MATCHING: Mark a skill as 'Matched' if the candidate has it OR demonstrates equivalent competency.
       - Examples: 'MySQL' counts for 'PostgreSQL' (Relational DB competency). 'RESTful' counts for 'REST APIs'. 'Git' counts for 'Version Control'. 'basic CI/CD' matches 'CI/CD basics'.
    2. BE FAIR: Don't be pedantic about exact wording.
    3. EXTRACT GAPS: Only mark as 'Missing' if there is no evidence of the skill or a reasonable equivalent.

    Return STRICTLY a JSON object:
    {{
        "matched_skills": ["SkillName1", "SkillName2"],
        "missing_skills": ["SkillName3"],
        "explanation": "Brief technical reasoning for the matches"
    }}
    """

    print("Sending prompt to Groq...")
    response = client.chat.completions.create(
        model=model_id,
        messages=[
            {"role": "system", "content": "You are a specialized technical recruiter performing semantic skill matching. Respond ONLY in JSON."},
            {"role": "user", "content": prompt}
        ],
        response_format={"type": "json_object"},
    )
    
    data = json.loads(response.choices[0].message.content)
    print("AI Response:")
    print(json.dumps(data, indent=2))

    # Test the mapping logic
    matched = data.get("matched_skills", [])
    final_matched = []
    final_missing = []
    for skill in jd_skills:
        if any(m.lower() in skill.lower() or skill.lower() in m.lower() for m in matched):
            final_matched.append(skill)
        else:
            final_missing.append(skill)
            
    print("\nFinal Results:")
    print(f"Matched: {final_matched}")
    print(f"Missing: {final_missing}")

if __name__ == "__main__":
    asyncio.run(debug_semantic_match())
