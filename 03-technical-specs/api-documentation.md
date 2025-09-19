# DARA Platform - API Documentation

## Overview

The DARA API provides endpoints for AI-powered fashion styling, cultural trend discovery, and personalized fashion recommendations. Built with cultural sensitivity and global accessibility in mind.

## Base URL
```
Production: https://api.dara.fashion/v1
Staging: https://staging-api.dara.fashion/v1
```

## Authentication

### JWT Bearer Token
```http
Authorization: Bearer {jwt_token}
```

### API Key (for partners)
```http
X-API-Key: {api_key}
```

## Core Endpoints

### Authentication

#### POST /auth/register
Create a new user account with cultural preferences.

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "Fashion Lover",
  "cultural_preferences": {
    "regions": ["West Africa", "Caribbean"],
    "style_influences": ["Ankara", "Kente", "Modern Fusion"]
  },
  "privacy_settings": {
    "cultural_data_sharing": true,
    "trend_analytics": true
  }
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 3600,
    "cultural_profile_created": true
  }
}
```

#### POST /auth/login
Authenticate existing user.

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com", 
  "password": "securePassword123",
  "remember_me": true
}
```

### Style Analysis

#### POST /style/analyze
Analyze fashion preferences and generate culturally-aware recommendations.

```http
POST /style/analyze
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "text": "I want to look elegant for my grandmother's 80th birthday celebration. Something that honors our Ghanaian heritage but works in a modern setting.",
  "context": {
    "occasion": "family_celebration",
    "cultural_significance": "high",
    "modern_fusion": true
  },
  "preferences": {
    "color_palette": ["gold", "burgundy", "deep_blue"],
    "style_fusion": true,
    "budget_range": "mid"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "analysis_id": "550e8400-e29b-41d4-a716-446655440001",
    "cultural_context": {
      "detected_heritage": "Ghanaian",
      "occasion_type": "celebratory",
      "respect_level": "high",
      "modern_fusion_appropriate": true
    },
    "style_recommendations": [
      {
        "outfit_id": "outfit_001",
        "description": "Modern Kente-inspired dress with contemporary cut",
        "cultural_elements": ["Kente patterns", "Traditional colors", "Modern silhouette"],
        "items": [
          {
            "type": "dress",
            "brand": "Ghanaian Heritage Couture",
            "cultural_story": "Inspired by Ashanti royal patterns",
            "sustainability_score": 85,
            "price_range": "$150-200"
          }
        ],
        "styling_tips": [
          "Pair with gold jewelry to honor traditional aesthetics",
          "Modern heels that complement the cultural pattern",
          "Hair styling that respects cultural significance"
        ]
      }
    ],
    "cultural_insights": {
      "significance": "Kente patterns traditionally represent wisdom and strength",
      "modern_adaptation": "Contemporary cuts make traditional patterns accessible",
      "respect_guidelines": "Always credit cultural origins and wear with understanding"
    }
  }
}
```

#### POST /style/quick-suggestion
Get rapid style suggestions for daily wear.

```http
POST /style/quick-suggestion
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "mood": "confident",
  "weather": "sunny",
  "occasion": "work", 
  "cultural_preference": "subtle_influence"
}
```

### Fashion Discovery

#### GET /discover/trends
Discover global fashion trends with cultural context.

```http
GET /discover/trends?region=global&cultural_focus=african_diaspora&limit=20
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "trends": [
      {
        "trend_id": "trend_001",
        "name": "Neo-African Minimalism",
        "description": "Clean lines inspired by traditional African geometric patterns",
        "cultural_origin": "Pan-African",
        "popularity_score": 92,
        "sustainability_focus": true,
        "key_elements": [
          "Earth tone color palettes",
          "Geometric pattern integration",
          "Sustainable fabric choices"
        ],
        "featured_brands": [
          {
            "name": "Adunni Sustainable Fashion",
            "cultural_authenticity": "verified",
            "sustainability_rating": "A+"
          }
        ]
      }
    ],
    "cultural_context": {
      "historical_significance": "Rooted in traditional African design principles",
      "modern_interpretation": "Adapted for contemporary global wardrobes",
      "cultural_respect_notes": "Always acknowledge cultural origins"
    }
  }
}
```

#### GET /discover/brands
Find culturally-conscious fashion brands.

```http
GET /discover/brands?cultural_focus=true&sustainability_min=70&region=global
Authorization: Bearer {jwt_token}
```

### Cultural Fashion

#### GET /cultural/heritage/{heritage_id}
Get detailed information about specific cultural fashion heritage.

```http
GET /cultural/heritage/west-african-textiles
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "heritage_id": "west-african-textiles",
    "name": "West African Traditional Textiles",
    "regions": ["Ghana", "Nigeria", "Mali", "Senegal"],
    "textiles": [
      {
        "name": "Kente",
        "origin": "Ghana - Ashanti Kingdom",
        "significance": "Royal cloth symbolizing wisdom and wealth",
        "patterns": {
          "adinkra_symbols": "Philosophical concepts in visual form",
          "color_meanings": {
            "gold": "royalty and spiritual purity",
            "green": "vegetation and renewal",
            "red": "bloodshed of ancestors"
          }
        },
        "modern_adaptations": [
          "Kente-inspired prints on modern silhouettes",
          "Accessories featuring traditional patterns",
          "Fusion wear honoring original significance"
        ],
        "cultural_guidelines": {
          "appropriate_use": "Wear with understanding and respect",
          "attribution": "Always acknowledge Ghanaian origins",
          "ceremonial_vs_daily": "Some patterns reserved for special occasions"
        }
      }
    ],
    "styling_guides": [
      {
        "occasion": "Professional",
        "recommendations": "Subtle Kente-inspired accessories",
        "cultural_balance": "Honor heritage while maintaining workplace appropriateness"
      }
    ]
  }
}
```

