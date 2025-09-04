# SERAI Development Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Docker and Docker Compose
- Git

### 1. Clone and Setup
```bash
git clone https://github.com/Ben100mm/Ben100mm-serai-hotels.git
cd Ben100mm-serai-hotels
npm install
```

### 2. Environment Configuration
```bash
cp env.example .env
# Edit .env with your actual API keys and configuration
```

### 3. Start Development Environment
```bash
# Start databases and services
npm run setup:db

# Start all applications
npm run dev

# Or start individual services
npm run dev:frontend    # Port 4000
npm run dev:backend     # Port 4001
npm run dev:operations  # Port 4002
npm run dev:mobile      # Port 8082
npm run dev:webhook     # Port 4003
```

## Port Configuration

### Main Application Ports (Avoiding Dreamery Project Conflicts)
- **Frontend (Next.js)**: `4000`
- **Backend API**: `4001`
- **Operations App**: `4002`
- **Stripe Webhooks**: `4003`
- **React Native Metro**: `8082`

### Database Ports
- **PostgreSQL**: `5433` (avoiding default 5432)
- **Redis**: `6380` (avoiding default 6379)
- **Elasticsearch**: `9201` (avoiding default 9200)

### AI Agent Ports
- **Concierge Agent**: `4004`
- **Revenue Agent**: `4005`
- **Reputation Agent**: `4006`
- **Housekeeping Agent**: `4007`
- **Check-In Agent**: `4008`
- **Maintenance Agent**: `4009`
- **Upsell Agent**: `4010`
- **Insights Agent**: `4011`
- **Listing Bot**: `4012`

## Development URLs

- **Frontend Dashboard**: http://localhost:4000
- **Backend API**: http://localhost:4001
- **Operations App**: http://localhost:4002
- **API Documentation**: http://localhost:4001/docs
- **Health Check**: http://localhost:4001/health

## Available Scripts

### Development
```bash
npm run dev                    # Start all services
npm run dev:frontend          # Start frontend only
npm run dev:backend           # Start backend only
npm run dev:operations        # Start operations app only
npm run dev:mobile            # Start React Native metro
npm run dev:ai-agents         # Start all AI agents
```

### Database
```bash
npm run setup:db              # Start databases with Docker
npm run migrate:db            # Run database migrations
npm run seed:db               # Seed database with test data
npm run reset:db              # Reset database
npm run backup:db             # Backup database
```

### Testing
```bash
npm test                      # Run all tests
npm run test:frontend         # Test frontend
npm run test:backend          # Test backend
npm run test:operations       # Test operations app
npm run test:ai-agents        # Test AI agents
```

### Building
```bash
npm run build                 # Build all applications
npm run build:frontend        # Build frontend
npm run build:backend         # Build backend
npm run build:operations      # Build operations app
```

### Docker
```bash
npm run docker:up             # Start all services with Docker
npm run docker:down           # Stop all services
npm run docker:logs           # View logs
npm run docker:build          # Build Docker images
npm run docker:restart        # Restart all services
```

### Maintenance
```bash
npm run clean                 # Clean build artifacts
npm run lint                  # Lint all code
npm run health                # Check service health
npm run logs                  # View application logs
```

## Project Structure

```
serai-hotels/
├── frontend/                 # Next.js Owner Dashboard
├── backend/                  # Node.js/Express API
├── operations/               # Operations Management App
├── mobile/                   # React Native Customer App
├── webhooks/                 # Stripe Webhook Handler
├── ai-agents/                # AI Agent Services
│   ├── concierge/            # Concierge Agent
│   ├── revenue/              # RevenueMax Agent
│   ├── reputation/           # Reputation Agent
│   ├── housekeeping/         # Housekeeping Agent
│   ├── checkin/              # Check-In Agent
│   ├── maintenance/          # Maintenance Sentinel
│   ├── upsell/               # Upsell Agent
│   ├── insights/             # Insights AI
│   └── listing/              # Listing Bot
├── database/                 # Database schemas and migrations
├── docs/                     # Documentation
├── scripts/                  # Utility scripts
├── docker-compose.dev.yml    # Development Docker setup
├── development.config.json   # Development configuration
├── env.example              # Environment variables template
└── package.json             # Root package.json with scripts
```

## Environment Variables

Copy `env.example` to `.env` and configure:

### Required Variables
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing secret
- `STRIPE_SECRET_KEY` - Stripe API key
- `OPENAI_API_KEY` - OpenAI API key

### Optional Variables
- `GOOGLE_MAPS_API_KEY` - For maps integration
- `TWILIO_ACCOUNT_SID` - For SMS/WhatsApp
- `FIREBASE_PROJECT_ID` - For push notifications
- `SENTRY_DSN` - For error tracking

## Database Setup

### Using Docker (Recommended)
```bash
npm run setup:db
npm run migrate:db
npm run seed:db
```

### Manual Setup
1. Install PostgreSQL 15+
2. Create database: `serai_dev`
3. Update `DATABASE_URL` in `.env`
4. Run migrations: `npm run migrate:db`

## AI Agents Setup

### Prerequisites
- OpenAI API key
- Vector database (Pinecone or Weaviate)
- Required environment variables

### Start AI Agents
```bash
npm run dev:ai-agents
```

### Individual Agents
```bash
npm run dev:concierge     # Port 4004
npm run dev:revenue       # Port 4005
npm run dev:reputation    # Port 4006
# ... etc
```

## Troubleshooting

### Port Conflicts
If you encounter port conflicts:
1. Check `development.config.json` for port assignments
2. Ensure no other services are using the same ports
3. Update ports in `.env` if needed

### Database Issues
```bash
# Reset database
npm run reset:db

# Check database status
docker-compose -f docker-compose.dev.yml ps postgres

# View database logs
docker-compose -f docker-compose.dev.yml logs postgres
```

### Service Health
```bash
# Check all services
npm run health

# Check individual services
curl http://localhost:4001/health
curl http://localhost:4000
curl http://localhost:4002
```

### Common Issues
1. **Port already in use**: Check if another service is running on the same port
2. **Database connection failed**: Ensure PostgreSQL is running and credentials are correct
3. **AI agents not responding**: Check API keys and network connectivity
4. **Build failures**: Run `npm run clean` and reinstall dependencies

## Development Workflow

1. **Start development environment**: `npm run dev`
2. **Make changes** to your code
3. **Run tests**: `npm test`
4. **Check linting**: `npm run lint`
5. **Commit changes**: `git add . && git commit -m "Your message"`
6. **Push to repository**: `git push origin main`

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run tests and linting: `npm test && npm run lint`
4. Commit your changes: `git commit -m "Add your feature"`
5. Push to your branch: `git push origin feature/your-feature`
6. Create a pull request

## Support

For development issues:
1. Check this documentation
2. Review error logs: `npm run logs`
3. Check service health: `npm run health`
4. Create an issue in the repository
