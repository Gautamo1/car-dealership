from fastapi import status


def test_protected_route_requires_token(client):

    response = client.get("/api/v1/vehicles")

    assert response.status_code == status.HTTP_401_UNAUTHORIZEDgit