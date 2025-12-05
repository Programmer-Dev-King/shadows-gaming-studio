// tools/generate-images.js
// Generates responsive image variants from originals using sharp
// Usage: node tools/generate-images.js

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
  // Check if sharp is available
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('Error: sharp module not found. Please run: npm install sharp');
    process.exit(1);
  }

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Check for originals directory
  if (!fs.existsSync(ORIGINALS_DIR)) {
    console.log(`No originals directory found at ${ORIGINALS_DIR}`);
    console.log('Please create the directory and add your original images.');
    return;
  }

  // Get image files
  const files = fs.readdirSync(ORIGINALS_DIR).filter((f) =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  if (files.length === 0) {
    console.log(`No images found in ${ORIGINALS_DIR}`);
    console.log('Add your original images to generate responsive variants.');
    return;
  }

  console.log('🖼️  Generating responsive image variants...');
  console.log('================================================');

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

  console.log('');
  console.log('✅ Image generation complete!');
  console.log(`Generated images are in ${OUTPUT_DIR}`);
}

processImages().catch(console.error);
