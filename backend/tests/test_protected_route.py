from fastapi import status


def test_protected_route_accepts_valid_token(client):
    register_payload = {
        "username": "gautam",
        "email": "gautam@example.com",
        "password": "password123",
    }

    client.post(
        "/api/v1/auth/register",
        json=register_payload,
    )

    login_response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "gautam@example.com",
            "password": "password123",
        },
    )

    token = login_response.json()["access_token"]

    response = client.get(
        "/api/v1/vehicles",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == []