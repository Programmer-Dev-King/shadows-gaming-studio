import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(_request: NextRequest) {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { joinDate: 'desc' },
    });
    return NextResponse.json(team);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch team' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, role, title, description, photo, linkedin, twitter, summoningColor } =
      await request.json();

    if (!name || !role || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        title,
        description,
        photo,
        linkedin,
        twitter,
        summoningColor: summoningColor || '#1F6BFF',
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
