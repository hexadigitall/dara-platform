# StyleAI - System Architecture & Technical Design

## Architecture Overview

StyleAI follows a microservices architecture pattern deployed on cloud infrastructure with AI/ML services for fashion intelligence, real-time retailer integrations, and scalable user experience delivery.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                           Frontend Layer                        │
├─────────────────────────────────────────────────────────────────┤
│  Web App (React/Next.js)  │  Mobile App (React Native)         │
│  - Style Input Interface  │  - Camera Integration              │
│  - Product Visualization  │  - Push Notifications              │
│  - User Dashboard         │  - Offline Capability              │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API Gateway (AWS ALB)                    │
│  - Request Routing       │  - Rate Limiting                    │
│  - Authentication        │  - SSL Termination                  │
│  - Load Balancing        │  - API Versioning                  │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Microservices Layer                     │
├─────────────────────────────────────────────────────────────────┤
│  User Service     │  Style Service    │  Recommendation Service │
│  - Authentication│  - NLP Processing │  - ML Algorithms        │
│  - Profile Mgmt  │  - Style Analysis │  - Product Matching     │
│  - Preferences   │  - Context Extract│  - Outfit Generation    │
├─────────────────────────────────────────────────────────────────┤
│  Product Service  │  Retailer Service │  Payment Service        │
│  - Catalog Mgmt  │  - API Integration│  - Stripe Integration   │
│  - Inventory Sync│  - Data Transform │  - Transaction Handling │
│  - Search Engine │  - Rate Limiting  │  - Refund Processing    │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                          Data Layer                             │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL       │  MongoDB          │  Redis Cache            │
│  - User Data      │  - Product Catalog│  - Session Data         │
│  - Transactions   │  - Style Metadata │  - API Responses        │
│  - Analytics      │  - Content Data   │  - Real-time Data       │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                         External Services                       │
├─────────────────────────────────────────────────────────────────┤
│  AI/ML Services   │  Retailer APIs    │  Third-party Services   │
│  - OpenAI GPT-4   │  - Shopify API    │  - SendGrid (Email)     │
│  - Custom Models  │  - WooCommerce    │  - Mixpanel (Analytics) │
│  - Computer Vision│  - Custom APIs    │  - New Relic (Monitor)  │
└─────────────────────────────────────────────────────────────────┘
```

## Core Services Architecture

### 1. User Service
**Technology:** Python FastAPI + PostgreSQL
**Responsibilities:**
- User authentication and authorization (JWT)
- Profile management and preferences
- Account settings and privacy controls
- User activity tracking

**Key Endpoints:**
```
POST /auth/register
POST /auth/login
GET /user/profile
PUT /user/preferences
GET /user/history
```

**Database Schema:**
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User Profiles
CREATE TABLE user_profiles (
    user_id UUID REFERENCES users(id),
    display_name VARCHAR(100),
    age_range VARCHAR(20),
    body_type VARCHAR(50),
    style_preferences JSONB,
    size_preferences JSONB
);

-- User Activity
CREATE TABLE user_activities (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    activity_type VARCHAR(50),
    activity_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Style Service
**Technology:** Python FastAPI + OpenAI GPT-4
**Responsibilities:**
- Natural language processing of style descriptions
- Style categorization and intent extraction
- Context analysis (occasion, weather, mood)
- Fashion trend integration

**Key Components:**
```python
class StyleProcessor:
    def __init__(self):
        self.gpt_client = OpenAI()
        self.fashion_vocabulary = FashionVocabulary()
        
    async def process_style_input(self, text: str, user_context: dict):
        # Preprocess input
        cleaned_text = self.preprocess_text(text)
        
        # Extract style intent using GPT-4
        style_intent = await self.extract_style_intent(cleaned_text)
        
        # Add user context
        contextualized_intent = self.add_user_context(
            style_intent, user_context
        )
        
        return StyleAnalysis(
            original_text=text,
            style_categories=style_intent.categories,
            occasion=style_intent.occasion,
            preferences=contextualized_intent.preferences,
            confidence=style_intent.confidence
        )
```

### 3. Recommendation Service
**Technology:** Python FastAPI + TensorFlow + PostgreSQL
**Responsibilities:**
- ML-powered product recommendations
- Outfit combination generation
- Personalization algorithms
- A/B testing framework

**Machine Learning Pipeline:**
```python
class RecommendationEngine:
    def __init__(self):
        self.collaborative_filter = CollaborativeFilterModel()
        self.content_filter = ContentBasedModel()
        self.outfit_generator = OutfitCombinationModel()
        
    async def generate_recommendations(
        self, 
        style_analysis: StyleAnalysis,
        user_profile: UserProfile,
        product_catalog: ProductCatalog
    ):
        # Get candidate products using content filtering
        content_candidates = self.content_filter.predict(
            style_analysis, product_catalog
        )
        
        # Refine using collaborative filtering
        collaborative_scores = self.collaborative_filter.predict(
            user_profile, content_candidates
        )
        
        # Generate outfit combinations
        outfits = self.outfit_generator.generate_outfits(
            collaborative_scores, constraints=style_analysis.constraints
        )
        
        return RecommendationResponse(
            outfits=outfits,
            individual_items=collaborative_scores.top_k(20),
            confidence_scores=collaborative_scores.confidence
        )
