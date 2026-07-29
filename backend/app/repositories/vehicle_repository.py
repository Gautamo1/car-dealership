from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleUpdate

class VehicleRepository:

    @staticmethod
    def create(db: Session, **kwargs):
        vehicle = Vehicle(**kwargs)

        db.add(vehicle)
        db.commit()
        db.refresh(vehicle)

        return vehicle
    @staticmethod
    def get_all(db: Session):
        return db.query(Vehicle).all()

    @staticmethod
    def get_by_id(
        db: Session,
        vehicle_id: int,
    ):
        return (
            db.query(Vehicle)
            .filter(Vehicle.id == vehicle_id)
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        vehicle: Vehicle,
        request: VehicleUpdate,
    ) -> Vehicle:
        vehicle.make = request.make
        vehicle.model = request.model
        vehicle.year = request.year
        vehicle.price = request.price
        vehicle.stock = request.stock

        db.commit()
        db.refresh(vehicle)

        return vehicle

    @staticmethod
    def delete(
        db: Session,
        vehicle: Vehicle,
    ) -> None:
        db.delete(vehicle)
        db.commit()