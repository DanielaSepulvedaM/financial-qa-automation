# HU-05 - Diseno de casos de prueba manuales y automatizada

## Objetivo
Definir el set base de casos de prueba para el modulo de pago de credito, separando escenarios manuales y escenarios automatizables.

## Alcance
1. Consulta de credito.
2. Visualizacion de detalle.
3. Historial de pagos.
4. Registro de pagos.

## Datos base para pruebas
- Creditos validos: `CR-1001`, `CR-2001`, `CR-2002`
- Credito no existente: `CR-9999`

## Casos de prueba positivos

| ID | Escenario | Tipo | Canal | Resultado esperado |
|---|---|---|---|---|
| CP-POS-01 | Consultar credito existente `CR-1001` | Manual + Automatizable | UI/API | Retorna datos del credito y estado valido |
| CP-POS-02 | Consultar historial de un credito con pagos (`CR-1001`) | Manual + Automatizable | API | Respuesta 200 y lista con registros |
| CP-POS-03 | Consultar historial de un credito sin pagos (`CR-2002`) | Manual + Automatizable | API | Respuesta 200 y lista vacia |
| CP-POS-04 | Registrar pago valido sobre credito activo con saldo positivo | Manual + Automatizable | API | Respuesta 200, saldo disminuye y estado se mantiene o cambia a `PAGADO` |
| CP-POS-05 | Visualizar detalle de credito tras consulta exitosa | Manual | UI | Muestra numero, estado, saldo, cuota y fecha de vencimiento |

## Casos de prueba negativos

| ID | Escenario | Tipo | Canal | Resultado esperado |
|---|---|---|---|---|
| CP-NEG-01 | Consultar credito inexistente `CR-9999` | Manual + Automatizable | UI/API | Respuesta 404 / mensaje de no encontrado |
| CP-NEG-02 | Registrar pago con monto mayor al saldo | Manual + Automatizable | API | Respuesta 400, regla de negocio validada |
| CP-NEG-03 | Registrar pago con monto `0` | Manual + Automatizable | API | Respuesta 400, monto invalido |
| CP-NEG-04 | Registrar pago para credito inexistente | Manual + Automatizable | API | Respuesta 404 |
| CP-NEG-05 | Intentar abrir detalle sin credito consultado en sesion | Manual | UI | Se mantiene controlado, solicita consulta previa |

## Validaciones clave del proceso (entrada y navegacion)
1. Normalizacion de numero de credito en UI (`1001` -> `CR-1001`).
2. Campo de consulta obligatorio en landing.
3. Manejo de estado de carga al consultar (`CONSULTANDO...`).
4. Navegacion a detalle solo con consulta exitosa.

## Validaciones clave del proceso (reglas de negocio)
1. No permitir pagos para creditos `PAGADO` o `CANCELADO`.
2. No permitir montos menores o iguales a cero.
3. No permitir montos superiores al saldo pendiente.
4. Actualizar `balance` y `status` despues de pago exitoso.

## Trazabilidad base a reglas y endpoints
1. `GET /credits/{credit_number}` -> CP-POS-01, CP-NEG-01.
2. `GET /credits/{credit_number}/payments` -> CP-POS-02, CP-POS-03.
3. `POST /payments` -> CP-POS-04, CP-NEG-02, CP-NEG-03, CP-NEG-04.

## Referencias de implementacion actual
1. Pruebas API implementadas:
   - `api_tests/test_get_credit.py`
   - `api_tests/test_payment_history.py`
   - `api_tests/test_post_payment.py`
2. Mock API y reglas:
   - `mock_api/app.py`
3. Frontend de consulta/detalle:
   - `aplicacion/frontend/src/app.js`
   - `aplicacion/frontend/src/services/apiClient.js`
