# Flujo recomendado para continuar un chat largo por consola

## Objetivo
Evitar lentitud del navegador manteniendo continuidad de contexto entre sesiones.

## Paso 1: Generar handoff desde ChatGPT Web
En tu chat grande del navegador, pide:

```text
Genera un handoff tecnico para continuar por consola.
Formato obligatorio:
1) Objetivo actual
2) Estado actual
3) Decisiones tecnicas
4) Alcance siguiente sesion (incluye/excluye/DoD)
5) Backlog inmediato priorizado
6) Riesgos y bloqueos
7) Archivos, ramas y commits relevantes
8) Comandos utiles ya probados
9) Evidencia de pruebas y resultados
No omitas detalles operativos.
```

## Paso 2: Guardar handoff en el repo
Copiar ese contenido en:
- `docs/contexto_handoff.md`

## Paso 3: Iniciar sesion por consola con contexto
En la primera instruccion de la sesion, usar algo como:

```text
Lee docs/contexto_handoff.md y continua desde el backlog inmediato.
Mantente en alcance definido y reporta avances por tarea cerrada.
```

## Paso 4: Ejecutar y cerrar por iteraciones cortas
Por cada bloque de trabajo:
1. Implementar
2. Ejecutar pruebas
3. Reportar resultado
4. Commit/push (si aplica)

## Paso 5: Actualizar handoff al final de cada sesion
Antes de cerrar, actualizar:
- estado actual
- backlog inmediato
- riesgos/bloqueos
- commits nuevos
- resultados de pruebas

## Reglas practicas
- No depender de "memoria del chat".
- Siempre usar archivos del repo como fuente de verdad.
- Mantener sesiones cortas y frecuentes para evitar degradacion.

