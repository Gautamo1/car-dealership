import pytest
from fastapi.testclient import TestClient


from app.db.database import Base, get_db
from app.main import app
from app.db.test_database import test_engine, TestingSessionLocal
TEST_DATABASE_URL = "sqlite:///./test.db"



def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture
def client():
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)

    with TestClient(app) as test_client:
        yield test_client

    Base.metadata.drop_all(bind=test_engine)