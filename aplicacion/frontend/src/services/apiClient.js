const DEFAULT_MOCK_API_BASE_URL = "http://127.0.0.1:8000";
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
