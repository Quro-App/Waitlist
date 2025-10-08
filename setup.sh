#!/bin/bash

# Quro Waitlist Setup Script
# This script helps you set up your Quro waitlist application

echo "🚀 Welcome to Quro Waitlist Setup!"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔐 Setting up environment variables..."
    echo ""
    echo "Please enter your admin password (press Enter for default 'quro2025secure'):"
    read -s admin_password
    
    if [ -z "$admin_password" ]; then
        admin_password="quro2025secure"
    fi
    
    cat > .env.local << EOF
# Admin Dashboard Password
ADMIN_PASSWORD=$admin_password

# Database
DATABASE_PATH=./data/waitlist.db
EOF
    
    echo "✅ Environment file created (.env.local)"
    echo ""
else
    echo "ℹ️  .env.local already exists, skipping..."
    echo ""
fi

# Create data directory
mkdir -p data
echo "✅ Data directory created"
echo ""

echo "=================================="
echo "🎉 Setup complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Access admin dashboard at http://localhost:3000/admin"
echo ""
echo "📚 Check GETTING_STARTED.md for detailed instructions"
echo ""

