# DARA Platform - Developer Guide

## Overview

This developer guide provides comprehensive information for contributing to the DARA platform, including setup instructions, architecture overview, coding standards, and deployment procedures.

## Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.11+
- PostgreSQL 14+
- Redis 6+
- Docker (recommended)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/dara-platform.git
cd dara-platform

# Install dependencies
cd 05-development/frontend
npm install

cd ../backend
pip install -r requirements.txt

# Setup environment variables
cp .env.template .env
# Edit .env with your configuration

# Start development servers
./scripts/dev-start.sh
```

## Architecture Overview

### Technology Stack

#### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom DARA theme
- **State Management**: React Context + Zustand
- **Animations**: Framer Motion
- **Testing**: Jest + React Testing Library

#### Backend
- **API Framework**: FastAPI (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Caching**: Redis
- **Authentication**: JWT with OAuth2
- **Background Tasks**: Celery

#### AI/ML Services
- **ML Framework**: PyTorch/Transformers
- **Model Serving**: FastAPI + Uvicorn
- **Cultural Awareness**: Custom NLP models
- **Recommendation Engine**: Hybrid collaborative/content filtering

### Project Structure

```
dara-platform/
├── 01-project-overview/          # Project documentation
├── 02-business-documents/        # Business plans and strategy
├── 03-technical-specs/          # Technical architecture docs
├── 04-mvp-design/              # Design specifications
├── 05-development/             # Source code
│   ├── frontend/               # Next.js application
│   ├── backend/                # FastAPI application
│   ├── ai-services/           # ML services
│   ├── database/              # Database schemas and migrations
│   └── configs/               # Configuration files
├── 06-funding/                 # Investor materials
├── 07-documentation/          # User and developer guides
├── 08-assets/                 # Brand assets and designs
├── 09-prototypes/             # Design prototypes
└── 10-deployment/             # Infrastructure and deployment
```

## Development Guidelines

### Code Style & Standards

#### TypeScript/React Standards
```typescript
// Use functional components with hooks
import React, { useState, useEffect } from 'react';

interface UserProfileProps {
  userId: string;
  culturalPreferences: CulturalPreference[];
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  culturalPreferences
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Custom hook for cultural data
  const { culturalData, updatePreferences } = useCulturalProfile(userId);
  
  return (
    <div className="cultural-profile-container">
      {/* Component JSX */}
    </div>
  );
};
```

#### Python/FastAPI Standards
```python
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List

class StyleRequest(BaseModel):
    """Style analysis request model with cultural awareness."""
    text: str
    cultural_context: Optional[str] = None
    user_preferences: Optional[dict] = None
    
    class Config:
        schema_extra = {
            "example": {
                "text": "I need something elegant for a cultural celebration",
                "cultural_context": "west_african",
                "user_preferences": {"colors": ["gold", "royal_blue"]}
            }
        }

@app.post("/api/v1/style/analyze")
async def analyze_style(
    request: StyleRequest,
    user: User = Depends(get_current_user)
) -> StyleAnalysisResponse:
    """Analyze style preferences with cultural sensitivity."""
    try:
        # Cultural context validation
        if request.cultural_context:
            await validate_cultural_context(request.cultural_context)
        
        # Process with AI service
        analysis = await ai_service.analyze_with_culture(
            text=request.text,
            cultural_context=request.cultural_context,
            user_preferences=user.style_profile
        )
        
        return StyleAnalysisResponse(analysis=analysis)
    
    except CulturalSensitivityError as e:
        raise HTTPException(status_code=422, detail=str(e))
```

### Cultural Sensitivity Guidelines

#### Code Review Checklist
- [ ] Cultural elements are properly attributed
- [ ] No stereotypes or oversimplifications
- [ ] Cultural consultants involved in feature review
- [ ] Educational context provided where appropriate
- [ ] User consent for cultural data usage

#### Cultural Data Handling
```python
class CulturalData(BaseModel):
    """Model for handling cultural fashion data."""
    heritage_id: str
    cultural_context: dict
    significance_level: str  # 'sacred', 'ceremonial', 'daily'
    usage_guidelines: List[str]
    attribution_required: bool = True
    consultant_approved: bool = False

    def validate_cultural_usage(self, user_context: dict) -> bool:
        """Validate if cultural element usage is appropriate."""
        if self.significance_level == 'sacred':
            return self.check_heritage_connection(user_context)
        return True
```

### AI/ML Development

#### Model Training Guidelines
```python
import torch
from transformers import AutoModel, AutoTokenizer
from datasets import Dataset

class CulturalAwareStyleModel:
    """AI model with cultural sensitivity built-in."""
    
    def __init__(self, model_name: str = "cultural-fashion-bert"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)
        self.cultural_classifier = CulturalContextClassifier()
    
    def predict_with_cultural_awareness(self, text: str, cultural_context: str = None):
        """Generate predictions with cultural sensitivity checks."""
        # Tokenize input
        inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        
        # Cultural context embedding
        if cultural_context:
            cultural_embedding = self.cultural_classifier.encode(cultural_context)
            inputs['cultural_context'] = cultural_embedding
        
        # Generate predictions
        with torch.no_grad():
            outputs = self.model(**inputs)
        
        # Apply cultural sensitivity filters
        predictions = self.apply_cultural_filters(outputs, cultural_context)
        
        return predictions
    
    def apply_cultural_filters(self, outputs, cultural_context):
        """Filter predictions for cultural appropriateness."""
        # Implementation of cultural sensitivity filtering
        pass
