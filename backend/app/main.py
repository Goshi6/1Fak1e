# app/main.py

from fastapi import FastAPI
from app.Auth.routes import router as faceit_auth_router
from app.Auth.routes_google import router as google_auth_router
from app.Auth.routes_yandex import router as yandex_auth_router

print("=== APP MAIN.PY LOADED ===")

app = FastAPI()


@app.get("/health")
def read_health():
    return {"status": "ok"}


app.include_router(faceit_auth_router)
app.include_router(google_auth_router)
app.include_router(yandex_auth_router)
