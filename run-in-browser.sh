#!/usr/bin/env bash
set -e
echo "============================================================"
echo "  MarketingHub Online Platform - Browser Launcher"
echo "============================================================"

if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] Node.js is not installed. Download LTS from https://nodejs.org"
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "[1/2] Installing required packages (first time only)..."
  npm install --legacy-peer-deps
fi

echo "[2/2] Starting server at http://localhost:3000 ..."
(sleep 2 && (command -v open >/dev/null 2>&1 && open http://localhost:3000 || command -v xdg-open >/dev/null 2>&1 && xdg-open http://localhost:3000 || true)) &
npm run dev
