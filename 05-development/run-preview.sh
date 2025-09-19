#!/bin/bash

# StyleAI Preview Server Setup
# This script sets up and runs the development server for preview

set -e

echo "🎨 StyleAI Preview Server Setup"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed. Please install Node.js 18+ first."
    echo "Install from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
log_info "Node.js version: $NODE_VERSION"

# Navigate to frontend directory
cd frontend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    log_error "package.json not found. Make sure you're in the correct directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    log_info "Installing dependencies..."
    npm install
    log_success "Dependencies installed successfully"
else
    log_info "Dependencies already installed. Checking for updates..."
    npm outdated || true
fi

# Create necessary directories
mkdir -p public components pages styles utils hooks

# Create a simple public directory with favicon
if [ ! -f "public/favicon.ico" ]; then
    log_info "Creating basic favicon..."
    # Create a simple favicon placeholder
    echo "Creating basic assets..."
fi

# Check if all required files exist
REQUIRED_FILES=(
    "pages/index.tsx"
    "pages/_app.tsx"
    "pages/style.tsx"
    "components/Layout.tsx"
    "styles/globals.css"
    "tailwind.config.js"
    "next.config.js"
    "package.json"
)

log_info "Checking required files..."
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_success "✓ $file"
    else
        log_warn "✗ $file (missing)"
    fi
done

# Build CSS if needed
if [ ! -f ".next/static/css/app.css" ]; then
    log_info "Building Tailwind CSS..."
    npm run build:css 2>/dev/null || log_warn "CSS build skipped (build script not found)"
fi

echo ""
echo "🚀 Starting StyleAI Development Server..."
echo "========================================="
echo ""
echo "The application will be available at:"
echo "• Local:    http://localhost:3000"
echo "• Network:  http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo "Pages available:"
echo "• Home Page:     http://localhost:3000"
echo "• AI Stylist:    http://localhost:3000/style"
echo "• Discover:      http://localhost:3000/discover"
echo "• Trends:        http://localhost:3000/trends"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
log_info "Starting Next.js development server..."
npm run dev
