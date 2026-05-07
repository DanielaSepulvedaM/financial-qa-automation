import {
  getCreditByNumber,
  getPaymentHistoryByCredit,
  postPaymentByCredit,
} from "./services/apiClient.js";

const landingView = document.getElementById("landing-view");
const detailView = document.getElementById("detail-view");
const historyView = document.getElementById("history-view");
const paymentView = document.getElementById("payment-view");
const confirmationView = document.getElementById("confirmation-view");
const form = document.getElementById("landing-form");
const input = document.getElementById("credit-number");
const message = document.getElementById("form-message");
const submitButton = document.getElementById("btn-consultar");
const topBarCustomer = document.getElementById("topbar-customer");

const detailCreditType = document.getElementById("detail-credit-type");
const detailCreditNumber = document.getElementById("detail-credit-number");
const detailCreditStatus = document.getElementById("detail-credit-status");
const detailBalance = document.getElementById("detail-balance");
const detailInstallment = document.getElementById("detail-installment");
const detailDueDate = document.getElementById("detail-due-date");
const paymentHistoryButton = document.getElementById("btn-payment-history");
const goToPaymentButton = document.getElementById("btn-go-to-payment");
const backHomeButton = document.getElementById("btn-back-home");

const historyCreditType = document.getElementById("history-credit-type");
const historyCreditNumber = document.getElementById("history-credit-number");
const historyCreditStatus = document.getElementById("history-credit-status");
const historyTableBody = document.getElementById("history-table-body");
const historyMessage = document.getElementById("history-message");
const backToDetailButton = document.getElementById("btn-back-to-detail");

const paymentForm = document.getElementById("payment-form");
const paymentInstallmentValue = document.getElementById("payment-installment-value");
const paymentBalanceValue = document.getElementById("payment-balance-value");
const paymentMessage = document.getElementById("payment-message");
const submitPaymentButton = document.getElementById("btn-submit-payment");
const backDetailFromPaymentButton = document.getElementById("btn-back-detail-from-payment");

const confirmationNumber = document.getElementById("confirmation-number");
const confirmationAmount = document.getElementById("confirmation-amount");
const confirmationStatus = document.getElementById("confirmation-status");
const confirmationBalance = document.getElementById("confirmation-balance");
const confirmationToDetailButton = document.getElementById("btn-confirmation-to-detail");
const confirmationToHomeButton = document.getElementById("btn-confirmation-to-home");

let selectedCreditMemory = null;
let lastConfirmationMemory = null;

form.addEventListener("submit", onSubmitLanding);
paymentHistoryButton.addEventListener("click", onOpenPaymentHistory);
goToPaymentButton.addEventListener("click", onOpenPaymentView);
backToDetailButton.addEventListener("click", onBackToDetail);
backHomeButton.addEventListener("click", onBackToHome);
submitPaymentButton.addEventListener("click", onSubmitPayment);
backDetailFromPaymentButton.addEventListener("click", onBackToDetailFromPayment);
confirmationToDetailButton.addEventListener("click", onConfirmationToDetail);
confirmationToHomeButton.addEventListener("click", onConfirmationToHome);
window.addEventListener("hashchange", syncViewWithState);

syncViewWithState();

async function onSubmitLanding(event) {
  event.preventDefault();
  message.textContent = "";

  const rawValue = input.value.trim().toUpperCase();
  if (!rawValue) {
    message.style.color = "#b42b2b";
    message.textContent = "Ingresa el numero de credito para continuar.";
    input.focus();
    return;
  }

  const creditNumber = normalizeCreditNumber(rawValue);
  input.value = creditNumber;

  setLoadingState(true);

  try {
    const credit = await getCreditByNumber(creditNumber);
    selectedCreditMemory = credit;
    saveSelectedCredit(credit);
    message.style.color = "#1f6b2a";
    message.textContent = `Credito ${credit.credit_number} consultado. Cliente: ${credit.customer_name}.`;
    showDetailView(credit);
  } catch (error) {
    message.style.color = "#b42b2b";
    message.textContent = error.message;
  } finally {
    setLoadingState(false);
  }
}

function onOpenPaymentHistory() {
  const credit = getStoredCredit();
  if (!credit) {
    showLandingView();
    message.style.color = "#b42b2b";
    message.textContent = "No hay credito consultado para mostrar historial.";
    return;
  }

  void showHistoryView(credit);
}

function onOpenPaymentView() {
  const credit = getStoredCredit();
  if (!credit) {
    showLandingView();
    message.style.color = "#b42b2b";
    message.textContent = "No hay credito consultado para registrar pago.";
    return;
  }

  showPaymentView(credit);
}

function onBackToDetail() {
  const credit = getStoredCredit();
  if (!credit) {
    showLandingView();
    return;
  }
  showDetailView(credit);
}

function onBackToDetailFromPayment() {
  const credit = getStoredCredit();
  if (!credit) {
    showLandingView();
    return;
  }
  showDetailView(credit);
}

function onBackToHome() {
  showLandingView();
  message.textContent = "";
  input.value = "";
  input.focus();
}

