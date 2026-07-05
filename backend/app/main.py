import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from config.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Decision Intelligence Platform API engine supporting career planning and roadmap predictions.",
    version="1.0.0"
)

# CORS configurations for React client frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, lock down origins e.g., ["https://eduvision.web.app"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register main API routing module
app.include_router(router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "message": f"Welcome to the {settings.PROJECT_NAME} REST API",
        "documentation": "/docs",
        "env": settings.ENV
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=True)
