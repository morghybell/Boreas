@echo off
setlocal

set URL=http://localhost:8080/Home.html
set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"

:: Try if Chrome is in PATH
where chrome >nul 2>&1
if %errorlevel% equ 0 (
    start "" chrome %URL%
) else if exist %CHROME_PATH% (
    start "" %CHROME_PATH% %URL%
) else (
    echo Chrome not found in PATH or at %CHROME_PATH%.
    echo Please install Chrome or adjust the path in this script.
    pause
)
start cmd /k python -m http.server 8080
start cmd /k call access\run.bat
start cmd /k call server\run.bat

endlocal

