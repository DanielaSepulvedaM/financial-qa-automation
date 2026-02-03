# Financial QA Automation – Credit & Payments System

## 📌 Descripción del proyecto
Este proyecto implementa una estrategia de **pruebas automatizadas** para un sistema financiero encargado de la gestión de **clientes, créditos y pagos**.  
El objetivo es validar **reglas de negocio críticas** mediante pruebas **API y UI**, integradas a un flujo de **CI/CD**, aplicando principios de **Quality Engineering**.

El proyecto tiene fines demostrativos y está orientado a mostrar buenas prácticas de automatización de pruebas en entornos financieros.

---

## 🎯 Alcance funcional
El sistema bajo prueba contempla los siguientes módulos:

- Gestión de clientes
- Creación y consulta de créditos
- Registro y validación de pagos
- Visualización básica de información vía interfaz gráfica (UI)

---

## 🧪 Estrategia de pruebas
La estrategia de pruebas se basa en la **pirámide de testing**, priorizando:

- **Pruebas automatizadas de API** para validar reglas de negocio
- **Pruebas UI** enfocadas únicamente en flujos críticos
- Integración de las pruebas en un **pipeline de CI/CD**

Las pruebas de UI no replican validaciones de negocio ya cubiertas a nivel API.

---

## 🧰 Tecnologías utilizadas
- Python 3.10
- Pytest
- Requests
- Playwright
- Git / GitHub
- Azure DevOps Pipelines

---

## 📁 Estructura del proyecto
La organización del proyecto sigue una estructura modular para facilitar el mantenimiento y la escalabilidad:
financial-qa-automation/
├------api_tests/
├------ui_tests/
├------utils/
├------pipelines/
├------requirements.txt
├------README.md


---

## 🤖 Uso de IA en el proyecto
Se utiliza **Inteligencia Artificial como copiloto** para:

- Generar casos de prueba base
- Identificar escenarios borde y negativos
- Refactorizar código de pruebas
- Analizar fallos y logs del pipeline

La IA se usa como apoyo, manteniendo siempre el **criterio técnico del QA Engineer**.

---

## ▶️ Ejecución de pruebas

### Ejecutar pruebas de API
```bash
pytest api_tests