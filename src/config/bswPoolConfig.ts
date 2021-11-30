import { ethers } from "ethers";
import { getPoolApr } from "../utils/apr";
import { Token } from "../utils/erc20Helper";
import { getTokenValueUseUSD } from "../utils/value";
import { PoolPublicInfo, Vault } from "../models/vault";
import { getBswStakingPool, getGuaStrategy } from "../utils/web3";
import { bignumberToBN, BIG_ONE, BIG_TEN } from "../utils/bg";
import { BigNumber as BN } from "bignumber.js";

import bsw_token_img from "../asserts/img/token/token-bsw.svg";
import { simpleRpcProvider } from "../utils/providers";
import { getApy } from "../utils/apy";

const BSW_TOKEN_ADDRESS = "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1";
const BSW_TOKEN_PER_BLOCK = 8;
const BSW_VAULT_ADDRESS = "0xc868E36DF36078c8b3B89E18CA0B322ABA9Eb7B4";
const BSW_STRATEGY_ADDRESS = "0x4D35117B3333ecA5095ae5dDF55Ef3b691396dBd";
const BSW_SINGLE_POOL_ADDRESS = "0xDbc1A13490deeF9c3C12b44FE77b503c1B061739";
const BSW_BUSD_LP_ADDRESS = "0x2b30c317ceDFb554Ec525F85E79538D59970BEb0";

export function getBSWVault(): Vault {
	const fetchPrice = async () => {
		const bswUsdtLpContract = BSW_BUSD_LP_ADDRESS;
		let price = await getTokenValueUseUSD(bswUsdtLpContract, simpleRpcProvider);
		price = BIG_ONE.div(price);
		return price;
	};

	const fetchPoolPublicInfo = async () => {
		const price = await fetchPrice();
		const priceNumber = price.toNumber();

		const strategy = getGuaStrategy(
			simpleRpcProvider as ethers.providers.Web3Provider,
			BSW_STRATEGY_ADDRESS
		);

		const token = new Token(BSW_TOKEN_ADDRESS);
		const totalStackingDeposit = await token.getBalanceNumber(
			BSW_SINGLE_POOL_ADDRESS
		);
		const totalDeposit = await strategy.balanceOf();
		const totalDepositCount = bignumberToBN(totalDeposit).div(BIG_TEN.pow(18));

		const tvl = totalDepositCount.multipliedBy(price);
		const apr =
			getPoolApr(
				priceNumber,
				priceNumber,
				totalStackingDeposit,
				BSW_TOKEN_PER_BLOCK
			) ?? 0;

		const apy = getApy(apr, priceNumber);

		return {
			price,
			apr,
			apy,
			tvl,
		} as PoolPublicInfo;
	};

	const fetchEstimateProfit = async (accountx: string) => {
		const provider = simpleRpcProvider;
		const cakePoolContract = BSW_SINGLE_POOL_ADDRESS;
		const pool = getBswStakingPool(provider, cakePoolContract);
		const strategyContract = BSW_STRATEGY_ADDRESS;
		const bswToken = new Token(BSW_TOKEN_ADDRESS);

		const strategy = getGuaStrategy(
			provider as ethers.providers.Web3Provider,
			strategyContract
		);

		// profit calc
		/// wallet profit
		const walletProfit = await bswToken.balanceOf(strategyContract);
		/// pending profit
		const pendingProfit = bignumberToBN(
			await pool.pendingBSW(0, strategyContract)
		);
		const profit = walletProfit.plus(pendingProfit);

		// calc rate
		const performanceFeeRate = bignumberToBN(
			await strategy.strategistReward()
		).div(10000);

		const userProfit = profit.multipliedBy(BIG_ONE.minus(performanceFeeRate));
		const guaProfit = profit.multipliedBy(performanceFeeRate);

		const total = bignumberToBN(await strategy.balanceOf());

		return Promise.all([
			bswSingleVault.fetchBalanceOf(accountx),
			bswSingleVault.fetchTotalSupply(),
		]).then((vals) => {
			const estimateTot = userProfit
				.plus(total)
				.multipliedBy(vals[0])
				.div(vals[1])
				.div(BIG_TEN.pow(18));
			return [userProfit, guaProfit, estimateTot];
		});
	};

	// BSW Single
	let bswSingleVault = new Vault({
		name: "BSW",
		address: BSW_VAULT_ADDRESS,
		decimals: 18,
		depositTokenAddress: BSW_TOKEN_ADDRESS,
		poolName: "BSW Stake ♻️",
		poolDesc: "Offical Launchpool",
		nameId: "BSW-SINGLE",
		earnToken: "BSW",
		earnTokenAddress: BSW_TOKEN_ADDRESS,
		logo: bsw_token_img,
		strategyAddress: BSW_STRATEGY_ADDRESS,
		safeLevel: "medium",
		route: async () => {
			return ["BSW", "BSW"];
		},
		fetchPoolPublicInfo: fetchPoolPublicInfo,
		fetchPrice: fetchPrice,
		fetchEstimateProfit,
	});

	return bswSingleVault;
}
