# app/Auth/routes.py

from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import BaseModel

from .config import FACEIT_CLIENT_ID, FACEIT_REDIRECT_URI
from .faceit import exchange_code_for_token, get_faceit_profile

router = APIRouter(
    prefix="/auth/faceit",
    tags=["faceit-auth"],
)

# Актуальный OAuth endpoint Faceit (через accounts)
FACEIT_AUTHORIZE_URL = "https://accounts.faceit.com/oauth2/authorize"


@router.get("/redirect")
async def faceit_redirect():
    """
    Старый вариант редиректа с бэка (теперь не обязателен, PKCE стартуем с фронта).
    """
    url = (
        f"{FACEIT_AUTHORIZE_URL}"
        f"?client_id={FACEIT_CLIENT_ID}"
        f"&redirect_uri={FACEIT_REDIRECT_URI}"
        f"&response_type=code"
        f"&scope=openid%20profile"
    )
    return RedirectResponse(url)


@router.get("/callback")
async def faceit_callback(code: str | None = None):
    """
    Сюда возвращает Faceit после авторизации с ?code=...
    Просто кидаем пользователя на фронт с этим code,
    дальше фронт сделает запрос /complete с code + code_verifier (PKCE).
    """
    if not code:
        raise HTTPException(400, "Code not found in callback!")

    front_url = f"https://fak1e-lab.ru/lab?faceit_code={code}"
    return RedirectResponse(front_url)


class FaceitCompleteRequest(BaseModel):
    code: str
    code_verifier: str


@router.post("/complete")
async def faceit_complete(body: FaceitCompleteRequest):
    """
    Принимает code + code_verifier от фронта (PKCE), меняет code на токен,
    получает профиль и отдает данные в JSON.
    """
    try:
        token_data = await exchange_code_for_token(
            body.code.strip(), body.code_verifier.strip()
        )
        access_token = token_data.get("access_token")
        if not access_token:
            raise Exception("Token exchange failed: нет access_token")

        profile = await get_faceit_profile(access_token)

        return {
            "player_id": profile.get("player_id", ""),
            "nickname": profile.get("nickname", ""),
            "avatar": profile.get("avatar", ""),
        }
    except Exception as ex:
        raise HTTPException(400, f"Faceit auth failed: {ex}")
