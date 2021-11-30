import { ethers } from "ethers";
import cake_token_img from "../asserts/img/token/token-cake.svg";
import { PoolPublicInfo, Vault } from "../models/vault";
import { getGuaStrategy } from "../utils/web3";
import { bignumberToBN, BIG_TEN } from "../utils/bg";
import { BigNumber } from "bignumber.js";
import { getTokenValueUseUSD } from "../utils/value";
import { simpleRpcProvider } from "../utils/providers";
import { Token } from "../utils/erc20Helper";
import { getPoolApr } from "../utils/apr";
import { getApy } from "../utils/apy";
import { getCakeStakingPool } from "../utils/web3+pancakeswap";

const CAKE_TOKEN_ADDRESS = "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82";
const CAKE_POOL_CONTRACT = "0xbae67e30012A78094eEB10921477999c927AeB91";
const CAKE_BUSDLP_CONTRACT = "0x804678fa97d91B974ec2af3c843270886528a9E6";
const CAKE_STRATEGY_CONTRACT = "0x9d0DeDD2b4FAC8b6a2544dcAe30Ae326a0B836D3";
const CAKE_STAKING_CONTRACT = "0x73feaa1eE314F8c655E354234017bE2193C9E24E";
const TOKEN_PER_BLOCK = 10;

export function getCakeVault(): Vault {
	const fetchPoolPublicInfo = async () => {
		const cakePrice = await fetchCakePrice();
		const cakePriceNumber = cakePrice.toNumber();

		const strategy = getGuaStrategy(
			simpleRpcProvider as ethers.providers.Web3Provider,
			CAKE_STRATEGY_CONTRACT
		);

		const token = new Token(CAKE_TOKEN_ADDRESS);
		const totalStackingDeposit = await token.getBalanceNumber(
			"0x73feaa1eE314F8c655E354234017bE2193C9E24E"
		);
		const totalDeposit = await strategy.balanceOf();
		const totalDepositCount = bignumberToBN(totalDeposit).div(BIG_TEN.pow(18));

		const tvl = totalDepositCount.multipliedBy(cakePrice);
		const apr =
			getPoolApr(
				cakePriceNumber,
				cakePriceNumber,
				totalStackingDeposit,
				TOKEN_PER_BLOCK
			) ?? 0;

		const apy = getApy(apr, cakePriceNumber);

		return {
			price: cakePrice,
			apr,
			apy,
			tvl,
		} as PoolPublicInfo;
	};

	const fetchCakePrice = () => {
		return getTokenValueUseUSD(CAKE_BUSDLP_CONTRACT, simpleRpcProvider);
	};

	const fetchEstimateProfit = async (account: string) => {
		const provider = simpleRpcProvider;
		const pool = getCakeStakingPool(provider, CAKE_STAKING_CONTRACT);
		/// Profit Calc
		const profit = bignumberToBN(
			await pool.pendingCake(0, CAKE_STRATEGY_CONTRACT)
		);
		const userProfit = profit.multipliedBy(new BigNumber(0.9895));
		const guaProfit = profit.multipliedBy(new BigNumber(1 - 0.9895));

		const strategy = getGuaStrategy(
			provider as ethers.providers.Web3Provider,
			CAKE_STRATEGY_CONTRACT
		);
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
		name: "CAKE",
		address: CAKE_POOL_CONTRACT,
		decimals: 18,

		depositTokenAddress: CAKE_TOKEN_ADDRESS,
		depositTokenLPContract: CAKE_BUSDLP_CONTRACT,

		earnToken: "CAKE",
		earnTokenAddress: CAKE_TOKEN_ADDRESS,
		earnTokenLPContract: CAKE_BUSDLP_CONTRACT,

		poolName: "CAKE Ace Hive ♻️",
		poolDesc: "Offical Syrup",
		stakingContract: "0x73feaa1eE314F8c655E354234017bE2193C9E24E",
		tokenPerBlock: async () => {
			return TOKEN_PER_BLOCK;
		},
		nameId: "CAKE-SINGLE",
		logo: cake_token_img,
		strategyAddress: CAKE_STRATEGY_CONTRACT,
		safeLevel: "high",
		route: async () => {
			return ["CAKE", "CAKE"];
		},
		fetchPoolPublicInfo: fetchPoolPublicInfo,
		fetchPrice: fetchCakePrice,
		fetchEstimateProfit,
	});

	return cakeSingleVault;
}
