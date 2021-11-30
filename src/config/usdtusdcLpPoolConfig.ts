import { ethers } from "ethers";
import { getFarmApr } from "../utils/apr";
import { getLpTokenPrice, getTokenValueUseUSD } from "../utils/value";
import usdt_token_img from "../asserts/img/token/token-usdtusdclp.png";
import { PoolPublicInfo, Vault } from "../models/vault";
import { getBswStakingPool, getGuaStrategy } from "../utils/web3";
import { bignumberToBN, BIG_ONE, BIG_TEN } from "../utils/bg";
import { LpFarm } from "../models/lpFarm";
import BigNumber from "bignumber.js";
import { simpleRpcProvider } from "../utils/providers";
import { getApy } from "../utils/apy";
import { getCakeStakingPool } from "../utils/web3+pancakeswap";

export function getUsdtUsdcLpVault(): Vault {
	const fetchTotalDeposit = async () => {
		const bswChef = "0xDbc1A13490deeF9c3C12b44FE77b503c1B061739";
		const chef = getCakeStakingPool(simpleRpcProvider, bswChef);
		const userInfo = await chef.userInfo(
			4,
			"0x12321FE7FefC31A972Bc33cdFaC4189D96A4a8DB"
		);
		const result = bignumberToBN(userInfo[0]).div(BIG_TEN.pow(18));
		return result;
	};

	const fetchPrice = async () => {
		const lpContract = "0x1483767E665B3591677Fd49F724bf7430C18Bf83";
		const val1 = await getTokenValueUseUSD(lpContract, simpleRpcProvider);
		const val0 = BIG_ONE;
		const result = await getLpTokenPrice(
			lpContract,
			simpleRpcProvider,
			val0,
			val1
		);
		return result;
	};

	const fetchPoolPublicInfo = async () => {
		const lpToken = "0x1483767E665B3591677Fd49F724bf7430C18Bf83";
		const pid = 4;
		// USDC
		const baseToken = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
		// USDT
		const quoteToken = "0x55d398326f99059fF775485246999027B3197955";
		const chefAddress = "0xDbc1A13490deeF9c3C12b44FE77b503c1B061739";
		const farm = new LpFarm({
			pid: pid,
			address: lpToken,
			token: baseToken,
			chefAddress: chefAddress,
			quoteToken: quoteToken,
		});

		const { lpTotalInQuoteToken, poolWeight } = await farm.farmInforamtions();
		const totalLiquidity = new BigNumber(lpTotalInQuoteToken).times(1);

		const bswUsdtLpContract = "0x2b30c317ceDFb554Ec525F85E79538D59970BEb0";
		let price = await getTokenValueUseUSD(bswUsdtLpContract, simpleRpcProvider);
		price = BIG_ONE.div(price);

		let apr =
			getFarmApr(
				new BigNumber(poolWeight),
				price,
				totalLiquidity,
				chefAddress,
				new BigNumber(30).multipliedBy(new BigNumber(0.857))
			) ?? 0;

		const apy = getApy(apr, price.toNumber());

		const strategy = getGuaStrategy(
			simpleRpcProvider as ethers.providers.Web3Provider,
			"0x12321FE7FefC31A972Bc33cdFaC4189D96A4a8DB"
		);

		const lpPrice = await fetchPrice();
		const balanceOf = await strategy.balanceOf();
		const totalDepositCount = bignumberToBN(balanceOf).div(BIG_TEN.pow(18));
		const tvl = totalDepositCount.multipliedBy(lpPrice);

		return {
			apr,
			apy,
			price: lpPrice,
			tvl,
		} as PoolPublicInfo;
	};

	const fetchEstimateProfit = async (account: string) => {
		const provider = simpleRpcProvider as ethers.providers.Web3Provider;
		const chefAddress = "0xDbc1A13490deeF9c3C12b44FE77b503c1B061739";
		const chef = getBswStakingPool(provider, chefAddress);
		const strategyContract = "0x12321FE7FefC31A972Bc33cdFaC4189D96A4a8DB";
		const pid = 4;
		const bswProfitCount = bignumberToBN(
			await chef.pendingBSW(pid, strategyContract)
		);

		const bswUsdtLpContract = "0x2b30c317ceDFb554Ec525F85E79538D59970BEb0";
		let bswPrice = await getTokenValueUseUSD(bswUsdtLpContract, provider);
		bswPrice = BIG_ONE.div(bswPrice);

		let lpPrice = await vault.fetchPrice();

		if (lpPrice === null) {
			return Promise.reject(new Error("lpPrice is unknown"));
		}

		const profit = bswProfitCount.multipliedBy(bswPrice).div(lpPrice);
		const userProfit = profit.multipliedBy(new BigNumber(0.985));
		const guaProfit = profit.multipliedBy(new BigNumber(1 - 0.985));

		const strategy = getGuaStrategy(provider, strategyContract);
		const total = await strategy.balanceOf();
		return Promise.all([
			vault.fetchBalanceOf(account),
			vault.fetchTotalSupply(),
		]).then((vals) => {
			const estimateTot = userProfit
				.plus(bignumberToBN(total))
				.multipliedBy(vals[0])
				.div(vals[1])
				.div(BIG_TEN.pow(18));
			return [userProfit, guaProfit, estimateTot];
		});
	};

	let vault = new Vault({
		name: "USDT-USDC BLP",
		address: "0x1B1c76747646163aD2bf1B3BAA9f7526b12e7527",
		decimals: 18,
		depositTokenAddress: "0x1483767E665B3591677Fd49F724bf7430C18Bf83",
		poolName: "BLP Compound ♻️",
		poolDesc: "Biswap USD LP Pool",
		nameId: "USDT-USDC-LP",
		earnToken: "USDT-USDC BLP",
		earnTokenAddress: "0x1483767E665B3591677Fd49F724bf7430C18Bf83",
		logo: usdt_token_img,
		strategyAddress: "0x12321FE7FefC31A972Bc33cdFaC4189D96A4a8DB",
		safeLevel: "medium",
		route: async () => {
			return ["USDT/USDC BLP", "BSW", "USDT/USDC BLP"];
		},
		fetchPoolPublicInfo: fetchPoolPublicInfo,
		fetchPrice: fetchPrice,
		fetchEstimateProfit,
	});

	return vault;
}