function onConfirmationToDetail() {
  const credit = getStoredCredit();
  if (!credit) {
    showLandingView();
    return;
  }
  showDetailView(credit);
}

function onConfirmationToHome() {
  showLandingView();
  input.value = "";
  input.focus();
}

async function onSubmitPayment() {
  const credit = getStoredCredit();
  if (!credit) {
    showLandingView();
    message.style.color = "#b42b2b";
    message.textContent = "No hay credito consultado para registrar pago.";
    return;
  }

  const selectedOption = paymentForm.querySelector("input[name='paymentOption']:checked");
  if (!selectedOption) {
    setPaymentMessage("Selecciona una opcion de pago.", "error");
    return;
  }

  const amount =
    selectedOption.value === "installment"
      ? Number(credit.installment_value)
      : Number(credit.balance);

  if (!Number.isFinite(amount) || amount <= 0) {
    setPaymentMessage("El valor seleccionado no es valido para pago.", "error");
    return;
  }

  setPaymentLoading(true);
  setPaymentMessage("Registrando pago...", "info");

  try {
    const paymentResult = await postPaymentByCredit(credit.credit_number, amount);
    const updatedCredit = await getCreditByNumber(credit.credit_number);

    selectedCreditMemory = updatedCredit;
    saveSelectedCredit(updatedCredit);
    renderDetailData(updatedCredit);
    renderPaymentData(updatedCredit);
    paymentForm.reset();

    lastConfirmationMemory = buildConfirmationData(paymentResult);
    showConfirmationView(lastConfirmationMemory, updatedCredit);
  } catch (error) {
    setPaymentMessage(error.message || "No fue posible registrar el pago.", "error");
  } finally {
    setPaymentLoading(false);
    const latestCredit = getStoredCredit() || credit;
    if (latestCredit) {
      renderPaymentData(latestCredit);
    }
  }
}

