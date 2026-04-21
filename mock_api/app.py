"""Main file for the credit-payment mock API."""

from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from mock_api.data import CREDITS, PAYMENT_HISTORY
from mock_api.models import Credit, PaymentRecord, PaymentRequest, PaymentResponse

app = FastAPI(title="Credit Payment Mock API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def healthcheck():
    return {"status": "ok"}


@app.get("/credits/{credit_number}", response_model=Credit)
def get_credit(credit_number: str):
    credit = CREDITS.get(credit_number)
    if not credit:
        raise HTTPException(status_code=404, detail="Credit not found")
    return credit


@app.get("/credits/{credit_number}/payments", response_model=list[PaymentRecord])
def get_payment_history(credit_number: str):
    if credit_number not in CREDITS:
        raise HTTPException(status_code=404, detail="Credit not found")
    return PAYMENT_HISTORY.get(credit_number, [])


@app.post("/payments", response_model=PaymentResponse)
def post_payment(payload: PaymentRequest):
    credit = CREDITS.get(payload.credit_number)
    if not credit:
        raise HTTPException(status_code=404, detail="Credit not found")

    if credit["status"] in ("PAGADO", "CANCELADO"):
        raise HTTPException(
            status_code=400,
            detail="Payments are not allowed for paid or canceled credits",
        )

    if payload.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be greater than zero")

    if payload.amount > credit["balance"]:
        raise HTTPException(status_code=400, detail="Amount exceeds pending balance")

    new_balance = round(credit["balance"] - payload.amount, 2)
    credit["balance"] = new_balance
    credit["status"] = "PAGADO" if new_balance == 0 else "ACTIVO"

    payment_list = PAYMENT_HISTORY.setdefault(payload.credit_number, [])
    payment_id = f"PAY-{len(payment_list) + 1:04d}"
    payment_list.append(
        {
            "payment_id": payment_id,
            "credit_number": payload.credit_number,
            "amount": payload.amount,
            "payment_date": datetime.now().isoformat(timespec="seconds"),
        }
    )

    return PaymentResponse(
        message="Payment registered successfully",
        credit_number=payload.credit_number,
        amount_paid=payload.amount,
        new_balance=new_balance,
        new_status=credit["status"],
    )
