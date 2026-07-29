from fastapi.testclient import TestClient
from app.main import app




def test_register_user(client):
    response = client.post(
        "/api/auth/register",
        json={
            "username": "gautam",
            "email": "gautam@example.com",
            "password": "password123",
        },
    )

    assert response.status_code == 201


def test_duplicate_email(client):
    payload = {
        "username": "gautam",
        "email": "duplicate@example.com",
        "password": "password123",
    }

    response = client.post(
        "/api/auth/register",
        json=payload,
    )

    assert response.status_code == status.HTTP_201_CREATED

    response = client.post(
        "/api/auth/register",
        json=payload,
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    assert response.json() == {
        "detail": "Email already registered"
    }