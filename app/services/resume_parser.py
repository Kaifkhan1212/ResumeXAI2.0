import io
import re
from typing import Optional
import pypdf
import pdfplumber
import PyPDF2
from docx import Document
from fastapi import HTTPException, status

class ResumeParserService:
    @staticmethod
    def clean_text(text: str) -> str:
        """
        Cleans extracted text by normalizing whitespace while preserving Unicode punctuation.
        """
        if not text:
            return ""
        # Normalize whitespace (replace multiple spaces/newlines with single space)
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

    async def parse_pdf(self, file_content: bytes) -> str:
        text = ""
        # Stage 1: Try pdfplumber (best for multi-column, layout & tables)
        try:
            with pdfplumber.open(io.BytesIO(file_content)) as pdf:
                pages_text = []
                for page in pdf.pages:
                    page_t = page.extract_text()
                    if page_t:
                        pages_text.append(page_t)
                text = " ".join(pages_text)
        except Exception as e:
            print(f"pdfplumber extraction error: {e}")

        # Stage 2: Fall back to pypdf if pdfplumber returns empty
        if not text.strip():
            try:
                reader = pypdf.PdfReader(io.BytesIO(file_content))
                pages_text = [p.extract_text() or "" for p in reader.pages]
                text = " ".join(pages_text)
            except Exception as e:
                print(f"pypdf extraction error: {e}")

        # Stage 3: Fall back to PyPDF2
        if not text.strip():
            try:
                reader = PyPDF2.PdfReader(io.BytesIO(file_content))
                pages_text = [p.extract_text() or "" for p in reader.pages]
                text = " ".join(pages_text)
            except Exception as e:
                print(f"PyPDF2 extraction error: {e}")

        cleaned = self.clean_text(text)
        if not cleaned:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not extract readable text from PDF file. Please ensure it is not scanned/empty."
            )
        return cleaned

    async def parse_docx(self, file_content: bytes) -> str:
        try:
            doc = Document(io.BytesIO(file_content))
            text = "\n".join([para.text for para in doc.paragraphs])
            cleaned = self.clean_text(text)
            if not cleaned:
                raise ValueError("DOCX file contains no text.")
            return cleaned
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to extract text from DOCX: {str(e)}"
            )

    async def extract_text(self, file_content: bytes, filename: str) -> str:
        if not file_content:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File is empty"
            )

        lower_filename = filename.lower()
        if lower_filename.endswith(".pdf"):
            return await self.parse_pdf(file_content)
        elif lower_filename.endswith(".docx"):
            return await self.parse_docx(file_content)
        elif lower_filename.endswith(".txt"):
            return self.clean_text(file_content.decode('utf-8', errors='ignore'))
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported file type. Only PDF, DOCX, and TXT are allowed."
            )

resume_parser_service = ResumeParserService()

