# app/Auth/routes_google.py

from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from .google import (
    build_google_auth_url,
    exchange_code_for_tokens,
    get_google_userinfo,
)

router = APIRouter(
    prefix="/auth/google",
    tags=["google-auth"],
)


@router.get("/login")
async def google_login():
    """
    Редиректит пользователя на Google OAuth2 для логина.
    """
    # Пока state не используем, потом можно подвесить CSRF/redirect-back
    auth_url = build_google_auth_url()
    return RedirectResponse(auth_url)


@router.get("/callback")
async def google_callback(code: str | None = None, error: str | None = None):
    """
    Callback от Google:
    - если есть error -> кидаем ошибку,
    - если есть code -> меняем на токен, берём профиль,
      а дальше (пока) просто редиректим на фронт с email/именем в query.
    """
    if error:
        # Google может прислать error, например access_denied
        raise HTTPException(400, f"Google auth error: {error}")

    if not code:
        raise HTTPException(400, "Code not found in Google callback")

    try:
        # 1) Обменять code на токены
        token_data = await exchange_code_for_tokens(code.strip())
        access_token = token_data.get("access_token")
        if not access_token:
            raise Exception("No access_token in Google token response")

        # 2) Получить профиль пользователя
        userinfo = await get_google_userinfo(access_token)

        # На этом этапе по-хорошему:
        # - найти/создать пользователя в БД по userinfo["email"] или ["id"]
        # - создать свою сессию (JWT/кука)
        # Пока упростим: просто перекидываем данные на фронт через query

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

    except Exception as ex:
        raise HTTPException(400, f"Google auth failed: {ex}")
