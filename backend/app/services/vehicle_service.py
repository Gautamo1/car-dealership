from sqlalchemy.orm import Session

from app.repositories.vehicle_repository import VehicleRepository


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