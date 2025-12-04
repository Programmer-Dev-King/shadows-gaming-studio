// app/api/team/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { joinDate: 'desc' },
    });
    return NextResponse. json(team);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
