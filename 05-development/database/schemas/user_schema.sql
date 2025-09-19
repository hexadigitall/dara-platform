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
