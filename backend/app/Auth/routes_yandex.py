# app/Auth/routes_yandex.py

from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from .yandex import (
    build_yandex_auth_url,
    exchange_code_for_tokens,
    get_yandex_userinfo,
)

router = APIRouter(
    prefix="/auth/yandex",
    tags=["yandex-auth"],
)


@router.get("/login")
async def yandex_login():
    """
    Редиректит пользователя на Яндекс OAuth для логина.
    """
    auth_url = build_yandex_auth_url()
    return RedirectResponse(auth_url)


@router.get("/callback")
async def yandex_callback(code: str | None = None, error: str | None = None):
    """
    Callback от Яндекса.
    """
    if error:
        raise HTTPException(400, f"Yandex auth error: {error}")

    if not code:
        raise HTTPException(400, "Code not found in Yandex callback")

    try:
        # 1) Обменять code на токен
        token_data = await exchange_code_for_tokens(code.strip())
        access_token = token_data.get("access_token")
        if not access_token:
            raise Exception("No access_token in Yandex token response")

        # 2) Получить профиль
        userinfo = await get_yandex_userinfo(access_token)

        # Яндекс возвращает структуру:
        # {
        #   "id": "123456789",
        #   "login": "username",
        #   "first_name": "Иван",
        #   "last_name": "Иванов",
        #   "real_name": "Иван Иванов",
        #   "emails": ["user@yandex.ru"],
        #   "default_email": "user@yandex.ru",
        #   "sex": "m",
        #   "default_phone": {...},
        #   ...
        # }

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

    except Exception as ex:
        raise HTTPException(400, f"Yandex auth failed: {ex}")
