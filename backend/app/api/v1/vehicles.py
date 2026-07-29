from fastapi import APIRouter, Depends, status, Response
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.dependencies.auth import get_current_user, require_admin
from app.models.user import User
from app.schemas.vehicle import VehicleCreate, VehicleResponse, VehicleUpdate, VehicleFilter, RestockRequest
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
    current_user: User = Depends(require_admin),
):
    return VehicleService.create(db, request)


@router.get(
    "",
    response_model=list[VehicleResponse],
)
def get_vehicles(
    filters: VehicleFilter = Depends(),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return VehicleService.get_all(
        db=db,
        filters=filters,
    )


@router.get(
    "/{vehicle_id}",
    response_model=VehicleResponse,
)
def get_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return VehicleService.get_by_id(
        db=db,
        vehicle_id=vehicle_id,
    )

@router.put(
    "/{vehicle_id}",
    response_model=VehicleResponse,
)
def update_vehicle(
    vehicle_id: int,
    request: VehicleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return VehicleService.update(
        db=db,
        vehicle_id=vehicle_id,
        request=request,
    )

@router.delete(
    "/{vehicle_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    VehicleService.delete(
        db=db,
        vehicle_id=vehicle_id,
    )

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post(
    "/{vehicle_id}/purchase",
    response_model=VehicleResponse,
)
def purchase_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return VehicleService.purchase(
        db=db,
        vehicle_id=vehicle_id,
    )


@router.post(
    "/{vehicle_id}/restock",
    response_model=VehicleResponse,
)
def restock_vehicle(
    vehicle_id: int,
    request: RestockRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return VehicleService.restock(
        db=db,
        vehicle_id=vehicle_id,
        quantity=request.quantity,
    )