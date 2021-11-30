import { ethers } from "ethers";
import { getPoolApr } from "../utils/apr";
import { getTokenValueUseBNB, getTokenValueUseUSD } from "../utils/value";
import cake_token_img from "../asserts/img/token/token-cake.svg";
import { DefaultPoolPublicInfo, PoolPublicInfo, Vault } from "../models/vault";
import { getGuaStrategy } from "../utils/web3";
import {
	bignumberToBN,
	bignumberToBnAsync,
	BIG_ONE,
	BIG_TEN,
} from "../utils/bg";
import { BigNumber as BN } from "bignumber.js";
import { getBunnyParkPool } from "../utils/web3+bunnypark";
import { simpleRpcProvider } from "../utils/providers";
import { getApy } from "../utils/apy";
import { Token } from "../utils/erc20Helper";
import { getCakeStakingPool } from "../utils/web3+pancakeswap";

const CAKE_TOKEN_ADDRESS = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
const CAKE_BUSDLP_CONTRACT = "0x804678fa97d91B974ec2af3c843270886528a9E6";
const BP_CAKE_POOL = "0xDeec895CE7245E40E971194Cb7E92A9e22fF8543";
const BP_STRATEGY_CONTRACT = "0x0E1409476D709490FD8f70f0aaC7cFeAC53Ac674";
const CAKE_STAKING_CONTRACT = "0x73feaa1eE314F8c655E354234017bE2193C9E24E";

export function getCakeBpVault(): Vault {
	const fetchTotalDeposit = async () => {
		const bpPool = BP_CAKE_POOL;
		const cakePoolContract = CAKE_STAKING_CONTRACT;
		const pool = getCakeStakingPool(simpleRpcProvider, cakePoolContract);
		const res = await pool.userInfo(0, bpPool);
		return bignumberToBN(res[0]);
	};

	const fetchCakePrice = () => {
		return getTokenValueUseUSD(CAKE_BUSDLP_CONTRACT, simpleRpcProvider);
	};

	const fetchBpPrice = () => {
		const bpBnbLpContract = "0x2bF2dEB40639201C9A94c9e33b4852D9AEa5fd2D";
		return getTokenValueUseBNB(bpBnbLpContract, simpleRpcProvider);
	};

	const fetchPoolPublicInfo = async () => {
		const bpPrice = await fetchBpPrice();
		const cakePrice = await fetchCakePrice();

		const totalDeposit = await fetchTotalDeposit();

		const strategy = getGuaStrategy(
			simpleRpcProvider as ethers.providers.Web3Provider,
			BP_STRATEGY_CONTRACT
		);

		const bpPool = getBunnyParkPool(
			simpleRpcProvider as ethers.providers.Web3Provider,
			BP_CAKE_POOL
		);

		const balanceOf = await strategy.balanceOf();
		const totalDepositCount = bignumberToBN(balanceOf).div(BIG_TEN.pow(18));
		const tvl = totalDepositCount.multipliedBy(cakePrice);

		if (!cakePrice || !bpPrice || !balanceOf) {
			return DefaultPoolPublicInfo;
		}

		const bpMintPerBlock = bignumberToBN(await bpPool.reward()).div(
			BIG_TEN.pow(18)
		);

		const apr =
			getPoolApr(
				cakePrice.toNumber(),
				bpPrice.toNumber(),
				totalDeposit.div(BIG_TEN.pow(18)).toNumber(),
				bpMintPerBlock.toNumber()
			) ?? 0;
		const apy = getApy(apr, cakePrice.toNumber());

		return {
			price: cakePrice,
			apr,
			apy,
			tvl,
		} as PoolPublicInfo;
	};

	const fetchEstimateProfit = async (account: string) => {
		const provider = simpleRpcProvider;
		const strategyContract = BP_STRATEGY_CONTRACT;
		const bpCakePool = BP_CAKE_POOL;
		const bpTokenAddress = "0xACB8f52DC63BB752a51186D1c55868ADbFfEe9C1";
		const bpToken = new Token(bpTokenAddress, simpleRpcProvider);

		/// basic info
		const pool = getBunnyParkPool(provider, bpCakePool);
		const strategy = getGuaStrategy(
			provider as ethers.providers.Web3Provider,
			strategyContract
		);

		/// price
		const bpPrice = (await fetchBpPrice()) ?? new BN(1.5);
		const cakePrice = (await fetchCakePrice()) ?? BIG_TEN.multipliedBy(2.5);

		/// Profit Calc
		const profitInWallet = await bpToken.balanceOf(strategyContract);
		const profitInPending = bignumberToBN(
			await pool.pendingReward(strategyContract)
		);

		const profit = profitInWallet.plus(profitInPending);
		/// calc rate
		const performanceFeeRate = bignumberToBN(
			await strategy.strategistReward()
		).div(10000);
		const userProfit = profit.multipliedBy(BIG_ONE.minus(performanceFeeRate));
		const guaProfit = profit.multipliedBy(performanceFeeRate);

		const estimateCake = bpPrice.multipliedBy(userProfit).div(cakePrice);
		const total = await strategy.balanceOf();
		return Promise.all([
			cakeBPVault.fetchBalanceOf(account),
			cakeBPVault.fetchTotalSupply(),
		]).then((vals) => {
			const estimateTot = estimateCake
				.plus(bignumberToBN(total))
				.multipliedBy(vals[0])
				.div(vals[1])
				.div(BIG_TEN.pow(18));
			return [userProfit, guaProfit, estimateTot];
		});
	};

	// CAKE BP Vault
	let cakeBPVault = new Vault({
		name: "CAKE",
		address: "0x3f76da462d76f8f80F48006bBe99dFe0456178bF",
		decimals: 18,

		depositTokenAddress: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
		depositTokenLPContract: "0x804678fa97d91B974ec2af3c843270886528a9E6", // TODO:

		earnToken: "CAKE",
		earnTokenAddress: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
		earnTokenLPContract: "0x804678fa97d91B974ec2af3c843270886528a9E6",

		poolName: " BunnyPark Pool 🐰 V2",
		poolDesc: "BunnyPark Cake Pool",
		nameId: "CAKE-BP-SINGLE",
		logo: cake_token_img,
		strategyAddress: BP_STRATEGY_CONTRACT,
		safeLevel: "low",
		route: async () => {
			return ["CAKE", "BP", "CAKE"];
		},
		fetchPoolPublicInfo: fetchPoolPublicInfo,
		fetchPrice: fetchCakePrice,
		fetchEstimateProfit,
	});

	return cakeBPVault;
}
