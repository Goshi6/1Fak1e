# app/Auth/routes.py

from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import RedirectResponse
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
    Перенаправляет пользователя на Faceit OAuth авторизацию.
    ВАЖНО: redirect_uri должен 1 в 1 совпадать с тем, что указано в Faceit Developer.
    """
    url = (
        f"{FACEIT_AUTHORIZE_URL}"
        f"?client_id={FACEIT_CLIENT_ID}"
        f"&redirect_uri={FACEIT_REDIRECT_URI}"
        f"&response_type=code"
        f"&scope=openid%20profile"  # можно сузить/расширить по необходимости
    )
    return RedirectResponse(url)


@router.get("/callback")
async def faceit_callback(request: Request):
    """
    Callback: принимает code, получает токен, профиль, редиректит на фронт с данными.
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

        # Путь на твой фронт (lab/settings) на fak1e-lab.ru
        front_url = (
            "https://fak1e-lab.ru/lab"
            f"?faceit_id={profile.get('player_id', '')}"
            f"&nickname={profile.get('nickname', '')}"
            f"&avatar={profile.get('avatar', '')}"
        )
        return RedirectResponse(front_url)

    except Exception as ex:
        # Редирект на фронт с ошибкой в query, чтобы можно было дебажить
        return RedirectResponse(
            f"https://fak1e-lab.ru/lab?error={str(ex)}"
        )