### User Profile

#### GET /user/profile
Get current user profile and preferences.

```http
GET /user/profile
Authorization: Bearer {jwt_token}
```

#### PUT /user/cultural-preferences
Update cultural preferences and style profile.

```http
PUT /user/cultural-preferences
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "cultural_heritage": ["Nigerian", "Brazilian"],
  "style_preferences": {
    "color_families": ["earth_tones", "jewel_tones"],
    "pattern_appreciation": ["geometric", "floral", "abstract"],
    "cultural_fusion_level": "high"
  },
  "privacy_settings": {
    "cultural_data_sharing": true,
    "personalization_level": "high",
    "trend_contribution": true
  }
}
```

### Sustainability

#### GET /sustainability/brands
Find sustainable and ethically-conscious fashion brands.

```http
GET /sustainability/brands?min_score=80&cultural_focus=true&region=global
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "brands": [
      {
        "brand_id": "brand_001",
        "name": "Heritage Threads Co.",
        "sustainability_score": 95,
        "cultural_authenticity": "verified",
        "certifications": ["Fair Trade", "Organic Cotton", "Cultural Heritage Certified"],
        "impact_metrics": {
          "carbon_footprint": "low",
          "water_usage": "minimal", 
          "community_support": "high",
          "cultural_preservation": "active"
        },
        "story": "Founded by diaspora designers preserving traditional techniques",
        "product_categories": ["Traditional Fusion", "Modern Heritage", "Sustainable Basics"]
      }
    ]
  }
}
```

## Error Handling

### Standard Error Format
```json
{
  "status": "error",
  "error": {
    "code": "CULTURAL_SENSITIVITY_VIOLATION",
    "message": "Request contains culturally inappropriate content",
    "details": {
      "violation_type": "inappropriate_cultural_reference",
      "suggestion": "Please review cultural guidelines and resubmit"
    },
    "timestamp": "2024-01-15T10:30:00Z",
    "request_id": "req_123456789"
  }
}
```

### Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| `AUTH_REQUIRED` | Authentication required | Provide valid JWT token |
| `CULTURAL_SENSITIVITY_VIOLATION` | Cultural content violation | Review cultural guidelines |
| `RATE_LIMIT_EXCEEDED` | Too many requests | Wait before next request |
| `INVALID_CULTURAL_CONTEXT` | Cultural context not recognized | Use supported cultural references |
| `SUSTAINABILITY_DATA_UNAVAILABLE` | Brand sustainability data missing | Try alternative brands |

## Rate Limits

| Endpoint Category | Limit | Window |
|-------------------|-------|--------|
| Authentication | 5 requests | 1 minute |
| Style Analysis | 50 requests | 1 hour |
| Discovery | 200 requests | 1 hour |
| Cultural Heritage | 100 requests | 1 hour |
| User Profile | 30 requests | 1 minute |

## SDKs & Libraries

### JavaScript/TypeScript
```bash
npm install @dara/sdk
```

```typescript
import { DaraClient } from '@dara/sdk';

const client = new DaraClient({
  apiKey: process.env.DARA_API_KEY,
  culturalSensitivity: 'high'
});

const analysis = await client.style.analyze({
  text: "I need an outfit for a cultural celebration",
  culturalContext: "Nigerian heritage",
  occasionType: "formal"
});
```

### Python
```bash
pip install dara-python-sdk
```

```python
from dara import DaraClient

client = DaraClient(
    api_key=os.getenv('DARA_API_KEY'),
    cultural_sensitivity='high'
)

analysis = client.style.analyze(
    text="Looking for traditional-modern fusion wear",
    cultural_context="Ghanaian heritage",
    occasion_type="celebration"
)
```

## Webhooks

### Style Analysis Complete
```json
{
  "event": "style.analysis.complete",
  "data": {
    "analysis_id": "analysis_123",
    "user_id": "user_456",
    "cultural_context": "west_african",
    "recommendations_count": 5,
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Cultural Trend Alert
```json
{
  "event": "cultural.trend.alert",
  "data": {
    "trend_id": "trend_789",
    "cultural_region": "african_diaspora",
    "significance_level": "high",
    "user_relevance_score": 92,
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## Cultural Guidelines

### API Usage Ethics
1. **Respect Cultural Origins**: Always attribute cultural influences
2. **Avoid Appropriation**: Understand the difference between appreciation and appropriation
3. **Community Benefit**: Support brands that benefit origin communities
4. **Educational Context**: Provide historical and cultural context
5. **User Consent**: Respect user privacy regarding cultural data

### Supported Cultural Contexts
- **African Heritage**: Traditional textiles, patterns, and styling
- **Caribbean Culture**: Island fashion influences and traditions
- **South Asian Fashion**: Traditional and modern fusion wear
- **Latin American Style**: Cultural celebrations and daily wear
- **Global Diaspora**: Cultural fusion and heritage preservation

---

**DARA API** - Connecting fashion with cultural appreciation and global accessibility.

*Building bridges between heritage and modern style.*
