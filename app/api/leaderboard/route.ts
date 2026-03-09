import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard } from '../../../lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const data = await getLeaderboard(Math.min(limit, 50));
    return NextResponse.json(data);
  } catch (e) {
    console.error('[GET /api/leaderboard]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
