# 🚀 Setup Complete Guide

## Prerequisites

- Node.js 18+ 
- npm 9+
- PostgreSQL database (local or cloud like Neon/Supabase)

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Programmer-Dev-King/shadows-gaming-studio.git
cd shadows-gaming-studio

# 2. Run the setup script (interactive)
chmod +x tools/setup-guide.sh
./tools/setup-guide.sh

# OR do manual setup:

# 3. Install dependencies
npm install

# 4. Copy environment file
cp .env.example .env

# 5. Configure environment
# Edit .env with your database URL and secrets

# 6. Generate Prisma client
npx prisma generate

# 7. Push database schema
npx prisma db push

# 8. Start development server
npm run dev
```

## Environment Variables

Create a `.env` file with these values:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth
NEXTAUTH_SECRET="your-32-character-secret"
NEXTAUTH_URL="http://localhost:3000"

# Optional: OAuth providers
GITHUB_ID=""
GITHUB_SECRET=""
GOOGLE_ID=""
GOOGLE_SECRET=""
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## Database Options

### Option 1: Neon (Recommended for development)
1. Go to [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string to `DATABASE_URL`

### Option 2: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string

### Option 3: Local PostgreSQL
```bash
# macOS
brew install postgresql
brew services start postgresql
createdb shadows_gaming_studio

# Set DATABASE_URL
DATABASE_URL="postgresql://localhost/shadows_gaming_studio"
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Build
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma studio    # Open database GUI
npx prisma db push   # Push schema changes
npx prisma migrate dev # Create migration

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # TypeScript check

# Tools
./tools/generate-images.sh  # Generate image variants
```

## Project Structure After Setup

```
shadows-gaming-studio/
├── node_modules/     # Dependencies (auto-generated)
├── .next/           # Build output (auto-generated)
├── prisma/
│   └── dev.db       # SQLite dev database (if used)
├── .env             # Your environment variables
└── ...
```

## Troubleshooting

### "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### "Environment variable not found: DATABASE_URL"
Ensure `.env` file exists and contains `DATABASE_URL`

### "Error: listen EADDRINUSE: address already in use"
```bash
# Find and kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Database connection errors
1. Verify `DATABASE_URL` is correct
2. Ensure database server is running
3. Check network/firewall settings

## Adding Original Images

1. Place high-resolution images in `public/images/originals/`
2. Run the image generation script:
   ```bash
   chmod +x tools/generate-images.sh
   ./tools/generate-images.sh
   ```
3. Use generated images from `public/images/generated/`

## Seeding Demo Data

Create `prisma/seed.ts`:
```typescript
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

async function seed() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@shadows.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
}

seed();
```

Run: `npx ts-node prisma/seed.ts`

## Ready to Deploy?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

---

**Questions?** Open an issue on GitHub.
