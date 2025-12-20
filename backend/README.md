# CareerCove Backend API

Complete backend system for CareerCove career guidance platform.

## Features
- User authentication (JWT)
- Secure password hashing (Argon2)
- Rate limiting
- Input validation
- PostgreSQL database
- RESTful API endpoints

## Setup

1. Install PostgreSQL
2. Create database: `createdb careercove_db`
3. Run schema: `psql -d careercove_db -f database/schema.sql`
4. Copy `.env.example` to `.env` and configure
5. Install dependencies: `npm install`
6. Start server: `npm run dev`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/refresh` - Refresh access token
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/profile` - Get user profile (protected)

## Environment Variables
See `.env.example` for required configuration.
\`\`\`

\`\`\`text file="backend/.env.example"
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/careercove_db

# JWT Secrets (Generate long random strings)
JWT_SECRET=your-super-secret-jwt-key-change-this-to-something-very-secure-and-random
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-to-something-very-secure-and-random

# JWT Expiration
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS Origins (comma-separated)
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
