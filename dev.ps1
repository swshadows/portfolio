$curr_dir = (Get-Item -Path ".\").FullName


Start-Process pwsh -ArgumentList '-NoExit', '-Command', "live-server . --wait=250" -WorkingDirectory $curr_dir
Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'sass sass:css --watch --no-source-map --style=compressed' -WorkingDirectory $curr_dir
