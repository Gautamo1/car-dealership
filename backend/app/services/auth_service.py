from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.repositories.user_repository import UserRepository


class AuthService:

    @staticmethod
    def register(
        db: Session,
        username: str,
        email: str,
        password: str,
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
        )