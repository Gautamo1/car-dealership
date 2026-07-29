from sqlalchemy.orm import Session
from app.schemas.vehicle import VehicleResponse, VehicleUpdate
from app.repositories.vehicle_repository import VehicleRepository
from fastapi import HTTPException, status



class VehicleService:

    @staticmethod
    def create(db: Session, request):
        return VehicleRepository.create(
            db,
            make=request.make,
            model=request.model,
            year=request.year,
            price=request.price,
            stock=request.stock,
        )

    
    @staticmethod
    def get_all(db: Session)->list[VehicleResponse]:
        return VehicleRepository.get_all(db)

    @staticmethod
    def get_by_id(
        db: Session,
        vehicle_id: int,
    )->VehicleResponse:
        vehicle = VehicleRepository.get_by_id(
            db=db,
            vehicle_id=vehicle_id,
        )

        if vehicle is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehicle not found",
            )

        return vehicle


    @staticmethod
    def update(
        db: Session,
        vehicle_id: int,
        request: VehicleUpdate,
    ):
        vehicle = VehicleRepository.get_by_id(
            db=db,
            vehicle_id=vehicle_id,
        )

        if vehicle is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehicle not found",
            )

        return VehicleRepository.update(
            db=db,
            vehicle=vehicle,
            request=request,
        )