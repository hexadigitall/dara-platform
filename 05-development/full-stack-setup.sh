#!/bin/bash

# StyleAI Full Stack Development Setup
# This script sets up the complete development environment

set -e

echo "🚀 StyleAI Full Stack Development Setup"
echo "======================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
log "Checking prerequisites..."

# Check Docker
if command -v docker &> /dev/null; then
    success "Docker is installed: $(docker --version)"
else
    warn "Docker not found. Install from: https://docker.com"
fi

# Check Node.js
if command -v node &> /dev/null; then
    success "Node.js is installed: $(node --version)"
else
    warn "Node.js not found. Install from: https://nodejs.org"
fi

# Check Python
if command -v python3 &> /dev/null; then
    success "Python is installed: $(python3 --version)"
else
    warn "Python3 not found. Install Python 3.11+"
fi

echo ""
log "Setting up development environment structure..."

# Create comprehensive directory structure
mkdir -p {backend,frontend,ai-services,database,apis,mobile-app,docs,tests,scripts,configs}

# Backend setup
log "Setting up Python backend environment..."
if [ ! -d "backend/venv" ]; then
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    
    # Create basic FastAPI app
    cat > main.py << 'BACKEND'
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="StyleAI API",
    description="Conversational AI Fashion Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "StyleAI API is running!", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "StyleAI API"}

@app.post("/api/v1/style/analyze")
async def analyze_style(request: dict):
    # Mock AI style analysis
    return {
        "analysis": {
            "style": "professional",
            "occasion": "business",
            "confidence": 0.95
        },
        "suggestions": [
            {
                "item": "Tailored Blazer",
                "brand": "Zara",
                "price": 89.99
            }
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
BACKEND
    
    # Install dependencies if requirements.txt exists
    if [ -f "../requirements.txt" ]; then
        pip install -r ../requirements.txt
    fi
    
    cd ..
    success "Backend environment created"
fi

# AI Services setup
log "Setting up AI services..."
mkdir -p ai-services/{style_processor,recommendation_engine,virtual_tryron}

cat > ai-services/style_processor/main.py << 'AI'
# StyleAI - Style Processing Service
import openai
from typing import Dict, List
import json

class StyleProcessor:
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
    
    async def process_style_request(self, text: str, user_context: Dict = None) -> Dict:
        """Process natural language style request using GPT-4"""
        
        prompt = f"""
        Analyze this fashion style request and extract key information:
        Request: "{text}"
        
        Extract:
        1. Style categories (casual, formal, business, etc.)
        2. Occasion type
        3. Color preferences
        4. Formality level (1-10)
        5. Season/weather considerations
        6. Budget indicators
        
        Return JSON format with analysis.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=500,
                temperature=0.3
            )
            
            return {
                "status": "success",
                "analysis": response.choices[0].message.content,
                "confidence": 0.9
            }
        except Exception as e:
            return {
                "status": "error",
                "error": str(e)
            }
AI

# Database setup
log "Setting up database configurations..."
mkdir -p database/{migrations,seeds,schemas}

cat > database/schemas/user_schema.sql << 'SQL'
-- StyleAI Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID REFERENCES users(id),
    display_name VARCHAR(100),
    age_range VARCHAR(20),
    style_preferences JSONB,
    size_preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Style requests history
CREATE TABLE IF NOT EXISTS style_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    request_text TEXT NOT NULL,
    style_analysis JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
SQL

# Docker Compose for full stack
log "Creating Docker Compose configuration..."
cat > docker-compose.full.yml << 'DOCKER'
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: styleai_postgres
    environment:
      POSTGRES_DB: styleai_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/schemas:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: styleai_redis
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  # Backend API
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: styleai_api
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/styleai_dev
      - REDIS_URL=redis://redis:6379
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started

  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: styleai_frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - api

  # AI Services
  ai-service:
    build:
      context: ./ai-services
      dockerfile: Dockerfile
    container_name: styleai_ai
    ports:
      - "8001:8001"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - redis

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local

networks:
  default:
    name: styleai_network
DOCKER

# Create environment template
log "Creating environment configuration..."
cat > .env.template << 'ENV'
# StyleAI Environment Configuration

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/styleai_dev
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI Services
OPENAI_API_KEY=your-openai-api-key-here
HUGGINGFACE_TOKEN=your-huggingface-token

# External APIs
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Retailer APIs
SHOPIFY_API_KEY=your-shopify-api-key
SHOPIFY_API_SECRET=your-shopify-api-secret

# Email
SENDGRID_API_KEY=your-sendgrid-api-key

# AWS (Optional for production)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=styleai-assets

# Development
NODE_ENV=development
PYTHON_ENV=development
ENV

# Development scripts
log "Creating development scripts..."
mkdir -p scripts

cat > scripts/dev-start.sh << 'DEV'
#!/bin/bash
echo "Starting StyleAI Full Stack Development..."

# Start backend
cd backend && source venv/bin/activate && python main.py &
BACKEND_PID=$!

# Start frontend (already running)
echo "Frontend running at: http://localhost:3000"
echo "Backend running at: http://localhost:8000"

echo "Development environment ready!"
echo "Backend PID: $BACKEND_PID"
DEV

chmod +x scripts/dev-start.sh

# Testing setup
log "Setting up testing framework..."
mkdir -p tests/{unit,integration,e2e}

cat > tests/test_api.py << 'TEST'
import pytest
import requests
from unittest.mock import patch

def test_api_health():
    """Test API health endpoint"""
    response = requests.get("http://localhost:8000/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

@patch('openai.OpenAI')
def test_style_analysis(mock_openai):
    """Test style analysis endpoint"""
    mock_response = {
        "analysis": {"style": "casual", "confidence": 0.9}
    }
    
    response = requests.post(
        "http://localhost:8000/api/v1/style/analyze",
        json={"text": "I need casual weekend clothes"}
    )
    
    assert response.status_code == 200
TEST

echo ""
success "✅ Full Stack Development Environment Setup Complete!"
echo ""
echo "🎯 Next Steps:"
echo "1. Copy .env.template to .env and add your API keys"
echo "2. Run: docker-compose -f docker-compose.full.yml up -d"
echo "3. Visit: http://localhost:3000 (Frontend)"
echo "4. Visit: http://localhost:8000 (Backend API)"
echo ""
echo "📁 Project Structure:"
echo "├── frontend/          # Next.js React app"
echo "├── backend/           # FastAPI Python app"
echo "├── ai-services/       # AI processing services"
echo "├── database/          # Database schemas & migrations"
echo "├── tests/             # Test suites"
echo "└── scripts/           # Development scripts"
echo ""
echo "🚀 Development Ready!"

