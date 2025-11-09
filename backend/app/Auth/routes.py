# app/Auth/routes.py

from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import RedirectResponse
from .config import FACEIT_CLIENT_ID, FACEIT_REDIRECT_URI
from .faceit import exchange_code_for_token, get_faceit_profile

router = APIRouter(
    prefix="/auth/faceit",
    tags=["faceit-auth"]
)

@router.get("/redirect")
async def faceit_redirect():
    """
    Перенаправляет пользователя на Faceit OAuth авторизацию.
    ВАЖНО: параметры должны 100% совпадать с dev.faceit.com!
    """
    url = (
        "https://www.faceit.com/oauth/authorize"
        f"?client_id={FACEIT_CLIENT_ID}"
        f"&redirect_uri={FACEIT_REDIRECT_URI}"
        f"&response_type=code"
    )
    return RedirectResponse(url)

@router.get("/callback")
async def faceit_callback(request: Request):
    """
    Callback: принимает code, получает токен, профиль, редиректит на фронт с данными
    """
    code = request.query_params.get("code")
    if not code:
        raise HTTPException(400, "Code not found in callback!")
    try:
        token_data = await exchange_code_for_token(code.strip())
        access_token = token_data.get("access_token")
        if not access_token:
            raise Exception("Token exchange failed: нет access_token")
        profile = await get_faceit_profile(access_token)
        # ВАЖНО! front_url теперь тоже должен быть ТВОЙ АКТУАЛЬНЫЙ ПУБЛИЧНЫЙ URL!
        front_url = (
            f"https://early-bats-wave.loca.lt/lab"
            f"?faceit_id={profile.get('player_id', '')}"
            f"&nickname={profile.get('nickname', '')}"
            f"&avatar={profile.get('avatar', '')}"
        )
        return RedirectResponse(front_url)
    except Exception as ex:
        # На фронт с ошибкой — чтобы видеть причину прямо в адресе
        return RedirectResponse(
            f"https://early-bats-wave.loca.lt/lab?error={str(ex)}"
        )
