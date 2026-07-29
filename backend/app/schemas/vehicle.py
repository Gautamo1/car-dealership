from decimal import Decimal

from pydantic import BaseModel, Field


class VehicleCreate(BaseModel):
    make: str
    model: str
    category: str
    year: int = Field(ge=1886)
    price: Decimal = Field(gt=0)
    stock: int = Field(ge=0)


class VehicleResponse(BaseModel):
    id: int
    make: str
    model: str
    category: str
    year: int
    price: Decimal
    stock: int

    class Config:
        from_attributes = True

class VehicleUpdate(BaseModel):
    make: str
    model: str
    category: str
    year: int
    price: Decimal
    stock: int


class VehicleFilter(BaseModel):
    make: str | None = None
    model: str | None = None
    category: str | None = None
    year: int | None = None
    min_price: Decimal | None = None
    max_price: Decimal | None = None

class RestockRequest(BaseModel):
    quantity: int = Field(gt=0)