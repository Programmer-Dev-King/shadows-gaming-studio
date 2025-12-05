# Shadows Gaming Studio - Image Assets

This directory contains image placeholders and instructions for adding original assets.

## Directory Structure

```
public/images/
├── originals/          # Place your original high-resolution images here (not committed)
│   └── .gitkeep
├── generated/          # Auto-generated responsive variants (not committed)
│   └── .gitkeep
└── README.md           # This file
```

## Adding Original Images

1. Place original high-resolution images (PNG, JPG, WebP) in the `originals/` directory
2. Run the image generation script: `npm run generate-images`
3. Generated responsive variants will be created in `generated/`

## Image Guidelines

### Branding Images
- Hero banner: 1920x1080 minimum, transparent background preferred
- Logo: 512x512 minimum, SVG preferred
- Team photos: 800x800 minimum, square aspect ratio

### Reference Images (Designer Notes)
The following brand reference images were used for inspiration:
- Solo Leveling inspired dark aesthetic
- JJK cursed energy color palette
- Dr. Stone technology hologram effects  
- SAO HUD interface elements
- Naruto chakra/energy effects

## File Naming Convention

- Use lowercase with hyphens: `hero-banner.png`
- Include size for variants: `hero-banner-1920w.webp`
- Use descriptive names: `team-dev-kingson.png`

## Supported Formats

Input:
- PNG, JPG, JPEG, WebP, AVIF

Output (generated):
- WebP (primary, best compression)
- AVIF (next-gen, smallest size)
- PNG (fallback)

## Large Files

**IMPORTANT**: Original image files larger than 10MB should NOT be committed to the repository.
Use Git LFS or store them externally and reference in the generation script.
