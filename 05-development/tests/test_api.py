import pytest
import requests
from unittest.mock import patch

def test_api_health():
    """Test API health endpoint"""
    response = requests.get("http://localhost:8000/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

@patch('openai.OpenAI')
def test_style_analysis(mock_openai):
    """Test style analysis endpoint"""
    mock_response = {
        "analysis": {"style": "casual", "confidence": 0.9}
    }
    
    response = requests.post(
        "http://localhost:8000/api/v1/style/analyze",
        json={"text": "I need casual weekend clothes"}
    )
    
    assert response.status_code == 200