```

#### Bias Detection & Mitigation
```python
from fairlearn.metrics import demographic_parity_difference
from sklearn.metrics import accuracy_score

class BiasDetector:
    """Detect and measure bias in AI recommendations."""
    
    def __init__(self):
        self.protected_attributes = ['cultural_background', 'region', 'income_level']
    
    def evaluate_fairness(self, model, test_data):
        """Evaluate model fairness across different groups."""
        results = {}
        
        for attribute in self.protected_attributes:
            predictions = model.predict(test_data.features)
            
            # Calculate demographic parity
            dp_diff = demographic_parity_difference(
                test_data.labels,
                predictions,
                sensitive_features=test_data[attribute]
            )
            
            results[f'{attribute}_parity'] = dp_diff
            
        return results
```

## API Development

### Cultural-Aware Endpoints

#### Style Analysis Endpoint
```python
@router.post("/style/analyze", response_model=StyleAnalysisResponse)
async def analyze_style(
    request: StyleRequest,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    cultural_validator: CulturalValidator = Depends(get_cultural_validator)
):
    """
    Analyze user style request with cultural sensitivity.
    
    This endpoint processes natural language style requests and returns
    culturally-appropriate fashion recommendations.
    """
    
    # Validate cultural context
    if request.cultural_context:
        await cultural_validator.validate_context(request.cultural_context)
    
    # Process AI request
    analysis_result = await ai_service.analyze_style(
        text=request.text,
        user_profile=current_user.style_profile,
        cultural_context=request.cultural_context
    )
    
    # Log for bias monitoring
    background_tasks.add_task(
        log_recommendation_metrics,
        user_id=current_user.id,
        cultural_context=request.cultural_context,
        result_diversity=analysis_result.diversity_score
    )
    
    return analysis_result
```

### Database Models

#### Cultural Fashion Models
```python
from sqlalchemy import Column, String, JSON, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class CulturalHeritage(Base):
    __tablename__ = "cultural_heritage"
    
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    region = Column(String, nullable=False)
    cultural_context = Column(JSON)
    significance_level = Column(String)  # sacred, ceremonial, daily
    historical_context = Column(Text)
    usage_guidelines = Column(JSON)
    attribution_required = Column(Boolean, default=True)
    consultant_approved = Column(Boolean, default=False)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

class FashionItem(Base):
    __tablename__ = "fashion_items"
    
    id = Column(String, primary_key=True)
    brand_id = Column(String, nullable=False)
    cultural_tags = Column(JSON)  # Array of cultural references
    sustainability_score = Column(Integer)
    style_categories = Column(JSON)
    cultural_verification_status = Column(String)  # pending, approved, rejected
    consultant_notes = Column(Text)
```

## Frontend Development

### Component Architecture

#### Cultural-Aware Components
```tsx
// components/CulturalStyleCard.tsx
import React from 'react';
import { CulturalItem } from '../types/cultural';

interface CulturalStyleCardProps {
  item: CulturalItem;
  showEducationalContent?: boolean;
  onLearnMore?: () => void;
}

export const CulturalStyleCard: React.FC<CulturalStyleCardProps> = ({
  item,
  showEducationalContent = true,
  onLearnMore
}) => {
  const handleRespectfulSharing = () => {
    // Implementation for respectful cultural sharing
    if (item.attributionRequired) {
      // Show attribution guidelines
    }
  };

  return (
    <div className="cultural-style-card">
      <div className="cultural-indicator">
        <span className="cultural-badge">{item.culturalContext.region}</span>
        {item.consultantApproved && (
          <span className="verification-badge">✓ Culturally Verified</span>
        )}
      </div>
      
      <div className="item-content">
        {/* Item display content */}
      </div>
      
      {showEducationalContent && (
        <div className="cultural-education">
          <h4>Cultural Context</h4>
          <p>{item.historicalContext}</p>
          <button onClick={onLearnMore}>Learn More</button>
        </div>
      )}
    </div>
  );
};
```

#### Sustainable Fashion Components
```tsx
// components/SustainabilityScore.tsx
interface SustainabilityScoreProps {
  score: number;
  breakdown: {
    environmental: number;
    social: number;
    economic: number;
  };
  certifications: string[];
}

