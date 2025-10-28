# CareerCove Backend API

A secure, production-ready backend system for CareerCove with user authentication, JWT tokens, and PostgreSQL database.

## 🚀 Tech Stack

- **Node.js** (v18+) - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** (v13+) - Database (with connection pooling)
- **JWT** - Authentication (access + refresh tokens)
- **Argon2** - Password hashing (more secure than bcrypt)
- **Helmet** - Security middleware
- **Rate limiting** - Brute-force protection
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

\`\`\`
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection configuration
│   ├── controllers/
│   │   └── authController.js    # Authentication logic
│   ├── middleware/
│   │   ├── auth.js              # JWT verification middleware
│   │   ├── rateLimiter.js       # Rate limiting middleware
│   │   ├── security.js          # Security middleware (Helmet, XSS)
│   │   └── validator.js         # Input validation middleware
│   ├── models/
│   │   └── userModel.js         # User database model
│   ├── routes/
│   │   └── authRoutes.js        # Authentication routes
│   ├── utils/
│   │   ├── tokenUtils.js        # JWT token utilities
│   │   └── errorHandler.js      # Centralized error handling
│   └── server.js                # Main application entry point
├── database/
│   └── schema.sql               # Database schema
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore file
└── package.json                 # Dependencies
\`\`\`

## 🔧 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher - uses built-in gen_random_uuid())
- npm, pnpm, or yarn

## 📦 Installation

1. **Clone and navigate to backend directory:**
   \`\`\`bash
   cd backend
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up PostgreSQL database:**
   \`\`\`bash
   # Create database
   createdb careercove_db
   
   # Run schema
   psql -d careercove_db -f database/schema.sql
   \`\`\`

4. **Configure environment variables:**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

5. **Start the server:**
   \`\`\`bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   \`\`\`

## 🔐 Environment Variables

Create a `.env` file in the backend root directory:

\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=careercove_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_ACCESS_SECRET=your_super_secret_access_token_key_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_min_32_chars
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
\`\`\`

**⚠️ Security Notes:**
- Generate strong, random secrets for JWT tokens (min 32 characters)
- Never commit `.env` to version control
- Use different secrets for development and production
- Rotate secrets regularly in production

## 📡 API Endpoints

### Authentication Endpoints

#### 1. **User Signup**
\`\`\`http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}
\`\`\`

**Response (201 Created):**
\`\`\`json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1...",
    "refreshToken": "eyJhbGciOiJIUzI1..."
  }
}
\`\`\`

#### 2. **User Login**
\`\`\`http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1...",
    "refreshToken": "eyJhbGciOiJIUzI1..."
  }
}
\`\`\`

#### 3. **Get User Profile (Protected)**
\`\`\`http
GET /api/auth/profile
Authorization: Bearer {accessToken}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe",
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
\`\`\`

#### 4. **Refresh Access Token**
\`\`\`http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1..."
}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1..."
  }
}
\`\`\`

#### 5. **Logout**
\`\`\`http
POST /api/auth/logout
Authorization: Bearer {accessToken}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "message": "Logout successful"
}
\`\`\`

## 🔒 Security Features

### 1. **Password Security**
- Argon2 hashing algorithm (winner of Password Hashing Competition)
- Automatic salt generation
- Memory-hard function resistant to GPU attacks

### 2. **JWT Authentication**
- Dual-token system (access + refresh)
- Short-lived access tokens (15 minutes)
- Long-lived refresh tokens (7 days)
- Secure token storage recommendations

### 3. **Rate Limiting**
- Prevents brute-force attacks
- Configurable limits per endpoint
- IP-based tracking

### 4. **Input Validation**
- Email format validation
- Password strength requirements (min 8 chars, uppercase, lowercase, number, special char)
- Username validation (alphanumeric + underscore)
- SQL injection prevention

### 5. **Security Headers**
- Helmet middleware for HTTP headers
- XSS protection
- Content Security Policy
- HTTPS enforcement (production)

### 6. **CORS Protection**
- Whitelist allowed origins
- Credential support
- Configurable methods

## 🗄️ Database Schema

The PostgreSQL schema includes:

### **Users Table**
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);
\`\`\`

### **Refresh Tokens Table**
\`\`\`sql
CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### **Future Expansion Tables** (Commented in schema.sql)
Ready to add:
- User profiles (bio, avatar, social links)
- Career quiz results
- Mentor sessions
- Resume data
- Reviews and ratings
- Notifications

## 🧪 Testing the API

### Using cURL:

**Signup:**
\`\`\`bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123!@#",
    "fullName": "Test User"
  }'
\`\`\`

**Login:**
\`\`\`bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#"
  }'
\`\`\`

**Get Profile:**
\`\`\`bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
\`\`\`

### Using Postman:
1. Import the endpoints from the API documentation
2. Set up environment variables for tokens
3. Test each endpoint with various inputs

## 📈 Scalability & Performance

### Current Optimizations:
- Connection pooling for database
- Efficient password hashing with Argon2
- Token-based stateless authentication
- Rate limiting to prevent abuse
- Prepared statements to prevent SQL injection

### Ready for Future Growth:
- **Horizontal scaling**: Stateless design allows multiple server instances
- **Caching layer**: Add Redis for session management
- **Database replication**: PostgreSQL supports read replicas
- **Microservices**: Modular structure easy to split
- **API versioning**: Structure supports /api/v1, /api/v2, etc.

## 🚀 Deployment Recommendations

### Production Checklist:
- [ ] Set `NODE_ENV=production`
- [ ] Use strong, unique JWT secrets
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure proper CORS origins
- [ ] Set up monitoring (PM2, New Relic, etc.)
- [ ] Enable database connection pooling
- [ ] Set up logging (Winston, Morgan)
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up CI/CD pipeline

### Recommended Hosting:
- **Backend**: Heroku, Railway, Render, or DigitalOcean
- **Database**: Heroku Postgres, Supabase, or Railway
- **Monitoring**: Sentry, LogRocket

## 🔄 Future Features (Easy to Add)

The architecture supports easy expansion:

1. **User Profiles**: Add profile photos, bio, skills
2. **Career Quiz**: Store quiz results and recommendations
3. **Mentor System**: Book sessions, reviews, ratings
4. **Resume Builder**: Store and manage resumes
5. **Messaging**: Real-time chat between users and mentors
6. **Notifications**: Email and in-app notifications
7. **Analytics**: Track user behavior and engagement
8. **Admin Panel**: Manage users, content, and reports

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

## 🐛 Troubleshooting

### Common Issues:

**Database Connection Failed:**
\`\`\`bash
# Check PostgreSQL is running
pg_isready

# Check connection details in .env
# Ensure database exists
psql -l
\`\`\`

**JWT Token Errors:**
\`\`\`bash
# Ensure JWT secrets are at least 32 characters
# Check token expiry settings
# Verify Authorization header format: "Bearer <token>"
\`\`\`

**Rate Limiting Issues:**
\`\`\`bash
# Adjust limits in .env
# Clear rate limit cache (restart server in development)
\`\`\`

## 📝 License

This backend is part of the CareerCove project.

## 👥 Support

For issues or questions, please contact the CareerCove development team.
