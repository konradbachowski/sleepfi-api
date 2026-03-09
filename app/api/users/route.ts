import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUser } from '../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json();
    if (!walletAddress || typeof walletAddress !== 'string') {
      return NextResponse.json({ error: 'walletAddress required' }, { status: 400 });
    }
    const user = await getOrCreateUser(walletAddress);
    return NextResponse.json(user);
  } catch (e) {
    console.error('[POST /api/users]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
