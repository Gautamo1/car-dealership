from fastapi import APIRouter, status
from app.schemas.auth import RegisterRequest

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(request: RegisterRequest):
    return {
        "message": "User registered successfully"
    }