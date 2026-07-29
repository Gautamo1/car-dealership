from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.vehicle import VehicleCreate, VehicleResponse
from app.services.vehicle_service import VehicleService

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])


@router.post(
    "",
    response_model=VehicleResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_vehicle(
    request: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return VehicleService.create(db, request)


@router.get(
    "",
    response_model=list[VehicleResponse],
)
def get_vehicles(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return VehicleService.get_all(db=db)