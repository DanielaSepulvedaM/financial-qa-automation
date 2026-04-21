import { getCreditByNumber } from "./services/apiClient.js";

const form = document.getElementById("landing-form");
const input = document.getElementById("credit-number");
const message = document.getElementById("form-message");
const submitButton = document.getElementById("btn-consultar");

form.addEventListener("submit", onSubmitLanding);

async function onSubmitLanding(event) {
  event.preventDefault();
  message.textContent = "";

  const rawValue = input.value.trim().toUpperCase();
  if (!rawValue) {
    message.textContent = "Ingresa el numero de credito para continuar.";
    input.focus();
    return;
  }

  const creditNumber = normalizeCreditNumber(rawValue);
  input.value = creditNumber;

  setLoadingState(true);

  try {
    const credit = await getCreditByNumber(creditNumber);
    sessionStorage.setItem("selectedCredit", JSON.stringify(credit));
    message.style.color = "#1f6b2a";
    message.textContent = `Credito ${credit.credit_number} consultado. Cliente: ${credit.customer_name}.`;
  } catch (error) {
    message.style.color = "#b42b2b";
    message.textContent = error.message;
  } finally {
    setLoadingState(false);
  }
}

function normalizeCreditNumber(value) {
  const numeric = value.replace(/[^0-9]/g, "");
  if (numeric.length === 4) {
    return `CR-${numeric}`;
  }
  return value;
}

function setLoadingState(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? "CONSULTANDO..." : "CONSULTAR";
}
