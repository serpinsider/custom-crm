# Cleaning Business CRM

A modern, API-first CRM system built specifically for cleaning businesses. Features real-time scheduling, customer management, payment processing, and team coordination.

## Tech Stack

**Frontend**
- Next.js 14
- TypeScript
- Tailwind CSS
- React Query
- Radix UI

**Backend**
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- Clerk Authentication
- Stripe Payments

**Infrastructure**
- Vercel/Railway (recommended)
- PostgreSQL
- Redis (coming soon)

## Core Features

### Implemented
- [x] Customer Management
- [x] API-First Architecture
- [x] OpenAPI/Swagger Documentation
- [x] Database Schema
- [x] Authentication Framework

### In Development
- [ ] Team Management
- [ ] Real-time Scheduling
- [ ] Payment Processing
- [ ] Service Tracking
- [ ] Automated Notifications
- [ ] Analytics Dashboard
- [ ] Mobile App Support

## API Documentation

Our API is fully documented using OpenAPI/Swagger specifications. Access the interactive documentation:

- Local Development: `http://localhost:3000/docs`
- Production: `https://your-domain.com/docs`

Key API features:
- RESTful endpoints
- JWT authentication
- Rate limiting
- Comprehensive error handling
- Real-time webhooks

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm/yarn

### Local Development Setup

1. Clone the repository
```bash
git clone https://github.com/serpinsider/custom-crm.git
cd custom-crm
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/cleaning_crm
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

5. Run database migrations
```bash
npx prisma migrate dev
```

6. Start development server
```bash
npm run dev
```

## Project Structure

```
cleaning-crm/
├── src/
│   ├── app/              # Next.js 14 app directory
│   │   ├── api/         # API routes
│   │   └── (routes)/    # Frontend routes
│   ├── components/      # React components
│   ├── lib/            # Utility functions
│   └── types/          # TypeScript types
├── prisma/
│   └── schema.prisma   # Database schema
└── public/             # Static assets
```

## Development Workflow

### Database Changes
1. Modify `prisma/schema.prisma`
2. Run `npx prisma generate`
3. Run `npx prisma migrate dev`

### API Development
1. Create new route in `src/app/api`
2. Add OpenAPI documentation
3. Implement endpoint logic
4. Update tests

### Frontend Development
1. Create components in `src/components`
2. Add routes in `src/app`
3. Implement page logic
4. Add styling with Tailwind

## Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## Deployment

### Production Deployment
1. Push to main branch
2. Vercel automatically deploys
3. Migrations run automatically

### Manual Deployment
```bash
npm run build
npm run start
```

## Architecture

### Database Schema
- Customers
- Appointments
- Services
- Teams
- Invoices
- Subscriptions

### API Structure
- RESTful endpoints
- GraphQL support (coming soon)
- Webhooks for real-time updates
- Background jobs

### Security
- JWT authentication
- Role-based access control
- API rate limiting
- Input validation
- SQL injection protection

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## Support

- Documentation: `/docs`
- Issues: GitHub Issues
- Email: support@your-domain.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.