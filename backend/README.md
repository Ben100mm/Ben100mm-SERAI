# SERAI Backend API

The backend API server for SERAI - Boutique Hotel Booking Platform.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **Prisma** - Database ORM
- **Redis** - Caching and sessions
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Zod** - Data validation

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- PostgreSQL 15+
- Redis 7+
- Docker (optional)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. Set up the database:
   ```bash
   npm run setup:db    # Start PostgreSQL and Redis with Docker
   npm run migrate     # Run database migrations
   npm run seed        # Seed with test data
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:4001`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with test data
- `npm run studio` - Open Prisma Studio

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Properties
- `GET /api/properties` - List properties
- `POST /api/properties` - Create property
- `GET /api/properties/:id` - Get property details
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Bookings
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Search
- `GET /api/search` - Search properties
- `GET /api/search/suggestions` - Search suggestions

### Management
- `GET /api/management/dashboard` - Dashboard data
- `GET /api/management/analytics` - Analytics data
- `POST /api/management/tasks` - Create task
- `PUT /api/management/tasks/:id` - Update task status

## Database Schema

The database uses Prisma ORM with the following main entities:

- **User** - User accounts and profiles
- **Property** - Hotel properties and listings
- **Booking** - Reservations and bookings
- **Review** - Guest reviews and ratings
- **Task** - Operational tasks and assignments
- **Notification** - System notifications

## Authentication

The API uses JWT-based authentication with refresh tokens:

1. User logs in with email/password
2. Server returns access token (short-lived) and refresh token (long-lived)
3. Client uses access token for API requests
4. When access token expires, client uses refresh token to get new access token

## Real-time Features

Socket.io is used for real-time features:

- **Booking Updates** - Real-time booking notifications
- **Task Management** - Live task status updates
- **Chat** - Guest-host communication
- **Analytics** - Live dashboard updates

## Error Handling

The API uses a centralized error handling middleware that:

- Logs errors for debugging
- Returns consistent error responses
- Handles validation errors from Zod
- Provides appropriate HTTP status codes

## Rate Limiting

API endpoints are protected with rate limiting:

- Authentication endpoints: 5 requests per minute
- General API endpoints: 100 requests per minute
- File upload endpoints: 10 requests per minute

## Webhooks

The API handles webhooks from external services:

- **Stripe** - Payment processing events
- **Twilio** - SMS/WhatsApp events
- **OTA APIs** - Booking synchronization

## Development Guidelines

- Follow the project's TypeScript configuration
- Use Prisma for all database operations
- Validate all inputs with Zod schemas
- Write tests for new endpoints
- Use proper HTTP status codes
- Follow REST API conventions

## Environment Variables

Required environment variables (see `env.example`):

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5433/serai_dev

# Redis
REDIS_URL=redis://localhost:6380

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# External APIs
OPENAI_API_KEY=sk-...
TWILIO_ACCOUNT_SID=AC...
```

## Testing

Run the test suite:

```bash
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

## Deployment

The backend can be deployed using Docker:

```bash
# Build Docker image
docker build -t serai-backend .

# Run container
docker run -p 4001:4001 --env-file .env serai-backend
```

## Monitoring

The API includes health check endpoints:

- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system status
- `GET /metrics` - Application metrics (if enabled)
