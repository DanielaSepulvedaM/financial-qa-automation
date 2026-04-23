# Contexto Handoff (Consola)

## 1) Objetivo actual
- Proyecto: Financial QA Automation - modulo de pago de credito.
- Fase activa: HU-07 UI + automatizacion UI.
- Objetivo de la fase:
  - Construir y evolucionar la UI en `aplicacion/frontend/`.
  - Conectar UI con `mock_api`.
  - Validar flujo manual.
  - Implementar pruebas UI con Playwright.

## 2) Correccion de estructura (23/04/2026)
- Se corrige el criterio anterior que apuntaba a `ui/`.
- La estructura oficial de frontend para HU-07 es:
  - `aplicacion/frontend/index.html`
  - `aplicacion/frontend/src/app.js`
  - `aplicacion/frontend/src/services/apiClient.js`
  - `aplicacion/frontend/src/styles/app.css`
- El folder `ui/` se elimina para evitar duplicidad y confusion.

## 3) Estado actual
- Completado:
  - Mock API disponible en `mock_api/`.
  - Automatizacion API (HU-06) integrada en `main`.
  - Landing inicial funcional en `aplicacion/frontend/`.
- Pendiente de HU-07:
  - Completar flujo UI completo y su automatizacion.

## 4) Alcance HU-07 (definido)
1. Consulta de credito (landing).
2. Detalle de credito.
3. Historial de pagos.
4. Detalle/registro de pago.
5. Confirmacion de pago (mensaje final).
6. Automatizacion UI con Playwright para flujos criticos.

## 5) Plan de ejecucion HU-07 (paso a paso)
1. Validar funcionalmente la landing ya creada en `aplicacion/frontend/` contra mock API.
2. Implementar pantalla de detalle de credito consumiendo `GET /credits/{credit_number}`.
3. Implementar pantalla de historial consumiendo `GET /credits/{credit_number}/payments`.
4. Implementar pantalla de pago consumiendo `POST /payments` con validaciones UI.
5. Implementar pantalla de confirmacion con resultado de pago y estado actualizado.
6. Agregar selectores estables (`data-testid`) para automatizacion.
7. Crear pruebas Playwright para:
   - consulta exitosa
   - consulta no encontrada
   - validacion de campo vacio
   - pago valido
   - pago invalido
8. Ejecutar pruebas, registrar evidencia y cerrar HU-07.

## 6) Criterio de terminado (DoD) actualizado
- UI funcional y completa en `aplicacion/frontend/`.
- Flujo manual validado para escenarios positivos y negativos.
- Pruebas Playwright implementadas y ejecutables.
- Sin duplicar frontend en `ui/`.

## 7) Nota operativa
- Mantener un solo frontend activo en el repo (`aplicacion/frontend`) para trazabilidad y mantenimiento.
