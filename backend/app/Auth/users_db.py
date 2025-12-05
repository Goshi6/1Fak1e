# app/Auth/users_db.py
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import User, OAuthAccount


async def get_user_with_providers(session: AsyncSession, user_id: int) -> Optional[User]:
    result = await session.execute(
        select(User).where(User.id == user_id).options()
    )
    return result.scalar_one_or_none()


async def get_or_create_user_from_google(
    session: AsyncSession,
    userinfo: dict,
) -> User:
    # У Google в userinfo обычно есть "sub" (id) и "email"
    provider = "google"
    provider_user_id = userinfo.get("sub") or userinfo.get("id")
    email = userinfo.get("email")

    if not provider_user_id and not email:
        raise ValueError("No id or email from Google userinfo")

    # Сначала ищем по oauth_accounts
    stmt = select(User).join(OAuthAccount).where(
        OAuthAccount.provider == provider,
        OAuthAccount.provider_user_id == provider_user_id,
    )
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()

    # Если не нашли по связке, пробуем по email
    if not user and email:
        stmt_email = select(User).where(User.email == email)
        result_email = await session.execute(stmt_email)
        user = result_email.scalar_one_or_none()

    # Если юзера всё ещё нет — создаём
    if not user:
        user = User(
            email=email,
            name=userinfo.get("name") or "Пользователь",
            avatar_url=userinfo.get("picture") or "",
        )
        session.add(user)
        await session.flush()  # чтобы получить user.id

    # Обеспечиваем наличие записи в oauth_accounts
    stmt_oauth = select(OAuthAccount).where(
        OAuthAccount.provider == provider,
        OAuthAccount.provider_user_id == provider_user_id,
        OAuthAccount.user_id == user.id,
    )
    result_oauth = await session.execute(stmt_oauth)
    oauth = result_oauth.scalar_one_or_none()

    if not oauth:
        oauth = OAuthAccount(
            user_id=user.id,
            provider=provider,
            provider_user_id=provider_user_id,
        )
        session.add(oauth)

    await session.commit()
    await session.refresh(user)
    return user


async def get_or_create_user_from_yandex(
    session: AsyncSession,
    userinfo: dict,
) -> User:
    provider = "yandex"
    provider_user_id = userinfo.get("id")
    email = userinfo.get("default_email")

    if not provider_user_id and not email:
        raise ValueError("No id or email from Yandex userinfo")

    # Ищем по oauth_accounts
    stmt = select(User).join(OAuthAccount).where(
        OAuthAccount.provider == provider,
        OAuthAccount.provider_user_id == provider_user_id,
    )
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()

    # Пробуем по email
    if not user and email:
        stmt_email = select(User).where(User.email == email)
        result_email = await session.execute(stmt_email)
        user = result_email.scalar_one_or_none()

    if not user:
        name = (
            userinfo.get("real_name")
            or userinfo.get("first_name")
            or userinfo.get("login")
            or "Пользователь"
        )
        user = User(
            email=email,
            name=name,
            avatar_url="",
        )
        session.add(user)
        await session.flush()

    stmt_oauth = select(OAuthAccount).where(
        OAuthAccount.provider == provider,
        OAuthAccount.provider_user_id == provider_user_id,
        OAuthAccount.user_id == user.id,
    )
    result_oauth = await session.execute(stmt_oauth)
    oauth = result_oauth.scalar_one_or_none()

    if not oauth:
        oauth = OAuthAccount(
            user_id=user.id,
            provider=provider,
            provider_user_id=provider_user_id,
        )
        session.add(oauth)

    await session.commit()
    await session.refresh(user)
    return user
