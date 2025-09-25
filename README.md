# SERAI Hotels - Boutique Hotel Booking Platform

> **SERAI** is a direct-booking marketplace designed for a new generation of boutique hotels, inns, and lodges—positioned as an OYO/Sonder-style "Airbnb" for markets where residential short-term rentals are heavily regulated.

## 🏨 Overview

SERAI targets cities where STR (Short-Term Rental) restrictions have opened the door for licensed hotel properties to reclaim market share—but with a modern, curated experience travelers now expect. Unlike Airbnb, we're not chasing quantity. We're curating quality—offering travelers an elevated stay with the warmth of boutique hospitality and the confidence of consistency.

### Key Differentiators

- **Dynamic pricing and revenue optimization** powered by AI
- **Compelling brand narrative** for each property
- **Integrated upsell tools** for experiences, services, and F&B
- **Frictionless, mobile-first booking UX**
- **Community-driven layer** that fosters trust, discovery, and repeat bookings

## 🚀 Quick Start

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
npm run dev:frontend    # Port 4000 - Owner Dashboard
npm run dev:backend     # Port 4001 - API Server
npm run dev:operations  # Port 4002 - Operations App
npm run dev:mobile      # Port 8082 - React Native App
```

## 🏗️ Architecture

### Core Applications

- **Owner Dashboard** (Next.js) - Property management, bookings, analytics
- **Customer App** (React Native) - Discovery, booking, trip management
- **Operations App** (React) - Task management, housekeeping, maintenance
- **Backend API** (Node.js/Express) - Core business logic and data management

### AI Agents & Automation

SERAI features 9 specialized AI agents for comprehensive automation:

1. **RevenueMax Agent** - Dynamic pricing and demand forecasting
2. **ListingBot** - SEO-friendly content generation
3. **Concierge Agent** - 24/7 guest assistance via chat
4. **Reputation Agent** - Review monitoring and response
5. **Housekeeping Agent** - Task assignment and photo auditing
6. **Check-In Agent** - OCR/ID verification and remote access
7. **Maintenance Sentinel** - Predictive maintenance and issue detection
8. **Upsell Agent** - Personalized add-on recommendations
9. **Insights AI** - Analytics and anomaly detection

## 🛠️ Tech Stack

### Frontend
- **React.js + Next.js** (Owner Dashboard)
- **React Native** (Customer App)
- **TailwindCSS** (Styling)
- **TypeScript** (Type Safety)

### Backend
- **Node.js + Express** (API Server)
- **PostgreSQL** (Primary Database)
- **Redis** (Caching & Sessions)
- **Prisma ORM** (Database Management)
- **Socket.io** (Real-time Features)

### AI & ML
- **OpenAI GPT-4** (LLM)
- **Pinecone/Weaviate** (Vector Database)
- **LangChain** (AI Orchestration)
- **Custom ML Models** (Pricing, Forecasting)

### Infrastructure
- **Docker + Kubernetes**
- **AWS/Railway** (Cloud Hosting)
- **Stripe** (Payments)
- **Twilio** (SMS/WhatsApp)

## 📁 Project Structure

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
│   └── ...                   # Other AI agents
├── docs/                     # Documentation
├── docker-compose.dev.yml    # Development Docker setup
└── development.config.json   # Development configuration
```

## 🔧 Development URLs

- **Frontend Dashboard**: http://localhost:4000
- **Backend API**: http://localhost:4001
- **Operations App**: http://localhost:4002
- **API Documentation**: http://localhost:4001/docs
- **Health Check**: http://localhost:4001/health

## 📚 Documentation

- [**Business Model**](./BUSINESS_MODEL.md) - Detailed business strategy and market positioning
- [**Development Setup**](./DEVELOPMENT_SETUP.md) - Comprehensive setup guide
- [**Tech Stack**](./TECH_STACK.md) - Complete technology architecture
- [**Project Specification**](./PROJECT_SPECIFICATION.md) - Development standards and guidelines

## 🔒 Private Project

This is a **private, proprietary project** for SERAI Hotels. This codebase is confidential and not available for public use, modification, or distribution.

**All Rights Reserved** - Unauthorized access, copying, or use is strictly prohibited.

## 📄 License

This is a **proprietary, confidential project**. All rights reserved. See the [LICENSE](LICENSE) file for details.

## 🆘 Internal Support

For development issues (internal team only):
1. Check the [Development Setup Guide](./DEVELOPMENT_SETUP.md)
2. Review error logs: `npm run logs`
3. Check service health: `npm run health`
4. Contact the development team directly

## 🎯 Roadmap

- [ ] **Phase 1**: Core booking platform and owner dashboard
- [ ] **Phase 2**: AI agent implementation and automation
- [ ] **Phase 3**: Mobile app and advanced features
- [ ] **Phase 4**: OTA integrations and scaling

## 🔗 Internal Links

- **Website**: [Coming Soon]
- **Documentation**: [Internal Wiki](https://github.com/Ben100mm/Ben100mm-serai-hotels/wiki)
- **Issues**: [Internal Issues](https://github.com/Ben100mm/Ben100mm-serai-hotels/issues) (Team access only)

---

**SERAI** - *Boutique Hotel Booking Reinvented* 🏨✨
