from fastapi import FastAPI

from app.api.v1.auth import router as auth_router
from app.api.v1 import vehicles
from app.db.database import Base
from app.db.database import engine

import app.models.user

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Car Dealership Inventory System",
    version="1.0.0",
)

app.include_router(auth_router)
app.include_router(vehicles.router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "Car Dealership API is running"}