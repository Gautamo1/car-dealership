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