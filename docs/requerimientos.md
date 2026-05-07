# HU-02 - Requerimientos funcionales base

## Objetivo
Definir el flujo funcional principal del modulo de pago de credito para habilitar diseno tecnico y automatizacion.

## Alcance funcional base
1. Consultar un credito por numero.
2. Visualizar informacion del credito consultado.
3. Consultar historial de pagos del credito.
4. Registrar un pago sobre el credito.
5. Actualizar saldo y estado del credito luego del pago.

## Flujo funcional principal
1. Usuario ingresa numero de credito en landing.
2. Sistema consulta `GET /credits/{credit_number}`.
3. Si el credito existe, muestra detalle (estado, saldo, cuota, vencimiento).
4. Usuario puede consultar historial con `GET /credits/{credit_number}/payments`.
5. Usuario registra pago con `POST /payments`.
6. Sistema valida reglas y retorna resultado (nuevo saldo y estado).

## Reglas de negocio base identificadas
1. No se permite pago en creditos `PAGADO` o `CANCELADO`.
2. `amount` debe ser mayor a cero.
3. `amount` no puede superar el saldo pendiente.
4. Cuando saldo llega a `0`, estado cambia a `PAGADO`.

## Escenarios base
1. Consulta de credito existente.
2. Consulta de credito inexistente.
3. Pago exitoso.
4. Pago invalido por monto mayor al saldo.
5. Pago invalido por monto cero.
6. Historial de pagos para credito con y sin pagos.
