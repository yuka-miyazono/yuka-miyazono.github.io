@echo off
setlocal
cd /d "%~dp0"
echo Starting local preview at http://127.0.0.1:8000/
echo Keep this window open while previewing. Press Ctrl+C to stop it.
start "Portfolio preview" "http://127.0.0.1:8000/"
py -m http.server 8000 2>nul || python -m http.server 8000
pause
