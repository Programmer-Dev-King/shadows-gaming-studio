# 🌑 Shadows Gaming Studio - Complete Documentation

## Overview

Shadows Gaming Studio is a Next.js 14 web application featuring anime-inspired design and AAA gaming aesthetics. The project showcases advanced animation systems, theming based on popular anime (Solo Leveling, JJK, Dr. Stone, SAO, Naruto), and a complete authentication system.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + custom CSS animations
- **Animation**: Framer Motion + GSAP
- **Database**: PostgreSQL via Prisma ORM
- **Authentication**: NextAuth.js v5 (Credentials provider)
- **Package Manager**: npm

## Project Structure

```
shadows-gaming-studio/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   │   ├── auth/             # NextAuth routes
│   │   ├── games/            # Game management
│   │   ├── team/             # Team management
│   │   ├── messages/         # Welcome messages
│   │   └── logs/             # Activity logging
│   ├── (pages)/              # Route groups
│   │   ├── about/
│   │   ├── vision/
│   │   ├── team/
│   │   ├── projects/
│   │   ├── contact/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── dashboard/
│   │   └── shadow-realm/     # Secret Konami code page
│   ├── portal-demo/          # Animation demo
│   ├── team-demo/            # Team summoner demo
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── animations/           # Animation components
│   ├── AnimatedLink.tsx      # Link with transition
│   ├── RouteAnimationHandler.tsx
│   └── ClientMounts.tsx      # Client-side effects
├── lib/
│   ├── prisma.ts             # Prisma client singleton
│   ├── animation-registry.ts # Animation selection system
│   ├── animation-controller.ts
│   ├── sounds.ts             # Audio manager
│   ├── theme.ts              # Color/design tokens
│   ├── konami-code.ts        # Easter egg hook
│   └── welcome-messages-extended.ts
├── prisma/
│   └── schema.prisma         # Database schema
├── public/
│   ├── images/               # Image assets
│   ├── audio/                # Sound effects
│   ├── favicon/              # Icons
│   └── manifest.json         # PWA manifest
├── styles/
│   ├── globals.css
│   ├── animations.css
│   ├── particles.css
│   └── hud-theme.css
├── tools/
│   ├── generate-images.sh    # Image optimization
│   └── setup-guide.sh        # Setup helper
└── types/                    # TypeScript declarations
```

## Animation System

### AnimationRegistry

The `lib/animation-registry.ts` manages animation selection using weighted random selection:

- **Primary Theme**: Solo Leveling (weight: 40)
- **Secondary Hierarchy**: JJK (25) > Dr. Stone (15) > SAO (12) > Naruto (8)

```typescript
import animationRegistry from '@/lib/animation-registry';

// Get animation for page
const animation = animationRegistry.selectWeightedRandom(['home', 'hero'], 'gate');
```

### Key Animations

1. **Gate Opening** - Solo Leveling style entrance
2. **Portal Timeline** - Page transition effect
3. **Summoning Timeline** - Naruto-style character reveal
4. **Particle System** - Ambient floating particles

### AnimatedLink Component

Blocks navigation until animation completes (as per Q1=Yes requirement):

```tsx
import AnimatedLink from '@/components/AnimatedLink';

<AnimatedLink href="/about" tags={['navigation']}>
  Go to About
</AnimatedLink>
```

## Team Summoning System

Per Q2=Yes requirement, the team page:
- Requires manual first summon (click button)
- Subsequent members via scroll/keyboard navigation

```tsx
import TeamSummoner from '@/components/animations/TeamSummoner';

<TeamSummoner 
  members={teamData} 
  autoSummonFirst={false} 
/>
```

## Sound System

Per Q3=Yes requirement, sounds only play after user gesture:

```typescript
import SoundManager from '@/lib/sounds';

// Sounds only work after user interaction
SoundManager.playSound('portal');
```

## Database Models

### User
- id, email, password, name, role, profile, avatar
- Roles: ADMIN, FOUNDER, COFOUNDER, CA, CEO, MD, USER

### Game
- id, title, description, image, engineType, status

### TeamMember
- id, name, role, title, description, photo, socials, summoningColor

### WelcomeMessage
- id, message, type (STATIC/DYNAMIC)

### Log
- id, userId, action, details, timestamp

## API Routes

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth handlers |
| `/api/auth/signup` | POST | User registration |
| `/api/games` | GET, POST | Game CRUD |
| `/api/team` | GET, POST | Team management |
| `/api/messages` | GET, POST, DELETE | Welcome messages |
| `/api/logs` | GET, POST | Activity logs |

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Shadow Black | #05070A | Background |
| Abyss Blue | #0A1A3B | Secondary background |
| Jin-Woo Blue | #1F6BFF | Primary accent (Solo Leveling) |
| Cursed Purple | #6F2BFF | JJK theme |
| Neon Cyan | #37F8FF | SAO theme |
| Crystal Green | #8EFFC1 | Dr. Stone theme |
| Chakra Orange | #FF6B18 | Naruto theme |
| Silver White | #E5E7EB | Text |
| Icy Blue | #A5C7FF | Secondary text |

## Easter Eggs

### Konami Code
Enter: ↑ ↑ ↓ ↓ ← → ← → B A

Unlocks the Shadow Realm page with exclusive content.

## Setup

See [SETUP-COMPLETE.md](./SETUP-COMPLETE.md) for detailed instructions.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guides.

## License

MIT License - see LICENSE file.

---

**Shadows Gaming Studio** - *Rise Above Mortals. Ascend into Shadows.*
