# app/Auth/routes_me.py

from fastapi import APIRouter, Header, HTTPException, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_async_session
from app.models import User, OAuthAccount
from .session import verify_session_token

router = APIRouter(
    prefix="/auth",
    tags=["auth-me"],
)


@router.get("/me")
async def get_me(
    authorization: str | None = Header(default=None),
    session: AsyncSession = Depends(get_async_session),
):
    """
    Возвращает текущего пользователя по JWT токену в заголовке Authorization: Bearer <token>.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "No Authorization header")

    token = authorization.split(" ", 1)[1]
    payload = verify_session_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(401, "Invalid token payload")

    # грузим юзера
    stmt = select(User).where(User.id == int(user_id))
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(404, "User not found")

    # грузим привязанные провайдеры
    stmt_providers = select(OAuthAccount).where(OAuthAccount.user_id == user.id)
    result_providers = await session.execute(stmt_providers)
    providers = result_providers.scalars().all()

    provider_names = {p.provider for p in providers}

    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "avatar_url": user.avatar_url,
        "providers": list(provider_names),
    }
