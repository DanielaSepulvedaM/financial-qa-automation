import requests

from utils.http_client import build_session

BASE_URL = "https://httpbin.org"

def test_api_healthcheck_status_200():
    # API pública solo para practicar el flujo (luego lo cambiamos al dominio financiero)
    resp = requests.get(f"{BASE_URL}/status/200", timeout=10)
    assert resp.status_code == 200

def test_api_get_json_response():
    resp = requests.get(f"{BASE_URL}/json", timeout=10)
    assert resp.status_code == 200

    body = resp.json()
    assert "slideshow" in body
    assert "title" in body["slideshow"]


def test_api_not_found_404():
    resp = requests.get(f"{BASE_URL}/status/404", timeout=10)
    assert resp.status_code == 404
