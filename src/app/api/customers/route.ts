import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     description: Retrieve a paginated list of customers with optional search
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering customers
 *     responses:
 *       200:
 *         description: List of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *                 total:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const where: Prisma.CustomerWhereInput = {
      OR: search ? [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ] : undefined,
    };

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.customer.count({ where }),
    ]);

    return NextResponse.json({
      customers,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('[CUSTOMERS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     description: Create a new customer with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - address
 *               - city
 *               - state
 *               - zipCode
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               preferredDays:
 *                 type: array
 *                 items:
 *                   type: string
 *               preferredTime:
 *                 type: string
 *               specialNotes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      email,
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zipCode,
      preferredDays,
      preferredTime,
      specialNotes,
    } = body;

    if (!email || !firstName || !lastName || !address || !city || !state || !zipCode) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const existingCustomer = await prisma.customer.findUnique({
      where: { email },
    });

    if (existingCustomer) {
      return new NextResponse("Customer with this email already exists", { status: 400 });
    }

    const customer = await prisma.customer.create({
      data: {
        email,
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        zipCode,
        preferredDays,
        preferredTime,
        specialNotes,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error('[CUSTOMERS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}