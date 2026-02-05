#!/bin/bash
set -e

cd "$(dirname "$0")"

MODE="${1:-release}"

echo "Building Bevy game for WebGL ($MODE)..."

if [ "$MODE" = "dev" ]; then
    # Fast dev build (~10-30s)
    wasm-pack build --dev --target web --out-dir ../public/game --out-name game
elif [ "$MODE" = "fast" ]; then
    # Faster release build without LTO (~30-60s)
    wasm-pack build --release --target web --out-dir ../public/game --out-name game -- --profile release-fast
else
    # Full optimized release build (~2-5min)
    wasm-pack build --release --target web --out-dir ../public/game --out-name game
fi

# Clean up unnecessary files
rm -f ../public/game/.gitignore
rm -f ../public/game/package.json

echo "Build complete! Output in public/game/"
