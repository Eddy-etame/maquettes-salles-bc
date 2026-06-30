@echo off
REM ── Boxing Center · Minimes — lance la maquette ──
REM Double-clique ce fichier. Il démarre un petit serveur local et ouvre le site.
REM (Ouvrir index.html directement NE marche pas : les chemins /assets/ ont besoin d'un serveur.)
cd /d "%~dp0"
echo Demarrage du serveur sur http://localhost:5588 ...
start "" /min python -m http.server 5588
timeout /t 1 >nul
start "" "http://localhost:5588"
echo.
echo Le site tourne. Garde cette fenetre ouverte. Ferme-la pour arreter le serveur.
echo Si la page est vide, attends 2s et rafraichis (F5).
pause >nul
