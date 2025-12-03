#!/bin/bash

echo "🔥 SHADOWS GAMING STUDIO - QUICK SETUP"
echo "======================================="

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create . env. local
echo "🔐 Create .env.local with:"
echo "DATABASE_URL=postgresql://..."
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)"
echo "NEXTAUTH_URL=http://localhost:3000"
read -p "Press enter once you've created . env.local"

# Run migrations
echo "🗄️ Running database migrations..."
npx prisma migrate dev --name init

# Start dev server
echo "🚀 Starting development server..."
npm run dev
