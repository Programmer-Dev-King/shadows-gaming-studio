// app/api/logs/route.ts

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

    const user = session.user as any;
    const logs = await prisma.log.findMany({
      where: user?.role === 'ADMIN' ? {} : { userId: user?.id },
      orderBy: { timestamp: 'desc' },
      take: 50,
    });

    return NextResponse.json(logs);
  } catch (error) {
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

    const user = session.user as any;
    const log = await prisma.log.create({
      data: {
        userId: user?.id,
        action,
        details,
      },
    });

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create log' },
      { status: 500 }
    );
  }
}
