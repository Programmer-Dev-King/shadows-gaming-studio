#!/bin/bash

# Shadows Gaming Studio - Setup Guide Script
# Interactive setup helper for new developers

set -e

echo ""
echo "🎮 ═══════════════════════════════════════════════════════════════════════════════"
echo "   ███████╗██╗  ██╗ █████╗ ██████╗  ██████╗ ██╗    ██╗███████╗"
echo "   ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔═══██╗██║    ██║██╔════╝"
echo "   ███████╗███████║███████║██║  ██║██║   ██║██║ █╗ ██║███████╗"
echo "   ╚════██║██╔══██║██╔══██║██║  ██║██║   ██║██║███╗██║╚════██║"
echo "   ███████║██║  ██║██║  ██║██████╔╝╚██████╔╝╚███╔███╔╝███████║"
echo "   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚══════╝"
echo "                    GAMING STUDIO - ASCENSION OF SHADOWS"
echo "═══════════════════════════════════════════════════════════════════════════════ 🎮"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "📋 Pre-flight Checklist"
echo "━━━━━━━━━━━━━━━━━━━━━━━"

# Check Node.js version
echo -n "  Node.js (v18+)........... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ $NODE_VERSION"
else
    echo "❌ Not installed"
    echo ""
    echo "⚠️  Please install Node.js v18 or higher: https://nodejs.org"
    exit 1
fi

# Check npm
echo -n "  npm...................... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ v$NPM_VERSION"
else
    echo "❌ Not installed"
    exit 1
fi

# Check for .env file
echo -n "  Environment file......... "
if [ -f ".env" ]; then
    echo "✅ .env exists"
else
    echo "⚠️  Creating from .env.example"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "     📝 Created .env - please update with your values"
    else
        echo "     ❌ .env.example not found"
    fi
fi

echo ""
echo "📦 Installing Dependencies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm install

echo ""
echo "🗄️  Database Setup"
echo "━━━━━━━━━━━━━━━━━━"
echo "  Checking Prisma configuration..."

if grep -q "DATABASE_URL" .env 2>/dev/null; then
    echo "  ✅ DATABASE_URL found in .env"
    echo ""
    echo "  Run the following to set up your database:"
    echo "    npx prisma generate"
    echo "    npx prisma db push"
    echo "    npx prisma studio  (optional - visual database editor)"
else
    echo "  ⚠️  DATABASE_URL not configured in .env"
    echo "  Please add your PostgreSQL connection string to .env"
fi

echo ""
echo "🎨 Image Assets"
echo "━━━━━━━━━━━━━━━"
echo "  Place original images in: public/images/originals/"
echo "  Then run: npm run generate-images"

echo ""
echo "🚀 Quick Start Commands"
echo "━━━━━━━━━━━━━━━━━━━━━━━"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run lint         - Run ESLint"
echo "  npm run type-check   - Check TypeScript types"
echo "  npm run prisma:studio - Open database GUI"

echo ""
echo "🔗 URLs"
echo "━━━━━━━"
echo "  Local:      http://localhost:3000"
echo "  Portal Demo: http://localhost:3000/portal-demo"
echo "  Team Demo:   http://localhost:3000/team-demo"

echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "  ✨ Setup complete! Run 'npm run dev' to start the development server."
echo "═══════════════════════════════════════════════════════════════════════════════"
echo ""
