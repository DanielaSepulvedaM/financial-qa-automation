from utils.http_client import get_credit


def test_get_existing_credit_returns_200_and_expected_fields():
    # Arrange
    credit_number = "CR-1001"

    # Act
    response = get_credit(credit_number)

    # Assert status code
    assert response.status_code == 200

    # Assert response shape and key values
    body = response.json()
    expected_fields = {
        "credit_number",
        "customer_name",
        "balance",
        "installment_value",
        "due_date",
        "status",
    }

    assert expected_fields.issubset(body.keys())
    assert body["credit_number"] == credit_number
    assert body["customer_name"] == "Ana Torres"
    assert body["status"] in {"ACTIVO", "PAGADO", "CANCELADO"}
    assert body["balance"] >= 0
    assert body["installment_value"] > 0


def test_get_non_existing_credit_returns_404():
    # Arrange
    credit_number = "CR-9999"

    # Act
    response = get_credit(credit_number)

    # Assert
    assert response.status_code == 404

    body = response.json()
    assert body["detail"] == "Credit not found"
