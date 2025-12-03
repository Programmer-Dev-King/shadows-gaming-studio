# 🔧 SHADOWS GAMING STUDIO - COMPLETE TROUBLESHOOTING GUIDE

## Table of Contents
1. [Database Issues](#database-issues)
2. [Authentication Issues](#authentication-issues)
3.  [Animation Issues](#animation-issues)
4.  [Build Issues](#build-issues)
5.  [Deployment Issues](#deployment-issues)
6. [Performance Issues](#performance-issues)
7. [Installation Issues](#installation-issues)
8. [Runtime Issues](#runtime-issues)
9. [API Issues](#api-issues)
10. [Environment Issues](#environment-issues)

---

## Database Issues

### Error: "Can't reach database server"

**Symptoms:**
- `Error: ECONNREFUSED` when starting app
- `connect ECONNREFUSED 127.0.0.1:5432`
- Database connection timeout

**Solutions:**

```bash
# Step 1: Verify DATABASE_URL is correct
cat .env. local | grep DATABASE_URL

# Step 2: Check if it matches Neon format
# Should be: postgresql://user:password@host:5432/database

# Step 3: Test connection with psql
psql "YOUR_DATABASE_URL"

# Step 4: Verify Neon project is active
# Go to https://console.neon.tech and check project status

# Step 5: Restart dev server
npm run dev

# Step 6: Check firewall/VPN
# If behind VPN, whitelist Neon IP or disable VPN
```

**Common Mistakes:**
- ❌ Missing database name in URL
- ❌ Wrong password copied
- ❌ Neon project suspended
- ❌ Connection pooling disabled

---

### Error: "Unknown table: public.User"

**Symptoms:**
- Prisma error on migration
- `Error: The table public.User does not exist`
- Database sync issues

**Solutions:**

```bash
# Option 1: Run migrations fresh
npx prisma migrate dev --name init

# Option 2: Reset database (WARNING: Deletes all data)
npx prisma migrate reset
# Answer "y" when prompted

# Option 3: Check migrations folder
ls -la prisma/migrations/

# Option 4: Verify schema. prisma syntax
npx prisma validate

# Option 5: Recreate schema
npx prisma db push --skip-generate
```

**Prevention:**
```bash
# Always run migrations after pulling code
git pull
npx prisma migrate deploy

# Create migration when schema changes
npx prisma migrate dev --name add_new_field
```

---

### Error: "Unique constraint failed on the fields: (email)"

**Symptoms:**
- User registration fails with duplicate email
- Can't sign up same email twice
- `Unique constraint failed: User_email_key`

**Solutions:**

```bash
# Check existing users
npx prisma studio

# Find and delete duplicate user
npx prisma db execute --stdin <<'EOF'
DELETE FROM "User" WHERE email = 'duplicate@example.com';
EOF

# Or use Prisma Studio UI
# Go to http://localhost:5555 after running:
npx prisma studio

# Then manually delete duplicates
```

---

### Error: "Foreign key constraint failed"

**Symptoms:**
- Can't create related records
- `Foreign key constraint failed on the field: (userId)`
- Parent record doesn't exist

**Solutions:**

```bash
# Check data integrity
npx prisma studio

# Verify parent exists before creating child
# Example: Create user first, then log
const user = await prisma.user.create({... })
const log = await prisma.log.create({
  data: {
    userId: user.id, // ✅ User exists
    action: 'test'
  }
})

# Fix broken references
npx prisma db execute --stdin <<'EOF'
DELETE FROM "Log" WHERE "userId" NOT IN (SELECT id FROM "User");
EOF
```

---

### Error: "getaddrinfo ENOTFOUND"

**Symptoms:**
- DNS resolution failure
- `getaddrinfo ENOTFOUND host. neon.tech`
- Network unreachable

**Solutions:**

```bash
# Check DNS
nslookup pg. neon.tech

# Test connection
telnet pg.neon.tech 5432

# Check internet connection
ping google.com

# Try alternative DNS
# Edit /etc/resolv.conf (Linux/Mac)
# Use 8.8.8.8 as nameserver

# Restart network
# On Mac:
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# On Windows:
ipconfig /flushdns

# On Linux:
sudo systemctl restart systemd-resolved
```

---

## Authentication Issues

### Error: "Invalid NEXTAUTH_SECRET"

**Symptoms:**
- `Error: Invalid or missing nextauth secret`
- Session not persisting
- Cannot read properties of undefined

**Solutions:**

```bash
# Generate new secret
openssl rand -base64 32

# Example output:
# k7f3H9mK2xL8pQ5wR1vB9c3dE7gJ6nM1oP2qS4tU8vW

# Add to .env.local
NEXTAUTH_SECRET="k7f3H9mK2xL8pQ5wR1vB9c3dE7gJ6nM1oP2qS4tU8vW"

# Restart server
npm run dev

# Verify it works
curl http://localhost:3000/api/auth/session
```

**For Production (Vercel):**

```bash
# Set in Vercel dashboard
# Project Settings > Environment Variables > Add Variable
# Name: NEXTAUTH_SECRET
# Value: (your generated secret)

# Redeploy
vercel --prod
```

---

### Error: "Login not working - redirect loop"

**Symptoms:**
- Stuck redirecting to `/login`
- Can't access `/dashboard` after login
- Session not established

**Solutions:**

```bash
# Step 1: Check user exists in database
npx prisma studio
# Look in User table

# Step 2: Verify database connection
# In pages/api/auth/[...nextauth]/route.ts
console.log('Session:', session) // Add debug logging

# Step 3: Check credentials provider
// Verify email/password matching
const user = await prisma.user. findUnique({
  where: { email: credentials.email }
})

console.log('User found:', !!user)

// Step 4: Test login with curl
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Step 5: Check NEXTAUTH_URL
# Should be http://localhost:3000 for dev
# Should be https://yourdomain.com for production
```

---

### Error: "Password hashing failed - bcrypt error"

**Symptoms:**
- `Error: bcrypt is not defined`
- Can't sign up users
- `ERR_REQUIRE_ESM`

**Solutions:**

```bash
# Install bcrypt
npm install bcrypt
npm install --save-dev @types/bcrypt

# Verify import
// app/api/auth/signup/route.ts
import bcrypt from 'bcrypt'

// Test hash
const hashed = await bcrypt.hash('password123', 10)
console.log(hashed)

# If still failing, use alternative
npm install argon2
# Then use argon2 instead of bcrypt
import * as argon2 from 'argon2'
const hash = await argon2.hash(password)
```

---

### Error: "Session not persisting across pages"

**Symptoms:**
- Login works, but session lost on refresh
- `useSession()` returns null
- Need to login repeatedly

**Solutions:**

```bash
# Step 1: Verify NEXTAUTH_SECRET is set
grep NEXTAUTH_SECRET . env.local

# Step 2: Check SessionProvider wrapping
// app/providers. tsx
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

# Step 3: Verify session strategy
// app/api/auth/[...nextauth]/route.ts
session: {
  strategy: 'jwt', // ✅ Use JWT
  maxAge: 30 * 24 * 60 * 60, // 30 days
}

# Step 4: Clear cookies and retry
# Browser DevTools > Application > Cookies > Delete all
# Then reload and login again
```

---

### Error: "Role-based access not working"

**Symptoms:**
- Can access admin pages without admin role
- Protected routes not protected
- `session.user. role` is undefined

**Solutions:**

```bash
# Step 1: Verify role in database
npx prisma studio
# Check User table, role column

# Step 2: Check JWT callback includes role
// app/api/auth/[...nextauth]/route.ts
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role // ✅ Add role to JWT
    }
    return token
  },
  async session({ session, token }) {
    if (session. user) {
      session.user.role = token.role // ✅ Add role to session
    }
    return session
  }
}

# Step 3: Check middleware
// middleware. ts
if (request.nextUrl.pathname.startsWith('/admin')) {
  if (!token || token.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

# Step 4: Debug
const { data: session } = useSession()
console.log('Session:', session) // Should show role
```

---

## Animation Issues

### Error: "Animations not playing"

**Symptoms:**
- No animation visible
- Components mount but don't animate
- Animation completed instantly

**Solutions:**

```bash
# Step 1: Check Framer Motion installed
npm list framer-motion
# Should show version 10+

# Step 2: Verify animation classes
// components/animations/GateOpening.tsx
<motion.div
  initial={{ x: 0 }}
  animate={{ x: 100 }} // ✅ Must have animate
  transition={{ duration: 1 }}
/>

# Step 3: Check CSS animations. css loaded
// app/layout.tsx
import '@/styles/animations.css' // ✅ Must import

# Step 4: Debug in browser console
// components/animations/GateOpening. tsx
useEffect(() => {
  console. log('GateOpening mounted') // Add logging
}, [])

# Step 5: Check prefers-reduced-motion
// Disable for testing
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
if (mediaQuery.matches) {
  console.warn('Reduced motion enabled')
}
```

---

### Error: "Gate animation not opening"

**Symptoms:**
- Gate doors don't move
- Animation stuck at start
- No visual effect

**Solutions:**

```bash
# Step 1: Verify component mounted
// app/page.tsx
{showGate && <GateOpening onComplete={handleGateComplete} />}

console.log('showGate:', showGate) // Should be true

# Step 2: Check z-index
// components/animations/GateOpening.tsx
<div className="fixed inset-0 z-50"> // ✅ High z-index
  <motion. div animate={{ x: -500 }} />
</div>

# Step 3: Test with browser DevTools
// Open console and test
const el = document.querySelector('[data-testid="gate"]')
if (el) console.log('Gate element found')

# Step 4: Check Framer Motion version
npm list framer-motion
# If old, upgrade:
npm install framer-motion@latest

# Step 5: Disable CSS animations to isolate issue
// Temporarily comment out in globals.css
// . animate-gate-open { animation: .. .; } /* Commented */
```

---

### Error: "Particles not showing"

**Symptoms:**
- ParticleSystem component loaded but no particles visible
- Particle container empty
- No visual effect

**Solutions:**

```bash
# Step 1: Check ParticleSystem mounted
// components/animations/ParticleSystem.tsx
useEffect(() => {
  console. log('Particles generated:', particles.length)
}, [particles])

# Step 2: Verify CSS classes exist
// Check styles/particles.css
.particle { position: absolute; }
.particle-float { animation: floatParticle 3s ease-out; }

# Step 3: Test particle generation
// components/animations/ParticleSystem. tsx
const generateParticles = () => {
  console.log('Generating', count, 'particles')
  // Should log 20+
}

# Step 4: Check z-index and positioning
. particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10; // ✅ Visible layer
}

# Step 5: Test with visible particles
// Temporarily change opacity to 1
.particle { opacity: 1 ! important; }
```

---

### Error: "Animations laggy on mobile"

**Symptoms:**
- Slow animations on mobile devices
- Choppy frame rate
- 30 FPS instead of 60

**Solutions:**

```bash
# Step 1: Reduce particle count
<ParticleSystem count={10} /> // Reduce from 20

# Step 2: Disable heavy animations on mobile
const isMobile = window.innerWidth < 768
{! isMobile && <ParticleSystem />}

# Step 3: Use CSS animations instead of JS
// Instead of Framer Motion
<div className="animate-gate-open" /> // Uses CSS

# Step 4: Optimize images
// Use Next.js Image component
import Image from 'next/image'
<Image
  src="/image.png"
  alt="Gate"
  width={800}
  height={600}
  priority
/>

# Step 5: Enable adaptive FPS
// Set in animation config
const ANIMATION_CONFIG = {
  fps: window.devicePixelRatio > 2 ? 30 : 60,
}
```

---

## Build Issues

### Error: "Module not found"

**Symptoms:**
- `Error: Cannot find module '@/components/.. .'`
- Build fails with missing files
- Import path not resolving

**Solutions:**

```bash
# Step 1: Check import paths use @/
// ✅ Correct
import { Button } from '@/components/ui/Button'

// ❌ Wrong
import { Button } from '../components/ui/Button'

# Step 2: Verify file exists
ls -la components/ui/Button.tsx

# Step 3: Check tsconfig. json paths
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [". /*"]
    }
  }
}

# Step 4: Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build

# Step 5: Check Next.js alias configuration
// next.config.js
module.exports = {
  // Aliases configured in tsconfig. json
}
```

---

### Error: "Module has no exported member"

**Symptoms:**
- `export 'Button' (imported as 'Button') was not found`
- Named import fails
- Type errors in imports

**Solutions:**

```bash
# Step 1: Check export syntax
// ✅ Correct - named export
export const Button: React.FC = () => {}

// ✅ Also correct - default export
export default Button

// ❌ Wrong - no export
const Button = () => {}

# Step 2: Verify component file path
ls -la components/ui/Button. tsx

# Step 3: Check import statement
// ✅ Correct - named import
import { Button } from '@/components/ui/Button'

// ✅ Also correct - default import
import Button from '@/components/ui/Button'

# Step 4: Rebuild TypeScript
npx tsc --noEmit

# Step 5: Check for circular imports
// May cause missing exports
// Reorganize imports in separate files
```

---

### Error: "TypeScript compilation error"

**Symptoms:**
- `Type 'string' is not assignable to type 'number'`
- Property doesn't exist on type
- Build fails with TS errors

**Solutions:**

```bash
# Step 1: Check TypeScript version
npm list typescript
# Should be 5.0+

# Step 2: Run type check
npx tsc --noEmit

# Step 3: Fix strict mode issues
// tsconfig.json
{
  "compilerOptions": {
    "strict": true // ✅ Enable strict typing
  }
}

# Step 4: Add type annotations
// ❌ Wrong
const Button = (props) => {}

// ✅ Correct
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
}
const Button: React.FC<ButtonProps> = ({ children, onClick }) => {}

# Step 5: Check prop types match
// Ensure all props are typed correctly
const user: User = {
  id: '123', // ✅ String
  age: 25, // ✅ Number
  name: 'John' // ✅ String
}
```

---

### Error: "ESLint/Prettier formatting errors"

**Symptoms:**
- Build fails due to linting errors
- Code formatting issues
- `error: Unexpected token`

**Solutions:**

```bash
# Run linter
npm run lint

# Auto-fix issues
npm run lint -- --fix

# Format with Prettier
npx prettier --write . 

# Skip linting temporarily
// . eslintignore
node_modules/
.next/
out/
build/

# Or disable rule
// eslint-disable-next-line
const x = any_value
```

---

## Deployment Issues

### Error: "Vercel deployment failed"

**Symptoms:**
- Build error on Vercel
- `error: Command failed with exit code 1`
- Production build fails

**Solutions:**

```bash
# Step 1: Test build locally first
npm run build

# Should complete without errors

# Step 2: Check Vercel logs
# Go to Vercel Dashboard > Project > Deployments > Failed build
# Read the error message carefully

# Step 3: Common Vercel issues
# - Missing env vars
# - Database not accessible
# - Build timeout (default 45s)

# Step 4: Verify environment variables
# Vercel Dashboard > Settings > Environment Variables
# Add:
DATABASE_URL=postgresql://... 
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://yourdomain.vercel.app

# Step 5: Check function timeout
// vercel.json
{
  "functions": {
    "api/**": {
      "maxDuration": 60
    }
  }
}

# Step 6: Redeploy
git push origin main
# Vercel auto-deploys
```

---

### Error: "Database connection error in production"

**Symptoms:**
- App works locally but fails on Vercel
- `Error: connect ECONNREFUSED` in production
- Can't reach database from Vercel

**Solutions:**

```bash
# Step 1: Verify Neon allows Vercel IPs
# Neon Console > Settings > Allowed IPs
# Add Vercel's IP range or disable IP restriction for dev

# Step 2: Check CONNECTION_LIMIT
// Neon console limits connections
// Increase in Settings

# Step 3: Use connection pooling
# Update DATABASE_URL to use Neon's pooled connection
# Use pgBouncer endpoint instead of direct connection
postgresql://user:password@ep-host-pooler.neon.tech:6432/db

# Step 4: Test production database
// Temporarily add to route handler
export async function GET() {
  try {
    const result = await prisma.user.count()
    return Response.json({ count: result })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

# Step 5: Check Neon project status
# Visit https://console.neon.tech
# Verify project is "Running", not suspended

# Step 6: Restart Neon compute
# Neon Console > Compute > Restart
```

---

### Error: "Custom domain not working"

**Symptoms:**
- Domain added to Vercel but doesn't resolve
- Shows Vercel default domain
- 404 error on custom domain

**Solutions:**

```bash
# Step 1: Verify DNS records
dig yourdomain.com

# Should show Vercel's DNS:
# CNAME yourdomain.com cname.vercel-dns.com

# Step 2: Update DNS at registrar
# Add CNAME record:
# Host: @ (or www)
# Value: cname.vercel-dns.com
# TTL: 3600

# Step 3: Wait for DNS propagation (up to 48 hours)
# Check with:
nslookup yourdomain.com

# Step 4: Update NEXTAUTH_URL
// . env.production
NEXTAUTH_URL=https://yourdomain.com

# Redeploy:
vercel --prod

# Step 5: Force DNS flush
# Mac:
sudo dscacheutil -flushcache

# Windows:
ipconfig /flushdns

# Linux:
sudo systemctl restart systemd-resolved
```

---

## Performance Issues

### Error: "Page loading very slow"

**Symptoms:**
- TTFB (Time to First Byte) > 1s
- Slow initial page load
- Images taking long to load

**Solutions:**

```bash
# Step 1: Analyze performance
npm install -g lighthouse

lighthouse https://localhost:3000
# Shows Performance score

# Step 2: Optimize images
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/image.png"
  alt="Description"
  width={800}
  height={600}
  priority={true} // For above-fold images
/>

# 🔧 SHADOWS GAMING STUDIO - COMPLETE TROUBLESHOOTING GUIDE

## Table of Contents
1. [Database Issues](#database-issues)
2. [Authentication Issues](#authentication-issues)
3.  [Animation Issues](#animation-issues)
4.  [Build Issues](#build-issues)
5.  [Deployment Issues](#deployment-issues)
6. [Performance Issues](#performance-issues)
7. [Installation Issues](#installation-issues)
8. [Runtime Issues](#runtime-issues)
9. [API Issues](#api-issues)
10. [Environment Issues](#environment-issues)

---

## Database Issues

### Error: "Can't reach database server"

**Symptoms:**
- `Error: ECONNREFUSED` when starting app
- `connect ECONNREFUSED 127.0.0.1:5432`
- Database connection timeout

**Solutions:**

```bash
# Step 1: Verify DATABASE_URL is correct
cat .env. local | grep DATABASE_URL

# Step 2: Check if it matches Neon format
# Should be: postgresql://user:password@host:5432/database

# Step 3: Test connection with psql
psql "YOUR_DATABASE_URL"

# Step 4: Verify Neon project is active
# Go to https://console.neon.tech and check project status

# Step 5: Restart dev server
npm run dev

# Step 6: Check firewall/VPN
# If behind VPN, whitelist Neon IP or disable VPN
```

**Common Mistakes:**
- ❌ Missing database name in URL
- ❌ Wrong password copied
- ❌ Neon project suspended
- ❌ Connection pooling disabled

---

### Error: "Unknown table: public.User"

**Symptoms:**
- Prisma error on migration
- `Error: The table public.User does not exist`
- Database sync issues

**Solutions:**

```bash
# Option 1: Run migrations fresh
npx prisma migrate dev --name init

# Option 2: Reset database (WARNING: Deletes all data)
npx prisma migrate reset
# Answer "y" when prompted

# Option 3: Check migrations folder
ls -la prisma/migrations/

# Option 4: Verify schema. prisma syntax
npx prisma validate

# Option 5: Recreate schema
npx prisma db push --skip-generate
```

**Prevention:**
```bash
# Always run migrations after pulling code
git pull
npx prisma migrate deploy

# Create migration when schema changes
npx prisma migrate dev --name add_new_field
```

---

### Error: "Unique constraint failed on the fields: (email)"

**Symptoms:**
- User registration fails with duplicate email
- Can't sign up same email twice
- `Unique constraint failed: User_email_key`

**Solutions:**

```bash
# Check existing users
npx prisma studio

# Find and delete duplicate user
npx prisma db execute --stdin <<'EOF'
DELETE FROM "User" WHERE email = 'duplicate@example.com';
EOF

# Or use Prisma Studio UI
# Go to http://localhost:5555 after running:
npx prisma studio

# Then manually delete duplicates
```

---

### Error: "Foreign key constraint failed"

**Symptoms:**
- Can't create related records
- `Foreign key constraint failed on the field: (userId)`
- Parent record doesn't exist

**Solutions:**

```bash
# Check data integrity
npx prisma studio

# Verify parent exists before creating child
# Example: Create user first, then log
const user = await prisma.user.create({... })
const log = await prisma.log.create({
  data: {
    userId: user.id, // ✅ User exists
    action: 'test'
  }
})

# Fix broken references
npx prisma db execute --stdin <<'EOF'
DELETE FROM "Log" WHERE "userId" NOT IN (SELECT id FROM "User");
EOF
```

---

### Error: "getaddrinfo ENOTFOUND"

**Symptoms:**
- DNS resolution failure
- `getaddrinfo ENOTFOUND host. neon.tech`
- Network unreachable

**Solutions:**

```bash
# Check DNS
nslookup pg. neon.tech

# Test connection
telnet pg.neon.tech 5432

# Check internet connection
ping google.com

# Try alternative DNS
# Edit /etc/resolv.conf (Linux/Mac)
# Use 8.8.8.8 as nameserver

# Restart network
# On Mac:
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# On Windows:
ipconfig /flushdns

# On Linux:
sudo systemctl restart systemd-resolved
```

---

## Authentication Issues

### Error: "Invalid NEXTAUTH_SECRET"

**Symptoms:**
- `Error: Invalid or missing nextauth secret`
- Session not persisting
- Cannot read properties of undefined

**Solutions:**

```bash
# Generate new secret
openssl rand -base64 32

# Example output:
# k7f3H9mK2xL8pQ5wR1vB9c3dE7gJ6nM1oP2qS4tU8vW

# Add to .env.local
NEXTAUTH_SECRET="k7f3H9mK2xL8pQ5wR1vB9c3dE7gJ6nM1oP2qS4tU8vW"

# Restart server
npm run dev

# Verify it works
curl http://localhost:3000/api/auth/session
```

**For Production (Vercel):**

```bash
# Set in Vercel dashboard
# Project Settings > Environment Variables > Add Variable
# Name: NEXTAUTH_SECRET
# Value: (your generated secret)

# Redeploy
vercel --prod
```

---

### Error: "Login not working - redirect loop"

**Symptoms:**
- Stuck redirecting to `/login`
- Can't access `/dashboard` after login
- Session not established

**Solutions:**

```bash
# Step 1: Check user exists in database
npx prisma studio
# Look in User table

# Step 2: Verify database connection
# In pages/api/auth/[...nextauth]/route.ts
console.log('Session:', session) // Add debug logging

# Step 3: Check credentials provider
// Verify email/password matching
const user = await prisma.user. findUnique({
  where: { email: credentials.email }
})

console.log('User found:', !!user)

// Step 4: Test login with curl
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Step 5: Check NEXTAUTH_URL
# Should be http://localhost:3000 for dev
# Should be https://yourdomain.com for production
```

---

### Error: "Password hashing failed - bcrypt error"

**Symptoms:**
- `Error: bcrypt is not defined`
- Can't sign up users
- `ERR_REQUIRE_ESM`

**Solutions:**

```bash
# Install bcrypt
npm install bcrypt
npm install --save-dev @types/bcrypt

# Verify import
// app/api/auth/signup/route.ts
import bcrypt from 'bcrypt'

// Test hash
const hashed = await bcrypt.hash('password123', 10)
console.log(hashed)

# If still failing, use alternative
npm install argon2
# Then use argon2 instead of bcrypt
import * as argon2 from 'argon2'
const hash = await argon2.hash(password)
```

---

### Error: "Session not persisting across pages"

**Symptoms:**
- Login works, but session lost on refresh
- `useSession()` returns null
- Need to login repeatedly

**Solutions:**

```bash
# Step 1: Verify NEXTAUTH_SECRET is set
grep NEXTAUTH_SECRET . env.local

# Step 2: Check SessionProvider wrapping
// app/providers. tsx
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

# Step 3: Verify session strategy
// app/api/auth/[...nextauth]/route.ts
session: {
  strategy: 'jwt', // ✅ Use JWT
  maxAge: 30 * 24 * 60 * 60, // 30 days
}

# Step 4: Clear cookies and retry
# Browser DevTools > Application > Cookies > Delete all
# Then reload and login again
```

---

### Error: "Role-based access not working"

**Symptoms:**
- Can access admin pages without admin role
- Protected routes not protected
- `session.user. role` is undefined

**Solutions:**

```bash
# Step 1: Verify role in database
npx prisma studio
# Check User table, role column

# Step 2: Check JWT callback includes role
// app/api/auth/[...nextauth]/route.ts
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role // ✅ Add role to JWT
    }
    return token
  },
  async session({ session, token }) {
    if (session. user) {
      session.user.role = token.role // ✅ Add role to session
    }
    return session
  }
}

# Step 3: Check middleware
// middleware. ts
if (request.nextUrl.pathname.startsWith('/admin')) {
  if (!token || token.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

# Step 4: Debug
const { data: session } = useSession()
console.log('Session:', session) // Should show role
```

---

## Animation Issues

### Error: "Animations not playing"

**Symptoms:**
- No animation visible
- Components mount but don't animate
- Animation completed instantly

**Solutions:**

```bash
# Step 1: Check Framer Motion installed
npm list framer-motion
# Should show version 10+

# Step 2: Verify animation classes
// components/animations/GateOpening.tsx
<motion.div
  initial={{ x: 0 }}
  animate={{ x: 100 }} // ✅ Must have animate
  transition={{ duration: 1 }}
/>

# Step 3: Check CSS animations. css loaded
// app/layout.tsx
import '@/styles/animations.css' // ✅ Must import

# Step 4: Debug in browser console
// components/animations/GateOpening. tsx
useEffect(() => {
  console. log('GateOpening mounted') // Add logging
}, [])

# Step 5: Check prefers-reduced-motion
// Disable for testing
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
if (mediaQuery.matches) {
  console.warn('Reduced motion enabled')
}
```

---

### Error: "Gate animation not opening"

**Symptoms:**
- Gate doors don't move
- Animation stuck at start
- No visual effect

**Solutions:**

```bash
# Step 1: Verify component mounted
// app/page.tsx
{showGate && <GateOpening onComplete={handleGateComplete} />}

console.log('showGate:', showGate) // Should be true

# Step 2: Check z-index
// components/animations/GateOpening.tsx
<div className="fixed inset-0 z-50"> // ✅ High z-index
  <motion. div animate={{ x: -500 }} />
</div>

# Step 3: Test with browser DevTools
// Open console and test
const el = document.querySelector('[data-testid="gate"]')
if (el) console.log('Gate element found')

# Step 4: Check Framer Motion version
npm list framer-motion
# If old, upgrade:
npm install framer-motion@latest

# Step 5: Disable CSS animations to isolate issue
// Temporarily comment out in globals.css
// . animate-gate-open { animation: .. .; } /* Commented */
```

---

### Error: "Particles not showing"

**Symptoms:**
- ParticleSystem component loaded but no particles visible
- Particle container empty
- No visual effect

**Solutions:**

```bash
# Step 1: Check ParticleSystem mounted
// components/animations/ParticleSystem.tsx
useEffect(() => {
  console. log('Particles generated:', particles.length)
}, [particles])

# Step 2: Verify CSS classes exist
// Check styles/particles.css
.particle { position: absolute; }
.particle-float { animation: floatParticle 3s ease-out; }

# Step 3: Test particle generation
// components/animations/ParticleSystem. tsx
const generateParticles = () => {
  console.log('Generating', count, 'particles')
  // Should log 20+
}

# Step 4: Check z-index and positioning
. particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10; // ✅ Visible layer
}

# Step 5: Test with visible particles
// Temporarily change opacity to 1
.particle { opacity: 1 ! important; }
```

---

### Error: "Animations laggy on mobile"

**Symptoms:**
- Slow animations on mobile devices
- Choppy frame rate
- 30 FPS instead of 60

**Solutions:**

```bash
# Step 1: Reduce particle count
<ParticleSystem count={10} /> // Reduce from 20

# Step 2: Disable heavy animations on mobile
const isMobile = window.innerWidth < 768
{! isMobile && <ParticleSystem />}

# Step 3: Use CSS animations instead of JS
// Instead of Framer Motion
<div className="animate-gate-open" /> // Uses CSS

# Step 4: Optimize images
// Use Next.js Image component
import Image from 'next/image'
<Image
  src="/image.png"
  alt="Gate"
  width={800}
  height={600}
  priority
/>

# Step 5: Enable adaptive FPS
// Set in animation config
const ANIMATION_CONFIG = {
  fps: window.devicePixelRatio > 2 ? 30 : 60,
}
```

---

## Build Issues

### Error: "Module not found"

**Symptoms:**
- `Error: Cannot find module '@/components/.. .'`
- Build fails with missing files
- Import path not resolving

**Solutions:**

```bash
# Step 1: Check import paths use @/
// ✅ Correct
import { Button } from '@/components/ui/Button'

// ❌ Wrong
import { Button } from '../components/ui/Button'

# Step 2: Verify file exists
ls -la components/ui/Button.tsx

# Step 3: Check tsconfig. json paths
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [". /*"]
    }
  }
}

# Step 4: Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build

# Step 5: Check Next.js alias configuration
// next.config.js
module.exports = {
  // Aliases configured in tsconfig. json
}
```

---

### Error: "Module has no exported member"

**Symptoms:**
- `export 'Button' (imported as 'Button') was not found`
- Named import fails
- Type errors in imports

**Solutions:**

```bash
# Step 1: Check export syntax
// ✅ Correct - named export
export const Button: React.FC = () => {}

// ✅ Also correct - default export
export default Button

// ❌ Wrong - no export
const Button = () => {}

# Step 2: Verify component file path
ls -la components/ui/Button. tsx

# Step 3: Check import statement
// ✅ Correct - named import
import { Button } from '@/components/ui/Button'

// ✅ Also correct - default import
import Button from '@/components/ui/Button'

# Step 4: Rebuild TypeScript
npx tsc --noEmit

# Step 5: Check for circular imports
// May cause missing exports
// Reorganize imports in separate files
```

---

### Error: "TypeScript compilation error"

**Symptoms:**
- `Type 'string' is not assignable to type 'number'`
- Property doesn't exist on type
- Build fails with TS errors

**Solutions:**

```bash
# Step 1: Check TypeScript version
npm list typescript
# Should be 5.0+

# Step 2: Run type check
npx tsc --noEmit

# Step 3: Fix strict mode issues
// tsconfig.json
{
  "compilerOptions": {
    "strict": true // ✅ Enable strict typing
  }
}

# Step 4: Add type annotations
// ❌ Wrong
const Button = (props) => {}

// ✅ Correct
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
}
const Button: React.FC<ButtonProps> = ({ children, onClick }) => {}

# Step 5: Check prop types match
// Ensure all props are typed correctly
const user: User = {
  id: '123', // ✅ String
  age: 25, // ✅ Number
  name: 'John' // ✅ String
}
```

---

### Error: "ESLint/Prettier formatting errors"

**Symptoms:**
- Build fails due to linting errors
- Code formatting issues
- `error: Unexpected token`

**Solutions:**

```bash
# Run linter
npm run lint

# Auto-fix issues
npm run lint -- --fix

# Format with Prettier
npx prettier --write . 

# Skip linting temporarily
// . eslintignore
node_modules/
.next/
out/
build/

# Or disable rule
// eslint-disable-next-line
const x = any_value
```

---

## Deployment Issues

### Error: "Vercel deployment failed"

**Symptoms:**
- Build error on Vercel
- `error: Command failed with exit code 1`
- Production build fails

**Solutions:**

```bash
# Step 1: Test build locally first
npm run build

# Should complete without errors

# Step 2: Check Vercel logs
# Go to Vercel Dashboard > Project > Deployments > Failed build
# Read the error message carefully

# Step 3: Common Vercel issues
# - Missing env vars
# - Database not accessible
# - Build timeout (default 45s)

# Step 4: Verify environment variables
# Vercel Dashboard > Settings > Environment Variables
# Add:
DATABASE_URL=postgresql://... 
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://yourdomain.vercel.app

# Step 5: Check function timeout
// vercel.json
{
  "functions": {
    "api/**": {
      "maxDuration": 60
    }
  }
}

# Step 6: Redeploy
git push origin main
# Vercel auto-deploys
```

---

### Error: "Database connection error in production"

**Symptoms:**
- App works locally but fails on Vercel
- `Error: connect ECONNREFUSED` in production
- Can't reach database from Vercel

**Solutions:**

```bash
# Step 1: Verify Neon allows Vercel IPs
# Neon Console > Settings > Allowed IPs
# Add Vercel's IP range or disable IP restriction for dev

# Step 2: Check CONNECTION_LIMIT
// Neon console limits connections
// Increase in Settings

# Step 3: Use connection pooling
# Update DATABASE_URL to use Neon's pooled connection
# Use pgBouncer endpoint instead of direct connection
postgresql://user:password@ep-host-pooler.neon.tech:6432/db

# Step 4: Test production database
// Temporarily add to route handler
export async function GET() {
  try {
    const result = await prisma.user.count()
    return Response.json({ count: result })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

# Step 5: Check Neon project status
# Visit https://console.neon.tech
# Verify project is "Running", not suspended

# Step 6: Restart Neon compute
# Neon Console > Compute > Restart
```

---

### Error: "Custom domain not working"

**Symptoms:**
- Domain added to Vercel but doesn't resolve
- Shows Vercel default domain
- 404 error on custom domain

**Solutions:**

```bash
# Step 1: Verify DNS records
dig yourdomain.com

# Should show Vercel's DNS:
# CNAME yourdomain.com cname.vercel-dns.com

# Step 2: Update DNS at registrar
# Add CNAME record:
# Host: @ (or www)
# Value: cname.vercel-dns.com
# TTL: 3600

# Step 3: Wait for DNS propagation (up to 48 hours)
# Check with:
nslookup yourdomain.com

# Step 4: Update NEXTAUTH_URL
// . env.production
NEXTAUTH_URL=https://yourdomain.com

# Redeploy:
vercel --prod

# Step 5: Force DNS flush
# Mac:
sudo dscacheutil -flushcache

# Windows:
ipconfig /flushdns

# Linux:
sudo systemctl restart systemd-resolved
```

---

## Performance Issues

### Error: "Page loading very slow"

**Symptoms:**
- TTFB (Time to First Byte) > 1s
- Slow initial page load
- Images taking long to load

**Solutions:**

```bash
# Step 1: Analyze performance
npm install -g lighthouse

lighthouse https://localhost:3000
# Shows Performance score

# Step 2: Optimize images
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/image.png"
  alt="Description"
  width={800}
  height={600}
  priority={true} // For above-fold images
/>

# Step 3: Enable static generation
// app/page.tsx
export const revalidate = 3600 // Cache for 1 hour

# Step 4: Compress assets
npm install --save-dev compression-webpack-plugin

# Step 5: Check bundle size
npm install --save-dev @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env. ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({})

# Run:
ANALYZE=true npm run build

# Step 6: Lazy load non-critical components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { loading: () => <p>Loading...</p> }
)
```

---

### Error: "Animations causing jank"

**Symptoms:**
- Frame drops during animations
- Not smooth 60 FPS
- Stuttering motion

**Solutions:**

```bash
# Step 1: Use transform instead of position
// ❌ Causes repaints
<motion.div style={{ left: x }} />

// ✅ GPU accelerated
<motion.div style={{ x }} />

# Step 2: Reduce animation complexity
// ❌ Too many properties
<motion.div
  animate={{
    x: 100,
    y: 100,
    rotation: 360,
    scale: 2,
    opacity: 0
  }}
/>

// ✅ Simpler
<motion.div animate={{ x: 100 }} />

# Step 3: Use will-change CSS
. animate-element {
  will-change: transform;
}

# Step 4: Disable particle effects on mobile
const isMobile = window.innerWidth < 768
{!isMobile && <ParticleSystem />}

# Step 5: Check frame rate
import { motion } from 'framer-motion'

export const config = {
  syncFirebaseInstances: false,
  responsibleDOMCleaning: true
}
```

---

## Installation Issues

### Error: "npm install fails"

**Symptoms:**
- `npm ERR! ` during installation
- Dependency conflicts
- Package not found

**Solutions:**

```bash
# Step 1: Clear npm cache
npm cache clean --force

# Step 2: Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Step 3: Install again
npm install

# Step 4: Use specific Node version
# Check .nvmrc
cat .nvmrc
# Should show 18.x or 20.x

# Step 5: Update npm
npm install -g npm@latest

# Step 6: Try npm ci (clean install)
npm ci

# Step 7: Check Node version
node --version
# Should be 18.0.0 or higher

# Install correct version:
nvm install 20
nvm use 20
```

---

### Error: "Missing peer dependencies"

**Symptoms:**
- `npm ERR!  peer dep missing`
- Mismatched versions
- Dependency tree issues

**Solutions:**

```bash
# Option 1: Install missing peer
npm install react-dom@18

# Option 2: Force install
npm install --legacy-peer-deps

# Option 3: Check versions
npm list

# Should show all versions

# Option 4: Update all
npm update

# Option 5: Use exact versions from package.json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

---

## Runtime Issues

### Error: "Hydration mismatch"

**Symptoms:**
- Console error: `Hydration failed`
- Content flashing between renders
- Server/client mismatch

**Solutions:**

```bash
# Step 1: Mark client components
// app/page.tsx
'use client' // ✅ Add at top

import { useState } from 'react'

# Step 2: Avoid using window in server components
// ❌ Wrong - window only exists in browser
if (window. innerWidth > 768) { }

// ✅ Correct - use in useEffect
useEffect(() => {
  if (window.innerWidth > 768) { }
}, [])

# Step 3: Wrap dynamic components
import dynamic from 'next/dynamic'

const ClientComponent = dynamic(
  () => import('@/components/ClientComponent'),
  { ssr: false }
)

# Step 4: Check for time-dependent rendering
// ❌ Wrong - renders differently each time
const time = new Date().toLocaleString()

// ✅ Correct - consistent
useEffect(() => {
  setTime(new Date().toLocaleString())
}, [])

# Step 5: Suppress hydration warning (last resort)
<div suppressHydrationWarning>
  {value}
</div>
```

---

### Error: "useSession() returns null"

**Symptoms:**
- Session always null
- Can't access user data
- useSession hook not working

**Solutions:**

```bash
# Step 1: Wrap with SessionProvider
// app/providers.tsx
'use client'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

# Step 2: Use in layout. tsx
// app/layout.tsx
import { Providers } from '@/app/providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

# Step 3: Mark component as client
// components/ProfileButton.tsx
'use client'

import { useSession } from 'next-auth/react'

export function ProfileButton() {
  const { data: session } = useSession()
  
  if (!session) return <button>Login</button>
  return <p>Welcome, {session.user. name}</p>
}

# Step 4: Check NEXTAUTH_SECRET
grep NEXTAUTH_SECRET . env. local

# Step 5: Verify session callback
// app/api/auth/[...nextauth]/route.ts
callbacks: {
  async session({ session, token }) {
    if (session. user) {
      session.user.id = token.sub
    }
    return session
  }
}
```

---

## API Issues

### Error: "API route 404"

**Symptoms:**
- `404 Not Found` when calling API
- Endpoint doesn't exist
- Wrong route path

**Solutions:**

```bash
# Step 1: Check route file exists
ls -la app/api/auth/signin/route.ts

# Should exist with exact name

# Step 2: Verify route structure
// Correct: app/api/games/route.ts
// Access: /api/games

// Correct: app/api/games/[id]/route.ts
// Access: /api/games/123

// Wrong: app/api/games. ts (old Pages Router)

# Step 3: Check HTTP method
// route.ts
export async function GET(request) { } // Handles GET
export async function POST(request) { } // Handles POST
export async function DELETE(request) { } // Handles DELETE

# Step 4: Test API with curl
curl http://localhost:3000/api/games

# Step 5: Check Next.js recognizes it
# Restart dev server
npm run dev
```

---

### Error: "CORS error on API calls"

**Symptoms:**
- `Access to XMLHttpRequest blocked by CORS policy`
- Cross-origin request blocked
- No 'Access-Control-Allow-Origin' header

**Solutions:**

```bash
# Step 1: Check if same-origin
// Local API calls (same origin)
fetch('/api/games') // ✅ Works

// External API calls (different origin)
fetch('https://external-api.com/data') // ❌ May fail

# Step 2: Add CORS headers
// app/api/games/route.ts
export async function GET(request) {
  const response = Response.json({ data: [] })
  
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  
  return response
}

# Step 3: Use proxy for external APIs
// lib/external-api.ts
export async function fetchExternalData() {
  // Call your own API first
  const response = await fetch('/api/proxy? url=external-url')
  return response.json()
}

// app/api/proxy/route.ts
export async function GET(request) {
  const url = request.nextUrl.searchParams.get('url')
  const external = await fetch(url)
  return Response.json(await external.json())
}

# Step 4: Configure Next.js rewrites
// next.config.js
module.exports = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/external/:path*',
          destination: 'https://external-api.com/:path*'
        }
      ]
    }
  }
}
```

---

### Error: "API request timeout"

**Symptoms:**
- `Error: request timeout`
- Response takes too long
- 504 Gateway Timeout on Vercel

**Solutions:**

```bash
# Step 1: Increase timeout
// app/api/slow-endpoint/route.ts
export const maxDuration = 60 // 60 seconds (Vercel Pro)

export async function GET() {
  // Long operation
  return Response.json({ done: true })
}

# Step 2: Check database query performance
// Slow query
const users = await prisma.user.findMany()

// Optimized - add select
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    name: true
  }
})

# Step 3: Add timeout to fetch
const controller = new AbortController()
const timeoutId = setTimeout(() => controller.abort(), 5000)

const response = await fetch(url, {
  signal: controller.signal
})

clearTimeout(timeoutId)

# Step 4: Use async processing for long tasks
// Instead of waiting for completion
// Queue task and return immediately
export async function POST(request) {
  const task = request.json()
  
  // Queue for background processing
  // Don't wait for completion
  return Response.json({ taskId: '123' })
}

# Step 5: Check Vercel settings
// vercel.json
{
  "functions": {
    "api/**": {
      "maxDuration": 60
    }
  }
}
```

---

## Environment Issues

### Error: "Environment variable not loading"

**Symptoms:**
- `process.env.VAR` is undefined
- Env vars work locally but not in production
- Variable shows wrong value

**Solutions:**

```bash
# Step 1: Verify . env. local exists
ls -la .env.local

# Must have this file locally

# Step 2: Check format
// ✅ Correct
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="secret"

// ❌ Wrong (no quotes)
DATABASE_URL=postgresql://... 

# Step 3: Restart dev server after adding env
npm run dev

# Old server won't reload . env. local

# Step 4: Check NEXT_PUBLIC prefix for client vars
// ✅ Client-side
NEXT_PUBLIC_API_URL="http://localhost:3000"

// ❌ Server-only
DATABASE_URL="postgresql://..."

# Step 5: Verify in Vercel
// Vercel Dashboard > Settings > Environment Variables
// Check all vars are set

# Step 6: Check scope
// Production vs Development vs Preview
// May have different values

# Step 7: Test with logging
console.log('VAR:', process.env.VAR)

// Should show value
```

---

### Error: "Sensitive data exposed"

**Symptoms:**
- API keys visible in browser console
- Database credentials in frontend code
- Secrets logged publicly

**Solutions:**

```bash
# ✅ Server-side only
// app/api/route.ts
const dbUrl = process.env.DATABASE_URL // ✅ Safe
const apiKey = process.env.API_KEY // ✅ Safe

# ❌ Never in client code
// components/Button.tsx
const apiKey = process.env.API_KEY // ❌ Exposed

# ✅ Use NEXT_PUBLIC only for safe vars
// . env.local
NEXT_PUBLIC_API_URL="http://localhost:3000" // ✅ OK
DATABASE_URL="postgresql://..." // ❌ Never NEXT_PUBLIC

# Rotate compromised secrets
# 1. Generate new key in service (Neon, Auth0, etc.)
# 2. Update .env.local with new value
# 3. Update Vercel environment variables
# 4. Redeploy
# 5. Delete old key from service

# Never commit . env.local
# Check .gitignore includes:
. env.local
.env.*. local
```

---

### Error: "Different env values locally vs production"

**Symptoms:**
- Works locally but broken on Vercel
- API calls to wrong endpoint
- Database different between environments

**Solutions:**

```bash
# Step 1: Check NODE_ENV
// ✅ Use environment-specific logic
if (process.env.NODE_ENV === 'production') {
  // Vercel URL
} else {
  // Localhost URL
}

# Step 2: Create env files per environment
// .env.local (local development)
DATABASE_URL="postgresql://localhost:5432/dev"
NEXTAUTH_URL="http://localhost:3000"

// .env.production (for Vercel)
DATABASE_URL="postgresql://neon-host:5432/prod"
NEXTAUTH_URL="https://yourdomain.com"

# Step 3: Use config module
// lib/config.ts
export const config = {
  apiUrl: process.env. NEXT_PUBLIC_API_URL,
  dbUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production'
}

# Step 4: Log env on startup
// app/layout.tsx
if (typeof window === 'undefined') {
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log('API_URL:', process.env. NEXT_PUBLIC_API_URL)
}

# Step 5: Test production build locally
npm run build
npm run start

# Simulates Vercel environment
```

---

## Quick Reference

### Most Common Solutions

```bash
# Database issues
npx prisma migrate dev --name init
npx prisma migrate reset
npx prisma studio

# Authentication
openssl rand -base64 32  # Generate secret
npm run dev  # Restart server

# Build issues
rm -rf .next node_modules
npm install
npm run build

# Environment
grep VAR .env.local
# Check Vercel dashboard

# Performance
npm run build
npm run start
# Test production locally
```

---

## Getting Help

If you're still stuck:

1.  **Check this guide again** - 90% of issues are covered
2. **Check GitHub Issues** - https://github.com/Programmer-Dev-King/shadows-gaming-studio/issues
3. **Read logs carefully** - Error messages are specific
4. **Search Vercel docs** - https://vercel.com/docs
5. **Check Prisma docs** - https://www.prisma.io/docs/

---

**Last Updated**: December 3, 2025
**Status**: 🟢 Comprehensive
**Coverage**: 50+ Common Issues
