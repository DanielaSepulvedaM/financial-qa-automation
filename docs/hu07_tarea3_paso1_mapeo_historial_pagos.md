# HU-07 - Tarea 3 - Paso 1

## Objetivo
Definir mapeo de datos para la pantalla **Historial de Pagos** usando el contrato real de `GET /credits/{credit_number}/payments` y el prototipo `03_Historial_De_Pagos`.

## Contrato confirmado del API

Endpoint:
- `GET /credits/{credit_number}/payments`

Modelo de respuesta (`mock_api/models.py`):
- `payment_id: str`
- `credit_number: str`
- `amount: float`
- `payment_date: str` (formato ISO datetime)

Comportamiento (`mock_api/app.py`):
- Si el credito no existe -> `404 Credit not found`
- Si existe y no tiene pagos -> `200 []`

## Mapeo API -> UI (Prototipo 03_Historial_De_Pagos)

1. Barra superior (encabezado)
- Nombre de cliente: `customer_name` (tomado de `selectedCredit` ya consultado en detalle)

2. Tarjeta resumen de credito
- Tipo de credito: texto fijo `Credito` (temporal, no existe `credit_type` en API actual)
- Numero: `credit_number` (desde `selectedCredit`)
- Estado: `status` normalizado a UI (`Credito Vigente`, `Credito Pagado`, `Credito Cancelado`)

3. Tabla historial
- Columna `Fecha de Pago` -> `payment_date` (mostrar `dd/mm/yyyy`)
- Columna `Monto` -> `amount` (formato moneda COP)

4. Campos del prototipo sin soporte directo en endpoint de historial
- `Descripcion` por fila: no existe en contrato actual.
  - Decision inicial: mostrar texto fijo `PAGO REGISTRADO`.
- `Fecha de Vencimiento` por fila: no existe en contrato actual de historial.
  - Decision inicial: usar `due_date` de `selectedCredit` para todas las filas.

## Estados UI requeridos para implementar Tarea 3
1. Historial con datos (lista con una o mas filas).
2. Historial vacio (`200 []`) con mensaje: `Este credito no registra pagos aun.`
3. Error de consulta (`404/500`) con mensaje y accion para volver al detalle.

## Datos de prueba recomendados
1. `CR-1001`: historial con pagos.
2. `CR-2002`: historial vacio.
3. `CR-9999`: error 404.
