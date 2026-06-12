#!/usr/bin/env bash
set -euo pipefail

SVC=emmanuel-emp
PROJ_DIR=/home/vitor/projects/emmanuel_emp

echo "=== 1. Build ==="
cd "$PROJ_DIR"
npm run build

echo "=== 2. Systemd service ==="
cp /home/vitor/settings/systemd/emmanuel-emp.service /etc/systemd/system/emmanuel-emp.service
systemctl daemon-reload
systemctl enable --now emmanuel-emp.service
systemctl restart emmanuel-emp.service
sleep 2
systemctl is-active --quiet emmanuel-emp && echo "Service is running" || { echo "Service failed!"; journalctl -u emmanuel-emp --no-pager -n 20; exit 1; }

echo "=== 3. Caddy config ==="
caddy validate --config /home/vitor/settings/caddy/Caddyfile
cp /home/vitor/settings/caddy/Caddyfile /etc/caddy/Caddyfile
systemctl reload caddy
echo "Caddy reloaded"

echo "=== 4. Tailscale serve ==="
# Switch from Unix socket to port 8300
tailscale serve --service=svc:$SVC --https=443 off 2>/dev/null || true
tailscale serve --service=svc:$SVC --https=443 http://127.0.0.1:8300
tailscale serve advertise svc:$SVC

sleep 1
curl -sf http://127.0.0.1:8300 -o /dev/null && echo "Port 8300: OK" || echo "Port 8300: not responding"

echo ""
echo "=== Done ==="
echo "  Internal:  http://emmanuel-emp.internal"
echo "  HTTPS:     https://emmanuel-emp.tailae9be.ts.net"
echo ""
echo "NOTE: Add svc:$SVC to the Tailscale ACL (autoApprovers + grants) at:"
echo "  https://login.tailscale.com/admin/acls"
echo "And define the service at:"
echo "  https://login.tailscale.com/admin/services"
