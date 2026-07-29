from fastapi import status


def test_login_success(client):

    register_payload = {
        "username": "gautam",
        "email": "gautam@example.com",
        "password": "password123",
    }

    response = client.post(
        "/api/v1/auth/register",
        json=register_payload,
    )

    assert response.status_code == status.HTTP_201_CREATED

    login_payload = {
        "email": "gautam@example.com",
        "password": "password123",
    }

    response = client.post(
        "/api/v1/auth/login",
        json=login_payload,
    )

    assert response.status_code == status.HTTP_200_OK

    body = response.json()

    assert "access_token" in body
    assert body["token_type"] == "bearer"


def test_login_invalid_password(client):

    register_payload = {
        "username": "gautam",
        "email": "gautam@example.com",
        "password": "password123",
    }

    client.post(
        "/api/v1/auth/register",
        json=register_payload,
    )

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "gautam@example.com",
            "password": "wrongpassword",
        },
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED

    assert response.json() == {
        "detail": "Invalid email or password"
    }