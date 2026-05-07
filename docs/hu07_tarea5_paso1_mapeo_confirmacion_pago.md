# HU-07 - Tarea 5 - Mapeo funcional y tecnico

## Objetivo
Implementar pantalla de confirmacion de pago en UI mostrando resultado de la transaccion y estado actualizado del credito.

## Prototipo base
- Referencia: `Prototipo/05_Confirmacion_Pago.png`
- Componentes visuales clave:
  1. Panel de confirmacion superpuesto
  2. Icono de confirmacion (check)
  3. Mensaje de exito
  4. Numero de confirmacion

## Contrato de API disponible
- `POST /payments` retorna:
  - `message`
  - `credit_number`
  - `amount_paid`
  - `new_balance`
  - `new_status`
- El API actual no retorna `payment_id` ni `confirmation_number`.

## Mapeo UI de confirmacion
1. Texto principal:
  - `PAGO REALIZADO EXITOSAMENTE` cuando `POST /payments` responde 200.
2. Numero de confirmacion:
  - Temporal: generar codigo UI `CONF-<timestamp>` para trazabilidad local.
  - Nota: idealmente debe venir del backend/mock en una version futura.
3. Estado actualizado:
  - Usar `new_balance` y `new_status` de respuesta.
4. Resumen de monto:
  - Usar `amount_paid`.

## Navegacion propuesta
1. `#pago` -> usuario confirma monto y presiona `PAGAR`.
2. Si exito -> mostrar `#confirmacion`.
3. Desde confirmacion:
  - volver a detalle (para ver estado actualizado), o
  - volver al inicio.

## Validaciones
1. Solo mostrar confirmacion cuando el pago fue exitoso.
2. Si no hay datos de ultima transaccion, bloquear acceso directo a `#confirmacion` y redirigir a detalle/inicio.
