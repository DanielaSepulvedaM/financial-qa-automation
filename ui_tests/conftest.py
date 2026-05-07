import os

import pytest
import requests
from playwright.sync_api import Page, sync_playwright


def _get_env(name: str, default: str) -> str:
    return os.getenv(name, default).strip()


@pytest.fixture(scope="session")
def ui_base_url() -> str:
    return _get_env("UI_BASE_URL", "http://127.0.0.1:5500")


@pytest.fixture(scope="session")
def mock_api_base_url() -> str:
    return _get_env("MOCK_API_BASE_URL", "http://127.0.0.1:8000").rstrip("/")


@pytest.fixture(autouse=True)
def reset_mock_data(mock_api_base_url: str) -> None:
    try:
        requests.post(f"{mock_api_base_url}/reset", timeout=5)
    except requests.RequestException:
        # If reset is not available the UI test can still run.
        pass


@pytest.fixture
def page(mock_api_base_url: str) -> Page:
    headless = _get_env("PW_HEADLESS", "1") != "0"

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=headless)
        context = browser.new_context()
        context.add_init_script(
            f"window.__MOCK_API_BASE_URL__ = '{mock_api_base_url}';",
        )
        page = context.new_page()
        yield page
        context.close()
        browser.close()
