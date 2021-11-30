import { ethers } from "ethers";
import { Erc20, PancakeCakePool, PancakeLp } from "../contracts";
import { getERC20, getPancakeLp } from "../utils/web3";
import BigNumber from "bignumber.js";
import { bignumberToBN, BIG_TEN, BIG_ZERO } from "../utils/bg";
import { simpleRpcProvider } from "../utils/providers";
import { getCakeStakingPool } from "../utils/web3+pancakeswap";

export type SerializedBigNumber = string;
interface ILpFarm {
	address: string;
	pid: number;
	token: string;
	quoteToken: string;
	chefAddress: string;
}

export class LpFarm implements ILpFarm {
	constructor(one: ILpFarm) {
		this.address = one.address;
		this.pid = one.pid;
		this.quoteToken = one.quoteToken;
		this.chefAddress = one.chefAddress;
		this.token = one.token;
	}

	chefAddress: string;
	address: string;
	pid: number;
	quoteToken: string;
	token: string;

	public get provider(): ethers.providers.Web3Provider {
		return simpleRpcProvider as ethers.providers.Web3Provider;
	}

	public get lpTokenContract(): PancakeLp | null {
		return this.provider === null
			? null
			: getPancakeLp(this.provider, this.address);
	}

	public get tokenContract(): Erc20 | null {
		return this.provider === null ? null : getERC20(this.provider, this.token);
	}

	public get quoteTokenContract(): Erc20 | null {
		return this.provider === null
			? null
			: getERC20(this.provider, this.quoteToken);
	}

	public get chefContract(): PancakeCakePool | null {
		return this.provider === null
			? null
			: getCakeStakingPool(this.provider, this.chefAddress);
	}

	farmInforamtions = async () => {
		let lpToken = this.lpTokenContract;
		let quoteToken = this.quoteTokenContract;
		let token = this.tokenContract;
		let chef = this.chefContract;
		if (lpToken === null) {
			return Promise.reject(new Error("lp token is not defined"));
		}
		if (quoteToken === null) {
			return Promise.reject(new Error("quote token is not defined"));
		}
		if (token === null) {
			return Promise.reject(new Error("token token is not defined"));
		}
		if (!chef) {
			return Promise.reject(new Error("chef is not defined"));
		}
		const strongLpToken: PancakeLp = lpToken;
		const strongQuoteToken: Erc20 = quoteToken;
		const strongToken: Erc20 = token;
		const strongChef: PancakeCakePool = chef;

		return Promise.all([
			strongToken.balanceOf(this.address),
			strongQuoteToken.balanceOf(this.address),
			strongLpToken.balanceOf(this.chefAddress),
			strongLpToken.totalSupply(),
			strongChef.poolInfo(this.pid),
			strongChef.totalAllocPoint(),
		]).then(
			([
				tokenBalanceLP,
				quoteTokenBalanceLP,
				lpTokenBalanceMC,
				lpTotalSupply,
				info,
				totalAllocPoint,
			]) => {
				const [tokenDecimals, quoteTokenDecimals] = [18, 18];
				const _BN = bignumberToBN;
				// Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
				const lpTokenRatio = new BigNumber(_BN(lpTokenBalanceMC)).div(
					new BigNumber(_BN(lpTotalSupply))
				);

				// Raw amount of token in the LP, including those not staked
				const tokenAmountTotal = new BigNumber(_BN(tokenBalanceLP)).div(
					BIG_TEN.pow(tokenDecimals)
				);
				const quoteTokenAmountTotal = new BigNumber(
					_BN(quoteTokenBalanceLP)
				).div(BIG_TEN.pow(quoteTokenDecimals));

				// Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
				const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio);
				const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio);

				// Total staked in LP, in quote token value
				const lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2));

				const allocPoint = info
					? new BigNumber(info.allocPoint?._hex)
					: BIG_ZERO;
				const poolWeight = _BN(totalAllocPoint)
					? allocPoint.div(_BN(totalAllocPoint))
					: BIG_ZERO;
				return {
					tokenAmountMc: tokenAmountMc.toJSON(),
					quoteTokenAmountMc: quoteTokenAmountMc.toJSON(),
					tokenAmountTotal: tokenAmountTotal.toJSON(),
					quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
					lpTotalSupply: new BigNumber(_BN(lpTotalSupply)).toJSON(),
					lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
					tokenPriceVsQuote: quoteTokenAmountTotal
						.div(tokenAmountTotal)
						.toJSON(),
					poolWeight: poolWeight.toJSON(),
					multiplier: `${allocPoint.div(100).toString()}X`,
				};
			}
		);
	};
}
