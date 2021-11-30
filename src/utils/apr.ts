import BigNumber from "bignumber.js";

export const BSC_BLOCK_TIME = 3;
export const CAKE_PER_BLOCK = new BigNumber(40);
export const BLOCKS_PER_YEAR = new BigNumber(
	(60 / BSC_BLOCK_TIME) * 60 * 24 * 365
); // 10512000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR);

export const getPoolApr = (
	stakingTokenPrice: number,
	rewardTokenPrice: number,
	totalStaked: number,
	tokenPerBlock: number
): number | null => {
	const totalRewardPrivePerYear = new BigNumber(rewardTokenPrice)
		.times(tokenPerBlock)
		.times(BLOCKS_PER_YEAR);
	const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(
		totalStaked
	);
	const apr = totalRewardPrivePerYear.div(totalStakingTokenInPool).times(100);
	return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber();
};

export const getFarmApr = (
	poolWeight: BigNumber,
	rewardPriceUsd: BigNumber,
	poolLiquidityUsd: BigNumber,
	farmAddress: string,
	tokenPerBlock: BigNumber
): number | null => {
	const tokenPerYear = tokenPerBlock.times(BLOCKS_PER_YEAR);
	const yearlyTokenRewardAllocation = tokenPerYear.times(poolWeight);
	const tokenRewardsApr = yearlyTokenRewardAllocation
		.times(rewardPriceUsd)
		.div(poolLiquidityUsd)
		.times(100);
	let tokenRewardsAprAsNumber: number | null = null;
	if (!tokenRewardsApr.isNaN() && tokenRewardsApr.isFinite()) {
		tokenRewardsAprAsNumber = tokenRewardsApr.toNumber();
	}
	return tokenRewardsAprAsNumber;
};
