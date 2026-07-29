from fastapi import status
from decimal import Decimal



def test_create_vehicle(client, admin_headers):

    response = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    assert response.status_code == status.HTTP_201_CREATED

    body = response.json()

    assert body["make"] == "Toyota"
    assert body["model"] == "Camry"
    assert body["year"] == 2024
    assert body["price"] == "35000.00"
    assert body["stock"] == 5


def test_get_all_vehicles(client, admin_headers):

    create_response = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    assert create_response.status_code == status.HTTP_201_CREATED

    response = client.get(
        "/api/v1/vehicles",
        headers=admin_headers,
    )

    assert response.status_code == status.HTTP_200_OK

    vehicles = response.json()

    assert len(vehicles) == 1

    vehicle = vehicles[0]

    assert vehicle["make"] == "Toyota"
    assert vehicle["model"] == "Camry"
    assert vehicle["year"] == 2024
    assert Decimal(vehicle["price"]) == Decimal("35000.00")
    assert vehicle["stock"] == 5



def test_get_vehicle_by_id(client, admin_headers, auth_headers):
    create_response = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    assert create_response.status_code == status.HTTP_201_CREATED

    vehicle_id = create_response.json()["id"]

    response = client.get(
        f"/api/v1/vehicles/{vehicle_id}",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_200_OK

    vehicle = response.json()

    assert vehicle["id"] == vehicle_id
    assert vehicle["make"] == "Toyota"
    assert vehicle["model"] == "Camry"
    assert vehicle["year"] == 2024
    assert Decimal(vehicle["price"]) == Decimal("35000.00")
    assert vehicle["stock"] == 5


def test_update_vehicle(client, admin_headers, auth_headers):

    create_response = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    vehicle = create_response.json()

    response = client.put(
        f"/api/v1/vehicles/{vehicle['id']}",
        headers=admin_headers,
        json={
            "make": "Honda",
            "model": "City",
            "year": 2025,
            "price": 40000,
            "stock": 10,
        },
    )

    assert response.status_code == status.HTTP_200_OK

    body = response.json()

    assert body["id"] == vehicle["id"]
    assert body["make"] == "Honda"
    assert body["model"] == "City"
    assert body["year"] == 2025
    assert Decimal(body["price"]) == Decimal("40000.00")
    assert body["stock"] == 10


def test_update_nonexistent_vehicle(client, admin_headers):

    response = client.put(
        "/api/v1/vehicles/999",
        headers=admin_headers,
        json={
            "make": "Honda",
            "model": "City",
            "year": 2025,
            "price": 40000,
            "stock": 10,
        },
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {
        "detail": "Vehicle not found"
    }


def test_delete_vehicle(client, admin_headers):

    create_response = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    vehicle = create_response.json()

    response = client.delete(
        f"/api/v1/vehicles/{vehicle['id']}",
        headers=admin_headers,
    )

    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = client.get(
        f"/api/v1/vehicles/{vehicle['id']}",
        headers=admin_headers,
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND

def test_filter_vehicles_by_make(client, admin_headers, auth_headers):

    client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Honda",
            "model": "City",
            "year": 2024,
            "price": 30000,
            "stock": 4,
        },
    )

    response = client.get(
        "/api/v1/vehicles?make=Toyota",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_200_OK

    vehicles = response.json()

    assert len(vehicles) == 1
    assert vehicles[0]["make"] == "Toyota"


def test_purchase_vehicle(client, admin_headers, auth_headers):

    create_response = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    vehicle = create_response.json()

    response = client.post(
        f"/api/v1/vehicles/{vehicle['id']}/purchase",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_200_OK

    updated = response.json()

    assert updated["stock"] == 4

def test_purchase_out_of_stock_vehicle(client, admin_headers, auth_headers):

    create_response = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 0,
        },
    )

    vehicle = create_response.json()

    response = client.post(
        f"/api/v1/vehicles/{vehicle['id']}/purchase",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "detail": "Vehicle is out of stock"
    }

def test_restock_vehicle(client, admin_headers):

    create_response = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    vehicle = create_response.json()

    response = client.post(
        f"/api/v1/vehicles/{vehicle['id']}/restock",
        headers=admin_headers,
        json={
            "quantity": 10,
        },
    )

    assert response.status_code == status.HTTP_200_OK

    updated = response.json()

    assert updated["stock"] == 15

def test_restock_vehicle_invalid_quantity(client, admin_headers):

    create_response = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    vehicle = create_response.json()

    response = client.post(
        f"/api/v1/vehicles/{vehicle['id']}/restock",
        headers=admin_headers,
        json={
            "quantity": 0,
        },
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_restock_vehicle_negative_quantity(client, admin_headers):

    create_response = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    vehicle = create_response.json()

    response = client.post(
        f"/api/v1/vehicles/{vehicle['id']}/restock",
        headers=admin_headers,
        json={
            "quantity": -5,
        },
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_customer_cannot_create_vehicle(
    client,
    auth_headers,
):

    response = client.post(
        "/api/v1/vehicles",
        headers=auth_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert response.json() == {
        "detail": "Admin access required"
    }

def test_customer_cannot_update_vehicle(
    client,
    admin_headers,
    auth_headers,
):
    create_response = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "year": 2024,
            "price": 35000,
            "stock": 5,
        },
    )

    vehicle = create_response.json()

    response = client.put(
        f"/api/v1/vehicles/{vehicle['id']}",
        headers=auth_headers,
        json={
            "make": "Honda",
            "model": "City",
            "year": 2025,
            "price": 40000,
            "stock": 10,
        },
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert response.json() == {
        "detail": "Admin access required"
    }