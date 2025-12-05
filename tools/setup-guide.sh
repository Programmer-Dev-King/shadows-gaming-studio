#!/bin/bash
# setup-guide.sh
# Interactive setup helper for Shadows Gaming Studio

set -e

echo "================================================"
echo "🌑 SHADOWS GAMING STUDIO - Setup Helper"
echo "================================================"
echo ""

# Check Node.js version
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "  ✓ Node.js $NODE_VERSION installed"
    
    # Check if version is 18+
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | tr -d 'v')
    if [ "$MAJOR_VERSION" -lt 18 ]; then
        echo "  ⚠️  Warning: Node.js 18+ is recommended. You have $NODE_VERSION"
    fi
else
    echo "  ✗ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check npm
echo ""
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "  ✓ npm $NPM_VERSION installed"
else
    echo "  ✗ npm not found"
    exit 1
fi

# Check for .env file
echo ""
echo "🔐 Checking environment configuration..."
if [ -f ".env" ]; then
    echo "  ✓ .env file exists"
else
    if [ -f ".env.example" ]; then
        echo "  ⚠️  No .env file found. Creating from .env.example..."
        cp .env.example .env
        echo "  ✓ Created .env file"
        echo "  ⚠️  Please update .env with your actual values!"
    else
        echo "  ✗ No .env or .env.example found"
    fi
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo ""
echo "🗄️  Setting up Prisma..."
if [ -f "prisma/schema.prisma" ]; then
    npx prisma generate
    echo "  ✓ Prisma client generated"
    
    echo ""
    echo "  Would you like to push the database schema? (requires DATABASE_URL)"
    echo "  This will create the tables in your database."
    read -p "  Push schema? (y/n): " PUSH_SCHEMA
    
    if [ "$PUSH_SCHEMA" = "y" ] || [ "$PUSH_SCHEMA" = "Y" ]; then
        npx prisma db push
        echo "  ✓ Database schema pushed"
    else
        echo "  Skipped database push. Run 'npx prisma db push' later."
    fi
else
    echo "  ⚠️  No prisma/schema.prisma found"
fi

# Build check
echo ""
echo "🔨 Running build check..."
npm run build 2>/dev/null && echo "  ✓ Build successful" || echo "  ⚠️  Build has warnings/errors"

echo ""
echo "================================================"
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update .env with your database URL and secrets"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo ""
echo "Optional:"
echo "  - Run 'npx prisma studio' to view database"
echo "  - Run 'tools/generate-images.sh' to generate image variants"
echo ""
echo "🌑 Welcome to Shadows Gaming Studio!"
echo "================================================"
