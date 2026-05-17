from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "FoodSafe RAG API is running"}

def test_auth_register_docs():
    # Just check if docs are accessible
    response = client.get("/api/v1/openapi.json")
    assert response.status_code == 200
