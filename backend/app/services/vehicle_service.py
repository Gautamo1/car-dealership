from sqlalchemy.orm import Session
from app.schemas.vehicle import VehicleResponse, VehicleUpdate, VehicleFilter
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
    def get_all(
        db: Session,
        filters: VehicleFilter,
    ):
        return VehicleRepository.get_all(
            db=db,
            filters=filters,
        )
    @staticmethod
    def _get_vehicle_or_404(
        db: Session,
        vehicle_id: int,
    ) -> VehicleResponse:
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
    def get_by_id(
        db: Session,
        vehicle_id: int,
    ) -> VehicleResponse:
        return VehicleService._get_vehicle_or_404(
            db=db,
            vehicle_id=vehicle_id,
        )

    @staticmethod
    def update(
        db: Session,
        vehicle_id: int,
        request: VehicleUpdate,
    ) -> VehicleResponse:
        vehicle = VehicleService._get_vehicle_or_404(
            db=db,
            vehicle_id=vehicle_id,
        )

        return VehicleRepository.update(
            db=db,
            vehicle=vehicle,
            request=request,
        )

    @staticmethod
    def delete(
        db: Session,
        vehicle_id: int,
    ) -> None:
        vehicle = VehicleService._get_vehicle_or_404(
            db=db,
            vehicle_id=vehicle_id,
        )

        VehicleRepository.delete(
            db=db,
            vehicle=vehicle,
        )


    @staticmethod
    def purchase(
        db: Session,
        vehicle_id: int,
    ):
        vehicle = VehicleService._get_vehicle_or_404(
            db=db,
            vehicle_id=vehicle_id,
        )
    
        if vehicle.stock <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Vehicle is out of stock",
            )
    
        return VehicleRepository.purchase(
            db=db,
            vehicle=vehicle,
        )