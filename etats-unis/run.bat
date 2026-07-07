@echo off
REM Boxing Center — Etats-Unis "Le Colosse" (maquette). Serves this folder
REM on http://localhost:5601 so all /assets absolute paths resolve.
cd /d "%~dp0"
echo.
echo   BOXING CENTER - ETATS-UNIS "LE COLOSSE"
echo   http://localhost:5601
echo.
python -m http.server 5601