```

### 4. Product Service  
**Technology:** Python FastAPI + MongoDB + Elasticsearch
**Responsibilities:**
- Product catalog management
- Search and filtering capabilities
- Inventory synchronization
- Price tracking and updates

**Data Models:**
```python
class Product(BaseModel):
    id: str
    retailer_id: str
    name: str
    brand: str
    category: str
    subcategory: str
    price: float
    original_price: Optional[float]
    currency: str
    sizes: List[str]
    colors: List[str]
    images: List[str]
    description: str
    tags: List[str]
    availability: bool
    last_updated: datetime
    
class ProductCatalog:
    def __init__(self):
        self.mongodb = AsyncIOMotorClient()
        self.elasticsearch = AsyncElasticsearch()
    
    async def search_products(
        self,
        query: str,
        filters: Dict,
        limit: int = 50
    ) -> List[Product]:
        # Elasticsearch query with filters
        es_query = {
            "query": {
                "bool": {
                    "must": [
                        {"match": {"description": query}},
                        {"terms": {"category": filters.get("categories", [])}}
                    ],
                    "filter": [
                        {"range": {"price": {
                            "gte": filters.get("min_price", 0),
                            "lte": filters.get("max_price", 10000)
                        }}}
                    ]
                }
            }
        }
        
        results = await self.elasticsearch.search(
            index="products",
            body=es_query,
            size=limit
        )
        
        return [Product(**hit["_source"]) for hit in results["hits"]["hits"]]
```

### 5. Retailer Integration Service
**Technology:** Python FastAPI + Celery + Redis
**Responsibilities:**
- Multi-retailer API integrations
- Real-time inventory synchronization
- Price monitoring and updates
- Order tracking coordination

**Integration Architecture:**
```python
class RetailerIntegrationManager:
    def __init__(self):
        self.integrations = {
            'shopify': ShopifyIntegration(),
            'woocommerce': WooCommerceIntegration(),
            'custom': CustomAPIIntegration()
        }
        
    async def sync_inventory(self, retailer_id: str):
        integration = self.integrations.get(retailer_id)
        if not integration:
            raise ValueError(f"Unknown retailer: {retailer_id}")
            
        # Fetch products from retailer API
        products = await integration.fetch_products()
        
        # Transform to our schema
        standardized_products = [
            self.standardize_product(product, retailer_id)
            for product in products
        ]
        
        # Update product catalog
        await self.product_service.bulk_update(standardized_products)
        
    def standardize_product(self, product: dict, retailer_id: str) -> Product:
        """Convert retailer-specific product format to our standard schema"""
        return Product(
            id=f"{retailer_id}_{product['id']}",
            retailer_id=retailer_id,
            name=product.get('name', ''),
            brand=product.get('brand', ''),
            price=float(product.get('price', 0)),
            # ... field mapping logic
        )
```

## Database Design

### PostgreSQL Schema (User Data)
```sql
-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    display_name VARCHAR(100),
    age_range age_range_enum,
    body_type body_type_enum,
    location VARCHAR(100),
    style_preferences JSONB,
    size_preferences JSONB,
    budget_range JSONB
);

-- Style Requests History
CREATE TABLE style_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    request_text TEXT NOT NULL,
    style_analysis JSONB,
    recommendations JSONB,
    user_feedback INTEGER, -- 1-5 rating
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Interactions
CREATE TABLE user_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    product_id VARCHAR(100),
    interaction_type interaction_type_enum,
    interaction_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Custom Types
CREATE TYPE age_range_enum AS ENUM ('18-24', '25-34', '35-44', '45-54', '55+');
CREATE TYPE body_type_enum AS ENUM ('petite', 'average', 'tall', 'plus');
CREATE TYPE interaction_type_enum AS ENUM ('view', 'like', 'dislike', 'purchase_intent', 'share');
```

### MongoDB Schema (Product Catalog)
```javascript
// Products Collection
{
  _id: ObjectId,
  product_id: String, // retailer_id + product_id
  retailer_id: String,
  name: String,
  brand: String,
  category: String,
  subcategory: String,
  price: Number,
  original_price: Number,
  currency: String,
  sizes: [String],
  colors: [String],
  images: [String],
  description: String,
  style_tags: [String],
  occasion_tags: [String],
  season_tags: [String],
  availability: Boolean,
  stock_quantity: Number,
  last_synced: ISODate,
  created_at: ISODate,
  updated_at: ISODate,
  
  // Search optimization
  search_text: String, // concatenated searchable fields
  
  // ML features
  style_vector: [Number], // computed style embedding
  similarity_scores: {
    product_id: Number // precomputed similarity scores
  }
}

