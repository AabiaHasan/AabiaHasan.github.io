@echo off
REM Double-click this file (or run it from a terminal) any time you add,
REM remove, or rename photos or journal posts. It rebuilds the site's
REM photo/post lists — no npm, no install, just Node.js (which you already
REM have, since it ships with most systems used for web dev).
node "%~dp0update-photos.js"
echo.
pause
