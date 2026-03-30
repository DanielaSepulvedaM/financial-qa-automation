import os
from typing import Any

import requests


def get_base_url() -> str:
    """Returns mock API base URL, overridable by env var."""
    return os.getenv("MOCK_API_BASE_URL", "http://127.0.0.1:8000").rstrip("/")


def _build_url(path: str) -> str:
    return f"{get_base_url()}/{path.lstrip('/')}"


def get_credit(credit_number: str, timeout: int = 10) -> requests.Response:
    """GET /credits/{credit_number}"""
    return requests.get(_build_url(f"/credits/{credit_number}"), timeout=timeout)


def post_payment(payload: dict[str, Any], timeout: int = 10) -> requests.Response:
    """POST /payments"""
    return requests.post(_build_url("/payments"), json=payload, timeout=timeout)


def get_payment_history(credit_number: str, timeout: int = 10) -> requests.Response:
    """GET /credits/{credit_number}/payments"""
    return requests.get(
        _build_url(f"/credits/{credit_number}/payments"),
        timeout=timeout,
    )
