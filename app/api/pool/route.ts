import { NextRequest, NextResponse } from 'next/server';
import { getPoolStats } from '../../../lib/db';
import { calculatePoolPayout } from '../../../lib/treasury';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stakeLamports = Number(searchParams.get('stake') || 0);

    const { failedPoolLamports, totalActiveStakeLamports } = await getPoolStats();

    const estimatedPayout = stakeLamports > 0
      ? calculatePoolPayout(stakeLamports, failedPoolLamports, totalActiveStakeLamports + stakeLamports)
      : 0;

    return NextResponse.json({
      failedPoolLamports,
      failedPoolSol: (failedPoolLamports / 1_000_000_000).toFixed(4),
      totalActiveStakeLamports,
      totalActiveSol: (totalActiveStakeLamports / 1_000_000_000).toFixed(4),
      estimatedBonusSol: estimatedPayout > 0
        ? ((estimatedPayout - stakeLamports) / 1_000_000_000).toFixed(4)
        : null,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Internal server error' }, { status: 500 });
  }
}
