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

# app/db.py (НИЖЕ всех объявлений)

from sqlalchemy import text

async def init_models():
    """
    Одноразовое создание таблиц по моделям.
    В проде лучше делать через Alembic.
    """
    async with engine.begin() as conn:
        # ВАЖНО: импортировать модели, чтобы они зарегистрировались в Base.metadata
        from app import models  # noqa: F401
        await conn.run_sync(Base.metadata.create_all)
