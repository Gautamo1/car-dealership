from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:

    @staticmethod
    def get_by_email(
        db: Session,
        email: str,
    ) -> User | None:

        return (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        username: str,
        email: str,
        password: str,
    ) -> User:

        user = User(
            username=username,
            email=email,
            password=password,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user