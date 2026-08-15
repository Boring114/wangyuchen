@echo off
chcp 65001 >nul
title 象棋联机服务启动器
cd /d D:\chessboard2.0
echo ========================================
echo   象棋联机服务启动器
echo ========================================
echo.
echo [1/2] 启动联机服务器(node server.js, 端口8090)...
start "chessboard-server" /min cmd /c "cd /d D:\chessboard2.0 && node server.js"
echo       已启动
echo.
echo [2/2] 启动cpolar隧道(qipan_online -> 8090)...
start "cpolar-tunnel" /min cmd /c "cd /d D:\chessboard2.0 && cpolar start qipan_online --log stdout"
echo       已启动
echo.
echo ========================================
echo   联机服务已启动!
echo   公网地址: wss://319ac561.r17.cpolar.top
echo.
echo   注意:
echo   1. 此窗口和弹出的两个小窗口都要保持运行
echo   2. 电脑重启后重新双击本脚本即可恢复
echo   3. 若cpolar地址变化,请告知修改online.js
echo ========================================
pause
