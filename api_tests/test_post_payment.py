from utils.http_client import get_credit, post_payment


def test_post_payment_successfully_updates_credit_balance():
    # Arrange: prepara datos válidos
    candidate_credit_numbers = ["CR-2002", "CR-1001"]
    credit_number = None
    amount = None

    for candidate in candidate_credit_numbers:
        candidate_response = get_credit(candidate)
        if candidate_response.status_code != 200:
            continue

        candidate_body = candidate_response.json()
        if candidate_body["status"] == "ACTIVO" and candidate_body["balance"] > 0:
            credit_number = candidate
            amount = min(100.0, float(candidate_body["balance"]))
            break

    assert credit_number is not None, "No se encontró ningún crédito activo con saldo positivo"
    assert amount is not None

    before_response = get_credit(credit_number)
    before_body = before_response.json()
    previous_balance = float(before_body["balance"])

    # Act: ejecuta el pago
    payment_response = post_payment(
        {"credit_number": credit_number, "amount": amount}
    )

    # Assert de respuesta del endpoint de pago
    assert payment_response.status_code == 200
    payment_body = payment_response.json()
    assert payment_body["credit_number"] == credit_number
    assert payment_body["amount_paid"] == amount
    assert payment_body["message"] == "Payment registered successfully"

    # Confirmar el saldo/estado de crédito después del pago
    after_response = get_credit(credit_number)
    assert after_response.status_code == 200
    after_body = after_response.json()

    expected_balance = round(previous_balance - amount, 2)
    assert after_body["balance"] == expected_balance

    expected_status = "PAGADO" if expected_balance == 0 else "ACTIVO"
    assert after_body["status"] == expected_status


def test_post_payment_amount_greater_than_balance_returns_400():
    credit_number = "CR-1001"
    credit_response = get_credit(credit_number)
    assert credit_response.status_code == 200

    current_balance = float(credit_response.json()["balance"])
    invalid_amount = current_balance + 1

    response = post_payment({"credit_number": credit_number, "amount": invalid_amount})

    assert response.status_code == 400
    assert response.json()["detail"] == "Amount exceeds pending balance"


def test_post_payment_amount_zero_returns_400():
    response = post_payment({"credit_number": "CR-1001", "amount": 0})

    assert response.status_code == 400
    assert response.json()["detail"] == "Amount must be greater than zero"


def test_post_payment_non_existing_credit_returns_404():
    response = post_payment({"credit_number": "CR-9999", "amount": 100})

    assert response.status_code == 404
    assert response.json()["detail"] == "Credit not found"
