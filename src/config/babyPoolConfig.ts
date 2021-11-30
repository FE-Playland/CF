import { ethers } from "ethers";
import baby_token_img from "../asserts/img/token/token-baby.png";
import { PoolPublicInfo, Vault } from "../models/vault";
import { getGuaStrategy } from "../utils/web3";
import { bignumberToBN, BIG_ONE, BIG_TEN } from "../utils/bg";
import { BigNumber } from "bignumber.js";
import { getTokenValueUseUSD } from "../utils/value";
import { simpleRpcProvider } from "../utils/providers";
import { Token } from "../utils/erc20Helper";
import { getPoolApr } from "../utils/apr";
import { getApy } from "../utils/apy";
import { getCakeStakingPool } from "../utils/web3+pancakeswap";

const BABY_TOKEN_ADDRESS = "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657";
const BABY_POOL_CONTRACT = "0xc599966cE4cff81784e697650Ae1D177c9f687e7";
const BABY_BUSDLP_CONTRACT = "0xE730C7B7470447AD4886c763247012DfD233bAfF";
const BABY_STRATEGY_CONTRACT = "0xf571f977277FCBc53FEA3c85c31e459889d689Da";
const BABY_STAKING_CONTRACT = "0xdfAa0e08e357dB0153927C7EaBB492d1F60aC730";
const TOKEN_PER_BLOCK = 4;

export function getBabyVault(): Vault {
	const fetchPoolPublicInfo = async () => {
		const babyPrice = await fetchBabyPrice();
		const babyPriceNumber = babyPrice.toNumber();

		const strategy = getGuaStrategy(
			simpleRpcProvider as ethers.providers.Web3Provider,
			BABY_STRATEGY_CONTRACT
		);

		const token = new Token(BABY_TOKEN_ADDRESS);
		const totalStackingDeposit = await token.getBalanceNumber(
			BABY_STAKING_CONTRACT
		);
		const totalDeposit = await strategy.balanceOf();
		const totalDepositCount = bignumberToBN(totalDeposit).div(BIG_TEN.pow(18));

		const tvl = totalDepositCount.multipliedBy(babyPrice);
		const apr =
			getPoolApr(
				babyPriceNumber,
				babyPriceNumber,
				totalStackingDeposit,
				TOKEN_PER_BLOCK
			) ?? 0;

		const apy = getApy(apr, babyPriceNumber);

		return {
			price: babyPrice,
			apr,
			apy,
			tvl,
		} as PoolPublicInfo;
	};

	const fetchBabyPrice = () => {
		return getTokenValueUseUSD(BABY_BUSDLP_CONTRACT, simpleRpcProvider);
	};

	const fetchEstimateProfit = async (account: string) => {
		const provider = simpleRpcProvider;
		const pool = getCakeStakingPool(provider, BABY_STAKING_CONTRACT);
		const strategy = getGuaStrategy(
			provider as ethers.providers.Web3Provider,
			BABY_STRATEGY_CONTRACT
		);

		/// calc rate
		const performanceFeeRate = bignumberToBN(
			await strategy.strategistReward()
		).div(10000);

		/// Profit Calc
		const profit = bignumberToBN(
			await pool.pendingCake(0, BABY_STRATEGY_CONTRACT)
		);
		const userProfit = profit.multipliedBy(BIG_ONE.minus(performanceFeeRate));
		const guaProfit = profit.multipliedBy(performanceFeeRate);

		const total = await strategy.balanceOf();
		return Promise.all([
			cakeSingleVault.fetchBalanceOf(account),
			cakeSingleVault.fetchTotalSupply(),
		]).then((vals) => {
			const estimateTot = userProfit
				.plus(bignumberToBN(total))
				.multipliedBy(vals[0])
				.div(vals[1])
				.div(BIG_TEN.pow(18));
			return [userProfit, guaProfit, estimateTot];
		});
	};

	// CAKE Single
	let cakeSingleVault = new Vault({
		name: "BABY",
		address: BABY_POOL_CONTRACT,
		decimals: 18,

		depositTokenAddress: BABY_TOKEN_ADDRESS,
		depositTokenLPContract: BABY_BUSDLP_CONTRACT,

		earnToken: "BABY",
		earnTokenAddress: BABY_TOKEN_ADDRESS,
		earnTokenLPContract: BABY_BUSDLP_CONTRACT,

		poolName: "BABY Offical Pool 👶",
		poolDesc: "Offical Syrup",
		stakingContract: BABY_STAKING_CONTRACT,
		tokenPerBlock: async () => {
			return TOKEN_PER_BLOCK;
		},
		nameId: "BABY-SINGLE",
		logo: baby_token_img,
		strategyAddress: BABY_STRATEGY_CONTRACT,
		safeLevel: "high",
		route: async () => {
			return ["BABY", "BABY"];
		},
		fetchPoolPublicInfo: fetchPoolPublicInfo,
		fetchPrice: fetchBabyPrice,
		fetchEstimateProfit,
	});

	return cakeSingleVault;
}