function buildConfirmationData(paymentResult) {
  const timestamp = Date.now().toString().slice(-8);
  return {
    confirmationNumber: `CONF-${timestamp}`,
    amountPaid: Number(paymentResult.amount_paid || 0),
    newStatus: paymentResult.new_status || "",
    newBalance: Number(paymentResult.new_balance || 0),
  };
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

function setPaymentLoading(isLoading) {
  if (isLoading) {
    submitPaymentButton.disabled = true;
    submitPaymentButton.textContent = "PROCESANDO...";
    return;
  }
  submitPaymentButton.disabled = false;
  submitPaymentButton.textContent = "PAGAR";
}

function syncViewWithState() {
  const hash = window.location.hash;
  const storedCredit = getStoredCredit();

  if (hash === "#detalle" && storedCredit) {
    showDetailView(storedCredit, false);
    return;
  }

  if (hash === "#historial" && storedCredit) {
    void showHistoryView(storedCredit, false);
    return;
  }

  if (hash === "#pago" && storedCredit) {
    showPaymentView(storedCredit, false);
    return;
  }

  if (hash === "#confirmacion" && storedCredit && lastConfirmationMemory) {
    showConfirmationView(lastConfirmationMemory, storedCredit, false);
    return;
  }

  if (hash === "#confirmacion" && storedCredit && !lastConfirmationMemory) {
    showPaymentView(storedCredit, false);
    setPaymentMessage("No hay una confirmacion disponible para mostrar.", "info");
    return;
  }

  showLandingView(false);

  if ((hash === "#detalle" || hash === "#historial" || hash === "#pago" || hash === "#confirmacion") && !storedCredit) {
    message.style.color = "#b42b2b";
    message.textContent = "No hay credito consultado. Realiza una consulta para continuar.";
  }
}

function hideAllViews() {
  landingView.hidden = true;
  detailView.hidden = true;
  historyView.hidden = true;
  paymentView.hidden = true;
  confirmationView.hidden = true;
}

function showDetailView(credit, updateHash = true) {
  hideAllViews();
  detailView.hidden = false;
  topBarCustomer.textContent = credit.customer_name || "";
  renderDetailData(credit);

  if (updateHash && window.location.hash !== "#detalle") {
    window.location.hash = "detalle";
  }
}

async function showHistoryView(credit, updateHash = true) {
  hideAllViews();
  historyView.hidden = false;
  topBarCustomer.textContent = credit.customer_name || "";
  renderHistoryCreditSummary(credit);
  renderHistoryLoading();

  if (updateHash && window.location.hash !== "#historial") {
    window.location.hash = "historial";
  }

  try {
    const history = await getPaymentHistoryByCredit(credit.credit_number);
    renderHistoryRows(history, credit.due_date);
  } catch (error) {
    renderHistoryError(error.message);
  }
}

function showPaymentView(credit, updateHash = true) {
  hideAllViews();
  paymentView.hidden = false;
  topBarCustomer.textContent = credit.customer_name || "";
  paymentForm.reset();
  renderPaymentData(credit);
  setPaymentMessage("", "info");

  if (updateHash && window.location.hash !== "#pago") {
    window.location.hash = "pago";
  }
}

function showConfirmationView(confirmationData, credit, updateHash = true) {
  hideAllViews();
  confirmationView.hidden = false;
  topBarCustomer.textContent = credit.customer_name || "";
  renderConfirmationData(confirmationData);

  if (updateHash && window.location.hash !== "#confirmacion") {
    window.location.hash = "confirmacion";
  }
}

function showLandingView(updateHash = true) {
  hideAllViews();
  landingView.hidden = false;
  topBarCustomer.textContent = "";

  if (updateHash && window.location.hash) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
}

function getStoredCredit() {
  try {
    const rawValue = sessionStorage.getItem("selectedCredit");
    if (!rawValue) {
      return selectedCreditMemory;
    }
    return JSON.parse(rawValue);
  } catch {
    return selectedCreditMemory;
  }
}

function saveSelectedCredit(credit) {
  try {
    sessionStorage.setItem("selectedCredit", JSON.stringify(credit));
  } catch {
    // Non-blocking: navigation should still work if storage is unavailable.
  }
}

function renderDetailData(credit) {
  detailCreditType.textContent = "Credito";
  detailCreditNumber.textContent = credit.credit_number || "";
  detailCreditStatus.textContent = mapStatusToUiText(credit.status);
  detailBalance.textContent = formatCopCurrency(credit.balance);
  detailInstallment.textContent = formatCopCurrency(credit.installment_value);
  detailDueDate.textContent = formatDateForUi(credit.due_date);
}

function renderHistoryCreditSummary(credit) {
  historyCreditType.textContent = "Credito";
  historyCreditNumber.textContent = credit.credit_number || "";
  historyCreditStatus.textContent = mapStatusToUiText(credit.status);
}

function renderHistoryLoading() {
  historyTableBody.innerHTML = "";
  setHistoryMessage("Cargando historial de pagos...", "info");
}

function renderHistoryRows(records, dueDate) {
  historyTableBody.innerHTML = "";

  if (!Array.isArray(records) || records.length === 0) {
    setHistoryMessage("Este credito no registra pagos aun.", "info");
    return;
  }

  for (const record of records) {
    const row = document.createElement("tr");
    appendCell(row, formatDateForUi(record.payment_date));
    appendCell(row, "PAGO REGISTRADO");
    appendCell(row, formatDateForUi(dueDate));
    appendCell(row, formatCopCurrency(record.amount), "history-amount-cell");
    historyTableBody.appendChild(row);
  }

  setHistoryMessage("", "info");
}

function renderHistoryError(errorMessage) {
  historyTableBody.innerHTML = "";
  setHistoryMessage(errorMessage || "No fue posible consultar el historial de pagos.", "error");
}

function renderPaymentData(credit) {
  paymentInstallmentValue.textContent = formatCopCurrency(credit.installment_value);
  paymentBalanceValue.textContent = formatCopCurrency(credit.balance);

  const paymentBlocked = Number(credit.balance) <= 0 || String(credit.status).toUpperCase() !== "ACTIVO";
  submitPaymentButton.disabled = paymentBlocked;

  if (paymentBlocked) {
    setPaymentMessage("Este credito no admite pagos en su estado actual.", "info");
  }
}

function renderConfirmationData(confirmationData) {
  confirmationNumber.textContent = `Numero de Confirmacion ${confirmationData.confirmationNumber}`;
  confirmationAmount.textContent = `Monto pagado: ${formatCopCurrency(confirmationData.amountPaid)}`;
  confirmationStatus.textContent = `Estado actualizado: ${mapStatusToUiText(confirmationData.newStatus)}`;
  confirmationBalance.textContent = `Saldo pendiente: ${formatCopCurrency(confirmationData.newBalance)}`;
}

function appendCell(row, text, extraClass = "") {
  const cell = document.createElement("td");
  cell.textContent = text;
  if (extraClass) {
    cell.classList.add(extraClass);
  }
  row.appendChild(cell);
}

function setHistoryMessage(text, type) {
  historyMessage.textContent = text;
  historyMessage.classList.remove("is-error", "is-info");
  historyMessage.classList.add(type === "error" ? "is-error" : "is-info");
}

function setPaymentMessage(text, type) {
  paymentMessage.textContent = text;
  paymentMessage.classList.remove("is-error", "is-info", "is-success");
  if (type === "error") {
    paymentMessage.classList.add("is-error");
    return;
  }
  if (type === "success") {
    paymentMessage.classList.add("is-success");
    return;
  }
  paymentMessage.classList.add("is-info");
}

function mapStatusToUiText(status) {
  const normalized = (status || "").toUpperCase();
  if (normalized === "ACTIVO") {
    return "Credito Vigente";
  }
  if (normalized === "PAGADO") {
    return "Credito Pagado";
  }
  if (normalized === "CANCELADO") {
    return "Credito Cancelado";
  }
  return "Estado no definido";
}

function formatCopCurrency(amount) {
  const numeric = Number(amount);
  if (!Number.isFinite(numeric)) {
    return "$ 0,00";
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
}

function formatDateForUi(rawDate) {
  if (!rawDate) {
    return "--/--/----";
  }

  const normalized = String(rawDate).slice(0, 10);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalized);
  if (!match) {
    return String(rawDate);
  }

  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}
