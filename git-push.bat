@echo off

REM Run git commands
git add .
git commit -m "%~1"
git push

REM Restore .gitignore file
git restore --staged .gitignore  
