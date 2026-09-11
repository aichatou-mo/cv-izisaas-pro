@echo off
title Serveur Local Portfolio - Aichatou Moussa Ousmane
cd /d "%~dp0"
echo Demarrage du serveur local sur http://localhost:3000/ ...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 3000
pause
