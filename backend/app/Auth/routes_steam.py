# app/Auth/routes_steam.py

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import RedirectResponse
from urllib.parse import urlencode, parse_qs
import httpx

from .config import STEAM_API_KEY, STEAM_RETURN_URL
from app.models import User, OAuthAccount
from app.db import async_session  # если у тебя по-другому называется, подправь
from sqlalchemy import select

router = APIRouter(
    prefix="/auth/steam",
    tags=["steam-auth"],
)

STEAM_OPENID_URL = "https://steamcommunity.com/openid/login"


@router.get("/login")
async def steam_login(mode: str = "link"):
    """
    Старт Steam OpenID авторизации.
    """
    if not STEAM_RETURN_URL:
        raise HTTPException(500, "STEAM_RETURN_URL is not configured")

    params = {
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to": STEAM_RETURN_URL,
        "openid.realm": "https://fak1e-lab.ru",
        "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    }
    url = f"{STEAM_OPENID_URL}?{urlencode(params)}"
    return RedirectResponse(url)


@router.get("/callback")
async def steam_callback(request: Request):
    """
    Возврат от Steam с параметрами OpenID.
    Здесь обычно делают полную проверку подписи (openid.mode=check_authentication),
    но для начала можно ограничиться извлечением steamid из claimed_id.
    """
    query = dict(request.query_params)

    # Steam при успешном логине возвращает openid.claimed_id вида:
    # https://steamcommunity.com/openid/id/7656119XXXXXXXXXX
    claimed_id = query.get("openid.claimed_id")
    if not claimed_id:
        raise HTTPException(400, "No claimed_id from Steam")

    # Вытаскиваем steamid как последние сегменты после /id/
    try:
        steam_id = claimed_id.rsplit("/", 1)[-1]
    except Exception:
        raise HTTPException(400, "Invalid claimed_id format")

    # Здесь можно дополнительно дернуть Steam Web API, если понадобится профиль.
    # Пока просто редиректим на фронт с параметром steam_id.
    front_url = f"https://fak1e-lab.ru/lab?steam_id={steam_id}"
    return RedirectResponse(front_url)
