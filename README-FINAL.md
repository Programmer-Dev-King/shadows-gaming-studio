# Shadows Gaming Studio - Project Overview

> **Ascension of Shadows** - AAA Anime Gaming Experience

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748?logo=prisma)](https://www.prisma.io)

---

## 🎮 About

Shadows Gaming Studio is a collective of visionary game developers, designers, and storytellers united by a singular dream: to create legendary gaming experiences that transcend boundaries between anime, gaming, and interactive entertainment.

This repository contains the studio's official website, featuring:
- Stunning anime-inspired animations
- Interactive team member summoning
- Portal transition effects
- Full authentication system
- Admin dashboard

---

## 🌟 Features

### Animation System
- **Gate Opening**: Solo Leveling inspired dungeon gate animation
- **Portal Transitions**: SAO-style portal effects with rotating rings
- **Summoning Sequences**: Team member reveal with shadow rising effects
- **Particle Systems**: Dynamic particle backgrounds

### Theme Hierarchy (Weighted Random Selection)
| Priority | Theme | Source Inspiration |
|----------|-------|-------------------|
| Primary | Solo Leveling | Shadow monarch, gates, arise |
| Secondary | JJK | Cursed energy, domain expansion |
| Secondary | Dr. Stone | Stone crack, hologram tech |
| Secondary | SAO | HUD elements, portal rings |
| Secondary | Naruto | Chakra burst, summoning jutsu |

### Authentication
- NextAuth v5 with credentials provider
- JWT sessions with role support
- Protected dashboard routes
- User signup/login flows

### API Routes
- `/api/auth/*` - Authentication endpoints
- `/api/games` - Game management
- `/api/team` - Team member management
- `/api/messages` - Welcome messages
- `/api/logs` - Activity logging

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Programmer-Dev-King/shadows-gaming-studio.git
cd shadows-gaming-studio

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
shadows-gaming-studio/
├── app/                    # Next.js App Router pages
│   ├── (pages)/           # Public pages (about, team, etc.)
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── portal-demo/       # Portal animation demo
│   └── team-demo/         # Team summoning demo
├── components/            # React components
│   ├── animations/        # Animation components
│   └── ui/               # UI components
├── lib/                   # Utilities and helpers
│   ├── animation-registry.ts
│   ├── animation-controller.ts
│   ├── prisma.ts
│   └── sounds.ts
├── prisma/               # Database schema
├── public/               # Static assets
│   ├── audio/           # Sound files
│   ├── favicon/         # Favicon files
│   └── images/          # Image assets
├── styles/               # Global CSS
├── tools/                # Build scripts
└── types/                # TypeScript types
```

---

## 🎨 Theming

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Shadow Black | `#05070A` | Primary background |
| Abyss Blue | `#0A1A3B` | Secondary background |
| Jin-Woo Blue | `#1F6BFF` | Primary accent (Solo Leveling) |
| Cursed Purple | `#6F2BFF` | Secondary accent (JJK) |
| Neon Cyan | `#37F8FF` | Highlight (SAO) |
| Crystal Green | `#8EFFC1` | Success/Tech (Dr. Stone) |
| Chakra Orange | `#FF6B18` | Warm accent (Naruto) |
| Silver White | `#E5E7EB` | Text |
| Icy Blue | `#A5C7FF` | Muted text |

---

## 🛠 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Check TypeScript types |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run generate-images` | Generate responsive image variants |

---

## 🖼 Image Assets

Large original images are NOT committed to the repository. Instead:

1. Place originals in `public/images/originals/`
2. Run `npm run generate-images`
3. Generated responsive variants appear in `public/images/generated/`

See `public/images/README.md` for detailed guidelines.

### Reference Images for Branding
- Hero banner concepts
- Logo variations
- Team member photos
- Background textures

---

## 🔐 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/shadows_gaming_studio"

# NextAuth
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Optional: OAuth Providers
GITHUB_ID=""
GITHUB_SECRET=""
GOOGLE_ID=""
GOOGLE_SECRET=""
```

---

## 📖 Demo Pages

### Portal Demo
**URL**: `/portal-demo`

Interactive demonstration of the SAO-inspired portal animation with:
- Color selection
- Duration control
- Animation phases visualization

### Team Demo
**URL**: `/team-demo`

Team member summoning demonstration with:
- Manual first summon trigger
- Scroll/keyboard advancement
- Progressive reveal

---

## 🔮 Animation Behavioral Requirements

1. **Page Transitions**: Weighted random selection based on theme tags
2. **Navigation Blocking**: AnimatedLink blocks until transition completes
3. **Team Summoning**: First member manual; subsequent via scroll/keyboard
4. **Audio**: Only plays after user gesture (browser requirement)

---

## 📜 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 👥 Team

- **Dev Kingson** - Founder
- **Utsav Chaurasiya** - Co-Founder & Creative Director
- **Jitendra Soni** - Co-Founder & Technical Lead

---

<p align="center">
  <strong>Shadows Gaming Studio</strong><br>
  <em>Ascension of Shadows - Rise Above Mortals</em>
</p>
