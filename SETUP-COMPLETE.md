# Quick Setup Guide - Shadows Gaming Studio

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (or use a free tier from Supabase/Neon)
- npm or yarn

## Setup Steps

### 1. Clone & Install

```bash
git clone https://github.com/Programmer-Dev-King/shadows-gaming-studio.git
cd shadows-gaming-studio
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your database URL:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/shadows_db"
NEXTAUTH_SECRET="generate-a-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

**Generate a secret:**
```bash
openssl rand -base64 32
```

### 3. Setup Database

```bash
npx prisma generate
npx prisma db push
```

### 4. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Demo Pages

- **Portal Demo**: http://localhost:3000/portal-demo
- **Team Demo**: http://localhost:3000/team-demo

## Common Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Check code style |
| `npm run prisma:studio` | Database GUI |

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check firewall/network settings

### Build Errors
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Type Errors
```bash
npm run type-check
```

## Need More Help?

See:
- [README-FINAL.md](README-FINAL.md) - Full documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Vercel deployment guide
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Detailed troubleshooting

---

🎮 **Welcome to Shadows Gaming Studio!**
