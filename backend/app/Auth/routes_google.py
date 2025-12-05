# app/Auth/routes_google.py

from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import RedirectResponse

from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_async_session
from .google import (
    build_google_auth_url,
    exchange_code_for_tokens,
    get_google_userinfo,
)
from .session import create_session_token
from .users_db import get_or_create_user_from_google

router = APIRouter(
    prefix="/auth/google",
    tags=["google-auth"],
)


@router.get("/login")
async def google_login(mode: str = "login"):
    """
    Редиректит пользователя на Google OAuth2.
    mode=login — логин с главной страницы (создаём юзера + JWT + редирект в /lab).
    mode=link  — привязка аккаунта в настройках (редирект с google_email/... в /lab).
    """
    auth_url = build_google_auth_url(state=mode)
    return RedirectResponse(auth_url)


@router.get("/callback")
async def google_callback(
    request: Request,
    code: str | None = None,
    error: str | None = None,
    state: str | None = None,
    session: AsyncSession = Depends(get_async_session),
):
    """
    Callback от Google.
    В зависимости от state (mode) работает как логин или как привязка.
    """
    if error:
        raise HTTPException(400, f"Google auth error: {error}")

    if not code:
        raise HTTPException(400, "Code not found in Google callback")

    mode = state or "login"

    try:
        # 1) Обменять code на токены
        token_data = await exchange_code_for_tokens(code.strip())
        access_token = token_data.get("access_token")
        if not access_token:
            raise Exception("No access_token in Google token response")

        # 2) Получить профиль пользователя
        userinfo = await get_google_userinfo(access_token)

        # ===== РЕЖИМ ПРИВЯЗКИ (Settings в /lab) =====
        if mode == "link":
            email = userinfo.get("email", "")
            name = userinfo.get("name", "")
            picture = userinfo.get("picture", "")

            front_url = (
                "https://fak1e-lab.ru/lab"
                f"?google_email={email}"
                f"&google_name={name}"
                f"&google_avatar={picture}"
            )
            return RedirectResponse(front_url)

        # ===== РЕЖИМ ЛОГИНА С ГЛАВНОЙ =====
        user = await get_or_create_user_from_google(session, userinfo)

        # Создаём JWT-сессию на основе user.id и провайдера
        session_token = create_session_token(
            user_id=str(user.id),
            providers=["google"],
        )

        # Редиректим в /lab с session
        front_url = f"https://fak1e-lab.ru/lab?session={session_token}"
        return RedirectResponse(front_url)

    except Exception as ex:
        raise HTTPException(400, f"Google auth failed: {ex}")
