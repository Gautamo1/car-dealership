from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


# def test_register_user():
#     response = client.post(
#         "/api/auth/register",
#         json={
#             "username": "gautam",
#             "email": "gautam@example.com",
#             "password": "password123"
#         },
#     )

#     assert response.status_code == 201

def test_register_user():

    response = client.post(
        "/api/auth/register",
        json={
            "username": "gautam",
            "email": "gautam@example.com",
            "password": "password123",
        },
    )

    assert response.status_code == 201

    body = response.json()

    assert body["username"] == "gautam"
    assert body["email"] == "gautam@example.com"
    assert "id" in body