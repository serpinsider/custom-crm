import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const customer = await prisma.customer.findUnique({
      where: { id: params.customerId },
      include: {
        appointments: {
          include: {
            appointmentServices: {
              include: { service: true }
            }
          },
          orderBy: { scheduledDate: 'desc' }
        },
        subscriptions: {
          include: {
            subscriptionServices: {
              include: { service: true }
            }
          },
          where: { isActive: true }
        },
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    if (!customer) {
      return new NextResponse("Customer not found", { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('[CUSTOMER_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { customerId: string } }
) {
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

    // Basic validation
    if (!email || !firstName || !lastName || !address || !city || !state || !zipCode) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if email is being changed and if it's already in use
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        email,
        NOT: { id: params.customerId }
      }
    });

    if (existingCustomer) {
      return new NextResponse("Email already in use by another customer", { status: 400 });
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id: params.customerId },
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

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('[CUSTOMER_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: params.customerId },
      include: {
        appointments: true,
        subscriptions: true,
        invoices: true
      }
    });

    if (!customer) {
      return new NextResponse("Customer not found", { status: 404 });
    }

    // Check for active subscriptions or pending appointments
    const hasActiveSubscriptions = customer.subscriptions.some(sub => sub.isActive);
    const hasPendingAppointments = customer.appointments.some(
      apt => apt.status === 'SCHEDULED' || apt.status === 'IN_PROGRESS'
    );

    if (hasActiveSubscriptions || hasPendingAppointments) {
      return new NextResponse(
        "Cannot delete customer with active subscriptions or pending appointments",
        { status: 400 }
      );
    }

    // Delete customer and all related records
    await prisma.customer.delete({
      where: { id: params.customerId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[CUSTOMER_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
