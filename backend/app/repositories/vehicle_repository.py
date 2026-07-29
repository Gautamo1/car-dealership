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