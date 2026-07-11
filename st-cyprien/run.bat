@echo off
REM Boxing Center — Saint-Cyprien "Le Neuf" (maquette). Serves this folder
REM on http://localhost:5602 so all /assets absolute paths resolve.
cd /d "%~dp0"
echo.
echo   BOXING CENTER - SAINT-CYPRIEN "LE NEUF"
echo   http://localhost:5602
echo.
python -m http.server 5602
