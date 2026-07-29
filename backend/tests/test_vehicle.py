from fastapi import status


def create_user_and_token(client):
    client.post(
        "/api/v1/auth/register",
        json={
            "username": "admin",
            "email": "admin@example.com",
            "password": "password123",
        },
    )

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "admin@example.com",
            "password": "password123",
        },
    )

    return response.json()["access_token"]


def test_create_vehicle(client):
    token = create_user_and_token(client)

    response = client.post(
        "/api/v1/vehicles",
        headers={
            "Authorization": f"Bearer {token}",
        },
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