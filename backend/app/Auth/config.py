# app/Auth/config.py

import os

# ========= FACEIT =========
FACEIT_CLIENT_ID = os.getenv(
    "FACEIT_CLIENT_ID",
    "b3fb1fc9-a609-4aa8-84ac-871ba62db108",  # дефолт, чтобы не падать локально
)
FACEIT_CLIENT_SECRET = os.getenv(
    "FACEIT_CLIENT_SECRET",
    "JgAJ1XNxyo5Iw8xsYromvQtLQNnpa8vcutXlSzMV",
)
FACEIT_REDIRECT_URI = os.getenv(
    "FACEIT_REDIRECT_URI",
    "https://api.fak1e-lab.ru/auth/faceit/callback",
)

# ========= GOOGLE =========
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")

# ========= YANDEX =========
YANDEX_CLIENT_ID = os.getenv("YANDEX_CLIENT_ID")
YANDEX_CLIENT_SECRET = os.getenv("YANDEX_CLIENT_SECRET")
YANDEX_REDIRECT_URI = os.getenv("YANDEX_REDIRECT_URI")

# ========= STEAM =========
# Ключ нужно получить на https://steamcommunity.com/dev/apikey
STEAM_API_KEY = os.getenv("STEAM_API_KEY", "")
STEAM_RETURN_URL = os.getenv(
    "STEAM_RETURN_URL",
    "https://api.fak1e-lab.ru/auth/steam/callback",
)
