# app/main.py

from fastapi import FastAPI
from app.Auth.routes import router as faceit_auth_router

print("=== APP MAIN.PY LOADED ===")

app = FastAPI()

@app.get("/health")
def read_health():
    return {"status": "ok"}

app.include_router(faceit_auth_router)
