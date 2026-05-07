# HU-05 - Cierre documental

Historia: `HU-05 - Disenar casos de prueba manuales y automatizada`  
Fecha de consolidacion: `2026-05-05`

Subtareas identificadas en Jira (imagen de referencia):
- KAN-30 Identificar escenarios positivos del modulo
- KAN-31 Identificar escenarios negativos del modulo
- KAN-32 Definir validaciones clave del proceso
- KAN-33 Definir validaciones clave del proceso
- KAN-34 Revisar consistencia con requerimientos y reglas de negocio

## Evidencia por subtarea

1. KAN-30 - Escenarios positivos
- Evidencia: [casos_prueba.md](C:\AUTOMATIZACION\financial-qa-automation\docs\casos_prueba.md)
- Casos asociados: `CP-POS-01` a `CP-POS-05`.
- Resultado: definidos escenarios funcionales exitosos para consulta, historial, pago y detalle.

2. KAN-31 - Escenarios negativos
- Evidencia: [casos_prueba.md](C:\AUTOMATIZACION\financial-qa-automation\docs\casos_prueba.md)
- Casos asociados: `CP-NEG-01` a `CP-NEG-05`.
- Resultado: definidos escenarios de no encontrado, validaciones de monto, errores de negocio y control de sesion.

3. KAN-32 - Validaciones clave del proceso (entrada/navegacion)
- Evidencia: [casos_prueba.md](C:\AUTOMATIZACION\financial-qa-automation\docs\casos_prueba.md)
- Cobertura documentada:
  - obligatoriedad de campo
  - normalizacion de numero
  - estado de carga
  - regla de navegacion a detalle con consulta exitosa

4. KAN-33 - Validaciones clave del proceso (reglas de negocio)
- Evidencia: [casos_prueba.md](C:\AUTOMATIZACION\financial-qa-automation\docs\casos_prueba.md)
- Cobertura documentada:
  - restricciones de pago por estado
  - monto > 0
  - monto <= saldo
  - actualizacion de saldo/estado posterior al pago

5. KAN-34 - Consistencia con requerimientos y reglas
- Evidencia funcional:
  - [requerimientos.md](C:\AUTOMATIZACION\financial-qa-automation\docs\requerimientos.md)
  - [casos_prueba.md](C:\AUTOMATIZACION\financial-qa-automation\docs\casos_prueba.md)
- Evidencia tecnica:
  - [app.py](C:\AUTOMATIZACION\financial-qa-automation\mock_api\app.py)
  - [test_get_credit.py](C:\AUTOMATIZACION\financial-qa-automation\api_tests\test_get_credit.py)
  - [test_payment_history.py](C:\AUTOMATIZACION\financial-qa-automation\api_tests\test_payment_history.py)
  - [test_post_payment.py](C:\AUTOMATIZACION\financial-qa-automation\api_tests\test_post_payment.py)
- Resultado: los casos diseniados mantienen trazabilidad con endpoints, flujo y reglas de negocio vigentes.

## Nota de estado
La HU aparece con subtareas finalizadas, pero sin respaldo documental consolidado.  
Con esta evidencia, el cierre queda formalizado en repositorio.

## Nota para Jira (texto sugerido)
```text
Se consolida evidencia documental de HU-05 en repositorio:
- docs/casos_prueba.md: catalogo de escenarios positivos/negativos, validaciones clave y trazabilidad base.
- IMAGENES Y ELEMENTOS ADICIONALES/HU-05_cierre_documental.md: trazabilidad de cierre por subtarea KAN-30..KAN-34.

Adicionalmente se referencia consistencia con:
- docs/requerimientos.md
- mock_api/app.py
- api_tests/test_get_credit.py
- api_tests/test_payment_history.py
- api_tests/test_post_payment.py

Con esto queda soportado documentalmente el cierre de HU-05.
```
