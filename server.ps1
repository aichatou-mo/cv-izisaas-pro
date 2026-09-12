param([int]$Port = 3000)

$root = $PSScriptRoot
if ([string]::IsNullOrEmpty($root)) {
    $root = "c:\Users\LENOVO\izi saas pro"
}

$ip = [System.Net.IPAddress]::Loopback
$listener = New-Object System.Net.Sockets.TcpListener($ip, $Port)
$listener.Start()

$url = "http://localhost:$Port/"
Write-Host "=========================================================="
Write-Host " Serveur Local CV & Portfolio en ligne"
Write-Host " URL: $url"
Write-Host " Dossier racine: $root"
Write-Host " Appuyez sur Ctrl+C pour arreter le serveur"
Write-Host "=========================================================="

try {
    Start-Process $url -ErrorAction SilentlyContinue
} catch {}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
        $writer = New-Object System.IO.BinaryWriter($stream)

        $requestLine = $reader.ReadLine()
        if (-not [string]::IsNullOrEmpty($requestLine)) {
            $parts = $requestLine.Split(' ')
            if ($parts.Length -ge 2) {
                $rawPath = $parts[1].Split('?')[0].TrimStart('/')
                if ([string]::IsNullOrWhiteSpace($rawPath)) {
                    $rawPath = "index.html"
                }

                $filePath = Join-Path $root $rawPath

                if (Test-Path $filePath -PathType Leaf) {
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $contentType = "application/octet-stream"
                    if ($mimeTypes.ContainsKey($ext)) {
                        $contentType = $mimeTypes[$ext]
                    }

                    $bytes = [System.IO.File]::ReadAllBytes($filePath)
                    $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($bytes.Length)`r`nConnection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)

                    $writer.Write($headerBytes)
                    $writer.Write($bytes)
                    $writer.Flush()
                } else {
                    $body = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 - Fichier non trouve</h1>")
                    $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/html; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                    $writer.Write($headerBytes)
                    $writer.Write($body)
                    $writer.Flush()
                }
            }
        }

        $stream.Close()
        $client.Close()
    }
} finally {
    $listener.Stop()
}
