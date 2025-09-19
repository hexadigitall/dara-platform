"""
StyleAI Backend API - FastAPI Application
Main application entry point with API routing and middleware configuration.
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
import uvicorn
import os

from app.core.config import settings
from app.api import auth, style, recommendations, user, products
from app.core.database import engine, Base

# Create FastAPI application
app = FastAPI(
    title="StyleAI API",
    description="Conversational AI Fashion Platform API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security scheme
security = HTTPBearer()

# Include API routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(user.router, prefix="/api/v1/user", tags=["user"])
app.include_router(style.router, prefix="/api/v1/style", tags=["style"])
app.include_router(recommendations.router, prefix="/api/v1/recommendations", tags=["recommendations"])
app.include_router(products.router, prefix="/api/v1/products", tags=["products"])

@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "message": "StyleAI API is running",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    try:
        # TODO: Add database connection check
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": "2024-09-18T21:30:00Z"
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Service unhealthy: {str(e)}")

@app.on_event("startup")
async def startup_event():
    """Initialize application on startup"""
    print("🚀 Starting StyleAI API...")
    # TODO: Initialize database connections
    # TODO: Load AI models
    # TODO: Validate environment variables
    print("✅ StyleAI API started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on application shutdown"""
    print("🛑 Shutting down StyleAI API...")
    # TODO: Close database connections
    # TODO: Cleanup resources
    print("✅ StyleAI API shutdown complete")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True if os.getenv("ENV") == "development" else False
    )
