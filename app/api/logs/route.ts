import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(_request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userRole = (session.user as { role?: string })?.role;
    const userId = (session.user as { id?: string })?.id;

    const logs = await prisma.log.findMany({
      where: userRole === 'ADMIN' ? {} : { userId: userId },
      orderBy: { timestamp: 'desc' },
      take: 50,
    });

    return NextResponse.json(logs);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { action, details } = await request.json();

    if (!action) {
      return NextResponse.json(
        { error: 'Missing action field' },
        { status: 400 }
      );
    }

    const userId = (session.user as { id?: string })?.id;

    const log = await prisma.log.create({
      data: {
        userId: userId,
        action,
        details,
      },
    });

    return NextResponse.json(log, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create log' },
      { status: 500 }
    );
  }
}
