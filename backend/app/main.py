# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.Auth.routes import router as faceit_auth_router
from app.Auth.routes_google import router as google_auth_router
from app.Auth.routes_yandex import router as yandex_auth_router
from app.Auth.routes_me import router as auth_me_router
from app.Auth.routes_steam import router as steam_auth_router  # NEW

print("=== APP MAIN.PY LOADED ===")

app = FastAPI()

# CORS настройки
origins = [
    "https://fak1e-lab.ru",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # в том числе OPTIONS
    allow_headers=["*"],
)


@app.get("/health")
def read_health():
    return {"status": "ok"}


app.include_router(faceit_auth_router)
app.include_router(google_auth_router)
app.include_router(yandex_auth_router)
app.include_router(auth_me_router)
app.include_router(steam_auth_router)  # NEW