// Product Categories Collection
{
  _id: ObjectId,
  category_id: String,
  name: String,
  parent_category: String,
  style_attributes: [String],
  size_standards: Object,
  created_at: ISODate
}
```

## API Design

### RESTful API Structure
**Base URL:** `https://api.styleai.com/v1`

### Authentication
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "display_name": "Jane Doe"
}

Response: 201 Created
{
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "expires_in": 3600
}
```

### Style Analysis
```http
POST /style/analyze
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "text": "I need something chic and professional for client meetings",
  "context": {
    "occasion": "business",
    "budget_range": [50, 200],
    "preferred_colors": ["navy", "black", "gray"]
  }
}

Response: 200 OK
{
  "request_id": "req_123456",
  "style_analysis": {
    "categories": ["professional", "chic", "business-casual"],
    "occasion": "business_meeting",
    "formality_level": "business_professional",
    "style_confidence": 0.92
  },
  "processing_time_ms": 1250
}
```

### Recommendations
```http
POST /recommendations/generate
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "request_id": "req_123456",
  "limit": 10,
  "filters": {
    "price_range": [50, 200],
    "sizes": ["M", "L"],
    "retailers": ["zara", "nordstrom"]
  }
}

Response: 200 OK
{
  "outfits": [
    {
      "outfit_id": "outfit_001",
      "items": [
        {
          "product_id": "zara_12345",
          "name": "Tailored Blazer",
          "brand": "Zara",
          "price": 89.99,
          "image_url": "https://cdn.styleai.com/products/zara_12345_main.jpg",
          "retailer_url": "https://zara.com/product/12345"
        }
      ],
      "total_price": 245.97,
      "style_match_score": 0.94
    }
  ],
  "total_results": 8,
  "processing_time_ms": 850
}
```

## Security Architecture

### Authentication & Authorization
- **JWT Token-based Authentication**
- **OAuth 2.0** integration for social login
- **Role-based Access Control** (RBAC)
- **API Rate Limiting** (100 requests/minute per user)

### Data Protection
- **Encryption at Rest** (AES-256)
- **TLS 1.3** for data in transit
- **PCI DSS Compliance** for payment data
- **GDPR Compliance** for user privacy

### Infrastructure Security
- **VPC** with private subnets for databases
- **WAF** (Web Application Firewall)
- **DDoS Protection** via Cloudflare
- **Secrets Management** via AWS Secrets Manager

## Scalability & Performance

### Horizontal Scaling
- **Microservices** can scale independently
- **Load Balancers** distribute traffic
- **Auto-scaling Groups** based on metrics
- **Database Sharding** for large datasets

### Caching Strategy
- **Redis** for session and API response caching
- **CDN** (Cloudflare) for static assets and images
- **Database Query Optimization** with proper indexing
- **Computed Embeddings** cached for ML operations

### Performance Targets
- **API Response Time:** < 200ms (95th percentile)
- **Style Analysis:** < 3 seconds
- **Page Load Time:** < 1.5 seconds
- **Uptime SLA:** 99.9%

## Monitoring & Observability

### Application Monitoring
- **New Relic** for APM and infrastructure monitoring
- **Sentry** for error tracking and performance monitoring
- **Custom Metrics** for business KPIs

### Logging Strategy
- **Structured Logging** (JSON format)
- **Centralized Log Aggregation** (ELK Stack)
- **Log Retention:** 90 days for application logs

### Health Checks
- **Service Health Endpoints** (`/health`)
- **Database Connection Monitoring**
- **External API Dependency Checks**
- **Automated Alerting** via PagerDuty

## Deployment Architecture

### Cloud Infrastructure (AWS)
- **ECS** for containerized services
- **RDS** for PostgreSQL databases
- **DocumentDB** for MongoDB compatibility
- **ElastiCache** for Redis
- **S3** for static asset storage
- **CloudFront** for CDN

### CI/CD Pipeline
- **GitHub Actions** for automated testing
- **Docker** for containerization
- **Blue-Green Deployment** for zero-downtime updates
- **Automated Testing** (unit, integration, e2e)

### Environment Strategy
- **Development:** Local Docker Compose
- **Staging:** AWS with production-like setup
- **Production:** Multi-AZ deployment with failover

This architecture provides a solid foundation for StyleAI's scalable, secure, and maintainable fashion AI platform.
