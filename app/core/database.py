from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# Create engine with explicit SSL mode and connection pinging for cloud databases
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    connect_args={"sslmode": "require"} if "render.com" in settings.DATABASE_URL else {}
)

# Session local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
