# StyleAI Development Environment Setup

## Prerequisites

### System Requirements
- **OS**: macOS, Linux, or Windows with WSL2
- **Node.js**: v18+ (for frontend)
- **Python**: 3.11+ (for backend)
- **Docker**: Latest version with Docker Compose
- **Git**: Latest version

### Development Tools
- **IDE**: VS Code with recommended extensions
- **Database Client**: TablePlus or pgAdmin for PostgreSQL
- **API Client**: Insomnia or Postman for API testing
- **Terminal**: iTerm2 (macOS) or Windows Terminal

## Quick Start (Docker Development)

### 1. Clone and Setup
```bash
git clone https://github.com/styleai/styleai-platform.git
cd styleai-platform
cp .env.example .env
```

### 2. Start Development Environment
```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# Check services status
docker-compose ps

# View logs
docker-compose logs -f api
```

### 3. Initialize Database
```bash
# Run database migrations
docker-compose exec api python -m alembic upgrade head

# Seed development data
docker-compose exec api python scripts/seed_dev_data.py
```

### 4. Access Services
- **Frontend**: http://localhost:3000
- **API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Database**: localhost:5432 (postgres/postgres)
- **Redis**: localhost:6379

## Local Development Setup

### Backend Setup (Python/FastAPI)

```bash
cd backend/

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Start PostgreSQL and Redis (using Docker)
docker-compose -f docker-compose.services.yml up -d postgres redis

# Run database migrations
alembic upgrade head

# Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup (React/Next.js)

```bash
cd frontend/

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

### AI/ML Services Setup

```bash
cd ai-services/

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install ML dependencies
pip install -r requirements.txt

# Set up OpenAI API key
export OPENAI_API_KEY="your_openai_api_key"

# Start ML service
python -m uvicorn main:app --reload --port 8001
```

## Docker Compose Configuration

### Development Environment
```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: styleai_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  api:
    build: 
      context: ./backend
      dockerfile: Dockerfile.dev
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/styleai_dev
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000

  ai-service:
    build:
      context: ./ai-services
      dockerfile: Dockerfile.dev
    volumes:
      - ./ai-services:/app
    ports:
      - "8001:8001"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}

volumes:
  postgres_data:
```

## Project Structure

```
styleai-platform/
├── backend/                 # FastAPI backend services
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── main.py         # FastAPI application
│   ├── tests/              # Backend tests
│   ├── alembic/            # Database migrations
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile
│
├── frontend/               # Next.js frontend application
│   ├── components/         # React components
│   ├── pages/              # Next.js pages
│   ├── styles/             # CSS/Tailwind styles
│   ├── utils/              # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── package.json        # Node.js dependencies
│   └── Dockerfile
│
├── ai-services/            # AI/ML microservices
│   ├── style_processor/    # Style analysis service
│   ├── recommendation/     # Recommendation engine
│   ├── models/             # ML model files
│   └── requirements.txt
│
├── mobile/                 # React Native mobile app
│   ├── src/
│   ├── android/
│   ├── ios/
│   └── package.json
│
├── shared/                 # Shared code and schemas
│   ├── schemas/            # API schemas
│   └── types/              # TypeScript types
│
├── docs/                   # Documentation
├── scripts/                # Development scripts
├── docker-compose.yml      # Production compose
├── docker-compose.dev.yml  # Development compose
└── README.md
```

## Environment Variables

### Backend (.env)
```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/styleai_dev
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI Services
OPENAI_API_KEY=your-openai-api-key
STYLE_SERVICE_URL=http://localhost:8001

# External APIs
STRIPE_SECRET_KEY=your-stripe-secret-key
SENDGRID_API_KEY=your-sendgrid-api-key

# Retailer APIs
SHOPIFY_API_KEY=your-shopify-key
SHOPIFY_API_SECRET=your-shopify-secret

# AWS (for production)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=styleai-assets
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

## Database Setup

### PostgreSQL Schema Initialization
```sql
-- Create development database
CREATE DATABASE styleai_dev;

-- Create test database
CREATE DATABASE styleai_test;

-- Create user (optional)
CREATE USER styleai_dev WITH PASSWORD 'styleai_dev';
GRANT ALL PRIVILEGES ON DATABASE styleai_dev TO styleai_dev;
```

### Run Migrations
```bash
cd backend/

# Generate migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head

# Downgrade if needed
alembic downgrade -1
```

## Testing Setup

### Backend Testing
```bash
cd backend/

# Install test dependencies
pip install pytest pytest-asyncio pytest-cov httpx

# Run tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_style_service.py -v
```

### Frontend Testing
```bash
cd frontend/

# Install test dependencies (already in package.json)
npm install

# Run Jest tests
npm test

# Run E2E tests with Playwright
npm run test:e2e

# Run specific test
npm test -- StyleInput.test.tsx
```

### Test Configuration

#### pytest.ini (Backend)
```ini
[tool:pytest]
testpaths = tests
python_files = test_*.py
python_functions = test_*
addopts = 
    -v
    --tb=short
    --strict-markers
    --disable-warnings
asyncio_mode = auto
```

#### jest.config.js (Frontend)
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

## Development Scripts

### Backend Scripts
```bash
# Format code
black app/ tests/
isort app/ tests/

# Lint code
flake8 app/ tests/
mypy app/

# Generate API documentation
python scripts/generate_openapi.py

# Seed development data
python scripts/seed_dev_data.py

# Reset database
python scripts/reset_database.py
```

### Frontend Scripts
```bash
# Format code
npm run lint:fix
npm run prettier:fix

# Type checking
npm run type-check

# Build for production
npm run build

# Analyze bundle size
npm run analyze
```

### Useful Development Commands
```bash
# View API logs in real-time
docker-compose logs -f api

# Execute command in running container
docker-compose exec api python -c "print('Hello from API container')"

# Reset development environment
docker-compose down -v
docker-compose up -d

# Database shell
docker-compose exec postgres psql -U postgres styleai_dev

# Redis CLI
docker-compose exec redis redis-cli
```

## IDE Configuration

### VS Code Extensions
- Python
- Pylance
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- REST Client
- Docker

### VS Code Settings (.vscode/settings.json)
```json
{
  "python.defaultInterpreterPath": "./backend/venv/bin/python",
  "python.formatting.provider": "black",
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Troubleshooting

### Common Issues

#### Docker Issues
```bash
# Clear Docker cache
docker system prune -a

# Rebuild containers
docker-compose build --no-cache

# Check container logs
docker-compose logs api
```

#### Database Connection Issues
```bash
# Check PostgreSQL status
docker-compose exec postgres pg_isready -U postgres

# Reset database
docker-compose exec postgres dropdb -U postgres styleai_dev
docker-compose exec postgres createdb -U postgres styleai_dev
```

#### Node Modules Issues
```bash
# Clear node modules and reinstall
rm -rf frontend/node_modules
rm frontend/package-lock.json
cd frontend && npm install
```

### Performance Tips
- Use Docker BuildKit for faster builds
- Enable hot reloading for development
- Use database connection pooling
- Implement proper caching strategies
- Monitor memory usage in development

## Next Steps

1. **Complete Backend API**: Implement all core endpoints
2. **Build Frontend Components**: Create React components for each feature
3. **Integrate AI Services**: Connect OpenAI and custom ML models
4. **Set Up Testing**: Comprehensive test coverage
5. **Configure CI/CD**: GitHub Actions for automated testing
6. **Deploy Staging**: AWS staging environment setup

This development environment provides a solid foundation for building StyleAI efficiently and collaboratively.
