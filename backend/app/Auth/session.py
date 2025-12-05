# app/Auth/session.py
import os
import time
import jwt
from fastapi import HTTPException

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
JWT_ALG = "HS256"
JWT_TTL_SECONDS = 60 * 60 * 24 * 7  # 7 days

def create_session_token(user_id: str, providers: list[str]) -> str:
    now = int(time.time())
    payload = {
        "sub": user_id,
        "providers": providers,  # ["google"], ["yandex"], ["google","yandex"]
        "iat": now,
        "exp": now + JWT_TTL_SECONDS,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def verify_session_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Session expired")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid session token")
