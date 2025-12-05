import asyncio
from app.db import engine, Base
# ВАЖНО: импортировать модели, чтобы они зарегистрировались в Base.metadata
from app import models  # noqa: F401


async def main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


if __name__ == "__main__":
    asyncio.run(main())
