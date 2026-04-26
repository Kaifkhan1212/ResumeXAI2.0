import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

# Load .env file explicitly for non-pydantic usages if any
load_dotenv()

class Settings(BaseSettings):
    APP_NAME: str = "AI Resume Analyzer"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/resume_db"

    # Security
    SECRET_KEY: str = "your-secret-key-change-me"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # AI Services
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""

    # Google OAuth
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""

    # Pydantic v2 configuration for loading from .env
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False, # Changed to False for better compatibility
        extra="ignore"
    )

settings = Settings()
# Masked log for debugging
db_url_start = settings.DATABASE_URL.split('@')[-1] if '@' in settings.DATABASE_URL else settings.DATABASE_URL
print(f"DATABASE_URL detected: ...@{db_url_start}")
