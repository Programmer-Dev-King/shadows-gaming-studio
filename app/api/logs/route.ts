// app/api/logs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const logs = await prisma.log.findMany({
      where: session.user?.role === 'ADMIN' ? {} : { userId: session.user?. id },
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
    const session = await getServerSession(authOptions);

    if (! session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { action, details } = await request.json();

    if (! action) {
      return NextResponse.json(
        { error: 'Missing action field' },
        { status: 400 }
      );
    }

    const log = await prisma.log.create({
      data: {
        userId: session.user?.id,
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
