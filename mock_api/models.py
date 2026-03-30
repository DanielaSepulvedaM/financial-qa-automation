"""Base models for mock API request and response payloads."""

from pydantic import BaseModel, Field


class Credit(BaseModel):
    credit_number: str
    customer_name: str
    balance: float = Field(ge=0)
    installment_value: float = Field(gt=0)
    due_date: str
    status: str


class PaymentRequest(BaseModel):
    credit_number: str
    amount: float


class PaymentRecord(BaseModel):
    payment_id: str
    credit_number: str
    amount: float
    payment_date: str


class PaymentResponse(BaseModel):
    message: str
    credit_number: str
    amount_paid: float
    new_balance: float
    new_status: str
