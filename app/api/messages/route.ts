import { NextRequest, NextResponse } from 'next/server';
import { addWelcomeMessage, removeWelcomeMessage, getAllWelcomeMessages } from '@/lib/welcome-messages';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const messages = getAllWelcomeMessages();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
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

    const { message } = await request. json();

    if (! message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    addWelcomeMessage(message);

    return NextResponse.json(
      { message: 'Message added successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (! session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    removeWelcomeMessage(message);

    return NextResponse.json(
      { message: 'Message removed successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove message' },
      { status: 500 }
    );
  }
    }
