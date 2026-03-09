import { NextRequest, NextResponse } from 'next/server';
import { createChallenge, getActiveChallenge } from '../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, goalHours, durationDays, stakeLamports, stakeTxSignature } = body;

    if (!userId || !goalHours || !durationDays || !stakeLamports || !stakeTxSignature) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const challenge = await createChallenge(userId, {
      goalHours: Number(goalHours),
      durationDays: Number(durationDays),
      stakeLamports: Number(stakeLamports),
      stakeTxSignature,
    });

    return NextResponse.json(challenge);
  } catch (e) {
    console.error('[POST /api/challenges]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }
    const challenge = await getActiveChallenge(userId);
    return NextResponse.json(challenge);
  } catch (e) {
    console.error('[GET /api/challenges]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
