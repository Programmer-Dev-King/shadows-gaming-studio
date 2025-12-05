# Favicon Assets

This directory contains favicon and app icon assets.

## Required Files

For full cross-platform support, generate from a 512x512 source image:

- `favicon.ico` - 16x16, 32x32, 48x48 combined ICO
- `favicon-16x16.png` - 16x16 PNG
- `favicon-32x32.png` - 32x32 PNG
- `apple-touch-icon.png` - 180x180 PNG for iOS
- `android-chrome-192x192.png` - 192x192 for Android/PWA
- `android-chrome-512x512.png` - 512x512 for Android/PWA

## Generation

Use a favicon generator like:
- https://realfavicongenerator.net/
- https://favicon.io/

Upload `public/images/placeholder-logo.svg` or your actual logo.

## Usage in Next.js

Favicons are configured in `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
};
```
