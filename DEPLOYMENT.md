# 🚀 Deployment Guide

## Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

### Deploy via GitHub

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   In Vercel project settings → "Environment Variables":
   
   | Variable | Value |
   |----------|-------|
   | `DATABASE_URL` | Your PostgreSQL connection string |
   | `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | Your Vercel domain (e.g., `https://your-project.vercel.app`) |

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Access your live site

### Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Environment Variables for Production

### Required

```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
NEXTAUTH_SECRET="your-production-secret-min-32-chars"
NEXTAUTH_URL="https://your-domain.com"
```

### Optional OAuth Providers

```env
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"
GOOGLE_ID="your-google-oauth-id"
GOOGLE_SECRET="your-google-oauth-secret"
```

## Database Setup for Production

### Neon (Recommended)

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add `?sslmode=require` to the URL
5. Set as `DATABASE_URL` in Vercel

### Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Go to Settings → Database
3. Copy "Connection string" (URI format)
4. Set as `DATABASE_URL` in Vercel

### Railway

1. Create project at [railway.app](https://railway.app)
2. Add PostgreSQL plugin
3. Copy `DATABASE_URL` from variables
4. Set in Vercel

## Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Run database migrations: `npx prisma db push`
- [ ] Test authentication flow
- [ ] Check all pages load correctly
- [ ] Verify API endpoints work
- [ ] Test animations on mobile
- [ ] Check console for errors

## Custom Domain

### In Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` to your domain

### DNS Records

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

## Performance Optimization

### Enable Edge Runtime (optional)

For API routes that don't need Node.js:
```typescript
export const runtime = 'edge';
```

### Image Optimization

Already configured in `next.config.js`:
```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**' },
  ],
},
```

### Caching Headers

Already configured in `next.config.js` with security headers.

## Monitoring & Analytics

### Vercel Analytics
Enable in Vercel dashboard → Analytics

### Error Tracking (Sentry)
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## Rollback Deployment

```bash
# Via CLI
vercel rollback

# Or in Vercel Dashboard
# Go to Deployments → Select previous → Promote to Production
```

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Type check
        run: npm run type-check
        
      - name: Lint
        run: npm run lint
        
      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
          NEXTAUTH_URL: ${{ secrets.NEXTAUTH_URL }}
```

## Alternative Platforms

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway up
```

### Docker

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

ENV NODE_ENV production
EXPOSE 3000

CMD ["npm", "start"]
```

```bash
docker build -t shadows-gaming .
docker run -p 3000:3000 shadows-gaming
```

## Security Checklist

- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Environment variables not exposed
- [ ] NEXTAUTH_SECRET is unique and strong
- [ ] Database connection uses SSL
- [ ] CORS configured correctly
- [ ] Rate limiting on API routes
- [ ] Input validation on all forms

## Troubleshooting

### Build Fails

1. Check build logs in Vercel
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript has no errors
4. Check for missing environment variables

### Database Connection Issues

1. Verify SSL mode: `?sslmode=require`
2. Check IP allowlist in database provider
3. Verify connection string format

### Authentication Not Working

1. Ensure `NEXTAUTH_URL` matches deployed URL exactly
2. Verify `NEXTAUTH_SECRET` is set
3. Check callback URLs in OAuth providers

---

**Need help?** Open an issue on GitHub.
