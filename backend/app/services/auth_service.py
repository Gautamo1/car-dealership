from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import Session
from app.core.jwt import create_access_token
from app.core.security import verify_password
from app.models.enums import UserRole

from app.core.security import hash_password
from app.repositories.user_repository import UserRepository


class AuthService:

    @staticmethod
    def register(
        db: Session,
        username: str,
        email: str,
        password: str,
        role: UserRole,
    ):

        existing_user = UserRepository.get_by_email(
            db,
            email,
        )

        if existing_user:

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        return UserRepository.create(
            db=db,
            username=username,
            email=email,
            password=hash_password(password),
            role=role,
        )

    @staticmethod
    def login(
        db: Session,
        email: str,
        password: str,
    ):
        user = UserRepository.get_by_email(
            db,
            email,
        )
    
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )
    
        if not verify_password(
            password,
            user.password,
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )
    
        access_token = create_access_token(
            {"sub": str(user.id),
             "role": user.role.value,
             }
        )
    
        return {
            "access_token": access_token,
            "token_type": "bearer",
        }