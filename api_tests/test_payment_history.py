from utils.http_client import get_payment_history


def test_payment_history_existing_credit_returns_200_and_list():
    response = get_payment_history("CR-2001")

    assert response.status_code == 200
    body = response.json()
    assert isinstance(body, list)
    assert all(item["credit_number"] == "CR-2001" for item in body)


def test_payment_history_with_registered_payments_is_not_empty_and_has_key_fields():
    response = get_payment_history("CR-1001")

    assert response.status_code == 200
    body = response.json()
    assert isinstance(body, list)
    assert len(body) > 0

    required_fields = {"payment_id", "credit_number", "amount", "payment_date"}
    for item in body:
        assert required_fields.issubset(item.keys())
        assert item["credit_number"] == "CR-1001"


def test_payment_history_without_payments_returns_200_and_empty_list():
    response = get_payment_history("CR-2002")

    assert response.status_code == 200
    body = response.json()
    assert isinstance(body, list)
    assert body == []


def test_payment_history_non_existing_credit_returns_404():
    # The current mock is implemented to return 404 for unknown credits.
    response = get_payment_history("CR-9999")

    assert response.status_code == 404
    body = response.json()
    assert body["detail"] == "Credit not found"
