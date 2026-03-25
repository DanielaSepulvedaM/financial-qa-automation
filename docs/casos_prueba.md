# Casos de Prueba - Modulo de Pago de Credito

## 1. Objetivo
Definir los casos de prueba funcionales del modulo de pago de credito para validar el flujo principal del sistema y sus reglas de negocio.

## 2. Alcance
Se contemplan pruebas sobre:

- consulta de credito
- visualizacion de informacion del credito
- registro de pago
- validacion de reglas de negocio
- consulta de historial de pagos

## 3. Escenarios positivos
- Consultar un credito existente.  
- Visualizar correctamente la informacion del credito.
- Registrar un pago valido. 
- Actualizar saldo pendiente despues del pago.
- Cambiar el estado a PAGADO cuando el saldo llega a cero. 
- Consultar historial de pagos con registros existentes. 

## 4. Escenarios negativos
- Consultar un credito existente.
- Visualizar correctamente la informacion del credito.
- Registrar un pago valido.
- Actualizar saldo pendiente despues del pago.
- Cambiar el estado a PAGADO cuando el saldo llega a cero.
- Consultar historial de pagos con registros existentes.

## 5. Validaciones clave
- Consultar un credito inexistente.
- Intentar registrar un pago sobre un credito pagado o cancelado.
- Intentar registrar un pago con valor cero.
- Intentar registrar un pago con valor negativo.
- Intentar registrar un pago superior al saldo pendiente.
- Intentar registrar un pago con campos obligatorios vacios.

## 6. Casos de prueba detallados

### CP-01 Consultar credito existente
**Tipo:** Positivo  
**Precondicion:** Existe un credito activo con saldo pendiente mayor a cero.  
**Pasos:**  
1. Consultar el credito por su ID.
2. Revisar la respuesta de la consulta.
**Resultado esperado:** El sistema responde exitosamente y muestra la informacion del credito consultado.

### CP-02 Visualizar informacion del credito
**Tipo:** Positivo  
**Precondicion:** Existe un credito activo con saldo pendiente y datos completos.  
**Pasos:**  
1. Consultar el detalle del credito.
2. Verificar campos de informacion (cliente, saldo, estado, fecha).
**Resultado esperado:** La informacion del credito se visualiza completa y consistente.

### CP-03 Registrar pago valido
**Tipo:** Positivo  
**Precondicion:** Existe un credito activo y un monto de pago valido menor o igual al saldo pendiente.  
**Pasos:**  
1. Enviar solicitud de pago con credito valido y monto permitido.
2. Consultar nuevamente el credito.
**Resultado esperado:** El pago se registra con exito y el saldo pendiente disminuye correctamente.

### CP-04 Actualizar saldo y estado a PAGADO
**Tipo:** Positivo  
**Precondicion:** Existe un credito activo cuyo saldo pendiente es igual al monto a pagar.  
**Pasos:**  
1. Registrar un pago por el total del saldo pendiente.
2. Consultar el estado actualizado del credito.
**Resultado esperado:** El saldo queda en cero y el estado del credito cambia a PAGADO.

### CP-05 Consultar historial de pagos
**Tipo:** Positivo  
**Precondicion:** El credito tiene al menos un pago registrado.  
**Pasos:**  
1. Consultar historial de pagos por ID de credito.
2. Revisar el listado de transacciones.
**Resultado esperado:** El historial devuelve los pagos existentes con sus datos principales.

### CP-06 Consultar credito inexistente
**Tipo:** Negativo  
**Precondicion:** El ID de credito no existe en el sistema.  
**Pasos:**  
1. Consultar un credito inexistente.
**Resultado esperado:** El sistema responde error controlado indicando que el credito no fue encontrado.

### CP-07 Intentar pago en credito pagado o cancelado
**Tipo:** Negativo  
**Precondicion:** Existe un credito con estado PAGADO o CANCELADO.  
**Pasos:**  
1. Intentar registrar un pago sobre el credito no activo.
**Resultado esperado:** El sistema rechaza la operacion e informa que no se permiten pagos en ese estado.

### CP-08 Validar montos y campos obligatorios en pago
**Tipo:** Negativo  
**Precondicion:** Existe un credito activo.  
**Pasos:**  
1. Intentar registrar pago con monto cero.
2. Intentar registrar pago con monto negativo.
3. Intentar registrar pago mayor al saldo pendiente.
4. Intentar registrar pago con campos obligatorios vacios.
**Resultado esperado:** En todos los casos el sistema rechaza la solicitud y retorna mensajes de validacion claros.
