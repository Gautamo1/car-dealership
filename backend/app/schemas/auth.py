from pydantic import BaseModel, EmailStr, ConfigDict
from app.models.enums import UserRole


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.CUSTOMER