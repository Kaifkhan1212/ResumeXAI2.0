from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..services.orchestrator import orchestrator
from ..models.analysis import ResumeAnalysis

router = APIRouter(tags=["Pipeline"])

@router.post("/full-analysis")
async def full_analysis(
    file: UploadFile = File(...),
    job_description: str = Form(...),
    db: Session = Depends(get_db)
):
    # Validate file
    allowed_exts = {".pdf", ".docx"}
    file_ext = "." + file.filename.split(".")[-1].lower() if "." in file.filename else ""
    
    if file_ext not in allowed_exts:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file type. Use PDF or DOCX."
        )

    # Read file content
    content = await file.read()
    
    try:
        # Run Pipeline
        result = await orchestrator.run_pipeline(content, file.filename, job_description)
        
        # Save to Database
        db_analysis = ResumeAnalysis(
            filename=file.filename,
            candidate_name=result.get("candidate_name", "Candidate"),
            resume_text=result["resume_text"],
            job_description=job_description,
            match_score=result["skill_match_score"],
            matched_skills=result["matched_skills"],
            missing_skills=result["missing_skills"],
            selection_probability=result["selection_likelihood"],
            ai_generated_probability=result["ai_generated_probability"],
            confidence_level=result["confidence_level"],
            ai_reasoning=result["ai_reasoning"],
            improvement_suggestions=result["improvement_suggestions"],
            overall_feedback=result["overall_feedback"],
            summary=result["summary"]
        )
        db.add(db_analysis)
        db.commit()
        db.refresh(db_analysis)
        
        # Prepare response (remove full text to keep it clean)
        response_data = result.copy()
        response_data.pop("resume_text", None)
        response_data["id"] = db_analysis.id
        
        return response_data

    except Exception as e:
        db.rollback()
        print("Analysis error:", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Resume analysis failed"
        )
