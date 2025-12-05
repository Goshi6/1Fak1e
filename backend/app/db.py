# app/db.py
import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set in environment")

# Async engine
engine = create_async_engine(DATABASE_URL, echo=False, future=True)

# Базовый класс для моделей
class Base(DeclarativeBase):
    pass

# Фабрика сессий
async_session_maker = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# dependency для FastAPI
async def get_async_session() -> AsyncSession:
    async with async_session_maker() as session:
        yield session
