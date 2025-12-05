import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  getAllWelcomeMessages,
  addWelcomeMessage,
  removeWelcomeMessage,
} from '@/lib/welcome-messages-extended';

export async function GET(_request: NextRequest) {
  try {
    const messages = getAllWelcomeMessages();
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
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

    const { message } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    addWelcomeMessage(message);

    return NextResponse.json(
      { message: 'Message added successfully' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to add message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
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
  } catch {
    return NextResponse.json(
      { error: 'Failed to remove message' },
      { status: 500 }
    );
  }
}
