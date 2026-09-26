#!/usr/bin/env bash
# Chụp PNG từng màn hình (1440x900) từ ChatApp-UI-Prototype.html bằng Chrome headless.
#   ./shots.sh [theme]   theme: mono-light (mặc định) | mono-dark | indigo-light
# Ảnh lưu vào screenshots/<theme>/<id>.png – dùng cho báo cáo đồ án.
set -euo pipefail
cd "$(dirname "$0")"
THEME="${1:-mono-light}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="screenshots/$THEME"
mkdir -p "$OUT"
IDS=$(grep -o '<section class="screen" id="[^"]*" data-title="[^"]*" data-h="[0-9]*"' ChatApp-UI-Prototype.html | sed -E 's/.*id="([^"]*)".*data-h="([0-9]*)"/\1:\2/')
for entry in $IDS; do
  id="${entry%%:*}"; h="${entry##*:}"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,"$h" --virtual-time-budget=3000 \
    --screenshot="$OUT/$id.png" "file://$PWD/ChatApp-UI-Prototype.html?bare&theme=$THEME#$id" >/dev/null 2>&1
  echo "  $OUT/$id.png"
done
