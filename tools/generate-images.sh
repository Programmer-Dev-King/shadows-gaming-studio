#!/bin/bash

# Shadows Gaming Studio - Image Generation Script
# Generates responsive WebP, AVIF, and PNG variants from original images

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ORIGINALS_DIR="$PROJECT_ROOT/public/images/originals"
OUTPUT_DIR="$PROJECT_ROOT/public/images/generated"

# Sizes to generate
SIZES=(320 640 960 1280 1920 2560)

echo "🎨 Shadows Gaming Studio - Image Generator"
echo "==========================================="
echo ""

# Check if sharp-cli is available, if not use Node.js script
if ! command -v sharp &> /dev/null; then
    echo "⚠️  sharp-cli not found, using Node.js script..."
    
    # Create Node.js script for image processing
    cat > "$SCRIPT_DIR/generate-images.mjs" << 'NODESCRIPT'
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.dirname(__dirname);
const originalsDir = path.join(projectRoot, 'public/images/originals');
const outputDir = path.join(projectRoot, 'public/images/generated');

const SIZES = [320, 640, 960, 1280, 1920, 2560];
const FORMATS = ['webp', 'avif', 'png'];

async function processImage(inputPath, filename) {
    const name = path.parse(filename).name;
    
    for (const size of SIZES) {
        for (const format of FORMATS) {
            const outputFilename = `${name}-${size}w.${format}`;
            const outputPath = path.join(outputDir, outputFilename);
            
            try {
                let pipeline = sharp(inputPath).resize(size, null, { 
                    withoutEnlargement: true,
                    fit: 'inside'
                });
                
                if (format === 'webp') {
                    pipeline = pipeline.webp({ quality: 85 });
                } else if (format === 'avif') {
                    pipeline = pipeline.avif({ quality: 80 });
                } else {
                    pipeline = pipeline.png({ compressionLevel: 9 });
                }
                
                await pipeline.toFile(outputPath);
                console.log(`  ✅ Generated: ${outputFilename}`);
            } catch (err) {
                console.error(`  ❌ Failed: ${outputFilename} - ${err.message}`);
            }
        }
    }
}

async function main() {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Check for originals
    if (!fs.existsSync(originalsDir)) {
        console.log('⚠️  No originals directory found. Creating...');
        fs.mkdirSync(originalsDir, { recursive: true });
        console.log('📁 Place your original images in: public/images/originals/');
        process.exit(0);
    }
    
    const files = fs.readdirSync(originalsDir).filter(f => 
        /\.(png|jpg|jpeg|webp|avif)$/i.test(f)
    );
    
    if (files.length === 0) {
        console.log('⚠️  No images found in originals directory.');
        console.log('📁 Place your images in: public/images/originals/');
        process.exit(0);
    }
    
    console.log(`📸 Found ${files.length} image(s) to process\n`);
    
    for (const file of files) {
        console.log(`\n🖼️  Processing: ${file}`);
        await processImage(path.join(originalsDir, file), file);
    }
    
    console.log('\n✅ Image generation complete!');
}

main().catch(console.error);
NODESCRIPT

    # Run the Node.js script
    cd "$PROJECT_ROOT"
    node "$SCRIPT_DIR/generate-images.mjs"
    exit $?
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Check for original images
if [ ! -d "$ORIGINALS_DIR" ] || [ -z "$(ls -A "$ORIGINALS_DIR" 2>/dev/null | grep -E '\.(png|jpg|jpeg|webp|avif)$')" ]; then
    echo "⚠️  No images found in: $ORIGINALS_DIR"
    echo "📁 Place your original images there and run this script again."
    exit 0
fi

echo "📸 Processing images from: $ORIGINALS_DIR"
echo "📁 Output directory: $OUTPUT_DIR"
echo ""

# Process each image
for img in "$ORIGINALS_DIR"/*.{png,jpg,jpeg,webp,avif}; do
    [ -f "$img" ] || continue
    
    filename=$(basename "$img")
    name="${filename%.*}"
    
    echo "🖼️  Processing: $filename"
    
    for size in "${SIZES[@]}"; do
        # WebP
        sharp -i "$img" -o "$OUTPUT_DIR/${name}-${size}w.webp" resize "$size" -- --webp-quality 85 2>/dev/null && \
            echo "  ✅ ${name}-${size}w.webp" || echo "  ⚠️  Skipped ${name}-${size}w.webp"
        
        # AVIF
        sharp -i "$img" -o "$OUTPUT_DIR/${name}-${size}w.avif" resize "$size" -- --avif-quality 80 2>/dev/null && \
            echo "  ✅ ${name}-${size}w.avif" || echo "  ⚠️  Skipped ${name}-${size}w.avif"
        
        # PNG
        sharp -i "$img" -o "$OUTPUT_DIR/${name}-${size}w.png" resize "$size" 2>/dev/null && \
            echo "  ✅ ${name}-${size}w.png" || echo "  ⚠️  Skipped ${name}-${size}w.png"
    done
    
    echo ""
done

echo "✅ Image generation complete!"
echo "📁 Generated images are in: $OUTPUT_DIR"
