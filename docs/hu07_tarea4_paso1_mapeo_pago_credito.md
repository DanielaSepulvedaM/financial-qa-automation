# HU-07 - Tarea 4 - Mapeo funcional y tecnico

## Objetivo
Definir implementacion de registro de pago en UI usando `POST /payments`.

## Prototipo base
- Referencia: `Prototipo/04_Detalle_Pago.png`
- Componentes:
  1. Titulo `Pago de Credito`
  2. Pregunta `¿Cuanto Quieres Pagar?`
  3. Opcion `Valor de la Cuota`
  4. Opcion `Saldo total del Credito`
  5. Boton `PAGAR`

## Contrato de API usado
- Endpoint: `POST /payments`
- Request:
  - `credit_number: str`
  - `amount: float`
- Response:
  - `message`
  - `credit_number`
  - `amount_paid`
  - `new_balance`
  - `new_status`

## Mapeo UI -> API
1. Opcion `Valor de la Cuota` -> `amount = installment_value` del credito consultado.
2. Opcion `Saldo total del Credito` -> `amount = balance` del credito consultado.
3. `credit_number` -> `selectedCredit.credit_number`.

## Validaciones UI implementadas
1. Debe existir credito consultado en sesion.
2. Debe seleccionarse una opcion de pago.
3. El monto calculado debe ser numerico y mayor que cero.
4. Si credito no esta `ACTIVO` o saldo es `0`, se bloquea accion de pago.

## Manejo de errores API
1. 404 -> credito no encontrado para pago.
2. 400 por regla de negocio -> mensajes de negocio en espanol.
3. Error generico -> mensaje controlado.
