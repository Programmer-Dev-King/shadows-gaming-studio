// app/api/games/route. ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?. role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, description, image, engineType } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const game = await prisma.game.create({
      data: {
        title,
        description,
        image,
        engineType,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    );
  }
}
