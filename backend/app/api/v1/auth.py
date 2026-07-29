from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from app.schemas.auth import LoginRequest

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.auth import RegisterRequest
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"],
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db),
):

    user = AuthService.register(
        db=db,
        username=request.username,
        email=request.email,
        password=request.password,
    )

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
    }

@router.post("/login")
def login(
    request: LoginRequest,
    db: Session = Depends(get_db),
):
    return AuthService.login(
        db=db,
        email=request.email,
        password=request.password,
    )