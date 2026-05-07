import re
from pathlib import Path

from playwright.sync_api import Page, expect


def test_consulta_credito_exitosa_redirige_a_detalle(page: Page, ui_base_url: str):
    page.goto(ui_base_url, wait_until="domcontentloaded")

    page.locator("#credit-number").fill("CR-1001")
    page.locator("#btn-consultar").click()

    expect(page).to_have_url(re.compile(r".*#detalle$"))
    expect(page.locator("#topbar-customer")).to_have_text("Ana Torres")
    expect(page.get_by_test_id("detail-credit-number")).to_have_text("CR-1001")
    expect(page.get_by_test_id("detail-credit-type")).to_have_text("Credito")
    expect(page.get_by_test_id("detail-credit-status")).to_have_text("Credito Vigente")
    page.wait_for_timeout(2000)  # Esperar un momento para que se renderice completamente antes de tomar la captura

    evidence_dir = Path("ui_tests/evidencias")
    evidence_dir.mkdir(parents=True, exist_ok=True)
    page.screenshot(path=str(evidence_dir / "paso1_consulta_detalle.png"), full_page=True)
