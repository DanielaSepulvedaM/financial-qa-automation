"""Mock data for credits and payment history."""

from copy import deepcopy


INITIAL_CREDITS = {
    "CR-1001": {
        "credit_number": "CR-1001",
        "customer_name": "Ana Torres",
        "balance": 2500.0,
        "installment_value": 500.0,
        "due_date": "2026-04-15",
        "status": "ACTIVO",
    },
    "CR-2001": {
        "credit_number": "CR-2001",
        "customer_name": "Carlos Ruiz",
        "balance": 0.0,
        "installment_value": 350.0,
        "due_date": "2026-04-10",
        "status": "PAGADO",
    },
    "CR-2002": {
        "credit_number": "CR-2002",
        "customer_name": "Maria Gomez",
        "balance": 310.0,
        "installment_value": 350.0,
        "due_date": "2026-04-10",
        "status": "ACTIVO",
    },
}


INITIAL_PAYMENT_HISTORY = {
    "CR-1001": [
        {
            "payment_id": "PAY-0001",
            "credit_number": "CR-1001",
            "amount": 500.0,
            "payment_date": "2026-03-01T10:00:00",
        }
    ],
    "CR-2001": [
        {
            "payment_id": "PAY-0002",
            "credit_number": "CR-2001",
            "amount": 350.0,
            "payment_date": "2026-02-15T09:30:00",
        }
    ],
}


# Mutable stores used by the mock API runtime.
CREDITS = deepcopy(INITIAL_CREDITS)
PAYMENT_HISTORY = deepcopy(INITIAL_PAYMENT_HISTORY)
