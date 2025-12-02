# app/Auth/yandex.py

import httpx
from urllib.parse import urlencode

from .config import (
    YANDEX_CLIENT_ID,
    YANDEX_CLIENT_SECRET,
    YANDEX_REDIRECT_URI,
)

# Яндекс OAuth2 endpoints
YANDEX_AUTH_URL = "https://oauth.yandex.ru/authorize"
YANDEX_TOKEN_URL = "https://oauth.yandex.ru/token"
YANDEX_USERINFO_URL = "https://login.yandex.ru/info"


def build_yandex_auth_url(state: str | None = None) -> str:
    """
    Собирает URL для редиректа на Яндекс OAuth.
    """
    params = {
        "response_type": "code",
        "client_id": YANDEX_CLIENT_ID,
        "redirect_uri": YANDEX_REDIRECT_URI,
    }
    if state:
        params["state"] = state

    return f"{YANDEX_AUTH_URL}?{urlencode(params)}"


async def exchange_code_for_tokens(code: str) -> dict:
    """
    Обменивает authorization code на access_token.
    """
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": YANDEX_CLIENT_ID,
        "client_secret": YANDEX_CLIENT_SECRET,
    }

    async with httpx.AsyncClient() as client:
        resp = await client.post(YANDEX_TOKEN_URL, data=data)
        resp.raise_for_status()
        return resp.json()


async def get_yandex_userinfo(access_token: str) -> dict:
    """
    Получает профиль пользователя по access_token.
    """
    headers = {"Authorization": f"OAuth {access_token}"}
    async with httpx.AsyncClient() as client:
        resp = await client.get(YANDEX_USERINFO_URL, headers=headers)
        resp.raise_for_status()
        return resp.json()
