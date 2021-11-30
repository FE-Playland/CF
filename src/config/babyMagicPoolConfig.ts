import { ethers } from "ethers";
import { PoolPublicInfo, Vault } from "../models/vault";
import { getGuaMagicStrategy, getGuaStrategy } from "../utils/web3";
import { bignumberToBN, BIG_ONE, BIG_TEN } from "../utils/bg";
import { getTokenValueUseUSD } from "../utils/value";
import { simpleRpcProvider } from "../utils/providers";
import { Token } from "../utils/erc20Helper";
import { getPoolApr } from "../utils/apr";
import { getApy } from "../utils/apy";
import { getCakeSyrupPool } from "../utils/web3+pancakeswap";
import { magicWhitelistStore } from "../store/magicWhitelistStore";

import baby_token_img from "../asserts/img/token/token-baby-magic.png";

const BABY_TOKEN_ADDRESS = "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657";
const BABY_POOL_CONTRACT = "0xd3c9106CF59d1387f58b485B5E90C20736688028";
const BABY_BUSDLP_CONTRACT = "0xE730C7B7470447AD4886c763247012DfD233bAfF";
const BABY_MAGIC_STRATEGY_CONTRACT =
	"0xc5EdA39AcAbf6daF6e1A109A11e4CC2b836673a1";
const BABY_STAKING_CONTRACT = "0xfbb4e24E6caC093cd72C032A1C128196e5162478";
const TOKEN_PER_BLOCK = 4;

export function getBabyMagicVault(): Vault {
	const fetchCurrentSyrupPool = async () => {
		const magicStrategy = getGuaMagicStrategy(
			simpleRpcProvider as ethers.providers.Web3Provider,
			BABY_MAGIC_STRATEGY_CONTRACT
		);

		// 获取当前目标池
		const currentPool = await magicStrategy.currentPool();
		const syrupPoolInfo = magicWhitelistStore.findSyrupInfo(
			"BABY",
			currentPool
		);

		if (!!!syrupPoolInfo) {
			return Promise.reject(
				new Error("can't find the current syrup pool Info")
			);
		}

		return syrupPoolInfo;
	};

	const fetchPoolPublicInfo = async () => {
		// baby price
		const babyPrice = await fetchBabyPrice();
		const babyPriceNumber = babyPrice.toNumber();

		// gua strategy
		const strategy = getGuaStrategy(
			simpleRpcProvider as ethers.providers.Web3Provider,
			BABY_MAGIC_STRATEGY_CONTRACT
		);

		// syrup pool info
		const syrupPoolInfo = await fetchCurrentSyrupPool();
		let rewardTokenPrice = await getTokenValueUseUSD(
			syrupPoolInfo.lpPool,
			simpleRpcProvider
		);
		if (syrupPoolInfo.lpPriceReciprocal) {
			rewardTokenPrice = BIG_ONE.div(rewardTokenPrice);
		}
		const syrupPool = getCakeSyrupPool(
			simpleRpcProvider as ethers.providers.Web3Provider,
			syrupPoolInfo.pool
		);
		const token = new Token(BABY_TOKEN_ADDRESS);
		const totalStackingDeposit = await token.getBalanceNumber(
			syrupPoolInfo.pool
		);
		const tokenPerBlock = bignumberToBN(await syrupPool.rewardPerBlock()).div(
			BIG_TEN.pow(18)
		);

		const totalDeposit = await strategy.balanceOf();
		const totalDepositCount = bignumberToBN(totalDeposit).div(BIG_TEN.pow(18));

		const tvl = totalDepositCount.multipliedBy(babyPrice);
		// console.log(
		// 	babyPriceNumber,
		// 	rewardTokenPrice.toNumber(),
		// 	totalStackingDeposit,
		// 	tokenPerBlock.toNumber()
		// );
		const apr =
			getPoolApr(
				babyPriceNumber,
				rewardTokenPrice.toNumber(),
				totalStackingDeposit,
				tokenPerBlock.toNumber()
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

		// baby price
		const babyPrice = await fetchBabyPrice();

		/// syrup pool
		const syrupPoolInfo = await fetchCurrentSyrupPool();
		let rewardTokenPrice = await getTokenValueUseUSD(
			syrupPoolInfo.lpPool,
			simpleRpcProvider
		);
		if (syrupPoolInfo.lpPriceReciprocal) {
			rewardTokenPrice = BIG_ONE.div(rewardTokenPrice);
		}

		const syrupPool = getCakeSyrupPool(
			simpleRpcProvider as ethers.providers.Web3Provider,
			syrupPoolInfo.pool
		);

		/// Earned Token
		const rewardToken = await syrupPool.rewardToken();
		const rewardTokenContract = new Token(rewardToken);

		/// strategy
		const strategy = getGuaStrategy(
			provider as ethers.providers.Web3Provider,
			BABY_MAGIC_STRATEGY_CONTRACT
		);

		/// calc rate
		const performanceFeeRate = bignumberToBN(
			await strategy.strategistReward()
		).div(10000);

		/// Profit pending reward
		const pendingProfit = bignumberToBN(
			await syrupPool.pendingReward(BABY_MAGIC_STRATEGY_CONTRACT)
		);
		const walletProfit = await rewardTokenContract.balanceOf(
			BABY_MAGIC_STRATEGY_CONTRACT
		);
		const profit = pendingProfit.plus(walletProfit);

		const userProfit = profit.multipliedBy(BIG_ONE.minus(performanceFeeRate));

		const guaProfit = profit.multipliedBy(performanceFeeRate);
		/// baby balance
		const strategyBalanceOf = await strategy.balanceOf();

		const estimateBaby = rewardTokenPrice
			.multipliedBy(userProfit)
			.div(babyPrice);

		const total = bignumberToBN(strategyBalanceOf);
		return Promise.all([
			cakeSingleVault.fetchBalanceOf(account),
			cakeSingleVault.fetchTotalSupply(),
		]).then((vals) => {
			const estimateTot = estimateBaby
				.plus(total)
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

		poolName: "BABY Magic Pool 👶",
		poolDesc: "Auto Compound the highest pool in BabySwap.",
		stakingContract: BABY_STAKING_CONTRACT,
		tokenPerBlock: async () => {
			return TOKEN_PER_BLOCK;
		},
		nameId: "BABY-MAGIC-SINGLE",
		logo: baby_token_img,
		strategyAddress: BABY_MAGIC_STRATEGY_CONTRACT,
		safeLevel: "high",
		route: async () => {
			const syrupInfo = await fetchCurrentSyrupPool();
			return ["BABY", syrupInfo.rewardTokenName, "BABY"];
		},
		fetchPoolPublicInfo: fetchPoolPublicInfo,
		fetchPrice: fetchBabyPrice,
		fetchEstimateProfit,
	});

	return cakeSingleVault;
}
