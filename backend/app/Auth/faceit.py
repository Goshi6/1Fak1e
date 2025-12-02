# app/Auth/faceit.py

import httpx
from .config import FACEIT_CLIENT_ID, FACEIT_CLIENT_SECRET, FACEIT_REDIRECT_URI

# Актуальный OAuth2 token endpoint Faceit
FACEIT_TOKEN_URL = "https://accounts.faceit.com/api/oauth/token"


async def exchange_code_for_token(code: str) -> dict:
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": FACEIT_REDIRECT_URI,
        "client_id": FACEIT_CLIENT_ID,
        "client_secret": FACEIT_CLIENT_SECRET,
    }
    # ВАЖНО: используем data, а не json — токен выдается только если флоу полностью валидный
    async with httpx.AsyncClient() as client:
        resp = await client.post(FACEIT_TOKEN_URL, data=data)
        resp.raise_for_status()
        return resp.json()


async def get_faceit_profile(access_token: str) -> dict:
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            "https://open.faceit.com/data/v4/users/me",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        resp.raise_for_status()
        return resp.json()
