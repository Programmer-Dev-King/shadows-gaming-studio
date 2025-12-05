# Images Directory

This directory contains image assets for Shadows Gaming Studio.

## Structure

```
public/images/
├── originals/          # Place original high-res images here (excluded from git if >1MB)
├── generated/          # Auto-generated responsive variants (via tools/generate-images.sh)
├── placeholder-*.png   # Lightweight placeholder images
└── README.md          # This file
```

## Adding New Images

1. **Place Original Images**
   - Add your original high-resolution images to `public/images/originals/`
   - Supported formats: JPG, JPEG, PNG, WebP
   - Note: Files >1MB should be excluded from git via `.gitignore`

2. **Generate Responsive Variants**
   ```bash
   # From project root
   ./tools/generate-images.sh
   ```

3. **Generated Sizes**
   - `sm` - 320px width
   - `md` - 640px width  
   - `lg` - 1024px width
   - `xl` - 1920px width

4. **Generated Formats**
   - WebP (preferred for modern browsers)
   - AVIF (best compression, newer browsers)

## Using Placeholders

Until original images are added, use the placeholder images:

```tsx
import Image from 'next/image';

// Placeholder for team member avatar
<Image 
  src="/images/placeholder-avatar.png" 
  alt="Team Member"
  width={200}
  height={200}
/>

// Placeholder for game thumbnail
<Image
  src="/images/placeholder-game.png"
  alt="Game"
  width={400}
  height={300}
/>
```

## Image Guidelines

- **Team Photos**: Square aspect ratio, minimum 800x800px
- **Game Thumbnails**: 16:9 or 4:3 aspect ratio, minimum 1200px width
- **Logo**: Square, minimum 512x512px for favicon generation
- **Hero Images**: Minimum 1920x1080px for full-width display

## Optimization Notes

The `generate-images.sh` script uses Sharp to:
- Resize to multiple breakpoints
- Convert to modern formats (WebP, AVIF)
- Apply quality optimization (80% quality)
- Maintain aspect ratio (no enlargement)

For production, consider using:
- Next.js Image component for automatic optimization
- CDN for image delivery
- Lazy loading for below-the-fold images
