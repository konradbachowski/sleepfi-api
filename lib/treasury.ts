export const PLATFORM_FEE_RATE = 0.05;

export function calculatePoolPayout(
  userStakeLamports: number,
  failedPoolLamports: number,
  totalActiveStakeLamports: number
): number {
  if (totalActiveStakeLamports === 0) return userStakeLamports;
  const proportion = userStakeLamports / totalActiveStakeLamports;
  const poolShare = failedPoolLamports * proportion * (1 - PLATFORM_FEE_RATE);
  return userStakeLamports + Math.floor(poolShare);
}
