# Deployment Guide - Vercel

Deploy Shadows Gaming Studio to Vercel for production.

## Prerequisites

- [Vercel Account](https://vercel.com/signup)
- GitHub repository connected to Vercel
- PostgreSQL database (Vercel Postgres, Supabase, Neon, or other)

---

## Step 1: Database Setup

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel Dashboard
2. Navigate to **Storage** → **Create Database** → **Postgres**
3. Copy the `DATABASE_URL` from the connection details

### Option B: Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Project Settings** → **Database**
3. Copy the connection string (use "Connection pooling" for serverless)

### Option C: Neon

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the connection string from the dashboard

---

## Step 2: Deploy to Vercel

### From GitHub

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`

### Environment Variables

Add the following in Vercel's Environment Variables section:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | Your PostgreSQL connection string | Production, Preview, Development |
| `NEXTAUTH_SECRET` | Random 32+ character string | Production, Preview |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | Production |

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## Step 3: Build Settings

Vercel should auto-detect these, but verify:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

---

## Step 4: Database Migration

After first deployment, run migrations:

### Option A: Vercel CLI

```bash
vercel env pull .env.local
npx prisma db push
```

### Option B: CI/CD (Recommended)

Add to your build command in `package.json`:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

Add `prisma db push` as a one-time command or use migrations:

```bash
# For one-time schema sync
npx prisma db push

# For production migrations
npx prisma migrate deploy
```

---

## Step 5: Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXTAUTH_URL` to match your domain

---

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] Authentication works (signup/login)
- [ ] Database connections are stable
- [ ] Animations play smoothly
- [ ] Demo pages accessible (`/portal-demo`, `/team-demo`)
- [ ] API routes return expected responses
- [ ] Images load (or placeholders show correctly)

---

## Performance Optimization

### Image Optimization

Vercel automatically optimizes images. Ensure:

1. Use Next.js `<Image>` component
2. Configure `next.config.js`:
   ```js
   images: {
     remotePatterns: [
       { protocol: 'https', hostname: '**' }
     ]
   }
   ```

### Edge Functions

Consider moving API routes to Edge for lower latency:

```ts
export const runtime = 'edge';
```

### Caching

Leverage Vercel's caching:

```ts
// In API routes
export const revalidate = 3600; // Revalidate every hour
```

---

## Monitoring

### Vercel Analytics

Enable in Vercel Dashboard → **Analytics** tab.

### Error Tracking

Consider adding Sentry:

```bash
npm install @sentry/nextjs
```

---

## Troubleshooting

### Build Failures

1. Check build logs in Vercel Dashboard
2. Verify all environment variables are set
3. Run `npm run build` locally to reproduce

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Check connection pooling settings
3. Ensure IP whitelisting allows Vercel IPs

### Authentication Issues

1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your domain
3. Ensure HTTPS is enabled

---

## Rollback

If issues occur after deployment:

1. Go to **Deployments** in Vercel Dashboard
2. Find the previous working deployment
3. Click **...** → **Promote to Production**

---

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

---

🚀 **Happy Deploying!**
