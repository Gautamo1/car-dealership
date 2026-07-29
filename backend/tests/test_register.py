from fastapi.testclient import TestClient
from app.main import app
from fastapi import status
from app.db.test_database import TestingSessionLocal
from app.models.user import User


def test_register_user(client):
    response = client.post(
        "/api/v1/auth/register",
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
        "/api/v1/auth/register",
        json=payload,
    )

    assert response.status_code == status.HTTP_201_CREATED

    response = client.post(
        "/api/v1/auth/register",
        json=payload,
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    assert response.json() == {
        "detail": "Email already registered"
    }


def test_password_is_hashed(client):
    payload = {
        "username": "john",
        "email": "john@example.com",
        "password": "password123",
    }

    response = client.post(
        "/api/v1/auth/register",
        json=payload,
    )

    assert response.status_code == 201

    db: Session = TestingSessionLocal()

    user = db.query(User).filter(User.email == payload["email"]).first()

    db.close()

    assert user is not None

    assert user.password != payload["password"]


def test_register_admin_user(client):

    response = client.post(
        "/api/v1/auth/register",
        json={
            "username": "admin",
            "email": "admin@example.com",
            "password": "password123",
            "role": "admin",
        },
    )

    assert response.status_code == status.HTTP_201_CREATED

    user = response.json()

    assert user["email"] == "admin@example.com"
    assert user["role"] == "admin"