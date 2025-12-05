#!/bin/bash
# generate-images.sh
# Generates responsive image variants from originals using sharp
# Place original images in public/images/originals/ and run this script

set -e

ORIGINALS_DIR="public/images/originals"
OUTPUT_DIR="public/images/generated"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Check if node and sharp are available
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required but not installed."
    exit 1
fi

# Check if originals directory exists and has images
if [ ! -d "$ORIGINALS_DIR" ]; then
    echo "No originals directory found at $ORIGINALS_DIR"
    echo "Please create the directory and add your original images."
    exit 0
fi

IMAGES=$(find "$ORIGINALS_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) 2>/dev/null)

if [ -z "$IMAGES" ]; then
    echo "No images found in $ORIGINALS_DIR"
    echo "Add your original images to generate responsive variants."
    exit 0
fi

echo "🖼️  Generating responsive image variants..."
echo "================================================"

# Node.js script for sharp processing
node << 'EOF'
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ORIGINALS_DIR = 'public/images/originals';
const OUTPUT_DIR = 'public/images/generated';

const SIZES = [
  { name: 'sm', width: 320 },
  { name: 'md', width: 640 },
  { name: 'lg', width: 1024 },
  { name: 'xl', width: 1920 },
];

const FORMATS = ['webp', 'avif'];

async function processImages() {
  const files = fs.readdirSync(ORIGINALS_DIR).filter(f => 
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  for (const file of files) {
    const inputPath = path.join(ORIGINALS_DIR, file);
    const baseName = path.parse(file).name;
    
    console.log(`Processing: ${file}`);

    for (const size of SIZES) {
      for (const format of FORMATS) {
        const outputPath = path.join(OUTPUT_DIR, `${baseName}-${size.name}.${format}`);
        
        try {
          await sharp(inputPath)
            .resize(size.width, null, { withoutEnlargement: true })
            .toFormat(format, { quality: 80 })
            .toFile(outputPath);
          
          console.log(`  ✓ ${baseName}-${size.name}.${format}`);
        } catch (err) {
          console.error(`  ✗ Error generating ${outputPath}: ${err.message}`);
        }
      }
    }
  }
  
  console.log('\n✅ Image generation complete!');
}

processImages().catch(console.error);
EOF

echo "================================================"
echo "Done! Generated images are in $OUTPUT_DIR"
