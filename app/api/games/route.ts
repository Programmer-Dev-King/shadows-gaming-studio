import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const games = await prisma.game.findMany();
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

    if (!session || session.user?.role !== 'admin') {
      return NextResponse. json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, description, image, engineType } = await request.json();

    const game = await prisma.game.create({
      data: {
        title,
        description,
        image,
        engineType,
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
