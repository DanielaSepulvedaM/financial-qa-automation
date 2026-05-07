const DEFAULT_MOCK_API_BASE_URL = "http://127.0.0.1:8010";
const API_BASE_URL = window.__MOCK_API_BASE_URL__ || DEFAULT_MOCK_API_BASE_URL;

export async function getCreditByNumber(creditNumber) {
  const response = await fetch(`${API_BASE_URL}/credits/${encodeURIComponent(creditNumber)}`);

  if (response.ok) {
    return response.json();
  }

  let detail = "";
  try {
    const errorPayload = await response.json();
    detail = errorPayload?.detail || "";
  } catch {
    detail = "";
  }

  if (response.status === 404) {
    throw new Error("No se encontro el credito consultado.");
  }

  throw new Error(detail || "No fue posible consultar el credito.");
}

export async function getPaymentHistoryByCredit(creditNumber) {
  const response = await fetch(
    `${API_BASE_URL}/credits/${encodeURIComponent(creditNumber)}/payments`,
  );

  if (response.ok) {
    return response.json();
  }

  let detail = "";
  try {
    const errorPayload = await response.json();
    detail = errorPayload?.detail || "";
  } catch {
    detail = "";
  }

  if (response.status === 404) {
    throw new Error("No se encontro el credito para consultar historial.");
  }

  throw new Error(detail || "No fue posible consultar el historial de pagos.");
}

export async function postPaymentByCredit(creditNumber, amount) {
  const response = await fetch(`${API_BASE_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credit_number: creditNumber,
      amount,
    }),
  });

  if (response.ok) {
    return response.json();
  }

  let detail = "";
  try {
    const errorPayload = await response.json();
    detail = errorPayload?.detail || "";
  } catch {
    detail = "";
  }

  if (response.status === 404) {
    throw new Error("No se encontro el credito para registrar el pago.");
  }

  if (response.status === 400) {
    if (detail === "Payments are not allowed for paid or canceled credits") {
      throw new Error("No se permiten pagos para creditos pagados o cancelados.");
    }
    if (detail === "Amount must be greater than zero") {
      throw new Error("El valor a pagar debe ser mayor que cero.");
    }
    if (detail === "Amount exceeds pending balance") {
      throw new Error("El valor a pagar supera el saldo pendiente.");
    }
  }

  throw new Error(detail || "No fue posible registrar el pago.");
}

