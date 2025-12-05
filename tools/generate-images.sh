#!/bin/bash
# generate-images.sh
# Generates responsive image variants from originals using sharp
# Place original images in public/images/originals/ and run this script

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# Check if node is available
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required but not installed."
    exit 1
fi

# Run the Node.js script
node tools/generate-images.js
