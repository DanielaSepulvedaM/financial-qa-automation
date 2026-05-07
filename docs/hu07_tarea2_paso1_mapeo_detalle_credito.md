# HU-07 - Tarea 2 - Paso 1

## Objetivo
Definir el mapeo de datos para la pantalla **Detalle de Credito** usando el contrato real del endpoint `GET /credits/{credit_number}`.

## Contrato confirmado del API

Endpoint:
- `GET /credits/{credit_number}`

Modelo de respuesta (`mock_api/models.py`):
- `credit_number: str`
- `customer_name: str`
- `balance: float`
- `installment_value: float`
- `due_date: str`
- `status: str`

Ejemplo real (`mock_api/data.py`, `CR-1001`):
- `credit_number = "CR-1001"`
- `customer_name = "Ana Torres"`
- `balance = 2500.0`
- `installment_value = 500.0`
- `due_date = "2026-04-15"`
- `status = "ACTIVO"`

## Mapeo API -> UI (Prototipo 02_Detalle_Credito)

1. Barra superior (encabezado)
- Nombre de cliente (extremo derecho): `customer_name`

2. Bloque `Tus Creditos` (resumen)
- Numero de credito: `credit_number`
- Estado de credito (texto UI):
  - `ACTIVO` -> `Credito Vigente`
  - `PAGADO` -> `Credito Pagado`
  - `CANCELADO` -> `Credito Cancelado`
- Tipo de credito (`Credito de Libre Inversion` en prototipo): **no existe en contrato actual**.
  - Decision para implementacion inicial: mostrar texto fijo `Credito` hasta que backend exponga `credit_type` o campo equivalente.

3. Bloque `Detalles del Credito`
- `Saldo Pendiente` -> `balance` (formato moneda COP)
- `Valor Cuota` -> `installment_value` (formato moneda COP)
- `Fecha de Vencimiento` -> `due_date` (formato `dd/mm/yyyy`)

## Reglas de formato para frontend
- Moneda: `Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" })`
- Fecha: parsear `yyyy-mm-dd` y mostrar `dd/mm/yyyy`
- Texto de estado UI normalizado segun tabla anterior

## Manejo de vacios para paso 2
- Si falta `selectedCredit` en `sessionStorage`, mostrar mensaje de sesion expirada y opcion de volver a consultar.
- Si el endpoint responde 404/500, mostrar error y accion para regresar a landing.
