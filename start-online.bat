@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 正在启动棋盘点将联机服务器 (端口 8090)...
echo 请确保 cpolar 服务已运行，否则外网无法访问。
node server.js
pause
