from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleUpdate, VehicleFilter

class VehicleRepository:

    @staticmethod
    def create(db: Session, **kwargs):
        vehicle = Vehicle(**kwargs)

        db.add(vehicle)
        db.commit()
        db.refresh(vehicle)

        return vehicle
    @staticmethod
    def search(
        db: Session,
        filters: VehicleFilter,
    ):
        query = db.query(Vehicle)

        if filters.make:
            query = query.filter(
                Vehicle.make.ilike(f"%{filters.make}%")
            )

        if filters.year:
            query = query.filter(
                Vehicle.year == filters.year
            )

        if filters.min_price is not None:
            query = query.filter(
                Vehicle.price >= filters.min_price
            )

        if filters.max_price:
            query = query.filter(
                Vehicle.price <= filters.max_price
            )

        if filters.model:
            query = query.filter(Vehicle.model.ilike(f"%{filters.model}%"))


        if filters.category:
            query = query.filter(
                Vehicle.category.ilike(f"%{filters.category}%")
        )

        return query.all()

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


    @staticmethod
    def purchase(
        db: Session,
        vehicle: Vehicle,
    ) -> Vehicle:
        vehicle.stock -= 1

        db.commit()
        db.refresh(vehicle)

        return vehicle

    @staticmethod
    def restock(
        db: Session,
        vehicle: Vehicle,
        quantity: int,
    ) -> Vehicle:
        vehicle.stock += quantity
    
        db.commit()
        db.refresh(vehicle)
    
        return vehicle

    @staticmethod
    def get_all(db: Session):
        return db.query(Vehicle).all()