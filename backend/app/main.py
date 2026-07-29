from fastapi import FastAPI

from app.api.v1.auth import router as auth_router
from app.api.v1 import vehicles
from app.db.database import Base
from app.db.database import engine
from app.models.user import User
from app.models.vehicle import Vehicle
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Car Dealership Inventory System",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(vehicles.router, prefix="/api/v1")



@app.get("/")
def root():
    return {"message": "Car Dealership API is running"}