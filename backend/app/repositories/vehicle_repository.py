from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle


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