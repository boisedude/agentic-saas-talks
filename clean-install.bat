@echo off
cd /d D:\Projects\agentic-saas-talks

REM Kill any node processes
taskkill /f /im node.exe 2>nul

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Force remove node_modules using robocopy to empty folder trick
mkdir "%TEMP%\empty_folder" 2>nul
robocopy "%TEMP%\empty_folder" "node_modules" /MIR /NFL /NDL /NJH /NJS /nc /ns /np
rmdir node_modules 2>nul
rmdir "%TEMP%\empty_folder" 2>nul

REM Now install
npm install
