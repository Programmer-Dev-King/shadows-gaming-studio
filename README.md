# 🔥 SHADOWS GAMING STUDIO

**Ascension of Shadows** - A cutting-edge anime-inspired AAA gaming studio website blending **Solo Leveling**, **Jujutsu Kaisen**, **Dr. Stone**, **Sword Art Online**, and **Naruto** aesthetics into one immersive experience.

![Shadows Gaming Studio](https://img.shields.io/badge/Status-Active-brightgreen)
![Next.js 14](https://img.shields.io/badge/Next.js-14-black)
![React 18](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38b2ac)
![License MIT](https://img.shields.io/badge/License-MIT-green)

## 🎮 Live Demo

🚀 **[shadows-gaming-studio.vercel.app](https://shadows-gaming-studio.vercel.app)** *(Coming Soon)*

## ✨ Key Features

- 🎬 **Gate Opening Animation** - Dramatic Solo Leveling entrance with 3D effects
- 🌀 **Portal Transitions** - Smooth cinematic page-to-page animations  
- ⚡ **Summoning Effects** - Character reveal with unique animations per member
- ✨ **Particle Systems** - Advanced floating embers and crystal particles
- 🎨 **HUD Interface** - SAO-inspired futuristic dashboard panels
- 📱 **Responsive Design** - Mobile, tablet, and desktop optimized
- 🔐 **Secure Authentication** - NextAuth v5 with JWT sessions
- 🗄️ **PostgreSQL Database** - Prisma ORM with type-safe queries
- ⚙️ **Admin Dashboard** - Manage games, team, and welcome messages
- 🎯 **Secret Page** - Hidden Shadow Realm unlocked via Konami code
- 🎵 **Sound Effects** - Anime-style audio for all animations
- 🎨 **10 Unique Pages** - Each with its own animation style and theme

## 📊 Page Overview

| Page | Animation Style | Theme | Duration |
|------|-----------------|-------|----------|
| **Home** | Gate Opening | Solo Leveling Blue | 2s |
| **About** | Portal Transition | JJK Purple | 1. 6s |
| **Vision** | Scroll Reveal | Dr. Stone Green | Dynamic |
| **Team** | Summoning Circle | Solo Leveling Blue | 2. 2s each |
| **Projects** | Coming Soon | Futuristic Cyan | N/A |
| **Contact** | Form Entry | Naruto Orange | N/A |
| **Login** | Shadow Awakening | Solo Leveling | Custom |
| **Signup** | Shadow Binding | JJK Purple | Custom |
| **Dashboard** | Power Stats HUD | SAO Cyan | N/A |
| **Shadow Realm** | All Effects | Mixed Blend | Unlocked |

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with app router
- **React 18** - UI components and hooks
- **TypeScript** - Type-safe development
- **Framer Motion** - Smooth animations
- **GSAP** - Advanced animation sequences
- **Three.js** - 3D elements (optional)

### Styling
- **TailwindCSS** - Utility-first CSS framework
- **Custom CSS** - Anime-style effects and glows
- **CSS Animations** - Keyframes for complex sequences

### Backend & Database
- **Next.js API Routes** - Serverless endpoints
- **PostgreSQL** - Relational database via Neon
- **Prisma ORM** - Type-safe database client
- **NextAuth v5** - Authentication & authorization

### DevOps & Deployment
- **Vercel** - Hosting and CDN
- **GitHub** - Version control
- **Neon** - Cloud PostgreSQL

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Git**
- **Neon Account** (Free PostgreSQL) - [Sign up](https://neon.tech)

### Installation

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/Programmer-Dev-King/shadows-gaming-studio.git
cd shadows-gaming-studio
```

#### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

#### 3️⃣ Setup Database (Neon PostgreSQL)

1. Go to [neon.tech](https://neon.tech) and create free account
2. Create new project
3. Copy the PostgreSQL connection string
4.  Should look like: `postgresql://user:password@host:5432/dbname`

#### 4️⃣ Create Environment Variables

Create `.env. local` in project root:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/shadows_gaming_studio"

# NextAuth Security
NEXTAUTH_SECRET="generate-with-command-below"
NEXTAUTH_URL="http://localhost:3000"

# Optional: OAuth Providers
GITHUB_ID="your_github_app_id"
GITHUB_SECRET="your_github_app_secret"

GOOGLE_ID="your_google_oauth_id"
GOOGLE_SECRET="your_google_oauth_secret"
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

Copy output and paste in `.env.local`

#### 5️⃣ Setup Database Schema

```bash
# Create and run migrations
npx prisma migrate dev --name init

# Optional: View database UI
npx prisma studio
```

#### 6️⃣ Start Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** 🎮

#### 7️⃣ Test the App

- **Homepage**: Watch gate opening animation
- **Sign Up**: Go to `/signup` and create account
- **Login**: Go to `/login` with credentials
- **Dashboard**: View your power stats
- **Secret Page**: Press Konami code (↑ ↑ ↓ ↓ ← → ← → B A) to unlock Shadow Realm

## 📁 Project Structure

```
shadows-gaming-studio/
│
├── app/                          # Next.js app directory
│   ├── (pages)/                  # Page routes
│   │   ├── about/page.tsx        # About page
│   │   ├── vision/page.tsx       # Vision page
│   │   ├── team/page.tsx         # Team page
│   │   ├── projects/page.tsx     # Projects page
│   │   ├── contact/page.tsx      # Contact form
│   │   ├── login/page.tsx        # Login page
│   │   ├── signup/page.tsx       # Signup page
│   │   ├── dashboard/page.tsx    # User dashboard
│   │   └── shadow-realm/page.tsx # Secret page
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   ├── [... nextauth]/route.ts
│   │   │   └── signup/route.ts
│   │   ├── games/route.ts
│   │   ├── team/route.ts
│   │   └── messages/route.ts
│   ├── layout. tsx               # Root layout
│   ├── page. tsx                 # Home page
│   └── providers.tsx            # Client providers
│
├── components/                   # Reusable components
│   ├── animations/              # Animation components
│   │   ├── GateOpening.tsx
│   │   ├── PortalTransition.tsx
│   │   ├── SummoningSequence.tsx
│   │   ├── ParticleSystem.tsx
│   │   └── AnimationProvider.tsx
│   ├── ui/                      # UI components
│   │   ├── Navbar.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── HUDPanel.tsx
│   └── WelcomeOverlay.tsx
│
├── lib/                         # Utility functions
│   ├── animation-controller.ts  # Animation orchestrator
│   ├── welcome-messages.ts      # Random messages database
│   ├── animation-memory.ts      # Animation tracking
│   ├── konami-code.ts           # Secret code hook
│   ├── theme. ts                 # Theme config
│   ├── sounds.ts                # Sound manager
│   └── prisma.ts                # Prisma client
│
├── styles/                      # Global styles
│   ├── globals.css             # Colors, glows, base styles
│   ├── animations.css          # Keyframe animations
│   ├── particles.css           # Particle effects
│   └── hud-theme.css           # HUD and anime styles
│
├── types/                       # TypeScript definitions
│   └── index.ts
│
├── prisma/                      # Database
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Migration files
│
├── public/                      # Static assets
├── middleware. ts                # NextAuth middleware
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── . env.example
└── README.md
```

## 🎨 Design System

### Color Palette

**Primary Colors (Solo Leveling)**
```
Shadow Black:      #05070A
Abyss Blue:        #0A1A3B
Jin-Woo Blue:      #1F6BFF (Main Glow)
```

**Secondary Colors (JJK + SAO)**
```
Cursed Purple:     #6F2BFF
Hologram Cyan:     #37F8FF
```

**Accent Colors (Dr. Stone + Naruto)**
```
Crystal Green:     #8EFFC1
Chakra Orange:     #FF6B18
```

**Text Colors**
```
Silver White:      #E5E7EB
Icy Blue:          #A5C7FF
```

### Typography

```
Headings:  Montserrat ExtraBold, Bebas Neue, Anton
Body:      Poppins, Inter
HUD Text:  Oxanium (Monospace)
```

### Animation Durations

```
Gate Opening:      2. 0s (cinematic)
Portal Transition: 1.6s (quick)
Summoning:         2.2s (epic)
Page Transition:   1.2s (smooth)
```

## 🔐 Authentication

### User Roles

```typescript
enum UserRole {
  ADMIN      = "Admin access"
  FOUNDER    = "Founder level"
  COFOUNDER  = "Co-founder level"
  CA         = "Company authority"
  CEO        = "Chief executive"
  MD         = "Managing director"
  USER       = "Standard user"
}
```

### Protected Routes

```
/dashboard    → Requires authentication
/admin        → Requires admin role
```

### API Endpoints

#### Authentication

```bash
# Sign up
POST /api/auth/signup
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "secure_password"
}

# Sign in
POST /api/auth/signin
{
  "email": "user@example.com",
  "password": "secure_password"
}

# Sign out
POST /api/auth/signout
```

#### Games (Admin Only)

```bash
# Get all games
GET /api/games

# Create game
POST /api/games
{
  "title": "Game Title",
  "description": "Description",
  "image": "url",
  "engineType": "Unreal Engine 5"
}
```

#### Team (Admin Only)

```bash
# Get team members
GET /api/team

# Add member
POST /api/team
{
  "name": "Dev Kingson",
  "role": "Founder",
  "title": "B. Sc. (Hons.) Mathematics",
  "description": "Leader",
  "photo": "url",
  "summoningColor": "#1F6BFF"
}
```

#### Welcome Messages (Admin Only)

```bash
# Get all messages
GET /api/messages

# Add message
POST /api/messages
{
  "message": "Welcome to Shadows"
}

# Remove message
DELETE /api/messages
{
  "message": "Welcome to Shadows"
}
```

## 🎬 Animation System

### Gate Opening

- **Duration**: 2 seconds
- **Trigger**: Page load
- **Effect**: Split doors opening with center text fade-in
- **Sound**: Gate mechanism sound

### Portal Transition

- **Duration**: 1.6 seconds
- **Trigger**: Page navigation
- **Effect**: Concentric rotating rings with color gradients
- **Sound**: Whoosh/portal sound

### Summoning Sequence

- **Duration**: 2.2 seconds
- **Trigger**: Hover/click on team member
- **Effect**: Circle animation → Shadow rising → Name reveal
- **Sound**: Summoning jutsu chant
- **Unique**: Each member has different color and aura

### Particle Effects

- **Floating Embers**: Auto-floating particles
- **Crystal Shards**: Dr. Stone style shimmering
- **Chakra Burst**: Click effect particles
- **Shadow Smoke**: Page transition effects

## 📝 Welcome Messages

Dynamic random messages displayed on homepage:

```javascript
"Welcome to reality."
"Welcome to Shadows."
"Feel the fear."
"Deal the fear."
"Arise, shadow."
"Your awakening begins."
"The gate has opened."
"Ascend beyond mortals."
"Embrace the darkness."
"Power awaits."
"Cursed energy flows."
"Jujutsu begins."
"Cursed technique activated."
"Domain expansion incoming."
"Science surges forward."
"Senku's vision realized."
"Stone age ends here."
"Technology awakens."
"System initialized."
"Welcome to the system."
"Loading game parameters."
"Virtual world activated."
"Ready player one."
"Chakra alignment complete."
"Ninja way activated."
"Seal release."
```

**Admin can manage via:**
```bash
POST /api/messages          # Add message
DELETE /api/messages        # Remove message
```

## 🔑 Secret Access - Konami Code

Press in sequence: **↑ ↑ ↓ ↓ ← → ← → B A**

Unlocks hidden **Shadow Realm** page with:
- Exclusive content
- Power stats
- Easter eggs
- Secret animations

## 📱 Responsive Design

### Breakpoints

```css
Mobile:   < 640px   (Full animations, reduced particles)
Tablet:   640-1024px (Optimized layout)
Desktop:  > 1024px   (Full effects, max particles)
```

### Mobile Optimizations

- Reduced particle count
- Shorter animation durations
- Touch-friendly buttons
- Adaptive images

## 🚀 Deployment

### Vercel (Recommended)

**Easiest deployment for Next.js**

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Select your GitHub repo
   - Import

3. **Set Environment Variables**
   - `DATABASE_URL` - PostgreSQL connection
   - `NEXTAUTH_SECRET` - Generated secret
   - `NEXTAUTH_URL` - Your Vercel domain

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get live URL

### Custom Domain

1. In Vercel settings → "Domains"
2. Add your domain
3. Follow DNS setup
4. Update `NEXTAUTH_URL`

### Self-Hosted

```bash
npm run build
npm run start
```

Requires Node.js 18+ and PostgreSQL

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Database commands
npx prisma migrate dev        # Create migration
npx prisma migrate deploy     # Deploy migration
npx prisma studio             # Open database UI
npx prisma seed               # Seed data

# Type checking
npx tsc --noEmit
```

## 📊 Database Schema

### User Model
```prisma
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  password  String
  name      String
  role      UserRole @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  logs      Log[]
}
```

### Game Model
```prisma
model Game {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  image       String? 
  engineType  String? 
  status      String  @default("ACTIVE")
  createdAt   DateTime @default(now())
}
```

### TeamMember Model
```prisma
model TeamMember {
  id              Int     @id @default(autoincrement())
  name            String
  role            String
  title           String
  description     String? 
  photo           String?
  linkedin        String?
  twitter         String?
  summoningColor  String
  joinDate        DateTime @default(now())
}
```

### WelcomeMessage Model
```prisma
model WelcomeMessage {
  id       Int     @id @default(autoincrement())
  message  String
  type     String  @default("STATIC")
  createdAt DateTime @default(now())
}
```

### Log Model
```prisma
model Log {
  id        Int     @id @default(autoincrement())
  userId    Int
  user      User    @relation(fields: [userId], references: [id])
  action    String
  details   String? 
  timestamp DateTime @default(now())
}
```

## 🎯 Key Features Explained

### Gate Opening Animation
- **What**: 3D gate effect from Solo Leveling
- **When**: First page load
- **How**: CSS clip-path + Framer Motion
- **Why**: Immersive entrance experience

### Portal Transitions
- **What**: Rotating rings appear when navigating
- **When**: Page changes
- **How**: SVG circles with rotation animation
- **Why**: Smooth, cinematic transitions

### Summoning Circle
- **What**: Each team member summons uniquely
- **When**: Hover/click team member card
- **How**: SVG animation + shadow rise effect
- **Why**: Interactive character showcase

### Particle System
- **What**: Floating embers and crystals
- **When**: Throughout animations
- **How**: Auto-generated particles with random positions
- **Why**: Visual depth and motion

### HUD Panels
- **What**: SAO-style dashboard interface
- **When**: User logged in / Dashboard
- **How**: Glassmorphism + neon borders
- **Why**: Futuristic user experience

## 🎮 Team Members

### Dev Kingson
- **Role**: Founder
- **Title**: B.Sc. (Hons.) Mathematics
- **Color**: #1F6BFF (Jin-Woo Blue)
- **Summon Effect**: Shadow Rising

### Utsav Chaurasiya
- **Role**: Co-Founder
- **Title**: Creative Director
- **Color**: #6F2BFF (Cursed Purple)
- **Summon Effect**: Cursed Energy

### Jitendra Soni
- **Role**: Co-Founder
- **Title**: Technical Lead
- **Color**: #FF6B18 (Chakra Orange)
- **Summon Effect**: Chakra Burst

## 🎯 Future Roadmap

- [ ] 3D Gate Model using Three.js
- [ ] Multiplayer Dashboard with real-time updates
- [ ] Game Launch System
- [ ] Community Forums
- [ ] Live Stream Integration
- [ ] AI Chatbot Support
- [ ] Merchandise Store
- [ ] Blog/News Section
- [ ] Tournament System
- [ ] Mobile App (React Native)

## 📚 Documentation

- [**SETUP.md**](./SETUP.md) - Detailed installation guide
- [**DEPLOYMENT.md**](./DEPLOYMENT. md) - Vercel deployment steps
- [**API. md**](./API.md) - Complete API documentation
- [**CONTRIBUTING.md**](./CONTRIBUTING. md) - Contributing guidelines

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2.  Create a feature branch
3. Make your changes
4. Push to branch
5. Open a Pull Request

## 🐛 Bug Reports

Found a bug? Please create an issue with:
- Description of bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

**You are free to:**
- Use for personal projects
- Use for commercial projects
- Modify the code
- Distribute copies

## 👥 Team

**Shadows Gaming Studio**

| Name | Role | GitHub | LinkedIn |
|------|------|--------|----------|
| Dev Kingson | Founder | [@Programmer-Dev-King](https://github.com/Programmer-Dev-King) | [Profile](#) |
| Utsav Chaurasiya | Co-Founder | [@utsav-chaurasiya](#) | [Profile](#) |
| Jitendra Soni | Co-Founder | [@jitendra-soni](#) | [Profile](#) |

## 💬 Support & Contact

- **Email**: support@shadowsgaming.com
- **Discord**: [Join Server](#)
- **Twitter**: [@ShadowsGaming](#)
- **GitHub Issues**: [Create Issue](https://github.com/Programmer-Dev-King/shadows-gaming-studio/issues)

## 🙏 Credits & Inspiration

This project draws inspiration from:

- **Solo Leveling** - Gate animations, shadow effects, power systems
- **Jujutsu Kaisen** - Cursed energy, domain expansion, glitch effects
- **Dr. Stone** - Blueprint aesthetics, technological progression
- **Sword Art Online** - HUD panels, hologram effects, data visualization
- **Naruto** - Chakra systems, seals, summoning mechanics

## 📈 Stats & Metrics

```
Total Lines of Code:     ~15,000
Components:              20+
Pages:                   10
API Endpoints:           8
Database Models:         5
Animations:              15+
```

## 🎬 Screenshots & Demos

*(Coming Soon - Add screenshots of each page)*

## 🔗 Quick Links

- [Live Site](#) (Coming Soon)
- [GitHub Repository](https://github.com/Programmer-Dev-King/shadows-gaming-studio)
- [Vercel Dashboard](#)
- [Neon Database](#)
- [Discord Community](#)

---

## 📝 Changelog

### v1.0.0 (2025-12-03)
- ✅ Initial release
- ✅ Gate opening animation
- ✅ Portal transitions
- ✅ Summoning sequences
- ✅ 10 pages with animations
- ✅ Authentication system
- ✅ Database integration
- ✅ Admin dashboard
- ✅ Complete documentation

---

<div align="center">

### Made with ❤️ by Shadows Gaming Studio

**"Rise Above Mortals.  Ascend into Shadows."**

![Shadows Logo](https://img.shields.io/badge/SHADOWS-GAMING-blue? style=for-the-badge&logo=gaming)

[⬆ back to top](#-shadows-gaming-studio)

</div>
