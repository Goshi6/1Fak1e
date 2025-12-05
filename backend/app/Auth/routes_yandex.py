# app/Auth/routes_yandex.py

from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import RedirectResponse

from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_async_session
from .yandex import (
    build_yandex_auth_url,
    exchange_code_for_tokens,
    get_yandex_userinfo,
)
from .session import create_session_token
from .users_db import get_or_create_user_from_yandex

router = APIRouter(
    prefix="/auth/yandex",
    tags=["yandex-auth"],
)


@router.get("/login")
async def yandex_login(mode: str = "login"):
    """
    Редиректит пользователя на Яндекс OAuth.
    mode=login — логин с главной страницы.
    mode=link  — привязка аккаунта в настройках.
    """
    auth_url = build_yandex_auth_url(state=mode)
    return RedirectResponse(auth_url)


@router.get("/callback")
async def yandex_callback(
    request: Request,
    code: str | None = None,
    error: str | None = None,
    state: str | None = None,
    session: AsyncSession = Depends(get_async_session),
):
    """
    Callback от Яндекса.
    """
    if error:
        raise HTTPException(400, f"Yandex auth error: {error}")

    if not code:
        raise HTTPException(400, "Code not found in Yandex callback")

    mode = state or "login"

    try:
        # 1) Обменять code на токен
        token_data = await exchange_code_for_tokens(code.strip())
        access_token = token_data.get("access_token")
        if not access_token:
            raise Exception("No access_token in Yandex token response")

        # 2) Получить профиль
        userinfo = await get_yandex_userinfo(access_token)

        # ===== РЕЖИМ ПРИВЯЗКИ (Settings в /lab) =====
        if mode == "link":
            yandex_id = userinfo.get("id", "")
            email = userinfo.get("default_email", "")
            name = userinfo.get("real_name", "") or userinfo.get("login", "")

            front_url = (
                "https://fak1e-lab.ru/lab"
                f"?yandex_id={yandex_id}"
                f"&yandex_email={email}"
                f"&yandex_name={name}"
            )
            return RedirectResponse(front_url)

        # ===== РЕЖИМ ЛОГИНА С ГЛАВНОЙ =====
        user = await get_or_create_user_from_yandex(session, userinfo)

        session_token = create_session_token(
            user_id=str(user.id),
            providers=["yandex"],
        )

        front_url = f"https://fak1e-lab.ru/lab?session={session_token}"
        return RedirectResponse(front_url)

    except Exception as ex:
        raise HTTPException(400, f"Yandex auth failed: {ex}")
