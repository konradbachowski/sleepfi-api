import { NextResponse } from 'next/server';
import { getPoolStats } from '../../../../lib/db';

export async function GET() {
  try {
    const { failedPoolLamports, totalActiveStakeLamports } = await getPoolStats();
    return NextResponse.json({
      failedPoolSol: (failedPoolLamports / 1_000_000_000).toFixed(4),
      totalActiveStakeSol: (totalActiveStakeLamports / 1_000_000_000).toFixed(4),
      failedPoolLamports,
      totalActiveStakeLamports,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json(
    { deprecated: true, message: 'On-chain claim is handled directly from the app.' },
    { status: 410 }
  );
}
