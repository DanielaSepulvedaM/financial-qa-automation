# RUNBOOK - Aplicacion (Mock + Frontend)

Guia operativa para levantar y validar la aplicacion conectada al `mock_api`.

## 1) Pre-requisitos

- Python instalado
- Entorno virtual del proyecto en: `C:\AUTOMATIZACION\financial-qa-automation\.venv`
- Puerto `8000` libre para el mock
- Puerto `5500` libre para el frontend estatico

## 2) Levantar Mock API

En una terminal:

```powershell
cd C:\AUTOMATIZACION\financial-qa-automation
.\.venv\Scripts\Activate.ps1
python -m uvicorn mock_api.app:app --host 127.0.0.1 --port 8000 --reload
```

## 3) Validar Mock API

En otra terminal:

```powershell
Invoke-RestMethod http://127.0.0.1:8000/health
Invoke-RestMethod http://127.0.0.1:8000/credits/CR-1001
```

Resultado esperado:
- `health.status = "ok"`
- Respuesta de credito con `credit_number = "CR-1001"`

## 4) Levantar Frontend

En otra terminal:

```powershell
cd C:\AUTOMATIZACION\financial-qa-automation\aplicacion\frontend
python -m http.server 5500
```

Abrir en navegador:
- `http://127.0.0.1:5500`

## 5) Pruebas manuales recomendadas (01_Landing)

1. Exito:
- Ingresar `CR-1001` (o `1001`) y pulsar `CONSULTAR`
- Debe mostrar mensaje de consulta exitosa

2. No encontrado:
- Ingresar `CR-9999`
- Debe mostrar mensaje de credito no encontrado

3. Campo vacio:
- Pulsar `CONSULTAR` sin ingresar valor
- Debe mostrar mensaje de validacion

## 6) Verificacion rapida de logs

- Revisar terminal de `uvicorn` para requests y errores
- Revisar consola del navegador (F12) para errores de red o JS

## 7) Cierre de ejecucion

En las terminales de mock y frontend:
- Presionar `Ctrl + C`

## 8) Troubleshooting basico

- Error de CORS:
  - Verificar origen permitido en `mock_api/app.py`
- `Connection refused` en frontend:
  - Verificar que mock esta arriba en `127.0.0.1:8000`
- Puerto ocupado:
  - Cambiar puerto y actualizar `API_BASE_URL` en `frontend/src/services/apiClient.js`
