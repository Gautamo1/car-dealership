from fastapi import APIRouter, Depends

from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])


@router.get("")
def get_vehicles(
    current_user: User = Depends(get_current_user),
):
    return []