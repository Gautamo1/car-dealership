from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.db.database import Base
from app.db.database import engine

import app.models.user

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Car Dealership Inventory System",
    version="1.0.0",
)

app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "Car Dealership API is running"}