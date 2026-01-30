import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { message: 'Already on waitlist!' },
        { status: 200 }
      );
    }

    // Add to waitlist
    await prisma.waitlist.create({
      data: {
        email,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: 'Successfully joined waitlist!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
