# HU-02 - Diseno funcional y tecnico basico

## Arquitectura general (base)
Patron cliente-servidor local para pruebas:
1. Frontend estatico en `aplicacion/frontend` (HTML/CSS/JS).
2. Mock API REST en `mock_api` (FastAPI).
3. Capa de pruebas API en `api_tests` con cliente reutilizable en `utils/http_client.py`.
4. Capa de pruebas UI en `ui_tests` (Playwright, pendiente de consolidar en HU-07).

## Componentes principales
1. `mock_api/app.py`: expone endpoints de salud, creditos, historial y pagos.
2. `mock_api/models.py`: contratos de entrada/salida.
3. `mock_api/data.py`: datos iniciales y estado mutable en memoria.
4. `utils/http_client.py`: cliente HTTP reutilizable para pruebas.
5. `api_tests/`: pruebas funcionales API.
6. `aplicacion/frontend/src/`: logica de UI y consumo de API.

## Endpoints iniciales del mock API
1. `GET /health`
2. `GET /credits/{credit_number}`
3. `GET /credits/{credit_number}/payments`
4. `POST /payments`

## Estructura base del repositorio
1. `mock_api/`: servicio simulado del backend.
2. `api_tests/`: automatizacion API.
3. `ui_tests/`: automatizacion UI.
4. `aplicacion/frontend/`: interfaz de usuario.
5. `utils/`: componentes reutilizables.
6. `docs/`: documentacion funcional y tecnica.
7. `pipelines/`: integracion CI/CD.

## Contratos base de datos (alto nivel)
Credito:
- `credit_number`, `customer_name`, `balance`, `installment_value`, `due_date`, `status`

Pago:
- request: `credit_number`, `amount`
- response: `message`, `credit_number`, `amount_paid`, `new_balance`, `new_status`

Historial:
- `payment_id`, `credit_number`, `amount`, `payment_date`

## Supuestos tecnicos iniciales
1. Persistencia en memoria para prototipo.
2. Ambiente local para ejecucion funcional.
3. CORS habilitado para frontend local (`127.0.0.1:5500`).
