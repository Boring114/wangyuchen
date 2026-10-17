$ErrorActionPreference = 'SilentlyContinue'
while ($true) {
    $listening = Get-NetTCPConnection -LocalPort 8090 -State Listen
    if (-not $listening) {
        Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "D:\chessboard2.0" -WindowStyle Hidden
        Start-Sleep -Seconds 3
    }
    Start-Sleep -Seconds 20
}
