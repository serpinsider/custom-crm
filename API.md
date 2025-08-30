# Cleaning CRM API Documentation

## Overview

This document provides detailed documentation for the Cleaning CRM API. The API follows REST principles and uses JSON for request and response bodies.

## Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

All API endpoints (except public routes) require authentication via Clerk. Include the authentication token in the request header:

```http
Authorization: Bearer <your_token>
```

## Error Handling

The API uses conventional HTTP response codes:
- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message here"
}
```

## Rate Limiting

TBD - Will implement rate limiting based on usage patterns

## Endpoints

### Customers

#### List Customers
```http
GET /customers
```

Query Parameters:
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Items per page
- `search` (optional): Search term for name/email
- `sort` (optional, default: "createdAt:desc"): Sort field and direction

Response:
```json
{
  "customers": [
    {
      "id": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "phone": "string?",
      "address": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "stripeCustomerId": "string?",
      "preferredDays": ["string"],
      "preferredTime": "string?",
      "specialNotes": "string?",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  ],
  "total": "number",
  "pages": "number"
}
```

#### Create Customer
```http
POST /customers
```

Request Body:
```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "phone": "string?",
  "address": "string",
  "city": "string",
  "state": "string",
  "zipCode": "string",
  "preferredDays": ["string"],
  "preferredTime": "string?",
  "specialNotes": "string?"
}
```

#### Get Customer
```http
GET /customers/:id
```

Response includes customer details with related appointments, subscriptions, and invoices.

#### Update Customer
```http
PATCH /customers/:id
```

Request Body: Same as Create Customer (all fields optional)

#### Delete Customer
```http
DELETE /customers/:id
```

### Appointments

#### List Appointments
```http
GET /appointments
```

Query Parameters:
- `page` (optional, default: 1)
- `limit` (optional, default: 10)
- `status` (optional): SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW
- `from` (optional): Start date
- `to` (optional): End date
- `customerId` (optional): Filter by customer

Response:
```json
{
  "appointments": [
    {
      "id": "string",
      "customerId": "string",
      "scheduledDate": "datetime",
      "duration": "number",
      "status": "string",
      "totalPrice": "number",
      "notes": "string?",
      "completedAt": "datetime?",
      "completionNotes": "string?",
      "beforePhotos": ["string"],
      "afterPhotos": ["string"],
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "customer": {
        // Customer details
      },
      "services": [
        {
          "id": "string",
          "name": "string",
          "quantity": "number",
          "price": "number"
        }
      ]
    }
  ],
  "total": "number",
  "pages": "number"
}
```

[Additional endpoint documentation will be added as we implement them]

## Webhooks

### Stripe Webhooks
```http
POST /webhooks/stripe
```
Handles:
- Payment success/failure
- Subscription updates
- Invoice events

### Future Integrations

We plan to add webhooks for:
- Calendar integrations
- SMS notifications
- Team communication platforms

## Data Models

### Customer
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
  
  // Relations
  appointments: Appointment[];
  subscriptions: Subscription[];
  invoices: Invoice[];
}
```

[Additional models will be documented as we implement them]

## Changes & Updates

### Version 0.1.0 (Current)
- Initial API setup
- Customer management endpoints
- Basic authentication
- Database schema design

### Planned Updates
- Appointment management
- Service tracking
- Payment processing
- Team management
- Analytics endpoints

## Support

For API support:
- Email: api-support@your-domain.com
- Documentation: https://your-domain.com/docs
- Status: https://status.your-domain.com
