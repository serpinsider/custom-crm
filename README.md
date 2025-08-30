# 🧹 Cleaning Business CRM

A modern, API-first CRM system built specifically for cleaning businesses. Features real-time scheduling, customer management, payment processing, and team coordination.

## 🚀 Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** Clerk
- **Payments:** Stripe
- **Hosting:** TBD (Vercel/Railway recommended)

## 🌟 Features

- [x] Customer Management
- [x] API-First Architecture
- [ ] Team Management
- [ ] Real-time Scheduling
- [ ] Payment Processing
- [ ] Service Tracking
- [ ] Automated Notifications
- [ ] Analytics Dashboard
- [ ] Mobile App Support

## 📚 API Documentation

### Base URL
```
https://your-domain.com/api
```

### Authentication
All API endpoints (except public routes) require authentication using Clerk. Include the authentication token in the request header:

```http
Authorization: Bearer <your_token>
```

### Available Endpoints

#### Customers

```http
GET /api/customers
```
Get all customers with pagination
- Query params: 
  - page (default: 1)
  - limit (default: 10)
  - search (optional)
- Returns: { customers: Customer[], total: number, pages: number }

```http
POST /api/customers
```
Create a new customer
- Body: CustomerCreateInput
- Returns: Customer

```http
GET /api/customers/:id
```
Get customer by ID with related data
- Returns: Customer with appointments, subscriptions, and invoices

```http
PATCH /api/customers/:id
```
Update customer details
- Body: CustomerUpdateInput
- Returns: Customer

```http
DELETE /api/customers/:id
```
Delete customer (if no active subscriptions/appointments)
- Returns: 204 No Content

### Data Models

#### Customer
```typescript
interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  stripeCustomerId?: string;
  preferredDays: string[];
  preferredTime?: string;
  specialNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🗺️ Roadmap

### Phase 1 - Foundation (Current)
- [x] Project setup with Next.js
- [x] Database schema design
- [x] Initial API structure
- [ ] Authentication system
- [ ] Basic customer management UI

### Phase 2 - Core Features
- [ ] Scheduling system
- [ ] Team management
- [ ] Service tracking
- [ ] Basic reporting

### Phase 3 - Payments & Automation
- [ ] Stripe integration
- [ ] Automated notifications
- [ ] Invoice generation
- [ ] Subscription management

### Phase 4 - Advanced Features
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Custom reporting
- [ ] Integration marketplace

## 🛠️ Development

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Yarn/npm

### Setup
1. Clone the repository
```bash
git clone <repository-url>
cd cleaning-crm
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` with your credentials

4. Run database migrations
```bash
npx prisma migrate dev
```

5. Start development server
```bash
npm run dev
```

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/cleaning_crm
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## 📝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@your-domain.com or join our [Discord community](your-discord-link).