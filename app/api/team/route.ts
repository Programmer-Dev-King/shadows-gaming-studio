import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const team = await prisma.teamMember.findMany();
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse. json(
      { error: 'Failed to fetch team' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, role, title, description, photo, summoningColor } = await request. json();

    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        title,
        description,
        photo,
        summoningColor,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse. json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