export const SustainabilityScore: React.FC<SustainabilityScoreProps> = ({
  score,
  breakdown,
  certifications
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="sustainability-score">
      <div className={`score-display ${getScoreColor(score)}`}>
        <span className="score-number">{score}</span>
        <span className="score-label">Sustainability Score</span>
      </div>
      
      <div className="score-breakdown">
        <div className="breakdown-item">
          <span>Environmental</span>
          <div className="progress-bar">
            <div 
              className="progress-fill bg-green-500"
              style={{ width: `${breakdown.environmental}%` }}
            />
          </div>
        </div>
        {/* Similar for social and economic */}
      </div>
      
      <div className="certifications">
        {certifications.map(cert => (
          <span key={cert} className="certification-badge">{cert}</span>
        ))}
      </div>
    </div>
  );
};
```

## Testing

### Cultural Sensitivity Testing
```typescript
// __tests__/cultural/culturalSensitivity.test.ts
import { render, screen } from '@testing-library/react';
import { CulturalStyleCard } from '../components/CulturalStyleCard';
import { mockCulturalItem } from '../__mocks__/cultural';

describe('Cultural Sensitivity', () => {
  it('should display cultural attribution when required', () => {
    const item = {
      ...mockCulturalItem,
      attributionRequired: true,
      culturalContext: {
        region: 'West Africa',
        significance: 'Traditional ceremonial wear'
      }
    };
    
    render(<CulturalStyleCard item={item} />);
    
    expect(screen.getByText('West Africa')).toBeInTheDocument();
    expect(screen.getByText('✓ Culturally Verified')).toBeInTheDocument();
  });
  
  it('should not suggest sacred items for casual wear', async () => {
    const sacredItem = {
      ...mockCulturalItem,
      significanceLevel: 'sacred',
      usageGuidelines: ['ceremonial_only']
    };
    
    const result = await analyzeStyleAppropriatenesss(sacredItem, 'casual');
    expect(result.appropriate).toBe(false);
    expect(result.reason).toContain('sacred ceremonial use');
  });
});
```

### AI Bias Testing
```python
# tests/ai/bias_tests.py
import pytest
from fairlearn.metrics import demographic_parity_difference
from src.ai.style_recommender import StyleRecommender

class TestAIBias:
    def setup_method(self):
        self.recommender = StyleRecommender()
        self.test_data = load_diverse_test_dataset()
    
    def test_cultural_representation_fairness(self):
        """Test that AI recommendations are fair across cultural groups."""
        recommendations = []
        
        for user in self.test_data.users:
            recs = self.recommender.get_recommendations(
                user.profile,
                cultural_context=user.cultural_background
            )
            recommendations.append(recs)
        
        # Measure representation across cultural groups
        cultural_diversity = measure_cultural_diversity(recommendations)
        
        assert cultural_diversity > 0.8, "Recommendations lack cultural diversity"
    
    def test_sustainable_brand_representation(self):
        """Test that sustainable brands are fairly represented."""
        recommendations = self.recommender.get_recommendations(
            test_profile={'sustainability_preference': 'high'}
        )
        
        sustainable_ratio = calculate_sustainable_ratio(recommendations)
        assert sustainable_ratio > 0.7, "Insufficient sustainable brand representation"
```

## Deployment

### Environment Configuration
```yaml
# docker-compose.yml
version: '3.8'
services:
  dara-frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
      - NEXT_PUBLIC_CULTURAL_API_URL=http://cultural-service:8001
    ports:
      - "3000:3000"
    depends_on:
      - dara-backend
      - cultural-service

  dara-backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/dara_db
      - REDIS_URL=redis://redis:6379/0
      - CULTURAL_SENSITIVITY_LEVEL=high
    ports:
      - "8000:8000"
    depends_on:
      - db
      - redis

  cultural-service:
    build:
      context: ./ai-services
      dockerfile: Dockerfile.cultural
    environment:
      - MODEL_PATH=/models/cultural-awareness-v1
      - BIAS_DETECTION_ENABLED=true
    volumes:
      - ./models:/models
```

### CI/CD Pipeline
```yaml
# .github/workflows/dara-ci-cd.yml
name: DARA Platform CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  cultural-sensitivity-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Cultural Sensitivity Tests
        run: |
          python -m pytest tests/cultural/ -v
          python scripts/check_cultural_content.py
  
  bias-detection:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run AI Bias Tests
        run: |
          python -m pytest tests/ai/bias_tests.py
          python scripts/measure_recommendation_fairness.py
  
  deploy:
    needs: [cultural-sensitivity-check, bias-detection]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Production
        run: |
          # Deployment steps with cultural verification
          echo "Deploying DARA with cultural sensitivity verified"
```

## Contributing

### Pull Request Guidelines
1. **Cultural Review**: All cultural content must be reviewed by cultural consultants
2. **Bias Testing**: Run bias detection tests for AI changes
3. **Sustainability Check**: Ensure sustainable fashion principles are maintained
4. **Documentation**: Update relevant documentation
5. **Testing**: Maintain >80% test coverage

### Code Review Checklist
- [ ] Cultural sensitivity verified
- [ ] AI bias testing passed
- [ ] Sustainability principles maintained
- [ ] Performance benchmarks met
- [ ] Security vulnerabilities addressed
- [ ] Accessibility standards followed
- [ ] Documentation updated

---

**DARA Developer Guide** - Building the future of culturally-aware fashion technology.

*Development platform by [Hexadigitall](https://hexadigitall.com) - From Idea to Impact.*
